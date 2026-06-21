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
// 3. STUDY TIMER
// ============================================

let timerInterval = null;
let timerSeconds = 1500; // 25 minutes default
let timerRunning = false;

function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    document.getElementById('timer-start').style.display = 'none';
    document.getElementById('timer-pause').style.display = 'inline-block';
    
    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();
        
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            document.getElementById('timer-start').style.display = 'inline-block';
            document.getElementById('timer-pause').style.display = 'none';
            alert('⏰ Time is up! Great focus session!');
            // Play notification sound if supported
            try {
                const audio = new Audio('data:audio/wav;base64,UklGRnoAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoAAACBhYqFhYWFiomFiYWNg4uGjI6HjYmPipGMkY2RjZGNko6SkJORkpGSkZSTlJSVlJWWlZWXlpeXl5eXl5eYmJmZmZqampqbm5qbm5ybnJ2bnZ6cnZ+doJ+hoKCgoaGhoqGjoqOko6SlpKWlpaampgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
                    audio.play();
                } catch(e) {}
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timer-start').style.display = 'inline-block';
    document.getElementById('timer-pause').style.display = 'none';
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 1500;
    updateTimerDisplay();
    document.getElementById('timer-start').style.display = 'inline-block';
    document.getElementById('timer-pause').style.display = 'none';
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    document.getElementById('timer-display').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ============================================
// 4. STUDY GROUP PROGRESS
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

function updateMainPageProgress() {
    const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
    let totalSessions = 0;
    let completedSessions = 0;
    let totalMinutes = 0;
    let completedSubjects = 0;
    let totalSubjects = Object.keys(subjectMapping).length;
    
    Object.keys(subjectMapping).forEach(subjectKey => {
        const mapping = subjectMapping[subjectKey];
        const progress = allProgress[subjectKey];
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
                
                const subjectData = JSON.parse(localStorage.getItem(`tracker_${subjectKey}`) || '{"sessions":[]}');
                subjectData.sessions.forEach(s => {
                    totalMinutes += s.durationHours * 60 + s.durationMinutes;
                });
            } else {
                textEl.textContent = `📝 Not started yet`;
                fillEl.style.width = '0%';
            }
        }
    });
    
    document.getElementById('total-subjects').textContent = totalSubjects;
    document.getElementById('total-sessions').textContent = totalSessions || 0;
    document.getElementById('completed-sessions').textContent = completedSessions || 0;
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    document.getElementById('total-study-time').textContent = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    
    const streak = getStudyStreak();
    document.getElementById('study-streak').textContent = streak;
    
    updateTodayProgress();
    updateDataSize();
    updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects);
}

// ============================================
// 5. STUDY STREAK
// ============================================

function getStudyStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    const studyDates = new Set();
    
    const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
    Object.keys(allProgress).forEach(key => {
        const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
        data.sessions.forEach(s => {
            if (s.date) {
                const date = new Date(s.date);
                date.setHours(0, 0, 0, 0);
                studyDates.add(date.getTime());
            }
        });
    });
    
    for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        checkDate.setHours(0, 0, 0, 0);
        
        if (studyDates.has(checkDate.getTime())) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// ============================================
// 6. TODAY'S TARGET & PROGRESS
// ============================================

function getDailyTarget() {
    return parseFloat(localStorage.getItem('daily_target')) || 4;
}

function setDailyTarget() {
    const input = document.getElementById('daily-target');
    const target = parseFloat(input.value);
    if (target > 0) {
        localStorage.setItem('daily_target', target);
        updateTodayProgress();
    }
}

function getTodayStudyMinutes() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let totalMinutes = 0;
    
    const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
    Object.keys(allProgress).forEach(key => {
        const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
        data.sessions.forEach(s => {
            if (s.date) {
                const date = new Date(s.date);
                date.setHours(0, 0, 0, 0);
                if (date.getTime() === today.getTime()) {
                    totalMinutes += s.durationHours * 60 + s.durationMinutes;
                }
            }
        });
    });
    
    return totalMinutes;
}

function updateTodayProgress() {
    const targetHours = getDailyTarget();
    const todayMinutes = getTodayStudyMinutes();
    const progress = Math.min((todayMinutes / (targetHours * 60)) * 100, 100);
    
    document.getElementById('today-progress').textContent = `${Math.round(progress)}%`;
    document.getElementById('today-progress-text').textContent = `${Math.round(todayMinutes / 60 * 10) / 10} / ${targetHours} hours`;
    document.getElementById('today-progress-bar').style.width = `${progress}%`;
    
    const messageEl = document.getElementById('target-message');
    if (progress >= 100) {
        messageEl.textContent = '🎉 Target achieved! Great job!';
        messageEl.style.color = '#00f5a0';
    } else if (progress > 50) {
        messageEl.textContent = '💪 Keep going! You\'re doing great!';
        messageEl.style.color = '#00d9f5';
    } else if (progress > 0) {
        messageEl.textContent = '📖 Stay focused! You can do this!';
        messageEl.style.color = '#8b9bb5';
    } else {
        messageEl.textContent = '🎯 Start your study session!';
        messageEl.style.color = '#5a6f85';
    }
}

