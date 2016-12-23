# Github Userbase Slash Command for Mixmax

This is an open source Mixmax Slash Command.
Check out <http://sdk.mixmax.com/docs/tutorial-giphy-slash-command> for more information about
how to use this example code in Mixmax.

## Running locally

1. Install using `npm install`
2. Run using `npm start`
3. Add a Mixmax Slash Command in your Mixax dashboard using the following information. 

![parameters](https://raw.githubusercontent.com/kevintaehyungkim/mixmax-github-slash-command/master/screenshots/parameters.png)

4. Compose an email in Gmail using Mixmax and type /github [Search]

## What it should look like:
###Typeahead<br>
![typeahead](https://raw.githubusercontent.com/kevintaehyungkim/mixmax-github-slash-command/master/screenshots/typeahead.png)

###Resolver<br>
![resolver](https://raw.githubusercontent.com/kevintaehyungkim/mixmax-github-slash-command/master/screenshots/resolver.png)

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl http://localhost:9145/typeahead?text=tetris
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9145/resolver?text=tetris
```
