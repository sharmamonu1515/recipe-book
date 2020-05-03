import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;
    recipeIndex: number;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.recipe = this.recipeService.getRecipe(+params.id - 1);
                this.recipeIndex = +params.id - 1;
            });
    }

    onAddShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    // edit link click
    editRecipe() {
        this.router.navigate([ "../../", "edit", this.recipeIndex], { relativeTo: this.route });
    }

    onDelete() {
        this.recipeService.deleteRecipe(this.recipeIndex);
        this.router.navigate(['/recipes']);
    }

}
