import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /management page
 */
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  /**
   * Constructor for Management component
   * @param {TranslateService} translate
   */
  constructor(private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
  }

}
