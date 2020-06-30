# AGL

## Getting Started

`npm install && npm start` to boot up the component library showcase app, [which can be accessed on localhost:1234](http://localhost:1234).
If the command doesn't work, you might need to update your node/npm to a specific version, download `node version manager` then run  `nvm use` beforehand to change it.

#### Setup the local dev environment

Update to node ver 10.x.x

```
nvm install 10
```

Or use nvm:
```
nvm use
```

Install NG CLI
```
npm install -g @angular/cli

```

Update NPM to the latest stable version

```
npm install -g npm
```

If you get errors you can remove node_modules dir and re-install the whole project again by:
```
rm -rf node_modules/
npm install
```

Start your local app with:
```
npm run start
```

## Running unit tests
```
npm run test
```

