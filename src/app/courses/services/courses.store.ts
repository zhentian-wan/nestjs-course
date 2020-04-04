/*
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError, Observable } from "rxjs";
import { Course } from "../../../../shared/course";
import { HttpClient } from "@angular/common/http";
import { map, catchError, tap, shareReplay } from "rxjs/operators";
import { MessagesService } from "./messages.service";

@Injectable({
  providedIn: "root",
})
export class CourseStore {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$ = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessagesService,
    private loadingService: LoadingService
  ) {}

  loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>("/api/courses").pipe(
      map((response) => response["payload"]),
      catchError((err) => {
        console.error(err);
        const message = "Cannot load courses";
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      tap((courses) => this.subject.next(courses))
    );
    //this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    const oldCourses = this.subject.getValue();
    const index = oldCourses.findIndex((c) => c.id === courseId);
    const newCourse: Course = {
      ...oldCourses[index],
      ...changes,
    };
    const newCourses: Course[] = oldCourses.slice(0);
    newCourses[index] = newCourse;

    this.subject.next(newCourses);

    this.http.put(`/api/courses${courseId}`, changes).pipe(
      catchError((err) => {
        console.error(err);
        const message = "Cannot save the course";
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }
}
*/
