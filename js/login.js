const login = async () => {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;

  const users = localStorage.getItem('users');

  let user = null;

  if (users) {
    user = JSON.parse(users).find(
      (user) => user.email === email && user.password === password
    );
  }

  if (user) {
    localStorage.setItem('loggedUser', email);

    loggedUser = email;

    window.location = 'index.html';
  } else {
    await swal.fire({ text: 'Usted no esta registrado.', icon: 'error' });
    window.location = 'register.html';
  }
};

if (getLoggedUser()) {
  window.location = 'index.html';
}

const submitLogin = document.querySelector('.submit-input');

submitLogin.addEventListener('click', login);
