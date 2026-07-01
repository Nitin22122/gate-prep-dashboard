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

// Check auth immediately
function checkAuth() {
    const userId = localStorage.getItem('user_id');
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    
    const authModal = document.getElementById('auth-modal');
    const userProfile = document.getElementById('user-profile');
    const userNameEl = document.getElementById('user-name');
    const userIdEl = document.getElementById('cloud-user-id');
    
    if (userId && userEmail) {
        // User is logged in
        if (authModal) authModal.classList.add('hidden');
        if (userProfile) userProfile.style.display = 'flex';
        if (userNameEl) userNameEl.textContent = userName || userEmail.split('@')[0];
        if (userIdEl) userIdEl.textContent = userId;
        return true;
    } else {
        // Show login modal
        if (authModal) authModal.classList.remove('hidden');
        if (userProfile) userProfile.style.display = 'none';
        return false;
    }
}

// Call checkAuth immediately
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
// 5. STUDY GROUP PROGRESS
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
        await loadFromCloud();
        await updateMainPageProgress();
        await renderTodayLectures();
        await updateDataSize();
        await renderCalendar();
        await renderJournal();
        await generateRecommendations();
        
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
    
    document.getElementById('widget-today').textContent = todayHours + 'h';
    document.getElementById('widget-subjects').textContent = subjectsStarted;
}

function toggleWidget() {
    const widget = document.getElementById('study-widget');
    widget.classList.toggle('visible');
}

// ============================================
// 16. INITIALIZE DASHBOARD
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
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    } catch (e) {}
    
    // Auto-refresh every 30 seconds
    setInterval(async () => {
        try {
            await updateMainPageProgress();
            await updateDataSize();
            await renderCalendar();
            await renderTodayLectures();
            await generateRecommendations();
            await updateWidget();
        } catch (e) {
            console.log('Auto-refresh error:', e);
        }
    }, 30000);
    
    // Show widget after 5 seconds
    setTimeout(() => {
        document.getElementById('study-widget').classList.add('visible');
    }, 5000);
    
    console.log('✅ Dashboard initialization complete!');
}

// ============================================
// 17. START
// ============================================

// Check auth immediately on load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setTimeout(initializeDashboard, 100);
});

window.onload = function() {
    renderJournal();
    renderTodayLectures();
};

// ============================================
// LOADING STATE
// ============================================

function showLoading() {
    const loader = document.getElementById('loading-overlay');
    if (loader) loader.style.display = 'flex';
}

function hideLoading() {
    const loader = document.getElementById('loading-overlay');
    if (loader) loader.style.display = 'none';
}

// ============================================
// OPTIMIZED: Single API Call for All Data
// ============================================

let cachedCloudData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5000; // 5 seconds

async function loadFromCloud(forceRefresh = false) {
    const now = Date.now();
    
    // Use cache if available and not expired
    if (!forceRefresh && cachedCloudData && (now - lastFetchTime) < CACHE_DURATION) {
        console.log('✅ Using cached data');
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

// ============================================
// SAVE TO CLOUD (Updates cache)
// ============================================

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
            // Update cache
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
// OPTIMIZED INITIALIZATION
// ============================================

async function initializeDashboard() {
    console.log('🚀 Initializing dashboard...');
    
    // Show loading
    showLoading();
    
    // Check authentication first
    const isLoggedIn = checkAuth();
    if (!isLoggedIn) {
        console.log('🔐 Please login to continue');
        hideLoading();
        return;
    }
    
    try {
        // Load data once and cache it
        await loadFromCloud(true);
        
        // Run all updates in parallel
        await Promise.all([
            updateMainPageProgress(),
            renderTodayLectures(),
            renderCalendar(),
            renderJournal(),
            generateRecommendations(),
            updateWidget(),
            updateDataSize()
        ]);
        
        console.log('✅ All sections updated');
    } catch (e) {
        console.error('❌ Error initializing dashboard:', e);
    }
    
    hideLoading();
    console.log('✅ Dashboard initialization complete!');
}

console.log('🚀 GATE 2027 Dashboard loaded!');
console.log('📊 Tracking', Object.keys(subjectMapping).length, 'subjects');