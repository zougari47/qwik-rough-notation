export type types =
  | 'underline'
  | 'box'
  | 'circle'
  | 'highlight'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

type brackets = 'left' | 'right' | 'top' | 'bottom';

interface RoughNotationProperties {
  animate?: boolean;
  animationDelay?: number;
  animationDuration?: number;
  brackets?: brackets | brackets[];
  color?: string;
  iterations?: number;
  multiline?: boolean;
  order?: number | string;
  padding?: number | [number, number, number, number] | [number, number];
  strokeWidth?: number;
}

export interface Annotation extends RoughNotationProperties {
  isShowing(): boolean;
  show(): void;
  hide(): void;
  remove(): void;
}

export interface RoughNotationProps extends RoughNotationProperties {
  customElement?: string;
  getAnnotationObject?: (annotation: Annotation) => void;
  show?: boolean;
  type: types;
}
