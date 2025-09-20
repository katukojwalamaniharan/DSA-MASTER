// DSA Tracker Application
class DSATracker {
    constructor() {
        this.currentUser = null;
        this.currentView = 'dashboard';
        this.currentPattern = null;
        this.currentQuestion = null;
        this.userData = {};
        this.googleClientId = '123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com'; // Demo client ID for localhost
        
        // DSA Patterns Data
        this.patterns = {
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

        // Sample Questions Database (expanded from provided data)
        this.questions = this.generateQuestionsDatabase();
        
        this.init();
    }

    generateQuestionsDatabase() {
        const questions = [];
        let id = 1;

        // Generate questions for each pattern
        Object.keys(this.patterns).forEach(patternName => {
            const pattern = this.patterns[patternName];
            const { Easy, Medium, Hard } = pattern.difficulty;
            
            // Generate Easy questions
            for (let i = 0; i < Easy; i++) {
                questions.push({
                    id: id++,
                    title: this.generateQuestionTitle(patternName, 'Easy', i),
                    description: this.generateQuestionDescription(patternName, 'Easy'),
                    difficulty: 'Easy',
                    pattern: patternName,
                    subpattern: this.getSubpattern(patternName),
                    companies: this.getRandomCompanies(),
                    leetcodeUrl: `https://leetcode.com/problems/${this.generateSlug(patternName, i)}/`,
                    topics: this.getTopics(patternName)
                });
            }
            
            // Generate Medium questions
            for (let i = 0; i < Medium; i++) {
                questions.push({
                    id: id++,
                    title: this.generateQuestionTitle(patternName, 'Medium', i),
                    description: this.generateQuestionDescription(patternName, 'Medium'),
                    difficulty: 'Medium',
                    pattern: patternName,
                    subpattern: this.getSubpattern(patternName),
                    companies: this.getRandomCompanies(),
                    leetcodeUrl: `https://leetcode.com/problems/${this.generateSlug(patternName, i)}/`,
                    topics: this.getTopics(patternName)
                });
            }
            
            // Generate Hard questions
            for (let i = 0; i < Hard; i++) {
                questions.push({
                    id: id++,
                    title: this.generateQuestionTitle(patternName, 'Hard', i),
                    description: this.generateQuestionDescription(patternName, 'Hard'),
                    difficulty: 'Hard',
                    pattern: patternName,
                    subpattern: this.getSubpattern(patternName),
                    companies: this.getRandomCompanies(),
                    leetcodeUrl: `https://leetcode.com/problems/${this.generateSlug(patternName, i)}/`,
                    topics: this.getTopics(patternName)
                });
            }
        });

        // Add some real questions from the provided data
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

    generateQuestionTitle(pattern, difficulty, index) {
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

    generateQuestionDescription(pattern, difficulty) {
        const descriptions = {
            Easy: "This is a fundamental problem that introduces core concepts. Focus on understanding the basic approach and implementation.",
            Medium: "This problem requires combining multiple concepts and optimizing for better time or space complexity.",
            Hard: "A challenging problem that demands advanced algorithmic thinking and efficient implementation strategies."
        };
        return descriptions[difficulty];
    }

    getSubpattern(pattern) {
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

    getRandomCompanies() {
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

    getTopics(pattern) {
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

    generateSlug(pattern, index) {
        return pattern.toLowerCase().replace(/\s+/g, '-') + '-' + (index + 1);
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.initializeGoogleAuth();
        this.showInitialView();
    }

    loadUserData() {
        const savedUser = localStorage.getItem('dsaTracker_currentUser');
        if (savedUser) {
            this.currentUser = savedUser;
            this.loadUserProgress();
        }
    }

    saveUserData() {
        if (this.currentUser) {
            localStorage.setItem('dsaTracker_currentUser', this.currentUser);
            this.saveUserProgress();
        }
    }

    showInitialView() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Show loading screen for 1.5 seconds
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            
            if (this.currentUser) {
                this.showMainApp();
            } else {
                this.showAuthView();
            }
        }, 1500);
    }

    showAuthView() {
        document.getElementById('auth-view').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
        this.hideAuthError();
    }

    showMainApp() {
        document.getElementById('auth-view').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        
        // Display user name properly (handle Google users)
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            const displayName = this.getUserDisplayName();
            userNameElement.textContent = displayName;
        }
        
        this.switchView('dashboard');
    }

    getUserDisplayName() {
        if (!this.currentUser) return '';
        
        // Check if it's a Google user
        if (this.currentUser.startsWith('google_')) {
            const users = JSON.parse(localStorage.getItem('dsaTracker_users') || '{}');
            const userData = users[this.currentUser];
            return userData ? userData.name : this.currentUser;
        }
        
        return this.currentUser;
    }

    setupEventListeners() {
        // Authentication
        const loginForm = document.getElementById('login-form-element');
        const signupForm = document.getElementById('signup-form-element');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Auth form switching
        const switchToSignup = document.getElementById('switch-to-signup');
        const switchToLogin = document.getElementById('switch-to-login');
        
        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => this.switchAuthForm(e, 'signup'));
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => this.switchAuthForm(e, 'login'));
        }

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        document.querySelectorAll('[data-view]').forEach(element => {
            element.addEventListener('click', (e) => {
                const view = e.currentTarget.getAttribute('data-view');
                if (view) this.switchView(view);
            });
        });

