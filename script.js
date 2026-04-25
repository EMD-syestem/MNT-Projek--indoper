/// ===================== LOGIN SECTION =====================
const users = [
  { email: "derihanggara86@gmail.com", password: "Embun2017" },
  { email: "anugrah@indosat.com", password: "anugrah2025" },
  { email: "fikri@indosat.com", password: "fikri123" },
  { email: "faisal@indosat.com", password: "faisal123" }
];

// ===================== JOB PREFIX MAPPING (DITAMBAHKAN) =====================
const jobPrefixMapping = {
  "derihanggara86@gmail.com": "JB",
  "anugrah@indosat.com": "JB",
  "bayu@indosat.com": "PSU",
  "fikri@indosat.com": "RA"
};

// ✅ Mapping foto untuk user berdasarkan email
const userPhotos = {
  "derihanggara86@gmail.com": "https://i.postimg.cc/Fzryv9tm/call-center.png",
  "anugrah@indosat.com": "https://i.postimg.cc/cCynBx79/FAFA.jpg",
  "bayu@indosat.com": "https://i.postimg.cc/LXPLG8pc/bayu.jpg",
  "fikri@indosat.com": "https://i.postimg.cc/JhDkBzGh/fikri.jpg"
};

// ===================== FUNGSI LOGIN =====================
async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();
  const err = document.getElementById("loginError");

  // ✅ Tampilkan Loader
  showLoader();

  // Simulasi proses login
  setTimeout(() => {
    const user = users.find((u) => u.email === email && u.password === pass);
    if (user) {
      err.textContent = "";

      // ✅ Simpan user yang login di localStorage
      localStorage.setItem("currentUser", user.email);

      // ===================== SIMPAN JOB PREFIX OTOMATIS (DITAMBAHKAN) =====================
      const prefix = jobPrefixMapping[user.email] || "UNKN";
      localStorage.setItem("currentJobPrefix", prefix);
      console.log("Prefix Login:", prefix);

      // ===================== Tampilkan dashboard, sembunyikan login page
      document.getElementById("loginPage").style.display = "none";
      document.querySelector("header").style.display = "flex";
      document.querySelector("main").style.display = "block";

      // ===================== Tampilkan tanggal hari ini
      const now = new Date();
      document.getElementById(
        "current-date"
      ).textContent = now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      // ===================== Tampilkan foto & nama user
      const userInfoImg = document.querySelector(".user-info img");
      const userInfoText = document.querySelector(".user-info span");
      const photoURL =
        userPhotos[user.email] ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

      userInfoImg.src = photoURL;
      userInfoText.textContent = user.email.split("@")[0];
    } else {
      err.textContent = "❌ Email atau password salah!";
    }

    // ⛔ Sembunyikan loader setelah selesai
    hideLoader();
  }, 1200);
}

function logout() {
  showLoader(); // ✅ Tampilkan loader saat logout

  setTimeout(() => {
    // Tampilkan halaman login
    document.getElementById("loginPage").style.display = "flex";

    // Sembunyikan halaman utama
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";

    // Sembunyikan semua report
    document.getElementById("reportSection").style.display = "none";
    document.getElementById("photoReportSection").style.display = "none"; // ✅ FIX UTAMA

    // Reset input login
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";

    // Hapus user aktif
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentJobPrefix"); // 🔥 Tambahan wajib

    // Kosongkan job number
    document.getElementById("jobNumber").textContent = "";

    hideLoader(); // Sembunyikan loader
  }, 1000);
}

// ===================== TOGGLE PASSWORD =====================
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("loginPassword");

togglePassword.addEventListener("click", () => {
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text";

  // Ubah isi SVG di dalam span, bukan outerHTML
  togglePassword.innerHTML = isVisible
    ? `<svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>`
    : `<svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.26 18.26 0 0 1 4.47-5.94M1 1l22 22"/>
          <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/>
        </svg>`;
});

// ===================== Tampilkan tanggal otomatis =====================
document.getElementById(
  "current-date"
).textContent = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

// ===================== ATURAN TAMPILAN AWAL =====================
window.addEventListener("DOMContentLoaded", () => {
  // Saat halaman pertama kali dibuka, tampilkan hanya login page
  document.querySelector("header").style.display = "none";
  document.querySelector("main").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";

  // Jika sebelumnya user sudah login (session tersimpan)
  const savedUser = localStorage.getItem("currentUser");
  const savedPrefix = localStorage.getItem("currentJobPrefix"); // 🔥 Tambahan

  if (savedUser) {
    document.getElementById("loginPage").style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.querySelector("main").style.display = "block";

    const userInfoImg = document.querySelector(".user-info img");
    const userInfoText = document.querySelector(".user-info span");
    const photoURL =
      userPhotos[savedUser] ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    userInfoImg.src = photoURL;
    userInfoText.textContent = savedUser.split("@")[0];

    console.log("Prefix Auto-Login:", savedPrefix);
  }
});

// ===================== PANEL MENU =====================
function togglePanel() {
  document.getElementById("slidePanel").classList.toggle("open");
}

// ===================== LOADER CONTROL =====================
function showLoader() {
  document.getElementById("loaderOverlay").classList.add("active");
}

function hideLoader() {
  document.getElementById("loaderOverlay").classList.remove("active");
}

// ===================== PEMBUNGKUS LOADER =====================
function showLoaderAndRun(callback) {
  showLoader();
  setTimeout(() => {
    try {
      callback();
    } finally {
      hideLoader();
    }
  }, 800);
}

// ===================== CONTOH FUNGSI =====================
function showForm() {
  console.log("Menampilkan Form Pekerjaan...");
  alert("Form Pekerjaan terbuka!");
}

function showReport() {
  console.log("Menampilkan Laporan Pekerjaan...");
  alert("Laporan Pekerjaan terbuka!");
}

function showPhotoReport() {
  console.log("Menampilkan Laporan Foto...");
  alert("Laporan Foto per Nomor Pekerjaan terbuka!");
}

document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter") return;

  const el = document.activeElement;

  // Fokus pada checkbox → ENTER = centang / uncentang item itu saja
  if (el.type === "checkbox") {
    e.preventDefault();
    el.checked = !el.checked;
    return;
  }

  // Fokus pada radio → ENTER = memilih radio yang sedang fokus
  if (el.type === "radio") {
    e.preventDefault();
    el.checked = true; // hanya pilih item yang fokus, tidak berpindah
    return;
  }
});

// ===================== JOB NUMBER =====================
function generateJobNumber() {
  const currentUser = localStorage.getItem("currentUser");
  const prefix = localStorage.getItem("currentJobPrefix") || "UNKN"; // 🔥 Tambahan

  if (!currentUser) {
    alert("Silakan login terlebih dahulu!");
    return;
  }

  // Key localStorage unik berdasarkan email user
  const key = `lastJobNumber_${currentUser}`;

  let last = localStorage.getItem(key);
  if (!last) last = 0;
  let next = parseInt(last) + 1;

  // Simpan kembali
  localStorage.setItem(key, next);

  // 🔥 Gunakan prefix otomatis
  const formatted = `${prefix} : ${String(next).padStart(3, "0")}`;
  document.getElementById("jobNumber").textContent = formatted;

  // 🕒 Tampilkan tanggal
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("id-ID", {
    dateStyle: "short",
    timeStyle: "medium"
  });
  document.getElementById("current-date").textContent = formattedDate;
}

// ===================== FORM HANDLER =====================
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", async function () {
    const fileInput = document.querySelector("input[type='file']");
    let fotoUrl = "";

    // === Upload foto ke base64 ===
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      fotoUrl = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    // === Dapatkan tanggal terbaru ===
    const tanggalSekarang = new Date().toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "medium"
    });

    // === Kumpulkan semua data form ===
    const formData = {
      "Job Number": document.getElementById("jobNumber").textContent,
      Tanggal: tanggalSekarang, // ✅ DITAMBAHKAN DI SINI
      "User name": document.getElementById("user").value,
      "working type": document.getElementById("workingType").value,
      "installation type": document.getElementById("installationType").value,
      "Merk kendaraan": document.getElementById("merkKendaraan").value,
      "Vehicle type": document.getElementById("vehicleType").value,
      "Lisence plate": document.getElementById("licensePlate").value,
      "Vehicle id": document.getElementById("vehicleId").value,
      Department: document.getElementById("department").value,
      Colour: document.getElementById("colour").value,
      Location: document.getElementById("location").value,
      "GPS Serial No": document.getElementById("gpsSerial").value,
      "GPS Unit ID": document.getElementById("gpsUnitId").value,
      GSM: document.getElementById("gsm").value,
      Distance: document.getElementById("distance").value,
      "GPS Unit Module": getStatus("gps"),
      "RFID Reader": getStatus("rfid"),
      Buzzer: getStatus("buzzer"),
      "Stater interupter": getStatus("starter"),
      "Fuel stick": getStatus("fuel"),
      Mesin: getStatus("d-mesin"),
      "Panel Dasbord": getStatus("d-paneldashboard"),
      Klakson: getStatus("d-klakson"),
      Audio: getStatus("d-audio"),
      "Sistem listrik": getStatus("d-listrik"),
      AC: getStatus("d-ac"),
      "Power windows": getStatus("d-powerwindows"),
      "Panel Instrument": getStatus("d-panelinstrument"),
      Spion: getStatus("d-spion"),
      "Deskripsi Pekerjaan": document.getElementById("deskripsiPekerjaan")
        .value,
      "Progres Status": document.getElementById("progressStatus").value,
      "Upload foto Bukti": fotoUrl
    };

    console.log("📤 Mengirim:", formData);
    await sendToGoogleSheet(formData);
    generateJobNumber();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let kendaraanData = {};

  const API_URL =
    "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec?type=vts";

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA FULL:", data);

      const select = document.getElementById("vehicleId");
      select.innerHTML = '<option value="">-- Pilih Kendaraan --</option>';

      data.forEach((row) => {
        let node, plate, jenis, imei, imsi;

        if (Array.isArray(row)) {
          node = row[1];
          plate = row[2];
          jenis = row[3];
          imei = row[4];
          imsi = row[5];
        } else {
          node = row.Node || row.node;
          plate = row["License Plate"] || row.license_plate;
          jenis = row["Jenis kendaraan"] || row.jenis_kendaraan;
          imei = row.IMEI || row.imei;
          imsi = row.IMSI || row.imsi;
        }

        if (!plate) return;

        const key = plate.trim().toUpperCase();

        kendaraanData[key] = {
          merk: jenis || "",
          type: getType(jenis),
          plate: plate || "",
          imei: imei || "",
          node: node || "",
          imsi: imsi || ""
        };

        // isi dropdown
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = plate;
        select.appendChild(opt);
      });

      console.log("HASIL:", kendaraanData);
    })
    .catch((err) => console.error(err));

  // ===============================
  function getType(jenis) {
    if (!jenis) return "";
    jenis = jenis.toLowerCase();

    if (jenis.includes("double")) return "Double cabin";
    if (jenis.includes("single")) return "Single cabin";
    if (jenis.includes("pajero")) return "SUV";
    if (jenis.includes("hino") || jenis.includes("fighter"))
      return "Vacum truck";

    return "SUV";
  }

  // ===============================
  document.getElementById("vehicleId").addEventListener("change", function () {
    const key = this.value;
    const data = kendaraanData[key];

    console.log("PILIH:", key);
    console.log("DATA:", data);

    if (data) {
      console.log("PLATE YANG MAU DITAMPILKAN:", data.plate); // 🔥 DEBUG

      setVal("licensePlate", data.plate);
      setVal("merkKendaraan", data.merk);
      setVal("vehicleType", data.type);
      setVal("gpsSerial", data.imei);
      setVal("gpsUnitId", data.node);
      setVal("gsm", data.imsi);
    }
  });
  function normalizePlate(plate) {
    if (!plate) return "";
    return plate
      .replace(/JBI-0+(\d+)/i, "JBI-$1") // 018 → 18
      .trim()
      .toUpperCase();
  }

  function setVal(id, value) {
    const el = document.getElementById(id);
    if (!el) return;

    console.log("SET", id, "=", value);

    // 🔥 KHUSUS licensePlate (SELECT manual)
    if (id === "licensePlate" && el.tagName === "SELECT") {
      const target = normalizePlate(value);

      let found = false;
      for (let i = 0; i < el.options.length; i++) {
        const optText = normalizePlate(el.options[i].text);
        if (optText === target) {
          el.selectedIndex = i;
          found = true;
          break;
        }
      }

      if (!found) {
        console.warn("❌ Plate tidak ditemukan di dropdown:", value);
      }
      return;
    }

    // 🔥 SELECT lain (merk, type, dll) → langsung set value
    if (el.tagName === "SELECT") {
      el.value = value || "";
      return;
    }

    // 🔥 INPUT / TEXTAREA
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.value = value || "";
      return;
    }

    // 🔥 fallback
    el.textContent = value || "";
  }
});
// ===================== HELPER FUNCTION =====================
function getStatus(name) {
  const checked = document.querySelector(`input[name='${name}']:checked`);
  return checked ? checked.parentElement.textContent.trim() : "";
}

