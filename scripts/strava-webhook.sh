#!/usr/bin/env bash
set -euo pipefail

API="https://www.strava.com/api/v3/push_subscriptions"
DEV_VARS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../apps/integrations/.dev.vars"

if [[ -f "$DEV_VARS" ]]; then
  while IFS='=' read -r key value; do
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    export "$(echo "$key" | xargs)=$(echo "$value" | xargs | sed "s/^[\"']//;s/[\"']$//")"
  done < "$DEV_VARS"
fi

: "${STRAVA_CLIENT_ID:?Missing STRAVA_CLIENT_ID}" \
  "${STRAVA_CLIENT_SECRET:?Missing STRAVA_CLIENT_SECRET}" \
  "${VERIFY_TOKEN:?Missing VERIFY_TOKEN}"

auth="client_id=$STRAVA_CLIENT_ID&client_secret=$STRAVA_CLIENT_SECRET"

get_sub_id() { curl -sf "$API?$auth" | jq -r '.[0].id // empty'; }

get_ngrok_url() {
  curl -sf http://localhost:4040/api/tunnels \
    | jq -r '.tunnels[] | select(.proto=="https") | .public_url' | head -1
}

case "${1:-}" in
  view)
    id=$(get_sub_id)
    [[ -z "$id" ]] && echo "No active subscription." && exit 0
    curl -sf "$API?$auth" | jq '.[0] | {id, callback_url, created_at, updated_at}'
    ;;

  delete)
    id=$(get_sub_id)
    [[ -z "$id" ]] && echo "Nothing to delete." && exit 0
    curl -sf -X DELETE "$API/$id?$auth" > /dev/null
    echo "Deleted subscription $id."
    ;;

  create)
    url="${2:?Usage: $0 create <callback_url>}"
    resp=$(curl -s -X POST "$API" \
      -F "client_id=$STRAVA_CLIENT_ID" -F "client_secret=$STRAVA_CLIENT_SECRET" \
      -F "callback_url=$url" -F "verify_token=$VERIFY_TOKEN") || {
      echo "Error: Failed to create subscription. Is your server running at $url?"
      exit 1
    }
    echo "Created subscription $(echo "$resp" | jq -r '.id') → $url"
    ;;

  switch)
    target="${2:?Usage: $0 switch <local|prod|url>}"
    case "$target" in
      local)
        ngrok=$(get_ngrok_url) || { echo "Error: ngrok not reachable at localhost:4040"; exit 1; }
        [[ -z "$ngrok" ]] && echo "Error: No HTTPS tunnel found" && exit 1
        url="$ngrok/api/webhook"
        ;;
      prod)  url="${PROD_CALLBACK_URL:?PROD_CALLBACK_URL not set}" ;;
      *)     url="$target" ;;
    esac
    "$0" delete
    "$0" create "$url"
    ;;

  *)
    echo "Usage: $0 <view|delete|create <url>|switch <local|prod|url>>"
    exit 1
    ;;
esac