        // Back buttons
        const backToPatterns = document.getElementById('back-to-patterns');
        const backToPattern = document.getElementById('back-to-pattern');
        
        if (backToPatterns) {
            backToPatterns.addEventListener('click', () => this.switchView('patterns'));
        }
        
        if (backToPattern) {
            backToPattern.addEventListener('click', () => this.switchView('pattern-detail'));
        }

        // Continue learning
        const continueLearning = document.getElementById('continue-learning');
        if (continueLearning) {
            continueLearning.addEventListener('click', () => this.continueLearning());
        }

        // Search and filters
        const patternSearch = document.getElementById('pattern-search');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const progressFilter = document.getElementById('progress-filter');
        
        if (patternSearch) {
            patternSearch.addEventListener('input', (e) => this.filterPatterns(e.target.value));
        }
        
        if (difficultyFilter) {
            difficultyFilter.addEventListener('change', (e) => this.filterPatterns(null, e.target.value));
        }
        
        if (progressFilter) {
            progressFilter.addEventListener('change', (e) => this.filterPatterns(null, null, e.target.value));
        }

        // Question filters
        const questionDifficultyFilter = document.getElementById('question-difficulty-filter');
        const questionStatusFilter = document.getElementById('question-status-filter');
        
        if (questionDifficultyFilter) {
            questionDifficultyFilter.addEventListener('change', (e) => this.filterQuestions(e.target.value, null));
        }
        
        if (questionStatusFilter) {
            questionStatusFilter.addEventListener('change', (e) => this.filterQuestions(null, e.target.value));
        }

        // Question completion toggle
        const toggleCompletion = document.getElementById('toggle-completion');
        if (toggleCompletion) {
            toggleCompletion.addEventListener('click', () => this.toggleQuestionCompletion());
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const usernameField = document.getElementById('login-username');
        const passwordField = document.getElementById('login-password');
        
        if (!usernameField || !passwordField) {
            this.showAuthError('Form fields not found');
            return;
        }
        
        const username = usernameField.value.trim();
        const password = passwordField.value;

        if (!username || !password) {
            this.showAuthError('Please fill in all fields');
            return;
        }

        // Simple authentication - in real app, this would be server-side
        const users = JSON.parse(localStorage.getItem('dsaTracker_users') || '{}');
        
        if (users[username] && users[username].password === password) {
            this.currentUser = username;
            this.loadUserProgress();
            this.saveUserData();
            this.showMainApp();
        } else {
            this.showAuthError('Invalid username or password');
        }
    }

