# Dat 1.0 docs

Documentation resources for upcoming [dat](https://github.com/maxogden/dat) 1.0 release and the surrounding ecosystem.

## Hosting

By default, dat looks to host on port 3282, and if taken, will choose a random open port.

## Hidden folder

Dat stores its data in a hidden folder that is stored by default in the user's home directory.

```
~/.dat
```

Because of this, data is only ever downloaded once. That is, if you have multiple projects that use the same data (perhaps at different versions) on the same machine, dat will first check the global `.dat` folder.

The global `.dat` folder has inside:

```
$ ls ~/.dat
db
config.json
```

## Dat dependency overview

#### [hyperdrive](https://github.com/mafintosh/hyperdrive)

The file sharing network dat uses to distribute files and data. A technical specification / discussion on how hyperdrive works is [available here](https://github.com/mafintosh/hyperdrive/blob/master/SPECIFICATION.md)

#### [discovery-channel](https://github.com/maxogden/discovery-channel)

This is the module dat uses to find peers on the local network or the internet who are sharing the same files and data that you are.

