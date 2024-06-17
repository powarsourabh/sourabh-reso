import { Injectable } from '@angular/core';
export interface Item {
  id: number;
  name: string;
  role: string;
  email: string;
  
}
  


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private localStorageKey = 'myData';

  private data: Item[] 
 
  


  
  getData() {
    return this.data;
  }

  addData(item: Item) {
    this.data.push(item);
    this.saveData();

  }

  private saveData(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
  }

  updateData(item: Item) {
    const index = this.data.findIndex(d => d.id === item.id);
    if (index !== -1) {
      this.data[index] = item;
    }
    this.saveData();
  }

  deleteData(id: number) {
    this.data = this.data.filter(item => item.id !== id);
    this.saveData();
  }
  constructor() {    this.data = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }
}
