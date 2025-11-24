// frontend/types/types.ts
export interface DayActivity {
    id: number;
    day: number;
    month: number;
    year: number;
    trainingDone: boolean;
    eventDescription?: string | null;
  }
  