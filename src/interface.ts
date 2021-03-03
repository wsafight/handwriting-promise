export const enum MyPromiseState {
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected'
}

export interface MyPromiseClass<T> {
  state: MyPromiseState | undefined ;
  value: T | undefined;
  reason: any;
  onResolvedTodoList: Function[];
  onRejectedTodoList: Function[];
}