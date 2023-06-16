import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

export const httpOptionsBase = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
export const serverUrl = environment.server_url;
