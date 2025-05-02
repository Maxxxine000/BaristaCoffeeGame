// DOM refs
const chooseSection = document.getElementById('choose-bean');
const brewSection   = document.getElementById('brew-settings');
const videoSection  = document.getElementById('video-section');

const beanCards     = document.querySelectorAll('.bean-card');
const beanGrams     = document.getElementById('bean-grams');
const ratioSelect   = document.getElementById('ratio');
const waterMl       = document.getElementById('water-ml');

const backBtn       = document.getElementById('back-btn');
const brewBtn       = document.getElementById('brew-btn');
const brewVideo     = document.getElementById('brew-video');
const anotherBtn    = document.getElementById('another-btn');

const gramIncrease  = document.getElementById('gram-increase');
const gramDecrease  = document.getElementById('gram-decrease');

// 更新水量
function updateWater() {
  const g = Math.max(1, parseFloat(beanGrams.value) || 1);
  beanGrams.value = g;
  waterMl.textContent = Math.round(g * parseFloat(ratioSelect.value));
}

// 第1→第2 步：选择豆卡
beanCards.forEach(card =>
  card.addEventListener('click', () => {
    chooseSection.classList.add('hidden');
    brewSection.classList.remove('hidden');
    brewBtn.disabled = false;
    updateWater();
  })
);

// 返回第1步
backBtn.addEventListener('click', () => {
  brewSection.classList.add('hidden');
  chooseSection.classList.remove('hidden');
});

// 第2→第3 步：开始冲煮
brewBtn.addEventListener('click', () => {
  brewSection.classList.add('hidden');
  videoSection.classList.remove('hidden');

  document.getElementById('video-wrapper')
          .scrollIntoView({ behavior: 'smooth', block: 'center' });

  brewVideo.currentTime = 0;
  brewVideo.play();

  // 视频结束后显示“Get Another Cup”
  brewVideo.onended = () => {
    anotherBtn.classList.remove('hidden');
  };
});

// “Get Another Cup”：回到第1步
anotherBtn.addEventListener('click', () => {
  videoSection.classList.add('hidden');
  chooseSection.classList.remove('hidden');
});

// Weight 控件逻辑
gramIncrease.addEventListener('click', () => {
  beanGrams.value++;
  updateWater();
});
gramDecrease.addEventListener('click', () => {
  beanGrams.value = Math.max(1, beanGrams.value - 1);
  updateWater();
});
beanGrams.addEventListener('input', updateWater);

// Ratio 逻辑
ratioSelect.addEventListener('change', updateWater);

// 初始化
updateWater();
