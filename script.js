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
// 3. STUDY TIMER WITH SECONDS (HH:MM:SS)
// ============================================

let timerInterval = null;
let timerSeconds = 1500; // Default 25 minutes
let timerRunning = false;
let currentSessionSeconds = 0;
let sessionTotalSeconds = 0;

function setTimerFromInput() {
    const hoursInput = document.getElementById('timer-hours');
    const minutesInput = document.getElementById('timer-minutes');
    const secondsInput = document.getElementById('timer-seconds-input');
    
    if (!hoursInput || !minutesInput || !secondsInput) return;
    
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    // Validate
    if (hours < 0 || hours > 12) {
        alert('Please enter hours between 0 and 12');
        return;
    }
    if (minutes < 0 || minutes > 59) {
        alert('Please enter minutes between 0 and 59');
        return;
    }
    if (seconds < 0 || seconds > 59) {
        alert('Please enter seconds between 0 and 59');
        return;
    }
    
    // Calculate total seconds
    timerSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    if (timerSeconds <= 0) {
        alert('Please enter a valid time greater than 0');
        return;
    }
    
    // Reset timer if running
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        const startBtn = document.getElementById('timer-start');
        const pauseBtn = document.getElementById('timer-pause');
        if (startBtn) startBtn.style.display = 'inline-block';
        if (pauseBtn) pauseBtn.style.display = 'none';
    }
    
    // Store the session total seconds for tracking
    sessionTotalSeconds = timerSeconds;
    currentSessionSeconds = 0;
    
    updateTimerDisplay();
    updateCurrentSessionDisplay();
}

