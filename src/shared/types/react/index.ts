import { Dispatch, SetStateAction } from 'react';

export type SetReactState<T> = Dispatch<SetStateAction<T>>;

export interface IChildrenProps {
  children: React.ReactNode;
}
