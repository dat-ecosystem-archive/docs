---
id: security-faq
title: Understanding Dat Privacy
---

### Can other users tell what I am downloading? 

Users only connect to other users with the same dat read key. Anyone with a dat read key can see other users that are sharing that read key and their IP addresses.

We are thinking more about how to ensure reader privacy. See [this blog post](https://blog.datproject.org/2016/12/12/reader-privacy-on-the-p2p-web/) for more discussion.

### Is data shared over Dat encrypted?

Yes, data shared over Dat is encrypted in transit using the read key (Dat read key). When you share a Dat, you must share the read key with another user so they can download it. We use that key on both ends to encrypt the data so both users can read the data but we can ensure the data is not transferred over the internet without encryption.

### Is it possible to discover read keys via man-in-the-middle?

One of the key elements of Dat privacy is that the read key is never used in any discovery network. The read key is hashed, creating the discovery key. Whenever peers attempt to connect to each other, they use the discovery key.

Data is encrypted using the read key, so it is important that this key stays secure.

### Can anyone download my data? What if I don't share the key with anyone?

Only someone with the read key can download data for Dat. It is the responsibility of the user that the Dat read key is only shared with people who should access the data. The key is never sent over the network via Dat. We do not track keys centrally. It is almost impossible for keys to overlap (and thus to guess keys).

### How can I create stronger privacy protections for my data?

As long as the read key isn't shared outside of your team, the content will be secure (though the IP addresses and discovery key may become known). You can take a few steps further to improve privacy (generally at the cost of ease of use):

1. Disable bittorrent DHT discovery (using only DNS discovery), use `--no-dht` flag in CLI.
2. Whitelist IP addresses
3. Run your own discovery servers
4. Encrypt contents before adding to dat (content is automatically encrypted in transit but this would also require decrypting after arrival).

Only some of these options can be done in the current command line tool. Feel free to PR options to make these easier to configure!

### How does Dat make sure I download the correct content?

Dat uses the concept of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) to make sure content is not tampered with. When content is added to a Dat we  cryptographically fingerprint it and add it to the tree. On download, we can use the tree to make sure the content has not changed and the parent hashes match.

### How does Dat help to improve transparency?

Dat uses an append-only to track changes over time. An append-only log shows all of the changes for a given Dat since it was shared. We use this for version control but it can also bolster transparency for a dataset. Any changes to a dataset will be tracked and you can see what changed and when.

### Privacy and Security Versus Bittorrent

As a peer to peer network, Dat faces similar privacy risks as Bittorrent. When you download a dataset, your IP address is exposed to the users sharing that dataset. This may lead to honeypot servers collecting IP addresses, as we've seen in Bittorrent. However, with dataset sharing we can create a web of trust model where specific institutions are trusted as primary sources for datasets, diminishing the sharing of IP addresses. [Read more](https://blog.datproject.org/2016/12/12/reader-privacy-on-the-p2p-web/) about reader privacy in the p2p web.
