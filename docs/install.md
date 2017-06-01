# Welcome to Dat!

Dat is a distributed data sharing tool. [The Dat Protocol](http://datprotocol.com) transfers files using a **secure**, **distributed**, and **fast** network. Unlike Dropbox, data doesn't travel to a third-party server before reaching it's destination. Use Dat to share directories, browse remote files on demand, or continuously archive entire filesystems.

Dat has a Desktop client, a commandline tool, and a Node.js library. Install them below.

If you'd like to read about how dat works, please [start with the Overview](/overview) and if you're still hungry for more learning, [read the Dat paper](/link-to-paper).

Have questions or need some guidance? You can chat with us in IRC on [#dat](http://webchat.freenode.net/?channels=dat) or [Gitter](https://gitter.im/datproject/discussions?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)!

## Desktop Application

If you don't want to use the terminal, you can use our desktop application on Mac or Linux (Windows coming soon).

| Platform | Link             |
|---------|-------------------|
| Mac     | [Download .dmg](http://datproject.github.io/dat-desktop/mac)          |
| Linux   | [Download .AppImage](http://datproject.github.io/dat-desktop/linux)          |
| Windows | Coming Soon       |


## In the Terminal

Dat can be installed in the terminal using `node`. Follow the instructions below to get started.

1. **Install Node.** Dat requires Node version 4.0 or higher; however, we recommend the latest version. If you don't have node, [go to their website at nodejs.org and pick your platform.](https://nodejs.org/en/download/) If node is installed, you should be able to type the following to see which version you have:

```
$ node -v
8.0.0
```

2. **Install Dat.** Dat is distributed using `npm`, the package manager for Node.js. Type the following command to install dat:

```
npm install -g dat
```

If dat was installed successfully, you might see output like this (on npm 5.0.0):
```
/usr/local/bin/dat -> /usr/local/lib/node_modules/dat/bin/cli.js

> utp-native@1.5.1 install /usr/local/lib/node_modules/dat/node_modules/utp-native
> node-gyp-build


> sodium-native@1.10.0 install /usr/local/lib/node_modules/dat/node_modules/sodium-native
> node-gyp-build "node preinstall.js" "node postinstall.js"

added 321 packages in 9.662s
```

If you receive an `EACCES` error, read [this guide on fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) or use `sudo npm install -g dat`.

If you're still having trouble installing dat, see the [troubleshooting section](/troubleshooting), [open an issue on Github](https://github.com/datproject/dat/issues/new), or [ask us a question in our chat room](https://gitter.im/datproject/discussions).

## Next Steps

You're all set! [Go on to the next page to start sharing data](/tutorial).
