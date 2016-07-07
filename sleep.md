# SLEEP Data Format

### Syncable Lightweight Event Emitting Persistence
### Version 2.0

SLEEP is a metadata format that allows data to be accessed randomly, cryptographically verified, and updated live. It has two parts, a file format that contains content addressed file metadata in a representation specifically designed to allow partial streaming access to individual chunks of data, and a 53 character identifier scheme that can be used to address the entire data set.

The file format is a single file designed to be easy to distribute, and we also specify a way to expose SLEEP over REST.

The SLEEP format can be used in a similar way to how MD5 checksums are used over HTTP today, to verify the integrity of data downloads. Whereas MD5 or SHA are usually checksums of the whole data set, meaning consumers have to download the entire all available data before they are able to verify the integrity of any of it, SLEEP allows a set of data to be split in to many small pieces, each one getting it's own cryptographically secure checksum. This allows consumers to download subsets metadata and data, in whatever order they prefer, but allowing them to verify the integrity of each piece of data as it is accessed.

## Registers

SLEEP is designed around the concept of a register, an append only list that you can trust. The contents of a register are cryptographically fingerprinted and an aggregate checksum can be used to verify the contents of the register have not been tampered with. There are various ways to calculate these aggregate checksums but the data in a register is a binary append only feed, e.g. an infinite array of buffers that can only be updated by appending new buffers at the end.

In SLEEP we construct a Merkle tree where the leaf nodes are the buffers in the register, and the rest of the non-leaf nodes in the tree are derived Merkle hashes.

So, given a register with four values:

```
1. a
2. b
3. c
4. d
```

We would construct a Merkle tree where the leaf nodes are our four values:

```
a -> hash(a)
       hash(hash(a) + hash(b))
b -> hash(b)
          hash(hash(hash(a) + hash(b)) + hash(hash(c) + hash(d)))
c -> hash(c)
       hash(hash(c) + hash(d))
d -> hash(d)
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

In-order node numbering has the property with our trees that leaf nodes are always even and non-leaf nodes are always odd. 

The three derived odd values (1, 3, 5) are 

In our use case, the hashes of the actual content are always even numbers, at the wide end of the tree. So the above tree had four original values that become the even numbers:

The leaf data is not fixed sized
the hashes and offsets are fixed sized

node sizes are stored to allow random access to byte ranges with minimal roundtrips
if you dont care about large metadata its ok to skip this optimization


# File format

yo doggie
foo

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
