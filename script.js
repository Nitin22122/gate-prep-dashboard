// ============================================
// 1. COUNTDOWN TIMER
// ============================================

const targetDate = new Date('Feb 6, 2027 00:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// ============================================
// 2. DAILY MOTIVATIONAL QUOTE
// ============================================

const QUOTES = [
    { q: "The expert in anything was once a beginner. Every lecture you watch today is a step toward AIR 1.", a: "" },
    { q: "Don't wish it were easier. Wish you were better. GATE rewards those who outwork everyone else.", a: "" },
    { q: "You don't rise to the level of your goals. You fall to the level of your systems. Build the system.", a: "James Clear" },
    { q: "It's not about having time. It's about making time. Open the sprint. Do the lecture.", a: "" },
    { q: "Hard work beats talent when talent doesn't work hard. And you're doing both.", a: "" },
    { q: "The pain of discipline is far less than the pain of regret. Study now. Celebrate in Feb 2027.", a: "" },
    { q: "One lecture at a time. One day at a time. That's how GATE gets cracked.", a: "" },
    { q: "Consistency over intensity. Show up every single day — that's the only secret.", a: "" },
    { q: "Your future self is watching you right now through your memories. Make them proud.", a: "" },
    { q: "Champions aren't made in the gyms. They're made from something deep inside — a desire, a dream, a vision.", a: "Muhammad Ali" },
    { q: "The difference between ordinary and extraordinary is that little 'extra'. Give it today.", a: "" },
    { q: "Success is the sum of small efforts, repeated day in and day out.", a: "Robert Collier" },
    { q: "Don't count the days. Make the days count.", a: "Muhammad Ali" },
    { q: "Knowledge is not power. Applied knowledge is power. Solve PYQs. Apply what you learn.", a: "" },
    { q: "Every hour you study today is an investment that compounds before Feb 6, 2027.", a: "" },
    { q: "The secret of getting ahead is getting started. Right now. Close this. Open the sprint.", a: "Mark Twain" },
    { q: "Doubt kills more dreams than failure ever will. Trust the process.", a: "" },
    { q: "Sleep when you're done. Rest when you've earned it. There's work to do today.", a: "" },
    { q: "You've already decided to crack GATE. Now let your daily actions prove it.", a: "" },
    { q: "The best time to study was yesterday. The second best time is right now.", a: "" },
    { q: "It always seems impossible until it's done. One day at a time.", a: "Nelson Mandela" },
    { q: "Your rank in GATE will be a direct reflection of the hours you put in this year.", a: "" },
    { q: "Motivation gets you started. Discipline keeps you going. Build discipline.", a: "" },
    { q: "Don't stop when you're tired. Stop when you're done.", a: "" },
];

function getDailyQuote() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % QUOTES.length;
    return QUOTES[quoteIndex];
}

function updateDailyQuote() {
    const quote = getDailyQuote();
    const quoteEl = document.getElementById('daily-quote');
    const authorEl = document.getElementById('quote-author');
    const dayEl = document.getElementById('quote-day-number');
    
    if (quoteEl) quoteEl.textContent = quote.q;
    
    if (authorEl) {
        if (quote.a) {
            authorEl.textContent = quote.a;
            authorEl.style.display = 'block';
        } else {
            authorEl.style.display = 'none';
        }
    }
    
    if (dayEl) {
        const startDate = new Date(2026, 5, 1);
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        dayEl.textContent = diffDays > 0 ? diffDays : 1;
    }
}

updateDailyQuote();

// ============================================
// 3. LOGIN SYSTEM
// ============================================

// Check if user is logged in
function checkAuth() {
    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    
    if (userId && userEmail) {
        // User is logged in
        const authModal = document.getElementById('auth-modal');
        const userProfile = document.getElementById('user-profile');
        const userNameEl = document.getElementById('user-name');
        const userIdEl = document.getElementById('cloud-user-id');
        
        if (authModal) authModal.classList.add('hidden');
        if (userProfile) userProfile.style.display = 'flex';
        if (userNameEl) userNameEl.textContent = userName || userEmail.split('@')[0];
        if (userIdEl) userIdEl.textContent = userId;
        
        return true;
    } else {
        // Show login modal
        const authModal = document.getElementById('auth-modal');
        const userProfile = document.getElementById('user-profile');
        
        if (authModal) authModal.classList.remove('hidden');
        if (userProfile) userProfile.style.display = 'none';
        return false;
    }
}

// Show login form
function showLogin() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
}

// Show register form
function showRegister() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    if (!email || !password) {
        alert('Please enter email and password.');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Save user info
            localStorage.setItem('user_id', result.userId);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_name', result.name || email.split('@')[0]);
            
            // Load data from cloud
            await loadFromCloud();
            
            // Reload page
            location.reload();
        } else {
            alert(result.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

// Handle Register
async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    
    if (!name || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Account created successfully! Please login.');
            showLogin();
            document.getElementById('login-email').value = email;
        } else {
            alert(result.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Register error:', error);
        alert('Registration failed. Please try again.');
    }
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear user data
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
        
        // Reload page
        location.reload();
    }
}

// ============================================
// 4. MONGODB HELPER FUNCTIONS
// ============================================

function getUserId() {
    return localStorage.getItem('user_id');
}

async function loadFromCloud() {
    try {
        const userId = getUserId();
        if (!userId) {
            console.error('No user logged in');
            return null;
        }

        const response = await fetch(`/api/load?userId=${userId}`);
        const result = await response.json();

        if (result.success && result.data) {
            console.log('✅ Data loaded from cloud');
            return result.data;
        } else {
            console.log('ℹ️ No data found in cloud');
            return {};
        }
    } catch (error) {
        console.error('Cloud load error:', error);
        return null;
    }
}

async function saveToCloud(data) {
    try {
        const userId = getUserId();
        if (!userId) {
            console.error('No user logged in');
            return false;
        }

        const response = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId, data: data })
        });

        const result = await response.json();
        console.log('Cloud save:', result.success ? '✅ Success' : '❌ Failed');
        return result.success;
    } catch (error) {
        console.error('Cloud save error:', error);
        return false;
    }
}

// ============================================
// 5. TODAY'S TARGET / DAILY LECTURES
// ============================================

async function getTodayLectures() {
    try {
        const cloudData = await loadFromCloud();
        if (!cloudData) return [];
        const today = new Date().toISOString().split('T')[0];
        const dailyLectures = cloudData.daily_lectures || {};
        return dailyLectures[today] || [];
    } catch (error) {
        console.error('Error getting today lectures:', error);
        return [];
    }
}

async function saveTodayLectures(lectures) {
    try {
        const cloudData = await loadFromCloud() || {};
        const today = new Date().toISOString().split('T')[0];
        const dailyLectures = cloudData.daily_lectures || {};
        dailyLectures[today] = lectures;
        cloudData.daily_lectures = dailyLectures;
        await saveToCloud(cloudData);
    } catch (error) {
        console.error('Error saving today lectures:', error);
    }
}

async function toggleLectureCompletion(lectureId) {
    try {
        const lectures = await getTodayLectures();
        const lecture = lectures.find(l => l.id === lectureId);
        if (lecture) {
            lecture.completed = !lecture.completed;
            await saveTodayLectures(lectures);
            await renderTodayLectures();
        }
    } catch (error) {
        console.error('Error toggling lecture completion:', error);
    }
}

async function deleteTodayLecture(lectureId) {
    if (confirm('Delete this lecture?')) {
        try {
            let lectures = await getTodayLectures();
            lectures = lectures.filter(l => l.id !== lectureId);
            await saveTodayLectures(lectures);
            await renderTodayLectures();
        } catch (error) {
            console.error('Error deleting lecture:', error);
        }
    }
}

