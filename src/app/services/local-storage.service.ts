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
}
