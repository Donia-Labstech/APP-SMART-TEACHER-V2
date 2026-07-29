
// ============================================================
// STATE
// ============================================================
let gradeData = [];
let currentClass = '';
let currentSubject = 'رياضيات';
let chatHistory = [];
let apiKey = localStorage.getItem('donia_api_key') || '';
let distChart = null;
let portfolioChart = null;
let attState = {};

const LOGO_DATA_URI = "data:image/jpeg;base64,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";

// Set all logo images
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[id$="-logo-img"],[id="splash-logo-img"]').forEach(img => img.src = LOGO_DATA_URI);
});

// ============================================================
// LIGHT / DARK THEME
// ============================================================
function setTheme(mode) {
  document.body.classList.toggle('theme-light', mode === 'light');
  localStorage.setItem('donia_theme', mode);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = mode === 'light' ? '☀️' : '🌙';
  const tog = document.getElementById('tog-theme');
  if (tog) tog.checked = mode === 'light';
}
function toggleTheme() {
  setTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light');
}
// يُطبَّق فورًا عند تحميل الصفحة (حتى قبل تسجيل الدخول) حسب آخر اختيار محفوظ
setTheme(localStorage.getItem('donia_theme') || 'dark');

// ============================================================
// PWA INSTALL PROMPT
// ============================================================
// ملاحظة مهمة: زر "تثبيت التطبيق" يظهر فقط عندما يفتح المتصفح الصفحة عبر
// رابط https حقيقي (أو localhost). فتح الملف مباشرة من القرص (file://) لا
// يُفعّل خاصية التثبيت إطلاقًا — هذا قيد أمني في المتصفح نفسه، وليس خللًا
// في الكود. الزر سيعمل تلقائيًا بمجرد استضافة التطبيق على donialabstech.online.
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('pwa-install-btn');
  if (btn) btn.style.display = 'inline-flex';
});

// تسجيل Service Worker — شرط أساسي لظهور زر تثبيت PWA في Chrome.
// يعمل فقط عند الاستضافة الحقيقية (https)، ويفشل بصمت من file:// بدون أي ضرر.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}
async function triggerPwaInstall() {
  if (!deferredInstallPrompt) return showNotif('ℹ️ التثبيت متاح فقط عند فتح التطبيق عبر رابط الموقع الرسمي (https)', 'warn');
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.getElementById('pwa-install-btn').style.display = 'none';
}
window.addEventListener('appinstalled', () => {
  showNotif('✅ تم تثبيت التطبيق بنجاح');
  const btn = document.getElementById('pwa-install-btn');
  if (btn) btn.style.display = 'none';
});

// ============================================================
// SPLASH + AUTH
// ============================================================
setTimeout(() => {
  document.getElementById('splash').classList.add('out');
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('login-page').classList.add('active');
  }, 600);
}, 2200);

function doLogin() {
  const u = document.getElementById('login-user').value;
  const p = document.getElementById('login-pass').value;
  if (!u || !p) return showNotif('⚠️ أدخل بيانات الدخول', 'warn');
  document.getElementById('login-page').classList.remove('active');
  document.getElementById('app').classList.add('active');
  initApp();
}
function doLogout() {
  document.getElementById('app').classList.remove('active');
  document.getElementById('login-page').classList.add('active');
}

// ============================================================
// INIT
// ============================================================
function initApp() {
  startClock();
  initAttendance();
  initCharts();
  renderSessionsList();
}

function startClock() {
  function tick() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString('ar-DZ', {hour:'2-digit',minute:'2-digit'});
  }
  tick();
  setInterval(tick, 60000);
}

// ============================================================
// NAVIGATION
// ============================================================
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}

const LAB_MAP = {
  svt: { src: 'lab-svt.html', title: '🌿 مخبر علوم الطبيعة والحياة' },
  physics: { src: 'lab-physics.html', title: '⚡ مخبر الفيزياء' }
};
function openLab(which) {
  const lab = LAB_MAP[which];
  if (!lab) return;
  document.getElementById('labs-iframe').src = lab.src;
  document.getElementById('labs-viewer-title').textContent = lab.title;
  document.getElementById('labs-selector').style.display = 'none';
  document.getElementById('labs-viewer').style.display = 'block';
}
function closeLab() {
  document.getElementById('labs-viewer').style.display = 'none';
  document.getElementById('labs-selector').style.display = 'block';
  document.getElementById('labs-iframe').src = '';
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
  const titles = { dashboard:'لوحة التحكم', evaluation:'تقييم الطلاب الذكي', attendance:'الحضور والغياب', portfolio:'الملف المهني الرقمي', ai:'المساعد الذكي AI', labs:'المخبر الافتراضي' };
  document.getElementById('topbar-title').textContent = titles[id] || id;
  document.querySelector('.sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

// ============================================================
// FILE IMPORT (Ministry XLS format)
// ============================================================
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('import-zone').classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
}
function handleFileInput(inp) {
  if (inp.files[0]) processFile(inp.files[0]);
}

function processFile(file) {
  const status = document.getElementById('import-status');
  status.style.display = 'block';
  status.innerHTML = '<div style="display:flex;align-items:center;gap:8px;color:var(--blue)"><div class="spinner"></div> جارٍ تحليل الملف...</div>';

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array', cellDates: true });

      gradeData = [];
      let classInfo = {};

      wb.SheetNames.forEach(sheetName => {
        if (sheetName === 'Worksheet') return;
        const ws = wb.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

        // Parse header info
        const headerRow = rows[4] ? String(rows[4][0]) : '';
        const match = headerRow.match(/الفوج التربوي\s*:\s*([^م]+مادة\s*:)?/);
        const matiereMatch = headerRow.match(/مادة\s*:\s*(.+)/);

        classInfo = {
          annee: headerRow.match(/السنة الدراسية\s*:\s*(\d{4}-\d{4})/)?.[1] || '2025-2026',
          trimestre: headerRow.match(/الفصل\s*(\S+)/)?.[1] || 'الثالث',
          classe: (headerRow.match(/الفوج التربوي\s*:\s*([^مادة]+)/)?.[1] || '').trim().replace(/\s+/g,' '),
          matiere: (matiereMatch?.[1] || '').trim(),
          school: String(rows[3]?.[0] || '').trim(),
          fojCode: sheetName
        };

        // Data rows start at row 8 (index 8)
        for (let i = 8; i < rows.length; i++) {
          const row = rows[i];
          const matricule = String(row[0] || '').trim();
          if (!matricule || matricule.length < 5) continue;

          const nom = String(row[1] || '').trim();
          const prenom = String(row[2] || '').trim();
          const dateN = String(row[3] || '').trim();
          const activites = parseFloat(row[4]) || 0;
          const fardh = parseFloat(row[5]) || 0;
          const ikhtibAr = parseFloat(row[6]) || 0;
          const obs = String(row[7] || '').trim();

          // Calculate weighted average: activites*0.25 + fardh*0.25 + ikhtibAr*0.5
          const moyenne = +(activites * 0.25 + fardh * 0.25 + ikhtibAr * 0.5).toFixed(2);

          gradeData.push({
            matricule, nom, prenom, dateN, activites, fardh, ikhtibAr, obs, moyenne,
            fullName: nom + ' ' + prenom,
            classe: classInfo.classe,
            foj: sheetName
          });
        }
      });

      if (gradeData.length === 0) {
        status.innerHTML = '<span style="color:var(--danger)">❌ لم يتم العثور على بيانات. تأكد من تنسيق الملف.</span>';
        return;
      }

      currentClass = classInfo;
      status.innerHTML = `<span style="color:var(--green)">✅ تم الاستيراد بنجاح — <strong>${gradeData.length}</strong> طالب من <strong>${wb.SheetNames.filter(s=>s!=='Worksheet').length}</strong> فوج</span>`;

      // Show meta card
      document.getElementById('file-meta-card').style.display = 'block';
      document.getElementById('file-meta-content').innerHTML = `
        <div class="info-item"><div class="info-dot"></div>السنة: ${classInfo.annee}</div>
        <div class="info-item"><div class="info-dot"></div>الفصل: ${classInfo.trimestre}</div>
        <div class="info-item"><div class="info-dot" style="background:var(--orange)"></div>المادة: ${classInfo.matiere}</div>
        <div class="info-item"><div class="info-dot" style="background:var(--green)"></div>الفوج: ${classInfo.classe}</div>
        <div class="info-item"><div class="info-dot" style="background:var(--purple)"></div>المؤسسة: ${classInfo.school}</div>
      `;

      renderAllData();
      showNotif('✅ تم استيراد ' + gradeData.length + ' طالب بنجاح');
    } catch (err) {
      status.innerHTML = `<span style="color:var(--danger)">❌ خطأ في قراءة الملف: ${err.message}</span>`;
      console.error(err);
    }
  };
  reader.readAsArrayBuffer(file);
}

// ============================================================
// RENDER ALL DATA
// ============================================================
function renderAllData() {
  updateDashboard();
  renderResultsTab();
  renderCommentsTab();
  renderRankingTab();
  updateAttendanceFromGrades();
  renderDistChart();
}

function getAvg(d) { return d.moyenne; }

function getGradeBadge(avg) {
  if (avg >= 18) return `<span class="grade-badge grade-excellent">ممتاز</span>`;
  if (avg >= 15) return `<span class="grade-badge grade-good">حسن جداً</span>`;
  if (avg >= 10) return `<span class="grade-badge grade-average">مقبول</span>`;
  return `<span class="grade-badge grade-fail">ضعيف</span>`;
}

function getAutoComment(avg, name) {
  if (document.getElementById('tog-autocomment') && !document.getElementById('tog-autocomment').checked) return '';
  if (avg >= 18) return `تحصيل ممتاز. أبدع ${name} في العمل وأثبت كفاءة عالية. نتمنى الاستمرار في هذا المستوى الرفيع.`;
  if (avg >= 15) return `نتيجة حسنة جداً. أجد ${name} على الطريق الصحيح. يُنصح بمزيد من التعمق في حل المسائل المعقدة.`;
  if (avg >= 12) return `نتيجة مرضية. أُشجّع ${name} على تكثيف المراجعة ومراجعة الدروس يومياً لتحسين النتائج.`;
  if (avg >= 10) return `نتيجة دون الوسط. على ${name} بذل مجهود إضافي والاستعانة بزملائه وأساتذته لاستدراك التأخر.`;
  return `نتيجة غير كافية. ${name} في وضع صعب ويحتاج إلى دعم مكثف وتدخل بيداغوجي عاجل. يُرجى التواصل مع الولي.`;
}

function updateDashboard() {
  const total = gradeData.length;
  const avg = total ? (gradeData.reduce((s,d) => s + d.moyenne, 0) / total).toFixed(2) : 0;
  const excellent = gradeData.filter(d => d.moyenne >= 15).length;
  const atRisk = gradeData.filter(d => d.moyenne < 10).length;
  const fojs = new Set(gradeData.map(d => d.foj)).size;

  document.getElementById('stat-students').textContent = total;
  document.getElementById('stat-classes').textContent = fojs + ' فوج';
  document.getElementById('stat-avg').textContent = avg;
  document.getElementById('stat-excellent').textContent = excellent;
  document.getElementById('stat-atrisk').textContent = atRisk;

  // Top students
  const top = [...gradeData].sort((a,b) => b.moyenne - a.moyenne).slice(0,5);
  document.getElementById('top-students-list').innerHTML = top.map((s,i) => `
    <div class="rank-item">
      <div class="rank-num ${i===0?'rank-1':i===1?'rank-2':i===2?'rank-3':'rank-other'}">${i+1}</div>
      <div class="rank-name">${s.fullName}</div>
      <div class="rank-score">${s.moyenne}/20</div>
      ${getGradeBadge(s.moyenne)}
    </div>
  `).join('');

  // At-risk
  const risk = gradeData.filter(d => d.moyenne < 10).sort((a,b) => a.moyenne - b.moyenne).slice(0,8);
  if (risk.length === 0) {
    document.getElementById('at-risk-list').innerHTML = '<div class="empty-state"><div class="empty-icon">✅</div><div class="empty-text">لا يوجد طلاب في خطر</div></div>';
  } else {
    document.getElementById('at-risk-list').innerHTML = `<div style="overflow-x:auto;"><table class="data-table"><thead><tr><th>الاسم</th><th>النشاطات</th><th>الفرض</th><th>الاختبار</th><th>المعدل</th><th>الحالة</th></tr></thead><tbody>` +
      risk.map(s => `<tr>
        <td style="font-weight:600">${s.fullName}</td>
        <td>${s.activites}/20</td><td>${s.fardh}/20</td><td>${s.ikhtibAr}/20</td>
        <td style="font-weight:700;color:var(--danger)">${s.moyenne}/20</td>
        <td>${getGradeBadge(s.moyenne)}</td>
      </tr>`).join('') + '</tbody></table></div>';
  }
}

