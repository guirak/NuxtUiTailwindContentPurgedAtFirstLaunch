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
