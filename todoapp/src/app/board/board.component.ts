import { Component, OnInit, TemplateRef } from '@angular/core';
import { Person, Priority, State, Task } from 'src/models/models';
import { enumSelector } from 'src/utils';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public persons: Person[] = [];
  public priorities = enumSelector(Priority);
  public states = enumSelector(State);
  public taskForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
    this.persons = [
      {
        id: "1", title: "person 1", tasks: [
          { id: "1", title: "task 1", description: "desc 1", priority: Priority.Critical, state: State.New },
          { id: "2", title: "task 2", description: "desc 2", priority: Priority.Medium, state: State.Active }
        ]
      },
      {
        id: "2", title: "person 2", tasks: [
          { id: "3", title: "task 3", description: "desc 3", priority: Priority.Critical, state: State.New },
          { id: "4", title: "task 4", description: "desc 4", priority: Priority.Medium, state: State.Active },
          { id: "4", title: "task 5", description: "desc 5", priority: Priority.Low, state: State.Resolved }
        ]
      }
    ];

  }

  public addPerson() {
    this.persons = [...this.persons, { id: "", title: "", tasks: [] }];
    return false;
  }
  public savePerson(person: Person, title:string) {
    person.title = title;
    person.id = this.persons.length.toString();
    return false;
  }
  public addTask(template: TemplateRef<any>, personId: string) {
    const task = { id: "", personId: personId, title: "", description: "", priority: Priority.Critical, state: State.New };
    this.openModal(template, task);
  }

  public openModal(template: TemplateRef<any>, task: Task) {

    this.taskForm = new FormGroup({
      title: new FormControl(task.title),
      description: new FormControl(task.description),
      priority: new FormControl(task.priority),
      state: new FormControl(task.state),
      estimate: new FormControl(task.estimate)
    });

    this.modalRef = this.modalService.show(template);
  }
  public saveTask() {
    console.log(this.taskForm.value);
    return false;
  }
  public removeTask(index: number, person: Person) {
    person.tasks.splice(index, 1);
    person.tasks = [...person.tasks];
    return false;
  }
  public removePerson(index: number) {
    this.persons.splice(index, 1);
    this.persons = [...this.persons];
    return false;
  }
}
