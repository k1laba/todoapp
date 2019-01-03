import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule, ButtonsModule, ModalModule, BsDatepickerModule  } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    AccordionModule.forRoot(), ButtonsModule.forRoot(), 
    ModalModule.forRoot(), BsDatepickerModule.forRoot(),
    StoreModule.forRoot(null, { reducerFactory: () => rootReducer}),
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
