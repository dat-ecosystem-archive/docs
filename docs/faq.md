# FAQ

## General

### Who is behind the project?

Code for Science and Society (CSS), a US based 501(c)(3) not for profit organization set up to support the Dat project. CSS employs a Dat core development team. Dat is currently funded exclusively by philanthropic non-profit grants. The mission of CSS is to work with public institutions to produce open source infrastructure to improve the ability for researchers, civic hackers and journalists to find and use datasets. However, we actively welcome outside contributors and use cases beyond our own.

### How do Dat peers discover one another on the Internet?

Dat is very flexible. It currently uses 3 methods, and you can implement your own.

 1) Multicast udp, which lets it work over the local network (LAN),
 2) A distributed hash table, which lets it work without a central server, and
 3) Centralized signaling servers that run a modified version of DNS.

We run a signaling server for users of our client applications. However, anyone can run a signaling server and can overwrite the default for their application.

### Are the Dat links guaranteed to be unique?

It's not technically impossible that they'd collide, but it's extremely unlikely. Dat links are 32 bytes long. That's 1.1579 x 10^77 possible numbers!

### What are the limits on file sizes?

Data is transferred directly between peers, we do not store any data right now. The main limits are importing and transfer speeds, which will improve soon. We plan to help institutions and others set up cloud storage for academic uses and commercial options for general users.

### Does Dat have version history?

Dat tracks all of the changes to files, but doesn't currently save a backup of those files. To save backups your current data in your dat, you can use [dat-backup](http://npmjs.org/dat-backup) and [archiver-server](http://npmjs.org/archiver-server). We plan to bake this into the CLI tool and desktop app soon.

### What happens if Dat (the organization/group) disappears? Will all my files get lost or be inaccessible? 

No. Dat doesn't import or copy your data anywhere, just simply scans and stores filesystem metadata while tracking your changes to the data. This means that you can easily move your data around and keep it intact in its original form on the filesystem. You can even simultaneously host your data on HTTP along with Dat to ensure backwards compatibility with existing web tools.

### How is Dat different than IPFS?

IPFS and Dat share a number of underlying similarities but address different problems. Both deduplicate content-addressed pieces of data and have a mechanism for searching for peers who have a specific piece of data. Both have implementations which work in modern Web browsers, as well as command line tools.

The two systems also have a number of differences. Dat keeps a secure version log of changes to a dataset over time which allows Dat to act as a version control tool. The type of Merkle tree used by Dat lets peers compare which pieces of a specific version of a dataset they each have and efficiently exchange the deltas to complete a full sync. It is not possible to synchronize or version a dataset in this way in IPFS without implementing such functionality yourself, as IPFS provides a CDN and/or filesystem interface but not a synchronization mechanism. In short, IPFS provides distribution of objects, Dat provides synchronization of datasets.

In order for IPFS to provide guarantees about interoperability, IPFS applications must use only the IPFS network stack. In contrast, Dat is only an application protocol and is agnostic to which network protocols (transports and naming systems) are used. As a result, Dat cannot make the same types of interoperability guarantees as IPFS.

### How is dat different than Academic Torrents or BitTorrent?

Academic Torrents [13] uses BitTorrent to share scientific datasets, and BitTorrent has many drawbacks that hinder direct use by scientists. BitTorrent is for sharing static files, that is, files that do not change over time. Dat, on the other hand, has the ability to update and sync files over the peer-to-peer network. BitTorrent is also inefficient at providing random access to data in larger datasets, which is crucial for those who want to get only a piece of a large dataset. BitTorrent comes close to the solution, but we have been able to build something that is more efficient and better designed for the data sharing use case.

### Is there a JavaScript or Node.js implementation?

