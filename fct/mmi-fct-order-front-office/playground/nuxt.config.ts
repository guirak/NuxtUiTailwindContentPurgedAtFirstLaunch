/*
 * Copyright (C) [2022-2024] Midi Mini Informatique. Tous droits réservés.
 *
 * Ce fichier fait partie du système de logiciels MMI ONE.
 *
 * MMI ONE est un système composé d'un ensemble de logiciels propriétaire développé par Midi Mini Informatique.
 * Ces logiciels sont exclusivement destinés à un usage interne dans le cadre de la mise à disposition
 * de nos applications SaaS. Ils ne peuvent être copiés, modifiés, distribués ou utilisés à des fins
 * autres que celles prévues par Midi Mini Informatique, sauf autorisation expresse de celle-ci.
 *
 * Ce code est fourni "tel quel", sans garantie d'aucune sorte. Midi Mini Informatique décline
 * toute responsabilité quant à son utilisation ou à ses performances dans des conditions ou pour des
 * usages non approuvés par l'entreprise.
 */

export default defineNuxtConfig({
  modules: [
    "../src/module"
  ],
  devtools: { enabled: true },
  build: {
    transpile: ["rxjs"]
  },

  vite: {
    esbuild: {
      // On définit tsConfigRaw meme vide, cela a pour effet de modifier l'ordre de déclaration de la config
      // et de régler un bug avec l'utilisation des décorations (@) dans des champs de classe typescript. Je n'ai
      // pas compris pourquoi.
      // FIXME : Voir dans une version ultérieure des dépendances si cela corrige le bug
      tsconfigRaw: {

      }
    }
  }
});
