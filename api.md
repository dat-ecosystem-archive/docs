## 1.0 Architecture Design


  * dat: command-line api
  * dat-desk: desktop application
  * hyperdrive: storage layer
  * discovery-swarm: dat network swarm discovery mechanism

## dat

Command-line interface for dat

#### `dat LINK DIR`

Downloads the link to the given directory. 

#### `dat seed LINK DIR`

Downloads the link to the given directory and opens up a server that seeds it to the dat peer network.

### `dat ls LINK`

Fetches the metadata for the link and prints out the file list in the console.