function renderResultsTab() {
  const byFoj = {};
  gradeData.forEach(s => {
    if (!byFoj[s.foj]) byFoj[s.foj] = [];
    byFoj[s.foj].push(s);
  });

  let html = '';
  Object.entries(byFoj).forEach(([foj, students]) => {
    const avg = (students.reduce((s,d) => s+d.moyenne, 0)/students.length).toFixed(2);
    html += `<div class="card" style="margin-bottom:20px;">
      <div class="card-title"><span class="card-title-icon">🏫</span> الفوج: ${foj} — ${students[0].classe || ''} (${students.length} طالب — المتوسط: ${avg}/20)</div>
      <div style="overflow-x:auto;">
      <table class="data-table">
        <thead><tr><th>#</th><th>اللقب</th><th>الاسم</th><th>النشاطات/20</th><th>الفرض/20</th><th>الاختبار/20</th><th>المعدل/20</th><th>التقدير</th></tr></thead>
        <tbody>` +
      students.sort((a,b) => b.moyenne - a.moyenne).map((s,i) => `<tr>
        <td style="color:var(--text3)">${i+1}</td>
        <td style="font-weight:600">${s.nom}</td>
        <td>${s.prenom}</td>
        <td><div class="progress-bar" style="width:70px"><div class="progress-fill" style="width:${s.activites*5}%;background:var(--blue)"></div></div><span style="font-size:0.8rem">${s.activites}</span></td>
        <td><div class="progress-bar" style="width:70px"><div class="progress-fill" style="width:${s.fardh*5}%;background:var(--orange)"></div></div><span style="font-size:0.8rem">${s.fardh}</span></td>
        <td><div class="progress-bar" style="width:70px"><div class="progress-fill" style="width:${s.ikhtibAr*5}%;background:var(--purple)"></div></div><span style="font-size:0.8rem">${s.ikhtibAr}</span></td>
        <td style="font-weight:800;font-size:1rem;color:${s.moyenne>=15?'var(--green)':s.moyenne>=10?'var(--blue)':'var(--danger)'}">${s.moyenne}</td>
        <td>${getGradeBadge(s.moyenne)}</td>
      </tr>`).join('') + '</tbody></table></div>';
    html += `<div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">
      <button class="btn btn-green" onclick="exportToExcel('${foj}')">📊 تصدير Excel</button>
      <button class="btn btn-blue" onclick="exportGradesPDF('${foj}')">📄 تصدير PDF</button>
      <button class="btn btn-green" onclick="printGrades('${foj}')">🖨️ طباعة</button>
    </div></div>`;
  });
  document.getElementById('results-content').innerHTML = html;
}

function renderCommentsTab() {
  const html = `<div class="card">
    <div class="card-title"><span class="card-title-icon">💬</span> التعليقات الذكية التلقائية</div>
    <div style="overflow-x:auto;"><table class="data-table">
      <thead><tr><th>اسم الطالب</th><th>المعدل</th><th>التقدير</th><th>التعليق المقترح</th></tr></thead>
      <tbody>` +
    gradeData.sort((a,b) => b.moyenne - a.moyenne).map(s => `<tr>
      <td style="font-weight:600;min-width:140px">${s.fullName}</td>
      <td style="font-weight:700;color:${s.moyenne>=15?'var(--green)':s.moyenne>=10?'var(--blue)':'var(--danger)'}">${s.moyenne}/20</td>
      <td>${getGradeBadge(s.moyenne)}</td>
      <td style="font-size:0.82rem;color:var(--text2);min-width:280px;line-height:1.5">${getAutoComment(s.moyenne, s.prenom)}</td>
    </tr>`).join('') +
    '</tbody></table></div></div>';
  document.getElementById('comments-content').innerHTML = html;
}

function renderRankingTab() {
  const sorted = [...gradeData].sort((a,b) => b.moyenne - a.moyenne);
  const html = `<div class="card">
    <div class="card-title"><span class="card-title-icon">🏆</span> الترتيب العام (${sorted.length} طالب)</div>
    <div style="overflow-x:auto;"><table class="data-table">
      <thead><tr><th>الترتيب</th><th>اللقب والاسم</th><th>الفوج</th><th>النشاطات</th><th>الفرض</th><th>الاختبار</th><th>المعدل</th><th>التقدير</th></tr></thead>
      <tbody>` +
    sorted.map((s,i) => `<tr>
      <td><div class="rank-num ${i===0?'rank-1':i===1?'rank-2':i===2?'rank-3':'rank-other'}" style="margin:auto">${i+1}</div></td>
      <td style="font-weight:600">${s.fullName}</td>
      <td><span style="font-size:0.78rem;color:var(--text2)">${s.foj}</span></td>
      <td>${s.activites}/20</td><td>${s.fardh}/20</td><td>${s.ikhtibAr}/20</td>
      <td style="font-weight:800;font-size:1rem;color:${s.moyenne>=15?'var(--green)':s.moyenne>=10?'var(--blue)':'var(--danger)'}">${s.moyenne}/20</td>
      <td>${getGradeBadge(s.moyenne)}</td>
    </tr>`).join('') +
    '</tbody></table></div></div>';
  document.getElementById('ranking-content').innerHTML = html;
}

function renderDistChart() {
  const bins = { 'ممتاز (18-20)': 0, 'حسن جداً (15-17)': 0, 'حسن (12-14)': 0, 'مقبول (10-11)': 0, 'ضعيف (<10)': 0 };
  gradeData.forEach(d => {
    if (d.moyenne >= 18) bins['ممتاز (18-20)']++;
    else if (d.moyenne >= 15) bins['حسن جداً (15-17)']++;
    else if (d.moyenne >= 12) bins['حسن (12-14)']++;
    else if (d.moyenne >= 10) bins['مقبول (10-11)']++;
    else bins['ضعيف (<10)']++;
  });
  const ctx = document.getElementById('dist-chart');
  if (distChart) distChart.destroy();
  distChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(bins),
      datasets: [{ data: Object.values(bins), backgroundColor: ['#00e676','#00b4ff','#a855f7','#ffab00','#ff4757'], borderWidth: 0, hoverOffset: 8 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#8899bb', font: { family: 'Cairo', size: 11 }, padding: 12 } } },
      cutout: '62%'
    }
  });
}

// ============================================================
// EVAL TABS
// ============================================================
function switchEvalTab(id) {
  document.querySelectorAll('.eval-tab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('eval-tab-' + id).style.display = 'block';
  event.currentTarget.classList.add('active');
}

// ============================================================
// EXPORT
// ============================================================
function exportToExcel(fojCode) {
  const students = fojCode ? gradeData.filter(s => s.foj === fojCode) : gradeData;
  const wsData = [['اللقب','الاسم','رقم التعريف','النشاطات/20','الفرض/20','الاختبار/20','المعدل/20','التقدير','التعليق']].concat(
    students.map(s => [s.nom, s.prenom, s.matricule, s.activites, s.fardh, s.ikhtibAr, s.moyenne, s.obs, getAutoComment(s.moyenne, s.prenom)])
  );
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'النتائج');
  XLSX.writeFile(wb, `نتائج_${fojCode || 'كل_الأفواج'}.xlsx`);
  showNotif('✅ تم تصدير ملف Excel');
}

function buildGradesHtml(fojCode) {
  const students = gradeData.filter(s => s.foj === fojCode).sort((a, b) => b.moyenne - a.moyenne);
  if (students.length === 0) return null;
  const schoolName = (currentClass && currentClass.school) || userProfile.school || '';

  const rows = students.map((s, i) => `
    <tr>
      <td style="border:1px solid #ccc;padding:6px;text-align:center;">${i + 1}</td>
      <td style="border:1px solid #ccc;padding:6px;">${s.nom || ''} ${s.prenom || ''}</td>
      <td style="border:1px solid #ccc;padding:6px;text-align:center;">${s.activites ?? '-'}</td>
      <td style="border:1px solid #ccc;padding:6px;text-align:center;">${s.fardh ?? '-'}</td>
      <td style="border:1px solid #ccc;padding:6px;text-align:center;">${s.ikhtibAr ?? '-'}</td>
      <td style="border:1px solid #ccc;padding:6px;text-align:center;font-weight:700;">${s.moyenne ?? '-'}</td>
    </tr>`).join('');

  return `
    <div style="text-align:center;font-size:16px;font-weight:800;margin-bottom:4px;">${schoolName || 'DONIA SMART TEACHER'}</div>
    <div style="text-align:center;color:#555;margin-bottom:18px;">كشف النتائج الفصلي — الفوج: ${fojCode}</div>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#00b4ff;color:#fff;">
          <th style="border:1px solid #ccc;padding:6px;">#</th>
          <th style="border:1px solid #ccc;padding:6px;">الاسم واللقب</th>
          <th style="border:1px solid #ccc;padding:6px;">الأنشطة</th>
          <th style="border:1px solid #ccc;padding:6px;">الفرض</th>
          <th style="border:1px solid #ccc;padding:6px;">الاختبار</th>
          <th style="border:1px solid #ccc;padding:6px;">المعدل</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function printGrades(fojCode) {
  const html = buildGradesHtml(fojCode);
  if (!html) return showNotif('⚠️ لا توجد بيانات لهذا الفوج', 'warn');
  printHtml(html, `نتائج_${fojCode}`);
}

async function exportGradesPDF(fojCode) {
  try {
    const contentHtml = buildGradesHtml(fojCode);
    if (!contentHtml) return showNotif('⚠️ لا توجد بيانات لهذا الفوج', 'warn');
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:1100px;padding:40px 50px;background:#fff;color:#111;font-family:\'Cairo\',\'Tajawal\',Arial,sans-serif;direction:rtl;text-align:right;font-size:13px;';
    wrap.innerHTML = contentHtml;
    await renderHtmlToPdf(wrap, `نتائج_${fojCode}.pdf`, 'l');
    showNotif('✅ تم تصدير PDF');
  } catch (e) {
    console.error('exportGradesPDF error:', e);
    showNotif('⚠️ خطأ في PDF: ' + e.message, 'error');
  }
}

// ============================================================
// ATTENDANCE
// ============================================================
const SESSIONS = [
  {id:1, name:'الحصة 1', time:'08:00 - 09:00'},
  {id:2, name:'الحصة 2', time:'09:00 - 10:00'},
  {id:3, name:'الحصة 3', time:'10:30 - 11:30'},
  {id:4, name:'الحصة 4', time:'11:30 - 12:30'},
  {id:5, name:'الحصة 5', time:'13:00 - 14:00'},
  {id:6, name:'الحصة 6', time:'14:00 - 15:00'},
];

function initAttendance() {
  attState = {};
  const students = gradeData.map(s => s.fullName);
  students.forEach(name => {
    attState[name] = { s1:'', s2:'', s3:'', s4:'', s5:'', s6:'' };
  });
  renderAttTable(students);
}

function updateAttendanceFromGrades() {
  const students = gradeData.map(s => s.fullName);
  students.forEach(name => {
    if (!attState[name]) attState[name] = { s1:'', s2:'', s3:'', s4:'', s5:'', s6:'' };
  });
  renderAttTable(students);
}

function renderAttTable(students) {
  const tbody = document.getElementById('att-tbody');
  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text3);">لا يوجد تلاميذ بعد — استوردي أو أدخلي قائمة التلاميذ من صفحة "تقييم الطلاب" أولًا</td></tr>`;
    return;
  }
  tbody.innerHTML = students.slice(0,30).map((name, i) => `
    <tr>
      <td style="color:var(--text3)">${i+1}</td>
      <td style="font-weight:600">${name}</td>
      ${[1,2,3,4,5,6].map(s => `
        <td>
          <div style="display:flex;gap:4px;">
            <button class="att-btn att-present ${attState[name]?.['s'+s]==='P'?'selected':''}" onclick="setAtt('${name}',${s},'P',this)">✓</button>
            <button class="att-btn att-absent ${attState[name]?.['s'+s]==='A'?'selected':''}" onclick="setAtt('${name}',${s},'A',this)">✗</button>
            <button class="att-btn att-late ${attState[name]?.['s'+s]==='L'?'selected':''}" onclick="setAtt('${name}',${s},'L',this)">⟳</button>
          </div>
        </td>
      `).join('')}
    </tr>
  `).join('');
}

