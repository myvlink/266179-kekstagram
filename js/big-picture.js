'use strict';

(function () {
  // Заполнение большой картинки
  var renderBigPicture = function (picture) {
    document.querySelector('.big-picture__img img').src = picture.url;
    document.querySelector('.likes-count').textContent = picture.likes;
    document.querySelector('.comments-count').textContent = picture.comments.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picture.comments.length; i++) {
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
      text.textContent = picture.comments[i];
      comment.appendChild(avatar);
      comment.appendChild(text);
      fragment.appendChild(comment);
      document.querySelector('.social__caption').textContent = picture.description;
    }
    document.querySelector('.social__comments').appendChild(fragment);
  };

  renderBigPicture(window.data.photoParameters[1]);

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
  var openBigPictureHandler = function () {
    var userImages = document.querySelectorAll('.picture__img');
    galery.addEventListener('click', function (evt) {
      var target = evt.target;
      for (var img = 0; img < userImages.length; img++) {
        if (userImages[img] === target) {
          openBigPicture();
          closeButtonBigPicture.addEventListener('click', closeBigPicture);
        }
      }
    });
  };
  openBigPictureHandler();

  window.utils.hideElement('.social__comment-count');
  window.utils.hideElement('.social__loadmore');
})();
