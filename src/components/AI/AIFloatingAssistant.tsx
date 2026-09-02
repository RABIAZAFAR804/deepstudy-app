import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Maximize2,
  Minimize2,
  RefreshCw,
  BookOpen,
  Code2,
  Dna,
  GraduationCap,
  Youtube,
  Trash2,
  SidebarClose,
  SidebarOpen,
  HelpCircle
} from 'lucide-react';
import { UserProfile } from '../../types';

interface AIFloatingAssistantProps {
  user: UserProfile;
  activeContext?: string;
  onNavigateTab?: (tab: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  categoryBadge?: string;
}

export const AIFloatingAssistant: React.FC<AIFloatingAssistantProps> = ({
  user,
  activeContext = 'Dashboard',
  onNavigateTab
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDockedSidebar, setIsDockedSidebar] = useState(false);
  const [activeSubjectMode, setActiveSubjectMode] = useState<'General' | 'BSCS' | 'MDCAT' | 'PhD Research'>('General');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello ${user.name}! I am your DeepStudy AI Academic Copilot. How can I assist you today with BSCS subjects, MDCAT past papers, or MS/PhD thesis research?`,
      timestamp: 'Just now',
      categoryBadge: 'Academic Copilot'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: 'Explain Dijkstra Algorithm', category: 'BSCS', text: 'Explain Dijkstra shortest path algorithm with time complexity and C++ heap logic.' },
    { label: 'MDCAT PFK-1 Regulation', category: 'MDCAT', text: 'Why is PFK-1 the rate limiting step of Glycolysis and what molecules activate it?' },
    { label: 'PhD Literature Review Matrix', category: 'PhD Research', text: 'Give me a template and guidelines for structuring a systematic literature review matrix.' },
    { label: 'Top YouTube Channels', category: 'General', text: 'Which YouTube channels are best for BSCS Algorithms and MDCAT Chemistry?' }
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulate intelligent academic response
    setTimeout(() => {
      let aiReply = '';
      let codeSnippet: string | undefined = undefined;

      const lower = text.toLowerCase();

      if (lower.includes('dijkstra') || lower.includes('graph')) {
        aiReply = `### Dijkstra's Shortest Path Algorithm
Dijkstra calculates the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.

**Time Complexity:** $O((V + E) \\log V)$ with a Binary Min-Heap Priority Queue.
**Key Invariant:** Once a node is popped from the min-heap, its shortest distance is finalized.`;
        codeSnippet = `// C++ Dijkstra Min-Heap Priority Queue
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
dist[start] = 0;
pq.push({0, start});
while(!pq.empty()){
    auto [d, u] = pq.top(); pq.pop();
    if(d > dist[u]) continue;
    for(auto& [v, weight] : adj[u]){
        if(dist[u] + weight < dist[v]){
            dist[v] = dist[u] + weight;
            pq.push({dist[v], v});
        }
    }
}`;
      } else if (lower.includes('pfk') || lower.includes('mdcat') || lower.includes('glycolysis') || lower.includes('biology')) {
        aiReply = `### MDCAT Biology: Phosphofructokinase-1 (PFK-1) Regulation
PFK-1 catalyzes the irreversible reaction:
$$\\text{Fructose-6-Phosphate} + \\text{ATP} \\xrightarrow{\\text{PFK-1}} \\text{Fructose-1,6-Bisphosphate} + \\text{ADP}$$

**High-Yield MDCAT Points:**
1. **Rate Limiting:** This is the primary committed step of glycolysis.
2. **Allosteric Activators:** High AMP, Fructose-2,6-bisphosphate ($F-2,6-BP$).
3. **Allosteric Inhibitors:** High ATP (energy surplus), Citrate (Krebs cycle abundance).`;
      } else if (lower.includes('thesis') || lower.includes('phd') || lower.includes('literature') || lower.includes('research')) {
        aiReply = `### Doctoral Research & Literature Matrix Guide
For your graduate thesis, structure your synthesis matrix using the PRISMA framework:

1. **Extraction Dimensions:** Author/Year, Research Question, Core Methodology (e.g., empirical ablation, formal proof), Dataset / Benchmark, and Identified Limitations.
2. **Critical Synthesis:** Group papers by thematic taxonomy rather than summarizing sequentially. Always highlight discrepancies between conflicting studies.`;
      } else if (lower.includes('youtube') || lower.includes('channel')) {
        aiReply = `### Curated Educational Channels on DeepStudy:
1. **BSCS Algorithms & Coding:** Abdul Bari, MIT OpenCourseWare (6.006), CS50 Harvard, freeCodeCamp.
2. **MDCAT & Medical Science:** Dr. Najeeb Lectures, The Organic Chemistry Tutor, Khan Academy Medicine.
3. **Graduate Research & AI:** Two Minute Papers, Yannic Kilcher, Grad Coach.

You can visit the dedicated **YouTube Hub** tab for direct video playlists!`;
      } else {
        aiReply = `I have analyzed your query regarding "${text}". 
In academic studies, breaking down concepts into first principles, mathematical formulas, and active recall flashcards maximizes long-term retention. 

Feel free to ask for specific code implementations in C++/Python, MDCAT past paper derivations, or LaTeX research formatting!`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        codeSnippet: codeSnippet,
        categoryBadge: activeSubjectMode
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `m-init-${Date.now()}`,
        sender: 'ai',
        text: `Chat reset. I am ready to help you with your academic goals, ${user.name}!`,
        timestamp: 'Just now',
        categoryBadge: 'Academic Copilot'
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (when closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in zoom-in-95">
          <button
            id="ai-assistant-toggle"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#9D5CFF] via-[#8B5CF6] to-[#38BDF8] text-white font-geist text-xs font-bold shadow-[0_0_30px_rgba(157,92,255,0.45)] hover:shadow-[0_0_40px_rgba(157,92,255,0.6)] transition-all active:scale-95"
            aria-label="Open DeepStudy AI Copilot"
          >
            <div className="w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-white/80 block uppercase tracking-wider font-semibold">AI Copilot</span>
              <span className="text-xs font-extrabold">Ask Rabia's Academic AI</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
          </button>
        </div>
      )}

      {/* FULL-HEIGHT ACADEMIC COPILOT DOCK (From Header Bottom `top-16` / `top-20` down to Bottom of Screen) */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isDockedSidebar
              ? 'top-16 sm:top-20 right-0 bottom-0 w-full sm:w-[480px] lg:w-[520px] border-l border-white/10 shadow-2xl'
              : 'top-16 sm:top-20 right-4 sm:right-6 bottom-4 sm:bottom-6 w-[calc(100vw-2rem)] sm:w-[460px] md:w-[500px] rounded-3xl border border-[#9D5CFF]/30 shadow-[0_0_50px_rgba(157,92,255,0.3)]'
          } bg-[#111415]/95 backdrop-blur-2xl flex flex-col overflow-hidden text-[#e1e3e4]`}
        >
          {/* Header Bar */}
          <div className="p-4 bg-[#16181b] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#9D5CFF] to-[#38BDF8] flex items-center justify-center shadow-[0_0_12px_rgba(157,92,255,0.4)]">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-geist text-sm font-bold text-white">
                    DeepStudy AI Copilot
                  </h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-[#968da0]">Full-Height Academic Workspace • Context: {activeContext}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsDockedSidebar(!isDockedSidebar)}
                className="p-1.5 rounded-lg text-[#968da0] hover:text-white hover:bg-white/5 transition-colors"
                title={isDockedSidebar ? 'Float Window' : 'Dock to Right Side'}
              >
                {isDockedSidebar ? <SidebarClose className="w-4 h-4" /> : <SidebarOpen className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-[#968da0] hover:text-white hover:bg-white/5 transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#968da0] hover:text-white hover:bg-white/5 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subject Mode Selector */}
          <div className="flex items-center gap-1.5 p-2 bg-[#0F0F12] border-b border-white/5 overflow-x-auto">
            {(['General', 'BSCS', 'MDCAT', 'PhD Research'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveSubjectMode(mode)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                  activeSubjectMode === mode
                    ? 'bg-[#9D5CFF]/20 text-[#d6baff] border border-[#9D5CFF]/40'
                    : 'text-[#968da0] hover:text-white bg-transparent border border-transparent'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] text-[#968da0]">{msg.sender === 'user' ? user.name : 'AI Scholar'}</span>
                  {msg.categoryBadge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-[#d6baff]">
                      {msg.categoryBadge}
                    </span>
                  )}
                  <span className="text-[9px] text-[#968da0]">{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[90%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#9D5CFF] to-[#7C3AED] text-white rounded-br-none shadow-[0_0_15px_rgba(157,92,255,0.2)]'
                      : 'bg-[#191c1d] border border-white/10 text-[#e1e3e4] rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {msg.codeSnippet && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-[#0b0d0e] border border-white/10 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                      <pre>
                        <code>{msg.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-[#191c1d] border border-white/10 rounded-2xl w-fit text-xs text-[#cdc2d7] animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-[#d6baff] animate-spin" />
                <span>Thinking &amp; synthesizing academic rationale...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-4 py-2 bg-[#141618] border-t border-white/5 flex items-center gap-2 overflow-x-auto">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(qp.text)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-[#cdc2d7] whitespace-nowrap transition-all shrink-0 hover:text-white"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3.5 bg-[#16181b] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask ${activeSubjectMode} question, algorithm, or past paper...`}
                className="flex-1 px-3.5 py-2.5 bg-[#0F0F12] border border-white/10 rounded-xl text-xs text-white placeholder-[#968da0] focus:outline-none focus:border-[#9D5CFF]/60"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-[#9D5CFF] hover:bg-[#8b5cf6] disabled:opacity-40 text-white transition-all shadow-[0_0_12px_rgba(157,92,255,0.3)] active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
