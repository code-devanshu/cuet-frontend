export interface SummaryItem {
    Category: string;
    Total: number;
    Attempted: number;
    Correct: number;
    Incorrect: number;
    "Not Answered": number;
    Score: number;
  }
  
  export interface StudentInfo {
    Name: string;
    "Application No": string;
  }