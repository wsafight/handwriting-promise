
const constantFun = (value: any) => value

const errorFun = (reason: any) => {
  throw reason
}

type PromiseState = 'pending' | 'resolved' | 'rejected'

export default class MyPromise<T> {
  state: PromiseState | undefined  = undefined;
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