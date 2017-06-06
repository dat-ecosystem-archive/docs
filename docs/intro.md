# Welcome to Dat

Ever tried moving large files and folders to other computers? Usually this involves one of a few strategies: being in the same location (usb stick), using a cloud service (Dropbox), or using old but reliable technical tools (rsync). None of these easily store, track, and share your data securely over time. People often are stuck choosing between security, speed, or ease of use. Dat provides all three by using a state of the art technical foundation and user friendly tools for fast and secure file sharing that you control.

Dat is free software built for the public by Code for Science & Society, a nonprofit. Researchers, analysts, libraries, and universities are [already using dat](https://www.nytimes.com/2017/03/06/science/donald-trump-data-rescue-science.html) to archive and distribute scientific data. Developers are building applications on Dat for [browsing peer-to-peer websites](beakerbrowser.com) and [offline editable maps](https://www.digital-democracy.org/blog/update-from-the-ecuadorian-amazon/).  Anyone can use Dat to backup files or share those cute cat pictures with a friend. Install and get started today by using the desktop application, command line, or JavaScript library.

Ready to try it? [Head over to Installation to get started.](/install)

## Why Dat?

When sharing files, current tools have tradeoffs: lower costs and ease of use, or security and speed. Cloud services, such as Dropbox or GitHub, force users to store data on places outside of their control. Until now, it has been very difficult to avoid centralized servers without major sacrifices. Dat's unique distributed network allows users to store data where they want. By decentralizing storage, Dat also increases speeds by downloading from many sources at the same time.

Having a history of how files have changed is essential for effective collaboration and reproducibility. Git has been promoted as a solution for history, but it becomes slow with large files and a high learning curve. Git is designed for editing source code, while Dat is designed for sharing files. With a few simple commands, you can version files of any size. People can instantly get the latest files or download previous versions.

In sum, we've taken the best parts of Git, BitTorrent, and Dropbox to design Dat. Learn more about how it all works by learning our [key concepts](/concepts) or get more technical by reading [the Dat whitepaper](https://github.com/datproject/docs/blob/master/papers/dat-paper.pdf).

#### Distributed Network

Dat works on a distributed network unlike cloud services, such as Dropbox or Google Drive. This means Dat transfers files peer to peer, skipping centralized servers. Dat's network makes file transfers faster and more secure. You can even use Dat on local networks for offline file sharing or local backups. Dat reduces bandwidth costs on popular files, as downloads are *distributed* across all available computers, rather than centralized on a single host.

#### Data History

Dat makes it easy for you to save old versions of files. With every file
update, Dat automatically tracks your changes. You can even direct these
backups to be stored efficiently on an external hard drive or a cloud serve by using [our archiver](/server).

#### Security

Dat transfers files over an encrypted connection using state-of-the-art cryptography. Only users with your unique link can access your files. Your dat link allows users to download and re-share your files. To write updates to a dat, users must have the secret key. Dat also verifies the hashes of files on download so no malicious content can be added.

## Who we are

Dat is funded by [Code for Science & Society](https://codeforscience.org), a nonprofit supporting open source tools that benefit science and society. Dat also has a vibrant global community of developers building apps on the Dat protocol.

Enough reading, more doing? [Head over to Installation to get started.](/install)
