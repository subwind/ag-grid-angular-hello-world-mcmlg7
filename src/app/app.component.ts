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
      this.gridOptions.headerHeight =30;
      this.gridOptions.enableColResize = true;
      //範例1
      this.gridOptionsSample1.rowSelection = 'single';
      this.gridOptionsSample1.rowMultiSelectWithClick = true;
      this.gridOptionsSample1.headerHeight =30;
      //範例2
      this.gridOptionsSample2.rowSelection = 'multiple';
      this.gridOptionsSample2.rowMultiSelectWithClick = true;
      this.gridOptionsSample2.headerHeight =30;
      //範例3
      this.gridOptionsSample3.rowSelection = 'single';
      this.gridOptionsSample3.rowMultiSelectWithClick = true;
      this.gridOptionsSample3.headerHeight =30;
      //範例4
      this.gridOptionsSample4.rowSelection = 'single';
      this.gridOptionsSample4.rowMultiSelectWithClick = true;
      this.gridOptionsSample4.headerHeight =30;
      this.gridOptionsSample4.pagination = true;
      this.gridOptionsSample4.paginationPageSize = 10;
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

      this.createRowData4();
    }

    public createRowData4(){
      let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      let count = 15;
      let rowTemp = [];

      let getRandomInt= (min, max)=> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
      }

      for(let i=0;i<count;i++){
        let temp = {
          no:i+1,
          goodsNo:`${alpha[getRandomInt(0,25)]}${getRandomInt(0,25)}${getRandomInt(0,25)}`,
          goodsCode:`${alpha[getRandomInt(0,25)]}${getRandomInt(0,25)}${getRandomInt(0,25)}`,
          goodsName:`${alpha[getRandomInt(0,25)]}${alpha[getRandomInt(0,25)]}${alpha[getRandomInt(0,25)]}`,
          price:getRandomInt(100,500),
          openStore:`${alpha[getRandomInt(0,25)]}${alpha[getRandomInt(0,25)]}-${alpha[getRandomInt(0,25)]}`,
          sellStore:`${alpha[getRandomInt(0,25)]}${alpha[getRandomInt(0,25)]}-${alpha[getRandomInt(0,25)]}`
        }
        rowTemp.push(temp);
      }
      this.rowData4 = rowTemp;
      
    }

    public reloadData(){
      this.rowData = [
        { make: 'T', model: 'C', price: 35 },
        { make: 'F', model: 'M', price: 32 },
        { make: 'P', model: 'B', price: 72 },
        { make: 'V', model: 'S', price: 82 }
      ]

       this.calculateRowCount();
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
        { headerName:'No.',width: 60, field:'no',sortable:false,cellClass:"grid-cell-centered",headerClass: 'my-css-class', },
        { headerName:'貨物批號',field:'goodsNo',sortable:true, unSortIcon: true},
        { headerName:'商品編號',field:'goodsCode',sortable:true},
        { headerName:'名稱',field:'goodsName',sortable:true},
        { headerName:'金額',field:'price',sortable:true,cellRenderer:this.priceCustom},
        { headerName:'開發店',field:'openStore',sortable:true},
        { headerName:'銷售店',field:'sellStore',sortable:true}
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

    public onReady4(){
      console.log('onReady4');
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

     public onRowSelected4(event){
      console.log(event.node.data,'onRowSelected4');
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

    public priceCustom(param){
      //console.log(param,'priceCustom');
      let data = param.data;
      let price = data.price;
      let text = `<span>$${price}</span>`
      if(price>250){
        text = `<span style='color:red;'>$${price}</span>`
      }
      return text;
    }

}

