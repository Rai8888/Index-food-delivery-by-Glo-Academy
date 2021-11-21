import Swiper, {
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper';

Swiper.use([Autoplay, Navigation, Pagination]);

const slider = () => {
  new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

export default slider;
