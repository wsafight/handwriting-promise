import MyPromise from "./index";

export const constantFun = (value: any) => value

export const errorFun = (reason: any) => {
  throw reason
}


export function resolveContainer<T>(containerBack: MyPromise<T>, value: T, resolve: any, reject: any) {
  if (!(value instanceof MyPromise)) {
    resolve(value)
  } else {
    if (value !== containerBack) {
      value.then(resolve, reject)
    } else {
      reject(new TypeError('Chaining cycle detected for promise <Promise>'))
    }
  }
}