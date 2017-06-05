# Welcome to Dat

Dat is the distributed data sharing tool. Dat has been designed for easily storing, tracking, and sharing your data over time, so that other people can instantly get the latest data and see the history of what you've done. Researchers, analysts, libraries, and universities are [already using dat](https://www.nytimes.com/2017/03/06/science/donald-trump-data-rescue-science.html) to archive and distribute important data. Developers are building applications on Dat's components for [browsing the web](beakerbrowser.com) and [offline editable maps](https://www.digital-democracy.org/blog/update-from-the-ecuadorian-amazon/). Regular people like you are sharing data easily using Dat and it's easy to get started using the desktop application, commandline, or javascript library.

[Ready to try it? Head over to Installation to get started.](/install)

## Why Dat?

It is surprisingly difficult to share data between many computers, especially if data is large and changes often. As a solution, people often use a centralized service such as Dropbox or NextCloud to share data. This is a relatively easy solution, but there are many problems with centralized servers:

  * It can be too slow because data is uploaded to a remote computer before it is sent to downloaders
  * It requires all parties involved to trust it to manage your data.
  * It becomes slow or expensive to download data if there are many downloads at the same time.

As an alternative, many people have begun to use Git when their data changes often and is small enough. However, when the data becomes large, Git becomes quite slow and difficult to manage. Git also has a high learning curve, so we've been prioritizing usability in our development of Dat.

With Dat, we tried to merge concepts from Git, Dropbox, and BitTorrent to build a secure, fast, and distributed data sharing tool that puts you in control of your data. You can turn any folder on your computer into a Dat, and people you trust can subscribe to updates. As more computers download and host the data, downloading the data becomes faster, not slower. Dat has only a few simple commands and no messy merges.

#### Distributed Network

Dat works on a distributed network unlike cloud services, such as Dropbox or Google Drive. This means Dat transfers files peer to peer, skipping centralized servers. Dat's network makes file transfers faster and more secure. You can even use Dat on local networks for offline file sharing or local backups. Dat reduces bandwidth costs on popular files, as downloads are *distributed* across all available computers, rather than centralized on a single host. This inverses the typical math where the more popular a download, the slower it is.

#### Automatic Version Control

Dat makes it easy for you to save old versions of files. With every file update, Dat automatically tracks your changes. You can store the contents of your dat anytime you want by using a simple command. You can even direct these backups to be stored efficiently on an external hard drive or a cloud server by using [our archiver](/on-a-server).

#### Security

Dat transfers files over an encrypted connection. Only users with your unique link can access the files inside of a dat. Your `dat://` link allows users to download and re-share your files and no one needs permission to rehost your dat, so be careful with whom you share your link. Only the original owner can add files now, unless the secret key is shared, which we do not recommend ([learn more](/link-to-secret-key-info). Dat also verifies the hashes of files on download so no malicious content can be added.

## Who we are

Dat is funded by [Code for Science & Society](https://codeforscience.org), a nonprofit supporting open source tools that benefit science and society. Dat also has a vibrant global community of developers building apps on the Dat protocol.

[Still want to learn more? Check out our basic concepts in the How Dat Works section](/concepts) or get more technical by reading [the Dat whitepaper](https://github.com/datproject/docs/blob/master/papers/dat-paper.pdf)

[Enough reading, more doing? Head over to Installation to get started.](/install)
