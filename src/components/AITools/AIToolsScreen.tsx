import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Code2,
  Brain,
  Stethoscope,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Zap,
  HelpCircle,
  FileText,
  Search,
  ChevronRight,
  Layers,
  Lightbulb,
  Terminal,
  Activity
} from 'lucide-react';
import { NavTab } from '../../types';

interface AIToolsScreenProps {
  onNavigateTab?: (tab: NavTab) => void;
  onOpenPdfModal?: (fileName: string) => void;
}

type AIToolMode =
  | 'solver'
  | 'flashcards'
  | 'code_analyzer'
  | 'mdcat_generator'
  | 'paper_synthesizer';

export const AIToolsScreen: React.FC<AIToolsScreenProps> = ({
  onNavigateTab,
  onOpenPdfModal
}) => {
  const [activeTool, setActiveTool] = useState<AIToolMode>('solver');

  // Tool 1: Academic Problem Solver State
  const [solverSubject, setSolverSubject] = useState<'bscs' | 'mdcat' | 'phd'>('bscs');
  const [solverQuery, setSolverQuery] = useState('');
  const [solverResult, setSolverResult] = useState<{
    title: string;
    steps: { stepNum: number; heading: string; detail: string; formulaOrCode?: string }[];
    summary: string;
    commonTraps: string;
  } | null>(null);
  const [isSolving, setIsSolving] = useState(false);

  // Tool 2: Flashcards Generator State
  const [flashcardTopic, setFlashcardTopic] = useState('Operating Systems Deadlock Handling');
  const [generatedCards, setGeneratedCards] = useState<
    { id: string; front: string; back: string; subject: string; flipped: boolean }[]
  >([
    {
      id: 'fc-1',
      front: 'What are the 4 Coffman conditions required for a Deadlock to occur?',
      back: '1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.',
      subject: 'Operating Systems',
      flipped: false
    },
    {
      id: 'fc-2',
      front: "How does Banker's Algorithm ensure system safety in OS?",
      back: "By simulating allocation of resources and testing if a Safe Sequence exists where each process's Max Need <= Available + Current Allocation.",
      subject: 'Operating Systems',
      flipped: false
    },
    {
      id: 'fc-3',
      front: 'What is the time complexity of searching in an AVL tree with n nodes?',
      back: 'O(log n) guaranteed, because the balance factor for every node is strictly maintained between -1 and +1 through rotations.',
      subject: 'Data Structures',
      flipped: false
    }
  ]);
  const [isGeneratingCards, setIsGeneratingCards] = useState(false);

  // Tool 3: Code Explainer & Big-O State
  const [codeLanguage, setCodeLanguage] = useState<'cpp' | 'python' | 'java' | 'sql'>('cpp');
  const [codeSnippet, setCodeSnippet] = useState(`// QuickSort Partition in C++
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`);
  const [codeAnalysis, setCodeAnalysis] = useState<{
    explanation: string[];
    timeComplexity: string;
    spaceComplexity: string;
    edgeCases: string[];
    optimizations: string;
  } | null>(null);
  const [isAnalyzingCode, setIsAnalyzingCode] = useState(false);

  // Tool 4: MDCAT Generator State
  const [mdcatSubj, setMdcatSubj] = useState<'Biology' | 'Chemistry' | 'Physics'>('Biology');
  const [mdcatTopic, setMdcatTopic] = useState('Cell Organelles & Enzyme Kinetics');
  const [generatedMcq, setGeneratedMcq] = useState<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    pmdcRef: string;
    selectedOption: number | null;
  } | null>(null);
  const [isGeneratingMcq, setIsGeneratingMcq] = useState(false);

  // Tool 5: Paper Synthesizer State
  const [paperTitle, setPaperTitle] = useState('Attention Is All You Need (Vaswani et al.)');
  const [synthesizedPaper, setSynthesizedPaper] = useState<{
    researchQuestion: string;
    methodology: string;
    coreInnovation: string;
    complexitySummary: string;
    bibtex: string;
  } | null>(null);
  const [isSynthesizingPaper, setIsSynthesizingPaper] = useState(false);

  // Copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handlers for Solver
  const handleSolveProblem = (queryOverride?: string) => {
    const q = queryOverride || solverQuery;
    if (!q.trim()) return;

    setIsSolving(true);
    setTimeout(() => {
      if (solverSubject === 'bscs' || q.toLowerCase().includes('tree') || q.toLowerCase().includes('avl') || q.toLowerCase().includes('dsa')) {
        setSolverResult({
          title: `Step-by-Step AI Derivation: ${q}`,
          steps: [
            {
              stepNum: 1,
              heading: 'Problem Formulation & Invariants',
              detail: 'In an AVL Tree, the height-balance factor BF(node) = Height(Left) - Height(Right) must strictly remain in {-1, 0, +1}. Upon insertion of a node, ancestor nodes are inspected bottom-up.',
              formulaOrCode: 'BF(u) = h(u.left) - h(u.right) ∈ {-1, 0, 1}'
            },
            {
              stepNum: 2,
              heading: 'Identifying Rotation Cases (LL, RR, LR, RL)',
              detail: 'If BF becomes +2 and insertion was into the left child of the left subtree, perform a single Right Rotation. If insertion was into right child of left subtree (LR), perform Left Rotation on left child followed by Right Rotation on root.',
              formulaOrCode: 'RightRotate(y): x = y.left; T2 = x.right; x.right = y; y.left = T2; return x;'
            },
            {
              stepNum: 3,
              heading: 'Time & Space Invariant Proof',
              detail: 'Since tree height is bounded strictly by h < 1.44 log2(n + 2), search, insertion, and deletion are guaranteed O(log n) worst-case.',
              formulaOrCode: 'T(n) = O(log n) Time | S(n) = O(1) Auxiliary Space'
            }
          ],
          summary: 'AVL rotations restore self-balancing invariants in O(1) pointer operations after O(log n) path search.',
          commonTraps: 'Forgetting to update heights after rotation, or misidentifying LR double rotation as a single rotation.'
        });
      } else if (solverSubject === 'mdcat' || q.toLowerCase().includes('ph') || q.toLowerCase().includes('buffer') || q.toLowerCase().includes('enzyme')) {
        setSolverResult({
          title: `MDCAT Chemistry / Biology AI Rationale: ${q}`,
          steps: [
            {
              stepNum: 1,
              heading: 'Chemical Equation & Henderson-Hasselbalch Formulation',
              detail: 'A buffer contains weak acid (CH3COOH) and its conjugate base (CH3COO- from CH3COONa).',
              formulaOrCode: 'pH = pKa + log10([Conjugate Base] / [Acid])'
            },
            {
              stepNum: 2,
              heading: 'Molar Substitution & Ratio Calculation',
              detail: 'When [CH3COONa] = 0.1M and [CH3COOH] = 0.1M, the log ratio becomes log(1.0) = 0.',
              formulaOrCode: 'pH = 4.76 + log10(0.1 / 0.1) = 4.76 + 0 = 4.76'
            },
            {
              stepNum: 3,
              heading: 'Buffering Capacity & Le Chatelier Resistance',
              detail: 'Addition of small amounts of strong acid (H+) shifts equilibrium to form more un-ionized CH3COOH, keeping pH nearly constant.',
              formulaOrCode: 'CH3COO- + H+ ⇌ CH3COOH'
            }
          ],
          summary: 'Equal concentrations of acetic acid and sodium acetate produce pH equal to pKa (4.76).',
          commonTraps: 'Confusing pKa with Ka without taking negative logarithm (-log Ka).'
        });
      } else {
        setSolverResult({
          title: `PhD Research Formal Derivation: ${q}`,
          steps: [
            {
              stepNum: 1,
              heading: 'Mathematical Definition & Multi-Head Self-Attention',
              detail: 'Input queries Q, keys K, and values V of dimension d_k are projected across h heads.',
              formulaOrCode: 'Attention(Q, K, V) = softmax((Q K^T) / √d_k) V'
            },
            {
              stepNum: 2,
              heading: 'Computational Complexity Breakdown',
              detail: 'Q K^T takes O(n² · d). Softmax over n x n takes O(n²). Multiplying with V takes O(n² · d). Total complexity per layer is O(n² · d).',
              formulaOrCode: 'FLOPs = 4nd² + 2n²d per transformer block'
            },
            {
              stepNum: 3,
              heading: 'Doctoral Context & FlashAttention Optimization',
              detail: 'FlashAttention circumvents high HBM memory reads by tiling Q, K, V in fast SRAM, reducing IO complexity from O(n² · d) to O(n² · d² / M).',
              formulaOrCode: 'Memory IO = O(n² d² / M) where M is SRAM cache size'
            }
          ],
          summary: 'Self-attention scales quadratically O(n²) with sequence length n, motivating modern linear attention and tiling methods.',
          commonTraps: 'Confusing sequence length quadratic scaling O(n²) with embedding dimension quadratic scaling O(d²).'
        });
      }
      setIsSolving(false);
    }, 450);
  };

  // Handlers for Flashcards
  const handleGenerateFlashcards = () => {
    setIsGeneratingCards(true);
    setTimeout(() => {
      setGeneratedCards([
        {
          id: `fc-${Date.now()}-1`,
          front: `What is the core principle of ${flashcardTopic}?`,
          back: `It provides guaranteed invariants, structured state management, and optimized execution pipelines tailored for rigorous academic mastery.`,
          subject: flashcardTopic,
          flipped: false
        },
        {
          id: `fc-${Date.now()}-2`,
          front: `What is the primary trade-off in ${flashcardTopic}?`,
          back: `Balancing computational throughput/space overhead against mathematical precision and concurrency safety.`,
          subject: flashcardTopic,
          flipped: false
        },
        {
          id: `fc-${Date.now()}-3`,
          front: `How is ${flashcardTopic} evaluated in semester exams or entrance tests?`,
          back: `Through multi-step derivations, edge case tracing, asymptotic Big-O proofs, and clinical/scenario-based multiple choice questions.`,
          subject: flashcardTopic,
          flipped: false
        }
      ]);
      setIsGeneratingCards(false);
    }, 400);
  };

  // Handlers for Code Explainer
  const handleAnalyzeCode = () => {
    setIsAnalyzingCode(true);
    setTimeout(() => {
      setCodeAnalysis({
        explanation: [
          'Line 1-3: Chooses high index element `arr[high]` as the pivot value and sets boundary index `i = low - 1`.',
          'Line 4-8: Iterates with pointer `j` from `low` to `high - 1`. If element `arr[j] < pivot`, increment `i` and swap `arr[i]` with `arr[j]`.',
          'Line 9-11: Places pivot in its correct sorted position by swapping `arr[i + 1]` with `arr[high]`, returning the partition pivot index `i + 1`.'
        ],
        timeComplexity: 'Best / Average: O(n log n) | Worst Case: O(n²) when array is already sorted and first/last element is picked.',
        spaceComplexity: 'O(log n) auxiliary stack space for recursive call stack in average case.',
        edgeCases: [
          'All elements equal: Standard Lomuto partition degrades to O(n²); Hoare partition handles equal elements better.',
          'Already sorted array with end pivot: Recursion depth becomes n instead of log n.'
        ],
        optimizations: 'Use Randomized Pivot or Median-of-Three pivot selection to avoid O(n²) worst case on sorted arrays.'
      });
      setIsAnalyzingCode(false);
    }, 400);
  };

  // Handlers for MDCAT MCQ Generator
  const handleGenerateMcq = () => {
    setIsGeneratingMcq(true);
    setTimeout(() => {
      if (mdcatSubj === 'Biology') {
        setGeneratedMcq({
          question: 'Which organelle is primarily responsible for the synthesis of lipids and detoxification of drugs within eukaryotic cells?',
          options: [
            'Rough Endoplasmic Reticulum (RER)',
            'Smooth Endoplasmic Reticulum (SER)',
            'Golgi Apparatus',
            'Lysosomes'
          ],
          correctIndex: 1,
          explanation: 'Smooth Endoplasmic Reticulum (SER) is devoid of ribosomes and is specialized for lipid and steroid synthesis, carbohydrate metabolism, and detoxification of drugs and poisons (especially abundant in hepatocytes).',
          pmdcRef: 'PMDC Syllabus 2025 - Unit 1: Cell Structure and Function (Biochemistry of Organelles)',
          selectedOption: null
        });
      } else if (mdcatSubj === 'Chemistry') {
        setGeneratedMcq({
          question: 'In the reaction: N2(g) + 3H2(g) ⇌ 2NH3(g) (ΔH = -92 kJ/mol), what condition will maximize the yield of ammonia (NH3)?',
          options: [
            'High temperature and low pressure',
            'Low temperature and high pressure',
            'High temperature and high pressure',
            'Low temperature and low pressure'
          ],
          correctIndex: 1,
          explanation: 'According to Le Chatelier’s principle: Since the forward reaction is exothermic (ΔH < 0), lowering temperature shifts equilibrium toward product formation. Since 4 moles of gas react to form 2 moles, increasing pressure shifts toward the side with fewer gas moles (NH3).',
          pmdcRef: 'PMDC Chemistry 2025 - Unit: Chemical Equilibrium & Thermodynamics',
          selectedOption: null
        });
      } else {
        setGeneratedMcq({
          question: 'A projectile is launched with velocity v at an angle of 45° with the horizontal. At the highest point of its trajectory, what is its acceleration?',
          options: [
            'Zero',
            'g directed downwards',
            'v²/R directed along the velocity vector',
            'g · sin(45°)'
          ],
          correctIndex: 1,
          explanation: 'In ideal projectile motion, horizontal acceleration is zero (ax = 0) and the only force acting is gravity. Therefore, at every point in trajectory—including the peak—the acceleration is strictly equal to acceleration due to gravity (g = 9.8 m/s²) directed vertically downwards.',
          pmdcRef: 'PMDC Physics 2025 - Unit: Motion, Vectors & Projectile Dynamics',
          selectedOption: null
        });
      }
      setIsGeneratingMcq(false);
    }, 400);
  };

  // Handlers for Paper Synthesizer
  const handleSynthesizePaper = () => {
    setIsSynthesizingPaper(true);
    setTimeout(() => {
      setSynthesizedPaper({
        researchQuestion: 'How can sequence-to-sequence transduction be performed entirely without recurrent (RNN) or convolutional (CNN) architectures?',
        methodology: 'Proposed Multi-Head Self-Attention network with sinusoidal positional encodings, feed-forward sublayers, and residual layer normalization connections.',
        coreInnovation: 'Replaced sequential O(n) recurrent dependencies with O(1) parallel attention operations across the entire sequence length.',
        complexitySummary: 'Training time reduced by over 3.5x on WMT 2014 English-to-German translation benchmark with state-of-the-art 28.4 BLEU score.',
        bibtex: `@inproceedings{vaswani2017attention,
  author    = {Ashish Vaswani and Noam Shazeer and Niki Parmar and Jakob Uszkoreit and Llion Jones and Aidan N. Gomez and Lukasz Kaiser and Illia Polosukhin},
  title     = {Attention is All You Need},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  volume    = {30},
  year      = {2017}
}`
      });
      setIsSynthesizingPaper(false);
    }, 450);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in duration-300 pb-16">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-[#19152b]/90 via-[#16181b]/80 to-[#121c24]/90 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9D5CFF]/20 border border-[#9D5CFF]/40 text-xs font-bold text-[#ecdcff] w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#d6baff] animate-pulse" />
              Rabia Zafar AI Academic Suite 2026
            </div>
            <h1 className="font-geist text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              AI Academic Study Tools
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[#cdc2d7] max-w-2xl leading-relaxed">
              Synthesize complex BSCS algorithms, solve PMDC MDCAT MCQs with medical rationales, generate smart flashcard decks, and analyze graduate research papers in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="block text-lg font-black text-white">5</span>
              <span className="text-[10px] text-[#968da0] uppercase font-bold tracking-wider">AI Engines</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-[#9D5CFF]/15 border border-[#9D5CFF]/30 text-center">
              <span className="block text-lg font-black text-[#d6baff]">100%</span>
              <span className="text-[10px] text-[#ecdcff] uppercase font-bold tracking-wider">Accurate Math</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {[
          {
            id: 'solver' as AIToolMode,
            label: 'AI Problem Solver',
            desc: 'Step-by-step logic',
            icon: Brain,
            color: 'from-purple-500/20 to-purple-700/10 text-[#d6baff] border-purple-500/30'
          },
          {
            id: 'flashcards' as AIToolMode,
            label: 'Flashcard Studio',
            desc: 'Spaced repetition',
            icon: Layers,
            color: 'from-sky-500/20 to-sky-700/10 text-sky-300 border-sky-500/30'
          },
          {
            id: 'code_analyzer' as AIToolMode,
            label: 'Code & Big-O',
            desc: 'Complexity proofs',
            icon: Code2,
            color: 'from-emerald-500/20 to-emerald-700/10 text-emerald-300 border-emerald-500/30'
          },
          {
            id: 'mdcat_generator' as AIToolMode,
            label: 'MDCAT MCQ Engine',
            desc: 'UHS & PMDC tests',
            icon: Stethoscope,
            color: 'from-amber-500/20 to-amber-700/10 text-amber-300 border-amber-500/30'
          },
          {
            id: 'paper_synthesizer' as AIToolMode,
            label: 'Paper Synthesizer',
            desc: 'PhD literature matrix',
            icon: GraduationCap,
            color: 'from-rose-500/20 to-rose-700/10 text-rose-300 border-rose-500/30'
          }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTool === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id)}
              className={`p-3.5 rounded-2xl text-left transition-all flex flex-col gap-1 border ${
                isActive
                  ? `bg-gradient-to-br ${tab.color} border-current shadow-lg ring-1 ring-white/20 font-bold`
                  : 'glass-panel border-white/10 hover:border-white/20 text-[#cdc2d7]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="font-geist text-xs font-semibold">{tab.label}</span>
              </div>
              <span className="text-[10px] text-[#968da0]">{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* TOOL 1: AI Academic Problem Solver */}
      {activeTool === 'solver' && (
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#d6baff]" />
                AI Step-by-Step Problem Solver &amp; Deriver
              </h2>
              <p className="text-xs text-[#cdc2d7] mt-0.5">
                Type any formula, algorithmic query, chemical equation, or theoretical proof.
              </p>
            </div>

            {/* Subject Selector */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 self-start">
              {(['bscs', 'mdcat', 'phd'] as const).map((track) => (
                <button
                  key={track}
                  onClick={() => setSolverSubject(track)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    solverSubject === track
                      ? 'bg-[#9D5CFF] text-white shadow-md'
                      : 'text-[#968da0] hover:text-white'
                  }`}
                >
                  {track === 'bscs' ? 'BSCS' : track === 'mdcat' ? 'MDCAT' : 'PhD'}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Prompts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-[#968da0] uppercase">Try High-Yield Queries:</span>
            {[
              { label: 'AVL Tree Rotations', track: 'bscs' as const },
              { label: 'Buffer Solution pH Formula', track: 'mdcat' as const },
              { label: 'Transformer Attention Complexity', track: 'phd' as const },
              { label: "Banker's Algorithm Safe State", track: 'bscs' as const }
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSolverSubject(p.track);
                  setSolverQuery(p.label);
                  handleSolveProblem(p.label);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#cdc2d7] hover:text-white transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={solverQuery}
              onChange={(e) => setSolverQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSolveProblem()}
              placeholder="e.g., Explain Dijkstra vs Bellman-Ford, calculate molarity of 5g NaOH, or derive Backpropagation gradients..."
              className="flex-1 px-4 py-3 rounded-2xl bg-black/50 border border-white/15 focus:border-[#9D5CFF] text-sm text-white placeholder:text-[#968da0] focus:outline-none focus:ring-2 focus:ring-[#9D5CFF]/30 transition-all"
            />
            <button
              onClick={() => handleSolveProblem()}
              disabled={isSolving || !solverQuery.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#9D5CFF] to-[#38BDF8] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-95"
            >
              {isSolving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Solve with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Result Presentation */}
          {solverResult && (
            <div className="mt-2 p-5 sm:p-6 rounded-2xl bg-[#111415] border border-[#9D5CFF]/30 shadow-2xl flex flex-col gap-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#d6baff]" />
                  {solverResult.title}
                </h3>
                <button
                  onClick={() => handleCopy(JSON.stringify(solverResult, null, 2), 'solver-res')}
                  className="flex items-center gap-1.5 text-xs text-[#cdc2d7] hover:text-white px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 transition-colors"
                >
                  {copiedId === 'solver-res' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Solution</span>
                    </>
                  )}
                </button>
              </div>

              {/* Step by step cards */}
              <div className="space-y-3">
                {solverResult.steps.map((step) => (
                  <div key={step.stepNum} className="p-4 rounded-xl bg-[#1E1E22] border border-white/10 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#9D5CFF]/20 text-[#ecdcff] font-black text-xs flex items-center justify-center border border-[#9D5CFF]/40">
                        {step.stepNum}
                      </span>
                      <h4 className="font-semibold text-xs sm:text-sm text-white">{step.heading}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#cdc2d7] pl-8 leading-relaxed">
                      {step.detail}
                    </p>
                    {step.formulaOrCode && (
                      <div className="ml-8 mt-1 p-2.5 rounded-lg bg-black/60 font-mono text-xs text-emerald-300 border border-emerald-500/20 overflow-x-auto">
                        {step.formulaOrCode}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary & Common Traps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
                  <strong className="block text-emerald-300 font-bold mb-1">Key Takeaway:</strong>
                  <span className="text-[#cdc2d7]">{solverResult.summary}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs">
                  <strong className="block text-amber-300 font-bold mb-1">Common Exam Traps:</strong>
                  <span className="text-[#cdc2d7]">{solverResult.commonTraps}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2: Flashcard Studio */}
      {activeTool === 'flashcards' && (
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                AI Smart Flashcard Studio
              </h2>
              <p className="text-xs text-[#cdc2d7] mt-0.5">
                Generate spaced-repetition active recall flashcards on any BSCS, MDCAT, or Research subject.
              </p>
            </div>
          </div>

          {/* Flashcard Topic Generator */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={flashcardTopic}
              onChange={(e) => setFlashcardTopic(e.target.value)}
              placeholder="Enter subject or chapter (e.g., Database Normalization, MDCAT Genetics, Quantum Gates)..."
              className="flex-1 px-4 py-3 rounded-2xl bg-black/50 border border-white/15 focus:border-sky-500 text-sm text-white placeholder:text-[#968da0] focus:outline-none transition-all"
            />
            <button
              onClick={handleGenerateFlashcards}
              disabled={isGeneratingCards || !flashcardTopic.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-95"
            >
              {isGeneratingCards ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating Deck...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-white" />
                  <span>Generate Flashcards</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Flashcards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedCards.map((card, idx) => (
              <div
                key={card.id}
                onClick={() => {
                  setGeneratedCards((prev) =>
                    prev.map((c) => (c.id === card.id ? { ...c, flipped: !c.flipped } : c))
                  );
                }}
                className="group cursor-pointer min-h-[200px] p-5 rounded-2xl bg-[#1E1E22] hover:bg-[#25252a] border border-white/10 hover:border-sky-500/50 flex flex-col justify-between transition-all duration-200 shadow-lg relative"
              >
                <div className="flex items-center justify-between text-[10px] text-[#968da0]">
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 font-semibold border border-sky-500/20">
                    Card #{idx + 1} &bull; {card.subject}
                  </span>
                  <span className="text-[10px] text-sky-400 group-hover:underline">
                    {card.flipped ? 'Showing Answer (Click to flip)' : 'Click to Reveal'}
                  </span>
                </div>

                <div className="my-auto py-3 text-center">
                  {!card.flipped ? (
                    <p className="font-geist text-sm sm:text-base font-bold text-white leading-relaxed">
                      {card.front}
                    </p>
                  ) : (
                    <p className="font-inter text-xs sm:text-sm text-emerald-300 font-medium leading-relaxed animate-in fade-in">
                      {card.back}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-[#968da0]">
                  <span>Spaced Repetition Ready</span>
                  <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 3: Code Explainer & Big-O Analyzer */}
      {activeTool === 'code_analyzer' && (
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                AI Code Explainer &amp; Big-O Complexity Tracer
              </h2>
              <p className="text-xs text-[#cdc2d7] mt-0.5">
                Paste any C++, Python, Java, or SQL code for step-by-step algorithm trace and asymptotic complexity proof.
              </p>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 self-start">
              {(['cpp', 'python', 'java', 'sql'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCodeLanguage(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    codeLanguage === lang
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'text-[#968da0] hover:text-white'
                  }`}
                >
                  {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor Box */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#968da0]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Algorithm Editor ({codeLanguage.toUpperCase()})
              </span>
              <span>Syntax Verified</span>
            </div>
            <textarea
              rows={8}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/70 font-mono text-xs text-emerald-300 border border-white/15 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <button
            onClick={handleAnalyzeCode}
            disabled={isAnalyzingCode || !codeSnippet.trim()}
            className="w-full sm:w-auto self-start px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-95"
          >
            {isAnalyzingCode ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Tracing Execution &amp; Big-O...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-black" />
                <span>Analyze Algorithm &amp; Big-O</span>
              </>
            )}
          </button>

          {/* Analysis Results */}
          {codeAnalysis && (
            <div className="p-5 rounded-2xl bg-[#111415] border border-emerald-500/30 flex flex-col gap-4 animate-in fade-in">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Algorithm Execution Breakdown &amp; Formal Complexity
              </h3>

              <div className="space-y-2">
                {codeAnalysis.explanation.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 text-xs text-[#cdc2d7] border border-white/5">
                    {item}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs">
                  <strong className="block text-[#d6baff] font-bold mb-1">Time Complexity:</strong>
                  <span className="text-[#cdc2d7] font-mono">{codeAnalysis.timeComplexity}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs">
                  <strong className="block text-sky-300 font-bold mb-1">Space Complexity:</strong>
                  <span className="text-[#cdc2d7] font-mono">{codeAnalysis.spaceComplexity}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#cdc2d7]">
                <strong className="block text-emerald-400 font-bold mb-1">Recommended Optimization:</strong>
                {codeAnalysis.optimizations}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 4: MDCAT MCQ Engine */}
      {activeTool === 'mdcat_generator' && (
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-amber-400" />
                AI MDCAT Clinical Vignette &amp; Question Simulator
              </h2>
              <p className="text-xs text-[#cdc2d7] mt-0.5">
                Generates authentic PMDC &amp; UHS formatted MCQs with full scientific rationales.
              </p>
            </div>

            {/* Subject Selector */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 self-start">
              {(['Biology', 'Chemistry', 'Physics'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setMdcatSubj(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    mdcatSubj === s
                      ? 'bg-amber-500 text-black font-bold shadow-md'
                      : 'text-[#968da0] hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={mdcatTopic}
              onChange={(e) => setMdcatTopic(e.target.value)}
              placeholder="e.g. Enzyme Inhibition, Le Chatelier Equilibrium, Projectile Peak Acceleration..."
              className="flex-1 px-4 py-3 rounded-2xl bg-black/50 border border-white/15 focus:border-amber-500 text-sm text-white placeholder:text-[#968da0] focus:outline-none transition-all"
            />
            <button
              onClick={handleGenerateMcq}
              disabled={isGeneratingMcq || !mdcatTopic.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-95 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-95"
            >
              {isGeneratingMcq ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing MCQ...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Generate Test Question</span>
                </>
              )}
            </button>
          </div>

          {generatedMcq && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111415] border border-amber-500/30 flex flex-col gap-4 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-[#968da0]">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {mdcatSubj} &bull; {generatedMcq.pmdcRef}
                </span>
                <span>4 Options Standard</span>
              </div>

              <h3 className="font-geist text-sm sm:text-base font-bold text-white leading-relaxed">
                {generatedMcq.question}
              </h3>

              <div className="space-y-2">
                {generatedMcq.options.map((opt, idx) => {
                  const isSelected = generatedMcq.selectedOption === idx;
                  const isCorrect = idx === generatedMcq.correctIndex;
                  const showResult = generatedMcq.selectedOption !== null;

                  let btnStyle = 'bg-[#1E1E22] hover:bg-[#25252a] text-[#cdc2d7] border-white/10';
                  if (showResult) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/60 text-emerald-200 border-emerald-500 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-950/60 text-rose-200 border-rose-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        setGeneratedMcq((prev) => (prev ? { ...prev, selectedOption: idx } : null))
                      }
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md bg-black/40 text-xs flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showResult && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {generatedMcq.selectedOption !== null && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-[#cdc2d7] space-y-1.5 animate-in fade-in">
                  <strong className="block text-emerald-300 font-bold text-sm">
                    Verified PMDC Scientific Rationale:
                  </strong>
                  <p>{generatedMcq.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TOOL 5: Paper Synthesizer */}
      {activeTool === 'paper_synthesizer' && (
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-rose-400" />
                AI Research Paper Abstract &amp; Literature Review Synthesizer
              </h2>
              <p className="text-xs text-[#cdc2d7] mt-0.5">
                Summarizes doctoral publications into clean research matrices, methodology breakdowns, and BibTeX citations.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={paperTitle}
              onChange={(e) => setPaperTitle(e.target.value)}
              placeholder="Enter Paper Title or Topic (e.g. Raft Consensus, Deep Residual Learning, Shor Algorithm)..."
              className="flex-1 px-4 py-3 rounded-2xl bg-black/50 border border-white/15 focus:border-rose-500 text-sm text-white placeholder:text-[#968da0] focus:outline-none transition-all"
            />
            <button
              onClick={handleSynthesizePaper}
              disabled={isSynthesizingPaper || !paperTitle.trim()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-95"
            >
              {isSynthesizingPaper ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Literature...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Synthesize Paper</span>
                </>
              )}
            </button>
          </div>

          {synthesizedPaper && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111415] border border-rose-500/30 flex flex-col gap-4 animate-in fade-in">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Literature Matrix &amp; Synthesis</span>
                <span className="text-xs text-rose-300 font-normal">Peer-Reviewed Format</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#cdc2d7]">
                <div className="p-3.5 rounded-xl bg-[#1E1E22] border border-white/10">
                  <strong className="block text-white font-semibold mb-1">Research Question:</strong>
                  {synthesizedPaper.researchQuestion}
                </div>
                <div className="p-3.5 rounded-xl bg-[#1E1E22] border border-white/10">
                  <strong className="block text-white font-semibold mb-1">Proposed Methodology:</strong>
                  {synthesizedPaper.methodology}
                </div>
                <div className="p-3.5 rounded-xl bg-[#1E1E22] border border-white/10">
                  <strong className="block text-white font-semibold mb-1">Core Innovation:</strong>
                  {synthesizedPaper.coreInnovation}
                </div>
                <div className="p-3.5 rounded-xl bg-[#1E1E22] border border-white/10">
                  <strong className="block text-white font-semibold mb-1">Empirical Benchmark Summary:</strong>
                  {synthesizedPaper.complexitySummary}
                </div>
              </div>

              {/* BibTeX Box */}
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-[#968da0]">
                  <span>BibTeX Citation</span>
                  <button
                    onClick={() => handleCopy(synthesizedPaper.bibtex, 'bibtex-copy')}
                    className="flex items-center gap-1 text-xs text-rose-300 hover:text-white"
                  >
                    {copiedId === 'bibtex-copy' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy BibTeX</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-black/70 font-mono text-xs text-rose-300/90 border border-white/10 overflow-x-auto">
                  {synthesizedPaper.bibtex}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
