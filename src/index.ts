
const constantFun = (value: any) => value
const errorFun = (reason: any) => {
  throw reason
}


export default class MyPromise<T> {

  constructor(excutor: any) {
    console.log(excutor)
  }

  resolve = (value: T) => {

  }
  reject = (reason: any) => {

  }

  onResolvedTodoList = []
  onRejectedTodoList = []

  then(onResolve: any = constantFun, onRejected: any = errorFun) {

  }

}