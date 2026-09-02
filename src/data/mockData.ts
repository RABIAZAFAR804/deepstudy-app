import {
  UserProfile,
  Lecture,
  LectureSummary,
  Quiz,
  CommunityPost,
  TrendingTopic,
  SuggestedGroup,
  AppNotification
} from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Rabia Zafar',
  handle: '@alex_codes',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJiTOgnrjqydzgGRcRavTC-RnwDLyEiB-cAzRLEZDq_Kx81ZBMUwFfzppoFVMRN-RSeNpwGrs0tVM8RcR_yhWmhrCBKsi-HYHWk_evMhlOioa-EcEFnl1c5O3tojZeqX1dvfVYQVtNwsu7naTTL494NmIMueX32q4lbYrIBQAwQBGbRcfy5PHLyxsX_fFko7yy9fZxHkFuKoJIxeyQcgcZX2IUhWcH1E3nz2fPq4z89S6srKl6OPPz7g',
  focusHoursThisWeek: 14.5,
  quizzesMasteredCount: 8,
  studyGoalProgress: 70,
  studyGoalRemainingTime: '2h 15m remaining',
  streakDays: 14,
  rankPercentile: 'Top 5%'
};

export const initialLectures: Lecture[] = [
  {
    id: 'lec-1',
    code: 'Physics 301',
    subject: 'Physics',
    title: 'Quantum Mechanics Pt. 2',
    time: 'Today, 2:00 PM - 3:30 PM',
    dateStr: 'Today',
    instructor: 'Prof. Julian Vance',
    location: 'Science Hall 304 & Virtual Lab',
    status: 'active_now',
    icon: 'science',
    description: 'Exploring Wave-Particle Duality, Hermitian operators, and time-independent Schrödinger wavefunction approximations in 3D potentials.',
    meetingLink: 'https://deepstudy.internal/room/phys-301-live',
    tags: ['Quantum Mechanics', 'Wave Equation', 'Hermitian Operators']
  },
  {
    id: 'lec-2',
    code: 'CS 410',
    subject: 'Computer Science',
    title: 'Advanced Algorithms',
    time: 'Tomorrow, 10:00 AM - 11:30 AM',
    dateStr: 'Tomorrow',
    instructor: 'Dr. Evelyn Morales',
    location: 'Turing Hall Auditorium',
    status: 'scheduled',
    icon: 'terminal',
    description: 'Network flows, Max-Flow Min-Cut theorem, and polynomial-time reduction strategies for NP-complete graph problems.',
    meetingLink: 'https://deepstudy.internal/room/cs-410-stream',
    tags: ['Graph Algorithms', 'Max Flow', 'Complexity Theory']
  },
  {
    id: 'lec-3',
    code: 'Math 205',
    subject: 'Mathematics',
    title: 'Linear Algebra Review',
    time: 'Wed, 1:00 PM - 2:00 PM',
    dateStr: 'Wednesday',
    instructor: 'Prof. David Chen',
    location: 'Euler Math Center 102',
    status: 'scheduled',
    icon: 'calculate',
    description: 'Eigenvalues, eigenvectors, spectral decomposition, and singular value decomposition (SVD) applied to dimensionality reduction.',
    meetingLink: 'https://deepstudy.internal/room/math-205',
    tags: ['Eigenvalues', 'SVD', 'Matrix Decompositions']
  }
];

