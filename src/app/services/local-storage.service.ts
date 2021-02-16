import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getUserLocalData(){ 
    /* retrive user list object from local storage */
    return JSON.parse(localStorage.getItem('userlist')) || [];
  }

  setUserLocalData(user: any) { /* store user list object in local storage */
    let data: any = {};
    let currectData: any = [];
    currectData = this.getUserLocalData();
    data.firstname = user.firstname;
    data.lastname = user.lastname;
    data.gender = user.gender;
    data.email = user.email;
    data.dob = user.dob;
    currectData.push(data);
    this.updateStorage(currectData);
  }

  updateStorage(data){
    localStorage.setItem('userlist', JSON.stringify(data));
  }
}
