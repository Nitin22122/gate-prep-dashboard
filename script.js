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

function checkAuth() {
    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    
    const authModal = document.getElementById('auth-modal');
    const userProfile = document.getElementById('user-profile');
    const userNameEl = document.getElementById('user-name');
    const userIdEl = document.getElementById('cloud-user-id');
    
    if (userId && userEmail) {
        if (authModal) authModal.classList.add('hidden');
        if (userProfile) userProfile.style.display = 'flex';
        if (userNameEl) userNameEl.textContent = userName || userEmail.split('@')[0];
        if (userIdEl) userIdEl.textContent = userId;
        return true;
    } else {
        if (authModal) authModal.classList.remove('hidden');
        if (userProfile) userProfile.style.display = 'none';
        return false;
    }
}

checkAuth();

function showLogin() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('register-form').classList.remove('active');
}

function showRegister() {
    document.getElementById('register-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
}

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
            localStorage.setItem('user_id', result.userId);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_name', result.name || email.split('@')[0]);
            await loadFromCloud();
            location.reload();
        } else {
            alert(result.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

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

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
        location.reload();
    }
}

// ============================================
// 4. MONGODB HELPER FUNCTIONS
// ============================================

function getUserId() {
    return localStorage.getItem('user_id');
}

let cachedCloudData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5000;

async function loadFromCloud(forceRefresh = false) {
    const now = Date.now();
    
    if (!forceRefresh && cachedCloudData && (now - lastFetchTime) < CACHE_DURATION) {
        return cachedCloudData;
    }

    try {
        const userId = getUserId();
        if (!userId) {
            console.error('No user logged in');
            return null;
        }

        const response = await fetch(`/api/load?userId=${userId}`);
        const result = await response.json();

        if (result.success && result.data) {
            cachedCloudData = result.data;
            lastFetchTime = now;
            console.log('✅ Data loaded from cloud');
            return cachedCloudData;
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
        
        if (result.success) {
            cachedCloudData = data;
            lastFetchTime = Date.now();
            console.log('✅ Cloud save successful');
        } else {
            console.log('❌ Cloud save failed');
        }
        
        return result.success;
    } catch (error) {
        console.error('Cloud save error:', error);
        return false;
    }
}

// ============================================
// 5. STUDY GROUP PROGRESS
// ============================================

const subjectMapping = {
    discrete_maths: { progressId: 'progress-dm', fillId: 'progress-fill-dm', total: 36 },
    c_programming: { progressId: 'progress-c', fillId: 'progress-fill-c', total: 29 },
    digital_logic: { progressId: 'progress-dl', fillId: 'progress-fill-dl', total: 25 },
    engg_maths: { progressId: 'progress-em', fillId: 'progress-fill-em', total: 30 },
    data_structures: { progressId: 'progress-ds', fillId: 'progress-fill-ds', total: 37 },
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
        
        try {
            const streak = 0;
            await updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects);
        } catch (e) {}
    } catch (error) {
        console.error('Error updating main page progress:', error);
    }
}

// ============================================
// 6. STATS DISPLAY
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
// 7. TODAY'S TARGET / DAILY LECTURES
// ============================================

