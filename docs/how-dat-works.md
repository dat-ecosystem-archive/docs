# How Dat Works

Note this is about Dat 1.0 and later. For historical info about earlier incarnations of Dat (Alpha, Beta) check out [this post](http://dat-data.com/blog/2016-01-19-brief-history-of-dat).

When someone starts downloading data with the [Dat command-line tool](https://github.com/maxogden/dat), here's what happens:

## Phase 1: Source discovery

Dat links look like this: `dat.land/c3fcbcdcf03360529b47df32ccfb9bc1d7f64aaaa41cca43ca9ac7f6778db8da`. The domain, dat.land, is there so if someone opens the link in a browser we can provide them with download instructions, and as an easy way for people to visually distinguish and remember Dat links. Dat itself doesn't actually use the dat.land part, it just needs the last part of the link which is a fingerprint of the data that is being shared. The first thing that happens when you go to download data using one of these links is you ask various discovery networks if they can tell you where to find sources that have a copy of the data you need.

Source discovery means finding the IP and port of all the known data sources online that have a copy of that data you are looking for. You can then connect to them and begin exchanging data. By introducing this discovery phase we are able to create a network where data can be discovered even if the original data source disappears.

The discovery protocols we use are [DNS name servers](https://en.wikipedia.org/wiki/Name_server), [Multicast DNS](https://en.wikipedia.org/wiki/Multicast_DNS) and the [Kademlia Mainline Distributed Hash Table](https://en.wikipedia.org/wiki/Mainline_DHT) (DHT). Each one has pros and cons, so we combine all three to increase the speed and reliability of discovering data sources.

We run a [custom DNS server](https://www.npmjs.com/package/dns-discovery) that Dat clients use (in addition to specifying their own if they need to), as well as a [DHT bootstrap](https://github.com/bittorrent/bootstrap-dht) server. These discovery servers are the only centralized infrastructure we need for Dat to work over the Internet, but they are redundant, interchangeable, never see the actual data being shared, and anyone can run their own and Dat will still work even if they all go down. If this happens discovery will just be manual (e.g. manually sharing IP/ports). Every data source that has a copy of the data also advertises themselves across these discovery networks.

The discovery logic itself is handled by a module that we wrote called [discovery-channel](http://npmjs.org/discovery-channel), which wraps other modules we wrote to implement DNS and DHT logic into a single interface. We can give the Dat link we want to download to discovery-channel and we will get back all the sources it finds across the various discovery networks.

## Phase 2: Source connections

Up until this point we have just done searches to find who has the data we need. Now that we know who should talk to, we have to connect to them. We use either [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) or [UTP](https://en.wikipedia.org/wiki/Micro_Transport_Protocol) sockets for the actual peer to peer connections. UTP is nice because it is designed to *not* take up all available bandwidth on a network (e.g. so that other people sharing your wifi can still use the Internet). We then layer on our own file sharing protocol on top, called [Hypercore](https://github.com/mafintosh/hypercore). We also are working on WebRTC support so we can incorporate Browser and Electron clients for some really open web use cases.

When we get the IP and port for a potential source we try to connect using all available protocols (currently TCP and sometimes UTP) and hope one works. If one connects first, we abort the other ones. If none connect, we try again until we decide that source is offline or unavailable to use and we stop trying to connect to them. Sources we are able to connect to go into a list of known good sources, so that if our Internet connection goes down we can use that list to reconnect to our good sources again quickly.

If we get a lot of potential sources we pick a handful at random to try and connect to and keep the rest around as additional sources to use later in case we decide we need more sources. A lot of these are parameters that we can tune for different scenarios later, but have started with some best guesses as defaults.

The connection logic is implemented in a module called [discovery-swarm](https://www.npmjs.com/package/discovery-swarm). This builds on discovery-channel and adds connection establishment, management and statistics. You can see stats like how many sources are currently connected, how many good and bad behaving sources you've talked to, and it automatically handles connecting and reconnecting to sources for you. Our UTP support is implemented in the module [utp-native](https://www.npmjs.com/package/utp-native).

## Phase 3: Data exchange

So now we have found data sources, have connected to them, but we havent yet figured out if they *actually* have the data we need. This is where our file transfer protocol [Hyperdrive](https://www.npmjs.com/package/hyperdrive) comes in.

The short version of how Hyperdrive works is: It breaks file contents up in to pieces, hashes each piece and then constructs a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) out of all of the pieces. This ultimately gives us the Dat link, which is the top level hash of the Merkle tree.

Here's the long version:

Hyperdrive shares and synchronizes a set of files, similar to rsync or Dropbox. For each file in the drive we use a technique called Rabin fingerprinting to break the file up into pieces. Rabin fingerprints are a specific strategy for what is called Content Defined Chunking. Here's an example:

![cdc diagram](https://raw.githubusercontent.com/datproject/docs/master/assets/cdc.png)

We have configured our Rabin chunker to produce chunks that are around 16KB on average. So if you share a folder containing a single 1MB JPG you will get around 64 chunks.

After feeding the file contents through the chunker, we take the chunks and calculate the SHA256 hash of each one. We then arrange these hashes into a special data structure we developed that we call the Flat In-Order Merkle Tree.

### Flat In-Order Merkle Tree

```
      3
  1       5
0   2   4   6
```

Want to go lower level? Check out [How Hypercore Works](hyperdrive.md#how-hypercore-works)

When two peers connect to each other and begin speaking the Hyperdrive protocol they can efficiently determine if they have chunks the other one wants, and begin exchanging those chunks directly. Hyperdrive gives us the flexibility to have random access to any portion of a file while still verifying the other side isnt sending us bad data. We can also download different sections of files in parallel across all of the sources simultaneously, which increases overall download speed dramatically.

## Phase 4: Data archiving

So now that you've discovered, connected, and downloaded a copy of some data you can stick around for a while and serve up copies of the data to others who come along and want to download it.

The first phase, source discovery, is actually an ongoing process. When you first search for data sources you only get the sources available at the time you did your search, so we make sure to perform discovery searches as often is practically possible to make sure new sources can be found and connected to.

Every user of Dat is a source as long as they have 1 or more chunks of data. Just like with other decentralized file sharing protocols you will notice Dat may start uploading data before it finishes downloading.

If the original source who shared the data goes offline it's OK, as long as other sources are available. As part of the mission as a not-for-profit we will be working with various institutions to ensure there are always sources available to accept new copies of data and stay online to serve those copies for important datasets such as scientific research data, open government data etc.

Because Dat is built on a foundation of strong cryptographic data integrity and content addressable storage it gives us the possibility of implementing some really interesting version control techniques in the future. In that scenario archival data sources could choose to offer more disk space and archive every version of a Dat repository, whereas normal Dat users might only download and share one version that they happen to be interested in.

## Implementations

This covered a lot of ground. If you want to go deeper and see the implementations we are using in the [Dat command-line tool](https://github.com/maxogden/dat), go to the [Dependencies](ecosystem) page
