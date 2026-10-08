import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './auth.guard';
import { UserComponent } from '../usersManagement/user.component';
import { HomeComponent } from '../homeManagement/home.component';
import { RegisterComponent} from '../registerManagement/register.component'
import { AddProductComponent } from '../dietManagement/dietAddProductComponent/addProduct.component';
import { ViewProductsComponent } from '../dietManagement/dietViewProductsComponent/viewProducts.component';
import { DietComponent } from '../dietManagement/diet.component';
import { ViewCreatedProductsComponent } from '../dietManagement/dietViewCreatedProductsComponent/viewCreatedProducts.component';
import { RecipeViewComponent } from '../dietManagement/recipeViewComponent/recipeView.component';
import { DietGoalsComponent } from '../dietManagement/dietGoalsComponent/dietGoals.component';

/* Important file - all routes are defined here below*/
export const routes: Routes = [
    { path: 'admin', component: UserComponent, canActivate: [adminGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
{ 
        path: 'diet', component: DietComponent, canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'view', pathMatch: 'full' }, 
            { path: 'view', component: ViewProductsComponent },
            { path: 'add', component: AddProductComponent },
            { path: 'created', component: ViewCreatedProductsComponent },
            { path: 'recipes', component: RecipeViewComponent },
            { path: 'goals', component: DietGoalsComponent }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
