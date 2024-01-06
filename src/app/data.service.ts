import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject<string>(''); // Initial data

  private total = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient){}

  setData(data: string) {
    this.dataSubject.next(data);
  }

  setData2(data: number) {
    this.total.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
  
 
  }

