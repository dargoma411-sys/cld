document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Мобильное меню
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('#nav');
  const body = document.body;

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen);
      body.classList.toggle('nav-open', isOpen);
      
      // Анимация бургера
      if (isOpen) {
        burger.style.transform = 'rotate(90deg)'; // Пример, можно убрать если не нравится
      } else {
        burger.style.transform = 'none';
      }
    });

    // Закрытие меню при клике на ссылку
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        body.classList.remove('nav-open');
      });
    });
  }

  // 2. Появление элементов при скролле (Reveal Animation)
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0) {
    // Используем IntersectionObserver — это современный стандарт
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Элемент появляется чуть раньше конца экрана
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Опционально: перестать наблюдать после появления для экономии ресурсов
          // obs.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    reveals.forEach(el => {
      observer.observe(el);
    });
    
    // ВАЖНО: Если некоторые элементы уже видны при загрузке (например, Hero секция),
    // мы должны принудительно добавить им класс is-visible сразу, иначе они останутся скрытыми
    setTimeout(() => {
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
           el.classList.add('is-visible');
        }
      });
    }, 100);
  }

  // 3. Прогресс-бар скролла
  const progressBar = document.querySelector('.progress span');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
    });
  }

  // 4. Хедер: изменение стиля при скролле
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  console.log('Amber & Bean JS loaded successfully');
});
