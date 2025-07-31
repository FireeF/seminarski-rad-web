import { User as IUser, UserProgress, ExerciseResult, Achievement } from '../types';

export class User implements IUser {
  id: string;
  username: string;
  email: string;
  currentScore: number;
  totalScore: number;
  streak: number;
  joinedDate: Date;
  completedLessons: string[];
  currentLanguage?: string;
  achievements: Achievement[];

  constructor(
    id: string,
    username: string,
    email: string,
    currentLanguage?: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.currentScore = 0;
    this.totalScore = 0;
    this.streak = 0;
    this.joinedDate = new Date();
    this.completedLessons = [];
    this.currentLanguage = currentLanguage;
    this.achievements = this.initializeAchievements();
  }

  // Inicijalizacija dostignuća
  private initializeAchievements(): Achievement[] {
    return [
      {
        id: 'first-lesson',
        title: 'First Steps',
        description: 'Complete your first lesson',
        unlocked: false,
        points: 10,
        progress: 0
      },
      {
        id: 'streak-7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        unlocked: false,
        points: 50,
        progress: 0
      },
      {
        id: 'score-1000',
        title: 'Thousand Club',
        description: 'Reach 1000 total points',
        unlocked: false,
        points: 100,
        progress: 0
      },
      {
        id: 'polyglot',
        title: 'Polyglot',
        description: 'Start learning 3 different languages',
        unlocked: false,
        points: 75,
        progress: 0
      }
    ];
  }

  // Metoda za dodavanje poena
  addScore(points: number): void {
    this.currentScore += points;
    this.totalScore += points;
    this.updateStreak();
    this.checkAchievements();
  }

  // Metoda za resetovanje trenutnog skora
  resetCurrentScore(): void {
    this.currentScore = 0;
  }

  // Metoda za označavanje lekcije kao završene
  completeLesson(lessonId: string): void {
    if (!this.completedLessons.includes(lessonId)) {
      this.completedLessons.push(lessonId);
      this.checkAchievements();
    }
  }

  // Metoda za proveru i ažuriranje dostignuća
  private checkAchievements(): void {
    this.achievements.forEach(achievement => {
      switch (achievement.id) {
        case 'first-lesson':
          if (this.completedLessons.length >= 1 && !achievement.unlocked) {
            achievement.unlocked = true;
            achievement.unlockedAt = new Date();
            achievement.progress = 100;
          }
          break;
        case 'streak-7':
          achievement.progress = Math.min((this.streak / 7) * 100, 100);
          if (this.streak >= 7 && !achievement.unlocked) {
            achievement.unlocked = true;
            achievement.unlockedAt = new Date();
          }
          break;
        case 'score-1000':
          achievement.progress = Math.min((this.totalScore / 1000) * 100, 100);
          if (this.totalScore >= 1000 && !achievement.unlocked) {
            achievement.unlocked = true;
            achievement.unlockedAt = new Date();
          }
          break;
      }
    });
  }

  // Metoda za računanje nivoa korisnika
  getLevel(): number {
    return Math.floor(this.totalScore / 1000) + 1;
  }

  // Metoda za dobijanje progress procenat
  getProgress(totalLessons: number): number {
    return Math.round((this.completedLessons.length / totalLessons) * 100);
  }

  // Privatna metoda za ažuriranje streak-a
  private updateStreak(): void {
    // Simplifikovana logika - u realnoj aplikaciji bi se čuvao poslednji dan aktivnosti
    this.streak += 1;
  }

  // Metoda za čuvanje u localStorage
  save(): void {
    localStorage.setItem(`user_${this.id}`, JSON.stringify(this));
  }

  // Statička metoda za učitavanje iz localStorage
  static load(id: string): User | null {
    const userData = localStorage.getItem(`user_${id}`);
    if (!userData) return null;

    const data = JSON.parse(userData);
    const user = new User(data.id, data.username, data.email, data.currentLanguage);
    
    // Restauracija svih svojstava
    user.currentScore = data.currentScore || 0;
    user.totalScore = data.totalScore || 0;
    user.streak = data.streak || 0;
    user.joinedDate = new Date(data.joinedDate);
    user.completedLessons = data.completedLessons || [];
    user.achievements = data.achievements || user.initializeAchievements();

    return user;
  }

  // Metoda za export podataka
  export(): IUser {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      currentScore: this.currentScore,
      totalScore: this.totalScore,
      streak: this.streak,
      joinedDate: this.joinedDate,
      completedLessons: [...this.completedLessons],
      currentLanguage: this.currentLanguage,
      achievements: [...this.achievements]
    };
  }
} 