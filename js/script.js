let isLoggedIn = false;

function showModal(message, buttons) {
  const overlay = document.getElementById("modal-overlay");
  const msg = document.getElementById("modal-message");
  const btns = document.getElementById("modal-buttons");

  msg.innerText = message;
  btns.innerHTML = "";

  buttons.forEach(({ text, action }) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => {
      overlay.classList.add("hidden");
      action();
    };
    btns.appendChild(btn);
  });

  overlay.classList.remove("hidden");
}

function showForm(title, onSubmit) {
  const form = document.getElementById("form-container");
  document.getElementById("form-title").innerText = title;
  form.classList.remove("hidden");

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  usernameInput.value = "";
  passwordInput.value = "";
  usernameInput.focus();

  document.getElementById("form-submit").onclick = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    form.classList.add("hidden");
    onSubmit(username, password);
  };

  document.getElementById("form-cancel").onclick = () => {
    form.classList.add("hidden");
    startGame(); // volta ao início
  };
}

function verifyLogin(username, password) {
  const userData = JSON.parse(localStorage.getItem("users") || "{}");
  return userData[username] === password;
}

function createUser(username, password) {
  const userData = JSON.parse(localStorage.getItem("users") || "{}");
  if (userData[username]) return false;
  userData[username] = password;
  localStorage.setItem("users", JSON.stringify(userData));
  return true;
}

function startGame() {
  showModal("Olá, bem-vindo ao Popcorn Stars!", [
    {
      text: "OK",
      action: () => {
        showModal(
          "Você parece ser novo por aqui. Você gostaria de fazer login ou criar uma nova conta?",
          [
            {
              text: "Login",
              action: () => showLoginOrCreate(true)
            },
            {
              text: "Criar Conta",
              action: () => showLoginOrCreate(false)
            }
          ]
        );
      }
    }
  ]);
}

function showLoginOrCreate(isLogin) {
  if (isLogin) {
    showForm("Login", (username, password) => {
      if (verifyLogin(username, password)) {
        isLoggedIn = true;
        showModal("Login bem-sucedido!", [
          {
            text: "OK",
            action: endGame
          }
        ]);
      } else {
        showModal("Usuário ou senha errados.", [
          {
            text: "Tentar novamente",
            action: () => showLoginOrCreate(true)
          },
          {
            text: "Voltar",
            action: startGame
          }
        ]);
      }
    });
  } else {
    showForm("Criar Conta", (username, password) => {
      if (createUser(username, password)) {
        isLoggedIn = true;
        showModal("Sua conta foi criada com sucesso!", [
          {
            text: "OK",
            action: endGame
          }
        ]);
      } else {
        showModal("Erro: nome de usuário já existe.", [
          {
            text: "Tentar outro nome",
            action: () => showLoginOrCreate(false)
          },
          {
            text: "Voltar",
            action: startGame
          }
        ]);
      }
    });
  }
}

function endGame() {
  showModal("Obrigado por jogar Popcorn Stars!", [
    { text: "Fechar", action: () => window.close() }
  ]);
}

// Iniciar
window.onload = startGame;
