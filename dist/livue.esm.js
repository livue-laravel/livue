import * as Dn from "vue";
import { reactive as Ne, toRefs as oo, inject as ao, provide as lo, nextTick as sr, onBeforeUnmount as so, onBeforeMount as uo, onUnmounted as yi, onMounted as bi, readonly as co, watchEffect as fo, watch as Oe, computed as po, ref as an, shallowRef as ur, effectScope as ho, markRaw as mo, defineComponent as vo, h as Sr, createApp as go } from "vue";
const yo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function wi(t, e) {
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
  return JSON.stringify(t, wi);
}
function $n(t) {
  return Ne(Object.assign({}, t));
}
function bo(t, e) {
  let n;
  for (n in e) {
    let r = _r(t[n]), i = _r(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function Ei(t) {
  return JSON.parse(JSON.stringify(t, wi));
}
function wo(t) {
  return oo(t);
}
function Tn(t, e) {
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
function Rt(t, e, n) {
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
function Vt(t, e) {
  let n = {}, r = Ei(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function Eo(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function Un(t) {
  if (Eo(t))
    return t[0];
  if (Array.isArray(t))
    return t.map(Un);
  if (t && typeof t == "object") {
    let e = {};
    for (let n in t)
      e[n] = Un(t[n]);
    return e;
  }
  return t;
}
function Tt(t) {
  let e = {};
  for (let n in t)
    e[n] = Un(t[n]);
  return e;
}
let Ar = 0;
function So() {
  return Ar++, Ar;
}
let Si = /* @__PURE__ */ new Map();
function _o(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function Ao(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function _i(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Si.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: _o(n)
    });
  });
}
function Ai(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Si.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Ao(n, i.inputs));
  });
}
let Di = {
  ref: an,
  computed: po,
  watch: Oe,
  watchEffect: fo,
  reactive: Ne,
  readonly: co,
  onMounted: bi,
  onUnmounted: yi,
  onBeforeMount: uo,
  onBeforeUnmount: so,
  nextTick: sr,
  provide: lo,
  inject: ao
}, Ti = Object.keys(Di), Do = Ti.map(function(t) {
  return Di[t];
});
function Dr(t) {
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
function To(t, e, n) {
  let r = Object.keys(e), i = r.map(function(s) {
    return e[s];
  }), o = Ti.concat(r).concat(["livue"]), a = Do.concat(i).concat([n]);
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
function Tr(t) {
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
function Cr(t) {
  return t.replace(/\$errors\b/g, "lvErrors");
}
function Ci(t) {
  if (!(!t || typeof t != "object") && (t.dynamicChildren = null, Array.isArray(t.children)))
    for (let e = 0; e < t.children.length; e++)
      Ci(t.children[e]);
}
function Jn(t, e, n, r, i, o) {
  let a = Tr(t);
  a = Cr(a);
  let s = Dr(a), l = Dn.compile(s.html), u = ur(l), d = [];
  function c(m, h) {
    let y = u.value, E = y(m, d);
    return Ci(E), E;
  }
  c._rc = !0;
  let p = {
    name: o || "LiVueComponent",
    render: c,
    setup: function() {
      Dn.provide("livue", n);
      let m = wo(e);
      var h = new Proxy(n.errors, {
        get: function(D, x, T) {
          var L = Reflect.get(D, x, T);
          return Array.isArray(L) ? L[0] : L;
        }
      });
      let y = Object.assign({}, m, r, { livue: n, livueV: i, lvErrors: h });
      if (s.setupCode) {
        let D = To(s.setupCode, m, n);
        D && Object.assign(y, D);
      }
      var E = {
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
      }, C = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      function S(D) {
        return typeof D == "string" && !E[D] && C.test(D);
      }
      return new Proxy(y, {
        get: function(D, x, T) {
          if (x in D || typeof x == "symbol") return Reflect.get(D, x, T);
          if (S(x))
            return function() {
              return n.call(x, ...arguments);
            };
        },
        getOwnPropertyDescriptor: function(D, x) {
          var T = Object.getOwnPropertyDescriptor(D, x);
          if (T) return T;
          if (S(x))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(D, x) {
          return !!(x in D || S(x));
        },
        set: function(D, x, T) {
          return D[x] = T, !0;
        },
        ownKeys: function(D) {
          return Reflect.ownKeys(D);
        }
      });
    }
  };
  return p._updateRender = function(m) {
    let h = Tr(m);
    h = Cr(h);
    let y = Dr(h), E = Dn.compile(y.html);
    E !== u.value && (d.length = 0, u.value = E);
  }, p;
}
let He = null;
function rt() {
  if (He)
    return He;
  const t = document.querySelector('meta[name="csrf-token"]');
  if (t)
    return He = t.getAttribute("content"), He;
  const e = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return e ? (He = decodeURIComponent(e[1]), He) : null;
}
function Co() {
  He = null;
}
let ee = {
  color: "#29d",
  height: "2px",
  showOnRequest: !1,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, ie = null, Xn = null, ue = null, ln = !1, gt = 0;
function Lo(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function ko(t) {
  return (-1 + t) * 100;
}
function Li() {
  if (ln) return;
  ln = !0;
  let t = document.createElement("style");
  t.id = "livue-progress-styles", t.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${ee.height};
            background: ${ee.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${ee.speed}ms ${ee.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${ee.color}, 0 0 5px ${ee.color};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
        }
        .livue-progress-bar.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${ee.speed}ms ${ee.easing};
        }
    `, document.head.appendChild(t);
}
function xo() {
  if (ue) return;
  Li(), ue = document.createElement("div"), ue.className = "livue-progress-bar livue-progress-hidden", ue.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(ee.parent) || document.body).appendChild(ue);
}
function No() {
  if (!ln) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), ln = !1, Li());
}
function Io(t) {
  Object.assign(ee, t), No();
}
function Ct() {
  return ee.showOnRequest;
}
function Oo() {
  gt++, ie === null && (xo(), ie = 0, ue && ue.classList.remove("livue-progress-hidden"), wn(ee.minimum), ee.trickle && (Xn = setInterval(function() {
    ki();
  }, ee.trickleSpeed)));
}
function wn(t) {
  ie !== null && (t = Lo(t, ee.minimum, 1), ie = t, ue && (ue.style.transform = "translate3d(" + ko(t) + "%, 0, 0)"));
}
function ki() {
  if (ie === null || ie >= 1) return;
  let t;
  ie < 0.2 ? t = 0.1 : ie < 0.5 ? t = 0.04 : ie < 0.8 ? t = 0.02 : ie < 0.99 ? t = 5e-3 : t = 0, wn(ie + t);
}
function xi() {
  gt = Math.max(0, gt - 1), !(gt > 0) && ie !== null && (wn(1), clearInterval(Xn), Xn = null, setTimeout(function() {
    ue && ue.classList.add("livue-progress-hidden"), setTimeout(function() {
      ie = null, ue && (ue.style.transform = "translate3d(-100%, 0, 0)");
    }, ee.speed);
  }, ee.speed));
}
function Mo() {
  gt = 0, xi();
}
function Po() {
  return ie !== null;
}
function Ro() {
  return ie;
}
const Me = {
  configure: Io,
  start: Oo,
  set: wn,
  trickle: ki,
  done: xi,
  forceDone: Mo,
  isStarted: Po,
  getStatus: Ro,
  isRequestProgressEnabled: Ct
};
var dt = null, Lr = !1, Ze = !1, de = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ee = /* @__PURE__ */ new Map(), qe = /* @__PURE__ */ new Map(), Yn = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new Map(), ke = null;
function Vo(t) {
  Object.assign(de, t), t.progressBarColor && Me.configure({ color: t.progressBarColor });
}
function Ho(t) {
  dt = t, !Lr && (Lr = !0, ke = Ni(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: ke },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (Ii(ke), ke = e.state.pageKey, xt(e.state.url, !1, !0));
  }), qo());
}
function Ni() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function Ii(t) {
  if (!(!de.restoreScroll || !t)) {
    Yt.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Yt.get(t) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Yt.set(t, i);
      }
    });
  }
}
function jo(t) {
  if (!(!de.restoreScroll || !t)) {
    var e = Yt.get(t);
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
function qo() {
  document.addEventListener("click", zo, !0), de.prefetch && (document.addEventListener("mouseenter", Wo, !0), document.addEventListener("mouseleave", Bo, !0), document.addEventListener("mousedown", $o, !0), document.addEventListener("focus", Uo, !0));
}
function zo(t) {
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
        n.startsWith("#") || n.startsWith("javascript:") || e.hasAttribute("download") || e.getAttribute("target") !== "_blank" && (t.preventDefault(), t.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), xt(n, !0, !1));
      }
    }
  }
}
function Fo(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function Wo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !de.prefetchOnHover)) {
      var n = Fo(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            En(r);
          }, de.hoverDelay);
          Yn.set(e, i);
        }
      }
    }
  }
}
function Bo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Yn.get(e);
      n && (clearTimeout(n), Yn.delete(e));
    }
  }
}
function $o(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || En(n);
    }
  }
}
function Uo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !de.prefetchOnHover)) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || En(n);
    }
  }
}
function En(t) {
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
      return de.cachePages && Oi(e, i), i;
    }) : null;
  }).catch(function(r) {
    return qe.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return qe.set(e, n), n;
}
function Oi(t, e) {
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
function Jo() {
  Ee.clear();
}
function cr(t) {
  Ze || !t || !t.url || (t.navigate ? xt(t.url, !0, !1) : (Ze = !0, window.location.href = t.url));
}
async function xt(t, e, n) {
  if (!Ze) {
    if (!dt) {
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
      Ze = !0, n || Ii(ke), de.showProgressBar && Me.start();
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
          o = await s.text(), de.cachePages && Oi(r, o);
        }
        var l = new DOMParser(), u = l.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(C) {
              typeof C == "function" && C(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = Xo(), p = /* @__PURE__ */ new Set();
        c.forEach(function(C) {
          C.livueIds.forEach(function(S) {
            p.add(S);
          });
        }), dt._stopObserver(), dt.destroyExcept(p), c.forEach(function(C) {
          C.element.parentNode && C.element.parentNode.removeChild(C.element);
        });
        var m = u.querySelector("title");
        m && (document.title = m.textContent), document.body.innerHTML = u.body.innerHTML, Yo(c);
        var h = u.querySelector('meta[name="csrf-token"]'), y = document.querySelector('meta[name="csrf-token"]');
        if (h && y && (y.setAttribute("content", h.getAttribute("content")), Co()), Ko(u), Go(u), e && (ke = Ni(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: ke },
          "",
          r
        )), Zo(u), dt.rebootPreserving(), n)
          jo(ke);
        else if (location.hash) {
          var E = document.querySelector(location.hash);
          E ? E.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (C) {
        console.error("[LiVue] Navigation failed:", C), window.location.href = t;
      } finally {
        Ze = !1, de.showProgressBar && Me.done();
      }
    }
  }
}
function Xo() {
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
function Yo(t) {
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
function Ko(t) {
  var e = document.querySelectorAll("[data-livue-head]");
  e.forEach(function(r) {
    r.remove();
  });
  var n = t.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Go(t) {
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
function Zo(t) {
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
function Qo() {
  return Ze;
}
var Je = /* @__PURE__ */ new Map(), ea = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function kr(t, e) {
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
function Mi() {
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
function xr() {
  return ea.slice();
}
var Kn = [], Gn = [], Lt = !1;
function ta(t) {
  return t.isolate ? ra(t) : new Promise(function(e, n) {
    Kn.push({
      payload: t,
      resolve: e,
      reject: n
    }), Lt || (Lt = !0, queueMicrotask(Pi));
  });
}
function na(t) {
  return new Promise(function(e, n) {
    Gn.push({
      payload: t,
      resolve: e,
      reject: n
    }), Lt || (Lt = !0, queueMicrotask(Pi));
  });
}
async function Pi() {
  var t = Kn, e = Gn;
  if (Kn = [], Gn = [], Lt = !1, !(t.length === 0 && e.length === 0)) {
    Ct() && Me.start();
    var n = Ri(), r = rt(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = t.map(function(E) {
      return E.payload;
    }), a = e.map(function(E) {
      return E.payload;
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
          cr(p[c].redirect);
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
    } catch (E) {
      for (var c = 0; c < t.length; c++)
        t[c].reject(E);
      for (var c = 0; c < e.length; c++)
        e[c].reject(E);
      fe("request.finished", {
        url: n,
        success: !1,
        error: E,
        updateCount: t.length,
        lazyCount: e.length
      });
    } finally {
      Ct() && Me.done();
    }
  }
}
async function ra(t) {
  Ct() && Me.start();
  var e = Ri(), n = rt(), r = {
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
      return cr(l.redirect), new Promise(function() {
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
    Ct() && Me.done();
  }
}
function Ri() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function Cn(t, e, n, r, i) {
  return ta({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
let Zn = null, Vi = /* @__PURE__ */ new Map();
function ia() {
  return Ne({});
}
function me(t, e) {
  Qn(t);
  for (let n in e)
    t[n] = e[n];
}
function Qn(t) {
  for (let e in t)
    delete t[e];
}
function oa(t) {
  Zn = t;
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
  }), i ? !0 : (Zn ? Zn(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function aa(t, e) {
  typeof e == "function" && Vi.set(t, e);
}
function er(t) {
  Vi.delete(t);
}
var Hi = [];
function k(t, e, n) {
  Hi.push({
    name: t,
    directive: e
  });
}
function la() {
  return Hi;
}
const Ie = /* @__PURE__ */ new Map(), Pe = /* @__PURE__ */ new Map();
let Nr = !1;
function it() {
  return typeof window < "u" && window.Echo;
}
function sa(t, e) {
  if (!it())
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
function ji(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!it())
    return Nr || (Nr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: s, event: l, method: u, isPresenceEvent: d, isCustomEvent: c } = o, p = sa(a, s);
    if (!p) continue;
    const m = s + ":" + a + ":" + l + ":" + t;
    if (Pe.has(m)) {
      r.push(m);
      continue;
    }
    const h = function(y) {
      try {
        n(u, y);
      } catch (E) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', E);
      }
    };
    if (s === "presence" && d)
      ua(p, l, h);
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
      qi(r[i]);
  };
}
function ua(t, e, n) {
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
function qi(t) {
  const e = Pe.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    Pe.delete(t), ca(e.channelKey);
  }
}
function Ir(t) {
  const e = ":" + t, n = [];
  Pe.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    qi(n[r]);
}
function ca(t) {
  let e = !1;
  if (Pe.forEach(function(r) {
    r.channelKey === t && (e = !0);
  }), e) return;
  if (Ie.get(t) && it()) {
    const r = t.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Ie.delete(t);
}
function Or() {
  Pe.clear(), Ie.forEach(function(t, e) {
    if (it()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Ie.clear();
}
function fa() {
  return {
    echoAvailable: it(),
    channels: Array.from(Ie.keys()),
    subscriptions: Array.from(Pe.keys())
  };
}
function da() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Ce = /* @__PURE__ */ new Map();
function sn(t, e, n, r) {
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
function Kt(t, e, n, r, i, o) {
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
function Mr(t) {
  Ce.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Ce.delete(n);
  });
}
function pa(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    Kt(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function ha(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, s = e[i], l = !1;
    o.except !== null && o.except !== void 0 && String(s) === String(o.except) && (l = !0), !o.keep && !l && (s === "" || s === null || s === void 0) && (l = !0), l ? n.searchParams.delete(a) : n.searchParams.set(a, s), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function fr() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function ma(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var s = new FormData();
    s.append("file", t), s.append("component", e), s.append("property", n), s.append("checksum", r);
    var l = new XMLHttpRequest(), u = fr();
    l.open("POST", u, !0);
    var d = rt();
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
function Ln(t) {
  if (!t || t.length === 0) return Promise.resolve();
  var e = fr() + "-remove", n = rt();
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
function va(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var s = Array.from(t), l = new FormData();
    s.forEach(function(p) {
      l.append("files[]", p);
    }), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var u = new XMLHttpRequest(), d = fr();
    u.open("POST", d, !0);
    var c = rt();
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
let yt = /* @__PURE__ */ new Map(), bt = /* @__PURE__ */ new Map();
function tt(t, e) {
  let n = t + ":debounce:" + e;
  if (!yt.has(n)) {
    let r = null, i = null, o = null, a = null, s = function(l) {
      return i = l, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let c = i, p = o, m = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(p).catch(m);
        }, e);
      });
    };
    yt.set(n, s);
  }
  return yt.get(n);
}
function kt(t, e) {
  let n = t + ":throttle:" + e;
  if (!bt.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < e ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    bt.set(n, i);
  }
  return bt.get(n);
}
function Pr(t) {
  let e = t + ":";
  for (let n of yt.keys())
    n.startsWith(e) && yt.delete(n);
  for (let n of bt.keys())
    n.startsWith(e) && bt.delete(n);
}
const un = "livue-tab-sync";
let dr = Date.now() + "-" + Math.random().toString(36).substr(2, 9), cn = null, pr = /* @__PURE__ */ new Map(), Rr = !1;
function zi() {
  Rr || (Rr = !0, typeof BroadcastChannel < "u" ? (cn = new BroadcastChannel(un), cn.onmessage = ga) : window.addEventListener("storage", ya));
}
function ga(t) {
  let e = t.data;
  e.tabId !== dr && Fi(e);
}
function ya(t) {
  if (t.key === un && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === dr) return;
      Fi(e);
    } catch {
    }
}
function Fi(t) {
  let e = pr.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function ba(t, e) {
  zi(), pr.set(t, e);
}
function Vr(t) {
  pr.delete(t);
}
function wa(t, e, n, r) {
  zi();
  let i = {
    tabId: dr,
    component: t,
    state: e,
    properties: n,
    config: r
  };
  if (cn)
    cn.postMessage(i);
  else
    try {
      localStorage.setItem(un, JSON.stringify(i)), localStorage.removeItem(un);
    } catch {
    }
}
function Ea(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
const hr = /* @__PURE__ */ new Map();
async function Sa(t, e = {}) {
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
        "X-CSRF-TOKEN": rt(),
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
              _a(h.stream), n(h.stream);
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
function _a(t) {
  const { to: e, content: n, replace: r } = t, i = hr.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Hr(t, e, n = !1) {
  hr.set(t, { el: e, replace: n });
}
function jr(t) {
  hr.delete(t);
}
function Aa(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function mr(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    Aa(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = mr(r) : e[n] = r;
  }
  return e;
}
function Da(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let s = n[a] || {}, l = r[a] || {}, u = mr(s), d = {};
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
function Ta(t, e) {
  let n = e.composables || {};
  e.composableActions;
  for (let r in n) {
    let i = mr(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function Ca(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
function La(t, e) {
  for (var n in e) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = t.indexOf(r), a = t.indexOf(i);
    o !== -1 && a !== -1 && (t = t.substring(0, o) + e[n] + t.substring(a + i.length));
  }
  return t;
}
function tr(t, e, n, r, i, o, a) {
  a = a || {};
  let s = ia(), l = n.name, u = n.vueMethods || {}, d = n.jsonMethods || [], c = n.confirms || {}, p = n.isolate || !1, m = n.urlParams || null, h = n.uploads || null, y = n.tabSync || null, E = !1, C = i, S = o, D = a.initialHtml || null;
  function x(f) {
    let b = document.querySelector('meta[name="livue-prefix"]'), A = "/" + (b ? b.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), g = document.createElement("a");
    g.href = A, g.download = f.name, g.style.display = "none", document.body.appendChild(g), g.click(), document.body.removeChild(g);
  }
  function T() {
    let f = Vt(C, e);
    return {
      snapshot: S,
      diffs: f
    };
  }
  function L(f, b) {
    if (f.redirect) {
      cr(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let g = f.errorBoundary;
      v.errorState.hasError = g.hasError, v.errorState.errorMessage = g.errorMessage, v.errorState.errorDetails = g.errorDetails, v.errorState.recover = g.recover, (!g.errorHandled || !g.recover) && fe("error.occurred", {
        error: new Error(g.errorMessage || "Component error"),
        componentName: l,
        componentId: t,
        context: { method: g.errorMethod, serverHandled: g.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && x(f.download), f.snapshot) {
      let g = JSON.parse(f.snapshot);
      if (g.state) {
        let q = Tt(g.state);
        bo(e, q), C = JSON.parse(JSON.stringify(q));
      }
      S = f.snapshot, g.memo && (g.memo.errors ? me(v.errors, g.memo.errors) : Qn(v.errors), g.memo.vueMethods && (u = g.memo.vueMethods), g.memo.jsonMethods && (d = g.memo.jsonMethods), g.memo.urlParams && (m = g.memo.urlParams), g.memo.uploads && (h = g.memo.uploads), g.memo.confirms && (c = g.memo.confirms), (g.memo.composables || g.memo.composableActions) && Ta(O, g.memo));
    }
    if (m && ha(m, e), (f.html || f.fragments) && r && r._updateTemplate) {
      let g = {};
      if (f.snapshot) {
        let q = JSON.parse(f.snapshot);
        q.memo && (q.memo.transitionType && (g.transitionType = q.memo.transitionType), q.memo.skipTransition && (g.skipTransition = !0));
      }
      if (f.fragments) {
        let q = D || (a.el ? a.el.innerHTML : null);
        if (q) {
          let F = La(q, f.fragments);
          D = F, r._updateTemplate(F, g);
        }
      } else
        D = f.html, r._updateTemplate(f.html, g);
    }
    if (f.events && f.events.length > 0) {
      for (var _ = 0; _ < f.events.length; _++)
        f.events[_].sourceId = t;
      pa(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var A = 0; A < f.js.length; A++)
        try {
          new Function("state", "livue", f.js[A])(e, v);
        } catch (g) {
          console.error("[LiVue] Error executing ->vue() JS:", g);
        }
    if (f.benchmark && fe("benchmark.received", {
      componentId: t,
      componentName: l,
      timings: f.benchmark
    }), y && y.enabled && f.snapshot && !E && JSON.parse(f.snapshot).state) {
      let q = Ei(e), F = [];
      for (let Y in q)
        (!b || !(Y in b)) && F.push(Y);
      if (F.length > 0) {
        let Y = Ea(q, F, y);
        Object.keys(Y).length > 0 && wa(l, Y, F, y);
      }
    }
    if (E = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let P = Ne({}), z = {}, O = {}, R = function(f, b) {
    return v.call(f, b);
  };
  Ca(n) && (O = Da(n, R));
  let v = Ne({
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
      let b = Vt(C, e);
      return f === void 0 ? Object.keys(b).length > 0 : f in b;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = Vt(C, e);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(C)) : C[f] !== void 0 ? JSON.parse(JSON.stringify(C[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in C && (e[f] = JSON.parse(JSON.stringify(C[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in C)
        f in e && (e[f] = JSON.parse(JSON.stringify(C[f])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(f) {
      return f ? P[f] || !1 : v.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let b = f ? P[f] || !1 : v.loading;
      return {
        "aria-busy": b,
        disabled: b
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
    call: async function(f, b, _) {
      let A, g = null;
      if (arguments.length === 1 ? A = [] : arguments.length === 2 ? Array.isArray(b) ? A = b : A = [b] : arguments.length >= 3 && (Array.isArray(b) && _ && typeof _ == "object" && (_.debounce || _.throttle) ? (A = b, g = _) : A = Array.prototype.slice.call(arguments, 1)), z[f])
        return z[f](v, A);
      if (u[f]) {
        try {
          new Function("state", "livue", u[f])(e, v);
        } catch (Y) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', Y);
        }
        return;
      }
      let q = d.includes(f), F = async function() {
        if (c[f] && !await v._showConfirm(c[f]))
          return;
        v.loading = !0, v.processing = f, P[f] = !0;
        let Y;
        try {
          let B = T(), W = await Cn(B.snapshot, f, A, B.diffs, p || q);
          Y = L(W, B.diffs);
        } catch (B) {
          if (q)
            throw { status: B.status, errors: B.data && B.data.errors, message: B.message };
          B.status === 422 && B.data && B.data.errors ? me(v.errors, B.data.errors) : We(B, l);
        } finally {
          v.loading = !1, v.processing = null, delete P[f];
        }
        return Y;
      };
      return g && g.debounce ? tt(t + ":" + f, g.debounce)(F) : g && g.throttle ? kt(t + ":" + f, g.throttle)(F) : F();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, b) {
      let _ = Array.prototype.slice.call(arguments, 2), A = { message: b || "Are you sure?" };
      if (await v._showConfirm(A))
        return v.call.apply(v, [f].concat(_));
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
    set: function(f, b) {
      e[f] = b;
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      v.loading = !0, v.processing = "$sync";
      try {
        let f = T(), b = await Cn(f.snapshot, null, [], f.diffs, p);
        L(b, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? me(v.errors, f.data.errors) : We(f, l);
      } finally {
        v.loading = !1, v.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      Qn(v.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, b) {
      Kt(f, b, "broadcast", l, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, b, _) {
      Kt(b, _, "to", l, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, b) {
      Kt(f, b, "self", l, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      xt(f, !0);
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
    upload: async function(f, b) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var _ = Tn(e, f);
      _ && _.__livue_upload && _.ref && Ln([_.ref]), v.uploading = !0, v.uploadProgress = 0;
      try {
        var A = await ma(b, l, f, h[f].token, function(g) {
          v.uploadProgress = g;
        });
        Rt(e, f, {
          __livue_upload: !0,
          ref: A.ref,
          originalName: A.originalName,
          mimeType: A.mimeType,
          size: A.size,
          previewUrl: A.previewUrl
        });
      } catch (g) {
        g.status === 422 && g.data && g.data.errors ? me(v.errors, g.data.errors) : We(g, l);
      } finally {
        v.uploading = !1, v.uploadProgress = 0;
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
    uploadMultiple: async function(f, b) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      v.uploading = !0, v.uploadProgress = 0;
      try {
        var _ = await va(b, l, f, h[f].token, function(W) {
          v.uploadProgress = W.overall;
        }), A = _.results || [], g = _.errors || [], q = Tn(e, f), F = Array.isArray(q) ? q : [];
        if (A.length > 0) {
          var Y = A.map(function(W) {
            return {
              __livue_upload: !0,
              ref: W.ref,
              originalName: W.originalName,
              mimeType: W.mimeType,
              size: W.size,
              previewUrl: W.previewUrl
            };
          });
          Rt(e, f, F.concat(Y));
        }
        if (g.length > 0) {
          var B = {};
          g.forEach(function(W) {
            var we = f + "." + W.index;
            B[we] = {
              file: W.file,
              message: W.error
            };
          }), me(v.errors, B);
        }
      } catch (W) {
        W.status === 422 && W.data && W.data.errors ? me(v.errors, W.data.errors) : We(W, l);
      } finally {
        v.uploading = !1, v.uploadProgress = 0;
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
    removeUpload: function(f, b) {
      var _ = Tn(e, f);
      if (b !== void 0 && Array.isArray(_)) {
        var A = _[b];
        A && A.__livue_upload && A.ref && Ln([A.ref]), _.splice(b, 1), Rt(e, f, _.slice());
      } else
        _ && _.__livue_upload && _.ref && Ln([_.ref]), Rt(e, f, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(f, b) {
      b = b || [], v.loading = !0, v.streaming = !0, v.processing = f, v.streamingMethod = f, P[f] = !0;
      let _;
      try {
        let A = T();
        A.method = f, A.params = b, A.componentId = t;
        let g = await Sa(A, {
          onChunk: function(q) {
          },
          onComplete: function(q) {
          },
          onError: function(q) {
            console.error("[LiVue Stream] Error:", q);
          }
        });
        g && (_ = L(g, A.diffs));
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? me(v.errors, A.data.errors) : We(A, l);
      } finally {
        v.loading = !1, v.streaming = !1, v.processing = null, v.streamingMethod = null, delete P[f];
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
    watch: function(f, b) {
      return typeof b != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Oe(
        function() {
          return e[f];
        },
        function(_, A) {
          b(_, A);
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
      }) : (aa(t, f), function() {
        er(t);
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
      v.errorState.hasError = !1, v.errorState.errorMessage = null, v.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(f, b) {
      C = JSON.parse(JSON.stringify(f)), S = b;
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
      let f = Vt(C, e), b = {};
      for (let _ in O) {
        let A = O[_], g = {}, q = [];
        for (let F in A)
          if (typeof A[F] == "function")
            q.push(F);
          else
            try {
              g[F] = JSON.parse(JSON.stringify(A[F]));
            } catch {
              g[F] = "[Unserializable]";
            }
        b[_] = { data: g, actions: q };
      }
      return {
        serverState: JSON.parse(JSON.stringify(C)),
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
          composableNames: Object.keys(O)
        },
        composables: b,
        uploading: v.uploading,
        uploadProgress: v.uploadProgress,
        streaming: v.streaming,
        streamingMethod: v.streamingMethod,
        errorState: {
          hasError: v.errorState.hasError,
          errorMessage: v.errorState.errorMessage
        }
      };
    }
  });
  for (let f in O)
    v[f] = O[f];
  async function J() {
    v.loading = !0, v.processing = "$refresh", P.$refresh = !0;
    try {
      let f = T(), b = await Cn(f.snapshot, null, [], f.diffs, p);
      return L(b, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? me(v.errors, f.data.errors) : We(f, l);
    } finally {
      v.loading = !1, v.processing = null, delete P.$refresh;
    }
  }
  z.$refresh = function() {
    return J();
  }, y && y.enabled && ba(l, function(f, b, _) {
    let A = !1;
    if (_.reactive === !0)
      A = !0;
    else if (Array.isArray(_.reactive) && _.reactive.length > 0) {
      for (let g in f)
        if (_.reactive.includes(g)) {
          A = !0;
          break;
        }
    }
    if (A) {
      for (let g in f)
        _.only && !_.only.includes(g) || _.except && _.except.includes(g) || g in e && (e[g] = f[g]);
      E = !0, v.sync();
      return;
    }
    for (let g in f)
      _.only && !_.only.includes(g) || _.except && _.except.includes(g) || g in e && (e[g] = f[g]);
    for (let g in f)
      _.only && !_.only.includes(g) || _.except && _.except.includes(g) || (C[g] = JSON.parse(JSON.stringify(f[g])));
  });
  var Z = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(v, {
    get: function(f, b, _) {
      if (b in f || typeof b == "symbol")
        return Reflect.get(f, b, _);
      if (typeof b == "string" && b.startsWith("$") && z[b])
        return function() {
          var A = Array.prototype.slice.call(arguments);
          return z[b](v, A);
        };
      if (typeof b == "string" && !b.startsWith("$") && !Z[b])
        return function() {
          var A = Array.prototype.slice.call(arguments);
          return v.call(b, ...A);
        };
    },
    set: function(f, b, _, A) {
      return Reflect.set(f, b, _, A);
    },
    has: function(f, b) {
      return typeof b == "string" && b.startsWith("$") && z[b] ? !0 : Reflect.has(f, b);
    }
  }), composables: O };
}
function fn(t, e) {
  let n = t.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), t;
  n[1];
  let r = n.index + n[0].length;
  return t.slice(0, r) + " " + e + t.slice(r);
}
function Gt(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let l = 0; l < r.length; l++)
    r[l].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(l) {
    let u = l.dataset.livueId, d = l.dataset.livueSnapshot || "{}", c = JSON.parse(d), p = c.memo ? c.memo.name : "", m = Tt(c.state || {}), h = c.memo || {}, y = l.innerHTML, E = l.tagName.toLowerCase(), C = l.nextElementSibling;
    for (; C; ) {
      let R = C.nextElementSibling;
      if (C.tagName === "SCRIPT" && C.getAttribute("type") === "application/livue-setup")
        y += C.outerHTML, C.parentNode.removeChild(C);
      else
        break;
      C = R;
    }
    let S = e._childRegistry[u];
    if (!S)
      for (let R in e._childRegistry) {
        let v = e._childRegistry[R];
        if (v.name === p && !o[R]) {
          S = v;
          break;
        }
      }
    if (S) {
      o[S.id] = !0, S.rootTag = E;
      let R = h.reactive || [];
      if (R.length > 0) {
        for (var D = 0; D < R.length; D++) {
          var x = R[D];
          x in m && (S.state[x] = m[x]);
        }
        S.livue._updateServerState(m, d), S.componentRef && S.componentRef._updateTemplate && S.componentRef._updateTemplate(y);
      }
    }
    let T = !S;
    if (!S) {
      let v = "livue-child-" + So();
      e._versions[v] = 0;
      let J = $n(m), Z = JSON.parse(JSON.stringify(m)), ne = Object.assign({ name: h.name || p }, h), f = { _updateTemplate: null }, b = Mi(), _ = tr(u, J, ne, f, Z, d, {
        el: l,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: b
      }), A = _.livue, g = _.composables;
      fe("component.init", {
        component: { id: u, name: p, state: J, livue: A },
        el: l,
        cleanup: b.cleanup,
        isChild: !0
      });
      let q = h.errors || null;
      q && me(A.errors, q), S = {
        tagName: v,
        state: J,
        memo: ne,
        livue: A,
        composables: g,
        componentRef: f,
        name: p,
        id: u,
        rootTag: E
      };
      let F = h.listeners || null;
      if (F)
        for (let B in F)
          (function(W, we) {
            sn(B, p, u, function(ot) {
              we.call(W, ot);
            });
          })(F[B], A);
      let Y = h.echo || null;
      Y && Y.length && (function(B, W) {
        ji(B, Y, function(we, ot) {
          W.call(we, ot);
        });
      })(u, A), f._updateTemplate = function(B) {
        let W = e.el.querySelector('[data-livue-id="' + u + '"]');
        W && _i(W);
        let we = Gt(B, e), ot = fn(
          "<" + S.rootTag + ">" + we.template + "</" + S.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!e.vueApp) return;
        for (let Fe in we.childDefs)
          e.vueApp._context.components[Fe] || e.vueApp.component(Fe, we.childDefs[Fe]);
        e.vueApp._context.components[S.tagName]._updateRender(ot), sr(function() {
          let Fe = e.el.querySelector('[data-livue-id="' + u + '"]');
          Fe && Ai(Fe);
        });
      }, e._childRegistry[u] = S;
    }
    let L = S.tagName, P = l.dataset.livueRef;
    P && e._rootLivue && (e._rootLivue.refs[P] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(R, v) {
        return S.livue.call(R, v || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(R, v) {
        return S.livue.set(R, v);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(R, v) {
        return S.livue.dispatch(R, v);
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
    let z = l.dataset.livueModel;
    if (z && e._rootState && sn("$modelUpdate", S.name, u, function(R) {
      R && R.value !== void 0 && (e._rootState[z] = R.value);
    }), T) {
      let R = fn(
        "<" + E + ">" + y + "</" + E + ">",
        'data-livue-id="' + u + '"'
      );
      i[L] = Jn(
        R,
        S.state,
        S.livue,
        S.composables || {},
        e._versions,
        S.name
      );
    }
    e._versions[L] === void 0 && (e._versions[L] = 0);
    let O = document.createElement(L);
    O.setAttribute(":key", "livueV['" + L + "']"), l.parentNode.replaceChild(O, l);
  });
  let s = n.querySelectorAll("[data-livue-island]");
  for (let l = 0; l < s.length; l++)
    s[l].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let qr = 0;
function nr() {
  return typeof document < "u" && "startViewTransition" in document;
}
const kn = /* @__PURE__ */ new WeakMap();
function zr() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const ka = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (qr++, r = "livue-transition-" + qr), kn.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), nr() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    zr();
  },
  updated(t, e) {
    let n = kn.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), nr() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    kn.delete(t), t.removeAttribute("data-livue-transition"), zr();
  }
};
function xa(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
function Na(t) {
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
function Ia(t, e) {
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
const Oa = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var Fr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Fr || (Fr = {}));
function Ma() {
  const t = ho(!0), e = t.run(() => an({}));
  let n = [], r = [];
  const i = mo({
    install(o) {
      i._a = o, o.provide(Oa, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
let xn = 0;
function Pa(t) {
  return vo({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = an(!1), i = ur(null), o = null, a = an(null);
      async function s() {
        if (!r.value)
          try {
            let u = await na({
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
        xn++;
        let c = "lazy-" + xn + "-" + Date.now(), p = d.memo ? d.memo.name : "", m = Tt(d.state || {}), h = d.memo || {}, { createLivueHelper: y, buildComponentDef: E, processTemplate: C, createReactiveState: S } = t._lazyHelpers, D = S(m), x = JSON.parse(JSON.stringify(m)), T = { _updateTemplate: null }, L = y(
          c,
          D,
          h,
          T,
          x,
          u.snapshot
        );
        h.errors && me(L.errors, h.errors);
        let P = "livue-lazy-child-" + xn, z = C(u.html, t), O = fn(
          z.template,
          'data-livue-id="' + c + '"'
        ), R = E(O, D, L, t._versions, p);
        t._childRegistry[c] = {
          tagName: P,
          state: D,
          memo: h,
          livue: L,
          componentRef: T,
          name: p,
          id: c
        }, T._updateTemplate = function(J) {
          let Z = C(J, t), ne = fn(
            Z.template,
            'data-livue-id="' + c + '"'
          );
          for (let b in Z.childDefs)
            t.vueApp._context.components[b] || t.vueApp.component(b, Z.childDefs[b]);
          let f = E(ne, D, L, t._versions, p);
          t.vueApp._context.components[P] = f, t._versions[P] = (t._versions[P] || 0) + 1, i.value = f;
        };
        let v = h.listeners || null;
        if (v)
          for (let J in v)
            (function(Z, ne) {
              sn(J, p, c, function(f) {
                ne.call(Z, f);
              });
            })(v[J], L);
        for (let J in z.childDefs)
          t.vueApp._context.components[J] || t.vueApp.component(J, z.childDefs[J]);
        t._versions[P] = 0, t.vueApp._context.components[P] || t.vueApp.component(P, R), i.value = R, r.value = !0;
      }
      return bi(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          s();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, s());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), yi(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? Sr(i.value) : Sr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class Ra {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = $n(Tt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Ne({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: tr,
      buildComponentDef: Jn,
      processTemplate: Gt,
      createReactiveState: $n
    }, this._mount(r, n);
  }
  /**
   * Mount the Vue app shell. The root component is rendered via
   * <component :is> so its template can be swapped independently
   * without unmounting the Vue app.
   */
  _mount(e, n) {
    let r = this;
    this._absorbSetupScripts();
    let i = {
      /**
       * Update the component template with new HTML.
       * @param {string} newInnerHtml - The new HTML content
       * @param {object} [options] - Transition options
       * @param {string} [options.transitionType] - Transition type (e.g., 'forward', 'backward')
       * @param {boolean} [options.skipTransition] - Skip the View Transition
       */
      _updateTemplate: function(y, E) {
        E = E || {}, fe("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: y
        });
        var C = Na(r.el);
        _i(r.el);
        let S = Gt(y, r);
        if (!r.vueApp) return;
        for (let x in S.childDefs)
          r.vueApp._context.components[x] || r.vueApp.component(x, S.childDefs[x]);
        function D() {
          r._currentRootDef._updateRender(S.template), sr(function() {
            Ai(r.el), Ia(r.el, C), fe("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (E.skipTransition) {
          D();
          return;
        }
        nr() ? xa(D, { type: E.transitionType }) : D();
      }
    }, o = JSON.parse(JSON.stringify(Tt(e.state || {})));
    this._cleanups = Mi();
    let a = tr(this.componentId, this.state, this.memo, i, o, n, {
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
    let u = Gt(this.el.innerHTML, this), d = e.memo && e.memo.errors || null;
    d && me(s.errors, d);
    let c = e.memo && e.memo.listeners || null;
    if (c)
      for (let y in c)
        (function(E, C, S, D) {
          sn(y, S, D, function(x) {
            C.call(E, x);
          });
        })(c[y], s, r.name, r.componentId);
    let p = e.memo && e.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = ji(r.componentId, p, function(y, E) {
      s.call(y, E);
    }));
    let m = Jn(u.template, r.state, s, l, r._versions, r.name);
    this._currentRootDef = m, this._rootDefRef = ur(m), this.vueApp = go({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", Pa(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = Ma();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = la();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Mr(e), Pr(e), er(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Vr(n.name), Ir(e);
    }
    if (fe("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Mr(this.componentId), Pr(this.componentId), er(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Vr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Ir(this.componentId), this.vueApp) {
      try {
        this.vueApp.unmount();
      } catch {
      }
      this.vueApp = null;
    }
  }
  /**
   * Move sibling <script type="application/livue-setup"> elements inside the
   * component element. In Blade templates, @script blocks render after the root
   * element's closing tag, placing them as DOM siblings rather than children.
   * Since the runtime reads el.innerHTML for template processing, these siblings
   * would be missed. Moving them inside ensures they are captured.
   */
  _absorbSetupScripts() {
    let e = this.el.nextElementSibling;
    for (; e; ) {
      let n = e.nextElementSibling;
      if (e.tagName === "SCRIPT" && e.getAttribute("type") === "application/livue-setup")
        this.el.appendChild(e);
      else
        break;
      e = n;
    }
  }
}
function ge(t) {
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
let Wr = /* @__PURE__ */ new Set();
const Va = {
  mounted(t, e, n) {
    let r = ge(n);
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
    Wr.has(u) || (Wr.add(u), r.call(s, l));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Nn = /* @__PURE__ */ new WeakMap(), Ha = {
  mounted(t, e, n) {
    t.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + t.tagName.toLowerCase() + ">");
    let r = ge(n);
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
    t.addEventListener("submit", s), Nn.set(t, s);
  },
  unmounted(t) {
    let e = Nn.get(t);
    e && (t.removeEventListener("submit", e), Nn.delete(t));
  }
}, Ht = /* @__PURE__ */ new WeakMap(), ja = {
  mounted(t, e, n) {
    let r = ge(n);
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
        (c ? !y.isIntersecting : y.isIntersecting) && (!s.once || !p) && (p = !0, r.call(o, a), s.once && (m.disconnect(), Ht.delete(t)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    m.observe(t), Ht.set(t, m);
  },
  unmounted(t) {
    let e = Ht.get(t);
    e && (e.disconnect(), Ht.delete(t));
  }
};
var dn = /* @__PURE__ */ new Set(), Ye = /* @__PURE__ */ new WeakMap(), Br = !1;
function Qe(t) {
  return t.split(" ").filter(function(e) {
    return e.trim();
  });
}
function qa(t, e) {
  var n = window.location.pathname, r;
  try {
    r = new URL(t, window.location.origin).pathname;
  } catch {
    return !1;
  }
  if (e.strict)
    return n === r;
  if (e.exact) {
    var i = n.replace(/\/$/, "") || "/", o = r.replace(/\/$/, "") || "/";
    return i === o;
  }
  var o = r.replace(/\/$/, "") || "/";
  return o === "/" ? n === "/" : n === o || n.startsWith(o + "/");
}
function rr(t) {
  var e = Ye.get(t);
  if (e) {
    var n = t.getAttribute("href");
    if (n) {
      var r = e.value, i = e.modifiers || {}, o = qa(n, i);
      if (typeof r == "object" && r !== null) {
        var a = r.active ? Qe(r.active) : [], s = r.inactive ? Qe(r.inactive) : [];
        o ? (s.forEach(function(u) {
          t.classList.remove(u);
        }), a.forEach(function(u) {
          t.classList.add(u);
        }), t.setAttribute("data-current", ""), t.setAttribute("aria-current", "page")) : (a.forEach(function(u) {
          t.classList.remove(u);
        }), s.forEach(function(u) {
          t.classList.add(u);
        }), t.removeAttribute("data-current"), t.removeAttribute("aria-current"));
      } else if (typeof r == "string") {
        var l = Qe(r);
        o ? (l.forEach(function(u) {
          t.classList.add(u);
        }), t.setAttribute("data-current", ""), t.setAttribute("aria-current", "page")) : (l.forEach(function(u) {
          t.classList.remove(u);
        }), t.removeAttribute("data-current"), t.removeAttribute("aria-current"));
      }
    }
  }
}
function $r() {
  dn.forEach(function(t) {
    t.isConnected ? rr(t) : (dn.delete(t), Ye.delete(t));
  });
}
function za() {
  Br || (Br = !0, window.addEventListener("popstate", $r), window.addEventListener("livue:navigated", $r));
}
const Fa = {
  mounted(t, e) {
    Ye.set(t, { value: e.value, modifiers: e.modifiers || {} }), dn.add(t), za(), rr(t);
  },
  updated(t, e) {
    Ye.set(t, { value: e.value, modifiers: e.modifiers || {} }), rr(t);
  },
  unmounted(t) {
    var e = Ye.get(t);
    if (e) {
      var n = e.value;
      if (typeof n == "object" && n !== null) {
        var r = n.active ? Qe(n.active) : [], i = n.inactive ? Qe(n.inactive) : [];
        r.forEach(function(o) {
          t.classList.remove(o);
        }), i.forEach(function(o) {
          t.classList.remove(o);
        });
      } else typeof n == "string" && Qe(n).forEach(function(o) {
        t.classList.remove(o);
      });
    }
    t.removeAttribute("data-current"), t.removeAttribute("aria-current"), dn.delete(t), Ye.delete(t);
  }
};
let Ur = 0;
const Wa = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(t, e) {
    Ur++;
    let n = "livue-ignore-" + Ur;
    t.__livue_ignore = !0, t.__livue_ignore_self = e.modifiers.self === !0, t.__livue_ignore_id = n, t.setAttribute("data-livue-ignore-id", n), e.modifiers.self && t.setAttribute("data-livue-ignore-self", "");
  },
  mounted(t, e) {
    t.hasAttribute("data-livue-ignore-id") || t.setAttribute("data-livue-ignore-id", t.__livue_ignore_id);
  },
  unmounted(t) {
    delete t.__livue_ignore, delete t.__livue_ignore_self, delete t.__livue_ignore_id;
  }
}, at = /* @__PURE__ */ new WeakMap();
let Jr = 0;
function Ba(t) {
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
function $a(t) {
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
function jt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function Xr(t, e) {
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
function Ua(t) {
  return !!t.component;
}
const Ja = {
  mounted(t, e, n) {
    let r = Ba(n);
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
    Jr++;
    let l = "model-" + Jr, u = "input";
    s.blur && (u = "blur"), (s.change || s.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = $a(s);
    s.live && !d && !c && (d = 150);
    function p(T) {
      if (s.number) {
        let L = Number(T);
        T = isNaN(L) ? 0 : L;
      }
      s.boolean && (T = !!T && T !== "false" && T !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = T : o[a] = T;
    }
    function m(T) {
      d > 0 ? tt(l, d)(function() {
        p(T);
      }) : c > 0 ? kt(l, c)(function() {
        p(T);
      }) : p(T);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let y = Ua(n), E = n.component, C = null, S = null, D = null, x = null;
    if (y && E)
      x = E.emit, E.emit = function(T, ...L) {
        if (T === "update:modelValue") {
          let P = L[0];
          m(P);
          return;
        }
        return x.call(E, T, ...L);
      }, E.props && "modelValue" in E.props && (D = Oe(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(T) {
          E.vnode && E.vnode.props && (E.vnode.props.modelValue = T), E.exposed && typeof E.exposed.setValue == "function" && E.exposed.setValue(T), E.update && E.update();
        },
        { immediate: !0 }
      )), at.set(t, {
        isComponent: !0,
        componentInstance: E,
        originalEmit: x,
        stopWatcher: D,
        property: a,
        state: o,
        modifiers: s
      });
    else {
      if (d > 0) {
        let T = tt(l, d);
        C = function(L) {
          let P = jt(L.target);
          T(function() {
            p(P);
          });
        };
      } else if (c > 0) {
        let T = kt(l, c);
        C = function(L) {
          let P = jt(L.target);
          T(function() {
            p(P);
          });
        };
      } else
        C = function(T) {
          p(jt(T.target));
        };
      s.enter ? (S = function(T) {
        T.key === "Enter" && p(jt(T.target));
      }, t.addEventListener("keyup", S)) : t.addEventListener(u, C), Xr(t, h), at.set(t, {
        isComponent: !1,
        handler: C,
        keyHandler: S,
        eventType: u,
        property: a,
        modifiers: s,
        state: o
      });
    }
  },
  updated(t, e, n) {
    let r = at.get(t);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], Xr(t, a);
    }
  },
  unmounted(t) {
    let e = at.get(t);
    e && (e.isComponent ? (e.componentInstance && e.originalEmit && (e.componentInstance.emit = e.originalEmit), e.stopWatcher && e.stopWatcher()) : e.keyHandler ? t.removeEventListener("keyup", e.keyHandler) : e.handler && t.removeEventListener(e.eventType, e.handler), at.delete(t));
  }
}, In = /* @__PURE__ */ new WeakMap(), Xa = 2500;
function Ya(t) {
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = e.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Xa;
}
const Ka = {
  mounted(t, e, n) {
    let r = ge(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = e.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let s = e.modifiers || {}, l = Ya(s), u = s["keep-alive"] === !0, d = s.visible === !0, c = {
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
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", h), c.visibilityHandler = h, m(), In.set(t, c);
  },
  unmounted(t) {
    let e = In.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), In.delete(t));
  }
}, qt = /* @__PURE__ */ new WeakMap();
let pn = typeof navigator < "u" ? navigator.onLine : !0, hn = /* @__PURE__ */ new Set(), Yr = !1;
function Ga() {
  Yr || typeof window > "u" || (Yr = !0, window.addEventListener("online", function() {
    pn = !0, hn.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    pn = !1, hn.forEach(function(t) {
      t(!1);
    });
  }));
}
const Za = {
  created(t, e) {
    Ga();
    let n = e.modifiers || {}, r = e.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = t.style.display || "", pn && (t.style.display = "none")), qt.set(t, o);
  },
  mounted(t, e) {
    let n = qt.get(t);
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
    r(pn), n.updateFn = r, hn.add(r);
  },
  unmounted(t) {
    let e = qt.get(t);
    e && e.updateFn && hn.delete(e.updateFn), qt.delete(t);
  }
};
let Kr = 0;
const lt = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new Map(), Qa = {
  created(t, e) {
    Kr++;
    let n = "livue-replace-" + Kr, r = e.modifiers.self === !0;
    lt.set(t, {
      id: n,
      isSelf: r,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), r && t.setAttribute("data-livue-replace-self", ""), On.set(n, 0);
  },
  mounted(t, e) {
    let n = lt.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = lt.get(t);
    n && (n.version++, On.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = lt.get(t);
    e && On.delete(e.id), lt.delete(t);
  }
}, st = /* @__PURE__ */ new WeakMap(), Gr = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, el = 200;
function tl(t) {
  if (!t.delay)
    return 0;
  for (let e of Object.keys(Gr))
    if (t[e])
      return Gr[e];
  return el;
}
function Mn(t, e, n, r, i) {
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
const nl = {
  created(t, e) {
    let n = t.style.display;
    st.set(t, {
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
    let r = ge(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = st.get(t), o = e.modifiers || {}, a = tl(o), s = e.value, l = null, u = null;
    o.class || o.attr ? u = s : typeof s == "string" && (l = s);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Mn(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, Mn(t, i, o, u, !0)) : (i.isActive = !1, Mn(t, i, o, u, !1));
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
    st.get(t);
  },
  unmounted(t) {
    let e = st.get(t);
    e && (e.delayTimer && clearTimeout(e.delayTimer), e.stopWatch && e.stopWatch(), st.delete(t));
  }
}, zt = /* @__PURE__ */ new WeakMap(), rl = {
  mounted(t, e, n) {
    let r = ge(n);
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
    zt.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = zt.get(t), i = ge(n);
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
    let e = zt.get(t);
    e && (e.stopWatch && e.stopWatch(), zt.delete(t));
  }
}, ut = /* @__PURE__ */ new WeakMap(), il = {
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
    ut.set(t, { targetId: n }), Hr(n, t, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(t, e) {
    const n = ut.get(t), r = e.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      jr(n.targetId);
      const i = e.modifiers.replace || !1;
      Hr(r, t, i), ut.set(t, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(t) {
    const e = ut.get(t);
    e && (jr(e.targetId), ut.delete(t));
  }
}, Zr = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, Qr = ["ctrl", "alt", "shift", "meta"];
let ei = 0;
function ol(t, e = 250) {
  for (let n in t) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return e;
}
function al(t, e) {
  for (let i = 0; i < Qr.length; i++) {
    let o = Qr[i];
    if (e[o] && !t[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in Zr)
    e[i] && (n = !0, t.key === Zr[i] && (r = !0));
  return !(n && !r);
}
function j(t, e = {}) {
  let n = e.supportsOutside === !0, r = e.isKeyboardEvent === !0;
  const i = /* @__PURE__ */ new WeakMap();
  return {
    mounted(o, a, s) {
      const { arg: l, modifiers: u } = a, d = ge(s);
      if (!d) {
        console.warn("[LiVue] v-" + t + ": livue helper not found in component context");
        return;
      }
      ei++;
      const c = "v-" + t + "-" + ei, p = ol(u);
      let m = null, h = null;
      u.debounce && (m = tt(c, p)), u.throttle && (h = kt(c, p));
      let y = !1, E = null;
      l && (E = l);
      const C = function(T) {
        let L = E, P = [];
        if (l) {
          L = l;
          const O = a.value;
          O != null && (P = Array.isArray(O) ? O : [O]);
        } else {
          const O = a.value;
          if (typeof O == "function") {
            const R = function() {
              O();
            };
            m ? m(R) : h ? h(R) : R();
            return;
          } else typeof O == "string" ? L = O : Array.isArray(O) && O.length > 0 && (L = O[0], P = O.slice(1));
        }
        if (!L) {
          console.warn("[LiVue] v-" + t + ": no method specified");
          return;
        }
        const z = function() {
          u.confirm ? d.callWithConfirm(L, "Are you sure?", ...P) : d.call(L, ...P);
        };
        m ? m(z) : h ? h(z) : z();
      }, S = function(T) {
        if (!(u.self && T.target !== o) && !(r && !al(T, u))) {
          if (u.once) {
            if (y)
              return;
            y = !0;
          }
          u.prevent && T.preventDefault(), u.stop && T.stopPropagation(), C();
        }
      }, D = {};
      u.capture && (D.capture = !0), u.passive && (D.passive = !0);
      const x = {
        handler: S,
        options: D,
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
            C();
          }
        };
        document.addEventListener(t, T, D), x.outsideHandler = T;
      } else
        o.addEventListener(t, S, D);
      i.set(o, x);
    },
    updated(o, a, s) {
    },
    unmounted(o) {
      const a = i.get(o);
      a && (a.outsideHandler ? document.removeEventListener(t, a.outsideHandler, a.options) : o.removeEventListener(t, a.handler, a.options), i.delete(o));
    }
  };
}
const ll = j("click", { supportsOutside: !0 }), sl = {
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
let ti = 0;
const ul = {
  created(t, e) {
    let n = e.value;
    n || (ti++, n = "scroll-" + ti), t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n;
  },
  updated(t, e) {
    let n = e.value;
    n && n !== t.__livue_scroll_key && (t.setAttribute("data-livue-scroll", n), t.__livue_scroll_key = n);
  },
  unmounted(t) {
    t.removeAttribute("data-livue-scroll"), delete t.__livue_scroll_key;
  }
}, ct = /* @__PURE__ */ new WeakMap();
function ni(t, e, n, r, i) {
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
const cl = {
  created(t, e) {
    let n = t.style.display;
    ct.set(t, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = e.modifiers || {};
    !r.class && !r.attr && (t.style.display = "none");
  },
  mounted(t, e, n) {
    let r = ge(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = ct.get(t), o = e.modifiers || {}, a = e.arg || null, s = e.value;
    i.stopWatch = Oe(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(l) {
        ni(t, i, o, s, l);
      },
      { immediate: !0 }
    );
  },
  updated(t, e, n) {
    let r = ct.get(t);
    if (r && e.value !== e.oldValue) {
      let i = ge(n);
      if (i) {
        let o = e.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        ni(t, r, e.modifiers || {}, e.value, a);
      }
    }
  },
  unmounted(t) {
    let e = ct.get(t);
    e && (e.stopWatch && e.stopWatch(), ct.delete(t));
  }
}, Ft = /* @__PURE__ */ new WeakMap();
let ri = 0;
function fl(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function dl(t, e) {
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
function pl(t, e) {
  let n = e.split("."), r = t[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const hl = {
  mounted(t, e, n) {
    let r = dl(e, n);
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
    ri++;
    let l = "watch-" + i + "-" + ri;
    if (s.blur) {
      let p = function() {
        o.sync();
      };
      t.addEventListener("focusout", p), Ft.set(t, { blurHandler: p });
      return;
    }
    let u = fl(s) || 150, d = tt(l, u), c = Oe(
      function() {
        return pl(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    Ft.set(t, { stopWatcher: c });
  },
  unmounted(t) {
    let e = Ft.get(t);
    e && (e.stopWatcher && e.stopWatcher(), e.blurHandler && t.removeEventListener("focusout", e.blurHandler), Ft.delete(t));
  }
}, wt = /* @__PURE__ */ new WeakMap();
let ii = 0;
function ml(t) {
  let e = t.type;
  return e === "input" || e === "textarea" || e === "select";
}
function vl(t) {
  return t.props ? !!(t.props.onInput || t.props["onUpdate:modelValue"]) : !1;
}
function gl(t, e) {
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
function Nt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function It(t, e, n) {
  let r = t[e];
  r && typeof r == "object" && "value" in r ? r.value = n : t[e] = n;
}
function Wi(t) {
  for (let e in t) {
    let n = e.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function yl(t, e) {
  if (e in t)
    return e;
  let n = e.toLowerCase();
  for (let r in t)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function bl(t) {
  let e = t.tagName.toLowerCase();
  return e === "input" || e === "textarea" || e === "select";
}
function wl(t) {
  return bl(t) ? t : t.querySelector("input, textarea, select");
}
function Ot(t, e) {
  return {
    mounted(n, r, i) {
      if (ml(i) && !vl(i))
        throw new Error("[LiVue] v-" + t + ' requires v-model on the element. Usage: <input v-model="prop" v-' + t + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + t + " requires property name as argument. Usage: v-" + t + ":propertyName");
      let a = gl(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + t + ": Could not find component context");
      let { state: s } = a, l = yl(s, o);
      if (!l)
        throw new Error("[LiVue] v-" + t + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      ii++;
      let d = t + "-" + ii, c = wl(n);
      if (!c) {
        console.warn("[LiVue] v-" + t + ": Could not find input element inside component");
        return;
      }
      let p = e(c, l, s, u, d);
      c.addEventListener(p.eventType, p.handler, { capture: !0 }), wt.set(n, {
        targetEl: c,
        handler: p.handler,
        eventType: p.eventType
      });
    },
    unmounted(n) {
      let r = wt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), wt.delete(n));
    }
  };
}
const El = Ot("debounce", function(t, e, n, r, i) {
  let o = Wi(r) || 150, a = tt(i, o);
  return {
    eventType: "input",
    handler: function(s) {
      s.stopImmediatePropagation();
      let l = Nt(s.target);
      a(function() {
        It(n, e, l);
      });
    }
  };
}), Sl = Ot("throttle", function(t, e, n, r, i) {
  let o = Wi(r) || 150, a = kt(i, o);
  return {
    eventType: "input",
    handler: function(s) {
      s.stopImmediatePropagation();
      let l = Nt(s.target);
      a(function() {
        It(n, e, l);
      });
    }
  };
}), vr = Ot("blur", function(t, e, n, r, i) {
  let o = function(s) {
    s.stopImmediatePropagation();
  }, a = function(s) {
    It(n, e, Nt(s.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), _l = vr.unmounted;
vr.unmounted = function(t) {
  let e = wt.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), _l(t);
};
const gr = Ot("enter", function(t, e, n, r, i) {
  let o = function(s) {
    s.stopImmediatePropagation();
  }, a = function(s) {
    s.key === "Enter" && It(n, e, Nt(s.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), Al = gr.unmounted;
gr.unmounted = function(t) {
  let e = wt.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), Al(t);
};
const Dl = Ot("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = Nt(o.target);
      a = !!a && a !== "false" && a !== "0", It(n, e, a);
    }
  };
});
function oi(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function be(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? oi(Object(n), !0).forEach(function(r) {
      Tl(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : oi(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Zt(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Zt = function(e) {
    return typeof e;
  } : Zt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Zt(t);
}
function Tl(t, e, n) {
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
function Cl(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function Ll(t, e) {
  if (t == null) return {};
  var n = Cl(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
var kl = "1.15.6";
function Se(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var Ae = Se(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Mt = Se(/Edge/i), ai = Se(/firefox/i), Et = Se(/safari/i) && !Se(/chrome/i) && !Se(/android/i), yr = Se(/iP(ad|od|hone)/i), Bi = Se(/chrome/i) && Se(/android/i), $i = {
  capture: !1,
  passive: !1
};
function H(t, e, n) {
  t.addEventListener(e, n, !Ae && $i);
}
function V(t, e, n) {
  t.removeEventListener(e, n, !Ae && $i);
}
function mn(t, e) {
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
function Ui(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function ve(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && mn(t, e) : mn(t, e)) || r && t === n)
        return t;
      if (t === n) break;
    } while (t = Ui(t));
  }
  return null;
}
var li = /\s+/g;
function le(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var r = (" " + t.className + " ").replace(li, " ").replace(" " + e + " ", " ");
      t.className = (r + (n ? " " + e : "")).replace(li, " ");
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
function et(t, e) {
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
function Ji(t, e, n) {
  if (t) {
    var r = t.getElementsByTagName(e), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function ye() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function G(t, e, n, r, i) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, a, s, l, u, d, c;
    if (t !== window && t.parentNode && t !== ye() ? (o = t.getBoundingClientRect(), a = o.top, s = o.left, l = o.bottom, u = o.right, d = o.height, c = o.width) : (a = 0, s = 0, l = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !Ae))
      do
        if (i && i.getBoundingClientRect && (N(i, "transform") !== "none" || n && N(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(N(i, "border-top-width")), s -= p.left + parseInt(N(i, "border-left-width")), l = a + o.height, u = s + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var m = et(i || t), h = m && m.a, y = m && m.d;
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
function si(t, e, n) {
  for (var r = xe(t, !0), i = G(t)[e]; r; ) {
    var o = G(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === ye()) break;
    r = xe(r, !1);
  }
  return !1;
}
function nt(t, e, n, r) {
  for (var i = 0, o = 0, a = t.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== I.ghost && (r || a[o] !== I.dragged) && ve(a[o], n.draggable, t, !1)) {
      if (i === e)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function br(t, e) {
  for (var n = t.lastElementChild; n && (n === I.ghost || N(n, "display") === "none" || e && !mn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function ce(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== I.clone && (!e || mn(t, e)) && n++;
  return n;
}
function ui(t) {
  var e = 0, n = 0, r = ye();
  if (t)
    do {
      var i = et(t), o = i.a, a = i.d;
      e += t.scrollLeft * o, n += t.scrollTop * a;
    } while (t !== r && (t = t.parentNode));
  return [e, n];
}
function xl(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var r in e)
        if (e.hasOwnProperty(r) && e[r] === t[n][r]) return Number(n);
    }
  return -1;
}
function xe(t, e) {
  if (!t || !t.getBoundingClientRect) return ye();
  var n = t, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = N(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ye();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ye();
}
function Nl(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Pn(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var St;
function Xi(t, e) {
  return function() {
    if (!St) {
      var n = arguments, r = this;
      n.length === 1 ? t.call(r, n[0]) : t.apply(r, n), St = setTimeout(function() {
        St = void 0;
      }, e);
    }
  };
}
function Il() {
  clearTimeout(St), St = void 0;
}
function Yi(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function Ki(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(!0) : n ? n(t).clone(!0)[0] : t.cloneNode(!0);
}
function Gi(t, e, n) {
  var r = {};
  return Array.from(t.children).forEach(function(i) {
    var o, a, s, l;
    if (!(!ve(i, e.draggable, t, !1) || i.animated || i === n)) {
      var u = G(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((s = r.right) !== null && s !== void 0 ? s : -1 / 0, u.right), r.bottom = Math.max((l = r.bottom) !== null && l !== void 0 ? l : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var ae = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ol() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(N(i, "display") === "none" || i === I.ghost)) {
            t.push({
              target: i,
              rect: G(i)
            });
            var o = be({}, t[t.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = et(i, !0);
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
      t.splice(xl(t, {
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
        var l = 0, u = s.target, d = u.fromRect, c = G(u), p = u.prevFromRect, m = u.prevToRect, h = s.rect, y = et(u, !0);
        y && (c.top -= y.f, c.left -= y.e), u.toRect = c, u.thisAnimationDuration && Pn(p, c) && !Pn(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - c.top) / (h.left - c.left) === (d.top - c.top) / (d.left - c.left) && (l = Pl(h, p, m, i.options)), Pn(c, d) || (u.prevFromRect = d, u.prevToRect = c, l || (l = i.options.animation), i.animate(u, h, c, l)), l && (o = !0, a = Math.max(a, l), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, l), u.thisAnimationDuration = l);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        N(r, "transition", ""), N(r, "transform", "");
        var s = et(this.el), l = s && s.a, u = s && s.d, d = (i.left - o.left) / (l || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, N(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = Ml(r), N(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), N(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          N(r, "transition", ""), N(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Ml(t) {
  return t.offsetWidth;
}
function Pl(t, e, n, r) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * r.animation;
}
var Be = [], Rn = {
  initializeByDefault: !0
}, Pt = {
  mount: function(e) {
    for (var n in Rn)
      Rn.hasOwnProperty(n) && !(n in e) && (e[n] = Rn[n]);
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
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](be({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](be({
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
function Rl(t) {
  var e = t.sortable, n = t.rootEl, r = t.name, i = t.targetEl, o = t.cloneEl, a = t.toEl, s = t.fromEl, l = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, c = t.newDraggableIndex, p = t.originalEvent, m = t.putSortable, h = t.extraEventProperties;
  if (e = e || n && n[ae], !!e) {
    var y, E = e.options, C = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !Ae && !Mt ? y = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (y = document.createEvent("Event"), y.initEvent(r, !0, !0)), y.to = a || n, y.from = s || n, y.item = i || n, y.clone = o, y.oldIndex = l, y.newIndex = u, y.oldDraggableIndex = d, y.newDraggableIndex = c, y.originalEvent = p, y.pullMode = m ? m.lastPutMode : void 0;
    var S = be(be({}, h), Pt.getEventProperties(r, e));
    for (var D in S)
      y[D] = S[D];
    n && n.dispatchEvent(y), E[C] && E[C].call(e, y);
  }
}
var Vl = ["evt"], oe = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = Ll(r, Vl);
  Pt.pluginEvent.bind(I)(e, n, be({
    dragEl: w,
    parentEl: X,
    ghostEl: M,
    rootEl: $,
    nextEl: je,
    lastDownEl: Qt,
    cloneEl: U,
    cloneHidden: Le,
    dragStarted: pt,
    putSortable: Q,
    activeSortable: I.active,
    originalEvent: i,
    oldIndex: Ke,
    oldDraggableIndex: _t,
    newIndex: se,
    newDraggableIndex: De,
    hideGhostForTarget: to,
    unhideGhostForTarget: no,
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
  Rl(be({
    putSortable: Q,
    cloneEl: U,
    targetEl: w,
    rootEl: $,
    oldIndex: Ke,
    oldDraggableIndex: _t,
    newIndex: se,
    newDraggableIndex: De
  }, t));
}
var w, X, M, $, je, Qt, U, Le, Ke, se, _t, De, Wt, Q, Xe = !1, vn = !1, gn = [], Re, pe, Vn, Hn, ci, fi, pt, $e, At, Dt = !1, Bt = !1, en, te, jn = [], ir = !1, yn = [], Sn = typeof document < "u", $t = yr, di = Mt || Ae ? "cssFloat" : "float", Hl = Sn && !Bi && !yr && "draggable" in document.createElement("div"), Zi = (function() {
  if (Sn) {
    if (Ae)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Qi = function(e, n) {
  var r = N(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = nt(e, 0, n), a = nt(e, 1, n), s = o && N(o), l = a && N(a), u = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + G(o).width, d = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + G(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return o && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || u >= i && r[di] === "none" || a && r[di] === "none" && u + d > i) ? "vertical" : "horizontal";
}, jl = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, s = r ? n.left : n.top, l = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === s || o === l || i + a / 2 === s + u / 2;
}, ql = function(e, n) {
  var r;
  return gn.some(function(i) {
    var o = i[ae].options.emptyInsertThreshold;
    if (!(!o || br(i))) {
      var a = G(i), s = e >= a.left - o && e <= a.right + o, l = n >= a.top - o && n <= a.bottom + o;
      if (s && l)
        return r = i;
    }
  }), r;
}, eo = function(e) {
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
  (!i || Zt(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, to = function() {
  !Zi && M && N(M, "display", "none");
}, no = function() {
  !Zi && M && N(M, "display", "");
};
Sn && !Bi && document.addEventListener("click", function(t) {
  if (vn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), vn = !1, !1;
}, !0);
var Ve = function(e) {
  if (w) {
    e = e.touches ? e.touches[0] : e;
    var n = ql(e.clientX, e.clientY);
    if (n) {
      var r = {};
      for (var i in e)
        e.hasOwnProperty(i) && (r[i] = e[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ae]._onDragOver(r);
    }
  }
}, zl = function(e) {
  w && w.parentNode[ae]._isOutsideThisEl(e.target);
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
      return Qi(t, this.options);
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
    supportPointer: I.supportPointer !== !1 && "PointerEvent" in window && (!Et || yr),
    emptyInsertThreshold: 5
  };
  Pt.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  eo(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Hl, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? H(t, "pointerdown", this._onTapStart) : (H(t, "mousedown", this._onTapStart), H(t, "touchstart", this._onTapStart)), this.nativeDraggable && (H(t, "dragover", this), H(t, "dragenter", this)), gn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), _e(this, Ol());
}
I.prototype = /** @lends Sortable.prototype */
{
  constructor: I,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && ($e = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, w) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, d = i.filter;
      if (Yl(r), !w && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Et && l && l.tagName.toUpperCase() === "SELECT") && (l = ve(l, i.draggable, r, !1), !(l && l.animated) && Qt !== l)) {
        if (Ke = ce(l), _t = ce(l, i.draggable), typeof d == "function") {
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
          if (c = ve(u, c.trim(), r, !1), c)
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
        i.handle && !ve(u, i.handle, r, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, n, r) {
    var i = this, o = i.el, a = i.options, s = o.ownerDocument, l;
    if (r && !w && r.parentNode === o) {
      var u = G(r);
      if ($ = o, w = r, X = w.parentNode, je = w.nextSibling, Qt = r, Wt = a.group, I.dragged = w, Re = {
        target: w,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, ci = Re.clientX - u.left, fi = Re.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, w.style["will-change"] = "all", l = function() {
        if (oe("delayEnded", i, {
          evt: e
        }), I.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !ai && i.nativeDraggable && (w.draggable = !0), i._triggerDragStart(e, n), re({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), le(w, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Ji(w, d.trim(), qn);
      }), H(s, "dragover", Ve), H(s, "mousemove", Ve), H(s, "touchmove", Ve), a.supportPointer ? (H(s, "pointerup", i._onDrop), !this.nativeDraggable && H(s, "pointercancel", i._onDrop)) : (H(s, "mouseup", i._onDrop), H(s, "touchend", i._onDrop), H(s, "touchcancel", i._onDrop)), ai && this.nativeDraggable && (this.options.touchStartThreshold = 4, w.draggable = !0), oe("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Mt || Ae))) {
        if (I.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (H(s, "pointerup", i._disableDelayedDrag), H(s, "pointercancel", i._disableDelayedDrag)) : (H(s, "mouseup", i._disableDelayedDrag), H(s, "touchend", i._disableDelayedDrag), H(s, "touchcancel", i._disableDelayedDrag)), H(s, "mousemove", i._delayedDragTouchMoveHandler), H(s, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && H(s, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    w && qn(w), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    V(e, "mouseup", this._disableDelayedDrag), V(e, "touchend", this._disableDelayedDrag), V(e, "touchcancel", this._disableDelayedDrag), V(e, "pointerup", this._disableDelayedDrag), V(e, "pointercancel", this._disableDelayedDrag), V(e, "mousemove", this._delayedDragTouchMoveHandler), V(e, "touchmove", this._delayedDragTouchMoveHandler), V(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? H(document, "pointermove", this._onTouchMove) : n ? H(document, "touchmove", this._onTouchMove) : H(document, "mousemove", this._onTouchMove) : (H(w, "dragend", this), H($, "dragstart", this._onDragStart));
    try {
      document.selection ? tn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, n) {
    if (Xe = !1, $ && w) {
      oe("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && H(document, "dragover", zl);
      var r = this.options;
      !e && le(w, r.dragClass, !1), le(w, r.ghostClass, !0), I.active = this, e && this._appendGhost(), re({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (pe) {
      this._lastX = pe.clientX, this._lastY = pe.clientY, to();
      for (var e = document.elementFromPoint(pe.clientX, pe.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(pe.clientX, pe.clientY), e !== n); )
        n = e;
      if (w.parentNode[ae]._isOutsideThisEl(e), n)
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
        } while (n = Ui(n));
      no();
    }
  },
  _onTouchMove: function(e) {
    if (Re) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = M && et(M, !0), s = M && a && a.a, l = M && a && a.d, u = $t && te && ui(te), d = (o.clientX - Re.clientX + i.x) / (s || 1) + (u ? u[0] - jn[0] : 0) / (s || 1), c = (o.clientY - Re.clientY + i.y) / (l || 1) + (u ? u[1] - jn[1] : 0) / (l || 1);
      if (!I.active && !Xe) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (M) {
        a ? (a.e += d - (Vn || 0), a.f += c - (Hn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        N(M, "webkitTransform", p), N(M, "mozTransform", p), N(M, "msTransform", p), N(M, "transform", p), Vn = d, Hn = c, pe = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!M) {
      var e = this.options.fallbackOnBody ? document.body : $, n = G(w, !0, $t, !0, e), r = this.options;
      if ($t) {
        for (te = e; N(te, "position") === "static" && N(te, "transform") === "none" && te !== document; )
          te = te.parentNode;
        te !== document.body && te !== document.documentElement ? (te === document && (te = ye()), n.top += te.scrollTop, n.left += te.scrollLeft) : te = ye(), jn = ui(te);
      }
      M = w.cloneNode(!0), le(M, r.ghostClass, !1), le(M, r.fallbackClass, !0), le(M, r.dragClass, !0), N(M, "transition", ""), N(M, "transform", ""), N(M, "box-sizing", "border-box"), N(M, "margin", 0), N(M, "top", n.top), N(M, "left", n.left), N(M, "width", n.width), N(M, "height", n.height), N(M, "opacity", "0.8"), N(M, "position", $t ? "absolute" : "fixed"), N(M, "zIndex", "100000"), N(M, "pointerEvents", "none"), I.ghost = M, e.appendChild(M), N(M, "transform-origin", ci / parseInt(M.style.width) * 100 + "% " + fi / parseInt(M.style.height) * 100 + "%");
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
    oe("setupClone", this), I.eventCanceled || (U = Ki(w), U.removeAttribute("id"), U.draggable = !1, U.style["will-change"] = "", this._hideClone(), le(U, this.options.chosenClass, !1), I.clone = U), r.cloneId = tn(function() {
      oe("clone", r), !I.eventCanceled && (r.options.removeCloneOnHide || $.insertBefore(U, w), r._hideClone(), re({
        sortable: r,
        name: "clone"
      }));
    }), !n && le(w, o.dragClass, !0), n ? (vn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (V(document, "mouseup", r._onDrop), V(document, "touchend", r._onDrop), V(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, w)), H(document, "drop", r), N(w, "transform", "translateZ(0)")), Xe = !0, r._dragStartId = tn(r._dragStarted.bind(r, n, e)), H(document, "selectstart", r), pt = !0, window.getSelection().removeAllRanges(), Et && N(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, s = this.options, l = s.group, u = I.active, d = Wt === l, c = s.sort, p = Q || u, m, h = this, y = !1;
    if (ir) return;
    function E(A, g) {
      oe(A, h, be({
        evt: e,
        isOwner: d,
        axis: m ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: p,
        target: r,
        completed: S,
        onMove: function(F, Y) {
          return Ut($, n, w, i, F, G(F), e, Y);
        },
        changed: D
      }, g));
    }
    function C() {
      E("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function S(A) {
      return E("dragOverCompleted", {
        insertion: A
      }), A && (d ? u._hideClone() : u._showClone(h), h !== p && (le(w, Q ? Q.options.ghostClass : u.options.ghostClass, !1), le(w, s.ghostClass, !0)), Q !== h && h !== I.active ? Q = h : h === I.active && Q && (Q = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        E("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === w && !w.animated || r === n && !r.animated) && ($e = null), !s.dragoverBubble && !e.rootEl && r !== document && (w.parentNode[ae]._isOutsideThisEl(e.target), !A && Ve(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), y = !0;
    }
    function D() {
      se = ce(w), De = ce(w, s.draggable), re({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: se,
        newDraggableIndex: De,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = ve(r, s.draggable, n, !0), E("dragOver"), I.eventCanceled) return y;
    if (w.contains(e.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return S(!1);
    if (vn = !1, u && !s.disabled && (d ? c || (a = X !== $) : Q === this || (this.lastPutMode = Wt.checkPull(this, u, w, e)) && l.checkPut(this, u, w, e))) {
      if (m = this._getDirection(e, r) === "vertical", i = G(w), E("dragOverValid"), I.eventCanceled) return y;
      if (a)
        return X = $, C(), this._hideClone(), E("revert"), I.eventCanceled || (je ? $.insertBefore(w, je) : $.appendChild(w)), S(!0);
      var x = br(n, s.draggable);
      if (!x || $l(e, m, this) && !x.animated) {
        if (x === w)
          return S(!1);
        if (x && n === e.target && (r = x), r && (o = G(r)), Ut($, n, w, i, r, o, e, !!r) !== !1)
          return C(), x && x.nextSibling ? n.insertBefore(w, x.nextSibling) : n.appendChild(w), X = n, D(), S(!0);
      } else if (x && Bl(e, m, this)) {
        var T = nt(n, 0, s, !0);
        if (T === w)
          return S(!1);
        if (r = T, o = G(r), Ut($, n, w, i, r, o, e, !1) !== !1)
          return C(), n.insertBefore(w, T), X = n, D(), S(!0);
      } else if (r.parentNode === n) {
        o = G(r);
        var L = 0, P, z = w.parentNode !== n, O = !jl(w.animated && w.toRect || i, r.animated && r.toRect || o, m), R = m ? "top" : "left", v = si(r, "top", "top") || si(w, "top", "top"), J = v ? v.scrollTop : void 0;
        $e !== r && (P = o[R], Dt = !1, Bt = !O && s.invertSwap || z), L = Ul(e, r, o, m, O ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, Bt, $e === r);
        var Z;
        if (L !== 0) {
          var ne = ce(w);
          do
            ne -= L, Z = X.children[ne];
          while (Z && (N(Z, "display") === "none" || Z === M));
        }
        if (L === 0 || Z === r)
          return S(!1);
        $e = r, At = L;
        var f = r.nextElementSibling, b = !1;
        b = L === 1;
        var _ = Ut($, n, w, i, r, o, e, b);
        if (_ !== !1)
          return (_ === 1 || _ === -1) && (b = _ === 1), ir = !0, setTimeout(Wl, 30), C(), b && !f ? n.appendChild(w) : r.parentNode.insertBefore(w, b ? f : r), v && Yi(v, 0, J - v.scrollTop), X = w.parentNode, P !== void 0 && !Bt && (en = Math.abs(P - G(r)[R])), D(), S(!0);
      }
      if (n.contains(w))
        return S(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    V(document, "mousemove", this._onTouchMove), V(document, "touchmove", this._onTouchMove), V(document, "pointermove", this._onTouchMove), V(document, "dragover", Ve), V(document, "mousemove", Ve), V(document, "touchmove", Ve);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    V(e, "mouseup", this._onDrop), V(e, "touchend", this._onDrop), V(e, "pointerup", this._onDrop), V(e, "pointercancel", this._onDrop), V(e, "touchcancel", this._onDrop), V(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, r = this.options;
    if (se = ce(w), De = ce(w, r.draggable), oe("drop", this, {
      evt: e
    }), X = w && w.parentNode, se = ce(w), De = ce(w, r.draggable), I.eventCanceled) {
      this._nulling();
      return;
    }
    Xe = !1, Bt = !1, Dt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), or(this.cloneId), or(this._dragStartId), this.nativeDraggable && (V(document, "drop", this), V(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Et && N(document.body, "user-select", ""), N(w, "transform", ""), e && (pt && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), M && M.parentNode && M.parentNode.removeChild(M), ($ === X || Q && Q.lastPutMode !== "clone") && U && U.parentNode && U.parentNode.removeChild(U), w && (this.nativeDraggable && V(w, "dragend", this), qn(w), w.style["will-change"] = "", pt && !Xe && le(w, Q ? Q.options.ghostClass : this.options.ghostClass, !1), le(w, this.options.chosenClass, !1), re({
      sortable: this,
      name: "unchoose",
      toEl: X,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), $ !== X ? (se >= 0 && (re({
      rootEl: X,
      name: "add",
      toEl: X,
      fromEl: $,
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
      fromEl: $,
      originalEvent: e
    }), re({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: e
    })), Q && Q.save()) : se !== Ke && se >= 0 && (re({
      sortable: this,
      name: "update",
      toEl: X,
      originalEvent: e
    }), re({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: e
    })), I.active && ((se == null || se === -1) && (se = Ke, De = _t), re({
      sortable: this,
      name: "end",
      toEl: X,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    oe("nulling", this), $ = w = X = M = je = U = Qt = Le = Re = pe = pt = se = De = Ke = _t = $e = At = Q = Wt = I.dragged = I.ghost = I.clone = I.active = null, yn.forEach(function(e) {
      e.checked = !0;
    }), yn.length = Vn = Hn = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        w && (this._onDragOver(e), Fl(e));
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
      n = r[i], ve(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || Xl(n));
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
      ve(s, this.options.draggable, i, !1) && (r[o] = s);
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
    return ve(e, n || this.options.draggable, this.el, !1);
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
    var i = Pt.modifyOption(this, e, n);
    typeof i < "u" ? r[e] = i : r[e] = n, e === "group" && eo(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    oe("destroy", this);
    var e = this.el;
    e[ae] = null, V(e, "mousedown", this._onTapStart), V(e, "touchstart", this._onTapStart), V(e, "pointerdown", this._onTapStart), this.nativeDraggable && (V(e, "dragover", this), V(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), gn.splice(gn.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Le) {
      if (oe("hideClone", this), I.eventCanceled) return;
      N(U, "display", "none"), this.options.removeCloneOnHide && U.parentNode && U.parentNode.removeChild(U), Le = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Le) {
      if (oe("showClone", this), I.eventCanceled) return;
      w.parentNode == $ && !this.options.group.revertClone ? $.insertBefore(U, w) : je ? $.insertBefore(U, je) : $.appendChild(U), this.options.group.revertClone && this.animate(w, U), N(U, "display", ""), Le = !1;
    }
  }
};
function Fl(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Ut(t, e, n, r, i, o, a, s) {
  var l, u = t[ae], d = u.options.onMove, c;
  return window.CustomEvent && !Ae && !Mt ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = t, l.dragged = n, l.draggedRect = r, l.related = i || e, l.relatedRect = o || G(e), l.willInsertAfter = s, l.originalEvent = a, t.dispatchEvent(l), d && (c = d.call(u, l, a)), c;
}
function qn(t) {
  t.draggable = !1;
}
function Wl() {
  ir = !1;
}
function Bl(t, e, n) {
  var r = G(nt(n.el, 0, n.options, !0)), i = Gi(n.el, n.options, M), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function $l(t, e, n) {
  var r = G(br(n.el, n.options.draggable)), i = Gi(n.el, n.options, M), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function Ul(t, e, n, r, i, o, a, s) {
  var l = r ? t.clientY : t.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (s && en < u * i) {
      if (!Dt && (At === 1 ? l > d + u * o / 2 : l < c - u * o / 2) && (Dt = !0), Dt)
        p = !0;
      else if (At === 1 ? l < d + en : l > c - en)
        return -At;
    } else if (l > d + u * (1 - i) / 2 && l < c - u * (1 - i) / 2)
      return Jl(e);
  }
  return p = p || a, p && (l < d + u * o / 2 || l > c - u * o / 2) ? l > d + u / 2 ? 1 : -1 : 0;
}
function Jl(t) {
  return ce(w) < ce(t) ? 1 : -1;
}
function Xl(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, r = 0; n--; )
    r += e.charCodeAt(n);
  return r.toString(36);
}
function Yl(t) {
  yn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && yn.push(r);
  }
}
function tn(t) {
  return setTimeout(t, 0);
}
function or(t) {
  return clearTimeout(t);
}
Sn && H(document, "touchmove", function(t) {
  (I.active || Xe) && t.cancelable && t.preventDefault();
});
I.utils = {
  on: H,
  off: V,
  css: N,
  find: Ji,
  is: function(e, n) {
    return !!ve(e, n, e, !1);
  },
  extend: Nl,
  throttle: Xi,
  closest: ve,
  toggleClass: le,
  clone: Ki,
  index: ce,
  nextTick: tn,
  cancelNextTick: or,
  detectDirection: Qi,
  getChild: nt,
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
    r.utils && (I.utils = be(be({}, I.utils), r.utils)), Pt.mount(r);
  });
};
I.create = function(t, e) {
  return new I(t, e);
};
I.version = kl;
var K = [], ht, ar, lr = !1, zn, Fn, bn, mt;
function Kl() {
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
      this.sortable.nativeDraggable ? H(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? H(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? H(document, "touchmove", this._handleFallbackAutoScroll) : H(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? V(document, "dragover", this._handleAutoScroll) : (V(document, "pointermove", this._handleFallbackAutoScroll), V(document, "touchmove", this._handleFallbackAutoScroll), V(document, "mousemove", this._handleFallbackAutoScroll)), pi(), nn(), Il();
    },
    nulling: function() {
      bn = ar = ht = lr = mt = zn = Fn = null, K.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, s = document.elementFromPoint(o, a);
      if (bn = n, r || this.options.forceAutoScrollFallback || Mt || Ae || Et) {
        Wn(n, this.options, s, r);
        var l = xe(s, !0);
        lr && (!mt || o !== zn || a !== Fn) && (mt && pi(), mt = setInterval(function() {
          var u = xe(document.elementFromPoint(o, a), !0);
          u !== l && (l = u, nn()), Wn(n, i.options, u, r);
        }, 10), zn = o, Fn = a);
      } else {
        if (!this.options.bubbleScroll || xe(s, !0) === ye()) {
          nn();
          return;
        }
        Wn(n, this.options, xe(s, !1), !1);
      }
    }
  }, _e(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function nn() {
  K.forEach(function(t) {
    clearInterval(t.pid);
  }), K = [];
}
function pi() {
  clearInterval(mt);
}
var Wn = Xi(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = ye(), u = !1, d;
    ar !== n && (ar = n, nn(), ht = e.scroll, d = e.scrollFn, ht === !0 && (ht = xe(n, !0)));
    var c = 0, p = ht;
    do {
      var m = p, h = G(m), y = h.top, E = h.bottom, C = h.left, S = h.right, D = h.width, x = h.height, T = void 0, L = void 0, P = m.scrollWidth, z = m.scrollHeight, O = N(m), R = m.scrollLeft, v = m.scrollTop;
      m === l ? (T = D < P && (O.overflowX === "auto" || O.overflowX === "scroll" || O.overflowX === "visible"), L = x < z && (O.overflowY === "auto" || O.overflowY === "scroll" || O.overflowY === "visible")) : (T = D < P && (O.overflowX === "auto" || O.overflowX === "scroll"), L = x < z && (O.overflowY === "auto" || O.overflowY === "scroll"));
      var J = T && (Math.abs(S - i) <= a && R + D < P) - (Math.abs(C - i) <= a && !!R), Z = L && (Math.abs(E - o) <= a && v + x < z) - (Math.abs(y - o) <= a && !!v);
      if (!K[c])
        for (var ne = 0; ne <= c; ne++)
          K[ne] || (K[ne] = {});
      (K[c].vx != J || K[c].vy != Z || K[c].el !== m) && (K[c].el = m, K[c].vx = J, K[c].vy = Z, clearInterval(K[c].pid), (J != 0 || Z != 0) && (u = !0, K[c].pid = setInterval(function() {
        r && this.layer === 0 && I.active._onTouchMove(bn);
        var f = K[this.layer].vy ? K[this.layer].vy * s : 0, b = K[this.layer].vx ? K[this.layer].vx * s : 0;
        typeof d == "function" && d.call(I.dragged.parentNode[ae], b, f, t, bn, K[this.layer].el) !== "continue" || Yi(K[this.layer].el, b, f);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && p !== l && (p = xe(p, !1)));
    lr = u;
  }
}, 30), ro = function(e) {
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
function wr() {
}
wr.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = nt(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: ro
};
_e(wr, {
  pluginName: "revertOnSpill"
});
function Er() {
}
Er.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: ro
};
_e(Er, {
  pluginName: "removeOnSpill"
});
I.mount(new Kl());
I.mount(Er, wr);
const Ge = /* @__PURE__ */ new WeakMap(), rn = /* @__PURE__ */ new WeakMap();
function Gl(t) {
  if (t["no-animation"])
    return 0;
  for (let e of Object.keys(t)) {
    let n = e.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Jt = /* @__PURE__ */ new WeakMap(), Zl = {
  mounted(t, e, n) {
    let r = ge(n), i = e.modifiers || {}, o = e.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Gl(i), s = i.horizontal ? "horizontal" : "vertical";
    Jt.set(t, e);
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
        let y = Jt.get(t), E = y ? y.value : null, C = typeof E == "string";
        if (Array.isArray(E)) {
          let D = p.from;
          h < m ? D.insertBefore(p.item, D.children[h]) : D.insertBefore(p.item, D.children[h + 1]);
          let x = E.splice(h, 1)[0];
          E.splice(m, 0, x);
          return;
        }
        if (C && r) {
          let D = E, x = [], T = p.item, L = rn.get(T);
          L === void 0 && (L = T.dataset.livueSortItem), typeof L == "string" && /^\d+$/.test(L) && (L = parseInt(L, 10));
          let P = p.from, z = p.to, O = [L, m].concat(x);
          if (P !== z) {
            let v = z.dataset.livueSortMethod;
            v && (D = v);
            let J = P.dataset.livueSortId || P.dataset.livueSortGroup || null;
            O.push(J);
          }
          r.call(D, O);
        }
      }
    };
    typeof e.value == "string" && (t.dataset.livueSortMethod = e.value), t.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), l && (u.group = l);
    let c = I.create(t, u);
    Ge.set(t, c);
  },
  updated(t, e) {
    Jt.set(t, e);
    let n = Ge.get(t);
    n && t.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = Ge.get(t);
    e && (e.destroy(), Ge.delete(t)), Jt.delete(t);
  }
}, Ql = {
  mounted(t, e) {
    let n = e.value;
    rn.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    rn.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (rn.delete(t), t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, es = {
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
}, ts = {
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
}, ns = {
  mounted(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = Ge.get(t);
    r && r.option("group", n);
  },
  updated(t, e) {
    let n = e.value;
    t.setAttribute("data-livue-sort-group", n);
    let r = Ge.get(t);
    r && r.option("group", n);
  },
  unmounted(t) {
    if (t && t.removeAttribute)
      try {
        t.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, rs = j("dblclick"), is = j("mousedown"), os = j("mouseup"), as = j("mouseenter"), ls = j("mouseleave"), ss = j("mouseover"), us = j("mouseout"), cs = j("mousemove"), fs = j("contextmenu"), ds = j("keydown", { isKeyboardEvent: !0 }), ps = j("keyup", { isKeyboardEvent: !0 }), hs = j("keypress", { isKeyboardEvent: !0 }), ms = j("focus"), vs = j("focusin"), gs = j("focusout"), ys = j("touchstart"), bs = j("touchend"), ws = j("touchmove"), Es = j("touchcancel"), Ss = j("change"), _s = j("input"), As = j("reset"), Ds = j("dragstart"), Ts = j("dragend"), Cs = j("dragenter"), Ls = j("dragleave"), ks = j("dragover"), xs = j("drop"), Ns = j("copy"), Is = j("cut"), Os = j("paste"), Ms = j("wheel"), Ps = j("resize");
function Rs() {
  k("init", Va), k("submit", Ha), k("intersect", ja), k("current", Fa), k("ignore", Wa), k("model-livue", Ja), k("debounce", El), k("throttle", Sl), k("blur", vr), k("enter", gr), k("boolean", Dl), k("poll", Ka), k("offline", Za), k("transition", ka), k("replace", Qa), k("loading", nl), k("target", rl), k("stream", il), k("click", ll), k("navigate", sl), k("scroll", ul), k("dirty", cl), k("watch", hl), k("sort", Zl), k("sort-item", Ql), k("sort-handle", es), k("sort-ignore", ts), k("sort-group", ns), k("dblclick", rs), k("mousedown", is), k("mouseup", os), k("mouseenter", as), k("mouseleave", ls), k("mouseover", ss), k("mouseout", us), k("mousemove", cs), k("contextmenu", fs), k("keydown", ds), k("keyup", ps), k("keypress", hs), k("focus", ms), k("focusin", vs), k("focusout", gs), k("touchstart", ys), k("touchend", bs), k("touchmove", ws), k("touchcancel", Es), k("change", Ss), k("input", _s), k("reset", As), k("dragstart", Ds), k("dragend", Ts), k("dragenter", Cs), k("dragleave", Ls), k("dragover", ks), k("drop", xs), k("copy", Ns), k("cut", Is), k("paste", Os), k("wheel", Ms), k("resize", Ps);
}
let Te = null, ft = null, hi = !1;
function Vs() {
  if (hi)
    return;
  hi = !0;
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
function Hs() {
  return Te || (Vs(), Te = document.createElement("div"), Te.className = "livue-hmr-indicator", document.body.appendChild(Te), Te);
}
function Xt(t, e) {
  const n = Hs();
  switch (ft && (clearTimeout(ft), ft = null), t) {
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
            `, ft = setTimeout(function() {
        mi();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, ft = setTimeout(function() {
        mi();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function mi() {
  Te && Te.classList.remove("visible");
}
let ze = null, _n = !0, io = !0, vt = !0, on = [];
function js(t) {
  ze = t;
}
async function qs(t) {
  if (_n) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), vt && Xt("updating", t.fileName), on.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = io ? zs() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), vt && Xt("error");
        return;
      }
      a.forEach(function(s) {
        const l = s.dataset.livueId, u = document.querySelector('[data-livue-id="' + l + '"]');
        u && (s.dataset.livueSnapshot && (u.dataset.livueSnapshot = s.dataset.livueSnapshot), u.innerHTML = s.innerHTML);
      }), ze.reboot(), e && (await Ws(), Fs(e)), vt && Xt("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), vt && Xt("error");
    }
  }
}
function zs() {
  const t = /* @__PURE__ */ new Map();
  return ze && ze.all().forEach(function(n) {
    if (vi(n.componentId, n.name, n.state, t), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        vi(r, i.name, i.state, t);
      }
  }), t;
}
function vi(t, e, n, r) {
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
function Fs(t) {
  ze && t.forEach(function(e, n) {
    const r = ze.getByName(e.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in e.state)
        o in i.state && (i.state[o] = e.state[o]);
    }
  });
}
function Ws() {
  return new Promise(function(t) {
    setTimeout(t, 0);
  });
}
function Bs() {
  return typeof import.meta < "u" && !1;
}
function $s() {
  _n = !0;
}
function Us() {
  _n = !1;
}
function Js() {
  return _n;
}
function Xs(t) {
  t.indicator !== void 0 && (vt = t.indicator), t.preserveState !== void 0 && (io = t.preserveState);
}
function Ys(t) {
  return on.push(t), function() {
    const e = on.indexOf(t);
    e !== -1 && on.splice(e, 1);
  };
}
async function Ks() {
  ze && await qs({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ue = !1, Bn = [];
class Gs {
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
    oa(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Rs(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), Ho(this), this._startObserver(), js(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), da());
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
    xt(e, !0, !1);
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
    Vo(e);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(e) {
    return En(e);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    Jo();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Qo();
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
      available: it(),
      ...fa()
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
    let r = new Ra(e);
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
    return kr(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return xr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), Or();
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
    }), Or();
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
      isAvailable: Bs,
      isEnabled: Js,
      enable: $s,
      disable: Us,
      configure: Xs,
      onUpdate: Ys,
      trigger: Ks
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
      var n = xr();
      n.forEach(function(r) {
        var i = kr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        Bn.push(i);
      });
    } else !e && Ue && (Ue = !1, console.log("[LiVue] Debug mode disabled"), Bn.forEach(function(r) {
      r();
    }), Bn = []);
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
const An = new Gs();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = yo, document.head.appendChild(t);
}
var he = window.LiVueConfig || {};
(he.showProgressBar !== void 0 || he.progressBarColor !== void 0 || he.prefetch !== void 0 || he.prefetchOnHover !== void 0 || he.hoverDelay !== void 0 || he.cachePages !== void 0 || he.maxCacheSize !== void 0 || he.restoreScroll !== void 0) && An.configureNavigation(he);
he.showProgressOnRequest !== void 0 && An.progress.configure({ showOnRequest: he.showProgressOnRequest });
function gi() {
  An.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", gi) : queueMicrotask(gi);
window.LiVue = An;
export {
  An as default
};
//# sourceMappingURL=livue.esm.js.map
