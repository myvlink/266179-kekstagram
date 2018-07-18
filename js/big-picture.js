'use strict';

(function () {


  // Отображение окна картинки
  var bigPicture = document.querySelector('.big-picture');
  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
  };
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
  };
  var closeButtonBigPicture = document.querySelector('.big-picture__cancel');
  var galery = document.querySelector('.pictures');

  window.bigPicture = {
    openBigPictureHandler: function () {
      var userImages = document.querySelectorAll('.picture__img');
      galery.addEventListener('click', function (evt) {
        var target = evt.target;
        for (var i = 0; i < userImages.length; i++) {
          if (userImages[i] === target) {
            openBigPicture();
            closeButtonBigPicture.addEventListener('click', closeBigPicture);
          }
        }
      });
    },
    // Заполнение большой картинки
    renderBigPicture: function (picture) {
      document.querySelector('.big-picture__img img').src = picture[0].url;
      document.querySelector('.likes-count').textContent = picture[0].likes;
      document.querySelector('.comments-count').textContent = picture[0].comments.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < picture[0].comments.length; i++) {
        var comment = document.createElement('li');
        var avatar = document.createElement('img');
        var text = document.createElement('p');
        comment.classList.add('social__comment', 'social__comment--text');
        avatar.classList.add('social__picture');
        avatar.src = 'img/avatar-' + window.utils.generateInteger(1, 6) + '.svg';
        avatar.alt = 'Аватар комментатора фотографии';
        avatar.width = '35';
        avatar.height = '35';
        text.classList.add('social__text');
        text.textContent = picture[0].comments[i];
        comment.appendChild(avatar);
        comment.appendChild(text);
        fragment.appendChild(comment);
        document.querySelector('.social__caption').textContent = picture.description;
      }
      document.querySelector('.social__comments').appendChild(fragment);
    }
  };

  window.bigPicture.openBigPictureHandler();
  window.utils.visuallyHideElement('.social__comment-count');
  window.utils.visuallyHideElement('.social__loadmore');
})();
