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

// @ts-ignore
import type {Config} from 'tailwindcss'
// @ts-ignore
import plugin from "tailwindcss/plugin";

import path from 'path';

export const webuiTailwindConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        ["san-marino"]: {
          50: "#f3f6fc",
          100: "#e6edf8",
          200: "#c7d8f0",
          300: "#96b8e3",
          400: "#5d93d3",
          500: "#346caf",
          600: "#285ca1",
          700: "#224a82",
          800: "#1f406d",
          900: "#1f375b",
          950: "#15233c"
        }
      }
    }
  },
  plugins: [
    // @ts-ignore
    plugin(function ({addVariant}) {
      addVariant('portrait', '@media (orientation: portrait)');
      addVariant('landscape', '@media (orientation: landscape)');
    })
  ],

  safelist: [
    {
      pattern: /(bg|text|ring)-(.*)-(50|100|200|300|400|500|600|700|800|900|950)/
    },
    {
      pattern: /(top|bottom|left|right)-(.*)/,
    },
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8)/,
    },
    {
      pattern: /(col-span)-(.*)/,
    }
  ],

  content: [
    path.resolve(__dirname, "../components/**/*.{vue,mjs,ts}"),
    path.resolve(__dirname, "../config/**/*.{vue,mjs,ts}"),
  ],
}

