import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  CollectionReference
} from "@angular/fire/firestore";
import { Todo } from "../interfaces/todo";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Query } from "@firebase/firestore-types";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;
  private user: User;
  constructor(
    private db: AngularFirestore,
    private authService: AngularFireAuth
  ) {
    this.authService.user.subscribe(value => {
      this.user = value;
      if (this.user) {
        this.todosCollection = this.db.collection<Todo>("todos", ref => {
          return ref.where("userId", "==", this.user.uid);
        });
        const mappedData = this.todosCollection.snapshotChanges().pipe(
          map(actions => {
            console.log(actions);
            return actions.map(({ payload }) => {
              const data = payload.doc.data() as Todo;
              const id = payload.doc.id;
              return { id, ...data };
            });
          })
        );
        this.todos = mappedData;
      }
    });
  }

  addTodo(todo: Todo) {
    if (this.user) {
      if (!todo.userId) {
        todo.userId = this.user.uid;
      }
      return this.todosCollection.add(todo);
    } else {
      return Promise.reject("unauthorized");
    }
  }

  //@TODO implement
  deleteTodo(todo: Todo) {
    const { id } = todo;
    console.log({ todo });
    return this.todosCollection.doc(id).delete();
    // this.todosCollection.doc('collections').ref('we','')
  }

  updateTodo(todo: Todo) {
    const { id } = todo;
    return this.todosCollection.doc(id).set(todo);
  }
  getUserTodos() {
    return this.todos;
  }
}
