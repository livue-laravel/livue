import * as wn from "vue";
import { reactive as Ie, toRefs as Zi, effectScope as Qi, ref as en, markRaw as eo, defineComponent as to, shallowRef as rr, onMounted as fi, onUnmounted as di, h as yr, inject as no, provide as ro, nextTick as ir, onBeforeUnmount as io, onBeforeMount as oo, readonly as ao, watchEffect as lo, watch as Me, computed as so, createApp as uo } from "vue";
const co = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
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
function fo() {
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
}, ie = null, Fn = null, ue = null, we = null, tn = !1, ht = 0;
function po(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function ho(t) {
  return (-1 + t) * 100;
}
function pi() {
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
function mo() {
  if (ue) return;
  pi(), ue = document.createElement("div"), ue.className = "livue-progress-bar livue-progress-hidden", ue.innerHTML = '<div class="livue-progress-peg"></div>', Q.showSpinner && (we = document.createElement("div"), we.className = "livue-progress-spinner livue-progress-hidden", we.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(Q.parent) || document.body;
  t.appendChild(ue), we && t.appendChild(we);
}
function vo() {
  if (!tn) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), tn = !1, pi());
}
function go(t) {
  Object.assign(Q, t), vo();
}
function yo() {
  ht++, ie === null && (mo(), ie = 0, ue && ue.classList.remove("livue-progress-hidden"), we && we.classList.remove("livue-progress-hidden"), vn(Q.minimum), Q.trickle && (Fn = setInterval(function() {
    hi();
  }, Q.trickleSpeed)));
}
function vn(t) {
  ie !== null && (t = po(t, Q.minimum, 1), ie = t, ue && (ue.style.transform = "translate3d(" + ho(t) + "%, 0, 0)"));
}
function hi() {
  if (ie === null || ie >= 1) return;
  let t;
  ie < 0.2 ? t = 0.1 : ie < 0.5 ? t = 0.04 : ie < 0.8 ? t = 0.02 : ie < 0.99 ? t = 5e-3 : t = 0, vn(ie + t);
}
function mi() {
  ht = Math.max(0, ht - 1), !(ht > 0) && ie !== null && (vn(1), clearInterval(Fn), Fn = null, setTimeout(function() {
    ue && ue.classList.add("livue-progress-hidden"), we && we.classList.add("livue-progress-hidden"), setTimeout(function() {
      ie = null, ue && (ue.style.transform = "translate3d(-100%, 0, 0)");
    }, Q.speed);
  }, Q.speed));
}
function bo() {
  ht = 0, mi();
}
function wo() {
  return ie !== null;
}
function Eo() {
  return ie;
}
const Pe = {
  configure: go,
  start: yo,
  set: vn,
  trickle: hi,
  done: mi,
  forceDone: bo,
  isStarted: wo,
  getStatus: Eo
};
var ut = null, br = !1, Ge = !1, de = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ee = /* @__PURE__ */ new Map(), ze = /* @__PURE__ */ new Map(), Wn = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new Map(), Ne = null;
function So(t) {
  Object.assign(de, t), t.progressBarColor && Pe.configure({ color: t.progressBarColor });
}
function _o(t) {
  ut = t, !br && (br = !0, Ne = vi(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Ne },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (gi(Ne), Ne = e.state.pageKey, Dt(e.state.url, !1, !0));
  }), Do());
}
function vi() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function gi(t) {
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
function Ao(t) {
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
function Do() {
  document.addEventListener("click", To, !0), de.prefetch && (document.addEventListener("mouseenter", Lo, !0), document.addEventListener("mouseleave", ko, !0), document.addEventListener("mousedown", No, !0), document.addEventListener("focus", xo, !0));
}
function To(t) {
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
function Co(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function Lo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !de.prefetchOnHover)) {
      var n = Co(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            gn(r);
          }, de.hoverDelay);
          Wn.set(e, i);
        }
      }
    }
  }
}
function ko(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Wn.get(e);
      n && (clearTimeout(n), Wn.delete(e));
    }
  }
}
function No(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || gn(n);
    }
  }
}
function xo(t) {
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
      return de.cachePages && yi(e, i), i;
    }) : null;
  }).catch(function(r) {
    return ze.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return ze.set(e, n), n;
}
function yi(t, e) {
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
function Io() {
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
      Ge = !0, n || gi(Ne), de.showProgressBar && Pe.start();
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
          o = await s.text(), de.cachePages && yi(r, o);
        }
        var l = new DOMParser(), u = l.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(g) {
              typeof g == "function" && g(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = Oo(), p = /* @__PURE__ */ new Set();
        c.forEach(function(g) {
          g.livueIds.forEach(function(O) {
            p.add(O);
          });
        }), ut._stopObserver(), ut.destroyExcept(p), c.forEach(function(g) {
          g.element.parentNode && g.element.parentNode.removeChild(g.element);
        });
        var v = u.querySelector("title");
        v && (document.title = v.textContent), document.body.innerHTML = u.body.innerHTML, Mo(c);
        var h = u.querySelector('meta[name="csrf-token"]'), b = document.querySelector('meta[name="csrf-token"]');
        if (h && b && (b.setAttribute("content", h.getAttribute("content")), fo()), Po(u), Ro(u), e && (Ne = vi(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Ne },
          "",
          r
        )), Vo(u), ut.rebootPreserving(), n)
          Ao(Ne);
        else if (location.hash) {
          var S = document.querySelector(location.hash);
          S ? S.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (g) {
        console.error("[LiVue] Navigation failed:", g), window.location.href = t;
      } finally {
        Ge = !1, de.showProgressBar && Pe.done();
      }
    }
  }
}
function Oo() {
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
function Mo(t) {
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
function Po(t) {
  var e = document.querySelectorAll("[data-livue-head]");
  e.forEach(function(r) {
    r.remove();
  });
  var n = t.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Ro(t) {
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
function Vo(t) {
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
function Ho() {
  return Ge;
}
var Je = /* @__PURE__ */ new Map(), jo = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function wr(t, e) {
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
function bi() {
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
function Er() {
  return jo.slice();
}
var Bn = [], $n = [], _t = !1;
function qo(t) {
  return t.isolate ? Fo(t) : new Promise(function(e, n) {
    Bn.push({
      payload: t,
      resolve: e,
      reject: n
    }), _t || (_t = !0, queueMicrotask(wi));
  });
}
function zo(t) {
  return new Promise(function(e, n) {
    $n.push({
      payload: t,
      resolve: e,
      reject: n
    }), _t || (_t = !0, queueMicrotask(wi));
  });
}
async function wi() {
  var t = Bn, e = $n;
  if (Bn = [], $n = [], _t = !1, !(t.length === 0 && e.length === 0)) {
    Pe.start();
    var n = Ei(), r = tt(), i = {
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
      for (var p = u.responses || [], v = u.lazyResponses || [], c = 0; c < p.length; c++)
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
          var b = new Error(h.error);
          b.status = h.status || 500, b.data = h, t[c].reject(b);
        } else if (h.errors) {
          var b = new Error("Validation failed");
          b.status = 422, b.data = h, t[c].reject(b);
        } else
          t[c].resolve(h);
      }
      for (var c = 0; c < e.length; c++) {
        var h = v[c];
        if (!h) {
          e[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (h.error) {
          var b = new Error(h.error);
          b.status = h.status || 500, b.data = h, e[c].reject(b);
        } else
          e[c].resolve(h);
      }
      fe("request.finished", {
        url: n,
        success: !0,
        responses: p,
        lazyResponses: v,
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
async function Fo(t) {
  Pe.start();
  var e = Ei(), n = tt(), r = {
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
    Pe.done();
  }
}
function Ei() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function En(t, e, n, r, i) {
  return qo({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
function Si(t, e) {
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
function Sr(t) {
  return JSON.stringify(t, Si);
}
function Un(t) {
  return Ie(Object.assign({}, t));
}
function Wo(t, e) {
  let n;
  for (n in e) {
    let r = Sr(t[n]), i = Sr(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function _i(t) {
  return JSON.parse(JSON.stringify(t, Si));
}
function Bo(t) {
  return Zi(t);
}
function Sn(t, e) {
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
let Jn = null, Ai = /* @__PURE__ */ new Map();
function $o() {
  return Ie({});
}
function he(t, e) {
  Xn(t);
  for (let n in e)
    t[n] = e[n];
}
function Xn(t) {
  for (let e in t)
    delete t[e];
}
function Uo(t) {
  Jn = t;
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
  }), i ? !0 : (Jn ? Jn(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function Jo(t, e) {
  typeof e == "function" && Ai.set(t, e);
}
function Yn(t) {
  Ai.delete(t);
}
var Di = [];
function L(t, e, n) {
  Di.push({
    name: t,
    directive: e
  });
}
function Xo() {
  return Di;
}
const Oe = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Map();
let _r = !1;
function nt() {
  return typeof window < "u" && window.Echo;
}
function Yo(t, e) {
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
function Ti(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!nt())
    return _r || (_r = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: s, event: l, method: u, isPresenceEvent: d, isCustomEvent: c } = o, p = Yo(a, s);
    if (!p) continue;
    const v = s + ":" + a + ":" + l + ":" + t;
    if (Re.has(v)) {
      r.push(v);
      continue;
    }
    const h = function(b) {
      try {
        n(u, b);
      } catch (S) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', S);
      }
    };
    if (s === "presence" && d)
      Ko(p, l, h);
    else {
      const b = c ? "." + l : l;
      p.listen(b, h);
    }
    Re.set(v, {
      channel: p,
      channelKey: s + ":" + a,
      event: l,
      handler: h,
      isPresenceEvent: d,
      isCustomEvent: c
    }), r.push(v);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      Ci(r[i]);
  };
}
function Ko(t, e, n) {
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
function Ci(t) {
  const e = Re.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    Re.delete(t), Go(e.channelKey);
  }
}
function Ar(t) {
  const e = ":" + t, n = [];
  Re.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    Ci(n[r]);
}
function Go(t) {
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
function Dr() {
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
function Zo() {
  return {
    echoAvailable: nt(),
    channels: Array.from(Oe.keys()),
    subscriptions: Array.from(Re.keys())
  };
}
function Qo() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Le = /* @__PURE__ */ new Map();
function nn(t, e, n, r) {
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
function $t(t, e, n, r, i, o) {
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
function Tr(t) {
  Le.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Le.delete(n);
  });
}
function ea(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    $t(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function ta(t, e) {
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
function na(t, e, n, r, i) {
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
function _n(t) {
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
function ra(t, e, n, r, i) {
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
    }, u.send(l);
  });
}
const ia = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var Cr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Cr || (Cr = {}));
function oa() {
  const t = Qi(!0), e = t.run(() => en({}));
  let n = [], r = [];
  const i = eo({
    install(o) {
      i._a = o, o.provide(ia, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
let An = 0;
function aa(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
function la(t) {
  return to({
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
            let u = await zo({
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
        An++;
        let c = "lazy-" + An + "-" + Date.now(), p = d.memo ? d.memo.name : "", v = aa(d.state || {}), h = d.memo || {}, { createLivueHelper: b, buildComponentDef: S, processTemplate: g, createReactiveState: O } = t._lazyHelpers, D = O(v), N = JSON.parse(JSON.stringify(v)), _ = { _updateTemplate: null }, k = b(
          c,
          D,
          h,
          _,
          N,
          u.snapshot
        );
        h.errors && he(k.errors, h.errors);
        let P = "livue-lazy-child-" + An, F = g(u.html, t), C = rn(
          F.template,
          'data-livue-id="' + c + '"'
        ), z = S(C, D, k, t._versions, p);
        t._childRegistry[c] = {
          tagName: P,
          state: D,
          memo: h,
          livue: k,
          componentRef: _,
          name: p,
          id: c
        }, _._updateTemplate = function(Y) {
          let K = g(Y, t), ne = rn(
            K.template,
            'data-livue-id="' + c + '"'
          );
          for (let y in K.childDefs)
            t.vueApp._context.components[y] || t.vueApp.component(y, K.childDefs[y]);
          let f = S(ne, D, k, t._versions, p);
          t.vueApp._context.components[P] = f, t._versions[P] = (t._versions[P] || 0) + 1, i.value = f;
        };
        let w = h.listeners || null;
        if (w)
          for (let Y in w)
            (function(K, ne) {
              nn(Y, p, c, function(f) {
                ne.call(K, f);
              });
            })(w[Y], k);
        for (let Y in F.childDefs)
          t.vueApp._context.components[Y] || t.vueApp.component(Y, F.childDefs[Y]);
        t._versions[P] = 0, t.vueApp._context.components[P] || t.vueApp.component(P, z), i.value = z, r.value = !0;
      }
      return fi(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          s();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, s());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), di(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? yr(i.value) : yr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
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
          let c = i, p = o, v = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(p).catch(v);
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
function Lr(t) {
  let e = t + ":";
  for (let n of mt.keys())
    n.startsWith(e) && mt.delete(n);
  for (let n of vt.keys())
    n.startsWith(e) && vt.delete(n);
}
const on = "livue-tab-sync";
let lr = Date.now() + "-" + Math.random().toString(36).substr(2, 9), an = null, sr = /* @__PURE__ */ new Map(), kr = !1;
function Li() {
  kr || (kr = !0, typeof BroadcastChannel < "u" ? (an = new BroadcastChannel(on), an.onmessage = sa) : window.addEventListener("storage", ua));
}
function sa(t) {
  let e = t.data;
  e.tabId !== lr && ki(e);
}
function ua(t) {
  if (t.key === on && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === lr) return;
      ki(e);
    } catch {
    }
}
function ki(t) {
  let e = sr.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function ca(t, e) {
  Li(), sr.set(t, e);
}
function Nr(t) {
  sr.delete(t);
}
function fa(t, e, n, r) {
  Li();
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
function da(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
let xr = 0;
function Kn() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Dn = /* @__PURE__ */ new WeakMap();
function Ir() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const pa = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (xr++, r = "livue-transition-" + xr), Dn.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), Kn() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    Ir();
  },
  updated(t, e) {
    let n = Dn.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), Kn() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    Dn.delete(t), t.removeAttribute("data-livue-transition"), Ir();
  }
};
function ha(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const ur = /* @__PURE__ */ new Map();
async function ma(t, e = {}) {
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
      for (const v of p)
        if (v.trim())
          try {
            const h = JSON.parse(v);
            if (h.stream)
              va(h.stream), n(h.stream);
            else {
              if (h.error)
                throw new Error(h.error);
              h.snapshot && (u = h);
            }
          } catch (h) {
            console.error("[LiVue Stream] Parse error:", h, v);
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
function va(t) {
  const { to: e, content: n, replace: r } = t, i = ur.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Or(t, e, n = !1) {
  ur.set(t, { el: e, replace: n });
}
function Mr(t) {
  ur.delete(t);
}
function ga(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function cr(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    ga(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = cr(r) : e[n] = r;
  }
  return e;
}
function ya(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let s = n[a] || {}, l = r[a] || {}, u = cr(s), d = {};
    for (let c in l)
      d[c] = /* @__PURE__ */ (function(p, v) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return e(p + "." + v, h);
        };
      })(a, c);
    i[a] = Ie(Object.assign({}, u, d));
  }
  return i;
}
function ba(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = cr(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function wa(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
function Ea(t) {
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
function Sa(t, e) {
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
let Pr = 0, Ni = /* @__PURE__ */ new Map();
function _a(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function Aa(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function xi(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Ni.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: _a(n)
    });
  });
}
function Ii(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Ni.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Aa(n, i.inputs));
  });
}
function It(t, e) {
  let n = {}, r = _i(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function Da(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function Gn(t) {
  if (Da(t))
    return t[0];
  if (Array.isArray(t))
    return t.map(Gn);
  if (t && typeof t == "object") {
    let e = {};
    for (let n in t)
      e[n] = Gn(t[n]);
    return e;
  }
  return t;
}
function ln(t) {
  let e = {};
  for (let n in t)
    e[n] = Gn(t[n]);
  return e;
}
let Oi = {
  ref: en,
  computed: so,
  watch: Me,
  watchEffect: lo,
  reactive: Ie,
  readonly: ao,
  onMounted: fi,
  onUnmounted: di,
  onBeforeMount: oo,
  onBeforeUnmount: io,
  nextTick: ir,
  provide: ro,
  inject: no
}, Mi = Object.keys(Oi), Ta = Mi.map(function(t) {
  return Oi[t];
});
function Rr(t) {
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
function Ca(t, e, n) {
  let r = Object.keys(e), i = r.map(function(s) {
    return e[s];
  }), o = Mi.concat(r).concat(["livue"]), a = Ta.concat(i).concat([n]);
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
function Vr(t) {
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
function Pi(t) {
  if (!(!t || typeof t != "object") && (t.dynamicChildren = null, Array.isArray(t.children)))
    for (let e = 0; e < t.children.length; e++)
      Pi(t.children[e]);
}
function sn(t, e, n, r, i, o) {
  let a = Vr(t), s = Rr(a), l = wn.compile(s.html), u = rr(l), d = [], c = !1;
  function p(h, b) {
    let S = u.value, g = S(h, d);
    return c && (Pi(g), c = !1), g;
  }
  p._rc = !0;
  let v = {
    name: o || "LiVueComponent",
    render: p,
    setup: function() {
      wn.provide("livue", n);
      let h = Bo(e), b = Object.assign({}, h, r, { livue: n, livueV: i });
      if (s.setupCode) {
        let D = Ca(s.setupCode, h, n);
        D && Object.assign(b, D);
      }
      var S = {
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
      }, g = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      function O(D) {
        return typeof D == "string" && !S[D] && g.test(D);
      }
      return new Proxy(b, {
        get: function(D, N, _) {
          if (N in D || typeof N == "symbol") return Reflect.get(D, N, _);
          if (O(N))
            return function() {
              return n.call(N, ...arguments);
            };
        },
        getOwnPropertyDescriptor: function(D, N) {
          var _ = Object.getOwnPropertyDescriptor(D, N);
          if (_) return _;
          if (O(N))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(D, N) {
          return !!(N in D || O(N));
        },
        set: function(D, N, _) {
          return D[N] = _, !0;
        },
        ownKeys: function(D) {
          return Reflect.ownKeys(D);
        }
      });
    }
  };
  return v._updateRender = function(h) {
    let b = Vr(h), S = Rr(b);
    c = !0, d.length = 0, u.value = wn.compile(S.html);
  }, v;
}
function La(t, e) {
  for (var n in e) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = t.indexOf(r), a = t.indexOf(i);
    o !== -1 && a !== -1 && (t = t.substring(0, o) + e[n] + t.substring(a + i.length));
  }
  return t;
}
function Zn(t, e, n, r, i, o, a) {
  a = a || {};
  let s = $o(), l = n.name, u = n.vueMethods || {}, d = n.jsonMethods || [], c = n.confirms || {}, p = n.isolate || !1, v = n.urlParams || null, h = n.uploads || null, b = n.tabSync || null, S = !1, g = i, O = o, D = a.initialHtml || null;
  function N(f) {
    let y = document.querySelector('meta[name="livue-prefix"]'), T = "/" + (y ? y.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), m = document.createElement("a");
    m.href = T, m.download = f.name, m.style.display = "none", document.body.appendChild(m), m.click(), document.body.removeChild(m);
  }
  function _() {
    let f = It(g, e);
    return {
      snapshot: O,
      diffs: f
    };
  }
  function k(f, y) {
    if (f.redirect) {
      or(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let m = f.errorBoundary;
      w.errorState.hasError = m.hasError, w.errorState.errorMessage = m.errorMessage, w.errorState.errorDetails = m.errorDetails, w.errorState.recover = m.recover, (!m.errorHandled || !m.recover) && fe("error.occurred", {
        error: new Error(m.errorMessage || "Component error"),
        componentName: l,
        componentId: t,
        context: { method: m.errorMethod, serverHandled: m.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && N(f.download), f.snapshot) {
      let m = JSON.parse(f.snapshot);
      if (m.state) {
        let j = ln(m.state);
        Wo(e, j), g = JSON.parse(JSON.stringify(j));
      }
      O = f.snapshot, m.memo && (m.memo.errors ? he(w.errors, m.memo.errors) : Xn(w.errors), m.memo.vueMethods && (u = m.memo.vueMethods), m.memo.jsonMethods && (d = m.memo.jsonMethods), m.memo.urlParams && (v = m.memo.urlParams), m.memo.uploads && (h = m.memo.uploads), m.memo.confirms && (c = m.memo.confirms), (m.memo.composables || m.memo.composableActions) && ba(C, m.memo));
    }
    if (v && ta(v, e), (f.html || f.fragments) && r && r._updateTemplate) {
      let m = {};
      if (f.snapshot) {
        let j = JSON.parse(f.snapshot);
        j.memo && (j.memo.transitionType && (m.transitionType = j.memo.transitionType), j.memo.skipTransition && (m.skipTransition = !0));
      }
      if (f.fragments) {
        let j = D || (a.el ? a.el.innerHTML : null);
        if (j) {
          let q = La(j, f.fragments);
          D = q, r._updateTemplate(q, m);
        }
      } else
        D = f.html, r._updateTemplate(f.html, m);
    }
    if (f.events && f.events.length > 0) {
      for (var A = 0; A < f.events.length; A++)
        f.events[A].sourceId = t;
      ea(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var T = 0; T < f.js.length; T++)
        try {
          new Function("state", "livue", f.js[T])(e, w);
        } catch (m) {
          console.error("[LiVue] Error executing ->vue() JS:", m);
        }
    if (f.benchmark && fe("benchmark.received", {
      componentId: t,
      componentName: l,
      timings: f.benchmark
    }), b && b.enabled && f.snapshot && !S && JSON.parse(f.snapshot).state) {
      let j = _i(e), q = [];
      for (let $ in j)
        (!y || !($ in y)) && q.push($);
      if (q.length > 0) {
        let $ = da(j, q, b);
        Object.keys($).length > 0 && fa(l, $, q, b);
      }
    }
    if (S = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let P = Ie({}), F = {}, C = {}, z = function(f, y) {
    return w.call(f, y);
  };
  wa(n) && (C = ya(n, z));
  let w = Ie({
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
      let y = It(g, e);
      return f === void 0 ? Object.keys(y).length > 0 : f in y;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = It(g, e);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(g)) : g[f] !== void 0 ? JSON.parse(JSON.stringify(g[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in g && (e[f] = JSON.parse(JSON.stringify(g[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in g)
        f in e && (e[f] = JSON.parse(JSON.stringify(g[f])));
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
      let y = f ? P[f] || !1 : w.loading;
      return {
        "aria-busy": y,
        disabled: y
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
    call: async function(f, y, A) {
      let T, m = null;
      if (arguments.length === 1 ? T = [] : arguments.length === 2 ? Array.isArray(y) ? T = y : T = [y] : arguments.length >= 3 && (Array.isArray(y) && A && typeof A == "object" && (A.debounce || A.throttle) ? (T = y, m = A) : T = Array.prototype.slice.call(arguments, 1)), F[f])
        return F[f](w, T);
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
          let W = _(), B = await En(W.snapshot, f, T, W.diffs, p || j);
          $ = k(B, W.diffs);
        } catch (W) {
          if (j)
            throw { status: W.status, errors: W.data && W.data.errors, message: W.message };
          W.status === 422 && W.data && W.data.errors ? he(w.errors, W.data.errors) : We(W, l);
        } finally {
          w.loading = !1, w.processing = null, delete P[f];
        }
        return $;
      };
      return m && m.debounce ? Qe(t + ":" + f, m.debounce)(q) : m && m.throttle ? At(t + ":" + f, m.throttle)(q) : q();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, y) {
      let A = Array.prototype.slice.call(arguments, 2), T = { message: y || "Are you sure?" };
      if (await w._showConfirm(T))
        return w.call.apply(w, [f].concat(A));
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
    set: function(f, y) {
      e[f] = y;
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      w.loading = !0, w.processing = "$sync";
      try {
        let f = _(), y = await En(f.snapshot, null, [], f.diffs, p);
        k(y, f.diffs);
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
      Xn(w.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, y) {
      $t(f, y, "broadcast", l, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, y, A) {
      $t(y, A, "to", l, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, y) {
      $t(f, y, "self", l, t, null);
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
    upload: async function(f, y) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var A = Sn(e, f);
      A && A.__livue_upload && A.ref && _n([A.ref]), w.uploading = !0, w.uploadProgress = 0;
      try {
        var T = await na(y, l, f, h[f].token, function(m) {
          w.uploadProgress = m;
        });
        xt(e, f, {
          __livue_upload: !0,
          ref: T.ref,
          originalName: T.originalName,
          mimeType: T.mimeType,
          size: T.size,
          previewUrl: T.previewUrl
        });
      } catch (m) {
        m.status === 422 && m.data && m.data.errors ? he(w.errors, m.data.errors) : We(m, l);
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
    uploadMultiple: async function(f, y) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      w.uploading = !0, w.uploadProgress = 0;
      try {
        var A = await ra(y, l, f, h[f].token, function(B) {
          w.uploadProgress = B.overall;
        }), T = A.results || [], m = A.errors || [], j = Sn(e, f), q = Array.isArray(j) ? j : [];
        if (T.length > 0) {
          var $ = T.map(function(B) {
            return {
              __livue_upload: !0,
              ref: B.ref,
              originalName: B.originalName,
              mimeType: B.mimeType,
              size: B.size,
              previewUrl: B.previewUrl
            };
          });
          xt(e, f, q.concat($));
        }
        if (m.length > 0) {
          var W = {};
          m.forEach(function(B) {
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
    removeUpload: function(f, y) {
      var A = Sn(e, f);
      if (y !== void 0 && Array.isArray(A)) {
        var T = A[y];
        T && T.__livue_upload && T.ref && _n([T.ref]), A.splice(y, 1), xt(e, f, A.slice());
      } else
        A && A.__livue_upload && A.ref && _n([A.ref]), xt(e, f, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(f, y) {
      y = y || [], w.loading = !0, w.streaming = !0, w.processing = f, w.streamingMethod = f, P[f] = !0;
      let A;
      try {
        let T = _();
        T.method = f, T.params = y, T.componentId = t;
        let m = await ma(T, {
          onChunk: function(j) {
          },
          onComplete: function(j) {
          },
          onError: function(j) {
            console.error("[LiVue Stream] Error:", j);
          }
        });
        m && (A = k(m, T.diffs));
      } catch (T) {
        T.status === 422 && T.data && T.data.errors ? he(w.errors, T.data.errors) : We(T, l);
      } finally {
        w.loading = !1, w.streaming = !1, w.processing = null, w.streamingMethod = null, delete P[f];
      }
      return A;
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
    watch: function(f, y) {
      return typeof y != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Me(
        function() {
          return e[f];
        },
        function(A, T) {
          y(A, T);
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
      }) : (Jo(t, f), function() {
        Yn(t);
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
    _updateServerState: function(f, y) {
      g = JSON.parse(JSON.stringify(f)), O = y;
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
      let f = It(g, e), y = {};
      for (let A in C) {
        let T = C[A], m = {}, j = [];
        for (let q in T)
          if (typeof T[q] == "function")
            j.push(q);
          else
            try {
              m[q] = JSON.parse(JSON.stringify(T[q]));
            } catch {
              m[q] = "[Unserializable]";
            }
        y[A] = { data: m, actions: j };
      }
      return {
        serverState: JSON.parse(JSON.stringify(g)),
        clientState: JSON.parse(JSON.stringify(e)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: l,
          isolate: p,
          urlParams: v,
          tabSync: b,
          hasUploads: !!h,
          uploadProps: h ? Object.keys(h) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(c),
          composableNames: Object.keys(C)
        },
        composables: y,
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
  for (let f in C)
    w[f] = C[f];
  async function Y() {
    w.loading = !0, w.processing = "$refresh", P.$refresh = !0;
    try {
      let f = _(), y = await En(f.snapshot, null, [], f.diffs, p);
      return k(y, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? he(w.errors, f.data.errors) : We(f, l);
    } finally {
      w.loading = !1, w.processing = null, delete P.$refresh;
    }
  }
  F.$refresh = function() {
    return Y();
  }, b && b.enabled && ca(l, function(f, y, A) {
    let T = !1;
    if (A.reactive === !0)
      T = !0;
    else if (Array.isArray(A.reactive) && A.reactive.length > 0) {
      for (let m in f)
        if (A.reactive.includes(m)) {
          T = !0;
          break;
        }
    }
    if (T) {
      for (let m in f)
        A.only && !A.only.includes(m) || A.except && A.except.includes(m) || m in e && (e[m] = f[m]);
      S = !0, w.sync();
      return;
    }
    for (let m in f)
      A.only && !A.only.includes(m) || A.except && A.except.includes(m) || m in e && (e[m] = f[m]);
    for (let m in f)
      A.only && !A.only.includes(m) || A.except && A.except.includes(m) || (g[m] = JSON.parse(JSON.stringify(f[m])));
  });
  var K = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(w, {
    get: function(f, y, A) {
      if (y in f || typeof y == "symbol")
        return Reflect.get(f, y, A);
      if (typeof y == "string" && y.startsWith("$") && F[y])
        return function() {
          var T = Array.prototype.slice.call(arguments);
          return F[y](w, T);
        };
      if (typeof y == "string" && !y.startsWith("$") && !K[y])
        return function() {
          var T = Array.prototype.slice.call(arguments);
          return w.call(y, ...T);
        };
    },
    set: function(f, y, A, T) {
      return Reflect.set(f, y, A, T);
    },
    has: function(f, y) {
      return typeof y == "string" && y.startsWith("$") && F[y] ? !0 : Reflect.has(f, y);
    }
  }), composables: C };
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
    let u = l.dataset.livueId, d = l.dataset.livueSnapshot || "{}", c = JSON.parse(d), p = c.memo ? c.memo.name : "", v = ln(c.state || {}), h = c.memo || {}, b = l.innerHTML, S = l.tagName.toLowerCase(), g = e._childRegistry[u];
    if (!g)
      for (let C in e._childRegistry) {
        let z = e._childRegistry[C];
        if (z.name === p && !o[C]) {
          g = z;
          break;
        }
      }
    if (g) {
      o[g.id] = !0, g.rootTag = S;
      let C = h.reactive || [];
      if (C.length > 0) {
        for (var O = 0; O < C.length; O++) {
          var D = C[O];
          D in v && (g.state[D] = v[D]);
        }
        g.livue._updateServerState(v, d), g.componentRef && g.componentRef._updateTemplate && g.componentRef._updateTemplate(b);
      }
    }
    let N = !g;
    if (!g) {
      Pr++;
      let C = "livue-child-" + Pr, z = Un(v), w = JSON.parse(JSON.stringify(v)), Y = Object.assign({ name: h.name || p }, h), K = { _updateTemplate: null }, ne = bi(), f = Zn(u, z, Y, K, w, d, {
        el: l,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: ne
      }), y = f.livue, A = f.composables;
      fe("component.init", {
        component: { id: u, name: p, state: z, livue: y },
        el: l,
        cleanup: ne.cleanup,
        isChild: !0
      });
      let T = h.errors || null;
      T && he(y.errors, T), g = {
        tagName: C,
        state: z,
        memo: Y,
        livue: y,
        composables: A,
        componentRef: K,
        name: p,
        id: u,
        rootTag: S
      };
      let m = h.listeners || null;
      if (m)
        for (let q in m)
          (function($, W) {
            nn(q, p, u, function(B) {
              W.call($, B);
            });
          })(m[q], y);
      let j = h.echo || null;
      j && j.length && (function(q, $) {
        Ti(q, j, function(W, B) {
          $.call(W, B);
        });
      })(u, y), K._updateTemplate = function(q) {
        let $ = e.el.querySelector('[data-livue-id="' + u + '"]');
        $ && xi($);
        let W = Ut(q, e), B = rn(
          W.template,
          'data-livue-id="' + u + '"'
        );
        if (e.vueApp) {
          for (let De in W.childDefs)
            e.vueApp._context.components[De] || e.vueApp.component(De, W.childDefs[De]);
          e.vueApp._context.components[g.tagName] = sn(B, g.state, g.livue, g.composables || {}, e._versions, g.name), e._versions[g.tagName] = (e._versions[g.tagName] || 0) + 1, ir(function() {
            let De = e.el.querySelector('[data-livue-id="' + u + '"]');
            De && Ii(De);
          });
        }
      }, e._childRegistry[u] = g;
    }
    let _ = g.tagName, k = l.dataset.livueRef;
    k && e._rootLivue && (e._rootLivue.refs[k] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(C, z) {
        return g.livue.call(C, z || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(C, z) {
        return g.livue.set(C, z);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(C, z) {
        return g.livue.dispatch(C, z);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return g.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return g.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return g.livue;
      }
    });
    let P = l.dataset.livueModel;
    if (P && e._rootState && nn("$modelUpdate", g.name, u, function(C) {
      C && C.value !== void 0 && (e._rootState[P] = C.value);
    }), N) {
      let C = rn(
        "<" + S + ">" + b + "</" + S + ">",
        'data-livue-id="' + u + '"'
      );
      i[_] = sn(
        C,
        g.state,
        g.livue,
        g.composables || {},
        e._versions,
        g.name
      );
    }
    e._versions[_] === void 0 && (e._versions[_] = 0);
    let F = document.createElement(_);
    F.setAttribute(":key", "livueV['" + _ + "']"), l.parentNode.replaceChild(F, l);
  });
  let s = n.querySelectorAll("[data-livue-island]");
  for (let l = 0; l < s.length; l++)
    s[l].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
class ka {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = Un(ln(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Ie({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: Zn,
      buildComponentDef: sn,
      processTemplate: Ut,
      createReactiveState: Un
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
      _updateTemplate: function(b, S) {
        S = S || {}, fe("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: b
        });
        var g = Ea(r.el);
        xi(r.el);
        let O = Ut(b, r);
        if (!r.vueApp) return;
        for (let N in O.childDefs)
          r.vueApp._context.components[N] || r.vueApp.component(N, O.childDefs[N]);
        function D() {
          r._currentRootDef._updateRender(O.template), ir(function() {
            Ii(r.el), Sa(r.el, g), fe("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (S.skipTransition) {
          D();
          return;
        }
        Kn() ? ha(D, { type: S.transitionType }) : D();
      }
    }, o = JSON.parse(JSON.stringify(ln(e.state || {})));
    this._cleanups = bi();
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
      for (let b in c)
        (function(S, g, O, D) {
          nn(b, O, D, function(N) {
            g.call(S, N);
          });
        })(c[b], s, r.name, r.componentId);
    let p = e.memo && e.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = Ti(r.componentId, p, function(b, S) {
      s.call(b, S);
    }));
    let v = sn(u.template, r.state, s, l, r._versions, r.name);
    this._currentRootDef = v, this._rootDefRef = rr(v), this.vueApp = uo({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", la(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = oa();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Xo();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Tr(e), Lr(e), Yn(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Nr(n.name), Ar(e);
    }
    if (fe("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Tr(this.componentId), Lr(this.componentId), Yn(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Nr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Ar(this.componentId), this.vueApp) {
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
let Hr = /* @__PURE__ */ new Set();
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
    Hr.has(u) || (Hr.add(u), r.call(s, l));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Tn = /* @__PURE__ */ new WeakMap(), xa = {
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
    t.addEventListener("submit", s), Tn.set(t, s);
  },
  unmounted(t) {
    let e = Tn.get(t);
    e && (t.removeEventListener("submit", e), Tn.delete(t));
  }
}, Ot = /* @__PURE__ */ new WeakMap(), Ia = {
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
    let c = s.leave === !0, p = !1, v = new IntersectionObserver(
      function(h) {
        let b = h[0];
        (c ? !b.isIntersecting : b.isIntersecting) && (!s.once || !p) && (p = !0, r.call(o, a), s.once && (v.disconnect(), Ot.delete(t)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    v.observe(t), Ot.set(t, v);
  },
  unmounted(t) {
    let e = Ot.get(t);
    e && (e.disconnect(), Ot.delete(t));
  }
}, Cn = /* @__PURE__ */ new WeakMap();
function Ln(t, e) {
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
const Oa = {
  mounted(t, e) {
    Ln(t, e);
    let n = function() {
      Ln(t, e);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), Cn.set(t, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(t, e) {
    Ln(t, e);
  },
  unmounted(t, e) {
    let n = e.value;
    typeof n == "string" && n.split(" ").filter(function(i) {
      return i.trim();
    }).forEach(function(i) {
      t.classList.remove(i);
    }), t.removeAttribute("data-current");
    let r = Cn.get(t);
    r && (r(), Cn.delete(t));
  }
};
let jr = 0;
const Ma = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    jr++;
    let n = "livue-ignore-" + jr;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, rt = /* @__PURE__ */ new WeakMap();
let qr = 0;
function Pa(t) {
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
function Ra(t) {
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
function zr(t, e) {
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
function Va(t) {
  return !!t.component;
}
const Ha = {
  mounted(t, e, n) {
    let r = Pa(n);
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
    qr++;
    let l = "model-" + qr, u = "input";
    s.blur && (u = "blur"), (s.change || s.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = Ra(s);
    s.live && !d && !c && (d = 150);
    function p(_) {
      if (s.number) {
        let k = Number(_);
        _ = isNaN(k) ? 0 : k;
      }
      s.boolean && (_ = !!_ && _ !== "false" && _ !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = _ : o[a] = _;
    }
    function v(_) {
      d > 0 ? Qe(l, d)(function() {
        p(_);
      }) : c > 0 ? At(l, c)(function() {
        p(_);
      }) : p(_);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let b = Va(n), S = n.component, g = null, O = null, D = null, N = null;
    if (b && S)
      N = S.emit, S.emit = function(_, ...k) {
        if (_ === "update:modelValue") {
          let P = k[0];
          v(P);
          return;
        }
        return N.call(S, _, ...k);
      }, S.props && "modelValue" in S.props && (D = Me(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(_) {
          S.vnode && S.vnode.props && (S.vnode.props.modelValue = _), S.exposed && typeof S.exposed.setValue == "function" && S.exposed.setValue(_), S.update && S.update();
        },
        { immediate: !0 }
      )), rt.set(t, {
        isComponent: !0,
        componentInstance: S,
        originalEmit: N,
        stopWatcher: D,
        property: a,
        state: o,
        modifiers: s
      });
    else {
      if (d > 0) {
        let _ = Qe(l, d);
        g = function(k) {
          let P = Mt(k.target);
          _(function() {
            p(P);
          });
        };
      } else if (c > 0) {
        let _ = At(l, c);
        g = function(k) {
          let P = Mt(k.target);
          _(function() {
            p(P);
          });
        };
      } else
        g = function(_) {
          p(Mt(_.target));
        };
      s.enter ? (O = function(_) {
        _.key === "Enter" && p(Mt(_.target));
      }, t.addEventListener("keyup", O)) : t.addEventListener(u, g), zr(t, h), rt.set(t, {
        isComponent: !1,
        handler: g,
        keyHandler: O,
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
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], zr(t, a);
    }
  },
  unmounted(t) {
    let e = rt.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), rt.delete(t));
  }
}, kn = /* @__PURE__ */ new WeakMap(), ja = 2500;
function qa(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return ja;
}
const za = {
  mounted(t, e, n) {
    let r = ve(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let s = e.modifiers || {}, l = qa(s), u = s["keep-alive"] === !0, d = s.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      c.isPaused || d && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function v() {
      c.intervalId || (c.intervalId = setInterval(p, l));
    }
    function h() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(b) {
        c.isVisible = b[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", h), c.visibilityHandler = h, v(), kn.set(t, c);
  },
  unmounted(t) {
    let e = kn.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), kn.delete(t));
  }
}, Pt = /* @__PURE__ */ new WeakMap();
let un = typeof navigator < "u" ? navigator.onLine : !0, cn = /* @__PURE__ */ new Set(), Fr = !1;
function Fa() {
  Fr || typeof window > "u" || (Fr = !0, window.addEventListener("online", function() {
    un = !0, cn.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    un = !1, cn.forEach(function(t) {
      t(!1);
    });
  }));
}
const Wa = {
  created(t, e) {
    Fa();
    let n = e.modifiers || {}, r = e.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = t.style.display || "", un && (t.style.display = "none")), Pt.set(t, o);
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
    r(un), n.updateFn = r, cn.add(r);
  },
  unmounted(t) {
    let e = Pt.get(t);
    e && e.updateFn && cn.delete(e.updateFn), Pt.delete(t);
  }
};
let Wr = 0;
const it = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new Map(), Ba = {
  created(t, e) {
    Wr++;
    let n = "livue-replace-" + Wr, r = e.modifiers.self === !0;
    it.set(t, {
      id: n,
      isSelf: r,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), r && t.setAttribute("data-livue-replace-self", ""), Nn.set(n, 0);
  },
  mounted(t, e) {
    let n = it.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = it.get(t);
    n && (n.version++, Nn.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = it.get(t);
    e && Nn.delete(e.id), it.delete(t);
  }
}, ot = /* @__PURE__ */ new WeakMap(), Br = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, $a = 200;
function Ua(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(Br))
    if (t[e])
      return Br[e];
  return $a;
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
const Ja = {
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
    let i = ot.get(t), o = e.modifiers || {}, a = Ua(o), s = e.value, l = null, u = null;
    o.class || o.attr ? u = s : typeof s == "string" && (l = s);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, xn(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, xn(t, i, o, u, !0)) : (i.isActive = !1, xn(t, i, o, u, !1));
    }
    i.stopWatch = Me(
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
}, Rt = /* @__PURE__ */ new WeakMap(), Xa = {
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
    Rt.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = Rt.get(t), i = ve(n);
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
    let e = Rt.get(t);
    e && (e.stopWatch && e.stopWatch(), Rt.delete(t));
  }
}, at = /* @__PURE__ */ new WeakMap(), Ya = {
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
    at.set(t, { targetId: n }), Or(n, t, r);
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
      Mr(n.targetId);
      const i = e.modifiers.replace || !1;
      Or(r, t, i), at.set(t, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = at.get(t);
    e && (Mr(e.targetId), at.delete(t));
  }
}, $r = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, Ur = ["ctrl", "alt", "shift", "meta"];
let Jr = 0;
function Ka(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
}
function Ga(t, e) {
  for (let i = 0; i < Ur.length; i++) {
    let o = Ur[i];
    if (e[o] && !t[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in $r)
    e[i] && (n = !0, t.key === $r[i] && (r = !0));
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
      Jr++;
      const c = "v-" + t + "-" + Jr, p = Ka(u);
      let v = null, h = null;
      u.debounce && (v = Qe(c, p)), u.throttle && (h = At(c, p));
      let b = !1, S = null;
      l && (S = l);
      const g = function(_) {
        let k = S, P = [];
        if (l) {
          k = l;
          const C = a.value;
          C != null && (P = Array.isArray(C) ? C : [C]);
        } else {
          const C = a.value;
          if (typeof C == "function") {
            const z = function() {
              C();
            };
            v ? v(z) : h ? h(z) : z();
            return;
          } else typeof C == "string" ? k = C : Array.isArray(C) && C.length > 0 && (k = C[0], P = C.slice(1));
        }
        if (!k) {
          console.warn("[LiVue] v-" + t + ": no method specified");
          return;
        }
        const F = function() {
          u.confirm ? d.callWithConfirm(k, "Are you sure?", ...P) : d.call(k, ...P);
        };
        v ? v(F) : h ? h(F) : F();
      }, O = function(_) {
        if (!(u.self && _.target !== o) && !(r && !Ga(_, u))) {
          if (u.once) {
            if (b)
              return;
            b = !0;
          }
          u.prevent && _.preventDefault(), u.stop && _.stopPropagation(), g();
        }
      }, D = {};
      u.capture && (D.capture = !0), u.passive && (D.passive = !0);
      const N = {
        handler: O,
        options: D,
        outsideHandler: null
      };
      if (n && u.outside) {
        const _ = function(k) {
          if (!o.contains(k.target) && k.target !== o) {
            if (u.once) {
              if (b)
                return;
              b = !0;
            }
            g();
          }
        };
        document.addEventListener(t, _, D), N.outsideHandler = _;
      } else
        o.addEventListener(t, O, D);
      i.set(o, N);
    },
    updated(o, a, s) {
    },
    unmounted(o) {
      const a = i.get(o);
      a && (a.outsideHandler ? document.removeEventListener(t, a.outsideHandler, a.options) : o.removeEventListener(t, a.handler, a.options), i.delete(o));
    }
  };
}
const Za = H("click", { supportsOutside: !0 }), Qa = {
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
let Xr = 0;
const el = {
  created(t, e) {
    let n = e.value;
    n || (Xr++, n = "scroll-" + Xr), t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n;
  },
  updated(t, e) {
    let n = e.value;
    n && n !== t.__livue_scroll_key && (t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n);
  },
  unmounted(t) {
    t.removeAttribute("data-livue-scroll"), delete t.__livue_scroll_key;
  }
}, lt = /* @__PURE__ */ new WeakMap();
function Yr(t, e, n, r, i) {
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
const tl = {
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
        Yr(t, i, o, s, l);
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
        Yr(t, r, e.modifiers || {}, e.value, a);
      }
    }
  },
  unmounted(t) {
    let e = lt.get(t);
    e && (e.stopWatch && e.stopWatch(), lt.delete(t));
  }
}, Vt = /* @__PURE__ */ new WeakMap();
let Kr = 0;
function nl(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function rl(t, e) {
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
function il(t, e) {
  let n = e.split("."), r = t[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const ol = {
  mounted(t, e, n) {
    let r = rl(e, n);
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
    Kr++;
    let l = "watch-" + i + "-" + Kr;
    if (s.blur) {
      let p = function() {
        o.sync();
      };
      t.addEventListener("focusout", p), Vt.set(t, { blurHandler: p });
      return;
    }
    let u = nl(s) || 150, d = Qe(l, u), c = Me(
      function() {
        return il(a, i);
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
let Gr = 0;
function al(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function ll(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function sl(t, e) {
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
function Ri(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function ul(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let r in t)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function cl(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function fl(t) {
  return cl(t) ? t : t.querySelector("input, textarea, select");
}
function Lt(t, e) {
  return {
    mounted(n, r, i) {
      if (al(i) && !ll(i))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = sl(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: s } = a, l = ul(s, o);
      if (!l)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Gr++;
      let d = t + "-" + Gr, c = fl(n);
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
const dl = Lt("debounce", function(t, e, n, r, i) {
  let o = Ri(r) || 150, a = Qe(i, o);
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
}), pl = Lt("throttle", function(t, e, n, r, i) {
  let o = Ri(r) || 150, a = At(i, o);
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
}), hl = fr.unmounted;
fr.unmounted = function(t) {
  let e = gt.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), hl(t);
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
}), ml = dr.unmounted;
dr.unmounted = function(t) {
  let e = gt.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), ml(t);
};
const vl = Lt("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = Tt(o.target);
      a = !!a && a !== "false" && a !== "0", Ct(n, e, a);
    }
  };
});
function Zr(t, e) {
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
    e % 2 ? Zr(Object(n), !0).forEach(function(r) {
      gl(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Zr(Object(n)).forEach(function(r) {
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
function gl(t, e, n) {
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
function yl(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function bl(t, e) {
  if (t == null) return {};
  var n = yl(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
var wl = "1.15.6";
function Se(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var Ae = Se(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), kt = Se(/Edge/i), Qr = Se(/firefox/i), yt = Se(/safari/i) && !Se(/chrome/i) && !Se(/android/i), pr = Se(/iP(ad|od|hone)/i), Vi = Se(/chrome/i) && Se(/android/i), Hi = {
  capture: !1,
  passive: !1
};
function V(t, e, n) {
  t.addEventListener(e, n, !Ae && Hi);
}
function R(t, e, n) {
  t.removeEventListener(e, n, !Ae && Hi);
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
function ji(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function me(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && fn(t, e) : fn(t, e)) || r && t === n)
        return t;
      if (t === n) break;
    } while (t = ji(t));
  }
  return null;
}
var ei = /\s+/g;
function le(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(ei, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(ei, " ");
    }
}
function x(t, e, n) {
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
      var r = x(t, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!e && (t = t.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function qi(t, e, n) {
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
        if (i && i.getBoundingClientRect && (x(i, "transform") !== "none" || n && x(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(x(i, "border-top-width")), s -= p.left + parseInt(x(i, "border-left-width")), l = a + o.height, u = s + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var v = Ze(i || t), h = v && v.a, b = v && v.d;
      v && (a /= b, s /= h, c /= h, d /= b, l = a + d, u = s + c);
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
function ti(t, e, n) {
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
  for (var n = t.lastElementChild; n && (n === I.ghost || x(n, "display") === "none" || e && !fn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function ce(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== I.clone && (!e || fn(t, e)) && n++;
  return n;
}
function ni(t) {
  var e = 0, n = 0, r = ge();
  if (t)
    do {
      var i = Ze(t), o = i.a, a = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function El(t, e) {
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
      var i = x(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ge();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ge();
}
function Sl(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function In(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var bt;
function zi(t, e) {
  return function() {
    if (!bt) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), bt = setTimeout(function() {
        bt = void 0;
      }, e);
    }
  };
}
function _l() {
  clearTimeout(bt), bt = void 0;
}
function Fi(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function Wi(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function Bi(t, e, n) {
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
function Al() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(x(i, "display") === "none" || i === I.ghost)) {
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
      t.splice(El(t, {
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
        var l = 0, u = s.target, d = u.fromRect, c = Z(u), p = u.prevFromRect, v = u.prevToRect, h = s.rect, b = Ze(u, !0);
        b && (c.top -= b.f, c.left -= b.e), u.toRect = c, u.thisAnimationDuration && In(p, c) && !In(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - c.top) / (h.left - c.left) === (d.top - c.top) / (d.left - c.left) && (l = Tl(h, p, v, i.options)), In(c, d) || (u.prevFromRect = d, u.prevToRect = c, l || (l = i.options.animation), i.animate(u, h, c, l)), l && (o = !0, a = Math.max(a, l), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, l), u.thisAnimationDuration = l);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        x(r, "transition", ""), x(r, "transform", "");
        var s = Ze(this.el), l = s && s.a, u = s && s.d, d = (i.left - o.left) / (l || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, x(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = Dl(r), x(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), x(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          x(r, "transition", ""), x(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Dl(t) {
  return t.offsetWidth;
}
function Tl(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var Be = [], On = {
  initializeByDefault: !0
}, Nt = {
  mount: function(e) {
    for (var n in On)
      On.hasOwnProperty(n) && !(n in e) && (e[n] = On[n]);
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
function Cl(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, s = t.fromEl, l = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, c = t.newDraggableIndex, p = t.originalEvent, v = t.putSortable, h = t.extraEventProperties;
  if (e = e || n && n[ae], !!e) {
    var b, S = e.options, g = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !Ae && !kt ? b = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (b = document.createEvent("Event"), b.initEvent(r, !0, !0)), b.to = a || n, b.from = s || n, b.item = i || n, b.clone = o, b.oldIndex = l, b.newIndex = u, b.oldDraggableIndex = d, b.newDraggableIndex = c, b.originalEvent = p, b.pullMode = v ? v.lastPutMode : void 0;
    var O = ye(ye({}, h), Nt.getEventProperties(r, e));
    for (var D in O)
      b[D] = O[D];
    n && n.dispatchEvent(b), S[g] && S[g].call(e, b);
  }
}
var Ll = ["evt"], oe = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = bl(r, Ll);
  Nt.pluginEvent.bind(I)(e, n, ye({
    dragEl: E,
    parentEl: X,
    ghostEl: M,
    rootEl: U,
    nextEl: qe,
    lastDownEl: Xt,
    cloneEl: J,
    cloneHidden: ke,
    dragStarted: ct,
    putSortable: ee,
    activeSortable: I.active,
    originalEvent: i,
    oldIndex: Ye,
    oldDraggableIndex: wt,
    newIndex: se,
    newDraggableIndex: Te,
    hideGhostForTarget: Xi,
    unhideGhostForTarget: Yi,
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
  Cl(ye({
    putSortable: ee,
    cloneEl: J,
    targetEl: E,
    rootEl: U,
    oldIndex: Ye,
    oldDraggableIndex: wt,
    newIndex: se,
    newDraggableIndex: Te
  }, t));
}
var E, X, M, U, qe, Xt, J, ke, Ye, se, wt, Te, Ht, ee, Xe = !1, dn = !1, pn = [], Ve, pe, Mn, Pn, ri, ii, ct, $e, Et, St = !1, jt = !1, Yt, te, Rn = [], Qn = !1, hn = [], yn = typeof document < "u", qt = pr, oi = kt || Ae ? "cssFloat" : "float", kl = yn && !Vi && !pr && "draggable" in document.createElement("div"), $i = (function() {
  if (yn) {
    if (Ae)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Ui = function(e, n) {
  var r = x(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = et(e, 0, n), a = et(e, 1, n), s = o && x(o), l = a && x(a), u = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Z(o).width, d = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Z(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return o && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || u >= i && r[oi] === "none" || a && r[oi] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Nl = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, s = r ? n.left : n.top, l = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === s || o === l || i + a / 2 === s + u / 2;
}, xl = function(e, n) {
  var r;
  return pn.some(function(i) {
    var o = i[ae].options.emptyInsertThreshold;
    if (!(!o || hr(i))) {
      var a = Z(i), s = e >= a.left - o && e <= a.right + o, l = n >= a.top - o && n <= a.bottom + o;
      if (s && l)
        return r = i;
    }
  }), r;
}, Ji = function(e) {
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
}, Xi = function() {
  !$i && M && x(M, "display", "none");
}, Yi = function() {
  !$i && M && x(M, "display", "");
};
yn && !Vi && document.addEventListener("click", function(t) {
  if (dn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), dn = !1, !1;
}, !0);
var He = function(e) {
  if (E) {
    e = e.touches ? e.touches[0] : e;
    var n = xl(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ae]._onDragOver(r);
    }
  }
}, Il = function(e) {
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
      return Ui(t, this.options);
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
  Nt.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Ji(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : kl, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? V(t, "pointerdown", this._onTapStart) : (V(t, "mousedown", this._onTapStart), V(t, "touchstart", this._onTapStart)), this.nativeDraggable && (V(t, "dragover", this), V(t, "dragenter", this)), pn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), _e(this, Al());
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
      if (ql(r), !E && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && yt && l && l.tagName.toUpperCase() === "SELECT") && (l = me(l, i.draggable, r, !1), !(l && l.animated) && Xt !== l)) {
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
      if (U = o, E = r, X = E.parentNode, qe = E.nextSibling, Xt = r, Ht = a.group, I.dragged = E, Ve = {
        target: E,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, ri = Ve.clientX - u.left, ii = Ve.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, E.style["will-change"] = "all", l = function() {
        if (oe("delayEnded", i, {
          evt: e
        }), I.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Qr && i.nativeDraggable && (E.draggable = !0), i._triggerDragStart(e, n), re({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), le(E, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        qi(E, d.trim(), Vn);
      }), V(s, "dragover", He), V(s, "mousemove", He), V(s, "touchmove", He), a.supportPointer ? (V(s, "pointerup", i._onDrop), !this.nativeDraggable && V(s, "pointercancel", i._onDrop)) : (V(s, "mouseup", i._onDrop), V(s, "touchend", i._onDrop), V(s, "touchcancel", i._onDrop)), Qr && this.nativeDraggable && (this.options.touchStartThreshold = 4, E.draggable = !0), oe("delayStart", this, {
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
    E && Vn(E), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
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
      }), this.nativeDraggable && V(document, "dragover", Il);
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
      this._lastX = pe.clientX, this._lastY = pe.clientY, Xi();
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
        } while (n = ji(n));
      Yi();
    }
  },
  _onTouchMove: function(e) {
    if (Ve) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = M && Ze(M, !0), s = M && a && a.a, l = M && a && a.d, u = qt && te && ni(te), d = (o.clientX - Ve.clientX + i.x) / (s || 1) + (u ? u[0] - Rn[0] : 0) / (s || 1), c = (o.clientY - Ve.clientY + i.y) / (l || 1) + (u ? u[1] - Rn[1] : 0) / (l || 1);
      if (!I.active && !Xe) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (M) {
        a ? (a.e += d - (Mn || 0), a.f += c - (Pn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        x(M, "webkitTransform", p), x(M, "mozTransform", p), x(M, "msTransform", p), x(M, "transform", p), Mn = d, Pn = c, pe = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!M) {
      var e = this.options.fallbackOnBody ? document.body : U, n = Z(E, !0, qt, !0, e), r = this.options;
      if (qt) {
        for (te = e; x(te, "position") === "static" && x(te, "transform") === "none" && te !== document; )
          te = te.parentNode;
        te !== document.body && te !== document.documentElement ? (te === document && (te = ge()), n.top += te.scrollTop, n.left += te.scrollLeft) : te = ge(), Rn = ni(te);
      }
      M = E.cloneNode(!0), le(M, r.ghostClass, !1), le(M, r.fallbackClass, !0), le(M, r.dragClass, !0), x(M, "transition", ""), x(M, "transform", ""), x(M, "box-sizing", "border-box"), x(M, "margin", 0), x(M, "top", n.top), x(M, "left", n.left), x(M, "width", n.width), x(M, "height", n.height), x(M, "opacity", "0.8"), x(M, "position", qt ? "absolute" : "fixed"), x(M, "zIndex", "100000"), x(M, "pointerEvents", "none"), I.ghost = M, e.appendChild(M), x(M, "transform-origin", ri / parseInt(M.style.width) * 100 + "% " + ii / parseInt(M.style.height) * 100 + "%");
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
    oe("setupClone", this), I.eventCanceled || (J = Wi(E), J.removeAttribute("id"), J.draggable = !1, J.style["will-change"] = "", this._hideClone(), le(J, this.options.chosenClass, !1), I.clone = J), r.cloneId = Kt(function() {
      oe("clone", r), !I.eventCanceled && (r.options.removeCloneOnHide || U.insertBefore(J, E), r._hideClone(), re({
        sortable: r,
        name: "clone"
      }));
    }), !n && le(E, o.dragClass, !0), n ? (dn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (R(document, "mouseup", r._onDrop), R(document, "touchend", r._onDrop), R(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, E)), V(document, "drop", r), x(E, "transform", "translateZ(0)")), Xe = !0, r._dragStartId = Kt(r._dragStarted.bind(r, n, e)), V(document, "selectstart", r), ct = !0, window.getSelection().removeAllRanges(), yt && x(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, s = this.options, l = s.group, u = I.active, d = Ht === l, c = s.sort, p = ee || u, v, h = this, b = !1;
    if (Qn) return;
    function S(T, m) {
      oe(T, h, ye({
        evt: e,
        isOwner: d,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: p,
        target: r,
        completed: O,
        onMove: function(q, $) {
          return zt(U, n, E, i, q, Z(q), e, $);
        },
        changed: D
      }, m));
    }
    function g() {
      S("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function O(T) {
      return S("dragOverCompleted", {
        insertion: T
      }), T && (d ? u._hideClone() : u._showClone(h), h !== p && (le(E, ee ? ee.options.ghostClass : u.options.ghostClass, !1), le(E, s.ghostClass, !0)), ee !== h && h !== I.active ? ee = h : h === I.active && ee && (ee = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        S("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === E && !E.animated || r === n && !r.animated) && ($e = null), !s.dragoverBubble && !e.rootEl && r !== document && (E.parentNode[ae]._isOutsideThisEl(e.target), !T && He(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), b = !0;
    }
    function D() {
      se = ce(E), Te = ce(E, s.draggable), re({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: se,
        newDraggableIndex: Te,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = me(r, s.draggable, n, !0), S("dragOver"), I.eventCanceled) return b;
    if (E.contains(e.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return O(!1);
    if (dn = !1, u && !s.disabled && (d ? c || (a = X !== U) : ee === this || (this.lastPutMode = Ht.checkPull(this, u, E, e)) && l.checkPut(this, u, E, e))) {
      if (v = this._getDirection(e, r) === "vertical", i = Z(E), S("dragOverValid"), I.eventCanceled) return b;
      if (a)
        return X = U, g(), this._hideClone(), S("revert"), I.eventCanceled || (qe ? U.insertBefore(E, qe) : U.appendChild(E)), O(!0);
      var N = hr(n, s.draggable);
      if (!N || Rl(e, v, this) && !N.animated) {
        if (N === E)
          return O(!1);
        if (N && n === e.target && (r = N), r && (o = Z(r)), zt(U, n, E, i, r, o, e, !!r) !== !1)
          return g(), N && N.nextSibling ? n.insertBefore(E, N.nextSibling) : n.appendChild(E), X = n, D(), O(!0);
      } else if (N && Pl(e, v, this)) {
        var _ = et(n, 0, s, !0);
        if (_ === E)
          return O(!1);
        if (r = _, o = Z(r), zt(U, n, E, i, r, o, e, !1) !== !1)
          return g(), n.insertBefore(E, _), X = n, D(), O(!0);
      } else if (r.parentNode === n) {
        o = Z(r);
        var k = 0, P, F = E.parentNode !== n, C = !Nl(E.animated && E.toRect || i, r.animated && r.toRect || o, v), z = v ? "top" : "left", w = ti(r, "top", "top") || ti(E, "top", "top"), Y = w ? w.scrollTop : void 0;
        $e !== r && (P = o[z], St = !1, jt = !C && s.invertSwap || F), k = Vl(e, r, o, v, C ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, jt, $e === r);
        var K;
        if (k !== 0) {
          var ne = ce(E);
          do
            ne -= k, K = X.children[ne];
          while (K && (x(K, "display") === "none" || K === M));
        }
        if (k === 0 || K === r)
          return O(!1);
        $e = r, Et = k;
        var f = r.nextElementSibling, y = !1;
        y = k === 1;
        var A = zt(U, n, E, i, r, o, e, y);
        if (A !== !1)
          return (A === 1 || A === -1) && (y = A === 1), Qn = !0, setTimeout(Ml, 30), g(), y && !f ? n.appendChild(E) : r.parentNode.insertBefore(E, y ? f : r), w && Fi(w, 0, Y - w.scrollTop), X = E.parentNode, P !== void 0 && !jt && (Yt = Math.abs(P - Z(r)[z])), D(), O(!0);
      }
      if (n.contains(E))
        return O(!1);
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
    }), X = E && E.parentNode, se = ce(E), Te = ce(E, r.draggable), I.eventCanceled) {
      this._nulling();
      return;
    }
    Xe = !1, jt = !1, St = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), er(this.cloneId), er(this._dragStartId), this.nativeDraggable && (R(document, "drop", this), R(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), yt && x(document.body, "user-select", ""), x(E, "transform", ""), e && (ct && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), M && M.parentNode && M.parentNode.removeChild(M), (U === X || ee && ee.lastPutMode !== "clone") && J && J.parentNode && J.parentNode.removeChild(J), E && (this.nativeDraggable && R(E, "dragend", this), Vn(E), E.style["will-change"] = "", ct && !Xe && le(E, ee ? ee.options.ghostClass : this.options.ghostClass, !1), le(E, this.options.chosenClass, !1), re({
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
    })), I.active && ((se == null || se === -1) && (se = Ye, Te = wt), re({
      sortable: this,
      name: "end",
      toEl: X,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    oe("nulling", this), U = E = X = M = qe = J = Xt = ke = Ve = pe = ct = se = Te = Ye = wt = $e = Et = ee = Ht = I.dragged = I.ghost = I.clone = I.active = null, hn.forEach(function(e) {
      e.checked = !0;
    }), hn.length = Mn = Pn = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        E && (this._onDragOver(e), Ol(e));
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
      n = r[i], me(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || jl(n));
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
    var i = Nt.modifyOption(this, e, n);
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && Ji(r);
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
      if (oe("hideClone", this), I.eventCanceled) return;
      x(J, "display", "none"), this.options.removeCloneOnHide && J.parentNode && J.parentNode.removeChild(J), ke = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ke) {
      if (oe("showClone", this), I.eventCanceled) return;
      E.parentNode == U && !this.options.group.revertClone ? U.insertBefore(J, E) : qe ? U.insertBefore(J, qe) : U.appendChild(J), this.options.group.revertClone && this.animate(E, J), x(J, "display", ""), ke = !1;
    }
  }
};
function Ol(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function zt(t, e, n, r, i, o, a, s) {
  var l, u = t[ae], d = u.options.onMove, c;
  return window.CustomEvent && !Ae && !kt ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = t, l.dragged = n, l.draggedRect = r, l.related = i || e, l.relatedRect = o || Z(e), l.willInsertAfter = s, l.originalEvent = a, t.dispatchEvent(l), d && (c = d.call(u, l, a)), c;
}
function Vn(t) {
  t.draggable = !1;
}
function Ml() {
  Qn = !1;
}
function Pl(t, e, n) {
  var r = Z(et(n.el, 0, n.options, !0)), i = Bi(n.el, n.options, M), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function Rl(t, e, n) {
  var r = Z(hr(n.el, n.options.draggable)), i = Bi(n.el, n.options, M), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function Vl(t, e, n, r, i, o, a, s) {
  var l = r ? t.clientY : t.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (s && Yt < u * i) {
      if (!St && (Et === 1 ? l > d + u * o / 2 : l < c - u * o / 2) && (St = !0), St)
        p = !0;
      else if (Et === 1 ? l < d + Yt : l > c - Yt)
        return -Et;
    } else if (l > d + u * (1 - i) / 2 && l < c - u * (1 - i) / 2)
      return Hl(e);
  }
  return p = p || a, p && (l < d + u * o / 2 || l > c - u * o / 2) ? l > d + u / 2 ? 1 : -1 : 0;
}
function Hl(t) {
  return ce(E) < ce(t) ? 1 : -1;
}
function jl(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function ql(t) {
  hn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && hn.push(r);
  }
}
function Kt(t) {
  return setTimeout(t, 0);
}
function er(t) {
  return clearTimeout(t);
}
yn && V(document, "touchmove", function(t) {
  (I.active || Xe) && t.cancelable && t.preventDefault();
});
I.utils = {
  on: V,
  off: R,
  css: x,
  find: qi,
  is: function(e, n) {
    return !!me(e, n, e, !1);
  },
  extend: Sl,
  throttle: zi,
  closest: me,
  toggleClass: le,
  clone: Wi,
  index: ce,
  nextTick: Kt,
  cancelNextTick: er,
  detectDirection: Ui,
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
    r.utils && (I.utils = ye(ye({}, I.utils), r.utils)), Nt.mount(r);
  });
};
I.create = function(t, e) {
  return new I(t, e);
};
I.version = wl;
var G = [], ft, tr, nr = !1, Hn, jn, mn, dt;
function zl() {
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
      this.sortable.nativeDraggable ? R(document, "dragover", this._handleAutoScroll) : (R(document, "pointermove", this._handleFallbackAutoScroll), R(document, "touchmove", this._handleFallbackAutoScroll), R(document, "mousemove", this._handleFallbackAutoScroll)), ai(), Gt(), _l();
    },
    nulling: function() {
      mn = tr = ft = nr = dt = Hn = jn = null, G.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, s = document.elementFromPoint(o, a);
      if (mn = n, r || this.options.forceAutoScrollFallback || kt || Ae || yt) {
        qn(n, this.options, s, r);
        var l = xe(s, !0);
        nr && (!dt || o !== Hn || a !== jn) && (dt && ai(), dt = setInterval(function() {
          var u = xe(document.elementFromPoint(o, a), !0);
          u !== l && (l = u, Gt()), qn(n, i.options, u, r);
        }, 10), Hn = o, jn = a);
      } else {
        if (!this.options.bubbleScroll || xe(s, !0) === ge()) {
          Gt();
          return;
        }
        qn(n, this.options, xe(s, !1), !1);
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
function ai() {
  clearInterval(dt);
}
var qn = zi(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = ge(), u = !1, d;
    tr !== n && (tr = n, Gt(), ft = e.scroll, d = e.scrollFn, ft === !0 && (ft = xe(n, !0)));
    var c = 0, p = ft;
    do {
      var v = p, h = Z(v), b = h.top, S = h.bottom, g = h.left, O = h.right, D = h.width, N = h.height, _ = void 0, k = void 0, P = v.scrollWidth, F = v.scrollHeight, C = x(v), z = v.scrollLeft, w = v.scrollTop;
      v === l ? (_ = D < P && (C.overflowX === "auto" || C.overflowX === "scroll" || C.overflowX === "visible"), k = N < F && (C.overflowY === "auto" || C.overflowY === "scroll" || C.overflowY === "visible")) : (_ = D < P && (C.overflowX === "auto" || C.overflowX === "scroll"), k = N < F && (C.overflowY === "auto" || C.overflowY === "scroll"));
      var Y = _ && (Math.abs(O - i) <= a && z + D < P) - (Math.abs(g - i) <= a && !!z), K = k && (Math.abs(S - o) <= a && w + N < F) - (Math.abs(b - o) <= a && !!w);
      if (!G[c])
        for (var ne = 0; ne <= c; ne++)
          G[ne] || (G[ne] = {});
      (G[c].vx != Y || G[c].vy != K || G[c].el !== v) && (G[c].el = v, G[c].vx = Y, G[c].vy = K, clearInterval(G[c].pid), (Y != 0 || K != 0) && (u = !0, G[c].pid = setInterval(function() {
        r && this.layer === 0 && I.active._onTouchMove(mn);
        var f = G[this.layer].vy ? G[this.layer].vy * s : 0, y = G[this.layer].vx ? G[this.layer].vx * s : 0;
        typeof d == "function" && d.call(I.dragged.parentNode[ae], y, f, t, mn, G[this.layer].el) !== "continue" || Fi(G[this.layer].el, y, f);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && p !== l && (p = xe(p, !1)));
    nr = u;
  }
}, 30), Ki = function(e) {
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
  drop: Ki
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
  drop: Ki
};
_e(vr, {
  pluginName: "removeOnSpill"
});
I.mount(new zl());
I.mount(vr, mr);
const Ke = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap();
function Fl(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Ft = /* @__PURE__ */ new WeakMap(), Wl = {
  mounted(t, e, n) {
    let r = ve(n), i = e.modifiers || {}, o = e.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Fl(i), s = i.horizontal ? "horizontal" : "vertical";
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
        let v = p.newIndex, h = p.oldIndex;
        if (h === v)
          return;
        let b = Ft.get(t), S = b ? b.value : null, g = typeof S == "string";
        if (Array.isArray(S)) {
          let D = p.from;
          h < v ? D.insertBefore(p.item, D.children[h]) : D.insertBefore(p.item, D.children[h + 1]);
          let N = S.splice(h, 1)[0];
          S.splice(v, 0, N);
          return;
        }
        if (g && r) {
          let D = S, N = [], _ = p.item, k = Zt.get(_);
          k === void 0 && (k = _.dataset.livueSortItem), typeof k == "string" && /^\d+$/.test(k) && (k = parseInt(k, 10));
          let P = p.from, F = p.to, C = [k, v].concat(N);
          if (P !== F) {
            let w = F.dataset.livueSortMethod;
            w && (D = w);
            let Y = P.dataset.livueSortId || P.dataset.livueSortGroup || null;
            C.push(Y);
          }
          r.call(D, C);
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
}, Bl = {
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
}, $l = {
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
}, Xl = H("dblclick"), Yl = H("mousedown"), Kl = H("mouseup"), Gl = H("mouseenter"), Zl = H("mouseleave"), Ql = H("mouseover"), es = H("mouseout"), ts = H("mousemove"), ns = H("contextmenu"), rs = H("keydown", { isKeyboardEvent: !0 }), is = H("keyup", { isKeyboardEvent: !0 }), os = H("keypress", { isKeyboardEvent: !0 }), as = H("focus"), ls = H("focusin"), ss = H("focusout"), us = H("touchstart"), cs = H("touchend"), fs = H("touchmove"), ds = H("touchcancel"), ps = H("change"), hs = H("input"), ms = H("reset"), vs = H("dragstart"), gs = H("dragend"), ys = H("dragenter"), bs = H("dragleave"), ws = H("dragover"), Es = H("drop"), Ss = H("copy"), _s = H("cut"), As = H("paste"), Ds = H("wheel"), Ts = H("resize");
function Cs() {
  L("init", Na), L("submit", xa), L("intersect", Ia), L("current", Oa), L("ignore", Ma), L("model-livue", Ha), L("debounce", dl), L("throttle", pl), L("blur", fr), L("enter", dr), L("boolean", vl), L("poll", za), L("offline", Wa), L("transition", pa), L("replace", Ba), L("loading", Ja), L("target", Xa), L("stream", Ya), L("click", Za), L("navigate", Qa), L("scroll", el), L("dirty", tl), L("watch", ol), L("sort", Wl), L("sort-item", Bl), L("sort-handle", $l), L("sort-ignore", Ul), L("sort-group", Jl), L("dblclick", Xl), L("mousedown", Yl), L("mouseup", Kl), L("mouseenter", Gl), L("mouseleave", Zl), L("mouseover", Ql), L("mouseout", es), L("mousemove", ts), L("contextmenu", ns), L("keydown", rs), L("keyup", is), L("keypress", os), L("focus", as), L("focusin", ls), L("focusout", ss), L("touchstart", us), L("touchend", cs), L("touchmove", fs), L("touchcancel", ds), L("change", ps), L("input", hs), L("reset", ms), L("dragstart", vs), L("dragend", gs), L("dragenter", ys), L("dragleave", bs), L("dragover", ws), L("drop", Es), L("copy", Ss), L("cut", _s), L("paste", As), L("wheel", Ds), L("resize", Ts);
}
let Ce = null, st = null, li = !1;
function Ls() {
  if (li)
    return;
  li = !0;
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
function ks() {
  return Ce || (Ls(), Ce = document.createElement("div"), Ce.className = "livue-hmr-indicator", document.body.appendChild(Ce), Ce);
}
function Wt(t, e) {
  const n = ks();
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
        si();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, st = setTimeout(function() {
        si();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function si() {
  Ce && Ce.classList.remove("visible");
}
let Fe = null, bn = !0, Gi = !0, pt = !0, Qt = [];
function Ns(t) {
  Fe = t;
}
async function xs(t) {
  if (bn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), pt && Wt("updating", t.fileName), Qt.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Gi ? Is() : null, n = await fetch(window.location.href, {
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
      }), Fe.reboot(), e && (await Ms(), Os(e)), pt && Wt("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), pt && Wt("error");
    }
  }
}
function Is() {
  const t = /* @__PURE__ */ new Map();
  return Fe && Fe.all().forEach(function(n) {
    if (ui(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        ui(r, i.name, i.state, t);
      }
  }), t;
}
function ui(t, e, n, r) {
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
function Os(t) {
  Fe && t.forEach(function(e, n) {
    const r = Fe.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function Ms() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Ps() {
  return typeof import.meta < "u" && !1;
}
function Rs() {
  bn = !0;
}
function Vs() {
  bn = !1;
}
function Hs() {
  return bn;
}
function js(t) {
  t.indicator !== void 0 && (pt = t.indicator), t.preserveState !== void 0 && (Gi = t.preserveState);
}
function qs(t) {
  return Qt.push(t), function() {
    const e = Qt.indexOf(t);
    e !== -1 && Qt.splice(e, 1);
  };
}
async function zs() {
  Fe && await xs({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ue = !1, zn = [];
class Fs {
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
    Uo(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Cs(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), _o(this), this._startObserver(), Ns(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Qo());
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
    So(e);
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
    Io();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Ho();
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
      ...Zo()
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
    let r = new ka(e);
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
    return wr(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Er();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), Dr();
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
    }), Dr();
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
      isAvailable: Ps,
      isEnabled: Hs,
      enable: Rs,
      disable: Vs,
      configure: js,
      onUpdate: qs,
      trigger: zs
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
      var n = Er();
      n.forEach(function(r) {
        var i = wr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        zn.push(i);
      });
    } else !e && Ue && (Ue = !1, console.log("[LiVue] Debug mode disabled"), zn.forEach(function(r) {
      r();
    }), zn = []);
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
const gr = new Fs();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = co, document.head.appendChild(t);
}
var be = window.LiVueConfig || {};
(be.showProgressBar !== void 0 || be.progressBarColor !== void 0 || be.prefetch !== void 0 || be.prefetchOnHover !== void 0 || be.hoverDelay !== void 0 || be.cachePages !== void 0 || be.maxCacheSize !== void 0 || be.restoreScroll !== void 0) && gr.configureNavigation(be);
function ci() {
  gr.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ci) : queueMicrotask(ci);
window.LiVue = gr;
export {
  gr as default
};
//# sourceMappingURL=livue.esm.js.map
