import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodoService } from '../services/todo.service';

@NgModule({
  declarations: [
    TodoComponent
  ],
  exports: [
    TodoComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [TodoService],
})
export class TodoModule { }
