import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dosya } from 'src/app/models/Dosya';
import { ApiService } from 'src/app/services/api.service';
import { DosyaDialogComponent } from '../dialogs/dosya-dialog/dosya-dialog.component';
import { Kayit } from 'src/app/models/Kayit';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { DosyafotoDialogComponent } from '../dialogs/dosyafoto-dialog/dosyafoto-dialog.component';

@Component({
  selector: 'app-dosya',
  templateUrl: './dosya.component.html',
  styleUrls: ['./dosya.component.css']
})
export class DosyaComponent implements OnInit {
   dosyalar!: Dosya[];
   displayedColumns =['dosyaFoto','dosyaNo','dosyaAdi','dosyaTarihi','dosyaYolu','dosyaDersSayisi','islemler'];
   dataSource: any;
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   dialogRef!: MatDialogRef<DosyaDialogComponent>;
   fotoDialogRef!: MatDialogRef<DosyafotoDialogComponent>;
   confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.DosyaListele();
  }

  DosyaListele(){
    this.apiServis.DosyaListe().subscribe((d: object)=>{
      this.dosyalar=d as Dosya[];
      //console.log(d);
      this.dataSource= new MatTableDataSource(this.dosyalar);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

 
  Filtrele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      width: '100%'
      this.dataSource.paginator.firstPage();
    }
  }


DosyaEkle() {
  var yeniKayit = new Dosya();
  this.dialogRef = this.matDialog.open(DosyaDialogComponent, {
    width: "400px",
    data: {
      islem: 'ekle',
      kayit: yeniKayit
    }
  });

  this.dialogRef.afterClosed().subscribe(d => {
    if (d) {
      d.dosyaFoto = "profil.jpg";
      this.apiServis.DosyaEkle(d).subscribe(s => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.DosyaListele();
        }
      });
    }
  });
}
  


  DosyaDuzenle(kayit : Dosya){
    this.dialogRef= this.matDialog.open(DosyaDialogComponent,{
      width:'400px',
      data: {
        kayit : kayit,
        islem : 'duzenle',      
      }
    });

      this.dialogRef.afterClosed().subscribe((d): void=>{
        if(d){
        kayit.dosyaNo = d.dosyaNo;
        kayit.dosyaAdi = d.dosyaAdi;
        kayit.dosyaTarihi = d.dosyaTarihi;
        kayit.dosyaYolu= d.dosyaYolu;
        this.apiServis.DosyaDuzenle(kayit).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);

      });
    }
    });
  }

DosyaSil(kayit:Dosya){
  this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
    width:'500px'
  });

   this.confirmDialogRef.componentInstance.dialogMesaj=kayit.dosyaAdi+" İsimli Dosya Silenecek Onaylıyor Musunuz ?"

   this.confirmDialogRef.afterClosed().subscribe(d =>{

    if(d) {
      this.apiServis.DosyaSil(kayit.dosyaId).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.DosyaListele();
        }
      });
    }
   });
  }


   FotoGuncelle(kayit: Dosya) {
    this.fotoDialogRef = this.matDialog.open(DosyafotoDialogComponent, {
      width: "400px",
      data: kayit
    });

    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.dosyaId = kayit.dosyaId;
        this.apiServis.DosyaFotoGuncelle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DosyaListele();
          }
        });
      }
    });
  }










}


