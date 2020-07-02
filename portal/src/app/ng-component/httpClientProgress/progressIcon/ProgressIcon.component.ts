import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClientInterceptorService } from '../services/httpInteceptor.service';

@Component({
  selector: 'http-loader',
  templateUrl: './progression.component.html'
  })
export class ProgressIconComponent implements OnInit {

  show = false;

  private subscription: Subscription;

  constructor(
    private httpService: HttpClientInterceptorService,private ref:ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.httpService.pendingRequestsStatus
      .subscribe((state) => {
        this.show = state;
        this.ref.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}