async function renderTodayLectures() {
    const container = document.getElementById('lecture-list');
    if (!container) return;
    
    try {
        const lectures = await getTodayLectures();
        
        if (lectures.length === 0) {
            container.innerHTML = `
                <div class="lecture-empty">
                    <span class="empty-icon">📝</span>
                    <h4>No lectures planned for today</h4>
                    <p>Add sessions from subject pages to see them here.</p>
                </div>
            `;
            await updateDailyProgress();
            return;
        }
        
        // Sort: incomplete first
        lectures.sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            return 0;
        });
        
        container.innerHTML = lectures.map(lecture => `
            <div class="lecture-item ${lecture.completed ? 'completed' : ''}">
                <input type="checkbox" 
                       class="lecture-checkbox" 
                       ${lecture.completed ? 'checked' : ''} 
                       onchange="toggleLectureCompletion(${lecture.id})" />
                <div class="lecture-info">
                    <span class="lecture-name">${lecture.name}</span>
                    <span class="lecture-meta">
                        <span class="subject-tag">${lecture.subject}</span>
                        ${lecture.duration ? `<span class="duration-tag">⏱️ ${lecture.duration}</span>` : ''}
                    </span>
                </div>
                <span class="lecture-time">${lecture.completed ? '✅ Done' : '⏳ Pending'}</span>
                <button class="lecture-delete" onclick="deleteTodayLecture(${lecture.id})" title="Delete">✕</button>
            </div>
        `).join('');
        
        await updateDailyProgress();
    } catch (error) {
        console.error('Error rendering today lectures:', error);
    }
}

async function updateDailyProgress() {
    try {
        const lectures = await getTodayLectures();
        const total = lectures.length;
        const completed = lectures.filter(l => l.completed).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        const progressText = document.getElementById('daily-progress-text');
        const progressFill = document.getElementById('daily-progress-fill');
        
        if (progressText) {
            progressText.textContent = `${completed} / ${total} completed`;
        }
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
    } catch (error) {
        console.error('Error updating daily progress:', error);
    }
}

// ============================================
// 6. STUDY GROUP PROGRESS
// ============================================

const subjectMapping = {
    discrete_maths: { progressId: 'progress-dm', fillId: 'progress-fill-dm', total: 30 },
    c_programming: { progressId: 'progress-c', fillId: 'progress-fill-c', total: 30 },
    digital_logic: { progressId: 'progress-dl', fillId: 'progress-fill-dl', total: 25 },
    engg_maths: { progressId: 'progress-em', fillId: 'progress-fill-em', total: 30 },
    data_structures: { progressId: 'progress-ds', fillId: 'progress-fill-ds', total: 30 },
    algorithms: { progressId: 'progress-algo', fillId: 'progress-fill-algo', total: 30 },
    coa: { progressId: 'progress-coa', fillId: 'progress-fill-coa', total: 30 },
    toc: { progressId: 'progress-toc', fillId: 'progress-fill-toc', total: 30 },
    compiler_design: { progressId: 'progress-cd', fillId: 'progress-fill-cd', total: 30 },
    os: { progressId: 'progress-os', fillId: 'progress-fill-os', total: 30 },
    dbms: { progressId: 'progress-dbms', fillId: 'progress-fill-dbms', total: 30 },
    computer_networks: { progressId: 'progress-cn', fillId: 'progress-fill-cn', total: 30 },
    aptitude: { progressId: 'progress-apti', fillId: 'progress-fill-apti', total: 45 }
};

async function updateMainPageProgress() {
    try {
        const cloudData = await loadFromCloud();
        if (!cloudData) return;
        
        let totalSessions = 0;
        let completedSessions = 0;
        let totalMinutes = 0;
        let completedSubjects = 0;
        let totalSubjects = Object.keys(subjectMapping).length;
        
        Object.keys(subjectMapping).forEach(subjectKey => {
            const mapping = subjectMapping[subjectKey];
            const progress = cloudData[`progress_${subjectKey}`];
            const textEl = document.getElementById(mapping.progressId);
            const fillEl = document.getElementById(mapping.fillId);
            
            if (textEl && fillEl) {
                if (progress && progress.total > 0) {
                    const done = progress.completed || 0;
                    const total = progress.total;
                    const percentage = Math.round((done / total) * 100);
                    textEl.textContent = `${done} / ${total} sessions done`;
                    fillEl.style.width = `${Math.min(percentage, 100)}%`;
                    totalSessions += total;
                    completedSessions += done;
                    if (done === total) completedSubjects++;
                    
                    const subjectData = cloudData[`tracker_${subjectKey}`];
                    if (subjectData && subjectData.sessions) {
                        subjectData.sessions.forEach(s => {
                            if (s) {
                                totalMinutes += (s.durationHours || 0) * 60 + (s.durationMinutes || 0);
                            }
                        });
                    }
                } else {
                    textEl.textContent = `📝 Not started yet`;
                    fillEl.style.width = '0%';
                }
            }
        });
        
        await updateStatsDisplay(totalSessions, completedSessions, totalMinutes);
        
        // Update achievements
        try {
            const streak = 0;
            await updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects);
        } catch (e) {
            console.error('Error updating achievements:', e);
        }
    } catch (error) {
        console.error('Error updating main page progress:', error);
    }
}

// ============================================
// 7. STATS DISPLAY
// ============================================

async function updateStatsDisplay(totalSessions, completedSessions, totalMinutes) {
    const totalSubjectsEl = document.getElementById('total-subjects');
    if (totalSubjectsEl) totalSubjectsEl.textContent = Object.keys(subjectMapping).length;
    
    const totalSessionsEl = document.getElementById('total-sessions');
    if (totalSessionsEl) totalSessionsEl.textContent = totalSessions || 0;
    
    const completedSessionsEl = document.getElementById('completed-sessions');
    if (completedSessionsEl) completedSessionsEl.textContent = completedSessions || 0;
    
    await updateDataSize();
}

// ============================================
// 8. DATA MANAGEMENT
// ============================================

async function updateDataSize() {
    try {
        const cloudData = await loadFromCloud();
        if (!cloudData) {
            const sizeEl = document.getElementById('data-size');
            if (sizeEl) sizeEl.textContent = '📦 No data stored yet';
            return;
        }
        
        const dataSize = JSON.stringify(cloudData).length;
        const sizeKB = (dataSize / 1024).toFixed(1);
        const itemCount = Object.keys(cloudData).length;
        
        const sizeEl = document.getElementById('data-size');
        if (sizeEl) {
            sizeEl.textContent = `📦 Storage used: ${sizeKB} KB (${itemCount} items)`;
        }
    } catch (error) {
        console.error('Error updating data size:', error);
    }
}

