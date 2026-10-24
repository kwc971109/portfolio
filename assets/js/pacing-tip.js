/* 2026-10-25 긴장 그래프 설명 상자
   구간에 마우스를 올리면(휴대폰은 누르면) 시간·등급·장면 설명을 바로 띄운다.
   브라우저 기본 설명(<title>)은 1초쯤 늦게 떠서, 그 글을 옮겨 담아 바로 뜨는 상자로 보여 준다. */
(function () {
  var svg = document.querySelector('.pacing-svg');
  if (!svg) return;

  var tip = document.createElement('div');
  tip.className = 'pacing-tip';
  tip.hidden = true;
  document.body.appendChild(tip);

  svg.querySelectorAll('.hit').forEach(function (r) {
    var t = r.querySelector('title');
    if (!t) return;
    r.dataset.tip = t.textContent;
    r.setAttribute('aria-label', t.textContent);
    t.remove();
  });

  var cur = null;
  function hide() {
    tip.hidden = true;
    if (cur) cur.classList.remove('on');
    cur = null;
  }
  function show(r, x, y) {
    if (cur !== r) {
      if (cur) cur.classList.remove('on');
      cur = r;
      r.classList.add('on');
      tip.textContent = r.dataset.tip;
    }
    tip.hidden = false;
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var left = Math.min(x + 14, window.innerWidth - w - 8);
    var top = y - h - 12 < 8 ? y + 18 : y - h - 12;
    tip.style.left = Math.max(8, left) + 'px';
    tip.style.top = top + 'px';
  }

  svg.addEventListener('pointermove', function (e) {
    var r = e.target.closest ? e.target.closest('.hit') : null;
    if (r && r.dataset.tip) show(r, e.clientX, e.clientY); else hide();
  });
  svg.addEventListener('pointerdown', function (e) {
    var r = e.target.closest ? e.target.closest('.hit') : null;
    if (r && r.dataset.tip) show(r, e.clientX, e.clientY);
  });
  svg.addEventListener('pointerleave', function (e) {
    if (e.pointerType === 'mouse') hide();
  });
  document.addEventListener('pointerdown', function (e) {
    if (!svg.contains(e.target)) hide();
  });
  window.addEventListener('scroll', hide, { passive: true });
  var box = svg.closest('.chart-scroll');
  if (box) box.addEventListener('scroll', hide, { passive: true });
})();
