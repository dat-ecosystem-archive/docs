## General Terminology

### Dat archive

A folder containing files of any type, which can be synced to other people on the distributed web. A Dat archive has content (files) and metadata, both shared to peers.

A Dat archive has a Dat link used to share with other people.

### Distributed Web

In a Distributed Web (P2P) model, those who are downloading the data are also providing some of the bandwidth and storage to run it. Instead of one server, we have many. The more people or organizations that are involved in the Distributed Web, the more redundant, safe, and fast it will become.

Currently, the Web is centralized: if someone controls the hardware or the communication line, then they control all the uses of that website. [Read more here](http://brewster.kahle.org/2015/08/11/locking-the-web-open-a-call-for-a-distributed-web-2/).

### Peer to Peer (P2P)

A P2P software program searches for other connected computers on a P2P network to locate the desired content. The peers of such networks are end-user computer systems that are interconnected via the Internet.

In Dat, peers only connect if they both have the same Dat link.

### Peer

Another user or server who has downloaded the data (or parts of it) and is uploading it to others in the Dat Swarm.

### Swarm or Network

A group of peers that want or have downloaded data for a Dat archive and are connected to each other over the Distributed Web.

### Owner

User who owns a Dat archive. This user has the secret key on local machine allowing them to write data.

### Collaborator

User who are granted read access to a Dat archive by the owner. A collaborator can access a Dat archive if the owner or another collaborator sends the the Dat link.

In the future, owners will be able to grant collaborators write access to the Dat archive, allowing them to modify and create files in the archive.

### Secure Register

A [register]( https://gds.blog.gov.uk/2015/09/01/registers-authoritative-lists-you-can-trust/) is an authoritative list of information you can trust. We maintain an open register called [Dat Folder](datfolder.org) which contains public data, and is open to everyone.

### Dat Link

Identifier for a Dat archive, e.g. `dat://ab3ed4f...`. These are 64 character hashes with the `dat://` protocol prefix. Anyone with the Dat link can download and re-share files in a Dat archive.

### Snapshot Archive

A snapshot archive uses a content-based hash as the Dat link. This means that the link is unique for that set of files and content. Once the content changes, the link will change.

Snapshot archives can be used as checkpoints or for publishing specific versions of datasets with guarantees that the content will not change.

### Beaker

The [Beaker Browser](https://beakerbrowser.com/) is an experimental p2p browser that can view and publish dats alongside traditional web browsing.

## Technical Terms

### Metadata

Like an HTTP header, the metadata contains a pointer to the contents of Dat and the file list.

The metadata is a hypercore feed.

### Content Feed

The content feed is a hypercore feed containing the file contents for a Dat archive. The content feed together with a metadata feed make a Dat archive.

### Key

A 32-bit hash that uniquely represents a feed. All feeds have keys. The metadata key is used as the public key for an archive.

### Public Key vs Secret Key

The public key is the key that is shared in the Dat Link. Messages are signed using the secret key, allowing write access to feeds. The owner is the only user with the secret key.

### Discovery Key

The discovery key is a hashed public key. The discovery key is used to find peers on the public key without exposing the original public key to network.

### Feed / Core Feed

A feed is a term we use interchangeably with the term "append-only log". It’s the lowest level component of Dat.

Feeds are created with hypercore.

### Hyperdrive

[Hyperdrive](https://github.com/mafintosh/hyperdrive) is peer to peer directories. We built hyperdrive to efficiently share scientific data in real time between research institutions. Hyperdrive handles the distribution of files while encrypting data transfer and ensuring content integrity. Hyperdrive creates append-only logs for file changes allow users to download partial datasets and to create versioned data. Hyperdrive is built on hypercore.

Archives created with hyperdrive are made with two feeds, one for the metadata and one for the content. A hyperdrive instance can store any number of archives.

### Hypercore

[Hypercore](https://github.com/mafintosh/hypercore) is a protocol and network for distributing and replicating feeds of binary data. This creates an efficient gossip network where latency is reduced to a minimum. Hypercore is an eventually consistent, highly available, partition tolerant system.

Hypercore instances can contain any number of feeds.

### Hyper- (modules)

Modules that are use hyperdrive archives or hypercore feeds in a cross-compatible way, for example [hyperdiscovery](https://github.com/karissa/hyperdiscovery) or [hyperhealth](https://github.com/karissa/hyperhealth).

If a module is only compatible with one one of hyperdrive or hypercore, they should be prefixed with that name, e.g. [hyperdrive-import-files](https://github.com/juliangruber/hyperdrive-import-files).
