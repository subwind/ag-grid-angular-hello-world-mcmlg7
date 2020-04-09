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

    public gridOptions:GridOptions;//測試用
    public gridOptionsSample1:GridOptions;//單選範例-有checkbox
    public gridOptionsSample2:GridOptions;//多選範例-有checkbox
    public gridOptionsSample3:GridOptions;//單選範例-無checkbox
    public gridOptionsSample4:GridOptions;//有換頁選單
    public columnDefs;
    public columnDefs1;
    public columnDefs2;
    public columnDefs3;
    public columnDefs4;
    public rowData;
    public rowData1;
    public rowData2;
    public rowData3;
    public rowData4;
    public rowCount:string ='';
    public selData =[];

    constructor() {
    }

    ngOnInit(){
      this.gridOptions = <GridOptions>{};
      this.gridOptionsSample1 = <GridOptions>{};
      this.gridOptionsSample2 = <GridOptions>{};
      this.gridOptionsSample3 = <GridOptions>{};
      this.gridOptionsSample4 = <GridOptions>{};


      //this.gridOptions.pagination = true;
      //this.gridOptions.paginationPageSize = 10;
      this.gridOptions.rowSelection = 'multiple';
      this.gridOptions.rowMultiSelectWithClick = true;
      //範例1
      this.gridOptionsSample1.rowSelection = 'single';
      this.gridOptionsSample1.rowMultiSelectWithClick = true;
      //範例2
      this.gridOptionsSample2.rowSelection = 'multiple';
      this.gridOptionsSample2.rowMultiSelectWithClick = true;
      //範例3
      this.gridOptionsSample3.rowSelection = 'single';
      this.gridOptionsSample3.rowMultiSelectWithClick = true;
      //範例4
      this.gridOptionsSample4.rowSelection = 'single';
      this.gridOptionsSample4.rowMultiSelectWithClick = true;

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

      this.rowData1 =[
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]

      this.rowData2 =[
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]

      this.rowData3 =[
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

      this.columnDefs1 = [
        {headerName:'#',width:30,checkboxSelection:true},
        {field: 'make',sort: 'desc' ,sortable: true },
        {field: 'model',sortable: true},
        {field: 'price',sortable: true}
      ]

      this.columnDefs2 = [
        {headerName:'#',width:30,checkboxSelection:true},
        {field: 'make',sort: 'desc' ,sortable: true },
        {field: 'model',sortable: true},
        {field: 'price',sortable: true}
      ]

      this.columnDefs3 = [
        {field: 'make',sort: 'desc' ,sortable: true },
        {field: 'model',sortable: true},
        {field: 'price',sortable: true}
      ]

      this.columnDefs4 = [
        { headerName:'No.', field:'no',sortable:false },
        { headerName:'貨物批號',field:'goodsNo',sortable:true},
        { headerName:'商品編號',field:'goodsCode',sortable:true},
        { headerName:'名稱',field:'goodsName',sortable:true},
        { headerName:'開發店',field:'openStore',sortable:true},
        { headerName:'銷售店',field:'sellStore',sortable:true}ㄝ
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

    public onReady1(){
      console.log('onReady1');
    }

    public onReady2(){
      console.log('onReady2');
    }

    public onReady3(){
      console.log('onReady3');
    }

    public onRowSelected(event){
        console.log(event.node);
        console.log(event.node.gridApi.getSelectedRows());
        let selectData = event.node.gridApi.getSelectedRows();
        let selectNode = event.node.gridApi.getSelectedNodes();
        console.log(selectNode)
        let selectionCounts  = selectData.length;
        let selectionNodeCounts = selectNode.length;
        // if (selectionCounts > 2) {
        //   selectData.forEach((item,index)=>{
        //     if(item.make==event.node.data.make){
        //       this.gridOptions.api.deselectIndex(index, true); // This works!
        //       console.log(index,'lastIndex');
        //     }
        //   })
        //   //this.gridOptions.api.deselectIndex(lastIndex, true); // This works!
        // }
        if(selectionCounts>2){
          selectData.forEach((item,index)=>{
            if(item.make==event.node.data.make){
                var oldestNode = this.gridOptions.api.getSelectedNodes()[index]; // get the first node, to be popped out
                oldestNode.setSelected(false);
            }
          })
        }

        //console.log(this.gridOptions)
    }

    public onRowSelected1(event){
      console.log(event.node.data,'onRowSelected1');
    }

    public onRowSelected2(event){
      console.log(event.node.data,'onRowSelected2');
    }

    public onRowSelected3(event){
      console.log(event.node.data,'onRowSelected3');
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

