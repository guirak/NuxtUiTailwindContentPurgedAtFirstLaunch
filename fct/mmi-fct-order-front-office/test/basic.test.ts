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

import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })
})
