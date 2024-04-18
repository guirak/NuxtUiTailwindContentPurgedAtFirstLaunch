import type { Config } from "tailwindcss";
import { type Resolver } from "@nuxt/kit";
import plugin from 'tailwindcss/plugin';

/**
 * Configuration de tailwind pour le module
 * @param tailwindConfig Configuration de tailwind
 * @param srcResolver Resolver pour le répertoire src
 */
export const configureTailwind = (tailwindConfig: Partial<Config>, srcResolver: Resolver) => {
  const runtimeDir = srcResolver.resolve("./runtime");

  tailwindConfig.theme = tailwindConfig.theme || {};
  tailwindConfig.theme.extend = tailwindConfig.theme.extend || {};
  tailwindConfig.theme.extend.colors = tailwindConfig.theme.extend.colors || {};

  // @ts-ignore
  tailwindConfig.theme.extend.colors["san-marino"] = {
    "50": "#f3f6fc",
    "100": "#e6edf8",
    "200": "#c7d8f0",
    "300": "#96b8e3",
    "400": "#5d93d3",
    "500": "#346caf",
    "600": "#285ca1",
    "700": "#224a82",
    "800": "#1f406d",
    "900": "#1f375b",
    "950": "#15233c"
  };

  // @ts-ignore
  tailwindConfig.content.files.push(srcResolver.resolve(runtimeDir, "components/**/*.{vue,mjs,ts}"));

  // Safelist pour ne pas purger les couleurs qui sont utilisées dans les :ui des composants nuxt-ui dans le framework
  tailwindConfig.safelist = tailwindConfig.safelist || []
  tailwindConfig.safelist.push({
    pattern: /(bg|text|ring)-(.*)-(50|100|200|300|400|500|600|700|800|900|950)/,
  })
  tailwindConfig.safelist.push({
    pattern: /(top|bottom|left|right)-(.*)-(0.5|1|1.5|2)/,
  })
  tailwindConfig.safelist.push({
    pattern: /(grid-cols)-(1|2|3|4|5|6|7|8)/,
  })

  // Ajout des variantes portrait et landscape
  tailwindConfig.plugins = tailwindConfig.plugins || [];
  tailwindConfig.plugins.push(
    plugin(function({ addVariant }) {
      addVariant('portrait', '@media (orientation: portrait)');
      addVariant('landscape', '@media (orientation: landscape)');
    })
  );
};