async function getTodayLectures() {
    try {
        const cloudData = await loadFromCloud();
        if (!cloudData) return [];
        const today = new Date().toISOString().split('T')[0];
        const dailyLectures = cloudData.daily_lectures || {};
        const lectures = dailyLectures[today] || [];
        
        const seen = new Set();
        const unique = lectures.filter(l => {
            const key = l.name + l.subject;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
        
        return unique;
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
            const cloudData = await loadFromCloud() || {};
            const today = new Date().toISOString().split('T')[0];
            const dailyLectures = cloudData.daily_lectures || {};
            dailyLectures[today] = lectures;
            cloudData.daily_lectures = dailyLectures;
            await saveToCloud(cloudData);
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
// 8. AI STUDY RECOMMENDATIONS
// ============================================

async function generateRecommendations() {
    const container = document.getElementById('recommendations-list');
    if (!container) return;
    
    const cloudData = await loadFromCloud();
    if (!cloudData) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:1rem;">Add some sessions to get recommendations</div>';
        return;
    }
    
    let recommendations = [];
    let weakSubjects = [];
    
    Object.keys(subjectMapping).forEach(key => {
        const progress = cloudData[`progress_${key}`];
        if (progress && progress.total > 0) {
            const pct = (progress.completed / progress.total) * 100;
            if (pct < 40) {
                weakSubjects.push({ name: key, progress: pct });
            }
        }
    });
    
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
    
    if (weakSubjects.length > 0) {
        weakSubjects.slice(0, 3).forEach(sub => {
            recommendations.push({
                icon: '📖',
                title: `Focus on ${subjectNames[sub.name] || sub.name}`,
                desc: `You've completed only ${Math.round(sub.progress)}% of this subject. Spend more time here.`,
                priority: 'high'
            });
        });
    }
    
    const todaySessions = getTodaySessions(cloudData);
    if (todaySessions.length === 0) {
        recommendations.push({
            icon: '⏰',
            title: 'Study Today',
            desc: 'You haven\'t studied today. Start with a 25-minute session.',
            priority: 'high'
        });
    }
    
    if (recommendations.length === 0) {
        recommendations.push({
            icon: '🌟',
            title: 'Great Progress!',
            desc: 'You\'re on track. Keep up the consistent effort!',
            priority: 'low'
        });
    }
    
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <span class="rec-icon">${rec.icon}</span>
            <div class="rec-info">
                <div class="rec-title">${rec.title}</div>
                <div class="rec-desc">${rec.desc}</div>
            </div>
            <span class="rec-priority ${rec.priority}">${rec.priority}</span>
        </div>
    `).join('');
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

// ============================================
// 9. STUDY MUSIC PLAYER
// ============================================

let musicPlayer = null;
let isMusicPlaying = false;

function playMusic(type) {
    stopMusic();
    
    const status = document.getElementById('music-status');
    const musicUrls = {
        lofi: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        classical: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        nature: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        jazz: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        ambient: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        piano: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        rain: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        fireplace: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
    };
    
    try {
        musicPlayer = new Audio(musicUrls[type] || musicUrls.lofi);
        musicPlayer.loop = true;
        musicPlayer.volume = 0.3;
        musicPlayer.play();
        isMusicPlaying = true;
        
        const musicNames = {
            lofi: '🎵 Lofi Study Beats',
            classical: '🎻 Classical Focus',
            nature: '🌊 Nature Sounds',
            jazz: '🎷 Smooth Jazz',
            ambient: '🌌 Ambient Sounds',
            piano: '🎹 Piano Melodies',
            rain: '🌧️ Rain Sounds',
            fireplace: '🔥 Fireplace Crackle'
        };
        status.textContent = `▶️ Playing: ${musicNames[type] || 'Focus Music'}`;
        status.style.color = '#00f5a0';
    } catch (error) {
        status.textContent = '❌ Could not play music. Please try again.';
        status.style.color = '#f56a79';
    }
}

function stopMusic() {
    if (musicPlayer) {
        musicPlayer.pause();
        musicPlayer = null;
    }
    isMusicPlaying = false;
    const status = document.getElementById('music-status');
    status.textContent = '⏹ Music stopped';
    status.style.color = '#5a6f85';
}

// ============================================
// 10. ACHIEVEMENTS / BADGES
// ============================================

async function updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects) {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    
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
}

// ============================================
// 11. STUDY CALENDAR
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
            renderCalendarGrid(grid, studyDays, currentMonth, currentYear);
            return;
        }
        
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
// 12. DAILY JOURNAL
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
// 13. DATA MANAGEMENT
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
// 14. CLOUD SYNC
// ============================================

async function manualLoadFromCloud() {
    const btn = document.getElementById('cloud-load-btn');
    const status = document.getElementById('cloud-status');
    
    if (btn) { btn.textContent = '⏳ Loading...'; btn.disabled = true; }
    
    try {
        await loadFromCloud(true);
        await updateMainPageProgress();
        await renderTodayLectures();
        await updateDataSize();
        await renderCalendar();
        await renderJournal();
        await generateRecommendations();
        await updateWidget();
        await renderStudyLogs();
        await renderAnalytics();
        
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
// 15. STUDY WIDGET
// ============================================

async function updateWidget() {
    const cloudData = await loadFromCloud();
    if (!cloudData) return;
    
    const todaySessions = getTodaySessions(cloudData);
    const todayMinutes = todaySessions.reduce((sum, s) => sum + (s.durationHours || 0) * 60 + (s.durationMinutes || 0), 0);
    const todayHours = (todayMinutes / 60).toFixed(1);
    
    let subjectsStarted = 0;
    Object.keys(subjectMapping).forEach(key => {
        const progress = cloudData[`progress_${key}`];
        if (progress && progress.total > 0) subjectsStarted++;
    });
    
    const widgetToday = document.getElementById('widget-today');
    const widgetSubjects = document.getElementById('widget-subjects');
    if (widgetToday) widgetToday.textContent = todayHours + 'h';
    if (widgetSubjects) widgetSubjects.textContent = subjectsStarted;
}

function toggleWidget() {
    const widget = document.getElementById('study-widget');
    widget.classList.toggle('visible');
}

// ============================================
// 16. DAILY STUDY LOG
// ============================================

let currentAnalyticsPeriod = 'weekly';

// ===== Load Study Logs =====
async function loadStudyLogs() {
    try {
        const cloudData = await loadFromCloud();
        if (cloudData && cloudData.study_logs) {
            return cloudData.study_logs;
        }
        return [];
    } catch (error) {
        console.error('Error loading study logs:', error);
        return [];
    }
}

// ===== Save Study Logs =====
async function saveStudyLogs(logs) {
    try {
        const cloudData = await loadFromCloud() || {};
        cloudData.study_logs = logs;
        await saveToCloud(cloudData);
        return true;
    } catch (error) {
        console.error('Error saving study logs:', error);
        return false;
    }
}

// ===== Add Study Log Entry =====
async function addStudyLog() {
    const date = document.getElementById('log-date').value;
    const subject = document.getElementById('log-subject').value;
    const hours = parseFloat(document.getElementById('log-hours').value);
    const topics = document.getElementById('log-topics').value.trim();
    
    if (!date) {
        alert('Please select a date.');
        return;
    }
    
    if (!hours || hours <= 0) {
        alert('Please enter valid hours (greater than 0).');
        return;
    }
    
    if (!subject) {
        alert('Please select a subject.');
        return;
    }
    
    const logs = await loadStudyLogs();
    
    // Check if entry already exists for this date and subject
    const existingIndex = logs.findIndex(l => l.date === date && l.subject === subject);
    if (existingIndex !== -1) {
        if (confirm(`You already have an entry for ${subject} on ${date}. Do you want to update it?`)) {
            logs[existingIndex].hours += hours;
            if (topics) {
                logs[existingIndex].topics = logs[existingIndex].topics ? 
                    logs[existingIndex].topics + ', ' + topics : topics;
            }
            logs[existingIndex].updatedAt = new Date().toISOString();
        } else {
            return;
        }
    } else {
        logs.push({
            id: Date.now(),
            date: date,
            subject: subject,
            hours: hours,
            topics: topics || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
    
    // Sort by date (newest first)
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    await saveStudyLogs(logs);
    
    // Clear form
    document.getElementById('log-hours').value = '';
    document.getElementById('log-topics').value = '';
    document.getElementById('log-date').value = new Date().toISOString().split('T')[0];
    
    // Refresh UI
    await renderStudyLogs();
    await renderTodaySummary();
    await renderAnalytics();
}

// ===== Delete Study Log Entry =====
async function deleteStudyLogEntry(id) {
    if (!confirm('Delete this entry?')) return;
    
    const logs = await loadStudyLogs();
    const filtered = logs.filter(l => l.id !== id);
    await saveStudyLogs(filtered);
    await renderStudyLogs();
    await renderTodaySummary();
    await renderAnalytics();
}

// ===== Clear All Study Logs =====
async function clearStudyLogs() {
    if (!confirm('⚠️ This will delete ALL study log entries. Are you sure?')) return;
    
    const confirmed = prompt('Type "CONFIRM" to proceed:');
    if (confirmed === 'CONFIRM') {
        await saveStudyLogs([]);
        await renderStudyLogs();
        await renderTodaySummary();
        await renderAnalytics();
        alert('🗑️ All study logs deleted.');
    }
}

// ===== Render Study Logs =====
async function renderStudyLogs() {
    const logs = await loadStudyLogs();
    const container = document.getElementById('log-history-list');
    
    if (logs.length === 0) {
        container.innerHTML = '<div style="color:#5a6f85;text-align:center;padding:1rem;">No study logs yet. Start tracking your study hours!</div>';
        return;
    }
    
    container.innerHTML = logs.slice(0, 50).map(log => `
        <div class="log-history-item">
            <span class="log-date">${formatDate(log.date)}</span>
            <span class="log-subject">${log.subject}</span>
            <span class="log-hours">${log.hours}h</span>
            <span class="log-topics">${log.topics || '-'}</span>
            <button class="log-delete" onclick="deleteStudyLogEntry(${log.id})">✕</button>
        </div>
    `).join('');
}

// ===== Render Today's Summary =====
async function renderTodaySummary() {
    const logs = await loadStudyLogs();
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = logs.filter(l => l.date === today);
    const container = document.getElementById('today-stats');
    
    if (todayLogs.length === 0) {
        container.innerHTML = '<div style="color:#5a6f85;padding:0.5rem;text-align:center;">No entries for today</div>';
        return;
    }
    
    const subjectTotals = {};
    let totalHours = 0;
    todayLogs.forEach(log => {
        if (!subjectTotals[log.subject]) subjectTotals[log.subject] = 0;
        subjectTotals[log.subject] += log.hours;
        totalHours += log.hours;
    });
    
    let html = `<div class="today-stat-item" style="background:#1a2330;font-weight:700;">
        <span class="subject">Total</span>
        <span class="hours">${totalHours}h</span>
    </div>`;
    
    Object.keys(subjectTotals).forEach(subject => {
        html += `
            <div class="today-stat-item">
                <span class="subject">${subject}</span>
                <span class="hours">${subjectTotals[subject]}h</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ===== Analytics Period Switch =====
function switchAnalyticsPeriod(period) {
    currentAnalyticsPeriod = period;
    document.querySelectorAll('.analytics-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.period === period) {
            tab.classList.add('active');
        }
    });
    
    document.querySelectorAll('.analytics-view').forEach(view => {
        view.classList.remove('active');
    });
    
    document.getElementById(`${period}-view`).classList.add('active');
    renderAnalytics();
}

// ===== Render Analytics =====
async function renderAnalytics() {
    const logs = await loadStudyLogs();
    if (logs.length === 0) {
        document.querySelectorAll('.analytics-stats-grid').forEach(grid => {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#5a6f85;padding:1rem;">No data to display</div>';
        });
        return;
    }
    
    const period = currentAnalyticsPeriod;
    const now = new Date();
    let filteredLogs = [];
    
    if (period === 'weekly') {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        filteredLogs = logs.filter(l => new Date(l.date) >= weekStart);
        renderWeeklyAnalytics(filteredLogs);
    } else if (period === 'monthly') {
        const monthStart = new Date(now);
        monthStart.setDate(now.getDate() - 30);
        filteredLogs = logs.filter(l => new Date(l.date) >= monthStart);
        renderMonthlyAnalytics(filteredLogs);
    } else {
        filteredLogs = logs;
        renderAllAnalytics(filteredLogs);
    }
}

// ===== Render Weekly Analytics =====
function renderWeeklyAnalytics(logs) {
    const subjectTotals = {};
    let totalHours = 0;
    const days = {};
    
    logs.forEach(log => {
        if (!subjectTotals[log.subject]) subjectTotals[log.subject] = 0;
        subjectTotals[log.subject] += log.hours;
        totalHours += log.hours;
        
        const day = new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' });
        if (!days[day]) days[day] = 0;
        days[day] += log.hours;
    });
    
    const statsContainer = document.getElementById('weekly-stats');
    const sortedSubjects = Object.entries(subjectTotals).sort((a, b) => b[1] - a[1]);
    const topSubject = sortedSubjects[0]?.[0] || 'None';
    const totalDays = Object.keys(days).length;
    const avgDaily = totalDays > 0 ? (totalHours / totalDays).toFixed(1) : 0;
    
    statsContainer.innerHTML = `
        <div class="analytics-stat">
            <span class="stat-number">${totalHours}h</span>
            <span class="stat-label">Total Hours</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${sortedSubjects.length}</span>
            <span class="stat-label">Subjects</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${topSubject}</span>
            <span class="stat-label">Top Subject</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${avgDaily}h</span>
            <span class="stat-label">Avg Daily</span>
        </div>
    `;
    
    drawAnalyticsChart('weeklyChart', days, '#00f5a0');
}

// ===== Render Monthly Analytics =====
function renderMonthlyAnalytics(logs) {
    const subjectTotals = {};
    let totalHours = 0;
    const weeks = {};
    
    logs.forEach(log => {
        if (!subjectTotals[log.subject]) subjectTotals[log.subject] = 0;
        subjectTotals[log.subject] += log.hours;
        totalHours += log.hours;
        
        const date = new Date(log.date);
        const weekNum = Math.ceil(date.getDate() / 7);
        const weekLabel = `W${weekNum}`;
        if (!weeks[weekLabel]) weeks[weekLabel] = 0;
        weeks[weekLabel] += log.hours;
    });
    
    const statsContainer = document.getElementById('monthly-stats');
    const sortedSubjects = Object.entries(subjectTotals).sort((a, b) => b[1] - a[1]);
    const topSubject = sortedSubjects[0]?.[0] || 'None';
    const avgWeekly = Object.keys(weeks).length > 0 ? (totalHours / Object.keys(weeks).length).toFixed(1) : 0;
    
    statsContainer.innerHTML = `
        <div class="analytics-stat">
            <span class="stat-number">${totalHours}h</span>
            <span class="stat-label">Total Hours</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${sortedSubjects.length}</span>
            <span class="stat-label">Subjects</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${topSubject}</span>
            <span class="stat-label">Top Subject</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${avgWeekly}h</span>
            <span class="stat-label">Avg Weekly</span>
        </div>
    `;
    
    drawAnalyticsChart('monthlyChart', weeks, '#00d9f5');
}

// ===== Render All Analytics =====
function renderAllAnalytics(logs) {
    const subjectTotals = {};
    let totalHours = 0;
    const months = {};
    
    logs.forEach(log => {
        if (!subjectTotals[log.subject]) subjectTotals[log.subject] = 0;
        subjectTotals[log.subject] += log.hours;
        totalHours += log.hours;
        
        const date = new Date(log.date);
        const monthLabel = date.toLocaleDateString('en-US', { month: 'short' });
        if (!months[monthLabel]) months[monthLabel] = 0;
        months[monthLabel] += log.hours;
    });
    
    const statsContainer = document.getElementById('all-stats');
    const sortedSubjects = Object.entries(subjectTotals).sort((a, b) => b[1] - a[1]);
    const topSubject = sortedSubjects[0]?.[0] || 'None';
    const totalDays = logs.length;
    const avgDaily = totalDays > 0 ? (totalHours / totalDays).toFixed(1) : 0;
    
    statsContainer.innerHTML = `
        <div class="analytics-stat">
            <span class="stat-number">${totalHours}h</span>
            <span class="stat-label">Total Hours</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${sortedSubjects.length}</span>
            <span class="stat-label">Subjects</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${topSubject}</span>
            <span class="stat-label">Top Subject</span>
        </div>
        <div class="analytics-stat">
            <span class="stat-number">${avgDaily}h</span>
            <span class="stat-label">Avg Daily</span>
        </div>
    `;
    
    drawAnalyticsChart('allChart', months, '#f5a623');
}

// ===== Draw Analytics Chart =====
function drawAnalyticsChart(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const labels = Object.keys(data);
    const values = Object.values(data);
    
    if (labels.length === 0) {
        ctx.fillStyle = '#5a6f85';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No data to display', width / 2, height / 2);
        return;
    }
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...values, 1);
    
    ctx.strokeStyle = '#1e2630';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    const barWidth = chartWidth / labels.length * 0.6;
    const gap = chartWidth / labels.length * 0.4;
    
    labels.forEach((label, index) => {
        const x = padding + (index * (barWidth + gap));
        const barHeight = (values[index] / maxValue) * chartHeight;
        const y = padding + chartHeight - barHeight;
        
        const gradient = ctx.createLinearGradient(0, y, 0, padding + chartHeight);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '44');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 4);
        ctx.fill();
        
        if (values[index] > 0) {
            ctx.fillStyle = '#e8edf5';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(values[index].toFixed(1) + 'h', x + barWidth / 2, y - 5);
        }
        
        ctx.fillStyle = '#5a6f85';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth / 2, padding + chartHeight + 15);
    });
    
    ctx.strokeStyle = '#1e2630';
    ctx.lineWidth = 1;
    ctx.strokeRect(padding, padding, chartWidth, chartHeight);
}

