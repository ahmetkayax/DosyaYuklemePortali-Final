import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public AlertAc: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
  }


  AlertGoster(p:boolean){
    var s:Sonuc=new Sonuc();
    s.islem=p;
    s.mesaj="Bu mesaj";
    this.AlertAc.AlertUygula(s);
  }
  ConfirmUygulama() {

    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      console.log(d);
      if (d) {
      
        console.log("Kayıt Silindi");
      }else {
        console.log("Kayıt Silinmedi");
      }
    });

  }

  
}
