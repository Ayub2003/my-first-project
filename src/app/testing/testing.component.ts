import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, Inject,
  inject, OnInit,
  ViewChild
} from '@angular/core';
import {TestService} from "../user/service/test.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {UserAPIService} from "../user/service/user-api.service";
import {combineLatestInit} from "rxjs/internal/observable/combineLatest";
import {LoggerService} from "./services/logger.service";
import {BetterLoggerService} from "./services/better-logger.service";
import {CALLBACK} from "../app.config";
import {GreatingsService} from "./services/greatings.service";

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class TestingComponent implements OnInit{
  constructor(
    public logger: LoggerService,
    betterLogger: BetterLoggerService,
    @Inject(CALLBACK) public callback: CallableFunction,
    public greatingsService: GreatingsService
    ) {
  }

  ngOnInit() {
    console.log(this.greatingsService.getMessage())
  }
}
