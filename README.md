# Getting Started

First ensure you're on node version **v16.15.1**. `.nvmrc` will enforce this version.  
Recommended node version managers: **[n](https://github.com/tj/n)** or **[nvm](https://github.com/nvm-sh/nvm)**

Grab a MaxMind GeoIP2Lite City DB from [here](https://www.maxmind.com/en/accounts/current/geoip/downloads) and unzip and move the `.mmdb` to the `services/core-service/src/assets`  
Ensure it's name matches `GeoLite2-City.mmdb`

Copy `.env.example` to a new `.env` file for core-service & to `web/app` (required since create-react-app was never ejected)

```bash
 > cp .env.example .env
 > cp .env.example ./web/app/.env
```

Install dependencies

```bash
 > yarn
```

Build the project

```bash
 > yarn build
```

Optionally have the build watch for changes

```bash
 > yarn build:watch
```

Run the core-service server (run in new tab/window/pane if running `build:watch`)

```bash
 > yarn start:watch
```

Finally boot up the React dev server and happy coding! (run in new tab/window/pane) 🎉

```bash
 > yarn web
```

### Video Clips

Homepage w/ UI Gradient Clone
![homepage](https://user-images.githubusercontent.com/26664788/174967517-736cc71d-feab-410e-b1f0-49cf8e9c6348.gif)

Search for Address IP
![ip-search](https://user-images.githubusercontent.com/26664788/174968690-18bb69f5-15ff-4fc4-b942-b82889aa0ef1.gif)


### Scripts

Run Lint

```bash
 > yarn lint
```

Run tsc build for monorepo

```bash
 > yarn build
```

Optionally build watch for changes

```bash
 > yarn build:watch
```

Clean tsc build

```bash
 > yarn build:clean
```

Run services (including core api server)

```bash
 > yarn start
```

Optionally watch services while running

```bash
 > yarn start:watch
```

Run React dev server

```bash
> yarn web
```

Run Tests

```bash
 > yarn test
```
