const grid = document.getElementById("app-grid");
const apps = window.STORE_APPS || [];
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("app-count").textContent = `${String(apps.length).padStart(2,"0")} ứng dụng`;
if (apps.length) {
  grid.innerHTML = apps.map(app => {
    const ready = Boolean(app.available && app.file);
    const icon = app.icon
      ? `<img class="app-icon" src="${escapeHTML(app.icon)}" alt="">`
      : `<div class="app-icon placeholder-icon">${escapeHTML((app.name || "A").slice(0,1).toUpperCase())}</div>`;
    return `<article class="app-card">
      ${icon}
      <div class="app-info">
        <span class="tag">iOS · IPA</span>
        <h3>${escapeHTML(app.name)}</h3>
        <p>${escapeHTML(app.description || "")}</p>
        <div class="meta">Phiên bản ${escapeHTML(app.version || "—")} <span>•</span> ${escapeHTML(app.size || "—")}</div>
      </div>
      ${ready
        ? `<a class="download" href="${escapeHTML(app.file)}" download>Tải file IPA ↓</a>`
        : `<span class="download disabled">Đang cập nhật</span>`}
    </article>`;
  }).join("");
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
