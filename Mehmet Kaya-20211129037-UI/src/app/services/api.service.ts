import { Kayit } from './../models/Kayit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ders } from '../models/Ders';
import { Dosya } from '../models/Dosya';
import { Sonuc } from '../models/Sonuc';
import { DosyaFoto } from './../models/DosyaFoto';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl="https://localhost:44377/api/";
siteUrl ="https://localhost:44377/";
constructor(
  public http : HttpClient
) { }

/* Dosya API  */

DosyaListe() {
  return this.http.get<Dosya[]>(this.apiUrl + "dosyaliste");
}
DosyaById(dosyaId: string) {
  return this.http.get<Dosya>(this.apiUrl + "dosyabyid/" + dosyaId);
}
DosyaEkle(dosya : Dosya) {
  return this.http.post<Sonuc>(this.apiUrl + "dosyaekle", dosya);
}
DosyaDuzenle(dosya: Dosya) {
  return this.http.put<Sonuc>(this.apiUrl + "dosyaduzenle", dosya);
}
DosyaSil(dosyaId: string) {
  return this.http.delete<Sonuc>(this.apiUrl + "dosyasil/" +dosyaId);
}
DosyaDersListe(dosyaId: string) {
  return this.http.get<Kayit[]>(this.apiUrl + "dosyadersliste/" + dosyaId);
}
DosyaFotoGuncelle(dosyaFoto: DosyaFoto) {
  return this.http.post<Sonuc>(this.apiUrl + "dosyafotoguncelle", dosyaFoto);
}
/* Ders API  */
DersListe() {
  return this.http.get<Ders[]>(this.apiUrl + "dersliste");
}
DersById(dersId: string) {
  return this.http.get<Ders>(this.apiUrl + "dersbyid/" + dersId);
}
DersEkle(ders: Ders) {
  return this.http.post<Sonuc>(this.apiUrl + "dersekle", ders);
}
DersDuzenle(ders: Ders) {
  return this.http.put<Sonuc>(this.apiUrl + "dersduzenle", ders);
}
DersSil(dersId: string) {
  return this.http.delete<Sonuc>(this.apiUrl + "derssil/" + dersId);
}
DersDosyaListe(dersId: string) {
  return this.http.get<Kayit[]>(this.apiUrl + "dersdosyaliste/" + dersId);
}

/* Kayıt API */
KayitEkle(kayit: Kayit) {
  return this.http.post<Sonuc>(this.apiUrl + "kayitekle", kayit);
}
KayitSil(kayitId: string) {
  return this.http.delete<Sonuc>(this.apiUrl + "kayitsil/" + kayitId);
}
}