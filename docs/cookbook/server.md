# Dats on a Server

Since Dat is a distributed (peer-to-peer) data sharing tool, a computer must be currently sharing the data for it to be available. If you're sharing a dat, you might want to set up a dedicated server that re-hosts your dat. This means that it'll still be available even after you turn off your personal computer.

## Short Instructions

We have built a simple tool to host multiple dats using the commandline. The tool is called `hypercored`. Hypercored reads a file that contains all of the dats that you want to share.

Install it on your server, create a `feeds` file with dats separated by newlines, and run `hypercored`.

```
npm install -g hypercored
echo 'dat://64375abb733a62fa301b1f124427e825d292a6d3ba25a26c9d4303a7987bec65' >> feeds
echo 'dat://another-dat-link-here' >> feeds
hypercored
```

That's it. Now it will download and host the data for the each dat in the `feeds` file.

See below for more detailed instructions.

## Detailed Instructions

### Node Version

Check your node version, you should have version 4.0 or higher, but 6.10.3 or higher is preferred.

```
$ node -v
```

Then, go to your server (using `ssh username@hostname.com`) and install `hypercored`:

```
npm install -g hypercored
```

If you have installation trouble due to a permissions error, please see [this tutorial for fixing permissions in node.js](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Now, create a file called 'feeds' with the list of dats you want to share.

feeds
```
dat://one-hash
two-hash
website.com/three-hash
```

So then if you `ls` you should see `feeds` in the list of files.

```
$ ls
feeds
```

Now, to share these dats simply type `hypercored` in the same directory.

```
~/dat $ hypercored
Watching ~/dat/feeds for a list of active feeds
Archiver key is 42471e32d36be3cb617ec1df382372532aac1d1ce683982962fb3594c5f9532a
Swarm listening on port 58184
```

That's great! Now all of the dats in `feeds` will be downloaded and re-hosted. However, it's running in the foreground -- you probably want to use a process manager to run and watch the process so that it never goes down.

## Run it Forever

We recommend using `lil-pids` and `add-to-systemd` for long-term dat hosting from a linux server.

```
npm install -g add-to-systemd lil-pids
mkdir ~/dat
echo "hypercored --cwd ~/dat" > ~/dat/services
sudo add-to-systemd dat-lil-pids $(which lil-pids) ~/dat/services ~/dat/pids
```

Replace `~` with the path where you want to store your dats.