const sections = document.querySelectorAll(".form-section");
let current = 0;

function showStep(i) {
  sections.forEach((s) => s.classList.remove("active"));
  sections[i].classList.add("active");
}

document.querySelectorAll(".next-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (current < sections.length - 1) current++;
    showStep(current);
  });
});

document.querySelectorAll(".back-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (current > 0) current--;
    showStep(current);
  });
});
showStep(0);

document.addEventListener("DOMContentLoaded", () => {
  // Ambil semua section (form steps) dan step indicator
  const sections = Array.from(document.querySelectorAll(".form-section"));
  const wizardSteps = Array.from(
    document.querySelectorAll(".wizard-progress .step")
  );

  if (!sections.length) {
    console.warn(
      "Tidak ditemukan .form-section. Periksa selector atau lokasi skrip."
    );
    return;
  }
  if (!wizardSteps.length) {
    console.warn(
      "Tidak ditemukan .wizard-progress .step. Periksa selector atau lokasi skrip."
    );
    // lanjut saja — indikator opsional
  }

  // Cari tombol next/back
  const nextBtns = Array.from(document.querySelectorAll(".next-btn"));
  const backBtns = Array.from(document.querySelectorAll(".back-btn"));
  const submitBtn = document.querySelector(".submit-btn");

  // Tentukan currentStep: cari yang sudah punya kelas 'active', kalau tidak ada pakai 0
  let currentStep = sections.findIndex((s) => s.classList.contains("active"));
  if (currentStep === -1) currentStep = 0;

  // Fungsi untuk menampilkan section berdasarkan index
  function showSection(index) {
    if (index < 0) index = 0;
    if (index >= sections.length) index = sections.length - 1;

    sections.forEach((sec, i) => {
      if (i === index) {
        sec.classList.add("active");
        sec.style.display = ""; // biarkan CSS atur; if you used display none earlier
      } else {
        sec.classList.remove("active");
        // hide non-active for accessibility (optional)
        sec.style.display = "none";
      }
    });

    currentStep = index;
    updateStepIndicator(index);
    // optional: scroll to top of form so user sees it
    // document.getElementById('jobForm').scrollIntoView({behavior:'smooth', block:'start'});
  }

  // updateStepIndicator (safe: hanya jika wizardSteps ada)
  function updateStepIndicator(index) {
    if (!wizardSteps.length) return;
    wizardSteps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
      // update aria for accessibility
      step.setAttribute("aria-current", i === index ? "step" : "false");
    });
  }

  // Pasang event pada Next buttons => naik 1 step
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = Math.min(currentStep + 1, sections.length - 1);
      showSection(target);
    });
  });

  // Pasang event pada Back buttons => turun 1 step
  backBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = Math.max(currentStep - 1, 0);
      showSection(target);
    });
  });

  // Jika ada tombol submit (akhir), pastikan validasi/submit
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      // kamu bisa taruh validasi form di sini sebelum submit
      // contoh sederhana:
      // if (!document.getElementById('user').value) { alert('Isi user'); showSection(0); return; }
      // kalau valid, simpan / kirim form
      // document.getElementById('jobForm').submit();
      console.log("Tombol Save ditekan. Tambahkan logika simpan di sini.");
    });
  }

  // Klik pada step indicator untuk langsung lompat ke step tertentu
  if (wizardSteps.length) {
    wizardSteps.forEach((step, idx) => {
      step.addEventListener("click", () => {
        showSection(idx);
      });
    });
  }

  // Inisialisasi tampilan awal
  showSection(currentStep);

  // Debug: tampilkan status
  console.log("Wizard inited:", {
    totalSections: sections.length,
    currentStep,
    hasWizardSteps: wizardSteps.length > 0
  });
});

/// URL Google Sheet Web App
const sheetURL =
  "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec";

// Menyimpan detail pekerjaan per Working Type
window.workingTypeDetails = {};

// ============================
// 🔔 LOAD DATA NOTIFIKASI
// ============================
window.loadWorkingTypeNotification = async function () {
  try {
    const response = await fetch(sheetURL);
    const rows = await response.json();

    if (!Array.isArray(rows) || rows.length === 0) {
      console.warn("Data kosong.");
      return;
    }

    let counts = {};
    window.workingTypeDetails = {}; // reset

    rows.forEach((row) => {
      const type = row["working type"]?.trim();
      const job = row["Job Number"] || "-";
      const plate = row["Lisence plate"] || "-";
      const vehicle = row["Vehicle id"] || "-";

      if (!type) return;

      // Hitung jumlah working type
      counts[type] = (counts[type] || 0) + 1;

      // Siapkan list detail
      if (!window.workingTypeDetails[type])
        window.workingTypeDetails[type] = [];

      window.workingTypeDetails[type].push({
        jobNumber: job,
        workingType: type,
        plate: plate,
        vehicleId: vehicle
      });
    });

    updateNotifUI(counts);
  } catch (err) {
    console.error("Error Load Notif:", err);
  }
};

// ============================
// 🔔 UPDATE LIST NOTIFIKASI
// ============================
window.updateNotifUI = function (counts) {
  const notifList = document.getElementById("notifList");
  const notifBadge = document.getElementById("notifBadge");

  notifList.innerHTML = "";

  let total = 0;

  for (let type in counts) {
    const count = counts[type];
    total += count;

    notifList.innerHTML += `
      <li class="notif-item" style="cursor:pointer; padding:5px;" 
          onclick="showJobDetail('${type}')">
        <strong>${type}</strong> : ${count} pekerjaan
      </li>
    `;
  }

  notifBadge.textContent = total;
};

