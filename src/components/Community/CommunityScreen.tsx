import React, { useState } from 'react';
import {
  Heart,
  MessageSquare,
  Share2,
  Calendar,
  Plus,
  FileText,
  TrendingUp,
  Users,
  Code,
  FlaskConical,
  ChevronRight,
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import { CommunityPost, TrendingTopic, SuggestedGroup, UserProfile } from '../../types';
import { CreatePostModal } from './CreatePostModal';
import { PdfViewerModal } from './PdfViewerModal';

interface CommunityScreenProps {
  posts: CommunityPost[];
  trendingTopics: TrendingTopic[];
  suggestedGroups: SuggestedGroup[];
  user: UserProfile;
  onToggleLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onToggleJoinGroup: (groupId: string) => void;
  onToggleJoinEvent: (postId: string) => void;
  onCreatePost: (newPost: CommunityPost) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  posts,
  trendingTopics,
  suggestedGroups,
  user,
  onToggleLikePost,
  onAddComment,
  onToggleJoinGroup,
  onToggleJoinEvent,
  onCreatePost
}) => {
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [activePostForComments, setActivePostForComments] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const topics = ['All Topics', 'Mathematics', 'Computer Science', 'Physics'];

  const filteredPosts = posts.filter((post) => {
    if (selectedTopic === 'All Topics') return true;
    return (
      post.subject.toLowerCase() === selectedTopic.toLowerCase() ||
      post.category.toLowerCase() === selectedTopic.toLowerCase() ||
      post.title.toLowerCase().includes(selectedTopic.toLowerCase())
    );
  });

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`https://deepstudy.app/community/post/${postId}`);
    setCopiedShareId(postId);
    setTimeout(() => setCopiedShareId(null), 2000);
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(postId, commentInput.trim());
    setCommentInput('');
  };

  const getGroupIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-5 h-5 text-[#d6baff]" />;
      case 'science':
        return <FlaskConical className="w-5 h-5 text-[#d6baff]" />;
      default:
        return <Users className="w-5 h-5 text-[#d6baff]" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in duration-300 relative pb-12">
      {/* Header & Topic Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-geist text-2xl md:text-3xl font-bold text-[#e1e3e4] tracking-tight">
            Community Hub
          </h1>
          <p className="font-inter text-xs md:text-sm text-[#cdc2d7] mt-0.5">
            Connect, share notes, and join study groups.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-1.5 rounded-full text-xs font-geist whitespace-nowrap transition-all ${
                selectedTopic === topic
                  ? 'bg-[#9D5CFF]/20 text-[#d6baff] border border-[#9D5CFF]/60 font-semibold shadow-sm'
                  : 'bg-[#1E1E22] text-[#cdc2d7] hover:text-[#e1e3e4] border border-[#2C2C30]'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Feed & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feed Column (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="glass-panel rounded-2xl p-5 md:p-6 border border-white/10 hover:border-[#aa73ff]/40 transition-all shadow-md"
            >
              {/* Author Row */}
              <div className="flex items-start gap-3.5 mb-4">
                {post.authorAvatar.length > 2 ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#2C2C30] shrink-0">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#1E1E22] border border-[#9D5CFF]/40 flex items-center justify-center text-[#d6baff] font-bold font-geist shrink-0">
                    {post.authorAvatar}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-geist text-sm md:text-base font-bold text-[#e1e3e4]">
                      {post.authorName}
                    </h3>
                    <span className="text-[11px] text-[#968da0]">{post.timeAgo}</span>
                  </div>
                  <p className="text-xs text-[#d6baff] font-medium mb-2">{post.authorHandle}</p>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#1E1E22] text-[#cdc2d7] px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border border-[#2C2C30]">
                      {post.subject}
                    </span>
                    <span className="bg-[#1E1E22] text-[#cdc2d7] px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border border-[#2C2C30]">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <h4 className="font-geist text-base md:text-lg font-bold text-[#e1e3e4] mb-2 leading-snug">
                  {post.title}
                </h4>
                <p className="font-inter text-xs md:text-sm text-[#cdc2d7] leading-relaxed mb-4">
                  {post.content}
                </p>

                {/* PDF Attachment Card */}
                {post.attachment && (
                  <div
                    onClick={() => setSelectedPdf(post.attachment!.fileName)}
                    className="bg-[#191c1d] border border-[#2C2C30] hover:border-[#aa73ff]/50 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all group"
                  >
                    <div className="bg-[#9D5CFF]/20 p-3 rounded-xl text-[#d6baff] group-hover:scale-105 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-geist text-xs md:text-sm font-semibold text-[#e1e3e4] group-hover:text-[#d6baff] transition-colors mb-0.5">
                        {post.attachment.fileName}
                      </p>
                      <p className="text-[11px] text-[#968da0]">
                        {post.attachment.fileSize} • {post.attachment.pageCount} pages • Click to Preview
                      </p>
                    </div>
                  </div>
                )}

                {/* Event Schedule Box */}
                {post.eventDetails && (
                  <div className="bg-[#191c1d] border border-[#2C2C30] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-[#1E1E22] text-[#d6baff] border border-[#2C2C30]">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-geist text-xs md:text-sm font-semibold text-[#e1e3e4]">
                          {post.eventDetails.date}, {post.eventDetails.time}
                        </p>
                        <p className="text-[11px] text-[#968da0]">
                          {post.eventDetails.location}
                        </p>
                      </div>
                    </div>

                    <button
                      id={`join-group-event-${post.id}`}
                      onClick={() => onToggleJoinEvent(post.id)}
                      className={`font-geist text-xs font-semibold px-4 py-2 rounded-xl transition-all w-full sm:w-auto text-center active:scale-95 ${
                        post.eventDetails.isJoined
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-[#9D5CFF] text-[#0F0F12] hover:bg-[#aa73ff]'
                      }`}
                    >
                      {post.eventDetails.isJoined ? '✓ Joined Session' : 'Join Group'}
                    </button>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-2 text-xs text-[#cdc2d7]">
                <div className="flex items-center gap-6">
                  {/* Like Button */}
                  <button
                    onClick={() => onToggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors group ${
                      post.isLiked ? 'text-[#d6baff]' : 'hover:text-[#d6baff]'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        post.isLiked ? 'fill-[#9D5CFF] text-[#9D5CFF]' : ''
                      }`}
                    />
                    <span className="font-medium">{post.likesCount}</span>
                  </button>

                  {/* Comments Button */}
                  <button
                    onClick={() =>
                      setActivePostForComments(
                        activePostForComments === post.id ? null : post.id
                      )
                    }
                    className="flex items-center gap-1.5 hover:text-[#d6baff] transition-colors group"
                  >
                    <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span className="font-medium">{post.commentsCount}</span>
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(post.id)}
                  className="hover:text-[#d6baff] transition-colors flex items-center gap-1"
                  title="Share link"
                >
                  {copiedShareId === post.id ? (
                    <span className="text-[11px] text-emerald-400 font-medium">Link Copied!</span>
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Expanded Comments Thread */}
              {activePostForComments === post.id && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-in fade-in duration-150">
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comm) => (
                        <div
                          key={comm.id}
                          className="p-3 rounded-xl bg-[#191c1d] border border-[#2C2C30] flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#2C2C30] shrink-0">
                            <img
                              src={comm.authorAvatar}
                              alt={comm.authorName}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#e1e3e4]">
                                {comm.authorName}
                              </span>
                              <span className="text-[10px] text-[#968da0]">{comm.timeAgo}</span>
                            </div>
                            <p className="text-xs text-[#cdc2d7] mt-0.5 leading-relaxed">
                              {comm.content}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#968da0] py-2">No comments yet. Be the first to reply!</p>
                    )}
                  </div>

                  {/* Add Comment Input */}
                  <form
                    onSubmit={(e) => handleCommentSubmit(post.id, e)}
                    className="flex items-center gap-2 pt-1"
                  >
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Write a reply or question..."
                      className="flex-1 bg-[#191c1d] border border-[#2C2C30] rounded-xl px-3 py-2 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF]"
                    />
                    <button
                      type="submit"
                      disabled={!commentInput.trim()}
                      className="px-3.5 py-2 rounded-xl bg-[#9D5CFF] text-[#0F0F12] font-semibold text-xs hover:bg-[#aa73ff] disabled:opacity-50 transition-all flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Sidebar Column (Trending Topics & Suggested Groups: 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Trending Topics */}
          <aside className="glass-panel rounded-2xl p-5 border border-white/10">
            <h3 className="font-geist text-base font-bold text-[#e1e3e4] mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#d6baff]" />
              <span>Trending Topics</span>
            </h3>

            <ul className="flex flex-col gap-3">
              {trendingTopics.map((topic) => (
                <li
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.tag.replace('#', ''))}
                  className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-[#1E1E22] transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-geist text-xs md:text-sm font-semibold text-[#e1e3e4] group-hover:text-[#d6baff] transition-colors">
                      {topic.tag}
                    </span>
                    <span className="text-[11px] text-[#968da0]">{topic.postsCount} posts today</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#968da0] opacity-0 group-hover:opacity-100 transition-opacity" />
                </li>
              ))}
            </ul>
          </aside>

          {/* Suggested Groups */}
          <aside className="glass-panel rounded-2xl p-5 border border-white/10">
            <h3 className="font-geist text-base font-bold text-[#e1e3e4] mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#d6baff]" />
              <span>Suggested Groups</span>
            </h3>

            <div className="flex flex-col gap-3.5">
              {suggestedGroups.map((group) => (
                <div key={group.id} className="flex items-center gap-3 p-2 rounded-xl bg-[#191c1d]/60 border border-[#2C2C30]">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E22] flex items-center justify-center border border-[#2C2C30] shrink-0">
                    {getGroupIcon(group.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-geist text-xs md:text-sm font-semibold text-[#e1e3e4] leading-snug">
                      {group.name}
                    </h4>
                    <p className="text-[11px] text-[#968da0]">{group.membersCount} members</p>
                  </div>
                  <button
                    onClick={() => onToggleJoinGroup(group.id)}
                    className={`font-geist text-[11px] font-semibold px-3 py-1 rounded-full border transition-all active:scale-95 ${
                      group.isJoined
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'text-[#d6baff] hover:text-[#ecdcff] border-[#9D5CFF]/30 hover:bg-[#9D5CFF]/15'
                    }`}
                  >
                    {group.isJoined ? 'Joined' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Action Button (FAB) for Creating Posts */}
      <button
        id="create-post-fab"
        onClick={() => setIsCreatePostOpen(true)}
        className="fixed bottom-20 right-5 md:bottom-8 md:right-8 w-14 h-14 bg-[#9D5CFF] text-[#0F0F12] rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(214,186,255,0.4)] hover:scale-105 active:scale-95 transition-all z-40 group"
        aria-label="Create study post"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300 stroke-[2.5]" />
      </button>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        user={user}
        onCreatePost={onCreatePost}
      />

      {/* PDF Document Preview Modal */}
      <PdfViewerModal
        isOpen={!!selectedPdf}
        onClose={() => setSelectedPdf(null)}
        fileName={selectedPdf || 'CheatSheet.pdf'}
      />
    </div>
  );
};