function setAtt(name, session, status, btn) {
  if (!attState[name]) attState[name] = {};
  attState[name]['s' + session] = status;
  const row = btn.closest('tr');
  const cell = btn.closest('td');
  cell.querySelectorAll('.att-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  updateAttCounts();
}

function updateAttCounts() {
  let present = 0, absent = 0, late = 0;
  Object.values(attState).forEach(s => {
    Object.values(s).forEach(v => {
      if (v === 'P') present++;
      if (v === 'A') absent++;
      if (v === 'L') late++;
    });
  });
  document.getElementById('att-count-present').textContent = present;
  document.getElementById('att-count-absent').textContent = absent;
  document.getElementById('att-count-late').textContent = late;
}

function renderSessionsList() {
  const now = new Date();
  const hour = now.getHours();
  let currentIdx = 0;
  if (hour < 9) currentIdx = 0;
  else if (hour < 10) currentIdx = 1;
  else if (hour < 11.5) currentIdx = 2;
  else if (hour < 12.5) currentIdx = 3;
  else if (hour < 14) currentIdx = 4;
  else currentIdx = 5;

  document.getElementById('att-current-session').textContent = SESSIONS[currentIdx].name + ' — ' + SESSIONS[currentIdx].time;
  document.getElementById('sessions-list').innerHTML = SESSIONS.map((s, i) => `
    <div class="att-session ${i===currentIdx?'border-color:var(--blue)':''}">
      <div>
        <div class="att-session-name" style="color:${i===currentIdx?'var(--blue)':'inherit'}">${s.name}</div>
        <div class="att-session-time">${s.time}</div>
      </div>
      ${i===currentIdx ? '<div class="session-live"><div class="live-dot"></div>نشطة</div>' : ''}
    </div>
  `).join('');
}

function exportAttendanceExcel() {
  const names = Object.keys(attState);
  const wsData = [['الاسم','الحصة 1','الحصة 2','الحصة 3','الحصة 4','الحصة 5','الحصة 6']].concat(
    names.map(n => [n, ...['s1','s2','s3','s4','s5','s6'].map(s => attState[n][s] || '-')])
  );
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'الحضور');
  XLSX.writeFile(wb, 'كشف_الحضور.xlsx');
  showNotif('✅ تم تصدير كشف الحضور');
}

