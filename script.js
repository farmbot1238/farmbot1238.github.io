// ======================== UTILITY FUNCTIONS ========================
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function copyEmail() {
  const email = "madrekjo@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    alert(`تم نسخ البريد: ${email}`);
  });
}

function openLink(url) {
  window.open(url, '_blank');
}

function toggleFaq(element) {
  element.classList.toggle('open');
}

// ======================== YEAR SELECTION ========================
function selectYear(year) {
  if (year === '2009') {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('page2009').classList.add('active');
    updateCountdown();
  } else if (year === '2010') {
    document.getElementById('constructionModal').classList.add('show');
  }
}

function goHome() {
  document.getElementById('landing').style.display = 'flex';
  document.getElementById('page2009').classList.remove('active');
}

function closeModal(event) {
  if (event && event.target.id !== 'constructionModal') return;
  document.getElementById('constructionModal').classList.remove('show');
  document.getElementById('visionModal').classList.remove('show');
  document.getElementById('teamModal').classList.remove('show');
}

function showVisionModal() {
  document.getElementById('visionModal').classList.add('show');
}

function showTeamModal() {
  document.getElementById('teamModal').classList.add('show');
}

// ======================== SIDEBAR & NAVIGATION ========================
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

function openSubject(subject) {
  alert(`تم فتح: ${subject}`);
  toggleSidebar();
}

// ======================== COUNTDOWN TIMER ========================
function updateCountdown() {
  const targetDate = new Date(CONFIG.COUNTDOWN_TARGET).getTime();
  
  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
      document.querySelectorAll('.countdown-number').forEach(el => el.textContent = '00');
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const numbers = document.querySelectorAll('.countdown-number');
    if (numbers[0]) numbers[0].textContent = String(days).padStart(2, '0');
    if (numbers[1]) numbers[1].textContent = String(hours).padStart(2, '0');
    if (numbers[2]) numbers[2].textContent = String(minutes).padStart(2, '0');
    if (numbers[3]) numbers[3].textContent = String(seconds).padStart(2, '0');
  };
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

// ======================== FULLSCREEN VIEWER ========================
function openFullViewer(url, title) {
  const viewer = document.getElementById('fullViewer');
  const iframe = document.getElementById('mainIframe');
  const errorDiv = document.getElementById('iframeError');
  const spinner = document.getElementById('viewerSpinner');
  
  document.getElementById('viewerTitle').textContent = title || 'جارٍ التحميل...';
  viewer.style.display = 'flex';
  iframe.style.opacity = '0';
  spinner.style.display = 'block';
  errorDiv.style.display = 'none';
  
  iframe.onload = () => {
    spinner.style.display = 'none';
    iframe.style.opacity = '1';
  };
  
  iframe.onerror = () => {
    spinner.style.display = 'none';
    errorDiv.style.display = 'flex';
  };
  
  iframe.src = url;
}

function closeFullViewer() {
  document.getElementById('fullViewer').style.display = 'none';
  document.getElementById('mainIframe').src = '';
}

// ======================== INITIALIZE STARS BACKGROUND ========================
function initStars() {
  const container = document.getElementById('starsContainer');
  const starCount = Math.floor(window.innerWidth / 30);
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = (Math.random() * 2 + 0.5) + 'px';
    star.style.height = star.style.width;
    star.style.setProperty('--d', (Math.random() * 3 + 2) + 's');
    star.style.setProperty('--delay', (Math.random() * 3) + 's');
    container.appendChild(star);
  }
}

// ======================== INIT ON PAGE LOAD ========================
document.addEventListener('DOMContentLoaded', () => {
  initStars();
});

// ======================== CLOSE MODALS ON ESC ========================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    document.getElementById('visionModal').classList.remove('show');
    document.getElementById('teamModal').classList.remove('show');
  }
});

// ======================== SMOOTH SCROLL FOR ANCHOR LINKS ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      scrollToSection(href.slice(1));
    }
  });
});