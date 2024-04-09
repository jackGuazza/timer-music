
var isTimerunning = true;
var tempoRimanente = 0;

document.getElementById('studyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var elemento = document.getElementById("studio-pausa");
    const progressBar = document.querySelector('.progress-bar');

    const studyTime = parseInt(document.getElementById('studyTime').value, 10);
    let studyCycles = parseInt(document.getElementById('studyCycles').value, 10);
    const breakTime = parseInt(document.getElementById('pause').value, 10);
    
    function startStudyTimer() {
        if(!isTimerunning) return;
        elemento.style.display = 'inline';
        elemento.innerHTML = "STUDIO, cicli rimanenti:" + studyCycles;
        const timerDisplay = document.getElementById('timerDisplay');
        progressBar.style.animation = 'none';

        const startTime = Date.now();
        const endTime = startTime + (studyTime * 60000);

        const updateProgressBar = () => {
            if(!isTimerunning) return;
            const now = Date.now();
            const elapsedTime = now - startTime;
            const progressPercentage = (elapsedTime / (studyTime * 60000)) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            if (now < endTime) {
                const studyDifference = endTime - now;
                const studyMinutes = Math.floor((studyDifference % (1000 * 60 * 60)) / (1000 * 60));
                const studySeconds = Math.floor((studyDifference % (1000 * 60)) / 1000);
                timerDisplay.textContent = `${String(studyMinutes).padStart(2, '0')}:${String(studySeconds).padStart(2, '0')}`;
                requestAnimationFrame(updateProgressBar);
            } else {
                progressBar.style.width = '0%';
                startBreakTimer();
            }
        };

        updateProgressBar();

        document.getElementById("stop").addEventListener("click", function () {
            isTimerunning = false;
            //tempoRimanente =  Date.now() - startTime;
        });
    }

    function startBreakTimer() {
        if(!isTimerunning) return;
        elemento.innerHTML = "PAUSA, cicli rimanenti : " + studyCycles;
        progressBar.style.animation = 'none';

        const startTime = Date.now();
        const endTime = startTime + breakTime * 60000;

        const updateProgressBar = () => {
            if(!isTimerunning) return;
            const now = Date.now();
            const elapsedTime = now - startTime;
            const progressPercentage = (elapsedTime / (breakTime * 60000)) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            if (now < endTime) {
                const breakDifference = endTime - now;
                const breakMinutes = Math.floor((breakDifference % (1000 * 60 * 60)) / (1000 * 60));
                const breakSeconds = Math.floor((breakDifference % (1000 * 60)) / 1000);
                document.getElementById('timerDisplay').textContent = `${String(breakMinutes).padStart(2, '0')}:${String(breakSeconds).padStart(2, '0')}`;
                requestAnimationFrame(updateProgressBar);
            } else {
                progressBar.style.width = '0%';
                studyCycles--;
                if (studyCycles > 0) {
                    startStudyTimer();
                } else {
                    elemento.innerHTML = "finito!, cicli rimanenti : " + studyCycles;
                    document.getElementById('timerDisplay').textContent = "";
                }
            }
        };

        updateProgressBar();

    }

    startStudyTimer();

    document.getElementById("start").addEventListener("click", function () {
        isTimerunning = true;
        //startStudyTimer();
    });

});
