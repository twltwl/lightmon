#!/bin/bash

if [ -z "$1" ]; then
  npm run start
else
  lighthouse --port=9222 --chrome-flags="--headless  --disable-gpu --disable-setuid-sandbox --no-sandbox" --output-path=stdout $@
fi