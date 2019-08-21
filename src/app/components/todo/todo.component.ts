import { Component, OnInit, OnDestroy } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "src/app/interfaces/todo";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit, OnDestroy {
  todos: Todo[];
  loading = true;
  todo: Todo = { done: false, title: "", userId: "" };
  private subscription: Subscription;
  constructor(
    private todoService: TodoService,
    private matSnack: MatSnackBar
  ) {}

  async ngOnInit() {
    console.log("init");
    const observable = await this.todoService.getUserTodos();

    this.subscription = observable.subscribe(value => {
      console.log(value);
      if (value) {
        this.todos = value;
        this.loading = false;
      }
    });
  }

  async ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  async addTodo($event) {
    $event.preventDefault();
    try {
      await this.todoService.addTodo(this.todo);
      this.todo.title = "";
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

  async toggleTodo($event, todo: Todo) {
    //todo.done = !todo.done;
    try {
      await this.todoService.updateTodo(todo);
      this.matSnack.open("toggled todo", null, { duration: 4000 });
    } catch (e) {
      this.matSnack.open(e.message, null, { duration: 4000 });
    }
  }
}
