import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

 constructor(private http: HttpClient, private router: Router,private dataService:DataService){

 }

 name: string = "";
 pass: string = "";


 login()
 {
  console.log("loginApi");
  
  let bodyData = {
    "name" : this.name,
    "password" : this.pass
   
  };
  console.log(bodyData);

  this.http.post("http://localhost:8080/api/v1/customer/login",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
  {
    
      console.log(resultData);
      if(resultData){
        this.dataService.setData(this.name);
        alert("Employee Login Successfully");
        this.router.navigate(['/users']);

      }
      else{
        alert("invalid username or password")
      }
      

  });
  
}

}
