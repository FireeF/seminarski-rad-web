# Dokumentacija - Language Learning Platform

## 1. Korisnički zahtev

### Opis teme
Language Learning Platform je interaktivna veb aplikacija za učenje stranih jezika kroz gamifikovano iskustvo. Aplikacija omogućava korisnicima da:
- Biraju između različitih jezika za učenje
- Prolaze kroz struktuirane lekcije sa različitim tipovima vežbi
- Prate svoj napredak kroz sistem poena i dostignuća
- Takmiche se sa drugim korisnicima kroz rang liste
- Vizualizuju svoje znanje kroz skill tree sistem

### Ciljni korisnici
- Početnici koji žele da nauče novi jezik
- Studenti koji žele da poboljšaju svoje jezičke veštine
- Profesionalci koji uče jezik za poslovne potrebe

## 2. Opis sistema

### 2.1 Slučajevi korišćenja

#### UC1: Registracija korisnika
- **Aktor**: Neregistrovani korisnik
- **Preduslovi**: Korisnik ima pristup aplikaciji
- **Tok**:
  1. Korisnik otvara registracionu formu
  2. Unosi korisničko ime, email i lozinku
  3. Sistem validira podatke
  4. Sistem kreira novi nalog
  5. Korisnik se automatski prijavljuje
- **Postuslovi**: Kreiran je novi korisnički nalog

#### UC2: Učenje kroz vežbe
- **Aktor**: Prijavljeni korisnik
- **Preduslovi**: Korisnik je prijavljen
- **Tok**:
  1. Korisnik bira jezik
  2. Bira lekciju iz skill tree-ja
  3. Rešava vežbe (multiple choice, translation, fill-in-blank)
  4. Dobija poene za tačne odgovore
  5. Napreduje kroz lekciju
- **Postuslovi**: Ažuriran je napredak korisnika

#### UC3: Pregled rang liste
- **Aktor**: Korisnik (prijavljen ili ne)
- **Preduslovi**: Pristup aplikaciji
- **Tok**:
  1. Korisnik otvara stranicu sa rang listom
  2. Može da filtrira po jeziku
  3. Vidi rangiranje korisnika po poenima
  4. Može da prelista kroz stranice rezultata
- **Postuslovi**: Prikazana je rang lista

### 2.2 Funkcionalnosti aplikacije

1. **Autentifikacija**
   - Registracija novih korisnika
   - Prijava postojećih korisnika
   - Čuvanje sesije u local storage

2. **Upravljanje jezicima**
   - Prikaz dostupnih jezika sa statistikama
   - Filtriranje jezika po regionu
   - Skill tree vizualizacija napretka

3. **Sistem vežbanja**
   - Multiple choice pitanja
   - Vežbe prevođenja
   - Fill-in-blank zadaci
   - Praćenje poena i streak-a

4. **Profil korisnika**
   - Prikaz statistika učenja
   - Lista dostignuća
   - Istorija aktivnosti
   - Personalizacija profila

5. **Rang lista**
   - Globalno rangiranje
   - Filtriranje po jeziku
   - Paginacija rezultata

6. **API integracije**
   - Dictionary API za definicije reči
   - Quotes API za motivacione citate

### 2.3 Drvo komponenata

#### Tekstualni prikaz:
```
App
├── AppProvider (Context)
├── Router
│   ├── Header (reusable)
│   └── Routes
│       ├── HomePage
│       │   ├── Card (reusable)
│       │   └── Button (reusable)
│       ├── LanguagesPage
│       │   ├── SkillTree
│       │   ├── Card (reusable)
│       │   └── Button (reusable)
│       ├── ExercisePage
│       │   ├── Card (reusable)
│       │   └── Button (reusable)
│       ├── ProfilePage
│       │   ├── Card (reusable)
│       │   └── Button (reusable)
│       ├── LeaderboardPage
│       │   ├── Card (reusable)
│       │   └── Button (reusable)
│       ├── LoginPage
│       │   ├── Card (reusable)
│       │   └── Button (reusable)
│       └── RegisterPage
│           ├── Card (reusable)
│           └── Button (reusable)
```

#### Grafički prikaz hijerarhije:
```
                                    App.tsx
                                       |
                    +------------------+------------------+
                    |                                     |
              AppProvider                              Router
              (Context)                                   |
                                          +---------------+---------------+
                                          |                               |
                                       Header                          Routes
                                    (reusable)                           |
                                                        +----------------+----------------+
                                                        |                                 |
                                                   Page Components                  Common Components
                                                        |                                 |
                                          +-------------+-------------+           +-------+-------+
                                          |                           |           |       |       |
                                     HomePage                  LanguagesPage    Button  Card  Header
                                     LoginPage                 ExercisePage   (reusable components)
                                     RegisterPage              ProfilePage
                                                              LeaderboardPage
```

## 3. Tehnologije, biblioteke i paketi

### 3.1 Osnovne tehnologije
- **React 18.3.1** - JavaScript biblioteka za izgradnju korisničkih interfejsa
- **TypeScript 4.9.5** - Tipiziran superset JavaScript-a
- **React Router DOM 6.28.0** - Deklarativno rutiranje za React

### 3.2 Stilizovanje
- **CSS3** - Kaskadni stilovi sa modernim funkcionalnostima
- **CSS Modules** - Lokalno ograničeni stilovi
- **Responsive Design** - Media queries za mobilne uređaje

