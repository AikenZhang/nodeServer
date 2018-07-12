
const glob = require('glob')
var pattern2fileList = function(src, patternList, callback) {
  var pattern = '{'+patternList.join(',')+'}';
 
  glob(pattern, {cwd:src, mark:true}, callback);
}

//demo
var patternList = ['node-glob/**/*.{js,json}','*.js', 'node-glob'];      //{,}中逗号后面不能有空格
var src = [
  '/a.js',
  '/b.js'
];
pattern2fileList(src, patternList, function (err, fileList) {
  if(err) {
      console.log(err);
      return ;
  }
  console.log(fileList);
});
