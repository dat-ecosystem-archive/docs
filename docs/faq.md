# FAQ

## Who is behind the project?

Code for Science and Society (CSS), a US based 501(c)(3) not for profit organization set up to support the Dat project. CSS employs a Dat core development team. Dat is currently funded exclusively by philanthropic non-profit grants. The mission of CSS is to work with public institutions to produce open source infrastructure to improve the ability for researchers, civic hackers and journalists to find and use datasets. However, we actively welcome outside contributors and use cases beyond our own.

## Is Dat different from hyperdrive?

[Hyperdrive](http://github.com/mafintosh/hyperdrive) is a file sharing network built for Dat.

Dat uses hyperdrive and a variety of other modules. Hyperdrive and Dat are compatible with each other but hyperdrive is able to make lower-level decisions. Dat presents a user-friendly interface and ecosystem for scientists, researchers, and data analysts.

## How is Dat different than IPFS?

IPFS and Dat share a number of underlying similarities but address different problems. Both deduplicate content-addressed pieces of data and have a mechanism for searching for peers who have a specific piece of data. Both have implementations which work in modern Web browsers, as well as command line tools.

The two systems also have a number of differences. Dat keeps a secure version log of changes to a dataset over time which allows Dat to act as a version control tool. The type of Merkle tree used by Dat lets peers compare which pieces of a specific version of a dataset they each have and efficiently exchange the deltas to complete a full sync. It is not possible to synchronize or version a dataset in this way in IPFS without implementing such functionality yourself, as IPFS provides a CDN and/or filesystem interface but not a synchronization mechanism. In short, IPFS provides distribution of objects, Dat provides synchronization of datasets.

In order for IPFS to provide guarantees about interoperability, IPFS applications must use only the IPFS network stack. In contrast, Dat is only an application protocol and is agnostic to which network protocols (transports and naming systems) are used. As a result, Dat cannot make the same types of interoperability guarantees as IPFS.

## Is there a JavaScript implementation?

Yes, it is our only implementation. Find it on GitHub: [dat-js](http://github.com/joehand/dat-js).

## Is there an online dataset registry, like GitHub?

Yes, but currently under heavy construction. See [dat.land](http://github.com/datproject/dat.land)

## Is there a desktop application?

Yes, but currently under heavy construction. See [dat-desktop](http://github.com/juliangruber/dat-desktop)

## Does Dat use WebRTC?

Our [dat.land](http://github.com/datproject/dat.land) prototype used WebRTC to transfer data between peers. Moving forward, we are not planning on immediately supporting WebRTC in any Dat client because of reliability issues and lack of support in non-browser environments. Our future browser implementations of Dat will use websockets to transfer data to non-browser Dat interfaces.

## Do you plan to have Python or R or other third-party language integrations?

Yes. We are currently developing the serialization format (like .zip archives) called [SLEEP](/sleep) so that third-party libraries can read data without reimplementing all of hyperdrive (which is node-only).

## Dat on the CLI isn't connecting, how do I debug?

1. Try running `dat doctor` and following the instructions
2. Try running your command with `DEBUG=discovery* ` in front, e.g. `DEBUG=discovery* dat sync`

When reading debug output, look for `inbound connection` (means someone else successfully connected to you) or `onconnect` (you successfully connected to someone else). `discovery peer=` messages mean you found a candidate and will try to connect to them.
