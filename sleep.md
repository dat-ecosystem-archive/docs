# SLEEP Data Format

### Syncable Lightweight Event Emitting Persistence
### Version 2.0

git, bittorrent, but nothing in the open data space that is the equivalent

SLEEP is a metadata format that allows a set of files to be accessed randomly, cryptographically verified, and dynamically updated. It has two parts, a file format that contains content addressed file metadata in a representation specifically designed to allow partial streaming access to individual chunks of data, and a 53 character identifier scheme that can be used to address the entire data set.

The file format can be shared as a single file for easy distribution and we also specify a way to expose SLEEP over REST.

The SLEEP format can be used in a similar way to how MD5 checksums are used over HTTP today, to verify the integrity of data downloads. Whereas MD5 or SHA are usually checksums of the whole data set, meaning consumers have to download the entire all available data before they are able to verify the integrity of any of it, SLEEP allows a set of data to be split in to many small pieces, each one getting it's own cryptographically secure checksum. This allows consumers to download subsets metadata and data, in whatever order they prefer, but allowing them to verify the integrity of each piece of data as it is accessed.

## Registers

SLEEP is designed around the concept of a register, an append only list that you can trust. The contents of a register are cryptographically fingerprinted and an aggregate checksum can be used to verify the contents of the register have not been tampered with. There are various ways to calculate these aggregate checksums but the data in a register is a binary append only feed, e.g. an list of buffers that can only be updated by placing new buffers at the end of the list.

SLEEP also provides an index that allows each piece of data in a register to be accessed randomly. In order to look up a specific piece of data in the register, you only need a small subset of the metadata in order to find it, making SLEEP suitable for live streaming or sparse download use cases.

The register index is a Merkle tree where the leaf nodes are the hashes of the buffers in the register, and the rest of the nodes in the tree are derived Merkle hashes. A Merkle tree is defined as a tree where leaf nodes are a hash of some piece of data, and the rest of the nodes are the result of a hash of the concatenation of that nodes children.

So, given a register with four values:

```
1. a
2. b
3. c
4. d
```

To construct the register itself you concatenate all buffers, in this case resulting in 'abcd'.

The register index is constructed by creating a Merkle tree where the leaf nodes are the hash of our four values, and the rest of the nodes are the hash of the nodes two children hashes concatenated together.

```
hash(a)
      > hash(hash(a) + hash(b))
hash(b)
              > hash(hash(hash(a) + hash(b)) + hash(hash(c) + hash(d)))
hash(c)
      > hash(hash(c) + hash(d))
hash(d)
```

To be able to refer to a specific node in the tree we use an in-order node traversal to assign integers to the nodes:

```
0
  1
2
    3
4
  5
6
```

In-order node numbering has the property with our trees that leaf nodes are always even and non-leaf nodes are always odd. This can be used as a quick way to identify whether a node is a leaf or not.

Every serialized node in the tree is one of two fixed widths, leaf nodes are all the same size and non-leaf nodes are the same size. When serializing the tree you simply write the nodes in order and concatenate them. Then to access a node by its in-order position you simply multiply the node length by the position to get the byte offset.

All leaf nodes hold these two pieces of information:

- The hash of the content
- The absolute byte offset to the end of the region of data described by the node

All non-leaf nodes hold these three pieces of information:

- The hash of the concatenation of the two children hashes
- The cryptographic signature of the hash
- The byte length of the piece of data described by the node

For the example register above, 'abcd', the register index (in pseudocode) would be:

```
WIP
```

This scheme allows for some interesting properties:

WIP

node sizes are stored to allow random access to byte ranges with minimal roundtrips
if you dont care about large metadata its ok to skip this optimization

# File format

```
<Header><Entries Index...><Entries...>
```

The format is a header followed by an index of many entries. Entry order is based on the indexing determined by the [Flat In-Order Tree](hyperdrive.md#flat-in-order-trees) algorithm we use in Dat. After the entry index, a concatenated list of entries follows.

### Header format

```
<varint header-length><header protobuf>
```

The header protobuf has this schema:

``` protobuf
message Header {
  required bytes datLink = 1;
  required uint64 entries = 2;
  optional bool isSigned = 3;
  optional string hashType = 4 [default = "sha256"];
  optional uint32 hashLength = 5 [default = 32];
  optional string signatureType = 6 [default = "ed25519"];
  optional uint32 signatureLength = 7 [default = 64];
}
```

### Entry index format

For non-signed entries:

```
<8-byte-chunk-end><chunk-hash>
```

The 8-byte-chunk-end is an unsigned big endian 64 bit integer that should be the absolute position in the file for the **end of the chunk**.

For signed entries in live feeds (only applies to even numbered nodes e.g. leaf nodes):

```
<8-byte-chunk-end><chunk-signature><chunk-hash>
```

For any odd nodes, in either a live or a non-live feed, the non-signed entry format will be used.

## Example

Given a tree like this you might want to look up in a `meta.dat` file the metadata for a specific node:

```
0─┐  
  1─┐
2─┘ │
    3
4─┐ │
  5─┘
6─┘
```

If you wanted to look up the metadata for 3, you could read the third (or any!) entry from meta.dat:

First you have to read the varint at the beginning of the file so you know how big the header is:

``` js
var varint = require('varint') // https://github.com/chrisdickinson/varint
var headerLength = varint.decode(firstChunkOfFile)
```

Now you can read the header from the file

``` js
var headerOffset = varint.encodingLength(headerLength)
var headerEndOffset = headerOffset + headerLength
var headerBytes = firstChunkOfFile.slice(headerOffset, headerEndOffset)
```

To decode the header use the protobuf schema. We can use the [protocol-buffers](https://github.com/mafintosh/protocol-buffers) module to do that.

``` js
var messages = require('protocol-buffers')(fs.readFileSync('meta.dat.proto'))
var header = messages.Header.decode(headerBytes)
```

Now we have all the configuration required to calculate an entry offset.

``` js
var entryNumber = 42
var entryOffset = headerEndOffset + entryNumber * (8 + header.hashLength)
```

If you have a signed feed, you have to take into account the extra space required for the signatures in the even nodes.

``` js
var entryOffset = headerLength + entryNumber * (8 + header.hashLength)
                  + Math.floor(entryNumber / 2) * header.signatureLength
```
