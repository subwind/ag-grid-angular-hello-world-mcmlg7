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
4.頁碼(?)
5.排序
6.外部按鈕可以控制grid
7.全選、單選、複選
 */

export class AppComponent  {

    public columnDefs;
    public rowData;
    private gridOptions:GridOptions;
    constructor() {
    }

    ngOnInit(){
      this.gridOptions = <GridOptions>{};
      //this.gridOptions.rowModelType = 'client-side';
      this.createColumnDefs();
      this.createRowData();
      //this.reloadData();
      
    }

    public createRowData(){
      this.rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]
    }

    public reloadData(){
      this.rowData = [
        { make: 'T', model: 'C', price: 35 },
        { make: 'F', model: 'M', price: 32 },
        { make: 'P', model: 'B', price: 72 }
      ]
    }

    public createColumnDefs(){
      this.columnDefs = [
        {headerName: '#',width: 30 ,checkboxSelection: true},
        {field: 'make',sort: 'desc' ,sortable: true },
        {field: 'model',sortable: true,comparator:this.modelComparator},
        {field: 'price',sortable: true}
      ]
    }

    //客製排序
    public modelComparator = (valueA, valueB, nodeA, nodeB, isInverted)=>{
      //console.log(this.rowData);
      //console.log(valueA, valueB, nodeA, nodeB, isInverted);
      this.reloadData();
      return valueA - valueB;
    }

    public calculateRowCount(){
      if(this.gridOptions.api && this.rowData){
        var model = this.gridOptions.api.getModel();
      }
    }

}

