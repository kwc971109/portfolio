/* 2026-10-24c 홈 화면
   1) 첫 화면 영상: 자동 재생을 한 번 더 요청하고, 막히면 첫 조작(클릭·키·스크롤) 때 다시 튼다.
   2) 프로젝트 갤러리: 큰 화면은 움짤로 시작하고, 아래 작은 사진을 누르면 큰 화면이 그 사진으로 바뀐다.
      움짤은 화면 근처에 왔을 때만 내려받고, 화면 밖으로 나가면 멈춘다. */
(function () {
  function play(v) {
    if (!v) return;
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  function load(v) {
    if (v && !v.getAttribute('src') && v.dataset.src) v.src = v.dataset.src;
  }

  var hero = document.querySelector('.hero-video video');
  play(hero);
  ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (type) {
    window.addEventListener(type, function () {
      if (hero && hero.paused) play(hero);
    }, { once: true, passive: true });
  });

  var watcher = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var g = en.target, v = g.querySelector('.g-video');
      g.inView = en.isIntersecting;
      if (!v) return;
      if (en.isIntersecting && g.mode === 'video') { load(v); play(v); } else { v.pause(); }
    });
  }, { rootMargin: '200px 0px' }) : null;

  document.querySelectorAll('[data-gallery]').forEach(function (g) {
    var v = g.querySelector('.g-video'), img = g.querySelector('.g-img');
    var thumbs = g.querySelectorAll('.g-thumb');
    g.mode = v ? 'video' : 'img';
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        thumbs.forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); });
        if (t.dataset.type === 'video' && v) {
          g.mode = 'video';
          img.hidden = true;
          v.hidden = false;
          load(v);
          play(v);
        } else {
          g.mode = 'img';
          if (v) { v.pause(); v.hidden = true; }
          img.src = t.dataset.src;
          img.alt = t.getAttribute('aria-label') || '';
          img.hidden = false;
        }
      });
    });
    // 움짤이 없는 갤러리(사진만)는 지켜볼 필요가 없다
    if (!v) return;
    if (watcher) watcher.observe(g); else { load(v); play(v); }
  });
})();
