import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from './../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    editMode: boolean = false;
    editItemIndex: number;
    currentEditItemData: Ingredient;
    @ViewChild('f', { 'static': false }) ingForm: NgForm;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.shoppingListService.editingItem
            .subscribe(
                (index: number) => {
                    this.editMode = true;
                    this.editItemIndex = index;
                    this.currentEditItemData = this.shoppingListService.getIngredient(this.editItemIndex);
                    this.ingForm.setValue({
                        'name': this.currentEditItemData.name,
                        'amount': this.currentEditItemData.amount
                    });
                }
            );
    }

    addIngredients(form: NgForm) {
        const name = form.value.name;
        const amount = form.value.amount;
        const ingredient = new Ingredient(name, amount);
        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editItemIndex, ingredient);
        } else {
            this.shoppingListService.addIngredient(ingredient);
        }
        form.reset();
        this.editMode = false;
    }

    onClear() {
        this.ingForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editItemIndex);
        this.onClear();
    }
}
