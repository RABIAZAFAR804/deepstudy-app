export type NavTab =
  | 'dashboard'
  | 'ai_tools'
  | 'bscs'
  | 'masters_phd'
  | 'mdcat'
  | 'summaries'
  | 'quizzes'
  | 'youtube'
  | 'community';

export type AppTheme = 'dark' | 'light';

export interface UserProfile {
  name: string;
  handle: string;
  email?: string;
  avatar: string;
  focusHoursThisWeek: number;
  quizzesMasteredCount: number;
  studyGoalProgress: number; // 0 - 100
  studyGoalRemainingTime: string;
  streakDays: number;
  rankPercentile: string;
  currentDegree?: string;
}

export interface Lecture {
  id: string;
  code: string;
  subject: string;
  title: string;
  time: string;
  dateStr: string;
  instructor: string;
  location: string;
  status: 'active_now' | 'scheduled' | 'completed';
  icon: 'science' | 'terminal' | 'calculate' | 'book';
  description?: string;
  meetingLink?: string;
  tags: string[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface LectureSummary {
  id: string;
  title: string;
  subject: string;
  subjectTagBg: string;
  subjectTagText: string;
  subjectBorder: string;
  date: string;
  excerpt: string;
  readTime: string;
  fullContent: string;
  keyTakeaways: string[];
  glossary: { term: string; definition: string }[];
  flashcards: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  moduleInfo: string;
  category: 'Science' | 'Math' | 'Humanities' | 'Neuroscience' | 'BSCS' | 'MDCAT' | 'Research';
  durationMinutes: number;
  questionsCount: number;
  bestScore: number | null; // null if not taken
  maxScore: number;
  isLocked: boolean;
  isDailyChallenge?: boolean;
  icon: 'science' | 'calculate' | 'menu_book' | 'timer' | 'brain' | 'code' | 'stethoscope';
  questions: QuizQuestion[];
}

export interface BSCSSubject {
  id: string;
  code: string;
  title: string;
  semester: string;
  creditHours: string;
  category: 'Core' | 'Advanced' | 'Software' | 'AI & Systems';
  icon: string;
  color: string;
  overview: string;
  keyTopics: string[];
  cheatSheetSummary: string;
  downloadableDoc: {
    fileName: string;
    fileSize: string;
    pages: number;
    description: string;
  };
  recommendedBooks: string[];
  topAlgorithmsOrConcepts: { name: string; complexityOrFormula: string; summary: string }[];
  lectureModules: {
    moduleNumber: number;
    title: string;
    description: string;
    keyPoints: string[];
    codeSnippet?: string;
    codeLang?: string;
  }[];
}

export interface MastersPhDResource {
  id: string;
  title: string;
  level: 'Master (MS/MPhil)' | 'PhD / Doctoral' | 'Post-Doc Research';
  field: 'Artificial Intelligence & LLMs' | 'Distributed Systems & Cloud' | 'Quantum Computing' | 'Research Methodology & Thesis' | 'Statistical Inference';
  author: string;
  year: string;
  citation: string;
  abstract: string;
  keyContributions: string[];
  methodologyOverview: string;
  mathematicalFormulations?: string[];
  thesisGuidelines?: {
    stage: string;
    milestone: string;
    deliverables: string[];
    tips: string;
  }[];
  downloadablePaper: {
    fileName: string;
    fileSize: string;
    pages: number;
    badge: string;
  };
  latexTemplateSnippet?: string;
}

export interface MDCATSubject {
  id: string;
  name: 'Biology' | 'Chemistry' | 'Physics' | 'English & Logic';
  weightage: string;
  totalMarks: number;
  icon: string;
  color: string;
  highYieldTopics: string[];
  formulaSheet: { title: string; formula: string; explanation: string }[];
}

export interface MDCATPastPaper {
  id: string;
  year: number;
  conductingBody: string; // e.g. UHS / PMC / SZABMU / NUMS
  totalQuestions: number;
  durationMinutes: number;
  difficulty: 'Moderate' | 'Challenging' | 'High-Yield';
  subjectsBreakdown: { subject: string; count: number }[];
  downloadablePdf: {
    fileName: string;
    fileSize: string;
    pages: number;
    isSolvablyAnnotated: boolean;
  };
  sampleQuestions: {
    id: string;
    subject: string;
    question: string;
    options: string[];
    correctIndex: number;
    rationale: string;
  }[];
}

export interface YouTubeEducationalChannel {
  id: string;
  channelName: string;
  creator: string;
  category: 'BSCS & Coding' | 'MDCAT & Medical' | 'Master & PhD Research' | 'Math & AI Foundations';
  subscribers: string;
  avatar: string;
  description: string;
  channelUrl: string;
  bestPlaylists: { title: string; videoCount: string; url: string }[];
  featuredVideoTitle: string;
  featuredVideoUrl: string;
  tags: string[];
}

export interface PostComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorHandle: string;
  timeAgo: string;
  content: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  timeAgo: string;
  subject: string;
  category: string;
  title: string;
  content: string;
  attachment?: {
    type: 'pdf' | 'link' | 'image';
    fileName: string;
    fileSize: string;
    pageCount?: number;
    url?: string;
  };
  eventDetails?: {
    date: string;
    time: string;
    location: string;
    host: string;
    isJoined?: boolean;
  };
  likesCount: number;
  isLiked?: boolean;
  commentsCount: number;
  comments?: PostComment[];
}

export interface TrendingTopic {
  id: string;
  tag: string;
  postsCount: number;
}

export interface SuggestedGroup {
  id: string;
  name: string;
  membersCount: number;
  subject: string;
  icon: 'code' | 'science' | 'calculate' | 'palette';
  isJoined: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  type: 'lecture' | 'quiz' | 'group' | 'streak' | 'download';
}
