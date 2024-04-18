ARG NODE_VERSION=21.7.1-slim

FROM node:${NODE_VERSION} as base

# Preparation
FROM base as prepare

WORKDIR /src

# Installer pnpm et nuxt
#RUN npm install -g npm@10.5.2 && npm install -g pnpm@9.0.2
RUN npm install -g pnpm@8.15.7

# Copie du code source
COPY . /src/

# Bug nuxt i18n : il me faut refaire l'install dans mmione-webui-fwk pour que ça marche
WORKDIR /src/ui/mmione-webui-fwk
RUN pnpm i || true
WORKDIR /src

#CMD ["bash"]

# Lancer les commandes de build x2 pour les erreurs qui apparaissent au 1er build
RUN #pnpm i || true && pnpm run dev:prepare || true
RUN pnpm i || true
RUN pnpm run dev:prepare
RUN #pnpm i || true && pnpm run dev:prepare || true
RUN #pnpm i && pnpm run dev:prepare

# Build
FROM prepare as build

ARG APP_NAME=mmi-order-front-office

WORKDIR /src/apps/${APP_NAME}

## Build de l'application
# RUN pnpm --filter ${APP_NAME} run build
RUN pnpm run build

# Production
FROM base

ARG APP_NAME=mmi-order-front-office

WORKDIR /app

# Copie des fichiers de production
COPY --from=build /src/apps/${APP_NAME}/.output /app/.output

# Port d'écoute de l'application
EXPOSE 3000

# Lancement de l'application
CMD [ "node", ".output/server/index.mjs" ]