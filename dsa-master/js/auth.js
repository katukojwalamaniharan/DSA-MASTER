// Authentication functionality for DSA Tracker

class AuthManager {
    constructor() {
        this.googleClientId = '123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com'; // Demo client ID
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeGoogleAuth();
        this.showInitialView();
    }

    showInitialView() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Show loading screen for 1.5 seconds
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            
            const currentUser = loadUserData();
            if (currentUser) {
                navigateToPage('home');
            } else {
                this.showAuthView();
            }
        }, 1500);
    }

    showAuthView() {
        const authView = document.getElementById('auth-view');
        if (authView) {
            authView.classList.remove('hidden');
        }
        this.hideAuthError();
    }

    setupEventListeners() {
        // Authentication forms
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
            saveUserData(username);
            navigateToPage('home');
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
        
        saveUserData(username);
        navigateToPage('home');
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

            // Set current user and navigate to home
            saveUserData(userKey);
            navigateToPage('home');
            
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
}

// Global Google Sign-In callback function
window.handleGoogleSignIn = function(response) {
    if (window.authManager) {
        window.authManager.handleGoogleSignIn(response);
    }
};

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});