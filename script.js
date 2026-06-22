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
let timerSeconds = 1500;
let timerRunning = false;

function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-block';
    
    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();
        
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            if (startBtn) startBtn.style.display = 'inline-block';
            if (pauseBtn) pauseBtn.style.display = 'none';
            alert('⏰ Time is up! Great focus session!');
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
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    if (startBtn) startBtn.style.display = 'inline-block';
    if (pauseBtn) pauseBtn.style.display = 'none';
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 1500;
    updateTimerDisplay();
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    if (startBtn) startBtn.style.display = 'inline-block';
    if (pauseBtn) pauseBtn.style.display = 'none';
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    const display = document.getElementById('timer-display');
    if (display) {
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
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
    
    if (!allProgress || typeof allProgress !== 'object') {
        updateStats(0, 0, 0);
        try {
            updateAchievements(0, 0, 0, 0, totalSubjects);
        } catch (e) {}
        return;
    }
    
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
                
                try {
                    const subjectData = JSON.parse(localStorage.getItem(`tracker_${subjectKey}`) || '{"sessions":[]}');
                    if (subjectData && subjectData.sessions && Array.isArray(subjectData.sessions)) {
                        subjectData.sessions.forEach(s => {
                            if (s) {
                                totalMinutes += (s.durationHours || 0) * 60 + (s.durationMinutes || 0);
                            }
                        });
                    }
                } catch (e) {}
            } else {
                textEl.textContent = `📝 Not started yet`;
                fillEl.style.width = '0%';
            }
        }
    });
    
    updateStats(totalSessions, completedSessions, totalMinutes);
    
    // UPDATE ACHIEVEMENTS
    try {
        const streak = getStudyStreak();
        updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects);
    } catch (e) {
        console.error('Error updating achievements:', e);
    }
}

// ============================================
// 5. STUDY STREAK
// ============================================

function getStudyStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    const studyDates = new Set();
    
    try {
        const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
        
        if (allProgress && typeof allProgress === 'object') {
            Object.keys(allProgress).forEach(key => {
                try {
                    const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
                    if (data && data.sessions && Array.isArray(data.sessions)) {
                        data.sessions.forEach(s => {
                            if (s && s.date) {
                                const date = new Date(s.date);
                                date.setHours(0, 0, 0, 0);
                                studyDates.add(date.getTime());
                            }
                        });
                    }
                } catch (e) {}
            });
        }
    } catch (e) {
        return 0;
    }
    
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
// 6. STATS
// ============================================

function updateStats(totalSessions, completedSessions, totalMinutes) {
    const totalSessionsEl = document.getElementById('total-sessions');
    if (totalSessionsEl) totalSessionsEl.textContent = totalSessions || 0;
    
    const completedSessionsEl = document.getElementById('completed-sessions');
    if (completedSessionsEl) completedSessionsEl.textContent = completedSessions || 0;
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const totalTimeEl = document.getElementById('total-study-time');
    if (totalTimeEl) {
        totalTimeEl.textContent = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    }
    
    try {
        const streak = getStudyStreak();
        const streakEl = document.getElementById('study-streak');
        if (streakEl) streakEl.textContent = streak || 0;
    } catch (e) {}
    
    try {
        updateTodayProgress();
    } catch (e) {}
    
    try {
        updateDataSize();
    } catch (e) {}
}

// ============================================
// 7. TODAY'S TARGET
// ============================================

function getDailyTarget() {
    return parseFloat(localStorage.getItem('daily_target')) || 4;
}

function setDailyTarget() {
    const input = document.getElementById('daily-target');
    if (!input) return;
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
    
    try {
        const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
        if (allProgress && typeof allProgress === 'object') {
            Object.keys(allProgress).forEach(key => {
                try {
                    const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
                    if (data && data.sessions && Array.isArray(data.sessions)) {
                        data.sessions.forEach(s => {
                            if (s && s.date) {
                                const date = new Date(s.date);
                                date.setHours(0, 0, 0, 0);
                                if (date.getTime() === today.getTime()) {
                                    totalMinutes += (s.durationHours || 0) * 60 + (s.durationMinutes || 0);
                                }
                            }
                        });
                    }
                } catch (e) {}
            });
        }
    } catch (e) {}
    
    return totalMinutes;
}

