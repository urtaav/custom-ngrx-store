import {
    patchState,
    signalStoreFeature,
    withMethods,
    withState,
} from '@ngrx/signals';

export const withLoading = () =>
    signalStoreFeature(
        withState({ isLoading: true }),
        withMethods((state) => ({
            setLoading(value: boolean) {
                patchState(state, { isLoading: value });
            },
        })),
    );