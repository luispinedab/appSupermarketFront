import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get(`${this.API_URI}/products`);
  }
  updateProduct(id: string|number,updatedProduct: Product): Observable<any>{
    return this.http.put(`${this.API_URI}/products/${id}`,updatedProduct);
  }
  saveProduct(product:Product){
    return this.http.post(`${this.API_URI}/products`,product);
  }
  deleteProduct(id: string|number){
    return this.http.delete(`${this.API_URI}/products/${id}`)
  }
}
