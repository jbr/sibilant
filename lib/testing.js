d3.csv("spots.csv", (function(err, data) {
  /* /Users/jbr/code/sibilant/src/testing.sibilant:1:20 */

  return (function() {
    if (err) {
      throw new Error (err)
    } else {
      return console.log(JSON.stringify(data));
    }
  })();
}))