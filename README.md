# Card Vault

## Setup Instructions
> [!NOTE]
> Before you begin, ensure that you have **Docker** installed on your system.

First we need to build, pull and start the containers by running:
```sh
make up
```

After this you can open the docs locally in your browser by running:
```sh
make open service=docs
```

If you want to use the githooks you can run:
```sh
make use-githooks
```

And when you want to stop using githooks:
```
make remove-githooks
```

Or you can go to the latest **main** branch docs on [**github pages**](https://tombosmans.github.io/card-vault/#/)
