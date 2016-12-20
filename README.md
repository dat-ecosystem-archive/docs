## Dat Project Documentation

Repository for the documentation of the Dat Project ecosystem. View the docs at [docs.dat-data.com](http://docs.dat-data.com).

[![#dat IRC channel on freenode](https://img.shields.io/badge/irc%20channel-%23dat%20on%20freenode-blue.svg)](http://webchat.freenode.net/?channels=dat)
[![datproject/discussions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/datproject/discussions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![docs](https://img.shields.io/badge/Dat%20Project-Docs-green.svg)](http://docs.dat-data.com)

## Writing & Editing Docs

[See docs folder](docs/readme.md) for information on editing and adding docs. Once you finish editing the docs, send a PR to the `deploy` branch to get the edits automatically deployed.

## Development

This documentation uses [minidocs](https://github.com/freeman-lab/minidocs) for layout, [ecosystem-docs](https://github.com/hughsk/ecosystem-docs) to get documentation from other modules, and ideas from [pull-stream-docs](https://github.com/pull-stream/pull-stream-docs) for auto travis deployment.

### Viewing Docs Locally

1. Clone Repository
2. `npm install`
3. `npm run build:local` to build the docs for local viewing
4. `npm run update` to update external modules
4. `npm run start` to view the docs in browser

### Deployment

Deployment happens automatically via Travis when updates are pushed to the master branch.

### NPM Commands

* `npm start`: start budo server to view locally
* `npm update`: update external module readme files
* `npm run build:local`: build app & css for local viewing
* `npm run build:css`: build css, runs with both build commands
* `npm run watch:css`: watch css live and build:local with changes
* `npm run paper`: create the paper with pandoc

## License

ISC
