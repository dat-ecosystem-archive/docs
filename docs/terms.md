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

### Hyperdrive

### Hypercore

### Hyper- (modules)
