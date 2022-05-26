import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Familia } from 'src/app/core/models/familia';
import { HistoriaFamiliar } from 'src/app/core/models/historia-familiar';
import { IntegranteFamiliar } from 'src/app/core/models/integrante-familiar';
import { EstructuraFamiliarComponent } from '../../components/estructura-familiar/estructura-familiar.component';
import { HistoriaFamiliarComponent } from '../../components/historia-familiar/historia-familiar.component';
import { EstructuraFamiliarDialogComponent } from '../estructura-familiar-dialog/estructura-familiar-dialog.component';

@Component({
  selector: 'app-historia-familiar-dialog',
  templateUrl: './historia-familiar-dialog.component.html',
  styleUrls: ['./historia-familiar-dialog.component.css']
})
export class HistoriaFamiliarDialogComponent implements OnInit {
  formHistoriaFamiliar: FormGroup = new FormGroup({});

  casaEncuestada: boolean = false;

  historiaFamiliar: HistoriaFamiliar = new HistoriaFamiliar();

  numerosDeVisitasPresencial: string[] = ['1ra presencial','2da presencial','3ra presencial','4ta presencial','5ta presencial','6ta presencial'];

  constructor(public dialogRef: MatDialogRef<HistoriaFamiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog) { }

  ngOnInit(): void {

    

    if(this.data.historiaFamiliar){
      this.historiaFamiliar = this.data.historiaFamiliar;


      this.formHistoriaFamiliar = new FormGroup({
        familia: new FormControl(this.historiaFamiliar.familia.nombre, [
          Validators.required
        ]),
        numeroHistoria: new FormControl(this.historiaFamiliar.numeroHistoria,[
          Validators.required
        ]),
        subSector: new FormControl(this.historiaFamiliar.subSector,[
          Validators.required
        ]),
        condicionEncuesta: new FormControl(this.historiaFamiliar.condicionEncuesta,[
          Validators.required
        ]),
        observacion: new FormControl(this.historiaFamiliar.observacion,[
          
        ]),
        fechaApertura: new FormControl(this.historiaFamiliar.fechaApertura,[
          
        ]),
        numeroVisitaPresencial: new FormControl(this.historiaFamiliar.numeroVisitaPresencial,[
          
        ]),
        numeroVisitaRemota: new FormControl(this.historiaFamiliar.numeroVisitaRemota,[
          
        ])
      });
    }else {
      let nombreFamilia: string = '';
      console.log(this.data.familia)
      if(this.data.familia) {
        
        nombreFamilia = this.data.familia.nombre;
      }

      this.formHistoriaFamiliar = new FormGroup({
        familia: new FormControl(nombreFamilia, [
          Validators.required
        ]),
        numeroHistoria: new FormControl('',[
          Validators.required
        ]),
        subSector: new FormControl('',[
          Validators.required
        ]),
        condicionEncuesta: new FormControl('',[
          Validators.required
        ]),
        observacion: new FormControl('',[
          
        ]),
        fechaApertura: new FormControl('',[
          
        ]),
        numeroVisitaPresencial: new FormControl('',[
          
        ]),
        numeroVisitaRemota: new FormControl('',[
          
        ])
      });
    }
  }

  
  registrar() {
    console.log('service.crear() => Succesfull');
    console.log(this.formHistoriaFamiliar.controls)
    if(this.formHistoriaFamiliar.controls['condicionEncuesta'].value.includes('encuestada')){
      const dialogRef = this.dialog.open(EstructuraFamiliarDialogComponent, {
        data: {nombreFamilia: new IntegranteFamiliar()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
  
  
      });
    }


  }

  actualizar() {
    console.log('service.actualizar() => Succesfull');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  condicionEncuesta(estado: boolean) {
    this.casaEncuestada = estado;
  }
}
