## Dat Project Documentation

Repository for the documentation of the Dat Project ecosystem. View the docs at [docs.dat-data.com](http://docs.dat-data.com).

[![#dat IRC channel on freenode](https://img.shields.io/badge/irc%20channel-%23dat%20on%20freenode-blue.svg)](http://webchat.freenode.net/?channels=dat)
[![datproject/discussions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/datproject/discussions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![docs](https://img.shields.io/badge/Dat%20Project-Docs-green.svg)](http://docs.dat-data.com)

## Writing & Editing Docs

[See docs folder](docs/readme.md) for information on editing and adding docs. Once you finish editing the docs, follow the update & deploy docs instructions.

## Installation & Usage

This documentation uses [minidocs](https://www.npmjs.com/package/minidocs).

### Viewing Docs Locally

1. Clone Repository
2. `npm install`
3. `npm run build:local` to build the docs for local viewing
4. `npm runs start` to view the docs in browser

### Updating & Deploying Docs

1. Clone Repository
2. `npm install`
3. Make documentation edits
4. `npm run deploy` to build docs & deploy to GitHub pages.`

### Updating External Module Docs

We use [ecosystem-docs](https://github.com/hughsk/ecosystem-docs) to get documentation from other modules.

1. `npm run update` will update the list of repositories and download the latest docs.
2. Deploy!

## NPM Commands

All the npm commands

* `npm run deploy`: build and deploy to github
* `npm run build:deploy`: build full html pages for deployment
* `npm run build:local`: build app for local viewing
* `npm start`: start budo server to view locally
* `npm update`: run both update commands
* `npm run update:list` updates the repository list only
* `npm run update:build` downloads the latest readme to the docs folder.
* `npm run paper`: create the paper with pandoc

## License

ISC
