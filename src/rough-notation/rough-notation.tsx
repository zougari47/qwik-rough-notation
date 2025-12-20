import {
  component$,
  useSignal,
  useVisibleTask$,
  Slot,
  useStore,
} from '@builder.io/qwik';
import { annotate } from 'rough-notation';
import { useGroupContext } from '../rough-notation-group/rough-notation-group';
import type { RoughNotationProps, Annotation } from './types';

export const RoughNotation = component$<RoughNotationProps>(
  ({
    animate = true,
    animationDelay = 0,
    animationDuration = 800,
    brackets,
    color,
    customElement = 'span',
    getAnnotationObject,
    iterations = 2,
    multiline = false,
    order,
    padding = 5,
    show = false,
    strokeWidth = 1,
    type = 'underline',
    ...rest
  }) => {
    const elementRef = useSignal<HTMLElement>();
    const annotation = useSignal<Annotation>();
    const innerVars = useStore({
      playing: false,
      timeout: null as number | null,
    });

    // Initialize annotation and register with group
    useVisibleTask$(() => {
      if (!elementRef.value) return;

      const options = {
        animate,
        animationDuration,
        brackets,
        color,
        iterations,
        multiline,
        padding,
        strokeWidth,
        type,
      };

      annotation.value = annotate(elementRef.value, options);

      if (getAnnotationObject) {
        getAnnotationObject(annotation.value);
      }

      // Register with group context after annotation is created
      useGroupContext(
        {
          getAnnotation: () => annotation.value!,
          show: () => {
            if (innerVars.timeout === null) {
              innerVars.timeout = window.setTimeout(() => {
                innerVars.playing = true;
                annotation.value?.show?.();
                window.setTimeout(() => {
                  innerVars.playing = false;
                  innerVars.timeout = null;
                }, animationDuration);
              }, animationDelay);
            }
          },
          hide: () => {
            annotation.value?.hide?.();
            innerVars.playing = false;
            if (innerVars.timeout !== null) {
              clearTimeout(innerVars.timeout);
              innerVars.timeout = null;
            }
          },
        },
        typeof order === 'string' ? parseInt(order) : order
      );

      return () => {
        annotation.value?.remove?.();
        if (innerVars.timeout !== null) {
          clearTimeout(innerVars.timeout);
        }
      };
    });

    // Handle show/hide logic
    useVisibleTask$(({ track, cleanup }) => {
      track(() => show);

      if (!annotation.value) return;

      // Clear existing timeout
      if (innerVars.timeout !== null) {
        clearTimeout(innerVars.timeout);
        innerVars.timeout = null;
      }

      if (show) {
        // Show annotation with delay
        innerVars.timeout = window.setTimeout(() => {
          innerVars.playing = true;
          annotation.value?.show?.();

          window.setTimeout(() => {
            innerVars.playing = false;
            innerVars.timeout = null;
          }, animationDuration);
        }, animationDelay);
      } else {
        // Hide annotation immediately
        annotation.value?.hide?.();
        innerVars.playing = false;
      }

      cleanup(() => {
        if (innerVars.timeout !== null) {
          clearTimeout(innerVars.timeout);
          innerVars.timeout = null;
        }
      });
    });

    // Update annotation properties when they change
    useVisibleTask$(({ track }) => {
      track(() => animate);
      track(() => animationDuration);
      track(() => color);
      track(() => strokeWidth);
      track(() => padding);

      if (annotation.value) {
        annotation.value.animate = animate;
        annotation.value.animationDuration = animationDuration;
        annotation.value.color = color;
        annotation.value.strokeWidth = strokeWidth;
        annotation.value.padding = padding;
      }
    });

    const Element = customElement as any;

    return (
      <Element ref={elementRef} {...rest} class='inline w-fit'>
        <Slot />
      </Element>
    );
  }
);

export default RoughNotation;