// ============================================
// 7. LAST 7 DAYS ACTIVITY
// ============================================

function updateActivityBars() {
    const bars = document.querySelectorAll('.activity-bar');
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const maxHeight = 100;
    
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        let minutes = 0;
        const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
        Object.keys(allProgress).forEach(key => {
            const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
            data.sessions.forEach(s => {
                if (s.date) {
                    const sessionDate = new Date(s.date);
                    sessionDate.setHours(0, 0, 0, 0);
                    if (sessionDate.getTime() === date.getTime()) {
                        minutes += s.durationHours * 60 + s.durationMinutes;
                    }
                }
            });
        });
        
        weekData.push(minutes);
    }
    
    const maxMinutes = Math.max(...weekData, 1);
    
    bars.forEach((bar, index) => {
        const height = (weekData[index] / maxMinutes) * maxHeight;
        bar.style.height = `${Math.max(height, 4)}%`;
        if (weekData[index] === 0) {
            bar.classList.add('inactive');
        } else {
            bar.classList.remove('inactive');
        }
        
        const label = bar.parentElement.querySelector('.activity-label');
        if (label) {
            const dayIndex = (today.getDay() - 6 + index + 7) % 7;
            label.textContent = dayNames[dayIndex];
        }
    });
    
    const totalHours = Math.round(weekData.reduce((a, b) => a + b, 0) / 60 * 10) / 10;
    document.getElementById('weekly-total').textContent = `Total: ${totalHours} hours this week`;
}

// ============================================
// 8. ACHIEVEMENTS / BADGES
// ============================================

function updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects) {
    const achievements = [
        { id: 'first_session', name: 'First Step', icon: '🚀', desc: 'Complete your first session', check: () => totalSessions >= 1 },
        { id: 'first_week', name: 'Week Warrior', icon: '📅', desc: 'Study for 7 consecutive days', check: () => streak >= 7 },
        { id: 'study_master', name: 'Study Master', icon: '🧠', desc: 'Complete 50 sessions', check: () => totalSessions >= 50 },
        { id: 'subject_expert', name: 'Subject Expert', icon: '📚', desc: 'Complete 3 subjects fully', check: () => completedSubjects >= 3 },
        { id: 'marathon', name: 'Marathon Runner', icon: '🏃', desc: '30-day study streak', check: () => streak >= 30 },
        { id: 'centurion', name: 'Centurion', icon: '💯', desc: 'Complete 100 sessions', check: () => totalSessions >= 100 },
        { id: 'all_subjects', name: 'Subject Master', icon: '👑', desc: 'Complete all subjects', check: () => completedSubjects >= totalSubjects },
        { id: 'dedicated', name: 'Dedicated', icon: '🔥', desc: 'Study 20 days in a month', check: () => streak >= 20 },
    ];
    
    const grid = document.getElementById('achievements-grid');
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
// 9. DATA MANAGEMENT
// ============================================

function updateDataSize() {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('tracker_') || key.startsWith('progress_') || key === 'all_subject_progress') {
            const value = localStorage.getItem(key);
            totalSize += value.length * 2;
        }
    }
    const sizeKB = (totalSize / 1024).toFixed(1);
    document.getElementById('data-size').textContent = `📦 Storage used: ${sizeKB} KB`;
}

