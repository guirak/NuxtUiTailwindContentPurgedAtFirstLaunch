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

# Définir le chemin de base de votre monorepo
MONOREPO_BASE_PATH=$(dirname "$0")/..

# Fonction pour supprimer un dossier s'il existe
delete_folder_if_exists() {
  local folder=$1
  if [ -d "$folder" ]; then
    echo "Suppression du dossier: $folder"
    rm -rf "$folder"
  fi
}

# Parcourir les répertoires du monorepo et supprimer les dossiers spécifiques
find "$MONOREPO_BASE_PATH" -type d \( -name 'node_modules' -o -name 'dist' -o -name '.nuxt' -o -name '.output' \) | while read -r folder; do
  delete_folder_if_exists "$folder"
done

echo "Nettoyage terminé."
