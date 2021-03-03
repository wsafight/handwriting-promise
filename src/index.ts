/**
 * Asynchronous Container
 * The asynchronous operation entrusts the execution result
 */
import { MyPromiseState, MyPromiseClass } from "./interface";
import { constantFun, errorFun } from "./utils";

function resolveContainer<T>(containerBack: MyPromise<T>, value: T, resolve: any, reject: any) {
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

export default class MyPromise<T> implements MyPromiseClass<T> {
  // current state
  state: MyPromiseState | undefined = undefined;

  value: T | undefined = undefined
  reason: any = undefined
  onResolvedTodoList: Function[] = []
  onRejectedTodoList: Function[] = []


  constructor(excutor: any) {
    try {
      excutor(this.resolve, this.reject)
      this.state = MyPromiseState.Pending
    } catch (e) {
      this.reject(e)
    }
  }

  resolve = (value: T) => {
    if (this.state !== MyPromiseState.Pending) {
      return
    }
    this.state = MyPromiseState.Resolved
    this.value = value
    while (this.onResolvedTodoList.length) {
      const fun = this.onResolvedTodoList.shift()
      typeof fun === 'function' && fun()
    }
  }

  reject = (reason: any) => {
    if (this.state !== MyPromiseState.Pending) {
      return
    }
    this.state = MyPromiseState.Rejected
    this.reason = reason
    while (this.onRejectedTodoList.length) {
      const fun = this.onRejectedTodoList.shift()
      typeof fun === 'function' && fun()
    }
  }


  then(onResolve: any = constantFun, onRejected: any = errorFun) {
    const containerBack = new MyPromise((resolve: any, reject: any) => {
      const resolveFun = () => {
        try {
          const value = onResolve(this.value)
          resolveContainer(containerBack, value, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }
      const rejectFun = () => {
        try {
          const value = onRejected(this.reason)
          resolveContainer(containerBack, value, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }
      switch (this.state) {
        case MyPromiseState.Pending:
          this.onResolvedTodoList.push(() => {
            setTimeout(resolveFun)
          })
          this.onRejectedTodoList.push(() => {
            setTimeout(rejectFun)
          })
          break;
        case MyPromiseState.Resolved:
          setTimeout(resolveFun)
          break;
        case MyPromiseState.Rejected:
          setTimeout(rejectFun)
          break;
      }
    })
    return containerBack
  }

}