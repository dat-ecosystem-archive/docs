# Dat Module Ecosystem

We have built and contributed to a variety of modules that support our work on Dat as well as the larger data and code ecosystem. Feel free to go deeper and see the implementations we are using in the [Dat command-line tool](https://github.com/datproject/dat) and the [Dat Desktop](https://github.com/datproject/dat-desktop).

Dat embraces the Unix philosophy: a modular design with composable parts. All of the pieces can be replaced with alternative implementations as long as they implement the abstract API.

## Public Interface Modules

* [dat](https://github.com/datproject/dat) - the command line interface for sharing and downloading files
* [Dat Desktop](https://github.com/datproject/dat-desktop) - dat desktop application for sharing and downloading files
* [datproject.org](https://github.com/datproject/datproject.org/) - repository for the Dat project website, a public data registry and sharing
* [Dat Protocol](https://www.datprotocol.com/) - The Dat protocol specification

## File and Block Component Modules

* [hyperdrive](hyperdrive) - The file sharing network dat uses to distribute files and data. Read the technical [hyperdrive-specification](hyperdrive-specification) about how hyperdrive works.
* [hypercore](hypercore) - exchange low-level binary blocks with many sources
* [rabin](https://www.npmjs.com/package/rabin) - Rabin fingerprinter stream
* [merkle-tree-stream](https://www.npmjs.com/package/merkle-tree-stream) - Used to construct Merkle trees from chunks

## Networking & Peer Discovery Modules

* [discovery-channel](https://www.npmjs.com/package/discovery-channel) - discover data sources
* [discovery-swarm](https://www.npmjs.com/package/discovery-swarm) - discover and connect to sources
* [bittorrent-dht](https://www.npmjs.com/package/bittorrent-dht) - use the Kademlia Mainline DHT to discover sources
* [dns-discovery](https://www.npmjs.com/package/dns-discovery) - use DNS name servers and Multicast DNS to discover sources
* [utp-native](https://www.npmjs.com/package/utp-native) - UTP protocol implementation
