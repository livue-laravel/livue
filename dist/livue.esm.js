import { reactive as De, toRefs as zi, effectScope as qi, ref as Qt, markRaw as Wi, defineComponent as $i, shallowRef as ei, onMounted as ti, onUnmounted as ni, h as sr, inject as Bi, provide as Ui, nextTick as Yn, onBeforeUnmount as Ji, onBeforeMount as Xi, readonly as Yi, watchEffect as Gi, watch as Ce, computed as Ki, createApp as Qi } from "vue";
const Zi = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let Me = null;
function Et() {
  if (Me)
    return Me;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return Me = t.getAttribute("content"), Me;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (Me = decodeURIComponent(e[1]), Me) : null;
}
function eo() {
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
}, G = null, Pn = null, te = null, he = null, Zt = !1, ct = 0;
function to(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function no(t) {
  return (-1 + t) * 100;
}
function ri() {
  if (Zt) return;
  Zt = !0;
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
function ro() {
  if (te) return;
  ri(), te = document.createElement("div"), te.className = "livue-progress-bar livue-progress-hidden", te.innerHTML = '<div class="livue-progress-peg"></div>', U.showSpinner && (he = document.createElement("div"), he.className = "livue-progress-spinner livue-progress-hidden", he.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(U.parent) || document.body;
  t.appendChild(te), he && t.appendChild(he);
}
function io() {
  if (!Zt) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), Zt = !1, ri());
}
function oo(t) {
  Object.assign(U, t), io();
}
function ao() {
  ct++, G === null && (ro(), G = 0, te && te.classList.remove("livue-progress-hidden"), he && he.classList.remove("livue-progress-hidden"), dn(U.minimum), U.trickle && (Pn = setInterval(function() {
    ii();
  }, U.trickleSpeed)));
}
function dn(t) {
  G !== null && (t = to(t, U.minimum, 1), G = t, te && (te.style.transform = "translate3d(" + no(t) + "%, 0, 0)"));
}
function ii() {
  if (G === null || G >= 1) return;
  let t;
  G < 0.2 ? t = 0.1 : G < 0.5 ? t = 0.04 : G < 0.8 ? t = 0.02 : G < 0.99 ? t = 5e-3 : t = 0, dn(G + t);
}
function oi() {
  ct = Math.max(0, ct - 1), !(ct > 0) && G !== null && (dn(1), clearInterval(Pn), Pn = null, setTimeout(function() {
    te && te.classList.add("livue-progress-hidden"), he && he.classList.add("livue-progress-hidden"), setTimeout(function() {
      G = null, te && (te.style.transform = "translate3d(-100%, 0, 0)");
    }, U.speed);
  }, U.speed));
}
function lo() {
  ct = 0, oi();
}
function so() {
  return G !== null;
}
function uo() {
  return G;
}
const Le = {
  configure: oo,
  start: ao,
  set: dn,
  trickle: ii,
  done: oi,
  forceDone: lo,
  isStarted: so,
  getStatus: uo
};
var ot = null, ur = !1, Ue = !1, ie = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, me = /* @__PURE__ */ new Map(), Ve = /* @__PURE__ */ new Map(), Vn = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new Map(), _e = null;
function co(t) {
  Object.assign(ie, t), t.progressBarColor && Le.configure({ color: t.progressBarColor });
}
function fo(t) {
  ot = t, !ur && (ur = !0, _e = ai(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: _e },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (li(_e), _e = e.state.pageKey, _t(e.state.url, !1, !0));
  }), ho());
}
function ai() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function li(t) {
  if (!(!ie.restoreScroll || !t)) {
    qt.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = qt.get(t) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, qt.set(t, i);
      }
    });
  }
}
function po(t) {
  if (!(!ie.restoreScroll || !t)) {
    var e = qt.get(t);
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
function ho() {
  document.addEventListener("click", mo, !0), ie.prefetch && (document.addEventListener("mouseenter", go, !0), document.addEventListener("mouseleave", yo, !0), document.addEventListener("mousedown", bo, !0), document.addEventListener("focus", wo, !0));
}
function mo(t) {
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
function vo(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function go(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ie.prefetchOnHover)) {
      var n = vo(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            pn(r);
          }, ie.hoverDelay);
          Vn.set(e, i);
        }
      }
    }
  }
}
function yo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Vn.get(e);
      n && (clearTimeout(n), Vn.delete(e));
    }
  }
}
function bo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || pn(n);
    }
  }
}
function wo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ie.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || pn(n);
    }
  }
}
function pn(t) {
  var e = new URL(t, location.origin).href;
  if (Ve.has(e))
    return Ve.get(e);
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
    return Ve.delete(e), r.ok ? r.text().then(function(i) {
      return ie.cachePages && si(e, i), i;
    }) : null;
  }).catch(function(r) {
    return Ve.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Ve.set(e, n), n;
}
function si(t, e) {
  for (var n = new DOMParser(), r = n.parseFromString(e, "text/html"), i = r.querySelector("title"); me.size >= ie.maxCacheSize; ) {
    var o = me.keys().next().value;
    me.delete(o);
  }
  me.set(t, {
    html: e,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function So() {
  me.clear();
}
function Gn(t) {
  Ue || !t || !t.url || (t.navigate ? _t(t.url, !0, !1) : (Ue = !0, window.location.href = t.url));
}
async function _t(t, e, n) {
  if (!Ue) {
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
      Ue = !0, n || li(_e), ie.showProgressBar && Le.start();
      try {
        var o, a = me.get(r);
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
          o = await l.text(), ie.cachePages && si(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(D) {
              typeof D == "function" && D(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = Eo(), p = /* @__PURE__ */ new Set();
        c.forEach(function(D) {
          D.livueIds.forEach(function(L) {
            p.add(L);
          });
        }), ot._stopObserver(), ot.destroyExcept(p), c.forEach(function(D) {
          D.element.parentNode && D.element.parentNode.removeChild(D.element);
        });
        var g = u.querySelector("title");
        g && (document.title = g.textContent), document.body.innerHTML = u.body.innerHTML, _o(c);
        var h = u.querySelector('meta[name="csrf-token"]'), w = document.querySelector('meta[name="csrf-token"]');
        if (h && w && (w.setAttribute("content", h.getAttribute("content")), eo()), Ao(u), e && (_e = ai(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: _e },
          "",
          r
        )), Do(u), ot.rebootPreserving(), n)
          po(_e);
        else if (location.hash) {
          var m = document.querySelector(location.hash);
          m ? m.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (D) {
        console.error("[LiVue] Navigation failed:", D), window.location.href = t;
      } finally {
        Ue = !1, ie.showProgressBar && Le.done();
      }
    }
  }
}
function Eo() {
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
function _o(t) {
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
function Ao(t) {
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
function Do(t) {
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
function To() {
  return Ue;
}
var qe = /* @__PURE__ */ new Map(), Co = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function cr(t, e) {
  return typeof t != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", t), function() {
  }) : typeof e != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (qe.has(t) || qe.set(t, /* @__PURE__ */ new Set()), qe.get(t).add(e), function() {
    var n = qe.get(t);
    n && (n.delete(e), n.size === 0 && qe.delete(t));
  });
}
function le(t, e) {
  var n = qe.get(t);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(e);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + t + '" callback:', i);
    }
  });
}
function ui() {
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
function fr() {
  return Co.slice();
}
var Rn = [], Hn = [], wt = !1;
function Lo(t) {
  return t.isolate ? ko(t) : new Promise(function(e, n) {
    Rn.push({
      payload: t,
      resolve: e,
      reject: n
    }), wt || (wt = !0, queueMicrotask(ci));
  });
}
function xo(t) {
  return new Promise(function(e, n) {
    Hn.push({
      payload: t,
      resolve: e,
      reject: n
    }), wt || (wt = !0, queueMicrotask(ci));
  });
}
async function ci() {
  var t = Rn, e = Hn;
  if (Rn = [], Hn = [], wt = !1, !(t.length === 0 && e.length === 0)) {
    Le.start();
    var n = fi(), r = Et(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = t.map(function(m) {
      return m.payload;
    }), a = e.map(function(m) {
      return m.payload;
    }), l = {};
    o.length > 0 && (l.updates = o), a.length > 0 && (l.lazyLoads = a), le("request.started", {
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
      for (var p = u.responses || [], g = u.lazyResponses || [], c = 0; c < p.length; c++)
        if (p[c] && p[c].redirect) {
          Gn(p[c].redirect);
          return;
        }
      for (var c = 0; c < t.length; c++) {
        var h = p[c];
        if (!h) {
          t[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (h.error) {
          var w = new Error(h.error);
          w.status = h.status || 500, w.data = h, t[c].reject(w);
        } else if (h.errors) {
          var w = new Error("Validation failed");
          w.status = 422, w.data = h, t[c].reject(w);
        } else
          t[c].resolve(h);
      }
      for (var c = 0; c < e.length; c++) {
        var h = g[c];
        if (!h) {
          e[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (h.error) {
          var w = new Error(h.error);
          w.status = h.status || 500, w.data = h, e[c].reject(w);
        } else
          e[c].resolve(h);
      }
      le("request.finished", {
        url: n,
        success: !0,
        responses: p,
        lazyResponses: g,
        updateCount: t.length,
        lazyCount: e.length
      });
    } catch (m) {
      for (var c = 0; c < t.length; c++)
        t[c].reject(m);
      for (var c = 0; c < e.length; c++)
        e[c].reject(m);
      le("request.finished", {
        url: n,
        success: !1,
        error: m,
        updateCount: t.length,
        lazyCount: e.length
      });
    } finally {
      Le.done();
    }
  }
}
async function ko(t) {
  Le.start();
  var e = fi(), n = Et(), r = {
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
      return Gn(s.redirect), new Promise(function() {
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
function fi() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function dr(t, e, n, r, i) {
  return Lo({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
function jn(t) {
  return De(Object.assign({}, t));
}
function Io(t, e) {
  let n;
  for (n in e) {
    let r = JSON.stringify(t[n]), i = JSON.stringify(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function di(t) {
  return JSON.parse(JSON.stringify(t));
}
function No(t) {
  return zi(t);
}
function pr(t, e) {
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
let Fn = null, pi = /* @__PURE__ */ new Map();
function Oo() {
  return De({});
}
function se(t, e) {
  zn(t);
  for (let n in e)
    t[n] = e[n];
}
function zn(t) {
  for (let e in t)
    delete t[e];
}
function Mo(t) {
  Fn = t;
}
function Qe(t, e, n, r) {
  r = r || {};
  let i = !1;
  return le("error.occurred", {
    error: t,
    componentName: e,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : (Fn ? Fn(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function Po(t, e) {
  typeof e == "function" && pi.set(t, e);
}
function qn(t) {
  pi.delete(t);
}
var hi = [];
function j(t, e, n) {
  hi.push({
    name: t,
    directive: e
  });
}
function Vo() {
  return hi;
}
const Te = /* @__PURE__ */ new Map(), xe = /* @__PURE__ */ new Map();
let hr = !1;
function Ge() {
  return typeof window < "u" && window.Echo;
}
function Ro(t, e) {
  if (!Ge())
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
function mi(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!Ge())
    return hr || (hr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: c } = o, p = Ro(a, l);
    if (!p) continue;
    const g = l + ":" + a + ":" + s + ":" + t;
    if (xe.has(g)) {
      r.push(g);
      continue;
    }
    const h = function(w) {
      try {
        n(u, w);
      } catch (m) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', m);
      }
    };
    if (l === "presence" && d)
      Ho(p, s, h);
    else {
      const w = c ? "." + s : s;
      p.listen(w, h);
    }
    xe.set(g, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: h,
      isPresenceEvent: d,
      isCustomEvent: c
    }), r.push(g);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      vi(r[i]);
  };
}
function Ho(t, e, n) {
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
function vi(t) {
  const e = xe.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    xe.delete(t), jo(e.channelKey);
  }
}
function mr(t) {
  const e = ":" + t, n = [];
  xe.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    vi(n[r]);
}
function jo(t) {
  let e = !1;
  if (xe.forEach(function(r) {
    r.channelKey === t && (e = !0);
  }), e) return;
  if (Te.get(t) && Ge()) {
    const r = t.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Te.delete(t);
}
function vr() {
  xe.clear(), Te.forEach(function(t, e) {
    if (Ge()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Te.clear();
}
function Fo() {
  return {
    echoAvailable: Ge(),
    channels: Array.from(Te.keys()),
    subscriptions: Array.from(xe.keys())
  };
}
function zo() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Se = /* @__PURE__ */ new Map();
function en(t, e, n, r) {
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
function Wt(t, e, n, r, i, o) {
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
function gr(t) {
  Se.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Se.delete(n);
  });
}
function qo(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    Wt(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Wo(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, l = e[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function gi() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function $o(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", t), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = gi();
    s.open("POST", u, !0);
    var d = Et();
    d && s.setRequestHeader("X-CSRF-TOKEN", d), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var p = Math.round(c.loaded / c.total * 100);
        i(p);
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
        var p = new Error(c.error || c.message || "Upload failed");
        p.status = s.status, p.data = c, a(p);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function Bo(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(t), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", e), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = gi();
    u.open("POST", d, !0);
    var c = Et();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(p) {
      if (p.lengthComputable) {
        var g = Math.round(p.loaded / p.total * 100);
        i({ overall: g });
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
        var g = new Error(p.error || p.message || "Upload failed");
        g.status = u.status, g.data = p, a(g);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(s);
  });
}
const Uo = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var yr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(yr || (yr = {}));
function Jo() {
  const t = qi(!0), e = t.run(() => Qt({}));
  let n = [], r = [];
  const i = Wi({
    install(o) {
      i._a = o, o.provide(Uo, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
let vn = 0;
function Xo(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
function Yo(t) {
  return $i({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = Qt(!1), i = ei(null), o = null, a = Qt(null);
      async function l() {
        if (!r.value)
          try {
            let u = await xo({
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
        vn++;
        let c = "lazy-" + vn + "-" + Date.now(), p = d.memo ? d.memo.name : "", g = Xo(d.state || {}), h = d.memo || {}, { createLivueHelper: w, buildComponentDef: m, processTemplate: D, createReactiveState: L } = t._lazyHelpers, N = L(g), x = JSON.parse(JSON.stringify(g)), A = { _updateTemplate: null }, k = w(
          c,
          N,
          h,
          A,
          x,
          u.snapshot
        );
        h.errors && se(k.errors, h.errors);
        let H = "livue-lazy-child-" + vn, y = D(u.html, t), f = '<div data-livue-id="' + c + '">' + y.template + "</div>", _ = m(f, N, k, t._versions, p);
        t._childRegistry[c] = {
          tagName: H,
          state: N,
          memo: h,
          livue: k,
          componentRef: A,
          name: p,
          id: c
        }, A._updateTemplate = function(E) {
          let v = D(E, t), O = '<div data-livue-id="' + c + '">' + v.template + "</div>";
          for (let R in v.childDefs)
            t.vueApp._context.components[R] || t.vueApp.component(R, v.childDefs[R]);
          let M = m(O, N, k, t._versions, p);
          t.vueApp._context.components[H] = M, t._versions[H] = (t._versions[H] || 0) + 1, i.value = M;
        };
        let S = h.listeners || null;
        if (S)
          for (let E in S)
            (function(v, O) {
              en(E, p, c, function(M) {
                O.call(v, M);
              });
            })(S[E], k);
        for (let E in y.childDefs)
          t.vueApp._context.components[E] || t.vueApp.component(E, y.childDefs[E]);
        t._versions[H] = 0, t.vueApp._context.components[H] || t.vueApp.component(H, _), i.value = _, r.value = !0;
      }
      return ti(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), ni(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? sr(i.value) : sr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
let ft = /* @__PURE__ */ new Map(), dt = /* @__PURE__ */ new Map();
function Xe(t, e) {
  let n = t + ":debounce:" + e;
  if (!ft.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let c = i, p = o, g = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(p).catch(g);
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
function br(t) {
  let e = t + ":";
  for (let n of ft.keys())
    n.startsWith(e) && ft.delete(n);
  for (let n of dt.keys())
    n.startsWith(e) && dt.delete(n);
}
const tn = "livue-tab-sync";
let Kn = Date.now() + "-" + Math.random().toString(36).substr(2, 9), nn = null, Qn = /* @__PURE__ */ new Map(), wr = !1;
function yi() {
  wr || (wr = !0, typeof BroadcastChannel < "u" ? (nn = new BroadcastChannel(tn), nn.onmessage = Go) : window.addEventListener("storage", Ko));
}
function Go(t) {
  let e = t.data;
  e.tabId !== Kn && bi(e);
}
function Ko(t) {
  if (t.key === tn && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === Kn) return;
      bi(e);
    } catch {
    }
}
function bi(t) {
  let e = Qn.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function Qo(t, e) {
  yi(), Qn.set(t, e);
}
function Sr(t) {
  Qn.delete(t);
}
function Zo(t, e, n, r) {
  yi();
  let i = {
    tabId: Kn,
    component: t,
    state: e,
    properties: n,
    config: r
  };
  if (nn)
    nn.postMessage(i);
  else
    try {
      localStorage.setItem(tn, JSON.stringify(i)), localStorage.removeItem(tn);
    } catch {
    }
}
function ea(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
let Er = 0;
function Wn() {
  return typeof document < "u" && "startViewTransition" in document;
}
const gn = /* @__PURE__ */ new WeakMap();
function _r() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const ta = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (Er++, r = "livue-transition-" + Er), gn.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), Wn() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    _r();
  },
  updated(t, e) {
    let n = gn.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), Wn() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    gn.delete(t), t.removeAttribute("data-livue-transition"), _r();
  }
};
function na(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const Zn = /* @__PURE__ */ new Map();
async function ra(t, e = {}) {
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
        "X-CSRF-TOKEN": Et(),
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
      const p = s.split(`
`);
      s = p.pop() || "";
      for (const g of p)
        if (g.trim())
          try {
            const h = JSON.parse(g);
            if (h.stream)
              ia(h.stream), n(h.stream);
            else {
              if (h.error)
                throw new Error(h.error);
              h.snapshot && (u = h);
            }
          } catch (h) {
            console.error("[LiVue Stream] Parse error:", h, g);
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
function ia(t) {
  const { to: e, content: n, replace: r } = t, i = Zn.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Ar(t, e, n = !1) {
  Zn.set(t, { el: e, replace: n });
}
function Dr(t) {
  Zn.delete(t);
}
function oa(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function er(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    oa(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = er(r) : e[n] = r;
  }
  return e;
}
function aa(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = er(l), d = {};
    for (let c in s)
      d[c] = /* @__PURE__ */ (function(p, g) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return e(p + "." + g, h);
        };
      })(a, c);
    i[a] = De(Object.assign({}, u, d));
  }
  return i;
}
function la(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = er(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function sa(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
let Tr = 0, wi = /* @__PURE__ */ new Map();
function ua(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function ca(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Si(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    wi.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: ua(n)
    });
  });
}
function Ei(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = wi.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && ca(n, i.inputs));
  });
}
function kt(t, e) {
  let n = {}, r = di(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function fa(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function rn(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    fa(r) ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
let _i = {
  ref: Qt,
  computed: Ki,
  watch: Ce,
  watchEffect: Gi,
  reactive: De,
  readonly: Yi,
  onMounted: ti,
  onUnmounted: ni,
  onBeforeMount: Xi,
  onBeforeUnmount: Ji,
  nextTick: Yn,
  provide: Ui,
  inject: Bi
}, Ai = Object.keys(_i), da = Ai.map(function(t) {
  return _i[t];
});
function pa(t) {
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
function ha(t, e, n) {
  let r = Object.keys(e), i = r.map(function(l) {
    return e[l];
  }), o = Ai.concat(r).concat(["livue"]), a = da.concat(i).concat([n]);
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
function ma(t) {
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
  let a = ma(t), l = pa(a);
  return {
    name: o || "LiVueComponent",
    template: l.html,
    setup: function() {
      let s = No(e), u = Object.assign({}, s, r, { livue: n, livueV: i });
      if (l.setupCode) {
        let d = ha(l.setupCode, s, n);
        d && Object.assign(u, d);
      }
      return u;
    }
  };
}
function $n(t, e, n, r, i, o, a) {
  a = a || {};
  let l = Oo(), s = n.name, u = n.vueMethods || {}, d = n.confirms || {}, c = n.isolate || !1, p = n.urlParams || null, g = n.uploads || null, h = n.tabSync || null, w = !1, m = i, D = o;
  function L(f) {
    let _ = document.querySelector('meta[name="livue-prefix"]'), E = "/" + (_ ? _.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), v = document.createElement("a");
    v.href = E, v.download = f.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function N() {
    let f = kt(m, e);
    return {
      snapshot: D,
      diffs: f
    };
  }
  function x(f, _) {
    if (f.redirect) {
      Gn(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let v = f.errorBoundary;
      y.errorState.hasError = v.hasError, y.errorState.errorMessage = v.errorMessage, y.errorState.errorDetails = v.errorDetails, y.errorState.recover = v.recover, (!v.errorHandled || !v.recover) && le("error.occurred", {
        error: new Error(v.errorMessage || "Component error"),
        componentName: s,
        componentId: t,
        context: { method: v.errorMethod, serverHandled: v.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && L(f.download), f.snapshot) {
      let v = JSON.parse(f.snapshot);
      if (v.state) {
        let O = rn(v.state);
        Io(e, O), m = JSON.parse(JSON.stringify(O));
      }
      D = f.snapshot, v.memo && (v.memo.errors ? se(y.errors, v.memo.errors) : zn(y.errors), v.memo.vueMethods && (u = v.memo.vueMethods), v.memo.urlParams && (p = v.memo.urlParams), v.memo.uploads && (g = v.memo.uploads), v.memo.confirms && (d = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && la(k, v.memo));
    }
    if (p && Wo(p, e), f.html && r && r._updateTemplate) {
      let v = {};
      if (f.snapshot) {
        let O = JSON.parse(f.snapshot);
        O.memo && (O.memo.transitionType && (v.transitionType = O.memo.transitionType), O.memo.skipTransition && (v.skipTransition = !0));
      }
      r._updateTemplate(f.html, v);
    }
    if (f.events && f.events.length > 0) {
      for (var S = 0; S < f.events.length; S++)
        f.events[S].sourceId = t;
      qo(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var E = 0; E < f.js.length; E++)
        try {
          new Function("state", "livue", f.js[E])(e, y);
        } catch (v) {
          console.error("[LiVue] Error executing ->vue() JS:", v);
        }
    if (h && h.enabled && f.snapshot && !w && JSON.parse(f.snapshot).state) {
      let O = di(e), M = [];
      for (let R in O)
        (!_ || !(R in _)) && M.push(R);
      if (M.length > 0) {
        let R = ea(O, M, h);
        Object.keys(R).length > 0 && Zo(s, R, M, h);
      }
    }
    if (w = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let A = De({}), k = {}, H = function(f, _) {
    return y.call(f, _);
  };
  sa(n) && (k = aa(n, H));
  let y = De({
    loading: !1,
    processing: null,
    errors: l,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: A,
    refs: {},
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let _ = kt(m, e);
      return f === void 0 ? Object.keys(_).length > 0 : f in _;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = kt(m, e);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(m)) : m[f] !== void 0 ? JSON.parse(JSON.stringify(m[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in m && (e[f] = JSON.parse(JSON.stringify(m[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in m)
        f in e && (e[f] = JSON.parse(JSON.stringify(m[f])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(f) {
      return f ? A[f] || !1 : y.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let _ = f ? A[f] || !1 : y.loading;
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
    call: async function(f, _, S) {
      let E, v = null;
      if (arguments.length === 1 ? E = [] : arguments.length === 2 ? Array.isArray(_) ? E = _ : E = [_] : arguments.length >= 3 && (Array.isArray(_) && S && typeof S == "object" && (S.debounce || S.throttle) ? (E = _, v = S) : E = Array.prototype.slice.call(arguments, 1)), u[f]) {
        try {
          new Function("state", "livue", u[f])(e, y);
        } catch (M) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', M);
        }
        return;
      }
      let O = async function() {
        if (d[f] && !await y._showConfirm(d[f]))
          return;
        y.loading = !0, y.processing = f, A[f] = !0;
        let M;
        try {
          let R = N(), ne = await dr(R.snapshot, f, E, R.diffs, c);
          M = x(ne, R.diffs);
        } catch (R) {
          R.status === 422 && R.data && R.data.errors ? se(y.errors, R.data.errors) : Qe(R, s);
        } finally {
          y.loading = !1, y.processing = null, delete A[f];
        }
        return M;
      };
      return v && v.debounce ? Xe(t + ":" + f, v.debounce)(O) : v && v.throttle ? St(t + ":" + f, v.throttle)(O) : O();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, _) {
      let S = Array.prototype.slice.call(arguments, 2), E = { message: _ || "Are you sure?" };
      if (await y._showConfirm(E))
        return y.call.apply(y, [f].concat(S));
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
      y.loading = !0, y.processing = "$sync";
      try {
        let f = N(), _ = await dr(f.snapshot, null, [], f.diffs, c);
        x(_, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? se(y.errors, f.data.errors) : Qe(f, s);
      } finally {
        y.loading = !1, y.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      zn(y.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, _) {
      Wt(f, _, "broadcast", s, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, _, S) {
      Wt(_, S, "to", s, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, _) {
      Wt(f, _, "self", s, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      _t(f, !0);
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
    upload: async function(f, _) {
      if (!g || !g[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      y.uploading = !0, y.uploadProgress = 0;
      try {
        var S = await $o(_, s, f, g[f].token, function(E) {
          y.uploadProgress = E;
        });
        xt(e, f, {
          __livue_upload: !0,
          ref: S.ref,
          originalName: S.originalName,
          mimeType: S.mimeType,
          size: S.size,
          previewUrl: S.previewUrl
        });
      } catch (E) {
        E.status === 422 && E.data && E.data.errors ? se(y.errors, E.data.errors) : Qe(E, s);
      } finally {
        y.uploading = !1, y.uploadProgress = 0;
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
    uploadMultiple: async function(f, _) {
      if (!g || !g[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      y.uploading = !0, y.uploadProgress = 0;
      try {
        var S = await Bo(_, s, f, g[f].token, function(F) {
          y.uploadProgress = F.overall;
        }), E = S.results || [], v = S.errors || [], O = pr(e, f), M = Array.isArray(O) ? O : [];
        if (E.length > 0) {
          var R = E.map(function(F) {
            return {
              __livue_upload: !0,
              ref: F.ref,
              originalName: F.originalName,
              mimeType: F.mimeType,
              size: F.size,
              previewUrl: F.previewUrl
            };
          });
          xt(e, f, M.concat(R));
        }
        if (v.length > 0) {
          var ne = {};
          v.forEach(function(F) {
            var ke = f + "." + F.index;
            ne[ke] = {
              file: F.file,
              message: F.error
            };
          }), se(y.errors, ne);
        }
      } catch (F) {
        F.status === 422 && F.data && F.data.errors ? se(y.errors, F.data.errors) : Qe(F, s);
      } finally {
        y.uploading = !1, y.uploadProgress = 0;
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
    removeUpload: function(f, _) {
      var S = pr(e, f);
      _ !== void 0 && Array.isArray(S) ? (S.splice(_, 1), xt(e, f, S.slice())) : xt(e, f, null);
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
      _ = _ || [], y.loading = !0, y.streaming = !0, y.processing = f, y.streamingMethod = f, A[f] = !0;
      let S;
      try {
        let E = N();
        E.method = f, E.params = _, E.componentId = t;
        let v = await ra(E, {
          onChunk: function(O) {
          },
          onComplete: function(O) {
          },
          onError: function(O) {
            console.error("[LiVue Stream] Error:", O);
          }
        });
        v && (S = x(v, E.diffs));
      } catch (E) {
        E.status === 422 && E.data && E.data.errors ? se(y.errors, E.data.errors) : Qe(E, s);
      } finally {
        y.loading = !1, y.streaming = !1, y.processing = null, y.streamingMethod = null, delete A[f];
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
    watch: function(f, _) {
      return typeof _ != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Ce(
        function() {
          return e[f];
        },
        function(S, E) {
          _(S, E);
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
      }) : (Po(t, f), function() {
        qn(t);
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
      y.errorState.hasError = !1, y.errorState.errorMessage = null, y.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(f, _) {
      m = JSON.parse(JSON.stringify(f)), D = _;
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
      let f = kt(m, e), _ = {};
      for (let S in k) {
        let E = k[S], v = {}, O = [];
        for (let M in E)
          if (typeof E[M] == "function")
            O.push(M);
          else
            try {
              v[M] = JSON.parse(JSON.stringify(E[M]));
            } catch {
              v[M] = "[Unserializable]";
            }
        _[S] = { data: v, actions: O };
      }
      return {
        serverState: JSON.parse(JSON.stringify(m)),
        clientState: JSON.parse(JSON.stringify(e)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: s,
          isolate: c,
          urlParams: p,
          tabSync: h,
          hasUploads: !!g,
          uploadProps: g ? Object.keys(g) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(d),
          composableNames: Object.keys(k)
        },
        composables: _,
        uploading: y.uploading,
        uploadProgress: y.uploadProgress,
        streaming: y.streaming,
        streamingMethod: y.streamingMethod,
        errorState: {
          hasError: y.errorState.hasError,
          errorMessage: y.errorState.errorMessage
        }
      };
    }
  });
  for (let f in k)
    y[f] = k[f];
  return h && h.enabled && Qo(s, function(f, _, S) {
    let E = !1;
    if (S.reactive === !0)
      E = !0;
    else if (Array.isArray(S.reactive) && S.reactive.length > 0) {
      for (let v in f)
        if (S.reactive.includes(v)) {
          E = !0;
          break;
        }
    }
    if (E) {
      for (let v in f)
        S.only && !S.only.includes(v) || S.except && S.except.includes(v) || v in e && (e[v] = f[v]);
      w = !0, y.sync();
      return;
    }
    for (let v in f)
      S.only && !S.only.includes(v) || S.except && S.except.includes(v) || v in e && (e[v] = f[v]);
    for (let v in f)
      S.only && !S.only.includes(v) || S.except && S.except.includes(v) || (m[v] = JSON.parse(JSON.stringify(f[v])));
  }), { livue: y, composables: k };
}
function $t(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", c = JSON.parse(d), p = c.memo ? c.memo.name : "", g = rn(c.state || {}), h = c.memo || {}, w = s.innerHTML, m = e._childRegistry[u];
    if (!m)
      for (let y in e._childRegistry) {
        let f = e._childRegistry[y];
        if (f.name === p && !o[y]) {
          m = f;
          break;
        }
      }
    if (m) {
      o[m.id] = !0;
      let y = h.reactive || [];
      if (y.length > 0) {
        for (var D = 0; D < y.length; D++) {
          var L = y[D];
          L in g && (m.state[L] = g[L]);
        }
        m.livue._updateServerState(g, d), m.componentRef && m.componentRef._updateTemplate && m.componentRef._updateTemplate(w);
      }
    }
    let N = !m;
    if (!m) {
      Tr++;
      let y = "livue-child-" + Tr, f = jn(g), _ = JSON.parse(JSON.stringify(g)), S = Object.assign({ name: h.name || p }, h), E = { _updateTemplate: null }, v = ui(), O = $n(u, f, S, E, _, d, {
        el: s,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: v
      }), M = O.livue, R = O.composables;
      le("component.init", {
        component: { id: u, name: p, state: f, livue: M },
        el: s,
        cleanup: v.cleanup,
        isChild: !0
      });
      let ne = h.errors || null;
      ne && se(M.errors, ne), m = {
        tagName: y,
        state: f,
        memo: S,
        livue: M,
        composables: R,
        componentRef: E,
        name: p,
        id: u
      };
      let F = h.listeners || null;
      if (F)
        for (let Ie in F)
          (function(fe, de) {
            en(Ie, p, u, function(Ke) {
              de.call(fe, Ke);
            });
          })(F[Ie], M);
      let ke = h.echo || null;
      ke && ke.length && (function(Ie, fe) {
        mi(Ie, ke, function(de, Ke) {
          fe.call(de, Ke);
        });
      })(u, M), E._updateTemplate = function(Ie) {
        let fe = e.el.querySelector('[data-livue-id="' + u + '"]');
        fe && Si(fe);
        let de = $t(Ie, e), Ke = '<div data-livue-id="' + u + '">' + de.template + "</div>";
        for (let He in de.childDefs)
          e.vueApp._context.components[He] || e.vueApp.component(He, de.childDefs[He]);
        e.vueApp._context.components[m.tagName] = pt(Ke, m.state, m.livue, m.composables || {}, e._versions, m.name), e._versions[m.tagName] = (e._versions[m.tagName] || 0) + 1, Yn(function() {
          let He = e.el.querySelector('[data-livue-id="' + u + '"]');
          He && Ei(He);
        });
      }, e._childRegistry[u] = m;
    }
    let x = m.tagName, A = s.dataset.livueRef;
    A && e._rootLivue && (e._rootLivue.refs[A] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(y, f) {
        return m.livue.call(y, f || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(y, f) {
        return m.livue.set(y, f);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(y, f) {
        return m.livue.dispatch(y, f);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return m.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return m.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return m.livue;
      }
    });
    let k = s.dataset.livueModel;
    k && e._rootState && en("$modelUpdate", m.name, u, function(y) {
      y && y.value !== void 0 && (e._rootState[k] = y.value);
    }), N && (i[x] = pt(
      '<div data-livue-id="' + u + '">' + w + "</div>",
      m.state,
      m.livue,
      m.composables || {},
      e._versions,
      m.name
    )), e._versions[x] === void 0 && (e._versions[x] = 0);
    let H = document.createElement(x);
    H.setAttribute(":key", "livueV['" + x + "']"), s.parentNode.replaceChild(H, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
class va {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = jn(rn(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = De({}), this._rootDefRef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: $n,
      buildComponentDef: pt,
      processTemplate: $t,
      createReactiveState: jn
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
      _updateTemplate: function(w, m) {
        m = m || {}, le("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: w
        }), Si(r.el);
        let D = $t(w, r);
        for (let N in D.childDefs)
          r.vueApp._context.components[N] || r.vueApp.component(N, D.childDefs[N]);
        function L() {
          r._rootDefRef.value = pt(D.template, r.state, r._rootLivue, r._rootComposables || {}, r._versions, r.name), Yn(function() {
            Ei(r.el), le("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (m.skipTransition) {
          L();
          return;
        }
        Wn() ? na(L, { type: m.transitionType }) : L();
      }
    }, o = JSON.parse(JSON.stringify(rn(e.state || {})));
    this._cleanups = ui();
    let a = $n(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, le("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u = $t(this.el.innerHTML, this), d = e.memo && e.memo.errors || null;
    d && se(l.errors, d);
    let c = e.memo && e.memo.listeners || null;
    if (c)
      for (let w in c)
        (function(m, D, L, N) {
          en(w, L, N, function(x) {
            D.call(m, x);
          });
        })(c[w], l, r.name, r.componentId);
    let p = e.memo && e.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = mi(r.componentId, p, function(w, m) {
      l.call(w, m);
    }));
    let g = pt(u.template, r.state, l, s, r._versions, r.name);
    this._rootDefRef = ei(g), this.vueApp = Qi({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", Yo(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = Jo();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Vo();
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
      le("component.destroy", {
        component: { id: e, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), gr(e), br(e), qn(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Sr(n.name), mr(e);
    }
    le("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), gr(this.componentId), br(this.componentId), qn(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Sr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), mr(this.componentId), this.vueApp && (this.vueApp.unmount(), this.vueApp = null);
  }
}
let Cr = /* @__PURE__ */ new Set();
function ga(t) {
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
const ya = {
  mounted(t, e, n) {
    let r = ga(n);
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
    Cr.has(u) || (Cr.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, yn = /* @__PURE__ */ new WeakMap();
function ba(t) {
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
const wa = {
  mounted(t, e, n) {
    t.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + t.tagName.toLowerCase() + ">");
    let r = ba(n);
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
    t.addEventListener("submit", l), yn.set(t, l);
  },
  unmounted(t) {
    let e = yn.get(t);
    e && (t.removeEventListener("submit", e), yn.delete(t));
  }
}, It = /* @__PURE__ */ new WeakMap();
function Sa(t) {
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
const Ea = {
  mounted(t, e, n) {
    let r = Sa(n);
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
    let c = l.leave === !0, p = !1, g = new IntersectionObserver(
      function(h) {
        let w = h[0];
        (c ? !w.isIntersecting : w.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (g.disconnect(), It.delete(t)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    g.observe(t), It.set(t, g);
  },
  unmounted(t) {
    let e = It.get(t);
    e && (e.disconnect(), It.delete(t));
  }
}, bn = /* @__PURE__ */ new WeakMap();
function wn(t, e) {
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
const _a = {
  mounted(t, e) {
    wn(t, e);
    let n = function() {
      wn(t, e);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), bn.set(t, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(t, e) {
    wn(t, e);
  },
  unmounted(t, e) {
    let n = e.value;
    typeof n == "string" && n.split(" ").filter(function(i) {
      return i.trim();
    }).forEach(function(i) {
      t.classList.remove(i);
    }), t.removeAttribute("data-current");
    let r = bn.get(t);
    r && (r(), bn.delete(t));
  }
};
let Lr = 0;
const Aa = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    Lr++;
    let n = "livue-ignore-" + Lr;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, Ze = /* @__PURE__ */ new WeakMap();
let xr = 0;
function Da(t) {
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
function Ta(t) {
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
function Nt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function kr(t, e) {
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
function Ca(t) {
  return !!t.component;
}
const La = {
  mounted(t, e, n) {
    let r = Da(n);
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
    xr++;
    let s = "model-" + xr, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = Ta(l);
    l.live && !d && !c && (d = 150);
    function p(A) {
      if (l.number) {
        let k = Number(A);
        A = isNaN(k) ? 0 : k;
      }
      l.boolean && (A = !!A && A !== "false" && A !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = A : o[a] = A;
    }
    function g(A) {
      d > 0 ? Xe(s, d)(function() {
        p(A);
      }) : c > 0 ? St(s, c)(function() {
        p(A);
      }) : p(A);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let w = Ca(n), m = n.component, D = null, L = null, N = null, x = null;
    if (w && m)
      x = m.emit, m.emit = function(A, ...k) {
        if (A === "update:modelValue") {
          let H = k[0];
          g(H);
          return;
        }
        return x.call(m, A, ...k);
      }, m.props && "modelValue" in m.props && (N = Ce(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(A) {
          m.vnode && m.vnode.props && (m.vnode.props.modelValue = A), m.exposed && typeof m.exposed.setValue == "function" && m.exposed.setValue(A), m.update && m.update();
        },
        { immediate: !0 }
      )), Ze.set(t, {
        isComponent: !0,
        componentInstance: m,
        originalEmit: x,
        stopWatcher: N,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let A = Xe(s, d);
        D = function(k) {
          let H = Nt(k.target);
          A(function() {
            p(H);
          });
        };
      } else if (c > 0) {
        let A = St(s, c);
        D = function(k) {
          let H = Nt(k.target);
          A(function() {
            p(H);
          });
        };
      } else
        D = function(A) {
          p(Nt(A.target));
        };
      l.enter ? (L = function(A) {
        A.key === "Enter" && p(Nt(A.target));
      }, t.addEventListener("keyup", L)) : t.addEventListener(u, D), kr(t, h), Ze.set(t, {
        isComponent: !1,
        handler: D,
        keyHandler: L,
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
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], kr(t, a);
    }
  },
  unmounted(t) {
    let e = Ze.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), Ze.delete(t));
  }
}, Sn = /* @__PURE__ */ new WeakMap(), xa = 2500;
function ka(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return xa;
}
function Ia(t) {
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
const Na = {
  mounted(t, e, n) {
    let r = Ia(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = e.modifiers || {}, s = ka(l), u = l["keep-alive"] === !0, d = l.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      c.isPaused || d && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function g() {
      c.intervalId || (c.intervalId = setInterval(p, s));
    }
    function h() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(w) {
        c.isVisible = w[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", h), c.visibilityHandler = h, g(), Sn.set(t, c);
  },
  unmounted(t) {
    let e = Sn.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), Sn.delete(t));
  }
}, Ot = /* @__PURE__ */ new WeakMap();
let on = typeof navigator < "u" ? navigator.onLine : !0, an = /* @__PURE__ */ new Set(), Ir = !1;
function Oa() {
  Ir || typeof window > "u" || (Ir = !0, window.addEventListener("online", function() {
    on = !0, an.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    on = !1, an.forEach(function(t) {
      t(!1);
    });
  }));
}
const Ma = {
  created(t, e) {
    Oa();
    let n = e.modifiers || {}, r = e.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = t.style.display || "", on && (t.style.display = "none")), Ot.set(t, o);
  },
  mounted(t, e) {
    let n = Ot.get(t);
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
    r(on), n.updateFn = r, an.add(r);
  },
  unmounted(t) {
    let e = Ot.get(t);
    e && e.updateFn && an.delete(e.updateFn), Ot.delete(t);
  }
};
let Nr = 0;
const et = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new Map(), Pa = {
  created(t, e) {
    Nr++;
    let n = "livue-replace-" + Nr, r = e.modifiers.self === !0;
    et.set(t, {
      id: n,
      isSelf: r,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), r && t.setAttribute("data-livue-replace-self", ""), En.set(n, 0);
  },
  mounted(t, e) {
    let n = et.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = et.get(t);
    n && (n.version++, En.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = et.get(t);
    e && En.delete(e.id), et.delete(t);
  }
}, tt = /* @__PURE__ */ new WeakMap(), Or = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Va = 200;
function Ra(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(Or))
    if (t[e])
      return Or[e];
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
function _n(t, e, n, r, i) {
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
const ja = {
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
    let r = Ha(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = tt.get(t), o = e.modifiers || {}, a = Ra(o), l = e.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, _n(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, _n(t, i, o, u, !0)) : (i.isActive = !1, _n(t, i, o, u, !1));
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
}, Mt = /* @__PURE__ */ new WeakMap();
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
const Fa = {
  mounted(t, e, n) {
    let r = Mr(n);
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
    Mt.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = Mt.get(t), i = Mr(n);
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
    let e = Mt.get(t);
    e && (e.stopWatch && e.stopWatch(), Mt.delete(t));
  }
}, nt = /* @__PURE__ */ new WeakMap(), za = {
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
    nt.set(t, { targetId: n }), Ar(n, t, r);
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
      Dr(n.targetId);
      const i = e.modifiers.replace || !1;
      Ar(r, t, i), nt.set(t, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = nt.get(t);
    e && (Dr(e.targetId), nt.delete(t));
  }
}, An = /* @__PURE__ */ new WeakMap();
let Pr = 0;
function qa(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
}
function Wa(t) {
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
const $a = {
  mounted(t, e, n) {
    const { arg: r, modifiers: i } = e, o = Wa(n);
    if (!o) {
      console.warn("[LiVue] v-click: livue helper not found in component context");
      return;
    }
    Pr++;
    const a = "v-click-" + Pr, l = qa(i);
    let s = null, u = null;
    i.debounce && (s = Xe(a, l)), i.throttle && (u = St(a, l));
    let d = !1, c = null;
    r && (c = r);
    const p = function(m) {
      let D = c, L = [];
      if (r) {
        D = r;
        const x = e.value;
        x != null && (L = Array.isArray(x) ? x : [x]);
      } else {
        const x = e.value;
        typeof x == "string" ? D = x : Array.isArray(x) && x.length > 0 && (D = x[0], L = x.slice(1));
      }
      if (!D) {
        console.warn("[LiVue] v-click: no method specified");
        return;
      }
      const N = function() {
        o.call(D, ...L);
      };
      s ? s(N) : u ? u(N) : N();
    }, g = function(m) {
      if (!(i.self && m.target !== t)) {
        if (i.once) {
          if (d)
            return;
          d = !0;
        }
        i.prevent && m.preventDefault(), i.stop && m.stopPropagation(), p();
      }
    }, h = {};
    i.capture && (h.capture = !0), i.passive && (h.passive = !0);
    const w = {
      handler: g,
      options: h,
      outsideHandler: null
    };
    if (i.outside) {
      const m = function(D) {
        if (!t.contains(D.target) && D.target !== t) {
          if (i.once) {
            if (d)
              return;
            d = !0;
          }
          p();
        }
      };
      document.addEventListener("click", m, h), w.outsideHandler = m;
    } else
      t.addEventListener("click", g, h);
    An.set(t, w);
  },
  updated(t, e, n) {
  },
  unmounted(t) {
    const e = An.get(t);
    e && (e.outsideHandler ? document.removeEventListener("click", e.outsideHandler, e.options) : t.removeEventListener("click", e.handler, e.options), An.delete(t));
  }
}, Ba = {
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
let Vr = 0;
const Ua = {
  created(t, e) {
    let n = e.value;
    n || (Vr++, n = "scroll-" + Vr), t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n;
  },
  updated(t, e) {
    let n = e.value;
    n && n !== t.__livue_scroll_key && (t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n);
  },
  unmounted(t) {
    t.removeAttribute("data-livue-scroll"), delete t.__livue_scroll_key;
  }
}, rt = /* @__PURE__ */ new WeakMap();
function Rr(t) {
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
function Hr(t, e, n, r, i) {
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
const Ja = {
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
    let r = Rr(n);
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
        Hr(t, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    let r = rt.get(t);
    if (r && e.value !== e.oldValue) {
      let i = Rr(n);
      if (i) {
        let o = e.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Hr(t, r, e.modifiers || {}, e.value, a);
      }
    }
  },
  unmounted(t) {
    let e = rt.get(t);
    e && (e.stopWatch && e.stopWatch(), rt.delete(t));
  }
}, Pt = /* @__PURE__ */ new WeakMap();
let jr = 0;
function Xa(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Ya(t, e) {
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
function Ga(t, e) {
  let n = e.split("."), r = t[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const Ka = {
  mounted(t, e, n) {
    let r = Ya(e, n);
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
    jr++;
    let s = "watch-" + i + "-" + jr;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      t.addEventListener("focusout", p), Pt.set(t, { blurHandler: p });
      return;
    }
    let u = Xa(l) || 150, d = Xe(s, u), c = Ce(
      function() {
        return Ga(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    Pt.set(t, { stopWatcher: c });
  },
  unmounted(t) {
    let e = Pt.get(t);
    e && (e.stopWatcher && e.stopWatcher(), e.blurHandler && t.removeEventListener("focusout", e.blurHandler), Pt.delete(t));
  }
}, ht = /* @__PURE__ */ new WeakMap();
let Fr = 0;
function Qa(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function Za(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function el(t, e) {
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
function Dt(t, e, n) {
  let r = t[e];
  r && typeof r == "object" && "value" in r ? r.value = n : t[e] = n;
}
function Di(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function tl(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let r in t)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function nl(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function rl(t) {
  return nl(t) ? t : t.querySelector("input, textarea, select");
}
function Tt(t, e) {
  return {
    mounted(n, r, i) {
      if (Qa(i) && !Za(i))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = el(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: l } = a, s = tl(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Fr++;
      let d = t + "-" + Fr, c = rl(n);
      if (!c) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let p = e(c, s, l, u, d);
      c.addEventListener(p.eventType, p.handler, { capture: !0 }), ht.set(n, {
        targetEl: c,
        handler: p.handler,
        eventType: p.eventType
      });
    },
    unmounted(n) {
      let r = ht.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), ht.delete(n));
    }
  };
}
const il = Tt("debounce", function(t, e, n, r, i) {
  let o = Di(r) || 150, a = Xe(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = At(l.target);
      a(function() {
        Dt(n, e, s);
      });
    }
  };
}), ol = Tt("throttle", function(t, e, n, r, i) {
  let o = Di(r) || 150, a = St(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = At(l.target);
      a(function() {
        Dt(n, e, s);
      });
    }
  };
}), tr = Tt("blur", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Dt(n, e, At(l.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), al = tr.unmounted;
tr.unmounted = function(t) {
  let e = ht.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), al(t);
};
const nr = Tt("enter", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Dt(n, e, At(l.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), ll = nr.unmounted;
nr.unmounted = function(t) {
  let e = ht.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), ll(t);
};
const sl = Tt("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = At(o.target);
      a = !!a && a !== "false" && a !== "0", Dt(n, e, a);
    }
  };
});
function zr(t, e) {
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
    e % 2 ? zr(Object(n), !0).forEach(function(r) {
      ul(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : zr(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Bt(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Bt = function(e) {
    return typeof e;
  } : Bt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Bt(t);
}
function ul(t, e, n) {
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
function cl(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function fl(t, e) {
  if (t == null) return {};
  var n = cl(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
var dl = "1.15.6";
function ve(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var ye = ve(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Ct = ve(/Edge/i), qr = ve(/firefox/i), mt = ve(/safari/i) && !ve(/chrome/i) && !ve(/android/i), rr = ve(/iP(ad|od|hone)/i), Ti = ve(/chrome/i) && ve(/android/i), Ci = {
  capture: !1,
  passive: !1
};
function V(t, e, n) {
  t.addEventListener(e, n, !ye && Ci);
}
function P(t, e, n) {
  t.removeEventListener(e, n, !ye && Ci);
}
function ln(t, e) {
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
function Li(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function ae(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && ln(t, e) : ln(t, e)) || r && t === n)
        return t;
      if (t === n) break;
    } while (t = Li(t));
  }
  return null;
}
var Wr = /\s+/g;
function Z(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(Wr, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(Wr, " ");
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
function Je(t, e) {
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
function xi(t, e, n) {
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
    var o, a, l, s, u, d, c;
    if (t !== window && t.parentNode && t !== ue() ? (o = t.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, d = o.height, c = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !ye))
      do
        if (i && i.getBoundingClientRect && (T(i, "transform") !== "none" || n && T(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(T(i, "border-top-width")), l -= p.left + parseInt(T(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var g = Je(i || t), h = g && g.a, w = g && g.d;
      g && (a /= w, l /= h, c /= h, d /= w, s = a + d, u = l + c);
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
function $r(t, e, n) {
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
    if (a[o].style.display !== "none" && a[o] !== C.ghost && (r || a[o] !== C.dragged) && ae(a[o], n.draggable, t, !1)) {
      if (i === e)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function ir(t, e) {
  for (var n = t.lastElementChild; n && (n === C.ghost || T(n, "display") === "none" || e && !ln(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function re(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== C.clone && (!e || ln(t, e)) && n++;
  return n;
}
function Br(t) {
  var e = 0, n = 0, r = ue();
  if (t)
    do {
      var i = Je(t), o = i.a, a = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function pl(t, e) {
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
      var i = T(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ue();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ue();
}
function hl(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Dn(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var vt;
function ki(t, e) {
  return function() {
    if (!vt) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), vt = setTimeout(function() {
        vt = void 0;
      }, e);
    }
  };
}
function ml() {
  clearTimeout(vt), vt = void 0;
}
function Ii(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function Ni(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function Oi(t, e, n) {
  var r = {};
  return Array.from(t.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!ae(i, e.draggable, t, !1) || i.animated || i === n)) {
      var u = B(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var Q = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function vl() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(T(i, "display") === "none" || i === C.ghost)) {
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
      t.splice(pl(t, {
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
        var s = 0, u = l.target, d = u.fromRect, c = B(u), p = u.prevFromRect, g = u.prevToRect, h = l.rect, w = Je(u, !0);
        w && (c.top -= w.f, c.left -= w.e), u.toRect = c, u.thisAnimationDuration && Dn(p, c) && !Dn(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - c.top) / (h.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = yl(h, p, g, i.options)), Dn(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, h, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        T(r, "transition", ""), T(r, "transform", "");
        var l = Je(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, T(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = gl(r), T(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), T(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          T(r, "transition", ""), T(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function gl(t) {
  return t.offsetWidth;
}
function yl(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var je = [], Tn = {
  initializeByDefault: !0
}, Lt = {
  mount: function(e) {
    for (var n in Tn)
      Tn.hasOwnProperty(n) && !(n in e) && (e[n] = Tn[n]);
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
    return je.forEach(function(i) {
      typeof i.eventProperties == "function" && ge(r, i.eventProperties.call(n[i.pluginName], e));
    }), r;
  },
  modifyOption: function(e, n, r) {
    var i;
    return je.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(e[o.pluginName], r));
    }), i;
  }
};
function bl(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, c = t.newDraggableIndex, p = t.originalEvent, g = t.putSortable, h = t.extraEventProperties;
  if (e = e || n && n[Q], !!e) {
    var w, m = e.options, D = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ye && !Ct ? w = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (w = document.createEvent("Event"), w.initEvent(r, !0, !0)), w.to = a || n, w.from = l || n, w.item = i || n, w.clone = o, w.oldIndex = s, w.newIndex = u, w.oldDraggableIndex = d, w.newDraggableIndex = c, w.originalEvent = p, w.pullMode = g ? g.lastPutMode : void 0;
    var L = ce(ce({}, h), Lt.getEventProperties(r, e));
    for (var N in L)
      w[N] = L[N];
    n && n.dispatchEvent(w), m[D] && m[D].call(e, w);
  }
}
var wl = ["evt"], K = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = fl(r, wl);
  Lt.pluginEvent.bind(C)(e, n, ce({
    dragEl: b,
    parentEl: W,
    ghostEl: I,
    rootEl: z,
    nextEl: Pe,
    lastDownEl: Ut,
    cloneEl: q,
    cloneHidden: Ee,
    dragStarted: at,
    putSortable: J,
    activeSortable: C.active,
    originalEvent: i,
    oldIndex: $e,
    oldDraggableIndex: gt,
    newIndex: ee,
    newDraggableIndex: be,
    hideGhostForTarget: Ri,
    unhideGhostForTarget: Hi,
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
  bl(ce({
    putSortable: J,
    cloneEl: q,
    targetEl: b,
    rootEl: z,
    oldIndex: $e,
    oldDraggableIndex: gt,
    newIndex: ee,
    newDraggableIndex: be
  }, t));
}
var b, W, I, z, Pe, Ut, q, Ee, $e, ee, gt, be, Vt, J, We = !1, sn = !1, un = [], Ne, oe, Cn, Ln, Ur, Jr, at, Fe, yt, bt = !1, Rt = !1, Jt, X, xn = [], Bn = !1, cn = [], hn = typeof document < "u", Ht = rr, Xr = Ct || ye ? "cssFloat" : "float", Sl = hn && !Ti && !rr && "draggable" in document.createElement("div"), Mi = (function() {
  if (hn) {
    if (ye)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Pi = function(e, n) {
  var r = T(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Ye(e, 0, n), a = Ye(e, 1, n), l = o && T(o), s = a && T(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + B(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + B(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Xr] === "none" || a && r[Xr] === "none" && u + d > i) ? "vertical" : "horizontal";
}, El = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, _l = function(e, n) {
  var r;
  return un.some(function(i) {
    var o = i[Q].options.emptyInsertThreshold;
    if (!(!o || ir(i))) {
      var a = B(i), l = e >= a.left - o && e <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, Vi = function(e) {
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
      var p = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
    };
  }
  var r = {}, i = e.group;
  (!i || Bt(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, Ri = function() {
  !Mi && I && T(I, "display", "none");
}, Hi = function() {
  !Mi && I && T(I, "display", "");
};
hn && !Ti && document.addEventListener("click", function(t) {
  if (sn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), sn = !1, !1;
}, !0);
var Oe = function(e) {
  if (b) {
    e = e.touches ? e.touches[0] : e;
    var n = _l(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[Q]._onDragOver(r);
    }
  }
}, Al = function(e) {
  b && b.parentNode[Q]._isOutsideThisEl(e.target);
};
function C(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = ge({}, e), t[Q] = this;
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
      return Pi(t, this.options);
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
    supportPointer: C.supportPointer !== !1 && "PointerEvent" in window && (!mt || rr),
    emptyInsertThreshold: 5
  };
  Lt.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Vi(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Sl, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? V(t, "pointerdown", this._onTapStart) : (V(t, "mousedown", this._onTapStart), V(t, "touchstart", this._onTapStart)), this.nativeDraggable && (V(t, "dragover", this), V(t, "dragenter", this)), un.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ge(this, vl());
}
C.prototype = /** @lends Sortable.prototype */
{
  constructor: C,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Fe = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, b) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, d = i.filter;
      if (Nl(r), !b && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && mt && s && s.tagName.toUpperCase() === "SELECT") && (s = ae(s, i.draggable, r, !1), !(s && s.animated) && Ut !== s)) {
        if ($e = re(s), gt = re(s, i.draggable), typeof d == "function") {
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
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = ae(u, c.trim(), r, !1), c)
            return Y({
              sortable: n,
              rootEl: c,
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
        i.handle && !ae(u, i.handle, r, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !b && r.parentNode === o) {
      var u = B(r);
      if (z = o, b = r, W = b.parentNode, Pe = b.nextSibling, Ut = r, Vt = a.group, C.dragged = b, Ne = {
        target: b,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, Ur = Ne.clientX - u.left, Jr = Ne.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, b.style["will-change"] = "all", s = function() {
        if (K("delayEnded", i, {
          evt: e
        }), C.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !qr && i.nativeDraggable && (b.draggable = !0), i._triggerDragStart(e, n), Y({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), Z(b, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        xi(b, d.trim(), kn);
      }), V(l, "dragover", Oe), V(l, "mousemove", Oe), V(l, "touchmove", Oe), a.supportPointer ? (V(l, "pointerup", i._onDrop), !this.nativeDraggable && V(l, "pointercancel", i._onDrop)) : (V(l, "mouseup", i._onDrop), V(l, "touchend", i._onDrop), V(l, "touchcancel", i._onDrop)), qr && this.nativeDraggable && (this.options.touchStartThreshold = 4, b.draggable = !0), K("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Ct || ye))) {
        if (C.eventCanceled) {
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
    b && kn(b), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    P(e, "mouseup", this._disableDelayedDrag), P(e, "touchend", this._disableDelayedDrag), P(e, "touchcancel", this._disableDelayedDrag), P(e, "pointerup", this._disableDelayedDrag), P(e, "pointercancel", this._disableDelayedDrag), P(e, "mousemove", this._delayedDragTouchMoveHandler), P(e, "touchmove", this._delayedDragTouchMoveHandler), P(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? V(document, "pointermove", this._onTouchMove) : n ? V(document, "touchmove", this._onTouchMove) : V(document, "mousemove", this._onTouchMove) : (V(b, "dragend", this), V(z, "dragstart", this._onDragStart));
    try {
      document.selection ? Xt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (We = !1, z && b) {
      K("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && V(document, "dragover", Al);
      var r = this.options;
      !e && Z(b, r.dragClass, !1), Z(b, r.ghostClass, !0), C.active = this, e && this._appendGhost(), Y({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (oe) {
      this._lastX = oe.clientX, this._lastY = oe.clientY, Ri();
      for (var e = document.elementFromPoint(oe.clientX, oe.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(oe.clientX, oe.clientY), e !== n); )
        n = e;
      if (b.parentNode[Q]._isOutsideThisEl(e), n)
        do {
          if (n[Q]) {
            var r = void 0;
            if (r = n[Q]._onDragOver({
              clientX: oe.clientX,
              clientY: oe.clientY,
              target: e,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = Li(n));
      Hi();
    }
  },
  _onTouchMove: function(e) {
    if (Ne) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = I && Je(I, !0), l = I && a && a.a, s = I && a && a.d, u = Ht && X && Br(X), d = (o.clientX - Ne.clientX + i.x) / (l || 1) + (u ? u[0] - xn[0] : 0) / (l || 1), c = (o.clientY - Ne.clientY + i.y) / (s || 1) + (u ? u[1] - xn[1] : 0) / (s || 1);
      if (!C.active && !We) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (I) {
        a ? (a.e += d - (Cn || 0), a.f += c - (Ln || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        T(I, "webkitTransform", p), T(I, "mozTransform", p), T(I, "msTransform", p), T(I, "transform", p), Cn = d, Ln = c, oe = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!I) {
      var e = this.options.fallbackOnBody ? document.body : z, n = B(b, !0, Ht, !0, e), r = this.options;
      if (Ht) {
        for (X = e; T(X, "position") === "static" && T(X, "transform") === "none" && X !== document; )
          X = X.parentNode;
        X !== document.body && X !== document.documentElement ? (X === document && (X = ue()), n.top += X.scrollTop, n.left += X.scrollLeft) : X = ue(), xn = Br(X);
      }
      I = b.cloneNode(!0), Z(I, r.ghostClass, !1), Z(I, r.fallbackClass, !0), Z(I, r.dragClass, !0), T(I, "transition", ""), T(I, "transform", ""), T(I, "box-sizing", "border-box"), T(I, "margin", 0), T(I, "top", n.top), T(I, "left", n.left), T(I, "width", n.width), T(I, "height", n.height), T(I, "opacity", "0.8"), T(I, "position", Ht ? "absolute" : "fixed"), T(I, "zIndex", "100000"), T(I, "pointerEvents", "none"), C.ghost = I, e.appendChild(I), T(I, "transform-origin", Ur / parseInt(I.style.width) * 100 + "% " + Jr / parseInt(I.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var r = this, i = e.dataTransfer, o = r.options;
    if (K("dragStart", this, {
      evt: e
    }), C.eventCanceled) {
      this._onDrop();
      return;
    }
    K("setupClone", this), C.eventCanceled || (q = Ni(b), q.removeAttribute("id"), q.draggable = !1, q.style["will-change"] = "", this._hideClone(), Z(q, this.options.chosenClass, !1), C.clone = q), r.cloneId = Xt(function() {
      K("clone", r), !C.eventCanceled && (r.options.removeCloneOnHide || z.insertBefore(q, b), r._hideClone(), Y({
        sortable: r,
        name: "clone"
      }));
    }), !n && Z(b, o.dragClass, !0), n ? (sn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (P(document, "mouseup", r._onDrop), P(document, "touchend", r._onDrop), P(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, b)), V(document, "drop", r), T(b, "transform", "translateZ(0)")), We = !0, r._dragStartId = Xt(r._dragStarted.bind(r, n, e)), V(document, "selectstart", r), at = !0, window.getSelection().removeAllRanges(), mt && T(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, l = this.options, s = l.group, u = C.active, d = Vt === s, c = l.sort, p = J || u, g, h = this, w = !1;
    if (Bn) return;
    function m(F, ke) {
      K(F, h, ce({
        evt: e,
        isOwner: d,
        axis: g ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: p,
        target: r,
        completed: L,
        onMove: function(fe, de) {
          return jt(z, n, b, i, fe, B(fe), e, de);
        },
        changed: N
      }, ke));
    }
    function D() {
      m("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function L(F) {
      return m("dragOverCompleted", {
        insertion: F
      }), F && (d ? u._hideClone() : u._showClone(h), h !== p && (Z(b, J ? J.options.ghostClass : u.options.ghostClass, !1), Z(b, l.ghostClass, !0)), J !== h && h !== C.active ? J = h : h === C.active && J && (J = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        m("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === b && !b.animated || r === n && !r.animated) && (Fe = null), !l.dragoverBubble && !e.rootEl && r !== document && (b.parentNode[Q]._isOutsideThisEl(e.target), !F && Oe(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), w = !0;
    }
    function N() {
      ee = re(b), be = re(b, l.draggable), Y({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: ee,
        newDraggableIndex: be,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = ae(r, l.draggable, n, !0), m("dragOver"), C.eventCanceled) return w;
    if (b.contains(e.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return L(!1);
    if (sn = !1, u && !l.disabled && (d ? c || (a = W !== z) : J === this || (this.lastPutMode = Vt.checkPull(this, u, b, e)) && s.checkPut(this, u, b, e))) {
      if (g = this._getDirection(e, r) === "vertical", i = B(b), m("dragOverValid"), C.eventCanceled) return w;
      if (a)
        return W = z, D(), this._hideClone(), m("revert"), C.eventCanceled || (Pe ? z.insertBefore(b, Pe) : z.appendChild(b)), L(!0);
      var x = ir(n, l.draggable);
      if (!x || Ll(e, g, this) && !x.animated) {
        if (x === b)
          return L(!1);
        if (x && n === e.target && (r = x), r && (o = B(r)), jt(z, n, b, i, r, o, e, !!r) !== !1)
          return D(), x && x.nextSibling ? n.insertBefore(b, x.nextSibling) : n.appendChild(b), W = n, N(), L(!0);
      } else if (x && Cl(e, g, this)) {
        var A = Ye(n, 0, l, !0);
        if (A === b)
          return L(!1);
        if (r = A, o = B(r), jt(z, n, b, i, r, o, e, !1) !== !1)
          return D(), n.insertBefore(b, A), W = n, N(), L(!0);
      } else if (r.parentNode === n) {
        o = B(r);
        var k = 0, H, y = b.parentNode !== n, f = !El(b.animated && b.toRect || i, r.animated && r.toRect || o, g), _ = g ? "top" : "left", S = $r(r, "top", "top") || $r(b, "top", "top"), E = S ? S.scrollTop : void 0;
        Fe !== r && (H = o[_], bt = !1, Rt = !f && l.invertSwap || y), k = xl(e, r, o, g, f ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Rt, Fe === r);
        var v;
        if (k !== 0) {
          var O = re(b);
          do
            O -= k, v = W.children[O];
          while (v && (T(v, "display") === "none" || v === I));
        }
        if (k === 0 || v === r)
          return L(!1);
        Fe = r, yt = k;
        var M = r.nextElementSibling, R = !1;
        R = k === 1;
        var ne = jt(z, n, b, i, r, o, e, R);
        if (ne !== !1)
          return (ne === 1 || ne === -1) && (R = ne === 1), Bn = !0, setTimeout(Tl, 30), D(), R && !M ? n.appendChild(b) : r.parentNode.insertBefore(b, R ? M : r), S && Ii(S, 0, E - S.scrollTop), W = b.parentNode, H !== void 0 && !Rt && (Jt = Math.abs(H - B(r)[_])), N(), L(!0);
      }
      if (n.contains(b))
        return L(!1);
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
    if (ee = re(b), be = re(b, r.draggable), K("drop", this, {
      evt: e
    }), W = b && b.parentNode, ee = re(b), be = re(b, r.draggable), C.eventCanceled) {
      this._nulling();
      return;
    }
    We = !1, Rt = !1, bt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Un(this.cloneId), Un(this._dragStartId), this.nativeDraggable && (P(document, "drop", this), P(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), mt && T(document.body, "user-select", ""), T(b, "transform", ""), e && (at && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), I && I.parentNode && I.parentNode.removeChild(I), (z === W || J && J.lastPutMode !== "clone") && q && q.parentNode && q.parentNode.removeChild(q), b && (this.nativeDraggable && P(b, "dragend", this), kn(b), b.style["will-change"] = "", at && !We && Z(b, J ? J.options.ghostClass : this.options.ghostClass, !1), Z(b, this.options.chosenClass, !1), Y({
      sortable: this,
      name: "unchoose",
      toEl: W,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), z !== W ? (ee >= 0 && (Y({
      rootEl: W,
      name: "add",
      toEl: W,
      fromEl: z,
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
      fromEl: z,
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
    })), C.active && ((ee == null || ee === -1) && (ee = $e, be = gt), Y({
      sortable: this,
      name: "end",
      toEl: W,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    K("nulling", this), z = b = W = I = Pe = q = Ut = Ee = Ne = oe = at = ee = be = $e = gt = Fe = yt = J = Vt = C.dragged = C.ghost = C.clone = C.active = null, cn.forEach(function(e) {
      e.checked = !0;
    }), cn.length = Cn = Ln = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        b && (this._onDragOver(e), Dl(e));
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
      n = r[i], ae(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || Il(n));
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
      ae(l, this.options.draggable, i, !1) && (r[o] = l);
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
    return ae(e, n || this.options.draggable, this.el, !1);
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
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && Vi(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    K("destroy", this);
    var e = this.el;
    e[Q] = null, P(e, "mousedown", this._onTapStart), P(e, "touchstart", this._onTapStart), P(e, "pointerdown", this._onTapStart), this.nativeDraggable && (P(e, "dragover", this), P(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), un.splice(un.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Ee) {
      if (K("hideClone", this), C.eventCanceled) return;
      T(q, "display", "none"), this.options.removeCloneOnHide && q.parentNode && q.parentNode.removeChild(q), Ee = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ee) {
      if (K("showClone", this), C.eventCanceled) return;
      b.parentNode == z && !this.options.group.revertClone ? z.insertBefore(q, b) : Pe ? z.insertBefore(q, Pe) : z.appendChild(q), this.options.group.revertClone && this.animate(b, q), T(q, "display", ""), Ee = !1;
    }
  }
};
function Dl(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function jt(t, e, n, r, i, o, a, l) {
  var s, u = t[Q], d = u.options.onMove, c;
  return window.CustomEvent && !ye && !Ct ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = r, s.related = i || e, s.relatedRect = o || B(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function kn(t) {
  t.draggable = !1;
}
function Tl() {
  Bn = !1;
}
function Cl(t, e, n) {
  var r = B(Ye(n.el, 0, n.options, !0)), i = Oi(n.el, n.options, I), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function Ll(t, e, n) {
  var r = B(ir(n.el, n.options.draggable)), i = Oi(n.el, n.options, I), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function xl(t, e, n, r, i, o, a, l) {
  var s = r ? t.clientY : t.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && Jt < u * i) {
      if (!bt && (yt === 1 ? s > d + u * o / 2 : s < c - u * o / 2) && (bt = !0), bt)
        p = !0;
      else if (yt === 1 ? s < d + Jt : s > c - Jt)
        return -yt;
    } else if (s > d + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return kl(e);
  }
  return p = p || a, p && (s < d + u * o / 2 || s > c - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function kl(t) {
  return re(b) < re(t) ? 1 : -1;
}
function Il(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function Nl(t) {
  cn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && cn.push(r);
  }
}
function Xt(t) {
  return setTimeout(t, 0);
}
function Un(t) {
  return clearTimeout(t);
}
hn && V(document, "touchmove", function(t) {
  (C.active || We) && t.cancelable && t.preventDefault();
});
C.utils = {
  on: V,
  off: P,
  css: T,
  find: xi,
  is: function(e, n) {
    return !!ae(e, n, e, !1);
  },
  extend: hl,
  throttle: ki,
  closest: ae,
  toggleClass: Z,
  clone: Ni,
  index: re,
  nextTick: Xt,
  cancelNextTick: Un,
  detectDirection: Pi,
  getChild: Ye,
  expando: Q
};
C.get = function(t) {
  return t[Q];
};
C.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (C.utils = ce(ce({}, C.utils), r.utils)), Lt.mount(r);
  });
};
C.create = function(t, e) {
  return new C(t, e);
};
C.version = dl;
var $ = [], lt, Jn, Xn = !1, In, Nn, fn, st;
function Ol() {
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
      this.sortable.nativeDraggable ? P(document, "dragover", this._handleAutoScroll) : (P(document, "pointermove", this._handleFallbackAutoScroll), P(document, "touchmove", this._handleFallbackAutoScroll), P(document, "mousemove", this._handleFallbackAutoScroll)), Yr(), Yt(), ml();
    },
    nulling: function() {
      fn = Jn = lt = Xn = st = In = Nn = null, $.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (fn = n, r || this.options.forceAutoScrollFallback || Ct || ye || mt) {
        On(n, this.options, l, r);
        var s = Ae(l, !0);
        Xn && (!st || o !== In || a !== Nn) && (st && Yr(), st = setInterval(function() {
          var u = Ae(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, Yt()), On(n, i.options, u, r);
        }, 10), In = o, Nn = a);
      } else {
        if (!this.options.bubbleScroll || Ae(l, !0) === ue()) {
          Yt();
          return;
        }
        On(n, this.options, Ae(l, !1), !1);
      }
    }
  }, ge(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Yt() {
  $.forEach(function(t) {
    clearInterval(t.pid);
  }), $ = [];
}
function Yr() {
  clearInterval(st);
}
var On = ki(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = ue(), u = !1, d;
    Jn !== n && (Jn = n, Yt(), lt = e.scroll, d = e.scrollFn, lt === !0 && (lt = Ae(n, !0)));
    var c = 0, p = lt;
    do {
      var g = p, h = B(g), w = h.top, m = h.bottom, D = h.left, L = h.right, N = h.width, x = h.height, A = void 0, k = void 0, H = g.scrollWidth, y = g.scrollHeight, f = T(g), _ = g.scrollLeft, S = g.scrollTop;
      g === s ? (A = N < H && (f.overflowX === "auto" || f.overflowX === "scroll" || f.overflowX === "visible"), k = x < y && (f.overflowY === "auto" || f.overflowY === "scroll" || f.overflowY === "visible")) : (A = N < H && (f.overflowX === "auto" || f.overflowX === "scroll"), k = x < y && (f.overflowY === "auto" || f.overflowY === "scroll"));
      var E = A && (Math.abs(L - i) <= a && _ + N < H) - (Math.abs(D - i) <= a && !!_), v = k && (Math.abs(m - o) <= a && S + x < y) - (Math.abs(w - o) <= a && !!S);
      if (!$[c])
        for (var O = 0; O <= c; O++)
          $[O] || ($[O] = {});
      ($[c].vx != E || $[c].vy != v || $[c].el !== g) && ($[c].el = g, $[c].vx = E, $[c].vy = v, clearInterval($[c].pid), (E != 0 || v != 0) && (u = !0, $[c].pid = setInterval(function() {
        r && this.layer === 0 && C.active._onTouchMove(fn);
        var M = $[this.layer].vy ? $[this.layer].vy * l : 0, R = $[this.layer].vx ? $[this.layer].vx * l : 0;
        typeof d == "function" && d.call(C.dragged.parentNode[Q], R, M, t, fn, $[this.layer].el) !== "continue" || Ii($[this.layer].el, R, M);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && p !== s && (p = Ae(p, !1)));
    Xn = u;
  }
}, 30), ji = function(e) {
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
function or() {
}
or.prototype = {
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
  drop: ji
};
ge(or, {
  pluginName: "revertOnSpill"
});
function ar() {
}
ar.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: ji
};
ge(ar, {
  pluginName: "removeOnSpill"
});
C.mount(new Ol());
C.mount(ar, or);
const Be = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap();
function Ml(t) {
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
function Pl(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Ft = /* @__PURE__ */ new WeakMap(), Vl = {
  mounted(t, e, n) {
    let r = Ml(n), i = e.modifiers || {}, o = Pl(i), a = i.horizontal ? "horizontal" : "vertical";
    Ft.set(t, e);
    let l = t.dataset.livueSortGroup || null, s = {
      animation: o,
      direction: a,
      ghostClass: "livue-sort-ghost",
      chosenClass: "livue-sort-chosen",
      dragClass: "livue-sort-drag",
      // Draggable items selector (elements with data-livue-sort-item)
      draggable: "[data-livue-sort-item]",
      // Filter out ignored elements (prevents drag on buttons, etc.)
      filter: "[data-livue-sort-ignore]",
      preventOnFilter: !1,
      // Callback when item is dropped
      onEnd: function(c) {
        let p = c.newIndex, g = c.oldIndex;
        if (g === p)
          return;
        let h = Ft.get(t), w = h ? h.value : null, m = typeof w == "string";
        if (Array.isArray(w)) {
          let L = c.from;
          g < p ? L.insertBefore(c.item, L.children[g]) : L.insertBefore(c.item, L.children[g + 1]);
          let N = w.splice(g, 1)[0];
          w.splice(p, 0, N);
          return;
        }
        if (m && r) {
          let L = w, N = [], x = c.item, A = Gt.get(x);
          A === void 0 && (A = x.dataset.livueSortItem), typeof A == "string" && /^\d+$/.test(A) && (A = parseInt(A, 10));
          let k = c.from, H = c.to, y = [A, p].concat(N);
          if (k !== H) {
            let _ = H.dataset.livueSortMethod;
            _ && (L = _);
            let S = k.dataset.livueSortId || k.dataset.livueSortGroup || null;
            y.push(S);
          }
          r.call(L, y);
        }
      }
    };
    typeof e.value == "string" && (t.dataset.livueSortMethod = e.value), t.querySelector("[data-livue-sort-handle]") && (s.handle = "[data-livue-sort-handle]"), l && (s.group = l);
    let d = C.create(t, s);
    Be.set(t, d);
  },
  updated(t, e) {
    Ft.set(t, e);
    let n = Be.get(t);
    n && t.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = Be.get(t);
    e && (e.destroy(), Be.delete(t)), Ft.delete(t);
  }
}, Rl = {
  mounted(t, e) {
    let n = e.value;
    Gt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    Gt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (Gt.delete(t), t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Hl = {
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
}, jl = {
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
}, Fl = {
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
function zl() {
  j("init", ya), j("submit", wa), j("intersect", Ea), j("current", _a), j("ignore", Aa), j("model-livue", La), j("debounce", il), j("throttle", ol), j("blur", tr), j("enter", nr), j("boolean", sl), j("poll", Na), j("offline", Ma), j("transition", ta), j("replace", Pa), j("loading", ja), j("target", Fa), j("stream", za), j("click", $a), j("navigate", Ba), j("scroll", Ua), j("dirty", Ja), j("watch", Ka), j("sort", Vl), j("sort-item", Rl), j("sort-handle", Hl), j("sort-ignore", jl), j("sort-group", Fl);
}
let we = null, it = null, Gr = !1;
function ql() {
  if (Gr)
    return;
  Gr = !0;
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
function Wl() {
  return we || (ql(), we = document.createElement("div"), we.className = "livue-hmr-indicator", document.body.appendChild(we), we);
}
function zt(t, e) {
  const n = Wl();
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
        Kr();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, it = setTimeout(function() {
        Kr();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Kr() {
  we && we.classList.remove("visible");
}
let Re = null, mn = !0, Fi = !0, ut = !0, Kt = [];
function $l(t) {
  Re = t;
}
async function Bl(t) {
  if (mn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), ut && zt("updating", t.fileName), Kt.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Fi ? Ul() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), ut && zt("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Re.reboot(), e && (await Xl(), Jl(e)), ut && zt("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), ut && zt("error");
    }
  }
}
function Ul() {
  const t = /* @__PURE__ */ new Map();
  return Re && Re.all().forEach(function(n) {
    if (Qr(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Qr(r, i.name, i.state, t);
      }
  }), t;
}
function Qr(t, e, n, r) {
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
function Jl(t) {
  Re && t.forEach(function(e, n) {
    const r = Re.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function Xl() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Yl() {
  return typeof import.meta < "u" && !1;
}
function Gl() {
  mn = !0;
}
function Kl() {
  mn = !1;
}
function Ql() {
  return mn;
}
function Zl(t) {
  t.indicator !== void 0 && (ut = t.indicator), t.preserveState !== void 0 && (Fi = t.preserveState);
}
function es(t) {
  return Kt.push(t), function() {
    const e = Kt.indexOf(t);
    e !== -1 && Kt.splice(e, 1);
  };
}
async function ts() {
  Re && await Bl({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var ze = !1, Mn = [];
class ns {
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
    Mo(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    zl(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), fo(this), this._startObserver(), $l(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), zo());
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
    co(e);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(e) {
    return pn(e);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    So();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return To();
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
      available: Ge(),
      ...Fo()
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
    let r = new va(e);
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
    return cr(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return fr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), vr();
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
    }), vr();
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
      isAvailable: Yl,
      isEnabled: Ql,
      enable: Gl,
      disable: Kl,
      configure: Zl,
      onUpdate: es,
      trigger: ts
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
    if (e && !ze) {
      ze = !0, console.log("[LiVue] Debug mode enabled");
      var n = fr();
      n.forEach(function(r) {
        var i = cr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        Mn.push(i);
      });
    } else !e && ze && (ze = !1, console.log("[LiVue] Debug mode disabled"), Mn.forEach(function(r) {
      r();
    }), Mn = []);
    return ze;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return ze;
  }
}
const lr = new ns();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = Zi, document.head.appendChild(t);
}
var pe = window.LiVueConfig || {};
(pe.showProgressBar !== void 0 || pe.progressBarColor !== void 0 || pe.prefetch !== void 0 || pe.prefetchOnHover !== void 0 || pe.hoverDelay !== void 0 || pe.cachePages !== void 0 || pe.maxCacheSize !== void 0 || pe.restoreScroll !== void 0) && lr.configureNavigation(pe);
function Zr() {
  lr.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Zr) : queueMicrotask(Zr);
window.LiVue = lr;
export {
  lr as default
};
//# sourceMappingURL=livue.esm.js.map
