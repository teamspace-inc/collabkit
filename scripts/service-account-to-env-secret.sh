#!/bin/bash
set -euo pipefail

if [ "$#" != 1 ]
then
  echo "Usage: $0 [filename]"
  echo
  echo "Example:"
  echo "  $0 ~/test-firebase-adminsdk.json"
  exit
fi

filename="$1"

if ![[ -f $filename ]]; then
  echo "File '$filename' not found, service account file name required"
  exit 1
fi

cat $filename | jq -r tostring
