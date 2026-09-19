/* ═══════════════════════════════════════════
   MUSCLE GROUPS & ICONS
══════════════════════════════════════════ */
const MUSCLE_GROUPS = [
  {
    id: "chest",
    name: "Chest",
    suggestions: [
      "Bench press",
      "Incline bench press",
      "Dumbbell press",
      "Cable fly",
      "Pec deck",
      "Push-up",
      "Chest dip",
    ],
  },
  {
    id: "back",
    name: "Back",
    suggestions: [
      "Deadlift",
      "Lat pulldown",
      "Barbell row",
      "Seated cable row",
      "Pull-up",
      "T-bar row",
      "Single-arm row",
    ],
  },
  {
    id: "shoulders",
    name: "Shoulders",
    suggestions: [
      "Overhead press",
      "Lateral raise",
      "Front raise",
      "Face pull",
      "Arnold press",
      "Rear delt fly",
    ],
  },
  {
    id: "legs",
    name: "Legs",
    suggestions: [
      "Squat",
      "Leg press",
      "Romanian deadlift",
      "Leg curl",
      "Leg extension",
      "Calf raise",
      "Hack squat",
      "Lunge",
    ],
  },
  {
    id: "biceps",
    name: "Biceps",
    suggestions: [
      "Bicep curl",
      "Hammer curl",
      "Incline dumbbell curl",
      "Cable curl",
      "Preacher curl",
      "Concentration curl",
    ],
  },
  {
    id: "triceps",
    name: "Triceps",
    suggestions: [
      "Skull crushers",
      "Tricep pushdown",
      "Overhead tricep extension",
      "Close-grip bench press",
      "Dips",
    ],
  },
  {
    id: "core",
    name: "Core",
    suggestions: [
      "Plank",
      "Hanging leg raise",
      "Cable crunch",
      "Ab wheel rollout",
      "Decline sit-up",
      "Russian twist",
    ],
  },
  {
    id: "glutes",
    name: "Glutes",
    suggestions: [
      "Hip thrust",
      "Glute bridge",
      "Bulgarian split squat",
      "Cable kickback",
      "Step-up",
      "Sumo squat",
    ],
  },
];
const MG_COLORS = {
  chest: "#E8542C",
  back: "#7C8B99",
  shoulders: "#E0852E",
  legs: "#3D7A5C",
  biceps: "#C9A24B",
  triceps: "#9A8C78",
  core: "#D4537E",
  glutes: "#7F77DD",
};

function mgIcon(id, color, size = 32) {
  const paths = {
    chest: `<circle cx="60" cy="60" r="46" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/><path d="M38 46 Q60 32 82 46 L82 78 Q60 90 38 78 Z" fill="${color}" opacity="0.85"/><line x1="60" y1="46" x2="60" y2="84" stroke="#0E0E10" stroke-width="2" opacity="0.5"/>`,
    back: `<circle cx="60" cy="60" r="46" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/><path d="M44 38 L76 38 L70 60 L78 84 L60 76 L42 84 L50 60 Z" fill="${color}" opacity="0.85"/>`,
    shoulders: `<circle cx="60" cy="60" r="46" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/><circle cx="40" cy="48" r="11" fill="${color}" opacity="0.85"/><circle cx="80" cy="48" r="11" fill="${color}" opacity="0.85"/><path d="M40 60 Q60 50 80 60 L80 76 Q60 70 40 76 Z" fill="${color}" opacity="0.85"/>`,
    legs: `<circle cx="60" cy="60" r="46" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/><path d="M46 34 L54 34 L56 62 L64 90 L56 90 L50 66 L44 90 L36 90 L42 62 Z" fill="${color}" opacity="0.85"/><path d="M66 34 L74 34 L80 62 L86 90 L78 90 L72 66 L66 90 L58 90 L64 62 Z" fill="${color}" opacity="0.85"/>`,
    biceps: `<circle cx="60" cy="60" r="46" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/><path d="M42 46 Q42 30 60 30 Q78 30 78 46 L78 60 Q60 72 42 60 Z" fill="${color}" opacity="0.85"/>`,
    triceps: `<circle cx="60" cy="60" r="46" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/><path d="M44 36 L76 36 L72 64 L60 76 L48 64 Z" fill="${color}" opacity="0.85"/>`,
    core: `<circle cx="60" cy="60" r="46" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/><rect x="44" y="36" width="32" height="48" rx="6" fill="${color}" opacity="0.85"/><line x1="60" y1="36" x2="60" y2="84" stroke="#0E0E10" stroke-width="2" opacity="0.5"/><line x1="44" y1="52" x2="76" y2="52" stroke="#0E0E10" stroke-width="2" opacity="0.5"/><line x1="44" y1="68" x2="76" y2="68" stroke="#0E0E10" stroke-width="2" opacity="0.5"/>`,
    glutes: `<circle cx="60" cy="60" r="46" fill="none" stroke="${color}" stroke-width="2.5" opacity="0.4"/><path d="M40 40 Q60 30 80 40 Q84 64 70 82 Q60 88 50 82 Q36 64 40 40 Z" fill="${color}" opacity="0.85"/>`,
  };
  return `<svg viewBox="0 0 120 120" width="${size}" height="${size}">${paths[id] || paths.chest}</svg>`;
}

/* ═══════════════════════════════════════════
   STORAGE
══════════════════════════════════════════ */
const STORE_KEY = "ironledger_v3";
function freshStore() {
  return {
    profile: {
      weight: null,
      height: null,
      age: null,
      sex: "m",
      units: "kg",
    },
    exercises: [], // {name, muscleGroup, isCustom}
    sessions: [], // {id, exercise, date, sets:[{weight,reps}]}
  };
}
function loadStore() {
  try {
    const r = localStorage.getItem(STORE_KEY);
    if (r) return JSON.parse(r);
  } catch (e) {}
  // migrate from v2 / v1
  for (const OLD of ["ironledger_v2", "ironledger_v1"]) {
    try {
      const old = localStorage.getItem(OLD);
      if (!old) continue;
      const d = JSON.parse(old);
      const store = freshStore();
      store.profile = d.profile || store.profile;
      store.sessions = d.sessions || [];
      const exList = Array.isArray(d.exercises) ? d.exercises : [];
      exList.forEach((e) => {
        if (typeof e === "string")
          store.exercises.push({
            name: e,
            muscleGroup: "chest",
            isCustom: true,
          });
        else store.exercises.push(e);
      });
      return store;
    } catch (e) {}
  }
  return freshStore();
}
function save() {
  // Mirror to localStorage as a cache, then push the full store to MySQL.
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
  syncToDB();
}
let _dbReady = false; // sync only after the initial server load has finished
function syncToDB() {
  if (!_dbReady) return;
  clearTimeout(window._syncT);
  window._syncT = setTimeout(() => {
    fetch("api/data.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store),
    }).catch(() => {});
  }, 250);
}
let store = freshStore(); // populated asynchronously from the server in initApp()

