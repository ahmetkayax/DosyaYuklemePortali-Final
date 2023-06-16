import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DosyaDialogComponent } from '../dosya-dialog/dosya-dialog.component';
import { DosyafotoDialogComponent } from '../dosyafoto-dialog/dosyafoto-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Dosya } from 'src/app/models/Dosya';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dosyasec-dialog',
  templateUrl: './dosyasec-dialog.component.html',
  styleUrls: ['./dosyasec-dialog.component.css']
})
export class DosyasecDialogComponent implements OnInit {
  dosyalar!: Dosya[];
  displayedColumns =['dosyaFoto','dosyaNo','dosyaAdi','dosyaTarihi','dosyaYolu','dosyaDersSayisi','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  fotoDialogRef!: MatDialogRef<DosyafotoDialogComponent>;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
 constructor(
   public apiServis : ApiService,
   public matDialog : MatDialog,
   public alert : MyAlertService,
   public   dialogRef: MatDialogRef<DosyaDialogComponent>,

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

DosyaSec(dosya: Dosya){

  this.dialogRef.close(dosya);

}



}
