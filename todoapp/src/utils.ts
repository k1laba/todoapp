export function enumSelector(definition) {
    return Object.keys(definition).filter(i => !isNaN(parseInt(i))).map(key => ({ title: definition[key], value: key }));
  }
  export function createCopy<T>(item:T) {
      return JSON.parse(JSON.stringify(item)) as T;
  }