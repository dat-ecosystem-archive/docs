---
id: dat-ecosystem
title: Open Source Ecosystem
---

We have built and contributed to a variety of modules that support our work on Dat as well as the larger data and code ecosystem. Feel free to go deeper and see the implementations we are using in the [Dat command-line tool](https://github.com/datproject/dat) and the [Dat Desktop](https://github.com/datproject/dat-desktop).

Dat embraces the Unix philosophy: a modular design with composable parts. All of the pieces can be replaced with alternative implementations as long as they implement the abstract API. We believe this creates better end-user software, but more importantly, will create more sustainable and impactful open source tools.

## User Software

* [dat](https://github.com/datproject/dat) - The Dat command line interface.
* [Dat Desktop](https://github.com/datproject/dat-desktop) - Desktop application similar to a torrent client.
* [Beaker](https://beakerbrowser.com) - A web browser for exploring and building Dat websites.

## Specifications

* [How Dat Works](https://datprotocol.github.io/how-dat-works/) - Visual explanation of the Dat protocol.
* [Dat Enhancement Proposals](https://github.com/datprotocol/DEPs) - Contains all specs for the Dat protocol, including drafts.

## Core Modules

These modules form the backbone of Dat software:

* [hypercore](https://github.com/mafintosh/hypercore) - A secure, distributed append-only log.
* [hyperdrive](https://github.com/mafintosh/hyperdrive) - A secure, real time distributed file system (built on hypercore).
* [hyperdiscovery](https://github.com/datproject/hyperdiscovery) - Defaults for networking discovery and connection management.
* [dat-node](https://github.com/datproject/dat-node) - High-level module for building Dat applications on the file system.
* [dat-js](https://github.com/datproject/dat-js) - Using Dat in the browser.

View [more on Github](https://github.com/search?utf8=%E2%9C%93&q=topic%3Adat&type=Repositories).

## Related modules

These modules are community-driven and can be used to implement a variety of distributed web applications with Dat.

* [kappa-db](https://github.com/kappa-db) - Small core database for multiwriter kappa architectures.
* [hypermerge](https://github.com/automerge/hypermerge#readme) - CRDT for merging multiple hypercore feeds.
* [mirror-folder](https://github.com/mafintosh/mirror-folder) - Mirror a folder to another folder, supports hyperdrive and live file watching.

