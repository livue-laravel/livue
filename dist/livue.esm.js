import { reactive as ze, toRefs as Po, effectScope as Ro, ref as _n, markRaw as zo, defineComponent as qo, shallowRef as xr, onMounted as Cr, onUnmounted as Tr, h as zi, inject as Vo, provide as Ho, nextTick as yi, onBeforeUnmount as jo, onBeforeMount as Fo, readonly as Bo, watchEffect as $o, watch as at, computed as Wo, createApp as Uo } from "vue";
const Jo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let Be = null;
function In() {
  if (Be)
    return Be;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return Be = t.getAttribute("content"), Be;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (Be = decodeURIComponent(e[1]), Be) : null;
}
function Xo() {
  Be = null;
}
let J = {
  color: "#29d",
  height: "2px",
  showSpinner: !0,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, K = null, ii = null, ie = null, Ee = null, bn = !1, St = 0;
function Yo(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function Go(t) {
  return (-1 + t) * 100;
}
function Nr() {
  if (bn) return;
  bn = !0;
  let t = document.createElement("style");
  t.id = "livue-progress-styles", t.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${J.height};
            background: ${J.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${J.speed}ms ${J.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${J.color}, 0 0 5px ${J.color};
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
            border-top-color: ${J.color};
            border-left-color: ${J.color};
            border-radius: 50%;
            animation: livue-spinner 400ms linear infinite;
        }
        .livue-progress-bar.livue-progress-hidden,
        .livue-progress-spinner.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${J.speed}ms ${J.easing};
        }
        @keyframes livue-spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, document.head.appendChild(t);
}
function Ko() {
  if (ie) return;
  Nr(), ie = document.createElement("div"), ie.className = "livue-progress-bar livue-progress-hidden", ie.innerHTML = '<div class="livue-progress-peg"></div>', J.showSpinner && (Ee = document.createElement("div"), Ee.className = "livue-progress-spinner livue-progress-hidden", Ee.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(J.parent) || document.body;
  t.appendChild(ie), Ee && t.appendChild(Ee);
}
function Qo() {
  if (!bn) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), bn = !1, Nr());
}
function Zo(t) {
  Object.assign(J, t), Qo();
}
function ea() {
  St++, K === null && (Ko(), K = 0, ie && ie.classList.remove("livue-progress-hidden"), Ee && Ee.classList.remove("livue-progress-hidden"), Mn(J.minimum), J.trickle && (ii = setInterval(function() {
    Lr();
  }, J.trickleSpeed)));
}
function Mn(t) {
  K !== null && (t = Yo(t, J.minimum, 1), K = t, ie && (ie.style.transform = "translate3d(" + Go(t) + "%, 0, 0)"));
}
function Lr() {
  if (K === null || K >= 1) return;
  let t;
  K < 0.2 ? t = 0.1 : K < 0.5 ? t = 0.04 : K < 0.8 ? t = 0.02 : K < 0.99 ? t = 5e-3 : t = 0, Mn(K + t);
}
function Ar() {
  St = Math.max(0, St - 1), !(St > 0) && K !== null && (Mn(1), clearInterval(ii), ii = null, setTimeout(function() {
    ie && ie.classList.add("livue-progress-hidden"), Ee && Ee.classList.add("livue-progress-hidden"), setTimeout(function() {
      K = null, ie && (ie.style.transform = "translate3d(-100%, 0, 0)");
    }, J.speed);
  }, J.speed));
}
function ta() {
  St = 0, Ar();
}
function na() {
  return K !== null;
}
function ia() {
  return K;
}
const Ve = {
  configure: Zo,
  start: ea,
  set: Mn,
  trickle: Lr,
  done: Ar,
  forceDone: ta,
  isStarted: na,
  getStatus: ia
};
var on = null, qi = !1, rt = !1, oe = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Se = /* @__PURE__ */ new Map(), We = /* @__PURE__ */ new Map(), ri = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new Map(), Pe = null;
function ra(t) {
  Object.assign(oe, t), t.progressBarColor && Ve.configure({ color: t.progressBarColor });
}
function oa(t) {
  on = t, !qi && (qi = !0, Pe = kr(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Pe },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (Dr(Pe), Pe = e.state.pageKey, Ht(e.state.url, !1, !0));
  }), la());
}
function kr() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function Dr(t) {
  if (!(!oe.restoreScroll || !t)) {
    an.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var i = n.dataset.livueScroll || n.id;
      if (i) {
        var r = an.get(t) || {};
        r["el:" + i] = { x: n.scrollLeft, y: n.scrollTop }, an.set(t, r);
      }
    });
  }
}
function aa(t) {
  if (!(!oe.restoreScroll || !t)) {
    var e = an.get(t);
    e && requestAnimationFrame(function() {
      window.scrollTo(e.x || 0, e.y || 0), Object.keys(e).forEach(function(n) {
        if (n.startsWith("el:")) {
          var i = n.substring(3), r = document.querySelector('[data-livue-scroll="' + i + '"]') || document.getElementById(i);
          r && (r.scrollLeft = e[n].x || 0, r.scrollTop = e[n].y || 0);
        }
      });
    });
  }
}
function la() {
  oe.prefetch && (document.addEventListener("mouseenter", ua, !0), document.addEventListener("mouseleave", da, !0), document.addEventListener("mousedown", ca, !0), document.addEventListener("focus", fa, !0));
}
function sa(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function ua(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !oe.prefetchOnHover)) {
      var n = sa(e);
      if (n === "hover") {
        var i = e.getAttribute("href");
        if (!(!i || i.startsWith("#") || i.startsWith("javascript:"))) {
          var r = setTimeout(function() {
            On(i);
          }, oe.hoverDelay);
          ri.set(e, r);
        }
      }
    }
  }
}
function da(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = ri.get(e);
      n && (clearTimeout(n), ri.delete(e));
    }
  }
}
function ca(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || On(n);
    }
  }
}
function fa(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !oe.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || On(n);
    }
  }
}
function On(t) {
  var e = new URL(t, location.origin).href;
  if (We.has(e))
    return We.get(e);
  if (Se.has(e))
    return Promise.resolve(Se.get(e).html);
  var n = fetch(e, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(i) {
    return We.delete(e), i.ok ? i.text().then(function(r) {
      return oe.cachePages && Ir(e, r), r;
    }) : null;
  }).catch(function(i) {
    return We.delete(e), console.warn("[LiVue] Prefetch failed:", i), null;
  });
  return We.set(e, n), n;
}
function Ir(t, e) {
  for (var n = new DOMParser(), i = n.parseFromString(e, "text/html"), r = i.querySelector("title"); Se.size >= oe.maxCacheSize; ) {
    var o = Se.keys().next().value;
    Se.delete(o);
  }
  Se.set(t, {
    html: e,
    title: r ? r.textContent : "",
    timestamp: Date.now()
  });
}
function pa() {
  Se.clear();
}
function wi(t) {
  rt || !t || !t.url || (t.navigate ? Ht(t.url, !0, !1) : (rt = !0, window.location.href = t.url));
}
async function Ht(t, e, n) {
  if (!rt) {
    if (!on) {
      window.location.href = t;
      return;
    }
    var i = new URL(t, location.origin).href, r = new CustomEvent("livue:navigate", {
      detail: {
        url: i,
        cached: Se.has(i),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(r)) {
      rt = !0, n || Dr(Pe), oe.showProgressBar && Ve.start();
      try {
        var o, a = Se.get(i);
        if (a)
          o = a.html;
        else if (We.has(i))
          o = await We.get(i);
        else {
          var l = await fetch(i, {
            method: "GET",
            headers: {
              Accept: "text/html",
              "X-LiVue-Navigate": "1"
            },
            credentials: "same-origin"
          });
          if (!l.ok)
            throw new Error("HTTP " + l.status);
          o = await l.text(), oe.cachePages && Ir(i, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), c = new CustomEvent("livue:navigating", {
          detail: {
            url: i,
            doc: u,
            onSwap: function(v) {
              typeof v == "function" && v(u);
            }
          }
        });
        window.dispatchEvent(c);
        var d = va();
        on.destroy();
        var m = u.querySelector("title");
        m && (document.title = m.textContent), document.body.innerHTML = u.body.innerHTML, ma(d);
        var h = u.querySelector('meta[name="csrf-token"]'), p = document.querySelector('meta[name="csrf-token"]');
        if (h && p && (p.setAttribute("content", h.getAttribute("content")), Xo()), ha(u), ga(u), e && (Pe = kr(), history.pushState(
          { livueNavigate: !0, url: i, pageKey: Pe },
          "",
          i
        )), on.reboot(), n)
          aa(Pe);
        else if (location.hash) {
          var g = document.querySelector(location.hash);
          g ? g.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: i }
        }));
      } catch (v) {
        console.error("[LiVue] Navigation failed:", v), window.location.href = t;
      } finally {
        rt = !1, oe.showProgressBar && Ve.done();
      }
    }
  }
}
function va() {
  var t = /* @__PURE__ */ new Map(), e = document.querySelectorAll("[data-livue-persist]");
  return e.forEach(function(n) {
    var i = n.dataset.livuePersist;
    i && (n.cloneNode(!0), t.set(i, n));
  }), t;
}
function ma(t) {
  t.size !== 0 && t.forEach(function(e, n) {
    var i = document.querySelector('[data-livue-persist="' + n + '"]');
    i && i.parentNode.replaceChild(e, i);
  });
}
function ha(t) {
  var e = document.querySelectorAll("script[data-navigate-track]"), n = t.querySelectorAll("script[data-navigate-track]"), i = {};
  e.forEach(function(o) {
    var a = o.getAttribute("src");
    a && (i[a.split("?")[0]] = a);
  });
  var r = !1;
  n.forEach(function(o) {
    var a = o.getAttribute("src");
    if (a) {
      var l = a.split("?")[0];
      i[l] && i[l] !== a && (r = !0);
    }
  }), r && window.location.reload();
}
function ga(t) {
  var e = document.body.querySelectorAll("script");
  e.forEach(function(n) {
    if (n.hasAttribute("data-navigate-once")) {
      if (n.dataset.navigateRan)
        return;
      n.dataset.navigateRan = "true";
    }
    if (n.type !== "application/livue-setup") {
      var i = document.createElement("script");
      Array.from(n.attributes).forEach(function(r) {
        i.setAttribute(r.name, r.value);
      }), n.src || (i.textContent = n.textContent), n.parentNode.replaceChild(i, n);
    }
  });
}
function _a() {
  return rt;
}
var Ze = /* @__PURE__ */ new Map(), ba = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function be(t, e) {
  return typeof t != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", t), function() {
  }) : typeof e != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (Ze.has(t) || Ze.set(t, /* @__PURE__ */ new Set()), Ze.get(t).add(e), function() {
    var n = Ze.get(t);
    n && (n.delete(e), n.size === 0 && Ze.delete(t));
  });
}
function ue(t, e) {
  var n = Ze.get(t);
  !n || n.size === 0 || n.forEach(function(i) {
    try {
      i(e);
    } catch (r) {
      console.error('[LiVue Hooks] Error in "' + t + '" callback:', r);
    }
  });
}
function Mr() {
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
function Vi() {
  return ba.slice();
}
var oi = [], ai = [], Pt = !1;
function ya(t) {
  return t.isolate ? Ea(t) : new Promise(function(e, n) {
    oi.push({
      payload: t,
      resolve: e,
      reject: n
    }), Pt || (Pt = !0, queueMicrotask(Or));
  });
}
function wa(t) {
  return new Promise(function(e, n) {
    ai.push({
      payload: t,
      resolve: e,
      reject: n
    }), Pt || (Pt = !0, queueMicrotask(Or));
  });
}
async function Or() {
  var t = oi, e = ai;
  if (oi = [], ai = [], Pt = !1, !(t.length === 0 && e.length === 0)) {
    Ve.start();
    var n = Pr(), i = In(), r = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    i && (r["X-CSRF-TOKEN"] = i);
    var o = t.map(function(v) {
      return v.payload;
    }), a = e.map(function(v) {
      return v.payload;
    }), l = {};
    o.length > 0 && (l.updates = o), a.length > 0 && (l.lazyLoads = a), ue("request.started", {
      url: n,
      updates: o,
      lazyLoads: a,
      updateCount: t.length,
      lazyCount: e.length
    });
    try {
      var s = await fetch(n, {
        method: "POST",
        headers: r,
        body: JSON.stringify(l),
        credentials: "same-origin"
      }), u = await s.json();
      if (!s.ok) {
        var c = new Error(u.error || "Request failed");
        c.status = s.status, c.data = u;
        for (var d = 0; d < t.length; d++)
          t[d].reject(c);
        for (var d = 0; d < e.length; d++)
          e[d].reject(c);
        return;
      }
      for (var m = u.responses || [], h = u.lazyResponses || [], d = 0; d < m.length; d++)
        if (m[d] && m[d].redirect) {
          wi(m[d].redirect);
          return;
        }
      for (var d = 0; d < t.length; d++) {
        var p = m[d];
        if (!p) {
          t[d].reject(new Error("No response for component update at index " + d));
          continue;
        }
        if (p.error) {
          var g = new Error(p.error);
          g.status = p.status || 500, g.data = p, t[d].reject(g);
        } else if (p.errors) {
          var g = new Error("Validation failed");
          g.status = 422, g.data = p, t[d].reject(g);
        } else
          t[d].resolve(p);
      }
      for (var d = 0; d < e.length; d++) {
        var p = h[d];
        if (!p) {
          e[d].reject(new Error("No response for lazy load at index " + d));
          continue;
        }
        if (p.error) {
          var g = new Error(p.error);
          g.status = p.status || 500, g.data = p, e[d].reject(g);
        } else
          e[d].resolve(p);
      }
      ue("request.finished", {
        url: n,
        success: !0,
        responses: m,
        lazyResponses: h,
        updateCount: t.length,
        lazyCount: e.length
      });
    } catch (v) {
      for (var d = 0; d < t.length; d++)
        t[d].reject(v);
      for (var d = 0; d < e.length; d++)
        e[d].reject(v);
      ue("request.finished", {
        url: n,
        success: !1,
        error: v,
        updateCount: t.length,
        lazyCount: e.length
      });
    } finally {
      Ve.done();
    }
  }
}
async function Ea(t) {
  Ve.start();
  var e = Pr(), n = In(), i = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  n && (i["X-CSRF-TOKEN"] = n);
  var r = {
    snapshot: t.snapshot,
    diffs: t.diffs,
    method: t.method,
    params: t.params
  };
  try {
    var o = await fetch(e, {
      method: "POST",
      headers: i,
      body: JSON.stringify({ updates: [r] }),
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
      return wi(s.redirect), new Promise(function() {
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
    Ve.done();
  }
}
function Pr() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function Hi(t, e, n, i, r) {
  return ya({
    snapshot: t,
    diffs: i || {},
    method: e,
    params: n || [],
    isolate: r || !1
  });
}
function li(t) {
  return ze(Object.assign({}, t));
}
function Sa(t, e) {
  let n;
  for (n in e)
    t[n] = e[n];
  for (n in t)
    n in e || delete t[n];
}
function Rr(t) {
  return JSON.parse(JSON.stringify(t));
}
function xa(t) {
  return Po(t);
}
let si = null, zr = /* @__PURE__ */ new Map();
function Ca() {
  return ze({});
}
function we(t, e) {
  ui(t);
  for (let n in e)
    t[n] = e[n];
}
function ui(t) {
  for (let e in t)
    delete t[e];
}
function Ta(t) {
  si = t;
}
function ft(t, e, n, i) {
  i = i || {};
  let r = !1;
  return ue("error.occurred", {
    error: t,
    componentName: e,
    componentId: n,
    context: i,
    preventDefault: function() {
      r = !0;
    }
  }), r ? !0 : (si ? si(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function Na(t, e) {
  typeof e == "function" && zr.set(t, e);
}
function di(t) {
  zr.delete(t);
}
var Ie = null, La = "livue-devtools-styles", Aa = `
/* DevTools Container - Base */
.livue-devtools {
    position: fixed;
    background: #1e1e1e;
    color: #d4d4d4;
    font-family: 'SF Mono', Monaco, 'Cascadia Code', Consolas, monospace;
    font-size: 12px;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

/* Position: Right (default) */
.livue-devtools--right {
    top: 0;
    right: 0;
    width: 650px;
    height: 100vh;
    border-left: 2px solid #007acc;
    resize: horizontal;
}

.livue-devtools--right.livue-devtools--minimized {
    width: 36px;
    min-width: 36px;
    resize: none;
}

/* Position: Left */
.livue-devtools--left {
    top: 0;
    left: 0;
    width: 650px;
    height: 100vh;
    border-right: 2px solid #007acc;
    resize: horizontal;
}

.livue-devtools--left.livue-devtools--minimized {
    width: 36px;
    min-width: 36px;
    resize: none;
}

/* Position: Bottom */
.livue-devtools--bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 350px;
    border-top: 2px solid #007acc;
    resize: vertical;
}

.livue-devtools--bottom.livue-devtools--minimized {
    height: 36px;
    min-height: 36px;
    resize: none;
}

/* Position: Top */
.livue-devtools--top {
    top: 0;
    left: 0;
    width: 100%;
    height: 350px;
    border-bottom: 2px solid #007acc;
    resize: vertical;
}

.livue-devtools--top.livue-devtools--minimized {
    height: 36px;
    min-height: 36px;
    resize: none;
}

/* Minimized state for vertical panels (left/right) */
.livue-devtools--right.livue-devtools--minimized .livue-devtools__header,
.livue-devtools--left.livue-devtools--minimized .livue-devtools__header {
    flex-direction: column;
    padding: 8px 4px;
}

.livue-devtools--right.livue-devtools--minimized .livue-devtools__title,
.livue-devtools--left.livue-devtools--minimized .livue-devtools__title {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    font-size: 11px;
    margin-top: 8px;
}

.livue-devtools--right.livue-devtools--minimized .livue-devtools__title-icon,
.livue-devtools--left.livue-devtools--minimized .livue-devtools__title-icon {
    display: none;
}

.livue-devtools--right.livue-devtools--minimized .livue-devtools__actions,
.livue-devtools--left.livue-devtools--minimized .livue-devtools__actions {
    flex-direction: column;
}

/* Minimized state - hide content */
.livue-devtools.livue-devtools--minimized .livue-devtools__tabs,
.livue-devtools.livue-devtools--minimized .livue-devtools__content {
    display: none;
}

/* Header */
.livue-devtools__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    background: #252526;
    border-bottom: 1px solid #333;
    flex-shrink: 0;
}

.livue-devtools__title {
    font-weight: 600;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
}

.livue-devtools__title-icon {
    color: #007acc;
}

.livue-devtools__actions {
    display: flex;
    gap: 4px;
}

.livue-devtools__btn {
    background: transparent;
    border: none;
    color: #858585;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 12px;
    border-radius: 3px;
}

.livue-devtools__btn:hover {
    background: #3c3c3c;
    color: #fff;
}

/* Tabs */
.livue-devtools__tabs {
    display: flex;
    background: #2d2d2d;
    border-bottom: 1px solid #333;
    flex-shrink: 0;
}

.livue-devtools__tab {
    padding: 8px 16px;
    background: transparent;
    border: none;
    color: #858585;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    border-bottom: 2px solid transparent;
}

.livue-devtools__tab:hover {
    color: #d4d4d4;
    background: #333;
}

.livue-devtools__tab--active {
    color: #fff;
    border-bottom-color: #007acc;
}

/* Content */
.livue-devtools__content {
    flex: 1;
    overflow: auto;
    padding: 0;
}

.livue-devtools__panel {
    display: none;
    height: 100%;
}

.livue-devtools__panel--active {
    display: flex;
}

/* Components Tab */
.livue-devtools__panel--active.livue-devtools__components {
    display: flex;
    width: 100%;
}

.livue-devtools__tree {
    width: 50%;
    border-right: 1px solid #333;
    overflow: auto;
    padding: 8px;
}

.livue-devtools__state {
    width: 50%;
    overflow: auto;
    padding: 8px;
}

/* Tree Node */
.livue-devtools__node {
    padding: 2px 0;
    user-select: none;
}

.livue-devtools__node-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 6px;
    cursor: pointer;
    border-radius: 3px;
}

.livue-devtools__node-header:hover {
    background: #2a2d2e;
}

.livue-devtools__node-header--selected {
    background: #094771;
}

.livue-devtools__node-toggle {
    width: 12px;
    color: #858585;
    font-size: 10px;
}

.livue-devtools__node-icon {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
}

.livue-devtools__node-icon--root {
    color: #4ec9b0;
}

.livue-devtools__node-icon--child {
    color: #9cdcfe;
}

.livue-devtools__node-icon--island {
    color: #ce9178;
}

.livue-devtools__node-name {
    color: #4ec9b0;
}

.livue-devtools__node-id {
    color: #6a9955;
    margin-left: 6px;
    font-size: 10px;
}

.livue-devtools__node-badges {
    display: flex;
    gap: 4px;
    margin-left: auto;
}

.livue-devtools__badge {
    padding: 1px 4px;
    border-radius: 2px;
    font-size: 9px;
    font-weight: 600;
}

.livue-devtools__badge--loading {
    background: #264f78;
    color: #9cdcfe;
}

.livue-devtools__badge--dirty {
    background: #4d3a12;
    color: #dcdcaa;
}

.livue-devtools__badge--error {
    background: #5a1d1d;
    color: #f48771;
}

.livue-devtools__node-children {
    margin-left: 16px;
}

/* State Inspector */
.livue-devtools__state-empty {
    color: #858585;
    text-align: center;
    padding: 20px;
}

.livue-devtools__state-title {
    color: #4ec9b0;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid #333;
}

.livue-devtools__prop {
    padding: 3px 0;
    display: flex;
    align-items: flex-start;
    gap: 6px;
}

.livue-devtools__prop-key {
    color: #9cdcfe;
}

.livue-devtools__prop-key--dirty::after {
    content: '*';
    color: #dcdcaa;
    margin-left: 2px;
}

.livue-devtools__prop-colon {
    color: #858585;
}

.livue-devtools__prop-value {
    color: #ce9178;
    word-break: break-all;
}

.livue-devtools__prop-value--string {
    color: #ce9178;
}

.livue-devtools__prop-value--number {
    color: #b5cea8;
}

.livue-devtools__prop-value--boolean {
    color: #569cd6;
}

.livue-devtools__prop-value--null {
    color: #569cd6;
    font-style: italic;
}

.livue-devtools__prop-value--object {
    color: #d4d4d4;
}

.livue-devtools__prop-value--array {
    color: #d4d4d4;
}

.livue-devtools__object {
    margin-left: 12px;
}

.livue-devtools__object-toggle {
    cursor: pointer;
    color: #858585;
}

.livue-devtools__object-toggle:hover {
    color: #d4d4d4;
}

/* Timeline Tab */
.livue-devtools__panel--active.livue-devtools__timeline {
    flex-direction: column;
    width: 100%;
}

.livue-devtools__timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #333;
}

.livue-devtools__timeline-title {
    color: #fff;
    font-weight: 600;
}

.livue-devtools__timeline-list {
    flex: 1;
    overflow: auto;
}

.livue-devtools__request {
    border-bottom: 1px solid #333;
}

.livue-devtools__request-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    cursor: pointer;
}

.livue-devtools__request-header:hover {
    background: #2a2d2e;
}

.livue-devtools__request-toggle {
    color: #858585;
    width: 12px;
}

.livue-devtools__request-method {
    color: #dcdcaa;
    font-weight: 600;
}

.livue-devtools__request-url {
    color: #9cdcfe;
    flex: 1;
}

.livue-devtools__request-status {
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 600;
}

.livue-devtools__request-status--success {
    background: #2d4a2d;
    color: #6a9955;
}

.livue-devtools__request-status--error {
    background: #5a1d1d;
    color: #f48771;
}

.livue-devtools__request-status--pending {
    background: #264f78;
    color: #9cdcfe;
}

.livue-devtools__request-duration {
    font-size: 11px;
}

.livue-devtools__request-duration--fast {
    color: #6a9955;
}

.livue-devtools__request-duration--medium {
    color: #dcdcaa;
}

.livue-devtools__request-duration--slow {
    color: #f48771;
}

.livue-devtools__request-time {
    color: #858585;
    font-size: 10px;
}

.livue-devtools__request-details {
    display: none;
    padding: 8px 8px 8px 28px;
    background: #252526;
    font-size: 11px;
}

.livue-devtools__request--expanded .livue-devtools__request-details {
    display: block;
}

.livue-devtools__request-section {
    margin-bottom: 8px;
}

.livue-devtools__request-section-title {
    color: #858585;
    font-weight: 600;
    margin-bottom: 4px;
}

.livue-devtools__request-json {
    background: #1e1e1e;
    padding: 6px;
    border-radius: 3px;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 150px;
    overflow-y: auto;
}

/* Events Tab */
.livue-devtools__panel--active.livue-devtools__events {
    flex-direction: column;
    width: 100%;
}

.livue-devtools__events-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #333;
    gap: 8px;
}

.livue-devtools__events-filter {
    flex: 1;
    background: #3c3c3c;
    border: 1px solid #333;
    color: #d4d4d4;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 12px;
    font-family: inherit;
}

.livue-devtools__events-filter:focus {
    outline: none;
    border-color: #007acc;
}

.livue-devtools__events-list {
    flex: 1;
    overflow: auto;
}

.livue-devtools__event {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px 8px;
    border-bottom: 1px solid #333;
}

.livue-devtools__event:hover {
    background: #2a2d2e;
}

.livue-devtools__event-time {
    color: #858585;
    font-size: 10px;
    flex-shrink: 0;
    width: 60px;
}

.livue-devtools__event-name {
    color: #dcdcaa;
    font-weight: 600;
    flex-shrink: 0;
}

.livue-devtools__event-source {
    color: #4ec9b0;
    font-size: 11px;
}

.livue-devtools__event-data {
    color: #858585;
    font-size: 11px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Stores Tab */
.livue-devtools__panel--active.livue-devtools__stores {
    flex-direction: column;
    width: 100%;
    padding: 8px;
    overflow: auto;
}

/* Echo Tab */
.livue-devtools__panel--active.livue-devtools__echo {
    flex-direction: column;
    width: 100%;
    padding: 8px;
    overflow: auto;
}

/* Performance Tab */
.livue-devtools__panel--active.livue-devtools__perf {
    flex-direction: column;
    width: 100%;
    padding: 8px;
}

.livue-devtools__perf-section {
    margin-bottom: 16px;
}

.livue-devtools__perf-title {
    color: #fff;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid #333;
}

.livue-devtools__perf-stat {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
}

.livue-devtools__perf-label {
    color: #858585;
}

.livue-devtools__perf-value {
    color: #d4d4d4;
    font-weight: 600;
}

.livue-devtools__perf-value--good {
    color: #6a9955;
}

.livue-devtools__perf-value--warn {
    color: #dcdcaa;
}

.livue-devtools__perf-value--bad {
    color: #f48771;
}

/* Empty State */
.livue-devtools__empty {
    color: #858585;
    text-align: center;
    padding: 40px 20px;
}

.livue-devtools__empty-icon {
    font-size: 24px;
    margin-bottom: 8px;
    opacity: 0.5;
}

/* Settings Tab */
.livue-devtools__panel--active.livue-devtools__settings {
    flex-direction: column;
    width: 100%;
    padding: 8px;
    overflow: auto;
}

.livue-devtools__settings-group {
    margin-bottom: 16px;
}

.livue-devtools__settings-label {
    color: #fff;
    font-weight: 600;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid #333;
}

.livue-devtools__settings-options {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.livue-devtools__settings-btn {
    padding: 8px 16px;
    background: #3c3c3c;
    border: 1px solid #555;
    color: #d4d4d4;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.15s ease;
}

.livue-devtools__settings-btn:hover {
    background: #4a4a4a;
    border-color: #666;
}

.livue-devtools__settings-btn--active {
    background: #094771;
    border-color: #007acc;
    color: #fff;
}

.livue-devtools__settings-btn-icon {
    font-size: 14px;
}

/* Scrollbar */
.livue-devtools ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.livue-devtools ::-webkit-scrollbar-track {
    background: #1e1e1e;
}

.livue-devtools ::-webkit-scrollbar-thumb {
    background: #424242;
    border-radius: 4px;
}

.livue-devtools ::-webkit-scrollbar-thumb:hover {
    background: #4f4f4f;
}
`;
function ka() {
  Ie || (Ie = document.createElement("style"), Ie.id = La, Ie.textContent = Aa, document.head.appendChild(Ie));
}
function Da() {
  Ie && (Ie.remove(), Ie = null);
}
var Ei = [];
function j(t, e, n) {
  Ei.push({
    name: t,
    directive: e
  });
}
function Ia() {
  return Ei;
}
function Ma() {
  return {
    plugins: [],
    stores: [],
    components: [],
    directives: Ei.map(function(t) {
      return { name: t.name, filters: null };
    })
  };
}
const Ce = /* @__PURE__ */ new Map(), Ne = /* @__PURE__ */ new Map();
let ji = !1;
function Xe() {
  return typeof window < "u" && window.Echo;
}
function Oa(t, e) {
  if (!Xe())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = e + ":" + t;
  if (Ce.has(n))
    return Ce.get(n);
  let i;
  switch (e) {
    case "private":
      i = window.Echo.private(t);
      break;
    case "presence":
      i = window.Echo.join(t);
      break;
    default:
      i = window.Echo.channel(t);
      break;
  }
  return Ce.set(n, i), i;
}
function qr(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!Xe())
    return ji || (ji = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const i = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r], { channel: a, type: l, event: s, method: u, isPresenceEvent: c, isCustomEvent: d } = o, m = Oa(a, l);
    if (!m) continue;
    const h = l + ":" + a + ":" + s + ":" + t;
    if (Ne.has(h)) {
      i.push(h);
      continue;
    }
    const p = function(g) {
      try {
        n(u, g);
      } catch (v) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', v);
      }
    };
    if (l === "presence" && c)
      Pa(m, s, p);
    else {
      const g = d ? "." + s : s;
      m.listen(g, p);
    }
    Ne.set(h, {
      channel: m,
      channelKey: l + ":" + a,
      event: s,
      handler: p,
      isPresenceEvent: c,
      isCustomEvent: d
    }), i.push(h);
  }
  return function() {
    for (let r = 0; r < i.length; r++)
      Vr(i[r]);
  };
}
function Pa(t, e, n) {
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
function Vr(t) {
  const e = Ne.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    Ne.delete(t), Ra(e.channelKey);
  }
}
function Fi(t) {
  const e = ":" + t, n = [];
  Ne.forEach(function(i, r) {
    r.endsWith(e) && n.push(r);
  });
  for (let i = 0; i < n.length; i++)
    Vr(n[i]);
}
function Ra(t) {
  let e = !1;
  if (Ne.forEach(function(i) {
    i.channelKey === t && (e = !0);
  }), e) return;
  if (Ce.get(t) && Xe()) {
    const i = t.split(":"), r = i[0], o = i.slice(1).join(":");
    try {
      r === "presence" ? window.Echo.leave(o) : r === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Ce.delete(t);
}
function za() {
  Ne.clear(), Ce.forEach(function(t, e) {
    if (Xe()) {
      const n = e.split(":"), i = n[0], r = n.slice(1).join(":");
      try {
        i === "presence" ? window.Echo.leave(r) : i === "private" ? window.Echo.leaveChannel("private-" + r) : window.Echo.leaveChannel(r);
      } catch {
      }
    }
  }), Ce.clear();
}
function qa() {
  return {
    echoAvailable: Xe(),
    channels: Array.from(Ce.keys()),
    subscriptions: Array.from(Ne.keys())
  };
}
function Va() {
  var t = [], e = [];
  return Ce.forEach(function(n, i) {
    var r = i.split(":");
    t.push({
      key: i,
      type: r[0],
      name: r.slice(1).join(":")
    });
  }), Ne.forEach(function(n, i) {
    var r = i.split(":");
    e.push({
      key: i,
      channelType: r[0],
      channelName: r[1],
      event: r[2],
      componentId: r[3],
      isPresenceEvent: n.isPresenceEvent,
      isCustomEvent: n.isCustomEvent
    });
  }), {
    available: Xe(),
    channels: t,
    subscriptions: e
  };
}
var Ha = 100, ja = 200, Fa = 50, k = {
  /** @type {Map<string, object>} Component ID -> component info */
  components: /* @__PURE__ */ new Map(),
  /** @type {Array<object>} Request history */
  requests: [],
  /** @type {Map<string, object>} Pending requests by ID */
  pendingRequests: /* @__PURE__ */ new Map(),
  /** @type {Array<object>} Event history */
  events: [],
  /** @type {Array<object>} Error history */
  errors: [],
  /** @type {object} Performance metrics */
  perf: {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalRequestTime: 0,
    avgRequestTime: 0,
    minRequestTime: 1 / 0,
    maxRequestTime: 0,
    totalTemplateSwaps: 0,
    totalTemplateSwapTime: 0,
    avgTemplateSwapTime: 0
  },
  /** @type {Map<string, number>} Pending template swaps start times */
  pendingSwaps: /* @__PURE__ */ new Map()
}, ye = [], lt = !1, ci = /* @__PURE__ */ new Set();
function de() {
  ci.forEach(function(t) {
    try {
      t();
    } catch (e) {
      console.error("[LiVue DevTools] Listener error:", e);
    }
  });
}
var Ba = 0;
function $a() {
  return "req-" + ++Ba + "-" + Date.now();
}
function Wa(t) {
  var e = new Date(t), n = e.getHours().toString().padStart(2, "0"), i = e.getMinutes().toString().padStart(2, "0"), r = e.getSeconds().toString().padStart(2, "0"), o = e.getMilliseconds().toString().padStart(3, "0");
  return n + ":" + i + ":" + r + "." + o;
}
function Hr() {
  lt || (lt = !0, ye.push(be("component.init", function(t) {
    var e = t.component;
    k.components.set(e.id, {
      id: e.id,
      name: e.name,
      isChild: t.isChild,
      isIsland: t.el && t.el.hasAttribute("data-livue-island"),
      initTime: Date.now(),
      state: e.state,
      livue: e.livue,
      el: t.el
    }), de();
  })), ye.push(be("component.destroy", function(t) {
    var e = t.component;
    k.components.delete(e.id), de();
  })), ye.push(be("request.started", function(t) {
    var e = $a(), n = {
      id: e,
      url: t.url,
      startTime: Date.now(),
      endTime: null,
      duration: null,
      status: "pending",
      updateCount: t.updateCount || 0,
      lazyCount: t.lazyCount || 0,
      updates: t.updates || [],
      lazyLoads: t.lazyLoads || [],
      responses: null,
      error: null
    };
    k.pendingRequests.set(t.url + "-" + e, n), k.requests.unshift(n), k.requests.length > Ha && k.requests.pop(), k.perf.totalRequests++, de();
  })), ye.push(be("request.finished", function(t) {
    var e = null;
    if (k.pendingRequests.forEach(function(i, r) {
      !e && i.url === t.url && i.status === "pending" && (e = { req: i, key: r });
    }), e) {
      var n = e.req;
      n.endTime = Date.now(), n.duration = n.endTime - n.startTime, n.status = t.success ? "success" : "error", n.responses = t.responses, n.lazyResponses = t.lazyResponses, n.error = t.error, k.pendingRequests.delete(e.key), t.success ? k.perf.successfulRequests++ : k.perf.failedRequests++, k.perf.totalRequestTime += n.duration, k.perf.avgRequestTime = k.perf.totalRequestTime / k.perf.totalRequests, n.duration < k.perf.minRequestTime && (k.perf.minRequestTime = n.duration), n.duration > k.perf.maxRequestTime && (k.perf.maxRequestTime = n.duration), de();
    }
  })), ye.push(be("template.updating", function(t) {
    var e = t.component;
    k.pendingSwaps.set(e.id, Date.now());
  })), ye.push(be("template.updated", function(t) {
    var e = t.component, n = k.pendingSwaps.get(e.id);
    if (n) {
      var i = Date.now() - n;
      k.pendingSwaps.delete(e.id), k.perf.totalTemplateSwaps++, k.perf.totalTemplateSwapTime += i, k.perf.avgTemplateSwapTime = k.perf.totalTemplateSwapTime / k.perf.totalTemplateSwaps, de();
    }
  })), ye.push(be("error.occurred", function(t) {
    var e = {
      time: Date.now(),
      error: t.error,
      componentName: t.componentName,
      componentId: t.componentId,
      context: t.context
    };
    k.errors.unshift(e), k.errors.length > Fa && k.errors.pop(), de();
  })));
}
function jr() {
  lt && (lt = !1, ye.forEach(function(t) {
    t();
  }), ye = []);
}
function Ua() {
  return lt;
}
function Ja(t) {
  if (lt) {
    var e = {
      time: Date.now(),
      name: t.name,
      data: t.data,
      mode: t.mode,
      source: t.source,
      sourceId: t.sourceId,
      target: t.target
    };
    k.events.unshift(e), k.events.length > ja && k.events.pop(), de();
  }
}
function Xa() {
  return Array.from(k.components.values());
}
function Fr() {
  return k.requests;
}
function Br() {
  return k.events;
}
function $r() {
  return Object.assign({}, k.perf);
}
function Wr() {
  k.requests = [], k.pendingRequests.clear(), de();
}
function Ur() {
  k.events = [], de();
}
function Ya() {
  k.components.clear(), k.requests = [], k.pendingRequests.clear(), k.events = [], k.errors = [], k.perf = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalRequestTime: 0,
    avgRequestTime: 0,
    minRequestTime: 1 / 0,
    maxRequestTime: 0,
    totalTemplateSwaps: 0,
    totalTemplateSwapTime: 0,
    avgTemplateSwapTime: 0
  }, k.pendingSwaps.clear(), de();
}
function Ga(t) {
  return ci.add(t), function() {
    ci.delete(t);
  };
}
function Jr(t) {
  return Wa(t);
}
function Ka(t) {
  var e = k.components.get(t);
  if (!e || !e.livue || !e.livue._getDevToolsInfo)
    return null;
  try {
    return e.livue._getDevToolsInfo();
  } catch (n) {
    return console.error("[LiVue DevTools] Error getting component info:", n), null;
  }
}
function Qa() {
  return Ma();
}
function Za() {
  return Va();
}
var fi = null, Bi = null, pi = null;
function el(t) {
  fi = t;
}
function tl(t) {
  pi = t;
}
function Xr() {
  if (!fi)
    return [];
  var t = fi.all(), e = [];
  return t.forEach(function(n) {
    var i = Yr(n, !1);
    e.push(i);
  }), e;
}
function Yr(t, e) {
  var n = e ? t.livue : t._rootLivue, i = t.state, r = t.name, o = e ? t.id : t.componentId, a = !e && t.el && t.el.hasAttribute("data-livue-island"), l = {
    id: o,
    name: r,
    isChild: e,
    isIsland: a,
    loading: n ? n.loading : !1,
    dirty: n ? n.isDirty() : !1,
    errorCount: n && n.errors ? Object.keys(n.errors).length : 0,
    state: i,
    livue: n,
    children: []
  };
  if (!e && t._childRegistry)
    for (var s in t._childRegistry) {
      var u = t._childRegistry[s];
      l.children.push(Yr(u, !0));
    }
  return l;
}
function Gr(t) {
  var e = Xr();
  if (t.innerHTML = "", e.length === 0) {
    t.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E6;</div>No components found</div>';
    return;
  }
  e.forEach(function(n) {
    t.appendChild(Kr(n));
  });
}
function Kr(t, e) {
  var n = document.createElement("div");
  n.className = "livue-devtools__node", n.dataset.id = t.id;
  var i = t.children && t.children.length > 0, r = document.createElement("div");
  r.className = "livue-devtools__node-header", t.id === Bi && r.classList.add("livue-devtools__node-header--selected");
  var o = document.createElement("span");
  o.className = "livue-devtools__node-toggle", o.textContent = i ? "▼" : "", r.appendChild(o);
  var a = document.createElement("span");
  a.className = "livue-devtools__node-icon", t.isIsland ? (a.classList.add("livue-devtools__node-icon--island"), a.textContent = "◆") : t.isChild ? (a.classList.add("livue-devtools__node-icon--child"), a.textContent = "○") : (a.classList.add("livue-devtools__node-icon--root"), a.textContent = "■"), r.appendChild(a);
  var l = document.createElement("span");
  l.className = "livue-devtools__node-name", l.textContent = "<" + t.name + ">", r.appendChild(l);
  var s = document.createElement("span");
  s.className = "livue-devtools__node-id", s.textContent = "#" + t.id.substring(0, 8), s.title = t.id, r.appendChild(s);
  var u = document.createElement("span");
  if (u.className = "livue-devtools__node-badges", t.loading) {
    var c = document.createElement("span");
    c.className = "livue-devtools__badge livue-devtools__badge--loading", c.textContent = "loading", u.appendChild(c);
  }
  if (t.dirty) {
    var d = document.createElement("span");
    d.className = "livue-devtools__badge livue-devtools__badge--dirty", d.textContent = "dirty", u.appendChild(d);
  }
  if (t.errorCount > 0) {
    var m = document.createElement("span");
    m.className = "livue-devtools__badge livue-devtools__badge--error", m.textContent = t.errorCount + " error" + (t.errorCount > 1 ? "s" : ""), u.appendChild(m);
  }
  if (r.appendChild(u), r.addEventListener("click", function(p) {
    if (p.target === o && i) {
      var g = n.querySelector(".livue-devtools__node-children");
      if (g) {
        var v = g.style.display !== "none";
        g.style.display = v ? "none" : "block", o.textContent = v ? "▶" : "▼";
      }
      return;
    }
    Bi = t.id;
    var E = document.querySelectorAll(".livue-devtools__node-header");
    E.forEach(function(T) {
      T.classList.remove("livue-devtools__node-header--selected");
    }), r.classList.add("livue-devtools__node-header--selected"), pi && pi(t);
  }), n.appendChild(r), i) {
    var h = document.createElement("div");
    h.className = "livue-devtools__node-children", t.children.forEach(function(p) {
      h.appendChild(Kr(p));
    }), n.appendChild(h);
  }
  return n;
}
var Ue = null, pt = "state", xe = /* @__PURE__ */ new Set(), Rt = null;
function nl(t) {
  Ue = t;
}
function ut(t) {
  if (Rt = t, t.innerHTML = "", !Ue) {
    t.innerHTML = '<div class="livue-devtools__state-empty">Select a component to inspect its state</div>';
    return;
  }
  var e = Ue.state, n = Ue.livue, i = n ? n.dirtyFields : /* @__PURE__ */ new Set(), r = Ka(Ue.id), o = document.createElement("div");
  o.className = "livue-devtools__state-title", o.textContent = "<" + Ue.name + ">", t.appendChild(o);
  var a = document.createElement("div");
  a.style.cssText = "display: flex; gap: 4px; margin-bottom: 8px;", ["state", "diff", "info"].forEach(function(l) {
    var s = document.createElement("button");
    s.style.cssText = "padding: 2px 8px; font-size: 10px; background: " + (pt === l ? "#007acc" : "#3c3c3c") + "; border: none; color: #fff; border-radius: 3px; cursor: pointer;", s.textContent = l.charAt(0).toUpperCase() + l.slice(1), s.addEventListener("click", function() {
      pt = l, ut(t);
    }), a.appendChild(s);
  }), t.appendChild(a), pt === "state" ? il(t, e, i, n) : pt === "diff" ? rl(t, r) : pt === "info" && ol(t, r);
}
function il(t, e, n, i) {
  if (e && typeof e == "object") {
    var r = Object.keys(e);
    if (r.length === 0) {
      var o = document.createElement("div");
      o.className = "livue-devtools__state-empty", o.textContent = "No state properties", t.appendChild(o);
    } else
      r.forEach(function(l) {
        var s = n.has(l);
        t.appendChild(Si(l, e[l], s, l));
      });
  }
  if (i && i.errors && Object.keys(i.errors).length > 0) {
    var a = document.createElement("div");
    a.className = "livue-devtools__state-title", a.style.marginTop = "12px", a.textContent = "Validation Errors", t.appendChild(a), Object.keys(i.errors).forEach(function(l) {
      var s = document.createElement("div");
      s.className = "livue-devtools__prop";
      var u = document.createElement("span");
      u.className = "livue-devtools__prop-key", u.style.color = "#f48771", u.textContent = l, s.appendChild(u);
      var c = document.createElement("span");
      c.className = "livue-devtools__prop-colon", c.textContent = ": ", s.appendChild(c);
      var d = document.createElement("span");
      d.className = "livue-devtools__prop-value", d.style.color = "#f48771", d.textContent = i.errors[l].join(", "), s.appendChild(d), t.appendChild(s);
    });
  }
}
function rl(t, e) {
  if (!e) {
    t.innerHTML += '<div class="livue-devtools__state-empty">No diff info available</div>';
    return;
  }
  var n = e.dirtyFields || [];
  if (n.length === 0) {
    var i = document.createElement("div");
    i.style.cssText = "color: #6a9955; padding: 8px; text-align: center;", i.innerHTML = "&#10003; State is in sync with server", t.appendChild(i);
    return;
  }
  var r = document.createElement("div");
  r.style.cssText = "color: #dcdcaa; margin-bottom: 8px; font-size: 11px;", r.textContent = n.length + " unsync'd field(s):", t.appendChild(r), n.forEach(function(o) {
    var a = e.serverState[o], l = e.clientState[o], s = document.createElement("div");
    s.style.cssText = "margin-bottom: 8px; padding: 6px; background: #2a2d2e; border-radius: 3px;";
    var u = document.createElement("div");
    u.style.cssText = "color: #dcdcaa; font-weight: 600; margin-bottom: 4px;", u.textContent = o, s.appendChild(u);
    var c = document.createElement("div");
    c.style.cssText = "font-size: 11px; color: #858585;", c.innerHTML = '<span style="color: #6a9955;">Server:</span> <span style="color: #ce9178;">' + JSON.stringify(a) + "</span>", s.appendChild(c);
    var d = document.createElement("div");
    d.style.cssText = "font-size: 11px; color: #858585;", d.innerHTML = '<span style="color: #9cdcfe;">Client:</span> <span style="color: #ce9178;">' + JSON.stringify(l) + "</span>", s.appendChild(d), t.appendChild(s);
  });
}
function ol(t, e) {
  if (!e) {
    t.innerHTML += '<div class="livue-devtools__state-empty">No info available</div>';
    return;
  }
  var n = e.memo || {}, i = [
    { label: "Name", value: n.name || "-" },
    { label: "Isolated", value: n.isolate ? "Yes" : "No" },
    { label: "URL Params", value: n.urlParams ? Object.keys(n.urlParams).join(", ") : "-" },
    { label: "Tab Sync", value: n.tabSync ? "Enabled" : "-" },
    { label: "Upload Props", value: n.uploadProps.length > 0 ? n.uploadProps.join(", ") : "-" },
    { label: "Vue Methods", value: n.vueMethods.length > 0 ? n.vueMethods.join(", ") : "-" },
    { label: "Confirm Methods", value: n.confirmMethods.length > 0 ? n.confirmMethods.join(", ") : "-" },
    { label: "Composables", value: n.composableNames.length > 0 ? n.composableNames.join(", ") : "-" }
  ];
  i.forEach(function(u) {
    var c = document.createElement("div");
    c.className = "livue-devtools__prop";
    var d = document.createElement("span");
    d.className = "livue-devtools__prop-key", d.textContent = u.label, c.appendChild(d);
    var m = document.createElement("span");
    m.className = "livue-devtools__prop-colon", m.textContent = ": ", c.appendChild(m);
    var h = document.createElement("span");
    h.className = "livue-devtools__prop-value", h.textContent = u.value, c.appendChild(h), t.appendChild(c);
  });
  var r = document.createElement("div");
  r.className = "livue-devtools__state-title", r.style.marginTop = "12px", r.textContent = "Status", t.appendChild(r);
  var o = [
    { label: "Uploading", value: e.uploading, color: e.uploading ? "#dcdcaa" : "#858585" },
    { label: "Upload Progress", value: e.uploadProgress + "%", show: e.uploading },
    { label: "Streaming", value: e.streaming, color: e.streaming ? "#9cdcfe" : "#858585" },
    { label: "Streaming Method", value: e.streamingMethod || "-", show: e.streaming },
    { label: "Has Error", value: e.errorState.hasError, color: e.errorState.hasError ? "#f48771" : "#858585" }
  ];
  o.forEach(function(u) {
    if (u.show !== !1) {
      var c = document.createElement("div");
      c.className = "livue-devtools__prop";
      var d = document.createElement("span");
      d.className = "livue-devtools__prop-key", d.textContent = u.label, c.appendChild(d);
      var m = document.createElement("span");
      m.className = "livue-devtools__prop-colon", m.textContent = ": ", c.appendChild(m);
      var h = document.createElement("span");
      h.className = "livue-devtools__prop-value", h.style.color = u.color || "#d4d4d4", h.textContent = String(u.value), c.appendChild(h), t.appendChild(c);
    }
  });
  var a = e.composables || {}, l = Object.keys(a);
  if (l.length > 0) {
    var s = document.createElement("div");
    s.className = "livue-devtools__state-title", s.style.marginTop = "12px", s.textContent = "Composables", t.appendChild(s), l.forEach(function(u) {
      var c = a[u], d = document.createElement("div");
      d.style.cssText = "color: #c586c0; font-weight: 600; margin-top: 8px; margin-bottom: 4px;", d.textContent = u + " (livue." + u + ")", t.appendChild(d);
      var m = Object.keys(c.data || {});
      if (m.length > 0) {
        var h = document.createElement("div");
        h.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px;", h.textContent = "Data:", t.appendChild(h), m.forEach(function(v) {
          var E = document.createElement("div");
          E.style.marginLeft = "16px", E.className = "livue-devtools__prop";
          var T = document.createElement("span");
          T.className = "livue-devtools__prop-key", T.textContent = v, E.appendChild(T);
          var C = document.createElement("span");
          C.className = "livue-devtools__prop-colon", C.textContent = ": ", E.appendChild(C), E.appendChild(Qr(c.data[v], "composable." + u + "." + v)), t.appendChild(E);
        });
      }
      if (c.actions && c.actions.length > 0) {
        var p = document.createElement("div");
        p.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px; margin-top: 4px;", p.textContent = "Actions:", t.appendChild(p);
        var g = document.createElement("div");
        g.style.cssText = "margin-left: 16px; color: #dcdcaa;", g.textContent = c.actions.join(", "), t.appendChild(g);
      }
    });
  }
}
function Si(t, e, n, i) {
  var r = document.createElement("div");
  r.className = "livue-devtools__prop";
  var o = document.createElement("span");
  o.className = "livue-devtools__prop-key", n && o.classList.add("livue-devtools__prop-key--dirty"), o.textContent = t, r.appendChild(o);
  var a = document.createElement("span");
  return a.className = "livue-devtools__prop-colon", a.textContent = ": ", r.appendChild(a), r.appendChild(Qr(e, i)), r;
}
function Qr(t, e) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value", t === null)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "null";
  else if (t === void 0)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "undefined";
  else if (typeof t == "string")
    n.classList.add("livue-devtools__prop-value--string"), n.textContent = '"' + sl(t, 50) + '"', n.title = t;
  else if (typeof t == "number")
    n.classList.add("livue-devtools__prop-value--number"), n.textContent = String(t);
  else if (typeof t == "boolean")
    n.classList.add("livue-devtools__prop-value--boolean"), n.textContent = String(t);
  else {
    if (Array.isArray(t))
      return al(t, e);
    if (typeof t == "object")
      return ll(t, e);
    typeof t == "function" ? (n.classList.add("livue-devtools__prop-value--null"), n.textContent = "function()") : n.textContent = String(t);
  }
  return n;
}
function al(t, e) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value livue-devtools__prop-value--array", t.length === 0)
    return n.textContent = "[]", n;
  var i = xe.has(e), r = document.createElement("span");
  r.className = "livue-devtools__object-toggle", r.textContent = i ? "▼ " : "▶ ", r.addEventListener("click", function() {
    xe.has(e) ? xe.delete(e) : xe.add(e), Rt && ut(Rt);
  }), n.appendChild(r);
  var o = document.createElement("span");
  if (o.textContent = "Array(" + t.length + ")", n.appendChild(o), i) {
    var a = document.createElement("div");
    a.className = "livue-devtools__object", t.forEach(function(l, s) {
      a.appendChild(Si(String(s), l, !1, e + "." + s));
    }), n.appendChild(a);
  }
  return n;
}
function ll(t, e) {
  var n = document.createElement("span");
  n.className = "livue-devtools__prop-value livue-devtools__prop-value--object";
  var i = Object.keys(t);
  if (i.length === 0)
    return n.textContent = "{}", n;
  var r = xe.has(e), o = document.createElement("span");
  o.className = "livue-devtools__object-toggle", o.textContent = r ? "▼ " : "▶ ", o.addEventListener("click", function() {
    xe.has(e) ? xe.delete(e) : xe.add(e), Rt && ut(Rt);
  }), n.appendChild(o);
  var a = document.createElement("span");
  if (a.textContent = "{...} " + i.length + " key" + (i.length > 1 ? "s" : ""), n.appendChild(a), r) {
    var l = document.createElement("div");
    l.className = "livue-devtools__object", i.forEach(function(s) {
      l.appendChild(Si(s, t[s], !1, e + "." + s));
    }), n.appendChild(l);
  }
  return n;
}
function sl(t, e) {
  return t.length <= e ? t : t.substring(0, e - 3) + "...";
}
function ul() {
  Ue = null, xe.clear();
}
var et = /* @__PURE__ */ new Set();
function Zr(t) {
  t.innerHTML = "";
  var e = Fr(), n = document.createElement("div");
  n.className = "livue-devtools__timeline-header";
  var i = document.createElement("span");
  i.className = "livue-devtools__timeline-title", i.textContent = "Request Timeline (" + e.length + ")", n.appendChild(i);
  var r = document.createElement("button");
  r.className = "livue-devtools__btn", r.textContent = "Clear", r.addEventListener("click", function() {
    Wr(), et.clear(), Zr(t);
  }), n.appendChild(r), t.appendChild(n);
  var o = document.createElement("div");
  o.className = "livue-devtools__timeline-list", e.length === 0 ? o.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E1;</div>No requests yet</div>' : e.forEach(function(a) {
    o.appendChild(dl(a));
  }), t.appendChild(o);
}
function dl(t) {
  var e = document.createElement("div");
  e.className = "livue-devtools__request", et.has(t.id) && e.classList.add("livue-devtools__request--expanded");
  var n = document.createElement("div");
  n.className = "livue-devtools__request-header";
  var i = document.createElement("span");
  i.className = "livue-devtools__request-toggle", i.textContent = et.has(t.id) ? "▼" : "▶", n.appendChild(i);
  var r = document.createElement("span");
  r.className = "livue-devtools__request-method", r.textContent = "POST", n.appendChild(r);
  var o = document.createElement("span");
  o.className = "livue-devtools__request-url", o.textContent = t.url, n.appendChild(o);
  var a = document.createElement("span");
  if (a.className = "livue-devtools__request-status", t.status === "pending" ? (a.classList.add("livue-devtools__request-status--pending"), a.textContent = "pending") : t.status === "success" ? (a.classList.add("livue-devtools__request-status--success"), a.textContent = "OK") : (a.classList.add("livue-devtools__request-status--error"), a.textContent = "Error"), n.appendChild(a), t.duration !== null) {
    var l = document.createElement("span");
    l.className = "livue-devtools__request-duration", t.duration < 100 ? l.classList.add("livue-devtools__request-duration--fast") : t.duration < 500 ? l.classList.add("livue-devtools__request-duration--medium") : l.classList.add("livue-devtools__request-duration--slow"), l.textContent = t.duration + "ms", n.appendChild(l);
  }
  var s = document.createElement("span");
  s.className = "livue-devtools__request-time", s.textContent = Jr(t.startTime), n.appendChild(s), n.addEventListener("click", function() {
    et.has(t.id) ? (et.delete(t.id), e.classList.remove("livue-devtools__request--expanded"), i.textContent = "▶") : (et.add(t.id), e.classList.add("livue-devtools__request--expanded"), i.textContent = "▼");
  }), e.appendChild(n);
  var u = document.createElement("div");
  if (u.className = "livue-devtools__request-details", t.updateCount > 0 || t.lazyCount > 0) {
    var c = document.createElement("div");
    c.className = "livue-devtools__request-section";
    var d = document.createElement("div");
    d.className = "livue-devtools__request-section-title", d.textContent = "Summary", c.appendChild(d);
    var m = document.createElement("div"), h = [];
    t.updateCount > 0 && h.push(t.updateCount + " update" + (t.updateCount > 1 ? "s" : "")), t.lazyCount > 0 && h.push(t.lazyCount + " lazy load" + (t.lazyCount > 1 ? "s" : "")), m.textContent = h.join(", "), c.appendChild(m), u.appendChild(c);
  }
  if (t.updates && t.updates.length > 0) {
    var p = document.createElement("div");
    p.className = "livue-devtools__request-section";
    var g = document.createElement("div");
    g.className = "livue-devtools__request-section-title", g.textContent = "Request Payload", p.appendChild(g);
    var v = document.createElement("pre");
    v.className = "livue-devtools__request-json", v.textContent = cl(t.updates), p.appendChild(v), u.appendChild(p);
  }
  if (t.responses) {
    var E = document.createElement("div");
    E.className = "livue-devtools__request-section";
    var T = document.createElement("div");
    T.className = "livue-devtools__request-section-title", T.textContent = "Response", E.appendChild(T);
    var C = document.createElement("pre");
    C.className = "livue-devtools__request-json", C.textContent = fl(t.responses), E.appendChild(C), u.appendChild(E);
  }
  if (t.error) {
    var N = document.createElement("div");
    N.className = "livue-devtools__request-section";
    var L = document.createElement("div");
    L.className = "livue-devtools__request-section-title", L.style.color = "#f48771", L.textContent = "Error", N.appendChild(L);
    var A = document.createElement("pre");
    A.className = "livue-devtools__request-json", A.style.color = "#f48771", A.textContent = t.error.message || String(t.error), N.appendChild(A), u.appendChild(N);
  }
  return e.appendChild(u), e;
}
function cl(t) {
  var e = t.map(function(n) {
    var i = {};
    return n.method && (i.method = n.method), n.params && n.params.length > 0 && (i.params = n.params), n.diffs && Object.keys(n.diffs).length > 0 && (i.diffs = n.diffs), i;
  });
  return JSON.stringify(e, null, 2);
}
function fl(t) {
  var e = t.map(function(n) {
    if (!n) return null;
    var i = {};
    return n.snapshot && (i.snapshotSize = n.snapshot.length + " bytes"), n.html && (i.htmlSize = n.html.length + " bytes"), n.events && n.events.length > 0 && (i.events = n.events.map(function(r) {
      return r.name;
    })), n.jsonResult !== void 0 && (i.jsonResult = n.jsonResult), n.redirect && (i.redirect = n.redirect), n.download && (i.download = n.download.name), i;
  });
  return JSON.stringify(e, null, 2);
}
var xt = "";
function eo(t) {
  t.innerHTML = "";
  var e = document.createElement("div");
  e.className = "livue-devtools__events-header";
  var n = document.createElement("input");
  n.className = "livue-devtools__events-filter", n.type = "text", n.placeholder = "Filter events...", n.value = xt, n.addEventListener("input", function(o) {
    xt = o.target.value.toLowerCase(), $i(t.querySelector(".livue-devtools__events-list"));
  }), e.appendChild(n);
  var i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = "Clear", i.addEventListener("click", function() {
    Ur(), xt = "", n.value = "", eo(t);
  }), e.appendChild(i), t.appendChild(e);
  var r = document.createElement("div");
  r.className = "livue-devtools__events-list", $i(r), t.appendChild(r);
}
function $i(t) {
  if (t) {
    t.innerHTML = "";
    var e = Br(), n = e;
    if (xt && (n = e.filter(function(i) {
      var r = (i.name + " " + i.source + " " + JSON.stringify(i.data)).toLowerCase();
      return r.indexOf(xt) !== -1;
    })), n.length === 0) {
      e.length === 0 ? t.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E8;</div>No events yet</div>' : t.innerHTML = '<div class="livue-devtools__empty">No events match filter</div>';
      return;
    }
    n.forEach(function(i) {
      t.appendChild(pl(i));
    });
  }
}
function pl(t) {
  var e = document.createElement("div");
  e.className = "livue-devtools__event";
  var n = document.createElement("span");
  n.className = "livue-devtools__event-time", n.textContent = Jr(t.time), e.appendChild(n);
  var i = document.createElement("span");
  if (i.className = "livue-devtools__event-name", i.textContent = t.name, e.appendChild(i), t.source) {
    var r = document.createElement("span");
    r.className = "livue-devtools__event-source", r.textContent = "← " + t.source, e.appendChild(r);
  }
  if (t.mode && t.mode !== "broadcast") {
    var o = document.createElement("span");
    o.className = "livue-devtools__badge", o.style.marginLeft = "4px", o.style.background = "#3c3c3c", o.style.color = "#858585", o.textContent = t.mode, t.target && (o.textContent += " → " + t.target), e.appendChild(o);
  }
  if (t.data !== void 0 && t.data !== null) {
    var a = document.createElement("span");
    a.className = "livue-devtools__event-data", a.textContent = vl(t.data), a.title = JSON.stringify(t.data, null, 2), e.appendChild(a);
  }
  return e;
}
function vl(t) {
  if (t === null) return "null";
  if (t === void 0) return "undefined";
  var e = JSON.stringify(t);
  return e.length > 80 ? e.substring(0, 77) + "..." : e;
}
var to = "livue-devtools-state", q = null, Z = "components", ce = !1, no = !1, qe = "right";
function io() {
  try {
    var t = localStorage.getItem(to);
    if (t) {
      var e = JSON.parse(t);
      Z = e.activeTab || "components", ce = e.minimized || !1, no = e.isOpen || !1, qe = e.position || "right";
    }
  } catch {
  }
}
function jt() {
  try {
    var t = {
      isOpen: q !== null,
      activeTab: Z,
      minimized: ce,
      position: qe
    };
    localStorage.setItem(to, JSON.stringify(t));
  } catch {
  }
}
function ml() {
  return io(), no;
}
var ln = null, Ct = null, sn = null;
function hl(t) {
  el(t);
}
function gl() {
  return q !== null;
}
function xi() {
  q || (io(), ka(), Hr(), _l(), Cl(), Tl(), jt());
}
function Ci() {
  q && (Ct && (document.removeEventListener("keydown", Ct), Ct = null), ln && (clearInterval(ln), ln = null), sn && (sn(), sn = null), q.remove(), q = null, Da(), jr(), ul(), jt());
}
function ro() {
  q ? Ci() : xi();
}
function oo() {
  switch (qe) {
    case "left":
      return { expanded: "◀", minimized: "▶" };
    // ◀ ▶
    case "right":
      return { expanded: "▶", minimized: "◀" };
    // ▶ ◀
    case "top":
      return { expanded: "▲", minimized: "▼" };
    // ▲ ▼
    case "bottom":
      return { expanded: "▼", minimized: "▲" };
    // ▼ ▲
    default:
      return { expanded: "▶", minimized: "◀" };
  }
}
function _l() {
  q = document.createElement("div"), q.className = "livue-devtools livue-devtools--" + qe, ce && q.classList.add("livue-devtools--minimized");
  var t = document.createElement("div");
  t.className = "livue-devtools__header";
  var e = document.createElement("div");
  e.className = "livue-devtools__title", e.innerHTML = '<span class="livue-devtools__title-icon">&#x2699;</span> LiVue DevTools', t.appendChild(e);
  var n = document.createElement("div");
  n.className = "livue-devtools__actions";
  var i = oo(), r = document.createElement("button");
  r.className = "livue-devtools__btn", r.textContent = ce ? i.minimized : i.expanded, r.title = "Minimize", r.addEventListener("click", function() {
    ce = !ce, q.classList.toggle("livue-devtools--minimized", ce), r.textContent = ce ? i.minimized : i.expanded, jt();
  }), n.appendChild(r);
  var o = document.createElement("button");
  o.className = "livue-devtools__btn", o.textContent = "×", o.title = "Close (Ctrl+Shift+L)", o.addEventListener("click", Ci), n.appendChild(o), t.appendChild(n), q.appendChild(t);
  var a = document.createElement("div");
  a.className = "livue-devtools__tabs";
  var l = ["components", "timeline", "events", "stores", "echo", "perf", "settings"], s = {
    components: "Components",
    timeline: "Timeline",
    events: "Events",
    stores: "Stores",
    echo: "Echo",
    perf: "Performance",
    settings: "Settings"
  };
  l.forEach(function(C) {
    var N = document.createElement("button");
    N.className = "livue-devtools__tab", C === Z && N.classList.add("livue-devtools__tab--active"), N.textContent = s[C], N.addEventListener("click", function() {
      bl(C);
    }), a.appendChild(N);
  }), q.appendChild(a);
  var u = document.createElement("div");
  u.className = "livue-devtools__content";
  var c = document.createElement("div");
  c.className = "livue-devtools__panel livue-devtools__components", c.dataset.tab = "components", Z === "components" && c.classList.add("livue-devtools__panel--active");
  var d = document.createElement("div");
  d.className = "livue-devtools__tree", c.appendChild(d);
  var m = document.createElement("div");
  m.className = "livue-devtools__state", c.appendChild(m), u.appendChild(c);
  var h = document.createElement("div");
  h.className = "livue-devtools__panel livue-devtools__timeline", h.dataset.tab = "timeline", Z === "timeline" && h.classList.add("livue-devtools__panel--active"), u.appendChild(h);
  var p = document.createElement("div");
  p.className = "livue-devtools__panel livue-devtools__events", p.dataset.tab = "events", Z === "events" && p.classList.add("livue-devtools__panel--active"), u.appendChild(p);
  var g = document.createElement("div");
  g.className = "livue-devtools__panel livue-devtools__stores", g.dataset.tab = "stores", Z === "stores" && g.classList.add("livue-devtools__panel--active"), u.appendChild(g);
  var v = document.createElement("div");
  v.className = "livue-devtools__panel livue-devtools__echo", v.dataset.tab = "echo", Z === "echo" && v.classList.add("livue-devtools__panel--active"), u.appendChild(v);
  var E = document.createElement("div");
  E.className = "livue-devtools__panel livue-devtools__perf", E.dataset.tab = "perf", Z === "perf" && E.classList.add("livue-devtools__panel--active"), u.appendChild(E);
  var T = document.createElement("div");
  T.className = "livue-devtools__panel livue-devtools__settings", T.dataset.tab = "settings", Z === "settings" && T.classList.add("livue-devtools__panel--active"), u.appendChild(T), q.appendChild(u), document.body.appendChild(q), tl(function(C) {
    nl(C), ut(m);
  }), yn(), sn = Ga(function() {
    yn();
  });
}
function bl(t) {
  if (t !== Z) {
    Z = t;
    var e = q.querySelectorAll(".livue-devtools__tab"), n = ["components", "timeline", "events", "stores", "echo", "perf", "settings"];
    e.forEach(function(r, o) {
      r.classList.toggle("livue-devtools__tab--active", n[o] === t);
    });
    var i = q.querySelectorAll(".livue-devtools__panel");
    i.forEach(function(r) {
      r.classList.toggle("livue-devtools__panel--active", r.dataset.tab === t);
    }), yn(), jt();
  }
}
function yn() {
  if (q)
    switch (Z) {
      case "components":
        var t = q.querySelector(".livue-devtools__tree"), e = q.querySelector(".livue-devtools__state");
        t && Gr(t), e && ut(e);
        break;
      case "timeline":
        var n = q.querySelector(".livue-devtools__timeline");
        n && Zr(n);
        break;
      case "events":
        var i = q.querySelector(".livue-devtools__events");
        i && eo(i);
        break;
      case "stores":
        var r = q.querySelector(".livue-devtools__stores");
        r && yl(r);
        break;
      case "echo":
        var o = q.querySelector(".livue-devtools__echo");
        o && wl(o);
        break;
      case "perf":
        var a = q.querySelector(".livue-devtools__perf");
        a && El(a);
        break;
      case "settings":
        var l = q.querySelector(".livue-devtools__settings");
        l && Sl(l);
        break;
    }
}
function yl(t) {
  t.innerHTML = "", t.style.cssText = "flex-direction: column; width: 100%; padding: 8px;";
  var e = Qa(), n = e.stores, i = document.createElement("div");
  if (i.className = "livue-devtools__perf-title", i.textContent = "Registered Pinia Stores", t.appendChild(i), n.length === 0) {
    var r = document.createElement("div");
    r.className = "livue-devtools__empty", r.innerHTML = '<div class="livue-devtools__empty-icon">&#128230;</div>No Pinia stores registered<br><br><span style="font-size: 11px; color: #858585;">Use LiVue.registerStore(useMyStore) to register stores</span>', t.appendChild(r);
    return;
  }
  n.forEach(function(l) {
    var s = document.createElement("div");
    s.style.cssText = "padding: 8px; background: #2a2d2e; border-radius: 4px; margin-bottom: 8px;";
    var u = document.createElement("div");
    if (u.style.cssText = "color: #4ec9b0; font-weight: 600; margin-bottom: 4px;", u.textContent = l.name, s.appendChild(u), l.filters) {
      var c = document.createElement("div");
      c.style.cssText = "font-size: 11px; color: #858585;", c.textContent = "Filters: " + JSON.stringify(l.filters), s.appendChild(c);
    }
    t.appendChild(s);
  });
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-title", o.style.marginTop = "16px", o.textContent = "Other Registrations", t.appendChild(o);
  var a = [
    { label: "Plugins", count: e.plugins.length, items: e.plugins.map(function(l) {
      return l.name;
    }) },
    { label: "Components", count: e.components.length, items: e.components.map(function(l) {
      return l.name;
    }) },
    { label: "Directives", count: e.directives.length, items: e.directives.map(function(l) {
      return l.name;
    }) }
  ];
  a.forEach(function(l) {
    var s = document.createElement("div");
    s.className = "livue-devtools__perf-stat";
    var u = document.createElement("span");
    u.className = "livue-devtools__perf-label", u.textContent = l.label, s.appendChild(u);
    var c = document.createElement("span");
    c.className = "livue-devtools__perf-value", c.textContent = l.count + (l.items.length > 0 ? " (" + l.items.join(", ") + ")" : ""), s.appendChild(c), t.appendChild(s);
  });
}
function wl(t) {
  t.innerHTML = "", t.style.cssText = "flex-direction: column; width: 100%; padding: 8px;";
  var e = Za(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-title", i.textContent = "Laravel Echo Status", n.appendChild(i);
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-stat";
  var o = document.createElement("span");
  o.className = "livue-devtools__perf-label", o.textContent = "Echo Available", r.appendChild(o);
  var a = document.createElement("span");
  if (a.className = "livue-devtools__perf-value livue-devtools__perf-value--" + (e.available ? "good" : "warn"), a.textContent = e.available ? "Yes" : "No (window.Echo not found)", r.appendChild(a), n.appendChild(r), t.appendChild(n), !e.available) {
    var l = document.createElement("div");
    l.style.cssText = "color: #858585; font-size: 11px; padding: 8px;", l.textContent = "Configure Laravel Echo and set window.Echo to enable real-time features.", t.appendChild(l);
    return;
  }
  var s = document.createElement("div");
  s.className = "livue-devtools__perf-section";
  var u = document.createElement("div");
  if (u.className = "livue-devtools__perf-title", u.textContent = "Active Channels (" + e.channels.length + ")", s.appendChild(u), e.channels.length === 0) {
    var c = document.createElement("div");
    c.style.cssText = "color: #858585; font-size: 11px;", c.textContent = "No active channels", s.appendChild(c);
  } else
    e.channels.forEach(function(p) {
      var g = document.createElement("div");
      g.style.cssText = "padding: 4px 0; display: flex; align-items: center; gap: 8px;";
      var v = document.createElement("span");
      v.style.cssText = "padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600;", p.type === "private" ? (v.style.background = "#4d3a12", v.style.color = "#dcdcaa") : p.type === "presence" ? (v.style.background = "#264f78", v.style.color = "#9cdcfe") : (v.style.background = "#2d4a2d", v.style.color = "#6a9955"), v.textContent = p.type, g.appendChild(v);
      var E = document.createElement("span");
      E.style.color = "#d4d4d4", E.textContent = p.name, g.appendChild(E), s.appendChild(g);
    });
  t.appendChild(s);
  var d = document.createElement("div");
  d.className = "livue-devtools__perf-section";
  var m = document.createElement("div");
  if (m.className = "livue-devtools__perf-title", m.textContent = "Subscriptions (" + e.subscriptions.length + ")", d.appendChild(m), e.subscriptions.length === 0) {
    var h = document.createElement("div");
    h.style.cssText = "color: #858585; font-size: 11px;", h.textContent = "No active subscriptions", d.appendChild(h);
  } else
    e.subscriptions.forEach(function(p) {
      var g = document.createElement("div");
      g.style.cssText = "padding: 4px 0; font-size: 11px;", g.innerHTML = '<span style="color: #9cdcfe;">' + p.channelName + '</span> <span style="color: #858585;">→</span> <span style="color: #dcdcaa;">' + p.event + '</span> <span style="color: #858585;">(component: ' + p.componentId.substring(0, 8) + "...)</span>", d.appendChild(g);
    });
  t.appendChild(d);
}
function El(t) {
  t.innerHTML = "";
  var e = $r(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-title", i.textContent = "AJAX Requests", n.appendChild(i), n.appendChild(ae("Total Requests", e.totalRequests)), n.appendChild(ae("Successful", e.successfulRequests, "good")), n.appendChild(ae("Failed", e.failedRequests, e.failedRequests > 0 ? "bad" : null)), t.appendChild(n);
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-section";
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-title", o.textContent = "Request Timing", r.appendChild(o);
  var a = e.avgRequestTime < 100 ? "good" : e.avgRequestTime < 500 ? "warn" : "bad";
  r.appendChild(ae("Average", Jt(e.avgRequestTime), a));
  var l = e.minRequestTime < 100 ? "good" : e.minRequestTime < 500 ? "warn" : "bad";
  r.appendChild(ae("Fastest", e.minRequestTime === 1 / 0 ? "-" : Jt(e.minRequestTime), l));
  var s = e.maxRequestTime < 100 ? "good" : e.maxRequestTime < 500 ? "warn" : "bad";
  r.appendChild(ae("Slowest", e.maxRequestTime === 0 ? "-" : Jt(e.maxRequestTime), s)), t.appendChild(r);
  var u = document.createElement("div");
  u.className = "livue-devtools__perf-section";
  var c = document.createElement("div");
  c.className = "livue-devtools__perf-title", c.textContent = "Template Swaps", u.appendChild(c), u.appendChild(ae("Total Swaps", e.totalTemplateSwaps));
  var d = e.avgTemplateSwapTime < 5 ? "good" : e.avgTemplateSwapTime < 20 ? "warn" : "bad";
  u.appendChild(ae("Average Time", Jt(e.avgTemplateSwapTime), d)), t.appendChild(u);
  var m = document.createElement("div");
  m.className = "livue-devtools__perf-section";
  var h = document.createElement("div");
  h.className = "livue-devtools__perf-title", h.textContent = "Components", m.appendChild(h);
  var p = Xa(), g = p.filter(function(E) {
    return !E.isChild;
  }), v = p.filter(function(E) {
    return E.isChild;
  });
  m.appendChild(ae("Root Components", g.length)), m.appendChild(ae("Child Components", v.length)), m.appendChild(ae("Total", p.length)), t.appendChild(m);
}
function Sl(t) {
  t.innerHTML = "";
  var e = document.createElement("div");
  e.className = "livue-devtools__settings-group";
  var n = document.createElement("div");
  n.className = "livue-devtools__settings-label", n.textContent = "Panel Position", e.appendChild(n);
  var i = document.createElement("div");
  i.className = "livue-devtools__settings-options";
  var r = [
    { id: "right", label: "Right", icon: "▶" },
    { id: "left", label: "Left", icon: "◀" },
    { id: "bottom", label: "Bottom", icon: "▼" },
    { id: "top", label: "Top", icon: "▲" }
  ];
  r.forEach(function(s) {
    var u = document.createElement("button");
    u.className = "livue-devtools__settings-btn", qe === s.id && u.classList.add("livue-devtools__settings-btn--active");
    var c = document.createElement("span");
    c.className = "livue-devtools__settings-btn-icon", c.textContent = s.icon, u.appendChild(c);
    var d = document.createElement("span");
    d.textContent = s.label, u.appendChild(d), u.addEventListener("click", function() {
      xl(s.id);
    }), i.appendChild(u);
  }), e.appendChild(i), t.appendChild(e);
  var o = document.createElement("div");
  o.className = "livue-devtools__settings-group";
  var a = document.createElement("div");
  a.className = "livue-devtools__settings-label", a.textContent = "Keyboard Shortcuts", o.appendChild(a);
  var l = [
    { key: "Ctrl+Shift+L", desc: "Toggle DevTools" }
  ];
  l.forEach(function(s) {
    var u = document.createElement("div");
    u.className = "livue-devtools__perf-stat";
    var c = document.createElement("span");
    c.style.cssText = "color: #dcdcaa; font-family: monospace;", c.textContent = s.key, u.appendChild(c);
    var d = document.createElement("span");
    d.style.color = "#858585", d.textContent = s.desc, u.appendChild(d), o.appendChild(u);
  }), t.appendChild(o);
}
function xl(t) {
  if (qe !== t && (qe = t, jt(), q)) {
    q.className = "livue-devtools livue-devtools--" + qe, ce && q.classList.add("livue-devtools--minimized");
    var e = oo(), n = q.querySelector(".livue-devtools__btn");
    n && (n.textContent = ce ? e.minimized : e.expanded), yn();
  }
}
function ae(t, e, n) {
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-stat";
  var r = document.createElement("span");
  r.className = "livue-devtools__perf-label", r.textContent = t, i.appendChild(r);
  var o = document.createElement("span");
  return o.className = "livue-devtools__perf-value", n && o.classList.add("livue-devtools__perf-value--" + n), o.textContent = String(e), i.appendChild(o), i;
}
function Jt(t) {
  return t === 0 || isNaN(t) || !isFinite(t) ? "-" : t < 1 ? "<1ms" : Math.round(t) + "ms";
}
function Cl() {
  Ct = function(t) {
    t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), ro());
  }, document.addEventListener("keydown", Ct);
}
function Tl() {
  ln = setInterval(function() {
    if (q && Z === "components") {
      var t = q.querySelector(".livue-devtools__tree"), e = q.querySelector(".livue-devtools__state");
      t && Gr(t), e && ut(e);
    }
  }, 500);
}
var zt = !1;
function ao(t) {
  zt || (hl(t), zt = !0, ml() && xi());
}
function Nl() {
  if (!zt) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  xi();
}
function Ll() {
  Ci();
}
function lo() {
  if (!zt) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  ro();
}
function Al() {
  return gl();
}
function kl() {
  return Xr();
}
function Dl() {
  return Fr();
}
function Il() {
  return Br();
}
function Ml() {
  return $r();
}
function Ol() {
  Wr();
}
function Pl() {
  Ur();
}
function Rl() {
  Ya();
}
function so(t) {
  Ja(t);
}
function zl() {
  return zt;
}
function ql() {
  Hr();
}
function Vl() {
  jr();
}
function uo() {
  return Ua();
}
const Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: Rl,
  clearEvents: Pl,
  clearTimeline: Ol,
  close: Ll,
  getComponents: kl,
  getEvents: Il,
  getPerf: Ml,
  getTimeline: Dl,
  init: ao,
  isCollecting: uo,
  isInitialized: zl,
  isOpen: Al,
  logEvent: so,
  open: Nl,
  startCollecting: ql,
  stopCollecting: Vl,
  toggle: lo
}, Symbol.toStringTag, { value: "Module" }));
var Me = /* @__PURE__ */ new Map();
function wn(t, e, n, i) {
  Me.has(t) || Me.set(t, /* @__PURE__ */ new Set());
  var r = {
    componentName: e,
    componentId: n,
    handler: i
  };
  return Me.get(t).add(r), function() {
    var o = Me.get(t);
    o && (o.delete(r), o.size === 0 && Me.delete(t));
  };
}
function un(t, e, n, i, r, o) {
  uo() && so({
    name: t,
    data: e,
    mode: n,
    source: i,
    sourceId: r,
    target: o
  });
  var a = Me.get(t);
  a && a.forEach(function(l) {
    var s = !1;
    if (n === "broadcast" ? s = !0 : n === "self" ? s = l.componentId === r : n === "to" && (s = l.componentName === o), s)
      try {
        l.handler(e);
      } catch (u) {
        console.error('[LiVue] Event handler error for "' + t + '":', u);
      }
  });
}
function Wi(t) {
  Me.forEach(function(e, n) {
    e.forEach(function(i) {
      i.componentId === t && e.delete(i);
    }), e.size === 0 && Me.delete(n);
  });
}
function jl(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    un(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Fl(t, e) {
  var n = new URL(window.location), i = !1;
  for (var r in t) {
    var o = t[r], a = o.as || r, l = e[r], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (i = !0);
  }
  n.toString() !== window.location.toString() && (i ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function Bl() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function co(t, e, n, i, r) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", t), l.append("component", e), l.append("property", n), l.append("checksum", i);
    var s = new XMLHttpRequest(), u = Bl();
    s.open("POST", u, !0);
    var c = In();
    c && s.setRequestHeader("X-CSRF-TOKEN", c), s.setRequestHeader("Accept", "application/json"), r && s.upload && s.upload.addEventListener("progress", function(d) {
      if (d.lengthComputable) {
        var m = Math.round(d.loaded / d.total * 100);
        r(m);
      }
    }), s.onload = function() {
      var d;
      try {
        d = JSON.parse(s.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (s.status >= 200 && s.status < 300)
        o(d);
      else {
        var m = new Error(d.error || d.message || "Upload failed");
        m.status = s.status, m.data = d, a(m);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function $l(t, e, n, i, r) {
  var o = Array.from(t), a = [], l = o.length, s = 0;
  return o.reduce(function(u, c, d) {
    return u.then(function() {
      return co(c, e, n, i, function(m) {
        if (r) {
          var h = Math.round((s * 100 + m) / l);
          r({
            file: d,
            percent: m,
            overall: h
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
const Wl = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var Ui;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Ui || (Ui = {}));
function Ul() {
  const t = Ro(!0), e = t.run(() => _n({}));
  let n = [], i = [];
  const r = zo({
    install(o) {
      r._a = o, o.provide(Wl, r), o.config.globalProperties.$pinia = r, i.forEach((a) => n.push(a)), i = [];
    },
    use(o) {
      return this._a ? n.push(o) : i.push(o), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: t,
    _s: /* @__PURE__ */ new Map(),
    state: e
  });
  return r;
}
let zn = 0;
function Jl(t) {
  let e = {};
  for (let n in t) {
    let i = t[n];
    Array.isArray(i) && i.length === 2 && i[1] && typeof i[1] == "object" && i[1].s ? e[n] = i[0] : e[n] = i;
  }
  return e;
}
function Xl(t) {
  return qo({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let i = _n(!1), r = xr(null), o = null, a = _n(null);
      async function l() {
        if (!i.value)
          try {
            let u = await wa({
              component: e.config.name,
              props: e.config.props || {}
            });
            u.html && u.snapshot && s(u);
          } catch (u) {
            console.error("[LiVue] Lazy load failed:", u);
          }
      }
      function s(u) {
        let c = JSON.parse(u.snapshot);
        zn++;
        let d = "lazy-" + zn + "-" + Date.now(), m = c.memo ? c.memo.name : "", h = Jl(c.state || {}), p = c.memo || {}, { createLivueHelper: g, buildComponentDef: v, processTemplate: E, createReactiveState: T } = t._lazyHelpers, C = T(h), N = JSON.parse(JSON.stringify(h)), L = { _updateTemplate: null }, A = g(
          d,
          C,
          p,
          L,
          N,
          u.snapshot
        );
        p.errors && we(A.errors, p.errors);
        let V = "livue-lazy-child-" + zn, b = E(u.html, t), f = '<div data-livue-id="' + d + '">' + b.template + "</div>", x = v(f, C, A, t._versions, m);
        t._childRegistry[d] = {
          tagName: V,
          state: C,
          memo: p,
          livue: A,
          componentRef: L,
          name: m,
          id: d
        }, L._updateTemplate = function(w) {
          let _ = E(w, t), O = '<div data-livue-id="' + d + '">' + _.template + "</div>";
          for (let H in _.childDefs)
            t.vueApp._context.components[H] || t.vueApp.component(H, _.childDefs[H]);
          let z = v(O, C, A, t._versions, m);
          t.vueApp._context.components[V] = z, t._versions[V] = (t._versions[V] || 0) + 1, r.value = z;
        };
        let S = p.listeners || null;
        if (S)
          for (let w in S)
            (function(_, O) {
              wn(w, m, d, function(z) {
                O.call(_, z);
              });
            })(S[w], A);
        for (let w in b.childDefs)
          t.vueApp._context.components[w] || t.vueApp.component(w, b.childDefs[w]);
        t._versions[V] = 0, t.vueApp._context.components[V] || t.vueApp.component(V, x), r.value = x, i.value = !0;
      }
      return Cr(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Tr(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return i.value && r.value ? zi(r.value) : zi("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
let Tt = /* @__PURE__ */ new Map(), Nt = /* @__PURE__ */ new Map();
function qt(t, e) {
  let n = t + ":debounce:" + e;
  if (!Tt.has(n)) {
    let i = null, r = null, o = null, a = null, l = function(s) {
      return r = s, clearTimeout(i), new Promise(function(u, c) {
        o = u, a = c, i = setTimeout(function() {
          let d = r, m = o, h = a;
          r = null, o = null, a = null, Promise.resolve(d()).then(m).catch(h);
        }, e);
      });
    };
    Tt.set(n, l);
  }
  return Tt.get(n);
}
function Vt(t, e) {
  let n = t + ":throttle:" + e;
  if (!Nt.has(n)) {
    let i = 0, r = function(o) {
      let a = Date.now();
      return a - i < e ? Promise.resolve(null) : (i = a, Promise.resolve(o()));
    };
    Nt.set(n, r);
  }
  return Nt.get(n);
}
function Ji(t) {
  let e = t + ":";
  for (let n of Tt.keys())
    n.startsWith(e) && Tt.delete(n);
  for (let n of Nt.keys())
    n.startsWith(e) && Nt.delete(n);
}
const En = "livue-tab-sync";
let Ti = Date.now() + "-" + Math.random().toString(36).substr(2, 9), Sn = null, Ni = /* @__PURE__ */ new Map(), Xi = !1;
function fo() {
  Xi || (Xi = !0, typeof BroadcastChannel < "u" ? (Sn = new BroadcastChannel(En), Sn.onmessage = Yl) : window.addEventListener("storage", Gl));
}
function Yl(t) {
  let e = t.data;
  e.tabId !== Ti && po(e);
}
function Gl(t) {
  if (t.key === En && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === Ti) return;
      po(e);
    } catch {
    }
}
function po(t) {
  let e = Ni.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function Kl(t, e) {
  fo(), Ni.set(t, e);
}
function Yi(t) {
  Ni.delete(t);
}
function Ql(t, e, n, i) {
  fo();
  let r = {
    tabId: Ti,
    component: t,
    state: e,
    properties: n,
    config: i
  };
  if (Sn)
    Sn.postMessage(r);
  else
    try {
      localStorage.setItem(En, JSON.stringify(r)), localStorage.removeItem(En);
    } catch {
    }
}
function Zl(t, e, n) {
  let i = {};
  for (let r of e)
    n.only && !n.only.includes(r) || n.except && n.except.includes(r) || r in t && (i[r] = t[r]);
  return i;
}
let Gi = 0;
function vi() {
  return typeof document < "u" && "startViewTransition" in document;
}
const qn = /* @__PURE__ */ new WeakMap();
function Ki() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const es = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let i = e.value;
    i || (Gi++, i = "livue-transition-" + Gi), qn.set(t, {
      name: i
    }), t.setAttribute("data-livue-transition", i), vi() && (t.style.viewTransitionName = i);
  },
  mounted(t, e) {
    Ki();
  },
  updated(t, e) {
    let n = qn.get(t);
    if (e.value !== e.oldValue && e.value) {
      let i = e.value;
      n && (n.name = i), t.setAttribute("data-livue-transition", i), vi() && (t.style.viewTransitionName = i);
    }
  },
  unmounted(t) {
    qn.delete(t), t.removeAttribute("data-livue-transition"), Ki();
  }
};
function ts(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const Li = /* @__PURE__ */ new Map();
async function ns(t, e = {}) {
  const {
    onChunk: n = () => {
    },
    onComplete: i = () => {
    },
    onError: r = () => {
    }
  } = e;
  try {
    const o = await fetch("/livue/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/x-ndjson",
        "X-CSRF-TOKEN": In(),
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
      const { done: c, value: d } = await a.read();
      if (c)
        break;
      s += l.decode(d, { stream: !0 });
      const m = s.split(`
`);
      s = m.pop() || "";
      for (const h of m)
        if (h.trim())
          try {
            const p = JSON.parse(h);
            if (p.stream)
              is(p.stream), n(p.stream);
            else {
              if (p.error)
                throw new Error(p.error);
              p.snapshot && (u = p);
            }
          } catch (p) {
            console.error("[LiVue Stream] Parse error:", p, h);
          }
    }
    if (s.trim())
      try {
        const c = JSON.parse(s);
        if (c.snapshot)
          u = c;
        else if (c.error)
          throw new Error(c.error);
      } catch (c) {
        console.error("[LiVue Stream] Final parse error:", c, s);
      }
    return i(u), u;
  } catch (o) {
    throw r(o), o;
  }
}
function is(t) {
  const { to: e, content: n, replace: i } = t, r = Li.get(e);
  if (!r) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = r;
  i ? o.innerHTML = n : o.innerHTML += n;
}
function Qi(t, e, n = !1) {
  Li.set(t, { el: e, replace: n });
}
function Zi(t) {
  Li.delete(t);
}
function rs(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function Ai(t) {
  let e = {};
  for (let n in t) {
    let i = t[n];
    rs(i) ? e[n] = i[0] : i && typeof i == "object" && !Array.isArray(i) ? e[n] = Ai(i) : e[n] = i;
  }
  return e;
}
function os(t, e) {
  let n = t.composables || {}, i = t.composableActions || {}, r = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(i)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = i[a] || {}, u = Ai(l), c = {};
    for (let d in s)
      c[d] = /* @__PURE__ */ (function(m, h) {
        return function() {
          let p = Array.prototype.slice.call(arguments);
          return e(m + "." + h, p);
        };
      })(a, d);
    r[a] = ze(Object.assign({}, u, c));
  }
  return r;
}
function as(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let i in n) {
    let r = Ai(n[i]);
    if (t[i])
      for (let o in r)
        typeof t[i][o] != "function" && (t[i][o] = r[o]);
  }
}
function ls(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
let er = 0, vo = /* @__PURE__ */ new Map();
function ss(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(i, r) {
    let o = { index: r };
    i.type === "checkbox" || i.type === "radio" ? o.checked = i.checked : i.tagName === "SELECT" ? (o.value = i.value, i.multiple && (o.selectedOptions = Array.from(i.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = i.value, e.push(o);
  }), e;
}
function us(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(i) {
    let r = n[i.index];
    r && (r.type === "checkbox" || r.type === "radio" ? r.checked = i.checked : r.tagName === "SELECT" && r.multiple && i.selectedOptions ? Array.from(r.options).forEach(function(o) {
      o.selected = i.selectedOptions.includes(o.value);
    }) : i.value !== void 0 && (r.value = i.value));
  });
}
function mo(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let i = n.getAttribute("data-livue-ignore-id"), r = n.hasAttribute("data-livue-ignore-self");
    vo.set(i, {
      html: n.innerHTML,
      isSelf: r,
      inputs: ss(n)
    });
  });
}
function ho(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let i = n.getAttribute("data-livue-ignore-id"), r = vo.get(i);
    r && (r.isSelf || (n.innerHTML = r.html), r.inputs && r.inputs.length > 0 && us(n, r.inputs));
  });
}
function Xt(t, e) {
  let n = {}, i = Rr(e);
  for (let r in i)
    JSON.stringify(i[r]) !== JSON.stringify(t[r]) && (n[r] = i[r]);
  return n;
}
function ds(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function xn(t) {
  let e = {};
  for (let n in t) {
    let i = t[n];
    ds(i) ? e[n] = i[0] : e[n] = i;
  }
  return e;
}
let go = {
  ref: _n,
  computed: Wo,
  watch: at,
  watchEffect: $o,
  reactive: ze,
  readonly: Bo,
  onMounted: Cr,
  onUnmounted: Tr,
  onBeforeMount: Fo,
  onBeforeUnmount: jo,
  nextTick: yi,
  provide: Ho,
  inject: Vo
}, _o = Object.keys(go), cs = _o.map(function(t) {
  return go[t];
});
function fs(t) {
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
function ps(t, e, n) {
  let i = Object.keys(e), r = i.map(function(l) {
    return e[l];
  }), o = _o.concat(i).concat(["livue"]), a = cs.concat(r).concat([n]);
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
function vs(t) {
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
  let i = /v-model\.blur=["']([^"']+)["']/g;
  t = t.replace(i, function(o, a) {
    return 'v-model="' + a + '" v-blur:' + a;
  });
  let r = /v-model\.enter=["']([^"']+)["']/g;
  return t = t.replace(r, function(o, a) {
    return 'v-model="' + a + '" v-enter:' + a;
  }), t;
}
function Lt(t, e, n, i, r, o) {
  let a = vs(t), l = fs(a);
  return {
    name: o || "LiVueComponent",
    template: l.html,
    setup: function() {
      let s = xa(e), u = Object.assign({}, s, i, { livue: n, livueV: r });
      if (l.setupCode) {
        let c = ps(l.setupCode, s, n);
        c && Object.assign(u, c);
      }
      return u;
    }
  };
}
function mi(t, e, n, i, r, o, a) {
  a = a || {};
  let l = Ca(), s = n.name, u = n.vueMethods || {}, c = n.confirms || {}, d = n.isolate || !1, m = n.urlParams || null, h = n.uploads || null, p = n.tabSync || null, g = !1, v = r, E = o;
  function T(f) {
    let x = document.querySelector('meta[name="livue-prefix"]'), w = "/" + (x ? x.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), _ = document.createElement("a");
    _.href = w, _.download = f.name, _.style.display = "none", document.body.appendChild(_), _.click(), document.body.removeChild(_);
  }
  function C() {
    let f = Xt(v, e);
    return {
      snapshot: E,
      diffs: f
    };
  }
  function N(f, x) {
    if (f.redirect) {
      wi(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let _ = f.errorBoundary;
      b.errorState.hasError = _.hasError, b.errorState.errorMessage = _.errorMessage, b.errorState.errorDetails = _.errorDetails, b.errorState.recover = _.recover, (!_.errorHandled || !_.recover) && ue("error.occurred", {
        error: new Error(_.errorMessage || "Component error"),
        componentName: s,
        componentId: t,
        context: { method: _.errorMethod, serverHandled: _.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && T(f.download), f.snapshot) {
      let _ = JSON.parse(f.snapshot);
      if (_.state) {
        let O = xn(_.state);
        Sa(e, O), v = JSON.parse(JSON.stringify(O));
      }
      E = f.snapshot, _.memo && (_.memo.errors ? we(b.errors, _.memo.errors) : ui(b.errors), _.memo.vueMethods && (u = _.memo.vueMethods), _.memo.urlParams && (m = _.memo.urlParams), _.memo.uploads && (h = _.memo.uploads), _.memo.confirms && (c = _.memo.confirms), (_.memo.composables || _.memo.composableActions) && as(A, _.memo));
    }
    if (m && Fl(m, e), f.html && i && i._updateTemplate) {
      let _ = {};
      if (f.snapshot) {
        let O = JSON.parse(f.snapshot);
        O.memo && (O.memo.transitionType && (_.transitionType = O.memo.transitionType), O.memo.skipTransition && (_.skipTransition = !0));
      }
      i._updateTemplate(f.html, _);
    }
    if (f.events && f.events.length > 0) {
      for (var S = 0; S < f.events.length; S++)
        f.events[S].sourceId = t;
      jl(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var w = 0; w < f.js.length; w++)
        try {
          new Function("state", "livue", f.js[w])(e, b);
        } catch (_) {
          console.error("[LiVue] Error executing ->vue() JS:", _);
        }
    if (p && p.enabled && f.snapshot && !g && JSON.parse(f.snapshot).state) {
      let O = Rr(e), z = [];
      for (let H in O)
        (!x || !(H in x)) && z.push(H);
      if (z.length > 0) {
        let H = Zl(O, z, p);
        Object.keys(H).length > 0 && Ql(s, H, z, p);
      }
    }
    if (g = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let L = ze({}), A = {}, V = function(f, x) {
    return b.call(f, x);
  };
  ls(n) && (A = os(n, V));
  let b = ze({
    loading: !1,
    processing: null,
    errors: l,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: L,
    refs: {},
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let x = Xt(v, e);
      return f === void 0 ? Object.keys(x).length > 0 : f in x;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = Xt(v, e);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(v)) : v[f] !== void 0 ? JSON.parse(JSON.stringify(v[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in v && (e[f] = JSON.parse(JSON.stringify(v[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in v)
        f in e && (e[f] = JSON.parse(JSON.stringify(v[f])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(f) {
      return f ? L[f] || !1 : b.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let x = f ? L[f] || !1 : b.loading;
      return {
        "aria-busy": x,
        disabled: x
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
    call: async function(f, x, S) {
      let w, _ = null;
      if (arguments.length === 1 ? w = [] : arguments.length === 2 ? Array.isArray(x) ? w = x : w = [x] : arguments.length >= 3 && (Array.isArray(x) && S && typeof S == "object" && (S.debounce || S.throttle) ? (w = x, _ = S) : w = Array.prototype.slice.call(arguments, 1)), u[f]) {
        try {
          new Function("state", "livue", u[f])(e, b);
        } catch (z) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', z);
        }
        return;
      }
      let O = async function() {
        if (c[f] && !await b._showConfirm(c[f]))
          return;
        b.loading = !0, b.processing = f, L[f] = !0;
        let z;
        try {
          let H = C(), ve = await Hi(H.snapshot, f, w, H.diffs, d);
          z = N(ve, H.diffs);
        } catch (H) {
          H.status === 422 && H.data && H.data.errors ? we(b.errors, H.data.errors) : ft(H, s);
        } finally {
          b.loading = !1, b.processing = null, delete L[f];
        }
        return z;
      };
      return _ && _.debounce ? qt(t + ":" + f, _.debounce)(O) : _ && _.throttle ? Vt(t + ":" + f, _.throttle)(O) : O();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, x) {
      let S = Array.prototype.slice.call(arguments, 2), w = { message: x || "Are you sure?" };
      if (await b._showConfirm(w))
        return b.call.apply(b, [f].concat(S));
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
    set: function(f, x) {
      e[f] = x;
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      b.loading = !0, b.processing = "$sync";
      try {
        let f = C(), x = await Hi(f.snapshot, null, [], f.diffs, d);
        N(x, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? we(b.errors, f.data.errors) : ft(f, s);
      } finally {
        b.loading = !1, b.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      ui(b.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, x) {
      un(f, x, "broadcast", s, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, x, S) {
      un(x, S, "to", s, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, x) {
      un(f, x, "self", s, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      Ht(f, !0);
    },
    /**
     * Upload a single file for a component property.
     * The file is sent to /livue/upload, and on success the property
     * is set to an upload reference that the server can hydrate.
     *
     * @param {string} property - The component property name
     * @param {File} file - The File object from the input
     */
    upload: async function(f, x) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      b.uploading = !0, b.uploadProgress = 0;
      try {
        var S = await co(x, s, f, h[f].token, function(w) {
          b.uploadProgress = w;
        });
        e[f] = {
          __livue_upload: !0,
          ref: S.ref,
          originalName: S.originalName,
          mimeType: S.mimeType,
          size: S.size,
          previewUrl: S.previewUrl
        };
      } catch (w) {
        w.status === 422 && w.data && w.data.errors ? we(b.errors, w.data.errors) : ft(w, s);
      } finally {
        b.uploading = !1, b.uploadProgress = 0;
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
    uploadMultiple: async function(f, x) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      b.uploading = !0, b.uploadProgress = 0;
      try {
        var S = await $l(x, s, f, h[f].token, function(w) {
          b.uploadProgress = w.overall;
        });
        e[f] = S.map(function(w) {
          return {
            __livue_upload: !0,
            ref: w.ref,
            originalName: w.originalName,
            mimeType: w.mimeType,
            size: w.size,
            previewUrl: w.previewUrl
          };
        });
      } catch (w) {
        w.status === 422 && w.data && w.data.errors ? we(b.errors, w.data.errors) : ft(w, s);
      } finally {
        b.uploading = !1, b.uploadProgress = 0;
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
    removeUpload: function(f, x) {
      x !== void 0 && Array.isArray(e[f]) ? e[f].splice(x, 1) : e[f] = null;
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(f, x) {
      x = x || [], b.loading = !0, b.streaming = !0, b.processing = f, b.streamingMethod = f, L[f] = !0;
      let S;
      try {
        let w = C();
        w.method = f, w.params = x, w.componentId = t;
        let _ = await ns(w, {
          onChunk: function(O) {
          },
          onComplete: function(O) {
          },
          onError: function(O) {
            console.error("[LiVue Stream] Error:", O);
          }
        });
        _ && (S = N(_, w.diffs));
      } catch (w) {
        w.status === 422 && w.data && w.data.errors ? we(b.errors, w.data.errors) : ft(w, s);
      } finally {
        b.loading = !1, b.streaming = !1, b.processing = null, b.streamingMethod = null, delete L[f];
      }
      return S;
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
    watch: function(f, x) {
      return typeof x != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : at(
        function() {
          return e[f];
        },
        function(S, w) {
          x(S, w);
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
      }) : (Na(t, f), function() {
        di(t);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: ze({
      hasError: !1,
      errorMessage: null,
      errorDetails: null,
      recover: !0
    }),
    /**
     * Clear the error state (used for recovery).
     */
    clearError: function() {
      b.errorState.hasError = !1, b.errorState.errorMessage = null, b.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(f, x) {
      v = JSON.parse(JSON.stringify(f)), E = x;
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
      let f = Xt(v, e), x = {};
      for (let S in A) {
        let w = A[S], _ = {}, O = [];
        for (let z in w)
          if (typeof w[z] == "function")
            O.push(z);
          else
            try {
              _[z] = JSON.parse(JSON.stringify(w[z]));
            } catch {
              _[z] = "[Unserializable]";
            }
        x[S] = { data: _, actions: O };
      }
      return {
        serverState: JSON.parse(JSON.stringify(v)),
        clientState: JSON.parse(JSON.stringify(e)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: s,
          isolate: d,
          urlParams: m,
          tabSync: p,
          hasUploads: !!h,
          uploadProps: h ? Object.keys(h) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(c),
          composableNames: Object.keys(A)
        },
        composables: x,
        uploading: b.uploading,
        uploadProgress: b.uploadProgress,
        streaming: b.streaming,
        streamingMethod: b.streamingMethod,
        errorState: {
          hasError: b.errorState.hasError,
          errorMessage: b.errorState.errorMessage
        }
      };
    }
  });
  for (let f in A)
    b[f] = A[f];
  return p && p.enabled && Kl(s, function(f, x, S) {
    let w = !1;
    if (S.reactive === !0)
      w = !0;
    else if (Array.isArray(S.reactive) && S.reactive.length > 0) {
      for (let _ in f)
        if (S.reactive.includes(_)) {
          w = !0;
          break;
        }
    }
    if (w) {
      for (let _ in f)
        S.only && !S.only.includes(_) || S.except && S.except.includes(_) || _ in e && (e[_] = f[_]);
      g = !0, b.sync();
      return;
    }
    for (let _ in f)
      S.only && !S.only.includes(_) || S.except && S.except.includes(_) || _ in e && (e[_] = f[_]);
    for (let _ in f)
      S.only && !S.only.includes(_) || S.except && S.except.includes(_) || (v[_] = JSON.parse(JSON.stringify(f[_])));
  }), { livue: b, composables: A };
}
function dn(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let i = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < i.length; s++)
    i[s].innerHTML = "";
  let r = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, c = s.dataset.livueSnapshot || "{}", d = JSON.parse(c), m = d.memo ? d.memo.name : "", h = xn(d.state || {}), p = d.memo || {}, g = s.innerHTML, v = e._childRegistry[u];
    if (!v)
      for (let b in e._childRegistry) {
        let f = e._childRegistry[b];
        if (f.name === m && !o[b]) {
          v = f;
          break;
        }
      }
    if (v) {
      o[v.id] = !0;
      let b = p.reactive || [];
      if (b.length > 0) {
        for (var E = 0; E < b.length; E++) {
          var T = b[E];
          T in h && (v.state[T] = h[T]);
        }
        v.livue._updateServerState(h, c), v.componentRef && v.componentRef._updateTemplate && v.componentRef._updateTemplate(g);
      }
    }
    let C = !v;
    if (!v) {
      er++;
      let b = "livue-child-" + er, f = li(h), x = JSON.parse(JSON.stringify(h)), S = Object.assign({ name: p.name || m }, p), w = { _updateTemplate: null }, _ = Mr(), O = mi(u, f, S, w, x, c, {
        el: s,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: _
      }), z = O.livue, H = O.composables;
      ue("component.init", {
        component: { id: u, name: m, state: f, livue: z },
        el: s,
        cleanup: _.cleanup,
        isChild: !0
      });
      let ve = p.errors || null;
      ve && we(z.errors, ve), v = {
        tagName: b,
        state: f,
        memo: S,
        livue: z,
        composables: H,
        componentRef: w,
        name: m,
        id: u
      };
      let me = p.listeners || null;
      if (me)
        for (let He in me)
          (function(he, ge) {
            wn(He, m, u, function(ct) {
              ge.call(he, ct);
            });
          })(me[He], z);
      let dt = p.echo || null;
      dt && dt.length && (function(He, he) {
        qr(He, dt, function(ge, ct) {
          he.call(ge, ct);
        });
      })(u, z), w._updateTemplate = function(He) {
        let he = e.el.querySelector('[data-livue-id="' + u + '"]');
        he && mo(he);
        let ge = dn(He, e), ct = '<div data-livue-id="' + u + '">' + ge.template + "</div>";
        for (let Ye in ge.childDefs)
          e.vueApp._context.components[Ye] || e.vueApp.component(Ye, ge.childDefs[Ye]);
        e.vueApp._context.components[v.tagName] = Lt(ct, v.state, v.livue, v.composables || {}, e._versions, v.name), e._versions[v.tagName] = (e._versions[v.tagName] || 0) + 1, yi(function() {
          let Ye = e.el.querySelector('[data-livue-id="' + u + '"]');
          Ye && ho(Ye);
        });
      }, e._childRegistry[u] = v;
    }
    let N = v.tagName, L = s.dataset.livueRef;
    L && e._rootLivue && (e._rootLivue.refs[L] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(b, f) {
        return v.livue.call(b, f || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(b, f) {
        return v.livue.set(b, f);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(b, f) {
        return v.livue.dispatch(b, f);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return v.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return v.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return v.livue;
      }
    });
    let A = s.dataset.livueModel;
    A && e._rootState && wn("$modelUpdate", v.name, u, function(b) {
      b && b.value !== void 0 && (e._rootState[A] = b.value);
    }), C && (r[N] = Lt(
      '<div data-livue-id="' + u + '">' + g + "</div>",
      v.state,
      v.livue,
      v.composables || {},
      e._versions,
      v.name
    )), e._versions[N] === void 0 && (e._versions[N] = 0);
    let V = document.createElement(N);
    V.setAttribute(":key", "livueV['" + N + "']"), s.parentNode.replaceChild(V, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: r
  };
}
class ms {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", i = JSON.parse(n);
    this.name = i.memo ? i.memo.name : "", this.state = li(xn(i.state || {})), this.memo = i.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = ze({}), this._rootDefRef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: mi,
      buildComponentDef: Lt,
      processTemplate: dn,
      createReactiveState: li
    }, this._mount(i, n);
  }
  /**
   * Mount the Vue app shell. The root component is rendered via
   * <component :is> so its template can be swapped independently
   * without unmounting the Vue app.
   */
  _mount(e, n) {
    let i = this, r = {
      /**
       * Update the component template with new HTML.
       * @param {string} newInnerHtml - The new HTML content
       * @param {object} [options] - Transition options
       * @param {string} [options.transitionType] - Transition type (e.g., 'forward', 'backward')
       * @param {boolean} [options.skipTransition] - Skip the View Transition
       */
      _updateTemplate: function(g, v) {
        v = v || {}, ue("template.updating", {
          component: { id: i.componentId, name: i.name, state: i.state, livue: i._rootLivue },
          el: i.el,
          html: g
        }), mo(i.el);
        let E = dn(g, i);
        for (let C in E.childDefs)
          i.vueApp._context.components[C] || i.vueApp.component(C, E.childDefs[C]);
        function T() {
          i._rootDefRef.value = Lt(E.template, i.state, i._rootLivue, i._rootComposables || {}, i._versions, i.name), yi(function() {
            ho(i.el), ue("template.updated", {
              component: { id: i.componentId, name: i.name, state: i.state, livue: i._rootLivue },
              el: i.el
            });
          });
        }
        if (v.skipTransition) {
          T();
          return;
        }
        vi() ? ts(T, { type: v.transitionType }) : T();
      }
    }, o = JSON.parse(JSON.stringify(xn(e.state || {})));
    this._cleanups = Mr();
    let a = mi(this.componentId, this.state, this.memo, r, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, ue("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u = dn(this.el.innerHTML, this), c = e.memo && e.memo.errors || null;
    c && we(l.errors, c);
    let d = e.memo && e.memo.listeners || null;
    if (d)
      for (let g in d)
        (function(v, E, T, C) {
          wn(g, T, C, function(N) {
            E.call(v, N);
          });
        })(d[g], l, i.name, i.componentId);
    let m = e.memo && e.memo.echo || null;
    m && m.length && (this._echoUnsubscribe = qr(i.componentId, m, function(g, v) {
      l.call(g, v);
    }));
    let h = Lt(u.template, i.state, l, s, i._versions, i.name);
    this._rootDefRef = xr(h), this.vueApp = Uo({
      setup: function() {
        return {
          rootDef: i._rootDefRef
        };
      },
      template: '<component :is="rootDef"></component>'
    });
    let p;
    for (p in u.childDefs)
      this.vueApp._context.components[p] || this.vueApp.component(p, u.childDefs[p]);
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", Xl(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, i = Ul();
    if (n.use(i), window.LiVue && window.LiVue._setupCallback)
      try {
        let o = window.LiVue._setupCallback(n);
        o && typeof o.then == "function" && await o;
      } catch (o) {
        console.error("[LiVue] Error in setup() callback:", o);
      }
    let r = Ia();
    for (let o = 0; o < r.length; o++)
      n.directive(r[o].name, r[o].directive);
    e.el.innerHTML = "", e.vueApp.mount(e.el);
  }
  /**
   * Destroy the Vue app instance and clean up event listeners.
   */
  destroy() {
    for (let e in this._childRegistry) {
      let n = this._childRegistry[e];
      ue("component.destroy", {
        component: { id: e, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Wi(e), Ji(e), di(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Yi(n.name), Fi(e);
    }
    ue("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Wi(this.componentId), Ji(this.componentId), di(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Yi(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Fi(this.componentId), this.vueApp && (this.vueApp.unmount(), this.vueApp = null);
  }
}
let tr = /* @__PURE__ */ new Set();
function hs(t) {
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
const gs = {
  mounted(t, e, n) {
    let i = hs(n);
    if (!i) {
      console.warn("[LiVue] v-init: livue helper not found in component context");
      return;
    }
    let r = t.closest("[data-livue-id]"), o = r ? r.dataset.livueId : null, a = e.value, l, s = [];
    if (Array.isArray(a) ? (l = a[0], s = a[1] || []) : l = a, typeof l != "string") {
      console.warn("[LiVue] v-init: expected method name (string), got", typeof l);
      return;
    }
    let u = (o || "unknown") + ":" + l;
    tr.has(u) || (tr.add(u), i.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Vn = /* @__PURE__ */ new WeakMap();
function _s(t) {
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
const bs = {
  mounted(t, e, n) {
    t.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + t.tagName.toLowerCase() + ">");
    let i = _s(n);
    if (!i) {
      console.warn("[LiVue] v-submit: livue helper not found in component context");
      return;
    }
    let r = e.value, o, a = [];
    if (Array.isArray(r) ? (o = r[0], a = r[1] || []) : o = r, typeof o != "string") {
      console.warn("[LiVue] v-submit: expected method name (string), got", typeof o);
      return;
    }
    let l = function(s) {
      s.preventDefault(), i.call(o, a);
    };
    t.addEventListener("submit", l), Vn.set(t, l);
  },
  unmounted(t) {
    let e = Vn.get(t);
    e && (t.removeEventListener("submit", e), Vn.delete(t));
  }
}, Yt = /* @__PURE__ */ new WeakMap();
function ys(t) {
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
const ws = {
  mounted(t, e, n) {
    let i = ys(n);
    if (!i) {
      console.warn("[LiVue] v-intersect: livue helper not found in component context");
      return;
    }
    let r = e.value, o, a = [];
    if (Array.isArray(r) ? (o = r[0], a = r[1] || []) : o = r, typeof o != "string") {
      console.warn("[LiVue] v-intersect: expected method name (string), got", typeof o);
      return;
    }
    let l = e.modifiers || {}, s = e.arg, u = 0;
    l.half && (u = 0.5), l.full && (u = 1);
    let c = "0px";
    if (s) {
      let p = parseInt(s, 10);
      isNaN(p) || (c = p + "px");
    }
    let d = l.leave === !0, m = !1, h = new IntersectionObserver(
      function(p) {
        let g = p[0];
        (d ? !g.isIntersecting : g.isIntersecting) && (!l.once || !m) && (m = !0, i.call(o, a), l.once && (h.disconnect(), Yt.delete(t)));
      },
      {
        threshold: u,
        rootMargin: c
      }
    );
    h.observe(t), Yt.set(t, h);
  },
  unmounted(t) {
    let e = Yt.get(t);
    e && (e.disconnect(), Yt.delete(t));
  }
}, Hn = /* @__PURE__ */ new WeakMap();
function jn(t, e) {
  let n = t.getAttribute("href");
  if (!n)
    return;
  let i = e.value, r = e.modifiers || {}, o = window.location.pathname, a;
  try {
    a = new URL(n, window.location.origin).pathname;
  } catch {
    return;
  }
  let l = !1;
  if (r.strict)
    l = o === a;
  else if (r.exact) {
    let s = o.replace(/\/$/, "") || "/", u = a.replace(/\/$/, "") || "/";
    l = s === u;
  } else {
    let s = a.replace(/\/$/, "") || "/";
    s === "/" ? l = o === "/" : l = o === s || o.startsWith(s + "/");
  }
  if (typeof i == "string") {
    let s = i.split(" ").filter(function(u) {
      return u.trim();
    });
    l ? (s.forEach(function(u) {
      t.classList.add(u);
    }), t.setAttribute("data-current", "")) : (s.forEach(function(u) {
      t.classList.remove(u);
    }), t.removeAttribute("data-current"));
  }
}
const Es = {
  mounted(t, e) {
    jn(t, e);
    let n = function() {
      jn(t, e);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), Hn.set(t, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(t, e) {
    jn(t, e);
  },
  unmounted(t, e) {
    let n = e.value;
    typeof n == "string" && n.split(" ").filter(function(r) {
      return r.trim();
    }).forEach(function(r) {
      t.classList.remove(r);
    }), t.removeAttribute("data-current");
    let i = Hn.get(t);
    i && (i(), Hn.delete(t));
  }
};
let nr = 0;
const Ss = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    nr++;
    let n = "livue-ignore-" + nr;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, vt = /* @__PURE__ */ new WeakMap();
let ir = 0;
function xs(t) {
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
function Cs(t) {
  let e = 0, n = 0, i = !1, r = !1, o = 0;
  for (let a in t) {
    if (a === "debounce") {
      i = !0;
      continue;
    }
    if (a === "throttle") {
      r = !0;
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
  return i && o > 0 && (e = o), r && o > 0 && (n = o), i && e === 0 && (e = 150), r && n === 0 && (n = 150), { debounceMs: e, throttleMs: n };
}
function Gt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function rr(t, e) {
  if (t.type === "checkbox")
    t.checked = !!e;
  else if (t.type === "radio")
    t.checked = t.value === String(e);
  else if (t.tagName === "SELECT" && t.multiple) {
    let n = Array.isArray(e) ? e.map(String) : [String(e)];
    Array.from(t.options).forEach(function(i) {
      i.selected = n.includes(i.value);
    });
  } else
    t.value !== String(e || "") && (t.value = e || "");
}
function Ts(t) {
  return !!t.component;
}
const Ns = {
  mounted(t, e, n) {
    let i = xs(n);
    if (!i) {
      console.warn("[LiVue] v-model-livue: livue helper not found in component context");
      return;
    }
    let { livue: r, state: o } = i, a = e.arg;
    if (!a) {
      console.warn("[LiVue] v-model-livue requires property name as argument (v-model-livue:propertyName)");
      return;
    }
    let l = e.modifiers || {};
    ir++;
    let s = "model-" + ir, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: c, throttleMs: d } = Cs(l);
    l.live && !c && !d && (c = 150);
    function m(L) {
      if (l.number) {
        let A = Number(L);
        L = isNaN(A) ? 0 : A;
      }
      l.boolean && (L = !!L && L !== "false" && L !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = L : o[a] = L;
    }
    function h(L) {
      c > 0 ? qt(s, c)(function() {
        m(L);
      }) : d > 0 ? Vt(s, d)(function() {
        m(L);
      }) : m(L);
    }
    let p;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? p = o[a].value : p = o[a];
    let g = Ts(n), v = n.component, E = null, T = null, C = null, N = null;
    if (g && v)
      N = v.emit, v.emit = function(L, ...A) {
        if (L === "update:modelValue") {
          let V = A[0];
          h(V);
          return;
        }
        return N.call(v, L, ...A);
      }, v.props && "modelValue" in v.props && (C = at(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(L) {
          v.vnode && v.vnode.props && (v.vnode.props.modelValue = L), v.exposed && typeof v.exposed.setValue == "function" && v.exposed.setValue(L), v.update && v.update();
        },
        { immediate: !0 }
      )), vt.set(t, {
        isComponent: !0,
        componentInstance: v,
        originalEmit: N,
        stopWatcher: C,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (c > 0) {
        let L = qt(s, c);
        E = function(A) {
          let V = Gt(A.target);
          L(function() {
            m(V);
          });
        };
      } else if (d > 0) {
        let L = Vt(s, d);
        E = function(A) {
          let V = Gt(A.target);
          L(function() {
            m(V);
          });
        };
      } else
        E = function(L) {
          m(Gt(L.target));
        };
      l.enter ? (T = function(L) {
        L.key === "Enter" && m(Gt(L.target));
      }, t.addEventListener("keyup", T)) : t.addEventListener(u, E), rr(t, p), vt.set(t, {
        isComponent: !1,
        handler: E,
        keyHandler: T,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(t, e, n) {
    let i = vt.get(t);
    if (i && !i.isComponent) {
      let { property: r, state: o } = i, a;
      o[r] && typeof o[r] == "object" && "value" in o[r] ? a = o[r].value : a = o[r], rr(t, a);
    }
  },
  unmounted(t) {
    let e = vt.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), vt.delete(t));
  }
}, Fn = /* @__PURE__ */ new WeakMap(), Ls = 2500;
function As(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let i = e.match(/^(\d+)ms$/);
    if (i)
      return parseInt(i[1], 10);
  }
  return Ls;
}
function ks(t) {
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
const Ds = {
  mounted(t, e, n) {
    let i = ks(n);
    if (!i) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let r = e.value, o = null, a = [];
    Array.isArray(r) ? (o = r[0], a = r[1] || []) : typeof r == "string" && (o = r);
    let l = e.modifiers || {}, s = As(l), u = l["keep-alive"] === !0, c = l.visible === !0, d = {
      intervalId: null,
      observer: null,
      isVisible: !c,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function m() {
      d.isPaused || c && !d.isVisible || (o ? i.call(o, a) : i.call("$refresh", []));
    }
    function h() {
      d.intervalId || (d.intervalId = setInterval(m, s));
    }
    function p() {
      u || (document.hidden ? d.isPaused = !0 : d.isPaused = !1);
    }
    c && (d.observer = new IntersectionObserver(
      function(g) {
        d.isVisible = g[0].isIntersecting;
      },
      { threshold: 0 }
    ), d.observer.observe(t)), document.addEventListener("visibilitychange", p), d.visibilityHandler = p, h(), Fn.set(t, d);
  },
  unmounted(t) {
    let e = Fn.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), Fn.delete(t));
  }
}, Kt = /* @__PURE__ */ new WeakMap();
let Cn = typeof navigator < "u" ? navigator.onLine : !0, Tn = /* @__PURE__ */ new Set(), or = !1;
function Is() {
  or || typeof window > "u" || (or = !0, window.addEventListener("online", function() {
    Cn = !0, Tn.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    Cn = !1, Tn.forEach(function(t) {
      t(!1);
    });
  }));
}
const Ms = {
  created(t, e) {
    Is();
    let n = e.modifiers || {}, i = e.value, r = "visibility";
    n.class ? r = n.remove ? "class-remove" : "class-add" : n.attr && (r = "attr");
    let o = {
      mode: r,
      value: i,
      originalDisplay: null
    };
    r === "visibility" && (o.originalDisplay = t.style.display || "", Cn && (t.style.display = "none")), Kt.set(t, o);
  },
  mounted(t, e) {
    let n = Kt.get(t);
    if (!n)
      return;
    function i(r) {
      let o = !r;
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
    i(Cn), n.updateFn = i, Tn.add(i);
  },
  unmounted(t) {
    let e = Kt.get(t);
    e && e.updateFn && Tn.delete(e.updateFn), Kt.delete(t);
  }
};
let ar = 0;
const mt = /* @__PURE__ */ new WeakMap(), Bn = /* @__PURE__ */ new Map(), Os = {
  created(t, e) {
    ar++;
    let n = "livue-replace-" + ar, i = e.modifiers.self === !0;
    mt.set(t, {
      id: n,
      isSelf: i,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), i && t.setAttribute("data-livue-replace-self", ""), Bn.set(n, 0);
  },
  mounted(t, e) {
    let n = mt.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = mt.get(t);
    n && (n.version++, Bn.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = mt.get(t);
    e && Bn.delete(e.id), mt.delete(t);
  }
}, ht = /* @__PURE__ */ new WeakMap(), lr = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Ps = 200;
function Rs(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(lr))
    if (t[e])
      return lr[e];
  return Ps;
}
function zs(t) {
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
function $n(t, e, n, i, r) {
  if (n.remove) {
    r ? t.style.display = "none" : t.style.display = e.originalDisplay;
    return;
  }
  if (n.class) {
    let o = (i || "").split(" ").filter(Boolean);
    r ? o.forEach(function(a) {
      e.addedClasses.includes(a) || (t.classList.add(a), e.addedClasses.push(a));
    }) : (e.addedClasses.forEach(function(a) {
      t.classList.remove(a);
    }), e.addedClasses = []);
    return;
  }
  if (n.attr) {
    let o = i || "disabled";
    r ? (t.setAttribute(o, ""), e.addedAttr = o) : e.addedAttr && (t.removeAttribute(e.addedAttr), e.addedAttr = null);
    return;
  }
  r ? t.style.display = e.originalDisplay || "" : t.style.display = "none";
}
const qs = {
  created(t, e) {
    let n = t.style.display;
    ht.set(t, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      delayTimer: null,
      stopWatch: null,
      isActive: !1
    });
    let i = e.modifiers || {};
    !i.remove && !i.class && !i.attr && (t.style.display = "none");
  },
  mounted(t, e, n) {
    let i = zs(n);
    if (!i) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let r = ht.get(t), o = e.modifiers || {}, a = Rs(o), l = e.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function c(d) {
      r.delayTimer && (clearTimeout(r.delayTimer), r.delayTimer = null), d && a > 0 ? r.delayTimer = setTimeout(function() {
        r.isActive = !0, $n(t, r, o, u, !0);
      }, a) : d ? (r.isActive = !0, $n(t, r, o, u, !0)) : (r.isActive = !1, $n(t, r, o, u, !1));
    }
    r.stopWatch = at(
      function() {
        return s ? i.isLoading(s) : i.loading;
      },
      c,
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    ht.get(t);
  },
  unmounted(t) {
    let e = ht.get(t);
    e && (e.delayTimer && clearTimeout(e.delayTimer), e.stopWatch && e.stopWatch(), ht.delete(t));
  }
}, Qt = /* @__PURE__ */ new WeakMap();
function sr(t) {
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
const Vs = {
  mounted(t, e, n) {
    let i = sr(n);
    if (!i) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let r = e.value;
    if (!r) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = at(
      function() {
        return i.isLoading(r);
      },
      function(a) {
        a ? t.setAttribute("data-loading", "") : t.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    Qt.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let i = Qt.get(t), r = sr(n);
    if (!i || !r) return;
    let o = e.value, a = e.oldValue;
    o !== a && (i.stopWatch && i.stopWatch(), i.stopWatch = at(
      function() {
        return r.isLoading(o);
      },
      function(l) {
        l ? t.setAttribute("data-loading", "") : t.removeAttribute("data-loading");
      },
      { immediate: !0 }
    ));
  },
  unmounted(t) {
    let e = Qt.get(t);
    e && (e.stopWatch && e.stopWatch(), Qt.delete(t));
  }
}, gt = /* @__PURE__ */ new WeakMap(), Hs = {
  /**
   * Called when directive is first bound to the element.
   */
  mounted(t, e) {
    const n = e.value;
    if (!n || typeof n != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", n);
      return;
    }
    const i = e.modifiers.replace || !1;
    gt.set(t, { targetId: n }), Qi(n, t, i);
  },
  /**
   * Called when the binding value changes.
   */
  updated(t, e) {
    const n = gt.get(t), i = e.value;
    if (!i || typeof i != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", i);
      return;
    }
    if (n && n.targetId !== i) {
      Zi(n.targetId);
      const r = e.modifiers.replace || !1;
      Qi(i, t, r), gt.set(t, { targetId: i });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = gt.get(t);
    e && (Zi(e.targetId), gt.delete(t));
  }
}, Wn = /* @__PURE__ */ new WeakMap();
let ur = 0;
function js(t, e = 250) {
  for (let n in t) {
    let i = n.match(/^(\d+)(ms)?$/);
    if (i)
      return parseInt(i[1], 10);
  }
  return e;
}
function Fs(t) {
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
const Bs = {
  mounted(t, e, n) {
    const { arg: i, modifiers: r } = e, o = Fs(n);
    if (!o) {
      console.warn("[LiVue] v-click: livue helper not found in component context");
      return;
    }
    ur++;
    const a = "v-click-" + ur, l = js(r);
    let s = null, u = null;
    r.debounce && (s = qt(a, l)), r.throttle && (u = Vt(a, l));
    let c = !1, d = null;
    i && (d = i);
    const m = function(v) {
      let E = d, T = [];
      if (i) {
        E = i;
        const N = e.value;
        N != null && (T = Array.isArray(N) ? N : [N]);
      } else {
        const N = e.value;
        typeof N == "string" ? E = N : Array.isArray(N) && N.length > 0 && (E = N[0], T = N.slice(1));
      }
      if (!E) {
        console.warn("[LiVue] v-click: no method specified");
        return;
      }
      const C = function() {
        o.call(E, ...T);
      };
      s ? s(C) : u ? u(C) : C();
    }, h = function(v) {
      if (!(r.self && v.target !== t)) {
        if (r.once) {
          if (c)
            return;
          c = !0;
        }
        r.prevent && v.preventDefault(), r.stop && v.stopPropagation(), m();
      }
    }, p = {};
    r.capture && (p.capture = !0), r.passive && (p.passive = !0);
    const g = {
      handler: h,
      options: p,
      outsideHandler: null
    };
    if (r.outside) {
      const v = function(E) {
        if (!t.contains(E.target) && E.target !== t) {
          if (r.once) {
            if (c)
              return;
            c = !0;
          }
          m();
        }
      };
      document.addEventListener("click", v, p), g.outsideHandler = v;
    } else
      t.addEventListener("click", h, p);
    Wn.set(t, g);
  },
  updated(t, e, n) {
  },
  unmounted(t) {
    const e = Wn.get(t);
    e && (e.outsideHandler ? document.removeEventListener("click", e.outsideHandler, e.options) : t.removeEventListener("click", e.handler, e.options), Wn.delete(t));
  }
};
var Un = /* @__PURE__ */ new WeakMap();
function $s(t, e) {
  if (!(t.metaKey || t.ctrlKey || t.shiftKey || t.altKey) && t.button === 0) {
    var n = e.getAttribute("href");
    if (n) {
      try {
        var i = new URL(n, window.location.origin);
        if (i.origin !== window.location.origin)
          return;
      } catch {
        return;
      }
      n.startsWith("#") || n.startsWith("javascript:") || e.hasAttribute("download") || e.getAttribute("target") !== "_blank" && (t.preventDefault(), Ht(n, !0, !1));
    }
  }
}
const Ws = {
  mounted(t, e) {
    if (t.tagName !== "A") {
      console.warn("[LiVue] v-navigate should only be used on <a> elements");
      return;
    }
    var n = e.modifiers || {};
    t.setAttribute("data-livue-navigate", "true"), (n.hover || n.prefetch) && t.setAttribute("data-livue-navigate-mode", "hover");
    var i = function(r) {
      $s(r, t);
    };
    t.addEventListener("click", i), Un.set(t, function() {
      t.removeEventListener("click", i);
    });
  },
  unmounted(t) {
    var e = Un.get(t);
    e && (e(), Un.delete(t)), t.removeAttribute("data-livue-navigate"), t.removeAttribute("data-livue-navigate-mode");
  }
}, At = /* @__PURE__ */ new WeakMap();
let dr = 0;
function Us(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function Js(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function Xs(t, e) {
  let n = t.instance;
  if (n) {
    let o = n.$ || n._ || n;
    if (o.setupState && o.setupState.livue)
      return { state: o.setupState };
    if (n.livue)
      return { state: o.setupState || n };
  }
  let i = e.ctx;
  if (i && i.setupState && i.setupState.livue)
    return { state: i.setupState };
  if (i && i.parent && i.parent.setupState && i.parent.setupState.livue)
    return { state: i.parent.setupState };
  let r = i ? i.parent : null;
  for (; r; ) {
    if (r.setupState && r.setupState.livue)
      return { state: r.setupState };
    r = r.parent;
  }
  return null;
}
function Ft(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Bt(t, e, n) {
  let i = t[e];
  i && typeof i == "object" && "value" in i ? i.value = n : t[e] = n;
}
function bo(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Ys(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let i in t)
    if (i.toLowerCase() === n)
      return i;
  return null;
}
function Gs(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function Ks(t) {
  return Gs(t) ? t : t.querySelector("input, textarea, select");
}
function $t(t, e) {
  return {
    mounted(n, i, r) {
      if (Us(r) && !Js(r))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = i.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = Xs(i, r);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: l } = a, s = Ys(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = i.modifiers || {};
      dr++;
      let c = t + "-" + dr, d = Ks(n);
      if (!d) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let m = e(d, s, l, u, c);
      d.addEventListener(m.eventType, m.handler, { capture: !0 }), At.set(n, {
        targetEl: d,
        handler: m.handler,
        eventType: m.eventType
      });
    },
    unmounted(n) {
      let i = At.get(n);
      i && (i.targetEl.removeEventListener(i.eventType, i.handler, { capture: !0 }), At.delete(n));
    }
  };
}
const Qs = $t("debounce", function(t, e, n, i, r) {
  let o = bo(i) || 150, a = qt(r, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = Ft(l.target);
      a(function() {
        Bt(n, e, s);
      });
    }
  };
}), Zs = $t("throttle", function(t, e, n, i, r) {
  let o = bo(i) || 150, a = Vt(r, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = Ft(l.target);
      a(function() {
        Bt(n, e, s);
      });
    }
  };
}), ki = $t("blur", function(t, e, n, i, r) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Bt(n, e, Ft(l.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), eu = ki.unmounted;
ki.unmounted = function(t) {
  let e = At.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), eu(t);
};
const Di = $t("enter", function(t, e, n, i, r) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Bt(n, e, Ft(l.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), tu = Di.unmounted;
Di.unmounted = function(t) {
  let e = At.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), tu(t);
};
const nu = $t("boolean", function(t, e, n, i, r) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = Ft(o.target);
      a = !!a && a !== "false" && a !== "0", Bt(n, e, a);
    }
  };
});
function cr(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function pe(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? cr(Object(n), !0).forEach(function(i) {
      iu(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : cr(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function cn(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? cn = function(e) {
    return typeof e;
  } : cn = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, cn(t);
}
function iu(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Le() {
  return Le = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Le.apply(this, arguments);
}
function ru(t, e) {
  if (t == null) return {};
  var n = {}, i = Object.keys(t), r, o;
  for (o = 0; o < i.length; o++)
    r = i[o], !(e.indexOf(r) >= 0) && (n[r] = t[r]);
  return n;
}
function ou(t, e) {
  if (t == null) return {};
  var n = ru(t, e), i, r;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (r = 0; r < o.length; r++)
      i = o[r], !(e.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(t, i) && (n[i] = t[i]);
  }
  return n;
}
var au = "1.15.6";
function Te(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var Ae = Te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Wt = Te(/Edge/i), fr = Te(/firefox/i), kt = Te(/safari/i) && !Te(/chrome/i) && !Te(/android/i), Ii = Te(/iP(ad|od|hone)/i), yo = Te(/chrome/i) && Te(/android/i), wo = {
  capture: !1,
  passive: !1
};
function R(t, e, n) {
  t.addEventListener(e, n, !Ae && wo);
}
function P(t, e, n) {
  t.removeEventListener(e, n, !Ae && wo);
}
function Nn(t, e) {
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
function Eo(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function se(t, e, n, i) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && Nn(t, e) : Nn(t, e)) || i && t === n)
        return t;
      if (t === n) break;
    } while (t = Eo(t));
  }
  return null;
}
var pr = /\s+/g;
function te(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var i = (" " + t.className + " ").replace(pr, " ").replace(" " + e + " ", " ");
      t.className = (i + (n ? " " + e : "")).replace(pr, " ");
    }
}
function D(t, e, n) {
  var i = t && t.style;
  if (i) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in i) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), i[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function ot(t, e) {
  var n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      var i = D(t, "transform");
      i && i !== "none" && (n = i + " " + n);
    } while (!e && (t = t.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function So(t, e, n) {
  if (t) {
    var i = t.getElementsByTagName(e), r = 0, o = i.length;
    if (n)
      for (; r < o; r++)
        n(i[r], r);
    return i;
  }
  return [];
}
function fe() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function U(t, e, n, i, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, a, l, s, u, c, d;
    if (t !== window && t.parentNode && t !== fe() ? (o = t.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, c = o.height, d = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, d = window.innerWidth), (e || n) && t !== window && (r = r || t.parentNode, !Ae))
      do
        if (r && r.getBoundingClientRect && (D(r, "transform") !== "none" || n && D(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(D(r, "border-top-width")), l -= m.left + parseInt(D(r, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (r = r.parentNode);
    if (i && t !== window) {
      var h = ot(r || t), p = h && h.a, g = h && h.d;
      h && (a /= g, l /= p, d /= p, c /= g, s = a + c, u = l + d);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: d,
      height: c
    };
  }
}
function vr(t, e, n) {
  for (var i = Re(t, !0), r = U(t)[e]; i; ) {
    var o = U(i)[n], a = void 0;
    if (a = r >= o, !a) return i;
    if (i === fe()) break;
    i = Re(i, !1);
  }
  return !1;
}
function st(t, e, n, i) {
  for (var r = 0, o = 0, a = t.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== I.ghost && (i || a[o] !== I.dragged) && se(a[o], n.draggable, t, !1)) {
      if (r === e)
        return a[o];
      r++;
    }
    o++;
  }
  return null;
}
function Mi(t, e) {
  for (var n = t.lastElementChild; n && (n === I.ghost || D(n, "display") === "none" || e && !Nn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function re(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== I.clone && (!e || Nn(t, e)) && n++;
  return n;
}
function mr(t) {
  var e = 0, n = 0, i = fe();
  if (t)
    do {
      var r = ot(t), o = r.a, a = r.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== i && (t = t.parentNode));
  return [e, n];
}
function lu(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var i in e)
        if (e.hasOwnProperty(i) && e[i] === t[n][i]) return Number(n);
    }
  return -1;
}
function Re(t, e) {
  if (!t || !t.getBoundingClientRect) return fe();
  var n = t, i = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = D(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return fe();
        if (i || e) return n;
        i = !0;
      }
    }
  while (n = n.parentNode);
  return fe();
}
function su(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Jn(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var Dt;
function xo(t, e) {
  return function() {
    if (!Dt) {
      var n = arguments, i = this;
      n.length === 1 ? t.call(i, n[0]) : t.apply(i, n), Dt = setTimeout(function() {
        Dt = void 0;
      }, e);
    }
  };
}
function uu() {
  clearTimeout(Dt), Dt = void 0;
}
function Co(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function To(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function No(t, e, n) {
  var i = {};
  return Array.from(t.children).forEach(function(r) {
    var o, a, l, s;
    if (!(!se(r, e.draggable, t, !1) || r.animated || r === n)) {
      var u = U(r);
      i.left = Math.min((o = i.left) !== null && o !== void 0 ? o : 1 / 0, u.left), i.top = Math.min((a = i.top) !== null && a !== void 0 ? a : 1 / 0, u.top), i.right = Math.max((l = i.right) !== null && l !== void 0 ? l : -1 / 0, u.right), i.bottom = Math.max((s = i.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
var ee = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function du() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(r) {
          if (!(D(r, "display") === "none" || r === I.ghost)) {
            t.push({
              target: r,
              rect: U(r)
            });
            var o = pe({}, t[t.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = ot(r, !0);
              a && (o.top -= a.f, o.left -= a.e);
            }
            r.fromRect = o;
          }
        });
      }
    },
    addAnimationState: function(i) {
      t.push(i);
    },
    removeAnimationState: function(i) {
      t.splice(lu(t, {
        target: i
      }), 1);
    },
    animateAll: function(i) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof i == "function" && i();
        return;
      }
      var o = !1, a = 0;
      t.forEach(function(l) {
        var s = 0, u = l.target, c = u.fromRect, d = U(u), m = u.prevFromRect, h = u.prevToRect, p = l.rect, g = ot(u, !0);
        g && (d.top -= g.f, d.left -= g.e), u.toRect = d, u.thisAnimationDuration && Jn(m, d) && !Jn(c, d) && // Make sure animatingRect is on line between toRect & fromRect
        (p.top - d.top) / (p.left - d.left) === (c.top - d.top) / (c.left - d.left) && (s = fu(p, m, h, r.options)), Jn(d, c) || (u.prevFromRect = c, u.prevToRect = d, s || (s = r.options.animation), r.animate(u, p, d, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof i == "function" && i();
      }, a) : typeof i == "function" && i(), t = [];
    },
    animate: function(i, r, o, a) {
      if (a) {
        D(i, "transition", ""), D(i, "transform", "");
        var l = ot(this.el), s = l && l.a, u = l && l.d, c = (r.left - o.left) / (s || 1), d = (r.top - o.top) / (u || 1);
        i.animatingX = !!c, i.animatingY = !!d, D(i, "transform", "translate3d(" + c + "px," + d + "px,0)"), this.forRepaintDummy = cu(i), D(i, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), D(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          D(i, "transition", ""), D(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, a);
      }
    }
  };
}
function cu(t) {
  return t.offsetWidth;
}
function fu(t, e, n, i) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * i.animation;
}
var Ge = [], Xn = {
  initializeByDefault: !0
}, Ut = {
  mount: function(e) {
    for (var n in Xn)
      Xn.hasOwnProperty(n) && !(n in e) && (e[n] = Xn[n]);
    Ge.forEach(function(i) {
      if (i.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Ge.push(e);
  },
  pluginEvent: function(e, n, i) {
    var r = this;
    this.eventCanceled = !1, i.cancel = function() {
      r.eventCanceled = !0;
    };
    var o = e + "Global";
    Ge.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](pe({
        sortable: n
      }, i)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](pe({
        sortable: n
      }, i)));
    });
  },
  initializePlugins: function(e, n, i, r) {
    Ge.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var u = new l(e, n, e.options);
        u.sortable = e, u.options = e.options, e[s] = u, Le(i, u.defaults);
      }
    });
    for (var o in e.options)
      if (e.options.hasOwnProperty(o)) {
        var a = this.modifyOption(e, o, e.options[o]);
        typeof a < "u" && (e.options[o] = a);
      }
  },
  getEventProperties: function(e, n) {
    var i = {};
    return Ge.forEach(function(r) {
      typeof r.eventProperties == "function" && Le(i, r.eventProperties.call(n[r.pluginName], e));
    }), i;
  },
  modifyOption: function(e, n, i) {
    var r;
    return Ge.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (r = o.optionListeners[n].call(e[o.pluginName], i));
    }), r;
  }
};
function pu(t) {
  var e = t.sortable, n = t.rootEl, i = t.name, r = t.targetEl, o = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, c = t.oldDraggableIndex, d = t.newDraggableIndex, m = t.originalEvent, h = t.putSortable, p = t.extraEventProperties;
  if (e = e || n && n[ee], !!e) {
    var g, v = e.options, E = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !Ae && !Wt ? g = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (g = document.createEvent("Event"), g.initEvent(i, !0, !0)), g.to = a || n, g.from = l || n, g.item = r || n, g.clone = o, g.oldIndex = s, g.newIndex = u, g.oldDraggableIndex = c, g.newDraggableIndex = d, g.originalEvent = m, g.pullMode = h ? h.lastPutMode : void 0;
    var T = pe(pe({}, p), Ut.getEventProperties(i, e));
    for (var C in T)
      g[C] = T[C];
    n && n.dispatchEvent(g), v[E] && v[E].call(e, g);
  }
}
var vu = ["evt"], Q = function(e, n) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = i.evt, o = ou(i, vu);
  Ut.pluginEvent.bind(I)(e, n, pe({
    dragEl: y,
    parentEl: $,
    ghostEl: M,
    rootEl: F,
    nextEl: $e,
    lastDownEl: fn,
    cloneEl: B,
    cloneHidden: Oe,
    dragStarted: bt,
    putSortable: X,
    activeSortable: I.active,
    originalEvent: r,
    oldIndex: nt,
    oldDraggableIndex: It,
    newIndex: ne,
    newDraggableIndex: ke,
    hideGhostForTarget: Do,
    unhideGhostForTarget: Io,
    cloneNowHidden: function() {
      Oe = !0;
    },
    cloneNowShown: function() {
      Oe = !1;
    },
    dispatchSortableEvent: function(l) {
      G({
        sortable: n,
        name: l,
        originalEvent: r
      });
    }
  }, o));
};
function G(t) {
  pu(pe({
    putSortable: X,
    cloneEl: B,
    targetEl: y,
    rootEl: F,
    oldIndex: nt,
    oldDraggableIndex: It,
    newIndex: ne,
    newDraggableIndex: ke
  }, t));
}
var y, $, M, F, $e, fn, B, Oe, nt, ne, It, ke, Zt, X, tt = !1, Ln = !1, An = [], je, le, Yn, Gn, hr, gr, bt, Ke, Mt, Ot = !1, en = !1, pn, Y, Kn = [], hi = !1, kn = [], Pn = typeof document < "u", tn = Ii, _r = Wt || Ae ? "cssFloat" : "float", mu = Pn && !yo && !Ii && "draggable" in document.createElement("div"), Lo = (function() {
  if (Pn) {
    if (Ae)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Ao = function(e, n) {
  var i = D(e), r = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), o = st(e, 0, n), a = st(e, 1, n), l = o && D(o), s = a && D(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + U(o).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + U(a).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= r && i[_r] === "none" || a && i[_r] === "none" && u + c > r) ? "vertical" : "horizontal";
}, hu = function(e, n, i) {
  var r = i ? e.left : e.top, o = i ? e.right : e.bottom, a = i ? e.width : e.height, l = i ? n.left : n.top, s = i ? n.right : n.bottom, u = i ? n.width : n.height;
  return r === l || o === s || r + a / 2 === l + u / 2;
}, gu = function(e, n) {
  var i;
  return An.some(function(r) {
    var o = r[ee].options.emptyInsertThreshold;
    if (!(!o || Mi(r))) {
      var a = U(r), l = e >= a.left - o && e <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return i = r;
    }
  }), i;
}, ko = function(e) {
  function n(o, a) {
    return function(l, s, u, c) {
      var d = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (o == null && (a || d))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(l, s, u, c), a)(l, s, u, c);
      var m = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === m || o.join && o.indexOf(m) > -1;
    };
  }
  var i = {}, r = e.group;
  (!r || cn(r) != "object") && (r = {
    name: r
  }), i.name = r.name, i.checkPull = n(r.pull, !0), i.checkPut = n(r.put), i.revertClone = r.revertClone, e.group = i;
}, Do = function() {
  !Lo && M && D(M, "display", "none");
}, Io = function() {
  !Lo && M && D(M, "display", "");
};
Pn && !yo && document.addEventListener("click", function(t) {
  if (Ln)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), Ln = !1, !1;
}, !0);
var Fe = function(e) {
  if (y) {
    e = e.touches ? e.touches[0] : e;
    var n = gu(e.clientX, e.clientY);
    if (n) {
      var i = {};
      for (var r in e)
        e.hasOwnProperty(r) && (i[r] = e[r]);
      i.target = i.rootEl = n, i.preventDefault = void 0, i.stopPropagation = void 0, n[ee]._onDragOver(i);
    }
  }
}, _u = function(e) {
  y && y.parentNode[ee]._isOutsideThisEl(e.target);
};
function I(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = Le({}, e), t[ee] = this;
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
      return Ao(t, this.options);
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
    supportPointer: I.supportPointer !== !1 && "PointerEvent" in window && (!kt || Ii),
    emptyInsertThreshold: 5
  };
  Ut.initializePlugins(this, t, n);
  for (var i in n)
    !(i in e) && (e[i] = n[i]);
  ko(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : mu, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? R(t, "pointerdown", this._onTapStart) : (R(t, "mousedown", this._onTapStart), R(t, "touchstart", this._onTapStart)), this.nativeDraggable && (R(t, "dragover", this), R(t, "dragenter", this)), An.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), Le(this, du());
}
I.prototype = /** @lends Sortable.prototype */
{
  constructor: I,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Ke = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, y) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, i = this.el, r = this.options, o = r.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, c = r.filter;
      if (Tu(i), !y && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !u.isContentEditable && !(!this.nativeDraggable && kt && s && s.tagName.toUpperCase() === "SELECT") && (s = se(s, r.draggable, i, !1), !(s && s.animated) && fn !== s)) {
        if (nt = re(s), It = re(s, r.draggable), typeof c == "function") {
          if (c.call(this, e, s, this)) {
            G({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: i,
              fromEl: i
            }), Q("filter", n, {
              evt: e
            }), o && e.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(d) {
          if (d = se(u, d.trim(), i, !1), d)
            return G({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: s,
              fromEl: i,
              toEl: i
            }), Q("filter", n, {
              evt: e
            }), !0;
        }), c)) {
          o && e.preventDefault();
          return;
        }
        r.handle && !se(u, r.handle, i, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, i) {
    var r = this, o = r.el, a = r.options, l = o.ownerDocument, s;
    if (i && !y && i.parentNode === o) {
      var u = U(i);
      if (F = o, y = i, $ = y.parentNode, $e = y.nextSibling, fn = i, Zt = a.group, I.dragged = y, je = {
        target: y,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, hr = je.clientX - u.left, gr = je.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, y.style["will-change"] = "all", s = function() {
        if (Q("delayEnded", r, {
          evt: e
        }), I.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !fr && r.nativeDraggable && (y.draggable = !0), r._triggerDragStart(e, n), G({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), te(y, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(c) {
        So(y, c.trim(), Qn);
      }), R(l, "dragover", Fe), R(l, "mousemove", Fe), R(l, "touchmove", Fe), a.supportPointer ? (R(l, "pointerup", r._onDrop), !this.nativeDraggable && R(l, "pointercancel", r._onDrop)) : (R(l, "mouseup", r._onDrop), R(l, "touchend", r._onDrop), R(l, "touchcancel", r._onDrop)), fr && this.nativeDraggable && (this.options.touchStartThreshold = 4, y.draggable = !0), Q("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Wt || Ae))) {
        if (I.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (R(l, "pointerup", r._disableDelayedDrag), R(l, "pointercancel", r._disableDelayedDrag)) : (R(l, "mouseup", r._disableDelayedDrag), R(l, "touchend", r._disableDelayedDrag), R(l, "touchcancel", r._disableDelayedDrag)), R(l, "mousemove", r._delayedDragTouchMoveHandler), R(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && R(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    y && Qn(y), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    P(e, "mouseup", this._disableDelayedDrag), P(e, "touchend", this._disableDelayedDrag), P(e, "touchcancel", this._disableDelayedDrag), P(e, "pointerup", this._disableDelayedDrag), P(e, "pointercancel", this._disableDelayedDrag), P(e, "mousemove", this._delayedDragTouchMoveHandler), P(e, "touchmove", this._delayedDragTouchMoveHandler), P(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? R(document, "pointermove", this._onTouchMove) : n ? R(document, "touchmove", this._onTouchMove) : R(document, "mousemove", this._onTouchMove) : (R(y, "dragend", this), R(F, "dragstart", this._onDragStart));
    try {
      document.selection ? vn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (tt = !1, F && y) {
      Q("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && R(document, "dragover", _u);
      var i = this.options;
      !e && te(y, i.dragClass, !1), te(y, i.ghostClass, !0), I.active = this, e && this._appendGhost(), G({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (le) {
      this._lastX = le.clientX, this._lastY = le.clientY, Do();
      for (var e = document.elementFromPoint(le.clientX, le.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(le.clientX, le.clientY), e !== n); )
        n = e;
      if (y.parentNode[ee]._isOutsideThisEl(e), n)
        do {
          if (n[ee]) {
            var i = void 0;
            if (i = n[ee]._onDragOver({
              clientX: le.clientX,
              clientY: le.clientY,
              target: e,
              rootEl: n
            }), i && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = Eo(n));
      Io();
    }
  },
  _onTouchMove: function(e) {
    if (je) {
      var n = this.options, i = n.fallbackTolerance, r = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = M && ot(M, !0), l = M && a && a.a, s = M && a && a.d, u = tn && Y && mr(Y), c = (o.clientX - je.clientX + r.x) / (l || 1) + (u ? u[0] - Kn[0] : 0) / (l || 1), d = (o.clientY - je.clientY + r.y) / (s || 1) + (u ? u[1] - Kn[1] : 0) / (s || 1);
      if (!I.active && !tt) {
        if (i && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < i)
          return;
        this._onDragStart(e, !0);
      }
      if (M) {
        a ? (a.e += c - (Yn || 0), a.f += d - (Gn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f: d
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        D(M, "webkitTransform", m), D(M, "mozTransform", m), D(M, "msTransform", m), D(M, "transform", m), Yn = c, Gn = d, le = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!M) {
      var e = this.options.fallbackOnBody ? document.body : F, n = U(y, !0, tn, !0, e), i = this.options;
      if (tn) {
        for (Y = e; D(Y, "position") === "static" && D(Y, "transform") === "none" && Y !== document; )
          Y = Y.parentNode;
        Y !== document.body && Y !== document.documentElement ? (Y === document && (Y = fe()), n.top += Y.scrollTop, n.left += Y.scrollLeft) : Y = fe(), Kn = mr(Y);
      }
      M = y.cloneNode(!0), te(M, i.ghostClass, !1), te(M, i.fallbackClass, !0), te(M, i.dragClass, !0), D(M, "transition", ""), D(M, "transform", ""), D(M, "box-sizing", "border-box"), D(M, "margin", 0), D(M, "top", n.top), D(M, "left", n.left), D(M, "width", n.width), D(M, "height", n.height), D(M, "opacity", "0.8"), D(M, "position", tn ? "absolute" : "fixed"), D(M, "zIndex", "100000"), D(M, "pointerEvents", "none"), I.ghost = M, e.appendChild(M), D(M, "transform-origin", hr / parseInt(M.style.width) * 100 + "% " + gr / parseInt(M.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var i = this, r = e.dataTransfer, o = i.options;
    if (Q("dragStart", this, {
      evt: e
    }), I.eventCanceled) {
      this._onDrop();
      return;
    }
    Q("setupClone", this), I.eventCanceled || (B = To(y), B.removeAttribute("id"), B.draggable = !1, B.style["will-change"] = "", this._hideClone(), te(B, this.options.chosenClass, !1), I.clone = B), i.cloneId = vn(function() {
      Q("clone", i), !I.eventCanceled && (i.options.removeCloneOnHide || F.insertBefore(B, y), i._hideClone(), G({
        sortable: i,
        name: "clone"
      }));
    }), !n && te(y, o.dragClass, !0), n ? (Ln = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : (P(document, "mouseup", i._onDrop), P(document, "touchend", i._onDrop), P(document, "touchcancel", i._onDrop), r && (r.effectAllowed = "move", o.setData && o.setData.call(i, r, y)), R(document, "drop", i), D(y, "transform", "translateZ(0)")), tt = !0, i._dragStartId = vn(i._dragStarted.bind(i, n, e)), R(document, "selectstart", i), bt = !0, window.getSelection().removeAllRanges(), kt && D(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, i = e.target, r, o, a, l = this.options, s = l.group, u = I.active, c = Zt === s, d = l.sort, m = X || u, h, p = this, g = !1;
    if (hi) return;
    function v(me, dt) {
      Q(me, p, pe({
        evt: e,
        isOwner: c,
        axis: h ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: o,
        canSort: d,
        fromSortable: m,
        target: i,
        completed: T,
        onMove: function(he, ge) {
          return nn(F, n, y, r, he, U(he), e, ge);
        },
        changed: C
      }, dt));
    }
    function E() {
      v("dragOverAnimationCapture"), p.captureAnimationState(), p !== m && m.captureAnimationState();
    }
    function T(me) {
      return v("dragOverCompleted", {
        insertion: me
      }), me && (c ? u._hideClone() : u._showClone(p), p !== m && (te(y, X ? X.options.ghostClass : u.options.ghostClass, !1), te(y, l.ghostClass, !0)), X !== p && p !== I.active ? X = p : p === I.active && X && (X = null), m === p && (p._ignoreWhileAnimating = i), p.animateAll(function() {
        v("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
      }), p !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (i === y && !y.animated || i === n && !i.animated) && (Ke = null), !l.dragoverBubble && !e.rootEl && i !== document && (y.parentNode[ee]._isOutsideThisEl(e.target), !me && Fe(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), g = !0;
    }
    function C() {
      ne = re(y), ke = re(y, l.draggable), G({
        sortable: p,
        name: "change",
        toEl: n,
        newIndex: ne,
        newDraggableIndex: ke,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), i = se(i, l.draggable, n, !0), v("dragOver"), I.eventCanceled) return g;
    if (y.contains(e.target) || i.animated && i.animatingX && i.animatingY || p._ignoreWhileAnimating === i)
      return T(!1);
    if (Ln = !1, u && !l.disabled && (c ? d || (a = $ !== F) : X === this || (this.lastPutMode = Zt.checkPull(this, u, y, e)) && s.checkPut(this, u, y, e))) {
      if (h = this._getDirection(e, i) === "vertical", r = U(y), v("dragOverValid"), I.eventCanceled) return g;
      if (a)
        return $ = F, E(), this._hideClone(), v("revert"), I.eventCanceled || ($e ? F.insertBefore(y, $e) : F.appendChild(y)), T(!0);
      var N = Mi(n, l.draggable);
      if (!N || Eu(e, h, this) && !N.animated) {
        if (N === y)
          return T(!1);
        if (N && n === e.target && (i = N), i && (o = U(i)), nn(F, n, y, r, i, o, e, !!i) !== !1)
          return E(), N && N.nextSibling ? n.insertBefore(y, N.nextSibling) : n.appendChild(y), $ = n, C(), T(!0);
      } else if (N && wu(e, h, this)) {
        var L = st(n, 0, l, !0);
        if (L === y)
          return T(!1);
        if (i = L, o = U(i), nn(F, n, y, r, i, o, e, !1) !== !1)
          return E(), n.insertBefore(y, L), $ = n, C(), T(!0);
      } else if (i.parentNode === n) {
        o = U(i);
        var A = 0, V, b = y.parentNode !== n, f = !hu(y.animated && y.toRect || r, i.animated && i.toRect || o, h), x = h ? "top" : "left", S = vr(i, "top", "top") || vr(y, "top", "top"), w = S ? S.scrollTop : void 0;
        Ke !== i && (V = o[x], Ot = !1, en = !f && l.invertSwap || b), A = Su(e, i, o, h, f ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, en, Ke === i);
        var _;
        if (A !== 0) {
          var O = re(y);
          do
            O -= A, _ = $.children[O];
          while (_ && (D(_, "display") === "none" || _ === M));
        }
        if (A === 0 || _ === i)
          return T(!1);
        Ke = i, Mt = A;
        var z = i.nextElementSibling, H = !1;
        H = A === 1;
        var ve = nn(F, n, y, r, i, o, e, H);
        if (ve !== !1)
          return (ve === 1 || ve === -1) && (H = ve === 1), hi = !0, setTimeout(yu, 30), E(), H && !z ? n.appendChild(y) : i.parentNode.insertBefore(y, H ? z : i), S && Co(S, 0, w - S.scrollTop), $ = y.parentNode, V !== void 0 && !en && (pn = Math.abs(V - U(i)[x])), C(), T(!0);
      }
      if (n.contains(y))
        return T(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    P(document, "mousemove", this._onTouchMove), P(document, "touchmove", this._onTouchMove), P(document, "pointermove", this._onTouchMove), P(document, "dragover", Fe), P(document, "mousemove", Fe), P(document, "touchmove", Fe);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    P(e, "mouseup", this._onDrop), P(e, "touchend", this._onDrop), P(e, "pointerup", this._onDrop), P(e, "pointercancel", this._onDrop), P(e, "touchcancel", this._onDrop), P(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, i = this.options;
    if (ne = re(y), ke = re(y, i.draggable), Q("drop", this, {
      evt: e
    }), $ = y && y.parentNode, ne = re(y), ke = re(y, i.draggable), I.eventCanceled) {
      this._nulling();
      return;
    }
    tt = !1, en = !1, Ot = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), gi(this.cloneId), gi(this._dragStartId), this.nativeDraggable && (P(document, "drop", this), P(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), kt && D(document.body, "user-select", ""), D(y, "transform", ""), e && (bt && (e.cancelable && e.preventDefault(), !i.dropBubble && e.stopPropagation()), M && M.parentNode && M.parentNode.removeChild(M), (F === $ || X && X.lastPutMode !== "clone") && B && B.parentNode && B.parentNode.removeChild(B), y && (this.nativeDraggable && P(y, "dragend", this), Qn(y), y.style["will-change"] = "", bt && !tt && te(y, X ? X.options.ghostClass : this.options.ghostClass, !1), te(y, this.options.chosenClass, !1), G({
      sortable: this,
      name: "unchoose",
      toEl: $,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), F !== $ ? (ne >= 0 && (G({
      rootEl: $,
      name: "add",
      toEl: $,
      fromEl: F,
      originalEvent: e
    }), G({
      sortable: this,
      name: "remove",
      toEl: $,
      originalEvent: e
    }), G({
      rootEl: $,
      name: "sort",
      toEl: $,
      fromEl: F,
      originalEvent: e
    }), G({
      sortable: this,
      name: "sort",
      toEl: $,
      originalEvent: e
    })), X && X.save()) : ne !== nt && ne >= 0 && (G({
      sortable: this,
      name: "update",
      toEl: $,
      originalEvent: e
    }), G({
      sortable: this,
      name: "sort",
      toEl: $,
      originalEvent: e
    })), I.active && ((ne == null || ne === -1) && (ne = nt, ke = It), G({
      sortable: this,
      name: "end",
      toEl: $,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    Q("nulling", this), F = y = $ = M = $e = B = fn = Oe = je = le = bt = ne = ke = nt = It = Ke = Mt = X = Zt = I.dragged = I.ghost = I.clone = I.active = null, kn.forEach(function(e) {
      e.checked = !0;
    }), kn.length = Yn = Gn = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        y && (this._onDragOver(e), bu(e));
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
    for (var e = [], n, i = this.el.children, r = 0, o = i.length, a = this.options; r < o; r++)
      n = i[r], se(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || Cu(n));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, n) {
    var i = {}, r = this.el;
    this.toArray().forEach(function(o, a) {
      var l = r.children[a];
      se(l, this.options.draggable, r, !1) && (i[o] = l);
    }, this), n && this.captureAnimationState(), e.forEach(function(o) {
      i[o] && (r.removeChild(i[o]), r.appendChild(i[o]));
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
    return se(e, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, n) {
    var i = this.options;
    if (n === void 0)
      return i[e];
    var r = Ut.modifyOption(this, e, n);
    typeof r < "u" ? i[e] = r : i[e] = n, e === "group" && ko(i);
  },
  /**
   * Destroy
   */
  destroy: function() {
    Q("destroy", this);
    var e = this.el;
    e[ee] = null, P(e, "mousedown", this._onTapStart), P(e, "touchstart", this._onTapStart), P(e, "pointerdown", this._onTapStart), this.nativeDraggable && (P(e, "dragover", this), P(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), An.splice(An.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Oe) {
      if (Q("hideClone", this), I.eventCanceled) return;
      D(B, "display", "none"), this.options.removeCloneOnHide && B.parentNode && B.parentNode.removeChild(B), Oe = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Oe) {
      if (Q("showClone", this), I.eventCanceled) return;
      y.parentNode == F && !this.options.group.revertClone ? F.insertBefore(B, y) : $e ? F.insertBefore(B, $e) : F.appendChild(B), this.options.group.revertClone && this.animate(y, B), D(B, "display", ""), Oe = !1;
    }
  }
};
function bu(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function nn(t, e, n, i, r, o, a, l) {
  var s, u = t[ee], c = u.options.onMove, d;
  return window.CustomEvent && !Ae && !Wt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = i, s.related = r || e, s.relatedRect = o || U(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), c && (d = c.call(u, s, a)), d;
}
function Qn(t) {
  t.draggable = !1;
}
function yu() {
  hi = !1;
}
function wu(t, e, n) {
  var i = U(st(n.el, 0, n.options, !0)), r = No(n.el, n.options, M), o = 10;
  return e ? t.clientX < r.left - o || t.clientY < i.top && t.clientX < i.right : t.clientY < r.top - o || t.clientY < i.bottom && t.clientX < i.left;
}
function Eu(t, e, n) {
  var i = U(Mi(n.el, n.options.draggable)), r = No(n.el, n.options, M), o = 10;
  return e ? t.clientX > r.right + o || t.clientY > i.bottom && t.clientX > i.left : t.clientY > r.bottom + o || t.clientX > i.right && t.clientY > i.top;
}
function Su(t, e, n, i, r, o, a, l) {
  var s = i ? t.clientY : t.clientX, u = i ? n.height : n.width, c = i ? n.top : n.left, d = i ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && pn < u * r) {
      if (!Ot && (Mt === 1 ? s > c + u * o / 2 : s < d - u * o / 2) && (Ot = !0), Ot)
        m = !0;
      else if (Mt === 1 ? s < c + pn : s > d - pn)
        return -Mt;
    } else if (s > c + u * (1 - r) / 2 && s < d - u * (1 - r) / 2)
      return xu(e);
  }
  return m = m || a, m && (s < c + u * o / 2 || s > d - u * o / 2) ? s > c + u / 2 ? 1 : -1 : 0;
}
function xu(t) {
  return re(y) < re(t) ? 1 : -1;
}
function Cu(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, i = 0; n--; )
    i += e.charCodeAt(n);
  return i.toString(36);
}
function Tu(t) {
  kn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var i = e[n];
    i.checked && kn.push(i);
  }
}
function vn(t) {
  return setTimeout(t, 0);
}
function gi(t) {
  return clearTimeout(t);
}
Pn && R(document, "touchmove", function(t) {
  (I.active || tt) && t.cancelable && t.preventDefault();
});
I.utils = {
  on: R,
  off: P,
  css: D,
  find: So,
  is: function(e, n) {
    return !!se(e, n, e, !1);
  },
  extend: su,
  throttle: xo,
  closest: se,
  toggleClass: te,
  clone: To,
  index: re,
  nextTick: vn,
  cancelNextTick: gi,
  detectDirection: Ao,
  getChild: st,
  expando: ee
};
I.get = function(t) {
  return t[ee];
};
I.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (I.utils = pe(pe({}, I.utils), i.utils)), Ut.mount(i);
  });
};
I.create = function(t, e) {
  return new I(t, e);
};
I.version = au;
var W = [], yt, _i, bi = !1, Zn, ei, Dn, wt;
function Nu() {
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
      var i = n.originalEvent;
      this.sortable.nativeDraggable ? R(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? R(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? R(document, "touchmove", this._handleFallbackAutoScroll) : R(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var i = n.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
    },
    drop: function() {
      this.sortable.nativeDraggable ? P(document, "dragover", this._handleAutoScroll) : (P(document, "pointermove", this._handleFallbackAutoScroll), P(document, "touchmove", this._handleFallbackAutoScroll), P(document, "mousemove", this._handleFallbackAutoScroll)), br(), mn(), uu();
    },
    nulling: function() {
      Dn = _i = yt = bi = wt = Zn = ei = null, W.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, i) {
      var r = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (Dn = n, i || this.options.forceAutoScrollFallback || Wt || Ae || kt) {
        ti(n, this.options, l, i);
        var s = Re(l, !0);
        bi && (!wt || o !== Zn || a !== ei) && (wt && br(), wt = setInterval(function() {
          var u = Re(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, mn()), ti(n, r.options, u, i);
        }, 10), Zn = o, ei = a);
      } else {
        if (!this.options.bubbleScroll || Re(l, !0) === fe()) {
          mn();
          return;
        }
        ti(n, this.options, Re(l, !1), !1);
      }
    }
  }, Le(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function mn() {
  W.forEach(function(t) {
    clearInterval(t.pid);
  }), W = [];
}
function br() {
  clearInterval(wt);
}
var ti = xo(function(t, e, n, i) {
  if (e.scroll) {
    var r = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = fe(), u = !1, c;
    _i !== n && (_i = n, mn(), yt = e.scroll, c = e.scrollFn, yt === !0 && (yt = Re(n, !0)));
    var d = 0, m = yt;
    do {
      var h = m, p = U(h), g = p.top, v = p.bottom, E = p.left, T = p.right, C = p.width, N = p.height, L = void 0, A = void 0, V = h.scrollWidth, b = h.scrollHeight, f = D(h), x = h.scrollLeft, S = h.scrollTop;
      h === s ? (L = C < V && (f.overflowX === "auto" || f.overflowX === "scroll" || f.overflowX === "visible"), A = N < b && (f.overflowY === "auto" || f.overflowY === "scroll" || f.overflowY === "visible")) : (L = C < V && (f.overflowX === "auto" || f.overflowX === "scroll"), A = N < b && (f.overflowY === "auto" || f.overflowY === "scroll"));
      var w = L && (Math.abs(T - r) <= a && x + C < V) - (Math.abs(E - r) <= a && !!x), _ = A && (Math.abs(v - o) <= a && S + N < b) - (Math.abs(g - o) <= a && !!S);
      if (!W[d])
        for (var O = 0; O <= d; O++)
          W[O] || (W[O] = {});
      (W[d].vx != w || W[d].vy != _ || W[d].el !== h) && (W[d].el = h, W[d].vx = w, W[d].vy = _, clearInterval(W[d].pid), (w != 0 || _ != 0) && (u = !0, W[d].pid = setInterval(function() {
        i && this.layer === 0 && I.active._onTouchMove(Dn);
        var z = W[this.layer].vy ? W[this.layer].vy * l : 0, H = W[this.layer].vx ? W[this.layer].vx * l : 0;
        typeof c == "function" && c.call(I.dragged.parentNode[ee], H, z, t, Dn, W[this.layer].el) !== "continue" || Co(W[this.layer].el, H, z);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (e.bubbleScroll && m !== s && (m = Re(m, !1)));
    bi = u;
  }
}, 30), Mo = function(e) {
  var n = e.originalEvent, i = e.putSortable, r = e.dragEl, o = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var u = i || o;
    l();
    var c = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, d = document.elementFromPoint(c.clientX, c.clientY);
    s(), u && !u.el.contains(d) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: i
    }));
  }
};
function Oi() {
}
Oi.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, i = e.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var r = st(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: Mo
};
Le(Oi, {
  pluginName: "revertOnSpill"
});
function Pi() {
}
Pi.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, i = e.putSortable, r = i || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Mo
};
Le(Pi, {
  pluginName: "removeOnSpill"
});
I.mount(new Nu());
I.mount(Pi, Oi);
const it = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap();
function Lu(t) {
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
function Au(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const ku = {
  mounted(t, e, n) {
    let i = Lu(n);
    if (!i) {
      console.warn("[LiVue] v-sort: livue helper not found in component context");
      return;
    }
    let r = e.value, o, a = [];
    if (Array.isArray(r) ? (o = r[0], a = r[1] || []) : o = r, typeof o != "string") {
      console.warn("[LiVue] v-sort: expected method name (string), got", typeof o);
      return;
    }
    let l = e.modifiers || {}, s = Au(l), u = l.horizontal ? "horizontal" : "vertical", c = t.dataset.livueSortGroup || null;
    t.dataset.livueSortMethod = o;
    let d = {
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
        let g = p.item, v = hn.get(g);
        v === void 0 && (v = g.dataset.livueSortItem), typeof v == "string" && /^\d+$/.test(v) && (v = parseInt(v, 10));
        let E = p.newIndex, T = p.oldIndex, C = p.from, N = p.to, L = [v, E].concat(a), A = C !== N;
        if (A) {
          let V = N.dataset.livueSortMethod;
          V && (o = V);
          let b = C.dataset.livueSortId || C.dataset.livueSortGroup || null;
          L.push(b);
        }
        if (A) {
          let V = C.children[T] || null;
          C.insertBefore(g, V);
        } else {
          let b = Array.from(C.children).indexOf(g);
          if (b !== T)
            if (T < b) {
              let f = C.children[T] || null;
              C.insertBefore(g, f);
            } else {
              let f = C.children[T + 1] || null;
              C.insertBefore(g, f);
            }
        }
        i.call(o, L);
      }
    };
    t.querySelector("[data-livue-sort-handle]") && (d.handle = "[data-livue-sort-handle]"), c && (d.group = c);
    let h = I.create(t, d);
    it.set(t, h);
  },
  updated(t) {
    let e = it.get(t);
    e && t.querySelector("[data-livue-sort-handle]") && e.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = it.get(t);
    e && (e.destroy(), it.delete(t));
  }
}, Du = {
  mounted(t, e) {
    let n = e.value;
    hn.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    hn.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (hn.delete(t), t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Iu = {
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
}, Mu = {
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
}, Ou = {
  mounted(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let i = it.get(t);
    i && i.option("group", n);
  },
  updated(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let i = it.get(t);
    i && i.option("group", n);
  },
  unmounted(t) {
    if (t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
};
function Pu() {
  j("init", gs), j("submit", bs), j("intersect", ws), j("current", Es), j("ignore", Ss), j("model-livue", Ns), j("debounce", Qs), j("throttle", Zs), j("blur", ki), j("enter", Di), j("boolean", nu), j("poll", Ds), j("offline", Ms), j("transition", es), j("replace", Os), j("loading", qs), j("target", Vs), j("stream", Hs), j("click", Bs), j("navigate", Ws), j("sort", ku), j("sort-item", Du), j("sort-handle", Iu), j("sort-ignore", Mu), j("sort-group", Ou);
}
let De = null, _t = null, yr = !1;
function Ru() {
  if (yr)
    return;
  yr = !0;
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
function zu() {
  return De || (Ru(), De = document.createElement("div"), De.className = "livue-hmr-indicator", document.body.appendChild(De), De);
}
function rn(t, e) {
  const n = zu();
  switch (_t && (clearTimeout(_t), _t = null), t) {
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
            `, _t = setTimeout(function() {
        wr();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, _t = setTimeout(function() {
        wr();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function wr() {
  De && De.classList.remove("visible");
}
let Je = null, Rn = !0, Oo = !0, Et = !0, gn = [];
function qu(t) {
  Je = t;
}
async function Vu(t) {
  if (Rn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), Et && rn("updating", t.fileName), gn.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Oo ? Hu() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const i = await n.text(), a = new DOMParser().parseFromString(i, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), Et && rn("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Je.reboot(), e && (await Fu(), ju(e)), Et && rn("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), Et && rn("error");
    }
  }
}
function Hu() {
  const t = /* @__PURE__ */ new Map();
  return Je && Je.all().forEach(function(n) {
    if (Er(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const i in n._childRegistry) {
        const r = n._childRegistry[i];
        Er(i, r.name, r.state, t);
      }
  }), t;
}
function Er(t, e, n, i) {
  const r = {};
  for (const o in n) {
    const a = n[o];
    if (!(typeof a == "function" || typeof a == "symbol"))
      try {
        r[o] = JSON.parse(JSON.stringify(a));
      } catch {
        console.warn("[LiVue HMR] Could not save state for " + e + "." + o);
      }
  }
  i.set(t, { name: e, state: r });
}
function ju(t) {
  Je && t.forEach(function(e, n) {
    const i = Je.getByName(e.name);
    if (i.length > 0) {
      const r = i[0];
      for (const o in e.state)
        o in r.state && (r.state[o] = e.state[o]);
    }
  });
}
function Fu() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Bu() {
  return typeof import.meta < "u" && !1;
}
function $u() {
  Rn = !0;
}
function Wu() {
  Rn = !1;
}
function Uu() {
  return Rn;
}
function Ju(t) {
  t.indicator !== void 0 && (Et = t.indicator), t.preserveState !== void 0 && (Oo = t.preserveState);
}
function Xu(t) {
  return gn.push(t), function() {
    const e = gn.indexOf(t);
    e !== -1 && gn.splice(e, 1);
  };
}
async function Yu() {
  Je && await Vu({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Qe = !1, ni = [];
class Gu {
  constructor() {
    this.components = /* @__PURE__ */ new Map(), this._observer = null, this._devtoolsInitialized = !1, this._setupCallback = null;
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
    this._setupCallback = e;
  }
  /**
   * Register a global error handler.
   * Called when a non-validation error occurs on any component.
   *
   * @param {Function} handler - function(error, componentName)
   */
  onError(e) {
    Ta(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    this._devtoolsInitialized || (ao(this), this._devtoolsInitialized = !0), Pu(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), oa(this), this._startObserver(), this._setupDevtoolsShortcut(), qu(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), lo());
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
   * Navigate to a URL using SPA navigation.
   * Can be called from user code: LiVue.navigate('/dashboard')
   *
   * @param {string} url - Target URL
   */
  navigate(e) {
    Ht(e, !0, !1);
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
    ra(e);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(e) {
    return On(e);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    pa();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return _a();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Ve;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: Xe(),
      ...qa()
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
    let i = new ms(e);
    this.components.set(n, i);
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
    return this.components.forEach(function(i) {
      i.name === e && n.push({
        id: i.componentId,
        name: i.name,
        state: i.state,
        livue: i._rootLivue
      });
      for (let r in i._childRegistry) {
        let o = i._childRegistry[r];
        o.name === e && n.push({
          id: r,
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
    return be(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Vi();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), za();
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
      n.forEach(function(i) {
        i.addedNodes.forEach(function(r) {
          r.nodeType === Node.ELEMENT_NODE && e._processAddedNode(r);
        }), i.removedNodes.forEach(function(r) {
          r.nodeType === Node.ELEMENT_NODE && e._processRemovedNode(r);
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
    e.hasAttribute && e.hasAttribute("data-livue-id") && this._isRoot(e) && this._initComponent(e), e.querySelectorAll && e.querySelectorAll("[data-livue-id]").forEach(function(i) {
      this._isRoot(i) && this._initComponent(i);
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
    e.tagName && e.tagName.toLowerCase() === "livue-lazy" && this._isStandaloneLazy(e) && n.push(e), e.querySelectorAll && e.querySelectorAll("livue-lazy").forEach(function(r) {
      this._isStandaloneLazy(r) && n.push(r);
    }.bind(this)), n.forEach(function(i) {
      this._wrapStandaloneLazy(i);
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
    let n = document.createElement("div"), i = "livue-lazy-wrapper-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9), r = {
      state: {},
      memo: {
        name: "lazy-wrapper",
        checksum: ""
      }
    };
    n.dataset.livueId = i, n.dataset.livueSnapshot = JSON.stringify(r), e.parentNode.insertBefore(n, e), n.appendChild(e), this._initComponent(n);
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
    e.querySelectorAll && e.querySelectorAll("[data-livue-id]").forEach(function(i) {
      let r = i.dataset.livueId;
      this._cleanupComponent(r);
    }.bind(this));
  }
  /**
   * Clean up a component by ID if it exists.
   *
   * @param {string} id
   */
  _cleanupComponent(e) {
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
   *
   * @returns {object} DevTools API
   *
   * @example
   * LiVue.devtools.open();
   * LiVue.devtools.toggle();
   * const components = LiVue.devtools.getComponents();
   */
  get devtools() {
    return Hl;
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
      isAvailable: Bu,
      isEnabled: Uu,
      enable: $u,
      disable: Wu,
      configure: Ju,
      onUpdate: Xu,
      trigger: Yu
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
    if (e && !Qe) {
      Qe = !0, console.log("[LiVue] Debug mode enabled");
      var n = Vi();
      n.forEach(function(i) {
        var r = be(i, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + i + ":", a);
        });
        ni.push(r);
      });
    } else !e && Qe && (Qe = !1, console.log("[LiVue] Debug mode disabled"), ni.forEach(function(i) {
      i();
    }), ni = []);
    return Qe;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return Qe;
  }
}
const Ri = new Gu();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = Jo, document.head.appendChild(t);
}
var _e = window.LiVueConfig || {};
(_e.showProgressBar !== void 0 || _e.progressBarColor !== void 0 || _e.prefetch !== void 0 || _e.prefetchOnHover !== void 0 || _e.hoverDelay !== void 0 || _e.cachePages !== void 0 || _e.maxCacheSize !== void 0 || _e.restoreScroll !== void 0) && Ri.configureNavigation(_e);
function Sr() {
  Ri.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Sr) : queueMicrotask(Sr);
window.LiVue = Ri;
export {
  Ri as default
};
//# sourceMappingURL=livue.esm.js.map