function buildAttendanceHtml() {
  const names = Object.keys(attState);
  if (names.length === 0) return null;
  const today = new Date().toLocaleDateString('ar-DZ');
  const className = currentClass || '—';

  const rows = names.map((name, i) => {
    const row = attState[name] || {};
    const cells = ['s1','s2','s3','s4','s5','s6'].map(s => `<td style="border:1px solid #ccc;padding:6px;text-align:center;">${row[s] || '-'}</td>`).join('');
    return `<tr><td style="border:1px solid #ccc;padding:6px;text-align:center;">${i + 1}</td><td style="border:1px solid #ccc;padding:6px;">${name}</td>${cells}</tr>`;
  }).join('');

  return `
    <div style="text-align:center;font-size:16px;font-weight:800;margin-bottom:4px;">كشف الحضور والغياب</div>
    <div style="text-align:center;color:#555;margin-bottom:18px;">القسم: ${className} — التاريخ: ${today}</div>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#00b4ff;color:#fff;">
          <th style="border:1px solid #ccc;padding:6px;">#</th>
          <th style="border:1px solid #ccc;padding:6px;">الاسم واللقب</th>
          <th style="border:1px solid #ccc;padding:6px;">الحصة 1</th>
          <th style="border:1px solid #ccc;padding:6px;">الحصة 2</th>
          <th style="border:1px solid #ccc;padding:6px;">الحصة 3</th>
          <th style="border:1px solid #ccc;padding:6px;">الحصة 4</th>
          <th style="border:1px solid #ccc;padding:6px;">الحصة 5</th>
          <th style="border:1px solid #ccc;padding:6px;">الحصة 6</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function printAttendance() {
  const html = buildAttendanceHtml();
  if (!html) return showNotif('⚠️ لا توجد بيانات حضور بعد', 'warn');
  printHtml(html, 'كشف الحضور والغياب');
}

async function exportAttendancePDF() {
  try {
    const contentHtml = buildAttendanceHtml();
    if (!contentHtml) return showNotif('⚠️ لا توجد بيانات حضور بعد', 'warn');
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:1100px;padding:40px 50px;background:#fff;color:#111;font-family:\'Cairo\',\'Tajawal\',Arial,sans-serif;direction:rtl;text-align:right;font-size:13px;';
    wrap.innerHTML = contentHtml;
    await renderHtmlToPdf(wrap, 'كشف_الحضور.pdf', 'l');
    showNotif('✅ تم طباعة PDF');
  } catch (e) {
    console.error('exportAttendancePDF error:', e);
    showNotif('⚠️ خطأ: ' + e.message, 'error');
  }
}

// ============================================================
// PORTFOLIO
// ============================================================
function initCharts() {
  // لا نبني الرسم البياني هنا بعد الآن — انظري renderCareerStats() التي
  // تبنيه فقط عند توفر بيانات حقيقية، لتفادي عرض أرقام وهمية للمستخدم.
}

// يحسب إحصائيات المسار المهني من بيانات حقيقية فقط:
// - سنوات الخدمة والدورات التدريبية: تُدخلها المعلمة يدويًا في الإعدادات
// - عدد الطلاب والأفواج: محسوبة فعليًا من سجل الدرجات الحالي
// - الرسم البياني: مبني من السنوات الدراسية المؤرشفة فعليًا (بعد فتح أكثر
//   من سنة دراسية)، وإلا يُخفى بدل عرض اتجاه وهمي لخمس سنوات
function renderCareerStats() {
  const yearsEl = document.getElementById('stat-years');
  if (yearsEl) yearsEl.textContent = userProfile.yearsExp || '0';
  const trainEl = document.getElementById('stat-trainings');
  if (trainEl) trainEl.textContent = userProfile.trainings || '0';

  const studentsEl = document.getElementById('stat-students');
  if (studentsEl) studentsEl.textContent = gradeData.length || '0';
  const groupsEl = document.getElementById('stat-groups');
  if (groupsEl) groupsEl.textContent = new Set(gradeData.map(s => s.foj).filter(Boolean)).size || '0';

  // بناء بيانات الرسم البياني من الأرشيف الحقيقي فقط
  const archive = JSON.parse(localStorage.getItem('donia_archive') || '{}');
  const yearEntries = Object.entries(archive)
    .map(([year, data]) => ({ year, students: data.gradeData || [] }))
    .filter(e => e.students.length > 0);
  // أضيفي السنة الحالية إن كانت تحوي درجات حقيقية ولم تكن مؤرشفة أصلاً
  const curYear = userProfile.year || '2025-2026';
  if (gradeData.length > 0 && !archive[curYear]) {
    yearEntries.push({ year: curYear, students: gradeData });
  }
  yearEntries.sort((a, b) => a.year.localeCompare(b.year));

  const chartWrap = document.getElementById('portfolio-chart-wrap');
  const chartEmpty = document.getElementById('portfolio-chart-empty');
  if (portfolioChart) { portfolioChart.destroy(); portfolioChart = null; }

  if (yearEntries.length < 1) {
    if (chartWrap) chartWrap.style.display = 'none';
    if (chartEmpty) chartEmpty.style.display = 'block';
    return;
  }
  if (chartWrap) chartWrap.style.display = 'block';
  if (chartEmpty) chartEmpty.style.display = 'none';

  const labels = yearEntries.map(e => e.year);
  const avgData = yearEntries.map(e => {
    const vals = e.students.map(s => parseFloat(s.moyenne)).filter(v => !isNaN(v));
    return vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : 0;
  });
  const successData = yearEntries.map(e => {
    const vals = e.students.map(s => parseFloat(s.moyenne)).filter(v => !isNaN(v));
    return vals.length ? Math.round(vals.filter(v => v >= 10).length / vals.length * 100) : 0;
  });

  const ctx = document.getElementById('portfolio-chart');
  if (!ctx) return;
  portfolioChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'المتوسط العام', data: avgData, backgroundColor: 'rgba(0,180,255,0.4)', borderColor: 'rgba(0,180,255,0.8)', borderWidth: 1.5 },
        { label: 'نسبة النجاح %', data: successData, backgroundColor: 'rgba(255,119,0,0.3)', borderColor: 'rgba(255,119,0,0.7)', borderWidth: 1.5, yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#8899bb', font: { family: 'Cairo', size: 10 }, padding: 10 } } },
      scales: {
        x: { ticks: { color: '#8899bb' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#8899bb' }, grid: { color: 'rgba(255,255,255,0.05)' }, min: 0, max: 20 },
        y1: { position: 'right', ticks: { color: '#8899bb' }, grid: { display: false }, min: 0, max: 100 }
      }
    }
  });
}

function buildCVHtml() {
  const fullName = (userProfile.nom || userProfile.prenom) ? `${userProfile.nom || ''} ${userProfile.prenom || ''}`.trim() : (licenseTeacherName || 'Enseignant(e)');
  const subject = userProfile.subject || currentSubject || '';
  const school = userProfile.school || '';
  const email = userProfile.email || '';
  const phone = userProfile.phone || '';
  const wilaya = userProfile.wilaya || '';
  const yearsExp = userProfile.yearsExp || '';
  const trainings = userProfile.trainings || '';
  return {
    fullName,
    html: `
      <div style="text-align:center;font-size:24px;font-weight:900;color:#00b4ff;">السيرة الذاتية</div>
      <div style="text-align:center;font-size:17px;font-weight:700;color:#333;margin-top:10px;">${fullName}</div>
      <div style="text-align:center;font-size:12px;color:#777;margin-top:4px;">أستاذ(ة) ${subject}${school ? ' — ' + school : ''}</div>
      <div style="border-top:2px solid #00b4ff;margin:18px 0;"></div>
      <div style="font-size:13px;font-weight:800;color:#00b4ff;margin-bottom:8px;">المعلومات الشخصية</div>
      <div style="font-size:12px;line-height:2.1;display:flex;flex-wrap:wrap;gap:0 30px;">
        <div>البريد الإلكتروني: ${email || '—'}</div>
        <div>الهاتف: ${phone || '—'}</div>
        <div>الولاية: ${wilaya || '—'}</div>
        <div>التخصص: ${subject || '—'}</div>
        <div>سنوات الخدمة: ${yearsExp || '—'}</div>
        <div>الدورات التدريبية: ${trainings || '—'}</div>
      </div>
      <div style="font-size:13px;font-weight:800;color:#00b4ff;margin:22px 0 8px;">التكوين والخبرة</div>
      <div style="font-size:11px;color:#999;">(أكملي هذا القسم من ملفك المهني للحصول على سيرة ذاتية مخصصة بالكامل)</div>
      <div style="text-align:center;font-size:9px;color:#aaa;margin-top:60px;">DONIA SMART TEACHER — donialabstech.online</div>
    `
  };
}

function printCV() {
  const { html } = buildCVHtml();
  printHtml(html, 'السيرة الذاتية');
}

async function generateCV() {
  try {
    const { fullName, html } = buildCVHtml();
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:794px;padding:50px 60px;background:#fff;color:#111;font-family:\'Cairo\',\'Tajawal\',Arial,sans-serif;direction:rtl;text-align:right;';
    wrap.innerHTML = html;
    await renderHtmlToPdf(wrap, `CV_${(fullName || 'enseignant').replace(/\s+/g, '_')}.pdf`, 'p');
    showNotif('✅ تم توليد السيرة الذاتية PDF');
  } catch (e) {
    console.error('generateCV error:', e);
    showNotif('⚠️ خطأ في PDF: ' + e.message, 'error');
  }
}

// يولّد وثائق إدارية بالعربية بشكل سليم. jsPDF وحده لا يدعم رسم الحروف
// العربية (لا يملك تشكيل السياق ولا اتجاه RTL)، لذلك نرسم الوثيقة كعنصر
// HTML حقيقي بخط عربي، ثم نحوّله لصورة عالية الدقة داخل الـ PDF — بهذا
// يخرج النص سليمًا تمامًا كما يظهر على الشاشة.
// ============================================================
// SHARED HTML → PDF / WORD EXPORT HELPERS
// (تستعملها كل مولّدات الوثائق: الإدارية، كشف الحضور، ...)
// ============================================================

// يحوّل عنصر HTML مرئي فعليًا في الصفحة إلى PDF بجودة عالية (يدعم العربية
// بشكل سليم لأنه يستعمل محرك عرض المتصفح نفسه، لا خط jsPDF الداخلي).
// يدعم توزيع المحتوى الطويل على عدة صفحات تلقائيًا.
// يفتح نافذة طباعة مباشرة لأي محتوى HTML (بدون تنزيل ملف) — بديل سريع لـ PDF
function printHtml(innerHtml, title) {
  const win = window.open('', '_blank');
  if (!win) { showNotif('⚠️ يرجى السماح بالنوافذ المنبثقة لتفعيل الطباعة', 'warn'); return; }
  win.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${title || 'DONIA SMART TEACHER'}</title>
<style>
  body{font-family:'Cairo','Tajawal',Arial,sans-serif;direction:rtl;text-align:right;padding:24px;color:#111;}
  table{width:100%;border-collapse:collapse;}
  @media print { @page { margin: 1.2cm; } }
</style></head><body>${innerHtml}</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 350);
}

async function renderHtmlToPdf(wrap, filename, orientation) {
  if (!window.html2canvas) throw new Error('مكتبة التصيير غير محمّلة، أعيدي تحميل الصفحة');
  const { jsPDF } = window.jspdf;

  const holder = document.createElement('div');
  holder.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;overflow:hidden;';
  holder.appendChild(wrap);
  document.body.appendChild(holder);

  if (document.fonts && document.fonts.ready) { await document.fonts.ready; }
  await new Promise(r => setTimeout(r, 60));

  let canvas;
  try {
    canvas = await html2canvas(wrap, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
  } finally {
    document.body.removeChild(holder);
  }
  if (!canvas.width || !canvas.height) throw new Error('فشل التقاط محتوى الوثيقة (canvas فارغ)');

  const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: orientation || 'p' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  const imgData = canvas.toDataURL('image/png');

  let heightLeft = imgHeight, position = 0;
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  pdf.save(filename);
}

// يحوّل نصًا/HTML بسيطًا إلى ملف Word (.doc) حقيقي قابل للتعديل — يفتح
// مباشرة في Microsoft Word أو Google Docs، ويدعم العربية RTL بشكل كامل.
function downloadAsWord(innerHtml, filename) {
  const htmlDoc = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>DONIA SMART TEACHER</title>
<style>body{font-family:Arial,Tahoma,sans-serif;direction:rtl;text-align:right;font-size:14px;line-height:1.9;}</style>
</head><body>${innerHtml}</body></html>`;
  const blob = new Blob(['\ufeff', htmlDoc], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// نصوص رسمية مخصّصة لكل نوع طلب — أقرب لصيغة المراسلات الإدارية الجزائرية
// المعروفة (بدل نص عام واحد يتكرر لكل الأنواع).
const ADMIN_DOC_BODIES = {
  'ترقية': 'يشرفني أن أتقدم إلى سيادتكم بطلب الاستفادة من الترقية إلى الرتبة الأعلى، وذلك بناءً على الأقدمية المطلوبة والمؤهلات المهنية المكتسبة خلال مسيرتي المهنية، راجيًا من سيادتكم التكرم بدراسة هذا الطلب واتخاذ الإجراءات اللازمة في هذا الشأن.',
  'مشاركة': 'يشرفني أن أتقدم إلى سيادتكم بطلب الموافقة على المشاركة في الفعالية التربوية/الدورة التكوينية المزمع تنظيمها، راجيًا من سيادتكم التكرم بالموافقة على هذا الطلب وتسهيل الإجراءات الإدارية اللازمة لذلك.',
  'إجازة': 'يشرفني أن أتقدم إلى سيادتكم بطلب الحصول على إجازة، راجيًا من سيادتكم التكرم بالموافقة على هذا الطلب واتخاذ ما يلزم من إجراءات إدارية في أقرب الآجال.',
  'تظلم': 'يشرفني أن أتقدم إلى سيادتكم بهذا التظلم، راجيًا من سيادتكم التكرم بإعادة النظر في القرار المتخذ، واتخاذ الإجراء المناسب بشأنه وفق ما تقتضيه الأنظمة والقوانين المعمول بها في هذا المجال.',
  'شهادة عمل': 'يشرفني أن أتقدم إلى سيادتكم بطلب استخراج شهادة عمل تثبت مزاولتي لمهامي بالمؤسسة المذكورة أعلاه، وذلك لتقديمها إلى الجهة المختصة عند الطلب.',
  'تعيين': 'يشرفني أن أتقدم إلى سيادتكم بطلب التعيين، راجيًا من سيادتكم التكرم بدراسة هذا الطلب واتخاذ الإجراءات اللازمة بشأنه في أقرب الآجال الممكنة.'
};

let lastAdminDoc = null; // يُستعمل لتفعيل زر "تنزيل بصيغة Word" بعد أي توليد PDF

async function genAdminDoc(type) {
  showNotif('📄 جارٍ توليد وثيقة: ' + type + '...');
  try {
    const today = new Date().toLocaleDateString('ar-DZ');
    const fullName = (userProfile.nom || userProfile.prenom) ? `${userProfile.nom || ''} ${userProfile.prenom || ''}`.trim() : (licenseTeacherName || 'الأستاذ(ة)');
    const subject = userProfile.subject || currentSubject || '—';
    const school = userProfile.school || 'المؤسسة التعليمية';
    const wilaya = userProfile.wilaya || '';
    const body = ADMIN_DOC_BODIES[type] || `يشرفني أن أتقدم إلى سيادتكم بطلب ${type}، راجيًا من سيادتكم التكرم بدراسة هذا الطلب واتخاذ الإجراءات اللازمة بشأنه.`;

    const contentHtml = `
      <div style="text-align:center;font-weight:700;">الجمهورية الجزائرية الديمقراطية الشعبية</div>
      <div style="text-align:center;">وزارة التربية الوطنية</div>
      ${wilaya ? `<div style="text-align:center;">مديرية التربية لولاية ${wilaya}</div>` : ''}
      <div style="border-top:2px solid #00b4ff;margin:14px 0 24px;"></div>
      <div style="text-align:left;">${school}${wilaya ? ' — ' + wilaya : ''}<br>في: ${today}</div>
      <div style="margin-top:24px;">إلى السيد(ة) مدير(ة) ${school}</div>
      <div style="margin-top:6px;">الموضوع: طلب ${type}</div>
      <div style="text-align:center;font-weight:900;font-size:1.2em;margin:28px 0;">طلب ${type}</div>
      <div style="line-height:2.1;margin-bottom:18px;">
        <div><strong>الأستاذ(ة):</strong> ${fullName}</div>
        <div><strong>المادة:</strong> ${subject}</div>
        <div><strong>المؤسسة:</strong> ${school}${wilaya ? ' — ' + wilaya : ''}</div>
      </div>
      <div style="margin-bottom:16px;">تحية طيبة وبعد،</div>
      <div style="line-height:2;text-align:justify;margin-bottom:50px;">${body}</div>
      <div style="margin-bottom:40px;">وتفضلوا سيادتكم بقبول فائق الاحترام والتقدير.</div>
      <div style="text-align:left;">
        <div>التوقيع:</div>
        <div style="margin-top:30px;">${fullName}</div>
      </div>
    `;

    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:794px;padding:60px 70px;background:#fff;color:#111;font-family:\'Cairo\',\'Tajawal\',Arial,sans-serif;direction:rtl;text-align:right;font-size:13.5px;';
    wrap.innerHTML = contentHtml;

    await renderHtmlToPdf(wrap, `طلب_${type}.pdf`, 'p');
    lastAdminDoc = { type, html: contentHtml, filename: `طلب_${type}.doc` };
    const wordBtn = document.getElementById('download-word-btn');
    if (wordBtn) wordBtn.disabled = false;
    const printBtn = document.getElementById('print-admindoc-btn');
    if (printBtn) printBtn.disabled = false;
    showNotif('✅ تم توليد الوثيقة');
  } catch (e) {
    console.error('genAdminDoc error:', e);
    showNotif('⚠️ فشل توليد الوثيقة: ' + e.message, 'error');
  }
}

function downloadLastAdminDocAsWord() {
  if (!lastAdminDoc) return showNotif('⚠️ ولّدي وثيقة PDF أولًا', 'warn');
  downloadAsWord(lastAdminDoc.html, lastAdminDoc.filename);
  showNotif('✅ تم تنزيل نسخة Word');
}

function printLastAdminDoc() {
  if (!lastAdminDoc) return showNotif('⚠️ ولّدي وثيقة أولًا', 'warn');
  printHtml(lastAdminDoc.html, lastAdminDoc.type);
}

// ============================================================
// AI ASSISTANT
// ============================================================
function selectSubject(el, subject) {
  document.querySelectorAll('.subject-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  currentSubject = subject;
  appendMsg('ai', `تم التحويل إلى مادة <strong>${subject}</strong>. كيف يمكنني مساعدتك؟`);
}

function quickPrompt(text) {
  document.getElementById('chat-input').value = text;
  sendMessage();
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  if (!apiKey) {
    showApiModal();
    showNotif('⚠️ يرجى إدخال مفتاح API أولاً', 'warn');
    return;
  }

  input.value = '';
  appendMsg('user', text);
  chatHistory.push({ role: 'user', content: text });

  const btn = document.getElementById('send-btn');
  btn.disabled = true;

  const aiDiv = appendMsg('ai', '', true);

  const systemPrompt = `أنت مساعد ذكي متخصص في مادة ${currentSubject} للتعليم المتوسط الجزائري.
أنت تساعد الأستاذة ضيف الله جميلة النذير التي تدرّس في متوسطة بوضريسة محمد الأمين بم'سيلة.
تستجيب دائماً باللغة العربية الفصحى. تتخصص في:
- إعداد المذكرات التحضيرية وفق المنهاج الجزائري
- المخططات السنوية والفصلية
- إعداد الفروض والاختبارات والتمارين مع الحلول
- شبكات التقييم والكفاءات المستهدفة
- استراتيجيات التدريس وتمييز التعلم
- الوثائق الإدارية الرسمية
تجنّبي استعمال رموز أو إيموجي زخرفية غير ضرورية داخل المحتوى (خصوصًا في المذكرات والوثائق الرسمية)، فقد تظهر بشكل غير سليم على بعض الأجهزة. استجب بشكل منظم وعملي قابل للاستخدام مباشرة.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: systemPrompt,
        messages: chatHistory
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const reply = data.content?.[0]?.text || 'لم يتم الحصول على رد.';
    aiDiv.classList.remove('streaming');
    aiDiv.innerHTML = renderMarkdown(reply);
    chatHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    aiDiv.classList.remove('streaming');
    aiDiv.innerHTML = `<span style="color:var(--danger)">❌ خطأ: ${err.message}. تأكد من صحة مفتاح API.</span>`;
  }

  btn.disabled = false;
  document.getElementById('chat-msgs').scrollTop = 999999;
}

function appendMsg(role, content, streaming = false) {
  const msgs = document.getElementById('chat-msgs');
  const div = document.createElement('div');
  div.className = 'msg msg-' + role + (streaming ? ' streaming' : '');
  div.innerHTML = content;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

// ============================================================
// API KEY MODAL
// ============================================================
function showApiModal() {
  document.getElementById('api-key-input').value = apiKey;
  document.getElementById('api-modal').classList.add('show');
}
function closeApiModal() {
  document.getElementById('api-modal').classList.remove('show');
}
function saveApiKey() {
  const key = document.getElementById('api-key-input').value.trim();
  if (!key) return showNotif('⚠️ أدخل مفتاح API', 'warn');
  apiKey = key;
  localStorage.setItem('donia_api_key', key);
  closeApiModal();
  showNotif('✅ تم حفظ مفتاح API');
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function showNotif(text, type = 'success') {
  const notifToggle = document.getElementById('tog-notif');
  if (notifToggle && !notifToggle.checked && type !== 'error') return; // الأخطاء تبقى ظاهرة دائمًا لأهميتها
  const el = document.getElementById('notif');
  const colors = { success: 'var(--green)', warn: 'var(--warn)', error: 'var(--danger)' };
  el.querySelector('#notif-text').textContent = text;
  el.style.borderColor = colors[type] || colors.success;
  el.style.color = colors[type] || colors.success;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 3000);
}


// ============================================================
// PROFILE & SETTINGS — v2
// ============================================================
// ============================================================
// SECURE BACKEND CONNECTION + PER-TEACHER LICENSE (commercial gating)
// ============================================================
// رابط خادم DONIA LABS TECH الموحّد — كل المعلمات يتصلن بنفس الخادم،
// ولا تحتجن لإعداد أي رابط بأنفسهن.
const DEFAULT_BACKEND_URL = 'https://donia-smart-teacher-v2.onrender.com';
let backendUrl = localStorage.getItem('donia_backend_url') || DEFAULT_BACKEND_URL;
let licenseToken = localStorage.getItem('donia_license_token') || '';
let licenseTeacherName = localStorage.getItem('donia_license_teacher') || '';
let licenseExpiresAt = localStorage.getItem('donia_license_expiry') || '';

function isLicenseValid() {
  if (!licenseToken || !licenseExpiresAt) return false;
  return new Date(licenseExpiresAt).getTime() > Date.now();
}

function clearLicense() {
  licenseToken = ''; licenseTeacherName = ''; licenseExpiresAt = '';
  localStorage.removeItem('donia_license_token');
  localStorage.removeItem('donia_license_teacher');
  localStorage.removeItem('donia_license_expiry');
}

// يتحقق من كود الترخيص لدى الخادم ويحفظ "بطاقة الدخول" الصادرة عنه.
async function verifyLicense(licenseKey) {
  const resp = await fetch(backendUrl + '/api/license/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ license_key: licenseKey })
  });
  const data = await resp.json();
  if (!resp.ok || data.error) throw new Error(data.error || 'تعذّر التحقق من الترخيص');
  licenseToken = data.token;
  licenseTeacherName = data.teacher_name || '';
  licenseExpiresAt = data.expires_at;
  localStorage.setItem('donia_license_token', licenseToken);
  localStorage.setItem('donia_license_teacher', licenseTeacherName);
  localStorage.setItem('donia_license_expiry', licenseExpiresAt);
}

function renderLicenseStatus() {
  const el = document.getElementById('license-status-box');
  if (!el) return;
  if (!isLicenseValid()) { el.innerHTML = '<span style="color:var(--danger)">⚠️ لا يوجد ترخيص ساري</span>'; return; }
  const daysLeft = Math.ceil((new Date(licenseExpiresAt).getTime() - Date.now()) / 86400000);
  const soon = daysLeft <= 30;
  el.innerHTML = `
    <div>👤 المرخّص لها: <strong>${licenseTeacherName || '—'}</strong></div>
    <div style="margin-top:4px;">📅 صالح حتى: <strong>${new Date(licenseExpiresAt).toLocaleDateString('ar-DZ')}</strong>
    ${soon ? ` — <span style="color:var(--warn)">⚠️ متبقٍ ${daysLeft} يومًا، يُرجى التجديد قريبًا</span>` : ''}</div>`;
}

// ترتيب التبديل التلقائي عند فشل المزوّد المختار (حصة منتهية، مفتاح غير مهيّأ، خطأ...).
// عدّلي هذا الترتيب حسب المزوّدين الذين وضعتِ مفاتيحهم فعليًا على الخادم.
const FALLBACK_CHAIN = [
  { provider: 'gemini', model: 'gemini-2.0-flash' },
  { provider: 'groq', model: 'llama-3.3-70b-versatile' },
  { provider: 'cerebras', model: 'llama3.1-70b' }
];

// Calls the secure backend proxy instead of exposing API keys in the browser.
// Requires a valid per-teacher license token (issued at login) instead of a
// shared app secret. Automatically tries the next provider in FALLBACK_CHAIN
// if the selected one fails.
async function callBackendAI(provider, model, systemPrompt, messages) {
  if (!backendUrl) throw new Error('لم يتم إعداد رابط الخادم الخلفي في الإعدادات');
  if (!isLicenseValid()) throw new Error('انتهت صلاحية الترخيص أو لم يتم تسجيل الدخول — يرجى تسجيل الدخول من جديد');
  const fallbacks = FALLBACK_CHAIN.filter(f => !(f.provider === provider && f.model === model));
  const resp = await fetch(backendUrl + '/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + licenseToken },
    body: JSON.stringify({ provider, model, system: systemPrompt, messages, fallbacks })
  });
  const data = await resp.json();
  if (resp.status === 401) { clearLicense(); throw new Error('انتهت صلاحية الترخيص — يرجى تسجيل الدخول من جديد'); }
  if (!resp.ok || data.error) throw new Error(data.error || ('خطأ خادم: ' + resp.status));
  if (data.usedProvider && data.usedProvider !== provider) {
    showNotif('ℹ️ تم التبديل تلقائيًا إلى ' + data.usedProvider + ' (تعذّر الوصول إلى ' + provider + ')', 'warn');
  }
  return data.reply || '';
}

const connectionMode = 'backend'; // الاتصال المباشر (غير الآمن) لم يعد متاحًا في النسخة التجارية

function logoutLicense() {
  clearLicense();
  showNotif('تم تسجيل الخروج');
  document.getElementById('app').classList.remove('active');
  document.getElementById('login-page').classList.add('active');
}

function subjectLanguageInstruction(subject) {
  if (subject === 'اللغة الفرنسية') return 'أجب بالكامل باللغة الفرنسية الفصحى (français) — العناوين والمحتوى والتمارين كلها بالفرنسية، إلا إذا طلب المستخدم صراحة لغة أخرى.';
  if (subject === 'اللغة الإنجليزية') return 'أجب بالكامل باللغة الإنجليزية (English) — العناوين والمحتوى والتمارين كلها بالإنجليزية، إلا إذا طلب المستخدم صراحة لغة أخرى.';
  return 'تستجيب دائماً باللغة العربية الفصحى.';
}

// الوثائق والشهادات الحقيقية — تبدأ فارغة، ترفع كل معلمة شهاداتها الخاصة
// بدل بيانات وهمية ثابتة (مخزّنة محليًا في المتصفح، لا تحتاج خادمًا).
let certificates = JSON.parse(localStorage.getItem('donia_certificates') || '[]');

function uploadCertificate(input) {
  const files = Array.from(input.files);
  let added = 0;
  files.forEach(file => {
    if (file.size > 3 * 1024 * 1024) { showNotif('⚠️ "' + file.name + '" أكبر من 3 ميغابايت، تم التجاهل', 'warn'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      certificates.push({ name: file.name, date: new Date().toLocaleDateString('ar-DZ'), dataUrl: e.target.result, isPdf: file.type === 'application/pdf' });
      localStorage.setItem('donia_certificates', JSON.stringify(certificates));
      renderCertificates();
    };
    reader.readAsDataURL(file);
    added++;
  });
  input.value = '';
  if (added) showNotif('✅ جارٍ إضافة ' + added + ' وثيقة...');
}

function removeCertificate(idx) {
  certificates.splice(idx, 1);
  localStorage.setItem('donia_certificates', JSON.stringify(certificates));
  renderCertificates();
}

function renderCertificates() {
  const grid = document.getElementById('certs-grid');
  const empty = document.getElementById('certs-empty');
  if (!grid) return;
  if (certificates.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  grid.innerHTML = certificates.map((c, i) => `
    <div class="doc-card" style="position:relative;cursor:pointer;" onclick="window.open(certificates[${i}].dataUrl,'_blank')">
      <div class="doc-icon">${c.isPdf ? '📄' : '🖼️'}</div>
      <div class="doc-info"><div class="doc-name">${c.name}</div><div class="doc-meta">أُضيفت: ${c.date}</div></div>
      <button onclick="event.stopPropagation();removeCertificate(${i})" style="position:absolute;top:6px;left:6px;background:none;border:none;color:var(--danger);cursor:pointer;font-size:0.9rem;">🗑️</button>
    </div>
  `).join('');
}

function escapeHtmlText(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMarkdown(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
}

// يحوّل استجابة الذكاء الاصطناعي (Markdown) إلى HTML حقيقي بدل عرض رموز
// # و ** كنص خام — عناوين، قوائم مرقّمة/نقطية، وتنسيق عريض/مائل.
function renderMarkdown(text) {
  const lines = escapeHtmlText(text).split('\n');
  let html = '', inUl = false, inOl = false;
  const closeLists = () => { if (inUl) { html += '</ul>'; inUl = false; } if (inOl) { html += '</ol>'; inOl = false; } };
  for (const line of lines) {
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { closeLists(); const lvl = Math.min(h[1].length + 2, 6); html += `<h${lvl} style="margin:14px 0 6px;">${inlineMarkdown(h[2])}</h${lvl}>`; continue; }
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ol) { if (!inOl) { closeLists(); html += '<ol style="margin:6px 0;padding-inline-start:22px;">'; inOl = true; } html += `<li>${inlineMarkdown(ol[1])}</li>`; continue; }
    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    if (ul) { if (!inUl) { closeLists(); html += '<ul style="margin:6px 0;padding-inline-start:22px;">'; inUl = true; } html += `<li>${inlineMarkdown(ul[1])}</li>`; continue; }
    if (line.trim() === '') { closeLists(); html += '<br>'; continue; }
    closeLists();
    html += inlineMarkdown(line) + '<br>';
  }
  closeLists();
  return html;
}

let currentModel = { provider: 'gemini', model: 'gemini-2.0-flash' };
let currentTrimester = 3;
let userPassword = localStorage.getItem('donia_password') || '1234';
let ragDocuments = JSON.parse(localStorage.getItem('donia_rag') || '[]');
if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}
let savedSignature = localStorage.getItem('donia_signature') || '';
let userProfile = JSON.parse(localStorage.getItem('donia_profile') || '{}');
let allTrimesters = JSON.parse(localStorage.getItem('donia_trimesters') || '{"1":{},"2":{},"3":{}}');

// Override doLogin to verify the teacher's license key with the backend instead
// of a shared local password.
const _origDoLogin = window.doLogin;
window.doLogin = async function() {
  const name = document.getElementById('login-user').value.trim();
  const licenseKey = document.getElementById('login-license').value.trim();
  if (!name || !licenseKey) return showNotif('⚠️ أدخلي الاسم وكود الترخيص', 'warn');

  const btn = document.getElementById('login-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ جارٍ التحقق من الترخيص...'; }
  try {
    await verifyLicense(licenseKey);
    if (!userProfile.nom && licenseTeacherName) {
      userProfile.nom = licenseTeacherName.split(' ')[0] || licenseTeacherName;
      userProfile.prenom = licenseTeacherName.split(' ').slice(1).join(' ');
      localStorage.setItem('donia_profile', JSON.stringify(userProfile));
    }
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('app').classList.add('active');
    initApp();
  } catch (err) {
    showNotif('❌ ' + err.message, 'error');
  }
  if (btn) { btn.disabled = false; btn.textContent = '🚀 دخول إلى المنصة'; }
};

// دخول تلقائي إن كان الترخيص محفوظًا وصالحًا (بدون إعادة كتابة كود الترخيص في كل مرة)
document.addEventListener('DOMContentLoaded', () => {
  if (isLicenseValid() && document.getElementById('login-page')) {
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('app').classList.add('active');
    if (typeof window.initApp === 'function') window.initApp();
  }
});

// Override initApp to also load profile
const _origInitApp = window.initApp;
window.initApp = function() {
  startClock();
  initAttendance();
  initCharts();
  renderSessionsList();
  loadProfile();
  loadRagList();
  loadSignaturePreview();
  initDrawCanvas();
  initSigCanvas();
  loadBackupList();
  renderLicenseStatus();
  renderCertificates();
  renderCareerStats();
  // set model key from saved
  apiKey = localStorage.getItem('donia_api_key') || '';
};

function loadProfile() {
  const p = userProfile;
  if (!p.nom) { renderPortfolioCard(); return; }
  if (document.getElementById('prof-nom')) document.getElementById('prof-nom').value = p.nom || '';
  if (document.getElementById('prof-prenom')) document.getElementById('prof-prenom').value = p.prenom || '';
  if (document.getElementById('prof-dob')) document.getElementById('prof-dob').value = p.dob || '';
  if (document.getElementById('prof-subject')) document.getElementById('prof-subject').value = p.subject || 'رياضيات';
  if (document.getElementById('prof-school')) document.getElementById('prof-school').value = p.school || '';
  if (document.getElementById('prof-wilaya')) document.getElementById('prof-wilaya').value = p.wilaya || '';
  if (document.getElementById('prof-phone')) document.getElementById('prof-phone').value = p.phone || '';
  if (document.getElementById('prof-email')) document.getElementById('prof-email').value = p.email || '';
  if (document.getElementById('prof-years-exp')) document.getElementById('prof-years-exp').value = p.yearsExp || '';
  if (document.getElementById('prof-trainings')) document.getElementById('prof-trainings').value = p.trainings || '';
  if (p.subject) currentSubject = p.subject;
  const yearEl = document.getElementById('setting-year');
  if (yearEl && p.year) { yearEl.value = p.year; document.getElementById('topbar-year').textContent = p.year; }
  renderPortfolioCard();
}

// Custom avatar/logo upload — shown in sidebar, settings, and the portfolio card.
// Stored as a base64 data URL in localStorage (small images only; no backend needed).
function uploadAvatar(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 1024 * 1024) { showNotif('⚠️ الصورة كبيرة جدًا، اختاري صورة أصغر من 1 ميغابايت', 'warn'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    localStorage.setItem('donia_avatar_img', e.target.result);
    applyAvatar();
    showNotif('✅ تم تحديث الصورة الشخصية');
  };
  reader.readAsDataURL(file);
}

function removeAvatar() {
  localStorage.removeItem('donia_avatar_img');
  applyAvatar();
  showNotif('تمت إزالة الصورة الشخصية');
}

function applyAvatar() {
  const img = localStorage.getItem('donia_avatar_img');
  const letter = (userProfile.nom && userProfile.nom[0]) ? userProfile.nom[0] : 'م';
  ['sidebar-avatar', 'settings-avatar-preview', 'profile-avatar-letter'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;">` : letter;
  });
}

// Keeps the "بطاقة المعلمة" (Portfolio) card, sidebar identity, and avatar in
// sync with the real profile instead of showing fixed placeholder data —
// works for any teacher, not just one.
function renderPortfolioCard() {
  const p = userProfile || {};
  const fullName = (p.nom || p.prenom) ? `${p.nom || ''} ${p.prenom || ''}`.trim() : (licenseTeacherName || 'الأستاذ(ة)');
  const nameEl = document.getElementById('profile-name-display');
  if (nameEl) nameEl.textContent = fullName;

  if (document.getElementById('sidebar-username')) document.getElementById('sidebar-username').textContent = fullName;
  if (document.getElementById('sidebar-userrole')) document.getElementById('sidebar-userrole').textContent = 'أستاذ(ة) ' + (p.subject || currentSubject || '');
  applyAvatar();

  const subjSchoolEl = document.getElementById('profile-subject-school');
  if (subjSchoolEl) {
    const subj = p.subject || 'أستاذ(ة)';
    const school = p.school || 'لم يتم تحديد المؤسسة';
    subjSchoolEl.textContent = `أستاذ(ة) ${subj} — ${school}`;
  }

  const wilayaEl = document.getElementById('profile-wilaya-display');
  if (wilayaEl) wilayaEl.textContent = p.wilaya ? `${p.wilaya} — الجزائر` : 'الجزائر';

  const emailEl = document.getElementById('profile-email-display');
  if (emailEl) emailEl.textContent = p.email || '—';

  const phoneEl = document.getElementById('profile-phone-display');
  if (phoneEl) phoneEl.textContent = p.phone || '—';

  const subjEl = document.getElementById('profile-subject-display');
  if (subjEl) subjEl.textContent = p.subject || '—';

  const yearsDisplayEl = document.getElementById('profile-years-display');
  if (yearsDisplayEl) yearsDisplayEl.textContent = p.yearsExp ? `${p.yearsExp} سنة` : '— سنة';
}

function saveProfile() {
  userProfile = {
    nom: document.getElementById('prof-nom').value.trim(),
    prenom: document.getElementById('prof-prenom').value.trim(),
    dob: document.getElementById('prof-dob').value,
    subject: document.getElementById('prof-subject').value,
    school: document.getElementById('prof-school').value.trim(),
    wilaya: document.getElementById('prof-wilaya').value.trim(),
    phone: document.getElementById('prof-phone').value.trim(),
    email: document.getElementById('prof-email').value.trim(),
    yearsExp: document.getElementById('prof-years-exp').value.trim(),
    trainings: document.getElementById('prof-trainings').value.trim(),
    year: document.getElementById('setting-year').value.trim() || '2025-2026'
  };
  localStorage.setItem('donia_profile', JSON.stringify(userProfile));
  if (userProfile.subject) { currentSubject = userProfile.subject; }
  document.getElementById('topbar-year').textContent = userProfile.year;
  localStorage.setItem('donia_api_key', apiKey);
  renderPortfolioCard();
  renderCareerStats();
  autoBackup();
  showNotif('✅ تم حفظ المعلومات الشخصية');
}

// ============================================================
// TRIMESTER MANAGEMENT
// ============================================================
function setActiveTrim(n, el) {
  currentTrimester = n;
  document.querySelectorAll('.trim-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('topbar-trimester').value = n;
  showNotif('📅 تم الانتقال إلى الفصل ' + ['الأول','الثاني','الثالث'][n-1]);
}

function switchTrimester(val) {
  currentTrimester = parseInt(val);
  // Save current data to trimester
  if (gradeData.length > 0) {
    allTrimesters[currentTrimester] = { gradeData: [...gradeData], currentClass };
    localStorage.setItem('donia_trimesters', JSON.stringify(allTrimesters));
  }
  // Load trimester data if exists
  const td = allTrimesters[currentTrimester];
  if (td && td.gradeData && td.gradeData.length > 0) {
    gradeData = td.gradeData;
    currentClass = td.currentClass;
    renderAllData();
    showNotif('📂 تم تحميل بيانات الفصل ' + ['الأول','الثاني','الثالث'][currentTrimester-1]);
  } else {
    showNotif('📅 الفصل ' + ['الأول','الثاني','الثالث'][currentTrimester-1] + ' — لا توجد بيانات بعد', 'warn');
  }
}

function saveYearSettings() {
  const year = document.getElementById('setting-year').value.trim() || '2025-2026';
  if (!userProfile) userProfile = {};
  userProfile.year = year;
  localStorage.setItem('donia_profile', JSON.stringify(userProfile));
  document.getElementById('topbar-year').textContent = year;
  showNotif('✅ تم حفظ إعدادات السنة الدراسية');
}

// ============================================================
// PASSWORD
// ============================================================
function checkPwStrength(pw) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['', 'ضعيف جداً', 'ضعيف', 'متوسط', 'قوي', 'قوي جداً'];
  const colors = ['', '#ff4757', '#ff7700', '#ffab00', '#00b4ff', '#00e676'];
  const fill = document.getElementById('pw-fill');
  const label = document.getElementById('pw-strength-label');
  if (fill) { fill.style.width = (score * 20) + '%'; fill.style.background = colors[score] || '#ff4757'; }
  if (label) label.textContent = labels[score] || '';
}

function changePassword() {
  const cur = document.getElementById('pw-current').value;
  const nw = document.getElementById('pw-new').value;
  const conf = document.getElementById('pw-confirm').value;
  if (cur !== userPassword) return showNotif('❌ كلمة المرور الحالية غير صحيحة', 'error');
  if (nw.length < 4) return showNotif('⚠️ كلمة المرور يجب أن تكون 4 أحرف على الأقل', 'warn');
  if (nw !== conf) return showNotif('❌ كلمة المرور الجديدة وتأكيدها غير متطابقتان', 'error');
  userPassword = nw;
  localStorage.setItem('donia_password', nw);
  document.getElementById('pw-current').value = '';
  document.getElementById('pw-new').value = '';
  document.getElementById('pw-confirm').value = '';
  showNotif('✅ تم تغيير كلمة المرور بنجاح');
}

// ============================================================
// AI MODEL SELECTOR
// ============================================================
const MODEL_KEYS = {
  claude: { label: 'Anthropic (Claude)', placeholder: 'sk-ant-api03-...', link: 'https://console.anthropic.com/keys' },
  gemini: { label: 'Google (Gemini)', placeholder: 'AIza...', link: 'https://aistudio.google.com/apikey' },
  groq: { label: 'Groq', placeholder: 'gsk_...', link: 'https://console.groq.com/keys' },
  openai: { label: 'OpenAI', placeholder: 'sk-...', link: 'https://platform.openai.com/api-keys' },
  mistral: { label: 'Mistral AI', placeholder: '...', link: 'https://console.mistral.ai/api-keys/' },
  cerebras: { label: 'Cerebras', placeholder: 'csk-...', link: 'https://cloud.cerebras.ai/platform' },
};

function selectModel(provider, model, el) {
  document.querySelectorAll('.model-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  currentModel = { provider, model };
  const info = MODEL_KEYS[provider] || {};
  document.getElementById('model-key-label').textContent = info.label || provider;
  const inp = document.getElementById('model-api-key');
  inp.placeholder = info.placeholder || 'أدخل مفتاح API...';
  inp.value = localStorage.getItem('donia_key_' + provider) || '';
  const linkEl = document.getElementById('model-key-link');
  linkEl.innerHTML = info.link ? `<a href="${info.link}" style="color:var(--blue)" target="_blank">🔗 احصلي على مفتاح API مجاني</a>` : '';
  showNotif('🤖 تم اختيار: ' + (info.label || provider));
}

function saveModelKey() {
  const key = document.getElementById('model-api-key').value.trim();
  if (!key) return showNotif('⚠️ أدخل مفتاح API', 'warn');
  localStorage.setItem('donia_key_' + currentModel.provider, key);
  if (currentModel.provider === 'claude') {
    apiKey = key;
    localStorage.setItem('donia_api_key', key);
  }
  showNotif('✅ تم حفظ مفتاح ' + currentModel.provider);
}

// Override sendMessage to support multiple AI providers
const _origSendMessage = window.sendMessage;
window.sendMessage = async function() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const provider = currentModel.provider;
  const providerKey = localStorage.getItem('donia_key_' + provider) || (provider === 'claude' ? apiKey : '');

  if (connectionMode === 'backend') {
    if (!backendUrl) {
      showNotif('⚠️ يرجى إعداد رابط الخادم الخلفي في الإعدادات', 'warn');
      showPage_direct('settings');
      return;
    }
  } else if (!providerKey) {
    showNotif('⚠️ يرجى إدخال مفتاح API لـ ' + provider + ' في الإعدادات', 'warn');
    showPage_direct('settings');
    return;
  }

  input.value = '';
  appendMsg('user', text);
  chatHistory.push({ role: 'user', content: text });
  const btn = document.getElementById('send-btn');
  btn.disabled = true;
  const aiDiv = appendMsg('ai', '', true);

  // Build system prompt with RAG context
  let ragContext = '';
  const usableRagDocs = ragDocuments.filter(d => d.content && d.content.trim().length > 0);
  if (usableRagDocs.length > 0 && document.getElementById('tog-websearch')?.checked) {
    ragContext = '\n\nنصوص المنهج المرجعية (مستخرجة فعليًا من الملفات المرفوعة — اعتمد عليها كمصدر أساسي وأدقّ من معرفتك العامة):\n'
      + usableRagDocs.map(d => `--- بداية وثيقة: ${d.name} ---\n${d.content}\n--- نهاية وثيقة: ${d.name} ---`).join('\n\n');
  }
  const profileName = userProfile.nom ? `${userProfile.nom} ${userProfile.prenom}` : 'الأستاذة';
  const school = userProfile.school || 'المؤسسة التعليمية';
  const systemPrompt = `أنت مساعد ذكي متخصص في مادة ${currentSubject} للتعليم المتوسط الجزائري.
أنت تساعد ${profileName} التي تدرّس في ${school}.
${subjectLanguageInstruction(currentSubject)} تتخصص في:
- إعداد المذكرات التحضيرية وفق المنهاج الجزائري
- المخططات السنوية والفصلية
- إعداد الفروض والاختبارات والتمارين مع الحلول
- شبكات التقييم والكفاءات المستهدفة
- استراتيجيات التدريس وتمييز التعلم
- الوثائق الإدارية الرسمية
${ragContext}
${usableRagDocs.length > 0
  ? 'استعمل نصوص المنهج المرجعية أعلاه كمصدر أساسي ودقيق عند توليد المذكرات والاختبارات، واذكر إن كانت إجابتك مبنية على هذه الوثائق أو على معرفتك العامة بالمنهاج الجزائري إن لم تكن الوثيقة كافية.'
  : 'لا توجد حاليًا وثائق منهج مرفوعة ومُستخرجة، لذا اعتمد على معرفتك العامة بالمنهاج الجزائري ونبّه المستخدم أن الدقة الكاملة تتطلب رفع وثيقة المنهج الرسمية.'}
تجنّبي استعمال رموز أو إيموجي زخرفية غير ضرورية داخل المحتوى (خصوصًا في المذكرات والوثائق الرسمية)، فقد تظهر بشكل غير سليم على بعض الأجهزة. استجب بشكل منظم وعملي قابل للاستخدام مباشرة.`;

  try {
    let reply = '';
    if (connectionMode === 'backend') {
      reply = await callBackendAI(provider, currentModel.model, systemPrompt, chatHistory) || 'لم يتم الحصول على رد.';
    } else if (provider === 'claude') {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': providerKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: currentModel.model, max_tokens: 2000, system: systemPrompt, messages: chatHistory })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message);
      reply = data.content?.[0]?.text || 'لم يتم الحصول على رد.';
    } else if (provider === 'gemini') {
      const msgs = chatHistory.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${currentModel.model}:generateContent?key=${providerKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: msgs, systemInstruction: { parts: [{ text: systemPrompt }] } })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message);
      reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'لم يتم الحصول على رد.';
    } else if (provider === 'groq') {
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + providerKey },
        body: JSON.stringify({ model: currentModel.model, max_tokens: 2000, messages: [{ role:'system', content: systemPrompt }, ...chatHistory] })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      reply = data.choices?.[0]?.message?.content || 'لم يتم الحصول على رد.';
    } else if (provider === 'openai') {
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + providerKey },
        body: JSON.stringify({ model: currentModel.model, max_tokens: 2000, messages: [{ role:'system', content: systemPrompt }, ...chatHistory] })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message);
      reply = data.choices?.[0]?.message?.content || 'لم يتم الحصول على رد.';
    } else if (provider === 'mistral') {
      const resp = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + providerKey },
        body: JSON.stringify({ model: currentModel.model, max_tokens: 2000, messages: [{ role:'system', content: systemPrompt }, ...chatHistory] })
      });
      const data = await resp.json();
      if (data.error) throw new Error(JSON.stringify(data.error));
      reply = data.choices?.[0]?.message?.content || 'لم يتم الحصول على رد.';
    } else if (provider === 'cerebras') {
      const resp = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + providerKey },
        body: JSON.stringify({ model: currentModel.model, max_tokens: 2000, messages: [{ role:'system', content: systemPrompt }, ...chatHistory] })
      });
      const data = await resp.json();
      if (data.error) throw new Error(JSON.stringify(data.error));
      reply = data.choices?.[0]?.message?.content || 'لم يتم الحصول على رد.';
    } else {
      reply = '⚠️ النموذج غير مدعوم بعد.';
    }

    aiDiv.classList.remove('streaming');
    aiDiv.innerHTML = renderMarkdown(reply);
    chatHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    aiDiv.classList.remove('streaming');
    aiDiv.innerHTML = `<span style="color:var(--danger)">❌ خطأ: ${err.message}</span>`;
  }
  btn.disabled = false;
  document.getElementById('chat-msgs').scrollTop = 999999;
};

