/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavTab, UserProfile, Lecture, LectureSummary, Quiz, CommunityPost, SuggestedGroup, AppNotification } from './types';
import {
  initialUserProfile,
  initialLectures,
  initialSummaries,
  initialQuizzes,
  initialCommunityPosts,
  trendingTopics,
  initialSuggestedGroups,
  initialNotifications
} from './data/mockData';
import { TopAppBar } from './components/Navigation/TopAppBar';
import { SideNav } from './components/Navigation/SideNav';
import { BottomNavBar } from './components/Navigation/BottomNavBar';
import { DashboardScreen } from './components/Dashboard/DashboardScreen';
import { SummariesScreen } from './components/Summaries/SummariesScreen';
import { QuizzesScreen } from './components/Quizzes/QuizzesScreen';
import { CommunityScreen } from './components/Community/CommunityScreen';
import { LiveLectureSessionModal } from './components/Lecture/LiveLectureSessionModal';
import { FocusSessionModal } from './components/Focus/FocusSessionModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [lectures, setLectures] = useState<Lecture[]>(initialLectures);
  const [summaries, setSummaries] = useState<LectureSummary[]>(initialSummaries);
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [posts, setPosts] = useState<CommunityPost[]>(initialCommunityPosts);
  const [suggestedGroups, setSuggestedGroups] = useState<SuggestedGroup[]>(initialSuggestedGroups);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  
  // Modals
  const [activeLiveLecture, setActiveLiveLecture] = useState<Lecture | null>(null);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);

  // Handlers
  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAddSummary = (newSummary: LectureSummary) => {
    setSummaries((prev) => [newSummary, ...prev]);
    // Notify user
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Summary Generated',
        message: `"${newSummary.title}" has been synthesized and saved.`,
        timeAgo: 'Just now',
        read: false,
        type: 'lecture'
      },
      ...prev
    ]);
  };

  const handleUpdateQuizScore = (quizId: string, score: number) => {
    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === quizId) {
          const newBest = q.bestScore === null ? score : Math.max(q.bestScore, score);
          return { ...q, bestScore: newBest };
        }
        return q;
      })
    );

    // Update user stats
    setUser((prev) => ({
      ...prev,
      quizzesMasteredCount: prev.quizzesMasteredCount + 1,
      studyGoalProgress: Math.min(100, prev.studyGoalProgress + 10)
    }));

    // Unlock Victorian Literature if they mastered quizzes
    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === 'quiz-avail-3') {
          return {
            ...q,
            isLocked: false,
            questions: [
              {
                id: 'q-5-1',
                question: 'Which Victorian narrative convention did modernists like Virginia Woolf and James Joyce reject in favor of stream of consciousness?',
                options: [
                  'Linear chronological plot with omniscient narrators',
                  'Use of blank verse',
                  'Gothic atmosphere',
                  'Philosophical dialogues'
                ],
                correctIndex: 0,
                explanation: 'Modernists rebelled against the Victorian ordered, chronological, third-person omniscient worldview, seeking to mirror fragmented internal human cognition.'
              }
            ]
          };
        }
        return q;
      })
    );
  };

  const handleToggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, commentText: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `comm-${Date.now()}`,
            authorName: user.name,
            authorAvatar: user.avatar,
            authorHandle: user.handle,
            timeAgo: 'Just now',
            content: commentText,
            likes: 0
          };
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      })
    );
  };

  const handleToggleJoinGroup = (groupId: string) => {
    setSuggestedGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const isJoined = !g.isJoined;
          return {
            ...g,
            isJoined,
            membersCount: isJoined ? g.membersCount + 1 : g.membersCount - 1
          };
        }
        return g;
      })
    );
  };

  const handleToggleJoinEvent = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && post.eventDetails) {
          return {
            ...post,
            eventDetails: {
              ...post.eventDetails,
              isJoined: !post.eventDetails.isJoined
            }
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = (newPost: CommunityPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLogFocusMinutes = (minutes: number) => {
    const hoursAdded = +(minutes / 60).toFixed(1);
    setUser((prev) => ({
      ...prev,
      focusHoursThisWeek: +(prev.focusHoursThisWeek + hoursAdded).toFixed(1),
      studyGoalProgress: Math.min(100, prev.studyGoalProgress + 15),
      studyGoalRemainingTime:
        prev.studyGoalProgress >= 85 ? 'Goal Reached!' : '1h 20m remaining'
    }));
  };

  const handleTakeQuizForSubject = (subject: string) => {
    setActiveTab('quizzes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F12] text-[#e1e3e4] antialiased selection:bg-[#9D5CFF]/30 selection:text-[#ecdcff]">
      {/* Top App Header */}
      <TopAppBar
        user={user}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onClearAllNotifications={handleClearAllNotifications}
        onOpenFocusMode={() => setIsFocusModalOpen(true)}
      />

      {/* Main Content Layout with Responsive SideNav */}
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-5 md:px-10 py-6 md:py-8 flex gap-8">
        {/* Desktop Side Navigation */}
        <SideNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          streakDays={user.streakDays}
        />

        {/* Dynamic Screen Content */}
        <main className="flex-1 w-full min-w-0 pb-20 md:pb-8">
          {activeTab === 'dashboard' && (
            <DashboardScreen
              user={user}
              lectures={lectures}
              onJoinLecture={(lecture) => setActiveLiveLecture(lecture)}
              onNavigateTab={setActiveTab}
              onOpenFocusMode={() => setIsFocusModalOpen(true)}
            />
          )}

          {activeTab === 'summaries' && (
            <SummariesScreen
              summaries={summaries}
              onAddSummary={handleAddSummary}
              onTakeQuizForSubject={handleTakeQuizForSubject}
            />
          )}

          {activeTab === 'quizzes' && (
            <QuizzesScreen
              quizzes={quizzes}
              user={user}
              onUpdateQuizScore={handleUpdateQuizScore}
            />
          )}

          {activeTab === 'community' && (
            <CommunityScreen
              posts={posts}
              trendingTopics={trendingTopics}
              suggestedGroups={suggestedGroups}
              user={user}
              onToggleLikePost={handleToggleLikePost}
              onAddComment={handleAddComment}
              onToggleJoinGroup={handleToggleJoinGroup}
              onToggleJoinEvent={handleToggleJoinEvent}
              onCreatePost={handleCreatePost}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Live Lecture Session Modal */}
      <LiveLectureSessionModal
        lecture={activeLiveLecture}
        onClose={() => setActiveLiveLecture(null)}
      />

      {/* Focus / Pomodoro Timer Modal */}
      <FocusSessionModal
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        onLogFocusMinutes={handleLogFocusMinutes}
      />
    </div>
  );
}
