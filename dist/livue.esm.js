import * as jn from "vue";
import { reactive as _e, toRefs as ji, effectScope as Hi, ref as Pt, markRaw as qi, hasInjectionContext as Ro, inject as zi, isRef as gn, isReactive as Fi, toRaw as Vo, getCurrentScope as jo, onScopeDispose as Ho, watch as Se, nextTick as xn, computed as Wi, provide as qo, onBeforeUnmount as zo, onBeforeMount as Fo, onUnmounted as $i, onMounted as Bi, readonly as Wo, watchEffect as $o, shallowRef as Dr, defineComponent as Bo, h as Hr, createApp as Uo } from "vue";
const Jo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Ui(e, t) {
  if (Array.isArray(t)) {
    let n = Object.keys(t), r = !1;
    for (let i = 0; i < n.length; i++)
      if (isNaN(Number(n[i]))) {
        r = !0;
        break;
      }
    if (r) {
      let i = {};
      for (let o = 0; o < n.length; o++)
        i[n[o]] = t[n[o]];
      return i;
    }
  }
  return t;
}
function qr(e) {
  return JSON.stringify(e, Ui);
}
function or(e) {
  return _e(Object.assign({}, e));
}
function Xo(e, t) {
  let n;
  for (n in t) {
    let r = qr(e[n]), i = qr(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function Ji(e) {
  return JSON.parse(JSON.stringify(e, Ui));
}
function Yo(e) {
  return ji(e);
}
function Hn(e, t) {
  if (!t || typeof t != "string")
    return;
  let n = t.split("."), r = e;
  for (let i = 0; i < n.length; i++) {
    if (r == null)
      return;
    r = r[n[i]];
  }
  return r;
}
function Jt(e, t, n) {
  if (!t || typeof t != "string")
    return;
  let r = t.split(".");
  if (r.length === 1) {
    e[r[0]] = n;
    return;
  }
  let i = r[0], o = e[i], a = JSON.parse(JSON.stringify(o ?? {}));
  Array.isArray(a) && isNaN(Number(r[1])) && (a = Object.assign({}, a));
  let l = a;
  for (let u = 1; u < r.length - 1; u++) {
    let d = r[u];
    (l[d] === null || l[d] === void 0) && (l[d] = {}), Array.isArray(l[d]) && u + 1 < r.length && isNaN(Number(r[u + 1])) && (l[d] = Object.assign({}, l[d])), l = l[d];
  }
  let s = r[r.length - 1];
  l[s] = n, e[i] = a;
}
function Xt(e, t) {
  let n = {}, r = Ji(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function Ko(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function ar(e) {
  if (Ko(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(ar);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = ar(e[n]);
    return t;
  }
  return e;
}
function lt(e) {
  let t = {};
  for (let n in e)
    t[n] = ar(e[n]);
  return t;
}
let zr = 0;
function Go() {
  return zr++, zr;
}
let Xi = /* @__PURE__ */ new Map();
function Zo(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function Qo(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Yi(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Xi.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: Zo(n)
    });
  });
}
function Ki(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Xi.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Qo(n, i.inputs));
  });
}
let Gi;
const Nn = (e) => Gi = e, Zi = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function lr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Dt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Dt || (Dt = {}));
function Fr() {
  const e = Hi(!0), t = e.run(() => Pt({}));
  let n = [], r = [];
  const i = qi({
    install(o) {
      Nn(i), i._a = o, o.provide(Zi, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
    },
    use(o) {
      return this._a ? n.push(o) : r.push(o), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return i;
}
const Qi = () => {
};
function Wr(e, t, n, r = Qi) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && jo() && Ho(i), i;
}
function Xe(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const ea = (e) => e(), $r = /* @__PURE__ */ Symbol(), qn = /* @__PURE__ */ Symbol();
function sr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    lr(i) && lr(r) && e.hasOwnProperty(n) && !gn(r) && !Fi(r) ? e[n] = sr(i, r) : e[n] = r;
  }
  return e;
}
const ta = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function na(e) {
  return !lr(e) || !Object.prototype.hasOwnProperty.call(e, ta);
}
const { assign: Oe } = Object;
function ra(e) {
  return !!(gn(e) && e.effect);
}
function ia(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const d = ji(n.state.value[e]);
    return Oe(d, o, Object.keys(a || {}).reduce((f, p) => (f[p] = qi(Wi(() => {
      Nn(n);
      const g = n._s.get(e);
      return a[p].call(g, g);
    })), f), {}));
  }
  return s = eo(e, u, t, n, r, !0), s;
}
function eo(e, t, n = {}, r, i, o) {
  let a;
  const l = Oe({ actions: {} }, n), s = { deep: !0 };
  let u, d, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), g;
  const h = r.state.value[e];
  !o && !h && (r.state.value[e] = {}), Pt({});
  let m;
  function y(M) {
    let k;
    u = d = !1, typeof M == "function" ? (M(r.state.value[e]), k = {
      type: Dt.patchFunction,
      storeId: e,
      events: g
    }) : (sr(r.state.value[e], M), k = {
      type: Dt.patchObject,
      payload: M,
      storeId: e,
      events: g
    });
    const O = m = /* @__PURE__ */ Symbol();
    xn().then(() => {
      m === O && (u = !0);
    }), d = !0, Xe(f, k, r.state.value[e]);
  }
  const C = o ? function() {
    const { state: k } = n, O = k ? k() : {};
    this.$patch((j) => {
      Oe(j, O);
    });
  } : (
    /* istanbul ignore next */
    Qi
  );
  function S() {
    a.stop(), f.clear(), p.clear(), r._s.delete(e);
  }
  const N = (M, k = "") => {
    if ($r in M)
      return M[qn] = k, M;
    const O = function() {
      Nn(r);
      const j = Array.from(arguments), J = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set();
      function $(w) {
        J.add(w);
      }
      function U(w) {
        W.add(w);
      }
      Xe(p, {
        args: j,
        name: O[qn],
        store: E,
        after: $,
        onError: U
      });
      let K;
      try {
        K = M.apply(this && this.$id === e ? this : E, j);
      } catch (w) {
        throw Xe(W, w), w;
      }
      return K instanceof Promise ? K.then((w) => (Xe(J, w), w)).catch((w) => (Xe(W, w), Promise.reject(w))) : (Xe(J, K), K);
    };
    return O[$r] = !0, O[qn] = k, O;
  }, T = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Wr.bind(null, p),
    $patch: y,
    $reset: C,
    $subscribe(M, k = {}) {
      const O = Wr(f, M, k.detached, () => j()), j = a.run(() => Se(() => r.state.value[e], (J) => {
        (k.flush === "sync" ? d : u) && M({
          storeId: e,
          type: Dt.direct,
          events: g
        }, J);
      }, Oe({}, s, k)));
      return O;
    },
    $dispose: S
  }, E = _e(T);
  r._s.set(e, E);
  const I = (r._a && r._a.runWithContext || ea)(() => r._e.run(() => (a = Hi()).run(() => t({ action: N }))));
  for (const M in I) {
    const k = I[M];
    if (gn(k) && !ra(k) || Fi(k))
      o || (h && na(k) && (gn(k) ? k.value = h[M] : sr(k, h[M])), r.state.value[e][M] = k);
    else if (typeof k == "function") {
      const O = N(k, M);
      I[M] = O, l.actions[M] = k;
    }
  }
  return Oe(E, I), Oe(Vo(E), I), Object.defineProperty(E, "$state", {
    get: () => r.state.value[e],
    set: (M) => {
      y((k) => {
        Oe(k, M);
      });
    }
  }), r._p.forEach((M) => {
    Oe(E, a.run(() => M({
      store: E,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), h && o && n.hydrate && n.hydrate(E.$state, h), u = !0, d = !0, E;
}
// @__NO_SIDE_EFFECTS__
function oa(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = Ro();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? zi(Zi, null) : null), a && Nn(a), a = Gi, a._s.has(e) || (i ? eo(e, t, r, a) : ia(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let Rt = /* @__PURE__ */ new Map();
function aa(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function bt(e, t, n) {
  return aa(n) === "global" ? t : e + ":" + t;
}
function to(e) {
  return JSON.parse(JSON.stringify(e));
}
function la(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(to(t));
}
function Cr(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = bt(e, t, r), a = Rt.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ oa(o, n), definition: n }, Rt.set(o, a)), a.useStore(i);
}
function Ue(e, t, n, r) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
  let i = n && n.scope ? n.scope : "auto", o = [];
  i === "component" ? o.push(bt(e, t, { scope: "component" })) : i === "global" ? o.push(bt(e, t, { scope: "global" })) : (o.push(bt(e, t, { scope: "component" })), o.push(bt(e, t, { scope: "global" })));
  for (let a = 0; a < o.length; a++) {
    let l = Rt.get(o[a]);
    if (l)
      return l.useStore(r);
  }
  return null;
}
function sa(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = lt(o.state || {}), s = Ue(e, o.name, { scope: a }, n);
    if (s) {
      la(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return to(l);
      }
    }, d = Cr(e, o.name, u, { scope: a }, n);
    r[o.name] = d;
  }
  return r;
}
function ua(e) {
  let t = e + ":", n = Array.from(Rt.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && Rt.delete(n[r]);
}
let no = {
  ref: Pt,
  computed: Wi,
  watch: Se,
  watchEffect: $o,
  reactive: _e,
  readonly: Wo,
  onMounted: Bi,
  onUnmounted: $i,
  onBeforeMount: Fo,
  onBeforeUnmount: zo,
  nextTick: xn,
  provide: qo,
  inject: zi
}, ur = Object.keys(no), ca = ur.map(function(e) {
  return no[e];
});
function Br(e) {
  let t = /<script\s+type="application\/livue-setup"[^>]*>([\s\S]*?)<\/script>/g, n = Array.from(e.matchAll(t));
  if (n.length === 0)
    return { html: e, setupCode: null };
  function r(s) {
    return s = s.replace(/^<script[^>]*>\s*/i, ""), s = s.replace(/\s*<\/script>$/i, ""), s.trim();
  }
  let i = e;
  for (var o = n.length - 1; o >= 0; o--)
    i = i.replace(n[o][0], "");
  if (n.length === 1)
    return {
      html: i,
      setupCode: r(n[0][1].trim())
    };
  var a = n.map(function(s) {
    return r(s[1].trim());
  }), l = `var __setupResult = {};
` + a.map(function(s) {
    return `Object.assign(__setupResult, (function() {
` + s + `
})() || {});`;
  }).join(`
`) + `
return __setupResult;`;
  return {
    html: i,
    setupCode: l
  };
}
function fa(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(m) {
    return t[m];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(m) {
    return a[m];
  });
  function u(m) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(m);
  }
  function d(m, y, C) {
    let S = n && n.$id ? n.$id : "", N = n && n._pinia ? n._pinia : void 0;
    if (y === void 0) {
      let T = Ue(S, m, C || {}, N);
      if (T)
        return T;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return Cr(S, m, y, C, N);
  }
  function f(m) {
    let y = n && n.$id ? n.$id : "", C = n && n._pinia ? n._pinia : void 0, S = Ue(y, m, { scope: "auto" }, C);
    if (!S)
      throw new Error('[LiVue] useStore("' + m + '"): store not found.');
    return S;
  }
  let p = [], g = [];
  function h(m, y) {
    if (!u(m))
      return;
    let C = p.indexOf(m);
    if (C === -1) {
      p.push(m), g.push(y);
      return;
    }
    g[C] = y;
  }
  for (let m = 0; m < ur.length; m++)
    h(ur[m], ca[m]);
  for (let m = 0; m < i.length; m++)
    h(i[m], o[m]);
  for (let m = 0; m < l.length; m++)
    h(l[m], s[m]);
  h("livue", n), h("store", d), h("useStore", f);
  try {
    let y = new (Function.prototype.bind.apply(
      Function,
      [null].concat(p).concat([e])
    ))().apply(null, g);
    return y && typeof y == "object" ? y : null;
  } catch (m) {
    return console.error("[LiVue] Error executing @script setup code:", m), null;
  }
}
function Ur(e) {
  let t = /v-model\.debounce(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
  e = e.replace(t, function(o, a, l, s) {
    let u = a ? "." + a + (l || "ms") : "";
    return 'v-model="' + s + '" v-debounce:' + s + u;
  });
  let n = /v-model\.throttle(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
  e = e.replace(n, function(o, a, l, s) {
    let u = a ? "." + a + (l || "ms") : "";
    return 'v-model="' + s + '" v-throttle:' + s + u;
  });
  let r = /v-model\.blur=["']([^"']+)["']/g;
  e = e.replace(r, function(o, a) {
    return 'v-model="' + a + '" v-blur:' + a;
  });
  let i = /v-model\.enter=["']([^"']+)["']/g;
  return e = e.replace(i, function(o, a) {
    return 'v-model="' + a + '" v-enter:' + a;
  }), e;
}
function Jr(e) {
  return e.replace(/\$errors\b/g, "lvErrors");
}
function ro(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      ro(e.children[t]);
}
function cr(e, t, n, r, i, o) {
  let a = Ur(e);
  a = Jr(a);
  let l = Br(a), s = jn.compile(l.html), u = Dr(s), d = [], f = !1;
  function p(h, m) {
    let y = u.value;
    f = !0;
    let C;
    try {
      C = y(h, d);
    } finally {
      f = !1;
    }
    return ro(C), C;
  }
  p._rc = !0;
  let g = {
    name: o || "LiVueComponent",
    render: p,
    setup: function() {
      jn.provide("livue", n);
      let h = Yo(t);
      var m = new Proxy(n.errors, {
        get: function(T, E, L) {
          var I = Reflect.get(T, E, L);
          return Array.isArray(I) ? I[0] : I;
        }
      });
      let y = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: m });
      if (l.setupCode) {
        let T = fa(l.setupCode, h, n, r);
        T && Object.assign(y, T);
      }
      var C = {
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
      function N(T) {
        return typeof T == "string" && !C[T] && S.test(T);
      }
      return new Proxy(y, {
        get: function(T, E, L) {
          if (E in T || typeof E == "symbol") return Reflect.get(T, E, L);
          if (N(E)) {
            var I = function() {
              var M = Array.prototype.slice.call(arguments);
              if (f) {
                var k = function() {
                  return n.call(E, ...M);
                };
                return Object.defineProperty(k, "__livueMethodName", {
                  value: E,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), Object.defineProperty(k, "__livueMethodArgs", {
                  value: M,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), k;
              }
              return n.call(E, ...M);
            };
            return Object.defineProperty(I, "__livueMethodName", {
              value: E,
              configurable: !1,
              enumerable: !1,
              writable: !1
            }), I;
          }
        },
        getOwnPropertyDescriptor: function(T, E) {
          var L = Object.getOwnPropertyDescriptor(T, E);
          if (L) return L;
          if (N(E))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(T, E) {
          return !!(E in T || N(E));
        },
        set: function(T, E, L) {
          return T[E] = L, !0;
        },
        ownKeys: function(T) {
          return Reflect.ownKeys(T);
        }
      });
    }
  };
  return g._updateRender = function(h) {
    let m = Ur(h);
    m = Jr(m);
    let y = Br(m), C = jn.compile(y.html);
    C !== u.value && (d.length = 0, u.value = C);
  }, g;
}
let We = null;
function ct() {
  if (We)
    return We;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return We = e.getAttribute("content"), We;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (We = decodeURIComponent(t[1]), We) : null;
}
function da() {
  We = null;
}
let oe = {
  color: "#29d",
  height: "2px",
  showOnRequest: !1,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, se = null, fr = null, pe = null, yn = !1, Ct = 0;
function pa(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function ha(e) {
  return (-1 + e) * 100;
}
function io() {
  if (yn) return;
  yn = !0;
  let e = document.createElement("style");
  e.id = "livue-progress-styles", e.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${oe.height};
            background: ${oe.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${oe.speed}ms ${oe.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${oe.color}, 0 0 5px ${oe.color};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
        }
        .livue-progress-bar.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${oe.speed}ms ${oe.easing};
        }
    `, document.head.appendChild(e);
}
function ma() {
  if (pe) return;
  io(), pe = document.createElement("div"), pe.className = "livue-progress-bar livue-progress-hidden", pe.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(oe.parent) || document.body).appendChild(pe);
}
function va() {
  if (!yn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), yn = !1, io());
}
function ga(e) {
  Object.assign(oe, e), va();
}
function Vt() {
  return oe.showOnRequest;
}
function ya() {
  Ct++, se === null && (ma(), se = 0, pe && pe.classList.remove("livue-progress-hidden"), In(oe.minimum), oe.trickle && (fr = setInterval(function() {
    oo();
  }, oe.trickleSpeed)));
}
function In(e) {
  se !== null && (e = pa(e, oe.minimum, 1), se = e, pe && (pe.style.transform = "translate3d(" + ha(e) + "%, 0, 0)"));
}
function oo() {
  if (se === null || se >= 1) return;
  let e;
  se < 0.2 ? e = 0.1 : se < 0.5 ? e = 0.04 : se < 0.8 ? e = 0.02 : se < 0.99 ? e = 5e-3 : e = 0, In(se + e);
}
function ao() {
  Ct = Math.max(0, Ct - 1), !(Ct > 0) && se !== null && (In(1), clearInterval(fr), fr = null, setTimeout(function() {
    pe && pe.classList.add("livue-progress-hidden"), setTimeout(function() {
      se = null, pe && (pe.style.transform = "translate3d(-100%, 0, 0)");
    }, oe.speed);
  }, oe.speed));
}
function ba() {
  Ct = 0, ao();
}
function wa() {
  return se !== null;
}
function Sa() {
  return se;
}
const je = {
  configure: ga,
  start: ya,
  set: In,
  trickle: oo,
  done: ao,
  forceDone: ba,
  isStarted: wa,
  getStatus: Sa,
  isRequestProgressEnabled: Vt
};
var wt = null, Xr = !1, it = !1, ve = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ce = /* @__PURE__ */ new Map(), Be = /* @__PURE__ */ new Map(), dr = /* @__PURE__ */ new WeakMap(), ln = /* @__PURE__ */ new Map(), Pe = null;
function Ea(e) {
  Object.assign(ve, e), e.progressBarColor && je.configure({ color: e.progressBarColor });
}
function _a(e) {
  wt = e, !Xr && (Xr = !0, Pe = lo(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Pe },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (so(Pe), Pe = t.state.pageKey, qt(t.state.url, !1, !0));
  }), Da());
}
function lo() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function so(e) {
  if (!(!ve.restoreScroll || !e)) {
    ln.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = ln.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, ln.set(e, i);
      }
    });
  }
}
function Aa(e) {
  if (!(!ve.restoreScroll || !e)) {
    var t = ln.get(e);
    t && requestAnimationFrame(function() {
      window.scrollTo(t.x || 0, t.y || 0), Object.keys(t).forEach(function(n) {
        if (n.startsWith("el:")) {
          var r = n.substring(3), i = document.querySelector('[data-livue-scroll="' + r + '"]') || document.getElementById(r);
          i && (i.scrollLeft = t[n].x || 0, i.scrollTop = t[n].y || 0);
        }
      });
    });
  }
}
function Da() {
  document.addEventListener("click", Ca, !0), ve.prefetch && (document.addEventListener("mouseenter", La, !0), document.addEventListener("mouseleave", ka, !0), document.addEventListener("mousedown", Oa, !0), document.addEventListener("focus", xa, !0));
}
function Ca(e) {
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
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), qt(n, !0, !1));
      }
    }
  }
}
function Ta(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function La(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = Ta(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            Mn(r);
          }, ve.hoverDelay);
          dr.set(t, i);
        }
      }
    }
  }
}
function ka(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = dr.get(t);
      n && (clearTimeout(n), dr.delete(t));
    }
  }
}
function Oa(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Mn(n);
    }
  }
}
function xa(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Mn(n);
    }
  }
}
function Mn(e) {
  var t = new URL(e, location.origin).href;
  if (Be.has(t))
    return Be.get(t);
  if (Ce.has(t))
    return Promise.resolve(Ce.get(t).html);
  var n = fetch(t, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return Be.delete(t), r.ok ? r.text().then(function(i) {
      return ve.cachePages && uo(t, i), i;
    }) : null;
  }).catch(function(r) {
    return Be.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Be.set(t, n), n;
}
function uo(e, t) {
  for (var n = new DOMParser(), r = n.parseFromString(t, "text/html"), i = r.querySelector("title"); Ce.size >= ve.maxCacheSize; ) {
    var o = Ce.keys().next().value;
    Ce.delete(o);
  }
  Ce.set(e, {
    html: t,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function Na() {
  Ce.clear();
}
function Tr(e) {
  it || !e || !e.url || (e.navigate ? qt(e.url, !0, !1) : (it = !0, window.location.href = e.url));
}
async function qt(e, t, n) {
  if (!it) {
    if (!wt) {
      window.location.href = e;
      return;
    }
    var r = new URL(e, location.origin).href, i = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: Ce.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(i)) {
      it = !0, n || so(Pe), ve.showProgressBar && je.start();
      try {
        var o, a = Ce.get(r);
        if (a)
          o = a.html;
        else if (Be.has(r))
          o = await Be.get(r);
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
          o = await l.text(), ve.cachePages && uo(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(C) {
              typeof C == "function" && C(u);
            }
          }
        });
        window.dispatchEvent(d);
        var f = Ia(), p = /* @__PURE__ */ new Set();
        f.forEach(function(C) {
          C.livueIds.forEach(function(S) {
            p.add(S);
          });
        }), wt._stopObserver(), wt.destroyExcept(p), f.forEach(function(C) {
          C.element.parentNode && C.element.parentNode.removeChild(C.element);
        });
        var g = u.querySelector("title");
        g && (document.title = g.textContent), document.body.innerHTML = u.body.innerHTML, Ma(f);
        var h = u.querySelector('meta[name="csrf-token"]'), m = document.querySelector('meta[name="csrf-token"]');
        if (h && m && (m.setAttribute("content", h.getAttribute("content")), da()), Pa(u), Ra(u), t && (Pe = lo(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Pe },
          "",
          r
        )), Va(u), wt.rebootPreserving(), n)
          Aa(Pe);
        else if (location.hash) {
          var y = document.querySelector(location.hash);
          y ? y.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (C) {
        console.error("[LiVue] Navigation failed:", C), window.location.href = e;
      } finally {
        it = !1, ve.showProgressBar && je.done();
      }
    }
  }
}
function Ia() {
  var e = /* @__PURE__ */ new Map(), t = document.querySelectorAll("[data-livue-persist]");
  return t.forEach(function(n) {
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
      }), e.set(r, {
        element: n,
        livueIds: i,
        scrollData: a
      });
    }
  }), e;
}
function Ma(e) {
  e.size !== 0 && e.forEach(function(t, n) {
    var r = document.querySelector('[data-livue-persist="' + n + '"]');
    r && (r.parentNode.replaceChild(t.element, r), t.scrollData && requestAnimationFrame(function() {
      Object.keys(t.scrollData).forEach(function(i) {
        var o = t.element.querySelector('[data-livue-scroll="' + i + '"]');
        o && (o.scrollTop = t.scrollData[i].scrollTop, o.scrollLeft = t.scrollData[i].scrollLeft);
      });
    }));
  });
}
function Pa(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Ra(e) {
  var t = document.querySelectorAll("script[data-navigate-track]"), n = e.querySelectorAll("script[data-navigate-track]"), r = {};
  t.forEach(function(o) {
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
function Va(e) {
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
          var i = document.createElement("script");
          Array.from(n.attributes).forEach(function(o) {
            i.setAttribute(o.name, o.value);
          }), n.src || (i.textContent = n.textContent), n.parentNode.replaceChild(i, n);
        }
      }
    }
  });
}
function ja() {
  return it;
}
var Qe = /* @__PURE__ */ new Map(), Ha = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Yr(e, t) {
  return typeof e != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", e), function() {
  }) : typeof t != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (Qe.has(e) || Qe.set(e, /* @__PURE__ */ new Set()), Qe.get(e).add(t), function() {
    var n = Qe.get(e);
    n && (n.delete(t), n.size === 0 && Qe.delete(e));
  });
}
function me(e, t) {
  var n = Qe.get(e);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(t);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + e + '" callback:', i);
    }
  });
}
function co() {
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
function Kr() {
  return Ha.slice();
}
var pr = [], hr = [], jt = !1;
function qa(e) {
  return e.isolate ? Fa(e) : new Promise(function(t, n) {
    pr.push({
      payload: e,
      resolve: t,
      reject: n
    }), jt || (jt = !0, queueMicrotask(fo));
  });
}
function za(e) {
  return new Promise(function(t, n) {
    hr.push({
      payload: e,
      resolve: t,
      reject: n
    }), jt || (jt = !0, queueMicrotask(fo));
  });
}
async function fo() {
  var e = pr, t = hr;
  if (pr = [], hr = [], jt = !1, !(e.length === 0 && t.length === 0)) {
    Vt() && je.start();
    var n = po(), r = ct(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = e.map(function(y) {
      return y.payload;
    }), a = t.map(function(y) {
      return y.payload;
    }), l = {};
    o.length > 0 && (l.updates = o), a.length > 0 && (l.lazyLoads = a), me("request.started", {
      url: n,
      updates: o,
      lazyLoads: a,
      updateCount: e.length,
      lazyCount: t.length
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
        for (var f = 0; f < e.length; f++)
          e[f].reject(d);
        for (var f = 0; f < t.length; f++)
          t[f].reject(d);
        return;
      }
      for (var p = u.responses || [], g = u.lazyResponses || [], f = 0; f < p.length; f++)
        if (p[f] && p[f].redirect) {
          Tr(p[f].redirect);
          return;
        }
      for (var f = 0; f < e.length; f++) {
        var h = p[f];
        if (!h) {
          e[f].reject(new Error("No response for component update at index " + f));
          continue;
        }
        if (h.error) {
          var m = new Error(h.error);
          m.status = h.status || 500, m.data = h, e[f].reject(m);
        } else if (h.errors) {
          var m = new Error("Validation failed");
          m.status = 422, m.data = h, e[f].reject(m);
        } else
          e[f].resolve(h);
      }
      for (var f = 0; f < t.length; f++) {
        var h = g[f];
        if (!h) {
          t[f].reject(new Error("No response for lazy load at index " + f));
          continue;
        }
        if (h.error) {
          var m = new Error(h.error);
          m.status = h.status || 500, m.data = h, t[f].reject(m);
        } else
          t[f].resolve(h);
      }
      me("request.finished", {
        url: n,
        success: !0,
        responses: p,
        lazyResponses: g,
        updateCount: e.length,
        lazyCount: t.length
      });
    } catch (y) {
      for (var f = 0; f < e.length; f++)
        e[f].reject(y);
      for (var f = 0; f < t.length; f++)
        t[f].reject(y);
      me("request.finished", {
        url: n,
        success: !1,
        error: y,
        updateCount: e.length,
        lazyCount: t.length
      });
    } finally {
      Vt() && je.done();
    }
  }
}
async function Fa(e) {
  Vt() && je.start();
  var t = po(), n = ct(), r = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  n && (r["X-CSRF-TOKEN"] = n);
  var i = {
    snapshot: e.snapshot,
    diffs: e.diffs,
    method: e.method,
    params: e.params
  };
  try {
    var o = await fetch(t, {
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
      return Tr(s.redirect), new Promise(function() {
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
    Vt() && je.done();
  }
}
function po() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function zn(e, t, n, r, i) {
  return qa({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
let mr = null, ho = /* @__PURE__ */ new Map();
function Wa() {
  return _e({});
}
function be(e, t) {
  vr(e);
  for (let n in t)
    e[n] = t[n];
}
function vr(e) {
  for (let t in e)
    delete e[t];
}
function $a(e) {
  mr = e;
}
function Ye(e, t, n, r) {
  r = r || {};
  let i = !1;
  return me("error.occurred", {
    error: e,
    componentName: t,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : (mr ? mr(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function Ba(e, t) {
  typeof t == "function" && ho.set(e, t);
}
function gr(e) {
  ho.delete(e);
}
var mo = [];
function x(e, t, n) {
  mo.push({
    name: e,
    directive: t
  });
}
function Ua() {
  return mo;
}
const Ve = /* @__PURE__ */ new Map(), He = /* @__PURE__ */ new Map();
let Gr = !1;
function ft() {
  return typeof window < "u" && window.Echo;
}
function Ja(e, t) {
  if (!ft())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = t + ":" + e;
  if (Ve.has(n))
    return Ve.get(n);
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
  return Ve.set(n, r), r;
}
function vo(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!ft())
    return Gr || (Gr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: f } = o, p = Ja(a, l);
    if (!p) continue;
    const g = l + ":" + a + ":" + s + ":" + e;
    if (He.has(g)) {
      r.push(g);
      continue;
    }
    const h = function(m) {
      try {
        n(u, m);
      } catch (y) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', y);
      }
    };
    if (l === "presence" && d)
      Xa(p, s, h);
    else {
      const m = f ? "." + s : s;
      p.listen(m, h);
    }
    He.set(g, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: h,
      isPresenceEvent: d,
      isCustomEvent: f
    }), r.push(g);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      go(r[i]);
  };
}
function Xa(e, t, n) {
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
function go(e) {
  const t = He.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    He.delete(e), Ya(t.channelKey);
  }
}
function Zr(e) {
  const t = ":" + e, n = [];
  He.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    go(n[r]);
}
function Ya(e) {
  let t = !1;
  if (He.forEach(function(r) {
    r.channelKey === e && (t = !0);
  }), t) return;
  if (Ve.get(e) && ft()) {
    const r = e.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Ve.delete(e);
}
function Qr() {
  He.clear(), Ve.forEach(function(e, t) {
    if (ft()) {
      const n = t.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Ve.clear();
}
function Ka() {
  return {
    echoAvailable: ft(),
    channels: Array.from(Ve.keys()),
    subscriptions: Array.from(He.keys())
  };
}
function Ga() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Ie = /* @__PURE__ */ new Map();
function bn(e, t, n, r) {
  Ie.has(e) || Ie.set(e, /* @__PURE__ */ new Set());
  var i = {
    componentName: t,
    componentId: n,
    handler: r
  };
  return Ie.get(e).add(i), function() {
    var o = Ie.get(e);
    o && (o.delete(i), o.size === 0 && Ie.delete(e));
  };
}
function sn(e, t, n, r, i, o) {
  var a = Ie.get(e);
  a && a.forEach(function(l) {
    var s = !1;
    if (n === "broadcast" ? s = !0 : n === "self" ? s = l.componentId === i : n === "to" && (s = l.componentName === o), s)
      try {
        l.handler(t);
      } catch (u) {
        console.error('[LiVue] Event handler error for "' + e + '":', u);
      }
  });
}
function ei(e) {
  Ie.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Ie.delete(n);
  });
}
function Za(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    sn(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Qa(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function Lr() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function el(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = Lr();
    s.open("POST", u, !0);
    var d = ct();
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
function Fn(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = Lr() + "-remove", n = ct();
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
function tl(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = Lr();
    u.open("POST", d, !0);
    var f = ct();
    f && u.setRequestHeader("X-CSRF-TOKEN", f), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(p) {
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
let Tt = /* @__PURE__ */ new Map(), Lt = /* @__PURE__ */ new Map();
function st(e, t) {
  let n = e + ":debounce:" + t;
  if (!Tt.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let f = i, p = o, g = a;
          i = null, o = null, a = null, Promise.resolve(f()).then(p).catch(g);
        }, t);
      });
    };
    Tt.set(n, l);
  }
  return Tt.get(n);
}
function Ht(e, t) {
  let n = e + ":throttle:" + t;
  if (!Lt.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < t ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    Lt.set(n, i);
  }
  return Lt.get(n);
}
function ti(e) {
  let t = e + ":";
  for (let n of Tt.keys())
    n.startsWith(t) && Tt.delete(n);
  for (let n of Lt.keys())
    n.startsWith(t) && Lt.delete(n);
}
const wn = "livue-tab-sync";
let kr = Date.now() + "-" + Math.random().toString(36).substr(2, 9), Sn = null, Or = /* @__PURE__ */ new Map(), ni = !1;
function yo() {
  ni || (ni = !0, typeof BroadcastChannel < "u" ? (Sn = new BroadcastChannel(wn), Sn.onmessage = nl) : window.addEventListener("storage", rl));
}
function nl(e) {
  let t = e.data;
  t.tabId !== kr && bo(t);
}
function rl(e) {
  if (e.key === wn && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === kr) return;
      bo(t);
    } catch {
    }
}
function bo(e) {
  let t = Or.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function il(e, t) {
  yo(), Or.set(e, t);
}
function ri(e) {
  Or.delete(e);
}
function ol(e, t, n, r) {
  yo();
  let i = {
    tabId: kr,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (Sn)
    Sn.postMessage(i);
  else
    try {
      localStorage.setItem(wn, JSON.stringify(i)), localStorage.removeItem(wn);
    } catch {
    }
}
function al(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const xr = /* @__PURE__ */ new Map();
async function ll(e, t = {}) {
  const {
    onChunk: n = () => {
    },
    onComplete: r = () => {
    },
    onError: i = () => {
    }
  } = t;
  try {
    const o = await fetch("/livue/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/x-ndjson",
        "X-CSRF-TOKEN": ct(),
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        snapshot: e.snapshot,
        diffs: e.diffs || {},
        method: e.method,
        params: e.params || []
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
      for (const g of p)
        if (g.trim())
          try {
            const h = JSON.parse(g);
            if (h.stream)
              sl(h.stream), n(h.stream);
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
function sl(e) {
  const { to: t, content: n, replace: r } = e, i = xr.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function ii(e, t, n = !1) {
  xr.set(e, { el: t, replace: n });
}
function oi(e) {
  xr.delete(e);
}
function ul(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function Nr(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    ul(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = Nr(r) : t[n] = r;
  }
  return t;
}
function cl(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Nr(l), d = {};
    for (let f in s)
      d[f] = /* @__PURE__ */ (function(p, g) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return t(p + "." + g, h);
        };
      })(a, f);
    i[a] = _e(Object.assign({}, u, d));
  }
  return i;
}
function fl(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = Nr(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function dl(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function pl(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function yr(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = Wa(), u = n.name, d = n.vueMethods || {}, f = n.jsonMethods || [], p = n.confirms || {}, g = n.isolate || !1, h = n.urlParams || null, m = n.uploads || null, y = n.tabSync || null, C = !1, S = i, N = o, T = a.initialHtml || null, E = _e({}), L = [];
  function I() {
    for (let c = 0; c < L.length; c++)
      try {
        L[c]();
      } catch {
      }
    L = [];
  }
  function M(c) {
    if (I(), !!Array.isArray(c))
      for (let b = 0; b < c.length; b++) {
        let _ = c[b];
        if (!_ || typeof _ != "object" || !_.bridge || typeof _.bridge != "object") continue;
        let D = Ue(e, _.name, { scope: _.scope || "auto" }, l);
        if (!D) continue;
        let v = _.bridge;
        for (let H in v) {
          let X = v[H];
          if (!X || typeof X != "object") continue;
          let B = X.prop, Q = X.mode || "two-way";
          if (!(!B || !(B in t))) {
            if (Q === "two-way" || Q === "store-to-state") {
              let G = Se(function() {
                return D[H];
              }, function(qe) {
                t[B] !== qe && (t[B] = qe);
              });
              L.push(G);
            }
            if (Q === "two-way" || Q === "state-to-store") {
              let G = Se(function() {
                return t[B];
              }, function(qe) {
                D[H] !== qe && (D[H] = qe);
              });
              L.push(G);
            }
          }
        }
      }
  }
  function k(c) {
    let b = sa(e, c, l);
    for (let _ in b)
      E[_] = b[_];
    M(c);
  }
  k(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    I(), ua(e);
  });
  function O(c) {
    let b = document.querySelector('meta[name="livue-prefix"]'), D = "/" + (b ? b.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(c.token), v = document.createElement("a");
    v.href = D, v.download = c.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function j() {
    let c = Xt(S, t);
    return {
      snapshot: N,
      diffs: c
    };
  }
  function J(c, b) {
    if (c.redirect) {
      Tr(c.redirect);
      return;
    }
    if (c.errorBoundary) {
      let v = c.errorBoundary;
      w.errorState.hasError = v.hasError, w.errorState.errorMessage = v.errorMessage, w.errorState.errorDetails = v.errorDetails, w.errorState.recover = v.recover, (!v.errorHandled || !v.recover) && me("error.occurred", {
        error: new Error(v.errorMessage || "Component error"),
        componentName: u,
        componentId: e,
        context: { method: v.errorMethod, serverHandled: v.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (c.download && O(c.download), c.snapshot) {
      let v = JSON.parse(c.snapshot);
      if (v.state) {
        let H = lt(v.state);
        Xo(t, H), S = JSON.parse(JSON.stringify(H));
      }
      N = c.snapshot, v.memo && (v.memo.errors ? be(w.errors, v.memo.errors) : vr(w.errors), v.memo.vueMethods && (d = v.memo.vueMethods), v.memo.jsonMethods && (f = v.memo.jsonMethods), v.memo.urlParams && (h = v.memo.urlParams), v.memo.uploads && (m = v.memo.uploads), v.memo.confirms && (p = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && fl(U, v.memo), v.memo.stores && k(v.memo.stores));
    }
    if (h && Qa(h, t), (c.html || c.fragments) && r && r._updateTemplate) {
      let v = {};
      if (c.snapshot) {
        let H = JSON.parse(c.snapshot);
        H.memo && (H.memo.transitionType && (v.transitionType = H.memo.transitionType), H.memo.skipTransition && (v.skipTransition = !0));
      }
      if (c.fragments) {
        let H = T || (a.el ? a.el.innerHTML : null);
        if (H) {
          let X = pl(H, c.fragments);
          T = X, r._updateTemplate(X, v);
        }
      } else
        T = c.html, r._updateTemplate(c.html, v);
    }
    if (c.events && c.events.length > 0) {
      for (var _ = 0; _ < c.events.length; _++)
        c.events[_].sourceId = e;
      Za(c.events);
    }
    if (c.js && c.js.length > 0)
      for (var D = 0; D < c.js.length; D++)
        try {
          new Function("state", "livue", c.js[D])(t, w);
        } catch (v) {
          console.error("[LiVue] Error executing ->vue() JS:", v);
        }
    if (c.benchmark && me("benchmark.received", {
      componentId: e,
      componentName: u,
      timings: c.benchmark
    }), y && y.enabled && c.snapshot && !C && JSON.parse(c.snapshot).state) {
      let H = Ji(t), X = [];
      for (let B in H)
        (!b || !(B in b)) && X.push(B);
      if (X.length > 0) {
        let B = al(H, X, y);
        Object.keys(B).length > 0 && ol(u, B, X, y);
      }
    }
    if (C = !1, c.jsonResult !== void 0)
      return c.jsonResult;
  }
  let W = _e({}), $ = {}, U = {}, K = function(c, b) {
    return w.call(c, b);
  };
  dl(n) && (U = cl(n, K));
  let w = _e({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: W,
    refs: {},
    stores: E,
    _pinia: l,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(c) {
      let b = Xt(S, t);
      return c === void 0 ? Object.keys(b).length > 0 : c in b;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let c = Xt(S, t);
      return new Set(Object.keys(c));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(c) {
      return c === void 0 ? JSON.parse(JSON.stringify(S)) : S[c] !== void 0 ? JSON.parse(JSON.stringify(S[c])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(c) {
      c in S && (t[c] = JSON.parse(JSON.stringify(S[c])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let c in S)
        c in t && (t[c] = JSON.parse(JSON.stringify(S[c])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(c) {
      return c ? W[c] || !1 : w.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(c) {
      let b = c ? W[c] || !1 : w.loading;
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
    call: async function(c, b, _) {
      let D, v = null;
      if (arguments.length === 1 ? D = [] : arguments.length === 2 ? Array.isArray(b) ? D = b : D = [b] : arguments.length >= 3 && (Array.isArray(b) && _ && typeof _ == "object" && (_.debounce || _.throttle) ? (D = b, v = _) : D = Array.prototype.slice.call(arguments, 1)), $[c])
        return $[c](w, D);
      if (d[c]) {
        try {
          new Function("state", "livue", d[c])(t, w);
        } catch (B) {
          console.error('[LiVue] Error executing #[Vue] method "' + c + '":', B);
        }
        return;
      }
      let H = f.includes(c), X = async function() {
        if (p[c] && !await w._showConfirm(p[c]))
          return;
        w.loading = !0, w.processing = c, W[c] = !0;
        let B;
        try {
          let Q = j(), G = await zn(Q.snapshot, c, D, Q.diffs, g || H);
          B = J(G, Q.diffs);
        } catch (Q) {
          if (H)
            throw { status: Q.status, errors: Q.data && Q.data.errors, message: Q.message };
          Q.status === 422 && Q.data && Q.data.errors ? be(w.errors, Q.data.errors) : Ye(Q, u);
        } finally {
          w.loading = !1, w.processing = null, delete W[c];
        }
        return B;
      };
      return v && v.debounce ? st(e + ":" + c, v.debounce)(X) : v && v.throttle ? Ht(e + ":" + c, v.throttle)(X) : X();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(c, b) {
      let _ = Array.prototype.slice.call(arguments, 2), D = { message: b || "Are you sure?" };
      if (await w._showConfirm(D))
        return w.call.apply(w, [c].concat(_));
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
    set: function(c, b) {
      t[c] = b;
    },
    /**
     * Quick Pinia store helper.
     *
     * Defaults to component-scoped IDs (`<componentId>:<name>`) so stores
     * created while iterating inside templates don't collide globally.
     *
     * @param {string} name
     * @param {object|Function} [definition]
     * @param {object} [options] - { scope?: 'component'|'global' }
     * @returns {object}
     */
    store: function(c, b, _) {
      if (b === void 0) {
        let D = Ue(e, c, _ || { scope: "auto" }, l);
        if (D)
          return D;
        throw new Error('[LiVue] store("' + c + '"): store not found. Provide a definition or register it in PHP.');
      }
      return Cr(e, c, b, _, l);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(c) {
      let b = Ue(e, c, { scope: "auto" }, l);
      if (b)
        return E[c] = b, b;
      throw new Error('[LiVue] useStore("' + c + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(c) {
      let b = Ue(e, c, { scope: "global" }, l);
      if (b)
        return E[c] = b, b;
      throw new Error('[LiVue] useGlobalStore("' + c + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      w.loading = !0, w.processing = "$sync";
      try {
        let c = j(), b = await zn(c.snapshot, null, [], c.diffs, g);
        J(b, c.diffs);
      } catch (c) {
        c.status === 422 && c.data && c.data.errors ? be(w.errors, c.data.errors) : Ye(c, u);
      } finally {
        w.loading = !1, w.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      vr(w.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(c, b) {
      sn(c, b, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(c, b, _) {
      sn(b, _, "to", u, e, c);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(c, b) {
      sn(c, b, "self", u, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(c) {
      qt(c, !0);
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
    upload: async function(c, b) {
      if (!m || !m[c]) {
        console.error('[LiVue] Property "' + c + '" is not configured for uploads.');
        return;
      }
      var _ = Hn(t, c);
      _ && _.__livue_upload && _.ref && Fn([_.ref]), w.uploading = !0, w.uploadProgress = 0;
      try {
        var D = await el(b, u, c, m[c].token, function(v) {
          w.uploadProgress = v;
        });
        Jt(t, c, {
          __livue_upload: !0,
          ref: D.ref,
          originalName: D.originalName,
          mimeType: D.mimeType,
          size: D.size,
          previewUrl: D.previewUrl
        });
      } catch (v) {
        v.status === 422 && v.data && v.data.errors ? be(w.errors, v.data.errors) : Ye(v, u);
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
    uploadMultiple: async function(c, b) {
      if (!m || !m[c]) {
        console.error('[LiVue] Property "' + c + '" is not configured for uploads.');
        return;
      }
      w.uploading = !0, w.uploadProgress = 0;
      try {
        var _ = await tl(b, u, c, m[c].token, function(G) {
          w.uploadProgress = G.overall;
        }), D = _.results || [], v = _.errors || [], H = Hn(t, c), X = Array.isArray(H) ? H : [];
        if (D.length > 0) {
          var B = D.map(function(G) {
            return {
              __livue_upload: !0,
              ref: G.ref,
              originalName: G.originalName,
              mimeType: G.mimeType,
              size: G.size,
              previewUrl: G.previewUrl
            };
          });
          Jt(t, c, X.concat(B));
        }
        if (v.length > 0) {
          var Q = {};
          v.forEach(function(G) {
            var qe = c + "." + G.index;
            Q[qe] = {
              file: G.file,
              message: G.error
            };
          }), be(w.errors, Q);
        }
      } catch (G) {
        G.status === 422 && G.data && G.data.errors ? be(w.errors, G.data.errors) : Ye(G, u);
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
    removeUpload: function(c, b) {
      var _ = Hn(t, c);
      if (b !== void 0 && Array.isArray(_)) {
        var D = _[b];
        D && D.__livue_upload && D.ref && Fn([D.ref]), _.splice(b, 1), Jt(t, c, _.slice());
      } else
        _ && _.__livue_upload && _.ref && Fn([_.ref]), Jt(t, c, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(c, b) {
      b = b || [], w.loading = !0, w.streaming = !0, w.processing = c, w.streamingMethod = c, W[c] = !0;
      let _;
      try {
        let D = j();
        D.method = c, D.params = b, D.componentId = e;
        let v = await ll(D, {
          onChunk: function(H) {
          },
          onComplete: function(H) {
          },
          onError: function(H) {
            console.error("[LiVue Stream] Error:", H);
          }
        });
        v && (_ = J(v, D.diffs));
      } catch (D) {
        D.status === 422 && D.data && D.data.errors ? be(w.errors, D.data.errors) : Ye(D, u);
      } finally {
        w.loading = !1, w.streaming = !1, w.processing = null, w.streamingMethod = null, delete W[c];
      }
      return _;
    },
    /**
     * Toggle a boolean property.
     * @param {string} property - Property name to toggle
     */
    toggle: function(c) {
      c in t && (t[c] = !t[c]);
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
    watch: function(c, b) {
      return typeof b != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Se(
        function() {
          return t[c];
        },
        function(_, D) {
          b(_, D);
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
      return u;
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
      }) : (Ba(e, c), function() {
        gr(e);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: _e({
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
    _updateServerState: function(c, b) {
      S = JSON.parse(JSON.stringify(c)), N = b;
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
      let c = Xt(S, t), b = {};
      for (let _ in U) {
        let D = U[_], v = {}, H = [];
        for (let X in D)
          if (typeof D[X] == "function")
            H.push(X);
          else
            try {
              v[X] = JSON.parse(JSON.stringify(D[X]));
            } catch {
              v[X] = "[Unserializable]";
            }
        b[_] = { data: v, actions: H };
      }
      return {
        serverState: JSON.parse(JSON.stringify(S)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(c),
        diffs: c,
        memo: {
          name: u,
          isolate: g,
          urlParams: h,
          tabSync: y,
          hasUploads: !!m,
          uploadProps: m ? Object.keys(m) : [],
          vueMethods: Object.keys(d),
          confirmMethods: Object.keys(p),
          composableNames: Object.keys(U)
        },
        composables: b,
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
  for (let c in U)
    w[c] = U[c];
  async function re() {
    w.loading = !0, w.processing = "$refresh", W.$refresh = !0;
    try {
      let c = j(), b = await zn(c.snapshot, null, [], c.diffs, g);
      return J(b, c.diffs);
    } catch (c) {
      c.status === 422 && c.data && c.data.errors ? be(w.errors, c.data.errors) : Ye(c, u);
    } finally {
      w.loading = !1, w.processing = null, delete W.$refresh;
    }
  }
  $.$refresh = function() {
    return re();
  }, y && y.enabled && il(u, function(c, b, _) {
    let D = !1;
    if (_.reactive === !0)
      D = !0;
    else if (Array.isArray(_.reactive) && _.reactive.length > 0) {
      for (let v in c)
        if (_.reactive.includes(v)) {
          D = !0;
          break;
        }
    }
    if (D) {
      for (let v in c)
        _.only && !_.only.includes(v) || _.except && _.except.includes(v) || v in t && (t[v] = c[v]);
      C = !0, w.sync();
      return;
    }
    for (let v in c)
      _.only && !_.only.includes(v) || _.except && _.except.includes(v) || v in t && (t[v] = c[v]);
    for (let v in c)
      _.only && !_.only.includes(v) || _.except && _.except.includes(v) || (S[v] = JSON.parse(JSON.stringify(c[v])));
  });
  var dt = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(w, {
    get: function(c, b, _) {
      if (b in c || typeof b == "symbol")
        return Reflect.get(c, b, _);
      if (typeof b == "string" && b.startsWith("$") && $[b])
        return function() {
          var D = Array.prototype.slice.call(arguments);
          return $[b](w, D);
        };
      if (typeof b == "string" && !b.startsWith("$") && !dt[b])
        return function() {
          var D = Array.prototype.slice.call(arguments);
          return w.call(b, ...D);
        };
    },
    set: function(c, b, _, D) {
      return Reflect.set(c, b, _, D);
    },
    has: function(c, b) {
      return typeof b == "string" && b.startsWith("$") && $[b] ? !0 : Reflect.has(c, b);
    }
  }), composables: U };
}
function En(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
function un(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", f = JSON.parse(d), p = f.memo ? f.memo.name : "", g = lt(f.state || {}), h = f.memo || {}, m = s.innerHTML, y = s.tagName.toLowerCase(), C = s.nextElementSibling;
    for (; C; ) {
      let O = C.nextElementSibling;
      if (C.tagName === "SCRIPT" && C.getAttribute("type") === "application/livue-setup")
        m += C.outerHTML, C.parentNode.removeChild(C);
      else
        break;
      C = O;
    }
    let S = t._childRegistry[u];
    if (!S)
      for (let O in t._childRegistry) {
        let j = t._childRegistry[O];
        if (j.name === p && !o[O]) {
          S = j;
          break;
        }
      }
    if (S) {
      o[S.id] = !0, S.rootTag = y;
      let O = h.reactive || [];
      if (O.length > 0) {
        for (var N = 0; N < O.length; N++) {
          var T = O[N];
          T in g && (S.state[T] = g[T]);
        }
        S.livue._updateServerState(g, d), S.componentRef && S.componentRef._updateTemplate && S.componentRef._updateTemplate(m);
      }
    }
    let E = !S;
    if (!S) {
      let j = "livue-child-" + Go();
      t._versions[j] = 0;
      let J = or(g), W = JSON.parse(JSON.stringify(g)), $ = Object.assign({ name: h.name || p }, h), U = { _updateTemplate: null }, K = co(), w = yr(u, J, $, U, W, d, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: K,
        pinia: t._pinia || null
      }), re = w.livue, dt = w.composables;
      me("component.init", {
        component: { id: u, name: p, state: J, livue: re },
        el: s,
        cleanup: K.cleanup,
        isChild: !0
      });
      let Ut = h.errors || null;
      Ut && be(re.errors, Ut), S = {
        tagName: j,
        state: J,
        memo: $,
        livue: re,
        composables: dt,
        componentRef: U,
        name: p,
        id: u,
        rootTag: y
      };
      let c = h.listeners || null;
      if (c)
        for (let _ in c)
          (function(D, v) {
            bn(_, p, u, function(H) {
              v.call(D, H);
            });
          })(c[_], re);
      let b = h.echo || null;
      b && b.length && (function(_, D) {
        vo(_, b, function(v, H) {
          D.call(v, H);
        });
      })(u, re), U._updateTemplate = function(_) {
        let D = t.el.querySelector('[data-livue-id="' + u + '"]');
        D && Yi(D);
        let v = un(_, t), H = En(
          "<" + S.rootTag + ">" + v.template + "</" + S.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let B in v.childDefs)
          t.vueApp._context.components[B] || t.vueApp.component(B, v.childDefs[B]);
        t.vueApp._context.components[S.tagName]._updateRender(H), xn(function() {
          let B = t.el.querySelector('[data-livue-id="' + u + '"]');
          B && Ki(B);
        });
      }, t._childRegistry[u] = S;
    }
    let L = S.tagName, I = s.dataset.livueRef;
    I && t._rootLivue && (t._rootLivue.refs[I] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(O, j) {
        return S.livue.call(O, j || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(O, j) {
        return S.livue.set(O, j);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(O, j) {
        return S.livue.dispatch(O, j);
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
    let M = s.dataset.livueModel;
    if (M && t._rootState && bn("$modelUpdate", S.name, u, function(O) {
      O && O.value !== void 0 && (t._rootState[M] = O.value);
    }), E) {
      let O = En(
        "<" + y + ">" + m + "</" + y + ">",
        'data-livue-id="' + u + '"'
      );
      i[L] = cr(
        O,
        S.state,
        S.livue,
        S.composables || {},
        t._versions,
        S.name
      );
    }
    t._versions[L] === void 0 && (t._versions[L] = 0);
    let k = document.createElement(L);
    k.setAttribute(":key", "livueV['" + L + "']"), s.parentNode.replaceChild(k, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let ai = 0;
function br() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Wn = /* @__PURE__ */ new WeakMap();
function li() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const hl = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (ai++, r = "livue-transition-" + ai), Wn.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), br() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    li();
  },
  updated(e, t) {
    let n = Wn.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), br() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    Wn.delete(e), e.removeAttribute("data-livue-transition"), li();
  }
};
function ml(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function vl(e) {
  var t = document.activeElement;
  return !t || !e.contains(t) ? null : {
    id: t.id || null,
    name: t.getAttribute("name") || null,
    tagName: t.tagName,
    type: t.type || null,
    placeholder: t.getAttribute("placeholder") || null,
    ariaLabel: t.getAttribute("aria-label") || null,
    selectionStart: t.selectionStart !== void 0 ? t.selectionStart : null,
    selectionEnd: t.selectionEnd !== void 0 ? t.selectionEnd : null,
    scrollTop: t.scrollTop
  };
}
function gl(e, t) {
  if (t) {
    var n = null;
    if (t.id && (n = e.querySelector("#" + CSS.escape(t.id))), !n && t.name && (n = e.querySelector('[name="' + t.name + '"]')), !n && t.tagName === "INPUT" && t.placeholder) {
      var r = "input";
      t.type && (r += '[type="' + t.type + '"]'), r += '[placeholder="' + CSS.escape(t.placeholder) + '"]', n = e.querySelector(r);
    }
    if (!n && t.tagName === "INPUT" && t.ariaLabel) {
      var r = "input";
      t.type && (r += '[type="' + t.type + '"]'), r += '[aria-label="' + CSS.escape(t.ariaLabel) + '"]', n = e.querySelector(r);
    }
    if (!n && t.tagName === "INPUT" && t.type) {
      var i = e.querySelectorAll('input[type="' + t.type + '"]');
      i.length === 1 && (n = i[0]);
    }
    if (!n && t.tagName === "TEXTAREA") {
      var i = e.querySelectorAll("textarea");
      i.length === 1 && (n = i[0]);
    }
    if (!n && t.tagName === "SELECT") {
      var i = e.querySelectorAll("select");
      i.length === 1 && (n = i[0]);
    }
    if (n && typeof n.focus == "function") {
      if (n.focus(), t.selectionStart !== null && typeof n.setSelectionRange == "function")
        try {
          n.setSelectionRange(t.selectionStart, t.selectionEnd);
        } catch {
        }
      n.scrollTop = t.scrollTop;
    }
  }
}
let $n = 0;
function yl(e) {
  return Bo({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = Pt(!1), i = Dr(null), o = null, a = Pt(null);
      async function l() {
        if (!r.value)
          try {
            let u = await za({
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
        $n++;
        let f = "lazy-" + $n + "-" + Date.now(), p = d.memo ? d.memo.name : "", g = lt(d.state || {}), h = d.memo || {}, { createLivueHelper: m, buildComponentDef: y, processTemplate: C, createReactiveState: S } = e._lazyHelpers, N = S(g), T = JSON.parse(JSON.stringify(g)), E = { _updateTemplate: null }, L = m(
          f,
          N,
          h,
          E,
          T,
          u.snapshot,
          {
            rootComponent: e,
            isChild: !0,
            parentLivue: e._rootLivue || null,
            pinia: e._pinia || null
          }
        ), I = L.livue, M = L.composables;
        h.errors && be(I.errors, h.errors);
        let k = "livue-lazy-child-" + $n, O = C(u.html, e), j = En(
          O.template,
          'data-livue-id="' + f + '"'
        ), J = y(
          j,
          N,
          I,
          M,
          e._versions,
          p
        );
        e._childRegistry[f] = {
          tagName: k,
          state: N,
          memo: h,
          livue: I,
          componentRef: E,
          name: p,
          id: f
        }, E._updateTemplate = function($) {
          let U = C($, e), K = En(
            U.template,
            'data-livue-id="' + f + '"'
          );
          for (let re in U.childDefs)
            e.vueApp._context.components[re] || e.vueApp.component(re, U.childDefs[re]);
          let w = y(
            K,
            N,
            I,
            M,
            e._versions,
            p
          );
          e.vueApp._context.components[k] = w, e._versions[k] = (e._versions[k] || 0) + 1, i.value = w;
        };
        let W = h.listeners || null;
        if (W)
          for (let $ in W)
            (function(U, K) {
              bn($, p, f, function(w) {
                K.call(U, w);
              });
            })(W[$], I);
        for (let $ in O.childDefs)
          e.vueApp._context.components[$] || e.vueApp.component($, O.childDefs[$]);
        e._versions[k] = 0, e.vueApp._context.components[k] || e.vueApp.component(k, J), i.value = J, r.value = !0;
      }
      return Bi(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), $i(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? Hr(i.value) : Hr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class bl {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(t) {
    this.el = t, this.componentId = t.dataset.livueId;
    let n = t.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = or(lt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = _e({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: yr,
      buildComponentDef: cr,
      processTemplate: un,
      createReactiveState: or
    }, this._mount(r, n);
  }
  /**
   * Mount the Vue app shell. The root component is rendered via
   * <component :is> so its template can be swapped independently
   * without unmounting the Vue app.
   */
  _mount(t, n) {
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
      _updateTemplate: function(m, y) {
        y = y || {}, me("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: m
        });
        var C = vl(r.el);
        Yi(r.el);
        let S = un(m, r);
        if (!r.vueApp) return;
        for (let T in S.childDefs)
          r.vueApp._context.components[T] || r.vueApp.component(T, S.childDefs[T]);
        function N() {
          r._currentRootDef._updateRender(S.template), xn(function() {
            Ki(r.el), gl(r.el, C), me("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (y.skipTransition) {
          N();
          return;
        }
        br() ? ml(N, { type: y.transitionType }) : N();
      }
    }, o = JSON.parse(JSON.stringify(lt(t.state || {})));
    this._cleanups = co(), this._pinia = Fr();
    let a = yr(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups,
      initialHtml: this.el.innerHTML,
      pinia: this._pinia
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, me("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u = un(this.el.innerHTML, this), d = t.memo && t.memo.errors || null;
    d && be(l.errors, d);
    let f = t.memo && t.memo.listeners || null;
    if (f)
      for (let m in f)
        (function(y, C, S, N) {
          bn(m, S, N, function(T) {
            C.call(y, T);
          });
        })(f[m], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = vo(r.componentId, p, function(m, y) {
      l.call(m, y);
    }));
    let g = cr(u.template, r.state, l, s, r._versions, r.name);
    this._currentRootDef = g, this._rootDefRef = Dr(g), this.vueApp = Uo({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", yl(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = this._pinia || Fr();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Ua();
    for (let o = 0; o < i.length; o++)
      n.directive(i[o].name, i[o].directive);
    t.el.innerHTML = "", t.vueApp.mount(t.el);
  }
  /**
   * Destroy the Vue app instance and clean up event listeners.
   */
  destroy() {
    for (let t in this._childRegistry) {
      let n = this._childRegistry[t];
      me("component.destroy", {
        component: { id: t, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), ei(t), ti(t), gr(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && ri(n.name), Zr(t);
    }
    if (me("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), ei(this.componentId), ti(this.componentId), gr(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && ri(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Zr(this.componentId), this.vueApp) {
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
    let t = this.el.nextElementSibling;
    for (; t; ) {
      let n = t.nextElementSibling;
      if (t.tagName === "SCRIPT" && t.getAttribute("type") === "application/livue-setup")
        this.el.appendChild(t);
      else
        break;
      t = n;
    }
  }
}
function Ee(e) {
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
let si = /* @__PURE__ */ new Set();
const wl = {
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-init: livue helper not found in component context");
      return;
    }
    let i = e.closest("[data-livue-id]"), o = i ? i.dataset.livueId : null, a = t.value, l, s = [];
    if (Array.isArray(a) ? (l = a[0], s = a[1] || []) : l = a, typeof l != "string") {
      console.warn("[LiVue] v-init: expected method name (string), got", typeof l);
      return;
    }
    let u = (o || "unknown") + ":" + l;
    si.has(u) || (si.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Bn = /* @__PURE__ */ new WeakMap(), Sl = {
  mounted(e, t, n) {
    e.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + e.tagName.toLowerCase() + ">");
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-submit: livue helper not found in component context");
      return;
    }
    let i = t.value, o, a = [];
    if (Array.isArray(i) ? (o = i[0], a = i[1] || []) : o = i, typeof o != "string") {
      console.warn("[LiVue] v-submit: expected method name (string), got", typeof o);
      return;
    }
    let l = function(s) {
      s.preventDefault(), r.call(o, a);
    };
    e.addEventListener("submit", l), Bn.set(e, l);
  },
  unmounted(e) {
    let t = Bn.get(e);
    t && (e.removeEventListener("submit", t), Bn.delete(e));
  }
}, Yt = /* @__PURE__ */ new WeakMap(), El = {
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-intersect: livue helper not found in component context");
      return;
    }
    let i = t.value, o, a = [];
    if (Array.isArray(i) ? (o = i[0], a = i[1] || []) : o = i, typeof o != "string") {
      console.warn("[LiVue] v-intersect: expected method name (string), got", typeof o);
      return;
    }
    let l = t.modifiers || {}, s = t.arg, u = 0;
    l.half && (u = 0.5), l.full && (u = 1);
    let d = "0px";
    if (s) {
      let h = parseInt(s, 10);
      isNaN(h) || (d = h + "px");
    }
    let f = l.leave === !0, p = !1, g = new IntersectionObserver(
      function(h) {
        let m = h[0];
        (f ? !m.isIntersecting : m.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (g.disconnect(), Yt.delete(e)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    g.observe(e), Yt.set(e, g);
  },
  unmounted(e) {
    let t = Yt.get(e);
    t && (t.disconnect(), Yt.delete(e));
  }
};
var _n = /* @__PURE__ */ new Set(), tt = /* @__PURE__ */ new WeakMap(), ui = !1;
function ot(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function _l(e, t) {
  var n = window.location.pathname, r;
  try {
    r = new URL(e, window.location.origin).pathname;
  } catch {
    return !1;
  }
  if (t.strict)
    return n === r;
  if (t.exact) {
    var i = n.replace(/\/$/, "") || "/", o = r.replace(/\/$/, "") || "/";
    return i === o;
  }
  var o = r.replace(/\/$/, "") || "/";
  return o === "/" ? n === "/" : n === o || n.startsWith(o + "/");
}
function wr(e) {
  var t = tt.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = _l(n, i);
      if (typeof r == "object" && r !== null) {
        var a = r.active ? ot(r.active) : [], l = r.inactive ? ot(r.inactive) : [];
        o ? (l.forEach(function(u) {
          e.classList.remove(u);
        }), a.forEach(function(u) {
          e.classList.add(u);
        }), e.setAttribute("data-current", ""), e.setAttribute("aria-current", "page")) : (a.forEach(function(u) {
          e.classList.remove(u);
        }), l.forEach(function(u) {
          e.classList.add(u);
        }), e.removeAttribute("data-current"), e.removeAttribute("aria-current"));
      } else if (typeof r == "string") {
        var s = ot(r);
        o ? (s.forEach(function(u) {
          e.classList.add(u);
        }), e.setAttribute("data-current", ""), e.setAttribute("aria-current", "page")) : (s.forEach(function(u) {
          e.classList.remove(u);
        }), e.removeAttribute("data-current"), e.removeAttribute("aria-current"));
      }
    }
  }
}
function ci() {
  _n.forEach(function(e) {
    e.isConnected ? wr(e) : (_n.delete(e), tt.delete(e));
  });
}
function Al() {
  ui || (ui = !0, window.addEventListener("popstate", ci), window.addEventListener("livue:navigated", ci));
}
const Dl = {
  mounted(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), _n.add(e), Al(), wr(e);
  },
  updated(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), wr(e);
  },
  unmounted(e) {
    var t = tt.get(e);
    if (t) {
      var n = t.value;
      if (typeof n == "object" && n !== null) {
        var r = n.active ? ot(n.active) : [], i = n.inactive ? ot(n.inactive) : [];
        r.forEach(function(o) {
          e.classList.remove(o);
        }), i.forEach(function(o) {
          e.classList.remove(o);
        });
      } else typeof n == "string" && ot(n).forEach(function(o) {
        e.classList.remove(o);
      });
    }
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), _n.delete(e), tt.delete(e);
  }
};
let fi = 0;
const Cl = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    fi++;
    let n = "livue-ignore-" + fi;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, pt = /* @__PURE__ */ new WeakMap();
let di = 0;
function Tl(e) {
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
function Ll(e) {
  let t = 0, n = 0, r = !1, i = !1, o = 0;
  for (let a in e) {
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
      t = parseInt(l[1], 10);
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
  return r && o > 0 && (t = o), i && o > 0 && (n = o), r && t === 0 && (t = 150), i && n === 0 && (n = 150), { debounceMs: t, throttleMs: n };
}
function Kt(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function pi(e, t) {
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
function kl(e) {
  return !!e.component;
}
const Ol = {
  mounted(e, t, n) {
    let r = Tl(n);
    if (!r) {
      console.warn("[LiVue] v-model-livue: livue helper not found in component context");
      return;
    }
    let { livue: i, state: o } = r, a = t.arg;
    if (!a) {
      console.warn("[LiVue] v-model-livue requires property name as argument (v-model-livue:propertyName)");
      return;
    }
    let l = t.modifiers || {};
    di++;
    let s = "model-" + di, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: f } = Ll(l);
    l.live && !d && !f && (d = 150);
    function p(E) {
      if (l.number) {
        let L = Number(E);
        E = isNaN(L) ? 0 : L;
      }
      l.boolean && (E = !!E && E !== "false" && E !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = E : o[a] = E;
    }
    function g(E) {
      d > 0 ? st(s, d)(function() {
        p(E);
      }) : f > 0 ? Ht(s, f)(function() {
        p(E);
      }) : p(E);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let m = kl(n), y = n.component, C = null, S = null, N = null, T = null;
    if (m && y)
      T = y.emit, y.emit = function(E, ...L) {
        if (E === "update:modelValue") {
          let I = L[0];
          g(I);
          return;
        }
        return T.call(y, E, ...L);
      }, y.props && "modelValue" in y.props && (N = Se(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(E) {
          y.vnode && y.vnode.props && (y.vnode.props.modelValue = E), y.exposed && typeof y.exposed.setValue == "function" && y.exposed.setValue(E), y.update && y.update();
        },
        { immediate: !0 }
      )), pt.set(e, {
        isComponent: !0,
        componentInstance: y,
        originalEmit: T,
        stopWatcher: N,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let E = st(s, d);
        C = function(L) {
          let I = Kt(L.target);
          E(function() {
            p(I);
          });
        };
      } else if (f > 0) {
        let E = Ht(s, f);
        C = function(L) {
          let I = Kt(L.target);
          E(function() {
            p(I);
          });
        };
      } else
        C = function(E) {
          p(Kt(E.target));
        };
      l.enter ? (S = function(E) {
        E.key === "Enter" && p(Kt(E.target));
      }, e.addEventListener("keyup", S)) : e.addEventListener(u, C), pi(e, h), pt.set(e, {
        isComponent: !1,
        handler: C,
        keyHandler: S,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(e, t, n) {
    let r = pt.get(e);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], pi(e, a);
    }
  },
  unmounted(e) {
    let t = pt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), pt.delete(e));
  }
}, Un = /* @__PURE__ */ new WeakMap(), xl = 2500;
function Nl(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return xl;
}
const Il = {
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = Nl(l), u = l["keep-alive"] === !0, d = l.visible === !0, f = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      f.isPaused || d && !f.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function g() {
      f.intervalId || (f.intervalId = setInterval(p, s));
    }
    function h() {
      u || (document.hidden ? f.isPaused = !0 : f.isPaused = !1);
    }
    d && (f.observer = new IntersectionObserver(
      function(m) {
        f.isVisible = m[0].isIntersecting;
      },
      { threshold: 0 }
    ), f.observer.observe(e)), document.addEventListener("visibilitychange", h), f.visibilityHandler = h, g(), Un.set(e, f);
  },
  unmounted(e) {
    let t = Un.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), Un.delete(e));
  }
}, Gt = /* @__PURE__ */ new WeakMap();
let An = typeof navigator < "u" ? navigator.onLine : !0, Dn = /* @__PURE__ */ new Set(), hi = !1;
function Ml() {
  hi || typeof window > "u" || (hi = !0, window.addEventListener("online", function() {
    An = !0, Dn.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    An = !1, Dn.forEach(function(e) {
      e(!1);
    });
  }));
}
const Pl = {
  created(e, t) {
    Ml();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", An && (e.style.display = "none")), Gt.set(e, o);
  },
  mounted(e, t) {
    let n = Gt.get(e);
    if (!n)
      return;
    function r(i) {
      let o = !i;
      switch (n.mode) {
        case "visibility":
          o ? e.style.display = n.originalDisplay || "" : e.style.display = "none";
          break;
        case "class-add":
          if (n.value) {
            let a = n.value.trim().split(/\s+/);
            o ? a.forEach(function(l) {
              e.classList.add(l);
            }) : a.forEach(function(l) {
              e.classList.remove(l);
            });
          }
          break;
        case "class-remove":
          if (n.value) {
            let a = n.value.trim().split(/\s+/);
            o ? a.forEach(function(l) {
              e.classList.remove(l);
            }) : a.forEach(function(l) {
              e.classList.add(l);
            });
          }
          break;
        case "attr":
          n.value && (o ? e.setAttribute(n.value, "") : e.removeAttribute(n.value));
          break;
      }
    }
    r(An), n.updateFn = r, Dn.add(r);
  },
  unmounted(e) {
    let t = Gt.get(e);
    t && t.updateFn && Dn.delete(t.updateFn), Gt.delete(e);
  }
};
let mi = 0;
const ht = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new Map(), Rl = {
  created(e, t) {
    mi++;
    let n = "livue-replace-" + mi, r = t.modifiers.self === !0;
    ht.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Jn.set(n, 0);
  },
  mounted(e, t) {
    let n = ht.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = ht.get(e);
    n && (n.version++, Jn.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = ht.get(e);
    t && Jn.delete(t.id), ht.delete(e);
  }
}, mt = /* @__PURE__ */ new WeakMap(), vi = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Vl = 200;
function jl(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(vi))
    if (e[t])
      return vi[t];
  return Vl;
}
function Xn(e, t, n, r, i) {
  if (n.remove) {
    i ? e.style.display = "none" : e.style.display = t.originalDisplay;
    return;
  }
  if (n.class) {
    let o = (r || "").split(" ").filter(Boolean);
    i ? o.forEach(function(a) {
      t.addedClasses.includes(a) || (e.classList.add(a), t.addedClasses.push(a));
    }) : (t.addedClasses.forEach(function(a) {
      e.classList.remove(a);
    }), t.addedClasses = []);
    return;
  }
  if (n.attr) {
    let o = r || "disabled";
    i ? (e.setAttribute(o, ""), t.addedAttr = o) : t.addedAttr && (e.removeAttribute(t.addedAttr), t.addedAttr = null);
    return;
  }
  i ? e.style.display = t.originalDisplay || "" : e.style.display = "none";
}
const Hl = {
  created(e, t) {
    let n = e.style.display;
    mt.set(e, {
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
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = mt.get(e), o = t.modifiers || {}, a = jl(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(f) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), f && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Xn(e, i, o, u, !0);
      }, a) : f ? (i.isActive = !0, Xn(e, i, o, u, !0)) : (i.isActive = !1, Xn(e, i, o, u, !1));
    }
    i.stopWatch = Se(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      d,
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    mt.get(e);
  },
  unmounted(e) {
    let t = mt.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), mt.delete(e));
  }
}, Zt = /* @__PURE__ */ new WeakMap(), ql = {
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = t.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = Se(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? e.setAttribute("data-loading", "") : e.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    Zt.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = Zt.get(e), i = Ee(n);
    if (!r || !i) return;
    let o = t.value, a = t.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Se(
      function() {
        return i.isLoading(o);
      },
      function(l) {
        l ? e.setAttribute("data-loading", "") : e.removeAttribute("data-loading");
      },
      { immediate: !0 }
    ));
  },
  unmounted(e) {
    let t = Zt.get(e);
    t && (t.stopWatch && t.stopWatch(), Zt.delete(e));
  }
}, vt = /* @__PURE__ */ new WeakMap(), zl = {
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
    vt.set(e, { targetId: n }), ii(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = vt.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      oi(n.targetId);
      const i = t.modifiers.replace || !1;
      ii(r, e, i), vt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = vt.get(e);
    t && (oi(t.targetId), vt.delete(e));
  }
}, gi = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, yi = ["ctrl", "alt", "shift", "meta"];
let bi = 0;
const wi = /* @__PURE__ */ new Set();
function Fl(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function Wl(e, t) {
  for (let i = 0; i < yi.length; i++) {
    let o = yi[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in gi)
    t[i] && (n = !0, e.key === gi[i] && (r = !0));
  return !(n && !r);
}
function F(e, t = {}) {
  let n = t.supportsOutside === !0, r = t.isKeyboardEvent === !0, i = t.allowArg !== !1;
  const o = /* @__PURE__ */ new WeakMap();
  return {
    mounted(a, l, s) {
      const { arg: u, modifiers: d } = l, f = Ee(s);
      if (!f) {
        console.warn("[LiVue] v-" + e + ": livue helper not found in component context");
        return;
      }
      if (u && !i) {
        const L = "v-" + e;
        wi.has(L) || (console.warn(
          "[LiVue] " + L + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), wi.add(L));
      }
      bi++;
      const p = "v-" + e + "-" + bi, g = Fl(d);
      let h = null, m = null;
      d.debounce && (h = st(p, g)), d.throttle && (m = Ht(p, g));
      let y = !1, C = null;
      i && u && (C = u);
      const S = function(L) {
        let I = C, M = [];
        if (i && u) {
          I = u;
          const O = l.value;
          O != null && (M = Array.isArray(O) ? O : [O]);
        } else {
          const O = l.value;
          if (typeof O == "function")
            if (typeof O.__livueMethodName == "string")
              I = O.__livueMethodName, Array.isArray(O.__livueMethodArgs) && (M = O.__livueMethodArgs.slice());
            else {
              const j = function() {
                O();
              };
              h ? h(j) : m ? m(j) : j();
              return;
            }
          else typeof O == "string" ? I = O : Array.isArray(O) && O.length > 0 && (I = O[0], M = O.slice(1));
        }
        if (!I) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const k = function() {
          d.confirm ? f.callWithConfirm(I, "Are you sure?", ...M) : f.call(I, ...M);
        };
        h ? h(k) : m ? m(k) : k();
      }, N = function(L) {
        if (!(d.self && L.target !== a) && !(r && !Wl(L, d))) {
          if (d.once) {
            if (y)
              return;
            y = !0;
          }
          d.prevent && L.preventDefault(), d.stop && L.stopPropagation(), S();
        }
      }, T = {};
      d.capture && (T.capture = !0), d.passive && (T.passive = !0);
      const E = {
        handler: N,
        options: T,
        outsideHandler: null
      };
      if (n && d.outside) {
        const L = function(I) {
          if (!a.contains(I.target) && I.target !== a) {
            if (d.once) {
              if (y)
                return;
              y = !0;
            }
            S();
          }
        };
        document.addEventListener(e, L, T), E.outsideHandler = L;
      } else
        a.addEventListener(e, N, T);
      o.set(a, E);
    },
    updated(a, l, s) {
    },
    unmounted(a) {
      const l = o.get(a);
      l && (l.outsideHandler ? document.removeEventListener(e, l.outsideHandler, l.options) : a.removeEventListener(e, l.handler, l.options), o.delete(a));
    }
  };
}
const $l = F("click", {
  supportsOutside: !0,
  allowArg: !1
}), Bl = {
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
let Si = 0;
const Ul = {
  created(e, t) {
    let n = t.value;
    n || (Si++, n = "scroll-" + Si), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, gt = /* @__PURE__ */ new WeakMap();
function Ei(e, t, n, r, i) {
  if (n.class) {
    if (!r)
      return;
    let o = r.trim().split(/\s+/);
    n.remove ? i ? o.forEach(function(a) {
      e.classList.remove(a);
    }) : o.forEach(function(a) {
      e.classList.add(a);
    }) : i ? o.forEach(function(a) {
      t.addedClasses.includes(a) || (e.classList.add(a), t.addedClasses.push(a));
    }) : (t.addedClasses.forEach(function(a) {
      e.classList.remove(a);
    }), t.addedClasses = []);
    return;
  }
  if (n.attr) {
    let o = r || "data-dirty";
    i ? (e.setAttribute(o, ""), t.addedAttr = o) : t.addedAttr && (e.removeAttribute(t.addedAttr), t.addedAttr = null);
    return;
  }
  i ? e.style.display = t.originalDisplay || "" : e.style.display = "none";
}
const Jl = {
  created(e, t) {
    let n = e.style.display;
    gt.set(e, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = t.modifiers || {};
    !r.class && !r.attr && (e.style.display = "none");
  },
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = gt.get(e), o = t.modifiers || {}, a = t.arg || null, l = t.value;
    i.stopWatch = Se(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        Ei(e, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = gt.get(e);
    if (r && t.value !== t.oldValue) {
      let i = Ee(n);
      if (i) {
        let o = t.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Ei(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = gt.get(e);
    t && (t.stopWatch && t.stopWatch(), gt.delete(e));
  }
}, Qt = /* @__PURE__ */ new WeakMap();
let _i = 0;
function Xl(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Yl(e, t) {
  let n = e.instance;
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
function Kl(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const Gl = {
  mounted(e, t, n) {
    let r = Yl(t, n);
    if (!r) {
      console.warn("[LiVue] v-watch: Could not find livue context");
      return;
    }
    let i = t.value || e.dataset.watchPath;
    if (!i) {
      console.warn(`[LiVue] v-watch: No path found. Use v-watch="'path'" or data-watch-path="path"`);
      return;
    }
    let { livue: o, state: a } = r, l = t.modifiers || {};
    _i++;
    let s = "watch-" + i + "-" + _i;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), Qt.set(e, { blurHandler: p });
      return;
    }
    let u = Xl(l) || 150, d = st(s, u), f = Se(
      function() {
        return Kl(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    Qt.set(e, { stopWatcher: f });
  },
  unmounted(e) {
    let t = Qt.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), Qt.delete(e));
  }
}, kt = /* @__PURE__ */ new WeakMap();
let Ai = 0;
function Zl(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function Ql(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function es(e, t) {
  let n = e.instance;
  if (n) {
    let o = n.$ || n._ || n;
    if (o.setupState && o.setupState.livue)
      return { state: o.setupState };
    if (n.livue)
      return { state: o.setupState || n };
  }
  let r = t.ctx;
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
function zt(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function Ft(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function wo(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function ts(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function ns(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function rs(e) {
  return ns(e) ? e : e.querySelector("input, textarea, select");
}
function Wt(e, t) {
  return {
    mounted(n, r, i) {
      if (Zl(i) && !Ql(i))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let a = es(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: l } = a, s = ts(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + e + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Ai++;
      let d = e + "-" + Ai, f = rs(n);
      if (!f) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let p = t(f, s, l, u, d);
      f.addEventListener(p.eventType, p.handler, { capture: !0 }), kt.set(n, {
        targetEl: f,
        handler: p.handler,
        eventType: p.eventType
      });
    },
    unmounted(n) {
      let r = kt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), kt.delete(n));
    }
  };
}
const is = Wt("debounce", function(e, t, n, r, i) {
  let o = wo(r) || 150, a = st(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = zt(l.target);
      a(function() {
        Ft(n, t, s);
      });
    }
  };
}), os = Wt("throttle", function(e, t, n, r, i) {
  let o = wo(r) || 150, a = Ht(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = zt(l.target);
      a(function() {
        Ft(n, t, s);
      });
    }
  };
}), Ir = Wt("blur", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Ft(n, t, zt(l.target));
  };
  return e.addEventListener("blur", a), e._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), as = Ir.unmounted;
Ir.unmounted = function(e) {
  let t = kt.get(e), n = t ? t.targetEl : e;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), as(e);
};
const Mr = Wt("enter", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Ft(n, t, zt(l.target));
  };
  return e.addEventListener("keyup", a), e._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), ls = Mr.unmounted;
Mr.unmounted = function(e) {
  let t = kt.get(e), n = t ? t.targetEl : e;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), ls(e);
};
const ss = Wt("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = zt(o.target);
      a = !!a && a !== "false" && a !== "0", Ft(n, t, a);
    }
  };
});
function Di(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function De(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Di(Object(n), !0).forEach(function(r) {
      us(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Di(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function cn(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? cn = function(t) {
    return typeof t;
  } : cn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, cn(e);
}
function us(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Le() {
  return Le = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Le.apply(this, arguments);
}
function cs(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function fs(e, t) {
  if (e == null) return {};
  var n = cs(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var ds = "1.15.6";
function Te(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var ke = Te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), $t = Te(/Edge/i), Ci = Te(/firefox/i), Ot = Te(/safari/i) && !Te(/chrome/i) && !Te(/android/i), Pr = Te(/iP(ad|od|hone)/i), So = Te(/chrome/i) && Te(/android/i), Eo = {
  capture: !1,
  passive: !1
};
function z(e, t, n) {
  e.addEventListener(t, n, !ke && Eo);
}
function q(e, t, n) {
  e.removeEventListener(t, n, !ke && Eo);
}
function Cn(e, t) {
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
function _o(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function we(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Cn(e, t) : Cn(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = _o(e));
  }
  return null;
}
var Ti = /\s+/g;
function fe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Ti, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Ti, " ");
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
function at(e, t) {
  var n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      var r = P(e, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!t && (e = e.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function Ao(e, t, n) {
  if (e) {
    var r = e.getElementsByTagName(t), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function Ae() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function ne(e, t, n, r, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var o, a, l, s, u, d, f;
    if (e !== window && e.parentNode && e !== Ae() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, d = o.height, f = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, f = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !ke))
      do
        if (i && i.getBoundingClientRect && (P(i, "transform") !== "none" || n && P(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(P(i, "border-top-width")), l -= p.left + parseInt(P(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var g = at(i || e), h = g && g.a, m = g && g.d;
      g && (a /= m, l /= h, f /= h, d /= m, s = a + d, u = l + f);
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
function Li(e, t, n) {
  for (var r = Re(e, !0), i = ne(e)[t]; r; ) {
    var o = ne(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === Ae()) break;
    r = Re(r, !1);
  }
  return !1;
}
function ut(e, t, n, r) {
  for (var i = 0, o = 0, a = e.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== R.ghost && (r || a[o] !== R.dragged) && we(a[o], n.draggable, e, !1)) {
      if (i === t)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function Rr(e, t) {
  for (var n = e.lastElementChild; n && (n === R.ghost || P(n, "display") === "none" || t && !Cn(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function he(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== R.clone && (!t || Cn(e, t)) && n++;
  return n;
}
function ki(e) {
  var t = 0, n = 0, r = Ae();
  if (e)
    do {
      var i = at(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function ps(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var r in t)
        if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
    }
  return -1;
}
function Re(e, t) {
  if (!e || !e.getBoundingClientRect) return Ae();
  var n = e, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = P(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return Ae();
        if (r || t) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return Ae();
}
function hs(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Yn(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var xt;
function Do(e, t) {
  return function() {
    if (!xt) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), xt = setTimeout(function() {
        xt = void 0;
      }, t);
    }
  };
}
function ms() {
  clearTimeout(xt), xt = void 0;
}
function Co(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function To(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Lo(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!we(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = ne(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var ce = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function vs() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(P(i, "display") === "none" || i === R.ghost)) {
            e.push({
              target: i,
              rect: ne(i)
            });
            var o = De({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = at(i, !0);
              a && (o.top -= a.f, o.left -= a.e);
            }
            i.fromRect = o;
          }
        });
      }
    },
    addAnimationState: function(r) {
      e.push(r);
    },
    removeAnimationState: function(r) {
      e.splice(ps(e, {
        target: r
      }), 1);
    },
    animateAll: function(r) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof r == "function" && r();
        return;
      }
      var o = !1, a = 0;
      e.forEach(function(l) {
        var s = 0, u = l.target, d = u.fromRect, f = ne(u), p = u.prevFromRect, g = u.prevToRect, h = l.rect, m = at(u, !0);
        m && (f.top -= m.f, f.left -= m.e), u.toRect = f, u.thisAnimationDuration && Yn(p, f) && !Yn(d, f) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - f.top) / (h.left - f.left) === (d.top - f.top) / (d.left - f.left) && (s = ys(h, p, g, i.options)), Yn(f, d) || (u.prevFromRect = d, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, h, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        P(r, "transition", ""), P(r, "transform", "");
        var l = at(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), f = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!f, P(r, "transform", "translate3d(" + d + "px," + f + "px,0)"), this.forRepaintDummy = gs(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function gs(e) {
  return e.offsetWidth;
}
function ys(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var Ke = [], Kn = {
  initializeByDefault: !0
}, Bt = {
  mount: function(t) {
    for (var n in Kn)
      Kn.hasOwnProperty(n) && !(n in t) && (t[n] = Kn[n]);
    Ke.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), Ke.push(t);
  },
  pluginEvent: function(t, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = t + "Global";
    Ke.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](De({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](De({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    Ke.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, Le(r, u.defaults);
      }
    });
    for (var o in t.options)
      if (t.options.hasOwnProperty(o)) {
        var a = this.modifyOption(t, o, t.options[o]);
        typeof a < "u" && (t.options[o] = a);
      }
  },
  getEventProperties: function(t, n) {
    var r = {};
    return Ke.forEach(function(i) {
      typeof i.eventProperties == "function" && Le(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return Ke.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function bs(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, d = e.oldDraggableIndex, f = e.newDraggableIndex, p = e.originalEvent, g = e.putSortable, h = e.extraEventProperties;
  if (t = t || n && n[ce], !!t) {
    var m, y = t.options, C = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ke && !$t ? m = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = d, m.newDraggableIndex = f, m.originalEvent = p, m.pullMode = g ? g.lastPutMode : void 0;
    var S = De(De({}, h), Bt.getEventProperties(r, t));
    for (var N in S)
      m[N] = S[N];
    n && n.dispatchEvent(m), y[C] && y[C].call(t, m);
  }
}
var ws = ["evt"], ue = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = fs(r, ws);
  Bt.pluginEvent.bind(R)(t, n, De({
    dragEl: A,
    parentEl: ee,
    ghostEl: V,
    rootEl: Y,
    nextEl: $e,
    lastDownEl: fn,
    cloneEl: Z,
    cloneHidden: Me,
    dragStarted: St,
    putSortable: ie,
    activeSortable: R.active,
    originalEvent: i,
    oldIndex: nt,
    oldDraggableIndex: Nt,
    newIndex: de,
    newDraggableIndex: xe,
    hideGhostForTarget: No,
    unhideGhostForTarget: Io,
    cloneNowHidden: function() {
      Me = !0;
    },
    cloneNowShown: function() {
      Me = !1;
    },
    dispatchSortableEvent: function(l) {
      le({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function le(e) {
  bs(De({
    putSortable: ie,
    cloneEl: Z,
    targetEl: A,
    rootEl: Y,
    oldIndex: nt,
    oldDraggableIndex: Nt,
    newIndex: de,
    newDraggableIndex: xe
  }, e));
}
var A, ee, V, Y, $e, fn, Z, Me, nt, de, Nt, xe, en, ie, et = !1, Tn = !1, Ln = [], ze, ge, Gn, Zn, Oi, xi, St, Ge, It, Mt = !1, tn = !1, dn, ae, Qn = [], Sr = !1, kn = [], Pn = typeof document < "u", nn = Pr, Ni = $t || ke ? "cssFloat" : "float", Ss = Pn && !So && !Pr && "draggable" in document.createElement("div"), ko = (function() {
  if (Pn) {
    if (ke)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), Oo = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = ut(t, 0, n), a = ut(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + ne(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + ne(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Ni] === "none" || a && r[Ni] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Es = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, _s = function(t, n) {
  var r;
  return Ln.some(function(i) {
    var o = i[ce].options.emptyInsertThreshold;
    if (!(!o || Rr(i))) {
      var a = ne(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, xo = function(t) {
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
  var r = {}, i = t.group;
  (!i || cn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, No = function() {
  !ko && V && P(V, "display", "none");
}, Io = function() {
  !ko && V && P(V, "display", "");
};
Pn && !So && document.addEventListener("click", function(e) {
  if (Tn)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Tn = !1, !1;
}, !0);
var Fe = function(t) {
  if (A) {
    t = t.touches ? t.touches[0] : t;
    var n = _s(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ce]._onDragOver(r);
    }
  }
}, As = function(t) {
  A && A.parentNode[ce]._isOutsideThisEl(t.target);
};
function R(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = Le({}, t), e[ce] = this;
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
      return Oo(e, this.options);
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
    supportPointer: R.supportPointer !== !1 && "PointerEvent" in window && (!Ot || Pr),
    emptyInsertThreshold: 5
  };
  Bt.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  xo(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Ss, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? z(e, "pointerdown", this._onTapStart) : (z(e, "mousedown", this._onTapStart), z(e, "touchstart", this._onTapStart)), this.nativeDraggable && (z(e, "dragover", this), z(e, "dragenter", this)), Ln.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Le(this, vs());
}
R.prototype = /** @lends Sortable.prototype */
{
  constructor: R,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Ge = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, A) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, d = i.filter;
      if (Ns(r), !A && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Ot && s && s.tagName.toUpperCase() === "SELECT") && (s = we(s, i.draggable, r, !1), !(s && s.animated) && fn !== s)) {
        if (nt = he(s), Nt = he(s, i.draggable), typeof d == "function") {
          if (d.call(this, t, s, this)) {
            le({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), ue("filter", n, {
              evt: t
            }), o && t.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(f) {
          if (f = we(u, f.trim(), r, !1), f)
            return le({
              sortable: n,
              rootEl: f,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), ue("filter", n, {
              evt: t
            }), !0;
        }), d)) {
          o && t.preventDefault();
          return;
        }
        i.handle && !we(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !A && r.parentNode === o) {
      var u = ne(r);
      if (Y = o, A = r, ee = A.parentNode, $e = A.nextSibling, fn = r, en = a.group, R.dragged = A, ze = {
        target: A,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Oi = ze.clientX - u.left, xi = ze.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, A.style["will-change"] = "all", s = function() {
        if (ue("delayEnded", i, {
          evt: t
        }), R.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Ci && i.nativeDraggable && (A.draggable = !0), i._triggerDragStart(t, n), le({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), fe(A, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Ao(A, d.trim(), er);
      }), z(l, "dragover", Fe), z(l, "mousemove", Fe), z(l, "touchmove", Fe), a.supportPointer ? (z(l, "pointerup", i._onDrop), !this.nativeDraggable && z(l, "pointercancel", i._onDrop)) : (z(l, "mouseup", i._onDrop), z(l, "touchend", i._onDrop), z(l, "touchcancel", i._onDrop)), Ci && this.nativeDraggable && (this.options.touchStartThreshold = 4, A.draggable = !0), ue("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !($t || ke))) {
        if (R.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (z(l, "pointerup", i._disableDelayedDrag), z(l, "pointercancel", i._disableDelayedDrag)) : (z(l, "mouseup", i._disableDelayedDrag), z(l, "touchend", i._disableDelayedDrag), z(l, "touchcancel", i._disableDelayedDrag)), z(l, "mousemove", i._delayedDragTouchMoveHandler), z(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && z(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    A && er(A), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    q(t, "mouseup", this._disableDelayedDrag), q(t, "touchend", this._disableDelayedDrag), q(t, "touchcancel", this._disableDelayedDrag), q(t, "pointerup", this._disableDelayedDrag), q(t, "pointercancel", this._disableDelayedDrag), q(t, "mousemove", this._delayedDragTouchMoveHandler), q(t, "touchmove", this._delayedDragTouchMoveHandler), q(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? z(document, "pointermove", this._onTouchMove) : n ? z(document, "touchmove", this._onTouchMove) : z(document, "mousemove", this._onTouchMove) : (z(A, "dragend", this), z(Y, "dragstart", this._onDragStart));
    try {
      document.selection ? pn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (et = !1, Y && A) {
      ue("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && z(document, "dragover", As);
      var r = this.options;
      !t && fe(A, r.dragClass, !1), fe(A, r.ghostClass, !0), R.active = this, t && this._appendGhost(), le({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (ge) {
      this._lastX = ge.clientX, this._lastY = ge.clientY, No();
      for (var t = document.elementFromPoint(ge.clientX, ge.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(ge.clientX, ge.clientY), t !== n); )
        n = t;
      if (A.parentNode[ce]._isOutsideThisEl(t), n)
        do {
          if (n[ce]) {
            var r = void 0;
            if (r = n[ce]._onDragOver({
              clientX: ge.clientX,
              clientY: ge.clientY,
              target: t,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = _o(n));
      Io();
    }
  },
  _onTouchMove: function(t) {
    if (ze) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = V && at(V, !0), l = V && a && a.a, s = V && a && a.d, u = nn && ae && ki(ae), d = (o.clientX - ze.clientX + i.x) / (l || 1) + (u ? u[0] - Qn[0] : 0) / (l || 1), f = (o.clientY - ze.clientY + i.y) / (s || 1) + (u ? u[1] - Qn[1] : 0) / (s || 1);
      if (!R.active && !et) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (V) {
        a ? (a.e += d - (Gn || 0), a.f += f - (Zn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(V, "webkitTransform", p), P(V, "mozTransform", p), P(V, "msTransform", p), P(V, "transform", p), Gn = d, Zn = f, ge = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!V) {
      var t = this.options.fallbackOnBody ? document.body : Y, n = ne(A, !0, nn, !0, t), r = this.options;
      if (nn) {
        for (ae = t; P(ae, "position") === "static" && P(ae, "transform") === "none" && ae !== document; )
          ae = ae.parentNode;
        ae !== document.body && ae !== document.documentElement ? (ae === document && (ae = Ae()), n.top += ae.scrollTop, n.left += ae.scrollLeft) : ae = Ae(), Qn = ki(ae);
      }
      V = A.cloneNode(!0), fe(V, r.ghostClass, !1), fe(V, r.fallbackClass, !0), fe(V, r.dragClass, !0), P(V, "transition", ""), P(V, "transform", ""), P(V, "box-sizing", "border-box"), P(V, "margin", 0), P(V, "top", n.top), P(V, "left", n.left), P(V, "width", n.width), P(V, "height", n.height), P(V, "opacity", "0.8"), P(V, "position", nn ? "absolute" : "fixed"), P(V, "zIndex", "100000"), P(V, "pointerEvents", "none"), R.ghost = V, t.appendChild(V), P(V, "transform-origin", Oi / parseInt(V.style.width) * 100 + "% " + xi / parseInt(V.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, i = t.dataTransfer, o = r.options;
    if (ue("dragStart", this, {
      evt: t
    }), R.eventCanceled) {
      this._onDrop();
      return;
    }
    ue("setupClone", this), R.eventCanceled || (Z = To(A), Z.removeAttribute("id"), Z.draggable = !1, Z.style["will-change"] = "", this._hideClone(), fe(Z, this.options.chosenClass, !1), R.clone = Z), r.cloneId = pn(function() {
      ue("clone", r), !R.eventCanceled && (r.options.removeCloneOnHide || Y.insertBefore(Z, A), r._hideClone(), le({
        sortable: r,
        name: "clone"
      }));
    }), !n && fe(A, o.dragClass, !0), n ? (Tn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (q(document, "mouseup", r._onDrop), q(document, "touchend", r._onDrop), q(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, A)), z(document, "drop", r), P(A, "transform", "translateZ(0)")), et = !0, r._dragStartId = pn(r._dragStarted.bind(r, n, t)), z(document, "selectstart", r), St = !0, window.getSelection().removeAllRanges(), Ot && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = R.active, d = en === s, f = l.sort, p = ie || u, g, h = this, m = !1;
    if (Sr) return;
    function y(re, dt) {
      ue(re, h, De({
        evt: t,
        isOwner: d,
        axis: g ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: f,
        fromSortable: p,
        target: r,
        completed: S,
        onMove: function(c, b) {
          return rn(Y, n, A, i, c, ne(c), t, b);
        },
        changed: N
      }, dt));
    }
    function C() {
      y("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function S(re) {
      return y("dragOverCompleted", {
        insertion: re
      }), re && (d ? u._hideClone() : u._showClone(h), h !== p && (fe(A, ie ? ie.options.ghostClass : u.options.ghostClass, !1), fe(A, l.ghostClass, !0)), ie !== h && h !== R.active ? ie = h : h === R.active && ie && (ie = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        y("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === A && !A.animated || r === n && !r.animated) && (Ge = null), !l.dragoverBubble && !t.rootEl && r !== document && (A.parentNode[ce]._isOutsideThisEl(t.target), !re && Fe(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
    }
    function N() {
      de = he(A), xe = he(A, l.draggable), le({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: de,
        newDraggableIndex: xe,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = we(r, l.draggable, n, !0), y("dragOver"), R.eventCanceled) return m;
    if (A.contains(t.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return S(!1);
    if (Tn = !1, u && !l.disabled && (d ? f || (a = ee !== Y) : ie === this || (this.lastPutMode = en.checkPull(this, u, A, t)) && s.checkPut(this, u, A, t))) {
      if (g = this._getDirection(t, r) === "vertical", i = ne(A), y("dragOverValid"), R.eventCanceled) return m;
      if (a)
        return ee = Y, C(), this._hideClone(), y("revert"), R.eventCanceled || ($e ? Y.insertBefore(A, $e) : Y.appendChild(A)), S(!0);
      var T = Rr(n, l.draggable);
      if (!T || Ls(t, g, this) && !T.animated) {
        if (T === A)
          return S(!1);
        if (T && n === t.target && (r = T), r && (o = ne(r)), rn(Y, n, A, i, r, o, t, !!r) !== !1)
          return C(), T && T.nextSibling ? n.insertBefore(A, T.nextSibling) : n.appendChild(A), ee = n, N(), S(!0);
      } else if (T && Ts(t, g, this)) {
        var E = ut(n, 0, l, !0);
        if (E === A)
          return S(!1);
        if (r = E, o = ne(r), rn(Y, n, A, i, r, o, t, !1) !== !1)
          return C(), n.insertBefore(A, E), ee = n, N(), S(!0);
      } else if (r.parentNode === n) {
        o = ne(r);
        var L = 0, I, M = A.parentNode !== n, k = !Es(A.animated && A.toRect || i, r.animated && r.toRect || o, g), O = g ? "top" : "left", j = Li(r, "top", "top") || Li(A, "top", "top"), J = j ? j.scrollTop : void 0;
        Ge !== r && (I = o[O], Mt = !1, tn = !k && l.invertSwap || M), L = ks(t, r, o, g, k ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, tn, Ge === r);
        var W;
        if (L !== 0) {
          var $ = he(A);
          do
            $ -= L, W = ee.children[$];
          while (W && (P(W, "display") === "none" || W === V));
        }
        if (L === 0 || W === r)
          return S(!1);
        Ge = r, It = L;
        var U = r.nextElementSibling, K = !1;
        K = L === 1;
        var w = rn(Y, n, A, i, r, o, t, K);
        if (w !== !1)
          return (w === 1 || w === -1) && (K = w === 1), Sr = !0, setTimeout(Cs, 30), C(), K && !U ? n.appendChild(A) : r.parentNode.insertBefore(A, K ? U : r), j && Co(j, 0, J - j.scrollTop), ee = A.parentNode, I !== void 0 && !tn && (dn = Math.abs(I - ne(r)[O])), N(), S(!0);
      }
      if (n.contains(A))
        return S(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    q(document, "mousemove", this._onTouchMove), q(document, "touchmove", this._onTouchMove), q(document, "pointermove", this._onTouchMove), q(document, "dragover", Fe), q(document, "mousemove", Fe), q(document, "touchmove", Fe);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    q(t, "mouseup", this._onDrop), q(t, "touchend", this._onDrop), q(t, "pointerup", this._onDrop), q(t, "pointercancel", this._onDrop), q(t, "touchcancel", this._onDrop), q(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (de = he(A), xe = he(A, r.draggable), ue("drop", this, {
      evt: t
    }), ee = A && A.parentNode, de = he(A), xe = he(A, r.draggable), R.eventCanceled) {
      this._nulling();
      return;
    }
    et = !1, tn = !1, Mt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Er(this.cloneId), Er(this._dragStartId), this.nativeDraggable && (q(document, "drop", this), q(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ot && P(document.body, "user-select", ""), P(A, "transform", ""), t && (St && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), V && V.parentNode && V.parentNode.removeChild(V), (Y === ee || ie && ie.lastPutMode !== "clone") && Z && Z.parentNode && Z.parentNode.removeChild(Z), A && (this.nativeDraggable && q(A, "dragend", this), er(A), A.style["will-change"] = "", St && !et && fe(A, ie ? ie.options.ghostClass : this.options.ghostClass, !1), fe(A, this.options.chosenClass, !1), le({
      sortable: this,
      name: "unchoose",
      toEl: ee,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Y !== ee ? (de >= 0 && (le({
      rootEl: ee,
      name: "add",
      toEl: ee,
      fromEl: Y,
      originalEvent: t
    }), le({
      sortable: this,
      name: "remove",
      toEl: ee,
      originalEvent: t
    }), le({
      rootEl: ee,
      name: "sort",
      toEl: ee,
      fromEl: Y,
      originalEvent: t
    }), le({
      sortable: this,
      name: "sort",
      toEl: ee,
      originalEvent: t
    })), ie && ie.save()) : de !== nt && de >= 0 && (le({
      sortable: this,
      name: "update",
      toEl: ee,
      originalEvent: t
    }), le({
      sortable: this,
      name: "sort",
      toEl: ee,
      originalEvent: t
    })), R.active && ((de == null || de === -1) && (de = nt, xe = Nt), le({
      sortable: this,
      name: "end",
      toEl: ee,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ue("nulling", this), Y = A = ee = V = $e = Z = fn = Me = ze = ge = St = de = xe = nt = Nt = Ge = It = ie = en = R.dragged = R.ghost = R.clone = R.active = null, kn.forEach(function(t) {
      t.checked = !0;
    }), kn.length = Gn = Zn = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        A && (this._onDragOver(t), Ds(t));
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
    for (var t = [], n, r = this.el.children, i = 0, o = r.length, a = this.options; i < o; i++)
      n = r[i], we(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || xs(n));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, n) {
    var r = {}, i = this.el;
    this.toArray().forEach(function(o, a) {
      var l = i.children[a];
      we(l, this.options.draggable, i, !1) && (r[o] = l);
    }, this), n && this.captureAnimationState(), t.forEach(function(o) {
      r[o] && (i.removeChild(r[o]), i.appendChild(r[o]));
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
    return we(t, n || this.options.draggable, this.el, !1);
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
    var i = Bt.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && xo(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ue("destroy", this);
    var t = this.el;
    t[ce] = null, q(t, "mousedown", this._onTapStart), q(t, "touchstart", this._onTapStart), q(t, "pointerdown", this._onTapStart), this.nativeDraggable && (q(t, "dragover", this), q(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Ln.splice(Ln.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Me) {
      if (ue("hideClone", this), R.eventCanceled) return;
      P(Z, "display", "none"), this.options.removeCloneOnHide && Z.parentNode && Z.parentNode.removeChild(Z), Me = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Me) {
      if (ue("showClone", this), R.eventCanceled) return;
      A.parentNode == Y && !this.options.group.revertClone ? Y.insertBefore(Z, A) : $e ? Y.insertBefore(Z, $e) : Y.appendChild(Z), this.options.group.revertClone && this.animate(A, Z), P(Z, "display", ""), Me = !1;
    }
  }
};
function Ds(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function rn(e, t, n, r, i, o, a, l) {
  var s, u = e[ce], d = u.options.onMove, f;
  return window.CustomEvent && !ke && !$t ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || ne(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (f = d.call(u, s, a)), f;
}
function er(e) {
  e.draggable = !1;
}
function Cs() {
  Sr = !1;
}
function Ts(e, t, n) {
  var r = ne(ut(n.el, 0, n.options, !0)), i = Lo(n.el, n.options, V), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Ls(e, t, n) {
  var r = ne(Rr(n.el, n.options.draggable)), i = Lo(n.el, n.options, V), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function ks(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, f = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && dn < u * i) {
      if (!Mt && (It === 1 ? s > d + u * o / 2 : s < f - u * o / 2) && (Mt = !0), Mt)
        p = !0;
      else if (It === 1 ? s < d + dn : s > f - dn)
        return -It;
    } else if (s > d + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return Os(t);
  }
  return p = p || a, p && (s < d + u * o / 2 || s > f - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function Os(e) {
  return he(A) < he(e) ? 1 : -1;
}
function xs(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Ns(e) {
  kn.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && kn.push(r);
  }
}
function pn(e) {
  return setTimeout(e, 0);
}
function Er(e) {
  return clearTimeout(e);
}
Pn && z(document, "touchmove", function(e) {
  (R.active || et) && e.cancelable && e.preventDefault();
});
R.utils = {
  on: z,
  off: q,
  css: P,
  find: Ao,
  is: function(t, n) {
    return !!we(t, n, t, !1);
  },
  extend: hs,
  throttle: Do,
  closest: we,
  toggleClass: fe,
  clone: To,
  index: he,
  nextTick: pn,
  cancelNextTick: Er,
  detectDirection: Oo,
  getChild: ut,
  expando: ce
};
R.get = function(e) {
  return e[ce];
};
R.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (R.utils = De(De({}, R.utils), r.utils)), Bt.mount(r);
  });
};
R.create = function(e, t) {
  return new R(e, t);
};
R.version = ds;
var te = [], Et, _r, Ar = !1, tr, nr, On, _t;
function Is() {
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
      this.sortable.nativeDraggable ? q(document, "dragover", this._handleAutoScroll) : (q(document, "pointermove", this._handleFallbackAutoScroll), q(document, "touchmove", this._handleFallbackAutoScroll), q(document, "mousemove", this._handleFallbackAutoScroll)), Ii(), hn(), ms();
    },
    nulling: function() {
      On = _r = Et = Ar = _t = tr = nr = null, te.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (On = n, r || this.options.forceAutoScrollFallback || $t || ke || Ot) {
        rr(n, this.options, l, r);
        var s = Re(l, !0);
        Ar && (!_t || o !== tr || a !== nr) && (_t && Ii(), _t = setInterval(function() {
          var u = Re(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, hn()), rr(n, i.options, u, r);
        }, 10), tr = o, nr = a);
      } else {
        if (!this.options.bubbleScroll || Re(l, !0) === Ae()) {
          hn();
          return;
        }
        rr(n, this.options, Re(l, !1), !1);
      }
    }
  }, Le(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function hn() {
  te.forEach(function(e) {
    clearInterval(e.pid);
  }), te = [];
}
function Ii() {
  clearInterval(_t);
}
var rr = Do(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ae(), u = !1, d;
    _r !== n && (_r = n, hn(), Et = t.scroll, d = t.scrollFn, Et === !0 && (Et = Re(n, !0)));
    var f = 0, p = Et;
    do {
      var g = p, h = ne(g), m = h.top, y = h.bottom, C = h.left, S = h.right, N = h.width, T = h.height, E = void 0, L = void 0, I = g.scrollWidth, M = g.scrollHeight, k = P(g), O = g.scrollLeft, j = g.scrollTop;
      g === s ? (E = N < I && (k.overflowX === "auto" || k.overflowX === "scroll" || k.overflowX === "visible"), L = T < M && (k.overflowY === "auto" || k.overflowY === "scroll" || k.overflowY === "visible")) : (E = N < I && (k.overflowX === "auto" || k.overflowX === "scroll"), L = T < M && (k.overflowY === "auto" || k.overflowY === "scroll"));
      var J = E && (Math.abs(S - i) <= a && O + N < I) - (Math.abs(C - i) <= a && !!O), W = L && (Math.abs(y - o) <= a && j + T < M) - (Math.abs(m - o) <= a && !!j);
      if (!te[f])
        for (var $ = 0; $ <= f; $++)
          te[$] || (te[$] = {});
      (te[f].vx != J || te[f].vy != W || te[f].el !== g) && (te[f].el = g, te[f].vx = J, te[f].vy = W, clearInterval(te[f].pid), (J != 0 || W != 0) && (u = !0, te[f].pid = setInterval(function() {
        r && this.layer === 0 && R.active._onTouchMove(On);
        var U = te[this.layer].vy ? te[this.layer].vy * l : 0, K = te[this.layer].vx ? te[this.layer].vx * l : 0;
        typeof d == "function" && d.call(R.dragged.parentNode[ce], K, U, e, On, te[this.layer].el) !== "continue" || Co(te[this.layer].el, K, U);
      }.bind({
        layer: f
      }), 24))), f++;
    } while (t.bubbleScroll && p !== s && (p = Re(p, !1)));
    Ar = u;
  }
}, 30), Mo = function(t) {
  var n = t.originalEvent, r = t.putSortable, i = t.dragEl, o = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
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
function Vr() {
}
Vr.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = ut(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Mo
};
Le(Vr, {
  pluginName: "revertOnSpill"
});
function jr() {
}
jr.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Mo
};
Le(jr, {
  pluginName: "removeOnSpill"
});
R.mount(new Is());
R.mount(jr, Vr);
const rt = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakMap();
function Ms(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const on = /* @__PURE__ */ new WeakMap(), Ps = {
  mounted(e, t, n) {
    let r = Ee(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Ms(i), l = i.horizontal ? "horizontal" : "vertical";
    on.set(e, t);
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
      onEnd: function(p) {
        let g = p.newIndex, h = p.oldIndex;
        if (h === g)
          return;
        let m = on.get(e), y = m ? m.value : null, C = typeof y == "string";
        if (Array.isArray(y)) {
          let N = p.from;
          h < g ? N.insertBefore(p.item, N.children[h]) : N.insertBefore(p.item, N.children[h + 1]);
          let T = y.splice(h, 1)[0];
          y.splice(g, 0, T);
          return;
        }
        if (C && r) {
          let N = y, T = [], E = p.item, L = mn.get(E);
          L === void 0 && (L = E.dataset.livueSortItem), typeof L == "string" && /^\d+$/.test(L) && (L = parseInt(L, 10));
          let I = p.from, M = p.to, k = [L, g].concat(T);
          if (I !== M) {
            let j = M.dataset.livueSortMethod;
            j && (N = j);
            let J = I.dataset.livueSortId || I.dataset.livueSortGroup || null;
            k.push(J);
          }
          r.call(N, k);
        }
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let f = R.create(e, u);
    rt.set(e, f);
  },
  updated(e, t) {
    on.set(e, t);
    let n = rt.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = rt.get(e);
    t && (t.destroy(), rt.delete(e)), on.delete(e);
  }
}, Rs = {
  mounted(e, t) {
    let n = t.value;
    mn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    mn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (mn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Vs = {
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
}, js = {
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
}, Hs = {
  mounted(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = rt.get(e);
    r && r.option("group", n);
  },
  updated(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = rt.get(e);
    r && r.option("group", n);
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, qs = F("dblclick"), zs = F("mousedown"), Fs = F("mouseup"), Ws = F("mouseenter"), $s = F("mouseleave"), Bs = F("mouseover"), Us = F("mouseout"), Js = F("mousemove"), Xs = F("contextmenu"), Ys = F("keydown", { isKeyboardEvent: !0 }), Ks = F("keyup", { isKeyboardEvent: !0 }), Gs = F("keypress", { isKeyboardEvent: !0 }), Zs = F("focus"), Qs = F("focusin"), eu = F("focusout"), tu = F("touchstart"), nu = F("touchend"), ru = F("touchmove"), iu = F("touchcancel"), ou = F("change"), au = F("input"), lu = F("reset"), su = F("dragstart"), uu = F("dragend"), cu = F("dragenter"), fu = F("dragleave"), du = F("dragover"), pu = F("drop"), hu = F("copy"), mu = F("cut"), vu = F("paste"), gu = F("wheel"), yu = F("resize");
function bu() {
  x("init", wl), x("submit", Sl), x("intersect", El), x("current", Dl), x("ignore", Cl), x("model-livue", Ol), x("debounce", is), x("throttle", os), x("blur", Ir), x("enter", Mr), x("boolean", ss), x("poll", Il), x("offline", Pl), x("transition", hl), x("replace", Rl), x("loading", Hl), x("target", ql), x("stream", zl), x("click", $l), x("navigate", Bl), x("scroll", Ul), x("dirty", Jl), x("watch", Gl), x("sort", Ps), x("sort-item", Rs), x("sort-handle", Vs), x("sort-ignore", js), x("sort-group", Hs), x("dblclick", qs), x("mousedown", zs), x("mouseup", Fs), x("mouseenter", Ws), x("mouseleave", $s), x("mouseover", Bs), x("mouseout", Us), x("mousemove", Js), x("contextmenu", Xs), x("keydown", Ys), x("keyup", Ks), x("keypress", Gs), x("focus", Zs), x("focusin", Qs), x("focusout", eu), x("touchstart", tu), x("touchend", nu), x("touchmove", ru), x("touchcancel", iu), x("change", ou), x("input", au), x("reset", lu), x("dragstart", su), x("dragend", uu), x("dragenter", cu), x("dragleave", fu), x("dragover", du), x("drop", pu), x("copy", hu), x("cut", mu), x("paste", vu), x("wheel", gu), x("resize", yu);
}
let Ne = null, yt = null, Mi = !1;
function wu() {
  if (Mi)
    return;
  Mi = !0;
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
function Su() {
  return Ne || (wu(), Ne = document.createElement("div"), Ne.className = "livue-hmr-indicator", document.body.appendChild(Ne), Ne);
}
function an(e, t) {
  const n = Su();
  switch (yt && (clearTimeout(yt), yt = null), e) {
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
            `, yt = setTimeout(function() {
        Pi();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, yt = setTimeout(function() {
        Pi();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Pi() {
  Ne && Ne.classList.remove("visible");
}
let Je = null, Rn = !0, Po = !0, At = !0, vn = [];
function Eu(e) {
  Je = e;
}
async function _u(e) {
  if (Rn) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), At && an("updating", e.fileName), vn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = Po ? Au() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), At && an("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Je.reboot(), t && (await Cu(), Du(t)), At && an("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), At && an("error");
    }
  }
}
function Au() {
  const e = /* @__PURE__ */ new Map();
  return Je && Je.all().forEach(function(n) {
    if (Ri(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Ri(r, i.name, i.state, e);
      }
  }), e;
}
function Ri(e, t, n, r) {
  const i = {};
  for (const o in n) {
    const a = n[o];
    if (!(typeof a == "function" || typeof a == "symbol"))
      try {
        i[o] = JSON.parse(JSON.stringify(a));
      } catch {
        console.warn("[LiVue HMR] Could not save state for " + t + "." + o);
      }
  }
  r.set(e, { name: t, state: i });
}
function Du(e) {
  Je && e.forEach(function(t, n) {
    const r = Je.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function Cu() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Tu() {
  return typeof import.meta < "u" && !1;
}
function Lu() {
  Rn = !0;
}
function ku() {
  Rn = !1;
}
function Ou() {
  return Rn;
}
function xu(e) {
  e.indicator !== void 0 && (At = e.indicator), e.preserveState !== void 0 && (Po = e.preserveState);
}
function Nu(e) {
  return vn.push(e), function() {
    const t = vn.indexOf(e);
    t !== -1 && vn.splice(t, 1);
  };
}
async function Iu() {
  Je && await _u({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ze = !1, ir = [];
class Mu {
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
    $a(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    bu(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), this._processStandaloneLazy(document.body), _a(this), this._startObserver(), Eu(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(t) {
      t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Ga());
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
    }.bind(this)), this._processStandaloneLazy(document.body), this._startObserver();
  }
  /**
   * Reboot but preserve certain components (don't destroy them).
   * Used during SPA navigation with @persist elements.
   */
  rebootPreserving() {
    document.querySelectorAll("[data-livue-id]").forEach(function(r) {
      this._isRoot(r) && this._initComponent(r);
    }.bind(this)), this._processStandaloneLazy(document.body);
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
    qt(t, !0, !1);
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
    Ea(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return Mn(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    Na();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return ja();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return je;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: ft(),
      ...Ka()
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
    if (!t.isConnected)
      return !1;
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
    let r = new bl(t);
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
      for (let i in r._childRegistry) {
        let o = r._childRegistry[i];
        o.name === t && n.push({
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
  hook(t, n) {
    return Yr(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Kr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), Qr();
  }
  /**
   * Destroy all mounted Vue app instances EXCEPT those with IDs in the preserveIds set.
   * Used during SPA navigation to preserve @persist components.
   *
   * @param {Set<string>} preserveIds - Set of component IDs to preserve
   */
  destroyExcept(t) {
    var n = this, r = [];
    this._preservingIds = t, this.components.forEach(function(i, o) {
      t.has(o) || (i.destroy(), r.push(o));
    }), r.forEach(function(i) {
      n.components.delete(i);
    }), Qr();
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
        r.addedNodes.forEach(function(i) {
          i.nodeType === Node.ELEMENT_NODE && t._processAddedNode(i);
        }), r.removedNodes.forEach(function(i) {
          i.nodeType === Node.ELEMENT_NODE && t._processRemovedNode(i);
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
    t.tagName && t.tagName.toLowerCase() === "livue-lazy" && this._isStandaloneLazy(t) && n.push(t), t.querySelectorAll && t.querySelectorAll("livue-lazy").forEach(function(i) {
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
    let n = document.createElement("div"), r = "livue-lazy-wrapper-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9), i = {
      state: {},
      memo: {
        name: "lazy-wrapper",
        checksum: ""
      }
    };
    n.dataset.livueId = r, n.dataset.livueSnapshot = JSON.stringify(i), t.parentNode.insertBefore(n, t), n.appendChild(t), this._initComponent(n);
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
      let i = r.dataset.livueId;
      this._cleanupComponent(i);
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
      isAvailable: Tu,
      isEnabled: Ou,
      enable: Lu,
      disable: ku,
      configure: xu,
      onUpdate: Nu,
      trigger: Iu
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
    if (t && !Ze) {
      Ze = !0, console.log("[LiVue] Debug mode enabled");
      var n = Kr();
      n.forEach(function(r) {
        var i = Yr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        ir.push(i);
      });
    } else !t && Ze && (Ze = !1, console.log("[LiVue] Debug mode disabled"), ir.forEach(function(r) {
      r();
    }), ir = []);
    return Ze;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return Ze;
  }
}
const Vn = new Mu();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = Jo, document.head.appendChild(e);
}
var ye = window.LiVueConfig || {};
(ye.showProgressBar !== void 0 || ye.progressBarColor !== void 0 || ye.prefetch !== void 0 || ye.prefetchOnHover !== void 0 || ye.hoverDelay !== void 0 || ye.cachePages !== void 0 || ye.maxCacheSize !== void 0 || ye.restoreScroll !== void 0) && Vn.configureNavigation(ye);
ye.showProgressOnRequest !== void 0 && Vn.progress.configure({ showOnRequest: ye.showProgressOnRequest });
function Vi() {
  Vn.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Vi) : queueMicrotask(Vi);
window.LiVue = Vn;
export {
  Vn as default
};
//# sourceMappingURL=livue.esm.js.map
