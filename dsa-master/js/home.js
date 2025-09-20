// Home page functionality for DSA Tracker

class DSATrackerHome {
    constructor() {
        this.currentUser = null;
        this.currentView = 'dashboard';
        this.currentPattern = null;
        this.currentQuestion = null;
        this.userData = {};
        this.questions = generateQuestionsDatabase();
        
        this.init();
    }

    init() {
        // Check authentication
        if (!checkAuth()) {
            return;
        }

        this.currentUser = loadUserData();
        this.userData = loadUserProgress(this.currentUser);
        this.setupEventListeners();
        this.showMainApp();
    }

    showMainApp() {
        const mainApp = document.getElementById('main-app');
        if (mainApp) {
            mainApp.classList.remove('hidden');
        }
        
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
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => logout());
        }

        // Quick actions
        const continueLearning = document.getElementById('continue-learning');
        if (continueLearning) {
            continueLearning.addEventListener('click', () => this.continueLearning());
        }

        // Pattern search and filters
        const patternSearch = document.getElementById('pattern-search');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const progressFilter = document.getElementById('progress-filter');

        if (patternSearch) {
            patternSearch.addEventListener('input', (e) => this.filterPatterns(e.target.value, difficultyFilter?.value, progressFilter?.value));
        }

        if (difficultyFilter) {
            difficultyFilter.addEventListener('change', (e) => this.filterPatterns(patternSearch?.value, e.target.value, progressFilter?.value));
        }

        if (progressFilter) {
            progressFilter.addEventListener('change', (e) => this.filterPatterns(patternSearch?.value, difficultyFilter?.value, e.target.value));
        }

        // Back buttons
        const backToPatterns = document.getElementById('back-to-patterns');
        const backToPattern = document.getElementById('back-to-pattern');

        if (backToPatterns) {
            backToPatterns.addEventListener('click', () => this.switchView('patterns'));
        }

        if (backToPattern) {
            backToPattern.addEventListener('click', () => this.switchView('pattern-detail'));
        }

        // Question filters
        const questionDifficultyFilter = document.getElementById('question-difficulty-filter');
        const questionStatusFilter = document.getElementById('question-status-filter');

        if (questionDifficultyFilter) {
            questionDifficultyFilter.addEventListener('change', (e) => this.filterQuestions(e.target.value, questionStatusFilter?.value));
        }

        if (questionStatusFilter) {
            questionStatusFilter.addEventListener('change', (e) => this.filterQuestions(questionDifficultyFilter?.value, e.target.value));
        }

        // Question completion toggle
        const toggleCompletion = document.getElementById('toggle-completion');
        if (toggleCompletion) {
            toggleCompletion.addEventListener('click', () => this.toggleQuestionCompletion());
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
        this.updateStats();
        this.loadPatternProgress();
    }

    updateStats() {
        const completedCount = this.userData.completedQuestions?.size || 0;
        const totalQuestions = this.questions.length;
        const completionPercentage = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;
        const patternsMastered = this.getPatternsMasteredCount();

        // Update stat elements
        const totalCompletedEl = document.getElementById('total-completed');
        const completionPercentageEl = document.getElementById('completion-percentage');
        const currentStreakEl = document.getElementById('current-streak');
        const patternsMasteredEl = document.getElementById('patterns-mastered');

        if (totalCompletedEl) totalCompletedEl.textContent = completedCount;
        if (completionPercentageEl) completionPercentageEl.textContent = `${completionPercentage}%`;
        if (currentStreakEl) currentStreakEl.textContent = this.userData.streak || 0;
        if (patternsMasteredEl) patternsMasteredEl.textContent = patternsMastered;
    }

    getPatternsMasteredCount() {
        let mastered = 0;
        Object.keys(DSA_PATTERNS).forEach(patternName => {
            const patternQuestions = this.questions.filter(q => q.pattern === patternName);
            const completedInPattern = patternQuestions.filter(q => 
                this.userData.completedQuestions?.has(q.id)
            ).length;
            
            if (completedInPattern === patternQuestions.length && patternQuestions.length > 0) {
                mastered++;
            }
        });
        return mastered;
    }

    loadPatternProgress() {
        const patternProgressEl = document.getElementById('pattern-progress');
        if (!patternProgressEl) return;

        patternProgressEl.innerHTML = '';

        Object.keys(DSA_PATTERNS).forEach(patternName => {
            const pattern = DSA_PATTERNS[patternName];
            const patternQuestions = this.questions.filter(q => q.pattern === patternName);
            const completedInPattern = patternQuestions.filter(q => 
                this.userData.completedQuestions?.has(q.id)
            ).length;
            const progressPercentage = patternQuestions.length > 0 ? 
                Math.round((completedInPattern / patternQuestions.length) * 100) : 0;

            const progressItem = document.createElement('div');
            progressItem.className = 'pattern-progress-item';
            progressItem.innerHTML = `
                <div class="pattern-progress-header">
                    <span class="pattern-name">${pattern.icon} ${patternName}</span>
                    <span class="pattern-count">${completedInPattern}/${patternQuestions.length}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            `;
            patternProgressEl.appendChild(progressItem);
        });
    }

    loadPatterns() {
        const patternsGrid = document.getElementById('patterns-grid');
        if (!patternsGrid) return;

        patternsGrid.innerHTML = '';

        Object.keys(DSA_PATTERNS).forEach(patternName => {
            const pattern = DSA_PATTERNS[patternName];
            const patternQuestions = this.questions.filter(q => q.pattern === patternName);
            const completedInPattern = patternQuestions.filter(q => 
                this.userData.completedQuestions?.has(q.id)
            ).length;
            const progressPercentage = patternQuestions.length > 0 ? 
                Math.round((completedInPattern / patternQuestions.length) * 100) : 0;

            const patternCard = document.createElement('div');
            patternCard.className = 'pattern-card';
            patternCard.innerHTML = `
                <div class="pattern-header">
                    <div class="pattern-icon">${pattern.icon}</div>
                    <div class="pattern-info">
                        <h3>${patternName}</h3>
                        <p>${pattern.description}</p>
                    </div>
                </div>
                <div class="pattern-stats">
                    <div class="stat">
                        <span class="stat-number">${patternQuestions.length}</span>
                        <span class="stat-label">Questions</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${progressPercentage}%</span>
                        <span class="stat-label">Complete</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            `;

            patternCard.addEventListener('click', () => {
                this.currentPattern = patternName;
                this.switchView('pattern-detail');
            });

            patternsGrid.appendChild(patternCard);
        });
    }

    loadPatternDetail() {
        if (!this.currentPattern) return;

        const pattern = DSA_PATTERNS[this.currentPattern];
        const patternQuestions = this.questions.filter(q => q.pattern === this.currentPattern);
        const completedInPattern = patternQuestions.filter(q => 
            this.userData.completedQuestions?.has(q.id)
        ).length;
        const progressPercentage = patternQuestions.length > 0 ? 
            Math.round((completedInPattern / patternQuestions.length) * 100) : 0;

        // Update pattern detail elements
        const patternTitle = document.getElementById('pattern-title');
        const patternDescription = document.getElementById('pattern-description');
        const patternCompletedCount = document.getElementById('pattern-completed-count');
        const patternTotalCount = document.getElementById('pattern-total-count');
        const patternProgressFill = document.getElementById('pattern-progress-fill');
        const patternProgressText = document.getElementById('pattern-progress-text');

        if (patternTitle) patternTitle.textContent = this.currentPattern;
        if (patternDescription) patternDescription.textContent = pattern.description;
        if (patternCompletedCount) patternCompletedCount.textContent = completedInPattern;
        if (patternTotalCount) patternTotalCount.textContent = patternQuestions.length;
        if (patternProgressFill) patternProgressFill.style.width = `${progressPercentage}%`;
        if (patternProgressText) patternProgressText.textContent = `${progressPercentage}%`;

        this.loadQuestionsList(patternQuestions);
    }

    loadQuestionsList(questions) {
        const questionsList = document.getElementById('questions-list');
        if (!questionsList) return;

        questionsList.innerHTML = '';

        questions.forEach(question => {
            const isCompleted = this.userData.completedQuestions?.has(question.id);
            const questionCard = document.createElement('div');
            questionCard.className = `question-card ${isCompleted ? 'completed' : ''}`;
            questionCard.innerHTML = `
                <div class="question-header">
                    <h4>${question.title}</h4>
                    <span class="status ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
                </div>
                <p class="question-description">${question.description}</p>
                <div class="question-meta">
                    <span class="question-pattern">${question.subpattern}</span>
                    <div class="companies">
                        ${question.companies.map(company => `<span class="company-tag">${company}</span>`).join('')}
                    </div>
                </div>
            `;

            questionCard.addEventListener('click', () => {
                this.currentQuestion = question;
                this.switchView('question-detail');
            });

            questionsList.appendChild(questionCard);
        });
    }

    loadQuestionDetail() {
        if (!this.currentQuestion) return;

        const isCompleted = this.userData.completedQuestions?.has(this.currentQuestion.id);

        // Update question detail elements
        const questionTitle = document.getElementById('question-title');
        const questionDifficulty = document.getElementById('question-difficulty');
        const questionPattern = document.getElementById('question-pattern');
        const questionDescriptionText = document.getElementById('question-description-text');
        const questionCompanies = document.getElementById('question-companies');
        const leetcodeLink = document.getElementById('leetcode-link');
        const toggleCompletion = document.getElementById('toggle-completion');

        if (questionTitle) questionTitle.textContent = this.currentQuestion.title;
        if (questionDifficulty) {
            questionDifficulty.textContent = this.currentQuestion.difficulty;
            questionDifficulty.className = `status ${this.currentQuestion.difficulty.toLowerCase()}`;
        }
        if (questionPattern) questionPattern.textContent = this.currentQuestion.subpattern;
        if (questionDescriptionText) questionDescriptionText.textContent = this.currentQuestion.description;
        if (questionCompanies) {
            questionCompanies.innerHTML = this.currentQuestion.companies.map(company => 
                `<span class="company-tag">${company}</span>`
            ).join('');
        }
        if (leetcodeLink) {
            leetcodeLink.href = this.currentQuestion.leetcodeUrl;
        }
        if (toggleCompletion) {
            toggleCompletion.textContent = isCompleted ? 'Mark as Incomplete' : 'Mark as Complete';
            toggleCompletion.className = `btn ${isCompleted ? 'btn--outline' : 'btn--primary'}`;
        }
    }

    loadProfile() {
        const users = JSON.parse(localStorage.getItem('dsaTracker_users') || '{}');
        const userInfo = users[this.currentUser];

        // Update profile elements
        const profileUsername = document.getElementById('profile-username');
        const profileJoinDate = document.getElementById('profile-join-date');
        const profileTotalCompleted = document.getElementById('profile-total-completed');
        const profileEasyCompleted = document.getElementById('profile-easy-completed');
        const profileMediumCompleted = document.getElementById('profile-medium-completed');
        const profileHardCompleted = document.getElementById('profile-hard-completed');
        const profilePatternsMastered = document.getElementById('profile-patterns-mastered');

        if (profileUsername) profileUsername.textContent = this.getUserDisplayName();
        if (profileJoinDate && userInfo) {
            const joinDate = new Date(userInfo.joinDate);
            profileJoinDate.textContent = joinDate.toLocaleDateString();
        }

        // Calculate detailed stats
        const completedQuestions = Array.from(this.userData.completedQuestions || []);
        const completedQuestionObjects = this.questions.filter(q => completedQuestions.includes(q.id));
        
        const easyCompleted = completedQuestionObjects.filter(q => q.difficulty === 'Easy').length;
        const mediumCompleted = completedQuestionObjects.filter(q => q.difficulty === 'Medium').length;
        const hardCompleted = completedQuestionObjects.filter(q => q.difficulty === 'Hard').length;
        const patternsMastered = this.getPatternsMasteredCount();

        if (profileTotalCompleted) profileTotalCompleted.textContent = completedQuestions.length;
        if (profileEasyCompleted) profileEasyCompleted.textContent = easyCompleted;
        if (profileMediumCompleted) profileMediumCompleted.textContent = mediumCompleted;
        if (profileHardCompleted) profileHardCompleted.textContent = hardCompleted;
        if (profilePatternsMastered) profilePatternsMastered.textContent = patternsMastered;

        this.loadAchievements();
    }

    loadAchievements() {
        const achievementsList = document.getElementById('achievements-list');
        if (!achievementsList) return;

        const achievements = this.getAchievements();
        achievementsList.innerHTML = '';

        achievements.forEach(achievement => {
            const achievementItem = document.createElement('div');
            achievementItem.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            achievementItem.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
            `;
            achievementsList.appendChild(achievementItem);
        });
    }

    getAchievements() {
        const completedCount = this.userData.completedQuestions?.size || 0;
        const patternsMastered = this.getPatternsMasteredCount();

        return [
            {
                title: "First Steps",
                description: "Complete your first question",
                icon: "🎯",
                unlocked: completedCount >= 1
            },
            {
                title: "Getting Started",
                description: "Complete 10 questions",
                icon: "🚀",
                unlocked: completedCount >= 10
            },
            {
                title: "Halfway There",
                description: "Complete 50 questions",
                icon: "⭐",
                unlocked: completedCount >= 50
            },
            {
                title: "Pattern Master",
                description: "Master your first pattern",
                icon: "🏆",
                unlocked: patternsMastered >= 1
            },
            {
                title: "Algorithm Expert",
                description: "Master 5 patterns",
                icon: "👑",
                unlocked: patternsMastered >= 5
            }
        ];
    }

    toggleQuestionCompletion() {
        if (!this.currentQuestion) return;

        const isCompleted = this.userData.completedQuestions?.has(this.currentQuestion.id);
        
        if (isCompleted) {
            this.userData.completedQuestions.delete(this.currentQuestion.id);
        } else {
            this.userData.completedQuestions.add(this.currentQuestion.id);
        }

        saveUserProgress(this.currentUser, this.userData);
        this.loadQuestionDetail();
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

// Initialize the home page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DSATrackerHome();
});