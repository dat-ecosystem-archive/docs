## 1.0 Architecture Design


  * dat: command-line api
  * dat-desk: desktop application
  * hyperdrive: storage layer
  * discovery-swarm: dat network swarm discovery mechanism

## dat

Command-line interface for dat

#### `dat share DIR`

Create a new dat link for the contents of the given directory. Prints a URL, which is a unique public key feed. This public key feed can be appended to. 

###### Options

  * `--append=URL`: Adds the new URL to the public key feed.
  * `--static`: Ensures that the URL cannot be appended to.

#### `dat URL DIR`

Downloads the link to the given directory, and then exits. 

###### Options

  * `--seed`: Downloads the link to the given directory and opens up a server that seeds it to the dat peer network.
  * `--list`: Fetches the metadata for the link and prints out the file list in the console.
