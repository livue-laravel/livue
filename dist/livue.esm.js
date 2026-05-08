import * as Sn from "vue";
import { reactive as Ie, toRefs as Bo, effectScope as Wo, ref as fn, markRaw as Uo, hasInjectionContext as bl, inject as Jo, isRef as Gn, isReactive as Xo, toRaw as yl, getCurrentScope as _l, onScopeDispose as wl, watch as ke, nextTick as fr, computed as Ko, provide as El, onBeforeUnmount as Sl, onBeforeMount as xl, onUnmounted as Yo, onMounted as Go, readonly as Cl, watchEffect as Tl, shallowRef as gi, defineComponent as Al, h as Vi, createApp as Nl } from "vue";
const kl = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Zo(e, t) {
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
function mt(e) {
  return JSON.stringify(e, Zo);
}
function Wr(e) {
  return Ie(Object.assign({}, e));
}
function Ll(e, t, n) {
  let r;
  for (r in t)
    if (n && r in n && t[r] !== null && typeof t[r] == "object" && !Array.isArray(t[r]) && e[r] !== null && typeof e[r] == "object" && !Array.isArray(e[r])) {
      let i = n[r], o = t[r], a = e[r], l = Object.assign({}, o);
      for (let s in i)
        mt(i[s]) === mt(o[s]) && s in a && (l[s] = a[s]);
      mt(e[r]) !== mt(l) && (e[r] = l);
    } else {
      let i = mt(e[r]), o = mt(t[r]);
      i !== o && (e[r] = t[r]);
    }
  for (r in e)
    r in t || delete e[r];
}
function Qo(e) {
  return JSON.parse(JSON.stringify(e, Zo));
}
function Dl(e) {
  return Bo(e);
}
function Sr(e, t) {
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
function Wt(e, t, n) {
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
    let c = r[u];
    (l[c] === null || l[c] === void 0) && (l[c] = {}), Array.isArray(l[c]) && u + 1 < r.length && isNaN(Number(r[u + 1])) && (l[c] = Object.assign({}, l[c])), l = l[c];
  }
  let s = r[r.length - 1];
  l[s] = n, e[i] = a;
}
function xn(e, t) {
  let n = {}, r = Qo(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function Ol(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function Ur(e) {
  if (Ol(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(Ur);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = Ur(e[n]);
    return t;
  }
  return e;
}
function Dt(e) {
  let t = {};
  for (let n in e)
    t[n] = Ur(e[n]);
  return t;
}
let zi = 0;
function Ml() {
  return zi++, zi;
}
let ea = /* @__PURE__ */ new Map();
function Il(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function Rl(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function ta(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    ea.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: Il(n)
    });
  });
}
function na(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = ea.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Rl(n, i.inputs));
  });
}
let ra;
const pr = (e) => ra = e, ia = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Jr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Qt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Qt || (Qt = {}));
function Hi() {
  const e = Wo(!0), t = e.run(() => fn({}));
  let n = [], r = [];
  const i = Uo({
    install(o) {
      pr(i), i._a = o, o.provide(ia, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const oa = () => {
};
function $i(e, t, n, r = oa) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && _l() && wl(i), i;
}
function ht(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const Pl = (e) => e(), Fi = /* @__PURE__ */ Symbol(), xr = /* @__PURE__ */ Symbol();
function Xr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    Jr(i) && Jr(r) && e.hasOwnProperty(n) && !Gn(r) && !Xo(r) ? e[n] = Xr(i, r) : e[n] = r;
  }
  return e;
}
const ql = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function jl(e) {
  return !Jr(e) || !Object.prototype.hasOwnProperty.call(e, ql);
}
const { assign: Je } = Object;
function Vl(e) {
  return !!(Gn(e) && e.effect);
}
function zl(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const c = Bo(n.state.value[e]);
    return Je(c, o, Object.keys(a || {}).reduce((f, p) => (f[p] = Uo(Ko(() => {
      pr(n);
      const h = n._s.get(e);
      return a[p].call(h, h);
    })), f), {}));
  }
  return s = aa(e, u, t, n, r, !0), s;
}
function aa(e, t, n = {}, r, i, o) {
  let a;
  const l = Je({ actions: {} }, n), s = { deep: !0 };
  let u, c, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), h;
  const m = r.state.value[e];
  !o && !m && (r.state.value[e] = {}), fn({});
  let v;
  function g(R) {
    let k;
    u = c = !1, typeof R == "function" ? (R(r.state.value[e]), k = {
      type: Qt.patchFunction,
      storeId: e,
      events: h
    }) : (Xr(r.state.value[e], R), k = {
      type: Qt.patchObject,
      payload: R,
      storeId: e,
      events: h
    });
    const I = v = /* @__PURE__ */ Symbol();
    fr().then(() => {
      v === I && (u = !0);
    }), c = !0, ht(f, k, r.state.value[e]);
  }
  const y = o ? function() {
    const { state: k } = n, I = k ? k() : {};
    this.$patch((H) => {
      Je(H, I);
    });
  } : (
    /* istanbul ignore next */
    oa
  );
  function _() {
    a.stop(), f.clear(), p.clear(), r._s.delete(e);
  }
  const C = (R, k = "") => {
    if (Fi in R)
      return R[xr] = k, R;
    const I = function() {
      pr(r);
      const H = Array.from(arguments), re = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Set();
      function G(U) {
        re.add(U);
      }
      function ie(U) {
        K.add(U);
      }
      ht(p, {
        args: H,
        name: I[xr],
        store: w,
        after: G,
        onError: ie
      });
      let Z;
      try {
        Z = R.apply(this && this.$id === e ? this : w, H);
      } catch (U) {
        throw ht(K, U), U;
      }
      return Z instanceof Promise ? Z.then((U) => (ht(re, U), U)).catch((U) => (ht(K, U), Promise.reject(U))) : (ht(re, Z), Z);
    };
    return I[Fi] = !0, I[xr] = k, I;
  }, M = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: $i.bind(null, p),
    $patch: g,
    $reset: y,
    $subscribe(R, k = {}) {
      const I = $i(f, R, k.detached, () => H()), H = a.run(() => ke(() => r.state.value[e], (re) => {
        (k.flush === "sync" ? c : u) && R({
          storeId: e,
          type: Qt.direct,
          events: h
        }, re);
      }, Je({}, s, k)));
      return I;
    },
    $dispose: _
  }, w = Ie(M);
  r._s.set(e, w);
  const z = (r._a && r._a.runWithContext || Pl)(() => r._e.run(() => (a = Wo()).run(() => t({ action: C }))));
  for (const R in z) {
    const k = z[R];
    if (Gn(k) && !Vl(k) || Xo(k))
      o || (m && jl(k) && (Gn(k) ? k.value = m[R] : Xr(k, m[R])), r.state.value[e][R] = k);
    else if (typeof k == "function") {
      const I = C(k, R);
      z[R] = I, l.actions[R] = k;
    }
  }
  return Je(w, z), Je(yl(w), z), Object.defineProperty(w, "$state", {
    get: () => r.state.value[e],
    set: (R) => {
      g((k) => {
        Je(k, R);
      });
    }
  }), r._p.forEach((R) => {
    Je(w, a.run(() => R({
      store: w,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), m && o && n.hydrate && n.hydrate(w.$state, m), u = !0, c = !0, w;
}
// @__NO_SIDE_EFFECTS__
function Hl(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = bl();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Jo(ia, null) : null), a && pr(a), a = ra, a._s.has(e) || (i ? aa(e, t, r, a) : zl(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let pn = /* @__PURE__ */ new Map();
function $l(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function Ut(e, t, n) {
  return $l(n) === "global" ? t : e + ":" + t;
}
function la(e) {
  return JSON.parse(JSON.stringify(e));
}
function Fl(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(la(t));
}
function bi(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = Ut(e, t, r), a = pn.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ Hl(o, n), definition: n }, pn.set(o, a)), a.useStore(i);
}
function ct(e, t, n, r) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
  let i = n && n.scope ? n.scope : "auto", o = [];
  i === "component" ? o.push(Ut(e, t, { scope: "component" })) : i === "global" ? o.push(Ut(e, t, { scope: "global" })) : (o.push(Ut(e, t, { scope: "component" })), o.push(Ut(e, t, { scope: "global" })));
  for (let a = 0; a < o.length; a++) {
    let l = pn.get(o[a]);
    if (l)
      return l.useStore(r);
  }
  return null;
}
function Bl(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = Dt(o.state || {}), s = ct(e, o.name, { scope: a }, n);
    if (s) {
      Fl(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return la(l);
      }
    }, c = bi(e, o.name, u, { scope: a }, n);
    r[o.name] = c;
  }
  return r;
}
function Wl(e) {
  let t = e + ":", n = Array.from(pn.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && pn.delete(n[r]);
}
let sa = {
  ref: fn,
  computed: Ko,
  watch: ke,
  watchEffect: Tl,
  reactive: Ie,
  readonly: Cl,
  onMounted: Go,
  onUnmounted: Yo,
  onBeforeMount: xl,
  onBeforeUnmount: Sl,
  nextTick: fr,
  provide: El,
  inject: Jo
}, Kr = Object.keys(sa), Ul = Kr.map(function(e) {
  return sa[e];
});
function Bi(e) {
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
function Jl(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(v) {
    return t[v];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(v) {
    return a[v];
  });
  function u(v) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(v);
  }
  function c(v, g, y) {
    let _ = n && n.$id ? n.$id : "", C = n && n._pinia ? n._pinia : void 0;
    if (g === void 0) {
      let M = ct(_, v, y || {}, C);
      if (M)
        return M;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return bi(_, v, g, y, C);
  }
  function f(v) {
    let g = n && n.$id ? n.$id : "", y = n && n._pinia ? n._pinia : void 0, _ = ct(g, v, { scope: "auto" }, y);
    if (!_)
      throw new Error('[LiVue] useStore("' + v + '"): store not found.');
    return _;
  }
  let p = [], h = [];
  function m(v, g) {
    if (!u(v))
      return;
    let y = p.indexOf(v);
    if (y === -1) {
      p.push(v), h.push(g);
      return;
    }
    h[y] = g;
  }
  for (let v = 0; v < Kr.length; v++)
    m(Kr[v], Ul[v]);
  for (let v = 0; v < i.length; v++)
    m(i[v], o[v]);
  for (let v = 0; v < l.length; v++)
    m(l[v], s[v]);
  m("livue", n), m("store", c), m("useStore", f);
  try {
    let g = new (Function.prototype.bind.apply(
      Function,
      [null].concat(p).concat([e])
    ))().apply(null, h);
    return g && typeof g == "object" ? g : null;
  } catch (v) {
    return console.error("[LiVue] Error executing @script setup code:", v), null;
  }
}
function Xl(e) {
  for (var t = ["debounce", "throttle"], n = 0; n < t.length; n++) {
    var r = t[n], i = new RegExp("v-model\\." + r + `(?:\\.(\\d+)(ms)?)?=["']([^"']+)["']`, "g");
    e = e.replace(i, /* @__PURE__ */ (function(u) {
      return function(c, f, p, h) {
        var m = f ? "." + f + (p || "ms") : "";
        return 'v-model="' + h + '" v-' + u + ":" + h + m;
      };
    })(r));
  }
  for (var o = ["blur", "enter"], a = 0; a < o.length; a++) {
    var l = o[a], s = new RegExp("v-model\\." + l + `=["']([^"']+)["']`, "g");
    e = e.replace(s, /* @__PURE__ */ (function(u) {
      return function(c, f) {
        return 'v-model="' + f + '" v-' + u + ":" + f;
      };
    })(l));
  }
  return e;
}
const Wi = [
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
function Kl(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Yl(e) {
  let t = e.replace(/\$errors\b/g, "lvErrors");
  for (let n = 0; n < Wi.length; n++) {
    let r = Wi[n], i = new RegExp(Kl(r) + "\\b(?=\\s*\\()", "g");
    t = t.replace(i, "livue." + r);
  }
  return t;
}
function Ui(e) {
  return Yl(Xl(e));
}
function ua(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      ua(e.children[t]);
}
function Ji(e, t, n) {
  return Object.defineProperty(e, "__livueMethodName", {
    value: t,
    configurable: !1,
    enumerable: !1,
    writable: !1
  }), n !== void 0 && Object.defineProperty(e, "__livueMethodArgs", {
    value: n,
    configurable: !1,
    enumerable: !1,
    writable: !1
  }), e;
}
var Gl = {
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
}, Zl = /^[a-zA-Z][a-zA-Z0-9_]*$/;
function Cr(e, t) {
  return typeof e != "string" || Gl[e] || !Zl.test(e) ? !1 : Array.isArray(t) ? t.indexOf(e) !== -1 : !0;
}
function Yr(e, t, n, r, i, o) {
  let a = Bi(e);
  a.html = Ui(a.html);
  let l;
  try {
    l = Sn.compile(a.html);
  } catch (h) {
    console.error('[LiVue] Template compilation error in "' + (o || "unknown") + '":', h), l = Sn.compile(
      '<div style="padding:8px;border:2px solid #f00;color:#f00;font-family:monospace">[LiVue] Template error: ' + (h.message || "compilation failed") + "</div>"
    );
  }
  let s = gi(l), u = [], c = !1;
  function f(h, m) {
    let v = s.value;
    c = !0;
    let g;
    try {
      g = v(h, u);
    } finally {
      c = !1;
    }
    return ua(g), g;
  }
  f._rc = !0;
  let p = {
    name: o || "LiVueComponent",
    render: f,
    setup: function() {
      Sn.provide("livue", n);
      let h = Dl(t);
      var m = new Proxy(n.errors, {
        get: function(g, y, _) {
          var C = Reflect.get(g, y, _);
          return Array.isArray(C) ? C[0] : C;
        }
      });
      let v = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: m });
      if (a.setupCode) {
        let g = Jl(a.setupCode, h, n, r);
        g && Object.assign(v, g);
      }
      return new Proxy(v, {
        get: function(g, y, _) {
          if (y in g || typeof y == "symbol") return Reflect.get(g, y, _);
          if (Cr(y, n._callableMethods)) {
            var C = function() {
              var M = Array.prototype.slice.call(arguments);
              if (c) {
                var w = function() {
                  return n.call(y, ...M);
                };
                return Ji(w, y, M);
              }
              return n.call(y, ...M);
            };
            return Ji(C, y);
          }
        },
        getOwnPropertyDescriptor: function(g, y) {
          var _ = Object.getOwnPropertyDescriptor(g, y);
          if (_) return _;
          if (Cr(y, n._callableMethods))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(g, y) {
          return !!(y in g || Cr(y, n._callableMethods));
        },
        set: function(g, y, _) {
          return g[y] = _, !0;
        },
        ownKeys: function(g) {
          return Reflect.ownKeys(g);
        }
      });
    }
  };
  return p._updateRender = function(h) {
    try {
      let m = Bi(h), v = Sn.compile(Ui(m.html));
      if (v === s.value) return;
      u.length = 0, s.value = v;
    } catch (m) {
      console.error('[LiVue] Template update compilation error in "' + (o || "unknown") + '":', m);
    }
  }, p;
}
let at = null;
function Rt() {
  if (at)
    return at;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return at = e.getAttribute("content"), at;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (at = decodeURIComponent(t[1]), at) : null;
}
function Ql() {
  at = null;
}
let se = {
  color: "#29d",
  height: "2px",
  showOnRequest: !1,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, pe = null, Gr = null, _e = null, Zn = !1, en = 0;
function es(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function ts(e) {
  return (-1 + e) * 100;
}
function ca() {
  if (Zn) return;
  Zn = !0;
  let e = document.createElement("style");
  e.id = "livue-progress-styles", e.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${se.height};
            background: ${se.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${se.speed}ms ${se.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${se.color}, 0 0 5px ${se.color};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
        }
        .livue-progress-bar.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${se.speed}ms ${se.easing};
        }
    `, document.head.appendChild(e);
}
function ns() {
  if (_e) return;
  ca(), _e = document.createElement("div"), _e.className = "livue-progress-bar livue-progress-hidden", _e.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(se.parent) || document.body).appendChild(_e);
}
function rs() {
  if (!Zn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), Zn = !1, ca());
}
function is(e) {
  Object.assign(se, e), rs();
}
function Zr() {
  return se.showOnRequest;
}
function da() {
  en++, pe === null && (ns(), pe = 0, _e && _e.classList.remove("livue-progress-hidden"), vr(se.minimum), se.trickle && (Gr = setInterval(function() {
    fa();
  }, se.trickleSpeed)));
}
function vr(e) {
  pe !== null && (e = es(e, se.minimum, 1), pe = e, _e && (_e.style.transform = "translate3d(" + ts(e) + "%, 0, 0)"));
}
function fa() {
  if (pe === null || pe >= 1) return;
  let e;
  pe < 0.2 ? e = 0.1 : pe < 0.5 ? e = 0.04 : pe < 0.8 ? e = 0.02 : pe < 0.99 ? e = 5e-3 : e = 0, vr(pe + e);
}
function yi() {
  en = Math.max(0, en - 1), !(en > 0) && pe !== null && (vr(1), clearInterval(Gr), Gr = null, setTimeout(function() {
    _e && _e.classList.add("livue-progress-hidden"), setTimeout(function() {
      pe = null, _e && (_e.style.transform = "translate3d(-100%, 0, 0)");
    }, se.speed);
  }, se.speed));
}
function os() {
  en = 0, yi();
}
function as() {
  return pe !== null;
}
function ls() {
  return pe;
}
const Qn = {
  configure: is,
  start: da,
  set: vr,
  trickle: fa,
  done: yi,
  forceDone: os,
  isStarted: as,
  getStatus: ls,
  isRequestProgressEnabled: Zr
};
var Jt = null, Xi = !1, Nt = !1, Se = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Re = /* @__PURE__ */ new Map(), st = /* @__PURE__ */ new Map(), Qr = /* @__PURE__ */ new WeakMap(), Vn = /* @__PURE__ */ new Map(), Qe = null;
function ss(e) {
  Object.assign(Se, e), e.progressBarColor && Qn.configure({ color: e.progressBarColor });
}
function us(e) {
  Jt = e, !Xi && (Xi = !0, Qe = pa(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Qe },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (va(Qe), Qe = t.state.pageKey, _n(t.state.url, !1, !0));
  }), ds());
}
function pa() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function va(e) {
  if (!(!Se.restoreScroll || !e)) {
    Vn.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Vn.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Vn.set(e, i);
      }
    });
  }
}
function cs(e) {
  if (!(!Se.restoreScroll || !e)) {
    var t = Vn.get(e);
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
function ds() {
  document.addEventListener("click", fs, !0), Se.prefetch && (document.addEventListener("mouseenter", vs, !0), document.addEventListener("mouseleave", ms, !0), document.addEventListener("mousedown", hs, !0), document.addEventListener("focus", gs, !0));
}
function fs(e) {
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
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), _n(n, !0, !1));
      }
    }
  }
}
function ps(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function vs(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !Se.prefetchOnHover)) {
      var n = ps(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            mr(r);
          }, Se.hoverDelay);
          Qr.set(t, i);
        }
      }
    }
  }
}
function ms(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = Qr.get(t);
      n && (clearTimeout(n), Qr.delete(t));
    }
  }
}
function hs(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || mr(n);
    }
  }
}
function gs(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !Se.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || mr(n);
    }
  }
}
function mr(e) {
  var t = new URL(e, location.origin).href;
  if (st.has(t))
    return st.get(t);
  if (Re.has(t))
    return Promise.resolve(Re.get(t).html);
  var n = fetch(t, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return st.delete(t), r.ok ? r.text().then(function(i) {
      return Se.cachePages && ma(t, i), i;
    }) : null;
  }).catch(function(r) {
    return st.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return st.set(t, n), n;
}
function ma(e, t) {
  for (var n = new DOMParser(), r = n.parseFromString(t, "text/html"), i = r.querySelector("title"); Re.size >= Se.maxCacheSize; ) {
    var o = Re.keys().next().value;
    Re.delete(o);
  }
  Re.set(e, {
    html: t,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function _i() {
  Re.clear();
}
function wi(e) {
  Nt || !e || !e.url || (e.navigate ? (Re.clear(), _n(e.url, !0, !1)) : (Nt = !0, window.location.href = e.url));
}
async function _n(e, t, n) {
  if (!Nt) {
    if (!Jt) {
      window.location.href = e;
      return;
    }
    var r = new URL(e, location.origin).href, i = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: Re.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(i)) {
      Nt = !0, n || va(Qe), Se.showProgressBar && Qn.start();
      try {
        var o, a = Re.get(r);
        if (a)
          o = a.html;
        else if (st.has(r))
          o = await st.get(r);
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
          o = await l.text(), Se.cachePages && ma(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), c = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(y) {
              typeof y == "function" && y(u);
            }
          }
        });
        window.dispatchEvent(c);
        var f = bs(), p = /* @__PURE__ */ new Set();
        f.forEach(function(y) {
          y.livueIds.forEach(function(_) {
            p.add(_);
          });
        }), Jt._stopObserver(), Jt.destroyExcept(p), f.forEach(function(y) {
          y.element.parentNode && y.element.parentNode.removeChild(y.element);
        });
        var h = u.querySelector("title");
        h && (document.title = h.textContent), document.body.innerHTML = u.body.innerHTML, ys(f);
        var m = u.querySelector('meta[name="csrf-token"]'), v = document.querySelector('meta[name="csrf-token"]');
        if (m && v && (v.setAttribute("content", m.getAttribute("content")), Ql()), ws(u), _s(u), Es(u), t && (Qe = pa(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Qe },
          "",
          r
        )), Ss(u), Jt.rebootPreserving(), n)
          cs(Qe);
        else if (location.hash) {
          var g = document.querySelector(location.hash);
          g ? g.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (y) {
        console.error("[LiVue] Navigation failed:", y), window.location.href = e;
      } finally {
        Nt = !1, Se.showProgressBar && Qn.done();
      }
    }
  }
}
function bs() {
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
function ys(e) {
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
function _s(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function ws(e) {
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
function Es(e) {
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
function Ss(e) {
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
function xs() {
  return Nt;
}
var _t = /* @__PURE__ */ new Map(), Cs = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Ce(e, t) {
  return typeof e != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", e), function() {
  }) : typeof t != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (_t.has(e) || _t.set(e, /* @__PURE__ */ new Set()), _t.get(e).add(t), function() {
    var n = _t.get(e);
    n && (n.delete(t), n.size === 0 && _t.delete(e));
  });
}
function we(e, t) {
  var n = _t.get(e);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(t);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + e + '" callback:', i);
    }
  });
}
function ha() {
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
function ga() {
  return Cs.slice();
}
let Ei = !1, wt = null, Ki = !1, tn = null;
function Ts(e) {
  e && typeof e.enabled == "boolean" && (Ei = e.enabled);
}
function As() {
  return Ei;
}
function Ns() {
  if (Ki || typeof document > "u")
    return;
  const e = document.createElement("style");
  e.id = "livue-error-overlay-styles", e.textContent = `
        .livue-error-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483646;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            flex-direction: column;
            padding: 24px;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .livue-error-overlay__bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            color: #fff;
            padding: 0 4px 12px;
            font-size: 13px;
        }
        .livue-error-overlay__label {
            opacity: 0.85;
        }
        .livue-error-overlay__status {
            display: inline-block;
            background: #dc2626;
            color: #fff;
            border-radius: 4px;
            padding: 2px 8px;
            margin-right: 8px;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.02em;
        }
        .livue-error-overlay__hint {
            opacity: 0.6;
            font-size: 12px;
        }
        .livue-error-overlay__close {
            background: rgba(255, 255, 255, 0.12);
            color: #fff;
            border: 0;
            border-radius: 6px;
            padding: 6px 14px;
            cursor: pointer;
            font-size: 13px;
            transition: background 120ms ease;
        }
        .livue-error-overlay__close:hover {
            background: rgba(255, 255, 255, 0.24);
        }
        .livue-error-overlay__frame {
            flex: 1;
            width: 100%;
            border: 0;
            border-radius: 8px;
            background: #fff;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
    `, document.head.appendChild(e), Ki = !0;
}
function ba(e, t, n) {
  if (typeof document > "u")
    return;
  Ns(), Xt();
  const r = document.createElement("div");
  r.className = "livue-error-overlay", r.setAttribute("role", "dialog"), r.setAttribute("aria-modal", "true"), r.setAttribute("aria-label", "LiVue error overlay");
  const i = document.createElement("div");
  i.className = "livue-error-overlay__bar";
  const o = document.createElement("div");
  o.className = "livue-error-overlay__label";
  const a = document.createElement("span");
  a.className = "livue-error-overlay__status", a.textContent = t ? String(t) : "ERR", o.appendChild(a), o.appendChild(document.createTextNode(
    n ? "LiVue server error — " + n : "LiVue server error"
  )), i.appendChild(o);
  const l = document.createElement("div");
  l.style.display = "flex", l.style.alignItems = "center", l.style.gap = "12px";
  const s = document.createElement("span");
  s.className = "livue-error-overlay__hint", s.textContent = "Press ESC to close", l.appendChild(s);
  const u = document.createElement("button");
  u.type = "button", u.className = "livue-error-overlay__close", u.textContent = "Close", u.addEventListener("click", Xt), l.appendChild(u), i.appendChild(l), r.appendChild(i);
  const c = document.createElement("iframe");
  c.className = "livue-error-overlay__frame", c.setAttribute("srcdoc", e), c.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups"), r.appendChild(c), r.addEventListener("click", function(f) {
    f.target === r && Xt();
  }), tn = function(f) {
    f.key === "Escape" && Xt();
  }, document.addEventListener("keydown", tn), document.body.appendChild(r), wt = r;
}
function Xt() {
  tn && (document.removeEventListener("keydown", tn), tn = null), wt && wt.parentNode && wt.parentNode.removeChild(wt), wt = null;
}
async function Si(e, t) {
  if (!Ei || !e || e.ok || e.status < 500 || (e.headers.get("content-type") || "").indexOf("text/html") === -1)
    return !1;
  let r;
  try {
    r = await e.text();
  } catch {
    return !1;
  }
  return ba(r, e.status, t), !0;
}
const ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: Xt,
  configure: Ts,
  isEnabled: As,
  maybeShowFromResponse: Si,
  show: ba
}, Symbol.toStringTag, { value: "Module" }));
var ei = [], ti = [], vn = !1;
function ya(e) {
  return e.isolate ? Ds(e) : new Promise(function(t, n) {
    ei.push({
      payload: e,
      resolve: t,
      reject: n
    }), vn || (vn = !0, queueMicrotask(_a));
  });
}
function Ls(e) {
  return new Promise(function(t, n) {
    ti.push({
      payload: e,
      resolve: t,
      reject: n
    }), vn || (vn = !0, queueMicrotask(_a));
  });
}
async function _a() {
  var e = ei, t = ti;
  if (ei = [], ti = [], vn = !1, !(e.length === 0 && t.length === 0)) {
    var n = wa(), r = Rt(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = e.map(function(y) {
      return y.payload;
    }), a = t.map(function(y) {
      return y.payload;
    }), l = {};
    o.length > 0 && (l.updates = o), a.length > 0 && (l.lazyLoads = a), we("request.started", {
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
      });
      if (await Si(s, n)) {
        var u = new Error("LiVue debug overlay: server returned HTML error page");
        u.status = s.status, u.overlay = !0;
        for (var c = 0; c < e.length; c++)
          e[c].reject(u);
        for (var c = 0; c < t.length; c++)
          t[c].reject(u);
        we("request.finished", {
          url: n,
          success: !1,
          error: u,
          updateCount: e.length,
          lazyCount: t.length
        });
        return;
      }
      var f = await s.json();
      if (!s.ok) {
        var p = new Error(f.error || "Request failed");
        p.status = s.status, p.data = f;
        for (var c = 0; c < e.length; c++)
          e[c].reject(p);
        for (var c = 0; c < t.length; c++)
          t[c].reject(p);
        return;
      }
      for (var h = f.responses || [], m = f.lazyResponses || [], c = 0; c < h.length; c++)
        if (h[c] && h[c].redirect) {
          wi(h[c].redirect);
          return;
        }
      _i();
      for (var c = 0; c < e.length; c++) {
        var v = h[c];
        if (!v) {
          e[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (v.error) {
          var g = new Error(v.error);
          g.status = v.status || 500, g.data = v, e[c].reject(g);
        } else if (v.errors) {
          var g = new Error("Validation failed");
          g.status = 422, g.data = v, e[c].reject(g);
        } else
          e[c].resolve(v);
      }
      for (var c = 0; c < t.length; c++) {
        var v = m[c];
        if (!v) {
          t[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (v.error) {
          var g = new Error(v.error);
          g.status = v.status || 500, g.data = v, t[c].reject(g);
        } else
          t[c].resolve(v);
      }
      we("request.finished", {
        url: n,
        success: !0,
        responses: h,
        lazyResponses: m,
        updateCount: e.length,
        lazyCount: t.length
      });
    } catch (y) {
      for (var c = 0; c < e.length; c++)
        e[c].reject(y);
      for (var c = 0; c < t.length; c++)
        t[c].reject(y);
      we("request.finished", {
        url: n,
        success: !1,
        error: y,
        updateCount: e.length,
        lazyCount: t.length
      });
    }
  }
}
async function Ds(e) {
  var t = wa(), n = Rt(), r = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  n && (r["X-CSRF-TOKEN"] = n);
  var i = {
    snapshot: e.snapshot,
    diffs: e.diffs
  };
  e.calls ? i.calls = e.calls : (i.method = e.method, i.params = e.params);
  var o = await fetch(t, {
    method: "POST",
    headers: r,
    body: JSON.stringify({ updates: [i] }),
    credentials: "same-origin"
  });
  if (await Si(o, t)) {
    var a = new Error("LiVue debug overlay: server returned HTML error page");
    throw a.status = o.status, a.overlay = !0, a;
  }
  var l = await o.json();
  if (!o.ok) {
    var s = new Error(l.error || "Request failed");
    throw s.status = o.status, s.data = l, s;
  }
  var u = (l.responses || [])[0];
  if (!u)
    throw new Error("No response for isolated component update");
  if (u.redirect)
    return wi(u.redirect), new Promise(function() {
    });
  if (_i(), u.error) {
    var c = new Error(u.error);
    throw c.status = u.status || 500, c.data = u, c;
  }
  if (u.errors) {
    var c = new Error("Validation failed");
    throw c.status = 422, c.data = u, c;
  }
  return u;
}
function wa() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function Tr(e, t, n, r, i) {
  return ya({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
async function Os(e, t, n, r) {
  return ya({
    snapshot: e,
    diffs: n || {},
    calls: t,
    isolate: r || !1
  });
}
let ni = null, Ea = /* @__PURE__ */ new Map();
function Ms() {
  return Ie({});
}
function Te(e, t) {
  ri(e);
  for (let n in t)
    e[n] = t[n];
}
function ri(e) {
  for (let t in e)
    delete e[t];
}
function Is(e) {
  ni = e;
}
function gt(e, t, n, r) {
  r = r || {};
  let i = !1;
  return we("error.occurred", {
    error: e,
    componentName: t,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : (ni ? ni(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function Rs(e, t) {
  typeof t == "function" && Ea.set(e, t);
}
function ii(e) {
  Ea.delete(e);
}
var Ye = null, Ps = "livue-devtools-styles", qs = `
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

/* Top-level tabs */
.livue-devtools__tabs {
    display: flex;
    background: #2d2d2d;
    border-bottom: 1px solid #333;
    flex-shrink: 0;
    overflow-x: auto;
}

.livue-devtools__tab {
    padding: 8px 14px;
    background: transparent;
    border: none;
    color: #858585;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    flex-shrink: 0;
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
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* Generic panel (all tabs) */
.livue-devtools__panel {
    display: none;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    padding: 8px;
}

.livue-devtools__panel--active {
    display: flex;
}

/* Timeline and Events manage their own internal scrolling list */
.livue-devtools__panel[data-tab="timeline"],
.livue-devtools__panel[data-tab="events"] {
    overflow: hidden;
    padding: 0;
}

/* Components panel: split layout (no padding — tree/right-pane handle it) */
.livue-devtools__panel--components {
    padding: 0;
    overflow: hidden;
    flex-direction: row;
}

/* Tree sidebar */
.livue-devtools__tree {
    width: 220px;
    flex-shrink: 0;
    border-right: 1px solid #333;
    overflow: auto;
    padding: 8px;
}

/* Right pane */
.livue-devtools__right-pane {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
}

/* Sub-tabs (State | Benchmark) */
.livue-devtools__sub-tabs {
    display: flex;
    background: #2d2d2d;
    border-bottom: 1px solid #333;
    flex-shrink: 0;
}

.livue-devtools__sub-tab {
    padding: 6px 14px;
    background: transparent;
    border: none;
    color: #858585;
    cursor: pointer;
    font-size: 11px;
    font-family: inherit;
    border-bottom: 2px solid transparent;
}

.livue-devtools__sub-tab:hover {
    color: #d4d4d4;
    background: #333;
}

.livue-devtools__sub-tab--active {
    color: #fff;
    border-bottom-color: #007acc;
}

/* Sub-content area */
.livue-devtools__sub-content {
    flex: 1;
    overflow: auto;
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

/* Timeline */
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

/* Events */
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


/* Performance */
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

/* Settings */
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
function js() {
  Ye || (Ye = document.createElement("style"), Ye.id = Ps, Ye.textContent = qs, document.head.appendChild(Ye));
}
function Vs() {
  Ye && (Ye.remove(), Ye = null);
}
var xi = [];
function N(e, t, n) {
  xi.push({
    name: e,
    directive: t
  });
}
function zs() {
  return xi;
}
function Hs() {
  return {
    plugins: [],
    stores: [],
    components: [],
    directives: xi.map(function(e) {
      return { name: e.name, filters: null };
    })
  };
}
const ze = /* @__PURE__ */ new Map(), Fe = /* @__PURE__ */ new Map();
let Yi = !1;
function pt() {
  return typeof window < "u" && window.Echo;
}
function $s(e, t) {
  if (!pt())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = t + ":" + e;
  if (ze.has(n))
    return ze.get(n);
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
  return ze.set(n, r), r;
}
function Sa(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!pt())
    return Yi || (Yi = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: c, isCustomEvent: f } = o, p = $s(a, l);
    if (!p) continue;
    const h = l + ":" + a + ":" + s + ":" + e;
    if (Fe.has(h)) {
      r.push(h);
      continue;
    }
    const m = function(v) {
      try {
        n(u, v);
      } catch (g) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', g);
      }
    };
    if (l === "presence" && c)
      Fs(p, s, m);
    else {
      const v = f ? "." + s : s;
      p.listen(v, m);
    }
    Fe.set(h, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: m,
      isPresenceEvent: c,
      isCustomEvent: f
    }), r.push(h);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      xa(r[i]);
  };
}
function Fs(e, t, n) {
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
function xa(e) {
  const t = Fe.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    Fe.delete(e), Bs(t.channelKey);
  }
}
function Gi(e) {
  const t = ":" + e, n = [];
  Fe.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    xa(n[r]);
}
function Ca(e, t) {
  e === "presence" ? window.Echo.leave(t) : e === "private" ? window.Echo.leaveChannel("private-" + t) : window.Echo.leaveChannel(t);
}
function Bs(e) {
  let t = !1;
  if (Fe.forEach(function(r) {
    r.channelKey === e && (t = !0);
  }), t) return;
  if (ze.get(e) && pt()) {
    const r = e.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      Ca(i, o);
    } catch {
    }
  }
  ze.delete(e);
}
function Zi() {
  Fe.clear(), ze.forEach(function(e, t) {
    if (pt()) {
      const n = t.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        Ca(r, i);
      } catch {
      }
    }
  }), ze.clear();
}
function Ws() {
  return {
    echoAvailable: pt(),
    channels: Array.from(ze.keys()),
    subscriptions: Array.from(Fe.keys())
  };
}
function Us() {
  var e = [], t = [];
  return ze.forEach(function(n, r) {
    var i = r.split(":");
    e.push({
      key: r,
      type: i[0],
      name: i.slice(1).join(":")
    });
  }), Fe.forEach(function(n, r) {
    var i = r.split(":");
    t.push({
      key: r,
      channelType: i[0],
      channelName: i[1],
      event: i[2],
      componentId: i[3],
      isPresenceEvent: n.isPresenceEvent,
      isCustomEvent: n.isCustomEvent
    });
  }), {
    available: pt(),
    channels: e,
    subscriptions: t
  };
}
var Qi = 100, Js = 200, Xs = 50, D = {
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
  pendingSwaps: /* @__PURE__ */ new Map(),
  /** @type {Array<object>} Server benchmark timings */
  serverBenchmarks: [],
  /**
   * Running average benchmark stats per component.
   * componentId -> { count, averages: {phase: avgUs}, latest: {time, timings} }
   * Reset when the component is destroyed.
   * @type {Map<string, object>}
   */
  componentBenchmarkStats: /* @__PURE__ */ new Map()
}, Oe = [], Ot = !1, oi = /* @__PURE__ */ new Set();
function Ae() {
  oi.forEach(function(e) {
    try {
      e();
    } catch (t) {
      console.error("[LiVue DevTools] Listener error:", t);
    }
  });
}
var Ks = 0;
function Ys() {
  return "req-" + ++Ks + "-" + Date.now();
}
function Gs(e) {
  var t = new Date(e), n = t.getHours().toString().padStart(2, "0"), r = t.getMinutes().toString().padStart(2, "0"), i = t.getSeconds().toString().padStart(2, "0"), o = t.getMilliseconds().toString().padStart(3, "0");
  return n + ":" + r + ":" + i + "." + o;
}
function Ta() {
  Ot || (Ot = !0, Oe.push(Ce("component.init", function(e) {
    var t = e.component;
    D.components.set(t.id, {
      id: t.id,
      name: t.name,
      isChild: e.isChild,
      isIsland: e.el && e.el.hasAttribute("data-livue-island"),
      initTime: Date.now(),
      state: t.state,
      livue: t.livue,
      el: e.el
    }), Ae();
  })), Oe.push(Ce("component.destroy", function(e) {
    var t = e.component;
    D.components.delete(t.id), D.componentBenchmarkStats.delete(t.id), Ae();
  })), Oe.push(Ce("request.started", function(e) {
    var t = Ys(), n = {
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
    D.pendingRequests.set(e.url + "-" + t, n), D.requests.unshift(n), D.requests.length > Qi && D.requests.pop(), D.perf.totalRequests++, Ae();
  })), Oe.push(Ce("request.finished", function(e) {
    var t = null;
    if (D.pendingRequests.forEach(function(r, i) {
      !t && r.url === e.url && r.status === "pending" && (t = { req: r, key: i });
    }), t) {
      var n = t.req;
      n.endTime = Date.now(), n.duration = n.endTime - n.startTime, n.status = e.success ? "success" : "error", n.responses = e.responses, n.lazyResponses = e.lazyResponses, n.error = e.error, D.pendingRequests.delete(t.key), e.success ? D.perf.successfulRequests++ : D.perf.failedRequests++, D.perf.totalRequestTime += n.duration, D.perf.avgRequestTime = D.perf.totalRequestTime / D.perf.totalRequests, n.duration < D.perf.minRequestTime && (D.perf.minRequestTime = n.duration), n.duration > D.perf.maxRequestTime && (D.perf.maxRequestTime = n.duration), Ae();
    }
  })), Oe.push(Ce("template.updating", function(e) {
    var t = e.component;
    D.pendingSwaps.set(t.id, Date.now());
  })), Oe.push(Ce("template.updated", function(e) {
    var t = e.component, n = D.pendingSwaps.get(t.id);
    if (n) {
      var r = Date.now() - n;
      D.pendingSwaps.delete(t.id), D.perf.totalTemplateSwaps++, D.perf.totalTemplateSwapTime += r, D.perf.avgTemplateSwapTime = D.perf.totalTemplateSwapTime / D.perf.totalTemplateSwaps, Ae();
    }
  })), Oe.push(Ce("benchmark.received", function(e) {
    var t = Date.now(), n = {
      time: t,
      componentId: e.componentId,
      componentName: e.componentName,
      timings: e.timings
    };
    D.serverBenchmarks.unshift(n), D.serverBenchmarks.length > Qi && D.serverBenchmarks.pop();
    var r = e.componentId, i = D.componentBenchmarkStats.get(r);
    i || (i = { count: 0, averages: {}, latest: null }, D.componentBenchmarkStats.set(r, i)), i.count++, i.latest = { time: t, timings: e.timings };
    for (var o in e.timings) {
      var a = e.timings[o], l = i.averages[o] || 0;
      i.averages[o] = l + (a - l) / i.count;
    }
    Ae();
  })), Oe.push(Ce("error.occurred", function(e) {
    var t = {
      time: Date.now(),
      error: e.error,
      componentName: e.componentName,
      componentId: e.componentId,
      context: e.context
    };
    D.errors.unshift(t), D.errors.length > Xs && D.errors.pop(), Ae();
  })));
}
function Aa() {
  Ot && (Ot = !1, Oe.forEach(function(e) {
    e();
  }), Oe = []);
}
function Zs() {
  return Ot;
}
function Qs(e) {
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
    D.events.unshift(t), D.events.length > Js && D.events.pop(), Ae();
  }
}
function eu() {
  return Array.from(D.components.values());
}
function Na() {
  return D.requests;
}
function ka() {
  return D.events;
}
function La() {
  return Object.assign({}, D.perf);
}
function tu() {
  return D.serverBenchmarks;
}
function nu(e) {
  return D.componentBenchmarkStats.get(e) || null;
}
function Da() {
  D.requests = [], D.pendingRequests.clear(), Ae();
}
function Oa() {
  D.events = [], Ae();
}
function ru() {
  D.components.clear(), D.requests = [], D.pendingRequests.clear(), D.events = [], D.errors = [], D.perf = {
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
  }, D.pendingSwaps.clear(), D.serverBenchmarks = [], D.componentBenchmarkStats.clear(), Ae();
}
function iu(e) {
  return oi.add(e), function() {
    oi.delete(e);
  };
}
function Ci(e) {
  return Gs(e);
}
function ou(e) {
  var t = D.components.get(e);
  if (!t || !t.livue || !t.livue._getDevToolsInfo)
    return null;
  try {
    return t.livue._getDevToolsInfo();
  } catch (n) {
    return console.error("[LiVue DevTools] Error getting component info:", n), null;
  }
}
function au() {
  return Hs();
}
function lu() {
  return Us();
}
var ai = null, eo = null, li = null;
function su(e) {
  ai = e;
}
function uu(e) {
  li = e;
}
function Ma() {
  if (!ai)
    return [];
  var e = ai.all(), t = [];
  return e.forEach(function(n) {
    var r = Ia(n, !1);
    t.push(r);
  }), t;
}
function Ia(e, t) {
  var n = t ? e.livue : e._rootLivue, r = e.state, i = e.name, o = t ? e.id : e.componentId, a = !t && e.el && e.el.hasAttribute("data-livue-island"), l = {
    id: o,
    name: i,
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
      l.children.push(Ia(u, !0));
    }
  return l;
}
function Ra(e) {
  var t = Ma();
  if (e.innerHTML = "", t.length === 0) {
    e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E6;</div>No components found</div>';
    return;
  }
  t.forEach(function(n) {
    e.appendChild(Pa(n));
  });
}
function Pa(e, t) {
  var n = document.createElement("div");
  n.className = "livue-devtools__node", n.dataset.id = e.id;
  var r = e.children && e.children.length > 0, i = document.createElement("div");
  i.className = "livue-devtools__node-header", e.id === eo && i.classList.add("livue-devtools__node-header--selected");
  var o = document.createElement("span");
  o.className = "livue-devtools__node-toggle", o.textContent = r ? "▼" : "", i.appendChild(o);
  var a = document.createElement("span");
  a.className = "livue-devtools__node-icon", e.isIsland ? (a.classList.add("livue-devtools__node-icon--island"), a.textContent = "◆") : e.isChild ? (a.classList.add("livue-devtools__node-icon--child"), a.textContent = "○") : (a.classList.add("livue-devtools__node-icon--root"), a.textContent = "■"), i.appendChild(a);
  var l = document.createElement("span");
  l.className = "livue-devtools__node-name", l.textContent = "<" + e.name + ">", i.appendChild(l);
  var s = document.createElement("span");
  s.className = "livue-devtools__node-id", s.textContent = "#" + e.id.substring(0, 8), s.title = e.id, i.appendChild(s);
  var u = document.createElement("span");
  if (u.className = "livue-devtools__node-badges", e.loading) {
    var c = document.createElement("span");
    c.className = "livue-devtools__badge livue-devtools__badge--loading", c.textContent = "loading", u.appendChild(c);
  }
  if (e.dirty) {
    var f = document.createElement("span");
    f.className = "livue-devtools__badge livue-devtools__badge--dirty", f.textContent = "dirty", u.appendChild(f);
  }
  if (e.errorCount > 0) {
    var p = document.createElement("span");
    p.className = "livue-devtools__badge livue-devtools__badge--error", p.textContent = e.errorCount + " error" + (e.errorCount > 1 ? "s" : ""), u.appendChild(p);
  }
  if (i.appendChild(u), i.addEventListener("click", function(m) {
    if (m.target === o && r) {
      var v = n.querySelector(".livue-devtools__node-children");
      if (v) {
        var g = v.style.display !== "none";
        v.style.display = g ? "none" : "block", o.textContent = g ? "▶" : "▼";
      }
      return;
    }
    eo = e.id;
    var y = document.querySelectorAll(".livue-devtools__node-header");
    y.forEach(function(_) {
      _.classList.remove("livue-devtools__node-header--selected");
    }), i.classList.add("livue-devtools__node-header--selected"), li && li(e);
  }), n.appendChild(i), r) {
    var h = document.createElement("div");
    h.className = "livue-devtools__node-children", e.children.forEach(function(m) {
      h.appendChild(Pa(m));
    }), n.appendChild(h);
  }
  return n;
}
var ut = null, qt = "state", Ve = /* @__PURE__ */ new Set(), mn = null;
function cu(e) {
  ut = e;
}
function hr(e) {
  if (mn = e, e.innerHTML = "", !ut) {
    e.innerHTML = '<div class="livue-devtools__state-empty">Select a component to inspect its state</div>';
    return;
  }
  var t = ut.state, n = ut.livue, r = n ? n.dirtyFields : /* @__PURE__ */ new Set(), i = ou(ut.id), o = document.createElement("div");
  o.className = "livue-devtools__state-title", o.textContent = "<" + ut.name + ">", e.appendChild(o);
  var a = document.createElement("div");
  a.style.cssText = "display: flex; gap: 4px; margin-bottom: 8px;", ["state", "diff", "info"].forEach(function(l) {
    var s = document.createElement("button");
    s.style.cssText = "padding: 2px 8px; font-size: 10px; background: " + (qt === l ? "#007acc" : "#3c3c3c") + "; border: none; color: #fff; border-radius: 3px; cursor: pointer;", s.textContent = l.charAt(0).toUpperCase() + l.slice(1), s.addEventListener("click", function() {
      qt = l, hr(e);
    }), a.appendChild(s);
  }), e.appendChild(a), qt === "state" ? du(e, t, r, n) : qt === "diff" ? fu(e, i) : qt === "info" && pu(e, i);
}
function du(e, t, n, r) {
  if (t && typeof t == "object") {
    var i = Object.keys(t);
    if (i.length === 0) {
      var o = document.createElement("div");
      o.className = "livue-devtools__state-empty", o.textContent = "No state properties", e.appendChild(o);
    } else
      i.forEach(function(l) {
        var s = n.has(l);
        e.appendChild(Ti(l, t[l], s, l));
      });
  }
  if (r && r.errors && Object.keys(r.errors).length > 0) {
    var a = document.createElement("div");
    a.className = "livue-devtools__state-title", a.style.marginTop = "12px", a.textContent = "Validation Errors", e.appendChild(a), Object.keys(r.errors).forEach(function(l) {
      var s = document.createElement("div");
      s.className = "livue-devtools__prop";
      var u = document.createElement("span");
      u.className = "livue-devtools__prop-key", u.style.color = "#f48771", u.textContent = l, s.appendChild(u);
      var c = document.createElement("span");
      c.className = "livue-devtools__prop-colon", c.textContent = ": ", s.appendChild(c);
      var f = document.createElement("span");
      f.className = "livue-devtools__prop-value", f.style.color = "#f48771", f.textContent = r.errors[l].join(", "), s.appendChild(f), e.appendChild(s);
    });
  }
}
function fu(e, t) {
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
  var i = document.createElement("div");
  i.style.cssText = "color: #dcdcaa; margin-bottom: 8px; font-size: 11px;", i.textContent = n.length + " unsync'd field(s):", e.appendChild(i), n.forEach(function(o) {
    var a = t.serverState[o], l = t.clientState[o], s = document.createElement("div");
    s.style.cssText = "margin-bottom: 8px; padding: 6px; background: #2a2d2e; border-radius: 3px;";
    var u = document.createElement("div");
    u.style.cssText = "color: #dcdcaa; font-weight: 600; margin-bottom: 4px;", u.textContent = o, s.appendChild(u);
    var c = document.createElement("div");
    c.style.cssText = "font-size: 11px; color: #858585;", c.innerHTML = '<span style="color: #6a9955;">Server:</span> <span style="color: #ce9178;">' + JSON.stringify(a) + "</span>", s.appendChild(c);
    var f = document.createElement("div");
    f.style.cssText = "font-size: 11px; color: #858585;", f.innerHTML = '<span style="color: #9cdcfe;">Client:</span> <span style="color: #ce9178;">' + JSON.stringify(l) + "</span>", s.appendChild(f), e.appendChild(s);
  });
}
function pu(e, t) {
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
    var c = document.createElement("div");
    c.className = "livue-devtools__prop";
    var f = document.createElement("span");
    f.className = "livue-devtools__prop-key", f.textContent = u.label, c.appendChild(f);
    var p = document.createElement("span");
    p.className = "livue-devtools__prop-colon", p.textContent = ": ", c.appendChild(p);
    var h = document.createElement("span");
    h.className = "livue-devtools__prop-value", h.textContent = u.value, c.appendChild(h), e.appendChild(c);
  });
  var i = document.createElement("div");
  i.className = "livue-devtools__state-title", i.style.marginTop = "12px", i.textContent = "Status", e.appendChild(i);
  var o = [
    { label: "Uploading", value: t.uploading, color: t.uploading ? "#dcdcaa" : "#858585" },
    { label: "Upload Progress", value: t.uploadProgress + "%", show: t.uploading },
    { label: "Streaming", value: t.streaming, color: t.streaming ? "#9cdcfe" : "#858585" },
    { label: "Streaming Method", value: t.streamingMethod || "-", show: t.streaming },
    { label: "Has Error", value: t.errorState.hasError, color: t.errorState.hasError ? "#f48771" : "#858585" }
  ];
  o.forEach(function(u) {
    if (u.show !== !1) {
      var c = document.createElement("div");
      c.className = "livue-devtools__prop";
      var f = document.createElement("span");
      f.className = "livue-devtools__prop-key", f.textContent = u.label, c.appendChild(f);
      var p = document.createElement("span");
      p.className = "livue-devtools__prop-colon", p.textContent = ": ", c.appendChild(p);
      var h = document.createElement("span");
      h.className = "livue-devtools__prop-value", h.style.color = u.color || "#d4d4d4", h.textContent = String(u.value), c.appendChild(h), e.appendChild(c);
    }
  });
  var a = t.composables || {}, l = Object.keys(a);
  if (l.length > 0) {
    var s = document.createElement("div");
    s.className = "livue-devtools__state-title", s.style.marginTop = "12px", s.textContent = "Composables", e.appendChild(s), l.forEach(function(u) {
      var c = a[u], f = document.createElement("div");
      f.style.cssText = "color: #c586c0; font-weight: 600; margin-top: 8px; margin-bottom: 4px;", f.textContent = u + " (livue." + u + ")", e.appendChild(f);
      var p = Object.keys(c.data || {});
      if (p.length > 0) {
        var h = document.createElement("div");
        h.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px;", h.textContent = "Data:", e.appendChild(h), p.forEach(function(g) {
          var y = document.createElement("div");
          y.style.marginLeft = "16px", y.className = "livue-devtools__prop";
          var _ = document.createElement("span");
          _.className = "livue-devtools__prop-key", _.textContent = g, y.appendChild(_);
          var C = document.createElement("span");
          C.className = "livue-devtools__prop-colon", C.textContent = ": ", y.appendChild(C), y.appendChild(qa(c.data[g], "composable." + u + "." + g)), e.appendChild(y);
        });
      }
      if (c.actions && c.actions.length > 0) {
        var m = document.createElement("div");
        m.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px; margin-top: 4px;", m.textContent = "Actions:", e.appendChild(m);
        var v = document.createElement("div");
        v.style.cssText = "margin-left: 16px; color: #dcdcaa;", v.textContent = c.actions.join(", "), e.appendChild(v);
      }
    });
  }
}
function Ti(e, t, n, r) {
  var i = document.createElement("div");
  i.className = "livue-devtools__prop";
  var o = document.createElement("span");
  o.className = "livue-devtools__prop-key", n && o.classList.add("livue-devtools__prop-key--dirty"), o.textContent = e, i.appendChild(o);
  var a = document.createElement("span");
  return a.className = "livue-devtools__prop-colon", a.textContent = ": ", i.appendChild(a), i.appendChild(qa(t, r)), i;
}
function qa(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value", e === null)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "null";
  else if (e === void 0)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "undefined";
  else if (typeof e == "string")
    n.classList.add("livue-devtools__prop-value--string"), n.textContent = '"' + hu(e, 50) + '"', n.title = e;
  else if (typeof e == "number")
    n.classList.add("livue-devtools__prop-value--number"), n.textContent = String(e);
  else if (typeof e == "boolean")
    n.classList.add("livue-devtools__prop-value--boolean"), n.textContent = String(e);
  else {
    if (Array.isArray(e))
      return vu(e, t);
    if (typeof e == "object")
      return mu(e, t);
    typeof e == "function" ? (n.classList.add("livue-devtools__prop-value--null"), n.textContent = "function()") : n.textContent = String(e);
  }
  return n;
}
function vu(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value livue-devtools__prop-value--array", e.length === 0)
    return n.textContent = "[]", n;
  var r = Ve.has(t), i = document.createElement("span");
  i.className = "livue-devtools__object-toggle", i.textContent = r ? "▼ " : "▶ ", i.addEventListener("click", function() {
    Ve.has(t) ? Ve.delete(t) : Ve.add(t), mn && hr(mn);
  }), n.appendChild(i);
  var o = document.createElement("span");
  if (o.textContent = "Array(" + e.length + ")", n.appendChild(o), r) {
    var a = document.createElement("div");
    a.className = "livue-devtools__object", e.forEach(function(l, s) {
      a.appendChild(Ti(String(s), l, !1, t + "." + s));
    }), n.appendChild(a);
  }
  return n;
}
function mu(e, t) {
  var n = document.createElement("span");
  n.className = "livue-devtools__prop-value livue-devtools__prop-value--object";
  var r = Object.keys(e);
  if (r.length === 0)
    return n.textContent = "{}", n;
  var i = Ve.has(t), o = document.createElement("span");
  o.className = "livue-devtools__object-toggle", o.textContent = i ? "▼ " : "▶ ", o.addEventListener("click", function() {
    Ve.has(t) ? Ve.delete(t) : Ve.add(t), mn && hr(mn);
  }), n.appendChild(o);
  var a = document.createElement("span");
  if (a.textContent = "{...} " + r.length + " key" + (r.length > 1 ? "s" : ""), n.appendChild(a), i) {
    var l = document.createElement("div");
    l.className = "livue-devtools__object", r.forEach(function(s) {
      l.appendChild(Ti(s, e[s], !1, t + "." + s));
    }), n.appendChild(l);
  }
  return n;
}
function hu(e, t) {
  return e.length <= t ? e : e.substring(0, t - 3) + "...";
}
function gu() {
  ut = null, Ve.clear();
}
var Et = /* @__PURE__ */ new Set();
function ja(e) {
  e.innerHTML = "";
  var t = Na(), n = document.createElement("div");
  n.className = "livue-devtools__timeline-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__timeline-title", r.textContent = "Request Timeline (" + t.length + ")", n.appendChild(r);
  var i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = "Clear", i.addEventListener("click", function() {
    Da(), Et.clear(), ja(e);
  }), n.appendChild(i), e.appendChild(n);
  var o = document.createElement("div");
  o.className = "livue-devtools__timeline-list", t.length === 0 ? o.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E1;</div>No requests yet</div>' : t.forEach(function(a) {
    o.appendChild(bu(a));
  }), e.appendChild(o);
}
function bu(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__request", Et.has(e.id) && t.classList.add("livue-devtools__request--expanded");
  var n = document.createElement("div");
  n.className = "livue-devtools__request-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__request-toggle", r.textContent = Et.has(e.id) ? "▼" : "▶", n.appendChild(r);
  var i = document.createElement("span");
  i.className = "livue-devtools__request-method", i.textContent = "POST", n.appendChild(i);
  var o = document.createElement("span");
  o.className = "livue-devtools__request-url", o.textContent = e.url, n.appendChild(o);
  var a = document.createElement("span");
  if (a.className = "livue-devtools__request-status", e.status === "pending" ? (a.classList.add("livue-devtools__request-status--pending"), a.textContent = "pending") : e.status === "success" ? (a.classList.add("livue-devtools__request-status--success"), a.textContent = "OK") : (a.classList.add("livue-devtools__request-status--error"), a.textContent = "Error"), n.appendChild(a), e.duration !== null) {
    var l = document.createElement("span");
    l.className = "livue-devtools__request-duration", e.duration < 100 ? l.classList.add("livue-devtools__request-duration--fast") : e.duration < 500 ? l.classList.add("livue-devtools__request-duration--medium") : l.classList.add("livue-devtools__request-duration--slow"), l.textContent = e.duration + "ms", n.appendChild(l);
  }
  var s = document.createElement("span");
  s.className = "livue-devtools__request-time", s.textContent = Ci(e.startTime), n.appendChild(s), n.addEventListener("click", function() {
    Et.has(e.id) ? (Et.delete(e.id), t.classList.remove("livue-devtools__request--expanded"), r.textContent = "▶") : (Et.add(e.id), t.classList.add("livue-devtools__request--expanded"), r.textContent = "▼");
  }), t.appendChild(n);
  var u = document.createElement("div");
  if (u.className = "livue-devtools__request-details", e.updateCount > 0 || e.lazyCount > 0) {
    var c = document.createElement("div");
    c.className = "livue-devtools__request-section";
    var f = document.createElement("div");
    f.className = "livue-devtools__request-section-title", f.textContent = "Summary", c.appendChild(f);
    var p = document.createElement("div"), h = [];
    e.updateCount > 0 && h.push(e.updateCount + " update" + (e.updateCount > 1 ? "s" : "")), e.lazyCount > 0 && h.push(e.lazyCount + " lazy load" + (e.lazyCount > 1 ? "s" : "")), p.textContent = h.join(", "), c.appendChild(p), u.appendChild(c);
  }
  if (e.updates && e.updates.length > 0) {
    var m = document.createElement("div");
    m.className = "livue-devtools__request-section";
    var v = document.createElement("div");
    v.className = "livue-devtools__request-section-title", v.textContent = "Request Payload", m.appendChild(v);
    var g = document.createElement("pre");
    g.className = "livue-devtools__request-json", g.textContent = yu(e.updates), m.appendChild(g), u.appendChild(m);
  }
  if (e.responses) {
    var y = document.createElement("div");
    y.className = "livue-devtools__request-section";
    var _ = document.createElement("div");
    _.className = "livue-devtools__request-section-title", _.textContent = "Response", y.appendChild(_);
    var C = document.createElement("pre");
    C.className = "livue-devtools__request-json", C.textContent = _u(e.responses), y.appendChild(C), u.appendChild(y);
  }
  if (e.error) {
    var M = document.createElement("div");
    M.className = "livue-devtools__request-section";
    var w = document.createElement("div");
    w.className = "livue-devtools__request-section-title", w.style.color = "#f48771", w.textContent = "Error", M.appendChild(w);
    var O = document.createElement("pre");
    O.className = "livue-devtools__request-json", O.style.color = "#f48771", O.textContent = e.error.message || String(e.error), M.appendChild(O), u.appendChild(M);
  }
  return t.appendChild(u), t;
}
function yu(e) {
  var t = e.map(function(n) {
    var r = {};
    return n.method && (r.method = n.method), n.params && n.params.length > 0 && (r.params = n.params), n.diffs && Object.keys(n.diffs).length > 0 && (r.diffs = n.diffs), r;
  });
  return JSON.stringify(t, null, 2);
}
function _u(e) {
  var t = e.map(function(n) {
    if (!n) return null;
    var r = {};
    return n.snapshot && (r.snapshotSize = n.snapshot.length + " bytes"), n.html && (r.htmlSize = n.html.length + " bytes"), n.events && n.events.length > 0 && (r.events = n.events.map(function(i) {
      return i.name;
    })), n.jsonResult !== void 0 && (r.jsonResult = n.jsonResult), n.redirect && (r.redirect = n.redirect), n.download && (r.download = n.download.name), r;
  });
  return JSON.stringify(t, null, 2);
}
var nn = "";
function Va(e) {
  e.innerHTML = "";
  var t = document.createElement("div");
  t.className = "livue-devtools__events-header";
  var n = document.createElement("input");
  n.className = "livue-devtools__events-filter", n.type = "text", n.placeholder = "Filter events...", n.value = nn, n.addEventListener("input", function(o) {
    nn = o.target.value.toLowerCase(), to(e.querySelector(".livue-devtools__events-list"));
  }), t.appendChild(n);
  var r = document.createElement("button");
  r.className = "livue-devtools__btn", r.textContent = "Clear", r.addEventListener("click", function() {
    Oa(), nn = "", n.value = "", Va(e);
  }), t.appendChild(r), e.appendChild(t);
  var i = document.createElement("div");
  i.className = "livue-devtools__events-list", to(i), e.appendChild(i);
}
function to(e) {
  if (e) {
    e.innerHTML = "";
    var t = ka(), n = t;
    if (nn && (n = t.filter(function(r) {
      var i = (r.name + " " + r.source + " " + JSON.stringify(r.data)).toLowerCase();
      return i.indexOf(nn) !== -1;
    })), n.length === 0) {
      t.length === 0 ? e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E8;</div>No events yet</div>' : e.innerHTML = '<div class="livue-devtools__empty">No events match filter</div>';
      return;
    }
    n.forEach(function(r) {
      e.appendChild(wu(r));
    });
  }
}
function wu(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__event";
  var n = document.createElement("span");
  n.className = "livue-devtools__event-time", n.textContent = Ci(e.time), t.appendChild(n);
  var r = document.createElement("span");
  if (r.className = "livue-devtools__event-name", r.textContent = e.name, t.appendChild(r), e.source) {
    var i = document.createElement("span");
    i.className = "livue-devtools__event-source", i.textContent = "← " + e.source, t.appendChild(i);
  }
  if (e.mode && e.mode !== "broadcast") {
    var o = document.createElement("span");
    o.className = "livue-devtools__badge", o.style.marginLeft = "4px", o.style.background = "#3c3c3c", o.style.color = "#858585", o.textContent = e.mode, e.target && (o.textContent += " → " + e.target), t.appendChild(o);
  }
  if (e.data !== void 0 && e.data !== null) {
    var a = document.createElement("span");
    a.className = "livue-devtools__event-data", a.textContent = Eu(e.data), a.title = JSON.stringify(e.data, null, 2), t.appendChild(a);
  }
  return t;
}
function Eu(e) {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  var t = JSON.stringify(e);
  return t.length > 80 ? t.substring(0, 77) + "..." : t;
}
var za = "livue-devtools-state", F = null, He = "components", dt = "state", Ai = null, Me = !1, Ha = !1, tt = "right";
function $a() {
  try {
    var e = localStorage.getItem(za);
    if (e) {
      var t = JSON.parse(e);
      He = t.activeTab || "components", dt = t.activeSubTab || "state", Me = t.minimized || !1, Ha = t.isOpen || !1, tt = t.position || "right";
    }
  } catch {
  }
}
function Pt() {
  try {
    localStorage.setItem(za, JSON.stringify({
      isOpen: F !== null,
      activeTab: He,
      activeSubTab: dt,
      minimized: Me,
      position: tt
    }));
  } catch {
  }
}
function Su() {
  return $a(), Ha;
}
var zn = null, rn = null, Hn = null;
function xu(e) {
  su(e);
}
function Cu() {
  return F !== null;
}
function Ni() {
  F || ($a(), js(), Ta(), Tu(), Ru(), Pu(), Pt());
}
function ki() {
  F && (rn && (document.removeEventListener("keydown", rn), rn = null), zn && (clearInterval(zn), zn = null), Hn && (Hn(), Hn = null), F.remove(), F = null, Ai = null, Vs(), Aa(), gu(), Pt());
}
function Fa() {
  F ? ki() : Ni();
}
function Ba() {
  switch (tt) {
    case "left":
      return { expanded: "◀", minimized: "▶" };
    case "right":
      return { expanded: "▶", minimized: "◀" };
    case "top":
      return { expanded: "▲", minimized: "▼" };
    case "bottom":
      return { expanded: "▼", minimized: "▲" };
    default:
      return { expanded: "▶", minimized: "◀" };
  }
}
function Tu() {
  F = document.createElement("div"), F.className = "livue-devtools livue-devtools--" + tt, Me && F.classList.add("livue-devtools--minimized");
  var e = document.createElement("div");
  e.className = "livue-devtools__header";
  var t = document.createElement("div");
  t.className = "livue-devtools__title", t.innerHTML = '<span class="livue-devtools__title-icon">&#x2699;</span> LiVue DevTools', e.appendChild(t);
  var n = document.createElement("div");
  n.className = "livue-devtools__actions";
  var r = Ba(), i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = Me ? r.minimized : r.expanded, i.title = "Minimize", i.addEventListener("click", function() {
    Me = !Me, F.classList.toggle("livue-devtools--minimized", Me), i.textContent = Me ? r.minimized : r.expanded, Pt();
  }), n.appendChild(i);
  var o = document.createElement("button");
  o.className = "livue-devtools__btn", o.textContent = "×", o.title = "Close (Ctrl+Shift+L)", o.addEventListener("click", ki), n.appendChild(o), e.appendChild(n), F.appendChild(e);
  var a = document.createElement("div");
  a.className = "livue-devtools__tabs";
  var l = [
    { id: "components", label: "Components" },
    { id: "timeline", label: "Timeline" },
    { id: "events", label: "Events" },
    { id: "stores", label: "Stores" },
    { id: "echo", label: "Echo" },
    { id: "perf", label: "Performance" },
    { id: "settings", label: "Settings" }
  ];
  l.forEach(function(m) {
    var v = document.createElement("button");
    v.className = "livue-devtools__tab", m.id === He && v.classList.add("livue-devtools__tab--active"), v.textContent = m.label, v.addEventListener("click", function() {
      Au(m.id);
    }), a.appendChild(v);
  }), F.appendChild(a);
  var s = document.createElement("div");
  s.className = "livue-devtools__content";
  var u = document.createElement("div");
  u.className = "livue-devtools__panel livue-devtools__panel--components", u.dataset.tab = "components", He === "components" && u.classList.add("livue-devtools__panel--active");
  var c = document.createElement("div");
  c.className = "livue-devtools__tree", u.appendChild(c);
  var f = document.createElement("div");
  f.className = "livue-devtools__right-pane";
  var p = document.createElement("div");
  p.className = "livue-devtools__sub-tabs", [{ id: "state", label: "State" }, { id: "benchmark", label: "Benchmark" }].forEach(function(m) {
    var v = document.createElement("button");
    v.className = "livue-devtools__sub-tab", m.id === dt && v.classList.add("livue-devtools__sub-tab--active"), v.textContent = m.label, v.addEventListener("click", function() {
      Nu(m.id);
    }), p.appendChild(v);
  }), f.appendChild(p);
  var h = document.createElement("div");
  h.className = "livue-devtools__sub-content", ["state", "benchmark"].forEach(function(m) {
    var v = document.createElement("div");
    v.className = "livue-devtools__panel", v.dataset.subtab = m, m === dt && v.classList.add("livue-devtools__panel--active"), h.appendChild(v);
  }), f.appendChild(h), u.appendChild(f), s.appendChild(u), ["timeline", "events", "stores", "echo", "perf", "settings"].forEach(function(m) {
    var v = document.createElement("div");
    v.className = "livue-devtools__panel", v.dataset.tab = m, m === He && v.classList.add("livue-devtools__panel--active"), s.appendChild(v);
  }), F.appendChild(s), document.body.appendChild(F), uu(function(m) {
    Ai = m, cu(m), gr();
  }), er(), Hn = iu(function() {
    er();
  });
}
function Au(e) {
  if (e !== He) {
    He = e;
    var t = F.querySelectorAll(".livue-devtools__tab"), n = ["components", "timeline", "events", "stores", "echo", "perf", "settings"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__tab--active", n[o] === e);
    });
    var r = F.querySelectorAll(".livue-devtools__panel[data-tab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.tab === e);
    }), er(), Pt();
  }
}
function Nu(e) {
  if (e !== dt) {
    dt = e;
    var t = F.querySelectorAll(".livue-devtools__sub-tab"), n = ["state", "benchmark"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__sub-tab--active", n[o] === e);
    });
    var r = F.querySelectorAll(".livue-devtools__panel[data-subtab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.subtab === e);
    }), gr(), Pt();
  }
}
function gr() {
  if (F)
    if (dt === "state") {
      var e = F.querySelector('.livue-devtools__panel[data-subtab="state"]');
      e && hr(e);
    } else {
      var t = F.querySelector('.livue-devtools__panel[data-subtab="benchmark"]');
      t && ku(t, Ai);
    }
}
function er() {
  if (F)
    switch (He) {
      case "components":
        var e = F.querySelector(".livue-devtools__tree");
        e && Ra(e), gr();
        break;
      case "timeline":
        var t = F.querySelector('.livue-devtools__panel[data-tab="timeline"]');
        t && ja(t);
        break;
      case "events":
        var n = F.querySelector('.livue-devtools__panel[data-tab="events"]');
        n && Va(n);
        break;
      case "stores":
        var r = F.querySelector('.livue-devtools__panel[data-tab="stores"]');
        r && Lu(r);
        break;
      case "echo":
        var i = F.querySelector('.livue-devtools__panel[data-tab="echo"]');
        i && Du(i);
        break;
      case "perf":
        var o = F.querySelector('.livue-devtools__panel[data-tab="perf"]');
        o && Ou(o);
        break;
      case "settings":
        var a = F.querySelector('.livue-devtools__panel[data-tab="settings"]');
        a && Mu(a);
        break;
    }
}
function ku(e, t) {
  e.innerHTML = "";
  var n = tu();
  if (n.length === 0) {
    var r = document.createElement("div");
    r.className = "livue-devtools__empty", r.innerHTML = '<div class="livue-devtools__empty-icon">&#9201;</div>No benchmark data.<br><br><span style="font-size: 11px; color: #858585;">Set LIVUE_BENCHMARK=true in .env to enable.</span>', e.appendChild(r);
    return;
  }
  if (!t) {
    var i = document.createElement("div");
    i.className = "livue-devtools__empty", i.innerHTML = '<div class="livue-devtools__empty-icon">&#x1F4CA;</div>Select a component from the tree<br>to see its benchmark data.', e.appendChild(i);
    return;
  }
  var o = n.filter(function(H) {
    return H.componentId === t.id;
  });
  if (o.length === 0) {
    var a = document.createElement("div");
    a.className = "livue-devtools__empty", a.innerHTML = '<div class="livue-devtools__empty-icon">&#9201;</div>No benchmark data for <strong style="color:#4ec9b0">' + t.name + "</strong> yet.", e.appendChild(a);
    return;
  }
  var l = o[0], s = document.createElement("div");
  s.className = "livue-devtools__perf-section";
  var u = document.createElement("div");
  u.className = "livue-devtools__perf-title", u.textContent = "Latest — " + t.name, s.appendChild(u);
  var c = document.createElement("div");
  c.style.cssText = "color: #858585; font-size: 11px; margin-bottom: 6px;", c.textContent = Ci(l.time), s.appendChild(c);
  var f = ["mount", "method_call", "render", "total"];
  for (var p in l.timings) {
    var h = l.timings[p], m = h / 1e3, v = f.indexOf(p) !== -1, g = v ? 50 : 5, y = v ? 200 : 20, _ = m < g ? "good" : m < y ? "warn" : "bad";
    s.appendChild(be(p, no(h), _));
  }
  e.appendChild(s);
  var C = nu(t.id);
  if (C && C.count > 1) {
    var M = document.createElement("div");
    M.className = "livue-devtools__perf-section";
    var w = document.createElement("div");
    w.className = "livue-devtools__perf-title", w.textContent = "Session Average (" + C.count + " requests)", M.appendChild(w);
    for (var O in C.averages) {
      var z = Math.round(C.averages[O]), R = z / 1e3, k = f.indexOf(O) !== -1, I = R < (k ? 50 : 5) ? "good" : R < (k ? 200 : 20) ? "warn" : "bad";
      M.appendChild(be(O, no(z), I));
    }
    e.appendChild(M);
  }
}
function Lu(e) {
  e.innerHTML = "";
  var t = au(), n = t.stores, r = document.createElement("div");
  if (r.className = "livue-devtools__perf-title", r.textContent = "Registered Pinia Stores", e.appendChild(r), n.length === 0) {
    var i = document.createElement("div");
    i.className = "livue-devtools__empty", i.innerHTML = '<div class="livue-devtools__empty-icon">&#128230;</div>No Pinia stores registered<br><br><span style="font-size: 11px; color: #858585;">Use LiVue.registerStore(useMyStore) to register stores</span>', e.appendChild(i);
    return;
  }
  n.forEach(function(l) {
    var s = document.createElement("div");
    s.style.cssText = "padding: 8px; background: #2a2d2e; border-radius: 4px; margin-bottom: 8px;";
    var u = document.createElement("div");
    if (u.style.cssText = "color: #4ec9b0; font-weight: 600; margin-bottom: 4px;", u.textContent = l.name, s.appendChild(u), l.filters) {
      var c = document.createElement("div");
      c.style.cssText = "font-size: 11px; color: #858585;", c.textContent = "Filters: " + JSON.stringify(l.filters), s.appendChild(c);
    }
    e.appendChild(s);
  });
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-title", o.style.marginTop = "16px", o.textContent = "Other Registrations", e.appendChild(o);
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
    var c = document.createElement("span");
    c.className = "livue-devtools__perf-value", c.textContent = l.count + (l.items.length > 0 ? " (" + l.items.join(", ") + ")" : ""), s.appendChild(c), e.appendChild(s);
  });
}
function Du(e) {
  e.innerHTML = "";
  var t = lu(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-title", r.textContent = "Laravel Echo Status", n.appendChild(r);
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-stat";
  var o = document.createElement("span");
  o.className = "livue-devtools__perf-label", o.textContent = "Echo Available", i.appendChild(o);
  var a = document.createElement("span");
  if (a.className = "livue-devtools__perf-value livue-devtools__perf-value--" + (t.available ? "good" : "warn"), a.textContent = t.available ? "Yes" : "No (window.Echo not found)", i.appendChild(a), n.appendChild(i), e.appendChild(n), !t.available) {
    var l = document.createElement("div");
    l.style.cssText = "color: #858585; font-size: 11px; padding: 8px;", l.textContent = "Configure Laravel Echo and set window.Echo to enable real-time features.", e.appendChild(l);
    return;
  }
  var s = document.createElement("div");
  s.className = "livue-devtools__perf-section";
  var u = document.createElement("div");
  if (u.className = "livue-devtools__perf-title", u.textContent = "Active Channels (" + t.channels.length + ")", s.appendChild(u), t.channels.length === 0) {
    var c = document.createElement("div");
    c.style.cssText = "color: #858585; font-size: 11px;", c.textContent = "No active channels", s.appendChild(c);
  } else
    t.channels.forEach(function(m) {
      var v = document.createElement("div");
      v.style.cssText = "padding: 4px 0; display: flex; align-items: center; gap: 8px;";
      var g = document.createElement("span");
      g.style.cssText = "padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600;", m.type === "private" ? (g.style.background = "#4d3a12", g.style.color = "#dcdcaa") : m.type === "presence" ? (g.style.background = "#264f78", g.style.color = "#9cdcfe") : (g.style.background = "#2d4a2d", g.style.color = "#6a9955"), g.textContent = m.type, v.appendChild(g);
      var y = document.createElement("span");
      y.style.color = "#d4d4d4", y.textContent = m.name, v.appendChild(y), s.appendChild(v);
    });
  e.appendChild(s);
  var f = document.createElement("div");
  f.className = "livue-devtools__perf-section";
  var p = document.createElement("div");
  if (p.className = "livue-devtools__perf-title", p.textContent = "Subscriptions (" + t.subscriptions.length + ")", f.appendChild(p), t.subscriptions.length === 0) {
    var h = document.createElement("div");
    h.style.cssText = "color: #858585; font-size: 11px;", h.textContent = "No active subscriptions", f.appendChild(h);
  } else
    t.subscriptions.forEach(function(m) {
      var v = document.createElement("div");
      v.style.cssText = "padding: 4px 0; font-size: 11px;", v.innerHTML = '<span style="color: #9cdcfe;">' + m.channelName + '</span> <span style="color: #858585;">→</span> <span style="color: #dcdcaa;">' + m.event + '</span> <span style="color: #858585;">(component: ' + m.componentId.substring(0, 8) + "...)</span>", f.appendChild(v);
    });
  e.appendChild(f);
}
function Ou(e) {
  e.innerHTML = "";
  var t = La(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-title", r.textContent = "AJAX Requests", n.appendChild(r), n.appendChild(be("Total Requests", t.totalRequests)), n.appendChild(be("Successful", t.successfulRequests, "good")), n.appendChild(be("Failed", t.failedRequests, t.failedRequests > 0 ? "bad" : null)), e.appendChild(n);
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-section";
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-title", o.textContent = "Request Timing", i.appendChild(o);
  var a = t.avgRequestTime < 100 ? "good" : t.avgRequestTime < 500 ? "warn" : "bad";
  i.appendChild(be("Average", Cn(t.avgRequestTime), a));
  var l = t.minRequestTime < 100 ? "good" : t.minRequestTime < 500 ? "warn" : "bad";
  i.appendChild(be("Fastest", t.minRequestTime === 1 / 0 ? "-" : Cn(t.minRequestTime), l));
  var s = t.maxRequestTime < 100 ? "good" : t.maxRequestTime < 500 ? "warn" : "bad";
  i.appendChild(be("Slowest", t.maxRequestTime === 0 ? "-" : Cn(t.maxRequestTime), s)), e.appendChild(i);
  var u = document.createElement("div");
  u.className = "livue-devtools__perf-section";
  var c = document.createElement("div");
  c.className = "livue-devtools__perf-title", c.textContent = "Template Swaps", u.appendChild(c), u.appendChild(be("Total Swaps", t.totalTemplateSwaps));
  var f = t.avgTemplateSwapTime < 5 ? "good" : t.avgTemplateSwapTime < 20 ? "warn" : "bad";
  u.appendChild(be("Average Time", Cn(t.avgTemplateSwapTime), f)), e.appendChild(u);
  var p = document.createElement("div");
  p.className = "livue-devtools__perf-section";
  var h = document.createElement("div");
  h.className = "livue-devtools__perf-title", h.textContent = "Components", p.appendChild(h);
  var m = eu(), v = m.filter(function(y) {
    return !y.isChild;
  }), g = m.filter(function(y) {
    return y.isChild;
  });
  p.appendChild(be("Root Components", v.length)), p.appendChild(be("Child Components", g.length)), p.appendChild(be("Total", m.length)), e.appendChild(p);
}
function Mu(e) {
  e.innerHTML = "";
  var t = document.createElement("div");
  t.className = "livue-devtools__settings-group";
  var n = document.createElement("div");
  n.className = "livue-devtools__settings-label", n.textContent = "Panel Position", t.appendChild(n);
  var r = document.createElement("div");
  r.className = "livue-devtools__settings-options";
  var i = [
    { id: "right", label: "Right", icon: "▶" },
    { id: "left", label: "Left", icon: "◀" },
    { id: "bottom", label: "Bottom", icon: "▼" },
    { id: "top", label: "Top", icon: "▲" }
  ];
  i.forEach(function(c) {
    var f = document.createElement("button");
    f.className = "livue-devtools__settings-btn", tt === c.id && f.classList.add("livue-devtools__settings-btn--active");
    var p = document.createElement("span");
    p.className = "livue-devtools__settings-btn-icon", p.textContent = c.icon, f.appendChild(p);
    var h = document.createElement("span");
    h.textContent = c.label, f.appendChild(h), f.addEventListener("click", function() {
      Iu(c.id);
    }), r.appendChild(f);
  }), t.appendChild(r), e.appendChild(t);
  var o = document.createElement("div");
  o.className = "livue-devtools__settings-group";
  var a = document.createElement("div");
  a.className = "livue-devtools__settings-label", a.textContent = "Keyboard Shortcuts", o.appendChild(a);
  var l = document.createElement("div");
  l.className = "livue-devtools__perf-stat";
  var s = document.createElement("span");
  s.style.cssText = "color: #dcdcaa; font-family: monospace;", s.textContent = "Ctrl+Shift+L", l.appendChild(s);
  var u = document.createElement("span");
  u.style.color = "#858585", u.textContent = "Toggle DevTools", l.appendChild(u), o.appendChild(l), e.appendChild(o);
}
function Iu(e) {
  if (tt !== e && (tt = e, Pt(), F)) {
    F.className = "livue-devtools livue-devtools--" + tt, Me && F.classList.add("livue-devtools--minimized");
    var t = Ba(), n = F.querySelector(".livue-devtools__btn");
    n && (n.textContent = Me ? t.minimized : t.expanded), er();
  }
}
function be(e, t, n) {
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-stat";
  var i = document.createElement("span");
  i.className = "livue-devtools__perf-label", i.textContent = e, r.appendChild(i);
  var o = document.createElement("span");
  return o.className = "livue-devtools__perf-value", n && o.classList.add("livue-devtools__perf-value--" + n), o.textContent = String(t), r.appendChild(o), r;
}
function Cn(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1 ? "<1ms" : Math.round(e) + "ms";
}
function no(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1e3 ? e + "µs" : (e / 1e3).toFixed(2) + "ms";
}
function Ru() {
  rn = function(e) {
    e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Fa());
  }, document.addEventListener("keydown", rn);
}
function Pu() {
  zn = setInterval(function() {
    if (F && He === "components") {
      var e = F.querySelector(".livue-devtools__tree");
      e && Ra(e), gr();
    }
  }, 500);
}
var hn = !1, ro = !1;
function Wa(e) {
  hn || (xu(e), hn = !0, Su() && Ni(), ro || (ro = !0, document.addEventListener("keydown", function(t) {
    t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Ua());
  })));
}
function qu() {
  if (!hn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  Ni();
}
function ju() {
  ki();
}
function Ua() {
  if (!hn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  Fa();
}
function Vu() {
  return Cu();
}
function zu() {
  return Ma();
}
function Hu() {
  return Na();
}
function $u() {
  return ka();
}
function Fu() {
  return La();
}
function Bu() {
  Da();
}
function Wu() {
  Oa();
}
function Uu() {
  ru();
}
function Ja(e) {
  Qs(e);
}
function Ju() {
  return hn;
}
function Xu() {
  Ta();
}
function Ku() {
  Aa();
}
function Xa() {
  return Zs();
}
const Yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: Uu,
  clearEvents: Wu,
  clearTimeline: Bu,
  close: ju,
  getComponents: zu,
  getEvents: $u,
  getPerf: Fu,
  getTimeline: Hu,
  init: Wa,
  isCollecting: Xa,
  isInitialized: Ju,
  isOpen: Vu,
  logEvent: Ja,
  open: qu,
  startCollecting: Xu,
  stopCollecting: Ku,
  toggle: Ua
}, Symbol.toStringTag, { value: "Module" }));
var Ge = /* @__PURE__ */ new Map();
function gn(e, t, n, r) {
  Ge.has(e) || Ge.set(e, /* @__PURE__ */ new Set());
  var i = {
    componentName: t,
    componentId: n,
    handler: r
  };
  return Ge.get(e).add(i), function() {
    var o = Ge.get(e);
    o && (o.delete(i), o.size === 0 && Ge.delete(e));
  };
}
function $n(e, t, n, r, i, o) {
  Xa() && Ja({
    name: e,
    data: t,
    mode: n,
    source: r,
    sourceId: i,
    target: o
  });
  var a = Ge.get(e);
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
function io(e) {
  Ge.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Ge.delete(n);
  });
}
function Gu(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    $n(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Zu(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function Li() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function Qu(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = Li();
    s.open("POST", u, !0);
    var c = Rt();
    c && s.setRequestHeader("X-CSRF-TOKEN", c), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(f) {
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
function Ar(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = Li() + "-remove", n = Rt();
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
function ec(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), c = Li();
    u.open("POST", c, !0);
    var f = Rt();
    f && u.setRequestHeader("X-CSRF-TOKEN", f), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(p) {
      if (p.lengthComputable) {
        var h = Math.round(p.loaded / p.total * 100);
        i({ overall: h });
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
        var h = new Error(p.error || p.message || "Upload failed");
        h.status = u.status, h.data = p, a(h);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(s);
  });
}
let on = /* @__PURE__ */ new Map(), an = /* @__PURE__ */ new Map();
function Mt(e, t) {
  let n = e + ":debounce:" + t;
  if (!on.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, c) {
        o = u, a = c, r = setTimeout(function() {
          let f = i, p = o, h = a;
          i = null, o = null, a = null, Promise.resolve(f()).then(p).catch(h);
        }, t);
      });
    };
    on.set(n, l);
  }
  return on.get(n);
}
function bn(e, t) {
  let n = e + ":throttle:" + t;
  if (!an.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < t ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    an.set(n, i);
  }
  return an.get(n);
}
function oo(e) {
  let t = e + ":";
  for (let n of on.keys())
    n.startsWith(t) && on.delete(n);
  for (let n of an.keys())
    n.startsWith(t) && an.delete(n);
}
const tr = "livue-tab-sync";
let Di = Date.now() + "-" + Math.random().toString(36).substr(2, 9), nr = null, Oi = /* @__PURE__ */ new Map(), ao = !1;
function Ka() {
  ao || (ao = !0, typeof BroadcastChannel < "u" ? (nr = new BroadcastChannel(tr), nr.onmessage = tc) : window.addEventListener("storage", nc));
}
function tc(e) {
  let t = e.data;
  t.tabId !== Di && Ya(t);
}
function nc(e) {
  if (e.key === tr && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === Di) return;
      Ya(t);
    } catch {
    }
}
function Ya(e) {
  let t = Oi.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function rc(e, t) {
  Ka(), Oi.set(e, t);
}
function lo(e) {
  Oi.delete(e);
}
function ic(e, t, n, r) {
  Ka();
  let i = {
    tabId: Di,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (nr)
    nr.postMessage(i);
  else
    try {
      localStorage.setItem(tr, JSON.stringify(i)), localStorage.removeItem(tr);
    } catch {
    }
}
function oc(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const Mi = /* @__PURE__ */ new Map();
function so(e, t, n) {
  if (e.trim())
    try {
      const r = JSON.parse(e);
      if (r.stream)
        sc(r.stream), t(r.stream);
      else {
        if (r.error)
          throw new Error(r.error);
        r.snapshot && (n.finalResponse = r);
      }
    } catch (r) {
      console.error("[LiVue Stream] Parse error:", r, e);
    }
}
async function ac(e, t, n) {
  let r = "";
  const i = { finalResponse: null };
  for (; ; ) {
    const { done: o, value: a } = await e.read();
    if (o) break;
    r += t.decode(a, { stream: !0 });
    const l = r.split(`
`);
    r = l.pop() || "";
    for (const s of l)
      so(s, n, i);
  }
  return r.trim() && so(r, n, i), i.finalResponse;
}
async function lc(e, t = {}) {
  const {
    onChunk: n = () => {
    },
    onComplete: r = () => {
    },
    onError: i = () => {
    },
    timeout: o = 6e4
  } = t, a = new AbortController();
  let l = null;
  try {
    o > 0 && (l = setTimeout(() => a.abort(), o));
    const s = await fetch("/livue/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/x-ndjson",
        "X-CSRF-TOKEN": Rt(),
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        snapshot: e.snapshot,
        diffs: e.diffs || {},
        method: e.method,
        params: e.params || []
      }),
      signal: a.signal
    });
    if (!s.ok)
      throw new Error(`HTTP error: ${s.status}`);
    const u = s.body.getReader(), c = new TextDecoder(), f = await ac(u, c, n);
    return r(f), f;
  } catch (s) {
    throw s.name === "AbortError" ? new Error("[LiVue Stream] Request timed out") : (i(s), s);
  } finally {
    clearTimeout(l);
  }
}
function sc(e) {
  const { to: t, content: n, replace: r } = e;
  let i = Mi.get(t);
  if (!i) {
    const a = document.querySelector(`[data-stream-target="${t}"]`);
    if (!a) {
      console.warn(`[LiVue Stream] Target not found: ${t}`);
      return;
    }
    si(t, a), i = { el: a, replace: !1 };
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function si(e, t, n = !1) {
  Mi.set(e, { el: t, replace: n });
}
function uo(e) {
  Mi.delete(e);
}
function uc(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function Ii(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    uc(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = Ii(r) : t[n] = r;
  }
  return t;
}
function cc(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Ii(l), c = {};
    for (let f in s)
      c[f] = /* @__PURE__ */ (function(p, h) {
        return function() {
          let m = Array.prototype.slice.call(arguments);
          return t(p + "." + h, m);
        };
      })(a, f);
    i[a] = Ie(Object.assign({}, u, c));
  }
  return i;
}
function dc(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = Ii(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function fc(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function pc(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function ui(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = Ms(), u = n.name, c = n.vueMethods || {}, f = n.jsonMethods || [], p = n.confirms || {}, h = Array.isArray(n.methods) ? n.methods.slice() : null, m = n.isolate || !1, v = n.urlParams || null, g = n.uploads || null, y = n.tabSync || null, _ = !1, C = i, M = o, w = [], O = !1, z = !1, R = a.initialHtml || null, k = Ie({}), I = [];
  function H() {
    for (let d = 0; d < I.length; d++)
      try {
        I[d]();
      } catch {
      }
    I = [];
  }
  function re(d) {
    if (H(), !!Array.isArray(d))
      for (let b = 0; b < d.length; b++) {
        let E = d[b];
        if (!E || typeof E != "object" || !E.bridge || typeof E.bridge != "object") continue;
        let L = ct(e, E.name, { scope: E.scope || "auto" }, l);
        if (!L) continue;
        let A = E.bridge;
        for (let T in A) {
          let V = A[T];
          if (!V || typeof V != "object") continue;
          let J = V.prop, X = V.mode || "two-way";
          if (!(!J || !(J in t))) {
            if (X === "two-way" || X === "store-to-state") {
              let Q = ke(function() {
                return L[T];
              }, function(rt) {
                t[J] !== rt && (t[J] = rt);
              });
              I.push(Q);
            }
            if (X === "two-way" || X === "state-to-store") {
              let Q = ke(function() {
                return t[J];
              }, function(rt) {
                L[T] !== rt && (L[T] = rt);
              });
              I.push(Q);
            }
          }
        }
      }
  }
  function K(d) {
    let b = Bl(e, d, l);
    for (let E in b)
      k[E] = b[E];
    re(d);
  }
  K(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    H(), Wl(e);
  });
  function G(d) {
    let b = document.querySelector('meta[name="livue-prefix"]'), L = "/" + (b ? b.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(d.token), A = document.createElement("a");
    A.href = L, A.download = d.name, A.style.display = "none", document.body.appendChild(A), A.click(), document.body.removeChild(A);
  }
  function ie() {
    z || O || (z = !0, queueMicrotask(Z));
  }
  async function Z() {
    if (z = !1, O || w.length === 0) return;
    O = !0;
    let d = w;
    w = [], S.loading = !0, S.processing = d[0].method;
    for (let b = 0; b < d.length; b++)
      d[b].method && (ce[d[b].method] = !0);
    try {
      let b = U(), E = d.map(function(T) {
        return { method: T.method, params: T.params };
      }), L = await Os(b.snapshot, E, b.diffs, m), A = te(L, b.diffs);
      for (let T = 0; T < d.length; T++) d[T].resolve(A);
    } catch (b) {
      for (let E = 0; E < d.length; E++)
        b.status === 422 && b.data && b.data.errors ? (Te(S.errors, b.data.errors), d[E].reject(b)) : (gt(b, u), d[E].reject(b));
    } finally {
      S.loading = !1, S.processing = null;
      for (let b = 0; b < d.length; b++)
        d[b].method && delete ce[d[b].method];
      O = !1, w.length > 0 && ie();
    }
  }
  function U() {
    let d = xn(C, t);
    return {
      snapshot: M,
      diffs: d
    };
  }
  function te(d, b, E = !0) {
    if (d.redirect) {
      wi(d.redirect);
      return;
    }
    if (d.errorBoundary) {
      let T = d.errorBoundary;
      S.errorState.hasError = T.hasError, S.errorState.errorMessage = T.errorMessage, S.errorState.errorDetails = T.errorDetails, S.errorState.recover = T.recover, (!T.errorHandled || !T.recover) && we("error.occurred", {
        error: new Error(T.errorMessage || "Component error"),
        componentName: u,
        componentId: e,
        context: { method: T.errorMethod, serverHandled: T.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (d.download && G(d.download), d.snapshot) {
      let T;
      try {
        T = JSON.parse(d.snapshot);
      } catch (V) {
        console.error("[LiVue] Failed to parse server snapshot:", V), T = null;
      }
      if (T && T.state) {
        let V = Dt(T.state);
        Ll(t, V, b), C = JSON.parse(JSON.stringify(V));
      }
      T && (M = d.snapshot), T && T.memo && (T.memo.errors ? Te(S.errors, T.memo.errors) : E && ri(S.errors), T.memo.vueMethods && (c = T.memo.vueMethods), T.memo.jsonMethods && (f = T.memo.jsonMethods), T.memo.urlParams && (v = T.memo.urlParams), T.memo.uploads && (g = T.memo.uploads), T.memo.confirms && (p = T.memo.confirms), Object.prototype.hasOwnProperty.call(T.memo, "methods") && (h = Array.isArray(T.memo.methods) ? T.memo.methods.slice() : null, S._callableMethods = h), (T.memo.composables || T.memo.composableActions) && dc(de, T.memo), T.memo.stores && K(T.memo.stores));
    }
    if (v && Zu(v, t), (d.html || d.fragments) && r && r._updateTemplate) {
      let T = {};
      if (d.snapshot) {
        let V;
        try {
          V = JSON.parse(d.snapshot);
        } catch {
          V = null;
        }
        V && V.memo && (V.memo.transitionType && (T.transitionType = V.memo.transitionType), V.memo.skipTransition && (T.skipTransition = !0));
      }
      if (d.fragments) {
        let V = R || (a.el ? a.el.innerHTML : null);
        if (V) {
          let J = pc(V, d.fragments);
          R = J, r._updateTemplate(J, T);
        }
      } else
        R = d.html, r._updateTemplate(d.html, T);
    }
    if (d.events && d.events.length > 0) {
      for (var L = 0; L < d.events.length; L++)
        d.events[L].sourceId = e;
      Gu(d.events);
    }
    if (d.js && d.js.length > 0)
      for (var A = 0; A < d.js.length; A++)
        try {
          new Function("state", "livue", d.js[A])(t, S);
        } catch (T) {
          console.error("[LiVue] Error executing ->vue() JS:", T);
        }
    if (d.benchmark && we("benchmark.received", {
      componentId: e,
      componentName: u,
      timings: d.benchmark
    }), y && y.enabled && d.snapshot && !_ && JSON.parse(d.snapshot).state) {
      let V = Qo(t), J = [];
      for (let X in V)
        (!b || !(X in b)) && J.push(X);
      if (J.length > 0) {
        let X = oc(V, J, y);
        Object.keys(X).length > 0 && ic(u, X, J, y);
      }
    }
    if (_ = !1, d.jsonResult !== void 0)
      return d.jsonResult;
  }
  let ce = Ie({}), De = {}, de = {}, nt = function(d, b) {
    return S.call(d, b);
  };
  fc(n) && (de = cc(n, nt));
  let S = Ie({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: ce,
    refs: {},
    stores: k,
    _pinia: l,
    _callableMethods: h,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(d) {
      let b = xn(C, t);
      return d === void 0 ? Object.keys(b).length > 0 : d in b;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let d = xn(C, t);
      return new Set(Object.keys(d));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(d) {
      return d === void 0 ? JSON.parse(JSON.stringify(C)) : C[d] !== void 0 ? JSON.parse(JSON.stringify(C[d])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(d) {
      d in C && (t[d] = JSON.parse(JSON.stringify(C[d])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let d in C)
        d in t && (t[d] = JSON.parse(JSON.stringify(C[d])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(d) {
      return d ? ce[d] || !1 : S.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(d) {
      let b = d ? ce[d] || !1 : S.loading;
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
    call: async function(d, b, E) {
      let L, A = null;
      if (arguments.length === 1 ? L = [] : arguments.length === 2 ? Array.isArray(b) ? L = b : L = [b] : arguments.length >= 3 && (Array.isArray(b) && E && typeof E == "object" && (E.debounce || E.throttle) ? (L = b, A = E) : L = Array.prototype.slice.call(arguments, 1)), De[d])
        return De[d](S, L);
      if (c[d]) {
        try {
          new Function("state", "livue", c[d])(t, S);
        } catch (J) {
          console.error('[LiVue] Error executing #[Vue] method "' + d + '":', J);
        }
        return;
      }
      let T = f.includes(d), V;
      return T ? V = async function() {
        if (p[d] && !await S._showConfirm(p[d]))
          return;
        S.loading = !0, S.processing = d, ce[d] = !0;
        let J;
        try {
          let X = U(), Q = await Tr(X.snapshot, d, L, X.diffs, !0);
          J = te(Q, X.diffs);
        } catch (X) {
          throw { status: X.status, errors: X.data && X.data.errors, message: X.message };
        } finally {
          S.loading = !1, S.processing = null, delete ce[d];
        }
        return J;
      } : V = async function() {
        if (!(p[d] && !await S._showConfirm(p[d])))
          return new Promise(function(J, X) {
            w.push({ method: d, params: L, resolve: J, reject: X }), ie();
          });
      }, A && A.debounce ? Mt(e + ":" + d, A.debounce)(V) : A && A.throttle ? bn(e + ":" + d, A.throttle)(V) : V();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(d, b) {
      let E = Array.prototype.slice.call(arguments, 2), L = { message: b || "Are you sure?" };
      if (await S._showConfirm(L))
        return S.call.apply(S, [d].concat(E));
    },
    /**
     * Show confirmation dialog (native or custom).
     * @param {object} config - { message, title, confirmText, cancelText }
     * @returns {Promise<boolean>}
     * @private
     */
    _showConfirm: function(d) {
      return window.LiVue && window.LiVue.confirmHandler ? window.LiVue.confirmHandler(d) : Promise.resolve(window.confirm(d.message));
    },
    /**
     * Set a local state property without server call.
     * @param {string} key
     * @param {*} value
     */
    set: function(d, b) {
      t[d] = b;
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
    store: function(d, b, E) {
      if (b === void 0) {
        let L = ct(e, d, E || { scope: "auto" }, l);
        if (L)
          return L;
        throw new Error('[LiVue] store("' + d + '"): store not found. Provide a definition or register it in PHP.');
      }
      return bi(e, d, b, E, l);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(d) {
      let b = ct(e, d, { scope: "auto" }, l);
      if (b)
        return k[d] = b, b;
      throw new Error('[LiVue] useStore("' + d + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(d) {
      let b = ct(e, d, { scope: "global" }, l);
      if (b)
        return k[d] = b, b;
      throw new Error('[LiVue] useGlobalStore("' + d + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      S.loading = !0, S.processing = "$sync";
      try {
        let d = U(), b = await Tr(d.snapshot, null, [], d.diffs, m);
        te(b, d.diffs, !1);
      } catch (d) {
        d.status === 422 && d.data && d.data.errors ? Te(S.errors, d.data.errors) : gt(d, u);
      } finally {
        S.loading = !1, S.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      ri(S.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(d, b) {
      $n(d, b, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(d, b, E) {
      $n(b, E, "to", u, e, d);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(d, b) {
      $n(d, b, "self", u, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(d) {
      _n(d, !0);
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
    upload: async function(d, b) {
      if (!g || !g[d]) {
        console.error('[LiVue] Property "' + d + '" is not configured for uploads.');
        return;
      }
      var E = Sr(t, d);
      E && E.__livue_upload && E.ref && Ar([E.ref]), S.uploading = !0, S.uploadProgress = 0;
      try {
        var L = await Qu(b, u, d, g[d].token, function(A) {
          S.uploadProgress = A;
        });
        Wt(t, d, {
          __livue_upload: !0,
          ref: L.ref,
          originalName: L.originalName,
          mimeType: L.mimeType,
          size: L.size,
          previewUrl: L.previewUrl
        });
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? Te(S.errors, A.data.errors) : gt(A, u);
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
    uploadMultiple: async function(d, b) {
      if (!g || !g[d]) {
        console.error('[LiVue] Property "' + d + '" is not configured for uploads.');
        return;
      }
      S.uploading = !0, S.uploadProgress = 0;
      try {
        var E = await ec(b, u, d, g[d].token, function(Q) {
          S.uploadProgress = Q.overall;
        }), L = E.results || [], A = E.errors || [], T = Sr(t, d), V = Array.isArray(T) ? T : [];
        if (L.length > 0) {
          var J = L.map(function(Q) {
            return {
              __livue_upload: !0,
              ref: Q.ref,
              originalName: Q.originalName,
              mimeType: Q.mimeType,
              size: Q.size,
              previewUrl: Q.previewUrl
            };
          });
          Wt(t, d, V.concat(J));
        }
        if (A.length > 0) {
          var X = {};
          A.forEach(function(Q) {
            var rt = d + "." + Q.index;
            X[rt] = {
              file: Q.file,
              message: Q.error
            };
          }), Te(S.errors, X);
        }
      } catch (Q) {
        Q.status === 422 && Q.data && Q.data.errors ? Te(S.errors, Q.data.errors) : gt(Q, u);
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
    removeUpload: function(d, b) {
      var E = Sr(t, d);
      if (b !== void 0 && Array.isArray(E)) {
        var L = E[b];
        L && L.__livue_upload && L.ref && Ar([L.ref]), E.splice(b, 1), Wt(t, d, E.slice());
      } else
        E && E.__livue_upload && E.ref && Ar([E.ref]), Wt(t, d, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(d, b, E) {
      E = E || {}, b = b || [], S.loading = !0, S.streaming = !0, S.processing = d, S.streamingMethod = d, ce[d] = !0;
      let L;
      try {
        let A = U();
        A.method = d, A.params = b, A.componentId = e;
        let T = await lc(A, {
          timeout: E.timeout !== void 0 ? E.timeout : n.streamTimeout || 0,
          onChunk: function(V) {
          },
          onComplete: function(V) {
          },
          onError: function(V) {
            console.error("[LiVue Stream] Error:", V);
          }
        });
        T && (E.background ? S.$el.dispatchEvent(new CustomEvent("livue:stream-complete", {
          bubbles: !0,
          detail: {
            method: d,
            response: T,
            componentId: e
          }
        })) : L = te(T, A.diffs));
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? Te(S.errors, A.data.errors) : gt(A, u);
      } finally {
        S.loading = !1, S.streaming = !1, S.processing = null, S.streamingMethod = null, delete ce[d];
      }
      return L;
    },
    /**
     * Manually apply a response captured from a background stream.
     * Call this inside a livue:stream-complete event handler when you
     * are ready to apply the final snapshot to the component.
     *
     * @param {object} response - The response object from event.detail.response
     */
    applyStreamResponse: function(d) {
      d && te(d, {});
    },
    /**
     * Toggle a boolean property.
     * @param {string} property - Property name to toggle
     */
    toggle: function(d) {
      d in t && (t[d] = !t[d]);
    },
    /**
     * Register a client-side event listener on the LiVue event bus.
     * Returns an unsubscribe function.
     *
     * @param {string} eventName
     * @param {Function} handler - function(data)
     * @returns {Function}
     */
    on: function(d, b) {
      return typeof d != "string" || d.length === 0 ? (console.warn("[LiVue] on() requires a non-empty event name"), function() {
      }) : typeof b != "function" ? (console.warn("[LiVue] on() handler must be a function"), function() {
      }) : gn(d, u, e, b);
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
    watch: function(d, b) {
      return typeof b != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : ke(
        function() {
          return t[d];
        },
        function(E, L) {
          b(E, L);
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
    onError: function(d) {
      return typeof d != "function" ? (console.warn("[LiVue] onError handler must be a function"), function() {
      }) : (Rs(e, d), function() {
        ii(e);
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
      S.errorState.hasError = !1, S.errorState.errorMessage = null, S.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(d, b) {
      C = JSON.parse(JSON.stringify(d)), M = b;
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
      let d = xn(C, t), b = {};
      for (let E in de) {
        let L = de[E], A = {}, T = [];
        for (let V in L)
          if (typeof L[V] == "function")
            T.push(V);
          else
            try {
              A[V] = JSON.parse(JSON.stringify(L[V]));
            } catch {
              A[V] = "[Unserializable]";
            }
        b[E] = { data: A, actions: T };
      }
      return {
        serverState: JSON.parse(JSON.stringify(C)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(d),
        diffs: d,
        memo: {
          name: u,
          isolate: m,
          urlParams: v,
          tabSync: y,
          hasUploads: !!g,
          uploadProps: g ? Object.keys(g) : [],
          vueMethods: Object.keys(c),
          confirmMethods: Object.keys(p),
          composableNames: Object.keys(de)
        },
        composables: b,
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
  for (let d in de)
    S[d] = de[d];
  async function Ue() {
    S.loading = !0, S.processing = "$refresh", ce.$refresh = !0;
    try {
      let d = U(), b = await Tr(d.snapshot, null, [], d.diffs, m);
      return te(b, d.diffs);
    } catch (d) {
      d.status === 422 && d.data && d.data.errors ? Te(S.errors, d.data.errors) : gt(d, u);
    } finally {
      S.loading = !1, S.processing = null, delete ce.$refresh;
    }
  }
  De.$refresh = function() {
    return Ue();
  }, y && y.enabled && rc(u, function(d, b, E) {
    let L = !1;
    if (E.reactive === !0)
      L = !0;
    else if (Array.isArray(E.reactive) && E.reactive.length > 0) {
      for (let A in d)
        if (E.reactive.includes(A)) {
          L = !0;
          break;
        }
    }
    if (L) {
      for (let A in d)
        E.only && !E.only.includes(A) || E.except && E.except.includes(A) || A in t && (t[A] = d[A]);
      _ = !0, S.sync();
      return;
    }
    for (let A in d)
      E.only && !E.only.includes(A) || E.except && E.except.includes(A) || A in t && (t[A] = d[A]);
    for (let A in d)
      E.only && !E.only.includes(A) || E.except && E.except.includes(A) || (C[A] = JSON.parse(JSON.stringify(d[A])));
  });
  var je = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(S, {
    get: function(d, b, E) {
      if (b in d || typeof b == "symbol")
        return Reflect.get(d, b, E);
      if (typeof b == "string" && b.startsWith("$")) {
        if (De[b])
          return function() {
            var T = Array.prototype.slice.call(arguments);
            return De[b](S, T);
          };
        var L = b.slice(1);
        if (L) {
          var A = Reflect.get(d, L, E);
          if (typeof A == "function")
            return function() {
              var T = Array.prototype.slice.call(arguments);
              return A.apply(d, T);
            };
        }
      }
      if (typeof b == "string" && !b.startsWith("$") && !je[b])
        return function() {
          var T = Array.prototype.slice.call(arguments);
          return S.call(b, ...T);
        };
    },
    set: function(d, b, E, L) {
      return Reflect.set(d, b, E, L);
    },
    has: function(d, b) {
      if (typeof b == "string" && b.startsWith("$")) {
        if (De[b])
          return !0;
        var E = b.slice(1);
        if (E) {
          var L = Reflect.get(d, E, d);
          if (typeof L == "function")
            return !0;
        }
      }
      return Reflect.has(d, b);
    }
  }), composables: de };
}
function rr(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
var xt = [], Ga = /* @__PURE__ */ new Set(), Za = {}, Qa = [];
function Tn(e, t) {
  if (!e || typeof e.install != "function") {
    console.warn("[LiVue] Plugin must have an install() method");
    return;
  }
  if (e.name) {
    for (var n = 0; n < xt.length; n++)
      if (xt[n].plugin.name === e.name) {
        xt[n] = { plugin: e, options: t };
        return;
      }
  }
  xt.push({ plugin: e, options: t });
}
function vc(e) {
  Ga.add(e);
}
function mc(e) {
  for (var t = 0; t < xt.length; t++) {
    var n = xt[t], r = n.plugin, i = n.options;
    if (!(r.name && Ga.has(r.name))) {
      var o = hc(e);
      try {
        r.install(o, i, e);
      } catch (a) {
        console.error("[LiVue] Error installing plugin " + (r.name || "(unnamed)") + ":", a);
      }
    }
  }
}
function hc(e) {
  return {
    /**
     * Subscribe to a LiVue lifecycle hook.
     * @param {string} name
     * @param {Function} fn
     * @returns {Function} Unsubscribe function
     */
    hook: function(t, n) {
      return Ce(t, n);
    },
    /**
     * Register a composable available in all component templates.
     * The value is exposed as a top-level variable with the given name.
     *
     * @param {string} name - Variable name in templates
     * @param {*} value - Any reactive or plain value
     */
    composable: function(t, n) {
      Za[t] = n;
    },
    /**
     * Register a Vue directive applied to all Vue app instances.
     *
     * @param {string} name - Directive name (without 'v-' prefix)
     * @param {object|Function} def - Vue directive definition
     */
    directive: function(t, n) {
      Qa.push({ name: t, directive: n });
    },
    /**
     * Register a LiVue.setup() callback (called for each Vue app instance).
     *
     * @param {Function} fn - Function(vueApp) called for each Vue app
     */
    setup: function(t) {
      e.setup(t);
    }
  };
}
function el() {
  return Za;
}
function gc() {
  return Qa;
}
function Fn(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, c = s.dataset.livueSnapshot || "{}", f, p, h, m, v, g;
    try {
      f = JSON.parse(c), p = f.memo ? f.memo.name : "", h = Dt(f.state || {}), m = f.memo || {}, v = s.innerHTML, g = s.tagName.toLowerCase();
    } catch (I) {
      console.error("[LiVue] Failed to parse child snapshot:", u, I);
      return;
    }
    let y = s.nextElementSibling;
    for (; y; ) {
      let I = y.nextElementSibling;
      if (y.tagName === "SCRIPT" && y.getAttribute("type") === "application/livue-setup")
        v += y.outerHTML, y.parentNode.removeChild(y);
      else
        break;
      y = I;
    }
    let _ = t._childRegistry[u];
    if (!_)
      for (let I in t._childRegistry) {
        let H = t._childRegistry[I];
        if (H.name === p && !o[I]) {
          _ = H;
          break;
        }
      }
    if (_) {
      o[_.id] = !0, _.rootTag = g;
      let I = m.reactive || [];
      if (I.length > 0) {
        for (var C = 0; C < I.length; C++) {
          var M = I[C];
          M in h && (_.state[M] = h[M]);
        }
        _.livue._updateServerState(h, c), _.componentRef && _.componentRef._updateTemplate && _.componentRef._updateTemplate(v);
      }
    }
    let w = !_;
    if (!_) {
      let H = "livue-child-" + Ml();
      t._versions[H] = 0;
      let re = Wr(h), K;
      try {
        K = JSON.parse(JSON.stringify(h));
      } catch (S) {
        console.error("[LiVue] Failed to clone child server state:", S), K = {};
      }
      let G = Object.assign({ name: m.name || p }, m), ie = { _updateTemplate: null }, Z = ha(), U = ui(u, re, G, ie, K, c, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: Z,
        pinia: t._pinia || null
      }), te = U.livue, ce = U.composables;
      we("component.init", {
        component: { id: u, name: p, state: re, livue: te },
        el: s,
        cleanup: Z.cleanup,
        isChild: !0
      });
      let De = m.errors || null;
      De && Te(te.errors, De), _ = {
        tagName: H,
        state: re,
        memo: G,
        livue: te,
        composables: ce,
        componentRef: ie,
        name: p,
        id: u,
        rootTag: g
      };
      let de = m.listeners || null;
      if (de)
        for (let S in de)
          (function(Ue, je) {
            gn(S, p, u, function(vt) {
              je.call(Ue, vt);
            });
          })(de[S], te);
      let nt = m.echo || null;
      nt && nt.length && (function(S, Ue) {
        Sa(S, nt, function(je, vt) {
          Ue.call(je, vt);
        });
      })(u, te), ie._updateTemplate = function(S) {
        let Ue = t.el.querySelector('[data-livue-id="' + u + '"]');
        Ue && ta(Ue);
        let je = Fn(S, t), vt = rr(
          "<" + _.rootTag + ">" + je.template + "</" + _.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let b in je.childDefs)
          t.vueApp._context.components[b] || t.vueApp.component(b, je.childDefs[b]);
        t.vueApp._context.components[_.tagName]._updateRender(vt), fr(function() {
          let b = t.el.querySelector('[data-livue-id="' + u + '"]');
          b && na(b);
        });
      }, t._childRegistry[u] = _, o[u] = !0;
    }
    let O = _.tagName, z = s.dataset.livueRef;
    z && t._rootLivue && (t._rootLivue.refs[z] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(I, H) {
        return _.livue.call(I, H || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(I, H) {
        return _.livue.set(I, H);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(I, H) {
        return _.livue.dispatch(I, H);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return _.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return _.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return _.livue;
      }
    });
    let R = s.dataset.livueModel;
    if (R && t._rootState && gn("$modelUpdate", _.name, u, function(I) {
      I && I.value !== void 0 && Wt(t._rootState, R, I.value);
    }), w) {
      let I = rr(
        "<" + g + ">" + v + "</" + g + ">",
        'data-livue-id="' + u + '"'
      ), H = Object.assign({}, el(), _.composables || {});
      i[O] = Yr(
        I,
        _.state,
        _.livue,
        H,
        t._versions,
        _.name
      );
    }
    t._versions[O] === void 0 && (t._versions[O] = 0);
    let k = document.createElement(O);
    k.setAttribute(":key", "livueV['" + O + "']"), s.parentNode.replaceChild(k, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let co = 0;
function ci() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Nr = /* @__PURE__ */ new WeakMap();
function fo() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const bc = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (co++, r = "livue-transition-" + co), Nr.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), ci() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    fo();
  },
  updated(e, t) {
    let n = Nr.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), ci() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    Nr.delete(e), e.removeAttribute("data-livue-transition"), fo();
  }
};
function yc(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function _c(e) {
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
function wc(e, t) {
  if (t.id)
    return e.querySelector("#" + CSS.escape(t.id));
  if (t.name)
    return e.querySelector('[name="' + CSS.escape(t.name) + '"]');
  if (t.tagName === "INPUT") {
    var n = t.type ? '[type="' + t.type + '"]' : "";
    if (t.placeholder)
      return e.querySelector("input" + n + '[placeholder="' + CSS.escape(t.placeholder) + '"]');
    if (t.ariaLabel)
      return e.querySelector("input" + n + '[aria-label="' + CSS.escape(t.ariaLabel) + '"]');
  }
  var r = null;
  if (t.tagName === "INPUT" && t.type ? r = 'input[type="' + t.type + '"]' : t.tagName === "TEXTAREA" ? r = "textarea" : t.tagName === "SELECT" && (r = "select"), r) {
    var i = e.querySelectorAll(r);
    if (i.length === 1)
      return i[0];
  }
  return null;
}
function Ec(e, t) {
  if (t) {
    var n = wc(e, t);
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
let kr = 0;
function Sc(e) {
  return Al({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = fn(!1), i = gi(null), o = null, a = fn(null);
      async function l() {
        if (!r.value)
          try {
            let u = await Ls({
              component: t.config.name,
              props: t.config.props || {}
            });
            u.html && u.snapshot && s(u);
          } catch (u) {
            console.error("[LiVue] Lazy load failed:", u);
          }
      }
      function s(u) {
        let c = JSON.parse(u.snapshot);
        kr++;
        let f = "lazy-" + kr + "-" + Date.now(), p = c.memo ? c.memo.name : "", h = Dt(c.state || {}), m = c.memo || {}, { createLivueHelper: v, buildComponentDef: g, processTemplate: y, createReactiveState: _ } = e._lazyHelpers, C = _(h), M = JSON.parse(JSON.stringify(h)), w = { _updateTemplate: null }, O = v(
          f,
          C,
          m,
          w,
          M,
          u.snapshot,
          {
            rootComponent: e,
            isChild: !0,
            parentLivue: e._rootLivue || null,
            pinia: e._pinia || null
          }
        ), z = O.livue, R = O.composables;
        m.errors && Te(z.errors, m.errors);
        let k = "livue-lazy-child-" + kr, I = y(u.html, e), H = rr(
          I.template,
          'data-livue-id="' + f + '"'
        ), re = g(
          H,
          C,
          z,
          R,
          e._versions,
          p
        );
        e._childRegistry[f] = {
          tagName: k,
          state: C,
          memo: m,
          livue: z,
          componentRef: w,
          name: p,
          id: f
        }, w._updateTemplate = function(G) {
          let ie = y(G, e), Z = rr(
            ie.template,
            'data-livue-id="' + f + '"'
          );
          for (let te in ie.childDefs)
            e.vueApp._context.components[te] || e.vueApp.component(te, ie.childDefs[te]);
          let U = g(
            Z,
            C,
            z,
            R,
            e._versions,
            p
          );
          e.vueApp._context.components[k] = U, e._versions[k] = (e._versions[k] || 0) + 1, i.value = U;
        };
        let K = m.listeners || null;
        if (K)
          for (let G in K)
            (function(ie, Z) {
              gn(G, p, f, function(U) {
                Z.call(ie, U);
              });
            })(K[G], z);
        for (let G in I.childDefs)
          e.vueApp._context.components[G] || e.vueApp.component(G, I.childDefs[G]);
        e._versions[k] = 0, e.vueApp._context.components[k] || e.vueApp.component(k, re), i.value = re, r.value = !0;
      }
      return Go(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Yo(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? Vi(i.value) : Vi("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class xc {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(t) {
    this.el = t, this.componentId = t.dataset.livueId;
    let n = t.dataset.livueSnapshot || "{}", r;
    try {
      r = JSON.parse(n);
    } catch (i) {
      console.error("[LiVue] Failed to parse component snapshot:", i), r = {};
    }
    this.name = r.memo ? r.memo.name : "", this.state = Wr(Dt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Ie({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: ui,
      buildComponentDef: Yr,
      processTemplate: Fn,
      createReactiveState: Wr
    };
    try {
      this._mount(r, n);
    } catch (i) {
      console.error("[LiVue] Component mount failed for element:", this.el, i);
    }
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
      _updateTemplate: function(g, y) {
        y = y || {}, we("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: g
        });
        var _ = _c(r.el);
        ta(r.el);
        let C;
        try {
          C = Fn(g, r);
        } catch (w) {
          console.error("[LiVue] Error processing updated template:", w);
          return;
        }
        if (!r.vueApp) return;
        for (let w in C.childDefs)
          r.vueApp._context.components[w] || r.vueApp.component(w, C.childDefs[w]);
        function M() {
          r._currentRootDef._updateRender(C.template), fr(function() {
            na(r.el), Ec(r.el, _), we("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (y.skipTransition) {
          M();
          return;
        }
        ci() ? yc(M, { type: y.transitionType }) : M();
      }
    }, o = JSON.parse(JSON.stringify(Dt(t.state || {})));
    this._cleanups = ha(), this._pinia = Hi();
    let a = ui(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups,
      initialHtml: this.el.innerHTML,
      pinia: this._pinia
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, we("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u;
    try {
      u = Fn(this.el.innerHTML, this);
    } catch (g) {
      console.error("[LiVue] Error processing initial template:", g), u = { template: this.el.innerHTML, childDefs: {} };
    }
    let c = t.memo && t.memo.errors || null;
    c && Te(l.errors, c);
    let f = t.memo && t.memo.listeners || null;
    if (f)
      for (let g in f)
        (function(y, _, C, M) {
          gn(g, C, M, function(w) {
            _.call(y, w);
          });
        })(f[g], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = Sa(r.componentId, p, function(g, y) {
      l.call(g, y);
    }));
    let h = Object.assign({}, el(), s), m = Yr(u.template, r.state, l, h, r._versions, r.name);
    this._currentRootDef = m, this._rootDefRef = gi(m), this.vueApp = Nl({
      setup: function() {
        return {
          rootDef: r._rootDefRef
        };
      },
      template: '<component :is="rootDef"></component>'
    });
    let v;
    for (v in u.childDefs)
      this.vueApp._context.components[v] || this.vueApp.component(v, u.childDefs[v]);
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", Sc(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = this._pinia || Hi();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let l = 0; l < window.LiVue._setupCallbacks.length; l++)
        try {
          let s = window.LiVue._setupCallbacks[l](n);
          s && typeof s.then == "function" && await s;
        } catch (s) {
          console.error("[LiVue] Error in setup() callback:", s);
        }
    let i = zs();
    for (let l = 0; l < i.length; l++)
      n.directive(i[l].name, i[l].directive);
    let o = gc();
    for (let l = 0; l < o.length; l++)
      n.directive(o[l].name, o[l].directive);
    let a = null;
    if (t.el && t.el.attributes) {
      a = {};
      let l = t.el.attributes;
      for (let s = 0; s < l.length; s++) {
        let u = l[s];
        u.name === "v-cloak" || u.name === "data-v-app" || (a[u.name] = u.value);
      }
    }
    t.el.innerHTML = "";
    try {
      t.vueApp.mount(t.el);
    } catch (l) {
      console.error("[LiVue] Vue app mount failed:", l);
    }
    if (a)
      for (let l in a) {
        let s = a[l];
        t.el.getAttribute(l) !== s && t.el.setAttribute(l, s);
      }
  }
  /**
   * Destroy the Vue app instance and clean up event listeners.
   */
  destroy() {
    for (let t in this._childRegistry) {
      let n = this._childRegistry[t];
      we("component.destroy", {
        component: { id: t, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), io(t), oo(t), ii(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && lo(n.name), Gi(t);
    }
    if (we("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), io(this.componentId), oo(this.componentId), ii(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && lo(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Gi(this.componentId), this.vueApp) {
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
function Le(e) {
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
let po = /* @__PURE__ */ new Set();
const Cc = {
  mounted(e, t, n) {
    let r = Le(n);
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
    po.has(u) || (po.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Lr = /* @__PURE__ */ new WeakMap(), Tc = {
  mounted(e, t, n) {
    e.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + e.tagName.toLowerCase() + ">");
    let r = Le(n);
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
    e.addEventListener("submit", l), Lr.set(e, l);
  },
  unmounted(e) {
    let t = Lr.get(e);
    t && (e.removeEventListener("submit", t), Lr.delete(e));
  }
}, An = /* @__PURE__ */ new WeakMap(), Ac = {
  mounted(e, t, n) {
    let r = Le(n);
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
    let c = "0px";
    if (s) {
      let m = parseInt(s, 10);
      isNaN(m) || (c = m + "px");
    }
    let f = l.leave === !0, p = !1, h = new IntersectionObserver(
      function(m) {
        let v = m[0];
        (f ? !v.isIntersecting : v.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (h.disconnect(), An.delete(e)));
      },
      {
        threshold: u,
        rootMargin: c
      }
    );
    h.observe(e), An.set(e, h);
  },
  unmounted(e) {
    let t = An.get(e);
    t && (t.disconnect(), An.delete(e));
  }
};
var ir = /* @__PURE__ */ new Set(), Ct = /* @__PURE__ */ new WeakMap(), vo = !1;
function kt(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function Nc(e, t) {
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
function di(e) {
  var t = Ct.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = Nc(n, i);
      if (typeof r == "object" && r !== null) {
        var a = r.active ? kt(r.active) : [], l = r.inactive ? kt(r.inactive) : [];
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
        var s = kt(r);
        o ? (s.forEach(function(u) {
          e.classList.add(u);
        }), e.setAttribute("data-current", ""), e.setAttribute("aria-current", "page")) : (s.forEach(function(u) {
          e.classList.remove(u);
        }), e.removeAttribute("data-current"), e.removeAttribute("aria-current"));
      }
    }
  }
}
function mo() {
  ir.forEach(function(e) {
    e.isConnected ? di(e) : (ir.delete(e), Ct.delete(e));
  });
}
function kc() {
  vo || (vo = !0, window.addEventListener("popstate", mo), window.addEventListener("livue:navigated", mo));
}
const Lc = {
  mounted(e, t) {
    Ct.set(e, { value: t.value, modifiers: t.modifiers || {} }), ir.add(e), kc(), di(e);
  },
  updated(e, t) {
    Ct.set(e, { value: t.value, modifiers: t.modifiers || {} }), di(e);
  },
  unmounted(e) {
    var t = Ct.get(e);
    if (t) {
      var n = t.value;
      if (typeof n == "object" && n !== null) {
        var r = n.active ? kt(n.active) : [], i = n.inactive ? kt(n.inactive) : [];
        r.forEach(function(o) {
          e.classList.remove(o);
        }), i.forEach(function(o) {
          e.classList.remove(o);
        });
      } else typeof n == "string" && kt(n).forEach(function(o) {
        e.classList.remove(o);
      });
    }
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), ir.delete(e), Ct.delete(e);
  }
};
let ho = 0;
const Dc = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    ho++;
    let n = "livue-ignore-" + ho;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, jt = /* @__PURE__ */ new WeakMap();
let go = 0;
function Oc(e) {
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
function Mc(e) {
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
function Nn(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function bo(e, t) {
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
function Ic(e) {
  return !!e.component;
}
function Dr(e, t) {
  return e[t] && typeof e[t] == "object" && "value" in e[t] ? e[t].value : e[t];
}
function Rc(e, t, n) {
  e[t] && typeof e[t] == "object" && "value" in e[t] ? e[t].value = n : e[t] = n;
}
const Pc = {
  mounted(e, t, n) {
    let r = Oc(n);
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
    go++;
    let s = "model-" + go, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: c, throttleMs: f } = Mc(l);
    l.live && !c && !f && (c = 150);
    function p(w) {
      if (l.number) {
        let O = Number(w);
        w = isNaN(O) ? 0 : O;
      }
      l.boolean && (w = !!w && w !== "false" && w !== "0"), Rc(o, a, w);
    }
    function h(w) {
      c > 0 ? Mt(s, c)(function() {
        p(w);
      }) : f > 0 ? bn(s, f)(function() {
        p(w);
      }) : p(w);
    }
    let m = Dr(o, a), v = Ic(n), g = n.component, y = null, _ = null, C = null, M = null;
    if (v && g)
      M = g.emit, g.emit = function(w, ...O) {
        if (w === "update:modelValue") {
          let z = O[0];
          h(z);
          return;
        }
        return M.call(g, w, ...O);
      }, g.props && "modelValue" in g.props && (C = ke(
        function() {
          return Dr(o, a);
        },
        function(w) {
          g.vnode && g.vnode.props && (g.vnode.props.modelValue = w), g.exposed && typeof g.exposed.setValue == "function" && g.exposed.setValue(w), g.update && g.update();
        },
        { immediate: !0 }
      )), jt.set(e, {
        isComponent: !0,
        componentInstance: g,
        originalEmit: M,
        stopWatcher: C,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (c > 0) {
        let w = Mt(s, c);
        y = function(O) {
          let z = Nn(O.target);
          w(function() {
            p(z);
          });
        };
      } else if (f > 0) {
        let w = bn(s, f);
        y = function(O) {
          let z = Nn(O.target);
          w(function() {
            p(z);
          });
        };
      } else
        y = function(w) {
          p(Nn(w.target));
        };
      l.enter ? (_ = function(w) {
        w.key === "Enter" && p(Nn(w.target));
      }, e.addEventListener("keyup", _)) : e.addEventListener(u, y), bo(e, m), jt.set(e, {
        isComponent: !1,
        handler: y,
        keyHandler: _,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(e, t, n) {
    let r = jt.get(e);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a = Dr(o, i);
      bo(e, a);
    }
  },
  unmounted(e) {
    let t = jt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), jt.delete(e));
  }
}, Or = /* @__PURE__ */ new WeakMap(), qc = 2500;
function jc(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return qc;
}
const Vc = {
  mounted(e, t, n) {
    let r = Le(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = jc(l), u = l["keep-alive"] === !0, c = l.visible === !0, f = {
      intervalId: null,
      observer: null,
      isVisible: !c,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      f.isPaused || c && !f.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function h() {
      f.intervalId || (f.intervalId = setInterval(p, s));
    }
    function m() {
      u || (document.hidden ? f.isPaused = !0 : f.isPaused = !1);
    }
    c && (f.observer = new IntersectionObserver(
      function(v) {
        f.isVisible = v[0].isIntersecting;
      },
      { threshold: 0 }
    ), f.observer.observe(e)), document.addEventListener("visibilitychange", m), f.visibilityHandler = m, h(), Or.set(e, f);
  },
  unmounted(e) {
    let t = Or.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), Or.delete(e));
  }
}, kn = /* @__PURE__ */ new WeakMap();
let or = typeof navigator < "u" ? navigator.onLine : !0, ar = /* @__PURE__ */ new Set(), yo = !1;
function zc() {
  yo || typeof window > "u" || (yo = !0, window.addEventListener("online", function() {
    or = !0, ar.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    or = !1, ar.forEach(function(e) {
      e(!1);
    });
  }));
}
const Hc = {
  created(e, t) {
    zc();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", or && (e.style.display = "none")), kn.set(e, o);
  },
  mounted(e, t) {
    let n = kn.get(e);
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
    r(or), n.updateFn = r, ar.add(r);
  },
  unmounted(e) {
    let t = kn.get(e);
    t && t.updateFn && ar.delete(t.updateFn), kn.delete(e);
  }
};
let _o = 0;
const Vt = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new Map(), $c = {
  created(e, t) {
    _o++;
    let n = "livue-replace-" + _o, r = t.modifiers.self === !0;
    Vt.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Mr.set(n, 0);
  },
  mounted(e, t) {
    let n = Vt.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = Vt.get(e);
    n && (n.version++, Mr.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = Vt.get(e);
    t && Mr.delete(t.id), Vt.delete(e);
  }
}, zt = /* @__PURE__ */ new WeakMap(), wo = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Fc = 200;
function Bc(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(wo))
    if (e[t])
      return wo[t];
  return Fc;
}
function Ir(e, t, n, r, i) {
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
const Wc = {
  created(e, t) {
    let n = e.style.display;
    zt.set(e, {
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
    let r = Le(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = zt.get(e), o = t.modifiers || {}, a = Bc(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function c(f) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), f && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Ir(e, i, o, u, !0);
      }, a) : f ? (i.isActive = !0, Ir(e, i, o, u, !0)) : (i.isActive = !1, Ir(e, i, o, u, !1));
    }
    i.stopWatch = ke(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      c,
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    zt.get(e);
  },
  unmounted(e) {
    let t = zt.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), zt.delete(e));
  }
}, Ln = /* @__PURE__ */ new WeakMap(), Uc = {
  mounted(e, t, n) {
    let r = Le(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = t.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = ke(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? e.setAttribute("data-loading", "") : e.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    Ln.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = Ln.get(e), i = Le(n);
    if (!r || !i) return;
    let o = t.value, a = t.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = ke(
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
    let t = Ln.get(e);
    t && (t.stopWatch && t.stopWatch(), Ln.delete(e));
  }
}, Ht = /* @__PURE__ */ new WeakMap(), Jc = {
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
    Ht.set(e, { targetId: n }), e.setAttribute("data-stream-target", n), si(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = Ht.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      uo(n.targetId);
      const i = t.modifiers.replace || !1;
      si(r, e, i), Ht.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = Ht.get(e);
    t && (uo(t.targetId), Ht.delete(e));
  }
}, Eo = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, So = ["ctrl", "alt", "shift", "meta"];
let xo = 0;
const Co = /* @__PURE__ */ new Set();
function Xc(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function Kc(e, t) {
  for (let i = 0; i < So.length; i++) {
    let o = So[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in Eo)
    t[i] && (n = !0, e.key === Eo[i] && (r = !0));
  return !(n && !r);
}
function Yc(e, t, n) {
  if (n && t) {
    let r = e != null ? Array.isArray(e) ? e : [e] : [];
    return { methodName: t, args: r, directFn: null };
  }
  return typeof e == "function" ? typeof e.__livueMethodName == "string" ? {
    methodName: e.__livueMethodName,
    args: Array.isArray(e.__livueMethodArgs) ? e.__livueMethodArgs.slice() : [],
    directFn: null
  } : { methodName: null, args: [], directFn: e } : typeof e == "string" ? { methodName: e, args: [], directFn: null } : Array.isArray(e) && e.length > 0 ? { methodName: e[0], args: e.slice(1), directFn: null } : { methodName: null, args: [], directFn: null };
}
function W(e, t = {}) {
  let n = t.supportsOutside === !0, r = t.isKeyboardEvent === !0, i = t.allowArg !== !1;
  const o = /* @__PURE__ */ new WeakMap();
  return {
    mounted(a, l, s) {
      const { arg: u, modifiers: c } = l, f = Le(s);
      if (!f) {
        console.warn("[LiVue] v-" + e + ": livue helper not found in component context");
        return;
      }
      if (u && !i) {
        const w = "v-" + e;
        Co.has(w) || (console.warn(
          "[LiVue] " + w + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), Co.add(w));
      }
      xo++;
      const p = "v-" + e + "-" + xo, h = Xc(c);
      let m = null, v = null;
      c.debounce && (m = Mt(p, h)), c.throttle && (v = bn(p, h));
      let g = !1;
      const y = function(w) {
        let O = Yc(l.value, u, i);
        if (O.directFn) {
          let R = O.directFn;
          m ? m(R) : v ? v(R) : R();
          return;
        }
        if (!O.methodName) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const z = function() {
          c.confirm ? f.callWithConfirm(O.methodName, "Are you sure?", ...O.args) : f.call(O.methodName, ...O.args);
        };
        m ? m(z) : v ? v(z) : z();
      }, _ = function(w) {
        if (!(c.self && w.target !== a) && !(r && !Kc(w, c))) {
          if (c.once) {
            if (g)
              return;
            g = !0;
          }
          c.prevent && w.preventDefault(), c.stop && w.stopPropagation(), y();
        }
      }, C = {};
      c.capture && (C.capture = !0), c.passive && (C.passive = !0);
      const M = {
        handler: _,
        options: C,
        outsideHandler: null
      };
      if (n && c.outside) {
        const w = function(O) {
          if (!a.contains(O.target) && O.target !== a) {
            if (c.once) {
              if (g)
                return;
              g = !0;
            }
            y();
          }
        };
        document.addEventListener(e, w, C), M.outsideHandler = w;
      } else
        a.addEventListener(e, _, C);
      o.set(a, M);
    },
    updated(a, l, s) {
    },
    unmounted(a) {
      const l = o.get(a);
      l && (l.outsideHandler ? document.removeEventListener(e, l.outsideHandler, l.options) : a.removeEventListener(e, l.handler, l.options), o.delete(a));
    }
  };
}
const Gc = W("click", {
  supportsOutside: !0,
  allowArg: !1
}), Zc = {
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
let To = 0;
const Qc = {
  created(e, t) {
    let n = t.value;
    n || (To++, n = "scroll-" + To), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, $t = /* @__PURE__ */ new WeakMap();
function Ao(e, t, n, r, i) {
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
const ed = {
  created(e, t) {
    let n = e.style.display;
    $t.set(e, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = t.modifiers || {};
    !r.class && !r.attr && (e.style.display = "none");
  },
  mounted(e, t, n) {
    let r = Le(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = $t.get(e), o = t.modifiers || {}, a = t.arg || null, l = t.value;
    i.stopWatch = ke(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        Ao(e, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = $t.get(e);
    if (r && t.value !== t.oldValue) {
      let i = Le(n);
      if (i) {
        let o = t.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Ao(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = $t.get(e);
    t && (t.stopWatch && t.stopWatch(), $t.delete(e));
  }
}, Dn = /* @__PURE__ */ new WeakMap();
let No = 0;
function td(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function nd(e, t) {
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
function rd(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const id = {
  mounted(e, t, n) {
    let r = nd(t, n);
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
    No++;
    let s = "watch-" + i + "-" + No;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), Dn.set(e, { blurHandler: p });
      return;
    }
    let u = td(l) || 150, c = Mt(s, u), f = ke(
      function() {
        return rd(a, i);
      },
      function() {
        c(function() {
          return o.sync();
        });
      }
    );
    Dn.set(e, { stopWatcher: f });
  },
  unmounted(e) {
    let t = Dn.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), Dn.delete(e));
  }
}, Rr = /* @__PURE__ */ new WeakMap();
let ko = 0;
function od(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function ad(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function ld(e, t) {
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
function br(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function yr(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function sd(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function ud(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function cd(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function dd(e) {
  return cd(e) ? e : e.querySelector("input, textarea, select");
}
function _r(e, t, n) {
  return {
    mounted(r, i, o) {
      if (od(o) && !ad(o))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let a = i.arg;
      if (!a)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let l = ld(i, o);
      if (!l)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: s } = l, u = ud(s, a);
      if (!u)
        throw new Error("[LiVue] v-" + e + ': Property "' + a + '" not found in component state');
      let c = i.modifiers || {};
      ko++;
      let f = e + "-" + ko, p = dd(r);
      if (!p) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let h = t(p, u, s, c, f);
      p.addEventListener(h.eventType, h.handler, { capture: !0 }), Rr.set(r, {
        targetEl: p,
        handler: h.handler,
        eventType: h.eventType
      });
    },
    unmounted(r) {
      let i = Rr.get(r);
      i && (n && n(r, i), i.targetEl.removeEventListener(i.eventType, i.handler, { capture: !0 }), Rr.delete(r));
    }
  };
}
function tl(e, t) {
  return _r(e, function(n, r, i, o, a) {
    let l = sd(o) || 150, s = t(a, l);
    return {
      eventType: "input",
      handler: function(u) {
        u.stopImmediatePropagation();
        let c = br(u.target);
        s(function() {
          yr(i, r, c);
        });
      }
    };
  });
}
const fd = tl("debounce", Mt), pd = tl("throttle", bn), vd = _r(
  "blur",
  function(e, t, n, r, i) {
    let o = function(l) {
      l.stopImmediatePropagation();
    }, a = function(l) {
      yr(n, t, br(l.target));
    };
    return e.addEventListener("blur", a), e._livueBlurHandler = a, { eventType: "input", handler: o };
  },
  function(e, t) {
    let n = t ? t.targetEl : e;
    n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler);
  }
), md = _r(
  "enter",
  function(e, t, n, r, i) {
    let o = function(l) {
      l.stopImmediatePropagation();
    }, a = function(l) {
      l.key === "Enter" && yr(n, t, br(l.target));
    };
    return e.addEventListener("keyup", a), e._livueEnterHandler = a, { eventType: "input", handler: o };
  },
  function(e, t) {
    let n = t ? t.targetEl : e;
    n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler);
  }
), hd = _r("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = br(o.target);
      a = !!a && a !== "false" && a !== "0", yr(n, t, a);
    }
  };
});
function Lo(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lo(Object(n), !0).forEach(function(r) {
      gd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Lo(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Bn(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Bn = function(t) {
    return typeof t;
  } : Bn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Bn(e);
}
function gd(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Be() {
  return Be = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Be.apply(this, arguments);
}
function bd(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function yd(e, t) {
  if (e == null) return {};
  var n = bd(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var _d = "1.15.6";
function $e(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var We = $e(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), wn = $e(/Edge/i), Do = $e(/firefox/i), ln = $e(/safari/i) && !$e(/chrome/i) && !$e(/android/i), Ri = $e(/iP(ad|od|hone)/i), nl = $e(/chrome/i) && $e(/android/i), rl = {
  capture: !1,
  passive: !1
};
function B(e, t, n) {
  e.addEventListener(t, n, !We && rl);
}
function $(e, t, n) {
  e.removeEventListener(t, n, !We && rl);
}
function lr(e, t) {
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
function il(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Ne(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && lr(e, t) : lr(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = il(e));
  }
  return null;
}
var Oo = /\s+/g;
function ge(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Oo, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Oo, " ");
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
function Lt(e, t) {
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
function ol(e, t, n) {
  if (e) {
    var r = e.getElementsByTagName(t), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function Pe() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function ae(e, t, n, r, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var o, a, l, s, u, c, f;
    if (e !== window && e.parentNode && e !== Pe() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, c = o.height, f = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, f = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !We))
      do
        if (i && i.getBoundingClientRect && (P(i, "transform") !== "none" || n && P(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(P(i, "border-top-width")), l -= p.left + parseInt(P(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var h = Lt(i || e), m = h && h.a, v = h && h.d;
      h && (a /= v, l /= m, f /= m, c /= v, s = a + c, u = l + f);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: f,
      height: c
    };
  }
}
function Mo(e, t, n) {
  for (var r = et(e, !0), i = ae(e)[t]; r; ) {
    var o = ae(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === Pe()) break;
    r = et(r, !1);
  }
  return !1;
}
function It(e, t, n, r) {
  for (var i = 0, o = 0, a = e.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== q.ghost && (r || a[o] !== q.dragged) && Ne(a[o], n.draggable, e, !1)) {
      if (i === t)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function Pi(e, t) {
  for (var n = e.lastElementChild; n && (n === q.ghost || P(n, "display") === "none" || t && !lr(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function Ee(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== q.clone && (!t || lr(e, t)) && n++;
  return n;
}
function Io(e) {
  var t = 0, n = 0, r = Pe();
  if (e)
    do {
      var i = Lt(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function wd(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var r in t)
        if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
    }
  return -1;
}
function et(e, t) {
  if (!e || !e.getBoundingClientRect) return Pe();
  var n = e, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = P(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return Pe();
        if (r || t) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return Pe();
}
function Ed(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Pr(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var sn;
function al(e, t) {
  return function() {
    if (!sn) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), sn = setTimeout(function() {
        sn = void 0;
      }, t);
    }
  };
}
function Sd() {
  clearTimeout(sn), sn = void 0;
}
function ll(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function sl(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function ul(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!Ne(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = ae(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var me = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function xd() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(P(i, "display") === "none" || i === q.ghost)) {
            e.push({
              target: i,
              rect: ae(i)
            });
            var o = qe({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Lt(i, !0);
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
      e.splice(wd(e, {
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
        var s = 0, u = l.target, c = u.fromRect, f = ae(u), p = u.prevFromRect, h = u.prevToRect, m = l.rect, v = Lt(u, !0);
        v && (f.top -= v.f, f.left -= v.e), u.toRect = f, u.thisAnimationDuration && Pr(p, f) && !Pr(c, f) && // Make sure animatingRect is on line between toRect & fromRect
        (m.top - f.top) / (m.left - f.left) === (c.top - f.top) / (c.left - f.left) && (s = Td(m, p, h, i.options)), Pr(f, c) || (u.prevFromRect = c, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, m, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        P(r, "transition", ""), P(r, "transform", "");
        var l = Lt(this.el), s = l && l.a, u = l && l.d, c = (i.left - o.left) / (s || 1), f = (i.top - o.top) / (u || 1);
        r.animatingX = !!c, r.animatingY = !!f, P(r, "transform", "translate3d(" + c + "px," + f + "px,0)"), this.forRepaintDummy = Cd(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Cd(e) {
  return e.offsetWidth;
}
function Td(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var bt = [], qr = {
  initializeByDefault: !0
}, En = {
  mount: function(t) {
    for (var n in qr)
      qr.hasOwnProperty(n) && !(n in t) && (t[n] = qr[n]);
    bt.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), bt.push(t);
  },
  pluginEvent: function(t, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = t + "Global";
    bt.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](qe({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](qe({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    bt.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, Be(r, u.defaults);
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
    return bt.forEach(function(i) {
      typeof i.eventProperties == "function" && Be(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return bt.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function Ad(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, c = e.oldDraggableIndex, f = e.newDraggableIndex, p = e.originalEvent, h = e.putSortable, m = e.extraEventProperties;
  if (t = t || n && n[me], !!t) {
    var v, g = t.options, y = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !We && !wn ? v = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (v = document.createEvent("Event"), v.initEvent(r, !0, !0)), v.to = a || n, v.from = l || n, v.item = i || n, v.clone = o, v.oldIndex = s, v.newIndex = u, v.oldDraggableIndex = c, v.newDraggableIndex = f, v.originalEvent = p, v.pullMode = h ? h.lastPutMode : void 0;
    var _ = qe(qe({}, m), En.getEventProperties(r, t));
    for (var C in _)
      v[C] = _[C];
    n && n.dispatchEvent(v), g[y] && g[y].call(t, v);
  }
}
var Nd = ["evt"], ve = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = yd(r, Nd);
  En.pluginEvent.bind(q)(t, n, qe({
    dragEl: x,
    parentEl: ne,
    ghostEl: j,
    rootEl: Y,
    nextEl: lt,
    lastDownEl: Wn,
    cloneEl: ee,
    cloneHidden: Ze,
    dragStarted: Kt,
    putSortable: le,
    activeSortable: q.active,
    originalEvent: i,
    oldIndex: Tt,
    oldDraggableIndex: un,
    newIndex: ye,
    newDraggableIndex: Xe,
    hideGhostForTarget: pl,
    unhideGhostForTarget: vl,
    cloneNowHidden: function() {
      Ze = !0;
    },
    cloneNowShown: function() {
      Ze = !1;
    },
    dispatchSortableEvent: function(l) {
      fe({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function fe(e) {
  Ad(qe({
    putSortable: le,
    cloneEl: ee,
    targetEl: x,
    rootEl: Y,
    oldIndex: Tt,
    oldDraggableIndex: un,
    newIndex: ye,
    newDraggableIndex: Xe
  }, e));
}
var x, ne, j, Y, lt, Wn, ee, Ze, Tt, ye, un, Xe, On, le, St = !1, sr = !1, ur = [], it, xe, jr, Vr, Ro, Po, Kt, yt, cn, dn = !1, Mn = !1, Un, ue, zr = [], fi = !1, cr = [], wr = typeof document < "u", In = Ri, qo = wn || We ? "cssFloat" : "float", kd = wr && !nl && !Ri && "draggable" in document.createElement("div"), cl = (function() {
  if (wr) {
    if (We)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), dl = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = It(t, 0, n), a = It(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + ae(o).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + ae(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[qo] === "none" || a && r[qo] === "none" && u + c > i) ? "vertical" : "horizontal";
}, Ld = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, Dd = function(t, n) {
  var r;
  return ur.some(function(i) {
    var o = i[me].options.emptyInsertThreshold;
    if (!(!o || Pi(i))) {
      var a = ae(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, fl = function(t) {
  function n(o, a) {
    return function(l, s, u, c) {
      var f = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (o == null && (a || f))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(l, s, u, c), a)(l, s, u, c);
      var p = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
    };
  }
  var r = {}, i = t.group;
  (!i || Bn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, pl = function() {
  !cl && j && P(j, "display", "none");
}, vl = function() {
  !cl && j && P(j, "display", "");
};
wr && !nl && document.addEventListener("click", function(e) {
  if (sr)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), sr = !1, !1;
}, !0);
var ot = function(t) {
  if (x) {
    t = t.touches ? t.touches[0] : t;
    var n = Dd(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[me]._onDragOver(r);
    }
  }
}, Od = function(t) {
  x && x.parentNode[me]._isOutsideThisEl(t.target);
};
function q(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = Be({}, t), e[me] = this;
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
      return dl(e, this.options);
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
    supportPointer: q.supportPointer !== !1 && "PointerEvent" in window && (!ln || Ri),
    emptyInsertThreshold: 5
  };
  En.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  fl(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : kd, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? B(e, "pointerdown", this._onTapStart) : (B(e, "mousedown", this._onTapStart), B(e, "touchstart", this._onTapStart)), this.nativeDraggable && (B(e, "dragover", this), B(e, "dragenter", this)), ur.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Be(this, xd());
}
q.prototype = /** @lends Sortable.prototype */
{
  constructor: q,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (yt = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, x) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, c = i.filter;
      if (zd(r), !x && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && ln && s && s.tagName.toUpperCase() === "SELECT") && (s = Ne(s, i.draggable, r, !1), !(s && s.animated) && Wn !== s)) {
        if (Tt = Ee(s), un = Ee(s, i.draggable), typeof c == "function") {
          if (c.call(this, t, s, this)) {
            fe({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), ve("filter", n, {
              evt: t
            }), o && t.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(f) {
          if (f = Ne(u, f.trim(), r, !1), f)
            return fe({
              sortable: n,
              rootEl: f,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), ve("filter", n, {
              evt: t
            }), !0;
        }), c)) {
          o && t.preventDefault();
          return;
        }
        i.handle && !Ne(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !x && r.parentNode === o) {
      var u = ae(r);
      if (Y = o, x = r, ne = x.parentNode, lt = x.nextSibling, Wn = r, On = a.group, q.dragged = x, it = {
        target: x,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Ro = it.clientX - u.left, Po = it.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, x.style["will-change"] = "all", s = function() {
        if (ve("delayEnded", i, {
          evt: t
        }), q.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Do && i.nativeDraggable && (x.draggable = !0), i._triggerDragStart(t, n), fe({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), ge(x, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(c) {
        ol(x, c.trim(), Hr);
      }), B(l, "dragover", ot), B(l, "mousemove", ot), B(l, "touchmove", ot), a.supportPointer ? (B(l, "pointerup", i._onDrop), !this.nativeDraggable && B(l, "pointercancel", i._onDrop)) : (B(l, "mouseup", i._onDrop), B(l, "touchend", i._onDrop), B(l, "touchcancel", i._onDrop)), Do && this.nativeDraggable && (this.options.touchStartThreshold = 4, x.draggable = !0), ve("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(wn || We))) {
        if (q.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (B(l, "pointerup", i._disableDelayedDrag), B(l, "pointercancel", i._disableDelayedDrag)) : (B(l, "mouseup", i._disableDelayedDrag), B(l, "touchend", i._disableDelayedDrag), B(l, "touchcancel", i._disableDelayedDrag)), B(l, "mousemove", i._delayedDragTouchMoveHandler), B(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && B(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    x && Hr(x), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._disableDelayedDrag), $(t, "touchend", this._disableDelayedDrag), $(t, "touchcancel", this._disableDelayedDrag), $(t, "pointerup", this._disableDelayedDrag), $(t, "pointercancel", this._disableDelayedDrag), $(t, "mousemove", this._delayedDragTouchMoveHandler), $(t, "touchmove", this._delayedDragTouchMoveHandler), $(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? B(document, "pointermove", this._onTouchMove) : n ? B(document, "touchmove", this._onTouchMove) : B(document, "mousemove", this._onTouchMove) : (B(x, "dragend", this), B(Y, "dragstart", this._onDragStart));
    try {
      document.selection ? Jn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (St = !1, Y && x) {
      ve("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && B(document, "dragover", Od);
      var r = this.options;
      !t && ge(x, r.dragClass, !1), ge(x, r.ghostClass, !0), q.active = this, t && this._appendGhost(), fe({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (xe) {
      this._lastX = xe.clientX, this._lastY = xe.clientY, pl();
      for (var t = document.elementFromPoint(xe.clientX, xe.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(xe.clientX, xe.clientY), t !== n); )
        n = t;
      if (x.parentNode[me]._isOutsideThisEl(t), n)
        do {
          if (n[me]) {
            var r = void 0;
            if (r = n[me]._onDragOver({
              clientX: xe.clientX,
              clientY: xe.clientY,
              target: t,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = il(n));
      vl();
    }
  },
  _onTouchMove: function(t) {
    if (it) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = j && Lt(j, !0), l = j && a && a.a, s = j && a && a.d, u = In && ue && Io(ue), c = (o.clientX - it.clientX + i.x) / (l || 1) + (u ? u[0] - zr[0] : 0) / (l || 1), f = (o.clientY - it.clientY + i.y) / (s || 1) + (u ? u[1] - zr[1] : 0) / (s || 1);
      if (!q.active && !St) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (j) {
        a ? (a.e += c - (jr || 0), a.f += f - (Vr || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(j, "webkitTransform", p), P(j, "mozTransform", p), P(j, "msTransform", p), P(j, "transform", p), jr = c, Vr = f, xe = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!j) {
      var t = this.options.fallbackOnBody ? document.body : Y, n = ae(x, !0, In, !0, t), r = this.options;
      if (In) {
        for (ue = t; P(ue, "position") === "static" && P(ue, "transform") === "none" && ue !== document; )
          ue = ue.parentNode;
        ue !== document.body && ue !== document.documentElement ? (ue === document && (ue = Pe()), n.top += ue.scrollTop, n.left += ue.scrollLeft) : ue = Pe(), zr = Io(ue);
      }
      j = x.cloneNode(!0), ge(j, r.ghostClass, !1), ge(j, r.fallbackClass, !0), ge(j, r.dragClass, !0), P(j, "transition", ""), P(j, "transform", ""), P(j, "box-sizing", "border-box"), P(j, "margin", 0), P(j, "top", n.top), P(j, "left", n.left), P(j, "width", n.width), P(j, "height", n.height), P(j, "opacity", "0.8"), P(j, "position", In ? "absolute" : "fixed"), P(j, "zIndex", "100000"), P(j, "pointerEvents", "none"), q.ghost = j, t.appendChild(j), P(j, "transform-origin", Ro / parseInt(j.style.width) * 100 + "% " + Po / parseInt(j.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, i = t.dataTransfer, o = r.options;
    if (ve("dragStart", this, {
      evt: t
    }), q.eventCanceled) {
      this._onDrop();
      return;
    }
    ve("setupClone", this), q.eventCanceled || (ee = sl(x), ee.removeAttribute("id"), ee.draggable = !1, ee.style["will-change"] = "", this._hideClone(), ge(ee, this.options.chosenClass, !1), q.clone = ee), r.cloneId = Jn(function() {
      ve("clone", r), !q.eventCanceled && (r.options.removeCloneOnHide || Y.insertBefore(ee, x), r._hideClone(), fe({
        sortable: r,
        name: "clone"
      }));
    }), !n && ge(x, o.dragClass, !0), n ? (sr = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : ($(document, "mouseup", r._onDrop), $(document, "touchend", r._onDrop), $(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, x)), B(document, "drop", r), P(x, "transform", "translateZ(0)")), St = !0, r._dragStartId = Jn(r._dragStarted.bind(r, n, t)), B(document, "selectstart", r), Kt = !0, window.getSelection().removeAllRanges(), ln && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = q.active, c = On === s, f = l.sort, p = le || u, h, m = this, v = !1;
    if (fi) return;
    function g(te, ce) {
      ve(te, m, qe({
        evt: t,
        isOwner: c,
        axis: h ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: f,
        fromSortable: p,
        target: r,
        completed: _,
        onMove: function(de, nt) {
          return Rn(Y, n, x, i, de, ae(de), t, nt);
        },
        changed: C
      }, ce));
    }
    function y() {
      g("dragOverAnimationCapture"), m.captureAnimationState(), m !== p && p.captureAnimationState();
    }
    function _(te) {
      return g("dragOverCompleted", {
        insertion: te
      }), te && (c ? u._hideClone() : u._showClone(m), m !== p && (ge(x, le ? le.options.ghostClass : u.options.ghostClass, !1), ge(x, l.ghostClass, !0)), le !== m && m !== q.active ? le = m : m === q.active && le && (le = null), p === m && (m._ignoreWhileAnimating = r), m.animateAll(function() {
        g("dragOverAnimationComplete"), m._ignoreWhileAnimating = null;
      }), m !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === x && !x.animated || r === n && !r.animated) && (yt = null), !l.dragoverBubble && !t.rootEl && r !== document && (x.parentNode[me]._isOutsideThisEl(t.target), !te && ot(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), v = !0;
    }
    function C() {
      ye = Ee(x), Xe = Ee(x, l.draggable), fe({
        sortable: m,
        name: "change",
        toEl: n,
        newIndex: ye,
        newDraggableIndex: Xe,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = Ne(r, l.draggable, n, !0), g("dragOver"), q.eventCanceled) return v;
    if (x.contains(t.target) || r.animated && r.animatingX && r.animatingY || m._ignoreWhileAnimating === r)
      return _(!1);
    if (sr = !1, u && !l.disabled && (c ? f || (a = ne !== Y) : le === this || (this.lastPutMode = On.checkPull(this, u, x, t)) && s.checkPut(this, u, x, t))) {
      if (h = this._getDirection(t, r) === "vertical", i = ae(x), g("dragOverValid"), q.eventCanceled) return v;
      if (a)
        return ne = Y, y(), this._hideClone(), g("revert"), q.eventCanceled || (lt ? Y.insertBefore(x, lt) : Y.appendChild(x)), _(!0);
      var M = Pi(n, l.draggable);
      if (!M || Pd(t, h, this) && !M.animated) {
        if (M === x)
          return _(!1);
        if (M && n === t.target && (r = M), r && (o = ae(r)), Rn(Y, n, x, i, r, o, t, !!r) !== !1)
          return y(), M && M.nextSibling ? n.insertBefore(x, M.nextSibling) : n.appendChild(x), ne = n, C(), _(!0);
      } else if (M && Rd(t, h, this)) {
        var w = It(n, 0, l, !0);
        if (w === x)
          return _(!1);
        if (r = w, o = ae(r), Rn(Y, n, x, i, r, o, t, !1) !== !1)
          return y(), n.insertBefore(x, w), ne = n, C(), _(!0);
      } else if (r.parentNode === n) {
        o = ae(r);
        var O = 0, z, R = x.parentNode !== n, k = !Ld(x.animated && x.toRect || i, r.animated && r.toRect || o, h), I = h ? "top" : "left", H = Mo(r, "top", "top") || Mo(x, "top", "top"), re = H ? H.scrollTop : void 0;
        yt !== r && (z = o[I], dn = !1, Mn = !k && l.invertSwap || R), O = qd(t, r, o, h, k ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Mn, yt === r);
        var K;
        if (O !== 0) {
          var G = Ee(x);
          do
            G -= O, K = ne.children[G];
          while (K && (P(K, "display") === "none" || K === j));
        }
        if (O === 0 || K === r)
          return _(!1);
        yt = r, cn = O;
        var ie = r.nextElementSibling, Z = !1;
        Z = O === 1;
        var U = Rn(Y, n, x, i, r, o, t, Z);
        if (U !== !1)
          return (U === 1 || U === -1) && (Z = U === 1), fi = !0, setTimeout(Id, 30), y(), Z && !ie ? n.appendChild(x) : r.parentNode.insertBefore(x, Z ? ie : r), H && ll(H, 0, re - H.scrollTop), ne = x.parentNode, z !== void 0 && !Mn && (Un = Math.abs(z - ae(r)[I])), C(), _(!0);
      }
      if (n.contains(x))
        return _(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", ot), $(document, "mousemove", ot), $(document, "touchmove", ot);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._onDrop), $(t, "touchend", this._onDrop), $(t, "pointerup", this._onDrop), $(t, "pointercancel", this._onDrop), $(t, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (ye = Ee(x), Xe = Ee(x, r.draggable), ve("drop", this, {
      evt: t
    }), ne = x && x.parentNode, ye = Ee(x), Xe = Ee(x, r.draggable), q.eventCanceled) {
      this._nulling();
      return;
    }
    St = !1, Mn = !1, dn = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), pi(this.cloneId), pi(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), ln && P(document.body, "user-select", ""), P(x, "transform", ""), t && (Kt && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), j && j.parentNode && j.parentNode.removeChild(j), (Y === ne || le && le.lastPutMode !== "clone") && ee && ee.parentNode && ee.parentNode.removeChild(ee), x && (this.nativeDraggable && $(x, "dragend", this), Hr(x), x.style["will-change"] = "", Kt && !St && ge(x, le ? le.options.ghostClass : this.options.ghostClass, !1), ge(x, this.options.chosenClass, !1), fe({
      sortable: this,
      name: "unchoose",
      toEl: ne,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Y !== ne ? (ye >= 0 && (fe({
      rootEl: ne,
      name: "add",
      toEl: ne,
      fromEl: Y,
      originalEvent: t
    }), fe({
      sortable: this,
      name: "remove",
      toEl: ne,
      originalEvent: t
    }), fe({
      rootEl: ne,
      name: "sort",
      toEl: ne,
      fromEl: Y,
      originalEvent: t
    }), fe({
      sortable: this,
      name: "sort",
      toEl: ne,
      originalEvent: t
    })), le && le.save()) : ye !== Tt && ye >= 0 && (fe({
      sortable: this,
      name: "update",
      toEl: ne,
      originalEvent: t
    }), fe({
      sortable: this,
      name: "sort",
      toEl: ne,
      originalEvent: t
    })), q.active && ((ye == null || ye === -1) && (ye = Tt, Xe = un), fe({
      sortable: this,
      name: "end",
      toEl: ne,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ve("nulling", this), Y = x = ne = j = lt = ee = Wn = Ze = it = xe = Kt = ye = Xe = Tt = un = yt = cn = le = On = q.dragged = q.ghost = q.clone = q.active = null, cr.forEach(function(t) {
      t.checked = !0;
    }), cr.length = jr = Vr = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        x && (this._onDragOver(t), Md(t));
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
      n = r[i], Ne(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Vd(n));
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
      Ne(l, this.options.draggable, i, !1) && (r[o] = l);
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
    return Ne(t, n || this.options.draggable, this.el, !1);
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
    var i = En.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && fl(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ve("destroy", this);
    var t = this.el;
    t[me] = null, $(t, "mousedown", this._onTapStart), $(t, "touchstart", this._onTapStart), $(t, "pointerdown", this._onTapStart), this.nativeDraggable && ($(t, "dragover", this), $(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), ur.splice(ur.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ze) {
      if (ve("hideClone", this), q.eventCanceled) return;
      P(ee, "display", "none"), this.options.removeCloneOnHide && ee.parentNode && ee.parentNode.removeChild(ee), Ze = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ze) {
      if (ve("showClone", this), q.eventCanceled) return;
      x.parentNode == Y && !this.options.group.revertClone ? Y.insertBefore(ee, x) : lt ? Y.insertBefore(ee, lt) : Y.appendChild(ee), this.options.group.revertClone && this.animate(x, ee), P(ee, "display", ""), Ze = !1;
    }
  }
};
function Md(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Rn(e, t, n, r, i, o, a, l) {
  var s, u = e[me], c = u.options.onMove, f;
  return window.CustomEvent && !We && !wn ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || ae(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), c && (f = c.call(u, s, a)), f;
}
function Hr(e) {
  e.draggable = !1;
}
function Id() {
  fi = !1;
}
function Rd(e, t, n) {
  var r = ae(It(n.el, 0, n.options, !0)), i = ul(n.el, n.options, j), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Pd(e, t, n) {
  var r = ae(Pi(n.el, n.options.draggable)), i = ul(n.el, n.options, j), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function qd(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, c = r ? n.top : n.left, f = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && Un < u * i) {
      if (!dn && (cn === 1 ? s > c + u * o / 2 : s < f - u * o / 2) && (dn = !0), dn)
        p = !0;
      else if (cn === 1 ? s < c + Un : s > f - Un)
        return -cn;
    } else if (s > c + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return jd(t);
  }
  return p = p || a, p && (s < c + u * o / 2 || s > f - u * o / 2) ? s > c + u / 2 ? 1 : -1 : 0;
}
function jd(e) {
  return Ee(x) < Ee(e) ? 1 : -1;
}
function Vd(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function zd(e) {
  cr.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && cr.push(r);
  }
}
function Jn(e) {
  return setTimeout(e, 0);
}
function pi(e) {
  return clearTimeout(e);
}
wr && B(document, "touchmove", function(e) {
  (q.active || St) && e.cancelable && e.preventDefault();
});
q.utils = {
  on: B,
  off: $,
  css: P,
  find: ol,
  is: function(t, n) {
    return !!Ne(t, n, t, !1);
  },
  extend: Ed,
  throttle: al,
  closest: Ne,
  toggleClass: ge,
  clone: sl,
  index: Ee,
  nextTick: Jn,
  cancelNextTick: pi,
  detectDirection: dl,
  getChild: It,
  expando: me
};
q.get = function(e) {
  return e[me];
};
q.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (q.utils = qe(qe({}, q.utils), r.utils)), En.mount(r);
  });
};
q.create = function(e, t) {
  return new q(e, t);
};
q.version = _d;
var oe = [], Yt, vi, mi = !1, $r, Fr, dr, Gt;
function Hd() {
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
      this.sortable.nativeDraggable ? B(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? B(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? B(document, "touchmove", this._handleFallbackAutoScroll) : B(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), jo(), Xn(), Sd();
    },
    nulling: function() {
      dr = vi = Yt = mi = Gt = $r = Fr = null, oe.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (dr = n, r || this.options.forceAutoScrollFallback || wn || We || ln) {
        Br(n, this.options, l, r);
        var s = et(l, !0);
        mi && (!Gt || o !== $r || a !== Fr) && (Gt && jo(), Gt = setInterval(function() {
          var u = et(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, Xn()), Br(n, i.options, u, r);
        }, 10), $r = o, Fr = a);
      } else {
        if (!this.options.bubbleScroll || et(l, !0) === Pe()) {
          Xn();
          return;
        }
        Br(n, this.options, et(l, !1), !1);
      }
    }
  }, Be(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Xn() {
  oe.forEach(function(e) {
    clearInterval(e.pid);
  }), oe = [];
}
function jo() {
  clearInterval(Gt);
}
var Br = al(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Pe(), u = !1, c;
    vi !== n && (vi = n, Xn(), Yt = t.scroll, c = t.scrollFn, Yt === !0 && (Yt = et(n, !0)));
    var f = 0, p = Yt;
    do {
      var h = p, m = ae(h), v = m.top, g = m.bottom, y = m.left, _ = m.right, C = m.width, M = m.height, w = void 0, O = void 0, z = h.scrollWidth, R = h.scrollHeight, k = P(h), I = h.scrollLeft, H = h.scrollTop;
      h === s ? (w = C < z && (k.overflowX === "auto" || k.overflowX === "scroll" || k.overflowX === "visible"), O = M < R && (k.overflowY === "auto" || k.overflowY === "scroll" || k.overflowY === "visible")) : (w = C < z && (k.overflowX === "auto" || k.overflowX === "scroll"), O = M < R && (k.overflowY === "auto" || k.overflowY === "scroll"));
      var re = w && (Math.abs(_ - i) <= a && I + C < z) - (Math.abs(y - i) <= a && !!I), K = O && (Math.abs(g - o) <= a && H + M < R) - (Math.abs(v - o) <= a && !!H);
      if (!oe[f])
        for (var G = 0; G <= f; G++)
          oe[G] || (oe[G] = {});
      (oe[f].vx != re || oe[f].vy != K || oe[f].el !== h) && (oe[f].el = h, oe[f].vx = re, oe[f].vy = K, clearInterval(oe[f].pid), (re != 0 || K != 0) && (u = !0, oe[f].pid = setInterval(function() {
        r && this.layer === 0 && q.active._onTouchMove(dr);
        var ie = oe[this.layer].vy ? oe[this.layer].vy * l : 0, Z = oe[this.layer].vx ? oe[this.layer].vx * l : 0;
        typeof c == "function" && c.call(q.dragged.parentNode[me], Z, ie, e, dr, oe[this.layer].el) !== "continue" || ll(oe[this.layer].el, Z, ie);
      }.bind({
        layer: f
      }), 24))), f++;
    } while (t.bubbleScroll && p !== s && (p = et(p, !1)));
    mi = u;
  }
}, 30), ml = function(t) {
  var n = t.originalEvent, r = t.putSortable, i = t.dragEl, o = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    l();
    var c = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, f = document.elementFromPoint(c.clientX, c.clientY);
    s(), u && !u.el.contains(f) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: r
    }));
  }
};
function qi() {
}
qi.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = It(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: ml
};
Be(qi, {
  pluginName: "revertOnSpill"
});
function ji() {
}
ji.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: ml
};
Be(ji, {
  pluginName: "removeOnSpill"
});
q.mount(new Hd());
q.mount(ji, qi);
const At = /* @__PURE__ */ new WeakMap(), Kn = /* @__PURE__ */ new WeakMap();
function $d(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Pn = /* @__PURE__ */ new WeakMap();
function Fd(e, t) {
  let n = e.from;
  e.oldIndex < e.newIndex ? n.insertBefore(e.item, n.children[e.oldIndex]) : n.insertBefore(e.item, n.children[e.oldIndex + 1]);
  let r = t.splice(e.oldIndex, 1)[0];
  t.splice(e.newIndex, 0, r);
}
function Bd(e, t, n) {
  let r = e.item, i = Kn.get(r);
  i === void 0 && (i = r.dataset.livueSortItem), typeof i == "string" && /^\d+$/.test(i) && (i = parseInt(i, 10));
  let o = [i, e.newIndex];
  if (e.from !== e.to) {
    let a = e.to.dataset.livueSortMethod;
    a && (t = a);
    let l = e.from.dataset.livueSortId || e.from.dataset.livueSortGroup || null;
    o.push(l);
  }
  n.call(t, o);
}
const Wd = {
  mounted(e, t, n) {
    let r = Le(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = $d(i), l = i.horizontal ? "horizontal" : "vertical";
    Pn.set(e, t);
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
        if (p.oldIndex === p.newIndex) return;
        let h = Pn.get(e), m = h ? h.value : null;
        Array.isArray(m) ? Fd(p, m) : typeof m == "string" && r && Bd(p, m, r);
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let f = q.create(e, u);
    At.set(e, f);
  },
  updated(e, t) {
    Pn.set(e, t);
    let n = At.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = At.get(e);
    t && (t.destroy(), At.delete(e)), Pn.delete(e);
  }
}, Ud = {
  mounted(e, t) {
    let n = t.value;
    Kn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    Kn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (Kn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Jd = {
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
}, Xd = {
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
}, Kd = {
  mounted(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = At.get(e);
    r && r.option("group", n);
  },
  updated(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = At.get(e);
    r && r.option("group", n);
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, Yd = W("dblclick"), Gd = W("mousedown"), Zd = W("mouseup"), Qd = W("mouseenter"), ef = W("mouseleave"), tf = W("mouseover"), nf = W("mouseout"), rf = W("mousemove"), of = W("contextmenu"), af = W("keydown", { isKeyboardEvent: !0 }), lf = W("keyup", { isKeyboardEvent: !0 }), sf = W("keypress", { isKeyboardEvent: !0 }), uf = W("focus"), cf = W("focusin"), df = W("focusout"), ff = W("touchstart"), pf = W("touchend"), vf = W("touchmove"), mf = W("touchcancel"), hf = W("change"), gf = W("input"), bf = W("reset"), yf = W("dragstart"), _f = W("dragend"), wf = W("dragenter"), Ef = W("dragleave"), Sf = W("dragover"), xf = W("drop"), Cf = W("copy"), Tf = W("cut"), Af = W("paste"), Nf = W("wheel"), kf = W("resize");
function Lf() {
  N("init", Cc), N("submit", Tc), N("intersect", Ac), N("current", Lc), N("ignore", Dc), N("model-livue", Pc), N("debounce", fd), N("throttle", pd), N("blur", vd), N("enter", md), N("boolean", hd), N("poll", Vc), N("offline", Hc), N("transition", bc), N("replace", $c), N("loading", Wc), N("target", Uc), N("stream", Jc), N("click", Gc), N("navigate", Zc), N("scroll", Qc), N("dirty", ed), N("watch", id), N("sort", Wd), N("sort-item", Ud), N("sort-handle", Jd), N("sort-ignore", Xd), N("sort-group", Kd), N("dblclick", Yd), N("mousedown", Gd), N("mouseup", Zd), N("mouseenter", Qd), N("mouseleave", ef), N("mouseover", tf), N("mouseout", nf), N("mousemove", rf), N("contextmenu", of), N("keydown", af), N("keyup", lf), N("keypress", sf), N("focus", uf), N("focusin", cf), N("focusout", df), N("touchstart", ff), N("touchend", pf), N("touchmove", vf), N("touchcancel", mf), N("change", hf), N("input", gf), N("reset", bf), N("dragstart", yf), N("dragend", _f), N("dragenter", wf), N("dragleave", Ef), N("dragover", Sf), N("drop", xf), N("copy", Cf), N("cut", Tf), N("paste", Af), N("wheel", Nf), N("resize", kf);
}
var yn = !1, hi = [];
function hl() {
  if (!yn) {
    yn = !0, console.log("[LiVue] Debug mode enabled");
    var e = ga();
    e.forEach(function(t) {
      var n = Ce(t, function(r) {
        var i = {};
        r.component && (i.componentId = r.component.id, i.componentName = r.component.name), r.el && (i.element = r.el.tagName), r.url && (i.url = r.url), r.updateCount !== void 0 && (i.updateCount = r.updateCount), r.lazyCount !== void 0 && (i.lazyCount = r.lazyCount), r.success !== void 0 && (i.success = r.success), r.error && (i.error = r.error.message || String(r.error)), r.isChild !== void 0 && (i.isChild = r.isChild), console.log("[LiVue] " + t + ":", i);
      });
      hi.push(n);
    });
  }
}
function Df() {
  yn && (yn = !1, console.log("[LiVue] Debug mode disabled"), hi.forEach(function(e) {
    e();
  }), hi = []);
}
function Vo() {
  return yn;
}
function qn(e, t) {
  var n = [];
  if (e.tagName && e.tagName.toLowerCase() === "livue-lazy" && zo(e) && n.push(e), e.querySelectorAll) {
    var r = e.querySelectorAll("livue-lazy");
    r.forEach(function(i) {
      zo(i) && n.push(i);
    });
  }
  n.forEach(function(i) {
    Of(i, t);
  });
}
function zo(e) {
  if (e.dataset.livueLazyWrapped)
    return !1;
  for (var t = e.parentElement; t; ) {
    if (t.hasAttribute("data-livue-id"))
      return !1;
    t = t.parentElement;
  }
  return !0;
}
function Of(e, t) {
  e.dataset.livueLazyWrapped = "true";
  var n = document.createElement("div"), r = "livue-lazy-wrapper-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9), i = {
    state: {},
    memo: {
      name: "lazy-wrapper",
      checksum: ""
    }
  };
  n.dataset.livueId = r, n.dataset.livueSnapshot = JSON.stringify(i), e.parentNode.insertBefore(n, e), n.appendChild(e), t(n);
}
let Ke = null, Ft = null, Ho = !1;
function Mf() {
  if (Ho)
    return;
  Ho = !0;
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
function If() {
  return Ke || (Mf(), Ke = document.createElement("div"), Ke.className = "livue-hmr-indicator", document.body.appendChild(Ke), Ke);
}
function jn(e, t) {
  const n = If();
  switch (Ft && (clearTimeout(Ft), Ft = null), e) {
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
            `, Ft = setTimeout(function() {
        $o();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, Ft = setTimeout(function() {
        $o();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function $o() {
  Ke && Ke.classList.remove("visible");
}
let ft = null, Er = !0, gl = !0, Zt = !0, Yn = [];
function Rf(e) {
  ft = e;
}
async function Pf(e) {
  if (Er) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), Zt && jn("updating", e.fileName), Yn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = gl ? qf() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), Zt && jn("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), ft.reboot(), t && (await Vf(), jf(t)), Zt && jn("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), Zt && jn("error");
    }
  }
}
function qf() {
  const e = /* @__PURE__ */ new Map();
  return ft && ft.all().forEach(function(n) {
    if (Fo(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Fo(r, i.name, i.state, e);
      }
  }), e;
}
function Fo(e, t, n, r) {
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
function jf(e) {
  ft && e.forEach(function(t, n) {
    const r = ft.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function Vf() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function zf() {
  return typeof import.meta < "u" && !1;
}
function Hf() {
  Er = !0;
}
function $f() {
  Er = !1;
}
function Ff() {
  return Er;
}
function Bf(e) {
  e.indicator !== void 0 && (Zt = e.indicator), e.preserveState !== void 0 && (gl = e.preserveState);
}
function Wf(e) {
  return Yn.push(e), function() {
    const t = Yn.indexOf(e);
    t !== -1 && Yn.splice(t, 1);
  };
}
async function Uf() {
  ft && await Pf({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
const Jf = {
  name: "livue:progress",
  install(e) {
    e.hook("request.started", function() {
      Zr() && da();
    }), e.hook("request.finished", function() {
      Zr() && yi();
    });
  }
}, Xf = {
  name: "livue:devtools",
  install(e, t, n) {
    Wa(n);
  }
}, Kf = {
  name: "livue:debug",
  install(e, t) {
    t && t.enabled && hl();
  }
};
class Yf {
  constructor() {
    this.components = /* @__PURE__ */ new Map(), this._observer = null, this._setupCallbacks = [], this._preservingIds = null;
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
    Is(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Tn(Jf), Tn(Xf), Tn(Kf), mc(this), Lf(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), qn(document.body, this._initComponent.bind(this)), us(this), this._startObserver(), Rf(this);
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
    }.bind(this)), qn(document.body, this._initComponent.bind(this)), this._startObserver();
  }
  /**
   * Reboot but preserve certain components (don't destroy them).
   * Used during SPA navigation with @persist elements.
   */
  rebootPreserving() {
    document.querySelectorAll("[data-livue-id]").forEach(function(r) {
      this._isRoot(r) && this._initComponent(r);
    }.bind(this)), qn(document.body, this._initComponent.bind(this));
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
    _n(t, !0, !1);
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
    ss(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return mr(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    _i();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return xs();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Qn;
  }
  /**
   * Get the error overlay API.
   * Used internally by the request pool to display server HTML error pages
   * (Ignition / Whoops / dd()) when APP_DEBUG is enabled server-side.
   *
   * @returns {object} { configure, show, close, isEnabled, maybeShowFromResponse }
   */
  get errorOverlay() {
    return ks;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: pt(),
      ...Ws()
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
    let r = new xc(t);
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
    return Ce(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return ga();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), Zi();
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
    }), Zi();
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
    }.bind(this)), qn(t, this._initComponent.bind(this));
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
   * Register a LiVue plugin.
   * The plugin's install() method will be called during boot() with the plugin API.
   * Plugins registered before boot() are queued and applied during boot().
   *
   * @param {object} plugin - Plugin object with install() method
   * @param {*} [options] - Options passed to plugin.install()
   * @returns {LiVueRuntime} this (chainable)
   *
   * @example
   * LiVue.use(MyPlugin, { option: 'value' });
   */
  use(t, n) {
    return Tn(t, n), this;
  }
  /**
   * Disable a built-in plugin by name, preventing it from running during boot.
   * Must be called before boot (before DOM ready).
   *
   * @param {string} name - Plugin name (e.g. 'livue:progress', 'livue:devtools')
   * @returns {LiVueRuntime} this (chainable)
   *
   * @example
   * LiVue.removePlugin('livue:progress'); // disable progress bar plugin
   */
  removePlugin(t) {
    return vc(t), this;
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
    return Yu;
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
      isAvailable: zf,
      isEnabled: Ff,
      enable: Hf,
      disable: $f,
      configure: Bf,
      onUpdate: Wf,
      trigger: Uf
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
    return t ? hl() : Df(), Vo();
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return Vo();
  }
}
const Bt = new Yf();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = kl, document.head.appendChild(e);
}
if (!window.LiVue) {
  var he = window.LiVueConfig || {};
  (he.showProgressBar !== void 0 || he.progressBarColor !== void 0 || he.prefetch !== void 0 || he.prefetchOnHover !== void 0 || he.hoverDelay !== void 0 || he.cachePages !== void 0 || he.maxCacheSize !== void 0 || he.restoreScroll !== void 0) && Bt.configureNavigation(he), he.showProgressOnRequest !== void 0 && Bt.progress.configure({ showOnRequest: he.showProgressOnRequest }), he.debug !== void 0 && Bt.errorOverlay.configure({ enabled: !!he.debug });
  let e = !1;
  const t = () => {
    e || (e = !0, Bt.boot());
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", t, { once: !0 }) : document.readyState === "interactive" ? (document.addEventListener("DOMContentLoaded", t, { once: !0 }), window.addEventListener("load", t, { once: !0 })) : queueMicrotask(t), window.LiVue = Bt;
}
const Zf = window.LiVue;
export {
  Kf as DebugPlugin,
  Xf as DevtoolsPlugin,
  Jf as ProgressPlugin,
  Zf as default
};
//# sourceMappingURL=livue.esm.js.map
