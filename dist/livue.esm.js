import { reactive as xe, toRefs as Xi, effectScope as Yi, ref as tn, markRaw as Ki, defineComponent as Gi, shallowRef as li, onMounted as si, onUnmounted as ui, h as vr, inject as Zi, provide as Qi, nextTick as nr, onBeforeUnmount as eo, onBeforeMount as to, readonly as no, watchEffect as ro, watch as Ie, computed as io, createApp as oo } from "vue";
const ao = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let Ve = null;
function et() {
  if (Ve)
    return Ve;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return Ve = t.getAttribute("content"), Ve;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (Ve = decodeURIComponent(e[1]), Ve) : null;
}
function lo() {
  Ve = null;
}
let G = {
  color: "#29d",
  height: "2px",
  showSpinner: !0,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, te = null, zn = null, le = null, be = null, nn = !1, ht = 0;
function so(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function uo(t) {
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
            height: ${G.height};
            background: ${G.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${G.speed}ms ${G.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${G.color}, 0 0 5px ${G.color};
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
            border-top-color: ${G.color};
            border-left-color: ${G.color};
            border-radius: 50%;
            animation: livue-spinner 400ms linear infinite;
        }
        .livue-progress-bar.livue-progress-hidden,
        .livue-progress-spinner.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${G.speed}ms ${G.easing};
        }
        @keyframes livue-spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, document.head.appendChild(t);
}
function co() {
  if (le) return;
  ci(), le = document.createElement("div"), le.className = "livue-progress-bar livue-progress-hidden", le.innerHTML = '<div class="livue-progress-peg"></div>', G.showSpinner && (be = document.createElement("div"), be.className = "livue-progress-spinner livue-progress-hidden", be.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(G.parent) || document.body;
  t.appendChild(le), be && t.appendChild(be);
}
function fo() {
  if (!nn) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), nn = !1, ci());
}
function po(t) {
  Object.assign(G, t), fo();
}
function ho() {
  ht++, te === null && (co(), te = 0, le && le.classList.remove("livue-progress-hidden"), be && be.classList.remove("livue-progress-hidden"), vn(G.minimum), G.trickle && (zn = setInterval(function() {
    fi();
  }, G.trickleSpeed)));
}
function vn(t) {
  te !== null && (t = so(t, G.minimum, 1), te = t, le && (le.style.transform = "translate3d(" + uo(t) + "%, 0, 0)"));
}
function fi() {
  if (te === null || te >= 1) return;
  let t;
  te < 0.2 ? t = 0.1 : te < 0.5 ? t = 0.04 : te < 0.8 ? t = 0.02 : te < 0.99 ? t = 5e-3 : t = 0, vn(te + t);
}
function di() {
  ht = Math.max(0, ht - 1), !(ht > 0) && te !== null && (vn(1), clearInterval(zn), zn = null, setTimeout(function() {
    le && le.classList.add("livue-progress-hidden"), be && be.classList.add("livue-progress-hidden"), setTimeout(function() {
      te = null, le && (le.style.transform = "translate3d(-100%, 0, 0)");
    }, G.speed);
  }, G.speed));
}
function mo() {
  ht = 0, di();
}
function vo() {
  return te !== null;
}
function go() {
  return te;
}
const Oe = {
  configure: po,
  start: ho,
  set: vn,
  trickle: fi,
  done: di,
  forceDone: mo,
  isStarted: vo,
  getStatus: go
};
var ut = null, gr = !1, Ke = !1, ce = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, we = /* @__PURE__ */ new Map(), je = /* @__PURE__ */ new Map(), Fn = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new Map(), Le = null;
function yo(t) {
  Object.assign(ce, t), t.progressBarColor && Oe.configure({ color: t.progressBarColor });
}
function bo(t) {
  ut = t, !gr && (gr = !0, Le = pi(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Le },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (hi(Le), Le = e.state.pageKey, Tt(e.state.url, !1, !0));
  }), Eo());
}
function pi() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function hi(t) {
  if (!(!ce.restoreScroll || !t)) {
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
function wo(t) {
  if (!(!ce.restoreScroll || !t)) {
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
function Eo() {
  document.addEventListener("click", So, !0), ce.prefetch && (document.addEventListener("mouseenter", Ao, !0), document.addEventListener("mouseleave", Do, !0), document.addEventListener("mousedown", To, !0), document.addEventListener("focus", Co, !0));
}
function So(t) {
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
function _o(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function Ao(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ce.prefetchOnHover)) {
      var n = _o(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            gn(r);
          }, ce.hoverDelay);
          Fn.set(e, i);
        }
      }
    }
  }
}
function Do(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Fn.get(e);
      n && (clearTimeout(n), Fn.delete(e));
    }
  }
}
function To(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || gn(n);
    }
  }
}
function Co(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ce.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || gn(n);
    }
  }
}
function gn(t) {
  var e = new URL(t, location.origin).href;
  if (je.has(e))
    return je.get(e);
  if (we.has(e))
    return Promise.resolve(we.get(e).html);
  var n = fetch(e, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return je.delete(e), r.ok ? r.text().then(function(i) {
      return ce.cachePages && mi(e, i), i;
    }) : null;
  }).catch(function(r) {
    return je.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return je.set(e, n), n;
}
function mi(t, e) {
  for (var n = new DOMParser(), r = n.parseFromString(e, "text/html"), i = r.querySelector("title"); we.size >= ce.maxCacheSize; ) {
    var o = we.keys().next().value;
    we.delete(o);
  }
  we.set(t, {
    html: e,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function Lo() {
  we.clear();
}
function rr(t) {
  Ke || !t || !t.url || (t.navigate ? Tt(t.url, !0, !1) : (Ke = !0, window.location.href = t.url));
}
async function Tt(t, e, n) {
  if (!Ke) {
    if (!ut) {
      window.location.href = t;
      return;
    }
    var r = new URL(t, location.origin).href, i = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: we.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(i)) {
      Ke = !0, n || hi(Le), ce.showProgressBar && Oe.start();
      try {
        var o, a = we.get(r);
        if (a)
          o = a.html;
        else if (je.has(r))
          o = await je.get(r);
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
          o = await l.text(), ce.cachePages && mi(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), p = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(S) {
              typeof S == "function" && S(u);
            }
          }
        });
        window.dispatchEvent(p);
        var c = ko(), d = /* @__PURE__ */ new Set();
        c.forEach(function(S) {
          S.livueIds.forEach(function(O) {
            d.add(O);
          });
        }), ut._stopObserver(), ut.destroyExcept(d), c.forEach(function(S) {
          S.element.parentNode && S.element.parentNode.removeChild(S.element);
        });
        var v = u.querySelector("title");
        v && (document.title = v.textContent), document.body.innerHTML = u.body.innerHTML, xo(c);
        var h = u.querySelector('meta[name="csrf-token"]'), w = document.querySelector('meta[name="csrf-token"]');
        if (h && w && (w.setAttribute("content", h.getAttribute("content")), lo()), No(u), Io(u), e && (Le = pi(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Le },
          "",
          r
        )), Oo(u), ut.rebootPreserving(), n)
          wo(Le);
        else if (location.hash) {
          var b = document.querySelector(location.hash);
          b ? b.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (S) {
        console.error("[LiVue] Navigation failed:", S), window.location.href = t;
      } finally {
        Ke = !1, ce.showProgressBar && Oe.done();
      }
    }
  }
}
function ko() {
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
function No(t) {
  var e = document.querySelectorAll("[data-livue-head]");
  e.forEach(function(r) {
    r.remove();
  });
  var n = t.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Io(t) {
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
function Oo(t) {
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
function Mo() {
  return Ke;
}
var Ue = /* @__PURE__ */ new Map(), Po = [
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
  }) : (Ue.has(t) || Ue.set(t, /* @__PURE__ */ new Set()), Ue.get(t).add(e), function() {
    var n = Ue.get(t);
    n && (n.delete(e), n.size === 0 && Ue.delete(t));
  });
}
function ue(t, e) {
  var n = Ue.get(t);
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
  return Po.slice();
}
var Wn = [], Bn = [], At = !1;
function Ro(t) {
  return t.isolate ? Ho(t) : new Promise(function(e, n) {
    Wn.push({
      payload: t,
      resolve: e,
      reject: n
    }), At || (At = !0, queueMicrotask(gi));
  });
}
function Vo(t) {
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
    Oe.start();
    var n = yi(), r = et(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = t.map(function(b) {
      return b.payload;
    }), a = e.map(function(b) {
      return b.payload;
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
        headers: i,
        body: JSON.stringify(l),
        credentials: "same-origin"
      }), u = await s.json();
      if (!s.ok) {
        var p = new Error(u.error || "Request failed");
        p.status = s.status, p.data = u;
        for (var c = 0; c < t.length; c++)
          t[c].reject(p);
        for (var c = 0; c < e.length; c++)
          e[c].reject(p);
        return;
      }
      for (var d = u.responses || [], v = u.lazyResponses || [], c = 0; c < d.length; c++)
        if (d[c] && d[c].redirect) {
          rr(d[c].redirect);
          return;
        }
      for (var c = 0; c < t.length; c++) {
        var h = d[c];
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
        var h = v[c];
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
      ue("request.finished", {
        url: n,
        success: !0,
        responses: d,
        lazyResponses: v,
        updateCount: t.length,
        lazyCount: e.length
      });
    } catch (b) {
      for (var c = 0; c < t.length; c++)
        t[c].reject(b);
      for (var c = 0; c < e.length; c++)
        e[c].reject(b);
      ue("request.finished", {
        url: n,
        success: !1,
        error: b,
        updateCount: t.length,
        lazyCount: e.length
      });
    } finally {
      Oe.done();
    }
  }
}
async function Ho(t) {
  Oe.start();
  var e = yi(), n = et(), r = {
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
      return rr(s.redirect), new Promise(function() {
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
    Oe.done();
  }
}
function yi() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function wn(t, e, n, r, i) {
  return Ro({
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
  return xe(Object.assign({}, t));
}
function jo(t, e) {
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
function qo(t) {
  return Xi(t);
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
  let l = a;
  for (let u = 1; u < r.length - 1; u++) {
    let p = r[u];
    (l[p] === null || l[p] === void 0) && (l[p] = {}), Array.isArray(l[p]) && u + 1 < r.length && isNaN(Number(r[u + 1])) && (l[p] = Object.assign({}, l[p])), l = l[p];
  }
  let s = r[r.length - 1];
  l[s] = n, t[i] = a;
}
let Un = null, Ei = /* @__PURE__ */ new Map();
function zo() {
  return xe({});
}
function de(t, e) {
  Jn(t);
  for (let n in e)
    t[n] = e[n];
}
function Jn(t) {
  for (let e in t)
    delete t[e];
}
function Fo(t) {
  Un = t;
}
function Fe(t, e, n, r) {
  r = r || {};
  let i = !1;
  return ue("error.occurred", {
    error: t,
    componentName: e,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : (Un ? Un(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function Wo(t, e) {
  typeof e == "function" && Ei.set(t, e);
}
function Xn(t) {
  Ei.delete(t);
}
var Si = [];
function T(t, e, n) {
  Si.push({
    name: t,
    directive: e
  });
}
function Bo() {
  return Si;
}
const Ne = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map();
let Er = !1;
function tt() {
  return typeof window < "u" && window.Echo;
}
function $o(t, e) {
  if (!tt())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = e + ":" + t;
  if (Ne.has(n))
    return Ne.get(n);
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
  return Ne.set(n, r), r;
}
function _i(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!tt())
    return Er || (Er = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: p, isCustomEvent: c } = o, d = $o(a, l);
    if (!d) continue;
    const v = l + ":" + a + ":" + s + ":" + t;
    if (Me.has(v)) {
      r.push(v);
      continue;
    }
    const h = function(w) {
      try {
        n(u, w);
      } catch (b) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', b);
      }
    };
    if (l === "presence" && p)
      Uo(d, s, h);
    else {
      const w = c ? "." + s : s;
      d.listen(w, h);
    }
    Me.set(v, {
      channel: d,
      channelKey: l + ":" + a,
      event: s,
      handler: h,
      isPresenceEvent: p,
      isCustomEvent: c
    }), r.push(v);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      Ai(r[i]);
  };
}
function Uo(t, e, n) {
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
  const e = Me.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    Me.delete(t), Jo(e.channelKey);
  }
}
function Sr(t) {
  const e = ":" + t, n = [];
  Me.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    Ai(n[r]);
}
function Jo(t) {
  let e = !1;
  if (Me.forEach(function(r) {
    r.channelKey === t && (e = !0);
  }), e) return;
  if (Ne.get(t) && tt()) {
    const r = t.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Ne.delete(t);
}
function _r() {
  Me.clear(), Ne.forEach(function(t, e) {
    if (tt()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Ne.clear();
}
function Xo() {
  return {
    echoAvailable: tt(),
    channels: Array.from(Ne.keys()),
    subscriptions: Array.from(Me.keys())
  };
}
function Yo() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Te = /* @__PURE__ */ new Map();
function rn(t, e, n, r) {
  Te.has(t) || Te.set(t, /* @__PURE__ */ new Set());
  var i = {
    componentName: e,
    componentId: n,
    handler: r
  };
  return Te.get(t).add(i), function() {
    var o = Te.get(t);
    o && (o.delete(i), o.size === 0 && Te.delete(t));
  };
}
function Ut(t, e, n, r, i, o) {
  var a = Te.get(t);
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
function Ar(t) {
  Te.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Te.delete(n);
  });
}
function Ko(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    Ut(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Go(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, l = e[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function ir() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function Zo(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", t), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = ir();
    s.open("POST", u, !0);
    var p = et();
    p && s.setRequestHeader("X-CSRF-TOKEN", p), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var d = Math.round(c.loaded / c.total * 100);
        i(d);
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
        var d = new Error(c.error || c.message || "Upload failed");
        d.status = s.status, d.data = c, a(d);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function Sn(t) {
  if (!t || t.length === 0) return Promise.resolve();
  var e = ir() + "-remove", n = et();
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
function Qo(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(t), s = new FormData();
    l.forEach(function(d) {
      s.append("files[]", d);
    }), s.append("component", e), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), p = ir();
    u.open("POST", p, !0);
    var c = et();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(d) {
      if (d.lengthComputable) {
        var v = Math.round(d.loaded / d.total * 100);
        i({ overall: v });
      }
    }), u.onload = function() {
      var d;
      try {
        d = JSON.parse(u.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (u.status >= 200 && u.status < 300)
        o({
          results: d.results || [],
          errors: d.errors || []
        });
      else {
        var v = new Error(d.error || d.message || "Upload failed");
        v.status = u.status, v.data = d, a(v);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(s);
  });
}
const ea = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var Dr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Dr || (Dr = {}));
function ta() {
  const t = Yi(!0), e = t.run(() => tn({}));
  let n = [], r = [];
  const i = Ki({
    install(o) {
      i._a = o, o.provide(ea, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
function na(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
function ra(t) {
  return Gi({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = tn(!1), i = li(null), o = null, a = tn(null);
      async function l() {
        if (!r.value)
          try {
            let u = await Vo({
              component: e.config.name,
              props: e.config.props || {}
            });
            u.html && u.snapshot && s(u);
          } catch (u) {
            console.error("[LiVue] Lazy load failed:", u);
          }
      }
      function s(u) {
        let p = JSON.parse(u.snapshot);
        _n++;
        let c = "lazy-" + _n + "-" + Date.now(), d = p.memo ? p.memo.name : "", v = na(p.state || {}), h = p.memo || {}, { createLivueHelper: w, buildComponentDef: b, processTemplate: S, createReactiveState: O } = t._lazyHelpers, L = O(v), M = JSON.parse(JSON.stringify(v)), D = { _updateTemplate: null }, C = w(
          c,
          L,
          h,
          D,
          M,
          u.snapshot
        );
        h.errors && de(C.errors, h.errors);
        let I = "livue-lazy-child-" + _n, U = S(u.html, t), m = on(
          U.template,
          'data-livue-id="' + c + '"'
        ), j = b(m, L, C, t._versions, d);
        t._childRegistry[c] = {
          tagName: I,
          state: L,
          memo: h,
          livue: C,
          componentRef: D,
          name: d,
          id: c
        }, D._updateTemplate = function(J) {
          let f = S(J, t), y = on(
            f.template,
            'data-livue-id="' + c + '"'
          );
          for (let _ in f.childDefs)
            t.vueApp._context.components[_] || t.vueApp.component(_, f.childDefs[_]);
          let A = b(y, L, C, t._versions, d);
          t.vueApp._context.components[I] = A, t._versions[I] = (t._versions[I] || 0) + 1, i.value = A;
        };
        let K = h.listeners || null;
        if (K)
          for (let J in K)
            (function(f, y) {
              rn(J, d, c, function(A) {
                y.call(f, A);
              });
            })(K[J], C);
        for (let J in U.childDefs)
          t.vueApp._context.components[J] || t.vueApp.component(J, U.childDefs[J]);
        t._versions[I] = 0, t.vueApp._context.components[I] || t.vueApp.component(I, j), i.value = j, r.value = !0;
      }
      return si(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
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
function Ze(t, e) {
  let n = t + ":debounce:" + e;
  if (!mt.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, p) {
        o = u, a = p, r = setTimeout(function() {
          let c = i, d = o, v = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(d).catch(v);
        }, e);
      });
    };
    mt.set(n, l);
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
  Cr || (Cr = !0, typeof BroadcastChannel < "u" ? (ln = new BroadcastChannel(an), ln.onmessage = ia) : window.addEventListener("storage", oa));
}
function ia(t) {
  let e = t.data;
  e.tabId !== or && Ti(e);
}
function oa(t) {
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
function aa(t, e) {
  Di(), ar.set(t, e);
}
function Lr(t) {
  ar.delete(t);
}
function la(t, e, n, r) {
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
function sa(t, e, n) {
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
function xr() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const ua = {
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
    xr();
  },
  updated(t, e) {
    let n = An.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), Yn() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    An.delete(t), t.removeAttribute("data-livue-transition"), xr();
  }
};
function ca(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const lr = /* @__PURE__ */ new Map();
async function fa(t, e = {}) {
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
        "X-CSRF-TOKEN": et(),
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
      const { done: p, value: c } = await a.read();
      if (p)
        break;
      s += l.decode(c, { stream: !0 });
      const d = s.split(`
`);
      s = d.pop() || "";
      for (const v of d)
        if (v.trim())
          try {
            const h = JSON.parse(v);
            if (h.stream)
              da(h.stream), n(h.stream);
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
        const p = JSON.parse(s);
        if (p.snapshot)
          u = p;
        else if (p.error)
          throw new Error(p.error);
      } catch (p) {
        console.error("[LiVue Stream] Final parse error:", p, s);
      }
    return r(u), u;
  } catch (o) {
    throw i(o), o;
  }
}
function da(t) {
  const { to: e, content: n, replace: r } = t, i = lr.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Nr(t, e, n = !1) {
  lr.set(t, { el: e, replace: n });
}
function Ir(t) {
  lr.delete(t);
}
function pa(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function sr(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    pa(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = sr(r) : e[n] = r;
  }
  return e;
}
function ha(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = sr(l), p = {};
    for (let c in s)
      p[c] = /* @__PURE__ */ (function(d, v) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return e(d + "." + v, h);
        };
      })(a, c);
    i[a] = xe(Object.assign({}, u, p));
  }
  return i;
}
function ma(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = sr(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function va(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
function ga(t) {
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
function ya(t, e) {
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
function ba(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function wa(t, e) {
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
      inputs: ba(n)
    });
  });
}
function ki(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Ci.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && wa(n, i.inputs));
  });
}
function Ot(t, e) {
  let n = {}, r = wi(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function Ea(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function Kn(t) {
  if (Ea(t))
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
let xi = {
  ref: tn,
  computed: io,
  watch: Ie,
  watchEffect: ro,
  reactive: xe,
  readonly: no,
  onMounted: si,
  onUnmounted: ui,
  onBeforeMount: to,
  onBeforeUnmount: eo,
  nextTick: nr,
  provide: Qi,
  inject: Zi
}, Ni = Object.keys(xi), Sa = Ni.map(function(t) {
  return xi[t];
});
function _a(t) {
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
function Aa(t, e, n) {
  let r = Object.keys(e), i = r.map(function(l) {
    return e[l];
  }), o = Ni.concat(r).concat(["livue"]), a = Sa.concat(i).concat([n]);
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
function Da(t) {
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
function gt(t, e, n, r, i, o) {
  let a = Da(t), l = _a(a);
  return {
    name: o || "LiVueComponent",
    template: l.html,
    setup: function() {
      let s = qo(e), u = Object.assign({}, s, r, { livue: n, livueV: i });
      if (l.setupCode) {
        let d = Aa(l.setupCode, s, n);
        d && Object.assign(u, d);
      }
      var p = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
      function c(d) {
        return typeof d == "string" && !d.startsWith("$") && !d.startsWith("__") && !p[d];
      }
      return new Proxy(u, {
        get: function(d, v, h) {
          if (v in d || typeof v == "symbol") return Reflect.get(d, v, h);
          if (c(v))
            return function() {
              return n.call(v, ...arguments);
            };
        },
        getOwnPropertyDescriptor: function(d, v) {
          var h = Object.getOwnPropertyDescriptor(d, v);
          if (h) return h;
          if (c(v))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(d, v) {
          return !!(v in d || c(v));
        },
        set: function(d, v, h, w) {
          return Reflect.set(d, v, h, w);
        },
        ownKeys: function(d) {
          return Reflect.ownKeys(d);
        }
      });
    }
  };
}
function Gn(t, e, n, r, i, o, a) {
  a = a || {};
  let l = zo(), s = n.name, u = n.vueMethods || {}, p = n.confirms || {}, c = n.isolate || !1, d = n.urlParams || null, v = n.uploads || null, h = n.tabSync || null, w = !1, b = i, S = o;
  function O(f) {
    let y = document.querySelector('meta[name="livue-prefix"]'), _ = "/" + (y ? y.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), g = document.createElement("a");
    g.href = _, g.download = f.name, g.style.display = "none", document.body.appendChild(g), g.click(), document.body.removeChild(g);
  }
  function L() {
    let f = Ot(b, e);
    return {
      snapshot: S,
      diffs: f
    };
  }
  function M(f, y) {
    if (f.redirect) {
      rr(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let g = f.errorBoundary;
      m.errorState.hasError = g.hasError, m.errorState.errorMessage = g.errorMessage, m.errorState.errorDetails = g.errorDetails, m.errorState.recover = g.recover, (!g.errorHandled || !g.recover) && ue("error.occurred", {
        error: new Error(g.errorMessage || "Component error"),
        componentName: s,
        componentId: t,
        context: { method: g.errorMethod, serverHandled: g.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && O(f.download), f.snapshot) {
      let g = JSON.parse(f.snapshot);
      if (g.state) {
        let H = sn(g.state);
        jo(e, H), b = JSON.parse(JSON.stringify(H));
      }
      S = f.snapshot, g.memo && (g.memo.errors ? de(m.errors, g.memo.errors) : Jn(m.errors), g.memo.vueMethods && (u = g.memo.vueMethods), g.memo.urlParams && (d = g.memo.urlParams), g.memo.uploads && (v = g.memo.uploads), g.memo.confirms && (p = g.memo.confirms), (g.memo.composables || g.memo.composableActions) && ma(I, g.memo));
    }
    if (d && Go(d, e), f.html && r && r._updateTemplate) {
      let g = {};
      if (f.snapshot) {
        let H = JSON.parse(f.snapshot);
        H.memo && (H.memo.transitionType && (g.transitionType = H.memo.transitionType), H.memo.skipTransition && (g.skipTransition = !0));
      }
      r._updateTemplate(f.html, g);
    }
    if (f.events && f.events.length > 0) {
      for (var A = 0; A < f.events.length; A++)
        f.events[A].sourceId = t;
      Ko(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var _ = 0; _ < f.js.length; _++)
        try {
          new Function("state", "livue", f.js[_])(e, m);
        } catch (g) {
          console.error("[LiVue] Error executing ->vue() JS:", g);
        }
    if (f.benchmark && ue("benchmark.received", {
      componentId: t,
      componentName: s,
      timings: f.benchmark
    }), h && h.enabled && f.snapshot && !w && JSON.parse(f.snapshot).state) {
      let H = wi(e), z = [];
      for (let F in H)
        (!y || !(F in y)) && z.push(F);
      if (z.length > 0) {
        let F = sa(H, z, h);
        Object.keys(F).length > 0 && la(s, F, z, h);
      }
    }
    if (w = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let D = xe({}), C = {}, I = {}, U = function(f, y) {
    return m.call(f, y);
  };
  va(n) && (I = ha(n, U));
  let m = xe({
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
      let y = Ot(b, e);
      return f === void 0 ? Object.keys(y).length > 0 : f in y;
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
      return f ? D[f] || !1 : m.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let y = f ? D[f] || !1 : m.loading;
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
      let _, g = null;
      if (arguments.length === 1 ? _ = [] : arguments.length === 2 ? Array.isArray(y) ? _ = y : _ = [y] : arguments.length >= 3 && (Array.isArray(y) && A && typeof A == "object" && (A.debounce || A.throttle) ? (_ = y, g = A) : _ = Array.prototype.slice.call(arguments, 1)), C[f])
        return C[f](m, _);
      if (u[f]) {
        try {
          new Function("state", "livue", u[f])(e, m);
        } catch (z) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', z);
        }
        return;
      }
      let H = async function() {
        if (p[f] && !await m._showConfirm(p[f]))
          return;
        m.loading = !0, m.processing = f, D[f] = !0;
        let z;
        try {
          let F = L(), ne = await wn(F.snapshot, f, _, F.diffs, c);
          z = M(ne, F.diffs);
        } catch (F) {
          F.status === 422 && F.data && F.data.errors ? de(m.errors, F.data.errors) : Fe(F, s);
        } finally {
          m.loading = !1, m.processing = null, delete D[f];
        }
        return z;
      };
      return g && g.debounce ? Ze(t + ":" + f, g.debounce)(H) : g && g.throttle ? Dt(t + ":" + f, g.throttle)(H) : H();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, y) {
      let A = Array.prototype.slice.call(arguments, 2), _ = { message: y || "Are you sure?" };
      if (await m._showConfirm(_))
        return m.call.apply(m, [f].concat(A));
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
      m.loading = !0, m.processing = "$sync";
      try {
        let f = L(), y = await wn(f.snapshot, null, [], f.diffs, c);
        M(y, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? de(m.errors, f.data.errors) : Fe(f, s);
      } finally {
        m.loading = !1, m.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      Jn(m.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, y) {
      Ut(f, y, "broadcast", s, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, y, A) {
      Ut(y, A, "to", s, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, y) {
      Ut(f, y, "self", s, t, null);
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
    upload: async function(f, y) {
      if (!v || !v[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var A = En(e, f);
      A && A.__livue_upload && A.ref && Sn([A.ref]), m.uploading = !0, m.uploadProgress = 0;
      try {
        var _ = await Zo(y, s, f, v[f].token, function(g) {
          m.uploadProgress = g;
        });
        It(e, f, {
          __livue_upload: !0,
          ref: _.ref,
          originalName: _.originalName,
          mimeType: _.mimeType,
          size: _.size,
          previewUrl: _.previewUrl
        });
      } catch (g) {
        g.status === 422 && g.data && g.data.errors ? de(m.errors, g.data.errors) : Fe(g, s);
      } finally {
        m.uploading = !1, m.uploadProgress = 0;
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
      if (!v || !v[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      m.uploading = !0, m.uploadProgress = 0;
      try {
        var A = await Qo(y, s, f, v[f].token, function(q) {
          m.uploadProgress = q.overall;
        }), _ = A.results || [], g = A.errors || [], H = En(e, f), z = Array.isArray(H) ? H : [];
        if (_.length > 0) {
          var F = _.map(function(q) {
            return {
              __livue_upload: !0,
              ref: q.ref,
              originalName: q.originalName,
              mimeType: q.mimeType,
              size: q.size,
              previewUrl: q.previewUrl
            };
          });
          It(e, f, z.concat(F));
        }
        if (g.length > 0) {
          var ne = {};
          g.forEach(function(q) {
            var ge = f + "." + q.index;
            ne[ge] = {
              file: q.file,
              message: q.error
            };
          }), de(m.errors, ne);
        }
      } catch (q) {
        q.status === 422 && q.data && q.data.errors ? de(m.errors, q.data.errors) : Fe(q, s);
      } finally {
        m.uploading = !1, m.uploadProgress = 0;
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
      var A = En(e, f);
      if (y !== void 0 && Array.isArray(A)) {
        var _ = A[y];
        _ && _.__livue_upload && _.ref && Sn([_.ref]), A.splice(y, 1), It(e, f, A.slice());
      } else
        A && A.__livue_upload && A.ref && Sn([A.ref]), It(e, f, null);
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
      y = y || [], m.loading = !0, m.streaming = !0, m.processing = f, m.streamingMethod = f, D[f] = !0;
      let A;
      try {
        let _ = L();
        _.method = f, _.params = y, _.componentId = t;
        let g = await fa(_, {
          onChunk: function(H) {
          },
          onComplete: function(H) {
          },
          onError: function(H) {
            console.error("[LiVue Stream] Error:", H);
          }
        });
        g && (A = M(g, _.diffs));
      } catch (_) {
        _.status === 422 && _.data && _.data.errors ? de(m.errors, _.data.errors) : Fe(_, s);
      } finally {
        m.loading = !1, m.streaming = !1, m.processing = null, m.streamingMethod = null, delete D[f];
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
      }) : Ie(
        function() {
          return e[f];
        },
        function(A, _) {
          y(A, _);
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
      }) : (Wo(t, f), function() {
        Xn(t);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: xe({
      hasError: !1,
      errorMessage: null,
      errorDetails: null,
      recover: !0
    }),
    /**
     * Clear the error state (used for recovery).
     */
    clearError: function() {
      m.errorState.hasError = !1, m.errorState.errorMessage = null, m.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(f, y) {
      b = JSON.parse(JSON.stringify(f)), S = y;
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
      let f = Ot(b, e), y = {};
      for (let A in I) {
        let _ = I[A], g = {}, H = [];
        for (let z in _)
          if (typeof _[z] == "function")
            H.push(z);
          else
            try {
              g[z] = JSON.parse(JSON.stringify(_[z]));
            } catch {
              g[z] = "[Unserializable]";
            }
        y[A] = { data: g, actions: H };
      }
      return {
        serverState: JSON.parse(JSON.stringify(b)),
        clientState: JSON.parse(JSON.stringify(e)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: s,
          isolate: c,
          urlParams: d,
          tabSync: h,
          hasUploads: !!v,
          uploadProps: v ? Object.keys(v) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(p),
          composableNames: Object.keys(I)
        },
        composables: y,
        uploading: m.uploading,
        uploadProgress: m.uploadProgress,
        streaming: m.streaming,
        streamingMethod: m.streamingMethod,
        errorState: {
          hasError: m.errorState.hasError,
          errorMessage: m.errorState.errorMessage
        }
      };
    }
  });
  for (let f in I)
    m[f] = I[f];
  async function j() {
    m.loading = !0, m.processing = "$refresh", D.$refresh = !0;
    try {
      let f = L(), y = await wn(f.snapshot, null, [], f.diffs, c);
      return M(y, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? de(m.errors, f.data.errors) : Fe(f, s);
    } finally {
      m.loading = !1, m.processing = null, delete D.$refresh;
    }
  }
  C.$refresh = function() {
    return j();
  }, h && h.enabled && aa(s, function(f, y, A) {
    let _ = !1;
    if (A.reactive === !0)
      _ = !0;
    else if (Array.isArray(A.reactive) && A.reactive.length > 0) {
      for (let g in f)
        if (A.reactive.includes(g)) {
          _ = !0;
          break;
        }
    }
    if (_) {
      for (let g in f)
        A.only && !A.only.includes(g) || A.except && A.except.includes(g) || g in e && (e[g] = f[g]);
      w = !0, m.sync();
      return;
    }
    for (let g in f)
      A.only && !A.only.includes(g) || A.except && A.except.includes(g) || g in e && (e[g] = f[g]);
    for (let g in f)
      A.only && !A.only.includes(g) || A.except && A.except.includes(g) || (b[g] = JSON.parse(JSON.stringify(f[g])));
  });
  var K = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(m, {
    get: function(f, y, A) {
      if (y in f || typeof y == "symbol")
        return Reflect.get(f, y, A);
      if (typeof y == "string" && y.startsWith("$") && C[y])
        return function() {
          var _ = Array.prototype.slice.call(arguments);
          return C[y](m, _);
        };
      if (typeof y == "string" && !y.startsWith("$") && !K[y])
        return function() {
          var _ = Array.prototype.slice.call(arguments);
          return m.call(y, ..._);
        };
    },
    set: function(f, y, A, _) {
      return Reflect.set(f, y, A, _);
    },
    has: function(f, y) {
      return typeof y == "string" && y.startsWith("$") && C[y] ? !0 : Reflect.has(f, y);
    }
  }), composables: I };
}
function Jt(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, p = s.dataset.livueSnapshot || "{}", c = JSON.parse(p), d = c.memo ? c.memo.name : "", v = sn(c.state || {}), h = c.memo || {}, w = s.innerHTML, b = s.tagName.toLowerCase(), S = e._childRegistry[u];
    if (!S)
      for (let m in e._childRegistry) {
        let j = e._childRegistry[m];
        if (j.name === d && !o[m]) {
          S = j;
          break;
        }
      }
    if (S) {
      o[S.id] = !0, S.rootTag = b;
      let m = h.reactive || [];
      if (m.length > 0) {
        for (var O = 0; O < m.length; O++) {
          var L = m[O];
          L in v && (S.state[L] = v[L]);
        }
        S.livue._updateServerState(v, p), S.componentRef && S.componentRef._updateTemplate && S.componentRef._updateTemplate(w);
      }
    }
    let M = !S;
    if (!S) {
      Or++;
      let m = "livue-child-" + Or, j = $n(v), K = JSON.parse(JSON.stringify(v)), J = Object.assign({ name: h.name || d }, h), f = { _updateTemplate: null }, y = vi(), A = Gn(u, j, J, f, K, p, {
        el: s,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: y
      }), _ = A.livue, g = A.composables;
      ue("component.init", {
        component: { id: u, name: d, state: j, livue: _ },
        el: s,
        cleanup: y.cleanup,
        isChild: !0
      });
      let H = h.errors || null;
      H && de(_.errors, H), S = {
        tagName: m,
        state: j,
        memo: J,
        livue: _,
        composables: g,
        componentRef: f,
        name: d,
        id: u,
        rootTag: b
      };
      let z = h.listeners || null;
      if (z)
        for (let ne in z)
          (function(q, ge) {
            rn(ne, d, u, function(nt) {
              ge.call(q, nt);
            });
          })(z[ne], _);
      let F = h.echo || null;
      F && F.length && (function(ne, q) {
        _i(ne, F, function(ge, nt) {
          q.call(ge, nt);
        });
      })(u, _), f._updateTemplate = function(ne) {
        let q = e.el.querySelector('[data-livue-id="' + u + '"]');
        q && Li(q);
        let ge = Jt(ne, e), nt = on(
          ge.template,
          'data-livue-id="' + u + '"'
        );
        if (e.vueApp) {
          for (let ze in ge.childDefs)
            e.vueApp._context.components[ze] || e.vueApp.component(ze, ge.childDefs[ze]);
          e.vueApp._context.components[S.tagName] = gt(nt, S.state, S.livue, S.composables || {}, e._versions, S.name), e._versions[S.tagName] = (e._versions[S.tagName] || 0) + 1, nr(function() {
            let ze = e.el.querySelector('[data-livue-id="' + u + '"]');
            ze && ki(ze);
          });
        }
      }, e._childRegistry[u] = S;
    }
    let D = S.tagName, C = s.dataset.livueRef;
    C && e._rootLivue && (e._rootLivue.refs[C] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(m, j) {
        return S.livue.call(m, j || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(m, j) {
        return S.livue.set(m, j);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(m, j) {
        return S.livue.dispatch(m, j);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return S.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return S.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return S.livue;
      }
    });
    let I = s.dataset.livueModel;
    if (I && e._rootState && rn("$modelUpdate", S.name, u, function(m) {
      m && m.value !== void 0 && (e._rootState[I] = m.value);
    }), M) {
      let m = on(
        "<" + b + ">" + w + "</" + b + ">",
        'data-livue-id="' + u + '"'
      );
      i[D] = gt(
        m,
        S.state,
        S.livue,
        S.composables || {},
        e._versions,
        S.name
      );
    }
    e._versions[D] === void 0 && (e._versions[D] = 0);
    let U = document.createElement(D);
    U.setAttribute(":key", "livueV['" + D + "']"), s.parentNode.replaceChild(U, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
class Ta {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = $n(sn(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = xe({}), this._rootDefRef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
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
      _updateTemplate: function(w, b) {
        b = b || {}, ue("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: w
        });
        var S = ga(r.el);
        Li(r.el);
        let O = Jt(w, r);
        if (!r.vueApp) return;
        for (let M in O.childDefs)
          r.vueApp._context.components[M] || r.vueApp.component(M, O.childDefs[M]);
        function L() {
          r._rootDefRef.value = gt(O.template, r.state, r._rootLivue, r._rootComposables || {}, r._versions, r.name), nr(function() {
            ki(r.el), ya(r.el, S), ue("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (b.skipTransition) {
          L();
          return;
        }
        Yn() ? ca(L, { type: b.transitionType }) : L();
      }
    }, o = JSON.parse(JSON.stringify(sn(e.state || {})));
    this._cleanups = vi();
    let a = Gn(this.componentId, this.state, this.memo, i, o, n, {
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
    let u = Jt(this.el.innerHTML, this), p = e.memo && e.memo.errors || null;
    p && de(l.errors, p);
    let c = e.memo && e.memo.listeners || null;
    if (c)
      for (let w in c)
        (function(b, S, O, L) {
          rn(w, O, L, function(M) {
            S.call(b, M);
          });
        })(c[w], l, r.name, r.componentId);
    let d = e.memo && e.memo.echo || null;
    d && d.length && (this._echoUnsubscribe = _i(r.componentId, d, function(w, b) {
      l.call(w, b);
    }));
    let v = gt(u.template, r.state, l, s, r._versions, r.name);
    this._rootDefRef = li(v), this.vueApp = oo({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", ra(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = ta();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Bo();
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
      ue("component.destroy", {
        component: { id: e, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Ar(e), Tr(e), Xn(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Lr(n.name), Sr(e);
    }
    if (ue("component.destroy", {
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
function he(t) {
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
const Ca = {
  mounted(t, e, n) {
    let r = he(n);
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
    Mr.has(u) || (Mr.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Dn = /* @__PURE__ */ new WeakMap(), La = {
  mounted(t, e, n) {
    t.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + t.tagName.toLowerCase() + ">");
    let r = he(n);
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
    t.addEventListener("submit", l), Dn.set(t, l);
  },
  unmounted(t) {
    let e = Dn.get(t);
    e && (t.removeEventListener("submit", e), Dn.delete(t));
  }
}, Mt = /* @__PURE__ */ new WeakMap(), ka = {
  mounted(t, e, n) {
    let r = he(n);
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
    let p = "0px";
    if (s) {
      let h = parseInt(s, 10);
      isNaN(h) || (p = h + "px");
    }
    let c = l.leave === !0, d = !1, v = new IntersectionObserver(
      function(h) {
        let w = h[0];
        (c ? !w.isIntersecting : w.isIntersecting) && (!l.once || !d) && (d = !0, r.call(o, a), l.once && (v.disconnect(), Mt.delete(t)));
      },
      {
        threshold: u,
        rootMargin: p
      }
    );
    v.observe(t), Mt.set(t, v);
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
const Na = {
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
    Rr++;
    let s = "model-" + Rr, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: p, throttleMs: c } = Oa(l);
    l.live && !p && !c && (p = 150);
    function d(D) {
      if (l.number) {
        let C = Number(D);
        D = isNaN(C) ? 0 : C;
      }
      l.boolean && (D = !!D && D !== "false" && D !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = D : o[a] = D;
    }
    function v(D) {
      p > 0 ? Ze(s, p)(function() {
        d(D);
      }) : c > 0 ? Dt(s, c)(function() {
        d(D);
      }) : d(D);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let w = Ma(n), b = n.component, S = null, O = null, L = null, M = null;
    if (w && b)
      M = b.emit, b.emit = function(D, ...C) {
        if (D === "update:modelValue") {
          let I = C[0];
          v(I);
          return;
        }
        return M.call(b, D, ...C);
      }, b.props && "modelValue" in b.props && (L = Ie(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(D) {
          b.vnode && b.vnode.props && (b.vnode.props.modelValue = D), b.exposed && typeof b.exposed.setValue == "function" && b.exposed.setValue(D), b.update && b.update();
        },
        { immediate: !0 }
      )), rt.set(t, {
        isComponent: !0,
        componentInstance: b,
        originalEmit: M,
        stopWatcher: L,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (p > 0) {
        let D = Ze(s, p);
        S = function(C) {
          let I = Pt(C.target);
          D(function() {
            d(I);
          });
        };
      } else if (c > 0) {
        let D = Dt(s, c);
        S = function(C) {
          let I = Pt(C.target);
          D(function() {
            d(I);
          });
        };
      } else
        S = function(D) {
          d(Pt(D.target));
        };
      l.enter ? (O = function(D) {
        D.key === "Enter" && d(Pt(D.target));
      }, t.addEventListener("keyup", O)) : t.addEventListener(u, S), Vr(t, h), rt.set(t, {
        isComponent: !1,
        handler: S,
        keyHandler: O,
        eventType: u,
        property: a,
        modifiers: l,
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
}, Ln = /* @__PURE__ */ new WeakMap(), Ra = 2500;
function Va(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Ra;
}
const Ha = {
  mounted(t, e, n) {
    let r = he(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = e.modifiers || {}, s = Va(l), u = l["keep-alive"] === !0, p = l.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !p,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function d() {
      c.isPaused || p && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function v() {
      c.intervalId || (c.intervalId = setInterval(d, s));
    }
    function h() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    p && (c.observer = new IntersectionObserver(
      function(w) {
        c.isVisible = w[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", h), c.visibilityHandler = h, v(), Ln.set(t, c);
  },
  unmounted(t) {
    let e = Ln.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), Ln.delete(t));
  }
}, Rt = /* @__PURE__ */ new WeakMap();
let un = typeof navigator < "u" ? navigator.onLine : !0, cn = /* @__PURE__ */ new Set(), Hr = !1;
function ja() {
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
const qa = {
  created(t, e) {
    ja();
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
    r(un), n.updateFn = r, cn.add(r);
  },
  unmounted(t) {
    let e = Rt.get(t);
    e && e.updateFn && cn.delete(e.updateFn), Rt.delete(t);
  }
};
let jr = 0;
const it = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new Map(), za = {
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
}, Fa = 200;
function Wa(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(qr))
    if (t[e])
      return qr[e];
  return Fa;
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
const Ba = {
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
    let r = he(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = ot.get(t), o = e.modifiers || {}, a = Wa(o), l = e.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function p(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, xn(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, xn(t, i, o, u, !0)) : (i.isActive = !1, xn(t, i, o, u, !1));
    }
    i.stopWatch = Ie(
      function() {
        return s ? r.isLoading(s) : r.loading;
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
}, Vt = /* @__PURE__ */ new WeakMap(), $a = {
  mounted(t, e, n) {
    let r = he(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = e.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = Ie(
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
    let r = Vt.get(t), i = he(n);
    if (!r || !i) return;
    let o = e.value, a = e.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Ie(
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
    let e = Vt.get(t);
    e && (e.stopWatch && e.stopWatch(), Vt.delete(t));
  }
}, at = /* @__PURE__ */ new WeakMap(), Ua = {
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
    at.set(t, { targetId: n }), Nr(n, t, r);
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
      Nr(r, t, i), at.set(t, { targetId: r });
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
function Ja(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
}
function Xa(t, e) {
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
function V(t, e = {}) {
  let n = e.supportsOutside === !0, r = e.isKeyboardEvent === !0;
  const i = /* @__PURE__ */ new WeakMap();
  return {
    mounted(o, a, l) {
      const { arg: s, modifiers: u } = a, p = he(l);
      if (!p) {
        console.warn("[LiVue] v-" + t + ": livue helper not found in component context");
        return;
      }
      Wr++;
      const c = "v-" + t + "-" + Wr, d = Ja(u);
      let v = null, h = null;
      u.debounce && (v = Ze(c, d)), u.throttle && (h = Dt(c, d));
      let w = !1, b = null;
      s && (b = s);
      const S = function(D) {
        let C = b, I = [];
        if (s) {
          C = s;
          const m = a.value;
          m != null && (I = Array.isArray(m) ? m : [m]);
        } else {
          const m = a.value;
          if (typeof m == "function") {
            const j = function() {
              m();
            };
            v ? v(j) : h ? h(j) : j();
            return;
          } else typeof m == "string" ? C = m : Array.isArray(m) && m.length > 0 && (C = m[0], I = m.slice(1));
        }
        if (!C) {
          console.warn("[LiVue] v-" + t + ": no method specified");
          return;
        }
        const U = function() {
          u.confirm ? p.callWithConfirm(C, "Are you sure?", ...I) : p.call(C, ...I);
        };
        v ? v(U) : h ? h(U) : U();
      }, O = function(D) {
        if (!(u.self && D.target !== o) && !(r && !Xa(D, u))) {
          if (u.once) {
            if (w)
              return;
            w = !0;
          }
          u.prevent && D.preventDefault(), u.stop && D.stopPropagation(), S();
        }
      }, L = {};
      u.capture && (L.capture = !0), u.passive && (L.passive = !0);
      const M = {
        handler: O,
        options: L,
        outsideHandler: null
      };
      if (n && u.outside) {
        const D = function(C) {
          if (!o.contains(C.target) && C.target !== o) {
            if (u.once) {
              if (w)
                return;
              w = !0;
            }
            S();
          }
        };
        document.addEventListener(t, D, L), M.outsideHandler = D;
      } else
        o.addEventListener(t, O, L);
      i.set(o, M);
    },
    updated(o, a, l) {
    },
    unmounted(o) {
      const a = i.get(o);
      a && (a.outsideHandler ? document.removeEventListener(t, a.outsideHandler, a.options) : o.removeEventListener(t, a.handler, a.options), i.delete(o));
    }
  };
}
const Ya = V("click", { supportsOutside: !0 }), Ka = {
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
const Ga = {
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
const Za = {
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
    let r = he(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = lt.get(t), o = e.modifiers || {}, a = e.arg || null, l = e.value;
    i.stopWatch = Ie(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        $r(t, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    let r = lt.get(t);
    if (r && e.value !== e.oldValue) {
      let i = he(n);
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
function Qa(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function el(t, e) {
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
function tl(t, e) {
  let n = e.split("."), r = t[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const nl = {
  mounted(t, e, n) {
    let r = el(e, n);
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
    Ur++;
    let s = "watch-" + i + "-" + Ur;
    if (l.blur) {
      let d = function() {
        o.sync();
      };
      t.addEventListener("focusout", d), Ht.set(t, { blurHandler: d });
      return;
    }
    let u = Qa(l) || 150, p = Ze(s, u), c = Ie(
      function() {
        return tl(a, i);
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
function rl(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function il(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function ol(t, e) {
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
function al(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let r in t)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function ll(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function sl(t) {
  return ll(t) ? t : t.querySelector("input, textarea, select");
}
function kt(t, e) {
  return {
    mounted(n, r, i) {
      if (rl(i) && !il(i))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = ol(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: l } = a, s = al(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Jr++;
      let p = t + "-" + Jr, c = sl(n);
      if (!c) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let d = e(c, s, l, u, p);
      c.addEventListener(d.eventType, d.handler, { capture: !0 }), yt.set(n, {
        targetEl: c,
        handler: d.handler,
        eventType: d.eventType
      });
    },
    unmounted(n) {
      let r = yt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), yt.delete(n));
    }
  };
}
const ul = kt("debounce", function(t, e, n, r, i) {
  let o = Ii(r) || 150, a = Ze(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = Ct(l.target);
      a(function() {
        Lt(n, e, s);
      });
    }
  };
}), cl = kt("throttle", function(t, e, n, r, i) {
  let o = Ii(r) || 150, a = Dt(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = Ct(l.target);
      a(function() {
        Lt(n, e, s);
      });
    }
  };
}), ur = kt("blur", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Lt(n, e, Ct(l.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), fl = ur.unmounted;
ur.unmounted = function(t) {
  let e = yt.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), fl(t);
};
const cr = kt("enter", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Lt(n, e, Ct(l.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), dl = cr.unmounted;
cr.unmounted = function(t) {
  let e = yt.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), dl(t);
};
const pl = kt("boolean", function(t, e, n, r, i) {
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
function ve(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Xr(Object(n), !0).forEach(function(r) {
      hl(t, r, n[r]);
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
function hl(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Se() {
  return Se = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Se.apply(this, arguments);
}
function ml(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function vl(t, e) {
  if (t == null) return {};
  var n = ml(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
var gl = "1.15.6";
function Ee(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var _e = Ee(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), xt = Ee(/Edge/i), Yr = Ee(/firefox/i), bt = Ee(/safari/i) && !Ee(/chrome/i) && !Ee(/android/i), fr = Ee(/iP(ad|od|hone)/i), Oi = Ee(/chrome/i) && Ee(/android/i), Mi = {
  capture: !1,
  passive: !1
};
function R(t, e, n) {
  t.addEventListener(e, n, !_e && Mi);
}
function P(t, e, n) {
  t.removeEventListener(e, n, !_e && Mi);
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
function pe(t, e, n, r) {
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
function oe(t, e, n) {
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
function Ge(t, e) {
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
function me() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function Y(t, e, n, r, i) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, a, l, s, u, p, c;
    if (t !== window && t.parentNode && t !== me() ? (o = t.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, p = o.height, c = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, p = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !_e))
      do
        if (i && i.getBoundingClientRect && (k(i, "transform") !== "none" || n && k(i, "position") !== "static")) {
          var d = i.getBoundingClientRect();
          a -= d.top + parseInt(k(i, "border-top-width")), l -= d.left + parseInt(k(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var v = Ge(i || t), h = v && v.a, w = v && v.d;
      v && (a /= w, l /= h, c /= h, p /= w, s = a + p, u = l + c);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: c,
      height: p
    };
  }
}
function Gr(t, e, n) {
  for (var r = ke(t, !0), i = Y(t)[e]; r; ) {
    var o = Y(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === me()) break;
    r = ke(r, !1);
  }
  return !1;
}
function Qe(t, e, n, r) {
  for (var i = 0, o = 0, a = t.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== x.ghost && (r || a[o] !== x.dragged) && pe(a[o], n.draggable, t, !1)) {
      if (i === e)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function dr(t, e) {
  for (var n = t.lastElementChild; n && (n === x.ghost || k(n, "display") === "none" || e && !fn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function se(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== x.clone && (!e || fn(t, e)) && n++;
  return n;
}
function Zr(t) {
  var e = 0, n = 0, r = me();
  if (t)
    do {
      var i = Ge(t), o = i.a, a = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function yl(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var r in e)
        if (e.hasOwnProperty(r) && e[r] === t[n][r]) return Number(n);
    }
  return -1;
}
function ke(t, e) {
  if (!t || !t.getBoundingClientRect) return me();
  var n = t, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = k(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return me();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return me();
}
function bl(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Nn(t, e) {
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
function wl() {
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
    var o, a, l, s;
    if (!(!pe(i, e.draggable, t, !1) || i.animated || i === n)) {
      var u = Y(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var ie = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function El() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(k(i, "display") === "none" || i === x.ghost)) {
            t.push({
              target: i,
              rect: Y(i)
            });
            var o = ve({}, t[t.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Ge(i, !0);
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
      t.splice(yl(t, {
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
        var s = 0, u = l.target, p = u.fromRect, c = Y(u), d = u.prevFromRect, v = u.prevToRect, h = l.rect, w = Ge(u, !0);
        w && (c.top -= w.f, c.left -= w.e), u.toRect = c, u.thisAnimationDuration && Nn(d, c) && !Nn(p, c) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - c.top) / (h.left - c.left) === (p.top - c.top) / (p.left - c.left) && (s = _l(h, d, v, i.options)), Nn(c, p) || (u.prevFromRect = p, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, h, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        k(r, "transition", ""), k(r, "transform", "");
        var l = Ge(this.el), s = l && l.a, u = l && l.d, p = (i.left - o.left) / (s || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!p, r.animatingY = !!c, k(r, "transform", "translate3d(" + p + "px," + c + "px,0)"), this.forRepaintDummy = Sl(r), k(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), k(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          k(r, "transition", ""), k(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Sl(t) {
  return t.offsetWidth;
}
function _l(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var We = [], In = {
  initializeByDefault: !0
}, Nt = {
  mount: function(e) {
    for (var n in In)
      In.hasOwnProperty(n) && !(n in e) && (e[n] = In[n]);
    We.forEach(function(r) {
      if (r.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), We.push(e);
  },
  pluginEvent: function(e, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = e + "Global";
    We.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](ve({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](ve({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(e, n, r, i) {
    We.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var u = new l(e, n, e.options);
        u.sortable = e, u.options = e.options, e[s] = u, Se(r, u.defaults);
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
    return We.forEach(function(i) {
      typeof i.eventProperties == "function" && Se(r, i.eventProperties.call(n[i.pluginName], e));
    }), r;
  },
  modifyOption: function(e, n, r) {
    var i;
    return We.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(e[o.pluginName], r));
    }), i;
  }
};
function Al(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, p = t.oldDraggableIndex, c = t.newDraggableIndex, d = t.originalEvent, v = t.putSortable, h = t.extraEventProperties;
  if (e = e || n && n[ie], !!e) {
    var w, b = e.options, S = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !_e && !xt ? w = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (w = document.createEvent("Event"), w.initEvent(r, !0, !0)), w.to = a || n, w.from = l || n, w.item = i || n, w.clone = o, w.oldIndex = s, w.newIndex = u, w.oldDraggableIndex = p, w.newDraggableIndex = c, w.originalEvent = d, w.pullMode = v ? v.lastPutMode : void 0;
    var O = ve(ve({}, h), Nt.getEventProperties(r, e));
    for (var L in O)
      w[L] = O[L];
    n && n.dispatchEvent(w), b[S] && b[S].call(e, w);
  }
}
var Dl = ["evt"], re = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = vl(r, Dl);
  Nt.pluginEvent.bind(x)(e, n, ve({
    dragEl: E,
    parentEl: $,
    ghostEl: N,
    rootEl: W,
    nextEl: He,
    lastDownEl: Yt,
    cloneEl: B,
    cloneHidden: Ce,
    dragStarted: ct,
    putSortable: Z,
    activeSortable: x.active,
    originalEvent: i,
    oldIndex: Xe,
    oldDraggableIndex: Et,
    newIndex: ae,
    newDraggableIndex: Ae,
    hideGhostForTarget: Bi,
    unhideGhostForTarget: $i,
    cloneNowHidden: function() {
      Ce = !0;
    },
    cloneNowShown: function() {
      Ce = !1;
    },
    dispatchSortableEvent: function(l) {
      ee({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function ee(t) {
  Al(ve({
    putSortable: Z,
    cloneEl: B,
    targetEl: E,
    rootEl: W,
    oldIndex: Xe,
    oldDraggableIndex: Et,
    newIndex: ae,
    newDraggableIndex: Ae
  }, t));
}
var E, $, N, W, He, Yt, B, Ce, Xe, ae, Et, Ae, jt, Z, Je = !1, dn = !1, pn = [], Pe, fe, On, Mn, Qr, ei, ct, Be, St, _t = !1, qt = !1, Kt, Q, Pn = [], Zn = !1, hn = [], yn = typeof document < "u", zt = fr, ti = xt || _e ? "cssFloat" : "float", Tl = yn && !Oi && !fr && "draggable" in document.createElement("div"), zi = (function() {
  if (yn) {
    if (_e)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Fi = function(e, n) {
  var r = k(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Qe(e, 0, n), a = Qe(e, 1, n), l = o && k(o), s = a && k(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Y(o).width, p = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Y(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[ti] === "none" || a && r[ti] === "none" && u + p > i) ? "vertical" : "horizontal";
}, Cl = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, Ll = function(e, n) {
  var r;
  return pn.some(function(i) {
    var o = i[ie].options.emptyInsertThreshold;
    if (!(!o || dr(i))) {
      var a = Y(i), l = e >= a.left - o && e <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, Wi = function(e) {
  function n(o, a) {
    return function(l, s, u, p) {
      var c = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (o == null && (a || c))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(l, s, u, p), a)(l, s, u, p);
      var d = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === d || o.join && o.indexOf(d) > -1;
    };
  }
  var r = {}, i = e.group;
  (!i || Xt(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, Bi = function() {
  !zi && N && k(N, "display", "none");
}, $i = function() {
  !zi && N && k(N, "display", "");
};
yn && !Oi && document.addEventListener("click", function(t) {
  if (dn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), dn = !1, !1;
}, !0);
var Re = function(e) {
  if (E) {
    e = e.touches ? e.touches[0] : e;
    var n = Ll(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ie]._onDragOver(r);
    }
  }
}, kl = function(e) {
  E && E.parentNode[ie]._isOutsideThisEl(e.target);
};
function x(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = Se({}, e), t[ie] = this;
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
    supportPointer: x.supportPointer !== !1 && "PointerEvent" in window && (!bt || fr),
    emptyInsertThreshold: 5
  };
  Nt.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Wi(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Tl, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? R(t, "pointerdown", this._onTapStart) : (R(t, "mousedown", this._onTapStart), R(t, "touchstart", this._onTapStart)), this.nativeDraggable && (R(t, "dragover", this), R(t, "dragenter", this)), pn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), Se(this, El());
}
x.prototype = /** @lends Sortable.prototype */
{
  constructor: x,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Be = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, E) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, p = i.filter;
      if (Vl(r), !E && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && bt && s && s.tagName.toUpperCase() === "SELECT") && (s = pe(s, i.draggable, r, !1), !(s && s.animated) && Yt !== s)) {
        if (Xe = se(s), Et = se(s, i.draggable), typeof p == "function") {
          if (p.call(this, e, s, this)) {
            ee({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), re("filter", n, {
              evt: e
            }), o && e.preventDefault();
            return;
          }
        } else if (p && (p = p.split(",").some(function(c) {
          if (c = pe(u, c.trim(), r, !1), c)
            return ee({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), re("filter", n, {
              evt: e
            }), !0;
        }), p)) {
          o && e.preventDefault();
          return;
        }
        i.handle && !pe(u, i.handle, r, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !E && r.parentNode === o) {
      var u = Y(r);
      if (W = o, E = r, $ = E.parentNode, He = E.nextSibling, Yt = r, jt = a.group, x.dragged = E, Pe = {
        target: E,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, Qr = Pe.clientX - u.left, ei = Pe.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, E.style["will-change"] = "all", s = function() {
        if (re("delayEnded", i, {
          evt: e
        }), x.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Yr && i.nativeDraggable && (E.draggable = !0), i._triggerDragStart(e, n), ee({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), oe(E, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(p) {
        Ri(E, p.trim(), Rn);
      }), R(l, "dragover", Re), R(l, "mousemove", Re), R(l, "touchmove", Re), a.supportPointer ? (R(l, "pointerup", i._onDrop), !this.nativeDraggable && R(l, "pointercancel", i._onDrop)) : (R(l, "mouseup", i._onDrop), R(l, "touchend", i._onDrop), R(l, "touchcancel", i._onDrop)), Yr && this.nativeDraggable && (this.options.touchStartThreshold = 4, E.draggable = !0), re("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(xt || _e))) {
        if (x.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (R(l, "pointerup", i._disableDelayedDrag), R(l, "pointercancel", i._disableDelayedDrag)) : (R(l, "mouseup", i._disableDelayedDrag), R(l, "touchend", i._disableDelayedDrag), R(l, "touchcancel", i._disableDelayedDrag)), R(l, "mousemove", i._delayedDragTouchMoveHandler), R(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && R(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
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
    P(e, "mouseup", this._disableDelayedDrag), P(e, "touchend", this._disableDelayedDrag), P(e, "touchcancel", this._disableDelayedDrag), P(e, "pointerup", this._disableDelayedDrag), P(e, "pointercancel", this._disableDelayedDrag), P(e, "mousemove", this._delayedDragTouchMoveHandler), P(e, "touchmove", this._delayedDragTouchMoveHandler), P(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? R(document, "pointermove", this._onTouchMove) : n ? R(document, "touchmove", this._onTouchMove) : R(document, "mousemove", this._onTouchMove) : (R(E, "dragend", this), R(W, "dragstart", this._onDragStart));
    try {
      document.selection ? Gt(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (Je = !1, W && E) {
      re("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && R(document, "dragover", kl);
      var r = this.options;
      !e && oe(E, r.dragClass, !1), oe(E, r.ghostClass, !0), x.active = this, e && this._appendGhost(), ee({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (fe) {
      this._lastX = fe.clientX, this._lastY = fe.clientY, Bi();
      for (var e = document.elementFromPoint(fe.clientX, fe.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(fe.clientX, fe.clientY), e !== n); )
        n = e;
      if (E.parentNode[ie]._isOutsideThisEl(e), n)
        do {
          if (n[ie]) {
            var r = void 0;
            if (r = n[ie]._onDragOver({
              clientX: fe.clientX,
              clientY: fe.clientY,
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
    if (Pe) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = N && Ge(N, !0), l = N && a && a.a, s = N && a && a.d, u = zt && Q && Zr(Q), p = (o.clientX - Pe.clientX + i.x) / (l || 1) + (u ? u[0] - Pn[0] : 0) / (l || 1), c = (o.clientY - Pe.clientY + i.y) / (s || 1) + (u ? u[1] - Pn[1] : 0) / (s || 1);
      if (!x.active && !Je) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (N) {
        a ? (a.e += p - (On || 0), a.f += c - (Mn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: p,
          f: c
        };
        var d = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        k(N, "webkitTransform", d), k(N, "mozTransform", d), k(N, "msTransform", d), k(N, "transform", d), On = p, Mn = c, fe = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!N) {
      var e = this.options.fallbackOnBody ? document.body : W, n = Y(E, !0, zt, !0, e), r = this.options;
      if (zt) {
        for (Q = e; k(Q, "position") === "static" && k(Q, "transform") === "none" && Q !== document; )
          Q = Q.parentNode;
        Q !== document.body && Q !== document.documentElement ? (Q === document && (Q = me()), n.top += Q.scrollTop, n.left += Q.scrollLeft) : Q = me(), Pn = Zr(Q);
      }
      N = E.cloneNode(!0), oe(N, r.ghostClass, !1), oe(N, r.fallbackClass, !0), oe(N, r.dragClass, !0), k(N, "transition", ""), k(N, "transform", ""), k(N, "box-sizing", "border-box"), k(N, "margin", 0), k(N, "top", n.top), k(N, "left", n.left), k(N, "width", n.width), k(N, "height", n.height), k(N, "opacity", "0.8"), k(N, "position", zt ? "absolute" : "fixed"), k(N, "zIndex", "100000"), k(N, "pointerEvents", "none"), x.ghost = N, e.appendChild(N), k(N, "transform-origin", Qr / parseInt(N.style.width) * 100 + "% " + ei / parseInt(N.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var r = this, i = e.dataTransfer, o = r.options;
    if (re("dragStart", this, {
      evt: e
    }), x.eventCanceled) {
      this._onDrop();
      return;
    }
    re("setupClone", this), x.eventCanceled || (B = ji(E), B.removeAttribute("id"), B.draggable = !1, B.style["will-change"] = "", this._hideClone(), oe(B, this.options.chosenClass, !1), x.clone = B), r.cloneId = Gt(function() {
      re("clone", r), !x.eventCanceled && (r.options.removeCloneOnHide || W.insertBefore(B, E), r._hideClone(), ee({
        sortable: r,
        name: "clone"
      }));
    }), !n && oe(E, o.dragClass, !0), n ? (dn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (P(document, "mouseup", r._onDrop), P(document, "touchend", r._onDrop), P(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, E)), R(document, "drop", r), k(E, "transform", "translateZ(0)")), Je = !0, r._dragStartId = Gt(r._dragStarted.bind(r, n, e)), R(document, "selectstart", r), ct = !0, window.getSelection().removeAllRanges(), bt && k(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, l = this.options, s = l.group, u = x.active, p = jt === s, c = l.sort, d = Z || u, v, h = this, w = !1;
    if (Zn) return;
    function b(H, z) {
      re(H, h, ve({
        evt: e,
        isOwner: p,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: d,
        target: r,
        completed: O,
        onMove: function(ne, q) {
          return Ft(W, n, E, i, ne, Y(ne), e, q);
        },
        changed: L
      }, z));
    }
    function S() {
      b("dragOverAnimationCapture"), h.captureAnimationState(), h !== d && d.captureAnimationState();
    }
    function O(H) {
      return b("dragOverCompleted", {
        insertion: H
      }), H && (p ? u._hideClone() : u._showClone(h), h !== d && (oe(E, Z ? Z.options.ghostClass : u.options.ghostClass, !1), oe(E, l.ghostClass, !0)), Z !== h && h !== x.active ? Z = h : h === x.active && Z && (Z = null), d === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        b("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (r === E && !E.animated || r === n && !r.animated) && (Be = null), !l.dragoverBubble && !e.rootEl && r !== document && (E.parentNode[ie]._isOutsideThisEl(e.target), !H && Re(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), w = !0;
    }
    function L() {
      ae = se(E), Ae = se(E, l.draggable), ee({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: ae,
        newDraggableIndex: Ae,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = pe(r, l.draggable, n, !0), b("dragOver"), x.eventCanceled) return w;
    if (E.contains(e.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return O(!1);
    if (dn = !1, u && !l.disabled && (p ? c || (a = $ !== W) : Z === this || (this.lastPutMode = jt.checkPull(this, u, E, e)) && s.checkPut(this, u, E, e))) {
      if (v = this._getDirection(e, r) === "vertical", i = Y(E), b("dragOverValid"), x.eventCanceled) return w;
      if (a)
        return $ = W, S(), this._hideClone(), b("revert"), x.eventCanceled || (He ? W.insertBefore(E, He) : W.appendChild(E)), O(!0);
      var M = dr(n, l.draggable);
      if (!M || Ol(e, v, this) && !M.animated) {
        if (M === E)
          return O(!1);
        if (M && n === e.target && (r = M), r && (o = Y(r)), Ft(W, n, E, i, r, o, e, !!r) !== !1)
          return S(), M && M.nextSibling ? n.insertBefore(E, M.nextSibling) : n.appendChild(E), $ = n, L(), O(!0);
      } else if (M && Il(e, v, this)) {
        var D = Qe(n, 0, l, !0);
        if (D === E)
          return O(!1);
        if (r = D, o = Y(r), Ft(W, n, E, i, r, o, e, !1) !== !1)
          return S(), n.insertBefore(E, D), $ = n, L(), O(!0);
      } else if (r.parentNode === n) {
        o = Y(r);
        var C = 0, I, U = E.parentNode !== n, m = !Cl(E.animated && E.toRect || i, r.animated && r.toRect || o, v), j = v ? "top" : "left", K = Gr(r, "top", "top") || Gr(E, "top", "top"), J = K ? K.scrollTop : void 0;
        Be !== r && (I = o[j], _t = !1, qt = !m && l.invertSwap || U), C = Ml(e, r, o, v, m ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, qt, Be === r);
        var f;
        if (C !== 0) {
          var y = se(E);
          do
            y -= C, f = $.children[y];
          while (f && (k(f, "display") === "none" || f === N));
        }
        if (C === 0 || f === r)
          return O(!1);
        Be = r, St = C;
        var A = r.nextElementSibling, _ = !1;
        _ = C === 1;
        var g = Ft(W, n, E, i, r, o, e, _);
        if (g !== !1)
          return (g === 1 || g === -1) && (_ = g === 1), Zn = !0, setTimeout(Nl, 30), S(), _ && !A ? n.appendChild(E) : r.parentNode.insertBefore(E, _ ? A : r), K && Hi(K, 0, J - K.scrollTop), $ = E.parentNode, I !== void 0 && !qt && (Kt = Math.abs(I - Y(r)[j])), L(), O(!0);
      }
      if (n.contains(E))
        return O(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    P(document, "mousemove", this._onTouchMove), P(document, "touchmove", this._onTouchMove), P(document, "pointermove", this._onTouchMove), P(document, "dragover", Re), P(document, "mousemove", Re), P(document, "touchmove", Re);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    P(e, "mouseup", this._onDrop), P(e, "touchend", this._onDrop), P(e, "pointerup", this._onDrop), P(e, "pointercancel", this._onDrop), P(e, "touchcancel", this._onDrop), P(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, r = this.options;
    if (ae = se(E), Ae = se(E, r.draggable), re("drop", this, {
      evt: e
    }), $ = E && E.parentNode, ae = se(E), Ae = se(E, r.draggable), x.eventCanceled) {
      this._nulling();
      return;
    }
    Je = !1, qt = !1, _t = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Qn(this.cloneId), Qn(this._dragStartId), this.nativeDraggable && (P(document, "drop", this), P(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), bt && k(document.body, "user-select", ""), k(E, "transform", ""), e && (ct && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), N && N.parentNode && N.parentNode.removeChild(N), (W === $ || Z && Z.lastPutMode !== "clone") && B && B.parentNode && B.parentNode.removeChild(B), E && (this.nativeDraggable && P(E, "dragend", this), Rn(E), E.style["will-change"] = "", ct && !Je && oe(E, Z ? Z.options.ghostClass : this.options.ghostClass, !1), oe(E, this.options.chosenClass, !1), ee({
      sortable: this,
      name: "unchoose",
      toEl: $,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), W !== $ ? (ae >= 0 && (ee({
      rootEl: $,
      name: "add",
      toEl: $,
      fromEl: W,
      originalEvent: e
    }), ee({
      sortable: this,
      name: "remove",
      toEl: $,
      originalEvent: e
    }), ee({
      rootEl: $,
      name: "sort",
      toEl: $,
      fromEl: W,
      originalEvent: e
    }), ee({
      sortable: this,
      name: "sort",
      toEl: $,
      originalEvent: e
    })), Z && Z.save()) : ae !== Xe && ae >= 0 && (ee({
      sortable: this,
      name: "update",
      toEl: $,
      originalEvent: e
    }), ee({
      sortable: this,
      name: "sort",
      toEl: $,
      originalEvent: e
    })), x.active && ((ae == null || ae === -1) && (ae = Xe, Ae = Et), ee({
      sortable: this,
      name: "end",
      toEl: $,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    re("nulling", this), W = E = $ = N = He = B = Yt = Ce = Pe = fe = ct = ae = Ae = Xe = Et = Be = St = Z = jt = x.dragged = x.ghost = x.clone = x.active = null, hn.forEach(function(e) {
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
        E && (this._onDragOver(e), xl(e));
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
      n = r[i], pe(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || Rl(n));
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
      pe(l, this.options.draggable, i, !1) && (r[o] = l);
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
    return pe(e, n || this.options.draggable, this.el, !1);
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
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && Wi(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    re("destroy", this);
    var e = this.el;
    e[ie] = null, P(e, "mousedown", this._onTapStart), P(e, "touchstart", this._onTapStart), P(e, "pointerdown", this._onTapStart), this.nativeDraggable && (P(e, "dragover", this), P(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), pn.splice(pn.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Ce) {
      if (re("hideClone", this), x.eventCanceled) return;
      k(B, "display", "none"), this.options.removeCloneOnHide && B.parentNode && B.parentNode.removeChild(B), Ce = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ce) {
      if (re("showClone", this), x.eventCanceled) return;
      E.parentNode == W && !this.options.group.revertClone ? W.insertBefore(B, E) : He ? W.insertBefore(B, He) : W.appendChild(B), this.options.group.revertClone && this.animate(E, B), k(B, "display", ""), Ce = !1;
    }
  }
};
function xl(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Ft(t, e, n, r, i, o, a, l) {
  var s, u = t[ie], p = u.options.onMove, c;
  return window.CustomEvent && !_e && !xt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = r, s.related = i || e, s.relatedRect = o || Y(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), p && (c = p.call(u, s, a)), c;
}
function Rn(t) {
  t.draggable = !1;
}
function Nl() {
  Zn = !1;
}
function Il(t, e, n) {
  var r = Y(Qe(n.el, 0, n.options, !0)), i = qi(n.el, n.options, N), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function Ol(t, e, n) {
  var r = Y(dr(n.el, n.options.draggable)), i = qi(n.el, n.options, N), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function Ml(t, e, n, r, i, o, a, l) {
  var s = r ? t.clientY : t.clientX, u = r ? n.height : n.width, p = r ? n.top : n.left, c = r ? n.bottom : n.right, d = !1;
  if (!a) {
    if (l && Kt < u * i) {
      if (!_t && (St === 1 ? s > p + u * o / 2 : s < c - u * o / 2) && (_t = !0), _t)
        d = !0;
      else if (St === 1 ? s < p + Kt : s > c - Kt)
        return -St;
    } else if (s > p + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return Pl(e);
  }
  return d = d || a, d && (s < p + u * o / 2 || s > c - u * o / 2) ? s > p + u / 2 ? 1 : -1 : 0;
}
function Pl(t) {
  return se(E) < se(t) ? 1 : -1;
}
function Rl(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function Vl(t) {
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
yn && R(document, "touchmove", function(t) {
  (x.active || Je) && t.cancelable && t.preventDefault();
});
x.utils = {
  on: R,
  off: P,
  css: k,
  find: Ri,
  is: function(e, n) {
    return !!pe(e, n, e, !1);
  },
  extend: bl,
  throttle: Vi,
  closest: pe,
  toggleClass: oe,
  clone: ji,
  index: se,
  nextTick: Gt,
  cancelNextTick: Qn,
  detectDirection: Fi,
  getChild: Qe,
  expando: ie
};
x.get = function(t) {
  return t[ie];
};
x.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (x.utils = ve(ve({}, x.utils), r.utils)), Nt.mount(r);
  });
};
x.create = function(t, e) {
  return new x(t, e);
};
x.version = gl;
var X = [], ft, er, tr = !1, Vn, Hn, mn, dt;
function Hl() {
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
      this.sortable.nativeDraggable ? R(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? R(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? R(document, "touchmove", this._handleFallbackAutoScroll) : R(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? P(document, "dragover", this._handleAutoScroll) : (P(document, "pointermove", this._handleFallbackAutoScroll), P(document, "touchmove", this._handleFallbackAutoScroll), P(document, "mousemove", this._handleFallbackAutoScroll)), ni(), Zt(), wl();
    },
    nulling: function() {
      mn = er = ft = tr = dt = Vn = Hn = null, X.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (mn = n, r || this.options.forceAutoScrollFallback || xt || _e || bt) {
        jn(n, this.options, l, r);
        var s = ke(l, !0);
        tr && (!dt || o !== Vn || a !== Hn) && (dt && ni(), dt = setInterval(function() {
          var u = ke(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, Zt()), jn(n, i.options, u, r);
        }, 10), Vn = o, Hn = a);
      } else {
        if (!this.options.bubbleScroll || ke(l, !0) === me()) {
          Zt();
          return;
        }
        jn(n, this.options, ke(l, !1), !1);
      }
    }
  }, Se(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Zt() {
  X.forEach(function(t) {
    clearInterval(t.pid);
  }), X = [];
}
function ni() {
  clearInterval(dt);
}
var jn = Vi(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = me(), u = !1, p;
    er !== n && (er = n, Zt(), ft = e.scroll, p = e.scrollFn, ft === !0 && (ft = ke(n, !0)));
    var c = 0, d = ft;
    do {
      var v = d, h = Y(v), w = h.top, b = h.bottom, S = h.left, O = h.right, L = h.width, M = h.height, D = void 0, C = void 0, I = v.scrollWidth, U = v.scrollHeight, m = k(v), j = v.scrollLeft, K = v.scrollTop;
      v === s ? (D = L < I && (m.overflowX === "auto" || m.overflowX === "scroll" || m.overflowX === "visible"), C = M < U && (m.overflowY === "auto" || m.overflowY === "scroll" || m.overflowY === "visible")) : (D = L < I && (m.overflowX === "auto" || m.overflowX === "scroll"), C = M < U && (m.overflowY === "auto" || m.overflowY === "scroll"));
      var J = D && (Math.abs(O - i) <= a && j + L < I) - (Math.abs(S - i) <= a && !!j), f = C && (Math.abs(b - o) <= a && K + M < U) - (Math.abs(w - o) <= a && !!K);
      if (!X[c])
        for (var y = 0; y <= c; y++)
          X[y] || (X[y] = {});
      (X[c].vx != J || X[c].vy != f || X[c].el !== v) && (X[c].el = v, X[c].vx = J, X[c].vy = f, clearInterval(X[c].pid), (J != 0 || f != 0) && (u = !0, X[c].pid = setInterval(function() {
        r && this.layer === 0 && x.active._onTouchMove(mn);
        var A = X[this.layer].vy ? X[this.layer].vy * l : 0, _ = X[this.layer].vx ? X[this.layer].vx * l : 0;
        typeof p == "function" && p.call(x.dragged.parentNode[ie], _, A, t, mn, X[this.layer].el) !== "continue" || Hi(X[this.layer].el, _, A);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && d !== s && (d = ke(d, !1)));
    tr = u;
  }
}, 30), Ui = function(e) {
  var n = e.originalEvent, r = e.putSortable, i = e.dragEl, o = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    l();
    var p = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(p.clientX, p.clientY);
    s(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
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
    var i = Qe(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Ui
};
Se(pr, {
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
Se(hr, {
  pluginName: "removeOnSpill"
});
x.mount(new Hl());
x.mount(hr, pr);
const Ye = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakMap();
function jl(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Wt = /* @__PURE__ */ new WeakMap(), ql = {
  mounted(t, e, n) {
    let r = he(n), i = e.modifiers || {}, o = e.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = jl(i), l = i.horizontal ? "horizontal" : "vertical";
    Wt.set(t, e);
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
      onEnd: function(d) {
        let v = d.newIndex, h = d.oldIndex;
        if (h === v)
          return;
        let w = Wt.get(t), b = w ? w.value : null, S = typeof b == "string";
        if (Array.isArray(b)) {
          let L = d.from;
          h < v ? L.insertBefore(d.item, L.children[h]) : L.insertBefore(d.item, L.children[h + 1]);
          let M = b.splice(h, 1)[0];
          b.splice(v, 0, M);
          return;
        }
        if (S && r) {
          let L = b, M = [], D = d.item, C = Qt.get(D);
          C === void 0 && (C = D.dataset.livueSortItem), typeof C == "string" && /^\d+$/.test(C) && (C = parseInt(C, 10));
          let I = d.from, U = d.to, m = [C, v].concat(M);
          if (I !== U) {
            let K = U.dataset.livueSortMethod;
            K && (L = K);
            let J = I.dataset.livueSortId || I.dataset.livueSortGroup || null;
            m.push(J);
          }
          r.call(L, m);
        }
      }
    };
    typeof e.value == "string" && (t.dataset.livueSortMethod = e.value), t.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let c = x.create(t, u);
    Ye.set(t, c);
  },
  updated(t, e) {
    Wt.set(t, e);
    let n = Ye.get(t);
    n && t.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = Ye.get(t);
    e && (e.destroy(), Ye.delete(t)), Wt.delete(t);
  }
}, zl = {
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
}, Fl = {
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
}, Wl = {
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
}, Bl = {
  mounted(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = Ye.get(t);
    r && r.option("group", n);
  },
  updated(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = Ye.get(t);
    r && r.option("group", n);
  },
  unmounted(t) {
    if (t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, $l = V("dblclick"), Ul = V("mousedown"), Jl = V("mouseup"), Xl = V("mouseenter"), Yl = V("mouseleave"), Kl = V("mouseover"), Gl = V("mouseout"), Zl = V("mousemove"), Ql = V("contextmenu"), es = V("keydown", { isKeyboardEvent: !0 }), ts = V("keyup", { isKeyboardEvent: !0 }), ns = V("keypress", { isKeyboardEvent: !0 }), rs = V("focus"), is = V("focusin"), os = V("focusout"), as = V("touchstart"), ls = V("touchend"), ss = V("touchmove"), us = V("touchcancel"), cs = V("change"), fs = V("input"), ds = V("reset"), ps = V("dragstart"), hs = V("dragend"), ms = V("dragenter"), vs = V("dragleave"), gs = V("dragover"), ys = V("drop"), bs = V("copy"), ws = V("cut"), Es = V("paste"), Ss = V("wheel"), _s = V("resize");
function As() {
  T("init", Ca), T("submit", La), T("intersect", ka), T("current", xa), T("ignore", Na), T("model-livue", Pa), T("debounce", ul), T("throttle", cl), T("blur", ur), T("enter", cr), T("boolean", pl), T("poll", Ha), T("offline", qa), T("transition", ua), T("replace", za), T("loading", Ba), T("target", $a), T("stream", Ua), T("click", Ya), T("navigate", Ka), T("scroll", Ga), T("dirty", Za), T("watch", nl), T("sort", ql), T("sort-item", zl), T("sort-handle", Fl), T("sort-ignore", Wl), T("sort-group", Bl), T("dblclick", $l), T("mousedown", Ul), T("mouseup", Jl), T("mouseenter", Xl), T("mouseleave", Yl), T("mouseover", Kl), T("mouseout", Gl), T("mousemove", Zl), T("contextmenu", Ql), T("keydown", es), T("keyup", ts), T("keypress", ns), T("focus", rs), T("focusin", is), T("focusout", os), T("touchstart", as), T("touchend", ls), T("touchmove", ss), T("touchcancel", us), T("change", cs), T("input", fs), T("reset", ds), T("dragstart", ps), T("dragend", hs), T("dragenter", ms), T("dragleave", vs), T("dragover", gs), T("drop", ys), T("copy", bs), T("cut", ws), T("paste", Es), T("wheel", Ss), T("resize", _s);
}
let De = null, st = null, ri = !1;
function Ds() {
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
function Ts() {
  return De || (Ds(), De = document.createElement("div"), De.className = "livue-hmr-indicator", document.body.appendChild(De), De);
}
function Bt(t, e) {
  const n = Ts();
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
  De && De.classList.remove("visible");
}
let qe = null, bn = !0, Ji = !0, pt = !0, en = [];
function Cs(t) {
  qe = t;
}
async function Ls(t) {
  if (bn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), pt && Bt("updating", t.fileName), en.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Ji ? ks() : null, n = await fetch(window.location.href, {
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
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), qe.reboot(), e && (await Ns(), xs(e)), pt && Bt("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), pt && Bt("error");
    }
  }
}
function ks() {
  const t = /* @__PURE__ */ new Map();
  return qe && qe.all().forEach(function(n) {
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
function xs(t) {
  qe && t.forEach(function(e, n) {
    const r = qe.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function Ns() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Is() {
  return typeof import.meta < "u" && !1;
}
function Os() {
  bn = !0;
}
function Ms() {
  bn = !1;
}
function Ps() {
  return bn;
}
function Rs(t) {
  t.indicator !== void 0 && (pt = t.indicator), t.preserveState !== void 0 && (Ji = t.preserveState);
}
function Vs(t) {
  return en.push(t), function() {
    const e = en.indexOf(t);
    e !== -1 && en.splice(e, 1);
  };
}
async function Hs() {
  qe && await Ls({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var $e = !1, qn = [];
class js {
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
    Fo(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    As(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), bo(this), this._startObserver(), Cs(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Yo());
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
    yo(e);
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
    Lo();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Mo();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Oe;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: tt(),
      ...Xo()
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
    let r = new Ta(e);
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
      isAvailable: Is,
      isEnabled: Ps,
      enable: Os,
      disable: Ms,
      configure: Rs,
      onUpdate: Vs,
      trigger: Hs
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
    if (e && !$e) {
      $e = !0, console.log("[LiVue] Debug mode enabled");
      var n = br();
      n.forEach(function(r) {
        var i = yr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        qn.push(i);
      });
    } else !e && $e && ($e = !1, console.log("[LiVue] Debug mode disabled"), qn.forEach(function(r) {
      r();
    }), qn = []);
    return $e;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return $e;
  }
}
const mr = new js();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = ao, document.head.appendChild(t);
}
var ye = window.LiVueConfig || {};
(ye.showProgressBar !== void 0 || ye.progressBarColor !== void 0 || ye.prefetch !== void 0 || ye.prefetchOnHover !== void 0 || ye.hoverDelay !== void 0 || ye.cachePages !== void 0 || ye.maxCacheSize !== void 0 || ye.restoreScroll !== void 0) && mr.configureNavigation(ye);
function ai() {
  mr.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ai) : queueMicrotask(ai);
window.LiVue = mr;
export {
  mr as default
};
//# sourceMappingURL=livue.esm.js.map
