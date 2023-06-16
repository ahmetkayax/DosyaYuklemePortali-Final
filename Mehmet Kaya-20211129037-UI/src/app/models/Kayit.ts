import { Ders } from 'src/app/models/Ders';
import { Dosya } from 'src/app/models/Dosya';
export class Kayit {
  kayitId!: string;
  kayitDersId!: string;
  kayitDosyaId!: string;
  dosyaBilgi!: Dosya;
  dersBilgi!: Ders;
}
