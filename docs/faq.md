# FAQ

## Organization

### Who is behind the project?

Code for Science and Society (CSS), a US based 501(c)(3) not for profit organization set up to support the Dat project. CSS employs a Dat core development team. Dat is currently funded exclusively by philanthropic non-profit grants. The mission of CSS is to work with public institutions to produce open source infrastructure to improve the ability for researchers, civic hackers and journalists to find and use datasets. We also actively welcome outside contributors and use cases beyond our own.

### Sustainability

#### What happens if Dat/CSS closes? Will my data be inaccessible?

Dat software is built with long-term sustainability as a focus. For us, this goes beyond financial sustainability. Establishing lasting data archives depends on a transparent and open process, a wider open source community, and ensuring no single entity or technology is responsible for data storage or access.

**Public Design Process** All discussion related to the design and development of Dat project software is public (either on IRC or Github). Dat software is released with open source licenses and will always be freely available.

**Open Source Community** The Dat team develops with [pragmatic modularity](http://mafintosh.com/pragmatic-modularity.html) in mind. We have high-level user facing software, but many of our underlying modules are small, highly focused, and used outside of the Dat project. This helps create a broader community to continue supporting and using the software regardless of the success of Dat itself.

**No Lock In** We only want you to use Dat because you love it, not because it is too hard to get your data out. Dat does not import or copy your data into specialized databases. This means that you can easily move your data around and keep it intact in its original form. You can even simultaneously host your data on HTTP along with Dat to ensure backwards compatibility with existing web tools. You'll never be locked into using the Dat software.

**Distributed Storage** Dat is built to distribute storage and bandwidth costs throughout the network. Data hosting and bandwidth are some of the main costs for long-term data storage. By using Dat we can help ensure there are not single points of failure for data storage. Dat does not currently host any data, except for caching on datproject.org. We plan to build hosting options but will prioritize financial sustainability into those services.

**No Centralized Servers** Dat transfers all data directly between peers and has little reliance on Dat maintaining servers. We have public servers for peers to help discover each other, but those use very little bandwidth and anyone can run them.

## Dat Usage

### I am having trouble connecting to another Dat, how do I debug?

We have some networking debugging tools available in the CLI:

1. Try running `dat doctor` and following the instructions
2. Try running your command with `DEBUG=discovery* ` in front, e.g. `DEBUG=discovery* dat sync`

When reading debug output, look for `inbound connection` (means someone else successfully connected to you) or `onconnect` (you successfully connected to someone else). `discovery peer=` messages mean you found a candidate and will try to connect to them.

### How do Dat peers discover one another on the Internet?

Dat is very flexible. It currently uses 3 methods, and you can implement your own.

 1) Multicast udp, which lets it work over the local network (LAN),
 2) A distributed hash table, which lets it work without a central server, and
 3) Centralized signaling servers that run a modified version of DNS.

We run a signaling server for users of our client applications. However, anyone can run a signaling server and can overwrite the default for their application.

### Are the Dat links guaranteed to be unique?

It's not technically impossible that they'd collide, but it's extremely unlikely. Dat links are 32 bytes long. That's 1.1579 x 10^77 possible numbers!

### What are the limits on file sizes?

The Dat software does not have any inherent size limits. The Dat project does not store any data itself except for caching (on datproject.org registry). All data is transferred directly between peers. Depending on where the data is hosted, there may be storage or bandwidth limits. 

To improve the ecosystem and allow for better availability and archiving of data, we plan to help institutions and others set up cloud storage for academic uses.

### Does Dat store version history?

