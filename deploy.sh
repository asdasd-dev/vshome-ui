#!/usr/bin/env bash
# Релиз @vshome/ui после мёржа (запускает автодеплой personalai, src/github/deploy.ts, после синка): проверенная сборка CI → тег → раскатка по consumers.json.
set -uo pipefail
cd "$(dirname "$0")" || exit 1
. "$HOME/scripts/repo-flow/deploy-lib.sh" vshome-ui || exit 1

LOG=${TMPDIR:-/tmp}/vshome-ui-deploy.log
: >"$LOG"
PREPARE="$HOME/scripts/repo-flow/prepared-build.mjs"
CHECKS=${BOX_CHECKS_DIR:-/var/lib/vshome/checks}

mkdir -p "$CHECKS" || fail "не удалось создать каталог проверок"
exec 8>"$CHECKS/artifacts.lock"
flock 8 || fail "не удалось заблокировать каталог сборок"
PREPARED=$(node "$PREPARE" "$PWD" dist/index.js dist-showcase/index.html 2>>"$LOG") \
  || fail "подготовка сборки упала — релиза нет: $(tail -3 "$LOG" | tr '\n' ' ' | cut -c1-200)"
say "подготовленная сборка: $PREPARED"
{ rm -rf dist && cp -a "$PREPARED/dist" dist; } || fail "не удалось взять dist из $PREPARED — релиза нет"

K=(-o BatchMode=yes -o LogLevel=ERROR -i /root/.ssh/id_ed25519)
tar -C "$PREPARED/dist-showcase" -cf - . | sudo ssh "${K[@]}" root@ssh.vshome.space 'set -e; W=/var/www/vshome; rm -rf $W/ui.new $W/ui.old; mkdir -p $W/ui.new; tar -C $W/ui.new -xf -; if [ -d $W/ui ]; then mv $W/ui $W/ui.old; fi; mv $W/ui.new $W/ui; rm -rf $W/ui.old' >>"$LOG" 2>&1 \
  || fail "каталог не выложен на vshome.space/ui/: $(tail -2 "$LOG" | tr '\n' ' ')"
flock -u 8
exec 8>&-
node "$PREPARE" --prune "$PWD" >>"$LOG" 2>&1 || say "не удалось очистить старые сборки, см. $LOG"

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
