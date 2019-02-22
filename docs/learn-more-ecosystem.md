---
id: dat-ecosystem
title: Open Source Ecosystem
---

We have built and contributed to a variety of modules that support our work on Dat as well as the larger data and code ecosystem. Feel free to go deeper and see the implementations we are using in the [Dat command-line tool](https://github.com/datproject/dat) and the [Dat Desktop](https://github.com/datproject/dat-desktop).

Dat embraces the Unix philosophy: a modular design with composable parts. All of the pieces can be replaced with alternative implementations as long as they implement the abstract API. We believe this creates better end-user software, but more importantly, will create more sustainable and impactful open source tools.

## User Software

* [dat](https://github.com/datproject/dat) - The command line interface for Dat.
* [Dat Desktop](https://github.com/datproject/dat-desktop) - Desktop application for Dat.

## Specifications

* [Dat Protocol](https://www.datprotocol.com/) - Specifications for the Dat protocol
* [How Dat Works](https://datprotocol.github.io/how-dat-works/) - Visual explanation of the Dat protocol

## Core Modules

These modules form the backbone of Dat software:

* [hypercore](https://github.com/mafintosh/hypercore) - A secure, distributed append-only log.
* [hyperdrive](https://github.com/mafintosh/hyperdrive) - A secure, real time distributed file system (built on hypercore).
* [hyperdiscovery](https://github.com/karissa/hyperdiscovery) - Defaults for networking discovery and connection management.
* [dat-node](https://github.com/datproject/dat-node) - High-level module for building Dat applications on the file system.
* [dat-ks](https://github.com/datproject/dat-js) - Using Dat in the browser.

View [more on Github](https://github.com/search?utf8=%E2%9C%93&q=topic%3Adat&type=Repositories).

## Modules We Like & Use

These modules we use throughout our applications:

* [Choo](https://github.com/yoshuawuyts/choo) - A 4kb framework for creating sturdy frontend applications.
* [neat-log](https://github.com/joehand/neat-log) - A neat cli logger for stateful command line applications Edit
Add topics
* [mirror-folder](https://github.com/mafintosh/mirror-folder) - Mirror a folder to another folder, supports hyperdrive and live file watching.
