  let workMinutes = 25;
        let breakMinutes = 5;
        let seconds = 0;
        let isWorkSession = true;
        let timerInterval;
        let isPaused = false;

        const timeDisplay = document.getElementById("time-display");
        const statusDisplay = document.getElementById("status");
        const workTimeInput = document.getElementById("workTime");
        const breakTimeInput = document.getElementById("breakTime");

        function formatTime(min, sec) {
            return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
        }

        function updateDisplay() {
            timeDisplay.textContent = formatTime(workMinutes, seconds);
            statusDisplay.textContent = isWorkSession ? "Work Session" : "Break Session";
        }

        function startTimer() {
            if (!timerInterval) {
                isPaused = false;
                timerInterval = setInterval(updateTimer, 1000);
            }
        }

        function updateTimer() {
            if (isPaused) return;

            if (seconds === 0) {
                if (isWorkSession && workMinutes === 0) {
                    switchSession();
                } else if (!isWorkSession && breakMinutes === 0) {
                    switchSession();
                } else {
                    if (isWorkSession) workMinutes--;
                    else breakMinutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }

            timeDisplay.textContent = formatTime(isWorkSession ? workMinutes : breakMinutes, seconds);
        }

        function switchSession() {
            isWorkSession = !isWorkSession;
            workMinutes = parseInt(workTimeInput.value, 10);
            breakMinutes = parseInt(breakTimeInput.value, 10);
            seconds = 0;
            updateDisplay();
        }

        function pauseTimer() {
            isPaused = true;
            clearInterval(timerInterval);
            timerInterval = null;
        }

        function resetTimer() {
            clearInterval(timerInterval);
            timerInterval = null;
            isWorkSession = true;
            workMinutes = parseInt(workTimeInput.value, 10);
            breakMinutes = parseInt(breakTimeInput.value, 10);
            seconds = 0;
            isPaused = false;
            updateDisplay();
        }

        updateDisplay();
