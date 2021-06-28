
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"

set -e

source "${DIR}/env.sh"

if [ "$1" = "debug" ]; then

  # https://nextjs.org/docs/advanced-features/debugging#step-1-start-nextjs-in-debug-mode

cat <<EOF

    export NODE_OPTIONS='--inspect'

    chrome://inspect

EOF

  export NODE_OPTIONS='--inspect'
fi

# https://nextjs.org/docs/api-reference/cli
node node_modules/.bin/next dev --port "${NEXT_PORT}" -H "${NEXT_HOST}"