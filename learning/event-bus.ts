import _ from "lodash";

interface Lesson {
  id: string;
}

export interface Observer {
  next(data: any);
}
export interface Observable {
  subscribe(obs: Observer);
  unsubscribe(obs: Observer);
}

interface Subject extends Observer, Observable {}

class SubjectImplementation implements Subject {
  private observers: Observer[] = [];

  next(data: any) {
    this.observers.forEach((obs) => obs.next(data));
  }

  subscribe(obs: Observer) {
    this.observers.push(obs);
  }

  unsubscribe(obs: Observer) {
    _.remove(this.observers, (el) => el === obs);
  }
}

const lessonSubject = new SubjectImplementation();

export const lessonsLists$: Observable = {
  subscribe(obs) {
    lessonSubject.subscribe(obs);
    obs.next(lessons);
  },
  unsubscribe(obs) {
    lessonSubject.unsubscribe(obs);
  },
};

let lessons: Lesson[] = [];

export function initializeLessonsList(newList: Lesson[]) {
  lessons = _.cloneDeep(newList);
  lessonSubject.next(lessons);
}

class DataStore implements Observable {
  private lessons: Lesson[] = [];

  private lessonsSubject = new SubjectImplementation();

  subscribe(obs) {
    this.lessonsSubject.subscribe(obs);
    obs.next(lessons);
  }

  unsubscribe(obs) {
    this.lessonsSubject.unsubscribe(obs);
  }

  initializeLessonsList(newList: Lesson[]) {
    this.lessons = _.cloneDeep(newList);
    this.broadcast();
  }

  addLessons(newLessons) {
    this.lessons.push(_.cloneDeep(newLessons));
    this.broadcast();
  }

  broadcast() {
    this.lessonsSubject.next(_.cloneDeep(this.lessons));
  }
}

export const store = new DataStore();
