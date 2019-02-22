---
id: install
title: Installing Dat
sidebar_label: Installation
---

This page will guide how to install Dat for the command line or javascript applications. There are also [many other applications](https://dat.land/apps), such as [Beaker Browser](https://beakerbrowser.com), which provide a graphical user interface and much more on Dat. 

Dat can be used as a command line tool, a Node.js library, and a JS library:

* See below to install the `dat` command line tool.
* Node.js - `npm install dat` and [read more](https://github.com/datproject/dat-node).
* JavaScript - `npm install dat-js` and [learn more](https://github.com/datproject/dat-js).


## Installing Dat Command Line

To install Dat, you can use `wget` or `curl` to download and get you started with Dat!

```
wget -qO- https://raw.githubusercontent.com/datproject/dat/master/download.sh | bash
```


```
curl -o- https://raw.githubusercontent.com/datproject/dat/master/download.sh | bash
```

Once the install finishes, you should be able to run the `$ dat` command in your terminal. If not, see the [installation troubleshooting](usingdat-troubleshooting.md#installation-troubleshooting) for tips.

### Using npm

If you have `npm`, you can install Dat with it:

```
npm install -g dat
```

Make sure you have `node` and `npm` installed first. If not, see the prerequisites section below. We recommend `npm` because it makes it easy to install new versions of `dat` when they get released.

Once `npm install` finishes, you should be able to run the `$ dat` command. If not, see the [installation troubleshooting](usingdat-troubleshooting.md#installation-troubleshooting) for tips.

#### NPM Prerequisites

* **Node**: You'll need to install Node JS before installing Dat. Dat needs `node` version 6 or above and `npm` installed. You can run `node -v` to check your version. Dat follows the Node.js LTS schedule for Node support.
* **npm**: `npm` is installed with node. You can run `npm -v` to make sure it is installed.

Once you have `npm` ready, install `dat` from npm with the `--global, -g` option, `npm install -g dat`.