// ========================================
// 📌 SHOW MULTIPLE DETAIL PANEL — SIDE-BY-SIDE
// ========================================
window.showJobDetail = function (type) {
  const container = document.getElementById("notifDetailContainer");

  const panelId = `panel-${type.replace(/\s+/g, "")}`;
  const existing = document.getElementById(panelId);

  // Jika sudah terbuka → tutup
  if (existing) {
    existing.remove();
    return;
  }

  const listData = window.workingTypeDetails[type] || [];

  let html = `
    <div id="${panelId}" class="panel-box">
      <h3 class="panel-title">${type}</h3>
      <table border="1" width="100%" style="border-collapse:collapse; font-size:14px;">
        <thead style="background:#f4f4f4;">
          <tr>
            <th>Job Number</th>
            <th>Working Type</th>
            <th>License Plate</th>
            <th>Vehicle ID</th>
          </tr>
        </thead>
        <tbody>
  `;

  listData.forEach((item) => {
    html += `
      <tr>
        <td>${item.jobNumber}</td>
        <td>${item.workingType}</td>
        <td>${item.plate}</td>
        <td>${item.vehicleId}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", html);
};

// ================= GLOBAL =================
let dataVTS = [];
let dataVTSReady = false;

// ================= LOAD DATA =================
function loadDataVTS() {
  fetch(
    "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec?type=vts"
  )
    .then((res) => res.json())
    .then((data) => {
      dataVTS = data;
      dataVTSReady = true;
      console.log("✅ Data VTS siap:", dataVTS);
    })
    .catch((err) => {
      console.error("❌ Gagal ambil data VTS", err);
    });
}

// ================= NORMALISASI PLAT =================
function bersihkanPlat(text) {
  return (text || "").toLowerCase().replace(/[^a-z0-9]/g, ""); // hapus semua selain huruf & angka
}

// ================= AUTO ISI =================
function autoIsiVTS() {
  if (!dataVTSReady) {
    console.warn("⏳ Data VTS belum siap");
    return;
  }

  const value = document.getElementById("cekPlate").value;
  if (!value) return;

  const plateForm = value.split("|")[1];
  const plateFix = bersihkanPlat(plateForm);

  const found = dataVTS.find((item) => {
    const sheetPlate = item["License Plate"] || item["Lisence plate"] || "";
    const sheetFix = bersihkanPlat(sheetPlate);

    return sheetFix.includes(plateFix); // 🔥 fleksibel & kuat
  });

  console.log("Dipilih:", plateFix);
  console.log("Ditemukan:", found);

  if (found) {
    document.getElementById("cekIMEI").value =
      found["IMEI"] || found["GPS Serial No"] || "";

    document.getElementById("cekIMSI").value =
      found["IMSI"] || found["GSM"] || "";

    document.getElementById("cekNode").value = found["Node"] || ""; // 🔥 INI TAMBAHAN
  }
}

// ================= INIT =================
window.onload = function () {
  loadDataVTS();
};
function showVTS() {
  document.querySelector("main").style.display = "none";
  document.getElementById("reportSection").style.display = "none";
  document.getElementById("photoReportSection").style.display = "none";

  document.getElementById("vtsSection").style.display = "block";

  loadVTS();
}

function loadVTS() {
  const url =
    "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec?type=vts";

  const tbody = document.querySelector("#vtsTable tbody");
  tbody.innerHTML = "<tr><td colspan='7'>Loading...</td></tr>";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      tbody.innerHTML = "";

      data.forEach((d, i) => {
        let status = (d["Status VTS"] || "").toLowerCase();
        let warna = status.includes("active") ? "green" : "red";

        let row = `
          <tr>
            <td>${d["No"] || i + 1}</td>
            <td>${d["Node"]}</td>
            <td>${d["License Plate"]}</td>
            <td>${d["Jenis kendaraan"]}</td>
            <td>${d["IMEI"]}</td>
            <td>${d["IMSI"]}</td>
            <td style="color:${warna}; font-weight:bold;">
              ${d["Status VTS"]}
            </td>
          </tr>
        `;

        tbody.innerHTML += row;
      });
    })
    .catch((err) => {
      tbody.innerHTML = "<tr><td colspan='7'>Gagal ambil data</td></tr>";
      console.error(err);
    });
}

function submitCekRutin() {
  const data = {
    type: "cek_rutin",

    tanggal: document.getElementById("cekTanggal").value,
    node: document.getElementById("cekNode").value,
    plate: document.getElementById("cekPlate").selectedOptions[0].text,
    imei: document.getElementById("cekIMEI").value,
    imsi: document.getElementById("cekIMSI").value,
    rfid: document.getElementById("cekRFID").value,
    fuel: document.getElementById("cekFuel").value,
    relay: document.getElementById("cekRelay").value,
    fuse: document.getElementById("cekFuse").value,
    instalasi: document.getElementById("cekInstalasi").value,
    job: document.getElementById("cekJob").value,
    keterangan: document.getElementById("cekKeterangan").value
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  )
    .then((res) => res.json())
    .then((res) => {
      alert(res.message);

      // 🔥 RESET FORM
      resetFormCekRutin();
    })
    .catch((err) => {
      alert("Gagal koneksi");
      console.error(err);
    });
}
function resetFormCekRutin() {
  document.getElementById("cekTanggal").value = "";
  document.getElementById("cekNode").value = "";
  document.getElementById("cekPlate").selectedIndex = 0;
  document.getElementById("cekIMEI").value = "";
  document.getElementById("cekIMSI").value = "";
  document.getElementById("cekRFID").selectedIndex = 0;
  document.getElementById("cekFuel").selectedIndex = 0;
  document.getElementById("cekRelay").selectedIndex = 0;
  document.getElementById("cekFuse").selectedIndex = 0;
  document.getElementById("cekInstalasi").selectedIndex = 0;
  document.getElementById("cekJob").value = "";
  document.getElementById("cekKeterangan").value = "";
}

function formatTanggal(tgl) {
  if (!tgl) return "";

  const date = new Date(tgl);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function warnaStatus(val) {
  if (val === "NOT OK") return "style='color:red;font-weight:bold'";
  if (val === "OK") return "style='color:green;font-weight:bold'";
  return "";
}

function loadCekRutinReport() {
  document.getElementById("cekRutinSection").style.display = "none";
  document.getElementById("reportCekRutinSection").style.display = "block";

  fetch(
    "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec?type=cek_rutin"
  )
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.querySelector("#tabelCekRutin tbody");
      tbody.innerHTML = "";

      data.reverse().forEach((item) => {
        const row = `
          <tr>
            <td>${formatTanggal(item.Tanggal)}</td>
            <td>${item.Node || ""}</td>
            <td>${item["License Plate"] || ""}</td>
            <td>${item.IMEI || ""}</td>
            <td>${item.IMSI || ""}</td>
            <td ${warnaStatus(item.RFID)}>${item.RFID || ""}</td>
            <td ${warnaStatus(item["Fuel stick"])}>${
          item["Fuel stick"] || ""
        }</td>
            <td ${warnaStatus(item.Relay)}>${item.Relay || ""}</td>
            <td ${warnaStatus(item["Fuse VTS"])}>${item["Fuse VTS"] || ""}</td>
            <td ${warnaStatus(item["Instalasi VTS"])}>${
          item["Instalasi VTS"] || ""
        }</td>
            <td>${item["Job Number"] || ""}</td>
            <td>${item.Keterangan || ""}</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch((err) => {
      alert("Gagal load data");
      console.error(err);
    });
}

function kembaliKeForm() {
  document.getElementById("cekRutinSection").style.display = "block";
  document.getElementById("reportCekRutinSection").style.display = "none";
}

let chartInstance;

// ================= PARSE TANGGAL =================
function parseTanggal(tanggalStr) {
  try {
    const [datePart, timePart] = tanggalStr.split(", ");
    const [day, month, year] = datePart.split("/");
    const [hour, min, sec] = timePart.split(".");

    const fullYear = "20" + year;

    return new Date(fullYear, month - 1, day, hour, min, sec);
  } catch {
    return null;
  }
}

// ================= NORMALIZE TEXT =================
function normalizeText(text) {
  return (text || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

// ================= LOAD DASHBOARD =================
function loadDashboardMaintenance() {
  const selectedJob = document.getElementById("filterJob").value;

  fetch(
    "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec"
  )
    .then((res) => res.text())
    .then((text) => {
      let data;
      try {
        data = JSON.parse(text);
        globalData = data; // 🔥 penting!
      } catch {
        throw new Error("Response bukan JSON");
      }

      let grouped = {};
      const selected = normalizeText(selectedJob);

      // 🔥 TAMBAHAN KPI PROGRESS
      let progressCount = 0;
      let progressVehicles = [];

      data.forEach((item) => {
        let tanggal = item["Tanggal"] || item["tanggal"] || "";
        if (!tanggal) return;

        const date = parseTanggal(tanggal);
        if (!date) return;

        const workingTypeRaw =
          item["working type"] || item["Working type"] || "";
        const workingType = normalizeText(workingTypeRaw);

        if (selected && !workingType.includes(selected)) return;

        // ================= HITUNG PROGRESS =================
        const vehicle =
          item["Vehicle id"] || // 🔥 INI YANG SESUAI DENGAN SHEET KAMU
          item["vehicle id"] ||
          item["Vehicle ID"] ||
          "";

        const statusRaw =
          item["progres status"] || item["Progres Status"] || item["AF"] || "";

        const status = normalizeText(statusRaw);

        if (status.includes("progress")) {
          progressCount++;

          if (vehicle && !progressVehicles.includes(vehicle)) {
            progressVehicles.push(vehicle);
          }
        }

        // ================= GROUPING CHART =================
        let key;

        if (selected === "dataretrieval") {
          key =
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(date.getDate()).padStart(2, "0");
        } else {
          key =
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0");
        }

        if (!grouped[key]) grouped[key] = 0;
        grouped[key]++;
      });

      const rawLabels = Object.keys(grouped).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      const values = rawLabels.map((k) => grouped[k]);

      // 🎨 FORMAT LABEL
      const labels = rawLabels.map((l) => {
        if (selected === "dataretrieval") {
          const d = new Date(l);
          return d.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short"
          });
        } else {
          const [y, m] = l.split("-");
          return new Date(y, m - 1).toLocaleDateString("id-ID", {
            month: "short",
            year: "numeric"
          });
        }
      });

      // ================= KPI =================
      const total = values.reduce((a, b) => a + b, 0);
      const lastMonth = values.length ? values[values.length - 1] : 0;

      document.getElementById("kpiTotal").innerText = total;
      document.getElementById("kpiLastMonth").innerText = lastMonth;
      document.getElementById(
        "kpiUpdate"
      ).innerText = new Date().toLocaleTimeString("id-ID");

      // 🔥 KPI ON PROGRESS
      document.getElementById("kpiProgress").innerText = progressCount;

      let displayList = progressVehicles.slice(0, 5).join(", ");
      if (progressVehicles.length > 5) displayList += " ...";

      document.getElementById("kpiProgressList").innerText = displayList || "-";

      // ================= CHART =================
      renderChartTrend(labels, values, selectedJob);
    })
    .catch((err) => {
      alert("Gagal load dashboard");
      console.error(err);
    });
}
// ================= RENDER CHART =================
function renderChartTrend(labels, data, jobName) {
  const ctx = document.getElementById("chartMaintenance");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: jobName ? "Trend " + jobName : "Semua Job",
          data: data,
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.15)"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      // 🔥 TAMBAHAN CLICK EVENT
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const label = labels[index];
          showDetailByLabel(label, jobName);
        }
      },

      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#333"
          }
        },
        tooltip: {
          backgroundColor: "#111",
          callbacks: {
            label: (ctx) => "Jumlah: " + ctx.raw
          }
        }
      },

      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0,0,0,0.05)"
          },
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}
function showDetailByLabel(label, selectedJob) {
  const tbody = document.querySelector("#detailTable tbody");
  tbody.innerHTML = "";

  if (!globalData || globalData.length === 0) {
    alert("Data belum siap");
    return;
  }

  const selected = normalizeText(selectedJob);

  globalData.forEach((item) => {
    let tanggal = item["Tanggal"] || item["tanggal"] || "";
    if (!tanggal) return;

    const date = parseTanggal(tanggal);
    if (!date) return;

    const workingType = normalizeText(
      item["working type"] || item["Working type"] || ""
    );

    if (selected && !workingType.includes(selected)) return;

    let match = false;

    // 🔥 MATCH BERDASARKAN DATA ASLI (BUKAN TEXT)
    if (selected === "dataretrieval") {
      // ambil label → convert ke date
      const labelDate = new Date(label + " " + new Date().getFullYear());

      match =
        date.getDate() === labelDate.getDate() &&
        date.getMonth() === labelDate.getMonth();
    } else {
      const [monthName, year] = label.split(" ");
      const labelDate = new Date(monthName + " 1, " + year);

      match =
        date.getMonth() === labelDate.getMonth() &&
        date.getFullYear() === labelDate.getFullYear();
    }

    if (!match) return;

    const vehicle = item["Vehicle id"] || item["vehicle id"] || "-";

    const status = item["Progres Status"] || item["progres status"] || "-";

    const tr = `
      <tr>
        <td>${tanggal}</td>
        <td>${vehicle}</td>
        <td>${workingType}</td>
        <td>${status}</td>
      </tr>
    `;

    tbody.innerHTML += tr;
  });

  document.getElementById("modalDetail").style.display = "block";
}

function closeModal() {
  document.getElementById("modalDetail").style.display = "none";
}
// ============================
// 🔔 TOGGLE DROPDOWN NOTIF
// ============================
window.toggleNotifDropdown = function () {
  const box = document.getElementById("notifDropdown");
  const isActive = box.classList.contains("active");

  if (isActive) {
    box.classList.remove("active");
    box.style.display = "none";
  } else {
    box.style.display = "block";
    setTimeout(() => box.classList.add("active"), 10);
  }
};

// ============================
// 🔔 FIX — CLICK OUTSIDE CLOSE DROPDOWN
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const bell = document.querySelector(".notif-bell");
  const dropdown = document.getElementById("notifDropdown");

  // Klik lonceng
  bell.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleNotifDropdown();
  });

  // Klik di dalam dropdown → jangan tutup
  dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Klik luar dropdown → tutup
  document.addEventListener("click", () => {
    dropdown.classList.remove("active");
    dropdown.style.display = "none";
  });
});

// ============================
// 🔄 LOAD OTOMATIS
// ============================
loadWorkingTypeNotification();

// ===================== KIRIM KE GOOGLE SHEET =====================
async function sendToGoogleSheet(formData) {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec";

  const loader = document.getElementById("loaderOverlay");
  loader.style.display = "flex";

  try {
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    alert("✅ Data dan foto berhasil disimpan!");

    const form = document.getElementById("jobForm");
    if (form) form.reset();

    document.getElementById("jobNumber").textContent = "";
    document.getElementById("current-date").textContent = "";

    if (typeof generateJobNumber === "function") generateJobNumber();
  } catch (error) {
    alert("❌ Gagal mengirim data ke Google Sheet!\n" + error.message);
  } finally {
    loader.style.display = "none";
  }
}

// ===================== HIDE SEMUA =====================
function hideAllSections() {
  document.querySelector("main").style.display = "none";

  document.querySelectorAll(".report-section").forEach((el) => {
    el.style.display = "none";
  });
}

// ===================== FORM =====================
function showForm() {
  hideAllSections();

  document.querySelector("main").style.display = "block";

  document.getElementById("slidePanel").classList.remove("open");
}

// ===================== CEK RUTIN =====================
function showCekRutinVTS() {
  hideAllSections();

  document.getElementById("cekRutinSection").style.display = "block";

  document.getElementById("slidePanel").classList.remove("open");
}

// ===================== REPORT =====================
function showReport() {
  hideAllSections();

  document.getElementById("reportSection").style.display = "block";
  loadReport();

  document.getElementById("slidePanel").classList.remove("open");
}

// ===================== FOTO =====================
function showPhotoReport() {
  hideAllSections();

  document.getElementById("photoReportSection").style.display = "block";
  loadPhotoReport();

  document.getElementById("slidePanel").classList.remove("open");
}

// ===================== DASHBOARD =====================
function showDashboardMaintenance() {
  hideAllSections();

  // 🔥 hanya dashboard yang tampil
  document.getElementById("dashboardSection").style.display = "block";

  loadDashboardMaintenance();

  document.getElementById("slidePanel").classList.remove("open");
}

// ===================== MONITORING KONTRAK VTS =====================
function showMonitoringKontrak() {
  // 🔥 1. Sembunyikan semua halaman
  document.querySelectorAll(".report-section").forEach((sec) => {
    sec.style.display = "none";
  });

  // 🔥 2. Tampilkan monitoring saja
  const section = document.getElementById("monitoringKontrakSection");
  section.style.display = "block";

  // 🔥 3. Load data
  generateTanggalHeader();
  loadMonitoringData();

  // 🔥 4. Scroll ke atas (biar berasa pindah halaman)
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 🔥 5. Tutup semua panel menu
  document.getElementById("slidePanel").classList.remove("open");
  document.getElementById("monitoringPanel").classList.remove("open");
}
function showSummaryDayVTS() {
  hideAllSections();

  document.getElementById("summaryDaySection").style.display = "block";

  loadSummaryDay();

  window.scrollTo({ top: 0, behavior: "smooth" });

  document.getElementById("slidePanel").classList.remove("open");
  document.getElementById("monitoringPanel").classList.remove("open");
}
function toggleMonitoringPanel() {
  const panel = document.getElementById("monitoringPanel");
  const mainPanel = document.getElementById("slidePanel");

  // tutup menu utama
  mainPanel.classList.remove("open");

  // toggle monitoring
  panel.classList.toggle("open");
}

const API_URL =
  "https://script.google.com/macros/s/AKfycbxdlTGtyAdapfCRhFgiB9E2gWqpUVwSU5ZxqY70SC3Bqi9tKSXciehwADcjlc64vJ-_QA/exec";

// 🔥 helper ambil value fleksibel (anti beda nama kolom)
function getVal(d, keys) {
  for (let k of keys) {
    if (d[k] !== undefined) return d[k];
  }
  return "";
}

// 🔥 helper cari key tanggal (anti beda huruf besar/kecil)
function getTanggalValue(d, i) {
  const target = ("tanggal" + i).toLowerCase().replace(/\s/g, "");
  const key = Object.keys(d).find(
    (k) => k.toLowerCase().replace(/\s/g, "") === target
  );
  return key ? d[key] : "";
}

