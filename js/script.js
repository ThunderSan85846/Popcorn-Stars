let isLoggedIn = false;
let currentUser = { username: "", password: "" };

window.onload = async () => {
    alert("Olá, bem-vindo ao Popcorn Stars!");

    const tutorial = await showChoiceDialog("Deseja jogar o tutorial?");
    if (tutorial) {
        alert("Iniciando o tutorial...");
    } else {
        alert("Pulando o tutorial. Indo direto para o jogo!");
    }

    const temConta = await showChoiceDialog("Você já tem uma conta?");
    if (temConta) {
        while (!isLoggedIn) {
            await login();
        }
    } else {
        await createAccount();
    }

    if (isLoggedIn) {
        alert("Obrigado por jogar Popcorn Stars!");
    }
};

async function login() {
    const { username, password } = await showLoginModal("Login");

    if (verifyLogin(username, password)) {
        currentUser = { username, password };
        isLoggedIn = true;
        alert("Login bem-sucedido!");
    } else {
        alert("Usuário ou senha incorretos.");
    }
}

async function createAccount() {
    const { username, password } = await showLoginModal("Criar Conta");

    if (createUser(username, password)) {
        currentUser = { username, password };
        isLoggedIn = true;
        alert("Conta criada com sucesso!");
    } else {
        alert("Erro: nome de usuário já existe.");
    }
}

function verifyLogin(username, password) {
    return username === "usuario" && password === "senha";
}

function createUser(username, password) {
    return !(username === "usuario" && password === "senha");
}

function showChoiceDialog(question) {
    return new Promise((resolve) => {
        const container = document.getElementById("modal-container");
        container.innerHTML = `
            <div class="modal">
                <h2>${question}</h2>
                <button id="yesBtn">Sim</button>
                <button id="noBtn">Não</button>
            </div>
        `;
        container.classList.remove("hidden");

        document.getElementById("yesBtn").onclick = () => {
            container.classList.add("hidden");
            resolve(true);
        };
        document.getElementById("noBtn").onclick = () => {
            container.classList.add("hidden");
            resolve(false);
        };
    });
}

function showLoginModal(title) {
    return new Promise((resolve) => {
        const container = document.getElementById("modal-container");
        container.innerHTML = `
            <div class="modal">
                <h2>${title}</h2>
                <input id="username" type="text" placeholder="Usuário" />
                <input id="password" type="password" placeholder="Senha" />
                <button id="submitBtn">OK</button>
                <button id="cancelBtn">Cancelar</button>
            </div>
        `;
        container.classList.remove("hidden");

        document.getElementById("submitBtn").onclick = () => {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            container.classList.add("hidden");
            resolve({ username, password });
        };

        document.getElementById("cancelBtn").onclick = () => {
            container.classList.add("hidden");
            resolve({ username: "", password: "" });
        };
    });
}
