
import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})





export class PaginationComponent implements AfterViewInit{

  users: Userinfo[]=[];

  constructor (private http: HttpClient)
{
  this.getAll(100);
}
 
/**
 * @title Table with pagination
 */


  displayedColumns = ['id', 'username', 'country','state'];


  dataSource = new MatTableDataSource<Userinfo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getAll(size:number)
  { 

   
    
    this.http.get("http://localhost:8080/api/v1/customer/Allusers/"+size).subscribe((resultData: any)=>
    {
        this.users = resultData;
        console.log("data");
        console.log(this.users);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
    });
  }


}

export interface Userinfo {
  id: string;
  username: string;
  password: string;
  country: string;
  state:string;
}




