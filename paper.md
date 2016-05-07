# Dat

## Distributed Dataset Synchronization And Versioning

Draft 1
Maxwell Ogden
max@maxogden.com
2016

## ABSTRACT

Dat is a swarm based version control system designed for sharing large datasets over networks such that their contents can be accessed randomly, be updated incrementally, and have the integrity of their contents be trusted. Every Dat user is simultaneously a server and a client exchanging pieces of data with other peers in a swarm on demand. As data is added to a Dat repository updated files are split into pieces based on Rabin fingerprinting and deduplicated against known pieces to avoid retransmission of data. File contents are automatically verified using secure hashes meaning you do not need to trust other nodes.

## 1. INTRODUCTION

There are countless ways to share share datasets over the Internet today. The simplest and most widely used approach, sharing files over HTTP, is subject to dead links when files are moved or deleted, as HTTP has no concept of history or versioning built in. E-mailing datasets as attachments is also widely used, and has the concept of history built in, but many email providers limit the maximum attachment size which makes it impractical for many datasets.

Cloud storage services like S3 ensure availability of data, but as they have a centralized hub-and-spoke networking model tend to be limited by their bandwidth, meaning popular files can be come very expensive to share. Services like Dropbox and Google Drive provide version control and synchronization on top of cloud storage services which fixes many issues with broken links but rely on proprietary code and infrastructure requiring users to store their data on cloud infrastructure which has implications on cost, transfer speeds, and user privacy.

Distributed file sharing tools like BitTorrent become faster as files become more popular, removing the bandwidth bottleneck and making file distribution effectively free. They also implement discovery systems which fix the broken link issue meaning if the original source goes offline other backup sources can be automatically discovered. However P2P file sharing tools today are not supported by Web browsers and do not provide a mechanism for updating files without redistributing a new dataset which could mean entire redownloading data you already have.

Decentralized version control tools for source code like Git provide a protocol for efficiently downloading changes to a set of files, but are optimized for text files and have issues with large files. Solutions like Git-LFS solve this by using HTTP to download large files, rather than the Git protocol. GitHub offers Git-LFS hosting but charges repository owners for bandwidth on popular files. Building a peer to peer distribution layer for files in a Git repository is difficult due to design of Git Packfiles which are delta compressed repository states that do not support random access to byte ranges in previous file versions.

One case study is science. Increasingly scientific datasets are being provided online using one of the above approaches, and cited in published literature. Broken links and systems that do not provide version checking or content addressability of data directly limit the reproducibility of scientific analyses based on shared datasets. Services that charge a premium for bandwidth cause monetary and data transfer strain on the users sharing the data, who are often on fast public university networks with effectively unlimited bandwidth. Version control tool designed for text files do not keep up with the demands of large data analysis in science today.

## 2. INSPIRATION

- git
- lbfs
- bittorrent
- webtorrent
- ipfs

## 3. DESIGN

- mirroring
- reproducibility
- parallel downloading
- incremental updates