function exObj(name) {
  return store.exercises.find((e) => e.name === name);
}
function exInGroup(gid) {
  return store.exercises.filter((e) => e.muscleGroup === gid);
}
function allExNames() {
  return store.exercises.map((e) => e.name);
}

/* ═══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window._tt);
  window._tt = setTimeout(() => t.classList.remove("show"), 2200);
}
function est1RM(w, r) {
  return r <= 1 ? w : w * (1 + r / 30);
}
function sessionBest1RM(s) {
  return s.sets.reduce(
    (b, set) => Math.max(b, est1RM(set.weight, set.reps)),
    0,
  );
}
function sessionVolume(s) {
  return s.sets.reduce((b, set) => b + set.weight * set.reps, 0);
}
function sessionTopWeight(s) {
  return s.sets.reduce((b, set) => Math.max(b, set.weight), 0);
}
function fmt(n) {
  return Math.round(n * 10) / 10;
}
const U = () => (store.profile.units === "lb" ? "lb" : "kg");

/* ═══════════════════════════════════════════
   TAB / VIEW ROUTING
══════════════════════════════════════════ */
function showView(name) {
  document
    .querySelectorAll(".tab")
    .forEach((t) =>
      t.classList.toggle("active", t.dataset.view === name),
    );
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  const el = document.getElementById("view-" + name);
  if (el) el.classList.add("active");
  if (name === "dashboard") renderDashboard();
  if (name === "progress") renderProgress();
  if (name === "insights") renderInsights();
}
document.querySelectorAll(".tab").forEach((t) => {
  if (t.id === "tab-group") return;
  t.addEventListener("click", () => showView(t.dataset.view));
});

/* ═══════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════ */
function computeStreak() {
  const dates = new Set(store.sessions.map((s) => s.date));
  let streak = 0,
    cur = new Date();
  cur.setHours(0, 0, 0, 0);
  for (let i = 0; i < 3650; i++) {
    const iso = cur.toISOString().slice(0, 10);
    if (dates.has(iso)) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    } else if (i === 0) {
      cur.setDate(cur.getDate() - 1);
    } else break;
  }
  return streak;
}
function findLatestPR() {
  let best = null;
  [...new Set(store.sessions.map((s) => s.exercise))].forEach((ex) => {
    const ss = store.sessions
      .filter((s) => s.exercise === ex)
      .sort((a, b) => a.date.localeCompare(b.date));
    let runBest = 0,
      prS = null;
    ss.forEach((s) => {
      const rm = sessionBest1RM(s);
      if (rm > runBest) {
        runBest = rm;
        prS = s;
      }
    });
    if (prS && (!best || prS.date > best.date))
      best = { exercise: ex, date: prS.date, weight: fmt(runBest) };
  });
  return best;
}
function renderDashboard() {
  document.getElementById("dash-date").textContent =
    new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  document.getElementById("dash-streak-num").textContent =
    computeStreak();
  document.getElementById("dash-total").textContent =
    store.sessions.length;
  const wa = new Date();
  wa.setDate(wa.getDate() - 7);
  document.getElementById("dash-week").textContent =
    store.sessions.filter((s) => new Date(s.date) >= wa).length;
  const pr = findLatestPR();
  document.getElementById("dash-pr").textContent = pr
    ? `${pr.exercise.split(" ")[0]} ${pr.weight}${U()}`
    : "—";
  const grid = document.getElementById("muscle-grid");
  grid.innerHTML = "";
  MUSCLE_GROUPS.forEach((g) => {
    const cnt = exInGroup(g.id).length;
    const tile = document.createElement("div");
    tile.className = "muscle-tile";
    tile.innerHTML = `${mgIcon(g.id, MG_COLORS[g.id], 32)}<div class="m-name">${g.name}</div><div class="m-count">${cnt} exercise${cnt === 1 ? "" : "s"}</div>`;
    tile.addEventListener("click", () => openGroup(g.id));
    grid.appendChild(tile);
  });
}

/* ═══════════════════════════════════════════
   GROUP DETAIL
══════════════════════════════════════════ */
let currentGroup = null;
function openGroup(gid) {
  currentGroup = gid;
  const g = MUSCLE_GROUPS.find((x) => x.id === gid);
  document.getElementById("gh-icon").innerHTML = mgIcon(
    gid,
    MG_COLORS[gid],
    38,
  );
  document.getElementById("gh-name").textContent = g.name;
  renderGroupList();
  renderSuggestions();
  // hide add panel
  document.getElementById("add-ex-panel").style.display = "none";
  document.getElementById("add-ex-toggle").classList.remove("open");
  document.getElementById("add-ex-hint").textContent =
    "Add an exercise to this group";
  showView("group");
}
document
  .getElementById("group-back")
  .addEventListener("click", () => showView("dashboard"));

function renderGroupList() {
  const el = document.getElementById("group-ex-list");
  el.innerHTML = "";
  const exs = exInGroup(currentGroup);
  if (exs.length === 0) {
    el.innerHTML =
      '<div class="empty-state" style="padding:24px 0;">No exercises here yet.<br>Tap + to add your first one.</div>';
    return;
  }
  exs.forEach((ex) => {
    const ss = store.sessions.filter((s) => s.exercise === ex.name);
    const last = ss.sort((a, b) => b.date.localeCompare(a.date))[0];
    const row = document.createElement("div");
    row.className = "group-ex-row";
    row.innerHTML = `
      <div style="flex:1;min-width:0;">
        <span class="ex-name">${ex.name}</span>${ex.isCustom ? '<span class="custom-badge">custom</span>' : ""}
      </div>
      <span class="ex-meta">${last ? "last: " + last.date : "no logs yet"}</span>
      <button class="ex-delete-btn" title="Delete exercise" data-name="${ex.name}">🗑</button>
    `;
    // click on row body → go to log (but not the delete btn)
    row.addEventListener("click", (e) => {
      if (e.target.closest(".ex-delete-btn")) return;
      selectExercise(ex.name);
      showView("log");
    });
    // delete button
    row.querySelector(".ex-delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      confirmModal(
        "Delete exercise?",
        `Remove "<strong>${ex.name}</strong>" from this group? Your session history for this exercise will still be kept.`,
        "Delete",
        () => {
          store.exercises = store.exercises.filter(
            (x) => x.name !== ex.name,
          );
          save();
          populateExerciseSelects();
          renderGroupList();
          renderSuggestions();
          toast("Deleted " + ex.name);
        },
      );
    });
    el.appendChild(row);
  });
}
function renderSuggestions() {
  const g = MUSCLE_GROUPS.find((x) => x.id === currentGroup);
  const existing = new Set(
    exInGroup(currentGroup).map((e) => e.name.toLowerCase()),
  );
  const grid = document.getElementById("suggestion-grid");
  grid.innerHTML = "";
  g.suggestions.forEach((s) => {
    const used = existing.has(s.toLowerCase());
    const chip = document.createElement("div");
    chip.className = "sug-chip" + (used ? " used" : "");
    chip.textContent = s;
    if (!used)
      chip.addEventListener("click", () => addExercise(s, currentGroup));
    grid.appendChild(chip);
  });
}
function addExercise(name, gid) {
  if (
    store.exercises.some(
      (e) => e.name.toLowerCase() === name.toLowerCase(),
    )
  ) {
    toast("Already exists");
    return;
  }
  store.exercises.push({ name, muscleGroup: gid, isCustom: true });
  save();
  renderGroupList();
  renderSuggestions();
  populateExerciseSelects();
  toast("Added " + name);
}