Yes, it is our only implementation. Find it on GitHub: [dat-node](http://github.com/datproject/dat-node).

### Is there an online dataset registry, like GitHub?

Yes. See [datproject/datproject.org](https://github.com/datproject/datproject.org) on GitHub.

### Is there a desktop application?

Yes, you'll be able to [install soon](https://datproject.org/install)! See [datproject/dat-desktop](http://github.com/datproject/dat-desktop) on GitHub for development updates.

### Do you plan to have Python or R or other third-party language integrations?

Yes. We are currently developing the serialization format (like .zip archives) called [SLEEP](/sleep) so that third-party libraries can read data without reimplementing all of hyperdrive (which is node-only).

### Can multiple people write to one archive?

Dat uses one keypair to verify that only one writer is allowed to add or update files in a Dat. This means that all peers connecting to the data are read-only right now. If the original creator of the dat loses the keypair, the data can no longer be updated.

We are interested in implementations of multi-party writers to dat. Come talk to us in #dat on freenode for more information.

## Security & Privacy

### Is data shared over Dat encrypted?

Yes, data shared over Dat is encrypted in transit using the public key (Dat link). When you share a Dat, you must share the public key with another user so they can download it. We use that key on both ends to encrypt the data so both users can read the data but we can ensure the data is not transferred over the internet without encryption.

### Is it possible to discover public keys via man-in-the-middle?

The public key is hashed, creating the discovery key, before we share it over the network. Whenever peers attempt to connect to each other, they use the discovery key. This ensures that the public key is never sent by Dat over the network.

Data is encrypted using the public key, so it is important that this key stays secure.

### Can anyone download my data? What if I don't share the key with anyone?

Only someone with the key can download data for Dat. It is the responsibility of the user that the Dat link is only shared with people who should access the data. The key is never sent over the network via Dat. We do not track keys centrally. It is almost impossible for [keys to overlap](http://docs.datproject.org/faq#are-the-dat-links-guaranteed-to-be-unique-) (and thus to guess keys).

### How does Dat make sure I download the correct content?

Dat uses the concept of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) to make sure content is not tampered with. When content is added to a Dat we  cryptographically fingerprint it and add it to the tree. On download, we can use the tree to make sure the content has not changed and the parent hashes match.

### How does Dat help to improve transparency?

Dat uses an append-only to track changes over time. An append-only log shows all of the changes for a given Dat since it was shared. We use this for version control but it can also bolster transparency for a dataset. Any changes to a dataset will be tracked and you can see what changed and when.

### Privacy and Security Versus Bittorrent

As a peer to peer network, Dat faces similar privacy risks as Bittorrent. When you download a dataset, your IP address is exposed to the users sharing that dataset. This may lead to honeypot servers collecting IP addresses, as we've seen in Bittorrent. However, with dataset sharing we can create a web of trust model where specific institutions are trusted as primary sources for datasets, diminishing the sharing of IP addresses. [Read more](https://datproject.org/blog/2016-12-18-p2p-reader-privacy) about reader privacy in the p2p web.

## Under the Hood

### Is Dat different from hyperdrive?

[Hyperdrive](http://github.com/mafintosh/hyperdrive) is a file sharing network built for Dat.

Dat uses hyperdrive and a variety of other modules. Hyperdrive and Dat are compatible with each other but hyperdrive is able to make lower-level decisions. Dat presents a user-friendly interface and ecosystem for scientists, researchers, and data analysts.

### What if I don't want to download all the data? Does dat have an index?

Yes, you can tell Dat to only download the data you want using our Node.js API.  You can do this by using `sparse` mode in `dat-node`, which make it only download content that the peer asks for. To do this, simply pass `{sparse: true}` when you create the dat (or hyperdrive):

```js
var Dat = require('dat-node')
Dat(dir, {sparse: true}, function (dat) {
  console.log('got the dat!')
})
```


### Does Dat use WebRTC?

Dat can use WebRTC but it's very experimental. You can check out our tutorial on using [Dat in the browser here](/browser)

We implemented a prototype web version using WebRTC. Moving forward, we are not planning on immediately supporting WebRTC in any Dat application because of reliability issues and lack of support in non-browser environments. Our future browser implementations of Dat will use websockets to transfer data to non-browser Dat interfaces.

### Dat on the CLI isn't connecting, how do I debug?

1. Try running `dat doctor` and following the instructions
2. Try running your command with `DEBUG=discovery* ` in front, e.g. `DEBUG=discovery* dat sync`

When reading debug output, look for `inbound connection` (means someone else successfully connected to you) or `onconnect` (you successfully connected to someone else). `discovery peer=` messages mean you found a candidate and will try to connect to them.
