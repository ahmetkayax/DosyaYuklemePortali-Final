using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProje1.ViewModel
{
    public class KayitModel
    {
        public string kayitId { get; set; }
        public string kayitDersId { get; set; }
        public string kayitDosyaId { get; set; }
        public DosyaModel dosyaBilgi { get; set; }
        public DersModel dersBilgi { get; set; }
    }
}