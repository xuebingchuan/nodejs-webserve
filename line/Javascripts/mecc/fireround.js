
let radius = 65;
let particleSize = 7;
let particleVelocity = 1;
let particleRandomVelocity = 1.2;
let particleMultiplier = 1;

let radiusSqr = radius * radius;
let canvas = document.getElementById('canvas-fire');
let ctx = canvas.getContext('2d');

(onresize = function () {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
})();

particles = (function () {
  var max = (1 << 16) - 1,
    length = 0,
    nextIndex = 0,
    map = new Uint16Array(max),
    x = new Float32Array(max),
    y = new Float32Array(max),
    vx = new Float32Array(max),
    vy = new Float32Array(max),
    life = new Uint16Array(max),
    startLife = new Uint16Array(max),
    each = function (fn) {
      for (var i = 0; i < length; i++) {
        fn(map[i], i);
      }
    },
    remove = function (i) {
      length = length >= 0 ? length - 1 : 0;
      map[i] = map[length];
    }
  return {
    create: function (conf) {
      x[nextIndex] = conf.x || 0;
      y[nextIndex] = conf.y || 0;
      vx[nextIndex] = conf.vx || 0;
      vy[nextIndex] = conf.vy || 0;
      life[nextIndex] = conf.life || 0;
      startLife[nextIndex] = conf.life;
      map[length] = nextIndex;
      length = length === max ? 0 : length + 1;
      nextIndex = nextIndex === max ? 0 : nextIndex + 1;
    },
    update: function () {
      each(function (i, id) {
        x[i] += vx[i];
        y[i] += vy[i];
        var d = x[i] * x[i] + y[i] * y[i],
          dx = x[i] * (1 + radius / d) / 1000,
          dy = y[i] * (1 + radius / d) / 1000;
        vx[i] += d < radiusSqr ? dx : -dx;
        vy[i] += d < radiusSqr ? dy : -dy;
        if (--life[i] < 0) remove(id);
      });
    },
    draw: function () {
      ctx.fillStyle = '#f73';
      ctx.globalCompositeOperation = 'lighter';
      each(function (i) {
        var f = life[i] / startLife[i];
        ctx.globalAlpha = f;
        ctx.beginPath();
        ctx.arc(x[i], y[i], particleSize * (1 - f), 0, Math.PI * 2);
        ctx.fill();
      })
    }
  }
})();

requestAnimationFrame(loop = function () {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  for (var i = 0; i < particleMultiplier; i++) {
    var a = Math.random() * Math.PI * 2,
      cos = Math.cos(a),
      sin = Math.sin(a);
    particles.create({
      x: cos * radius,
      y: sin * radius,
      vx: -sin * particleVelocity + (Math.random() - 0.5) * 2 * particleRandomVelocity,
      vy: cos * particleVelocity + (Math.random() - 0.5) * 2 * particleRandomVelocity,
      life: 100
    })
  }
  particles.update();
  particles.draw();
  requestAnimationFrame(loop);
});
