import React, { useState } from 'react';
import { X, Send, Paperclip, Sparkles, Plus } from 'lucide-react';
import { CommunityPost, UserProfile } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onCreatePost: (post: CommunityPost) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  user,
  onCreatePost
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [category, setCategory] = useState<'Notes' | 'Study Session' | 'Question' | 'Discussion'>('Notes');
  const [hasAttachment, setHasAttachment] = useState(false);
  const [attachmentName, setAttachmentName] = useState('Study_Notes_Summary.pdf');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user.name,
      authorHandle: user.handle,
      authorAvatar: user.avatar,
      timeAgo: 'Just now',
      subject,
      category,
      title,
      content,
      attachment: hasAttachment
        ? {
            type: 'pdf',
            fileName: attachmentName,
            fileSize: '1.8 MB',
            pageCount: 8
          }
        : undefined,
      likesCount: 1,
      isLiked: true,
      commentsCount: 0,
      comments: []
    };

    onCreatePost(newPost);
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel bg-[#15181a]/95 rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111415]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9D5CFF]/20 border border-[#9D5CFF]/40 flex items-center justify-center text-[#d6baff]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-geist text-base font-bold text-[#e1e3e4]">
              Share Knowledge / Create Post
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-[#cdc2d7] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Post Title */}
          <div>
            <label className="text-xs font-semibold text-[#cdc2d7] block mb-1">
              Post Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Cheat Sheet for Graph Traversal & Dijkstra"
              className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF]"
            />
          </div>

          {/* Subject & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#cdc2d7] block mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl px-3 py-2 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF]"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="General">General Study</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#cdc2d7] block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl px-3 py-2 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF]"
              >
                <option value="Notes">Notes / Cheat Sheet</option>
                <option value="Study Session">Study Session</option>
                <option value="Question">Academic Question</option>
                <option value="Discussion">Discussion</option>
              </select>
            </div>
          </div>

          {/* Post Content */}
          <div>
            <label className="text-xs font-semibold text-[#cdc2d7] block mb-1">
              Description / Notes Summary
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your findings, problem sets, or study session details..."
              className="w-full bg-[#1E1E22] border border-[#2C2C30] rounded-xl p-3 text-xs md:text-sm text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF] resize-none leading-relaxed"
            />
          </div>

          {/* Attachment Toggle */}
          <div className="p-3.5 rounded-xl bg-[#1E1E22] border border-[#2C2C30] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#cdc2d7] flex items-center gap-2">
                <Paperclip className="w-3.5 h-3.5 text-[#d6baff]" />
                Attach PDF Study File
              </span>
              <button
                type="button"
                onClick={() => setHasAttachment(!hasAttachment)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  hasAttachment
                    ? 'bg-[#9D5CFF]/20 text-[#d6baff] border-[#9D5CFF]'
                    : 'bg-[#191c1d] text-[#968da0] border-[#2C2C30]'
                }`}
              >
                {hasAttachment ? 'Attached' : '+ Add PDF'}
              </button>
            </div>

            {hasAttachment && (
              <input
                type="text"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                placeholder="FileName.pdf"
                className="w-full bg-[#111415] border border-[#2C2C30] rounded-lg px-3 py-1.5 text-xs text-[#e1e3e4] focus:outline-none focus:border-[#9D5CFF]"
              />
            )}
          </div>

          {/* Submit button */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1E1E22] hover:bg-[#282a2b] border border-[#2C2C30] text-xs font-semibold text-[#cdc2d7]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#9D5CFF] hover:bg-[#aa73ff] text-[#0F0F12] font-semibold text-xs flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
