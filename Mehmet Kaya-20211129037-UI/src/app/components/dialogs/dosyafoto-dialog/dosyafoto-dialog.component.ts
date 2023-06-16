import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dosya } from 'src/app/models/Dosya';
import { DosyaFoto } from 'src/app/models/DosyaFoto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dosyafoto-dialog',
  templateUrl: './dosyafoto-dialog.component.html',
  styleUrls: ['./dosyafoto-dialog.component.css']
})
export class DosyafotoDialogComponent implements OnInit {
  secilenFoto: any;
  dosyaFoto: DosyaFoto = new DosyaFoto();
  secDosya!: Dosya;
  constructor(
    public dosyaFotoDialogRef : MatDialogRef<DosyafotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) { 
    this.secDosya = this.data;

  }

  ngOnInit() {
  }

  
  FotoSec(e: any) {
    const defaultValue = ""; // varsayılan değeriniz burada tanımlanmalı
  
    var fotolar = e.target.files;
    var foto = fotolar[0];
  
    var fr = new FileReader();
  
    fr.onloadend = (event) => {
      const fileReader = event.target as FileReader;
      const result = fileReader.result ?? defaultValue;
  
      this.secilenFoto = result;
      this.dosyaFoto.fotoData = result.toString();
      this.dosyaFoto.fotoUzanti = foto.type;
    };
  
    fr.readAsDataURL(foto);
  }
  
}
