/* 2026-10-21c 자연스러운 줄바꿈 보정
   쉼표 마디(.cl)가 한 줄보다 길면 마디 안에서 줄이 바뀌고, "섬에서,"처럼 짧은 꼬리만 한 줄에 남는다.
   그런 마디만 묶음을 풀어(.cl-flow) 앞뒤 글과 이어 흐르게 한다. 글꼴이 늦게 오거나 화면 너비가 바뀌면 다시 잰다. */
(function () {
  function fit() {
    var cls = document.querySelectorAll('.cl');
    var long = [];
    var i, el, cs, lineH;
    for (i = 0; i < cls.length; i++) cls[i].classList.remove('cl-flow');
    for (i = 0; i < cls.length; i++) {
      el = cls[i];
      cs = getComputedStyle(el);
      lineH = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.6;
      if (el.getBoundingClientRect().height > lineH * 1.5) long.push(el);
    }
    for (i = 0; i < long.length; i++) long[i].classList.add('cl-flow');
  }

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(fit, 120);
  });
  window.addEventListener('load', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();
})();
