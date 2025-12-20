import {
  component$,
  createContextId,
  Slot,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import type { Payload, RoughNotationGroupProps, State } from './types';

export const GroupContext = createContextId<State>(
  'rough-notation.group-state'
);

export const RoughNotationGroup = component$<RoughNotationGroupProps>(
  ({ show = false }) => {
    const state = useStore<State>({ annotations: [] });
    const timeouts = useSignal<NodeJS.Timeout[]>([]);

    // Provide context to children
    useContextProvider(GroupContext, state);

    useVisibleTask$(({ track, cleanup }) => {
      track(() => show);
      track(() => state.annotations.length);

      // Clear all existing timeouts
      timeouts.value.forEach(clearTimeout);
      timeouts.value = [];

      if (!show) {
        state.annotations.forEach(({ annotation }) => annotation.hide());
        return;
      }

      let delay = 0;
      state.annotations.forEach(({ annotation }) => {
        const duration = annotation.getAnnotation().animationDuration || 800;
        const id = setTimeout(() => annotation.show(), delay);
        timeouts.value = [...timeouts.value, id];
        delay += duration;
      });

      cleanup(() => {
        timeouts.value.forEach(clearTimeout);
        timeouts.value = [];
      });
    });

    return <Slot />;
  }
);

export const useGroupContext = (
  annotation: Payload['annotation'],
  order: Payload['order']
): void => {
  const state = useContext(GroupContext);

  useVisibleTask$(() => {
    if (!state) return;

    // Add new annotation
    const newAnnotation = { annotation, order };

    // Create sorted array (immutable approach)
    const updatedAnnotations = [...state.annotations, newAnnotation].sort(
      (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
    );

    // Update state
    state.annotations = updatedAnnotations;
  });
};
