const menu = () => {
  'use strict';

  const cardsMenu = document.querySelector('.cards-menu');

  const changeTitle = ({
    name,
    kitchen,
    price,
    stars
  }) => {
    const restaurantTitle = document.querySelector('.restaurant-title');
    const restaurantRating = document.querySelector('.rating');
    const restaurantPrice = document.querySelector('.price');
    const restaurantCategory = document.querySelector('.category');

    restaurantTitle.textContent = name;
    restaurantRating.textContent = stars;
    restaurantPrice.innerHTML = `От ${price} &#8381;`;
    restaurantCategory.textContent = kitchen;
  };

  const addToCart = cartItem => {
    const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartArray.some(item => item.id === cartItem.id)) {
      cartArray.map(item => {
        if (item.id === cartItem.id) {
          item.count++;
        }
        return item;
      });
    } else {
      cartArray.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  const renderItems = data => data.forEach(({
    description,
    id,
    image,
    name,
    price
  }) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
      <img src="${image}" alt="${name}" class="card-image" />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <p class="ingredients">${description}</p>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price card-price-bold">${price} &#8381;</strong>
        </div>
      </div>
    `);

    card.querySelector('.button-card-text').addEventListener('click', () => {
      addToCart({
        id,
        name,
        price,
        count: 1,
      });
    });

    cardsMenu.insertAdjacentElement('beforeend', card);
  });

  if (localStorage.getItem('restaurant')) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'));
    changeTitle(restaurant);
    fetch(`https://deliveryfood-js-default-rtdb.firebaseio.com/db/${restaurant.products}`)
      .then(response => response.json())
      .then(data => renderItems(data))
      .catch(error => console.error(error));
  } else {
    window.location.href = 'index.html';
  }
};

export default menu;
