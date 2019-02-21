---
id: concepts
title: Key Dat Concepts
---

## In Place Archiving

You can turn any folder on your computer into *a dat*. We call this *in place archiving*. A dat is a regular folder with some magic attached. The magic is a set of metadata files, in a `.dat` folder. Dat uses the metadata to track file history and securely share your files. Your files and the `.dat` folder can be instantly synced to anywhere.

Once you have installed Dat, you can use a single command to live sync your files to friends, backup to an external drive, and publish to a website (so people can download over http too!). The cool part is this all happens at the same time. If you go offline for a bit, no worries. Dat shares the latest files and any saved history once you are back online. These data transfers happen between the computers, forgoing any centralized source.

In place archiving in Dat really means **any place**. Dat seamlessly syncs your files where you want and when you want. Dat's decentralized technology and automatic versioning will improve data availability and data quality without sacrificing ease of use.

## Distributed Network

Dat goes beyond regular archiving through its *distributed network*. When you share data, Dat sends data to many download locations at once, and they can sync the same data with each other! By connecting users directly Dat transfers files faster, especially sharing on a local network. Distributed syncing allows robust global archiving for public data.

The Dat read key controls access to your data. Any data shared in the network is encrypted using your read key. Learn more about Dat's security and privacy below or in [the faqs](getting-started-faq.md). We are also investigating ways to improve [reader privacy](https://blog.datproject.org/2016/12/12/reader-privacy-on-the-p2p-web/) for public data.

## Version History

Dat automatically maintains a built-in version history whenever files are added. Dat uses this history to allow partial downloads of files, for example only getting the latest files. There are two types of versioning performed automatically by Dat. Metadata is stored in a folder called `.dat` in the main folder of a repository, and data is stored as normal files in the main folder.

Dat uses append-only registers to store version history. This means all changes are written to the end of the file, growing over time.

### Metadata Versioning

Dat acts as a one-to-one mirror of the state of a folder and all its contents. When importing files, Dat grabs the filesystem metadata for each file and checks if there is already an entry for this filename. If the file with this metadata matches exactly the newest version of the file metadata stored in Dat, then this file will be skipped (no change).

If the metadata differs or does not exist, then this new metadata entry will be appended as the new 'latest' version for this file in the append-only SLEEP metadata content register.

### Content Versioning

The metadata only tells you if or when a file is changed, not how it changed. In addition to the metadata, Dat tracks changes in the content in a similar manner.

The default storage system used in Dat stores the files as files. This has the advantage of being very straightforward for users to understand, but the downside of not storing old versions of content by default.

In contrast to other version control systems, like Git, Dat only stores the current set of files, not older versions. Git, for example, stores all previous content versions and all previous metadata versions in the `.git` folder. But Dat is designed for larger datasets.

Storing all history on content could easily fill up the users' hard drive. Dat has multiple storage modes based on usage. With Dat's dynamic storage, you can store the content history on a local external hard drive or on a remote server (or both!).

## Dat Privacy

Files shared with Dat are encrypted (using the read key) so *only* users with your unique read key can access your files. The read key acts as a kind of password meaning, generally, you should assume *anyone* with the read key will have access to your files.

The read key allows users to download, and re-share, your files, whether you intended them to have the read key or not (with some hand waiving assumptions about them being able to connect to you, which can be limited, see more in [security & privacy faq](faq#security-and-privacy)).

Make sure you are thoughtful about who you share read keys with and how. Dat ensures read key cannot be intercepted through the Dat network. If you share your read key over other channels, ensure the privacy & security matches or exceeds your data security needs. We try to limit times when Dat displays full read key to avoid accidental sharing.

## dat:// read keys

Dat read keys have some special properties that are helpful to understand.

Traditionally, http links point to a specific server, e.g. datproject.org's server, and/or a specific resource on that server. Unfortunately, links often break or the content changes without notification (this makes it impossible to cite `nytimes.com`, for example, because the link is meaningless without a reference to what content was there at citation time). Dat read keys, on the other hand, never change. You can update data in a dat and use the same link to download the changes.

Here is an example dat read key:

```
dat://ff34725120b2f3c5bd5028e4f61d14a45a22af48a7b12126d5d588becde88a93
```

What is with the weird long string of characters? Let's break it down!

**`dat://` - the protocol**

The first part of the read key is the link protocol, Dat (read about the Dat protocol at [datprotocol.com](http://www.datprotocol.com)). The protocol describes what "language" the read key is in and what type of applications can open it. You do not always need this part with Dat but it is helpful context.

**`ff34725120b2f3c5bd5028e4f61d14a45a22af48a7b12126d5d588becde88a93` - the unique identifier**

The second part of the read key is a 64-character hex strings ([ed25519 public-keys](https://ed25519.cr.yp.to/) to be precise). Each Dat archive gets a public read key to identify it. With the hex string as a read key we can do a few things:

1. Encrypt the data transfer
2. Create a persistent identifier, an ID that never changes, even as file are updated (as opposed to a checksum which is based on the file contents).

**`dat://ff34725120b2f3c5bd5028e4f61d14a45a22af48a7b12126d5d588becde88a93`**

All together, the read keys can be thought of similarly to a web URL, as a place to get content, but with some extra special properties. When you download a dat:

1. You do not have to worry about where the files are stored.
2. You can always get the latest files available.
3. You can view the version history or add version numbers to urls to get a permanent id to a specific version.

[Go here if you'd like to read more about how dat works.](https://datprotocol.github.io/how-dat-works/)
