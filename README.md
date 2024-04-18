# Applications Webs MMIONE

Le répertoire WebUI contient l'ensemble des applications et modules des interfaces graphiques MMI ONE basés sur Nuxt. 

## Structure

Le projet est séparé en plusieurs répertoires : 

- apps : Répértoire contenant les applications graphiques
- fct : Répertoire contenant les modules fonctionnels métiers
- mmione-webui-fwk : Framework graphique et technique
- models : Répertoire contenant les modules de communications avec les serveurs backend

Le projet utilise **pnpm** comme gestionnaire de paquet pour permettre l'exécution de taches sur l'ensemble des modules 

## Gestion de versions des dépendances 

Pour assurer la cohérence des versions des dépendances sur tout le projet, la gestion des versions des dépendances s'effectue via un catalogue : **catalog.json**

### Mise à jours des dépendances
Pour mettre à jour une dépendance dans un module (création, modification): 

- la version doit être ajoutée/modifiée dans **catalog.json**
- lancer le script 

```bash
./ApplyCatalogVersion.bash
```

Le script applique les versions du catalogue sur tous les package.json des modules dans lesquels elles sont utilisés.  

Le script vérifie aussi que toutes les dépendances des modules sont bien référencés dans le catalogue. Dans le cas contraire, il lève des erreurs.

## Installation et lancement 


### Installation 

A la racine **webui**, lancer l'installation avec : 

```bash
pnpm install
```

### Génération des types pour les dépendances entre modules

```bash
pnpm run dev:prepare
```

### Lancement d'une application ou du playground d'un module

Se rendre dans le répertoire de l'application ou du module puis lancer la commande :

```bash
pnpm run dev
```

## Build de production
### Application statique

Se rendre dans le répertoire de l'application et lancer : 

```bash
pnpm run generate
```

L'application statique peut ensuite être testée avec http-server :

```bash
cd dist
http-server
```

### Application SSR

Se rendre dans le répertoire de l'application et lancer :

```bash
pnpm run build
```

L'application SSR peut ensuite être testée avec :

```bash
pnpm run preview
```
