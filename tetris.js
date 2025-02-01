// tetris.js

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

// Musik
const music = new Audio('tetris-music.mp3'); // Ganti dengan path file musik kamu
music.loop = true; // Musik bakal terus diulang
let isMusicPlaying = false;

// Fungsi buat toggle musik
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
  const rows = 20;
  const cols = 12;

  canvas.width = cols * scale;
  canvas.height = rows * scale;
  context.scale(scale, scale);
}

resizeCanvas(); // Panggil saat halaman dimuat
window.addEventListener('resize', resizeCanvas); // Sesuaikan saat layar di-resize

// Fungsi-fungsi utama Tetris
function arenaSweep() { /* ... */ }
function collide(arena, player) { /* ... */ }
function createMatrix(w, h) { /* ... */ }
function createPiece(type) { /* ... */ }
function draw() { /* ... */ }
function drawMatrix(matrix, offset) { /* ... */ }
function merge(arena, player) { /* ... */ }
function rotate(matrix, dir) { /* ... */ }
function playerDrop() { /* ... */ }
function playerMove(dir) { /* ... */ }
function playerReset() { /* ... */ }
function playerRotate(dir) { /* ... */ }
function update(time = 0) { /* ... */ }
function updateScore() { /* ... */ }

const colors = [
  null,
  '#FF0D72',
  '#0DC2FF',
  '#0DFF72',
  '#F538FF',
  '#FF8E0D',
  '#FFE138',
  '#3877FF',
];

const arena = createMatrix(12, 20);

const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
  score: 0,
};

// Event Listener untuk Tombol Virtual
document.getElementById('left').addEventListener('click', () => playerMove(-1));
document.getElementById('right').addEventListener('click', () => playerMove(1));
document.getElementById('down').addEventListener('click', () => playerDrop());
document.getElementById('rotate-left').addEventListener('click', () => playerRotate(-1));
document.getElementById('rotate-right').addEventListener('click', () => playerRotate(1));

// Event Listener untuk Touchscreen
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

  // Swipe ke kiri
  if (deltaX < -50) playerMove(-1);
  // Swipe ke kanan
  else if (deltaX > 50) playerMove(1);
  // Swipe ke bawah
  else if (deltaY > 50) playerDrop();
  // Tap dua kali untuk rotasi
  else if (Math.abs(deltaX) < 50 && Math.abs(deltaY) < 50) playerRotate(1);
});

playerReset();
updateScore();
update();

// Otomatis mainkan musik saat game dimulai
music.play().catch((error) => {
  console.error('Error playing music:', error);
});
isMusicPlaying = true;
document.getElementById('toggle-music').innerText = '🎵 Pause Music';
