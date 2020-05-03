import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    editingItem = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Meat', 10),
        new Ingredient('Bread', 2)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientIsChanged();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientIsChanged();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientIsChanged();
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientIsChanged();
    }

    ingredientIsChanged() {
        this.ingredientsChanged.next(
            this.ingredients.slice()
        );
    }
}