# GJP Cup 2
GJP Cup was so great that there is GJP Cup 2 now

# Installation
1. `npm install`
2. Download PocketBase from https://pocketbase.io/docs/, extract it, put the binary to this directory (or somewhere else idc)
3. `./pocketbase serve` in one terminal
4. `npm run dev` in second terminal

# Scripts
## Fill DB
To fill the database:
1. Open the Týmy Google Sheet
2. Download it as a CSV
3. Put it to the root folder (right next to this `README.md`) as `tymy.csv`
4. Run `npm run filldb`
5. --> The db gets filled with players, teams and games (games are in a really shitty order). Including one game with teachers.
You can change credentials, db url and other stuff at `scripts/filldb.ts`.

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

## no's
Numbering of games and teams (`games.no`, `teams.no` and `misc.currentGameNo`) starts from 0. Do +1 when presenting to final user (probably never?)

## Deploy
build with `npx vite build` (not `npm run build`, coz we have typescript errors everywhere)

deploy by sth like `rsync --info=progress2 -r dist/* root@mariansam.eu:/srv/www/gjpcup.radeksoft.cz/`
