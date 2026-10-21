// Hover-to-play thumbnails (Barron style). The still image stays visible by
// default, on touch screens, and for visitors who prefer reduced motion.
(function () {
  var canHover = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reduce) return;
  document.querySelectorAll('.thumb').forEach(function (box) {
    var v = box.querySelector('video');
    if (!v) return;
    var row = box.closest('.row') || box;
    row.addEventListener('mouseenter', function () {
      var p = v.play();
      if (p && p.then) p.then(function () { box.classList.add('playing'); }).catch(function () {});
      else box.classList.add('playing');
    });
    row.addEventListener('mouseleave', function () {
      box.classList.remove('playing');
      v.pause();
      v.currentTime = 0;
    });
  });
})();
