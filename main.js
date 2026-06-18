
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
  { x: 350, y: 250, width: 100, height: 20 }
];

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 移動コマンド
  if (keys["ArrowRight"]) {
    player.x += 5;
    cameraX += 5; // ←スクロール
  }
  if (keys["ArrowLeft"]) {
    player.x -= 5;
    cameraX -= 5;
  }

  // ジャンプコマンド
  if (keys[" "] && player.dy === 0) {
    player.dy = player.jump;
  }

  // 重力設定
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

  // 地面描画（カメラ適用）
  ctx.fillStyle = "green";
  platforms.forEach(p => {
    ctx.fillRect(p.x - cameraX, p.y, p.width, p.height);
  });

  // キャラ描画（カメラ適用）
  ctx.fillStyle = "red";
  ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);

  requestAnimationFrame(update);
}

update();
