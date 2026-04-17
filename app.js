document.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram.WebApp;

  // Инициализация Telegram WebApp
  tg.ready();
  tg.expand(); // Раскрываем на весь экран

  const splashScreen = document.getElementById('splash-screen');
  const appContent = document.getElementById('app-content');
  const loadingVideo = document.getElementById('loading-video');

  // Функция скрытия заставки и показа основного контента
  function hideSplashScreen() {
    // Добавляем класс для плавного исчезновения
    splashScreen.classList.add('hidden');

    // Показываем основной контент
    appContent.style.display = 'block';

    // Разрешаем прокрутку страницы
    document.body.style.overflow = 'auto';

    // Полностью удаляем splash из DOM после завершения анимации
    setTimeout(() => {
      splashScreen.style.display = 'none';
      // Останавливаем видео, чтобы экономить ресурсы
      if (loadingVideo) {
        loadingVideo.pause();
        loadingVideo.src = ''; // Освобождаем память
      }
    }, 800); // Совпадает с transition в CSS (0.8s)
  }

  // --- ВАРИАНТ 1: Простой таймер на 5 секунд ---
  setTimeout(() => {
    hideSplashScreen();
  }, 5000);

  // --- ВАРИАНТ 2 (рекомендуется): Таймер + проверка загрузки данных ---
  /*
  let isDataLoaded = false;
  let isTimePassed = false;

  function checkReady() {
    if (isDataLoaded && isTimePassed) {
      hideSplashScreen();
    }
  }

  // Пример: имитация загрузки данных с сервера
  fetch('/api/get-initial-data')
    .then(response => response.json())
    .then(data => {
      console.log('Данные загружены:', data);
      // Здесь можно обработать данные (например, отрендерить список)
      isDataLoaded = true;
      checkReady();
    })
    .catch(error => {
      console.error('Ошибка загрузки данных:', error);
      // Даже если ошибка — показываем приложение
      isDataLoaded = true;
      checkReady();
    });

  // Таймер на 5 секунд
  setTimeout(() => {
    isTimePassed = true;
    checkReady();
  }, 5000);
  */
});