// ✅ Generate tanggal 1–31
function generateTanggalHeader() {
  const header = document.getElementById("monitoringHeader");

  if (!header) {
    console.error("❌ monitoringHeader tidak ditemukan");
    return;
  }

  header.querySelectorAll(".tgl").forEach((el) => el.remove());

  for (let i = 1; i <= 31; i++) {
    const th = document.createElement("th");
    th.classList.add("tgl");
    th.innerText = "Tgl " + i;
    header.appendChild(th);
  }
}
async function loadMonitoringData() {
  const tbody = document.getElementById("monitoringTableBody");

  if (!tbody) {
    console.error("❌ monitoringTableBody tidak ditemukan");
    return;
  }

  tbody.innerHTML = "<tr><td colspan='50'>Loading...</td></tr>";

  try {
    // 🔥 PENTING: arahkan ke sheet Monitoring
    const res = await fetch(API_URL + "?sheet=Monitoring");

    if (!res.ok) throw new Error("HTTP " + res.status);

    const json = await res.json();

    console.log("DATA API:", json);

    // =========================
    // 🔥 HEADER (JUDUL ATAS)
    // =========================
    if (json.header && json.header.length) {
      const titleMain = document.getElementById("titleMain");
      const titleSub = document.getElementById("titleSub");

      if (titleMain) {
        titleMain.innerText = json.header[0] || "";
        titleMain.style.fontSize = "26px"; // 🔥 lebih besar
        titleMain.style.fontWeight = "800"; // 🔥 lebih tebal
        titleMain.style.marginBottom = "12px";
        titleMain.style.letterSpacing = "0.5px"; // biar lebih elegan
      }

      if (titleSub) {
        const subText = json.header[1] || "";

        // style container
        titleSub.style.fontSize = "15px"; // 🔥 diperbesar
        titleSub.style.color = "#222";
        titleSub.style.lineHeight = "1.8"; // lebih lega

        const parts = subText.split("|");

        titleSub.innerHTML = parts
          .map((p) => {
            const split = p.split(":");

            if (split.length >= 2) {
              return `
      <div style="
        display:grid;
        grid-template-columns:150px 10px auto;
        margin:3px 0;
        align-items:center;
      ">
        <span style="font-weight:800;">${split[0].trim()}</span>
        <span style="text-align:center;">:</span>
        <span style="font-weight:600;">${split.slice(1).join(":").trim()}</span>
      </div>
    `;
            }

            return `<div>${p.trim()}</div>`;
          })
          .join("");
      }
    }
    // =========================
    // 🔥 DATA
    // =========================
    const data = Array.isArray(json) ? json : json.data || [];

    tbody.innerHTML = "";

    if (!data.length) {
      tbody.innerHTML = "<tr><td colspan='50'>Data kosong</td></tr>";
      return;
    }

    data.forEach((d, index) => {
      let row = `
        <tr>
          <td>${getVal(d, ["No"]) || index + 1}</td>
          <td>${getVal(d, ["Node"])}</td>
          <td>${getVal(d, ["License Plate", "Licence plate"])}</td>
          <td>${getVal(d, ["Jenis kendaraan", "Jenis Kendaraan"])}</td>
          <td>${getVal(d, ["IMEI"])}</td>
          <td>${getVal(d, ["IMSI"])}</td>
          <td class="${
            getVal(d, ["Status VTS"]) === "Active" ? "active" : "inactive"
          }">
            ${getVal(d, ["Status VTS"])}
          </td>
          <td>${getVal(d, ["Status RFID"])}</td>
          <td>${getVal(d, ["Status Fuel Stock", "Status Fuel Stick"])}</td>
          <td>${getVal(d, ["Remarks"])}</td>
          <td>${getVal(d, ["Pengecekan Unit"])}</td>
          <td>${getVal(d, ["Duration Eror/Hari"])}</td>
      `;

      for (let i = 1; i <= 31; i++) {
        let val = getTanggalValue(d, i);

        row += `
          <td class="${
            val === "Active" ? "active" : val === "Inactive" ? "inactive" : ""
          }">
            ${val || "-"}
          </td>
        `;
      }

      row += `</tr>`;
      tbody.innerHTML += row;
    });
  } catch (err) {
    console.error("LOAD MONITORING ERROR:", err);
    tbody.innerHTML = "<tr><td colspan='50'>❌ Gagal load data</td></tr>";
  }
}
// ✅ AUTO JALAN
window.addEventListener("DOMContentLoaded", () => {
  generateTanggalHeader();
  loadMonitoringData();
});
function showMonitoringKontrak() {
  hideAllSections();

  document.getElementById("monitoringKontrakSection").style.display = "block";

  generateTanggalHeader();
  loadMonitoringData();

  window.scrollTo({ top: 0, behavior: "smooth" });

  document.getElementById("slidePanel").classList.remove("open");
  document.getElementById("monitoringPanel").classList.remove("open");
}
function downloadExcelFix() {
  try {
    if (typeof XLSX === "undefined") {
      alert("❌ XLSX belum ke-load");
      return;
    }

    const tbody = document.getElementById("monitoringTableBody");
    const headerRow = document.getElementById("monitoringHeader");
    const titleMain = document.getElementById("titleMain");
    const titleSub = document.getElementById("titleSub");

    if (!tbody || !headerRow) {
      alert("❌ Struktur tabel tidak ditemukan");
      return;
    }

    const rows = tbody.querySelectorAll("tr");

    if (rows.length === 0) {
      alert("⚠️ Data kosong");
      return;
    }

    if (rows[0].innerText.includes("Klik tombol")) {
      alert("⚠️ Load data dulu");
      return;
    }

    // =========================
    // 🔥 AMBIL JUDUL
    // =========================
    const title = titleMain ? titleMain.innerText : "Monitoring VTS";

    // =========================
    // 🔥 AMBIL HEADER INFO
    // =========================
    let formattedInfo = [];

    if (titleSub) {
      const rowsInfo = titleSub.querySelectorAll("div");

      rowsInfo.forEach((div) => {
        const spans = div.querySelectorAll("span");

        if (spans.length >= 3) {
          const label = spans[0].innerText.trim();
          const value = spans[2].innerText.trim();

          formattedInfo.push([label, ": " + value]);
        } else {
          const parts = div.innerText.split(":");
          formattedInfo.push([
            (parts[0] || "").trim(),
            ": " + (parts[1] || "").trim()
          ]);
        }
      });
    }

    // =========================
    // 🔥 HEADER KOLOM
    // =========================
    const headers = [];
    headerRow.querySelectorAll("th").forEach((th) => {
      headers.push(th.innerText.trim());
    });

    // =========================
    // 🔥 DATA
    // =========================
    const data = [];
    rows.forEach((tr) => {
      const row = [];
      tr.querySelectorAll("td").forEach((td) => {
        row.push(td.innerText.trim());
      });
      data.push(row);
    });

    // =========================
    // 🔥 GABUNG SEMUA
    // =========================
    const sheetData = [[title], ...formattedInfo, [], [], headers, ...data];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // =========================
    // 🔥 MERGE JUDUL (A s/d kolom terakhir)
    // =========================
    ws["!merges"] = [
      {
        s: { r: 0, c: 0 },
        e: { r: 0, c: headers.length - 1 }
      }
    ];

    // =========================
    // 🔥 FREEZE (SAMPAI HEADER TABEL)
    // =========================
    const freezeRow = 1 + formattedInfo.length + 2 + 1;
    // penjelasan:
    // 1 = judul
    // + formattedInfo
    // + 2 baris kosong
    // + 1 header tabel

    ws["!freeze"] = {
      xSplit: 0,
      ySplit: freezeRow
    };

    // =========================
    // 🔥 LEBAR KOLOM
    // =========================
    ws["!cols"] = [
      { wch: 25 },
      { wch: 40 },
      ...headers.map(() => ({ wch: 20 }))
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Monitoring VTS");

    XLSX.writeFile(wb, "Monitoring_VTS.xlsx");
  } catch (err) {
    console.error("REAL ERROR:", err);
    alert("❌ Export gagal (lihat console)");
  }
}
function showProgressReport() {
  // 🔥 1. Sembunyikan semua halaman (pakai fungsi global kamu)
  hideAllSections();

  // 🔥 2. Tampilkan section Progress Report
  const section = document.getElementById("progressReportSection");
  section.style.display = "block";

  // 🔥 3. Generate data dari Monitoring
  generateProgressFromMonitoring();

  // 🔥 4. Scroll ke atas
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 🔥 5. Tutup semua panel menu
  document.getElementById("slidePanel").classList.remove("open");
  document.getElementById("monitoringPanel").classList.remove("open");
}
const PROGRESS_API =
  "https://script.google.com/macros/s/AKfycbxdlTGtyAdapfCRhFgiB9E2gWqpUVwSU5ZxqY70SC3Bqi9tKSXciehwADcjlc64vJ-_QA/exec?sheet=Progres%20Report";
async function loadProgressReport() {
  const tbody = document.getElementById("progressTableBody");

  tbody.innerHTML = `<tr><td colspan="10">⏳ Loading data...</td></tr>`;

  try {
    const res = await fetch(PROGRESS_API);
    if (!res.ok) throw new Error("HTTP error " + res.status);

    const json = await res.json();
    console.log("DATA PROGRESS:", json);

    // =========================
    // 🔥 HEADER (JUDUL ATAS)
    // =========================
    if (json.header) {
      const title = document.getElementById("progressTitle");
      const info = document.getElementById("progressInfo");

      if (title) {
        title.innerText = "📈 " + (json.header.title || "Progress Report VTS");
      }

      if (info) {
        info.innerHTML = `
          <div><b>Customer</b> : ${json.header.customer || "-"}</div>
          <div><b>Job Type</b> : ${json.header.job || "-"}</div>
          <div><b>Area</b> : ${json.header.area || "-"}</div>
        `;
      }
    }

    // =========================
    // 🔥 DATA TABEL
    // =========================
    const data = Array.isArray(json) ? json : json.data || [];

    tbody.innerHTML = "";

    if (!data || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10">Data kosong</td></tr>`;
      return;
    }

    let no = 1;

    data.forEach((item) => {
      const row = `
        <tr>
          <td>${no++}</td>
          <td>${item.Node || "-"}</td>
          <td>${item["License Plate"] || "-"}</td>
          <td>${item["Status VTS"] || "-"}</td>
          <td>${item.IMEI || "-"}</td>
          <td>${item.IMSI || "-"}</td>
          <td>${item.Status || "-"}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  } catch (err) {
    console.error("LOAD PROGRESS ERROR:", err);
    tbody.innerHTML = `<tr><td colspan="10">❌ Gagal load data</td></tr>`;
  }
}
function showProgressReport() {
  hideAllSections();

  document.getElementById("progressReportSection").style.display = "block";

  // 🔥 load dari Google Sheet
  loadProgressReport();

  window.scrollTo({ top: 0, behavior: "smooth" });

  document.getElementById("slidePanel").classList.remove("open");
  document.getElementById("monitoringPanel").classList.remove("open");
}
function downloadProgressExcel() {
  try {
    if (typeof XLSX === "undefined") {
      alert("❌ XLSX belum ke-load");
      return;
    }

    const headerRow = document.getElementById("progressHeader");
    const tbody = document.getElementById("progressTableBody");

    const titleEl = document.getElementById("progressTitle");
    const infoEl = document.getElementById("progressInfo");

    if (!headerRow || !tbody) {
      alert("❌ Struktur tabel tidak ditemukan");
      return;
    }

    const rows = tbody.querySelectorAll("tr");

    if (rows.length === 0 || rows[0].innerText.includes("Klik tombol")) {
      alert("⚠️ Data belum tersedia");
      return;
    }

    // =========================
    // 🔥 AMBIL JUDUL
    // =========================
    const title = titleEl ? titleEl.innerText : "Progress Report VTS";

    // =========================
    // 🔥 AMBIL HEADER INFO (RAPI 3 KOLOM)
    // =========================
    let formattedInfo = [];

    if (infoEl) {
      const structuredRows = infoEl.querySelectorAll(".info-row");

      // kalau pakai struktur baru (label, colon, value)
      if (structuredRows.length > 0) {
        structuredRows.forEach((row) => {
          const label = row.querySelector(".label")?.innerText.trim() || "";
          const value = row.querySelector(".value")?.innerText.trim() || "";

          formattedInfo.push([label, ": " + value]);
        });
      }
      // fallback kalau masih format lama
      else {
        infoEl.querySelectorAll("div").forEach((div) => {
          const parts = div.innerText.split(":");
          formattedInfo.push([
            (parts[0] || "").trim(),
            ": " + (parts[1] || "").trim()
          ]);
        });
      }
    }

    // =========================
    // 🔥 HEADER KOLOM
    // =========================
    const headers = [];
    headerRow.querySelectorAll("th").forEach((th) => {
      headers.push(th.innerText.trim());
    });

    // =========================
    // 🔥 DATA
    // =========================
    const data = [];
    rows.forEach((tr) => {
      const row = [];
      tr.querySelectorAll("td").forEach((td, index) => {
        let text = td.innerText.trim();

        // 🔥 fix IMEI biar tidak scientific
        if (index === 4) {
          text = "'" + text;
        }

        row.push(text);
      });

      if (row.length > 1) data.push(row);
    });

    // =========================
    // 🔥 GABUNG SEMUA
    // =========================
    const sheetData = [[title], ...formattedInfo, [], headers, ...data];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // =========================
    // 🔥 MERGE JUDUL
    // =========================
    ws["!merges"] = [
      {
        s: { r: 0, c: 0 },
        e: { r: 0, c: headers.length - 1 }
      }
    ];

    // =========================
    // 🔥 LEBAR KOLOM (HEADER + DATA)
    // =========================
    ws["!cols"] = [
      { wch: 20 }, // label
      { wch: 5 }, // :
      { wch: 35 }, // value
      ...headers.map(() => ({ wch: 25 }))
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Progress Report");

    const now = new Date();
    const fileName = `Progress_Report_VTS_${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}.xlsx`;

    XLSX.writeFile(wb, fileName);
  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    alert("❌ Gagal download, cek console (F12)");
  }
}
const SUMMARY_API =
  "https://script.google.com/macros/s/AKfycbxdlTGtyAdapfCRhFgiB9E2gWqpUVwSU5ZxqY70SC3Bqi9tKSXciehwADcjlc64vJ-_QA/exec?sheet=Summary%20Day";

// 🔥 helper ambil value (anti beda nama kolom)
function getVal(obj, keys) {
  for (let k of keys) {
    if (obj[k] !== undefined && obj[k] !== "") return obj[k];
  }
  return "-";
}

// 🔥 NORMALISASI KEY (ANTI SPASI & CASE)
function normalizeKeys(obj) {
  const newObj = {};
  Object.keys(obj).forEach((k) => {
    const clean = k.toLowerCase().replace(/\s+/g, "");
    newObj[clean] = obj[k];
  });
  return newObj;
}

function formatDate(val) {
  try {
    if (!val || val === "-") return "-";

    // 🔥 ISO STRING (2026-03-31T17:00:00.000Z)
    if (typeof val === "string" && val.includes("T")) {
      const date = new Date(val);
      if (isNaN(date)) return val; // fallback kalau gagal

      const wib = new Date(date.getTime() + 7 * 60 * 60 * 1000);

      return wib.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    }

    // 🔥 STRING BIASA (31-april-2026)
    if (typeof val === "string") {
      return val.replace(/-/g, " ").replace(/april/i, "April");
    }

    // 🔥 OBJECT DATE
    const date = new Date(val);
    if (isNaN(date)) return val; // fallback

    const wib = new Date(date.getTime() + 7 * 60 * 60 * 1000);

    return wib.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  } catch (err) {
    console.error("FORMAT DATE ERROR:", val, err);
    return val || "-"; // 🔥 jangan sampai crash
  }
}

async function loadSummaryDay() {
  const thead = document.getElementById("summaryThead");
  const tbody = document.getElementById("summaryTableBody");
  const title = document.getElementById("summaryTitle");

  tbody.innerHTML = `<tr><td colspan="12">⏳ Loading...</td></tr>`;

  try {
    const res = await fetch(SUMMARY_API);
    const json = await res.json();

    console.log("SUMMARY RAW:", json);

    let data = [];
    let periode = "";

    if (Array.isArray(json)) {
      data = json;
    } else {
      data = json.data || [];
      periode = json.periode || "";
    }

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="12">Data kosong</td></tr>`;
      return;
    }

    let headerHTML = "";

    if (json.header && json.header.length > 0) {
      headerHTML = json.header.join("<br>");
    } else {
      headerHTML = `
    SUMMARY OF CHARGE FOR SERVICE CHARGE <br>
    PERTAMINA EP ASSET 1 JAMBI <br>
    PERIODE
  `;
    }

    title.innerHTML = headerHTML;

    // =========================
    // 🔥 HEADER TABLE
    // =========================
    thead.innerHTML = `
      <tr>
        <th rowspan="2">NO</th>
        <th colspan="2">Unit identification</th>
        <th colspan="3">Vehicle identification</th>
        <th rowspan="2">VTS/MONTH</th>
        <th rowspan="2">RFID</th>
        <th rowspan="2">FUEL STICK INDIKATOR/MONTH</th>
        <th rowspan="2">KOLOM TAMBAHAN</th>
        <th colspan="2">Periode pemakaian</th>
        <th rowspan="2">Jumlah hari</th>
      </tr>
      <tr>
        <th>GPS No</th>
        <th>IMEI</th>
        <th>License Plate</th>
        <th>Vehicle ID</th>
        <th>Model</th>
        <th>Start</th>
        <th>End</th>
      </tr>
    `;

    // =========================
    // 🔥 BODY DATA
    // =========================
    tbody.innerHTML = "";
    let no = 1;

    data.forEach((item) => {
      const clean = normalizeKeys(item);

      // 🔥 AUTO DETECT (ANTI GESER)
      const startRaw =
        clean["start"] ||
        clean["periodepemakaianstart"] ||
        clean["2026periodepemakaianstart"];

      const endRaw =
        clean["end"] ||
        clean["periodepemakaianend"] ||
        clean["2026periodepemakaianend"];

      const jumlahHari = clean["jumlahhari"] || clean["days"];

      const row = `
        <tr>
          <td>${no++}</td>
          <td>${getVal(item, ["GPS No"])}</td>
          <td>${getVal(item, ["IMEI"])}</td>
          <td>${getVal(item, ["License Plate"])}</td>
          <td>${getVal(item, ["Vehicle ID", "VEHICLE ID"])}</td>
          <td>${getVal(item, ["MODEL", "Model"])}</td>
          <td>${getVal(item, ["VTS/MONTH"])}</td>
          <td>${getVal(item, ["RFID"])}</td>
          <td>${getVal(item, ["FUEL STICK INDIKATOR/MONTH"])}</td>
          <td>${getVal(item, ["KOLOM TAMBAHAN"])}</td>
        
          <td>${formatDate(startRaw)}</td>
          <td>${formatDate(endRaw)}</td>

          <td>${jumlahHari || "-"}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    tbody.innerHTML = `<tr><td colspan="12">❌ Gagal load data</td></tr>`;
  }
}
function downloadSummaryExcel() {
  const table = document.querySelector("#summaryDaySection table");

  if (!table) {
    alert("Tabel tidak ditemukan!");
    return;
  }

  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:x="urn:schemas-microsoft-com:office:excel" 
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
  `;

  // 🔥 ambil judul
  const title = document.getElementById("summaryTitle").innerText;
  html += `<h2 style="text-align:center;">${title.replace(/\n/g, "<br>")}</h2>`;

  // 🔥 ambil tabel
  html += table.outerHTML;

  html += `</body></html>`;

  const blob = new Blob([html], {
    type: "application/vnd.ms-excel"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Summary_VTS.xls";
  a.click();

  URL.revokeObjectURL(url);
}
function refreshSummary() {
  const tbody = document.getElementById("summaryTableBody");

  // 🔥 kasih loading effect
  tbody.innerHTML = `<tr><td colspan="12">🔄 Refreshing...</td></tr>`;

  // 🔥 reload data
  loadSummaryDay();
}
/* ===================== LOAD LAPORAN PEKERJAAN ===================== */
const rowsPerPage = 50;
let currentPage = 1;
let allReportData = [];

// ===================== LOAD DATA LAPORAN =====================
async function loadReport() {
  const tableBody = document.querySelector("#reportTable tbody");

  // 🌀 Loader animasi
  tableBody.innerHTML = `
    <tr>
      <td colspan="17" style="text-align:center; font-weight:500; font-size:15px;">
        <div style="display:flex; align-items:center; justify-content:center; gap:10px;">
          <div class="loader"></div>
          <span>Memuat data laporan, mohon tunggu...</span>
        </div>
      </td>
    </tr>`;

  try {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec";
    const response = await fetch(scriptURL);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log("📥 Data Laporan:", data);

    allReportData = data;
    currentPage = 1;
    renderReportTable();
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="18" style="text-align:center;">❌ Gagal memuat data!</td></tr>`;
    console.error("❌ Error load report:", error);
  }
}

// ===================== RENDER TABEL =====================
function renderReportTable() {
  const tableBody = document.querySelector("#reportTable tbody");
  tableBody.innerHTML = "";

  if (!allReportData || allReportData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="18" style="text-align:center;">❌ Tidak ada data laporan</td></tr>`;
    return;
  }

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = allReportData.slice(start, end);

  pageData.forEach((item, i) => {
    const row = document.createElement("tr");
    const photoField = item["Foto Bukti"] || item["Upload foto Bukti"] || "";
    const tanggal = item["Tanggal"] || "";

    row.innerHTML = `
      <td>${start + i + 1}</td>
      <td>${item["Job Number"] || ""}</td>
      <td>${tanggal}</td>
      <td>${item["User name"] || ""}</td>
      <td>${item["working type"] || ""}</td>
      <td>${item["installation type"] || ""}</td>
      <td>${item["Merk kendaraan"] || ""}</td>
      <td>${item["Vehicle type"] || ""}</td>
      <td>${item["Lisence plate"] || ""}</td>
      <td>${item["Vehicle id"] || ""}</td>
      <td>${item["Department"] || ""}</td>
      <td>${item["GPS Serial No"] || ""}</td>
      <td>${item["GPS Unit ID"] || ""}</td>
      <td>${item["GSM"] || ""}</td>
      <td>${item["Progres Status"] || ""}</td>
      <td class="desc-cell">${item["Deskripsi Pekerjaan"] || ""}</td>
      <td>${renderPhotoCell(photoField)}</td>
     <td>
  <button class="view-btn table-btn" onclick='openDetail(${JSON.stringify(
    item
  )})'>
    <i class="fa-solid fa-eye"></i> Detail
  </button>

  <button class="edit-btn table-btn" onclick='openEdit(${JSON.stringify(
    item
  )})'>
    <i class="fa-solid fa-pen-to-square"></i> Edit
  </button>

  <button class="delete-btn table-btn" onclick='deleteItem("${
    item["Job Number"]
  }")'>
    <i class="fa-solid fa-trash"></i> Hapus
  </button>
</td>

    `;
    tableBody.appendChild(row);
  });

  renderPaginationNumbers();
}

// ===================== OPEN EDIT =====================
function openEdit(item) {
  // Tampilkan form input
  showForm();

  // Scroll halus ke form input
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Mengisi form SAMPAI SAMA dengan formData yang Anda kirim ke Sheet
  document.getElementById("jobNumber").textContent = item["Job Number"] || "";
  document.getElementById("user").value = item["User name"] || "";
  document.getElementById("workingType").value = item["working type"] || "";
  document.getElementById("installationType").value =
    item["installation type"] || "";
  document.getElementById("merkKendaraan").value = item["Merk kendaraan"] || "";
  document.getElementById("vehicleType").value = item["Vehicle type"] || "";
  document.getElementById("licensePlate").value = item["Lisence plate"] || "";
  document.getElementById("vehicleId").value = item["Vehicle id"] || "";
  document.getElementById("department").value = item["Department"] || "";
  document.getElementById("colour").value = item["Colour"] || "";
  document.getElementById("location").value = item["Location"] || "";
  document.getElementById("gpsSerial").value = item["GPS Serial No"] || "";
  document.getElementById("gpsUnitId").value = item["GPS Unit ID"] || "";
  document.getElementById("gsm").value = item["GSM"] || "";
  document.getElementById("distance").value = item["Distance"] || "";

  // Radio
  setRadio("gps", item["GPS Unit Module"]);
  setRadio("rfid", item["RFID Reader"]);
  setRadio("buzzer", item["Buzzer"]);
  setRadio("starter", item["Stater interupter"]);
  setRadio("fuel", item["Fuel stick"]);

  // Komponen
  setRadio("d-mesin", item["Mesin"]);
  setRadio("d-paneldashboard", item["Panel Dasbord"]);
  setRadio("d-klakson", item["Klakson"]);
  setRadio("d-audio", item["Audio"]);
  setRadio("d-listrik", item["Sistem listrik"]);
  setRadio("d-ac", item["AC"]);
  setRadio("d-powerwindows", item["Power windows"]);
  setRadio("d-panelinstrument", item["Panel Instrument"]);
  setRadio("d-spion", item["Spion"]);

  // Lainnya
  document.getElementById("deskripsiPekerjaan").value =
    item["Deskripsi Pekerjaan"] || "";
  document.getElementById("progressStatus").value =
    item["Progres Status"] || "";
}

// ===================== HELPER RADIO =====================
function setRadio(name, value) {
  const radios = document.querySelectorAll(`input[name="${name}"]`);
  radios.forEach((r) => {
    r.checked = r.parentElement.textContent.trim() === value;
  });
}

// ===================== DELETE ITEM =====================
function deleteItem(jobNumber) {
  if (!confirm("❗ Apakah Anda yakin ingin menghapus data ini?")) return;

  allReportData = allReportData.filter(
    (item) => item["Job Number"] !== jobNumber
  );

  localStorage.setItem("reportData", JSON.stringify(allReportData));

  renderReportTable();

  alert("✅ Data berhasil dihapus!");
}

// ===================== PAGINATION DENGAN ANGKA =====================
function renderPaginationNumbers() {
  const totalPages = Math.ceil(allReportData.length / rowsPerPage);
  let paginationContainer = document.getElementById("pagination");

  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination";
    paginationContainer.style.textAlign = "center";
    paginationContainer.style.margin = "15px 0";
    paginationContainer.style.userSelect = "none";
    document.querySelector(".table-responsive").after(paginationContainer);
  }

  let buttonsHTML = `<span class="page-btn" onclick="changePage(-1)" ${
    currentPage === 1 ? "style='opacity:0.5;pointer-events:none;'" : ""
  }>⬅</span>`;

  for (let i = 1; i <= totalPages; i++) {
    buttonsHTML += `
      <span class="page-number ${
        i === currentPage ? "active" : ""
      }" onclick="goToPage(${i})">${i}</span>
    `;
  }

  buttonsHTML += `<span class="page-btn" onclick="changePage(1)" ${
    currentPage === totalPages ? "style='opacity:0.5;pointer-events:none;'" : ""
  }>➡</span>`;

  paginationContainer.innerHTML = buttonsHTML;
}

function goToPage(page) {
  currentPage = page;
  renderReportTable();
  document
    .querySelector(".table-responsive")
    .scrollIntoView({ behavior: "smooth" });
}

function changePage(direction) {
  const totalPages = Math.ceil(allReportData.length / rowsPerPage);
  const newPage = currentPage + direction;

  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    renderReportTable();
    document
      .querySelector(".table-responsive")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// ===================== RENDER FOTO =====================
function renderPhotoCell(photoField) {
  if (!photoField) return "❌ Tidak ada foto";
  if (photoField.startsWith("http")) {
    return `<a href="${photoField}" target="_blank">📷 Lihat</a>`;
  }
  return photoField;
}

async function downloadReportWithPhotos() {
  const table = document.getElementById("reportTable");
  if (!table) return alert("❌ Tabel tidak ditemukan!");

  // === 🔄 Tambahkan loader overlay ===
  const loader = document.createElement("div");
  loader.id = "excelLoader";
  loader.style.position = "fixed";
  loader.style.top = 0;
  loader.style.left = 0;
  loader.style.width = "100vw";
  loader.style.height = "100vh";
  loader.style.background = "rgba(0, 0, 0, 0.5)";
  loader.style.display = "flex";
  loader.style.flexDirection = "column";
  loader.style.alignItems = "center";
  loader.style.justifyContent = "center";
  loader.style.zIndex = 9999;
  loader.innerHTML = `
    <div style="background:#fff; padding:20px 40px; border-radius:10px; text-align:center; box-shadow:0 0 15px rgba(0,0,0,0.2);">
      <div class="spinner" style="border: 4px solid #eee; border-top: 4px solid #007ACC; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
      <p style="font-family:'Poppins',sans-serif; color:#007ACC; font-weight:500;">🔄 Sedang menyiapkan file Excel...</p>
    </div>
  `;
  document.body.appendChild(loader);

  // === Animasi spinner ===
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Report");

    // ===== Ambil header =====
    const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
      th.innerText.trim()
    );
    sheet.addRow(headers);

    // ===== Ambil data =====
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll("td");
      const rowValues = [];

      for (let j = 0; j < cells.length; j++) {
        const img = cells[j].querySelector("img");
        if (img) {
          rowValues.push(""); // Placeholder untuk gambar
        } else {
          rowValues.push(cells[j].innerText.trim());
        }
      }

      const addedRow = sheet.addRow(rowValues);

      // ===== Tambahkan gambar =====
      for (let j = 0; j < cells.length; j++) {
        const img = cells[j].querySelector("img");
        if (img) {
          try {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();

            const imageId = workbook.addImage({
              buffer: arrayBuffer,
              extension: "jpeg"
            });

            // Letakkan gambar di sel
            sheet.addImage(imageId, {
              tl: { col: j, row: i + 1 },
              ext: { width: 80, height: 60 }
            });
          } catch (err) {
            console.error("⚠️ Gagal menambahkan gambar:", err);
          }
        }
      }
    }

    // ===== Styling header =====
    const headerRow = sheet.getRow(1);
    headerRow.height = 25;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF007ACC" }
      };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin", color: { argb: "FFCCCCCC" } },
        left: { style: "thin", color: { argb: "FFCCCCCC" } },
        bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
        right: { style: "thin", color: { argb: "FFCCCCCC" } }
      };
    });

    // ===== Styling isi =====
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin", color: { argb: "FFEEEEEE" } },
            left: { style: "thin", color: { argb: "FFEEEEEE" } },
            bottom: { style: "thin", color: { argb: "FFEEEEEE" } },
            right: { style: "thin", color: { argb: "FFEEEEEE" } }
          };
          cell.alignment = {
            vertical: "middle",
            horizontal: "left",
            wrapText: true
          };
        });
      }
    });

    sheet.columns.forEach((col) => (col.width = 25));

    // ===== Simpan Excel =====
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `report_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  } catch (error) {
    alert("❌ Terjadi kesalahan saat membuat file Excel!");
    console.error(error);
  } finally {
    // === Hapus loader setelah selesai ===
    loader.remove();
  }
}

// ===================== LOAD LAPORAN FOTO =====================
async function loadPhotoReport() {
  const tableBody = document.querySelector("#photoReportTable tbody");
  const paginationContainer = document.getElementById("photoPagination");

  tableBody.innerHTML = `
    <tr>
      <td colspan="8" style="text-align:center; font-weight:500; font-size:15px;">
        <div style="display:flex; align-items:center; justify-content:center; gap:10px;">
          <div class="loader"></div>
          <span>Memuat data foto, mohon tunggu...</span>
        </div>
      </td>
    </tr>
  `;

  try {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbzqXaF0psZg2-IM4M8YFl6vWWrKAOlpXb_IooJFMBqVGi3i-vGPQqiIjprwWoLns_Wk/exec";

    console.log("📡 Fetching data from:", scriptURL);
    const response = await fetch(scriptURL);

    // 🛑 Jika tidak 200 OK
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} - ${response.statusText}`);
    }

    // 🧠 Coba parse JSON dengan aman
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      const textData = await response.text();
      console.error("⚠️ Response bukan JSON valid:", textData);
      throw new Error("Response dari server bukan format JSON valid");
    }

    console.log("✅ Data diterima:", data);

    // 🔍 Filter data yang memiliki foto
    const filteredData = data.filter(
      (item) => item["Upload foto Bukti"] || item["Foto Bukti"]
    );

    if (filteredData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">📭 Tidak ada foto tersimpan</td></tr>`;
      paginationContainer.innerHTML = "";
      return;
    }

    // 📖 Pagination
    const rowsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    function renderPage(page) {
      tableBody.innerHTML = "";
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const pageData = filteredData.slice(start, end);

      pageData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${start + index + 1}</td>
          <td>${item["Job Number"] || ""}</td>
          <td>${item["User name"] || ""}</td>
          <td>${item["Department"] || ""}</td>
          <td>${item["Vehicle id"] || ""}</td>
          <td>${item["Progres Status"] || ""}</td>
          <td>${
            item["Deskripsi Pekerjaan"] || "<i>Tidak ada deskripsi</i>"
          }</td>
          <td>${renderPhotoCell(
            item["Upload foto Bukti"] || item["Foto Bukti"]
          )}</td>
        `;
        tableBody.appendChild(row);
      });

      renderPagination(page);
      window.scrollTo({ top: tableBody.offsetTop - 100, behavior: "smooth" });
    }

    // 🔢 Pagination angka
    function renderPagination(activePage) {
      paginationContainer.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = `page-number ${i === activePage ? "active" : ""}`;
        btn.onclick = () => renderPage(i);
        paginationContainer.appendChild(btn);
      }
    }

    renderPage(currentPage);
  } catch (err) {
    console.error("❌ Error load photo report:", err);
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">❌ Gagal memuat data!<br><small>${err.message}</small></td></tr>`;
  }
}

