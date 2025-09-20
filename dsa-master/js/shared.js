// Shared JavaScript functionality for DSA Tracker

// DSA Patterns Data
const DSA_PATTERNS = {
    "Array and Strings": {
        count: 40,
        difficulty: { Easy: 15, Medium: 20, Hard: 5 },
        color: "#ef4444",
        icon: "📊",
        description: "Master array manipulation and string processing techniques"
    },
    "Two Pointers and Sliding Window": {
        count: 30,
        difficulty: { Easy: 10, Medium: 15, Hard: 5 },
        color: "#f97316",
        icon: "👆",
        description: "Efficient techniques for array and string problems"
    },
    "Linked Lists": {
        count: 20,
        difficulty: { Easy: 8, Medium: 10, Hard: 2 },
        color: "#eab308",
        icon: "🔗",
        description: "Linear data structure manipulation and traversal"
    },
    "Stacks and Queues": {
        count: 20,
        difficulty: { Easy: 7, Medium: 10, Hard: 3 },
        color: "#22c55e",
        icon: "📚",
        description: "LIFO and FIFO data structure applications"
    },
    "Trees and Graphs": {
        count: 50,
        difficulty: { Easy: 15, Medium: 25, Hard: 10 },
        color: "#06b6d4",
        icon: "🌳",
        description: "Hierarchical and network data structure algorithms"
    },
    "Binary Search and Math": {
        count: 15,
        difficulty: { Easy: 5, Medium: 7, Hard: 3 },
        color: "#3b82f6",
        icon: "🔍",
        description: "Efficient searching and mathematical problem solving"
    },
    "Dynamic Programming": {
        count: 70,
        difficulty: { Easy: 20, Medium: 35, Hard: 15 },
        color: "#6366f1",
        icon: "⚡",
        description: "Optimization technique for overlapping subproblems"
    },
    "Greedy Algorithms": {
        count: 15,
        difficulty: { Easy: 5, Medium: 8, Hard: 2 },
        color: "#8b5cf6",
        icon: "🎯",
        description: "Locally optimal choice strategy"
    },
    "Backtracking and Recursion": {
        count: 20,
        difficulty: { Easy: 6, Medium: 10, Hard: 4 },
        color: "#ec4899",
        icon: "🔄",
        description: "Explore all possibilities systematically"
    },
    "Bit Manipulation and Miscellaneous": {
        count: 20,
        difficulty: { Easy: 8, Medium: 10, Hard: 2 },
        color: "#64748b",
        icon: "🔧",
        description: "Bitwise operations and advanced techniques"
    }
};

