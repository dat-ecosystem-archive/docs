---
id: troubleshooting
title: Troubleshooting Dat
---

We've provided some troubleshooting tips based on issues users have seen. Please [open an issue](https://github.com/datproject/dat/issues/new) or ask us in our [chat room](https://gitter.im/datproject/discussions) if you need help troubleshooting and it is not covered here.

### Check Your Version

Knowing the version is really helpful if you run into any bugs, and will help us troubleshoot your issue.

**In the Command Line:**

```
dat -v
```

You should see the Dat semantic version printed, e.g. `13.1.2`.

## Networking Issues

All Dat transfers happen directly between computers. Dat has various methods for connecting computers but because networking capabilities vary widely we may have issues connecting. Whenever you run a Dat there are several steps to share or download files with peers:

1. Discovering other sources
2. Connecting to sources
3. Sending & Receiving Data

With successful use, Dat will show network counts after connection. If you never see a connection, your network may be restricting discovery or connection. Please try using the dat doctor (see below) between the two computers not connecting. This will help troubleshoot the networks.

### Dat Doctor

We've included a tool to identify network issues with Dat, the Dat doctor. The Dat doctor will run two tests:

1. Attempt to connect to a public server running Dat.
2. Attempt a direct connection between two computers. You will need to run the command on both the computers you are trying to share data between.

**In Dat Desktop:**

Our desktop Dat doctor is still in progress, currently you can only test connections to our public server (#1).

1. View > Toggle Developer Tools
2. Help > Doctor

You should see the doctor information printed in the console.

**In the Command Line:**

Start the doctor by running:

```
dat doctor
```

For direct connection tests, the doctor will print out a command to run on the other computer, `dat doctor <64-character-string>`. The doctor will run through the key steps in the process of sharing data between computers to help identify the issue.

### Known Networking Issues

* Dat may [have issues](https://github.com/datproject/dat/issues/503) connecting if you are using iptables.

## Installation Troubleshooting

To use the Dat command line tool you will need to have [node and npm installed](https://docs.npmjs.com/getting-started/installing-node). Make sure those are installed correctly before installing Dat. Dat only supports Node versions 4 and above.

```
node -v
```

#### Global Install

The `-g` option installs Dat globally allowing you to run it as a command. Make sure you installed with that option.

* If you receive an `EACCES` error, read [this guide](https://docs.npmjs.com/getting-started/fixing-npm-permissions) on fixing npm permissions.
* If you receive an `EACCES` error, you may also install dat with sudo: `sudo npm install -g dat`.
* Have other installation issues? Let us know, you can [open an issue](https://github.com/datproject/dat/issues/new) or ask us in our [chat room](https://gitter.im/datproject/discussions).

## Command Line Debugging

If you are having trouble with a specific command, run with the debug environment variable set to `dat` (and optionally also `dat-node`). This will help us debug any issues:

```
DEBUG=dat,dat-node dat clone dat://<readKey> dir
```
