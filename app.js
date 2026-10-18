(() => {
  const $ = s => document.querySelector(s);
  const root = document.documentElement;
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const fmt = d => new Date(d).toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric" });
  const meta = p => `<div class="meta"><span>${p.cat}</span><span>${fmt(p.date)}</span></div>`;
  const link = p => `post.html?slug=${p.slug}`;

  // header + footer on every page
  document.body.insertAdjacentHTML("afterbegin",
    `<header class="top"><div class="wrap"><a class="logo" href="index.html">${SITE.name}</a><button id="mode" aria-label="डार्क मोड बदलें">◐</button></div></header>`);
  document.body.insertAdjacentHTML("beforeend",
    `<footer><div class="wrap"><span>© ${new Date().getFullYear()} ${SITE.name}</span><nav>${
      Object.keys(PAGES).map(k => `<a href="page.html?p=${k}">${PAGES[k].title}</a>`).join("")}</nav></div></footer>`);
  $("#mode").onclick = () => {
    const t = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
  };

  const row = p => `<a class="row" href="${link(p)}" style="--h:${p.hue}"><div class="tile">${p.emoji}</div><div>${meta(p)}<h3>${p.title}</h3><p>${p.excerpt}</p></div></a>`;
  const feat = p => `<a class="feat" href="${link(p)}" style="--h:${p.hue}"><div class="tile">${p.emoji}</div><div class="txt">${meta(p)}<h2>${p.title}</h2><p>${p.excerpt}</p></div></a>`;

  const page = document.body.dataset.page;

  if (page === "home") {
    let cat = "सभी", q = "";
    const cats = ["सभी", ...new Set(posts.map(p => p.cat))];
    const draw = () => {
      $("#chips").innerHTML = cats.map(c => `<button class="chip" aria-pressed="${c === cat}">${c}</button>`).join("");
      const L = posts.filter(p => (cat === "सभी" || p.cat === cat) && (p.title + p.excerpt + p.cat).toLowerCase().includes(q));
      $("#list").innerHTML = L.length
        ? feat(L[0]) + L.slice(1).map(row).join("")
        : `<p class="empty">कोई पोस्ट नहीं मिली। दूसरा शब्द खोजें या "सभी" चुनें।</p>`;
    };
    $("#chips").onclick = e => { if (e.target.classList.contains("chip")) { cat = e.target.textContent; draw(); } };
    $("#q").oninput = e => { q = e.target.value.trim().toLowerCase(); draw(); };
    draw();
  }

  if (page === "post") {
    const slug = new URLSearchParams(location.search).get("slug");
    const p = posts.find(x => x.slug === slug);
    const el = $("#art");
    if (!p) { el.innerHTML = `<h1>पोस्ट नहीं मिली</h1><p><a href="index.html">होम पर जाएं</a></p>`; return; }
    document.title = `${p.title} | ${SITE.name}`;
    $("meta[name=description]").content = p.excerpt;
    const rel = [...posts.filter(x => x !== p && x.cat === p.cat), ...posts.filter(x => x !== p && x.cat !== p.cat)].slice(0, 3);
    const wa = "https://wa.me/?text=" + encodeURIComponent(p.title + " " + location.href);
    el.innerHTML = `${meta(p)}<h1>${p.title}</h1><div class="body">${p.body}</div>
      <a class="share" href="${wa}" target="_blank" rel="noopener">WhatsApp पर शेयर करें</a>
      <section class="more"><h2>और पढ़ें</h2>${rel.map(row).join("")}</section>`;
  }

  if (page === "page") {
    const k = new URLSearchParams(location.search).get("p");
    const pg = PAGES[k];
    $("#art").innerHTML = pg ? `<h1>${pg.title}</h1><div class="body">${pg.html}</div>` : `<h1>पेज नहीं मिला</h1>`;
    if (pg) document.title = `${pg.title} | ${SITE.name}`;
  }
})();
