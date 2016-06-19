# Hyperdrive + Hypercore Specification

## DRAFT Version 1

Hyperdrive is the peer-to-peer data distribution protocol that powers Dat. It consists of two parts. First there is hypercore which is the core protocol and swarm that handles distributing append-only logs of any binary data. The second part is hyperdrive which adds a filesystem specific protocol on top of hypercore.

## Hypercore

The goal of hypercore is to distribute append-only logs across a network of peers. Peers download parts of the logs from other peers and can choose to only download the parts of a log they care about. Logs can contain arbitrary binary data payloads.

A core goal is to be as simple and pragmatic as possible. This allows for easier implementations of clients which is an often overlooked property when implementing distributed systems. First class browser support is also an important goal as p2p data sharing in browsers is becoming more viable every day as WebRTC matures.

It also tries to be modular and export responsibilities to external modules whenever possible. Peer discovery is a good example of this as it handled by 3rd party modules that wasn't written with hyperdrive in mind. A benefit of this is a much smaller core implementation that can focus on smaller and simpler problems.

Prioritized synchronization of parts of a feed is also at the heart of hyperdrive as this allows for fast streaming with low latency of data such as structured datasets (wikipedia, genomic datasets), linux containers, audio, videos, and much more. To allow for low latency streaming another goal is also to keep verifiable block sizes as small as possible - even with huge data feeds.

