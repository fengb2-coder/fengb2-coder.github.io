// Thumbnail clips (Barron style). With a mouse, a clip plays while its row is
// hovered. On touch screens (no hover), a clip plays while its thumbnail is on
// screen. The still image stays for visitors who prefer reduced motion, and
// whenever the browser refuses to play (e.g. iOS Low Power Mode).
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var canHover = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  function start(box, v) {
    var p = v.play();
    if (p && p.then) p.then(function () { box.classList.add('playing'); }).catch(function () {});
    else box.classList.add('playing');
  }
  function stop(box, v, rewind) {
    box.classList.remove('playing');
    v.pause();
    if (rewind) v.currentTime = 0;
  }

  var boxes = [];
  document.querySelectorAll('.thumb').forEach(function (box) {
    var v = box.querySelector('video');
    if (v) boxes.push({ box: box, v: v });
  });

  if (canHover) {
    boxes.forEach(function (t) {
      var row = t.box.closest('.row') || t.box;
      row.addEventListener('mouseenter', function () { start(t.box, t.v); });
      row.addEventListener('mouseleave', function () { stop(t.box, t.v, true); });
    });
    return;
  }

  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target.querySelector('video');
      if (e.isIntersecting) start(e.target, v);
      else stop(e.target, v, false);
    });
  }, { threshold: 0.6 });
  boxes.forEach(function (t) { io.observe(t.box); });
})();
