import { Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "src/app/interfaces/todo";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  loading = true;
  todo: Todo = { done: false, title: "", userId: "" };
  constructor(
    private todoService: TodoService,
    private matSnack: MatSnackBar
  ) {}

  async ngOnInit() {
    console.log("init");
    const observable = await this.todoService.getUserTodos();
    observable.subscribe(value => {
      console.log(value);
      if (value) {
        this.todos = value;
        this.loading = false;
      }
    });
  }

  async addTodo($event) {
    $event.preventDefault();
    try {
      const response = await this.todoService.addTodo(this.todo);
      console.log({ response });
      this.matSnack.open("Added todo", null, { duration: 4000 });
    } catch (e) {
      this.matSnack.open(e.message, null, { duration: 4000 });
    }
  }

  async deleteTodo($event, todo: Todo) {
    try {
      await this.todoService.deleteTodo(todo);
      this.matSnack.open("deleted todo", null, { duration: 4000 });
    } catch (e) {
      this.matSnack.open(e.message, null, { duration: 4000 });
    }
  }
}
