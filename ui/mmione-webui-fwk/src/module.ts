import {addImportsDir, addPlugin, createResolver, defineNuxtModule, installModule, useLogger} from "@nuxt/kit";
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
    name: "mmione-webui-fwk",
    configKey: "fwk"
  },
  defaults: {
    prefix: "Fwk"
  },


  async setup(options, nuxt) {

    const srcResolver = createResolver(import.meta.url);

    const runtimeDir = srcResolver.resolve("./runtime");

    // Ajout du plugin du framework
    addPlugin({
      src: srcResolver.resolve(runtimeDir, "plugins", "plugin")
    });

    // Ajout des modules
    await installModule("@pinia/nuxt");
    await installModule("@nuxt/ui", {
      safelistColors: ['primary', 'purple', 'green', 'red']
    });

    // Alias
    nuxt.options.alias["@mmiUIFwk"] = runtimeDir;

    // Ajout du css
    nuxt.options.css.push(srcResolver.resolve(runtimeDir, 'webui-fwk.css'))

    // Ajout des config
    const configDirectories = getDirectoriesRecursively(path.join(runtimeDir, "config"));
    logger.info("Ajout des config des répertoires : ", configDirectories);
    addImportsDir(configDirectories);

    // Couleur primaire de l'application
    // @ts-ignore
    // nuxt.options.appConfig.ui.primary = "san-marino";
  }
});
