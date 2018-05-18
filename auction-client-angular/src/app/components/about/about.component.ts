import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

/**
 * Component view /about page
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  /**
   * Constructor for About component
   * @param {TranslateService} translate - translate service
   */
  constructor(private translate: TranslateService) {
  }

  /**
   * Run when component initialize
   */
  ngOnInit() {
  }

}
