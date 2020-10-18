export const delay = (timeout) => new Promise((res, rej) => {
  setTimeout(res, timeout)
});
export const runPromisesInSeries = (promiseCalls) => {
  let i = 0;
  const callBack = () => {
      const promise = promiseCalls[i++]();
      if(i !== promiseCalls.length)
          promise.then(callBack);
  };
  callBack();
};
export const Promise_all = (promises) => {
  if(!promises.length)
      return new Promise(resolve => resolve([]));
  return new Promise(function(resolve, reject) {
      let count = promises.length;
      const result = [];
      const checkDone = function() { if (--count === 0) resolve(result) };
      promises.forEach(function(p, i) {
          p.then(function(x) { result[i] = x }, reject).then(checkDone)
      })
  })
};
export function* fibonacci(n)  {
  let previous = 0;
  let current = 1;
  for(let i = 0; i < n; i++)
  {
      yield previous;
      const newVal = previous + current;
      previous = current;
      current = newVal;
  }
}
export const helper = async (generatorFunction) => {
  let generator = generatorFunction();
  let prev, done, value;
  while (({done, value} = generator.next(prev)) && !done) {
      await value.then((val) => prev = val, (val) => generator.throw(val));
  }
};