// === UTILITAS: Tampilkan Foto ===
function renderPhotoCell(url) {
  if (!url) return "<span style='color:#aaa;'>📷 Tidak ada foto</span>";
  let fileId = "";
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]{25,})/,
    /id=([a-zA-Z0-9_-]{25,})/,
    /open\?id=([a-zA-Z0-9_-]{25,})/,
    /file\/d\/([a-zA-Z0-9_-]{25,})/,
    /uc\?export=view&id=([a-zA-Z0-9_-]{25,})/,
    /([a-zA-Z0-9_-]{25,})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      fileId = match[1];
      break;
    }
  }

  const photoURL = fileId
    ? `https://lh3.googleusercontent.com/d/${fileId}=s220`
    : url;

  return `
    <a href="https://drive.google.com/file/d/${fileId}/view" target="_blank" title="Klik untuk lihat foto">
      <img src="${photoURL}"
           alt="Foto Bukti"
           onerror="this.onerror=null;this.src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png';"
           style="width:70px;height:70px;border-radius:10px;object-fit:cover;box-shadow:0 0 3px rgba(0,0,0,0.3);cursor:pointer;">
    </a>
  `;
}

async function downloadPhotoReport() {
  const table = document.getElementById("photoReportTable");
  if (!table) return alert("❌ Tabel laporan foto tidak ditemukan!");

  // === 🔄 Tampilkan loader ===
  const loader = document.createElement("div");
  loader.id = "downloadLoader";
  loader.innerHTML = `
    <div class="loader-overlay">
      <div class="loader-box">
        <div class="spinner"></div>
        <p>Mengunduh laporan dengan foto... Mohon tunggu 🙏</p>
      </div>
    </div>
  `;
  document.body.appendChild(loader);

  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Laporan Foto");

    // === Ambil header sampai kolom "Foto Bukti" ===
    const allHeaders = Array.from(
      table.querySelectorAll("thead th")
    ).map((th) => th.innerText.trim());
    const fotoIndex = allHeaders.findIndex((h) =>
      h.toLowerCase().includes("foto bukti")
    );
    const headers =
      fotoIndex !== -1 ? allHeaders.slice(0, fotoIndex + 1) : allHeaders;
    sheet.addRow(headers);

    // === Ambil data baris ===
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll("td");
      const rowValues = [];
      const limit = fotoIndex !== -1 ? fotoIndex + 1 : cells.length;

      for (let j = 0; j < limit; j++) {
        const img = cells[j].querySelector("img");
        if (img) {
          rowValues.push(""); // placeholder gambar
        } else {
          rowValues.push(cells[j].innerText.trim());
        }
      }

      const addedRow = sheet.addRow(rowValues);

      // === Tambah gambar jika ada ===
      for (let j = 0; j < limit; j++) {
        const img = cells[j].querySelector("img");
        if (img) {
          try {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();

            const imageId = workbook.addImage({
              buffer: arrayBuffer,
              extension: "jpeg"
            });

            sheet.addImage(imageId, {
              tl: { col: j, row: i + 1 },
              ext: { width: 80, height: 60 }
            });
          } catch (err) {
            console.error("⚠️ Gagal menambahkan gambar:", err);
          }
        }
      }
    }

    // === Lebar kolom otomatis ===
    sheet.columns.forEach((col) => (col.width = 25));

    // === Styling header ===
    const headerRow = sheet.getRow(1);
    for (let i = 1; i <= fotoIndex + 1; i++) {
      const cell = headerRow.getCell(i);
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF007ACC" } // biru
      };
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // putih
      cell.alignment = { vertical: "middle", horizontal: "center" };
    }

    // === Download hasil Excel ===
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `laporan_foto_${new Date().toISOString().split("T")[0]}.xlsx`
    );

    alert("✅ Laporan dengan foto berhasil diunduh!");
  } catch (err) {
    console.error("❌ Gagal membuat laporan:", err);
    alert("❌ Terjadi kesalahan saat membuat laporan. Silakan coba lagi.");
  } finally {
    // === 🔁 Hapus loader setelah selesai ===
    const loader = document.getElementById("downloadLoader");
    if (loader) loader.remove();
  }
}

