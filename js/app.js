// const para criar uma estancia do bootstrap e abrir o modal passando o nome do id do modal
const myModal = new bootstrap.Modal("#registerModal");

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// logar no sistema
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-login-input").value;
  const password = document.getElementById("password-login-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccount(email);

  if (!account) {
    alert("Ops.. Verifique o usuario ou a senha");
    return;
  }

  if (account) {
    if (account.password !== password) {
      alert("Ops.. verifique o usuario ou senha");
      return;
    }

    saveSession(email, checkSession);
    window.location.href = "home.html";
  }
});

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);
    window.location.href = "home.html";
  }
}

// criar conta
document.getElementById("create-form").addEventListener("submit", function (e) {
  // previne o comportamento padrao do browser
  e.preventDefault();

  // const para capturar o elemento no html pelo id
  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  // condição para verificar se o campo de email
  if (email.lenght < 5) {
    alert("Preencha o campo com um e-mail válido.");
    return;
  }

  // condição para verificar se o campo de password
  if (password.lenght < 4) {
    alert("Preencha a senha com no mínimo 4 digitos.");
    return;
  }

  // chamando a função e passando os dados capturados do email e password e um array vazio de transactions
  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  // fechar modal apos submit
  myModal.hide();

  alert("Conta criada com sucesso.");
});

// função para cadastrar um registro no localstorage
function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
