import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'action-renderer-root',
  templateUrl: './action-renderer.component.html',
})
export class ActionRendererComponent implements OnInit {
  data: any;
  params: any;
  constructor(private http: HttpClient, private router: Router) {}

  agInit(params: any) {
    this.params = params;
    this.data = params.value;
  }

  ngOnInit() {}

  editRow() {
    let rowData = this.params;
    // let i = rowData.rowIndex;
    console.log(rowData);
  }

  viewRow() {
    let rowData = this.params;
    console.log(rowData);
  }
}
