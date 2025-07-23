import { Exercise, ExerciseResult, ExerciseType, LessonResult } from '../types';

export class ExerciseManager {
  private exercises: Exercise[];
  private currentExerciseIndex: number;
  private results: ExerciseResult[];
  private startTime: number;

  constructor(exercises: Exercise[]) {
    this.exercises = exercises;
    this.currentExerciseIndex = 0;
    this.results = [];
    this.startTime = Date.now();
  }

  // Metoda za dobijanje trenutne vežbe
  getCurrentExercise(): Exercise | null {
    if (this.currentExerciseIndex >= this.exercises.length) {
      return null;
    }
    return this.exercises[this.currentExerciseIndex];
  }

  // Metoda za submitting odgovora
  submitAnswer(userAnswer: string): ExerciseResult {
    const exercise = this.getCurrentExercise();
    if (!exercise) {
      throw new Error('No current exercise available');
    }

    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    const correct = this.checkAnswer(userAnswer, exercise.correctAnswer);
    const pointsEarned = correct ? exercise.points : 0;

    const result: ExerciseResult = {
      exerciseId: exercise.id,
      correct,
      userAnswer,
      correctAnswer: exercise.correctAnswer,
      timeSpent,
      pointsEarned
    };

    this.results.push(result);
    return result;
  }

  // Metoda za prelazak na sledeću vežbu
  nextExercise(): boolean {
    this.currentExerciseIndex++;
    this.startTime = Date.now(); // reset timer
    return this.currentExerciseIndex < this.exercises.length;
  }

  // Metoda za proveru da li je lekcija završena
  isCompleted(): boolean {
    return this.currentExerciseIndex >= this.exercises.length;
  }

  // Metoda za dobijanje progress-a
  getProgress(): number {
    return Math.round((this.currentExerciseIndex / this.exercises.length) * 100);
  }

  // Metoda za generisanje finalno rezultata lekcije
  generateLessonResult(lessonId: string): LessonResult {
    const totalScore = this.exercises.reduce((sum, ex) => sum + ex.points, 0);
    const score = this.results.reduce((sum, result) => sum + result.pointsEarned, 0);
    const percentage = Math.round((score / totalScore) * 100);

    return {
      lessonId,
      score,
      totalScore,
      percentage,
      exerciseResults: [...this.results],
      completedAt: new Date()
    };
  }

  // Privatna metoda za proveru odgovora
  private checkAnswer(userAnswer: string, correctAnswer: string): boolean {
    // Normalizacija odgovora (uklanjanje beline, lowercase)
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = correctAnswer.trim().toLowerCase();
    
    return normalizedUser === normalizedCorrect;
  }

  // Metoda za mešanje opcija (za multiple choice)
  shuffleOptions(options: string[]): string[] {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Metoda za generisanje hint-a
  generateHint(exercise: Exercise): string {
    switch (exercise.type) {
      case 'translation':
        return `Hint: The answer starts with "${exercise.correctAnswer.charAt(0).toUpperCase()}"`;
      case 'fill-in-blank':
        return `Hint: The word has ${exercise.correctAnswer.length} letters`;
      case 'multiple-choice':
        return 'Hint: Read all options carefully';
      default:
        return 'Think carefully about your answer';
    }
  }

  // Metoda za dobijanje statistike
  getStatistics() {
    const total = this.results.length;
    const correct = this.results.filter(r => r.correct).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const averageTime = total > 0 ? 
      this.results.reduce((sum, r) => sum + r.timeSpent, 0) / total : 0;

    return {
      total,
      correct,
      accuracy,
      averageTime: Math.round(averageTime)
    };
  }

  // Metoda za reset
  reset(): void {
    this.currentExerciseIndex = 0;
    this.results = [];
    this.startTime = Date.now();
  }
} 