# Nuxt UI Tailwind content purged at first launch

Small project to reproduce a bug with the nuxt-ui tailwind css content. At first launch, css classes used in nuxt ui components are not correctly taken into account. 
It's necessary to restart a second time the app to have the correct display

The bug is present since the version 6.12.0 of next/tailwindcss. Maybe some effect of the First Class HMR.

## Step to reproduce 

- From the root project path, launch the following command : 

```bash
# Clear the build  
./scripts/CleanProject.bash

# Install and prepare 
pnpm i; pnpm run dev:prepare

# Launch the app
cd apps/mmi-order-front-office
pnpm run dev
```

**The tailwind classes used in apps and modules are correctly displayed but the tailwind classes defined in the nuxt-ui components are not taken into account.**

- Stop and restart the server

```bash
pnpm run dev
```

** All tailwind classes are correctly taken into account.**



The problem is present too when building the prod version with **pnpm run build** or when running the docker image built with **docker build . -t mmi-order-front-office:latest**


