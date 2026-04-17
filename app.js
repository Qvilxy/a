document.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram.WebApp;

  // Инициализация Telegram WebApp
  tg.ready();
  tg.expand(); 

  const splashScreen = document.getElementById('splash-screen');
  const appContent = document.getElementById('app-content');
  const loadingVideo = document.getElementById('loading-video');

  // Функция скрытия заставки
  function hideSplashScreen() {
    // Если уже скрыто, ничего не делаем
    if (splashScreen.classList.contains('hidden')) return;

    splashScreen.classList.add('hidden');
    appContent.style.display = 'block';
    document.body.style.overflow = 'auto';

    setTimeout(() => {
      splashScreen.style.display = 'none';
      if (loadingVideo) {
        loadingVideo.pause();
        loadingVideo.src = ''; // Очищаем память
      }
    }, 800);
  }

  // --- ЛОГИКА ОЖИДАНИЯ ОКОНЧАНИЯ ВИДЕО ---
  
  // 1. Проверяем, загрузилось ли видео вообще
  loadingVideo.onloadeddata = () => {
    console.log("Видео готово к воспроизведению");
  };

  // 2. Слушаем событие 'ended' (когда видео доиграло до конца)
  loadingVideo.addEventListener('ended', () => {
    console.log("Видео закончилось, показываем интерфейс");
    hideSplashScreen();
  });

  // 3. Защита от зависания: если видео по какой-то причине не запустилось 
  // или файл битый, покажем интерфейс через 10 секунд (fallback)
  setTimeout(() => {
    if (!splashScreen.classList.contains('hidden')) {
      console.warn("Таймаут видео, принудительный показ интерфейса");
      hideSplashScreen();
    }
  }, 10000); // 10 секунд максимального ожидания

});
