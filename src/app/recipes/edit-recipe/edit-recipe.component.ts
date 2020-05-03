import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

    editRecipeId: number;
    editMode = false;
    recipeForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe( (params: Params) => {
                this.editRecipeId = +params.id;
                this.editMode = params.id != null;
                this.initForm();
            });
    }

    private initForm() {

        let recipeName = '';
        let imagePath = '';
        let description = '';
        let ingredients = new FormArray([]);

        // get the recipe data if editMode so that we can update
        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.editRecipeId);
            recipeName = recipe.name;
            imagePath = recipe.imagePath;
            description = recipe.description;
            if (recipe.ingredients) {
                for (let ing of recipe.ingredients) {
                    ingredients.push(
                        new FormGroup({
                            'name': new FormControl(ing.name, Validators.required),
                            'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
                        })
                    )
                }
            }
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(imagePath, Validators.required),
            'description': new FormControl(description, Validators.required),
            'ingredients': ingredients
        });

    }

    getIngredientFormArrayControls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onSubmit() {
        
        // const recipe = new Recipe(
        //     this.recipeForm.value.name,
        //     this.recipeForm.value.imagePath,
        //     this.recipeForm.value.description,
        //     this.recipeForm.value.ingredients
        // );

        if (this.editMode) {
            this.recipeService.updateRecipe(this.editRecipeId, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }

        this.onCancel();
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        );
    }

    onDeleteIngredient(i: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
    }

    onCancel() {
        if (this.editMode) {
            this.router.navigate(['../../view/', this.editRecipeId+1], {relativeTo: this.route});
        } else {
            this.router.navigate(['/']);
        }
    }
}
