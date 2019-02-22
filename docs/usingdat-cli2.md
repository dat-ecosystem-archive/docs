---
id: cli-more
title: Sharing files over HTTP
---

The Dat command line comes with a built in HTTP server. This is a cool demo because we can also see how version history works! The `--http` option works for files you are sharing *or* downloading.

(If you don't have dat command line installed, run `npm install -g dat`, or [see more info](getting-started-installation.md).)

## Serve over HTTP

Serve dat files on http by adding the `--http` option. For example, you can sync an existing dat:

```
❯ dat sync --http
dat://778f8d955175c92e4ced5e4f5563f69bfec0c86cc6f670352c457943666fe639
Sharing dat: 2 files (1.4 MB)
Serving files over http at http://localhost:8080

2 connections | Download 0 B/s Upload 0 B/s
```

Now visit `http://localhost:8080` to see the files in your browser! The default http port is 8080. You should see a directory listing:

<img src="/assets/cli-http.png" alt="Dat HTTP viewer"/>

If your dat has an `index.html` page, that will be shown instead.

You can combine Dat's http support with our server tools to create a live updating website or place to share files publicly.

## Built-in Versioning

As you may know, Dat automatically versions all files. The HTTP display is an easy way to view version history:

**Use `localhost:8080/?version=2` to view a specific version.**

## Live reloading

The Dat http viewer also comes with live reloading. If it detects a new version it will automatically reload with the new directory listing or page (as long as you aren't viewing a specific version in the url).

## Sparse Downloading

Dat supports *sparse*, or partial downloads, of datasets. This is really useful if you only want a single file from a large dat. Unfortunately, we haven't quite built a user interface for this into our applications. So you can hack around it!

This will allow you to download a single file from a larger dat, without downloading metadata or any other files.

First, start downloading our demo dat, make sure you include both the flags (`--http`, `--sparse`).

```
❯ dat dat://778f8d955175c92e4ced5e4f5563f69bfec0c86cc6f670352c457943666fe639 ./demo --http --sparse
Cloning: 2 files (1.4 MB)
Serving files over http at http://localhost:8080

3 connections | Download 0 B/s Upload 0 B/s
```

The `--sparse` option tells Dat to only download files you specifically request. See how it works:

1. Check out your `./demo` folder, it should be empty.
2. Open the Dat in your browser.
3. Click on a file to download.
4. It should be in your folder now!

Pretty cool! You can use this hack to download only specific files or even older versions of files (if they've been saved somewhere).
