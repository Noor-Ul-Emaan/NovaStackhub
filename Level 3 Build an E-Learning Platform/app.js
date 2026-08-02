// app.js
// Front-end logic for the Pathway e-learning demo.
// State lives in memory only (resets on reload) — see README for how to
// wire this up to a real Node/Express/MongoDB backend.

const state = {
  view: "catalog",
  activeCategory: "All",
  searchTerm: "",
  currentCourseId: null,
  selectedLessonIndex: null,
  user: null,
  // enrollment/progress: { [courseId]: Set of completed lesson indices }
  progress: {}
};

// ---------- helpers ----------

function getCourse(id){
  return COURSES.find(c => c.id === id);
}

function ensureProgress(courseId){
  if(!state.progress[courseId]) state.progress[courseId] = new Set();
  return state.progress[courseId];
}

function isEnrolled(courseId){
  return Object.prototype.hasOwnProperty.call(state.progress, courseId);
}

function courseProgressPct(course){
  const done = state.progress[course.id] ? state.progress[course.id].size : 0;
  return course.lessons.length ? Math.round((done / course.lessons.length) * 100) : 0;
}

function switchView(view){
  state.view = view;
  document.querySelectorAll(".view").forEach(el => el.classList.add("hidden"));
  document.getElementById(`view-${view}`).classList.remove("hidden");
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.dataset.view === view);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });

  if(view === "dashboard") renderDashboard();
}

// ---------- catalog view ----------

function renderChips(){
  const categories = ["All", ...new Set(COURSES.map(c => c.category))];
  const chipsEl = document.getElementById("filterChips");
  chipsEl.innerHTML = categories.map(cat => `
    <button type="button" class="chip ${cat === state.activeCategory ? "active" : ""}" data-cat="${cat}">${cat}</button>
  `).join("");

  chipsEl.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeCategory = btn.dataset.cat;
      renderChips();
      renderCatalog();
    });
  });
}