// ===== Format Date =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ===== Initialize Study Log =====
async function initStudyLog() {
    const dateInput = document.getElementById('log-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    await renderStudyLogs();
    await renderTodaySummary();
    await renderAnalytics();
}

// ============================================
// 17. INITIALIZE DASHBOARD
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
        await generateRecommendations();
        console.log('✅ Recommendations generated');
    } catch (e) {
        console.error('❌ Error generating recommendations:', e);
    }
    
    try {
        await updateWidget();
        console.log('✅ Widget updated');
    } catch (e) {
        console.error('❌ Error updating widget:', e);
    }
    
    try {
        await initStudyLog();
        console.log('✅ Study Log initialized');
    } catch (e) {
        console.error('❌ Error initializing study log:', e);
    }
    
    try {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    } catch (e) {}
    
    setInterval(async () => {
        try {
            await updateMainPageProgress();
            await updateDataSize();
            await renderCalendar();
            await renderTodayLectures();
            await generateRecommendations();
            await updateWidget();
            await renderStudyLogs();
            await renderTodaySummary();
            await renderAnalytics();
        } catch (e) {
            console.log('Auto-refresh error:', e);
        }
    }, 30000);
    
    setTimeout(() => {
        const widget = document.getElementById('study-widget');
        if (widget) widget.classList.add('visible');
    }, 5000);
    
    console.log('✅ Dashboard initialization complete!');
}

// ============================================
// 18. START
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setTimeout(initializeDashboard, 100);
});

window.onload = function() {
    renderJournal();
    renderTodayLectures();
    renderStudyLogs();
    renderTodaySummary();
    renderAnalytics();
};

console.log('🚀 GATE 2027 Dashboard loaded!');
console.log('📊 Tracking', Object.keys(subjectMapping).length, 'subjects');