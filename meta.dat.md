# meta.dat

Dat uses a simple metadata file called `meta.dat`. The purpose of this file is to store the fingerprints of the files in a Dat repository. If you create a `meta.dat` file for a set of files, you can host it on a static HTTP server along with the files and Dat clients will be able to download and verify your files, even if you aren't running a Dat server!

# File format

```
<Header><Entries Index...><Entries...>
```

The format is a header followed by an index of many entries. Entry order is based on the indexing determined by the [Flat In-Order Tree](hyperdrive.md#flat-in-order-trees) algorithm we use in Dat. After the entry index, a concatinated list of entries follows.

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
