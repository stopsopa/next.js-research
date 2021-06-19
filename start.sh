
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"

set -e

source "${DIR}/env.sh"

# https://nextjs.org/docs/api-reference/cli
node node_modules/.bin/next start -p "${NEXT_PORT}" -H "${NEXT_HOST}"