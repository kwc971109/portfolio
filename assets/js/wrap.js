/* 2026-10-21c 자연스러운 줄바꿈 보정
   쉼표 마디(.cl)가 한 줄보다 길면 마디 안에서 줄이 바뀌고, "섬에서,"처럼 짧은 꼬리만 한 줄에 남는다.
   그런 마디가 하나라도 있는 문장(같은 부모 안의 마디들)은 묶음을 모두 풀어(.cl-flow) 보통 글처럼 이어 흐르게 한다.
   글꼴이 늦게 오거나 화면 너비가 바뀌면 다시 잰다. */
(function () {
  function fit() {
    var cls = document.querySelectorAll('.cl');
    var groups = [];
    var i, j, el, cs, lineH, kids;
    for (i = 0; i < cls.length; i++) cls[i].classList.remove('cl-flow');
    for (i = 0; i < cls.length; i++) {
      el = cls[i];
      cs = getComputedStyle(el);
      lineH = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.6;
      if (el.getBoundingClientRect().height > lineH * 1.5 && groups.indexOf(el.parentNode) < 0) groups.push(el.parentNode);
    }
    for (i = 0; i < groups.length; i++) {
      kids = groups[i].children;
      for (j = 0; j < kids.length; j++) if (kids[j].classList.contains('cl')) kids[j].classList.add('cl-flow');
    }
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
