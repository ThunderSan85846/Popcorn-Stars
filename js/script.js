let users = {};

function playClickSound() {
  const click = document.getElementById("click-sound");
  if (click) {
    click.currentTime = 0;
    click.play();
  }
}

function startTutorial() {
  document.getElementById("intro-text").classList.remove("hidden");
  setTimeout(() => showScreen("account"), 1500);
}

function skipTutorial() {
  showScreen("account");
}

function showScreen(screen) {
  document.querySelectorAll(".modal").forEach(div => div.classList.add("hidden"));
  document.getElementById("game-screen").style.display = "none";

  if (screen === "start") {
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("intro-text").classList.add("hidden");
  } else {
    document.getElementById(`${screen}-screen`).classList.remove("hidden");
  }
}

function handleLogin() {
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

// Ativa som para todos os botões
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", playClickSound);
});
