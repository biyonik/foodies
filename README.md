# 🍽️ NextLevel Food

**Yemek tarifleri paylaşım platformu** - Next.js 15 ve React 19 ile geliştirilmiş modern bir web uygulaması.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![SQLite](https://img.shields.io/badge/SQLite-Node%20Built--in-green?style=for-the-badge&logo=sqlite)

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Proje Yapısı](#-proje-yapısı)
- [API Endpoints](#-api-endpoints)
- [Katkıda Bulunma](#-katkıda-bulunma)

## ✨ Özellikler

### 🏠 Ana Sayfa
- **Dinamik görsel slider** - Yemek fotoğrafları ile çekici anasayfa
- **Modern tasarım** - Gradient arka planlar ve smooth animasyonlar
- **Responsive layout** - Tüm cihazlarda mükemmel görünüm

### 🍜 Yemek Yönetimi
- **Tarif listeleme** - Grid layout ile şık yemek kartları
- **Detay sayfaları** - Her tarif için kapsamlı bilgiler
- **Görsel önizleme** - Next.js Image optimizasyonu ile hızlı yükleme
- **Dinamik routing** - SEO dostu URL yapısı (`/meals/[slug]`)

### ➕ Yemek Ekleme
- **Interaktif form** - React 19'un useActionState hook'u ile
- **Görsel yükleme** - 
- **Canlı önizleme** - Yüklenen görselin anında görüntülenmesi
- **Form validasyonu** - Zod ile güçlü backend validasyonu
- **XSS koruması** - Güvenli içerik filtreleme

## 🛠️ Teknolojiler

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - En yeni React versiyonu
- **TypeScript** - Type safety ve geliştirici deneyimi
- **CSS Modules** - Scoped styling
- **Tailwind CSS** - Utility-first CSS framework (kısmi kullanım)

### Backend
- **Server Actions** - Next.js'in yerleşik backend çözümü
- **Node.js SQLite** - Yerleşik SQLite modülü (node:sqlite)
- **Form Handling** - React 19 useActionState hook
- **File Upload** - Multipart form data işleme

### Validasyon ve Güvenlik
- **Zod** - Runtime type validation
- **XSS Protection** - İçerik filtreleme
- **Slugify** - SEO dostu URL oluşturma
- **Image Optimization** - Next.js Image component

### Geliştirme Araçları
- **ESLint** - Code linting
- **PNPM** - Hızlı paket yöneticisi
- **CSS Modules** - Modular styling

## 🚀 Kurulum

### Ön Gereksinimler
- Node.js 18+ (önerilir: 18.20.0)
- PNPM paket yöneticisi

### Adım Adım Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/biyonik/nextlevel-food.git
cd nextlevel-food
```

2. **Bağımlılıkları yükleyin**
```bash
pnpm install
```

3. **Veritabanını başlatın**
```bash
node initdb.js
```

4. **Geliştirme sunucusunu başlatın**
```bash
pnpm dev
```

5. **Uygulamayı açın**
   Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## 📖 Kullanım

### Yemek Tarifleri Görüntüleme
- Ana sayfadan "Explore Meals" butonuna tıklayın
- Yemek kartlarından birine tıklayarak detayları görün
- Tarif sahibi ile iletişim kurmak için e-posta linkini kullanın

### Yeni Tarif Ekleme
1. `/meals/share` sayfasına gidin
2. Formu doldurun:
    - **İsminiz ve e-postanız**
    - **Tarif başlığı**
    - **Kısa açıklama**
    - **Detaylı talimatlar**
    - **Yemek fotoğrafı** (PNG, JPEG, JPG)
3. "Share Meal" butonuna tıklayın

### Tarif Arama
- Yemek listesi sayfasında arama kutusunu kullanın
- Tarif adı, açıklama veya yaratıcı ismine göre arama yapın

## 📁 Proje Yapısı

```
nextlevel-food/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 community/         # Topluluk sayfası
│   ├── 📁 meals/             # Yemek sayfaları
│   │   ├── 📁 [mealSlug]/    # Dinamik tarif sayfası
│   │   └── 📁 share/         # Tarif ekleme sayfası
│   ├── globals.css           # Global stiller
│   ├── layout.tsx            # Ana layout
│   └── page.tsx              # Ana sayfa
├── 📁 components/            # React componentleri
│   ├── 📁 image-slideshow/   # Görsel slider
│   ├── 📁 main-header/       # Ana başlık
│   ├── 📁 meals/             # Yemek componentleri
│   └── 📁 nav-link/          # Navigasyon linki
├── 📁 lib/                   # Utility fonksiyonlar
│   ├── 📁 actions/           # Server Actions
│   ├── 📁 validations/       # Zod şemaları
│   └── meals.js              # Veritabanı işlemleri
├── 📁 models/                # TypeScript interfaces
├── 📁 public/                # Statik dosyalar
│   └── 📁 images/            # Yemek fotoğrafları
├── initdb.js                 # Veritabanı başlatma
├── meals.db                  # SQLite veritabanı
└── package.json              # Proje konfigürasyonu
```

### Veri Modeli

```typescript
interface MealModel {
  id?: string;
  title: string;
  summary: string;
  slug?: string;
  image: string;
  creator: string;
  creator_email?: string;
  instructions: string;
}
```

## 🎨 Özelleştirme

### Tema Renkleri
Proje özel CSS değişkenleri kullanıyor. `globals.css` dosyasından renkleri değiştirebilirsiniz:

```css
:root {
  --primary-color: #f9572a;
  --secondary-color: #ff8a05;
  --background-color: #282c34;
  --text-color: #ddd6cb;
}
```

### Yeni Sayfalar Ekleme
1. `app/` dizinine yeni klasör oluşturun
2. `page.tsx` dosyası ekleyin
3. İhtiyaç duyulursa `layout.tsx` ekleyin

## 🔧 Veritabanı

Proje Node.js'in yerleşik SQLite modülünü (`node:sqlite`) kullanıyor. Bu sayede:
- ✅ Ek bağımlılık yok
- ✅ Native compilation sorunu yok
- ✅ Hızlı performans
- ✅ Cross-platform uyumluluk

### Veritabanı Şeması

```sql
CREATE TABLE meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    summary TEXT NOT NULL,
    instructions TEXT NOT NULL,
    creator TEXT NOT NULL,
    creator_email TEXT NOT NULL
);
```

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Geliştirme Kuralları
- ESLint kurallarına uyun
- TypeScript tiplerini kullanın
- CSS Modules ile stil yazın
- Server Actions için proper error handling

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

**[Adınız]** - *Full Stack Developer*
- GitHub: [@biyonik](https://github.com/biyonik)
- LinkedIn: [Ahmet ALTUN](https://linkedin.com/in/biyonik)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

**Next.js 15 ile moderne web geliştirme** 🚀