export const initialSummaries: LectureSummary[] = [
  {
    id: 'sum-1',
    title: 'Algorithms & Data Structures: Graphs',
    subject: 'Computer Science',
    subjectTagBg: 'bg-[#280057]/60',
    subjectTagText: 'text-[#d6baff]',
    subjectBorder: 'border-[#aa73ff]/30',
    date: 'Oct 24, 2023',
    readTime: '4 min read',
    excerpt: "Introduction to graph theory, spanning trees, and Dijkstra's algorithm for shortest path finding.",
    fullContent: `Graph theory provides the fundamental framework for modeling interconnected systems. 

Key topics covered in this lecture:
1. **Representations**: Adjacency matrices ($O(V^2)$ space) vs. Adjacency lists ($O(V + E)$ space).
2. **Traversal Algorithms**:
   - **Breadth-First Search (BFS)**: Uses a FIFO queue; optimal for unweighted shortest path search.
   - **Depth-First Search (DFS)**: Uses LIFO stack/recursion; ideal for cycle detection, topological sorting, and connected components.
3. **Shortest Paths with Dijkstra's Algorithm**:
   - Maintains a min-priority queue (Binary Heap / Fibonacci Heap).
   - Time complexity: $O((V + E) \\log V)$ with adjacency list and min-heap.
   - Requirement: Non-negative edge weights only. For negative weights, Bellman-Ford ($O(VE)$) must be used.
4. **Minimum Spanning Trees (MST)**:
   - **Kruskal's Algorithm**: Greedy edge sorting + Disjoint Set Union (DSU) with path compression ($O(E \\log E)$).
   - **Prim's Algorithm**: Growing cut with min-priority queue ($O(E \\log V)$).`,
    keyTakeaways: [
      "Adjacency lists are vastly superior for sparse graphs ($E \\ll V^2$).",
      "Dijkstra fails with negative edge cycles because greedily finalized distances can be decreased later.",
      "Union-Find with rank and path compression achieves near-constant $\\alpha(n)$ amortized time per operation."
    ],
    glossary: [
      { term: 'Spanning Tree', definition: 'A subgraph that contains all vertices of the original graph and is a connected acyclic tree.' },
      { term: 'Dijkstra Relaxation', definition: 'The process of updating the shortest path estimate to a vertex $v$ via intermediate vertex $u$.' },
      { term: 'Topological Sort', definition: 'A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge $uv$, $u$ comes before $v$.' }
    ],
    flashcards: [
      { id: 'fc-1', front: 'What is the time complexity of Dijkstra using a Binary Heap?', back: 'O((V + E) log V)' },
      { id: 'fc-2', front: 'Why does Dijkstra not work on graphs with negative weights?', back: 'Greedy choice property assumes visited nodes already have optimal minimal distance, which negative weights invalidate.' },
      { id: 'fc-3', front: 'Which data structure optimizes Kruskal\'s MST algorithm?', back: 'Disjoint Set Union (Union-Find) with path compression.' }
    ]
  },
  {
    id: 'sum-2',
    title: 'Cellular Respiration Pathways',
    subject: 'Biology',
    subjectTagBg: 'bg-[#00574B]/40',
    subjectTagText: 'text-[#A3F2E3]',
    subjectBorder: 'border-[#00574B]/50',
    date: 'Oct 22, 2023',
    readTime: '6 min read',
    excerpt: 'Detailed breakdown of Glycolysis, the Krebs Cycle, and the Electron Transport Chain mechanisms.',
    fullContent: `Cellular respiration is the biochemical pathway through which cells convert biochemical energy from nutrients into adenosine triphosphate (ATP).

### Phase 1: Glycolysis (Cytoplasm)
- **Input**: 1 Glucose (6C) + 2 NAD+ + 2 ATP
- **Output**: 2 Pyruvate (3C) + 2 NADH + 4 ATP (Net +2 ATP)
- **Key Regulation**: Phosphofructokinase (PFK-1) is allosterically inhibited by high ATP levels and citrate.

### Phase 2: Pyruvate Decarboxylation & Krebs Cycle (Mitochondrial Matrix)
- Pyruvate converted into Acetyl-CoA by Pyruvate Dehydrogenase, yielding 1 NADH and 1 CO2 per pyruvate.
- Acetyl-CoA combines with Oxaloacetate (4C) to form Citrate (6C).
- Yield per Glucose (2 turns): 6 NADH, 2 FADH2, 2 GTP/ATP, 4 CO2.

### Phase 3: Oxidative Phosphorylation & ETC (Inner Mitochondrial Membrane)
- Electron carriers donate electrons to Complexes I-IV, pumping protons ($H^+$) into the intermembrane space to create an electrochemical gradient (proton-motive force).
- ATP Synthase utilizes chemiosmosis to produce ~26-28 ATP molecules via rotary catalysis.`,
    keyTakeaways: [
      "Total theoretical yield is ~30-32 ATP per oxidized glucose molecule.",
      "Oxygen acts as the terminal electron acceptor in Complex IV, reducing to form water ($H_2O$).",
      "In anaerobic conditions, fermentation regenerates $NAD^+$ to allow glycolysis to continue."
    ],
    glossary: [
      { term: 'Chemiosmosis', definition: 'The movement of ions across a semipermeable membrane down their electrochemical gradient to drive ATP synthesis.' },
      { term: 'Proton-Motive Force', definition: 'The electrochemical potential energy stored across the inner mitochondrial membrane.' }
    ],
    flashcards: [
      { id: 'fc-4', front: 'Where does Glycolysis occur in eukaryotic cells?', back: 'In the Cytosol/Cytoplasm.' },
      { id: 'fc-5', front: 'What is the terminal electron acceptor in aerobic cellular respiration?', back: 'Molecular Oxygen (O2), which forms H2O.' },
      { id: 'fc-6', front: 'What is the net ATP yield of Glycolysis alone?', back: '2 ATP molecules per glucose.' }
    ]
  },
  {
    id: 'sum-3',
    title: 'Quantum Mechanics Fundamentals',
    subject: 'Physics',
    subjectTagBg: 'bg-[#572E00]/40',
    subjectTagText: 'text-[#F2CFA3]',
    subjectBorder: 'border-[#572E00]/50',
    date: 'Oct 20, 2023',
    readTime: '5 min read',
    excerpt: "Wave-particle duality, Schrödinger's equation basics, and the uncertainty principle explored.",
    fullContent: `Quantum mechanics replaces deterministic Newtonian trajectories with probabilistic state vectors in Hilbert space.

### Core Postulates
1. **State Space**: The physical state is represented by a normalized ket vector $|\\psi\\rangle$.
2. **Observables**: Physical quantities correspond to self-adjoint (Hermitian) operators $\\hat{A}$.
3. **Measurement & Collapse**: Measuring $\\hat{A}$ yields one of its eigenvalues $a_n$ with probability $P(a_n) = |\\langle a_n | \\psi \\rangle|^2$.
4. **Time Evolution**: Governed by the Time-Dependent Schrödinger Equation:
   $$i\\hbar \\frac{\\partial}{\\partial t} |\\psi(t)\\rangle = \\hat{H} |\\psi(t)\\rangle$$

### Heisenberg Uncertainty Principle
- For any two observables whose operators do not commute ($[\\hat{x}, \\hat{p}] = i\\hbar$):
  $$\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}$$`,
    keyTakeaways: [
      "Eigenvalues of Hermitian operators are always real numbers, matching measurable physical quantities.",
      "Superposition states collapse instantaneously upon measurement onto the eigenvector basis.",
      "The zero-point energy of a quantum harmonic oscillator is $E_0 = \\frac{1}{2}\\hbar\\omega$."
    ],
    glossary: [
      { term: 'Hermitian Operator', definition: 'An operator equal to its conjugate transpose, ensuring real eigenvalues.' },
      { term: 'Born Rule', definition: 'Postulate giving the probability density that a measurement of a quantum system yields a given result.' }
    ],
    flashcards: [
      { id: 'fc-7', front: 'What is the canonical commutation relation [x, p]?', back: 'i * h-bar (iℏ)' },
      { id: 'fc-8', front: 'What does the Born rule state?', back: 'The probability density of finding a particle at position x is |ψ(x)|².' }
    ]
  },
  {
    id: 'sum-4',
    title: 'Machine Learning: Neural Networks',
    subject: 'Computer Science',
    subjectTagBg: 'bg-[#280057]/60',
    subjectTagText: 'text-[#d6baff]',
    subjectBorder: 'border-[#aa73ff]/30',
    date: 'Oct 18, 2023',
    readTime: '5 min read',
    excerpt: 'Architecture of feedforward networks, backpropagation, and activation functions overview.',
    fullContent: `Artificial Neural Networks (ANNs) represent universal function approximators composed of layered non-linear transformations.

### 1. Forward Propagation
Each neuron computes an affine transformation followed by a non-linear activation:
$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$
$$a^{[l]} = \\sigma(z^{[l]})$$

### 2. Common Activation Functions
- **ReLU**: $f(x) = \\max(0, x)$ — mitigates vanishing gradient problem.
- **GELU**: $x \\cdot \\Phi(x)$ — standard in modern Transformers.
- **Softmax**: Converts unnormalized logits into valid probability distributions for multi-class classification.

### 3. Backpropagation & Optimization
- Backpropagation uses the multivariate calculus chain rule to compute gradients $\\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}}$.
- **Adam Optimizer**: Combines exponentially decaying average of past gradients (momentum) and past squared gradients (RMSProp).`,
    keyTakeaways: [
      "Non-linear activations are essential; stacking linear layers without activations collapses into a single linear matrix.",
      "Batch Normalization and Residual Connections (ResNets) enable training networks hundreds of layers deep.",
      "Overfitting is mitigated using Weight Decay (L2), Dropout, and Early Stopping."
    ],
    glossary: [
      { term: 'Vanishing Gradient', definition: 'Gradient values decaying exponentially towards zero in early layers during backpropagation with saturating activations like sigmoid.' },
      { term: 'Loss Function', definition: 'A mathematical measure quantifying the discrepancy between network predictions and ground truth.' }
    ],
    flashcards: [
      { id: 'fc-9', front: 'Why are non-linear activation functions required?', back: 'Without them, multiple layers collapse mathematically into a single linear regression function.' },
      { id: 'fc-10', front: 'What two methods does the Adam optimizer combine?', back: 'Momentum (1st moment) and RMSProp (2nd raw moment).' }
    ]
  },
  {
    id: 'sum-5',
    title: 'Modernist Poetry Analysis',
    subject: 'Literature',
    subjectTagBg: 'bg-[#323536]',
    subjectTagText: 'text-[#cdc2d7]',
    subjectBorder: 'border-[#4b4454]',
    date: 'Oct 15, 2023',
    readTime: '4 min read',
    excerpt: "Themes of alienation and structural fragmentation in T.S. Eliot's 'The Waste Land'.",
    fullContent: `Modernist poetry emerged as a response to the devastating disillusionment of World War I, rapid industrialization, and the collapse of Victorian moral frameworks.

### Key Characteristics:
- **Fragmentation and Collage**: Juxtaposition of disparate voices, mythologies, and multilingual fragments.
- **Allusion**: Heavy reliance on Dante, Ovid, the Holy Grail legend, and Eastern philosophical texts (Upanishads).
- **The Objective Correlative**: Eliot's concept of expressing emotion through a set of objects, a situation, or a chain of events that serve as the formula for that particular emotion.`,
    keyTakeaways: [
      "The Waste Land portrays post-war European spiritual bankruptcy and longing for cultural regeneration.",
      "Eliot synthesizes high classical literature with low popular cabaret songs to reflect modern fractured consciousness."
    ],
    glossary: [
      { term: 'Objective Correlative', definition: 'A set of objects, situation, or chain of events which shall be the formula of that particular emotion.' }
    ],
    flashcards: [
      { id: 'fc-11', front: 'Who wrote The Waste Land?', back: 'T.S. Eliot (published 1922).' }
    ]
  }
];