The protocol itself draws heavy inspiration from existing file sharing systems such as BitTorrent and [PPSP](https://datatracker.ietf.org/doc/rfc7574/?include_text=1)

## How Hypercore works

### Flat In-Order Trees

A Flat In-Order Tree is a simple way represent a binary tree as a list. It also allows you to identify every node of a binary tree with a numeric index. Both of these properties makes it useful in distributed applications to simplify wire protocols that uses tree structures.

Flat trees are described in [PPSP RFC 7574 as "Bin numbers"](https://datatracker.ietf.org/doc/rfc7574/?include_text=1) and a node version is available through the [flat-tree](https://github.com/mafintosh/flat-tree) module.

A sample flat tree spanning 4 blocks of data looks like this:

```
0
  1
2
    3
4
  5
6
```

The even numbered entries represent data blocks (leaf nodes) and odd numbered entries represent parent nodes that have two children.

The depth of an tree node can be calculated by counting the number of trailing 1s a node has in binary notation.

```
5 in binary = 101 (one trailing 1)
3 in binary = 011 (two trailing 1s)
4 in binary = 100 (zero trailing 1s)
```

1 is the parent of (0, 2), 5 is the parent of (4, 6), and 3 is the parent of (1, 5).

If the number of leaf nodes is a power of 2 the flat tree will only have a single root.

Otherwise it'll have more than one. As an example here is a tree with 6 leafs:

```
0
  1
2
    3
4
  5
6

8
  9
10
```

The roots spanning all the above leafs are 3 an 9. Throughout this document we'll use following tree terminology:

* `parent` - a node that has two children (odd numbered)
* `leaf` - a node with no children (even numbered)
* `sibling` - the other node with whom a node has a mutual parent
* `uncle` - a parent's sibling

## Merkle Trees

A merkle tree is a binary tree where every leaf is a hash of a data block and every parent is the hash of both of its children.

Merkle trees are useful for ensuring the integrity of content.

Let's look at an example. Assume we have 4 data blocks, `(a, b, c, d)` and let `h(x)` be a hash function (the hyperdrive stack uses sha256 per default).

Using flat-tree notation the merkle tree spanning these data blocks looks like this:

```
0 = h(a)
  1 = h(0 + 2)
2 = h(b)
    3 = h(1 + 5)
4 = h(c)
  5 = h(4 + 6)
6 = h(d)
```

An interesting property of merkle trees is that the node 3 hashes the entire data set. Therefore we only need to trust node 3 to verify all data. However as we learned above there will only be a single root if there is a power of two data blocks.

Again lets expand our data set to contain 6 items `(a, b, c, d, e, f)`:

```
0 = h(a)
  1 = h(0 + 2)
2 = h(b)
    3 = h(1 + 5)
4 = h(c)
  5 = h(4 + 6)
6 = h(d)

8 = h(e)
  9 = h(8 + 10)
10 = h(f)
```

To ensure always have only a single root we'll simply hash all the roots together again. At most there will be `log2(number of data blocks)`.

In addition to hashing the roots we'll also include a bin endian uint64 binary representation of the corresponding node index.

Using the two above examples the final hashes would be:

```
hash1 = h(uint64be(#3) + 3)
hash2 = h(uint64be(#9) + 9 + uint64be(#3) + 3)
```

Each of these hashes can be used to fully verify each of the trees. Let's look at another example. Assume we trust `hash1` and another person wants to send block `0` to us. To verify block `0` the other person would also have to send the sibling hash and uncles until it reaches a root and the other missing root hashes. For the first tree that would mean hashes `(2, 5)`.

Using these hashes we can reproduce `hash1` in the following way:

```
0 = h(block received)
  1 = h(0 + 2)
2 = (hash received)
    3 = h(1 + 5)
  5 = (hash received)
```

If `h(uint64be(#3) + 3) == hash1` then we know that data we received from the other person is correct. They sent us `a` and the corresponding hashes.

Since we only need uncle hashes to verify the block the amount of hashes we need is at worst `log2(number-of-blocks)` and the roots of the merkle trees which has the same complexity.

A merkle tree generator is available on npm through the [merkle-tree-stream](https://github.com/mafintosh/merkle-tree-stream) module.

## Merkle Tree Deduplication

Merkle trees have another great property. They make it easy to deduplicate content that is similar.

Assume we have two similar datasets:

```
(a, b, c, d, e)
(a, b, c, d, f)
```

These two datasets are the same except their last element is different. When generating merkle trees for the two data sets you'd get two different root hashes out.

However if we look a the flat-tree notation for the two trees:

```
0
  1
2
    3
4
  5
6

8
```

We'll notice that the hash stored at 3 will be the same for both trees since the first four blocks are the same. Since we also send uncle hashes when sending a block of data we'll receive the hash for 3 when we request any block. If we maintain a simple index that maps a hash into the range of data it covers we can detect that we already have the data spanning 3 and we won't need to re-download that from another person.

```
1 -> (a, b)
3 -> (a, b, c, d)
5 -> (c, d)
```

This means that two datasets share a similar sequence of data the merkle tree helps you detect that.

## Signed Merkle Trees

As described above the top hash of a merkle tree is the hash of all its content. This has both advantages and disadvanteges.

An advantage is that you can always reproduce a merkle tree simply by having the data contents of a merkle tree.

A disadvantage is every time you add content to your data set your merkle tree hash changes and you'll need to re-distribute the new hash.

Using a bit of cryptography however we can make our merkle tree appendable. First generate a cryptographic key pair that can be used to sign data using [ed25519](https://ed25519.cr.yp.to/) keys, as they are compact in size (32 byte public keys). A key pair (public key, secret key) can be used to sign data. Signing data means that if you trust a public key and you receive data and a signature for that data you can verify that a signature was generated with the corresponding secret key.

How does this relate to merkle trees? Instead of distributing the hash of a merkle tree we can distribute our public key instead. We then use our secret key to continously sign the merkle trees of our data set every time we append to it.

Assume we have a data set with only a single item in it `(a)` and a key pair `(secret, public)`:

```
(a)
```

We generate a merkle tree for this data set which will have the roots `0` and sign the hash of these roots (see the merkle tree section) with our secret key.

If we want to send `a` to another person and they trust our public key we simply send `a` and the uncles needed to generate the roots plus our signature.

If we append a new item to our data set we simply do the same thing:

```
(a, b)
```

Notice that all new signatures verify the entire dataset since they all sign a merkle tree that spans all data. This serves two purposes. First of all it makes sure that the dataset publisher cannot change old data. It also ensures that the publisher cannot share different versions of the same dataset to different persons without the other people noticing it (at some point they'll get a signature for the same node index that has different hashes if they talk to multiple people).

This technique has the added benefit that you can always convert a signed merkle tree to a normal unsigned one if you wish (or turn an unsigned tree into a signed tree).

In general you should send as wide as possible signed tree back when using signed merkle trees as that lowers the amount of signatures the other person needs to verify which has a positive performance impact for some platforms. It will also allow other users to more quickly detect if a tree has duplicated content.

## Block Tree Digest

When asking for a block of data we want to reduce the amount of duplicate hashes that are sent back.

In the merkle tree example for from earlier we ended up sending two hashes `(2, 5)` to verify block `0`.

```
// If we trust 3 then 2 and 5 are needed to verify 0

0
  1
2
    3
4
  5
6
```

Now if we ask for block `1` afterwards (`2` in flat tree notation) the other person doesn't need to send us any new hashes since we already received the hash for `2` when fetching block `0`.

If we only use non-signed merkle trees the other person can easily calculate which hashes we already have if we tell them which blocks we've got.

This however isn't always possible if we use a signed merkle tree since the roots are changing. In general it also useful to be able to communicate that you have some hashes already without disclosing all the blocks you have.

To communicate which hashes we have just have to communicate two things: which uncles we have and whether or not we have any parent node that can verify the tree.

Looking at the above tree that means if we want to fetch block `0` we need to communicate whether of not we already have the uncles `(2, 5)` and the parent `3`. This information can be compressed into very small bit vector using the following scheme.

Let the trailing bit donate whether or not the leading bit is a parent and not a uncle. Let the previous trailing bits denote wheather or not we have the next uncle.

For example for block `0` the following bit vector `1011` is decoded the following way

```
// for block 0

101(1) <-- tell us that the last bit is a parent and not an uncle
10(1)1 <-- we already have the first uncle, 2 so don't send us that
1(0)11 <-- we don't have the next uncle, 5
(1)000 <-- the final bit so this is parent. we have the next parent, 3
```

So using this digest the person can easily figure out that they only need to send us one hash, `5`, for us to verify block `0`.

The bit vector `1` (only contains a single one) means that we already have all the hashes we need so just send us the block.

These digests are very compact in size, only `(log2(number-of-blocks) + 2) / 8` bytes needed in the worst case. For example if you are sharing one trillion blocks of data the digest would be `(log2(1000000000000) + 2) / 8 ~= 6` bytes long.

### Bitfield Run length Encoding

(talk about rle)

### Basic Privacy

(talk about the privacy features + discovery key here)

## Hypercore Feeds

(talk about how we use the above concepts to create a feed of data)

## Hypercore Replication Protocol

Lets assume two peers have the identifier for a hypercore feed. This could either be the hash of the merkle tree roots described above or a public key if they want to share a signed merkle tree. The two peers wants to exchange the data verified by this tree. Lets assume the two peers have somehow connected to each other.

Hypercore uses a message based protocol to exchange data. All messages sent are encoded to binary values using Protocol Buffers. Protocol Buffers are a widely supported schema based encoding support. A Protocol Buffers implementation is available on npm through the [protocol-buffers](https://github.com/mafintosh/protocol-buffers) module.

These are the types of messages the peers send to each other

#### Open

This should be the first message sent and is also the only message without a type. It looks like this

``` protobuf
message Open {
  required bytes feed = 1;
  required bytes nonce = 2;
}
```

The `feed` should be set to the discovery key of the Merkle Tree as specified above. The `nonce` should be set to 24 bytes of high entropy random data. When running in encrypted mode this is the only message sent unencrypted.

When you are done using a channel send an empty message to indicate end-of-channel.

#### `0` Handshake

The message contains the protocol handshake. It has type `0`.

``` protobuf
message Handshake {
  required bytes id = 1;
  repeated string extensions = 2;
}
```

You should send this message after sending an open message. By sending it after an open message it will be encrypted and we wont expose our peer id to a third party. The current protocol version is 0.

#### `1` Have

You can send a have message to give the other peer information about which blocks of data you have. It has type `1`.

``` protobuf
message Have {
  required uint64 start = 1;
  optional uint64 end = 2;
  optional bytes bitfield = 3;
}
```

If using a bitfield it should be encoded using a run length encoding described above. It is a good idea to send a have message soon as possible if you have blocks to share to reduce latency.

#### `2` Want

You can send a have message to give the other peer information about which blocks of data you want to have. It has type `2`.

``` protobuf
message Want {
  required uint64 start = 1;
  optional uint64 end = 2;
}
```

You should only send the want message if you are interested in a section of the feed that the other peer has not told you about.

#### `3` Request

Send this message to request a block of data. You can request a block by block index or byte offset. If you are only interested
in the hash of a block you can set the hash property to true. The nodes property can be set to a tree digest of the tree nodes you already
have for this block or byte range. A request message has type `3`.

``` protobuf
message Request {
  optional uint64 block = 1;
  optional uint64 bytes = 2;
  optional bool hash = 3;
  optional uint64 nodes = 4;
}
```

#### `4` Data

Send a block of data to the other peer. You can use this message to reply to a request or optimistically send other blocks of data to the other client. It has type `4`.

``` protobuf
message Data {
  message Node {
    required uint64 index = 1;
    required uint64 size = 2;
    required bytes hash = 3;
  }

  required uint64 block = 1;
  optional bytes value = 2;
  repeated Node nodes = 3;
  optional bytes signature = 4;
}
````

#### `5` Cancel

Cancel a previous sent request. It has type `5`.

``` protobuf
message Cancel {
  optional uint64 block = 1;
  optional uint64 bytes = 2;
}
```

#### `6` Pause

An empty message that tells the other peer that they should stop requesting new blocks of data. It has type `6`.

#### `7` Resume

An empty message that tells the other peer that they can continue requesting new blocks of data. It has type `7`.
