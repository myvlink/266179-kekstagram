'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var STATUS_SUCCES = 200;
  var TIMEOUT = 10000;
  window.backend = {
    load: function (method, data, loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_SUCCES) {
          loadHandler(xhr.response);
        } else {
          errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT;
      if (method === 'GET') {
        xhr.open('GET', URL_LOAD);
        xhr.send();
        return;
      }
      if (method === 'POST') {
        xhr.open('POST', URL_UPLOAD);
        xhr.send(data);
        return;
      }
    }
  };
})();
