import { Component,OnInit } from '@angular/core';
import {GridOptions} from "ag-grid/main";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

/**
1.每頁顯示筆數
2.可切換每頁顯示筆數
3.上下頁
4.排序
5.外部按鈕可以控制grid
6.全選、單選、複選
 */

export class AppComponent  {

    public columnDefs;
    public rowData;
    private gridOptions:GridOptions
    constructor() {
    }

    ngOnInit(){
      this.gridOptions = <GridOptions>{};
      this.createColumnDefs();
      this.createRowData();
      
    }

    public createColumnDefs(){
      this.columnDefs = [
        {headerName: '#',width: 30 ,checkboxSelection: true},
        {field: 'make',suppressSorting: true },
        {field: 'model' },
        {field: 'price'}
      ]
    }

    public createRowData(){
      this.rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]
    }

}