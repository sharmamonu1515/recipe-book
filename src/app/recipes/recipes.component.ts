import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
   
    // selectedRecipe: Recipe;

    constructor(private recipeService: RecipeService) { }
    
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        // this.recipeService.recipeSelected
        //     .subscribe(
        //         (recipe: Recipe) => {
        //             this.selectedRecipe = recipe;
        //         });
    }
}