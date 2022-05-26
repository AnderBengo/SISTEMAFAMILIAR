import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { empleadoVO } from 'src/app/core/models/empleadoVO';
import { EmpleadoDialogComponent } from '../../dialogs/empleado-dialog/empleado-dialog.component';
import { EmpleadoVOService } from '../../services/empleado-vo.service';



@Component({
  selector: 'app-empleado-vo',
  templateUrl: './empleado-vo.component.html',
  styleUrls: ['./empleado-vo.component.css']
})
export class EmpleadoVOComponent implements OnInit {

  
  pagedItems:Array<empleadoVO>=[];
  itemsPerPage=10;
  frmListado!: FormGroup;
  empleado!: empleadoVO | undefined;
  empleadovo : empleadoVO[] = [];
  
    //OBTENER LOS empleados DEL BACKEND por el SERVICE 
    
  

  displayedColumns: string[] = ['nombreempleado','personasfam','Acciones'];

  dataSource: MatTableDataSource<empleadoVO> = new MatTableDataSource(this.empleadovo);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog,private empleadoservice:EmpleadoVOService) { 
    let nombreempleado: string[] = [];
    this.empleadovo.forEach(e => nombreempleado.push(e.nombreempleado));
    this.listareEmpleadoo();
    
  }

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

  }

  listareEmpleadoo() {
   
    this.empleadoservice.buscar('JARAMILLO').subscribe(x=> { 
      this.empleadovo = x ; 
      console.log(this.empleadovo)

    })


      }

      filtrarEmpleado(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        // if (this.dataSource.paginator) {
        //   this.dataSource.paginator.firstPage();
        // }
      }

  openDialogActualizar(empleado: empleadoVO): void {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      data: {empleado: empleado}
    });

    dialogRef.afterClosed().subscribe(result => {
      empleado = result;
      this.table.renderRows();
    });
  }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      data: {empleadovo: this.empleadovo}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.empleado = result;
      if(this.empleado){
        this.empleadovo.push(this.empleado);
        this.table.renderRows();
        this.empleado = undefined;
      }

    });
  }

  eliminarEmpleado(empleado: empleadoVO): void {
    this.empleadovo = this.empleadovo.filter(e => e.id !== empleado.id);
    this.dataSource = new MatTableDataSource(this.empleadovo);
  }



}
