import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Nombre del producto'
      },
      description: {
        title: 'Descripcion'
      },
      price: {
        title: 'Precio'
      },
      quantity: {
        title: 'Cantidad'
      },
      category: {
        title: 'Categoria'
      },
    }
  };

  data:any;
  constructor(private productsService:ProductService){}
  object:any;
 ngOnInit(){
  this.productsService.getProducts().subscribe(res=>{
    console.log("productos:",res);
    this.data=res;
  })
 }
 onDeleteConfirm(event:any): void {
  if (window.confirm('Are you sure you want to delete?')) {
    event.confirm.resolve();
    let index = this.data.indexOf(event.data);
    var selectedrow= this.data[index];
    this.productsService.deleteProduct(selectedrow.idProduct)
    .subscribe(
      res=>{
        console.log(res);
      },
      err=>console.error(err)
    )
  } else {
    event.confirm.reject();
  }
}

onCreateConfirm(event:any):void { 
  if (window.confirm('Are you sure you want to create?')) {
    event.confirm.resolve(event.newData);
     var newregistry = event.newData;
     console.log(newregistry);
    this.productsService.saveProduct(newregistry)
  .subscribe(
    res => {
      this.ngOnInit();
      console.log(res);
    },
    err => console.error(err)
  )
  } else {
    event.confirm.reject();
  }
} 

onUpdateConfirm(event:any):void {
  if (window.confirm('Are you sure you want to save?')) {
    event.confirm.resolve(event.newData);
    var newrow=event.newData;
    this.object= new Product;
    var id=newrow.idProduct;
    this.object.category=newrow.category;
    this.object.description=newrow.description;
    this.object.name=newrow.name;
    this.object.price=newrow.price;
    this.object.quantity=newrow.quantity;
    console.log("hola",newrow.idProduct,this.object)
    this.productsService.updateProduct(newrow.idProduct,this.object)
    .subscribe(
    res =>{
      console.log(event.newData,'LOGPUT');
      this.ngOnInit();
      console.log(res);
    },
    err => console.error(err)
  )
  } else {
    event.confirm.reject();
  }
}
}
