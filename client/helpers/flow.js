export default function(fn1, fn2) {
  return function() {
    const newArgs = fn1.apply(this, arguments)
    
    return fn2.call(this, newArgs)
  }
}