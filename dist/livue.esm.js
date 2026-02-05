import { reactive as De, toRefs as Hi, effectScope as ji, ref as Yt, markRaw as Fi, defineComponent as zi, shallowRef as Kr, onMounted as Qr, onUnmounted as Zr, h as ar, inject as qi, provide as Wi, nextTick as Jn, onBeforeUnmount as $i, onBeforeMount as Bi, readonly as Ui, watchEffect as Ji, watch as Ce, computed as Xi, createApp as Yi } from "vue";
const Gi = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let Oe = null;
function un() {
  if (Oe)
    return Oe;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return Oe = t.getAttribute("content"), Oe;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (Oe = decodeURIComponent(e[1]), Oe) : null;
}
function Ki() {
  Oe = null;
}
let B = {
  color: "#29d",
  height: "2px",
  showSpinner: !0,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, Y = null, On = null, ee = null, he = null, Gt = !1, ct = 0;
function Qi(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function Zi(t) {
  return (-1 + t) * 100;
}
function ei() {
  if (Gt) return;
  Gt = !0;
  let t = document.createElement("style");
  t.id = "livue-progress-styles", t.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${B.height};
            background: ${B.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${B.speed}ms ${B.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${B.color}, 0 0 5px ${B.color};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
        }
        .livue-progress-spinner {
            display: block;
            position: fixed;
            z-index: 99999;
            top: 15px;
            right: 15px;
            pointer-events: none;
        }
        .livue-progress-spinner-icon {
            width: 18px;
            height: 18px;
            border: solid 2px transparent;
            border-top-color: ${B.color};
            border-left-color: ${B.color};
            border-radius: 50%;
            animation: livue-spinner 400ms linear infinite;
        }
        .livue-progress-bar.livue-progress-hidden,
        .livue-progress-spinner.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${B.speed}ms ${B.easing};
        }
        @keyframes livue-spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, document.head.appendChild(t);
}
function eo() {
  if (ee) return;
  ei(), ee = document.createElement("div"), ee.className = "livue-progress-bar livue-progress-hidden", ee.innerHTML = '<div class="livue-progress-peg"></div>', B.showSpinner && (he = document.createElement("div"), he.className = "livue-progress-spinner livue-progress-hidden", he.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(B.parent) || document.body;
  t.appendChild(ee), he && t.appendChild(he);
}
function to() {
  if (!Gt) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), Gt = !1, ei());
}
function no(t) {
  Object.assign(B, t), to();
}
function ro() {
  ct++, Y === null && (eo(), Y = 0, ee && ee.classList.remove("livue-progress-hidden"), he && he.classList.remove("livue-progress-hidden"), cn(B.minimum), B.trickle && (On = setInterval(function() {
    ti();
  }, B.trickleSpeed)));
}
function cn(t) {
  Y !== null && (t = Qi(t, B.minimum, 1), Y = t, ee && (ee.style.transform = "translate3d(" + Zi(t) + "%, 0, 0)"));
}
function ti() {
  if (Y === null || Y >= 1) return;
  let t;
  Y < 0.2 ? t = 0.1 : Y < 0.5 ? t = 0.04 : Y < 0.8 ? t = 0.02 : Y < 0.99 ? t = 5e-3 : t = 0, cn(Y + t);
}
function ni() {
  ct = Math.max(0, ct - 1), !(ct > 0) && Y !== null && (cn(1), clearInterval(On), On = null, setTimeout(function() {
    ee && ee.classList.add("livue-progress-hidden"), he && he.classList.add("livue-progress-hidden"), setTimeout(function() {
      Y = null, ee && (ee.style.transform = "translate3d(-100%, 0, 0)");
    }, B.speed);
  }, B.speed));
}
function io() {
  ct = 0, ni();
}
function oo() {
  return Y !== null;
}
function ao() {
  return Y;
}
const Le = {
  configure: no,
  start: ro,
  set: cn,
  trickle: ti,
  done: ni,
  forceDone: io,
  isStarted: oo,
  getStatus: ao
};
var ot = null, lr = !1, Be = !1, ne = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, me = /* @__PURE__ */ new Map(), Pe = /* @__PURE__ */ new Map(), Mn = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new Map(), _e = null;
function lo(t) {
  Object.assign(ne, t), t.progressBarColor && Le.configure({ color: t.progressBarColor });
}
function so(t) {
  ot = t, !lr && (lr = !0, _e = ri(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: _e },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (ii(_e), _e = e.state.pageKey, Et(e.state.url, !1, !0));
  }), co());
}
function ri() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function ii(t) {
  if (!(!ne.restoreScroll || !t)) {
    jt.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = jt.get(t) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, jt.set(t, i);
      }
    });
  }
}
function uo(t) {
  if (!(!ne.restoreScroll || !t)) {
    var e = jt.get(t);
    e && requestAnimationFrame(function() {
      window.scrollTo(e.x || 0, e.y || 0), Object.keys(e).forEach(function(n) {
        if (n.startsWith("el:")) {
          var r = n.substring(3), i = document.querySelector('[data-livue-scroll="' + r + '"]') || document.getElementById(r);
          i && (i.scrollLeft = e[n].x || 0, i.scrollTop = e[n].y || 0);
        }
      });
    });
  }
}
function co() {
  document.addEventListener("click", fo, !0), ne.prefetch && (document.addEventListener("mouseenter", ho, !0), document.addEventListener("mouseleave", mo, !0), document.addEventListener("mousedown", vo, !0), document.addEventListener("focus", go, !0));
}
function fo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e && !(t.metaKey || t.ctrlKey || t.shiftKey || t.altKey) && t.button === 0) {
      var n = e.getAttribute("href");
      if (n) {
        try {
          var r = new URL(n, window.location.origin);
          if (r.origin !== window.location.origin)
            return;
        } catch {
          return;
        }
        n.startsWith("#") || n.startsWith("javascript:") || e.hasAttribute("download") || e.getAttribute("target") !== "_blank" && (t.preventDefault(), t.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), Et(n, !0, !1));
      }
    }
  }
}
function po(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function ho(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ne.prefetchOnHover)) {
      var n = po(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            fn(r);
          }, ne.hoverDelay);
          Mn.set(e, i);
        }
      }
    }
  }
}
function mo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Mn.get(e);
      n && (clearTimeout(n), Mn.delete(e));
    }
  }
}
function vo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || fn(n);
    }
  }
}
function go(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ne.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || fn(n);
    }
  }
}
function fn(t) {
  var e = new URL(t, location.origin).href;
  if (Pe.has(e))
    return Pe.get(e);
  if (me.has(e))
    return Promise.resolve(me.get(e).html);
  var n = fetch(e, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return Pe.delete(e), r.ok ? r.text().then(function(i) {
      return ne.cachePages && oi(e, i), i;
    }) : null;
  }).catch(function(r) {
    return Pe.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Pe.set(e, n), n;
}
function oi(t, e) {
  for (var n = new DOMParser(), r = n.parseFromString(e, "text/html"), i = r.querySelector("title"); me.size >= ne.maxCacheSize; ) {
    var o = me.keys().next().value;
    me.delete(o);
  }
  me.set(t, {
    html: e,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function yo() {
  me.clear();
}
function Xn(t) {
  Be || !t || !t.url || (t.navigate ? Et(t.url, !0, !1) : (Be = !0, window.location.href = t.url));
}
async function Et(t, e, n) {
  if (!Be) {
    if (!ot) {
      window.location.href = t;
      return;
    }
    var r = new URL(t, location.origin).href, i = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: me.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(i)) {
      Be = !0, n || ii(_e), ne.showProgressBar && Le.start();
      try {
        var o, a = me.get(r);
        if (a)
          o = a.html;
        else if (Pe.has(r))
          o = await Pe.get(r);
        else {
          var l = await fetch(r, {
            method: "GET",
            headers: {
              Accept: "text/html",
              "X-LiVue-Navigate": "1"
            },
            credentials: "same-origin"
          });
          if (!l.ok)
            throw new Error("HTTP " + l.status);
          o = await l.text(), ne.cachePages && oi(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(A) {
              typeof A == "function" && A(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = bo(), m = /* @__PURE__ */ new Set();
        c.forEach(function(A) {
          A.livueIds.forEach(function(k) {
            m.add(k);
          });
        }), ot._stopObserver(), ot.destroyExcept(m), c.forEach(function(A) {
          A.element.parentNode && A.element.parentNode.removeChild(A.element);
        });
        var y = u.querySelector("title");
        y && (document.title = y.textContent), document.body.innerHTML = u.body.innerHTML, wo(c);
        var p = u.querySelector('meta[name="csrf-token"]'), w = document.querySelector('meta[name="csrf-token"]');
        if (p && w && (w.setAttribute("content", p.getAttribute("content")), Ki()), So(u), e && (_e = ri(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: _e },
          "",
          r
        )), Eo(u), ot.rebootPreserving(), n)
          uo(_e);
        else if (location.hash) {
          var h = document.querySelector(location.hash);
          h ? h.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (A) {
        console.error("[LiVue] Navigation failed:", A), window.location.href = t;
      } finally {
        Be = !1, ne.showProgressBar && Le.done();
      }
    }
  }
}
function bo() {
  var t = /* @__PURE__ */ new Map(), e = document.querySelectorAll("[data-livue-persist]");
  return e.forEach(function(n) {
    var r = n.dataset.livuePersist;
    if (r) {
      var i = [], o = n.querySelectorAll("[data-livue-id]");
      o.forEach(function(s) {
        i.push(s.dataset.livueId);
      }), n.dataset.livueId && i.push(n.dataset.livueId);
      var a = {}, l = n.querySelectorAll("[data-livue-scroll]");
      l.forEach(function(s) {
        var u = s.dataset.livueScroll;
        u && (a[u] = {
          scrollTop: s.scrollTop,
          scrollLeft: s.scrollLeft
        });
      }), t.set(r, {
        element: n,
        livueIds: i,
        scrollData: a
      });
    }
  }), t;
}
function wo(t) {
  t.size !== 0 && t.forEach(function(e, n) {
    var r = document.querySelector('[data-livue-persist="' + n + '"]');
    r && (r.parentNode.replaceChild(e.element, r), e.scrollData && requestAnimationFrame(function() {
      Object.keys(e.scrollData).forEach(function(i) {
        var o = e.element.querySelector('[data-livue-scroll="' + i + '"]');
        o && (o.scrollTop = e.scrollData[i].scrollTop, o.scrollLeft = e.scrollData[i].scrollLeft);
      });
    }));
  });
}
function So(t) {
  var e = document.querySelectorAll("script[data-navigate-track]"), n = t.querySelectorAll("script[data-navigate-track]"), r = {};
  e.forEach(function(o) {
    var a = o.getAttribute("src");
    a && (r[a.split("?")[0]] = a);
  });
  var i = !1;
  n.forEach(function(o) {
    var a = o.getAttribute("src");
    if (a) {
      var l = a.split("?")[0];
      r[l] && r[l] !== a && (i = !0);
    }
  }), i && window.location.reload();
}
function Eo(t) {
  var e = document.body.querySelectorAll("script");
  e.forEach(function(n) {
    if (n.parentNode) {
      if (n.hasAttribute("data-navigate-once")) {
        if (n.dataset.navigateRan)
          return;
        n.dataset.navigateRan = "true";
      }
      if (n.type !== "application/livue-setup" && !n.hasAttribute("data-livue-loader") && n.type !== "module") {
        var r = n.getAttribute("src") || "";
        if (!r.includes("livue") && !(r.includes("@vite") || r.includes("/@fs/") || r.includes("node_modules")) && !(r.includes("/resources/js/") || r.includes("/build/assets/"))) {
          var i = document.createElement("script");
          Array.from(n.attributes).forEach(function(o) {
            i.setAttribute(o.name, o.value);
          }), n.src || (i.textContent = n.textContent), n.parentNode.replaceChild(i, n);
        }
      }
    }
  });
}
function _o() {
  return Be;
}
var ze = /* @__PURE__ */ new Map(), Ao = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function sr(t, e) {
  return typeof t != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", t), function() {
  }) : typeof e != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (ze.has(t) || ze.set(t, /* @__PURE__ */ new Set()), ze.get(t).add(e), function() {
    var n = ze.get(t);
    n && (n.delete(e), n.size === 0 && ze.delete(t));
  });
}
function oe(t, e) {
  var n = ze.get(t);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(e);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + t + '" callback:', i);
    }
  });
}
function ai() {
  var t = [];
  return {
    /**
     * Register a cleanup function.
     * @param {Function} fn - Cleanup function
     */
    cleanup: function(e) {
      typeof e == "function" && t.push(e);
    },
    /**
     * Run all registered cleanup functions.
     */
    runCleanups: function() {
      t.forEach(function(e) {
        try {
          e();
        } catch (n) {
          console.error("[LiVue Hooks] Error in cleanup:", n);
        }
      }), t = [];
    }
  };
}
function ur() {
  return Ao.slice();
}
var Pn = [], Vn = [], wt = !1;
function Do(t) {
  return t.isolate ? Co(t) : new Promise(function(e, n) {
    Pn.push({
      payload: t,
      resolve: e,
      reject: n
    }), wt || (wt = !0, queueMicrotask(li));
  });
}
function To(t) {
  return new Promise(function(e, n) {
    Vn.push({
      payload: t,
      resolve: e,
      reject: n
    }), wt || (wt = !0, queueMicrotask(li));
  });
}
async function li() {
  var t = Pn, e = Vn;
  if (Pn = [], Vn = [], wt = !1, !(t.length === 0 && e.length === 0)) {
    Le.start();
    var n = si(), r = un(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = t.map(function(h) {
      return h.payload;
    }), a = e.map(function(h) {
      return h.payload;
    }), l = {};
    o.length > 0 && (l.updates = o), a.length > 0 && (l.lazyLoads = a), oe("request.started", {
      url: n,
      updates: o,
      lazyLoads: a,
      updateCount: t.length,
      lazyCount: e.length
    });
    try {
      var s = await fetch(n, {
        method: "POST",
        headers: i,
        body: JSON.stringify(l),
        credentials: "same-origin"
      }), u = await s.json();
      if (!s.ok) {
        var d = new Error(u.error || "Request failed");
        d.status = s.status, d.data = u;
        for (var c = 0; c < t.length; c++)
          t[c].reject(d);
        for (var c = 0; c < e.length; c++)
          e[c].reject(d);
        return;
      }
      for (var m = u.responses || [], y = u.lazyResponses || [], c = 0; c < m.length; c++)
        if (m[c] && m[c].redirect) {
          Xn(m[c].redirect);
          return;
        }
      for (var c = 0; c < t.length; c++) {
        var p = m[c];
        if (!p) {
          t[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (p.error) {
          var w = new Error(p.error);
          w.status = p.status || 500, w.data = p, t[c].reject(w);
        } else if (p.errors) {
          var w = new Error("Validation failed");
          w.status = 422, w.data = p, t[c].reject(w);
        } else
          t[c].resolve(p);
      }
      for (var c = 0; c < e.length; c++) {
        var p = y[c];
        if (!p) {
          e[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (p.error) {
          var w = new Error(p.error);
          w.status = p.status || 500, w.data = p, e[c].reject(w);
        } else
          e[c].resolve(p);
      }
      oe("request.finished", {
        url: n,
        success: !0,
        responses: m,
        lazyResponses: y,
        updateCount: t.length,
        lazyCount: e.length
      });
    } catch (h) {
      for (var c = 0; c < t.length; c++)
        t[c].reject(h);
      for (var c = 0; c < e.length; c++)
        e[c].reject(h);
      oe("request.finished", {
        url: n,
        success: !1,
        error: h,
        updateCount: t.length,
        lazyCount: e.length
      });
    } finally {
      Le.done();
    }
  }
}
async function Co(t) {
  Le.start();
  var e = si(), n = un(), r = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  n && (r["X-CSRF-TOKEN"] = n);
  var i = {
    snapshot: t.snapshot,
    diffs: t.diffs,
    method: t.method,
    params: t.params
  };
  try {
    var o = await fetch(e, {
      method: "POST",
      headers: r,
      body: JSON.stringify({ updates: [i] }),
      credentials: "same-origin"
    }), a = await o.json();
    if (!o.ok) {
      var l = new Error(a.error || "Request failed");
      throw l.status = o.status, l.data = a, l;
    }
    var s = (a.responses || [])[0];
    if (!s)
      throw new Error("No response for isolated component update");
    if (s.redirect)
      return Xn(s.redirect), new Promise(function() {
      });
    if (s.error) {
      var u = new Error(s.error);
      throw u.status = s.status || 500, u.data = s, u;
    }
    if (s.errors) {
      var u = new Error("Validation failed");
      throw u.status = 422, u.data = s, u;
    }
    return s;
  } finally {
    Le.done();
  }
}
function si() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function cr(t, e, n, r, i) {
  return Do({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
function Rn(t) {
  return De(Object.assign({}, t));
}
function Lo(t, e) {
  let n;
  for (n in e) {
    let r = JSON.stringify(t[n]), i = JSON.stringify(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function ui(t) {
  return JSON.parse(JSON.stringify(t));
}
function xo(t) {
  return Hi(t);
}
let Hn = null, ci = /* @__PURE__ */ new Map();
function ko() {
  return De({});
}
function pe(t, e) {
  jn(t);
  for (let n in e)
    t[n] = e[n];
}
function jn(t) {
  for (let e in t)
    delete t[e];
}
function Io(t) {
  Hn = t;
}
function Qe(t, e, n, r) {
  r = r || {};
  let i = !1;
  return oe("error.occurred", {
    error: t,
    componentName: e,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : (Hn ? Hn(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function No(t, e) {
  typeof e == "function" && ci.set(t, e);
}
function Fn(t) {
  ci.delete(t);
}
var fi = [];
function j(t, e, n) {
  fi.push({
    name: t,
    directive: e
  });
}
function Oo() {
  return fi;
}
const Te = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Map();
let fr = !1;
function Ye() {
  return typeof window < "u" && window.Echo;
}
function Mo(t, e) {
  if (!Ye())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = e + ":" + t;
  if (Te.has(n))
    return Te.get(n);
  let r;
  switch (e) {
    case "private":
      r = window.Echo.private(t);
      break;
    case "presence":
      r = window.Echo.join(t);
      break;
    default:
      r = window.Echo.channel(t);
      break;
  }
  return Te.set(n, r), r;
}
function di(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!Ye())
    return fr || (fr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: c } = o, m = Mo(a, l);
    if (!m) continue;
    const y = l + ":" + a + ":" + s + ":" + t;
    if (xe.has(y)) {
      r.push(y);
      continue;
    }
    const p = function(w) {
      try {
        n(u, w);
      } catch (h) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', h);
      }
    };
    if (l === "presence" && d)
      Po(m, s, p);
    else {
      const w = c ? "." + s : s;
      m.listen(w, p);
    }
    xe.set(y, {
      channel: m,
      channelKey: l + ":" + a,
      event: s,
      handler: p,
      isPresenceEvent: d,
      isCustomEvent: c
    }), r.push(y);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      pi(r[i]);
  };
}
function Po(t, e, n) {
  switch (e) {
    case "here":
      t.here(n);
      break;
    case "joining":
      t.joining(n);
      break;
    case "leaving":
      t.leaving(n);
      break;
  }
}
function pi(t) {
  const e = xe.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    xe.delete(t), Vo(e.channelKey);
  }
}
function dr(t) {
  const e = ":" + t, n = [];
  xe.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    pi(n[r]);
}
function Vo(t) {
  let e = !1;
  if (xe.forEach(function(r) {
    r.channelKey === t && (e = !0);
  }), e) return;
  if (Te.get(t) && Ye()) {
    const r = t.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Te.delete(t);
}
function pr() {
  xe.clear(), Te.forEach(function(t, e) {
    if (Ye()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Te.clear();
}
function Ro() {
  return {
    echoAvailable: Ye(),
    channels: Array.from(Te.keys()),
    subscriptions: Array.from(xe.keys())
  };
}
function Ho() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Se = /* @__PURE__ */ new Map();
function Kt(t, e, n, r) {
  Se.has(t) || Se.set(t, /* @__PURE__ */ new Set());
  var i = {
    componentName: e,
    componentId: n,
    handler: r
  };
  return Se.get(t).add(i), function() {
    var o = Se.get(t);
    o && (o.delete(i), o.size === 0 && Se.delete(t));
  };
}
function Ft(t, e, n, r, i, o) {
  var a = Se.get(t);
  a && a.forEach(function(l) {
    var s = !1;
    if (n === "broadcast" ? s = !0 : n === "self" ? s = l.componentId === i : n === "to" && (s = l.componentName === o), s)
      try {
        l.handler(e);
      } catch (u) {
        console.error('[LiVue] Event handler error for "' + t + '":', u);
      }
  });
}
function hr(t) {
  Se.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Se.delete(n);
  });
}
function jo(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    Ft(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Fo(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, l = e[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function zo() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function hi(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", t), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = zo();
    s.open("POST", u, !0);
    var d = un();
    d && s.setRequestHeader("X-CSRF-TOKEN", d), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var m = Math.round(c.loaded / c.total * 100);
        i(m);
      }
    }), s.onload = function() {
      var c;
      try {
        c = JSON.parse(s.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (s.status >= 200 && s.status < 300)
        o(c);
      else {
        var m = new Error(c.error || c.message || "Upload failed");
        m.status = s.status, m.data = c, a(m);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function qo(t, e, n, r, i) {
  var o = Array.from(t), a = [], l = o.length, s = 0;
  return o.reduce(function(u, d, c) {
    return u.then(function() {
      return hi(d, e, n, r, function(m) {
        if (i) {
          var y = Math.round((s * 100 + m) / l);
          i({
            file: c,
            percent: m,
            overall: y
          });
        }
      }).then(function(m) {
        s++, a.push(m);
      });
    });
  }, Promise.resolve()).then(function() {
    return a;
  });
}
const Wo = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var mr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(mr || (mr = {}));
function $o() {
  const t = ji(!0), e = t.run(() => Yt({}));
  let n = [], r = [];
  const i = Fi({
    install(o) {
      i._a = o, o.provide(Wo, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
    },
    use(o) {
      return this._a ? n.push(o) : r.push(o), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: t,
    _s: /* @__PURE__ */ new Map(),
    state: e
  });
  return i;
}
let hn = 0;
function Bo(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
function Uo(t) {
  return zi({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = Yt(!1), i = Kr(null), o = null, a = Yt(null);
      async function l() {
        if (!r.value)
          try {
            let u = await To({
              component: e.config.name,
              props: e.config.props || {}
            });
            u.html && u.snapshot && s(u);
          } catch (u) {
            console.error("[LiVue] Lazy load failed:", u);
          }
      }
      function s(u) {
        let d = JSON.parse(u.snapshot);
        hn++;
        let c = "lazy-" + hn + "-" + Date.now(), m = d.memo ? d.memo.name : "", y = Bo(d.state || {}), p = d.memo || {}, { createLivueHelper: w, buildComponentDef: h, processTemplate: A, createReactiveState: k } = t._lazyHelpers, N = k(y), L = JSON.parse(JSON.stringify(y)), D = { _updateTemplate: null }, I = w(
          c,
          N,
          p,
          D,
          L,
          u.snapshot
        );
        p.errors && pe(I.errors, p.errors);
        let H = "livue-lazy-child-" + hn, g = A(u.html, t), f = '<div data-livue-id="' + c + '">' + g.template + "</div>", _ = h(f, N, I, t._versions, m);
        t._childRegistry[c] = {
          tagName: H,
          state: N,
          memo: p,
          livue: I,
          componentRef: D,
          name: m,
          id: c
        }, D._updateTemplate = function(S) {
          let v = A(S, t), O = '<div data-livue-id="' + c + '">' + v.template + "</div>";
          for (let R in v.childDefs)
            t.vueApp._context.components[R] || t.vueApp.component(R, v.childDefs[R]);
          let V = h(O, N, I, t._versions, m);
          t.vueApp._context.components[H] = V, t._versions[H] = (t._versions[H] || 0) + 1, i.value = V;
        };
        let E = p.listeners || null;
        if (E)
          for (let S in E)
            (function(v, O) {
              Kt(S, m, c, function(V) {
                O.call(v, V);
              });
            })(E[S], I);
        for (let S in g.childDefs)
          t.vueApp._context.components[S] || t.vueApp.component(S, g.childDefs[S]);
        t._versions[H] = 0, t.vueApp._context.components[H] || t.vueApp.component(H, _), i.value = _, r.value = !0;
      }
      return Qr(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Zr(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? ar(i.value) : ar("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
let ft = /* @__PURE__ */ new Map(), dt = /* @__PURE__ */ new Map();
function Je(t, e) {
  let n = t + ":debounce:" + e;
  if (!ft.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let c = i, m = o, y = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(m).catch(y);
        }, e);
      });
    };
    ft.set(n, l);
  }
  return ft.get(n);
}
function St(t, e) {
  let n = t + ":throttle:" + e;
  if (!dt.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < e ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    dt.set(n, i);
  }
  return dt.get(n);
}
function vr(t) {
  let e = t + ":";
  for (let n of ft.keys())
    n.startsWith(e) && ft.delete(n);
  for (let n of dt.keys())
    n.startsWith(e) && dt.delete(n);
}
const Qt = "livue-tab-sync";
let Yn = Date.now() + "-" + Math.random().toString(36).substr(2, 9), Zt = null, Gn = /* @__PURE__ */ new Map(), gr = !1;
function mi() {
  gr || (gr = !0, typeof BroadcastChannel < "u" ? (Zt = new BroadcastChannel(Qt), Zt.onmessage = Jo) : window.addEventListener("storage", Xo));
}
function Jo(t) {
  let e = t.data;
  e.tabId !== Yn && vi(e);
}
function Xo(t) {
  if (t.key === Qt && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === Yn) return;
      vi(e);
    } catch {
    }
}
function vi(t) {
  let e = Gn.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function Yo(t, e) {
  mi(), Gn.set(t, e);
}
function yr(t) {
  Gn.delete(t);
}
function Go(t, e, n, r) {
  mi();
  let i = {
    tabId: Yn,
    component: t,
    state: e,
    properties: n,
    config: r
  };
  if (Zt)
    Zt.postMessage(i);
  else
    try {
      localStorage.setItem(Qt, JSON.stringify(i)), localStorage.removeItem(Qt);
    } catch {
    }
}
function Ko(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
let br = 0;
function zn() {
  return typeof document < "u" && "startViewTransition" in document;
}
const mn = /* @__PURE__ */ new WeakMap();
function wr() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const Qo = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (br++, r = "livue-transition-" + br), mn.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), zn() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    wr();
  },
  updated(t, e) {
    let n = mn.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), zn() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    mn.delete(t), t.removeAttribute("data-livue-transition"), wr();
  }
};
function Zo(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const Kn = /* @__PURE__ */ new Map();
async function ea(t, e = {}) {
  const {
    onChunk: n = () => {
    },
    onComplete: r = () => {
    },
    onError: i = () => {
    }
  } = e;
  try {
    const o = await fetch("/livue/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/x-ndjson",
        "X-CSRF-TOKEN": un(),
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        snapshot: t.snapshot,
        diffs: t.diffs || {},
        method: t.method,
        params: t.params || []
      })
    });
    if (!o.ok)
      throw new Error(`HTTP error: ${o.status}`);
    const a = o.body.getReader(), l = new TextDecoder();
    let s = "", u = null;
    for (; ; ) {
      const { done: d, value: c } = await a.read();
      if (d)
        break;
      s += l.decode(c, { stream: !0 });
      const m = s.split(`
`);
      s = m.pop() || "";
      for (const y of m)
        if (y.trim())
          try {
            const p = JSON.parse(y);
            if (p.stream)
              ta(p.stream), n(p.stream);
            else {
              if (p.error)
                throw new Error(p.error);
              p.snapshot && (u = p);
            }
          } catch (p) {
            console.error("[LiVue Stream] Parse error:", p, y);
          }
    }
    if (s.trim())
      try {
        const d = JSON.parse(s);
        if (d.snapshot)
          u = d;
        else if (d.error)
          throw new Error(d.error);
      } catch (d) {
        console.error("[LiVue Stream] Final parse error:", d, s);
      }
    return r(u), u;
  } catch (o) {
    throw i(o), o;
  }
}
function ta(t) {
  const { to: e, content: n, replace: r } = t, i = Kn.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Sr(t, e, n = !1) {
  Kn.set(t, { el: e, replace: n });
}
function Er(t) {
  Kn.delete(t);
}
function na(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function Qn(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    na(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = Qn(r) : e[n] = r;
  }
  return e;
}
function ra(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Qn(l), d = {};
    for (let c in s)
      d[c] = /* @__PURE__ */ (function(m, y) {
        return function() {
          let p = Array.prototype.slice.call(arguments);
          return e(m + "." + y, p);
        };
      })(a, c);
    i[a] = De(Object.assign({}, u, d));
  }
  return i;
}
function ia(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = Qn(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function oa(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
let _r = 0, gi = /* @__PURE__ */ new Map();
function aa(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function la(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function yi(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    gi.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: aa(n)
    });
  });
}
function bi(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = gi.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && la(n, i.inputs));
  });
}
function Lt(t, e) {
  let n = {}, r = ui(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function sa(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function en(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    sa(r) ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
let wi = {
  ref: Yt,
  computed: Xi,
  watch: Ce,
  watchEffect: Ji,
  reactive: De,
  readonly: Ui,
  onMounted: Qr,
  onUnmounted: Zr,
  onBeforeMount: Bi,
  onBeforeUnmount: $i,
  nextTick: Jn,
  provide: Wi,
  inject: qi
}, Si = Object.keys(wi), ua = Si.map(function(t) {
  return wi[t];
});
function ca(t) {
  let e = t.match(/<script\s+type="application\/livue-setup"[^>]*>([\s\S]*?)<\/script>/);
  if (e) {
    let n = e[1].trim();
    return n = n.replace(/^<script[^>]*>\s*/i, ""), n = n.replace(/\s*<\/script>$/i, ""), {
      html: t.replace(e[0], ""),
      setupCode: n.trim()
    };
  }
  return { html: t, setupCode: null };
}
function fa(t, e, n) {
  let r = Object.keys(e), i = r.map(function(l) {
    return e[l];
  }), o = Si.concat(r).concat(["livue"]), a = ua.concat(i).concat([n]);
  try {
    let s = new (Function.prototype.bind.apply(
      Function,
      [null].concat(o).concat([t])
    ))().apply(null, a);
    return s && typeof s == "object" ? s : null;
  } catch (l) {
    return console.error("[LiVue] Error executing @script setup code:", l), null;
  }
}
function da(t) {
  let e = /v-model\.debounce(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
  t = t.replace(e, function(o, a, l, s) {
    let u = a ? "." + a + (l || "ms") : "";
    return 'v-model="' + s + '" v-debounce:' + s + u;
  });
  let n = /v-model\.throttle(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
  t = t.replace(n, function(o, a, l, s) {
    let u = a ? "." + a + (l || "ms") : "";
    return 'v-model="' + s + '" v-throttle:' + s + u;
  });
  let r = /v-model\.blur=["']([^"']+)["']/g;
  t = t.replace(r, function(o, a) {
    return 'v-model="' + a + '" v-blur:' + a;
  });
  let i = /v-model\.enter=["']([^"']+)["']/g;
  return t = t.replace(i, function(o, a) {
    return 'v-model="' + a + '" v-enter:' + a;
  }), t;
}
function pt(t, e, n, r, i, o) {
  let a = da(t), l = ca(a);
  return {
    name: o || "LiVueComponent",
    template: l.html,
    setup: function() {
      let s = xo(e), u = Object.assign({}, s, r, { livue: n, livueV: i });
      if (l.setupCode) {
        let d = fa(l.setupCode, s, n);
        d && Object.assign(u, d);
      }
      return u;
    }
  };
}
function qn(t, e, n, r, i, o, a) {
  a = a || {};
  let l = ko(), s = n.name, u = n.vueMethods || {}, d = n.confirms || {}, c = n.isolate || !1, m = n.urlParams || null, y = n.uploads || null, p = n.tabSync || null, w = !1, h = i, A = o;
  function k(f) {
    let _ = document.querySelector('meta[name="livue-prefix"]'), S = "/" + (_ ? _.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), v = document.createElement("a");
    v.href = S, v.download = f.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function N() {
    let f = Lt(h, e);
    return {
      snapshot: A,
      diffs: f
    };
  }
  function L(f, _) {
    if (f.redirect) {
      Xn(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let v = f.errorBoundary;
      g.errorState.hasError = v.hasError, g.errorState.errorMessage = v.errorMessage, g.errorState.errorDetails = v.errorDetails, g.errorState.recover = v.recover, (!v.errorHandled || !v.recover) && oe("error.occurred", {
        error: new Error(v.errorMessage || "Component error"),
        componentName: s,
        componentId: t,
        context: { method: v.errorMethod, serverHandled: v.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && k(f.download), f.snapshot) {
      let v = JSON.parse(f.snapshot);
      if (v.state) {
        let O = en(v.state);
        Lo(e, O), h = JSON.parse(JSON.stringify(O));
      }
      A = f.snapshot, v.memo && (v.memo.errors ? pe(g.errors, v.memo.errors) : jn(g.errors), v.memo.vueMethods && (u = v.memo.vueMethods), v.memo.urlParams && (m = v.memo.urlParams), v.memo.uploads && (y = v.memo.uploads), v.memo.confirms && (d = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && ia(I, v.memo));
    }
    if (m && Fo(m, e), f.html && r && r._updateTemplate) {
      let v = {};
      if (f.snapshot) {
        let O = JSON.parse(f.snapshot);
        O.memo && (O.memo.transitionType && (v.transitionType = O.memo.transitionType), O.memo.skipTransition && (v.skipTransition = !0));
      }
      r._updateTemplate(f.html, v);
    }
    if (f.events && f.events.length > 0) {
      for (var E = 0; E < f.events.length; E++)
        f.events[E].sourceId = t;
      jo(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var S = 0; S < f.js.length; S++)
        try {
          new Function("state", "livue", f.js[S])(e, g);
        } catch (v) {
          console.error("[LiVue] Error executing ->vue() JS:", v);
        }
    if (p && p.enabled && f.snapshot && !w && JSON.parse(f.snapshot).state) {
      let O = ui(e), V = [];
      for (let R in O)
        (!_ || !(R in _)) && V.push(R);
      if (V.length > 0) {
        let R = Ko(O, V, p);
        Object.keys(R).length > 0 && Go(s, R, V, p);
      }
    }
    if (w = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let D = De({}), I = {}, H = function(f, _) {
    return g.call(f, _);
  };
  oa(n) && (I = ra(n, H));
  let g = De({
    loading: !1,
    processing: null,
    errors: l,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: D,
    refs: {},
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let _ = Lt(h, e);
      return f === void 0 ? Object.keys(_).length > 0 : f in _;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = Lt(h, e);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(h)) : h[f] !== void 0 ? JSON.parse(JSON.stringify(h[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in h && (e[f] = JSON.parse(JSON.stringify(h[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in h)
        f in e && (e[f] = JSON.parse(JSON.stringify(h[f])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(f) {
      return f ? D[f] || !1 : g.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let _ = f ? D[f] || !1 : g.loading;
      return {
        "aria-busy": _,
        disabled: _
      };
    },
    /**
     * Call a method. If the method is a #[Vue] method, execute JS
     * client-side without a server round-trip. Otherwise, send AJAX.
     * Checks for #[Confirm] attribute before execution.
     *
     * Supports action modifiers via options object:
     *   livue.call('search', ['query'], { debounce: 300 })
     *   livue.call('increment', [], { throttle: 500 })
     *
     * Backward compatible with old API:
     *   livue.call('save')
     *   livue.call('search', 'query')
     *
     * @param {string} method
     * @param {Array|*} paramsOrFirst - Array of params (new API) or first param (old API)
     * @param {object} [options] - { debounce?: number, throttle?: number }
     */
    call: async function(f, _, E) {
      let S, v = null;
      if (arguments.length === 1 ? S = [] : arguments.length === 2 ? Array.isArray(_) ? S = _ : S = [_] : arguments.length >= 3 && (Array.isArray(_) && E && typeof E == "object" && (E.debounce || E.throttle) ? (S = _, v = E) : S = Array.prototype.slice.call(arguments, 1)), u[f]) {
        try {
          new Function("state", "livue", u[f])(e, g);
        } catch (V) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', V);
        }
        return;
      }
      let O = async function() {
        if (d[f] && !await g._showConfirm(d[f]))
          return;
        g.loading = !0, g.processing = f, D[f] = !0;
        let V;
        try {
          let R = N(), se = await cr(R.snapshot, f, S, R.diffs, c);
          V = L(se, R.diffs);
        } catch (R) {
          R.status === 422 && R.data && R.data.errors ? pe(g.errors, R.data.errors) : Qe(R, s);
        } finally {
          g.loading = !1, g.processing = null, delete D[f];
        }
        return V;
      };
      return v && v.debounce ? Je(t + ":" + f, v.debounce)(O) : v && v.throttle ? St(t + ":" + f, v.throttle)(O) : O();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, _) {
      let E = Array.prototype.slice.call(arguments, 2), S = { message: _ || "Are you sure?" };
      if (await g._showConfirm(S))
        return g.call.apply(g, [f].concat(E));
    },
    /**
     * Show confirmation dialog (native or custom).
     * @param {object} config - { message, title, confirmText, cancelText }
     * @returns {Promise<boolean>}
     * @private
     */
    _showConfirm: function(f) {
      return window.LiVue && window.LiVue.confirmHandler ? window.LiVue.confirmHandler(f) : Promise.resolve(window.confirm(f.message));
    },
    /**
     * Set a local state property without server call.
     * @param {string} key
     * @param {*} value
     */
    set: function(f, _) {
      e[f] = _;
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      g.loading = !0, g.processing = "$sync";
      try {
        let f = N(), _ = await cr(f.snapshot, null, [], f.diffs, c);
        L(_, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? pe(g.errors, f.data.errors) : Qe(f, s);
      } finally {
        g.loading = !1, g.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      jn(g.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, _) {
      Ft(f, _, "broadcast", s, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, _, E) {
      Ft(_, E, "to", s, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, _) {
      Ft(f, _, "self", s, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      Et(f, !0);
    },
    /**
     * Upload a single file for a component property.
     * The file is sent to /livue/upload, and on success the property
     * is set to an upload reference that the server can hydrate.
     *
     * @param {string} property - The component property name
     * @param {File} file - The File object from the input
     */
    upload: async function(f, _) {
      if (!y || !y[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      g.uploading = !0, g.uploadProgress = 0;
      try {
        var E = await hi(_, s, f, y[f].token, function(S) {
          g.uploadProgress = S;
        });
        e[f] = {
          __livue_upload: !0,
          ref: E.ref,
          originalName: E.originalName,
          mimeType: E.mimeType,
          size: E.size,
          previewUrl: E.previewUrl
        };
      } catch (S) {
        S.status === 422 && S.data && S.data.errors ? pe(g.errors, S.data.errors) : Qe(S, s);
      } finally {
        g.uploading = !1, g.uploadProgress = 0;
      }
    },
    /**
     * Upload multiple files for an array property.
     * Each file is uploaded sequentially, and the property is set
     * to an array of upload references.
     *
     * @param {string} property - The component property name
     * @param {FileList|File[]} files - The File objects from the input
     */
    uploadMultiple: async function(f, _) {
      if (!y || !y[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      g.uploading = !0, g.uploadProgress = 0;
      try {
        var E = await qo(_, s, f, y[f].token, function(S) {
          g.uploadProgress = S.overall;
        });
        e[f] = E.map(function(S) {
          return {
            __livue_upload: !0,
            ref: S.ref,
            originalName: S.originalName,
            mimeType: S.mimeType,
            size: S.size,
            previewUrl: S.previewUrl
          };
        });
      } catch (S) {
        S.status === 422 && S.data && S.data.errors ? pe(g.errors, S.data.errors) : Qe(S, s);
      } finally {
        g.uploading = !1, g.uploadProgress = 0;
      }
    },
    /**
     * Remove an uploaded file from a property.
     * For single file properties, sets to null.
     * For array properties, removes by index.
     *
     * @param {string} property - The property name
     * @param {number} [index] - For array properties, the index to remove
     */
    removeUpload: function(f, _) {
      _ !== void 0 && Array.isArray(e[f]) ? e[f].splice(_, 1) : e[f] = null;
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(f, _) {
      _ = _ || [], g.loading = !0, g.streaming = !0, g.processing = f, g.streamingMethod = f, D[f] = !0;
      let E;
      try {
        let S = N();
        S.method = f, S.params = _, S.componentId = t;
        let v = await ea(S, {
          onChunk: function(O) {
          },
          onComplete: function(O) {
          },
          onError: function(O) {
            console.error("[LiVue Stream] Error:", O);
          }
        });
        v && (E = L(v, S.diffs));
      } catch (S) {
        S.status === 422 && S.data && S.data.errors ? pe(g.errors, S.data.errors) : Qe(S, s);
      } finally {
        g.loading = !1, g.streaming = !1, g.processing = null, g.streamingMethod = null, delete D[f];
      }
      return E;
    },
    /**
     * Toggle a boolean property.
     * @param {string} property - Property name to toggle
     */
    toggle: function(f) {
      f in e && (e[f] = !e[f]);
    },
    /**
     * Watch a property for changes.
     * Executes callback when the property value changes.
     *
     * @param {string} property - Property name to watch
     * @param {Function} callback - function(newValue, oldValue)
     * @returns {Function} Unwatch function
     *
     * @example
     * livue.watch('count', (newVal, oldVal) => {
     *     console.log('Count changed from', oldVal, 'to', newVal);
     * });
     */
    watch: function(f, _) {
      return typeof _ != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Ce(
        function() {
          return e[f];
        },
        function(E, S) {
          _(E, S);
        }
      );
    },
    /**
     * Get the component's root DOM element.
     * @returns {HTMLElement|null}
     */
    get $el() {
      return a.el ? a.el : document.querySelector('[data-livue-id="' + t + '"]');
    },
    /**
     * Get the component's unique ID.
     * @returns {string}
     */
    get $id() {
      return t;
    },
    /**
     * Get the parent component's livue helper (if nested).
     * Returns null for root components.
     * @returns {object|null}
     */
    get $parent() {
      return a.parentLivue || null;
    },
    /**
     * Get the component name.
     * @returns {string}
     */
    get $name() {
      return s;
    },
    /**
     * Register an error handler for this component.
     * The handler receives (error, context) and can return true to prevent
     * the error from propagating to the global handler.
     *
     * @param {Function} handler - function(error, context) => boolean
     * @returns {Function} Unsubscribe function
     *
     * @example
     * livue.onError((error, context) => {
     *     console.error('Error in', context.method, ':', error);
     *     livue.set('errorMessage', 'Something went wrong');
     *     return true; // Prevent global handler
     * });
     */
    onError: function(f) {
      return typeof f != "function" ? (console.warn("[LiVue] onError handler must be a function"), function() {
      }) : (No(t, f), function() {
        Fn(t);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: De({
      hasError: !1,
      errorMessage: null,
      errorDetails: null,
      recover: !0
    }),
    /**
     * Clear the error state (used for recovery).
     */
    clearError: function() {
      g.errorState.hasError = !1, g.errorState.errorMessage = null, g.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(f, _) {
      h = JSON.parse(JSON.stringify(f)), A = _;
    },
    /**
     * Store cleanup collector for hooks.
     * @private
     */
    _cleanups: a.cleanups || null,
    /**
     * Get debugging information for DevTools.
     * @private
     * @returns {object}
     */
    _getDevToolsInfo: function() {
      let f = Lt(h, e), _ = {};
      for (let E in I) {
        let S = I[E], v = {}, O = [];
        for (let V in S)
          if (typeof S[V] == "function")
            O.push(V);
          else
            try {
              v[V] = JSON.parse(JSON.stringify(S[V]));
            } catch {
              v[V] = "[Unserializable]";
            }
        _[E] = { data: v, actions: O };
      }
      return {
        serverState: JSON.parse(JSON.stringify(h)),
        clientState: JSON.parse(JSON.stringify(e)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: s,
          isolate: c,
          urlParams: m,
          tabSync: p,
          hasUploads: !!y,
          uploadProps: y ? Object.keys(y) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(d),
          composableNames: Object.keys(I)
        },
        composables: _,
        uploading: g.uploading,
        uploadProgress: g.uploadProgress,
        streaming: g.streaming,
        streamingMethod: g.streamingMethod,
        errorState: {
          hasError: g.errorState.hasError,
          errorMessage: g.errorState.errorMessage
        }
      };
    }
  });
  for (let f in I)
    g[f] = I[f];
  return p && p.enabled && Yo(s, function(f, _, E) {
    let S = !1;
    if (E.reactive === !0)
      S = !0;
    else if (Array.isArray(E.reactive) && E.reactive.length > 0) {
      for (let v in f)
        if (E.reactive.includes(v)) {
          S = !0;
          break;
        }
    }
    if (S) {
      for (let v in f)
        E.only && !E.only.includes(v) || E.except && E.except.includes(v) || v in e && (e[v] = f[v]);
      w = !0, g.sync();
      return;
    }
    for (let v in f)
      E.only && !E.only.includes(v) || E.except && E.except.includes(v) || v in e && (e[v] = f[v]);
    for (let v in f)
      E.only && !E.only.includes(v) || E.except && E.except.includes(v) || (h[v] = JSON.parse(JSON.stringify(f[v])));
  }), { livue: g, composables: I };
}
function zt(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", c = JSON.parse(d), m = c.memo ? c.memo.name : "", y = en(c.state || {}), p = c.memo || {}, w = s.innerHTML, h = e._childRegistry[u];
    if (!h)
      for (let g in e._childRegistry) {
        let f = e._childRegistry[g];
        if (f.name === m && !o[g]) {
          h = f;
          break;
        }
      }
    if (h) {
      o[h.id] = !0;
      let g = p.reactive || [];
      if (g.length > 0) {
        for (var A = 0; A < g.length; A++) {
          var k = g[A];
          k in y && (h.state[k] = y[k]);
        }
        h.livue._updateServerState(y, d), h.componentRef && h.componentRef._updateTemplate && h.componentRef._updateTemplate(w);
      }
    }
    let N = !h;
    if (!h) {
      _r++;
      let g = "livue-child-" + _r, f = Rn(y), _ = JSON.parse(JSON.stringify(y)), E = Object.assign({ name: p.name || m }, p), S = { _updateTemplate: null }, v = ai(), O = qn(u, f, E, S, _, d, {
        el: s,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: v
      }), V = O.livue, R = O.composables;
      oe("component.init", {
        component: { id: u, name: m, state: f, livue: V },
        el: s,
        cleanup: v.cleanup,
        isChild: !0
      });
      let se = p.errors || null;
      se && pe(V.errors, se), h = {
        tagName: g,
        state: f,
        memo: E,
        livue: V,
        composables: R,
        componentRef: S,
        name: m,
        id: u
      };
      let ue = p.listeners || null;
      if (ue)
        for (let ke in ue)
          (function(ce, fe) {
            Kt(ke, m, u, function(Ke) {
              fe.call(ce, Ke);
            });
          })(ue[ke], V);
      let Ge = p.echo || null;
      Ge && Ge.length && (function(ke, ce) {
        di(ke, Ge, function(fe, Ke) {
          ce.call(fe, Ke);
        });
      })(u, V), S._updateTemplate = function(ke) {
        let ce = e.el.querySelector('[data-livue-id="' + u + '"]');
        ce && yi(ce);
        let fe = zt(ke, e), Ke = '<div data-livue-id="' + u + '">' + fe.template + "</div>";
        for (let Re in fe.childDefs)
          e.vueApp._context.components[Re] || e.vueApp.component(Re, fe.childDefs[Re]);
        e.vueApp._context.components[h.tagName] = pt(Ke, h.state, h.livue, h.composables || {}, e._versions, h.name), e._versions[h.tagName] = (e._versions[h.tagName] || 0) + 1, Jn(function() {
          let Re = e.el.querySelector('[data-livue-id="' + u + '"]');
          Re && bi(Re);
        });
      }, e._childRegistry[u] = h;
    }
    let L = h.tagName, D = s.dataset.livueRef;
    D && e._rootLivue && (e._rootLivue.refs[D] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(g, f) {
        return h.livue.call(g, f || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(g, f) {
        return h.livue.set(g, f);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(g, f) {
        return h.livue.dispatch(g, f);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return h.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return h.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return h.livue;
      }
    });
    let I = s.dataset.livueModel;
    I && e._rootState && Kt("$modelUpdate", h.name, u, function(g) {
      g && g.value !== void 0 && (e._rootState[I] = g.value);
    }), N && (i[L] = pt(
      '<div data-livue-id="' + u + '">' + w + "</div>",
      h.state,
      h.livue,
      h.composables || {},
      e._versions,
      h.name
    )), e._versions[L] === void 0 && (e._versions[L] = 0);
    let H = document.createElement(L);
    H.setAttribute(":key", "livueV['" + L + "']"), s.parentNode.replaceChild(H, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
class pa {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = Rn(en(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = De({}), this._rootDefRef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: qn,
      buildComponentDef: pt,
      processTemplate: zt,
      createReactiveState: Rn
    }, this._mount(r, n);
  }
  /**
   * Mount the Vue app shell. The root component is rendered via
   * <component :is> so its template can be swapped independently
   * without unmounting the Vue app.
   */
  _mount(e, n) {
    let r = this, i = {
      /**
       * Update the component template with new HTML.
       * @param {string} newInnerHtml - The new HTML content
       * @param {object} [options] - Transition options
       * @param {string} [options.transitionType] - Transition type (e.g., 'forward', 'backward')
       * @param {boolean} [options.skipTransition] - Skip the View Transition
       */
      _updateTemplate: function(w, h) {
        h = h || {}, oe("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: w
        }), yi(r.el);
        let A = zt(w, r);
        for (let N in A.childDefs)
          r.vueApp._context.components[N] || r.vueApp.component(N, A.childDefs[N]);
        function k() {
          r._rootDefRef.value = pt(A.template, r.state, r._rootLivue, r._rootComposables || {}, r._versions, r.name), Jn(function() {
            bi(r.el), oe("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (h.skipTransition) {
          k();
          return;
        }
        zn() ? Zo(k, { type: h.transitionType }) : k();
      }
    }, o = JSON.parse(JSON.stringify(en(e.state || {})));
    this._cleanups = ai();
    let a = qn(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, oe("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u = zt(this.el.innerHTML, this), d = e.memo && e.memo.errors || null;
    d && pe(l.errors, d);
    let c = e.memo && e.memo.listeners || null;
    if (c)
      for (let w in c)
        (function(h, A, k, N) {
          Kt(w, k, N, function(L) {
            A.call(h, L);
          });
        })(c[w], l, r.name, r.componentId);
    let m = e.memo && e.memo.echo || null;
    m && m.length && (this._echoUnsubscribe = di(r.componentId, m, function(w, h) {
      l.call(w, h);
    }));
    let y = pt(u.template, r.state, l, s, r._versions, r.name);
    this._rootDefRef = Kr(y), this.vueApp = Yi({
      setup: function() {
        return {
          rootDef: r._rootDefRef
        };
      },
      template: '<component :is="rootDef"></component>'
    });
    let p;
    for (p in u.childDefs)
      this.vueApp._context.components[p] || this.vueApp.component(p, u.childDefs[p]);
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", Uo(this)), this._applyPluginsAndMount();
  }
  /**
   * Apply plugins and mount the Vue app.
   * Called once during _mount(), after createApp() and child registration.
   *
   * Order:
   * 1. Install Pinia (required internally by LiVue)
   * 2. Call LiVue.setup() callback if defined (user plugins like Vuetify)
   * 3. Register built-in LiVue directives (v-click, v-loading, etc.)
   * 4. Mount the Vue app
   *
   * @private
   */
  async _applyPluginsAndMount() {
    let e = this, n = this.vueApp, r = $o();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Oo();
    for (let o = 0; o < i.length; o++)
      n.directive(i[o].name, i[o].directive);
    e.el.innerHTML = "", e.vueApp.mount(e.el);
  }
  /**
   * Destroy the Vue app instance and clean up event listeners.
   */
  destroy() {
    for (let e in this._childRegistry) {
      let n = this._childRegistry[e];
      oe("component.destroy", {
        component: { id: e, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), hr(e), vr(e), Fn(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && yr(n.name), dr(e);
    }
    oe("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), hr(this.componentId), vr(this.componentId), Fn(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && yr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), dr(this.componentId), this.vueApp && (this.vueApp.unmount(), this.vueApp = null);
  }
}
let Ar = /* @__PURE__ */ new Set();
function ha(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const ma = {
  mounted(t, e, n) {
    let r = ha(n);
    if (!r) {
      console.warn("[LiVue] v-init: livue helper not found in component context");
      return;
    }
    let i = t.closest("[data-livue-id]"), o = i ? i.dataset.livueId : null, a = e.value, l, s = [];
    if (Array.isArray(a) ? (l = a[0], s = a[1] || []) : l = a, typeof l != "string") {
      console.warn("[LiVue] v-init: expected method name (string), got", typeof l);
      return;
    }
    let u = (o || "unknown") + ":" + l;
    Ar.has(u) || (Ar.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, vn = /* @__PURE__ */ new WeakMap();
function va(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const ga = {
  mounted(t, e, n) {
    t.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + t.tagName.toLowerCase() + ">");
    let r = va(n);
    if (!r) {
      console.warn("[LiVue] v-submit: livue helper not found in component context");
      return;
    }
    let i = e.value, o, a = [];
    if (Array.isArray(i) ? (o = i[0], a = i[1] || []) : o = i, typeof o != "string") {
      console.warn("[LiVue] v-submit: expected method name (string), got", typeof o);
      return;
    }
    let l = function(s) {
      s.preventDefault(), r.call(o, a);
    };
    t.addEventListener("submit", l), vn.set(t, l);
  },
  unmounted(t) {
    let e = vn.get(t);
    e && (t.removeEventListener("submit", e), vn.delete(t));
  }
}, xt = /* @__PURE__ */ new WeakMap();
function ya(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const ba = {
  mounted(t, e, n) {
    let r = ya(n);
    if (!r) {
      console.warn("[LiVue] v-intersect: livue helper not found in component context");
      return;
    }
    let i = e.value, o, a = [];
    if (Array.isArray(i) ? (o = i[0], a = i[1] || []) : o = i, typeof o != "string") {
      console.warn("[LiVue] v-intersect: expected method name (string), got", typeof o);
      return;
    }
    let l = e.modifiers || {}, s = e.arg, u = 0;
    l.half && (u = 0.5), l.full && (u = 1);
    let d = "0px";
    if (s) {
      let p = parseInt(s, 10);
      isNaN(p) || (d = p + "px");
    }
    let c = l.leave === !0, m = !1, y = new IntersectionObserver(
      function(p) {
        let w = p[0];
        (c ? !w.isIntersecting : w.isIntersecting) && (!l.once || !m) && (m = !0, r.call(o, a), l.once && (y.disconnect(), xt.delete(t)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    y.observe(t), xt.set(t, y);
  },
  unmounted(t) {
    let e = xt.get(t);
    e && (e.disconnect(), xt.delete(t));
  }
}, gn = /* @__PURE__ */ new WeakMap();
function yn(t, e) {
  let n = t.getAttribute("href");
  if (!n)
    return;
  let r = e.value, i = e.modifiers || {}, o = window.location.pathname, a;
  try {
    a = new URL(n, window.location.origin).pathname;
  } catch {
    return;
  }
  let l = !1;
  if (i.strict)
    l = o === a;
  else if (i.exact) {
    let s = o.replace(/\/$/, "") || "/", u = a.replace(/\/$/, "") || "/";
    l = s === u;
  } else {
    let s = a.replace(/\/$/, "") || "/";
    s === "/" ? l = o === "/" : l = o === s || o.startsWith(s + "/");
  }
  if (typeof r == "string") {
    let s = r.split(" ").filter(function(u) {
      return u.trim();
    });
    l ? (s.forEach(function(u) {
      t.classList.add(u);
    }), t.setAttribute("data-current", "")) : (s.forEach(function(u) {
      t.classList.remove(u);
    }), t.removeAttribute("data-current"));
  }
}
const wa = {
  mounted(t, e) {
    yn(t, e);
    let n = function() {
      yn(t, e);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), gn.set(t, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(t, e) {
    yn(t, e);
  },
  unmounted(t, e) {
    let n = e.value;
    typeof n == "string" && n.split(" ").filter(function(i) {
      return i.trim();
    }).forEach(function(i) {
      t.classList.remove(i);
    }), t.removeAttribute("data-current");
    let r = gn.get(t);
    r && (r(), gn.delete(t));
  }
};
let Dr = 0;
const Sa = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    Dr++;
    let n = "livue-ignore-" + Dr;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, Ze = /* @__PURE__ */ new WeakMap();
let Tr = 0;
function Ea(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return {
      livue: e.setupState.livue,
      state: e.setupState
    };
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return {
      livue: e.parent.setupState.livue,
      state: e.parent.setupState
    };
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return {
        livue: n.setupState.livue,
        state: n.setupState
      };
    n = n.parent;
  }
  return null;
}
function _a(t) {
  let e = 0, n = 0, r = !1, i = !1, o = 0;
  for (let a in t) {
    if (a === "debounce") {
      r = !0;
      continue;
    }
    if (a === "throttle") {
      i = !0;
      continue;
    }
    let l = a.match(/^debounce\.?(\d+)(ms)?$/i);
    if (l) {
      e = parseInt(l[1], 10);
      continue;
    }
    let s = a.match(/^throttle\.?(\d+)(ms)?$/i);
    if (s) {
      n = parseInt(s[1], 10);
      continue;
    }
    let u = a.match(/^(\d+)(ms)?$/);
    u && (o = parseInt(u[1], 10));
  }
  return r && o > 0 && (e = o), i && o > 0 && (n = o), r && e === 0 && (e = 150), i && n === 0 && (n = 150), { debounceMs: e, throttleMs: n };
}
function kt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Cr(t, e) {
  if (t.type === "checkbox")
    t.checked = !!e;
  else if (t.type === "radio")
    t.checked = t.value === String(e);
  else if (t.tagName === "SELECT" && t.multiple) {
    let n = Array.isArray(e) ? e.map(String) : [String(e)];
    Array.from(t.options).forEach(function(r) {
      r.selected = n.includes(r.value);
    });
  } else
    t.value !== String(e || "") && (t.value = e || "");
}
function Aa(t) {
  return !!t.component;
}
const Da = {
  mounted(t, e, n) {
    let r = Ea(n);
    if (!r) {
      console.warn("[LiVue] v-model-livue: livue helper not found in component context");
      return;
    }
    let { livue: i, state: o } = r, a = e.arg;
    if (!a) {
      console.warn("[LiVue] v-model-livue requires property name as argument (v-model-livue:propertyName)");
      return;
    }
    let l = e.modifiers || {};
    Tr++;
    let s = "model-" + Tr, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = _a(l);
    l.live && !d && !c && (d = 150);
    function m(D) {
      if (l.number) {
        let I = Number(D);
        D = isNaN(I) ? 0 : I;
      }
      l.boolean && (D = !!D && D !== "false" && D !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = D : o[a] = D;
    }
    function y(D) {
      d > 0 ? Je(s, d)(function() {
        m(D);
      }) : c > 0 ? St(s, c)(function() {
        m(D);
      }) : m(D);
    }
    let p;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? p = o[a].value : p = o[a];
    let w = Aa(n), h = n.component, A = null, k = null, N = null, L = null;
    if (w && h)
      L = h.emit, h.emit = function(D, ...I) {
        if (D === "update:modelValue") {
          let H = I[0];
          y(H);
          return;
        }
        return L.call(h, D, ...I);
      }, h.props && "modelValue" in h.props && (N = Ce(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(D) {
          h.vnode && h.vnode.props && (h.vnode.props.modelValue = D), h.exposed && typeof h.exposed.setValue == "function" && h.exposed.setValue(D), h.update && h.update();
        },
        { immediate: !0 }
      )), Ze.set(t, {
        isComponent: !0,
        componentInstance: h,
        originalEmit: L,
        stopWatcher: N,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let D = Je(s, d);
        A = function(I) {
          let H = kt(I.target);
          D(function() {
            m(H);
          });
        };
      } else if (c > 0) {
        let D = St(s, c);
        A = function(I) {
          let H = kt(I.target);
          D(function() {
            m(H);
          });
        };
      } else
        A = function(D) {
          m(kt(D.target));
        };
      l.enter ? (k = function(D) {
        D.key === "Enter" && m(kt(D.target));
      }, t.addEventListener("keyup", k)) : t.addEventListener(u, A), Cr(t, p), Ze.set(t, {
        isComponent: !1,
        handler: A,
        keyHandler: k,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(t, e, n) {
    let r = Ze.get(t);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], Cr(t, a);
    }
  },
  unmounted(t) {
    let e = Ze.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), Ze.delete(t));
  }
}, bn = /* @__PURE__ */ new WeakMap(), Ta = 2500;
function Ca(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Ta;
}
function La(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const xa = {
  mounted(t, e, n) {
    let r = La(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = e.modifiers || {}, s = Ca(l), u = l["keep-alive"] === !0, d = l.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function m() {
      c.isPaused || d && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function y() {
      c.intervalId || (c.intervalId = setInterval(m, s));
    }
    function p() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(w) {
        c.isVisible = w[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", p), c.visibilityHandler = p, y(), bn.set(t, c);
  },
  unmounted(t) {
    let e = bn.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), bn.delete(t));
  }
}, It = /* @__PURE__ */ new WeakMap();
let tn = typeof navigator < "u" ? navigator.onLine : !0, nn = /* @__PURE__ */ new Set(), Lr = !1;
function ka() {
  Lr || typeof window > "u" || (Lr = !0, window.addEventListener("online", function() {
    tn = !0, nn.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    tn = !1, nn.forEach(function(t) {
      t(!1);
    });
  }));
}
const Ia = {
  created(t, e) {
    ka();
    let n = e.modifiers || {}, r = e.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = t.style.display || "", tn && (t.style.display = "none")), It.set(t, o);
  },
  mounted(t, e) {
    let n = It.get(t);
    if (!n)
      return;
    function r(i) {
      let o = !i;
      switch (n.mode) {
        case "visibility":
          o ? t.style.display = n.originalDisplay || "" : t.style.display = "none";
          break;
        case "class-add":
          if (n.value) {
            let a = n.value.trim().split(/\s+/);
            o ? a.forEach(function(l) {
              t.classList.add(l);
            }) : a.forEach(function(l) {
              t.classList.remove(l);
            });
          }
          break;
        case "class-remove":
          if (n.value) {
            let a = n.value.trim().split(/\s+/);
            o ? a.forEach(function(l) {
              t.classList.remove(l);
            }) : a.forEach(function(l) {
              t.classList.add(l);
            });
          }
          break;
        case "attr":
          n.value && (o ? t.setAttribute(n.value, "") : t.removeAttribute(n.value));
          break;
      }
    }
    r(tn), n.updateFn = r, nn.add(r);
  },
  unmounted(t) {
    let e = It.get(t);
    e && e.updateFn && nn.delete(e.updateFn), It.delete(t);
  }
};
let xr = 0;
const et = /* @__PURE__ */ new WeakMap(), wn = /* @__PURE__ */ new Map(), Na = {
  created(t, e) {
    xr++;
    let n = "livue-replace-" + xr, r = e.modifiers.self === !0;
    et.set(t, {
      id: n,
      isSelf: r,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), r && t.setAttribute("data-livue-replace-self", ""), wn.set(n, 0);
  },
  mounted(t, e) {
    let n = et.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = et.get(t);
    n && (n.version++, wn.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = et.get(t);
    e && wn.delete(e.id), et.delete(t);
  }
}, tt = /* @__PURE__ */ new WeakMap(), kr = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Oa = 200;
function Ma(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(kr))
    if (t[e])
      return kr[e];
  return Oa;
}
function Pa(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
function Sn(t, e, n, r, i) {
  if (n.remove) {
    i ? t.style.display = "none" : t.style.display = e.originalDisplay;
    return;
  }
  if (n.class) {
    let o = (r || "").split(" ").filter(Boolean);
    i ? o.forEach(function(a) {
      e.addedClasses.includes(a) || (t.classList.add(a), e.addedClasses.push(a));
    }) : (e.addedClasses.forEach(function(a) {
      t.classList.remove(a);
    }), e.addedClasses = []);
    return;
  }
  if (n.attr) {
    let o = r || "disabled";
    i ? (t.setAttribute(o, ""), e.addedAttr = o) : e.addedAttr && (t.removeAttribute(e.addedAttr), e.addedAttr = null);
    return;
  }
  i ? t.style.display = e.originalDisplay || "" : t.style.display = "none";
}
const Va = {
  created(t, e) {
    let n = t.style.display;
    tt.set(t, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      delayTimer: null,
      stopWatch: null,
      isActive: !1
    });
    let r = e.modifiers || {};
    !r.remove && !r.class && !r.attr && (t.style.display = "none");
  },
  mounted(t, e, n) {
    let r = Pa(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = tt.get(t), o = e.modifiers || {}, a = Ma(o), l = e.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Sn(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, Sn(t, i, o, u, !0)) : (i.isActive = !1, Sn(t, i, o, u, !1));
    }
    i.stopWatch = Ce(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      d,
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    tt.get(t);
  },
  unmounted(t) {
    let e = tt.get(t);
    e && (e.delayTimer && clearTimeout(e.delayTimer), e.stopWatch && e.stopWatch(), tt.delete(t));
  }
}, Nt = /* @__PURE__ */ new WeakMap();
function Ir(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const Ra = {
  mounted(t, e, n) {
    let r = Ir(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = e.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = Ce(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? t.setAttribute("data-loading", "") : t.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    Nt.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = Nt.get(t), i = Ir(n);
    if (!r || !i) return;
    let o = e.value, a = e.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Ce(
      function() {
        return i.isLoading(o);
      },
      function(l) {
        l ? t.setAttribute("data-loading", "") : t.removeAttribute("data-loading");
      },
      { immediate: !0 }
    ));
  },
  unmounted(t) {
    let e = Nt.get(t);
    e && (e.stopWatch && e.stopWatch(), Nt.delete(t));
  }
}, nt = /* @__PURE__ */ new WeakMap(), Ha = {
  /**
   * Called when directive is first bound to the element.
   */
  mounted(t, e) {
    const n = e.value;
    if (!n || typeof n != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", n);
      return;
    }
    const r = e.modifiers.replace || !1;
    nt.set(t, { targetId: n }), Sr(n, t, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(t, e) {
    const n = nt.get(t), r = e.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      Er(n.targetId);
      const i = e.modifiers.replace || !1;
      Sr(r, t, i), nt.set(t, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = nt.get(t);
    e && (Er(e.targetId), nt.delete(t));
  }
}, En = /* @__PURE__ */ new WeakMap();
let Nr = 0;
function ja(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
}
function Fa(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const za = {
  mounted(t, e, n) {
    const { arg: r, modifiers: i } = e, o = Fa(n);
    if (!o) {
      console.warn("[LiVue] v-click: livue helper not found in component context");
      return;
    }
    Nr++;
    const a = "v-click-" + Nr, l = ja(i);
    let s = null, u = null;
    i.debounce && (s = Je(a, l)), i.throttle && (u = St(a, l));
    let d = !1, c = null;
    r && (c = r);
    const m = function(h) {
      let A = c, k = [];
      if (r) {
        A = r;
        const L = e.value;
        L != null && (k = Array.isArray(L) ? L : [L]);
      } else {
        const L = e.value;
        typeof L == "string" ? A = L : Array.isArray(L) && L.length > 0 && (A = L[0], k = L.slice(1));
      }
      if (!A) {
        console.warn("[LiVue] v-click: no method specified");
        return;
      }
      const N = function() {
        o.call(A, ...k);
      };
      s ? s(N) : u ? u(N) : N();
    }, y = function(h) {
      if (!(i.self && h.target !== t)) {
        if (i.once) {
          if (d)
            return;
          d = !0;
        }
        i.prevent && h.preventDefault(), i.stop && h.stopPropagation(), m();
      }
    }, p = {};
    i.capture && (p.capture = !0), i.passive && (p.passive = !0);
    const w = {
      handler: y,
      options: p,
      outsideHandler: null
    };
    if (i.outside) {
      const h = function(A) {
        if (!t.contains(A.target) && A.target !== t) {
          if (i.once) {
            if (d)
              return;
            d = !0;
          }
          m();
        }
      };
      document.addEventListener("click", h, p), w.outsideHandler = h;
    } else
      t.addEventListener("click", y, p);
    En.set(t, w);
  },
  updated(t, e, n) {
  },
  unmounted(t) {
    const e = En.get(t);
    e && (e.outsideHandler ? document.removeEventListener("click", e.outsideHandler, e.options) : t.removeEventListener("click", e.handler, e.options), En.delete(t));
  }
}, qa = {
  mounted(t, e) {
    if (t.tagName !== "A") {
      console.warn("[LiVue] v-navigate should only be used on <a> elements");
      return;
    }
    var n = e.modifiers || {};
    t.setAttribute("data-livue-navigate", "true"), (n.hover || n.prefetch) && t.setAttribute("data-livue-navigate-mode", "hover");
  },
  unmounted(t) {
    t.removeAttribute("data-livue-navigate"), t.removeAttribute("data-livue-navigate-mode");
  }
};
let Or = 0;
const Wa = {
  created(t, e) {
    let n = e.value;
    n || (Or++, n = "scroll-" + Or), t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n;
  },
  updated(t, e) {
    let n = e.value;
    n && n !== t.__livue_scroll_key && (t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n);
  },
  unmounted(t) {
    t.removeAttribute("data-livue-scroll"), delete t.__livue_scroll_key;
  }
}, rt = /* @__PURE__ */ new WeakMap();
function Mr(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
function Pr(t, e, n, r, i) {
  if (n.class) {
    if (!r)
      return;
    let o = r.trim().split(/\s+/);
    n.remove ? i ? o.forEach(function(a) {
      t.classList.remove(a);
    }) : o.forEach(function(a) {
      t.classList.add(a);
    }) : i ? o.forEach(function(a) {
      e.addedClasses.includes(a) || (t.classList.add(a), e.addedClasses.push(a));
    }) : (e.addedClasses.forEach(function(a) {
      t.classList.remove(a);
    }), e.addedClasses = []);
    return;
  }
  if (n.attr) {
    let o = r || "data-dirty";
    i ? (t.setAttribute(o, ""), e.addedAttr = o) : e.addedAttr && (t.removeAttribute(e.addedAttr), e.addedAttr = null);
    return;
  }
  i ? t.style.display = e.originalDisplay || "" : t.style.display = "none";
}
const $a = {
  created(t, e) {
    let n = t.style.display;
    rt.set(t, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = e.modifiers || {};
    !r.class && !r.attr && (t.style.display = "none");
  },
  mounted(t, e, n) {
    let r = Mr(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = rt.get(t), o = e.modifiers || {}, a = e.arg || null, l = e.value;
    i.stopWatch = Ce(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        Pr(t, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    let r = rt.get(t);
    if (r && e.value !== e.oldValue) {
      let i = Mr(n);
      if (i) {
        let o = e.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Pr(t, r, e.modifiers || {}, e.value, a);
      }
    }
  },
  unmounted(t) {
    let e = rt.get(t);
    e && (e.stopWatch && e.stopWatch(), rt.delete(t));
  }
}, Ot = /* @__PURE__ */ new WeakMap();
let Vr = 0;
function Ba(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Ua(t, e) {
  let n = t.instance;
  if (n) {
    let o = n.$ || n._ || n;
    if (o.setupState && o.setupState.livue)
      return {
        livue: o.setupState.livue,
        state: o.setupState
      };
    if (n.livue) {
      let a = o.setupState || n;
      return {
        livue: a.livue || n.livue,
        state: a
      };
    }
  }
  let r = e.ctx;
  if (r && r.setupState && r.setupState.livue)
    return {
      livue: r.setupState.livue,
      state: r.setupState
    };
  if (r && r.parent && r.parent.setupState && r.parent.setupState.livue)
    return {
      livue: r.parent.setupState.livue,
      state: r.parent.setupState
    };
  let i = r ? r.parent : null;
  for (; i; ) {
    if (i.setupState && i.setupState.livue)
      return {
        livue: i.setupState.livue,
        state: i.setupState
      };
    i = i.parent;
  }
  return null;
}
function Ja(t, e) {
  let n = e.split("."), r = t[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const Xa = {
  mounted(t, e, n) {
    let r = Ua(e, n);
    if (!r) {
      console.warn("[LiVue] v-watch: Could not find livue context");
      return;
    }
    let i = e.value || t.dataset.watchPath;
    if (!i) {
      console.warn(`[LiVue] v-watch: No path found. Use v-watch="'path'" or data-watch-path="path"`);
      return;
    }
    let { livue: o, state: a } = r, l = e.modifiers || {};
    Vr++;
    let s = "watch-" + i + "-" + Vr;
    if (l.blur) {
      let m = function() {
        o.sync();
      };
      t.addEventListener("focusout", m), Ot.set(t, { blurHandler: m });
      return;
    }
    let u = Ba(l) || 150, d = Je(s, u), c = Ce(
      function() {
        return Ja(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    Ot.set(t, { stopWatcher: c });
  },
  unmounted(t) {
    let e = Ot.get(t);
    e && (e.stopWatcher && e.stopWatcher(), e.blurHandler && t.removeEventListener("focusout", e.blurHandler), Ot.delete(t));
  }
}, ht = /* @__PURE__ */ new WeakMap();
let Rr = 0;
function Ya(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function Ga(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function Ka(t, e) {
  let n = t.instance;
  if (n) {
    let o = n.$ || n._ || n;
    if (o.setupState && o.setupState.livue)
      return { state: o.setupState };
    if (n.livue)
      return { state: o.setupState || n };
  }
  let r = e.ctx;
  if (r && r.setupState && r.setupState.livue)
    return { state: r.setupState };
  if (r && r.parent && r.parent.setupState && r.parent.setupState.livue)
    return { state: r.parent.setupState };
  let i = r ? r.parent : null;
  for (; i; ) {
    if (i.setupState && i.setupState.livue)
      return { state: i.setupState };
    i = i.parent;
  }
  return null;
}
function _t(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function At(t, e, n) {
  let r = t[e];
  r && typeof r == "object" && "value" in r ? r.value = n : t[e] = n;
}
function Ei(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Qa(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let r in t)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function Za(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function el(t) {
  return Za(t) ? t : t.querySelector("input, textarea, select");
}
function Dt(t, e) {
  return {
    mounted(n, r, i) {
      if (Ya(i) && !Ga(i))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = Ka(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: l } = a, s = Qa(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Rr++;
      let d = t + "-" + Rr, c = el(n);
      if (!c) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let m = e(c, s, l, u, d);
      c.addEventListener(m.eventType, m.handler, { capture: !0 }), ht.set(n, {
        targetEl: c,
        handler: m.handler,
        eventType: m.eventType
      });
    },
    unmounted(n) {
      let r = ht.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), ht.delete(n));
    }
  };
}
const tl = Dt("debounce", function(t, e, n, r, i) {
  let o = Ei(r) || 150, a = Je(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = _t(l.target);
      a(function() {
        At(n, e, s);
      });
    }
  };
}), nl = Dt("throttle", function(t, e, n, r, i) {
  let o = Ei(r) || 150, a = St(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = _t(l.target);
      a(function() {
        At(n, e, s);
      });
    }
  };
}), Zn = Dt("blur", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    At(n, e, _t(l.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), rl = Zn.unmounted;
Zn.unmounted = function(t) {
  let e = ht.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), rl(t);
};
const er = Dt("enter", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && At(n, e, _t(l.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), il = er.unmounted;
er.unmounted = function(t) {
  let e = ht.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), il(t);
};
const ol = Dt("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = _t(o.target);
      a = !!a && a !== "false" && a !== "0", At(n, e, a);
    }
  };
});
function Hr(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function le(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Hr(Object(n), !0).forEach(function(r) {
      al(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Hr(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function qt(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? qt = function(e) {
    return typeof e;
  } : qt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, qt(t);
}
function al(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function ge() {
  return ge = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, ge.apply(this, arguments);
}
function ll(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function sl(t, e) {
  if (t == null) return {};
  var n = ll(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
var ul = "1.15.6";
function ve(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var ye = ve(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Tt = ve(/Edge/i), jr = ve(/firefox/i), mt = ve(/safari/i) && !ve(/chrome/i) && !ve(/android/i), tr = ve(/iP(ad|od|hone)/i), _i = ve(/chrome/i) && ve(/android/i), Ai = {
  capture: !1,
  passive: !1
};
function P(t, e, n) {
  t.addEventListener(e, n, !ye && Ai);
}
function M(t, e, n) {
  t.removeEventListener(e, n, !ye && Ai);
}
function rn(t, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), t)
      try {
        if (t.matches)
          return t.matches(e);
        if (t.msMatchesSelector)
          return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector)
          return t.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function Di(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function ie(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && rn(t, e) : rn(t, e)) || r && t === n)
        return t;
      if (t === n) break;
    } while (t = Di(t));
  }
  return null;
}
var Fr = /\s+/g;
function Q(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(Fr, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(Fr, " ");
    }
}
function T(t, e, n) {
  var r = t && t.style;
  if (r) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in r) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), r[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function Ue(t, e) {
  var n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      var r = T(t, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!e && (t = t.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function Ti(t, e, n) {
  if (t) {
    var r = t.getElementsByTagName(e), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function ae() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function $(t, e, n, r, i) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, a, l, s, u, d, c;
    if (t !== window && t.parentNode && t !== ae() ? (o = t.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, d = o.height, c = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !ye))
      do
        if (i && i.getBoundingClientRect && (T(i, "transform") !== "none" || n && T(i, "position") !== "static")) {
          var m = i.getBoundingClientRect();
          a -= m.top + parseInt(T(i, "border-top-width")), l -= m.left + parseInt(T(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var y = Ue(i || t), p = y && y.a, w = y && y.d;
      y && (a /= w, l /= p, c /= p, d /= w, s = a + d, u = l + c);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: c,
      height: d
    };
  }
}
function zr(t, e, n) {
  for (var r = Ae(t, !0), i = $(t)[e]; r; ) {
    var o = $(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === ae()) break;
    r = Ae(r, !1);
  }
  return !1;
}
function Xe(t, e, n, r) {
  for (var i = 0, o = 0, a = t.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== C.ghost && (r || a[o] !== C.dragged) && ie(a[o], n.draggable, t, !1)) {
      if (i === e)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function nr(t, e) {
  for (var n = t.lastElementChild; n && (n === C.ghost || T(n, "display") === "none" || e && !rn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function te(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== C.clone && (!e || rn(t, e)) && n++;
  return n;
}
function qr(t) {
  var e = 0, n = 0, r = ae();
  if (t)
    do {
      var i = Ue(t), o = i.a, a = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function cl(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var r in e)
        if (e.hasOwnProperty(r) && e[r] === t[n][r]) return Number(n);
    }
  return -1;
}
function Ae(t, e) {
  if (!t || !t.getBoundingClientRect) return ae();
  var n = t, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = T(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ae();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ae();
}
function fl(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function _n(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var vt;
function Ci(t, e) {
  return function() {
    if (!vt) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), vt = setTimeout(function() {
        vt = void 0;
      }, e);
    }
  };
}
function dl() {
  clearTimeout(vt), vt = void 0;
}
function Li(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function xi(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function ki(t, e, n) {
  var r = {};
  return Array.from(t.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!ie(i, e.draggable, t, !1) || i.animated || i === n)) {
      var u = $(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var K = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function pl() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(T(i, "display") === "none" || i === C.ghost)) {
            t.push({
              target: i,
              rect: $(i)
            });
            var o = le({}, t[t.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Ue(i, !0);
              a && (o.top -= a.f, o.left -= a.e);
            }
            i.fromRect = o;
          }
        });
      }
    },
    addAnimationState: function(r) {
      t.push(r);
    },
    removeAnimationState: function(r) {
      t.splice(cl(t, {
        target: r
      }), 1);
    },
    animateAll: function(r) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof r == "function" && r();
        return;
      }
      var o = !1, a = 0;
      t.forEach(function(l) {
        var s = 0, u = l.target, d = u.fromRect, c = $(u), m = u.prevFromRect, y = u.prevToRect, p = l.rect, w = Ue(u, !0);
        w && (c.top -= w.f, c.left -= w.e), u.toRect = c, u.thisAnimationDuration && _n(m, c) && !_n(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (p.top - c.top) / (p.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = ml(p, m, y, i.options)), _n(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, p, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        T(r, "transition", ""), T(r, "transform", "");
        var l = Ue(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, T(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = hl(r), T(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), T(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          T(r, "transition", ""), T(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function hl(t) {
  return t.offsetWidth;
}
function ml(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var He = [], An = {
  initializeByDefault: !0
}, Ct = {
  mount: function(e) {
    for (var n in An)
      An.hasOwnProperty(n) && !(n in e) && (e[n] = An[n]);
    He.forEach(function(r) {
      if (r.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), He.push(e);
  },
  pluginEvent: function(e, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = e + "Global";
    He.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](le({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](le({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(e, n, r, i) {
    He.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var u = new l(e, n, e.options);
        u.sortable = e, u.options = e.options, e[s] = u, ge(r, u.defaults);
      }
    });
    for (var o in e.options)
      if (e.options.hasOwnProperty(o)) {
        var a = this.modifyOption(e, o, e.options[o]);
        typeof a < "u" && (e.options[o] = a);
      }
  },
  getEventProperties: function(e, n) {
    var r = {};
    return He.forEach(function(i) {
      typeof i.eventProperties == "function" && ge(r, i.eventProperties.call(n[i.pluginName], e));
    }), r;
  },
  modifyOption: function(e, n, r) {
    var i;
    return He.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(e[o.pluginName], r));
    }), i;
  }
};
function vl(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, c = t.newDraggableIndex, m = t.originalEvent, y = t.putSortable, p = t.extraEventProperties;
  if (e = e || n && n[K], !!e) {
    var w, h = e.options, A = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ye && !Tt ? w = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (w = document.createEvent("Event"), w.initEvent(r, !0, !0)), w.to = a || n, w.from = l || n, w.item = i || n, w.clone = o, w.oldIndex = s, w.newIndex = u, w.oldDraggableIndex = d, w.newDraggableIndex = c, w.originalEvent = m, w.pullMode = y ? y.lastPutMode : void 0;
    var k = le(le({}, p), Ct.getEventProperties(r, e));
    for (var N in k)
      w[N] = k[N];
    n && n.dispatchEvent(w), h[A] && h[A].call(e, w);
  }
}
var gl = ["evt"], G = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = sl(r, gl);
  Ct.pluginEvent.bind(C)(e, n, le({
    dragEl: b,
    parentEl: q,
    ghostEl: x,
    rootEl: F,
    nextEl: Me,
    lastDownEl: Wt,
    cloneEl: z,
    cloneHidden: Ee,
    dragStarted: at,
    putSortable: U,
    activeSortable: C.active,
    originalEvent: i,
    oldIndex: We,
    oldDraggableIndex: gt,
    newIndex: Z,
    newDraggableIndex: be,
    hideGhostForTarget: Mi,
    unhideGhostForTarget: Pi,
    cloneNowHidden: function() {
      Ee = !0;
    },
    cloneNowShown: function() {
      Ee = !1;
    },
    dispatchSortableEvent: function(l) {
      X({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function X(t) {
  vl(le({
    putSortable: U,
    cloneEl: z,
    targetEl: b,
    rootEl: F,
    oldIndex: We,
    oldDraggableIndex: gt,
    newIndex: Z,
    newDraggableIndex: be
  }, t));
}
var b, q, x, F, Me, Wt, z, Ee, We, Z, gt, be, Mt, U, qe = !1, on = !1, an = [], Ie, re, Dn, Tn, Wr, $r, at, je, yt, bt = !1, Pt = !1, $t, J, Cn = [], Wn = !1, ln = [], dn = typeof document < "u", Vt = tr, Br = Tt || ye ? "cssFloat" : "float", yl = dn && !_i && !tr && "draggable" in document.createElement("div"), Ii = (function() {
  if (dn) {
    if (ye)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Ni = function(e, n) {
  var r = T(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Xe(e, 0, n), a = Xe(e, 1, n), l = o && T(o), s = a && T(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + $(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + $(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Br] === "none" || a && r[Br] === "none" && u + d > i) ? "vertical" : "horizontal";
}, bl = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, wl = function(e, n) {
  var r;
  return an.some(function(i) {
    var o = i[K].options.emptyInsertThreshold;
    if (!(!o || nr(i))) {
      var a = $(i), l = e >= a.left - o && e <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, Oi = function(e) {
  function n(o, a) {
    return function(l, s, u, d) {
      var c = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (o == null && (a || c))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(l, s, u, d), a)(l, s, u, d);
      var m = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === m || o.join && o.indexOf(m) > -1;
    };
  }
  var r = {}, i = e.group;
  (!i || qt(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, Mi = function() {
  !Ii && x && T(x, "display", "none");
}, Pi = function() {
  !Ii && x && T(x, "display", "");
};
dn && !_i && document.addEventListener("click", function(t) {
  if (on)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), on = !1, !1;
}, !0);
var Ne = function(e) {
  if (b) {
    e = e.touches ? e.touches[0] : e;
    var n = wl(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[K]._onDragOver(r);
    }
  }
}, Sl = function(e) {
  b && b.parentNode[K]._isOutsideThisEl(e.target);
};
function C(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = ge({}, e), t[K] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Ni(t, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, l) {
      a.setData("Text", l.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: C.supportPointer !== !1 && "PointerEvent" in window && (!mt || tr),
    emptyInsertThreshold: 5
  };
  Ct.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Oi(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : yl, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? P(t, "pointerdown", this._onTapStart) : (P(t, "mousedown", this._onTapStart), P(t, "touchstart", this._onTapStart)), this.nativeDraggable && (P(t, "dragover", this), P(t, "dragenter", this)), an.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ge(this, pl());
}
C.prototype = /** @lends Sortable.prototype */
{
  constructor: C,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (je = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, b) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, d = i.filter;
      if (xl(r), !b && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && mt && s && s.tagName.toUpperCase() === "SELECT") && (s = ie(s, i.draggable, r, !1), !(s && s.animated) && Wt !== s)) {
        if (We = te(s), gt = te(s, i.draggable), typeof d == "function") {
          if (d.call(this, e, s, this)) {
            X({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), G("filter", n, {
              evt: e
            }), o && e.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = ie(u, c.trim(), r, !1), c)
            return X({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), G("filter", n, {
              evt: e
            }), !0;
        }), d)) {
          o && e.preventDefault();
          return;
        }
        i.handle && !ie(u, i.handle, r, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !b && r.parentNode === o) {
      var u = $(r);
      if (F = o, b = r, q = b.parentNode, Me = b.nextSibling, Wt = r, Mt = a.group, C.dragged = b, Ie = {
        target: b,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, Wr = Ie.clientX - u.left, $r = Ie.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, b.style["will-change"] = "all", s = function() {
        if (G("delayEnded", i, {
          evt: e
        }), C.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !jr && i.nativeDraggable && (b.draggable = !0), i._triggerDragStart(e, n), X({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), Q(b, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Ti(b, d.trim(), Ln);
      }), P(l, "dragover", Ne), P(l, "mousemove", Ne), P(l, "touchmove", Ne), a.supportPointer ? (P(l, "pointerup", i._onDrop), !this.nativeDraggable && P(l, "pointercancel", i._onDrop)) : (P(l, "mouseup", i._onDrop), P(l, "touchend", i._onDrop), P(l, "touchcancel", i._onDrop)), jr && this.nativeDraggable && (this.options.touchStartThreshold = 4, b.draggable = !0), G("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Tt || ye))) {
        if (C.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (P(l, "pointerup", i._disableDelayedDrag), P(l, "pointercancel", i._disableDelayedDrag)) : (P(l, "mouseup", i._disableDelayedDrag), P(l, "touchend", i._disableDelayedDrag), P(l, "touchcancel", i._disableDelayedDrag)), P(l, "mousemove", i._delayedDragTouchMoveHandler), P(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && P(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    b && Ln(b), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    M(e, "mouseup", this._disableDelayedDrag), M(e, "touchend", this._disableDelayedDrag), M(e, "touchcancel", this._disableDelayedDrag), M(e, "pointerup", this._disableDelayedDrag), M(e, "pointercancel", this._disableDelayedDrag), M(e, "mousemove", this._delayedDragTouchMoveHandler), M(e, "touchmove", this._delayedDragTouchMoveHandler), M(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? P(document, "pointermove", this._onTouchMove) : n ? P(document, "touchmove", this._onTouchMove) : P(document, "mousemove", this._onTouchMove) : (P(b, "dragend", this), P(F, "dragstart", this._onDragStart));
    try {
      document.selection ? Bt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (qe = !1, F && b) {
      G("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && P(document, "dragover", Sl);
      var r = this.options;
      !e && Q(b, r.dragClass, !1), Q(b, r.ghostClass, !0), C.active = this, e && this._appendGhost(), X({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (re) {
      this._lastX = re.clientX, this._lastY = re.clientY, Mi();
      for (var e = document.elementFromPoint(re.clientX, re.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(re.clientX, re.clientY), e !== n); )
        n = e;
      if (b.parentNode[K]._isOutsideThisEl(e), n)
        do {
          if (n[K]) {
            var r = void 0;
            if (r = n[K]._onDragOver({
              clientX: re.clientX,
              clientY: re.clientY,
              target: e,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = Di(n));
      Pi();
    }
  },
  _onTouchMove: function(e) {
    if (Ie) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = x && Ue(x, !0), l = x && a && a.a, s = x && a && a.d, u = Vt && J && qr(J), d = (o.clientX - Ie.clientX + i.x) / (l || 1) + (u ? u[0] - Cn[0] : 0) / (l || 1), c = (o.clientY - Ie.clientY + i.y) / (s || 1) + (u ? u[1] - Cn[1] : 0) / (s || 1);
      if (!C.active && !qe) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (x) {
        a ? (a.e += d - (Dn || 0), a.f += c - (Tn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        T(x, "webkitTransform", m), T(x, "mozTransform", m), T(x, "msTransform", m), T(x, "transform", m), Dn = d, Tn = c, re = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!x) {
      var e = this.options.fallbackOnBody ? document.body : F, n = $(b, !0, Vt, !0, e), r = this.options;
      if (Vt) {
        for (J = e; T(J, "position") === "static" && T(J, "transform") === "none" && J !== document; )
          J = J.parentNode;
        J !== document.body && J !== document.documentElement ? (J === document && (J = ae()), n.top += J.scrollTop, n.left += J.scrollLeft) : J = ae(), Cn = qr(J);
      }
      x = b.cloneNode(!0), Q(x, r.ghostClass, !1), Q(x, r.fallbackClass, !0), Q(x, r.dragClass, !0), T(x, "transition", ""), T(x, "transform", ""), T(x, "box-sizing", "border-box"), T(x, "margin", 0), T(x, "top", n.top), T(x, "left", n.left), T(x, "width", n.width), T(x, "height", n.height), T(x, "opacity", "0.8"), T(x, "position", Vt ? "absolute" : "fixed"), T(x, "zIndex", "100000"), T(x, "pointerEvents", "none"), C.ghost = x, e.appendChild(x), T(x, "transform-origin", Wr / parseInt(x.style.width) * 100 + "% " + $r / parseInt(x.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var r = this, i = e.dataTransfer, o = r.options;
    if (G("dragStart", this, {
      evt: e
    }), C.eventCanceled) {
      this._onDrop();
      return;
    }
    G("setupClone", this), C.eventCanceled || (z = xi(b), z.removeAttribute("id"), z.draggable = !1, z.style["will-change"] = "", this._hideClone(), Q(z, this.options.chosenClass, !1), C.clone = z), r.cloneId = Bt(function() {
      G("clone", r), !C.eventCanceled && (r.options.removeCloneOnHide || F.insertBefore(z, b), r._hideClone(), X({
        sortable: r,
        name: "clone"
      }));
    }), !n && Q(b, o.dragClass, !0), n ? (on = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (M(document, "mouseup", r._onDrop), M(document, "touchend", r._onDrop), M(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, b)), P(document, "drop", r), T(b, "transform", "translateZ(0)")), qe = !0, r._dragStartId = Bt(r._dragStarted.bind(r, n, e)), P(document, "selectstart", r), at = !0, window.getSelection().removeAllRanges(), mt && T(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, l = this.options, s = l.group, u = C.active, d = Mt === s, c = l.sort, m = U || u, y, p = this, w = !1;
    if (Wn) return;
    function h(ue, Ge) {
      G(ue, p, le({
        evt: e,
        isOwner: d,
        axis: y ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: m,
        target: r,
        completed: k,
        onMove: function(ce, fe) {
          return Rt(F, n, b, i, ce, $(ce), e, fe);
        },
        changed: N
      }, Ge));
    }
    function A() {
      h("dragOverAnimationCapture"), p.captureAnimationState(), p !== m && m.captureAnimationState();
    }
    function k(ue) {
      return h("dragOverCompleted", {
        insertion: ue
      }), ue && (d ? u._hideClone() : u._showClone(p), p !== m && (Q(b, U ? U.options.ghostClass : u.options.ghostClass, !1), Q(b, l.ghostClass, !0)), U !== p && p !== C.active ? U = p : p === C.active && U && (U = null), m === p && (p._ignoreWhileAnimating = r), p.animateAll(function() {
        h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
      }), p !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (r === b && !b.animated || r === n && !r.animated) && (je = null), !l.dragoverBubble && !e.rootEl && r !== document && (b.parentNode[K]._isOutsideThisEl(e.target), !ue && Ne(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), w = !0;
    }
    function N() {
      Z = te(b), be = te(b, l.draggable), X({
        sortable: p,
        name: "change",
        toEl: n,
        newIndex: Z,
        newDraggableIndex: be,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = ie(r, l.draggable, n, !0), h("dragOver"), C.eventCanceled) return w;
    if (b.contains(e.target) || r.animated && r.animatingX && r.animatingY || p._ignoreWhileAnimating === r)
      return k(!1);
    if (on = !1, u && !l.disabled && (d ? c || (a = q !== F) : U === this || (this.lastPutMode = Mt.checkPull(this, u, b, e)) && s.checkPut(this, u, b, e))) {
      if (y = this._getDirection(e, r) === "vertical", i = $(b), h("dragOverValid"), C.eventCanceled) return w;
      if (a)
        return q = F, A(), this._hideClone(), h("revert"), C.eventCanceled || (Me ? F.insertBefore(b, Me) : F.appendChild(b)), k(!0);
      var L = nr(n, l.draggable);
      if (!L || Dl(e, y, this) && !L.animated) {
        if (L === b)
          return k(!1);
        if (L && n === e.target && (r = L), r && (o = $(r)), Rt(F, n, b, i, r, o, e, !!r) !== !1)
          return A(), L && L.nextSibling ? n.insertBefore(b, L.nextSibling) : n.appendChild(b), q = n, N(), k(!0);
      } else if (L && Al(e, y, this)) {
        var D = Xe(n, 0, l, !0);
        if (D === b)
          return k(!1);
        if (r = D, o = $(r), Rt(F, n, b, i, r, o, e, !1) !== !1)
          return A(), n.insertBefore(b, D), q = n, N(), k(!0);
      } else if (r.parentNode === n) {
        o = $(r);
        var I = 0, H, g = b.parentNode !== n, f = !bl(b.animated && b.toRect || i, r.animated && r.toRect || o, y), _ = y ? "top" : "left", E = zr(r, "top", "top") || zr(b, "top", "top"), S = E ? E.scrollTop : void 0;
        je !== r && (H = o[_], bt = !1, Pt = !f && l.invertSwap || g), I = Tl(e, r, o, y, f ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Pt, je === r);
        var v;
        if (I !== 0) {
          var O = te(b);
          do
            O -= I, v = q.children[O];
          while (v && (T(v, "display") === "none" || v === x));
        }
        if (I === 0 || v === r)
          return k(!1);
        je = r, yt = I;
        var V = r.nextElementSibling, R = !1;
        R = I === 1;
        var se = Rt(F, n, b, i, r, o, e, R);
        if (se !== !1)
          return (se === 1 || se === -1) && (R = se === 1), Wn = !0, setTimeout(_l, 30), A(), R && !V ? n.appendChild(b) : r.parentNode.insertBefore(b, R ? V : r), E && Li(E, 0, S - E.scrollTop), q = b.parentNode, H !== void 0 && !Pt && ($t = Math.abs(H - $(r)[_])), N(), k(!0);
      }
      if (n.contains(b))
        return k(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    M(document, "mousemove", this._onTouchMove), M(document, "touchmove", this._onTouchMove), M(document, "pointermove", this._onTouchMove), M(document, "dragover", Ne), M(document, "mousemove", Ne), M(document, "touchmove", Ne);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    M(e, "mouseup", this._onDrop), M(e, "touchend", this._onDrop), M(e, "pointerup", this._onDrop), M(e, "pointercancel", this._onDrop), M(e, "touchcancel", this._onDrop), M(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, r = this.options;
    if (Z = te(b), be = te(b, r.draggable), G("drop", this, {
      evt: e
    }), q = b && b.parentNode, Z = te(b), be = te(b, r.draggable), C.eventCanceled) {
      this._nulling();
      return;
    }
    qe = !1, Pt = !1, bt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), $n(this.cloneId), $n(this._dragStartId), this.nativeDraggable && (M(document, "drop", this), M(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), mt && T(document.body, "user-select", ""), T(b, "transform", ""), e && (at && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), x && x.parentNode && x.parentNode.removeChild(x), (F === q || U && U.lastPutMode !== "clone") && z && z.parentNode && z.parentNode.removeChild(z), b && (this.nativeDraggable && M(b, "dragend", this), Ln(b), b.style["will-change"] = "", at && !qe && Q(b, U ? U.options.ghostClass : this.options.ghostClass, !1), Q(b, this.options.chosenClass, !1), X({
      sortable: this,
      name: "unchoose",
      toEl: q,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), F !== q ? (Z >= 0 && (X({
      rootEl: q,
      name: "add",
      toEl: q,
      fromEl: F,
      originalEvent: e
    }), X({
      sortable: this,
      name: "remove",
      toEl: q,
      originalEvent: e
    }), X({
      rootEl: q,
      name: "sort",
      toEl: q,
      fromEl: F,
      originalEvent: e
    }), X({
      sortable: this,
      name: "sort",
      toEl: q,
      originalEvent: e
    })), U && U.save()) : Z !== We && Z >= 0 && (X({
      sortable: this,
      name: "update",
      toEl: q,
      originalEvent: e
    }), X({
      sortable: this,
      name: "sort",
      toEl: q,
      originalEvent: e
    })), C.active && ((Z == null || Z === -1) && (Z = We, be = gt), X({
      sortable: this,
      name: "end",
      toEl: q,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    G("nulling", this), F = b = q = x = Me = z = Wt = Ee = Ie = re = at = Z = be = We = gt = je = yt = U = Mt = C.dragged = C.ghost = C.clone = C.active = null, ln.forEach(function(e) {
      e.checked = !0;
    }), ln.length = Dn = Tn = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        b && (this._onDragOver(e), El(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], n, r = this.el.children, i = 0, o = r.length, a = this.options; i < o; i++)
      n = r[i], ie(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || Ll(n));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, n) {
    var r = {}, i = this.el;
    this.toArray().forEach(function(o, a) {
      var l = i.children[a];
      ie(l, this.options.draggable, i, !1) && (r[o] = l);
    }, this), n && this.captureAnimationState(), e.forEach(function(o) {
      r[o] && (i.removeChild(r[o]), i.appendChild(r[o]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, n) {
    return ie(e, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, n) {
    var r = this.options;
    if (n === void 0)
      return r[e];
    var i = Ct.modifyOption(this, e, n);
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && Oi(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    G("destroy", this);
    var e = this.el;
    e[K] = null, M(e, "mousedown", this._onTapStart), M(e, "touchstart", this._onTapStart), M(e, "pointerdown", this._onTapStart), this.nativeDraggable && (M(e, "dragover", this), M(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), an.splice(an.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Ee) {
      if (G("hideClone", this), C.eventCanceled) return;
      T(z, "display", "none"), this.options.removeCloneOnHide && z.parentNode && z.parentNode.removeChild(z), Ee = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ee) {
      if (G("showClone", this), C.eventCanceled) return;
      b.parentNode == F && !this.options.group.revertClone ? F.insertBefore(z, b) : Me ? F.insertBefore(z, Me) : F.appendChild(z), this.options.group.revertClone && this.animate(b, z), T(z, "display", ""), Ee = !1;
    }
  }
};
function El(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Rt(t, e, n, r, i, o, a, l) {
  var s, u = t[K], d = u.options.onMove, c;
  return window.CustomEvent && !ye && !Tt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = r, s.related = i || e, s.relatedRect = o || $(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function Ln(t) {
  t.draggable = !1;
}
function _l() {
  Wn = !1;
}
function Al(t, e, n) {
  var r = $(Xe(n.el, 0, n.options, !0)), i = ki(n.el, n.options, x), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function Dl(t, e, n) {
  var r = $(nr(n.el, n.options.draggable)), i = ki(n.el, n.options, x), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function Tl(t, e, n, r, i, o, a, l) {
  var s = r ? t.clientY : t.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && $t < u * i) {
      if (!bt && (yt === 1 ? s > d + u * o / 2 : s < c - u * o / 2) && (bt = !0), bt)
        m = !0;
      else if (yt === 1 ? s < d + $t : s > c - $t)
        return -yt;
    } else if (s > d + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return Cl(e);
  }
  return m = m || a, m && (s < d + u * o / 2 || s > c - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function Cl(t) {
  return te(b) < te(t) ? 1 : -1;
}
function Ll(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function xl(t) {
  ln.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && ln.push(r);
  }
}
function Bt(t) {
  return setTimeout(t, 0);
}
function $n(t) {
  return clearTimeout(t);
}
dn && P(document, "touchmove", function(t) {
  (C.active || qe) && t.cancelable && t.preventDefault();
});
C.utils = {
  on: P,
  off: M,
  css: T,
  find: Ti,
  is: function(e, n) {
    return !!ie(e, n, e, !1);
  },
  extend: fl,
  throttle: Ci,
  closest: ie,
  toggleClass: Q,
  clone: xi,
  index: te,
  nextTick: Bt,
  cancelNextTick: $n,
  detectDirection: Ni,
  getChild: Xe,
  expando: K
};
C.get = function(t) {
  return t[K];
};
C.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (C.utils = le(le({}, C.utils), r.utils)), Ct.mount(r);
  });
};
C.create = function(t, e) {
  return new C(t, e);
};
C.version = ul;
var W = [], lt, Bn, Un = !1, xn, kn, sn, st;
function kl() {
  function t() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return t.prototype = {
    dragStarted: function(n) {
      var r = n.originalEvent;
      this.sortable.nativeDraggable ? P(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? P(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? P(document, "touchmove", this._handleFallbackAutoScroll) : P(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? M(document, "dragover", this._handleAutoScroll) : (M(document, "pointermove", this._handleFallbackAutoScroll), M(document, "touchmove", this._handleFallbackAutoScroll), M(document, "mousemove", this._handleFallbackAutoScroll)), Ur(), Ut(), dl();
    },
    nulling: function() {
      sn = Bn = lt = Un = st = xn = kn = null, W.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (sn = n, r || this.options.forceAutoScrollFallback || Tt || ye || mt) {
        In(n, this.options, l, r);
        var s = Ae(l, !0);
        Un && (!st || o !== xn || a !== kn) && (st && Ur(), st = setInterval(function() {
          var u = Ae(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, Ut()), In(n, i.options, u, r);
        }, 10), xn = o, kn = a);
      } else {
        if (!this.options.bubbleScroll || Ae(l, !0) === ae()) {
          Ut();
          return;
        }
        In(n, this.options, Ae(l, !1), !1);
      }
    }
  }, ge(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ut() {
  W.forEach(function(t) {
    clearInterval(t.pid);
  }), W = [];
}
function Ur() {
  clearInterval(st);
}
var In = Ci(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = ae(), u = !1, d;
    Bn !== n && (Bn = n, Ut(), lt = e.scroll, d = e.scrollFn, lt === !0 && (lt = Ae(n, !0)));
    var c = 0, m = lt;
    do {
      var y = m, p = $(y), w = p.top, h = p.bottom, A = p.left, k = p.right, N = p.width, L = p.height, D = void 0, I = void 0, H = y.scrollWidth, g = y.scrollHeight, f = T(y), _ = y.scrollLeft, E = y.scrollTop;
      y === s ? (D = N < H && (f.overflowX === "auto" || f.overflowX === "scroll" || f.overflowX === "visible"), I = L < g && (f.overflowY === "auto" || f.overflowY === "scroll" || f.overflowY === "visible")) : (D = N < H && (f.overflowX === "auto" || f.overflowX === "scroll"), I = L < g && (f.overflowY === "auto" || f.overflowY === "scroll"));
      var S = D && (Math.abs(k - i) <= a && _ + N < H) - (Math.abs(A - i) <= a && !!_), v = I && (Math.abs(h - o) <= a && E + L < g) - (Math.abs(w - o) <= a && !!E);
      if (!W[c])
        for (var O = 0; O <= c; O++)
          W[O] || (W[O] = {});
      (W[c].vx != S || W[c].vy != v || W[c].el !== y) && (W[c].el = y, W[c].vx = S, W[c].vy = v, clearInterval(W[c].pid), (S != 0 || v != 0) && (u = !0, W[c].pid = setInterval(function() {
        r && this.layer === 0 && C.active._onTouchMove(sn);
        var V = W[this.layer].vy ? W[this.layer].vy * l : 0, R = W[this.layer].vx ? W[this.layer].vx * l : 0;
        typeof d == "function" && d.call(C.dragged.parentNode[K], R, V, t, sn, W[this.layer].el) !== "continue" || Li(W[this.layer].el, R, V);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && m !== s && (m = Ae(m, !1)));
    Un = u;
  }
}, 30), Vi = function(e) {
  var n = e.originalEvent, r = e.putSortable, i = e.dragEl, o = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    l();
    var d = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(d.clientX, d.clientY);
    s(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: r
    }));
  }
};
function rr() {
}
rr.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = Xe(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Vi
};
ge(rr, {
  pluginName: "revertOnSpill"
});
function ir() {
}
ir.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Vi
};
ge(ir, {
  pluginName: "removeOnSpill"
});
C.mount(new kl());
C.mount(ir, rr);
const $e = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap();
function Il(t) {
  let e = t.ctx;
  if (e && e.setupState && e.setupState.livue)
    return e.setupState.livue;
  if (e && e.parent && e.parent.setupState && e.parent.setupState.livue)
    return e.parent.setupState.livue;
  let n = e ? e.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
function Nl(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Ol = {
  mounted(t, e, n) {
    let r = Il(n);
    if (!r) {
      console.warn("[LiVue] v-sort: livue helper not found in component context");
      return;
    }
    let i = e.value, o, a = [];
    if (Array.isArray(i) ? (o = i[0], a = i[1] || []) : o = i, typeof o != "string") {
      console.warn("[LiVue] v-sort: expected method name (string), got", typeof o);
      return;
    }
    let l = e.modifiers || {}, s = Nl(l), u = l.horizontal ? "horizontal" : "vertical", d = t.dataset.livueSortGroup || null;
    t.dataset.livueSortMethod = o;
    let c = {
      animation: s,
      direction: u,
      ghostClass: "livue-sort-ghost",
      chosenClass: "livue-sort-chosen",
      dragClass: "livue-sort-drag",
      // Draggable items selector (elements with data-livue-sort-item)
      draggable: "[data-livue-sort-item]",
      // Filter out ignored elements (prevents drag on buttons, etc.)
      filter: "[data-livue-sort-ignore]",
      preventOnFilter: !1,
      // Callback when item is dropped
      onEnd: function(p) {
        let w = p.item, h = Jt.get(w);
        h === void 0 && (h = w.dataset.livueSortItem), typeof h == "string" && /^\d+$/.test(h) && (h = parseInt(h, 10));
        let A = p.newIndex;
        p.oldIndex;
        let k = p.from, N = p.to, L = [h, A].concat(a);
        if (k !== N) {
          let I = N.dataset.livueSortMethod;
          I && (o = I);
          let H = k.dataset.livueSortId || k.dataset.livueSortGroup || null;
          L.push(H);
        }
        r.call(o, L);
      }
    };
    t.querySelector("[data-livue-sort-handle]") && (c.handle = "[data-livue-sort-handle]"), d && (c.group = d);
    let y = C.create(t, c);
    $e.set(t, y);
  },
  updated(t) {
    let e = $e.get(t);
    e && t.querySelector("[data-livue-sort-handle]") && e.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = $e.get(t);
    e && (e.destroy(), $e.delete(t));
  }
}, Ml = {
  mounted(t, e) {
    let n = e.value;
    Jt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    Jt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (Jt.delete(t), t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Pl = {
  mounted(t) {
    t.setAttribute("data-livue-sort-handle", "");
  },
  unmounted(t) {
    if (t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-handle");
      } catch {
      }
  }
}, Vl = {
  mounted(t) {
    t.setAttribute("data-livue-sort-ignore", "");
  },
  unmounted(t) {
    if (t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-ignore");
      } catch {
      }
  }
}, Rl = {
  mounted(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = $e.get(t);
    r && r.option("group", n);
  },
  updated(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = $e.get(t);
    r && r.option("group", n);
  },
  unmounted(t) {
    if (t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
};
function Hl() {
  j("init", ma), j("submit", ga), j("intersect", ba), j("current", wa), j("ignore", Sa), j("model-livue", Da), j("debounce", tl), j("throttle", nl), j("blur", Zn), j("enter", er), j("boolean", ol), j("poll", xa), j("offline", Ia), j("transition", Qo), j("replace", Na), j("loading", Va), j("target", Ra), j("stream", Ha), j("click", za), j("navigate", qa), j("scroll", Wa), j("dirty", $a), j("watch", Xa), j("sort", Ol), j("sort-item", Ml), j("sort-handle", Pl), j("sort-ignore", Vl), j("sort-group", Rl);
}
let we = null, it = null, Jr = !1;
function jl() {
  if (Jr)
    return;
  Jr = !0;
  const t = document.createElement("style");
  t.textContent = `
        .livue-hmr-indicator {
            position: fixed;
            bottom: 16px;
            right: 16px;
            padding: 8px 16px;
            background: rgba(30, 30, 30, 0.95);
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 999998;
            display: flex;
            align-items: center;
            gap: 8px;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.2s, transform 0.2s;
            pointer-events: none;
        }

        .livue-hmr-indicator.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .livue-hmr-indicator .spinner {
            width: 14px;
            height: 14px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: livue-hmr-spin 0.8s linear infinite;
        }

        .livue-hmr-indicator .checkmark {
            color: #4ade80;
            font-size: 16px;
        }

        .livue-hmr-indicator .error-icon {
            color: #f87171;
            font-size: 16px;
        }

        @keyframes livue-hmr-spin {
            to { transform: rotate(360deg); }
        }
    `, document.head.appendChild(t);
}
function Fl() {
  return we || (jl(), we = document.createElement("div"), we.className = "livue-hmr-indicator", document.body.appendChild(we), we);
}
function Ht(t, e) {
  const n = Fl();
  switch (it && (clearTimeout(it), it = null), t) {
    case "updating":
      n.innerHTML = `
                <span class="spinner"></span>
                <span>Updating${e ? ": " + e : "..."}</span>
            `;
      break;
    case "done":
      n.innerHTML = `
                <span class="checkmark">&#10003;</span>
                <span>Updated</span>
            `, it = setTimeout(function() {
        Xr();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, it = setTimeout(function() {
        Xr();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Xr() {
  we && we.classList.remove("visible");
}
let Ve = null, pn = !0, Ri = !0, ut = !0, Xt = [];
function zl(t) {
  Ve = t;
}
async function ql(t) {
  if (pn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), ut && Ht("updating", t.fileName), Xt.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Ri ? Wl() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), ut && Ht("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Ve.reboot(), e && (await Bl(), $l(e)), ut && Ht("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), ut && Ht("error");
    }
  }
}
function Wl() {
  const t = /* @__PURE__ */ new Map();
  return Ve && Ve.all().forEach(function(n) {
    if (Yr(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Yr(r, i.name, i.state, t);
      }
  }), t;
}
function Yr(t, e, n, r) {
  const i = {};
  for (const o in n) {
    const a = n[o];
    if (!(typeof a == "function" || typeof a == "symbol"))
      try {
        i[o] = JSON.parse(JSON.stringify(a));
      } catch {
        console.warn("[LiVue HMR] Could not save state for " + e + "." + o);
      }
  }
  r.set(t, { name: e, state: i });
}
function $l(t) {
  Ve && t.forEach(function(e, n) {
    const r = Ve.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function Bl() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Ul() {
  return typeof import.meta < "u" && !1;
}
function Jl() {
  pn = !0;
}
function Xl() {
  pn = !1;
}
function Yl() {
  return pn;
}
function Gl(t) {
  t.indicator !== void 0 && (ut = t.indicator), t.preserveState !== void 0 && (Ri = t.preserveState);
}
function Kl(t) {
  return Xt.push(t), function() {
    const e = Xt.indexOf(t);
    e !== -1 && Xt.splice(e, 1);
  };
}
async function Ql() {
  Ve && await ql({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Fe = !1, Nn = [];
class Zl {
  constructor() {
    this.components = /* @__PURE__ */ new Map(), this._observer = null, this._devtoolsInitialized = !1, this._setupCallbacks = [], this._preservingIds = null;
  }
  /**
   * Configure Vue apps before they are created.
   * Use this to add plugins like Vuetify, Pinia stores, etc.
   *
   * The callback is called for each Vue app instance (root components
   * and islands), AFTER Pinia is installed but BEFORE mounting.
   *
   * @param {Function} callback - Function(app) called for each Vue app
   *
   * @example
   * // Add Vuetify
   * LiVue.setup((app) => {
   *     const vuetify = createVuetify({...});
   *     app.use(vuetify);
   * });
   *
   * @example
   * // Add multiple plugins
   * LiVue.setup((app) => {
   *     app.use(vuetify);
   *     app.use(router);
   *     app.component('MyComponent', MyComponent);
   *     app.directive('focus', focusDirective);
   * });
   */
  setup(e) {
    if (typeof e != "function") {
      console.error("[LiVue] setup() requires a function callback");
      return;
    }
    this._setupCallbacks.push(e);
  }
  /**
   * Register a global error handler.
   * Called when a non-validation error occurs on any component.
   *
   * @param {Function} handler - function(error, componentName)
   */
  onError(e) {
    Io(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Hl(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), so(this), this._startObserver(), zl(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Ho());
    }));
  }
  /**
   * Reboot: destroy all existing components and re-discover.
   * Called after SPA navigation swaps the page content.
   * The MutationObserver continues running and will pick up new components,
   * but we do a full scan here to ensure immediate initialization.
   */
  reboot() {
    this._stopObserver(), this.destroy(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), this._startObserver();
  }
  /**
   * Reboot but preserve certain components (don't destroy them).
   * Used during SPA navigation with @persist elements.
   */
  rebootPreserving() {
    document.querySelectorAll("[data-livue-id]").forEach(function(r) {
      this._isRoot(r) && this._initComponent(r);
    }.bind(this));
    let n = this;
    requestAnimationFrame(function() {
      n._startObserver();
    });
  }
  /**
   * Navigate to a URL using SPA navigation.
   * Can be called from user code: LiVue.navigate('/dashboard')
   *
   * @param {string} url - Target URL
   */
  navigate(e) {
    Et(e, !0, !1);
  }
  /**
   * Configure navigation behavior.
   *
   * @param {object} options
   * @param {boolean} [options.showProgressBar] - Show progress bar during navigation (default: true)
   * @param {string} [options.progressBarColor] - Progress bar color (default: '#29d')
   * @param {boolean} [options.prefetch] - Enable prefetching (default: true)
   * @param {boolean} [options.prefetchOnHover] - Prefetch on hover vs mousedown only (default: true)
   * @param {number} [options.hoverDelay] - Hover delay before prefetch in ms (default: 60)
   * @param {boolean} [options.cachePages] - Cache pages for back/forward (default: true)
   * @param {number} [options.maxCacheSize] - Max cached pages (default: 10)
   * @param {boolean} [options.restoreScroll] - Restore scroll position on back/forward (default: true)
   */
  configureNavigation(e) {
    lo(e);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(e) {
    return fn(e);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    yo();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return _o();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Le;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: Ye(),
      ...Ro()
    };
  }
  /**
   * Check if an element should get its own Vue app.
   * Returns true if the element is a top-level component (no livue parent)
   * or if it's explicitly marked as an island.
   *
   * @param {HTMLElement} el
   * @returns {boolean}
   */
  _isRoot(e) {
    if (e.hasAttribute("data-livue-island"))
      return !0;
    let n = e.parentElement;
    for (; n; ) {
      if (n.hasAttribute("data-livue-id") && !n.hasAttribute("data-livue-island"))
        return !1;
      n = n.parentElement;
    }
    return !0;
  }
  /**
   * Initialize a root/island component.
   *
   * @param {HTMLElement} el
   */
  _initComponent(e) {
    let n = e.dataset.livueId;
    if (this.components.has(n))
      return;
    let r = new pa(e);
    this.components.set(n, r);
  }
  /**
   * Get a mounted component instance by its ID.
   *
   * @param {string} id
   * @returns {LiVueComponent|undefined}
   */
  getComponent(e) {
    return this.components.get(e);
  }
  /**
   * Find a component by its ID.
   * Alias for getComponent.
   *
   * @param {string} id
   * @returns {LiVueComponent|undefined}
   */
  find(e) {
    return this.components.get(e);
  }
  /**
   * Get the first mounted component on the page.
   *
   * @returns {LiVueComponent|undefined}
   */
  first() {
    let n = this.components.values().next();
    return n.done ? void 0 : n.value;
  }
  /**
   * Get all mounted root/island components.
   *
   * @returns {LiVueComponent[]}
   */
  all() {
    return Array.from(this.components.values());
  }
  /**
   * Get all components matching a specific name.
   * Searches both root components and their children.
   *
   * @param {string} name - Component name (kebab-case)
   * @returns {Array<{ id: string, name: string, state: object, livue: object }>}
   */
  getByName(e) {
    let n = [];
    return this.components.forEach(function(r) {
      r.name === e && n.push({
        id: r.componentId,
        name: r.name,
        state: r.state,
        livue: r._rootLivue
      });
      for (let i in r._childRegistry) {
        let o = r._childRegistry[i];
        o.name === e && n.push({
          id: i,
          name: o.name,
          state: o.state,
          livue: o.livue
        });
      }
    }), n;
  }
  /**
   * Register a hook callback for lifecycle events.
   *
   * Available hooks:
   * - component.init: When a component is initialized
   * - component.destroy: When a component is destroyed
   * - element.init: When each DOM element is initialized
   * - request.started: When an AJAX request starts
   * - request.finished: When an AJAX request completes
   * - template.updating: Before a template is swapped
   * - template.updated: After a template is swapped
   * - error.occurred: When an error occurs
   *
   * @param {string} hookName - The hook to listen for
   * @param {Function} callback - The callback function
   * @returns {Function} Unsubscribe function
   *
   * @example
   * const unsubscribe = LiVue.hook('component.init', ({ component, el, cleanup }) => {
   *     console.log('Component initialized:', component.name);
   *     cleanup(() => console.log('Cleanup'));
   * });
   *
   * @example
   * LiVue.hook('request.started', ({ url, updateCount }) => {
   *     console.log('Request started to', url, 'with', updateCount, 'updates');
   * });
   */
  hook(e, n) {
    return sr(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return ur();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), pr();
  }
  /**
   * Destroy all mounted Vue app instances EXCEPT those with IDs in the preserveIds set.
   * Used during SPA navigation to preserve @persist components.
   *
   * @param {Set<string>} preserveIds - Set of component IDs to preserve
   */
  destroyExcept(e) {
    var n = this, r = [];
    this._preservingIds = e, this.components.forEach(function(i, o) {
      e.has(o) || (i.destroy(), r.push(o));
    }), r.forEach(function(i) {
      n.components.delete(i);
    }), pr();
  }
  /**
   * Start the MutationObserver to watch for DOM changes.
   * Automatically initializes new LiVue components and cleans up removed ones.
   */
  _startObserver() {
    if (this._observer)
      return;
    let e = this;
    this._observer = new MutationObserver(function(n) {
      n.forEach(function(r) {
        r.addedNodes.forEach(function(i) {
          i.nodeType === Node.ELEMENT_NODE && e._processAddedNode(i);
        }), r.removedNodes.forEach(function(i) {
          i.nodeType === Node.ELEMENT_NODE && e._processRemovedNode(i);
        });
      });
    }), this._observer.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
  /**
   * Stop the MutationObserver.
   */
  _stopObserver() {
    this._observer && (this._observer.disconnect(), this._observer = null);
  }
  /**
   * Process a node that was added to the DOM.
   * Finds and initializes any LiVue root components within it.
   * Also detects standalone <livue-lazy> elements and wraps them.
   *
   * @param {HTMLElement} node
   */
  _processAddedNode(e) {
    e.hasAttribute && e.hasAttribute("data-livue-id") && this._isRoot(e) && this._initComponent(e), e.querySelectorAll && e.querySelectorAll("[data-livue-id]").forEach(function(r) {
      this._isRoot(r) && this._initComponent(r);
    }.bind(this)), this._processStandaloneLazy(e);
  }
  /**
   * Find and wrap standalone <livue-lazy> elements.
   * These are lazy components injected outside of any LiVue root.
   *
   * @param {HTMLElement} node
   */
  _processStandaloneLazy(e) {
    let n = [];
    e.tagName && e.tagName.toLowerCase() === "livue-lazy" && this._isStandaloneLazy(e) && n.push(e), e.querySelectorAll && e.querySelectorAll("livue-lazy").forEach(function(i) {
      this._isStandaloneLazy(i) && n.push(i);
    }.bind(this)), n.forEach(function(r) {
      this._wrapStandaloneLazy(r);
    }.bind(this));
  }
  /**
   * Check if a <livue-lazy> element is standalone (not inside a LiVue component).
   *
   * @param {HTMLElement} el
   * @returns {boolean}
   */
  _isStandaloneLazy(e) {
    if (e.dataset.livueLazyWrapped)
      return !1;
    let n = e.parentElement;
    for (; n; ) {
      if (n.hasAttribute("data-livue-id"))
        return !1;
      n = n.parentElement;
    }
    return !0;
  }
  /**
   * Wrap a standalone <livue-lazy> element in a minimal LiVue root component.
   *
   * @param {HTMLElement} el
   */
  _wrapStandaloneLazy(e) {
    e.dataset.livueLazyWrapped = "true";
    let n = document.createElement("div"), r = "livue-lazy-wrapper-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9), i = {
      state: {},
      memo: {
        name: "lazy-wrapper",
        checksum: ""
      }
    };
    n.dataset.livueId = r, n.dataset.livueSnapshot = JSON.stringify(i), e.parentNode.insertBefore(n, e), n.appendChild(e), this._initComponent(n);
  }
  /**
   * Process a node that was removed from the DOM.
   * Cleans up any LiVue components that were destroyed.
   *
   * @param {HTMLElement} node
   */
  _processRemovedNode(e) {
    if (e.hasAttribute && e.hasAttribute("data-livue-id")) {
      let n = e.dataset.livueId;
      this._cleanupComponent(n);
    }
    e.querySelectorAll && e.querySelectorAll("[data-livue-id]").forEach(function(r) {
      let i = r.dataset.livueId;
      this._cleanupComponent(i);
    }.bind(this));
  }
  /**
   * Clean up a component by ID if it exists.
   *
   * @param {string} id
   */
  _cleanupComponent(e) {
    if (this._preservingIds && this._preservingIds.has(e))
      return;
    let n = this.components.get(e);
    n && (n.destroy(), this.components.delete(e));
  }
  /**
   * Set a custom confirmation handler for #[Confirm] methods.
   *
   * The handler receives { message, title, confirmText, cancelText }
   * and must return a Promise<boolean>.
   *
   * Example with SweetAlert2:
   *   LiVue.setConfirmHandler(async (config) => {
   *       const result = await Swal.fire({
   *           title: config.title || 'Confirm',
   *           text: config.message,
   *           showCancelButton: true,
   *           confirmButtonText: config.confirmText,
   *           cancelButtonText: config.cancelText,
   *       });
   *       return result.isConfirmed;
   *   });
   *
   * @param {Function} handler - Async function returning Promise<boolean>
   */
  setConfirmHandler(e) {
    window.LiVue = window.LiVue || {}, window.LiVue.confirmHandler = e;
  }
  /**
   * Get the DevTools API.
   * Returns no-op functions in production to avoid errors.
   *
   * @returns {object} DevTools API
   *
   * @example
   * LiVue.devtools.open();
   * LiVue.devtools.toggle();
   * const components = LiVue.devtools.getComponents();
   */
  get devtools() {
    return {
      init: function() {
      },
      open: function() {
      },
      close: function() {
      },
      toggle: function() {
      },
      isOpen: function() {
        return !1;
      },
      getComponents: function() {
        return [];
      },
      getTimeline: function() {
        return [];
      },
      getEvents: function() {
        return [];
      },
      getPerf: function() {
        return {};
      },
      clearTimeline: function() {
      },
      clearEvents: function() {
      },
      clear: function() {
      },
      logEvent: function() {
      },
      isInitialized: function() {
        return !1;
      },
      startCollecting: function() {
      },
      stopCollecting: function() {
      },
      isCollecting: function() {
        return !1;
      }
    };
  }
  /**
   * Get the HMR (Hot Module Replacement) API.
   *
   * @returns {object} HMR API
   *
   * @example
   * if (LiVue.hmr.isAvailable()) {
   *     LiVue.hmr.onUpdate((data) => console.log('Updated:', data.fileName));
   * }
   */
  get hmr() {
    return {
      isAvailable: Ul,
      isEnabled: Yl,
      enable: Jl,
      disable: Xl,
      configure: Gl,
      onUpdate: Kl,
      trigger: Ql
    };
  }
  /**
   * Enable or disable debug mode.
   * When enabled, logs all hook events to the console.
   *
   * @param {boolean} enabled - Whether to enable debug mode
   *
   * @example
   * LiVue.debug(true);  // Enable verbose logging
   * LiVue.debug(false); // Disable logging
   */
  debug(e) {
    if (e && !Fe) {
      Fe = !0, console.log("[LiVue] Debug mode enabled");
      var n = ur();
      n.forEach(function(r) {
        var i = sr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        Nn.push(i);
      });
    } else !e && Fe && (Fe = !1, console.log("[LiVue] Debug mode disabled"), Nn.forEach(function(r) {
      r();
    }), Nn = []);
    return Fe;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return Fe;
  }
}
const or = new Zl();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = Gi, document.head.appendChild(t);
}
var de = window.LiVueConfig || {};
(de.showProgressBar !== void 0 || de.progressBarColor !== void 0 || de.prefetch !== void 0 || de.prefetchOnHover !== void 0 || de.hoverDelay !== void 0 || de.cachePages !== void 0 || de.maxCacheSize !== void 0 || de.restoreScroll !== void 0) && or.configureNavigation(de);
function Gr() {
  or.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Gr) : queueMicrotask(Gr);
window.LiVue = or;
export {
  or as default
};
//# sourceMappingURL=livue.esm.js.map