Version history is built into our core modules but only some clients support it (more soon!). We have dat tools, intended for servers, such as [hypercore-archiver](https://github.com/mafintosh/hypercore-archiver) and [hypercloud](https://github.com/datprotocol/hypercloud) that store the full content history.

Once historic content is saved, you can access it in the dat command line. First, you can log the history of the archive to see what version you want:

```sh
❯ dat log /my-dat
01 [put] / 0 B (0 blocks)
02 [put] /index.html 50 B (1 block)
03 [put] /dat.json 79 B (1 block)
04 [put] /dat.json 82 B (1 block)
05 [put] /dat.json 87 B (1 block)
06 [put] /index.html 51 B (1 block)
07 [put] / 0 B (0 blocks)
08 [put] /delete-test.txt 22 B (1 block)
09 [del] /delete-test.txt
10 [put] / 0 B (0 blocks)
11 [put] /readme.md 5 B (1 block)
12 [del] /readme.md
13 [put] /index.html 55 B (1 block)
14 [put] /index.html 84 B (1 block)
15 [put] /.datrc 42 B (1 block)

Log synced with network

Archive has 15 changes (puts: +13, dels: -2)
Current Size: 213 B
Total Size:
- Metadata 715 B
- Content 431 B
Blocks:
- Metadata 16
- Content 8
```

Then you can 'checkout' a specific version using the `--http` interface:

```sh
dat sync /my-dat --http
```

Visit [localhost:8080](http://localhost:8080) to view the latest content. Set the version flag, `localhost:8080/?version=3` to see a specific version. Clicking on a file will download that version of the file (assuming its available locally or on the network).

We are working on adding a local version history backup in the command line and desktop application. The interfaces for using and checking out older versions will also be further developed.

### Is there a JavaScript or Node.js implementation?

Yes, it is our only implementation. Find it on GitHub: [dat-node](http://github.com/datproject/dat-node).

### Is there an online dataset registry, like GitHub?

Yes. See [datproject/datproject.org](https://github.com/datproject/datproject.org) on GitHub.

### Is there a desktop application?

Yes, you'll be able to [install soon](https://datproject.org/install)! See [datproject/dat-desktop](http://github.com/datproject/dat-desktop) on GitHub for development updates.

### Do you plan to have Python or R or other third-party language integrations?

Yes. We are currently developing the serialization format (like .zip archives) called SLEEP so that third-party libraries can read data without reimplementing all of hyperdrive (which is node-only).

### Can multiple people write to one archive?

Dat uses one keypair to verify that only one writer is allowed to add or update files in a Dat. This means that all peers connecting to the data are read-only right now. If the original creator of the dat loses the keypair, the data can no longer be updated.

We are interested in implementations of multi-party writers to dat. Come talk to us in #dat on freenode for more information.

## Security & Privacy

### Can other users tell what I am downloading? 

Users only connect to other users with the same dat link. Anyone with a dat link can see other users that are sharing that link and their IP addresses.

We are thinking more about how to ensure reader privacy. See [this blog post](https://blog.datproject.org/2016/12/12/reader-privacy-on-the-p2p-web/) for more discussion.

### Is data shared over Dat encrypted?

Yes, data shared over Dat is encrypted in transit using the public key (Dat link). When you share a Dat, you must share the public key with another user so they can download it. We use that key on both ends to encrypt the data so both users can read the data but we can ensure the data is not transferred over the internet without encryption.

### Is it possible to discover public keys via man-in-the-middle?

One of the key elements of Dat privacy is that the public key is never used in any discovery network. The public key is hashed, creating the discovery key. Whenever peers attempt to connect to each other, they use the discovery key.

Data is encrypted using the public key, so it is important that this key stays secure.

### Can anyone download my data? What if I don't share the key with anyone?

Only someone with the key can download data for Dat. It is the responsibility of the user that the Dat link is only shared with people who should access the data. The key is never sent over the network via Dat. We do not track keys centrally. It is almost impossible for [keys to overlap](http://docs.datproject.org/faq#are-the-dat-links-guaranteed-to-be-unique-) (and thus to guess keys).

### How can I create stronger privacy protections for my data?

As long as the public key isn't shared outside of your team, the content will be secure (though the IP addresses and discovery key may become known). You can take a few steps further to improve privacy (generally at the cost of ease of use):

1. Disable bittorrent DHT discovery (using only DNS discovery), use `--no-dht` flag in CLI.
2. Whitelist IP addresses
3. Run your own discovery servers
4. Encrypt contents before adding to dat (content is automatically encrypted in transit but this would also require decrypting after arrival).

Only some of these options can be done in the current command line tool. Feel free to PR options to make these easier to configure!

### How does Dat make sure I download the correct content?

Dat uses the concept of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) to make sure content is not tampered with. When content is added to a Dat we  cryptographically fingerprint it and add it to the tree. On download, we can use the tree to make sure the content has not changed and the parent hashes match.

### How does Dat help to improve transparency?

Dat uses an append-only to track changes over time. An append-only log shows all of the changes for a given Dat since it was shared. We use this for version control but it can also bolster transparency for a dataset. Any changes to a dataset will be tracked and you can see what changed and when.

### Privacy and Security Versus Bittorrent

As a peer to peer network, Dat faces similar privacy risks as Bittorrent. When you download a dataset, your IP address is exposed to the users sharing that dataset. This may lead to honeypot servers collecting IP addresses, as we've seen in Bittorrent. However, with dataset sharing we can create a web of trust model where specific institutions are trusted as primary sources for datasets, diminishing the sharing of IP addresses. [Read more](https://datproject.org/blog/2016-12-18-p2p-reader-privacy) about reader privacy in the p2p web.

## Dat vs ?

Dat has a lot of overlap with other distributed web tools, data management tools, and distributed version control. Below are some of the most common questions. See more in depth technical comparisons in the [Dat whitepaper](https://github.com/datproject/docs/blob/master/papers/dat-paper.md#5-existing-work).

### How is Dat different than IPFS?

IPFS and Dat share a number of underlying similarities but address different problems. Both deduplicate content-addressed pieces of data and have a mechanism for searching for peers who have a specific piece of data. Both have implementations which work in modern Web browsers, as well as command line tools.

The two systems also have a number of differences. Dat keeps a secure version log of changes to a dataset over time which allows Dat to act as a version control tool. The type of Merkle tree used by Dat lets peers compare which pieces of a specific version of a dataset they each have and efficiently exchange the deltas to complete a full sync. It is not possible to synchronize or version a dataset in this way in IPFS without implementing such functionality yourself, as IPFS provides a CDN and/or filesystem interface but not a synchronization mechanism. In short, IPFS provides distribution of objects, Dat provides synchronization of datasets.

In order for IPFS to provide guarantees about interoperability, IPFS applications must use only the IPFS network stack. In contrast, Dat is only an application protocol and is agnostic to which network protocols (transports and naming systems) are used. As a result, Dat cannot make the same types of interoperability guarantees as IPFS.

### How is dat different than Academic Torrents or BitTorrent?

Academic Torrents [13] uses BitTorrent to share scientific datasets, and BitTorrent has many drawbacks that hinder direct use by scientists. BitTorrent is for sharing static files, that is, files that do not change over time. Dat, on the other hand, has the ability to update and sync files over the peer-to-peer network. BitTorrent is also inefficient at providing random access to data in larger datasets, which is crucial for those who want to get only a piece of a large dataset. BitTorrent comes close to the solution, but we have been able to build something that is more efficient and better designed for the data sharing use case.

## Under the Hood

### Is Dat different from hyperdrive?

[Hyperdrive](http://github.com/mafintosh/hyperdrive) is a file sharing network built for Dat.

Dat uses hyperdrive and a variety of other modules. Hyperdrive and Dat are compatible with each other but hyperdrive is able to make lower-level decisions. Dat presents a user-friendly interface and ecosystem for scientists, researchers, and data analysts.

### What if I don't want to download all the data? Does dat have an index?

Yes, you can tell Dat to only download the data you want using our Node.js API.  You can do this by using `sparse` mode in `hyperdrive` or `dat-node`, which make it only download content that the peer asks for. To do this, simply pass `{sparse: true}` when you create the dat (or hyperdrive):

```js
var Dat = require('dat-node')
Dat(dir, {sparse: true}, function (dat) {
  console.log('got the dat!')
})
```

### Does Dat use WebRTC?

Dat can use WebRTC but it's very experimental. You can check out our tutorial on using [Dat in the browser here](/browser)

We implemented a prototype web version using WebRTC. Moving forward, we are not planning on immediately supporting WebRTC in any Dat application because of reliability issues and lack of support in non-browser environments. Our future browser implementations of Dat will use websockets to transfer data to non-browser Dat interfaces.
