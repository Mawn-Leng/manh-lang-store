const grid = document.getElementById("app-grid");
const apps = window.STORE_APPS || [];
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("app-count").textContent = `${String(apps.length).padStart(2, "0")} ứng dụng`;

if (apps.length) {
  grid.innerHTML = apps.map(app => {
    const ready = Boolean(app.available && app.file);
    const icon = app.icon
      ? `<img class="app-icon" src="${escapeHTML(app.icon)}" alt="">`
      : `<div class="app-icon placeholder-icon">${escapeHTML((app.name || "A").slice(0, 1).toUpperCase())}</div>`;

    // Xác định nội dung nút
    const isContact = app.type === "DNS" || 
                      app.type === "Chứng chỉ" || 
                      (app.buttonText && app.buttonText.toLowerCase().includes("liên hệ")) ||
                      (app.name && app.name.toLowerCase().includes("liên hệ admin"));

    const buttonText = app.buttonText || (isContact ? "Liên hệ Admin" : "Tải file IPA ↓");
    const isExternal = isContact || (app.file && (app.file.includes("t.me") || app.file.includes("telegram")));

    return `<article class="app-card">
      ${icon}
      <div class="app-info">
        <span class="tag">iOS · ${escapeHTML(app.type || "IPA")}</span>
        <h3>${escapeHTML(app.name)}</h3>
        <p>${escapeHTML(app.description || "")}</p>
        <div class="meta">Phiên bản ${escapeHTML(app.version || "—")} <span>•</span> ${escapeHTML(app.size || "—")}</div>
      </div>
      ${ready
        ? `<a class="download" href="${escapeHTML(app.file)}" ${isExternal ? 'target="_blank" rel="noopener"' : 'download'}>
            ${escapeHTML(buttonText)}
           </a>`
        : `<span class="download disabled">Đang cập nhật</span>`}
    </article>`;
  }).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}
// Hiện popup khi vào web
window.addEventListener("load", function() {
  // Hiện popup sau 0.8 giây
  setTimeout(() => {
    document.getElementById("telegram-popup").style.display = "flex";
  }, 800);
});

function closePopup() {
  document.getElementById("telegram-popup").style.display = "none";
}
// Typing effect
const words = ["Developer", "Creator", "Store Owner", "Helper"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing-text");

function typeEffect() {
  if (!typingEl) return;
  const current = words[wordIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 400);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}
typeEffect();

// Counter animation
document.querySelectorAll(".number").forEach(counter => {
  const target = +counter.getAttribute("data-target");
  let current = 0;
  const step = target / 80;

  const update = () => {
    current += step;
    if (current < target) {
      counter.textContent = Math.ceil(current) + "+";
      requestAnimationFrame(update);
    } else {
      counter.textContent = target + "+";
    }
  };
  setTimeout(update, 800);
});
