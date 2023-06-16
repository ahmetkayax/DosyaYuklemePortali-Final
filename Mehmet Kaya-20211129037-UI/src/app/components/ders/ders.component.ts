import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/Ders';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { DersDialogComponent } from '../dialogs/ders-dialog/ders-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
dersler!: Ders[];
dataSource:any;
dialogRef!: MatDialogRef<DersDialogComponent>;
displayedColumns = ['dersKodu', 'dersAdi', 'DersKredi', 'dersDosyaSayisi', 'islemler'];
confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public apiServis:ApiService,
    public alert : MyAlertService,
    public matDialog : MatDialog
  ) { }

  ngOnInit() {
    this.DersListele();
  }


  DersListele(){
    this.apiServis.DersListe().subscribe(d => {
      this.dersler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DersEkle(){
    var yeniKayit: Ders = new Ders();
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "400px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.DersEkle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });
  }

    DersDuzenle(kayit:Ders){
      this.dialogRef = this.matDialog.open(DersDialogComponent, {
        width: "400px",
        data: {
          islem: 'duzenle',
          kayit: kayit
        }
      });

      this.dialogRef.afterClosed().subscribe(d => {
        if (d) {
  
          kayit.dersKodu = d.dersKodu;
          kayit.dersAdi = d.dersAdi;
          kayit.DersKredi = d.DersKredi;
          this.apiServis.DersDuzenle(kayit).subscribe(s => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.DersListele();
            }
          });
        }
      });
    }


    DersSil(kayit:Ders){
      this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
        width: "400px"
      });
      this.confirmDialogRef.componentInstance.dialogMesaj = kayit.dersAdi + " Dersi Silinecektir Onaylıyor musunuz?";
      { } this.confirmDialogRef.afterClosed().subscribe(d => {
        if (d) {
          this.apiServis.DersSil(kayit.dersId).subscribe(s => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.DersListele();
            }
          });
        }
      });
    }
}
