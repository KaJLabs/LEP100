#!/usr/bin/env bash
set -euo pipefail
lithc test ./lep100-tests --network local --report junit