// ============================================================
// showPage override to support new pages
// ============================================================
const _origShowPage = window.showPage;
window.showPage = function(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pageEl = document.getElementById('page-' + id);
  if (pageEl) pageEl.classList.add('active');
  if (event && event.currentTarget) event.currentTarget.classList.add('active');
  const titles = {
    dashboard:'لوحة التحكم', evaluation:'تقييم الطلاب الذكي',
    attendance:'الحضور والغياب', portfolio:'الملف المهني الرقمي',
    ai:'المساعد الذكي AI', drawing:'لوحة الرسم والتوقيع', settings:'الإعدادات الشخصية',
    guide:'دليل الاستخدام'
  };
  document.getElementById('topbar-title').textContent = titles[id] || id;
  if (id === 'settings') setTimeout(loadProfile, 50);
};

function showPage_direct(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pageEl = document.getElementById('page-' + id);
  if (pageEl) pageEl.classList.add('active');
  const titles = { settings:'الإعدادات الشخصية', drawing:'لوحة الرسم والتوقيع' };
  document.getElementById('topbar-title').textContent = titles[id] || id;
}

// ============================================================
// RAG DOCUMENTS
// ============================================================
// Max characters of extracted curriculum text kept per document (keeps AI prompts fast & affordable)
const RAG_MAX_CHARS = 12000;

