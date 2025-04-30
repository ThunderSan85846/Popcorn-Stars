let users = {};

function startTutorial() {
  alert("Iniciando o tutorial...");
    showScreen("account");
    }

    function skipTutorial() {
      alert("Pulando o tutorial. Indo direto para o jogo!");
        showScreen("account");
        }

        function showScreen(screen) {
          document.querySelectorAll(".modal").forEach(div => div.classList.add("hidden"));
            if (screen === "start") {
                document.getElementById("game-screen").style.display = "block";
                  } else {
                      document.getElementById("game-screen").style.display = "none";
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