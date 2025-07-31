# LinguaLearn - Language Learning Web Application

## 📖 Opis projekta

LinguaLearn je moderna interaktivna veb aplikacija za učenje stranih jezika kroz gamifikovano iskustvo. Inspirisana popularnim platformama poput Duolingo, aplikacija omogućava korisnicima da uče 27+ jezika kroz različite tipove interaktivnih vežbi, prate svoj napredak kroz vizuelni skill tree sistem i takmiče se sa drugim korisnicima na globalnoj rang listi.

### 🌟 Ključne funkcionalnosti

- **27+ jezika**: Podrška za evropske, azijske, afričke i američke jezike
- **Interaktivne vežbe**: Multiple choice, translation i fill-in-the-blank zadaci
- **Skill Tree vizualizacija**: Vizuelni prikaz napretka kroz lekcije
- **Gamifikacija**: Sistem poena, streak-ova, dostignuća i rang lista
- **API integracije**: Dictionary API za definicije reči i Quotable API za motivacione citate
- **Napredni filteri**: Filtriranje po težini, regionu, popularnosti sa sortiranjem
- **Leaderboard**: Globalno rangiranje sa paginacijom (5 korisnika po strani)
- **Responzivni dizajn**: Potpuno optimizovan za sve uređaje
- **Perzistencija podataka**: localStorage za trajno i sessionStorage za privremeno čuvanje

## 🛠️ Tehnologije

- **React 18.3.1** - Moderna JavaScript biblioteka za izgradnju UI
- **TypeScript 4.9.5** - Tipiziran superset JavaScript-a
- **React Router Dom 6.28.0** - Deklarativno rutiranje
- **React Context API** - Globalno upravljanje stanjem
- **CSS3** - Moderan styling sa animacijama i media queries
- **Web APIs**: 
  - Free Dictionary API - Definicije reči i sinonimi
  - Quotable API - Obrazovni i motivacioni citati
- **LocalStorage & SessionStorage** - Perzistentno čuvanje podataka

## 📁 Struktura projekta

```
src/
├── components/
│   └── common/          # Reusable komponente
│       ├── Button/
│       ├── Card/
│       └── Header/
├── pages/               # Stranice aplikacije
│   ├── HomePage.tsx
│   ├── LanguagesPage.tsx
│   ├── ExercisePage.tsx
│   ├── ProfilePage.tsx
│   ├── LeaderboardPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── context/             # React Context
│   └── AppContext.tsx
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useSessionStorage.ts
│   ├── usePageNavigation.ts
│   └── useTimer.ts
├── models/              # Klase sa metodama
│   ├── User.ts
│   └── ExerciseManager.ts
├── services/            # API servisi
│   ├── languageService.ts
│   └── quoteService.ts
├── types/               # TypeScript interfejsi
│   └── index.ts
├── utils/               # Utility funkcije i mock data
│   └── mockData.ts
└── App.tsx              # Glavna aplikacija
```

## 🚀 Pokretanje projekta

### Preduslovi