// Sample Questions Database
function generateQuestionsDatabase() {
    const questions = [];
    let id = 1;

    // Generate questions for each pattern
    Object.keys(DSA_PATTERNS).forEach(patternName => {
        const pattern = DSA_PATTERNS[patternName];
        const { Easy, Medium, Hard } = pattern.difficulty;
        
        // Generate Easy questions
        for (let i = 0; i < Easy; i++) {
            questions.push({
                id: id++,
                title: generateQuestionTitle(patternName, 'Easy', i),
                description: generateQuestionDescription(patternName, 'Easy'),
                difficulty: 'Easy',
                pattern: patternName,
                subpattern: getSubpattern(patternName),
                companies: getRandomCompanies(),
                leetcodeUrl: `https://leetcode.com/problems/${generateSlug(patternName, i)}/`,
                topics: getTopics(patternName)
            });
        }
        
        // Generate Medium questions
        for (let i = 0; i < Medium; i++) {
            questions.push({
                id: id++,
                title: generateQuestionTitle(patternName, 'Medium', i),
                description: generateQuestionDescription(patternName, 'Medium'),
                difficulty: 'Medium',
                pattern: patternName,
                subpattern: getSubpattern(patternName),
                companies: getRandomCompanies(),
                leetcodeUrl: `https://leetcode.com/problems/${generateSlug(patternName, i)}/`,
                topics: getTopics(patternName)
            });
        }
        
        // Generate Hard questions
        for (let i = 0; i < Hard; i++) {
            questions.push({
                id: id++,
                title: generateQuestionTitle(patternName, 'Hard', i),
                description: generateQuestionDescription(patternName, 'Hard'),
                difficulty: 'Hard',
                pattern: patternName,
                subpattern: getSubpattern(patternName),
                companies: getRandomCompanies(),
                leetcodeUrl: `https://leetcode.com/problems/${generateSlug(patternName, i)}/`,
                topics: getTopics(patternName)
            });
        }
    });

    // Add some real questions
    const realQuestions = [
        {
            id: 1,
            title: "Two Sum",
            description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            difficulty: "Easy",
            pattern: "Array and Strings",
            subpattern: "Hash Map",
            companies: ["Google", "Amazon", "Facebook", "Microsoft"],
            leetcodeUrl: "https://leetcode.com/problems/two-sum/",
            topics: ["Array", "Hash Table"]
        },
        {
            id: 2,
            title: "Best Time to Buy and Sell Stock",
            description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
            difficulty: "Easy",
            pattern: "Array and Strings",
            subpattern: "Single Pass",
            companies: ["Amazon", "Google", "Facebook", "Apple"],
            leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            topics: ["Array", "Dynamic Programming"]
        },
        {
            id: 13,
            title: "Climbing Stairs",
            description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
            difficulty: "Easy",
            pattern: "Dynamic Programming",
            subpattern: "1D DP",
            companies: ["Amazon", "Google", "Adobe"],
            leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
            topics: ["Math", "Dynamic Programming", "Memoization"]
        },
        {
            id: 25,
            title: "Valid Palindrome",
            description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
            difficulty: "Easy",
            pattern: "Two Pointers and Sliding Window",
            subpattern: "Two Pointers",
            companies: ["Facebook", "Amazon", "Google"],
            leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
            topics: ["Two Pointers", "String"]
        },
        {
            id: 45,
            title: "Maximum Depth of Binary Tree",
            description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
            difficulty: "Easy",
            pattern: "Trees and Graphs",
            subpattern: "Tree DFS",
            companies: ["Google", "Amazon", "Facebook"],
            leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            topics: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"]
        }
    ];

    // Replace first few questions with real ones
    realQuestions.forEach((realQ, index) => {
        if (questions[index]) {
            questions[index] = realQ;
        }
    });

    return questions;
}

function generateQuestionTitle(pattern, difficulty, index) {
    const templates = {
        "Array and Strings": ["Array Sum Problem", "String Manipulation", "Array Rotation", "Substring Search", "Array Merge"],
        "Two Pointers and Sliding Window": ["Two Pointer Problem", "Sliding Window Maximum", "Container Problem", "Palindrome Check", "Window Sum"],
        "Linked Lists": ["Linked List Reversal", "Cycle Detection", "List Merge", "Node Removal", "List Intersection"],
        "Stacks and Queues": ["Valid Parentheses", "Stack Operations", "Queue Implementation", "Expression Evaluation", "Next Greater Element"],
        "Trees and Graphs": ["Tree Traversal", "Graph Search", "Path Finding", "Tree Construction", "Graph Connectivity"],
        "Binary Search and Math": ["Binary Search", "Mathematical Calculation", "Search in Rotated Array", "Number Theory", "Optimization Problem"],
        "Dynamic Programming": ["DP Optimization", "Subsequence Problem", "Grid Path", "Knapsack Variant", "State Machine"],
        "Greedy Algorithms": ["Greedy Choice", "Interval Problem", "Activity Selection", "Huffman Coding", "Minimum Spanning"],
        "Backtracking and Recursion": ["Permutation Generation", "Combination Sum", "N-Queens Problem", "Sudoku Solver", "Word Search"],
        "Bit Manipulation and Miscellaneous": ["Bit Operations", "Number Complement", "Single Number", "Bit Counting", "Power of Two"]
    };
    
    const patternTemplates = templates[pattern] || ["Generic Problem"];
    const templateIndex = index % patternTemplates.length;
    return `${patternTemplates[templateIndex]} ${Math.floor(index / patternTemplates.length) + 1}`;
}

