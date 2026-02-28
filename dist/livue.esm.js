import * as Xi from "vue";
import { reactive as Ie, toRefs as Yi, effectScope as Ki, ref as tn, markRaw as Gi, defineComponent as Zi, shallowRef as li, onMounted as si, onUnmounted as ui, h as vr, inject as Qi, provide as eo, nextTick as nr, onBeforeUnmount as to, onBeforeMount as no, readonly as ro, watchEffect as io, watch as Me, computed as oo, createApp as ao } from "vue";
const lo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let je = null;
function tt() {
  if (je)
    return je;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return je = t.getAttribute("content"), je;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (je = decodeURIComponent(e[1]), je) : null;
}
function so() {
  je = null;
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
}, ie = null, zn = null, ue = null, we = null, nn = !1, ht = 0;
function uo(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function co(t) {
  return (-1 + t) * 100;
}
function ci() {
  if (nn) return;
  nn = !0;
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
function fo() {
  if (ue) return;
  ci(), ue = document.createElement("div"), ue.className = "livue-progress-bar livue-progress-hidden", ue.innerHTML = '<div class="livue-progress-peg"></div>', Q.showSpinner && (we = document.createElement("div"), we.className = "livue-progress-spinner livue-progress-hidden", we.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(Q.parent) || document.body;
  t.appendChild(ue), we && t.appendChild(we);
}
function po() {
  if (!nn) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), nn = !1, ci());
}
function ho(t) {
  Object.assign(Q, t), po();
}
function mo() {
  ht++, ie === null && (fo(), ie = 0, ue && ue.classList.remove("livue-progress-hidden"), we && we.classList.remove("livue-progress-hidden"), vn(Q.minimum), Q.trickle && (zn = setInterval(function() {
    fi();
  }, Q.trickleSpeed)));
}
function vn(t) {
  ie !== null && (t = uo(t, Q.minimum, 1), ie = t, ue && (ue.style.transform = "translate3d(" + co(t) + "%, 0, 0)"));
}
function fi() {
  if (ie === null || ie >= 1) return;
  let t;
  ie < 0.2 ? t = 0.1 : ie < 0.5 ? t = 0.04 : ie < 0.8 ? t = 0.02 : ie < 0.99 ? t = 5e-3 : t = 0, vn(ie + t);
}
function di() {
  ht = Math.max(0, ht - 1), !(ht > 0) && ie !== null && (vn(1), clearInterval(zn), zn = null, setTimeout(function() {
    ue && ue.classList.add("livue-progress-hidden"), we && we.classList.add("livue-progress-hidden"), setTimeout(function() {
      ie = null, ue && (ue.style.transform = "translate3d(-100%, 0, 0)");
    }, Q.speed);
  }, Q.speed));
}
function vo() {
  ht = 0, di();
}
function go() {
  return ie !== null;
}
function yo() {
  return ie;
}
const Pe = {
  configure: ho,
  start: mo,
  set: vn,
  trickle: fi,
  done: di,
  forceDone: vo,
  isStarted: go,
  getStatus: yo
};
var ut = null, gr = !1, Ge = !1, de = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ee = /* @__PURE__ */ new Map(), ze = /* @__PURE__ */ new Map(), Fn = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new Map(), Ne = null;
function bo(t) {
  Object.assign(de, t), t.progressBarColor && Pe.configure({ color: t.progressBarColor });
}
function wo(t) {
  ut = t, !gr && (gr = !0, Ne = pi(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Ne },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (hi(Ne), Ne = e.state.pageKey, Tt(e.state.url, !1, !0));
  }), So());
}
function pi() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function hi(t) {
  if (!(!de.restoreScroll || !t)) {
    $t.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = $t.get(t) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, $t.set(t, i);
      }
    });
  }
}
function Eo(t) {
  if (!(!de.restoreScroll || !t)) {
    var e = $t.get(t);
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
function So() {
  document.addEventListener("click", _o, !0), de.prefetch && (document.addEventListener("mouseenter", Do, !0), document.addEventListener("mouseleave", To, !0), document.addEventListener("mousedown", Co, !0), document.addEventListener("focus", Lo, !0));
}
function _o(t) {
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
        n.startsWith("#") || n.startsWith("javascript:") || e.hasAttribute("download") || e.getAttribute("target") !== "_blank" && (t.preventDefault(), t.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), Tt(n, !0, !1));
      }
    }
  }
}
function Ao(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function Do(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !de.prefetchOnHover)) {
      var n = Ao(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            gn(r);
          }, de.hoverDelay);
          Fn.set(e, i);
        }
      }
    }
  }
}
function To(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Fn.get(e);
      n && (clearTimeout(n), Fn.delete(e));
    }
  }
}
function Co(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || gn(n);
    }
  }
}
function Lo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !de.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || gn(n);
    }
  }
}
function gn(t) {
  var e = new URL(t, location.origin).href;
  if (ze.has(e))
    return ze.get(e);
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
    return ze.delete(e), r.ok ? r.text().then(function(i) {
      return de.cachePages && mi(e, i), i;
    }) : null;
  }).catch(function(r) {
    return ze.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return ze.set(e, n), n;
}
function mi(t, e) {
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
function ko() {
  Ee.clear();
}
function rr(t) {
  Ge || !t || !t.url || (t.navigate ? Tt(t.url, !0, !1) : (Ge = !0, window.location.href = t.url));
}
async function Tt(t, e, n) {
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
      Ge = !0, n || hi(Ne), de.showProgressBar && Pe.start();
      try {
        var o, a = Ee.get(r);
        if (a)
          o = a.html;
        else if (ze.has(r))
          o = await ze.get(r);
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
          o = await s.text(), de.cachePages && mi(r, o);
        }
        var l = new DOMParser(), u = l.parseFromString(o, "text/html"), p = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(b) {
              typeof b == "function" && b(u);
            }
          }
        });
        window.dispatchEvent(p);
        var c = No(), h = /* @__PURE__ */ new Set();
        c.forEach(function(b) {
          b.livueIds.forEach(function(M) {
            h.add(M);
          });
        }), ut._stopObserver(), ut.destroyExcept(h), c.forEach(function(b) {
          b.element.parentNode && b.element.parentNode.removeChild(b.element);
        });
        var m = u.querySelector("title");
        m && (document.title = m.textContent), document.body.innerHTML = u.body.innerHTML, xo(c);
        var d = u.querySelector('meta[name="csrf-token"]'), y = document.querySelector('meta[name="csrf-token"]');
        if (d && y && (y.setAttribute("content", d.getAttribute("content")), so()), Io(u), Oo(u), e && (Ne = pi(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Ne },
          "",
          r
        )), Mo(u), ut.rebootPreserving(), n)
          Eo(Ne);
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
        Ge = !1, de.showProgressBar && Pe.done();
      }
    }
  }
}
function No() {
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
function xo(t) {
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
function Io(t) {
  var e = document.querySelectorAll("[data-livue-head]");
  e.forEach(function(r) {
    r.remove();
  });
  var n = t.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Oo(t) {
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
function Mo(t) {
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
function Po() {
  return Ge;
}
var Je = /* @__PURE__ */ new Map(), Ro = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function yr(t, e) {
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
function vi() {
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
function br() {
  return Ro.slice();
}
var Wn = [], Bn = [], At = !1;
function Vo(t) {
  return t.isolate ? jo(t) : new Promise(function(e, n) {
    Wn.push({
      payload: t,
      resolve: e,
      reject: n
    }), At || (At = !0, queueMicrotask(gi));
  });
}
function Ho(t) {
  return new Promise(function(e, n) {
    Bn.push({
      payload: t,
      resolve: e,
      reject: n
    }), At || (At = !0, queueMicrotask(gi));
  });
}
async function gi() {
  var t = Wn, e = Bn;
  if (Wn = [], Bn = [], At = !1, !(t.length === 0 && e.length === 0)) {
    Pe.start();
    var n = yi(), r = tt(), i = {
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
        var p = new Error(u.error || "Request failed");
        p.status = l.status, p.data = u;
        for (var c = 0; c < t.length; c++)
          t[c].reject(p);
        for (var c = 0; c < e.length; c++)
          e[c].reject(p);
        return;
      }
      for (var h = u.responses || [], m = u.lazyResponses || [], c = 0; c < h.length; c++)
        if (h[c] && h[c].redirect) {
          rr(h[c].redirect);
          return;
        }
      for (var c = 0; c < t.length; c++) {
        var d = h[c];
        if (!d) {
          t[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (d.error) {
          var y = new Error(d.error);
          y.status = d.status || 500, y.data = d, t[c].reject(y);
        } else if (d.errors) {
          var y = new Error("Validation failed");
          y.status = 422, y.data = d, t[c].reject(y);
        } else
          t[c].resolve(d);
      }
      for (var c = 0; c < e.length; c++) {
        var d = m[c];
        if (!d) {
          e[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (d.error) {
          var y = new Error(d.error);
          y.status = d.status || 500, y.data = d, e[c].reject(y);
        } else
          e[c].resolve(d);
      }
      fe("request.finished", {
        url: n,
        success: !0,
        responses: h,
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
      Pe.done();
    }
  }
}
async function jo(t) {
  Pe.start();
  var e = yi(), n = tt(), r = {
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
      return rr(l.redirect), new Promise(function() {
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
    Pe.done();
  }
}
function yi() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function wn(t, e, n, r, i) {
  return Vo({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
function bi(t, e) {
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
function wr(t) {
  return JSON.stringify(t, bi);
}
function $n(t) {
  return Ie(Object.assign({}, t));
}
function qo(t, e) {
  let n;
  for (n in e) {
    let r = wr(t[n]), i = wr(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function wi(t) {
  return JSON.parse(JSON.stringify(t, bi));
}
function zo(t) {
  return Yi(t);
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
function It(t, e, n) {
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
    let p = r[u];
    (s[p] === null || s[p] === void 0) && (s[p] = {}), Array.isArray(s[p]) && u + 1 < r.length && isNaN(Number(r[u + 1])) && (s[p] = Object.assign({}, s[p])), s = s[p];
  }
  let l = r[r.length - 1];
  s[l] = n, t[i] = a;
}
let Un = null, Ei = /* @__PURE__ */ new Map();
function Fo() {
  return Ie({});
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
function Wo(t) {
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
function Bo(t, e) {
  typeof e == "function" && Ei.set(t, e);
}
function Xn(t) {
  Ei.delete(t);
}
var Si = [];
function C(t, e, n) {
  Si.push({
    name: t,
    directive: e
  });
}
function $o() {
  return Si;
}
const Oe = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Map();
let Er = !1;
function nt() {
  return typeof window < "u" && window.Echo;
}
function Uo(t, e) {
  if (!nt())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = e + ":" + t;
  if (Oe.has(n))
    return Oe.get(n);
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
  return Oe.set(n, r), r;
}
function _i(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!nt())
    return Er || (Er = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: s, event: l, method: u, isPresenceEvent: p, isCustomEvent: c } = o, h = Uo(a, s);
    if (!h) continue;
    const m = s + ":" + a + ":" + l + ":" + t;
    if (Re.has(m)) {
      r.push(m);
      continue;
    }
    const d = function(y) {
      try {
        n(u, y);
      } catch (S) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', S);
      }
    };
    if (s === "presence" && p)
      Jo(h, l, d);
    else {
      const y = c ? "." + l : l;
      h.listen(y, d);
    }
    Re.set(m, {
      channel: h,
      channelKey: s + ":" + a,
      event: l,
      handler: d,
      isPresenceEvent: p,
      isCustomEvent: c
    }), r.push(m);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      Ai(r[i]);
  };
}
function Jo(t, e, n) {
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
function Ai(t) {
  const e = Re.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    Re.delete(t), Xo(e.channelKey);
  }
}
function Sr(t) {
  const e = ":" + t, n = [];
  Re.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    Ai(n[r]);
}
function Xo(t) {
  let e = !1;
  if (Re.forEach(function(r) {
    r.channelKey === t && (e = !0);
  }), e) return;
  if (Oe.get(t) && nt()) {
    const r = t.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Oe.delete(t);
}
function _r() {
  Re.clear(), Oe.forEach(function(t, e) {
    if (nt()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Oe.clear();
}
function Yo() {
  return {
    echoAvailable: nt(),
    channels: Array.from(Oe.keys()),
    subscriptions: Array.from(Re.keys())
  };
}
function Ko() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Le = /* @__PURE__ */ new Map();
function rn(t, e, n, r) {
  Le.has(t) || Le.set(t, /* @__PURE__ */ new Set());
  var i = {
    componentName: e,
    componentId: n,
    handler: r
  };
  return Le.get(t).add(i), function() {
    var o = Le.get(t);
    o && (o.delete(i), o.size === 0 && Le.delete(t));
  };
}
function Ut(t, e, n, r, i, o) {
  var a = Le.get(t);
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
function Ar(t) {
  Le.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Le.delete(n);
  });
}
function Go(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    Ut(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Zo(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, s = e[i], l = !1;
    o.except !== null && o.except !== void 0 && String(s) === String(o.except) && (l = !0), !o.keep && !l && (s === "" || s === null || s === void 0) && (l = !0), l ? n.searchParams.delete(a) : n.searchParams.set(a, s), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function ir() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function Qo(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var s = new FormData();
    s.append("file", t), s.append("component", e), s.append("property", n), s.append("checksum", r);
    var l = new XMLHttpRequest(), u = ir();
    l.open("POST", u, !0);
    var p = tt();
    p && l.setRequestHeader("X-CSRF-TOKEN", p), l.setRequestHeader("Accept", "application/json"), i && l.upload && l.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var h = Math.round(c.loaded / c.total * 100);
        i(h);
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
        var h = new Error(c.error || c.message || "Upload failed");
        h.status = l.status, h.data = c, a(h);
      }
    }, l.onerror = function() {
      a(new Error("Network error during upload"));
    }, l.send(s);
  });
}
function Sn(t) {
  if (!t || t.length === 0) return Promise.resolve();
  var e = ir() + "-remove", n = tt();
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
function ea(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var s = Array.from(t), l = new FormData();
    s.forEach(function(h) {
      l.append("files[]", h);
    }), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var u = new XMLHttpRequest(), p = ir();
    u.open("POST", p, !0);
    var c = tt();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(h) {
      if (h.lengthComputable) {
        var m = Math.round(h.loaded / h.total * 100);
        i({ overall: m });
      }
    }), u.onload = function() {
      var h;
      try {
        h = JSON.parse(u.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (u.status >= 200 && u.status < 300)
        o({
          results: h.results || [],
          errors: h.errors || []
        });
      else {
        var m = new Error(h.error || h.message || "Upload failed");
        m.status = u.status, m.data = h, a(m);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(l);
  });
}
const ta = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var Dr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Dr || (Dr = {}));
function na() {
  const t = Ki(!0), e = t.run(() => tn({}));
  let n = [], r = [];
  const i = Gi({
    install(o) {
      i._a = o, o.provide(ta, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
function on(t, e) {
  let n = t.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), t;
  n[1];
  let r = n.index + n[0].length;
  return t.slice(0, r) + " " + e + t.slice(r);
}
let _n = 0;
function ra(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
function ia(t) {
  return Zi({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = tn(!1), i = li(null), o = null, a = tn(null);
      async function s() {
        if (!r.value)
          try {
            let u = await Ho({
              component: e.config.name,
              props: e.config.props || {}
            });
            u.html && u.snapshot && l(u);
          } catch (u) {
            console.error("[LiVue] Lazy load failed:", u);
          }
      }
      function l(u) {
        let p = JSON.parse(u.snapshot);
        _n++;
        let c = "lazy-" + _n + "-" + Date.now(), h = p.memo ? p.memo.name : "", m = ra(p.state || {}), d = p.memo || {}, { createLivueHelper: y, buildComponentDef: S, processTemplate: b, createReactiveState: M } = t._lazyHelpers, x = M(m), P = JSON.parse(JSON.stringify(m)), T = { _updateTemplate: null }, L = y(
          c,
          x,
          d,
          T,
          P,
          u.snapshot
        );
        d.errors && he(L.errors, d.errors);
        let O = "livue-lazy-child-" + _n, F = b(u.html, t), D = on(
          F.template,
          'data-livue-id="' + c + '"'
        ), z = S(D, x, L, t._versions, h);
        t._childRegistry[c] = {
          tagName: O,
          state: x,
          memo: d,
          livue: L,
          componentRef: T,
          name: h,
          id: c
        }, T._updateTemplate = function(Y) {
          let K = b(Y, t), ne = on(
            K.template,
            'data-livue-id="' + c + '"'
          );
          for (let g in K.childDefs)
            t.vueApp._context.components[g] || t.vueApp.component(g, K.childDefs[g]);
          let f = S(ne, x, L, t._versions, h);
          t.vueApp._context.components[O] = f, t._versions[O] = (t._versions[O] || 0) + 1, i.value = f;
        };
        let w = d.listeners || null;
        if (w)
          for (let Y in w)
            (function(K, ne) {
              rn(Y, h, c, function(f) {
                ne.call(K, f);
              });
            })(w[Y], L);
        for (let Y in F.childDefs)
          t.vueApp._context.components[Y] || t.vueApp.component(Y, F.childDefs[Y]);
        t._versions[O] = 0, t.vueApp._context.components[O] || t.vueApp.component(O, z), i.value = z, r.value = !0;
      }
      return si(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          s();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, s());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), ui(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? vr(i.value) : vr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
let mt = /* @__PURE__ */ new Map(), vt = /* @__PURE__ */ new Map();
function Qe(t, e) {
  let n = t + ":debounce:" + e;
  if (!mt.has(n)) {
    let r = null, i = null, o = null, a = null, s = function(l) {
      return i = l, clearTimeout(r), new Promise(function(u, p) {
        o = u, a = p, r = setTimeout(function() {
          let c = i, h = o, m = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(h).catch(m);
        }, e);
      });
    };
    mt.set(n, s);
  }
  return mt.get(n);
}
function Dt(t, e) {
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
function Tr(t) {
  let e = t + ":";
  for (let n of mt.keys())
    n.startsWith(e) && mt.delete(n);
  for (let n of vt.keys())
    n.startsWith(e) && vt.delete(n);
}
const an = "livue-tab-sync";
let or = Date.now() + "-" + Math.random().toString(36).substr(2, 9), ln = null, ar = /* @__PURE__ */ new Map(), Cr = !1;
function Di() {
  Cr || (Cr = !0, typeof BroadcastChannel < "u" ? (ln = new BroadcastChannel(an), ln.onmessage = oa) : window.addEventListener("storage", aa));
}
function oa(t) {
  let e = t.data;
  e.tabId !== or && Ti(e);
}
function aa(t) {
  if (t.key === an && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === or) return;
      Ti(e);
    } catch {
    }
}
function Ti(t) {
  let e = ar.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function la(t, e) {
  Di(), ar.set(t, e);
}
function Lr(t) {
  ar.delete(t);
}
function sa(t, e, n, r) {
  Di();
  let i = {
    tabId: or,
    component: t,
    state: e,
    properties: n,
    config: r
  };
  if (ln)
    ln.postMessage(i);
  else
    try {
      localStorage.setItem(an, JSON.stringify(i)), localStorage.removeItem(an);
    } catch {
    }
}
function ua(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
let kr = 0;
function Yn() {
  return typeof document < "u" && "startViewTransition" in document;
}
const An = /* @__PURE__ */ new WeakMap();
function Nr() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const ca = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (kr++, r = "livue-transition-" + kr), An.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), Yn() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    Nr();
  },
  updated(t, e) {
    let n = An.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), Yn() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    An.delete(t), t.removeAttribute("data-livue-transition"), Nr();
  }
};
function fa(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const lr = /* @__PURE__ */ new Map();
async function da(t, e = {}) {
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
      const { done: p, value: c } = await a.read();
      if (p)
        break;
      l += s.decode(c, { stream: !0 });
      const h = l.split(`
`);
      l = h.pop() || "";
      for (const m of h)
        if (m.trim())
          try {
            const d = JSON.parse(m);
            if (d.stream)
              pa(d.stream), n(d.stream);
            else {
              if (d.error)
                throw new Error(d.error);
              d.snapshot && (u = d);
            }
          } catch (d) {
            console.error("[LiVue Stream] Parse error:", d, m);
          }
    }
    if (l.trim())
      try {
        const p = JSON.parse(l);
        if (p.snapshot)
          u = p;
        else if (p.error)
          throw new Error(p.error);
      } catch (p) {
        console.error("[LiVue Stream] Final parse error:", p, l);
      }
    return r(u), u;
  } catch (o) {
    throw i(o), o;
  }
}
function pa(t) {
  const { to: e, content: n, replace: r } = t, i = lr.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function xr(t, e, n = !1) {
  lr.set(t, { el: e, replace: n });
}
function Ir(t) {
  lr.delete(t);
}
function ha(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function sr(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    ha(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = sr(r) : e[n] = r;
  }
  return e;
}
function ma(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let s = n[a] || {}, l = r[a] || {}, u = sr(s), p = {};
    for (let c in l)
      p[c] = /* @__PURE__ */ (function(h, m) {
        return function() {
          let d = Array.prototype.slice.call(arguments);
          return e(h + "." + m, d);
        };
      })(a, c);
    i[a] = Ie(Object.assign({}, u, p));
  }
  return i;
}
function va(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = sr(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function ga(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
function ya(t) {
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
function ba(t, e) {
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
let Or = 0, Ci = /* @__PURE__ */ new Map();
function wa(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function Ea(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Li(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Ci.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: wa(n)
    });
  });
}
function ki(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Ci.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Ea(n, i.inputs));
  });
}
function Ot(t, e) {
  let n = {}, r = wi(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function Sa(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function Kn(t) {
  if (Sa(t))
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
function sn(t) {
  let e = {};
  for (let n in t)
    e[n] = Kn(t[n]);
  return e;
}
let Ni = {
  ref: tn,
  computed: oo,
  watch: Me,
  watchEffect: io,
  reactive: Ie,
  readonly: ro,
  onMounted: si,
  onUnmounted: ui,
  onBeforeMount: no,
  onBeforeUnmount: to,
  nextTick: nr,
  provide: eo,
  inject: Qi
}, xi = Object.keys(Ni), _a = xi.map(function(t) {
  return Ni[t];
});
function Aa(t) {
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
function Da(t, e, n) {
  let r = Object.keys(e), i = r.map(function(s) {
    return e[s];
  }), o = xi.concat(r).concat(["livue"]), a = _a.concat(i).concat([n]);
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
function Ta(t) {
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
function gt(t, e, n, r, i, o) {
  let a = Ta(t), s = Aa(a);
  return {
    name: o || "LiVueComponent",
    template: s.html,
    setup: function() {
      Xi.provide("livue", n);
      let l = zo(e), u = Object.assign({}, l, r, { livue: n, livueV: i });
      if (s.setupCode) {
        let m = Da(s.setupCode, l, n);
        m && Object.assign(u, m);
      }
      var p = {
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
      }, c = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      function h(m) {
        return typeof m == "string" && !p[m] && c.test(m);
      }
      return new Proxy(u, {
        get: function(m, d, y) {
          if (d in m || typeof d == "symbol") return Reflect.get(m, d, y);
          if (h(d))
            return function() {
              return n.call(d, ...arguments);
            };
        },
        getOwnPropertyDescriptor: function(m, d) {
          var y = Object.getOwnPropertyDescriptor(m, d);
          if (y) return y;
          if (h(d))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(m, d) {
          return !!(d in m || h(d));
        },
        set: function(m, d, y) {
          return m[d] = y, !0;
        },
        ownKeys: function(m) {
          return Reflect.ownKeys(m);
        }
      });
    }
  };
}
function Ca(t, e) {
  for (var n in e) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = t.indexOf(r), a = t.indexOf(i);
    o !== -1 && a !== -1 && (t = t.substring(0, o) + e[n] + t.substring(a + i.length));
  }
  return t;
}
function Gn(t, e, n, r, i, o, a) {
  a = a || {};
  let s = Fo(), l = n.name, u = n.vueMethods || {}, p = n.jsonMethods || [], c = n.confirms || {}, h = n.isolate || !1, m = n.urlParams || null, d = n.uploads || null, y = n.tabSync || null, S = !1, b = i, M = o, x = a.initialHtml || null;
  function P(f) {
    let g = document.querySelector('meta[name="livue-prefix"]'), A = "/" + (g ? g.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), v = document.createElement("a");
    v.href = A, v.download = f.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function T() {
    let f = Ot(b, e);
    return {
      snapshot: M,
      diffs: f
    };
  }
  function L(f, g) {
    if (f.redirect) {
      rr(f.redirect);
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
    if (f.download && P(f.download), f.snapshot) {
      let v = JSON.parse(f.snapshot);
      if (v.state) {
        let j = sn(v.state);
        qo(e, j), b = JSON.parse(JSON.stringify(j));
      }
      M = f.snapshot, v.memo && (v.memo.errors ? he(w.errors, v.memo.errors) : Jn(w.errors), v.memo.vueMethods && (u = v.memo.vueMethods), v.memo.jsonMethods && (p = v.memo.jsonMethods), v.memo.urlParams && (m = v.memo.urlParams), v.memo.uploads && (d = v.memo.uploads), v.memo.confirms && (c = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && va(D, v.memo));
    }
    if (m && Zo(m, e), (f.html || f.fragments) && r && r._updateTemplate) {
      let v = {};
      if (f.snapshot) {
        let j = JSON.parse(f.snapshot);
        j.memo && (j.memo.transitionType && (v.transitionType = j.memo.transitionType), j.memo.skipTransition && (v.skipTransition = !0));
      }
      if (f.fragments) {
        let j = x || (a.el ? a.el.innerHTML : null);
        if (j) {
          let q = Ca(j, f.fragments);
          x = q, r._updateTemplate(q, v);
        }
      } else
        x = f.html, r._updateTemplate(f.html, v);
    }
    if (f.events && f.events.length > 0) {
      for (var _ = 0; _ < f.events.length; _++)
        f.events[_].sourceId = t;
      Go(f.events);
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
      let j = wi(e), q = [];
      for (let $ in j)
        (!g || !($ in g)) && q.push($);
      if (q.length > 0) {
        let $ = ua(j, q, y);
        Object.keys($).length > 0 && sa(l, $, q, y);
      }
    }
    if (S = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let O = Ie({}), F = {}, D = {}, z = function(f, g) {
    return w.call(f, g);
  };
  ga(n) && (D = ma(n, z));
  let w = Ie({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: O,
    refs: {},
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let g = Ot(b, e);
      return f === void 0 ? Object.keys(g).length > 0 : f in g;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = Ot(b, e);
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
      return f ? O[f] || !1 : w.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let g = f ? O[f] || !1 : w.loading;
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
      let j = p.includes(f), q = async function() {
        if (c[f] && !await w._showConfirm(c[f]))
          return;
        w.loading = !0, w.processing = f, O[f] = !0;
        let $;
        try {
          let W = T(), B = await wn(W.snapshot, f, A, W.diffs, h || j);
          $ = L(B, W.diffs);
        } catch (W) {
          if (j)
            throw { status: W.status, errors: W.data && W.data.errors, message: W.message };
          W.status === 422 && W.data && W.data.errors ? he(w.errors, W.data.errors) : We(W, l);
        } finally {
          w.loading = !1, w.processing = null, delete O[f];
        }
        return $;
      };
      return v && v.debounce ? Qe(t + ":" + f, v.debounce)(q) : v && v.throttle ? Dt(t + ":" + f, v.throttle)(q) : q();
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
        let f = T(), g = await wn(f.snapshot, null, [], f.diffs, h);
        L(g, f.diffs);
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
      Ut(f, g, "broadcast", l, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, g, _) {
      Ut(g, _, "to", l, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, g) {
      Ut(f, g, "self", l, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      Tt(f, !0);
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
      if (!d || !d[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var _ = En(e, f);
      _ && _.__livue_upload && _.ref && Sn([_.ref]), w.uploading = !0, w.uploadProgress = 0;
      try {
        var A = await Qo(g, l, f, d[f].token, function(v) {
          w.uploadProgress = v;
        });
        It(e, f, {
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
      if (!d || !d[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      w.uploading = !0, w.uploadProgress = 0;
      try {
        var _ = await ea(g, l, f, d[f].token, function(B) {
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
          It(e, f, q.concat($));
        }
        if (v.length > 0) {
          var W = {};
          v.forEach(function(B) {
            var De = f + "." + B.index;
            W[De] = {
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
        A && A.__livue_upload && A.ref && Sn([A.ref]), _.splice(g, 1), It(e, f, _.slice());
      } else
        _ && _.__livue_upload && _.ref && Sn([_.ref]), It(e, f, null);
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
      g = g || [], w.loading = !0, w.streaming = !0, w.processing = f, w.streamingMethod = f, O[f] = !0;
      let _;
      try {
        let A = T();
        A.method = f, A.params = g, A.componentId = t;
        let v = await da(A, {
          onChunk: function(j) {
          },
          onComplete: function(j) {
          },
          onError: function(j) {
            console.error("[LiVue Stream] Error:", j);
          }
        });
        v && (_ = L(v, A.diffs));
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? he(w.errors, A.data.errors) : We(A, l);
      } finally {
        w.loading = !1, w.streaming = !1, w.processing = null, w.streamingMethod = null, delete O[f];
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
      }) : Me(
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
      }) : (Bo(t, f), function() {
        Xn(t);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: Ie({
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
      b = JSON.parse(JSON.stringify(f)), M = g;
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
      let f = Ot(b, e), g = {};
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
          isolate: h,
          urlParams: m,
          tabSync: y,
          hasUploads: !!d,
          uploadProps: d ? Object.keys(d) : [],
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
    w.loading = !0, w.processing = "$refresh", O.$refresh = !0;
    try {
      let f = T(), g = await wn(f.snapshot, null, [], f.diffs, h);
      return L(g, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? he(w.errors, f.data.errors) : We(f, l);
    } finally {
      w.loading = !1, w.processing = null, delete O.$refresh;
    }
  }
  F.$refresh = function() {
    return Y();
  }, y && y.enabled && la(l, function(f, g, _) {
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
function Jt(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let l = 0; l < r.length; l++)
    r[l].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(l) {
    let u = l.dataset.livueId, p = l.dataset.livueSnapshot || "{}", c = JSON.parse(p), h = c.memo ? c.memo.name : "", m = sn(c.state || {}), d = c.memo || {}, y = l.innerHTML, S = l.tagName.toLowerCase(), b = e._childRegistry[u];
    if (!b)
      for (let D in e._childRegistry) {
        let z = e._childRegistry[D];
        if (z.name === h && !o[D]) {
          b = z;
          break;
        }
      }
    if (b) {
      o[b.id] = !0, b.rootTag = S;
      let D = d.reactive || [];
      if (D.length > 0) {
        for (var M = 0; M < D.length; M++) {
          var x = D[M];
          x in m && (b.state[x] = m[x]);
        }
        b.livue._updateServerState(m, p), b.componentRef && b.componentRef._updateTemplate && b.componentRef._updateTemplate(y);
      }
    }
    let P = !b;
    if (!b) {
      Or++;
      let D = "livue-child-" + Or, z = $n(m), w = JSON.parse(JSON.stringify(m)), Y = Object.assign({ name: d.name || h }, d), K = { _updateTemplate: null }, ne = vi(), f = Gn(u, z, Y, K, w, p, {
        el: l,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: ne
      }), g = f.livue, _ = f.composables;
      fe("component.init", {
        component: { id: u, name: h, state: z, livue: g },
        el: l,
        cleanup: ne.cleanup,
        isChild: !0
      });
      let A = d.errors || null;
      A && he(g.errors, A), b = {
        tagName: D,
        state: z,
        memo: Y,
        livue: g,
        composables: _,
        componentRef: K,
        name: h,
        id: u,
        rootTag: S
      };
      let v = d.listeners || null;
      if (v)
        for (let q in v)
          (function($, W) {
            rn(q, h, u, function(B) {
              W.call($, B);
            });
          })(v[q], g);
      let j = d.echo || null;
      j && j.length && (function(q, $) {
        _i(q, j, function(W, B) {
          $.call(W, B);
        });
      })(u, g), K._updateTemplate = function(q) {
        let $ = e.el.querySelector('[data-livue-id="' + u + '"]');
        $ && Li($);
        let W = Jt(q, e), B = on(
          W.template,
          'data-livue-id="' + u + '"'
        );
        if (e.vueApp) {
          for (let De in W.childDefs)
            e.vueApp._context.components[De] || e.vueApp.component(De, W.childDefs[De]);
          e.vueApp._context.components[b.tagName] = gt(B, b.state, b.livue, b.composables || {}, e._versions, b.name), e._versions[b.tagName] = (e._versions[b.tagName] || 0) + 1, nr(function() {
            let De = e.el.querySelector('[data-livue-id="' + u + '"]');
            De && ki(De);
          });
        }
      }, e._childRegistry[u] = b;
    }
    let T = b.tagName, L = l.dataset.livueRef;
    L && e._rootLivue && (e._rootLivue.refs[L] = {
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
    let O = l.dataset.livueModel;
    if (O && e._rootState && rn("$modelUpdate", b.name, u, function(D) {
      D && D.value !== void 0 && (e._rootState[O] = D.value);
    }), P) {
      let D = on(
        "<" + S + ">" + y + "</" + S + ">",
        'data-livue-id="' + u + '"'
      );
      i[T] = gt(
        D,
        b.state,
        b.livue,
        b.composables || {},
        e._versions,
        b.name
      );
    }
    e._versions[T] === void 0 && (e._versions[T] = 0);
    let F = document.createElement(T);
    F.setAttribute(":key", "livueV['" + T + "']"), l.parentNode.replaceChild(F, l);
  });
  let s = n.querySelectorAll("[data-livue-island]");
  for (let l = 0; l < s.length; l++)
    s[l].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
class La {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = $n(sn(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Ie({}), this._rootDefRef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: Gn,
      buildComponentDef: gt,
      processTemplate: Jt,
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
        var b = ya(r.el);
        Li(r.el);
        let M = Jt(y, r);
        if (!r.vueApp) return;
        for (let P in M.childDefs)
          r.vueApp._context.components[P] || r.vueApp.component(P, M.childDefs[P]);
        function x() {
          r._rootDefRef.value = gt(M.template, r.state, r._rootLivue, r._rootComposables || {}, r._versions, r.name), nr(function() {
            ki(r.el), ba(r.el, b), fe("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (S.skipTransition) {
          x();
          return;
        }
        Yn() ? fa(x, { type: S.transitionType }) : x();
      }
    }, o = JSON.parse(JSON.stringify(sn(e.state || {})));
    this._cleanups = vi();
    let a = Gn(this.componentId, this.state, this.memo, i, o, n, {
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
    let u = Jt(this.el.innerHTML, this), p = e.memo && e.memo.errors || null;
    p && he(s.errors, p);
    let c = e.memo && e.memo.listeners || null;
    if (c)
      for (let y in c)
        (function(S, b, M, x) {
          rn(y, M, x, function(P) {
            b.call(S, P);
          });
        })(c[y], s, r.name, r.componentId);
    let h = e.memo && e.memo.echo || null;
    h && h.length && (this._echoUnsubscribe = _i(r.componentId, h, function(y, S) {
      s.call(y, S);
    }));
    let m = gt(u.template, r.state, s, l, r._versions, r.name);
    this._rootDefRef = li(m), this.vueApp = ao({
      setup: function() {
        return {
          rootDef: r._rootDefRef
        };
      },
      template: '<component :is="rootDef"></component>'
    });
    let d;
    for (d in u.childDefs)
      this.vueApp._context.components[d] || this.vueApp.component(d, u.childDefs[d]);
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", ia(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = na();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = $o();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Ar(e), Tr(e), Xn(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Lr(n.name), Sr(e);
    }
    if (fe("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Ar(this.componentId), Tr(this.componentId), Xn(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Lr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Sr(this.componentId), this.vueApp) {
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
let Mr = /* @__PURE__ */ new Set();
const ka = {
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
    Mr.has(u) || (Mr.add(u), r.call(s, l));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Dn = /* @__PURE__ */ new WeakMap(), Na = {
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
}, Mt = /* @__PURE__ */ new WeakMap(), xa = {
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
    let p = "0px";
    if (l) {
      let d = parseInt(l, 10);
      isNaN(d) || (p = d + "px");
    }
    let c = s.leave === !0, h = !1, m = new IntersectionObserver(
      function(d) {
        let y = d[0];
        (c ? !y.isIntersecting : y.isIntersecting) && (!s.once || !h) && (h = !0, r.call(o, a), s.once && (m.disconnect(), Mt.delete(t)));
      },
      {
        threshold: u,
        rootMargin: p
      }
    );
    m.observe(t), Mt.set(t, m);
  },
  unmounted(t) {
    let e = Mt.get(t);
    e && (e.disconnect(), Mt.delete(t));
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
const Ia = {
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
let Pr = 0;
const Oa = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    Pr++;
    let n = "livue-ignore-" + Pr;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, rt = /* @__PURE__ */ new WeakMap();
let Rr = 0;
function Ma(t) {
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
function Pa(t) {
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
function Pt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Vr(t, e) {
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
function Ra(t) {
  return !!t.component;
}
const Va = {
  mounted(t, e, n) {
    let r = Ma(n);
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
    Rr++;
    let l = "model-" + Rr, u = "input";
    s.blur && (u = "blur"), (s.change || s.lazy) && (u = "change");
    let { debounceMs: p, throttleMs: c } = Pa(s);
    s.live && !p && !c && (p = 150);
    function h(T) {
      if (s.number) {
        let L = Number(T);
        T = isNaN(L) ? 0 : L;
      }
      s.boolean && (T = !!T && T !== "false" && T !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = T : o[a] = T;
    }
    function m(T) {
      p > 0 ? Qe(l, p)(function() {
        h(T);
      }) : c > 0 ? Dt(l, c)(function() {
        h(T);
      }) : h(T);
    }
    let d;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? d = o[a].value : d = o[a];
    let y = Ra(n), S = n.component, b = null, M = null, x = null, P = null;
    if (y && S)
      P = S.emit, S.emit = function(T, ...L) {
        if (T === "update:modelValue") {
          let O = L[0];
          m(O);
          return;
        }
        return P.call(S, T, ...L);
      }, S.props && "modelValue" in S.props && (x = Me(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(T) {
          S.vnode && S.vnode.props && (S.vnode.props.modelValue = T), S.exposed && typeof S.exposed.setValue == "function" && S.exposed.setValue(T), S.update && S.update();
        },
        { immediate: !0 }
      )), rt.set(t, {
        isComponent: !0,
        componentInstance: S,
        originalEmit: P,
        stopWatcher: x,
        property: a,
        state: o,
        modifiers: s
      });
    else {
      if (p > 0) {
        let T = Qe(l, p);
        b = function(L) {
          let O = Pt(L.target);
          T(function() {
            h(O);
          });
        };
      } else if (c > 0) {
        let T = Dt(l, c);
        b = function(L) {
          let O = Pt(L.target);
          T(function() {
            h(O);
          });
        };
      } else
        b = function(T) {
          h(Pt(T.target));
        };
      s.enter ? (M = function(T) {
        T.key === "Enter" && h(Pt(T.target));
      }, t.addEventListener("keyup", M)) : t.addEventListener(u, b), Vr(t, d), rt.set(t, {
        isComponent: !1,
        handler: b,
        keyHandler: M,
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
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], Vr(t, a);
    }
  },
  unmounted(t) {
    let e = rt.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), rt.delete(t));
  }
}, Ln = /* @__PURE__ */ new WeakMap(), Ha = 2500;
function ja(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Ha;
}
const qa = {
  mounted(t, e, n) {
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let s = e.modifiers || {}, l = ja(s), u = s["keep-alive"] === !0, p = s.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !p,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function h() {
      c.isPaused || p && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function m() {
      c.intervalId || (c.intervalId = setInterval(h, l));
    }
    function d() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    p && (c.observer = new IntersectionObserver(
      function(y) {
        c.isVisible = y[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", d), c.visibilityHandler = d, m(), Ln.set(t, c);
  },
  unmounted(t) {
    let e = Ln.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), Ln.delete(t));
  }
}, Rt = /* @__PURE__ */ new WeakMap();
let un = typeof navigator < "u" ? navigator.onLine : !0, cn = /* @__PURE__ */ new Set(), Hr = !1;
function za() {
  Hr || typeof window > "u" || (Hr = !0, window.addEventListener("online", function() {
    un = !0, cn.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    un = !1, cn.forEach(function(t) {
      t(!1);
    });
  }));
}
const Fa = {
  created(t, e) {
    za();
    let n = e.modifiers || {}, r = e.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = t.style.display || "", un && (t.style.display = "none")), Rt.set(t, o);
  },
  mounted(t, e) {
    let n = Rt.get(t);
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
    r(un), n.updateFn = r, cn.add(r);
  },
  unmounted(t) {
    let e = Rt.get(t);
    e && e.updateFn && cn.delete(e.updateFn), Rt.delete(t);
  }
};
let jr = 0;
const it = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new Map(), Wa = {
  created(t, e) {
    jr++;
    let n = "livue-replace-" + jr, r = e.modifiers.self === !0;
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
}, ot = /* @__PURE__ */ new WeakMap(), qr = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Ba = 200;
function $a(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(qr))
    if (t[e])
      return qr[e];
  return Ba;
}
function Nn(t, e, n, r, i) {
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
    let i = ot.get(t), o = e.modifiers || {}, a = $a(o), s = e.value, l = null, u = null;
    o.class || o.attr ? u = s : typeof s == "string" && (l = s);
    function p(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Nn(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, Nn(t, i, o, u, !0)) : (i.isActive = !1, Nn(t, i, o, u, !1));
    }
    i.stopWatch = Me(
      function() {
        return l ? r.isLoading(l) : r.loading;
      },
      p,
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
}, Vt = /* @__PURE__ */ new WeakMap(), Ja = {
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
    let o = Me(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? t.setAttribute("data-loading", "") : t.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    Vt.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = Vt.get(t), i = ve(n);
    if (!r || !i) return;
    let o = e.value, a = e.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Me(
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
    let e = Vt.get(t);
    e && (e.stopWatch && e.stopWatch(), Vt.delete(t));
  }
}, at = /* @__PURE__ */ new WeakMap(), Xa = {
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
    at.set(t, { targetId: n }), xr(n, t, r);
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
      Ir(n.targetId);
      const i = e.modifiers.replace || !1;
      xr(r, t, i), at.set(t, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = at.get(t);
    e && (Ir(e.targetId), at.delete(t));
  }
}, zr = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, Fr = ["ctrl", "alt", "shift", "meta"];
let Wr = 0;
function Ya(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
}
function Ka(t, e) {
  for (let i = 0; i < Fr.length; i++) {
    let o = Fr[i];
    if (e[o] && !t[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in zr)
    e[i] && (n = !0, t.key === zr[i] && (r = !0));
  return !(n && !r);
}
function H(t, e = {}) {
  let n = e.supportsOutside === !0, r = e.isKeyboardEvent === !0;
  const i = /* @__PURE__ */ new WeakMap();
  return {
    mounted(o, a, s) {
      const { arg: l, modifiers: u } = a, p = ve(s);
      if (!p) {
        console.warn("[LiVue] v-" + t + ": livue helper not found in component context");
        return;
      }
      Wr++;
      const c = "v-" + t + "-" + Wr, h = Ya(u);
      let m = null, d = null;
      u.debounce && (m = Qe(c, h)), u.throttle && (d = Dt(c, h));
      let y = !1, S = null;
      l && (S = l);
      const b = function(T) {
        let L = S, O = [];
        if (l) {
          L = l;
          const D = a.value;
          D != null && (O = Array.isArray(D) ? D : [D]);
        } else {
          const D = a.value;
          if (typeof D == "function") {
            const z = function() {
              D();
            };
            m ? m(z) : d ? d(z) : z();
            return;
          } else typeof D == "string" ? L = D : Array.isArray(D) && D.length > 0 && (L = D[0], O = D.slice(1));
        }
        if (!L) {
          console.warn("[LiVue] v-" + t + ": no method specified");
          return;
        }
        const F = function() {
          u.confirm ? p.callWithConfirm(L, "Are you sure?", ...O) : p.call(L, ...O);
        };
        m ? m(F) : d ? d(F) : F();
      }, M = function(T) {
        if (!(u.self && T.target !== o) && !(r && !Ka(T, u))) {
          if (u.once) {
            if (y)
              return;
            y = !0;
          }
          u.prevent && T.preventDefault(), u.stop && T.stopPropagation(), b();
        }
      }, x = {};
      u.capture && (x.capture = !0), u.passive && (x.passive = !0);
      const P = {
        handler: M,
        options: x,
        outsideHandler: null
      };
      if (n && u.outside) {
        const T = function(L) {
          if (!o.contains(L.target) && L.target !== o) {
            if (u.once) {
              if (y)
                return;
              y = !0;
            }
            b();
          }
        };
        document.addEventListener(t, T, x), P.outsideHandler = T;
      } else
        o.addEventListener(t, M, x);
      i.set(o, P);
    },
    updated(o, a, s) {
    },
    unmounted(o) {
      const a = i.get(o);
      a && (a.outsideHandler ? document.removeEventListener(t, a.outsideHandler, a.options) : o.removeEventListener(t, a.handler, a.options), i.delete(o));
    }
  };
}
const Ga = H("click", { supportsOutside: !0 }), Za = {
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
let Br = 0;
const Qa = {
  created(t, e) {
    let n = e.value;
    n || (Br++, n = "scroll-" + Br), t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n;
  },
  updated(t, e) {
    let n = e.value;
    n && n !== t.__livue_scroll_key && (t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n);
  },
  unmounted(t) {
    t.removeAttribute("data-livue-scroll"), delete t.__livue_scroll_key;
  }
}, lt = /* @__PURE__ */ new WeakMap();
function $r(t, e, n, r, i) {
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
    i.stopWatch = Me(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(l) {
        $r(t, i, o, s, l);
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
        $r(t, r, e.modifiers || {}, e.value, a);
      }
    }
  },
  unmounted(t) {
    let e = lt.get(t);
    e && (e.stopWatch && e.stopWatch(), lt.delete(t));
  }
}, Ht = /* @__PURE__ */ new WeakMap();
let Ur = 0;
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
    let { livue: o, state: a } = r, s = e.modifiers || {};
    Ur++;
    let l = "watch-" + i + "-" + Ur;
    if (s.blur) {
      let h = function() {
        o.sync();
      };
      t.addEventListener("focusout", h), Ht.set(t, { blurHandler: h });
      return;
    }
    let u = tl(s) || 150, p = Qe(l, u), c = Me(
      function() {
        return rl(a, i);
      },
      function() {
        p(function() {
          return o.sync();
        });
      }
    );
    Ht.set(t, { stopWatcher: c });
  },
  unmounted(t) {
    let e = Ht.get(t);
    e && (e.stopWatcher && e.stopWatcher(), e.blurHandler && t.removeEventListener("focusout", e.blurHandler), Ht.delete(t));
  }
}, yt = /* @__PURE__ */ new WeakMap();
let Jr = 0;
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
function Ct(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Lt(t, e, n) {
  let r = t[e];
  r && typeof r == "object" && "value" in r ? r.value = n : t[e] = n;
}
function Ii(t) {
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
function kt(t, e) {
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
      let { state: s } = a, l = sl(s, o);
      if (!l)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Jr++;
      let p = t + "-" + Jr, c = cl(n);
      if (!c) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let h = e(c, l, s, u, p);
      c.addEventListener(h.eventType, h.handler, { capture: !0 }), yt.set(n, {
        targetEl: c,
        handler: h.handler,
        eventType: h.eventType
      });
    },
    unmounted(n) {
      let r = yt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), yt.delete(n));
    }
  };
}
const fl = kt("debounce", function(t, e, n, r, i) {
  let o = Ii(r) || 150, a = Qe(i, o);
  return {
    eventType: "input",
    handler: function(s) {
      s.stopImmediatePropagation();
      let l = Ct(s.target);
      a(function() {
        Lt(n, e, l);
      });
    }
  };
}), dl = kt("throttle", function(t, e, n, r, i) {
  let o = Ii(r) || 150, a = Dt(i, o);
  return {
    eventType: "input",
    handler: function(s) {
      s.stopImmediatePropagation();
      let l = Ct(s.target);
      a(function() {
        Lt(n, e, l);
      });
    }
  };
}), ur = kt("blur", function(t, e, n, r, i) {
  let o = function(s) {
    s.stopImmediatePropagation();
  }, a = function(s) {
    Lt(n, e, Ct(s.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), pl = ur.unmounted;
ur.unmounted = function(t) {
  let e = yt.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), pl(t);
};
const cr = kt("enter", function(t, e, n, r, i) {
  let o = function(s) {
    s.stopImmediatePropagation();
  }, a = function(s) {
    s.key === "Enter" && Lt(n, e, Ct(s.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), hl = cr.unmounted;
cr.unmounted = function(t) {
  let e = yt.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), hl(t);
};
const ml = kt("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = Ct(o.target);
      a = !!a && a !== "false" && a !== "0", Lt(n, e, a);
    }
  };
});
function Xr(t, e) {
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
    e % 2 ? Xr(Object(n), !0).forEach(function(r) {
      vl(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Xr(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Xt(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Xt = function(e) {
    return typeof e;
  } : Xt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Xt(t);
}
function vl(t, e, n) {
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
function Se(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var Ae = Se(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Nt = Se(/Edge/i), Yr = Se(/firefox/i), bt = Se(/safari/i) && !Se(/chrome/i) && !Se(/android/i), fr = Se(/iP(ad|od|hone)/i), Oi = Se(/chrome/i) && Se(/android/i), Mi = {
  capture: !1,
  passive: !1
};
function V(t, e, n) {
  t.addEventListener(e, n, !Ae && Mi);
}
function R(t, e, n) {
  t.removeEventListener(e, n, !Ae && Mi);
}
function fn(t, e) {
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
function Pi(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function me(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && fn(t, e) : fn(t, e)) || r && t === n)
        return t;
      if (t === n) break;
    } while (t = Pi(t));
  }
  return null;
}
var Kr = /\s+/g;
function le(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(Kr, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(Kr, " ");
    }
}
function k(t, e, n) {
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
      var r = k(t, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!e && (t = t.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function Ri(t, e, n) {
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
    var o, a, s, l, u, p, c;
    if (t !== window && t.parentNode && t !== ge() ? (o = t.getBoundingClientRect(), a = o.top, s = o.left, l = o.bottom, u = o.right, p = o.height, c = o.width) : (a = 0, s = 0, l = window.innerHeight, u = window.innerWidth, p = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !Ae))
      do
        if (i && i.getBoundingClientRect && (k(i, "transform") !== "none" || n && k(i, "position") !== "static")) {
          var h = i.getBoundingClientRect();
          a -= h.top + parseInt(k(i, "border-top-width")), s -= h.left + parseInt(k(i, "border-left-width")), l = a + o.height, u = s + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var m = Ze(i || t), d = m && m.a, y = m && m.d;
      m && (a /= y, s /= d, c /= d, p /= y, l = a + p, u = s + c);
    }
    return {
      top: a,
      left: s,
      bottom: l,
      right: u,
      width: c,
      height: p
    };
  }
}
function Gr(t, e, n) {
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
    if (a[o].style.display !== "none" && a[o] !== N.ghost && (r || a[o] !== N.dragged) && me(a[o], n.draggable, t, !1)) {
      if (i === e)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function dr(t, e) {
  for (var n = t.lastElementChild; n && (n === N.ghost || k(n, "display") === "none" || e && !fn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function ce(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== N.clone && (!e || fn(t, e)) && n++;
  return n;
}
function Zr(t) {
  var e = 0, n = 0, r = ge();
  if (t)
    do {
      var i = Ze(t), o = i.a, a = i.d;
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
function xe(t, e) {
  if (!t || !t.getBoundingClientRect) return ge();
  var n = t, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = k(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ge();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ge();
}
function El(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function xn(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var wt;
function Vi(t, e) {
  return function() {
    if (!wt) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), wt = setTimeout(function() {
        wt = void 0;
      }, e);
    }
  };
}
function Sl() {
  clearTimeout(wt), wt = void 0;
}
function Hi(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function ji(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function qi(t, e, n) {
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
function _l() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(k(i, "display") === "none" || i === N.ghost)) {
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
      t.forEach(function(s) {
        var l = 0, u = s.target, p = u.fromRect, c = Z(u), h = u.prevFromRect, m = u.prevToRect, d = s.rect, y = Ze(u, !0);
        y && (c.top -= y.f, c.left -= y.e), u.toRect = c, u.thisAnimationDuration && xn(h, c) && !xn(p, c) && // Make sure animatingRect is on line between toRect & fromRect
        (d.top - c.top) / (d.left - c.left) === (p.top - c.top) / (p.left - c.left) && (l = Dl(d, h, m, i.options)), xn(c, p) || (u.prevFromRect = p, u.prevToRect = c, l || (l = i.options.animation), i.animate(u, d, c, l)), l && (o = !0, a = Math.max(a, l), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, l), u.thisAnimationDuration = l);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        k(r, "transition", ""), k(r, "transform", "");
        var s = Ze(this.el), l = s && s.a, u = s && s.d, p = (i.left - o.left) / (l || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!p, r.animatingY = !!c, k(r, "transform", "translate3d(" + p + "px," + c + "px,0)"), this.forRepaintDummy = Al(r), k(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), k(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          k(r, "transition", ""), k(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Al(t) {
  return t.offsetWidth;
}
function Dl(t, e, n, r) {
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
function Tl(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, s = t.fromEl, l = t.oldIndex, u = t.newIndex, p = t.oldDraggableIndex, c = t.newDraggableIndex, h = t.originalEvent, m = t.putSortable, d = t.extraEventProperties;
  if (e = e || n && n[ae], !!e) {
    var y, S = e.options, b = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !Ae && !Nt ? y = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (y = document.createEvent("Event"), y.initEvent(r, !0, !0)), y.to = a || n, y.from = s || n, y.item = i || n, y.clone = o, y.oldIndex = l, y.newIndex = u, y.oldDraggableIndex = p, y.newDraggableIndex = c, y.originalEvent = h, y.pullMode = m ? m.lastPutMode : void 0;
    var M = ye(ye({}, d), xt.getEventProperties(r, e));
    for (var x in M)
      y[x] = M[x];
    n && n.dispatchEvent(y), S[b] && S[b].call(e, y);
  }
}
var Cl = ["evt"], oe = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = yl(r, Cl);
  xt.pluginEvent.bind(N)(e, n, ye({
    dragEl: E,
    parentEl: X,
    ghostEl: I,
    rootEl: U,
    nextEl: qe,
    lastDownEl: Yt,
    cloneEl: J,
    cloneHidden: ke,
    dragStarted: ct,
    putSortable: ee,
    activeSortable: N.active,
    originalEvent: i,
    oldIndex: Ye,
    oldDraggableIndex: Et,
    newIndex: se,
    newDraggableIndex: Te,
    hideGhostForTarget: Bi,
    unhideGhostForTarget: $i,
    cloneNowHidden: function() {
      ke = !0;
    },
    cloneNowShown: function() {
      ke = !1;
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
  Tl(ye({
    putSortable: ee,
    cloneEl: J,
    targetEl: E,
    rootEl: U,
    oldIndex: Ye,
    oldDraggableIndex: Et,
    newIndex: se,
    newDraggableIndex: Te
  }, t));
}
var E, X, I, U, qe, Yt, J, ke, Ye, se, Et, Te, jt, ee, Xe = !1, dn = !1, pn = [], Ve, pe, On, Mn, Qr, ei, ct, $e, St, _t = !1, qt = !1, Kt, te, Pn = [], Zn = !1, hn = [], yn = typeof document < "u", zt = fr, ti = Nt || Ae ? "cssFloat" : "float", Ll = yn && !Oi && !fr && "draggable" in document.createElement("div"), zi = (function() {
  if (yn) {
    if (Ae)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Fi = function(e, n) {
  var r = k(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = et(e, 0, n), a = et(e, 1, n), s = o && k(o), l = a && k(a), u = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Z(o).width, p = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Z(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return o && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || u >= i && r[ti] === "none" || a && r[ti] === "none" && u + p > i) ? "vertical" : "horizontal";
}, kl = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, s = r ? n.left : n.top, l = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === s || o === l || i + a / 2 === s + u / 2;
}, Nl = function(e, n) {
  var r;
  return pn.some(function(i) {
    var o = i[ae].options.emptyInsertThreshold;
    if (!(!o || dr(i))) {
      var a = Z(i), s = e >= a.left - o && e <= a.right + o, l = n >= a.top - o && n <= a.bottom + o;
      if (s && l)
        return r = i;
    }
  }), r;
}, Wi = function(e) {
  function n(o, a) {
    return function(s, l, u, p) {
      var c = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (o == null && (a || c))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(s, l, u, p), a)(s, l, u, p);
      var h = (a ? s : l).options.group.name;
      return o === !0 || typeof o == "string" && o === h || o.join && o.indexOf(h) > -1;
    };
  }
  var r = {}, i = e.group;
  (!i || Xt(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, Bi = function() {
  !zi && I && k(I, "display", "none");
}, $i = function() {
  !zi && I && k(I, "display", "");
};
yn && !Oi && document.addEventListener("click", function(t) {
  if (dn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), dn = !1, !1;
}, !0);
var He = function(e) {
  if (E) {
    e = e.touches ? e.touches[0] : e;
    var n = Nl(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ae]._onDragOver(r);
    }
  }
}, xl = function(e) {
  E && E.parentNode[ae]._isOutsideThisEl(e.target);
};
function N(t, e) {
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
      return Fi(t, this.options);
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
    supportPointer: N.supportPointer !== !1 && "PointerEvent" in window && (!bt || fr),
    emptyInsertThreshold: 5
  };
  xt.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Wi(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Ll, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? V(t, "pointerdown", this._onTapStart) : (V(t, "mousedown", this._onTapStart), V(t, "touchstart", this._onTapStart)), this.nativeDraggable && (V(t, "dragover", this), V(t, "dragenter", this)), pn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), _e(this, _l());
}
N.prototype = /** @lends Sortable.prototype */
{
  constructor: N,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && ($e = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, E) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, p = i.filter;
      if (jl(r), !E && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && bt && l && l.tagName.toUpperCase() === "SELECT") && (l = me(l, i.draggable, r, !1), !(l && l.animated) && Yt !== l)) {
        if (Ye = ce(l), Et = ce(l, i.draggable), typeof p == "function") {
          if (p.call(this, e, l, this)) {
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
        } else if (p && (p = p.split(",").some(function(c) {
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
        }), p)) {
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
      if (U = o, E = r, X = E.parentNode, qe = E.nextSibling, Yt = r, jt = a.group, N.dragged = E, Ve = {
        target: E,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, Qr = Ve.clientX - u.left, ei = Ve.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, E.style["will-change"] = "all", l = function() {
        if (oe("delayEnded", i, {
          evt: e
        }), N.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Yr && i.nativeDraggable && (E.draggable = !0), i._triggerDragStart(e, n), re({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), le(E, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(p) {
        Ri(E, p.trim(), Rn);
      }), V(s, "dragover", He), V(s, "mousemove", He), V(s, "touchmove", He), a.supportPointer ? (V(s, "pointerup", i._onDrop), !this.nativeDraggable && V(s, "pointercancel", i._onDrop)) : (V(s, "mouseup", i._onDrop), V(s, "touchend", i._onDrop), V(s, "touchcancel", i._onDrop)), Yr && this.nativeDraggable && (this.options.touchStartThreshold = 4, E.draggable = !0), oe("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Nt || Ae))) {
        if (N.eventCanceled) {
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
      document.selection ? Gt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (Xe = !1, U && E) {
      oe("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && V(document, "dragover", xl);
      var r = this.options;
      !e && le(E, r.dragClass, !1), le(E, r.ghostClass, !0), N.active = this, e && this._appendGhost(), re({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (pe) {
      this._lastX = pe.clientX, this._lastY = pe.clientY, Bi();
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
        } while (n = Pi(n));
      $i();
    }
  },
  _onTouchMove: function(e) {
    if (Ve) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = I && Ze(I, !0), s = I && a && a.a, l = I && a && a.d, u = zt && te && Zr(te), p = (o.clientX - Ve.clientX + i.x) / (s || 1) + (u ? u[0] - Pn[0] : 0) / (s || 1), c = (o.clientY - Ve.clientY + i.y) / (l || 1) + (u ? u[1] - Pn[1] : 0) / (l || 1);
      if (!N.active && !Xe) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (I) {
        a ? (a.e += p - (On || 0), a.f += c - (Mn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: p,
          f: c
        };
        var h = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        k(I, "webkitTransform", h), k(I, "mozTransform", h), k(I, "msTransform", h), k(I, "transform", h), On = p, Mn = c, pe = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!I) {
      var e = this.options.fallbackOnBody ? document.body : U, n = Z(E, !0, zt, !0, e), r = this.options;
      if (zt) {
        for (te = e; k(te, "position") === "static" && k(te, "transform") === "none" && te !== document; )
          te = te.parentNode;
        te !== document.body && te !== document.documentElement ? (te === document && (te = ge()), n.top += te.scrollTop, n.left += te.scrollLeft) : te = ge(), Pn = Zr(te);
      }
      I = E.cloneNode(!0), le(I, r.ghostClass, !1), le(I, r.fallbackClass, !0), le(I, r.dragClass, !0), k(I, "transition", ""), k(I, "transform", ""), k(I, "box-sizing", "border-box"), k(I, "margin", 0), k(I, "top", n.top), k(I, "left", n.left), k(I, "width", n.width), k(I, "height", n.height), k(I, "opacity", "0.8"), k(I, "position", zt ? "absolute" : "fixed"), k(I, "zIndex", "100000"), k(I, "pointerEvents", "none"), N.ghost = I, e.appendChild(I), k(I, "transform-origin", Qr / parseInt(I.style.width) * 100 + "% " + ei / parseInt(I.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var r = this, i = e.dataTransfer, o = r.options;
    if (oe("dragStart", this, {
      evt: e
    }), N.eventCanceled) {
      this._onDrop();
      return;
    }
    oe("setupClone", this), N.eventCanceled || (J = ji(E), J.removeAttribute("id"), J.draggable = !1, J.style["will-change"] = "", this._hideClone(), le(J, this.options.chosenClass, !1), N.clone = J), r.cloneId = Gt(function() {
      oe("clone", r), !N.eventCanceled && (r.options.removeCloneOnHide || U.insertBefore(J, E), r._hideClone(), re({
        sortable: r,
        name: "clone"
      }));
    }), !n && le(E, o.dragClass, !0), n ? (dn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (R(document, "mouseup", r._onDrop), R(document, "touchend", r._onDrop), R(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, E)), V(document, "drop", r), k(E, "transform", "translateZ(0)")), Xe = !0, r._dragStartId = Gt(r._dragStarted.bind(r, n, e)), V(document, "selectstart", r), ct = !0, window.getSelection().removeAllRanges(), bt && k(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, s = this.options, l = s.group, u = N.active, p = jt === l, c = s.sort, h = ee || u, m, d = this, y = !1;
    if (Zn) return;
    function S(A, v) {
      oe(A, d, ye({
        evt: e,
        isOwner: p,
        axis: m ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: h,
        target: r,
        completed: M,
        onMove: function(q, $) {
          return Ft(U, n, E, i, q, Z(q), e, $);
        },
        changed: x
      }, v));
    }
    function b() {
      S("dragOverAnimationCapture"), d.captureAnimationState(), d !== h && h.captureAnimationState();
    }
    function M(A) {
      return S("dragOverCompleted", {
        insertion: A
      }), A && (p ? u._hideClone() : u._showClone(d), d !== h && (le(E, ee ? ee.options.ghostClass : u.options.ghostClass, !1), le(E, s.ghostClass, !0)), ee !== d && d !== N.active ? ee = d : d === N.active && ee && (ee = null), h === d && (d._ignoreWhileAnimating = r), d.animateAll(function() {
        S("dragOverAnimationComplete"), d._ignoreWhileAnimating = null;
      }), d !== h && (h.animateAll(), h._ignoreWhileAnimating = null)), (r === E && !E.animated || r === n && !r.animated) && ($e = null), !s.dragoverBubble && !e.rootEl && r !== document && (E.parentNode[ae]._isOutsideThisEl(e.target), !A && He(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), y = !0;
    }
    function x() {
      se = ce(E), Te = ce(E, s.draggable), re({
        sortable: d,
        name: "change",
        toEl: n,
        newIndex: se,
        newDraggableIndex: Te,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = me(r, s.draggable, n, !0), S("dragOver"), N.eventCanceled) return y;
    if (E.contains(e.target) || r.animated && r.animatingX && r.animatingY || d._ignoreWhileAnimating === r)
      return M(!1);
    if (dn = !1, u && !s.disabled && (p ? c || (a = X !== U) : ee === this || (this.lastPutMode = jt.checkPull(this, u, E, e)) && l.checkPut(this, u, E, e))) {
      if (m = this._getDirection(e, r) === "vertical", i = Z(E), S("dragOverValid"), N.eventCanceled) return y;
      if (a)
        return X = U, b(), this._hideClone(), S("revert"), N.eventCanceled || (qe ? U.insertBefore(E, qe) : U.appendChild(E)), M(!0);
      var P = dr(n, s.draggable);
      if (!P || Pl(e, m, this) && !P.animated) {
        if (P === E)
          return M(!1);
        if (P && n === e.target && (r = P), r && (o = Z(r)), Ft(U, n, E, i, r, o, e, !!r) !== !1)
          return b(), P && P.nextSibling ? n.insertBefore(E, P.nextSibling) : n.appendChild(E), X = n, x(), M(!0);
      } else if (P && Ml(e, m, this)) {
        var T = et(n, 0, s, !0);
        if (T === E)
          return M(!1);
        if (r = T, o = Z(r), Ft(U, n, E, i, r, o, e, !1) !== !1)
          return b(), n.insertBefore(E, T), X = n, x(), M(!0);
      } else if (r.parentNode === n) {
        o = Z(r);
        var L = 0, O, F = E.parentNode !== n, D = !kl(E.animated && E.toRect || i, r.animated && r.toRect || o, m), z = m ? "top" : "left", w = Gr(r, "top", "top") || Gr(E, "top", "top"), Y = w ? w.scrollTop : void 0;
        $e !== r && (O = o[z], _t = !1, qt = !D && s.invertSwap || F), L = Rl(e, r, o, m, D ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, qt, $e === r);
        var K;
        if (L !== 0) {
          var ne = ce(E);
          do
            ne -= L, K = X.children[ne];
          while (K && (k(K, "display") === "none" || K === I));
        }
        if (L === 0 || K === r)
          return M(!1);
        $e = r, St = L;
        var f = r.nextElementSibling, g = !1;
        g = L === 1;
        var _ = Ft(U, n, E, i, r, o, e, g);
        if (_ !== !1)
          return (_ === 1 || _ === -1) && (g = _ === 1), Zn = !0, setTimeout(Ol, 30), b(), g && !f ? n.appendChild(E) : r.parentNode.insertBefore(E, g ? f : r), w && Hi(w, 0, Y - w.scrollTop), X = E.parentNode, O !== void 0 && !qt && (Kt = Math.abs(O - Z(r)[z])), x(), M(!0);
      }
      if (n.contains(E))
        return M(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    R(document, "mousemove", this._onTouchMove), R(document, "touchmove", this._onTouchMove), R(document, "pointermove", this._onTouchMove), R(document, "dragover", He), R(document, "mousemove", He), R(document, "touchmove", He);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    R(e, "mouseup", this._onDrop), R(e, "touchend", this._onDrop), R(e, "pointerup", this._onDrop), R(e, "pointercancel", this._onDrop), R(e, "touchcancel", this._onDrop), R(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, r = this.options;
    if (se = ce(E), Te = ce(E, r.draggable), oe("drop", this, {
      evt: e
    }), X = E && E.parentNode, se = ce(E), Te = ce(E, r.draggable), N.eventCanceled) {
      this._nulling();
      return;
    }
    Xe = !1, qt = !1, _t = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Qn(this.cloneId), Qn(this._dragStartId), this.nativeDraggable && (R(document, "drop", this), R(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), bt && k(document.body, "user-select", ""), k(E, "transform", ""), e && (ct && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), I && I.parentNode && I.parentNode.removeChild(I), (U === X || ee && ee.lastPutMode !== "clone") && J && J.parentNode && J.parentNode.removeChild(J), E && (this.nativeDraggable && R(E, "dragend", this), Rn(E), E.style["will-change"] = "", ct && !Xe && le(E, ee ? ee.options.ghostClass : this.options.ghostClass, !1), le(E, this.options.chosenClass, !1), re({
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
    })), N.active && ((se == null || se === -1) && (se = Ye, Te = Et), re({
      sortable: this,
      name: "end",
      toEl: X,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    oe("nulling", this), U = E = X = I = qe = J = Yt = ke = Ve = pe = ct = se = Te = Ye = Et = $e = St = ee = jt = N.dragged = N.ghost = N.clone = N.active = null, hn.forEach(function(e) {
      e.checked = !0;
    }), hn.length = On = Mn = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        E && (this._onDragOver(e), Il(e));
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
      n = r[i], me(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || Hl(n));
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
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && Wi(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    oe("destroy", this);
    var e = this.el;
    e[ae] = null, R(e, "mousedown", this._onTapStart), R(e, "touchstart", this._onTapStart), R(e, "pointerdown", this._onTapStart), this.nativeDraggable && (R(e, "dragover", this), R(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), pn.splice(pn.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!ke) {
      if (oe("hideClone", this), N.eventCanceled) return;
      k(J, "display", "none"), this.options.removeCloneOnHide && J.parentNode && J.parentNode.removeChild(J), ke = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ke) {
      if (oe("showClone", this), N.eventCanceled) return;
      E.parentNode == U && !this.options.group.revertClone ? U.insertBefore(J, E) : qe ? U.insertBefore(J, qe) : U.appendChild(J), this.options.group.revertClone && this.animate(E, J), k(J, "display", ""), ke = !1;
    }
  }
};
function Il(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Ft(t, e, n, r, i, o, a, s) {
  var l, u = t[ae], p = u.options.onMove, c;
  return window.CustomEvent && !Ae && !Nt ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = t, l.dragged = n, l.draggedRect = r, l.related = i || e, l.relatedRect = o || Z(e), l.willInsertAfter = s, l.originalEvent = a, t.dispatchEvent(l), p && (c = p.call(u, l, a)), c;
}
function Rn(t) {
  t.draggable = !1;
}
function Ol() {
  Zn = !1;
}
function Ml(t, e, n) {
  var r = Z(et(n.el, 0, n.options, !0)), i = qi(n.el, n.options, I), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function Pl(t, e, n) {
  var r = Z(dr(n.el, n.options.draggable)), i = qi(n.el, n.options, I), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function Rl(t, e, n, r, i, o, a, s) {
  var l = r ? t.clientY : t.clientX, u = r ? n.height : n.width, p = r ? n.top : n.left, c = r ? n.bottom : n.right, h = !1;
  if (!a) {
    if (s && Kt < u * i) {
      if (!_t && (St === 1 ? l > p + u * o / 2 : l < c - u * o / 2) && (_t = !0), _t)
        h = !0;
      else if (St === 1 ? l < p + Kt : l > c - Kt)
        return -St;
    } else if (l > p + u * (1 - i) / 2 && l < c - u * (1 - i) / 2)
      return Vl(e);
  }
  return h = h || a, h && (l < p + u * o / 2 || l > c - u * o / 2) ? l > p + u / 2 ? 1 : -1 : 0;
}
function Vl(t) {
  return ce(E) < ce(t) ? 1 : -1;
}
function Hl(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function jl(t) {
  hn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && hn.push(r);
  }
}
function Gt(t) {
  return setTimeout(t, 0);
}
function Qn(t) {
  return clearTimeout(t);
}
yn && V(document, "touchmove", function(t) {
  (N.active || Xe) && t.cancelable && t.preventDefault();
});
N.utils = {
  on: V,
  off: R,
  css: k,
  find: Ri,
  is: function(e, n) {
    return !!me(e, n, e, !1);
  },
  extend: El,
  throttle: Vi,
  closest: me,
  toggleClass: le,
  clone: ji,
  index: ce,
  nextTick: Gt,
  cancelNextTick: Qn,
  detectDirection: Fi,
  getChild: et,
  expando: ae
};
N.get = function(t) {
  return t[ae];
};
N.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (N.utils = ye(ye({}, N.utils), r.utils)), xt.mount(r);
  });
};
N.create = function(t, e) {
  return new N(t, e);
};
N.version = bl;
var G = [], ft, er, tr = !1, Vn, Hn, mn, dt;
function ql() {
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
      this.sortable.nativeDraggable ? R(document, "dragover", this._handleAutoScroll) : (R(document, "pointermove", this._handleFallbackAutoScroll), R(document, "touchmove", this._handleFallbackAutoScroll), R(document, "mousemove", this._handleFallbackAutoScroll)), ni(), Zt(), Sl();
    },
    nulling: function() {
      mn = er = ft = tr = dt = Vn = Hn = null, G.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, s = document.elementFromPoint(o, a);
      if (mn = n, r || this.options.forceAutoScrollFallback || Nt || Ae || bt) {
        jn(n, this.options, s, r);
        var l = xe(s, !0);
        tr && (!dt || o !== Vn || a !== Hn) && (dt && ni(), dt = setInterval(function() {
          var u = xe(document.elementFromPoint(o, a), !0);
          u !== l && (l = u, Zt()), jn(n, i.options, u, r);
        }, 10), Vn = o, Hn = a);
      } else {
        if (!this.options.bubbleScroll || xe(s, !0) === ge()) {
          Zt();
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
function Zt() {
  G.forEach(function(t) {
    clearInterval(t.pid);
  }), G = [];
}
function ni() {
  clearInterval(dt);
}
var jn = Vi(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = ge(), u = !1, p;
    er !== n && (er = n, Zt(), ft = e.scroll, p = e.scrollFn, ft === !0 && (ft = xe(n, !0)));
    var c = 0, h = ft;
    do {
      var m = h, d = Z(m), y = d.top, S = d.bottom, b = d.left, M = d.right, x = d.width, P = d.height, T = void 0, L = void 0, O = m.scrollWidth, F = m.scrollHeight, D = k(m), z = m.scrollLeft, w = m.scrollTop;
      m === l ? (T = x < O && (D.overflowX === "auto" || D.overflowX === "scroll" || D.overflowX === "visible"), L = P < F && (D.overflowY === "auto" || D.overflowY === "scroll" || D.overflowY === "visible")) : (T = x < O && (D.overflowX === "auto" || D.overflowX === "scroll"), L = P < F && (D.overflowY === "auto" || D.overflowY === "scroll"));
      var Y = T && (Math.abs(M - i) <= a && z + x < O) - (Math.abs(b - i) <= a && !!z), K = L && (Math.abs(S - o) <= a && w + P < F) - (Math.abs(y - o) <= a && !!w);
      if (!G[c])
        for (var ne = 0; ne <= c; ne++)
          G[ne] || (G[ne] = {});
      (G[c].vx != Y || G[c].vy != K || G[c].el !== m) && (G[c].el = m, G[c].vx = Y, G[c].vy = K, clearInterval(G[c].pid), (Y != 0 || K != 0) && (u = !0, G[c].pid = setInterval(function() {
        r && this.layer === 0 && N.active._onTouchMove(mn);
        var f = G[this.layer].vy ? G[this.layer].vy * s : 0, g = G[this.layer].vx ? G[this.layer].vx * s : 0;
        typeof p == "function" && p.call(N.dragged.parentNode[ae], g, f, t, mn, G[this.layer].el) !== "continue" || Hi(G[this.layer].el, g, f);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && h !== l && (h = xe(h, !1)));
    tr = u;
  }
}, 30), Ui = function(e) {
  var n = e.originalEvent, r = e.putSortable, i = e.dragEl, o = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    s();
    var p = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(p.clientX, p.clientY);
    l(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: r
    }));
  }
};
function pr() {
}
pr.prototype = {
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
  drop: Ui
};
_e(pr, {
  pluginName: "revertOnSpill"
});
function hr() {
}
hr.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Ui
};
_e(hr, {
  pluginName: "removeOnSpill"
});
N.mount(new ql());
N.mount(hr, pr);
const Ke = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakMap();
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
const Wt = /* @__PURE__ */ new WeakMap(), Fl = {
  mounted(t, e, n) {
    let r = ve(n), i = e.modifiers || {}, o = e.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = zl(i), s = i.horizontal ? "horizontal" : "vertical";
    Wt.set(t, e);
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
      onEnd: function(h) {
        let m = h.newIndex, d = h.oldIndex;
        if (d === m)
          return;
        let y = Wt.get(t), S = y ? y.value : null, b = typeof S == "string";
        if (Array.isArray(S)) {
          let x = h.from;
          d < m ? x.insertBefore(h.item, x.children[d]) : x.insertBefore(h.item, x.children[d + 1]);
          let P = S.splice(d, 1)[0];
          S.splice(m, 0, P);
          return;
        }
        if (b && r) {
          let x = S, P = [], T = h.item, L = Qt.get(T);
          L === void 0 && (L = T.dataset.livueSortItem), typeof L == "string" && /^\d+$/.test(L) && (L = parseInt(L, 10));
          let O = h.from, F = h.to, D = [L, m].concat(P);
          if (O !== F) {
            let w = F.dataset.livueSortMethod;
            w && (x = w);
            let Y = O.dataset.livueSortId || O.dataset.livueSortGroup || null;
            D.push(Y);
          }
          r.call(x, D);
        }
      }
    };
    typeof e.value == "string" && (t.dataset.livueSortMethod = e.value), t.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), l && (u.group = l);
    let c = N.create(t, u);
    Ke.set(t, c);
  },
  updated(t, e) {
    Wt.set(t, e);
    let n = Ke.get(t);
    n && t.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = Ke.get(t);
    e && (e.destroy(), Ke.delete(t)), Wt.delete(t);
  }
}, Wl = {
  mounted(t, e) {
    let n = e.value;
    Qt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    Qt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (Qt.delete(t), t && t.removeAttribute)
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
}, $l = {
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
}, Ul = {
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
}, Jl = H("dblclick"), Xl = H("mousedown"), Yl = H("mouseup"), Kl = H("mouseenter"), Gl = H("mouseleave"), Zl = H("mouseover"), Ql = H("mouseout"), es = H("mousemove"), ts = H("contextmenu"), ns = H("keydown", { isKeyboardEvent: !0 }), rs = H("keyup", { isKeyboardEvent: !0 }), is = H("keypress", { isKeyboardEvent: !0 }), os = H("focus"), as = H("focusin"), ls = H("focusout"), ss = H("touchstart"), us = H("touchend"), cs = H("touchmove"), fs = H("touchcancel"), ds = H("change"), ps = H("input"), hs = H("reset"), ms = H("dragstart"), vs = H("dragend"), gs = H("dragenter"), ys = H("dragleave"), bs = H("dragover"), ws = H("drop"), Es = H("copy"), Ss = H("cut"), _s = H("paste"), As = H("wheel"), Ds = H("resize");
function Ts() {
  C("init", ka), C("submit", Na), C("intersect", xa), C("current", Ia), C("ignore", Oa), C("model-livue", Va), C("debounce", fl), C("throttle", dl), C("blur", ur), C("enter", cr), C("boolean", ml), C("poll", qa), C("offline", Fa), C("transition", ca), C("replace", Wa), C("loading", Ua), C("target", Ja), C("stream", Xa), C("click", Ga), C("navigate", Za), C("scroll", Qa), C("dirty", el), C("watch", il), C("sort", Fl), C("sort-item", Wl), C("sort-handle", Bl), C("sort-ignore", $l), C("sort-group", Ul), C("dblclick", Jl), C("mousedown", Xl), C("mouseup", Yl), C("mouseenter", Kl), C("mouseleave", Gl), C("mouseover", Zl), C("mouseout", Ql), C("mousemove", es), C("contextmenu", ts), C("keydown", ns), C("keyup", rs), C("keypress", is), C("focus", os), C("focusin", as), C("focusout", ls), C("touchstart", ss), C("touchend", us), C("touchmove", cs), C("touchcancel", fs), C("change", ds), C("input", ps), C("reset", hs), C("dragstart", ms), C("dragend", vs), C("dragenter", gs), C("dragleave", ys), C("dragover", bs), C("drop", ws), C("copy", Es), C("cut", Ss), C("paste", _s), C("wheel", As), C("resize", Ds);
}
let Ce = null, st = null, ri = !1;
function Cs() {
  if (ri)
    return;
  ri = !0;
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
function Ls() {
  return Ce || (Cs(), Ce = document.createElement("div"), Ce.className = "livue-hmr-indicator", document.body.appendChild(Ce), Ce);
}
function Bt(t, e) {
  const n = Ls();
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
        ii();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, st = setTimeout(function() {
        ii();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function ii() {
  Ce && Ce.classList.remove("visible");
}
let Fe = null, bn = !0, Ji = !0, pt = !0, en = [];
function ks(t) {
  Fe = t;
}
async function Ns(t) {
  if (bn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), pt && Bt("updating", t.fileName), en.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Ji ? xs() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), pt && Bt("error");
        return;
      }
      a.forEach(function(s) {
        const l = s.dataset.livueId, u = document.querySelector('[data-livue-id="' + l + '"]');
        u && (s.dataset.livueSnapshot && (u.dataset.livueSnapshot = s.dataset.livueSnapshot), u.innerHTML = s.innerHTML);
      }), Fe.reboot(), e && (await Os(), Is(e)), pt && Bt("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), pt && Bt("error");
    }
  }
}
function xs() {
  const t = /* @__PURE__ */ new Map();
  return Fe && Fe.all().forEach(function(n) {
    if (oi(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        oi(r, i.name, i.state, t);
      }
  }), t;
}
function oi(t, e, n, r) {
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
function Is(t) {
  Fe && t.forEach(function(e, n) {
    const r = Fe.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function Os() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Ms() {
  return typeof import.meta < "u" && !1;
}
function Ps() {
  bn = !0;
}
function Rs() {
  bn = !1;
}
function Vs() {
  return bn;
}
function Hs(t) {
  t.indicator !== void 0 && (pt = t.indicator), t.preserveState !== void 0 && (Ji = t.preserveState);
}
function js(t) {
  return en.push(t), function() {
    const e = en.indexOf(t);
    e !== -1 && en.splice(e, 1);
  };
}
async function qs() {
  Fe && await Ns({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ue = !1, qn = [];
class zs {
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
    Wo(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Ts(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), wo(this), this._startObserver(), ks(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Ko());
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
    Tt(e, !0, !1);
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
    bo(e);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(e) {
    return gn(e);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    ko();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Po();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Pe;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: nt(),
      ...Yo()
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
    let r = new La(e);
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
    return yr(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return br();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), _r();
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
    }), _r();
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
      isAvailable: Ms,
      isEnabled: Vs,
      enable: Ps,
      disable: Rs,
      configure: Hs,
      onUpdate: js,
      trigger: qs
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
      var n = br();
      n.forEach(function(r) {
        var i = yr(r, function(o) {
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
const mr = new zs();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = lo, document.head.appendChild(t);
}
var be = window.LiVueConfig || {};
(be.showProgressBar !== void 0 || be.progressBarColor !== void 0 || be.prefetch !== void 0 || be.prefetchOnHover !== void 0 || be.hoverDelay !== void 0 || be.cachePages !== void 0 || be.maxCacheSize !== void 0 || be.restoreScroll !== void 0) && mr.configureNavigation(be);
function ai() {
  mr.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ai) : queueMicrotask(ai);
window.LiVue = mr;
export {
  mr as default
};
//# sourceMappingURL=livue.esm.js.map