// ===================== MODAL DETAIL =====================
function openDetail(item = {}) {
  const modal = document.getElementById("detailModal");
  const modalContent = document.getElementById("detailContent");
  modal.style.display = "block";

  // ================= Bagian C – Hasil Uji =================
  const bagianCKeys = [
    "GPS Unit Module",
    "RFID Reader",
    "Buzzer",
    "Stater interupter",
    "Fuel stick"
  ];
  const hasilUji = bagianCKeys.map((key) => ({
    jobDescription: key,
    status: item[key] || "",
    note: "",
    checked: item[key] === "OK"
  }));

  // ================= Bagian D – Komponen =================
  const bagianDKeys = [
    "Mesin",
    "Panel Dasbord",
    "Klakson",
    "Audio",
    "Sistem listrik",
    "AC",
    "Power windows",
    "Panel Instrument",
    "Spion"
  ];
  const bagD = bagianDKeys.map((key) => ({
    deskripsi: item[key + "_desc"] || "",
    OK: (item[key] || "").toLowerCase() === "ok",
    NotOK: (item[key] || "").toLowerCase() === "not ok",
    NA: (item[key] || "").toLowerCase() === "na"
  }));

  // ================= Bagian E – Deskripsi Pekerjaan =================
  const deskripsiPekerjaan = (item["Deskripsi Pekerjaan"] || "").replace(
    /\r\n|\r/g,
    "\n"
  );

  // ===================== TANGGAL / HARI UPDATE OTOMATIS =====================
  const now = new Date();
  const hariList = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];
  const hari = hariList[now.getDay()];
  const tanggal = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // 🔄 Jika belum ada hari update, buat otomatis
  if (!item["Hari Update"]) {
    item["Hari Update"] = `${hari}, ${tanggal}`;

    // Simpan ke localStorage agar tidak berubah lagi
    let allData = JSON.parse(localStorage.getItem("jobReports") || "[]");
    const index = allData.findIndex(
      (d) => d["Job Number"] === item["Job Number"]
    );

    if (index !== -1) {
      allData[index]["Hari Update"] = item["Hari Update"];
    } else {
      allData.push(item);
    }

    localStorage.setItem("jobReports", JSON.stringify(allData));
  }

  const html = `
<style>
  * {
    font-family: "Segoe UI", Roboto, Arial, sans-serif;
    line-height: 1.45;
    color: #222;
  }

  body {
    background: #ffffff;
  }

  h1, h2 {
    margin: 0;
    font-weight: 600;
  }

  /* HEADER PREMIUM */
  .modal-header {
    display: flex;
    align-items: center;
    gap: 22px;
    padding-bottom: 22px;
    border-bottom: 3px solid #1e3a8a; /* 🔥 ditegaskan warna */
    margin-bottom: 26px;
  }

  .modal-header img {
    height: 100px;
    border-radius: 4px;
    border: 2.5px solid #1e3a8a; /* 🔥 border foto premium */
  }

  .modal-header h1 {
    font-size: 27px;
  }

  .modal-header h2 {
    font-size: 19px;
    color: #334155;
  }

  /* JOB BOX */
  .job-number {
    background: #f3f6ff;
    border: 2px solid #1e3a8a; /* 🔥 diperkeras */
    padding: 14px 18px;
    border-radius: 12px;
    margin-bottom: 26px;
    display: flex;
    justify-content: space-between;
    font-size: 15.5px;
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(30,58,138,0.15); /* glow biru lembut */
  }

  /* SECTION BOX */
  .modal-section {
    border: 2px solid #1e3a8a; /* 🔥 border diperkuat */
    padding: 18px;
    border-radius: 12px;
    margin-bottom: 32px;
    background: #ffffff;
    box-shadow: 0 3px 8px rgba(30,58,138,0.12); /* shadow soft elegan */
  }

  .modal-section h2 {
    font-size: 20px;
    border-left: 7px solid #1e3a8a; /* 🔥 kiri lebih prestige */
    padding-left: 12px;
    margin-bottom: 16px;
    color: #1e3a8a;
  }

  /* GRID FORM FIELD */
  .modal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .modal-grid div {
    border: 2px solid #64748b; /* 🔥 lebih crisp */
    padding: 10px 12px;
    border-radius: 10px;
    background: #f8fafc;
  }

  label {
    display: block;
    font-size: 13px;
    color: #1e3a8a; /* corporate blue */
    margin-bottom: 4px;
    font-weight: 700; /* ditegaskan */
  }

  input, textarea {
    width: 100%;
    border: none;
    font-size: 15px;
    background: transparent;
    outline: none;
    font-weight: 500;
  }

  input[type="time"] {
    font-size: 14px;
  }

  /* TABLES */
  .modal-table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
    border: 2px solid #1e3a8a; /* 🔥 frame table lebih profesional */
  }

  .modal-table th {
    background: #e0e7ff;
    color: #1e3a8a;
    padding: 10px;
    border: 2px solid #1e3a8a; /* header tebal */
    font-weight: 700;
  }

  .modal-table td {
    padding: 9px;
    border: 1.8px solid #94a3b8; /* garis soft tapi jelas */
    text-align: center;
  }

  .modal-table input[type="checkbox"] {
    transform: scale(1.25);
  }

  /* SIGNATURE */
  .signature-table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    margin-top: 8px;
    border: 2px solid #1e3a8a; /* border ditegaskan */
  }

  .signature-table th {
    padding: 12px;
    border-bottom: 2px solid #1e3a8a;
    font-size: 15.5px;
    background: #eef2ff;
    color: #1e3a8a;
    font-weight: 700;
  }

  .signature-table td {
    height: 95px;
    border: 1.8px solid #94a3b8;
  }

  /* FOOTER */
  .modal-footer {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
    gap: 14px;
  }

  .modal-footer button {
    padding: 10px 20px;
    border: 0;
    background: #1e3a8a;
    color: white;
    font-size: 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
    font-weight: 700;
    border: 2px solid #1e3a8a; /* button border luxury */
  }

  .modal-footer button:nth-child(1) {
    background: #475569;
    border: 2px solid #475569;
  }

  .modal-footer button:hover {
    transform: scale(1.03);
    opacity: 0.92;
  }

</style>

<!-- HEADER -->
<div class="modal-header">
  <img src="https://i.postimg.cc/CLr4t8vR/indosat.webp">
  <div>
    <h1>Indosat Ooredoo & Pertamina Jambi Project</h1>
    <h2>Laporan Pekerjaan (Job Report)</h2>
    <p style="margin:3px 0; font-size:14px;">Alamat: Kenali Asam Atas, Kota Baru, Kota Jambi</p>
    <p style="margin:3px 0; font-size:14px;">WhatsApp: DA. 0852-6762-7060 | Teknisi VTS 0895-3822-81515</p>
  </div>
</div>

<!-- JOB NUMBER -->
<div class="job-number">
  <div><strong>No. Pekerjaan:</strong> ${item["Job Number"] || ""}</div>
  <div><strong>${item["Hari Update"]}</strong></div>
</div>

<form id="jobForm">

<!-- BAGIAN A -->
<div class="modal-section">
  <h2>Bagian A – Informasi Pekerjaan</h2>
  <div class="modal-grid">
    <div><label>User Name</label><input type="text" value="${
      item["User name"] || ""
    }"></div>
    <div><label>Working Type</label><input type="text" value="${
      item["working type"] || ""
    }"></div>
    <div><label>Installation Type</label><input type="text" value="${
      item["installation type"] || ""
    }"></div>
  </div>
</div>

<!-- BAGIAN B -->
<div class="modal-section">
  <h2>Bagian B – Informasi Kendaraan</h2>
  <div class="modal-grid">
    ${[
      "Merk kendaraan",
      "Vehicle type",
      "Lisence plate",
      "Vehicle id",
      "Department",
      "Colour",
      "Location",
      "GPS Serial No",
      "GPS Unit ID",
      "GSM",
      "Distance"
    ]
      .map(
        (key) => `
      <div>
        <label>${key}</label>
        <input type="${key === "Distance" ? "number" : "text"}" value="${
          item[key] || ""
        }">
      </div>
    `
      )
      .join("")}
  </div>
</div>

<!-- BAGIAN C -->
<div class="modal-section">
  <h2>Bagian C – Hasil Uji</h2>
  <table class="modal-table">
    <thead>
      <tr>
        <th>No</th><th>Job Description</th><th>OK</th><th>Not OK</th><th>N/A</th><th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${hasilUji
        .map(
          (row, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${row.jobDescription}</td>
          <td><input type="checkbox" ${
            row.status === "OK" ? "checked" : ""
          }></td>
          <td><input type="checkbox" ${
            row.status === "Not OK" ? "checked" : ""
          }></td>
          <td><input type="checkbox" ${
            row.status === "NA" ? "checked" : ""
          }></td>
          <td><input type="checkbox" ${row.checked ? "checked" : ""}></td>
        </tr>`
        )
        .join("")}
    </tbody>
  </table>
