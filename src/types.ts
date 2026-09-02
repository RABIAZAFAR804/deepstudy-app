export type NavTab = 'dashboard' | 'summaries' | 'quizzes' | 'community';

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  focusHoursThisWeek: number;
  quizzesMasteredCount: number;
  studyGoalProgress: number; // 0 - 100
  studyGoalRemainingTime: string;
  streakDays: number;
  rankPercentile: string;
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
  category: 'Science' | 'Math' | 'Humanities' | 'Neuroscience';
  durationMinutes: number;
  questionsCount: number;
  bestScore: number | null; // null if not taken
  maxScore: number;
  isLocked: boolean;
  isDailyChallenge?: boolean;
  icon: 'science' | 'calculate' | 'menu_book' | 'timer' | 'brain';
  questions: QuizQuestion[];
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
  type: 'lecture' | 'quiz' | 'group' | 'streak';
}
