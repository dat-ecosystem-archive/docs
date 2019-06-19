---
id: dat-server
title: Dats on a Server
---

Since Dat is a distributed (peer-to-peer) data sharing tool, a computer must be actively sharing a dat for it to be available. If you're sharing files over Dat, you might want to set up a dedicated server that re-hosts your dat. This means that it'll still be available even after you turn off your personal computer.

Running Dat on a server can also be used for live backups. As long as you are connected to your server and syncing changes, your server can backup all of your content history - allowing you to view old content later.

## Short instructions

We have built a tool into the Dat CLI called `dat store` which enables you to set up a server to keep your Dats online. The tool also enables you to interact with servers that adhere to the [HTTP Pinning Service API](https://www.datprotocol.com/deps/0003-http-pinning-service-api/).

```
npm install -g dat dat-store
dat store install-service
dat store dat://64375abb733a62fa301b1f124427e825d292a6d3ba25a26c9d4303a7987bec65
```

## Detailed Instructions

### Node Version

If you don't have Node installed please follow the installation instructions for your platform [here](https://nodejs.org/en/download/package-manager/).

Check your node version, you should have version 6.10.3, but the latest stable release is preferred.

```
$ node -v
```

### Install The CLI

Then, go to your server (using `ssh username@hostname.com`) and install `dat` and the `dat-store` extension:

```
npm install -g dat dat-store
```

### Start A Dat Store

Once the CLI is installed, you can run a Dat Store which will be used for to keep a list of Dats online. By default, it will run on http://localhost:3472

```
dat store run-service
```

By default, it will store the data for Dats inside `~/.dat/store-data/`.
This can be overridden with the `--storage-location` flag.

```
dat store run-service --storage-location /example/location
```

### Add Dats

You can interact with the store using the CLI.

```
dat store dat://64375abb733a62fa301b1f124427e825d292a6d3ba25a26c9d4303a7987bec65
dat store add dat://datproject.org
```

You can list all the Dats that are in the store:

```
dat store list
```

You can also remove Dats from the store

```
dat store remove dat://datproject.org
```

### Run It Forever

You can install the Store to run as a service on the current machine.
This is handled by the [os-service](https://www.npmjs.com/package/os-service) module which supports Linux, Mac, and Windows.

```
dat store install-service
```

The service will be called `dat-store` and can be managed by your operating system as you would any other service. To start and stop the service, you'll need to look into the specific commands for your operating system. For example, on Linux with Systemd you can use `sudo systemctl stop dat-store` to stop the service and `sudo systemctl start dat-store` to start it up again.

You can uninstall the service when you no longer need it.

```
dat store uninstall-service
```

### Remote Stores

You can configure the CLI to connect to a store that's running on another machine.
To handle multiple stores at once, you can specify a name for the remote store.

```
dat store set-provider SOME_NAME_HERE http://192.168.1.1:3472
```

This can be used to share a Store between members of a community or company.
The provider URL and session token are stored in `~/.dat/store.json` and are used for any dats.

It's strongly advised to layer some sort of authentication and HTTPS on top of the service if you want it to be accessible over the internet.

If you want a more advanced Store that has authentication built in, check out [Homebase](https://github.com/beakerbrowser/homebase/)

### Public Stores

Members of the Dat community have created [Hashbase](https://hashbase.io/) which is public Dat store that anybody can use.

To set it up with the CLI, you'll need to [create an account].

Then you'll need to point the CLI at Hashbase.

```
dat store set-provider hashbase https://hashbase.io
```

And finally, you'll need to log into Hashbase from the CLI

```
dat store login hashbase YOU_USERNAME_HERE
```

Now you'll be able to add your Dats to hashbase and have it keep them online.

```
dat store add hashbase dat://SOME_KEY_HERE
```

### Automatically Track A Folder

The CLI supports a special case for local stores where you can pass it a folder and have it automatically watch for changes and update the Dat in addition to keeping the content online. This can be combined with a remote store to make sure any changes you do to a local folder get synced to the rest of the network and are kept online even if you're offline.

```
# Set up the local store to run as a service
dat store install-service

# Turn a folder with your files into a Dat
dat create ./my-website

# Add your Dat to the local store so it will watch for changes
dat add ./my-website

# Add the key for your Dat to Hashbase to keep it online if your computer is off
dat add hashbase ./my-website

# Add a file to your Dat, it should automatically be added to the history
echo Hello World! > ./my-website/index.html
```
