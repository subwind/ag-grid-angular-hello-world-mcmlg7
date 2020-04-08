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
5.排序v
6.外部按鈕可以控制grid
7.全選、單選、複選
8.客製樣式
9.取值
 */

export class AppComponent  {

    private gridOptions:GridOptions;
    public columnDefs;
    public rowData;
    public rowCount:string ='';
    public selData =[];

    constructor() {
    }

    ngOnInit(){
      this.gridOptions = <GridOptions>{};

      //this.gridOptions.pagination = true;
      //this.gridOptions.paginationPageSize = 10;
      this.gridOptions.isRowSelectable = ()=>{
        return true;
      }
      this.gridOptions.rowSelection = 'multiple';
      this.gridOptions.rowMultiSelectWithClick = true;
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
        { make: 'P', model: 'B', price: 72 },
        { make: 'V', model: 'S', price: 82 }
      ]
    }

    public createColumnDefs(){
      this.columnDefs = [
        /*{headerName: '#',width: 30 ,checkboxSelection: true, headerCheckboxSelection: true,
         headerCheckboxSelectionFilteredOnly: true},*/
        //{headerName: '#',width: 30 ,checkboxSelection: true},
        {headerName:'#',width:30,checkboxSelection:true},
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

    public onReady() {
        console.log('onReady');
        this.calculateRowCount();
    }

    public onRowSelected(event){
        console.log(event.node);
        console.log(event.node.gridApi.getSelectedRows());
        let selectData = event.node.gridApi.getSelectedRows();
        let selectionCounts  = selectData.length;
        if (selectionCounts > 2) {
          let lastIndex = 0;
          selectData.forEach((item,index)=>{
            if(item.make==event.node.data.mark){
              lastIndex = index;
            }
          })
          this.gridOptions.api.deselectIndex(lastIndex, true); // This works!
        }
        //console.log(this.gridOptions)
    }

    public calculateRowCount(){
      if(this.gridOptions.api && this.rowData){
        let model = this.gridOptions.api.getModel();
        let totalRows = this.rowData.length;
        let processedRows = model.getRowCount();
        console.log(totalRows,processedRows)
        this.rowCount = `第 1 到 ${processedRows} 筆, 共 ${processedRows}筆`
      }
    }

    public headerCheckboxSelection = (param)=>{
      console.log(param,'param');
      return true;
    }

}

