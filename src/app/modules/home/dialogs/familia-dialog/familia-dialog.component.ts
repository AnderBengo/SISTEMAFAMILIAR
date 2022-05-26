import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { empleadoVO } from 'src/app/core/models/empleadoVO';
import { Familia } from 'src/app/core/models/familia';
import { FamiliaComponent } from '../../components/familia/familia.component';
import { EmpleadoDialogComponent } from '../empleado-dialog/empleado-dialog.component';
import { HistoriaFamiliarDialogComponent } from '../historia-familiar-dialog/historia-familiar-dialog.component';

@Component({
  selector: 'app-familia-dialog',
  templateUrl: './familia-dialog.component.html',
  styleUrls: ['./familia-dialog.component.css']
})
export class FamiliaDialogComponent implements OnInit {

  empleadoEnviado: empleadoVO = new empleadoVO();

  formFamilia: FormGroup = new FormGroup({});
  familia: Familia = new Familia();
  constructor(public dialogRef: MatDialogRef<FamiliaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.data.empleado) {
      this.empleadoEnviado = this.data.empleado;
    }

    if(this.data.familia){
      this.familia = this.data.familia;
      this.formFamilia = new FormGroup({
        nombre: new FormControl(this.familia.nombre, [
          Validators.required
        ]),
        celular: new FormControl(this.familia.celular,[
          Validators.required
        ]),
        zona: new FormControl(this.familia.zona,[
          Validators.required
        ]),
        nombreZona: new FormControl(this.familia.nombreZona,[
          Validators.required
        ]),
        tipoVia: new FormControl(this.familia.tipoVia,[
          Validators.required
        ]),
        nombreTipoVia: new FormControl(this.familia.nombreTipoVia,[
          Validators.required
        ]),
        referencia: new FormControl(this.familia.referencia,[
          Validators.required
        ])
      });
    }else {
      this.formFamilia = new FormGroup({
        nombre: new FormControl('', [
          Validators.required
        ]),
        celular: new FormControl('',[
          Validators.required
        ]),
        zona: new FormControl('',[
          Validators.required
        ]),
        nombreZona: new FormControl('',[
          Validators.required
        ]),
        tipoVia: new FormControl('',[
          Validators.required
        ]),
        nombreTipoVia: new FormControl('',[
          Validators.required
        ]),
        referencia: new FormControl('',[
          Validators.required
        ])
      });
    }
  }

  regresarModuloAnterior() {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      data: {empleado: this.empleadoEnviado}
    });
  }
  
  registrar(formValue: any) {
    console.log('service.crear() => Succesfull');
    console.log(formValue)
    const dialogRef = this.dialog.open(HistoriaFamiliarDialogComponent, {
      data: {familia: formValue}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      // if(this.familia){
      //   this.familias.push(this.familia);
      //   this.table.renderRows();
      //   this.familia = undefined;
      // }

    });
  }

  actualizar() {
    console.log('service.actualizar() => Succesfull');
  }

  onNoClick(): void {
    this.dialogRef.close();

  }


}
