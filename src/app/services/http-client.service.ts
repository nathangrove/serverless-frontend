import { Injectable } from "@angular/core";
import { RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpClient {

  constructor(
    private http: Http
  ){}

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
      return this.http.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.http.get(url, this.getRequestOptionArgs(options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.http.post(url, body, this.getRequestOptionArgs(options));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.http.put(url, body, this.getRequestOptionArgs(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
      return this.http.delete(url, this.getRequestOptionArgs(options));
  }


  private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
    if (options == null) options = new RequestOptions();
    if (options.headers == null) options.headers = new Headers();

    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Authorization', `Bearer ${localStorage['token']}`);

    return options;
  }
}