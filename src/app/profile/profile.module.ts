import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UtilesModule } from '../utiles/utiles.module';
import { ProfileComponent } from './profile.component';
import { UserRoutingModule } from '../user/user-routing.module';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilesModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
