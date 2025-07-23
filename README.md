# LinguaLearn - Language Learning Web Application

## 📖 Opis

LinguaLearn je interaktivna veb aplikacija za učenje jezika, inspirisana Duolingo platformom. Aplikacija omogućava korisnicima da uče najmanje dva jezika kroz različite tipove vežbi, prate svoj napredak i takmiče se sa drugim korisnicima.

### 🌟 Ključne funkcionalnosti

- **Višejezična podrška**: Učenje engleskog, nemačkog, francuskog i španskog jezika
- **Tri tipa vežbi**: Multiple choice, translation i fill-in-the-blank zadaci
- **Praćenje napretka**: Sistem poena, streak-ova i statistika učenja
- **Leaderboard**: Rangiranje korisnika sa paginacijom i filterima
- **Responzivni dizajn**: Optimizovan za desktop i mobilne uređaje
- **Lokalno čuvanje podataka**: localStorage i sessionStorage integracija

## 🛠️ Tehnologije

- **React 18** sa TypeScript
- **React Router Dom** za rutiranje
- **React Context API** za state management
- **CSS3** sa responsive dizajnom
- **LocalStorage** za perzistentno čuvanje podataka

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
│   ├── usePageNavigation.ts
│   └── useTimer.ts
├── models/              # Klase sa metodama
│   ├── User.ts
│   └── ExerciseManager.ts
├── types/               # TypeScript interfejsi
│   └── index.ts
├── utils/               # Utility funkcije i mock data
│   └── mockData.ts
└── App.tsx              # Glavna aplikacija
```

## 🚀 Pokretanje projekta

### Preduslovi

- Node.js (v14 ili noviji)
- npm ili yarn

### Instalacija

1. **Kloniraj repozitorijum:**
   ```bash
   git clone https://github.com/username/seminarski-rad-web.git
   cd seminarski-rad-web
   ```

2. **Instaliraj dependencies:**
   ```bash
   npm install
   ```

3. **Pokreni development server:**
   ```bash
   npm start
   ```

4. **Otvori aplikaciju:**
   Aplikacija će biti dostupna na `http://localhost:3000`

### Build za produkciju

```bash
npm run build
```

### Pokretanje testova

```bash
npm test
```

## 🎯 Implementirane funkcionalnosti

### Minimalni zahtevi ✅

- ✅ **Git verzionisanje** - 20+ smislenih komitova
- ✅ **5+ stranica** - Home, Languages, Exercise, Profile, Leaderboard, Login, Register
- ✅ **3 reusable komponente** - Button, Card, Header
- ✅ **CSS stilizovanje** - Kompletno responzivni dizajn
- ✅ **7+ TypeScript funkcionalnosti** - Različiti hooks, klase, interfejsi
- ✅ **React hooks** - useState, useEffect, useContext, useNavigate, useLocation
- ✅ **2 klase sa metodama** - User i ExerciseManager
- ✅ **2 interfejsa** - User, Language, Exercise, itd.
- ✅ **React Router** - Kompletan routing sistem
- ✅ **Logička struktura** - Organizovani folderi za modele i komponente
- ✅ **Paginacija** - Implementirana na Leaderboard stranici
- ✅ **Smisleni filteri** - Po jeziku i težini

### Dodatne funkcionalnosti za višu ocenu ✅

- ✅ **Responzivnost** - Optimizovano za sve veličine ekrana
- ✅ **API integracija** - Mock API podaci za jezike i vežbe
- ✅ **LocalStorage** - Čuvanje korisničkih podataka i napretka

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

1. **English** (Engleski) - Beginner level
2. **Deutsch** (Nemački) - Intermediate level
3. **Français** (Francuski) - Intermediate level
4. **Español** (Španski) - Beginner level

## 🤝 Doprinošenje

1. Fork projekat
2. Kreiraj feature branch (`git checkout -b feature/nova-funkcionalnost`)
3. Commit promene (`git commit -m 'Dodaj novu funkcionalnost'`)
4. Push na branch (`git push origin feature/nova-funkcionalnost`)
5. Otvori Pull Request

## 📞 Kontakt

Za pitanja ili predloge kontaktirajte autora preko GitHub-a.

## 📄 Licenca

Ovaj projekat je kreiran u obrazovne svrhe kao deo seminarskog rada.

---

**Napomena**: Ova aplikacija je kreirana za potrebe seminarskog rada i demonstrira praktičnu primenu React-a, TypeScript-a i modernih web tehnologija.
