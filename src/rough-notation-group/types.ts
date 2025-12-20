import type { Annotation } from '../rough-notation/types';

export interface RoughNotationGroupProps {
  show?: boolean;
}

export type Payload = {
  annotation: {
    getAnnotation: () => Annotation;
    show: () => void;
    hide: () => void;
  };
  order: number | undefined;
};

export type State = {
  annotations: Array<Payload>;
};

export type Action = {
  type: 'ADD';
  payload: Payload;
};

export type Dispatch = (action: Action) => void;