function startTimer() {
    if (timerRunning) return;
    
    // If timer is at 0, don't start
    if (timerSeconds <= 0) {
        alert('Please set a timer first using the input fields above.');
        return;
    }
    
    timerRunning = true;
    sessionTotalSeconds = timerSeconds;
    currentSessionSeconds = 0;
    
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    const display = document.getElementById('timer-display');
    
    if (startBtn) {
        startBtn.style.display = 'none';
        startBtn.disabled = true;
    }
    if (pauseBtn) pauseBtn.style.display = 'inline-block';
    if (display) display.classList.add('running');
    
    // Disable inputs while running
    const hoursInput = document.getElementById('timer-hours');
    const minutesInput = document.getElementById('timer-minutes');
    const secondsInput = document.getElementById('timer-seconds-input');
    const setBtn = document.getElementById('timer-set-btn');
    
    if (hoursInput) hoursInput.disabled = true;
    if (minutesInput) minutesInput.disabled = true;
    if (secondsInput) secondsInput.disabled = true;
    if (setBtn) setBtn.disabled = true;
    
    timerInterval = setInterval(() => {
        timerSeconds--;
        currentSessionSeconds++;
        updateTimerDisplay();
        updateCurrentSessionDisplay();
        
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            if (startBtn) {
                startBtn.style.display = 'inline-block';
                startBtn.disabled = false;
            }
            if (pauseBtn) pauseBtn.style.display = 'none';
            if (display) display.classList.remove('running');
            
            // Record the study session when timer completes
            recordStudySession(sessionTotalSeconds);
            
            // Add to Today's Target
            const hours = Math.floor(sessionTotalSeconds / 3600);
            const minutes = Math.floor((sessionTotalSeconds % 3600) / 60);
            addTimerLectureToTodayTarget(hours, minutes);
            
            // Play sound
            try {
                const audio = new Audio('data:audio/wav;base64,UklGRnoAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoAAACBhYqFhYWFiomFiYWNg4uGjI6HjYmPipGMkY2RjZGNko6SkJORkpGSkZSTlJSVlJWWlZWXlpeXl5eXl5eYmJmZmZqampqbm5qbm5ybnJ2bnZ6cnZ+doJ+hoKCgoaGhoqGjoqOko6SlpKWlpaampgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
                audio.play();
            } catch(e) {}
            
            alert('⏰ Time is up! Great focus session!');
            
            // Reset session tracking
            sessionTotalSeconds = 0;
            currentSessionSeconds = 0;
            
            // Enable inputs
            if (hoursInput) hoursInput.disabled = false;
            if (minutesInput) minutesInput.disabled = false;
            if (secondsInput) secondsInput.disabled = false;
            if (setBtn) setBtn.disabled = false;
            
            // Update today's stats
            updateTodayStats();
            updateStatsDisplay();
            
            // Reset current session display
            updateCurrentSessionDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    const display = document.getElementById('timer-display');
    
    if (startBtn) {
        startBtn.style.display = 'inline-block';
        startBtn.disabled = false;
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (display) display.classList.remove('running');
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    const startBtn = document.getElementById('timer-start');
    const pauseBtn = document.getElementById('timer-pause');
    const display = document.getElementById('timer-display');
    
    if (startBtn) {
        startBtn.style.display = 'inline-block';
        startBtn.disabled = false;
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (display) display.classList.remove('running');
    
    // Enable inputs
    const hoursInput = document.getElementById('timer-hours');
    const minutesInput = document.getElementById('timer-minutes');
    const secondsInput = document.getElementById('timer-seconds-input');
    const setBtn = document.getElementById('timer-set-btn');
    
    if (hoursInput) hoursInput.disabled = false;
    if (minutesInput) minutesInput.disabled = false;
    if (secondsInput) secondsInput.disabled = false;
    if (setBtn) setBtn.disabled = false;
    
    // Reset to last set time or default
    if (hoursInput && minutesInput && secondsInput) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        timerSeconds = (hours * 3600) + (minutes * 60) + seconds;
        if (timerSeconds <= 0) timerSeconds = 1500;
    } else {
        timerSeconds = 1500;
    }
    
    sessionTotalSeconds = 0;
    currentSessionSeconds = 0;
    updateTimerDisplay();
    updateCurrentSessionDisplay();
}

function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    const display = document.getElementById('timer-display');
    
    if (display) {
        display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function updateCurrentSessionDisplay() {
    const hours = Math.floor(currentSessionSeconds / 3600);
    const minutes = Math.floor((currentSessionSeconds % 3600) / 60);
    const seconds = currentSessionSeconds % 60;
    const display = document.getElementById('current-session-time');
    
    if (display) {
        if (currentSessionSeconds > 0) {
            display.textContent = `${hours}h ${minutes}m ${seconds}s`;
        } else {
            display.textContent = '0h 0m 0s';
        }
    }
}

// ============================================
// 4. STUDY SESSION RECORDING
// ============================================

function recordStudySession(totalSeconds) {
    if (totalSeconds <= 0) return;
    
    const minutes = Math.ceil(totalSeconds / 60);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get today's sessions
    let todayData = JSON.parse(localStorage.getItem('today_study_data') || '{"totalMinutes":0,"sessions":[]}');
    
    // If it's a new day, reset
    const lastDate = localStorage.getItem('last_study_date');
    const todayStr = today.toISOString().split('T')[0];
    
    if (lastDate !== todayStr) {
        todayData = { totalMinutes: 0, sessions: [] };
        localStorage.setItem('last_study_date', todayStr);
    }
    
    // Add this session
    todayData.totalMinutes += minutes;
    todayData.sessions.push({
        timestamp: new Date().toISOString(),
        minutes: minutes,
        seconds: totalSeconds
    });
    
    // Keep only last 100 sessions
    if (todayData.sessions.length > 100) {
        todayData.sessions = todayData.sessions.slice(-100);
    }
    
    localStorage.setItem('today_study_data', JSON.stringify(todayData));
}

function getTodayStudyData() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    const lastDate = localStorage.getItem('last_study_date');
    
    if (lastDate !== todayStr) {
        return { totalMinutes: 0, sessions: [] };
    }
    
    const data = JSON.parse(localStorage.getItem('today_study_data') || '{"totalMinutes":0,"sessions":[]}');
    return data;
}

function updateTodayStats() {
    const data = getTodayStudyData();
    const totalMinutes = data.totalMinutes || 0;
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    const timeEl = document.getElementById('today-study-time');
    if (timeEl) {
        if (hours > 0 && minutes > 0) {
            timeEl.textContent = `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            timeEl.textContent = `${hours}h`;
        } else if (minutes > 0) {
            timeEl.textContent = `${minutes}m`;
        } else {
            timeEl.textContent = '0m';
        }
    }
}

// ============================================
// 5. ADD TIMER LECTURE TO TODAY'S TARGET
// ============================================

function addTimerLectureToTodayTarget(hours, minutes) {
    const today = new Date().toISOString().split('T')[0];
    const allData = JSON.parse(localStorage.getItem('daily_lectures') || '{}');
    
    if (!allData[today]) {
        allData[today] = [];
    }
    
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    
    const lectureName = `Study Session ${hours}h ${minutes}m`;
    const subjectName = 'General';
    
    // Check if lecture already exists
    const exists = allData[today].some(l => l.name === lectureName && l.subject === subjectName);
    if (exists) {
        console.log('Timer lecture already exists in today\'s target');
        return;
    }
    
    const lecture = {
        id: Date.now(),
        name: lectureName,
        subject: subjectName,
        time: timeStr,
        completed: false,
        addedAt: new Date().toISOString(),
        duration: `${hours}h ${minutes}m`,
        fromTimer: true
    };
    
    allData[today].push(lecture);
    localStorage.setItem('daily_lectures', JSON.stringify(allData));
    console.log('✅ Timer lecture added to Today\'s Target:', lecture);
    
    // Refresh the lecture list if on main page
    if (typeof renderTodayLectures === 'function') {
        renderTodayLectures();
    }
}

// ============================================
// 6. TODAY'S TARGET / DAILY LECTURES
// ============================================

function getTodayLectures() {
    const today = new Date().toISOString().split('T')[0];
    const allData = JSON.parse(localStorage.getItem('daily_lectures') || '{}');
    if (!allData[today]) {
        allData[today] = [];
    }
    return allData[today];
}

function saveTodayLectures(lectures) {
    const today = new Date().toISOString().split('T')[0];
    const allData = JSON.parse(localStorage.getItem('daily_lectures') || '{}');
    allData[today] = lectures;
    localStorage.setItem('daily_lectures', JSON.stringify(allData));
}

function toggleLectureCompletion(lectureId) {
    const lectures = getTodayLectures();
    const lecture = lectures.find(l => l.id === lectureId);
    if (lecture) {
        lecture.completed = !lecture.completed;
        saveTodayLectures(lectures);
        renderTodayLectures();
    }
}

function deleteTodayLecture(lectureId) {
    if (confirm('Delete this lecture?')) {
        let lectures = getTodayLectures();
        lectures = lectures.filter(l => l.id !== lectureId);
        saveTodayLectures(lectures);
        renderTodayLectures();
    }
}

function renderTodayLectures() {
    const container = document.getElementById('lecture-list');
    const lectures = getTodayLectures();
    
    if (!container) return;
    
    if (lectures.length === 0) {
        container.innerHTML = `
            <div class="lecture-empty">
                <span class="empty-icon">📝</span>
                <h4>No lectures planned for today</h4>
                <p>Add your study sessions above!</p>
            </div>
        `;
        updateDailyProgress();
        return;
    }
    
    // Sort: incomplete first, then by time
    lectures.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return a.time.localeCompare(b.time);
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
                    <span>${lecture.time}</span>
                </span>
            </div>
            <span class="lecture-time">${lecture.completed ? '✅ Done' : '⏳ Pending'}</span>
            <button class="lecture-delete" onclick="deleteTodayLecture(${lecture.id})" title="Delete">✕</button>
        </div>
    `).join('');
    
    updateDailyProgress();
}

function updateDailyProgress() {
    const lectures = getTodayLectures();
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
}

// ============================================
// 7. STUDY GROUP PROGRESS
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
        updateStatsDisplay();
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
    
    updateStatsDisplay();
    
    // UPDATE ACHIEVEMENTS
    try {
        updateAchievements(totalSessions, completedSessions, 0, completedSubjects, totalSubjects);
    } catch (e) {
        console.error('Error updating achievements:', e);
    }
}

// ============================================
// 8. STATS DISPLAY
// ============================================

function updateStatsDisplay() {
    const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
    let totalSessions = 0;
    let completedSessions = 0;
    let totalMinutes = 0;
    
    Object.keys(subjectMapping).forEach(key => {
        const progress = allProgress[key];
        if (progress) {
            totalSessions += progress.total || 0;
            completedSessions += progress.completed || 0;
        }
        
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
    });
    
    // Total Subjects
    const totalSubjectsEl = document.getElementById('total-subjects');
    if (totalSubjectsEl) totalSubjectsEl.textContent = Object.keys(subjectMapping).length;
    
    // Total Sessions
    const totalSessionsEl = document.getElementById('total-sessions');
    if (totalSessionsEl) totalSessionsEl.textContent = totalSessions || 0;
    
    // Completed Sessions
    const completedSessionsEl = document.getElementById('completed-sessions');
    if (completedSessionsEl) completedSessionsEl.textContent = completedSessions || 0;
    
    // Today's Study Time (from timer)
    const todayData = getTodayStudyData();
    const todayMinutes = todayData.totalMinutes || 0;
    const todayHours = Math.floor(todayMinutes / 60);
    const todayMins = todayMinutes % 60;
    const totalTimeEl = document.getElementById('total-study-time');
    if (totalTimeEl) {
        if (todayHours > 0 && todayMins > 0) {
            totalTimeEl.textContent = `${todayHours}h ${todayMins}m`;
        } else if (todayHours > 0) {
            totalTimeEl.textContent = `${todayHours}h`;
        } else if (todayMins > 0) {
            totalTimeEl.textContent = `${todayMins}m`;
        } else {
            totalTimeEl.textContent = '0m';
        }
    }
    
    // Update today stats
    updateTodayStats();
    updateDataSize();
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
            key === 'all_subject_progress' || key === 'journal_entries' ||
            key === 'today_study_data' || key === 'last_study_date' ||
            key === 'daily_lectures') {
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
            key === 'all_subject_progress' || key === 'journal_entries' ||
            key === 'today_study_data' || key === 'last_study_date' ||
            key === 'daily_lectures' || key === 'user_id') {
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
                        key === 'all_subject_progress' || key === 'journal_entries' ||
                        key === 'today_study_data' || key === 'last_study_date' ||
                        key === 'daily_lectures' || key === 'user_id') {
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
                    key === 'all_subject_progress' || key === 'journal_entries' ||
                    key === 'today_study_data' || key === 'last_study_date' ||
                    key === 'daily_lectures') {
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
                key === 'user_id' || key === 'journal_entries' ||
                key === 'today_study_data' || key === 'last_study_date' ||
                key === 'daily_lectures') {
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
        updateStatsDisplay();
        updateAnalytics();
        renderJournal();
        renderCalendar();
        updateTodayStats();
        renderTodayLectures();
        
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
            updateAchievements(totalSessions, completedSessions, 0, completedSubjects, totalSubjects);
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
        updateStatsDisplay();
        updateAnalytics();
        renderJournal();
        renderCalendar();
        updateTodayStats();
        renderTodayLectures();
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
    const performanceScore = Math.round(overallProgress * 0.8 + Math.min((completedSubjects / Object.keys(subjectMapping).length) * 100, 100) * 0.2);
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
        const data = getTodayStudyData();
        if (data && data.sessions && data.sessions.length > 0) {
            studiedToday = true;
        }
    } catch (e) {}
    
    if (!studiedToday && Notification.permission === 'granted') {
        new Notification('⏰ Study Reminder', {
            body: 'You haven\'t studied today! Set the timer and get started.',
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
        // Get today's study data
        const todayData = getTodayStudyData();
        if (todayData && todayData.sessions) {
            todayData.sessions.forEach(s => {
                if (s && s.timestamp) {
                    const date = new Date(s.timestamp);
                    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                        const dateKey = date.getDate();
                        if (!studyDays[dateKey]) studyDays[dateKey] = 0;
                        studyDays[dateKey] += s.minutes / 60;
                    }
                }
            });
        }
        
        // Also check subject sessions for the month
        const allProgress = JSON.parse(localStorage.getItem('all_subject_progress') || '{}');
        if (allProgress && typeof allProgress === 'object') {
            Object.keys(allProgress).forEach(key => {
                try {
                    const data = JSON.parse(localStorage.getItem(`tracker_${key}`) || '{"sessions":[]}');
                    if (data && data.sessions && Array.isArray(data.sessions)) {
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
                } catch (e) {}
            });
        }
    } catch (e) {
        console.log('Error reading calendar data:', e);
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
        updateStatsDisplay();
        console.log('✅ Stats updated');
    } catch (e) {
        console.error('❌ Error updating stats:', e);
    }
    
    try {
        updateTimerDisplay();
        console.log('✅ Timer display updated');
    } catch (e) {
        console.error('❌ Error updating timer display:', e);
    }
    
    try {
        // Set default timer values
        const hoursInput = document.getElementById('timer-hours');
        const minutesInput = document.getElementById('timer-minutes');
        const secondsInput = document.getElementById('timer-seconds-input');
        if (hoursInput) hoursInput.value = 0;
        if (minutesInput) minutesInput.value = 25;
        if (secondsInput) secondsInput.value = 0;
        timerSeconds = 1500;
        updateTimerDisplay();
        console.log('✅ Timer initialized');
    } catch (e) {
        console.error('❌ Error initializing timer:', e);
    }
    
    try {
        updateTodayStats();
        console.log('✅ Today stats updated');
    } catch (e) {
        console.error('❌ Error updating today stats:', e);
    }
    
    try {
        updateDataSize();
        console.log('✅ Data size updated');
    } catch (e) {
        console.error('❌ Error updating data size:', e);
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
        renderTodayLectures();
        console.log('✅ Today\'s lectures rendered');
    } catch (e) {
        console.error('❌ Error rendering today\'s lectures:', e);
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
            updateStatsDisplay();
            updateTodayStats();
            updateDataSize();
            updateAnalytics();
            renderCalendar();
            renderTodayLectures();
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
    updateTodayStats();
    renderTodayLectures();
};

console.log('🚀 GATE 2027 Dashboard loaded!');
console.log('📊 Tracking', Object.keys(subjectMapping).length, 'subjects');