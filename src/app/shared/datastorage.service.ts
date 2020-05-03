import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';

@Injectable() 

export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }
    // headers = new HttpHeaders().append('Autherization', 'authpass');
    headers = new HttpHeaders({'content-type': 'application/json'});
    recipeUrl = 'https://ng-recipe-book-a3988.firebaseio.com/recipes.json';
    
    saveRecipes() {
        const token = this.authService.getToken();
        // return this.http.put(
        //     this.recipeUrl,
        //     this.recipeService.getRecipes(),
        //     {
        //         // observe: 'events',
        //         observe: 'body',
        //         headers: this.headers,
        //         params: new HttpParams().set('auth', token)
        //     }
        // );

        // check the progress
        // remove auth from url because now we are passing it in auth.interceptor
        const req = new HttpRequest('PUT', this.recipeUrl, this.recipeService.getRecipes(), { reportProgress: true });

        return this.http.request(req);

    }

    getRecipes() {
        const token = this.authService.getToken();
        return this.http.get(this.recipeUrl, { headers: this.headers })
            .pipe(map(
                (response: any[]) => {
                    for(let recipe of response) {
                        if (!recipe['ingredients']) {
                            recipe['ingredient'] = [];
                        }
                    }
                    return response;
                }
            ))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes)
                }
            );
    }
}