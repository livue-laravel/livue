import { reactive as Te, toRefs as Bi, effectScope as Ui, ref as Qt, markRaw as Ji, defineComponent as Xi, shallowRef as oi, onMounted as ai, onUnmounted as li, h as hr, inject as Yi, provide as Gi, nextTick as er, onBeforeUnmount as Ki, onBeforeMount as Zi, readonly as Qi, watchEffect as eo, watch as Ce, computed as to, createApp as no } from "vue";
const ro = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let Me = null;
function Ge() {
  if (Me)
    return Me;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return Me = t.getAttribute("content"), Me;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (Me = decodeURIComponent(e[1]), Me) : null;
}
function io() {
  Me = null;
}
let U = {
  color: "#29d",
  height: "2px",
  showSpinner: !0,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, G = null, jn = null, te = null, pe = null, en = !1, ft = 0;
function oo(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function ao(t) {
  return (-1 + t) * 100;
}
function si() {
  if (en) return;
  en = !0;
  let t = document.createElement("style");
  t.id = "livue-progress-styles", t.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${U.height};
            background: ${U.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${U.speed}ms ${U.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${U.color}, 0 0 5px ${U.color};
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
            border-top-color: ${U.color};
            border-left-color: ${U.color};
            border-radius: 50%;
            animation: livue-spinner 400ms linear infinite;
        }
        .livue-progress-bar.livue-progress-hidden,
        .livue-progress-spinner.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${U.speed}ms ${U.easing};
        }
        @keyframes livue-spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, document.head.appendChild(t);
}
function lo() {
  if (te) return;
  si(), te = document.createElement("div"), te.className = "livue-progress-bar livue-progress-hidden", te.innerHTML = '<div class="livue-progress-peg"></div>', U.showSpinner && (pe = document.createElement("div"), pe.className = "livue-progress-spinner livue-progress-hidden", pe.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(U.parent) || document.body;
  t.appendChild(te), pe && t.appendChild(pe);
}
function so() {
  if (!en) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), en = !1, si());
}
function uo(t) {
  Object.assign(U, t), so();
}
function co() {
  ft++, G === null && (lo(), G = 0, te && te.classList.remove("livue-progress-hidden"), pe && pe.classList.remove("livue-progress-hidden"), hn(U.minimum), U.trickle && (jn = setInterval(function() {
    ui();
  }, U.trickleSpeed)));
}
function hn(t) {
  G !== null && (t = oo(t, U.minimum, 1), G = t, te && (te.style.transform = "translate3d(" + ao(t) + "%, 0, 0)"));
}
function ui() {
  if (G === null || G >= 1) return;
  let t;
  G < 0.2 ? t = 0.1 : G < 0.5 ? t = 0.04 : G < 0.8 ? t = 0.02 : G < 0.99 ? t = 5e-3 : t = 0, hn(G + t);
}
function ci() {
  ft = Math.max(0, ft - 1), !(ft > 0) && G !== null && (hn(1), clearInterval(jn), jn = null, setTimeout(function() {
    te && te.classList.add("livue-progress-hidden"), pe && pe.classList.add("livue-progress-hidden"), setTimeout(function() {
      G = null, te && (te.style.transform = "translate3d(-100%, 0, 0)");
    }, U.speed);
  }, U.speed));
}
function fo() {
  ft = 0, ci();
}
function po() {
  return G !== null;
}
function ho() {
  return G;
}
const Le = {
  configure: uo,
  start: co,
  set: hn,
  trickle: ui,
  done: ci,
  forceDone: fo,
  isStarted: po,
  getStatus: ho
};
var at = null, mr = !1, Ue = !1, ie = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, he = /* @__PURE__ */ new Map(), Ve = /* @__PURE__ */ new Map(), Fn = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new Map(), _e = null;
function mo(t) {
  Object.assign(ie, t), t.progressBarColor && Le.configure({ color: t.progressBarColor });
}
function vo(t) {
  at = t, !mr && (mr = !0, _e = fi(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: _e },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (di(_e), _e = e.state.pageKey, _t(e.state.url, !1, !0));
  }), yo());
}
function fi() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function di(t) {
  if (!(!ie.restoreScroll || !t)) {
    Wt.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Wt.get(t) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Wt.set(t, i);
      }
    });
  }
}
function go(t) {
  if (!(!ie.restoreScroll || !t)) {
    var e = Wt.get(t);
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
function yo() {
  document.addEventListener("click", bo, !0), ie.prefetch && (document.addEventListener("mouseenter", So, !0), document.addEventListener("mouseleave", Eo, !0), document.addEventListener("mousedown", _o, !0), document.addEventListener("focus", Ao, !0));
}
function bo(t) {
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
        n.startsWith("#") || n.startsWith("javascript:") || e.hasAttribute("download") || e.getAttribute("target") !== "_blank" && (t.preventDefault(), t.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), _t(n, !0, !1));
      }
    }
  }
}
function wo(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function So(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ie.prefetchOnHover)) {
      var n = wo(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            mn(r);
          }, ie.hoverDelay);
          Fn.set(e, i);
        }
      }
    }
  }
}
function Eo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Fn.get(e);
      n && (clearTimeout(n), Fn.delete(e));
    }
  }
}
function _o(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || mn(n);
    }
  }
}
function Ao(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ie.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || mn(n);
    }
  }
}
function mn(t) {
  var e = new URL(t, location.origin).href;
  if (Ve.has(e))
    return Ve.get(e);
  if (he.has(e))
    return Promise.resolve(he.get(e).html);
  var n = fetch(e, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return Ve.delete(e), r.ok ? r.text().then(function(i) {
      return ie.cachePages && pi(e, i), i;
    }) : null;
  }).catch(function(r) {
    return Ve.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Ve.set(e, n), n;
}
function pi(t, e) {
  for (var n = new DOMParser(), r = n.parseFromString(e, "text/html"), i = r.querySelector("title"); he.size >= ie.maxCacheSize; ) {
    var o = he.keys().next().value;
    he.delete(o);
  }
  he.set(t, {
    html: e,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function To() {
  he.clear();
}
function tr(t) {
  Ue || !t || !t.url || (t.navigate ? _t(t.url, !0, !1) : (Ue = !0, window.location.href = t.url));
}
async function _t(t, e, n) {
  if (!Ue) {
    if (!at) {
      window.location.href = t;
      return;
    }
    var r = new URL(t, location.origin).href, i = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: he.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(i)) {
      Ue = !0, n || di(_e), ie.showProgressBar && Le.start();
      try {
        var o, a = he.get(r);
        if (a)
          o = a.html;
        else if (Ve.has(r))
          o = await Ve.get(r);
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
          o = await l.text(), ie.cachePages && pi(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(y) {
              typeof y == "function" && y(u);
            }
          }
        });
        window.dispatchEvent(d);
        var f = Do(), p = /* @__PURE__ */ new Set();
        f.forEach(function(y) {
          y.livueIds.forEach(function(I) {
            p.add(I);
          });
        }), at._stopObserver(), at.destroyExcept(p), f.forEach(function(y) {
          y.element.parentNode && y.element.parentNode.removeChild(y.element);
        });
        var v = u.querySelector("title");
        v && (document.title = v.textContent), document.body.innerHTML = u.body.innerHTML, Co(f);
        var h = u.querySelector('meta[name="csrf-token"]'), w = document.querySelector('meta[name="csrf-token"]');
        if (h && w && (w.setAttribute("content", h.getAttribute("content")), io()), Lo(u), ko(u), e && (_e = fi(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: _e },
          "",
          r
        )), xo(u), at.rebootPreserving(), n)
          go(_e);
        else if (location.hash) {
          var g = document.querySelector(location.hash);
          g ? g.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (y) {
        console.error("[LiVue] Navigation failed:", y), window.location.href = t;
      } finally {
        Ue = !1, ie.showProgressBar && Le.done();
      }
    }
  }
}
function Do() {
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
function Co(t) {
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
function Lo(t) {
  var e = document.querySelectorAll("[data-livue-head]");
  e.forEach(function(r) {
    r.remove();
  });
  var n = t.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function ko(t) {
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
function xo(t) {
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
function No() {
  return Ue;
}
var ze = /* @__PURE__ */ new Map(), Io = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function vr(t, e) {
  return typeof t != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", t), function() {
  }) : typeof e != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (ze.has(t) || ze.set(t, /* @__PURE__ */ new Set()), ze.get(t).add(e), function() {
    var n = ze.get(t);
    n && (n.delete(e), n.size === 0 && ze.delete(t));
  });
}
function re(t, e) {
  var n = ze.get(t);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(e);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + t + '" callback:', i);
    }
  });
}
function hi() {
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
function gr() {
  return Io.slice();
}
var qn = [], zn = [], St = !1;
function Oo(t) {
  return t.isolate ? Po(t) : new Promise(function(e, n) {
    qn.push({
      payload: t,
      resolve: e,
      reject: n
    }), St || (St = !0, queueMicrotask(mi));
  });
}
function Mo(t) {
  return new Promise(function(e, n) {
    zn.push({
      payload: t,
      resolve: e,
      reject: n
    }), St || (St = !0, queueMicrotask(mi));
  });
}
async function mi() {
  var t = qn, e = zn;
  if (qn = [], zn = [], St = !1, !(t.length === 0 && e.length === 0)) {
    Le.start();
    var n = vi(), r = Ge(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = t.map(function(g) {
      return g.payload;
    }), a = e.map(function(g) {
      return g.payload;
    }), l = {};
    o.length > 0 && (l.updates = o), a.length > 0 && (l.lazyLoads = a), re("request.started", {
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
        for (var f = 0; f < t.length; f++)
          t[f].reject(d);
        for (var f = 0; f < e.length; f++)
          e[f].reject(d);
        return;
      }
      for (var p = u.responses || [], v = u.lazyResponses || [], f = 0; f < p.length; f++)
        if (p[f] && p[f].redirect) {
          tr(p[f].redirect);
          return;
        }
      for (var f = 0; f < t.length; f++) {
        var h = p[f];
        if (!h) {
          t[f].reject(new Error("No response for component update at index " + f));
          continue;
        }
        if (h.error) {
          var w = new Error(h.error);
          w.status = h.status || 500, w.data = h, t[f].reject(w);
        } else if (h.errors) {
          var w = new Error("Validation failed");
          w.status = 422, w.data = h, t[f].reject(w);
        } else
          t[f].resolve(h);
      }
      for (var f = 0; f < e.length; f++) {
        var h = v[f];
        if (!h) {
          e[f].reject(new Error("No response for lazy load at index " + f));
          continue;
        }
        if (h.error) {
          var w = new Error(h.error);
          w.status = h.status || 500, w.data = h, e[f].reject(w);
        } else
          e[f].resolve(h);
      }
      re("request.finished", {
        url: n,
        success: !0,
        responses: p,
        lazyResponses: v,
        updateCount: t.length,
        lazyCount: e.length
      });
    } catch (g) {
      for (var f = 0; f < t.length; f++)
        t[f].reject(g);
      for (var f = 0; f < e.length; f++)
        e[f].reject(g);
      re("request.finished", {
        url: n,
        success: !1,
        error: g,
        updateCount: t.length,
        lazyCount: e.length
      });
    } finally {
      Le.done();
    }
  }
}
async function Po(t) {
  Le.start();
  var e = vi(), n = Ge(), r = {
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
      return tr(s.redirect), new Promise(function() {
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
function vi() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function yr(t, e, n, r, i) {
  return Oo({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
function Wn(t) {
  return Te(Object.assign({}, t));
}
function Vo(t, e) {
  let n;
  for (n in e) {
    let r = JSON.stringify(t[n]), i = JSON.stringify(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function gi(t) {
  return JSON.parse(JSON.stringify(t));
}
function Ro(t) {
  return Bi(t);
}
function yn(t, e) {
  if (!e || typeof e != "string")
    return;
  let n = e.split("."), r = t;
  for (let i = 0; i < n.length; i++) {
    if (r == null)
      return;
    r = r[n[i]];
  }
  return r;
}
function xt(t, e, n) {
  if (!e || typeof e != "string")
    return;
  let r = e.split(".");
  if (r.length === 1) {
    t[r[0]] = n;
    return;
  }
  let i = r[0], o = t[i], a = JSON.parse(JSON.stringify(o ?? {})), l = a;
  for (let u = 1; u < r.length - 1; u++) {
    let d = r[u];
    (l[d] === null || l[d] === void 0) && (l[d] = {}), l = l[d];
  }
  let s = r[r.length - 1];
  l[s] = n, t[i] = a;
}
let $n = null, yi = /* @__PURE__ */ new Map();
function Ho() {
  return Te({});
}
function se(t, e) {
  Bn(t);
  for (let n in e)
    t[n] = e[n];
}
function Bn(t) {
  for (let e in t)
    delete t[e];
}
function jo(t) {
  $n = t;
}
function Qe(t, e, n, r) {
  r = r || {};
  let i = !1;
  return re("error.occurred", {
    error: t,
    componentName: e,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : ($n ? $n(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function Fo(t, e) {
  typeof e == "function" && yi.set(t, e);
}
function Un(t) {
  yi.delete(t);
}
var bi = [];
function j(t, e, n) {
  bi.push({
    name: t,
    directive: e
  });
}
function qo() {
  return bi;
}
const De = /* @__PURE__ */ new Map(), ke = /* @__PURE__ */ new Map();
let br = !1;
function Ke() {
  return typeof window < "u" && window.Echo;
}
function zo(t, e) {
  if (!Ke())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = e + ":" + t;
  if (De.has(n))
    return De.get(n);
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
  return De.set(n, r), r;
}
function wi(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!Ke())
    return br || (br = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: f } = o, p = zo(a, l);
    if (!p) continue;
    const v = l + ":" + a + ":" + s + ":" + t;
    if (ke.has(v)) {
      r.push(v);
      continue;
    }
    const h = function(w) {
      try {
        n(u, w);
      } catch (g) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', g);
      }
    };
    if (l === "presence" && d)
      Wo(p, s, h);
    else {
      const w = f ? "." + s : s;
      p.listen(w, h);
    }
    ke.set(v, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: h,
      isPresenceEvent: d,
      isCustomEvent: f
    }), r.push(v);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      Si(r[i]);
  };
}
function Wo(t, e, n) {
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
function Si(t) {
  const e = ke.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    ke.delete(t), $o(e.channelKey);
  }
}
function wr(t) {
  const e = ":" + t, n = [];
  ke.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    Si(n[r]);
}
function $o(t) {
  let e = !1;
  if (ke.forEach(function(r) {
    r.channelKey === t && (e = !0);
  }), e) return;
  if (De.get(t) && Ke()) {
    const r = t.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  De.delete(t);
}
function Sr() {
  ke.clear(), De.forEach(function(t, e) {
    if (Ke()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), De.clear();
}
function Bo() {
  return {
    echoAvailable: Ke(),
    channels: Array.from(De.keys()),
    subscriptions: Array.from(ke.keys())
  };
}
function Uo() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Se = /* @__PURE__ */ new Map();
function tn(t, e, n, r) {
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
function $t(t, e, n, r, i, o) {
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
function Er(t) {
  Se.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Se.delete(n);
  });
}
function Jo(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    $t(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Xo(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, l = e[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function nr() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function Yo(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", t), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = nr();
    s.open("POST", u, !0);
    var d = Ge();
    d && s.setRequestHeader("X-CSRF-TOKEN", d), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(f) {
      if (f.lengthComputable) {
        var p = Math.round(f.loaded / f.total * 100);
        i(p);
      }
    }), s.onload = function() {
      var f;
      try {
        f = JSON.parse(s.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (s.status >= 200 && s.status < 300)
        o(f);
      else {
        var p = new Error(f.error || f.message || "Upload failed");
        p.status = s.status, p.data = f, a(p);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function bn(t) {
  if (!t || t.length === 0) return Promise.resolve();
  var e = nr() + "-remove", n = Ge();
  return fetch(e, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-TOKEN": n || ""
    },
    body: JSON.stringify({ refs: t })
  }).catch(function() {
  });
}
function Go(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(t), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", e), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = nr();
    u.open("POST", d, !0);
    var f = Ge();
    f && u.setRequestHeader("X-CSRF-TOKEN", f), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(p) {
      if (p.lengthComputable) {
        var v = Math.round(p.loaded / p.total * 100);
        i({ overall: v });
      }
    }), u.onload = function() {
      var p;
      try {
        p = JSON.parse(u.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (u.status >= 200 && u.status < 300)
        o({
          results: p.results || [],
          errors: p.errors || []
        });
      else {
        var v = new Error(p.error || p.message || "Upload failed");
        v.status = u.status, v.data = p, a(v);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(s);
  });
}
const Ko = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var _r;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(_r || (_r = {}));
function Zo() {
  const t = Ui(!0), e = t.run(() => Qt({}));
  let n = [], r = [];
  const i = Ji({
    install(o) {
      i._a = o, o.provide(Ko, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
function nn(t, e) {
  let n = t.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), t;
  n[1];
  let r = n.index + n[0].length;
  return t.slice(0, r) + " " + e + t.slice(r);
}
let wn = 0;
function Qo(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
function ea(t) {
  return Xi({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = Qt(!1), i = oi(null), o = null, a = Qt(null);
      async function l() {
        if (!r.value)
          try {
            let u = await Mo({
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
        wn++;
        let f = "lazy-" + wn + "-" + Date.now(), p = d.memo ? d.memo.name : "", v = Qo(d.state || {}), h = d.memo || {}, { createLivueHelper: w, buildComponentDef: g, processTemplate: y, createReactiveState: I } = t._lazyHelpers, x = I(v), D = JSON.parse(JSON.stringify(v)), T = { _updateTemplate: null }, C = w(
          f,
          x,
          h,
          T,
          D,
          u.snapshot
        );
        h.errors && se(C.errors, h.errors);
        let H = "livue-lazy-child-" + wn, S = y(u.html, t), c = nn(
          S.template,
          'data-livue-id="' + f + '"'
        ), E = g(c, x, C, t._versions, p);
        t._childRegistry[f] = {
          tagName: H,
          state: x,
          memo: h,
          livue: C,
          componentRef: T,
          name: p,
          id: f
        }, T._updateTemplate = function(A) {
          let m = y(A, t), O = nn(
            m.template,
            'data-livue-id="' + f + '"'
          );
          for (let M in m.childDefs)
            t.vueApp._context.components[M] || t.vueApp.component(M, m.childDefs[M]);
          let R = g(O, x, C, t._versions, p);
          t.vueApp._context.components[H] = R, t._versions[H] = (t._versions[H] || 0) + 1, i.value = R;
        };
        let _ = h.listeners || null;
        if (_)
          for (let A in _)
            (function(m, O) {
              tn(A, p, f, function(R) {
                O.call(m, R);
              });
            })(_[A], C);
        for (let A in S.childDefs)
          t.vueApp._context.components[A] || t.vueApp.component(A, S.childDefs[A]);
        t._versions[H] = 0, t.vueApp._context.components[H] || t.vueApp.component(H, E), i.value = E, r.value = !0;
      }
      return ai(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), li(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? hr(i.value) : hr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
let dt = /* @__PURE__ */ new Map(), pt = /* @__PURE__ */ new Map();
function Xe(t, e) {
  let n = t + ":debounce:" + e;
  if (!dt.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let f = i, p = o, v = a;
          i = null, o = null, a = null, Promise.resolve(f()).then(p).catch(v);
        }, e);
      });
    };
    dt.set(n, l);
  }
  return dt.get(n);
}
function Et(t, e) {
  let n = t + ":throttle:" + e;
  if (!pt.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < e ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    pt.set(n, i);
  }
  return pt.get(n);
}
function Ar(t) {
  let e = t + ":";
  for (let n of dt.keys())
    n.startsWith(e) && dt.delete(n);
  for (let n of pt.keys())
    n.startsWith(e) && pt.delete(n);
}
const rn = "livue-tab-sync";
let rr = Date.now() + "-" + Math.random().toString(36).substr(2, 9), on = null, ir = /* @__PURE__ */ new Map(), Tr = !1;
function Ei() {
  Tr || (Tr = !0, typeof BroadcastChannel < "u" ? (on = new BroadcastChannel(rn), on.onmessage = ta) : window.addEventListener("storage", na));
}
function ta(t) {
  let e = t.data;
  e.tabId !== rr && _i(e);
}
function na(t) {
  if (t.key === rn && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === rr) return;
      _i(e);
    } catch {
    }
}
function _i(t) {
  let e = ir.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function ra(t, e) {
  Ei(), ir.set(t, e);
}
function Dr(t) {
  ir.delete(t);
}
function ia(t, e, n, r) {
  Ei();
  let i = {
    tabId: rr,
    component: t,
    state: e,
    properties: n,
    config: r
  };
  if (on)
    on.postMessage(i);
  else
    try {
      localStorage.setItem(rn, JSON.stringify(i)), localStorage.removeItem(rn);
    } catch {
    }
}
function oa(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
let Cr = 0;
function Jn() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Sn = /* @__PURE__ */ new WeakMap();
function Lr() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const aa = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (Cr++, r = "livue-transition-" + Cr), Sn.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), Jn() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    Lr();
  },
  updated(t, e) {
    let n = Sn.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), Jn() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    Sn.delete(t), t.removeAttribute("data-livue-transition"), Lr();
  }
};
function la(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const or = /* @__PURE__ */ new Map();
async function sa(t, e = {}) {
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
        "X-CSRF-TOKEN": Ge(),
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
      const { done: d, value: f } = await a.read();
      if (d)
        break;
      s += l.decode(f, { stream: !0 });
      const p = s.split(`
`);
      s = p.pop() || "";
      for (const v of p)
        if (v.trim())
          try {
            const h = JSON.parse(v);
            if (h.stream)
              ua(h.stream), n(h.stream);
            else {
              if (h.error)
                throw new Error(h.error);
              h.snapshot && (u = h);
            }
          } catch (h) {
            console.error("[LiVue Stream] Parse error:", h, v);
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
function ua(t) {
  const { to: e, content: n, replace: r } = t, i = or.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function kr(t, e, n = !1) {
  or.set(t, { el: e, replace: n });
}
function xr(t) {
  or.delete(t);
}
function ca(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function ar(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    ca(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = ar(r) : e[n] = r;
  }
  return e;
}
function fa(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = ar(l), d = {};
    for (let f in s)
      d[f] = /* @__PURE__ */ (function(p, v) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return e(p + "." + v, h);
        };
      })(a, f);
    i[a] = Te(Object.assign({}, u, d));
  }
  return i;
}
function da(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = ar(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function pa(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
function ha(t) {
  var e = document.activeElement;
  return !e || !t.contains(e) ? null : {
    id: e.id || null,
    name: e.getAttribute("name") || null,
    tagName: e.tagName,
    type: e.type || null,
    placeholder: e.getAttribute("placeholder") || null,
    ariaLabel: e.getAttribute("aria-label") || null,
    selectionStart: e.selectionStart !== void 0 ? e.selectionStart : null,
    selectionEnd: e.selectionEnd !== void 0 ? e.selectionEnd : null,
    scrollTop: e.scrollTop
  };
}
function ma(t, e) {
  if (e) {
    var n = null;
    if (e.id && (n = t.querySelector("#" + CSS.escape(e.id))), !n && e.name && (n = t.querySelector('[name="' + e.name + '"]')), !n && e.tagName === "INPUT" && e.placeholder) {
      var r = "input";
      e.type && (r += '[type="' + e.type + '"]'), r += '[placeholder="' + CSS.escape(e.placeholder) + '"]', n = t.querySelector(r);
    }
    if (!n && e.tagName === "INPUT" && e.ariaLabel) {
      var r = "input";
      e.type && (r += '[type="' + e.type + '"]'), r += '[aria-label="' + CSS.escape(e.ariaLabel) + '"]', n = t.querySelector(r);
    }
    if (!n && e.tagName === "INPUT" && e.type) {
      var i = t.querySelectorAll('input[type="' + e.type + '"]');
      i.length === 1 && (n = i[0]);
    }
    if (!n && e.tagName === "TEXTAREA") {
      var i = t.querySelectorAll("textarea");
      i.length === 1 && (n = i[0]);
    }
    if (!n && e.tagName === "SELECT") {
      var i = t.querySelectorAll("select");
      i.length === 1 && (n = i[0]);
    }
    if (n && typeof n.focus == "function") {
      if (n.focus(), e.selectionStart !== null && typeof n.setSelectionRange == "function")
        try {
          n.setSelectionRange(e.selectionStart, e.selectionEnd);
        } catch {
        }
      n.scrollTop = e.scrollTop;
    }
  }
}
let Nr = 0, Ai = /* @__PURE__ */ new Map();
function va(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function ga(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Ti(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Ai.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: va(n)
    });
  });
}
function Di(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Ai.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && ga(n, i.inputs));
  });
}
function Nt(t, e) {
  let n = {}, r = gi(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function ya(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function Xn(t) {
  if (ya(t))
    return t[0];
  if (Array.isArray(t))
    return t.map(Xn);
  if (t && typeof t == "object") {
    let e = {};
    for (let n in t)
      e[n] = Xn(t[n]);
    return e;
  }
  return t;
}
function an(t) {
  let e = {};
  for (let n in t)
    e[n] = Xn(t[n]);
  return e;
}
let Ci = {
  ref: Qt,
  computed: to,
  watch: Ce,
  watchEffect: eo,
  reactive: Te,
  readonly: Qi,
  onMounted: ai,
  onUnmounted: li,
  onBeforeMount: Zi,
  onBeforeUnmount: Ki,
  nextTick: er,
  provide: Gi,
  inject: Yi
}, Li = Object.keys(Ci), ba = Li.map(function(t) {
  return Ci[t];
});
function wa(t) {
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
function Sa(t, e, n) {
  let r = Object.keys(e), i = r.map(function(l) {
    return e[l];
  }), o = Li.concat(r).concat(["livue"]), a = ba.concat(i).concat([n]);
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
function Ea(t) {
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
function ht(t, e, n, r, i, o) {
  let a = Ea(t), l = wa(a);
  return {
    name: o || "LiVueComponent",
    template: l.html,
    setup: function() {
      let s = Ro(e), u = Object.assign({}, s, r, { livue: n, livueV: i });
      if (l.setupCode) {
        let d = Sa(l.setupCode, s, n);
        d && Object.assign(u, d);
      }
      return u;
    }
  };
}
function Yn(t, e, n, r, i, o, a) {
  a = a || {};
  let l = Ho(), s = n.name, u = n.vueMethods || {}, d = n.confirms || {}, f = n.isolate || !1, p = n.urlParams || null, v = n.uploads || null, h = n.tabSync || null, w = !1, g = i, y = o;
  function I(c) {
    let E = document.querySelector('meta[name="livue-prefix"]'), A = "/" + (E ? E.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(c.token), m = document.createElement("a");
    m.href = A, m.download = c.name, m.style.display = "none", document.body.appendChild(m), m.click(), document.body.removeChild(m);
  }
  function x() {
    let c = Nt(g, e);
    return {
      snapshot: y,
      diffs: c
    };
  }
  function D(c, E) {
    if (c.redirect) {
      tr(c.redirect);
      return;
    }
    if (c.errorBoundary) {
      let m = c.errorBoundary;
      S.errorState.hasError = m.hasError, S.errorState.errorMessage = m.errorMessage, S.errorState.errorDetails = m.errorDetails, S.errorState.recover = m.recover, (!m.errorHandled || !m.recover) && re("error.occurred", {
        error: new Error(m.errorMessage || "Component error"),
        componentName: s,
        componentId: t,
        context: { method: m.errorMethod, serverHandled: m.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (c.download && I(c.download), c.snapshot) {
      let m = JSON.parse(c.snapshot);
      if (m.state) {
        let O = an(m.state);
        Vo(e, O), g = JSON.parse(JSON.stringify(O));
      }
      y = c.snapshot, m.memo && (m.memo.errors ? se(S.errors, m.memo.errors) : Bn(S.errors), m.memo.vueMethods && (u = m.memo.vueMethods), m.memo.urlParams && (p = m.memo.urlParams), m.memo.uploads && (v = m.memo.uploads), m.memo.confirms && (d = m.memo.confirms), (m.memo.composables || m.memo.composableActions) && da(C, m.memo));
    }
    if (p && Xo(p, e), c.html && r && r._updateTemplate) {
      let m = {};
      if (c.snapshot) {
        let O = JSON.parse(c.snapshot);
        O.memo && (O.memo.transitionType && (m.transitionType = O.memo.transitionType), O.memo.skipTransition && (m.skipTransition = !0));
      }
      r._updateTemplate(c.html, m);
    }
    if (c.events && c.events.length > 0) {
      for (var _ = 0; _ < c.events.length; _++)
        c.events[_].sourceId = t;
      Jo(c.events);
    }
    if (c.js && c.js.length > 0)
      for (var A = 0; A < c.js.length; A++)
        try {
          new Function("state", "livue", c.js[A])(e, S);
        } catch (m) {
          console.error("[LiVue] Error executing ->vue() JS:", m);
        }
    if (c.benchmark && re("benchmark.received", {
      componentId: t,
      componentName: s,
      timings: c.benchmark
    }), h && h.enabled && c.snapshot && !w && JSON.parse(c.snapshot).state) {
      let O = gi(e), R = [];
      for (let M in O)
        (!E || !(M in E)) && R.push(M);
      if (R.length > 0) {
        let M = oa(O, R, h);
        Object.keys(M).length > 0 && ia(s, M, R, h);
      }
    }
    if (w = !1, c.jsonResult !== void 0)
      return c.jsonResult;
  }
  let T = Te({}), C = {}, H = function(c, E) {
    return S.call(c, E);
  };
  pa(n) && (C = fa(n, H));
  let S = Te({
    loading: !1,
    processing: null,
    errors: l,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: T,
    refs: {},
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(c) {
      let E = Nt(g, e);
      return c === void 0 ? Object.keys(E).length > 0 : c in E;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let c = Nt(g, e);
      return new Set(Object.keys(c));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(c) {
      return c === void 0 ? JSON.parse(JSON.stringify(g)) : g[c] !== void 0 ? JSON.parse(JSON.stringify(g[c])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(c) {
      c in g && (e[c] = JSON.parse(JSON.stringify(g[c])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let c in g)
        c in e && (e[c] = JSON.parse(JSON.stringify(g[c])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(c) {
      return c ? T[c] || !1 : S.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(c) {
      let E = c ? T[c] || !1 : S.loading;
      return {
        "aria-busy": E,
        disabled: E
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
    call: async function(c, E, _) {
      let A, m = null;
      if (arguments.length === 1 ? A = [] : arguments.length === 2 ? Array.isArray(E) ? A = E : A = [E] : arguments.length >= 3 && (Array.isArray(E) && _ && typeof _ == "object" && (_.debounce || _.throttle) ? (A = E, m = _) : A = Array.prototype.slice.call(arguments, 1)), u[c]) {
        try {
          new Function("state", "livue", u[c])(e, S);
        } catch (R) {
          console.error('[LiVue] Error executing #[Vue] method "' + c + '":', R);
        }
        return;
      }
      let O = async function() {
        if (d[c] && !await S._showConfirm(d[c]))
          return;
        S.loading = !0, S.processing = c, T[c] = !0;
        let R;
        try {
          let M = x(), oe = await yr(M.snapshot, c, A, M.diffs, f);
          R = D(oe, M.diffs);
        } catch (M) {
          M.status === 422 && M.data && M.data.errors ? se(S.errors, M.data.errors) : Qe(M, s);
        } finally {
          S.loading = !1, S.processing = null, delete T[c];
        }
        return R;
      };
      return m && m.debounce ? Xe(t + ":" + c, m.debounce)(O) : m && m.throttle ? Et(t + ":" + c, m.throttle)(O) : O();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(c, E) {
      let _ = Array.prototype.slice.call(arguments, 2), A = { message: E || "Are you sure?" };
      if (await S._showConfirm(A))
        return S.call.apply(S, [c].concat(_));
    },
    /**
     * Show confirmation dialog (native or custom).
     * @param {object} config - { message, title, confirmText, cancelText }
     * @returns {Promise<boolean>}
     * @private
     */
    _showConfirm: function(c) {
      return window.LiVue && window.LiVue.confirmHandler ? window.LiVue.confirmHandler(c) : Promise.resolve(window.confirm(c.message));
    },
    /**
     * Set a local state property without server call.
     * @param {string} key
     * @param {*} value
     */
    set: function(c, E) {
      e[c] = E;
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      S.loading = !0, S.processing = "$sync";
      try {
        let c = x(), E = await yr(c.snapshot, null, [], c.diffs, f);
        D(E, c.diffs);
      } catch (c) {
        c.status === 422 && c.data && c.data.errors ? se(S.errors, c.data.errors) : Qe(c, s);
      } finally {
        S.loading = !1, S.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      Bn(S.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(c, E) {
      $t(c, E, "broadcast", s, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(c, E, _) {
      $t(E, _, "to", s, t, c);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(c, E) {
      $t(c, E, "self", s, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(c) {
      _t(c, !0);
    },
    /**
     * Upload a single file for a component property.
     * The file is sent to /livue/upload, and on success the property
     * is set to an upload reference that the server can hydrate.
     *
     * Supports nested paths like "data.avatar" or "form.profile.photo".
     *
     * @param {string} property - The component property name or dot-notated path
     * @param {File} file - The File object from the input
     */
    upload: async function(c, E) {
      if (!v || !v[c]) {
        console.error('[LiVue] Property "' + c + '" is not configured for uploads.');
        return;
      }
      var _ = yn(e, c);
      _ && _.__livue_upload && _.ref && bn([_.ref]), S.uploading = !0, S.uploadProgress = 0;
      try {
        var A = await Yo(E, s, c, v[c].token, function(m) {
          S.uploadProgress = m;
        });
        xt(e, c, {
          __livue_upload: !0,
          ref: A.ref,
          originalName: A.originalName,
          mimeType: A.mimeType,
          size: A.size,
          previewUrl: A.previewUrl
        });
      } catch (m) {
        m.status === 422 && m.data && m.data.errors ? se(S.errors, m.data.errors) : Qe(m, s);
      } finally {
        S.uploading = !1, S.uploadProgress = 0;
      }
    },
    /**
     * Upload multiple files for an array property.
     * Each file is uploaded sequentially, and the property is set
     * to an array of upload references.
     *
     * Supports nested paths like "data.documents" or "form.attachments".
     *
     * @param {string} property - The component property name or dot-notated path
     * @param {FileList|File[]} files - The File objects from the input
     */
    uploadMultiple: async function(c, E) {
      if (!v || !v[c]) {
        console.error('[LiVue] Property "' + c + '" is not configured for uploads.');
        return;
      }
      S.uploading = !0, S.uploadProgress = 0;
      try {
        var _ = await Go(E, s, c, v[c].token, function(F) {
          S.uploadProgress = F.overall;
        }), A = _.results || [], m = _.errors || [], O = yn(e, c), R = Array.isArray(O) ? O : [];
        if (A.length > 0) {
          var M = A.map(function(F) {
            return {
              __livue_upload: !0,
              ref: F.ref,
              originalName: F.originalName,
              mimeType: F.mimeType,
              size: F.size,
              previewUrl: F.previewUrl
            };
          });
          xt(e, c, R.concat(M));
        }
        if (m.length > 0) {
          var oe = {};
          m.forEach(function(F) {
            var xe = c + "." + F.index;
            oe[xe] = {
              file: F.file,
              message: F.error
            };
          }), se(S.errors, oe);
        }
      } catch (F) {
        F.status === 422 && F.data && F.data.errors ? se(S.errors, F.data.errors) : Qe(F, s);
      } finally {
        S.uploading = !1, S.uploadProgress = 0;
      }
    },
    /**
     * Remove an uploaded file from a property.
     * For single file properties, sets to null.
     * For array properties, removes by index.
     *
     * Supports nested paths like "data.avatar" or "form.documents".
     *
     * @param {string} property - The property name or dot-notated path
     * @param {number} [index] - For array properties, the index to remove
     */
    removeUpload: function(c, E) {
      var _ = yn(e, c);
      if (E !== void 0 && Array.isArray(_)) {
        var A = _[E];
        A && A.__livue_upload && A.ref && bn([A.ref]), _.splice(E, 1), xt(e, c, _.slice());
      } else
        _ && _.__livue_upload && _.ref && bn([_.ref]), xt(e, c, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(c, E) {
      E = E || [], S.loading = !0, S.streaming = !0, S.processing = c, S.streamingMethod = c, T[c] = !0;
      let _;
      try {
        let A = x();
        A.method = c, A.params = E, A.componentId = t;
        let m = await sa(A, {
          onChunk: function(O) {
          },
          onComplete: function(O) {
          },
          onError: function(O) {
            console.error("[LiVue Stream] Error:", O);
          }
        });
        m && (_ = D(m, A.diffs));
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? se(S.errors, A.data.errors) : Qe(A, s);
      } finally {
        S.loading = !1, S.streaming = !1, S.processing = null, S.streamingMethod = null, delete T[c];
      }
      return _;
    },
    /**
     * Toggle a boolean property.
     * @param {string} property - Property name to toggle
     */
    toggle: function(c) {
      c in e && (e[c] = !e[c]);
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
    watch: function(c, E) {
      return typeof E != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Ce(
        function() {
          return e[c];
        },
        function(_, A) {
          E(_, A);
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
    onError: function(c) {
      return typeof c != "function" ? (console.warn("[LiVue] onError handler must be a function"), function() {
      }) : (Fo(t, c), function() {
        Un(t);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: Te({
      hasError: !1,
      errorMessage: null,
      errorDetails: null,
      recover: !0
    }),
    /**
     * Clear the error state (used for recovery).
     */
    clearError: function() {
      S.errorState.hasError = !1, S.errorState.errorMessage = null, S.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(c, E) {
      g = JSON.parse(JSON.stringify(c)), y = E;
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
      let c = Nt(g, e), E = {};
      for (let _ in C) {
        let A = C[_], m = {}, O = [];
        for (let R in A)
          if (typeof A[R] == "function")
            O.push(R);
          else
            try {
              m[R] = JSON.parse(JSON.stringify(A[R]));
            } catch {
              m[R] = "[Unserializable]";
            }
        E[_] = { data: m, actions: O };
      }
      return {
        serverState: JSON.parse(JSON.stringify(g)),
        clientState: JSON.parse(JSON.stringify(e)),
        dirtyFields: Object.keys(c),
        diffs: c,
        memo: {
          name: s,
          isolate: f,
          urlParams: p,
          tabSync: h,
          hasUploads: !!v,
          uploadProps: v ? Object.keys(v) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(d),
          composableNames: Object.keys(C)
        },
        composables: E,
        uploading: S.uploading,
        uploadProgress: S.uploadProgress,
        streaming: S.streaming,
        streamingMethod: S.streamingMethod,
        errorState: {
          hasError: S.errorState.hasError,
          errorMessage: S.errorState.errorMessage
        }
      };
    }
  });
  for (let c in C)
    S[c] = C[c];
  return h && h.enabled && ra(s, function(c, E, _) {
    let A = !1;
    if (_.reactive === !0)
      A = !0;
    else if (Array.isArray(_.reactive) && _.reactive.length > 0) {
      for (let m in c)
        if (_.reactive.includes(m)) {
          A = !0;
          break;
        }
    }
    if (A) {
      for (let m in c)
        _.only && !_.only.includes(m) || _.except && _.except.includes(m) || m in e && (e[m] = c[m]);
      w = !0, S.sync();
      return;
    }
    for (let m in c)
      _.only && !_.only.includes(m) || _.except && _.except.includes(m) || m in e && (e[m] = c[m]);
    for (let m in c)
      _.only && !_.only.includes(m) || _.except && _.except.includes(m) || (g[m] = JSON.parse(JSON.stringify(c[m])));
  }), { livue: S, composables: C };
}
function Bt(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", f = JSON.parse(d), p = f.memo ? f.memo.name : "", v = an(f.state || {}), h = f.memo || {}, w = s.innerHTML, g = s.tagName.toLowerCase(), y = e._childRegistry[u];
    if (!y)
      for (let c in e._childRegistry) {
        let E = e._childRegistry[c];
        if (E.name === p && !o[c]) {
          y = E;
          break;
        }
      }
    if (y) {
      o[y.id] = !0, y.rootTag = g;
      let c = h.reactive || [];
      if (c.length > 0) {
        for (var I = 0; I < c.length; I++) {
          var x = c[I];
          x in v && (y.state[x] = v[x]);
        }
        y.livue._updateServerState(v, d), y.componentRef && y.componentRef._updateTemplate && y.componentRef._updateTemplate(w);
      }
    }
    let D = !y;
    if (!y) {
      Nr++;
      let c = "livue-child-" + Nr, E = Wn(v), _ = JSON.parse(JSON.stringify(v)), A = Object.assign({ name: h.name || p }, h), m = { _updateTemplate: null }, O = hi(), R = Yn(u, E, A, m, _, d, {
        el: s,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: O
      }), M = R.livue, oe = R.composables;
      re("component.init", {
        component: { id: u, name: p, state: E, livue: M },
        el: s,
        cleanup: O.cleanup,
        isChild: !0
      });
      let F = h.errors || null;
      F && se(M.errors, F), y = {
        tagName: c,
        state: E,
        memo: A,
        livue: M,
        composables: oe,
        componentRef: m,
        name: p,
        id: u,
        rootTag: g
      };
      let xe = h.listeners || null;
      if (xe)
        for (let fe in xe)
          (function(ye, Ne) {
            tn(fe, p, u, function(Ze) {
              Ne.call(ye, Ze);
            });
          })(xe[fe], M);
      let kt = h.echo || null;
      kt && kt.length && (function(fe, ye) {
        wi(fe, kt, function(Ne, Ze) {
          ye.call(Ne, Ze);
        });
      })(u, M), m._updateTemplate = function(fe) {
        let ye = e.el.querySelector('[data-livue-id="' + u + '"]');
        ye && Ti(ye);
        let Ne = Bt(fe, e), Ze = nn(
          Ne.template,
          'data-livue-id="' + u + '"'
        );
        for (let He in Ne.childDefs)
          e.vueApp._context.components[He] || e.vueApp.component(He, Ne.childDefs[He]);
        e.vueApp._context.components[y.tagName] = ht(Ze, y.state, y.livue, y.composables || {}, e._versions, y.name), e._versions[y.tagName] = (e._versions[y.tagName] || 0) + 1, er(function() {
          let He = e.el.querySelector('[data-livue-id="' + u + '"]');
          He && Di(He);
        });
      }, e._childRegistry[u] = y;
    }
    let T = y.tagName, C = s.dataset.livueRef;
    C && e._rootLivue && (e._rootLivue.refs[C] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(c, E) {
        return y.livue.call(c, E || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(c, E) {
        return y.livue.set(c, E);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(c, E) {
        return y.livue.dispatch(c, E);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return y.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return y.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return y.livue;
      }
    });
    let H = s.dataset.livueModel;
    if (H && e._rootState && tn("$modelUpdate", y.name, u, function(c) {
      c && c.value !== void 0 && (e._rootState[H] = c.value);
    }), D) {
      let c = nn(
        "<" + g + ">" + w + "</" + g + ">",
        'data-livue-id="' + u + '"'
      );
      i[T] = ht(
        c,
        y.state,
        y.livue,
        y.composables || {},
        e._versions,
        y.name
      );
    }
    e._versions[T] === void 0 && (e._versions[T] = 0);
    let S = document.createElement(T);
    S.setAttribute(":key", "livueV['" + T + "']"), s.parentNode.replaceChild(S, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
class _a {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = Wn(an(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Te({}), this._rootDefRef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: Yn,
      buildComponentDef: ht,
      processTemplate: Bt,
      createReactiveState: Wn
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
      _updateTemplate: function(w, g) {
        g = g || {}, re("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: w
        });
        var y = ha(r.el);
        Ti(r.el);
        let I = Bt(w, r);
        for (let D in I.childDefs)
          r.vueApp._context.components[D] || r.vueApp.component(D, I.childDefs[D]);
        function x() {
          r._rootDefRef.value = ht(I.template, r.state, r._rootLivue, r._rootComposables || {}, r._versions, r.name), er(function() {
            Di(r.el), ma(r.el, y), re("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (g.skipTransition) {
          x();
          return;
        }
        Jn() ? la(x, { type: g.transitionType }) : x();
      }
    }, o = JSON.parse(JSON.stringify(an(e.state || {})));
    this._cleanups = hi();
    let a = Yn(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, re("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u = Bt(this.el.innerHTML, this), d = e.memo && e.memo.errors || null;
    d && se(l.errors, d);
    let f = e.memo && e.memo.listeners || null;
    if (f)
      for (let w in f)
        (function(g, y, I, x) {
          tn(w, I, x, function(D) {
            y.call(g, D);
          });
        })(f[w], l, r.name, r.componentId);
    let p = e.memo && e.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = wi(r.componentId, p, function(w, g) {
      l.call(w, g);
    }));
    let v = ht(u.template, r.state, l, s, r._versions, r.name);
    this._rootDefRef = oi(v), this.vueApp = no({
      setup: function() {
        return {
          rootDef: r._rootDefRef
        };
      },
      template: '<component :is="rootDef"></component>'
    });
    let h;
    for (h in u.childDefs)
      this.vueApp._context.components[h] || this.vueApp.component(h, u.childDefs[h]);
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", ea(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = Zo();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = qo();
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
      re("component.destroy", {
        component: { id: e, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Er(e), Ar(e), Un(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Dr(n.name), wr(e);
    }
    re("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Er(this.componentId), Ar(this.componentId), Un(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Dr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), wr(this.componentId), this.vueApp && (this.vueApp.unmount(), this.vueApp = null);
  }
}
let Ir = /* @__PURE__ */ new Set();
function Aa(t) {
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
const Ta = {
  mounted(t, e, n) {
    let r = Aa(n);
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
    Ir.has(u) || (Ir.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, En = /* @__PURE__ */ new WeakMap();
function Da(t) {
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
const Ca = {
  mounted(t, e, n) {
    t.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + t.tagName.toLowerCase() + ">");
    let r = Da(n);
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
    t.addEventListener("submit", l), En.set(t, l);
  },
  unmounted(t) {
    let e = En.get(t);
    e && (t.removeEventListener("submit", e), En.delete(t));
  }
}, It = /* @__PURE__ */ new WeakMap();
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
const ka = {
  mounted(t, e, n) {
    let r = La(n);
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
      let h = parseInt(s, 10);
      isNaN(h) || (d = h + "px");
    }
    let f = l.leave === !0, p = !1, v = new IntersectionObserver(
      function(h) {
        let w = h[0];
        (f ? !w.isIntersecting : w.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (v.disconnect(), It.delete(t)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    v.observe(t), It.set(t, v);
  },
  unmounted(t) {
    let e = It.get(t);
    e && (e.disconnect(), It.delete(t));
  }
}, _n = /* @__PURE__ */ new WeakMap();
function An(t, e) {
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
const xa = {
  mounted(t, e) {
    An(t, e);
    let n = function() {
      An(t, e);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), _n.set(t, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(t, e) {
    An(t, e);
  },
  unmounted(t, e) {
    let n = e.value;
    typeof n == "string" && n.split(" ").filter(function(i) {
      return i.trim();
    }).forEach(function(i) {
      t.classList.remove(i);
    }), t.removeAttribute("data-current");
    let r = _n.get(t);
    r && (r(), _n.delete(t));
  }
};
let Or = 0;
const Na = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    Or++;
    let n = "livue-ignore-" + Or;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, et = /* @__PURE__ */ new WeakMap();
let Mr = 0;
function Ia(t) {
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
function Oa(t) {
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
function Ot(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Pr(t, e) {
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
function Ma(t) {
  return !!t.component;
}
const Pa = {
  mounted(t, e, n) {
    let r = Ia(n);
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
    Mr++;
    let s = "model-" + Mr, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: f } = Oa(l);
    l.live && !d && !f && (d = 150);
    function p(T) {
      if (l.number) {
        let C = Number(T);
        T = isNaN(C) ? 0 : C;
      }
      l.boolean && (T = !!T && T !== "false" && T !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = T : o[a] = T;
    }
    function v(T) {
      d > 0 ? Xe(s, d)(function() {
        p(T);
      }) : f > 0 ? Et(s, f)(function() {
        p(T);
      }) : p(T);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let w = Ma(n), g = n.component, y = null, I = null, x = null, D = null;
    if (w && g)
      D = g.emit, g.emit = function(T, ...C) {
        if (T === "update:modelValue") {
          let H = C[0];
          v(H);
          return;
        }
        return D.call(g, T, ...C);
      }, g.props && "modelValue" in g.props && (x = Ce(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(T) {
          g.vnode && g.vnode.props && (g.vnode.props.modelValue = T), g.exposed && typeof g.exposed.setValue == "function" && g.exposed.setValue(T), g.update && g.update();
        },
        { immediate: !0 }
      )), et.set(t, {
        isComponent: !0,
        componentInstance: g,
        originalEmit: D,
        stopWatcher: x,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let T = Xe(s, d);
        y = function(C) {
          let H = Ot(C.target);
          T(function() {
            p(H);
          });
        };
      } else if (f > 0) {
        let T = Et(s, f);
        y = function(C) {
          let H = Ot(C.target);
          T(function() {
            p(H);
          });
        };
      } else
        y = function(T) {
          p(Ot(T.target));
        };
      l.enter ? (I = function(T) {
        T.key === "Enter" && p(Ot(T.target));
      }, t.addEventListener("keyup", I)) : t.addEventListener(u, y), Pr(t, h), et.set(t, {
        isComponent: !1,
        handler: y,
        keyHandler: I,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(t, e, n) {
    let r = et.get(t);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], Pr(t, a);
    }
  },
  unmounted(t) {
    let e = et.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), et.delete(t));
  }
}, Tn = /* @__PURE__ */ new WeakMap(), Va = 2500;
function Ra(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Va;
}
function Ha(t) {
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
const ja = {
  mounted(t, e, n) {
    let r = Ha(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = e.modifiers || {}, s = Ra(l), u = l["keep-alive"] === !0, d = l.visible === !0, f = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      f.isPaused || d && !f.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function v() {
      f.intervalId || (f.intervalId = setInterval(p, s));
    }
    function h() {
      u || (document.hidden ? f.isPaused = !0 : f.isPaused = !1);
    }
    d && (f.observer = new IntersectionObserver(
      function(w) {
        f.isVisible = w[0].isIntersecting;
      },
      { threshold: 0 }
    ), f.observer.observe(t)), document.addEventListener("visibilitychange", h), f.visibilityHandler = h, v(), Tn.set(t, f);
  },
  unmounted(t) {
    let e = Tn.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), Tn.delete(t));
  }
}, Mt = /* @__PURE__ */ new WeakMap();
let ln = typeof navigator < "u" ? navigator.onLine : !0, sn = /* @__PURE__ */ new Set(), Vr = !1;
function Fa() {
  Vr || typeof window > "u" || (Vr = !0, window.addEventListener("online", function() {
    ln = !0, sn.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    ln = !1, sn.forEach(function(t) {
      t(!1);
    });
  }));
}
const qa = {
  created(t, e) {
    Fa();
    let n = e.modifiers || {}, r = e.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = t.style.display || "", ln && (t.style.display = "none")), Mt.set(t, o);
  },
  mounted(t, e) {
    let n = Mt.get(t);
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
    r(ln), n.updateFn = r, sn.add(r);
  },
  unmounted(t) {
    let e = Mt.get(t);
    e && e.updateFn && sn.delete(e.updateFn), Mt.delete(t);
  }
};
let Rr = 0;
const tt = /* @__PURE__ */ new WeakMap(), Dn = /* @__PURE__ */ new Map(), za = {
  created(t, e) {
    Rr++;
    let n = "livue-replace-" + Rr, r = e.modifiers.self === !0;
    tt.set(t, {
      id: n,
      isSelf: r,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), r && t.setAttribute("data-livue-replace-self", ""), Dn.set(n, 0);
  },
  mounted(t, e) {
    let n = tt.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = tt.get(t);
    n && (n.version++, Dn.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = tt.get(t);
    e && Dn.delete(e.id), tt.delete(t);
  }
}, nt = /* @__PURE__ */ new WeakMap(), Hr = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Wa = 200;
function $a(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(Hr))
    if (t[e])
      return Hr[e];
  return Wa;
}
function Ba(t) {
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
function Cn(t, e, n, r, i) {
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
const Ua = {
  created(t, e) {
    let n = t.style.display;
    nt.set(t, {
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
    let r = Ba(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = nt.get(t), o = e.modifiers || {}, a = $a(o), l = e.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(f) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), f && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Cn(t, i, o, u, !0);
      }, a) : f ? (i.isActive = !0, Cn(t, i, o, u, !0)) : (i.isActive = !1, Cn(t, i, o, u, !1));
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
    nt.get(t);
  },
  unmounted(t) {
    let e = nt.get(t);
    e && (e.delayTimer && clearTimeout(e.delayTimer), e.stopWatch && e.stopWatch(), nt.delete(t));
  }
}, Pt = /* @__PURE__ */ new WeakMap();
function jr(t) {
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
const Ja = {
  mounted(t, e, n) {
    let r = jr(n);
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
    Pt.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = Pt.get(t), i = jr(n);
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
    let e = Pt.get(t);
    e && (e.stopWatch && e.stopWatch(), Pt.delete(t));
  }
}, rt = /* @__PURE__ */ new WeakMap(), Xa = {
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
    rt.set(t, { targetId: n }), kr(n, t, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(t, e) {
    const n = rt.get(t), r = e.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      xr(n.targetId);
      const i = e.modifiers.replace || !1;
      kr(r, t, i), rt.set(t, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = rt.get(t);
    e && (xr(e.targetId), rt.delete(t));
  }
}, Ln = /* @__PURE__ */ new WeakMap();
let Fr = 0;
function Ya(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
}
function Ga(t) {
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
const Ka = {
  mounted(t, e, n) {
    const { arg: r, modifiers: i } = e, o = Ga(n);
    if (!o) {
      console.warn("[LiVue] v-click: livue helper not found in component context");
      return;
    }
    Fr++;
    const a = "v-click-" + Fr, l = Ya(i);
    let s = null, u = null;
    i.debounce && (s = Xe(a, l)), i.throttle && (u = Et(a, l));
    let d = !1, f = null;
    r && (f = r);
    const p = function(g) {
      let y = f, I = [];
      if (r) {
        y = r;
        const D = e.value;
        D != null && (I = Array.isArray(D) ? D : [D]);
      } else {
        const D = e.value;
        typeof D == "string" ? y = D : Array.isArray(D) && D.length > 0 && (y = D[0], I = D.slice(1));
      }
      if (!y) {
        console.warn("[LiVue] v-click: no method specified");
        return;
      }
      const x = function() {
        i.confirm ? o.callWithConfirm(y, "Are you sure?", ...I) : o.call(y, ...I);
      };
      s ? s(x) : u ? u(x) : x();
    }, v = function(g) {
      if (!(i.self && g.target !== t)) {
        if (i.once) {
          if (d)
            return;
          d = !0;
        }
        i.prevent && g.preventDefault(), i.stop && g.stopPropagation(), p();
      }
    }, h = {};
    i.capture && (h.capture = !0), i.passive && (h.passive = !0);
    const w = {
      handler: v,
      options: h,
      outsideHandler: null
    };
    if (i.outside) {
      const g = function(y) {
        if (!t.contains(y.target) && y.target !== t) {
          if (i.once) {
            if (d)
              return;
            d = !0;
          }
          p();
        }
      };
      document.addEventListener("click", g, h), w.outsideHandler = g;
    } else
      t.addEventListener("click", v, h);
    Ln.set(t, w);
  },
  updated(t, e, n) {
  },
  unmounted(t) {
    const e = Ln.get(t);
    e && (e.outsideHandler ? document.removeEventListener("click", e.outsideHandler, e.options) : t.removeEventListener("click", e.handler, e.options), Ln.delete(t));
  }
}, Za = {
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
let qr = 0;
const Qa = {
  created(t, e) {
    let n = e.value;
    n || (qr++, n = "scroll-" + qr), t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n;
  },
  updated(t, e) {
    let n = e.value;
    n && n !== t.__livue_scroll_key && (t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n);
  },
  unmounted(t) {
    t.removeAttribute("data-livue-scroll"), delete t.__livue_scroll_key;
  }
}, it = /* @__PURE__ */ new WeakMap();
function zr(t) {
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
function Wr(t, e, n, r, i) {
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
const el = {
  created(t, e) {
    let n = t.style.display;
    it.set(t, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = e.modifiers || {};
    !r.class && !r.attr && (t.style.display = "none");
  },
  mounted(t, e, n) {
    let r = zr(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = it.get(t), o = e.modifiers || {}, a = e.arg || null, l = e.value;
    i.stopWatch = Ce(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        Wr(t, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    let r = it.get(t);
    if (r && e.value !== e.oldValue) {
      let i = zr(n);
      if (i) {
        let o = e.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Wr(t, r, e.modifiers || {}, e.value, a);
      }
    }
  },
  unmounted(t) {
    let e = it.get(t);
    e && (e.stopWatch && e.stopWatch(), it.delete(t));
  }
}, Vt = /* @__PURE__ */ new WeakMap();
let $r = 0;
function tl(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function nl(t, e) {
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
function rl(t, e) {
  let n = e.split("."), r = t[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const il = {
  mounted(t, e, n) {
    let r = nl(e, n);
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
    $r++;
    let s = "watch-" + i + "-" + $r;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      t.addEventListener("focusout", p), Vt.set(t, { blurHandler: p });
      return;
    }
    let u = tl(l) || 150, d = Xe(s, u), f = Ce(
      function() {
        return rl(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    Vt.set(t, { stopWatcher: f });
  },
  unmounted(t) {
    let e = Vt.get(t);
    e && (e.stopWatcher && e.stopWatcher(), e.blurHandler && t.removeEventListener("focusout", e.blurHandler), Vt.delete(t));
  }
}, mt = /* @__PURE__ */ new WeakMap();
let Br = 0;
function ol(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function al(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function ll(t, e) {
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
function At(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Tt(t, e, n) {
  let r = t[e];
  r && typeof r == "object" && "value" in r ? r.value = n : t[e] = n;
}
function ki(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function sl(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let r in t)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function ul(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function cl(t) {
  return ul(t) ? t : t.querySelector("input, textarea, select");
}
function Dt(t, e) {
  return {
    mounted(n, r, i) {
      if (ol(i) && !al(i))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = ll(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: l } = a, s = sl(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Br++;
      let d = t + "-" + Br, f = cl(n);
      if (!f) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let p = e(f, s, l, u, d);
      f.addEventListener(p.eventType, p.handler, { capture: !0 }), mt.set(n, {
        targetEl: f,
        handler: p.handler,
        eventType: p.eventType
      });
    },
    unmounted(n) {
      let r = mt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), mt.delete(n));
    }
  };
}
const fl = Dt("debounce", function(t, e, n, r, i) {
  let o = ki(r) || 150, a = Xe(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = At(l.target);
      a(function() {
        Tt(n, e, s);
      });
    }
  };
}), dl = Dt("throttle", function(t, e, n, r, i) {
  let o = ki(r) || 150, a = Et(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = At(l.target);
      a(function() {
        Tt(n, e, s);
      });
    }
  };
}), lr = Dt("blur", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Tt(n, e, At(l.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), pl = lr.unmounted;
lr.unmounted = function(t) {
  let e = mt.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), pl(t);
};
const sr = Dt("enter", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Tt(n, e, At(l.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), hl = sr.unmounted;
sr.unmounted = function(t) {
  let e = mt.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), hl(t);
};
const ml = Dt("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = At(o.target);
      a = !!a && a !== "false" && a !== "0", Tt(n, e, a);
    }
  };
});
function Ur(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ce(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ur(Object(n), !0).forEach(function(r) {
      vl(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ur(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Ut(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ut = function(e) {
    return typeof e;
  } : Ut = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ut(t);
}
function vl(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function ve() {
  return ve = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, ve.apply(this, arguments);
}
function gl(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function yl(t, e) {
  if (t == null) return {};
  var n = gl(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
var bl = "1.15.6";
function me(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var ge = me(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Ct = me(/Edge/i), Jr = me(/firefox/i), vt = me(/safari/i) && !me(/chrome/i) && !me(/android/i), ur = me(/iP(ad|od|hone)/i), xi = me(/chrome/i) && me(/android/i), Ni = {
  capture: !1,
  passive: !1
};
function V(t, e, n) {
  t.addEventListener(e, n, !ge && Ni);
}
function P(t, e, n) {
  t.removeEventListener(e, n, !ge && Ni);
}
function un(t, e) {
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
function Ii(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function le(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && un(t, e) : un(t, e)) || r && t === n)
        return t;
      if (t === n) break;
    } while (t = Ii(t));
  }
  return null;
}
var Xr = /\s+/g;
function Q(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(Xr, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(Xr, " ");
    }
}
function L(t, e, n) {
  var r = t && t.style;
  if (r) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in r) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), r[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function Je(t, e) {
  var n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      var r = L(t, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!e && (t = t.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function Oi(t, e, n) {
  if (t) {
    var r = t.getElementsByTagName(e), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function ue() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function B(t, e, n, r, i) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, a, l, s, u, d, f;
    if (t !== window && t.parentNode && t !== ue() ? (o = t.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, d = o.height, f = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, f = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !ge))
      do
        if (i && i.getBoundingClientRect && (L(i, "transform") !== "none" || n && L(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(L(i, "border-top-width")), l -= p.left + parseInt(L(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var v = Je(i || t), h = v && v.a, w = v && v.d;
      v && (a /= w, l /= h, f /= h, d /= w, s = a + d, u = l + f);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: f,
      height: d
    };
  }
}
function Yr(t, e, n) {
  for (var r = Ae(t, !0), i = B(t)[e]; r; ) {
    var o = B(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === ue()) break;
    r = Ae(r, !1);
  }
  return !1;
}
function Ye(t, e, n, r) {
  for (var i = 0, o = 0, a = t.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== k.ghost && (r || a[o] !== k.dragged) && le(a[o], n.draggable, t, !1)) {
      if (i === e)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function cr(t, e) {
  for (var n = t.lastElementChild; n && (n === k.ghost || L(n, "display") === "none" || e && !un(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function ne(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== k.clone && (!e || un(t, e)) && n++;
  return n;
}
function Gr(t) {
  var e = 0, n = 0, r = ue();
  if (t)
    do {
      var i = Je(t), o = i.a, a = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function wl(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var r in e)
        if (e.hasOwnProperty(r) && e[r] === t[n][r]) return Number(n);
    }
  return -1;
}
function Ae(t, e) {
  if (!t || !t.getBoundingClientRect) return ue();
  var n = t, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = L(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ue();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ue();
}
function Sl(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function kn(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var gt;
function Mi(t, e) {
  return function() {
    if (!gt) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), gt = setTimeout(function() {
        gt = void 0;
      }, e);
    }
  };
}
function El() {
  clearTimeout(gt), gt = void 0;
}
function Pi(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function Vi(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function Ri(t, e, n) {
  var r = {};
  return Array.from(t.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!le(i, e.draggable, t, !1) || i.animated || i === n)) {
      var u = B(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var Z = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function _l() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(L(i, "display") === "none" || i === k.ghost)) {
            t.push({
              target: i,
              rect: B(i)
            });
            var o = ce({}, t[t.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Je(i, !0);
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
      t.splice(wl(t, {
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
        var s = 0, u = l.target, d = u.fromRect, f = B(u), p = u.prevFromRect, v = u.prevToRect, h = l.rect, w = Je(u, !0);
        w && (f.top -= w.f, f.left -= w.e), u.toRect = f, u.thisAnimationDuration && kn(p, f) && !kn(d, f) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - f.top) / (h.left - f.left) === (d.top - f.top) / (d.left - f.left) && (s = Tl(h, p, v, i.options)), kn(f, d) || (u.prevFromRect = d, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, h, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        L(r, "transition", ""), L(r, "transform", "");
        var l = Je(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), f = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!f, L(r, "transform", "translate3d(" + d + "px," + f + "px,0)"), this.forRepaintDummy = Al(r), L(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), L(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          L(r, "transition", ""), L(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Al(t) {
  return t.offsetWidth;
}
function Tl(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var je = [], xn = {
  initializeByDefault: !0
}, Lt = {
  mount: function(e) {
    for (var n in xn)
      xn.hasOwnProperty(n) && !(n in e) && (e[n] = xn[n]);
    je.forEach(function(r) {
      if (r.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), je.push(e);
  },
  pluginEvent: function(e, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = e + "Global";
    je.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](ce({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](ce({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(e, n, r, i) {
    je.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var u = new l(e, n, e.options);
        u.sortable = e, u.options = e.options, e[s] = u, ve(r, u.defaults);
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
    return je.forEach(function(i) {
      typeof i.eventProperties == "function" && ve(r, i.eventProperties.call(n[i.pluginName], e));
    }), r;
  },
  modifyOption: function(e, n, r) {
    var i;
    return je.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(e[o.pluginName], r));
    }), i;
  }
};
function Dl(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, f = t.newDraggableIndex, p = t.originalEvent, v = t.putSortable, h = t.extraEventProperties;
  if (e = e || n && n[Z], !!e) {
    var w, g = e.options, y = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ge && !Ct ? w = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (w = document.createEvent("Event"), w.initEvent(r, !0, !0)), w.to = a || n, w.from = l || n, w.item = i || n, w.clone = o, w.oldIndex = s, w.newIndex = u, w.oldDraggableIndex = d, w.newDraggableIndex = f, w.originalEvent = p, w.pullMode = v ? v.lastPutMode : void 0;
    var I = ce(ce({}, h), Lt.getEventProperties(r, e));
    for (var x in I)
      w[x] = I[x];
    n && n.dispatchEvent(w), g[y] && g[y].call(e, w);
  }
}
var Cl = ["evt"], K = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = yl(r, Cl);
  Lt.pluginEvent.bind(k)(e, n, ce({
    dragEl: b,
    parentEl: W,
    ghostEl: N,
    rootEl: q,
    nextEl: Pe,
    lastDownEl: Jt,
    cloneEl: z,
    cloneHidden: Ee,
    dragStarted: lt,
    putSortable: J,
    activeSortable: k.active,
    originalEvent: i,
    oldIndex: $e,
    oldDraggableIndex: yt,
    newIndex: ee,
    newDraggableIndex: be,
    hideGhostForTarget: qi,
    unhideGhostForTarget: zi,
    cloneNowHidden: function() {
      Ee = !0;
    },
    cloneNowShown: function() {
      Ee = !1;
    },
    dispatchSortableEvent: function(l) {
      Y({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function Y(t) {
  Dl(ce({
    putSortable: J,
    cloneEl: z,
    targetEl: b,
    rootEl: q,
    oldIndex: $e,
    oldDraggableIndex: yt,
    newIndex: ee,
    newDraggableIndex: be
  }, t));
}
var b, W, N, q, Pe, Jt, z, Ee, $e, ee, yt, be, Rt, J, We = !1, cn = !1, fn = [], Ie, ae, Nn, In, Kr, Zr, lt, Fe, bt, wt = !1, Ht = !1, Xt, X, On = [], Gn = !1, dn = [], vn = typeof document < "u", jt = ur, Qr = Ct || ge ? "cssFloat" : "float", Ll = vn && !xi && !ur && "draggable" in document.createElement("div"), Hi = (function() {
  if (vn) {
    if (ge)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), ji = function(e, n) {
  var r = L(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Ye(e, 0, n), a = Ye(e, 1, n), l = o && L(o), s = a && L(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + B(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + B(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Qr] === "none" || a && r[Qr] === "none" && u + d > i) ? "vertical" : "horizontal";
}, kl = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, xl = function(e, n) {
  var r;
  return fn.some(function(i) {
    var o = i[Z].options.emptyInsertThreshold;
    if (!(!o || cr(i))) {
      var a = B(i), l = e >= a.left - o && e <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, Fi = function(e) {
  function n(o, a) {
    return function(l, s, u, d) {
      var f = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (o == null && (a || f))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(l, s, u, d), a)(l, s, u, d);
      var p = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
    };
  }
  var r = {}, i = e.group;
  (!i || Ut(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, qi = function() {
  !Hi && N && L(N, "display", "none");
}, zi = function() {
  !Hi && N && L(N, "display", "");
};
vn && !xi && document.addEventListener("click", function(t) {
  if (cn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), cn = !1, !1;
}, !0);
var Oe = function(e) {
  if (b) {
    e = e.touches ? e.touches[0] : e;
    var n = xl(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[Z]._onDragOver(r);
    }
  }
}, Nl = function(e) {
  b && b.parentNode[Z]._isOutsideThisEl(e.target);
};
function k(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = ve({}, e), t[Z] = this;
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
      return ji(t, this.options);
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
    supportPointer: k.supportPointer !== !1 && "PointerEvent" in window && (!vt || ur),
    emptyInsertThreshold: 5
  };
  Lt.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Fi(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Ll, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? V(t, "pointerdown", this._onTapStart) : (V(t, "mousedown", this._onTapStart), V(t, "touchstart", this._onTapStart)), this.nativeDraggable && (V(t, "dragover", this), V(t, "dragenter", this)), fn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ve(this, _l());
}
k.prototype = /** @lends Sortable.prototype */
{
  constructor: k,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Fe = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, b) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, d = i.filter;
      if (jl(r), !b && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && vt && s && s.tagName.toUpperCase() === "SELECT") && (s = le(s, i.draggable, r, !1), !(s && s.animated) && Jt !== s)) {
        if ($e = ne(s), yt = ne(s, i.draggable), typeof d == "function") {
          if (d.call(this, e, s, this)) {
            Y({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), K("filter", n, {
              evt: e
            }), o && e.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(f) {
          if (f = le(u, f.trim(), r, !1), f)
            return Y({
              sortable: n,
              rootEl: f,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), K("filter", n, {
              evt: e
            }), !0;
        }), d)) {
          o && e.preventDefault();
          return;
        }
        i.handle && !le(u, i.handle, r, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !b && r.parentNode === o) {
      var u = B(r);
      if (q = o, b = r, W = b.parentNode, Pe = b.nextSibling, Jt = r, Rt = a.group, k.dragged = b, Ie = {
        target: b,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, Kr = Ie.clientX - u.left, Zr = Ie.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, b.style["will-change"] = "all", s = function() {
        if (K("delayEnded", i, {
          evt: e
        }), k.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Jr && i.nativeDraggable && (b.draggable = !0), i._triggerDragStart(e, n), Y({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), Q(b, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Oi(b, d.trim(), Mn);
      }), V(l, "dragover", Oe), V(l, "mousemove", Oe), V(l, "touchmove", Oe), a.supportPointer ? (V(l, "pointerup", i._onDrop), !this.nativeDraggable && V(l, "pointercancel", i._onDrop)) : (V(l, "mouseup", i._onDrop), V(l, "touchend", i._onDrop), V(l, "touchcancel", i._onDrop)), Jr && this.nativeDraggable && (this.options.touchStartThreshold = 4, b.draggable = !0), K("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Ct || ge))) {
        if (k.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (V(l, "pointerup", i._disableDelayedDrag), V(l, "pointercancel", i._disableDelayedDrag)) : (V(l, "mouseup", i._disableDelayedDrag), V(l, "touchend", i._disableDelayedDrag), V(l, "touchcancel", i._disableDelayedDrag)), V(l, "mousemove", i._delayedDragTouchMoveHandler), V(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && V(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    b && Mn(b), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    P(e, "mouseup", this._disableDelayedDrag), P(e, "touchend", this._disableDelayedDrag), P(e, "touchcancel", this._disableDelayedDrag), P(e, "pointerup", this._disableDelayedDrag), P(e, "pointercancel", this._disableDelayedDrag), P(e, "mousemove", this._delayedDragTouchMoveHandler), P(e, "touchmove", this._delayedDragTouchMoveHandler), P(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? V(document, "pointermove", this._onTouchMove) : n ? V(document, "touchmove", this._onTouchMove) : V(document, "mousemove", this._onTouchMove) : (V(b, "dragend", this), V(q, "dragstart", this._onDragStart));
    try {
      document.selection ? Yt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (We = !1, q && b) {
      K("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && V(document, "dragover", Nl);
      var r = this.options;
      !e && Q(b, r.dragClass, !1), Q(b, r.ghostClass, !0), k.active = this, e && this._appendGhost(), Y({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (ae) {
      this._lastX = ae.clientX, this._lastY = ae.clientY, qi();
      for (var e = document.elementFromPoint(ae.clientX, ae.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(ae.clientX, ae.clientY), e !== n); )
        n = e;
      if (b.parentNode[Z]._isOutsideThisEl(e), n)
        do {
          if (n[Z]) {
            var r = void 0;
            if (r = n[Z]._onDragOver({
              clientX: ae.clientX,
              clientY: ae.clientY,
              target: e,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = Ii(n));
      zi();
    }
  },
  _onTouchMove: function(e) {
    if (Ie) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = N && Je(N, !0), l = N && a && a.a, s = N && a && a.d, u = jt && X && Gr(X), d = (o.clientX - Ie.clientX + i.x) / (l || 1) + (u ? u[0] - On[0] : 0) / (l || 1), f = (o.clientY - Ie.clientY + i.y) / (s || 1) + (u ? u[1] - On[1] : 0) / (s || 1);
      if (!k.active && !We) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (N) {
        a ? (a.e += d - (Nn || 0), a.f += f - (In || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        L(N, "webkitTransform", p), L(N, "mozTransform", p), L(N, "msTransform", p), L(N, "transform", p), Nn = d, In = f, ae = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!N) {
      var e = this.options.fallbackOnBody ? document.body : q, n = B(b, !0, jt, !0, e), r = this.options;
      if (jt) {
        for (X = e; L(X, "position") === "static" && L(X, "transform") === "none" && X !== document; )
          X = X.parentNode;
        X !== document.body && X !== document.documentElement ? (X === document && (X = ue()), n.top += X.scrollTop, n.left += X.scrollLeft) : X = ue(), On = Gr(X);
      }
      N = b.cloneNode(!0), Q(N, r.ghostClass, !1), Q(N, r.fallbackClass, !0), Q(N, r.dragClass, !0), L(N, "transition", ""), L(N, "transform", ""), L(N, "box-sizing", "border-box"), L(N, "margin", 0), L(N, "top", n.top), L(N, "left", n.left), L(N, "width", n.width), L(N, "height", n.height), L(N, "opacity", "0.8"), L(N, "position", jt ? "absolute" : "fixed"), L(N, "zIndex", "100000"), L(N, "pointerEvents", "none"), k.ghost = N, e.appendChild(N), L(N, "transform-origin", Kr / parseInt(N.style.width) * 100 + "% " + Zr / parseInt(N.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var r = this, i = e.dataTransfer, o = r.options;
    if (K("dragStart", this, {
      evt: e
    }), k.eventCanceled) {
      this._onDrop();
      return;
    }
    K("setupClone", this), k.eventCanceled || (z = Vi(b), z.removeAttribute("id"), z.draggable = !1, z.style["will-change"] = "", this._hideClone(), Q(z, this.options.chosenClass, !1), k.clone = z), r.cloneId = Yt(function() {
      K("clone", r), !k.eventCanceled && (r.options.removeCloneOnHide || q.insertBefore(z, b), r._hideClone(), Y({
        sortable: r,
        name: "clone"
      }));
    }), !n && Q(b, o.dragClass, !0), n ? (cn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (P(document, "mouseup", r._onDrop), P(document, "touchend", r._onDrop), P(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, b)), V(document, "drop", r), L(b, "transform", "translateZ(0)")), We = !0, r._dragStartId = Yt(r._dragStarted.bind(r, n, e)), V(document, "selectstart", r), lt = !0, window.getSelection().removeAllRanges(), vt && L(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, l = this.options, s = l.group, u = k.active, d = Rt === s, f = l.sort, p = J || u, v, h = this, w = !1;
    if (Gn) return;
    function g(F, xe) {
      K(F, h, ce({
        evt: e,
        isOwner: d,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: f,
        fromSortable: p,
        target: r,
        completed: I,
        onMove: function(fe, ye) {
          return Ft(q, n, b, i, fe, B(fe), e, ye);
        },
        changed: x
      }, xe));
    }
    function y() {
      g("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function I(F) {
      return g("dragOverCompleted", {
        insertion: F
      }), F && (d ? u._hideClone() : u._showClone(h), h !== p && (Q(b, J ? J.options.ghostClass : u.options.ghostClass, !1), Q(b, l.ghostClass, !0)), J !== h && h !== k.active ? J = h : h === k.active && J && (J = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        g("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === b && !b.animated || r === n && !r.animated) && (Fe = null), !l.dragoverBubble && !e.rootEl && r !== document && (b.parentNode[Z]._isOutsideThisEl(e.target), !F && Oe(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), w = !0;
    }
    function x() {
      ee = ne(b), be = ne(b, l.draggable), Y({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: ee,
        newDraggableIndex: be,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = le(r, l.draggable, n, !0), g("dragOver"), k.eventCanceled) return w;
    if (b.contains(e.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return I(!1);
    if (cn = !1, u && !l.disabled && (d ? f || (a = W !== q) : J === this || (this.lastPutMode = Rt.checkPull(this, u, b, e)) && s.checkPut(this, u, b, e))) {
      if (v = this._getDirection(e, r) === "vertical", i = B(b), g("dragOverValid"), k.eventCanceled) return w;
      if (a)
        return W = q, y(), this._hideClone(), g("revert"), k.eventCanceled || (Pe ? q.insertBefore(b, Pe) : q.appendChild(b)), I(!0);
      var D = cr(n, l.draggable);
      if (!D || Pl(e, v, this) && !D.animated) {
        if (D === b)
          return I(!1);
        if (D && n === e.target && (r = D), r && (o = B(r)), Ft(q, n, b, i, r, o, e, !!r) !== !1)
          return y(), D && D.nextSibling ? n.insertBefore(b, D.nextSibling) : n.appendChild(b), W = n, x(), I(!0);
      } else if (D && Ml(e, v, this)) {
        var T = Ye(n, 0, l, !0);
        if (T === b)
          return I(!1);
        if (r = T, o = B(r), Ft(q, n, b, i, r, o, e, !1) !== !1)
          return y(), n.insertBefore(b, T), W = n, x(), I(!0);
      } else if (r.parentNode === n) {
        o = B(r);
        var C = 0, H, S = b.parentNode !== n, c = !kl(b.animated && b.toRect || i, r.animated && r.toRect || o, v), E = v ? "top" : "left", _ = Yr(r, "top", "top") || Yr(b, "top", "top"), A = _ ? _.scrollTop : void 0;
        Fe !== r && (H = o[E], wt = !1, Ht = !c && l.invertSwap || S), C = Vl(e, r, o, v, c ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Ht, Fe === r);
        var m;
        if (C !== 0) {
          var O = ne(b);
          do
            O -= C, m = W.children[O];
          while (m && (L(m, "display") === "none" || m === N));
        }
        if (C === 0 || m === r)
          return I(!1);
        Fe = r, bt = C;
        var R = r.nextElementSibling, M = !1;
        M = C === 1;
        var oe = Ft(q, n, b, i, r, o, e, M);
        if (oe !== !1)
          return (oe === 1 || oe === -1) && (M = oe === 1), Gn = !0, setTimeout(Ol, 30), y(), M && !R ? n.appendChild(b) : r.parentNode.insertBefore(b, M ? R : r), _ && Pi(_, 0, A - _.scrollTop), W = b.parentNode, H !== void 0 && !Ht && (Xt = Math.abs(H - B(r)[E])), x(), I(!0);
      }
      if (n.contains(b))
        return I(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    P(document, "mousemove", this._onTouchMove), P(document, "touchmove", this._onTouchMove), P(document, "pointermove", this._onTouchMove), P(document, "dragover", Oe), P(document, "mousemove", Oe), P(document, "touchmove", Oe);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    P(e, "mouseup", this._onDrop), P(e, "touchend", this._onDrop), P(e, "pointerup", this._onDrop), P(e, "pointercancel", this._onDrop), P(e, "touchcancel", this._onDrop), P(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, r = this.options;
    if (ee = ne(b), be = ne(b, r.draggable), K("drop", this, {
      evt: e
    }), W = b && b.parentNode, ee = ne(b), be = ne(b, r.draggable), k.eventCanceled) {
      this._nulling();
      return;
    }
    We = !1, Ht = !1, wt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Kn(this.cloneId), Kn(this._dragStartId), this.nativeDraggable && (P(document, "drop", this), P(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), vt && L(document.body, "user-select", ""), L(b, "transform", ""), e && (lt && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), N && N.parentNode && N.parentNode.removeChild(N), (q === W || J && J.lastPutMode !== "clone") && z && z.parentNode && z.parentNode.removeChild(z), b && (this.nativeDraggable && P(b, "dragend", this), Mn(b), b.style["will-change"] = "", lt && !We && Q(b, J ? J.options.ghostClass : this.options.ghostClass, !1), Q(b, this.options.chosenClass, !1), Y({
      sortable: this,
      name: "unchoose",
      toEl: W,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), q !== W ? (ee >= 0 && (Y({
      rootEl: W,
      name: "add",
      toEl: W,
      fromEl: q,
      originalEvent: e
    }), Y({
      sortable: this,
      name: "remove",
      toEl: W,
      originalEvent: e
    }), Y({
      rootEl: W,
      name: "sort",
      toEl: W,
      fromEl: q,
      originalEvent: e
    }), Y({
      sortable: this,
      name: "sort",
      toEl: W,
      originalEvent: e
    })), J && J.save()) : ee !== $e && ee >= 0 && (Y({
      sortable: this,
      name: "update",
      toEl: W,
      originalEvent: e
    }), Y({
      sortable: this,
      name: "sort",
      toEl: W,
      originalEvent: e
    })), k.active && ((ee == null || ee === -1) && (ee = $e, be = yt), Y({
      sortable: this,
      name: "end",
      toEl: W,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    K("nulling", this), q = b = W = N = Pe = z = Jt = Ee = Ie = ae = lt = ee = be = $e = yt = Fe = bt = J = Rt = k.dragged = k.ghost = k.clone = k.active = null, dn.forEach(function(e) {
      e.checked = !0;
    }), dn.length = Nn = In = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        b && (this._onDragOver(e), Il(e));
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
      n = r[i], le(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || Hl(n));
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
      le(l, this.options.draggable, i, !1) && (r[o] = l);
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
    return le(e, n || this.options.draggable, this.el, !1);
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
    var i = Lt.modifyOption(this, e, n);
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && Fi(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    K("destroy", this);
    var e = this.el;
    e[Z] = null, P(e, "mousedown", this._onTapStart), P(e, "touchstart", this._onTapStart), P(e, "pointerdown", this._onTapStart), this.nativeDraggable && (P(e, "dragover", this), P(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), fn.splice(fn.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Ee) {
      if (K("hideClone", this), k.eventCanceled) return;
      L(z, "display", "none"), this.options.removeCloneOnHide && z.parentNode && z.parentNode.removeChild(z), Ee = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ee) {
      if (K("showClone", this), k.eventCanceled) return;
      b.parentNode == q && !this.options.group.revertClone ? q.insertBefore(z, b) : Pe ? q.insertBefore(z, Pe) : q.appendChild(z), this.options.group.revertClone && this.animate(b, z), L(z, "display", ""), Ee = !1;
    }
  }
};
function Il(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Ft(t, e, n, r, i, o, a, l) {
  var s, u = t[Z], d = u.options.onMove, f;
  return window.CustomEvent && !ge && !Ct ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = r, s.related = i || e, s.relatedRect = o || B(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), d && (f = d.call(u, s, a)), f;
}
function Mn(t) {
  t.draggable = !1;
}
function Ol() {
  Gn = !1;
}
function Ml(t, e, n) {
  var r = B(Ye(n.el, 0, n.options, !0)), i = Ri(n.el, n.options, N), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function Pl(t, e, n) {
  var r = B(cr(n.el, n.options.draggable)), i = Ri(n.el, n.options, N), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function Vl(t, e, n, r, i, o, a, l) {
  var s = r ? t.clientY : t.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, f = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && Xt < u * i) {
      if (!wt && (bt === 1 ? s > d + u * o / 2 : s < f - u * o / 2) && (wt = !0), wt)
        p = !0;
      else if (bt === 1 ? s < d + Xt : s > f - Xt)
        return -bt;
    } else if (s > d + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return Rl(e);
  }
  return p = p || a, p && (s < d + u * o / 2 || s > f - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function Rl(t) {
  return ne(b) < ne(t) ? 1 : -1;
}
function Hl(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function jl(t) {
  dn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && dn.push(r);
  }
}
function Yt(t) {
  return setTimeout(t, 0);
}
function Kn(t) {
  return clearTimeout(t);
}
vn && V(document, "touchmove", function(t) {
  (k.active || We) && t.cancelable && t.preventDefault();
});
k.utils = {
  on: V,
  off: P,
  css: L,
  find: Oi,
  is: function(e, n) {
    return !!le(e, n, e, !1);
  },
  extend: Sl,
  throttle: Mi,
  closest: le,
  toggleClass: Q,
  clone: Vi,
  index: ne,
  nextTick: Yt,
  cancelNextTick: Kn,
  detectDirection: ji,
  getChild: Ye,
  expando: Z
};
k.get = function(t) {
  return t[Z];
};
k.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (k.utils = ce(ce({}, k.utils), r.utils)), Lt.mount(r);
  });
};
k.create = function(t, e) {
  return new k(t, e);
};
k.version = bl;
var $ = [], st, Zn, Qn = !1, Pn, Vn, pn, ut;
function Fl() {
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
      this.sortable.nativeDraggable ? V(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? V(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? V(document, "touchmove", this._handleFallbackAutoScroll) : V(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? P(document, "dragover", this._handleAutoScroll) : (P(document, "pointermove", this._handleFallbackAutoScroll), P(document, "touchmove", this._handleFallbackAutoScroll), P(document, "mousemove", this._handleFallbackAutoScroll)), ei(), Gt(), El();
    },
    nulling: function() {
      pn = Zn = st = Qn = ut = Pn = Vn = null, $.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (pn = n, r || this.options.forceAutoScrollFallback || Ct || ge || vt) {
        Rn(n, this.options, l, r);
        var s = Ae(l, !0);
        Qn && (!ut || o !== Pn || a !== Vn) && (ut && ei(), ut = setInterval(function() {
          var u = Ae(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, Gt()), Rn(n, i.options, u, r);
        }, 10), Pn = o, Vn = a);
      } else {
        if (!this.options.bubbleScroll || Ae(l, !0) === ue()) {
          Gt();
          return;
        }
        Rn(n, this.options, Ae(l, !1), !1);
      }
    }
  }, ve(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Gt() {
  $.forEach(function(t) {
    clearInterval(t.pid);
  }), $ = [];
}
function ei() {
  clearInterval(ut);
}
var Rn = Mi(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = ue(), u = !1, d;
    Zn !== n && (Zn = n, Gt(), st = e.scroll, d = e.scrollFn, st === !0 && (st = Ae(n, !0)));
    var f = 0, p = st;
    do {
      var v = p, h = B(v), w = h.top, g = h.bottom, y = h.left, I = h.right, x = h.width, D = h.height, T = void 0, C = void 0, H = v.scrollWidth, S = v.scrollHeight, c = L(v), E = v.scrollLeft, _ = v.scrollTop;
      v === s ? (T = x < H && (c.overflowX === "auto" || c.overflowX === "scroll" || c.overflowX === "visible"), C = D < S && (c.overflowY === "auto" || c.overflowY === "scroll" || c.overflowY === "visible")) : (T = x < H && (c.overflowX === "auto" || c.overflowX === "scroll"), C = D < S && (c.overflowY === "auto" || c.overflowY === "scroll"));
      var A = T && (Math.abs(I - i) <= a && E + x < H) - (Math.abs(y - i) <= a && !!E), m = C && (Math.abs(g - o) <= a && _ + D < S) - (Math.abs(w - o) <= a && !!_);
      if (!$[f])
        for (var O = 0; O <= f; O++)
          $[O] || ($[O] = {});
      ($[f].vx != A || $[f].vy != m || $[f].el !== v) && ($[f].el = v, $[f].vx = A, $[f].vy = m, clearInterval($[f].pid), (A != 0 || m != 0) && (u = !0, $[f].pid = setInterval(function() {
        r && this.layer === 0 && k.active._onTouchMove(pn);
        var R = $[this.layer].vy ? $[this.layer].vy * l : 0, M = $[this.layer].vx ? $[this.layer].vx * l : 0;
        typeof d == "function" && d.call(k.dragged.parentNode[Z], M, R, t, pn, $[this.layer].el) !== "continue" || Pi($[this.layer].el, M, R);
      }.bind({
        layer: f
      }), 24))), f++;
    } while (e.bubbleScroll && p !== s && (p = Ae(p, !1)));
    Qn = u;
  }
}, 30), Wi = function(e) {
  var n = e.originalEvent, r = e.putSortable, i = e.dragEl, o = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    l();
    var d = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, f = document.elementFromPoint(d.clientX, d.clientY);
    s(), u && !u.el.contains(f) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: r
    }));
  }
};
function fr() {
}
fr.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = Ye(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Wi
};
ve(fr, {
  pluginName: "revertOnSpill"
});
function dr() {
}
dr.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Wi
};
ve(dr, {
  pluginName: "removeOnSpill"
});
k.mount(new Fl());
k.mount(dr, fr);
const Be = /* @__PURE__ */ new WeakMap(), Kt = /* @__PURE__ */ new WeakMap();
function ql(t) {
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
function zl(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const qt = /* @__PURE__ */ new WeakMap(), Wl = {
  mounted(t, e, n) {
    let r = ql(n), i = e.modifiers || {}, o = e.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = zl(i), l = i.horizontal ? "horizontal" : "vertical";
    qt.set(t, e);
    let s = t.dataset.livueSortGroup || null, u = {
      animation: a,
      direction: l,
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
        let v = p.newIndex, h = p.oldIndex;
        if (h === v)
          return;
        let w = qt.get(t), g = w ? w.value : null, y = typeof g == "string";
        if (Array.isArray(g)) {
          let x = p.from;
          h < v ? x.insertBefore(p.item, x.children[h]) : x.insertBefore(p.item, x.children[h + 1]);
          let D = g.splice(h, 1)[0];
          g.splice(v, 0, D);
          return;
        }
        if (y && r) {
          let x = g, D = [], T = p.item, C = Kt.get(T);
          C === void 0 && (C = T.dataset.livueSortItem), typeof C == "string" && /^\d+$/.test(C) && (C = parseInt(C, 10));
          let H = p.from, S = p.to, c = [C, v].concat(D);
          if (H !== S) {
            let _ = S.dataset.livueSortMethod;
            _ && (x = _);
            let A = H.dataset.livueSortId || H.dataset.livueSortGroup || null;
            c.push(A);
          }
          r.call(x, c);
        }
      }
    };
    typeof e.value == "string" && (t.dataset.livueSortMethod = e.value), t.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let f = k.create(t, u);
    Be.set(t, f);
  },
  updated(t, e) {
    qt.set(t, e);
    let n = Be.get(t);
    n && t.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = Be.get(t);
    e && (e.destroy(), Be.delete(t)), qt.delete(t);
  }
}, $l = {
  mounted(t, e) {
    let n = e.value;
    Kt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    Kt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (Kt.delete(t), t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Bl = {
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
}, Ul = {
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
}, Jl = {
  mounted(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = Be.get(t);
    r && r.option("group", n);
  },
  updated(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = Be.get(t);
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
function Xl() {
  j("init", Ta), j("submit", Ca), j("intersect", ka), j("current", xa), j("ignore", Na), j("model-livue", Pa), j("debounce", fl), j("throttle", dl), j("blur", lr), j("enter", sr), j("boolean", ml), j("poll", ja), j("offline", qa), j("transition", aa), j("replace", za), j("loading", Ua), j("target", Ja), j("stream", Xa), j("click", Ka), j("navigate", Za), j("scroll", Qa), j("dirty", el), j("watch", il), j("sort", Wl), j("sort-item", $l), j("sort-handle", Bl), j("sort-ignore", Ul), j("sort-group", Jl);
}
let we = null, ot = null, ti = !1;
function Yl() {
  if (ti)
    return;
  ti = !0;
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
function Gl() {
  return we || (Yl(), we = document.createElement("div"), we.className = "livue-hmr-indicator", document.body.appendChild(we), we);
}
function zt(t, e) {
  const n = Gl();
  switch (ot && (clearTimeout(ot), ot = null), t) {
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
            `, ot = setTimeout(function() {
        ni();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, ot = setTimeout(function() {
        ni();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function ni() {
  we && we.classList.remove("visible");
}
let Re = null, gn = !0, $i = !0, ct = !0, Zt = [];
function Kl(t) {
  Re = t;
}
async function Zl(t) {
  if (gn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), ct && zt("updating", t.fileName), Zt.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = $i ? Ql() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), ct && zt("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Re.reboot(), e && (await ts(), es(e)), ct && zt("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), ct && zt("error");
    }
  }
}
function Ql() {
  const t = /* @__PURE__ */ new Map();
  return Re && Re.all().forEach(function(n) {
    if (ri(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        ri(r, i.name, i.state, t);
      }
  }), t;
}
function ri(t, e, n, r) {
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
function es(t) {
  Re && t.forEach(function(e, n) {
    const r = Re.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function ts() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function ns() {
  return typeof import.meta < "u" && !1;
}
function rs() {
  gn = !0;
}
function is() {
  gn = !1;
}
function os() {
  return gn;
}
function as(t) {
  t.indicator !== void 0 && (ct = t.indicator), t.preserveState !== void 0 && ($i = t.preserveState);
}
function ls(t) {
  return Zt.push(t), function() {
    const e = Zt.indexOf(t);
    e !== -1 && Zt.splice(e, 1);
  };
}
async function ss() {
  Re && await Zl({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var qe = !1, Hn = [];
class us {
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
    jo(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Xl(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), vo(this), this._startObserver(), Kl(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Uo());
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
    _t(e, !0, !1);
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
    mo(e);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(e) {
    return mn(e);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    To();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return No();
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
      available: Ke(),
      ...Bo()
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
    let r = new _a(e);
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
    return vr(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return gr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), Sr();
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
    }), Sr();
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
      isAvailable: ns,
      isEnabled: os,
      enable: rs,
      disable: is,
      configure: as,
      onUpdate: ls,
      trigger: ss
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
    if (e && !qe) {
      qe = !0, console.log("[LiVue] Debug mode enabled");
      var n = gr();
      n.forEach(function(r) {
        var i = vr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        Hn.push(i);
      });
    } else !e && qe && (qe = !1, console.log("[LiVue] Debug mode disabled"), Hn.forEach(function(r) {
      r();
    }), Hn = []);
    return qe;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return qe;
  }
}
const pr = new us();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = ro, document.head.appendChild(t);
}
var de = window.LiVueConfig || {};
(de.showProgressBar !== void 0 || de.progressBarColor !== void 0 || de.prefetch !== void 0 || de.prefetchOnHover !== void 0 || de.hoverDelay !== void 0 || de.cachePages !== void 0 || de.maxCacheSize !== void 0 || de.restoreScroll !== void 0) && pr.configureNavigation(de);
function ii() {
  pr.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ii) : queueMicrotask(ii);
window.LiVue = pr;
export {
  pr as default
};
//# sourceMappingURL=livue.esm.js.map
