const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const cx = 500, cy = 400;
let state = 'start';

const OUTER_WORDS = ["YOU ARE MY WORLD", "I LOVE YOU", "MY ONE AND ONLY", "FOREVER WITH YOU", "YOU MAKE ME HAPPY", "YOU ARE MY SUNSHINE", "ALWAYS IN MY HEART", "MY HEART IS YOURS", "YOU ARE SPECIAL", "LOVE YOU FOREVER", "YOU ARE MY HAPPINESS", "MY SWEETHEART", "YOU COMPLETE ME", "I CHOOSE YOU", "YOU ARE MY EVERYTHING"];
const INNER_WORDS = ["YOU ARE MY", "TRUE LOVE", "MY HAPPINESS", "MY FOREVER", "ALWAYS YOURS", "I LOVE YOU", "MY SWEET LOVE", "MY WORLD"];

function drawStart() {
  ctx.clearRect(0, 0, 1000, 800);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff0c2';
  ctx.font = 'bold 27px Arial';
  ctx.fillText('ARE YOU READY FOR THIS?', cx, cy - 145);
  ctx.fillStyle = '#ff5268';
  ctx.font = '16px Arial';
  ctx.fillText('A little surprise is waiting for you...', cx, cy - 90);

  // YES Button
  ctx.fillStyle = '#d8b968';
  ctx.fillRect(cx - 190, cy - 22, 150, 55);
  ctx.fillStyle = 'black';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('YES', cx - 115, cy + 11);

  // NO Button
  ctx.fillStyle = '#ff5268';
  ctx.fillRect(cx + 40, cy - 22, 150, 55);
  ctx.fillStyle = 'black';
  ctx.fillText('NO', cx + 115, cy + 11);

  ctx.fillStyle = '#888888';
  ctx.font = '11px Arial';
  ctx.fillText('Choose YES or NO', cx, cy + 105);
  ctx.fillStyle = '#777777';
  ctx.font = '9px Arial';
  ctx.fillText('made by shahin', cx, cy + 375);
}

function heartPoint(t, size) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: cx + x * size, y: cy - y * size };
}

function drawOutline(size, color, width) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  for (let i = 0; i <= 400; i++) {
    const p = heartPoint((2 * Math.PI * i) / 400, size);
    i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
}

function insideHeart(x, y, size) {
  x = x / (16 * size);
  y = y / (16 * size);
  const q = x * x + y * y - 1;
  return q * q * q - x * x * y * y * y <= 0;
}

function getPositions(size, sx, sy, exSize) {
  const pos = [];
  for (let y = -13.5 * size; y <= 14.5 * size; y += sy) {
    for (let x = -16.5 * size; x <= 16.5 * size; x += sx) {
      if (insideHeart(x, y, size) && (!exSize || !insideHeart(x, y, exSize))) {
        pos.push({ x: cx + x, y: cy - y });
      }
    }
  }
  return pos;
}

async function runAnimation() {
  document.title = 'I LOVE YOU';
  ctx.clearRect(0, 0, 1000, 800);
  ctx.fillStyle = '#777777';
  ctx.font = '9px Arial';
  ctx.fillText('made by shahin', cx, cy + 375);

  const outerSize = 18, innerSize = 8.7;
  drawOutline(outerSize, '#d8b968', 2);
  drawOutline(innerSize, '#d8b968', 1);

  const outerPos = getPositions(outerSize, 105, 45, innerSize * 1.13);
  const innerPos = getPositions(innerSize, 72, 38, null);

  ctx.font = 'bold 10px Georgia';
  ctx.fillStyle = '#ff5268';
  for (let i = 0; i < outerPos.length; i++) {
    ctx.fillText(OUTER_WORDS[i % OUTER_WORDS.length], outerPos[i].x, outerPos[i].y);
    await new Promise(r => setTimeout(r, 45));
  }

  ctx.font = 'bold 9px Georgia';
  ctx.fillStyle = '#fff0c2';
  for (let i = 0; i < innerPos.length; i++) {
    ctx.fillText(INNER_WORDS[i % INNER_WORDS.length], innerPos[i].x, innerPos[i].y);
    await new Promise(r => setTimeout(r, 55));
  }

  ctx.font = 'bold 22px Georgia';
  ctx.fillText('I LOVE YOU', cx, cy + 12);
}

canvas.addEventListener('click', (e) => {
  if (state !== 'start') return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x >= cx - 190 && x <= cx - 40 && y >= cy - 22 && y <= cy + 33) {
    state = 'running';
    runAnimation();
  } else if (x >= cx + 40 && x <= cx + 190 && y >= cy - 22 && y <= cy + 33) {
    state = 'no';
    ctx.clearRect(0, 0, 1000, 800);
    ctx.fillStyle = '#fff0c2';
    ctx.font = 'bold 22px Arial';
    ctx.fillText('Maybe next time!', cx, cy);
  }
});

drawStart();