// toggle add panel
document.getElementById("add-ex-toggle").addEventListener("click", () => {
  const panel = document.getElementById("add-ex-panel");
  const btn = document.getElementById("add-ex-toggle");
  const hint = document.getElementById("add-ex-hint");
  const open = panel.style.display === "none";
  panel.style.display = open ? "block" : "none";
  btn.classList.toggle("open", open);
  hint.textContent = open ? "Close" : "Add an exercise to this group";
});
document
  .getElementById("group-custom-add")
  .addEventListener("click", () => {
    const inp = document.getElementById("group-custom-name");
    const name = inp.value.trim();
    if (!name) return;
    addExercise(name, currentGroup);
    inp.value = "";
  });

/* ═══════════════════════════════════════════
   LOG VIEW — exercise select
══════════════════════════════════════════ */
function populateExerciseSelects() {
  const names = allExNames();
  [
    document.getElementById("log-exercise"),
    document.getElementById("progress-exercise"),
  ].forEach((sel) => {
    const prev = sel.value;
    sel.innerHTML = "";
    if (names.length === 0) {
      const o = document.createElement("option");
      o.textContent = "— no exercises yet —";
      sel.appendChild(o);
      return;
    }
    names.forEach((n) => {
      const o = document.createElement("option");
      o.value = n;
      o.textContent = n;
      sel.appendChild(o);
    });
    if (names.includes(prev)) sel.value = prev;
  });
  renderPrevBanner();
  renderHistory();
}
function selectExercise(name) {
  populateExerciseSelects();
  document.getElementById("log-exercise").value = name;
  document.getElementById("progress-exercise").value = name;
  renderPrevBanner();
  renderHistory();
  resetSetBlocks();
}

document.getElementById("log-exercise").addEventListener("change", () => {
  renderPrevBanner();
  renderHistory();
  resetSetBlocks();
});

/* ═══════════════════════════════════════════
   PREVIOUS WORKOUT BANNER
══════════════════════════════════════════ */
function renderPrevBanner() {
  const ex = document.getElementById("log-exercise").value;
  const ss = store.sessions
    .filter((s) => s.exercise === ex)
    .sort((a, b) => b.date.localeCompare(a.date));
  const banner = document.getElementById("prev-banner");
  if (ss.length === 0) {
    banner.style.display = "none";
    return;
  }
  const last = ss[0];
  document.getElementById("prev-banner-sets").textContent = last.sets
    .map((s) => `${s.weight}${U()}×${s.reps}`)
    .join("  ·  ");
  banner.style.display = "block";
}

/* ═══════════════════════════════════════════
   PICKER OVERLAY (singleton floating popup)
══════════════════════════════════════════ */
const OVERLAY_EL = document.createElement("div");
OVERLAY_EL.className = "picker-overlay hidden";
OVERLAY_EL.id = "picker-overlay";
document.body.appendChild(OVERLAY_EL);

let _overlayTarget = null; // {input, type, exName}

function positionOverlay(input) {
  const rect = input.getBoundingClientRect();
  const OW = 320,
    OH = 160;
  let left = rect.left;
  let top = rect.top - OH - 10;
  // flip below if no room above
  if (top < 8) {
    top = rect.bottom + 10;
  }
  // clamp to viewport
  if (left + OW > window.innerWidth - 8)
    left = window.innerWidth - OW - 8;
  if (left < 8) left = 8;
  OVERLAY_EL.style.left = left + "px";
  OVERLAY_EL.style.top = top + "px";
}

function buildWeightOverlay(exName, input) {
  const std =
    store.profile.units === "lb" ? STD_WEIGHTS_LB : STD_WEIGHTS_KG;
  const ss = store.sessions
    .filter((s) => s.exercise === exName)
    .sort((a, b) => b.date.localeCompare(a.date));
  let prevWeights = [],
    anchor = null;
  if (ss.length > 0) {
    prevWeights = [...new Set(ss[0].sets.map((s) => s.weight))];
    anchor = Math.max(...prevWeights);
  }
  let nearby =
    anchor != null
      ? std
          .filter((w) => w >= anchor * 0.7 && w <= anchor * 1.5)
          .slice(0, 12)
      : std.slice(0, 12);
  if (anchor != null && !nearby.includes(anchor)) nearby.push(anchor);
  nearby.sort((a, b) => a - b);

  const curVal = parseFloat(input.value);
  let html = "";
  if (prevWeights.length > 0) {
    html += `<div class="picker-section-label">Previous</div><div class="picker-row">`;
    html += prevWeights
      .map(
        (w) =>
          `<div class="bubble prev-bubble${w === curVal ? " selected" : ""}" data-val="${w}">${w}${U()}</div>`,
      )
      .join("");
    html += "</div>";
  }
  html += `<div class="picker-section-label">Standard</div><div class="picker-row">`;
  html += nearby
    .map(
      (w) =>
        `<div class="bubble${w === curVal ? " selected" : ""}" data-val="${w}">${w}${U()}</div>`,
    )
    .join("");
  html += "</div>";

  OVERLAY_EL.innerHTML = html;
  OVERLAY_EL.querySelectorAll(".bubble").forEach((b) => {
    b.addEventListener("mousedown", (e) => {
      e.preventDefault(); // prevent input blur before click fires
      input.value = b.dataset.val;
      input.dispatchEvent(new Event("input"));
      // update selected state
      OVERLAY_EL.querySelectorAll(".bubble").forEach((x) =>
        x.classList.remove("selected"),
      );
      b.classList.add("selected");
      closeOverlay();
    });
  });
}

function buildRepOverlay(exName, input) {
  const ss = store.sessions
    .filter((s) => s.exercise === exName)
    .sort((a, b) => b.date.localeCompare(a.date));
  let suggestRep = null;
  if (ss.length > 0 && ss[0].sets.length > 0)
    suggestRep = ss[0].sets[0].reps;
  const curVal = parseInt(input.value);
  const allReps = [
    ...new Set([...REP_OPTIONS, ...(suggestRep ? [suggestRep] : [])]),
  ].sort((a, b) => a - b);

  let html = "";
  if (suggestRep) {
    html += `<div class="picker-section-label">Previous</div><div class="picker-row">`;
    html += `<div class="bubble prev-bubble${suggestRep === curVal ? " selected" : ""}" data-val="${suggestRep}">${suggestRep}</div>`;
    html += "</div>";
  }
  html += `<div class="picker-section-label">Standard</div><div class="picker-row">`;
  html += REP_OPTIONS.map(
    (r) =>
      `<div class="bubble${r === curVal ? " selected" : ""}" data-val="${r}">${r}</div>`,
  ).join("");
  html += "</div>";

  OVERLAY_EL.innerHTML = html;
  OVERLAY_EL.querySelectorAll(".bubble").forEach((b) => {
    b.addEventListener("mousedown", (e) => {
      e.preventDefault();
      input.value = b.dataset.val;
      input.dispatchEvent(new Event("input"));
      OVERLAY_EL.querySelectorAll(".bubble").forEach((x) =>
        x.classList.remove("selected"),
      );
      b.classList.add("selected");
      closeOverlay();
    });
  });
}

