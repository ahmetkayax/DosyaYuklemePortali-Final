using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalProje1.Models;
using FinalProje1.ViewModel;
using System.Drawing;
using System.Web.UI;

namespace FinalProje1.Controllers
{
    public class ServisController : ApiController
    {
        DB03Entities db = new DB03Entities();
        SonucModel sonuc = new SonucModel();



        #region Ders
        [HttpGet]
        [Route("api/dersliste")]
        public List<DersModel> DersListe()
        {
            List<DersModel> liste = db.Ders.Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersAdi = x.dersAdi,
                dersKodu = x.dersKodu,
                DersKredi = x.DersKredi,
                dersDosyaSayisi = x.Kayit.Count()
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/dersbyid/{dersId}")]
        public DersModel DersById(string dersId)
        {
            DersModel kayit = db.Ders.Where(s => s.dersId == dersId).Select(x => new DersModel()
            {
                dersId = x.dersId,
                dersAdi = x.dersAdi,
                dersKodu = x.dersKodu,
                DersKredi = x.DersKredi,
                dersDosyaSayisi = x.Kayit.Count()
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/dersekle")]
        public SonucModel DersEkle(DersModel model)
        {
            if (db.Ders.Count(c => c.dersKodu == model.dersKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ders Kayıtlıdır!";
                return sonuc;
            }

            Ders yeni = new Ders();
            yeni.dersId = Guid.NewGuid().ToString();
            yeni.dersKodu = model.dersKodu;
            yeni.dersAdi = model.dersAdi;
            yeni.DersKredi = model.DersKredi;
            db.Ders.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/dersduzenle")]
        public SonucModel DersDuzenle(DersModel model)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == model.dersId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.dersKodu = model.dersKodu;
            kayit.dersAdi = model.dersAdi;
            kayit.DersKredi = model.DersKredi;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/derssil/{dersId}")]
        public SonucModel DersSil(string dersId)
        {
            Ders kayit = db.Ders.Where(s => s.dersId == dersId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Kayit.Count(c => c.kayitDersId == dersId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Dosya Kayıtlı Ders Silinemez!";
                return sonuc;
            }

            db.Ders.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ders Silindi";

            return sonuc;
        }
        #endregion




        #region Dosya

        [HttpGet]
        [Route("api/dosyaliste")]
        public List<DosyaModel> DosyaListe()
        {
            List<DosyaModel> liste = db.Dosya.Select(x => new DosyaModel()
            {
                dosyaId = x.dosyaId,
                dosyaNo = x.dosyaNo,
                dosyaAdi = x.dosyaAdi,
                dosyaTarihi = x.dosyaTarihi,
                dosyaYolu = x.dosyaYolu,
                dosyaFoto = x.dosyaFoto,
                dosyaDersSayisi = x.Kayit.Count()
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/dosyabyid/{dosyaId}")]
        public DosyaModel DosyaById(string dosyaId)
        {
            DosyaModel kayit = db.Dosya.Where(s => s.dosyaId == dosyaId).Select(x => new DosyaModel()
            {
                dosyaId = x.dosyaId,
                dosyaNo = x.dosyaNo,
                dosyaAdi = x.dosyaAdi,
                dosyaTarihi = x.dosyaTarihi,
                dosyaYolu = x.dosyaYolu,
                dosyaFoto = x.dosyaFoto,
                dosyaDersSayisi = x.Kayit.Count()
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/dosyaekle")]
        public SonucModel DosyaEkle(DosyaModel model)
        {
            if (db.Dosya.Count(c => c.dosyaNo == model.dosyaNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Dosya Kayıtlıdır!";
                return sonuc;
            }

            Dosya yeni = new Dosya();
            yeni.dosyaId = Guid.NewGuid().ToString();
            yeni.dosyaNo = model.dosyaNo;
            yeni.dosyaAdi = model.dosyaAdi;
            yeni.dosyaTarihi = model.dosyaTarihi;
            yeni.dosyaYolu = model.dosyaYolu;
            yeni.dosyaFoto = model.dosyaFoto;
            db.Dosya.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Dosya Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/dosyaduzenle")]
        public SonucModel DosyaDuzenle(DosyaModel model)
        {
            Dosya kayit = db.Dosya.Where(s => s.dosyaId == model.dosyaId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Dosya Bulunmadı!";
                return sonuc;
            }

            kayit.dosyaNo = model.dosyaNo;
            kayit.dosyaAdi = model.dosyaAdi;
            kayit.dosyaTarihi = model.dosyaTarihi;
            kayit.dosyaYolu = model.dosyaYolu;
            kayit.dosyaFoto = model.dosyaFoto;


            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Dosya Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/dosyasil/{dosyaId}")]
        public SonucModel DosyaSil(string dosyaId)
        {
            Dosya kayit = db.Dosya.Where(s => s.dosyaId == dosyaId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Dosya Bulunmadı!";
                return sonuc;
            }

            if (db.Kayit.Count(c => c.kayitDosyaId == dosyaId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ders Kayıtlı Dosya  Silinemez!";
                return sonuc;
            }

            db.Dosya.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Dosya Silndi";
            return sonuc;
        }

        [HttpPost]
        [Route("api/dosyafotoguncelle")]
        public SonucModel DosyaFotoGuncelle(DosyaFotoModel model)
        {
            Dosya dosya = db.Dosya.Where(s => s.dosyaId == model.dosyaId).SingleOrDefault();
            if (dosya == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı!";
                return sonuc;
            } 
            if (dosya.dosyaYolu != "profil.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosya.dosyaFoto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgBytes = Convert.FromBase64String(base64);
            string dosyaAdi = dosya.dosyaId + model.fotoUzanti.Replace("image/", ".");
            using (var ms = new MemoryStream(imgBytes, 0, imgBytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));
            }
            dosya.dosyaFoto = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Fotograf Güncellendi";

            return sonuc;
        }



      


        #endregion



        #region Pdf


        [HttpPost]
        [Route("api/pdfdosyaekle")]
        public SonucModel PdfDosyaEkle(PdfDosyaModel model)
        {

            Dosya dosya = db.Dosya.Where(s => s.dosyaId == model.dosyaId).SingleOrDefault();
            if(dosya==null)
            {
                sonuc.islem=false;
                sonuc.mesaj = "Pdf Dosyası Bulunamadı!";
                return sonuc;
            }

            if(dosya.dosyaYolu!="BosDosya.pdf")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/PdfDosyalar/"+dosya.dosyaYolu);
                if(File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }


            string base64 = model.dosyaData.Substring(model.dosyaData.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] databytes = Convert.FromBase64String(base64);
            string dosyaAdi = dosya.dosyaYolu + model.dosyaUzanti;
            using (var fs = new FileStream(System.Web.Hosting.HostingEnvironment.MapPath("~/PdfDosyalar/" + dosyaAdi), FileMode.Create))
            {
                fs.Write(databytes, 0, databytes.Length);
            }
            dosya.dosyaYolu = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "PDF Dosyası Yüklendi";





            return sonuc;
        }


                    #endregion



            /*   Dosya dosya = db.Dosya.Where(s => s.dosyaId == model.dosyaId).SingleOrDefault();
                if (dosya == null)
                {
                    sonuc.islem = false;
                    sonuc.mesaj = "Kayıt Bulunmadı!";
                    return sonuc;
                } 
                if (dosya.dosyaYolu != "profil.jpg")
                {
                    string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosya.dosyaYolu);
                    if (File.Exists(yol))
                    {
                        File.Delete(yol);
                    }
                }

                string data = model.fotoData;
                string base64 = data.Substring(data.IndexOf(',') + 1);
                base64 = base64.Trim('\0');
                byte[] imgBytes = Convert.FromBase64String(base64);
                string dosyaAdi = dosya.dosyaId + model.fotoUzanti.Replace("image/", ".");
                using (var ms = new MemoryStream(imgBytes, 0, imgBytes.Length))
                {
                    Image img = Image.FromStream(ms, true);
                    img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));
                }
                dosya.dosyaFoto = dosyaAdi;
                db.SaveChanges();

                sonuc.islem = true;
                sonuc.mesaj = "Fotograf Güncellendi";

                return sonuc;
            }*/



            #region Kayıt

            [HttpGet]
[Route("api/dosyadersliste/{dosyaId}")]
public List<KayitModel> DosyaDersListe(string dosyaId)
{
    List<KayitModel> liste = db.Kayit.Where(s => s.kayitDosyaId == dosyaId).Select(x => new KayitModel()
    {
        kayitId = x.kayitId,
        kayitDersId = x.kayitDersId,
        kayitDosyaId = x.kayitDosyaId
    }).ToList();

    foreach (var kayit in liste)
    {
        kayit.dosyaBilgi = DosyaById(kayit.kayitDosyaId);
        kayit.dersBilgi = DersById(kayit.kayitDersId);

    }
    return liste;

}
[HttpGet]
[Route("api/dersdosyaliste/{dersId}")]
public List<KayitModel> DersDosyaListe(string dersId)
{
    List<KayitModel> liste = db.Kayit.Where(s => s.kayitDersId == dersId).Select(x => new KayitModel()
    {
        kayitId = x.kayitId,
        kayitDersId = x.kayitDersId,
        kayitDosyaId = x.kayitDosyaId
    }).ToList();

    foreach (var kayit in liste)
    {
        kayit.dosyaBilgi = DosyaById(kayit.kayitDosyaId);
        kayit.dersBilgi = DersById(kayit.kayitDersId);

    }
    return liste;

}



#endregion



#region Kayıt
[HttpPost]
[Route("api/kayitekle")]
public SonucModel KayitEkle(KayitModel model)
{
    if (db.Kayit.Count(c => c.kayitDersId == model.kayitDersId & c.kayitDosyaId == model.kayitDosyaId) > 0)
    {
        sonuc.islem = false;
        sonuc.mesaj = "Dosya daha önce yüklendi!";
        return sonuc;
    }

    Kayit yeni = new Kayit();
    yeni.kayitId = Guid.NewGuid().ToString();
    yeni.kayitDosyaId = model.kayitDosyaId;
    yeni.kayitDersId = model.kayitDersId;
    db.Kayit.Add(yeni);
    db.SaveChanges();
    sonuc.islem = true;
    sonuc.mesaj = "Dosya Eklendi";
    return sonuc;
}

[HttpDelete]
[Route("api/kayitsil/{kayitId}")]
public SonucModel KayitSil(string kayitId)
{
    Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();

    if (kayit == null)
    {
        sonuc.islem = false;
        sonuc.mesaj = "Dosya Bulunamadı!";
        return sonuc;
    }


    db.Kayit.Remove(kayit);
    db.SaveChanges();
    sonuc.islem = true;
    sonuc.mesaj = "Dosya Silindi";

    return sonuc;
}
#endregion

}
}
