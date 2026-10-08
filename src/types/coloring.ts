export type GradeStandard = 'prek_k' | 'grade_1_2' | 'grade_3_5' | 'grade_6_8' | 'grade_9_plus';

export interface StandardInfo {
  id: GradeStandard;
  label: string;
  sublabel: string;
  ageRange: string;
  strokeWidth: number;
  complexityText: string;
  description: string;
  iconName: string;
}

export interface ColoringPage {
  id: string;
  pageNumber: number;
  title: string;
  subject: string;
  sceneDescription: string;
  imagePrompt: string;
  educationalCaption: string;
  difficultyNote: string;
  imageUrl?: string;
  svgContent?: string;
  isGenerating?: boolean;
  error?: string;
}

export interface BookSettings {
  topic: string;
  standard: GradeStandard;
  pageCount: number;
  bookTitle: string;
  studentName: string;
  includeCover: boolean;
  includeCaptions: boolean;
  borderStyle: 'classic' | 'dots' | 'corner' | 'minimal' | 'none';
  generationMode: 'ai-image' | 'ai-svg' | 'smart-auto';
}