- **Node.js** (v14 ili noviji) - [Download](https://nodejs.org/)
- **npm** (dolazi sa Node.js) ili **yarn**
- **Git** - [Download](https://git-scm.com/)
- Moderan web browser (Chrome, Firefox, Safari, Edge)

### Instalacija

1. **Kloniraj repozitorijum:**
   ```bash
   git clone https://github.com/[username]/seminarski-rad-web.git
   cd seminarski-rad-web
   ```
   *Napomena: Zamenite [username] sa vašim GitHub korisničkim imenom*

2. **Instaliraj dependencies:**
   ```bash
   npm install
   ```

3. **Pokreni development server:**
   ```bash
   npm start
   ```

4. **Otvori aplikaciju:**
   - Aplikacija će biti automatski otvorena u browseru
   - Ako se ne otvori automatski, idite na: `http://localhost:3000`
   - Za testiranje responzivnosti koristite Developer Tools (F12)

### Build za produkciju

```bash
npm run build
```

Build fajlovi će biti kreirani u `build/` direktorijumu.

### Pokretanje testova

```bash
npm test
```

### Linting i type checking

```bash
# Provera TypeScript tipova
npm run typecheck

# ESLint provera
npm run lint
```

## 🎯 Implementirane funkcionalnosti

### Minimalni zahtevi ✅

- ✅ **Git verzionisanje** - 20+ smislenih komitova sa opisnim porukama
- ✅ **5+ stranica** - Home, Languages, Exercise, Profile, Leaderboard, Login, Register
- ✅ **3+ reusable komponente** - Button, Card, Header, SkillTree
- ✅ **CSS stilizovanje** - Kompletno responzivni dizajn
- ✅ **7+ TypeScript funkcionalnosti** - Različiti hooks, klase, interfejsi
- ✅ **React hooks** - useState, useEffect, useContext, useNavigate, useLocation
- ✅ **2+ klase sa metodama** - User, ExerciseManager, LanguageService, QuoteService
- ✅ **Brojni interfejsi** - User, Language, Exercise, Achievement, Quote, itd.
- ✅ **React Router** - Kompletan routing sistem
- ✅ **Logička struktura** - Organizovani folderi za modele i komponente
- ✅ **Paginacija** - Implementirana na Leaderboard stranici (5 korisnika po strani)
- ✅ **Napredni filteri** - Po jeziku, težini, regionu, popularnosti sa sortiranjem

### Dodatne funkcionalnosti za višu ocenu ✅

- ✅ **Responzivnost** - Optimizovano za sve veličine ekrana
- ✅ **2 API integracije** - Dictionary API i Quotable API
- ✅ **LocalStorage & SessionStorage** - Trajno i privremeno čuvanje podataka

## 📚 Tipovi vežbi

1. **Multiple Choice** - Izbor tačnog odgovora iz ponuđenih opcija
2. **Translation** - Prevođenje reči ili fraza
3. **Fill-in-the-blank** - Dopunjavanje rečenica

## 👤 Korisničke uloge

- **Gost** - Može da pregledava jezike i osnovne informacije
- **Registrovani korisnik** - Može da učestvuje u vežbama, prati napredak i učestvuje u leaderboard-u

## 🎨 UI/UX karakteristike

- **Moderan dizajn** - Clean i intuitivan interfejs
- **Animacije** - Smooth tranzicije i hover efekti
- **Accessibility** - ARIA labeli i keyboard navigation
- **Loading states** - Indikatori učitavanja za bolje korisničko iskustvo

## 📱 Responzivnost

Aplikacija je potpuno responzivna i optimizovana za:
- Desktop računare (1200px+)
- Tablet uređaje (768px - 1199px)
- Mobilne telefone (320px - 767px)

## 🔒 Autentifikacija

- **Registracija** - Kreiranje novog korisničkog naloga
- **Prijava** - Autentifikacija postojećih korisnika
- **LocalStorage** - Perzistentno čuvanje sesije

## 📊 Praćenje napretka

- **Poeni** - Sistem nagrađivanja za tačne odgovore
- **Streak** - Praćenje uzastopnih dana učenja
- **Statistike** - Detaljne informacije o napretku
- **Leaderboard** - Rangiranje najboljih korisnika

## 🌐 Podržani jezici

Aplikacija podržava 27+ jezika organizovanih po regionima:

### 🇪🇺 Evropski jezici
- English, Spanish, French, German, Italian, Portuguese, Russian, Dutch, Swedish, Norwegian, Danish, Finnish, Polish, Czech, Hungarian, Romanian, Greek, Irish, Welsh

### 🌏 Azijski jezici  
- Chinese, Japanese, Korean, Hindi, Thai, Vietnamese, Arabic, Hebrew

### 🌍 Afrički jezici
- Swahili, Zulu

### 🌎 Američki jezici
- Navajo

## 🤝 Doprinošenje

1. Fork projekat
2. Kreiraj feature branch (`git checkout -b feature/nova-funkcionalnost`)
3. Commit promene (`git commit -m 'Dodaj novu funkcionalnost'`)
4. Push na branch (`git push origin feature/nova-funkcionalnost`)
5. Otvori Pull Request

## 🐛 Poznati problemi

- API rate limiting može ograničiti broj zahteva
- Quotes API ponekad vraća citate koji nisu direktno vezani za obrazovanje
- Mock podaci se koriste za neke funkcionalnosti umesto pravog backend-a

## 📞 Kontakt

Za pitanja, predloge ili prijavu grešaka:
- Otvorite Issue na GitHub repozitorijumu
- Kontaktirajte preko GitHub profila

## 📄 Licenca

Ovaj projekat je kreiran u obrazovne svrhe kao deo seminarskog rada.

---

**Napomena**: Ova aplikacija je kreirana za potrebe seminarskog rada i demonstrira praktičnu primenu React-a, TypeScript-a i modernih web tehnologija.
