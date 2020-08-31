import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./features/core/services/auth.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
