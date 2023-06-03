# GJP Cup 2
GJP Cup was so great that there is GJP Cup 2 now

# Installation
1. `npm install`
2. Download PocketBase from https://pocketbase.io/docs/, extract it, put the binary to this directory (or somewhere else idc)
3. `./pocketbase serve` in one terminal
4. `npm run dev` in second terminal

# Good to know
## Custom `pocketbase-react`
We're using our own distribution of `pocketbase-react` (available at https://github.com/radeksoft/pocketbase-react/tree/radeksoft), installed in the `package.json` as a Github repo. The installation should still be as simple as `npm install`.

**Differences with upstream:**
- login with admin account
- working initialCollections (fetch & subscribe by itself)
- no React Native support (200 megs of node_modules less)

**Caveats:**
- importing by `import { ... } from 'pocketbase-react/src';` because we can't import the package (by it's `package.json`), but we're loading the source code directly
- React StrictMode is disabled, because `pocketbase-react` is not good at unsubscribing on component unmount (caused double entries on realtime updates)
