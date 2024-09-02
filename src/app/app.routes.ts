import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        redirectTo: '/characters',
        pathMatch: 'full'
    }, {
        path: 'characters',
        loadComponent: () => import('./main-container/main-container.component').then((c) => c.MainContainerComponent)
    },
    {
        path: 'add-edit-character',
        loadComponent: () => import('./main-container/components/character-add-edit/character-add-edit.component').then((c) => c.CharacterAddEditComponent),
    },
    {
        path: 'add-edit-character/:id',
        loadComponent: () => import('./main-container/components/character-add-edit/character-add-edit.component').then((c) => c.CharacterAddEditComponent),
    }
];
