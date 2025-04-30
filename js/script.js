let users = {};
const clickSound = document.getElementById("click-sound");

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function typeWriter(text, elementId, callback) {
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i === text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 40);
}

window.onload = () => {
  const welcomeText = "Olá, bem-vindo ao Popcorn Stars!\nVocê parece ser novo por aqui";
  typeWriter(welcomeText, "welcome-text", () => {
    document.getElementById("tutorial-buttons").classList.remove("hidden");
  });
};

function startTutorial() {
  playSound();
  alert("Iniciando o tutorial...");
  showScreen("account");
}

function skipTutorial() {
  playSound();
  alert("Pulando o tutorial. Indo direto para o jogo!");
  showScreen("account");
}

function showScreen(screen) {
  playSound();
  document.querySelectorAll(".modal").forEach(div => div.classList.add("hidden"));
  document.getElementById("game-screen").style.display = "none";

  if (screen === "start") {
    document.getElementById("game-screen").style.display = "block";
  } else {
    document.getElementById(`${screen}-screen`).classList.remove("hidden");
  }
}

function handleLogin() {
  playSound();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (users[username] && users[username] === password) {
    alert("Login bem-sucedido!");
    showScreen("final");
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

function handleRegister() {
  playSound();
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  if (users[username]) {
    alert("Esse usuário já existe.");
  } else {
    users[username] = password;
    alert("Conta criada com sucesso!");
    showScreen("final");
  }
}
