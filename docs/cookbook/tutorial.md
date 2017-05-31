# Getting Started with Dat 

In this tutorial we will go through the two main ways to use Dat, sharing data and downloading data. If possible, this is great to go through with a partner to see how Dat works across computers. Get Dat [installed](intro#installation) and get started!

Dat Desktop makes it easy for anyone to get started using Dat with user-friendly interface. If you are comfortable with the command line then you can install dat via npm. You can always switch apps later and keep your dats the same. Dat can share your files to anyone, it does not matter how they are using Dat.

## Command Line Tutorial

### Downloading Data

We made a demo folder we made just for this exercise. Inside the demo folder is a `dat.json` file and a gif. We shared these files via Dat and now you can download them with our dat key!

Similar to git, you do download somebody's dat by running `dat clone <link>`. You can also specify the directory:

```
❯ dat clone dat://778f8d955175c92e4ced5e4f5563f69bfec0c86cc6f670352c457943666fe639 ~/Downloads/dat-demo
dat v13.5.0
Created new dat in /Users/joe/Downloads/dat-demo/.dat
Cloning: 2 files (1.4 MB)

2 connections | Download 614 KB/s Upload 0 B/s

dat sync complete.
Version 4
```

This will download our demo files to the `~/downloads/dat-demo` folder. These files are being shared by a server over Dat (to ensure high availability) but you may connect to any number of users also hosting the content.

You can also also view the files online: [datproject.org/778f8d955175c92e4ced5e4f5563f69bfec0c86cc6f670352c457943666fe639](https://datproject.org/778f8d955175c92e4ced5e4f5563f69bfec0c86cc6f670352c457943666fe639/). datproject.org can download files over Dat and display them on http as long as someone is hosting it. The website temporarily caches data for any visited links (do not view your dat on datproject.org if you do not want us caching your data).

### Sharing Data

We'll be creating a dat from a folder on your computer. If you are with a friend you can sync these files to their computer. Otherwise you can view them online via datproject.org to see how viewing a dat online works. 

Find a folder on your computer to share. Any kind of files work with Dat but for now, make sure it's something you want to share with your friends. Dat can handle all sorts of files (Dat works with really big folders too!). We like cat pictures.

First, you can create a new dat inside that folder. Using the `dat create` command also walks us through making a `dat.json` file:

```
❯ dat create
Welcome to dat program!
You can turn any folder on your computer into a Dat.
A Dat is a folder with some magic.
```

This will create a new (empty) dat. Dat will print a link, share this link to give others access to view your files.

Once we have our dat, run `dat share` to scan your files and sync them to the network. Share the link with your friend to instantly start downloading files.

You can also try viewing your files online. Go to [datproject.org](https://datproject.org/explore) and enter your link to preview on the top right. *(Some users, including me when writing this, may have trouble connecting to datproject.org initially. Don't be alarmed! It is something we are working on. Thanks.)*