function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('tracker_') || key.startsWith('progress_') || key === 'all_subject_progress') {
            data[key] = localStorage.getItem(key);
        }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date().toISOString().split('T')[0];
    a.download = `gate_data_${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                let count = 0;
                for (const key in data) {
                    if (key.startsWith('tracker_') || key.startsWith('progress_') || key === 'all_subject_progress') {
                        localStorage.setItem(key, data[key]);
                        count++;
                    }
                }
                alert(`✅ Imported ${count} items successfully! Refresh the page.`);
                location.reload();
            } catch (error) {
                alert('❌ Invalid backup file. Please select a valid JSON backup.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    if (confirm('⚠️ This will delete ALL your progress data. Are you sure?')) {
        const confirmed = prompt('Type "CONFIRM" to proceed:');
        if (confirmed === 'CONFIRM') {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('tracker_') || key.startsWith('progress_') || key === 'all_subject_progress') {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(key => localStorage.removeItem(key));
            alert(`🗑️ Deleted ${keysToRemove.length} items. Refresh the page.`);
            location.reload();
        }
    }
}

// ============================================
// 10. INITIALIZE ALL
// ============================================

function initializeDashboard() {
    updateMainPageProgress();
    updateActivityBars();
    updateTodayProgress();
    updateDataSize();
    
    document.getElementById('daily-target').value = getDailyTarget();
    updateTimerDisplay();
    
    // Check for daily reminder
    const lastVisit = localStorage.getItem('last_visit_date');
    const today = new Date().toISOString().split('T')[0];
    if (lastVisit !== today) {
        localStorage.setItem('last_visit_date', today);
        // Reset daily streak check
    }
    
    setInterval(() => {
        updateMainPageProgress();
        updateActivityBars();
        updateTodayProgress();
        updateDataSize();
    }, 30000);
}

initializeDashboard();

console.log('🚀 GATE 2027 Dashboard initialized!');
console.log('📊 Tracking', Object.keys(subjectMapping).length, 'subjects');

// ============================================
// CLOUD SYNC WITH MONGODB ATLAS
// ============================================

// Get or create user ID
function getUserId() {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('user_id', userId);
    }
    return userId;
}

const USER_ID = getUserId();

// Show user ID
const userIdEl = document.getElementById('cloud-user-id');
if (userIdEl) {
    userIdEl.textContent = USER_ID;
}

// Save to cloud
async function saveToCloud() {
    try {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('tracker_') || key.startsWith('progress_') || 
                key === 'all_subject_progress' || key === 'daily_target' || 
                key === 'user_id') {
                data[key] = localStorage.getItem(key);
            }
        }

        const response = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: USER_ID, data: data })
        });

        const result = await response.json();
        console.log('Cloud save:', result.success ? '✅ Success' : '❌ Failed');
        return result.success;
    } catch (error) {
        console.error('Cloud save error:', error);
        return false;
    }
}

// Load from cloud
async function loadFromCloud() {
    try {
        const response = await fetch(`/api/load?userId=${USER_ID}`);
        const result = await response.json();

        if (result.success && result.data) {
            let loadedCount = 0;
            for (const key in result.data) {
                if (!localStorage.getItem(key)) {
                    localStorage.setItem(key, result.data[key]);
                    loadedCount++;
                }
            }
            console.log(`✅ Loaded ${loadedCount} items from cloud`);
            return true;
        }
        return true;
    } catch (error) {
        console.error('Cloud load error:', error);
        return false;
    }
}

// Manual sync functions
async function manualSaveToCloud() {
    const btn = document.getElementById('cloud-save-btn');
    const status = document.getElementById('cloud-status');
    
    if (btn) { btn.textContent = '⏳ Saving...'; btn.disabled = true; }
    
    const success = await saveToCloud();
    
    if (status) {
        status.textContent = success ? '✅ Saved to cloud' : '❌ Save failed';
        status.style.color = success ? '#00f5a0' : '#f56a79';
        setTimeout(() => {
            status.textContent = '🔄 Auto-sync every 30s';
            status.style.color = '#5a6f85';
        }, 3000);
    }
    
    if (btn) { btn.textContent = '☁️ Save to Cloud'; btn.disabled = false; }
}

async function manualLoadFromCloud() {
    const btn = document.getElementById('cloud-load-btn');
    const status = document.getElementById('cloud-status');
    
    if (btn) { btn.textContent = '⏳ Loading...'; btn.disabled = true; }
    
    const success = await loadFromCloud();
    
    if (success) {
        // Refresh UI
        if (typeof updateMainPageProgress === 'function') updateMainPageProgress();
        if (typeof updateActivityBars === 'function') updateActivityBars();
        if (typeof updateTodayProgress === 'function') updateTodayProgress();
    }
    
    if (status) {
        status.textContent = success ? '✅ Loaded from cloud' : '❌ Load failed';
        status.style.color = success ? '#00f5a0' : '#f56a79';
        setTimeout(() => {
            status.textContent = '🔄 Auto-sync every 30s';
            status.style.color = '#5a6f85';
        }, 3000);
    }
    
    if (btn) { btn.textContent = '☁️ Load from Cloud'; btn.disabled = false; }
}

// Auto-sync
function startCloudSync() {
    loadFromCloud().then(() => {
        if (typeof updateMainPageProgress === 'function') updateMainPageProgress();
        if (typeof updateActivityBars === 'function') updateActivityBars();
        if (typeof updateTodayProgress === 'function') updateTodayProgress();
    });

    setInterval(() => {
        saveToCloud();
    }, 30000);

    window.addEventListener('beforeunload', () => {
        saveToCloud();
    });
}

// Start cloud sync
startCloudSync();