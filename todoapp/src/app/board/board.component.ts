import { Component, OnInit, TemplateRef } from '@angular/core';
import { Person, Priority, State, Task } from 'src/models/models';
import { enumSelector } from 'src/utils';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { RemoveTaskAction, SaveTaskAction, SetActivePersonIndexAction } from '../app.action';
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
  modalRef: BsModalRef;

  constructor(private store: Store<AppState>, private modalService: BsModalService) {}

  ngOnInit() {
    this.persons$ = this.store.select(s => s.persons);
    this.activePersonIndex$ = this.store.select(s => s.activePersonIndex);

  }
  public addPerson() {
    //this.persons = [...this.persons, { id: "", title: "", tasks: [] }];
    return false;
  }
  public savePerson(person: Person, title:string) {
    person.title = title;
    //person.id = this.persons.length.toString();
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
    // this.persons.splice(index, 1);
    // this.persons = [...this.persons];
    return false;
  }
}
