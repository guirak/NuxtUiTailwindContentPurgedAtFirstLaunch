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

import {
  addComponentsDir,
  addImportsDir,
  createResolver,
  defineNuxtModule,
  installModule,
  addPlugin,
  useLogger
} from "@nuxt/kit";
import * as fs from "fs";
import * as path from "path";


const logger = useLogger("module.ts");

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * @default 'u'
   */
  prefix?: string;

  /**
   * @default false
   */
  global?: boolean;

}

/**
 * Liste tous les sous répertoires
 * @param dir
 */
function getDirectoriesRecursively(dir: string) {
  let results = [dir]; // Ajouter le répertoire racine
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    file = path.resolve(dir, file);
    if (fs.statSync(file).isDirectory()) {
      results = results.concat(getDirectoriesRecursively(file));
    }
  });

  return results;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "mmi-fct-order-front-office",
    configKey: "fctOrderFO"
  },
  defaults: {
    prefix: "FOrderFO"
  },

  async setup(options, nuxt) {

    const srcResolver = createResolver(import.meta.url);

    const runtimeDir = srcResolver.resolve("./runtime");
    const moduleDir = srcResolver.resolve("..");

    const webUIFwkSrcDir = srcResolver.resolve(moduleDir, "../../ui/mmione-webui-fwk/src");

    // Ajout du plugin du module
    addPlugin({
      src: srcResolver.resolve(runtimeDir, "plugins", "plugin")
    });

    // Ajout des modules
    await installModule(webUIFwkSrcDir);

    // Alias
    nuxt.options.alias["@mmiFctOrderFo"] = runtimeDir;

    // Ajout des composants
    const componentsDirectories = getDirectoriesRecursively(path.join(runtimeDir, "components"));

    logger.info("Ajout des composants des répertoires : ", componentsDirectories);

    componentsDirectories.forEach(dir => {
      addComponentsDir({
        path: dir,
        prefix: options.prefix,
        global: options.global,
        watch: false
      });
    });

    // // Ajout des composables
    // const composableDirectories = getDirectoriesRecursively(path.join(runtimeDir, "composables"));
    // logger.info("Ajout des composables des répertoires : ", composableDirectories);
    // addImportsDir(composableDirectories);

    // Ajout des éléments publics
    nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: srcResolver.resolve('./runtime/public'),
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
    })
  }
});
