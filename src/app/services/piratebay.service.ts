import { AppError } from './../components/errors/app-error';
import { ITorrent } from './../interfaces/itorrent';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NotFoundError } from '../components/errors/not-found-error';

@Injectable()
export class PiratebayService implements OnInit {

searchTerm: string;
url = `https://tpbc.herokuapp.com`;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.getTorrents();
  }

  getTorrents() {
    const torrentUrl = `${this.url}/recent/`;
    return this._http.get(torrentUrl);
  }
  getTopTorrents(x) {
    const torrentUrl = `${this.url}/top/${x}/`;
    return this._http.get(torrentUrl);
  }
  getTop48Torrents(y) {
    const torrentUrl = `${this.url}/top48h/${y}/`;
    return this._http.get(torrentUrl);
  }

  search2(searchKeyword) {
    // console.log(searchKeyword);
    if (searchKeyword.length > 0 || searchKeyword !== ' ') {
      const torrentUrl = `${this.url}/search/${searchKeyword}`;
      return this._http.get(torrentUrl);
    }
  }

  divClicked() {
    // console.log('Div was clicked');
  }

  searchAdvanced() {}

  private handleError(error: Response) {
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }

}
