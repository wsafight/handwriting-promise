
const constantFun = (value: any) => value

const errorFun = (reason: any) => {
  throw reason
}

const enum MyPromiseState {
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected'
}

export default class MyPromise<T> {
  state: MyPromiseState | undefined  = undefined;
  value: T | undefined = undefined
  reason: any = undefined
  onResolvedTodoList = []
  onRejectedTodoList = []


  constructor(excutor: any) {
    console.log(excutor)
  }

  resolve = (value: T) => {

  }
  reject = (reason: any) => {

  }



  then(onResolve: any = constantFun, onRejected: any = errorFun) {

  }

}