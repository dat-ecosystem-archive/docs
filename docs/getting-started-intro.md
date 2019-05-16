---
id: intro
title: What is Dat?
sidebar_label: Intro to Dat
---

Dat is a protocol for sharing data between computers. By making sure changes in data are transparent, everyone receives only the data they want, and connecting computers directly (rather than using a cloud server), Dat powers communities building next-generation Web.

## Welcome to Dat

Ever tried moving large files and folders to other computers? Usually this involves one of a few strategies: being in the same location (usb stick), using a cloud service (Dropbox), or using old but reliable technical tools (rsync). None of these easily store, track, and share your data over time. People often are stuck choosing between security, speed, or ease of use. Dat provides all three by using a state of the art technical foundation and user friendly tools for fast and encrypted file sharing that you control.

Dat is free software built for the public by the open source consortium of contributors. Researchers, analysts, libraries, and universities are [already using Dat](https://www.nytimes.com/2017/03/06/science/donald-trump-data-rescue-science.html) to archive and distribute scientific data. Developers are building applications on Dat for [browsing peer-to-peer websites](https://beakerbrowser.com) and [offline editable maps](https://www.digital-democracy.org/blog/update-from-the-ecuadorian-amazon/).  Anyone can use Dat to backup files or share cute cat pictures with a friend. Install and get started today by using the desktop application, command line, or JavaScript library.

Ready to try it? [Head over to Installation to get started.](getting-started-installation.md)

## Why Dat?

Cloud services, such as Dropbox or GitHub, force users to store data on places outside of their control. Until now, it has been very difficult to avoid centralized servers without major sacrifices. Dat's unique distributed network allows users to store data where they want. By decentralizing storage, Dat also increases speeds by downloading from many sources at the same time.

Having a history of how files have changed is essential for effective collaboration and reproducibility. Git has been promoted as a solution for history, but it becomes slow with large files and a high learning curve. Git is designed for editing source code, while Dat is designed for sharing files. With a few simple commands, you can version files of any size. People can instantly get the latest files or download previous versions.

In sum, we've taken the best parts of Git, BitTorrent, and Dropbox to design Dat. Learn more about how it all works by reading [How Dat Works](https://datprotocol.github.io/how-dat-works) or get more in depth at [datprotocol.com](https://datprotocol.com).

#### Distributed Network

Dat works on a distributed network unlike cloud services, such as Dropbox or Google Drive. This means Dat transfers files peer to peer, skipping centralized servers. Dat's network makes file transfers faster, encrypted, and auditable. You can even use Dat on local networks for offline file sharing or local backups. Dat reduces bandwidth costs on popular files, as downloads are *distributed* across all available computers, rather than centralized on a single host.

#### Data History

Dat makes it easy for you to save old versions of files. With every file
update, Dat automatically tracks your changes. You can even direct these
backups to be stored efficiently on an external hard drive or a cloud serve by using [our archiver](usingdat-server.md).

#### Security

Dat transfers files over an encrypted connection using state-of-the-art
cryptography. Only users with your unique read key can access your files. Your dat read key allows users to download and re-share your files. To write updates to a dat, users must have the write key. Dat also verifies the hashes of files on download so no malicious content can be added. As long as the read key isn't shared outside of your team, the content will be encrypted, though the IP addresses and discovery key may become known. [Read more about security in dat.](learn-more-security.md)

Note: There has not been an independent security audit for Dat.

## Who we are

Dat is a vibrant global community of people contributing and building software with the Dat protocol. The community hosts [weekly meetings](https://comm-comm.datproject.org/) to chat about Dat.

The Dat Project is a fiscally supported project of [Code for Science & Society](https://codeforscience.org), a nonprofit supporting open source tools that benefit science and society. 

These documents are collaboratively maintained on Github under
[datproject/docs](https://github.com/datproject/docs). We welcome corrections
and requests for clarification.

Enough reading, more doing? Head over to [Installation to get started](getting-started-installation.md).
