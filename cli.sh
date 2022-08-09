#!/bin/bash

RED='\033[0;31m'

case $1 in
  module)
    if [ "$2" ]; then
      mkdir "src/modules/$2"
      mkdir "src/modules/$2/controllers"
      mkdir "src/modules/$2/dto"
      mkdir "src/modules/$2/entities"
      mkdir "src/modules/$2/exceptions"
      mkdir "src/modules/$2/infrastructure"
      mkdir "src/modules/$2/repositories"
      mkdir "src/modules/$2/services"
    else
      echo "${RED}Second argument (module name) is required"
    fi
    ;;
  *)
    echo "${RED}First argument is required"
  ;;
esac