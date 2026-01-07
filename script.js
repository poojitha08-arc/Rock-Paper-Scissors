let userScore = 0;
let computerScore = 0;

const result = document.getElementById("result");
const userScoreEl = document.getElementById("userScore");
const compScoreEl = document.getElementById("computerScore");

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

function play(userChoice) {
  clickSound.play();
  result.className = '';
  result.textContent = 'Computer is thinking...';

  document.querySelectorAll('.choice').forEach(btn => {
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 400);
  });

  setTimeout(() => {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    if (userChoice === computerChoice) {
      result.textContent = "It's a draw!";
      result.classList.add('draw');
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
      userScore++;
      winSound.play();
      result.textContent = 'You win!';
      result.classList.add('win');
    } else {
      computerScore++;
      loseSound.play();
      result.textContent = 'Computer wins!';
      result.classList.add('lose');
    }

    userScoreEl.textContent = userScore;
    compScoreEl.textContent = computerScore;
  }, 600);
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  userScoreEl.textContent = 0;
  compScoreEl.textContent = 0;
  result.textContent = 'Tap or Swipe to play';
  result.className = '';
}

/* 📱 Swipe Controls */
let startX = 0;
document.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  if (diff > 50) play('paper');       // swipe right
  else if (diff < -50) play('rock');  // swipe left
  else play('scissors');              // tap
});
