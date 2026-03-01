import * as En from "vue";
import { reactive as Ne, toRefs as Qi, inject as eo, provide as to, nextTick as or, onBeforeUnmount as no, onBeforeMount as ro, onUnmounted as di, onMounted as pi, readonly as io, watchEffect as oo, watch as Oe, computed as ao, ref as nn, shallowRef as ar, effectScope as lo, markRaw as so, defineComponent as uo, h as br, createApp as co } from "vue";
const fo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function hi(t, e) {
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
  return JSON.stringify(t, hi);
}
function Wn(t) {
  return Ne(Object.assign({}, t));
}
function po(t, e) {
  let n;
  for (n in e) {
    let r = wr(t[n]), i = wr(e[n]);
    r !== i && (t[n] = e[n]);
  }
  for (n in t)
    n in e || delete t[n];
}
function mi(t) {
  return JSON.parse(JSON.stringify(t, hi));
}
function ho(t) {
  return Qi(t);
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
function Mt(t, e) {
  let n = {}, r = mi(e);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(t[i]) && (n[i] = r[i]);
  return n;
}
function mo(t) {
  return Array.isArray(t) && t.length === 2 && t[1] && typeof t[1] == "object" && !Array.isArray(t[1]) && t[1].s;
}
function Bn(t) {
  if (mo(t))
    return t[0];
  if (Array.isArray(t))
    return t.map(Bn);
  if (t && typeof t == "object") {
    let e = {};
    for (let n in t)
      e[n] = Bn(t[n]);
    return e;
  }
  return t;
}
function _t(t) {
  let e = {};
  for (let n in t)
    e[n] = Bn(t[n]);
  return e;
}
let Er = 0;
function vo() {
  return Er++, Er;
}
let vi = /* @__PURE__ */ new Map();
function go(t) {
  let e = [];
  return t.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, e.push(o);
  }), e;
}
function yo(t, e) {
  let n = t.querySelectorAll("input, textarea, select");
  e.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function gi(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    vi.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: go(n)
    });
  });
}
function yi(t) {
  t.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = vi.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && yo(n, i.inputs));
  });
}
let bi = {
  ref: nn,
  computed: ao,
  watch: Oe,
  watchEffect: oo,
  reactive: Ne,
  readonly: io,
  onMounted: pi,
  onUnmounted: di,
  onBeforeMount: ro,
  onBeforeUnmount: no,
  nextTick: or,
  provide: to,
  inject: eo
}, wi = Object.keys(bi), bo = wi.map(function(t) {
  return bi[t];
});
function Sr(t) {
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
function wo(t, e, n) {
  let r = Object.keys(e), i = r.map(function(s) {
    return e[s];
  }), o = wi.concat(r).concat(["livue"]), a = bo.concat(i).concat([n]);
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
function _r(t) {
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
function Ei(t) {
  if (!(!t || typeof t != "object") && (t.dynamicChildren = null, Array.isArray(t.children)))
    for (let e = 0; e < t.children.length; e++)
      Ei(t.children[e]);
}
function $n(t, e, n, r, i, o) {
  let a = _r(t), s = Sr(a), l = En.compile(s.html), u = ar(l), d = [];
  function c(m, h) {
    let g = u.value, S = g(m, d);
    return Ei(S), S;
  }
  c._rc = !0;
  let p = {
    name: o || "LiVueComponent",
    render: c,
    setup: function() {
      En.provide("livue", n);
      let m = ho(e), h = Object.assign({}, m, r, { livue: n, livueV: i });
      if (s.setupCode) {
        let k = wo(s.setupCode, m, n);
        k && Object.assign(h, k);
      }
      var g = {
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
        return typeof k == "string" && !g[k] && S.test(k);
      }
      return new Proxy(h, {
        get: function(k, D, x) {
          if (D in k || typeof D == "symbol") return Reflect.get(k, D, x);
          if (b(D))
            return function() {
              return n.call(D, ...arguments);
            };
        },
        getOwnPropertyDescriptor: function(k, D) {
          var x = Object.getOwnPropertyDescriptor(k, D);
          if (x) return x;
          if (b(D))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(k, D) {
          return !!(D in k || b(D));
        },
        set: function(k, D, x) {
          return k[D] = x, !0;
        },
        ownKeys: function(k) {
          return Reflect.ownKeys(k);
        }
      });
    }
  };
  return p._updateRender = function(m) {
    let h = _r(m), g = Sr(h), S = En.compile(g.html);
    S !== u.value && (d.length = 0, u.value = S);
  }, p;
}
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
function Eo() {
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
}, ie = null, Un = null, ue = null, rn = !1, ht = 0;
function So(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function _o(t) {
  return (-1 + t) * 100;
}
function Si() {
  if (rn) return;
  rn = !0;
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
function Ao() {
  if (ue) return;
  Si(), ue = document.createElement("div"), ue.className = "livue-progress-bar livue-progress-hidden", ue.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(ee.parent) || document.body).appendChild(ue);
}
function Do() {
  if (!rn) return;
  let t = document.getElementById("livue-progress-styles");
  t && (t.remove(), rn = !1, Si());
}
function To(t) {
  Object.assign(ee, t), Do();
}
function At() {
  return ee.showOnRequest;
}
function Co() {
  ht++, ie === null && (Ao(), ie = 0, ue && ue.classList.remove("livue-progress-hidden"), vn(ee.minimum), ee.trickle && (Un = setInterval(function() {
    _i();
  }, ee.trickleSpeed)));
}
function vn(t) {
  ie !== null && (t = So(t, ee.minimum, 1), ie = t, ue && (ue.style.transform = "translate3d(" + _o(t) + "%, 0, 0)"));
}
function _i() {
  if (ie === null || ie >= 1) return;
  let t;
  ie < 0.2 ? t = 0.1 : ie < 0.5 ? t = 0.04 : ie < 0.8 ? t = 0.02 : ie < 0.99 ? t = 5e-3 : t = 0, vn(ie + t);
}
function Ai() {
  ht = Math.max(0, ht - 1), !(ht > 0) && ie !== null && (vn(1), clearInterval(Un), Un = null, setTimeout(function() {
    ue && ue.classList.add("livue-progress-hidden"), setTimeout(function() {
      ie = null, ue && (ue.style.transform = "translate3d(-100%, 0, 0)");
    }, ee.speed);
  }, ee.speed));
}
function Lo() {
  ht = 0, Ai();
}
function ko() {
  return ie !== null;
}
function No() {
  return ie;
}
const xe = {
  configure: To,
  start: Co,
  set: vn,
  trickle: _i,
  done: Ai,
  forceDone: Lo,
  isStarted: ko,
  getStatus: No,
  isRequestProgressEnabled: At
};
var ut = null, Ar = !1, Ge = !1, de = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, we = /* @__PURE__ */ new Map(), qe = /* @__PURE__ */ new Map(), Jn = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new Map(), Le = null;
function Io(t) {
  Object.assign(de, t), t.progressBarColor && xe.configure({ color: t.progressBarColor });
}
function Oo(t) {
  ut = t, !Ar && (Ar = !0, Le = Di(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Le },
    "",
    location.href
  ), window.addEventListener("popstate", function(e) {
    e.state && e.state.livueNavigate && (Ti(Le), Le = e.state.pageKey, Ct(e.state.url, !1, !0));
  }), Mo());
}
function Di() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function Ti(t) {
  if (!(!de.restoreScroll || !t)) {
    Ut.set(t, {
      x: window.scrollX,
      y: window.scrollY
    });
    var e = document.querySelectorAll("[data-livue-scroll]");
    e.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Ut.get(t) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Ut.set(t, i);
      }
    });
  }
}
function xo(t) {
  if (!(!de.restoreScroll || !t)) {
    var e = Ut.get(t);
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
function Mo() {
  document.addEventListener("click", Po, !0), de.prefetch && (document.addEventListener("mouseenter", Vo, !0), document.addEventListener("mouseleave", Ho, !0), document.addEventListener("mousedown", jo, !0), document.addEventListener("focus", qo, !0));
}
function Po(t) {
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
        n.startsWith("#") || n.startsWith("javascript:") || e.hasAttribute("download") || e.getAttribute("target") !== "_blank" && (t.preventDefault(), t.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), Ct(n, !0, !1));
      }
    }
  }
}
function Ro(t) {
  var e = t.dataset.livueNavigateMode;
  return e === "hover" ? "hover" : "mousedown";
}
function Vo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!e || !de.prefetchOnHover)) {
      var n = Ro(e);
      if (n === "hover") {
        var r = e.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            gn(r);
          }, de.hoverDelay);
          Jn.set(e, i);
        }
      }
    }
  }
}
function Ho(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = Jn.get(e);
      n && (clearTimeout(n), Jn.delete(e));
    }
  }
}
function jo(t) {
  if (!(!t.target || typeof t.target.closest != "function")) {
    var e = t.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (e) {
      var n = e.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || gn(n);
    }
  }
}
function qo(t) {
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
  if (qe.has(e))
    return qe.get(e);
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
    return qe.delete(e), r.ok ? r.text().then(function(i) {
      return de.cachePages && Ci(e, i), i;
    }) : null;
  }).catch(function(r) {
    return qe.delete(e), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return qe.set(e, n), n;
}
function Ci(t, e) {
  for (var n = new DOMParser(), r = n.parseFromString(e, "text/html"), i = r.querySelector("title"); we.size >= de.maxCacheSize; ) {
    var o = we.keys().next().value;
    we.delete(o);
  }
  we.set(t, {
    html: e,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function zo() {
  we.clear();
}
function lr(t) {
  Ge || !t || !t.url || (t.navigate ? Ct(t.url, !0, !1) : (Ge = !0, window.location.href = t.url));
}
async function Ct(t, e, n) {
  if (!Ge) {
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
      Ge = !0, n || Ti(Le), de.showProgressBar && xe.start();
      try {
        var o, a = we.get(r);
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
          o = await s.text(), de.cachePages && Ci(r, o);
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
        var c = Fo(), p = /* @__PURE__ */ new Set();
        c.forEach(function(b) {
          b.livueIds.forEach(function(k) {
            p.add(k);
          });
        }), ut._stopObserver(), ut.destroyExcept(p), c.forEach(function(b) {
          b.element.parentNode && b.element.parentNode.removeChild(b.element);
        });
        var m = u.querySelector("title");
        m && (document.title = m.textContent), document.body.innerHTML = u.body.innerHTML, Wo(c);
        var h = u.querySelector('meta[name="csrf-token"]'), g = document.querySelector('meta[name="csrf-token"]');
        if (h && g && (g.setAttribute("content", h.getAttribute("content")), Eo()), Bo(u), $o(u), e && (Le = Di(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Le },
          "",
          r
        )), Uo(u), ut.rebootPreserving(), n)
          xo(Le);
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
        Ge = !1, de.showProgressBar && xe.done();
      }
    }
  }
}
function Fo() {
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
function Wo(t) {
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
function Bo(t) {
  var e = document.querySelectorAll("[data-livue-head]");
  e.forEach(function(r) {
    r.remove();
  });
  var n = t.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function $o(t) {
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
function Uo(t) {
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
function Jo() {
  return Ge;
}
var Je = /* @__PURE__ */ new Map(), Xo = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Dr(t, e) {
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
function Li() {
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
function Tr() {
  return Xo.slice();
}
var Xn = [], Yn = [], Dt = !1;
function Yo(t) {
  return t.isolate ? Go(t) : new Promise(function(e, n) {
    Xn.push({
      payload: t,
      resolve: e,
      reject: n
    }), Dt || (Dt = !0, queueMicrotask(ki));
  });
}
function Ko(t) {
  return new Promise(function(e, n) {
    Yn.push({
      payload: t,
      resolve: e,
      reject: n
    }), Dt || (Dt = !0, queueMicrotask(ki));
  });
}
async function ki() {
  var t = Xn, e = Yn;
  if (Xn = [], Yn = [], Dt = !1, !(t.length === 0 && e.length === 0)) {
    At() && xe.start();
    var n = Ni(), r = tt(), i = {
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
          lr(p[c].redirect);
          return;
        }
      for (var c = 0; c < t.length; c++) {
        var h = p[c];
        if (!h) {
          t[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (h.error) {
          var g = new Error(h.error);
          g.status = h.status || 500, g.data = h, t[c].reject(g);
        } else if (h.errors) {
          var g = new Error("Validation failed");
          g.status = 422, g.data = h, t[c].reject(g);
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
          var g = new Error(h.error);
          g.status = h.status || 500, g.data = h, e[c].reject(g);
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
      At() && xe.done();
    }
  }
}
async function Go(t) {
  At() && xe.start();
  var e = Ni(), n = tt(), r = {
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
      return lr(l.redirect), new Promise(function() {
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
    At() && xe.done();
  }
}
function Ni() {
  var t = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + t + "/update";
}
async function _n(t, e, n, r, i) {
  return Yo({
    snapshot: t,
    diffs: r || {},
    method: e,
    params: n || [],
    isolate: i || !1
  });
}
let Kn = null, Ii = /* @__PURE__ */ new Map();
function Zo() {
  return Ne({});
}
function me(t, e) {
  Gn(t);
  for (let n in e)
    t[n] = e[n];
}
function Gn(t) {
  for (let e in t)
    delete t[e];
}
function Qo(t) {
  Kn = t;
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
  }), i ? !0 : (Kn ? Kn(t, e) : console.error("[LiVue] Unhandled error on " + e + ":", t), !1);
}
function ea(t, e) {
  typeof e == "function" && Ii.set(t, e);
}
function Zn(t) {
  Ii.delete(t);
}
var Oi = [];
function L(t, e, n) {
  Oi.push({
    name: t,
    directive: e
  });
}
function ta() {
  return Oi;
}
const Ie = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map();
let Cr = !1;
function nt() {
  return typeof window < "u" && window.Echo;
}
function na(t, e) {
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
function xi(t, e, n) {
  if (!e || !e.length)
    return function() {
    };
  if (!nt())
    return Cr || (Cr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], { channel: a, type: s, event: l, method: u, isPresenceEvent: d, isCustomEvent: c } = o, p = na(a, s);
    if (!p) continue;
    const m = s + ":" + a + ":" + l + ":" + t;
    if (Me.has(m)) {
      r.push(m);
      continue;
    }
    const h = function(g) {
      try {
        n(u, g);
      } catch (S) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', S);
      }
    };
    if (s === "presence" && d)
      ra(p, l, h);
    else {
      const g = c ? "." + l : l;
      p.listen(g, h);
    }
    Me.set(m, {
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
      Mi(r[i]);
  };
}
function ra(t, e, n) {
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
function Mi(t) {
  const e = Me.get(t);
  if (e) {
    if (!e.isPresenceEvent) {
      const n = e.isCustomEvent ? "." + e.event : e.event;
      try {
        e.channel.stopListening(n, e.handler);
      } catch {
      }
    }
    Me.delete(t), ia(e.channelKey);
  }
}
function Lr(t) {
  const e = ":" + t, n = [];
  Me.forEach(function(r, i) {
    i.endsWith(e) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    Mi(n[r]);
}
function ia(t) {
  let e = !1;
  if (Me.forEach(function(r) {
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
function kr() {
  Me.clear(), Ie.forEach(function(t, e) {
    if (nt()) {
      const n = e.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Ie.clear();
}
function oa() {
  return {
    echoAvailable: nt(),
    channels: Array.from(Ie.keys()),
    subscriptions: Array.from(Me.keys())
  };
}
function aa() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Te = /* @__PURE__ */ new Map();
function on(t, e, n, r) {
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
function Jt(t, e, n, r, i, o) {
  var a = Te.get(t);
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
function Nr(t) {
  Te.forEach(function(e, n) {
    e.forEach(function(r) {
      r.componentId === t && e.delete(r);
    }), e.size === 0 && Te.delete(n);
  });
}
function la(t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    Jt(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function sa(t, e) {
  var n = new URL(window.location), r = !1;
  for (var i in t) {
    var o = t[i], a = o.as || i, s = e[i], l = !1;
    o.except !== null && o.except !== void 0 && String(s) === String(o.except) && (l = !0), !o.keep && !l && (s === "" || s === null || s === void 0) && (l = !0), l ? n.searchParams.delete(a) : n.searchParams.set(a, s), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function sr() {
  var t = document.querySelector('meta[name="livue-prefix"]'), e = t ? t.getAttribute("content") : "livue";
  return "/" + e + "/upload";
}
function ua(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var s = new FormData();
    s.append("file", t), s.append("component", e), s.append("property", n), s.append("checksum", r);
    var l = new XMLHttpRequest(), u = sr();
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
function An(t) {
  if (!t || t.length === 0) return Promise.resolve();
  var e = sr() + "-remove", n = tt();
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
function ca(t, e, n, r, i) {
  return new Promise(function(o, a) {
    var s = Array.from(t), l = new FormData();
    s.forEach(function(p) {
      l.append("files[]", p);
    }), l.append("component", e), l.append("property", n), l.append("checksum", r);
    var u = new XMLHttpRequest(), d = sr();
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
function Tt(t, e) {
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
function Ir(t) {
  let e = t + ":";
  for (let n of mt.keys())
    n.startsWith(e) && mt.delete(n);
  for (let n of vt.keys())
    n.startsWith(e) && vt.delete(n);
}
const an = "livue-tab-sync";
let ur = Date.now() + "-" + Math.random().toString(36).substr(2, 9), ln = null, cr = /* @__PURE__ */ new Map(), Or = !1;
function Pi() {
  Or || (Or = !0, typeof BroadcastChannel < "u" ? (ln = new BroadcastChannel(an), ln.onmessage = fa) : window.addEventListener("storage", da));
}
function fa(t) {
  let e = t.data;
  e.tabId !== ur && Ri(e);
}
function da(t) {
  if (t.key === an && t.newValue)
    try {
      let e = JSON.parse(t.newValue);
      if (e.tabId === ur) return;
      Ri(e);
    } catch {
    }
}
function Ri(t) {
  let e = cr.get(t.component);
  e && e(t.state, t.properties, t.config);
}
function pa(t, e) {
  Pi(), cr.set(t, e);
}
function xr(t) {
  cr.delete(t);
}
function ha(t, e, n, r) {
  Pi();
  let i = {
    tabId: ur,
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
function ma(t, e, n) {
  let r = {};
  for (let i of e)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in t && (r[i] = t[i]);
  return r;
}
const fr = /* @__PURE__ */ new Map();
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
  const { to: e, content: n, replace: r } = t, i = fr.get(e);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${e}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Mr(t, e, n = !1) {
  fr.set(t, { el: e, replace: n });
}
function Pr(t) {
  fr.delete(t);
}
function ya(t) {
  return Array.isArray(t) && t.length === 2 && t[1] !== null && typeof t[1] == "object" && "s" in t[1];
}
function dr(t) {
  let e = {};
  for (let n in t) {
    let r = t[n];
    ya(r) ? e[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? e[n] = dr(r) : e[n] = r;
  }
  return e;
}
function ba(t, e) {
  let n = t.composables || {}, r = t.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let s = n[a] || {}, l = r[a] || {}, u = dr(s), d = {};
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
    let i = dr(n[r]);
    if (t[r])
      for (let o in i)
        typeof t[r][o] != "function" && (t[r][o] = i[o]);
  }
}
function Ea(t) {
  return t.composables && Object.keys(t.composables).length > 0 || t.composableActions && Object.keys(t.composableActions).length > 0;
}
function Sa(t, e) {
  for (var n in e) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = t.indexOf(r), a = t.indexOf(i);
    o !== -1 && a !== -1 && (t = t.substring(0, o) + e[n] + t.substring(a + i.length));
  }
  return t;
}
function Qn(t, e, n, r, i, o, a) {
  a = a || {};
  let s = Zo(), l = n.name, u = n.vueMethods || {}, d = n.jsonMethods || [], c = n.confirms || {}, p = n.isolate || !1, m = n.urlParams || null, h = n.uploads || null, g = n.tabSync || null, S = !1, b = i, k = o, D = a.initialHtml || null;
  function x(f) {
    let y = document.querySelector('meta[name="livue-prefix"]'), A = "/" + (y ? y.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), v = document.createElement("a");
    v.href = A, v.download = f.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function T() {
    let f = Mt(b, e);
    return {
      snapshot: k,
      diffs: f
    };
  }
  function N(f, y) {
    if (f.redirect) {
      lr(f.redirect);
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
    if (f.download && x(f.download), f.snapshot) {
      let v = JSON.parse(f.snapshot);
      if (v.state) {
        let j = _t(v.state);
        po(e, j), b = JSON.parse(JSON.stringify(j));
      }
      k = f.snapshot, v.memo && (v.memo.errors ? me(w.errors, v.memo.errors) : Gn(w.errors), v.memo.vueMethods && (u = v.memo.vueMethods), v.memo.jsonMethods && (d = v.memo.jsonMethods), v.memo.urlParams && (m = v.memo.urlParams), v.memo.uploads && (h = v.memo.uploads), v.memo.confirms && (c = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && wa(C, v.memo));
    }
    if (m && sa(m, e), (f.html || f.fragments) && r && r._updateTemplate) {
      let v = {};
      if (f.snapshot) {
        let j = JSON.parse(f.snapshot);
        j.memo && (j.memo.transitionType && (v.transitionType = j.memo.transitionType), j.memo.skipTransition && (v.skipTransition = !0));
      }
      if (f.fragments) {
        let j = D || (a.el ? a.el.innerHTML : null);
        if (j) {
          let W = Sa(j, f.fragments);
          D = W, r._updateTemplate(W, v);
        }
      } else
        D = f.html, r._updateTemplate(f.html, v);
    }
    if (f.events && f.events.length > 0) {
      for (var _ = 0; _ < f.events.length; _++)
        f.events[_].sourceId = t;
      la(f.events);
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
    }), g && g.enabled && f.snapshot && !S && JSON.parse(f.snapshot).state) {
      let j = mi(e), W = [];
      for (let B in j)
        (!y || !(B in y)) && W.push(B);
      if (W.length > 0) {
        let B = ma(j, W, g);
        Object.keys(B).length > 0 && ha(l, B, W, g);
      }
    }
    if (S = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let P = Ne({}), F = {}, C = {}, q = function(f, y) {
    return w.call(f, y);
  };
  Ea(n) && (C = ba(n, q));
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
      let y = Mt(b, e);
      return f === void 0 ? Object.keys(y).length > 0 : f in y;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = Mt(b, e);
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
    call: async function(f, y, _) {
      let A, v = null;
      if (arguments.length === 1 ? A = [] : arguments.length === 2 ? Array.isArray(y) ? A = y : A = [y] : arguments.length >= 3 && (Array.isArray(y) && _ && typeof _ == "object" && (_.debounce || _.throttle) ? (A = y, v = _) : A = Array.prototype.slice.call(arguments, 1)), F[f])
        return F[f](w, A);
      if (u[f]) {
        try {
          new Function("state", "livue", u[f])(e, w);
        } catch (B) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', B);
        }
        return;
      }
      let j = d.includes(f), W = async function() {
        if (c[f] && !await w._showConfirm(c[f]))
          return;
        w.loading = !0, w.processing = f, P[f] = !0;
        let B;
        try {
          let $ = T(), z = await _n($.snapshot, f, A, $.diffs, p || j);
          B = N(z, $.diffs);
        } catch ($) {
          if (j)
            throw { status: $.status, errors: $.data && $.data.errors, message: $.message };
          $.status === 422 && $.data && $.data.errors ? me(w.errors, $.data.errors) : We($, l);
        } finally {
          w.loading = !1, w.processing = null, delete P[f];
        }
        return B;
      };
      return v && v.debounce ? Qe(t + ":" + f, v.debounce)(W) : v && v.throttle ? Tt(t + ":" + f, v.throttle)(W) : W();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, y) {
      let _ = Array.prototype.slice.call(arguments, 2), A = { message: y || "Are you sure?" };
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
        let f = T(), y = await _n(f.snapshot, null, [], f.diffs, p);
        N(y, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? me(w.errors, f.data.errors) : We(f, l);
      } finally {
        w.loading = !1, w.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      Gn(w.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, y) {
      Jt(f, y, "broadcast", l, t, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, y, _) {
      Jt(y, _, "to", l, t, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, y) {
      Jt(f, y, "self", l, t, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      Ct(f, !0);
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
      var _ = Sn(e, f);
      _ && _.__livue_upload && _.ref && An([_.ref]), w.uploading = !0, w.uploadProgress = 0;
      try {
        var A = await ua(y, l, f, h[f].token, function(v) {
          w.uploadProgress = v;
        });
        xt(e, f, {
          __livue_upload: !0,
          ref: A.ref,
          originalName: A.originalName,
          mimeType: A.mimeType,
          size: A.size,
          previewUrl: A.previewUrl
        });
      } catch (v) {
        v.status === 422 && v.data && v.data.errors ? me(w.errors, v.data.errors) : We(v, l);
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
        var _ = await ca(y, l, f, h[f].token, function(z) {
          w.uploadProgress = z.overall;
        }), A = _.results || [], v = _.errors || [], j = Sn(e, f), W = Array.isArray(j) ? j : [];
        if (A.length > 0) {
          var B = A.map(function(z) {
            return {
              __livue_upload: !0,
              ref: z.ref,
              originalName: z.originalName,
              mimeType: z.mimeType,
              size: z.size,
              previewUrl: z.previewUrl
            };
          });
          xt(e, f, W.concat(B));
        }
        if (v.length > 0) {
          var $ = {};
          v.forEach(function(z) {
            var Pe = f + "." + z.index;
            $[Pe] = {
              file: z.file,
              message: z.error
            };
          }), me(w.errors, $);
        }
      } catch (z) {
        z.status === 422 && z.data && z.data.errors ? me(w.errors, z.data.errors) : We(z, l);
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
      var _ = Sn(e, f);
      if (y !== void 0 && Array.isArray(_)) {
        var A = _[y];
        A && A.__livue_upload && A.ref && An([A.ref]), _.splice(y, 1), xt(e, f, _.slice());
      } else
        _ && _.__livue_upload && _.ref && An([_.ref]), xt(e, f, null);
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
      let _;
      try {
        let A = T();
        A.method = f, A.params = y, A.componentId = t;
        let v = await va(A, {
          onChunk: function(j) {
          },
          onComplete: function(j) {
          },
          onError: function(j) {
            console.error("[LiVue Stream] Error:", j);
          }
        });
        v && (_ = N(v, A.diffs));
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? me(w.errors, A.data.errors) : We(A, l);
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
    watch: function(f, y) {
      return typeof y != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Oe(
        function() {
          return e[f];
        },
        function(_, A) {
          y(_, A);
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
      }) : (ea(t, f), function() {
        Zn(t);
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
    _updateServerState: function(f, y) {
      b = JSON.parse(JSON.stringify(f)), k = y;
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
      let f = Mt(b, e), y = {};
      for (let _ in C) {
        let A = C[_], v = {}, j = [];
        for (let W in A)
          if (typeof A[W] == "function")
            j.push(W);
          else
            try {
              v[W] = JSON.parse(JSON.stringify(A[W]));
            } catch {
              v[W] = "[Unserializable]";
            }
        y[_] = { data: v, actions: j };
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
          tabSync: g,
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
      let f = T(), y = await _n(f.snapshot, null, [], f.diffs, p);
      return N(y, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? me(w.errors, f.data.errors) : We(f, l);
    } finally {
      w.loading = !1, w.processing = null, delete P.$refresh;
    }
  }
  F.$refresh = function() {
    return Y();
  }, g && g.enabled && pa(l, function(f, y, _) {
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
    get: function(f, y, _) {
      if (y in f || typeof y == "symbol")
        return Reflect.get(f, y, _);
      if (typeof y == "string" && y.startsWith("$") && F[y])
        return function() {
          var A = Array.prototype.slice.call(arguments);
          return F[y](w, A);
        };
      if (typeof y == "string" && !y.startsWith("$") && !K[y])
        return function() {
          var A = Array.prototype.slice.call(arguments);
          return w.call(y, ...A);
        };
    },
    set: function(f, y, _, A) {
      return Reflect.set(f, y, _, A);
    },
    has: function(f, y) {
      return typeof y == "string" && y.startsWith("$") && F[y] ? !0 : Reflect.has(f, y);
    }
  }), composables: C };
}
function sn(t, e) {
  let n = t.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), t;
  n[1];
  let r = n.index + n[0].length;
  return t.slice(0, r) + " " + e + t.slice(r);
}
function Xt(t, e) {
  let n = document.createElement("div");
  n.innerHTML = t;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let l = 0; l < r.length; l++)
    r[l].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(l) {
    let u = l.dataset.livueId, d = l.dataset.livueSnapshot || "{}", c = JSON.parse(d), p = c.memo ? c.memo.name : "", m = _t(c.state || {}), h = c.memo || {}, g = l.innerHTML, S = l.tagName.toLowerCase(), b = e._childRegistry[u];
    if (!b)
      for (let C in e._childRegistry) {
        let q = e._childRegistry[C];
        if (q.name === p && !o[C]) {
          b = q;
          break;
        }
      }
    if (b) {
      o[b.id] = !0, b.rootTag = S;
      let C = h.reactive || [];
      if (C.length > 0) {
        for (var k = 0; k < C.length; k++) {
          var D = C[k];
          D in m && (b.state[D] = m[D]);
        }
        b.livue._updateServerState(m, d), b.componentRef && b.componentRef._updateTemplate && b.componentRef._updateTemplate(g);
      }
    }
    let x = !b;
    if (!b) {
      let q = "livue-child-" + vo();
      e._versions[q] = 0;
      let w = Wn(m), Y = JSON.parse(JSON.stringify(m)), K = Object.assign({ name: h.name || p }, h), te = { _updateTemplate: null }, f = Li(), y = Qn(u, w, K, te, Y, d, {
        el: l,
        rootComponent: e,
        isChild: !0,
        parentLivue: e._rootLivue,
        cleanups: f
      }), _ = y.livue, A = y.composables;
      fe("component.init", {
        component: { id: u, name: p, state: w, livue: _ },
        el: l,
        cleanup: f.cleanup,
        isChild: !0
      });
      let v = h.errors || null;
      v && me(_.errors, v), b = {
        tagName: q,
        state: w,
        memo: K,
        livue: _,
        composables: A,
        componentRef: te,
        name: p,
        id: u,
        rootTag: S
      };
      let j = h.listeners || null;
      if (j)
        for (let B in j)
          (function($, z) {
            on(B, p, u, function(Pe) {
              z.call($, Pe);
            });
          })(j[B], _);
      let W = h.echo || null;
      W && W.length && (function(B, $) {
        xi(B, W, function(z, Pe) {
          $.call(z, Pe);
        });
      })(u, _), te._updateTemplate = function(B) {
        let $ = e.el.querySelector('[data-livue-id="' + u + '"]');
        $ && gi($);
        let z = Xt(B, e), Pe = sn(
          "<" + b.rootTag + ">" + z.template + "</" + b.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!e.vueApp) return;
        for (let Fe in z.childDefs)
          e.vueApp._context.components[Fe] || e.vueApp.component(Fe, z.childDefs[Fe]);
        e.vueApp._context.components[b.tagName]._updateRender(Pe), or(function() {
          let Fe = e.el.querySelector('[data-livue-id="' + u + '"]');
          Fe && yi(Fe);
        });
      }, e._childRegistry[u] = b;
    }
    let T = b.tagName, N = l.dataset.livueRef;
    N && e._rootLivue && (e._rootLivue.refs[N] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(C, q) {
        return b.livue.call(C, q || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(C, q) {
        return b.livue.set(C, q);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(C, q) {
        return b.livue.dispatch(C, q);
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
    if (P && e._rootState && on("$modelUpdate", b.name, u, function(C) {
      C && C.value !== void 0 && (e._rootState[P] = C.value);
    }), x) {
      let C = sn(
        "<" + S + ">" + g + "</" + S + ">",
        'data-livue-id="' + u + '"'
      );
      i[T] = $n(
        C,
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
let Rr = 0;
function er() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Dn = /* @__PURE__ */ new WeakMap();
function Vr() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const _a = {
  created(t, e) {
    if ((e.modifiers || {}).skip) {
      t.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = e.value;
    r || (Rr++, r = "livue-transition-" + Rr), Dn.set(t, {
      name: r
    }), t.setAttribute("data-livue-transition", r), er() && (t.style.viewTransitionName = r);
  },
  mounted(t, e) {
    Vr();
  },
  updated(t, e) {
    let n = Dn.get(t);
    if (e.value !== e.oldValue && e.value) {
      let r = e.value;
      n && (n.name = r), t.setAttribute("data-livue-transition", r), er() && (t.style.viewTransitionName = r);
    }
  },
  unmounted(t) {
    Dn.delete(t), t.removeAttribute("data-livue-transition"), Vr();
  }
};
function Aa(t, e = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (t(), Promise.resolve()) : (e.type && document.documentElement.classList.add("livue-transition-" + e.type), document.startViewTransition(t).finished.then(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }).catch(function() {
    e.type && document.documentElement.classList.remove("livue-transition-" + e.type);
  }));
}
function Da(t) {
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
function Ta(t, e) {
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
const Ca = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var Hr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Hr || (Hr = {}));
function La() {
  const t = lo(!0), e = t.run(() => nn({}));
  let n = [], r = [];
  const i = so({
    install(o) {
      i._a = o, o.provide(Ca, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
let Tn = 0;
function ka(t) {
  return uo({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(e, n) {
      let r = nn(!1), i = ar(null), o = null, a = nn(null);
      async function s() {
        if (!r.value)
          try {
            let u = await Ko({
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
        Tn++;
        let c = "lazy-" + Tn + "-" + Date.now(), p = d.memo ? d.memo.name : "", m = _t(d.state || {}), h = d.memo || {}, { createLivueHelper: g, buildComponentDef: S, processTemplate: b, createReactiveState: k } = t._lazyHelpers, D = k(m), x = JSON.parse(JSON.stringify(m)), T = { _updateTemplate: null }, N = g(
          c,
          D,
          h,
          T,
          x,
          u.snapshot
        );
        h.errors && me(N.errors, h.errors);
        let P = "livue-lazy-child-" + Tn, F = b(u.html, t), C = sn(
          F.template,
          'data-livue-id="' + c + '"'
        ), q = S(C, D, N, t._versions, p);
        t._childRegistry[c] = {
          tagName: P,
          state: D,
          memo: h,
          livue: N,
          componentRef: T,
          name: p,
          id: c
        }, T._updateTemplate = function(Y) {
          let K = b(Y, t), te = sn(
            K.template,
            'data-livue-id="' + c + '"'
          );
          for (let y in K.childDefs)
            t.vueApp._context.components[y] || t.vueApp.component(y, K.childDefs[y]);
          let f = S(te, D, N, t._versions, p);
          t.vueApp._context.components[P] = f, t._versions[P] = (t._versions[P] || 0) + 1, i.value = f;
        };
        let w = h.listeners || null;
        if (w)
          for (let Y in w)
            (function(K, te) {
              on(Y, p, c, function(f) {
                te.call(K, f);
              });
            })(w[Y], N);
        for (let Y in F.childDefs)
          t.vueApp._context.components[Y] || t.vueApp.component(Y, F.childDefs[Y]);
        t._versions[P] = 0, t.vueApp._context.components[P] || t.vueApp.component(P, q), i.value = q, r.value = !0;
      }
      return pi(function() {
        e.config.onLoad ? requestAnimationFrame(function() {
          s();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, s());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), di(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? br(i.value) : br("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class Na {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(e) {
    this.el = e, this.componentId = e.dataset.livueId;
    let n = e.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = Wn(_t(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Ne({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: Qn,
      buildComponentDef: $n,
      processTemplate: Xt,
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
      _updateTemplate: function(g, S) {
        S = S || {}, fe("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: g
        });
        var b = Da(r.el);
        gi(r.el);
        let k = Xt(g, r);
        if (!r.vueApp) return;
        for (let x in k.childDefs)
          r.vueApp._context.components[x] || r.vueApp.component(x, k.childDefs[x]);
        function D() {
          r._currentRootDef._updateRender(k.template), or(function() {
            yi(r.el), Ta(r.el, b), fe("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (S.skipTransition) {
          D();
          return;
        }
        er() ? Aa(D, { type: S.transitionType }) : D();
      }
    }, o = JSON.parse(JSON.stringify(_t(e.state || {})));
    this._cleanups = Li();
    let a = Qn(this.componentId, this.state, this.memo, i, o, n, {
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
    let u = Xt(this.el.innerHTML, this), d = e.memo && e.memo.errors || null;
    d && me(s.errors, d);
    let c = e.memo && e.memo.listeners || null;
    if (c)
      for (let g in c)
        (function(S, b, k, D) {
          on(g, k, D, function(x) {
            b.call(S, x);
          });
        })(c[g], s, r.name, r.componentId);
    let p = e.memo && e.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = xi(r.componentId, p, function(g, S) {
      s.call(g, S);
    }));
    let m = $n(u.template, r.state, s, l, r._versions, r.name);
    this._currentRootDef = m, this._rootDefRef = ar(m), this.vueApp = co({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", ka(this)), this._applyPluginsAndMount();
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
    let e = this, n = this.vueApp, r = La();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = ta();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Nr(e), Ir(e), Zn(e), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && xr(n.name), Lr(e);
    }
    if (fe("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Nr(this.componentId), Ir(this.componentId), Zn(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && xr(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Lr(this.componentId), this.vueApp) {
      try {
        this.vueApp.unmount();
      } catch {
      }
      this.vueApp = null;
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
let jr = /* @__PURE__ */ new Set();
const Ia = {
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
    jr.has(u) || (jr.add(u), r.call(s, l));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Cn = /* @__PURE__ */ new WeakMap(), Oa = {
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
    t.addEventListener("submit", s), Cn.set(t, s);
  },
  unmounted(t) {
    let e = Cn.get(t);
    e && (t.removeEventListener("submit", e), Cn.delete(t));
  }
}, Pt = /* @__PURE__ */ new WeakMap(), xa = {
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
        let g = h[0];
        (c ? !g.isIntersecting : g.isIntersecting) && (!s.once || !p) && (p = !0, r.call(o, a), s.once && (m.disconnect(), Pt.delete(t)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    m.observe(t), Pt.set(t, m);
  },
  unmounted(t) {
    let e = Pt.get(t);
    e && (e.disconnect(), Pt.delete(t));
  }
}, Ln = /* @__PURE__ */ new WeakMap();
function kn(t, e) {
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
    kn(t, e);
    let n = function() {
      kn(t, e);
    };
    window.addEventListener("popstate", n), window.addEventListener("livue:navigated", n), Ln.set(t, function() {
      window.removeEventListener("popstate", n), window.removeEventListener("livue:navigated", n);
    });
  },
  updated(t, e) {
    kn(t, e);
  },
  unmounted(t, e) {
    let n = e.value;
    typeof n == "string" && n.split(" ").filter(function(i) {
      return i.trim();
    }).forEach(function(i) {
      t.classList.remove(i);
    }), t.removeAttribute("data-current");
    let r = Ln.get(t);
    r && (r(), Ln.delete(t));
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
function Rt(t) {
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
    function p(T) {
      if (s.number) {
        let N = Number(T);
        T = isNaN(N) ? 0 : N;
      }
      s.boolean && (T = !!T && T !== "false" && T !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = T : o[a] = T;
    }
    function m(T) {
      d > 0 ? Qe(l, d)(function() {
        p(T);
      }) : c > 0 ? Tt(l, c)(function() {
        p(T);
      }) : p(T);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let g = Ha(n), S = n.component, b = null, k = null, D = null, x = null;
    if (g && S)
      x = S.emit, S.emit = function(T, ...N) {
        if (T === "update:modelValue") {
          let P = N[0];
          m(P);
          return;
        }
        return x.call(S, T, ...N);
      }, S.props && "modelValue" in S.props && (D = Oe(
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
        originalEmit: x,
        stopWatcher: D,
        property: a,
        state: o,
        modifiers: s
      });
    else {
      if (d > 0) {
        let T = Qe(l, d);
        b = function(N) {
          let P = Rt(N.target);
          T(function() {
            p(P);
          });
        };
      } else if (c > 0) {
        let T = Tt(l, c);
        b = function(N) {
          let P = Rt(N.target);
          T(function() {
            p(P);
          });
        };
      } else
        b = function(T) {
          p(Rt(T.target));
        };
      s.enter ? (k = function(T) {
        T.key === "Enter" && p(Rt(T.target));
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
}, Nn = /* @__PURE__ */ new WeakMap(), qa = 2500;
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
    let r = ge(n);
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
      function(g) {
        c.isVisible = g[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(t)), document.addEventListener("visibilitychange", h), c.visibilityHandler = h, m(), Nn.set(t, c);
  },
  unmounted(t) {
    let e = Nn.get(t);
    e && (e.intervalId && clearInterval(e.intervalId), e.observer && e.observer.disconnect(), e.visibilityHandler && document.removeEventListener("visibilitychange", e.visibilityHandler), Nn.delete(t));
  }
}, Vt = /* @__PURE__ */ new WeakMap();
let un = typeof navigator < "u" ? navigator.onLine : !0, cn = /* @__PURE__ */ new Set(), Wr = !1;
function Wa() {
  Wr || typeof window > "u" || (Wr = !0, window.addEventListener("online", function() {
    un = !0, cn.forEach(function(t) {
      t(!0);
    });
  }), window.addEventListener("offline", function() {
    un = !1, cn.forEach(function(t) {
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
    i === "visibility" && (o.originalDisplay = t.style.display || "", un && (t.style.display = "none")), Vt.set(t, o);
  },
  mounted(t, e) {
    let n = Vt.get(t);
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
    let e = Vt.get(t);
    e && e.updateFn && cn.delete(e.updateFn), Vt.delete(t);
  }
};
let Br = 0;
const it = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new Map(), $a = {
  created(t, e) {
    Br++;
    let n = "livue-replace-" + Br, r = e.modifiers.self === !0;
    it.set(t, {
      id: n,
      isSelf: r,
      version: 0
    }), t.setAttribute("data-livue-replace-id", n), r && t.setAttribute("data-livue-replace-self", ""), In.set(n, 0);
  },
  mounted(t, e) {
    let n = it.get(t);
    n && !t.hasAttribute("data-livue-replace-id") && t.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(t, e) {
    let n = it.get(t);
    n && (n.version++, In.set(n.id, n.version), t.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(t) {
    let e = it.get(t);
    e && In.delete(e.id), it.delete(t);
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
function On(t, e, n, r, i) {
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
    let r = ge(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = ot.get(t), o = e.modifiers || {}, a = Ja(o), s = e.value, l = null, u = null;
    o.class || o.attr ? u = s : typeof s == "string" && (l = s);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, On(t, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, On(t, i, o, u, !0)) : (i.isActive = !1, On(t, i, o, u, !1));
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
}, Ht = /* @__PURE__ */ new WeakMap(), Ya = {
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
    Ht.set(t, { stopWatch: o });
  },
  updated(t, e, n) {
    let r = Ht.get(t), i = ge(n);
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
    let e = Ht.get(t);
    e && (e.stopWatch && e.stopWatch(), Ht.delete(t));
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
      const { arg: l, modifiers: u } = a, d = ge(s);
      if (!d) {
        console.warn("[LiVue] v-" + t + ": livue helper not found in component context");
        return;
      }
      Xr++;
      const c = "v-" + t + "-" + Xr, p = Ga(u);
      let m = null, h = null;
      u.debounce && (m = Qe(c, p)), u.throttle && (h = Tt(c, p));
      let g = !1, S = null;
      l && (S = l);
      const b = function(T) {
        let N = S, P = [];
        if (l) {
          N = l;
          const C = a.value;
          C != null && (P = Array.isArray(C) ? C : [C]);
        } else {
          const C = a.value;
          if (typeof C == "function") {
            const q = function() {
              C();
            };
            m ? m(q) : h ? h(q) : q();
            return;
          } else typeof C == "string" ? N = C : Array.isArray(C) && C.length > 0 && (N = C[0], P = C.slice(1));
        }
        if (!N) {
          console.warn("[LiVue] v-" + t + ": no method specified");
          return;
        }
        const F = function() {
          u.confirm ? d.callWithConfirm(N, "Are you sure?", ...P) : d.call(N, ...P);
        };
        m ? m(F) : h ? h(F) : F();
      }, k = function(T) {
        if (!(u.self && T.target !== o) && !(r && !Za(T, u))) {
          if (u.once) {
            if (g)
              return;
            g = !0;
          }
          u.prevent && T.preventDefault(), u.stop && T.stopPropagation(), b();
        }
      }, D = {};
      u.capture && (D.capture = !0), u.passive && (D.passive = !0);
      const x = {
        handler: k,
        options: D,
        outsideHandler: null
      };
      if (n && u.outside) {
        const T = function(N) {
          if (!o.contains(N.target) && N.target !== o) {
            if (u.once) {
              if (g)
                return;
              g = !0;
            }
            b();
          }
        };
        document.addEventListener(t, T, D), x.outsideHandler = T;
      } else
        o.addEventListener(t, k, D);
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
    let r = ge(n);
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
      let i = ge(n);
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
}, jt = /* @__PURE__ */ new WeakMap();
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
      t.addEventListener("focusout", p), jt.set(t, { blurHandler: p });
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
    jt.set(t, { stopWatcher: c });
  },
  unmounted(t) {
    let e = jt.get(t);
    e && (e.stopWatcher && e.stopWatcher(), e.blurHandler && t.removeEventListener("focusout", e.blurHandler), jt.delete(t));
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
function Lt(t) {
  return t.type === "checkbox" ? t.checked : t.type === "radio" ? t.checked ? t.value : null : t.tagName === "SELECT" && t.multiple ? Array.from(t.selectedOptions).map(function(e) {
    return e.value;
  }) : t.value;
}
function kt(t, e, n) {
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
function Nt(t, e) {
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
const pl = Nt("debounce", function(t, e, n, r, i) {
  let o = Vi(r) || 150, a = Qe(i, o);
  return {
    eventType: "input",
    handler: function(s) {
      s.stopImmediatePropagation();
      let l = Lt(s.target);
      a(function() {
        kt(n, e, l);
      });
    }
  };
}), hl = Nt("throttle", function(t, e, n, r, i) {
  let o = Vi(r) || 150, a = Tt(i, o);
  return {
    eventType: "input",
    handler: function(s) {
      s.stopImmediatePropagation();
      let l = Lt(s.target);
      a(function() {
        kt(n, e, l);
      });
    }
  };
}), pr = Nt("blur", function(t, e, n, r, i) {
  let o = function(s) {
    s.stopImmediatePropagation();
  }, a = function(s) {
    kt(n, e, Lt(s.target));
  };
  return t.addEventListener("blur", a), t._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), ml = pr.unmounted;
pr.unmounted = function(t) {
  let e = gt.get(t), n = e ? e.targetEl : t;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), ml(t);
};
const hr = Nt("enter", function(t, e, n, r, i) {
  let o = function(s) {
    s.stopImmediatePropagation();
  }, a = function(s) {
    s.key === "Enter" && kt(n, e, Lt(s.target));
  };
  return t.addEventListener("keyup", a), t._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), vl = hr.unmounted;
hr.unmounted = function(t) {
  let e = gt.get(t), n = e ? e.targetEl : t;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), vl(t);
};
const gl = Nt("boolean", function(t, e, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = Lt(o.target);
      a = !!a && a !== "false" && a !== "0", kt(n, e, a);
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
function be(t) {
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
function Yt(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Yt = function(e) {
    return typeof e;
  } : Yt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Yt(t);
}
function yl(t, e, n) {
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
function Ee(t) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(t);
}
var _e = Ee(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), It = Ee(/Edge/i), ei = Ee(/firefox/i), yt = Ee(/safari/i) && !Ee(/chrome/i) && !Ee(/android/i), mr = Ee(/iP(ad|od|hone)/i), Hi = Ee(/chrome/i) && Ee(/android/i), ji = {
  capture: !1,
  passive: !1
};
function V(t, e, n) {
  t.addEventListener(e, n, !_e && ji);
}
function R(t, e, n) {
  t.removeEventListener(e, n, !_e && ji);
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
function qi(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function ve(t, e, n, r) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && fn(t, e) : fn(t, e)) || r && t === n)
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
function I(t, e, n) {
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
      var r = I(t, "transform");
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
function ye() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function Z(t, e, n, r, i) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var o, a, s, l, u, d, c;
    if (t !== window && t.parentNode && t !== ye() ? (o = t.getBoundingClientRect(), a = o.top, s = o.left, l = o.bottom, u = o.right, d = o.height, c = o.width) : (a = 0, s = 0, l = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (e || n) && t !== window && (i = i || t.parentNode, !_e))
      do
        if (i && i.getBoundingClientRect && (I(i, "transform") !== "none" || n && I(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(I(i, "border-top-width")), s -= p.left + parseInt(I(i, "border-left-width")), l = a + o.height, u = s + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && t !== window) {
      var m = Ze(i || t), h = m && m.a, g = m && m.d;
      m && (a /= g, s /= h, c /= h, d /= g, l = a + d, u = s + c);
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
  for (var r = ke(t, !0), i = Z(t)[e]; r; ) {
    var o = Z(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === ye()) break;
    r = ke(r, !1);
  }
  return !1;
}
function et(t, e, n, r) {
  for (var i = 0, o = 0, a = t.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== O.ghost && (r || a[o] !== O.dragged) && ve(a[o], n.draggable, t, !1)) {
      if (i === e)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function vr(t, e) {
  for (var n = t.lastElementChild; n && (n === O.ghost || I(n, "display") === "none" || e && !fn(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function ce(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== O.clone && (!e || fn(t, e)) && n++;
  return n;
}
function ri(t) {
  var e = 0, n = 0, r = ye();
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
function ke(t, e) {
  if (!t || !t.getBoundingClientRect) return ye();
  var n = t, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = I(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ye();
        if (r || e) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return ye();
}
function _l(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function xn(t, e) {
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
    if (!(!ve(i, e.draggable, t, !1) || i.animated || i === n)) {
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
          if (!(I(i, "display") === "none" || i === O.ghost)) {
            t.push({
              target: i,
              rect: Z(i)
            });
            var o = be({}, t[t.length - 1].rect);
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
        var l = 0, u = s.target, d = u.fromRect, c = Z(u), p = u.prevFromRect, m = u.prevToRect, h = s.rect, g = Ze(u, !0);
        g && (c.top -= g.f, c.left -= g.e), u.toRect = c, u.thisAnimationDuration && xn(p, c) && !xn(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - c.top) / (h.left - c.left) === (d.top - c.top) / (d.left - c.left) && (l = Cl(h, p, m, i.options)), xn(c, d) || (u.prevFromRect = d, u.prevToRect = c, l || (l = i.options.animation), i.animate(u, h, c, l)), l && (o = !0, a = Math.max(a, l), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, l), u.thisAnimationDuration = l);
      }), clearTimeout(e), o ? e = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), t = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        I(r, "transition", ""), I(r, "transform", "");
        var s = Ze(this.el), l = s && s.a, u = s && s.d, d = (i.left - o.left) / (l || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, I(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = Tl(r), I(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), I(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          I(r, "transition", ""), I(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
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
var Be = [], Mn = {
  initializeByDefault: !0
}, Ot = {
  mount: function(e) {
    for (var n in Mn)
      Mn.hasOwnProperty(n) && !(n in e) && (e[n] = Mn[n]);
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
        u.sortable = e, u.options = e.options, e[l] = u, Se(r, u.defaults);
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
      typeof i.eventProperties == "function" && Se(r, i.eventProperties.call(n[i.pluginName], e));
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
    var g, S = e.options, b = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !_e && !It ? g = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (g = document.createEvent("Event"), g.initEvent(r, !0, !0)), g.to = a || n, g.from = s || n, g.item = i || n, g.clone = o, g.oldIndex = l, g.newIndex = u, g.oldDraggableIndex = d, g.newDraggableIndex = c, g.originalEvent = p, g.pullMode = m ? m.lastPutMode : void 0;
    var k = be(be({}, h), Ot.getEventProperties(r, e));
    for (var D in k)
      g[D] = k[D];
    n && n.dispatchEvent(g), S[b] && S[b].call(e, g);
  }
}
var kl = ["evt"], oe = function(e, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = wl(r, kl);
  Ot.pluginEvent.bind(O)(e, n, be({
    dragEl: E,
    parentEl: X,
    ghostEl: M,
    rootEl: U,
    nextEl: je,
    lastDownEl: Kt,
    cloneEl: J,
    cloneHidden: Ce,
    dragStarted: ct,
    putSortable: Q,
    activeSortable: O.active,
    originalEvent: i,
    oldIndex: Ye,
    oldDraggableIndex: wt,
    newIndex: se,
    newDraggableIndex: Ae,
    hideGhostForTarget: Yi,
    unhideGhostForTarget: Ki,
    cloneNowHidden: function() {
      Ce = !0;
    },
    cloneNowShown: function() {
      Ce = !1;
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
  Ll(be({
    putSortable: Q,
    cloneEl: J,
    targetEl: E,
    rootEl: U,
    oldIndex: Ye,
    oldDraggableIndex: wt,
    newIndex: se,
    newDraggableIndex: Ae
  }, t));
}
var E, X, M, U, je, Kt, J, Ce, Ye, se, wt, Ae, qt, Q, Xe = !1, dn = !1, pn = [], Re, pe, Pn, Rn, ii, oi, ct, $e, Et, St = !1, zt = !1, Gt, ne, Vn = [], tr = !1, hn = [], yn = typeof document < "u", Ft = mr, ai = It || _e ? "cssFloat" : "float", Nl = yn && !Hi && !mr && "draggable" in document.createElement("div"), Ui = (function() {
  if (yn) {
    if (_e)
      return !1;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
})(), Ji = function(e, n) {
  var r = I(e), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = et(e, 0, n), a = et(e, 1, n), s = o && I(o), l = a && I(a), u = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Z(o).width, d = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Z(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && s.float && s.float !== "none") {
    var c = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === c) ? "vertical" : "horizontal";
  }
  return o && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || u >= i && r[ai] === "none" || a && r[ai] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Il = function(e, n, r) {
  var i = r ? e.left : e.top, o = r ? e.right : e.bottom, a = r ? e.width : e.height, s = r ? n.left : n.top, l = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === s || o === l || i + a / 2 === s + u / 2;
}, Ol = function(e, n) {
  var r;
  return pn.some(function(i) {
    var o = i[ae].options.emptyInsertThreshold;
    if (!(!o || vr(i))) {
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
  (!i || Yt(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, e.group = r;
}, Yi = function() {
  !Ui && M && I(M, "display", "none");
}, Ki = function() {
  !Ui && M && I(M, "display", "");
};
yn && !Hi && document.addEventListener("click", function(t) {
  if (dn)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), dn = !1, !1;
}, !0);
var Ve = function(e) {
  if (E) {
    e = e.touches ? e.touches[0] : e;
    var n = Ol(e.clientX, e.clientY);
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
function O(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = Se({}, e), t[ae] = this;
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
    supportPointer: O.supportPointer !== !1 && "PointerEvent" in window && (!yt || mr),
    emptyInsertThreshold: 5
  };
  Ot.initializePlugins(this, t, n);
  for (var r in n)
    !(r in e) && (e[r] = n[r]);
  Xi(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Nl, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? V(t, "pointerdown", this._onTapStart) : (V(t, "mousedown", this._onTapStart), V(t, "touchstart", this._onTapStart)), this.nativeDraggable && (V(t, "dragover", this), V(t, "dragenter", this)), pn.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), Se(this, Dl());
}
O.prototype = /** @lends Sortable.prototype */
{
  constructor: O,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && ($e = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, E) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, d = i.filter;
      if (zl(r), !E && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && yt && l && l.tagName.toUpperCase() === "SELECT") && (l = ve(l, i.draggable, r, !1), !(l && l.animated) && Kt !== l)) {
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
    if (r && !E && r.parentNode === o) {
      var u = Z(r);
      if (U = o, E = r, X = E.parentNode, je = E.nextSibling, Kt = r, qt = a.group, O.dragged = E, Re = {
        target: E,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, ii = Re.clientX - u.left, oi = Re.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, E.style["will-change"] = "all", l = function() {
        if (oe("delayEnded", i, {
          evt: e
        }), O.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !ei && i.nativeDraggable && (E.draggable = !0), i._triggerDragStart(e, n), re({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), le(E, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        zi(E, d.trim(), Hn);
      }), V(s, "dragover", Ve), V(s, "mousemove", Ve), V(s, "touchmove", Ve), a.supportPointer ? (V(s, "pointerup", i._onDrop), !this.nativeDraggable && V(s, "pointercancel", i._onDrop)) : (V(s, "mouseup", i._onDrop), V(s, "touchend", i._onDrop), V(s, "touchcancel", i._onDrop)), ei && this.nativeDraggable && (this.options.touchStartThreshold = 4, E.draggable = !0), oe("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(It || _e))) {
        if (O.eventCanceled) {
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
    E && Hn(E), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    R(e, "mouseup", this._disableDelayedDrag), R(e, "touchend", this._disableDelayedDrag), R(e, "touchcancel", this._disableDelayedDrag), R(e, "pointerup", this._disableDelayedDrag), R(e, "pointercancel", this._disableDelayedDrag), R(e, "mousemove", this._delayedDragTouchMoveHandler), R(e, "touchmove", this._delayedDragTouchMoveHandler), R(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? V(document, "pointermove", this._onTouchMove) : n ? V(document, "touchmove", this._onTouchMove) : V(document, "mousemove", this._onTouchMove) : (V(E, "dragend", this), V(U, "dragstart", this._onDragStart));
    try {
      document.selection ? Zt(function() {
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
      !e && le(E, r.dragClass, !1), le(E, r.ghostClass, !0), O.active = this, e && this._appendGhost(), re({
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
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = e.touches ? e.touches[0] : e, a = M && Ze(M, !0), s = M && a && a.a, l = M && a && a.d, u = Ft && ne && ri(ne), d = (o.clientX - Re.clientX + i.x) / (s || 1) + (u ? u[0] - Vn[0] : 0) / (s || 1), c = (o.clientY - Re.clientY + i.y) / (l || 1) + (u ? u[1] - Vn[1] : 0) / (l || 1);
      if (!O.active && !Xe) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(e, !0);
      }
      if (M) {
        a ? (a.e += d - (Pn || 0), a.f += c - (Rn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        I(M, "webkitTransform", p), I(M, "mozTransform", p), I(M, "msTransform", p), I(M, "transform", p), Pn = d, Rn = c, pe = o;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!M) {
      var e = this.options.fallbackOnBody ? document.body : U, n = Z(E, !0, Ft, !0, e), r = this.options;
      if (Ft) {
        for (ne = e; I(ne, "position") === "static" && I(ne, "transform") === "none" && ne !== document; )
          ne = ne.parentNode;
        ne !== document.body && ne !== document.documentElement ? (ne === document && (ne = ye()), n.top += ne.scrollTop, n.left += ne.scrollLeft) : ne = ye(), Vn = ri(ne);
      }
      M = E.cloneNode(!0), le(M, r.ghostClass, !1), le(M, r.fallbackClass, !0), le(M, r.dragClass, !0), I(M, "transition", ""), I(M, "transform", ""), I(M, "box-sizing", "border-box"), I(M, "margin", 0), I(M, "top", n.top), I(M, "left", n.left), I(M, "width", n.width), I(M, "height", n.height), I(M, "opacity", "0.8"), I(M, "position", Ft ? "absolute" : "fixed"), I(M, "zIndex", "100000"), I(M, "pointerEvents", "none"), O.ghost = M, e.appendChild(M), I(M, "transform-origin", ii / parseInt(M.style.width) * 100 + "% " + oi / parseInt(M.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var r = this, i = e.dataTransfer, o = r.options;
    if (oe("dragStart", this, {
      evt: e
    }), O.eventCanceled) {
      this._onDrop();
      return;
    }
    oe("setupClone", this), O.eventCanceled || (J = Bi(E), J.removeAttribute("id"), J.draggable = !1, J.style["will-change"] = "", this._hideClone(), le(J, this.options.chosenClass, !1), O.clone = J), r.cloneId = Zt(function() {
      oe("clone", r), !O.eventCanceled && (r.options.removeCloneOnHide || U.insertBefore(J, E), r._hideClone(), re({
        sortable: r,
        name: "clone"
      }));
    }), !n && le(E, o.dragClass, !0), n ? (dn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (R(document, "mouseup", r._onDrop), R(document, "touchend", r._onDrop), R(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, E)), V(document, "drop", r), I(E, "transform", "translateZ(0)")), Xe = !0, r._dragStartId = Zt(r._dragStarted.bind(r, n, e)), V(document, "selectstart", r), ct = !0, window.getSelection().removeAllRanges(), yt && I(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, r = e.target, i, o, a, s = this.options, l = s.group, u = O.active, d = qt === l, c = s.sort, p = Q || u, m, h = this, g = !1;
    if (tr) return;
    function S(A, v) {
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
        completed: k,
        onMove: function(W, B) {
          return Wt(U, n, E, i, W, Z(W), e, B);
        },
        changed: D
      }, v));
    }
    function b() {
      S("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function k(A) {
      return S("dragOverCompleted", {
        insertion: A
      }), A && (d ? u._hideClone() : u._showClone(h), h !== p && (le(E, Q ? Q.options.ghostClass : u.options.ghostClass, !1), le(E, s.ghostClass, !0)), Q !== h && h !== O.active ? Q = h : h === O.active && Q && (Q = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        S("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === E && !E.animated || r === n && !r.animated) && ($e = null), !s.dragoverBubble && !e.rootEl && r !== document && (E.parentNode[ae]._isOutsideThisEl(e.target), !A && Ve(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), g = !0;
    }
    function D() {
      se = ce(E), Ae = ce(E, s.draggable), re({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: se,
        newDraggableIndex: Ae,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), r = ve(r, s.draggable, n, !0), S("dragOver"), O.eventCanceled) return g;
    if (E.contains(e.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return k(!1);
    if (dn = !1, u && !s.disabled && (d ? c || (a = X !== U) : Q === this || (this.lastPutMode = qt.checkPull(this, u, E, e)) && l.checkPut(this, u, E, e))) {
      if (m = this._getDirection(e, r) === "vertical", i = Z(E), S("dragOverValid"), O.eventCanceled) return g;
      if (a)
        return X = U, b(), this._hideClone(), S("revert"), O.eventCanceled || (je ? U.insertBefore(E, je) : U.appendChild(E)), k(!0);
      var x = vr(n, s.draggable);
      if (!x || Vl(e, m, this) && !x.animated) {
        if (x === E)
          return k(!1);
        if (x && n === e.target && (r = x), r && (o = Z(r)), Wt(U, n, E, i, r, o, e, !!r) !== !1)
          return b(), x && x.nextSibling ? n.insertBefore(E, x.nextSibling) : n.appendChild(E), X = n, D(), k(!0);
      } else if (x && Rl(e, m, this)) {
        var T = et(n, 0, s, !0);
        if (T === E)
          return k(!1);
        if (r = T, o = Z(r), Wt(U, n, E, i, r, o, e, !1) !== !1)
          return b(), n.insertBefore(E, T), X = n, D(), k(!0);
      } else if (r.parentNode === n) {
        o = Z(r);
        var N = 0, P, F = E.parentNode !== n, C = !Il(E.animated && E.toRect || i, r.animated && r.toRect || o, m), q = m ? "top" : "left", w = ni(r, "top", "top") || ni(E, "top", "top"), Y = w ? w.scrollTop : void 0;
        $e !== r && (P = o[q], St = !1, zt = !C && s.invertSwap || F), N = Hl(e, r, o, m, C ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, zt, $e === r);
        var K;
        if (N !== 0) {
          var te = ce(E);
          do
            te -= N, K = X.children[te];
          while (K && (I(K, "display") === "none" || K === M));
        }
        if (N === 0 || K === r)
          return k(!1);
        $e = r, Et = N;
        var f = r.nextElementSibling, y = !1;
        y = N === 1;
        var _ = Wt(U, n, E, i, r, o, e, y);
        if (_ !== !1)
          return (_ === 1 || _ === -1) && (y = _ === 1), tr = !0, setTimeout(Pl, 30), b(), y && !f ? n.appendChild(E) : r.parentNode.insertBefore(E, y ? f : r), w && Wi(w, 0, Y - w.scrollTop), X = E.parentNode, P !== void 0 && !zt && (Gt = Math.abs(P - Z(r)[q])), D(), k(!0);
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
    if (se = ce(E), Ae = ce(E, r.draggable), oe("drop", this, {
      evt: e
    }), X = E && E.parentNode, se = ce(E), Ae = ce(E, r.draggable), O.eventCanceled) {
      this._nulling();
      return;
    }
    Xe = !1, zt = !1, St = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), nr(this.cloneId), nr(this._dragStartId), this.nativeDraggable && (R(document, "drop", this), R(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), yt && I(document.body, "user-select", ""), I(E, "transform", ""), e && (ct && (e.cancelable && e.preventDefault(), !r.dropBubble && e.stopPropagation()), M && M.parentNode && M.parentNode.removeChild(M), (U === X || Q && Q.lastPutMode !== "clone") && J && J.parentNode && J.parentNode.removeChild(J), E && (this.nativeDraggable && R(E, "dragend", this), Hn(E), E.style["will-change"] = "", ct && !Xe && le(E, Q ? Q.options.ghostClass : this.options.ghostClass, !1), le(E, this.options.chosenClass, !1), re({
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
    })), Q && Q.save()) : se !== Ye && se >= 0 && (re({
      sortable: this,
      name: "update",
      toEl: X,
      originalEvent: e
    }), re({
      sortable: this,
      name: "sort",
      toEl: X,
      originalEvent: e
    })), O.active && ((se == null || se === -1) && (se = Ye, Ae = wt), re({
      sortable: this,
      name: "end",
      toEl: X,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    oe("nulling", this), U = E = X = M = je = J = Kt = Ce = Re = pe = ct = se = Ae = Ye = wt = $e = Et = Q = qt = O.dragged = O.ghost = O.clone = O.active = null, hn.forEach(function(e) {
      e.checked = !0;
    }), hn.length = Pn = Rn = 0;
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
      n = r[i], ve(n, a.draggable, this.el, !1) && e.push(n.getAttribute(a.dataIdAttr) || ql(n));
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
    var i = Ot.modifyOption(this, e, n);
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
    }), this._onDrop(), this._disableDelayedDragEvents(), pn.splice(pn.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Ce) {
      if (oe("hideClone", this), O.eventCanceled) return;
      I(J, "display", "none"), this.options.removeCloneOnHide && J.parentNode && J.parentNode.removeChild(J), Ce = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ce) {
      if (oe("showClone", this), O.eventCanceled) return;
      E.parentNode == U && !this.options.group.revertClone ? U.insertBefore(J, E) : je ? U.insertBefore(J, je) : U.appendChild(J), this.options.group.revertClone && this.animate(E, J), I(J, "display", ""), Ce = !1;
    }
  }
};
function Ml(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Wt(t, e, n, r, i, o, a, s) {
  var l, u = t[ae], d = u.options.onMove, c;
  return window.CustomEvent && !_e && !It ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = t, l.dragged = n, l.draggedRect = r, l.related = i || e, l.relatedRect = o || Z(e), l.willInsertAfter = s, l.originalEvent = a, t.dispatchEvent(l), d && (c = d.call(u, l, a)), c;
}
function Hn(t) {
  t.draggable = !1;
}
function Pl() {
  tr = !1;
}
function Rl(t, e, n) {
  var r = Z(et(n.el, 0, n.options, !0)), i = $i(n.el, n.options, M), o = 10;
  return e ? t.clientX < i.left - o || t.clientY < r.top && t.clientX < r.right : t.clientY < i.top - o || t.clientY < r.bottom && t.clientX < r.left;
}
function Vl(t, e, n) {
  var r = Z(vr(n.el, n.options.draggable)), i = $i(n.el, n.options, M), o = 10;
  return e ? t.clientX > i.right + o || t.clientY > r.bottom && t.clientX > r.left : t.clientY > i.bottom + o || t.clientX > r.right && t.clientY > r.top;
}
function Hl(t, e, n, r, i, o, a, s) {
  var l = r ? t.clientY : t.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (s && Gt < u * i) {
      if (!St && (Et === 1 ? l > d + u * o / 2 : l < c - u * o / 2) && (St = !0), St)
        p = !0;
      else if (Et === 1 ? l < d + Gt : l > c - Gt)
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
  hn.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var r = e[n];
    r.checked && hn.push(r);
  }
}
function Zt(t) {
  return setTimeout(t, 0);
}
function nr(t) {
  return clearTimeout(t);
}
yn && V(document, "touchmove", function(t) {
  (O.active || Xe) && t.cancelable && t.preventDefault();
});
O.utils = {
  on: V,
  off: R,
  css: I,
  find: zi,
  is: function(e, n) {
    return !!ve(e, n, e, !1);
  },
  extend: _l,
  throttle: Fi,
  closest: ve,
  toggleClass: le,
  clone: Bi,
  index: ce,
  nextTick: Zt,
  cancelNextTick: nr,
  detectDirection: Ji,
  getChild: et,
  expando: ae
};
O.get = function(t) {
  return t[ae];
};
O.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (O.utils = be(be({}, O.utils), r.utils)), Ot.mount(r);
  });
};
O.create = function(t, e) {
  return new O(t, e);
};
O.version = El;
var G = [], ft, rr, ir = !1, jn, qn, mn, dt;
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
      this.sortable.nativeDraggable ? R(document, "dragover", this._handleAutoScroll) : (R(document, "pointermove", this._handleFallbackAutoScroll), R(document, "touchmove", this._handleFallbackAutoScroll), R(document, "mousemove", this._handleFallbackAutoScroll)), li(), Qt(), Al();
    },
    nulling: function() {
      mn = rr = ft = ir = dt = jn = qn = null, G.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, s = document.elementFromPoint(o, a);
      if (mn = n, r || this.options.forceAutoScrollFallback || It || _e || yt) {
        zn(n, this.options, s, r);
        var l = ke(s, !0);
        ir && (!dt || o !== jn || a !== qn) && (dt && li(), dt = setInterval(function() {
          var u = ke(document.elementFromPoint(o, a), !0);
          u !== l && (l = u, Qt()), zn(n, i.options, u, r);
        }, 10), jn = o, qn = a);
      } else {
        if (!this.options.bubbleScroll || ke(s, !0) === ye()) {
          Qt();
          return;
        }
        zn(n, this.options, ke(s, !1), !1);
      }
    }
  }, Se(t, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Qt() {
  G.forEach(function(t) {
    clearInterval(t.pid);
  }), G = [];
}
function li() {
  clearInterval(dt);
}
var zn = Fi(function(t, e, n, r) {
  if (e.scroll) {
    var i = (t.touches ? t.touches[0] : t).clientX, o = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = ye(), u = !1, d;
    rr !== n && (rr = n, Qt(), ft = e.scroll, d = e.scrollFn, ft === !0 && (ft = ke(n, !0)));
    var c = 0, p = ft;
    do {
      var m = p, h = Z(m), g = h.top, S = h.bottom, b = h.left, k = h.right, D = h.width, x = h.height, T = void 0, N = void 0, P = m.scrollWidth, F = m.scrollHeight, C = I(m), q = m.scrollLeft, w = m.scrollTop;
      m === l ? (T = D < P && (C.overflowX === "auto" || C.overflowX === "scroll" || C.overflowX === "visible"), N = x < F && (C.overflowY === "auto" || C.overflowY === "scroll" || C.overflowY === "visible")) : (T = D < P && (C.overflowX === "auto" || C.overflowX === "scroll"), N = x < F && (C.overflowY === "auto" || C.overflowY === "scroll"));
      var Y = T && (Math.abs(k - i) <= a && q + D < P) - (Math.abs(b - i) <= a && !!q), K = N && (Math.abs(S - o) <= a && w + x < F) - (Math.abs(g - o) <= a && !!w);
      if (!G[c])
        for (var te = 0; te <= c; te++)
          G[te] || (G[te] = {});
      (G[c].vx != Y || G[c].vy != K || G[c].el !== m) && (G[c].el = m, G[c].vx = Y, G[c].vy = K, clearInterval(G[c].pid), (Y != 0 || K != 0) && (u = !0, G[c].pid = setInterval(function() {
        r && this.layer === 0 && O.active._onTouchMove(mn);
        var f = G[this.layer].vy ? G[this.layer].vy * s : 0, y = G[this.layer].vx ? G[this.layer].vx * s : 0;
        typeof d == "function" && d.call(O.dragged.parentNode[ae], y, f, t, mn, G[this.layer].el) !== "continue" || Wi(G[this.layer].el, y, f);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (e.bubbleScroll && p !== l && (p = ke(p, !1)));
    ir = u;
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
function gr() {
}
gr.prototype = {
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
Se(gr, {
  pluginName: "revertOnSpill"
});
function yr() {
}
yr.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, r = e.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Gi
};
Se(yr, {
  pluginName: "removeOnSpill"
});
O.mount(new Fl());
O.mount(yr, gr);
const Ke = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ new WeakMap();
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
const Bt = /* @__PURE__ */ new WeakMap(), Bl = {
  mounted(t, e, n) {
    let r = ge(n), i = e.modifiers || {}, o = e.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Wl(i), s = i.horizontal ? "horizontal" : "vertical";
    Bt.set(t, e);
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
        let g = Bt.get(t), S = g ? g.value : null, b = typeof S == "string";
        if (Array.isArray(S)) {
          let D = p.from;
          h < m ? D.insertBefore(p.item, D.children[h]) : D.insertBefore(p.item, D.children[h + 1]);
          let x = S.splice(h, 1)[0];
          S.splice(m, 0, x);
          return;
        }
        if (b && r) {
          let D = S, x = [], T = p.item, N = en.get(T);
          N === void 0 && (N = T.dataset.livueSortItem), typeof N == "string" && /^\d+$/.test(N) && (N = parseInt(N, 10));
          let P = p.from, F = p.to, C = [N, m].concat(x);
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
    let c = O.create(t, u);
    Ke.set(t, c);
  },
  updated(t, e) {
    Bt.set(t, e);
    let n = Ke.get(t);
    n && t.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(t) {
    let e = Ke.get(t);
    e && (e.destroy(), Ke.delete(t)), Bt.delete(t);
  }
}, $l = {
  mounted(t, e) {
    let n = e.value;
    en.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  updated(t, e) {
    let n = e.value;
    en.set(t, n), t.setAttribute("data-livue-sort-item", n);
  },
  unmounted(t) {
    if (en.delete(t), t && t.removeAttribute)
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
  L("init", Ia), L("submit", Oa), L("intersect", xa), L("current", Ma), L("ignore", Pa), L("model-livue", ja), L("debounce", pl), L("throttle", hl), L("blur", pr), L("enter", hr), L("boolean", gl), L("poll", Fa), L("offline", Ba), L("transition", _a), L("replace", $a), L("loading", Xa), L("target", Ya), L("stream", Ka), L("click", Qa), L("navigate", el), L("scroll", tl), L("dirty", nl), L("watch", al), L("sort", Bl), L("sort-item", $l), L("sort-handle", Ul), L("sort-ignore", Jl), L("sort-group", Xl), L("dblclick", Yl), L("mousedown", Kl), L("mouseup", Gl), L("mouseenter", Zl), L("mouseleave", Ql), L("mouseover", es), L("mouseout", ts), L("mousemove", ns), L("contextmenu", rs), L("keydown", is), L("keyup", os), L("keypress", as), L("focus", ls), L("focusin", ss), L("focusout", us), L("touchstart", cs), L("touchend", fs), L("touchmove", ds), L("touchcancel", ps), L("change", hs), L("input", ms), L("reset", vs), L("dragstart", gs), L("dragend", ys), L("dragenter", bs), L("dragleave", ws), L("dragover", Es), L("drop", Ss), L("copy", _s), L("cut", As), L("paste", Ds), L("wheel", Ts), L("resize", Cs);
}
let De = null, st = null, si = !1;
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
function Ns() {
  return De || (ks(), De = document.createElement("div"), De.className = "livue-hmr-indicator", document.body.appendChild(De), De);
}
function $t(t, e) {
  const n = Ns();
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
  De && De.classList.remove("visible");
}
let ze = null, bn = !0, Zi = !0, pt = !0, tn = [];
function Is(t) {
  ze = t;
}
async function Os(t) {
  if (bn) {
    console.log("[LiVue HMR] " + t.type + " changed: " + t.fileName), pt && $t("updating", t.fileName), tn.forEach(function(e) {
      try {
        e(t);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const e = Zi ? xs() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), pt && $t("error");
        return;
      }
      a.forEach(function(s) {
        const l = s.dataset.livueId, u = document.querySelector('[data-livue-id="' + l + '"]');
        u && (s.dataset.livueSnapshot && (u.dataset.livueSnapshot = s.dataset.livueSnapshot), u.innerHTML = s.innerHTML);
      }), ze.reboot(), e && (await Ps(), Ms(e)), pt && $t("done");
    } catch (e) {
      console.error("[LiVue HMR] Update failed:", e), pt && $t("error");
    }
  }
}
function xs() {
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
  bn = !0;
}
function Hs() {
  bn = !1;
}
function js() {
  return bn;
}
function qs(t) {
  t.indicator !== void 0 && (pt = t.indicator), t.preserveState !== void 0 && (Zi = t.preserveState);
}
function zs(t) {
  return tn.push(t), function() {
    const e = tn.indexOf(t);
    e !== -1 && tn.splice(e, 1);
  };
}
async function Fs() {
  ze && await Os({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ue = !1, Fn = [];
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
    Qo(e);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Ls(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), Oo(this), this._startObserver(), Is(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(e) {
      e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), aa());
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
    Ct(e, !0, !1);
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
    Io(e);
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
    zo();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Jo();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return xe;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: nt(),
      ...oa()
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
    let r = new Na(e);
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
    return Dr(e, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Tr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(e) {
      e.destroy();
    }), this.components.clear(), kr();
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
    }), kr();
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
      var n = Tr();
      n.forEach(function(r) {
        var i = Dr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        Fn.push(i);
      });
    } else !e && Ue && (Ue = !1, console.log("[LiVue] Debug mode disabled"), Fn.forEach(function(r) {
      r();
    }), Fn = []);
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
const wn = new Ws();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const t = document.createElement("style");
  t.id = "livue-styles", t.textContent = fo, document.head.appendChild(t);
}
var he = window.LiVueConfig || {};
(he.showProgressBar !== void 0 || he.progressBarColor !== void 0 || he.prefetch !== void 0 || he.prefetchOnHover !== void 0 || he.hoverDelay !== void 0 || he.cachePages !== void 0 || he.maxCacheSize !== void 0 || he.restoreScroll !== void 0) && wn.configureNavigation(he);
he.showProgressOnRequest !== void 0 && wn.progress.configure({ showOnRequest: he.showProgressOnRequest });
function fi() {
  wn.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fi) : queueMicrotask(fi);
window.LiVue = wn;
export {
  wn as default
};
//# sourceMappingURL=livue.esm.js.map