function updateTodayProgress() {
    const targetHours = getDailyTarget();
    const todayMinutes = getTodayStudyMinutes();
    const progress = Math.min((todayMinutes / (targetHours * 60)) * 100, 100);
    
    const progressEl = document.getElementById('today-progress');
    if (progressEl) progressEl.textContent = `${Math.round(progress)}%`;
    
    const progressTextEl = document.getElementById('today-progress-text');
    if (progressTextEl) {
        progressTextEl.textContent = `${Math.round(todayMinutes / 60 * 10) / 10} / ${targetHours} hours`;
    }
    
    const progressBarEl = document.getElementById('today-progress-bar');
    if (progressBarEl) progressBarEl.style.width = `${progress}%`;
    
    const messageEl = document.getElementById('target-message');
    if (messageEl) {
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
}

// ============================================
// 8. ACTIVITY BARS
// ============================================

function updateActivityBars() {
    const bars = document.querySelectorAll('.activity-bar');
    if (!bars.length) return;
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const maxHeight = 100;
    
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        let minutes = 0;
        try {
            const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
            if (allProgress && typeof allProgress === 'object') {
                Object.keys(allProgress).forEach(key => {
                    try {
                        const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
                        if (data && data.sessions && Array.isArray(data.sessions)) {
                            data.sessions.forEach(s => {
                                if (s && s.date) {
                                    const sessionDate = new Date(s.date);
                                    sessionDate.setHours(0, 0, 0, 0);
                                    if (sessionDate.getTime() === date.getTime()) {
                                        minutes += (s.durationHours || 0) * 60 + (s.durationMinutes || 0);
                                    }
                                }
                            });
                        }
                    } catch (e) {}
                });
            }
        } catch (e) {}
        
        weekData.push(minutes);
    }
    
    const maxMinutes = Math.max(...weekData, 1);
    
    bars.forEach((bar, index) => {
        if (index < weekData.length) {
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
        }
    });
    
    const totalHours = Math.round(weekData.reduce((a, b) => a + b, 0) / 60 * 10) / 10;
    const totalEl = document.getElementById('weekly-total');
    if (totalEl) {
        totalEl.textContent = `Total: ${totalHours} hours this week`;
    }
}

// ============================================
// 9. DATA MANAGEMENT
// ============================================

function updateDataSize() {
    let totalSize = 0;
    let itemCount = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('tracker_') || key.startsWith('progress_') || 
            key === 'all_subject_progress' || key === 'journal_entries') {
            const value = localStorage.getItem(key);
            totalSize += value.length * 2;
            itemCount++;
        }
    }
    
    const sizeKB = (totalSize / 1024).toFixed(1);
    const sizeDisplay = sizeKB > 0 ? sizeKB : '0';
    
    const sizeEl = document.getElementById('data-size');
    if (sizeEl) {
        if (itemCount === 0) {
            sizeEl.textContent = '📦 No data stored yet';
        } else {
            sizeEl.textContent = `📦 Storage used: ${sizeDisplay} KB (${itemCount} items)`;
        }
    }
}

