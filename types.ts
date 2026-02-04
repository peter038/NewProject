
export type Attitude = 'HUMOROUS' | 'POLITE' | 'HARDCORE';

export type Asker = 'RELATIVES' | 'NEIGHBOR' | 'PARENTS' | 'STRANGER';

export interface QuestionOption {
  id: string;
  label: string;
  icon: string;
}

export interface GenerationResult {
  reply: string;
  tip: string;
}

export interface AppState {
  view: 'HOME' | 'RESULT';
  selectedQuestionId: string;
  selectedAttitude: Attitude;
  selectedAsker: Asker;
  result: GenerationResult | null;
  loading: boolean;
}
