
if [ "$1" = "" ]; then

  echo "specify mode as a first argument";

  exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"

# modes to use in host docker maiche (outside container)

NVMRC="$DIR/.nvmrc"

if [ ! -f "${NVMRC}" ]; then

  echo "${NVMRC} doesn't exist"

  exit 1
fi

if [ "$1" = "start" ]; then

  source "${DIR}/env.sh"

  TMPENV="$(/bin/bash "${DIR}/bash/cptmp.sh" "${_ENV}" -c -g "start-tmp")"

  cp "${_ENV}" "${TMPENV}"

  VERSION="$(cat "${NVMRC}" | sed -r "s/([^0-9\.])//g")"

  printf "\nNVMRC=\"${VERSION}\"\n" >> "${TMPENV}"

  DOCKERFILE="$(/bin/bash "${DIR}/bash/envrender.sh" "${TMPENV}" "${DIR}/Dockerfile" --clear --rmfirst -g "start-tmp")"

  docker build . -t "${PROJECT_NAME}" -f "${DOCKERFILE}"

  docker run -p ${NEXT_PORT}:3000 "${PROJECT_NAME}"
fi

# modes to use in container
if [ "$1" = "internal-start" ]; then

  source "${DIR}/env.sh"

  yarn start
fi

