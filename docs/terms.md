## General Terminology

### Dat

A folder containing files of any type, which can be synced to other people on the distributed web.

### Distributed Web

In a Distributed Web (P2P) model, those who are downloading the data are also providing some of the bandwidth and storage to run it. Instead of one server, we have many. The more people or organizations that are involved in the Distributed Web, the more redundant, safe, and fast it will become.

Currently, the Web is centralized: if someone controls the hardware or the communication line, then they control all the uses of that website. [Read more here](http://brewster.kahle.org/2015/08/11/locking-the-web-open-a-call-for-a-distributed-web-2/).

### Peer to Peer (P2P)

A P2P software program searches for other connected computers on a P2P network to locate the desired content. The peers of such networks are end-user computer systems that are interconnected via the Internet.

### Peer

Another user who has downloaded the data (or parts of it) and is uploading it to others in the Dat Swarm.

### Swarm

A group of peers that have downloaded the data (or parts of it) and are connected to each other over the Distributed Web.

### Owner

User who owns a dat, has the secret key on local machine allowing them to write data.

### Collaborator

User who are granted read access to a dat by the owner.
  - TODO say something about security/who can read the dat.
  - say something about granting write access (multiwriter not avaialable yet)

### Secure Register

A [register]( https://gds.blog.gov.uk/2015/09/01/registers-authoritative-lists-you-can-trust/) is an authoritative list of information you can trust. We maintain an open register called [Dat Folder](datfolder.org) which contains public data, and is open to everyone.

### Dat Link

User needs this to share or download data. e.g., `dat://ab3ed4f...`

### Snapshot Archive / non-live Archive

A snapshot archive, or non-live archive, uses a content-based hash as the link. This means that the link is unique for that set of files and content. Once the content changes, the link will change.

Snapshot archives can be used as checkpoints or for publishing specific versions of datasets with guarantees that the content will not change.

### Beaker

The [Beaker Browser](https://beakerbrowser.com/) is an experimental p2p browser that can view and publish dats alongside traditional web browsing.

## Technical Terms

### Metadata

Like an HTTP header, the list of file contents and a variety of information regarding the file list.

### Discovery Key

The discovery key is a hashed public key. The discovery key is used to find peers on the public key without exposing the original public key to network.

### Key

A 32-bit hash that uniquely represents a feed.

### Public Key vs Secret Key

The secret key is how messages are signed on the dat. The owner is the only one with the secret key. The public key is the key that is shared in the Dat Link.

### Feed / Core Feed

A feed is a term we use interchangeably with the term "append-only log". It’s the lowest level component of a dat.

Feeds are created with hypercore.

### Hyperdrive

[Hyperdrive](https://github.com/mafintosh/hyperdrive) is peer to peer directories. Moving files between computers on a planet-scale system was never easier. We built this to efficiently share terabytes of scientific data in real time between research institutions on multiple continents, but it should work fine to share a text file on your the local network too.

### Hypercore

[Hypercore](https://github.com/mafintosh/hypercore) is secure distributed streams that just work. Using cryptography, streaming binary data to other computers is as easy as sharing a key. This creates an efficient gossip network where latency is reduced to a minimum. Hypercore is an eventually consistent, highly available, partition tolerant system.

### Hyper- (modules)

Modules that are use hyperdrive archives or hypercore feeds in a cross-compatible way, for example [hyperdiscovery](https://github.com/karissa/hyperdiscovery) or [hyperhealth](https://github.com/karissa/hyperhealth).

If a module is only compatible with one one of hyperdrive or hypercore, they should be prefixed with that name, e.g. [hyperdrive-import-files](https://github.com/juliangruber/hyperdrive-import-files).