function renderCatalog(){
  const grid = document.getElementById("courseGrid");
  const term = state.searchTerm.trim().toLowerCase();

  const filtered = COURSES.filter(c => {
    const matchesCategory = state.activeCategory === "All" || c.category === state.activeCategory;
    const matchesSearch = !term ||
      c.title.toLowerCase().includes(term) ||
      c.desc.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  if(filtered.length === 0){
    grid.innerHTML = `<div class="dash-empty">No courses match your search.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(course => {
    const enrolled = isEnrolled(course.id);
    const pct = courseProgressPct(course);
    return `
      <div class="course-card" data-id="${course.id}">
        <span class="badge">${course.category}</span>
        <h3>${course.title}</h3>
        <p class="desc">${course.desc}</p>
        <div class="meta-row">
          <span>${course.lessons.length} lessons · ${course.level}</span>
          <span>${enrolled ? `<span class="enrolled-tag">${pct}% done</span>` : "Not started"}</span>
        </div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", () => openCourse(card.dataset.id));
  });
}

// ---------- course detail view ----------

function openCourse(courseId){
  const course = getCourse(courseId);
  if(!course) return;

  ensureProgress(courseId); // auto-enrolls on first open

  state.currentCourseId = courseId;
  state.selectedLessonIndex = null;

  document.getElementById("courseCategory").textContent = course.category;
  document.getElementById("courseTitle").textContent = course.title;
  document.getElementById("courseMeta").textContent =
    `${course.instructor} · ${course.lessons.length} lessons · ${course.level}`;
  document.getElementById("courseDesc").textContent = course.desc;

  renderLessonList();
  renderLessonPanel();
  updateCourseProgressUI();

  switchView("course");
}

function renderLessonList(){
  const course = getCourse(state.currentCourseId);
  const done = state.progress[course.id];
  const listEl = document.getElementById("lessonList");

  listEl.innerHTML = course.lessons.map((lesson, i) => {
    const completed = done.has(i);
    const selected = state.selectedLessonIndex === i;
    return `
      <div class="lesson-item ${completed ? "completed" : ""} ${selected ? "selected" : ""}" data-index="${i}">
        <div class="check">${completed ? "✓" : ""}</div>
        <div class="info">
          <div class="num">Lesson ${i + 1}</div>
          <div class="title">${lesson.title}</div>
        </div>
        <div class="duration">${lesson.duration}</div>
      </div>
    `;
  }).join("");

  listEl.querySelectorAll(".lesson-item").forEach(item => {
    item.addEventListener("click", () => {
      state.selectedLessonIndex = parseInt(item.dataset.index);
      renderLessonList();
      renderLessonPanel();
    });
  });
}

function renderLessonPanel(){
  const course = getCourse(state.currentCourseId);
  const btn = document.getElementById("markCompleteBtn");
  const videoEl = document.getElementById("lessonVideo");
  const titleEl = document.getElementById("lessonTitle");
  const descEl = document.getElementById("lessonDesc");

  if(state.selectedLessonIndex === null){
    videoEl.innerHTML = "<span>Select a lesson to preview</span>";
    titleEl.textContent = "—";
    descEl.textContent = "Choose a lesson from the list to see its details here.";
    btn.disabled = true;
    btn.textContent = "Mark as complete";
    return;
  }

  const lesson = course.lessons[state.selectedLessonIndex];
  const done = state.progress[course.id];
  const completed = done.has(state.selectedLessonIndex);

  videoEl.innerHTML = `<span>▶ ${lesson.title}<br/><small>(video placeholder — ${lesson.duration})</small></span>`;
  titleEl.textContent = lesson.title;
  descEl.textContent = lesson.desc;
  btn.disabled = false;
  btn.textContent = completed ? "Mark as incomplete" : "Mark as complete";
}

function updateCourseProgressUI(){
  const course = getCourse(state.currentCourseId);
  const pct = courseProgressPct(course);
  document.getElementById("courseProgressFill").style.width = pct + "%";
  document.getElementById("courseProgressLabel").textContent = `${pct}% complete`;
}

document.getElementById("markCompleteBtn").addEventListener("click", () => {
  const course = getCourse(state.currentCourseId);
  const done = ensureProgress(course.id);
  const idx = state.selectedLessonIndex;
  if(idx === null) return;

  if(done.has(idx)) done.delete(idx);
  else done.add(idx);

  renderLessonList();
  renderLessonPanel();
  updateCourseProgressUI();
});

document.getElementById("backToCatalog").addEventListener("click", () => {
  renderChips();
  renderCatalog();
  switchView("catalog");
});

// ---------- dashboard view ----------

function renderDashboard(){
  const enrolledIds = Object.keys(state.progress);
  const summaryEl = document.getElementById("dashSummary");
  const listEl = document.getElementById("dashList");

  const totalLessonsDone = enrolledIds.reduce((sum, id) => sum + state.progress[id].size, 0);
  const coursesCompleted = enrolledIds.filter(id => {
    const course = getCourse(id);
    return courseProgressPct(course) === 100;
  }).length;

  summaryEl.innerHTML = `
    <div class="dash-stat">
      <div class="k">Courses enrolled</div>
      <div class="v">${enrolledIds.length}</div>
    </div>
    <div class="dash-stat">
      <div class="k">Lessons completed</div>
      <div class="v">${totalLessonsDone}</div>
    </div>
    <div class="dash-stat">
      <div class="k">Courses completed</div>
      <div class="v">${coursesCompleted}</div>
    </div>
  `;

  if(enrolledIds.length === 0){
    listEl.innerHTML = `<div class="dash-empty">You haven't started any courses yet — open one from the catalog to begin.</div>`;
    return;
  }

  listEl.innerHTML = enrolledIds.map(id => {
    const course = getCourse(id);
    const pct = courseProgressPct(course);
    return `
      <div class="dash-item" data-id="${id}">
        <div class="info">
          <div class="title">${course.title}</div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="pct">${pct}%</div>
      </div>
    `;
  }).join("");

  listEl.querySelectorAll(".dash-item").forEach(item => {
    item.addEventListener("click", () => openCourse(item.dataset.id));
  });
}

// ---------- nav + search ----------

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    switchView(link.dataset.view);
  });
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  state.searchTerm = e.target.value;
  renderCatalog();
});

// ---------- auth modal (demo only — no real backend) ----------

const authOverlay = document.getElementById("authOverlay");
const authBtn = document.getElementById("authBtn");

function openAuthModal(){ authOverlay.classList.remove("hidden"); }
function closeAuthModal(){ authOverlay.classList.add("hidden"); }
authOverlay.classList.add("hidden");

authBtn.addEventListener("click", () => {
  if(state.user){
    // sign out
    state.user = null;
    authBtn.textContent = "Sign in";
  }else{
    openAuthModal();
  }
});
document.getElementById("authClose").addEventListener("click", closeAuthModal);
authOverlay.addEventListener("click", (e) => { if(e.target === authOverlay) closeAuthModal(); });

document.getElementById("authForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("authName").value.trim();
  state.user = { name };
  authBtn.textContent = name.split(" ")[0];
  closeAuthModal();
});

// ---------- init ----------

renderChips();
renderCatalog();
switchView("catalog");
