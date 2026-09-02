import {
  BSCSSubject,
  MastersPhDResource,
  MDCATSubject,
  MDCATPastPaper,
  YouTubeEducationalChannel
} from '../types';

export const bscsSubjectsList: BSCSSubject[] = [
  {
    id: 'bscs-dsa',
    code: 'CS201',
    title: 'Data Structures & Algorithms (DSA)',
    semester: '3rd Semester',
    creditHours: '3+1 Credit Hours',
    category: 'Core',
    icon: 'Binary',
    color: '#9D5CFF',
    overview: 'The fundamental building blocks of computing. Master linear and hierarchical data structures, sorting, searching, balanced trees, and graph algorithms with rigorous time/space asymptotic complexity analysis.',
    keyTopics: [
      'Asymptotic Notation (Big-O, Big-Omega, Big-Theta)',
      'Linked Lists (Singly, Doubly, Circular & Skip Lists)',
      'Stacks & Queues (Monotonic Stack, Priority Queues)',
      'Trees (AVL Trees, Red-Black Trees, B/B+ Trees, Tries)',
      'Hash Tables & Collision Resolution (Chaining vs Open Addressing)',
      'Graph Traversals (BFS, DFS, Tarjan SCC, Kruskal & Prim MST)',
      'Dynamic Programming (Knapsack, LCS, LIS, Matrix Chain Multiplication)'
    ],
    cheatSheetSummary: 'Dijkstra: O((V+E)log V) | QuickSort: O(n log n) avg, O(n²) worst | AVL Tree Search/Insert: O(log n) guaranteed | Hash Map Lookup: O(1) amortized.',
    downloadableDoc: {
      fileName: 'BSCS_Data_Structures_Comprehensive_Notes_RabiaZafar.pdf',
      fileSize: '4.8 MB',
      pages: 48,
      description: 'Handcrafted semester notes with C++ implementations, memory diagrams, and recursion trees.'
    },
    recommendedBooks: [
      'Introduction to Algorithms (CLRS) - Cormen, Leiserson, Rivest, Stein',
      'Data Structures and Algorithm Analysis in C++ - Mark Allen Weiss'
    ],
    topAlgorithmsOrConcepts: [
      {
        name: 'Dijkstra Shortest Path',
        complexityOrFormula: 'O((V + E) \\log V)',
        summary: 'Greedy single-source shortest path using a min-heap priority queue on non-negative weighted graphs.'
      },
      {
        name: 'AVL Self-Balancing Rotations',
        complexityOrFormula: 'Height \\le 1.44 \\log_2(n)',
        summary: 'Maintains balance factor |h_L - h_R| <= 1 through LL, RR, LR, and RL rotations in O(1) time.'
      },
      {
        name: '0/1 Knapsack (DP)',
        complexityOrFormula: 'O(n \\cdot W)',
        summary: 'dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]]) exploiting optimal substructure.'
      }
    ],
    lectureModules: [
      {
        moduleNumber: 1,
        title: 'Asymptotic Analysis & Master Theorem',
        description: 'Analyzing recursive algorithms using the Master Theorem T(n) = aT(n/b) + f(n) and recurrence trees.',
        keyPoints: [
          'Case 1: If f(n) = O(n^(log_b a - epsilon)), then T(n) = Theta(n^(log_b a))',
          'Case 2: If f(n) = Theta(n^(log_b a)), then T(n) = Theta(n^(log_b a) log n)',
          'Case 3: If f(n) = Omega(n^(log_b a + epsilon)) and regularity condition holds, T(n) = Theta(f(n))'
        ],
        codeSnippet: `// C++ Fast Binary Search Implementation
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // Avoid overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
        codeLang: 'cpp'
      }
    ]
  },
  {
    id: 'bscs-os',
    code: 'CS302',
    title: 'Operating Systems (OS)',
    semester: '4th Semester',
    creditHours: '3+1 Credit Hours',
    category: 'Core',
    icon: 'Cpu',
    color: '#38BDF8',
    overview: 'Explore the bridge between hardware and software. Process scheduling, IPC, thread synchronization, semaphores, deadlock avoidance (Banker\'s algorithm), paging, virtual memory, and file system design.',
    keyTopics: [
      'Process Management & PCB (Process Control Block)',
      'CPU Scheduling (FCFS, SJF, Round Robin, Multi-Level Feedback Queues)',
      'Synchronization (Mutex, Semaphores, Monitors, Dining Philosophers)',
      'Deadlocks (4 Coffman conditions, Banker\'s Algorithm, Resource Allocation Graphs)',
      'Memory Management (Paging, TLB, Page Replacement: FIFO, LRU, Clock)',
      'Virtual Memory & Demand Paging (Thrashing, Working Set Model)',
      'File Systems & Disk Scheduling (SCAN, C-SCAN, Inodes, RAID levels)'
    ],
    cheatSheetSummary: 'Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Banker\'s Algorithm: Need = Max - Allocation.',
    downloadableDoc: {
      fileName: 'BSCS_Operating_Systems_Complete_Guide_RabiaZafar.pdf',
      fileSize: '5.2 MB',
      pages: 54,
      description: 'Detailed operating systems handwritten summary covering POSIX threads, memory paging, and Linux architecture.'
    },
    recommendedBooks: [
      'Operating System Concepts (Silberschatz, Galvin, Gagne - Dinosaur Book)',
      'Modern Operating Systems - Andrew S. Tanenbaum'
    ],
    topAlgorithmsOrConcepts: [
      {
        name: 'Banker\'s Deadlock Avoidance',
        complexityOrFormula: 'O(m \\cdot n^2)',
        summary: 'Verifies whether granting a resource request leaves the operating system in a safe state with a safe execution sequence.'
      },
      {
        name: 'LRU Page Replacement',
        complexityOrFormula: 'O(1) with Doubly Linked List + Hash Table',
        summary: 'Evicts the page frame in RAM that has not been accessed for the longest duration of time.'
      }
    ],
    lectureModules: [
      {
        moduleNumber: 1,
        title: 'Process Lifecycle & Synchronization Primitives',
        description: 'Context switching mechanisms, critical section problem, and semaphore implementations.',
        keyPoints: [
          'Critical Section 3 Requirements: Mutual Exclusion, Progress, Bounded Waiting.',
          'Counting Semaphore: wait() decrements, signal() increments atomically.'
        ]
      }
    ]
  },
  {
    id: 'bscs-dbms',
    code: 'CS303',
    title: 'Database Management Systems (DBMS)',
    semester: '4th Semester',
    creditHours: '3+1 Credit Hours',
    category: 'Core',
    icon: 'Database',
    color: '#34D399',
    overview: 'Relational database theory, relational algebra, SQL optimization, Entity-Relationship modeling, normalization (1NF through BCNF), transaction processing, ACID guarantees, B+ Tree indexing, and NoSQL architecture.',
    keyTopics: [
      'Relational Model & Relational Algebra',
      'Advanced SQL (Window functions, CTEs, Subqueries)',
      'Normalization Theory (1NF, 2NF, 3NF, BCNF)',
      'Transactions & ACID Properties',
      'Concurrency Control (2PL, MVCC, Deadlock detection)',
      'Storage & Indexing (B+ Trees, Hash Indexes)'
    ],
    cheatSheetSummary: '1NF: Atomic values. 2NF: No partial dependency. 3NF: No transitive dependency. BCNF: For every X->Y, X is superkey.',
    downloadableDoc: {
      fileName: 'BSCS_DBMS_Complete_Relational_Notes_RabiaZafar.pdf',
      fileSize: '4.1 MB',
      pages: 42,
      description: 'SQL queries cheat sheet, normalization proof exercises, and transaction schedule classification.'
    },
    recommendedBooks: [
      'Database System Concepts - Silberschatz, Korth, Sudarshan'
    ],
    topAlgorithmsOrConcepts: [
      {
        name: 'Boyce-Codd Normal Form (BCNF)',
        complexityOrFormula: 'For all X -> Y, X is Superkey',
        summary: 'Eliminates all redundancy arising from functional dependencies.'
      }
    ],
    lectureModules: [
      {
        moduleNumber: 1,
        title: 'SQL Window Functions & Index Optimization',
        description: 'Advanced relational operations and query optimization.',
        keyPoints: [
          'Dense Rank vs Rank: Dense Rank does not skip numbers on ties.',
          'B+ Tree fanout: Minimizes disk block I/O operations.'
        ]
      }
    ]
  },
  {
    id: 'bscs-networks',
    code: 'CS304',
    title: 'Computer Networks',
    semester: '5th Semester',
    creditHours: '3+1 Credit Hours',
    category: 'Core',
    icon: 'Network',
    color: '#F59E0B',
    overview: 'The architecture of the global Internet. OSI 7-layer & TCP/IP stack, IPv4/IPv6 subnetting, CIDR, routing protocols (OSPF, BGP), transport layer (TCP 3-way handshake, congestion control), and application protocols (HTTP/3, DNS, TLS 1.3).',
    keyTopics: [
      'OSI vs TCP/IP Reference Model',
      'Data Link Layer & Framing',
      'Network Layer (IPv4 Subnetting, CIDR, NAT)',
      'Routing Protocols (OSPF Dijkstra, BGP)',
      'Transport Layer (TCP 3-Way Handshake, UDP)',
      'Network Security (TLS Handshake, IPsec)'
    ],
    cheatSheetSummary: 'TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK. Subnet /26 gives 62 usable IPs. DNS uses UDP 53.',
    downloadableDoc: {
      fileName: 'BSCS_Computer_Networks_Notes_RabiaZafar.pdf',
      fileSize: '4.5 MB',
      pages: 45,
      description: 'IPv4/IPv6 subnetting cheat sheet and routing protocol state machines.'
    },
    recommendedBooks: [
      'Computer Networking: A Top-Down Approach - Kurose & Ross'
    ],
    topAlgorithmsOrConcepts: [
      {
        name: 'TCP Congestion Control',
        complexityOrFormula: 'AIMD Protocol',
        summary: 'Additive increase, multiplicative decrease for congestion avoidance.'
      }
    ],
    lectureModules: [
      {
        moduleNumber: 1,
        title: 'TCP Connection Protocol & Sliding Window',
        description: 'Reliable byte-stream delivery and flow control.',
        keyPoints: [
          'Flow control prevents receiver buffer overrun.',
          'Congestion control prevents network pipe bottlenecking.'
        ]
      }
    ]
  },
  {
    id: 'bscs-ai-ml',
    code: 'CS401',
    title: 'Artificial Intelligence & Machine Learning',
    semester: '6th Semester',
    creditHours: '3+1 Credit Hours',
    category: 'AI & Systems',
    icon: 'Brain',
    color: '#EC4899',
    overview: 'Heuristic search algorithms (A*, Alpha-Beta Pruning), Machine Learning paradigms (Regression, SVMs, Random Forests), and Deep Neural Networks (Backpropagation, CNNs, Transformers).',
    keyTopics: [
      'Search Agents (A* Heuristic Search)',
      'Supervised Learning & Regularization (L1/L2)',
      'Deep Learning & Backpropagation Calculus',
      'Transformers & Attention Mechanisms'
    ],
    cheatSheetSummary: 'A* Search: f(n) = g(n) + h(n). Backprop: Vectorized chain rule calculation of dL/dW.',
    downloadableDoc: {
      fileName: 'BSCS_AI_Machine_Learning_Notes_RabiaZafar.pdf',
      fileSize: '6.1 MB',
      pages: 60,
      description: 'Math derivations of Backpropagation, Gradient Descent vectors, and PyTorch reference.'
    },
    recommendedBooks: [
      'Artificial Intelligence: A Modern Approach (AIMA) - Russell & Norvig'
    ],
    topAlgorithmsOrConcepts: [
      {
        name: 'A* Heuristic Search',
        complexityOrFormula: 'f(n) = g(n) + h(n)',
        summary: 'Guarantees optimal shortest path when heuristic h(n) is admissible.'
      }
    ],
    lectureModules: [
      {
        moduleNumber: 1,
        title: 'Deep Neural Network Gradient Calculation',
        description: 'Step-by-step backpropagation derivations and activation functions.',
        keyPoints: [
          'ReLU avoids vanishing gradients: f(x) = max(0, x).',
          'Softmax converts logits into probability distribution.'
        ]
      }
    ]
  }
];

export const mastersPhdResourcesList: MastersPhDResource[] = [
  {
    id: 'phd-1',
    title: 'Transformer Architectures, Self-Attention & Latent Diffusion Models',
    level: 'PhD / Doctoral',
    field: 'Artificial Intelligence & LLMs',
    author: 'Rabia Zafar & DeepStudy Research Lab',
    year: '2025/2026',
    citation: 'Zafar, R. et al. (2025). "Mathematical Foundations and Scaled Attention Geometries in Next-Generation LLMs." Journal of AI & Deep Systems.',
    abstract: 'This doctoral monograph explores the mathematical formulation of Self-Attention mechanisms in Large Language Models (LLMs). We analyze quadratic computational complexity O(N^2 d) in context windows, FlashAttention-2 tiling optimizations, Rotary Position Embeddings (RoPE), and Grouped-Query Attention (GQA).',
    keyContributions: [
      'Proof of FlashAttention memory IO reduction using GPU SRAM tiling and softmax online re-normalization.',
      'Rotary Position Embedding (RoPE) complex vector rotation derivations.',
      'Comparison of Dense, MoE (Mixture of Experts), and Linear Attention scaling laws.'
    ],
    methodologyOverview: 'Empirical scaling experiments across GPU clusters measuring tokens-per-second, memory bandwidth utilization, and perplexity convergence.',
    mathematicalFormulations: [
      '\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V',
      'R_{\\Theta, m}^d = \\text{diag}\\left(R_{\\theta_1, m}, R_{\\theta_2, m}, \\dots, R_{\\theta_{d/2}, m}\\right)'
    ],
    thesisGuidelines: [
      {
        stage: 'PhD Proposal Phase',
        milestone: 'Problem Statement & Gap Identification',
        deliverables: ['Exhaustive survey of 80+ peer-reviewed papers', 'Formal mathematical hypothesis'],
        tips: 'Ensure your research question addresses a fundamental theoretical bottleneck.'
      }
    ],
    downloadablePaper: {
      fileName: 'PhD_Doctoral_Monograph_Transformers_RabiaZafar.pdf',
      fileSize: '8.4 MB',
      pages: 72,
      badge: 'Doctoral Monograph'
    }
  },
  {
    id: 'phd-2',
    title: 'Advanced Distributed Systems: Raft vs. Byzantine Fault Tolerance',
    level: 'Master (MS/MPhil)',
    field: 'Distributed Systems & Cloud',
    author: 'Rabia Zafar & Academic Collaborators',
    year: '2025',
    citation: 'Zafar, R. (2025). "Consensus Protocols Under Network Partition and Asynchronous Crash-Recovery Models." Distributed Computing Review.',
    abstract: 'Rigorous comparative analysis of distributed state-machine replication protocols. We derive safety invariants for Raft leader elections, log matching properties, and PBFT under asynchronous network partitions.',
    keyContributions: [
      'Formal TLA+ state specification proofs for log compaction safety.',
      'Mathematical derivation of quorum intersections: Q1 intersect Q2 != empty set.'
    ],
    methodologyOverview: 'Model checking via TLA+ alongside Chaos Engineering fault-injection benchmarks on Kubernetes clusters.',
    downloadablePaper: {
      fileName: 'MS_Research_Distributed_Consensus_Raft_BFT_RabiaZafar.pdf',
      fileSize: '6.2 MB',
      pages: 58,
      badge: 'MS Thesis Report'
    }
  }
];

export const mdcatSubjectsList: MDCATSubject[] = [
  {
    id: 'mdcat-bio',
    name: 'Biology',
    weightage: '34% (68 MCQs)',
    totalMarks: 68,
    icon: 'Dna',
    color: '#10B981',
    highYieldTopics: [
      'Cell Biology & Organelles',
      'Biological Molecules (Enzymes, Lipids, Proteins)',
      'Bioenergetics (Glycolysis, Krebs Cycle, ETC)',
      'Human Physiology (Circulatory, Nervous, Endocrine)',
      'Genetics, DNA Replication & Biotechnology'
    ],
    formulaSheet: [
      {
        title: 'Enzyme Kinetics (Michaelis-Menten)',
        formula: 'v = (V_max * [S]) / (K_m + [S])',
        explanation: 'Km is substrate concentration at half Vmax; lower Km signifies higher affinity.'
      },
      {
        title: 'Cardiac Output',
        formula: 'CO = Stroke Volume (SV) * Heart Rate (HR)',
        explanation: 'Typical resting cardiac output is approximately 5.0 L/min in healthy adults.'
      }
    ]
  },
  {
    id: 'mdcat-chem',
    name: 'Chemistry',
    weightage: '27% (54 MCQs)',
    totalMarks: 54,
    icon: 'FlaskConical',
    color: '#8B5CF6',
    highYieldTopics: [
      'Stoichiometry & Mole Concept',
      'Atomic Structure & Quantum Numbers',
      'Chemical Bonding & Hybridization',
      'Equilibrium, pH, Buffers & Le Chatelier',
      'Organic Reaction Mechanisms (SN1, SN2, E1, E2)'
    ],
    formulaSheet: [
      {
        title: 'Ideal Gas Law & Mole Calculations',
        formula: 'PV = nRT = (m / M) * RT',
        explanation: 'R = 0.0821 atm*L/(mol*K) or 8.314 J/(mol*K).'
      },
      {
        title: 'Henderson-Hasselbalch Equation',
        formula: 'pH = pKa + log([Conjugate Base] / [Weak Acid])',
        explanation: 'Used to calculate buffer system pH and buffering capacity.'
      }
    ]
  },
  {
    id: 'mdcat-phys',
    name: 'Physics',
    weightage: '27% (54 MCQs)',
    totalMarks: 54,
    icon: 'Atom',
    color: '#3B82F6',
    highYieldTopics: [
      'Work, Energy & Power',
      'Circular Motion & Gravitation',
      'Waves, Doppler Effect & Acoustics',
      'Thermodynamics & Heat Capacities',
      'Electrostatics, Current & Electromagnetism'
    ],
    formulaSheet: [
      {
        title: 'Doppler Effect for Sound Waves',
        formula: "f' = f * [(v +- v_o) / (v -+ v_s)]",
        explanation: 'Upper signs apply for approaching motion; lower signs for receding motion.'
      },
      {
        title: 'Coulomb\'s Law & Electric Potential',
        formula: 'F = (k * |q1 * q2|) / r^2, \\quad V = (k * q) / r',
        explanation: 'k = 8.99 * 10^9 N*m^2/C^2.'
      }
    ]
  },
  {
    id: 'mdcat-eng',
    name: 'English & Logic',
    weightage: '12% (24 MCQs)',
    totalMarks: 24,
    icon: 'Compass',
    color: '#EC4899',
    highYieldTopics: [
      'Subject-Verb Agreement & Tenses',
      'Modifiers & Parallel Structure',
      'Logical Syllogisms & Deductions',
      'Critical Reasoning & Assumptions'
    ],
    formulaSheet: [
      {
        title: 'Logical Deduction Rule (Modus Ponens)',
        formula: 'If P implies Q, and P is True, then Q is True',
        explanation: 'Affirming the antecedent yields a valid deductive conclusion.'
      }
    ]
  }
];

export const mdcatPastPapersList: MDCATPastPaper[] = [
  {
    id: 'past-paper-2025',
    year: 2025,
    conductingBody: 'PMDC National Standard Exam',
    totalQuestions: 200,
    durationMinutes: 210,
    difficulty: 'High-Yield',
    subjectsBreakdown: [
      { subject: 'Biology', count: 68 },
      { subject: 'Chemistry', count: 54 },
      { subject: 'Physics', count: 54 },
      { subject: 'English & Logic', count: 24 }
    ],
    downloadablePdf: {
      fileName: 'MDCAT_2025_Solved_Past_Paper_PMDC_RabiaZafar.pdf',
      fileSize: '7.8 MB',
      pages: 42,
      isSolvablyAnnotated: true
    },
    sampleQuestions: [
      {
        id: 'mdcat-q-2025-1',
        subject: 'Biology',
        question: 'Which of the following is the key allosteric inhibitor of Phosphofructokinase-1 (PFK-1) in glycolysis?',
        options: ['AMP', 'ADP', 'High concentrations of ATP and Citrate', 'Fructose-2,6-bisphosphate'],
        correctIndex: 2,
        rationale: 'High ATP and citrate signal ample energy stores, allosterically inhibiting PFK-1 to prevent unnecessary glycolysis.'
      },
      {
        id: 'mdcat-q-2025-2',
        subject: 'Chemistry',
        question: 'What is the oxidation state of Chromium in the dichromate ion (Cr2O7)^2-?',
        options: ['+3', '+5', '+6', '+7'],
        correctIndex: 2,
        rationale: '2x + 7(-2) = -2 => 2x - 14 = -2 => 2x = +12 => x = +6.'
      },
      {
        id: 'mdcat-q-2025-3',
        subject: 'Physics',
        question: 'If the velocity of an object is doubled, its kinetic energy increases by a factor of:',
        options: ['2', '3', '4', '8'],
        correctIndex: 2,
        rationale: 'Kinetic energy KE = 1/2 m v^2. Doubling v quadruples (2^2 = 4) the kinetic energy.'
      }
    ]
  },
  {
    id: 'past-paper-2024',
    year: 2024,
    conductingBody: 'UHS Punjab Medical Entrance',
    totalQuestions: 200,
    durationMinutes: 210,
    difficulty: 'Challenging',
    subjectsBreakdown: [
      { subject: 'Biology', count: 68 },
      { subject: 'Chemistry', count: 54 },
      { subject: 'Physics', count: 54 },
      { subject: 'English & Logic', count: 24 }
    ],
    downloadablePdf: {
      fileName: 'MDCAT_2024_UHS_Solved_Complete_RabiaZafar.pdf',
      fileSize: '7.2 MB',
      pages: 38,
      isSolvablyAnnotated: true
    },
    sampleQuestions: [
      {
        id: 'mdcat-q-2024-1',
        subject: 'Biology',
        question: 'In eukaryotic protein synthesis, the initial codon AUG codes for:',
        options: ['Formyl-methionine', 'Methionine', 'Valine', 'Alanine'],
        correctIndex: 1,
        rationale: 'Eukaryotes use unformylated Methionine, whereas prokaryotes use N-formylmethionine (fMet).'
      }
    ]
  }
];

export const youtubeEducationalChannelsList: YouTubeEducationalChannel[] = [
  {
    id: 'yt-1',
    channelName: '3Blue1Brown',
    creator: 'Grant Sanderson',
    category: 'Math & AI Foundations',
    subscribers: '6.4M Subscribers',
    avatar: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=150&auto=format&fit=crop&q=80',
    description: 'Visual mathematical intuition covering Linear Algebra, Calculus, Neural Networks, and Fourier Transforms using the Python Manim engine.',
    channelUrl: 'https://www.youtube.com/@3blue1brown',
    bestPlaylists: [
      { title: 'Essence of Linear Algebra', videoCount: '16 Videos', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' },
      { title: 'Neural Networks & Deep Learning', videoCount: '5 Videos', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' }
    ],
    featuredVideoTitle: 'Visualizing Attention Mechanisms & Transformers',
    featuredVideoUrl: 'https://www.youtube.com/watch?v=wjZofJX0v4U',
    tags: ['Linear Algebra', 'Calculus', 'Deep Learning', 'Animations']
  },
  {
    id: 'yt-2',
    channelName: 'MIT OpenCourseWare',
    creator: 'Massachusetts Institute of Technology',
    category: 'BSCS & Coding',
    subscribers: '5.2M Subscribers',
    avatar: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&auto=format&fit=crop&q=80',
    description: 'Complete university lectures on Introduction to Algorithms (6.006), Operating Systems, Distributed Systems, and Advanced Data Structures by world-renowned MIT professors.',
    channelUrl: 'https://www.youtube.com/@mitocw',
    bestPlaylists: [
      { title: 'MIT 6.006: Introduction to Algorithms', videoCount: '24 Lectures', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb' },
      { title: 'MIT 6.824: Distributed Systems', videoCount: '20 Lectures', url: 'https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB' }
    ],
    featuredVideoTitle: 'Introduction to Algorithms (Prof. Erik Demaine)',
    featuredVideoUrl: 'https://www.youtube.com/watch?v=ZA-tUyM_y7s',
    tags: ['Algorithms', 'Data Structures', 'MIT', 'Computer Science']
  },
  {
    id: 'yt-3',
    channelName: 'Ninja Nerd',
    creator: 'Zach Murphy & Ninja Nerd Team',
    category: 'MDCAT & Medical',
    subscribers: '3.1M Subscribers',
    avatar: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&auto=format&fit=crop&q=80',
    description: 'The highest yield medical, biochemistry, and physiology lecture series in the world. Exceptional whiteboard explanations for MDCAT and USMLE aspirants.',
    channelUrl: 'https://www.youtube.com/@NinjaNerdOfficial',
    bestPlaylists: [
      { title: 'Cellular Respiration & Bioenergetics', videoCount: '8 Lectures', url: 'https://www.youtube.com/playlist?list=PLTF9h-T1TcJj1eXpQWjGZgV21o0x6X5pT' },
      { title: 'Cardiovascular & Renal Physiology', videoCount: '18 Lectures', url: 'https://www.youtube.com/playlist?list=PLTF9h-T1TcJiN6l3sD4WcQG2p4l6g7l7M' }
    ],
    featuredVideoTitle: 'Glycolysis Made Easy (Step-by-Step Enzymes)',
    featuredVideoUrl: 'https://www.youtube.com/watch?v=8q6wO-r-r5M',
    tags: ['Biochemistry', 'MDCAT', 'Physiology', 'Medicine']
  },
  {
    id: 'yt-4',
    channelName: 'Andrej Karpathy',
    creator: 'Dr. Andrej Karpathy (Stanford / OpenAI)',
    category: 'Master & PhD Research',
    subscribers: '1.2M Subscribers',
    avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
    description: 'Deep dive into Neural Networks, building GPT from scratch in raw PyTorch, tokenizers, backpropagation calculus, and state-of-the-art LLM architectures.',
    channelUrl: 'https://www.youtube.com/@AndrejKarpathy',
    bestPlaylists: [
      { title: 'Neural Networks: Zero to Hero', videoCount: '7 Deep Dives', url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ' }
    ],
    featuredVideoTitle: 'Let\'s build GPT: from scratch, in code, spelled out',
    featuredVideoUrl: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
    tags: ['LLMs', 'Transformers', 'PyTorch', 'Doctoral AI']
  }
];
