import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs'

@Injectable()

export class RecipeService {

    recipeChanged = new Subject();

    private recipes: Recipe[] = [
        new Recipe(
            'Sandwich',
            'Home made sandwich',
            'https://newks.com/wp-content/uploads/2017/05/8451_2371_FarmersMarket_1200px.png',
            [
            new Ingredient('Bread', 2),
            new Ingredient('Patato', 2)
            ]
        ),
        new Recipe(
            'Pizza',
            'A delicious Pizza recipe',
            'https://www.simplyrecipes.com/wp-content/uploads/2007/01/homemade-pizza-horiz-a-1200.jpg',
            [
                new Ingredient('Tamatoes', 2),
                new Ingredient('Sauce', 1),
                new Ingredient('Capcicum', 1)
            ]
        ),
    ];

    constructor(
        private shoppingListService: ShoppingListService,
    ) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}