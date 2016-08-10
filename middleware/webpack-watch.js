import watch from 'watch';
import { exec } from 'child_process';

//watch client js for changes and compile with webpack
export default () => {
  watch.watchTree('./public/js', function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      // f is a new file
      exec("webpack", (err, stdout, stderr) => {
        if(err) console.log(err);
        if(stderr) console.log(stderr)
      });
    } else if (curr.nlink === 0) {
      // f was removed
      exec("webpack", (err, stdout, stderr) => {
        if(err) console.log(err);
        if(stderr) console.log(stderr)
      });
    } else {
      // f was changed
      exec("webpack", (err, stdout, stderr) => {
        if(err) console.log(err);
        if(stderr) console.log(stderr)
      });
    }
  });
}
