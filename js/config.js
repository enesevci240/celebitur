/**
 * Çelebi Tur — Site yapılandırması
 * İletişim bilgileri tek noktadan yönetilir.
 */
const SITE = {
  email: 'enesevci240@gmail.com',

  /** Birincil (header) — şehirlerarası / transfer */
  phone: '0542 688 42 11',
  phoneTel: '+905426884211',

  phones: {
    intercity: {
      id: 'intercity',
      label: 'Şehirlerarası / Transfer',
      hint: 'Gezi, transfer ve şehirlerarası ulaşım',
      display: '0542 688 42 11',
      tel: '+905426884211',
      whatsapp: '905426884211',
      msg: 'Merhaba, şehirlerarası ulaşım / transfer hakkında bilgi almak istiyorum.',
    },
    support: {
      id: 'support',
      label: 'Sorun / Destek',
      hint: 'Servis sorunu veya acil durum',
      display: '0545 121 28 55',
      tel: '+905451212855',
      whatsapp: '905451212855',
      msg: 'Merhaba, bir sorun / destek talebi için yazıyorum.',
    },
    office: {
      id: 'office',
      label: 'Ofis',
      hint: 'Sabit hat',
      display: '0362 238 08 16',
      tel: '+903622380816',
      whatsapp: null,
      msg: null,
    },
  },

  whatsappDefaultMsg: 'Merhaba, bilgi almak istiyorum.',
  whatsappQuoteMsg: 'Merhaba, şehirlerarası ulaşım / transfer için teklif almak istiyorum.',

  lat: 41.270361,
  lng: 36.317222,
  address: 'Samsun',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3588.371223464828!2d36.314632076053734!3d41.270356071314914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE2JzEzLjMiTiAzNsKwMTknMDIuMCJF!5e1!3m2!1str!2str!4v1783279202580!5m2!1str!2str',
  mapsLink: 'https://www.google.com/maps?q=41.270361,36.317222',
  formspree: 'https://formspree.io/f/xplaceholder',
  siteUrl: 'https://celebiturturizm.com',
  siteName: 'Çelebi Tur',
  hours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
  tagline: 'Yolumuz Güven, Yükümüz Gelecek.',
};
