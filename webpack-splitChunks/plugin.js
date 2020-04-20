module.exports = function MyPlugin(){
  this.apply = function(complier){
    complier.hooks.emit.tapAsync('MyPlugin', (compilation, cb) => {
        console.log(compilation.fileTimestamps)
        // console.log(compilation.fileDependencies)

      cb()
    })
  }
}