function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('tracker_') || key.startsWith('progress_') || 
            key === 'all_subject_progress' || key === 'journal_entries') {
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
                    if (key.startsWith('tracker_') || key.startsWith('progress_') || 
                        key === 'all_subject_progress' || key === 'journal_entries') {
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
                if (key.startsWith('tracker_') || key.startsWith('progress_') || 
                    key === 'all_subject_progress' || key === 'journal_entries') {
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
// 10. CLOUD SYNC
// ============================================

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

async function saveToCloud() {
    try {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('tracker_') || key.startsWith('progress_') || 
                key === 'all_subject_progress' || key === 'daily_target' || 
                key === 'user_id' || key === 'journal_entries') {
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
        updateMainPageProgress();
        updateActivityBars();
        updateTodayProgress();
        updateAnalytics();
        renderJournal();
        renderCalendar();
        
        // Update achievements after loading
        try {
            const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
            let totalSessions = 0, completedSessions = 0, completedSubjects = 0;
            const totalSubjects = Object.keys(subjectMapping).length;
            Object.keys(subjectMapping).forEach(key => {
                const progress = allProgress[key];
                if (progress) {
                    totalSessions += progress.total || 0;
                    completedSessions += progress.completed || 0;
                    if (progress.total === progress.completed && progress.total > 0) completedSubjects++;
                }
            });
            const streak = getStudyStreak();
            updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects);
        } catch (e) {}
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

function startCloudSync() {
    loadFromCloud().then(() => {
        updateMainPageProgress();
        updateActivityBars();
        updateTodayProgress();
        updateAnalytics();
        renderJournal();
        renderCalendar();
    });

    setInterval(() => {
        saveToCloud();
    }, 30000);

    window.addEventListener('beforeunload', () => {
        saveToCloud();
    });
}

// ============================================
// 11. PROGRESS ANALYTICS
// ============================================

function updateAnalytics() {
    const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
    const subjectKeys = Object.keys(allProgress);
    
    let totalSessions = 0;
    let completedSessions = 0;
    let totalMinutes = 0;
    let completedSubjects = 0;
    let subjectStats = [];
    
    subjectKeys.forEach(key => {
        const progress = allProgress[key];
        if (progress) {
            totalSessions += progress.total || 0;
            completedSessions += progress.completed || 0;
            if (progress.total === progress.completed && progress.total > 0) completedSubjects++;
            
            try {
                const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
                if (data && data.sessions && Array.isArray(data.sessions)) {
                    data.sessions.forEach(s => {
                        if (s) {
                            totalMinutes += (s.durationHours || 0) * 60 + (s.durationMinutes || 0);
                        }
                    });
                }
            } catch (e) {}
            
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
    const streak = getStudyStreak();
    const consistencyScore = Math.min((streak / 30) * 100, 100);
    const performanceScore = Math.round((overallProgress * 0.6) + (consistencyScore * 0.4));
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
}

// ============================================
// 12. DAILY JOURNAL
// ============================================

function saveJournal() {
    const entry = document.getElementById('journal-entry');
    if (!entry) return;
    
    const text = entry.value.trim();
    if (!text) {
        alert('Please write something before saving.');
        return;
    }
    
    const journal = JSON.parse(localStorage.getItem('journal_entries') || '[]');
    journal.unshift({
        date: new Date().toISOString(),
        content: text
    });
    
    if (journal.length > 30) journal.pop();
    
    localStorage.setItem('journal_entries', JSON.stringify(journal));
    entry.value = '';
    renderJournal();
}

function clearJournal() {
    if (confirm('Are you sure you want to clear all journal entries?')) {
        localStorage.setItem('journal_entries', '[]');
        renderJournal();
    }
}

function renderJournal() {
    const journal = JSON.parse(localStorage.getItem('journal_entries') || '[]');
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
}

// ============================================
// 13. STUDY REMINDER
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let studiedToday = false;
    try {
        const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
        if (allProgress && typeof allProgress === 'object') {
            Object.keys(allProgress).forEach(key => {
                try {
                    const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
                    if (data && data.sessions && Array.isArray(data.sessions)) {
                        data.sessions.forEach(s => {
                            if (s && s.date) {
                                const date = new Date(s.date);
                                date.setHours(0, 0, 0, 0);
                                if (date.getTime() === today.getTime()) {
                                    studiedToday = true;
                                }
                            }
                        });
                    }
                } catch (e) {}
            });
        }
    } catch (e) {}
    
    if (!studiedToday && Notification.permission === 'granted') {
        new Notification('⏰ Study Reminder', {
            body: 'You haven\'t studied today! Open the sprint and get started.',
            icon: '📚'
        });
    }
}

function updateReminderInterval() {
    if (document.getElementById('reminder-toggle') && document.getElementById('reminder-toggle').checked) {
        startReminderCheck();
    }
}

// ============================================
// 14. STUDY CALENDAR
// ============================================

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
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
        const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
        if (allProgress && typeof allProgress === 'object') {
            Object.keys(allProgress).forEach(key => {
                try {
                    const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
                    if (data && data.sessions && Array.isArray(data.sessions)) {
                        data.sessions.forEach(s => {
                            if (s && s.date) {
                                const date = new Date(s.date);
                                const dateKey = date.toDateString();
                                if (!studyDays[dateKey]) studyDays[dateKey] = 0;
                                studyDays[dateKey] += (s.durationHours || 0) + ((s.durationMinutes || 0) / 60);
                            }
                        });
                    }
                } catch (e) {}
            });
        }
    } catch (e) {
        console.log('Error reading calendar data');
    }
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
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
        const date = new Date(currentYear, currentMonth, day);
        const dateKey = date.toDateString();
        const hours = studyDays[dateKey] || 0;
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
// 15. ACHIEVEMENTS / BADGES
// ============================================

function updateAchievements(totalSessions, completedSessions, streak, completedSubjects, totalSubjects) {
    const grid = document.getElementById('achievements-grid');
    if (!grid) {
        console.log('Achievements grid not found');
        return;
    }
    
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
// 16. INITIALIZE DASHBOARD
// ============================================

function initializeDashboard() {
    console.log('🚀 Initializing dashboard...');
    
    try {
        updateMainPageProgress();
        console.log('✅ Main page progress updated');
    } catch (e) {
        console.error('❌ Error updating main page progress:', e);
    }
    
    try {
        updateActivityBars();
        console.log('✅ Activity bars updated');
    } catch (e) {
        console.error('❌ Error updating activity bars:', e);
    }
    
    try {
        updateTodayProgress();
        console.log('✅ Today progress updated');
    } catch (e) {
        console.error('❌ Error updating today progress:', e);
    }
    
    try {
        updateDataSize();
        console.log('✅ Data size updated');
    } catch (e) {
        console.error('❌ Error updating data size:', e);
    }
    
    try {
        const dailyTargetEl = document.getElementById('daily-target');
        if (dailyTargetEl) {
            dailyTargetEl.value = getDailyTarget();
        }
        console.log('✅ Daily target set');
    } catch (e) {
        console.error('❌ Error setting daily target:', e);
    }
    
    try {
        updateTimerDisplay();
        console.log('✅ Timer display updated');
    } catch (e) {
        console.error('❌ Error updating timer display:', e);
    }
    
    try {
        renderJournal();
        console.log('✅ Journal rendered');
    } catch (e) {
        console.error('❌ Error rendering journal:', e);
    }
    
    try {
        renderCalendar();
        console.log('✅ Calendar rendered');
    } catch (e) {
        console.error('❌ Error rendering calendar:', e);
    }
    
    try {
        updateAnalytics();
        console.log('✅ Analytics updated');
    } catch (e) {
        console.error('❌ Error updating analytics:', e);
    }
    
    // Achievements will be updated via updateMainPageProgress()
    console.log('✅ Achievements will be updated via main page progress');
    
    try {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    } catch (e) {}
    
    // Start cloud sync
    try {
        startCloudSync();
        console.log('✅ Cloud sync started');
    } catch (e) {
        console.error('❌ Error starting cloud sync:', e);
    }
    
    // Auto-refresh
    setInterval(() => {
        try {
            updateMainPageProgress();
            updateActivityBars();
            updateTodayProgress();
            updateDataSize();
            updateAnalytics();
            renderCalendar();
        } catch (e) {
            console.log('Auto-refresh error:', e);
        }
    }, 30000);
    
    console.log('✅ Dashboard initialization complete!');
}

// ============================================
// 17. START
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeDashboard, 500);
});

window.onload = function() {
    renderJournal();
};

console.log('🚀 GATE 2027 Dashboard loaded!');
console.log('📊 Tracking', Object.keys(subjectMapping).length, 'subjects');