function generateQuestionDescription(pattern, difficulty) {
    const descriptions = {
        Easy: "This is a fundamental problem that introduces core concepts. Focus on understanding the basic approach and implementation.",
        Medium: "This problem requires combining multiple concepts and optimizing for better time or space complexity.",
        Hard: "A challenging problem that demands advanced algorithmic thinking and efficient implementation strategies."
    };
    return descriptions[difficulty];
}

function getSubpattern(pattern) {
    const subpatterns = {
        "Array and Strings": "Array Manipulation",
        "Two Pointers and Sliding Window": "Two Pointers",
        "Linked Lists": "List Traversal",
        "Stacks and Queues": "Stack Operations",
        "Trees and Graphs": "Tree DFS",
        "Binary Search and Math": "Binary Search",
        "Dynamic Programming": "1D DP",
        "Greedy Algorithms": "Greedy Choice",
        "Backtracking and Recursion": "Recursion",
        "Bit Manipulation and Miscellaneous": "Bit Operations"
    };
    return subpatterns[pattern] || "General";
}

function getRandomCompanies() {
    const companies = ["Google", "Amazon", "Facebook", "Microsoft", "Apple", "Netflix", "Uber", "LinkedIn", "Adobe", "Salesforce"];
    const count = Math.floor(Math.random() * 4) + 2; // 2-5 companies
    const selected = [];
    for (let i = 0; i < count; i++) {
        const company = companies[Math.floor(Math.random() * companies.length)];
        if (!selected.includes(company)) {
            selected.push(company);
        }
    }
    return selected;
}

function getTopics(pattern) {
    const topics = {
        "Array and Strings": ["Array", "String", "Hash Table"],
        "Two Pointers and Sliding Window": ["Two Pointers", "Sliding Window", "Array"],
        "Linked Lists": ["Linked List", "Two Pointers"],
        "Stacks and Queues": ["Stack", "Queue", "Design"],
        "Trees and Graphs": ["Tree", "Graph", "DFS", "BFS"],
        "Binary Search and Math": ["Binary Search", "Math", "Array"],
        "Dynamic Programming": ["Dynamic Programming", "Memoization"],
        "Greedy Algorithms": ["Greedy", "Array", "Sorting"],
        "Backtracking and Recursion": ["Backtracking", "Recursion", "DFS"],
        "Bit Manipulation and Miscellaneous": ["Bit Manipulation", "Math"]
    };
    return topics[pattern] || ["General"];
}

function generateSlug(pattern, index) {
    return pattern.toLowerCase().replace(/\s+/g, '-') + '-' + (index + 1);
}

// User Data Management
function loadUserData() {
    const savedUser = localStorage.getItem('dsaTracker_currentUser');
    if (savedUser) {
        return savedUser;
    }
    return null;
}

function saveUserData(username) {
    if (username) {
        localStorage.setItem('dsaTracker_currentUser', username);
    }
}

function loadUserProgress(username) {
    const savedData = localStorage.getItem(`dsaTracker_progress_${username}`);
    if (savedData) {
        const parsed = JSON.parse(savedData);
        return {
            ...parsed,
            completedQuestions: new Set(parsed.completedQuestions || [])
        };
    } else {
        return initializeUserProgress();
    }
}

function initializeUserProgress() {
    return {
        completedQuestions: new Set(),
        joinDate: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        streak: 0
    };
}

function saveUserProgress(username, userData) {
    if (!username) return;
    
    const dataToSave = {
        ...userData,
        completedQuestions: Array.from(userData.completedQuestions || [])
    };
    localStorage.setItem(`dsaTracker_progress_${username}`, JSON.stringify(dataToSave));
}

// Navigation Helper
function navigateToPage(page) {
    if (page === 'home') {
        window.location.href = 'home.html';
    } else if (page === 'login') {
        window.location.href = 'login.html';
    }
}

// Check if user is logged in
function checkAuth() {
    const currentUser = loadUserData();
    if (!currentUser) {
        navigateToPage('login');
        return false;
    }
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('dsaTracker_currentUser');
    navigateToPage('login');
}