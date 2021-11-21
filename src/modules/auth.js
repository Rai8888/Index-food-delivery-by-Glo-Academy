const auth = () => {
  'use strict';

  const buttonAuth = document.querySelector('.button-auth');
  const buttonCart = document.querySelector('.button-cart');
  const modalAuth = document.querySelector('.modal-auth');
  const closeAuth = document.querySelector('.close-auth');
  const logInForm = document.getElementById('logInForm');
  const inputLogin = document.getElementById('login');
  const inputPassword = document.getElementById('password');
  const userName = document.querySelector('.user-name');
  const buttonOut = document.querySelector('.button-out');

  const toggleModalAuth = () => {
    modalAuth.classList.toggle('is-open');
    inputLogin.removeAttribute('style');
  };

  const login = user => {
    if (user.login.trim() !== '') {
      logInForm.reset();
      userName.textContent = user.login;
      userName.style.display = 'inline';
      buttonOut.style.display = 'block';
      buttonAuth.style.display = 'none';
      buttonCart.style.display = 'flex';
      modalAuth.classList.remove('is-open');
    } else {
      inputLogin.style.cssText = 'border: 2px solid #ff0000';
    }
  };

  const logout = () => {
    userName.textContent = '';
    userName.removeAttribute('style');
    buttonOut.removeAttribute('style');
    buttonAuth.removeAttribute('style');
    buttonCart.removeAttribute('style');
    localStorage.removeItem('user');
  };
  buttonOut.addEventListener('click', logout);

  logInForm.addEventListener('submit', event => {
    event.preventDefault();
    const user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };
    localStorage.setItem('user', JSON.stringify(user));
    login(user);
  });

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  modalAuth.addEventListener('click', event => {
    if (event.target.matches('.is-open')) {
      toggleModalAuth();
    }
  });


  if (localStorage.getItem('user')) {
    login(JSON.parse(localStorage.getItem('user')));
  }
};

export default auth;
