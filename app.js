(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement, page = document.body.dataset.page;
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const fmt = d => new Date(d).toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric" });
  const mins = p => Math.max(1, Math.ceil(p.body.replace(/<[^>]+>/g, " ").split(/\s+/).length / 180));
  const meta = p => `<div class="meta"><span>${p.cat}</span><span>${fmt(p.date)}</span><span>${mins(p)} मिनट पढ़ें</span></div>`;
  const cover = p => p.img ? `<div class="cover"><img src="${p.img}" alt="" loading="lazy"></div>` : `<div class="cover tile">${p.emoji}</div>`;
  const card = (p, k = "card") => `<a class="${k}" href="post.html?slug=${p.slug}" style="--h:${p.hue}">${cover(p)}<div class="ct">${meta(p)}<h3>${p.title}</h3><p>${p.excerpt}</p></div></a>`;
  const cta = () => `<div class="cta"><div><h2>रोज़ एक नया AI टूल सीखें</h2><p>हमारे WhatsApp चैनल पर नई पोस्ट सबसे पहले पाएं।</p></div><a class="btn" href="${SITE.channel}" target="_blank" rel="noopener">WhatsApp चैनल जॉइन करें</a></div>`;
  const copy = async (t, b) => {
    try { await navigator.clipboard.writeText(t); } catch (e) { const a = document.createElement("textarea"); a.value = t; document.body.append(a); a.select(); document.execCommand("copy"); a.remove(); }
    const o = b.textContent; b.textContent = "कॉपी हो गया ✓"; b.classList.add("ok");
    setTimeout(() => { b.textContent = o; b.classList.remove("ok"); }, 1600);
  };

  // header, footer, theme, scroll helpers
  const NAV = [["index.html", "होम"], ["tools.html", "AI Tools"], ["prompts.html", "Prompts"], ["write.html", "लिखें"]];
  const here = location.pathname.split("/").pop() || "index.html";
  document.body.insertAdjacentHTML("afterbegin",
    `<div id="bar"></div><header class="top"><div class="wrap"><a class="logo" href="index.html"><span class="mark">AI</span>${SITE.name}</a><nav>${
      NAV.map(([h, t]) => `<a href="${h}"${here === h ? ' aria-current="page"' : ""}>${t}</a>`).join("")
    }<button id="mode" aria-label="डार्क मोड बदलें">◐</button></nav></div></header>`);
  document.body.insertAdjacentHTML("beforeend",
    `<footer><div class="wrap"><span>© ${new Date().getFullYear()} ${SITE.name}</span><nav>${
      Object.keys(PAGES).map(k => `<a href="page.html?p=${k}">${PAGES[k].title}</a>`).join("")
    }</nav></div></footer><button id="up" aria-label="ऊपर जाएं">↑</button>`);
  $("#mode").onclick = () => {
    const t = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
  };
  $("#up").onclick = () => scrollTo({ top: 0 });
  addEventListener("scroll", () => {
    $("#up").style.display = scrollY > 600 ? "block" : "none";
    if (page === "post") $("#bar").style.width = (scrollY / Math.max(1, root.scrollHeight - innerHeight)) * 100 + "%";
  });

  // reusable list with category chips and search
  function listing(items, catOf, textOf, render) {
    let cat = "सभी", q = "";
    const cats = ["सभी", ...new Set(items.map(catOf))];
    const draw = () => {
      $("#chips").innerHTML = cats.map(c => `<button class="chip" aria-pressed="${c === cat}">${c}</button>`).join("");
      const L = items.filter(x => (cat === "सभी" || catOf(x) === cat) && textOf(x).toLowerCase().includes(q));
      $("#list").innerHTML = L.length ? render(L) : `<p class="empty">कुछ नहीं मिला। दूसरा शब्द खोजें या "सभी" चुनें।</p>`;
    };
    $("#chips").onclick = e => { if (e.target.classList.contains("chip")) { cat = e.target.textContent; draw(); } };
    $("#q").oninput = e => { q = e.target.value.trim().toLowerCase(); draw(); };
    draw();
  }

  if (page === "home") {
    listing(posts, p => p.cat, p => p.title + p.excerpt + p.cat,
      L => card(L[0], "feat") + `<div class="grid">${L.slice(1).map(p => card(p)).join("")}</div>`);
    $("main").insertAdjacentHTML("beforeend", cta());
  }

  if (page === "tools") {
    listing(TOOLS, t => t.cat, t => t.name + t.desc + t.cat,
      L => L.map(t => `<a class="tool" href="${t.url}" target="_blank" rel="noopener"><div class="th"><b>${t.name}</b><span class="badge">${t.plan}</span></div><p>${t.desc}</p><div class="meta"><span>${t.cat}</span><span>हिंदी सपोर्ट: ${t.hindi}</span></div></a>`).join(""));
  }

  if (page === "prompts") {
    listing(PROMPTS.map((x, i) => ({ ...x, i })), x => x.cat, x => x.title + x.text + x.cat,
      L => L.map(x => `<div class="pr"><div class="meta"><span>${x.cat}</span></div><h3>${x.title}</h3><pre>${x.text}</pre><button class="copy" data-i="${x.i}">कॉपी करें</button></div>`).join(""));
    $("#list").onclick = e => { const b = e.target.closest(".copy"); if (b) copy(PROMPTS[b.dataset.i].text, b); };
  }

  if (page === "post") {
    const p = posts.find(x => x.slug === new URLSearchParams(location.search).get("slug"));
    const el = $("#art");
    if (!p) { el.innerHTML = `<h1>पोस्ट नहीं मिली</h1><p><a href="index.html">होम पर जाएं</a></p>`; return; }
    document.title = `${p.title} | ${SITE.name}`;
    $("meta[name=description]").content = p.excerpt;
    const rel = [...posts.filter(x => x !== p && x.cat === p.cat), ...posts.filter(x => x !== p && x.cat !== p.cat)].slice(0, 2);
    const wa = "https://wa.me/?text=" + encodeURIComponent(p.title + " " + location.href);
    el.innerHTML = `${meta(p)}<h1>${p.title}</h1>${p.img ? cover(p) : ""}<div id="toc"></div><div class="body">${p.body}</div>
      <div class="acts"><a class="share" href="${wa}" target="_blank" rel="noopener">WhatsApp पर शेयर करें</a><button class="copy" id="cl">लिंक कॉपी करें</button></div>
      <section class="more"><h2>और पढ़ें</h2><div class="grid">${rel.map(x => card(x)).join("")}</div></section>${cta()}`;
    $("#cl").onclick = e => copy(location.href, e.target);
    const hs = $$(".body h2", el);
    if (hs.length > 1) {
      hs.forEach((h, i) => h.id = "s" + i);
      $("#toc").innerHTML = `<nav class="toc"><b>इस पोस्ट में</b><ol>${hs.map(h => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join("")}</ol></nav>`;
    }
  }

  if (page === "page") {
    const pg = PAGES[new URLSearchParams(location.search).get("p")];
    $("#art").innerHTML = pg ? `<h1>${pg.title}</h1><div class="body">${pg.html}</div>` : `<h1>पेज नहीं मिला</h1>`;
    if (pg) document.title = `${pg.title} | ${SITE.name}`;
  }

  if (page === "write") {
    const f = id => $("#w-" + id), fallback = "post-" + Date.now().toString(36);
    $("#cats").innerHTML = [...new Set(posts.map(p => p.cat))].map(c => `<option value="${c}">`).join("");
    const inl = t => t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\*([^*]+)\*/g, "<i>$1</i>");
    const md = s => s.replace(/^(#{1,3} .*)$/gm, "\n$1\n").trim().split(/\n{2,}/).filter(Boolean).map(b => {
      b = b.trim();
      if (/^<\w/.test(b)) return b;
      const m = b.match(/^(#{1,3}) (.*)$/);
      if (m) return `<h${Math.max(2, m[1].length)}>${inl(m[2])}</h${Math.max(2, m[1].length)}>`;
      const L = b.split("\n");
      if (L.every(l => /^[-*] /.test(l))) return "<ul>" + L.map(l => `<li>${inl(l.slice(2))}</li>`).join("") + "</ul>";
      if (L.every(l => /^\d+[.)] /.test(l))) return "<ol>" + L.map(l => `<li>${inl(l.replace(/^\d+[.)] /, ""))}</li>`).join("") + "</ol>";
      return `<p>${inl(L.join("<br>"))}</p>`;
    }).join("\n");
    const hue = s => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);
    const esc = s => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    const gen = () => {
      const t = f("title").value.trim(), body = md(f("body").value);
      const slug = f("slug").value.trim() || (t.toLowerCase().match(/[a-z0-9]+/g) || [fallback]).join("-");
      f("out").value = `{\n  slug: ${JSON.stringify(slug)},\n  title: ${JSON.stringify(t)},\n  date: "${new Date().toISOString().slice(0, 10)}", cat: ${JSON.stringify(f("cat").value.trim() || "AI Tools")}, emoji: ${JSON.stringify(f("emoji").value || "📝")}, hue: ${hue(t)}, img: ${JSON.stringify(f("img").value.trim())},\n  excerpt: ${JSON.stringify(f("ex").value.trim())},\n  body: \`${esc(body)}\`\n},`;
      $("#w-prev").innerHTML = body;
    };
    $$("#wf input,#wf textarea").forEach(e => e.oninput = gen);
    $("#w-copy").onclick = e => copy(f("out").value, e.target);
    gen();
  }
})();
