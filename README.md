# Tailwind Color Stuck

Small project to reproduce a stuck when running `pnpm run dev:prepare` on a Docker build

## Step to reproduce 

From the root project path, launch the following command : 

```bash
docker build . -t mmi-order-front-office:latest
```

The build will stuck after executing the module.ts of the mmione-webui-fwk

## Solution to don't stuck 

In the module.ts file of the module mmione-webui-fwk, comment the tailwindcss hook : 

```typescript
    nuxt.hook("tailwindcss:config",
      (tailwindConfig: Partial<Config>) => {
        configureTailwind(tailwindConfig, srcResolver)
      });
```

Build the docker image :

```bash
docker build . -t mmi-order-front-office:latest
```

The build finish normally

