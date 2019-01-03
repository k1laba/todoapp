import { Component, OnInit, TemplateRef } from '@angular/core';
import { Person, Priority, State, Task } from 'src/models/models';
import { enumSelector } from 'src/utils';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { RemoveTaskAction, SaveTaskAction, SetActivePersonIndexAction, AddPersonAction, RemovePersonAction, SavePersonAction } from '../app.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  activePersonIndex$: Observable<number>;
  persons$: Observable<Person[]>;
  public priorities = enumSelector(Priority);
  public states = enumSelector(State);
  public taskForm: FormGroup;
  public oldName: string;
  modalRef: BsModalRef;

  constructor(private store: Store<AppState>, private modalService: BsModalService) {}

  ngOnInit() {
    this.persons$ = this.store.select(s => s.persons);
    this.activePersonIndex$ = this.store.select(s => s.activePersonIndex);

  }
  public addPerson() {
    this.store.dispatch(new AddPersonAction(""));
    return false;
  }
  public savePerson(title:string, personIndex: number) {
    this.store.dispatch(new SavePersonAction({title: title, personIndex: personIndex }));
    return false;
  }
  public addTask(template: TemplateRef<any>, personIndex: number) {
    this.openModal(template, {}, personIndex);
  }

  public openModal(template: TemplateRef<any>, task: Task, personIndex: number) {

    this.store.dispatch(new SetActivePersonIndexAction(personIndex));
    this.taskForm = new FormGroup({
      id: new FormControl(task.id),
      title: new FormControl(task.title),
      description: new FormControl(task.description),
      priority: new FormControl(task.priority || 0),
      state: new FormControl(task.state || 0),
      estimate: new FormControl(task.estimate)
    });

    this.modalRef = this.modalService.show(template);
  }
  public saveTask() {
    const task = this.taskForm.value;
    this.store.dispatch(new SaveTaskAction({ task: task }));
    this.modalRef.hide();
    return false;
  }
  public removeTask(taskIndex: number, personIndex: number) {
    this.store.dispatch(new RemoveTaskAction({taskIndex: taskIndex, personIndex: personIndex}));
    return false;
  }
  public removePerson(index: number) {
    this.store.dispatch(new RemovePersonAction(index));
    return false;
  }
}