</div>

<!-- BAGIAN D -->
<div class="modal-section">
  <h2>Bagian D – Uraian Pemeriksaan</h2>
  <table class="modal-table">
    <thead>
      <tr>
        <th>No</th><th>Komponen</th><th>OK</th><th>Not OK</th><th>N/A</th>
      </tr>
    </thead>
    <tbody>
      ${bagD
        .map(
          (row, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${bagianDKeys[i]}</td>
          <td><input type="checkbox" ${row.OK ? "checked" : ""}></td>
          <td><input type="checkbox" ${row.NotOK ? "checked" : ""}></td>
          <td><input type="checkbox" ${row.NA ? "checked" : ""}></td>
        </tr>`
        )
        .join("")}
    </tbody>
  </table>
</div>

<!-- BAGIAN E -->
<div class="modal-section">
  <h2>Bagian E – Laporan Pekerjaan</h2>
  <label>Deskripsi Pekerjaan</label>
  <div style="border:1px solid #d1d5db; border-radius:6px; padding:12px; background:#f8fafc; margin-bottom:14px;">
    ${deskripsiPekerjaan.replace(/\\n/g, "<br>")}
  </div>

  <div class="modal-grid">
    <div><label>Jam Awal</label><input type="time" value="${
      item["Jam Awal"] || ""
    }"></div>
    <div><label>Jam Akhir</label><input type="time" value="${
      item["Jam Akhir"] || ""
    }"></div>
    <div><label>Progress Status</label><input type="text" value="${
      item["Progres Status"] || ""
    }"></div>
  </div>
</div>

<!-- TANDA TANGAN -->
<div class="modal-section">
  <table class="signature-table">
    <thead><tr><th>EOS</th><th>Data Analis</th><th>User</th></tr></thead>
    <tbody><tr><td></td><td></td><td></td></tr></tbody>
  </table>
</div>

<!-- FOOTER -->
<div class="modal-footer">
  <button type="button" onclick="closeDetail()">Tutup</button>
  <button type="button" onclick="downloadPDF()">Download PDF</button>
  <button type="button" onclick="downloadExcel()">Download Excel</button>
</div>

</form>
`;

  modalContent.innerHTML = html;
}

// Tutup modal
function closeDetail() {
  const modal = document.getElementById("detailModal");
  modal.style.display = "none";
  document.getElementById("detailContent").innerHTML = "";
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("detailModal");
  if (event.target === modal) closeDetail();
});

async function downloadPDF() {
  const original = document.getElementById("detailContent");

  const hideElements = original.querySelectorAll(".no-print, button");
  hideElements.forEach((el) => (el.style.display = "none"));

  const clone = original.cloneNode(true);
  clone.style.maxHeight = "none";
  clone.style.overflow = "visible";
  clone.style.height = "auto";
  clone.style.position = "absolute";
  clone.style.top = "-9999px";
  clone.style.left = "0";
  clone.style.width = "210mm";
  clone.style.background = "#ffffff";
  clone.style.maxWidth = "210mm";
  clone.style.minWidth = "210mm";
  clone.style.zoom = "1";
  clone.style.transform = "scale(1)";
  clone.style.webkitPrintColorAdjust = "exact";
  clone.style.printColorAdjust = "exact";

  document.body.appendChild(clone);

  clone.querySelectorAll("table").forEach((table) => {
    table.style.border = "2px solid #000";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
  });

  /* =======================
     FIX INTI (RINGAN)
     ======================= */

  // 🔥 MATIKAN CSS BERAT KHUSUS PDF
  const pdfStyle = document.createElement("style");
  pdfStyle.innerHTML = `
    * {
      box-shadow: none !important;
      text-shadow: none !important;
      transition: none !important;
    }
    .modal-section,
    .job-number,
    table {
      border-radius: 0 !important;
    }
  `;
  clone.appendChild(pdfStyle);

  // 🔑 SCALE TURUN = CEPAT (MASIH TAJAM A4)
  const canvas = await html2canvas(clone, {
    scale: 2, // ⬅️ INI KUNCI KECEPATAN
    useCORS: true,
    backgroundColor: "#ffffff",
    imageSmoothingEnabled: false,
    logging: false
  });

  // JPEG jauh lebih ringan
  const imgData = canvas.toDataURL("image/jpeg", 0.9);

  // 🔥 WAJIB BUANG CANVAS
  canvas.width = 0;
  canvas.height = 0;
  canvas.remove();

  const pdf = new jspdf.jsPDF("p", "mm", "a4");

  pdf.addImage(imgData, "JPEG", 0, 0, 210, 295);
  pdf.save(`Job_Report_${new Date().toISOString().slice(0, 10)}.pdf`);

  hideElements.forEach((el) => (el.style.display = ""));
  document.body.removeChild(clone);
}

async function getBase64(url) {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("Gagal fetch logo");
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // data:<type>;base64,....
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("getBase64 error:", err);
    return null;
  }
}

