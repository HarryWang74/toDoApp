import { Component, OnInit } from '@angular/core';
import { ToDo } from './../../models/todo';
import { ToDoService } from '../../services/to-do.service';
import { ApplicationMessageService } from '../../services/applicationMessage.service';

@Component({
  selector: 'to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.scss']
})
export class ToDoDetailComponent implements OnInit {
	toDo: ToDo;
	updateing: boolean;
	editListener: any;
	updateListener: any;
	deleteListener: any;
	toggleToDoCompleteListener: any;

	constructor(
		private toDoService: ToDoService,
		private applicationMessageService: ApplicationMessageService
	) { }

	ngOnInit() {
		this.setupSubscriptions();
	}

	ngOnDestroy() {
		this.removeSubscriptions();
	}

	setupSubscriptions() {
		this.editListener = this.applicationMessageService.subscribe('EDIT_TODO', (params) => {
		this.toDo = Object.assign(new ToDo(), params.toDo);
	});
    /*
		this.updateListener = this.applicationMessageService.subscribe('UPDATE_TODO', (params) => {
			this.updateToDo();
		});
		this.toggleToDoCompleteListener = this.applicationMessageService.subscribe('TOGGLE_TODO_COMPLETE', (params) => {
			this.toggleToDoComplete();
		});
	
		this.deleteListener = this.applicationMessageService.subscribe('DELETE_TODO', (params) => {
			this.deleteToDo();
    });
    */
  }
  
	removeSubscriptions() {
		if (this.editListener) {
			this.editListener.remove();
		}
		if (this.updateListener) {
			this.updateListener.remove();
		}
		if (this.deleteListener) {
			this.deleteListener.remove();
		}
	}

	updateToDo() {
		this.updateing = true;
		this.toDoService.updateToDo(this.toDo).subscribe(
			(result: ToDo) => {
				console.log(result);
				this.updateing = false;
				this.toDo = null;
				this.applicationMessageService.publish('FIND_UPDATED_TODO_FROM_LIST', { toDo: result });
			},
		)
	}
  
  /*
  deleteToDo() {
		this.updateing = true;
		this.toDoService.deleteToDo(this.toDo).subscribe(
			(result: ToDo) => {
				this.updateing = false;
				this._applicationMessageService.publish('REMOVE_DELETED_TODO_FROM_LIST', { toDo: result });
			},
			(error) => {
				this.updateing = false;
				this._applicationMessageService.publish('notification-show-error', { message: error.error.message });
			}
		)
  }
  */
}
