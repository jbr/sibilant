[![Build Status](https://travis-ci.org/jbr/sibilant.png?branch=master)](https://travis-ci.org/jbr/sibilant)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/jbr/sibilant?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Sibilant

- Sibilant is a language that is parsed by javascript and compiles to
  javascript.
- Sibilant is inspired by lisp and follows many lisp conventions,
  although it is still relatively close to the underlying javascript.
- Macros can be defined in sibilant and included at compile time.
- Sibilant is entirely written in sibilant and can recompile itself.

## Language Priorities

- Prefer verbose names to abbreviations by default.
- Avoid line noise.  Prefer established punctuation semantics from
  natural languages and common programming languages (eg commas come
  after things and mean a pause or separation).
- Prefer readable and idiomatic javascript output, which necessitates
  sticking fairly closely to javascript semantics. Switching cost from
  sibilant to directly editing the output javascript should be low.
- Prefer expressions to statements. This is the most notable exception
  to the adherance to idiomatic javascript. Self-executing functions
  are used extensively to this end.
- Allow as much of the language to be modified in-source as
  possible. This includes the ability to rename/remove/redefine all
  keywords and macros.
- Any language constructs that do not output readable javascript
  should be opt-in.
- Add language features slowly, and only when there's a real use
  case. Don't blindly implement Lisp features without reasoning
  through the need.
- Provide tools to simplify avoidance of repetition.

## Try it before you install

[sibilantjs.info](http://sibilantjs.info) includes an in-browser
as-you-type sibilant compiler and tutorial, so you can get a sense of
the language without leaving your browser.

## Installation

First, install [node.js](http://nodejs.org) [
[github](http://github.com/ry/node) ] and [npm](http://npmjs.org) [
[github](http://github.com/isaacs/npm) ].  Then, it's as simple as:

    $ npm install sibilant -g
    $ sibilant --help

## Learning the language and examples

The most up to date documentation will always be
[sibilantjs.info](http://sibilantjs.info) which includes an
as-you-type in-browser sibilant compiler.  Check out [sibilant itself,
which is written 100% in
sibilant](http://github.com/jbr/sibilant/tree/master/src) to get a
sense of what's possible.

## How to get involved or learn more

Send a blank email to
[sibilant@librelist.com](mailto:sibilant@librelist.com) to join the
mailing list.  Add any bugs or feature requests to the
[issues](http://github.com/jbr/sibilant/issues) page or email the
list.  Happy hacking, have fun!

## License

Sibilant is released under the [MIT
license](http://github.com/jbr/sibilant/blob/master/LICENSE)
([wikipedia](http://en.wikipedia.org/wiki/MIT_License)).
