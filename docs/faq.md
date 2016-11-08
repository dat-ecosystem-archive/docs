# FAQ

## Is Dat different from hyperdrive?

[Hyperdrive](http://github.com/mafintosh/hyperdrive) is a file sharing network originally built for dat.

Dat uses hyperdrive and a variety of other modules. Hyperdrive and Dat are compatible with each other but hyperdrive is able to make more lower-level decisions. Dat presents a user-friendly interface and ecosystem for scientists, researchers, and data analysts.

## How is Dat different than IPFS?

IPFS and Dat share a number of underlying similarities. Both use Merkle DAGs to represent and deduplicate content-addressed pieces of data, have a mechanism for searching for peers who have a specific piece of data. Both have implementations which work in modern Web browsers, as well as command line tools.

The two systems also have a number of differences. In order for IPFS to provide guarantees about interoperability, IPFS applications must use only the IPFS network stack. In contrast, Dat is only an application protocol and is agnostic to which network protocols (transports and naming systems) are used. As a result, Dat cannot make the same types of interoperability guarantees as IPFS.

Dat keeps a secure version log of changes to a dataset over time which allows Dat to act as a version control tool. The type of Merkle tree used by Dat lets peers compare which pieces of a specific version of a dataset they each have and efficiently exchange the deltas to complete a full sync. It is not possible to synchronize or version a dataset in this way in IPFS without implementing such functionality yourself, as IPFS provides a CDN and/or filesystem interface but not a synchronization mechanism. In short, IPFS provides distribution of objects, Dat provides sychronization of datasets.

Dat links are private and unadvertised unless they are explicitly shared publicly by the user, meaning that Dat supports private, end-to-end encrypted data exchange by default. In IPFS nodes must be encrypted to prevent them from being traversable (unlisted), but are still advertised.

## Is there JavaScript implementation?

Yes, find it on GitHub: [dat-js](http://github.com/joehand/dat-js).

## Is there any non-persistent JS Dat implementation?

Not yet. Want to work on it? Start here to learn more: [dat-js](http://github.com/joehand/dat-js).

## Is there an online dataset registry, like GitHub?

Yes, but currently under heavy construction. See [dat.land](http://github.com/datproject/dat.land)

## Is there a desktop application?

Yes, but currently under heavy construction. See [dat-desktop](http://github.com/juliangruber/dat-desktop)

## Do you plan to have Python or R or other third-party language integrations?

Yes. We are currently developing the serialization format (like .zip archives) called [SLEEP](/sleep) so that third-party libraries can read data without reimplementing all of hyperdrive (which is node-only).
