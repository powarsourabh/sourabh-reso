import { Component } from '@angular/core';
import { DataService, Item} from './data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';


  
  data: Item[] = [];
  filteredData: Item[] = [];

   newItem: Item = { id: 0, name: '',  role:'', email:''};
  editMode = false;
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 10;
Math: any;
showForm = false;

  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
    // this.Data = this.dataService.getData();

    this.filteredData = this.data;
    this.filteredData = [...this.data]; 


  }


  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.editMode = false; // Reset edit mode when hiding the form
      this.newItem = { id: 0, name: '', role:'', email:'' }; // Reset the newItem
    }
  }

  addItem() {
    if (this.editMode) {
      this.dataService.updateData(this.newItem);
      this.editMode = false;
    } else {
      this.newItem.id = this.data.length > 0 ? Math.max(...this.data.map(item => item.id || 0)) + 1 : 1;
      this.dataService.addData(this.newItem);
    }
    this.newItem = { id:0, name: '', role:'', email:'' };
    this.data = this.dataService.getData(); 
    this.applyFilter();
    this.toggleForm();

  }

  editItem(item: Item) {
    this.newItem = { ...item };
    this.editMode = true;
    this.showForm = true; // Show the form when editing

  }

  deleteItem(id:number) {
    this.dataService.deleteData(id);
    this.data = this.dataService.getData();  
    this.applyFilter();

  }

  
  
  applyFilter(): void {
    if (!this.searchQuery) {
      this.filteredData = this.data;
      this.paginatedData;  // Update paginatedData
      this.currentPage = 1;  // Reset to first page
      return;
    }
  
    this.filteredData = this.data.filter(item =>
      (item.name && item.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  
    this.paginatedData;  // Update paginatedData
    this.currentPage = 1;  // Reset to first page
  }
  

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.filteredData.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }
}
