import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  setHeader(): HttpHeaders {
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json')
    header.set('Accept', 'application/json')
    return header;
  }

  getBoard() : Observable <any> {
    let route = 'http://ec2-13-59-24-144.us-east-2.compute.amazonaws.com:4000/api/board';
    
    return this.httpClient.get<any>(route, {
      headers: this.setHeader()
    });
  }

  postStartGame(indice) : Observable <any> {
    let route = 'http://ec2-13-59-24-144.us-east-2.compute.amazonaws.com:4000/api/game/start';
    
    return this.httpClient.post<any>(route, {indice}, {
      headers: this.setHeader()
    });
  }
}
