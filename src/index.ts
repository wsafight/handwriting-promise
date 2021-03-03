import set = Reflect.set;

const constantFun = (value: any) => value

const errorFun = (reason: any) => {
  throw reason
}

const enum MyPromiseState {
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected'
}

/**
 * Asynchronous Container
 * The asynchronous operation entrusts the execution result
 */
export default class MyPromise<T> {
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
    switch (this.state) {
      case MyPromiseState.Pending:
        this.onResolvedTodoList.push(() => {
          setTimeout(() => {
            onResolve(this.value)
          })
        })
        this.onRejectedTodoList.push(() => {
          setTimeout(() => {
            onRejected(this.reason)
          })
        })
        break;
      case MyPromiseState.Resolved:
        setTimeout(() => {
          onResolve(this.value)
        })
        break;
      case MyPromiseState.Rejected:
        setTimeout(() => {
          onRejected(this.reason)
        })
        break;
    }
  }

}