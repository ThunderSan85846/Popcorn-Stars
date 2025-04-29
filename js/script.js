let isLoggedIn = false;
let accounts = JSON.parse(localStorage.getItem("popcorn_accounts")) || {};

window.onload = () => {
  alert("Olá, bem-vindo ao Popcorn Stars!");
  showPopup("Você parece ser novo por aqui. Você gostaria de fazer login ou criar uma nova conta?", [
    { text: "Sim", action: () => showLoginOrCreate(true) },
    { text: "Não", action: () => showLoginOrCreate(false) }
  ]);
};

function showPopup(message, buttons = []) {
  const popup = document.getElementById("popup");
  const messageElement = document.getElementById("popup-message");
  const buttonsContainer = document.getElementById("popup-buttons");

  messageElement.innerText = message;
  buttonsContainer.innerHTML = "";
  buttons.forEach(btn => {
    const b = document.createElement("button");
    b.innerText = btn.text;
    b.onclick = () => {
      popup.classList.add("hidden");
      btn.action();
    };
    buttonsContainer.appendChild(b);
  });

  popup.classList.remove("hidden");
}

function showLoginOrCreate(hasAccount) {
  document.getElementById("form-title").innerText = hasAccount ? "Login" : "Criar Conta";
  document.getElementById("form-container").classList.remove("hidden");

  const confirmButton = document.getElementById("confirm-button");
  const cancelButton = document.getElementById("cancel-button");

  confirmButton.onclick = () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (hasAccount) {
      if (accounts[user] && accounts[user] === pass) {
        isLoggedIn = true;
        alert("Login bem-sucedido!");
        endGame();
      } else {
        alert("Usuário ou senha incorretos.");
      }
    } else {
      if (accounts[user]) {
        alert("Erro ao criar a conta. Usuário já existe.");
      } else {
        accounts[user] = pass;
        localStorage.setItem("popcorn_accounts", JSON.stringify(accounts));
        isLoggedIn = true;
        alert("Conta criada com sucesso!");
        endGame();
      }
    }
  };

  cancelButton.onclick = () => {
    document.getElementById("form-container").classList.add("hidden");
    location.reload();
  };
}

function endGame() {
  document.getElementById("form-container").classList.add("hidden");
  alert("Obrigado por jogar Popcorn Stars!");
}
