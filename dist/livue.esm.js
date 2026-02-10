import { reactive as et, toRefs as lu, effectScope as su, ref as lr, markRaw as sl, toRaw as sr, watch as He, unref as uu, hasInjectionContext as di, inject as ro, defineComponent as cu, shallowRef as ul, onMounted as cl, onUnmounted as dl, h as fi, provide as du, nextTick as Po, onBeforeUnmount as fu, onBeforeMount as pu, readonly as vu, watchEffect as mu, computed as hu, createApp as gu } from "vue";
const _u = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
let at = null;
function Pt() {
  if (at)
    return at;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return at = e.getAttribute("content"), at;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (at = decodeURIComponent(t[1]), at) : null;
}
function Eu() {
  at = null;
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
}, se = null, oo = null, ge = null, Me = null, ur = !1, Zt = 0;
function yu(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function bu(e) {
  return (-1 + e) * 100;
}
function fl() {
  if (ur) return;
  ur = !0;
  let e = document.createElement("style");
  e.id = "livue-progress-styles", e.textContent = `
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
    `, document.head.appendChild(e);
}
function Su() {
  if (ge) return;
  fl(), ge = document.createElement("div"), ge.className = "livue-progress-bar livue-progress-hidden", ge.innerHTML = '<div class="livue-progress-peg"></div>', Q.showSpinner && (Me = document.createElement("div"), Me.className = "livue-progress-spinner livue-progress-hidden", Me.innerHTML = '<div class="livue-progress-spinner-icon"></div>');
  let e = document.querySelector(Q.parent) || document.body;
  e.appendChild(ge), Me && e.appendChild(Me);
}
function wu() {
  if (!ur) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), ur = !1, fl());
}
function Cu(e) {
  Object.assign(Q, e), wu();
}
function xu() {
  Zt++, se === null && (Su(), se = 0, ge && ge.classList.remove("livue-progress-hidden"), Me && Me.classList.remove("livue-progress-hidden"), xr(Q.minimum), Q.trickle && (oo = setInterval(function() {
    pl();
  }, Q.trickleSpeed)));
}
function xr(e) {
  se !== null && (e = yu(e, Q.minimum, 1), se = e, ge && (ge.style.transform = "translate3d(" + bu(e) + "%, 0, 0)"));
}
function pl() {
  if (se === null || se >= 1) return;
  let e;
  se < 0.2 ? e = 0.1 : se < 0.5 ? e = 0.04 : se < 0.8 ? e = 0.02 : se < 0.99 ? e = 5e-3 : e = 0, xr(se + e);
}
function vl() {
  Zt = Math.max(0, Zt - 1), !(Zt > 0) && se !== null && (xr(1), clearInterval(oo), oo = null, setTimeout(function() {
    ge && ge.classList.add("livue-progress-hidden"), Me && Me.classList.add("livue-progress-hidden"), setTimeout(function() {
      se = null, ge && (ge.style.transform = "translate3d(-100%, 0, 0)");
    }, Q.speed);
  }, Q.speed));
}
function Tu() {
  Zt = 0, vl();
}
function Au() {
  return se !== null;
}
function Ou() {
  return se;
}
const nt = {
  configure: Cu,
  start: xu,
  set: xr,
  trickle: pl,
  done: vl,
  forceDone: Tu,
  isStarted: Au,
  getStatus: Ou
};
var Kt = null, pi = !1, Tt = !1, Ee = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Fe = /* @__PURE__ */ new Map(), ut = /* @__PURE__ */ new Map(), io = /* @__PURE__ */ new WeakMap(), jn = /* @__PURE__ */ new Map(), Xe = null;
function Du(e) {
  Object.assign(Ee, e), e.progressBarColor && nt.configure({ color: e.progressBarColor });
}
function ku(e) {
  Kt = e, !pi && (pi = !0, Xe = ml(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Xe },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (hl(Xe), Xe = t.state.pageKey, yn(t.state.url, !1, !0));
  }), Nu());
}
function ml() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function hl(e) {
  if (!(!Ee.restoreScroll || !e)) {
    jn.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var o = jn.get(e) || {};
        o["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, jn.set(e, o);
      }
    });
  }
}
function Iu(e) {
  if (!(!Ee.restoreScroll || !e)) {
    var t = jn.get(e);
    t && requestAnimationFrame(function() {
      window.scrollTo(t.x || 0, t.y || 0), Object.keys(t).forEach(function(n) {
        if (n.startsWith("el:")) {
          var r = n.substring(3), o = document.querySelector('[data-livue-scroll="' + r + '"]') || document.getElementById(r);
          o && (o.scrollLeft = t[n].x || 0, o.scrollTop = t[n].y || 0);
        }
      });
    });
  }
}
function Nu() {
  document.addEventListener("click", Lu, !0), Ee.prefetch && (document.addEventListener("mouseenter", Ru, !0), document.addEventListener("mouseleave", Vu, !0), document.addEventListener("mousedown", Mu, !0), document.addEventListener("focus", Fu, !0));
}
function Lu(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t && !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) && e.button === 0) {
      var n = t.getAttribute("href");
      if (n) {
        try {
          var r = new URL(n, window.location.origin);
          if (r.origin !== window.location.origin)
            return;
        } catch {
          return;
        }
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), yn(n, !0, !1));
      }
    }
  }
}
function Pu(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function Ru(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !Ee.prefetchOnHover)) {
      var n = Pu(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var o = setTimeout(function() {
            Tr(r);
          }, Ee.hoverDelay);
          io.set(t, o);
        }
      }
    }
  }
}
function Vu(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = io.get(t);
      n && (clearTimeout(n), io.delete(t));
    }
  }
}
function Mu(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Tr(n);
    }
  }
}
function Fu(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !Ee.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Tr(n);
    }
  }
}
function Tr(e) {
  var t = new URL(e, location.origin).href;
  if (ut.has(t))
    return ut.get(t);
  if (Fe.has(t))
    return Promise.resolve(Fe.get(t).html);
  var n = fetch(t, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return ut.delete(t), r.ok ? r.text().then(function(o) {
      return Ee.cachePages && gl(t, o), o;
    }) : null;
  }).catch(function(r) {
    return ut.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return ut.set(t, n), n;
}
function gl(e, t) {
  for (var n = new DOMParser(), r = n.parseFromString(t, "text/html"), o = r.querySelector("title"); Fe.size >= Ee.maxCacheSize; ) {
    var i = Fe.keys().next().value;
    Fe.delete(i);
  }
  Fe.set(e, {
    html: t,
    title: o ? o.textContent : "",
    timestamp: Date.now()
  });
}
function Bu() {
  Fe.clear();
}
function Ro(e) {
  Tt || !e || !e.url || (e.navigate ? yn(e.url, !0, !1) : (Tt = !0, window.location.href = e.url));
}
async function yn(e, t, n) {
  if (!Tt) {
    if (!Kt) {
      window.location.href = e;
      return;
    }
    var r = new URL(e, location.origin).href, o = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: Fe.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(o)) {
      Tt = !0, n || hl(Xe), Ee.showProgressBar && nt.start();
      try {
        var i, a = Fe.get(r);
        if (a)
          i = a.html;
        else if (ut.has(r))
          i = await ut.get(r);
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
          i = await l.text(), Ee.cachePages && gl(r, i);
        }
        var s = new DOMParser(), u = s.parseFromString(i, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(_) {
              typeof _ == "function" && _(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = Uu(), v = /* @__PURE__ */ new Set();
        c.forEach(function(_) {
          _.livueIds.forEach(function(C) {
            v.add(C);
          });
        }), Kt._stopObserver(), Kt.destroyExcept(v), c.forEach(function(_) {
          _.element.parentNode && _.element.parentNode.removeChild(_.element);
        });
        var m = u.querySelector("title");
        m && (document.title = m.textContent), document.body.innerHTML = u.body.innerHTML, zu(c);
        var f = u.querySelector('meta[name="csrf-token"]'), g = document.querySelector('meta[name="csrf-token"]');
        if (f && g && (g.setAttribute("content", f.getAttribute("content")), Eu()), Hu(u), ju(u), t && (Xe = ml(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Xe },
          "",
          r
        )), qu(u), Kt.rebootPreserving(), n)
          Iu(Xe);
        else if (location.hash) {
          var p = document.querySelector(location.hash);
          p ? p.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (_) {
        console.error("[LiVue] Navigation failed:", _), window.location.href = e;
      } finally {
        Tt = !1, Ee.showProgressBar && nt.done();
      }
    }
  }
}
function Uu() {
  var e = /* @__PURE__ */ new Map(), t = document.querySelectorAll("[data-livue-persist]");
  return t.forEach(function(n) {
    var r = n.dataset.livuePersist;
    if (r) {
      var o = [], i = n.querySelectorAll("[data-livue-id]");
      i.forEach(function(s) {
        o.push(s.dataset.livueId);
      }), n.dataset.livueId && o.push(n.dataset.livueId);
      var a = {}, l = n.querySelectorAll("[data-livue-scroll]");
      l.forEach(function(s) {
        var u = s.dataset.livueScroll;
        u && (a[u] = {
          scrollTop: s.scrollTop,
          scrollLeft: s.scrollLeft
        });
      }), e.set(r, {
        element: n,
        livueIds: o,
        scrollData: a
      });
    }
  }), e;
}
function zu(e) {
  e.size !== 0 && e.forEach(function(t, n) {
    var r = document.querySelector('[data-livue-persist="' + n + '"]');
    r && (r.parentNode.replaceChild(t.element, r), t.scrollData && requestAnimationFrame(function() {
      Object.keys(t.scrollData).forEach(function(o) {
        var i = t.element.querySelector('[data-livue-scroll="' + o + '"]');
        i && (i.scrollTop = t.scrollData[o].scrollTop, i.scrollLeft = t.scrollData[o].scrollLeft);
      });
    }));
  });
}
function Hu(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function ju(e) {
  var t = document.querySelectorAll("script[data-navigate-track]"), n = e.querySelectorAll("script[data-navigate-track]"), r = {};
  t.forEach(function(i) {
    var a = i.getAttribute("src");
    a && (r[a.split("?")[0]] = a);
  });
  var o = !1;
  n.forEach(function(i) {
    var a = i.getAttribute("src");
    if (a) {
      var l = a.split("?")[0];
      r[l] && r[l] !== a && (o = !0);
    }
  }), o && window.location.reload();
}
function qu(e) {
  var t = document.body.querySelectorAll("script");
  t.forEach(function(n) {
    if (n.parentNode) {
      if (n.hasAttribute("data-navigate-once")) {
        if (n.dataset.navigateRan)
          return;
        n.dataset.navigateRan = "true";
      }
      if (n.type !== "application/livue-setup" && !n.hasAttribute("data-livue-loader") && n.type !== "module") {
        var r = n.getAttribute("src") || "";
        if (!r.includes("livue") && !(r.includes("@vite") || r.includes("/@fs/") || r.includes("node_modules")) && !(r.includes("/resources/js/") || r.includes("/build/assets/"))) {
          var o = document.createElement("script");
          Array.from(n.attributes).forEach(function(i) {
            o.setAttribute(i.name, i.value);
          }), n.src || (o.textContent = n.textContent), n.parentNode.replaceChild(o, n);
        }
      }
    }
  });
}
function $u() {
  return Tt;
}
var Et = /* @__PURE__ */ new Map(), Ku = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Re(e, t) {
  return typeof e != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", e), function() {
  }) : typeof t != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (Et.has(e) || Et.set(e, /* @__PURE__ */ new Set()), Et.get(e).add(t), function() {
    var n = Et.get(e);
    n && (n.delete(t), n.size === 0 && Et.delete(e));
  });
}
function xe(e, t) {
  var n = Et.get(e);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(t);
    } catch (o) {
      console.error('[LiVue Hooks] Error in "' + e + '" callback:', o);
    }
  });
}
function _l() {
  var e = [];
  return {
    /**
     * Register a cleanup function.
     * @param {Function} fn - Cleanup function
     */
    cleanup: function(t) {
      typeof t == "function" && e.push(t);
    },
    /**
     * Run all registered cleanup functions.
     */
    runCleanups: function() {
      e.forEach(function(t) {
        try {
          t();
        } catch (n) {
          console.error("[LiVue Hooks] Error in cleanup:", n);
        }
      }), e = [];
    }
  };
}
function vi() {
  return Ku.slice();
}
var ao = [], lo = [], fn = !1;
function Wu(e) {
  return e.isolate ? Yu(e) : new Promise(function(t, n) {
    ao.push({
      payload: e,
      resolve: t,
      reject: n
    }), fn || (fn = !0, queueMicrotask(El));
  });
}
function Gu(e) {
  return new Promise(function(t, n) {
    lo.push({
      payload: e,
      resolve: t,
      reject: n
    }), fn || (fn = !0, queueMicrotask(El));
  });
}
async function El() {
  var e = ao, t = lo;
  if (ao = [], lo = [], fn = !1, !(e.length === 0 && t.length === 0)) {
    nt.start();
    var n = yl(), r = Pt(), o = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (o["X-CSRF-TOKEN"] = r);
    var i = e.map(function(p) {
      return p.payload;
    }), a = t.map(function(p) {
      return p.payload;
    }), l = {};
    i.length > 0 && (l.updates = i), a.length > 0 && (l.lazyLoads = a), xe("request.started", {
      url: n,
      updates: i,
      lazyLoads: a,
      updateCount: e.length,
      lazyCount: t.length
    });
    try {
      var s = await fetch(n, {
        method: "POST",
        headers: o,
        body: JSON.stringify(l),
        credentials: "same-origin"
      }), u = await s.json();
      if (!s.ok) {
        var d = new Error(u.error || "Request failed");
        d.status = s.status, d.data = u;
        for (var c = 0; c < e.length; c++)
          e[c].reject(d);
        for (var c = 0; c < t.length; c++)
          t[c].reject(d);
        return;
      }
      for (var v = u.responses || [], m = u.lazyResponses || [], c = 0; c < v.length; c++)
        if (v[c] && v[c].redirect) {
          Ro(v[c].redirect);
          return;
        }
      for (var c = 0; c < e.length; c++) {
        var f = v[c];
        if (!f) {
          e[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (f.error) {
          var g = new Error(f.error);
          g.status = f.status || 500, g.data = f, e[c].reject(g);
        } else if (f.errors) {
          var g = new Error("Validation failed");
          g.status = 422, g.data = f, e[c].reject(g);
        } else
          e[c].resolve(f);
      }
      for (var c = 0; c < t.length; c++) {
        var f = m[c];
        if (!f) {
          t[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (f.error) {
          var g = new Error(f.error);
          g.status = f.status || 500, g.data = f, t[c].reject(g);
        } else
          t[c].resolve(f);
      }
      xe("request.finished", {
        url: n,
        success: !0,
        responses: v,
        lazyResponses: m,
        updateCount: e.length,
        lazyCount: t.length
      });
    } catch (p) {
      for (var c = 0; c < e.length; c++)
        e[c].reject(p);
      for (var c = 0; c < t.length; c++)
        t[c].reject(p);
      xe("request.finished", {
        url: n,
        success: !1,
        error: p,
        updateCount: e.length,
        lazyCount: t.length
      });
    } finally {
      nt.done();
    }
  }
}
async function Yu(e) {
  nt.start();
  var t = yl(), n = Pt(), r = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  n && (r["X-CSRF-TOKEN"] = n);
  var o = {
    snapshot: e.snapshot,
    diffs: e.diffs,
    method: e.method,
    params: e.params
  };
  try {
    var i = await fetch(t, {
      method: "POST",
      headers: r,
      body: JSON.stringify({ updates: [o] }),
      credentials: "same-origin"
    }), a = await i.json();
    if (!i.ok) {
      var l = new Error(a.error || "Request failed");
      throw l.status = i.status, l.data = a, l;
    }
    var s = (a.responses || [])[0];
    if (!s)
      throw new Error("No response for isolated component update");
    if (s.redirect)
      return Ro(s.redirect), new Promise(function() {
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
    nt.done();
  }
}
function yl() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function mi(e, t, n, r, o) {
  return Wu({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: o || !1
  });
}
function so(e) {
  return et(Object.assign({}, e));
}
function Ju(e, t) {
  let n;
  for (n in t) {
    let r = JSON.stringify(e[n]), o = JSON.stringify(t[n]);
    r !== o && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function bl(e) {
  return JSON.parse(JSON.stringify(e));
}
function Xu(e) {
  return lu(e);
}
function Lr(e, t) {
  if (!t || typeof t != "string")
    return;
  let n = t.split("."), r = e;
  for (let o = 0; o < n.length; o++) {
    if (r == null)
      return;
    r = r[n[o]];
  }
  return r;
}
function On(e, t, n) {
  if (!t || typeof t != "string")
    return;
  let r = t.split(".");
  if (r.length === 1) {
    e[r[0]] = n;
    return;
  }
  let o = r[0], i = e[o], a = JSON.parse(JSON.stringify(i ?? {})), l = a;
  for (let u = 1; u < r.length - 1; u++) {
    let d = r[u];
    (l[d] === null || l[d] === void 0) && (l[d] = {}), l = l[d];
  }
  let s = r[r.length - 1];
  l[s] = n, e[o] = a;
}
let uo = null, Sl = /* @__PURE__ */ new Map();
function Zu() {
  return et({});
}
function Ae(e, t) {
  co(e);
  for (let n in t)
    e[n] = t[n];
}
function co(e) {
  for (let t in e)
    delete e[t];
}
function Qu(e) {
  uo = e;
}
function Ft(e, t, n, r) {
  r = r || {};
  let o = !1;
  return xe("error.occurred", {
    error: e,
    componentName: t,
    componentId: n,
    context: r,
    preventDefault: function() {
      o = !0;
    }
  }), o ? !0 : (uo ? uo(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function ec(e, t) {
  typeof t == "function" && Sl.set(e, t);
}
function fo(e) {
  Sl.delete(e);
}
var Ge = null, tc = "livue-devtools-styles", nc = `
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
function rc() {
  Ge || (Ge = document.createElement("style"), Ge.id = tc, Ge.textContent = nc, document.head.appendChild(Ge));
}
function oc() {
  Ge && (Ge.remove(), Ge = null);
}
var Vo = [];
function $(e, t, n) {
  Vo.push({
    name: e,
    directive: t
  });
}
function ic() {
  return Vo;
}
function ac() {
  return {
    plugins: [],
    stores: [],
    components: [],
    directives: Vo.map(function(e) {
      return { name: e.name, filters: null };
    })
  };
}
const Ue = /* @__PURE__ */ new Map(), je = /* @__PURE__ */ new Map();
let hi = !1;
function mt() {
  return typeof window < "u" && window.Echo;
}
function lc(e, t) {
  if (!mt())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = t + ":" + e;
  if (Ue.has(n))
    return Ue.get(n);
  let r;
  switch (t) {
    case "private":
      r = window.Echo.private(e);
      break;
    case "presence":
      r = window.Echo.join(e);
      break;
    default:
      r = window.Echo.channel(e);
      break;
  }
  return Ue.set(n, r), r;
}
function wl(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!mt())
    return hi || (hi = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let o = 0; o < t.length; o++) {
    const i = t[o], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: c } = i, v = lc(a, l);
    if (!v) continue;
    const m = l + ":" + a + ":" + s + ":" + e;
    if (je.has(m)) {
      r.push(m);
      continue;
    }
    const f = function(g) {
      try {
        n(u, g);
      } catch (p) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', p);
      }
    };
    if (l === "presence" && d)
      sc(v, s, f);
    else {
      const g = c ? "." + s : s;
      v.listen(g, f);
    }
    je.set(m, {
      channel: v,
      channelKey: l + ":" + a,
      event: s,
      handler: f,
      isPresenceEvent: d,
      isCustomEvent: c
    }), r.push(m);
  }
  return function() {
    for (let o = 0; o < r.length; o++)
      Cl(r[o]);
  };
}
function sc(e, t, n) {
  switch (t) {
    case "here":
      e.here(n);
      break;
    case "joining":
      e.joining(n);
      break;
    case "leaving":
      e.leaving(n);
      break;
  }
}
function Cl(e) {
  const t = je.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    je.delete(e), uc(t.channelKey);
  }
}
function gi(e) {
  const t = ":" + e, n = [];
  je.forEach(function(r, o) {
    o.endsWith(t) && n.push(o);
  });
  for (let r = 0; r < n.length; r++)
    Cl(n[r]);
}
function uc(e) {
  let t = !1;
  if (je.forEach(function(r) {
    r.channelKey === e && (t = !0);
  }), t) return;
  if (Ue.get(e) && mt()) {
    const r = e.split(":"), o = r[0], i = r.slice(1).join(":");
    try {
      o === "presence" ? window.Echo.leave(i) : o === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
    } catch {
    }
  }
  Ue.delete(e);
}
function _i() {
  je.clear(), Ue.forEach(function(e, t) {
    if (mt()) {
      const n = t.split(":"), r = n[0], o = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(o) : r === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
      } catch {
      }
    }
  }), Ue.clear();
}
function cc() {
  return {
    echoAvailable: mt(),
    channels: Array.from(Ue.keys()),
    subscriptions: Array.from(je.keys())
  };
}
function dc() {
  var e = [], t = [];
  return Ue.forEach(function(n, r) {
    var o = r.split(":");
    e.push({
      key: r,
      type: o[0],
      name: o.slice(1).join(":")
    });
  }), je.forEach(function(n, r) {
    var o = r.split(":");
    t.push({
      key: r,
      channelType: o[0],
      channelName: o[1],
      event: o[2],
      componentId: o[3],
      isPresenceEvent: n.isPresenceEvent,
      isCustomEvent: n.isCustomEvent
    });
  }), {
    available: mt(),
    channels: e,
    subscriptions: t
  };
}
var fc = 100, pc = 200, vc = 50, L = {
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
}, Ve = [], Ot = !1, po = /* @__PURE__ */ new Set();
function Oe() {
  po.forEach(function(e) {
    try {
      e();
    } catch (t) {
      console.error("[LiVue DevTools] Listener error:", t);
    }
  });
}
var mc = 0;
function hc() {
  return "req-" + ++mc + "-" + Date.now();
}
function gc(e) {
  var t = new Date(e), n = t.getHours().toString().padStart(2, "0"), r = t.getMinutes().toString().padStart(2, "0"), o = t.getSeconds().toString().padStart(2, "0"), i = t.getMilliseconds().toString().padStart(3, "0");
  return n + ":" + r + ":" + o + "." + i;
}
function xl() {
  Ot || (Ot = !0, Ve.push(Re("component.init", function(e) {
    var t = e.component;
    L.components.set(t.id, {
      id: t.id,
      name: t.name,
      isChild: e.isChild,
      isIsland: e.el && e.el.hasAttribute("data-livue-island"),
      initTime: Date.now(),
      state: t.state,
      livue: t.livue,
      el: e.el
    }), Oe();
  })), Ve.push(Re("component.destroy", function(e) {
    var t = e.component;
    L.components.delete(t.id), Oe();
  })), Ve.push(Re("request.started", function(e) {
    var t = hc(), n = {
      id: t,
      url: e.url,
      startTime: Date.now(),
      endTime: null,
      duration: null,
      status: "pending",
      updateCount: e.updateCount || 0,
      lazyCount: e.lazyCount || 0,
      updates: e.updates || [],
      lazyLoads: e.lazyLoads || [],
      responses: null,
      error: null
    };
    L.pendingRequests.set(e.url + "-" + t, n), L.requests.unshift(n), L.requests.length > fc && L.requests.pop(), L.perf.totalRequests++, Oe();
  })), Ve.push(Re("request.finished", function(e) {
    var t = null;
    if (L.pendingRequests.forEach(function(r, o) {
      !t && r.url === e.url && r.status === "pending" && (t = { req: r, key: o });
    }), t) {
      var n = t.req;
      n.endTime = Date.now(), n.duration = n.endTime - n.startTime, n.status = e.success ? "success" : "error", n.responses = e.responses, n.lazyResponses = e.lazyResponses, n.error = e.error, L.pendingRequests.delete(t.key), e.success ? L.perf.successfulRequests++ : L.perf.failedRequests++, L.perf.totalRequestTime += n.duration, L.perf.avgRequestTime = L.perf.totalRequestTime / L.perf.totalRequests, n.duration < L.perf.minRequestTime && (L.perf.minRequestTime = n.duration), n.duration > L.perf.maxRequestTime && (L.perf.maxRequestTime = n.duration), Oe();
    }
  })), Ve.push(Re("template.updating", function(e) {
    var t = e.component;
    L.pendingSwaps.set(t.id, Date.now());
  })), Ve.push(Re("template.updated", function(e) {
    var t = e.component, n = L.pendingSwaps.get(t.id);
    if (n) {
      var r = Date.now() - n;
      L.pendingSwaps.delete(t.id), L.perf.totalTemplateSwaps++, L.perf.totalTemplateSwapTime += r, L.perf.avgTemplateSwapTime = L.perf.totalTemplateSwapTime / L.perf.totalTemplateSwaps, Oe();
    }
  })), Ve.push(Re("error.occurred", function(e) {
    var t = {
      time: Date.now(),
      error: e.error,
      componentName: e.componentName,
      componentId: e.componentId,
      context: e.context
    };
    L.errors.unshift(t), L.errors.length > vc && L.errors.pop(), Oe();
  })));
}
function Tl() {
  Ot && (Ot = !1, Ve.forEach(function(e) {
    e();
  }), Ve = []);
}
function _c() {
  return Ot;
}
function Ec(e) {
  if (Ot) {
    var t = {
      time: Date.now(),
      name: e.name,
      data: e.data,
      mode: e.mode,
      source: e.source,
      sourceId: e.sourceId,
      target: e.target
    };
    L.events.unshift(t), L.events.length > pc && L.events.pop(), Oe();
  }
}
function yc() {
  return Array.from(L.components.values());
}
function Al() {
  return L.requests;
}
function Ol() {
  return L.events;
}
function Dl() {
  return Object.assign({}, L.perf);
}
function kl() {
  L.requests = [], L.pendingRequests.clear(), Oe();
}
function Il() {
  L.events = [], Oe();
}
function bc() {
  L.components.clear(), L.requests = [], L.pendingRequests.clear(), L.events = [], L.errors = [], L.perf = {
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
  }, L.pendingSwaps.clear(), Oe();
}
function Sc(e) {
  return po.add(e), function() {
    po.delete(e);
  };
}
function Nl(e) {
  return gc(e);
}
function wc(e) {
  var t = L.components.get(e);
  if (!t || !t.livue || !t.livue._getDevToolsInfo)
    return null;
  try {
    return t.livue._getDevToolsInfo();
  } catch (n) {
    return console.error("[LiVue DevTools] Error getting component info:", n), null;
  }
}
function Cc() {
  return ac();
}
function xc() {
  return dc();
}
var vo = null, Ei = null, mo = null;
function Tc(e) {
  vo = e;
}
function Ac(e) {
  mo = e;
}
function Ll() {
  if (!vo)
    return [];
  var e = vo.all(), t = [];
  return e.forEach(function(n) {
    var r = Pl(n, !1);
    t.push(r);
  }), t;
}
function Pl(e, t) {
  var n = t ? e.livue : e._rootLivue, r = e.state, o = e.name, i = t ? e.id : e.componentId, a = !t && e.el && e.el.hasAttribute("data-livue-island"), l = {
    id: i,
    name: o,
    isChild: t,
    isIsland: a,
    loading: n ? n.loading : !1,
    dirty: n ? n.isDirty() : !1,
    errorCount: n && n.errors ? Object.keys(n.errors).length : 0,
    state: r,
    livue: n,
    children: []
  };
  if (!t && e._childRegistry)
    for (var s in e._childRegistry) {
      var u = e._childRegistry[s];
      l.children.push(Pl(u, !0));
    }
  return l;
}
function Rl(e) {
  var t = Ll();
  if (e.innerHTML = "", t.length === 0) {
    e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E6;</div>No components found</div>';
    return;
  }
  t.forEach(function(n) {
    e.appendChild(Vl(n));
  });
}
function Vl(e, t) {
  var n = document.createElement("div");
  n.className = "livue-devtools__node", n.dataset.id = e.id;
  var r = e.children && e.children.length > 0, o = document.createElement("div");
  o.className = "livue-devtools__node-header", e.id === Ei && o.classList.add("livue-devtools__node-header--selected");
  var i = document.createElement("span");
  i.className = "livue-devtools__node-toggle", i.textContent = r ? "▼" : "", o.appendChild(i);
  var a = document.createElement("span");
  a.className = "livue-devtools__node-icon", e.isIsland ? (a.classList.add("livue-devtools__node-icon--island"), a.textContent = "◆") : e.isChild ? (a.classList.add("livue-devtools__node-icon--child"), a.textContent = "○") : (a.classList.add("livue-devtools__node-icon--root"), a.textContent = "■"), o.appendChild(a);
  var l = document.createElement("span");
  l.className = "livue-devtools__node-name", l.textContent = "<" + e.name + ">", o.appendChild(l);
  var s = document.createElement("span");
  s.className = "livue-devtools__node-id", s.textContent = "#" + e.id.substring(0, 8), s.title = e.id, o.appendChild(s);
  var u = document.createElement("span");
  if (u.className = "livue-devtools__node-badges", e.loading) {
    var d = document.createElement("span");
    d.className = "livue-devtools__badge livue-devtools__badge--loading", d.textContent = "loading", u.appendChild(d);
  }
  if (e.dirty) {
    var c = document.createElement("span");
    c.className = "livue-devtools__badge livue-devtools__badge--dirty", c.textContent = "dirty", u.appendChild(c);
  }
  if (e.errorCount > 0) {
    var v = document.createElement("span");
    v.className = "livue-devtools__badge livue-devtools__badge--error", v.textContent = e.errorCount + " error" + (e.errorCount > 1 ? "s" : ""), u.appendChild(v);
  }
  if (o.appendChild(u), o.addEventListener("click", function(f) {
    if (f.target === i && r) {
      var g = n.querySelector(".livue-devtools__node-children");
      if (g) {
        var p = g.style.display !== "none";
        g.style.display = p ? "none" : "block", i.textContent = p ? "▶" : "▼";
      }
      return;
    }
    Ei = e.id;
    var _ = document.querySelectorAll(".livue-devtools__node-header");
    _.forEach(function(C) {
      C.classList.remove("livue-devtools__node-header--selected");
    }), o.classList.add("livue-devtools__node-header--selected"), mo && mo(e);
  }), n.appendChild(o), r) {
    var m = document.createElement("div");
    m.className = "livue-devtools__node-children", e.children.forEach(function(f) {
      m.appendChild(Vl(f));
    }), n.appendChild(m);
  }
  return n;
}
var ct = null, Bt = "state", Be = /* @__PURE__ */ new Set(), pn = null;
function Oc(e) {
  ct = e;
}
function Rt(e) {
  if (pn = e, e.innerHTML = "", !ct) {
    e.innerHTML = '<div class="livue-devtools__state-empty">Select a component to inspect its state</div>';
    return;
  }
  var t = ct.state, n = ct.livue, r = n ? n.dirtyFields : /* @__PURE__ */ new Set(), o = wc(ct.id), i = document.createElement("div");
  i.className = "livue-devtools__state-title", i.textContent = "<" + ct.name + ">", e.appendChild(i);
  var a = document.createElement("div");
  a.style.cssText = "display: flex; gap: 4px; margin-bottom: 8px;", ["state", "diff", "info"].forEach(function(l) {
    var s = document.createElement("button");
    s.style.cssText = "padding: 2px 8px; font-size: 10px; background: " + (Bt === l ? "#007acc" : "#3c3c3c") + "; border: none; color: #fff; border-radius: 3px; cursor: pointer;", s.textContent = l.charAt(0).toUpperCase() + l.slice(1), s.addEventListener("click", function() {
      Bt = l, Rt(e);
    }), a.appendChild(s);
  }), e.appendChild(a), Bt === "state" ? Dc(e, t, r, n) : Bt === "diff" ? kc(e, o) : Bt === "info" && Ic(e, o);
}
function Dc(e, t, n, r) {
  if (t && typeof t == "object") {
    var o = Object.keys(t);
    if (o.length === 0) {
      var i = document.createElement("div");
      i.className = "livue-devtools__state-empty", i.textContent = "No state properties", e.appendChild(i);
    } else
      o.forEach(function(l) {
        var s = n.has(l);
        e.appendChild(Mo(l, t[l], s, l));
      });
  }
  if (r && r.errors && Object.keys(r.errors).length > 0) {
    var a = document.createElement("div");
    a.className = "livue-devtools__state-title", a.style.marginTop = "12px", a.textContent = "Validation Errors", e.appendChild(a), Object.keys(r.errors).forEach(function(l) {
      var s = document.createElement("div");
      s.className = "livue-devtools__prop";
      var u = document.createElement("span");
      u.className = "livue-devtools__prop-key", u.style.color = "#f48771", u.textContent = l, s.appendChild(u);
      var d = document.createElement("span");
      d.className = "livue-devtools__prop-colon", d.textContent = ": ", s.appendChild(d);
      var c = document.createElement("span");
      c.className = "livue-devtools__prop-value", c.style.color = "#f48771", c.textContent = r.errors[l].join(", "), s.appendChild(c), e.appendChild(s);
    });
  }
}
function kc(e, t) {
  if (!t) {
    e.innerHTML += '<div class="livue-devtools__state-empty">No diff info available</div>';
    return;
  }
  var n = t.dirtyFields || [];
  if (n.length === 0) {
    var r = document.createElement("div");
    r.style.cssText = "color: #6a9955; padding: 8px; text-align: center;", r.innerHTML = "&#10003; State is in sync with server", e.appendChild(r);
    return;
  }
  var o = document.createElement("div");
  o.style.cssText = "color: #dcdcaa; margin-bottom: 8px; font-size: 11px;", o.textContent = n.length + " unsync'd field(s):", e.appendChild(o), n.forEach(function(i) {
    var a = t.serverState[i], l = t.clientState[i], s = document.createElement("div");
    s.style.cssText = "margin-bottom: 8px; padding: 6px; background: #2a2d2e; border-radius: 3px;";
    var u = document.createElement("div");
    u.style.cssText = "color: #dcdcaa; font-weight: 600; margin-bottom: 4px;", u.textContent = i, s.appendChild(u);
    var d = document.createElement("div");
    d.style.cssText = "font-size: 11px; color: #858585;", d.innerHTML = '<span style="color: #6a9955;">Server:</span> <span style="color: #ce9178;">' + JSON.stringify(a) + "</span>", s.appendChild(d);
    var c = document.createElement("div");
    c.style.cssText = "font-size: 11px; color: #858585;", c.innerHTML = '<span style="color: #9cdcfe;">Client:</span> <span style="color: #ce9178;">' + JSON.stringify(l) + "</span>", s.appendChild(c), e.appendChild(s);
  });
}
function Ic(e, t) {
  if (!t) {
    e.innerHTML += '<div class="livue-devtools__state-empty">No info available</div>';
    return;
  }
  var n = t.memo || {}, r = [
    { label: "Name", value: n.name || "-" },
    { label: "Isolated", value: n.isolate ? "Yes" : "No" },
    { label: "URL Params", value: n.urlParams ? Object.keys(n.urlParams).join(", ") : "-" },
    { label: "Tab Sync", value: n.tabSync ? "Enabled" : "-" },
    { label: "Upload Props", value: n.uploadProps.length > 0 ? n.uploadProps.join(", ") : "-" },
    { label: "Vue Methods", value: n.vueMethods.length > 0 ? n.vueMethods.join(", ") : "-" },
    { label: "Confirm Methods", value: n.confirmMethods.length > 0 ? n.confirmMethods.join(", ") : "-" },
    { label: "Composables", value: n.composableNames.length > 0 ? n.composableNames.join(", ") : "-" }
  ];
  r.forEach(function(u) {
    var d = document.createElement("div");
    d.className = "livue-devtools__prop";
    var c = document.createElement("span");
    c.className = "livue-devtools__prop-key", c.textContent = u.label, d.appendChild(c);
    var v = document.createElement("span");
    v.className = "livue-devtools__prop-colon", v.textContent = ": ", d.appendChild(v);
    var m = document.createElement("span");
    m.className = "livue-devtools__prop-value", m.textContent = u.value, d.appendChild(m), e.appendChild(d);
  });
  var o = document.createElement("div");
  o.className = "livue-devtools__state-title", o.style.marginTop = "12px", o.textContent = "Status", e.appendChild(o);
  var i = [
    { label: "Uploading", value: t.uploading, color: t.uploading ? "#dcdcaa" : "#858585" },
    { label: "Upload Progress", value: t.uploadProgress + "%", show: t.uploading },
    { label: "Streaming", value: t.streaming, color: t.streaming ? "#9cdcfe" : "#858585" },
    { label: "Streaming Method", value: t.streamingMethod || "-", show: t.streaming },
    { label: "Has Error", value: t.errorState.hasError, color: t.errorState.hasError ? "#f48771" : "#858585" }
  ];
  i.forEach(function(u) {
    if (u.show !== !1) {
      var d = document.createElement("div");
      d.className = "livue-devtools__prop";
      var c = document.createElement("span");
      c.className = "livue-devtools__prop-key", c.textContent = u.label, d.appendChild(c);
      var v = document.createElement("span");
      v.className = "livue-devtools__prop-colon", v.textContent = ": ", d.appendChild(v);
      var m = document.createElement("span");
      m.className = "livue-devtools__prop-value", m.style.color = u.color || "#d4d4d4", m.textContent = String(u.value), d.appendChild(m), e.appendChild(d);
    }
  });
  var a = t.composables || {}, l = Object.keys(a);
  if (l.length > 0) {
    var s = document.createElement("div");
    s.className = "livue-devtools__state-title", s.style.marginTop = "12px", s.textContent = "Composables", e.appendChild(s), l.forEach(function(u) {
      var d = a[u], c = document.createElement("div");
      c.style.cssText = "color: #c586c0; font-weight: 600; margin-top: 8px; margin-bottom: 4px;", c.textContent = u + " (livue." + u + ")", e.appendChild(c);
      var v = Object.keys(d.data || {});
      if (v.length > 0) {
        var m = document.createElement("div");
        m.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px;", m.textContent = "Data:", e.appendChild(m), v.forEach(function(p) {
          var _ = document.createElement("div");
          _.style.marginLeft = "16px", _.className = "livue-devtools__prop";
          var C = document.createElement("span");
          C.className = "livue-devtools__prop-key", C.textContent = p, _.appendChild(C);
          var S = document.createElement("span");
          S.className = "livue-devtools__prop-colon", S.textContent = ": ", _.appendChild(S), _.appendChild(Ml(d.data[p], "composable." + u + "." + p)), e.appendChild(_);
        });
      }
      if (d.actions && d.actions.length > 0) {
        var f = document.createElement("div");
        f.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px; margin-top: 4px;", f.textContent = "Actions:", e.appendChild(f);
        var g = document.createElement("div");
        g.style.cssText = "margin-left: 16px; color: #dcdcaa;", g.textContent = d.actions.join(", "), e.appendChild(g);
      }
    });
  }
}
function Mo(e, t, n, r) {
  var o = document.createElement("div");
  o.className = "livue-devtools__prop";
  var i = document.createElement("span");
  i.className = "livue-devtools__prop-key", n && i.classList.add("livue-devtools__prop-key--dirty"), i.textContent = e, o.appendChild(i);
  var a = document.createElement("span");
  return a.className = "livue-devtools__prop-colon", a.textContent = ": ", o.appendChild(a), o.appendChild(Ml(t, r)), o;
}
function Ml(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value", e === null)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "null";
  else if (e === void 0)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "undefined";
  else if (typeof e == "string")
    n.classList.add("livue-devtools__prop-value--string"), n.textContent = '"' + Pc(e, 50) + '"', n.title = e;
  else if (typeof e == "number")
    n.classList.add("livue-devtools__prop-value--number"), n.textContent = String(e);
  else if (typeof e == "boolean")
    n.classList.add("livue-devtools__prop-value--boolean"), n.textContent = String(e);
  else {
    if (Array.isArray(e))
      return Nc(e, t);
    if (typeof e == "object")
      return Lc(e, t);
    typeof e == "function" ? (n.classList.add("livue-devtools__prop-value--null"), n.textContent = "function()") : n.textContent = String(e);
  }
  return n;
}
function Nc(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value livue-devtools__prop-value--array", e.length === 0)
    return n.textContent = "[]", n;
  var r = Be.has(t), o = document.createElement("span");
  o.className = "livue-devtools__object-toggle", o.textContent = r ? "▼ " : "▶ ", o.addEventListener("click", function() {
    Be.has(t) ? Be.delete(t) : Be.add(t), pn && Rt(pn);
  }), n.appendChild(o);
  var i = document.createElement("span");
  if (i.textContent = "Array(" + e.length + ")", n.appendChild(i), r) {
    var a = document.createElement("div");
    a.className = "livue-devtools__object", e.forEach(function(l, s) {
      a.appendChild(Mo(String(s), l, !1, t + "." + s));
    }), n.appendChild(a);
  }
  return n;
}
function Lc(e, t) {
  var n = document.createElement("span");
  n.className = "livue-devtools__prop-value livue-devtools__prop-value--object";
  var r = Object.keys(e);
  if (r.length === 0)
    return n.textContent = "{}", n;
  var o = Be.has(t), i = document.createElement("span");
  i.className = "livue-devtools__object-toggle", i.textContent = o ? "▼ " : "▶ ", i.addEventListener("click", function() {
    Be.has(t) ? Be.delete(t) : Be.add(t), pn && Rt(pn);
  }), n.appendChild(i);
  var a = document.createElement("span");
  if (a.textContent = "{...} " + r.length + " key" + (r.length > 1 ? "s" : ""), n.appendChild(a), o) {
    var l = document.createElement("div");
    l.className = "livue-devtools__object", r.forEach(function(s) {
      l.appendChild(Mo(s, e[s], !1, t + "." + s));
    }), n.appendChild(l);
  }
  return n;
}
function Pc(e, t) {
  return e.length <= t ? e : e.substring(0, t - 3) + "...";
}
function Rc() {
  ct = null, Be.clear();
}
var yt = /* @__PURE__ */ new Set();
function Fl(e) {
  e.innerHTML = "";
  var t = Al(), n = document.createElement("div");
  n.className = "livue-devtools__timeline-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__timeline-title", r.textContent = "Request Timeline (" + t.length + ")", n.appendChild(r);
  var o = document.createElement("button");
  o.className = "livue-devtools__btn", o.textContent = "Clear", o.addEventListener("click", function() {
    kl(), yt.clear(), Fl(e);
  }), n.appendChild(o), e.appendChild(n);
  var i = document.createElement("div");
  i.className = "livue-devtools__timeline-list", t.length === 0 ? i.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E1;</div>No requests yet</div>' : t.forEach(function(a) {
    i.appendChild(Vc(a));
  }), e.appendChild(i);
}
function Vc(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__request", yt.has(e.id) && t.classList.add("livue-devtools__request--expanded");
  var n = document.createElement("div");
  n.className = "livue-devtools__request-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__request-toggle", r.textContent = yt.has(e.id) ? "▼" : "▶", n.appendChild(r);
  var o = document.createElement("span");
  o.className = "livue-devtools__request-method", o.textContent = "POST", n.appendChild(o);
  var i = document.createElement("span");
  i.className = "livue-devtools__request-url", i.textContent = e.url, n.appendChild(i);
  var a = document.createElement("span");
  if (a.className = "livue-devtools__request-status", e.status === "pending" ? (a.classList.add("livue-devtools__request-status--pending"), a.textContent = "pending") : e.status === "success" ? (a.classList.add("livue-devtools__request-status--success"), a.textContent = "OK") : (a.classList.add("livue-devtools__request-status--error"), a.textContent = "Error"), n.appendChild(a), e.duration !== null) {
    var l = document.createElement("span");
    l.className = "livue-devtools__request-duration", e.duration < 100 ? l.classList.add("livue-devtools__request-duration--fast") : e.duration < 500 ? l.classList.add("livue-devtools__request-duration--medium") : l.classList.add("livue-devtools__request-duration--slow"), l.textContent = e.duration + "ms", n.appendChild(l);
  }
  var s = document.createElement("span");
  s.className = "livue-devtools__request-time", s.textContent = Nl(e.startTime), n.appendChild(s), n.addEventListener("click", function() {
    yt.has(e.id) ? (yt.delete(e.id), t.classList.remove("livue-devtools__request--expanded"), r.textContent = "▶") : (yt.add(e.id), t.classList.add("livue-devtools__request--expanded"), r.textContent = "▼");
  }), t.appendChild(n);
  var u = document.createElement("div");
  if (u.className = "livue-devtools__request-details", e.updateCount > 0 || e.lazyCount > 0) {
    var d = document.createElement("div");
    d.className = "livue-devtools__request-section";
    var c = document.createElement("div");
    c.className = "livue-devtools__request-section-title", c.textContent = "Summary", d.appendChild(c);
    var v = document.createElement("div"), m = [];
    e.updateCount > 0 && m.push(e.updateCount + " update" + (e.updateCount > 1 ? "s" : "")), e.lazyCount > 0 && m.push(e.lazyCount + " lazy load" + (e.lazyCount > 1 ? "s" : "")), v.textContent = m.join(", "), d.appendChild(v), u.appendChild(d);
  }
  if (e.updates && e.updates.length > 0) {
    var f = document.createElement("div");
    f.className = "livue-devtools__request-section";
    var g = document.createElement("div");
    g.className = "livue-devtools__request-section-title", g.textContent = "Request Payload", f.appendChild(g);
    var p = document.createElement("pre");
    p.className = "livue-devtools__request-json", p.textContent = Mc(e.updates), f.appendChild(p), u.appendChild(f);
  }
  if (e.responses) {
    var _ = document.createElement("div");
    _.className = "livue-devtools__request-section";
    var C = document.createElement("div");
    C.className = "livue-devtools__request-section-title", C.textContent = "Response", _.appendChild(C);
    var S = document.createElement("pre");
    S.className = "livue-devtools__request-json", S.textContent = Fc(e.responses), _.appendChild(S), u.appendChild(_);
  }
  if (e.error) {
    var A = document.createElement("div");
    A.className = "livue-devtools__request-section";
    var I = document.createElement("div");
    I.className = "livue-devtools__request-section-title", I.style.color = "#f48771", I.textContent = "Error", A.appendChild(I);
    var k = document.createElement("pre");
    k.className = "livue-devtools__request-json", k.style.color = "#f48771", k.textContent = e.error.message || String(e.error), A.appendChild(k), u.appendChild(A);
  }
  return t.appendChild(u), t;
}
function Mc(e) {
  var t = e.map(function(n) {
    var r = {};
    return n.method && (r.method = n.method), n.params && n.params.length > 0 && (r.params = n.params), n.diffs && Object.keys(n.diffs).length > 0 && (r.diffs = n.diffs), r;
  });
  return JSON.stringify(t, null, 2);
}
function Fc(e) {
  var t = e.map(function(n) {
    if (!n) return null;
    var r = {};
    return n.snapshot && (r.snapshotSize = n.snapshot.length + " bytes"), n.html && (r.htmlSize = n.html.length + " bytes"), n.events && n.events.length > 0 && (r.events = n.events.map(function(o) {
      return o.name;
    })), n.jsonResult !== void 0 && (r.jsonResult = n.jsonResult), n.redirect && (r.redirect = n.redirect), n.download && (r.download = n.download.name), r;
  });
  return JSON.stringify(t, null, 2);
}
var Qt = "";
function Bl(e) {
  e.innerHTML = "";
  var t = document.createElement("div");
  t.className = "livue-devtools__events-header";
  var n = document.createElement("input");
  n.className = "livue-devtools__events-filter", n.type = "text", n.placeholder = "Filter events...", n.value = Qt, n.addEventListener("input", function(i) {
    Qt = i.target.value.toLowerCase(), yi(e.querySelector(".livue-devtools__events-list"));
  }), t.appendChild(n);
  var r = document.createElement("button");
  r.className = "livue-devtools__btn", r.textContent = "Clear", r.addEventListener("click", function() {
    Il(), Qt = "", n.value = "", Bl(e);
  }), t.appendChild(r), e.appendChild(t);
  var o = document.createElement("div");
  o.className = "livue-devtools__events-list", yi(o), e.appendChild(o);
}
function yi(e) {
  if (e) {
    e.innerHTML = "";
    var t = Ol(), n = t;
    if (Qt && (n = t.filter(function(r) {
      var o = (r.name + " " + r.source + " " + JSON.stringify(r.data)).toLowerCase();
      return o.indexOf(Qt) !== -1;
    })), n.length === 0) {
      t.length === 0 ? e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E8;</div>No events yet</div>' : e.innerHTML = '<div class="livue-devtools__empty">No events match filter</div>';
      return;
    }
    n.forEach(function(r) {
      e.appendChild(Bc(r));
    });
  }
}
function Bc(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__event";
  var n = document.createElement("span");
  n.className = "livue-devtools__event-time", n.textContent = Nl(e.time), t.appendChild(n);
  var r = document.createElement("span");
  if (r.className = "livue-devtools__event-name", r.textContent = e.name, t.appendChild(r), e.source) {
    var o = document.createElement("span");
    o.className = "livue-devtools__event-source", o.textContent = "← " + e.source, t.appendChild(o);
  }
  if (e.mode && e.mode !== "broadcast") {
    var i = document.createElement("span");
    i.className = "livue-devtools__badge", i.style.marginLeft = "4px", i.style.background = "#3c3c3c", i.style.color = "#858585", i.textContent = e.mode, e.target && (i.textContent += " → " + e.target), t.appendChild(i);
  }
  if (e.data !== void 0 && e.data !== null) {
    var a = document.createElement("span");
    a.className = "livue-devtools__event-data", a.textContent = Uc(e.data), a.title = JSON.stringify(e.data, null, 2), t.appendChild(a);
  }
  return t;
}
function Uc(e) {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  var t = JSON.stringify(e);
  return t.length > 80 ? t.substring(0, 77) + "..." : t;
}
var Ul = "livue-devtools-state", j = null, fe = "components", De = !1, zl = !1, tt = "right";
function Hl() {
  try {
    var e = localStorage.getItem(Ul);
    if (e) {
      var t = JSON.parse(e);
      fe = t.activeTab || "components", De = t.minimized || !1, zl = t.isOpen || !1, tt = t.position || "right";
    }
  } catch {
  }
}
function bn() {
  try {
    var e = {
      isOpen: j !== null,
      activeTab: fe,
      minimized: De,
      position: tt
    };
    localStorage.setItem(Ul, JSON.stringify(e));
  } catch {
  }
}
function zc() {
  return Hl(), zl;
}
var qn = null, en = null, $n = null;
function Hc(e) {
  Tc(e);
}
function jc() {
  return j !== null;
}
function Fo() {
  j || (Hl(), rc(), xl(), qc(), Xc(), Zc(), bn());
}
function Bo() {
  j && (en && (document.removeEventListener("keydown", en), en = null), qn && (clearInterval(qn), qn = null), $n && ($n(), $n = null), j.remove(), j = null, oc(), Tl(), Rc(), bn());
}
function jl() {
  j ? Bo() : Fo();
}
function ql() {
  switch (tt) {
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
function qc() {
  j = document.createElement("div"), j.className = "livue-devtools livue-devtools--" + tt, De && j.classList.add("livue-devtools--minimized");
  var e = document.createElement("div");
  e.className = "livue-devtools__header";
  var t = document.createElement("div");
  t.className = "livue-devtools__title", t.innerHTML = '<span class="livue-devtools__title-icon">&#x2699;</span> LiVue DevTools', e.appendChild(t);
  var n = document.createElement("div");
  n.className = "livue-devtools__actions";
  var r = ql(), o = document.createElement("button");
  o.className = "livue-devtools__btn", o.textContent = De ? r.minimized : r.expanded, o.title = "Minimize", o.addEventListener("click", function() {
    De = !De, j.classList.toggle("livue-devtools--minimized", De), o.textContent = De ? r.minimized : r.expanded, bn();
  }), n.appendChild(o);
  var i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = "×", i.title = "Close (Ctrl+Shift+L)", i.addEventListener("click", Bo), n.appendChild(i), e.appendChild(n), j.appendChild(e);
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
  l.forEach(function(S) {
    var A = document.createElement("button");
    A.className = "livue-devtools__tab", S === fe && A.classList.add("livue-devtools__tab--active"), A.textContent = s[S], A.addEventListener("click", function() {
      $c(S);
    }), a.appendChild(A);
  }), j.appendChild(a);
  var u = document.createElement("div");
  u.className = "livue-devtools__content";
  var d = document.createElement("div");
  d.className = "livue-devtools__panel livue-devtools__components", d.dataset.tab = "components", fe === "components" && d.classList.add("livue-devtools__panel--active");
  var c = document.createElement("div");
  c.className = "livue-devtools__tree", d.appendChild(c);
  var v = document.createElement("div");
  v.className = "livue-devtools__state", d.appendChild(v), u.appendChild(d);
  var m = document.createElement("div");
  m.className = "livue-devtools__panel livue-devtools__timeline", m.dataset.tab = "timeline", fe === "timeline" && m.classList.add("livue-devtools__panel--active"), u.appendChild(m);
  var f = document.createElement("div");
  f.className = "livue-devtools__panel livue-devtools__events", f.dataset.tab = "events", fe === "events" && f.classList.add("livue-devtools__panel--active"), u.appendChild(f);
  var g = document.createElement("div");
  g.className = "livue-devtools__panel livue-devtools__stores", g.dataset.tab = "stores", fe === "stores" && g.classList.add("livue-devtools__panel--active"), u.appendChild(g);
  var p = document.createElement("div");
  p.className = "livue-devtools__panel livue-devtools__echo", p.dataset.tab = "echo", fe === "echo" && p.classList.add("livue-devtools__panel--active"), u.appendChild(p);
  var _ = document.createElement("div");
  _.className = "livue-devtools__panel livue-devtools__perf", _.dataset.tab = "perf", fe === "perf" && _.classList.add("livue-devtools__panel--active"), u.appendChild(_);
  var C = document.createElement("div");
  C.className = "livue-devtools__panel livue-devtools__settings", C.dataset.tab = "settings", fe === "settings" && C.classList.add("livue-devtools__panel--active"), u.appendChild(C), j.appendChild(u), document.body.appendChild(j), Ac(function(S) {
    Oc(S), Rt(v);
  }), cr(), $n = Sc(function() {
    cr();
  });
}
function $c(e) {
  if (e !== fe) {
    fe = e;
    var t = j.querySelectorAll(".livue-devtools__tab"), n = ["components", "timeline", "events", "stores", "echo", "perf", "settings"];
    t.forEach(function(o, i) {
      o.classList.toggle("livue-devtools__tab--active", n[i] === e);
    });
    var r = j.querySelectorAll(".livue-devtools__panel");
    r.forEach(function(o) {
      o.classList.toggle("livue-devtools__panel--active", o.dataset.tab === e);
    }), cr(), bn();
  }
}
function cr() {
  if (j)
    switch (fe) {
      case "components":
        var e = j.querySelector(".livue-devtools__tree"), t = j.querySelector(".livue-devtools__state");
        e && Rl(e), t && Rt(t);
        break;
      case "timeline":
        var n = j.querySelector(".livue-devtools__timeline");
        n && Fl(n);
        break;
      case "events":
        var r = j.querySelector(".livue-devtools__events");
        r && Bl(r);
        break;
      case "stores":
        var o = j.querySelector(".livue-devtools__stores");
        o && Kc(o);
        break;
      case "echo":
        var i = j.querySelector(".livue-devtools__echo");
        i && Wc(i);
        break;
      case "perf":
        var a = j.querySelector(".livue-devtools__perf");
        a && Gc(a);
        break;
      case "settings":
        var l = j.querySelector(".livue-devtools__settings");
        l && Yc(l);
        break;
    }
}
function Kc(e) {
  e.innerHTML = "", e.style.cssText = "flex-direction: column; width: 100%; padding: 8px;";
  var t = Cc(), n = t.stores, r = document.createElement("div");
  if (r.className = "livue-devtools__perf-title", r.textContent = "Registered Pinia Stores", e.appendChild(r), n.length === 0) {
    var o = document.createElement("div");
    o.className = "livue-devtools__empty", o.innerHTML = '<div class="livue-devtools__empty-icon">&#128230;</div>No Pinia stores registered<br><br><span style="font-size: 11px; color: #858585;">Use LiVue.registerStore(useMyStore) to register stores</span>', e.appendChild(o);
    return;
  }
  n.forEach(function(l) {
    var s = document.createElement("div");
    s.style.cssText = "padding: 8px; background: #2a2d2e; border-radius: 4px; margin-bottom: 8px;";
    var u = document.createElement("div");
    if (u.style.cssText = "color: #4ec9b0; font-weight: 600; margin-bottom: 4px;", u.textContent = l.name, s.appendChild(u), l.filters) {
      var d = document.createElement("div");
      d.style.cssText = "font-size: 11px; color: #858585;", d.textContent = "Filters: " + JSON.stringify(l.filters), s.appendChild(d);
    }
    e.appendChild(s);
  });
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-title", i.style.marginTop = "16px", i.textContent = "Other Registrations", e.appendChild(i);
  var a = [
    { label: "Plugins", count: t.plugins.length, items: t.plugins.map(function(l) {
      return l.name;
    }) },
    { label: "Components", count: t.components.length, items: t.components.map(function(l) {
      return l.name;
    }) },
    { label: "Directives", count: t.directives.length, items: t.directives.map(function(l) {
      return l.name;
    }) }
  ];
  a.forEach(function(l) {
    var s = document.createElement("div");
    s.className = "livue-devtools__perf-stat";
    var u = document.createElement("span");
    u.className = "livue-devtools__perf-label", u.textContent = l.label, s.appendChild(u);
    var d = document.createElement("span");
    d.className = "livue-devtools__perf-value", d.textContent = l.count + (l.items.length > 0 ? " (" + l.items.join(", ") + ")" : ""), s.appendChild(d), e.appendChild(s);
  });
}
function Wc(e) {
  e.innerHTML = "", e.style.cssText = "flex-direction: column; width: 100%; padding: 8px;";
  var t = xc(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-title", r.textContent = "Laravel Echo Status", n.appendChild(r);
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-stat";
  var i = document.createElement("span");
  i.className = "livue-devtools__perf-label", i.textContent = "Echo Available", o.appendChild(i);
  var a = document.createElement("span");
  if (a.className = "livue-devtools__perf-value livue-devtools__perf-value--" + (t.available ? "good" : "warn"), a.textContent = t.available ? "Yes" : "No (window.Echo not found)", o.appendChild(a), n.appendChild(o), e.appendChild(n), !t.available) {
    var l = document.createElement("div");
    l.style.cssText = "color: #858585; font-size: 11px; padding: 8px;", l.textContent = "Configure Laravel Echo and set window.Echo to enable real-time features.", e.appendChild(l);
    return;
  }
  var s = document.createElement("div");
  s.className = "livue-devtools__perf-section";
  var u = document.createElement("div");
  if (u.className = "livue-devtools__perf-title", u.textContent = "Active Channels (" + t.channels.length + ")", s.appendChild(u), t.channels.length === 0) {
    var d = document.createElement("div");
    d.style.cssText = "color: #858585; font-size: 11px;", d.textContent = "No active channels", s.appendChild(d);
  } else
    t.channels.forEach(function(f) {
      var g = document.createElement("div");
      g.style.cssText = "padding: 4px 0; display: flex; align-items: center; gap: 8px;";
      var p = document.createElement("span");
      p.style.cssText = "padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600;", f.type === "private" ? (p.style.background = "#4d3a12", p.style.color = "#dcdcaa") : f.type === "presence" ? (p.style.background = "#264f78", p.style.color = "#9cdcfe") : (p.style.background = "#2d4a2d", p.style.color = "#6a9955"), p.textContent = f.type, g.appendChild(p);
      var _ = document.createElement("span");
      _.style.color = "#d4d4d4", _.textContent = f.name, g.appendChild(_), s.appendChild(g);
    });
  e.appendChild(s);
  var c = document.createElement("div");
  c.className = "livue-devtools__perf-section";
  var v = document.createElement("div");
  if (v.className = "livue-devtools__perf-title", v.textContent = "Subscriptions (" + t.subscriptions.length + ")", c.appendChild(v), t.subscriptions.length === 0) {
    var m = document.createElement("div");
    m.style.cssText = "color: #858585; font-size: 11px;", m.textContent = "No active subscriptions", c.appendChild(m);
  } else
    t.subscriptions.forEach(function(f) {
      var g = document.createElement("div");
      g.style.cssText = "padding: 4px 0; font-size: 11px;", g.innerHTML = '<span style="color: #9cdcfe;">' + f.channelName + '</span> <span style="color: #858585;">→</span> <span style="color: #dcdcaa;">' + f.event + '</span> <span style="color: #858585;">(component: ' + f.componentId.substring(0, 8) + "...)</span>", c.appendChild(g);
    });
  e.appendChild(c);
}
function Gc(e) {
  e.innerHTML = "";
  var t = Dl(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-title", r.textContent = "AJAX Requests", n.appendChild(r), n.appendChild(be("Total Requests", t.totalRequests)), n.appendChild(be("Successful", t.successfulRequests, "good")), n.appendChild(be("Failed", t.failedRequests, t.failedRequests > 0 ? "bad" : null)), e.appendChild(n);
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-section";
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-title", i.textContent = "Request Timing", o.appendChild(i);
  var a = t.avgRequestTime < 100 ? "good" : t.avgRequestTime < 500 ? "warn" : "bad";
  o.appendChild(be("Average", Dn(t.avgRequestTime), a));
  var l = t.minRequestTime < 100 ? "good" : t.minRequestTime < 500 ? "warn" : "bad";
  o.appendChild(be("Fastest", t.minRequestTime === 1 / 0 ? "-" : Dn(t.minRequestTime), l));
  var s = t.maxRequestTime < 100 ? "good" : t.maxRequestTime < 500 ? "warn" : "bad";
  o.appendChild(be("Slowest", t.maxRequestTime === 0 ? "-" : Dn(t.maxRequestTime), s)), e.appendChild(o);
  var u = document.createElement("div");
  u.className = "livue-devtools__perf-section";
  var d = document.createElement("div");
  d.className = "livue-devtools__perf-title", d.textContent = "Template Swaps", u.appendChild(d), u.appendChild(be("Total Swaps", t.totalTemplateSwaps));
  var c = t.avgTemplateSwapTime < 5 ? "good" : t.avgTemplateSwapTime < 20 ? "warn" : "bad";
  u.appendChild(be("Average Time", Dn(t.avgTemplateSwapTime), c)), e.appendChild(u);
  var v = document.createElement("div");
  v.className = "livue-devtools__perf-section";
  var m = document.createElement("div");
  m.className = "livue-devtools__perf-title", m.textContent = "Components", v.appendChild(m);
  var f = yc(), g = f.filter(function(_) {
    return !_.isChild;
  }), p = f.filter(function(_) {
    return _.isChild;
  });
  v.appendChild(be("Root Components", g.length)), v.appendChild(be("Child Components", p.length)), v.appendChild(be("Total", f.length)), e.appendChild(v);
}
function Yc(e) {
  e.innerHTML = "";
  var t = document.createElement("div");
  t.className = "livue-devtools__settings-group";
  var n = document.createElement("div");
  n.className = "livue-devtools__settings-label", n.textContent = "Panel Position", t.appendChild(n);
  var r = document.createElement("div");
  r.className = "livue-devtools__settings-options";
  var o = [
    { id: "right", label: "Right", icon: "▶" },
    { id: "left", label: "Left", icon: "◀" },
    { id: "bottom", label: "Bottom", icon: "▼" },
    { id: "top", label: "Top", icon: "▲" }
  ];
  o.forEach(function(s) {
    var u = document.createElement("button");
    u.className = "livue-devtools__settings-btn", tt === s.id && u.classList.add("livue-devtools__settings-btn--active");
    var d = document.createElement("span");
    d.className = "livue-devtools__settings-btn-icon", d.textContent = s.icon, u.appendChild(d);
    var c = document.createElement("span");
    c.textContent = s.label, u.appendChild(c), u.addEventListener("click", function() {
      Jc(s.id);
    }), r.appendChild(u);
  }), t.appendChild(r), e.appendChild(t);
  var i = document.createElement("div");
  i.className = "livue-devtools__settings-group";
  var a = document.createElement("div");
  a.className = "livue-devtools__settings-label", a.textContent = "Keyboard Shortcuts", i.appendChild(a);
  var l = [
    { key: "Ctrl+Shift+L", desc: "Toggle DevTools" }
  ];
  l.forEach(function(s) {
    var u = document.createElement("div");
    u.className = "livue-devtools__perf-stat";
    var d = document.createElement("span");
    d.style.cssText = "color: #dcdcaa; font-family: monospace;", d.textContent = s.key, u.appendChild(d);
    var c = document.createElement("span");
    c.style.color = "#858585", c.textContent = s.desc, u.appendChild(c), i.appendChild(u);
  }), e.appendChild(i);
}
function Jc(e) {
  if (tt !== e && (tt = e, bn(), j)) {
    j.className = "livue-devtools livue-devtools--" + tt, De && j.classList.add("livue-devtools--minimized");
    var t = ql(), n = j.querySelector(".livue-devtools__btn");
    n && (n.textContent = De ? t.minimized : t.expanded), cr();
  }
}
function be(e, t, n) {
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-stat";
  var o = document.createElement("span");
  o.className = "livue-devtools__perf-label", o.textContent = e, r.appendChild(o);
  var i = document.createElement("span");
  return i.className = "livue-devtools__perf-value", n && i.classList.add("livue-devtools__perf-value--" + n), i.textContent = String(t), r.appendChild(i), r;
}
function Dn(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1 ? "<1ms" : Math.round(e) + "ms";
}
function Xc() {
  en = function(e) {
    e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), jl());
  }, document.addEventListener("keydown", en);
}
function Zc() {
  qn = setInterval(function() {
    if (j && fe === "components") {
      var e = j.querySelector(".livue-devtools__tree"), t = j.querySelector(".livue-devtools__state");
      e && Rl(e), t && Rt(t);
    }
  }, 500);
}
var vn = !1;
function $l(e) {
  vn || (Hc(e), vn = !0, zc() && Fo());
}
function Qc() {
  if (!vn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  Fo();
}
function ed() {
  Bo();
}
function Kl() {
  if (!vn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  jl();
}
function td() {
  return jc();
}
function nd() {
  return Ll();
}
function rd() {
  return Al();
}
function od() {
  return Ol();
}
function id() {
  return Dl();
}
function ad() {
  kl();
}
function ld() {
  Il();
}
function sd() {
  bc();
}
function Wl(e) {
  Ec(e);
}
function ud() {
  return vn;
}
function cd() {
  xl();
}
function dd() {
  Tl();
}
function Gl() {
  return _c();
}
const fd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: sd,
  clearEvents: ld,
  clearTimeline: ad,
  close: ed,
  getComponents: nd,
  getEvents: od,
  getPerf: id,
  getTimeline: rd,
  init: $l,
  isCollecting: Gl,
  isInitialized: ud,
  isOpen: td,
  logEvent: Wl,
  open: Qc,
  startCollecting: cd,
  stopCollecting: dd,
  toggle: Kl
}, Symbol.toStringTag, { value: "Module" }));
var Ye = /* @__PURE__ */ new Map();
function dr(e, t, n, r) {
  Ye.has(e) || Ye.set(e, /* @__PURE__ */ new Set());
  var o = {
    componentName: t,
    componentId: n,
    handler: r
  };
  return Ye.get(e).add(o), function() {
    var i = Ye.get(e);
    i && (i.delete(o), i.size === 0 && Ye.delete(e));
  };
}
function Kn(e, t, n, r, o, i) {
  Gl() && Wl({
    name: e,
    data: t,
    mode: n,
    source: r,
    sourceId: o,
    target: i
  });
  var a = Ye.get(e);
  a && a.forEach(function(l) {
    var s = !1;
    if (n === "broadcast" ? s = !0 : n === "self" ? s = l.componentId === o : n === "to" && (s = l.componentName === i), s)
      try {
        l.handler(t);
      } catch (u) {
        console.error('[LiVue] Event handler error for "' + e + '":', u);
      }
  });
}
function bi(e) {
  Ye.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Ye.delete(n);
  });
}
function pd(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    Kn(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function vd(e, t) {
  var n = new URL(window.location), r = !1;
  for (var o in e) {
    var i = e[o], a = i.as || o, l = t[o], s = !1;
    i.except !== null && i.except !== void 0 && String(l) === String(i.except) && (s = !0), !i.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), i.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function Uo() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function md(e, t, n, r, o) {
  return new Promise(function(i, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = Uo();
    s.open("POST", u, !0);
    var d = Pt();
    d && s.setRequestHeader("X-CSRF-TOKEN", d), s.setRequestHeader("Accept", "application/json"), o && s.upload && s.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var v = Math.round(c.loaded / c.total * 100);
        o(v);
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
        i(c);
      else {
        var v = new Error(c.error || c.message || "Upload failed");
        v.status = s.status, v.data = c, a(v);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function Pr(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = Uo() + "-remove", n = Pt();
  return fetch(t, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-TOKEN": n || ""
    },
    body: JSON.stringify({ refs: e })
  }).catch(function() {
  });
}
function hd(e, t, n, r, o) {
  return new Promise(function(i, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(v) {
      s.append("files[]", v);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = Uo();
    u.open("POST", d, !0);
    var c = Pt();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), o && u.upload && u.upload.addEventListener("progress", function(v) {
      if (v.lengthComputable) {
        var m = Math.round(v.loaded / v.total * 100);
        o({ overall: m });
      }
    }), u.onload = function() {
      var v;
      try {
        v = JSON.parse(u.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (u.status >= 200 && u.status < 300)
        i({
          results: v.results || [],
          errors: v.errors || []
        });
      else {
        var m = new Error(v.error || v.message || "Upload failed");
        m.status = u.status, m.data = v, a(m);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(s);
  });
}
var gd = Object.create, Yl = Object.defineProperty, _d = Object.getOwnPropertyDescriptor, zo = Object.getOwnPropertyNames, Ed = Object.getPrototypeOf, yd = Object.prototype.hasOwnProperty, bd = (e, t) => function() {
  return e && (t = (0, e[zo(e)[0]])(e = 0)), t;
}, Sd = (e, t) => function() {
  return t || (0, e[zo(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, wd = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of zo(t))
      !yd.call(e, o) && o !== n && Yl(e, o, { get: () => t[o], enumerable: !(r = _d(t, o)) || r.enumerable });
  return e;
}, Cd = (e, t, n) => (n = e != null ? gd(Ed(e)) : {}, wd(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Yl(n, "default", { value: e, enumerable: !0 }),
  e
)), Sn = bd({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), xd = Sd({
  "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
    Sn(), t.exports = r;
    function n(i) {
      return i instanceof Buffer ? Buffer.from(i) : new i.constructor(i.buffer.slice(), i.byteOffset, i.length);
    }
    function r(i) {
      if (i = i || {}, i.circles) return o(i);
      const a = /* @__PURE__ */ new Map();
      if (a.set(Date, (c) => new Date(c)), a.set(Map, (c, v) => new Map(s(Array.from(c), v))), a.set(Set, (c, v) => new Set(s(Array.from(c), v))), i.constructorHandlers)
        for (const c of i.constructorHandlers)
          a.set(c[0], c[1]);
      let l = null;
      return i.proto ? d : u;
      function s(c, v) {
        const m = Object.keys(c), f = new Array(m.length);
        for (let g = 0; g < m.length; g++) {
          const p = m[g], _ = c[p];
          typeof _ != "object" || _ === null ? f[p] = _ : _.constructor !== Object && (l = a.get(_.constructor)) ? f[p] = l(_, v) : ArrayBuffer.isView(_) ? f[p] = n(_) : f[p] = v(_);
        }
        return f;
      }
      function u(c) {
        if (typeof c != "object" || c === null) return c;
        if (Array.isArray(c)) return s(c, u);
        if (c.constructor !== Object && (l = a.get(c.constructor)))
          return l(c, u);
        const v = {};
        for (const m in c) {
          if (Object.hasOwnProperty.call(c, m) === !1) continue;
          const f = c[m];
          typeof f != "object" || f === null ? v[m] = f : f.constructor !== Object && (l = a.get(f.constructor)) ? v[m] = l(f, u) : ArrayBuffer.isView(f) ? v[m] = n(f) : v[m] = u(f);
        }
        return v;
      }
      function d(c) {
        if (typeof c != "object" || c === null) return c;
        if (Array.isArray(c)) return s(c, d);
        if (c.constructor !== Object && (l = a.get(c.constructor)))
          return l(c, d);
        const v = {};
        for (const m in c) {
          const f = c[m];
          typeof f != "object" || f === null ? v[m] = f : f.constructor !== Object && (l = a.get(f.constructor)) ? v[m] = l(f, d) : ArrayBuffer.isView(f) ? v[m] = n(f) : v[m] = d(f);
        }
        return v;
      }
    }
    function o(i) {
      const a = [], l = [], s = /* @__PURE__ */ new Map();
      if (s.set(Date, (m) => new Date(m)), s.set(Map, (m, f) => new Map(d(Array.from(m), f))), s.set(Set, (m, f) => new Set(d(Array.from(m), f))), i.constructorHandlers)
        for (const m of i.constructorHandlers)
          s.set(m[0], m[1]);
      let u = null;
      return i.proto ? v : c;
      function d(m, f) {
        const g = Object.keys(m), p = new Array(g.length);
        for (let _ = 0; _ < g.length; _++) {
          const C = g[_], S = m[C];
          if (typeof S != "object" || S === null)
            p[C] = S;
          else if (S.constructor !== Object && (u = s.get(S.constructor)))
            p[C] = u(S, f);
          else if (ArrayBuffer.isView(S))
            p[C] = n(S);
          else {
            const A = a.indexOf(S);
            A !== -1 ? p[C] = l[A] : p[C] = f(S);
          }
        }
        return p;
      }
      function c(m) {
        if (typeof m != "object" || m === null) return m;
        if (Array.isArray(m)) return d(m, c);
        if (m.constructor !== Object && (u = s.get(m.constructor)))
          return u(m, c);
        const f = {};
        a.push(m), l.push(f);
        for (const g in m) {
          if (Object.hasOwnProperty.call(m, g) === !1) continue;
          const p = m[g];
          if (typeof p != "object" || p === null)
            f[g] = p;
          else if (p.constructor !== Object && (u = s.get(p.constructor)))
            f[g] = u(p, c);
          else if (ArrayBuffer.isView(p))
            f[g] = n(p);
          else {
            const _ = a.indexOf(p);
            _ !== -1 ? f[g] = l[_] : f[g] = c(p);
          }
        }
        return a.pop(), l.pop(), f;
      }
      function v(m) {
        if (typeof m != "object" || m === null) return m;
        if (Array.isArray(m)) return d(m, v);
        if (m.constructor !== Object && (u = s.get(m.constructor)))
          return u(m, v);
        const f = {};
        a.push(m), l.push(f);
        for (const g in m) {
          const p = m[g];
          if (typeof p != "object" || p === null)
            f[g] = p;
          else if (p.constructor !== Object && (u = s.get(p.constructor)))
            f[g] = u(p, v);
          else if (ArrayBuffer.isView(p))
            f[g] = n(p);
          else {
            const _ = a.indexOf(p);
            _ !== -1 ? f[g] = l[_] : f[g] = v(p);
          }
        }
        return a.pop(), l.pop(), f;
      }
    }
  }
});
Sn();
Sn();
Sn();
var Jl = typeof navigator < "u", D = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
typeof D.chrome < "u" && D.chrome.devtools;
Jl && (D.self, D.top);
var Si;
typeof navigator < "u" && ((Si = navigator.userAgent) == null || Si.toLowerCase().includes("electron"));
Sn();
var Td = Cd(xd()), Ad = /(?:^|[-_/])(\w)/g;
function Od(e, t) {
  return t ? t.toUpperCase() : "";
}
function Dd(e) {
  return e && `${e}`.replace(Ad, Od);
}
function kd(e, t) {
  let n = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  n.endsWith(`index${t}`) && (n = n.replace(`/index${t}`, t));
  const r = n.lastIndexOf("/"), o = n.substring(r + 1);
  {
    const i = o.lastIndexOf(t);
    return o.substring(0, i);
  }
}
var wi = (0, Td.default)({ circles: !0 });
const Id = {
  trailing: !0
};
function Dt(e, t = 25, n = {}) {
  if (n = { ...Id, ...n }, !Number.isFinite(t))
    throw new TypeError("Expected `wait` to be a finite number");
  let r, o, i = [], a, l;
  const s = (u, d) => (a = Nd(e, u, d), a.finally(() => {
    if (a = null, n.trailing && l && !o) {
      const c = s(u, l);
      return l = null, c;
    }
  }), a);
  return function(...u) {
    return a ? (n.trailing && (l = u), a) : new Promise((d) => {
      const c = !o && n.leading;
      clearTimeout(o), o = setTimeout(() => {
        o = null;
        const v = n.leading ? r : s(this, u);
        for (const m of i)
          m(v);
        i = [];
      }, t), c ? (r = s(this, u), d(r)) : i.push(d);
    });
  };
}
async function Nd(e, t, n) {
  return await e.apply(t, n);
}
function ho(e, t = {}, n) {
  for (const r in e) {
    const o = e[r], i = n ? `${n}:${r}` : r;
    typeof o == "object" && o !== null ? ho(o, t, i) : typeof o == "function" && (t[i] = o);
  }
  return t;
}
const Ld = { run: (e) => e() }, Pd = () => Ld, Xl = typeof console.createTask < "u" ? console.createTask : Pd;
function Rd(e, t) {
  const n = t.shift(), r = Xl(n);
  return e.reduce(
    (o, i) => o.then(() => r.run(() => i(...t))),
    Promise.resolve()
  );
}
function Vd(e, t) {
  const n = t.shift(), r = Xl(n);
  return Promise.all(e.map((o) => r.run(() => o(...t))));
}
function Rr(e, t) {
  for (const n of [...e])
    n(t);
}
class Md {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != "function")
      return () => {
      };
    const o = t;
    let i;
    for (; this._deprecatedHooks[t]; )
      i = this._deprecatedHooks[t], t = i.to;
    if (i && !r.allowDeprecated) {
      let a = i.message;
      a || (a = `${o} hook has been deprecated` + (i.to ? `, please use ${i.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(a) || (console.warn(a), this._deprecatedMessages.add(a));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0
        });
      } catch {
      }
    return this._hooks[t] = this._hooks[t] || [], this._hooks[t].push(n), () => {
      n && (this.removeHook(t, n), n = void 0);
    };
  }
  hookOnce(t, n) {
    let r, o = (...i) => (typeof r == "function" && r(), r = void 0, o = void 0, n(...i));
    return r = this.hook(t, o), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1), this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const r = this._hooks[t] || [];
    delete this._hooks[t];
    for (const o of r)
      this.hook(t, o);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t)
      this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = ho(t), r = Object.keys(n).map(
      (o) => this.hook(o, n[o])
    );
    return () => {
      for (const o of r.splice(0, r.length))
        o();
    };
  }
  removeHooks(t) {
    const n = ho(t);
    for (const r in n)
      this.removeHook(r, n[r]);
  }
  removeAllHooks() {
    for (const t in this._hooks)
      delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(Rd, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(Vd, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const o = this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && Rr(this._before, o);
    const i = t(
      n in this._hooks ? [...this._hooks[n]] : [],
      r
    );
    return i instanceof Promise ? i.finally(() => {
      this._after && o && Rr(this._after, o);
    }) : (this._after && o && Rr(this._after, o), i);
  }
  beforeEach(t) {
    return this._before = this._before || [], this._before.push(t), () => {
      if (this._before !== void 0) {
        const n = this._before.indexOf(t);
        n !== -1 && this._before.splice(n, 1);
      }
    };
  }
  afterEach(t) {
    return this._after = this._after || [], this._after.push(t), () => {
      if (this._after !== void 0) {
        const n = this._after.indexOf(t);
        n !== -1 && this._after.splice(n, 1);
      }
    };
  }
}
function Zl() {
  return new Md();
}
var Fd = Object.create, Ql = Object.defineProperty, Bd = Object.getOwnPropertyDescriptor, Ho = Object.getOwnPropertyNames, Ud = Object.getPrototypeOf, zd = Object.prototype.hasOwnProperty, Hd = (e, t) => function() {
  return e && (t = (0, e[Ho(e)[0]])(e = 0)), t;
}, es = (e, t) => function() {
  return t || (0, e[Ho(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, jd = (e, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of Ho(t))
      !zd.call(e, o) && o !== n && Ql(e, o, { get: () => t[o], enumerable: !(r = Bd(t, o)) || r.enumerable });
  return e;
}, qd = (e, t, n) => (n = e != null ? Fd(Ud(e)) : {}, jd(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Ql(n, "default", { value: e, enumerable: !0 }),
  e
)), y = Hd({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), $d = es({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
    y(), (function(n) {
      var r = {
        // latin
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "Ae",
        Å: "A",
        Æ: "AE",
        Ç: "C",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        Ð: "D",
        Ñ: "N",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "Oe",
        Ő: "O",
        Ø: "O",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "Ue",
        Ű: "U",
        Ý: "Y",
        Þ: "TH",
        ß: "ss",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "ae",
        å: "a",
        æ: "ae",
        ç: "c",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        ð: "d",
        ñ: "n",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "oe",
        ő: "o",
        ø: "o",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "ue",
        ű: "u",
        ý: "y",
        þ: "th",
        ÿ: "y",
        "ẞ": "SS",
        // language specific
        // Arabic
        ا: "a",
        أ: "a",
        إ: "i",
        آ: "aa",
        ؤ: "u",
        ئ: "e",
        ء: "a",
        ب: "b",
        ت: "t",
        ث: "th",
        ج: "j",
        ح: "h",
        خ: "kh",
        د: "d",
        ذ: "th",
        ر: "r",
        ز: "z",
        س: "s",
        ش: "sh",
        ص: "s",
        ض: "dh",
        ط: "t",
        ظ: "z",
        ع: "a",
        غ: "gh",
        ف: "f",
        ق: "q",
        ك: "k",
        ل: "l",
        م: "m",
        ن: "n",
        ه: "h",
        و: "w",
        ي: "y",
        ى: "a",
        ة: "h",
        ﻻ: "la",
        ﻷ: "laa",
        ﻹ: "lai",
        ﻵ: "laa",
        // Persian additional characters than Arabic
        گ: "g",
        چ: "ch",
        پ: "p",
        ژ: "zh",
        ک: "k",
        ی: "y",
        // Arabic diactrics
        "َ": "a",
        "ً": "an",
        "ِ": "e",
        "ٍ": "en",
        "ُ": "u",
        "ٌ": "on",
        "ْ": "",
        // Arabic numbers
        "٠": "0",
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        // Persian numbers
        "۰": "0",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        // Burmese consonants
        က: "k",
        ခ: "kh",
        ဂ: "g",
        ဃ: "ga",
        င: "ng",
        စ: "s",
        ဆ: "sa",
        ဇ: "z",
        "စျ": "za",
        ည: "ny",
        ဋ: "t",
        ဌ: "ta",
        ဍ: "d",
        ဎ: "da",
        ဏ: "na",
        တ: "t",
        ထ: "ta",
        ဒ: "d",
        ဓ: "da",
        န: "n",
        ပ: "p",
        ဖ: "pa",
        ဗ: "b",
        ဘ: "ba",
        မ: "m",
        ယ: "y",
        ရ: "ya",
        လ: "l",
        ဝ: "w",
        သ: "th",
        ဟ: "h",
        ဠ: "la",
        အ: "a",
        // consonant character combos
        "ြ": "y",
        "ျ": "ya",
        "ွ": "w",
        "ြွ": "yw",
        "ျွ": "ywa",
        "ှ": "h",
        // independent vowels
        ဧ: "e",
        "၏": "-e",
        ဣ: "i",
        ဤ: "-i",
        ဉ: "u",
        ဦ: "-u",
        ဩ: "aw",
        "သြော": "aw",
        ဪ: "aw",
        // numbers
        "၀": "0",
        "၁": "1",
        "၂": "2",
        "၃": "3",
        "၄": "4",
        "၅": "5",
        "၆": "6",
        "၇": "7",
        "၈": "8",
        "၉": "9",
        // virama and tone marks which are silent in transliteration
        "္": "",
        "့": "",
        "း": "",
        // Czech
        č: "c",
        ď: "d",
        ě: "e",
        ň: "n",
        ř: "r",
        š: "s",
        ť: "t",
        ů: "u",
        ž: "z",
        Č: "C",
        Ď: "D",
        Ě: "E",
        Ň: "N",
        Ř: "R",
        Š: "S",
        Ť: "T",
        Ů: "U",
        Ž: "Z",
        // Dhivehi
        ހ: "h",
        ށ: "sh",
        ނ: "n",
        ރ: "r",
        ބ: "b",
        ޅ: "lh",
        ކ: "k",
        އ: "a",
        ވ: "v",
        މ: "m",
        ފ: "f",
        ދ: "dh",
        ތ: "th",
        ލ: "l",
        ގ: "g",
        ޏ: "gn",
        ސ: "s",
        ޑ: "d",
        ޒ: "z",
        ޓ: "t",
        ޔ: "y",
        ޕ: "p",
        ޖ: "j",
        ޗ: "ch",
        ޘ: "tt",
        ޙ: "hh",
        ޚ: "kh",
        ޛ: "th",
        ޜ: "z",
        ޝ: "sh",
        ޞ: "s",
        ޟ: "d",
        ޠ: "t",
        ޡ: "z",
        ޢ: "a",
        ޣ: "gh",
        ޤ: "q",
        ޥ: "w",
        "ަ": "a",
        "ާ": "aa",
        "ި": "i",
        "ީ": "ee",
        "ު": "u",
        "ޫ": "oo",
        "ެ": "e",
        "ޭ": "ey",
        "ޮ": "o",
        "ޯ": "oa",
        "ް": "",
        // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
        // National system (2002)
        ა: "a",
        ბ: "b",
        გ: "g",
        დ: "d",
        ე: "e",
        ვ: "v",
        ზ: "z",
        თ: "t",
        ი: "i",
        კ: "k",
        ლ: "l",
        მ: "m",
        ნ: "n",
        ო: "o",
        პ: "p",
        ჟ: "zh",
        რ: "r",
        ს: "s",
        ტ: "t",
        უ: "u",
        ფ: "p",
        ქ: "k",
        ღ: "gh",
        ყ: "q",
        შ: "sh",
        ჩ: "ch",
        ც: "ts",
        ძ: "dz",
        წ: "ts",
        ჭ: "ch",
        ხ: "kh",
        ჯ: "j",
        ჰ: "h",
        // Greek
        α: "a",
        β: "v",
        γ: "g",
        δ: "d",
        ε: "e",
        ζ: "z",
        η: "i",
        θ: "th",
        ι: "i",
        κ: "k",
        λ: "l",
        μ: "m",
        ν: "n",
        ξ: "ks",
        ο: "o",
        π: "p",
        ρ: "r",
        σ: "s",
        τ: "t",
        υ: "y",
        φ: "f",
        χ: "x",
        ψ: "ps",
        ω: "o",
        ά: "a",
        έ: "e",
        ί: "i",
        ό: "o",
        ύ: "y",
        ή: "i",
        ώ: "o",
        ς: "s",
        ϊ: "i",
        ΰ: "y",
        ϋ: "y",
        ΐ: "i",
        Α: "A",
        Β: "B",
        Γ: "G",
        Δ: "D",
        Ε: "E",
        Ζ: "Z",
        Η: "I",
        Θ: "TH",
        Ι: "I",
        Κ: "K",
        Λ: "L",
        Μ: "M",
        Ν: "N",
        Ξ: "KS",
        Ο: "O",
        Π: "P",
        Ρ: "R",
        Σ: "S",
        Τ: "T",
        Υ: "Y",
        Φ: "F",
        Χ: "X",
        Ψ: "PS",
        Ω: "O",
        Ά: "A",
        Έ: "E",
        Ί: "I",
        Ό: "O",
        Ύ: "Y",
        Ή: "I",
        Ώ: "O",
        Ϊ: "I",
        Ϋ: "Y",
        // Latvian
        ā: "a",
        // 'č': 'c', // duplicate
        ē: "e",
        ģ: "g",
        ī: "i",
        ķ: "k",
        ļ: "l",
        ņ: "n",
        // 'š': 's', // duplicate
        ū: "u",
        // 'ž': 'z', // duplicate
        Ā: "A",
        // 'Č': 'C', // duplicate
        Ē: "E",
        Ģ: "G",
        Ī: "I",
        Ķ: "k",
        Ļ: "L",
        Ņ: "N",
        // 'Š': 'S', // duplicate
        Ū: "U",
        // 'Ž': 'Z', // duplicate
        // Macedonian
        Ќ: "Kj",
        ќ: "kj",
        Љ: "Lj",
        љ: "lj",
        Њ: "Nj",
        њ: "nj",
        Тс: "Ts",
        тс: "ts",
        // Polish
        ą: "a",
        ć: "c",
        ę: "e",
        ł: "l",
        ń: "n",
        // 'ó': 'o', // duplicate
        ś: "s",
        ź: "z",
        ż: "z",
        Ą: "A",
        Ć: "C",
        Ę: "E",
        Ł: "L",
        Ń: "N",
        Ś: "S",
        Ź: "Z",
        Ż: "Z",
        // Ukranian
        Є: "Ye",
        І: "I",
        Ї: "Yi",
        Ґ: "G",
        є: "ye",
        і: "i",
        ї: "yi",
        ґ: "g",
        // Romanian
        ă: "a",
        Ă: "A",
        ș: "s",
        Ș: "S",
        // 'ş': 's', // duplicate
        // 'Ş': 'S', // duplicate
        ț: "t",
        Ț: "T",
        ţ: "t",
        Ţ: "T",
        // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
        // ICAO
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "i",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "kh",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sh",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        А: "A",
        Б: "B",
        В: "V",
        Г: "G",
        Д: "D",
        Е: "E",
        Ё: "Yo",
        Ж: "Zh",
        З: "Z",
        И: "I",
        Й: "I",
        К: "K",
        Л: "L",
        М: "M",
        Н: "N",
        О: "O",
        П: "P",
        Р: "R",
        С: "S",
        Т: "T",
        У: "U",
        Ф: "F",
        Х: "Kh",
        Ц: "C",
        Ч: "Ch",
        Ш: "Sh",
        Щ: "Sh",
        Ъ: "",
        Ы: "Y",
        Ь: "",
        Э: "E",
        Ю: "Yu",
        Я: "Ya",
        // Serbian
        ђ: "dj",
        ј: "j",
        // 'љ': 'lj',  // duplicate
        // 'њ': 'nj', // duplicate
        ћ: "c",
        џ: "dz",
        Ђ: "Dj",
        Ј: "j",
        // 'Љ': 'Lj', // duplicate
        // 'Њ': 'Nj', // duplicate
        Ћ: "C",
        Џ: "Dz",
        // Slovak
        ľ: "l",
        ĺ: "l",
        ŕ: "r",
        Ľ: "L",
        Ĺ: "L",
        Ŕ: "R",
        // Turkish
        ş: "s",
        Ş: "S",
        ı: "i",
        İ: "I",
        // 'ç': 'c', // duplicate
        // 'Ç': 'C', // duplicate
        // 'ü': 'u', // duplicate, see langCharMap
        // 'Ü': 'U', // duplicate, see langCharMap
        // 'ö': 'o', // duplicate, see langCharMap
        // 'Ö': 'O', // duplicate, see langCharMap
        ğ: "g",
        Ğ: "G",
        // Vietnamese
        ả: "a",
        Ả: "A",
        ẳ: "a",
        Ẳ: "A",
        ẩ: "a",
        Ẩ: "A",
        đ: "d",
        Đ: "D",
        ẹ: "e",
        Ẹ: "E",
        ẽ: "e",
        Ẽ: "E",
        ẻ: "e",
        Ẻ: "E",
        ế: "e",
        Ế: "E",
        ề: "e",
        Ề: "E",
        ệ: "e",
        Ệ: "E",
        ễ: "e",
        Ễ: "E",
        ể: "e",
        Ể: "E",
        ỏ: "o",
        ọ: "o",
        Ọ: "o",
        ố: "o",
        Ố: "O",
        ồ: "o",
        Ồ: "O",
        ổ: "o",
        Ổ: "O",
        ộ: "o",
        Ộ: "O",
        ỗ: "o",
        Ỗ: "O",
        ơ: "o",
        Ơ: "O",
        ớ: "o",
        Ớ: "O",
        ờ: "o",
        Ờ: "O",
        ợ: "o",
        Ợ: "O",
        ỡ: "o",
        Ỡ: "O",
        Ở: "o",
        ở: "o",
        ị: "i",
        Ị: "I",
        ĩ: "i",
        Ĩ: "I",
        ỉ: "i",
        Ỉ: "i",
        ủ: "u",
        Ủ: "U",
        ụ: "u",
        Ụ: "U",
        ũ: "u",
        Ũ: "U",
        ư: "u",
        Ư: "U",
        ứ: "u",
        Ứ: "U",
        ừ: "u",
        Ừ: "U",
        ự: "u",
        Ự: "U",
        ữ: "u",
        Ữ: "U",
        ử: "u",
        Ử: "ư",
        ỷ: "y",
        Ỷ: "y",
        ỳ: "y",
        Ỳ: "Y",
        ỵ: "y",
        Ỵ: "Y",
        ỹ: "y",
        Ỹ: "Y",
        ạ: "a",
        Ạ: "A",
        ấ: "a",
        Ấ: "A",
        ầ: "a",
        Ầ: "A",
        ậ: "a",
        Ậ: "A",
        ẫ: "a",
        Ẫ: "A",
        // 'ă': 'a', // duplicate
        // 'Ă': 'A', // duplicate
        ắ: "a",
        Ắ: "A",
        ằ: "a",
        Ằ: "A",
        ặ: "a",
        Ặ: "A",
        ẵ: "a",
        Ẵ: "A",
        "⓪": "0",
        "①": "1",
        "②": "2",
        "③": "3",
        "④": "4",
        "⑤": "5",
        "⑥": "6",
        "⑦": "7",
        "⑧": "8",
        "⑨": "9",
        "⑩": "10",
        "⑪": "11",
        "⑫": "12",
        "⑬": "13",
        "⑭": "14",
        "⑮": "15",
        "⑯": "16",
        "⑰": "17",
        "⑱": "18",
        "⑲": "18",
        "⑳": "18",
        "⓵": "1",
        "⓶": "2",
        "⓷": "3",
        "⓸": "4",
        "⓹": "5",
        "⓺": "6",
        "⓻": "7",
        "⓼": "8",
        "⓽": "9",
        "⓾": "10",
        "⓿": "0",
        "⓫": "11",
        "⓬": "12",
        "⓭": "13",
        "⓮": "14",
        "⓯": "15",
        "⓰": "16",
        "⓱": "17",
        "⓲": "18",
        "⓳": "19",
        "⓴": "20",
        "Ⓐ": "A",
        "Ⓑ": "B",
        "Ⓒ": "C",
        "Ⓓ": "D",
        "Ⓔ": "E",
        "Ⓕ": "F",
        "Ⓖ": "G",
        "Ⓗ": "H",
        "Ⓘ": "I",
        "Ⓙ": "J",
        "Ⓚ": "K",
        "Ⓛ": "L",
        "Ⓜ": "M",
        "Ⓝ": "N",
        "Ⓞ": "O",
        "Ⓟ": "P",
        "Ⓠ": "Q",
        "Ⓡ": "R",
        "Ⓢ": "S",
        "Ⓣ": "T",
        "Ⓤ": "U",
        "Ⓥ": "V",
        "Ⓦ": "W",
        "Ⓧ": "X",
        "Ⓨ": "Y",
        "Ⓩ": "Z",
        "ⓐ": "a",
        "ⓑ": "b",
        "ⓒ": "c",
        "ⓓ": "d",
        "ⓔ": "e",
        "ⓕ": "f",
        "ⓖ": "g",
        "ⓗ": "h",
        "ⓘ": "i",
        "ⓙ": "j",
        "ⓚ": "k",
        "ⓛ": "l",
        "ⓜ": "m",
        "ⓝ": "n",
        "ⓞ": "o",
        "ⓟ": "p",
        "ⓠ": "q",
        "ⓡ": "r",
        "ⓢ": "s",
        "ⓣ": "t",
        "ⓤ": "u",
        "ⓦ": "v",
        "ⓥ": "w",
        "ⓧ": "x",
        "ⓨ": "y",
        "ⓩ": "z",
        // symbols
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
        "∂": "d",
        ƒ: "f",
        "™": "(TM)",
        "©": "(C)",
        œ: "oe",
        Œ: "OE",
        "®": "(R)",
        "†": "+",
        "℠": "(SM)",
        "…": "...",
        "˚": "o",
        º: "o",
        ª: "a",
        "•": "*",
        "၊": ",",
        "။": ".",
        // currency
        $: "USD",
        "€": "EUR",
        "₢": "BRN",
        "₣": "FRF",
        "£": "GBP",
        "₤": "ITL",
        "₦": "NGN",
        "₧": "ESP",
        "₩": "KRW",
        "₪": "ILS",
        "₫": "VND",
        "₭": "LAK",
        "₮": "MNT",
        "₯": "GRD",
        "₱": "ARS",
        "₲": "PYG",
        "₳": "ARA",
        "₴": "UAH",
        "₵": "GHS",
        "¢": "cent",
        "¥": "CNY",
        元: "CNY",
        円: "YEN",
        "﷼": "IRR",
        "₠": "EWE",
        "฿": "THB",
        "₨": "INR",
        "₹": "INR",
        "₰": "PF",
        "₺": "TRY",
        "؋": "AFN",
        "₼": "AZN",
        лв: "BGN",
        "៛": "KHR",
        "₡": "CRC",
        "₸": "KZT",
        ден: "MKD",
        zł: "PLN",
        "₽": "RUB",
        "₾": "GEL"
      }, o = [
        // burmese
        "်",
        // Dhivehi
        "ް"
      ], i = {
        // Burmese
        // dependent vowels
        "ာ": "a",
        "ါ": "a",
        "ေ": "e",
        "ဲ": "e",
        "ိ": "i",
        "ီ": "i",
        "ို": "o",
        "ု": "u",
        "ူ": "u",
        "ေါင်": "aung",
        "ော": "aw",
        "ော်": "aw",
        "ေါ": "aw",
        "ေါ်": "aw",
        "်": "်",
        // this is special case but the character will be converted to latin in the code
        "က်": "et",
        "ိုက်": "aik",
        "ောက်": "auk",
        "င်": "in",
        "ိုင်": "aing",
        "ောင်": "aung",
        "စ်": "it",
        "ည်": "i",
        "တ်": "at",
        "ိတ်": "eik",
        "ုတ်": "ok",
        "ွတ်": "ut",
        "ေတ်": "it",
        "ဒ်": "d",
        "ိုဒ်": "ok",
        "ုဒ်": "ait",
        "န်": "an",
        "ာန်": "an",
        "ိန်": "ein",
        "ုန်": "on",
        "ွန်": "un",
        "ပ်": "at",
        "ိပ်": "eik",
        "ုပ်": "ok",
        "ွပ်": "ut",
        "န်ုပ်": "nub",
        "မ်": "an",
        "ိမ်": "ein",
        "ုမ်": "on",
        "ွမ်": "un",
        "ယ်": "e",
        "ိုလ်": "ol",
        "ဉ်": "in",
        "ံ": "an",
        "ိံ": "ein",
        "ုံ": "on",
        // Dhivehi
        "ައް": "ah",
        "ަށް": "ah"
      }, a = {
        en: {},
        // default language
        az: {
          // Azerbaijani
          ç: "c",
          ə: "e",
          ğ: "g",
          ı: "i",
          ö: "o",
          ş: "s",
          ü: "u",
          Ç: "C",
          Ə: "E",
          Ğ: "G",
          İ: "I",
          Ö: "O",
          Ş: "S",
          Ü: "U"
        },
        cs: {
          // Czech
          č: "c",
          ď: "d",
          ě: "e",
          ň: "n",
          ř: "r",
          š: "s",
          ť: "t",
          ů: "u",
          ž: "z",
          Č: "C",
          Ď: "D",
          Ě: "E",
          Ň: "N",
          Ř: "R",
          Š: "S",
          Ť: "T",
          Ů: "U",
          Ž: "Z"
        },
        fi: {
          // Finnish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          ä: "a",
          // ok
          Ä: "A",
          // ok
          ö: "o",
          // ok
          Ö: "O"
          // ok
        },
        hu: {
          // Hungarian
          ä: "a",
          // ok
          Ä: "A",
          // ok
          // 'á': 'a', duplicate see charMap/latin
          // 'Á': 'A', duplicate see charMap/latin
          ö: "o",
          // ok
          Ö: "O",
          // ok
          // 'ő': 'o', duplicate see charMap/latin
          // 'Ő': 'O', duplicate see charMap/latin
          ü: "u",
          Ü: "U",
          ű: "u",
          Ű: "U"
        },
        lt: {
          // Lithuanian
          ą: "a",
          č: "c",
          ę: "e",
          ė: "e",
          į: "i",
          š: "s",
          ų: "u",
          ū: "u",
          ž: "z",
          Ą: "A",
          Č: "C",
          Ę: "E",
          Ė: "E",
          Į: "I",
          Š: "S",
          Ų: "U",
          Ū: "U"
        },
        lv: {
          // Latvian
          ā: "a",
          č: "c",
          ē: "e",
          ģ: "g",
          ī: "i",
          ķ: "k",
          ļ: "l",
          ņ: "n",
          š: "s",
          ū: "u",
          ž: "z",
          Ā: "A",
          Č: "C",
          Ē: "E",
          Ģ: "G",
          Ī: "i",
          Ķ: "k",
          Ļ: "L",
          Ņ: "N",
          Š: "S",
          Ū: "u",
          Ž: "Z"
        },
        pl: {
          // Polish
          ą: "a",
          ć: "c",
          ę: "e",
          ł: "l",
          ń: "n",
          ó: "o",
          ś: "s",
          ź: "z",
          ż: "z",
          Ą: "A",
          Ć: "C",
          Ę: "e",
          Ł: "L",
          Ń: "N",
          Ó: "O",
          Ś: "S",
          Ź: "Z",
          Ż: "Z"
        },
        sv: {
          // Swedish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          ä: "a",
          // ok
          Ä: "A",
          // ok
          ö: "o",
          // ok
          Ö: "O"
          // ok
        },
        sk: {
          // Slovak
          ä: "a",
          Ä: "A"
        },
        sr: {
          // Serbian
          љ: "lj",
          њ: "nj",
          Љ: "Lj",
          Њ: "Nj",
          đ: "dj",
          Đ: "Dj"
        },
        tr: {
          // Turkish
          Ü: "U",
          Ö: "O",
          ü: "u",
          ö: "o"
        }
      }, l = {
        ar: {
          "∆": "delta",
          "∞": "la-nihaya",
          "♥": "hob",
          "&": "wa",
          "|": "aw",
          "<": "aqal-men",
          ">": "akbar-men",
          "∑": "majmou",
          "¤": "omla"
        },
        az: {},
        ca: {
          "∆": "delta",
          "∞": "infinit",
          "♥": "amor",
          "&": "i",
          "|": "o",
          "<": "menys que",
          ">": "mes que",
          "∑": "suma dels",
          "¤": "moneda"
        },
        cs: {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "nebo",
          "<": "mensi nez",
          ">": "vetsi nez",
          "∑": "soucet",
          "¤": "mena"
        },
        de: {
          "∆": "delta",
          "∞": "unendlich",
          "♥": "Liebe",
          "&": "und",
          "|": "oder",
          "<": "kleiner als",
          ">": "groesser als",
          "∑": "Summe von",
          "¤": "Waehrung"
        },
        dv: {
          "∆": "delta",
          "∞": "kolunulaa",
          "♥": "loabi",
          "&": "aai",
          "|": "noonee",
          "<": "ah vure kuda",
          ">": "ah vure bodu",
          "∑": "jumula",
          "¤": "faisaa"
        },
        en: {
          "∆": "delta",
          "∞": "infinity",
          "♥": "love",
          "&": "and",
          "|": "or",
          "<": "less than",
          ">": "greater than",
          "∑": "sum",
          "¤": "currency"
        },
        es: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "y",
          "|": "u",
          "<": "menos que",
          ">": "mas que",
          "∑": "suma de los",
          "¤": "moneda"
        },
        fa: {
          "∆": "delta",
          "∞": "bi-nahayat",
          "♥": "eshgh",
          "&": "va",
          "|": "ya",
          "<": "kamtar-az",
          ">": "bishtar-az",
          "∑": "majmooe",
          "¤": "vahed"
        },
        fi: {
          "∆": "delta",
          "∞": "aarettomyys",
          "♥": "rakkaus",
          "&": "ja",
          "|": "tai",
          "<": "pienempi kuin",
          ">": "suurempi kuin",
          "∑": "summa",
          "¤": "valuutta"
        },
        fr: {
          "∆": "delta",
          "∞": "infiniment",
          "♥": "Amour",
          "&": "et",
          "|": "ou",
          "<": "moins que",
          ">": "superieure a",
          "∑": "somme des",
          "¤": "monnaie"
        },
        ge: {
          "∆": "delta",
          "∞": "usasruloba",
          "♥": "siqvaruli",
          "&": "da",
          "|": "an",
          "<": "naklebi",
          ">": "meti",
          "∑": "jami",
          "¤": "valuta"
        },
        gr: {},
        hu: {
          "∆": "delta",
          "∞": "vegtelen",
          "♥": "szerelem",
          "&": "es",
          "|": "vagy",
          "<": "kisebb mint",
          ">": "nagyobb mint",
          "∑": "szumma",
          "¤": "penznem"
        },
        it: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amore",
          "&": "e",
          "|": "o",
          "<": "minore di",
          ">": "maggiore di",
          "∑": "somma",
          "¤": "moneta"
        },
        lt: {
          "∆": "delta",
          "∞": "begalybe",
          "♥": "meile",
          "&": "ir",
          "|": "ar",
          "<": "maziau nei",
          ">": "daugiau nei",
          "∑": "suma",
          "¤": "valiuta"
        },
        lv: {
          "∆": "delta",
          "∞": "bezgaliba",
          "♥": "milestiba",
          "&": "un",
          "|": "vai",
          "<": "mazak neka",
          ">": "lielaks neka",
          "∑": "summa",
          "¤": "valuta"
        },
        my: {
          "∆": "kwahkhyaet",
          "∞": "asaonasme",
          "♥": "akhyait",
          "&": "nhin",
          "|": "tho",
          "<": "ngethaw",
          ">": "kyithaw",
          "∑": "paungld",
          "¤": "ngwekye"
        },
        mk: {},
        nl: {
          "∆": "delta",
          "∞": "oneindig",
          "♥": "liefde",
          "&": "en",
          "|": "of",
          "<": "kleiner dan",
          ">": "groter dan",
          "∑": "som",
          "¤": "valuta"
        },
        pl: {
          "∆": "delta",
          "∞": "nieskonczonosc",
          "♥": "milosc",
          "&": "i",
          "|": "lub",
          "<": "mniejsze niz",
          ">": "wieksze niz",
          "∑": "suma",
          "¤": "waluta"
        },
        pt: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "e",
          "|": "ou",
          "<": "menor que",
          ">": "maior que",
          "∑": "soma",
          "¤": "moeda"
        },
        ro: {
          "∆": "delta",
          "∞": "infinit",
          "♥": "dragoste",
          "&": "si",
          "|": "sau",
          "<": "mai mic ca",
          ">": "mai mare ca",
          "∑": "suma",
          "¤": "valuta"
        },
        ru: {
          "∆": "delta",
          "∞": "beskonechno",
          "♥": "lubov",
          "&": "i",
          "|": "ili",
          "<": "menshe",
          ">": "bolshe",
          "∑": "summa",
          "¤": "valjuta"
        },
        sk: {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "alebo",
          "<": "menej ako",
          ">": "viac ako",
          "∑": "sucet",
          "¤": "mena"
        },
        sr: {},
        tr: {
          "∆": "delta",
          "∞": "sonsuzluk",
          "♥": "ask",
          "&": "ve",
          "|": "veya",
          "<": "kucuktur",
          ">": "buyuktur",
          "∑": "toplam",
          "¤": "para birimi"
        },
        uk: {
          "∆": "delta",
          "∞": "bezkinechnist",
          "♥": "lubov",
          "&": "i",
          "|": "abo",
          "<": "menshe",
          ">": "bilshe",
          "∑": "suma",
          "¤": "valjuta"
        },
        vn: {
          "∆": "delta",
          "∞": "vo cuc",
          "♥": "yeu",
          "&": "va",
          "|": "hoac",
          "<": "nho hon",
          ">": "lon hon",
          "∑": "tong",
          "¤": "tien te"
        }
      }, s = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join(""), u = [";", "?", ":", "@", "&", "=", "+", "$", ","].join(""), d = [".", "!", "~", "*", "'", "(", ")"].join(""), c = function(p, _) {
        var C = "-", S = "", A = "", I = !0, k = {}, H, b, h, O, x, T, E, V, B, M, N, q, te, ce, ne = "";
        if (typeof p != "string")
          return "";
        if (typeof _ == "string" && (C = _), E = l.en, V = a.en, typeof _ == "object") {
          H = _.maintainCase || !1, k = _.custom && typeof _.custom == "object" ? _.custom : k, h = +_.truncate > 1 && _.truncate || !1, O = _.uric || !1, x = _.uricNoSlash || !1, T = _.mark || !1, I = !(_.symbols === !1 || _.lang === !1), C = _.separator || C, O && (ne += s), x && (ne += u), T && (ne += d), E = _.lang && l[_.lang] && I ? l[_.lang] : I ? l.en : {}, V = _.lang && a[_.lang] ? a[_.lang] : _.lang === !1 || _.lang === !0 ? {} : a.en, _.titleCase && typeof _.titleCase.length == "number" && Array.prototype.toString.call(_.titleCase) ? (_.titleCase.forEach(function(J) {
            k[J + ""] = J + "";
          }), b = !0) : b = !!_.titleCase, _.custom && typeof _.custom.length == "number" && Array.prototype.toString.call(_.custom) && _.custom.forEach(function(J) {
            k[J + ""] = J + "";
          }), Object.keys(k).forEach(function(J) {
            var ye;
            J.length > 1 ? ye = new RegExp("\\b" + m(J) + "\\b", "gi") : ye = new RegExp(m(J), "gi"), p = p.replace(ye, k[J]);
          });
          for (N in k)
            ne += N;
        }
        for (ne += C, ne = m(ne), p = p.replace(/(^\s+|\s+$)/g, ""), te = !1, ce = !1, M = 0, q = p.length; M < q; M++)
          N = p[M], f(N, k) ? te = !1 : V[N] ? (N = te && V[N].match(/[A-Za-z0-9]/) ? " " + V[N] : V[N], te = !1) : N in r ? (M + 1 < q && o.indexOf(p[M + 1]) >= 0 ? (A += N, N = "") : ce === !0 ? (N = i[A] + r[N], A = "") : N = te && r[N].match(/[A-Za-z0-9]/) ? " " + r[N] : r[N], te = !1, ce = !1) : N in i ? (A += N, N = "", M === q - 1 && (N = i[A]), ce = !0) : /* process symbol chars */ E[N] && !(O && s.indexOf(N) !== -1) && !(x && u.indexOf(N) !== -1) ? (N = te || S.substr(-1).match(/[A-Za-z0-9]/) ? C + E[N] : E[N], N += p[M + 1] !== void 0 && p[M + 1].match(/[A-Za-z0-9]/) ? C : "", te = !0) : (ce === !0 ? (N = i[A] + N, A = "", ce = !1) : te && (/[A-Za-z0-9]/.test(N) || S.substr(-1).match(/A-Za-z0-9]/)) && (N = " " + N), te = !1), S += N.replace(new RegExp("[^\\w\\s" + ne + "_-]", "g"), C);
        return b && (S = S.replace(/(\w)(\S*)/g, function(J, ye, Ne) {
          var Nr = ye.toUpperCase() + (Ne !== null ? Ne : "");
          return Object.keys(k).indexOf(Nr.toLowerCase()) < 0 ? Nr : Nr.toLowerCase();
        })), S = S.replace(/\s+/g, C).replace(new RegExp("\\" + C + "+", "g"), C).replace(new RegExp("(^\\" + C + "+|\\" + C + "+$)", "g"), ""), h && S.length > h && (B = S.charAt(h) === C, S = S.slice(0, h), B || (S = S.slice(0, S.lastIndexOf(C)))), !H && !b && (S = S.toLowerCase()), S;
      }, v = function(p) {
        return function(C) {
          return c(C, p);
        };
      }, m = function(p) {
        return p.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
      }, f = function(g, p) {
        for (var _ in p)
          if (p[_] === g)
            return !0;
      };
      if (typeof t < "u" && t.exports)
        t.exports = c, t.exports.createSlug = v;
      else if (typeof define < "u" && define.amd)
        define([], function() {
          return c;
        });
      else
        try {
          if (n.getSlug || n.createSlug)
            throw "speakingurl: globals exists /(getSlug|createSlug)/";
          n.getSlug = c, n.createSlug = v;
        } catch {
        }
    })(e);
  }
}), Kd = es({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
    y(), t.exports = $d();
  }
});
y();
y();
y();
y();
y();
y();
y();
y();
function Wd(e) {
  var t;
  const n = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
  return n === "index" && ((t = e.__file) != null && t.endsWith("index.vue")) ? "" : n;
}
function Gd(e) {
  const t = e.__file;
  if (t)
    return Dd(kd(t, ".vue"));
}
function Ci(e, t) {
  return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function jo(e) {
  if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
    return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  if (e.root)
    return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function ts(e) {
  var t, n;
  const r = (t = e.subTree) == null ? void 0 : t.type, o = jo(e);
  return o ? ((n = o?.types) == null ? void 0 : n.Fragment) === r : !1;
}
function Ar(e) {
  var t, n, r;
  const o = Wd(e?.type || {});
  if (o)
    return o;
  if (e?.root === e)
    return "Root";
  for (const a in (n = (t = e.parent) == null ? void 0 : t.type) == null ? void 0 : n.components)
    if (e.parent.type.components[a] === e?.type)
      return Ci(e, a);
  for (const a in (r = e.appContext) == null ? void 0 : r.components)
    if (e.appContext.components[a] === e?.type)
      return Ci(e, a);
  const i = Gd(e?.type || {});
  return i || "Anonymous Component";
}
function Yd(e) {
  var t, n, r;
  const o = (r = (n = (t = e?.appContext) == null ? void 0 : t.app) == null ? void 0 : n.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? r : 0, i = e === e?.root ? "root" : e.uid;
  return `${o}:${i}`;
}
function go(e, t) {
  return t = t || `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function Jd() {
  const e = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    get width() {
      return e.right - e.left;
    },
    get height() {
      return e.bottom - e.top;
    }
  };
  return e;
}
var kn;
function Xd(e) {
  return kn || (kn = document.createRange()), kn.selectNode(e), kn.getBoundingClientRect();
}
function Zd(e) {
  const t = Jd();
  if (!e.children)
    return t;
  for (let n = 0, r = e.children.length; n < r; n++) {
    const o = e.children[n];
    let i;
    if (o.component)
      i = pt(o.component);
    else if (o.el) {
      const a = o.el;
      a.nodeType === 1 || a.getBoundingClientRect ? i = a.getBoundingClientRect() : a.nodeType === 3 && a.data.trim() && (i = Xd(a));
    }
    i && Qd(t, i);
  }
  return t;
}
function Qd(e, t) {
  return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
var xi = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function pt(e) {
  const t = e.subTree.el;
  return typeof window > "u" ? xi : ts(e) ? Zd(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? pt(e.subTree.component) : xi;
}
y();
function qo(e) {
  return ts(e) ? ef(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function ef(e) {
  if (!e.children)
    return [];
  const t = [];
  return e.children.forEach((n) => {
    n.component ? t.push(...qo(n.component)) : n?.el && t.push(n.el);
  }), t;
}
var ns = "__vue-devtools-component-inspector__", rs = "__vue-devtools-component-inspector__card__", os = "__vue-devtools-component-inspector__name__", is = "__vue-devtools-component-inspector__indicator__", as = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
}, tf = {
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "5px 8px",
  borderRadius: "4px",
  textAlign: "left",
  position: "absolute",
  left: 0,
  color: "#e9e9e9",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "24px",
  backgroundColor: "#42b883",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
}, nf = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function Vt() {
  return document.getElementById(ns);
}
function rf() {
  return document.getElementById(rs);
}
function of() {
  return document.getElementById(is);
}
function af() {
  return document.getElementById(os);
}
function $o(e) {
  return {
    left: `${Math.round(e.left * 100) / 100}px`,
    top: `${Math.round(e.top * 100) / 100}px`,
    width: `${Math.round(e.width * 100) / 100}px`,
    height: `${Math.round(e.height * 100) / 100}px`
  };
}
function Ko(e) {
  var t;
  const n = document.createElement("div");
  n.id = (t = e.elementId) != null ? t : ns, Object.assign(n.style, {
    ...as,
    ...$o(e.bounds),
    ...e.style
  });
  const r = document.createElement("span");
  r.id = rs, Object.assign(r.style, {
    ...tf,
    top: e.bounds.top < 35 ? 0 : "-35px"
  });
  const o = document.createElement("span");
  o.id = os, o.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
  const i = document.createElement("i");
  return i.id = is, i.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(i.style, nf), r.appendChild(o), r.appendChild(i), n.appendChild(r), document.body.appendChild(n), n;
}
function Wo(e) {
  const t = Vt(), n = rf(), r = af(), o = of();
  t && (Object.assign(t.style, {
    ...as,
    ...$o(e.bounds)
  }), Object.assign(n.style, {
    top: e.bounds.top < 35 ? 0 : "-35px"
  }), r.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, o.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function lf(e) {
  const t = pt(e);
  if (!t.width && !t.height)
    return;
  const n = Ar(e);
  Vt() ? Wo({ bounds: t, name: n }) : Ko({ bounds: t, name: n });
}
function ls() {
  const e = Vt();
  e && (e.style.display = "none");
}
var _o = null;
function Eo(e) {
  const t = e.target;
  if (t) {
    const n = t.__vueParentComponent;
    if (n && (_o = n, n.vnode.el)) {
      const o = pt(n), i = Ar(n);
      Vt() ? Wo({ bounds: o, name: i }) : Ko({ bounds: o, name: i });
    }
  }
}
function sf(e, t) {
  if (e.preventDefault(), e.stopPropagation(), _o) {
    const n = Yd(_o);
    t(n);
  }
}
var fr = null;
function uf() {
  ls(), window.removeEventListener("mouseover", Eo), window.removeEventListener("click", fr, !0), fr = null;
}
function cf() {
  return window.addEventListener("mouseover", Eo), new Promise((e) => {
    function t(n) {
      n.preventDefault(), n.stopPropagation(), sf(n, (r) => {
        window.removeEventListener("click", t, !0), fr = null, window.removeEventListener("mouseover", Eo);
        const o = Vt();
        o && (o.style.display = "none"), e(JSON.stringify({ id: r }));
      });
    }
    fr = t, window.addEventListener("click", t, !0);
  });
}
function df(e) {
  const t = go(ue.value, e.id);
  if (t) {
    const [n] = qo(t);
    if (typeof n.scrollIntoView == "function")
      n.scrollIntoView({
        behavior: "smooth"
      });
    else {
      const r = pt(t), o = document.createElement("div"), i = {
        ...$o(r),
        position: "absolute"
      };
      Object.assign(o.style, i), document.body.appendChild(o), o.scrollIntoView({
        behavior: "smooth"
      }), setTimeout(() => {
        document.body.removeChild(o);
      }, 2e3);
    }
    setTimeout(() => {
      const r = pt(t);
      if (r.width || r.height) {
        const o = Ar(t), i = Vt();
        i ? Wo({ ...e, name: o, bounds: r }) : Ko({ ...e, name: o, bounds: r }), setTimeout(() => {
          i && (i.style.display = "none");
        }, 1500);
      }
    }, 1200);
  }
}
y();
var Ti, Ai;
(Ai = (Ti = D).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null || (Ti.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function ff(e) {
  let t = 0;
  const n = setInterval(() => {
    D.__VUE_INSPECTOR__ && (clearInterval(n), t += 30, e()), t >= /* 5s */
    5e3 && clearInterval(n);
  }, 30);
}
function pf() {
  const e = D.__VUE_INSPECTOR__, t = e.openInEditor;
  e.openInEditor = async (...n) => {
    e.disable(), t(...n);
  };
}
function vf() {
  return new Promise((e) => {
    function t() {
      pf(), e(D.__VUE_INSPECTOR__);
    }
    D.__VUE_INSPECTOR__ ? t() : ff(() => {
      t();
    });
  });
}
y();
y();
function mf(e) {
  return !!(e && e.__v_isReadonly);
}
function ss(e) {
  return mf(e) ? ss(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Vr(e) {
  return !!(e && e.__v_isRef === !0);
}
function Wt(e) {
  const t = e && e.__v_raw;
  return t ? Wt(t) : e;
}
var hf = class {
  constructor() {
    this.refEditor = new gf();
  }
  set(e, t, n, r) {
    const o = Array.isArray(t) ? t : t.split(".");
    for (; o.length > 1; ) {
      const l = o.shift();
      e instanceof Map ? e = e.get(l) : e instanceof Set ? e = Array.from(e.values())[l] : e = e[l], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    const i = o[0], a = this.refEditor.get(e)[i];
    r ? r(e, i, n) : this.refEditor.isRef(a) ? this.refEditor.set(a, n) : e[i] = n;
  }
  get(e, t) {
    const n = Array.isArray(t) ? t : t.split(".");
    for (let r = 0; r < n.length; r++)
      if (e instanceof Map ? e = e.get(n[r]) : e = e[n[r]], this.refEditor.isRef(e) && (e = this.refEditor.get(e)), !e)
        return;
    return e;
  }
  has(e, t, n = !1) {
    if (typeof e > "u")
      return !1;
    const r = Array.isArray(t) ? t.slice() : t.split("."), o = n ? 2 : 1;
    for (; e && r.length > o; ) {
      const i = r.shift();
      e = e[i], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    return e != null && Object.prototype.hasOwnProperty.call(e, r[0]);
  }
  createDefaultSetCallback(e) {
    return (t, n, r) => {
      if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(n, 1) : Wt(t) instanceof Map ? t.delete(n) : Wt(t) instanceof Set ? t.delete(Array.from(t.values())[n]) : Reflect.deleteProperty(t, n)), !e.remove) {
        const o = t[e.newKey || n];
        this.refEditor.isRef(o) ? this.refEditor.set(o, r) : Wt(t) instanceof Map ? t.set(e.newKey || n, r) : Wt(t) instanceof Set ? t.add(r) : t[e.newKey || n] = r;
      }
    };
  }
}, gf = class {
  set(e, t) {
    if (Vr(e))
      e.value = t;
    else {
      if (e instanceof Set && Array.isArray(t)) {
        e.clear(), t.forEach((o) => e.add(o));
        return;
      }
      const n = Object.keys(t);
      if (e instanceof Map) {
        const o = new Set(e.keys());
        n.forEach((i) => {
          e.set(i, Reflect.get(t, i)), o.delete(i);
        }), o.forEach((i) => e.delete(i));
        return;
      }
      const r = new Set(Object.keys(e));
      n.forEach((o) => {
        Reflect.set(e, o, Reflect.get(t, o)), r.delete(o);
      }), r.forEach((o) => Reflect.deleteProperty(e, o));
    }
  }
  get(e) {
    return Vr(e) ? e.value : e;
  }
  isRef(e) {
    return Vr(e) || ss(e);
  }
};
y();
y();
y();
var _f = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function Ef() {
  if (typeof window > "u" || !Jl || typeof localStorage > "u" || localStorage === null)
    return {
      recordingState: !1,
      mouseEventEnabled: !1,
      keyboardEventEnabled: !1,
      componentEventEnabled: !1,
      performanceEventEnabled: !1,
      selected: ""
    };
  const e = typeof localStorage.getItem < "u" ? localStorage.getItem(_f) : null;
  return e ? JSON.parse(e) : {
    recordingState: !1,
    mouseEventEnabled: !1,
    keyboardEventEnabled: !1,
    componentEventEnabled: !1,
    performanceEventEnabled: !1,
    selected: ""
  };
}
y();
y();
y();
var Oi, Di;
(Di = (Oi = D).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null || (Oi.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var yf = new Proxy(D.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
});
function bf(e, t) {
  ee.timelineLayersState[t.id] = !1, yf.push({
    ...e,
    descriptorId: t.id,
    appRecord: jo(t.app)
  });
}
var ki, Ii;
(Ii = (ki = D).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null || (ki.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var Go = new Proxy(D.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
}), us = Dt(() => {
  Mt.hooks.callHook("sendInspectorToClient", cs());
});
function Sf(e, t) {
  var n, r;
  Go.push({
    options: e,
    descriptor: t,
    treeFilterPlaceholder: (n = e.treeFilterPlaceholder) != null ? n : "Search tree...",
    stateFilterPlaceholder: (r = e.stateFilterPlaceholder) != null ? r : "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: jo(t.app)
  }), us();
}
function cs() {
  return Go.filter((e) => e.descriptor.app === ue.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
    var t;
    const n = e.descriptor, r = e.options;
    return {
      id: r.id,
      label: r.label,
      logo: n.logo,
      icon: `custom-ic-baseline-${(t = r?.icon) == null ? void 0 : t.replace(/_/g, "-")}`,
      packageName: n.packageName,
      homepage: n.homepage,
      pluginId: n.id
    };
  });
}
function Wn(e, t) {
  return Go.find((n) => n.options.id === e && (t ? n.descriptor.app === t : !0));
}
function wf() {
  const e = Zl();
  e.hook("addInspector", ({ inspector: r, plugin: o }) => {
    Sf(r, o.descriptor);
  });
  const t = Dt(async ({ inspectorId: r, plugin: o }) => {
    var i;
    if (!r || !((i = o?.descriptor) != null && i.app) || ee.highPerfModeEnabled)
      return;
    const a = Wn(r, o.descriptor.app), l = {
      app: o.descriptor.app,
      inspectorId: r,
      filter: a?.treeFilter || "",
      rootNodes: []
    };
    await new Promise((s) => {
      e.callHookWith(
        async (u) => {
          await Promise.all(u.map((d) => d(l))), s();
        },
        "getInspectorTree"
        /* GET_INSPECTOR_TREE */
      );
    }), e.callHookWith(
      async (s) => {
        await Promise.all(s.map((u) => u({
          inspectorId: r,
          rootNodes: l.rootNodes
        })));
      },
      "sendInspectorTreeToClient"
      /* SEND_INSPECTOR_TREE_TO_CLIENT */
    );
  }, 120);
  e.hook("sendInspectorTree", t);
  const n = Dt(async ({ inspectorId: r, plugin: o }) => {
    var i;
    if (!r || !((i = o?.descriptor) != null && i.app) || ee.highPerfModeEnabled)
      return;
    const a = Wn(r, o.descriptor.app), l = {
      app: o.descriptor.app,
      inspectorId: r,
      nodeId: a?.selectedNodeId || "",
      state: null
    }, s = {
      currentTab: `custom-inspector:${r}`
    };
    l.nodeId && await new Promise((u) => {
      e.callHookWith(
        async (d) => {
          await Promise.all(d.map((c) => c(l, s))), u();
        },
        "getInspectorState"
        /* GET_INSPECTOR_STATE */
      );
    }), e.callHookWith(
      async (u) => {
        await Promise.all(u.map((d) => d({
          inspectorId: r,
          nodeId: l.nodeId,
          state: l.state
        })));
      },
      "sendInspectorStateToClient"
      /* SEND_INSPECTOR_STATE_TO_CLIENT */
    );
  }, 120);
  return e.hook("sendInspectorState", n), e.hook("customInspectorSelectNode", ({ inspectorId: r, nodeId: o, plugin: i }) => {
    const a = Wn(r, i.descriptor.app);
    a && (a.selectedNodeId = o);
  }), e.hook("timelineLayerAdded", ({ options: r, plugin: o }) => {
    bf(r, o.descriptor);
  }), e.hook("timelineEventAdded", ({ options: r, plugin: o }) => {
    var i;
    const a = ["performance", "component-event", "keyboard", "mouse"];
    ee.highPerfModeEnabled || !((i = ee.timelineLayersState) != null && i[o.descriptor.id]) && !a.includes(r.layerId) || e.callHookWith(
      async (l) => {
        await Promise.all(l.map((s) => s(r)));
      },
      "sendTimelineEventToClient"
      /* SEND_TIMELINE_EVENT_TO_CLIENT */
    );
  }), e.hook("getComponentInstances", async ({ app: r }) => {
    const o = r.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!o)
      return null;
    const i = o.id.toString();
    return [...o.instanceMap].filter(([l]) => l.split(":")[0] === i).map(([, l]) => l);
  }), e.hook("getComponentBounds", async ({ instance: r }) => pt(r)), e.hook("getComponentName", ({ instance: r }) => Ar(r)), e.hook("componentHighlight", ({ uid: r }) => {
    const o = ue.value.instanceMap.get(r);
    o && lf(o);
  }), e.hook("componentUnhighlight", () => {
    ls();
  }), e;
}
var Ni, Li;
(Li = (Ni = D).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null || (Ni.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var Pi, Ri;
(Ri = (Pi = D).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null || (Pi.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var Vi, Mi;
(Mi = (Vi = D).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null || (Vi.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var Fi, Bi;
(Bi = (Fi = D).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null || (Fi.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var Ui, zi;
(zi = (Ui = D).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null || (Ui.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var dt = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function Cf() {
  return {
    connected: !1,
    clientConnected: !1,
    vitePluginDetected: !0,
    appRecords: [],
    activeAppRecordId: "",
    tabs: [],
    commands: [],
    highPerfModeEnabled: !0,
    devtoolsClientDetected: {},
    perfUniqueGroupId: 0,
    timelineLayersState: Ef()
  };
}
var Hi, ji;
(ji = (Hi = D)[dt]) != null || (Hi[dt] = Cf());
var xf = Dt((e) => {
  Mt.hooks.callHook("devtoolsStateUpdated", { state: e });
});
Dt((e, t) => {
  Mt.hooks.callHook("devtoolsConnectedUpdated", { state: e, oldState: t });
});
var Or = new Proxy(D.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
  get(e, t, n) {
    return t === "value" ? D.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : D.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
  }
}), ue = new Proxy(D.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
  get(e, t, n) {
    return t === "value" ? D.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? D.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : D.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
  }
});
function ds() {
  xf({
    ...D[dt],
    appRecords: Or.value,
    activeAppRecordId: ue.id,
    tabs: D.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: D.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function Tf(e) {
  D.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, ds();
}
function Af(e) {
  D.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, ds();
}
var ee = new Proxy(D[dt], {
  get(e, t) {
    return t === "appRecords" ? Or : t === "activeAppRecordId" ? ue.id : t === "tabs" ? D.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? D.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : D[dt][t];
  },
  deleteProperty(e, t) {
    return delete e[t], !0;
  },
  set(e, t, n) {
    return { ...D[dt] }, e[t] = n, D[dt][t] = n, !0;
  }
});
function Of(e = {}) {
  var t, n, r;
  const { file: o, host: i, baseUrl: a = window.location.origin, line: l = 0, column: s = 0 } = e;
  if (o) {
    if (i === "chrome-extension") {
      const u = o.replace(/\\/g, "\\\\"), d = (n = (t = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : t.openInEditorHost) != null ? n : "/";
      fetch(`${d}__open-in-editor?file=${encodeURI(o)}`).then((c) => {
        if (!c.ok) {
          const v = `Opening component ${u} failed`;
          console.log(`%c${v}`, "color:red");
        }
      });
    } else if (ee.vitePluginDetected) {
      const u = (r = D.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? r : a;
      D.__VUE_INSPECTOR__.openInEditor(u, o, l, s);
    }
  }
}
y();
y();
y();
y();
y();
var qi, $i;
($i = (qi = D).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null || (qi.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var Yo = new Proxy(D.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
});
function yo(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = e[n].defaultValue;
  }), t;
}
function Jo(e) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function Df(e) {
  var t, n, r;
  const o = (n = (t = Yo.find((i) => {
    var a;
    return i[0].id === e && !!((a = i[0]) != null && a.settings);
  })) == null ? void 0 : t[0]) != null ? n : null;
  return (r = o?.settings) != null ? r : null;
}
function fs(e, t) {
  var n, r, o;
  const i = Jo(e);
  if (i) {
    const a = localStorage.getItem(i);
    if (a)
      return JSON.parse(a);
  }
  if (e) {
    const a = (r = (n = Yo.find((l) => l[0].id === e)) == null ? void 0 : n[0]) != null ? r : null;
    return yo((o = a?.settings) != null ? o : {});
  }
  return yo(t);
}
function kf(e, t) {
  const n = Jo(e);
  localStorage.getItem(n) || localStorage.setItem(n, JSON.stringify(yo(t)));
}
function If(e, t, n) {
  const r = Jo(e), o = localStorage.getItem(r), i = JSON.parse(o || "{}"), a = {
    ...i,
    [t]: n
  };
  localStorage.setItem(r, JSON.stringify(a)), Mt.hooks.callHookWith(
    (l) => {
      l.forEach((s) => s({
        pluginId: e,
        key: t,
        oldValue: i[t],
        newValue: n,
        settings: a
      }));
    },
    "setPluginSettings"
    /* SET_PLUGIN_SETTINGS */
  );
}
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
var Ki, Wi, he = (Wi = (Ki = D).__VUE_DEVTOOLS_HOOK) != null ? Wi : Ki.__VUE_DEVTOOLS_HOOK = Zl(), Nf = {
  vueAppInit(e) {
    he.hook("app:init", e);
  },
  vueAppUnmount(e) {
    he.hook("app:unmount", e);
  },
  vueAppConnected(e) {
    he.hook("app:connected", e);
  },
  componentAdded(e) {
    return he.hook("component:added", e);
  },
  componentEmit(e) {
    return he.hook("component:emit", e);
  },
  componentUpdated(e) {
    return he.hook("component:updated", e);
  },
  componentRemoved(e) {
    return he.hook("component:removed", e);
  },
  setupDevtoolsPlugin(e) {
    he.hook("devtools-plugin:setup", e);
  },
  perfStart(e) {
    return he.hook("perf:start", e);
  },
  perfEnd(e) {
    return he.hook("perf:end", e);
  }
}, ps = {
  on: Nf,
  setupDevToolsPlugin(e, t) {
    return he.callHook("devtools-plugin:setup", e, t);
  }
}, Lf = class {
  constructor({ plugin: e, ctx: t }) {
    this.hooks = t.hooks, this.plugin = e;
  }
  get on() {
    return {
      // component inspector
      visitComponentTree: (e) => {
        this.hooks.hook("visitComponentTree", e);
      },
      inspectComponent: (e) => {
        this.hooks.hook("inspectComponent", e);
      },
      editComponentState: (e) => {
        this.hooks.hook("editComponentState", e);
      },
      // custom inspector
      getInspectorTree: (e) => {
        this.hooks.hook("getInspectorTree", e);
      },
      getInspectorState: (e) => {
        this.hooks.hook("getInspectorState", e);
      },
      editInspectorState: (e) => {
        this.hooks.hook("editInspectorState", e);
      },
      // timeline
      inspectTimelineEvent: (e) => {
        this.hooks.hook("inspectTimelineEvent", e);
      },
      timelineCleared: (e) => {
        this.hooks.hook("timelineCleared", e);
      },
      // settings
      setPluginSettings: (e) => {
        this.hooks.hook("setPluginSettings", e);
      }
    };
  }
  // component inspector
  notifyComponentUpdate(e) {
    var t;
    if (ee.highPerfModeEnabled)
      return;
    const n = cs().find((r) => r.packageName === this.plugin.descriptor.packageName);
    if (n?.id) {
      if (e) {
        const r = [
          e.appContext.app,
          e.uid,
          (t = e.parent) == null ? void 0 : t.uid,
          e
        ];
        he.callHook("component:updated", ...r);
      } else
        he.callHook(
          "component:updated"
          /* COMPONENT_UPDATED */
        );
      this.hooks.callHook("sendInspectorState", { inspectorId: n.id, plugin: this.plugin });
    }
  }
  // custom inspector
  addInspector(e) {
    this.hooks.callHook("addInspector", { inspector: e, plugin: this.plugin }), this.plugin.descriptor.settings && kf(e.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(e) {
    ee.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", { inspectorId: e, plugin: this.plugin });
  }
  sendInspectorState(e) {
    ee.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", { inspectorId: e, plugin: this.plugin });
  }
  selectInspectorNode(e, t) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId: e, nodeId: t, plugin: this.plugin });
  }
  visitComponentTree(e) {
    return this.hooks.callHook("visitComponentTree", e);
  }
  // timeline
  now() {
    return ee.highPerfModeEnabled ? 0 : Date.now();
  }
  addTimelineLayer(e) {
    this.hooks.callHook("timelineLayerAdded", { options: e, plugin: this.plugin });
  }
  addTimelineEvent(e) {
    ee.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", { options: e, plugin: this.plugin });
  }
  // settings
  getSettings(e) {
    return fs(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
  }
  // utilities
  getComponentInstances(e) {
    return this.hooks.callHook("getComponentInstances", { app: e });
  }
  getComponentBounds(e) {
    return this.hooks.callHook("getComponentBounds", { instance: e });
  }
  getComponentName(e) {
    return this.hooks.callHook("getComponentName", { instance: e });
  }
  highlightElement(e) {
    const t = e.__VUE_DEVTOOLS_NEXT_UID__;
    return this.hooks.callHook("componentHighlight", { uid: t });
  }
  unhighlightElement() {
    return this.hooks.callHook(
      "componentUnhighlight"
      /* COMPONENT_UNHIGHLIGHT */
    );
  }
}, Pf = Lf;
y();
y();
y();
y();
var Rf = "__vue_devtool_undefined__", Vf = "__vue_devtool_infinity__", Mf = "__vue_devtool_negative_infinity__", Ff = "__vue_devtool_nan__";
y();
y();
var Bf = {
  [Rf]: "undefined",
  [Ff]: "NaN",
  [Vf]: "Infinity",
  [Mf]: "-Infinity"
};
Object.entries(Bf).reduce((e, [t, n]) => (e[n] = t, e), {});
y();
y();
y();
y();
y();
var Gi, Yi;
(Yi = (Gi = D).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null || (Gi.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function vs(e, t) {
  return ps.setupDevToolsPlugin(e, t);
}
function Uf(e, t) {
  const [n, r] = e;
  if (n.app !== t)
    return;
  const o = new Pf({
    plugin: {
      setupFn: r,
      descriptor: n
    },
    ctx: Mt
  });
  n.packageName === "vuex" && o.on.editInspectorState((i) => {
    o.sendInspectorState(i.inspectorId);
  }), r(o);
}
function ms(e, t) {
  D.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || ee.highPerfModeEnabled && !t?.inspectingComponent || (D.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), Yo.forEach((n) => {
    Uf(n, e);
  }));
}
y();
y();
var mn = "__VUE_DEVTOOLS_ROUTER__", kt = "__VUE_DEVTOOLS_ROUTER_INFO__", Ji, Xi;
(Xi = (Ji = D)[kt]) != null || (Ji[kt] = {
  currentRoute: null,
  routes: []
});
var Zi, Qi;
(Qi = (Zi = D)[mn]) != null || (Zi[mn] = {});
new Proxy(D[kt], {
  get(e, t) {
    return D[kt][t];
  }
});
new Proxy(D[mn], {
  get(e, t) {
    if (t === "value")
      return D[mn];
  }
});
function zf(e) {
  const t = /* @__PURE__ */ new Map();
  return (e?.getRoutes() || []).filter((n) => !t.has(n.path) && t.set(n.path, 1));
}
function Xo(e) {
  return e.map((t) => {
    let { path: n, name: r, children: o, meta: i } = t;
    return o?.length && (o = Xo(o)), {
      path: n,
      name: r,
      children: o,
      meta: i
    };
  });
}
function Hf(e) {
  if (e) {
    const { fullPath: t, hash: n, href: r, path: o, name: i, matched: a, params: l, query: s } = e;
    return {
      fullPath: t,
      hash: n,
      href: r,
      path: o,
      name: i,
      params: l,
      query: s,
      matched: Xo(a)
    };
  }
  return e;
}
function jf(e, t) {
  function n() {
    var r;
    const o = (r = e.app) == null ? void 0 : r.config.globalProperties.$router, i = Hf(o?.currentRoute.value), a = Xo(zf(o)), l = console.warn;
    console.warn = () => {
    }, D[kt] = {
      currentRoute: i ? wi(i) : {},
      routes: wi(a)
    }, D[mn] = o, console.warn = l;
  }
  n(), ps.on.componentUpdated(Dt(() => {
    var r;
    ((r = t.value) == null ? void 0 : r.app) === e.app && (n(), !ee.highPerfModeEnabled && Mt.hooks.callHook("routerInfoUpdated", { state: D[kt] }));
  }, 200));
}
function qf(e) {
  return {
    // get inspector tree
    async getInspectorTree(t) {
      const n = {
        ...t,
        app: ue.value.app,
        rootNodes: []
      };
      return await new Promise((r) => {
        e.callHookWith(
          async (o) => {
            await Promise.all(o.map((i) => i(n))), r();
          },
          "getInspectorTree"
          /* GET_INSPECTOR_TREE */
        );
      }), n.rootNodes;
    },
    // get inspector state
    async getInspectorState(t) {
      const n = {
        ...t,
        app: ue.value.app,
        state: null
      }, r = {
        currentTab: `custom-inspector:${t.inspectorId}`
      };
      return await new Promise((o) => {
        e.callHookWith(
          async (i) => {
            await Promise.all(i.map((a) => a(n, r))), o();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      }), n.state;
    },
    // edit inspector state
    editInspectorState(t) {
      const n = new hf(), r = {
        ...t,
        app: ue.value.app,
        set: (o, i = t.path, a = t.state.value, l) => {
          n.set(o, i, a, l || n.createDefaultSetCallback(t.state));
        }
      };
      e.callHookWith(
        (o) => {
          o.forEach((i) => i(r));
        },
        "editInspectorState"
        /* EDIT_INSPECTOR_STATE */
      );
    },
    // send inspector state
    sendInspectorState(t) {
      const n = Wn(t);
      e.callHook("sendInspectorState", { inspectorId: t, plugin: {
        descriptor: n.descriptor,
        setupFn: () => ({})
      } });
    },
    // inspect component inspector
    inspectComponentInspector() {
      return cf();
    },
    // cancel inspect component inspector
    cancelInspectComponentInspector() {
      return uf();
    },
    // get component render code
    getComponentRenderCode(t) {
      const n = go(ue.value, t);
      if (n)
        return typeof n?.type != "function" ? n.render.toString() : n.type.toString();
    },
    // scroll to component
    scrollToComponent(t) {
      return df({ id: t });
    },
    // open in editor
    openInEditor: Of,
    // get vue inspector
    getVueInspector: vf,
    // toggle app
    toggleApp(t, n) {
      const r = Or.value.find((o) => o.id === t);
      r && (Af(t), Tf(r), jf(r, ue), us(), ms(r.app, n));
    },
    // inspect dom
    inspectDOM(t) {
      const n = go(ue.value, t);
      if (n) {
        const [r] = qo(n);
        r && (D.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = r);
      }
    },
    updatePluginSettings(t, n, r) {
      If(t, n, r);
    },
    getPluginSettings(t) {
      return {
        options: Df(t),
        values: fs(t)
      };
    }
  };
}
y();
var ea, ta;
(ta = (ea = D).__VUE_DEVTOOLS_ENV__) != null || (ea.__VUE_DEVTOOLS_ENV__ = {
  vitePluginDetected: !1
});
var na = wf(), ra, oa;
(oa = (ra = D).__VUE_DEVTOOLS_KIT_CONTEXT__) != null || (ra.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
  hooks: na,
  get state() {
    return {
      ...ee,
      activeAppRecordId: ue.id,
      activeAppRecord: ue.value,
      appRecords: Or.value
    };
  },
  api: qf(na)
});
var Mt = D.__VUE_DEVTOOLS_KIT_CONTEXT__;
y();
qd(Kd());
var ia, aa;
(aa = (ia = D).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null || (ia.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
});
y();
y();
function $f(e) {
  ee.highPerfModeEnabled = e ?? !ee.highPerfModeEnabled, !e && ue.value && ms(ue.value.app);
}
y();
y();
y();
function Kf(e) {
  ee.devtoolsClientDetected = {
    ...ee.devtoolsClientDetected,
    ...e
  };
  const t = Object.values(ee.devtoolsClientDetected).some(Boolean);
  $f(!t);
}
var la, sa;
(sa = (la = D).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null || (la.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = Kf);
y();
y();
y();
y();
y();
y();
y();
var Wf = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(e, t) {
    this.keyToValue.set(e, t), this.valueToKey.set(t, e);
  }
  getByKey(e) {
    return this.keyToValue.get(e);
  }
  getByValue(e) {
    return this.valueToKey.get(e);
  }
  clear() {
    this.keyToValue.clear(), this.valueToKey.clear();
  }
}, hs = class {
  constructor(e) {
    this.generateIdentifier = e, this.kv = new Wf();
  }
  register(e, t) {
    this.kv.getByValue(e) || (t || (t = this.generateIdentifier(e)), this.kv.set(t, e));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(e) {
    return this.kv.getByValue(e);
  }
  getValue(e) {
    return this.kv.getByKey(e);
  }
}, Gf = class extends hs {
  constructor() {
    super((e) => e.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(e, t) {
    typeof t == "object" ? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps), super.register(e, t.identifier)) : super.register(e, t);
  }
  getAllowedProps(e) {
    return this.classToAllowedProps.get(e);
  }
};
y();
y();
function Yf(e) {
  if ("values" in Object)
    return Object.values(e);
  const t = [];
  for (const n in e)
    e.hasOwnProperty(n) && t.push(e[n]);
  return t;
}
function Jf(e, t) {
  const n = Yf(e);
  if ("find" in n)
    return n.find(t);
  const r = n;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (t(i))
      return i;
  }
}
function It(e, t) {
  Object.entries(e).forEach(([n, r]) => t(r, n));
}
function Gn(e, t) {
  return e.indexOf(t) !== -1;
}
function ua(e, t) {
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (t(r))
      return r;
  }
}
var Xf = class {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return Jf(this.transfomers, (t) => t.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
};
y();
y();
var Zf = (e) => Object.prototype.toString.call(e).slice(8, -1), gs = (e) => typeof e > "u", Qf = (e) => e === null, hn = (e) => typeof e != "object" || e === null || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, bo = (e) => hn(e) && Object.keys(e).length === 0, rt = (e) => Array.isArray(e), ep = (e) => typeof e == "string", tp = (e) => typeof e == "number" && !isNaN(e), np = (e) => typeof e == "boolean", rp = (e) => e instanceof RegExp, gn = (e) => e instanceof Map, _n = (e) => e instanceof Set, _s = (e) => Zf(e) === "Symbol", op = (e) => e instanceof Date && !isNaN(e.valueOf()), ip = (e) => e instanceof Error, ca = (e) => typeof e == "number" && isNaN(e), ap = (e) => np(e) || Qf(e) || gs(e) || tp(e) || ep(e) || _s(e), lp = (e) => typeof e == "bigint", sp = (e) => e === 1 / 0 || e === -1 / 0, up = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), cp = (e) => e instanceof URL;
y();
var Es = (e) => e.replace(/\./g, "\\."), Mr = (e) => e.map(String).map(Es).join("."), tn = (e) => {
  const t = [];
  let n = "";
  for (let o = 0; o < e.length; o++) {
    let i = e.charAt(o);
    if (i === "\\" && e.charAt(o + 1) === ".") {
      n += ".", o++;
      continue;
    }
    if (i === ".") {
      t.push(n), n = "";
      continue;
    }
    n += i;
  }
  const r = n;
  return t.push(r), t;
};
y();
function Te(e, t, n, r) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: r
  };
}
var ys = [
  Te(gs, "undefined", () => null, () => {
  }),
  Te(lp, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
  Te(op, "Date", (e) => e.toISOString(), (e) => new Date(e)),
  Te(ip, "Error", (e, t) => {
    const n = {
      name: e.name,
      message: e.message
    };
    return t.allowedErrorProps.forEach((r) => {
      n[r] = e[r];
    }), n;
  }, (e, t) => {
    const n = new Error(e.message);
    return n.name = e.name, n.stack = e.stack, t.allowedErrorProps.forEach((r) => {
      n[r] = e[r];
    }), n;
  }),
  Te(rp, "regexp", (e) => "" + e, (e) => {
    const t = e.slice(1, e.lastIndexOf("/")), n = e.slice(e.lastIndexOf("/") + 1);
    return new RegExp(t, n);
  }),
  Te(
    _n,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (e) => [...e.values()],
    (e) => new Set(e)
  ),
  Te(gn, "map", (e) => [...e.entries()], (e) => new Map(e)),
  Te((e) => ca(e) || sp(e), "number", (e) => ca(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
  Te((e) => e === 0 && 1 / e === -1 / 0, "number", () => "-0", Number),
  Te(cp, "URL", (e) => e.toString(), (e) => new URL(e))
];
function Dr(e, t, n, r) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: r
  };
}
var bs = Dr((e, t) => _s(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, n) => {
  const r = n.symbolRegistry.getValue(t[1]);
  if (!r)
    throw new Error("Trying to deserialize unknown symbol");
  return r;
}), dp = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), Ss = Dr(up, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const n = dp[t[1]];
  if (!n)
    throw new Error("Trying to deserialize unknown typed array");
  return new n(e);
});
function ws(e, t) {
  return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var Cs = Dr(ws, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
  const n = t.classRegistry.getAllowedProps(e.constructor);
  if (!n)
    return { ...e };
  const r = {};
  return n.forEach((o) => {
    r[o] = e[o];
  }), r;
}, (e, t, n) => {
  const r = n.classRegistry.getValue(t[1]);
  if (!r)
    throw new Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(r.prototype), e);
}), xs = Dr((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, n) => {
  const r = n.customTransformerRegistry.findByName(t[1]);
  if (!r)
    throw new Error("Trying to deserialize unknown custom value");
  return r.deserialize(e);
}), fp = [Cs, bs, xs, Ss], da = (e, t) => {
  const n = ua(fp, (o) => o.isApplicable(e, t));
  if (n)
    return {
      value: n.transform(e, t),
      type: n.annotation(e, t)
    };
  const r = ua(ys, (o) => o.isApplicable(e, t));
  if (r)
    return {
      value: r.transform(e, t),
      type: r.annotation
    };
}, Ts = {};
ys.forEach((e) => {
  Ts[e.annotation] = e;
});
var pp = (e, t, n) => {
  if (rt(t))
    switch (t[0]) {
      case "symbol":
        return bs.untransform(e, t, n);
      case "class":
        return Cs.untransform(e, t, n);
      case "custom":
        return xs.untransform(e, t, n);
      case "typed-array":
        return Ss.untransform(e, t, n);
      default:
        throw new Error("Unknown transformation: " + t);
    }
  else {
    const r = Ts[t];
    if (!r)
      throw new Error("Unknown transformation: " + t);
    return r.untransform(e, n);
  }
};
y();
var St = (e, t) => {
  if (t > e.size)
    throw new Error("index out of bounds");
  const n = e.keys();
  for (; t > 0; )
    n.next(), t--;
  return n.next().value;
};
function As(e) {
  if (Gn(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (Gn(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (Gn(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
var vp = (e, t) => {
  As(t);
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (_n(e))
      e = St(e, +r);
    else if (gn(e)) {
      const o = +r, i = +t[++n] == 0 ? "key" : "value", a = St(e, o);
      switch (i) {
        case "key":
          e = a;
          break;
        case "value":
          e = e.get(a);
          break;
      }
    } else
      e = e[r];
  }
  return e;
}, So = (e, t, n) => {
  if (As(t), t.length === 0)
    return n(e);
  let r = e;
  for (let i = 0; i < t.length - 1; i++) {
    const a = t[i];
    if (rt(r)) {
      const l = +a;
      r = r[l];
    } else if (hn(r))
      r = r[a];
    else if (_n(r)) {
      const l = +a;
      r = St(r, l);
    } else if (gn(r)) {
      if (i === t.length - 2)
        break;
      const s = +a, u = +t[++i] == 0 ? "key" : "value", d = St(r, s);
      switch (u) {
        case "key":
          r = d;
          break;
        case "value":
          r = r.get(d);
          break;
      }
    }
  }
  const o = t[t.length - 1];
  if (rt(r) ? r[+o] = n(r[+o]) : hn(r) && (r[o] = n(r[o])), _n(r)) {
    const i = St(r, +o), a = n(i);
    i !== a && (r.delete(i), r.add(a));
  }
  if (gn(r)) {
    const i = +t[t.length - 2], a = St(r, i);
    switch (+o == 0 ? "key" : "value") {
      case "key": {
        const s = n(a);
        r.set(s, r.get(a)), s !== a && r.delete(a);
        break;
      }
      case "value": {
        r.set(a, n(r.get(a)));
        break;
      }
    }
  }
  return e;
};
function wo(e, t, n = []) {
  if (!e)
    return;
  if (!rt(e)) {
    It(e, (i, a) => wo(i, t, [...n, ...tn(a)]));
    return;
  }
  const [r, o] = e;
  o && It(o, (i, a) => {
    wo(i, t, [...n, ...tn(a)]);
  }), t(r, n);
}
function mp(e, t, n) {
  return wo(t, (r, o) => {
    e = So(e, o, (i) => pp(i, r, n));
  }), e;
}
function hp(e, t) {
  function n(r, o) {
    const i = vp(e, tn(o));
    r.map(tn).forEach((a) => {
      e = So(e, a, () => i);
    });
  }
  if (rt(t)) {
    const [r, o] = t;
    r.forEach((i) => {
      e = So(e, tn(i), () => e);
    }), o && It(o, n);
  } else
    It(t, n);
  return e;
}
var gp = (e, t) => hn(e) || rt(e) || gn(e) || _n(e) || ws(e, t);
function _p(e, t, n) {
  const r = n.get(e);
  r ? r.push(t) : n.set(e, [t]);
}
function Ep(e, t) {
  const n = {};
  let r;
  return e.forEach((o) => {
    if (o.length <= 1)
      return;
    t || (o = o.map((l) => l.map(String)).sort((l, s) => l.length - s.length));
    const [i, ...a] = o;
    i.length === 0 ? r = a.map(Mr) : n[Mr(i)] = a.map(Mr);
  }), r ? bo(n) ? [r] : [r, n] : bo(n) ? void 0 : n;
}
var Os = (e, t, n, r, o = [], i = [], a = /* @__PURE__ */ new Map()) => {
  var l;
  const s = ap(e);
  if (!s) {
    _p(e, o, t);
    const f = a.get(e);
    if (f)
      return r ? {
        transformedValue: null
      } : f;
  }
  if (!gp(e, n)) {
    const f = da(e, n), g = f ? {
      transformedValue: f.value,
      annotations: [f.type]
    } : {
      transformedValue: e
    };
    return s || a.set(e, g), g;
  }
  if (Gn(i, e))
    return {
      transformedValue: null
    };
  const u = da(e, n), d = (l = u?.value) != null ? l : e, c = rt(d) ? [] : {}, v = {};
  It(d, (f, g) => {
    if (g === "__proto__" || g === "constructor" || g === "prototype")
      throw new Error(`Detected property ${g}. This is a prototype pollution risk, please remove it from your object.`);
    const p = Os(f, t, n, r, [...o, g], [...i, e], a);
    c[g] = p.transformedValue, rt(p.annotations) ? v[g] = p.annotations : hn(p.annotations) && It(p.annotations, (_, C) => {
      v[Es(g) + "." + C] = _;
    });
  });
  const m = bo(v) ? {
    transformedValue: c,
    annotations: u ? [u.type] : void 0
  } : {
    transformedValue: c,
    annotations: u ? [u.type, v] : v
  };
  return s || a.set(e, m), m;
};
y();
y();
function Ds(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function fa(e) {
  return Ds(e) === "Array";
}
function yp(e) {
  if (Ds(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function bp(e, t, n, r, o) {
  const i = {}.propertyIsEnumerable.call(r, t) ? "enumerable" : "nonenumerable";
  i === "enumerable" && (e[t] = n), o && i === "nonenumerable" && Object.defineProperty(e, t, {
    value: n,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function Co(e, t = {}) {
  if (fa(e))
    return e.map((o) => Co(o, t));
  if (!yp(e))
    return e;
  const n = Object.getOwnPropertyNames(e), r = Object.getOwnPropertySymbols(e);
  return [...n, ...r].reduce((o, i) => {
    if (fa(t.props) && !t.props.includes(i))
      return o;
    const a = e[i], l = Co(a, t);
    return bp(o, i, l, e, t.nonenumerable), o;
  }, {});
}
var K = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new Gf(), this.symbolRegistry = new hs((t) => {
      var n;
      return (n = t.description) != null ? n : "";
    }), this.customTransformerRegistry = new Xf(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const t = /* @__PURE__ */ new Map(), n = Os(e, t, this, this.dedupe), r = {
      json: n.transformedValue
    };
    n.annotations && (r.meta = {
      ...r.meta,
      values: n.annotations
    });
    const o = Ep(t, this.dedupe);
    return o && (r.meta = {
      ...r.meta,
      referentialEqualities: o
    }), r;
  }
  deserialize(e) {
    const { json: t, meta: n } = e;
    let r = Co(t);
    return n?.values && (r = mp(r, n.values, this)), n?.referentialEqualities && (r = hp(r, n.referentialEqualities)), r;
  }
  stringify(e) {
    return JSON.stringify(this.serialize(e));
  }
  parse(e) {
    return this.deserialize(JSON.parse(e));
  }
  registerClass(e, t) {
    this.classRegistry.register(e, t);
  }
  registerSymbol(e, t) {
    this.symbolRegistry.register(e, t);
  }
  registerCustom(e, t) {
    this.customTransformerRegistry.register({
      name: t,
      ...e
    });
  }
  allowErrorProps(...e) {
    this.allowedErrorProps.push(...e);
  }
};
K.defaultInstance = new K();
K.serialize = K.defaultInstance.serialize.bind(K.defaultInstance);
K.deserialize = K.defaultInstance.deserialize.bind(K.defaultInstance);
K.stringify = K.defaultInstance.stringify.bind(K.defaultInstance);
K.parse = K.defaultInstance.parse.bind(K.defaultInstance);
K.registerClass = K.defaultInstance.registerClass.bind(K.defaultInstance);
K.registerSymbol = K.defaultInstance.registerSymbol.bind(K.defaultInstance);
K.registerCustom = K.defaultInstance.registerCustom.bind(K.defaultInstance);
K.allowErrorProps = K.defaultInstance.allowErrorProps.bind(K.defaultInstance);
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
y();
var pa, va;
(va = (pa = D).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null || (pa.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var ma, ha;
(ha = (ma = D).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null || (ma.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var ga, _a;
(_a = (ga = D).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null || (ga.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var Ea, ya;
(ya = (Ea = D).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null || (Ea.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var ba, Sa;
(Sa = (ba = D).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null || (ba.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var wa, Ca;
(Ca = (wa = D).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null || (wa.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null);
y();
y();
y();
y();
y();
y();
y();
const pr = typeof window < "u";
let xo;
const Sp = (e) => xo = e;
process.env.NODE_ENV;
const To = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var ft;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ft || (ft = {}));
const xa = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function wp(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Zo(e, t, n) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    Ns(r.response, t, n);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function ks(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function Yn(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = new MouseEvent("click", {
      bubbles: !0,
      cancelable: !0,
      view: window,
      detail: 0,
      screenX: 80,
      screenY: 20,
      clientX: 80,
      clientY: 20,
      ctrlKey: !1,
      altKey: !1,
      shiftKey: !1,
      metaKey: !1,
      button: 0,
      relatedTarget: null
    });
    e.dispatchEvent(n);
  }
}
const Jn = typeof navigator == "object" ? navigator : { userAgent: "" }, Is = /Macintosh/.test(Jn.userAgent) && /AppleWebKit/.test(Jn.userAgent) && !/Safari/.test(Jn.userAgent), Ns = pr ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Is ? Cp : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Jn ? xp : (
      // Fallback to using FileReader and a popup
      Tp
    )
  )
) : () => {
};
function Cp(e, t = "download", n) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? ks(r.href) ? Zo(e, t, n) : (r.target = "_blank", Yn(r)) : Yn(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    Yn(r);
  }, 0));
}
function xp(e, t = "download", n) {
  if (typeof e == "string")
    if (ks(e))
      Zo(e, t, n);
    else {
      const r = document.createElement("a");
      r.href = e, r.target = "_blank", setTimeout(function() {
        Yn(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob(wp(e, n), t);
}
function Tp(e, t, n, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
    return Zo(e, t, n);
  const o = e.type === "application/octet-stream", i = /constructor/i.test(String(xa.HTMLElement)) || "safari" in xa, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || o && i || Is) && typeof FileReader < "u") {
    const l = new FileReader();
    l.onloadend = function() {
      let s = l.result;
      if (typeof s != "string")
        throw r = null, new Error("Wrong reader.result type");
      s = a ? s : s.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = s : location.assign(s), r = null;
    }, l.readAsDataURL(e);
  } else {
    const l = URL.createObjectURL(e);
    r ? r.location.assign(l) : location.href = l, r = null, setTimeout(function() {
      URL.revokeObjectURL(l);
    }, 4e4);
  }
}
function re(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Qo(e) {
  return "_a" in e && "install" in e;
}
function Ls() {
  if (!("clipboard" in navigator))
    return re("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Ps(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (re('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Ap(e) {
  if (!Ls())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), re("Global state copied to clipboard.");
    } catch (t) {
      if (Ps(t))
        return;
      re("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Op(e) {
  if (!Ls())
    try {
      Rs(e, JSON.parse(await navigator.clipboard.readText())), re("Global state pasted from clipboard.");
    } catch (t) {
      if (Ps(t))
        return;
      re("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Dp(e) {
  try {
    Ns(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    re("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Le;
function kp() {
  Le || (Le = document.createElement("input"), Le.type = "file", Le.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      Le.onchange = async () => {
        const r = Le.files;
        if (!r)
          return t(null);
        const o = r.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, Le.oncancel = () => t(null), Le.onerror = n, Le.click();
    });
  }
  return e;
}
async function Ip(e) {
  try {
    const n = await kp()();
    if (!n)
      return;
    const { text: r, file: o } = n;
    Rs(e, JSON.parse(r)), re(`Global state imported from "${o.name}".`);
  } catch (t) {
    re("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Rs(e, t) {
  for (const n in t) {
    const r = e.state.value[n];
    r ? Object.assign(r, t[n]) : e.state.value[n] = t[n];
  }
}
function we(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Vs = "🍍 Pinia (root)", Xn = "_root";
function Np(e) {
  return Qo(e) ? {
    id: Xn,
    label: Vs
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Lp(e) {
  if (Qo(e)) {
    const n = Array.from(e._s.keys()), r = e._s;
    return {
      state: n.map((i) => ({
        editable: !0,
        key: i,
        value: e.state.value[i]
      })),
      getters: n.filter((i) => r.get(i)._getters).map((i) => {
        const a = r.get(i);
        return {
          editable: !1,
          key: i,
          value: a._getters.reduce((l, s) => (l[s] = a[s], l), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function Pp(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: we(e.type),
    key: we(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Rp(e) {
  switch (e) {
    case ft.direct:
      return "mutation";
    case ft.patchFunction:
      return "$patch";
    case ft.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let wt = !0;
const Zn = [], lt = "pinia:mutations", ae = "pinia", { assign: Vp } = Object, vr = (e) => "🍍 " + e;
function Mp(e, t) {
  vs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Zn,
    app: e
  }, (n) => {
    typeof n.now != "function" && re("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: lt,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: ae,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Ap(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Op(t), n.sendInspectorTree(ae), n.sendInspectorState(ae);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Dp(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Ip(t), n.sendInspectorTree(ae), n.sendInspectorState(ae);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (r) => {
            const o = t._s.get(r);
            o ? typeof o.$reset != "function" ? re(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), re(`Store "${r}" reset.`)) : re(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((r) => {
      const o = r.componentInstance && r.componentInstance.proxy;
      if (o && o._pStores) {
        const i = r.componentInstance.proxy._pStores;
        Object.values(i).forEach((a) => {
          r.instanceData.state.push({
            type: vr(a.$id),
            key: "state",
            editable: !0,
            value: a._isOptionsAPI ? {
              _custom: {
                value: sr(a.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => a.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(a.$state).reduce((l, s) => (l[s] = a.$state[s], l), {})
            )
          }), a._getters && a._getters.length && r.instanceData.state.push({
            type: vr(a.$id),
            key: "getters",
            editable: !1,
            value: a._getters.reduce((l, s) => {
              try {
                l[s] = a[s];
              } catch (u) {
                l[s] = u;
              }
              return l;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((r) => {
      if (r.app === e && r.inspectorId === ae) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? o.filter((i) => "$id" in i ? i.$id.toLowerCase().includes(r.filter.toLowerCase()) : Vs.toLowerCase().includes(r.filter.toLowerCase())) : o).map(Np);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === ae) {
        const o = r.nodeId === Xn ? t : t._s.get(r.nodeId);
        if (!o)
          return;
        o && (r.nodeId !== Xn && (globalThis.$store = sr(o)), r.state = Lp(o));
      }
    }), n.on.editInspectorState((r) => {
      if (r.app === e && r.inspectorId === ae) {
        const o = r.nodeId === Xn ? t : t._s.get(r.nodeId);
        if (!o)
          return re(`store "${r.nodeId}" not found`, "error");
        const { path: i } = r;
        Qo(o) ? i.unshift("state") : (i.length !== 1 || !o._customProperties.has(i[0]) || i[0] in o.$state) && i.unshift("$state"), wt = !1, r.set(o, i, r.state.value), wt = !0;
      }
    }), n.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const o = r.type.replace(/^🍍\s*/, ""), i = t._s.get(o);
        if (!i)
          return re(`store "${o}" not found`, "error");
        const { path: a } = r;
        if (a[0] !== "state")
          return re(`Invalid path for store "${o}":
${a}
Only state can be modified.`);
        a[0] = "$state", wt = !1, r.set(i, a, r.state.value), wt = !0;
      }
    });
  });
}
function Fp(e, t) {
  Zn.includes(vr(t.$id)) || Zn.push(vr(t.$id)), vs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Zn,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const r = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: a, onError: l, name: s, args: u }) => {
      const d = Ms++;
      n.addTimelineEvent({
        layerId: lt,
        event: {
          time: r(),
          title: "🛫 " + s,
          subtitle: "start",
          data: {
            store: we(t.$id),
            action: we(s),
            args: u
          },
          groupId: d
        }
      }), a((c) => {
        Ze = void 0, n.addTimelineEvent({
          layerId: lt,
          event: {
            time: r(),
            title: "🛬 " + s,
            subtitle: "end",
            data: {
              store: we(t.$id),
              action: we(s),
              args: u,
              result: c
            },
            groupId: d
          }
        });
      }), l((c) => {
        Ze = void 0, n.addTimelineEvent({
          layerId: lt,
          event: {
            time: r(),
            logType: "error",
            title: "💥 " + s,
            subtitle: "end",
            data: {
              store: we(t.$id),
              action: we(s),
              args: u,
              error: c
            },
            groupId: d
          }
        });
      });
    }, !0), t._customProperties.forEach((a) => {
      He(() => uu(t[a]), (l, s) => {
        n.notifyComponentUpdate(), n.sendInspectorState(ae), wt && n.addTimelineEvent({
          layerId: lt,
          event: {
            time: r(),
            title: "Change",
            subtitle: a,
            data: {
              newValue: l,
              oldValue: s
            },
            groupId: Ze
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: a, type: l }, s) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(ae), !wt)
        return;
      const u = {
        time: r(),
        title: Rp(l),
        data: Vp({ store: we(t.$id) }, Pp(a)),
        groupId: Ze
      };
      l === ft.patchFunction ? u.subtitle = "⤵️" : l === ft.patchObject ? u.subtitle = "🧩" : a && !Array.isArray(a) && (u.subtitle = a.type), a && (u.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: a
        }
      }), n.addTimelineEvent({
        layerId: lt,
        event: u
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = sl((a) => {
      o(a), n.addTimelineEvent({
        layerId: lt,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: we(t.$id),
            info: we("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(ae), n.sendInspectorState(ae);
    });
    const { $dispose: i } = t;
    t.$dispose = () => {
      i(), n.notifyComponentUpdate(), n.sendInspectorTree(ae), n.sendInspectorState(ae), n.getSettings().logStoreChanges && re(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(ae), n.sendInspectorState(ae), n.getSettings().logStoreChanges && re(`"${t.$id}" store installed 🆕`);
  });
}
let Ms = 0, Ze;
function Ta(e, t, n) {
  const r = t.reduce((o, i) => (o[i] = sr(e)[i], o), {});
  for (const o in r)
    e[o] = function() {
      const i = Ms, a = n ? new Proxy(e, {
        get(...s) {
          return Ze = i, Reflect.get(...s);
        },
        set(...s) {
          return Ze = i, Reflect.set(...s);
        }
      }) : e;
      Ze = i;
      const l = r[o].apply(a, arguments);
      return Ze = void 0, l;
    };
}
function Bp({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      Ta(t, Object.keys(n.actions), t._isOptionsAPI);
      const r = t._hotUpdate;
      sr(t)._hotUpdate = function(o) {
        r.apply(this, arguments), Ta(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    Fp(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function Up() {
  const e = su(!0), t = e.run(() => lr({}));
  let n = [], r = [];
  const o = sl({
    install(i) {
      Sp(o), o._a = i, i.provide(To, o), i.config.globalProperties.$pinia = o, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && pr && Mp(i, o), r.forEach((a) => n.push(a)), r = [];
    },
    use(i) {
      return this._a ? n.push(i) : r.push(i), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && pr && typeof Proxy < "u" && o.use(Bp), o;
}
process.env.NODE_ENV;
let Fr = 0;
function zp(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    Array.isArray(r) && r.length === 2 && r[1] && typeof r[1] == "object" && r[1].s ? t[n] = r[0] : t[n] = r;
  }
  return t;
}
function Hp(e) {
  return cu({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = lr(!1), o = ul(null), i = null, a = lr(null);
      async function l() {
        if (!r.value)
          try {
            let u = await Gu({
              component: t.config.name,
              props: t.config.props || {}
            });
            u.html && u.snapshot && s(u);
          } catch (u) {
            console.error("[LiVue] Lazy load failed:", u);
          }
      }
      function s(u) {
        let d = JSON.parse(u.snapshot);
        Fr++;
        let c = "lazy-" + Fr + "-" + Date.now(), v = d.memo ? d.memo.name : "", m = zp(d.state || {}), f = d.memo || {}, { createLivueHelper: g, buildComponentDef: p, processTemplate: _, createReactiveState: C } = e._lazyHelpers, S = C(m), A = JSON.parse(JSON.stringify(m)), I = { _updateTemplate: null }, k = g(
          c,
          S,
          f,
          I,
          A,
          u.snapshot
        );
        f.errors && Ae(k.errors, f.errors);
        let H = "livue-lazy-child-" + Fr, b = _(u.html, e), h = '<div data-livue-id="' + c + '">' + b.template + "</div>", O = p(h, S, k, e._versions, v);
        e._childRegistry[c] = {
          tagName: H,
          state: S,
          memo: f,
          livue: k,
          componentRef: I,
          name: v,
          id: c
        }, I._updateTemplate = function(T) {
          let E = _(T, e), V = '<div data-livue-id="' + c + '">' + E.template + "</div>";
          for (let M in E.childDefs)
            e.vueApp._context.components[M] || e.vueApp.component(M, E.childDefs[M]);
          let B = p(V, S, k, e._versions, v);
          e.vueApp._context.components[H] = B, e._versions[H] = (e._versions[H] || 0) + 1, o.value = B;
        };
        let x = f.listeners || null;
        if (x)
          for (let T in x)
            (function(E, V) {
              dr(T, v, c, function(B) {
                V.call(E, B);
              });
            })(x[T], k);
        for (let T in b.childDefs)
          e.vueApp._context.components[T] || e.vueApp.component(T, b.childDefs[T]);
        e._versions[H] = 0, e.vueApp._context.components[H] || e.vueApp.component(H, O), o.value = O, r.value = !0;
      }
      return cl(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (i = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (i.disconnect(), i = null, l());
        }, { rootMargin: "50px" }), a.value && i.observe(a.value));
      }), dl(function() {
        i && (i.disconnect(), i = null);
      }), function() {
        return r.value && o.value ? fi(o.value) : fi("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
let nn = /* @__PURE__ */ new Map(), rn = /* @__PURE__ */ new Map();
function Nt(e, t) {
  let n = e + ":debounce:" + t;
  if (!nn.has(n)) {
    let r = null, o = null, i = null, a = null, l = function(s) {
      return o = s, clearTimeout(r), new Promise(function(u, d) {
        i = u, a = d, r = setTimeout(function() {
          let c = o, v = i, m = a;
          o = null, i = null, a = null, Promise.resolve(c()).then(v).catch(m);
        }, t);
      });
    };
    nn.set(n, l);
  }
  return nn.get(n);
}
function En(e, t) {
  let n = e + ":throttle:" + t;
  if (!rn.has(n)) {
    let r = 0, o = function(i) {
      let a = Date.now();
      return a - r < t ? Promise.resolve(null) : (r = a, Promise.resolve(i()));
    };
    rn.set(n, o);
  }
  return rn.get(n);
}
function Aa(e) {
  let t = e + ":";
  for (let n of nn.keys())
    n.startsWith(t) && nn.delete(n);
  for (let n of rn.keys())
    n.startsWith(t) && rn.delete(n);
}
const mr = "livue-tab-sync";
let ei = Date.now() + "-" + Math.random().toString(36).substr(2, 9), hr = null, ti = /* @__PURE__ */ new Map(), Oa = !1;
function Fs() {
  Oa || (Oa = !0, typeof BroadcastChannel < "u" ? (hr = new BroadcastChannel(mr), hr.onmessage = jp) : window.addEventListener("storage", qp));
}
function jp(e) {
  let t = e.data;
  t.tabId !== ei && Bs(t);
}
function qp(e) {
  if (e.key === mr && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === ei) return;
      Bs(t);
    } catch {
    }
}
function Bs(e) {
  let t = ti.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function $p(e, t) {
  Fs(), ti.set(e, t);
}
function Da(e) {
  ti.delete(e);
}
function Kp(e, t, n, r) {
  Fs();
  let o = {
    tabId: ei,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (hr)
    hr.postMessage(o);
  else
    try {
      localStorage.setItem(mr, JSON.stringify(o)), localStorage.removeItem(mr);
    } catch {
    }
}
function Wp(e, t, n) {
  let r = {};
  for (let o of t)
    n.only && !n.only.includes(o) || n.except && n.except.includes(o) || o in e && (r[o] = e[o]);
  return r;
}
let ka = 0;
function Ao() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Br = /* @__PURE__ */ new WeakMap();
function Ia() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const Gp = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (ka++, r = "livue-transition-" + ka), Br.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), Ao() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    Ia();
  },
  updated(e, t) {
    let n = Br.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), Ao() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    Br.delete(e), e.removeAttribute("data-livue-transition"), Ia();
  }
};
function Yp(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
const ni = /* @__PURE__ */ new Map();
async function Jp(e, t = {}) {
  const {
    onChunk: n = () => {
    },
    onComplete: r = () => {
    },
    onError: o = () => {
    }
  } = t;
  try {
    const i = await fetch("/livue/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/x-ndjson",
        "X-CSRF-TOKEN": Pt(),
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        snapshot: e.snapshot,
        diffs: e.diffs || {},
        method: e.method,
        params: e.params || []
      })
    });
    if (!i.ok)
      throw new Error(`HTTP error: ${i.status}`);
    const a = i.body.getReader(), l = new TextDecoder();
    let s = "", u = null;
    for (; ; ) {
      const { done: d, value: c } = await a.read();
      if (d)
        break;
      s += l.decode(c, { stream: !0 });
      const v = s.split(`
`);
      s = v.pop() || "";
      for (const m of v)
        if (m.trim())
          try {
            const f = JSON.parse(m);
            if (f.stream)
              Xp(f.stream), n(f.stream);
            else {
              if (f.error)
                throw new Error(f.error);
              f.snapshot && (u = f);
            }
          } catch (f) {
            console.error("[LiVue Stream] Parse error:", f, m);
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
  } catch (i) {
    throw o(i), i;
  }
}
function Xp(e) {
  const { to: t, content: n, replace: r } = e, o = ni.get(t);
  if (!o) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: i } = o;
  r ? i.innerHTML = n : i.innerHTML += n;
}
function Na(e, t, n = !1) {
  ni.set(e, { el: t, replace: n });
}
function La(e) {
  ni.delete(e);
}
function Zp(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function ri(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    Zp(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = ri(r) : t[n] = r;
  }
  return t;
}
function Qp(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, o = {}, i = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of i) {
    let l = n[a] || {}, s = r[a] || {}, u = ri(l), d = {};
    for (let c in s)
      d[c] = /* @__PURE__ */ (function(v, m) {
        return function() {
          let f = Array.prototype.slice.call(arguments);
          return t(v + "." + m, f);
        };
      })(a, c);
    o[a] = et(Object.assign({}, u, d));
  }
  return o;
}
function ev(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let o = ri(n[r]);
    if (e[r])
      for (let i in o)
        typeof e[r][i] != "function" && (e[r][i] = o[i]);
  }
}
function tv(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
let Pa = 0, Us = /* @__PURE__ */ new Map();
function nv(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, o) {
    let i = { index: o };
    r.type === "checkbox" || r.type === "radio" ? i.checked = r.checked : r.tagName === "SELECT" ? (i.value = r.value, r.multiple && (i.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : i.value = r.value, t.push(i);
  }), t;
}
function rv(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let o = n[r.index];
    o && (o.type === "checkbox" || o.type === "radio" ? o.checked = r.checked : o.tagName === "SELECT" && o.multiple && r.selectedOptions ? Array.from(o.options).forEach(function(i) {
      i.selected = r.selectedOptions.includes(i.value);
    }) : r.value !== void 0 && (o.value = r.value));
  });
}
function zs(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), o = n.hasAttribute("data-livue-ignore-self");
    Us.set(r, {
      html: n.innerHTML,
      isSelf: o,
      inputs: nv(n)
    });
  });
}
function Hs(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), o = Us.get(r);
    o && (o.isSelf || (n.innerHTML = o.html), o.inputs && o.inputs.length > 0 && rv(n, o.inputs));
  });
}
function In(e, t) {
  let n = {}, r = bl(t);
  for (let o in r)
    JSON.stringify(r[o]) !== JSON.stringify(e[o]) && (n[o] = r[o]);
  return n;
}
function ov(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function Oo(e) {
  if (ov(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(Oo);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = Oo(e[n]);
    return t;
  }
  return e;
}
function gr(e) {
  let t = {};
  for (let n in e)
    t[n] = Oo(e[n]);
  return t;
}
let js = {
  ref: lr,
  computed: hu,
  watch: He,
  watchEffect: mu,
  reactive: et,
  readonly: vu,
  onMounted: cl,
  onUnmounted: dl,
  onBeforeMount: pu,
  onBeforeUnmount: fu,
  nextTick: Po,
  provide: du,
  inject: ro
}, qs = Object.keys(js), iv = qs.map(function(e) {
  return js[e];
});
function av(e) {
  let t = e.match(/<script\s+type="application\/livue-setup"[^>]*>([\s\S]*?)<\/script>/);
  if (t) {
    let n = t[1].trim();
    return n = n.replace(/^<script[^>]*>\s*/i, ""), n = n.replace(/\s*<\/script>$/i, ""), {
      html: e.replace(t[0], ""),
      setupCode: n.trim()
    };
  }
  return { html: e, setupCode: null };
}
function lv(e, t, n) {
  let r = Object.keys(t), o = r.map(function(l) {
    return t[l];
  }), i = qs.concat(r).concat(["livue"]), a = iv.concat(o).concat([n]);
  try {
    let s = new (Function.prototype.bind.apply(
      Function,
      [null].concat(i).concat([e])
    ))().apply(null, a);
    return s && typeof s == "object" ? s : null;
  } catch (l) {
    return console.error("[LiVue] Error executing @script setup code:", l), null;
  }
}
function sv(e) {
  let t = /v-model\.debounce(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
  e = e.replace(t, function(i, a, l, s) {
    let u = a ? "." + a + (l || "ms") : "";
    return 'v-model="' + s + '" v-debounce:' + s + u;
  });
  let n = /v-model\.throttle(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
  e = e.replace(n, function(i, a, l, s) {
    let u = a ? "." + a + (l || "ms") : "";
    return 'v-model="' + s + '" v-throttle:' + s + u;
  });
  let r = /v-model\.blur=["']([^"']+)["']/g;
  e = e.replace(r, function(i, a) {
    return 'v-model="' + a + '" v-blur:' + a;
  });
  let o = /v-model\.enter=["']([^"']+)["']/g;
  return e = e.replace(o, function(i, a) {
    return 'v-model="' + a + '" v-enter:' + a;
  }), e;
}
function on(e, t, n, r, o, i) {
  let a = sv(e), l = av(a);
  return {
    name: i || "LiVueComponent",
    template: l.html,
    setup: function() {
      let s = Xu(t), u = Object.assign({}, s, r, { livue: n, livueV: o });
      if (l.setupCode) {
        let d = lv(l.setupCode, s, n);
        d && Object.assign(u, d);
      }
      return u;
    }
  };
}
function Do(e, t, n, r, o, i, a) {
  a = a || {};
  let l = Zu(), s = n.name, u = n.vueMethods || {}, d = n.confirms || {}, c = n.isolate || !1, v = n.urlParams || null, m = n.uploads || null, f = n.tabSync || null, g = !1, p = o, _ = i;
  function C(h) {
    let O = document.querySelector('meta[name="livue-prefix"]'), T = "/" + (O ? O.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(h.token), E = document.createElement("a");
    E.href = T, E.download = h.name, E.style.display = "none", document.body.appendChild(E), E.click(), document.body.removeChild(E);
  }
  function S() {
    let h = In(p, t);
    return {
      snapshot: _,
      diffs: h
    };
  }
  function A(h, O) {
    if (h.redirect) {
      Ro(h.redirect);
      return;
    }
    if (h.errorBoundary) {
      let E = h.errorBoundary;
      b.errorState.hasError = E.hasError, b.errorState.errorMessage = E.errorMessage, b.errorState.errorDetails = E.errorDetails, b.errorState.recover = E.recover, (!E.errorHandled || !E.recover) && xe("error.occurred", {
        error: new Error(E.errorMessage || "Component error"),
        componentName: s,
        componentId: e,
        context: { method: E.errorMethod, serverHandled: E.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (h.download && C(h.download), h.snapshot) {
      let E = JSON.parse(h.snapshot);
      if (E.state) {
        let V = gr(E.state);
        Ju(t, V), p = JSON.parse(JSON.stringify(V));
      }
      _ = h.snapshot, E.memo && (E.memo.errors ? Ae(b.errors, E.memo.errors) : co(b.errors), E.memo.vueMethods && (u = E.memo.vueMethods), E.memo.urlParams && (v = E.memo.urlParams), E.memo.uploads && (m = E.memo.uploads), E.memo.confirms && (d = E.memo.confirms), (E.memo.composables || E.memo.composableActions) && ev(k, E.memo));
    }
    if (v && vd(v, t), h.html && r && r._updateTemplate) {
      let E = {};
      if (h.snapshot) {
        let V = JSON.parse(h.snapshot);
        V.memo && (V.memo.transitionType && (E.transitionType = V.memo.transitionType), V.memo.skipTransition && (E.skipTransition = !0));
      }
      r._updateTemplate(h.html, E);
    }
    if (h.events && h.events.length > 0) {
      for (var x = 0; x < h.events.length; x++)
        h.events[x].sourceId = e;
      pd(h.events);
    }
    if (h.js && h.js.length > 0)
      for (var T = 0; T < h.js.length; T++)
        try {
          new Function("state", "livue", h.js[T])(t, b);
        } catch (E) {
          console.error("[LiVue] Error executing ->vue() JS:", E);
        }
    if (f && f.enabled && h.snapshot && !g && JSON.parse(h.snapshot).state) {
      let V = bl(t), B = [];
      for (let M in V)
        (!O || !(M in O)) && B.push(M);
      if (B.length > 0) {
        let M = Wp(V, B, f);
        Object.keys(M).length > 0 && Kp(s, M, B, f);
      }
    }
    if (g = !1, h.jsonResult !== void 0)
      return h.jsonResult;
  }
  let I = et({}), k = {}, H = function(h, O) {
    return b.call(h, O);
  };
  tv(n) && (k = Qp(n, H));
  let b = et({
    loading: !1,
    processing: null,
    errors: l,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: I,
    refs: {},
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(h) {
      let O = In(p, t);
      return h === void 0 ? Object.keys(O).length > 0 : h in O;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let h = In(p, t);
      return new Set(Object.keys(h));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(h) {
      return h === void 0 ? JSON.parse(JSON.stringify(p)) : p[h] !== void 0 ? JSON.parse(JSON.stringify(p[h])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(h) {
      h in p && (t[h] = JSON.parse(JSON.stringify(p[h])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let h in p)
        h in t && (t[h] = JSON.parse(JSON.stringify(p[h])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(h) {
      return h ? I[h] || !1 : b.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(h) {
      let O = h ? I[h] || !1 : b.loading;
      return {
        "aria-busy": O,
        disabled: O
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
    call: async function(h, O, x) {
      let T, E = null;
      if (arguments.length === 1 ? T = [] : arguments.length === 2 ? Array.isArray(O) ? T = O : T = [O] : arguments.length >= 3 && (Array.isArray(O) && x && typeof x == "object" && (x.debounce || x.throttle) ? (T = O, E = x) : T = Array.prototype.slice.call(arguments, 1)), u[h]) {
        try {
          new Function("state", "livue", u[h])(t, b);
        } catch (B) {
          console.error('[LiVue] Error executing #[Vue] method "' + h + '":', B);
        }
        return;
      }
      let V = async function() {
        if (d[h] && !await b._showConfirm(d[h]))
          return;
        b.loading = !0, b.processing = h, I[h] = !0;
        let B;
        try {
          let M = S(), N = await mi(M.snapshot, h, T, M.diffs, c);
          B = A(N, M.diffs);
        } catch (M) {
          M.status === 422 && M.data && M.data.errors ? Ae(b.errors, M.data.errors) : Ft(M, s);
        } finally {
          b.loading = !1, b.processing = null, delete I[h];
        }
        return B;
      };
      return E && E.debounce ? Nt(e + ":" + h, E.debounce)(V) : E && E.throttle ? En(e + ":" + h, E.throttle)(V) : V();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(h, O) {
      let x = Array.prototype.slice.call(arguments, 2), T = { message: O || "Are you sure?" };
      if (await b._showConfirm(T))
        return b.call.apply(b, [h].concat(x));
    },
    /**
     * Show confirmation dialog (native or custom).
     * @param {object} config - { message, title, confirmText, cancelText }
     * @returns {Promise<boolean>}
     * @private
     */
    _showConfirm: function(h) {
      return window.LiVue && window.LiVue.confirmHandler ? window.LiVue.confirmHandler(h) : Promise.resolve(window.confirm(h.message));
    },
    /**
     * Set a local state property without server call.
     * @param {string} key
     * @param {*} value
     */
    set: function(h, O) {
      t[h] = O;
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      b.loading = !0, b.processing = "$sync";
      try {
        let h = S(), O = await mi(h.snapshot, null, [], h.diffs, c);
        A(O, h.diffs);
      } catch (h) {
        h.status === 422 && h.data && h.data.errors ? Ae(b.errors, h.data.errors) : Ft(h, s);
      } finally {
        b.loading = !1, b.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      co(b.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(h, O) {
      Kn(h, O, "broadcast", s, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(h, O, x) {
      Kn(O, x, "to", s, e, h);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(h, O) {
      Kn(h, O, "self", s, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(h) {
      yn(h, !0);
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
    upload: async function(h, O) {
      if (!m || !m[h]) {
        console.error('[LiVue] Property "' + h + '" is not configured for uploads.');
        return;
      }
      var x = Lr(t, h);
      x && x.__livue_upload && x.ref && Pr([x.ref]), b.uploading = !0, b.uploadProgress = 0;
      try {
        var T = await md(O, s, h, m[h].token, function(E) {
          b.uploadProgress = E;
        });
        On(t, h, {
          __livue_upload: !0,
          ref: T.ref,
          originalName: T.originalName,
          mimeType: T.mimeType,
          size: T.size,
          previewUrl: T.previewUrl
        });
      } catch (E) {
        E.status === 422 && E.data && E.data.errors ? Ae(b.errors, E.data.errors) : Ft(E, s);
      } finally {
        b.uploading = !1, b.uploadProgress = 0;
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
    uploadMultiple: async function(h, O) {
      if (!m || !m[h]) {
        console.error('[LiVue] Property "' + h + '" is not configured for uploads.');
        return;
      }
      b.uploading = !0, b.uploadProgress = 0;
      try {
        var x = await hd(O, s, h, m[h].token, function(q) {
          b.uploadProgress = q.overall;
        }), T = x.results || [], E = x.errors || [], V = Lr(t, h), B = Array.isArray(V) ? V : [];
        if (T.length > 0) {
          var M = T.map(function(q) {
            return {
              __livue_upload: !0,
              ref: q.ref,
              originalName: q.originalName,
              mimeType: q.mimeType,
              size: q.size,
              previewUrl: q.previewUrl
            };
          });
          On(t, h, B.concat(M));
        }
        if (E.length > 0) {
          var N = {};
          E.forEach(function(q) {
            var te = h + "." + q.index;
            N[te] = {
              file: q.file,
              message: q.error
            };
          }), Ae(b.errors, N);
        }
      } catch (q) {
        q.status === 422 && q.data && q.data.errors ? Ae(b.errors, q.data.errors) : Ft(q, s);
      } finally {
        b.uploading = !1, b.uploadProgress = 0;
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
    removeUpload: function(h, O) {
      var x = Lr(t, h);
      if (O !== void 0 && Array.isArray(x)) {
        var T = x[O];
        T && T.__livue_upload && T.ref && Pr([T.ref]), x.splice(O, 1), On(t, h, x.slice());
      } else
        x && x.__livue_upload && x.ref && Pr([x.ref]), On(t, h, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(h, O) {
      O = O || [], b.loading = !0, b.streaming = !0, b.processing = h, b.streamingMethod = h, I[h] = !0;
      let x;
      try {
        let T = S();
        T.method = h, T.params = O, T.componentId = e;
        let E = await Jp(T, {
          onChunk: function(V) {
          },
          onComplete: function(V) {
          },
          onError: function(V) {
            console.error("[LiVue Stream] Error:", V);
          }
        });
        E && (x = A(E, T.diffs));
      } catch (T) {
        T.status === 422 && T.data && T.data.errors ? Ae(b.errors, T.data.errors) : Ft(T, s);
      } finally {
        b.loading = !1, b.streaming = !1, b.processing = null, b.streamingMethod = null, delete I[h];
      }
      return x;
    },
    /**
     * Toggle a boolean property.
     * @param {string} property - Property name to toggle
     */
    toggle: function(h) {
      h in t && (t[h] = !t[h]);
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
    watch: function(h, O) {
      return typeof O != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : He(
        function() {
          return t[h];
        },
        function(x, T) {
          O(x, T);
        }
      );
    },
    /**
     * Get the component's root DOM element.
     * @returns {HTMLElement|null}
     */
    get $el() {
      return a.el ? a.el : document.querySelector('[data-livue-id="' + e + '"]');
    },
    /**
     * Get the component's unique ID.
     * @returns {string}
     */
    get $id() {
      return e;
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
    onError: function(h) {
      return typeof h != "function" ? (console.warn("[LiVue] onError handler must be a function"), function() {
      }) : (ec(e, h), function() {
        fo(e);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: et({
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
    _updateServerState: function(h, O) {
      p = JSON.parse(JSON.stringify(h)), _ = O;
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
      let h = In(p, t), O = {};
      for (let x in k) {
        let T = k[x], E = {}, V = [];
        for (let B in T)
          if (typeof T[B] == "function")
            V.push(B);
          else
            try {
              E[B] = JSON.parse(JSON.stringify(T[B]));
            } catch {
              E[B] = "[Unserializable]";
            }
        O[x] = { data: E, actions: V };
      }
      return {
        serverState: JSON.parse(JSON.stringify(p)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(h),
        diffs: h,
        memo: {
          name: s,
          isolate: c,
          urlParams: v,
          tabSync: f,
          hasUploads: !!m,
          uploadProps: m ? Object.keys(m) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(d),
          composableNames: Object.keys(k)
        },
        composables: O,
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
  for (let h in k)
    b[h] = k[h];
  return f && f.enabled && $p(s, function(h, O, x) {
    let T = !1;
    if (x.reactive === !0)
      T = !0;
    else if (Array.isArray(x.reactive) && x.reactive.length > 0) {
      for (let E in h)
        if (x.reactive.includes(E)) {
          T = !0;
          break;
        }
    }
    if (T) {
      for (let E in h)
        x.only && !x.only.includes(E) || x.except && x.except.includes(E) || E in t && (t[E] = h[E]);
      g = !0, b.sync();
      return;
    }
    for (let E in h)
      x.only && !x.only.includes(E) || x.except && x.except.includes(E) || E in t && (t[E] = h[E]);
    for (let E in h)
      x.only && !x.only.includes(E) || x.except && x.except.includes(E) || (p[E] = JSON.parse(JSON.stringify(h[E])));
  }), { livue: b, composables: k };
}
function Qn(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let o = {}, i = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", c = JSON.parse(d), v = c.memo ? c.memo.name : "", m = gr(c.state || {}), f = c.memo || {}, g = s.innerHTML, p = t._childRegistry[u];
    if (!p)
      for (let b in t._childRegistry) {
        let h = t._childRegistry[b];
        if (h.name === v && !i[b]) {
          p = h;
          break;
        }
      }
    if (p) {
      i[p.id] = !0;
      let b = f.reactive || [];
      if (b.length > 0) {
        for (var _ = 0; _ < b.length; _++) {
          var C = b[_];
          C in m && (p.state[C] = m[C]);
        }
        p.livue._updateServerState(m, d), p.componentRef && p.componentRef._updateTemplate && p.componentRef._updateTemplate(g);
      }
    }
    let S = !p;
    if (!p) {
      Pa++;
      let b = "livue-child-" + Pa, h = so(m), O = JSON.parse(JSON.stringify(m)), x = Object.assign({ name: f.name || v }, f), T = { _updateTemplate: null }, E = _l(), V = Do(u, h, x, T, O, d, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: E
      }), B = V.livue, M = V.composables;
      xe("component.init", {
        component: { id: u, name: v, state: h, livue: B },
        el: s,
        cleanup: E.cleanup,
        isChild: !0
      });
      let N = f.errors || null;
      N && Ae(B.errors, N), p = {
        tagName: b,
        state: h,
        memo: x,
        livue: B,
        composables: M,
        componentRef: T,
        name: v,
        id: u
      };
      let q = f.listeners || null;
      if (q)
        for (let ce in q)
          (function(ne, J) {
            dr(ce, v, u, function(ye) {
              J.call(ne, ye);
            });
          })(q[ce], B);
      let te = f.echo || null;
      te && te.length && (function(ce, ne) {
        wl(ce, te, function(J, ye) {
          ne.call(J, ye);
        });
      })(u, B), T._updateTemplate = function(ce) {
        let ne = t.el.querySelector('[data-livue-id="' + u + '"]');
        ne && zs(ne);
        let J = Qn(ce, t), ye = '<div data-livue-id="' + u + '">' + J.template + "</div>";
        for (let Ne in J.childDefs)
          t.vueApp._context.components[Ne] || t.vueApp.component(Ne, J.childDefs[Ne]);
        t.vueApp._context.components[p.tagName] = on(ye, p.state, p.livue, p.composables || {}, t._versions, p.name), t._versions[p.tagName] = (t._versions[p.tagName] || 0) + 1, Po(function() {
          let Ne = t.el.querySelector('[data-livue-id="' + u + '"]');
          Ne && Hs(Ne);
        });
      }, t._childRegistry[u] = p;
    }
    let A = p.tagName, I = s.dataset.livueRef;
    I && t._rootLivue && (t._rootLivue.refs[I] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(b, h) {
        return p.livue.call(b, h || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(b, h) {
        return p.livue.set(b, h);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(b, h) {
        return p.livue.dispatch(b, h);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return p.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return p.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return p.livue;
      }
    });
    let k = s.dataset.livueModel;
    k && t._rootState && dr("$modelUpdate", p.name, u, function(b) {
      b && b.value !== void 0 && (t._rootState[k] = b.value);
    }), S && (o[A] = on(
      '<div data-livue-id="' + u + '">' + g + "</div>",
      p.state,
      p.livue,
      p.composables || {},
      t._versions,
      p.name
    )), t._versions[A] === void 0 && (t._versions[A] = 0);
    let H = document.createElement(A);
    H.setAttribute(":key", "livueV['" + A + "']"), s.parentNode.replaceChild(H, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: o
  };
}
class uv {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(t) {
    this.el = t, this.componentId = t.dataset.livueId;
    let n = t.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = so(gr(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = et({}), this._rootDefRef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: Do,
      buildComponentDef: on,
      processTemplate: Qn,
      createReactiveState: so
    }, this._mount(r, n);
  }
  /**
   * Mount the Vue app shell. The root component is rendered via
   * <component :is> so its template can be swapped independently
   * without unmounting the Vue app.
   */
  _mount(t, n) {
    let r = this, o = {
      /**
       * Update the component template with new HTML.
       * @param {string} newInnerHtml - The new HTML content
       * @param {object} [options] - Transition options
       * @param {string} [options.transitionType] - Transition type (e.g., 'forward', 'backward')
       * @param {boolean} [options.skipTransition] - Skip the View Transition
       */
      _updateTemplate: function(g, p) {
        p = p || {}, xe("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: g
        }), zs(r.el);
        let _ = Qn(g, r);
        for (let S in _.childDefs)
          r.vueApp._context.components[S] || r.vueApp.component(S, _.childDefs[S]);
        function C() {
          r._rootDefRef.value = on(_.template, r.state, r._rootLivue, r._rootComposables || {}, r._versions, r.name), Po(function() {
            Hs(r.el), xe("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (p.skipTransition) {
          C();
          return;
        }
        Ao() ? Yp(C, { type: p.transitionType }) : C();
      }
    }, i = JSON.parse(JSON.stringify(gr(t.state || {})));
    this._cleanups = _l();
    let a = Do(this.componentId, this.state, this.memo, o, i, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, xe("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u = Qn(this.el.innerHTML, this), d = t.memo && t.memo.errors || null;
    d && Ae(l.errors, d);
    let c = t.memo && t.memo.listeners || null;
    if (c)
      for (let g in c)
        (function(p, _, C, S) {
          dr(g, C, S, function(A) {
            _.call(p, A);
          });
        })(c[g], l, r.name, r.componentId);
    let v = t.memo && t.memo.echo || null;
    v && v.length && (this._echoUnsubscribe = wl(r.componentId, v, function(g, p) {
      l.call(g, p);
    }));
    let m = on(u.template, r.state, l, s, r._versions, r.name);
    this._rootDefRef = ul(m), this.vueApp = gu({
      setup: function() {
        return {
          rootDef: r._rootDefRef
        };
      },
      template: '<component :is="rootDef"></component>'
    });
    let f;
    for (f in u.childDefs)
      this.vueApp._context.components[f] || this.vueApp.component(f, u.childDefs[f]);
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", Hp(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = Up();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let i = 0; i < window.LiVue._setupCallbacks.length; i++)
        try {
          let a = window.LiVue._setupCallbacks[i](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let o = ic();
    for (let i = 0; i < o.length; i++)
      n.directive(o[i].name, o[i].directive);
    t.el.innerHTML = "", t.vueApp.mount(t.el);
  }
  /**
   * Destroy the Vue app instance and clean up event listeners.
   */
  destroy() {
    for (let t in this._childRegistry) {
      let n = this._childRegistry[t];
      xe("component.destroy", {
        component: { id: t, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), bi(t), Aa(t), fo(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Da(n.name), gi(t);
    }
    xe("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), bi(this.componentId), Aa(this.componentId), fo(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Da(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), gi(this.componentId), this.vueApp && (this.vueApp.unmount(), this.vueApp = null);
  }
}
let Ra = /* @__PURE__ */ new Set();
function cv(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const dv = {
  mounted(e, t, n) {
    let r = cv(n);
    if (!r) {
      console.warn("[LiVue] v-init: livue helper not found in component context");
      return;
    }
    let o = e.closest("[data-livue-id]"), i = o ? o.dataset.livueId : null, a = t.value, l, s = [];
    if (Array.isArray(a) ? (l = a[0], s = a[1] || []) : l = a, typeof l != "string") {
      console.warn("[LiVue] v-init: expected method name (string), got", typeof l);
      return;
    }
    let u = (i || "unknown") + ":" + l;
    Ra.has(u) || (Ra.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Ur = /* @__PURE__ */ new WeakMap();
function fv(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const pv = {
  mounted(e, t, n) {
    e.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + e.tagName.toLowerCase() + ">");
    let r = fv(n);
    if (!r) {
      console.warn("[LiVue] v-submit: livue helper not found in component context");
      return;
    }
    let o = t.value, i, a = [];
    if (Array.isArray(o) ? (i = o[0], a = o[1] || []) : i = o, typeof i != "string") {
      console.warn("[LiVue] v-submit: expected method name (string), got", typeof i);
      return;
    }
    let l = function(s) {
      s.preventDefault(), r.call(i, a);
    };
    e.addEventListener("submit", l), Ur.set(e, l);
  },
  unmounted(e) {
    let t = Ur.get(e);
    t && (e.removeEventListener("submit", t), Ur.delete(e));
  }
}, Nn = /* @__PURE__ */ new WeakMap();
function vv(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const mv = {
  mounted(e, t, n) {
    let r = vv(n);
    if (!r) {
      console.warn("[LiVue] v-intersect: livue helper not found in component context");
      return;
    }
    let o = t.value, i, a = [];
    if (Array.isArray(o) ? (i = o[0], a = o[1] || []) : i = o, typeof i != "string") {
      console.warn("[LiVue] v-intersect: expected method name (string), got", typeof i);
      return;
    }
    let l = t.modifiers || {}, s = t.arg, u = 0;
    l.half && (u = 0.5), l.full && (u = 1);
    let d = "0px";
    if (s) {
      let f = parseInt(s, 10);
      isNaN(f) || (d = f + "px");
    }
    let c = l.leave === !0, v = !1, m = new IntersectionObserver(
      function(f) {
        let g = f[0];
        (c ? !g.isIntersecting : g.isIntersecting) && (!l.once || !v) && (v = !0, r.call(i, a), l.once && (m.disconnect(), Nn.delete(e)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    m.observe(e), Nn.set(e, m);
  },
  unmounted(e) {
    let t = Nn.get(e);
    t && (t.disconnect(), Nn.delete(e));
  }
}, zr = /* @__PURE__ */ new WeakMap();
function Hr(e, t) {
  let n = e.getAttribute("href");
  if (!n)
    return;
  let r = t.value, o = t.modifiers || {}, i = window.location.pathname, a;
  try {
    a = new URL(n, window.location.origin).pathname;
  } catch {
    return;
  }
  let l = !1;
  if (o.strict)
    l = i === a;
  else if (o.exact) {
    let s = i.replace(/\/$/, "") || "/", u = a.replace(/\/$/, "") || "/";
    l = s === u;
  } else {
    let s = a.replace(/\/$/, "") || "/";
    s === "/" ? l = i === "/" : l = i === s || i.startsWith(s + "/");
  }
  if (typeof r == "string") {
    let s = r.split(" ").filter(function(u) {
      return u.trim();
    });
    l ? (s.forEach(function(u) {
      e.classList.add(u);
    }), e.setAttribute("data-current", "")) : (s.forEach(function(u) {
      e.classList.remove(u);
    }), e.removeAttribute("data-current"));
  }
}
const hv = {
  mounted(e, t) {
    Hr(e, t);
    let n = function() {
      Hr(e, t);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), zr.set(e, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(e, t) {
    Hr(e, t);
  },
  unmounted(e, t) {
    let n = t.value;
    typeof n == "string" && n.split(" ").filter(function(o) {
      return o.trim();
    }).forEach(function(o) {
      e.classList.remove(o);
    }), e.removeAttribute("data-current");
    let r = zr.get(e);
    r && (r(), zr.delete(e));
  }
};
let Va = 0;
const gv = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    Va++;
    let n = "livue-ignore-" + Va;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, Ut = /* @__PURE__ */ new WeakMap();
let Ma = 0;
function _v(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return {
      livue: t.setupState.livue,
      state: t.setupState
    };
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return {
      livue: t.parent.setupState.livue,
      state: t.parent.setupState
    };
  let n = t ? t.parent : null;
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
function Ev(e) {
  let t = 0, n = 0, r = !1, o = !1, i = 0;
  for (let a in e) {
    if (a === "debounce") {
      r = !0;
      continue;
    }
    if (a === "throttle") {
      o = !0;
      continue;
    }
    let l = a.match(/^debounce\.?(\d+)(ms)?$/i);
    if (l) {
      t = parseInt(l[1], 10);
      continue;
    }
    let s = a.match(/^throttle\.?(\d+)(ms)?$/i);
    if (s) {
      n = parseInt(s[1], 10);
      continue;
    }
    let u = a.match(/^(\d+)(ms)?$/);
    u && (i = parseInt(u[1], 10));
  }
  return r && i > 0 && (t = i), o && i > 0 && (n = i), r && t === 0 && (t = 150), o && n === 0 && (n = 150), { debounceMs: t, throttleMs: n };
}
function Ln(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function Fa(e, t) {
  if (e.type === "checkbox")
    e.checked = !!t;
  else if (e.type === "radio")
    e.checked = e.value === String(t);
  else if (e.tagName === "SELECT" && e.multiple) {
    let n = Array.isArray(t) ? t.map(String) : [String(t)];
    Array.from(e.options).forEach(function(r) {
      r.selected = n.includes(r.value);
    });
  } else
    e.value !== String(t || "") && (e.value = t || "");
}
function yv(e) {
  return !!e.component;
}
const bv = {
  mounted(e, t, n) {
    let r = _v(n);
    if (!r) {
      console.warn("[LiVue] v-model-livue: livue helper not found in component context");
      return;
    }
    let { livue: o, state: i } = r, a = t.arg;
    if (!a) {
      console.warn("[LiVue] v-model-livue requires property name as argument (v-model-livue:propertyName)");
      return;
    }
    let l = t.modifiers || {};
    Ma++;
    let s = "model-" + Ma, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = Ev(l);
    l.live && !d && !c && (d = 150);
    function v(I) {
      if (l.number) {
        let k = Number(I);
        I = isNaN(k) ? 0 : k;
      }
      l.boolean && (I = !!I && I !== "false" && I !== "0"), i[a] && typeof i[a] == "object" && "value" in i[a] ? i[a].value = I : i[a] = I;
    }
    function m(I) {
      d > 0 ? Nt(s, d)(function() {
        v(I);
      }) : c > 0 ? En(s, c)(function() {
        v(I);
      }) : v(I);
    }
    let f;
    i[a] && typeof i[a] == "object" && "value" in i[a] ? f = i[a].value : f = i[a];
    let g = yv(n), p = n.component, _ = null, C = null, S = null, A = null;
    if (g && p)
      A = p.emit, p.emit = function(I, ...k) {
        if (I === "update:modelValue") {
          let H = k[0];
          m(H);
          return;
        }
        return A.call(p, I, ...k);
      }, p.props && "modelValue" in p.props && (S = He(
        function() {
          return i[a] && typeof i[a] == "object" && "value" in i[a] ? i[a].value : i[a];
        },
        function(I) {
          p.vnode && p.vnode.props && (p.vnode.props.modelValue = I), p.exposed && typeof p.exposed.setValue == "function" && p.exposed.setValue(I), p.update && p.update();
        },
        { immediate: !0 }
      )), Ut.set(e, {
        isComponent: !0,
        componentInstance: p,
        originalEmit: A,
        stopWatcher: S,
        property: a,
        state: i,
        modifiers: l
      });
    else {
      if (d > 0) {
        let I = Nt(s, d);
        _ = function(k) {
          let H = Ln(k.target);
          I(function() {
            v(H);
          });
        };
      } else if (c > 0) {
        let I = En(s, c);
        _ = function(k) {
          let H = Ln(k.target);
          I(function() {
            v(H);
          });
        };
      } else
        _ = function(I) {
          v(Ln(I.target));
        };
      l.enter ? (C = function(I) {
        I.key === "Enter" && v(Ln(I.target));
      }, e.addEventListener("keyup", C)) : e.addEventListener(u, _), Fa(e, f), Ut.set(e, {
        isComponent: !1,
        handler: _,
        keyHandler: C,
        eventType: u,
        property: a,
        modifiers: l,
        state: i
      });
    }
  },
  updated(e, t, n) {
    let r = Ut.get(e);
    if (r && !r.isComponent) {
      let { property: o, state: i } = r, a;
      i[o] && typeof i[o] == "object" && "value" in i[o] ? a = i[o].value : a = i[o], Fa(e, a);
    }
  },
  unmounted(e) {
    let t = Ut.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), Ut.delete(e));
  }
}, jr = /* @__PURE__ */ new WeakMap(), Sv = 2500;
function wv(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Sv;
}
function Cv(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const xv = {
  mounted(e, t, n) {
    let r = Cv(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let o = t.value, i = null, a = [];
    Array.isArray(o) ? (i = o[0], a = o[1] || []) : typeof o == "string" && (i = o);
    let l = t.modifiers || {}, s = wv(l), u = l["keep-alive"] === !0, d = l.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function v() {
      c.isPaused || d && !c.isVisible || (i ? r.call(i, a) : r.call("$refresh", []));
    }
    function m() {
      c.intervalId || (c.intervalId = setInterval(v, s));
    }
    function f() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(g) {
        c.isVisible = g[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(e)), document.addEventListener("visibilitychange", f), c.visibilityHandler = f, m(), jr.set(e, c);
  },
  unmounted(e) {
    let t = jr.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), jr.delete(e));
  }
}, Pn = /* @__PURE__ */ new WeakMap();
let _r = typeof navigator < "u" ? navigator.onLine : !0, Er = /* @__PURE__ */ new Set(), Ba = !1;
function Tv() {
  Ba || typeof window > "u" || (Ba = !0, window.addEventListener("online", function() {
    _r = !0, Er.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    _r = !1, Er.forEach(function(e) {
      e(!1);
    });
  }));
}
const Av = {
  created(e, t) {
    Tv();
    let n = t.modifiers || {}, r = t.value, o = "visibility";
    n.class ? o = n.remove ? "class-remove" : "class-add" : n.attr && (o = "attr");
    let i = {
      mode: o,
      value: r,
      originalDisplay: null
    };
    o === "visibility" && (i.originalDisplay = e.style.display || "", _r && (e.style.display = "none")), Pn.set(e, i);
  },
  mounted(e, t) {
    let n = Pn.get(e);
    if (!n)
      return;
    function r(o) {
      let i = !o;
      switch (n.mode) {
        case "visibility":
          i ? e.style.display = n.originalDisplay || "" : e.style.display = "none";
          break;
        case "class-add":
          if (n.value) {
            let a = n.value.trim().split(/\s+/);
            i ? a.forEach(function(l) {
              e.classList.add(l);
            }) : a.forEach(function(l) {
              e.classList.remove(l);
            });
          }
          break;
        case "class-remove":
          if (n.value) {
            let a = n.value.trim().split(/\s+/);
            i ? a.forEach(function(l) {
              e.classList.remove(l);
            }) : a.forEach(function(l) {
              e.classList.add(l);
            });
          }
          break;
        case "attr":
          n.value && (i ? e.setAttribute(n.value, "") : e.removeAttribute(n.value));
          break;
      }
    }
    r(_r), n.updateFn = r, Er.add(r);
  },
  unmounted(e) {
    let t = Pn.get(e);
    t && t.updateFn && Er.delete(t.updateFn), Pn.delete(e);
  }
};
let Ua = 0;
const zt = /* @__PURE__ */ new WeakMap(), qr = /* @__PURE__ */ new Map(), Ov = {
  created(e, t) {
    Ua++;
    let n = "livue-replace-" + Ua, r = t.modifiers.self === !0;
    zt.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), qr.set(n, 0);
  },
  mounted(e, t) {
    let n = zt.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = zt.get(e);
    n && (n.version++, qr.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = zt.get(e);
    t && qr.delete(t.id), zt.delete(e);
  }
}, Ht = /* @__PURE__ */ new WeakMap(), za = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Dv = 200;
function kv(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(za))
    if (e[t])
      return za[t];
  return Dv;
}
function Iv(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
function $r(e, t, n, r, o) {
  if (n.remove) {
    o ? e.style.display = "none" : e.style.display = t.originalDisplay;
    return;
  }
  if (n.class) {
    let i = (r || "").split(" ").filter(Boolean);
    o ? i.forEach(function(a) {
      t.addedClasses.includes(a) || (e.classList.add(a), t.addedClasses.push(a));
    }) : (t.addedClasses.forEach(function(a) {
      e.classList.remove(a);
    }), t.addedClasses = []);
    return;
  }
  if (n.attr) {
    let i = r || "disabled";
    o ? (e.setAttribute(i, ""), t.addedAttr = i) : t.addedAttr && (e.removeAttribute(t.addedAttr), t.addedAttr = null);
    return;
  }
  o ? e.style.display = t.originalDisplay || "" : e.style.display = "none";
}
const Nv = {
  created(e, t) {
    let n = e.style.display;
    Ht.set(e, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      delayTimer: null,
      stopWatch: null,
      isActive: !1
    });
    let r = t.modifiers || {};
    !r.remove && !r.class && !r.attr && (e.style.display = "none");
  },
  mounted(e, t, n) {
    let r = Iv(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let o = Ht.get(e), i = t.modifiers || {}, a = kv(i), l = t.value, s = null, u = null;
    i.class || i.attr ? u = l : typeof l == "string" && (s = l);
    function d(c) {
      o.delayTimer && (clearTimeout(o.delayTimer), o.delayTimer = null), c && a > 0 ? o.delayTimer = setTimeout(function() {
        o.isActive = !0, $r(e, o, i, u, !0);
      }, a) : c ? (o.isActive = !0, $r(e, o, i, u, !0)) : (o.isActive = !1, $r(e, o, i, u, !1));
    }
    o.stopWatch = He(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      d,
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    Ht.get(e);
  },
  unmounted(e) {
    let t = Ht.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), Ht.delete(e));
  }
}, Rn = /* @__PURE__ */ new WeakMap();
function Ha(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const Lv = {
  mounted(e, t, n) {
    let r = Ha(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let o = t.value;
    if (!o) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let i = He(
      function() {
        return r.isLoading(o);
      },
      function(a) {
        a ? e.setAttribute("data-loading", "") : e.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    Rn.set(e, { stopWatch: i });
  },
  updated(e, t, n) {
    let r = Rn.get(e), o = Ha(n);
    if (!r || !o) return;
    let i = t.value, a = t.oldValue;
    i !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = He(
      function() {
        return o.isLoading(i);
      },
      function(l) {
        l ? e.setAttribute("data-loading", "") : e.removeAttribute("data-loading");
      },
      { immediate: !0 }
    ));
  },
  unmounted(e) {
    let t = Rn.get(e);
    t && (t.stopWatch && t.stopWatch(), Rn.delete(e));
  }
}, jt = /* @__PURE__ */ new WeakMap(), Pv = {
  /**
   * Called when directive is first bound to the element.
   */
  mounted(e, t) {
    const n = t.value;
    if (!n || typeof n != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", n);
      return;
    }
    const r = t.modifiers.replace || !1;
    jt.set(e, { targetId: n }), Na(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = jt.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      La(n.targetId);
      const o = t.modifiers.replace || !1;
      Na(r, e, o), jt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = jt.get(e);
    t && (La(t.targetId), jt.delete(e));
  }
}, Kr = /* @__PURE__ */ new WeakMap();
let ja = 0;
function Rv(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function Vv(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
const Mv = {
  mounted(e, t, n) {
    const { arg: r, modifiers: o } = t, i = Vv(n);
    if (!i) {
      console.warn("[LiVue] v-click: livue helper not found in component context");
      return;
    }
    ja++;
    const a = "v-click-" + ja, l = Rv(o);
    let s = null, u = null;
    o.debounce && (s = Nt(a, l)), o.throttle && (u = En(a, l));
    let d = !1, c = null;
    r && (c = r);
    const v = function(p) {
      let _ = c, C = [];
      if (r) {
        _ = r;
        const A = t.value;
        A != null && (C = Array.isArray(A) ? A : [A]);
      } else {
        const A = t.value;
        typeof A == "string" ? _ = A : Array.isArray(A) && A.length > 0 && (_ = A[0], C = A.slice(1));
      }
      if (!_) {
        console.warn("[LiVue] v-click: no method specified");
        return;
      }
      const S = function() {
        i.call(_, ...C);
      };
      s ? s(S) : u ? u(S) : S();
    }, m = function(p) {
      if (!(o.self && p.target !== e)) {
        if (o.once) {
          if (d)
            return;
          d = !0;
        }
        o.prevent && p.preventDefault(), o.stop && p.stopPropagation(), v();
      }
    }, f = {};
    o.capture && (f.capture = !0), o.passive && (f.passive = !0);
    const g = {
      handler: m,
      options: f,
      outsideHandler: null
    };
    if (o.outside) {
      const p = function(_) {
        if (!e.contains(_.target) && _.target !== e) {
          if (o.once) {
            if (d)
              return;
            d = !0;
          }
          v();
        }
      };
      document.addEventListener("click", p, f), g.outsideHandler = p;
    } else
      e.addEventListener("click", m, f);
    Kr.set(e, g);
  },
  updated(e, t, n) {
  },
  unmounted(e) {
    const t = Kr.get(e);
    t && (t.outsideHandler ? document.removeEventListener("click", t.outsideHandler, t.options) : e.removeEventListener("click", t.handler, t.options), Kr.delete(e));
  }
}, Fv = {
  mounted(e, t) {
    if (e.tagName !== "A") {
      console.warn("[LiVue] v-navigate should only be used on <a> elements");
      return;
    }
    var n = t.modifiers || {};
    e.setAttribute("data-livue-navigate", "true"), (n.hover || n.prefetch) && e.setAttribute("data-livue-navigate-mode", "hover");
  },
  unmounted(e) {
    e.removeAttribute("data-livue-navigate"), e.removeAttribute("data-livue-navigate-mode");
  }
};
let qa = 0;
const Bv = {
  created(e, t) {
    let n = t.value;
    n || (qa++, n = "scroll-" + qa), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, qt = /* @__PURE__ */ new WeakMap();
function $a(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
function Ka(e, t, n, r, o) {
  if (n.class) {
    if (!r)
      return;
    let i = r.trim().split(/\s+/);
    n.remove ? o ? i.forEach(function(a) {
      e.classList.remove(a);
    }) : i.forEach(function(a) {
      e.classList.add(a);
    }) : o ? i.forEach(function(a) {
      t.addedClasses.includes(a) || (e.classList.add(a), t.addedClasses.push(a));
    }) : (t.addedClasses.forEach(function(a) {
      e.classList.remove(a);
    }), t.addedClasses = []);
    return;
  }
  if (n.attr) {
    let i = r || "data-dirty";
    o ? (e.setAttribute(i, ""), t.addedAttr = i) : t.addedAttr && (e.removeAttribute(t.addedAttr), t.addedAttr = null);
    return;
  }
  o ? e.style.display = t.originalDisplay || "" : e.style.display = "none";
}
const Uv = {
  created(e, t) {
    let n = e.style.display;
    qt.set(e, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = t.modifiers || {};
    !r.class && !r.attr && (e.style.display = "none");
  },
  mounted(e, t, n) {
    let r = $a(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let o = qt.get(e), i = t.modifiers || {}, a = t.arg || null, l = t.value;
    o.stopWatch = He(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        Ka(e, o, i, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = qt.get(e);
    if (r && t.value !== t.oldValue) {
      let o = $a(n);
      if (o) {
        let i = t.arg || null, a = i ? o.isDirty(i) : o.isDirty();
        Ka(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = qt.get(e);
    t && (t.stopWatch && t.stopWatch(), qt.delete(e));
  }
}, Vn = /* @__PURE__ */ new WeakMap();
let Wa = 0;
function zv(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Hv(e, t) {
  let n = e.instance;
  if (n) {
    let i = n.$ || n._ || n;
    if (i.setupState && i.setupState.livue)
      return {
        livue: i.setupState.livue,
        state: i.setupState
      };
    if (n.livue) {
      let a = i.setupState || n;
      return {
        livue: a.livue || n.livue,
        state: a
      };
    }
  }
  let r = t.ctx;
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
  let o = r ? r.parent : null;
  for (; o; ) {
    if (o.setupState && o.setupState.livue)
      return {
        livue: o.setupState.livue,
        state: o.setupState
      };
    o = o.parent;
  }
  return null;
}
function jv(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let o = 1; o < n.length; o++) {
    if (r == null) return;
    r = r[n[o]];
  }
  return r;
}
const qv = {
  mounted(e, t, n) {
    let r = Hv(t, n);
    if (!r) {
      console.warn("[LiVue] v-watch: Could not find livue context");
      return;
    }
    let o = t.value || e.dataset.watchPath;
    if (!o) {
      console.warn(`[LiVue] v-watch: No path found. Use v-watch="'path'" or data-watch-path="path"`);
      return;
    }
    let { livue: i, state: a } = r, l = t.modifiers || {};
    Wa++;
    let s = "watch-" + o + "-" + Wa;
    if (l.blur) {
      let v = function() {
        i.sync();
      };
      e.addEventListener("focusout", v), Vn.set(e, { blurHandler: v });
      return;
    }
    let u = zv(l) || 150, d = Nt(s, u), c = He(
      function() {
        return jv(a, o);
      },
      function() {
        d(function() {
          return i.sync();
        });
      }
    );
    Vn.set(e, { stopWatcher: c });
  },
  unmounted(e) {
    let t = Vn.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), Vn.delete(e));
  }
}, an = /* @__PURE__ */ new WeakMap();
let Ga = 0;
function $v(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function Kv(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function Wv(e, t) {
  let n = e.instance;
  if (n) {
    let i = n.$ || n._ || n;
    if (i.setupState && i.setupState.livue)
      return { state: i.setupState };
    if (n.livue)
      return { state: i.setupState || n };
  }
  let r = t.ctx;
  if (r && r.setupState && r.setupState.livue)
    return { state: r.setupState };
  if (r && r.parent && r.parent.setupState && r.parent.setupState.livue)
    return { state: r.parent.setupState };
  let o = r ? r.parent : null;
  for (; o; ) {
    if (o.setupState && o.setupState.livue)
      return { state: o.setupState };
    o = o.parent;
  }
  return null;
}
function wn(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function Cn(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function $s(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Gv(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function Yv(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function Jv(e) {
  return Yv(e) ? e : e.querySelector("input, textarea, select");
}
function xn(e, t) {
  return {
    mounted(n, r, o) {
      if ($v(o) && !Kv(o))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let i = r.arg;
      if (!i)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let a = Wv(r, o);
      if (!a)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: l } = a, s = Gv(l, i);
      if (!s)
        throw new Error("[LiVue] v-" + e + ': Property "' + i + '" not found in component state');
      let u = r.modifiers || {};
      Ga++;
      let d = e + "-" + Ga, c = Jv(n);
      if (!c) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let v = t(c, s, l, u, d);
      c.addEventListener(v.eventType, v.handler, { capture: !0 }), an.set(n, {
        targetEl: c,
        handler: v.handler,
        eventType: v.eventType
      });
    },
    unmounted(n) {
      let r = an.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), an.delete(n));
    }
  };
}
const Xv = xn("debounce", function(e, t, n, r, o) {
  let i = $s(r) || 150, a = Nt(o, i);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = wn(l.target);
      a(function() {
        Cn(n, t, s);
      });
    }
  };
}), Zv = xn("throttle", function(e, t, n, r, o) {
  let i = $s(r) || 150, a = En(o, i);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = wn(l.target);
      a(function() {
        Cn(n, t, s);
      });
    }
  };
}), oi = xn("blur", function(e, t, n, r, o) {
  let i = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Cn(n, t, wn(l.target));
  };
  return e.addEventListener("blur", a), e._livueBlurHandler = a, {
    eventType: "input",
    handler: i
  };
}), Qv = oi.unmounted;
oi.unmounted = function(e) {
  let t = an.get(e), n = t ? t.targetEl : e;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), Qv(e);
};
const ii = xn("enter", function(e, t, n, r, o) {
  let i = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Cn(n, t, wn(l.target));
  };
  return e.addEventListener("keyup", a), e._livueEnterHandler = a, {
    eventType: "input",
    handler: i
  };
}), em = ii.unmounted;
ii.unmounted = function(e) {
  let t = an.get(e), n = t ? t.targetEl : e;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), em(e);
};
const tm = xn("boolean", function(e, t, n, r, o) {
  return {
    eventType: "input",
    handler: function(i) {
      i.stopImmediatePropagation();
      let a = wn(i.target);
      a = !!a && a !== "false" && a !== "0", Cn(n, t, a);
    }
  };
});
function Ya(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ya(Object(n), !0).forEach(function(r) {
      nm(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ya(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function er(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? er = function(t) {
    return typeof t;
  } : er = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, er(e);
}
function nm(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function qe() {
  return qe = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, qe.apply(this, arguments);
}
function rm(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function om(e, t) {
  if (e == null) return {};
  var n = rm(e, t), r, o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (o = 0; o < i.length; o++)
      r = i[o], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var im = "1.15.6";
function ze(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var $e = ze(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Tn = ze(/Edge/i), Ja = ze(/firefox/i), ln = ze(/safari/i) && !ze(/chrome/i) && !ze(/android/i), ai = ze(/iP(ad|od|hone)/i), Ks = ze(/chrome/i) && ze(/android/i), Ws = {
  capture: !1,
  passive: !1
};
function z(e, t, n) {
  e.addEventListener(t, n, !$e && Ws);
}
function U(e, t, n) {
  e.removeEventListener(t, n, !$e && Ws);
}
function yr(e, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), e)
      try {
        if (e.matches)
          return e.matches(t);
        if (e.msMatchesSelector)
          return e.msMatchesSelector(t);
        if (e.webkitMatchesSelector)
          return e.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function Gs(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Ce(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && yr(e, t) : yr(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = Gs(e));
  }
  return null;
}
var Xa = /\s+/g;
function ve(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Xa, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Xa, " ");
    }
}
function P(e, t, n) {
  var r = e && e.style;
  if (r) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
    !(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function At(e, t) {
  var n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      var r = P(e, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!t && (e = e.parentNode));
  var o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(n);
}
function Ys(e, t, n) {
  if (e) {
    var r = e.getElementsByTagName(t), o = 0, i = r.length;
    if (n)
      for (; o < i; o++)
        n(r[o], o);
    return r;
  }
  return [];
}
function ke() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function Z(e, t, n, r, o) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var i, a, l, s, u, d, c;
    if (e !== window && e.parentNode && e !== ke() ? (i = e.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, u = i.right, d = i.height, c = i.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (t || n) && e !== window && (o = o || e.parentNode, !$e))
      do
        if (o && o.getBoundingClientRect && (P(o, "transform") !== "none" || n && P(o, "position") !== "static")) {
          var v = o.getBoundingClientRect();
          a -= v.top + parseInt(P(o, "border-top-width")), l -= v.left + parseInt(P(o, "border-left-width")), s = a + i.height, u = l + i.width;
          break;
        }
      while (o = o.parentNode);
    if (r && e !== window) {
      var m = At(o || e), f = m && m.a, g = m && m.d;
      m && (a /= g, l /= f, c /= f, d /= g, s = a + d, u = l + c);
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
function Za(e, t, n) {
  for (var r = Qe(e, !0), o = Z(e)[t]; r; ) {
    var i = Z(r)[n], a = void 0;
    if (a = o >= i, !a) return r;
    if (r === ke()) break;
    r = Qe(r, !1);
  }
  return !1;
}
function Lt(e, t, n, r) {
  for (var o = 0, i = 0, a = e.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== R.ghost && (r || a[i] !== R.dragged) && Ce(a[i], n.draggable, e, !1)) {
      if (o === t)
        return a[i];
      o++;
    }
    i++;
  }
  return null;
}
function li(e, t) {
  for (var n = e.lastElementChild; n && (n === R.ghost || P(n, "display") === "none" || t && !yr(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function _e(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== R.clone && (!t || yr(e, t)) && n++;
  return n;
}
function Qa(e) {
  var t = 0, n = 0, r = ke();
  if (e)
    do {
      var o = At(e), i = o.a, a = o.d;
      t += e.scrollLeft * i, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function am(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var r in t)
        if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
    }
  return -1;
}
function Qe(e, t) {
  if (!e || !e.getBoundingClientRect) return ke();
  var n = e, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var o = P(n);
      if (n.clientWidth < n.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ke();
        if (r || t) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ke();
}
function lm(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Wr(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var sn;
function Js(e, t) {
  return function() {
    if (!sn) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), sn = setTimeout(function() {
        sn = void 0;
      }, t);
    }
  };
}
function sm() {
  clearTimeout(sn), sn = void 0;
}
function Xs(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function Zs(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Qs(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(o) {
    var i, a, l, s;
    if (!(!Ce(o, t.draggable, e, !1) || o.animated || o === n)) {
      var u = Z(o);
      r.left = Math.min((i = r.left) !== null && i !== void 0 ? i : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var pe = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function um() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(o) {
          if (!(P(o, "display") === "none" || o === R.ghost)) {
            e.push({
              target: o,
              rect: Z(o)
            });
            var i = Ie({}, e[e.length - 1].rect);
            if (o.thisAnimationDuration) {
              var a = At(o, !0);
              a && (i.top -= a.f, i.left -= a.e);
            }
            o.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(r) {
      e.push(r);
    },
    removeAnimationState: function(r) {
      e.splice(am(e, {
        target: r
      }), 1);
    },
    animateAll: function(r) {
      var o = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof r == "function" && r();
        return;
      }
      var i = !1, a = 0;
      e.forEach(function(l) {
        var s = 0, u = l.target, d = u.fromRect, c = Z(u), v = u.prevFromRect, m = u.prevToRect, f = l.rect, g = At(u, !0);
        g && (c.top -= g.f, c.left -= g.e), u.toRect = c, u.thisAnimationDuration && Wr(v, c) && !Wr(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (f.top - c.top) / (f.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = dm(f, v, m, o.options)), Wr(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = o.options.animation), o.animate(u, f, c, s)), s && (i = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, o, i, a) {
      if (a) {
        P(r, "transition", ""), P(r, "transform", "");
        var l = At(this.el), s = l && l.a, u = l && l.d, d = (o.left - i.left) / (s || 1), c = (o.top - i.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, P(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = cm(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function cm(e) {
  return e.offsetWidth;
}
function dm(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var ht = [], Gr = {
  initializeByDefault: !0
}, An = {
  mount: function(t) {
    for (var n in Gr)
      Gr.hasOwnProperty(n) && !(n in t) && (t[n] = Gr[n]);
    ht.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), ht.push(t);
  },
  pluginEvent: function(t, n, r) {
    var o = this;
    this.eventCanceled = !1, r.cancel = function() {
      o.eventCanceled = !0;
    };
    var i = t + "Global";
    ht.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](Ie({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Ie({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, o) {
    ht.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, qe(r, u.defaults);
      }
    });
    for (var i in t.options)
      if (t.options.hasOwnProperty(i)) {
        var a = this.modifyOption(t, i, t.options[i]);
        typeof a < "u" && (t.options[i] = a);
      }
  },
  getEventProperties: function(t, n) {
    var r = {};
    return ht.forEach(function(o) {
      typeof o.eventProperties == "function" && qe(r, o.eventProperties.call(n[o.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var o;
    return ht.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (o = i.optionListeners[n].call(t[i.pluginName], r));
    }), o;
  }
};
function fm(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, o = e.targetEl, i = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, d = e.oldDraggableIndex, c = e.newDraggableIndex, v = e.originalEvent, m = e.putSortable, f = e.extraEventProperties;
  if (t = t || n && n[pe], !!t) {
    var g, p = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !$e && !Tn ? g = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (g = document.createEvent("Event"), g.initEvent(r, !0, !0)), g.to = a || n, g.from = l || n, g.item = o || n, g.clone = i, g.oldIndex = s, g.newIndex = u, g.oldDraggableIndex = d, g.newDraggableIndex = c, g.originalEvent = v, g.pullMode = m ? m.lastPutMode : void 0;
    var C = Ie(Ie({}, f), An.getEventProperties(r, t));
    for (var S in C)
      g[S] = C[S];
    n && n.dispatchEvent(g), p[_] && p[_].call(t, g);
  }
}
var pm = ["evt"], de = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = r.evt, i = om(r, pm);
  An.pluginEvent.bind(R)(t, n, Ie({
    dragEl: w,
    parentEl: Y,
    ghostEl: F,
    rootEl: W,
    nextEl: st,
    lastDownEl: tr,
    cloneEl: G,
    cloneHidden: Je,
    dragStarted: Gt,
    putSortable: oe,
    activeSortable: R.active,
    originalEvent: o,
    oldIndex: Ct,
    oldDraggableIndex: un,
    newIndex: me,
    newDraggableIndex: Ke,
    hideGhostForTarget: ru,
    unhideGhostForTarget: ou,
    cloneNowHidden: function() {
      Je = !0;
    },
    cloneNowShown: function() {
      Je = !1;
    },
    dispatchSortableEvent: function(l) {
      le({
        sortable: n,
        name: l,
        originalEvent: o
      });
    }
  }, i));
};
function le(e) {
  fm(Ie({
    putSortable: oe,
    cloneEl: G,
    targetEl: w,
    rootEl: W,
    oldIndex: Ct,
    oldDraggableIndex: un,
    newIndex: me,
    newDraggableIndex: Ke
  }, e));
}
var w, Y, F, W, st, tr, G, Je, Ct, me, un, Ke, Mn, oe, bt = !1, br = !1, Sr = [], ot, Se, Yr, Jr, el, tl, Gt, gt, cn, dn = !1, Fn = !1, nr, ie, Xr = [], ko = !1, wr = [], kr = typeof document < "u", Bn = ai, nl = Tn || $e ? "cssFloat" : "float", vm = kr && !Ks && !ai && "draggable" in document.createElement("div"), eu = (function() {
  if (kr) {
    if ($e)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), tu = function(t, n) {
  var r = P(t), o = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), i = Lt(t, 0, n), a = Lt(t, 1, n), l = i && P(i), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Z(i).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Z(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= o && r[nl] === "none" || a && r[nl] === "none" && u + d > o) ? "vertical" : "horizontal";
}, mm = function(t, n, r) {
  var o = r ? t.left : t.top, i = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return o === l || i === s || o + a / 2 === l + u / 2;
}, hm = function(t, n) {
  var r;
  return Sr.some(function(o) {
    var i = o[pe].options.emptyInsertThreshold;
    if (!(!i || li(o))) {
      var a = Z(o), l = t >= a.left - i && t <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return r = o;
    }
  }), r;
}, nu = function(t) {
  function n(i, a) {
    return function(l, s, u, d) {
      var c = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || c))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(l, s, u, d), a)(l, s, u, d);
      var v = (a ? l : s).options.group.name;
      return i === !0 || typeof i == "string" && i === v || i.join && i.indexOf(v) > -1;
    };
  }
  var r = {}, o = t.group;
  (!o || er(o) != "object") && (o = {
    name: o
  }), r.name = o.name, r.checkPull = n(o.pull, !0), r.checkPut = n(o.put), r.revertClone = o.revertClone, t.group = r;
}, ru = function() {
  !eu && F && P(F, "display", "none");
}, ou = function() {
  !eu && F && P(F, "display", "");
};
kr && !Ks && document.addEventListener("click", function(e) {
  if (br)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), br = !1, !1;
}, !0);
var it = function(t) {
  if (w) {
    t = t.touches ? t.touches[0] : t;
    var n = hm(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var o in t)
        t.hasOwnProperty(o) && (r[o] = t[o]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[pe]._onDragOver(r);
    }
  }
}, gm = function(t) {
  w && w.parentNode[pe]._isOutsideThisEl(t.target);
};
function R(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = qe({}, t), e[pe] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return tu(e, this.options);
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
    supportPointer: R.supportPointer !== !1 && "PointerEvent" in window && (!ln || ai),
    emptyInsertThreshold: 5
  };
  An.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  nu(t);
  for (var o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : vm, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? z(e, "pointerdown", this._onTapStart) : (z(e, "mousedown", this._onTapStart), z(e, "touchstart", this._onTapStart)), this.nativeDraggable && (z(e, "dragover", this), z(e, "dragenter", this)), Sr.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), qe(this, um());
}
R.prototype = /** @lends Sortable.prototype */
{
  constructor: R,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (gt = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, w) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, o = this.options, i = o.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, d = o.filter;
      if (xm(r), !w && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || o.disabled) && !u.isContentEditable && !(!this.nativeDraggable && ln && s && s.tagName.toUpperCase() === "SELECT") && (s = Ce(s, o.draggable, r, !1), !(s && s.animated) && tr !== s)) {
        if (Ct = _e(s), un = _e(s, o.draggable), typeof d == "function") {
          if (d.call(this, t, s, this)) {
            le({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), de("filter", n, {
              evt: t
            }), i && t.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = Ce(u, c.trim(), r, !1), c)
            return le({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), de("filter", n, {
              evt: t
            }), !0;
        }), d)) {
          i && t.preventDefault();
          return;
        }
        o.handle && !Ce(u, o.handle, r, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var o = this, i = o.el, a = o.options, l = i.ownerDocument, s;
    if (r && !w && r.parentNode === i) {
      var u = Z(r);
      if (W = i, w = r, Y = w.parentNode, st = w.nextSibling, tr = r, Mn = a.group, R.dragged = w, ot = {
        target: w,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, el = ot.clientX - u.left, tl = ot.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, w.style["will-change"] = "all", s = function() {
        if (de("delayEnded", o, {
          evt: t
        }), R.eventCanceled) {
          o._onDrop();
          return;
        }
        o._disableDelayedDragEvents(), !Ja && o.nativeDraggable && (w.draggable = !0), o._triggerDragStart(t, n), le({
          sortable: o,
          name: "choose",
          originalEvent: t
        }), ve(w, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Ys(w, d.trim(), Zr);
      }), z(l, "dragover", it), z(l, "mousemove", it), z(l, "touchmove", it), a.supportPointer ? (z(l, "pointerup", o._onDrop), !this.nativeDraggable && z(l, "pointercancel", o._onDrop)) : (z(l, "mouseup", o._onDrop), z(l, "touchend", o._onDrop), z(l, "touchcancel", o._onDrop)), Ja && this.nativeDraggable && (this.options.touchStartThreshold = 4, w.draggable = !0), de("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Tn || $e))) {
        if (R.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (z(l, "pointerup", o._disableDelayedDrag), z(l, "pointercancel", o._disableDelayedDrag)) : (z(l, "mouseup", o._disableDelayedDrag), z(l, "touchend", o._disableDelayedDrag), z(l, "touchcancel", o._disableDelayedDrag)), z(l, "mousemove", o._delayedDragTouchMoveHandler), z(l, "touchmove", o._delayedDragTouchMoveHandler), a.supportPointer && z(l, "pointermove", o._delayedDragTouchMoveHandler), o._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    w && Zr(w), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    U(t, "mouseup", this._disableDelayedDrag), U(t, "touchend", this._disableDelayedDrag), U(t, "touchcancel", this._disableDelayedDrag), U(t, "pointerup", this._disableDelayedDrag), U(t, "pointercancel", this._disableDelayedDrag), U(t, "mousemove", this._delayedDragTouchMoveHandler), U(t, "touchmove", this._delayedDragTouchMoveHandler), U(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? z(document, "pointermove", this._onTouchMove) : n ? z(document, "touchmove", this._onTouchMove) : z(document, "mousemove", this._onTouchMove) : (z(w, "dragend", this), z(W, "dragstart", this._onDragStart));
    try {
      document.selection ? rr(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (bt = !1, W && w) {
      de("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && z(document, "dragover", gm);
      var r = this.options;
      !t && ve(w, r.dragClass, !1), ve(w, r.ghostClass, !0), R.active = this, t && this._appendGhost(), le({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Se) {
      this._lastX = Se.clientX, this._lastY = Se.clientY, ru();
      for (var t = document.elementFromPoint(Se.clientX, Se.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Se.clientX, Se.clientY), t !== n); )
        n = t;
      if (w.parentNode[pe]._isOutsideThisEl(t), n)
        do {
          if (n[pe]) {
            var r = void 0;
            if (r = n[pe]._onDragOver({
              clientX: Se.clientX,
              clientY: Se.clientY,
              target: t,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = Gs(n));
      ou();
    }
  },
  _onTouchMove: function(t) {
    if (ot) {
      var n = this.options, r = n.fallbackTolerance, o = n.fallbackOffset, i = t.touches ? t.touches[0] : t, a = F && At(F, !0), l = F && a && a.a, s = F && a && a.d, u = Bn && ie && Qa(ie), d = (i.clientX - ot.clientX + o.x) / (l || 1) + (u ? u[0] - Xr[0] : 0) / (l || 1), c = (i.clientY - ot.clientY + o.y) / (s || 1) + (u ? u[1] - Xr[1] : 0) / (s || 1);
      if (!R.active && !bt) {
        if (r && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (F) {
        a ? (a.e += d - (Yr || 0), a.f += c - (Jr || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var v = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(F, "webkitTransform", v), P(F, "mozTransform", v), P(F, "msTransform", v), P(F, "transform", v), Yr = d, Jr = c, Se = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!F) {
      var t = this.options.fallbackOnBody ? document.body : W, n = Z(w, !0, Bn, !0, t), r = this.options;
      if (Bn) {
        for (ie = t; P(ie, "position") === "static" && P(ie, "transform") === "none" && ie !== document; )
          ie = ie.parentNode;
        ie !== document.body && ie !== document.documentElement ? (ie === document && (ie = ke()), n.top += ie.scrollTop, n.left += ie.scrollLeft) : ie = ke(), Xr = Qa(ie);
      }
      F = w.cloneNode(!0), ve(F, r.ghostClass, !1), ve(F, r.fallbackClass, !0), ve(F, r.dragClass, !0), P(F, "transition", ""), P(F, "transform", ""), P(F, "box-sizing", "border-box"), P(F, "margin", 0), P(F, "top", n.top), P(F, "left", n.left), P(F, "width", n.width), P(F, "height", n.height), P(F, "opacity", "0.8"), P(F, "position", Bn ? "absolute" : "fixed"), P(F, "zIndex", "100000"), P(F, "pointerEvents", "none"), R.ghost = F, t.appendChild(F), P(F, "transform-origin", el / parseInt(F.style.width) * 100 + "% " + tl / parseInt(F.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, o = t.dataTransfer, i = r.options;
    if (de("dragStart", this, {
      evt: t
    }), R.eventCanceled) {
      this._onDrop();
      return;
    }
    de("setupClone", this), R.eventCanceled || (G = Zs(w), G.removeAttribute("id"), G.draggable = !1, G.style["will-change"] = "", this._hideClone(), ve(G, this.options.chosenClass, !1), R.clone = G), r.cloneId = rr(function() {
      de("clone", r), !R.eventCanceled && (r.options.removeCloneOnHide || W.insertBefore(G, w), r._hideClone(), le({
        sortable: r,
        name: "clone"
      }));
    }), !n && ve(w, i.dragClass, !0), n ? (br = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (U(document, "mouseup", r._onDrop), U(document, "touchend", r._onDrop), U(document, "touchcancel", r._onDrop), o && (o.effectAllowed = "move", i.setData && i.setData.call(r, o, w)), z(document, "drop", r), P(w, "transform", "translateZ(0)")), bt = !0, r._dragStartId = rr(r._dragStarted.bind(r, n, t)), z(document, "selectstart", r), Gt = !0, window.getSelection().removeAllRanges(), ln && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, o, i, a, l = this.options, s = l.group, u = R.active, d = Mn === s, c = l.sort, v = oe || u, m, f = this, g = !1;
    if (ko) return;
    function p(q, te) {
      de(q, f, Ie({
        evt: t,
        isOwner: d,
        axis: m ? "vertical" : "horizontal",
        revert: a,
        dragRect: o,
        targetRect: i,
        canSort: c,
        fromSortable: v,
        target: r,
        completed: C,
        onMove: function(ne, J) {
          return Un(W, n, w, o, ne, Z(ne), t, J);
        },
        changed: S
      }, te));
    }
    function _() {
      p("dragOverAnimationCapture"), f.captureAnimationState(), f !== v && v.captureAnimationState();
    }
    function C(q) {
      return p("dragOverCompleted", {
        insertion: q
      }), q && (d ? u._hideClone() : u._showClone(f), f !== v && (ve(w, oe ? oe.options.ghostClass : u.options.ghostClass, !1), ve(w, l.ghostClass, !0)), oe !== f && f !== R.active ? oe = f : f === R.active && oe && (oe = null), v === f && (f._ignoreWhileAnimating = r), f.animateAll(function() {
        p("dragOverAnimationComplete"), f._ignoreWhileAnimating = null;
      }), f !== v && (v.animateAll(), v._ignoreWhileAnimating = null)), (r === w && !w.animated || r === n && !r.animated) && (gt = null), !l.dragoverBubble && !t.rootEl && r !== document && (w.parentNode[pe]._isOutsideThisEl(t.target), !q && it(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), g = !0;
    }
    function S() {
      me = _e(w), Ke = _e(w, l.draggable), le({
        sortable: f,
        name: "change",
        toEl: n,
        newIndex: me,
        newDraggableIndex: Ke,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = Ce(r, l.draggable, n, !0), p("dragOver"), R.eventCanceled) return g;
    if (w.contains(t.target) || r.animated && r.animatingX && r.animatingY || f._ignoreWhileAnimating === r)
      return C(!1);
    if (br = !1, u && !l.disabled && (d ? c || (a = Y !== W) : oe === this || (this.lastPutMode = Mn.checkPull(this, u, w, t)) && s.checkPut(this, u, w, t))) {
      if (m = this._getDirection(t, r) === "vertical", o = Z(w), p("dragOverValid"), R.eventCanceled) return g;
      if (a)
        return Y = W, _(), this._hideClone(), p("revert"), R.eventCanceled || (st ? W.insertBefore(w, st) : W.appendChild(w)), C(!0);
      var A = li(n, l.draggable);
      if (!A || bm(t, m, this) && !A.animated) {
        if (A === w)
          return C(!1);
        if (A && n === t.target && (r = A), r && (i = Z(r)), Un(W, n, w, o, r, i, t, !!r) !== !1)
          return _(), A && A.nextSibling ? n.insertBefore(w, A.nextSibling) : n.appendChild(w), Y = n, S(), C(!0);
      } else if (A && ym(t, m, this)) {
        var I = Lt(n, 0, l, !0);
        if (I === w)
          return C(!1);
        if (r = I, i = Z(r), Un(W, n, w, o, r, i, t, !1) !== !1)
          return _(), n.insertBefore(w, I), Y = n, S(), C(!0);
      } else if (r.parentNode === n) {
        i = Z(r);
        var k = 0, H, b = w.parentNode !== n, h = !mm(w.animated && w.toRect || o, r.animated && r.toRect || i, m), O = m ? "top" : "left", x = Za(r, "top", "top") || Za(w, "top", "top"), T = x ? x.scrollTop : void 0;
        gt !== r && (H = i[O], dn = !1, Fn = !h && l.invertSwap || b), k = Sm(t, r, i, m, h ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Fn, gt === r);
        var E;
        if (k !== 0) {
          var V = _e(w);
          do
            V -= k, E = Y.children[V];
          while (E && (P(E, "display") === "none" || E === F));
        }
        if (k === 0 || E === r)
          return C(!1);
        gt = r, cn = k;
        var B = r.nextElementSibling, M = !1;
        M = k === 1;
        var N = Un(W, n, w, o, r, i, t, M);
        if (N !== !1)
          return (N === 1 || N === -1) && (M = N === 1), ko = !0, setTimeout(Em, 30), _(), M && !B ? n.appendChild(w) : r.parentNode.insertBefore(w, M ? B : r), x && Xs(x, 0, T - x.scrollTop), Y = w.parentNode, H !== void 0 && !Fn && (nr = Math.abs(H - Z(r)[O])), S(), C(!0);
      }
      if (n.contains(w))
        return C(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    U(document, "mousemove", this._onTouchMove), U(document, "touchmove", this._onTouchMove), U(document, "pointermove", this._onTouchMove), U(document, "dragover", it), U(document, "mousemove", it), U(document, "touchmove", it);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    U(t, "mouseup", this._onDrop), U(t, "touchend", this._onDrop), U(t, "pointerup", this._onDrop), U(t, "pointercancel", this._onDrop), U(t, "touchcancel", this._onDrop), U(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (me = _e(w), Ke = _e(w, r.draggable), de("drop", this, {
      evt: t
    }), Y = w && w.parentNode, me = _e(w), Ke = _e(w, r.draggable), R.eventCanceled) {
      this._nulling();
      return;
    }
    bt = !1, Fn = !1, dn = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Io(this.cloneId), Io(this._dragStartId), this.nativeDraggable && (U(document, "drop", this), U(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ln && P(document.body, "user-select", ""), P(w, "transform", ""), t && (Gt && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), F && F.parentNode && F.parentNode.removeChild(F), (W === Y || oe && oe.lastPutMode !== "clone") && G && G.parentNode && G.parentNode.removeChild(G), w && (this.nativeDraggable && U(w, "dragend", this), Zr(w), w.style["will-change"] = "", Gt && !bt && ve(w, oe ? oe.options.ghostClass : this.options.ghostClass, !1), ve(w, this.options.chosenClass, !1), le({
      sortable: this,
      name: "unchoose",
      toEl: Y,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), W !== Y ? (me >= 0 && (le({
      rootEl: Y,
      name: "add",
      toEl: Y,
      fromEl: W,
      originalEvent: t
    }), le({
      sortable: this,
      name: "remove",
      toEl: Y,
      originalEvent: t
    }), le({
      rootEl: Y,
      name: "sort",
      toEl: Y,
      fromEl: W,
      originalEvent: t
    }), le({
      sortable: this,
      name: "sort",
      toEl: Y,
      originalEvent: t
    })), oe && oe.save()) : me !== Ct && me >= 0 && (le({
      sortable: this,
      name: "update",
      toEl: Y,
      originalEvent: t
    }), le({
      sortable: this,
      name: "sort",
      toEl: Y,
      originalEvent: t
    })), R.active && ((me == null || me === -1) && (me = Ct, Ke = un), le({
      sortable: this,
      name: "end",
      toEl: Y,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    de("nulling", this), W = w = Y = F = st = G = tr = Je = ot = Se = Gt = me = Ke = Ct = un = gt = cn = oe = Mn = R.dragged = R.ghost = R.clone = R.active = null, wr.forEach(function(t) {
      t.checked = !0;
    }), wr.length = Yr = Jr = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        w && (this._onDragOver(t), _m(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var t = [], n, r = this.el.children, o = 0, i = r.length, a = this.options; o < i; o++)
      n = r[o], Ce(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Cm(n));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, n) {
    var r = {}, o = this.el;
    this.toArray().forEach(function(i, a) {
      var l = o.children[a];
      Ce(l, this.options.draggable, o, !1) && (r[i] = l);
    }, this), n && this.captureAnimationState(), t.forEach(function(i) {
      r[i] && (o.removeChild(r[i]), o.appendChild(r[i]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(t, n) {
    return Ce(t, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, n) {
    var r = this.options;
    if (n === void 0)
      return r[t];
    var o = An.modifyOption(this, t, n);
    typeof o < "u" ? r[t] = o : r[t] = n, t === "group" && nu(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    de("destroy", this);
    var t = this.el;
    t[pe] = null, U(t, "mousedown", this._onTapStart), U(t, "touchstart", this._onTapStart), U(t, "pointerdown", this._onTapStart), this.nativeDraggable && (U(t, "dragover", this), U(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Sr.splice(Sr.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Je) {
      if (de("hideClone", this), R.eventCanceled) return;
      P(G, "display", "none"), this.options.removeCloneOnHide && G.parentNode && G.parentNode.removeChild(G), Je = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Je) {
      if (de("showClone", this), R.eventCanceled) return;
      w.parentNode == W && !this.options.group.revertClone ? W.insertBefore(G, w) : st ? W.insertBefore(G, st) : W.appendChild(G), this.options.group.revertClone && this.animate(w, G), P(G, "display", ""), Je = !1;
    }
  }
};
function _m(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Un(e, t, n, r, o, i, a, l) {
  var s, u = e[pe], d = u.options.onMove, c;
  return window.CustomEvent && !$e && !Tn ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = o || t, s.relatedRect = i || Z(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function Zr(e) {
  e.draggable = !1;
}
function Em() {
  ko = !1;
}
function ym(e, t, n) {
  var r = Z(Lt(n.el, 0, n.options, !0)), o = Qs(n.el, n.options, F), i = 10;
  return t ? e.clientX < o.left - i || e.clientY < r.top && e.clientX < r.right : e.clientY < o.top - i || e.clientY < r.bottom && e.clientX < r.left;
}
function bm(e, t, n) {
  var r = Z(li(n.el, n.options.draggable)), o = Qs(n.el, n.options, F), i = 10;
  return t ? e.clientX > o.right + i || e.clientY > r.bottom && e.clientX > r.left : e.clientY > o.bottom + i || e.clientX > r.right && e.clientY > r.top;
}
function Sm(e, t, n, r, o, i, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, v = !1;
  if (!a) {
    if (l && nr < u * o) {
      if (!dn && (cn === 1 ? s > d + u * i / 2 : s < c - u * i / 2) && (dn = !0), dn)
        v = !0;
      else if (cn === 1 ? s < d + nr : s > c - nr)
        return -cn;
    } else if (s > d + u * (1 - o) / 2 && s < c - u * (1 - o) / 2)
      return wm(t);
  }
  return v = v || a, v && (s < d + u * i / 2 || s > c - u * i / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function wm(e) {
  return _e(w) < _e(e) ? 1 : -1;
}
function Cm(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function xm(e) {
  wr.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && wr.push(r);
  }
}
function rr(e) {
  return setTimeout(e, 0);
}
function Io(e) {
  return clearTimeout(e);
}
kr && z(document, "touchmove", function(e) {
  (R.active || bt) && e.cancelable && e.preventDefault();
});
R.utils = {
  on: z,
  off: U,
  css: P,
  find: Ys,
  is: function(t, n) {
    return !!Ce(t, n, t, !1);
  },
  extend: lm,
  throttle: Js,
  closest: Ce,
  toggleClass: ve,
  clone: Zs,
  index: _e,
  nextTick: rr,
  cancelNextTick: Io,
  detectDirection: tu,
  getChild: Lt,
  expando: pe
};
R.get = function(e) {
  return e[pe];
};
R.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (R.utils = Ie(Ie({}, R.utils), r.utils)), An.mount(r);
  });
};
R.create = function(e, t) {
  return new R(e, t);
};
R.version = im;
var X = [], Yt, No, Lo = !1, Qr, eo, Cr, Jt;
function Tm() {
  function e() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var t in this)
      t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
  }
  return e.prototype = {
    dragStarted: function(n) {
      var r = n.originalEvent;
      this.sortable.nativeDraggable ? z(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? z(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? z(document, "touchmove", this._handleFallbackAutoScroll) : z(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? U(document, "dragover", this._handleAutoScroll) : (U(document, "pointermove", this._handleFallbackAutoScroll), U(document, "touchmove", this._handleFallbackAutoScroll), U(document, "mousemove", this._handleFallbackAutoScroll)), rl(), or(), sm();
    },
    nulling: function() {
      Cr = No = Yt = Lo = Jt = Qr = eo = null, X.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var o = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (Cr = n, r || this.options.forceAutoScrollFallback || Tn || $e || ln) {
        to(n, this.options, l, r);
        var s = Qe(l, !0);
        Lo && (!Jt || i !== Qr || a !== eo) && (Jt && rl(), Jt = setInterval(function() {
          var u = Qe(document.elementFromPoint(i, a), !0);
          u !== s && (s = u, or()), to(n, o.options, u, r);
        }, 10), Qr = i, eo = a);
      } else {
        if (!this.options.bubbleScroll || Qe(l, !0) === ke()) {
          or();
          return;
        }
        to(n, this.options, Qe(l, !1), !1);
      }
    }
  }, qe(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function or() {
  X.forEach(function(e) {
    clearInterval(e.pid);
  }), X = [];
}
function rl() {
  clearInterval(Jt);
}
var to = Js(function(e, t, n, r) {
  if (t.scroll) {
    var o = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = ke(), u = !1, d;
    No !== n && (No = n, or(), Yt = t.scroll, d = t.scrollFn, Yt === !0 && (Yt = Qe(n, !0)));
    var c = 0, v = Yt;
    do {
      var m = v, f = Z(m), g = f.top, p = f.bottom, _ = f.left, C = f.right, S = f.width, A = f.height, I = void 0, k = void 0, H = m.scrollWidth, b = m.scrollHeight, h = P(m), O = m.scrollLeft, x = m.scrollTop;
      m === s ? (I = S < H && (h.overflowX === "auto" || h.overflowX === "scroll" || h.overflowX === "visible"), k = A < b && (h.overflowY === "auto" || h.overflowY === "scroll" || h.overflowY === "visible")) : (I = S < H && (h.overflowX === "auto" || h.overflowX === "scroll"), k = A < b && (h.overflowY === "auto" || h.overflowY === "scroll"));
      var T = I && (Math.abs(C - o) <= a && O + S < H) - (Math.abs(_ - o) <= a && !!O), E = k && (Math.abs(p - i) <= a && x + A < b) - (Math.abs(g - i) <= a && !!x);
      if (!X[c])
        for (var V = 0; V <= c; V++)
          X[V] || (X[V] = {});
      (X[c].vx != T || X[c].vy != E || X[c].el !== m) && (X[c].el = m, X[c].vx = T, X[c].vy = E, clearInterval(X[c].pid), (T != 0 || E != 0) && (u = !0, X[c].pid = setInterval(function() {
        r && this.layer === 0 && R.active._onTouchMove(Cr);
        var B = X[this.layer].vy ? X[this.layer].vy * l : 0, M = X[this.layer].vx ? X[this.layer].vx * l : 0;
        typeof d == "function" && d.call(R.dragged.parentNode[pe], M, B, e, Cr, X[this.layer].el) !== "continue" || Xs(X[this.layer].el, M, B);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (t.bubbleScroll && v !== s && (v = Qe(v, !1)));
    Lo = u;
  }
}, 30), iu = function(t) {
  var n = t.originalEvent, r = t.putSortable, o = t.dragEl, i = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (n) {
    var u = r || i;
    l();
    var d = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(d.clientX, d.clientY);
    s(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: o,
      putSortable: r
    }));
  }
};
function si() {
}
si.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var o = Lt(this.sortable.el, this.startIndex, this.options);
    o ? this.sortable.el.insertBefore(n, o) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: iu
};
qe(si, {
  pluginName: "revertOnSpill"
});
function ui() {
}
ui.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, o = r || this.sortable;
    o.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), o.animateAll();
  },
  drop: iu
};
qe(ui, {
  pluginName: "removeOnSpill"
});
R.mount(new Tm());
R.mount(ui, si);
const xt = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap();
function Am(e) {
  let t = e.ctx;
  if (t && t.setupState && t.setupState.livue)
    return t.setupState.livue;
  if (t && t.parent && t.parent.setupState && t.parent.setupState.livue)
    return t.parent.setupState.livue;
  let n = t ? t.parent : null;
  for (; n; ) {
    if (n.setupState && n.setupState.livue)
      return n.setupState.livue;
    n = n.parent;
  }
  return null;
}
function Om(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const zn = /* @__PURE__ */ new WeakMap(), Dm = {
  mounted(e, t, n) {
    let r = Am(n), o = t.modifiers || {}, i = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof i != "string" && !Array.isArray(i) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof i + ".");
    let a = Om(o), l = o.horizontal ? "horizontal" : "vertical";
    zn.set(e, t);
    let s = e.dataset.livueSortGroup || null, u = {
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
      onEnd: function(v) {
        let m = v.newIndex, f = v.oldIndex;
        if (f === m)
          return;
        let g = zn.get(e), p = g ? g.value : null, _ = typeof p == "string";
        if (Array.isArray(p)) {
          let S = v.from;
          f < m ? S.insertBefore(v.item, S.children[f]) : S.insertBefore(v.item, S.children[f + 1]);
          let A = p.splice(f, 1)[0];
          p.splice(m, 0, A);
          return;
        }
        if (_ && r) {
          let S = p, A = [], I = v.item, k = ir.get(I);
          k === void 0 && (k = I.dataset.livueSortItem), typeof k == "string" && /^\d+$/.test(k) && (k = parseInt(k, 10));
          let H = v.from, b = v.to, h = [k, m].concat(A);
          if (H !== b) {
            let x = b.dataset.livueSortMethod;
            x && (S = x);
            let T = H.dataset.livueSortId || H.dataset.livueSortGroup || null;
            h.push(T);
          }
          r.call(S, h);
        }
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let c = R.create(e, u);
    xt.set(e, c);
  },
  updated(e, t) {
    zn.set(e, t);
    let n = xt.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = xt.get(e);
    t && (t.destroy(), xt.delete(e)), zn.delete(e);
  }
}, km = {
  mounted(e, t) {
    let n = t.value;
    ir.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    ir.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (ir.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Im = {
  mounted(e) {
    e.setAttribute("data-livue-sort-handle", "");
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-handle");
      } catch {
      }
  }
}, Nm = {
  mounted(e) {
    e.setAttribute("data-livue-sort-ignore", "");
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-ignore");
      } catch {
      }
  }
}, Lm = {
  mounted(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = xt.get(e);
    r && r.option("group", n);
  },
  updated(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = xt.get(e);
    r && r.option("group", n);
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
};
function Pm() {
  $("init", dv), $("submit", pv), $("intersect", mv), $("current", hv), $("ignore", gv), $("model-livue", bv), $("debounce", Xv), $("throttle", Zv), $("blur", oi), $("enter", ii), $("boolean", tm), $("poll", xv), $("offline", Av), $("transition", Gp), $("replace", Ov), $("loading", Nv), $("target", Lv), $("stream", Pv), $("click", Mv), $("navigate", Fv), $("scroll", Bv), $("dirty", Uv), $("watch", qv), $("sort", Dm), $("sort-item", km), $("sort-handle", Im), $("sort-ignore", Nm), $("sort-group", Lm);
}
let We = null, $t = null, ol = !1;
function Rm() {
  if (ol)
    return;
  ol = !0;
  const e = document.createElement("style");
  e.textContent = `
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
    `, document.head.appendChild(e);
}
function Vm() {
  return We || (Rm(), We = document.createElement("div"), We.className = "livue-hmr-indicator", document.body.appendChild(We), We);
}
function Hn(e, t) {
  const n = Vm();
  switch ($t && (clearTimeout($t), $t = null), e) {
    case "updating":
      n.innerHTML = `
                <span class="spinner"></span>
                <span>Updating${t ? ": " + t : "..."}</span>
            `;
      break;
    case "done":
      n.innerHTML = `
                <span class="checkmark">&#10003;</span>
                <span>Updated</span>
            `, $t = setTimeout(function() {
        il();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, $t = setTimeout(function() {
        il();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function il() {
  We && We.classList.remove("visible");
}
let vt = null, Ir = !0, au = !0, Xt = !0, ar = [];
function Mm(e) {
  vt = e;
}
async function Fm(e) {
  if (Ir) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), Xt && Hn("updating", e.fileName), ar.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = au ? Bm() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), Xt && Hn("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), vt.reboot(), t && (await zm(), Um(t)), Xt && Hn("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), Xt && Hn("error");
    }
  }
}
function Bm() {
  const e = /* @__PURE__ */ new Map();
  return vt && vt.all().forEach(function(n) {
    if (al(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const o = n._childRegistry[r];
        al(r, o.name, o.state, e);
      }
  }), e;
}
function al(e, t, n, r) {
  const o = {};
  for (const i in n) {
    const a = n[i];
    if (!(typeof a == "function" || typeof a == "symbol"))
      try {
        o[i] = JSON.parse(JSON.stringify(a));
      } catch {
        console.warn("[LiVue HMR] Could not save state for " + t + "." + i);
      }
  }
  r.set(e, { name: t, state: o });
}
function Um(e) {
  vt && e.forEach(function(t, n) {
    const r = vt.getByName(t.name);
    if (r.length > 0) {
      const o = r[0];
      for (const i in t.state)
        i in o.state && (o.state[i] = t.state[i]);
    }
  });
}
function zm() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Hm() {
  return typeof import.meta < "u" && !1;
}
function jm() {
  Ir = !0;
}
function qm() {
  Ir = !1;
}
function $m() {
  return Ir;
}
function Km(e) {
  e.indicator !== void 0 && (Xt = e.indicator), e.preserveState !== void 0 && (au = e.preserveState);
}
function Wm(e) {
  return ar.push(e), function() {
    const t = ar.indexOf(e);
    t !== -1 && ar.splice(t, 1);
  };
}
async function Gm() {
  vt && await Fm({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var _t = !1, no = [];
class Ym {
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
  setup(t) {
    if (typeof t != "function") {
      console.error("[LiVue] setup() requires a function callback");
      return;
    }
    this._setupCallbacks.push(t);
  }
  /**
   * Register a global error handler.
   * Called when a non-validation error occurs on any component.
   *
   * @param {Function} handler - function(error, componentName)
   */
  onError(t) {
    Qu(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    process.env.NODE_ENV !== "production" && !this._devtoolsInitialized && ($l(this), this._devtoolsInitialized = !0), Pm(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), ku(this), this._startObserver(), process.env.NODE_ENV !== "production" && this._setupDevtoolsShortcut(), Mm(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(t) {
      t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Kl());
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
  navigate(t) {
    yn(t, !0, !1);
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
  configureNavigation(t) {
    Du(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return Tr(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    Bu();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return $u();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return nt;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: mt(),
      ...cc()
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
  _isRoot(t) {
    if (t.hasAttribute("data-livue-island"))
      return !0;
    let n = t.parentElement;
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
  _initComponent(t) {
    let n = t.dataset.livueId;
    if (this.components.has(n))
      return;
    let r = new uv(t);
    this.components.set(n, r);
  }
  /**
   * Get a mounted component instance by its ID.
   *
   * @param {string} id
   * @returns {LiVueComponent|undefined}
   */
  getComponent(t) {
    return this.components.get(t);
  }
  /**
   * Find a component by its ID.
   * Alias for getComponent.
   *
   * @param {string} id
   * @returns {LiVueComponent|undefined}
   */
  find(t) {
    return this.components.get(t);
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
  getByName(t) {
    let n = [];
    return this.components.forEach(function(r) {
      r.name === t && n.push({
        id: r.componentId,
        name: r.name,
        state: r.state,
        livue: r._rootLivue
      });
      for (let o in r._childRegistry) {
        let i = r._childRegistry[o];
        i.name === t && n.push({
          id: o,
          name: i.name,
          state: i.state,
          livue: i.livue
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
  hook(t, n) {
    return Re(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return vi();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), _i();
  }
  /**
   * Destroy all mounted Vue app instances EXCEPT those with IDs in the preserveIds set.
   * Used during SPA navigation to preserve @persist components.
   *
   * @param {Set<string>} preserveIds - Set of component IDs to preserve
   */
  destroyExcept(t) {
    var n = this, r = [];
    this._preservingIds = t, this.components.forEach(function(o, i) {
      t.has(i) || (o.destroy(), r.push(i));
    }), r.forEach(function(o) {
      n.components.delete(o);
    }), _i();
  }
  /**
   * Start the MutationObserver to watch for DOM changes.
   * Automatically initializes new LiVue components and cleans up removed ones.
   */
  _startObserver() {
    if (this._observer)
      return;
    let t = this;
    this._observer = new MutationObserver(function(n) {
      n.forEach(function(r) {
        r.addedNodes.forEach(function(o) {
          o.nodeType === Node.ELEMENT_NODE && t._processAddedNode(o);
        }), r.removedNodes.forEach(function(o) {
          o.nodeType === Node.ELEMENT_NODE && t._processRemovedNode(o);
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
  _processAddedNode(t) {
    t.hasAttribute && t.hasAttribute("data-livue-id") && this._isRoot(t) && this._initComponent(t), t.querySelectorAll && t.querySelectorAll("[data-livue-id]").forEach(function(r) {
      this._isRoot(r) && this._initComponent(r);
    }.bind(this)), this._processStandaloneLazy(t);
  }
  /**
   * Find and wrap standalone <livue-lazy> elements.
   * These are lazy components injected outside of any LiVue root.
   *
   * @param {HTMLElement} node
   */
  _processStandaloneLazy(t) {
    let n = [];
    t.tagName && t.tagName.toLowerCase() === "livue-lazy" && this._isStandaloneLazy(t) && n.push(t), t.querySelectorAll && t.querySelectorAll("livue-lazy").forEach(function(o) {
      this._isStandaloneLazy(o) && n.push(o);
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
  _isStandaloneLazy(t) {
    if (t.dataset.livueLazyWrapped)
      return !1;
    let n = t.parentElement;
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
  _wrapStandaloneLazy(t) {
    t.dataset.livueLazyWrapped = "true";
    let n = document.createElement("div"), r = "livue-lazy-wrapper-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9), o = {
      state: {},
      memo: {
        name: "lazy-wrapper",
        checksum: ""
      }
    };
    n.dataset.livueId = r, n.dataset.livueSnapshot = JSON.stringify(o), t.parentNode.insertBefore(n, t), n.appendChild(t), this._initComponent(n);
  }
  /**
   * Process a node that was removed from the DOM.
   * Cleans up any LiVue components that were destroyed.
   *
   * @param {HTMLElement} node
   */
  _processRemovedNode(t) {
    if (t.hasAttribute && t.hasAttribute("data-livue-id")) {
      let n = t.dataset.livueId;
      this._cleanupComponent(n);
    }
    t.querySelectorAll && t.querySelectorAll("[data-livue-id]").forEach(function(r) {
      let o = r.dataset.livueId;
      this._cleanupComponent(o);
    }.bind(this));
  }
  /**
   * Clean up a component by ID if it exists.
   *
   * @param {string} id
   */
  _cleanupComponent(t) {
    if (this._preservingIds && this._preservingIds.has(t))
      return;
    let n = this.components.get(t);
    n && (n.destroy(), this.components.delete(t));
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
  setConfirmHandler(t) {
    window.LiVue = window.LiVue || {}, window.LiVue.confirmHandler = t;
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
    return process.env.NODE_ENV === "production" ? {
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
    } : fd;
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
      isAvailable: Hm,
      isEnabled: $m,
      enable: jm,
      disable: qm,
      configure: Km,
      onUpdate: Wm,
      trigger: Gm
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
  debug(t) {
    if (t && !_t) {
      _t = !0, console.log("[LiVue] Debug mode enabled");
      var n = vi();
      n.forEach(function(r) {
        var o = Re(r, function(i) {
          var a = {};
          i.component && (a.componentId = i.component.id, a.componentName = i.component.name), i.el && (a.element = i.el.tagName), i.url && (a.url = i.url), i.updateCount !== void 0 && (a.updateCount = i.updateCount), i.lazyCount !== void 0 && (a.lazyCount = i.lazyCount), i.success !== void 0 && (a.success = i.success), i.error && (a.error = i.error.message || String(i.error)), i.isChild !== void 0 && (a.isChild = i.isChild), console.log("[LiVue] " + r + ":", a);
        });
        no.push(o);
      });
    } else !t && _t && (_t = !1, console.log("[LiVue] Debug mode disabled"), no.forEach(function(r) {
      r();
    }), no = []);
    return _t;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return _t;
  }
}
const ci = new Ym();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = _u, document.head.appendChild(e);
}
var Pe = window.LiVueConfig || {};
(Pe.showProgressBar !== void 0 || Pe.progressBarColor !== void 0 || Pe.prefetch !== void 0 || Pe.prefetchOnHover !== void 0 || Pe.hoverDelay !== void 0 || Pe.cachePages !== void 0 || Pe.maxCacheSize !== void 0 || Pe.restoreScroll !== void 0) && ci.configureNavigation(Pe);
function ll() {
  ci.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ll) : queueMicrotask(ll);
window.LiVue = ci;
export {
  ci as default
};
//# sourceMappingURL=livue.esm.js.map
