---
id: install
title: Installing Dat
sidebar_label: Installation
---

This page will show you how to install Dat for the command line, and use it in JavaScript applications. There are [many other applications](https://dat.land/apps) built on Dat, such as [Beaker Browser](https://beakerbrowser.com), which provide a graphical user interface.

Dat can be used as a command line tool, a Node.js module, and a JavaScript library:

* See below to install the `dat` command line tool.
* Node.js - `npm install dat` and [read more](https://github.com/datproject/dat-node).
* JavaScript - `npm install dat-js` and [read more](https://github.com/datproject/dat-js).


## Installing Dat on the Command Line

To install Dat, you can use `wget` or `curl` to download and get started:

```
wget -qO- https://raw.githubusercontent.com/datproject/dat/master/download.sh | bash
```


```
curl -o- https://raw.githubusercontent.com/datproject/dat/master/download.sh | bash
```

Once the install finishes, you should be able to run the `$ dat` command in your terminal. If not, see the [installation troubleshooting](usingdat-troubleshooting.md#installation-troubleshooting) for tips.

### Using npm

You can install Dat with `npm`:

```
npm install -g dat
```

Make sure you have `node` and `npm` installed first. If not, see the prerequisites section below. We recommend `npm` because it makes it easy to install new versions of `dat` when they are released.

Once `npm install` finishes, you should be able to run the `$ dat` command. If not, see the [installation troubleshooting](usingdat-troubleshooting.md#installation-troubleshooting) for tips.

#### NPM Prerequisites

* **Node**: You'll need to install Node.js before installing Dat. Dat needs `node` version 6 or above and `npm` installed. You can run `node -v` to check your version. Dat follows the Node.js LTS schedule for Node support.
* **npm**: `npm` is installed with node. You can run `npm -v` to make sure it is installed.

Once you have `npm` ready, install `dat` from npm with the `--global` option, like `npm install -g dat`.

