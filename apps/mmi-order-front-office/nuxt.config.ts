// https://nuxt.com/docs/api/configuration/nuxt-config

// @ts-ignore
import type {Nitro} from "nitropack";
import inject from '@rollup/plugin-inject';
import path from 'path';

export default defineNuxtConfig({

  // Pour site statique, désactiver le SSR
  // ssr: false,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },

  },

  // Configuration de Nuxt.js
  app: {
    // Définition des balises META pour toutes les pages
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1"
    }
  },

  colorMode: {
    preference: 'light'
  },

  // Hook pour faire fonctionner class-transformer en production
  hooks: {
    'nitro:build:before': (nitro: Nitro) => {
      nitro.options.moduleSideEffects.push('reflect-metadata')
    }
  },

  modules: [
    'mmi-fct-order-front-office'
  ],
  build: {
    transpile: ['rxjs']
  },

  vite: {
    esbuild: {
      // On définit tsConfigRaw meme vide, cela a pour effet de modifier l'ordre de déclaration de la config
      // et de régler un bug avec l'utilisation des décorations (@) dans des champs de classe typescript. Je n'ai
      // pas compris pourquoi.
      // FIXME : Voir dans une version ultérieure des dépendances si cela corrige le bug
      tsconfigRaw: {

      }
    },
    plugins: [
      inject({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    resolve: {
      alias: {
        // Ajoutez cette ligne si vous rencontrez des problèmes avec l'importation de "buffer"
        buffer: 'buffer/',
      },
    },
  },
  compatibilityDate: '2024-09-28'
})