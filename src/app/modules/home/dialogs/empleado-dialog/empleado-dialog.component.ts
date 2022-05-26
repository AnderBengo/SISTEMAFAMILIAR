import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { empleado } from 'src/app/core/models/empleado';
import { EmpleadoComponent } from '../../components/empleado/empleado.component';
import { FamiliaDialogComponent } from '../familia-dialog/familia-dialog.component';
@Component({
  selector: 'app-empleado-dialog',
  templateUrl: './empleado-dialog.component.html',
  styleUrls: ['./empleado-dialog.component.css']
})
export class EmpleadoDialogComponent implements OnInit {

  formEmpleado: FormGroup = new FormGroup({});
  constructor(public dialogRef: MatDialogRef<EmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data.empleado)
    if(this.data.empleado){
      let empleado: empleado = this.data.empleado;
      console.log(empleado.apellidoempleado)
      this.formEmpleado = new FormGroup({
        dniempleado: new FormControl(empleado.dniempleado, [
          Validators.required
        ]),
        nombreempleado: new FormControl(empleado.nombreempleado,[
          Validators.required
        ]),
        apellidoempleado: new FormControl(empleado.apellidoempleado,[
          Validators.required
        ]),
        telefono: new FormControl(empleado.telefono,[
          Validators.required
        ]),

        estado: new FormControl(empleado.estado,[
          Validators.required
        ])
      });
    }else {
      this.formEmpleado = new FormGroup({
        dniempleado: new FormControl('', [
          Validators.required
        ]),
        nombreempleado: new FormControl('',[
          Validators.required
        ]),
        apellidoempleado: new FormControl('',[
          Validators.required
        ]),
        telefono: new FormControl('',[
          Validators.required
        ]),
        estado: new FormControl('',[
          Validators.required
        ])
      });
    }
  }



  
  registrar(formEmpleado: any) {
    const dialogRef = this.dialog.open(FamiliaDialogComponent, {
      data: {empleado: formEmpleado}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      // if(this.familia){
      //   this.familias.push(this.familia);
      //   this.table.renderRows();
      //   this.familia = undefined;
      // }

    });
    console.log('service.crear() => Succesfull');
  }

  actualizar() {
    console.log('service.actualizar() => Succesfull');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

