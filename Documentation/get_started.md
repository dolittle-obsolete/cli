---
title: Get started
url: /tooling/cli/
description: Learn about the Dolittle CLI
keywords: Tools, CLI 
author: einari, woksin
weight: 2
repository: https://github.com/dolittle-tools/cli
aliases:
    - /tools/cli
    - /tooling/cli/get-started/
---

The @dolittle/cli CLI tool is a command-line tool built upon the [Dolittle tooling platform](https://github.com/dolittle-tools/common) and [Node.js](https://nodejs.org/en/).

### Install
{{% notice warning %}}
The [Dolittle tooling platform](https://github.com/dolittle-tools/common) and this the CLI needs node version >= 10.0.0 
{{% /notice %}}

Then simply open a shell on any platform and run the following:

```shell
$ npm i -g @dolittle/cli
```

Note that it is actually required to have @dolittle/cli installed globally using -g to make use of the underlying dolittle tooling system.

### Use

To initialize the tool and see its currently available functionalities simply do this command:
```shell
$ dolittle
```

Use -h or --help at any time to display help.
```shell
$ dolittle <any command> -h
```

