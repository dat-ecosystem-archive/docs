# Publishing a Dat

Dat has privacy by default, but what if you want to share your dat with the world publicly, or within your organization? There are a variety of ways to do this, which we describe here.

## Dat Registry

We have built a web server that allows you to create a user account and build your list of datasets, giving them names, titles, and descriptions that make it easy to share your data with the general public. The registry does not take care of long-term hosting of your data -- the registry only acts as a way to easily surface available dats in a searchable list. A dat registry is similar to a torrent tracker, if you're familiar with those.

We have hosted a global public registry at [https://datproject.org](https://datproject.org). First, you must create an account:

```
$ dat register
Welcome to dat program!
Create a new account with a Dat registry.

Dat registry:  (datproject.org)
```

By default, `dat` will use `datproject.org` as the registry. If you'd like to host your own registry, you can type in your own server name here.

Now, you can `dat login` with the account you just made.

Finally, use `dat publish` to publish the dat in the current folder. Make sure you've already created a dat using `dat create` or `dat share`

`dat publish` will ask you for a name for your dat. This is the short name that will be part of the URL, for example:
```
cd /path/to/my/dat
$ dat publish
Name: more-tweets-more-votes
Published successfully!
```

Once the dat is published, you can visit it. For this example: [https://datproject.org/karissa/more-tweets-more-votes](https://datproject.org/karissa/more-tweets-more-votes).

In order for anyone to see the dat, you'll need to have `dat share` running on your current dat. If you want to turn off your desktop, we recommend setting up a server to host your dats.

[Learn how to set up a long-term server for hosting dats](/server)

## Using Git with `dat.json`

If you're familiar with git, you might want to be able to get the collaborative benefits of git along with the benefits of fast data download, versioning, p2p, and deduplication with dat. To do this, you want to create a `dat.json` file in your Git repository. The `dat create` command does this for you.

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

To save space in your git repo, you can then add `.dat` to your `.gitignore` file in your git repository to make sure none of the metadata makes it in there.

Now, when someone clones your git repository, they can download your data by simply typing `dat clone dat.json`, and the url in the dat.json will be used to download the dat.
