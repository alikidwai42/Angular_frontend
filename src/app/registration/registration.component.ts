import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Country {
  id: number;
  countryname: string;
}

interface State {
  state: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  password = '';
  selectedCountry: number = 0;
  selectedState = '';
  selectedCountryName = '';
  countryList: Country[] = [];
  stateList: State[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCountry();
  }

  getCountry() {
    this.http.get<Country[]>('http://localhost:8080/api/v1/customer/getCountry')
      .subscribe((resultData) => {
        this.countryList = resultData;
        console.log(this.countryList)
      });
  }

  getState(countryId1:number) {
    console.log("countryId1"+countryId1)
    this.http.get<State[]>(`http://localhost:8080/api/v1/customer/getState/${countryId1}`)
      .subscribe((resultData) => {
        this.stateList = resultData;
        console.log(this.stateList)
      });
  }

  onCountryChange(countryId: number) {
    let data: any;
    data = this.countryList.find((item:any) => item.id == countryId );
    console.log(data);
    this.selectedCountryName = data.countryname;
    this.getState(this.selectedCountry);
    
  }

  save() {
    const bodyData = {
      name: this.name,
      password: this.password,
      country: this.selectedCountryName,
      state: this.selectedState      
    };
        console.log(bodyData);
    this.http.post('http://localhost:8080/api/v1/customer/save', bodyData, { responseType: 'text' })
      .subscribe(() => {
        console.log('Registration successful');
        alert('Employee Registered Successfully');
      });
  } 
}
