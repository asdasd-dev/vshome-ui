#!/usr/bin/env bash
# Релиз @vshome/ui после мёржа (запускает автодеплой personalai, src/github/deploy.ts, после синка): тесты → сборка → тег → раскатка по consumers.json.
set -uo pipefail
cd "$(dirname "$0")" || exit 1
. "$HOME/scripts/repo-flow/deploy-lib.sh" vshome-ui || exit 1

LOG=/tmp/vshome-ui-deploy.log
: >"$LOG"
step() { "$@" >>"$LOG" 2>&1 || fail "$* упал — релиза нет: $(tail -3 "$LOG" | tr '\n' ' ' | cut -c1-200)"; }

step npm ci
step npm test
step npm run typecheck
step npm run build
step npm run showcase:build

K=(-o BatchMode=yes -o LogLevel=ERROR -i /root/.ssh/id_ed25519)
tar -C dist-showcase -cf - . | sudo ssh "${K[@]}" root@ssh.vshome.space 'set -e; W=/var/www/vshome; rm -rf $W/ui.new $W/ui.old; mkdir -p $W/ui.new; tar -C $W/ui.new -xf -; if [ -d $W/ui ]; then mv $W/ui $W/ui.old; fi; mv $W/ui.new $W/ui; rm -rf $W/ui.old' >>"$LOG" 2>&1 \
  || fail "каталог не выложен на vshome.space/ui/: $(tail -2 "$LOG" | tr '\n' ' ')"

OUT=$(node scripts/release.mjs 2>>"$LOG") || fail "релиз упал: $(tail -2 "$LOG" | tr '\n' ' ')"
case "$OUT" in
  exists*) say "версия ${OUT#exists } уже выпущена — релиза нет"; exit 0 ;;
esac
TAG=${OUT#released }
say "выпущен $TAG"

SUMMARY=$(node scripts/fanout.mjs "$TAG" 2>>"$LOG" | tee -a "$LOG" | tail -1) || fail "$TAG выпущен, раскатка упала: $(tail -2 "$LOG" | tr '\n' ' ')"
case "$SUMMARY" in
  *красные*|*"не закрыта"*) fail "$SUMMARY" ;;
  *) ok "$TAG · $SUMMARY" ;;
esac
