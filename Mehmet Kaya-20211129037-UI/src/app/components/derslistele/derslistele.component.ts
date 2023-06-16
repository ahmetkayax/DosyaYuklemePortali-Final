import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Dosya } from 'src/app/models/Dosya';
import { Kayit } from 'src/app/models/Kayit';
import { Ders } from 'src/app/models/Ders';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.css']
})
export class DerslisteleComponent implements OnInit {
   kayitlar!: Kayit[];
   dersler !:Ders[];
   secDosya!: Dosya;
   dosyaId!: string;
   dersId: string="";
   dataSource: any;
   displayedColumns = ['dersKodu', 'dersAdi', 'DersKredi', 'islemler'];
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis : ApiService,
    public alert : MyAlertService,
    public route : ActivatedRoute,
    public matDialog: MatDialog

  ) { }

  ngOnInit() {
  
    this.route.params.subscribe((p: any) => {
      if (p) {
        this.dosyaId = p.dosyaId;
        this.DosyaGetir();
        this.DersListeGetir();
        this.DersListele();
        
      }
    });
  }

  DosyaGetir() {
    this.apiServis.DosyaById(this.dosyaId).subscribe(d => {
      this.secDosya = d;
    });
  }

  DersListeGetir() {
    this.apiServis.DosyaDersListe(this.dosyaId).subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
 DersListele(){
  this.apiServis.DersListe().subscribe((d:Ders[]) => {
    this.dersler = d;
  });
 }
 DersSec(dersId: string) {
  console.log(dersId);
  this.dersId = dersId;
}

  Kaydet(){
  if(this.dersId==""){
    var s:Sonuc=new Sonuc();
    s.islem=false;
    s.mesaj="Ders Seçiniz";
    this.alert.AlertUygula(s);
  }
  else{
    var kayit = new Kayit();
    kayit.kayitDosyaId = this.dosyaId;
    kayit.kayitDersId = this.dersId;
    this.apiServis.KayitEkle(kayit).subscribe(s => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.DersListeGetir();
      }
    });
  }
}

DersSil(kayit: Kayit) {
  this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
    width: "400px"
  });
  this.confirmDialogRef.componentInstance.dialogMesaj = kayit.dersBilgi.dersAdi + " Adlı Ders Silinecektir Onaylıyor Musunuz ?";
  { } this.confirmDialogRef.afterClosed().subscribe(d => {
    if (d) {
      this.apiServis.KayitSil(kayit.kayitId).subscribe(s => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.DersListeGetir();
        }
      });
    }
  });
}

}
