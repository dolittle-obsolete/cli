---
title: add
description: Learn about the different CLI commands
keywords: Tools
author: einari, woksin
---

The
```shell
$ dolittle add [command]
```
commands simply creates artifacts and adds them to a bounded context. 

{{% notice warning %}}
When using
```shell
$ dolittle add [command]
```
you have to be in a bounded context folder (and in C#-based bounded context you also need to be in a folder that has a .csproj file).
Currently we only support bounded contexts in C#. This means that the in the root of each bounded context there has to be a bounded-context.json file, and it again has to have a backend configuration where language is 'csharp'. 
This is important because when you do a 
```shell
$ dolittle add [command]
```
it searches the file hierarchy for a bounded-context.json file, and it will go as far back as possible, eventually breaking when it ultimately doesn't find the bounded-context.json file. This is a known bug in the cli tool.

What's more is that, for C# bounded contexts, when adding an artifact, the cli tool will traverse the file hierarchy to generate a namespace. It does this by looking for a .csproj file by traversing backwards in the hierarchy. If it doesn't find it it will break. This is also a known issue that will be resolved later.
{{% /notice %}}

## Commands
#### command
```shell
$ dolittle add command [Name of the command]
```
Creates a command artifact in the current working directory with the given argument as name. 
#### commandhandler
```shell
$ dolittle add commandhandler [Name of the command handler]
```
Creates a command handler artifact in the current working directory with the given argument as name. The cli tool will find all command artifacts by searching recursively downwards, looking for files matching a configured pattern and by matching the content with a configured pattern. It will then list all of those commands and give the developer the choice to create handlers for each of the commands automatically. 
#### event
```shell
$ dolittle add event [Name of the event]
```
Creates an event artifact in the current working directory with the given argument as name. 
#### eventprocessor
```shell
$ dolittle add eventprocessor [Name of the event processor]
```
Creates an event processor artifact in the current working directory with the given argument as name. The cli tool will find all event artifacts by searching recursively downwards, looking for files matching a configured pattern and by matching the content with a configured pattern. It will then list all of those events and give the developer the choice to create processors for each of the events automatically. 
#### readmodel
```shell
$ dolittle add readmodel [Name of the read model]
```
Creates a read model artifact in the current working directory with the given argument as name. 
#### query
```shell
$ dolittle add query [Name of the query]
```
Creates a query artifact in the current working directory with the given argument as name. 
#### queryfor
```shell
$ dolittle add queryfor [Name of the queryfor artifact]
```
Creates a queryfor artifact in the current working directory with the given argument as name. The cli tool will find all read model artifacts by searching recursively downwards, looking for files matching a configured pattern and by matching the content with a configured pattern. It will then list all of those read models and give the developer the choice to pick wich read model this query should be a query for. 
#### aggregateroot
```shell
$ dolittle add aggregateroot [Name of the aggregate root]
```
Creates an aggregate root (event source) artifact in the current working directory with the given argument as name. 


## How artifacts are generated
The artifacts are generated using boilerplates found [here](https://github.com/dolittle-boilerplates/ArtifactTemplates). When you download the @dolittle/cli tool with npm and do
```shell
$ dolittle
```
it will pull down all the dolittle-boilerplates from github and store them in a folder called .dolittle sitting in your root directory
```shell
~/.dolittle/
```
We are using handlebars js to create template-files which we bind up by creating a context in the cli tool when adding artifacts. A template file will look something like this:
```raw
using Dolittle.Commands.Handling;

namespace {{namespace}}
{
    public class {{name}} : ICanHandleCommands
    {
        {{#each commands}}
        void Handle({{this}} cmd)
        {

        }
        
        {{/each}}
    }
}
```

This tool needs to be language and framework agnostic. Therefore we need to create configurable templates and boilerplates so that we can extend the cli tool without having to open up the code base each time we want to support a new language.
In the root of each boilerplate folder for each language and/or framework there needs to be a boilerplate.json file, it will describe what type of boiler plate it is, which language and also it can define which kind of context dependencies needs to be created automatically.

```json
{
    "name": "Artifact file templates for C#",
    "language": "csharp",
    "type": "artifacts",
    "description": "All the file templates for C#",
    "dependencies": [
        {
            "type": "discover",
            "name": "namespace",
            "discoverType": "namespace",
            "milestone": ".*\\.csproj$" 
        }
    ]
}
```
This is the boilerplate.json for the C# artifacts boilerplates. Notice the "dependencies" field. It's using a little language that is used to describe the dependencies, bindings, of the templates. They can either be generated automatically or be used to automatically generate prompts for the user. Each artifact type is discovered by searching for a template.json configuration file where type is the artifact type. This is a template.json file of a 'csharp', 'queryFor' artifact.

```json
{
   "name": "QueryFor Template",
   "type": "queryFor",
   "description": "Creates a Query for a particular readmodel",
   "language": "csharp",
   "includedFiles": [
    "{{name}}.cs"
    ],
    "dependencies": [
        {
            "type": "discover",
            "name": "readModelChoices",
            "discoverType": "multipleFiles",
            "fileMatch": ".*\\.cs$",
            "contentMatch": ".*public\\s*class\\s*(\\w*)\\s*:\\s*IReadModel",
            "withNamespace": true,
            "milestone": ".*\\.csproj$"
        },
        {
            "type": "prompt",
            "promptType": "rawlist",
            "name": "readModel",
            "message": "Choose a read model",
            "choices": "readModelChoices" ,
            "customInput": "Write ReadModel name: "
        }
    ]
}
```
The "includedFiles" field indicates which files the cli tool needs to perform hadnlebars template binding on, this is just a convenience thing for the cli tool so that it does not have to do file discovery.
The interesting part though is the "dependencies" field. When defining "dependencies" in a template.json folder, those dependencies will be appended to the parent boilerplate's "dependencies" and the cli tool will create all the dependencies.

{{% notice note %}}
The dependency language is not formalized yet, currently it was just created according to which immediate needs we had at the moment. More information on the dependency language will come later on.
{{% /notice %}}

for further context, the corresponding {{name}}.cs file for the artifact type "queryFor":
```raw
using System;
using System.Linq;
using Dolittle.Queries;
namespace {{namespace}}
{
    public class {{name}} : IQueryFor<{{readModel}}>
    {

        public IQueryable<{{readModel}}> Query
        {
            get
            {
                throw new NotImplementedException();
            }
        }
    }
}
```