### 3.3 State Management
- **React Context API** - Globalno upravljanje stanjem
- **React Hooks** - useState, useEffect, useContext, useNavigate, useLocation

### 3.4 Dodatne biblioteke
- **Web Vitals** - Merenje performansi
- **React Testing Library** - Testiranje komponenti

### 3.5 API integracije
- **Free Dictionary API** - Definicije reči i sinonimi
- **Quotable API** - Motivacioni citati za učenje

## 4. Korisničko uputstvo

### 4.1 Početna stranica
- Prikazuje pregled platforme sa motivacionim citatom koji se dinamički učitava preko Quotable API
- Statistike platforme (27+ jezika, 200+ lekcija, 1000+ vežbi)
- Dugmad za početak učenja i pregled jezika
- Prikaz najpopularnijih jezika sa zastavicama i opisima
- Za prijavljene korisnike: prikaz trenutnog skora, streak-a i broja završenih lekcija

### 4.2 Registracija
- Forma za kreiranje naloga sa poljima: username, email, password, confirm password
- Validacija podataka (minimum 6 karaktera za lozinku, poklapanje lozinki)
- Provera postojanja korisničkog imena
- Automatska prijava nakon uspešne registracije
- Link ka stranici za prijavu za postojeće korisnike

### 4.3 Izbor jezika
- Grid prikaz svih 27+ dostupnih jezika sa zastavicama
- Napredni filteri:
  - Po regionu (All, Popular, European, Asian, Other)
  - Po težini (All Levels, Beginner, Intermediate, Advanced)
  - Sortiranje (Popularity, Name A-Z, Difficulty, Number of Lessons)
  - Opcija za prikaz samo aktivnih kurseva
- Search bar za pretraživanje jezika
- Skill tree vizualizacija za odabrani jezik sa progress tracking-om
- AI generator lekcija dugme

### 4.4 Vežbanje
- Tri tipa vežbi:
  - Multiple choice - izbor tačnog odgovora
  - Translation - prevođenje reči/fraza
  - Fill-in-blank - dopunjavanje rečenica
- Progress bar koji pokazuje napredak kroz lekciju
- Instant feedback sa objašnjenjem za svaki odgovor
- Sistem poena sa bonus poenima za brzinu
- Session storage čuva privremeni napredak
- Timer koji meri vreme rešavanja

### 4.5 Profil
- Prikaz korisničkih informacija (username, email, datum pridruživanja)
- Statistike: trenutni skor, ukupni skor, level, streak
- Lista završenih lekcija
- Sistem dostignuća sa filterima:
  - Po statusu (All, Unlocked, Locked)
  - Sortiranje (Progress, Name, Points)
- Progress bar za svako dostignuće
- Dugme za nastavak učenja

### 4.6 Rang lista
- Prikaz top korisnika sa rang brojem, username, jezikom, skorom i streak-om
- Filtriranje po jeziku (All Languages, English, German, French, Spanish)
- Paginacija sa 5 korisnika po strani
- Navigacija kroz stranice (Previous, brojevi stranica, Next)
- Označavanje trenutnog korisnika na listi
- Prikaz ukupnog broja rezultata

## 5. Reprezentativni delovi koda

### 5.1 Context za globalno stanje
```typescript
// src/context/AppContext.tsx
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const savedState = localStorage.getItem('appState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);
```

### 5.2 Custom Hook za localStorage
```typescript
// src/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
```

### 5.3 API integracija sa Dictionary API
```typescript
// src/services/languageService.ts
static async getWordDefinition(word: string, language: string = 'en'): Promise<WordDefinition | null> {
  const cacheKey = `definition_${language}_${word}`;
  
  if (this.cache.has(cacheKey)) {
    return this.cache.get(cacheKey);
  }

  try {
    const response = await fetch(`${DICTIONARY_API_BASE}/${language}/${word}`);
    if (!response.ok) return null;
    
    const data = await response.json();
    this.cache.set(cacheKey, data[0]);
    return data[0];
  } catch (error) {
    console.error(`Error fetching definition for ${word}:`, error);
    return null;
  }
}
```

### 5.4 Paginacija komponenta
```typescript
// src/pages/LeaderboardPage.tsx
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

const filteredLeaderboard = mockLeaderboard.filter(entry => 
  filter === 'all' || entry.language.toLowerCase() === filter.toLowerCase()
);

const totalPages = Math.ceil(filteredLeaderboard.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const currentItems = filteredLeaderboard.slice(startIndex, startIndex + itemsPerPage);
```

### 5.5 Responsive dizajn
```css
/* src/components/common/Header.css */
@media (max-width: 768px) {
  .header-nav {
    position: fixed;
    top: 60px;
    left: -100%;
    width: 100%;
    background: white;
    flex-direction: column;
    transition: left 0.3s ease;
  }
  
  .header-nav.active {
    left: 0;
  }
}
```

## 6. Link ka GitHub repozitorijumu

https://github.com/[username]/seminarski-rad-web

## 7. Zaključak

Language Learning Platform predstavlja modernu veb aplikaciju za učenje jezika koja koristi najnovije React tehnologije i best practices. Aplikacija je dizajnirana sa fokusom na korisničko iskustvo, skalabilnost i održivost koda.