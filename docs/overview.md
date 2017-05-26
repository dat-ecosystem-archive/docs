# Dat Overview & Tutorial

This overview will introduce you to Dat, a new type of distributed data tool, and help you make the most of it. Dat uses modern cryptography, decentralized networks, and content versioning so you can share and publish data with ease. After covering the core concepts of Dat, a tutorial will get you sharing and downloading data with Dat Desktop or dat command line.

With Dat, we want to make data sharing, publishing, and archiving fit into your workflow. Dat's unique design works wherever you store your data. You can keep files synced whether they're on your laptop, a public data repository, or in a drawer of hard drives. Dat securely ties all these places together, creating a dynamic data archive. Spend less time managing files, more time digging into data (unfortunately we cannot sort your hard drive drawer, yet).

**Install Dat now.** Then it'll be ready to use when you get to the tutorial section, perfect!

<a href="https://datproject.org/install#desktop" target="_blank" title="Install Dat Desktop"><img src="/assets/install_desktop.png" alt="Install Dat Desktop" style="width:250px;"/></a>
<a href="https://datproject.org/install#terminal" target="_blank" title="Install dat command line"><img src="/assets/install_cli.png" alt="Install dat command line" style="width:250px;"/></a>

## In Place Archiving

You can turn any folder on your computer into *a dat*. We call this *in place archiving*. A dat is a regular folder with some magic attached. The magic is a set of metadata files, in a `.dat` folder. Dat uses the metadata to track file history and securely share your files. Your files and the `.dat` folder can be instantly synced to anywhere.

<img src="/assets/dat_folder.png" alt="Create a dat with any folder" style="width:500px;"/>

Once installing Dat, you can use a single command to live sync your files to friends, backup to an external drive, and publish to a website (so people can download over http too!). The cool part is this all happens at the same time. If you go offline for a bit, no worries. Dat shares the latest files and any saved history once you are back online. These data transfers happen between the computers, forgoing any centralized source.

In place archiving in Dat really means **any place**. Dat seamlessly syncs your files where you want and when you want. Dat's decentralized technology and automatic versioning will improve data availability and data quality without sacrificing ease of use.

## Distributed Network

Dat goes beyond regular archiving through it's *distributed network*. When you share data, Dat sends data to many download locations at once, and they can sync the same data with each other! By connecting users directly Dat transfers files faster, especially sharing on a local network. Distributed syncing allows robust global archiving for public data.

<img src="/assets/share_link.png" alt="Share unique dat link" style="width:500px;"/>

To maintain privacy, the dat link controls access to your data. Any data shared in the network is encrypted using your link as the password. Learn more about Dat's securtiy and privacy below or in [the faqs](faq#security-and-privacy). We are also investigating ways to improve [reader privacy](https://blog.datproject.org/2016/12/12/reader-privacy-on-the-p2p-web/) for public data.

## Version History

TODO:

* append-only log
* partial replication

## Tutorial 

In this tutorial we will go through the two main ways to use Dat, sharing data and downloading data. If possible, this is great to go through with a partner to see how Dat works across computers. Get Dat [installed](intro#installation) and get started!

Dat Desktop makes it easy for anyone to get started using Dat with user-friendly interface. If you are comfortable with the command line then you can install dat via npm. No pressure! You can always switch apps later and keep your dats the same. Dat can share your files to anyone without caring how they are using Dat.

### Sharing Data

We'll be creating a dat from a folder on your computer. If you are with a friend you can sync these files to their computer. Otherwise you can view them online via datproject.org to see how viewing a dat online works (datproject.org does only stores data as a temporary cache, not permanently). Any kind of files work with Dat but for now, make sure it's something you want to share with your friends. We like cat pictures.

<img src="/assets/desktop_share.gif" alt="Share folder with Dat Desktop" style="width:500px;"/>

#### Dat Privacy in Brief

Files shared with Dat are encrypted (using the link) so *only* users with your unique link can access your files. The link acts as a kind of password meaning, generally, you should assume *anyone* with the link will have access to your files. 

The link allows users to download, and re-share, your files, whether you intended them to have the link or not (with some hand waiving assumptions about them being able to connect to you, which can be limited, see more in [security & privacy faq](faq#security-and-privacy)). 

Make sure you are thoughtful about who you share links with and how. Dat ensures links cannot be intercepted through the Dat network. If you share your links over other channels, ensure the privacy & security matches or exceeds your data security needs. We try to limit times when Dat displays full links to avoid accidental sharing.

### Downloading Data

TODO

***You are ready to get started! Visit the [installation page](intro#installation) to download Dat.***

### Primer on `dat://` links

If you want to learn a bit more, Dat links are a good topic! Dat links have some special properties that are helpful to understand.

Traditionally, http links point to a specific server, e.g. datproject.org's server, and/or a specific resource on that server. Unfortunately, links often break or the content changes without notification (this makes it impossible to cite `nytimes.com`, for example, because the link is meaningless without a reference to what content was there at citation time).

You may have seen Dat links around:

```
dat://ff34725120b2f3c5bd5028e4f61d14a45a22af48a7b12126d5d588becde88a93
```

What is with the weird long string of characters? Let's break it down!

**`dat://` - the protocol**

The first part of the link is the link protocol, Dat (read about the Dat protocol at [datprotocol.com](http://www.datprotocol.com)). The protocol describes what "language" the link is in and what type of applications can open it. You do not always need this part with Dat but it is helpful context.

**`ff34725120b2f3c5bd5028e4f61d14a45a22af48a7b12126d5d588becde88a93` - the unique identifier**

The second part of the link is a 64-character hex strings ([ed25519 public-keys](https://ed25519.cr.yp.to/) to be precise). Each Dat archive gets a public key link to identify it. With the hex string as a link we can a few things:

1. Encrypt the data transfer
2. Create a persistent identifier, an ID that never changes, even as file are updated (as opposed to a checksum which is based on the file contents).

**`dat://ff34725120b2f3c5bd5028e4f61d14a45a22af48a7b12126d5d588becde88a93`**

All together, the links can be thought of similarly to a web URL, as a place to get content, but with some extra special properties. When you download a dat link:

1. You do not have to worry about where the files are stored.
2. You can always get the latest files available.
3. You can view the version history or add version numbers to links to get an permanent link to a specific version.
