# FAQ

## Is Dat different from hyperdrive?

[Hyperdrive](http://github.com/mafintosh/hyperdrive) is a file sharing network originally built for dat.

Dat uses hyperdrive and a variety of other modules. Hyperdrive and Dat are compatible with each other but hyperdrive is able to make more lower-level decisions. Dat presents a user-friendly interface and ecosystem for scientists, researchers, and data analysts.

## How is Dat different than IPFS?

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
