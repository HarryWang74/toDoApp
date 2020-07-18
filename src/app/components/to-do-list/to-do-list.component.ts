import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { ToDo } from './../../models/todo';
import { MatIconModule} from '@angular/material';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
    private addToDoListener: any;
    private updateToDoListener: any;
    private deleteToDoListener: any;
    today: Date = new Date();
    public loadingToDoList: boolean;
    public toDoList: ToDo[];
    public sorting: boolean = false;

  constructor(
    private toDoService: ToDoService
  ) { }

  ngOnInit() {
    this.loadData();
    // this.setupSubscriptions();
  }

  ngOnDestroy() {
    // this.removeSubscriptions();
  }

  loadData() {
      this.loadingToDoList = true;
      this.toDoService.getToDoList().subscribe(
        (data:ToDo[]) => {
          this.toDoList = data;
          console.log(this.toDoList);
          this.loadingToDoList = false;
        }
      );
  }
/*
toDoTrackElement(index: number, element: any) {
    return element ? 'toDo' + element.id : null;
}

toggleToDoComplete(e, toDo: ToDo) {
    e.stopPropagation();
    e.preventDefault();
    if (toDo.saving) return;

    toDo.saving = true;
    this._toDoService.toggleComplete(toDo.id, !toDo.completed).subscribe(
        result => {
            toDo.saving = false;
            toDo.completed = result.completed;
            this.sortingAnimation();
            this.toDoList = this._toDoService.sortToDoList(this.toDoList);
            this._applicationMessageService.publish('TODO_LIST_UPDATE_TODO', result);
        },
        error => {
            toDo.saving = false;
            this._applicationMessageService.publish('notification-show-error', { message: error.error.message });
        }
    );
}

setupSubscriptions() {
    this.addToDoListener = this._applicationMessageService.subscribe('TODO_LIST_ADD_TODO', (params) => {
        this.sortingAnimation();
        this.toDoList.unshift(params.toDo);
        this.toDoList = this._toDoService.sortToDoList(this.toDoList);
    });
    this.updateToDoListener = this._applicationMessageService.subscribe('FIND_UPDATED_TODO_FROM_LIST', (params) => {
        let updatedToDo = this.toDoList.find(toDo => toDo.id === params.toDo.id);
        if (updatedToDo != null) {
            this.sortingAnimation();
            let updatedIndex = this.toDoList.indexOf(updatedToDo);
            this.toDoList[updatedIndex] = params.toDo;
            this.toDoList = this._toDoService.sortToDoList(this.toDoList);
        }
    }); 
    this.deleteToDoListener = this._applicationMessageService.subscribe('REMOVE_DELETED_TODO_FROM_LIST', (params) => {
        let deletedToDo = this.toDoList.find(toDo => toDo.id === params.toDo.id);
        if (deletedToDo != null) {
            this.sortingAnimation();
            let deletedIndex = this.toDoList.indexOf(deletedToDo);
            if (deletedIndex >= 0) {
                this.toDoList.splice(deletedIndex, 1);
            }
            this.toDoList = this._toDoService.sortToDoList(this.toDoList);
            this._applicationMessageService.publish('TODO_LIST_UPDATE_TODO', deletedToDo);
        }
    }); 
}

removeSubscriptions() {
    if (this.addToDoListener) {
        this.addToDoListener.remove();
    }
    if(this.updateToDoListener) {
        this.addToDoListener.remove();
    }
    if (this.deleteToDoListener) {
        this.deleteToDoListener.remove();
    }
}

editTodo(toDo: ToDo) {
    this._applicationMessageService.publish('EDIT_TODO', { toDo: toDo });
}

sortingAnimation() {
    this.sorting = true;
    setTimeout(() => {
        this.sorting = false;
    }, 1000);
}*/

}
