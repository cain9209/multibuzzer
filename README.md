## Multibuzzer

How to install and run packages to get the game going.

https://multibuzz.app

Built using Create React App and boardgame.io

Please open an issue if you experience a bug or have product feedback!

### Development
rm yarn.lock
yarn install

Make sure you have Node.js v20.12.2!!!!!
- Prerequisites: node and a package manager (e.g. npm, yarn)
- `npm install howler` for sound
- `git init` after you have opend the project folder to initialize git repo.
- `npm init` to initialize package files for JavaScript
- `npm install` to install pagages
- Run `yarn init` to initialize project
- Run `yarn install` to install dependencies
- Run `npm start` to run local client on localhost:4000 and local server on localhost:4001
- Run `yarn client` to start application after starting the server on localhost:4001

### Deployment
if prettier error is thrown `npx prettier --write .`
- Build React app using `yarn build`
- Run `yarn start` to run the Koa server, which will serve the built React app (via '/build'), as well as operate both the boardgame.io server and lobby
