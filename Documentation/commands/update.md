---
title: update
description: Learn about the different CLI commands
keywords: Tools
author: einari, woksin
---

To get updated boilerplates, simply run:

```shell
$ dolittle update
```

{{% notice warning %}}
#### Known issues:
Sometimes if the boilerplates change the boilerplate configuration file in the .dolittle folder will sometimes not adapt to the changes made when running:

```shell
$ dolittle update
```

If the boilerplates changes and you want to update them you should first delete the whole .dolittle folder sitting at your root directory.
{{% /notice %}}