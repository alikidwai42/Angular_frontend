import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  constructor (private http: HttpClient,private dataService: DataService){
    
  }

  username: string="";
  public user: any = {};
  isResultLoaded = false;
  isUpdateFormActive = false;
  loginUser: string ="";
  id: string="";
  name: string ="";
  password: string ="";
  country: string = '';
  state: string = '';


  ngOnInit() {
    this.dataService.getData().subscribe((data: string) => {
      this.loginUser = data;
      console.log(this.loginUser);
      this.userDetails();
    });
  }
 
  
  userDetails()
  { 
    console.log(this.loginUser);
    this.http.get("http://localhost:8080/api/v1/customer/userDetails/"+this.loginUser).subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        this.user = resultData;
        console.log(this.user);
    });
  }

  setUpdate(data: any)
  {
   this.id = data.id;
   this.name = data.name;
   this.password = data.password;
   this.country = data.country;
   this.state=data.state;
  }


  editItem() {
    this.user.isEditing = true;
  }

  saveItem(data: any) {
    this.user.isEditing = false;
    console.log(data);

    let bodyData = {
      "id": data.id,
      "name": data.name,
      "password": data.password,
      "country": data.country,
      "state": data.state
    };

    console.log(bodyData);
 
    this.http.put("http://localhost:8080/api/v1/customer/update",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("user updated Successfully");
  
    });

  }

  Delete(userId: any)
  {
    console.log(userId);

    this.http.delete("http://localhost:8080/api/v1/customer/customerDelete/"+userId,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Deleted");

});
}
 
}

