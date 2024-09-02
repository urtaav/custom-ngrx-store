import { inject, InjectionToken } from "@angular/core"
import { Character } from "@app/models"
import { CharacterService } from "@app/services/character.service";

import {
    patchState,
    signalStore,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { lastValueFrom, pipe } from 'rxjs';
import { withLoading } from "./with-loading";

type StoreState = {
    characters: Character[]
}

const initialState: StoreState = {
    characters: []
}

const STORE_STATE = new InjectionToken<StoreState>('GlobalStore', {
    factory: () => initialState
});
export const GlobalStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(STORE_STATE)),
    withEntities<Character>(),
    withLoading(),
    withMethods((store, characterService = inject(CharacterService)) => ({
        getCharacter(characterId: number) {
            return store.characters().find((character) => character.id === characterId);
        },
        async addCharacter(newCharacter: Omit<Character, 'id'>) {
            try {
                patchState(store, ({ characters }) => ({
                    characters: [
                        ...characters,
                        { id: new Date().getTime(), ...newCharacter }
                    ],
                }))
            } catch (error) { }
        },
        async removeCharacter(id: number) {
            try {
                await lastValueFrom(characterService.removeCharacter(id));

                patchState(store, ({ characters }) => ({
                    characters: characters.filter((char) => char.id !== id),
                }));
            } catch (error) { }
        },
        async updateCharacter(updateCharacter: Character) {
            try {
                await lastValueFrom(characterService.updateCharacter(updateCharacter));
                patchState(store, ({ characters }) => ({
                    characters: characters.map((character) => character.id === updateCharacter.id ? { ...character, updateCharacter } : character),
                }))
            } catch (error) {

            }
        }
    })),
    withHooks({
        async onInit(store, characterService = inject(CharacterService)) {
            const characters = await lastValueFrom(characterService.getAllCharacters());
            patchState(store, { characters });
        }
    })
)