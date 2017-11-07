import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AppModel } from '../app.component';
import { TodoService } from '../services/todo.service';
import { TodoDTO } from '../models/tododto.model';

@Component({
  selector: 'fop-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input()
  appModel: AppModel;
  newTodo: TodoDTO;
  todos: TodoDTO[];

  constructor(private todoService: TodoService) {
    this.newTodo = new TodoDTO();
    this.todos = [];
  }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.todoService.getAllTodos().then(response => this.todos = response);
  }

  markDone(todo: TodoDTO) {
    this.mark(todo, 'DONE');
  }

  markOpen(todo: TodoDTO) {
    this.mark(todo, 'OPEN');
  }

  mark(todo: TodoDTO, state: string) {
    todo.state = state;
    this.todoService.updateTodo(todo).then(response => {
      this.getTodos();
    })
  }

  createTodo() {
    this.newTodo.state = "OPEN";
    this.todoService.createTodo(this.newTodo).then(response => {
      this.getTodos();
      this.newTodo = new TodoDTO();
    });
  }

  deleteTodo(todo: TodoDTO) {
    this.todoService.deleteTodo(todo).then(response => {
      this.getTodos();
    });
  }


}

