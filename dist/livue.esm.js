import * as Hn from "vue";
import { reactive as _e, toRefs as Hi, effectScope as qi, ref as Pt, markRaw as zi, hasInjectionContext as Vo, inject as Fi, isRef as yn, isReactive as Wi, toRaw as jo, getCurrentScope as Ho, onScopeDispose as qo, watch as Se, nextTick as Nn, computed as $i, provide as zo, onBeforeUnmount as Fo, onBeforeMount as Wo, onUnmounted as Bi, onMounted as Ui, readonly as $o, watchEffect as Bo, shallowRef as Cr, defineComponent as Uo, h as qr, createApp as Jo } from "vue";
const Xo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Ji(e, t) {
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
function zr(e) {
  return JSON.stringify(e, Ji);
}
function ar(e) {
  return _e(Object.assign({}, e));
}
function Yo(e, t) {
  let n;
  for (n in t) {
    let r = zr(e[n]), i = zr(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function Xi(e) {
  return JSON.parse(JSON.stringify(e, Ji));
}
function Ko(e) {
  return Hi(e);
}
function qn(e, t) {
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
  let n = {}, r = Xi(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function Go(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function lr(e) {
  if (Go(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(lr);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = lr(e[n]);
    return t;
  }
  return e;
}
function lt(e) {
  let t = {};
  for (let n in e)
    t[n] = lr(e[n]);
  return t;
}
let Fr = 0;
function Zo() {
  return Fr++, Fr;
}
let Yi = /* @__PURE__ */ new Map();
function Qo(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function ea(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Ki(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Yi.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: Qo(n)
    });
  });
}
function Gi(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Yi.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && ea(n, i.inputs));
  });
}
let Zi;
const In = (e) => Zi = e, Qi = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function sr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Dt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Dt || (Dt = {}));
function Wr() {
  const e = qi(!0), t = e.run(() => Pt({}));
  let n = [], r = [];
  const i = zi({
    install(o) {
      In(i), i._a = o, o.provide(Qi, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const eo = () => {
};
function $r(e, t, n, r = eo) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && Ho() && qo(i), i;
}
function Xe(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const ta = (e) => e(), Br = /* @__PURE__ */ Symbol(), zn = /* @__PURE__ */ Symbol();
function ur(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    sr(i) && sr(r) && e.hasOwnProperty(n) && !yn(r) && !Wi(r) ? e[n] = ur(i, r) : e[n] = r;
  }
  return e;
}
const na = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function ra(e) {
  return !sr(e) || !Object.prototype.hasOwnProperty.call(e, na);
}
const { assign: Oe } = Object;
function ia(e) {
  return !!(yn(e) && e.effect);
}
function oa(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const d = Hi(n.state.value[e]);
    return Oe(d, o, Object.keys(a || {}).reduce((f, p) => (f[p] = zi($i(() => {
      In(n);
      const g = n._s.get(e);
      return a[p].call(g, g);
    })), f), {}));
  }
  return s = to(e, u, t, n, r, !0), s;
}
function to(e, t, n = {}, r, i, o) {
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
    }) : (ur(r.state.value[e], M), k = {
      type: Dt.patchObject,
      payload: M,
      storeId: e,
      events: g
    });
    const O = m = /* @__PURE__ */ Symbol();
    Nn().then(() => {
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
    eo
  );
  function S() {
    a.stop(), f.clear(), p.clear(), r._s.delete(e);
  }
  const N = (M, k = "") => {
    if (Br in M)
      return M[zn] = k, M;
    const O = function() {
      In(r);
      const j = Array.from(arguments), J = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set();
      function $(w) {
        J.add(w);
      }
      function U(w) {
        W.add(w);
      }
      Xe(p, {
        args: j,
        name: O[zn],
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
    return O[Br] = !0, O[zn] = k, O;
  }, T = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: $r.bind(null, p),
    $patch: y,
    $reset: C,
    $subscribe(M, k = {}) {
      const O = $r(f, M, k.detached, () => j()), j = a.run(() => Se(() => r.state.value[e], (J) => {
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
  const I = (r._a && r._a.runWithContext || ta)(() => r._e.run(() => (a = qi()).run(() => t({ action: N }))));
  for (const M in I) {
    const k = I[M];
    if (yn(k) && !ia(k) || Wi(k))
      o || (h && ra(k) && (yn(k) ? k.value = h[M] : ur(k, h[M])), r.state.value[e][M] = k);
    else if (typeof k == "function") {
      const O = N(k, M);
      I[M] = O, l.actions[M] = k;
    }
  }
  return Oe(E, I), Oe(jo(E), I), Object.defineProperty(E, "$state", {
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
function aa(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = Vo();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Fi(Qi, null) : null), a && In(a), a = Zi, a._s.has(e) || (i ? to(e, t, r, a) : oa(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let Rt = /* @__PURE__ */ new Map();
function la(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function bt(e, t, n) {
  return la(n) === "global" ? t : e + ":" + t;
}
function no(e) {
  return JSON.parse(JSON.stringify(e));
}
function sa(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(no(t));
}
function Tr(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = bt(e, t, r), a = Rt.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ aa(o, n), definition: n }, Rt.set(o, a)), a.useStore(i);
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
function ua(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = lt(o.state || {}), s = Ue(e, o.name, { scope: a }, n);
    if (s) {
      sa(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return no(l);
      }
    }, d = Tr(e, o.name, u, { scope: a }, n);
    r[o.name] = d;
  }
  return r;
}
function ca(e) {
  let t = e + ":", n = Array.from(Rt.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && Rt.delete(n[r]);
}
let ro = {
  ref: Pt,
  computed: $i,
  watch: Se,
  watchEffect: Bo,
  reactive: _e,
  readonly: $o,
  onMounted: Ui,
  onUnmounted: Bi,
  onBeforeMount: Wo,
  onBeforeUnmount: Fo,
  nextTick: Nn,
  provide: zo,
  inject: Fi
}, cr = Object.keys(ro), fa = cr.map(function(e) {
  return ro[e];
});
function Ur(e) {
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
function da(e, t, n, r) {
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
    return Tr(S, m, y, C, N);
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
  for (let m = 0; m < cr.length; m++)
    h(cr[m], fa[m]);
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
function Jr(e) {
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
function Xr(e) {
  return e.replace(/\$errors\b/g, "lvErrors");
}
function io(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      io(e.children[t]);
}
function fr(e, t, n, r, i, o) {
  let a = Jr(e);
  a = Xr(a);
  let l = Ur(a), s = Hn.compile(l.html), u = Cr(s), d = [], f = !1;
  function p(h, m) {
    let y = u.value;
    f = !0;
    let C;
    try {
      C = y(h, d);
    } finally {
      f = !1;
    }
    return io(C), C;
  }
  p._rc = !0;
  let g = {
    name: o || "LiVueComponent",
    render: p,
    setup: function() {
      Hn.provide("livue", n);
      let h = Ko(t);
      var m = new Proxy(n.errors, {
        get: function(T, E, L) {
          var I = Reflect.get(T, E, L);
          return Array.isArray(I) ? I[0] : I;
        }
      });
      let y = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: m });
      if (l.setupCode) {
        let T = da(l.setupCode, h, n, r);
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
    let m = Jr(h);
    m = Xr(m);
    let y = Ur(m), C = Hn.compile(y.html);
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
function pa() {
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
}, se = null, dr = null, pe = null, bn = !1, Ct = 0;
function ha(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function ma(e) {
  return (-1 + e) * 100;
}
function oo() {
  if (bn) return;
  bn = !0;
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
function va() {
  if (pe) return;
  oo(), pe = document.createElement("div"), pe.className = "livue-progress-bar livue-progress-hidden", pe.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(oe.parent) || document.body).appendChild(pe);
}
function ga() {
  if (!bn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), bn = !1, oo());
}
function ya(e) {
  Object.assign(oe, e), ga();
}
function Vt() {
  return oe.showOnRequest;
}
function ba() {
  Ct++, se === null && (va(), se = 0, pe && pe.classList.remove("livue-progress-hidden"), Mn(oe.minimum), oe.trickle && (dr = setInterval(function() {
    ao();
  }, oe.trickleSpeed)));
}
function Mn(e) {
  se !== null && (e = ha(e, oe.minimum, 1), se = e, pe && (pe.style.transform = "translate3d(" + ma(e) + "%, 0, 0)"));
}
function ao() {
  if (se === null || se >= 1) return;
  let e;
  se < 0.2 ? e = 0.1 : se < 0.5 ? e = 0.04 : se < 0.8 ? e = 0.02 : se < 0.99 ? e = 5e-3 : e = 0, Mn(se + e);
}
function lo() {
  Ct = Math.max(0, Ct - 1), !(Ct > 0) && se !== null && (Mn(1), clearInterval(dr), dr = null, setTimeout(function() {
    pe && pe.classList.add("livue-progress-hidden"), setTimeout(function() {
      se = null, pe && (pe.style.transform = "translate3d(-100%, 0, 0)");
    }, oe.speed);
  }, oe.speed));
}
function wa() {
  Ct = 0, lo();
}
function Sa() {
  return se !== null;
}
function Ea() {
  return se;
}
const je = {
  configure: ya,
  start: ba,
  set: Mn,
  trickle: ao,
  done: lo,
  forceDone: wa,
  isStarted: Sa,
  getStatus: Ea,
  isRequestProgressEnabled: Vt
};
var wt = null, Yr = !1, it = !1, ve = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ce = /* @__PURE__ */ new Map(), Be = /* @__PURE__ */ new Map(), pr = /* @__PURE__ */ new WeakMap(), sn = /* @__PURE__ */ new Map(), Pe = null;
function _a(e) {
  Object.assign(ve, e), e.progressBarColor && je.configure({ color: e.progressBarColor });
}
function Aa(e) {
  wt = e, !Yr && (Yr = !0, Pe = so(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Pe },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (uo(Pe), Pe = t.state.pageKey, qt(t.state.url, !1, !0));
  }), Ca());
}
function so() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function uo(e) {
  if (!(!ve.restoreScroll || !e)) {
    sn.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = sn.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, sn.set(e, i);
      }
    });
  }
}
function Da(e) {
  if (!(!ve.restoreScroll || !e)) {
    var t = sn.get(e);
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
function Ca() {
  document.addEventListener("click", Ta, !0), ve.prefetch && (document.addEventListener("mouseenter", ka, !0), document.addEventListener("mouseleave", Oa, !0), document.addEventListener("mousedown", xa, !0), document.addEventListener("focus", Na, !0));
}
function Ta(e) {
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
function La(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function ka(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = La(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            Pn(r);
          }, ve.hoverDelay);
          pr.set(t, i);
        }
      }
    }
  }
}
function Oa(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = pr.get(t);
      n && (clearTimeout(n), pr.delete(t));
    }
  }
}
function xa(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Pn(n);
    }
  }
}
function Na(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Pn(n);
    }
  }
}
function Pn(e) {
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
      return ve.cachePages && co(t, i), i;
    }) : null;
  }).catch(function(r) {
    return Be.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Be.set(t, n), n;
}
function co(e, t) {
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
function Ia() {
  Ce.clear();
}
function Lr(e) {
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
      it = !0, n || uo(Pe), ve.showProgressBar && je.start();
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
          o = await l.text(), ve.cachePages && co(r, o);
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
        var f = Ma(), p = /* @__PURE__ */ new Set();
        f.forEach(function(C) {
          C.livueIds.forEach(function(S) {
            p.add(S);
          });
        }), wt._stopObserver(), wt.destroyExcept(p), f.forEach(function(C) {
          C.element.parentNode && C.element.parentNode.removeChild(C.element);
        });
        var g = u.querySelector("title");
        g && (document.title = g.textContent), document.body.innerHTML = u.body.innerHTML, Pa(f);
        var h = u.querySelector('meta[name="csrf-token"]'), m = document.querySelector('meta[name="csrf-token"]');
        if (h && m && (m.setAttribute("content", h.getAttribute("content")), pa()), Ra(u), Va(u), t && (Pe = so(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Pe },
          "",
          r
        )), ja(u), wt.rebootPreserving(), n)
          Da(Pe);
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
function Ma() {
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
function Pa(e) {
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
function Ra(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Va(e) {
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
function ja(e) {
  var t = document.body.querySelectorAll("script");
  t.forEach(function(n) {
    if (n.parentNode) {
      if (n.hasAttribute("data-navigate-once")) {
        if (n.dataset.navigateRan)
          return;
        n.dataset.navigateRan = "true";
      }
      if (n.type !== "application/livue-setup" && !n.hasAttribute("data-livue-loader") && !(n.type === "module" || n.type === "importmap" || n.type === "speculationrules")) {
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
function Ha() {
  return it;
}
var Qe = /* @__PURE__ */ new Map(), qa = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Kr(e, t) {
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
function fo() {
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
function Gr() {
  return qa.slice();
}
var hr = [], mr = [], jt = !1;
function za(e) {
  return e.isolate ? Wa(e) : new Promise(function(t, n) {
    hr.push({
      payload: e,
      resolve: t,
      reject: n
    }), jt || (jt = !0, queueMicrotask(po));
  });
}
function Fa(e) {
  return new Promise(function(t, n) {
    mr.push({
      payload: e,
      resolve: t,
      reject: n
    }), jt || (jt = !0, queueMicrotask(po));
  });
}
async function po() {
  var e = hr, t = mr;
  if (hr = [], mr = [], jt = !1, !(e.length === 0 && t.length === 0)) {
    Vt() && je.start();
    var n = ho(), r = ct(), i = {
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
          Lr(p[f].redirect);
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
async function Wa(e) {
  Vt() && je.start();
  var t = ho(), n = ct(), r = {
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
      return Lr(s.redirect), new Promise(function() {
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
function ho() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function Fn(e, t, n, r, i) {
  return za({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
let vr = null, mo = /* @__PURE__ */ new Map();
function $a() {
  return _e({});
}
function be(e, t) {
  gr(e);
  for (let n in t)
    e[n] = t[n];
}
function gr(e) {
  for (let t in e)
    delete e[t];
}
function Ba(e) {
  vr = e;
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
  }), i ? !0 : (vr ? vr(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function Ua(e, t) {
  typeof t == "function" && mo.set(e, t);
}
function yr(e) {
  mo.delete(e);
}
var vo = [];
function x(e, t, n) {
  vo.push({
    name: e,
    directive: t
  });
}
function Ja() {
  return vo;
}
const Ve = /* @__PURE__ */ new Map(), He = /* @__PURE__ */ new Map();
let Zr = !1;
function ft() {
  return typeof window < "u" && window.Echo;
}
function Xa(e, t) {
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
function go(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!ft())
    return Zr || (Zr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: f } = o, p = Xa(a, l);
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
      Ya(p, s, h);
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
      yo(r[i]);
  };
}
function Ya(e, t, n) {
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
function yo(e) {
  const t = He.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    He.delete(e), Ka(t.channelKey);
  }
}
function Qr(e) {
  const t = ":" + e, n = [];
  He.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    yo(n[r]);
}
function Ka(e) {
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
function ei() {
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
function Ga() {
  return {
    echoAvailable: ft(),
    channels: Array.from(Ve.keys()),
    subscriptions: Array.from(He.keys())
  };
}
function Za() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Ie = /* @__PURE__ */ new Map();
function wn(e, t, n, r) {
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
function un(e, t, n, r, i, o) {
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
function ti(e) {
  Ie.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Ie.delete(n);
  });
}
function Qa(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    un(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function el(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function kr() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function tl(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = kr();
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
function Wn(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = kr() + "-remove", n = ct();
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
function nl(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = kr();
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
function ni(e) {
  let t = e + ":";
  for (let n of Tt.keys())
    n.startsWith(t) && Tt.delete(n);
  for (let n of Lt.keys())
    n.startsWith(t) && Lt.delete(n);
}
const Sn = "livue-tab-sync";
let Or = Date.now() + "-" + Math.random().toString(36).substr(2, 9), En = null, xr = /* @__PURE__ */ new Map(), ri = !1;
function bo() {
  ri || (ri = !0, typeof BroadcastChannel < "u" ? (En = new BroadcastChannel(Sn), En.onmessage = rl) : window.addEventListener("storage", il));
}
function rl(e) {
  let t = e.data;
  t.tabId !== Or && wo(t);
}
function il(e) {
  if (e.key === Sn && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === Or) return;
      wo(t);
    } catch {
    }
}
function wo(e) {
  let t = xr.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function ol(e, t) {
  bo(), xr.set(e, t);
}
function ii(e) {
  xr.delete(e);
}
function al(e, t, n, r) {
  bo();
  let i = {
    tabId: Or,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (En)
    En.postMessage(i);
  else
    try {
      localStorage.setItem(Sn, JSON.stringify(i)), localStorage.removeItem(Sn);
    } catch {
    }
}
function ll(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const Nr = /* @__PURE__ */ new Map();
async function sl(e, t = {}) {
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
              ul(h.stream), n(h.stream);
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
function ul(e) {
  const { to: t, content: n, replace: r } = e, i = Nr.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function oi(e, t, n = !1) {
  Nr.set(e, { el: t, replace: n });
}
function ai(e) {
  Nr.delete(e);
}
function cl(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function Ir(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    cl(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = Ir(r) : t[n] = r;
  }
  return t;
}
function fl(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Ir(l), d = {};
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
function dl(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = Ir(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function pl(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function hl(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function br(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = $a(), u = n.name, d = n.vueMethods || {}, f = n.jsonMethods || [], p = n.confirms || {}, g = n.isolate || !1, h = n.urlParams || null, m = n.uploads || null, y = n.tabSync || null, C = !1, S = i, N = o, T = a.initialHtml || null, E = _e({}), L = [];
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
    let b = ua(e, c, l);
    for (let _ in b)
      E[_] = b[_];
    M(c);
  }
  k(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    I(), ca(e);
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
      Lr(c.redirect);
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
        Yo(t, H), S = JSON.parse(JSON.stringify(H));
      }
      N = c.snapshot, v.memo && (v.memo.errors ? be(w.errors, v.memo.errors) : gr(w.errors), v.memo.vueMethods && (d = v.memo.vueMethods), v.memo.jsonMethods && (f = v.memo.jsonMethods), v.memo.urlParams && (h = v.memo.urlParams), v.memo.uploads && (m = v.memo.uploads), v.memo.confirms && (p = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && dl(U, v.memo), v.memo.stores && k(v.memo.stores));
    }
    if (h && el(h, t), (c.html || c.fragments) && r && r._updateTemplate) {
      let v = {};
      if (c.snapshot) {
        let H = JSON.parse(c.snapshot);
        H.memo && (H.memo.transitionType && (v.transitionType = H.memo.transitionType), H.memo.skipTransition && (v.skipTransition = !0));
      }
      if (c.fragments) {
        let H = T || (a.el ? a.el.innerHTML : null);
        if (H) {
          let X = hl(H, c.fragments);
          T = X, r._updateTemplate(X, v);
        }
      } else
        T = c.html, r._updateTemplate(c.html, v);
    }
    if (c.events && c.events.length > 0) {
      for (var _ = 0; _ < c.events.length; _++)
        c.events[_].sourceId = e;
      Qa(c.events);
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
      let H = Xi(t), X = [];
      for (let B in H)
        (!b || !(B in b)) && X.push(B);
      if (X.length > 0) {
        let B = ll(H, X, y);
        Object.keys(B).length > 0 && al(u, B, X, y);
      }
    }
    if (C = !1, c.jsonResult !== void 0)
      return c.jsonResult;
  }
  let W = _e({}), $ = {}, U = {}, K = function(c, b) {
    return w.call(c, b);
  };
  pl(n) && (U = fl(n, K));
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
          let Q = j(), G = await Fn(Q.snapshot, c, D, Q.diffs, g || H);
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
      return Tr(e, c, b, _, l);
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
        let c = j(), b = await Fn(c.snapshot, null, [], c.diffs, g);
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
      gr(w.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(c, b) {
      un(c, b, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(c, b, _) {
      un(b, _, "to", u, e, c);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(c, b) {
      un(c, b, "self", u, e, null);
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
      var _ = qn(t, c);
      _ && _.__livue_upload && _.ref && Wn([_.ref]), w.uploading = !0, w.uploadProgress = 0;
      try {
        var D = await tl(b, u, c, m[c].token, function(v) {
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
        var _ = await nl(b, u, c, m[c].token, function(G) {
          w.uploadProgress = G.overall;
        }), D = _.results || [], v = _.errors || [], H = qn(t, c), X = Array.isArray(H) ? H : [];
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
      var _ = qn(t, c);
      if (b !== void 0 && Array.isArray(_)) {
        var D = _[b];
        D && D.__livue_upload && D.ref && Wn([D.ref]), _.splice(b, 1), Jt(t, c, _.slice());
      } else
        _ && _.__livue_upload && _.ref && Wn([_.ref]), Jt(t, c, null);
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
        let v = await sl(D, {
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
      }) : (Ua(e, c), function() {
        yr(e);
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
      let c = j(), b = await Fn(c.snapshot, null, [], c.diffs, g);
      return J(b, c.diffs);
    } catch (c) {
      c.status === 422 && c.data && c.data.errors ? be(w.errors, c.data.errors) : Ye(c, u);
    } finally {
      w.loading = !1, w.processing = null, delete W.$refresh;
    }
  }
  $.$refresh = function() {
    return re();
  }, y && y.enabled && ol(u, function(c, b, _) {
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
function _n(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
function cn(e, t) {
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
      let j = "livue-child-" + Zo();
      t._versions[j] = 0;
      let J = ar(g), W = JSON.parse(JSON.stringify(g)), $ = Object.assign({ name: h.name || p }, h), U = { _updateTemplate: null }, K = fo(), w = br(u, J, $, U, W, d, {
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
            wn(_, p, u, function(H) {
              v.call(D, H);
            });
          })(c[_], re);
      let b = h.echo || null;
      b && b.length && (function(_, D) {
        go(_, b, function(v, H) {
          D.call(v, H);
        });
      })(u, re), U._updateTemplate = function(_) {
        let D = t.el.querySelector('[data-livue-id="' + u + '"]');
        D && Ki(D);
        let v = cn(_, t), H = _n(
          "<" + S.rootTag + ">" + v.template + "</" + S.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let B in v.childDefs)
          t.vueApp._context.components[B] || t.vueApp.component(B, v.childDefs[B]);
        t.vueApp._context.components[S.tagName]._updateRender(H), Nn(function() {
          let B = t.el.querySelector('[data-livue-id="' + u + '"]');
          B && Gi(B);
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
    if (M && t._rootState && wn("$modelUpdate", S.name, u, function(O) {
      O && O.value !== void 0 && (t._rootState[M] = O.value);
    }), E) {
      let O = _n(
        "<" + y + ">" + m + "</" + y + ">",
        'data-livue-id="' + u + '"'
      );
      i[L] = fr(
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
let li = 0;
function wr() {
  return typeof document < "u" && "startViewTransition" in document;
}
const $n = /* @__PURE__ */ new WeakMap();
function si() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const ml = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (li++, r = "livue-transition-" + li), $n.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), wr() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    si();
  },
  updated(e, t) {
    let n = $n.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), wr() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    $n.delete(e), e.removeAttribute("data-livue-transition"), si();
  }
};
function vl(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function gl(e) {
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
function yl(e, t) {
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
let Bn = 0;
function bl(e) {
  return Uo({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = Pt(!1), i = Cr(null), o = null, a = Pt(null);
      async function l() {
        if (!r.value)
          try {
            let u = await Fa({
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
        Bn++;
        let f = "lazy-" + Bn + "-" + Date.now(), p = d.memo ? d.memo.name : "", g = lt(d.state || {}), h = d.memo || {}, { createLivueHelper: m, buildComponentDef: y, processTemplate: C, createReactiveState: S } = e._lazyHelpers, N = S(g), T = JSON.parse(JSON.stringify(g)), E = { _updateTemplate: null }, L = m(
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
        let k = "livue-lazy-child-" + Bn, O = C(u.html, e), j = _n(
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
          let U = C($, e), K = _n(
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
              wn($, p, f, function(w) {
                K.call(U, w);
              });
            })(W[$], I);
        for (let $ in O.childDefs)
          e.vueApp._context.components[$] || e.vueApp.component($, O.childDefs[$]);
        e._versions[k] = 0, e.vueApp._context.components[k] || e.vueApp.component(k, J), i.value = J, r.value = !0;
      }
      return Ui(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Bi(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? qr(i.value) : qr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class wl {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(t) {
    this.el = t, this.componentId = t.dataset.livueId;
    let n = t.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = ar(lt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = _e({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: br,
      buildComponentDef: fr,
      processTemplate: cn,
      createReactiveState: ar
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
        var C = gl(r.el);
        Ki(r.el);
        let S = cn(m, r);
        if (!r.vueApp) return;
        for (let T in S.childDefs)
          r.vueApp._context.components[T] || r.vueApp.component(T, S.childDefs[T]);
        function N() {
          r._currentRootDef._updateRender(S.template), Nn(function() {
            Gi(r.el), yl(r.el, C), me("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (y.skipTransition) {
          N();
          return;
        }
        wr() ? vl(N, { type: y.transitionType }) : N();
      }
    }, o = JSON.parse(JSON.stringify(lt(t.state || {})));
    this._cleanups = fo(), this._pinia = Wr();
    let a = br(this.componentId, this.state, this.memo, i, o, n, {
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
    let u = cn(this.el.innerHTML, this), d = t.memo && t.memo.errors || null;
    d && be(l.errors, d);
    let f = t.memo && t.memo.listeners || null;
    if (f)
      for (let m in f)
        (function(y, C, S, N) {
          wn(m, S, N, function(T) {
            C.call(y, T);
          });
        })(f[m], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = go(r.componentId, p, function(m, y) {
      l.call(m, y);
    }));
    let g = fr(u.template, r.state, l, s, r._versions, r.name);
    this._currentRootDef = g, this._rootDefRef = Cr(g), this.vueApp = Jo({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", bl(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = this._pinia || Wr();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Ja();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), ti(t), ni(t), yr(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && ii(n.name), Qr(t);
    }
    if (me("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), ti(this.componentId), ni(this.componentId), yr(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && ii(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Qr(this.componentId), this.vueApp) {
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
let ui = /* @__PURE__ */ new Set();
const Sl = {
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
    ui.has(u) || (ui.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Un = /* @__PURE__ */ new WeakMap(), El = {
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
    e.addEventListener("submit", l), Un.set(e, l);
  },
  unmounted(e) {
    let t = Un.get(e);
    t && (e.removeEventListener("submit", t), Un.delete(e));
  }
}, Yt = /* @__PURE__ */ new WeakMap(), _l = {
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
var An = /* @__PURE__ */ new Set(), tt = /* @__PURE__ */ new WeakMap(), ci = !1;
function ot(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function Al(e, t) {
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
function Sr(e) {
  var t = tt.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = Al(n, i);
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
function fi() {
  An.forEach(function(e) {
    e.isConnected ? Sr(e) : (An.delete(e), tt.delete(e));
  });
}
function Dl() {
  ci || (ci = !0, window.addEventListener("popstate", fi), window.addEventListener("livue:navigated", fi));
}
const Cl = {
  mounted(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), An.add(e), Dl(), Sr(e);
  },
  updated(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), Sr(e);
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
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), An.delete(e), tt.delete(e);
  }
};
let di = 0;
const Tl = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    di++;
    let n = "livue-ignore-" + di;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, pt = /* @__PURE__ */ new WeakMap();
let pi = 0;
function Ll(e) {
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
function kl(e) {
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
function hi(e, t) {
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
function Ol(e) {
  return !!e.component;
}
const xl = {
  mounted(e, t, n) {
    let r = Ll(n);
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
    pi++;
    let s = "model-" + pi, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: f } = kl(l);
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
    let m = Ol(n), y = n.component, C = null, S = null, N = null, T = null;
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
      }, e.addEventListener("keyup", S)) : e.addEventListener(u, C), hi(e, h), pt.set(e, {
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
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], hi(e, a);
    }
  },
  unmounted(e) {
    let t = pt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), pt.delete(e));
  }
}, Jn = /* @__PURE__ */ new WeakMap(), Nl = 2500;
function Il(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Nl;
}
const Ml = {
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = Il(l), u = l["keep-alive"] === !0, d = l.visible === !0, f = {
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
    ), f.observer.observe(e)), document.addEventListener("visibilitychange", h), f.visibilityHandler = h, g(), Jn.set(e, f);
  },
  unmounted(e) {
    let t = Jn.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), Jn.delete(e));
  }
}, Gt = /* @__PURE__ */ new WeakMap();
let Dn = typeof navigator < "u" ? navigator.onLine : !0, Cn = /* @__PURE__ */ new Set(), mi = !1;
function Pl() {
  mi || typeof window > "u" || (mi = !0, window.addEventListener("online", function() {
    Dn = !0, Cn.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    Dn = !1, Cn.forEach(function(e) {
      e(!1);
    });
  }));
}
const Rl = {
  created(e, t) {
    Pl();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", Dn && (e.style.display = "none")), Gt.set(e, o);
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
    r(Dn), n.updateFn = r, Cn.add(r);
  },
  unmounted(e) {
    let t = Gt.get(e);
    t && t.updateFn && Cn.delete(t.updateFn), Gt.delete(e);
  }
};
let vi = 0;
const ht = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new Map(), Vl = {
  created(e, t) {
    vi++;
    let n = "livue-replace-" + vi, r = t.modifiers.self === !0;
    ht.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Xn.set(n, 0);
  },
  mounted(e, t) {
    let n = ht.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = ht.get(e);
    n && (n.version++, Xn.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = ht.get(e);
    t && Xn.delete(t.id), ht.delete(e);
  }
}, mt = /* @__PURE__ */ new WeakMap(), gi = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, jl = 200;
function Hl(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(gi))
    if (e[t])
      return gi[t];
  return jl;
}
function Yn(e, t, n, r, i) {
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
const ql = {
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
    let i = mt.get(e), o = t.modifiers || {}, a = Hl(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(f) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), f && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Yn(e, i, o, u, !0);
      }, a) : f ? (i.isActive = !0, Yn(e, i, o, u, !0)) : (i.isActive = !1, Yn(e, i, o, u, !1));
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
}, Zt = /* @__PURE__ */ new WeakMap(), zl = {
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
}, vt = /* @__PURE__ */ new WeakMap(), Fl = {
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
    vt.set(e, { targetId: n }), oi(n, e, r);
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
      ai(n.targetId);
      const i = t.modifiers.replace || !1;
      oi(r, e, i), vt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = vt.get(e);
    t && (ai(t.targetId), vt.delete(e));
  }
}, yi = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, bi = ["ctrl", "alt", "shift", "meta"];
let wi = 0;
const Si = /* @__PURE__ */ new Set();
function Wl(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function $l(e, t) {
  for (let i = 0; i < bi.length; i++) {
    let o = bi[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in yi)
    t[i] && (n = !0, e.key === yi[i] && (r = !0));
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
        Si.has(L) || (console.warn(
          "[LiVue] " + L + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), Si.add(L));
      }
      wi++;
      const p = "v-" + e + "-" + wi, g = Wl(d);
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
        if (!(d.self && L.target !== a) && !(r && !$l(L, d))) {
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
const Bl = F("click", {
  supportsOutside: !0,
  allowArg: !1
}), Ul = {
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
let Ei = 0;
const Jl = {
  created(e, t) {
    let n = t.value;
    n || (Ei++, n = "scroll-" + Ei), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, gt = /* @__PURE__ */ new WeakMap();
function _i(e, t, n, r, i) {
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
const Xl = {
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
        _i(e, i, o, l, s);
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
        _i(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = gt.get(e);
    t && (t.stopWatch && t.stopWatch(), gt.delete(e));
  }
}, Qt = /* @__PURE__ */ new WeakMap();
let Ai = 0;
function Yl(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Kl(e, t) {
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
function Gl(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const Zl = {
  mounted(e, t, n) {
    let r = Kl(t, n);
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
    Ai++;
    let s = "watch-" + i + "-" + Ai;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), Qt.set(e, { blurHandler: p });
      return;
    }
    let u = Yl(l) || 150, d = st(s, u), f = Se(
      function() {
        return Gl(a, i);
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
let Di = 0;
function Ql(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function es(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function ts(e, t) {
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
function So(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function ns(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function rs(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function is(e) {
  return rs(e) ? e : e.querySelector("input, textarea, select");
}
function Wt(e, t) {
  return {
    mounted(n, r, i) {
      if (Ql(i) && !es(i))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let a = ts(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: l } = a, s = ns(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + e + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Di++;
      let d = e + "-" + Di, f = is(n);
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
const os = Wt("debounce", function(e, t, n, r, i) {
  let o = So(r) || 150, a = st(i, o);
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
}), as = Wt("throttle", function(e, t, n, r, i) {
  let o = So(r) || 150, a = Ht(i, o);
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
}), Mr = Wt("blur", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Ft(n, t, zt(l.target));
  };
  return e.addEventListener("blur", a), e._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), ls = Mr.unmounted;
Mr.unmounted = function(e) {
  let t = kt.get(e), n = t ? t.targetEl : e;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), ls(e);
};
const Pr = Wt("enter", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Ft(n, t, zt(l.target));
  };
  return e.addEventListener("keyup", a), e._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), ss = Pr.unmounted;
Pr.unmounted = function(e) {
  let t = kt.get(e), n = t ? t.targetEl : e;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), ss(e);
};
const us = Wt("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = zt(o.target);
      a = !!a && a !== "false" && a !== "0", Ft(n, t, a);
    }
  };
});
function Ci(e, t) {
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
    t % 2 ? Ci(Object(n), !0).forEach(function(r) {
      cs(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ci(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function fn(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? fn = function(t) {
    return typeof t;
  } : fn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, fn(e);
}
function cs(e, t, n) {
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
function fs(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function ds(e, t) {
  if (e == null) return {};
  var n = fs(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var ps = "1.15.6";
function Te(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var ke = Te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), $t = Te(/Edge/i), Ti = Te(/firefox/i), Ot = Te(/safari/i) && !Te(/chrome/i) && !Te(/android/i), Rr = Te(/iP(ad|od|hone)/i), Eo = Te(/chrome/i) && Te(/android/i), _o = {
  capture: !1,
  passive: !1
};
function z(e, t, n) {
  e.addEventListener(t, n, !ke && _o);
}
function q(e, t, n) {
  e.removeEventListener(t, n, !ke && _o);
}
function Tn(e, t) {
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
function Ao(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function we(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Tn(e, t) : Tn(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = Ao(e));
  }
  return null;
}
var Li = /\s+/g;
function fe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Li, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Li, " ");
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
function Do(e, t, n) {
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
function ki(e, t, n) {
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
function Vr(e, t) {
  for (var n = e.lastElementChild; n && (n === R.ghost || P(n, "display") === "none" || t && !Tn(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function he(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== R.clone && (!t || Tn(e, t)) && n++;
  return n;
}
function Oi(e) {
  var t = 0, n = 0, r = Ae();
  if (e)
    do {
      var i = at(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function hs(e, t) {
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
function ms(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Kn(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var xt;
function Co(e, t) {
  return function() {
    if (!xt) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), xt = setTimeout(function() {
        xt = void 0;
      }, t);
    }
  };
}
function vs() {
  clearTimeout(xt), xt = void 0;
}
function To(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function Lo(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function ko(e, t, n) {
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
function gs() {
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
      e.splice(hs(e, {
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
        m && (f.top -= m.f, f.left -= m.e), u.toRect = f, u.thisAnimationDuration && Kn(p, f) && !Kn(d, f) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - f.top) / (h.left - f.left) === (d.top - f.top) / (d.left - f.left) && (s = bs(h, p, g, i.options)), Kn(f, d) || (u.prevFromRect = d, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, h, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
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
        r.animatingX = !!d, r.animatingY = !!f, P(r, "transform", "translate3d(" + d + "px," + f + "px,0)"), this.forRepaintDummy = ys(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function ys(e) {
  return e.offsetWidth;
}
function bs(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var Ke = [], Gn = {
  initializeByDefault: !0
}, Bt = {
  mount: function(t) {
    for (var n in Gn)
      Gn.hasOwnProperty(n) && !(n in t) && (t[n] = Gn[n]);
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
function ws(e) {
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
var Ss = ["evt"], ue = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = ds(r, Ss);
  Bt.pluginEvent.bind(R)(t, n, De({
    dragEl: A,
    parentEl: ee,
    ghostEl: V,
    rootEl: Y,
    nextEl: $e,
    lastDownEl: dn,
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
    hideGhostForTarget: Io,
    unhideGhostForTarget: Mo,
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
  ws(De({
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
var A, ee, V, Y, $e, dn, Z, Me, nt, de, Nt, xe, en, ie, et = !1, Ln = !1, kn = [], ze, ge, Zn, Qn, xi, Ni, St, Ge, It, Mt = !1, tn = !1, pn, ae, er = [], Er = !1, On = [], Rn = typeof document < "u", nn = Rr, Ii = $t || ke ? "cssFloat" : "float", Es = Rn && !Eo && !Rr && "draggable" in document.createElement("div"), Oo = (function() {
  if (Rn) {
    if (ke)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), xo = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = ut(t, 0, n), a = ut(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + ne(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + ne(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Ii] === "none" || a && r[Ii] === "none" && u + d > i) ? "vertical" : "horizontal";
}, _s = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, As = function(t, n) {
  var r;
  return kn.some(function(i) {
    var o = i[ce].options.emptyInsertThreshold;
    if (!(!o || Vr(i))) {
      var a = ne(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, No = function(t) {
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
  (!i || fn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, Io = function() {
  !Oo && V && P(V, "display", "none");
}, Mo = function() {
  !Oo && V && P(V, "display", "");
};
Rn && !Eo && document.addEventListener("click", function(e) {
  if (Ln)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Ln = !1, !1;
}, !0);
var Fe = function(t) {
  if (A) {
    t = t.touches ? t.touches[0] : t;
    var n = As(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ce]._onDragOver(r);
    }
  }
}, Ds = function(t) {
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
      return xo(e, this.options);
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
    supportPointer: R.supportPointer !== !1 && "PointerEvent" in window && (!Ot || Rr),
    emptyInsertThreshold: 5
  };
  Bt.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  No(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Es, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? z(e, "pointerdown", this._onTapStart) : (z(e, "mousedown", this._onTapStart), z(e, "touchstart", this._onTapStart)), this.nativeDraggable && (z(e, "dragover", this), z(e, "dragenter", this)), kn.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Le(this, gs());
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
      if (Is(r), !A && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Ot && s && s.tagName.toUpperCase() === "SELECT") && (s = we(s, i.draggable, r, !1), !(s && s.animated) && dn !== s)) {
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
      if (Y = o, A = r, ee = A.parentNode, $e = A.nextSibling, dn = r, en = a.group, R.dragged = A, ze = {
        target: A,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, xi = ze.clientX - u.left, Ni = ze.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, A.style["will-change"] = "all", s = function() {
        if (ue("delayEnded", i, {
          evt: t
        }), R.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Ti && i.nativeDraggable && (A.draggable = !0), i._triggerDragStart(t, n), le({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), fe(A, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Do(A, d.trim(), tr);
      }), z(l, "dragover", Fe), z(l, "mousemove", Fe), z(l, "touchmove", Fe), a.supportPointer ? (z(l, "pointerup", i._onDrop), !this.nativeDraggable && z(l, "pointercancel", i._onDrop)) : (z(l, "mouseup", i._onDrop), z(l, "touchend", i._onDrop), z(l, "touchcancel", i._onDrop)), Ti && this.nativeDraggable && (this.options.touchStartThreshold = 4, A.draggable = !0), ue("delayStart", this, {
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
    A && tr(A), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    q(t, "mouseup", this._disableDelayedDrag), q(t, "touchend", this._disableDelayedDrag), q(t, "touchcancel", this._disableDelayedDrag), q(t, "pointerup", this._disableDelayedDrag), q(t, "pointercancel", this._disableDelayedDrag), q(t, "mousemove", this._delayedDragTouchMoveHandler), q(t, "touchmove", this._delayedDragTouchMoveHandler), q(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? z(document, "pointermove", this._onTouchMove) : n ? z(document, "touchmove", this._onTouchMove) : z(document, "mousemove", this._onTouchMove) : (z(A, "dragend", this), z(Y, "dragstart", this._onDragStart));
    try {
      document.selection ? hn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (et = !1, Y && A) {
      ue("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && z(document, "dragover", Ds);
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
      this._lastX = ge.clientX, this._lastY = ge.clientY, Io();
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
        } while (n = Ao(n));
      Mo();
    }
  },
  _onTouchMove: function(t) {
    if (ze) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = V && at(V, !0), l = V && a && a.a, s = V && a && a.d, u = nn && ae && Oi(ae), d = (o.clientX - ze.clientX + i.x) / (l || 1) + (u ? u[0] - er[0] : 0) / (l || 1), f = (o.clientY - ze.clientY + i.y) / (s || 1) + (u ? u[1] - er[1] : 0) / (s || 1);
      if (!R.active && !et) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (V) {
        a ? (a.e += d - (Zn || 0), a.f += f - (Qn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(V, "webkitTransform", p), P(V, "mozTransform", p), P(V, "msTransform", p), P(V, "transform", p), Zn = d, Qn = f, ge = o;
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
        ae !== document.body && ae !== document.documentElement ? (ae === document && (ae = Ae()), n.top += ae.scrollTop, n.left += ae.scrollLeft) : ae = Ae(), er = Oi(ae);
      }
      V = A.cloneNode(!0), fe(V, r.ghostClass, !1), fe(V, r.fallbackClass, !0), fe(V, r.dragClass, !0), P(V, "transition", ""), P(V, "transform", ""), P(V, "box-sizing", "border-box"), P(V, "margin", 0), P(V, "top", n.top), P(V, "left", n.left), P(V, "width", n.width), P(V, "height", n.height), P(V, "opacity", "0.8"), P(V, "position", nn ? "absolute" : "fixed"), P(V, "zIndex", "100000"), P(V, "pointerEvents", "none"), R.ghost = V, t.appendChild(V), P(V, "transform-origin", xi / parseInt(V.style.width) * 100 + "% " + Ni / parseInt(V.style.height) * 100 + "%");
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
    ue("setupClone", this), R.eventCanceled || (Z = Lo(A), Z.removeAttribute("id"), Z.draggable = !1, Z.style["will-change"] = "", this._hideClone(), fe(Z, this.options.chosenClass, !1), R.clone = Z), r.cloneId = hn(function() {
      ue("clone", r), !R.eventCanceled && (r.options.removeCloneOnHide || Y.insertBefore(Z, A), r._hideClone(), le({
        sortable: r,
        name: "clone"
      }));
    }), !n && fe(A, o.dragClass, !0), n ? (Ln = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (q(document, "mouseup", r._onDrop), q(document, "touchend", r._onDrop), q(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, A)), z(document, "drop", r), P(A, "transform", "translateZ(0)")), et = !0, r._dragStartId = hn(r._dragStarted.bind(r, n, t)), z(document, "selectstart", r), St = !0, window.getSelection().removeAllRanges(), Ot && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = R.active, d = en === s, f = l.sort, p = ie || u, g, h = this, m = !1;
    if (Er) return;
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
    if (Ln = !1, u && !l.disabled && (d ? f || (a = ee !== Y) : ie === this || (this.lastPutMode = en.checkPull(this, u, A, t)) && s.checkPut(this, u, A, t))) {
      if (g = this._getDirection(t, r) === "vertical", i = ne(A), y("dragOverValid"), R.eventCanceled) return m;
      if (a)
        return ee = Y, C(), this._hideClone(), y("revert"), R.eventCanceled || ($e ? Y.insertBefore(A, $e) : Y.appendChild(A)), S(!0);
      var T = Vr(n, l.draggable);
      if (!T || ks(t, g, this) && !T.animated) {
        if (T === A)
          return S(!1);
        if (T && n === t.target && (r = T), r && (o = ne(r)), rn(Y, n, A, i, r, o, t, !!r) !== !1)
          return C(), T && T.nextSibling ? n.insertBefore(A, T.nextSibling) : n.appendChild(A), ee = n, N(), S(!0);
      } else if (T && Ls(t, g, this)) {
        var E = ut(n, 0, l, !0);
        if (E === A)
          return S(!1);
        if (r = E, o = ne(r), rn(Y, n, A, i, r, o, t, !1) !== !1)
          return C(), n.insertBefore(A, E), ee = n, N(), S(!0);
      } else if (r.parentNode === n) {
        o = ne(r);
        var L = 0, I, M = A.parentNode !== n, k = !_s(A.animated && A.toRect || i, r.animated && r.toRect || o, g), O = g ? "top" : "left", j = ki(r, "top", "top") || ki(A, "top", "top"), J = j ? j.scrollTop : void 0;
        Ge !== r && (I = o[O], Mt = !1, tn = !k && l.invertSwap || M), L = Os(t, r, o, g, k ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, tn, Ge === r);
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
          return (w === 1 || w === -1) && (K = w === 1), Er = !0, setTimeout(Ts, 30), C(), K && !U ? n.appendChild(A) : r.parentNode.insertBefore(A, K ? U : r), j && To(j, 0, J - j.scrollTop), ee = A.parentNode, I !== void 0 && !tn && (pn = Math.abs(I - ne(r)[O])), N(), S(!0);
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
    et = !1, tn = !1, Mt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _r(this.cloneId), _r(this._dragStartId), this.nativeDraggable && (q(document, "drop", this), q(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ot && P(document.body, "user-select", ""), P(A, "transform", ""), t && (St && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), V && V.parentNode && V.parentNode.removeChild(V), (Y === ee || ie && ie.lastPutMode !== "clone") && Z && Z.parentNode && Z.parentNode.removeChild(Z), A && (this.nativeDraggable && q(A, "dragend", this), tr(A), A.style["will-change"] = "", St && !et && fe(A, ie ? ie.options.ghostClass : this.options.ghostClass, !1), fe(A, this.options.chosenClass, !1), le({
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
    ue("nulling", this), Y = A = ee = V = $e = Z = dn = Me = ze = ge = St = de = xe = nt = Nt = Ge = It = ie = en = R.dragged = R.ghost = R.clone = R.active = null, On.forEach(function(t) {
      t.checked = !0;
    }), On.length = Zn = Qn = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        A && (this._onDragOver(t), Cs(t));
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
      n = r[i], we(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Ns(n));
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
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && No(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ue("destroy", this);
    var t = this.el;
    t[ce] = null, q(t, "mousedown", this._onTapStart), q(t, "touchstart", this._onTapStart), q(t, "pointerdown", this._onTapStart), this.nativeDraggable && (q(t, "dragover", this), q(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), kn.splice(kn.indexOf(this.el), 1), this.el = t = null;
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
function Cs(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function rn(e, t, n, r, i, o, a, l) {
  var s, u = e[ce], d = u.options.onMove, f;
  return window.CustomEvent && !ke && !$t ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || ne(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (f = d.call(u, s, a)), f;
}
function tr(e) {
  e.draggable = !1;
}
function Ts() {
  Er = !1;
}
function Ls(e, t, n) {
  var r = ne(ut(n.el, 0, n.options, !0)), i = ko(n.el, n.options, V), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function ks(e, t, n) {
  var r = ne(Vr(n.el, n.options.draggable)), i = ko(n.el, n.options, V), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Os(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, f = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && pn < u * i) {
      if (!Mt && (It === 1 ? s > d + u * o / 2 : s < f - u * o / 2) && (Mt = !0), Mt)
        p = !0;
      else if (It === 1 ? s < d + pn : s > f - pn)
        return -It;
    } else if (s > d + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return xs(t);
  }
  return p = p || a, p && (s < d + u * o / 2 || s > f - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function xs(e) {
  return he(A) < he(e) ? 1 : -1;
}
function Ns(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Is(e) {
  On.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && On.push(r);
  }
}
function hn(e) {
  return setTimeout(e, 0);
}
function _r(e) {
  return clearTimeout(e);
}
Rn && z(document, "touchmove", function(e) {
  (R.active || et) && e.cancelable && e.preventDefault();
});
R.utils = {
  on: z,
  off: q,
  css: P,
  find: Do,
  is: function(t, n) {
    return !!we(t, n, t, !1);
  },
  extend: ms,
  throttle: Co,
  closest: we,
  toggleClass: fe,
  clone: Lo,
  index: he,
  nextTick: hn,
  cancelNextTick: _r,
  detectDirection: xo,
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
R.version = ps;
var te = [], Et, Ar, Dr = !1, nr, rr, xn, _t;
function Ms() {
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
      this.sortable.nativeDraggable ? q(document, "dragover", this._handleAutoScroll) : (q(document, "pointermove", this._handleFallbackAutoScroll), q(document, "touchmove", this._handleFallbackAutoScroll), q(document, "mousemove", this._handleFallbackAutoScroll)), Mi(), mn(), vs();
    },
    nulling: function() {
      xn = Ar = Et = Dr = _t = nr = rr = null, te.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (xn = n, r || this.options.forceAutoScrollFallback || $t || ke || Ot) {
        ir(n, this.options, l, r);
        var s = Re(l, !0);
        Dr && (!_t || o !== nr || a !== rr) && (_t && Mi(), _t = setInterval(function() {
          var u = Re(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, mn()), ir(n, i.options, u, r);
        }, 10), nr = o, rr = a);
      } else {
        if (!this.options.bubbleScroll || Re(l, !0) === Ae()) {
          mn();
          return;
        }
        ir(n, this.options, Re(l, !1), !1);
      }
    }
  }, Le(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function mn() {
  te.forEach(function(e) {
    clearInterval(e.pid);
  }), te = [];
}
function Mi() {
  clearInterval(_t);
}
var ir = Co(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ae(), u = !1, d;
    Ar !== n && (Ar = n, mn(), Et = t.scroll, d = t.scrollFn, Et === !0 && (Et = Re(n, !0)));
    var f = 0, p = Et;
    do {
      var g = p, h = ne(g), m = h.top, y = h.bottom, C = h.left, S = h.right, N = h.width, T = h.height, E = void 0, L = void 0, I = g.scrollWidth, M = g.scrollHeight, k = P(g), O = g.scrollLeft, j = g.scrollTop;
      g === s ? (E = N < I && (k.overflowX === "auto" || k.overflowX === "scroll" || k.overflowX === "visible"), L = T < M && (k.overflowY === "auto" || k.overflowY === "scroll" || k.overflowY === "visible")) : (E = N < I && (k.overflowX === "auto" || k.overflowX === "scroll"), L = T < M && (k.overflowY === "auto" || k.overflowY === "scroll"));
      var J = E && (Math.abs(S - i) <= a && O + N < I) - (Math.abs(C - i) <= a && !!O), W = L && (Math.abs(y - o) <= a && j + T < M) - (Math.abs(m - o) <= a && !!j);
      if (!te[f])
        for (var $ = 0; $ <= f; $++)
          te[$] || (te[$] = {});
      (te[f].vx != J || te[f].vy != W || te[f].el !== g) && (te[f].el = g, te[f].vx = J, te[f].vy = W, clearInterval(te[f].pid), (J != 0 || W != 0) && (u = !0, te[f].pid = setInterval(function() {
        r && this.layer === 0 && R.active._onTouchMove(xn);
        var U = te[this.layer].vy ? te[this.layer].vy * l : 0, K = te[this.layer].vx ? te[this.layer].vx * l : 0;
        typeof d == "function" && d.call(R.dragged.parentNode[ce], K, U, e, xn, te[this.layer].el) !== "continue" || To(te[this.layer].el, K, U);
      }.bind({
        layer: f
      }), 24))), f++;
    } while (t.bubbleScroll && p !== s && (p = Re(p, !1)));
    Dr = u;
  }
}, 30), Po = function(t) {
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
function jr() {
}
jr.prototype = {
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
  drop: Po
};
Le(jr, {
  pluginName: "revertOnSpill"
});
function Hr() {
}
Hr.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Po
};
Le(Hr, {
  pluginName: "removeOnSpill"
});
R.mount(new Ms());
R.mount(Hr, jr);
const rt = /* @__PURE__ */ new WeakMap(), vn = /* @__PURE__ */ new WeakMap();
function Ps(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const on = /* @__PURE__ */ new WeakMap(), Rs = {
  mounted(e, t, n) {
    let r = Ee(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Ps(i), l = i.horizontal ? "horizontal" : "vertical";
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
          let N = y, T = [], E = p.item, L = vn.get(E);
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
}, Vs = {
  mounted(e, t) {
    let n = t.value;
    vn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    vn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (vn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, js = {
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
}, Hs = {
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
}, qs = {
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
}, zs = F("dblclick"), Fs = F("mousedown"), Ws = F("mouseup"), $s = F("mouseenter"), Bs = F("mouseleave"), Us = F("mouseover"), Js = F("mouseout"), Xs = F("mousemove"), Ys = F("contextmenu"), Ks = F("keydown", { isKeyboardEvent: !0 }), Gs = F("keyup", { isKeyboardEvent: !0 }), Zs = F("keypress", { isKeyboardEvent: !0 }), Qs = F("focus"), eu = F("focusin"), tu = F("focusout"), nu = F("touchstart"), ru = F("touchend"), iu = F("touchmove"), ou = F("touchcancel"), au = F("change"), lu = F("input"), su = F("reset"), uu = F("dragstart"), cu = F("dragend"), fu = F("dragenter"), du = F("dragleave"), pu = F("dragover"), hu = F("drop"), mu = F("copy"), vu = F("cut"), gu = F("paste"), yu = F("wheel"), bu = F("resize");
function wu() {
  x("init", Sl), x("submit", El), x("intersect", _l), x("current", Cl), x("ignore", Tl), x("model-livue", xl), x("debounce", os), x("throttle", as), x("blur", Mr), x("enter", Pr), x("boolean", us), x("poll", Ml), x("offline", Rl), x("transition", ml), x("replace", Vl), x("loading", ql), x("target", zl), x("stream", Fl), x("click", Bl), x("navigate", Ul), x("scroll", Jl), x("dirty", Xl), x("watch", Zl), x("sort", Rs), x("sort-item", Vs), x("sort-handle", js), x("sort-ignore", Hs), x("sort-group", qs), x("dblclick", zs), x("mousedown", Fs), x("mouseup", Ws), x("mouseenter", $s), x("mouseleave", Bs), x("mouseover", Us), x("mouseout", Js), x("mousemove", Xs), x("contextmenu", Ys), x("keydown", Ks), x("keyup", Gs), x("keypress", Zs), x("focus", Qs), x("focusin", eu), x("focusout", tu), x("touchstart", nu), x("touchend", ru), x("touchmove", iu), x("touchcancel", ou), x("change", au), x("input", lu), x("reset", su), x("dragstart", uu), x("dragend", cu), x("dragenter", fu), x("dragleave", du), x("dragover", pu), x("drop", hu), x("copy", mu), x("cut", vu), x("paste", gu), x("wheel", yu), x("resize", bu);
}
let Ne = null, yt = null, Pi = !1;
function Su() {
  if (Pi)
    return;
  Pi = !0;
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
function Eu() {
  return Ne || (Su(), Ne = document.createElement("div"), Ne.className = "livue-hmr-indicator", document.body.appendChild(Ne), Ne);
}
function an(e, t) {
  const n = Eu();
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
        Ri();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, yt = setTimeout(function() {
        Ri();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Ri() {
  Ne && Ne.classList.remove("visible");
}
let Je = null, Vn = !0, Ro = !0, At = !0, gn = [];
function _u(e) {
  Je = e;
}
async function Au(e) {
  if (Vn) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), At && an("updating", e.fileName), gn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = Ro ? Du() : null, n = await fetch(window.location.href, {
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
      }), Je.reboot(), t && (await Tu(), Cu(t)), At && an("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), At && an("error");
    }
  }
}
function Du() {
  const e = /* @__PURE__ */ new Map();
  return Je && Je.all().forEach(function(n) {
    if (Vi(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Vi(r, i.name, i.state, e);
      }
  }), e;
}
function Vi(e, t, n, r) {
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
function Cu(e) {
  Je && e.forEach(function(t, n) {
    const r = Je.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function Tu() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Lu() {
  return typeof import.meta < "u" && !1;
}
function ku() {
  Vn = !0;
}
function Ou() {
  Vn = !1;
}
function xu() {
  return Vn;
}
function Nu(e) {
  e.indicator !== void 0 && (At = e.indicator), e.preserveState !== void 0 && (Ro = e.preserveState);
}
function Iu(e) {
  return gn.push(e), function() {
    const t = gn.indexOf(e);
    t !== -1 && gn.splice(t, 1);
  };
}
async function Mu() {
  Je && await Au({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ze = !1, or = [];
class Pu {
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
    this._setupCallbacks.push(t), this.components.size > 0 && this._applySetupCallbackToMountedApps(t);
  }
  /**
   * Apply a newly-registered setup callback to already-mounted Vue apps.
   * This handles late-loaded package scripts that call LiVue.setup()
   * after initial boot.
   *
   * @param {Function} callback
   * @private
   */
  async _applySetupCallbackToMountedApps(t) {
    let n = [];
    if (this.components.forEach(function(r) {
      r && r.vueApp && n.push(r);
    }), n.length !== 0) {
      for (let r = 0; r < n.length; r++)
        try {
          let i = t(n[r].vueApp);
          i && typeof i.then == "function" && await i;
        } catch (i) {
          console.error("[LiVue] Error in setup() callback:", i);
        }
      queueMicrotask(function() {
        n.forEach(function(r) {
          let i = r.vueApp && r.vueApp._instance && r.vueApp._instance.proxy;
          if (i && typeof i.$forceUpdate == "function") {
            i.$forceUpdate();
            return;
          }
          let o = r._rootLivue;
          o && typeof o.$refresh == "function" && o.$refresh();
        });
      });
    }
  }
  /**
   * Register a global error handler.
   * Called when a non-validation error occurs on any component.
   *
   * @param {Function} handler - function(error, componentName)
   */
  onError(t) {
    Ba(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    wu(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), this._processStandaloneLazy(document.body), Aa(this), this._startObserver(), _u(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(t) {
      t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Za());
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
    _a(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return Pn(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    Ia();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Ha();
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
      ...Ga()
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
    let r = new wl(t);
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
    return Kr(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Gr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), ei();
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
    }), ei();
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
      isAvailable: Lu,
      isEnabled: xu,
      enable: ku,
      disable: Ou,
      configure: Nu,
      onUpdate: Iu,
      trigger: Mu
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
      var n = Gr();
      n.forEach(function(r) {
        var i = Kr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        or.push(i);
      });
    } else !t && Ze && (Ze = !1, console.log("[LiVue] Debug mode disabled"), or.forEach(function(r) {
      r();
    }), or = []);
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
const jn = new Pu();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = Xo, document.head.appendChild(e);
}
var ye = window.LiVueConfig || {};
(ye.showProgressBar !== void 0 || ye.progressBarColor !== void 0 || ye.prefetch !== void 0 || ye.prefetchOnHover !== void 0 || ye.hoverDelay !== void 0 || ye.cachePages !== void 0 || ye.maxCacheSize !== void 0 || ye.restoreScroll !== void 0) && jn.configureNavigation(ye);
ye.showProgressOnRequest !== void 0 && jn.progress.configure({ showOnRequest: ye.showProgressOnRequest });
let ji = !1;
function ln() {
  ji || (ji = !0, jn.boot());
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ln, { once: !0 }) : document.readyState === "interactive" ? (document.addEventListener("DOMContentLoaded", ln, { once: !0 }), window.addEventListener("load", ln, { once: !0 })) : queueMicrotask(ln);
window.LiVue = jn;
export {
  jn as default
};
//# sourceMappingURL=livue.esm.js.map
