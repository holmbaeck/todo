import { Injectable } from "@angular/core";
import { Http }  from "@angular/http";
import { TodoDTO } from "../models/tododto.model";

@Injectable()
export class TodoService {

    constructor(private http: Http) {

    }

    getAllTodos(): Promise<TodoDTO[]> {
        return this.http.get("/tasks")
        .toPromise()
            .then(response => response.json() as TodoDTO[])
            .catch(TodoService.handleError);
    }

    createTodo(todo: TodoDTO): Promise<TodoDTO> {
        return this.http.post("/tasks", todo)
        .toPromise()
            .then(response => response.json() as TodoDTO)
            .catch(TodoService.handleError);
    }

    updateTodo(todo: TodoDTO) {
        return this.http.put("/tasks/" + todo._id, todo)
        .toPromise()
            .then(response => response.json() as TodoDTO)
            .catch(TodoService.handleError);
    }


    deleteTodo(todo: TodoDTO): Promise<any> {
        return this.http.delete("/tasks/"+ todo._id)
        .toPromise()
            .then()
            .catch(TodoService.handleError);
    }

    private static handleError(error: any): Promise<any> {
        console.error('TodoService failed');
        return Promise.reject(error.message || error);
      }
    
}