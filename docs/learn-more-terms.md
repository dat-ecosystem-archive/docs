---
id: terms
title: Dat Terminology
---


Terms use in the Dat ecosystem.

### dat, Dat archive, archive

A dat, or Dat archive, is a set of files and dat metadata. A dat folder can contain files of any type, which can be synced to other users. A dat has a read key used to share with other people.

When you create a dat with the command line and Node.js API, you're creating a `.dat` folder to hold the metadata and the dat keys (a read and write key).

### Write Key

Write keys are the private part of a key pair. Users that have the write key are able to write updates to a dat.

With the Dat CLI and Desktop application, read keys are stored in a dat folder in your home directory, `~/.dat/secret_keys`. It is important to back these up if you get a new computer.

### Writer

User who can write to a Dat archive. This user has the write key, allowing them to write data. Currently, dats are single-writer.

### Collaborator

User who are granted read access to a Dat archive by the owner. A collaborator can access a Dat archive if the owner or another collaborator sends the Dat link.

In the future, users will be able to grant collaborators write access to the Dat archive, allowing them to modify and create files in the archive.

### Swarm or Network

A group of peers that want or have downloaded data for a Dat archive and are connected to each other over the Distributed Web.

## General Terms

### Distributed Web

In a Distributed Web (P2P) model, those who are downloading the data also provide bandwidth and storage to share it. Instead of one server, we have many. The more people or organizations that are involved in the Distributed Web, the more redundant, safe, and fast it will become.

Currently, the Web is centralized: if someone controls the hardware or the communication line, then they control all the uses of that website. [Read more here](http://brewster.kahle.org/2015/08/11/locking-the-web-open-a-call-for-a-distributed-web-2/).

### Peer to Peer (P2P)

A P2P software program searches for other connected computers on a P2P network to locate the desired content. The peers of such networks are end-user computer systems that are interconnected via the Internet.

In Dat, peers only connect if they both have the same Dat link.

### Store / Storage Provider

Distributed web content needs to have at least one peer in the network which has a copy of the content in order for new peers to be able to download it. Stores or storage providers let users send their Dat read key to their server and they will set up a peer that they guarantee will always be online. [Hashbase](https://hashbase.io/) is a popular storage provider, and you can host your own using [dat-store](https://www.npmjs.com/dat-store) or [Homebase](https://github.com/beakerbrowser/homebase/)

### Beaker

The [Beaker Browser](https://beakerbrowser.com/) is an experimental p2p browser that can view and publish dats alongside traditional web browsing.

## Technical Terms

### SLEEP

SLEEP is the the on-disk format that Dat produces and uses. It is a set of 9 files that hold all of the metadata needed to list the contents of a Dat repository and verify the integrity of the data you receive.

The acronym SLEEP is a slumber related pun on REST and stands for Syncable Lightweight Event Emitting Persistence. The Event Emitting part refers to how SLEEP files are append-only in nature, meaning they grow over time and new updates can be subscribed to as a realtime feed of events through the Dat protocol.

Read the full [SLEEP specification](https://github.com/datproject/docs/blob/master/papers/dat-paper.md#3-sleep-specification) in the dat whitepaper.

### Key

A 32-bit hash that uniquely represents a feed. All hypercore feeds have keys. The metadata key is used as the read key for an archive.

### Read key

The read key is the key that is used as the Dat link. Messages are signed using the read key, allowing write access to feeds. The owner is the only user with the read key.

### Discovery Key

The discovery key is a hashed read key. The discovery key is used to find peers on the read key without exposing the original read key to network.

### Feed

A feed is a term we use interchangeably with the term "append-only log". It’s the lowest level component of Dat. For each Dat, there are two feeds - the metadata and the content.

Feeds are created with hypercore.

### Metadata Feed

Like an HTTP header, the metadata contains a pointer to the contents of Dat and the file list.

The metadata is a hypercore feed. The first entry in the metadata feed is the key for the content feed.

### Content Feed

The content feed is a hypercore feed containing the file contents for a Dat archive. The content feed together with a metadata feed make a Dat archive.

### Version

Internally every dat data-structure is composed of append-only logs or feeds (hypercores). Any time an entry is appended to the log, a new version is created. The version is identified according to the semantics of the data-structure. In the case of single-writer hyperdrive, it's currently being identified by the metadata log's latest message number.

### Sparse

When you load an archive, by default you only load the parts that are necessary. This is called `sparse` replication and is passed in as a flag when initializing the archive. For situations where you want to download the entire history of an archive, `sparse` is set to `false`.

### Checkout

Sometimes you want to load content from a Dat archive at a specific point in it's history. For that you need to checkout a given version which will ignore any newer changes and show you want the archive looked that at that version.

### Hyperdrive

[Hyperdrive](https://github.com/mafintosh/hyperdrive) is peer to peer directories. We built hyperdrive to efficiently share scientific data in real time between research institutions. Hyperdrive handles the distribution of files while encrypting data transfer and ensuring content integrity. Hyperdrive creates append-only logs for file changes allow users to download partial datasets and to create versioned data. Hyperdrive is built on hypercore.

Archives created with hyperdrive are made with two feeds, one for the metadata and one for the content.

### Hypercore

[Hypercore](https://github.com/mafintosh/hypercore) is a protocol and network for distributing and replicating feeds of binary data. This creates an efficient gossip network where latency is reduced to a minimum. Hypercore is an eventually consistent, highly available, partition tolerant system.

### Bootstrapping

In order to discover peers in a P2P network, you must first discover some initial peers to connect to. This is know as Bootstrapping and is done by Dat whenever you load into a swarm. The default bootstrap IPs that Dat uses can be found in the [dat-swarm-defaults](https://github.com/datproject/dat-swarm-defaults/blob/master/index.js) module.
