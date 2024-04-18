#!/bin/bash

#
# Copyright (C) [2022-2024] Midi Mini Informatique. Tous droits réservés.
#
# Ce fichier fait partie du système de logiciels MMI ONE.
#
# MMI ONE est un système composé d'un ensemble de logiciels propriétaire développé par Midi Mini Informatique.
# Ces logiciels sont exclusivement destinés à un usage interne dans le cadre de la mise à disposition
# de nos applications SaaS. Ils ne peuvent être copiés, modifiés, distribués ou utilisés à des fins
# autres que celles prévues par Midi Mini Informatique, sauf autorisation expresse de celle-ci.
#
# Ce code est fourni "tel quel", sans garantie d'aucune sorte. Midi Mini Informatique décline
# toute responsabilité quant à son utilisation ou à ses performances dans des conditions ou pour des
# usages non approuvés par l'entreprise.
#

# Chemin vers catalog.json
CATALOG_FILE="catalog.json"

# Error file
ERROR_FILE="/tmp/ApplyCatalogVersions.errors"

# Suppression du fichier d'erreur existant si présent
if [ -f "$ERROR_FILE" ]; then
  rm "$ERROR_FILE"
fi

# Lecture des dépendances du catalog.json
declare -A catalog_deps
while IFS="=" read -r key value; do
  catalog_deps[$key]=$value
done < <(jq -r '. | to_entries | .[] | .key + "=" + .value' "$CATALOG_FILE")

echo "Contenu de catalog_deps:"
for key in "${!catalog_deps[@]}"; do
  echo "    $key: ${catalog_deps[$key]}"
done

# Fonction pour vérifier et mettre à jour les dépendances
check_and_update_deps() {
  local package_file=$1
  local type=$2

  echo "  Vérification de $type dans $package_file"

  # Lecture des dépendances du package.json
  jq -r --arg type "$type" '.[$type] | to_entries[] | "\(.key): \(.value)"' "$package_file" | while read -r dep_line; do
    dep_name=$(echo "$dep_line" | cut -d: -f1)
    dep_version=$(echo "$dep_line" | cut -d: -f2)

    # Trim sur dep_version
    dep_version="${dep_version#"${dep_version%%[![:space:]]*}"}"
    dep_version="${dep_version%"${dep_version##*[![:space:]]}"}"

    # Ignorer les dépendances avec "workspace:*"
    if [ "$dep_version" == "workspace" ]; then
      echo "    Ignoré : $dep_name est une dépendance interne"
      continue
    fi

    echo "    Dépendance $dep_name. Version actuelle : $dep_version"

    # Vérifier si la dépendance est dans le catalogue
    if [ -z ${catalog_deps[$dep_name]+_} ]; then
      error_msg="Erreur : La dépendance '$dep_name' dans '$type' de '$package_file' n'est pas présente dans catalog.json"
      echo "    $error_msg"
      echo "$error_msg" >>"$ERROR_FILE"
    else
      # Mise à jour de la version de la dépendance
      jq --arg dep "$dep_name" --arg type "$type" --arg ver "${catalog_deps[$dep_name]}" '.[$type][$dep] = $ver' "$package_file" >temp.json && mv temp.json "$package_file"
    fi
  done
}

# Boucle sur les modules du workspace
for module in models/* mmione-webui-fwk fct/* apps/*; do
  if [ -f "$module/package.json" ]; then
    echo "Traitement de $module/package.json"
    check_and_update_deps "$module/package.json" "dependencies"
    check_and_update_deps "$module/package.json" "devDependencies"
  fi
done

echo ""
if [ -f "$ERROR_FILE" ]; then
  echo "Erreurs détectées lors de la vérification des dépendances :"
  cat "$ERROR_FILE"
else
  echo "Les versions ont été appliqués sur tous les modules."
fi
