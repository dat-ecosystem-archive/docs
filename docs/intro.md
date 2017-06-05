# Welcome to Dat

Dat is the distributed data sharing tool. Share files with version control, back up data to servers, browse remote files on demand, and automate long-term data preservation. Secure, distributed, fast.

## Why Dat?

With Dat, we tried to merge concepts from Git, Dropbox, and BitTorrent to build a secure, fast, and distributed data sharing tool that puts you in control of your data. You can turn any folder on your computer into a Dat, and people you trust can subscribe to updates. As more computers download and host the data, downloading the data becomes faster, not slower.

[Ready to try it? Head over to Installation to get started.](/install)

### Why is Dat different?

It is surprisingly difficult to share data between many computers, especially if data is large and changes often. As a solution people often use a centralized proprietary service such as Dropbox to share data. This is a relatively cheap solution, but it can be too slow when data is large because data is uploaded to a computer controlled by Dropbox before it is sent to others. A service like this also requires all parties involved to trust it to manage your data. With a centralized server, it can also become really slow to download data if there are lots of people downloading at the same time. As an alternative, many people have begun to use Git when their data changes often and is small enough. However, when the data becomes large, Git becomes quite slow and difficult to manage. Git also has a high learning curve, so we've been prioritizing usability in our development of Dat. Dat has only a few simple commands and no messy merges.

#### Distributed Network

Dat works on a distributed network unlike cloud services, such as Dropbox or Google Drive. This means Dat transfers files peer to peer, skipping centralized servers. Dat's network makes file transfers faster and more secure. You can even use Dat on local networks for offline file sharing or local backups. Dat reduces bandwidth costs on popular files, as downloads are *distributed* across all available computers, rather than centralized on a single host. This inverses the typical math where the more popular a download, the slower it is.

#### Automatic Version Control

Dat makes it easy for you to save old versions of files. With every file update, Dat automatically tracks your changes. You can store the contents of your dat anytime you want by using a simple command. You can even direct these backups to be stored efficiently on an external hard drive or a cloud server by using [our archiver](/on-a-server).

#### Security

Dat transfers files over an encrypted connection. Only users with your unique link can access the files inside of a dat. Your `dat://` link allows users to download and re-share your files and no one needs permission to rehost your dat, so be careful with whom you share your link. Only the original owner can add files now, unless the secret key is shared, which we do not recommend ([learn more](/link-to-secret-key-info). Dat also verifies the hashes of files on download so no malicious content can be added.

[Still want to learn more? Check out our basic concepts in the How Dat Works section](/concepts) or get more technical by reading [the Dat whitepaper](https://github.com/datproject/docs/blob/master/papers/dat-paper.pdf)

## Who we are

Dat is funded by [Code for Science & Society](https://codeforscience.org), a nonprofit supporting open source tools that benefit science and society. Dat also has a vibrant global community of developers building apps on the Dat protocol.
