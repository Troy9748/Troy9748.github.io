#!/usr/bin/env bash
set -euo pipefail

node scripts/check-explore.js
bundle exec jekyll build