async function downloadExcel() {
  if (typeof ExcelJS === "undefined") {
    alert(
      "Library ExcelJS belum dimuat. Tambahkan CDN ExcelJS sebelum script ini."
    );
    return;
  }
  if (typeof saveAs === "undefined") {
    alert(
      "Library FileSaver (saveAs) belum dimuat. Tambahkan CDN FileSaver sebelum script ini."
    );
    return;
  }

  try {
    const logoUrl = "https://i.postimg.cc/CLr4t8vR/indosat.webp";
    const logoDataUrl = await getBase64(logoUrl);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("JOB REPORT", {
      pageSetup: {
        orientation: "portrait",
        fitToPage: true,
        horizontalCentered: true
      }
    });

    sheet.properties.defaultRowHeight = 20;
    sheet.getColumn(1).width = 28;
    sheet.getColumn(2).width = 38;
    sheet.getColumn(3).width = 22;
    sheet.getColumn(4).width = 22;
    sheet.getColumn(5).width = 22; // Kolom E
    sheet.getColumn(6).width = 22; // Kolom F

    const borderSoft = {
      top: { style: "thin", color: { argb: "FFBBBBBB" } },
      left: { style: "thin", color: { argb: "FFBBBBBB" } },
      right: { style: "thin", color: { argb: "FFBBBBBB" } },
      bottom: { style: "thin", color: { argb: "FFBBBBBB" } }
    };

    // ⭐ UPGRADE PREMIUM: Font Korporat Global
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = { name: "Segoe UI" };
      });
    });

    if (logoDataUrl) {
      let base64String = logoDataUrl;
      if (base64String.indexOf(",") !== -1)
        base64String = base64String.split(",")[1];

      const imageId = workbook.addImage({
        base64: base64String,
        extension: "png"
      });

      sheet.mergeCells("A1:B6");
      sheet.addImage(imageId, {
        tl: { col: 0, row: 0 },
        br: { col: 2, row: 6 }
      });

      [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6"
      ].forEach((c) => {
        sheet.getCell(c).border = borderSoft;
      });
    }

    const headerTitle =
      document.querySelector(".modal-header h1")?.innerText || "Job Report";
    const headerSub =
      document.querySelector(".modal-header h2")?.innerText || "";
    const jobNumber =
      document
        .querySelectorAll(".job-number > div")[0]
        ?.innerText.split(":")[1]
        ?.trim() || "";
    const tanggal =
      document.querySelectorAll(".job-number > div")[1]?.innerText.trim() || "";
    const alamat =
      document.querySelector(".modal-header p:nth-of-type(1)")?.innerText || ""; // Alamat
    const kontak =
      document.querySelector(".modal-header p:nth-of-type(2)")?.innerText || ""; // Kontak

    // Mengatur header dengan format yang lebih profesional
    sheet.mergeCells("C1:D2");
    sheet.getCell("C1").value = headerTitle;
    sheet.getCell("C1").alignment = {
      horizontal: "center",
      vertical: "middle"
    };
    sheet.getCell("C1").font = { bold: true, size: 16 }; // Ukuran font lebih besar
    sheet.getCell("C1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD9EAD3" } // Warna latar belakang
    };
    sheet.getCell("C1").border = {
      bottom: { style: "thin", color: { argb: "FF000000" } } // Garis bawah
    };

    sheet.mergeCells("C3:D4");
    sheet.getCell("C3").value = headerSub;
    sheet.getCell("C3").alignment = {
      horizontal: "center",
      vertical: "middle"
    };
    sheet.getCell("C3").font = { italic: true, size: 12 }; // Font italic untuk subjudul
    sheet.getCell("C3").border = {
      bottom: { style: "thin", color: { argb: "FF000000" } } // Garis bawah
    };

    sheet.mergeCells("C5:D6");
    sheet.getCell("C5").value = alamat; // Menambahkan alamat
    sheet.getCell("C5").alignment = {
      horizontal: "center",
      vertical: "middle"
    };
    sheet.getCell("C5").font = { size: 10 }; // Ukuran font lebih kecil

    // Menambahkan kontak
    sheet.addRow([]);
    sheet.mergeCells("C7:D7");
    sheet.getCell("C7").value = kontak; // Menambahkan kontak
    sheet.getCell("C7").alignment = {
      horizontal: "center",
      vertical: "middle"
    };
    sheet.getCell("C7").font = { size: 10 };

    // Menambahkan border untuk semua sel header
    [
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "D1",
      "D2",
      "D3",
      "D4",
      "D5",
      "D6"
    ].forEach((c) => {
      sheet.getCell(c).border = borderSoft;
    });

    // ⭐ UPGRADE PREMIUM: Header Gradien
    sheet.getCell("C1").fill = {
      type: "gradient",
      gradient: "angle",
      degree: 90,
      stops: [
        { position: 0, color: { argb: "FFF6D32A" } },
        { position: 1, color: { argb: "FFFFF8A6" } }
      ]
    };

    sheet.addRow([]);
    sheet.mergeCells("A8:F8"); // Memperluas ke kolom F
    sheet.getCell("A8").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF9DA3A" }
    };
    sheet.getCell("A8").border = borderSoft;

    sheet.addRow([]);
    sheet.mergeCells("A10:C10");
    sheet.getCell("A10").value = `No. Pekerjaan : ${jobNumber}`;
    sheet.getCell("A10").font = { bold: true };
    sheet.getCell("A10").border = borderSoft;

    sheet.getCell("D10").value = tanggal;
    sheet.getCell("D10").alignment = { horizontal: "right" };
    sheet.getCell("D10").border = borderSoft;

    // ⭐ UPGRADE PREMIUM: Spasi visual
    sheet.getRow(10).height = 26;

    function sectionHeader(text) {
      sheet.addRow([]);
      const r = sheet.addRow([text]);
      const rn = r.number;
      sheet.mergeCells(`A${rn}:F${rn}`); // Memperluas ke kolom F
      sheet.getCell(`A${rn}`).font = { bold: true };
      sheet.getCell(`A${rn}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFCEFA6" }
      };
      sheet.getCell(`A${rn}`).alignment = { horizontal: "left" };
      sheet.getCell(`A${rn}`).border = borderSoft;
      sheet.getRow(rn).height = 24;
      return rn;
    }

    const secA = document.querySelectorAll(".modal-section")[0];
    sectionHeader("Bagian A – Informasi Pekerjaan");
    if (secA) {
      const inputs = secA.querySelectorAll("input, textarea");
      if (inputs.length === 0) {
        const r = sheet.addRow([secA.innerText.trim(), "", "", "", "", ""]); // Menambahkan kolom kosong hingga F
        r.eachCell((c) => (c.border = borderSoft));
      } else {
        inputs.forEach((inp) => {
          const row = sheet.addRow([
            inp.closest("div")?.querySelector("label")?.innerText || "",
            inp.value || "",
            "",
            "",
            "",
            ""
          ]); // Menambahkan kolom kosong hingga F
          row.eachCell((c) => (c.border = borderSoft));
        });
      }
    }

    const secB = document.querySelectorAll(".modal-section")[1];
    sectionHeader("Bagian B – Informasi Kendaraan");
    if (secB) {
      const cards = secB.querySelectorAll(".modal-grid div");
      if (cards.length === 0) {
        const r = sheet.addRow([secB.innerText.trim(), "", "", "", "", ""]); // Menambahkan kolom kosong hingga F
        r.eachCell((c) => (c.border = borderSoft));
      } else {
        cards.forEach((div) => {
          const row = sheet.addRow([
            div.querySelector("label")?.innerText || "",
            div.querySelector("input, textarea")?.value || div.innerText,
            "",
            "",
            "",
            "" // Menambahkan kolom kosong hingga F
          ]);
          row.eachCell((c) => (c.border = borderSoft));
        });
      }
    }

    function parseTableAndWrite(sel) {
      const tbl = sel.querySelector(".modal-table");
      if (!tbl) return;
      [...tbl.querySelectorAll("tr")].forEach((tr, idx) => {
        const cells = [...tr.querySelectorAll("th, td")].map((td) => {
          const cb = td.querySelector("input[type='checkbox']");
          return cb ? (cb.checked ? "✔" : "") : td.innerText.trim();
        });
        const row = sheet.addRow([...cells, "", "", ""]); // Menambahkan kolom kosong hingga F
        row.eachCell((c) => (c.border = borderSoft));
        if (idx === 0) {
          row.font = { bold: true };
          row.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFEFEFEF" }
          };
        }
      });
    }

    sectionHeader("Bagian C – Hasil Uji");
    parseTableAndWrite(document.querySelectorAll(".modal-section")[2]);

    sectionHeader("Bagian D – Uraian Pemeriksaan");
    parseTableAndWrite(document.querySelectorAll(".modal-section")[3]);

    const secE = document.querySelectorAll(".modal-section")[4];
    sectionHeader("Bagian E – Laporan Pekerjaan");
    if (secE) {
      const desc = (secE.innerText || "").split("\n").filter(Boolean);
      desc.forEach((t) => {
        const r = sheet.addRow([t, "", "", "", "", ""]); // Menambahkan kolom kosong hingga F
        r.eachCell((c) => (c.border = borderSoft));
      });
    }

    sheet.addRow([]);
    const signRow = sheet.addRow(["EOS", "Data Analis", "User", "", "", ""]); // Menambahkan kolom kosong hingga F
    signRow.eachCell((c) => {
      c.font = { bold: true };
      c.alignment = { horizontal: "center" };
      c.border = borderSoft;
    });

    const sEmpty1 = sheet.addRow([
      "(________________)",
      "",
      "(________________)",
      "",
      "",
      ""
    ]); // Menambahkan kolom kosong hingga F
    sEmpty1.eachCell((c) => {
      c.alignment = { horizontal: "center" };
      c.border = borderSoft;
    });

    // ⭐ UPGRADE PREMIUM: Watermark Transparan
    if (logoDataUrl) {
      sheet.addBackgroundImage(
        workbook.addImage({
          base64: logoDataUrl,
          extension: "png"
        }),
        "A15:F40"
      ); // Memperluas watermark hingga kolom F
    }

    // ⭐ UPGRADE PREMIUM: Footer otomatis
    sheet.headerFooter.oddFooter =
      "&C © Indosat Ooredoo Hutchison - Confidential Report";

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `Job_Report_${jobNumber || "report"}.xlsx`);
  } catch (err) {
    console.error("downloadExcel error:", err);
    alert("Gagal membuat file Excel. Cek console untuk detail.");
  }
}

// ===================== PENCARIAN SPESIFIK BERDASARKAN JOB NUMBER =====================
function filterTable() {
  const searchJob = document.getElementById("searchJob").value.toLowerCase();
  const searchVehicle = document
    .getElementById("searchVehicle")
    .value.toLowerCase();
  const table = document.getElementById("reportTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const jobCell = rows[i].getElementsByTagName("td")[1]; // Kolom No Pekerjaan
    const vehicleCell = rows[i].getElementsByTagName("td")[9]; // Kolom Vehicle ID

    const matchJob =
      jobCell && jobCell.textContent.toLowerCase().includes(searchJob);
    const matchVehicle =
      vehicleCell &&
      vehicleCell.textContent.toLowerCase().includes(searchVehicle);

    rows[i].style.display = matchJob && matchVehicle ? "" : "none";
  }
}

function clearSearchJob() {
  document.getElementById("searchJob").value = "";
  filterTable(); // Refresh filter setelah input dikosongkan
}

function clearSearchVehicle() {
  document.getElementById("searchVehicle").value = "";
  filterTable(); // Refresh filter setelah input dikosongkan
}
