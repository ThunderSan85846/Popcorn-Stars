const dialogoContainer = document.getElementById("dialogo-container");
const botoesTutorial = document.getElementById("botoes-tutorial");
const botoesConta = document.getElementById("botoes-conta");
const formLogin = document.getElementById("form-login");
const formCriar = document.getElementById("form-criar");

let usuarioSalvo = "usuario";
let senhaSalva = "senha";

function mostrarTexto(texto, callback) {
  dialogoContainer.innerHTML = "";
  const p = document.createElement("p");
  dialogoContainer.appendChild(p);

  let i = 0;
  const intervalo = setInterval(() => {
    p.textContent += texto[i++];
    if (i >= texto.length) {
      clearInterval(intervalo);
      if (callback) callback();
    }
  }, 40);
}

function iniciar() {
  mostrarTexto("Olá, bem-vindo ao Popcorn Stars!", () => {
    setTimeout(() => {
      mostrarTexto("Você parece ser novo por aqui", () => {
        botoesTutorial.classList.remove("hidden");
      });
    }, 1000);
  });
}

function escolherTutorial(jogar) {
  botoesTutorial.classList.add("hidden");
  mostrarTexto(jogar ? "Iniciando o tutorial..." : "Pulando o tutorial. Indo direto para o jogo!", () => {
    setTimeout(() => {
      mostrarTexto("Você já tem uma conta?", () => {
        botoesConta.classList.remove("hidden");
      });
    }, 1000);
  });
}

function mostrarLogin() {
  botoesConta.classList.add("hidden");
  formLogin.classList.remove("hidden");
}

function mostrarCriarConta() {
  botoesConta.classList.add("hidden");
  formCriar.classList.remove("hidden");
}

function voltarConta() {
  formLogin.classList.add("hidden");
  formCriar.classList.add("hidden");
  mostrarTexto("Você já tem uma conta?", () => {
    botoesConta.classList.remove("hidden");
  });
}

function fazerLogin() {
  const user = document.getElementById("login-user").value;
  const pass = document.getElementById("login-pass").value;
  if (user === usuarioSalvo && pass === senhaSalva) {
    alert("Login bem-sucedido!");
    location.reload();
  } else {
    alert("Usuário ou senha incorretos.");
  }
  return false;
}

function criarConta() {
  const user = document.getElementById("new-user").value;
  const pass = document.getElementById("new-pass").value;
  if (user === usuarioSalvo) {
    alert("Esse nome de usuário já existe.");
  } else {
    usuarioSalvo = user;
    senhaSalva = pass;
    alert("Conta criada com sucesso!");
    location.reload();
  }
  return false;
}

window.onload = iniciar;
