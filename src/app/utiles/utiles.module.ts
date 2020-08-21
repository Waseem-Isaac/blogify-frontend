import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppInterceptor } from './app.interceptor';
import { PostFormComponent } from '../posts/post-form/post-form.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipDirective } from './directives/tooltip.directive';
import { SideFilterComponent } from './components/side-filter/side-filter.component';
@NgModule({
    imports: [
        CommonModule,
        NgbModalModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        SpinnerComponent,
        PostFormComponent,
        TooltipDirective,
        SideFilterComponent
    ],
    declarations: [
        HeaderComponent,
        SpinnerComponent,
        PostFormComponent,
        TooltipDirective,
        SideFilterComponent
    ],
    entryComponents: [PostFormComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    ],
})
export class UtilesModule { }
