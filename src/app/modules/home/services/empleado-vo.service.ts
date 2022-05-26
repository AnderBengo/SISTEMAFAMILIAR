import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service'; 
import { Observable } from 'rxjs';
import { empleadoVO } from 'src/app/core/models/empleadoVO';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoVOService extends GenericoService{

  url=`${this.url_base}/v1/Empleado`;
  constructor(private http: HttpClient) { 
    
    super()
  }
  listar():Observable<empleadoVO[]>{
    
    return this.http.get<empleadoVO[]>(this.url);
    
  }
  buscar(empleado:string):Observable<empleadoVO[]>{
    const url=`${this.url}?PERSONASFAM=${empleado}`;
    return this.http.get<empleadoVO[]>(url);
  }

  buscar2(): Observable<any> {
    return this.http.get<any>('https://api.instantwebtools.net/v1/passenger?page=0&size=10');
  }
}
