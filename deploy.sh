#!/usr/bin/env bash
# Релиз @vshome/ui после мёржа (запускает sync-repo.sh): тесты → сборка → тег → раскатка по consumers.json.
set -uo pipefail
cd "$(dirname "$0")" || exit 1
. "$HOME/scripts/repo-flow/deploy-lib.sh" vshome-ui || exit 1

LOG=/tmp/vshome-ui-deploy.log
: >"$LOG"
step() { "$@" >>"$LOG" 2>&1 || fail "$1 $2 упал — релиза нет: $(tail -3 "$LOG" | tr '\n' ' ' | cut -c1-200)"; }

step npm ci
step npm test
step npm run typecheck
step npm run build
step npm run showcase:build

OUT=$(node scripts/release.mjs 2>>"$LOG") || fail "релиз упал: $(tail -2 "$LOG" | tr '\n' ' ')"
case "$OUT" in
  exists*) say "версия ${OUT#exists } уже выпущена — релиза нет"; exit 0 ;;
esac
TAG=${OUT#released }
say "выпущен $TAG"

SUMMARY=$(node scripts/fanout.mjs "$TAG" 2>>"$LOG" | tail -1) || fail "$TAG выпущен, раскатка упала: $(tail -2 "$LOG" | tr '\n' ' ')"
case "$SUMMARY" in
  *красные*|*"не закрыта"*) fail "$SUMMARY" ;;
  *) ok "$TAG · $SUMMARY" ;;
esac
