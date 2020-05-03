import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/datastorage.service';
import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    constructor(
        private dataStorageService: DataStorageService,
        public authService: AuthService
    ) { }

    onSaveRecipes() {
        this.dataStorageService.saveRecipes()
            .subscribe(
                (res) => console.log(res)
            );
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
}