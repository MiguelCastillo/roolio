## roolio

> Composable rule matcher

Create rules that you can use to check if data matches a particular criteria. The rules are built with one or more `matcher`s so that you can compose sequences of rules. There are a few built in `matcher`s to get you started with, but you can create your own as well.


### matchers

Are functions that check if input data matches a criteria. For example, you can check if some input data is a string, or if it is all CAPS.

There are a few of these default matchers.


#### default

The default matcher will do a RegExp test if a regex is provided, otherwise it will do a strict equality comparison.

``` javascript
var rule = new Rule();

rule.addMatch(['hello', /hola/]);

rule.match('hello');        // Will test true
rule.match('hola world');   // Will test true
rule.match('hello world');  // Will test false
rule.match('hi world');     // Will test false
```

#### extension

Matcher for file extensions. You can specify one or more file extensions if the input string has a particular file extension.

``` javascript
var rule = new Rule();

rule.addMatch(Rule.matcher.extension('js|jsx|json'));

rule.match('test.js');   // Will test true
rule.match('test.jsx');  // Will test true
rule.match('test.json'); // Will test true
rule.match('testjs');    // Will test false
rule.match('test.js.a'); // Will test false
```

#### string

Matcher for strings. This will verify if the input string matches one of the matching rules.

``` javascript
var rule = new Rule();

rule.addMatch(Rule.matcher.string('test.js'));

rule.match('test.js');   // Will test true
rule.match('test.jsx');  // Will test false
rule.match('test.json'); // Will test false
rule.match('testjs');    // Will test false
rule.match('test.js.a'); // Will test false
```

You can actually just check if the input is a string.

``` javascript
var rule = new Rule();

rule.addMatch(Rule.matcher.string);

rule.match('some randome string');   // Will test true
rule.match('');                      // Will test true
rule.match(true);                    // Will test false
rule.match(null);                    // Will test false
```

#### custom rule matchers

Rule matchers are just functions.  So you can pass in your own function if you want custom behavior.  For example, you can create your own custom matcher to check objects properties.

Here is an arbitrary custom matcher that checks if the first letter of the input string matches one of the matching rules:

``` javascript
function customMatcher(criteria) {
  return function(match) {
    return criteria[0] === match[0];
  };
}

var rule = new Rule();

rule.addMatch([customMatcher('Standing up'), customMatcher('Dont stand up'));

rule.match('Some randome string');   // Will test true
rule.match('some randome string');   // Will test false
rule.match('Dance party');           // Will test true
rule.match('dance party');           // Will test false
```

### Rules API

#### addMatch

Function that takes one or an array of matching rules. Matching rules added with this method are aggregated, and it returns itself to enable chaining.

``` javascript
var rule = new Rule();

rule
  .addMatch(Rule.matcher.string)
  .addMatch(/hello world/);
```

#### match || matchAny

Function that takes in data to be matched against the configured matching rules.  Returns whether or not the input matches **one** of the matching rules.

``` javascript
var rule = new Rule();

// Match is true
rule
  .addMatch(Rule.matcher.string)
  .addMatch(/hello world/);
  .match('test');
```

#### matchAll

Just like `match`, but it checks if the input matches **all** the matching rules.

``` javascript
var rule = new Rule();

// Match is false
rule
  .addMatch(Rule.matcher.string)
  .addMatch(/hello world/);
  .matchAll('test');
```


#### getLength

Function that returns the number of matching rules configured in a particular rule.

``` javascript
var rule = new Rule();

// Length returns 2
rule
  .addMatch(Rule.matcher.string)
  .addMatch(/hello world/)
  .getLength();
```

## License

Licensed under MIT
