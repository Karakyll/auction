import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category/category.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private categoryService:CategoryService) { }

  ngOnInit() {
  }

  clickCategories() {
    this.categoryService.toggle();
  }

}
