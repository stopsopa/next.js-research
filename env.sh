
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"

set -e

_ENV="${DIR}/.env"

if [ ! -f "${_ENV}" ]; then

  echo "File '${_ENV}' doesn't exist"

  exit 1;
fi

source "$_ENV";

if [ "${NEXT_PROTOCOL}" = "" ]; then

    echo "NEXT_PROTOCOL is not defined";

    exit 1;
fi

if [ "${NEXT_HOST}" = "" ]; then

    echo "NEXT_HOST is not defined";

    exit 1;
fi

TEST="^[0-9]+$"

if [[ ! ${NEXT_PORT} =~ ${TEST} ]]; then

    echo "NEXT_PORT ${NEXT_PORT} don't match pattern ${TEST}";

    exit 1;
fi