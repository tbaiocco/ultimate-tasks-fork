import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public get api() {
    return environment.api;
  }

}
