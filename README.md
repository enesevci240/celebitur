# Çelebi Turizm Websitesi

Öğrenci servisi, personel taşımacılığı ve tur organizasyonu hizmetleri sunan **Çelebi Turizm** için kurumsal website.

Saf HTML, CSS ve JavaScript ile geliştirilmiştir. Build adımı gerektirmez — GitHub Pages ile doğrudan yayınlanabilir.

## Sayfalar

| Sayfa | Dosya |
|-------|-------|
| Ana Sayfa | `index.html` |
| Anlaşmalı Kurumlar | `anlasmali-kurumlar.html` |
| Araçlar | `araclar.html` |
| Turlar | `turlar.html` |
| Hakkımızda & Kadromuz | `hakkimizda.html` |
| KVKK | `kvkk.html` |
| Gizlilik | `gizlilik.html` |

## Özellikler

- Responsive tasarım (mobil uyumlu, safe-area destekli)
- Merkezi iletişim yapılandırması (`js/config.js`)
- WhatsApp floating butonu (tüm sayfalarda)
- Google Maps ofis konumu (`hakkimizda.html`)
- İletişim formu (Formspree entegrasyonu — endpoint yapılandırılmalı)
- Scroll animasyonları (`prefers-reduced-motion` destekli)
- SEO meta etiketleri, canonical URL, sitemap

## Yerel Önizleme

```bash
cd celebitur
python3 -m http.server 5500
```

Tarayıcıda `http://localhost:5500` adresine gidin.

## GitHub Pages ile Deploy

### 1. GitHub Repo Oluşturma

```bash
cd celebitur
rm -rf .git   # yarım kalmış repo varsa temizleyin
git init
git add .
git commit -m "Çelebi Turizm MVP"
git branch -M main
git remote add origin https://github.com/enesevci240/celebitur.git
git push -u origin main
```

### 2. GitHub Pages Aktif Etme

1. GitHub'da repo sayfasına gidin
2. **Settings** → **Pages**
3. **Source:** Deploy from a branch
4. **Branch:** `main` / **Folder:** `/ (root)`
5. **Save**

Canlı URL: `https://enesevci240.github.io/celebitur/`

Push sonrası `js/config.js` içindeki `siteUrl` ve `sitemap.xml` / `robots.txt` / HTML canonical etiketlerindeki `enesevci240` değerini gerçek GitHub kullanıcı adınızla güncelleyin.

### 3. Özel Domain (Opsiyonel)

1. **Settings** → **Pages** → **Custom domain**
2. DNS: CNAME `www` → `enesevci240.github.io`

## Yapılandırma (`js/config.js`)

| Alan | Mevcut değer |
|------|--------------|
| Telefon | 0542 688 42 11 |
| E-posta | enesevci240@gmail.com |
| WhatsApp | 905426884211 |
| Konum | Samsun (41.270361, 36.317222) |
| Formspree | `xplaceholder` — henüz yapılandırılmadı |

### Formspree Kurulumu

1. [formspree.io](https://formspree.io) ücretsiz hesap açın
2. Form URL'sini `js/config.js` → `formspree` alanına yazın

## Müşteri Teslim Listesi

Canlıya almadan önce müşteriden alınması gerekenler:

- [ ] Yazılı sokak/cadde adresi (harita koordinatları mevcut)
- [ ] Formspree veya alternatif form endpoint'i
- [ ] Gerçek filo fotoğrafları (araç tipi başına)
- [ ] Tur destinasyon fotoğrafları ve onaylanacak tur listesi
- [ ] Anlaşmalı kurum logoları + yazılı izin
- [ ] 2–3 gerçek referans yorumu (isim + unvan + izin)
- [ ] Kadro fotoğrafları ve unvanlar
- [ ] KVKK / gizlilik metni (hukuki onay)
- [ ] Sosyal medya profil URL'leri
- [ ] Onaylanmış istatistikler (10.000+, 15+ yıl vb.)

## Proje Yapısı

```
celebitur/
├── index.html
├── anlasmali-kurumlar.html
├── araclar.html
├── turlar.html
├── hakkimizda.html
├── kvkk.html
├── gizlilik.html
├── 404.html
├── .nojekyll
├── sitemap.xml
├── robots.txt
├── css/
├── js/
│   ├── config.js
│   ├── main.js
│   ├── animations.js
│   └── turlar.js
└── images/
```

## Lisans

© 2026 Çelebi Turizm. Tüm hakları saklıdır.
