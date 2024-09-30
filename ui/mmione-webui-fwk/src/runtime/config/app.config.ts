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

//@ts-ignore
export const webuiAppConfig = defineAppConfig({
  ui: {
    primary: 'san-marino',
    button: {
      base: 'active:scale-90 disabled:active:scale-100 disabled:opacity-30'
    },
    icons: {
      dynamic: true
    },
    notifications: {
      position: 'bottom-14 md:bottom-0'
    },
    breadcrumb: {
      default: {
        divider : 'i-fa6-solid-chevron-right'
      }
    }
  }
})
