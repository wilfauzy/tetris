// snake.js

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Ukuran grid dan canvas
const gridSize = 20;
let canvasSize = { width: 400, height: 400 };
resizeCanvas();

// Variabel game
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

// Musik
const music = new Audio('snake-music.mp3'); // Ganti dengan path file musik kamu
music.loop = true;
let isMusicPlaying = false;

// Fungsi toggle musik
function toggleMusic() {
  if (isMusicPlaying) {
    music.pause();
    document.getElementById('toggle-music').innerText = '🎵 Play Music';
  } else {
    music.play().catch((error) => {
      console.error('Error playing music:', error);
    });
    document.getElementById('toggle-music').innerText = '🎵 Pause Music';
  }
  isMusicPlaying = !isMusicPlaying;
}

document.getElementById('toggle-music').addEventListener('click', toggleMusic);

// Fungsi untuk mengatur ukuran canvas secara dinamis
function resizeCanvas() {
  const scale = window.innerWidth > 768 ? 20 : 15; // Skala lebih kecil untuk layar kecil
  canvasSize.width = Math.floor((window.innerWidth * 0.9) / scale) * scale;
  canvasSize.height = Math.floor((window.innerHeight * 0.7) / scale) * scale;
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Fungsi utama game
function gameLoop() {
  update();
  draw();
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Cek tabrakan dengan dinding atau tubuh sendiri
  if (
    head.x < 0 || head.x >= canvasSize.width / gridSize ||
    head.y < 0 || head.y >= canvasSize.height / gridSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    resetGame();
    return;
  }

  snake.unshift(head);

  // Cek makan makanan
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar snake
  context.fillStyle = 'lime';
  snake.forEach(segment => {
    context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Gambar makanan
  context.fillStyle = 'red';
  context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Gambar skor
  context.fillStyle = '#fff';
  context.font = '20px Arial';
  context.fillText(`Score: ${score}`, 10, 20);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize.width / gridSize)),
    y: Math.floor(Math.random() * (canvasSize.height / gridSize)),
  };

  // Pastikan makanan tidak muncul di tubuh snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  placeFood();
}

// Kontrol keyboard
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
  if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
  if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
  if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
});

// Kontrol layar sentuh
let startX, startY;

canvas.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

canvas.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  const endX = touch.clientX;
  const endY = touch.clientY;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 50 && direction.x === 0) direction = { x: 1, y: 0 }; // Swipe kanan
    else if (deltaX < -50 && direction.x === 0) direction = { x: -1, y: 0 }; // Swipe kiri
  } else {
    if (deltaY > 50 && direction.y === 0) direction = { x: 0, y: 1 }; // Swipe bawah
    else if (deltaY < -50 && direction.y === 0) direction = { x: 0, y: -1 }; // Swipe atas
  }
});

// Mulai game
placeFood();
setInterval(gameLoop, 150); // Kecepatan game

// Otomatis mainkan musik saat game dimulai
music.play().catch((error) => {
  console.error('Error playing music:', error);
});
isMusicPlaying = true;
document.getElementById('toggle-music').innerText = '🎵 Pause Music';
