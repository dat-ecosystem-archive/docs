## Dat Project Documentation

Repository for the documentation of the Dat Project ecosystem. View the docs at [docs.datproject.org](https://docs.datproject.org/).

[![#dat IRC channel on freenode](https://img.shields.io/badge/irc%20channel-%23dat%20on%20freenode-blue.svg)](http://webchat.freenode.net/?channels=dat)
[![datproject/discussions](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/datproject/discussions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![docs](https://img.shields.io/badge/Dat%20Project-Docs-green.svg)](http://docs.dat-data.com)

## Writing & Editing Docs

[See docs folder](docs/readme.md) for information on editing and adding docs. Once you finish editing the docs, send a PR to the `master` branch to get the edits automatically deployed.

### Creating + Generating Paper from Markdown

[See this gist](https://gist.github.com/maxogden/97190db73ac19fc6c1d9beee1a6e4fc8) for more information on how the paper is created with a basic example.

To generate the paper again, make sure you have `pandoc` and `pandoc-citeproc`:

```
brew install pandoc pandoc-citeproc
```

Then run the npm script:

```
npm run paper
```

## Development

This documentation uses [minidocs](https://github.com/freeman-lab/minidocs) for layout, [ecosystem-docs](https://github.com/hughsk/ecosystem-docs) to get documentation from other modules, and ideas from [pull-stream-docs](https://github.com/pull-stream/pull-stream-docs) for auto travis deployment.

### Viewing Docs Locally

1. Clone Repository
2. `npm install`
3. `npm run build:local` to build the docs for local viewing
4. `npm run update` to update external modules
4. `npm run start` to view the docs in browser

### Deployment

This repository uses [netlify](https://www.netlify.com/) for deployment. Deployment will happen automatically.

It works this way:

* Git webhook tells netlify there is new content
* netlify pulls latest repo
* netlify automatically runs `npm install`
* netlify runs the build script `sh scripts/netlify.sh`, which:
  * sets git config so we can use `ecosystem-docs` and pull latests readme files
  * runs `npm run netlify` which updates remote repos and builds.
* deploys `/dist` to the web

### NPM Commands

#### Local Docs Preview:

* `npm update`: update external module readme files
* `npm run build:local`: build app & css for local viewing
* `npm start`: start budo server to view locally

#### Other commands: 

* `n
