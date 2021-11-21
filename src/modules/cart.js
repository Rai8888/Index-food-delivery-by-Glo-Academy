const cart = () => {
  'use strict';

  const buttonCart = document.getElementById('cart-button');
  const modalCart = document.querySelector('.modal-cart');
  const close = modalCart.querySelector('.close');
  const modalBody = modalCart.querySelector('.modal-body');
  const modalPrice = modalCart.querySelector('.modal-pricetag');
  const buttonSend = modalCart.querySelector('.button-primary');
  const buttonClearCart = document.querySelector('.clear-cart');

  const toggleModal = () => {
    modalCart.classList.toggle('is-open');
  };

  const resetCart = () => {
    modalBody.textContent = '';
    localStorage.removeItem('cart');
    toggleModal();
  };

  const renderCart = data => {
    modalBody.textContent = '';
    data.forEach(({
      name,
      price,
      id,
      count
    }) => {
      const cartElem = document.createElement('div');
      cartElem.className = 'food-row';
      const itemCart = `
        <span class="food-name">${name}</span>
        <strong class="food-price">${price}</strong>
        <div class="food-counter">
          <button class="counter-button counter-dec" data-id=${id}>-</button>
          <span class="counter">${count}</span>
          <button class="counter-button counter-inc" data-id=${id}>+</button>
        </div>
      `;
      cartElem.insertAdjacentHTML('afterbegin', itemCart);
      modalBody.append(cartElem);
    });
    const totalPrice = data.reduce((res, item) => res + (parseFloat(item.price) * item.count), 0);
    modalPrice.innerHTML = totalPrice + ' &#8381;';
  };

  const incrementCount = id => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    cartArray.map(item => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderCart(cartArray);

  };
  const decrementCount = id => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    cartArray.map(item => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }
      return item;
    });
    const cartArrayFiltered = cartArray.filter(elem => elem.count !== 0);
    if (cartArrayFiltered.length) {
      localStorage.setItem('cart', JSON.stringify(cartArrayFiltered));
      renderCart(cartArrayFiltered);
    } else {
      resetCart();
    }
  };

  modalBody.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('counter-inc')) {
      incrementCount(target.dataset.id);
    } else if (target.classList.contains('counter-dec')) {
      decrementCount(target.dataset.id);
    }
  });

  buttonSend.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart');
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: cartArray,
    }).then(response => {
      if (response.ok) {
        resetCart();
      }
    }).catch(error => console.error(error));
  });

  buttonCart.addEventListener('click', () => {
    if (localStorage.getItem('cart')) {
      renderCart(JSON.parse(localStorage.getItem('cart')));
    }
    toggleModal();
  });
  close.addEventListener('click', toggleModal);
  modalCart.addEventListener('click', event => {
    if (event.target.matches('.is-open')) {
      toggleModal();
    }
  });
  buttonClearCart.addEventListener('click', resetCart);
};

export default cart;
