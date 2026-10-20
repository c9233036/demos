// 戰情中心範本：各示範系統共用小工具（資料全在頁面記憶體，重新整理即還原）
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const nf = n => Number(n).toLocaleString("en-US");
const pad = n => String(n).padStart(2, "0");
const nowStr = () => { const d = new Date(); return `${d.getMonth()+1}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };

let _toastT = 0;
function toast(msg){
  let t = $("#toast");
  if (!t){ t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("on");
  clearTimeout(_toastT); _toastT = setTimeout(() => t.classList.remove("on"), 2200);
}

// 分頁：<div class="tabs" data-tabs="x"><button data-tab="a">…  ＋  <section data-pane="a">
function initTabs(onChange){
  $$(".tabs[data-tabs]").forEach(bar => {
    const btns = $$("button[data-tab]", bar);
    const show = key => {
      btns.forEach(b => b.setAttribute("aria-selected", String(b.dataset.tab === key)));
      $$(`[data-pane]`).filter(p => p.dataset.group === bar.dataset.tabs)
        .forEach(p => { p.hidden = p.dataset.pane !== key; });
      onChange && onChange(key);
    };
    bar.addEventListener("click", e => { const b = e.target.closest("button[data-tab]"); if (b) show(b.dataset.tab); });
    show(btns[0].dataset.tab);
  });
}
