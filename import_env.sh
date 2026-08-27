#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <path-to-env-file> [site-id]"
  exit 1
fi

ENV_FILE="$1"
SITE_ID="${2:-${SITE_ID:-}}"

if [ -z "$SITE_ID" ]; then
  echo "Erreur : indiquez le site id en second argument ou export SITE_ID avant d'exécuter."
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Fichier introuvable: $ENV_FILE"
  exit 1
fi

while IFS= read -r line || [ -n "$line" ]; do
  # skip empty lines and comments
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  # split at first =
  key="${line%%=*}"
  value="${line#*=}"
  # trim whitespace
  key="$(echo -n "$key" | sed -e 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  value="$(echo -n "$value" | sed -e 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  if [ -z "$key" ]; then
    continue
  fi
  echo "Setting $key on Netlify..."
  netlify env:set "$key" "$value" --site "$SITE_ID"
done < "$ENV_FILE"

echo "Import terminé."
