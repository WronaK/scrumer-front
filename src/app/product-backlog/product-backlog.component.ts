import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductBacklogService} from "../services/product-backlog.service";
import {Task} from "../model/task";

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'priority', 'storyPoints', 'status'];

  productBacklog: Task[] = [];

  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productBacklogService: ProductBacklogService) {
    this.dataSource = new MatTableDataSource<Task>();
    this.dataSource.data = this.productBacklog;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onSelect(idTask: number): void {
    if(idTask != this.productBacklogService.idSelectTask) {
      this.productBacklogService.setSelectTask(idTask);
    }
  }

  ngOnInit(): void {
    this.productBacklogService.productBacklog();
    this.productBacklogService.getProductBacklog().subscribe(productBacklog =>  { this.productBacklog=productBacklog;
      this.dataSource.data = this.productBacklog});
  }

}
