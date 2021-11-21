const partners = () => {
  'use strict';

  const cardsRestaurants = document.querySelector('.cards-restaurants');

  const renderItems = data => data.forEach(item => {
    const {
      image,
      kitchen,
      name,
      price,
      products,
      stars,
      time_of_delivery: timeOfDelivery
    } = item;
    const a = document.createElement('a');
    a.setAttribute('href', 'restaurant.html');
    a.classList.add('card', 'card-restaurant');
    a.dataset.products = products;
    a.insertAdjacentHTML('beforeend', `
      <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <span class="card-tag tag">${timeOfDelivery} мин</span>
          </div>
          <div class="card-info">
            <div class="rating">${stars}</div>
            <div class="price">От ${price} &#8381;</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
    `);
    a.addEventListener('click', event => {
      event.preventDefault();
      if (localStorage.getItem('user')) {
        localStorage.setItem('restaurant', JSON.stringify(item));
        window.location.href = 'restaurant.html';
      } else {
        document.querySelector('.modal-auth').classList.add('is-open');
      }
    });
    cardsRestaurants.append(a);
  });

  fetch('https://deliveryfood-js-default-rtdb.firebaseio.com/db/partners.json')
    .then(response => response.json())
    .then(data => renderItems(data))
    .catch(error => console.error(error));
};

export default partners;
