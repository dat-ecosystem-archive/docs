# meta.dat

Dat uses a simple metadata file called `meta.dat`. The purpose of this file is to store the fingerprints of the files in a Dat repository. If you create a `meta.dat` file for a set of files, you can host it on a static HTTP server along with the files and Dat clients will be able to download and verify your files, even if you aren't running a Dat server!

# File format

```
<Header><Entries...>
```

The format is a header followed by many entries. Entry order is based on the indexing determined by the [Flat In-Order Tree](hyperdrive.md#flat-in-order-trees) algorithm we use in Dat.

For example, given a tree like this you might want to look up in a `meta.dat` file the metadata for a specific node:

```
0─┐  
  1─┐
2─┘ │
    3
4─┐ │
  5─┘
6─┘
```

If you wanted to look up the metadata for 3, you could read the third (or any!) entry from meta.dat with the following formula (assuming you've already decoded the header and hash lengths from the beginning of the file):

```
header-length + entry-number * (8 + hash-length)
```

### Header format

```
<varint header-length><header protobuf>
```

The header protobuf has this schema:

``` proto
message Header {
  required bytes datLink = 1;
  optional bool isSigned = 2;
  optional string hashType = 3 [default = "sha256"];
  optional uint32 hashLength = 4 [default = 32];
}
```

### Entry format

For non-signed entries:

```
<8-byte-chunk-offset><chunk-hash>
```

For signed entries (in live feeds):

```
<8-byte-chunk-offset><64-byte-signature><chunk-hash>
```