function openOverlay(input, type, exName) {
  _overlayTarget = { input, type, exName };
  if (type === "weight") buildWeightOverlay(exName, input);
  else buildRepOverlay(exName, input);
  OVERLAY_EL.classList.remove("hidden");
  positionOverlay(input);
}

function closeOverlay() {
  OVERLAY_EL.classList.add("hidden");
  _overlayTarget = null;
}

// Close overlay when clicking outside
document.addEventListener(
  "mousedown",
  (e) => {
    if (
      !OVERLAY_EL.contains(e.target) &&
      e.target !== (_overlayTarget && _overlayTarget.input)
    ) {
      closeOverlay();
    }
  },
  true,
);

// Reposition on scroll/resize
window.addEventListener(
  "scroll",
  () => {
    if (_overlayTarget) positionOverlay(_overlayTarget.input);
  },
  true,
);
window.addEventListener("resize", () => {
  if (_overlayTarget) positionOverlay(_overlayTarget.input);
});

/* ═══════════════════════════════════════════
   SET ROWS — clean original style with overlay
══════════════════════════════════════════ */
const STD_WEIGHTS_KG = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100,
  110, 120, 140, 160,
];
const STD_WEIGHTS_LB = [
  22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132, 143, 154, 176, 198, 220,
  242, 264, 308, 352,
];
const REP_OPTIONS = [4, 5, 6, 8, 10, 12, 15, 16, 18, 20];

let setRowCount = 0;

function createSetRow(idx, exName) {
  const row = document.createElement("div");
  row.className = "set-row";
  row.innerHTML = `
    <span class="set-label">#${idx}</span>
    <div class="set-cell">
      <input type="number" step=".5" placeholder="kg" class="w-input" autocomplete="off">
    </div>
    <div class="set-cell">
      <input type="number" step="1" placeholder="reps" class="r-input" autocomplete="off">
    </div>
    <span class="rm">✕</span>
  `;
  const wInput = row.querySelector(".w-input");
  const rInput = row.querySelector(".r-input");

  // pre-fill from last session
  const ss = store.sessions
    .filter((s) => s.exercise === exName)
    .sort((a, b) => b.date.localeCompare(a.date));
  if (ss.length > 0) {
    const lastSet = ss[0].sets[Math.min(idx - 1, ss[0].sets.length - 1)];
    if (lastSet) {
      wInput.value = lastSet.weight;
      rInput.value = lastSet.reps;
    }
  }

  wInput.addEventListener("focus", () =>
    openOverlay(wInput, "weight", exName),
  );
  rInput.addEventListener("focus", () =>
    openOverlay(rInput, "rep", exName),
  );
  // keep overlay in sync while typing
  wInput.addEventListener("input", () => {
    if (_overlayTarget && _overlayTarget.input === wInput)
      buildWeightOverlay(exName, wInput);
  });
  rInput.addEventListener("input", () => {
    if (_overlayTarget && _overlayTarget.input === rInput)
      buildRepOverlay(exName, rInput);
  });

  row.querySelector(".rm").addEventListener("click", () => {
    row.remove();
    renumberRows();
  });
  return row;
}

function renumberRows() {
  document.querySelectorAll("#set-rows .set-row").forEach((r, i) => {
    r.querySelector(".set-label").textContent = "#" + (i + 1);
  });
  setRowCount = document.querySelectorAll("#set-rows .set-row").length;
}

function resetSetBlocks() {
  const wrap = document.getElementById("set-rows");
  wrap.innerHTML = "";
  setRowCount = 0;
  const ex = document.getElementById("log-exercise").value;
  addSetRow(ex);
  addSetRow(ex);
}

function addSetRow(exName) {
  setRowCount++;
  const ex = exName || document.getElementById("log-exercise").value;
  document
    .getElementById("set-rows")
    .appendChild(createSetRow(setRowCount, ex));
}
document.getElementById("add-set-btn").addEventListener("click", () => {
  addSetRow();
});