async function extractPdfText(arrayBuffer) {
  if (!window.pdfjsLib) throw new Error('مكتبة قراءة PDF غير محمّلة');
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  const maxPages = Math.min(pdf.numPages, 40); // safety cap for very large documents
  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(it => it.str).join(' ') + '\n';
    if (text.length > RAG_MAX_CHARS) break;
  }
  return text.trim();
}

async function extractDocxText(arrayBuffer) {
  if (!window.mammoth) throw new Error('مكتبة قراءة Word غير محمّلة');
  const result = await mammoth.extractRawText({ arrayBuffer });
  return (result.value || '').trim();
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function addRagDocs(input) {
  const files = Array.from(input.files);
  for (const file of files) {
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    const isDocx = /\.docx$/i.test(file.name) || file.type.includes('officedocument.wordprocessingml');
    const isTxt = file.type === 'text/plain' || /\.txt$/i.test(file.name);
    const isDoc = /\.doc$/i.test(file.name) && !isDocx; // legacy .doc — cannot be parsed client-side

    showNotif('⏳ جارٍ استخراج نص: ' + file.name, 'info');
    let content = '';
    let extractionOk = true;
    try {
      if (isPdf) {
        const buf = await readFileAsArrayBuffer(file);
        content = await extractPdfText(buf);
      } else if (isDocx) {
        const buf = await readFileAsArrayBuffer(file);
        content = await extractDocxText(buf);
      } else if (isTxt) {
        content = await readFileAsText(file);
      } else if (isDoc) {
        extractionOk = false; // .doc القديم غير مدعوم — يُنصح بتحويله إلى .docx أو PDF
      }
    } catch (err) {
      extractionOk = false;
      console.error('RAG extraction error:', err);
    }

    if (content && content.length > RAG_MAX_CHARS) content = content.substring(0, RAG_MAX_CHARS);

    const doc = {
      name: file.name,
      size: Math.round(file.size / 1024) + ' KB',
      type: file.type || (isPdf ? 'application/pdf' : isDocx ? 'docx' : 'text/plain'),
      content,
      extracted: !!content,
      added: new Date().toLocaleDateString('ar-DZ')
    };
    ragDocuments.push(doc);
    localStorage.setItem('donia_rag', JSON.stringify(ragDocuments));
    loadRagList();

    if (!extractionOk) {
      showNotif('⚠️ تعذّر استخراج نص "' + file.name + '" — يُرجى استعمال PDF أو DOCX أو TXT', 'warn');
    } else if (!content) {
      showNotif('⚠️ لم يُعثر على نص قابل للقراءة في: ' + file.name, 'warn');
    } else {
      showNotif('✅ تم استخراج المحتوى فعليًا من: ' + file.name);
    }
  }
  input.value = '';
}

function loadRagList() {
  const el = document.getElementById('rag-docs-list');
  if (!el) return;
  if (ragDocuments.length === 0) {
    el.innerHTML = '<div class="empty-state" style="padding:24px"><div class="empty-icon" style="font-size:1.8rem">📂</div><div class="empty-text">لا توجد وثائق مضافة بعد</div></div>';
    return;
  }
  el.innerHTML = ragDocuments.map((d,i) => `
    <div class="rag-doc-item">
      <div class="rag-doc-icon">${d.type && d.type.includes('pdf') ? '📄' : d.type && d.type.includes('text') ? '📝' : '📂'}</div>
      <div style="flex:1">
        <div class="rag-doc-name">${d.name}</div>
        <div class="rag-doc-size">${d.size} · أُضيف: ${d.added} · ${d.extracted ? '<span style="color:var(--green)">✅ تم استخراج النص ويُستعمل في التوليد</span>' : '<span style="color:var(--warn)">⚠️ لم يُستخرج نص — لن يُستعمل فعليًا</span>'}</div>
      </div>
      <button class="rag-doc-del" onclick="removeRagDoc(${i})">🗑️</button>
    </div>
  `).join('');
}

function removeRagDoc(idx) {
  ragDocuments.splice(idx, 1);
  localStorage.setItem('donia_rag', JSON.stringify(ragDocuments));
  loadRagList();
  showNotif('🗑️ تم حذف الوثيقة');
}

// ============================================================
// DRAWING CANVAS — رسم حر + أدوات هندسية (خط، دائرة، مثلث، مستطيل)
// ============================================================
let drawCtx = null, drawIsDrawing = false, drawLastX = 0, drawLastY = 0;
let drawColor = '#00b4ff';
let drawMode = 'free'; // free | line | circle | triangle | rect
let drawStartX = 0, drawStartY = 0, drawSnapshot = null;

function setDrawMode(mode, el) {
  drawMode = mode;
  document.querySelectorAll('.shape-tool').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
}

function drawShapePreview(x, y) {
  if (!drawSnapshot) return;
  drawCtx.putImageData(drawSnapshot, 0, 0);
  drawCtx.beginPath();
  if (drawMode === 'line') {
    drawCtx.moveTo(drawStartX, drawStartY);
    drawCtx.lineTo(x, y);
  } else if (drawMode === 'rect') {
    drawCtx.rect(drawStartX, drawStartY, x - drawStartX, y - drawStartY);
  } else if (drawMode === 'circle') {
    const r = Math.hypot(x - drawStartX, y - drawStartY);
    drawCtx.arc(drawStartX, drawStartY, r, 0, Math.PI * 2);
  } else if (drawMode === 'triangle') {
    const apexX = (drawStartX + x) / 2;
    drawCtx.moveTo(apexX, drawStartY);
    drawCtx.lineTo(drawStartX, y);
    drawCtx.lineTo(x, y);
    drawCtx.closePath();
  }
  drawCtx.stroke();
}

function initDrawCanvas() {
  const c = document.getElementById('draw-canvas');
  if (!c) return;
  drawCtx = c.getContext('2d');
  drawCtx.lineWidth = 5; drawCtx.lineCap = 'round'; drawCtx.lineJoin = 'round';
  drawCtx.strokeStyle = drawColor;

  const getPos = e => ({ x: e.offsetX, y: e.offsetY });

  c.addEventListener('mousedown', e => {
    drawIsDrawing = true;
    const { x, y } = getPos(e);
    [drawLastX, drawLastY] = [x, y];
    [drawStartX, drawStartY] = [x, y];
    if (drawMode !== 'free') drawSnapshot = drawCtx.getImageData(0, 0, c.width, c.height);
  });
  c.addEventListener('mousemove', e => {
    if (!drawIsDrawing) return;
    const { x, y } = getPos(e);
    if (drawMode === 'free') {
      drawCtx.beginPath(); drawCtx.moveTo(drawLastX, drawLastY);
      drawCtx.lineTo(x, y); drawCtx.stroke();
      [drawLastX, drawLastY] = [x, y];
    } else {
      drawShapePreview(x, y);
    }
  });
  c.addEventListener('mouseup', () => { drawIsDrawing = false; drawSnapshot = null; });
  c.addEventListener('mouseleave', () => { drawIsDrawing = false; drawSnapshot = null; });

  // Touch support (رسم حر فقط باللمس؛ الأشكال أدق بالفأرة)
  c.addEventListener('touchstart', e => { e.preventDefault(); const t = e.touches[0]; const r = c.getBoundingClientRect(); drawIsDrawing = true; [drawLastX, drawLastY] = [t.clientX - r.left, t.clientY - r.top]; });
  c.addEventListener('touchmove', e => { e.preventDefault(); if (!drawIsDrawing) return; const t = e.touches[0]; const r = c.getBoundingClientRect(); drawCtx.beginPath(); drawCtx.moveTo(drawLastX, drawLastY); drawCtx.lineTo(t.clientX - r.left, t.clientY - r.top); drawCtx.stroke(); [drawLastX, drawLastY] = [t.clientX - r.left, t.clientY - r.top]; });
  c.addEventListener('touchend', () => drawIsDrawing = false);
}

// رسم دالة رياضية f(x) على محاور حقيقية — مفيد لمعلمي الرياضيات (منحنيات، أسهم، إلخ)
function plotFunction() {
  const canvas = document.getElementById('fn-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const exprRaw = (document.getElementById('fn-expr').value || 'x').trim();
  const xMin = parseFloat(document.getElementById('fn-xmin').value) || -10;
  const xMax = parseFloat(document.getElementById('fn-xmax').value) || 10;
  if (xMax <= xMin) return showNotif('⚠️ يجب أن يكون x الأقصى أكبر من x الأدنى', 'warn');

  let fn;
  try { fn = new Function('x', 'with(Math){ return ' + exprRaw + '; }'); fn(0); }
  catch (e) { return showNotif('⚠️ صيغة الدالة غير صحيحة: ' + e.message, 'error'); }

  // نحسب مدى y أولًا لضبط المقياس تلقائيًا
  const samples = 400;
  const pts = [];
  let yMin = Infinity, yMax = -Infinity;
  for (let i = 0; i <= samples; i++) {
    const x = xMin + (xMax - xMin) * i / samples;
    let y;
    try { y = fn(x); } catch (e) { y = NaN; }
    if (typeof y === 'number' && isFinite(y)) { pts.push([x, y]); if (y < yMin) yMin = y; if (y > yMax) yMax = y; }
    else pts.push([x, null]);
  }
  if (!isFinite(yMin) || !isFinite(yMax)) return showNotif('⚠️ تعذّر حساب قيم الدالة في هذا المدى', 'error');
  if (yMin === yMax) { yMin -= 1; yMax += 1; }
  const yPad = (yMax - yMin) * 0.1; yMin -= yPad; yMax += yPad;

  const toPx = x => (x - xMin) / (xMax - xMin) * (W - 60) + 40;
  const toPy = y => H - 30 - (y - yMin) / (yMax - yMin) * (H - 60);

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

  // شبكة خفيفة
  ctx.strokeStyle = '#eee'; ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const gx = 40 + i * (W - 60) / 10;
    ctx.beginPath(); ctx.moveTo(gx, 10); ctx.lineTo(gx, H - 20); ctx.stroke();
  }
  for (let i = 0; i <= 8; i++) {
    const gy = 10 + i * (H - 40) / 8;
    ctx.beginPath(); ctx.moveTo(40, gy); ctx.lineTo(W - 20, gy); ctx.stroke();
  }

  // المحاور (x=0 وy=0 إن كانا داخل المدى)
  ctx.strokeStyle = '#333'; ctx.lineWidth = 1.5;
  if (xMin <= 0 && xMax >= 0) { ctx.beginPath(); ctx.moveTo(toPx(0), 10); ctx.lineTo(toPx(0), H - 20); ctx.stroke(); }
  if (yMin <= 0 && yMax >= 0) { ctx.beginPath(); ctx.moveTo(40, toPy(0)); ctx.lineTo(W - 20, toPy(0)); ctx.stroke(); }

  // المنحنى
  ctx.strokeStyle = '#00b4ff'; ctx.lineWidth = 2.5;
  ctx.beginPath();
  let started = false;
  pts.forEach(([x, y]) => {
    if (y === null) { started = false; return; }
    const px = toPx(x), py = toPy(y);
    if (!started) { ctx.moveTo(px, py); started = true; } else { ctx.lineTo(px, py); }
  });
  ctx.stroke();

  ctx.fillStyle = '#555'; ctx.font = '11px Arial';
  ctx.fillText('y = ' + exprRaw, 45, 20);
  showNotif('✅ تم رسم المنحنى');
}

function setDrawColor(color, el) {
  drawColor = color;
  if (drawCtx) { drawCtx.strokeStyle = color; if (color === '#ffffff') { drawCtx.lineWidth = 20; } else { drawCtx.lineWidth = parseInt(document.getElementById('draw-size')?.value || 5); } }
  document.querySelectorAll('.draw-color').forEach(d => d.classList.remove('active'));
  if (el) el.classList.add('active');
}

function clearDrawCanvas() {
  const c = document.getElementById('draw-canvas');
  if (c && drawCtx) { drawCtx.clearRect(0, 0, c.width, c.height); }
}

function downloadDrawing() {
  const c = document.getElementById('draw-canvas');
  if (!c) return;
  const a = document.createElement('a'); a.download = 'رسم_' + Date.now() + '.png'; a.href = c.toDataURL(); a.click();
  showNotif('💾 تم حفظ الرسم');
}

// ============================================================
// SIGNATURE PAD
// ============================================================
let sigCtx = null, sigDrawing = false, sigLastX = 0, sigLastY = 0;

function initSigCanvas() {
  const c = document.getElementById('sig-canvas');
  if (!c) return;
  sigCtx = c.getContext('2d');
  sigCtx.lineWidth = 2.5; sigCtx.lineCap = 'round'; sigCtx.lineJoin = 'round'; sigCtx.strokeStyle = '#1a1a2e';
  c.addEventListener('mousedown', e => { sigDrawing = true; const r = c.getBoundingClientRect(); [sigLastX, sigLastY] = [e.clientX - r.left, e.clientY - r.top]; });
  c.addEventListener('mousemove', e => { if (!sigDrawing) return; const r = c.getBoundingClientRect(); sigCtx.beginPath(); sigCtx.moveTo(sigLastX, sigLastY); sigCtx.lineTo(e.clientX - r.left, e.clientY - r.top); sigCtx.stroke(); [sigLastX, sigLastY] = [e.clientX - r.left, e.clientY - r.top]; });
  c.addEventListener('mouseup', () => sigDrawing = false);
  c.addEventListener('mouseleave', () => sigDrawing = false);
  c.addEventListener('touchstart', e => { e.preventDefault(); const t = e.touches[0]; const r = c.getBoundingClientRect(); sigDrawing = true; [sigLastX, sigLastY] = [t.clientX - r.left, t.clientY - r.top]; });
  c.addEventListener('touchmove', e => { e.preventDefault(); if (!sigDrawing) return; const t = e.touches[0]; const r = c.getBoundingClientRect(); sigCtx.beginPath(); sigCtx.moveTo(sigLastX, sigLastY); sigCtx.lineTo(t.clientX - r.left, t.clientY - r.top); sigCtx.stroke(); [sigLastX, sigLastY] = [t.clientX - r.left, t.clientY - r.top]; });
  c.addEventListener('touchend', () => sigDrawing = false);
  // Load saved sig
  if (savedSignature) {
    const img = new Image(); img.onload = () => sigCtx.drawImage(img, 0, 0); img.src = savedSignature;
  }
}

function clearSig() {
  const c = document.getElementById('sig-canvas');
  if (c && sigCtx) sigCtx.clearRect(0, 0, c.width, c.height);
}

function saveSig() {
  const c = document.getElementById('sig-canvas');
  if (!c) return;
  savedSignature = c.toDataURL();
  localStorage.setItem('donia_signature', savedSignature);
  document.getElementById('sig-status').innerHTML = '<span style="color:var(--green)">✅ تم حفظ التوقيع بنجاح</span>';
  loadSignaturePreview();
  showNotif('✅ تم حفظ التوقيع الشخصي');
}

function downloadSig() {
  const c = document.getElementById('sig-canvas');
  if (!c) return;
  const a = document.createElement('a'); a.download = 'توقيعي.png'; a.href = c.toDataURL(); a.click();
}

function loadSignaturePreview() {
  if (!savedSignature) return;
  const p = document.getElementById('sig-preview');
  const w = document.getElementById('sig-preview-wrap');
  if (p) { p.src = savedSignature; if (w) w.style.display = 'block'; }
}

// ============================================================
// CAMERA / DOCUMENT SCANNER
// ============================================================
let cameraStream = null;
let capturedImageData = null;
let cameraEnabledSetting = true;

function checkCameraEnabled() {
  return document.getElementById('tog-camera')?.checked !== false;
}

async function startScanCamera() {
  if (!checkCameraEnabled()) return showNotif('⚠️ الكاميرا معطّلة في الإعدادات', 'warn');
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } });
    const video = document.getElementById('scan-video');
    video.srcObject = cameraStream;
    video.style.display = 'block';
    document.getElementById('camera-placeholder').style.display = 'none';
    showNotif('📷 الكاميرا تعمل');
  } catch (err) {
    showNotif('❌ لا يمكن الوصول للكاميرا: ' + err.message, 'error');
  }
}

function stopScanCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
  const video = document.getElementById('scan-video');
  if (video) { video.style.display = 'none'; video.srcObject = null; }
  document.getElementById('camera-placeholder').style.display = 'flex';
  showNotif('⛔ تم إيقاف الكاميرا');
}

function captureDocument() {
  const video = document.getElementById('scan-video');
  if (!video || video.style.display === 'none') return showNotif('⚠️ شغّلي الكاميرا أولاً', 'warn');
  const canvas = document.getElementById('scan-capture');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  canvas.getContext('2d').drawImage(video, 0, 0);
  capturedImageData = canvas.toDataURL('image/jpeg', 0.9);
  const wrap = document.getElementById('captured-doc-wrap');
  wrap.innerHTML = `<img src="${capturedImageData}" style="max-width:100%;border-radius:var(--radius-sm);" alt="وثيقة ملتقطة">`;
  showNotif('📸 تم التقاط الوثيقة');
}

function downloadCaptured() {
  if (!capturedImageData) return showNotif('⚠️ لم يتم الالتقاط بعد', 'warn');
  const a = document.createElement('a'); a.download = 'وثيقة_' + Date.now() + '.jpg'; a.href = capturedImageData; a.click();
  showNotif('💾 تم تنزيل الوثيقة');
}

async function sendCapturedToAI() {
  if (!capturedImageData) return showNotif('⚠️ التقطي وثيقة أولاً', 'warn');
  const provider = currentModel.provider;
  const providerKey = localStorage.getItem('donia_key_' + provider) || (provider === 'claude' ? apiKey : '');
  if (connectionMode !== 'backend' && !providerKey) return showNotif('⚠️ يرجى إعداد مفتاح API أولاً', 'warn');
  if (connectionMode === 'backend' && !backendUrl) return showNotif('⚠️ يرجى إعداد رابط الخادم الخلفي أولاً', 'warn');
  showNotif('🤖 جارٍ تحليل الوثيقة...');
  try {
    const base64 = capturedImageData.split(',')[1];
    const imgMessages = [{ role: 'user', content: [
      { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64 } },
      { type: 'text', text: 'حللي محتوى هذه الوثيقة التعليمية وأعطيني ملخصاً باللغة العربية.' }
    ]}];
    let reply = '';
    if (connectionMode === 'backend') {
      reply = await callBackendAI('claude', 'claude-sonnet-4-6', undefined, imgMessages);
    } else {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': providerKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1500, messages: imgMessages })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error.message);
      reply = data.content?.[0]?.text || '';
    }
    appendMsg('ai', '📷 تحليل الوثيقة الملتقطة:\n\n' + reply);
    showPage_direct('ai');
    showNotif('✅ تم تحليل الوثيقة');
  } catch (e) { showNotif('❌ خطأ في التحليل: ' + e.message, 'error'); }
}

