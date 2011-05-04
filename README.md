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

## CLI

    -v / --version         Print out a version string and exit
    
    -h / --help            This message
    
    --repl / [no args]     Sibilant interactive command prompt
    
    --execute / -x         This is a flag. Execute input files in order supplied.
    
    --eval [optional STRING] / -e [optional STRING]
                           Evaluate STR if provided, otherwise evaluate standard in.
    
    --output DIR / -o DIR  Output input files to this dir, replacing .sibilant with .js.
    
    --input FILE / -i FILE / FILE
                           Add this file to the input files. If the execute flag is
                           set, input files will be executed.  If an output dir is
                           specified, each file will be written to that dir.
                           Otherwise, each file will be written to STDOUT.
    
    To pass arguments to an executed file, append them after a "--", as follows:
    $ sibilant -x myfile.sibilant -- --arg-for-my-program=stuff
    
    myfile.sibilant will see process.argv as
    [ 'sibilant', 'myfile.sibilant', '--arg-for-my-program=stuff' ]

    
### CLI Examples

#### To compile sibilant

    $ git clone git://github.com/jbr/sibilant.git
    $ cd sibilant
    $ npm link .
    $ sibilant src/*.sibilant -o lib
    $ sibilant -x test/test.sibilant # you're now running a sibilant you just compiled.

#### To compile one file to stdout

    $ sibilant test/test.sibilant

#### To compile a file to a directory

    $ sibilant test/test.sibilant -o . # put test.js here
or
    $ sibilant --input test/test.sibilant --output .

#### To run a file

    $ sibilant -x test/test.sibilant

#### To enter the repl

    $ sibilant
or
    $ sibilant --repl

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
