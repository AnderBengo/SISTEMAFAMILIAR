import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Familia } from 'src/app/core/models/familia';
import { FamiliaDialogComponent } from '../../dialogs/familia-dialog/familia-dialog.component';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {
  familia!: Familia | undefined;
  familias: Familia[] = [
    //OBTENER LOS familiaS DEL BACKEND por el SERVICE 
    {id: 1,nombre: 'Bengolea Sánchez',celular:'',zona:'', nombreZona: '',tipoVia: '', nombreTipoVia: '',referencia: '',integrantesFamiliar: []},
    {id: 2,nombre: 'Arotinco Belasquez',celular:'',zona:'01 URB.', nombreZona: 'BARDALES MERA',tipoVia: '', nombreTipoVia: '',referencia: '',integrantesFamiliar: []},
    {id: 3,nombre: 'Rosas Paredes',celular:'',zona:'', nombreZona: '',tipoVia: '', nombreTipoVia: '',referencia: '',integrantesFamiliar: []},
    {id: 4,nombre: 'Sanchez Perr',celular:'',zona:'', nombreZona: '',tipoVia: '', nombreTipoVia: '',referencia: '',integrantesFamiliar: []},
    {id: 5,nombre: 'Perales Pera',celular:'',zona:'', nombreZona: '',tipoVia: '', nombreTipoVia: '',referencia: '',integrantesFamiliar: []},
  ]

  displayedColumns: string[] = ['Nombre','Direccion' ,'Acciones'];

  dataSource: MatTableDataSource<Familia> = new MatTableDataSource(this.familias);

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(public dialog: MatDialog) { 

    
  }

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
   
  }

  filtrarFamilia(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  openDialogActualizar(familia: Familia): void {
    const dialogRef = this.dialog.open(FamiliaDialogComponent, {
      data: {familia: familia}
    });

    dialogRef.afterClosed().subscribe(result => {
      familia = result;
      this.table.renderRows();
    });
  }

  openDialogCrear(): void {
    const dialogRef = this.dialog.open(FamiliaDialogComponent, {
      data: {familia: this.familia}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.familia = result;
      if(this.familia){
        this.familias.push(this.familia);
        this.table.renderRows();
        this.familia = undefined;
      }

    });
  }

  eliminarfamilia(familia: Familia): void {
    this.familias = this.familias.filter(e => e.id !== familia.id);
    this.dataSource = new MatTableDataSource(this.familias);
    
  }


}
