import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { ToDo } from './../../models/todo';
import { ApplicationMessageService } from '../../services/applicationMessage.service';
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
    private toDoService: ToDoService,
    private applicationMessageService: ApplicationMessageService
  ) { }

  ngOnInit() {
    this.loadData();
    this.setupSubscriptions();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  loadData() {
      this.loadingToDoList = true;
      this.toDoService.getToDoList().subscribe(
        (data:ToDo[]) => {
          this.toDoList = data;
          this.loadingToDoList = false;
        }
      );
  }

  toDoTrackElement(index: number, element: any) {
    return element ? 'toDo' + element.id : null;
  }

  setupSubscriptions() {
    this.addToDoListener = this.applicationMessageService.subscribe('TODO_LIST_ADD_TODO', (params) => {
        this.toDoList.unshift(params.toDo);
        this.toDoList = this.toDoService.sortToDoList(this.toDoList);
    });
    this.updateToDoListener = this.applicationMessageService.subscribe('FIND_UPDATED_TODO_FROM_LIST', (params) => {
      let updatedToDo = this.toDoList.find(toDo => toDo.id === params.toDo.id);
      if (updatedToDo != null) {
   
          let updatedIndex = this.toDoList.indexOf(updatedToDo);
          this.toDoList[updatedIndex] = params.toDo;
          this.toDoList = this.toDoService.sortToDoList(this.toDoList);
      }
    }); 
    /*

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
    */ 
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
    this.applicationMessageService.publish('EDIT_TODO', { toDo: toDo });
  }
/*


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







*/

}
