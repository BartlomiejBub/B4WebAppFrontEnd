import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from '../usersManagment/user.component';
import { HomeComponent } from '../HomeManagment/home.component';
import { RegisterComponent} from '../registerManagment/register.component'
import { AddProductComponent } from '../dietManagment/dietAddProductComponent/addProduct.component';
import { ViewProductsComponent } from '../dietManagment/dietViewProductsComponent/viewProducts.component';
import { DietComponent } from '../dietManagment/diet.component';
import { ViewCreatedProductsComponent } from '../dietManagment/dietViewCreatedProductsComponent/dietViewCreatedProductsComponent';

export const routes: Routes = [
    { path: 'admin', component: UserComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
{ 
        path: 'diet', component: DietComponent, 
        children: [
            { path: '', redirectTo: 'view', pathMatch: 'full' }, 
            { path: 'view', component: ViewProductsComponent },
            { path: 'add', component: AddProductComponent },
            { path: 'created', component: ViewCreatedProductsComponent }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
