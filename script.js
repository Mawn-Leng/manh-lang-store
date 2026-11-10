
const grid = document.getElementById("app-grid");
const apps = window.STORE_APPS || [];

const year = document.getElementById("year");
const appCount = document.getElementById("app-count");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (appCount) {
  appCount.textContent = `${String(apps.length).padStart(2, "0")} ứng dụng`;
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

if (grid) {
  grid.innerHTML = apps.map(app => {
    const ready = Boolean(app.available && app.file);

    const icon = app.icon
      ? `<img class="app-icon" src="${escapeHTML(app.icon)}" alt="${escapeHTML(app.name)}" onerror="this.style.display='none'">`
      : `<div class="app-icon placeholder-icon">${escapeHTML((app.name || "A").slice(0, 1).toUpperCase())}</div>`;

    const isContact =
      app.type === "DNS" ||
      app.type === "Chứng chỉ" ||
      (app.buttonText || "").toLowerCase().includes("liên hệ");

    const buttonText = app.buttonText || (
      isContact ? "Liên hệ Admin" : "Tải file IPA ↓"
    );

    const isExternal =
      app.file && (
        app.file.includes("t.me") ||
        app.file.includes("telegram")
      );

    return `
      <article class="app-card">
        ${icon}
        <div class="app-info">
          <span class="tag">iOS · ${escapeHTML(app.type || "IPA")}</span>
          <h3>${escapeHTML(app.name || "Ứng dụng")}</h3>
          <p>${escapeHTML(app.description || "")}</p>
          <div class="meta">
            Phiên bản ${escapeHTML(app.version || "—")}
            <span>•</span>
            ${escapeHTML(app.size || "—")}
          </div>
        </div>

        ${
          ready
            ? `<a class="download"
                href="${escapeHTML(app.file)}"
                ${isExternal ? 'target="_blank" rel="noopener"' : 'download'}>
                ${escapeHTML(buttonText)}
              </a>`
            : `<span class="download disabled">Đang cập nhật</span>`
        }
      </article>
    `;
  }).join("");
}

// Popup Telegram
function closePopup() {
  const popup = document.getElementById("telegram-popup");
  if (popup) popup.style.display = "none";
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const popup = document.getElementById("telegram-popup");
    if (popup) popup.style.display = "flex";
  }, 800);
});
