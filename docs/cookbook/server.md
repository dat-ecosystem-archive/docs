# Dats on a Server

After you create your dat and close your laptop, other people won't be able to access your data. You might want a server that is always running, that archives and mirrors your dats, so that your dats are accessible at all times of the day.

## TLDR
To host a dat on your server:

```
    npm install -g dat lil-pids add-to-systemd
    mkdir ~/dats
    echo "dat dat://ff34725120b2f3c5bd5028e4f61d14a45a22af48a7b12126d5d588becde88a93/ \
      ~/dats/datprotocol \
      --quiet" > ~/dats/services
    sudo add-to-systemd dat-lil-pids $(which lil-pids) ~/dats/services ~/dats/pids
    sudo systemctl start dat-lil-pids
```
