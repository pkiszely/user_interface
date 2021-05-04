import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UserModule { }
