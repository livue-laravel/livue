import * as $n from "vue";
import { reactive as _e, toRefs as qi, effectScope as zi, ref as Vt, markRaw as Fi, hasInjectionContext as Ho, inject as Wi, isRef as wn, isReactive as Bi, toRaw as $o, getCurrentScope as qo, onScopeDispose as zo, watch as Se, nextTick as In, computed as Ui, provide as Fo, onBeforeUnmount as Wo, onBeforeMount as Bo, onUnmounted as Ji, onMounted as Xi, readonly as Uo, watchEffect as Jo, shallowRef as Tr, defineComponent as Xo, h as qr, createApp as Yo } from "vue";
const Ko = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Yi(e, t) {
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
  return JSON.stringify(e, Yi);
}
function lr(e) {
  return _e(Object.assign({}, e));
}
function Go(e, t) {
  let n;
  for (n in t) {
    let r = zr(e[n]), i = zr(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function Ki(e) {
  return JSON.parse(JSON.stringify(e, Yi));
}
function Zo(e) {
  return qi(e);
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
function Yt(e, t, n) {
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
function Kt(e, t) {
  let n = {}, r = Ki(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function Qo(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function sr(e) {
  if (Qo(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(sr);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = sr(e[n]);
    return t;
  }
  return e;
}
function st(e) {
  let t = {};
  for (let n in e)
    t[n] = sr(e[n]);
  return t;
}
let Fr = 0;
function ea() {
  return Fr++, Fr;
}
let Gi = /* @__PURE__ */ new Map();
function ta(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function na(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Zi(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Gi.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: ta(n)
    });
  });
}
function Qi(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Gi.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && na(n, i.inputs));
  });
}
let eo;
const Mn = (e) => eo = e, to = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function ur(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Tt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Tt || (Tt = {}));
function Wr() {
  const e = zi(!0), t = e.run(() => Vt({}));
  let n = [], r = [];
  const i = Fi({
    install(o) {
      Mn(i), i._a = o, o.provide(to, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const no = () => {
};
function Br(e, t, n, r = no) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && qo() && zo(i), i;
}
function Ye(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const ra = (e) => e(), Ur = /* @__PURE__ */ Symbol(), zn = /* @__PURE__ */ Symbol();
function cr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    ur(i) && ur(r) && e.hasOwnProperty(n) && !wn(r) && !Bi(r) ? e[n] = cr(i, r) : e[n] = r;
  }
  return e;
}
const ia = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function oa(e) {
  return !ur(e) || !Object.prototype.hasOwnProperty.call(e, ia);
}
const { assign: Oe } = Object;
function aa(e) {
  return !!(wn(e) && e.effect);
}
function la(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const d = qi(n.state.value[e]);
    return Oe(d, o, Object.keys(a || {}).reduce((f, p) => (f[p] = Fi(Ui(() => {
      Mn(n);
      const b = n._s.get(e);
      return a[p].call(b, b);
    })), f), {}));
  }
  return s = ro(e, u, t, n, r, !0), s;
}
function ro(e, t, n = {}, r, i, o) {
  let a;
  const l = Oe({ actions: {} }, n), s = { deep: !0 };
  let u, d, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), b;
  const h = r.state.value[e];
  !o && !h && (r.state.value[e] = {}), Vt({});
  let m;
  function y(M) {
    let x;
    u = d = !1, typeof M == "function" ? (M(r.state.value[e]), x = {
      type: Tt.patchFunction,
      storeId: e,
      events: b
    }) : (cr(r.state.value[e], M), x = {
      type: Tt.patchObject,
      payload: M,
      storeId: e,
      events: b
    });
    const k = m = /* @__PURE__ */ Symbol();
    In().then(() => {
      m === k && (u = !0);
    }), d = !0, Ye(f, x, r.state.value[e]);
  }
  const D = o ? function() {
    const { state: x } = n, k = x ? x() : {};
    this.$patch((j) => {
      Oe(j, k);
    });
  } : (
    /* istanbul ignore next */
    no
  );
  function A() {
    a.stop(), f.clear(), p.clear(), r._s.delete(e);
  }
  const O = (M, x = "") => {
    if (Ur in M)
      return M[zn] = x, M;
    const k = function() {
      Mn(r);
      const j = Array.from(arguments), J = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set();
      function F(U) {
        J.add(U);
      }
      function Y(U) {
        X.add(U);
      }
      Ye(p, {
        args: j,
        name: k[zn],
        store: E,
        after: F,
        onError: Y
      });
      let B;
      try {
        B = M.apply(this && this.$id === e ? this : E, j);
      } catch (U) {
        throw Ye(X, U), U;
      }
      return B instanceof Promise ? B.then((U) => (Ye(J, U), U)).catch((U) => (Ye(X, U), Promise.reject(U))) : (Ye(J, B), B);
    };
    return k[Ur] = !0, k[zn] = x, k;
  }, T = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Br.bind(null, p),
    $patch: y,
    $reset: D,
    $subscribe(M, x = {}) {
      const k = Br(f, M, x.detached, () => j()), j = a.run(() => Se(() => r.state.value[e], (J) => {
        (x.flush === "sync" ? d : u) && M({
          storeId: e,
          type: Tt.direct,
          events: b
        }, J);
      }, Oe({}, s, x)));
      return k;
    },
    $dispose: A
  }, E = _e(T);
  r._s.set(e, E);
  const I = (r._a && r._a.runWithContext || ra)(() => r._e.run(() => (a = zi()).run(() => t({ action: O }))));
  for (const M in I) {
    const x = I[M];
    if (wn(x) && !aa(x) || Bi(x))
      o || (h && oa(x) && (wn(x) ? x.value = h[M] : cr(x, h[M])), r.state.value[e][M] = x);
    else if (typeof x == "function") {
      const k = O(x, M);
      I[M] = k, l.actions[M] = x;
    }
  }
  return Oe(E, I), Oe($o(E), I), Object.defineProperty(E, "$state", {
    get: () => r.state.value[e],
    set: (M) => {
      y((x) => {
        Oe(x, M);
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
function sa(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = Ho();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Wi(to, null) : null), a && Mn(a), a = eo, a._s.has(e) || (i ? ro(e, t, r, a) : la(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let jt = /* @__PURE__ */ new Map();
function ua(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function St(e, t, n) {
  return ua(n) === "global" ? t : e + ":" + t;
}
function io(e) {
  return JSON.parse(JSON.stringify(e));
}
function ca(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(io(t));
}
function Lr(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = St(e, t, r), a = jt.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ sa(o, n), definition: n }, jt.set(o, a)), a.useStore(i);
}
function Je(e, t, n, r) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
  let i = n && n.scope ? n.scope : "auto", o = [];
  i === "component" ? o.push(St(e, t, { scope: "component" })) : i === "global" ? o.push(St(e, t, { scope: "global" })) : (o.push(St(e, t, { scope: "component" })), o.push(St(e, t, { scope: "global" })));
  for (let a = 0; a < o.length; a++) {
    let l = jt.get(o[a]);
    if (l)
      return l.useStore(r);
  }
  return null;
}
function fa(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = st(o.state || {}), s = Je(e, o.name, { scope: a }, n);
    if (s) {
      ca(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return io(l);
      }
    }, d = Lr(e, o.name, u, { scope: a }, n);
    r[o.name] = d;
  }
  return r;
}
function da(e) {
  let t = e + ":", n = Array.from(jt.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && jt.delete(n[r]);
}
let oo = {
  ref: Vt,
  computed: Ui,
  watch: Se,
  watchEffect: Jo,
  reactive: _e,
  readonly: Uo,
  onMounted: Xi,
  onUnmounted: Ji,
  onBeforeMount: Bo,
  onBeforeUnmount: Wo,
  nextTick: In,
  provide: Fo,
  inject: Wi
}, fr = Object.keys(oo), pa = fr.map(function(e) {
  return oo[e];
});
function Jr(e) {
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
function ha(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(m) {
    return t[m];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(m) {
    return a[m];
  });
  function u(m) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(m);
  }
  function d(m, y, D) {
    let A = n && n.$id ? n.$id : "", O = n && n._pinia ? n._pinia : void 0;
    if (y === void 0) {
      let T = Je(A, m, D || {}, O);
      if (T)
        return T;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return Lr(A, m, y, D, O);
  }
  function f(m) {
    let y = n && n.$id ? n.$id : "", D = n && n._pinia ? n._pinia : void 0, A = Je(y, m, { scope: "auto" }, D);
    if (!A)
      throw new Error('[LiVue] useStore("' + m + '"): store not found.');
    return A;
  }
  let p = [], b = [];
  function h(m, y) {
    if (!u(m))
      return;
    let D = p.indexOf(m);
    if (D === -1) {
      p.push(m), b.push(y);
      return;
    }
    b[D] = y;
  }
  for (let m = 0; m < fr.length; m++)
    h(fr[m], pa[m]);
  for (let m = 0; m < i.length; m++)
    h(i[m], o[m]);
  for (let m = 0; m < l.length; m++)
    h(l[m], s[m]);
  h("livue", n), h("store", d), h("useStore", f);
  try {
    let y = new (Function.prototype.bind.apply(
      Function,
      [null].concat(p).concat([e])
    ))().apply(null, b);
    return y && typeof y == "object" ? y : null;
  } catch (m) {
    return console.error("[LiVue] Error executing @script setup code:", m), null;
  }
}
function Xr(e) {
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
const Yr = [
  "$refresh",
  "$call",
  "$callWithConfirm",
  "$sync",
  "$set",
  "$toggle",
  "$watch",
  "$dispatch",
  "$dispatchTo",
  "$dispatchSelf",
  "$on",
  "$navigate",
  "$upload",
  "$uploadMultiple",
  "$removeUpload",
  "$stream",
  "$store",
  "$useStore",
  "$useGlobalStore",
  "$isDirty",
  "$getOriginal",
  "$resetProperty",
  "$resetAll",
  "$isLoading",
  "$clearErrors",
  "$onError",
  "$clearError"
];
function ma(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Kr(e) {
  let t = e.replace(/\$errors\b/g, "lvErrors");
  for (let n = 0; n < Yr.length; n++) {
    let r = Yr[n], i = new RegExp(ma(r) + "\\b(?=\\s*\\()", "g");
    t = t.replace(i, "livue." + r);
  }
  return t;
}
function ao(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      ao(e.children[t]);
}
function dr(e, t, n, r, i, o) {
  let a = Jr(e), l = Xr(a.html);
  l = Kr(l), a.html = l;
  let s = $n.compile(a.html), u = Tr(s), d = [], f = !1;
  function p(h, m) {
    let y = u.value;
    f = !0;
    let D;
    try {
      D = y(h, d);
    } finally {
      f = !1;
    }
    return ao(D), D;
  }
  p._rc = !0;
  let b = {
    name: o || "LiVueComponent",
    render: p,
    setup: function() {
      $n.provide("livue", n);
      let h = Zo(t);
      var m = new Proxy(n.errors, {
        get: function(T, E, L) {
          var I = Reflect.get(T, E, L);
          return Array.isArray(I) ? I[0] : I;
        }
      });
      let y = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: m });
      if (a.setupCode) {
        let T = ha(a.setupCode, h, n, r);
        T && Object.assign(y, T);
      }
      var D = {
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
      }, A = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      function O(T) {
        return typeof T != "string" || D[T] || !A.test(T) ? !1 : Array.isArray(n._callableMethods) ? n._callableMethods.indexOf(T) !== -1 : !0;
      }
      return new Proxy(y, {
        get: function(T, E, L) {
          if (E in T || typeof E == "symbol") return Reflect.get(T, E, L);
          if (O(E)) {
            var I = function() {
              var M = Array.prototype.slice.call(arguments);
              if (f) {
                var x = function() {
                  return n.call(E, ...M);
                };
                return Object.defineProperty(x, "__livueMethodName", {
                  value: E,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), Object.defineProperty(x, "__livueMethodArgs", {
                  value: M,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), x;
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
          if (O(E))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(T, E) {
          return !!(E in T || O(E));
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
  return b._updateRender = function(h) {
    let m = Jr(h), y = Xr(m.html);
    y = Kr(y);
    let D = $n.compile(y);
    D !== u.value && (d.length = 0, u.value = D);
  }, b;
}
let We = null;
function ft() {
  if (We)
    return We;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return We = e.getAttribute("content"), We;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (We = decodeURIComponent(t[1]), We) : null;
}
function va() {
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
}, se = null, pr = null, pe = null, Sn = !1, Lt = 0;
function ga(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function ya(e) {
  return (-1 + e) * 100;
}
function lo() {
  if (Sn) return;
  Sn = !0;
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
function ba() {
  if (pe) return;
  lo(), pe = document.createElement("div"), pe.className = "livue-progress-bar livue-progress-hidden", pe.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(oe.parent) || document.body).appendChild(pe);
}
function wa() {
  if (!Sn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), Sn = !1, lo());
}
function Sa(e) {
  Object.assign(oe, e), wa();
}
function Ht() {
  return oe.showOnRequest;
}
function Ea() {
  Lt++, se === null && (ba(), se = 0, pe && pe.classList.remove("livue-progress-hidden"), Pn(oe.minimum), oe.trickle && (pr = setInterval(function() {
    so();
  }, oe.trickleSpeed)));
}
function Pn(e) {
  se !== null && (e = ga(e, oe.minimum, 1), se = e, pe && (pe.style.transform = "translate3d(" + ya(e) + "%, 0, 0)"));
}
function so() {
  if (se === null || se >= 1) return;
  let e;
  se < 0.2 ? e = 0.1 : se < 0.5 ? e = 0.04 : se < 0.8 ? e = 0.02 : se < 0.99 ? e = 5e-3 : e = 0, Pn(se + e);
}
function uo() {
  Lt = Math.max(0, Lt - 1), !(Lt > 0) && se !== null && (Pn(1), clearInterval(pr), pr = null, setTimeout(function() {
    pe && pe.classList.add("livue-progress-hidden"), setTimeout(function() {
      se = null, pe && (pe.style.transform = "translate3d(-100%, 0, 0)");
    }, oe.speed);
  }, oe.speed));
}
function _a() {
  Lt = 0, uo();
}
function Aa() {
  return se !== null;
}
function Da() {
  return se;
}
const je = {
  configure: Sa,
  start: Ea,
  set: Pn,
  trickle: so,
  done: uo,
  forceDone: _a,
  isStarted: Aa,
  getStatus: Da,
  isRequestProgressEnabled: Ht
};
var Et = null, Gr = !1, ot = !1, ve = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ce = /* @__PURE__ */ new Map(), Ue = /* @__PURE__ */ new Map(), hr = /* @__PURE__ */ new WeakMap(), cn = /* @__PURE__ */ new Map(), Pe = null;
function Ca(e) {
  Object.assign(ve, e), e.progressBarColor && je.configure({ color: e.progressBarColor });
}
function Ta(e) {
  Et = e, !Gr && (Gr = !0, Pe = co(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Pe },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (fo(Pe), Pe = t.state.pageKey, Ft(t.state.url, !1, !0));
  }), ka());
}
function co() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function fo(e) {
  if (!(!ve.restoreScroll || !e)) {
    cn.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = cn.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, cn.set(e, i);
      }
    });
  }
}
function La(e) {
  if (!(!ve.restoreScroll || !e)) {
    var t = cn.get(e);
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
function ka() {
  document.addEventListener("click", Oa, !0), ve.prefetch && (document.addEventListener("mouseenter", Na, !0), document.addEventListener("mouseleave", Ia, !0), document.addEventListener("mousedown", Ma, !0), document.addEventListener("focus", Pa, !0));
}
function Oa(e) {
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
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), Ft(n, !0, !1));
      }
    }
  }
}
function xa(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function Na(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = xa(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            Rn(r);
          }, ve.hoverDelay);
          hr.set(t, i);
        }
      }
    }
  }
}
function Ia(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = hr.get(t);
      n && (clearTimeout(n), hr.delete(t));
    }
  }
}
function Ma(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Rn(n);
    }
  }
}
function Pa(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Rn(n);
    }
  }
}
function Rn(e) {
  var t = new URL(e, location.origin).href;
  if (Ue.has(t))
    return Ue.get(t);
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
    return Ue.delete(t), r.ok ? r.text().then(function(i) {
      return ve.cachePages && po(t, i), i;
    }) : null;
  }).catch(function(r) {
    return Ue.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Ue.set(t, n), n;
}
function po(e, t) {
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
function Ra() {
  Ce.clear();
}
function kr(e) {
  ot || !e || !e.url || (e.navigate ? Ft(e.url, !0, !1) : (ot = !0, window.location.href = e.url));
}
async function Ft(e, t, n) {
  if (!ot) {
    if (!Et) {
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
      ot = !0, n || fo(Pe), ve.showProgressBar && je.start();
      try {
        var o, a = Ce.get(r);
        if (a)
          o = a.html;
        else if (Ue.has(r))
          o = await Ue.get(r);
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
          o = await l.text(), ve.cachePages && po(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(D) {
              typeof D == "function" && D(u);
            }
          }
        });
        window.dispatchEvent(d);
        var f = Va(), p = /* @__PURE__ */ new Set();
        f.forEach(function(D) {
          D.livueIds.forEach(function(A) {
            p.add(A);
          });
        }), Et._stopObserver(), Et.destroyExcept(p), f.forEach(function(D) {
          D.element.parentNode && D.element.parentNode.removeChild(D.element);
        });
        var b = u.querySelector("title");
        b && (document.title = b.textContent), document.body.innerHTML = u.body.innerHTML, ja(f);
        var h = u.querySelector('meta[name="csrf-token"]'), m = document.querySelector('meta[name="csrf-token"]');
        if (h && m && (m.setAttribute("content", h.getAttribute("content")), va()), $a(u), Ha(u), qa(u), t && (Pe = co(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Pe },
          "",
          r
        )), za(u), Et.rebootPreserving(), n)
          La(Pe);
        else if (location.hash) {
          var y = document.querySelector(location.hash);
          y ? y.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (D) {
        console.error("[LiVue] Navigation failed:", D), window.location.href = e;
      } finally {
        ot = !1, ve.showProgressBar && je.done();
      }
    }
  }
}
function Va() {
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
function ja(e) {
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
function Ha(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function $a(e) {
  if (!(!e || !e.head || !document.head)) {
    var t = [
      'link[rel="canonical"]',
      'meta[name="description"]',
      'meta[name="robots"]',
      'meta[name="keywords"]',
      'meta[property^="og:"]',
      'meta[name^="twitter:"]'
    ].join(", "), n = document.head.querySelectorAll(t);
    n.forEach(function(i) {
      i.hasAttribute("data-livue-head") || i.remove();
    });
    var r = e.head.querySelectorAll(t);
    r.forEach(function(i) {
      i.hasAttribute("data-livue-head") || document.head.appendChild(i.cloneNode(!0));
    });
  }
}
function qa(e) {
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
function za(e) {
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
function Fa() {
  return ot;
}
var et = /* @__PURE__ */ new Map(), Wa = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Zr(e, t) {
  return typeof e != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", e), function() {
  }) : typeof t != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (et.has(e) || et.set(e, /* @__PURE__ */ new Set()), et.get(e).add(t), function() {
    var n = et.get(e);
    n && (n.delete(t), n.size === 0 && et.delete(e));
  });
}
function me(e, t) {
  var n = et.get(e);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(t);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + e + '" callback:', i);
    }
  });
}
function ho() {
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
function Qr() {
  return Wa.slice();
}
var mr = [], vr = [], $t = !1;
function Ba(e) {
  return e.isolate ? Ja(e) : new Promise(function(t, n) {
    mr.push({
      payload: e,
      resolve: t,
      reject: n
    }), $t || ($t = !0, queueMicrotask(mo));
  });
}
function Ua(e) {
  return new Promise(function(t, n) {
    vr.push({
      payload: e,
      resolve: t,
      reject: n
    }), $t || ($t = !0, queueMicrotask(mo));
  });
}
async function mo() {
  var e = mr, t = vr;
  if (mr = [], vr = [], $t = !1, !(e.length === 0 && t.length === 0)) {
    Ht() && je.start();
    var n = vo(), r = ft(), i = {
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
      for (var p = u.responses || [], b = u.lazyResponses || [], f = 0; f < p.length; f++)
        if (p[f] && p[f].redirect) {
          kr(p[f].redirect);
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
        var h = b[f];
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
        lazyResponses: b,
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
      Ht() && je.done();
    }
  }
}
async function Ja(e) {
  Ht() && je.start();
  var t = vo(), n = ft(), r = {
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
      return kr(s.redirect), new Promise(function() {
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
    Ht() && je.done();
  }
}
function vo() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function Fn(e, t, n, r, i) {
  return Ba({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
let gr = null, go = /* @__PURE__ */ new Map();
function Xa() {
  return _e({});
}
function be(e, t) {
  yr(e);
  for (let n in t)
    e[n] = t[n];
}
function yr(e) {
  for (let t in e)
    delete e[t];
}
function Ya(e) {
  gr = e;
}
function Ke(e, t, n, r) {
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
  }), i ? !0 : (gr ? gr(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function Ka(e, t) {
  typeof t == "function" && go.set(e, t);
}
function br(e) {
  go.delete(e);
}
var yo = [];
function N(e, t, n) {
  yo.push({
    name: e,
    directive: t
  });
}
function Ga() {
  return yo;
}
const Ve = /* @__PURE__ */ new Map(), He = /* @__PURE__ */ new Map();
let ei = !1;
function dt() {
  return typeof window < "u" && window.Echo;
}
function Za(e, t) {
  if (!dt())
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
function bo(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!dt())
    return ei || (ei = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: f } = o, p = Za(a, l);
    if (!p) continue;
    const b = l + ":" + a + ":" + s + ":" + e;
    if (He.has(b)) {
      r.push(b);
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
      Qa(p, s, h);
    else {
      const m = f ? "." + s : s;
      p.listen(m, h);
    }
    He.set(b, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: h,
      isPresenceEvent: d,
      isCustomEvent: f
    }), r.push(b);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      wo(r[i]);
  };
}
function Qa(e, t, n) {
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
function wo(e) {
  const t = He.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    He.delete(e), el(t.channelKey);
  }
}
function ti(e) {
  const t = ":" + e, n = [];
  He.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    wo(n[r]);
}
function el(e) {
  let t = !1;
  if (He.forEach(function(r) {
    r.channelKey === e && (t = !0);
  }), t) return;
  if (Ve.get(e) && dt()) {
    const r = e.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Ve.delete(e);
}
function ni() {
  He.clear(), Ve.forEach(function(e, t) {
    if (dt()) {
      const n = t.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Ve.clear();
}
function tl() {
  return {
    echoAvailable: dt(),
    channels: Array.from(Ve.keys()),
    subscriptions: Array.from(He.keys())
  };
}
function nl() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Ie = /* @__PURE__ */ new Map();
function qt(e, t, n, r) {
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
function fn(e, t, n, r, i, o) {
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
function ri(e) {
  Ie.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Ie.delete(n);
  });
}
function rl(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    fn(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function il(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function Or() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function ol(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = Or();
    s.open("POST", u, !0);
    var d = ft();
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
  var t = Or() + "-remove", n = ft();
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
function al(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = Or();
    u.open("POST", d, !0);
    var f = ft();
    f && u.setRequestHeader("X-CSRF-TOKEN", f), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(p) {
      if (p.lengthComputable) {
        var b = Math.round(p.loaded / p.total * 100);
        i({ overall: b });
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
        var b = new Error(p.error || p.message || "Upload failed");
        b.status = u.status, b.data = p, a(b);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(s);
  });
}
let kt = /* @__PURE__ */ new Map(), Ot = /* @__PURE__ */ new Map();
function ut(e, t) {
  let n = e + ":debounce:" + t;
  if (!kt.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let f = i, p = o, b = a;
          i = null, o = null, a = null, Promise.resolve(f()).then(p).catch(b);
        }, t);
      });
    };
    kt.set(n, l);
  }
  return kt.get(n);
}
function zt(e, t) {
  let n = e + ":throttle:" + t;
  if (!Ot.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < t ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    Ot.set(n, i);
  }
  return Ot.get(n);
}
function ii(e) {
  let t = e + ":";
  for (let n of kt.keys())
    n.startsWith(t) && kt.delete(n);
  for (let n of Ot.keys())
    n.startsWith(t) && Ot.delete(n);
}
const En = "livue-tab-sync";
let xr = Date.now() + "-" + Math.random().toString(36).substr(2, 9), _n = null, Nr = /* @__PURE__ */ new Map(), oi = !1;
function So() {
  oi || (oi = !0, typeof BroadcastChannel < "u" ? (_n = new BroadcastChannel(En), _n.onmessage = ll) : window.addEventListener("storage", sl));
}
function ll(e) {
  let t = e.data;
  t.tabId !== xr && Eo(t);
}
function sl(e) {
  if (e.key === En && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === xr) return;
      Eo(t);
    } catch {
    }
}
function Eo(e) {
  let t = Nr.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function ul(e, t) {
  So(), Nr.set(e, t);
}
function ai(e) {
  Nr.delete(e);
}
function cl(e, t, n, r) {
  So();
  let i = {
    tabId: xr,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (_n)
    _n.postMessage(i);
  else
    try {
      localStorage.setItem(En, JSON.stringify(i)), localStorage.removeItem(En);
    } catch {
    }
}
function fl(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const Ir = /* @__PURE__ */ new Map();
async function dl(e, t = {}) {
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
        "X-CSRF-TOKEN": ft(),
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
      for (const b of p)
        if (b.trim())
          try {
            const h = JSON.parse(b);
            if (h.stream)
              pl(h.stream), n(h.stream);
            else {
              if (h.error)
                throw new Error(h.error);
              h.snapshot && (u = h);
            }
          } catch (h) {
            console.error("[LiVue Stream] Parse error:", h, b);
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
function pl(e) {
  const { to: t, content: n, replace: r } = e, i = Ir.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function li(e, t, n = !1) {
  Ir.set(e, { el: t, replace: n });
}
function si(e) {
  Ir.delete(e);
}
function hl(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function Mr(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    hl(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = Mr(r) : t[n] = r;
  }
  return t;
}
function ml(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Mr(l), d = {};
    for (let f in s)
      d[f] = /* @__PURE__ */ (function(p, b) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return t(p + "." + b, h);
        };
      })(a, f);
    i[a] = _e(Object.assign({}, u, d));
  }
  return i;
}
function vl(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = Mr(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function gl(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function yl(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function wr(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = Xa(), u = n.name, d = n.vueMethods || {}, f = n.jsonMethods || [], p = n.confirms || {}, b = Array.isArray(n.methods) ? n.methods.slice() : null, h = n.isolate || !1, m = n.urlParams || null, y = n.uploads || null, D = n.tabSync || null, A = !1, O = i, T = o, E = a.initialHtml || null, L = _e({}), I = [];
  function M() {
    for (let c = 0; c < I.length; c++)
      try {
        I[c]();
      } catch {
      }
    I = [];
  }
  function x(c) {
    if (M(), !!Array.isArray(c))
      for (let g = 0; g < c.length; g++) {
        let w = c[g];
        if (!w || typeof w != "object" || !w.bridge || typeof w.bridge != "object") continue;
        let C = Je(e, w.name, { scope: w.scope || "auto" }, l);
        if (!C) continue;
        let v = w.bridge;
        for (let H in v) {
          let W = v[H];
          if (!W || typeof W != "object") continue;
          let te = W.prop, Q = W.mode || "two-way";
          if (!(!te || !(te in t))) {
            if (Q === "two-way" || Q === "store-to-state") {
              let G = Se(function() {
                return C[H];
              }, function(qe) {
                t[te] !== qe && (t[te] = qe);
              });
              I.push(G);
            }
            if (Q === "two-way" || Q === "state-to-store") {
              let G = Se(function() {
                return t[te];
              }, function(qe) {
                C[H] !== qe && (C[H] = qe);
              });
              I.push(G);
            }
          }
        }
      }
  }
  function k(c) {
    let g = fa(e, c, l);
    for (let w in g)
      L[w] = g[w];
    x(c);
  }
  k(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    M(), da(e);
  });
  function j(c) {
    let g = document.querySelector('meta[name="livue-prefix"]'), C = "/" + (g ? g.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(c.token), v = document.createElement("a");
    v.href = C, v.download = c.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function J() {
    let c = Kt(O, t);
    return {
      snapshot: T,
      diffs: c
    };
  }
  function X(c, g) {
    if (c.redirect) {
      kr(c.redirect);
      return;
    }
    if (c.errorBoundary) {
      let v = c.errorBoundary;
      S.errorState.hasError = v.hasError, S.errorState.errorMessage = v.errorMessage, S.errorState.errorDetails = v.errorDetails, S.errorState.recover = v.recover, (!v.errorHandled || !v.recover) && me("error.occurred", {
        error: new Error(v.errorMessage || "Component error"),
        componentName: u,
        componentId: e,
        context: { method: v.errorMethod, serverHandled: v.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (c.download && j(c.download), c.snapshot) {
      let v = JSON.parse(c.snapshot);
      if (v.state) {
        let H = st(v.state);
        Go(t, H), O = JSON.parse(JSON.stringify(H));
      }
      T = c.snapshot, v.memo && (v.memo.errors ? be(S.errors, v.memo.errors) : yr(S.errors), v.memo.vueMethods && (d = v.memo.vueMethods), v.memo.jsonMethods && (f = v.memo.jsonMethods), v.memo.urlParams && (m = v.memo.urlParams), v.memo.uploads && (y = v.memo.uploads), v.memo.confirms && (p = v.memo.confirms), Object.prototype.hasOwnProperty.call(v.memo, "methods") && (b = Array.isArray(v.memo.methods) ? v.memo.methods.slice() : null, S._callableMethods = b), (v.memo.composables || v.memo.composableActions) && vl(B, v.memo), v.memo.stores && k(v.memo.stores));
    }
    if (m && il(m, t), (c.html || c.fragments) && r && r._updateTemplate) {
      let v = {};
      if (c.snapshot) {
        let H = JSON.parse(c.snapshot);
        H.memo && (H.memo.transitionType && (v.transitionType = H.memo.transitionType), H.memo.skipTransition && (v.skipTransition = !0));
      }
      if (c.fragments) {
        let H = E || (a.el ? a.el.innerHTML : null);
        if (H) {
          let W = yl(H, c.fragments);
          E = W, r._updateTemplate(W, v);
        }
      } else
        E = c.html, r._updateTemplate(c.html, v);
    }
    if (c.events && c.events.length > 0) {
      for (var w = 0; w < c.events.length; w++)
        c.events[w].sourceId = e;
      rl(c.events);
    }
    if (c.js && c.js.length > 0)
      for (var C = 0; C < c.js.length; C++)
        try {
          new Function("state", "livue", c.js[C])(t, S);
        } catch (v) {
          console.error("[LiVue] Error executing ->vue() JS:", v);
        }
    if (c.benchmark && me("benchmark.received", {
      componentId: e,
      componentName: u,
      timings: c.benchmark
    }), D && D.enabled && c.snapshot && !A && JSON.parse(c.snapshot).state) {
      let H = Ki(t), W = [];
      for (let te in H)
        (!g || !(te in g)) && W.push(te);
      if (W.length > 0) {
        let te = fl(H, W, D);
        Object.keys(te).length > 0 && cl(u, te, W, D);
      }
    }
    if (A = !1, c.jsonResult !== void 0)
      return c.jsonResult;
  }
  let F = _e({}), Y = {}, B = {}, U = function(c, g) {
    return S.call(c, g);
  };
  gl(n) && (B = ml(n, U));
  let S = _e({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: F,
    refs: {},
    stores: L,
    _pinia: l,
    _callableMethods: b,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(c) {
      let g = Kt(O, t);
      return c === void 0 ? Object.keys(g).length > 0 : c in g;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let c = Kt(O, t);
      return new Set(Object.keys(c));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(c) {
      return c === void 0 ? JSON.parse(JSON.stringify(O)) : O[c] !== void 0 ? JSON.parse(JSON.stringify(O[c])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(c) {
      c in O && (t[c] = JSON.parse(JSON.stringify(O[c])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let c in O)
        c in t && (t[c] = JSON.parse(JSON.stringify(O[c])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(c) {
      return c ? F[c] || !1 : S.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(c) {
      let g = c ? F[c] || !1 : S.loading;
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
    call: async function(c, g, w) {
      let C, v = null;
      if (arguments.length === 1 ? C = [] : arguments.length === 2 ? Array.isArray(g) ? C = g : C = [g] : arguments.length >= 3 && (Array.isArray(g) && w && typeof w == "object" && (w.debounce || w.throttle) ? (C = g, v = w) : C = Array.prototype.slice.call(arguments, 1)), Y[c])
        return Y[c](S, C);
      if (d[c]) {
        try {
          new Function("state", "livue", d[c])(t, S);
        } catch (te) {
          console.error('[LiVue] Error executing #[Vue] method "' + c + '":', te);
        }
        return;
      }
      let H = f.includes(c), W = async function() {
        if (p[c] && !await S._showConfirm(p[c]))
          return;
        S.loading = !0, S.processing = c, F[c] = !0;
        let te;
        try {
          let Q = J(), G = await Fn(Q.snapshot, c, C, Q.diffs, h || H);
          te = X(G, Q.diffs);
        } catch (Q) {
          if (H)
            throw { status: Q.status, errors: Q.data && Q.data.errors, message: Q.message };
          Q.status === 422 && Q.data && Q.data.errors ? be(S.errors, Q.data.errors) : Ke(Q, u);
        } finally {
          S.loading = !1, S.processing = null, delete F[c];
        }
        return te;
      };
      return v && v.debounce ? ut(e + ":" + c, v.debounce)(W) : v && v.throttle ? zt(e + ":" + c, v.throttle)(W) : W();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(c, g) {
      let w = Array.prototype.slice.call(arguments, 2), C = { message: g || "Are you sure?" };
      if (await S._showConfirm(C))
        return S.call.apply(S, [c].concat(w));
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
    set: function(c, g) {
      t[c] = g;
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
    store: function(c, g, w) {
      if (g === void 0) {
        let C = Je(e, c, w || { scope: "auto" }, l);
        if (C)
          return C;
        throw new Error('[LiVue] store("' + c + '"): store not found. Provide a definition or register it in PHP.');
      }
      return Lr(e, c, g, w, l);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(c) {
      let g = Je(e, c, { scope: "auto" }, l);
      if (g)
        return L[c] = g, g;
      throw new Error('[LiVue] useStore("' + c + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(c) {
      let g = Je(e, c, { scope: "global" }, l);
      if (g)
        return L[c] = g, g;
      throw new Error('[LiVue] useGlobalStore("' + c + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      S.loading = !0, S.processing = "$sync";
      try {
        let c = J(), g = await Fn(c.snapshot, null, [], c.diffs, h);
        X(g, c.diffs);
      } catch (c) {
        c.status === 422 && c.data && c.data.errors ? be(S.errors, c.data.errors) : Ke(c, u);
      } finally {
        S.loading = !1, S.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      yr(S.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(c, g) {
      fn(c, g, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(c, g, w) {
      fn(g, w, "to", u, e, c);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(c, g) {
      fn(c, g, "self", u, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(c) {
      Ft(c, !0);
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
    upload: async function(c, g) {
      if (!y || !y[c]) {
        console.error('[LiVue] Property "' + c + '" is not configured for uploads.');
        return;
      }
      var w = qn(t, c);
      w && w.__livue_upload && w.ref && Wn([w.ref]), S.uploading = !0, S.uploadProgress = 0;
      try {
        var C = await ol(g, u, c, y[c].token, function(v) {
          S.uploadProgress = v;
        });
        Yt(t, c, {
          __livue_upload: !0,
          ref: C.ref,
          originalName: C.originalName,
          mimeType: C.mimeType,
          size: C.size,
          previewUrl: C.previewUrl
        });
      } catch (v) {
        v.status === 422 && v.data && v.data.errors ? be(S.errors, v.data.errors) : Ke(v, u);
      } finally {
        S.uploading = !1, S.uploadProgress = 0;
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
    uploadMultiple: async function(c, g) {
      if (!y || !y[c]) {
        console.error('[LiVue] Property "' + c + '" is not configured for uploads.');
        return;
      }
      S.uploading = !0, S.uploadProgress = 0;
      try {
        var w = await al(g, u, c, y[c].token, function(G) {
          S.uploadProgress = G.overall;
        }), C = w.results || [], v = w.errors || [], H = qn(t, c), W = Array.isArray(H) ? H : [];
        if (C.length > 0) {
          var te = C.map(function(G) {
            return {
              __livue_upload: !0,
              ref: G.ref,
              originalName: G.originalName,
              mimeType: G.mimeType,
              size: G.size,
              previewUrl: G.previewUrl
            };
          });
          Yt(t, c, W.concat(te));
        }
        if (v.length > 0) {
          var Q = {};
          v.forEach(function(G) {
            var qe = c + "." + G.index;
            Q[qe] = {
              file: G.file,
              message: G.error
            };
          }), be(S.errors, Q);
        }
      } catch (G) {
        G.status === 422 && G.data && G.data.errors ? be(S.errors, G.data.errors) : Ke(G, u);
      } finally {
        S.uploading = !1, S.uploadProgress = 0;
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
    removeUpload: function(c, g) {
      var w = qn(t, c);
      if (g !== void 0 && Array.isArray(w)) {
        var C = w[g];
        C && C.__livue_upload && C.ref && Wn([C.ref]), w.splice(g, 1), Yt(t, c, w.slice());
      } else
        w && w.__livue_upload && w.ref && Wn([w.ref]), Yt(t, c, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(c, g) {
      g = g || [], S.loading = !0, S.streaming = !0, S.processing = c, S.streamingMethod = c, F[c] = !0;
      let w;
      try {
        let C = J();
        C.method = c, C.params = g, C.componentId = e;
        let v = await dl(C, {
          onChunk: function(H) {
          },
          onComplete: function(H) {
          },
          onError: function(H) {
            console.error("[LiVue Stream] Error:", H);
          }
        });
        v && (w = X(v, C.diffs));
      } catch (C) {
        C.status === 422 && C.data && C.data.errors ? be(S.errors, C.data.errors) : Ke(C, u);
      } finally {
        S.loading = !1, S.streaming = !1, S.processing = null, S.streamingMethod = null, delete F[c];
      }
      return w;
    },
    /**
     * Toggle a boolean property.
     * @param {string} property - Property name to toggle
     */
    toggle: function(c) {
      c in t && (t[c] = !t[c]);
    },
    /**
     * Register a client-side event listener on the LiVue event bus.
     * Returns an unsubscribe function.
     *
     * @param {string} eventName
     * @param {Function} handler - function(data)
     * @returns {Function}
     */
    on: function(c, g) {
      return typeof c != "string" || c.length === 0 ? (console.warn("[LiVue] on() requires a non-empty event name"), function() {
      }) : typeof g != "function" ? (console.warn("[LiVue] on() handler must be a function"), function() {
      }) : qt(c, u, e, g);
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
    watch: function(c, g) {
      return typeof g != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Se(
        function() {
          return t[c];
        },
        function(w, C) {
          g(w, C);
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
      }) : (Ka(e, c), function() {
        br(e);
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
      S.errorState.hasError = !1, S.errorState.errorMessage = null, S.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(c, g) {
      O = JSON.parse(JSON.stringify(c)), T = g;
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
      let c = Kt(O, t), g = {};
      for (let w in B) {
        let C = B[w], v = {}, H = [];
        for (let W in C)
          if (typeof C[W] == "function")
            H.push(W);
          else
            try {
              v[W] = JSON.parse(JSON.stringify(C[W]));
            } catch {
              v[W] = "[Unserializable]";
            }
        g[w] = { data: v, actions: H };
      }
      return {
        serverState: JSON.parse(JSON.stringify(O)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(c),
        diffs: c,
        memo: {
          name: u,
          isolate: h,
          urlParams: m,
          tabSync: D,
          hasUploads: !!y,
          uploadProps: y ? Object.keys(y) : [],
          vueMethods: Object.keys(d),
          confirmMethods: Object.keys(p),
          composableNames: Object.keys(B)
        },
        composables: g,
        uploading: S.uploading,
        uploadProgress: S.uploadProgress,
        streaming: S.streaming,
        streamingMethod: S.streamingMethod,
        errorState: {
          hasError: S.errorState.hasError,
          errorMessage: S.errorState.errorMessage
        }
      };
    }
  });
  for (let c in B)
    S[c] = B[c];
  async function pt() {
    S.loading = !0, S.processing = "$refresh", F.$refresh = !0;
    try {
      let c = J(), g = await Fn(c.snapshot, null, [], c.diffs, h);
      return X(g, c.diffs);
    } catch (c) {
      c.status === 422 && c.data && c.data.errors ? be(S.errors, c.data.errors) : Ke(c, u);
    } finally {
      S.loading = !1, S.processing = null, delete F.$refresh;
    }
  }
  Y.$refresh = function() {
    return pt();
  }, D && D.enabled && ul(u, function(c, g, w) {
    let C = !1;
    if (w.reactive === !0)
      C = !0;
    else if (Array.isArray(w.reactive) && w.reactive.length > 0) {
      for (let v in c)
        if (w.reactive.includes(v)) {
          C = !0;
          break;
        }
    }
    if (C) {
      for (let v in c)
        w.only && !w.only.includes(v) || w.except && w.except.includes(v) || v in t && (t[v] = c[v]);
      A = !0, S.sync();
      return;
    }
    for (let v in c)
      w.only && !w.only.includes(v) || w.except && w.except.includes(v) || v in t && (t[v] = c[v]);
    for (let v in c)
      w.only && !w.only.includes(v) || w.except && w.except.includes(v) || (O[v] = JSON.parse(JSON.stringify(c[v])));
  });
  var ht = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(S, {
    get: function(c, g, w) {
      if (g in c || typeof g == "symbol")
        return Reflect.get(c, g, w);
      if (typeof g == "string" && g.startsWith("$")) {
        if (Y[g])
          return function() {
            var H = Array.prototype.slice.call(arguments);
            return Y[g](S, H);
          };
        var C = g.slice(1);
        if (C) {
          var v = Reflect.get(c, C, w);
          if (typeof v == "function")
            return function() {
              var H = Array.prototype.slice.call(arguments);
              return v.apply(c, H);
            };
        }
      }
      if (typeof g == "string" && !g.startsWith("$") && !ht[g])
        return function() {
          var H = Array.prototype.slice.call(arguments);
          return S.call(g, ...H);
        };
    },
    set: function(c, g, w, C) {
      return Reflect.set(c, g, w, C);
    },
    has: function(c, g) {
      if (typeof g == "string" && g.startsWith("$")) {
        if (Y[g])
          return !0;
        var w = g.slice(1);
        if (w) {
          var C = Reflect.get(c, w, c);
          if (typeof C == "function")
            return !0;
        }
      }
      return Reflect.has(c, g);
    }
  }), composables: B };
}
function An(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
function dn(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", f = JSON.parse(d), p = f.memo ? f.memo.name : "", b = st(f.state || {}), h = f.memo || {}, m = s.innerHTML, y = s.tagName.toLowerCase(), D = s.nextElementSibling;
    for (; D; ) {
      let k = D.nextElementSibling;
      if (D.tagName === "SCRIPT" && D.getAttribute("type") === "application/livue-setup")
        m += D.outerHTML, D.parentNode.removeChild(D);
      else
        break;
      D = k;
    }
    let A = t._childRegistry[u];
    if (!A)
      for (let k in t._childRegistry) {
        let j = t._childRegistry[k];
        if (j.name === p && !o[k]) {
          A = j;
          break;
        }
      }
    if (A) {
      o[A.id] = !0, A.rootTag = y;
      let k = h.reactive || [];
      if (k.length > 0) {
        for (var O = 0; O < k.length; O++) {
          var T = k[O];
          T in b && (A.state[T] = b[T]);
        }
        A.livue._updateServerState(b, d), A.componentRef && A.componentRef._updateTemplate && A.componentRef._updateTemplate(m);
      }
    }
    let E = !A;
    if (!A) {
      let j = "livue-child-" + ea();
      t._versions[j] = 0;
      let J = lr(b), X = JSON.parse(JSON.stringify(b)), F = Object.assign({ name: h.name || p }, h), Y = { _updateTemplate: null }, B = ho(), U = wr(u, J, F, Y, X, d, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: B,
        pinia: t._pinia || null
      }), S = U.livue, pt = U.composables;
      me("component.init", {
        component: { id: u, name: p, state: J, livue: S },
        el: s,
        cleanup: B.cleanup,
        isChild: !0
      });
      let ht = h.errors || null;
      ht && be(S.errors, ht), A = {
        tagName: j,
        state: J,
        memo: F,
        livue: S,
        composables: pt,
        componentRef: Y,
        name: p,
        id: u,
        rootTag: y
      };
      let $e = h.listeners || null;
      if ($e)
        for (let g in $e)
          (function(w, C) {
            qt(g, p, u, function(v) {
              C.call(w, v);
            });
          })($e[g], S);
      let c = h.echo || null;
      c && c.length && (function(g, w) {
        bo(g, c, function(C, v) {
          w.call(C, v);
        });
      })(u, S), Y._updateTemplate = function(g) {
        let w = t.el.querySelector('[data-livue-id="' + u + '"]');
        w && Zi(w);
        let C = dn(g, t), v = An(
          "<" + A.rootTag + ">" + C.template + "</" + A.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let W in C.childDefs)
          t.vueApp._context.components[W] || t.vueApp.component(W, C.childDefs[W]);
        t.vueApp._context.components[A.tagName]._updateRender(v), In(function() {
          let W = t.el.querySelector('[data-livue-id="' + u + '"]');
          W && Qi(W);
        });
      }, t._childRegistry[u] = A;
    }
    let L = A.tagName, I = s.dataset.livueRef;
    I && t._rootLivue && (t._rootLivue.refs[I] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(k, j) {
        return A.livue.call(k, j || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(k, j) {
        return A.livue.set(k, j);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(k, j) {
        return A.livue.dispatch(k, j);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return A.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return A.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return A.livue;
      }
    });
    let M = s.dataset.livueModel;
    if (M && t._rootState && qt("$modelUpdate", A.name, u, function(k) {
      k && k.value !== void 0 && (t._rootState[M] = k.value);
    }), E) {
      let k = An(
        "<" + y + ">" + m + "</" + y + ">",
        'data-livue-id="' + u + '"'
      );
      i[L] = dr(
        k,
        A.state,
        A.livue,
        A.composables || {},
        t._versions,
        A.name
      );
    }
    t._versions[L] === void 0 && (t._versions[L] = 0);
    let x = document.createElement(L);
    x.setAttribute(":key", "livueV['" + L + "']"), s.parentNode.replaceChild(x, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let ui = 0;
function Sr() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Bn = /* @__PURE__ */ new WeakMap();
function ci() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const bl = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (ui++, r = "livue-transition-" + ui), Bn.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), Sr() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    ci();
  },
  updated(e, t) {
    let n = Bn.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), Sr() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    Bn.delete(e), e.removeAttribute("data-livue-transition"), ci();
  }
};
function wl(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function Sl(e) {
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
function El(e, t) {
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
let Un = 0;
function _l(e) {
  return Xo({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = Vt(!1), i = Tr(null), o = null, a = Vt(null);
      async function l() {
        if (!r.value)
          try {
            let u = await Ua({
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
        Un++;
        let f = "lazy-" + Un + "-" + Date.now(), p = d.memo ? d.memo.name : "", b = st(d.state || {}), h = d.memo || {}, { createLivueHelper: m, buildComponentDef: y, processTemplate: D, createReactiveState: A } = e._lazyHelpers, O = A(b), T = JSON.parse(JSON.stringify(b)), E = { _updateTemplate: null }, L = m(
          f,
          O,
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
        let x = "livue-lazy-child-" + Un, k = D(u.html, e), j = An(
          k.template,
          'data-livue-id="' + f + '"'
        ), J = y(
          j,
          O,
          I,
          M,
          e._versions,
          p
        );
        e._childRegistry[f] = {
          tagName: x,
          state: O,
          memo: h,
          livue: I,
          componentRef: E,
          name: p,
          id: f
        }, E._updateTemplate = function(F) {
          let Y = D(F, e), B = An(
            Y.template,
            'data-livue-id="' + f + '"'
          );
          for (let S in Y.childDefs)
            e.vueApp._context.components[S] || e.vueApp.component(S, Y.childDefs[S]);
          let U = y(
            B,
            O,
            I,
            M,
            e._versions,
            p
          );
          e.vueApp._context.components[x] = U, e._versions[x] = (e._versions[x] || 0) + 1, i.value = U;
        };
        let X = h.listeners || null;
        if (X)
          for (let F in X)
            (function(Y, B) {
              qt(F, p, f, function(U) {
                B.call(Y, U);
              });
            })(X[F], I);
        for (let F in k.childDefs)
          e.vueApp._context.components[F] || e.vueApp.component(F, k.childDefs[F]);
        e._versions[x] = 0, e.vueApp._context.components[x] || e.vueApp.component(x, J), i.value = J, r.value = !0;
      }
      return Xi(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Ji(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? qr(i.value) : qr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class Al {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(t) {
    this.el = t, this.componentId = t.dataset.livueId;
    let n = t.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = lr(st(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = _e({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: wr,
      buildComponentDef: dr,
      processTemplate: dn,
      createReactiveState: lr
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
        var D = Sl(r.el);
        Zi(r.el);
        let A = dn(m, r);
        if (!r.vueApp) return;
        for (let T in A.childDefs)
          r.vueApp._context.components[T] || r.vueApp.component(T, A.childDefs[T]);
        function O() {
          r._currentRootDef._updateRender(A.template), In(function() {
            Qi(r.el), El(r.el, D), me("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (y.skipTransition) {
          O();
          return;
        }
        Sr() ? wl(O, { type: y.transitionType }) : O();
      }
    }, o = JSON.parse(JSON.stringify(st(t.state || {})));
    this._cleanups = ho(), this._pinia = Wr();
    let a = wr(this.componentId, this.state, this.memo, i, o, n, {
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
    let u = dn(this.el.innerHTML, this), d = t.memo && t.memo.errors || null;
    d && be(l.errors, d);
    let f = t.memo && t.memo.listeners || null;
    if (f)
      for (let m in f)
        (function(y, D, A, O) {
          qt(m, A, O, function(T) {
            D.call(y, T);
          });
        })(f[m], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = bo(r.componentId, p, function(m, y) {
      l.call(m, y);
    }));
    let b = dr(u.template, r.state, l, s, r._versions, r.name);
    this._currentRootDef = b, this._rootDefRef = Tr(b), this.vueApp = Yo({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", _l(this)), this._applyPluginsAndMount();
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
    let i = Ga();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), ri(t), ii(t), br(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && ai(n.name), ti(t);
    }
    if (me("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), ri(this.componentId), ii(this.componentId), br(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && ai(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), ti(this.componentId), this.vueApp) {
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
let fi = /* @__PURE__ */ new Set();
const Dl = {
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
    fi.has(u) || (fi.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Jn = /* @__PURE__ */ new WeakMap(), Cl = {
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
    e.addEventListener("submit", l), Jn.set(e, l);
  },
  unmounted(e) {
    let t = Jn.get(e);
    t && (e.removeEventListener("submit", t), Jn.delete(e));
  }
}, Gt = /* @__PURE__ */ new WeakMap(), Tl = {
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
    let f = l.leave === !0, p = !1, b = new IntersectionObserver(
      function(h) {
        let m = h[0];
        (f ? !m.isIntersecting : m.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (b.disconnect(), Gt.delete(e)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    b.observe(e), Gt.set(e, b);
  },
  unmounted(e) {
    let t = Gt.get(e);
    t && (t.disconnect(), Gt.delete(e));
  }
};
var Dn = /* @__PURE__ */ new Set(), nt = /* @__PURE__ */ new WeakMap(), di = !1;
function at(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function Ll(e, t) {
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
function Er(e) {
  var t = nt.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = Ll(n, i);
      if (typeof r == "object" && r !== null) {
        var a = r.active ? at(r.active) : [], l = r.inactive ? at(r.inactive) : [];
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
        var s = at(r);
        o ? (s.forEach(function(u) {
          e.classList.add(u);
        }), e.setAttribute("data-current", ""), e.setAttribute("aria-current", "page")) : (s.forEach(function(u) {
          e.classList.remove(u);
        }), e.removeAttribute("data-current"), e.removeAttribute("aria-current"));
      }
    }
  }
}
function pi() {
  Dn.forEach(function(e) {
    e.isConnected ? Er(e) : (Dn.delete(e), nt.delete(e));
  });
}
function kl() {
  di || (di = !0, window.addEventListener("popstate", pi), window.addEventListener("livue:navigated", pi));
}
const Ol = {
  mounted(e, t) {
    nt.set(e, { value: t.value, modifiers: t.modifiers || {} }), Dn.add(e), kl(), Er(e);
  },
  updated(e, t) {
    nt.set(e, { value: t.value, modifiers: t.modifiers || {} }), Er(e);
  },
  unmounted(e) {
    var t = nt.get(e);
    if (t) {
      var n = t.value;
      if (typeof n == "object" && n !== null) {
        var r = n.active ? at(n.active) : [], i = n.inactive ? at(n.inactive) : [];
        r.forEach(function(o) {
          e.classList.remove(o);
        }), i.forEach(function(o) {
          e.classList.remove(o);
        });
      } else typeof n == "string" && at(n).forEach(function(o) {
        e.classList.remove(o);
      });
    }
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), Dn.delete(e), nt.delete(e);
  }
};
let hi = 0;
const xl = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    hi++;
    let n = "livue-ignore-" + hi;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, mt = /* @__PURE__ */ new WeakMap();
let mi = 0;
function Nl(e) {
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
function Il(e) {
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
function Zt(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function vi(e, t) {
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
function Ml(e) {
  return !!e.component;
}
const Pl = {
  mounted(e, t, n) {
    let r = Nl(n);
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
    mi++;
    let s = "model-" + mi, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: f } = Il(l);
    l.live && !d && !f && (d = 150);
    function p(E) {
      if (l.number) {
        let L = Number(E);
        E = isNaN(L) ? 0 : L;
      }
      l.boolean && (E = !!E && E !== "false" && E !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = E : o[a] = E;
    }
    function b(E) {
      d > 0 ? ut(s, d)(function() {
        p(E);
      }) : f > 0 ? zt(s, f)(function() {
        p(E);
      }) : p(E);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let m = Ml(n), y = n.component, D = null, A = null, O = null, T = null;
    if (m && y)
      T = y.emit, y.emit = function(E, ...L) {
        if (E === "update:modelValue") {
          let I = L[0];
          b(I);
          return;
        }
        return T.call(y, E, ...L);
      }, y.props && "modelValue" in y.props && (O = Se(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(E) {
          y.vnode && y.vnode.props && (y.vnode.props.modelValue = E), y.exposed && typeof y.exposed.setValue == "function" && y.exposed.setValue(E), y.update && y.update();
        },
        { immediate: !0 }
      )), mt.set(e, {
        isComponent: !0,
        componentInstance: y,
        originalEmit: T,
        stopWatcher: O,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let E = ut(s, d);
        D = function(L) {
          let I = Zt(L.target);
          E(function() {
            p(I);
          });
        };
      } else if (f > 0) {
        let E = zt(s, f);
        D = function(L) {
          let I = Zt(L.target);
          E(function() {
            p(I);
          });
        };
      } else
        D = function(E) {
          p(Zt(E.target));
        };
      l.enter ? (A = function(E) {
        E.key === "Enter" && p(Zt(E.target));
      }, e.addEventListener("keyup", A)) : e.addEventListener(u, D), vi(e, h), mt.set(e, {
        isComponent: !1,
        handler: D,
        keyHandler: A,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(e, t, n) {
    let r = mt.get(e);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], vi(e, a);
    }
  },
  unmounted(e) {
    let t = mt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), mt.delete(e));
  }
}, Xn = /* @__PURE__ */ new WeakMap(), Rl = 2500;
function Vl(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Rl;
}
const jl = {
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = Vl(l), u = l["keep-alive"] === !0, d = l.visible === !0, f = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      f.isPaused || d && !f.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function b() {
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
    ), f.observer.observe(e)), document.addEventListener("visibilitychange", h), f.visibilityHandler = h, b(), Xn.set(e, f);
  },
  unmounted(e) {
    let t = Xn.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), Xn.delete(e));
  }
}, Qt = /* @__PURE__ */ new WeakMap();
let Cn = typeof navigator < "u" ? navigator.onLine : !0, Tn = /* @__PURE__ */ new Set(), gi = !1;
function Hl() {
  gi || typeof window > "u" || (gi = !0, window.addEventListener("online", function() {
    Cn = !0, Tn.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    Cn = !1, Tn.forEach(function(e) {
      e(!1);
    });
  }));
}
const $l = {
  created(e, t) {
    Hl();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", Cn && (e.style.display = "none")), Qt.set(e, o);
  },
  mounted(e, t) {
    let n = Qt.get(e);
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
    r(Cn), n.updateFn = r, Tn.add(r);
  },
  unmounted(e) {
    let t = Qt.get(e);
    t && t.updateFn && Tn.delete(t.updateFn), Qt.delete(e);
  }
};
let yi = 0;
const vt = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new Map(), ql = {
  created(e, t) {
    yi++;
    let n = "livue-replace-" + yi, r = t.modifiers.self === !0;
    vt.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Yn.set(n, 0);
  },
  mounted(e, t) {
    let n = vt.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = vt.get(e);
    n && (n.version++, Yn.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = vt.get(e);
    t && Yn.delete(t.id), vt.delete(e);
  }
}, gt = /* @__PURE__ */ new WeakMap(), bi = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, zl = 200;
function Fl(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(bi))
    if (e[t])
      return bi[t];
  return zl;
}
function Kn(e, t, n, r, i) {
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
const Wl = {
  created(e, t) {
    let n = e.style.display;
    gt.set(e, {
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
    let i = gt.get(e), o = t.modifiers || {}, a = Fl(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(f) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), f && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Kn(e, i, o, u, !0);
      }, a) : f ? (i.isActive = !0, Kn(e, i, o, u, !0)) : (i.isActive = !1, Kn(e, i, o, u, !1));
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
    gt.get(e);
  },
  unmounted(e) {
    let t = gt.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), gt.delete(e));
  }
}, en = /* @__PURE__ */ new WeakMap(), Bl = {
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
    en.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = en.get(e), i = Ee(n);
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
    let t = en.get(e);
    t && (t.stopWatch && t.stopWatch(), en.delete(e));
  }
}, yt = /* @__PURE__ */ new WeakMap(), Ul = {
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
    yt.set(e, { targetId: n }), li(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = yt.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      si(n.targetId);
      const i = t.modifiers.replace || !1;
      li(r, e, i), yt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = yt.get(e);
    t && (si(t.targetId), yt.delete(e));
  }
}, wi = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, Si = ["ctrl", "alt", "shift", "meta"];
let Ei = 0;
const _i = /* @__PURE__ */ new Set();
function Jl(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function Xl(e, t) {
  for (let i = 0; i < Si.length; i++) {
    let o = Si[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in wi)
    t[i] && (n = !0, e.key === wi[i] && (r = !0));
  return !(n && !r);
}
function z(e, t = {}) {
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
        _i.has(L) || (console.warn(
          "[LiVue] " + L + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), _i.add(L));
      }
      Ei++;
      const p = "v-" + e + "-" + Ei, b = Jl(d);
      let h = null, m = null;
      d.debounce && (h = ut(p, b)), d.throttle && (m = zt(p, b));
      let y = !1, D = null;
      i && u && (D = u);
      const A = function(L) {
        let I = D, M = [];
        if (i && u) {
          I = u;
          const k = l.value;
          k != null && (M = Array.isArray(k) ? k : [k]);
        } else {
          const k = l.value;
          if (typeof k == "function")
            if (typeof k.__livueMethodName == "string")
              I = k.__livueMethodName, Array.isArray(k.__livueMethodArgs) && (M = k.__livueMethodArgs.slice());
            else {
              const j = function() {
                k();
              };
              h ? h(j) : m ? m(j) : j();
              return;
            }
          else typeof k == "string" ? I = k : Array.isArray(k) && k.length > 0 && (I = k[0], M = k.slice(1));
        }
        if (!I) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const x = function() {
          d.confirm ? f.callWithConfirm(I, "Are you sure?", ...M) : f.call(I, ...M);
        };
        h ? h(x) : m ? m(x) : x();
      }, O = function(L) {
        if (!(d.self && L.target !== a) && !(r && !Xl(L, d))) {
          if (d.once) {
            if (y)
              return;
            y = !0;
          }
          d.prevent && L.preventDefault(), d.stop && L.stopPropagation(), A();
        }
      }, T = {};
      d.capture && (T.capture = !0), d.passive && (T.passive = !0);
      const E = {
        handler: O,
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
            A();
          }
        };
        document.addEventListener(e, L, T), E.outsideHandler = L;
      } else
        a.addEventListener(e, O, T);
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
const Yl = z("click", {
  supportsOutside: !0,
  allowArg: !1
}), Kl = {
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
let Ai = 0;
const Gl = {
  created(e, t) {
    let n = t.value;
    n || (Ai++, n = "scroll-" + Ai), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, bt = /* @__PURE__ */ new WeakMap();
function Di(e, t, n, r, i) {
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
const Zl = {
  created(e, t) {
    let n = e.style.display;
    bt.set(e, {
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
    let i = bt.get(e), o = t.modifiers || {}, a = t.arg || null, l = t.value;
    i.stopWatch = Se(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        Di(e, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = bt.get(e);
    if (r && t.value !== t.oldValue) {
      let i = Ee(n);
      if (i) {
        let o = t.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Di(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = bt.get(e);
    t && (t.stopWatch && t.stopWatch(), bt.delete(e));
  }
}, tn = /* @__PURE__ */ new WeakMap();
let Ci = 0;
function Ql(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function es(e, t) {
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
function ts(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const ns = {
  mounted(e, t, n) {
    let r = es(t, n);
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
    Ci++;
    let s = "watch-" + i + "-" + Ci;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), tn.set(e, { blurHandler: p });
      return;
    }
    let u = Ql(l) || 150, d = ut(s, u), f = Se(
      function() {
        return ts(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    tn.set(e, { stopWatcher: f });
  },
  unmounted(e) {
    let t = tn.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), tn.delete(e));
  }
}, xt = /* @__PURE__ */ new WeakMap();
let Ti = 0;
function rs(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function is(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function os(e, t) {
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
function Wt(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function Bt(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function _o(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function as(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function ls(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function ss(e) {
  return ls(e) ? e : e.querySelector("input, textarea, select");
}
function Ut(e, t) {
  return {
    mounted(n, r, i) {
      if (rs(i) && !is(i))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let a = os(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: l } = a, s = as(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + e + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Ti++;
      let d = e + "-" + Ti, f = ss(n);
      if (!f) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let p = t(f, s, l, u, d);
      f.addEventListener(p.eventType, p.handler, { capture: !0 }), xt.set(n, {
        targetEl: f,
        handler: p.handler,
        eventType: p.eventType
      });
    },
    unmounted(n) {
      let r = xt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), xt.delete(n));
    }
  };
}
const us = Ut("debounce", function(e, t, n, r, i) {
  let o = _o(r) || 150, a = ut(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = Wt(l.target);
      a(function() {
        Bt(n, t, s);
      });
    }
  };
}), cs = Ut("throttle", function(e, t, n, r, i) {
  let o = _o(r) || 150, a = zt(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = Wt(l.target);
      a(function() {
        Bt(n, t, s);
      });
    }
  };
}), Pr = Ut("blur", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Bt(n, t, Wt(l.target));
  };
  return e.addEventListener("blur", a), e._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), fs = Pr.unmounted;
Pr.unmounted = function(e) {
  let t = xt.get(e), n = t ? t.targetEl : e;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), fs(e);
};
const Rr = Ut("enter", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Bt(n, t, Wt(l.target));
  };
  return e.addEventListener("keyup", a), e._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), ds = Rr.unmounted;
Rr.unmounted = function(e) {
  let t = xt.get(e), n = t ? t.targetEl : e;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), ds(e);
};
const ps = Ut("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = Wt(o.target);
      a = !!a && a !== "false" && a !== "0", Bt(n, t, a);
    }
  };
});
function Li(e, t) {
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
    t % 2 ? Li(Object(n), !0).forEach(function(r) {
      hs(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Li(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function pn(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? pn = function(t) {
    return typeof t;
  } : pn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pn(e);
}
function hs(e, t, n) {
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
function ms(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function vs(e, t) {
  if (e == null) return {};
  var n = ms(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var gs = "1.15.6";
function Te(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var ke = Te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Jt = Te(/Edge/i), ki = Te(/firefox/i), Nt = Te(/safari/i) && !Te(/chrome/i) && !Te(/android/i), Vr = Te(/iP(ad|od|hone)/i), Ao = Te(/chrome/i) && Te(/android/i), Do = {
  capture: !1,
  passive: !1
};
function q(e, t, n) {
  e.addEventListener(t, n, !ke && Do);
}
function $(e, t, n) {
  e.removeEventListener(t, n, !ke && Do);
}
function Ln(e, t) {
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
function Co(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function we(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Ln(e, t) : Ln(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = Co(e));
  }
  return null;
}
var Oi = /\s+/g;
function fe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Oi, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Oi, " ");
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
function lt(e, t) {
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
function To(e, t, n) {
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
function re(e, t, n, r, i) {
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
      var b = lt(i || e), h = b && b.a, m = b && b.d;
      b && (a /= m, l /= h, f /= h, d /= m, s = a + d, u = l + f);
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
function xi(e, t, n) {
  for (var r = Re(e, !0), i = re(e)[t]; r; ) {
    var o = re(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === Ae()) break;
    r = Re(r, !1);
  }
  return !1;
}
function ct(e, t, n, r) {
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
function jr(e, t) {
  for (var n = e.lastElementChild; n && (n === R.ghost || P(n, "display") === "none" || t && !Ln(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function he(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== R.clone && (!t || Ln(e, t)) && n++;
  return n;
}
function Ni(e) {
  var t = 0, n = 0, r = Ae();
  if (e)
    do {
      var i = lt(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function ys(e, t) {
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
function bs(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Gn(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var It;
function Lo(e, t) {
  return function() {
    if (!It) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), It = setTimeout(function() {
        It = void 0;
      }, t);
    }
  };
}
function ws() {
  clearTimeout(It), It = void 0;
}
function ko(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function Oo(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function xo(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!we(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = re(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var ce = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ss() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(P(i, "display") === "none" || i === R.ghost)) {
            e.push({
              target: i,
              rect: re(i)
            });
            var o = De({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = lt(i, !0);
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
      e.splice(ys(e, {
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
        var s = 0, u = l.target, d = u.fromRect, f = re(u), p = u.prevFromRect, b = u.prevToRect, h = l.rect, m = lt(u, !0);
        m && (f.top -= m.f, f.left -= m.e), u.toRect = f, u.thisAnimationDuration && Gn(p, f) && !Gn(d, f) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - f.top) / (h.left - f.left) === (d.top - f.top) / (d.left - f.left) && (s = _s(h, p, b, i.options)), Gn(f, d) || (u.prevFromRect = d, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, h, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        P(r, "transition", ""), P(r, "transform", "");
        var l = lt(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), f = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!f, P(r, "transform", "translate3d(" + d + "px," + f + "px,0)"), this.forRepaintDummy = Es(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Es(e) {
  return e.offsetWidth;
}
function _s(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var Ge = [], Zn = {
  initializeByDefault: !0
}, Xt = {
  mount: function(t) {
    for (var n in Zn)
      Zn.hasOwnProperty(n) && !(n in t) && (t[n] = Zn[n]);
    Ge.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), Ge.push(t);
  },
  pluginEvent: function(t, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = t + "Global";
    Ge.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](De({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](De({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    Ge.forEach(function(l) {
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
    return Ge.forEach(function(i) {
      typeof i.eventProperties == "function" && Le(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return Ge.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function As(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, d = e.oldDraggableIndex, f = e.newDraggableIndex, p = e.originalEvent, b = e.putSortable, h = e.extraEventProperties;
  if (t = t || n && n[ce], !!t) {
    var m, y = t.options, D = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ke && !Jt ? m = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = d, m.newDraggableIndex = f, m.originalEvent = p, m.pullMode = b ? b.lastPutMode : void 0;
    var A = De(De({}, h), Xt.getEventProperties(r, t));
    for (var O in A)
      m[O] = A[O];
    n && n.dispatchEvent(m), y[D] && y[D].call(t, m);
  }
}
var Ds = ["evt"], ue = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = vs(r, Ds);
  Xt.pluginEvent.bind(R)(t, n, De({
    dragEl: _,
    parentEl: ee,
    ghostEl: V,
    rootEl: K,
    nextEl: Be,
    lastDownEl: hn,
    cloneEl: Z,
    cloneHidden: Me,
    dragStarted: _t,
    putSortable: ie,
    activeSortable: R.active,
    originalEvent: i,
    oldIndex: rt,
    oldDraggableIndex: Mt,
    newIndex: de,
    newDraggableIndex: xe,
    hideGhostForTarget: Po,
    unhideGhostForTarget: Ro,
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
  As(De({
    putSortable: ie,
    cloneEl: Z,
    targetEl: _,
    rootEl: K,
    oldIndex: rt,
    oldDraggableIndex: Mt,
    newIndex: de,
    newDraggableIndex: xe
  }, e));
}
var _, ee, V, K, Be, hn, Z, Me, rt, de, Mt, xe, nn, ie, tt = !1, kn = !1, On = [], ze, ge, Qn, er, Ii, Mi, _t, Ze, Pt, Rt = !1, rn = !1, mn, ae, tr = [], _r = !1, xn = [], Vn = typeof document < "u", on = Vr, Pi = Jt || ke ? "cssFloat" : "float", Cs = Vn && !Ao && !Vr && "draggable" in document.createElement("div"), No = (function() {
  if (Vn) {
    if (ke)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), Io = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = ct(t, 0, n), a = ct(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + re(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + re(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Pi] === "none" || a && r[Pi] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Ts = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, Ls = function(t, n) {
  var r;
  return On.some(function(i) {
    var o = i[ce].options.emptyInsertThreshold;
    if (!(!o || jr(i))) {
      var a = re(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, Mo = function(t) {
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
  (!i || pn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, Po = function() {
  !No && V && P(V, "display", "none");
}, Ro = function() {
  !No && V && P(V, "display", "");
};
Vn && !Ao && document.addEventListener("click", function(e) {
  if (kn)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), kn = !1, !1;
}, !0);
var Fe = function(t) {
  if (_) {
    t = t.touches ? t.touches[0] : t;
    var n = Ls(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ce]._onDragOver(r);
    }
  }
}, ks = function(t) {
  _ && _.parentNode[ce]._isOutsideThisEl(t.target);
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
      return Io(e, this.options);
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
    supportPointer: R.supportPointer !== !1 && "PointerEvent" in window && (!Nt || Vr),
    emptyInsertThreshold: 5
  };
  Xt.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  Mo(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Cs, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? q(e, "pointerdown", this._onTapStart) : (q(e, "mousedown", this._onTapStart), q(e, "touchstart", this._onTapStart)), this.nativeDraggable && (q(e, "dragover", this), q(e, "dragenter", this)), On.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Le(this, Ss());
}
R.prototype = /** @lends Sortable.prototype */
{
  constructor: R,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Ze = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, _) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, d = i.filter;
      if (Vs(r), !_ && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Nt && s && s.tagName.toUpperCase() === "SELECT") && (s = we(s, i.draggable, r, !1), !(s && s.animated) && hn !== s)) {
        if (rt = he(s), Mt = he(s, i.draggable), typeof d == "function") {
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
    if (r && !_ && r.parentNode === o) {
      var u = re(r);
      if (K = o, _ = r, ee = _.parentNode, Be = _.nextSibling, hn = r, nn = a.group, R.dragged = _, ze = {
        target: _,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Ii = ze.clientX - u.left, Mi = ze.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, _.style["will-change"] = "all", s = function() {
        if (ue("delayEnded", i, {
          evt: t
        }), R.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !ki && i.nativeDraggable && (_.draggable = !0), i._triggerDragStart(t, n), le({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), fe(_, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        To(_, d.trim(), nr);
      }), q(l, "dragover", Fe), q(l, "mousemove", Fe), q(l, "touchmove", Fe), a.supportPointer ? (q(l, "pointerup", i._onDrop), !this.nativeDraggable && q(l, "pointercancel", i._onDrop)) : (q(l, "mouseup", i._onDrop), q(l, "touchend", i._onDrop), q(l, "touchcancel", i._onDrop)), ki && this.nativeDraggable && (this.options.touchStartThreshold = 4, _.draggable = !0), ue("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Jt || ke))) {
        if (R.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (q(l, "pointerup", i._disableDelayedDrag), q(l, "pointercancel", i._disableDelayedDrag)) : (q(l, "mouseup", i._disableDelayedDrag), q(l, "touchend", i._disableDelayedDrag), q(l, "touchcancel", i._disableDelayedDrag)), q(l, "mousemove", i._delayedDragTouchMoveHandler), q(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && q(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    _ && nr(_), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._disableDelayedDrag), $(t, "touchend", this._disableDelayedDrag), $(t, "touchcancel", this._disableDelayedDrag), $(t, "pointerup", this._disableDelayedDrag), $(t, "pointercancel", this._disableDelayedDrag), $(t, "mousemove", this._delayedDragTouchMoveHandler), $(t, "touchmove", this._delayedDragTouchMoveHandler), $(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? q(document, "pointermove", this._onTouchMove) : n ? q(document, "touchmove", this._onTouchMove) : q(document, "mousemove", this._onTouchMove) : (q(_, "dragend", this), q(K, "dragstart", this._onDragStart));
    try {
      document.selection ? vn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (tt = !1, K && _) {
      ue("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && q(document, "dragover", ks);
      var r = this.options;
      !t && fe(_, r.dragClass, !1), fe(_, r.ghostClass, !0), R.active = this, t && this._appendGhost(), le({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (ge) {
      this._lastX = ge.clientX, this._lastY = ge.clientY, Po();
      for (var t = document.elementFromPoint(ge.clientX, ge.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(ge.clientX, ge.clientY), t !== n); )
        n = t;
      if (_.parentNode[ce]._isOutsideThisEl(t), n)
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
        } while (n = Co(n));
      Ro();
    }
  },
  _onTouchMove: function(t) {
    if (ze) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = V && lt(V, !0), l = V && a && a.a, s = V && a && a.d, u = on && ae && Ni(ae), d = (o.clientX - ze.clientX + i.x) / (l || 1) + (u ? u[0] - tr[0] : 0) / (l || 1), f = (o.clientY - ze.clientY + i.y) / (s || 1) + (u ? u[1] - tr[1] : 0) / (s || 1);
      if (!R.active && !tt) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (V) {
        a ? (a.e += d - (Qn || 0), a.f += f - (er || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(V, "webkitTransform", p), P(V, "mozTransform", p), P(V, "msTransform", p), P(V, "transform", p), Qn = d, er = f, ge = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!V) {
      var t = this.options.fallbackOnBody ? document.body : K, n = re(_, !0, on, !0, t), r = this.options;
      if (on) {
        for (ae = t; P(ae, "position") === "static" && P(ae, "transform") === "none" && ae !== document; )
          ae = ae.parentNode;
        ae !== document.body && ae !== document.documentElement ? (ae === document && (ae = Ae()), n.top += ae.scrollTop, n.left += ae.scrollLeft) : ae = Ae(), tr = Ni(ae);
      }
      V = _.cloneNode(!0), fe(V, r.ghostClass, !1), fe(V, r.fallbackClass, !0), fe(V, r.dragClass, !0), P(V, "transition", ""), P(V, "transform", ""), P(V, "box-sizing", "border-box"), P(V, "margin", 0), P(V, "top", n.top), P(V, "left", n.left), P(V, "width", n.width), P(V, "height", n.height), P(V, "opacity", "0.8"), P(V, "position", on ? "absolute" : "fixed"), P(V, "zIndex", "100000"), P(V, "pointerEvents", "none"), R.ghost = V, t.appendChild(V), P(V, "transform-origin", Ii / parseInt(V.style.width) * 100 + "% " + Mi / parseInt(V.style.height) * 100 + "%");
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
    ue("setupClone", this), R.eventCanceled || (Z = Oo(_), Z.removeAttribute("id"), Z.draggable = !1, Z.style["will-change"] = "", this._hideClone(), fe(Z, this.options.chosenClass, !1), R.clone = Z), r.cloneId = vn(function() {
      ue("clone", r), !R.eventCanceled && (r.options.removeCloneOnHide || K.insertBefore(Z, _), r._hideClone(), le({
        sortable: r,
        name: "clone"
      }));
    }), !n && fe(_, o.dragClass, !0), n ? (kn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : ($(document, "mouseup", r._onDrop), $(document, "touchend", r._onDrop), $(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, _)), q(document, "drop", r), P(_, "transform", "translateZ(0)")), tt = !0, r._dragStartId = vn(r._dragStarted.bind(r, n, t)), q(document, "selectstart", r), _t = !0, window.getSelection().removeAllRanges(), Nt && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = R.active, d = nn === s, f = l.sort, p = ie || u, b, h = this, m = !1;
    if (_r) return;
    function y(S, pt) {
      ue(S, h, De({
        evt: t,
        isOwner: d,
        axis: b ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: f,
        fromSortable: p,
        target: r,
        completed: A,
        onMove: function($e, c) {
          return an(K, n, _, i, $e, re($e), t, c);
        },
        changed: O
      }, pt));
    }
    function D() {
      y("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function A(S) {
      return y("dragOverCompleted", {
        insertion: S
      }), S && (d ? u._hideClone() : u._showClone(h), h !== p && (fe(_, ie ? ie.options.ghostClass : u.options.ghostClass, !1), fe(_, l.ghostClass, !0)), ie !== h && h !== R.active ? ie = h : h === R.active && ie && (ie = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        y("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === _ && !_.animated || r === n && !r.animated) && (Ze = null), !l.dragoverBubble && !t.rootEl && r !== document && (_.parentNode[ce]._isOutsideThisEl(t.target), !S && Fe(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
    }
    function O() {
      de = he(_), xe = he(_, l.draggable), le({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: de,
        newDraggableIndex: xe,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = we(r, l.draggable, n, !0), y("dragOver"), R.eventCanceled) return m;
    if (_.contains(t.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return A(!1);
    if (kn = !1, u && !l.disabled && (d ? f || (a = ee !== K) : ie === this || (this.lastPutMode = nn.checkPull(this, u, _, t)) && s.checkPut(this, u, _, t))) {
      if (b = this._getDirection(t, r) === "vertical", i = re(_), y("dragOverValid"), R.eventCanceled) return m;
      if (a)
        return ee = K, D(), this._hideClone(), y("revert"), R.eventCanceled || (Be ? K.insertBefore(_, Be) : K.appendChild(_)), A(!0);
      var T = jr(n, l.draggable);
      if (!T || Is(t, b, this) && !T.animated) {
        if (T === _)
          return A(!1);
        if (T && n === t.target && (r = T), r && (o = re(r)), an(K, n, _, i, r, o, t, !!r) !== !1)
          return D(), T && T.nextSibling ? n.insertBefore(_, T.nextSibling) : n.appendChild(_), ee = n, O(), A(!0);
      } else if (T && Ns(t, b, this)) {
        var E = ct(n, 0, l, !0);
        if (E === _)
          return A(!1);
        if (r = E, o = re(r), an(K, n, _, i, r, o, t, !1) !== !1)
          return D(), n.insertBefore(_, E), ee = n, O(), A(!0);
      } else if (r.parentNode === n) {
        o = re(r);
        var L = 0, I, M = _.parentNode !== n, x = !Ts(_.animated && _.toRect || i, r.animated && r.toRect || o, b), k = b ? "top" : "left", j = xi(r, "top", "top") || xi(_, "top", "top"), J = j ? j.scrollTop : void 0;
        Ze !== r && (I = o[k], Rt = !1, rn = !x && l.invertSwap || M), L = Ms(t, r, o, b, x ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, rn, Ze === r);
        var X;
        if (L !== 0) {
          var F = he(_);
          do
            F -= L, X = ee.children[F];
          while (X && (P(X, "display") === "none" || X === V));
        }
        if (L === 0 || X === r)
          return A(!1);
        Ze = r, Pt = L;
        var Y = r.nextElementSibling, B = !1;
        B = L === 1;
        var U = an(K, n, _, i, r, o, t, B);
        if (U !== !1)
          return (U === 1 || U === -1) && (B = U === 1), _r = !0, setTimeout(xs, 30), D(), B && !Y ? n.appendChild(_) : r.parentNode.insertBefore(_, B ? Y : r), j && ko(j, 0, J - j.scrollTop), ee = _.parentNode, I !== void 0 && !rn && (mn = Math.abs(I - re(r)[k])), O(), A(!0);
      }
      if (n.contains(_))
        return A(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", Fe), $(document, "mousemove", Fe), $(document, "touchmove", Fe);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._onDrop), $(t, "touchend", this._onDrop), $(t, "pointerup", this._onDrop), $(t, "pointercancel", this._onDrop), $(t, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (de = he(_), xe = he(_, r.draggable), ue("drop", this, {
      evt: t
    }), ee = _ && _.parentNode, de = he(_), xe = he(_, r.draggable), R.eventCanceled) {
      this._nulling();
      return;
    }
    tt = !1, rn = !1, Rt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Ar(this.cloneId), Ar(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Nt && P(document.body, "user-select", ""), P(_, "transform", ""), t && (_t && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), V && V.parentNode && V.parentNode.removeChild(V), (K === ee || ie && ie.lastPutMode !== "clone") && Z && Z.parentNode && Z.parentNode.removeChild(Z), _ && (this.nativeDraggable && $(_, "dragend", this), nr(_), _.style["will-change"] = "", _t && !tt && fe(_, ie ? ie.options.ghostClass : this.options.ghostClass, !1), fe(_, this.options.chosenClass, !1), le({
      sortable: this,
      name: "unchoose",
      toEl: ee,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), K !== ee ? (de >= 0 && (le({
      rootEl: ee,
      name: "add",
      toEl: ee,
      fromEl: K,
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
      fromEl: K,
      originalEvent: t
    }), le({
      sortable: this,
      name: "sort",
      toEl: ee,
      originalEvent: t
    })), ie && ie.save()) : de !== rt && de >= 0 && (le({
      sortable: this,
      name: "update",
      toEl: ee,
      originalEvent: t
    }), le({
      sortable: this,
      name: "sort",
      toEl: ee,
      originalEvent: t
    })), R.active && ((de == null || de === -1) && (de = rt, xe = Mt), le({
      sortable: this,
      name: "end",
      toEl: ee,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ue("nulling", this), K = _ = ee = V = Be = Z = hn = Me = ze = ge = _t = de = xe = rt = Mt = Ze = Pt = ie = nn = R.dragged = R.ghost = R.clone = R.active = null, xn.forEach(function(t) {
      t.checked = !0;
    }), xn.length = Qn = er = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        _ && (this._onDragOver(t), Os(t));
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
      n = r[i], we(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Rs(n));
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
    var i = Xt.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && Mo(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ue("destroy", this);
    var t = this.el;
    t[ce] = null, $(t, "mousedown", this._onTapStart), $(t, "touchstart", this._onTapStart), $(t, "pointerdown", this._onTapStart), this.nativeDraggable && ($(t, "dragover", this), $(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), On.splice(On.indexOf(this.el), 1), this.el = t = null;
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
      _.parentNode == K && !this.options.group.revertClone ? K.insertBefore(Z, _) : Be ? K.insertBefore(Z, Be) : K.appendChild(Z), this.options.group.revertClone && this.animate(_, Z), P(Z, "display", ""), Me = !1;
    }
  }
};
function Os(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function an(e, t, n, r, i, o, a, l) {
  var s, u = e[ce], d = u.options.onMove, f;
  return window.CustomEvent && !ke && !Jt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || re(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (f = d.call(u, s, a)), f;
}
function nr(e) {
  e.draggable = !1;
}
function xs() {
  _r = !1;
}
function Ns(e, t, n) {
  var r = re(ct(n.el, 0, n.options, !0)), i = xo(n.el, n.options, V), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Is(e, t, n) {
  var r = re(jr(n.el, n.options.draggable)), i = xo(n.el, n.options, V), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Ms(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, f = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && mn < u * i) {
      if (!Rt && (Pt === 1 ? s > d + u * o / 2 : s < f - u * o / 2) && (Rt = !0), Rt)
        p = !0;
      else if (Pt === 1 ? s < d + mn : s > f - mn)
        return -Pt;
    } else if (s > d + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return Ps(t);
  }
  return p = p || a, p && (s < d + u * o / 2 || s > f - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function Ps(e) {
  return he(_) < he(e) ? 1 : -1;
}
function Rs(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Vs(e) {
  xn.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && xn.push(r);
  }
}
function vn(e) {
  return setTimeout(e, 0);
}
function Ar(e) {
  return clearTimeout(e);
}
Vn && q(document, "touchmove", function(e) {
  (R.active || tt) && e.cancelable && e.preventDefault();
});
R.utils = {
  on: q,
  off: $,
  css: P,
  find: To,
  is: function(t, n) {
    return !!we(t, n, t, !1);
  },
  extend: bs,
  throttle: Lo,
  closest: we,
  toggleClass: fe,
  clone: Oo,
  index: he,
  nextTick: vn,
  cancelNextTick: Ar,
  detectDirection: Io,
  getChild: ct,
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
    r.utils && (R.utils = De(De({}, R.utils), r.utils)), Xt.mount(r);
  });
};
R.create = function(e, t) {
  return new R(e, t);
};
R.version = gs;
var ne = [], At, Dr, Cr = !1, rr, ir, Nn, Dt;
function js() {
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
      this.sortable.nativeDraggable ? q(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? q(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? q(document, "touchmove", this._handleFallbackAutoScroll) : q(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), Ri(), gn(), ws();
    },
    nulling: function() {
      Nn = Dr = At = Cr = Dt = rr = ir = null, ne.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (Nn = n, r || this.options.forceAutoScrollFallback || Jt || ke || Nt) {
        or(n, this.options, l, r);
        var s = Re(l, !0);
        Cr && (!Dt || o !== rr || a !== ir) && (Dt && Ri(), Dt = setInterval(function() {
          var u = Re(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, gn()), or(n, i.options, u, r);
        }, 10), rr = o, ir = a);
      } else {
        if (!this.options.bubbleScroll || Re(l, !0) === Ae()) {
          gn();
          return;
        }
        or(n, this.options, Re(l, !1), !1);
      }
    }
  }, Le(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function gn() {
  ne.forEach(function(e) {
    clearInterval(e.pid);
  }), ne = [];
}
function Ri() {
  clearInterval(Dt);
}
var or = Lo(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ae(), u = !1, d;
    Dr !== n && (Dr = n, gn(), At = t.scroll, d = t.scrollFn, At === !0 && (At = Re(n, !0)));
    var f = 0, p = At;
    do {
      var b = p, h = re(b), m = h.top, y = h.bottom, D = h.left, A = h.right, O = h.width, T = h.height, E = void 0, L = void 0, I = b.scrollWidth, M = b.scrollHeight, x = P(b), k = b.scrollLeft, j = b.scrollTop;
      b === s ? (E = O < I && (x.overflowX === "auto" || x.overflowX === "scroll" || x.overflowX === "visible"), L = T < M && (x.overflowY === "auto" || x.overflowY === "scroll" || x.overflowY === "visible")) : (E = O < I && (x.overflowX === "auto" || x.overflowX === "scroll"), L = T < M && (x.overflowY === "auto" || x.overflowY === "scroll"));
      var J = E && (Math.abs(A - i) <= a && k + O < I) - (Math.abs(D - i) <= a && !!k), X = L && (Math.abs(y - o) <= a && j + T < M) - (Math.abs(m - o) <= a && !!j);
      if (!ne[f])
        for (var F = 0; F <= f; F++)
          ne[F] || (ne[F] = {});
      (ne[f].vx != J || ne[f].vy != X || ne[f].el !== b) && (ne[f].el = b, ne[f].vx = J, ne[f].vy = X, clearInterval(ne[f].pid), (J != 0 || X != 0) && (u = !0, ne[f].pid = setInterval(function() {
        r && this.layer === 0 && R.active._onTouchMove(Nn);
        var Y = ne[this.layer].vy ? ne[this.layer].vy * l : 0, B = ne[this.layer].vx ? ne[this.layer].vx * l : 0;
        typeof d == "function" && d.call(R.dragged.parentNode[ce], B, Y, e, Nn, ne[this.layer].el) !== "continue" || ko(ne[this.layer].el, B, Y);
      }.bind({
        layer: f
      }), 24))), f++;
    } while (t.bubbleScroll && p !== s && (p = Re(p, !1)));
    Cr = u;
  }
}, 30), Vo = function(t) {
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
function Hr() {
}
Hr.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = ct(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Vo
};
Le(Hr, {
  pluginName: "revertOnSpill"
});
function $r() {
}
$r.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Vo
};
Le($r, {
  pluginName: "removeOnSpill"
});
R.mount(new js());
R.mount($r, Hr);
const it = /* @__PURE__ */ new WeakMap(), yn = /* @__PURE__ */ new WeakMap();
function Hs(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const ln = /* @__PURE__ */ new WeakMap(), $s = {
  mounted(e, t, n) {
    let r = Ee(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Hs(i), l = i.horizontal ? "horizontal" : "vertical";
    ln.set(e, t);
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
        let b = p.newIndex, h = p.oldIndex;
        if (h === b)
          return;
        let m = ln.get(e), y = m ? m.value : null, D = typeof y == "string";
        if (Array.isArray(y)) {
          let O = p.from;
          h < b ? O.insertBefore(p.item, O.children[h]) : O.insertBefore(p.item, O.children[h + 1]);
          let T = y.splice(h, 1)[0];
          y.splice(b, 0, T);
          return;
        }
        if (D && r) {
          let O = y, T = [], E = p.item, L = yn.get(E);
          L === void 0 && (L = E.dataset.livueSortItem), typeof L == "string" && /^\d+$/.test(L) && (L = parseInt(L, 10));
          let I = p.from, M = p.to, x = [L, b].concat(T);
          if (I !== M) {
            let j = M.dataset.livueSortMethod;
            j && (O = j);
            let J = I.dataset.livueSortId || I.dataset.livueSortGroup || null;
            x.push(J);
          }
          r.call(O, x);
        }
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let f = R.create(e, u);
    it.set(e, f);
  },
  updated(e, t) {
    ln.set(e, t);
    let n = it.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = it.get(e);
    t && (t.destroy(), it.delete(e)), ln.delete(e);
  }
}, qs = {
  mounted(e, t) {
    let n = t.value;
    yn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    yn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (yn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, zs = {
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
}, Fs = {
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
}, Ws = {
  mounted(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = it.get(e);
    r && r.option("group", n);
  },
  updated(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = it.get(e);
    r && r.option("group", n);
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, Bs = z("dblclick"), Us = z("mousedown"), Js = z("mouseup"), Xs = z("mouseenter"), Ys = z("mouseleave"), Ks = z("mouseover"), Gs = z("mouseout"), Zs = z("mousemove"), Qs = z("contextmenu"), eu = z("keydown", { isKeyboardEvent: !0 }), tu = z("keyup", { isKeyboardEvent: !0 }), nu = z("keypress", { isKeyboardEvent: !0 }), ru = z("focus"), iu = z("focusin"), ou = z("focusout"), au = z("touchstart"), lu = z("touchend"), su = z("touchmove"), uu = z("touchcancel"), cu = z("change"), fu = z("input"), du = z("reset"), pu = z("dragstart"), hu = z("dragend"), mu = z("dragenter"), vu = z("dragleave"), gu = z("dragover"), yu = z("drop"), bu = z("copy"), wu = z("cut"), Su = z("paste"), Eu = z("wheel"), _u = z("resize");
function Au() {
  N("init", Dl), N("submit", Cl), N("intersect", Tl), N("current", Ol), N("ignore", xl), N("model-livue", Pl), N("debounce", us), N("throttle", cs), N("blur", Pr), N("enter", Rr), N("boolean", ps), N("poll", jl), N("offline", $l), N("transition", bl), N("replace", ql), N("loading", Wl), N("target", Bl), N("stream", Ul), N("click", Yl), N("navigate", Kl), N("scroll", Gl), N("dirty", Zl), N("watch", ns), N("sort", $s), N("sort-item", qs), N("sort-handle", zs), N("sort-ignore", Fs), N("sort-group", Ws), N("dblclick", Bs), N("mousedown", Us), N("mouseup", Js), N("mouseenter", Xs), N("mouseleave", Ys), N("mouseover", Ks), N("mouseout", Gs), N("mousemove", Zs), N("contextmenu", Qs), N("keydown", eu), N("keyup", tu), N("keypress", nu), N("focus", ru), N("focusin", iu), N("focusout", ou), N("touchstart", au), N("touchend", lu), N("touchmove", su), N("touchcancel", uu), N("change", cu), N("input", fu), N("reset", du), N("dragstart", pu), N("dragend", hu), N("dragenter", mu), N("dragleave", vu), N("dragover", gu), N("drop", yu), N("copy", bu), N("cut", wu), N("paste", Su), N("wheel", Eu), N("resize", _u);
}
let Ne = null, wt = null, Vi = !1;
function Du() {
  if (Vi)
    return;
  Vi = !0;
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
function Cu() {
  return Ne || (Du(), Ne = document.createElement("div"), Ne.className = "livue-hmr-indicator", document.body.appendChild(Ne), Ne);
}
function sn(e, t) {
  const n = Cu();
  switch (wt && (clearTimeout(wt), wt = null), e) {
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
            `, wt = setTimeout(function() {
        ji();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, wt = setTimeout(function() {
        ji();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function ji() {
  Ne && Ne.classList.remove("visible");
}
let Xe = null, jn = !0, jo = !0, Ct = !0, bn = [];
function Tu(e) {
  Xe = e;
}
async function Lu(e) {
  if (jn) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), Ct && sn("updating", e.fileName), bn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = jo ? ku() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), Ct && sn("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Xe.reboot(), t && (await xu(), Ou(t)), Ct && sn("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), Ct && sn("error");
    }
  }
}
function ku() {
  const e = /* @__PURE__ */ new Map();
  return Xe && Xe.all().forEach(function(n) {
    if (Hi(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Hi(r, i.name, i.state, e);
      }
  }), e;
}
function Hi(e, t, n, r) {
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
function Ou(e) {
  Xe && e.forEach(function(t, n) {
    const r = Xe.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function xu() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Nu() {
  return typeof import.meta < "u" && !1;
}
function Iu() {
  jn = !0;
}
function Mu() {
  jn = !1;
}
function Pu() {
  return jn;
}
function Ru(e) {
  e.indicator !== void 0 && (Ct = e.indicator), e.preserveState !== void 0 && (jo = e.preserveState);
}
function Vu(e) {
  return bn.push(e), function() {
    const t = bn.indexOf(e);
    t !== -1 && bn.splice(t, 1);
  };
}
async function ju() {
  Xe && await Lu({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Qe = !1, ar = [];
class Hu {
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
    Ya(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Au(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), this._processStandaloneLazy(document.body), Ta(this), this._startObserver(), Tu(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(t) {
      t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), nl());
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
    Ft(t, !0, !1);
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
    Ca(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return Rn(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    Ra();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Fa();
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
      available: dt(),
      ...tl()
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
    let r = new Al(t);
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
    return Zr(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Qr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), ni();
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
    }), ni();
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
      isAvailable: Nu,
      isEnabled: Pu,
      enable: Iu,
      disable: Mu,
      configure: Ru,
      onUpdate: Vu,
      trigger: ju
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
    if (t && !Qe) {
      Qe = !0, console.log("[LiVue] Debug mode enabled");
      var n = Qr();
      n.forEach(function(r) {
        var i = Zr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        ar.push(i);
      });
    } else !t && Qe && (Qe = !1, console.log("[LiVue] Debug mode disabled"), ar.forEach(function(r) {
      r();
    }), ar = []);
    return Qe;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return Qe;
  }
}
const Hn = new Hu();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = Ko, document.head.appendChild(e);
}
var ye = window.LiVueConfig || {};
(ye.showProgressBar !== void 0 || ye.progressBarColor !== void 0 || ye.prefetch !== void 0 || ye.prefetchOnHover !== void 0 || ye.hoverDelay !== void 0 || ye.cachePages !== void 0 || ye.maxCacheSize !== void 0 || ye.restoreScroll !== void 0) && Hn.configureNavigation(ye);
ye.showProgressOnRequest !== void 0 && Hn.progress.configure({ showOnRequest: ye.showProgressOnRequest });
let $i = !1;
function un() {
  $i || ($i = !0, Hn.boot());
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", un, { once: !0 }) : document.readyState === "interactive" ? (document.addEventListener("DOMContentLoaded", un, { once: !0 }), window.addEventListener("load", un, { once: !0 })) : queueMicrotask(un);
window.LiVue = Hn;
export {
  Hn as default
};
//# sourceMappingURL=livue.esm.js.map
