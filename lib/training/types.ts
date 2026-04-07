export interface Fact {
  label: string;
  value: string;
}

export interface Pillar {
  name: string;
  sub: string;
  text: string;
}

export interface Standard {
  p: string;
  e: string;
}

export interface AvoidWord {
  w: string;
  r: string;
}

export interface Cuvee {
  name: string;
  blend: string;
  dosage: string;
  aging: string;
  spirit: string;
  bottles: string;
}

export interface TimelineEntry {
  year: string;
  name: string;
  note: string;
}

export interface Scenario {
  trigger: string;
  response: string;
}

export interface InternalExternal {
  internal: string;
  external: string;
}

export interface Section {
  id: string;
  label: string;
  title: string;
  body?: string[];
  facts?: Fact[];
  pillars?: Pillar[];
  standards?: Standard[];
  avoid?: AvoidWord[];
  rule?: string;
  constitutional?: string;
  lexicon?: Record<string, string[]>;
  quote?: string;
  timeline?: TimelineEntry[];
  cuvees?: Cuvee[];
  specs?: Standard[];
  sensory?: string;
  posture?: string[];
  ifUnsure?: string;
  scenarios?: Scenario[];
  internalExternal?: InternalExternal;
  allocationNote?: string;
  invariants?: string[];
  governanceNote?: string;
}

export interface QuizQuestion {
  type?: "scenario";
  q: string;
  opts?: string[];
  a?: number;
  exp?: string;
  rubric?: string[];
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export interface Module {
  number: string;
  label: string;
  sections: Section[];
  quiz: Quiz;
}

export interface Prologue {
  label: string;
  title: string;
  body: string[];
  commitment: string[];
  quote: string;
}

// Database types
export interface Profile {
  id: string;
  full_name: string;
  role: "trainee" | "admin";
  language: "en" | "fr";
  created_at: string;
}

export interface TrainingSession {
  id: string;
  user_id: string;
  language: string;
  started_at: string;
  completed_at: string | null;
}

export interface ModuleProgress {
  id: string;
  session_id: string;
  module_index: number;
  module_label: string;
  best_score: number;
  total_questions: number;
  passed: boolean;
  attempts: number;
  last_attempted_at: string;
  passed_at: string | null;
}

export interface Certificate {
  id: string;
  session_id: string;
  user_id: string;
  participant_name: string;
  overall_score: number;
  overall_total: number;
  language: string;
  issued_at: string;
}