async function openCameraForAI() {
  if (!checkCameraEnabled()) return showNotif('⚠️ الكاميرا معطّلة في الإعدادات', 'warn');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Quick capture: create temporary video
    const video = document.createElement('video');
    video.srcObject = stream; video.autoplay = true;
    video.style.cssText = 'display:none';
    document.body.appendChild(video);
    await new Promise(r => video.onloadedmetadata = r);
    await new Promise(r => setTimeout(r, 500));
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640; canvas.height = video.videoHeight || 480;
    canvas.getContext('2d').drawImage(video, 0, 0);
    capturedImageData = canvas.toDataURL('image/jpeg', 0.85);
    stream.getTracks().forEach(t => t.stop());
    document.body.removeChild(video);
    document.getElementById('chat-input').value = 'حللي هذه الوثيقة الملتقطة بالكاميرا وأعطيني ملخصاً وافياً.';
    sendMessage();
  } catch (e) {
    showNotif('❌ لا يمكن الوصول للكاميرا: ' + e.message, 'error');
  }
}

// ============================================================
// JSON BACKUP & RESTORE
// ============================================================
function getFullState() {
  return {
    version: '2.0', date: new Date().toISOString(),
    profile: userProfile, password: userPassword,
    gradeData, currentClass, allTrimesters,
    ragDocuments: ragDocuments.map(d => ({ name: d.name, size: d.size, added: d.added })),
    signature: savedSignature ? '(محفوظ)' : '',
    settings: {
      model: currentModel, year: userProfile.year || '2025-2026',
      trimester: currentTrimester,
      webSearch: document.getElementById('tog-websearch')?.checked,
      camera: document.getElementById('tog-camera')?.checked,
    }
  };
}

function exportJSON() {
  const state = getFullState();
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.download = 'donia_backup_' + new Date().toISOString().slice(0,10) + '.json';
  a.href = URL.createObjectURL(blob); a.click();
  autoBackup();
  showNotif('✅ تم تصدير النسخة الاحتياطية');
}

function importJSON(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const state = JSON.parse(e.target.result);
      if (state.profile) { userProfile = state.profile; localStorage.setItem('donia_profile', JSON.stringify(userProfile)); }
      if (state.password) { userPassword = state.password; localStorage.setItem('donia_password', state.password); }
      if (state.gradeData) { gradeData = state.gradeData; renderAllData(); }
      if (state.allTrimesters) { allTrimesters = state.allTrimesters; localStorage.setItem('donia_trimesters', JSON.stringify(allTrimesters)); }
      loadProfile();
      showNotif('✅ تم استيراد النسخة الاحتياطية بنجاح');
    } catch(err) { showNotif('❌ خطأ في قراءة الملف: ' + err.message, 'error'); }
  };
  reader.readAsText(file);
  input.value = '';
}

function exportAllExcel() {
  if (gradeData.length === 0) return showNotif('⚠️ لا توجد بيانات للتصدير', 'warn');
  exportToExcel(null);
}

function autoBackup() {
  const backups = JSON.parse(localStorage.getItem('donia_backups') || '[]');
  backups.unshift({ date: new Date().toLocaleString('ar-DZ'), size: JSON.stringify(getFullState()).length });
  if (backups.length > 5) backups.pop();
  localStorage.setItem('donia_backups', JSON.stringify(backups));
  loadBackupList();
}

function loadBackupList() {
  const el = document.getElementById('backup-list');
  if (!el) return;
  const backups = JSON.parse(localStorage.getItem('donia_backups') || '[]');
  if (backups.length === 0) { el.innerHTML = '<div class="backup-item"><span class="backup-date">لا توجد نسخ احتياطية</span></div>'; return; }
  el.innerHTML = backups.map(b => `
    <div class="backup-item">
      <div><div class="backup-date">📁 ${b.date}</div><div class="backup-size">${Math.round(b.size/1024)} KB</div></div>
    </div>
  `).join('');
}

// ============================================================
// NEW YEAR
// ============================================================
function openNewYearModal() {
  const y = parseInt((userProfile.year || '2025-2026').split('-')[0]);
  document.getElementById('newyear-input').value = (y+1) + '-' + (y+2);
  document.getElementById('newyear-modal').classList.add('show');
}
function closeNewYearModal() { document.getElementById('newyear-modal').classList.remove('show'); }
function executeNewYear() {
  const newYear = document.getElementById('newyear-input').value.trim();
  if (!newYear || !newYear.includes('-')) return showNotif('⚠️ أدخل السنة بشكل صحيح (مثال: 2026-2027)', 'warn');
  // Archive current data
  const archive = JSON.parse(localStorage.getItem('donia_archive') || '{}');
  archive[userProfile.year || '2025-2026'] = { gradeData, allTrimesters };
  localStorage.setItem('donia_archive', JSON.stringify(archive));
  // Reset for new year
  gradeData = [];
  allTrimesters = { '1': {}, '2': {}, '3': {} };
  localStorage.setItem('donia_trimesters', JSON.stringify(allTrimesters));
  userProfile.year = newYear;
  localStorage.setItem('donia_profile', JSON.stringify(userProfile));
  document.getElementById('topbar-year').textContent = newYear;
  if (document.getElementById('setting-year')) document.getElementById('setting-year').value = newYear;
  updateDashboard();
  closeNewYearModal();
  autoBackup();
  showNotif('🎉 تم فتح السنة الدراسية ' + newYear + ' بنجاح');
}

// ============================================================
// CLEAR DATA
// ============================================================
function confirmClearData() { document.getElementById('clear-modal').classList.add('show'); }
function clearAllData() {
  gradeData = []; allTrimesters = {'1':{},'2':{},'3':{}}; ragDocuments = [];
  localStorage.removeItem('donia_trimesters'); localStorage.removeItem('donia_rag');
  updateDashboard(); loadRagList();
  document.getElementById('clear-modal').classList.remove('show');
  showNotif('🗑️ تم مسح جميع البيانات');
}

// Auto-save every 5 minutes
setInterval(() => { if (gradeData.length > 0) autoBackup(); }, 5 * 60 * 1000);


// Keyboard shortcut
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeApiModal();
});
