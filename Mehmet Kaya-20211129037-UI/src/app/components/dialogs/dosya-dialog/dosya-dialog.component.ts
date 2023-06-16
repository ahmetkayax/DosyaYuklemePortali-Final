import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dosya } from 'src/app/models/Dosya';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dosya-dialog',
  templateUrl: './dosya-dialog.component.html',
  styleUrls: ['./dosya-dialog.component.css']
})
export class DosyaDialogComponent implements OnInit {
  dialogBaslik!: string;
  islem!: string;
  frm!: FormGroup;
  yeniKayit!: Dosya;
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public frmBuild : FormBuilder,
    public dialogRef : MatDialogRef <DosyaDialogComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
      this.islem = data.islem;
      this.yeniKayit= data.kayit;

      if( this.islem=='ekle'){
        this.dialogBaslik="Dosya Ekle";
      }

      if( this.islem=='duzenle'){
        this.dialogBaslik="Dosya Düzenle";
      }
      this.frm = this.FormOlustur();

    }

  ngOnInit() {
    
  }
  FormOlustur(): FormGroup {
    return this.frmBuild.group({
      "dosyaNo": [this.yeniKayit.dosyaNo],
      "dosyaAdi": [this.yeniKayit.dosyaAdi],
      "dosyaTarihi": [this.yeniKayit.dosyaTarihi],
      "dosyaYolu": [this.yeniKayit.dosyaYolu],
    });
  }
}
