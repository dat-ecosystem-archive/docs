# Publishing a Dat

Dat has privacy by default, but what if you want to share your dat with the world publicly, or within your organization? There are a variety of ways to do this, which we describe here.

## Create dat.json file
When referencing your dat, you want to be able to have some way to specify what the dat is -- like a title, description, and url. To do this, we recommend creating a `dat.json` file as well as a README in your dat archive. The `dat create` command creates a `dat.json` file for you by default:

```
$ dat create
Welcome to dat program!
You can turn any folder on your computer into a Dat.
A Dat is a folder with some magic.

Your dat is ready!
We will walk you creating a 'dat.json' file.
(You can skip dat.json and get started now.)

Learn more about dat.json: https://github.com/datprotocol/dat.json

Ctrl+C to exit at any time
Title: More Tweets, More Votes
Description: When you tweet more, more votes happen.
```

This will generate a `dat.json` file which you can use to reference your dat in the future. For example:

`dat.json`

```json
{
  "url": "dat://96cf4957539aff4fc856fa0804e613181064ed193e5f7882c9623ec7bed38deb",
  "title": "More Tweets More Votes",
  "description": "An analysis of tweets from the peroid before 2012 U.S. House election combined with census data."
}
```

Dat can read these files to know how to download and catalogue your dat. This is the most simple version, but they can get more complicated if you want. You can use this file in other applications such as a registry, data portal, or git repository to reference your dat.

## Dat Registry

We have built a web server that allows you to create a user account and build your list of datasets, using the dat.json file to give them names, titles, and descriptions that make it easy to share your data with the general public. The registry does not take care of long-term hosting of your data -- the registry only acts as a way to easily surface available dats in a searchable list. A dat registry is similar to a torrent tracker, if you're familiar with those.

We have hosted a global public registry at [https://datproject.org](https://datproject.org). First, you must create an account:

```bash
$ dat register
Welcome to dat program!
Create a new account with a Dat registry.

Dat registry:  (datproject.org)
```

By default, `dat` will use `datproject.org` as the registry. If you'd like to host your own registry, you can type in your own server name. Once you have an account, you can use `dat publish` to publish your dat to the registry.

First, `dat publish` will ask you for a name for your dat. This is the short name that will be part of the URL, for example, more-tweets-more-votes would be `myusername/more-tweets-more-votes`:

```bash
cd /path/to/my/dat
$ dat publish
Name: more-tweets-more-votes
Published successfully!
```

Once the dat is published, you can visit it. For this example: [https://datproject.org/karissa/more-tweets-more-votes](https://datproject.org/karissa/more-tweets-more-votes).

In order for anyone to see the dat, you'll need to have `dat share` running on your current dat. If you want to turn off your desktop, we recommend setting up a server to host your dats.

[Learn how to set up a long-term server for hosting dats](/server)

## Using Git with `dat.json`

You might want to be able to get the collaborative benefits of git along with the benefits of fast data download, versioning, p2p, and deduplication with dat. All you have to do is include the `dat.json` file in your git repository, and tell people to type `dat clone` for them to get the latest version of your data. Now, when someone clones your git repository, they can download your data by simply typing `dat clone dat.json`, and the url in the dat.json will be used to download the dat.

To save space in your git repo, you probably want to add `.dat` to your `.gitignore` file in your git repository to make sure none of dat's metadata is included. Dat by default ignores your `.git` folder, so you don't have to worry about that.