/* ═══════════════════════════════════════════
   CONFIRM MODAL
══════════════════════════════════════════ */
function confirmModal(title, bodyHTML, confirmLabel, onYes) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-title">${title}</div>
      <div class="modal-body">${bodyHTML}</div>
      <div class="modal-btns">
        <button class="btn-ghost" id="modal-no">No</button>
        <button class="btn" id="modal-yes">${confirmLabel}</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.querySelector("#modal-no").addEventListener("click", close);
  overlay.querySelector("#modal-yes").addEventListener("click", () => {
    close();
    onYes();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
}

/* SUCCESS FLASH */
function showSuccessFlash(msg) {
  const el = document.createElement("div");
  el.className = "success-flash";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

/* ═══════════════════════════════════════════
   SAVE SESSION — one per day per exercise
══════════════════════════════════════════ */
document
  .getElementById("save-session-btn")
  .addEventListener("click", () => {
    const btn = document.getElementById("save-session-btn");
    if (btn.disabled) return;
    const ex = document.getElementById("log-exercise").value;
    const date = document.getElementById("log-date").value;
    if (!date) {
      toast("Pick a date");
      return;
    }
    const sets = [];
    document.querySelectorAll("#set-rows .set-row").forEach((row) => {
      const w = parseFloat(row.querySelector(".w-input").value);
      const r = parseInt(row.querySelector(".r-input").value);
      if (!isNaN(w) && !isNaN(r) && w >= 0 && r > 0)
        sets.push({ weight: w, reps: r });
    });
    if (sets.length === 0) {
      toast("Add at least one valid set");
      return;
    }

    // EDIT MODE
    if (_editingSessionId) {
      confirmModal(
        "Replace session?",
        `Do you want to replace the <strong>${ex}</strong> session on <strong>${date}</strong> with your new sets?`,
        "Yes, replace",
        () => {
          const idx = store.sessions.findIndex(
            (s) => s.id === _editingSessionId,
          );
          if (idx >= 0) {
            store.sessions[idx].sets = sets;
            store.sessions[idx].date = date;
          }
          store.sessions.sort((a, b) => a.date.localeCompare(b.date));
          save();
          _editingSessionId = null;
          showSuccessFlash("✓ Session Updated!");
          // reset button
          btn.textContent = "Save session";
          btn.classList.remove("save-btn-done");
          btn.disabled = false;
          delete btn.dataset.editMode;
          renderHistory();
          renderPrevBanner();
          resetSetBlocks();
          showView("log");
        },
      );
      return;
    }

    // NEW SESSION — one per day per exercise
    const existing = store.sessions.find(
      (s) => s.exercise === ex && s.date === date,
    );
    if (existing) {
      toast(
        "Already logged " +
          ex +
          " on " +
          date +
          " — use ✏ in history to edit it",
      );
      return;
    }
    store.sessions.push({
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      exercise: ex,
      date,
      sets,
    });
    store.sessions.sort((a, b) => a.date.localeCompare(b.date));
    save();
    // saved-state button
    btn.textContent = "✓ Session Saved";
    btn.classList.add("save-btn-done");
    btn.disabled = true;
    showSuccessFlash("✓ Session Saved!");
    renderPrevBanner();
    renderHistory();
    setTimeout(() => {
      btn.textContent = "Save session";
      btn.classList.remove("save-btn-done");
      btn.disabled = false;
      resetSetBlocks();
    }, 3000);
  });

/* ═══════════════════════════════════════════
   HISTORY + EDIT SESSION
══════════════════════════════════════════ */
let _editingSessionId = null; // track which session is being edited

function renderHistory() {
  const ex = document.getElementById("log-exercise").value;
  document.getElementById("history-title").textContent =
    "History — " + ex;
  const ss = store.sessions
    .filter((s) => s.exercise === ex)
    .sort((a, b) => b.date.localeCompare(a.date));
  const el = document.getElementById("history-list");
  if (ss.length === 0) {
    el.innerHTML =
      '<div class="empty-state">No sessions logged yet.</div>';
    return;
  }
  el.innerHTML = "";
  ss.forEach((s) => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <span class="history-date">${s.date}</span>
      <span class="history-sets">${s.sets.map((x) => `${x.weight}${U()}×${x.reps}`).join(" · ")}</span>
      <span class="history-vol">vol ${Math.round(sessionVolume(s))}</span>
      <span class="history-edit" data-sid="${s.id}" title="Edit this session">✏</span>
    `;
    item
      .querySelector(".history-edit")
      .addEventListener("click", () => startEditSession(s.id));
    el.appendChild(item);
  });
}

function startEditSession(sessionId) {
  const s = store.sessions.find((x) => x.id === sessionId);
  if (!s) return;
  _editingSessionId = sessionId;
  // populate log form with this session's data
  document.getElementById("log-exercise").value = s.exercise;
  document.getElementById("log-date").value = s.date;
  resetSetBlocks();
  // clear auto-prefill and fill with actual session sets
  const wrap = document.getElementById("set-rows");
  wrap.innerHTML = "";
  setRowCount = 0;
  s.sets.forEach((set, i) => {
    setRowCount++;
    const row = createSetRow(setRowCount, s.exercise);
    row.querySelector(".w-input").value = set.weight;
    row.querySelector(".r-input").value = set.reps;
    wrap.appendChild(row);
  });
  renderPrevBanner();
  // change save button to "Save changes"
  const btn = document.getElementById("save-session-btn");
  btn.textContent = "Save changes";
  btn.classList.remove("save-btn-done");
  btn.disabled = false;
  btn.dataset.editMode = "1";
  showView("log");
  // scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// We patch the save button click to handle edit mode by checking at the top
// Edit mode is detected via _editingSessionId — the main save handler handles both cases

/* ═══════════════════════════════════════════
   PROGRESS VIEW
══════════════════════════════════════════ */
document
  .getElementById("progress-exercise")
  .addEventListener("change", renderProgress);
function renderProgress() {
  const ex = document.getElementById("progress-exercise").value;
  const ss = store.sessions
    .filter((s) => s.exercise === ex)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (ss.length === 0) {
    ["st-first", "st-best", "st-delta"].forEach(
      (id) => (document.getElementById(id).textContent = "—"),
    );
    ["st-first-date", "st-best-date", "st-delta-pct"].forEach(
      (id) => (document.getElementById(id).textContent = ""),
    );
    drawExChart([]);
    populateCmpSelects([]);
    return;
  }
  const firstTop = ss[0].sets.reduce(
    (b, s) => (s.weight > b.weight ? s : b),
    ss[0].sets[0],
  );
  let bestRM = 0,
    bestS = ss[0];
  ss.forEach((s) => {
    const rm = sessionBest1RM(s);
    if (rm > bestRM) {
      bestRM = rm;
      bestS = s;
    }
  });
  document.getElementById("st-first").textContent =
    `${firstTop.weight}${U()}`;
  document.getElementById("st-first-date").textContent = ss[0].date;
  document.getElementById("st-best").textContent = `${fmt(bestRM)}${U()}`;
  document.getElementById("st-best-date").textContent =
    "on " + bestS.date;
  const firstRM = est1RM(firstTop.weight, firstTop.reps);
  const diff = bestRM - firstRM;
  const pct = firstRM > 0 ? (diff / firstRM) * 100 : 0;
  const dEl = document.getElementById("st-delta");
  dEl.textContent = (diff >= 0 ? "+" : "") + fmt(diff) + U();
  dEl.className = "s-val" + (diff >= 0 ? " up" : "");
  const pEl = document.getElementById("st-delta-pct");
  pEl.textContent = (diff >= 0 ? "+" : "") + fmt(pct) + "% since first";
  pEl.className = "s-sub" + (diff >= 0 ? " pos" : "");
  drawExChart(ss);
  populateCmpSelects(ss);
}
function steppedPath(pts, xf, yf) {
  // horizontal then vertical — classic step chart
  if (pts.length === 0) return "";
  let d = `M${xf(0)},${yf(pts[0].v)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` H${xf(i)} V${yf(pts[i].v)}`;
  }
  return d;
}

function drawExChart(sessions) {
  const svg = document.getElementById("progress-chart");
  const W = 680,
    H = 210,
    pL = 54,
    pR = 20,
    pT = 20,
    pB = 32;
  if (sessions.length === 0) {
    svg.innerHTML = `<text x="${W / 2}" y="${H / 2}" text-anchor="middle" fill="#8B8680" font-size="13" font-family="Inter">No data yet</text>`;
    return;
  }
  const pts = sessions.map((s) => ({ d: s.date, v: sessionBest1RM(s) }));
  const rawMax = Math.max(...pts.map((p) => p.v));
  const step =
    rawMax <= 50 ? 5 : rawMax <= 100 ? 10 : rawMax <= 200 ? 20 : 50;
  const maxV = Math.ceil(rawMax / step) * step + step * 1.5;
  const minV = 0;
  const xf = (i) =>
    pL +
    (pts.length === 1
      ? (W - pL - pR) / 2
      : (i * (W - pL - pR)) / (pts.length - 1));
  const yf = (v) => pT + (H - pT - pB) * (1 - (v - minV) / (maxV - minV));
  const uid = "ex" + Date.now();

  // Smooth bezier path
  function smoothPath(pts) {
    if (pts.length === 1) return `M${xf(0)},${yf(pts[0].v)}`;
    let d = `M${xf(0)},${yf(pts[0].v)}`;
    for (let i = 1; i < pts.length; i++) {
      const x1 = xf(i - 1),
        y1 = yf(pts[i - 1].v),
        x2 = xf(i),
        y2 = yf(pts[i].v);
      const cpx = (x1 + x2) / 2;
      d += ` C${cpx},${y1} ${cpx},${y2} ${x2},${y2}`;
    }
    return d;
  }
  const sPath = steppedPath(pts, xf, yf);
  const bPath = smoothPath(pts);
  const areaPath =
    bPath + ` L${xf(pts.length - 1)},${H - pB} H${xf(0)} Z`;

  // Y grid
  let grid = "";
  const tickCount = Math.min(5, Math.floor(maxV / step));
  for (let t = 0; t <= tickCount; t++) {
    const v = t * (maxV / tickCount);
    const yy = yf(v);
    grid += `<line x1="${pL}" y1="${yy}" x2="${W - pR}" y2="${yy}" stroke="#2A2A2E" stroke-width="1"/>`;
    grid += `<text x="${pL - 8}" y="${yy + 4}" text-anchor="end" fill="#8B8680" font-size="10" font-family="JetBrains Mono">${Math.round(v)}${U()}</text>`;
  }

  // Dots + labels
  let dots = "",
    dotLabels = "",
    xLabels = "";
  pts.forEach((p, i) => {
    const cx = xf(i),
      cy = yf(p.v);
    const show =
      pts.length <= 7 ||
      i === 0 ||
      i === pts.length - 1 ||
      i % Math.ceil(pts.length / 5) === 0;
    // glow ring
    dots += `<circle cx="${cx}" cy="${cy}" r="8" fill="#E8542C" opacity="0.15"/>`;
    dots += `<circle cx="${cx}" cy="${cy}" r="5" fill="#E8542C" stroke="#0E0E10" stroke-width="2"/>`;
    if (show) {
      dotLabels += `<rect x="${cx - 18}" y="${cy - 26}" width="36" height="16" rx="4" fill="#2A2010" opacity="0.9"/>`;
      dotLabels += `<text x="${cx}" y="${cy - 15}" text-anchor="middle" fill="#E8542C" font-size="10" font-weight="700" font-family="JetBrains Mono">${Math.round(p.v)}${U()}</text>`;
      xLabels += `<text x="${cx}" y="${H - 12}" text-anchor="middle" fill="#8B8680" font-size="9" font-family="JetBrains Mono">${p.d.slice(5)}</text>`;
    }
  });

  svg.innerHTML = `
    <defs>
      <linearGradient id="agrad-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#E8542C" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#E8542C" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    ${grid}
    <path d="${areaPath}" fill="url(#agrad-${uid})"/>
    <path d="${bPath}" fill="none" stroke="#E8542C" stroke-width="2.5" stroke-linejoin="round"/>
    ${dots}${dotLabels}${xLabels}
  `;
}
function populateCmpSelects(sessions) {
  ["cmp-a", "cmp-b"].forEach((id) => {
    const s = document.getElementById(id);
    s.innerHTML = "";
    sessions.forEach((sess) => {
      const o = document.createElement("option");
      o.value = sess.id;
      o.textContent = `${sess.date} (${sessionTopWeight(sess)}${U()})`;
      s.appendChild(o);
    });
  });
  if (sessions.length >= 2) {
    document.getElementById("cmp-a").value = sessions[0].id;
    document.getElementById("cmp-b").value =
      sessions[sessions.length - 1].id;
  }
  renderCmp(sessions);
}
function renderCmp(sessions) {
  const ex = document.getElementById("progress-exercise").value;
  const ss = sessions || store.sessions.filter((s) => s.exercise === ex);
  const a = ss.find(
    (s) => s.id === document.getElementById("cmp-a").value,
  );
  const b = ss.find(
    (s) => s.id === document.getElementById("cmp-b").value,
  );
  const el = document.getElementById("cmp-result");
  if (!a || !b) {
    el.innerHTML = "";
    return;
  }
  const aRM = sessionBest1RM(a),
    bRM = sessionBest1RM(b),
    diff = bRM - aRM,
    pct = aRM > 0 ? (diff / aRM) * 100 : 0;
  el.innerHTML = `<div class="stat-grid" style="grid-template-columns:1fr 1fr;margin-top:10px;"><div class="stat-box"><div class="s-label">${a.date}</div><div class="s-val">${fmt(aRM)}${U()}</div></div><div class="stat-box"><div class="s-label">${b.date}</div><div class="s-val ${diff >= 0 ? "up" : ""}">${fmt(bRM)}${U()}</div></div></div><p class="note" style="text-align:center;font-size:13px;">${diff >= 0 ? "Improved" : "Down"} by <strong>${Math.abs(fmt(diff))}${U()}</strong> (${diff >= 0 ? "+" : ""}${fmt(pct)}%) in est. 1RM.</p>`;
}
["cmp-a", "cmp-b"].forEach((id) =>
  document
    .getElementById(id)
    .addEventListener("change", () => renderCmp()),
);

/* ═══════════════════════════════════════════
   INSIGHTS — MUSCLE GROUP CHART
══════════════════════════════════════════ */
let mgChartGroup = "chest",
  mgChartRange = "week";

function renderMGGroupBtns() {
  const wrap = document.getElementById("mg-group-btns");
  wrap.innerHTML = "";
  MUSCLE_GROUPS.forEach((g) => {
    const b = document.createElement("button");
    b.className =
      "mg-group-btn" + (g.id === mgChartGroup ? " active" : "");
    b.textContent = g.name;
    b.dataset.gid = g.id;
    b.addEventListener("click", () => {
      mgChartGroup = g.id;
      renderMGGroupBtns();
      drawMGChart();
    });
    wrap.appendChild(b);
  });
}
document.querySelectorAll(".mg-toggle").forEach((b) => {
  b.addEventListener("click", () => {
    mgChartRange = b.dataset.range;
    document
      .querySelectorAll(".mg-toggle")
      .forEach((x) => x.classList.toggle("active", x === b));
    drawMGChart();
  });
});

function drawMGChart() {
  const svg = document.getElementById("mg-chart");
  const color = MG_COLORS[mgChartGroup] || "#E8542C";
  const gName = MUSCLE_GROUPS.find((g) => g.id === mgChartGroup).name;
  const now = new Date();
  let cutoff = new Date(now);
  if (mgChartRange === "week") cutoff.setDate(now.getDate() - 7);
  else if (mgChartRange === "month") cutoff.setDate(now.getDate() - 30);
  else cutoff = new Date("2000-01-01");
  const exNames = exInGroup(mgChartGroup).map((e) => e.name);
  const ss = store.sessions.filter(
    (s) =>
      exNames.includes(s.exercise) &&
      new Date(s.date + "T00:00:00") >= cutoff,
  );
  if (ss.length === 0) {
    svg.innerHTML = `<text x="340" y="90" text-anchor="middle" fill="#8B8680" font-size="13" font-family="Inter">No ${gName.toLowerCase()} sessions in this period</text>`;
    return;
  }
  const byDate = {};
  ss.forEach((s) => {
    byDate[s.date] = (byDate[s.date] || 0) + sessionVolume(s);
  });
  const pts = Object.keys(byDate)
    .sort()
    .map((d) => ({ d, v: byDate[d] }));
  const W = 680,
    H = 190,
    pL = 58,
    pR = 18,
    pT = 18,
    pB = 32;
  const rawMax = Math.max(...pts.map((p) => p.v));
  const step =
    rawMax <= 200
      ? 50
      : rawMax <= 500
        ? 100
        : rawMax <= 2000
          ? 500
          : 1000;
  const maxV = Math.ceil(rawMax / step) * step + step;
  const minV = 0;
  const xf = (i) =>
    pL +
    (pts.length === 1
      ? (W - pL - pR) / 2
      : (i * (W - pL - pR)) / (pts.length - 1));
  const yf = (v) => pT + (H - pT - pB) * (1 - (v - minV) / (maxV - minV));
  const uid = "mg" + Date.now();

  function smoothPath(pts) {
    if (pts.length === 1) return `M${xf(0)},${yf(pts[0].v)}`;
    let d = `M${xf(0)},${yf(pts[0].v)}`;
    for (let i = 1; i < pts.length; i++) {
      const x1 = xf(i - 1),
        y1 = yf(pts[i - 1].v),
        x2 = xf(i),
        y2 = yf(pts[i].v);
      const cpx = (x1 + x2) / 2;
      d += ` C${cpx},${y1} ${cpx},${y2} ${x2},${y2}`;
    }
    return d;
  }
  const bPath = smoothPath(pts);
  const areaPath =
    bPath + ` L${xf(pts.length - 1)},${H - pB} H${xf(0)} Z`;

  let grid = "";
  const tickCount = Math.min(4, Math.floor(maxV / step));
  for (let t = 0; t <= tickCount; t++) {
    const v = t * (maxV / tickCount);
    const yy = yf(v);
    grid += `<line x1="${pL}" y1="${yy}" x2="${W - pR}" y2="${yy}" stroke="#2A2A2E" stroke-width="1"/>`;
    grid += `<text x="${pL - 8}" y="${yy + 4}" text-anchor="end" fill="#8B8680" font-size="9" font-family="JetBrains Mono">${Math.round(v)}</text>`;
  }

  let dots = "",
    dotLabels = "",
    xLabels = "";
  pts.forEach((p, i) => {
    const cx = xf(i),
      cy = yf(p.v);
    const show =
      pts.length <= 6 ||
      i === 0 ||
      i === pts.length - 1 ||
      i % Math.ceil(pts.length / 4) === 0;
    dots += `<circle cx="${cx}" cy="${cy}" r="7" fill="${color}" opacity="0.15"/>`;
    dots += `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${color}" stroke="#0E0E10" stroke-width="2"/>`;
    if (show) {
      dotLabels += `<text x="${cx}" y="${cy - 12}" text-anchor="middle" fill="${color}" font-size="9" font-weight="700" font-family="JetBrains Mono">${Math.round(p.v)}</text>`;
      xLabels += `<text x="${cx}" y="${H - 12}" text-anchor="middle" fill="#8B8680" font-size="9" font-family="JetBrains Mono">${p.d.slice(5)}</text>`;
    }
  });
  const unitLbl = `Volume (${U()})`;
  svg.innerHTML = `
    <defs>
      <linearGradient id="mgrad-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    ${grid}
    <text x="${pL}" y="${pT - 5}" fill="#8B8680" font-size="9" font-family="Inter">${unitLbl}</text>
    <path d="${areaPath}" fill="url(#mgrad-${uid})"/>
    <path d="${bPath}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>
    ${dots}${dotLabels}${xLabels}
  `;
}

/* ═══════════════════════════════════════════
   INSIGHTS — AUTO-ANALYSIS
══════════════════════════════════════════ */
function buildInsights() {
  const ins = [];
  const exNames = [...new Set(store.sessions.map((s) => s.exercise))];

  // 🟢 PR detection — green
  exNames.forEach((ex) => {
    const ss = store.sessions
      .filter((s) => s.exercise === ex)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (ss.length < 2) return;
    const latest = ss[ss.length - 1];
    const priorBest = Math.max(...ss.slice(0, -1).map(sessionBest1RM));
    const latRM = sessionBest1RM(latest);
    if (latRM > priorBest)
      ins.push({
        type: "pr",
        emoji: "🏆",
        label: "New PR",
        text: `<strong>${ex}</strong> hit a new personal record on ${latest.date} — est. 1RM of <strong>${fmt(latRM)}${U()}</strong>, up <strong>${fmt(latRM - priorBest)}${U()}</strong> from previous best.`,
      });
  });

  // 🔴 Plateau — red
  exNames.forEach((ex) => {
    const ss = store.sessions
      .filter((s) => s.exercise === ex)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (ss.length < 4) return;
    const recent = ss.slice(-4);
    const rms = recent.map(sessionBest1RM);
    if (Math.max(rms[2], rms[3]) <= Math.max(rms[0], rms[1]) * 1.01)
      ins.push({
        type: "plateau",
        emoji: "📉",
        label: "Plateau",
        text: `<strong>${ex}</strong> hasn't improved in your last ${recent.length} sessions (~${fmt(Math.max(...rms))}${U()} est. 1RM). Try varying rep ranges, adding sets, or taking a deload week.`,
      });
  });

  // Volume trends — green = up, orange = down
  const now = new Date();
  const thisStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const vols = {};
  MUSCLE_GROUPS.forEach((g) => {
    vols[g.id] = { this: 0, last: 0 };
  });
  store.sessions.forEach((s) => {
    const ex = exObj(s.exercise);
    if (!ex) return;
    const d = new Date(s.date);
    if (d >= thisStart) vols[ex.muscleGroup].this += sessionVolume(s);
    else if (d >= lastStart && d < thisStart)
      vols[ex.muscleGroup].last += sessionVolume(s);
  });
  const trends = MUSCLE_GROUPS.map((g) => ({
    name: g.name,
    pct:
      vols[g.id].last > 0 && vols[g.id].this > 0
        ? Math.round(
            ((vols[g.id].this - vols[g.id].last) / vols[g.id].last) * 100,
          )
        : null,
  }))
    .filter((x) => x.pct !== null)
    .sort((a, b) => b.pct - a.pct);
  trends.forEach((t) => {
    if (t.pct >= 10)
      ins.push({
        type: "pr",
        emoji: "📈",
        label: "Volume Up",
        text: `<strong>${t.name}</strong> training volume is up <strong>${t.pct}%</strong> this month vs last month. Great consistency.`,
      });
    else if (t.pct <= -10)
      ins.push({
        type: "trend-down",
        emoji: "📉",
        label: "Volume Down",
        text: `<strong>${t.name}</strong> training volume dropped <strong>${Math.abs(t.pct)}%</strong> this month vs last month.`,
      });
    else if (t.pct >= 0 && t.pct < 10)
      ins.push({
        type: "trend-up",
        emoji: "➡️",
        label: "Steady",
        text: `<strong>${t.name}</strong> volume is similar to last month (+${t.pct}%). Consistent progress.`,
      });
  });

  // 🟡 Best training day — neutral
  if (store.sessions.length >= 5) {
    const dc = [0, 0, 0, 0, 0, 0, 0];
    store.sessions.forEach((s) => {
      dc[new Date(s.date + "T00:00:00").getDay()]++;
    });
    const max = Math.max(...dc),
      dayIdx = dc.indexOf(max);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (max >= 3)
      ins.push({
        type: "info",
        emoji: "📅",
        label: "Consistency",
        text: `You train most often on <strong>${days[dayIdx]}s</strong> (${max} sessions). Sticking to a schedule is one of the biggest predictors of long-term progress.`,
      });
  }

  // 🟡 Streak — golden
  const streak = computeStreak();
  if (streak >= 3)
    ins.push({
      type: "streak",
      emoji: "🔥",
      label: "On a streak",
      text: `You're on a <strong>${streak}-day</strong> logging streak. Keep it going.`,
    });
  else if (streak === 0 && store.sessions.length > 0)
    ins.push({
      type: "info",
      emoji: "💤",
      label: "No recent activity",
      text: `No sessions logged in the past day or two. Even a short session keeps your streak alive.`,
    });

  return ins;
}

function renderInsights() {
  renderMGGroupBtns();
  drawMGChart();
  const list = document.getElementById("insights-list");
  const ins = buildInsights();
  if (ins.length === 0) {
    list.innerHTML =
      '<div class="empty-state">Log a few sessions across different exercises and dates — insights will appear here automatically.</div>';
    return;
  }
  list.innerHTML = ins
    .map(
      (i) => `
    <div class="insight-card ${i.type}">
      <div class="insight-tag">${i.emoji} ${i.label}</div>
      <div class="insight-text">${i.text}</div>
    </div>`,
    )
    .join("");
}

/* ═══════════════════════════════════════════
   PROFILE
══════════════════════════════════════════ */
function loadProfileForm() {
  const p = store.profile;
  document.getElementById("p-weight").value = p.weight || "";
  document.getElementById("p-height").value = p.height || "";
  document.getElementById("p-age").value = p.age || "";
  document.getElementById("p-sex").value = p.sex || "m";
  document.getElementById("p-units").value = p.units || "kg";
}
document
  .getElementById("save-profile-btn")
  .addEventListener("click", () => {
    store.profile = {
      weight:
        parseFloat(document.getElementById("p-weight").value) || null,
      height:
        parseFloat(document.getElementById("p-height").value) || null,
      age: parseInt(document.getElementById("p-age").value) || null,
      sex: document.getElementById("p-sex").value,
      units: document.getElementById("p-units").value,
    };
    save();
    toast("Profile saved");
  });

/* ═══════════════════════════════════════════
   USER CHIP + DROPDOWN + EDIT PROFILE MODAL
══════════════════════════════════════════ */
function setChip(username) {
  document.getElementById("user-avatar").textContent =
    (username || "?")[0].toUpperCase();
  document.getElementById("user-name").textContent = username || "—";
  document.getElementById("edit-name").value = username || "";
}

// Dropdown toggle
document.getElementById("user-chip").addEventListener("click", (e) => {
  e.stopPropagation();
  document.getElementById("user-menu").classList.toggle("hidden");
});
document.addEventListener("click", () =>
  document.getElementById("user-menu").classList.add("hidden"),
);

// Edit profile modal open/close
document.getElementById("menu-edit").addEventListener("click", () => {
  document.getElementById("user-menu").classList.add("hidden");
  document.getElementById("edit-error").textContent = "";
  document.getElementById("edit-pass").value = "";
  document.getElementById("edit-modal").classList.remove("hidden");
});
document.getElementById("edit-cancel").addEventListener("click", () =>
  document.getElementById("edit-modal").classList.add("hidden"),
);
document.getElementById("edit-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("edit-modal"))
    document.getElementById("edit-modal").classList.add("hidden");
});

// Save changes via api/account.php
document.getElementById("edit-save").addEventListener("click", async () => {
  const btn = document.getElementById("edit-save");
  const errEl = document.getElementById("edit-error");
  const name = document.getElementById("edit-name").value.trim();
  const pass = document.getElementById("edit-pass").value;
  errEl.textContent = "";
  if (!name) { errEl.textContent = "Name cannot be empty."; return; }
  btn.disabled = true;
  btn.textContent = "Saving…";
  try {
    const res = await fetch("api/account.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password: pass }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      errEl.textContent = data.error || "Could not save changes.";
    } else {
      setChip(data.user.username);
      document.getElementById("edit-modal").classList.add("hidden");
      toast("Profile updated");
    }
  } catch {
    errEl.textContent = "Network error — is XAMPP running?";
  }
  btn.disabled = false;
  btn.textContent = "Save changes";
});

// Logout
document.getElementById("menu-logout").addEventListener("click", async () => {
  await fetch("api/logout.php", { method: "POST" }).catch(() => {});
  window.location.href = "login.php";
});

/* ═══════════════════════════════════════════
   INIT — async: check session then load data
══════════════════════════════════════════ */
async function initApp() {
  // 1. Check session — redirect to login if not authenticated.
  let sessionData;
  try {
    const res = await fetch("api/session.php");
    sessionData = await res.json();
  } catch {
    window.location.href = "login.php";
    return;
  }
  if (!sessionData.logged_in) {
    window.location.href = "login.php";
    return;
  }

  // 2. Fill the user chip.
  setChip(sessionData.user.username);

  // 3. Load store from server.
  try {
    const res = await fetch("api/data.php");
    const data = await res.json();
    if (data.ok && data.store) {
      const s = data.store;
      if (
        s.exercises.length === 0 &&
        s.sessions.length === 0
      ) {
        // One-time migration: offer to import localStorage data if present.
        const lsRaw = localStorage.getItem(STORE_KEY);
        if (lsRaw) {
          try {
            const ls = JSON.parse(lsRaw);
            if (
              (ls.exercises && ls.exercises.length > 0) ||
              (ls.sessions && ls.sessions.length > 0)
            ) {
              if (confirm("Import your locally stored workout data into this account?")) {
                store = ls;
                // Persist profile from server (account info takes priority).
                store.profile = sessionData.user.profile;
                _dbReady = true;
                save();
              } else {
                store = s;
                store.profile = sessionData.user.profile;
                _dbReady = true;
              }
            } else {
              store = s;
              store.profile = sessionData.user.profile;
              _dbReady = true;
            }
          } catch {
            store = s;
            store.profile = sessionData.user.profile;
            _dbReady = true;
          }
        } else {
          store = s;
          store.profile = sessionData.user.profile;
          _dbReady = true;
        }
      } else {
        store = s;
        store.profile = sessionData.user.profile;
        _dbReady = true;
      }
    }
  } catch {
    // Fall back to localStorage cache on network error.
    const lsRaw = localStorage.getItem(STORE_KEY);
    if (lsRaw) {
      try { store = JSON.parse(lsRaw); } catch {}
    }
    _dbReady = false;
  }

  // 4. Boot the UI.
  document.getElementById("log-date").value = new Date()
    .toISOString()
    .slice(0, 10);
  populateExerciseSelects();
  resetSetBlocks();
  loadProfileForm();
  renderDashboard();
}

initApp();