export const initialQuizzes: Quiz[] = [
  {
    id: 'quiz-daily-1',
    title: 'Synaptic Plasticity',
    subject: 'Neuroscience',
    moduleInfo: 'Brain & Cognitive Sciences • Daily Challenge',
    category: 'Neuroscience',
    durationMinutes: 5,
    questionsCount: 4,
    bestScore: null,
    maxScore: 100,
    isLocked: false,
    isDailyChallenge: true,
    icon: 'timer',
    questions: [
      {
        id: 'q-1-1',
        question: 'Which neurotransmitter receptor is primarily responsible for Long-Term Potentiation (LTP) induction via calcium influx?',
        options: [
          'GABA-A Receptor',
          'NMDA Receptor',
          'Nicotinic Acetylcholine Receptor',
          'Dopamine D2 Receptor'
        ],
        correctIndex: 1,
        explanation: 'NMDA receptors act as coincidence detectors because they require both glutamate binding and membrane depolarization to expel the magnesium (Mg2+) block, allowing Ca2+ influx.'
      },
      {
        id: 'q-1-2',
        question: 'What is Hebbian theory colloquially summarized as?',
        options: [
          '"Neurons that fire together, wire together"',
          '"All or nothing action potentials"',
          '"Synaptic pruning by astrocyte uptake"',
          '"Neurogenesis strictly precedes synaptogenesis"'
        ],
        correctIndex: 0,
        explanation: 'Donald Hebb proposed that when axon of cell A repeatedly assists in firing cell B, metabolic or growth changes increase cell A\'s efficiency.'
      },
      {
        id: 'q-1-3',
        question: 'Which ion causes the voltage-dependent block of the NMDA receptor at resting membrane potential?',
        options: ['Sodium (Na+)', 'Potassium (K+)', 'Magnesium (Mg2+)', 'Chloride (Cl-)'],
        correctIndex: 2,
        explanation: 'At resting potential (-70mV), extracellular Mg2+ ions lodge inside the NMDA pore, blocking current until the membrane is depolarized.'
      },
      {
        id: 'q-1-4',
        question: 'Long-Term Depression (LTD) is characterized by the internalisation of which receptors?',
        options: ['AMPA Receptors', 'Histamine Receptors', 'Opioid Receptors', 'Muscarinic Receptors'],
        correctIndex: 0,
        explanation: 'LTD results in dephosphorylation and endocytosis of AMPA receptors from the postsynaptic density, reducing synaptic strength.'
      }
    ]
  },
  {
    id: 'quiz-daily-2',
    title: 'Reaction Mechanisms',
    subject: 'Organic Chemistry',
    moduleInfo: 'Chemistry 220 • Daily Challenge',
    category: 'Science',
    durationMinutes: 8,
    questionsCount: 4,
    bestScore: null,
    maxScore: 100,
    isLocked: false,
    isDailyChallenge: true,
    icon: 'timer',
    questions: [
      {
        id: 'q-2-1',
        question: 'An SN2 reaction at a chiral stereocenter typically results in which stereochemical outcome?',
        options: [
          'Complete retention of configuration',
          'Racemization (50:50 mixture)',
          'Complete inversion of configuration (Walden inversion)',
          'Loss of optical activity through carbocation intermediate'
        ],
        correctIndex: 2,
        explanation: 'SN2 involves a backside nucleophilic attack in a single concerted step, causing complete Walden inversion of stereochemistry.'
      },
      {
        id: 'q-2-2',
        question: 'Which solvent type is most favorable for accelerating SN2 reactions?',
        options: [
          'Polar protic solvents (e.g., Water, Ethanol)',
          'Polar aprotic solvents (e.g., DMSO, Acetone, DMF)',
          'Non-polar solvents (e.g., Hexane)',
          'Strong mineral acids'
        ],
        correctIndex: 1,
        explanation: 'Polar aprotic solvents solvate cations without forming strong hydrogen-bonding cages around nucleophilic anions, leaving them "naked" and highly reactive.'
      },
      {
        id: 'q-2-3',
        question: 'Which carbocation intermediate is thermodynamically the most stable?',
        options: ['Methyl carbocation', 'Primary carbocation', 'Secondary carbocation', 'Tertiary carbocation'],
        correctIndex: 3,
        explanation: 'Tertiary carbocations are stabilized by hyperconjugation and inductive electron donation from three adjacent alkyl groups.'
      },
      {
        id: 'q-2-4',
        question: 'Zaitsev\'s rule predicts that the major product of an elimination reaction (E1/E2) will be:',
        options: [
          'The least substituted, least stable alkene',
          'The most substituted, thermodynamically most stable alkene',
          'Exclusively terminal alkynes',
          'The kinetic Hofmann product'
        ],
        correctIndex: 1,
        explanation: 'Zaitsev\'s rule states that the base removes a proton from the beta-carbon with the fewest hydrogens, yielding the most substituted alkene.'
      }
    ]
  },
  {
    id: 'quiz-avail-1',
    title: 'Cellular Respiration Deep Dive',
    subject: 'Biology',
    moduleInfo: 'Biology 201 • Mod 3',
    category: 'Science',
    durationMinutes: 10,
    questionsCount: 4,
    bestScore: null,
    maxScore: 100,
    isLocked: false,
    icon: 'science',
    questions: [
      {
        id: 'q-3-1',
        question: 'During glycolysis, which enzyme catalyzes the conversion of Fructose-6-phosphate to Fructose-1,6-bisphosphate?',
        options: [
          'Hexokinase',
          'Phosphofructokinase-1 (PFK-1)',
          'Pyruvate Kinase',
          'Aldolase'
        ],
        correctIndex: 1,
        explanation: 'PFK-1 is the primary rate-limiting and committed enzyme of glycolysis, tightly regulated by cellular energy status.'
      },
      {
        id: 'q-3-2',
        question: 'How many molecules of NADH are generated per single turn of the Citric Acid (Krebs) cycle?',
        options: ['1 NADH', '2 NADH', '3 NADH', '4 NADH'],
        correctIndex: 2,
        explanation: 'Each turn of the Krebs cycle reduces 3 NAD+ to 3 NADH (at Isocitrate Dehydrogenase, alpha-Ketoglutarate Dehydrogenase, and Malate Dehydrogenase).'
      },
      {
        id: 'q-3-3',
        question: 'Cyanide poisoning inhibits which mitochondrial enzyme complex in the electron transport chain?',
        options: [
          'Complex I (NADH Dehydrogenase)',
          'Complex II (Succinate Dehydrogenase)',
          'Complex III (Cytochrome bc1)',
          'Complex IV (Cytochrome c Oxidase)'
        ],
        correctIndex: 3,
        explanation: 'Cyanide binds tightly to the ferric iron (Fe3+) in the heme a3 of Cytochrome c Oxidase (Complex IV), halting oxidative phosphorylation.'
      },
      {
        id: 'q-3-4',
        question: 'What is the role of brown adipose tissue thermogenin (UCP-1)?',
        options: [
          'Increases ATP synthesis efficiency',
          'Uncouples proton gradient from ATP synthase to generate heat',
          'Transports glucose across blood-brain barrier',
          'Catalyzes beta-oxidation of fatty acids'
        ],
        correctIndex: 1,
        explanation: 'Thermogenin forms a channel allowing protons to re-enter the mitochondrial matrix without producing ATP, dissipating energy as non-shivering thermogenesis heat.'
      }
    ]
  },
  {
    id: 'quiz-avail-2',
    title: 'Derivatives Application',
    subject: 'Mathematics',
    moduleInfo: 'Calculus I • Ch 4',
    category: 'Math',
    durationMinutes: 8,
    questionsCount: 4,
    bestScore: 88,
    maxScore: 100,
    isLocked: false,
    icon: 'calculate',
    questions: [
      {
        id: 'q-4-1',
        question: 'If f\'(c) = 0 and f\'\'(c) < 0, what does the Second Derivative Test conclude about x = c?',
        options: [
          'Local Minimum',
          'Local Maximum',
          'Point of Inflection',
          'Inconclusive'
        ],
        correctIndex: 1,
        explanation: 'f\'\'(c) < 0 implies the function is concave down near the critical point, meaning x = c is a local maximum.'
      },
      {
        id: 'q-4-2',
        question: 'What does the Mean Value Theorem guarantee for a continuous and differentiable function on [a, b]?',
        options: [
          'f(c) = 0 for some c in (a, b)',
          'f\'(c) = [f(b) - f(a)] / (b - a) for some c in (a, b)',
          'f\'\'(c) = 0 for all c',
          'f(a) = f(b)'
        ],
        correctIndex: 1,
        explanation: 'The MVT states there exists at least one point c where the instantaneous rate of change equals the average rate of change.'
      },
      {
        id: 'q-4-3',
        question: 'What is the derivative of f(x) = ln(3x^2 + 1)?',
        options: [
          '1 / (3x^2 + 1)',
          '6x / (3x^2 + 1)',
          '3x / (3x^2 + 1)',
          '6x ln(3x^2 + 1)'
        ],
        correctIndex: 1,
        explanation: 'By the chain rule, d/dx[ln(u)] = u\'/u = (6x) / (3x^2 + 1).'
      },
      {
        id: 'q-4-4',
        question: 'L\'Hôpital\'s Rule can be applied directly to which indeterminate forms?',
        options: [
          '0/0 and ∞/∞',
          '0 * ∞ and 1^∞',
          '∞ - ∞ and 0^0',
          'All forms without algebraic transformation'
        ],
        correctIndex: 0,
        explanation: 'L\'Hôpital\'s rule applies directly to quotients 0/0 and ∞/∞. Other indeterminate forms must first be rearranged into quotient form.'
      }
    ]
  },
  {
    id: 'quiz-avail-3',
    title: 'Victorian Literature Review',
    subject: 'Literature',
    moduleInfo: 'Eng Lit 305 • Final Prep',
    category: 'Humanities',
    durationMinutes: 12,
    questionsCount: 5,
    bestScore: null,
    maxScore: 100,
    isLocked: true,
    icon: 'menu_book',
    questions: []
  }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Alex Mercer',
    authorHandle: '@alex_codes',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3JNtBSOgN4zi17k8idO6aPym3H7cYq_ZdVzgie_71QqOlH9ZpCfnNNkJK6jXdCGgSv30y0SsySYF2CspAiGV3rbHsMVvn9qZzasx5RFvYZQ_v6adtHuPzRXS2FLA7yiJfqDCKPHyRFJmrFwskV2EK19Ls_D4zkBdbTo2oZK2fGDL295EHZdfoII3mqg6iBoH0vrQmjUMPVlFc5LFelZkQTQbeucLiezICX5BhCjKyIRXbPgxTjwmdpw',
    timeAgo: '2h ago',
    subject: 'Computer Science',
    category: 'Notes',
    title: 'Comprehensive Data Structures Cheat Sheet',
    content: 'I compiled all my notes on Trees, Graphs, and Hash Maps from this semester into a single PDF. Includes time complexity tables and common interview patterns. Hope this helps with finals prep!',
    attachment: {
      type: 'pdf',
      fileName: 'Data_Structures_Final_Review.pdf',
      fileSize: '2.4 MB',
      pageCount: 15,
      url: '#'
    },
    likesCount: 124,
    isLiked: false,
    commentsCount: 18,
    comments: [
      {
        id: 'comm-1',
        authorName: 'Elena Rostova',
        authorHandle: '@elena_cs',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV7oA_qrwg5nx9VDKpdjLtT3dqKOcEo5ocpM0BsoeX_DoxDwsIW4EIxGzhI3oWdZcVsafXQG-gdrvziPbcQqxTj7txpTa_5wyUlW_5t2tarLzGJsoP-ZbixWPCRZi8VTH2bXcTYgmfbsvSeJukaYftewytAuecwMT-XgXAe8EGEN9A43V6I6zw2MNAv9v5o2aaM4khIFIP0Yge32D5mTB5fScgHutGuMRxMExeQHhTAc434Pym_GYuTQ',
        timeAgo: '1h ago',
        content: 'The Red-Black tree rotation diagrams on page 7 are a lifesaver! Thank you Alex!',
        likes: 12
      },
      {
        id: 'comm-2',
        authorName: 'Marcus Thorne',
        authorHandle: '@mthorne_dev',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5_VIe6kCesCrgKqEvMhU9TKTQAoMuQfbk4MixxvE4q2taabFjd_u0feiISIoxGhRmehNBFcSh1a41_9FA2cqVVk6gUMOLnAuk_wEXP6lL8kLbTMxYKUXKzmqPUs0ERah4y07bNZ5Ek4db2_WaOS2hGTjGGgSNynzthxPLneIVN-GYaUIBvTRelwDLtNp4zlyacW5DkeR4xIKYa7OWy2TIv6FdgBg0Mob6HjTWeQ0Csd7jHPf-K5kBqg',
        timeAgo: '45m ago',
        content: 'Are you covering dynamic programming memoization vs tabulation in part 2?',
        likes: 5
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Study Group: Linear Algebra',
    authorHandle: 'Hosted by Sam Riley',
    authorAvatar: 'S',
    timeAgo: '5h ago',
    subject: 'Mathematics',
    category: 'Study Session',
    title: 'Pre-midterm review: Eigenvalues & Eigenvectors',
    content: "We're getting together in Library Room 3B to go over the practice problem set for next week's midterm. Anyone is welcome to join!",
    eventDetails: {
      date: 'Tomorrow',
      time: '7:00 PM - 9:00 PM',
      location: 'Library Room 3B',
      host: 'Sam Riley',
      isJoined: false
    },
    likesCount: 42,
    isLiked: false,
    commentsCount: 6,
    comments: [
      {
        id: 'comm-3',
        authorName: 'David K.',
        authorHandle: '@david_k',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJiTOgnrjqydzgGRcRavTC-RnwDLyEiB-cAzRLEZDq_Kx81ZBMUwFfzppoFVMRN-RSeNpwGrs0tVM8RcR_yhWmhrCBKsi-HYHWk_evMhlOioa-EcEFnl1c5O3tojZeqX1dvfVYQVtNwsu7naTTL494NmIMueX32q4lbYrIBQAwQBGbRcfy5PHLyxsX_fFko7yy9fZxHkFuKoJIxeyQcgcZX2IUhWcH1E3nz2fPq4z89S6srKl6OPPz7g',
        timeAgo: '3h ago',
        content: 'Will there be practice with Gram-Schmidt orthogonalization too?',
        likes: 3
      }
    ]
  }
];

export const trendingTopics: TrendingTopic[] = [
  { id: 'tt-1', tag: '#CalculusMidterm', postsCount: 42 },
  { id: 'tt-2', tag: '#OrganicChemistry', postsCount: 28 },
  { id: 'tt-3', tag: '#PythonBasics', postsCount: 15 }
];

export const initialSuggestedGroups: SuggestedGroup[] = [
  {
    id: 'sg-1',
    name: 'Hackathon Prep',
    membersCount: 156,
    subject: 'Computer Science',
    icon: 'code',
    isJoined: false
  },
  {
    id: 'sg-2',
    name: 'Physics 101 Study',
    membersCount: 89,
    subject: 'Physics',
    icon: 'science',
    isJoined: false
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Lecture Starting Soon',
    message: 'Physics 301 (Quantum Mechanics Pt. 2) begins in 15 minutes.',
    timeAgo: '15m ago',
    read: false,
    type: 'lecture'
  },
  {
    id: 'notif-2',
    title: 'Daily Streak Maintained',
    message: 'You have logged 14 consecutive days of deep study!',
    timeAgo: '2h ago',
    read: false,
    type: 'streak'
  },
  {
    id: 'notif-3',
    title: 'New Quiz Unlocked',
    message: 'Synaptic Plasticity adaptive challenge is ready for review.',
    timeAgo: '5h ago',
    read: true,
    type: 'quiz'
  }
];