    handleSignup(e) {
        e.preventDefault();
        
        const usernameField = document.getElementById('signup-username');
        const passwordField = document.getElementById('signup-password');
        const confirmField = document.getElementById('signup-confirm');
        
        if (!usernameField || !passwordField || !confirmField) {
            this.showAuthError('Form fields not found');
            return;
        }
        
        const username = usernameField.value.trim();
        const password = passwordField.value;
        const confirmPassword = confirmField.value;

        if (!username || !password || !confirmPassword) {
            this.showAuthError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            this.showAuthError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            this.showAuthError('Password must be at least 6 characters');
            return;
        }

        const users = JSON.parse(localStorage.getItem('dsaTracker_users') || '{}');
        
        if (users[username]) {
            this.showAuthError('Username already exists');
            return;
        }

        // Create new user
        users[username] = {
            password: password,
            joinDate: new Date().toISOString()
        };
        
        localStorage.setItem('dsaTracker_users', JSON.stringify(users));
        
        this.currentUser = username;
        this.initializeUserProgress();
        this.saveUserData();
        this.showMainApp();
    }

    switchAuthForm(e, form) {
        e.preventDefault();
        
        const loginFormDiv = document.getElementById('login-form');
        const signupFormDiv = document.getElementById('signup-form');
        
        if (!loginFormDiv || !signupFormDiv) return;
        
        if (form === 'signup') {
            loginFormDiv.classList.add('hidden');
            signupFormDiv.classList.remove('hidden');
        } else {
            signupFormDiv.classList.add('hidden');
            loginFormDiv.classList.remove('hidden');
        }
        this.hideAuthError();
    }

    showAuthError(message) {
        const errorDiv = document.getElementById('auth-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        }
    }

    hideAuthError() {
        const errorDiv = document.getElementById('auth-error');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    }

    handleLogout() {
        this.currentUser = null;
        this.userData = {};
        localStorage.removeItem('dsaTracker_currentUser');
        
        // Sign out from Google if user was signed in with Google
        if (window.google && window.google.accounts) {
            window.google.accounts.id.disableAutoSelect();
        }
        
        this.showAuthView();
    }

    loadUserProgress() {
        const savedData = localStorage.getItem(`dsaTracker_progress_${this.currentUser}`);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            this.userData = {
                ...parsed,
                completedQuestions: new Set(parsed.completedQuestions || [])
            };
        } else {
            this.initializeUserProgress();
        }
    }

    initializeUserProgress() {
        this.userData = {
            completedQuestions: new Set(),
            joinDate: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            streak: 0
        };
        this.saveUserProgress();
    }

    saveUserProgress() {
        if (!this.currentUser) return;
        
        const dataToSave = {
            ...this.userData,
            completedQuestions: Array.from(this.userData.completedQuestions || [])
        };
        localStorage.setItem(`dsaTracker_progress_${this.currentUser}`, JSON.stringify(dataToSave));
    }

