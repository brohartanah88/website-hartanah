(function () {
  "use strict";

  const T = TETAPAN;
  const DATA = SENARAI_HARTANAH;
  const $ = (s) => document.querySelector(s);

  // ---------- Utiliti ----------
  const rm = (n) => "RM " + Math.round(n).toLocaleString("en-MY");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const waLink = (mesej) => `https://wa.me/${T.noWhatsApp}?text=${encodeURIComponent(mesej)}`;
  const keluasanTeks = (h) => {
    if (h.jenis === "Tanah" && h.keluasan >= 43560) {
      return (h.keluasan / 43560).toLocaleString("en-MY", { maximumFractionDigits: 2 }) + " ekar";
    }
    return h.keluasan.toLocaleString("en-MY") + " kps";
  };
  const hargaTeks = (h) => rm(h.harga) + (h.status === "Sewa" ? "<small> / bulan</small>" : "");

  // ---------- Isi maklumat agensi ----------
  document.querySelectorAll("[data-agensi]").forEach((el) => (el.textContent = T.namaAgensi));
  document.querySelectorAll("[data-slogan]").forEach((el) => (el.textContent = T.slogan));
  document.title = `${T.namaAgensi} | Rumah, Kondo & Tanah Untuk Dijual dan Disewa`;
  $("#tahun").textContent = new Date().getFullYear();
  $("#fREN").textContent = T.noREN || "";
  $("#cTel").textContent = T.noTelefonPaparan;
  $("#cTel").href = "tel:+" + T.noWhatsApp;
  $("#cEmail").textContent = T.email;
  $("#cEmail").href = "mailto:" + T.email;
  $("#cAlamat").textContent = T.alamat;
  const salamWa = `Salam ${T.namaAgensi}, saya berminat untuk bertanya tentang hartanah.`;
  $("#waFloat").href = waLink(salamWa);
  $("#kosongWa").href = waLink(salamWa);

  const social = [["Facebook", T.facebook], ["Instagram", T.instagram], ["TikTok", T.tiktok]]
    .filter(([, url]) => url)
    .map(([nama, url]) => `<a class="btn btn-ghost btn-sm" href="${esc(url)}" target="_blank" rel="noopener">${nama}</a>`);
  $("#social").innerHTML = social.join("");

  // ---------- Statistik ----------
  $("#statJumlah").textContent = DATA.length;
  $("#statJual").textContent = DATA.filter((h) => h.status === "Jual").length;
  $("#statSewa").textContent = DATA.filter((h) => h.status === "Sewa").length;

  // ---------- Pilihan penapis (dijana dari data) ----------
  const unik = (k) => [...new Set(DATA.map((h) => h[k]))].sort();
  const isiPilihan = (sel, nilai) => nilai.forEach((v) => sel.insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`));
  isiPilihan($("#fJenis"), unik("jenis"));
  isiPilihan($("#heroJenis"), unik("jenis"));
  isiPilihan($("#fNegeri"), unik("negeri"));

  // ---------- Paparan senarai ----------
  const f = {
    kata: $("#fKata"), status: $("#fStatus"), jenis: $("#fJenis"),
    negeri: $("#fNegeri"), bilik: $("#fBilik"), susun: $("#fSusun")
  };

  function tapis() {
    const kata = f.kata.value.trim().toLowerCase();
    const minBilik = +f.bilik.value;
    let hasil = DATA.filter((h) =>
      (!kata || [h.tajuk, h.lokasi, h.negeri, h.jenis].join(" ").toLowerCase().includes(kata)) &&
      (!f.status.value || h.status === f.status.value) &&
      (!f.jenis.value || h.jenis === f.jenis.value) &&
      (!f.negeri.value || h.negeri === f.negeri.value) &&
      (h.bilik >= minBilik)
    );
    const s = f.susun.value;
    hasil.sort((a, b) =>
      s === "harga-naik" ? a.harga - b.harga :
      s === "harga-turun" ? b.harga - a.harga :
      s === "keluasan" ? b.keluasan - a.keluasan :
      (b.unggulan ? 1 : 0) - (a.unggulan ? 1 : 0)
    );
    return hasil;
  }

  function kad(h) {
    const meta = [];
    if (h.bilik) meta.push(`<span>🛏 ${h.bilik} bilik</span>`);
    if (h.bilikAir) meta.push(`<span>🛁 ${h.bilikAir}</span>`);
    meta.push(`<span>📐 ${keluasanTeks(h)}</span>`);
    meta.push(`<span>${esc(h.pegangan)}</span>`);
    return `
      <article class="card" tabindex="0" data-id="${h.id}" aria-label="${esc(h.tajuk)}">
        <div class="card-img">
          <img src="${esc(h.gambar)}" alt="${esc(h.tajuk)}" loading="lazy">
          <span class="badge ${h.status === "Jual" ? "jual" : "sewa"}">Untuk ${h.status === "Jual" ? "Dijual" : "Disewa"}</span>
          ${h.unggulan ? '<span class="badge pilihan">★ Pilihan</span>' : ""}
        </div>
        <div class="card-body">
          <span class="tag-jenis">${esc(h.jenis)}</span>
          <div class="price">${hargaTeks(h)}</div>
          <h3>${esc(h.tajuk)}</h3>
          <div class="loc">📍 ${esc(h.lokasi)}, ${esc(h.negeri)}</div>
          <div class="meta">${meta.join("")}</div>
        </div>
      </article>`;
  }

  function papar() {
    const hasil = tapis();
    $("#grid").innerHTML = hasil.map(kad).join("");
    $("#kosong").hidden = hasil.length > 0;
    $("#kiraanHasil").textContent = `${hasil.length} hartanah dijumpai`;
  }

  Object.values(f).forEach((el) => el.addEventListener("input", papar));
  $("#fReset").addEventListener("click", () => {
    f.kata.value = ""; f.status.value = ""; f.jenis.value = "";
    f.negeri.value = ""; f.bilik.value = "0"; f.susun.value = "unggulan";
    papar();
  });

  // ---------- Carian hero ----------
  let heroStatus = "";
  document.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    heroStatus = tab.dataset.status;
  }));
  $("#carianHero").addEventListener("submit", (e) => {
    e.preventDefault();
    f.kata.value = $("#heroKata").value;
    f.jenis.value = $("#heroJenis").value;
    f.status.value = heroStatus;
    papar();
    $("#hartanah").scrollIntoView();
  });

  // ---------- Modal butiran ----------
  const modal = $("#modal");
  let fokusSebelum = null;

  function bukaModal(id) {
    const h = DATA.find((x) => x.id === id);
    if (!h) return;
    const mesej = `Salam ${T.namaAgensi}, saya berminat dengan hartanah ini:\n\n` +
      `*${h.tajuk}*\n${h.lokasi}, ${h.negeri}\nHarga: ${rm(h.harga)}${h.status === "Sewa" ? " / bulan" : ""}\n(Ref #${h.id})\n\n` +
      `Boleh saya dapatkan maklumat lanjut atau buat temujanji untuk melihat?`;
    const specs = [
      ["Jenis", h.jenis],
      ["Status", h.status === "Jual" ? "Untuk Dijual" : "Untuk Disewa"],
      h.bilik ? ["Bilik tidur", h.bilik] : null,
      h.bilikAir ? ["Bilik air", h.bilikAir] : null,
      ["Keluasan", keluasanTeks(h)],
      ["Pegangan", h.pegangan],
      ["No. Rujukan", "#" + h.id]
    ].filter(Boolean);

    $("#modalIsi").innerHTML = `
      <div class="m-img"><img src="${esc(h.gambar)}" alt="${esc(h.tajuk)}"></div>
      <div class="m-body">
        <span class="tag-jenis">${esc(h.jenis)}</span>
        <h2 id="mTajuk">${esc(h.tajuk)}</h2>
        <div class="loc">📍 ${esc(h.lokasi)}, ${esc(h.negeri)}</div>
        <div class="m-price">${hargaTeks(h)}</div>
        <div class="m-specs">${specs.map(([k, v]) => `<div><small>${k}</small><strong>${esc(v)}</strong></div>`).join("")}</div>
        <p>${esc(h.penerangan)}</p>
        ${h.ciri && h.ciri.length ? `<ul class="m-ciri">${h.ciri.map((c) => `<li>✓ ${esc(c)}</li>`).join("")}</ul>` : ""}
        <div class="m-actions">
          <a class="btn btn-wa" href="${waLink(mesej)}" target="_blank" rel="noopener">WhatsApp Tentang Hartanah Ini</a>
          <a class="btn btn-outline" href="tel:+${T.noWhatsApp}">Telefon</a>
          ${h.status === "Jual" ? `<button class="btn btn-ghost" data-kira="${h.harga}">Kira Pinjaman</button>` : ""}
        </div>
      </div>`;
    fokusSebelum = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();
    history.replaceState(null, "", "#hartanah-" + h.id);
  }

  function tutupModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    history.replaceState(null, "", location.pathname + location.search);
    if (fokusSebelum) fokusSebelum.focus();
  }

  $("#grid").addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (c) bukaModal(+c.dataset.id);
  });
  $("#grid").addEventListener("keydown", (e) => {
    const c = e.target.closest(".card");
    if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); bukaModal(+c.dataset.id); }
  });
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-tutup]")) tutupModal();
    const k = e.target.closest("[data-kira]");
    if (k) {
      $("#kHarga").value = k.dataset.kira;
      kira();
      tutupModal();
      $("#kalkulator").scrollIntoView();
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") tutupModal(); });

  // Pautan terus ke hartanah, contoh: index.html#hartanah-3
  const padan = location.hash.match(/^#hartanah-(\d+)$/);
  if (padan) bukaModal(+padan[1]);

  // ---------- Kalkulator pinjaman ----------
  function kira() {
    const harga = +$("#kHarga").value || 0;
    const deposit = Math.min(Math.max(+$("#kDeposit").value || 0, 0), 100);
    const kadar = (+$("#kKadar").value || 0) / 100 / 12;
    const n = Math.max(+$("#kTempoh").value || 1, 1) * 12;
    const pinjaman = harga * (1 - deposit / 100);
    const bulanan = kadar === 0 ? pinjaman / n : pinjaman * kadar / (1 - Math.pow(1 + kadar, -n));
    $("#kBulanan").textContent = rm(bulanan);
    $("#kPinjaman").textContent = `Jumlah pinjaman ${rm(pinjaman)} · Deposit ${rm(harga - pinjaman)}`;
  }
  $("#kalkForm").addEventListener("input", kira);

  // ---------- Borang hubungi → WhatsApp ----------
  $("#borangHubungi").addEventListener("submit", (e) => {
    e.preventDefault();
    const mesej = `Salam ${T.namaAgensi},\n\nNama: ${$("#hNama").value}\nSaya ingin: ${$("#hTujuan").value}\n\n${$("#hMesej").value}`;
    window.open(waLink(mesej), "_blank", "noopener");
  });

  // ---------- Navigasi ----------
  const nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });
  toggle.addEventListener("click", () => {
    const buka = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", buka);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }
  });

  papar();
  kira();
})();