async function exportData() {
    try {
        const cloudData = await loadFromCloud();
        if (!cloudData) {
            alert('No data found to export.');
            return;
        }
        
        const blob = new Blob([JSON.stringify(cloudData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const date = new Date().toISOString().split('T')[0];
        a.download = `gate_data_${date}.json`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Export error:', error);
        alert('Failed to export data.');
    }
}

async function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async function(event) {
            try {
                const data = JSON.parse(event.target.result);
                const success = await saveToCloud(data);
                if (success) {
                    alert('✅ Data imported successfully!');
                    location.reload();
                } else {
                    alert('❌ Failed to import data.');
                }
            } catch (error) {
                alert('❌ Invalid backup file.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

async function clearAllData() {
    if (confirm('⚠️ This will delete ALL your data from MongoDB. Are you sure?')) {
        const confirmed = prompt('Type "CONFIRM" to proceed:');
        if (confirmed === 'CONFIRM') {
            const success = await saveToCloud({});
            if (success) {
                alert('🗑️ All data deleted from cloud. Refreshing...');
                location.reload();
            } else {
                alert('❌ Failed to delete data.');
            }
        }
    }
}

// ============================================
// 9. CLOUD SYNC
// ============================================

async function manualLoadFromCloud() {
    const btn = document.getElementById('cloud-load-btn');
    const status = document.getElementById('cloud-status');
    
    if (btn) { btn.textContent = '⏳ Loading...'; btn.disabled = true; }
    
    try {
        await loadFromCloud();
        await updateMainPageProgress();
        await renderTodayLectures();
        await updateDataSize();
        await updateAnalytics();
        await renderCalendar();
        await renderJournal();
        
        if (status) {
            status.textContent = '✅ Data loaded from cloud';
            status.style.color = '#00f5a0';
            setTimeout(() => {
                status.textContent = '✅ Data stored in cloud';
                status.style.color = '#5a6f85';
            }, 3000);
        }
    } catch (error) {
        console.error('Error loading from cloud:', error);
        if (status) {
            status.textContent = '❌ Load failed';
            status.style.color = '#f56a79';
        }
    }
    
    if (btn) { btn.textContent = '☁️ Sync Data'; btn.disabled = false; }
}

// ============================================
// 10. PROGRESS ANALYTICS
// ============================================

async function updateAnalytics() {
    try {
        const cloudData = await loadFromCloud();
        if (!cloudData) return;
        
        const subjectKeys = Object.keys(subjectMapping);
        let totalSessions = 0;
        let completedSessions = 0;
        let totalMinutes = 0;
        let completedSubjects = 0;
        let subjectStats = [];
        
        subjectKeys.forEach(key => {
            const progress = cloudData[`progress_${key}`];
            if (progress) {
                totalSessions += progress.total || 0;
                completedSessions += progress.completed || 0;
                if (progress.total === progress.completed && progress.total > 0) completedSubjects++;
                
                const data = cloudData[`tracker_${key}`];
                if (data && data.sessions) {
                    data.sessions.forEach(s => {
                        if (s) {
                            totalMinutes += (s.durationHours || 0) * 60 + (s.durationMinutes || 0);
                        }
                    });
                }
                
                subjectStats.push({
                    name: key.replace(/_/g, ' ').toUpperCase(),
                    total: progress.total || 0,
                    completed: progress.completed || 0,
                    percentage: progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0
                });
            }
        });
        
        // Overall Progress
        const overallProgress = subjectKeys.length > 0 ? Math.round((completedSessions / (totalSessions || 1)) * 100) : 0;
        const chartBar = document.getElementById('chart-bar');
        const chartLabel = document.getElementById('chart-label');
        if (chartBar) chartBar.style.height = `${Math.min(overallProgress, 100)}%`;
        if (chartLabel) chartLabel.textContent = `${overallProgress}%`;
        
        // Performance Score
        const performanceScore = Math.round(overallProgress * 0.8 + Math.min((completedSubjects / subjectKeys.length) * 100, 100) * 0.2);
        const scoreDisplay = document.getElementById('performance-score');
        const scoreFill = document.getElementById('score-fill');
        if (scoreDisplay) scoreDisplay.textContent = performanceScore;
        if (scoreFill) scoreFill.style.width = `${Math.min(performanceScore, 100)}%`;
        
        // Study Pace
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const daysSinceStart = dayOfYear - 150;
        
        const avgDaily = daysSinceStart > 0 ? Math.round((totalMinutes / 60) / daysSinceStart * 10) / 10 : 0;
        const avgWeekly = Math.round(avgDaily * 7 * 10) / 10;
        const avgMonthly = Math.round(avgDaily * 30 * 10) / 10;
        
        const dailyAvgEl = document.getElementById('daily-average');
        const weeklyAvgEl = document.getElementById('weekly-average');
        const monthlyAvgEl = document.getElementById('monthly-average');
        if (dailyAvgEl) dailyAvgEl.textContent = `${avgDaily}h`;
        if (weeklyAvgEl) weeklyAvgEl.textContent = `${avgWeekly}h`;
        if (monthlyAvgEl) monthlyAvgEl.textContent = `${avgMonthly}h`;
        
        // Subject Breakdown
        const breakdown = document.getElementById('subject-breakdown');
        if (breakdown) {
            breakdown.innerHTML = '';
            subjectStats.sort((a, b) => b.percentage - a.percentage).slice(0, 8).forEach(sub => {
                const div = document.createElement('div');
                div.className = 'subject-breakdown-item';
                div.innerHTML = `
                    <span class="name">${sub.name}</span>
                    <span class="progress">${sub.completed}/${sub.total} (${sub.percentage}%)</span>
                `;
                breakdown.appendChild(div);
            });
        }
    } catch (error) {
        console.error('Error updating analytics:', error);
    }
}

// ============================================
// 11. DAILY JOURNAL
// ============================================

async function saveJournal() {
    const entry = document.getElementById('journal-entry');
    if (!entry) return;
    
    const text = entry.value.trim();
    if (!text) {
        alert('Please write something before saving.');
        return;
    }
    
    try {
        const cloudData = await loadFromCloud() || {};
        const journal = cloudData.journal_entries || [];
        journal.unshift({
            date: new Date().toISOString(),
            content: text
        });
        
        if (journal.length > 30) journal.pop();
        
        cloudData.journal_entries = journal;
        await saveToCloud(cloudData);
        entry.value = '';
        await renderJournal();
    } catch (error) {
        console.error('Error saving journal:', error);
        alert('Failed to save journal entry.');
    }
}

async function clearJournal() {
    if (confirm('Are you sure you want to clear all journal entries?')) {
        try {
            const cloudData = await loadFromCloud() || {};
            cloudData.journal_entries = [];
            await saveToCloud(cloudData);
            await renderJournal();
        } catch (error) {
            console.error('Error clearing journal:', error);
        }
    }
}

async function renderJournal() {
    try {
        const cloudData = await loadFromCloud();
        const journal = cloudData ? cloudData.journal_entries || [] : [];
        const container = document.getElementById('journal-list');
        
        if (!container) return;
        
        if (journal.length === 0) {
            container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:1rem;">No journal entries yet</div>';
            return;
        }
        
        container.innerHTML = journal.slice(0, 10).map(entry => `
            <div class="journal-entry-item">
                <div class="date">${new Date(entry.date).toLocaleString()}</div>
                <div class="content">${entry.content}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering journal:', error);
    }
}

// ============================================
// 12. STUDY REMINDER
// ============================================

let reminderCheckInterval = null;

function toggleReminder() {
    const enabled = document.getElementById('reminder-toggle');
    const status = document.getElementById('reminder-status');
    
    if (!enabled || !status) return;
    
    if (enabled.checked) {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
        
        status.textContent = '🟢 Reminders enabled';
        status.className = 'reminder-status active';
        startReminderCheck();
    } else {
        status.textContent = '🔴 Reminders disabled';
        status.className = 'reminder-status';
        stopReminderCheck();
    }
}

function startReminderCheck() {
    const intervalSelect = document.getElementById('reminder-interval');
    const interval = intervalSelect ? parseInt(intervalSelect.value) * 60 * 1000 : 3600000;
    
    if (reminderCheckInterval) clearInterval(reminderCheckInterval);
    
    reminderCheckInterval = setInterval(() => {
        checkStudyActivity();
    }, interval);
}

function stopReminderCheck() {
    if (reminderCheckInterval) {
        clearInterval(reminderCheckInterval);
        reminderCheckInterval = null;
    }
}

function checkStudyActivity() {
    // Check if user studied today - simplified version
    // This would need to check MongoDB data
    console.log('Checking study activity...');
}

function updateReminderInterval() {
    if (document.getElementById('reminder-toggle') && document.getElementById('reminder-toggle').checked) {
        startReminderCheck();
    }
}

// ============================================
// 13. STUDY CALENDAR
// ============================================

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

async function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) {
        console.log('Calendar grid not found');
        return;
    }
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthEl = document.getElementById('calendar-month');
    if (monthEl) {
        monthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    const studyDays = {};
    
    try {
        const cloudData = await loadFromCloud();
        if (!cloudData) {
            // Render empty calendar
            renderCalendarGrid(grid, studyDays, currentMonth, currentYear);
            return;
        }
        
        // Check subject sessions for the month
        Object.keys(subjectMapping).forEach(key => {
            const data = cloudData[`tracker_${key}`];
            if (data && data.sessions) {
                data.sessions.forEach(s => {
                    if (s && s.date) {
                        const date = new Date(s.date);
                        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                            const dateKey = date.getDate();
                            if (!studyDays[dateKey]) studyDays[dateKey] = 0;
                            studyDays[dateKey] += (s.durationHours || 0) + ((s.durationMinutes || 0) / 60);
                        }
                    }
                });
            }
        });
        
        renderCalendarGrid(grid, studyDays, currentMonth, currentYear);
    } catch (e) {
        console.log('Error reading calendar data:', e);
        renderCalendarGrid(grid, studyDays, currentMonth, currentYear);
    }
}

function renderCalendarGrid(grid, studyDays, month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    grid.innerHTML = '';
    
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const div = document.createElement('div');
        div.className = 'calendar-day-header';
        div.textContent = day;
        grid.appendChild(div);
    });
    
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day other-month';
        grid.appendChild(div);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const div = document.createElement('div');
        const date = new Date(year, month, day);
        const hours = studyDays[day] || 0;
        const isToday = date.toDateString() === today.toDateString();
        
        div.className = `calendar-day ${hours > 0 ? 'has-study' : ''} ${isToday ? 'today' : ''}`;
        div.innerHTML = `
            <span>${day}</span>
            ${hours > 0 ? `<span class="study-hours">${hours.toFixed(1)}h</span>` : ''}
        `;
        grid.appendChild(div);
    }
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

// ============================================
// 14. ACHIEVEMENTS / BADGES
// ============================================

async function updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects) {
    const grid = document.getElementById('achievements-grid');
    if (!grid) {
        console.log('Achievements grid not found');
        return;
    }
    
    const achievements = [
        { id: 'first_session', name: 'First Step', icon: '🚀', desc: 'Complete your first session', check: () => totalSessions >= 1 },
        { id: 'first_hour', name: 'Hour Tracker', icon: '⏱️', desc: 'Study for 1 hour total', check: () => totalSessions >= 1 },
        { id: 'study_master', name: 'Study Master', icon: '🧠', desc: 'Complete 50 sessions', check: () => totalSessions >= 50 },
        { id: 'subject_expert', name: 'Subject Expert', icon: '📚', desc: 'Complete 3 subjects fully', check: () => completedSubjects >= 3 },
        { id: 'centurion', name: 'Centurion', icon: '💯', desc: 'Complete 100 sessions', check: () => totalSessions >= 100 },
        { id: 'all_subjects', name: 'Subject Master', icon: '👑', desc: 'Complete all subjects', check: () => completedSubjects >= totalSubjects },
        { id: 'dedicated', name: 'Dedicated', icon: '🔥', desc: 'Study 50 sessions total', check: () => totalSessions >= 50 },
        { id: 'overachiever', name: 'Overachiever', icon: '🌟', desc: 'Complete 200 sessions', check: () => totalSessions >= 200 },
    ];
    
    grid.innerHTML = '';
    
    let unlockedCount = 0;
    
    achievements.forEach(ach => {
        const unlocked = ach.check();
        if (unlocked) unlockedCount++;
        
        const card = document.createElement('div');
        card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <span class="achievement-icon">${ach.icon}</span>
            <div class="achievement-name">${ach.name}</div>
            <div class="achievement-desc">${ach.desc}</div>
            <div class="achievement-progress">
                <div class="achievement-progress-bar">
                    <div class="achievement-progress-fill" style="width: ${unlocked ? 100 : 0}%;"></div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    console.log(`🏆 Achievements: ${unlockedCount}/${achievements.length} unlocked`);
}

// ============================================
// 15. INITIALIZE DASHBOARD
// ============================================

async function initializeDashboard() {
    console.log('🚀 Initializing dashboard...');
    
    // Check authentication first
    const isLoggedIn = checkAuth();
    if (!isLoggedIn) {
        console.log('🔐 Please login to continue');
        return;
    }
    
    try {
        await updateMainPageProgress();
        console.log('✅ Main page progress updated');
    } catch (e) {
        console.error('❌ Error updating main page progress:', e);
    }
    
    try {
        await updateDataSize();
        console.log('✅ Data size updated');
    } catch (e) {
        console.error('❌ Error updating data size:', e);
    }
    
    try {
        await renderJournal();
        console.log('✅ Journal rendered');
    } catch (e) {
        console.error('❌ Error rendering journal:', e);
    }
    
    try {
        await renderCalendar();
        console.log('✅ Calendar rendered');
    } catch (e) {
        console.error('❌ Error rendering calendar:', e);
    }
    
    try {
        await renderTodayLectures();
        console.log('✅ Today\'s lectures rendered');
    } catch (e) {
        console.error('❌ Error rendering today\'s lectures:', e);
    }
    
    try {
        await updateAnalytics();
        console.log('✅ Analytics updated');
    } catch (e) {
        console.error('❌ Error updating analytics:', e);
    }
    
    try {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    } catch (e) {}
    
    // Auto-refresh from MongoDB
    setInterval(async () => {
        try {
            await updateMainPageProgress();
            await updateDataSize();
            await updateAnalytics();
            await renderCalendar();
            await renderTodayLectures();
        } catch (e) {
            console.log('Auto-refresh error:', e);
        }
    }, 30000);
    
    console.log('✅ Dashboard initialization complete!');
}

// ============================================
// 16. START
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeDashboard, 500);
});

window.onload = function() {
    renderJournal();
    renderTodayLectures();
};

// ============================================
// 16. SUBJECT-WISE PROGRESS CHART
// ============================================

async function renderProgressChart() {
    try {
        const cloudData = await loadFromCloud();
        if (!cloudData) return;
        
        const canvas = document.getElementById('progressChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;
        
        // Get subject data
        const subjects = Object.keys(subjectMapping);
        const colors = ['#00f5a0', '#00d9f5', '#f5a623', '#f56a79', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#6366f1', '#06b6d4', '#84cc16', '#e11d48', '#8b5cf6'];
        let totalCompleted = 0;
        let totalSessions = 0;
        let subjectData = [];
        let bestSubject = { name: '', progress: 0 };
        let worstSubject = { name: '', progress: 100 };
        let subjectsStarted = 0;
        
        subjects.forEach((key, index) => {
            const progress = cloudData[`progress_${key}`];
            if (progress && progress.total > 0) {
                const pct = Math.round((progress.completed / progress.total) * 100);
                subjectData.push({
                    name: key.replace(/_/g, ' ').toUpperCase(),
                    completed: progress.completed,
                    total: progress.total,
                    percentage: pct,
                    color: colors[index % colors.length]
                });
                totalCompleted += progress.completed;
                totalSessions += progress.total;
                subjectsStarted++;
                
                if (pct > bestSubject.progress) {
                    bestSubject = { name: key.replace(/_/g, ' ').toUpperCase(), progress: pct };
                }
                if (pct < worstSubject.progress && pct > 0) {
                    worstSubject = { name: key.replace(/_/g, ' ').toUpperCase(), progress: pct };
                }
            }
        });
        
        // Update quick stats
        document.getElementById('best-subject').textContent = bestSubject.name || '-';
        document.getElementById('worst-subject').textContent = worstSubject.name !== '-' ? worstSubject.name : '-';
        document.getElementById('avg-progress').textContent = subjectData.length > 0 ? 
            Math.round(subjectData.reduce((sum, s) => sum + s.percentage, 0) / subjectData.length) + '%' : '0%';
        document.getElementById('subjects-started').textContent = subjectsStarted;
        
        // Update center text
        const overallPct = totalSessions > 0 ? Math.round((totalCompleted / totalSessions) * 100) : 0;
        document.getElementById('chart-percentage').textContent = overallPct + '%';
        
        // Draw donut chart
        ctx.clearRect(0, 0, width, height);
        
        let startAngle = -Math.PI / 2;
        const total = subjectData.reduce((sum, s) => sum + s.total, 0);
        
        subjectData.forEach((data, index) => {
            const sliceAngle = (data.total / total) * 2 * Math.PI;
            const endAngle = startAngle + sliceAngle;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.arc(centerX, centerY, radius * 0.6, endAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = data.color;
            ctx.fill();
            
            // Add label for large slices
            if (sliceAngle > 0.3) {
                const midAngle = startAngle + sliceAngle / 2;
                const labelRadius = radius * 0.8;
                const x = centerX + Math.cos(midAngle) * labelRadius;
                const y = centerY + Math.sin(midAngle) * labelRadius;
                ctx.fillStyle = '#0b0e14';
                ctx.font = '10px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(Math.round(data.percentage) + '%', x, y);
            }
            
            startAngle = endAngle;
        });
        
        // Draw inner circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
        ctx.fillStyle = '#111920';
        ctx.fill();
        
        // Draw border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#1e2630';
        ctx.lineWidth = 2;
        ctx.stroke();
        
    } catch (error) {
        console.error('Error rendering chart:', error);
    }
}

// ============================================
// 17. WEEKLY GOALS
// ============================================

async function getWeeklyGoal() {
    const cloudData = await loadFromCloud();
    return cloudData ? cloudData.weekly_goal || 20 : 20;
}

async function setWeeklyGoal() {
    const input = document.getElementById('weekly-goal-input');
    const goal = parseFloat(input.value);
    if (goal > 0) {
        const cloudData = await loadFromCloud() || {};
        cloudData.weekly_goal = goal;
        await saveToCloud(cloudData);
        await updateWeeklyGoal();
    }
}

async function getWeeklyProgress() {
    const cloudData = await loadFromCloud();
    if (!cloudData) return 0;
    
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    
    let totalMinutes = 0;
    Object.keys(subjectMapping).forEach(key => {
        const data = cloudData[`tracker_${key}`];
        if (data && data.sessions) {
            data.sessions.forEach(s => {
                if (s && s.date) {
                    const date = new Date(s.date);
                    if (date >= startOfWeek && date < endOfWeek) {
                        totalMinutes += (s.durationHours || 0) * 60 + (s.durationMinutes || 0);
                    }
                }
            });
        }
    });
    
    return totalMinutes / 60;
}

async function updateWeeklyGoal() {
    const goal = await getWeeklyGoal();
    const progress = await getWeeklyProgress();
    const remaining = Math.max(goal - progress, 0);
    const percentage = Math.min((progress / goal) * 100, 100);
    const now = new Date();
    const daysLeft = 6 - now.getDay();
    
    document.getElementById('weekly-goal-bar').style.width = percentage + '%';
    document.getElementById('weekly-goal-text').textContent = `${progress.toFixed(1)} / ${goal} hours`;
    document.getElementById('weekly-progress').textContent = progress.toFixed(1) + 'h';
    document.getElementById('weekly-remaining').textContent = remaining.toFixed(1) + 'h';
    document.getElementById('days-left').textContent = daysLeft;
}

// ============================================
// 18. SESSION HISTORY
// ============================================

async function renderSessionHistory() {
    const container = document.getElementById('history-list');
    if (!container) return;
    
    const filter = document.getElementById('history-filter').value;
    const cloudData = await loadFromCloud();
    if (!cloudData) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:1rem;">No sessions yet</div>';
        return;
    }
    
    let allSessions = [];
    const subjectNames = {
        discrete_maths: 'Discrete Mathematics',
        c_programming: 'C-Programming',
        digital_logic: 'Digital Logic',
        engg_maths: 'Engineering Mathematics',
        data_structures: 'Data Structures',
        algorithms: 'Algorithms',
        coa: 'COA',
        toc: 'Theory of Computation',
        compiler_design: 'Compiler Design',
        os: 'Operating System',
        dbms: 'Databases',
        computer_networks: 'Computer Networks',
        aptitude: 'Aptitude'
    };
    
    Object.keys(subjectMapping).forEach(key => {
        if (filter !== 'all' && filter !== key) return;
        const data = cloudData[`tracker_${key}`];
        if (data && data.sessions) {
            data.sessions.forEach(s => {
                allSessions.push({
                    ...s,
                    subject: subjectNames[key] || key,
                    subjectKey: key
                });
            });
        }
    });
    
    allSessions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (allSessions.length === 0) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:1rem;">No sessions found</div>';
        return;
    }
    
    container.innerHTML = allSessions.slice(0, 50).map(s => `
        <div class="history-item">
            <div class="h-info">
                <span class="h-name">${s.name}</span>
                <span class="h-meta">${s.subject} · ${new Date(s.date).toLocaleDateString()}</span>
            </div>
            <span class="h-time">${s.durationHours}h ${s.durationMinutes}m</span>
        </div>
    `).join('');
}

async function clearHistory() {
    if (confirm('Delete all session history?')) {
        const cloudData = await loadFromCloud() || {};
        Object.keys(subjectMapping).forEach(key => {
            cloudData[`tracker_${key}`] = { sessions: [], currentId: 1 };
            cloudData[`progress_${key}`] = { total: 0, completed: 0 };
        });
        await saveToCloud(cloudData);
        await renderSessionHistory();
        await updateMainPageProgress();
    }
}

// ============================================
// 19. QUICK NOTES
// ============================================

async function addQuickNote() {
    const input = document.getElementById('note-input');
    const subject = document.getElementById('note-subject').value;
    const text = input.value.trim();
    
    if (!text) {
        alert('Please enter a note.');
        return;
    }
    
    const cloudData = await loadFromCloud() || {};
    const notes = cloudData.quick_notes || [];
    notes.unshift({
        id: Date.now(),
        text: text,
        subject: subject,
        timestamp: new Date().toISOString()
    });
    
    if (notes.length > 50) notes.pop();
    cloudData.quick_notes = notes;
    await saveToCloud(cloudData);
    input.value = '';
    await renderQuickNotes();
}

async function deleteQuickNote(noteId) {
    const cloudData = await loadFromCloud() || {};
    const notes = cloudData.quick_notes || [];
    cloudData.quick_notes = notes.filter(n => n.id !== noteId);
    await saveToCloud(cloudData);
    await renderQuickNotes();
}

async function renderQuickNotes() {
    const container = document.getElementById('notes-list');
    if (!container) return;
    
    const cloudData = await loadFromCloud();
    const notes = cloudData ? cloudData.quick_notes || [] : [];
    
    if (notes.length === 0) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:0.5rem;">No notes yet</div>';
        return;
    }
    
    const subjectNames = {
        general: 'General',
        discrete_maths: 'DM',
        c_programming: 'C',
        digital_logic: 'DL',
        engg_maths: 'EM',
        data_structures: 'DS',
        algorithms: 'Algo',
        coa: 'COA',
        toc: 'TOC',
        compiler_design: 'CD',
        os: 'OS',
        dbms: 'DBMS',
        computer_networks: 'CN',
        aptitude: 'Apt'
    };
    
    container.innerHTML = notes.slice(0, 20).map(n => `
        <div class="note-item">
            <span class="note-content">${n.text}</span>
            <span class="note-subject">${subjectNames[n.subject] || n.subject}</span>
            <button class="note-delete" onclick="deleteQuickNote(${n.id})">✕</button>
        </div>
    `).join('');
}

// ============================================
// 20. UPDATE INITIALIZE FUNCTION
// ============================================

async function initializeDashboard() {
    console.log('🚀 Initializing dashboard...');
    
    const isLoggedIn = checkAuth();
    if (!isLoggedIn) {
        console.log('🔐 Please login to continue');
        return;
    }
    
    try {
        await updateMainPageProgress();
        console.log('✅ Main page progress updated');
    } catch (e) {
        console.error('❌ Error updating main page progress:', e);
    }
    
    try {
        await updateDataSize();
        console.log('✅ Data size updated');
    } catch (e) {
        console.error('❌ Error updating data size:', e);
    }
    
    try {
        await renderJournal();
        console.log('✅ Journal rendered');
    } catch (e) {
        console.error('❌ Error rendering journal:', e);
    }
    
    try {
        await renderCalendar();
        console.log('✅ Calendar rendered');
    } catch (e) {
        console.error('❌ Error rendering calendar:', e);
    }
    
    try {
        await renderTodayLectures();
        console.log('✅ Today\'s lectures rendered');
    } catch (e) {
        console.error('❌ Error rendering today\'s lectures:', e);
    }
    
    try {
        await updateAnalytics();
        console.log('✅ Analytics updated');
    } catch (e) {
        console.error('❌ Error updating analytics:', e);
    }
    
    // NEW FEATURES
    try {
        await renderProgressChart();
        console.log('✅ Progress chart rendered');
    } catch (e) {
        console.error('❌ Error rendering chart:', e);
    }
    
    try {
        await updateWeeklyGoal();
        console.log('✅ Weekly goal updated');
    } catch (e) {
        console.error('❌ Error updating weekly goal:', e);
    }
    
    try {
        await renderSessionHistory();
        console.log('✅ Session history rendered');
    } catch (e) {
        console.error('❌ Error rendering history:', e);
    }
    
    try {
        await renderQuickNotes();
        console.log('✅ Quick notes rendered');
    } catch (e) {
        console.error('❌ Error rendering notes:', e);
    }
    
    try {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    } catch (e) {}
    
    // Auto-refresh
    setInterval(async () => {
        try {
            await updateMainPageProgress();
            await updateDataSize();
            await updateAnalytics();
            await renderCalendar();
            await renderTodayLectures();
            await renderProgressChart();
            await updateWeeklyGoal();
            await renderSessionHistory();
            await renderQuickNotes();
        } catch (e) {
            console.log('Auto-refresh error:', e);
        }
    }, 30000);
    
    console.log('✅ Dashboard initialization complete!');
}

// ============================================
// 21. SYLLABUS TRACKER
// ============================================

async function renderSyllabus() {
    const container = document.getElementById('syllabus-list');
    const subject = document.getElementById('syllabus-subject').value;
    if (!container) return;
    
    const cloudData = await loadFromCloud();
    const syllabus = cloudData ? cloudData.syllabus || {} : {};
    const topics = syllabus[subject] || [];
    
    if (topics.length === 0) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:1rem;">No topics added yet</div>';
        return;
    }
    
    container.innerHTML = topics.map((topic, index) => `
        <div class="syllabus-item ${topic.completed ? 'completed' : ''}">
            <input type="checkbox" class="topic-checkbox" ${topic.completed ? 'checked' : ''} 
                   onchange="toggleSyllabusTopic('${subject}', ${index})" />
            <span class="topic-name">${topic.name}</span>
            <button class="topic-delete" onclick="deleteSyllabusTopic('${subject}', ${index})">✕</button>
        </div>
    `).join('');
}

async function addSyllabusTopic() {
    const subject = document.getElementById('syllabus-subject').value;
    const name = prompt('Enter topic name:');
    if (!name) return;
    
    const cloudData = await loadFromCloud() || {};
    const syllabus = cloudData.syllabus || {};
    if (!syllabus[subject]) syllabus[subject] = [];
    
    syllabus[subject].push({ name: name.trim(), completed: false });
    cloudData.syllabus = syllabus;
    await saveToCloud(cloudData);
    await renderSyllabus();
}

async function toggleSyllabusTopic(subject, index) {
    const cloudData = await loadFromCloud() || {};
    const syllabus = cloudData.syllabus || {};
    const topics = syllabus[subject] || [];
    if (topics[index]) {
        topics[index].completed = !topics[index].completed;
        cloudData.syllabus = syllabus;
        await saveToCloud(cloudData);
        await renderSyllabus();
    }
}

async function deleteSyllabusTopic(subject, index) {
    const cloudData = await loadFromCloud() || {};
    const syllabus = cloudData.syllabus || {};
    const topics = syllabus[subject] || [];
    topics.splice(index, 1);
    cloudData.syllabus = syllabus;
    await saveToCloud(cloudData);
    await renderSyllabus();
}

// ============================================
// 22. POMODORO TIMER
// ============================================

let pomodoroInterval = null;
let pomodoroSeconds = 1500;
let pomodoroRunning = false;
let pomodoroCount = 0;
let pomodoroTotalSeconds = 0;

async function startPomodoro() {
    if (pomodoroRunning) return;
    pomodoroRunning = true;
    
    const startBtn = document.querySelector('.start-pomo');
    const pauseBtn = document.querySelector('.pause-pomo');
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-block';
    
    pomodoroInterval = setInterval(() => {
        pomodoroSeconds--;
        updatePomodoroDisplay();
        
        if (pomodoroSeconds <= 0) {
            clearInterval(pomodoroInterval);
            pomodoroRunning = false;
            pomodoroCount++;
            pomodoroTotalSeconds += 1500;
            if (startBtn) startBtn.style.display = 'inline-block';
            if (pauseBtn) pauseBtn.style.display = 'none';
            
            updatePomodoroStats();
            alert('🍅 Pomodoro complete! Time for a break!');
            
            // Play sound
            try {
                const audio = new Audio('data:audio/wav;base64,UklGRnoAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoAAACBhYqFhYWFiomFiYWNg4uGjI6HjYmPipGMkY2RjZGNko6SkJORkpGSkZSTlJSVlJWWlZWXlpeXl5eXl5eYmJmZmZqampqbm5qbm5ybnJ2bnZ6cnZ+doJ+hoKCgoaGhoqGjoqOko6SlpKWlpaampgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
                audio.play();
            } catch(e) {}
            
            pomodoroSeconds = 1500;
            updatePomodoroDisplay();
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    const startBtn = document.querySelector('.start-pomo');
    const pauseBtn = document.querySelector('.pause-pomo');
    if (startBtn) startBtn.style.display = 'inline-block';
    if (pauseBtn) pauseBtn.style.display = 'none';
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    pomodoroSeconds = 1500;
    updatePomodoroDisplay();
    const startBtn = document.querySelector('.start-pomo');
    const pauseBtn = document.querySelector('.pause-pomo');
    if (startBtn) startBtn.style.display = 'inline-block';
    if (pauseBtn) pauseBtn.style.display = 'none';
}

function updatePomodoroDisplay() {
    const mins = Math.floor(pomodoroSeconds / 60);
    const secs = pomodoroSeconds % 60;
    const display = document.getElementById('pomodoro-display');
    if (display) {
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
}

async function updatePomodoroStats() {
    document.getElementById('pomo-count').textContent = pomodoroCount;
    const totalHours = Math.floor(pomodoroTotalSeconds / 3600);
    const totalMins = Math.floor((pomodoroTotalSeconds % 3600) / 60);
    document.getElementById('pomo-total-time').textContent = totalHours > 0 ? `${totalHours}h ${totalMins}m` : `${totalMins}m`;
}

// ============================================
// 23. PERFORMANCE TRENDS
// ============================================

let trendPeriod = 'week';

async function changeTrendPeriod(period) {
    trendPeriod = period;
    document.querySelectorAll('.trend-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`trend-${period}`).classList.add('active');
    await renderTrends();
}

async function renderTrends() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;
    
    const cloudData = await loadFromCloud();
    if (!cloudData) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Get data based on period
    const now = new Date();
    let dataPoints = [];
    let labels = [];
    let days = trendPeriod === 'week' ? 7 : trendPeriod === 'month' ? 30 : 365;
    
    // Collect session data
    let sessionData = [];
    Object.keys(subjectMapping).forEach(key => {
        const data = cloudData[`tracker_${key}`];
        if (data && data.sessions) {
            data.sessions.forEach(s => {
                if (s && s.date) {
                    sessionData.push({
                        date: new Date(s.date),
                        hours: (s.durationHours || 0) + (s.durationMinutes || 0) / 60
                    });
                }
            });
        }
    });
    
    // Aggregate by day
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        let total = 0;
        sessionData.forEach(s => {
            const sDate = new Date(s.date);
            sDate.setHours(0, 0, 0, 0);
            if (sDate.getTime() === date.getTime()) {
                total += s.hours;
            }
        });
        
        dataPoints.push(total);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    // Draw chart
    ctx.clearRect(0, 0, width, height);
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...dataPoints, 1);
    
    // Draw grid
    ctx.strokeStyle = '#1e2630';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw bars
    const barWidth = chartWidth / dataPoints.length * 0.6;
    const gap = chartWidth / dataPoints.length * 0.4;
    
    dataPoints.forEach((value, index) => {
        const x = padding + (index * (barWidth + gap));
        const barHeight = (value / maxValue) * chartHeight;
        const y = padding + chartHeight - barHeight;
        
        const gradient = ctx.createLinearGradient(0, y, 0, padding + chartHeight);
        gradient.addColorStop(0, '#00f5a0');
        gradient.addColorStop(1, '#00d9f5');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();
        
        // Label
        ctx.fillStyle = '#5a6f85';
        ctx.font = '8px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x + barWidth / 2, padding + chartHeight + 15);
        
        // Value on top
        if (value > 0) {
            ctx.fillStyle = '#8b9bb5';
            ctx.font = '8px Inter, sans-serif';
            ctx.fillText(value.toFixed(1), x + barWidth / 2, y - 5);
        }
    });
}

// ============================================
// 24. DAILY CHALLENGES
// ============================================

async function renderChallenges() {
    const grid = document.getElementById('challenges-grid');
    if (!grid) return;
    
    const cloudData = await loadFromCloud();
    const challenges = cloudData ? cloudData.challenges || [] : [];
    
    const today = new Date().toISOString().split('T')[0];
    const dailyChallenges = [
        { id: 'study_1h', name: 'Study 1 Hour', icon: '📖', desc: 'Complete 1 hour of study', target: 60, unit: 'minutes' },
        { id: 'complete_subject', name: 'Subject Progress', icon: '📚', desc: 'Complete 1 subject session', target: 1, unit: 'sessions' },
        { id: 'daily_streak', name: 'Daily Streak', icon: '🔥', desc: 'Study for 7 consecutive days', target: 7, unit: 'days' },
        { id: 'pomodoro_master', name: 'Pomodoro Master', icon: '🍅', desc: 'Complete 4 pomodoros', target: 4, unit: 'pomodoros' },
    ];
    
    // Calculate progress
    let progress = {};
    const totalStudyMinutes = cloudData ? getTotalStudyMinutes(cloudData) : 0;
    const todaySessions = cloudData ? getTodaySessions(cloudData) : [];
    const streak = getStudyStreakFromData(cloudData);
    const pomodoros = pomodoroCount;
    
    progress['study_1h'] = Math.min(Math.floor(totalStudyMinutes / 60), 1);
    progress['complete_subject'] = Math.min(todaySessions.length, 1);
    progress['daily_streak'] = Math.min(streak, 7);
    progress['pomodoro_master'] = Math.min(pomodoros, 4);
    
    grid.innerHTML = dailyChallenges.map(challenge => {
        const current = progress[challenge.id] || 0;
        const target = challenge.target;
        const completed = current >= target;
        const percentage = Math.min((current / target) * 100, 100);
        
        return `
            <div class="challenge-card ${completed ? 'completed' : ''}">
                <div class="challenge-header">
                    <span class="challenge-icon">${challenge.icon}</span>
                    <span class="challenge-points">${completed ? '✅ Done' : `${current}/${target}`}</span>
                </div>
                <div class="challenge-name">${challenge.name}</div>
                <div class="challenge-desc">${challenge.desc}</div>
                <div class="challenge-progress">
                    <div class="challenge-progress-bar">
                        <div class="challenge-progress-fill" style="width: ${percentage}%;"></div>
                    </div>
                </div>
                <div class="challenge-status">${completed ? '🎉 Completed!' : `${Math.round(percentage)}% done`}</div>
            </div>
        `;
    }).join('');
}

function getTotalStudyMinutes(cloudData) {
    let total = 0;
    Object.keys(subjectMapping).forEach(key => {
        const data = cloudData[`tracker_${key}`];
        if (data && data.sessions) {
            data.sessions.forEach(s => {
                if (s) {
                    total += (s.durationHours || 0) * 60 + (s.durationMinutes || 0);
                }
            });
        }
    });
    return total;
}

function getTodaySessions(cloudData) {
    const today = new Date().toISOString().split('T')[0];
    let sessions = [];
    Object.keys(subjectMapping).forEach(key => {
        const data = cloudData[`tracker_${key}`];
        if (data && data.sessions) {
            data.sessions.forEach(s => {
                if (s && s.date && s.date.startsWith(today)) {
                    sessions.push(s);
                }
            });
        }
    });
    return sessions;
}

function getStudyStreakFromData(cloudData) {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        let hasSession = false;
        Object.keys(subjectMapping).forEach(key => {
            const data = cloudData[`tracker_${key}`];
            if (data && data.sessions) {
                data.sessions.forEach(s => {
                    if (s && s.date && s.date.startsWith(dateStr)) {
                        hasSession = true;
                    }
                });
            }
        });
        
        if (hasSession) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

// ============================================
// 25. REVISION REMINDER
// ============================================

let revisionInterval = null;

function toggleRevision() {
    const enabled = document.getElementById('revision-toggle');
    const list = document.getElementById('revision-list');
    if (!enabled || !list) return;
    
    if (enabled.checked) {
        renderRevisions();
        startRevisionCheck();
    } else {
        list.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:0.5rem;">Revisions disabled</div>';
        stopRevisionCheck();
    }
}

function startRevisionCheck() {
    if (revisionInterval) clearInterval(revisionInterval);
    const interval = parseInt(document.getElementById('revision-interval').value) * 24 * 60 * 60 * 1000;
    revisionInterval = setInterval(renderRevisions, interval);
}

function stopRevisionCheck() {
    if (revisionInterval) {
        clearInterval(revisionInterval);
        revisionInterval = null;
    }
}

function updateRevisionInterval() {
    if (document.getElementById('revision-toggle').checked) {
        startRevisionCheck();
    }
}

async function renderRevisions() {
    const container = document.getElementById('revision-list');
    if (!container) return;
    
    const cloudData = await loadFromCloud();
    if (!cloudData) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:0.5rem;">No sessions to revise</div>';
        return;
    }
    
    // Get all sessions sorted by date (oldest first)
    let allSessions = [];
    Object.keys(subjectMapping).forEach(key => {
        const data = cloudData[`tracker_${key}`];
        if (data && data.sessions) {
            data.sessions.forEach(s => {
                if (s && s.date) {
                    allSessions.push({
                        ...s,
                        subject: key.replace(/_/g, ' ').toUpperCase()
                    });
                }
            });
        }
    });
    
    allSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Get revision interval
    const interval = parseInt(document.getElementById('revision-interval').value);
    const now = new Date();
    
    // Find sessions that need revision
    const dueSessions = allSessions.filter(s => {
        const sessionDate = new Date(s.date);
        const daysDiff = Math.floor((now - sessionDate) / (1000 * 60 * 60 * 24));
        return daysDiff > 0 && daysDiff % interval === 0;
    });
    
    if (dueSessions.length === 0) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:0.5rem;">No sessions due for revision 🎉</div>';
        return;
    }
    
    container.innerHTML = dueSessions.slice(0, 10).map(s => `
        <div class="revision-item">
            <div class="rev-info">
                <span class="rev-name">${s.name}</span>
                <span class="rev-date">${s.subject} · ${new Date(s.date).toLocaleDateString()}</span>
            </div>
            <span class="rev-status">🔄 Revise</span>
        </div>
    `).join('');
}

// ============================================
// 26. MOCK TEST TRACKER
// ============================================

async function addMockTest() {
    const name = document.getElementById('mock-test-name').value.trim();
    const score = parseInt(document.getElementById('mock-test-score').value);
    const total = parseInt(document.getElementById('mock-test-total').value);
    
    if (!name || isNaN(score) || isNaN(total) || total === 0) {
        alert('Please fill all fields correctly.');
        return;
    }
    
    if (score < 0 || score > total) {
        alert('Score cannot exceed total.');
        return;
    }
    
    const cloudData = await loadFromCloud() || {};
    const tests = cloudData.mock_tests || [];
    tests.push({
        id: Date.now(),
        name: name,
        score: score,
        total: total,
        percentage: Math.round((score / total) * 100),
        date: new Date().toISOString()
    });
    cloudData.mock_tests = tests;
    await saveToCloud(cloudData);
    
    document.getElementById('mock-test-name').value = '';
    document.getElementById('mock-test-score').value = '';
    document.getElementById('mock-test-total').value = '';
    
    await renderMockTests();
}

async function deleteMockTest(testId) {
    const cloudData = await loadFromCloud() || {};
    const tests = cloudData.mock_tests || [];
    cloudData.mock_tests = tests.filter(t => t.id !== testId);
    await saveToCloud(cloudData);
    await renderMockTests();
}

async function renderMockTests() {
    const container = document.getElementById('mocktest-list');
    if (!container) return;
    
    const cloudData = await loadFromCloud();
    const tests = cloudData ? cloudData.mock_tests || [] : [];
    
    if (tests.length === 0) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:0.5rem;">No mock tests yet</div>';
        updateMockStats([]);
        return;
    }
    
    container.innerHTML = tests.slice().reverse().map(test => `
        <div class="mocktest-item">
            <div class="mt-info">
                <span class="mt-name">${test.name}</span>
                <span class="mt-date">${new Date(test.date).toLocaleDateString()}</span>
            </div>
            <span class="mt-score">${test.score}/${test.total} (${test.percentage}%)</span>
            <button class="mt-delete" onclick="deleteMockTest(${test.id})">✕</button>
        </div>
    `).join('');
    
    updateMockStats(tests);
}

function updateMockStats(tests) {
    if (tests.length === 0) {
        document.getElementById('mock-avg-score').textContent = '0%';
        document.getElementById('mock-best-score').textContent = '0%';
        document.getElementById('mock-total-tests').textContent = '0';
        return;
    }
    
    const avg = Math.round(tests.reduce((sum, t) => sum + t.percentage, 0) / tests.length);
    const best = Math.max(...tests.map(t => t.percentage));
    document.getElementById('mock-avg-score').textContent = avg + '%';
    document.getElementById('mock-best-score').textContent = best + '%';
    document.getElementById('mock-total-tests').textContent = tests.length;
}

// ============================================
// 27. UPDATE INITIALIZE FUNCTION
// ============================================

async function initializeDashboard() {
    console.log('🚀 Initializing dashboard...');
    
    const isLoggedIn = checkAuth();
    if (!isLoggedIn) {
        console.log('🔐 Please login to continue');
        return;
    }
    
    try {
        await updateMainPageProgress();
        console.log('✅ Main page progress updated');
    } catch (e) {
        console.error('❌ Error updating main page progress:', e);
    }
    
    try {
        await updateDataSize();
        console.log('✅ Data size updated');
    } catch (e) {
        console.error('❌ Error updating data size:', e);
    }
    
    try {
        await renderJournal();
        console.log('✅ Journal rendered');
    } catch (e) {
        console.error('❌ Error rendering journal:', e);
    }
    
    try {
        await renderCalendar();
        console.log('✅ Calendar rendered');
    } catch (e) {
        console.error('❌ Error rendering calendar:', e);
    }
    
    try {
        await renderTodayLectures();
        console.log('✅ Today\'s lectures rendered');
    } catch (e) {
        console.error('❌ Error rendering today\'s lectures:', e);
    }
    
    try {
        await updateAnalytics();
        console.log('✅ Analytics updated');
    } catch (e) {
        console.error('❌ Error updating analytics:', e);
    }
    
    try {
        await renderProgressChart();
        console.log('✅ Progress chart rendered');
    } catch (e) {
        console.error('❌ Error rendering chart:', e);
    }
    
    try {
        await updateWeeklyGoal();
        console.log('✅ Weekly goal updated');
    } catch (e) {
        console.error('❌ Error updating weekly goal:', e);
    }
    
    try {
        await renderSessionHistory();
        console.log('✅ Session history rendered');
    } catch (e) {
        console.error('❌ Error rendering history:', e);
    }
    
    try {
        await renderQuickNotes();
        console.log('✅ Quick notes rendered');
    } catch (e) {
        console.error('❌ Error rendering notes:', e);
    }
    
    // NEW FEATURES
    try {
        await renderSyllabus();
        console.log('✅ Syllabus rendered');
    } catch (e) {
        console.error('❌ Error rendering syllabus:', e);
    }
    
    try {
        await renderTrends();
        console.log('✅ Trends rendered');
    } catch (e) {
        console.error('❌ Error rendering trends:', e);
    }
    
    try {
        await renderChallenges();
        console.log('✅ Challenges rendered');
    } catch (e) {
        console.error('❌ Error rendering challenges:', e);
    }
    
    try {
        await renderMockTests();
        console.log('✅ Mock tests rendered');
    } catch (e) {
        console.error('❌ Error rendering mock tests:', e);
    }
    
    try {
        await renderRevisions();
        console.log('✅ Revisions rendered');
    } catch (e) {
        console.error('❌ Error rendering revisions:', e);
    }
    
    try {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    } catch (e) {}
    
    // Auto-refresh
    setInterval(async () => {
        try {
            await updateMainPageProgress();
            await updateDataSize();
            await updateAnalytics();
            await renderCalendar();
            await renderTodayLectures();
            await renderProgressChart();
            await updateWeeklyGoal();
            await renderSessionHistory();
            await renderQuickNotes();
            await renderSyllabus();
            await renderTrends();
            await renderChallenges();
            await renderMockTests();
            await renderRevisions();
        } catch (e) {
            console.log('Auto-refresh error:', e);
        }
    }, 30000);
    
    console.log('✅ Dashboard initialization complete!');
}

console.log('🚀 GATE 2027 Dashboard loaded!');
console.log('📊 Tracking', Object.keys(subjectMapping).length, 'subjects');