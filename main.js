const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// キャラ
let player = {
  x: 100,
  y: 50,
  width: 50,
  height: 50,
  dy: 0,
  gravity: 0.5,
  jump: -10
};

// カメラ 
let cameraX = 0;

// キー入力
let keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// 足場
let platforms = [
  { x: 0, y: 350, width: 4000, height: 50 },
  { x: 200, y: 280, width: 100, height: 20 },
  { x: 350, y: 250, width: 100, height: 20 },
  { x: 600, y: 200, width: 150, height: 20 }
];

// 敵
let enemies = [
  { x: 700, y: 310, width: 40, height: 40, dx: 2 }
];

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 移動
  if (keys["ArrowRight"]) {
    player.x += 5;
    cameraX += 5;
  }
  if (keys["ArrowLeft"]) {
    player.x -= 5;
    cameraX -= 5;
  }

  // ジャンプ
  if (keys[" "] && player.dy === 0) {
    player.dy = player.jump;
  }

  // 重力
  player.dy += player.gravity;
  player.y += player.dy;

  // 足場判定
  platforms.forEach(p => {
    if (
      player.x < p.x + p.width &&
      player.x + player.width > p.x &&
      player.y < p.y + p.height &&
      player.y + player.height > p.y
    ) {
      if (player.dy > 0) {
        player.y = p.y - player.height;
        player.dy = 0;
      }
    }
  });

  // 地面
  if (player.y > 300) {
    player.y = 300;
    player.dy = 0;
  }

  //敵の動き
  enemies.forEach(e => {
    e.x += e.dx;

    if (e.x < 400 || e.x > 700) {
      e.dx *= -1;
    }
  });

  //敵との当たり判定
  enemies.forEach((e, index) => {
    if (
      player.x < e.x + e.width &&
      player.x + player.width > e.x &&
      player.y < e.y + e.height &&
      player.y + player.height > e.y
    ) {
      alert("残念ッッッッッッ！！");
      location.reload();
    }
  });

  // 地面描画
  ctx.fillStyle = "green";
  platforms.forEach(p => {
    ctx.fillRect(p.x - cameraX, p.y, p.width, p.height);
  });

  // 敵描画
  ctx.fillStyle = "black";
  enemies.forEach(e => {
    ctx.fillRect(e.x - cameraX, e.y, e.width, e.height);
  });

  // キャラ描画
  ctx.fillStyle = "red";
  ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);

  requestAnimationFrame(update);
}

update();

