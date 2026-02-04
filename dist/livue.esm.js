import { reactive as De, toRefs as Oi, effectScope as Mi, ref as Jt, markRaw as Pi, defineComponent as Vi, shallowRef as Ur, onMounted as Jr, onUnmounted as Xr, h as ir, inject as Ri, provide as Hi, nextTick as Wn, onBeforeUnmount as ji, onBeforeMount as Fi, readonly as zi, watchEffect as qi, watch as Ue, computed as $i, createApp as Bi } from "vue";
const Wi = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let Ne = null;
function ln() {
  if (Ne)
    return Ne;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return Ne = t.getAttribute("content"), Ne;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (Ne = decodeURIComponent(e[1]), Ne) : null;
}
function Ui() {
  Ne = null;
}
let W = {
  color: "#29d",
  height: "2px",
  showSpinner: !0,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, Y = null, In = null, ee = null, he = null, Xt = !1, st = 0;
function Ji(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function Xi(t) {
  return (-1 + t) * 100;
}
function Yr() {
  if (Xt) return;
  Xt = !0;
  let t = document.createElement("style");
  t.id = "livue-progress-styles", t.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${W.height};
            background: ${W.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${W.speed}ms ${W.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${W.color}, 0 0 5px ${W.color};
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
            border-top-color: ${W.color};
            border-left-color: ${W.color};
            border-radius: 50%;
            animation: livue-spinner 400ms linear infinite;
        }
        .livue-progress-bar.livue-progress-hidden,
        .livue-progress-spinner.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${W.speed}ms ${W.easing};
        }
        @keyframes livue-spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `, document.head.appendChild(t);
}
function Yi() {
  if (ee) return;
  Yr(), ee = document.createElement("div"), ee.className = "livue-progress-bar livue-progress-hidden", ee.innerHTML = '<div class="livue-progress-peg"></div>', W.showSpinner && (he = document.createElement("div"), he.className = "livue-progress-spinner livue-progress-hidden", he.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let t = document.querySelector(W.parent) || document.body;
  t.appendChild(ee), he && t.appendChild(he);
}
function Gi() {
  if (!Xt) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), Xt = !1, Yr());
}
function Ki(t) {
  Object.assign(W, t), Gi();
}
function Qi() {
  st++, Y === null && (Yi(), Y = 0, ee && ee.classList.remove("livue-progress-hidden"), he && he.classList.remove("livue-progress-hidden"), sn(W.minimum), W.trickle && (In = setInterval(function() {
    Gr();
  }, W.trickleSpeed)));
}
function sn(t) {
  Y !== null && (t = Ji(t, W.minimum, 1), Y = t, ee && (ee.style.transform = "translate3d(" + Xi(t) + "%, 0, 0)"));
}
function Gr() {
  if (Y === null || Y >= 1) return;
  let t;
  Y < 0.2 ? t = 0.1 : Y < 0.5 ? t = 0.04 : Y < 0.8 ? t = 0.02 : Y < 0.99 ? t = 5e-3 : t = 0, sn(Y + t);
}
function Kr() {
  st = Math.max(0, st - 1), !(st > 0) && Y !== null && (sn(1), clearInterval(In), In = null, setTimeout(function() {
    ee && ee.classList.add("livue-progress-hidden"), he && he.classList.add("livue-progress-hidden"), setTimeout(function() {
      Y = null, ee && (ee.style.transform = "translate3d(-100%, 0, 0)");
    }, W.speed);
  }, W.speed));
}
function Zi() {
  st = 0, Kr();
}
function eo() {
  return Y !== null;
}
function to() {
  return Y;
}
const Ce = {
  configure: Ki,
  start: Qi,
  set: sn,
  trickle: Gr,
  done: Kr,
  forceDone: Zi,
  isStarted: eo,
  getStatus: to
};
var rt = null, or = !1, Be = !1, ne = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, me = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map(), Nn = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new Map(), _e = null;
function no(t) {
  Object.assign(ne, t), t.progressBarColor && Ce.configure({ color: t.progressBarColor });
}
function ro(t) {
  rt = t, !or && (or = !0, _e = Qr(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: _e },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (Zr(_e), _e = e.state.pageKey, St(e.state.url, !1, !0));
  }), oo());
}
function Qr() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function Zr(t) {
  if (!(!ne.restoreScroll || !t)) {
    Rt.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Rt.get(t) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Rt.set(t, i);
      }
    });
  }
}
function io(t) {
  if (!(!ne.restoreScroll || !t)) {
    var e = Rt.get(t);
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
function oo() {
  document.addEventListener("click", ao, !0), ne.prefetch && (document.addEventListener("mouseenter", so, !0), document.addEventListener("mouseleave", uo, !0), document.addEventListener("mousedown", co, !0), document.addEventListener("focus", fo, !0));
}
function ao(t) {
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
        n.startsWith("#") || n.startsWith("javascript:") || e.hasAttribute("download") || e.getAttribute("target") !== "_blank" && (t.preventDefault(), t.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), St(n, !0, !1));
      }
    }
  }
}
function lo(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function so(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ne.prefetchOnHover)) {
      var n = lo(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            un(r);
          }, ne.hoverDelay);
          Nn.set(e, i);
        }
      }
    }
  }
}
function uo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Nn.get(e);
      n && (clearTimeout(n), Nn.delete(e));
    }
  }
}
function co(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || un(n);
    }
  }
}
function fo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !ne.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || un(n);
    }
  }
}
function un(t) {
  var e = new URL(t, location.origin).href;
  if (Me.has(e))
    return Me.get(e);
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
    return Me.delete(e), r.ok ? r.text().then(function(i) {
      return ne.cachePages && ei(e, i), i;
    }) : null;
  }).catch(function(r) {
    return Me.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Me.set(e, n), n;
}
function ei(t, e) {
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
function po() {
  me.clear();
}
function Un(t) {
  Be || !t || !t.url || (t.navigate ? St(t.url, !0, !1) : (Be = !0, window.location.href = t.url));
}
async function St(t, e, n) {
  if (!Be) {
    if (!rt) {
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
      Be = !0, n || Zr(_e), ne.showProgressBar && Ce.start();
      try {
        var o, a = me.get(r);
        if (a)
          o = a.html;
        else if (Me.has(r))
          o = await Me.get(r);
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
          o = await l.text(), ne.cachePages && ei(r, o);
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
        var c = ho(), m = /* @__PURE__ */ new Set();
        c.forEach(function(A) {
          A.livueIds.forEach(function(x) {
            m.add(x);
          });
        }), rt._stopObserver(), rt.destroyExcept(m), c.forEach(function(A) {
          A.element.parentNode && A.element.parentNode.removeChild(A.element);
        });
        var y = u.querySelector("title");
        y && (document.title = y.textContent), document.body.innerHTML = u.body.innerHTML, mo(c);
        var p = u.querySelector('meta[name="csrf-token"]'), w = document.querySelector('meta[name="csrf-token"]');
        if (p && w && (w.setAttribute("content", p.getAttribute("content")), Ui()), vo(u), e && (_e = Qr(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: _e },
          "",
          r
        )), go(u), rt.rebootPreserving(), n)
          io(_e);
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
        Be = !1, ne.showProgressBar && Ce.done();
      }
    }
  }
}
function ho() {
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
function mo(t) {
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
function vo(t) {
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
function go(t) {
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
function yo() {
  return Be;
}
var Fe = /* @__PURE__ */ new Map(), bo = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function ar(t, e) {
  return typeof t != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", t), function() {
  }) : typeof e != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (Fe.has(t) || Fe.set(t, /* @__PURE__ */ new Set()), Fe.get(t).add(e), function() {
    var n = Fe.get(t);
    n && (n.delete(e), n.size === 0 && Fe.delete(t));
  });
}
function oe(t, e) {
  var n = Fe.get(t);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(e);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + t + '" callback:', i);
    }
  });
}
function ti() {
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
function lr() {
  return bo.slice();
}
var On = [], Mn = [], yt = !1;
function wo(t) {
  return t.isolate ? Eo(t) : new Promise(function(e, n) {
    On.push({
      payload: t,
      resolve: e,
      reject: n
    }), yt || (yt = !0, queueMicrotask(ni));
  });
}
function So(t) {
  return new Promise(function(e, n) {
    Mn.push({
      payload: t,
      resolve: e,
      reject: n
    }), yt || (yt = !0, queueMicrotask(ni));
  });
}
async function ni() {
  var t = On, e = Mn;
  if (On = [], Mn = [], yt = !1, !(t.length === 0 && e.length === 0)) {
    Ce.start();
    var n = ri(), r = ln(), i = {
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
          Un(m[c].redirect);
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
      Ce.done();
    }
  }
}
async function Eo(t) {
  Ce.start();
  var e = ri(), n = ln(), r = {
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
      return Un(s.redirect), new Promise(function() {
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
    Ce.done();
  }
}
function ri() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function sr(t, e, n, r, i) {
  return wo({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
function Pn(t) {
  return De(Object.assign({}, t));
}
function _o(t, e) {
  let n;
  for (n in e) {
    let r = JSON.stringify(t[n]), i = JSON.stringify(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function ii(t) {
  return JSON.parse(JSON.stringify(t));
}
function Ao(t) {
  return Oi(t);
}
let Vn = null, oi = /* @__PURE__ */ new Map();
function Do() {
  return De({});
}
function pe(t, e) {
  Rn(t);
  for (let n in e)
    t[n] = e[n];
}
function Rn(t) {
  for (let e in t)
    delete t[e];
}
function To(t) {
  Vn = t;
}
function Ke(t, e, n, r) {
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
  }), i ? !0 : (Vn ? Vn(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function Co(t, e) {
  typeof e == "function" && oi.set(t, e);
}
function Hn(t) {
  oi.delete(t);
}
var ai = [];
function j(t, e, n) {
  ai.push({
    name: t,
    directive: e
  });
}
function Lo() {
  return ai;
}
const Te = /* @__PURE__ */ new Map(), Le = /* @__PURE__ */ new Map();
let ur = !1;
function Xe() {
  return typeof window < "u" && window.Echo;
}
function ko(t, e) {
  if (!Xe())
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
function li(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!Xe())
    return ur || (ur = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: c } = o, m = ko(a, l);
    if (!m) continue;
    const y = l + ":" + a + ":" + s + ":" + t;
    if (Le.has(y)) {
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
      xo(m, s, p);
    else {
      const w = c ? "." + s : s;
      m.listen(w, p);
    }
    Le.set(y, {
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
      si(r[i]);
  };
}
function xo(t, e, n) {
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
function si(t) {
  const e = Le.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    Le.delete(t), Io(e.channelKey);
  }
}
function cr(t) {
  const e = ":" + t, n = [];
  Le.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    si(n[r]);
}
function Io(t) {
  let e = !1;
  if (Le.forEach(function(r) {
    r.channelKey === t && (e = !0);
  }), e) return;
  if (Te.get(t) && Xe()) {
    const r = t.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Te.delete(t);
}
function fr() {
  Le.clear(), Te.forEach(function(t, e) {
    if (Xe()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Te.clear();
}
function No() {
  return {
    echoAvailable: Xe(),
    channels: Array.from(Te.keys()),
    subscriptions: Array.from(Le.keys())
  };
}
function Oo() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Se = /* @__PURE__ */ new Map();
function Yt(t, e, n, r) {
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
function Ht(t, e, n, r, i, o) {
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
function dr(t) {
  Se.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Se.delete(n);
  });
}
function Mo(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    Ht(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Po(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, l = e[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function Vo() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function ui(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", t), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = Vo();
    s.open("POST", u, !0);
    var d = ln();
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
function Ro(t, e, n, r, i) {
  var o = Array.from(t), a = [], l = o.length, s = 0;
  return o.reduce(function(u, d, c) {
    return u.then(function() {
      return ui(d, e, n, r, function(m) {
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
const Ho = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var pr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(pr || (pr = {}));
function jo() {
  const t = Mi(!0), e = t.run(() => Jt({}));
  let n = [], r = [];
  const i = Pi({
    install(o) {
      i._a = o, o.provide(Ho, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
let dn = 0;
function Fo(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
function zo(t) {
  return Vi({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = Jt(!1), i = Ur(null), o = null, a = Jt(null);
      async function l() {
        if (!r.value)
          try {
            let u = await So({
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
        dn++;
        let c = "lazy-" + dn + "-" + Date.now(), m = d.memo ? d.memo.name : "", y = Fo(d.state || {}), p = d.memo || {}, { createLivueHelper: w, buildComponentDef: h, processTemplate: A, createReactiveState: x } = t._lazyHelpers, N = x(y), L = JSON.parse(JSON.stringify(y)), D = { _updateTemplate: null }, I = w(
          c,
          N,
          p,
          D,
          L,
          u.snapshot
        );
        p.errors && pe(I.errors, p.errors);
        let H = "livue-lazy-child-" + dn, g = A(u.html, t), f = '<div data-livue-id="' + c + '">' + g.template + "</div>", _ = h(f, N, I, t._versions, m);
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
              Yt(S, m, c, function(V) {
                O.call(v, V);
              });
            })(E[S], I);
        for (let S in g.childDefs)
          t.vueApp._context.components[S] || t.vueApp.component(S, g.childDefs[S]);
        t._versions[H] = 0, t.vueApp._context.components[H] || t.vueApp.component(H, _), i.value = _, r.value = !0;
      }
      return Jr(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Xr(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? ir(i.value) : ir("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
let ut = /* @__PURE__ */ new Map(), ct = /* @__PURE__ */ new Map();
function bt(t, e) {
  let n = t + ":debounce:" + e;
  if (!ut.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let c = i, m = o, y = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(m).catch(y);
        }, e);
      });
    };
    ut.set(n, l);
  }
  return ut.get(n);
}
function wt(t, e) {
  let n = t + ":throttle:" + e;
  if (!ct.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < e ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    ct.set(n, i);
  }
  return ct.get(n);
}
function hr(t) {
  let e = t + ":";
  for (let n of ut.keys())
    n.startsWith(e) && ut.delete(n);
  for (let n of ct.keys())
    n.startsWith(e) && ct.delete(n);
}
const Gt = "livue-tab-sync";
let Jn = Date.now() + "-" + Math.random().toString(36).substr(2, 9), Kt = null, Xn = /* @__PURE__ */ new Map(), mr = !1;
function ci() {
  mr || (mr = !0, typeof BroadcastChannel < "u" ? (Kt = new BroadcastChannel(Gt), Kt.onmessage = qo) : window.addEventListener("storage", $o));
}
function qo(t) {
  let e = t.data;
  e.tabId !== Jn && fi(e);
}
function $o(t) {
  if (t.key === Gt && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === Jn) return;
      fi(e);
    } catch {
    }
}
function fi(t) {
  let e = Xn.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function Bo(t, e) {
  ci(), Xn.set(t, e);
}
function vr(t) {
  Xn.delete(t);
}
function Wo(t, e, n, r) {
  ci();
  let i = {
    tabId: Jn,
    component: t,
    state: e,
    properties: n,
    config: r
  };
  if (Kt)
    Kt.postMessage(i);
  else
    try {
      localStorage.setItem(Gt, JSON.stringify(i)), localStorage.removeItem(Gt);
    } catch {
    }
}
function Uo(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
let gr = 0;
function jn() {
  return typeof document < "u" && "startViewTransition" in document;
}
const pn = /* @__PURE__ */ new WeakMap();
function yr() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const Jo = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (gr++, r = "livue-transition-" + gr), pn.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), jn() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    yr();
  },
  updated(t, e) {
    let n = pn.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), jn() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    pn.delete(t), t.removeAttribute("data-livue-transition"), yr();
  }
};
function Xo(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
const Yn = /* @__PURE__ */ new Map();
async function Yo(t, e = {}) {
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
        "X-CSRF-TOKEN": ln(),
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
              Go(p.stream), n(p.stream);
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
function Go(t) {
  const { to: e, content: n, replace: r } = t, i = Yn.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function br(t, e, n = !1) {
  Yn.set(t, { el: e, replace: n });
}
function wr(t) {
  Yn.delete(t);
}
function Ko(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function Gn(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Ko(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = Gn(r) : e[n] = r;
  }
  return e;
}
function Qo(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Gn(l), d = {};
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
function Zo(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = Gn(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function ea(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
let Sr = 0, di = /* @__PURE__ */ new Map();
function ta(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function na(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function pi(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    di.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: ta(n)
    });
  });
}
function hi(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = di.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && na(n, i.inputs));
  });
}
function Ct(t, e) {
  let n = {}, r = ii(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function ra(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function Qt(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    ra(r) ? e[n] = r[0] : e[n] = r;
  }
  return e;
}
let mi = {
  ref: Jt,
  computed: $i,
  watch: Ue,
  watchEffect: qi,
  reactive: De,
  readonly: zi,
  onMounted: Jr,
  onUnmounted: Xr,
  onBeforeMount: Fi,
  onBeforeUnmount: ji,
  nextTick: Wn,
  provide: Hi,
  inject: Ri
}, vi = Object.keys(mi), ia = vi.map(function(t) {
  return mi[t];
});
function oa(t) {
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
function aa(t, e, n) {
  let r = Object.keys(e), i = r.map(function(l) {
    return e[l];
  }), o = vi.concat(r).concat(["livue"]), a = ia.concat(i).concat([n]);
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
function la(t) {
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
function ft(t, e, n, r, i, o) {
  let a = la(t), l = oa(a);
  return {
    name: o || "LiVueComponent",
    template: l.html,
    setup: function() {
      let s = Ao(e), u = Object.assign({}, s, r, { livue: n, livueV: i });
      if (l.setupCode) {
        let d = aa(l.setupCode, s, n);
        d && Object.assign(u, d);
      }
      return u;
    }
  };
}
function Fn(t, e, n, r, i, o, a) {
  a = a || {};
  let l = Do(), s = n.name, u = n.vueMethods || {}, d = n.confirms || {}, c = n.isolate || !1, m = n.urlParams || null, y = n.uploads || null, p = n.tabSync || null, w = !1, h = i, A = o;
  function x(f) {
    let _ = document.querySelector('meta[name="livue-prefix"]'), S = "/" + (_ ? _.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), v = document.createElement("a");
    v.href = S, v.download = f.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function N() {
    let f = Ct(h, e);
    return {
      snapshot: A,
      diffs: f
    };
  }
  function L(f, _) {
    if (f.redirect) {
      Un(f.redirect);
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
    if (f.download && x(f.download), f.snapshot) {
      let v = JSON.parse(f.snapshot);
      if (v.state) {
        let O = Qt(v.state);
        _o(e, O), h = JSON.parse(JSON.stringify(O));
      }
      A = f.snapshot, v.memo && (v.memo.errors ? pe(g.errors, v.memo.errors) : Rn(g.errors), v.memo.vueMethods && (u = v.memo.vueMethods), v.memo.urlParams && (m = v.memo.urlParams), v.memo.uploads && (y = v.memo.uploads), v.memo.confirms && (d = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && Zo(I, v.memo));
    }
    if (m && Po(m, e), f.html && r && r._updateTemplate) {
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
      Mo(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var S = 0; S < f.js.length; S++)
        try {
          new Function("state", "livue", f.js[S])(e, g);
        } catch (v) {
          console.error("[LiVue] Error executing ->vue() JS:", v);
        }
    if (p && p.enabled && f.snapshot && !w && JSON.parse(f.snapshot).state) {
      let O = ii(e), V = [];
      for (let R in O)
        (!_ || !(R in _)) && V.push(R);
      if (V.length > 0) {
        let R = Uo(O, V, p);
        Object.keys(R).length > 0 && Wo(s, R, V, p);
      }
    }
    if (w = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let D = De({}), I = {}, H = function(f, _) {
    return g.call(f, _);
  };
  ea(n) && (I = Qo(n, H));
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
      let _ = Ct(h, e);
      return f === void 0 ? Object.keys(_).length > 0 : f in _;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = Ct(h, e);
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
          let R = N(), se = await sr(R.snapshot, f, S, R.diffs, c);
          V = L(se, R.diffs);
        } catch (R) {
          R.status === 422 && R.data && R.data.errors ? pe(g.errors, R.data.errors) : Ke(R, s);
        } finally {
          g.loading = !1, g.processing = null, delete D[f];
        }
        return V;
      };
      return v && v.debounce ? bt(t + ":" + f, v.debounce)(O) : v && v.throttle ? wt(t + ":" + f, v.throttle)(O) : O();
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
        let f = N(), _ = await sr(f.snapshot, null, [], f.diffs, c);
        L(_, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? pe(g.errors, f.data.errors) : Ke(f, s);
      } finally {
        g.loading = !1, g.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      Rn(g.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, _) {
      Ht(f, _, "broadcast", s, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, _, E) {
      Ht(_, E, "to", s, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, _) {
      Ht(f, _, "self", s, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      St(f, !0);
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
        var E = await ui(_, s, f, y[f].token, function(S) {
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
        S.status === 422 && S.data && S.data.errors ? pe(g.errors, S.data.errors) : Ke(S, s);
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
        var E = await Ro(_, s, f, y[f].token, function(S) {
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
        S.status === 422 && S.data && S.data.errors ? pe(g.errors, S.data.errors) : Ke(S, s);
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
        let v = await Yo(S, {
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
        S.status === 422 && S.data && S.data.errors ? pe(g.errors, S.data.errors) : Ke(S, s);
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
      }) : Ue(
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
      }) : (Co(t, f), function() {
        Hn(t);
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
      let f = Ct(h, e), _ = {};
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
  return p && p.enabled && Bo(s, function(f, _, E) {
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
function jt(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", c = JSON.parse(d), m = c.memo ? c.memo.name : "", y = Qt(c.state || {}), p = c.memo || {}, w = s.innerHTML, h = e._childRegistry[u];
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
          var x = g[A];
          x in y && (h.state[x] = y[x]);
        }
        h.livue._updateServerState(y, d), h.componentRef && h.componentRef._updateTemplate && h.componentRef._updateTemplate(w);
      }
    }
    let N = !h;
    if (!h) {
      Sr++;
      let g = "livue-child-" + Sr, f = Pn(y), _ = JSON.parse(JSON.stringify(y)), E = Object.assign({ name: p.name || m }, p), S = { _updateTemplate: null }, v = ti(), O = Fn(u, f, E, S, _, d, {
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
            Yt(ke, m, u, function(Ge) {
              fe.call(ce, Ge);
            });
          })(ue[ke], V);
      let Ye = p.echo || null;
      Ye && Ye.length && (function(ke, ce) {
        li(ke, Ye, function(fe, Ge) {
          ce.call(fe, Ge);
        });
      })(u, V), S._updateTemplate = function(ke) {
        let ce = e.el.querySelector('[data-livue-id="' + u + '"]');
        ce && pi(ce);
        let fe = jt(ke, e), Ge = '<div data-livue-id="' + u + '">' + fe.template + "</div>";
        for (let Ve in fe.childDefs)
          e.vueApp._context.components[Ve] || e.vueApp.component(Ve, fe.childDefs[Ve]);
        e.vueApp._context.components[h.tagName] = ft(Ge, h.state, h.livue, h.composables || {}, e._versions, h.name), e._versions[h.tagName] = (e._versions[h.tagName] || 0) + 1, Wn(function() {
          let Ve = e.el.querySelector('[data-livue-id="' + u + '"]');
          Ve && hi(Ve);
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
    I && e._rootState && Yt("$modelUpdate", h.name, u, function(g) {
      g && g.value !== void 0 && (e._rootState[I] = g.value);
    }), N && (i[L] = ft(
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
class sa {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = Pn(Qt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = De({}), this._rootDefRef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: Fn,
      buildComponentDef: ft,
      processTemplate: jt,
      createReactiveState: Pn
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
        }), pi(r.el);
        let A = jt(w, r);
        for (let N in A.childDefs)
          r.vueApp._context.components[N] || r.vueApp.component(N, A.childDefs[N]);
        function x() {
          r._rootDefRef.value = ft(A.template, r.state, r._rootLivue, r._rootComposables || {}, r._versions, r.name), Wn(function() {
            hi(r.el), oe("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (h.skipTransition) {
          x();
          return;
        }
        jn() ? Xo(x, { type: h.transitionType }) : x();
      }
    }, o = JSON.parse(JSON.stringify(Qt(e.state || {})));
    this._cleanups = ti();
    let a = Fn(this.componentId, this.state, this.memo, i, o, n, {
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
    let u = jt(this.el.innerHTML, this), d = e.memo && e.memo.errors || null;
    d && pe(l.errors, d);
    let c = e.memo && e.memo.listeners || null;
    if (c)
      for (let w in c)
        (function(h, A, x, N) {
          Yt(w, x, N, function(L) {
            A.call(h, L);
          });
        })(c[w], l, r.name, r.componentId);
    let m = e.memo && e.memo.echo || null;
    m && m.length && (this._echoUnsubscribe = li(r.componentId, m, function(w, h) {
      l.call(w, h);
    }));
    let y = ft(u.template, r.state, l, s, r._versions, r.name);
    this._rootDefRef = Ur(y), this.vueApp = Bi({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", zo(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = jo();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Lo();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), dr(e), hr(e), Hn(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && vr(n.name), cr(e);
    }
    oe("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), dr(this.componentId), hr(this.componentId), Hn(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && vr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), cr(this.componentId), this.vueApp && (this.vueApp.unmount(), this.vueApp = null);
  }
}
let Er = /* @__PURE__ */ new Set();
function ua(t) {
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
const ca = {
  mounted(t, e, n) {
    let r = ua(n);
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
    Er.has(u) || (Er.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, hn = /* @__PURE__ */ new WeakMap();
function fa(t) {
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
const da = {
  mounted(t, e, n) {
    t.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + t.tagName.toLowerCase() + ">");
    let r = fa(n);
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
    t.addEventListener("submit", l), hn.set(t, l);
  },
  unmounted(t) {
    let e = hn.get(t);
    e && (t.removeEventListener("submit", e), hn.delete(t));
  }
}, Lt = /* @__PURE__ */ new WeakMap();
function pa(t) {
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
const ha = {
  mounted(t, e, n) {
    let r = pa(n);
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
        (c ? !w.isIntersecting : w.isIntersecting) && (!l.once || !m) && (m = !0, r.call(o, a), l.once && (y.disconnect(), Lt.delete(t)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    y.observe(t), Lt.set(t, y);
  },
  unmounted(t) {
    let e = Lt.get(t);
    e && (e.disconnect(), Lt.delete(t));
  }
}, mn = /* @__PURE__ */ new WeakMap();
function vn(t, e) {
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
const ma = {
  mounted(t, e) {
    vn(t, e);
    let n = function() {
      vn(t, e);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), mn.set(t, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(t, e) {
    vn(t, e);
  },
  unmounted(t, e) {
    let n = e.value;
    typeof n == "string" && n.split(" ").filter(function(i) {
      return i.trim();
    }).forEach(function(i) {
      t.classList.remove(i);
    }), t.removeAttribute("data-current");
    let r = mn.get(t);
    r && (r(), mn.delete(t));
  }
};
let _r = 0;
const va = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    _r++;
    let n = "livue-ignore-" + _r;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, Qe = /* @__PURE__ */ new WeakMap();
let Ar = 0;
function ga(t) {
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
function ya(t) {
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
function Dr(t, e) {
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
function ba(t) {
  return !!t.component;
}
const wa = {
  mounted(t, e, n) {
    let r = ga(n);
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
    Ar++;
    let s = "model-" + Ar, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = ya(l);
    l.live && !d && !c && (d = 150);
    function m(D) {
      if (l.number) {
        let I = Number(D);
        D = isNaN(I) ? 0 : I;
      }
      l.boolean && (D = !!D && D !== "false" && D !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = D : o[a] = D;
    }
    function y(D) {
      d > 0 ? bt(s, d)(function() {
        m(D);
      }) : c > 0 ? wt(s, c)(function() {
        m(D);
      }) : m(D);
    }
    let p;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? p = o[a].value : p = o[a];
    let w = ba(n), h = n.component, A = null, x = null, N = null, L = null;
    if (w && h)
      L = h.emit, h.emit = function(D, ...I) {
        if (D === "update:modelValue") {
          let H = I[0];
          y(H);
          return;
        }
        return L.call(h, D, ...I);
      }, h.props && "modelValue" in h.props && (N = Ue(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(D) {
          h.vnode && h.vnode.props && (h.vnode.props.modelValue = D), h.exposed && typeof h.exposed.setValue == "function" && h.exposed.setValue(D), h.update && h.update();
        },
        { immediate: !0 }
      )), Qe.set(t, {
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
        let D = bt(s, d);
        A = function(I) {
          let H = kt(I.target);
          D(function() {
            m(H);
          });
        };
      } else if (c > 0) {
        let D = wt(s, c);
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
      l.enter ? (x = function(D) {
        D.key === "Enter" && m(kt(D.target));
      }, t.addEventListener("keyup", x)) : t.addEventListener(u, A), Dr(t, p), Qe.set(t, {
        isComponent: !1,
        handler: A,
        keyHandler: x,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(t, e, n) {
    let r = Qe.get(t);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], Dr(t, a);
    }
  },
  unmounted(t) {
    let e = Qe.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), Qe.delete(t));
  }
}, gn = /* @__PURE__ */ new WeakMap(), Sa = 2500;
function Ea(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Sa;
}
function _a(t) {
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
const Aa = {
  mounted(t, e, n) {
    let r = _a(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = e.modifiers || {}, s = Ea(l), u = l["keep-alive"] === !0, d = l.visible === !0, c = {
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
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", p), c.visibilityHandler = p, y(), gn.set(t, c);
  },
  unmounted(t) {
    let e = gn.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), gn.delete(t));
  }
}, xt = /* @__PURE__ */ new WeakMap();
let Zt = typeof navigator < "u" ? navigator.onLine : !0, en = /* @__PURE__ */ new Set(), Tr = !1;
function Da() {
  Tr || typeof window > "u" || (Tr = !0, window.addEventListener("online", function() {
    Zt = !0, en.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    Zt = !1, en.forEach(function(t) {
      t(!1);
    });
  }));
}
const Ta = {
  created(t, e) {
    Da();
    let n = e.modifiers || {}, r = e.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = t.style.display || "", Zt && (t.style.display = "none")), xt.set(t, o);
  },
  mounted(t, e) {
    let n = xt.get(t);
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
    r(Zt), n.updateFn = r, en.add(r);
  },
  unmounted(t) {
    let e = xt.get(t);
    e && e.updateFn && en.delete(e.updateFn), xt.delete(t);
  }
};
let Cr = 0;
const Ze = /* @__PURE__ */ new WeakMap(), yn = /* @__PURE__ */ new Map(), Ca = {
  created(t, e) {
    Cr++;
    let n = "livue-replace-" + Cr, r = e.modifiers.self === !0;
    Ze.set(t, {
      id: n,
      isSelf: r,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), r && t.setAttribute("data-livue-replace-self", ""), yn.set(n, 0);
  },
  mounted(t, e) {
    let n = Ze.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = Ze.get(t);
    n && (n.version++, yn.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = Ze.get(t);
    e && yn.delete(e.id), Ze.delete(t);
  }
}, et = /* @__PURE__ */ new WeakMap(), Lr = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, La = 200;
function ka(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(Lr))
    if (t[e])
      return Lr[e];
  return La;
}
function xa(t) {
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
function bn(t, e, n, r, i) {
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
const Ia = {
  created(t, e) {
    let n = t.style.display;
    et.set(t, {
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
    let r = xa(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = et.get(t), o = e.modifiers || {}, a = ka(o), l = e.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, bn(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, bn(t, i, o, u, !0)) : (i.isActive = !1, bn(t, i, o, u, !1));
    }
    i.stopWatch = Ue(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      d,
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    et.get(t);
  },
  unmounted(t) {
    let e = et.get(t);
    e && (e.delayTimer && clearTimeout(e.delayTimer), e.stopWatch && e.stopWatch(), et.delete(t));
  }
}, It = /* @__PURE__ */ new WeakMap();
function kr(t) {
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
    let r = kr(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = e.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = Ue(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? t.setAttribute("data-loading", "") : t.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    It.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = It.get(t), i = kr(n);
    if (!r || !i) return;
    let o = e.value, a = e.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Ue(
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
    let e = It.get(t);
    e && (e.stopWatch && e.stopWatch(), It.delete(t));
  }
}, tt = /* @__PURE__ */ new WeakMap(), Oa = {
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
    tt.set(t, { targetId: n }), br(n, t, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(t, e) {
    const n = tt.get(t), r = e.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      wr(n.targetId);
      const i = e.modifiers.replace || !1;
      br(r, t, i), tt.set(t, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = tt.get(t);
    e && (wr(e.targetId), tt.delete(t));
  }
}, wn = /* @__PURE__ */ new WeakMap();
let xr = 0;
function Ma(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
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
const Va = {
  mounted(t, e, n) {
    const { arg: r, modifiers: i } = e, o = Pa(n);
    if (!o) {
      console.warn("[LiVue] v-click: livue helper not found in component context");
      return;
    }
    xr++;
    const a = "v-click-" + xr, l = Ma(i);
    let s = null, u = null;
    i.debounce && (s = bt(a, l)), i.throttle && (u = wt(a, l));
    let d = !1, c = null;
    r && (c = r);
    const m = function(h) {
      let A = c, x = [];
      if (r) {
        A = r;
        const L = e.value;
        L != null && (x = Array.isArray(L) ? L : [L]);
      } else {
        const L = e.value;
        typeof L == "string" ? A = L : Array.isArray(L) && L.length > 0 && (A = L[0], x = L.slice(1));
      }
      if (!A) {
        console.warn("[LiVue] v-click: no method specified");
        return;
      }
      const N = function() {
        o.call(A, ...x);
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
    wn.set(t, w);
  },
  updated(t, e, n) {
  },
  unmounted(t) {
    const e = wn.get(t);
    e && (e.outsideHandler ? document.removeEventListener("click", e.outsideHandler, e.options) : t.removeEventListener("click", e.handler, e.options), wn.delete(t));
  }
}, Ra = {
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
let Ir = 0;
const Ha = {
  created(t, e) {
    let n = e.value;
    n || (Ir++, n = "scroll-" + Ir), t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n;
  },
  updated(t, e) {
    let n = e.value;
    n && n !== t.__livue_scroll_key && (t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n);
  },
  unmounted(t) {
    t.removeAttribute("data-livue-scroll"), delete t.__livue_scroll_key;
  }
}, dt = /* @__PURE__ */ new WeakMap();
let Nr = 0;
function ja(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function Fa(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function za(t, e) {
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
function Et(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function _t(t, e, n) {
  let r = t[e];
  r && typeof r == "object" && "value" in r ? r.value = n : t[e] = n;
}
function gi(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function qa(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let r in t)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function $a(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function Ba(t) {
  return $a(t) ? t : t.querySelector("input, textarea, select");
}
function At(t, e) {
  return {
    mounted(n, r, i) {
      if (ja(i) && !Fa(i))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = za(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: l } = a, s = qa(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Nr++;
      let d = t + "-" + Nr, c = Ba(n);
      if (!c) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let m = e(c, s, l, u, d);
      c.addEventListener(m.eventType, m.handler, { capture: !0 }), dt.set(n, {
        targetEl: c,
        handler: m.handler,
        eventType: m.eventType
      });
    },
    unmounted(n) {
      let r = dt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), dt.delete(n));
    }
  };
}
const Wa = At("debounce", function(t, e, n, r, i) {
  let o = gi(r) || 150, a = bt(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = Et(l.target);
      a(function() {
        _t(n, e, s);
      });
    }
  };
}), Ua = At("throttle", function(t, e, n, r, i) {
  let o = gi(r) || 150, a = wt(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = Et(l.target);
      a(function() {
        _t(n, e, s);
      });
    }
  };
}), Kn = At("blur", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    _t(n, e, Et(l.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), Ja = Kn.unmounted;
Kn.unmounted = function(t) {
  let e = dt.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), Ja(t);
};
const Qn = At("enter", function(t, e, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && _t(n, e, Et(l.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), Xa = Qn.unmounted;
Qn.unmounted = function(t) {
  let e = dt.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), Xa(t);
};
const Ya = At("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = Et(o.target);
      a = !!a && a !== "false" && a !== "0", _t(n, e, a);
    }
  };
});
function Or(t, e) {
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
    e % 2 ? Or(Object(n), !0).forEach(function(r) {
      Ga(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Or(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Ft(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ft = function(e) {
    return typeof e;
  } : Ft = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ft(t);
}
function Ga(t, e, n) {
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
function Ka(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function Qa(t, e) {
  if (t == null) return {};
  var n = Ka(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
var Za = "1.15.6";
function ve(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var ye = ve(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Dt = ve(/Edge/i), Mr = ve(/firefox/i), pt = ve(/safari/i) && !ve(/chrome/i) && !ve(/android/i), Zn = ve(/iP(ad|od|hone)/i), yi = ve(/chrome/i) && ve(/android/i), bi = {
  capture: !1,
  passive: !1
};
function P(t, e, n) {
  t.addEventListener(e, n, !ye && bi);
}
function M(t, e, n) {
  t.removeEventListener(e, n, !ye && bi);
}
function tn(t, e) {
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
function wi(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function ie(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && tn(t, e) : tn(t, e)) || r && t === n)
        return t;
      if (t === n) break;
    } while (t = wi(t));
  }
  return null;
}
var Pr = /\s+/g;
function Q(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(Pr, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(Pr, " ");
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
function We(t, e) {
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
function Si(t, e, n) {
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
function B(t, e, n, r, i) {
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
      var y = We(i || t), p = y && y.a, w = y && y.d;
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
function Vr(t, e, n) {
  for (var r = Ae(t, !0), i = B(t)[e]; r; ) {
    var o = B(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === ae()) break;
    r = Ae(r, !1);
  }
  return !1;
}
function Je(t, e, n, r) {
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
function er(t, e) {
  for (var n = t.lastElementChild; n && (n === C.ghost || T(n, "display") === "none" || e && !tn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function te(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== C.clone && (!e || tn(t, e)) && n++;
  return n;
}
function Rr(t) {
  var e = 0, n = 0, r = ae();
  if (t)
    do {
      var i = We(t), o = i.a, a = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function el(t, e) {
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
function tl(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Sn(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var ht;
function Ei(t, e) {
  return function() {
    if (!ht) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), ht = setTimeout(function() {
        ht = void 0;
      }, e);
    }
  };
}
function nl() {
  clearTimeout(ht), ht = void 0;
}
function _i(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function Ai(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function Di(t, e, n) {
  var r = {};
  return Array.from(t.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!ie(i, e.draggable, t, !1) || i.animated || i === n)) {
      var u = B(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var K = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function rl() {
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
            var o = le({}, t[t.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = We(i, !0);
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
      t.splice(el(t, {
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
        var s = 0, u = l.target, d = u.fromRect, c = B(u), m = u.prevFromRect, y = u.prevToRect, p = l.rect, w = We(u, !0);
        w && (c.top -= w.f, c.left -= w.e), u.toRect = c, u.thisAnimationDuration && Sn(m, c) && !Sn(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (p.top - c.top) / (p.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = ol(p, m, y, i.options)), Sn(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, p, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        T(r, "transition", ""), T(r, "transform", "");
        var l = We(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, T(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = il(r), T(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), T(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          T(r, "transition", ""), T(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function il(t) {
  return t.offsetWidth;
}
function ol(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var Re = [], En = {
  initializeByDefault: !0
}, Tt = {
  mount: function(e) {
    for (var n in En)
      En.hasOwnProperty(n) && !(n in e) && (e[n] = En[n]);
    Re.forEach(function(r) {
      if (r.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), Re.push(e);
  },
  pluginEvent: function(e, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = e + "Global";
    Re.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](le({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](le({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(e, n, r, i) {
    Re.forEach(function(l) {
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
    return Re.forEach(function(i) {
      typeof i.eventProperties == "function" && ge(r, i.eventProperties.call(n[i.pluginName], e));
    }), r;
  },
  modifyOption: function(e, n, r) {
    var i;
    return Re.forEach(function(o) {
      e[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(e[o.pluginName], r));
    }), i;
  }
};
function al(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, c = t.newDraggableIndex, m = t.originalEvent, y = t.putSortable, p = t.extraEventProperties;
  if (e = e || n && n[K], !!e) {
    var w, h = e.options, A = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ye && !Dt ? w = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (w = document.createEvent("Event"), w.initEvent(r, !0, !0)), w.to = a || n, w.from = l || n, w.item = i || n, w.clone = o, w.oldIndex = s, w.newIndex = u, w.oldDraggableIndex = d, w.newDraggableIndex = c, w.originalEvent = m, w.pullMode = y ? y.lastPutMode : void 0;
    var x = le(le({}, p), Tt.getEventProperties(r, e));
    for (var N in x)
      w[N] = x[N];
    n && n.dispatchEvent(w), h[A] && h[A].call(e, w);
  }
}
var ll = ["evt"], G = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = Qa(r, ll);
  Tt.pluginEvent.bind(C)(e, n, le({
    dragEl: b,
    parentEl: q,
    ghostEl: k,
    rootEl: F,
    nextEl: Oe,
    lastDownEl: zt,
    cloneEl: z,
    cloneHidden: Ee,
    dragStarted: it,
    putSortable: U,
    activeSortable: C.active,
    originalEvent: i,
    oldIndex: qe,
    oldDraggableIndex: mt,
    newIndex: Z,
    newDraggableIndex: be,
    hideGhostForTarget: ki,
    unhideGhostForTarget: xi,
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
  al(le({
    putSortable: U,
    cloneEl: z,
    targetEl: b,
    rootEl: F,
    oldIndex: qe,
    oldDraggableIndex: mt,
    newIndex: Z,
    newDraggableIndex: be
  }, t));
}
var b, q, k, F, Oe, zt, z, Ee, qe, Z, mt, be, Nt, U, ze = !1, nn = !1, rn = [], xe, re, _n, An, Hr, jr, it, He, vt, gt = !1, Ot = !1, qt, J, Dn = [], zn = !1, on = [], cn = typeof document < "u", Mt = Zn, Fr = Dt || ye ? "cssFloat" : "float", sl = cn && !yi && !Zn && "draggable" in document.createElement("div"), Ti = (function() {
  if (cn) {
    if (ye)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Ci = function(e, n) {
  var r = T(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Je(e, 0, n), a = Je(e, 1, n), l = o && T(o), s = a && T(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + B(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + B(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Fr] === "none" || a && r[Fr] === "none" && u + d > i) ? "vertical" : "horizontal";
}, ul = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, cl = function(e, n) {
  var r;
  return rn.some(function(i) {
    var o = i[K].options.emptyInsertThreshold;
    if (!(!o || er(i))) {
      var a = B(i), l = e >= a.left - o && e <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, Li = function(e) {
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
  (!i || Ft(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, ki = function() {
  !Ti && k && T(k, "display", "none");
}, xi = function() {
  !Ti && k && T(k, "display", "");
};
cn && !yi && document.addEventListener("click", function(t) {
  if (nn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), nn = !1, !1;
}, !0);
var Ie = function(e) {
  if (b) {
    e = e.touches ? e.touches[0] : e;
    var n = cl(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[K]._onDragOver(r);
    }
  }
}, fl = function(e) {
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
      return Ci(t, this.options);
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
    supportPointer: C.supportPointer !== !1 && "PointerEvent" in window && (!pt || Zn),
    emptyInsertThreshold: 5
  };
  Tt.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Li(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : sl, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? P(t, "pointerdown", this._onTapStart) : (P(t, "mousedown", this._onTapStart), P(t, "touchstart", this._onTapStart)), this.nativeDraggable && (P(t, "dragover", this), P(t, "dragenter", this)), rn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), ge(this, rl());
}
C.prototype = /** @lends Sortable.prototype */
{
  constructor: C,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (He = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, b) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, d = i.filter;
      if (bl(r), !b && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && pt && s && s.tagName.toUpperCase() === "SELECT") && (s = ie(s, i.draggable, r, !1), !(s && s.animated) && zt !== s)) {
        if (qe = te(s), mt = te(s, i.draggable), typeof d == "function") {
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
      var u = B(r);
      if (F = o, b = r, q = b.parentNode, Oe = b.nextSibling, zt = r, Nt = a.group, C.dragged = b, xe = {
        target: b,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, Hr = xe.clientX - u.left, jr = xe.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, b.style["will-change"] = "all", s = function() {
        if (G("delayEnded", i, {
          evt: e
        }), C.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Mr && i.nativeDraggable && (b.draggable = !0), i._triggerDragStart(e, n), X({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), Q(b, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Si(b, d.trim(), Tn);
      }), P(l, "dragover", Ie), P(l, "mousemove", Ie), P(l, "touchmove", Ie), a.supportPointer ? (P(l, "pointerup", i._onDrop), !this.nativeDraggable && P(l, "pointercancel", i._onDrop)) : (P(l, "mouseup", i._onDrop), P(l, "touchend", i._onDrop), P(l, "touchcancel", i._onDrop)), Mr && this.nativeDraggable && (this.options.touchStartThreshold = 4, b.draggable = !0), G("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Dt || ye))) {
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
    b && Tn(b), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    M(e, "mouseup", this._disableDelayedDrag), M(e, "touchend", this._disableDelayedDrag), M(e, "touchcancel", this._disableDelayedDrag), M(e, "pointerup", this._disableDelayedDrag), M(e, "pointercancel", this._disableDelayedDrag), M(e, "mousemove", this._delayedDragTouchMoveHandler), M(e, "touchmove", this._delayedDragTouchMoveHandler), M(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? P(document, "pointermove", this._onTouchMove) : n ? P(document, "touchmove", this._onTouchMove) : P(document, "mousemove", this._onTouchMove) : (P(b, "dragend", this), P(F, "dragstart", this._onDragStart));
    try {
      document.selection ? $t(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (ze = !1, F && b) {
      G("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && P(document, "dragover", fl);
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
      this._lastX = re.clientX, this._lastY = re.clientY, ki();
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
        } while (n = wi(n));
      xi();
    }
  },
  _onTouchMove: function(e) {
    if (xe) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = k && We(k, !0), l = k && a && a.a, s = k && a && a.d, u = Mt && J && Rr(J), d = (o.clientX - xe.clientX + i.x) / (l || 1) + (u ? u[0] - Dn[0] : 0) / (l || 1), c = (o.clientY - xe.clientY + i.y) / (s || 1) + (u ? u[1] - Dn[1] : 0) / (s || 1);
      if (!C.active && !ze) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (k) {
        a ? (a.e += d - (_n || 0), a.f += c - (An || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        T(k, "webkitTransform", m), T(k, "mozTransform", m), T(k, "msTransform", m), T(k, "transform", m), _n = d, An = c, re = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!k) {
      var e = this.options.fallbackOnBody ? document.body : F, n = B(b, !0, Mt, !0, e), r = this.options;
      if (Mt) {
        for (J = e; T(J, "position") === "static" && T(J, "transform") === "none" && J !== document; )
          J = J.parentNode;
        J !== document.body && J !== document.documentElement ? (J === document && (J = ae()), n.top += J.scrollTop, n.left += J.scrollLeft) : J = ae(), Dn = Rr(J);
      }
      k = b.cloneNode(!0), Q(k, r.ghostClass, !1), Q(k, r.fallbackClass, !0), Q(k, r.dragClass, !0), T(k, "transition", ""), T(k, "transform", ""), T(k, "box-sizing", "border-box"), T(k, "margin", 0), T(k, "top", n.top), T(k, "left", n.left), T(k, "width", n.width), T(k, "height", n.height), T(k, "opacity", "0.8"), T(k, "position", Mt ? "absolute" : "fixed"), T(k, "zIndex", "100000"), T(k, "pointerEvents", "none"), C.ghost = k, e.appendChild(k), T(k, "transform-origin", Hr / parseInt(k.style.width) * 100 + "% " + jr / parseInt(k.style.height) * 100 + "%");
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
    G("setupClone", this), C.eventCanceled || (z = Ai(b), z.removeAttribute("id"), z.draggable = !1, z.style["will-change"] = "", this._hideClone(), Q(z, this.options.chosenClass, !1), C.clone = z), r.cloneId = $t(function() {
      G("clone", r), !C.eventCanceled && (r.options.removeCloneOnHide || F.insertBefore(z, b), r._hideClone(), X({
        sortable: r,
        name: "clone"
      }));
    }), !n && Q(b, o.dragClass, !0), n ? (nn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (M(document, "mouseup", r._onDrop), M(document, "touchend", r._onDrop), M(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, b)), P(document, "drop", r), T(b, "transform", "translateZ(0)")), ze = !0, r._dragStartId = $t(r._dragStarted.bind(r, n, e)), P(document, "selectstart", r), it = !0, window.getSelection().removeAllRanges(), pt && T(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, l = this.options, s = l.group, u = C.active, d = Nt === s, c = l.sort, m = U || u, y, p = this, w = !1;
    if (zn) return;
    function h(ue, Ye) {
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
        completed: x,
        onMove: function(ce, fe) {
          return Pt(F, n, b, i, ce, B(ce), e, fe);
        },
        changed: N
      }, Ye));
    }
    function A() {
      h("dragOverAnimationCapture"), p.captureAnimationState(), p !== m && m.captureAnimationState();
    }
    function x(ue) {
      return h("dragOverCompleted", {
        insertion: ue
      }), ue && (d ? u._hideClone() : u._showClone(p), p !== m && (Q(b, U ? U.options.ghostClass : u.options.ghostClass, !1), Q(b, l.ghostClass, !0)), U !== p && p !== C.active ? U = p : p === C.active && U && (U = null), m === p && (p._ignoreWhileAnimating = r), p.animateAll(function() {
        h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
      }), p !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (r === b && !b.animated || r === n && !r.animated) && (He = null), !l.dragoverBubble && !e.rootEl && r !== document && (b.parentNode[K]._isOutsideThisEl(e.target), !ue && Ie(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), w = !0;
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
      return x(!1);
    if (nn = !1, u && !l.disabled && (d ? c || (a = q !== F) : U === this || (this.lastPutMode = Nt.checkPull(this, u, b, e)) && s.checkPut(this, u, b, e))) {
      if (y = this._getDirection(e, r) === "vertical", i = B(b), h("dragOverValid"), C.eventCanceled) return w;
      if (a)
        return q = F, A(), this._hideClone(), h("revert"), C.eventCanceled || (Oe ? F.insertBefore(b, Oe) : F.appendChild(b)), x(!0);
      var L = er(n, l.draggable);
      if (!L || ml(e, y, this) && !L.animated) {
        if (L === b)
          return x(!1);
        if (L && n === e.target && (r = L), r && (o = B(r)), Pt(F, n, b, i, r, o, e, !!r) !== !1)
          return A(), L && L.nextSibling ? n.insertBefore(b, L.nextSibling) : n.appendChild(b), q = n, N(), x(!0);
      } else if (L && hl(e, y, this)) {
        var D = Je(n, 0, l, !0);
        if (D === b)
          return x(!1);
        if (r = D, o = B(r), Pt(F, n, b, i, r, o, e, !1) !== !1)
          return A(), n.insertBefore(b, D), q = n, N(), x(!0);
      } else if (r.parentNode === n) {
        o = B(r);
        var I = 0, H, g = b.parentNode !== n, f = !ul(b.animated && b.toRect || i, r.animated && r.toRect || o, y), _ = y ? "top" : "left", E = Vr(r, "top", "top") || Vr(b, "top", "top"), S = E ? E.scrollTop : void 0;
        He !== r && (H = o[_], gt = !1, Ot = !f && l.invertSwap || g), I = vl(e, r, o, y, f ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Ot, He === r);
        var v;
        if (I !== 0) {
          var O = te(b);
          do
            O -= I, v = q.children[O];
          while (v && (T(v, "display") === "none" || v === k));
        }
        if (I === 0 || v === r)
          return x(!1);
        He = r, vt = I;
        var V = r.nextElementSibling, R = !1;
        R = I === 1;
        var se = Pt(F, n, b, i, r, o, e, R);
        if (se !== !1)
          return (se === 1 || se === -1) && (R = se === 1), zn = !0, setTimeout(pl, 30), A(), R && !V ? n.appendChild(b) : r.parentNode.insertBefore(b, R ? V : r), E && _i(E, 0, S - E.scrollTop), q = b.parentNode, H !== void 0 && !Ot && (qt = Math.abs(H - B(r)[_])), N(), x(!0);
      }
      if (n.contains(b))
        return x(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    M(document, "mousemove", this._onTouchMove), M(document, "touchmove", this._onTouchMove), M(document, "pointermove", this._onTouchMove), M(document, "dragover", Ie), M(document, "mousemove", Ie), M(document, "touchmove", Ie);
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
    ze = !1, Ot = !1, gt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), qn(this.cloneId), qn(this._dragStartId), this.nativeDraggable && (M(document, "drop", this), M(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), pt && T(document.body, "user-select", ""), T(b, "transform", ""), e && (it && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), k && k.parentNode && k.parentNode.removeChild(k), (F === q || U && U.lastPutMode !== "clone") && z && z.parentNode && z.parentNode.removeChild(z), b && (this.nativeDraggable && M(b, "dragend", this), Tn(b), b.style["will-change"] = "", it && !ze && Q(b, U ? U.options.ghostClass : this.options.ghostClass, !1), Q(b, this.options.chosenClass, !1), X({
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
    })), U && U.save()) : Z !== qe && Z >= 0 && (X({
      sortable: this,
      name: "update",
      toEl: q,
      originalEvent: e
    }), X({
      sortable: this,
      name: "sort",
      toEl: q,
      originalEvent: e
    })), C.active && ((Z == null || Z === -1) && (Z = qe, be = mt), X({
      sortable: this,
      name: "end",
      toEl: q,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    G("nulling", this), F = b = q = k = Oe = z = zt = Ee = xe = re = it = Z = be = qe = mt = He = vt = U = Nt = C.dragged = C.ghost = C.clone = C.active = null, on.forEach(function(e) {
      e.checked = !0;
    }), on.length = _n = An = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        b && (this._onDragOver(e), dl(e));
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
      n = r[i], ie(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || yl(n));
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
    var i = Tt.modifyOption(this, e, n);
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && Li(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    G("destroy", this);
    var e = this.el;
    e[K] = null, M(e, "mousedown", this._onTapStart), M(e, "touchstart", this._onTapStart), M(e, "pointerdown", this._onTapStart), this.nativeDraggable && (M(e, "dragover", this), M(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), rn.splice(rn.indexOf(this.el), 1), this.el = e = null;
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
      b.parentNode == F && !this.options.group.revertClone ? F.insertBefore(z, b) : Oe ? F.insertBefore(z, Oe) : F.appendChild(z), this.options.group.revertClone && this.animate(b, z), T(z, "display", ""), Ee = !1;
    }
  }
};
function dl(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Pt(t, e, n, r, i, o, a, l) {
  var s, u = t[K], d = u.options.onMove, c;
  return window.CustomEvent && !ye && !Dt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = r, s.related = i || e, s.relatedRect = o || B(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function Tn(t) {
  t.draggable = !1;
}
function pl() {
  zn = !1;
}
function hl(t, e, n) {
  var r = B(Je(n.el, 0, n.options, !0)), i = Di(n.el, n.options, k), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function ml(t, e, n) {
  var r = B(er(n.el, n.options.draggable)), i = Di(n.el, n.options, k), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function vl(t, e, n, r, i, o, a, l) {
  var s = r ? t.clientY : t.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, m = !1;
  if (!a) {
    if (l && qt < u * i) {
      if (!gt && (vt === 1 ? s > d + u * o / 2 : s < c - u * o / 2) && (gt = !0), gt)
        m = !0;
      else if (vt === 1 ? s < d + qt : s > c - qt)
        return -vt;
    } else if (s > d + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return gl(e);
  }
  return m = m || a, m && (s < d + u * o / 2 || s > c - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function gl(t) {
  return te(b) < te(t) ? 1 : -1;
}
function yl(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function bl(t) {
  on.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && on.push(r);
  }
}
function $t(t) {
  return setTimeout(t, 0);
}
function qn(t) {
  return clearTimeout(t);
}
cn && P(document, "touchmove", function(t) {
  (C.active || ze) && t.cancelable && t.preventDefault();
});
C.utils = {
  on: P,
  off: M,
  css: T,
  find: Si,
  is: function(e, n) {
    return !!ie(e, n, e, !1);
  },
  extend: tl,
  throttle: Ei,
  closest: ie,
  toggleClass: Q,
  clone: Ai,
  index: te,
  nextTick: $t,
  cancelNextTick: qn,
  detectDirection: Ci,
  getChild: Je,
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
    r.utils && (C.utils = le(le({}, C.utils), r.utils)), Tt.mount(r);
  });
};
C.create = function(t, e) {
  return new C(t, e);
};
C.version = Za;
var $ = [], ot, $n, Bn = !1, Cn, Ln, an, at;
function wl() {
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
      this.sortable.nativeDraggable ? M(document, "dragover", this._handleAutoScroll) : (M(document, "pointermove", this._handleFallbackAutoScroll), M(document, "touchmove", this._handleFallbackAutoScroll), M(document, "mousemove", this._handleFallbackAutoScroll)), zr(), Bt(), nl();
    },
    nulling: function() {
      an = $n = ot = Bn = at = Cn = Ln = null, $.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (an = n, r || this.options.forceAutoScrollFallback || Dt || ye || pt) {
        kn(n, this.options, l, r);
        var s = Ae(l, !0);
        Bn && (!at || o !== Cn || a !== Ln) && (at && zr(), at = setInterval(function() {
          var u = Ae(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, Bt()), kn(n, i.options, u, r);
        }, 10), Cn = o, Ln = a);
      } else {
        if (!this.options.bubbleScroll || Ae(l, !0) === ae()) {
          Bt();
          return;
        }
        kn(n, this.options, Ae(l, !1), !1);
      }
    }
  }, ge(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Bt() {
  $.forEach(function(t) {
    clearInterval(t.pid);
  }), $ = [];
}
function zr() {
  clearInterval(at);
}
var kn = Ei(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = ae(), u = !1, d;
    $n !== n && ($n = n, Bt(), ot = e.scroll, d = e.scrollFn, ot === !0 && (ot = Ae(n, !0)));
    var c = 0, m = ot;
    do {
      var y = m, p = B(y), w = p.top, h = p.bottom, A = p.left, x = p.right, N = p.width, L = p.height, D = void 0, I = void 0, H = y.scrollWidth, g = y.scrollHeight, f = T(y), _ = y.scrollLeft, E = y.scrollTop;
      y === s ? (D = N < H && (f.overflowX === "auto" || f.overflowX === "scroll" || f.overflowX === "visible"), I = L < g && (f.overflowY === "auto" || f.overflowY === "scroll" || f.overflowY === "visible")) : (D = N < H && (f.overflowX === "auto" || f.overflowX === "scroll"), I = L < g && (f.overflowY === "auto" || f.overflowY === "scroll"));
      var S = D && (Math.abs(x - i) <= a && _ + N < H) - (Math.abs(A - i) <= a && !!_), v = I && (Math.abs(h - o) <= a && E + L < g) - (Math.abs(w - o) <= a && !!E);
      if (!$[c])
        for (var O = 0; O <= c; O++)
          $[O] || ($[O] = {});
      ($[c].vx != S || $[c].vy != v || $[c].el !== y) && ($[c].el = y, $[c].vx = S, $[c].vy = v, clearInterval($[c].pid), (S != 0 || v != 0) && (u = !0, $[c].pid = setInterval(function() {
        r && this.layer === 0 && C.active._onTouchMove(an);
        var V = $[this.layer].vy ? $[this.layer].vy * l : 0, R = $[this.layer].vx ? $[this.layer].vx * l : 0;
        typeof d == "function" && d.call(C.dragged.parentNode[K], R, V, t, an, $[this.layer].el) !== "continue" || _i($[this.layer].el, R, V);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && m !== s && (m = Ae(m, !1)));
    Bn = u;
  }
}, 30), Ii = function(e) {
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
function tr() {
}
tr.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = Je(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Ii
};
ge(tr, {
  pluginName: "revertOnSpill"
});
function nr() {
}
nr.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Ii
};
ge(nr, {
  pluginName: "removeOnSpill"
});
C.mount(new wl());
C.mount(nr, tr);
const $e = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap();
function Sl(t) {
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
function El(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const _l = {
  mounted(t, e, n) {
    let r = Sl(n);
    if (!r) {
      console.warn("[LiVue] v-sort: livue helper not found in component context");
      return;
    }
    let i = e.value, o, a = [];
    if (Array.isArray(i) ? (o = i[0], a = i[1] || []) : o = i, typeof o != "string") {
      console.warn("[LiVue] v-sort: expected method name (string), got", typeof o);
      return;
    }
    let l = e.modifiers || {}, s = El(l), u = l.horizontal ? "horizontal" : "vertical", d = t.dataset.livueSortGroup || null;
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
        let w = p.item, h = Wt.get(w);
        h === void 0 && (h = w.dataset.livueSortItem), typeof h == "string" && /^\d+$/.test(h) && (h = parseInt(h, 10));
        let A = p.newIndex;
        p.oldIndex;
        let x = p.from, N = p.to, L = [h, A].concat(a);
        if (x !== N) {
          let I = N.dataset.livueSortMethod;
          I && (o = I);
          let H = x.dataset.livueSortId || x.dataset.livueSortGroup || null;
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
}, Al = {
  mounted(t, e) {
    let n = e.value;
    Wt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    Wt.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (Wt.delete(t), t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Dl = {
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
}, Tl = {
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
}, Cl = {
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
function Ll() {
  j("init", ca), j("submit", da), j("intersect", ha), j("current", ma), j("ignore", va), j("model-livue", wa), j("debounce", Wa), j("throttle", Ua), j("blur", Kn), j("enter", Qn), j("boolean", Ya), j("poll", Aa), j("offline", Ta), j("transition", Jo), j("replace", Ca), j("loading", Ia), j("target", Na), j("stream", Oa), j("click", Va), j("navigate", Ra), j("scroll", Ha), j("sort", _l), j("sort-item", Al), j("sort-handle", Dl), j("sort-ignore", Tl), j("sort-group", Cl);
}
let we = null, nt = null, qr = !1;
function kl() {
  if (qr)
    return;
  qr = !0;
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
function xl() {
  return we || (kl(), we = document.createElement("div"), we.className = "livue-hmr-indicator", document.body.appendChild(we), we);
}
function Vt(t, e) {
  const n = xl();
  switch (nt && (clearTimeout(nt), nt = null), t) {
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
            `, nt = setTimeout(function() {
        $r();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, nt = setTimeout(function() {
        $r();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function $r() {
  we && we.classList.remove("visible");
}
let Pe = null, fn = !0, Ni = !0, lt = !0, Ut = [];
function Il(t) {
  Pe = t;
}
async function Nl(t) {
  if (fn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), lt && Vt("updating", t.fileName), Ut.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Ni ? Ol() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), lt && Vt("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Pe.reboot(), e && (await Pl(), Ml(e)), lt && Vt("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), lt && Vt("error");
    }
  }
}
function Ol() {
  const t = /* @__PURE__ */ new Map();
  return Pe && Pe.all().forEach(function(n) {
    if (Br(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Br(r, i.name, i.state, t);
      }
  }), t;
}
function Br(t, e, n, r) {
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
function Ml(t) {
  Pe && t.forEach(function(e, n) {
    const r = Pe.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function Pl() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Vl() {
  return typeof import.meta < "u" && !1;
}
function Rl() {
  fn = !0;
}
function Hl() {
  fn = !1;
}
function jl() {
  return fn;
}
function Fl(t) {
  t.indicator !== void 0 && (lt = t.indicator), t.preserveState !== void 0 && (Ni = t.preserveState);
}
function zl(t) {
  return Ut.push(t), function() {
    const e = Ut.indexOf(t);
    e !== -1 && Ut.splice(e, 1);
  };
}
async function ql() {
  Pe && await Nl({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var je = !1, xn = [];
class $l {
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
    To(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Ll(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), ro(this), this._startObserver(), Il(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Oo());
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
    St(e, !0, !1);
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
    no(e);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(e) {
    return un(e);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    po();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return yo();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Ce;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: Xe(),
      ...No()
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
    let r = new sa(e);
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
    return ar(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return lr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), fr();
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
    }), fr();
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
      isAvailable: Vl,
      isEnabled: jl,
      enable: Rl,
      disable: Hl,
      configure: Fl,
      onUpdate: zl,
      trigger: ql
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
    if (e && !je) {
      je = !0, console.log("[LiVue] Debug mode enabled");
      var n = lr();
      n.forEach(function(r) {
        var i = ar(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        xn.push(i);
      });
    } else !e && je && (je = !1, console.log("[LiVue] Debug mode disabled"), xn.forEach(function(r) {
      r();
    }), xn = []);
    return je;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return je;
  }
}
const rr = new $l();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = Wi, document.head.appendChild(t);
}
var de = window.LiVueConfig || {};
(de.showProgressBar !== void 0 || de.progressBarColor !== void 0 || de.prefetch !== void 0 || de.prefetchOnHover !== void 0 || de.hoverDelay !== void 0 || de.cachePages !== void 0 || de.maxCacheSize !== void 0 || de.restoreScroll !== void 0) && rr.configureNavigation(de);
function Wr() {
  rr.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Wr) : queueMicrotask(Wr);
window.LiVue = rr;
export {
  rr as default
};
//# sourceMappingURL=livue.esm.js.map
