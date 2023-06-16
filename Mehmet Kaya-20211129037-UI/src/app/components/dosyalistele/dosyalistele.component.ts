import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Kayit } from 'src/app/models/Kayit';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { DosyasecDialogComponent } from '../dialogs/dosyasec-dialog/dosyasec-dialog.component';

@Component({
  selector: 'app-dosyalistele',
  templateUrl: './dosyalistele.component.html',
  styleUrls: ['./dosyalistele.component.css']
})
export class DosyalisteleComponent implements OnInit {
  dersId!: string;
  secDers!: Ders;
  kayitlar!: Kayit[];
dataSource:any;
displayedColumns =['dosyaFoto','dosyaNo','dosyaAdi','dosyaTarihi','dosyaYolu','dosyaDersSayisi','islemler'];
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
dialogRef!: MatDialogRef<DosyasecDialogComponent>;
  constructor(
    public apiServis :ApiService,
    public route : ActivatedRoute,
    public matDialog : MatDialog,
    public alert : MyAlertService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.dersId = p.dersId;
        this.DersById();
        this.DosyaListeGetir();
      }

    });
  }

  DosyaListeGetir(){
    this.apiServis.DersDosyaListe(this.dersId).subscribe((d: Kayit[] )=>{
      this.kayitlar=d as Kayit[];
      //console.log(d);
      this.dataSource= new MatTableDataSource(this.kayitlar);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  DersById(){
    this.apiServis.DersById(this.dersId).subscribe((d:Ders)=>{
      this.secDers=d;
    })
  }

 DosyaEkle(){
      this.dialogRef=this.matDialog.open(DosyasecDialogComponent,{
        width:'1000px'
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if(d){
          var kayit:Kayit = new Kayit();
          kayit.kayitDosyaId=d.dosyaId;
          kayit.kayitDersId=this.dersId;

          this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);

            if(s.islem){
              this.DosyaListeGetir();
            }
          });
        }
      });
 }

  DosyaSil(kayit:Kayit){
   this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
    width:'500px'
});
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.dosyaBilgi.dosyaAdi+ " İsimli Dosya Dersten Çıkarılacaktır Onaylıyor Musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem)
          this.DosyaListeGetir();

        })
      }
    })
  }

}
