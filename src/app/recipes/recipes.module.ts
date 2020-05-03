import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        EditRecipeComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeStartComponent,
        RecipesComponent,
        RecipeItemComponent
    ],
    imports: [
        ReactiveFormsModule,
        RecipesRoutingModule,
        CommonModule,
        SharedModule
    ]
}) 

export class RecipesModule {

}