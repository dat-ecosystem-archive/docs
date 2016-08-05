If you want to go deeper and see the implementations we are using in the [Dat command-line tool](https://github.com/maxogden/dat), here you go:

- [dat](https://www.npmjs.com/package/dat) - the main command line tool that uses all of the below
- [discovery-channel](https://www.npmjs.com/package/discovery-channel) - discover data sources
- [discovery-swarm](https://www.npmjs.com/package/discovery-swarm) - discover and connect to sources
- [hyperdrive](https://www.npmjs.com/package/hyperdrive) - The file sharing network dat uses to distribute files and data. A technical specification / discussion on how hyperdrive works is [available here](https://github.com/mafintosh/hyperdrive/blob/master/SPECIFICATION.md)
- [hypercore](https://www.npmjs.com/package/hypercore) - exchange low-level binary blocks with many sources
- [bittorrent-dht](https://www.npmjs.com/package/bittorrent-dht) - use the Kademlia Mainline DHT to discover sources
- [dns-discovery](https://www.npmjs.com/package/dns-discovery) - use DNS name servers and Multicast DNS to discover sources
- [utp-native](https://www.npmjs.com/package/utp-native) - UTP protocol implementation
- [rabin](https://www.npmjs.com/package/rabin) - Rabin fingerprinter stream
- [merkle-tree-stream](https://www.npmjs.com/package/merkle-tree-stream) - Used to construct Merkle trees from chunks
