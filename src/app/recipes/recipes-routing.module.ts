import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const recipeRoutes: Routes = [
    {
        path: '', component: RecipesComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: RecipeStartComponent},
            { path: 'view/:id', component: RecipeDetailComponent },
            { path: 'new', component: EditRecipeComponent, canActivate: [AuthGuardService]},
            { path: 'edit/:id', component: EditRecipeComponent, canActivate: [AuthGuardService]}
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [RouterModule],
    providers: [
        AuthGuardService
    ]
})

export class RecipesRoutingModule {

}