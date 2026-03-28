document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("celebrateBtn");

  // Initial random small confetti
  setTimeout(() => {
    sprayConfetti(0.5, 0.2);
  }, 1000);

  btn.addEventListener("click", () => {
    // Change button text temporarily
    const originalText = btn.innerText;
    btn.innerText = "Yay! 🎉💖";

    // Button animation trigger
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "";
      btn.innerText = originalText;
    }, 300);

    // Big confetti explosion
    fireworks();
  });

  // Adding confetti to balloons
  const balloons = document.querySelectorAll('.balloon');
  balloons.forEach(balloon => {
    balloon.addEventListener('click', (e) => {
      const rect = balloon.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      sprayConfetti(x, y);
      
      // Temporary pop effect
      balloon.style.transform = 'scale(1.3) rotate(15deg)';
      setTimeout(() => {
         balloon.style.transform = '';
      }, 200);
    });
  });

  function sprayConfetti(x, y) {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { x, y },
      colors: ["#ff007f", "#7928ca", "#ff8a00", "#00f2fe", "#43e97b", "#ffd700"],
      startVelocity: 35,
      gravity: 0.5,
      ticks: 120
    });
  }

  function fireworks() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 100, zIndex: 100, gravity: 0.6 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff007f", "#7928ca", "#ff8a00"]
        }),
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#00f2fe", "#43e97b", "#ffd700"]
        }),
      );
    }, 250);
  }
});
