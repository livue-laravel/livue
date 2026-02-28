import * as bn from "vue";
import { reactive as Ne, toRefs as Qi, effectScope as eo, ref as en, markRaw as to, defineComponent as no, shallowRef as rr, onMounted as di, onUnmounted as pi, h as br, inject as ro, provide as io, nextTick as ir, onBeforeUnmount as oo, onBeforeMount as ao, readonly as lo, watchEffect as so, watch as Oe, computed as uo, createApp as co } from "vue";
const fo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let He = null;
function tt() {
  if (He)
    return He;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return He = t.getAttribute("content"), He;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (He = decodeURIComponent(e[1]), He) : null;
}
function po() {
  He = null;
}
let Q = {
  color: "#29d",
  height: "2px",
  showSpinner: !0,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, ie = null, zn = null, ue = null, we = null, tn = !1, ht = 0;
function ho(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function mo(t) {
  return (-1 + t) * 100;
}
function hi() {
  if (tn) return;
  tn = !0;
  let t = document.createElement("style");
  t.id = "livue-progress-styles", t.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${Q.height};
            background: ${Q.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${Q.speed}ms ${Q.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${Q.color}, 0 0 5px ${Q.color};
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
            border-top-color: ${Q.color};
            border-left-color: ${Q.color};
            border-radius: 50%;
            animation: livue-spinner 400ms linear infinite;
        }
        .livue-progress-bar.livue-progress-hidden,
        .livue-progress-spinner.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${Q.speed}ms ${Q.easing};
        }
        @keyframes livue-spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, document.head.appendChild(t);
}
function vo() {
  if (ue) return;
  hi(), ue = document.createElement("div"), ue.className = "livue-progress-bar livue-progress-hidden", ue.innerHTML = '<div class="livue-progress-peg"></div>', Q.showSpinner && (we = document.createElement("div"), we.className = "livue-progress-spinner livue-progress-hidden", we.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(Q.parent) || document.body;
  t.appendChild(ue), we && t.appendChild(we);
}
function go() {
  if (!tn) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), tn = !1, hi());
}
function yo(t) {
  Object.assign(Q, t), go();
}
function bo() {
  ht++, ie === null && (vo(), ie = 0, ue && ue.classList.remove("livue-progress-hidden"), we && we.classList.remove("livue-progress-hidden"), mn(Q.minimum), Q.trickle && (zn = setInterval(function() {
    mi();
  }, Q.trickleSpeed)));
}
function mn(t) {
  ie !== null && (t = ho(t, Q.minimum, 1), ie = t, ue && (ue.style.transform = "translate3d(" + mo(t) + "%, 0, 0)"));
}
function mi() {
  if (ie === null || ie >= 1) return;
  let t;
  ie < 0.2 ? t = 0.1 : ie < 0.5 ? t = 0.04 : ie < 0.8 ? t = 0.02 : ie < 0.99 ? t = 5e-3 : t = 0, mn(ie + t);
}
function vi() {
  ht = Math.max(0, ht - 1), !(ht > 0) && ie !== null && (mn(1), clearInterval(zn), zn = null, setTimeout(function() {
    ue && ue.classList.add("livue-progress-hidden"), we && we.classList.add("livue-progress-hidden"), setTimeout(function() {
      ie = null, ue && (ue.style.transform = "translate3d(-100%, 0, 0)");
    }, Q.speed);
  }, Q.speed));
}
function wo() {
  ht = 0, vi();
}
function Eo() {
  return ie !== null;
}
function So() {
  return ie;
}
const Me = {
  configure: yo,
  start: bo,
  set: mn,
  trickle: mi,
  done: vi,
  forceDone: wo,
  isStarted: Eo,
  getStatus: So
};
var ut = null, wr = !1, Ge = !1, de = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ee = /* @__PURE__ */ new Map(), qe = /* @__PURE__ */ new Map(), Fn = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new Map(), ke = null;
function _o(t) {
  Object.assign(de, t), t.progressBarColor && Me.configure({ color: t.progressBarColor });
}
function Ao(t) {
  ut = t, !wr && (wr = !0, ke = gi(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: ke },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (yi(ke), ke = e.state.pageKey, Dt(e.state.url, !1, !0));
  }), To());
}
function gi() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function yi(t) {
  if (!(!de.restoreScroll || !t)) {
    Bt.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Bt.get(t) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Bt.set(t, i);
      }
    });
  }
}
function Do(t) {
  if (!(!de.restoreScroll || !t)) {
    var e = Bt.get(t);
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
function To() {
  document.addEventListener("click", Co, !0), de.prefetch && (document.addEventListener("mouseenter", ko, !0), document.addEventListener("mouseleave", xo, !0), document.addEventListener("mousedown", No, !0), document.addEventListener("focus", Io, !0));
}
function Co(t) {
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
        n.startsWith("#") || n.startsWith("javascript:") || e.hasAttribute("download") || e.getAttribute("target") !== "_blank" && (t.preventDefault(), t.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), Dt(n, !0, !1));
      }
    }
  }
}
function Lo(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function ko(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !de.prefetchOnHover)) {
      var n = Lo(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            vn(r);
          }, de.hoverDelay);
          Fn.set(e, i);
        }
      }
    }
  }
}
function xo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Fn.get(e);
      n && (clearTimeout(n), Fn.delete(e));
    }
  }
}
function No(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || vn(n);
    }
  }
}
function Io(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !de.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || vn(n);
    }
  }
}
function vn(t) {
  var e = new URL(t, location.origin).href;
  if (qe.has(e))
    return qe.get(e);
  if (Ee.has(e))
    return Promise.resolve(Ee.get(e).html);
  var n = fetch(e, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return qe.delete(e), r.ok ? r.text().then(function(i) {
      return de.cachePages && bi(e, i), i;
    }) : null;
  }).catch(function(r) {
    return qe.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return qe.set(e, n), n;
}
function bi(t, e) {
  for (var n = new DOMParser(), r = n.parseFromString(e, "text/html"), i = r.querySelector("title"); Ee.size >= de.maxCacheSize; ) {
    var o = Ee.keys().next().value;
    Ee.delete(o);
  }
  Ee.set(t, {
    html: e,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function Oo() {
  Ee.clear();
}
function or(t) {
  Ge || !t || !t.url || (t.navigate ? Dt(t.url, !0, !1) : (Ge = !0, window.location.href = t.url));
}
async function Dt(t, e, n) {
  if (!Ge) {
    if (!ut) {
      window.location.href = t;
      return;
    }
    var r = new URL(t, location.origin).href, i = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: Ee.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(i)) {
      Ge = !0, n || yi(ke), de.showProgressBar && Me.start();
      try {
        var o, a = Ee.get(r);
        if (a)
          o = a.html;
        else if (qe.has(r))
          o = await qe.get(r);
        else {
          var s = await fetch(r, {
            method: "GET",
            headers: {
              Accept: "text/html",
              "X-LiVue-Navigate": "1"
            },
            credentials: "same-origin"
          });
          if (!s.ok)
            throw new Error("HTTP " + s.status);
          o = await s.text(), de.cachePages && bi(r, o);
        }
        var l = new DOMParser(), u = l.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(b) {
              typeof b == "function" && b(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = Mo(), p = /* @__PURE__ */ new Set();
        c.forEach(function(b) {
          b.livueIds.forEach(function(k) {
            p.add(k);
          });
        }), ut._stopObserver(), ut.destroyExcept(p), c.forEach(function(b) {
          b.element.parentNode && b.element.parentNode.removeChild(b.element);
        });
        var m = u.querySelector("title");
        m && (document.title = m.textContent), document.body.innerHTML = u.body.innerHTML, Po(c);
        var h = u.querySelector('meta[name="csrf-token"]'), y = document.querySelector('meta[name="csrf-token"]');
        if (h && y && (y.setAttribute("content", h.getAttribute("content")), po()), Ro(u), Vo(u), e && (ke = gi(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: ke },
          "",
          r
        )), Ho(u), ut.rebootPreserving(), n)
          Do(ke);
        else if (location.hash) {
          var S = document.querySelector(location.hash);
          S ? S.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (b) {
        console.error("[LiVue] Navigation failed:", b), window.location.href = t;
      } finally {
        Ge = !1, de.showProgressBar && Me.done();
      }
    }
  }
}
function Mo() {
  var t = /* @__PURE__ */ new Map(), e = document.querySelectorAll("[data-livue-persist]");
  return e.forEach(function(n) {
    var r = n.dataset.livuePersist;
    if (r) {
      var i = [], o = n.querySelectorAll("[data-livue-id]");
      o.forEach(function(l) {
        i.push(l.dataset.livueId);
      }), n.dataset.livueId && i.push(n.dataset.livueId);
      var a = {}, s = n.querySelectorAll("[data-livue-scroll]");
      s.forEach(function(l) {
        var u = l.dataset.livueScroll;
        u && (a[u] = {
          scrollTop: l.scrollTop,
          scrollLeft: l.scrollLeft
        });
      }), t.set(r, {
        element: n,
        livueIds: i,
        scrollData: a
      });
    }
  }), t;
}
function Po(t) {
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
function Ro(t) {
  var e = document.querySelectorAll("[data-livue-head]");
  e.forEach(function(r) {
    r.remove();
  });
  var n = t.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Vo(t) {
  var e = document.querySelectorAll("script[data-navigate-track]"), n = t.querySelectorAll("script[data-navigate-track]"), r = {};
  e.forEach(function(o) {
    var a = o.getAttribute("src");
    a && (r[a.split("?")[0]] = a);
  });
  var i = !1;
  n.forEach(function(o) {
    var a = o.getAttribute("src");
    if (a) {
      var s = a.split("?")[0];
      r[s] && r[s] !== a && (i = !0);
    }
  }), i && window.location.reload();
}
function Ho(t) {
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
function jo() {
  return Ge;
}
var Je = /* @__PURE__ */ new Map(), qo = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Er(t, e) {
  return typeof t != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", t), function() {
  }) : typeof e != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (Je.has(t) || Je.set(t, /* @__PURE__ */ new Set()), Je.get(t).add(e), function() {
    var n = Je.get(t);
    n && (n.delete(e), n.size === 0 && Je.delete(t));
  });
}
function fe(t, e) {
  var n = Je.get(t);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(e);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + t + '" callback:', i);
    }
  });
}
function wi() {
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
function Sr() {
  return qo.slice();
}
var Wn = [], Bn = [], _t = !1;
function zo(t) {
  return t.isolate ? Wo(t) : new Promise(function(e, n) {
    Wn.push({
      payload: t,
      resolve: e,
      reject: n
    }), _t || (_t = !0, queueMicrotask(Ei));
  });
}
function Fo(t) {
  return new Promise(function(e, n) {
    Bn.push({
      payload: t,
      resolve: e,
      reject: n
    }), _t || (_t = !0, queueMicrotask(Ei));
  });
}
async function Ei() {
  var t = Wn, e = Bn;
  if (Wn = [], Bn = [], _t = !1, !(t.length === 0 && e.length === 0)) {
    Me.start();
    var n = Si(), r = tt(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = t.map(function(S) {
      return S.payload;
    }), a = e.map(function(S) {
      return S.payload;
    }), s = {};
    o.length > 0 && (s.updates = o), a.length > 0 && (s.lazyLoads = a), fe("request.started", {
      url: n,
      updates: o,
      lazyLoads: a,
      updateCount: t.length,
      lazyCount: e.length
    });
    try {
      var l = await fetch(n, {
        method: "POST",
        headers: i,
        body: JSON.stringify(s),
        credentials: "same-origin"
      }), u = await l.json();
      if (!l.ok) {
        var d = new Error(u.error || "Request failed");
        d.status = l.status, d.data = u;
        for (var c = 0; c < t.length; c++)
          t[c].reject(d);
        for (var c = 0; c < e.length; c++)
          e[c].reject(d);
        return;
      }
      for (var p = u.responses || [], m = u.lazyResponses || [], c = 0; c < p.length; c++)
        if (p[c] && p[c].redirect) {
          or(p[c].redirect);
          return;
        }
      for (var c = 0; c < t.length; c++) {
        var h = p[c];
        if (!h) {
          t[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (h.error) {
          var y = new Error(h.error);
          y.status = h.status || 500, y.data = h, t[c].reject(y);
        } else if (h.errors) {
          var y = new Error("Validation failed");
          y.status = 422, y.data = h, t[c].reject(y);
        } else
          t[c].resolve(h);
      }
      for (var c = 0; c < e.length; c++) {
        var h = m[c];
        if (!h) {
          e[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (h.error) {
          var y = new Error(h.error);
          y.status = h.status || 500, y.data = h, e[c].reject(y);
        } else
          e[c].resolve(h);
      }
      fe("request.finished", {
        url: n,
        success: !0,
        responses: p,
        lazyResponses: m,
        updateCount: t.length,
        lazyCount: e.length
      });
    } catch (S) {
      for (var c = 0; c < t.length; c++)
        t[c].reject(S);
      for (var c = 0; c < e.length; c++)
        e[c].reject(S);
      fe("request.finished", {
        url: n,
        success: !1,
        error: S,
        updateCount: t.length,
        lazyCount: e.length
      });
    } finally {
      Me.done();
    }
  }
}
async function Wo(t) {
  Me.start();
  var e = Si(), n = tt(), r = {
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
      var s = new Error(a.error || "Request failed");
      throw s.status = o.status, s.data = a, s;
    }
    var l = (a.responses || [])[0];
    if (!l)
      throw new Error("No response for isolated component update");
    if (l.redirect)
      return or(l.redirect), new Promise(function() {
      });
    if (l.error) {
      var u = new Error(l.error);
      throw u.status = l.status || 500, u.data = l, u;
    }
    if (l.errors) {
      var u = new Error("Validation failed");
      throw u.status = 422, u.data = l, u;
    }
    return l;
  } finally {
    Me.done();
  }
}
function Si() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function wn(t, e, n, r, i) {
  return zo({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
function _i(t, e) {
  if (Array.isArray(e)) {
    let n = Object.keys(e), r = !1;
    for (let i = 0; i < n.length; i++)
      if (isNaN(Number(n[i]))) {
        r = !0;
        break;
      }
    if (r) {
      let i = {};
      for (let o = 0; o < n.length; o++)
        i[n[o]] = e[n[o]];
      return i;
    }
  }
  return e;
}
function _r(t) {
  return JSON.stringify(t, _i);
}
function $n(t) {
  return Ne(Object.assign({}, t));
}
function Bo(t, e) {
  let n;
  for (n in e) {
    let r = _r(t[n]), i = _r(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function Ai(t) {
  return JSON.parse(JSON.stringify(t, _i));
}
function $o(t) {
  return Qi(t);
}
function En(t, e) {
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
function Nt(t, e, n) {
  if (!e || typeof e != "string")
    return;
  let r = e.split(".");
  if (r.length === 1) {
    t[r[0]] = n;
    return;
  }
  let i = r[0], o = t[i], a = JSON.parse(JSON.stringify(o ?? {}));
  Array.isArray(a) && isNaN(Number(r[1])) && (a = Object.assign({}, a));
  let s = a;
  for (let u = 1; u < r.length - 1; u++) {
    let d = r[u];
    (s[d] === null || s[d] === void 0) && (s[d] = {}), Array.isArray(s[d]) && u + 1 < r.length && isNaN(Number(r[u + 1])) && (s[d] = Object.assign({}, s[d])), s = s[d];
  }
  let l = r[r.length - 1];
  s[l] = n, t[i] = a;
}
let Un = null, Di = /* @__PURE__ */ new Map();
function Uo() {
  return Ne({});
}
function he(t, e) {
  Jn(t);
  for (let n in e)
    t[n] = e[n];
}
function Jn(t) {
  for (let e in t)
    delete t[e];
}
function Jo(t) {
  Un = t;
}
function We(t, e, n, r) {
  r = r || {};
  let i = !1;
  return fe("error.occurred", {
    error: t,
    componentName: e,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : (Un ? Un(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function Xo(t, e) {
  typeof e == "function" && Di.set(t, e);
}
function Xn(t) {
  Di.delete(t);
}
var Ti = [];
function L(t, e, n) {
  Ti.push({
    name: t,
    directive: e
  });
}
function Yo() {
  return Ti;
}
const Ie = /* @__PURE__ */ new Map(), Pe = /* @__PURE__ */ new Map();
let Ar = !1;
function nt() {
  return typeof window < "u" && window.Echo;
}
function Ko(t, e) {
  if (!nt())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = e + ":" + t;
  if (Ie.has(n))
    return Ie.get(n);
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
  return Ie.set(n, r), r;
}
function Ci(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!nt())
    return Ar || (Ar = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: s, event: l, method: u, isPresenceEvent: d, isCustomEvent: c } = o, p = Ko(a, s);
    if (!p) continue;
    const m = s + ":" + a + ":" + l + ":" + t;
    if (Pe.has(m)) {
      r.push(m);
      continue;
    }
    const h = function(y) {
      try {
        n(u, y);
      } catch (S) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', S);
      }
    };
    if (s === "presence" && d)
      Go(p, l, h);
    else {
      const y = c ? "." + l : l;
      p.listen(y, h);
    }
    Pe.set(m, {
      channel: p,
      channelKey: s + ":" + a,
      event: l,
      handler: h,
      isPresenceEvent: d,
      isCustomEvent: c
    }), r.push(m);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      Li(r[i]);
  };
}
function Go(t, e, n) {
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
function Li(t) {
  const e = Pe.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    Pe.delete(t), Zo(e.channelKey);
  }
}
function Dr(t) {
  const e = ":" + t, n = [];
  Pe.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    Li(n[r]);
}
function Zo(t) {
  let e = !1;
  if (Pe.forEach(function(r) {
    r.channelKey === t && (e = !0);
  }), e) return;
  if (Ie.get(t) && nt()) {
    const r = t.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Ie.delete(t);
}
function Tr() {
  Pe.clear(), Ie.forEach(function(t, e) {
    if (nt()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Ie.clear();
}
function Qo() {
  return {
    echoAvailable: nt(),
    channels: Array.from(Ie.keys()),
    subscriptions: Array.from(Pe.keys())
  };
}
function ea() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Ce = /* @__PURE__ */ new Map();
function nn(t, e, n, r) {
  Ce.has(t) || Ce.set(t, /* @__PURE__ */ new Set());
  var i = {
    componentName: e,
    componentId: n,
    handler: r
  };
  return Ce.get(t).add(i), function() {
    var o = Ce.get(t);
    o && (o.delete(i), o.size === 0 && Ce.delete(t));
  };
}
function $t(t, e, n, r, i, o) {
  var a = Ce.get(t);
  a && a.forEach(function(s) {
    var l = !1;
    if (n === "broadcast" ? l = !0 : n === "self" ? l = s.componentId === i : n === "to" && (l = s.componentName === o), l)
      try {
        s.handler(e);
      } catch (u) {
        console.error('[LiVue] Event handler error for "' + t + '":', u);
      }
  });
}
function Cr(t) {
  Ce.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Ce.delete(n);
  });
}
function ta(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    $t(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function na(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, s = e[i], l = !1;
    o.except !== null && o.except !== void 0 && String(s) === String(o.except) && (l = !0), !o.keep && !l && (s === "" || s === null || s === void 0) && (l = !0), l ? n.searchParams.delete(a) : n.searchParams.set(a, s), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function ar() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function ra(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var s = new FormData();
    s.append("file", t), s.append("component", e), s.append("property", n), s.append("checksum", r);
    var l = new XMLHttpRequest(), u = ar();
    l.open("POST", u, !0);
    var d = tt();
    d && l.setRequestHeader("X-CSRF-TOKEN", d), l.setRequestHeader("Accept", "application/json"), i && l.upload && l.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var p = Math.round(c.loaded / c.total * 100);
        i(p);
      }
    }), l.onload = function() {
      var c;
      try {
        c = JSON.parse(l.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (l.status >= 200 && l.status < 300)
        o(c);
      else {
        var p = new Error(c.error || c.message || "Upload failed");
        p.status = l.status, p.data = c, a(p);
      }
    }, l.onerror = function() {
      a(new Error("Network error during upload"));
    }, l.send(s);
  });
}
function Sn(t) {
  if (!t || t.length === 0) return Promise.resolve();
  var e = ar() + "-remove", n = tt();
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
function ia(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var s = Array.from(t), l = new FormData();
    s.forEach(function(p) {
      l.append("files[]", p);
    }), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var u = new XMLHttpRequest(), d = ar();
    u.open("POST", d, !0);
    var c = tt();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(p) {
      if (p.lengthComputable) {
        var m = Math.round(p.loaded / p.total * 100);
        i({ overall: m });
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
        var m = new Error(p.error || p.message || "Upload failed");
        m.status = u.status, m.data = p, a(m);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(l);
  });
}
const oa = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var Lr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Lr || (Lr = {}));
function aa() {
  const t = eo(!0), e = t.run(() => en({}));
  let n = [], r = [];
  const i = to({
    install(o) {
      i._a = o, o.provide(oa, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
function rn(t, e) {
  let n = t.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), t;
  n[1];
  let r = n.index + n[0].length;
  return t.slice(0, r) + " " + e + t.slice(r);
}
let _n = 0;
function la(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
function sa(t) {
  return no({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = en(!1), i = rr(null), o = null, a = en(null);
      async function s() {
        if (!r.value)
          try {
            let u = await Fo({
              component: e.config.name,
              props: e.config.props || {}
            });
            u.html && u.snapshot && l(u);
          } catch (u) {
            console.error("[LiVue] Lazy load failed:", u);
          }
      }
      function l(u) {
        let d = JSON.parse(u.snapshot);
        _n++;
        let c = "lazy-" + _n + "-" + Date.now(), p = d.memo ? d.memo.name : "", m = la(d.state || {}), h = d.memo || {}, { createLivueHelper: y, buildComponentDef: S, processTemplate: b, createReactiveState: k } = t._lazyHelpers, T = k(m), O = JSON.parse(JSON.stringify(m)), C = { _updateTemplate: null }, x = y(
          c,
          T,
          h,
          C,
          O,
          u.snapshot
        );
        h.errors && he(x.errors, h.errors);
        let P = "livue-lazy-child-" + _n, F = b(u.html, t), D = rn(
          F.template,
          'data-livue-id="' + c + '"'
        ), z = S(D, T, x, t._versions, p);
        t._childRegistry[c] = {
          tagName: P,
          state: T,
          memo: h,
          livue: x,
          componentRef: C,
          name: p,
          id: c
        }, C._updateTemplate = function(Y) {
          let K = b(Y, t), ne = rn(
            K.template,
            'data-livue-id="' + c + '"'
          );
          for (let g in K.childDefs)
            t.vueApp._context.components[g] || t.vueApp.component(g, K.childDefs[g]);
          let f = S(ne, T, x, t._versions, p);
          t.vueApp._context.components[P] = f, t._versions[P] = (t._versions[P] || 0) + 1, i.value = f;
        };
        let w = h.listeners || null;
        if (w)
          for (let Y in w)
            (function(K, ne) {
              nn(Y, p, c, function(f) {
                ne.call(K, f);
              });
            })(w[Y], x);
        for (let Y in F.childDefs)
          t.vueApp._context.components[Y] || t.vueApp.component(Y, F.childDefs[Y]);
        t._versions[P] = 0, t.vueApp._context.components[P] || t.vueApp.component(P, z), i.value = z, r.value = !0;
      }
      return di(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          s();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, s());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), pi(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? br(i.value) : br("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
let mt = /* @__PURE__ */ new Map(), vt = /* @__PURE__ */ new Map();
function Qe(t, e) {
  let n = t + ":debounce:" + e;
  if (!mt.has(n)) {
    let r = null, i = null, o = null, a = null, s = function(l) {
      return i = l, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let c = i, p = o, m = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(p).catch(m);
        }, e);
      });
    };
    mt.set(n, s);
  }
  return mt.get(n);
}
function At(t, e) {
  let n = t + ":throttle:" + e;
  if (!vt.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < e ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    vt.set(n, i);
  }
  return vt.get(n);
}
function kr(t) {
  let e = t + ":";
  for (let n of mt.keys())
    n.startsWith(e) && mt.delete(n);
  for (let n of vt.keys())
    n.startsWith(e) && vt.delete(n);
}
const on = "livue-tab-sync";
let lr = Date.now() + "-" + Math.random().toString(36).substr(2, 9), an = null, sr = /* @__PURE__ */ new Map(), xr = !1;
function ki() {
  xr || (xr = !0, typeof BroadcastChannel < "u" ? (an = new BroadcastChannel(on), an.onmessage = ua) : window.addEventListener("storage", ca));
}
function ua(t) {
  let e = t.data;
  e.tabId !== lr && xi(e);
}
function ca(t) {
  if (t.key === on && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === lr) return;
      xi(e);
    } catch {
    }
}
function xi(t) {
  let e = sr.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function fa(t, e) {
  ki(), sr.set(t, e);
}
function Nr(t) {
  sr.delete(t);
}
function da(t, e, n, r) {
  ki();
  let i = {
    tabId: lr,
    component: t,
    state: e,
    properties: n,
    config: r
  };
  if (an)
    an.postMessage(i);
  else
    try {
      localStorage.setItem(on, JSON.stringify(i)), localStorage.removeItem(on);
    } catch {
    }
}
function pa(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
let Ir = 0;
function Yn() {
  return typeof document < "u" && "startViewTransition" in document;
}
const An = /* @__PURE__ */ new WeakMap();
function Or() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const ha = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (Ir++, r = "livue-transition-" + Ir), An.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), Yn() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    Or();
  },
  updated(t, e) {
    let n = An.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), Yn() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    An.delete(t), t.removeAttribute("data-livue-transition"), Or();
  }
};
function ma(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const ur = /* @__PURE__ */ new Map();
async function va(t, e = {}) {
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
        "X-CSRF-TOKEN": tt(),
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
    const a = o.body.getReader(), s = new TextDecoder();
    let l = "", u = null;
    for (; ; ) {
      const { done: d, value: c } = await a.read();
      if (d)
        break;
      l += s.decode(c, { stream: !0 });
      const p = l.split(`
`);
      l = p.pop() || "";
      for (const m of p)
        if (m.trim())
          try {
            const h = JSON.parse(m);
            if (h.stream)
              ga(h.stream), n(h.stream);
            else {
              if (h.error)
                throw new Error(h.error);
              h.snapshot && (u = h);
            }
          } catch (h) {
            console.error("[LiVue Stream] Parse error:", h, m);
          }
    }
    if (l.trim())
      try {
        const d = JSON.parse(l);
        if (d.snapshot)
          u = d;
        else if (d.error)
          throw new Error(d.error);
      } catch (d) {
        console.error("[LiVue Stream] Final parse error:", d, l);
      }
    return r(u), u;
  } catch (o) {
    throw i(o), o;
  }
}
function ga(t) {
  const { to: e, content: n, replace: r } = t, i = ur.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Mr(t, e, n = !1) {
  ur.set(t, { el: e, replace: n });
}
function Pr(t) {
  ur.delete(t);
}
function ya(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function cr(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    ya(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = cr(r) : e[n] = r;
  }
  return e;
}
function ba(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let s = n[a] || {}, l = r[a] || {}, u = cr(s), d = {};
    for (let c in l)
      d[c] = /* @__PURE__ */ (function(p, m) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return e(p + "." + m, h);
        };
      })(a, c);
    i[a] = Ne(Object.assign({}, u, d));
  }
  return i;
}
function wa(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = cr(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function Ea(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
function Sa(t) {
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
function _a(t, e) {
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
let Rr = 0, Ni = /* @__PURE__ */ new Map();
function Aa(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function Da(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Ii(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Ni.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: Aa(n)
    });
  });
}
function Oi(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Ni.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Da(n, i.inputs));
  });
}
function It(t, e) {
  let n = {}, r = Ai(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function Ta(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function Kn(t) {
  if (Ta(t))
    return t[0];
  if (Array.isArray(t))
    return t.map(Kn);
  if (t && typeof t == "object") {
    let e = {};
    for (let n in t)
      e[n] = Kn(t[n]);
    return e;
  }
  return t;
}
function ln(t) {
  let e = {};
  for (let n in t)
    e[n] = Kn(t[n]);
  return e;
}
let Mi = {
  ref: en,
  computed: uo,
  watch: Oe,
  watchEffect: so,
  reactive: Ne,
  readonly: lo,
  onMounted: di,
  onUnmounted: pi,
  onBeforeMount: ao,
  onBeforeUnmount: oo,
  nextTick: ir,
  provide: io,
  inject: ro
}, Pi = Object.keys(Mi), Ca = Pi.map(function(t) {
  return Mi[t];
});
function Vr(t) {
  let e = /<script\s+type="application\/livue-setup"[^>]*>([\s\S]*?)<\/script>/g, n = Array.from(t.matchAll(e));
  if (n.length === 0)
    return { html: t, setupCode: null };
  function r(l) {
    return l = l.replace(/^<script[^>]*>\s*/i, ""), l = l.replace(/\s*<\/script>$/i, ""), l.trim();
  }
  let i = t;
  for (var o = n.length - 1; o >= 0; o--)
    i = i.replace(n[o][0], "");
  if (n.length === 1)
    return {
      html: i,
      setupCode: r(n[0][1].trim())
    };
  var a = n.map(function(l) {
    return r(l[1].trim());
  }), s = `var __setupResult = {};
` + a.map(function(l) {
    return `Object.assign(__setupResult, (function() {
` + l + `
})() || {});`;
  }).join(`
`) + `
return __setupResult;`;
  return {
    html: i,
    setupCode: s
  };
}
function La(t, e, n) {
  let r = Object.keys(e), i = r.map(function(s) {
    return e[s];
  }), o = Pi.concat(r).concat(["livue"]), a = Ca.concat(i).concat([n]);
  try {
    let l = new (Function.prototype.bind.apply(
      Function,
      [null].concat(o).concat([t])
    ))().apply(null, a);
    return l && typeof l == "object" ? l : null;
  } catch (s) {
    return console.error("[LiVue] Error executing @script setup code:", s), null;
  }
}
function Hr(t) {
  let e = /v-model\.debounce(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
  t = t.replace(e, function(o, a, s, l) {
    let u = a ? "." + a + (s || "ms") : "";
    return 'v-model="' + l + '" v-debounce:' + l + u;
  });
  let n = /v-model\.throttle(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
  t = t.replace(n, function(o, a, s, l) {
    let u = a ? "." + a + (s || "ms") : "";
    return 'v-model="' + l + '" v-throttle:' + l + u;
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
function Ri(t) {
  if (!(!t || typeof t != "object") && (t.dynamicChildren = null, Array.isArray(t.children)))
    for (let e = 0; e < t.children.length; e++)
      Ri(t.children[e]);
}
function Gn(t, e, n, r, i, o) {
  let a = Hr(t), s = Vr(a), l = bn.compile(s.html), u = rr(l), d = [];
  function c(m, h) {
    let y = u.value, S = y(m, d);
    return Ri(S), S;
  }
  c._rc = !0;
  let p = {
    name: o || "LiVueComponent",
    render: c,
    setup: function() {
      bn.provide("livue", n);
      let m = $o(e), h = Object.assign({}, m, r, { livue: n, livueV: i });
      if (s.setupCode) {
        let k = La(s.setupCode, m, n);
        k && Object.assign(h, k);
      }
      var y = {
        // JS internals
        then: 1,
        toJSON: 1,
        valueOf: 1,
        toString: 1,
        constructor: 1,
        __proto__: 1,
        // Vue-allowed JS globals (avoids "should not start with _" warning in runtime-compiled templates)
        Infinity: 1,
        undefined: 1,
        NaN: 1,
        isFinite: 1,
        isNaN: 1,
        parseFloat: 1,
        parseInt: 1,
        decodeURI: 1,
        decodeURIComponent: 1,
        encodeURI: 1,
        encodeURIComponent: 1,
        Math: 1,
        Number: 1,
        Date: 1,
        Array: 1,
        Object: 1,
        Boolean: 1,
        String: 1,
        RegExp: 1,
        Map: 1,
        Set: 1,
        JSON: 1,
        Intl: 1,
        BigInt: 1,
        console: 1,
        Error: 1
      }, S = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      function b(k) {
        return typeof k == "string" && !y[k] && S.test(k);
      }
      return new Proxy(h, {
        get: function(k, T, O) {
          if (T in k || typeof T == "symbol") return Reflect.get(k, T, O);
          if (b(T))
            return function() {
              return n.call(T, ...arguments);
            };
        },
        getOwnPropertyDescriptor: function(k, T) {
          var O = Object.getOwnPropertyDescriptor(k, T);
          if (O) return O;
          if (b(T))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(k, T) {
          return !!(T in k || b(T));
        },
        set: function(k, T, O) {
          return k[T] = O, !0;
        },
        ownKeys: function(k) {
          return Reflect.ownKeys(k);
        }
      });
    }
  };
  return p._updateRender = function(m) {
    let h = Hr(m), y = Vr(h), S = bn.compile(y.html);
    S !== u.value && (d.length = 0, u.value = S);
  }, p;
}
function ka(t, e) {
  for (var n in e) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = t.indexOf(r), a = t.indexOf(i);
    o !== -1 && a !== -1 && (t = t.substring(0, o) + e[n] + t.substring(a + i.length));
  }
  return t;
}
function Zn(t, e, n, r, i, o, a) {
  a = a || {};
  let s = Uo(), l = n.name, u = n.vueMethods || {}, d = n.jsonMethods || [], c = n.confirms || {}, p = n.isolate || !1, m = n.urlParams || null, h = n.uploads || null, y = n.tabSync || null, S = !1, b = i, k = o, T = a.initialHtml || null;
  function O(f) {
    let g = document.querySelector('meta[name="livue-prefix"]'), A = "/" + (g ? g.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), v = document.createElement("a");
    v.href = A, v.download = f.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function C() {
    let f = It(b, e);
    return {
      snapshot: k,
      diffs: f
    };
  }
  function x(f, g) {
    if (f.redirect) {
      or(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let v = f.errorBoundary;
      w.errorState.hasError = v.hasError, w.errorState.errorMessage = v.errorMessage, w.errorState.errorDetails = v.errorDetails, w.errorState.recover = v.recover, (!v.errorHandled || !v.recover) && fe("error.occurred", {
        error: new Error(v.errorMessage || "Component error"),
        componentName: l,
        componentId: t,
        context: { method: v.errorMethod, serverHandled: v.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && O(f.download), f.snapshot) {
      let v = JSON.parse(f.snapshot);
      if (v.state) {
        let j = ln(v.state);
        Bo(e, j), b = JSON.parse(JSON.stringify(j));
      }
      k = f.snapshot, v.memo && (v.memo.errors ? he(w.errors, v.memo.errors) : Jn(w.errors), v.memo.vueMethods && (u = v.memo.vueMethods), v.memo.jsonMethods && (d = v.memo.jsonMethods), v.memo.urlParams && (m = v.memo.urlParams), v.memo.uploads && (h = v.memo.uploads), v.memo.confirms && (c = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && wa(D, v.memo));
    }
    if (m && na(m, e), (f.html || f.fragments) && r && r._updateTemplate) {
      let v = {};
      if (f.snapshot) {
        let j = JSON.parse(f.snapshot);
        j.memo && (j.memo.transitionType && (v.transitionType = j.memo.transitionType), j.memo.skipTransition && (v.skipTransition = !0));
      }
      if (f.fragments) {
        let j = T || (a.el ? a.el.innerHTML : null);
        if (j) {
          let q = ka(j, f.fragments);
          T = q, r._updateTemplate(q, v);
        }
      } else
        T = f.html, r._updateTemplate(f.html, v);
    }
    if (f.events && f.events.length > 0) {
      for (var _ = 0; _ < f.events.length; _++)
        f.events[_].sourceId = t;
      ta(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var A = 0; A < f.js.length; A++)
        try {
          new Function("state", "livue", f.js[A])(e, w);
        } catch (v) {
          console.error("[LiVue] Error executing ->vue() JS:", v);
        }
    if (f.benchmark && fe("benchmark.received", {
      componentId: t,
      componentName: l,
      timings: f.benchmark
    }), y && y.enabled && f.snapshot && !S && JSON.parse(f.snapshot).state) {
      let j = Ai(e), q = [];
      for (let $ in j)
        (!g || !($ in g)) && q.push($);
      if (q.length > 0) {
        let $ = pa(j, q, y);
        Object.keys($).length > 0 && da(l, $, q, y);
      }
    }
    if (S = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let P = Ne({}), F = {}, D = {}, z = function(f, g) {
    return w.call(f, g);
  };
  Ea(n) && (D = ba(n, z));
  let w = Ne({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: P,
    refs: {},
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let g = It(b, e);
      return f === void 0 ? Object.keys(g).length > 0 : f in g;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = It(b, e);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(b)) : b[f] !== void 0 ? JSON.parse(JSON.stringify(b[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in b && (e[f] = JSON.parse(JSON.stringify(b[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in b)
        f in e && (e[f] = JSON.parse(JSON.stringify(b[f])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(f) {
      return f ? P[f] || !1 : w.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let g = f ? P[f] || !1 : w.loading;
      return {
        "aria-busy": g,
        disabled: g
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
    call: async function(f, g, _) {
      let A, v = null;
      if (arguments.length === 1 ? A = [] : arguments.length === 2 ? Array.isArray(g) ? A = g : A = [g] : arguments.length >= 3 && (Array.isArray(g) && _ && typeof _ == "object" && (_.debounce || _.throttle) ? (A = g, v = _) : A = Array.prototype.slice.call(arguments, 1)), F[f])
        return F[f](w, A);
      if (u[f]) {
        try {
          new Function("state", "livue", u[f])(e, w);
        } catch ($) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', $);
        }
        return;
      }
      let j = d.includes(f), q = async function() {
        if (c[f] && !await w._showConfirm(c[f]))
          return;
        w.loading = !0, w.processing = f, P[f] = !0;
        let $;
        try {
          let W = C(), B = await wn(W.snapshot, f, A, W.diffs, p || j);
          $ = x(B, W.diffs);
        } catch (W) {
          if (j)
            throw { status: W.status, errors: W.data && W.data.errors, message: W.message };
          W.status === 422 && W.data && W.data.errors ? he(w.errors, W.data.errors) : We(W, l);
        } finally {
          w.loading = !1, w.processing = null, delete P[f];
        }
        return $;
      };
      return v && v.debounce ? Qe(t + ":" + f, v.debounce)(q) : v && v.throttle ? At(t + ":" + f, v.throttle)(q) : q();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, g) {
      let _ = Array.prototype.slice.call(arguments, 2), A = { message: g || "Are you sure?" };
      if (await w._showConfirm(A))
        return w.call.apply(w, [f].concat(_));
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
    set: function(f, g) {
      e[f] = g;
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      w.loading = !0, w.processing = "$sync";
      try {
        let f = C(), g = await wn(f.snapshot, null, [], f.diffs, p);
        x(g, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? he(w.errors, f.data.errors) : We(f, l);
      } finally {
        w.loading = !1, w.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      Jn(w.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, g) {
      $t(f, g, "broadcast", l, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, g, _) {
      $t(g, _, "to", l, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, g) {
      $t(f, g, "self", l, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      Dt(f, !0);
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
    upload: async function(f, g) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var _ = En(e, f);
      _ && _.__livue_upload && _.ref && Sn([_.ref]), w.uploading = !0, w.uploadProgress = 0;
      try {
        var A = await ra(g, l, f, h[f].token, function(v) {
          w.uploadProgress = v;
        });
        Nt(e, f, {
          __livue_upload: !0,
          ref: A.ref,
          originalName: A.originalName,
          mimeType: A.mimeType,
          size: A.size,
          previewUrl: A.previewUrl
        });
      } catch (v) {
        v.status === 422 && v.data && v.data.errors ? he(w.errors, v.data.errors) : We(v, l);
      } finally {
        w.uploading = !1, w.uploadProgress = 0;
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
    uploadMultiple: async function(f, g) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      w.uploading = !0, w.uploadProgress = 0;
      try {
        var _ = await ia(g, l, f, h[f].token, function(B) {
          w.uploadProgress = B.overall;
        }), A = _.results || [], v = _.errors || [], j = En(e, f), q = Array.isArray(j) ? j : [];
        if (A.length > 0) {
          var $ = A.map(function(B) {
            return {
              __livue_upload: !0,
              ref: B.ref,
              originalName: B.originalName,
              mimeType: B.mimeType,
              size: B.size,
              previewUrl: B.previewUrl
            };
          });
          Nt(e, f, q.concat($));
        }
        if (v.length > 0) {
          var W = {};
          v.forEach(function(B) {
            var yr = f + "." + B.index;
            W[yr] = {
              file: B.file,
              message: B.error
            };
          }), he(w.errors, W);
        }
      } catch (B) {
        B.status === 422 && B.data && B.data.errors ? he(w.errors, B.data.errors) : We(B, l);
      } finally {
        w.uploading = !1, w.uploadProgress = 0;
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
    removeUpload: function(f, g) {
      var _ = En(e, f);
      if (g !== void 0 && Array.isArray(_)) {
        var A = _[g];
        A && A.__livue_upload && A.ref && Sn([A.ref]), _.splice(g, 1), Nt(e, f, _.slice());
      } else
        _ && _.__livue_upload && _.ref && Sn([_.ref]), Nt(e, f, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(f, g) {
      g = g || [], w.loading = !0, w.streaming = !0, w.processing = f, w.streamingMethod = f, P[f] = !0;
      let _;
      try {
        let A = C();
        A.method = f, A.params = g, A.componentId = t;
        let v = await va(A, {
          onChunk: function(j) {
          },
          onComplete: function(j) {
          },
          onError: function(j) {
            console.error("[LiVue Stream] Error:", j);
          }
        });
        v && (_ = x(v, A.diffs));
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? he(w.errors, A.data.errors) : We(A, l);
      } finally {
        w.loading = !1, w.streaming = !1, w.processing = null, w.streamingMethod = null, delete P[f];
      }
      return _;
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
    watch: function(f, g) {
      return typeof g != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Oe(
        function() {
          return e[f];
        },
        function(_, A) {
          g(_, A);
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
      return l;
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
      }) : (Xo(t, f), function() {
        Xn(t);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: Ne({
      hasError: !1,
      errorMessage: null,
      errorDetails: null,
      recover: !0
    }),
    /**
     * Clear the error state (used for recovery).
     */
    clearError: function() {
      w.errorState.hasError = !1, w.errorState.errorMessage = null, w.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(f, g) {
      b = JSON.parse(JSON.stringify(f)), k = g;
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
      let f = It(b, e), g = {};
      for (let _ in D) {
        let A = D[_], v = {}, j = [];
        for (let q in A)
          if (typeof A[q] == "function")
            j.push(q);
          else
            try {
              v[q] = JSON.parse(JSON.stringify(A[q]));
            } catch {
              v[q] = "[Unserializable]";
            }
        g[_] = { data: v, actions: j };
      }
      return {
        serverState: JSON.parse(JSON.stringify(b)),
        clientState: JSON.parse(JSON.stringify(e)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: l,
          isolate: p,
          urlParams: m,
          tabSync: y,
          hasUploads: !!h,
          uploadProps: h ? Object.keys(h) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(c),
          composableNames: Object.keys(D)
        },
        composables: g,
        uploading: w.uploading,
        uploadProgress: w.uploadProgress,
        streaming: w.streaming,
        streamingMethod: w.streamingMethod,
        errorState: {
          hasError: w.errorState.hasError,
          errorMessage: w.errorState.errorMessage
        }
      };
    }
  });
  for (let f in D)
    w[f] = D[f];
  async function Y() {
    w.loading = !0, w.processing = "$refresh", P.$refresh = !0;
    try {
      let f = C(), g = await wn(f.snapshot, null, [], f.diffs, p);
      return x(g, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? he(w.errors, f.data.errors) : We(f, l);
    } finally {
      w.loading = !1, w.processing = null, delete P.$refresh;
    }
  }
  F.$refresh = function() {
    return Y();
  }, y && y.enabled && fa(l, function(f, g, _) {
    let A = !1;
    if (_.reactive === !0)
      A = !0;
    else if (Array.isArray(_.reactive) && _.reactive.length > 0) {
      for (let v in f)
        if (_.reactive.includes(v)) {
          A = !0;
          break;
        }
    }
    if (A) {
      for (let v in f)
        _.only && !_.only.includes(v) || _.except && _.except.includes(v) || v in e && (e[v] = f[v]);
      S = !0, w.sync();
      return;
    }
    for (let v in f)
      _.only && !_.only.includes(v) || _.except && _.except.includes(v) || v in e && (e[v] = f[v]);
    for (let v in f)
      _.only && !_.only.includes(v) || _.except && _.except.includes(v) || (b[v] = JSON.parse(JSON.stringify(f[v])));
  });
  var K = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(w, {
    get: function(f, g, _) {
      if (g in f || typeof g == "symbol")
        return Reflect.get(f, g, _);
      if (typeof g == "string" && g.startsWith("$") && F[g])
        return function() {
          var A = Array.prototype.slice.call(arguments);
          return F[g](w, A);
        };
      if (typeof g == "string" && !g.startsWith("$") && !K[g])
        return function() {
          var A = Array.prototype.slice.call(arguments);
          return w.call(g, ...A);
        };
    },
    set: function(f, g, _, A) {
      return Reflect.set(f, g, _, A);
    },
    has: function(f, g) {
      return typeof g == "string" && g.startsWith("$") && F[g] ? !0 : Reflect.has(f, g);
    }
  }), composables: D };
}
function Ut(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let l = 0; l < r.length; l++)
    r[l].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(l) {
    let u = l.dataset.livueId, d = l.dataset.livueSnapshot || "{}", c = JSON.parse(d), p = c.memo ? c.memo.name : "", m = ln(c.state || {}), h = c.memo || {}, y = l.innerHTML, S = l.tagName.toLowerCase(), b = e._childRegistry[u];
    if (!b)
      for (let D in e._childRegistry) {
        let z = e._childRegistry[D];
        if (z.name === p && !o[D]) {
          b = z;
          break;
        }
      }
    if (b) {
      o[b.id] = !0, b.rootTag = S;
      let D = h.reactive || [];
      if (D.length > 0) {
        for (var k = 0; k < D.length; k++) {
          var T = D[k];
          T in m && (b.state[T] = m[T]);
        }
        b.livue._updateServerState(m, d), b.componentRef && b.componentRef._updateTemplate && b.componentRef._updateTemplate(y);
      }
    }
    let O = !b;
    if (!b) {
      Rr++;
      let D = "livue-child-" + Rr;
      e._versions[D] = 0;
      let z = $n(m), w = JSON.parse(JSON.stringify(m)), Y = Object.assign({ name: h.name || p }, h), K = { _updateTemplate: null }, ne = wi(), f = Zn(u, z, Y, K, w, d, {
        el: l,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: ne
      }), g = f.livue, _ = f.composables;
      fe("component.init", {
        component: { id: u, name: p, state: z, livue: g },
        el: l,
        cleanup: ne.cleanup,
        isChild: !0
      });
      let A = h.errors || null;
      A && he(g.errors, A), b = {
        tagName: D,
        state: z,
        memo: Y,
        livue: g,
        composables: _,
        componentRef: K,
        name: p,
        id: u,
        rootTag: S
      };
      let v = h.listeners || null;
      if (v)
        for (let q in v)
          (function($, W) {
            nn(q, p, u, function(B) {
              W.call($, B);
            });
          })(v[q], g);
      let j = h.echo || null;
      j && j.length && (function(q, $) {
        Ci(q, j, function(W, B) {
          $.call(W, B);
        });
      })(u, g), K._updateTemplate = function(q) {
        let $ = e.el.querySelector('[data-livue-id="' + u + '"]');
        $ && Ii($);
        let W = Ut(q, e), B = rn(
          "<" + b.rootTag + ">" + W.template + "</" + b.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!e.vueApp) return;
        for (let Fe in W.childDefs)
          e.vueApp._context.components[Fe] || e.vueApp.component(Fe, W.childDefs[Fe]);
        e.vueApp._context.components[b.tagName]._updateRender(B), ir(function() {
          let Fe = e.el.querySelector('[data-livue-id="' + u + '"]');
          Fe && Oi(Fe);
        });
      }, e._childRegistry[u] = b;
    }
    let C = b.tagName, x = l.dataset.livueRef;
    x && e._rootLivue && (e._rootLivue.refs[x] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(D, z) {
        return b.livue.call(D, z || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(D, z) {
        return b.livue.set(D, z);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(D, z) {
        return b.livue.dispatch(D, z);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return b.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return b.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return b.livue;
      }
    });
    let P = l.dataset.livueModel;
    if (P && e._rootState && nn("$modelUpdate", b.name, u, function(D) {
      D && D.value !== void 0 && (e._rootState[P] = D.value);
    }), O) {
      let D = rn(
        "<" + S + ">" + y + "</" + S + ">",
        'data-livue-id="' + u + '"'
      );
      i[C] = Gn(
        D,
        b.state,
        b.livue,
        b.composables || {},
        e._versions,
        b.name
      );
    }
    e._versions[C] === void 0 && (e._versions[C] = 0);
    let F = document.createElement(C);
    F.setAttribute(":key", "livueV['" + C + "']"), l.parentNode.replaceChild(F, l);
  });
  let s = n.querySelectorAll("[data-livue-island]");
  for (let l = 0; l < s.length; l++)
    s[l].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
class xa {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = $n(ln(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Ne({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: Zn,
      buildComponentDef: Gn,
      processTemplate: Ut,
      createReactiveState: $n
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
      _updateTemplate: function(y, S) {
        S = S || {}, fe("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: y
        });
        var b = Sa(r.el);
        Ii(r.el);
        let k = Ut(y, r);
        if (!r.vueApp) return;
        for (let O in k.childDefs)
          r.vueApp._context.components[O] || r.vueApp.component(O, k.childDefs[O]);
        function T() {
          r._currentRootDef._updateRender(k.template), ir(function() {
            Oi(r.el), _a(r.el, b), fe("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (S.skipTransition) {
          T();
          return;
        }
        Yn() ? ma(T, { type: S.transitionType }) : T();
      }
    }, o = JSON.parse(JSON.stringify(ln(e.state || {})));
    this._cleanups = wi();
    let a = Zn(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups,
      initialHtml: this.el.innerHTML
    }), s = a.livue, l = a.composables;
    this._rootLivue = s, this._rootComposables = l, this._rootState = this.state, fe("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: s },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u = Ut(this.el.innerHTML, this), d = e.memo && e.memo.errors || null;
    d && he(s.errors, d);
    let c = e.memo && e.memo.listeners || null;
    if (c)
      for (let y in c)
        (function(S, b, k, T) {
          nn(y, k, T, function(O) {
            b.call(S, O);
          });
        })(c[y], s, r.name, r.componentId);
    let p = e.memo && e.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = Ci(r.componentId, p, function(y, S) {
      s.call(y, S);
    }));
    let m = Gn(u.template, r.state, s, l, r._versions, r.name);
    this._currentRootDef = m, this._rootDefRef = rr(m), this.vueApp = co({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", sa(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = aa();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Yo();
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
      fe("component.destroy", {
        component: { id: e, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Cr(e), kr(e), Xn(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Nr(n.name), Dr(e);
    }
    if (fe("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Cr(this.componentId), kr(this.componentId), Xn(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Nr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Dr(this.componentId), this.vueApp) {
      try {
        this.vueApp.unmount();
      } catch {
      }
      this.vueApp = null;
    }
  }
}
function ve(t) {
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
let jr = /* @__PURE__ */ new Set();
const Na = {
  mounted(t, e, n) {
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-init: livue helper not found in component context");
      return;
    }
    let i = t.closest("[data-livue-id]"), o = i ? i.dataset.livueId : null, a = e.value, s, l = [];
    if (Array.isArray(a) ? (s = a[0], l = a[1] || []) : s = a, typeof s != "string") {
      console.warn("[LiVue] v-init: expected method name (string), got", typeof s);
      return;
    }
    let u = (o || "unknown") + ":" + s;
    jr.has(u) || (jr.add(u), r.call(s, l));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Dn = /* @__PURE__ */ new WeakMap(), Ia = {
  mounted(t, e, n) {
    t.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + t.tagName.toLowerCase() + ">");
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-submit: livue helper not found in component context");
      return;
    }
    let i = e.value, o, a = [];
    if (Array.isArray(i) ? (o = i[0], a = i[1] || []) : o = i, typeof o != "string") {
      console.warn("[LiVue] v-submit: expected method name (string), got", typeof o);
      return;
    }
    let s = function(l) {
      l.preventDefault(), r.call(o, a);
    };
    t.addEventListener("submit", s), Dn.set(t, s);
  },
  unmounted(t) {
    let e = Dn.get(t);
    e && (t.removeEventListener("submit", e), Dn.delete(t));
  }
}, Ot = /* @__PURE__ */ new WeakMap(), Oa = {
  mounted(t, e, n) {
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-intersect: livue helper not found in component context");
      return;
    }
    let i = e.value, o, a = [];
    if (Array.isArray(i) ? (o = i[0], a = i[1] || []) : o = i, typeof o != "string") {
      console.warn("[LiVue] v-intersect: expected method name (string), got", typeof o);
      return;
    }
    let s = e.modifiers || {}, l = e.arg, u = 0;
    s.half && (u = 0.5), s.full && (u = 1);
    let d = "0px";
    if (l) {
      let h = parseInt(l, 10);
      isNaN(h) || (d = h + "px");
    }
    let c = s.leave === !0, p = !1, m = new IntersectionObserver(
      function(h) {
        let y = h[0];
        (c ? !y.isIntersecting : y.isIntersecting) && (!s.once || !p) && (p = !0, r.call(o, a), s.once && (m.disconnect(), Ot.delete(t)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    m.observe(t), Ot.set(t, m);
  },
  unmounted(t) {
    let e = Ot.get(t);
    e && (e.disconnect(), Ot.delete(t));
  }
}, Tn = /* @__PURE__ */ new WeakMap();
function Cn(t, e) {
  let n = t.getAttribute("href");
  if (!n)
    return;
  let r = e.value, i = e.modifiers || {}, o = window.location.pathname, a;
  try {
    a = new URL(n, window.location.origin).pathname;
  } catch {
    return;
  }
  let s = !1;
  if (i.strict)
    s = o === a;
  else if (i.exact) {
    let l = o.replace(/\/$/, "") || "/", u = a.replace(/\/$/, "") || "/";
    s = l === u;
  } else {
    let l = a.replace(/\/$/, "") || "/";
    l === "/" ? s = o === "/" : s = o === l || o.startsWith(l + "/");
  }
  if (typeof r == "string") {
    let l = r.split(" ").filter(function(u) {
      return u.trim();
    });
    s ? (l.forEach(function(u) {
      t.classList.add(u);
    }), t.setAttribute("data-current", "")) : (l.forEach(function(u) {
      t.classList.remove(u);
    }), t.removeAttribute("data-current"));
  }
}
const Ma = {
  mounted(t, e) {
    Cn(t, e);
    let n = function() {
      Cn(t, e);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), Tn.set(t, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(t, e) {
    Cn(t, e);
  },
  unmounted(t, e) {
    let n = e.value;
    typeof n == "string" && n.split(" ").filter(function(i) {
      return i.trim();
    }).forEach(function(i) {
      t.classList.remove(i);
    }), t.removeAttribute("data-current");
    let r = Tn.get(t);
    r && (r(), Tn.delete(t));
  }
};
let qr = 0;
const Pa = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    qr++;
    let n = "livue-ignore-" + qr;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, rt = /* @__PURE__ */ new WeakMap();
let zr = 0;
function Ra(t) {
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
function Va(t) {
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
    let s = a.match(/^debounce\.?(\d+)(ms)?$/i);
    if (s) {
      e = parseInt(s[1], 10);
      continue;
    }
    let l = a.match(/^throttle\.?(\d+)(ms)?$/i);
    if (l) {
      n = parseInt(l[1], 10);
      continue;
    }
    let u = a.match(/^(\d+)(ms)?$/);
    u && (o = parseInt(u[1], 10));
  }
  return r && o > 0 && (e = o), i && o > 0 && (n = o), r && e === 0 && (e = 150), i && n === 0 && (n = 150), { debounceMs: e, throttleMs: n };
}
function Mt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Fr(t, e) {
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
function Ha(t) {
  return !!t.component;
}
const ja = {
  mounted(t, e, n) {
    let r = Ra(n);
    if (!r) {
      console.warn("[LiVue] v-model-livue: livue helper not found in component context");
      return;
    }
    let { livue: i, state: o } = r, a = e.arg;
    if (!a) {
      console.warn("[LiVue] v-model-livue requires property name as argument (v-model-livue:propertyName)");
      return;
    }
    let s = e.modifiers || {};
    zr++;
    let l = "model-" + zr, u = "input";
    s.blur && (u = "blur"), (s.change || s.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = Va(s);
    s.live && !d && !c && (d = 150);
    function p(C) {
      if (s.number) {
        let x = Number(C);
        C = isNaN(x) ? 0 : x;
      }
      s.boolean && (C = !!C && C !== "false" && C !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = C : o[a] = C;
    }
    function m(C) {
      d > 0 ? Qe(l, d)(function() {
        p(C);
      }) : c > 0 ? At(l, c)(function() {
        p(C);
      }) : p(C);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let y = Ha(n), S = n.component, b = null, k = null, T = null, O = null;
    if (y && S)
      O = S.emit, S.emit = function(C, ...x) {
        if (C === "update:modelValue") {
          let P = x[0];
          m(P);
          return;
        }
        return O.call(S, C, ...x);
      }, S.props && "modelValue" in S.props && (T = Oe(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(C) {
          S.vnode && S.vnode.props && (S.vnode.props.modelValue = C), S.exposed && typeof S.exposed.setValue == "function" && S.exposed.setValue(C), S.update && S.update();
        },
        { immediate: !0 }
      )), rt.set(t, {
        isComponent: !0,
        componentInstance: S,
        originalEmit: O,
        stopWatcher: T,
        property: a,
        state: o,
        modifiers: s
      });
    else {
      if (d > 0) {
        let C = Qe(l, d);
        b = function(x) {
          let P = Mt(x.target);
          C(function() {
            p(P);
          });
        };
      } else if (c > 0) {
        let C = At(l, c);
        b = function(x) {
          let P = Mt(x.target);
          C(function() {
            p(P);
          });
        };
      } else
        b = function(C) {
          p(Mt(C.target));
        };
      s.enter ? (k = function(C) {
        C.key === "Enter" && p(Mt(C.target));
      }, t.addEventListener("keyup", k)) : t.addEventListener(u, b), Fr(t, h), rt.set(t, {
        isComponent: !1,
        handler: b,
        keyHandler: k,
        eventType: u,
        property: a,
        modifiers: s,
        state: o
      });
    }
  },
  updated(t, e, n) {
    let r = rt.get(t);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], Fr(t, a);
    }
  },
  unmounted(t) {
    let e = rt.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), rt.delete(t));
  }
}, Ln = /* @__PURE__ */ new WeakMap(), qa = 2500;
function za(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return qa;
}
const Fa = {
  mounted(t, e, n) {
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let s = e.modifiers || {}, l = za(s), u = s["keep-alive"] === !0, d = s.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      c.isPaused || d && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function m() {
      c.intervalId || (c.intervalId = setInterval(p, l));
    }
    function h() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(y) {
        c.isVisible = y[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", h), c.visibilityHandler = h, m(), Ln.set(t, c);
  },
  unmounted(t) {
    let e = Ln.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), Ln.delete(t));
  }
}, Pt = /* @__PURE__ */ new WeakMap();
let sn = typeof navigator < "u" ? navigator.onLine : !0, un = /* @__PURE__ */ new Set(), Wr = !1;
function Wa() {
  Wr || typeof window > "u" || (Wr = !0, window.addEventListener("online", function() {
    sn = !0, un.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    sn = !1, un.forEach(function(t) {
      t(!1);
    });
  }));
}
const Ba = {
  created(t, e) {
    Wa();
    let n = e.modifiers || {}, r = e.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = t.style.display || "", sn && (t.style.display = "none")), Pt.set(t, o);
  },
  mounted(t, e) {
    let n = Pt.get(t);
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
            o ? a.forEach(function(s) {
              t.classList.add(s);
            }) : a.forEach(function(s) {
              t.classList.remove(s);
            });
          }
          break;
        case "class-remove":
          if (n.value) {
            let a = n.value.trim().split(/\s+/);
            o ? a.forEach(function(s) {
              t.classList.remove(s);
            }) : a.forEach(function(s) {
              t.classList.add(s);
            });
          }
          break;
        case "attr":
          n.value && (o ? t.setAttribute(n.value, "") : t.removeAttribute(n.value));
          break;
      }
    }
    r(sn), n.updateFn = r, un.add(r);
  },
  unmounted(t) {
    let e = Pt.get(t);
    e && e.updateFn && un.delete(e.updateFn), Pt.delete(t);
  }
};
let Br = 0;
const it = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new Map(), $a = {
  created(t, e) {
    Br++;
    let n = "livue-replace-" + Br, r = e.modifiers.self === !0;
    it.set(t, {
      id: n,
      isSelf: r,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), r && t.setAttribute("data-livue-replace-self", ""), kn.set(n, 0);
  },
  mounted(t, e) {
    let n = it.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = it.get(t);
    n && (n.version++, kn.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = it.get(t);
    e && kn.delete(e.id), it.delete(t);
  }
}, ot = /* @__PURE__ */ new WeakMap(), $r = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Ua = 200;
function Ja(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys($r))
    if (t[e])
      return $r[e];
  return Ua;
}
function xn(t, e, n, r, i) {
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
const Xa = {
  created(t, e) {
    let n = t.style.display;
    ot.set(t, {
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
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = ot.get(t), o = e.modifiers || {}, a = Ja(o), s = e.value, l = null, u = null;
    o.class || o.attr ? u = s : typeof s == "string" && (l = s);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, xn(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, xn(t, i, o, u, !0)) : (i.isActive = !1, xn(t, i, o, u, !1));
    }
    i.stopWatch = Oe(
      function() {
        return l ? r.isLoading(l) : r.loading;
      },
      d,
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    ot.get(t);
  },
  unmounted(t) {
    let e = ot.get(t);
    e && (e.delayTimer && clearTimeout(e.delayTimer), e.stopWatch && e.stopWatch(), ot.delete(t));
  }
}, Rt = /* @__PURE__ */ new WeakMap(), Ya = {
  mounted(t, e, n) {
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = e.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = Oe(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? t.setAttribute("data-loading", "") : t.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    Rt.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = Rt.get(t), i = ve(n);
    if (!r || !i) return;
    let o = e.value, a = e.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Oe(
      function() {
        return i.isLoading(o);
      },
      function(s) {
        s ? t.setAttribute("data-loading", "") : t.removeAttribute("data-loading");
      },
      { immediate: !0 }
    ));
  },
  unmounted(t) {
    let e = Rt.get(t);
    e && (e.stopWatch && e.stopWatch(), Rt.delete(t));
  }
}, at = /* @__PURE__ */ new WeakMap(), Ka = {
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
    at.set(t, { targetId: n }), Mr(n, t, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(t, e) {
    const n = at.get(t), r = e.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      Pr(n.targetId);
      const i = e.modifiers.replace || !1;
      Mr(r, t, i), at.set(t, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = at.get(t);
    e && (Pr(e.targetId), at.delete(t));
  }
}, Ur = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, Jr = ["ctrl", "alt", "shift", "meta"];
let Xr = 0;
function Ga(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
}
function Za(t, e) {
  for (let i = 0; i < Jr.length; i++) {
    let o = Jr[i];
    if (e[o] && !t[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in Ur)
    e[i] && (n = !0, t.key === Ur[i] && (r = !0));
  return !(n && !r);
}
function H(t, e = {}) {
  let n = e.supportsOutside === !0, r = e.isKeyboardEvent === !0;
  const i = /* @__PURE__ */ new WeakMap();
  return {
    mounted(o, a, s) {
      const { arg: l, modifiers: u } = a, d = ve(s);
      if (!d) {
        console.warn("[LiVue] v-" + t + ": livue helper not found in component context");
        return;
      }
      Xr++;
      const c = "v-" + t + "-" + Xr, p = Ga(u);
      let m = null, h = null;
      u.debounce && (m = Qe(c, p)), u.throttle && (h = At(c, p));
      let y = !1, S = null;
      l && (S = l);
      const b = function(C) {
        let x = S, P = [];
        if (l) {
          x = l;
          const D = a.value;
          D != null && (P = Array.isArray(D) ? D : [D]);
        } else {
          const D = a.value;
          if (typeof D == "function") {
            const z = function() {
              D();
            };
            m ? m(z) : h ? h(z) : z();
            return;
          } else typeof D == "string" ? x = D : Array.isArray(D) && D.length > 0 && (x = D[0], P = D.slice(1));
        }
        if (!x) {
          console.warn("[LiVue] v-" + t + ": no method specified");
          return;
        }
        const F = function() {
          u.confirm ? d.callWithConfirm(x, "Are you sure?", ...P) : d.call(x, ...P);
        };
        m ? m(F) : h ? h(F) : F();
      }, k = function(C) {
        if (!(u.self && C.target !== o) && !(r && !Za(C, u))) {
          if (u.once) {
            if (y)
              return;
            y = !0;
          }
          u.prevent && C.preventDefault(), u.stop && C.stopPropagation(), b();
        }
      }, T = {};
      u.capture && (T.capture = !0), u.passive && (T.passive = !0);
      const O = {
        handler: k,
        options: T,
        outsideHandler: null
      };
      if (n && u.outside) {
        const C = function(x) {
          if (!o.contains(x.target) && x.target !== o) {
            if (u.once) {
              if (y)
                return;
              y = !0;
            }
            b();
          }
        };
        document.addEventListener(t, C, T), O.outsideHandler = C;
      } else
        o.addEventListener(t, k, T);
      i.set(o, O);
    },
    updated(o, a, s) {
    },
    unmounted(o) {
      const a = i.get(o);
      a && (a.outsideHandler ? document.removeEventListener(t, a.outsideHandler, a.options) : o.removeEventListener(t, a.handler, a.options), i.delete(o));
    }
  };
}
const Qa = H("click", { supportsOutside: !0 }), el = {
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
let Yr = 0;
const tl = {
  created(t, e) {
    let n = e.value;
    n || (Yr++, n = "scroll-" + Yr), t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n;
  },
  updated(t, e) {
    let n = e.value;
    n && n !== t.__livue_scroll_key && (t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n);
  },
  unmounted(t) {
    t.removeAttribute("data-livue-scroll"), delete t.__livue_scroll_key;
  }
}, lt = /* @__PURE__ */ new WeakMap();
function Kr(t, e, n, r, i) {
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
const nl = {
  created(t, e) {
    let n = t.style.display;
    lt.set(t, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = e.modifiers || {};
    !r.class && !r.attr && (t.style.display = "none");
  },
  mounted(t, e, n) {
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = lt.get(t), o = e.modifiers || {}, a = e.arg || null, s = e.value;
    i.stopWatch = Oe(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(l) {
        Kr(t, i, o, s, l);
      },
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    let r = lt.get(t);
    if (r && e.value !== e.oldValue) {
      let i = ve(n);
      if (i) {
        let o = e.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Kr(t, r, e.modifiers || {}, e.value, a);
      }
    }
  },
  unmounted(t) {
    let e = lt.get(t);
    e && (e.stopWatch && e.stopWatch(), lt.delete(t));
  }
}, Vt = /* @__PURE__ */ new WeakMap();
let Gr = 0;
function rl(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function il(t, e) {
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
function ol(t, e) {
  let n = e.split("."), r = t[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const al = {
  mounted(t, e, n) {
    let r = il(e, n);
    if (!r) {
      console.warn("[LiVue] v-watch: Could not find livue context");
      return;
    }
    let i = e.value || t.dataset.watchPath;
    if (!i) {
      console.warn(`[LiVue] v-watch: No path found. Use v-watch="'path'" or data-watch-path="path"`);
      return;
    }
    let { livue: o, state: a } = r, s = e.modifiers || {};
    Gr++;
    let l = "watch-" + i + "-" + Gr;
    if (s.blur) {
      let p = function() {
        o.sync();
      };
      t.addEventListener("focusout", p), Vt.set(t, { blurHandler: p });
      return;
    }
    let u = rl(s) || 150, d = Qe(l, u), c = Oe(
      function() {
        return ol(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    Vt.set(t, { stopWatcher: c });
  },
  unmounted(t) {
    let e = Vt.get(t);
    e && (e.stopWatcher && e.stopWatcher(), e.blurHandler && t.removeEventListener("focusout", e.blurHandler), Vt.delete(t));
  }
}, gt = /* @__PURE__ */ new WeakMap();
let Zr = 0;
function ll(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function sl(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function ul(t, e) {
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
function Tt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Ct(t, e, n) {
  let r = t[e];
  r && typeof r == "object" && "value" in r ? r.value = n : t[e] = n;
}
function Vi(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function cl(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let r in t)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function fl(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function dl(t) {
  return fl(t) ? t : t.querySelector("input, textarea, select");
}
function Lt(t, e) {
  return {
    mounted(n, r, i) {
      if (ll(i) && !sl(i))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = ul(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: s } = a, l = cl(s, o);
      if (!l)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Zr++;
      let d = t + "-" + Zr, c = dl(n);
      if (!c) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let p = e(c, l, s, u, d);
      c.addEventListener(p.eventType, p.handler, { capture: !0 }), gt.set(n, {
        targetEl: c,
        handler: p.handler,
        eventType: p.eventType
      });
    },
    unmounted(n) {
      let r = gt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), gt.delete(n));
    }
  };
}
const pl = Lt("debounce", function(t, e, n, r, i) {
  let o = Vi(r) || 150, a = Qe(i, o);
  return {
    eventType: "input",
    handler: function(s) {
      s.stopImmediatePropagation();
      let l = Tt(s.target);
      a(function() {
        Ct(n, e, l);
      });
    }
  };
}), hl = Lt("throttle", function(t, e, n, r, i) {
  let o = Vi(r) || 150, a = At(i, o);
  return {
    eventType: "input",
    handler: function(s) {
      s.stopImmediatePropagation();
      let l = Tt(s.target);
      a(function() {
        Ct(n, e, l);
      });
    }
  };
}), fr = Lt("blur", function(t, e, n, r, i) {
  let o = function(s) {
    s.stopImmediatePropagation();
  }, a = function(s) {
    Ct(n, e, Tt(s.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), ml = fr.unmounted;
fr.unmounted = function(t) {
  let e = gt.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), ml(t);
};
const dr = Lt("enter", function(t, e, n, r, i) {
  let o = function(s) {
    s.stopImmediatePropagation();
  }, a = function(s) {
    s.key === "Enter" && Ct(n, e, Tt(s.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), vl = dr.unmounted;
dr.unmounted = function(t) {
  let e = gt.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), vl(t);
};
const gl = Lt("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = Tt(o.target);
      a = !!a && a !== "false" && a !== "0", Ct(n, e, a);
    }
  };
});
function Qr(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ye(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Qr(Object(n), !0).forEach(function(r) {
      yl(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Qr(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Jt(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Jt = function(e) {
    return typeof e;
  } : Jt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Jt(t);
}
function yl(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function _e() {
  return _e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, _e.apply(this, arguments);
}
function bl(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function wl(t, e) {
  if (t == null) return {};
  var n = bl(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
var El = "1.15.6";
function Se(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var Ae = Se(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), kt = Se(/Edge/i), ei = Se(/firefox/i), yt = Se(/safari/i) && !Se(/chrome/i) && !Se(/android/i), pr = Se(/iP(ad|od|hone)/i), Hi = Se(/chrome/i) && Se(/android/i), ji = {
  capture: !1,
  passive: !1
};
function V(t, e, n) {
  t.addEventListener(e, n, !Ae && ji);
}
function R(t, e, n) {
  t.removeEventListener(e, n, !Ae && ji);
}
function cn(t, e) {
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
function qi(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function me(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && cn(t, e) : cn(t, e)) || r && t === n)
        return t;
      if (t === n) break;
    } while (t = qi(t));
  }
  return null;
}
var ti = /\s+/g;
function le(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(ti, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(ti, " ");
    }
}
function N(t, e, n) {
  var r = t && t.style;
  if (r) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in r) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), r[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function Ze(t, e) {
  var n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      var r = N(t, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!e && (t = t.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function zi(t, e, n) {
  if (t) {
    var r = t.getElementsByTagName(e), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function ge() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function Z(t, e, n, r, i) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, a, s, l, u, d, c;
    if (t !== window && t.parentNode && t !== ge() ? (o = t.getBoundingClientRect(), a = o.top, s = o.left, l = o.bottom, u = o.right, d = o.height, c = o.width) : (a = 0, s = 0, l = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !Ae))
      do
        if (i && i.getBoundingClientRect && (N(i, "transform") !== "none" || n && N(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(N(i, "border-top-width")), s -= p.left + parseInt(N(i, "border-left-width")), l = a + o.height, u = s + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var m = Ze(i || t), h = m && m.a, y = m && m.d;
      m && (a /= y, s /= h, c /= h, d /= y, l = a + d, u = s + c);
    }
    return {
      top: a,
      left: s,
      bottom: l,
      right: u,
      width: c,
      height: d
    };
  }
}
function ni(t, e, n) {
  for (var r = xe(t, !0), i = Z(t)[e]; r; ) {
    var o = Z(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === ge()) break;
    r = xe(r, !1);
  }
  return !1;
}
function et(t, e, n, r) {
  for (var i = 0, o = 0, a = t.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== I.ghost && (r || a[o] !== I.dragged) && me(a[o], n.draggable, t, !1)) {
      if (i === e)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function hr(t, e) {
  for (var n = t.lastElementChild; n && (n === I.ghost || N(n, "display") === "none" || e && !cn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function ce(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== I.clone && (!e || cn(t, e)) && n++;
  return n;
}
function ri(t) {
  var e = 0, n = 0, r = ge();
  if (t)
    do {
      var i = Ze(t), o = i.a, a = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function Sl(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var r in e)
        if (e.hasOwnProperty(r) && e[r] === t[n][r]) return Number(n);
    }
  return -1;
}
function xe(t, e) {
  if (!t || !t.getBoundingClientRect) return ge();
  var n = t, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = N(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ge();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ge();
}
function _l(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Nn(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var bt;
function Fi(t, e) {
  return function() {
    if (!bt) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), bt = setTimeout(function() {
        bt = void 0;
      }, e);
    }
  };
}
function Al() {
  clearTimeout(bt), bt = void 0;
}
function Wi(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function Bi(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function $i(t, e, n) {
  var r = {};
  return Array.from(t.children).forEach(function(i) {
    var o, a, s, l;
    if (!(!me(i, e.draggable, t, !1) || i.animated || i === n)) {
      var u = Z(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((s = r.right) !== null && s !== void 0 ? s : -1 / 0, u.right), r.bottom = Math.max((l = r.bottom) !== null && l !== void 0 ? l : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var ae = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Dl() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(N(i, "display") === "none" || i === I.ghost)) {
            t.push({
              target: i,
              rect: Z(i)
            });
            var o = ye({}, t[t.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Ze(i, !0);
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
      t.splice(Sl(t, {
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
      t.forEach(function(s) {
        var l = 0, u = s.target, d = u.fromRect, c = Z(u), p = u.prevFromRect, m = u.prevToRect, h = s.rect, y = Ze(u, !0);
        y && (c.top -= y.f, c.left -= y.e), u.toRect = c, u.thisAnimationDuration && Nn(p, c) && !Nn(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - c.top) / (h.left - c.left) === (d.top - c.top) / (d.left - c.left) && (l = Cl(h, p, m, i.options)), Nn(c, d) || (u.prevFromRect = d, u.prevToRect = c, l || (l = i.options.animation), i.animate(u, h, c, l)), l && (o = !0, a = Math.max(a, l), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, l), u.thisAnimationDuration = l);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        N(r, "transition", ""), N(r, "transform", "");
        var s = Ze(this.el), l = s && s.a, u = s && s.d, d = (i.left - o.left) / (l || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, N(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = Tl(r), N(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), N(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          N(r, "transition", ""), N(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Tl(t) {
  return t.offsetWidth;
}
function Cl(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var Be = [], In = {
  initializeByDefault: !0
}, xt = {
  mount: function(e) {
    for (var n in In)
      In.hasOwnProperty(n) && !(n in e) && (e[n] = In[n]);
    Be.forEach(function(r) {
      if (r.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Be.push(e);
  },
  pluginEvent: function(e, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = e + "Global";
    Be.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](ye({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](ye({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(e, n, r, i) {
    Be.forEach(function(s) {
      var l = s.pluginName;
      if (!(!e.options[l] && !s.initializeByDefault)) {
        var u = new s(e, n, e.options);
        u.sortable = e, u.options = e.options, e[l] = u, _e(r, u.defaults);
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
    return Be.forEach(function(i) {
      typeof i.eventProperties == "function" && _e(r, i.eventProperties.call(n[i.pluginName], e));
    }), r;
  },
  modifyOption: function(e, n, r) {
    var i;
    return Be.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(e[o.pluginName], r));
    }), i;
  }
};
function Ll(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, s = t.fromEl, l = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, c = t.newDraggableIndex, p = t.originalEvent, m = t.putSortable, h = t.extraEventProperties;
  if (e = e || n && n[ae], !!e) {
    var y, S = e.options, b = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !Ae && !kt ? y = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (y = document.createEvent("Event"), y.initEvent(r, !0, !0)), y.to = a || n, y.from = s || n, y.item = i || n, y.clone = o, y.oldIndex = l, y.newIndex = u, y.oldDraggableIndex = d, y.newDraggableIndex = c, y.originalEvent = p, y.pullMode = m ? m.lastPutMode : void 0;
    var k = ye(ye({}, h), xt.getEventProperties(r, e));
    for (var T in k)
      y[T] = k[T];
    n && n.dispatchEvent(y), S[b] && S[b].call(e, y);
  }
}
var kl = ["evt"], oe = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = wl(r, kl);
  xt.pluginEvent.bind(I)(e, n, ye({
    dragEl: E,
    parentEl: X,
    ghostEl: M,
    rootEl: U,
    nextEl: je,
    lastDownEl: Xt,
    cloneEl: J,
    cloneHidden: Le,
    dragStarted: ct,
    putSortable: ee,
    activeSortable: I.active,
    originalEvent: i,
    oldIndex: Ye,
    oldDraggableIndex: wt,
    newIndex: se,
    newDraggableIndex: De,
    hideGhostForTarget: Yi,
    unhideGhostForTarget: Ki,
    cloneNowHidden: function() {
      Le = !0;
    },
    cloneNowShown: function() {
      Le = !1;
    },
    dispatchSortableEvent: function(s) {
      re({
        sortable: n,
        name: s,
        originalEvent: i
      });
    }
  }, o));
};
function re(t) {
  Ll(ye({
    putSortable: ee,
    cloneEl: J,
    targetEl: E,
    rootEl: U,
    oldIndex: Ye,
    oldDraggableIndex: wt,
    newIndex: se,
    newDraggableIndex: De
  }, t));
}
var E, X, M, U, je, Xt, J, Le, Ye, se, wt, De, Ht, ee, Xe = !1, fn = !1, dn = [], Re, pe, On, Mn, ii, oi, ct, $e, Et, St = !1, jt = !1, Yt, te, Pn = [], Qn = !1, pn = [], gn = typeof document < "u", qt = pr, ai = kt || Ae ? "cssFloat" : "float", xl = gn && !Hi && !pr && "draggable" in document.createElement("div"), Ui = (function() {
  if (gn) {
    if (Ae)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Ji = function(e, n) {
  var r = N(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = et(e, 0, n), a = et(e, 1, n), s = o && N(o), l = a && N(a), u = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Z(o).width, d = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Z(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return o && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || u >= i && r[ai] === "none" || a && r[ai] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Nl = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, s = r ? n.left : n.top, l = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === s || o === l || i + a / 2 === s + u / 2;
}, Il = function(e, n) {
  var r;
  return dn.some(function(i) {
    var o = i[ae].options.emptyInsertThreshold;
    if (!(!o || hr(i))) {
      var a = Z(i), s = e >= a.left - o && e <= a.right + o, l = n >= a.top - o && n <= a.bottom + o;
      if (s && l)
        return r = i;
    }
  }), r;
}, Xi = function(e) {
  function n(o, a) {
    return function(s, l, u, d) {
      var c = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (o == null && (a || c))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(s, l, u, d), a)(s, l, u, d);
      var p = (a ? s : l).options.group.name;
      return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
    };
  }
  var r = {}, i = e.group;
  (!i || Jt(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, Yi = function() {
  !Ui && M && N(M, "display", "none");
}, Ki = function() {
  !Ui && M && N(M, "display", "");
};
gn && !Hi && document.addEventListener("click", function(t) {
  if (fn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), fn = !1, !1;
}, !0);
var Ve = function(e) {
  if (E) {
    e = e.touches ? e.touches[0] : e;
    var n = Il(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ae]._onDragOver(r);
    }
  }
}, Ol = function(e) {
  E && E.parentNode[ae]._isOutsideThisEl(e.target);
};
function I(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = _e({}, e), t[ae] = this;
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
      return Ji(t, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, s) {
      a.setData("Text", s.textContent);
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
    supportPointer: I.supportPointer !== !1 && "PointerEvent" in window && (!yt || pr),
    emptyInsertThreshold: 5
  };
  xt.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Xi(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : xl, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? V(t, "pointerdown", this._onTapStart) : (V(t, "mousedown", this._onTapStart), V(t, "touchstart", this._onTapStart)), this.nativeDraggable && (V(t, "dragover", this), V(t, "dragenter", this)), dn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), _e(this, Dl());
}
I.prototype = /** @lends Sortable.prototype */
{
  constructor: I,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && ($e = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, E) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, d = i.filter;
      if (zl(r), !E && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && yt && l && l.tagName.toUpperCase() === "SELECT") && (l = me(l, i.draggable, r, !1), !(l && l.animated) && Xt !== l)) {
        if (Ye = ce(l), wt = ce(l, i.draggable), typeof d == "function") {
          if (d.call(this, e, l, this)) {
            re({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: l,
              toEl: r,
              fromEl: r
            }), oe("filter", n, {
              evt: e
            }), o && e.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = me(u, c.trim(), r, !1), c)
            return re({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: l,
              fromEl: r,
              toEl: r
            }), oe("filter", n, {
              evt: e
            }), !0;
        }), d)) {
          o && e.preventDefault();
          return;
        }
        i.handle && !me(u, i.handle, r, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, n, r) {
    var i = this, o = i.el, a = i.options, s = o.ownerDocument, l;
    if (r && !E && r.parentNode === o) {
      var u = Z(r);
      if (U = o, E = r, X = E.parentNode, je = E.nextSibling, Xt = r, Ht = a.group, I.dragged = E, Re = {
        target: E,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, ii = Re.clientX - u.left, oi = Re.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, E.style["will-change"] = "all", l = function() {
        if (oe("delayEnded", i, {
          evt: e
        }), I.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !ei && i.nativeDraggable && (E.draggable = !0), i._triggerDragStart(e, n), re({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), le(E, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        zi(E, d.trim(), Rn);
      }), V(s, "dragover", Ve), V(s, "mousemove", Ve), V(s, "touchmove", Ve), a.supportPointer ? (V(s, "pointerup", i._onDrop), !this.nativeDraggable && V(s, "pointercancel", i._onDrop)) : (V(s, "mouseup", i._onDrop), V(s, "touchend", i._onDrop), V(s, "touchcancel", i._onDrop)), ei && this.nativeDraggable && (this.options.touchStartThreshold = 4, E.draggable = !0), oe("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(kt || Ae))) {
        if (I.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (V(s, "pointerup", i._disableDelayedDrag), V(s, "pointercancel", i._disableDelayedDrag)) : (V(s, "mouseup", i._disableDelayedDrag), V(s, "touchend", i._disableDelayedDrag), V(s, "touchcancel", i._disableDelayedDrag)), V(s, "mousemove", i._delayedDragTouchMoveHandler), V(s, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && V(s, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    E && Rn(E), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    R(e, "mouseup", this._disableDelayedDrag), R(e, "touchend", this._disableDelayedDrag), R(e, "touchcancel", this._disableDelayedDrag), R(e, "pointerup", this._disableDelayedDrag), R(e, "pointercancel", this._disableDelayedDrag), R(e, "mousemove", this._delayedDragTouchMoveHandler), R(e, "touchmove", this._delayedDragTouchMoveHandler), R(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? V(document, "pointermove", this._onTouchMove) : n ? V(document, "touchmove", this._onTouchMove) : V(document, "mousemove", this._onTouchMove) : (V(E, "dragend", this), V(U, "dragstart", this._onDragStart));
    try {
      document.selection ? Kt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (Xe = !1, U && E) {
      oe("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && V(document, "dragover", Ol);
      var r = this.options;
      !e && le(E, r.dragClass, !1), le(E, r.ghostClass, !0), I.active = this, e && this._appendGhost(), re({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (pe) {
      this._lastX = pe.clientX, this._lastY = pe.clientY, Yi();
      for (var e = document.elementFromPoint(pe.clientX, pe.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(pe.clientX, pe.clientY), e !== n); )
        n = e;
      if (E.parentNode[ae]._isOutsideThisEl(e), n)
        do {
          if (n[ae]) {
            var r = void 0;
            if (r = n[ae]._onDragOver({
              clientX: pe.clientX,
              clientY: pe.clientY,
              target: e,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = qi(n));
      Ki();
    }
  },
  _onTouchMove: function(e) {
    if (Re) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = M && Ze(M, !0), s = M && a && a.a, l = M && a && a.d, u = qt && te && ri(te), d = (o.clientX - Re.clientX + i.x) / (s || 1) + (u ? u[0] - Pn[0] : 0) / (s || 1), c = (o.clientY - Re.clientY + i.y) / (l || 1) + (u ? u[1] - Pn[1] : 0) / (l || 1);
      if (!I.active && !Xe) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (M) {
        a ? (a.e += d - (On || 0), a.f += c - (Mn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        N(M, "webkitTransform", p), N(M, "mozTransform", p), N(M, "msTransform", p), N(M, "transform", p), On = d, Mn = c, pe = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!M) {
      var e = this.options.fallbackOnBody ? document.body : U, n = Z(E, !0, qt, !0, e), r = this.options;
      if (qt) {
        for (te = e; N(te, "position") === "static" && N(te, "transform") === "none" && te !== document; )
          te = te.parentNode;
        te !== document.body && te !== document.documentElement ? (te === document && (te = ge()), n.top += te.scrollTop, n.left += te.scrollLeft) : te = ge(), Pn = ri(te);
      }
      M = E.cloneNode(!0), le(M, r.ghostClass, !1), le(M, r.fallbackClass, !0), le(M, r.dragClass, !0), N(M, "transition", ""), N(M, "transform", ""), N(M, "box-sizing", "border-box"), N(M, "margin", 0), N(M, "top", n.top), N(M, "left", n.left), N(M, "width", n.width), N(M, "height", n.height), N(M, "opacity", "0.8"), N(M, "position", qt ? "absolute" : "fixed"), N(M, "zIndex", "100000"), N(M, "pointerEvents", "none"), I.ghost = M, e.appendChild(M), N(M, "transform-origin", ii / parseInt(M.style.width) * 100 + "% " + oi / parseInt(M.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var r = this, i = e.dataTransfer, o = r.options;
    if (oe("dragStart", this, {
      evt: e
    }), I.eventCanceled) {
      this._onDrop();
      return;
    }
    oe("setupClone", this), I.eventCanceled || (J = Bi(E), J.removeAttribute("id"), J.draggable = !1, J.style["will-change"] = "", this._hideClone(), le(J, this.options.chosenClass, !1), I.clone = J), r.cloneId = Kt(function() {
      oe("clone", r), !I.eventCanceled && (r.options.removeCloneOnHide || U.insertBefore(J, E), r._hideClone(), re({
        sortable: r,
        name: "clone"
      }));
    }), !n && le(E, o.dragClass, !0), n ? (fn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (R(document, "mouseup", r._onDrop), R(document, "touchend", r._onDrop), R(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, E)), V(document, "drop", r), N(E, "transform", "translateZ(0)")), Xe = !0, r._dragStartId = Kt(r._dragStarted.bind(r, n, e)), V(document, "selectstart", r), ct = !0, window.getSelection().removeAllRanges(), yt && N(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, s = this.options, l = s.group, u = I.active, d = Ht === l, c = s.sort, p = ee || u, m, h = this, y = !1;
    if (Qn) return;
    function S(A, v) {
      oe(A, h, ye({
        evt: e,
        isOwner: d,
        axis: m ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: p,
        target: r,
        completed: k,
        onMove: function(q, $) {
          return zt(U, n, E, i, q, Z(q), e, $);
        },
        changed: T
      }, v));
    }
    function b() {
      S("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function k(A) {
      return S("dragOverCompleted", {
        insertion: A
      }), A && (d ? u._hideClone() : u._showClone(h), h !== p && (le(E, ee ? ee.options.ghostClass : u.options.ghostClass, !1), le(E, s.ghostClass, !0)), ee !== h && h !== I.active ? ee = h : h === I.active && ee && (ee = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        S("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === E && !E.animated || r === n && !r.animated) && ($e = null), !s.dragoverBubble && !e.rootEl && r !== document && (E.parentNode[ae]._isOutsideThisEl(e.target), !A && Ve(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), y = !0;
    }
    function T() {
      se = ce(E), De = ce(E, s.draggable), re({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: se,
        newDraggableIndex: De,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = me(r, s.draggable, n, !0), S("dragOver"), I.eventCanceled) return y;
    if (E.contains(e.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return k(!1);
    if (fn = !1, u && !s.disabled && (d ? c || (a = X !== U) : ee === this || (this.lastPutMode = Ht.checkPull(this, u, E, e)) && l.checkPut(this, u, E, e))) {
      if (m = this._getDirection(e, r) === "vertical", i = Z(E), S("dragOverValid"), I.eventCanceled) return y;
      if (a)
        return X = U, b(), this._hideClone(), S("revert"), I.eventCanceled || (je ? U.insertBefore(E, je) : U.appendChild(E)), k(!0);
      var O = hr(n, s.draggable);
      if (!O || Vl(e, m, this) && !O.animated) {
        if (O === E)
          return k(!1);
        if (O && n === e.target && (r = O), r && (o = Z(r)), zt(U, n, E, i, r, o, e, !!r) !== !1)
          return b(), O && O.nextSibling ? n.insertBefore(E, O.nextSibling) : n.appendChild(E), X = n, T(), k(!0);
      } else if (O && Rl(e, m, this)) {
        var C = et(n, 0, s, !0);
        if (C === E)
          return k(!1);
        if (r = C, o = Z(r), zt(U, n, E, i, r, o, e, !1) !== !1)
          return b(), n.insertBefore(E, C), X = n, T(), k(!0);
      } else if (r.parentNode === n) {
        o = Z(r);
        var x = 0, P, F = E.parentNode !== n, D = !Nl(E.animated && E.toRect || i, r.animated && r.toRect || o, m), z = m ? "top" : "left", w = ni(r, "top", "top") || ni(E, "top", "top"), Y = w ? w.scrollTop : void 0;
        $e !== r && (P = o[z], St = !1, jt = !D && s.invertSwap || F), x = Hl(e, r, o, m, D ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, jt, $e === r);
        var K;
        if (x !== 0) {
          var ne = ce(E);
          do
            ne -= x, K = X.children[ne];
          while (K && (N(K, "display") === "none" || K === M));
        }
        if (x === 0 || K === r)
          return k(!1);
        $e = r, Et = x;
        var f = r.nextElementSibling, g = !1;
        g = x === 1;
        var _ = zt(U, n, E, i, r, o, e, g);
        if (_ !== !1)
          return (_ === 1 || _ === -1) && (g = _ === 1), Qn = !0, setTimeout(Pl, 30), b(), g && !f ? n.appendChild(E) : r.parentNode.insertBefore(E, g ? f : r), w && Wi(w, 0, Y - w.scrollTop), X = E.parentNode, P !== void 0 && !jt && (Yt = Math.abs(P - Z(r)[z])), T(), k(!0);
      }
      if (n.contains(E))
        return k(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    R(document, "mousemove", this._onTouchMove), R(document, "touchmove", this._onTouchMove), R(document, "pointermove", this._onTouchMove), R(document, "dragover", Ve), R(document, "mousemove", Ve), R(document, "touchmove", Ve);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    R(e, "mouseup", this._onDrop), R(e, "touchend", this._onDrop), R(e, "pointerup", this._onDrop), R(e, "pointercancel", this._onDrop), R(e, "touchcancel", this._onDrop), R(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, r = this.options;
    if (se = ce(E), De = ce(E, r.draggable), oe("drop", this, {
      evt: e
    }), X = E && E.parentNode, se = ce(E), De = ce(E, r.draggable), I.eventCanceled) {
      this._nulling();
      return;
    }
    Xe = !1, jt = !1, St = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), er(this.cloneId), er(this._dragStartId), this.nativeDraggable && (R(document, "drop", this), R(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), yt && N(document.body, "user-select", ""), N(E, "transform", ""), e && (ct && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), M && M.parentNode && M.parentNode.removeChild(M), (U === X || ee && ee.lastPutMode !== "clone") && J && J.parentNode && J.parentNode.removeChild(J), E && (this.nativeDraggable && R(E, "dragend", this), Rn(E), E.style["will-change"] = "", ct && !Xe && le(E, ee ? ee.options.ghostClass : this.options.ghostClass, !1), le(E, this.options.chosenClass, !1), re({
      sortable: this,
      name: "unchoose",
      toEl: X,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), U !== X ? (se >= 0 && (re({
      rootEl: X,
      name: "add",
      toEl: X,
      fromEl: U,
      originalEvent: e
    }), re({
      sortable: this,
      name: "remove",
      toEl: X,
      originalEvent: e
    }), re({
      rootEl: X,
      name: "sort",
      toEl: X,
      fromEl: U,
      originalEvent: e
    }), re({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: e
    })), ee && ee.save()) : se !== Ye && se >= 0 && (re({
      sortable: this,
      name: "update",
      toEl: X,
      originalEvent: e
    }), re({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: e
    })), I.active && ((se == null || se === -1) && (se = Ye, De = wt), re({
      sortable: this,
      name: "end",
      toEl: X,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    oe("nulling", this), U = E = X = M = je = J = Xt = Le = Re = pe = ct = se = De = Ye = wt = $e = Et = ee = Ht = I.dragged = I.ghost = I.clone = I.active = null, pn.forEach(function(e) {
      e.checked = !0;
    }), pn.length = On = Mn = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        E && (this._onDragOver(e), Ml(e));
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
      n = r[i], me(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || ql(n));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, n) {
    var r = {}, i = this.el;
    this.toArray().forEach(function(o, a) {
      var s = i.children[a];
      me(s, this.options.draggable, i, !1) && (r[o] = s);
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
    return me(e, n || this.options.draggable, this.el, !1);
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
    var i = xt.modifyOption(this, e, n);
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && Xi(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    oe("destroy", this);
    var e = this.el;
    e[ae] = null, R(e, "mousedown", this._onTapStart), R(e, "touchstart", this._onTapStart), R(e, "pointerdown", this._onTapStart), this.nativeDraggable && (R(e, "dragover", this), R(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), dn.splice(dn.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Le) {
      if (oe("hideClone", this), I.eventCanceled) return;
      N(J, "display", "none"), this.options.removeCloneOnHide && J.parentNode && J.parentNode.removeChild(J), Le = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Le) {
      if (oe("showClone", this), I.eventCanceled) return;
      E.parentNode == U && !this.options.group.revertClone ? U.insertBefore(J, E) : je ? U.insertBefore(J, je) : U.appendChild(J), this.options.group.revertClone && this.animate(E, J), N(J, "display", ""), Le = !1;
    }
  }
};
function Ml(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function zt(t, e, n, r, i, o, a, s) {
  var l, u = t[ae], d = u.options.onMove, c;
  return window.CustomEvent && !Ae && !kt ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = t, l.dragged = n, l.draggedRect = r, l.related = i || e, l.relatedRect = o || Z(e), l.willInsertAfter = s, l.originalEvent = a, t.dispatchEvent(l), d && (c = d.call(u, l, a)), c;
}
function Rn(t) {
  t.draggable = !1;
}
function Pl() {
  Qn = !1;
}
function Rl(t, e, n) {
  var r = Z(et(n.el, 0, n.options, !0)), i = $i(n.el, n.options, M), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function Vl(t, e, n) {
  var r = Z(hr(n.el, n.options.draggable)), i = $i(n.el, n.options, M), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function Hl(t, e, n, r, i, o, a, s) {
  var l = r ? t.clientY : t.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (s && Yt < u * i) {
      if (!St && (Et === 1 ? l > d + u * o / 2 : l < c - u * o / 2) && (St = !0), St)
        p = !0;
      else if (Et === 1 ? l < d + Yt : l > c - Yt)
        return -Et;
    } else if (l > d + u * (1 - i) / 2 && l < c - u * (1 - i) / 2)
      return jl(e);
  }
  return p = p || a, p && (l < d + u * o / 2 || l > c - u * o / 2) ? l > d + u / 2 ? 1 : -1 : 0;
}
function jl(t) {
  return ce(E) < ce(t) ? 1 : -1;
}
function ql(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function zl(t) {
  pn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && pn.push(r);
  }
}
function Kt(t) {
  return setTimeout(t, 0);
}
function er(t) {
  return clearTimeout(t);
}
gn && V(document, "touchmove", function(t) {
  (I.active || Xe) && t.cancelable && t.preventDefault();
});
I.utils = {
  on: V,
  off: R,
  css: N,
  find: zi,
  is: function(e, n) {
    return !!me(e, n, e, !1);
  },
  extend: _l,
  throttle: Fi,
  closest: me,
  toggleClass: le,
  clone: Bi,
  index: ce,
  nextTick: Kt,
  cancelNextTick: er,
  detectDirection: Ji,
  getChild: et,
  expando: ae
};
I.get = function(t) {
  return t[ae];
};
I.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (I.utils = ye(ye({}, I.utils), r.utils)), xt.mount(r);
  });
};
I.create = function(t, e) {
  return new I(t, e);
};
I.version = El;
var G = [], ft, tr, nr = !1, Vn, Hn, hn, dt;
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
      this.sortable.nativeDraggable ? R(document, "dragover", this._handleAutoScroll) : (R(document, "pointermove", this._handleFallbackAutoScroll), R(document, "touchmove", this._handleFallbackAutoScroll), R(document, "mousemove", this._handleFallbackAutoScroll)), li(), Gt(), Al();
    },
    nulling: function() {
      hn = tr = ft = nr = dt = Vn = Hn = null, G.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, s = document.elementFromPoint(o, a);
      if (hn = n, r || this.options.forceAutoScrollFallback || kt || Ae || yt) {
        jn(n, this.options, s, r);
        var l = xe(s, !0);
        nr && (!dt || o !== Vn || a !== Hn) && (dt && li(), dt = setInterval(function() {
          var u = xe(document.elementFromPoint(o, a), !0);
          u !== l && (l = u, Gt()), jn(n, i.options, u, r);
        }, 10), Vn = o, Hn = a);
      } else {
        if (!this.options.bubbleScroll || xe(s, !0) === ge()) {
          Gt();
          return;
        }
        jn(n, this.options, xe(s, !1), !1);
      }
    }
  }, _e(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Gt() {
  G.forEach(function(t) {
    clearInterval(t.pid);
  }), G = [];
}
function li() {
  clearInterval(dt);
}
var jn = Fi(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = ge(), u = !1, d;
    tr !== n && (tr = n, Gt(), ft = e.scroll, d = e.scrollFn, ft === !0 && (ft = xe(n, !0)));
    var c = 0, p = ft;
    do {
      var m = p, h = Z(m), y = h.top, S = h.bottom, b = h.left, k = h.right, T = h.width, O = h.height, C = void 0, x = void 0, P = m.scrollWidth, F = m.scrollHeight, D = N(m), z = m.scrollLeft, w = m.scrollTop;
      m === l ? (C = T < P && (D.overflowX === "auto" || D.overflowX === "scroll" || D.overflowX === "visible"), x = O < F && (D.overflowY === "auto" || D.overflowY === "scroll" || D.overflowY === "visible")) : (C = T < P && (D.overflowX === "auto" || D.overflowX === "scroll"), x = O < F && (D.overflowY === "auto" || D.overflowY === "scroll"));
      var Y = C && (Math.abs(k - i) <= a && z + T < P) - (Math.abs(b - i) <= a && !!z), K = x && (Math.abs(S - o) <= a && w + O < F) - (Math.abs(y - o) <= a && !!w);
      if (!G[c])
        for (var ne = 0; ne <= c; ne++)
          G[ne] || (G[ne] = {});
      (G[c].vx != Y || G[c].vy != K || G[c].el !== m) && (G[c].el = m, G[c].vx = Y, G[c].vy = K, clearInterval(G[c].pid), (Y != 0 || K != 0) && (u = !0, G[c].pid = setInterval(function() {
        r && this.layer === 0 && I.active._onTouchMove(hn);
        var f = G[this.layer].vy ? G[this.layer].vy * s : 0, g = G[this.layer].vx ? G[this.layer].vx * s : 0;
        typeof d == "function" && d.call(I.dragged.parentNode[ae], g, f, t, hn, G[this.layer].el) !== "continue" || Wi(G[this.layer].el, g, f);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && p !== l && (p = xe(p, !1)));
    nr = u;
  }
}, 30), Gi = function(e) {
  var n = e.originalEvent, r = e.putSortable, i = e.dragEl, o = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    s();
    var d = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(d.clientX, d.clientY);
    l(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: r
    }));
  }
};
function mr() {
}
mr.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = et(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Gi
};
_e(mr, {
  pluginName: "revertOnSpill"
});
function vr() {
}
vr.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Gi
};
_e(vr, {
  pluginName: "removeOnSpill"
});
I.mount(new Fl());
I.mount(vr, mr);
const Ke = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap();
function Wl(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Ft = /* @__PURE__ */ new WeakMap(), Bl = {
  mounted(t, e, n) {
    let r = ve(n), i = e.modifiers || {}, o = e.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Wl(i), s = i.horizontal ? "horizontal" : "vertical";
    Ft.set(t, e);
    let l = t.dataset.livueSortGroup || null, u = {
      animation: a,
      direction: s,
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
        let m = p.newIndex, h = p.oldIndex;
        if (h === m)
          return;
        let y = Ft.get(t), S = y ? y.value : null, b = typeof S == "string";
        if (Array.isArray(S)) {
          let T = p.from;
          h < m ? T.insertBefore(p.item, T.children[h]) : T.insertBefore(p.item, T.children[h + 1]);
          let O = S.splice(h, 1)[0];
          S.splice(m, 0, O);
          return;
        }
        if (b && r) {
          let T = S, O = [], C = p.item, x = Zt.get(C);
          x === void 0 && (x = C.dataset.livueSortItem), typeof x == "string" && /^\d+$/.test(x) && (x = parseInt(x, 10));
          let P = p.from, F = p.to, D = [x, m].concat(O);
          if (P !== F) {
            let w = F.dataset.livueSortMethod;
            w && (T = w);
            let Y = P.dataset.livueSortId || P.dataset.livueSortGroup || null;
            D.push(Y);
          }
          r.call(T, D);
        }
      }
    };
    typeof e.value == "string" && (t.dataset.livueSortMethod = e.value), t.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), l && (u.group = l);
    let c = I.create(t, u);
    Ke.set(t, c);
  },
  updated(t, e) {
    Ft.set(t, e);
    let n = Ke.get(t);
    n && t.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = Ke.get(t);
    e && (e.destroy(), Ke.delete(t)), Ft.delete(t);
  }
}, $l = {
  mounted(t, e) {
    let n = e.value;
    Zt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    Zt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (Zt.delete(t), t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Ul = {
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
}, Jl = {
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
}, Xl = {
  mounted(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = Ke.get(t);
    r && r.option("group", n);
  },
  updated(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = Ke.get(t);
    r && r.option("group", n);
  },
  unmounted(t) {
    if (t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, Yl = H("dblclick"), Kl = H("mousedown"), Gl = H("mouseup"), Zl = H("mouseenter"), Ql = H("mouseleave"), es = H("mouseover"), ts = H("mouseout"), ns = H("mousemove"), rs = H("contextmenu"), is = H("keydown", { isKeyboardEvent: !0 }), os = H("keyup", { isKeyboardEvent: !0 }), as = H("keypress", { isKeyboardEvent: !0 }), ls = H("focus"), ss = H("focusin"), us = H("focusout"), cs = H("touchstart"), fs = H("touchend"), ds = H("touchmove"), ps = H("touchcancel"), hs = H("change"), ms = H("input"), vs = H("reset"), gs = H("dragstart"), ys = H("dragend"), bs = H("dragenter"), ws = H("dragleave"), Es = H("dragover"), Ss = H("drop"), _s = H("copy"), As = H("cut"), Ds = H("paste"), Ts = H("wheel"), Cs = H("resize");
function Ls() {
  L("init", Na), L("submit", Ia), L("intersect", Oa), L("current", Ma), L("ignore", Pa), L("model-livue", ja), L("debounce", pl), L("throttle", hl), L("blur", fr), L("enter", dr), L("boolean", gl), L("poll", Fa), L("offline", Ba), L("transition", ha), L("replace", $a), L("loading", Xa), L("target", Ya), L("stream", Ka), L("click", Qa), L("navigate", el), L("scroll", tl), L("dirty", nl), L("watch", al), L("sort", Bl), L("sort-item", $l), L("sort-handle", Ul), L("sort-ignore", Jl), L("sort-group", Xl), L("dblclick", Yl), L("mousedown", Kl), L("mouseup", Gl), L("mouseenter", Zl), L("mouseleave", Ql), L("mouseover", es), L("mouseout", ts), L("mousemove", ns), L("contextmenu", rs), L("keydown", is), L("keyup", os), L("keypress", as), L("focus", ls), L("focusin", ss), L("focusout", us), L("touchstart", cs), L("touchend", fs), L("touchmove", ds), L("touchcancel", ps), L("change", hs), L("input", ms), L("reset", vs), L("dragstart", gs), L("dragend", ys), L("dragenter", bs), L("dragleave", ws), L("dragover", Es), L("drop", Ss), L("copy", _s), L("cut", As), L("paste", Ds), L("wheel", Ts), L("resize", Cs);
}
let Te = null, st = null, si = !1;
function ks() {
  if (si)
    return;
  si = !0;
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
function xs() {
  return Te || (ks(), Te = document.createElement("div"), Te.className = "livue-hmr-indicator", document.body.appendChild(Te), Te);
}
function Wt(t, e) {
  const n = xs();
  switch (st && (clearTimeout(st), st = null), t) {
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
            `, st = setTimeout(function() {
        ui();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, st = setTimeout(function() {
        ui();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function ui() {
  Te && Te.classList.remove("visible");
}
let ze = null, yn = !0, Zi = !0, pt = !0, Qt = [];
function Ns(t) {
  ze = t;
}
async function Is(t) {
  if (yn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), pt && Wt("updating", t.fileName), Qt.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Zi ? Os() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), pt && Wt("error");
        return;
      }
      a.forEach(function(s) {
        const l = s.dataset.livueId, u = document.querySelector('[data-livue-id="' + l + '"]');
        u && (s.dataset.livueSnapshot && (u.dataset.livueSnapshot = s.dataset.livueSnapshot), u.innerHTML = s.innerHTML);
      }), ze.reboot(), e && (await Ps(), Ms(e)), pt && Wt("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), pt && Wt("error");
    }
  }
}
function Os() {
  const t = /* @__PURE__ */ new Map();
  return ze && ze.all().forEach(function(n) {
    if (ci(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        ci(r, i.name, i.state, t);
      }
  }), t;
}
function ci(t, e, n, r) {
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
function Ms(t) {
  ze && t.forEach(function(e, n) {
    const r = ze.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function Ps() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Rs() {
  return typeof import.meta < "u" && !1;
}
function Vs() {
  yn = !0;
}
function Hs() {
  yn = !1;
}
function js() {
  return yn;
}
function qs(t) {
  t.indicator !== void 0 && (pt = t.indicator), t.preserveState !== void 0 && (Zi = t.preserveState);
}
function zs(t) {
  return Qt.push(t), function() {
    const e = Qt.indexOf(t);
    e !== -1 && Qt.splice(e, 1);
  };
}
async function Fs() {
  ze && await Is({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ue = !1, qn = [];
class Ws {
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
    Jo(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Ls(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), Ao(this), this._startObserver(), Ns(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), ea());
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
    Dt(e, !0, !1);
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
    _o(e);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(e) {
    return vn(e);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    Oo();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return jo();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Me;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: nt(),
      ...Qo()
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
    if (!e.isConnected)
      return !1;
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
    let r = new xa(e);
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
    return Er(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Sr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), Tr();
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
    }), Tr();
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
      isAvailable: Rs,
      isEnabled: js,
      enable: Vs,
      disable: Hs,
      configure: qs,
      onUpdate: zs,
      trigger: Fs
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
    if (e && !Ue) {
      Ue = !0, console.log("[LiVue] Debug mode enabled");
      var n = Sr();
      n.forEach(function(r) {
        var i = Er(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        qn.push(i);
      });
    } else !e && Ue && (Ue = !1, console.log("[LiVue] Debug mode disabled"), qn.forEach(function(r) {
      r();
    }), qn = []);
    return Ue;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return Ue;
  }
}
const gr = new Ws();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = fo, document.head.appendChild(t);
}
var be = window.LiVueConfig || {};
(be.showProgressBar !== void 0 || be.progressBarColor !== void 0 || be.prefetch !== void 0 || be.prefetchOnHover !== void 0 || be.hoverDelay !== void 0 || be.cachePages !== void 0 || be.maxCacheSize !== void 0 || be.restoreScroll !== void 0) && gr.configureNavigation(be);
function fi() {
  gr.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fi) : queueMicrotask(fi);
window.LiVue = gr;
export {
  gr as default
};
//# sourceMappingURL=livue.esm.js.map
