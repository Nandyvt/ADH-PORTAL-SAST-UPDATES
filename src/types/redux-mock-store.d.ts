declare module "redux-mock-store" {
  import { AnyAction, Middleware } from "redux";

  export default function configureMockStore<
    S = any,
    A extends AnyAction = AnyAction
  >(
    middlewares?: Middleware[]
  ): (initialState?: S) => {
    getState(): S;
    dispatch(action: A): A;
    clearActions(): void;
    getActions(): A[];
    subscribe(listener: () => void): () => void;
    replaceReducer(nextReducer: any): void;
  };
}
