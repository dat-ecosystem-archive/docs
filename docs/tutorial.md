# Getting Started with Dat

This is a tutorial for the Dat command line tool. If you don't use the command line, don't worry. There is a desktop app that makes it easy for anyone to share and download data using Dat. Anyone using a Dat application will work, it does not matter which application they are using. [Download the Desktop Application](/install#desktop-application)

In this tutorial we will go through the two main ways to use Dat, sharing data and downloading data. If possible, this is great to go through with a partner to see how Dat works across computers.

## Features

* **Secure** - Dat encrypts data transfers and verifies content on arrival. Dat prevents third-party access to metadata and content. [Learn more](faq#security-and-privacy) about security & privacy.
* **Distributed** - Connect directly to other users sharing or downloading common datasets. Any device can share files without need for centralized servers. [Read more](terms#distributed-web) about the distributed web.
* **Fast** - Share files instantly with in-place archiving. Download only the files you want. Quickly sync updates by only downloading new data, saving time and bandwidth.
* **Transparent** - A complete version history improves transparency and auditability. Changes are written in append-only logs and uniformly shared throughout the network.
* **Future-proof** - Persistent links identify and verify content. These unique ids allow users to host copies, boosting long-term availability without sacrificing provenance.

## Installing Dat

To install dat in the Terminal, use `npm install -g dat`. For more information, see the [Installation page](/install).

## Downloading Data

Similar to git, you do download somebody's dat by running `dat clone <link>`. A dat link is like an http:// link, but with special properties.

As an example, we created a dat that you can download. It just contains a couple of small files.

```
dat clone dat://778f8d955175c92e4ced5e4f5563f69bfec0c86cc6f670352c457943666fe639 ~/Downloads/dat-demo
```

![clone](https://raw.githubusercontent.com/datproject/docs/master/assets/cli-clone.gif)

This will download our demo files to the `~/Downloads/dat-demo` folder. These files are being shared by a server over Dat (to ensure high availability). When you download data, you may connect to any number of users who are running dat, too. The more users that are running dat the faster it downloads.

You can also also view the files online: [https://datproject.org/778f8d955175c92e4ced5e4f5563f69bfec0c86cc6f670352c457943666fe639](https://datproject.org/778f8d955175c92e4ced5e4f5563f69bfec0c86cc6f670352c457943666fe639/). Datproject.org previews a dat in the browser -- as long as someone is hosting it. The website temporarily caches data for any visited links (i.e., do not view your dat on datproject.org if you do not want us caching your data).

## Creating a Dat

Now, let's share some data and create a dat from a folder on your computer.

Find a folder on your computer to share. Any kind of files work with Dat but for now, make sure it's something you want to share. Dat can handle all sorts of files (Dat works with really big folders too!). We like cat pictures.

First, you can create a new dat inside that folder. Using the `dat create` command initializes the dat and allows us to give it some information so that other people and applications can easily display what is in the dat.

```
dat create
> Title My Amazing Data
> Title My Awesome Dat
> Description This is a dat

Created empty Dat in /Users/me/MyData/.dat
```

This will create a new (empty) dat. A folder called `.dat` is created, which contains a bunch of metadata files that keep the dat in sync. To learn more about what these files are, read the [Overview](/overview) or the  [read the Dat paper](/paper).

## Sharing data

Your dat has been created, and now it's time to scan and sync the data to someone else. In the same folder, run the following command:

```
dat share
```

![share](https://raw.githubusercontent.com/datproject/docs/master/assets/cli-share.gif)

As long as this process is running, you can share the link with your friend and they can instantly start downloading your files.

If you don't want the other person to download dat, you can also send them a link and they can see the contents in the browser. Go to [http://datproject.org](https://datproject.org) and enter your link to preview on the top right. *(Some users, including me when writing this, may have trouble connecting to datproject.org initially. It might take some time to initially connect, but if you wait and refresh it should view the files. We are actively working on improving this performance. Thanks.)*

## Keeping data alive

Your data will be available on the network as long as the process is open. However, if you need to close your laptop or turn off the computer, you might want to host the dat for long-term on a server.

First, you need to purchase a server on your own. We recommend using [Digital Ocean](digitalocean.com), or setting up a [data silo in your house](https://github.com/datproject/datasilo).

Once you have a server available, head over to the [Running Dats on a Server section to automatically re-host your dat](/server).
