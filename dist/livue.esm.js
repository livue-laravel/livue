import * as Hn from "vue";
import { reactive as _e, toRefs as $i, effectScope as qi, ref as Pt, markRaw as zi, hasInjectionContext as jo, inject as Fi, isRef as bn, isReactive as Wi, toRaw as Ho, getCurrentScope as $o, onScopeDispose as qo, watch as Se, nextTick as Nn, computed as Bi, provide as zo, onBeforeUnmount as Fo, onBeforeMount as Wo, onUnmounted as Ui, onMounted as Ji, readonly as Bo, watchEffect as Uo, shallowRef as Cr, defineComponent as Jo, h as $r, createApp as Xo } from "vue";
const Yo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Xi(e, t) {
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
  return JSON.stringify(e, Xi);
}
function ar(e) {
  return _e(Object.assign({}, e));
}
function Ko(e, t) {
  let n;
  for (n in t) {
    let r = qr(e[n]), i = qr(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function Yi(e) {
  return JSON.parse(JSON.stringify(e, Xi));
}
function Go(e) {
  return $i(e);
}
function $n(e, t) {
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
function Xt(e, t, n) {
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
function Yt(e, t) {
  let n = {}, r = Yi(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function Zo(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function lr(e) {
  if (Zo(e))
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
let zr = 0;
function Qo() {
  return zr++, zr;
}
let Ki = /* @__PURE__ */ new Map();
function ea(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function ta(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Gi(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Ki.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: ea(n)
    });
  });
}
function Zi(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Ki.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && ta(n, i.inputs));
  });
}
let Qi;
const In = (e) => Qi = e, eo = (
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
function Fr() {
  const e = qi(!0), t = e.run(() => Pt({}));
  let n = [], r = [];
  const i = zi({
    install(o) {
      In(i), i._a = o, o.provide(eo, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const to = () => {
};
function Wr(e, t, n, r = to) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && $o() && qo(i), i;
}
function Xe(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const na = (e) => e(), Br = /* @__PURE__ */ Symbol(), qn = /* @__PURE__ */ Symbol();
function ur(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    sr(i) && sr(r) && e.hasOwnProperty(n) && !bn(r) && !Wi(r) ? e[n] = ur(i, r) : e[n] = r;
  }
  return e;
}
const ra = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function ia(e) {
  return !sr(e) || !Object.prototype.hasOwnProperty.call(e, ra);
}
const { assign: Oe } = Object;
function oa(e) {
  return !!(bn(e) && e.effect);
}
function aa(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const d = $i(n.state.value[e]);
    return Oe(d, o, Object.keys(a || {}).reduce((f, p) => (f[p] = zi(Bi(() => {
      In(n);
      const y = n._s.get(e);
      return a[p].call(y, y);
    })), f), {}));
  }
  return s = no(e, u, t, n, r, !0), s;
}
function no(e, t, n = {}, r, i, o) {
  let a;
  const l = Oe({ actions: {} }, n), s = { deep: !0 };
  let u, d, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), y;
  const h = r.state.value[e];
  !o && !h && (r.state.value[e] = {}), Pt({});
  let m;
  function b(M) {
    let k;
    u = d = !1, typeof M == "function" ? (M(r.state.value[e]), k = {
      type: Dt.patchFunction,
      storeId: e,
      events: y
    }) : (ur(r.state.value[e], M), k = {
      type: Dt.patchObject,
      payload: M,
      storeId: e,
      events: y
    });
    const O = m = /* @__PURE__ */ Symbol();
    Nn().then(() => {
      m === O && (u = !0);
    }), d = !0, Xe(f, k, r.state.value[e]);
  }
  const C = o ? function() {
    const { state: k } = n, O = k ? k() : {};
    this.$patch((H) => {
      Oe(H, O);
    });
  } : (
    /* istanbul ignore next */
    to
  );
  function S() {
    a.stop(), f.clear(), p.clear(), r._s.delete(e);
  }
  const N = (M, k = "") => {
    if (Br in M)
      return M[qn] = k, M;
    const O = function() {
      In(r);
      const H = Array.from(arguments), J = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Set();
      function W(w) {
        J.add(w);
      }
      function U(w) {
        F.add(w);
      }
      Xe(p, {
        args: H,
        name: O[qn],
        store: _,
        after: W,
        onError: U
      });
      let K;
      try {
        K = M.apply(this && this.$id === e ? this : _, H);
      } catch (w) {
        throw Xe(F, w), w;
      }
      return K instanceof Promise ? K.then((w) => (Xe(J, w), w)).catch((w) => (Xe(F, w), Promise.reject(w))) : (Xe(J, K), K);
    };
    return O[Br] = !0, O[qn] = k, O;
  }, T = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Wr.bind(null, p),
    $patch: b,
    $reset: C,
    $subscribe(M, k = {}) {
      const O = Wr(f, M, k.detached, () => H()), H = a.run(() => Se(() => r.state.value[e], (J) => {
        (k.flush === "sync" ? d : u) && M({
          storeId: e,
          type: Dt.direct,
          events: y
        }, J);
      }, Oe({}, s, k)));
      return O;
    },
    $dispose: S
  }, _ = _e(T);
  r._s.set(e, _);
  const I = (r._a && r._a.runWithContext || na)(() => r._e.run(() => (a = qi()).run(() => t({ action: N }))));
  for (const M in I) {
    const k = I[M];
    if (bn(k) && !oa(k) || Wi(k))
      o || (h && ia(k) && (bn(k) ? k.value = h[M] : ur(k, h[M])), r.state.value[e][M] = k);
    else if (typeof k == "function") {
      const O = N(k, M);
      I[M] = O, l.actions[M] = k;
    }
  }
  return Oe(_, I), Oe(Ho(_), I), Object.defineProperty(_, "$state", {
    get: () => r.state.value[e],
    set: (M) => {
      b((k) => {
        Oe(k, M);
      });
    }
  }), r._p.forEach((M) => {
    Oe(_, a.run(() => M({
      store: _,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), h && o && n.hydrate && n.hydrate(_.$state, h), u = !0, d = !0, _;
}
// @__NO_SIDE_EFFECTS__
function la(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = jo();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Fi(eo, null) : null), a && In(a), a = Qi, a._s.has(e) || (i ? no(e, t, r, a) : aa(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let Rt = /* @__PURE__ */ new Map();
function sa(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function bt(e, t, n) {
  return sa(n) === "global" ? t : e + ":" + t;
}
function ro(e) {
  return JSON.parse(JSON.stringify(e));
}
function ua(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(ro(t));
}
function Tr(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = bt(e, t, r), a = Rt.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ la(o, n), definition: n }, Rt.set(o, a)), a.useStore(i);
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
function ca(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = lt(o.state || {}), s = Ue(e, o.name, { scope: a }, n);
    if (s) {
      ua(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return ro(l);
      }
    }, d = Tr(e, o.name, u, { scope: a }, n);
    r[o.name] = d;
  }
  return r;
}
function fa(e) {
  let t = e + ":", n = Array.from(Rt.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && Rt.delete(n[r]);
}
let io = {
  ref: Pt,
  computed: Bi,
  watch: Se,
  watchEffect: Uo,
  reactive: _e,
  readonly: Bo,
  onMounted: Ji,
  onUnmounted: Ui,
  onBeforeMount: Wo,
  onBeforeUnmount: Fo,
  nextTick: Nn,
  provide: zo,
  inject: Fi
}, cr = Object.keys(io), da = cr.map(function(e) {
  return io[e];
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
function pa(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(m) {
    return t[m];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(m) {
    return a[m];
  });
  function u(m) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(m);
  }
  function d(m, b, C) {
    let S = n && n.$id ? n.$id : "", N = n && n._pinia ? n._pinia : void 0;
    if (b === void 0) {
      let T = Ue(S, m, C || {}, N);
      if (T)
        return T;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return Tr(S, m, b, C, N);
  }
  function f(m) {
    let b = n && n.$id ? n.$id : "", C = n && n._pinia ? n._pinia : void 0, S = Ue(b, m, { scope: "auto" }, C);
    if (!S)
      throw new Error('[LiVue] useStore("' + m + '"): store not found.');
    return S;
  }
  let p = [], y = [];
  function h(m, b) {
    if (!u(m))
      return;
    let C = p.indexOf(m);
    if (C === -1) {
      p.push(m), y.push(b);
      return;
    }
    y[C] = b;
  }
  for (let m = 0; m < cr.length; m++)
    h(cr[m], da[m]);
  for (let m = 0; m < i.length; m++)
    h(i[m], o[m]);
  for (let m = 0; m < l.length; m++)
    h(l[m], s[m]);
  h("livue", n), h("store", d), h("useStore", f);
  try {
    let b = new (Function.prototype.bind.apply(
      Function,
      [null].concat(p).concat([e])
    ))().apply(null, y);
    return b && typeof b == "object" ? b : null;
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
const Xr = [
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
function ha(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Yr(e) {
  let t = e.replace(/\$errors\b/g, "lvErrors");
  for (let n = 0; n < Xr.length; n++) {
    let r = Xr[n], i = new RegExp(ha(r) + "\\b(?=\\s*\\()", "g");
    t = t.replace(i, "livue." + r);
  }
  return t;
}
function oo(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      oo(e.children[t]);
}
function fr(e, t, n, r, i, o) {
  let a = Ur(e), l = Jr(a.html);
  l = Yr(l), a.html = l;
  let s = Hn.compile(a.html), u = Cr(s), d = [], f = !1;
  function p(h, m) {
    let b = u.value;
    f = !0;
    let C;
    try {
      C = b(h, d);
    } finally {
      f = !1;
    }
    return oo(C), C;
  }
  p._rc = !0;
  let y = {
    name: o || "LiVueComponent",
    render: p,
    setup: function() {
      Hn.provide("livue", n);
      let h = Go(t);
      var m = new Proxy(n.errors, {
        get: function(T, _, L) {
          var I = Reflect.get(T, _, L);
          return Array.isArray(I) ? I[0] : I;
        }
      });
      let b = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: m });
      if (a.setupCode) {
        let T = pa(a.setupCode, h, n, r);
        T && Object.assign(b, T);
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
      return new Proxy(b, {
        get: function(T, _, L) {
          if (_ in T || typeof _ == "symbol") return Reflect.get(T, _, L);
          if (N(_)) {
            var I = function() {
              var M = Array.prototype.slice.call(arguments);
              if (f) {
                var k = function() {
                  return n.call(_, ...M);
                };
                return Object.defineProperty(k, "__livueMethodName", {
                  value: _,
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
              return n.call(_, ...M);
            };
            return Object.defineProperty(I, "__livueMethodName", {
              value: _,
              configurable: !1,
              enumerable: !1,
              writable: !1
            }), I;
          }
        },
        getOwnPropertyDescriptor: function(T, _) {
          var L = Object.getOwnPropertyDescriptor(T, _);
          if (L) return L;
          if (N(_))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(T, _) {
          return !!(_ in T || N(_));
        },
        set: function(T, _, L) {
          return T[_] = L, !0;
        },
        ownKeys: function(T) {
          return Reflect.ownKeys(T);
        }
      });
    }
  };
  return y._updateRender = function(h) {
    let m = Ur(h), b = Jr(m.html);
    b = Yr(b);
    let C = Hn.compile(b);
    C !== u.value && (d.length = 0, u.value = C);
  }, y;
}
let Fe = null;
function ct() {
  if (Fe)
    return Fe;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return Fe = e.getAttribute("content"), Fe;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (Fe = decodeURIComponent(t[1]), Fe) : null;
}
function ma() {
  Fe = null;
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
}, se = null, dr = null, pe = null, wn = !1, Ct = 0;
function va(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function ga(e) {
  return (-1 + e) * 100;
}
function ao() {
  if (wn) return;
  wn = !0;
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
function ya() {
  if (pe) return;
  ao(), pe = document.createElement("div"), pe.className = "livue-progress-bar livue-progress-hidden", pe.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(oe.parent) || document.body).appendChild(pe);
}
function ba() {
  if (!wn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), wn = !1, ao());
}
function wa(e) {
  Object.assign(oe, e), ba();
}
function Vt() {
  return oe.showOnRequest;
}
function Sa() {
  Ct++, se === null && (ya(), se = 0, pe && pe.classList.remove("livue-progress-hidden"), Mn(oe.minimum), oe.trickle && (dr = setInterval(function() {
    lo();
  }, oe.trickleSpeed)));
}
function Mn(e) {
  se !== null && (e = va(e, oe.minimum, 1), se = e, pe && (pe.style.transform = "translate3d(" + ga(e) + "%, 0, 0)"));
}
function lo() {
  if (se === null || se >= 1) return;
  let e;
  se < 0.2 ? e = 0.1 : se < 0.5 ? e = 0.04 : se < 0.8 ? e = 0.02 : se < 0.99 ? e = 5e-3 : e = 0, Mn(se + e);
}
function so() {
  Ct = Math.max(0, Ct - 1), !(Ct > 0) && se !== null && (Mn(1), clearInterval(dr), dr = null, setTimeout(function() {
    pe && pe.classList.add("livue-progress-hidden"), setTimeout(function() {
      se = null, pe && (pe.style.transform = "translate3d(-100%, 0, 0)");
    }, oe.speed);
  }, oe.speed));
}
function Ea() {
  Ct = 0, so();
}
function _a() {
  return se !== null;
}
function Aa() {
  return se;
}
const je = {
  configure: wa,
  start: Sa,
  set: Mn,
  trickle: lo,
  done: so,
  forceDone: Ea,
  isStarted: _a,
  getStatus: Aa,
  isRequestProgressEnabled: Vt
};
var wt = null, Kr = !1, it = !1, ve = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ce = /* @__PURE__ */ new Map(), Be = /* @__PURE__ */ new Map(), pr = /* @__PURE__ */ new WeakMap(), un = /* @__PURE__ */ new Map(), Pe = null;
function Da(e) {
  Object.assign(ve, e), e.progressBarColor && je.configure({ color: e.progressBarColor });
}
function Ca(e) {
  wt = e, !Kr && (Kr = !0, Pe = uo(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Pe },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (co(Pe), Pe = t.state.pageKey, qt(t.state.url, !1, !0));
  }), La());
}
function uo() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function co(e) {
  if (!(!ve.restoreScroll || !e)) {
    un.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = un.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, un.set(e, i);
      }
    });
  }
}
function Ta(e) {
  if (!(!ve.restoreScroll || !e)) {
    var t = un.get(e);
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
function La() {
  document.addEventListener("click", ka, !0), ve.prefetch && (document.addEventListener("mouseenter", xa, !0), document.addEventListener("mouseleave", Na, !0), document.addEventListener("mousedown", Ia, !0), document.addEventListener("focus", Ma, !0));
}
function ka(e) {
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
function Oa(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function xa(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = Oa(t);
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
function Na(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = pr.get(t);
      n && (clearTimeout(n), pr.delete(t));
    }
  }
}
function Ia(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || Pn(n);
    }
  }
}
function Ma(e) {
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
      return ve.cachePages && fo(t, i), i;
    }) : null;
  }).catch(function(r) {
    return Be.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Be.set(t, n), n;
}
function fo(e, t) {
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
function Pa() {
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
      it = !0, n || co(Pe), ve.showProgressBar && je.start();
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
          o = await l.text(), ve.cachePages && fo(r, o);
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
        var f = Ra(), p = /* @__PURE__ */ new Set();
        f.forEach(function(C) {
          C.livueIds.forEach(function(S) {
            p.add(S);
          });
        }), wt._stopObserver(), wt.destroyExcept(p), f.forEach(function(C) {
          C.element.parentNode && C.element.parentNode.removeChild(C.element);
        });
        var y = u.querySelector("title");
        y && (document.title = y.textContent), document.body.innerHTML = u.body.innerHTML, Va(f);
        var h = u.querySelector('meta[name="csrf-token"]'), m = document.querySelector('meta[name="csrf-token"]');
        if (h && m && (m.setAttribute("content", h.getAttribute("content")), ma()), Ha(u), ja(u), $a(u), t && (Pe = uo(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Pe },
          "",
          r
        )), qa(u), wt.rebootPreserving(), n)
          Ta(Pe);
        else if (location.hash) {
          var b = document.querySelector(location.hash);
          b ? b.scrollIntoView() : window.scrollTo(0, 0);
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
function Ra() {
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
function Va(e) {
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
function ja(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Ha(e) {
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
function $a(e) {
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
function qa(e) {
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
function za() {
  return it;
}
var Qe = /* @__PURE__ */ new Map(), Fa = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Gr(e, t) {
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
function po() {
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
function Zr() {
  return Fa.slice();
}
var hr = [], mr = [], jt = !1;
function Wa(e) {
  return e.isolate ? Ua(e) : new Promise(function(t, n) {
    hr.push({
      payload: e,
      resolve: t,
      reject: n
    }), jt || (jt = !0, queueMicrotask(ho));
  });
}
function Ba(e) {
  return new Promise(function(t, n) {
    mr.push({
      payload: e,
      resolve: t,
      reject: n
    }), jt || (jt = !0, queueMicrotask(ho));
  });
}
async function ho() {
  var e = hr, t = mr;
  if (hr = [], mr = [], jt = !1, !(e.length === 0 && t.length === 0)) {
    Vt() && je.start();
    var n = mo(), r = ct(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = e.map(function(b) {
      return b.payload;
    }), a = t.map(function(b) {
      return b.payload;
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
      for (var p = u.responses || [], y = u.lazyResponses || [], f = 0; f < p.length; f++)
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
        var h = y[f];
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
        lazyResponses: y,
        updateCount: e.length,
        lazyCount: t.length
      });
    } catch (b) {
      for (var f = 0; f < e.length; f++)
        e[f].reject(b);
      for (var f = 0; f < t.length; f++)
        t[f].reject(b);
      me("request.finished", {
        url: n,
        success: !1,
        error: b,
        updateCount: e.length,
        lazyCount: t.length
      });
    } finally {
      Vt() && je.done();
    }
  }
}
async function Ua(e) {
  Vt() && je.start();
  var t = mo(), n = ct(), r = {
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
function mo() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function zn(e, t, n, r, i) {
  return Wa({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
let vr = null, vo = /* @__PURE__ */ new Map();
function Ja() {
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
function Xa(e) {
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
function Ya(e, t) {
  typeof t == "function" && vo.set(e, t);
}
function yr(e) {
  vo.delete(e);
}
var go = [];
function x(e, t, n) {
  go.push({
    name: e,
    directive: t
  });
}
function Ka() {
  return go;
}
const Ve = /* @__PURE__ */ new Map(), He = /* @__PURE__ */ new Map();
let Qr = !1;
function ft() {
  return typeof window < "u" && window.Echo;
}
function Ga(e, t) {
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
function yo(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!ft())
    return Qr || (Qr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: f } = o, p = Ga(a, l);
    if (!p) continue;
    const y = l + ":" + a + ":" + s + ":" + e;
    if (He.has(y)) {
      r.push(y);
      continue;
    }
    const h = function(m) {
      try {
        n(u, m);
      } catch (b) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', b);
      }
    };
    if (l === "presence" && d)
      Za(p, s, h);
    else {
      const m = f ? "." + s : s;
      p.listen(m, h);
    }
    He.set(y, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: h,
      isPresenceEvent: d,
      isCustomEvent: f
    }), r.push(y);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      bo(r[i]);
  };
}
function Za(e, t, n) {
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
function bo(e) {
  const t = He.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    He.delete(e), Qa(t.channelKey);
  }
}
function ei(e) {
  const t = ":" + e, n = [];
  He.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    bo(n[r]);
}
function Qa(e) {
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
function ti() {
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
function el() {
  return {
    echoAvailable: ft(),
    channels: Array.from(Ve.keys()),
    subscriptions: Array.from(He.keys())
  };
}
function tl() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Ie = /* @__PURE__ */ new Map();
function Ht(e, t, n, r) {
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
function cn(e, t, n, r, i, o) {
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
function ni(e) {
  Ie.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Ie.delete(n);
  });
}
function nl(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    cn(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function rl(e, t) {
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
function il(e, t, n, r, i) {
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
function Fn(e) {
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
function ol(e, t, n, r, i) {
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
        var y = Math.round(p.loaded / p.total * 100);
        i({ overall: y });
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
        var y = new Error(p.error || p.message || "Upload failed");
        y.status = u.status, y.data = p, a(y);
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
          let f = i, p = o, y = a;
          i = null, o = null, a = null, Promise.resolve(f()).then(p).catch(y);
        }, t);
      });
    };
    Tt.set(n, l);
  }
  return Tt.get(n);
}
function $t(e, t) {
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
function ri(e) {
  let t = e + ":";
  for (let n of Tt.keys())
    n.startsWith(t) && Tt.delete(n);
  for (let n of Lt.keys())
    n.startsWith(t) && Lt.delete(n);
}
const Sn = "livue-tab-sync";
let Or = Date.now() + "-" + Math.random().toString(36).substr(2, 9), En = null, xr = /* @__PURE__ */ new Map(), ii = !1;
function wo() {
  ii || (ii = !0, typeof BroadcastChannel < "u" ? (En = new BroadcastChannel(Sn), En.onmessage = al) : window.addEventListener("storage", ll));
}
function al(e) {
  let t = e.data;
  t.tabId !== Or && So(t);
}
function ll(e) {
  if (e.key === Sn && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === Or) return;
      So(t);
    } catch {
    }
}
function So(e) {
  let t = xr.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function sl(e, t) {
  wo(), xr.set(e, t);
}
function oi(e) {
  xr.delete(e);
}
function ul(e, t, n, r) {
  wo();
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
function cl(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const Nr = /* @__PURE__ */ new Map();
async function fl(e, t = {}) {
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
      for (const y of p)
        if (y.trim())
          try {
            const h = JSON.parse(y);
            if (h.stream)
              dl(h.stream), n(h.stream);
            else {
              if (h.error)
                throw new Error(h.error);
              h.snapshot && (u = h);
            }
          } catch (h) {
            console.error("[LiVue Stream] Parse error:", h, y);
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
function dl(e) {
  const { to: t, content: n, replace: r } = e, i = Nr.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function ai(e, t, n = !1) {
  Nr.set(e, { el: t, replace: n });
}
function li(e) {
  Nr.delete(e);
}
function pl(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function Ir(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    pl(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = Ir(r) : t[n] = r;
  }
  return t;
}
function hl(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Ir(l), d = {};
    for (let f in s)
      d[f] = /* @__PURE__ */ (function(p, y) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return t(p + "." + y, h);
        };
      })(a, f);
    i[a] = _e(Object.assign({}, u, d));
  }
  return i;
}
function ml(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = Ir(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function vl(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function gl(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function br(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = Ja(), u = n.name, d = n.vueMethods || {}, f = n.jsonMethods || [], p = n.confirms || {}, y = n.isolate || !1, h = n.urlParams || null, m = n.uploads || null, b = n.tabSync || null, C = !1, S = i, N = o, T = a.initialHtml || null, _ = _e({}), L = [];
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
      for (let g = 0; g < c.length; g++) {
        let E = c[g];
        if (!E || typeof E != "object" || !E.bridge || typeof E.bridge != "object") continue;
        let D = Ue(e, E.name, { scope: E.scope || "auto" }, l);
        if (!D) continue;
        let v = E.bridge;
        for (let j in v) {
          let X = v[j];
          if (!X || typeof X != "object") continue;
          let B = X.prop, Q = X.mode || "two-way";
          if (!(!B || !(B in t))) {
            if (Q === "two-way" || Q === "store-to-state") {
              let G = Se(function() {
                return D[j];
              }, function($e) {
                t[B] !== $e && (t[B] = $e);
              });
              L.push(G);
            }
            if (Q === "two-way" || Q === "state-to-store") {
              let G = Se(function() {
                return t[B];
              }, function($e) {
                D[j] !== $e && (D[j] = $e);
              });
              L.push(G);
            }
          }
        }
      }
  }
  function k(c) {
    let g = ca(e, c, l);
    for (let E in g)
      _[E] = g[E];
    M(c);
  }
  k(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    I(), fa(e);
  });
  function O(c) {
    let g = document.querySelector('meta[name="livue-prefix"]'), D = "/" + (g ? g.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(c.token), v = document.createElement("a");
    v.href = D, v.download = c.name, v.style.display = "none", document.body.appendChild(v), v.click(), document.body.removeChild(v);
  }
  function H() {
    let c = Yt(S, t);
    return {
      snapshot: N,
      diffs: c
    };
  }
  function J(c, g) {
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
        let j = lt(v.state);
        Ko(t, j), S = JSON.parse(JSON.stringify(j));
      }
      N = c.snapshot, v.memo && (v.memo.errors ? be(w.errors, v.memo.errors) : gr(w.errors), v.memo.vueMethods && (d = v.memo.vueMethods), v.memo.jsonMethods && (f = v.memo.jsonMethods), v.memo.urlParams && (h = v.memo.urlParams), v.memo.uploads && (m = v.memo.uploads), v.memo.confirms && (p = v.memo.confirms), (v.memo.composables || v.memo.composableActions) && ml(U, v.memo), v.memo.stores && k(v.memo.stores));
    }
    if (h && rl(h, t), (c.html || c.fragments) && r && r._updateTemplate) {
      let v = {};
      if (c.snapshot) {
        let j = JSON.parse(c.snapshot);
        j.memo && (j.memo.transitionType && (v.transitionType = j.memo.transitionType), j.memo.skipTransition && (v.skipTransition = !0));
      }
      if (c.fragments) {
        let j = T || (a.el ? a.el.innerHTML : null);
        if (j) {
          let X = gl(j, c.fragments);
          T = X, r._updateTemplate(X, v);
        }
      } else
        T = c.html, r._updateTemplate(c.html, v);
    }
    if (c.events && c.events.length > 0) {
      for (var E = 0; E < c.events.length; E++)
        c.events[E].sourceId = e;
      nl(c.events);
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
    }), b && b.enabled && c.snapshot && !C && JSON.parse(c.snapshot).state) {
      let j = Yi(t), X = [];
      for (let B in j)
        (!g || !(B in g)) && X.push(B);
      if (X.length > 0) {
        let B = cl(j, X, b);
        Object.keys(B).length > 0 && ul(u, B, X, b);
      }
    }
    if (C = !1, c.jsonResult !== void 0)
      return c.jsonResult;
  }
  let F = _e({}), W = {}, U = {}, K = function(c, g) {
    return w.call(c, g);
  };
  vl(n) && (U = hl(n, K));
  let w = _e({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: F,
    refs: {},
    stores: _,
    _pinia: l,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(c) {
      let g = Yt(S, t);
      return c === void 0 ? Object.keys(g).length > 0 : c in g;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let c = Yt(S, t);
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
      return c ? F[c] || !1 : w.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(c) {
      let g = c ? F[c] || !1 : w.loading;
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
    call: async function(c, g, E) {
      let D, v = null;
      if (arguments.length === 1 ? D = [] : arguments.length === 2 ? Array.isArray(g) ? D = g : D = [g] : arguments.length >= 3 && (Array.isArray(g) && E && typeof E == "object" && (E.debounce || E.throttle) ? (D = g, v = E) : D = Array.prototype.slice.call(arguments, 1)), W[c])
        return W[c](w, D);
      if (d[c]) {
        try {
          new Function("state", "livue", d[c])(t, w);
        } catch (B) {
          console.error('[LiVue] Error executing #[Vue] method "' + c + '":', B);
        }
        return;
      }
      let j = f.includes(c), X = async function() {
        if (p[c] && !await w._showConfirm(p[c]))
          return;
        w.loading = !0, w.processing = c, F[c] = !0;
        let B;
        try {
          let Q = H(), G = await zn(Q.snapshot, c, D, Q.diffs, y || j);
          B = J(G, Q.diffs);
        } catch (Q) {
          if (j)
            throw { status: Q.status, errors: Q.data && Q.data.errors, message: Q.message };
          Q.status === 422 && Q.data && Q.data.errors ? be(w.errors, Q.data.errors) : Ye(Q, u);
        } finally {
          w.loading = !1, w.processing = null, delete F[c];
        }
        return B;
      };
      return v && v.debounce ? st(e + ":" + c, v.debounce)(X) : v && v.throttle ? $t(e + ":" + c, v.throttle)(X) : X();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(c, g) {
      let E = Array.prototype.slice.call(arguments, 2), D = { message: g || "Are you sure?" };
      if (await w._showConfirm(D))
        return w.call.apply(w, [c].concat(E));
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
    store: function(c, g, E) {
      if (g === void 0) {
        let D = Ue(e, c, E || { scope: "auto" }, l);
        if (D)
          return D;
        throw new Error('[LiVue] store("' + c + '"): store not found. Provide a definition or register it in PHP.');
      }
      return Tr(e, c, g, E, l);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(c) {
      let g = Ue(e, c, { scope: "auto" }, l);
      if (g)
        return _[c] = g, g;
      throw new Error('[LiVue] useStore("' + c + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(c) {
      let g = Ue(e, c, { scope: "global" }, l);
      if (g)
        return _[c] = g, g;
      throw new Error('[LiVue] useGlobalStore("' + c + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      w.loading = !0, w.processing = "$sync";
      try {
        let c = H(), g = await zn(c.snapshot, null, [], c.diffs, y);
        J(g, c.diffs);
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
    dispatch: function(c, g) {
      cn(c, g, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(c, g, E) {
      cn(g, E, "to", u, e, c);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(c, g) {
      cn(c, g, "self", u, e, null);
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
    upload: async function(c, g) {
      if (!m || !m[c]) {
        console.error('[LiVue] Property "' + c + '" is not configured for uploads.');
        return;
      }
      var E = $n(t, c);
      E && E.__livue_upload && E.ref && Fn([E.ref]), w.uploading = !0, w.uploadProgress = 0;
      try {
        var D = await il(g, u, c, m[c].token, function(v) {
          w.uploadProgress = v;
        });
        Xt(t, c, {
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
    uploadMultiple: async function(c, g) {
      if (!m || !m[c]) {
        console.error('[LiVue] Property "' + c + '" is not configured for uploads.');
        return;
      }
      w.uploading = !0, w.uploadProgress = 0;
      try {
        var E = await ol(g, u, c, m[c].token, function(G) {
          w.uploadProgress = G.overall;
        }), D = E.results || [], v = E.errors || [], j = $n(t, c), X = Array.isArray(j) ? j : [];
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
          Xt(t, c, X.concat(B));
        }
        if (v.length > 0) {
          var Q = {};
          v.forEach(function(G) {
            var $e = c + "." + G.index;
            Q[$e] = {
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
    removeUpload: function(c, g) {
      var E = $n(t, c);
      if (g !== void 0 && Array.isArray(E)) {
        var D = E[g];
        D && D.__livue_upload && D.ref && Fn([D.ref]), E.splice(g, 1), Xt(t, c, E.slice());
      } else
        E && E.__livue_upload && E.ref && Fn([E.ref]), Xt(t, c, null);
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
      g = g || [], w.loading = !0, w.streaming = !0, w.processing = c, w.streamingMethod = c, F[c] = !0;
      let E;
      try {
        let D = H();
        D.method = c, D.params = g, D.componentId = e;
        let v = await fl(D, {
          onChunk: function(j) {
          },
          onComplete: function(j) {
          },
          onError: function(j) {
            console.error("[LiVue Stream] Error:", j);
          }
        });
        v && (E = J(v, D.diffs));
      } catch (D) {
        D.status === 422 && D.data && D.data.errors ? be(w.errors, D.data.errors) : Ye(D, u);
      } finally {
        w.loading = !1, w.streaming = !1, w.processing = null, w.streamingMethod = null, delete F[c];
      }
      return E;
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
      }) : Ht(c, u, e, g);
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
        function(E, D) {
          g(E, D);
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
      }) : (Ya(e, c), function() {
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
    _updateServerState: function(c, g) {
      S = JSON.parse(JSON.stringify(c)), N = g;
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
      let c = Yt(S, t), g = {};
      for (let E in U) {
        let D = U[E], v = {}, j = [];
        for (let X in D)
          if (typeof D[X] == "function")
            j.push(X);
          else
            try {
              v[X] = JSON.parse(JSON.stringify(D[X]));
            } catch {
              v[X] = "[Unserializable]";
            }
        g[E] = { data: v, actions: j };
      }
      return {
        serverState: JSON.parse(JSON.stringify(S)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(c),
        diffs: c,
        memo: {
          name: u,
          isolate: y,
          urlParams: h,
          tabSync: b,
          hasUploads: !!m,
          uploadProps: m ? Object.keys(m) : [],
          vueMethods: Object.keys(d),
          confirmMethods: Object.keys(p),
          composableNames: Object.keys(U)
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
  for (let c in U)
    w[c] = U[c];
  async function re() {
    w.loading = !0, w.processing = "$refresh", F.$refresh = !0;
    try {
      let c = H(), g = await zn(c.snapshot, null, [], c.diffs, y);
      return J(g, c.diffs);
    } catch (c) {
      c.status === 422 && c.data && c.data.errors ? be(w.errors, c.data.errors) : Ye(c, u);
    } finally {
      w.loading = !1, w.processing = null, delete F.$refresh;
    }
  }
  W.$refresh = function() {
    return re();
  }, b && b.enabled && sl(u, function(c, g, E) {
    let D = !1;
    if (E.reactive === !0)
      D = !0;
    else if (Array.isArray(E.reactive) && E.reactive.length > 0) {
      for (let v in c)
        if (E.reactive.includes(v)) {
          D = !0;
          break;
        }
    }
    if (D) {
      for (let v in c)
        E.only && !E.only.includes(v) || E.except && E.except.includes(v) || v in t && (t[v] = c[v]);
      C = !0, w.sync();
      return;
    }
    for (let v in c)
      E.only && !E.only.includes(v) || E.except && E.except.includes(v) || v in t && (t[v] = c[v]);
    for (let v in c)
      E.only && !E.only.includes(v) || E.except && E.except.includes(v) || (S[v] = JSON.parse(JSON.stringify(c[v])));
  });
  var dt = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(w, {
    get: function(c, g, E) {
      if (g in c || typeof g == "symbol")
        return Reflect.get(c, g, E);
      if (typeof g == "string" && g.startsWith("$")) {
        if (W[g])
          return function() {
            var j = Array.prototype.slice.call(arguments);
            return W[g](w, j);
          };
        var D = g.slice(1);
        if (D) {
          var v = Reflect.get(c, D, E);
          if (typeof v == "function")
            return function() {
              var j = Array.prototype.slice.call(arguments);
              return v.apply(c, j);
            };
        }
      }
      if (typeof g == "string" && !g.startsWith("$") && !dt[g])
        return function() {
          var j = Array.prototype.slice.call(arguments);
          return w.call(g, ...j);
        };
    },
    set: function(c, g, E, D) {
      return Reflect.set(c, g, E, D);
    },
    has: function(c, g) {
      if (typeof g == "string" && g.startsWith("$")) {
        if (W[g])
          return !0;
        var E = g.slice(1);
        if (E) {
          var D = Reflect.get(c, E, c);
          if (typeof D == "function")
            return !0;
        }
      }
      return Reflect.has(c, g);
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
function fn(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", f = JSON.parse(d), p = f.memo ? f.memo.name : "", y = lt(f.state || {}), h = f.memo || {}, m = s.innerHTML, b = s.tagName.toLowerCase(), C = s.nextElementSibling;
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
        let H = t._childRegistry[O];
        if (H.name === p && !o[O]) {
          S = H;
          break;
        }
      }
    if (S) {
      o[S.id] = !0, S.rootTag = b;
      let O = h.reactive || [];
      if (O.length > 0) {
        for (var N = 0; N < O.length; N++) {
          var T = O[N];
          T in y && (S.state[T] = y[T]);
        }
        S.livue._updateServerState(y, d), S.componentRef && S.componentRef._updateTemplate && S.componentRef._updateTemplate(m);
      }
    }
    let _ = !S;
    if (!S) {
      let H = "livue-child-" + Qo();
      t._versions[H] = 0;
      let J = ar(y), F = JSON.parse(JSON.stringify(y)), W = Object.assign({ name: h.name || p }, h), U = { _updateTemplate: null }, K = po(), w = br(u, J, W, U, F, d, {
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
      let Jt = h.errors || null;
      Jt && be(re.errors, Jt), S = {
        tagName: H,
        state: J,
        memo: W,
        livue: re,
        composables: dt,
        componentRef: U,
        name: p,
        id: u,
        rootTag: b
      };
      let c = h.listeners || null;
      if (c)
        for (let E in c)
          (function(D, v) {
            Ht(E, p, u, function(j) {
              v.call(D, j);
            });
          })(c[E], re);
      let g = h.echo || null;
      g && g.length && (function(E, D) {
        yo(E, g, function(v, j) {
          D.call(v, j);
        });
      })(u, re), U._updateTemplate = function(E) {
        let D = t.el.querySelector('[data-livue-id="' + u + '"]');
        D && Gi(D);
        let v = fn(E, t), j = _n(
          "<" + S.rootTag + ">" + v.template + "</" + S.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let B in v.childDefs)
          t.vueApp._context.components[B] || t.vueApp.component(B, v.childDefs[B]);
        t.vueApp._context.components[S.tagName]._updateRender(j), Nn(function() {
          let B = t.el.querySelector('[data-livue-id="' + u + '"]');
          B && Zi(B);
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
      call: function(O, H) {
        return S.livue.call(O, H || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(O, H) {
        return S.livue.set(O, H);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(O, H) {
        return S.livue.dispatch(O, H);
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
    if (M && t._rootState && Ht("$modelUpdate", S.name, u, function(O) {
      O && O.value !== void 0 && (t._rootState[M] = O.value);
    }), _) {
      let O = _n(
        "<" + b + ">" + m + "</" + b + ">",
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
let si = 0;
function wr() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Wn = /* @__PURE__ */ new WeakMap();
function ui() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const yl = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (si++, r = "livue-transition-" + si), Wn.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), wr() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    ui();
  },
  updated(e, t) {
    let n = Wn.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), wr() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    Wn.delete(e), e.removeAttribute("data-livue-transition"), ui();
  }
};
function bl(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function wl(e) {
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
function Sl(e, t) {
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
function El(e) {
  return Jo({
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
            let u = await Ba({
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
        let f = "lazy-" + Bn + "-" + Date.now(), p = d.memo ? d.memo.name : "", y = lt(d.state || {}), h = d.memo || {}, { createLivueHelper: m, buildComponentDef: b, processTemplate: C, createReactiveState: S } = e._lazyHelpers, N = S(y), T = JSON.parse(JSON.stringify(y)), _ = { _updateTemplate: null }, L = m(
          f,
          N,
          h,
          _,
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
        let k = "livue-lazy-child-" + Bn, O = C(u.html, e), H = _n(
          O.template,
          'data-livue-id="' + f + '"'
        ), J = b(
          H,
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
          componentRef: _,
          name: p,
          id: f
        }, _._updateTemplate = function(W) {
          let U = C(W, e), K = _n(
            U.template,
            'data-livue-id="' + f + '"'
          );
          for (let re in U.childDefs)
            e.vueApp._context.components[re] || e.vueApp.component(re, U.childDefs[re]);
          let w = b(
            K,
            N,
            I,
            M,
            e._versions,
            p
          );
          e.vueApp._context.components[k] = w, e._versions[k] = (e._versions[k] || 0) + 1, i.value = w;
        };
        let F = h.listeners || null;
        if (F)
          for (let W in F)
            (function(U, K) {
              Ht(W, p, f, function(w) {
                K.call(U, w);
              });
            })(F[W], I);
        for (let W in O.childDefs)
          e.vueApp._context.components[W] || e.vueApp.component(W, O.childDefs[W]);
        e._versions[k] = 0, e.vueApp._context.components[k] || e.vueApp.component(k, J), i.value = J, r.value = !0;
      }
      return Ji(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Ui(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? $r(i.value) : $r("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class _l {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(t) {
    this.el = t, this.componentId = t.dataset.livueId;
    let n = t.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = ar(lt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = _e({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: br,
      buildComponentDef: fr,
      processTemplate: fn,
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
      _updateTemplate: function(m, b) {
        b = b || {}, me("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: m
        });
        var C = wl(r.el);
        Gi(r.el);
        let S = fn(m, r);
        if (!r.vueApp) return;
        for (let T in S.childDefs)
          r.vueApp._context.components[T] || r.vueApp.component(T, S.childDefs[T]);
        function N() {
          r._currentRootDef._updateRender(S.template), Nn(function() {
            Zi(r.el), Sl(r.el, C), me("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (b.skipTransition) {
          N();
          return;
        }
        wr() ? bl(N, { type: b.transitionType }) : N();
      }
    }, o = JSON.parse(JSON.stringify(lt(t.state || {})));
    this._cleanups = po(), this._pinia = Fr();
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
    let u = fn(this.el.innerHTML, this), d = t.memo && t.memo.errors || null;
    d && be(l.errors, d);
    let f = t.memo && t.memo.listeners || null;
    if (f)
      for (let m in f)
        (function(b, C, S, N) {
          Ht(m, S, N, function(T) {
            C.call(b, T);
          });
        })(f[m], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = yo(r.componentId, p, function(m, b) {
      l.call(m, b);
    }));
    let y = fr(u.template, r.state, l, s, r._versions, r.name);
    this._currentRootDef = y, this._rootDefRef = Cr(y), this.vueApp = Xo({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", El(this)), this._applyPluginsAndMount();
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
    let i = Ka();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), ni(t), ri(t), yr(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && oi(n.name), ei(t);
    }
    if (me("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), ni(this.componentId), ri(this.componentId), yr(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && oi(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), ei(this.componentId), this.vueApp) {
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
let ci = /* @__PURE__ */ new Set();
const Al = {
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
    ci.has(u) || (ci.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Un = /* @__PURE__ */ new WeakMap(), Dl = {
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
}, Kt = /* @__PURE__ */ new WeakMap(), Cl = {
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
    let f = l.leave === !0, p = !1, y = new IntersectionObserver(
      function(h) {
        let m = h[0];
        (f ? !m.isIntersecting : m.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (y.disconnect(), Kt.delete(e)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    y.observe(e), Kt.set(e, y);
  },
  unmounted(e) {
    let t = Kt.get(e);
    t && (t.disconnect(), Kt.delete(e));
  }
};
var An = /* @__PURE__ */ new Set(), tt = /* @__PURE__ */ new WeakMap(), fi = !1;
function ot(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function Tl(e, t) {
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
      var r = t.value, i = t.modifiers || {}, o = Tl(n, i);
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
function di() {
  An.forEach(function(e) {
    e.isConnected ? Sr(e) : (An.delete(e), tt.delete(e));
  });
}
function Ll() {
  fi || (fi = !0, window.addEventListener("popstate", di), window.addEventListener("livue:navigated", di));
}
const kl = {
  mounted(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), An.add(e), Ll(), Sr(e);
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
let pi = 0;
const Ol = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    pi++;
    let n = "livue-ignore-" + pi;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, pt = /* @__PURE__ */ new WeakMap();
let hi = 0;
function xl(e) {
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
function Nl(e) {
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
function Gt(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function mi(e, t) {
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
function Il(e) {
  return !!e.component;
}
const Ml = {
  mounted(e, t, n) {
    let r = xl(n);
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
    hi++;
    let s = "model-" + hi, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: f } = Nl(l);
    l.live && !d && !f && (d = 150);
    function p(_) {
      if (l.number) {
        let L = Number(_);
        _ = isNaN(L) ? 0 : L;
      }
      l.boolean && (_ = !!_ && _ !== "false" && _ !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = _ : o[a] = _;
    }
    function y(_) {
      d > 0 ? st(s, d)(function() {
        p(_);
      }) : f > 0 ? $t(s, f)(function() {
        p(_);
      }) : p(_);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let m = Il(n), b = n.component, C = null, S = null, N = null, T = null;
    if (m && b)
      T = b.emit, b.emit = function(_, ...L) {
        if (_ === "update:modelValue") {
          let I = L[0];
          y(I);
          return;
        }
        return T.call(b, _, ...L);
      }, b.props && "modelValue" in b.props && (N = Se(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(_) {
          b.vnode && b.vnode.props && (b.vnode.props.modelValue = _), b.exposed && typeof b.exposed.setValue == "function" && b.exposed.setValue(_), b.update && b.update();
        },
        { immediate: !0 }
      )), pt.set(e, {
        isComponent: !0,
        componentInstance: b,
        originalEmit: T,
        stopWatcher: N,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let _ = st(s, d);
        C = function(L) {
          let I = Gt(L.target);
          _(function() {
            p(I);
          });
        };
      } else if (f > 0) {
        let _ = $t(s, f);
        C = function(L) {
          let I = Gt(L.target);
          _(function() {
            p(I);
          });
        };
      } else
        C = function(_) {
          p(Gt(_.target));
        };
      l.enter ? (S = function(_) {
        _.key === "Enter" && p(Gt(_.target));
      }, e.addEventListener("keyup", S)) : e.addEventListener(u, C), mi(e, h), pt.set(e, {
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
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], mi(e, a);
    }
  },
  unmounted(e) {
    let t = pt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), pt.delete(e));
  }
}, Jn = /* @__PURE__ */ new WeakMap(), Pl = 2500;
function Rl(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Pl;
}
const Vl = {
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = Rl(l), u = l["keep-alive"] === !0, d = l.visible === !0, f = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      f.isPaused || d && !f.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function y() {
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
    ), f.observer.observe(e)), document.addEventListener("visibilitychange", h), f.visibilityHandler = h, y(), Jn.set(e, f);
  },
  unmounted(e) {
    let t = Jn.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), Jn.delete(e));
  }
}, Zt = /* @__PURE__ */ new WeakMap();
let Dn = typeof navigator < "u" ? navigator.onLine : !0, Cn = /* @__PURE__ */ new Set(), vi = !1;
function jl() {
  vi || typeof window > "u" || (vi = !0, window.addEventListener("online", function() {
    Dn = !0, Cn.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    Dn = !1, Cn.forEach(function(e) {
      e(!1);
    });
  }));
}
const Hl = {
  created(e, t) {
    jl();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", Dn && (e.style.display = "none")), Zt.set(e, o);
  },
  mounted(e, t) {
    let n = Zt.get(e);
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
    let t = Zt.get(e);
    t && t.updateFn && Cn.delete(t.updateFn), Zt.delete(e);
  }
};
let gi = 0;
const ht = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new Map(), $l = {
  created(e, t) {
    gi++;
    let n = "livue-replace-" + gi, r = t.modifiers.self === !0;
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
}, mt = /* @__PURE__ */ new WeakMap(), yi = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, ql = 200;
function zl(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(yi))
    if (e[t])
      return yi[t];
  return ql;
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
const Fl = {
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
    let i = mt.get(e), o = t.modifiers || {}, a = zl(o), l = t.value, s = null, u = null;
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
}, Qt = /* @__PURE__ */ new WeakMap(), Wl = {
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
    Qt.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = Qt.get(e), i = Ee(n);
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
    let t = Qt.get(e);
    t && (t.stopWatch && t.stopWatch(), Qt.delete(e));
  }
}, vt = /* @__PURE__ */ new WeakMap(), Bl = {
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
    vt.set(e, { targetId: n }), ai(n, e, r);
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
      li(n.targetId);
      const i = t.modifiers.replace || !1;
      ai(r, e, i), vt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = vt.get(e);
    t && (li(t.targetId), vt.delete(e));
  }
}, bi = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, wi = ["ctrl", "alt", "shift", "meta"];
let Si = 0;
const Ei = /* @__PURE__ */ new Set();
function Ul(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function Jl(e, t) {
  for (let i = 0; i < wi.length; i++) {
    let o = wi[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in bi)
    t[i] && (n = !0, e.key === bi[i] && (r = !0));
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
        Ei.has(L) || (console.warn(
          "[LiVue] " + L + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), Ei.add(L));
      }
      Si++;
      const p = "v-" + e + "-" + Si, y = Ul(d);
      let h = null, m = null;
      d.debounce && (h = st(p, y)), d.throttle && (m = $t(p, y));
      let b = !1, C = null;
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
              const H = function() {
                O();
              };
              h ? h(H) : m ? m(H) : H();
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
        if (!(d.self && L.target !== a) && !(r && !Jl(L, d))) {
          if (d.once) {
            if (b)
              return;
            b = !0;
          }
          d.prevent && L.preventDefault(), d.stop && L.stopPropagation(), S();
        }
      }, T = {};
      d.capture && (T.capture = !0), d.passive && (T.passive = !0);
      const _ = {
        handler: N,
        options: T,
        outsideHandler: null
      };
      if (n && d.outside) {
        const L = function(I) {
          if (!a.contains(I.target) && I.target !== a) {
            if (d.once) {
              if (b)
                return;
              b = !0;
            }
            S();
          }
        };
        document.addEventListener(e, L, T), _.outsideHandler = L;
      } else
        a.addEventListener(e, N, T);
      o.set(a, _);
    },
    updated(a, l, s) {
    },
    unmounted(a) {
      const l = o.get(a);
      l && (l.outsideHandler ? document.removeEventListener(e, l.outsideHandler, l.options) : a.removeEventListener(e, l.handler, l.options), o.delete(a));
    }
  };
}
const Xl = z("click", {
  supportsOutside: !0,
  allowArg: !1
}), Yl = {
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
let _i = 0;
const Kl = {
  created(e, t) {
    let n = t.value;
    n || (_i++, n = "scroll-" + _i), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, gt = /* @__PURE__ */ new WeakMap();
function Ai(e, t, n, r, i) {
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
const Gl = {
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
        Ai(e, i, o, l, s);
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
        Ai(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = gt.get(e);
    t && (t.stopWatch && t.stopWatch(), gt.delete(e));
  }
}, en = /* @__PURE__ */ new WeakMap();
let Di = 0;
function Zl(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Ql(e, t) {
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
function es(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const ts = {
  mounted(e, t, n) {
    let r = Ql(t, n);
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
    Di++;
    let s = "watch-" + i + "-" + Di;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), en.set(e, { blurHandler: p });
      return;
    }
    let u = Zl(l) || 150, d = st(s, u), f = Se(
      function() {
        return es(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    en.set(e, { stopWatcher: f });
  },
  unmounted(e) {
    let t = en.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), en.delete(e));
  }
}, kt = /* @__PURE__ */ new WeakMap();
let Ci = 0;
function ns(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function rs(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function is(e, t) {
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
function Eo(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function os(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function as(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function ls(e) {
  return as(e) ? e : e.querySelector("input, textarea, select");
}
function Wt(e, t) {
  return {
    mounted(n, r, i) {
      if (ns(i) && !rs(i))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let a = is(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: l } = a, s = os(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + e + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Ci++;
      let d = e + "-" + Ci, f = ls(n);
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
const ss = Wt("debounce", function(e, t, n, r, i) {
  let o = Eo(r) || 150, a = st(i, o);
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
}), us = Wt("throttle", function(e, t, n, r, i) {
  let o = Eo(r) || 150, a = $t(i, o);
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
}), cs = Mr.unmounted;
Mr.unmounted = function(e) {
  let t = kt.get(e), n = t ? t.targetEl : e;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), cs(e);
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
}), fs = Pr.unmounted;
Pr.unmounted = function(e) {
  let t = kt.get(e), n = t ? t.targetEl : e;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), fs(e);
};
const ds = Wt("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = zt(o.target);
      a = !!a && a !== "false" && a !== "0", Ft(n, t, a);
    }
  };
});
function Ti(e, t) {
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
    t % 2 ? Ti(Object(n), !0).forEach(function(r) {
      ps(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ti(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function dn(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? dn = function(t) {
    return typeof t;
  } : dn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, dn(e);
}
function ps(e, t, n) {
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
function hs(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function ms(e, t) {
  if (e == null) return {};
  var n = hs(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var vs = "1.15.6";
function Te(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var ke = Te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Bt = Te(/Edge/i), Li = Te(/firefox/i), Ot = Te(/safari/i) && !Te(/chrome/i) && !Te(/android/i), Rr = Te(/iP(ad|od|hone)/i), _o = Te(/chrome/i) && Te(/android/i), Ao = {
  capture: !1,
  passive: !1
};
function q(e, t, n) {
  e.addEventListener(t, n, !ke && Ao);
}
function $(e, t, n) {
  e.removeEventListener(t, n, !ke && Ao);
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
function Do(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function we(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Tn(e, t) : Tn(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = Do(e));
  }
  return null;
}
var ki = /\s+/g;
function fe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(ki, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(ki, " ");
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
function Co(e, t, n) {
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
      var y = at(i || e), h = y && y.a, m = y && y.d;
      y && (a /= m, l /= h, f /= h, d /= m, s = a + d, u = l + f);
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
function Oi(e, t, n) {
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
function xi(e) {
  var t = 0, n = 0, r = Ae();
  if (e)
    do {
      var i = at(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function gs(e, t) {
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
function ys(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Kn(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var xt;
function To(e, t) {
  return function() {
    if (!xt) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), xt = setTimeout(function() {
        xt = void 0;
      }, t);
    }
  };
}
function bs() {
  clearTimeout(xt), xt = void 0;
}
function Lo(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function ko(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Oo(e, t, n) {
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
function ws() {
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
      e.splice(gs(e, {
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
        var s = 0, u = l.target, d = u.fromRect, f = ne(u), p = u.prevFromRect, y = u.prevToRect, h = l.rect, m = at(u, !0);
        m && (f.top -= m.f, f.left -= m.e), u.toRect = f, u.thisAnimationDuration && Kn(p, f) && !Kn(d, f) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - f.top) / (h.left - f.left) === (d.top - f.top) / (d.left - f.left) && (s = Es(h, p, y, i.options)), Kn(f, d) || (u.prevFromRect = d, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, h, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
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
        r.animatingX = !!d, r.animatingY = !!f, P(r, "transform", "translate3d(" + d + "px," + f + "px,0)"), this.forRepaintDummy = Ss(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Ss(e) {
  return e.offsetWidth;
}
function Es(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var Ke = [], Gn = {
  initializeByDefault: !0
}, Ut = {
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
function _s(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, d = e.oldDraggableIndex, f = e.newDraggableIndex, p = e.originalEvent, y = e.putSortable, h = e.extraEventProperties;
  if (t = t || n && n[ce], !!t) {
    var m, b = t.options, C = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ke && !Bt ? m = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = d, m.newDraggableIndex = f, m.originalEvent = p, m.pullMode = y ? y.lastPutMode : void 0;
    var S = De(De({}, h), Ut.getEventProperties(r, t));
    for (var N in S)
      m[N] = S[N];
    n && n.dispatchEvent(m), b[C] && b[C].call(t, m);
  }
}
var As = ["evt"], ue = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = ms(r, As);
  Ut.pluginEvent.bind(R)(t, n, De({
    dragEl: A,
    parentEl: ee,
    ghostEl: V,
    rootEl: Y,
    nextEl: We,
    lastDownEl: pn,
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
    hideGhostForTarget: Mo,
    unhideGhostForTarget: Po,
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
  _s(De({
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
var A, ee, V, Y, We, pn, Z, Me, nt, de, Nt, xe, tn, ie, et = !1, Ln = !1, kn = [], qe, ge, Zn, Qn, Ni, Ii, St, Ge, It, Mt = !1, nn = !1, hn, ae, er = [], Er = !1, On = [], Rn = typeof document < "u", rn = Rr, Mi = Bt || ke ? "cssFloat" : "float", Ds = Rn && !_o && !Rr && "draggable" in document.createElement("div"), xo = (function() {
  if (Rn) {
    if (ke)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), No = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = ut(t, 0, n), a = ut(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + ne(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + ne(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Mi] === "none" || a && r[Mi] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Cs = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, Ts = function(t, n) {
  var r;
  return kn.some(function(i) {
    var o = i[ce].options.emptyInsertThreshold;
    if (!(!o || Vr(i))) {
      var a = ne(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, Io = function(t) {
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
  (!i || dn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, Mo = function() {
  !xo && V && P(V, "display", "none");
}, Po = function() {
  !xo && V && P(V, "display", "");
};
Rn && !_o && document.addEventListener("click", function(e) {
  if (Ln)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Ln = !1, !1;
}, !0);
var ze = function(t) {
  if (A) {
    t = t.touches ? t.touches[0] : t;
    var n = Ts(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ce]._onDragOver(r);
    }
  }
}, Ls = function(t) {
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
      return No(e, this.options);
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
  Ut.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  Io(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Ds, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? q(e, "pointerdown", this._onTapStart) : (q(e, "mousedown", this._onTapStart), q(e, "touchstart", this._onTapStart)), this.nativeDraggable && (q(e, "dragover", this), q(e, "dragenter", this)), kn.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Le(this, ws());
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
      if (Rs(r), !A && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Ot && s && s.tagName.toUpperCase() === "SELECT") && (s = we(s, i.draggable, r, !1), !(s && s.animated) && pn !== s)) {
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
      if (Y = o, A = r, ee = A.parentNode, We = A.nextSibling, pn = r, tn = a.group, R.dragged = A, qe = {
        target: A,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Ni = qe.clientX - u.left, Ii = qe.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, A.style["will-change"] = "all", s = function() {
        if (ue("delayEnded", i, {
          evt: t
        }), R.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Li && i.nativeDraggable && (A.draggable = !0), i._triggerDragStart(t, n), le({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), fe(A, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Co(A, d.trim(), tr);
      }), q(l, "dragover", ze), q(l, "mousemove", ze), q(l, "touchmove", ze), a.supportPointer ? (q(l, "pointerup", i._onDrop), !this.nativeDraggable && q(l, "pointercancel", i._onDrop)) : (q(l, "mouseup", i._onDrop), q(l, "touchend", i._onDrop), q(l, "touchcancel", i._onDrop)), Li && this.nativeDraggable && (this.options.touchStartThreshold = 4, A.draggable = !0), ue("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Bt || ke))) {
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
    A && tr(A), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._disableDelayedDrag), $(t, "touchend", this._disableDelayedDrag), $(t, "touchcancel", this._disableDelayedDrag), $(t, "pointerup", this._disableDelayedDrag), $(t, "pointercancel", this._disableDelayedDrag), $(t, "mousemove", this._delayedDragTouchMoveHandler), $(t, "touchmove", this._delayedDragTouchMoveHandler), $(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? q(document, "pointermove", this._onTouchMove) : n ? q(document, "touchmove", this._onTouchMove) : q(document, "mousemove", this._onTouchMove) : (q(A, "dragend", this), q(Y, "dragstart", this._onDragStart));
    try {
      document.selection ? mn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (et = !1, Y && A) {
      ue("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && q(document, "dragover", Ls);
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
      this._lastX = ge.clientX, this._lastY = ge.clientY, Mo();
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
        } while (n = Do(n));
      Po();
    }
  },
  _onTouchMove: function(t) {
    if (qe) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = V && at(V, !0), l = V && a && a.a, s = V && a && a.d, u = rn && ae && xi(ae), d = (o.clientX - qe.clientX + i.x) / (l || 1) + (u ? u[0] - er[0] : 0) / (l || 1), f = (o.clientY - qe.clientY + i.y) / (s || 1) + (u ? u[1] - er[1] : 0) / (s || 1);
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
      var t = this.options.fallbackOnBody ? document.body : Y, n = ne(A, !0, rn, !0, t), r = this.options;
      if (rn) {
        for (ae = t; P(ae, "position") === "static" && P(ae, "transform") === "none" && ae !== document; )
          ae = ae.parentNode;
        ae !== document.body && ae !== document.documentElement ? (ae === document && (ae = Ae()), n.top += ae.scrollTop, n.left += ae.scrollLeft) : ae = Ae(), er = xi(ae);
      }
      V = A.cloneNode(!0), fe(V, r.ghostClass, !1), fe(V, r.fallbackClass, !0), fe(V, r.dragClass, !0), P(V, "transition", ""), P(V, "transform", ""), P(V, "box-sizing", "border-box"), P(V, "margin", 0), P(V, "top", n.top), P(V, "left", n.left), P(V, "width", n.width), P(V, "height", n.height), P(V, "opacity", "0.8"), P(V, "position", rn ? "absolute" : "fixed"), P(V, "zIndex", "100000"), P(V, "pointerEvents", "none"), R.ghost = V, t.appendChild(V), P(V, "transform-origin", Ni / parseInt(V.style.width) * 100 + "% " + Ii / parseInt(V.style.height) * 100 + "%");
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
    ue("setupClone", this), R.eventCanceled || (Z = ko(A), Z.removeAttribute("id"), Z.draggable = !1, Z.style["will-change"] = "", this._hideClone(), fe(Z, this.options.chosenClass, !1), R.clone = Z), r.cloneId = mn(function() {
      ue("clone", r), !R.eventCanceled && (r.options.removeCloneOnHide || Y.insertBefore(Z, A), r._hideClone(), le({
        sortable: r,
        name: "clone"
      }));
    }), !n && fe(A, o.dragClass, !0), n ? (Ln = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : ($(document, "mouseup", r._onDrop), $(document, "touchend", r._onDrop), $(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, A)), q(document, "drop", r), P(A, "transform", "translateZ(0)")), et = !0, r._dragStartId = mn(r._dragStarted.bind(r, n, t)), q(document, "selectstart", r), St = !0, window.getSelection().removeAllRanges(), Ot && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = R.active, d = tn === s, f = l.sort, p = ie || u, y, h = this, m = !1;
    if (Er) return;
    function b(re, dt) {
      ue(re, h, De({
        evt: t,
        isOwner: d,
        axis: y ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: f,
        fromSortable: p,
        target: r,
        completed: S,
        onMove: function(c, g) {
          return on(Y, n, A, i, c, ne(c), t, g);
        },
        changed: N
      }, dt));
    }
    function C() {
      b("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function S(re) {
      return b("dragOverCompleted", {
        insertion: re
      }), re && (d ? u._hideClone() : u._showClone(h), h !== p && (fe(A, ie ? ie.options.ghostClass : u.options.ghostClass, !1), fe(A, l.ghostClass, !0)), ie !== h && h !== R.active ? ie = h : h === R.active && ie && (ie = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        b("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === A && !A.animated || r === n && !r.animated) && (Ge = null), !l.dragoverBubble && !t.rootEl && r !== document && (A.parentNode[ce]._isOutsideThisEl(t.target), !re && ze(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
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
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = we(r, l.draggable, n, !0), b("dragOver"), R.eventCanceled) return m;
    if (A.contains(t.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return S(!1);
    if (Ln = !1, u && !l.disabled && (d ? f || (a = ee !== Y) : ie === this || (this.lastPutMode = tn.checkPull(this, u, A, t)) && s.checkPut(this, u, A, t))) {
      if (y = this._getDirection(t, r) === "vertical", i = ne(A), b("dragOverValid"), R.eventCanceled) return m;
      if (a)
        return ee = Y, C(), this._hideClone(), b("revert"), R.eventCanceled || (We ? Y.insertBefore(A, We) : Y.appendChild(A)), S(!0);
      var T = Vr(n, l.draggable);
      if (!T || Ns(t, y, this) && !T.animated) {
        if (T === A)
          return S(!1);
        if (T && n === t.target && (r = T), r && (o = ne(r)), on(Y, n, A, i, r, o, t, !!r) !== !1)
          return C(), T && T.nextSibling ? n.insertBefore(A, T.nextSibling) : n.appendChild(A), ee = n, N(), S(!0);
      } else if (T && xs(t, y, this)) {
        var _ = ut(n, 0, l, !0);
        if (_ === A)
          return S(!1);
        if (r = _, o = ne(r), on(Y, n, A, i, r, o, t, !1) !== !1)
          return C(), n.insertBefore(A, _), ee = n, N(), S(!0);
      } else if (r.parentNode === n) {
        o = ne(r);
        var L = 0, I, M = A.parentNode !== n, k = !Cs(A.animated && A.toRect || i, r.animated && r.toRect || o, y), O = y ? "top" : "left", H = Oi(r, "top", "top") || Oi(A, "top", "top"), J = H ? H.scrollTop : void 0;
        Ge !== r && (I = o[O], Mt = !1, nn = !k && l.invertSwap || M), L = Is(t, r, o, y, k ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, nn, Ge === r);
        var F;
        if (L !== 0) {
          var W = he(A);
          do
            W -= L, F = ee.children[W];
          while (F && (P(F, "display") === "none" || F === V));
        }
        if (L === 0 || F === r)
          return S(!1);
        Ge = r, It = L;
        var U = r.nextElementSibling, K = !1;
        K = L === 1;
        var w = on(Y, n, A, i, r, o, t, K);
        if (w !== !1)
          return (w === 1 || w === -1) && (K = w === 1), Er = !0, setTimeout(Os, 30), C(), K && !U ? n.appendChild(A) : r.parentNode.insertBefore(A, K ? U : r), H && Lo(H, 0, J - H.scrollTop), ee = A.parentNode, I !== void 0 && !nn && (hn = Math.abs(I - ne(r)[O])), N(), S(!0);
      }
      if (n.contains(A))
        return S(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", ze), $(document, "mousemove", ze), $(document, "touchmove", ze);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._onDrop), $(t, "touchend", this._onDrop), $(t, "pointerup", this._onDrop), $(t, "pointercancel", this._onDrop), $(t, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (de = he(A), xe = he(A, r.draggable), ue("drop", this, {
      evt: t
    }), ee = A && A.parentNode, de = he(A), xe = he(A, r.draggable), R.eventCanceled) {
      this._nulling();
      return;
    }
    et = !1, nn = !1, Mt = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _r(this.cloneId), _r(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ot && P(document.body, "user-select", ""), P(A, "transform", ""), t && (St && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), V && V.parentNode && V.parentNode.removeChild(V), (Y === ee || ie && ie.lastPutMode !== "clone") && Z && Z.parentNode && Z.parentNode.removeChild(Z), A && (this.nativeDraggable && $(A, "dragend", this), tr(A), A.style["will-change"] = "", St && !et && fe(A, ie ? ie.options.ghostClass : this.options.ghostClass, !1), fe(A, this.options.chosenClass, !1), le({
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
    ue("nulling", this), Y = A = ee = V = We = Z = pn = Me = qe = ge = St = de = xe = nt = Nt = Ge = It = ie = tn = R.dragged = R.ghost = R.clone = R.active = null, On.forEach(function(t) {
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
        A && (this._onDragOver(t), ks(t));
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
      n = r[i], we(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Ps(n));
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
    var i = Ut.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && Io(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ue("destroy", this);
    var t = this.el;
    t[ce] = null, $(t, "mousedown", this._onTapStart), $(t, "touchstart", this._onTapStart), $(t, "pointerdown", this._onTapStart), this.nativeDraggable && ($(t, "dragover", this), $(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
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
      A.parentNode == Y && !this.options.group.revertClone ? Y.insertBefore(Z, A) : We ? Y.insertBefore(Z, We) : Y.appendChild(Z), this.options.group.revertClone && this.animate(A, Z), P(Z, "display", ""), Me = !1;
    }
  }
};
function ks(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function on(e, t, n, r, i, o, a, l) {
  var s, u = e[ce], d = u.options.onMove, f;
  return window.CustomEvent && !ke && !Bt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || ne(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (f = d.call(u, s, a)), f;
}
function tr(e) {
  e.draggable = !1;
}
function Os() {
  Er = !1;
}
function xs(e, t, n) {
  var r = ne(ut(n.el, 0, n.options, !0)), i = Oo(n.el, n.options, V), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Ns(e, t, n) {
  var r = ne(Vr(n.el, n.options.draggable)), i = Oo(n.el, n.options, V), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Is(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, f = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && hn < u * i) {
      if (!Mt && (It === 1 ? s > d + u * o / 2 : s < f - u * o / 2) && (Mt = !0), Mt)
        p = !0;
      else if (It === 1 ? s < d + hn : s > f - hn)
        return -It;
    } else if (s > d + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return Ms(t);
  }
  return p = p || a, p && (s < d + u * o / 2 || s > f - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function Ms(e) {
  return he(A) < he(e) ? 1 : -1;
}
function Ps(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Rs(e) {
  On.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && On.push(r);
  }
}
function mn(e) {
  return setTimeout(e, 0);
}
function _r(e) {
  return clearTimeout(e);
}
Rn && q(document, "touchmove", function(e) {
  (R.active || et) && e.cancelable && e.preventDefault();
});
R.utils = {
  on: q,
  off: $,
  css: P,
  find: Co,
  is: function(t, n) {
    return !!we(t, n, t, !1);
  },
  extend: ys,
  throttle: To,
  closest: we,
  toggleClass: fe,
  clone: ko,
  index: he,
  nextTick: mn,
  cancelNextTick: _r,
  detectDirection: No,
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
    r.utils && (R.utils = De(De({}, R.utils), r.utils)), Ut.mount(r);
  });
};
R.create = function(e, t) {
  return new R(e, t);
};
R.version = vs;
var te = [], Et, Ar, Dr = !1, nr, rr, xn, _t;
function Vs() {
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
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), Pi(), vn(), bs();
    },
    nulling: function() {
      xn = Ar = Et = Dr = _t = nr = rr = null, te.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (xn = n, r || this.options.forceAutoScrollFallback || Bt || ke || Ot) {
        ir(n, this.options, l, r);
        var s = Re(l, !0);
        Dr && (!_t || o !== nr || a !== rr) && (_t && Pi(), _t = setInterval(function() {
          var u = Re(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, vn()), ir(n, i.options, u, r);
        }, 10), nr = o, rr = a);
      } else {
        if (!this.options.bubbleScroll || Re(l, !0) === Ae()) {
          vn();
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
function vn() {
  te.forEach(function(e) {
    clearInterval(e.pid);
  }), te = [];
}
function Pi() {
  clearInterval(_t);
}
var ir = To(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ae(), u = !1, d;
    Ar !== n && (Ar = n, vn(), Et = t.scroll, d = t.scrollFn, Et === !0 && (Et = Re(n, !0)));
    var f = 0, p = Et;
    do {
      var y = p, h = ne(y), m = h.top, b = h.bottom, C = h.left, S = h.right, N = h.width, T = h.height, _ = void 0, L = void 0, I = y.scrollWidth, M = y.scrollHeight, k = P(y), O = y.scrollLeft, H = y.scrollTop;
      y === s ? (_ = N < I && (k.overflowX === "auto" || k.overflowX === "scroll" || k.overflowX === "visible"), L = T < M && (k.overflowY === "auto" || k.overflowY === "scroll" || k.overflowY === "visible")) : (_ = N < I && (k.overflowX === "auto" || k.overflowX === "scroll"), L = T < M && (k.overflowY === "auto" || k.overflowY === "scroll"));
      var J = _ && (Math.abs(S - i) <= a && O + N < I) - (Math.abs(C - i) <= a && !!O), F = L && (Math.abs(b - o) <= a && H + T < M) - (Math.abs(m - o) <= a && !!H);
      if (!te[f])
        for (var W = 0; W <= f; W++)
          te[W] || (te[W] = {});
      (te[f].vx != J || te[f].vy != F || te[f].el !== y) && (te[f].el = y, te[f].vx = J, te[f].vy = F, clearInterval(te[f].pid), (J != 0 || F != 0) && (u = !0, te[f].pid = setInterval(function() {
        r && this.layer === 0 && R.active._onTouchMove(xn);
        var U = te[this.layer].vy ? te[this.layer].vy * l : 0, K = te[this.layer].vx ? te[this.layer].vx * l : 0;
        typeof d == "function" && d.call(R.dragged.parentNode[ce], K, U, e, xn, te[this.layer].el) !== "continue" || Lo(te[this.layer].el, K, U);
      }.bind({
        layer: f
      }), 24))), f++;
    } while (t.bubbleScroll && p !== s && (p = Re(p, !1)));
    Dr = u;
  }
}, 30), Ro = function(t) {
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
  drop: Ro
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
  drop: Ro
};
Le(Hr, {
  pluginName: "removeOnSpill"
});
R.mount(new Vs());
R.mount(Hr, jr);
const rt = /* @__PURE__ */ new WeakMap(), gn = /* @__PURE__ */ new WeakMap();
function js(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const an = /* @__PURE__ */ new WeakMap(), Hs = {
  mounted(e, t, n) {
    let r = Ee(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = js(i), l = i.horizontal ? "horizontal" : "vertical";
    an.set(e, t);
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
        let y = p.newIndex, h = p.oldIndex;
        if (h === y)
          return;
        let m = an.get(e), b = m ? m.value : null, C = typeof b == "string";
        if (Array.isArray(b)) {
          let N = p.from;
          h < y ? N.insertBefore(p.item, N.children[h]) : N.insertBefore(p.item, N.children[h + 1]);
          let T = b.splice(h, 1)[0];
          b.splice(y, 0, T);
          return;
        }
        if (C && r) {
          let N = b, T = [], _ = p.item, L = gn.get(_);
          L === void 0 && (L = _.dataset.livueSortItem), typeof L == "string" && /^\d+$/.test(L) && (L = parseInt(L, 10));
          let I = p.from, M = p.to, k = [L, y].concat(T);
          if (I !== M) {
            let H = M.dataset.livueSortMethod;
            H && (N = H);
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
    an.set(e, t);
    let n = rt.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = rt.get(e);
    t && (t.destroy(), rt.delete(e)), an.delete(e);
  }
}, $s = {
  mounted(e, t) {
    let n = t.value;
    gn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    gn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (gn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, qs = {
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
}, zs = {
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
}, Fs = {
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
}, Ws = z("dblclick"), Bs = z("mousedown"), Us = z("mouseup"), Js = z("mouseenter"), Xs = z("mouseleave"), Ys = z("mouseover"), Ks = z("mouseout"), Gs = z("mousemove"), Zs = z("contextmenu"), Qs = z("keydown", { isKeyboardEvent: !0 }), eu = z("keyup", { isKeyboardEvent: !0 }), tu = z("keypress", { isKeyboardEvent: !0 }), nu = z("focus"), ru = z("focusin"), iu = z("focusout"), ou = z("touchstart"), au = z("touchend"), lu = z("touchmove"), su = z("touchcancel"), uu = z("change"), cu = z("input"), fu = z("reset"), du = z("dragstart"), pu = z("dragend"), hu = z("dragenter"), mu = z("dragleave"), vu = z("dragover"), gu = z("drop"), yu = z("copy"), bu = z("cut"), wu = z("paste"), Su = z("wheel"), Eu = z("resize");
function _u() {
  x("init", Al), x("submit", Dl), x("intersect", Cl), x("current", kl), x("ignore", Ol), x("model-livue", Ml), x("debounce", ss), x("throttle", us), x("blur", Mr), x("enter", Pr), x("boolean", ds), x("poll", Vl), x("offline", Hl), x("transition", yl), x("replace", $l), x("loading", Fl), x("target", Wl), x("stream", Bl), x("click", Xl), x("navigate", Yl), x("scroll", Kl), x("dirty", Gl), x("watch", ts), x("sort", Hs), x("sort-item", $s), x("sort-handle", qs), x("sort-ignore", zs), x("sort-group", Fs), x("dblclick", Ws), x("mousedown", Bs), x("mouseup", Us), x("mouseenter", Js), x("mouseleave", Xs), x("mouseover", Ys), x("mouseout", Ks), x("mousemove", Gs), x("contextmenu", Zs), x("keydown", Qs), x("keyup", eu), x("keypress", tu), x("focus", nu), x("focusin", ru), x("focusout", iu), x("touchstart", ou), x("touchend", au), x("touchmove", lu), x("touchcancel", su), x("change", uu), x("input", cu), x("reset", fu), x("dragstart", du), x("dragend", pu), x("dragenter", hu), x("dragleave", mu), x("dragover", vu), x("drop", gu), x("copy", yu), x("cut", bu), x("paste", wu), x("wheel", Su), x("resize", Eu);
}
let Ne = null, yt = null, Ri = !1;
function Au() {
  if (Ri)
    return;
  Ri = !0;
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
function Du() {
  return Ne || (Au(), Ne = document.createElement("div"), Ne.className = "livue-hmr-indicator", document.body.appendChild(Ne), Ne);
}
function ln(e, t) {
  const n = Du();
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
        Vi();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, yt = setTimeout(function() {
        Vi();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Vi() {
  Ne && Ne.classList.remove("visible");
}
let Je = null, Vn = !0, Vo = !0, At = !0, yn = [];
function Cu(e) {
  Je = e;
}
async function Tu(e) {
  if (Vn) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), At && ln("updating", e.fileName), yn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = Vo ? Lu() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), At && ln("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Je.reboot(), t && (await Ou(), ku(t)), At && ln("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), At && ln("error");
    }
  }
}
function Lu() {
  const e = /* @__PURE__ */ new Map();
  return Je && Je.all().forEach(function(n) {
    if (ji(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        ji(r, i.name, i.state, e);
      }
  }), e;
}
function ji(e, t, n, r) {
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
function ku(e) {
  Je && e.forEach(function(t, n) {
    const r = Je.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function Ou() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function xu() {
  return typeof import.meta < "u" && !1;
}
function Nu() {
  Vn = !0;
}
function Iu() {
  Vn = !1;
}
function Mu() {
  return Vn;
}
function Pu(e) {
  e.indicator !== void 0 && (At = e.indicator), e.preserveState !== void 0 && (Vo = e.preserveState);
}
function Ru(e) {
  return yn.push(e), function() {
    const t = yn.indexOf(e);
    t !== -1 && yn.splice(t, 1);
  };
}
async function Vu() {
  Je && await Tu({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ze = !1, or = [];
class ju {
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
    Xa(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    _u(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), this._processStandaloneLazy(document.body), Ca(this), this._startObserver(), Cu(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(t) {
      t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), tl());
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
    Da(t);
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
    Pa();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return za();
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
      ...el()
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
    let r = new _l(t);
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
    return Gr(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Zr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), ti();
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
    }), ti();
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
      isAvailable: xu,
      isEnabled: Mu,
      enable: Nu,
      disable: Iu,
      configure: Pu,
      onUpdate: Ru,
      trigger: Vu
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
      var n = Zr();
      n.forEach(function(r) {
        var i = Gr(r, function(o) {
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
const jn = new ju();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = Yo, document.head.appendChild(e);
}
var ye = window.LiVueConfig || {};
(ye.showProgressBar !== void 0 || ye.progressBarColor !== void 0 || ye.prefetch !== void 0 || ye.prefetchOnHover !== void 0 || ye.hoverDelay !== void 0 || ye.cachePages !== void 0 || ye.maxCacheSize !== void 0 || ye.restoreScroll !== void 0) && jn.configureNavigation(ye);
ye.showProgressOnRequest !== void 0 && jn.progress.configure({ showOnRequest: ye.showProgressOnRequest });
let Hi = !1;
function sn() {
  Hi || (Hi = !0, jn.boot());
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", sn, { once: !0 }) : document.readyState === "interactive" ? (document.addEventListener("DOMContentLoaded", sn, { once: !0 }), window.addEventListener("load", sn, { once: !0 })) : queueMicrotask(sn);
window.LiVue = jn;
export {
  jn as default
};
//# sourceMappingURL=livue.esm.js.map