    // Google Authentication Methods
    initializeGoogleAuth() {
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: this.handleGoogleSignIn.bind(this)
            });
        }
    }

    handleGoogleSignIn(response) {
        try {
            // Decode the JWT token to get user information
            const payload = this.decodeJWT(response.credential);
            
            if (!payload) {
                this.showAuthError('Failed to process Google authentication');
                return;
            }

            const googleUser = {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                authProvider: 'google'
            };

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('dsaTracker_users') || '{}');
            const userKey = `google_${googleUser.id}`;
            
            if (!users[userKey]) {
                // Create new Google user
                users[userKey] = {
                    ...googleUser,
                    joinDate: new Date().toISOString(),
                    authProvider: 'google'
                };
                localStorage.setItem('dsaTracker_users', JSON.stringify(users));
            }

            // Set current user and load their progress
            this.currentUser = userKey;
            this.loadUserProgress();
            this.saveUserData();
            this.showMainApp();
            
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            this.showAuthError('Google authentication failed. Please try again.');
        }
    }

    decodeJWT(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('JWT Decode Error:', error);
            return null;
        }
    }

    handleNavigation(e) {
        e.preventDefault();
        const view = e.target.getAttribute('data-view');
        if (view) {
            this.switchView(view);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
        }
    }

    switchView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
        
        // Show target view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.remove('hidden');
            this.currentView = viewName;
            
            // Update nav
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            const navLink = document.querySelector(`[data-view="${viewName}"]`);
            if (navLink && navLink.classList.contains('nav-link')) {
                navLink.classList.add('active');
            }
            
            // Load view-specific content
            this.loadViewContent(viewName);
        }
    }

    loadViewContent(viewName) {
        switch (viewName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'patterns':
                this.loadPatterns();
                break;
            case 'pattern-detail':
                this.loadPatternDetail();
                break;
            case 'question-detail':
                this.loadQuestionDetail();
                break;
            case 'profile':
                this.loadProfile();
                break;
        }
    }

    loadDashboard() {
        const stats = this.calculateStats();
        
        // Update stats
        const totalCompletedEl = document.getElementById('total-completed');
        const completionPercentageEl = document.getElementById('completion-percentage');
        const currentStreakEl = document.getElementById('current-streak');
        const patternsMasteredEl = document.getElementById('patterns-mastered');
        
        if (totalCompletedEl) totalCompletedEl.textContent = stats.totalCompleted;
        if (completionPercentageEl) completionPercentageEl.textContent = `${stats.completionPercentage}%`;
        if (currentStreakEl) currentStreakEl.textContent = stats.streak;
        if (patternsMasteredEl) patternsMasteredEl.textContent = stats.patternsMastered;
        
        // Load pattern progress
        this.loadPatternProgress();
    }

    calculateStats() {
        const completed = this.userData.completedQuestions?.size || 0;
        const total = this.questions.length;
        const completionPercentage = Math.round((completed / total) * 100);
        
        // Calculate patterns mastered
        let patternsMastered = 0;
        Object.keys(this.patterns).forEach(patternName => {
            const patternQuestions = this.questions.filter(q => q.pattern === patternName);
            const completedInPattern = patternQuestions.filter(q => 
                this.userData.completedQuestions?.has(q.id)
            ).length;
            
            if (completedInPattern === patternQuestions.length && patternQuestions.length > 0) {
                patternsMastered++;
            }
        });
        
        return {
            totalCompleted: completed,
            completionPercentage,
            streak: this.userData.streak || 0,
            patternsMastered
        };
    }

    loadPatternProgress() {
        const container = document.getElementById('pattern-progress');
        if (!container) return;
        
        container.innerHTML = '';
        
        Object.keys(this.patterns).forEach(patternName => {
            const pattern = this.patterns[patternName];
            const patternQuestions = this.questions.filter(q => q.pattern === patternName);
            const completedInPattern = patternQuestions.filter(q => 
                this.userData.completedQuestions?.has(q.id)
            ).length;
            const progressPercentage = Math.round((completedInPattern / patternQuestions.length) * 100);
            
            const progressItem = document.createElement('div');
            progressItem.className = 'pattern-progress-item';
            progressItem.innerHTML = `
                <div class="pattern-info">
                    <span class="pattern-icon">${pattern.icon}</span>
                    <div class="pattern-details">
                        <h4>${patternName}</h4>
                        <p>${completedInPattern}/${patternQuestions.length} completed</p>
                    </div>
                </div>
                <div class="pattern-progress-bar">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                    <span class="progress-text">${progressPercentage}%</span>
                </div>
            `;
            
            progressItem.addEventListener('click', () => {
                this.currentPattern = patternName;
                this.switchView('pattern-detail');
            });
            
            container.appendChild(progressItem);
        });
    }

    loadPatterns() {
        const container = document.getElementById('patterns-grid');
        if (!container) return;
        
        container.innerHTML = '';
        
        Object.keys(this.patterns).forEach(patternName => {
            const pattern = this.patterns[patternName];
            const patternQuestions = this.questions.filter(q => q.pattern === patternName);
            const completedInPattern = patternQuestions.filter(q => 
                this.userData.completedQuestions?.has(q.id)
            ).length;
            const progressPercentage = Math.round((completedInPattern / patternQuestions.length) * 100);
            
            const patternCard = document.createElement('div');
            patternCard.className = 'pattern-card card';
            patternCard.innerHTML = `
                <div class="pattern-header">
                    <span class="pattern-icon-large">${pattern.icon}</span>
                    <div class="pattern-title">
                        <h3>${patternName}</h3>
                        <p class="pattern-count">${pattern.count} questions</p>
                    </div>
                </div>
                <div class="pattern-progress-section">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                    <span class="progress-text">${completedInPattern}/${patternQuestions.length} completed</span>
                </div>
                <div class="difficulty-breakdown">
                    <div class="difficulty-item">
                        <span class="difficulty-dot easy"></span>
                        <span>${pattern.difficulty.Easy} Easy</span>
                    </div>
                    <div class="difficulty-item">
                        <span class="difficulty-dot medium"></span>
                        <span>${pattern.difficulty.Medium} Medium</span>
                    </div>
                    <div class="difficulty-item">
                        <span class="difficulty-dot hard"></span>
                        <span>${pattern.difficulty.Hard} Hard</span>
                    </div>
                </div>
            `;
            
            patternCard.addEventListener('click', () => {
                this.currentPattern = patternName;
                this.switchView('pattern-detail');
            });
            
            container.appendChild(patternCard);
        });
    }

    loadPatternDetail() {
        if (!this.currentPattern) return;
        
        const pattern = this.patterns[this.currentPattern];
        const patternQuestions = this.questions.filter(q => q.pattern === this.currentPattern);
        const completedInPattern = patternQuestions.filter(q => 
            this.userData.completedQuestions?.has(q.id)
        ).length;
        const progressPercentage = Math.round((completedInPattern / patternQuestions.length) * 100);
        
        // Update header
        const patternTitleEl = document.getElementById('pattern-title');
        const patternDescriptionEl = document.getElementById('pattern-description');
        const patternCompletedCountEl = document.getElementById('pattern-completed-count');
        const patternTotalCountEl = document.getElementById('pattern-total-count');
        
        if (patternTitleEl) patternTitleEl.textContent = this.currentPattern;
        if (patternDescriptionEl) patternDescriptionEl.textContent = pattern.description;
        if (patternCompletedCountEl) patternCompletedCountEl.textContent = completedInPattern;
        if (patternTotalCountEl) patternTotalCountEl.textContent = patternQuestions.length;
        
        // Update progress bar
        const patternProgressFillEl = document.getElementById('pattern-progress-fill');
        const patternProgressTextEl = document.getElementById('pattern-progress-text');
        
        if (patternProgressFillEl) patternProgressFillEl.style.width = `${progressPercentage}%`;
        if (patternProgressTextEl) patternProgressTextEl.textContent = `${progressPercentage}%`;
        
        // Load questions
        this.loadQuestionsList(patternQuestions);
    }

    loadQuestionsList(questions = null) {
        const questionsToShow = questions || this.questions.filter(q => q.pattern === this.currentPattern);
        const container = document.getElementById('questions-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        questionsToShow.forEach(question => {
            const isCompleted = this.userData.completedQuestions?.has(question.id);
            
            const questionItem = document.createElement('div');
            questionItem.className = `question-item ${isCompleted ? 'completed' : ''}`;
            questionItem.innerHTML = `
                <div class="question-main">
                    <div class="question-status ${isCompleted ? 'completed' : ''}">
                        ${isCompleted ? '✓' : ''}
                    </div>
                    <div class="question-info">
                        <h4>${question.title}</h4>
                        <div class="question-meta">
                            <span class="question-difficulty status status--${question.difficulty.toLowerCase()}">${question.difficulty}</span>
                            <span class="question-companies">${question.companies.join(', ')}</span>
                        </div>
                    </div>
                </div>
            `;
            
            questionItem.addEventListener('click', () => {
                this.currentQuestion = question;
                this.switchView('question-detail');
            });
            
            container.appendChild(questionItem);
        });
    }

    loadQuestionDetail() {
        if (!this.currentQuestion) return;
        
        const question = this.currentQuestion;
        const isCompleted = this.userData.completedQuestions?.has(question.id);
        
        // Update content
        const questionTitleEl = document.getElementById('question-title');
        const questionDescriptionEl = document.getElementById('question-description-text');
        const questionDifficultyEl = document.getElementById('question-difficulty');
        const questionPatternEl = document.getElementById('question-pattern');
        const leetcodeLinkEl = document.getElementById('leetcode-link');
        
        if (questionTitleEl) questionTitleEl.textContent = question.title;
        if (questionDescriptionEl) questionDescriptionEl.textContent = question.description;
        if (questionDifficultyEl) {
            questionDifficultyEl.textContent = question.difficulty;
            questionDifficultyEl.className = `status status--${question.difficulty.toLowerCase()}`;
        }
        if (questionPatternEl) questionPatternEl.textContent = question.pattern;
        if (leetcodeLinkEl) leetcodeLinkEl.href = question.leetcodeUrl;
        
        // Update companies
        const companiesContainer = document.getElementById('question-companies');
        if (companiesContainer) {
            companiesContainer.innerHTML = '';
            question.companies.forEach(company => {
                const companyTag = document.createElement('span');
                companyTag.className = 'company-tag';
                companyTag.textContent = company;
                companiesContainer.appendChild(companyTag);
            });
        }
        
        // Update completion button
        const toggleBtn = document.getElementById('toggle-completion');
        if (toggleBtn) {
            toggleBtn.textContent = isCompleted ? 'Mark as Incomplete' : 'Mark as Complete';
            toggleBtn.className = `btn ${isCompleted ? 'btn--outline' : 'btn--primary'}`;
        }
    }

    toggleQuestionCompletion() {
        if (!this.currentQuestion) return;
        
        const questionId = this.currentQuestion.id;
        const isCompleted = this.userData.completedQuestions?.has(questionId);
        
        if (isCompleted) {
            this.userData.completedQuestions.delete(questionId);
        } else {
            if (!this.userData.completedQuestions) {
                this.userData.completedQuestions = new Set();
            }
            this.userData.completedQuestions.add(questionId);
        }
        
        this.saveUserProgress();
        this.loadQuestionDetail(); // Refresh the view
    }

    loadProfile() {
        const users = JSON.parse(localStorage.getItem('dsaTracker_users') || '{}');
        const userInfo = users[this.currentUser];
        const stats = this.calculateDetailedStats();
        
        // Update profile info
        const profileUsernameEl = document.getElementById('profile-username');
        const profileJoinDateEl = document.getElementById('profile-join-date');
        
        if (profileUsernameEl) profileUsernameEl.textContent = this.currentUser;
        if (profileJoinDateEl) {
            profileJoinDateEl.textContent = userInfo ? new Date(userInfo.joinDate).toLocaleDateString() : 'Unknown';
        }
        
        // Update detailed stats
        const elements = {
            'profile-total-completed': stats.totalCompleted,
            'profile-easy-completed': stats.easyCompleted,
            'profile-medium-completed': stats.mediumCompleted,
            'profile-hard-completed': stats.hardCompleted,
            'profile-patterns-mastered': stats.patternsMastered
        };
        
        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = elements[id];
        });
        
        // Load achievements
        this.loadAchievements(stats);
    }

    calculateDetailedStats() {
        const completed = Array.from(this.userData.completedQuestions || []);
        const completedQuestions = this.questions.filter(q => completed.includes(q.id));
        
        const easyCompleted = completedQuestions.filter(q => q.difficulty === 'Easy').length;
        const mediumCompleted = completedQuestions.filter(q => q.difficulty === 'Medium').length;
        const hardCompleted = completedQuestions.filter(q => q.difficulty === 'Hard').length;
        
        // Calculate patterns mastered
        let patternsMastered = 0;
        Object.keys(this.patterns).forEach(patternName => {
            const patternQuestions = this.questions.filter(q => q.pattern === patternName);
            const completedInPattern = patternQuestions.filter(q => 
                this.userData.completedQuestions?.has(q.id)
            ).length;
            
            if (completedInPattern === patternQuestions.length && patternQuestions.length > 0) {
                patternsMastered++;
            }
        });
        
        return {
            totalCompleted: completed.length,
            easyCompleted,
            mediumCompleted,
            hardCompleted,
            patternsMastered
        };
    }

    loadAchievements(stats) {
        const achievements = [
            {
                id: 'first_question',
                title: 'First Steps',
                description: 'Complete your first question',
                icon: '🎯',
                unlocked: stats.totalCompleted >= 1
            },
            {
                id: 'ten_questions',
                title: 'Getting Started',
                description: 'Complete 10 questions',
                icon: '🚀',
                unlocked: stats.totalCompleted >= 10
            },
            {
                id: 'fifty_questions',
                title: 'Making Progress',
                description: 'Complete 50 questions',
                icon: '⚡',
                unlocked: stats.totalCompleted >= 50
            },
            {
                id: 'hundred_questions',
                title: 'Dedication',
                description: 'Complete 100 questions',
                icon: '💯',
                unlocked: stats.totalCompleted >= 100
            },
            {
                id: 'first_pattern',
                title: 'Pattern Master',
                description: 'Master your first pattern',
                icon: '🏆',
                unlocked: stats.patternsMastered >= 1
            },
            {
                id: 'all_patterns',
                title: 'Algorithm Expert',
                description: 'Master all patterns',
                icon: '👑',
                unlocked: stats.patternsMastered >= 10
            }
        ];
        
        const container = document.getElementById('achievements-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`;
            achievementEl.innerHTML = `
                <span class="achievement-icon">${achievement.icon}</span>
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
            `;
            container.appendChild(achievementEl);
        });
    }

    continueLearning() {
        // Find the first incomplete question
        const incompleteQuestion = this.questions.find(q => 
            !this.userData.completedQuestions?.has(q.id)
        );
        
        if (incompleteQuestion) {
            this.currentPattern = incompleteQuestion.pattern;
            this.currentQuestion = incompleteQuestion;
            this.switchView('question-detail');
        } else {
            // All questions completed - go to patterns view
            this.switchView('patterns');
        }
    }

    filterPatterns(searchTerm, difficulty, progress) {
        // This would filter the patterns based on the criteria
        // For now, just reload patterns
        this.loadPatterns();
    }

    filterQuestions(difficulty, status) {
        let filteredQuestions = this.questions.filter(q => q.pattern === this.currentPattern);
        
        if (difficulty) {
            filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
        }
        
        if (status) {
            if (status === 'completed') {
                filteredQuestions = filteredQuestions.filter(q => 
                    this.userData.completedQuestions?.has(q.id)
                );
            } else if (status === 'todo') {
                filteredQuestions = filteredQuestions.filter(q => 
                    !this.userData.completedQuestions?.has(q.id)
                );
            }
        }
        
        this.loadQuestionsList(filteredQuestions);
    }
}

// Global Google Sign-In callback function
window.handleGoogleSignIn = function(response) {
    if (window.dsaTracker) {
        window.dsaTracker.handleGoogleSignIn(response);
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.dsaTracker = new DSATracker();
});