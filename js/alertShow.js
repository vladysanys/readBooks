let alertShow = false;

setInterval(() => {
  document.title = alertShow ? "Читай книги!" : "Заходи почаще!";
  alertShow = !alertShow
}, 1500);
