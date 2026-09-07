import * as Tn from "vue";
import { reactive as Ae, toRefs as Xo, effectScope as Ko, ref as vn, markRaw as Yo, hasInjectionContext as El, inject as Go, isRef as er, isReactive as Zo, toRaw as Sl, getCurrentScope as xl, onScopeDispose as Cl, watch as Me, nextTick as mr, computed as Qo, provide as Tl, onBeforeUnmount as Al, onBeforeMount as kl, onUnmounted as ea, onMounted as ta, readonly as Nl, watchEffect as Ll, shallowRef as _i, defineComponent as Dl, h as Fi, createApp as Ol } from "vue";
const Ml = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function na(e, t) {
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
function bt(e) {
  return JSON.stringify(e, na);
}
function Xr(e) {
  return Ae(Object.assign({}, e));
}
function Il(e, t, n) {
  let r;
  for (r in t)
    if (n && r in n && t[r] !== null && typeof t[r] == "object" && !Array.isArray(t[r]) && e[r] !== null && typeof e[r] == "object" && !Array.isArray(e[r])) {
      let i = n[r], o = t[r], a = e[r], l = Object.assign({}, o);
      for (let s in i)
        bt(i[s]) === bt(o[s]) && s in a && (l[s] = a[s]);
      bt(e[r]) !== bt(l) && (e[r] = l);
    } else {
      let i = bt(e[r]), o = bt(t[r]);
      i !== o && (e[r] = t[r]);
    }
  for (r in e)
    r in t || delete e[r];
}
function ra(e) {
  return JSON.parse(JSON.stringify(e, na));
}
function Rl(e) {
  return Xo(e);
}
function Tr(e, t) {
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
    let c = r[u];
    (l[c] === null || l[c] === void 0) && (l[c] = {}), Array.isArray(l[c]) && u + 1 < r.length && isNaN(Number(r[u + 1])) && (l[c] = Object.assign({}, l[c])), l = l[c];
  }
  let s = r[r.length - 1];
  l[s] = n, e[i] = a;
}
function An(e, t) {
  let n = {}, r = ra(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function Pl(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function Kr(e) {
  if (Pl(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(Kr);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = Kr(e[n]);
    return t;
  }
  return e;
}
function Mt(e) {
  let t = {};
  for (let n in e)
    t[n] = Kr(e[n]);
  return t;
}
let Bi = 0;
function ql() {
  return Bi++, Bi;
}
let ia = /* @__PURE__ */ new Map();
function jl(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function Vl(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function oa(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    ia.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: jl(n)
    });
  });
}
function aa(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = ia.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Vl(n, i.inputs));
  });
}
let la;
const hr = (e) => la = e, sa = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Yr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var tn;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(tn || (tn = {}));
function Wi() {
  const e = Ko(!0), t = e.run(() => vn({}));
  let n = [], r = [];
  const i = Yo({
    install(o) {
      hr(i), i._a = o, o.provide(sa, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const ua = () => {
};
function Ui(e, t, n, r = ua) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && xl() && Cl(i), i;
}
function yt(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const zl = (e) => e(), Ji = /* @__PURE__ */ Symbol(), Ar = /* @__PURE__ */ Symbol();
function Gr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    Yr(i) && Yr(r) && e.hasOwnProperty(n) && !er(r) && !Zo(r) ? e[n] = Gr(i, r) : e[n] = r;
  }
  return e;
}
const Hl = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function $l(e) {
  return !Yr(e) || !Object.prototype.hasOwnProperty.call(e, Hl);
}
const { assign: Ke } = Object;
function Fl(e) {
  return !!(er(e) && e.effect);
}
function Bl(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const c = Xo(n.state.value[e]);
    return Ke(c, o, Object.keys(a || {}).reduce((f, p) => (f[p] = Yo(Qo(() => {
      hr(n);
      const h = n._s.get(e);
      return a[p].call(h, h);
    })), f), {}));
  }
  return s = ca(e, u, t, n, r, !0), s;
}
function ca(e, t, n = {}, r, i, o) {
  let a;
  const l = Ke({ actions: {} }, n), s = { deep: !0 };
  let u, c, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), h;
  const m = r.state.value[e];
  !o && !m && (r.state.value[e] = {}), vn({});
  let v;
  function g(I) {
    let L;
    u = c = !1, typeof I == "function" ? (I(r.state.value[e]), L = {
      type: tn.patchFunction,
      storeId: e,
      events: h
    }) : (Gr(r.state.value[e], I), L = {
      type: tn.patchObject,
      payload: I,
      storeId: e,
      events: h
    });
    const W = v = /* @__PURE__ */ Symbol();
    mr().then(() => {
      v === W && (u = !0);
    }), c = !0, yt(f, L, r.state.value[e]);
  }
  const y = o ? function() {
    const { state: L } = n, W = L ? L() : {};
    this.$patch((R) => {
      Ke(R, W);
    });
  } : (
    /* istanbul ignore next */
    ua
  );
  function A() {
    a.stop(), f.clear(), p.clear(), r._s.delete(e);
  }
  const _ = (I, L = "") => {
    if (Ji in I)
      return I[Ar] = L, I;
    const W = function() {
      hr(r);
      const R = Array.from(arguments), U = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set();
      function K(J) {
        U.add(J);
      }
      function oe(J) {
        Q.add(J);
      }
      yt(p, {
        args: R,
        name: W[Ar],
        store: E,
        after: K,
        onError: oe
      });
      let Y;
      try {
        Y = I.apply(this && this.$id === e ? this : E, R);
      } catch (J) {
        throw yt(Q, J), J;
      }
      return Y instanceof Promise ? Y.then((J) => (yt(U, J), J)).catch((J) => (yt(Q, J), Promise.reject(J))) : (yt(U, Y), Y);
    };
    return W[Ji] = !0, W[Ar] = L, W;
  }, O = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Ui.bind(null, p),
    $patch: g,
    $reset: y,
    $subscribe(I, L = {}) {
      const W = Ui(f, I, L.detached, () => R()), R = a.run(() => Me(() => r.state.value[e], (U) => {
        (L.flush === "sync" ? c : u) && I({
          storeId: e,
          type: tn.direct,
          events: h
        }, U);
      }, Ke({}, s, L)));
      return W;
    },
    $dispose: A
  }, E = Ae(O);
  r._s.set(e, E);
  const z = (r._a && r._a.runWithContext || zl)(() => r._e.run(() => (a = Ko()).run(() => t({ action: _ }))));
  for (const I in z) {
    const L = z[I];
    if (er(L) && !Fl(L) || Zo(L))
      o || (m && $l(L) && (er(L) ? L.value = m[I] : Gr(L, m[I])), r.state.value[e][I] = L);
    else if (typeof L == "function") {
      const W = _(L, I);
      z[I] = W, l.actions[I] = L;
    }
  }
  return Ke(E, z), Ke(Sl(E), z), Object.defineProperty(E, "$state", {
    get: () => r.state.value[e],
    set: (I) => {
      g((L) => {
        Ke(L, I);
      });
    }
  }), r._p.forEach((I) => {
    Ke(E, a.run(() => I({
      store: E,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), m && o && n.hydrate && n.hydrate(E.$state, m), u = !0, c = !0, E;
}
// @__NO_SIDE_EFFECTS__
function Wl(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = El();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Go(sa, null) : null), a && hr(a), a = la, a._s.has(e) || (i ? ca(e, t, r, a) : Bl(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let mn = /* @__PURE__ */ new Map();
function Ul(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function Xt(e, t, n) {
  return Ul(n) === "global" ? t : e + ":" + t;
}
function da(e) {
  return JSON.parse(JSON.stringify(e));
}
function Jl(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(da(t));
}
function wi(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = Xt(e, t, r), a = mn.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ Wl(o, n), definition: n }, mn.set(o, a)), a.useStore(i);
}
function vt(e, t, n, r) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
  let i = n && n.scope ? n.scope : "auto", o = [];
  i === "component" ? o.push(Xt(e, t, { scope: "component" })) : i === "global" ? o.push(Xt(e, t, { scope: "global" })) : (o.push(Xt(e, t, { scope: "component" })), o.push(Xt(e, t, { scope: "global" })));
  for (let a = 0; a < o.length; a++) {
    let l = mn.get(o[a]);
    if (l)
      return l.useStore(r);
  }
  return null;
}
function Xl(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = Mt(o.state || {}), s = vt(e, o.name, { scope: a }, n);
    if (s) {
      Jl(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return da(l);
      }
    }, c = wi(e, o.name, u, { scope: a }, n);
    r[o.name] = c;
  }
  return r;
}
function Kl(e) {
  let t = e + ":", n = Array.from(mn.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && mn.delete(n[r]);
}
let fa = {
  ref: vn,
  computed: Qo,
  watch: Me,
  watchEffect: Ll,
  reactive: Ae,
  readonly: Nl,
  onMounted: ta,
  onUnmounted: ea,
  onBeforeMount: kl,
  onBeforeUnmount: Al,
  nextTick: mr,
  provide: Tl,
  inject: Go
}, Zr = Object.keys(fa), Yl = Zr.map(function(e) {
  return fa[e];
});
function Xi(e) {
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
function Gl(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(v) {
    return t[v];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(v) {
    return a[v];
  });
  function u(v) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(v);
  }
  function c(v, g, y) {
    let A = n && n.$id ? n.$id : "", _ = n && n._pinia ? n._pinia : void 0;
    if (g === void 0) {
      let O = vt(A, v, y || {}, _);
      if (O)
        return O;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return wi(A, v, g, y, _);
  }
  function f(v) {
    let g = n && n.$id ? n.$id : "", y = n && n._pinia ? n._pinia : void 0, A = vt(g, v, { scope: "auto" }, y);
    if (!A)
      throw new Error('[LiVue] useStore("' + v + '"): store not found.');
    return A;
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
  for (let v = 0; v < Zr.length; v++)
    m(Zr[v], Yl[v]);
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
function Zl(e) {
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
const Ki = [
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
function Ql(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function es(e) {
  let t = e.replace(/\$errors\b/g, "lvErrors");
  for (let n = 0; n < Ki.length; n++) {
    let r = Ki[n], i = new RegExp(Ql(r) + "\\b(?=\\s*\\()", "g");
    t = t.replace(i, "livue." + r);
  }
  return t;
}
function Yi(e) {
  return es(Zl(e));
}
function pa(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      pa(e.children[t]);
}
function Gi(e, t, n) {
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
var ts = {
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
}, ns = /^[a-zA-Z][a-zA-Z0-9_]*$/;
function kr(e, t) {
  return typeof e != "string" || ts[e] || !ns.test(e) ? !1 : Array.isArray(t) ? t.indexOf(e) !== -1 : !0;
}
function Qr(e, t, n, r, i, o) {
  let a = Xi(e);
  a.html = Yi(a.html);
  let l;
  try {
    l = Tn.compile(a.html);
  } catch (h) {
    console.error('[LiVue] Template compilation error in "' + (o || "unknown") + '":', h), l = Tn.compile(
      '<div style="padding:8px;border:2px solid #f00;color:#f00;font-family:monospace">[LiVue] Template error: ' + (h.message || "compilation failed") + "</div>"
    );
  }
  let s = _i(l), u = [], c = !1;
  function f(h, m) {
    let v = s.value;
    c = !0;
    let g;
    try {
      g = v(h, u);
    } finally {
      c = !1;
    }
    return pa(g), g;
  }
  f._rc = !0;
  let p = {
    name: o || "LiVueComponent",
    render: f,
    setup: function() {
      Tn.provide("livue", n);
      let h = Rl(t);
      var m = new Proxy(n.errors, {
        get: function(g, y, A) {
          var _ = Reflect.get(g, y, A);
          return Array.isArray(_) ? _[0] : _;
        }
      });
      let v = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: m });
      if (a.setupCode) {
        let g = Gl(a.setupCode, h, n, r);
        g && Object.assign(v, g);
      }
      return new Proxy(v, {
        get: function(g, y, A) {
          if (y in g || typeof y == "symbol") return Reflect.get(g, y, A);
          if (kr(y, n._callableMethods)) {
            var _ = function() {
              var O = Array.prototype.slice.call(arguments);
              if (c) {
                var E = function() {
                  return n.call(y, ...O);
                };
                return Gi(E, y, O);
              }
              return n.call(y, ...O);
            };
            return Gi(_, y);
          }
        },
        getOwnPropertyDescriptor: function(g, y) {
          var A = Object.getOwnPropertyDescriptor(g, y);
          if (A) return A;
          if (kr(y, n._callableMethods))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(g, y) {
          return !!(y in g || kr(y, n._callableMethods));
        },
        set: function(g, y, A) {
          return g[y] = A, !0;
        },
        ownKeys: function(g) {
          return Reflect.ownKeys(g);
        }
      });
    }
  };
  return p._updateRender = function(h) {
    try {
      let m = Xi(h), v = Yi(m.html), g = Tn.compile(v);
      if (g === s.value) return;
      u.length = 0, s.value = g;
    } catch (m) {
      console.error('[LiVue] Template update compilation error in "' + (o || "unknown") + '":', m);
    }
  }, p;
}
let ct = null;
function qt() {
  if (ct)
    return ct;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return ct = e.getAttribute("content"), ct;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (ct = decodeURIComponent(t[1]), ct) : null;
}
function rs() {
  ct = null;
}
let ue = {
  color: "#29d",
  height: "2px",
  showOnRequest: !1,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, fe = null, ei = null, we = null, tr = !1, nn = 0;
function is(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function os(e) {
  return (-1 + e) * 100;
}
function va() {
  if (tr) return;
  tr = !0;
  let e = document.createElement("style");
  e.id = "livue-progress-styles", e.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${ue.height};
            background: ${ue.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${ue.speed}ms ${ue.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${ue.color}, 0 0 5px ${ue.color};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
        }
        .livue-progress-bar.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${ue.speed}ms ${ue.easing};
        }
    `, document.head.appendChild(e);
}
function as() {
  if (we) return;
  va(), we = document.createElement("div"), we.className = "livue-progress-bar livue-progress-hidden", we.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(ue.parent) || document.body).appendChild(we);
}
function ls() {
  if (!tr) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), tr = !1, va());
}
function ss(e) {
  Object.assign(ue, e), ls();
}
function ti() {
  return ue.showOnRequest;
}
function ma() {
  nn++, fe === null && (as(), fe = 0, we && we.classList.remove("livue-progress-hidden"), gr(ue.minimum), ue.trickle && (ei = setInterval(function() {
    ha();
  }, ue.trickleSpeed)));
}
function gr(e) {
  fe !== null && (e = is(e, ue.minimum, 1), fe = e, we && (we.style.transform = "translate3d(" + os(e) + "%, 0, 0)"));
}
function ha() {
  if (fe === null || fe >= 1) return;
  let e;
  fe < 0.2 ? e = 0.1 : fe < 0.5 ? e = 0.04 : fe < 0.8 ? e = 0.02 : fe < 0.99 ? e = 5e-3 : e = 0, gr(fe + e);
}
function Ei() {
  nn = Math.max(0, nn - 1), !(nn > 0) && fe !== null && (gr(1), clearInterval(ei), ei = null, setTimeout(function() {
    we && we.classList.add("livue-progress-hidden"), setTimeout(function() {
      fe = null, we && (we.style.transform = "translate3d(-100%, 0, 0)");
    }, ue.speed);
  }, ue.speed));
}
function us() {
  nn = 0, Ei();
}
function cs() {
  return fe !== null;
}
function ds() {
  return fe;
}
const nr = {
  configure: ss,
  start: ma,
  set: gr,
  trickle: ha,
  done: Ei,
  forceDone: us,
  isStarted: cs,
  getStatus: ds,
  isRequestProgressEnabled: ti
};
var Kt = null, Zi = !1, rt = !1, Se = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0,
  sessionExpiredUrl: null
}, je = /* @__PURE__ */ new Map(), ft = /* @__PURE__ */ new Map(), ni = /* @__PURE__ */ new WeakMap(), $n = /* @__PURE__ */ new Map(), tt = null;
function fs(e) {
  Object.assign(Se, e), e.progressBarColor && nr.configure({ color: e.progressBarColor });
}
function ps(e) {
  Kt = e, !Zi && (Zi = !0, tt = ga(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: tt },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (ba(tt), tt = t.state.pageKey, Sn(t.state.url, !1, !0));
  }), ms());
}
function ga() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function ba(e) {
  if (!(!Se.restoreScroll || !e)) {
    $n.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = $n.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, $n.set(e, i);
      }
    });
  }
}
function vs(e) {
  if (!(!Se.restoreScroll || !e)) {
    var t = $n.get(e);
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
function ms() {
  document.addEventListener("click", hs, !0), Se.prefetch && (document.addEventListener("mouseenter", bs, !0), document.addEventListener("mouseleave", ys, !0), document.addEventListener("mousedown", _s, !0), document.addEventListener("focus", ws, !0));
}
function hs(e) {
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
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), Sn(n, !0, !1));
      }
    }
  }
}
function gs(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function bs(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !Se.prefetchOnHover)) {
      var n = gs(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            br(r);
          }, Se.hoverDelay);
          ni.set(t, i);
        }
      }
    }
  }
}
function ys(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = ni.get(t);
      n && (clearTimeout(n), ni.delete(t));
    }
  }
}
function _s(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || br(n);
    }
  }
}
function ws(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !Se.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || br(n);
    }
  }
}
function br(e) {
  var t = new URL(e, location.origin).href;
  if (ft.has(t))
    return ft.get(t);
  if (je.has(t))
    return Promise.resolve(je.get(t).html);
  var n = fetch(t, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return ft.delete(t), r.ok ? r.text().then(function(i) {
      return Se.cachePages && ya(t, i), i;
    }) : null;
  }).catch(function(r) {
    return ft.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return ft.set(t, n), n;
}
function ya(e, t) {
  if (t.indexOf("data-livue-render-error") === -1) {
    for (var n = new DOMParser(), r = n.parseFromString(t, "text/html"), i = r.querySelector("title"); je.size >= Se.maxCacheSize; ) {
      var o = je.keys().next().value;
      je.delete(o);
    }
    je.set(e, {
      html: t,
      title: i ? i.textContent : "",
      timestamp: Date.now()
    });
  }
}
function Si() {
  je.clear();
}
function xi(e) {
  rt || !e || !e.url || (e.navigate ? (je.clear(), Sn(e.url, !0, !1)) : (rt = !0, window.location.href = e.url));
}
function hn(e) {
  if (!rt) {
    var t = {
      status: e,
      redirectUrl: Se.sessionExpiredUrl || null
    }, n = new CustomEvent("livue:session-expired", {
      detail: t,
      cancelable: !0
    });
    window.dispatchEvent(n) && (rt = !0, t.redirectUrl ? window.location.href = t.redirectUrl : window.location.reload());
  }
}
async function Sn(e, t, n) {
  if (!rt) {
    if (!Kt) {
      window.location.href = e;
      return;
    }
    var r = new URL(e, location.origin).href, i = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: je.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(i)) {
      rt = !0, n || ba(tt), Se.showProgressBar && nr.start();
      try {
        var o, a = je.get(r);
        if (a)
          o = a.html;
        else if (ft.has(r))
          o = await ft.get(r);
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
          o = await l.text(), Se.cachePages && ya(r, o);
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
        var f = Es(), p = /* @__PURE__ */ new Set();
        f.forEach(function(y) {
          y.livueIds.forEach(function(A) {
            p.add(A);
          });
        }), Kt._stopObserver(), Kt.destroyExcept(p), f.forEach(function(y) {
          y.element.parentNode && y.element.parentNode.removeChild(y.element);
        });
        var h = u.querySelector("title");
        h && (document.title = h.textContent), document.body.innerHTML = u.body.innerHTML, Ss(f);
        var m = u.querySelector('meta[name="csrf-token"]'), v = document.querySelector('meta[name="csrf-token"]');
        if (m && v && (v.setAttribute("content", m.getAttribute("content")), rs()), Cs(u), xs(u), Ts(u), t && (tt = ga(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: tt },
          "",
          r
        )), As(u), Kt.rebootPreserving(), n)
          vs(tt);
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
        rt = !1, Se.showProgressBar && nr.done();
      }
    }
  }
}
function Es() {
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
function Ss(e) {
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
function xs(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Cs(e) {
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
function Ts(e) {
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
function As(e) {
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
function ks() {
  return rt;
}
var St = /* @__PURE__ */ new Map(), Ns = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Ne(e, t) {
  return typeof e != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", e), function() {
  }) : typeof t != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (St.has(e) || St.set(e, /* @__PURE__ */ new Set()), St.get(e).add(t), function() {
    var n = St.get(e);
    n && (n.delete(t), n.size === 0 && St.delete(e));
  });
}
function Ee(e, t) {
  var n = St.get(e);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(t);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + e + '" callback:', i);
    }
  });
}
function _a() {
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
function wa() {
  return Ns.slice();
}
let Ci = !1, xt = null, Qi = !1, rn = null;
function Ls(e) {
  e && typeof e.enabled == "boolean" && (Ci = e.enabled);
}
function Ds() {
  return Ci;
}
function Os() {
  if (Qi || typeof document > "u")
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
    `, document.head.appendChild(e), Qi = !0;
}
function Ea(e, t, n) {
  if (typeof document > "u")
    return;
  Os(), Yt();
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
  u.type = "button", u.className = "livue-error-overlay__close", u.textContent = "Close", u.addEventListener("click", Yt), l.appendChild(u), i.appendChild(l), r.appendChild(i);
  const c = document.createElement("iframe");
  c.className = "livue-error-overlay__frame", c.setAttribute("srcdoc", e), c.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups"), r.appendChild(c), r.addEventListener("click", function(f) {
    f.target === r && Yt();
  }), rn = function(f) {
    f.key === "Escape" && Yt();
  }, document.addEventListener("keydown", rn), document.body.appendChild(r), xt = r;
}
function Yt() {
  rn && (document.removeEventListener("keydown", rn), rn = null), xt && xt.parentNode && xt.parentNode.removeChild(xt), xt = null;
}
async function Ti(e, t) {
  if (!Ci || !e || e.ok || e.status < 500 || (e.headers.get("content-type") || "").indexOf("text/html") === -1)
    return !1;
  let r;
  try {
    r = await e.text();
  } catch {
    return !1;
  }
  return Ea(r, e.status, t), !0;
}
const Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  close: Yt,
  configure: Ls,
  isEnabled: Ds,
  maybeShowFromResponse: Ti,
  show: Ea
}, Symbol.toStringTag, { value: "Module" }));
var ri = [], ii = [], gn = !1;
function Sa(e) {
  return e.isolate ? Rs(e) : new Promise(function(t, n) {
    ri.push({
      payload: e,
      resolve: t,
      reject: n
    }), gn || (gn = !0, queueMicrotask(xa));
  });
}
function Is(e) {
  return new Promise(function(t, n) {
    ii.push({
      payload: e,
      resolve: t,
      reject: n
    }), gn || (gn = !0, queueMicrotask(xa));
  });
}
async function xa() {
  var e = ri, t = ii;
  if (ri = [], ii = [], gn = !1, !(e.length === 0 && t.length === 0)) {
    var n = Ca(), r = qt(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = e.map(function(y) {
      return y.payload;
    }), a = t.map(function(y) {
      return y.payload;
    }), l = {};
    o.length > 0 && (l.updates = o), a.length > 0 && (l.lazyLoads = a), Ee("request.started", {
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
      if (s.status === 419 || s.status === 401) {
        hn(s.status);
        return;
      }
      if (await Ti(s, n)) {
        var u = new Error("LiVue debug overlay: server returned HTML error page");
        u.status = s.status, u.overlay = !0;
        for (var c = 0; c < e.length; c++)
          e[c].reject(u);
        for (var c = 0; c < t.length; c++)
          t[c].reject(u);
        Ee("request.finished", {
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
          xi(h[c].redirect);
          return;
        }
      for (var c = 0; c < h.length; c++)
        if (h[c] && h[c].status === 401) {
          hn(401);
          return;
        }
      Si();
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
      Ee("request.finished", {
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
      Ee("request.finished", {
        url: n,
        success: !1,
        error: y,
        updateCount: e.length,
        lazyCount: t.length
      });
    }
  }
}
async function Rs(e) {
  var t = Ca(), n = qt(), r = {
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
  if (o.status === 419 || o.status === 401)
    return hn(o.status), new Promise(function() {
    });
  if (await Ti(o, t)) {
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
    return xi(u.redirect), new Promise(function() {
    });
  if (u.status === 401)
    return hn(401), new Promise(function() {
    });
  if (Si(), u.error) {
    var c = new Error(u.error);
    throw c.status = u.status || 500, c.data = u, c;
  }
  if (u.errors) {
    var c = new Error("Validation failed");
    throw c.status = 422, c.data = u, c;
  }
  return u;
}
function Ca() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function Nr(e, t, n, r, i) {
  return Sa({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
async function Ps(e, t, n, r) {
  return Sa({
    snapshot: e,
    diffs: n || {},
    calls: t,
    isolate: r || !1
  });
}
let oi = null, Ta = /* @__PURE__ */ new Map();
function qs() {
  return Ae({});
}
function Le(e, t) {
  ai(e);
  for (let n in t)
    e[n] = t[n];
}
function ai(e) {
  for (let t in e)
    delete e[t];
}
function js(e) {
  oi = e;
}
function _t(e, t, n, r) {
  r = r || {};
  let i = !1;
  return Ee("error.occurred", {
    error: e,
    componentName: t,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : (oi ? oi(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function Vs(e, t) {
  typeof t == "function" && Ta.set(e, t);
}
function li(e) {
  Ta.delete(e);
}
var Ze = null, zs = "livue-devtools-styles", Hs = `
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
function $s() {
  Ze || (Ze = document.createElement("style"), Ze.id = zs, Ze.textContent = Hs, document.head.appendChild(Ze));
}
function Fs() {
  Ze && (Ze.remove(), Ze = null);
}
var Ai = [];
function N(e, t, n) {
  Ai.push({
    name: e,
    directive: t
  });
}
function Bs() {
  return Ai;
}
function Ws() {
  return {
    plugins: [],
    stores: [],
    components: [],
    directives: Ai.map(function(e) {
      return { name: e.name, filters: null };
    })
  };
}
const $e = /* @__PURE__ */ new Map(), We = /* @__PURE__ */ new Map();
let eo = !1;
function gt() {
  return typeof window < "u" && window.Echo;
}
function Us(e, t) {
  if (!gt())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = t + ":" + e;
  if ($e.has(n))
    return $e.get(n);
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
  return $e.set(n, r), r;
}
function Aa(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!gt())
    return eo || (eo = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: c, isCustomEvent: f } = o, p = Us(a, l);
    if (!p) continue;
    const h = l + ":" + a + ":" + s + ":" + e;
    if (We.has(h)) {
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
      Js(p, s, m);
    else {
      const v = f ? "." + s : s;
      p.listen(v, m);
    }
    We.set(h, {
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
      ka(r[i]);
  };
}
function Js(e, t, n) {
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
function ka(e) {
  const t = We.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    We.delete(e), Xs(t.channelKey);
  }
}
function to(e) {
  const t = ":" + e, n = [];
  We.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    ka(n[r]);
}
function Na(e, t) {
  e === "presence" ? window.Echo.leave(t) : e === "private" ? window.Echo.leaveChannel("private-" + t) : window.Echo.leaveChannel(t);
}
function Xs(e) {
  let t = !1;
  if (We.forEach(function(r) {
    r.channelKey === e && (t = !0);
  }), t) return;
  if ($e.get(e) && gt()) {
    const r = e.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      Na(i, o);
    } catch {
    }
  }
  $e.delete(e);
}
function no() {
  We.clear(), $e.forEach(function(e, t) {
    if (gt()) {
      const n = t.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        Na(r, i);
      } catch {
      }
    }
  }), $e.clear();
}
function Ks() {
  return {
    echoAvailable: gt(),
    channels: Array.from($e.keys()),
    subscriptions: Array.from(We.keys())
  };
}
function Ys() {
  var e = [], t = [];
  return $e.forEach(function(n, r) {
    var i = r.split(":");
    e.push({
      key: r,
      type: i[0],
      name: i.slice(1).join(":")
    });
  }), We.forEach(function(n, r) {
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
    available: gt(),
    channels: e,
    subscriptions: t
  };
}
var ro = 100, Gs = 200, Zs = 50, D = {
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
}, Pe = [], It = !1, si = /* @__PURE__ */ new Set();
function De() {
  si.forEach(function(e) {
    try {
      e();
    } catch (t) {
      console.error("[LiVue DevTools] Listener error:", t);
    }
  });
}
var Qs = 0;
function eu() {
  return "req-" + ++Qs + "-" + Date.now();
}
function tu(e) {
  var t = new Date(e), n = t.getHours().toString().padStart(2, "0"), r = t.getMinutes().toString().padStart(2, "0"), i = t.getSeconds().toString().padStart(2, "0"), o = t.getMilliseconds().toString().padStart(3, "0");
  return n + ":" + r + ":" + i + "." + o;
}
function La() {
  It || (It = !0, Pe.push(Ne("component.init", function(e) {
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
    }), De();
  })), Pe.push(Ne("component.destroy", function(e) {
    var t = e.component;
    D.components.delete(t.id), D.componentBenchmarkStats.delete(t.id), De();
  })), Pe.push(Ne("request.started", function(e) {
    var t = eu(), n = {
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
    D.pendingRequests.set(e.url + "-" + t, n), D.requests.unshift(n), D.requests.length > ro && D.requests.pop(), D.perf.totalRequests++, De();
  })), Pe.push(Ne("request.finished", function(e) {
    var t = null;
    if (D.pendingRequests.forEach(function(r, i) {
      !t && r.url === e.url && r.status === "pending" && (t = { req: r, key: i });
    }), t) {
      var n = t.req;
      n.endTime = Date.now(), n.duration = n.endTime - n.startTime, n.status = e.success ? "success" : "error", n.responses = e.responses, n.lazyResponses = e.lazyResponses, n.error = e.error, D.pendingRequests.delete(t.key), e.success ? D.perf.successfulRequests++ : D.perf.failedRequests++, D.perf.totalRequestTime += n.duration, D.perf.avgRequestTime = D.perf.totalRequestTime / D.perf.totalRequests, n.duration < D.perf.minRequestTime && (D.perf.minRequestTime = n.duration), n.duration > D.perf.maxRequestTime && (D.perf.maxRequestTime = n.duration), De();
    }
  })), Pe.push(Ne("template.updating", function(e) {
    var t = e.component;
    D.pendingSwaps.set(t.id, Date.now());
  })), Pe.push(Ne("template.updated", function(e) {
    var t = e.component, n = D.pendingSwaps.get(t.id);
    if (n) {
      var r = Date.now() - n;
      D.pendingSwaps.delete(t.id), D.perf.totalTemplateSwaps++, D.perf.totalTemplateSwapTime += r, D.perf.avgTemplateSwapTime = D.perf.totalTemplateSwapTime / D.perf.totalTemplateSwaps, De();
    }
  })), Pe.push(Ne("benchmark.received", function(e) {
    var t = Date.now(), n = {
      time: t,
      componentId: e.componentId,
      componentName: e.componentName,
      timings: e.timings
    };
    D.serverBenchmarks.unshift(n), D.serverBenchmarks.length > ro && D.serverBenchmarks.pop();
    var r = e.componentId, i = D.componentBenchmarkStats.get(r);
    i || (i = { count: 0, averages: {}, latest: null }, D.componentBenchmarkStats.set(r, i)), i.count++, i.latest = { time: t, timings: e.timings };
    for (var o in e.timings) {
      var a = e.timings[o], l = i.averages[o] || 0;
      i.averages[o] = l + (a - l) / i.count;
    }
    De();
  })), Pe.push(Ne("error.occurred", function(e) {
    var t = {
      time: Date.now(),
      error: e.error,
      componentName: e.componentName,
      componentId: e.componentId,
      context: e.context
    };
    D.errors.unshift(t), D.errors.length > Zs && D.errors.pop(), De();
  })));
}
function Da() {
  It && (It = !1, Pe.forEach(function(e) {
    e();
  }), Pe = []);
}
function nu() {
  return It;
}
function ru(e) {
  if (It) {
    var t = {
      time: Date.now(),
      name: e.name,
      data: e.data,
      mode: e.mode,
      source: e.source,
      sourceId: e.sourceId,
      target: e.target
    };
    D.events.unshift(t), D.events.length > Gs && D.events.pop(), De();
  }
}
function iu() {
  return Array.from(D.components.values());
}
function Oa() {
  return D.requests;
}
function Ma() {
  return D.events;
}
function Ia() {
  return Object.assign({}, D.perf);
}
function ou() {
  return D.serverBenchmarks;
}
function au(e) {
  return D.componentBenchmarkStats.get(e) || null;
}
function Ra() {
  D.requests = [], D.pendingRequests.clear(), De();
}
function Pa() {
  D.events = [], De();
}
function lu() {
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
  }, D.pendingSwaps.clear(), D.serverBenchmarks = [], D.componentBenchmarkStats.clear(), De();
}
function su(e) {
  return si.add(e), function() {
    si.delete(e);
  };
}
function ki(e) {
  return tu(e);
}
function uu(e) {
  var t = D.components.get(e);
  if (!t || !t.livue || !t.livue._getDevToolsInfo)
    return null;
  try {
    return t.livue._getDevToolsInfo();
  } catch (n) {
    return console.error("[LiVue DevTools] Error getting component info:", n), null;
  }
}
function cu() {
  return Ws();
}
function du() {
  return Ys();
}
var ui = null, io = null, ci = null;
function fu(e) {
  ui = e;
}
function pu(e) {
  ci = e;
}
function qa() {
  if (!ui)
    return [];
  var e = ui.all(), t = [];
  return e.forEach(function(n) {
    var r = ja(n, !1);
    t.push(r);
  }), t;
}
function ja(e, t) {
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
      l.children.push(ja(u, !0));
    }
  return l;
}
function Va(e) {
  var t = qa();
  if (e.innerHTML = "", t.length === 0) {
    e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E6;</div>No components found</div>';
    return;
  }
  t.forEach(function(n) {
    e.appendChild(za(n));
  });
}
function za(e, t) {
  var n = document.createElement("div");
  n.className = "livue-devtools__node", n.dataset.id = e.id;
  var r = e.children && e.children.length > 0, i = document.createElement("div");
  i.className = "livue-devtools__node-header", e.id === io && i.classList.add("livue-devtools__node-header--selected");
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
    io = e.id;
    var y = document.querySelectorAll(".livue-devtools__node-header");
    y.forEach(function(A) {
      A.classList.remove("livue-devtools__node-header--selected");
    }), i.classList.add("livue-devtools__node-header--selected"), ci && ci(e);
  }), n.appendChild(i), r) {
    var h = document.createElement("div");
    h.className = "livue-devtools__node-children", e.children.forEach(function(m) {
      h.appendChild(za(m));
    }), n.appendChild(h);
  }
  return n;
}
var pt = null, Vt = "state", He = /* @__PURE__ */ new Set(), bn = null;
function vu(e) {
  pt = e;
}
function yr(e) {
  if (bn = e, e.innerHTML = "", !pt) {
    e.innerHTML = '<div class="livue-devtools__state-empty">Select a component to inspect its state</div>';
    return;
  }
  var t = pt.state, n = pt.livue, r = n ? n.dirtyFields : /* @__PURE__ */ new Set(), i = uu(pt.id), o = document.createElement("div");
  o.className = "livue-devtools__state-title", o.textContent = "<" + pt.name + ">", e.appendChild(o);
  var a = document.createElement("div");
  a.style.cssText = "display: flex; gap: 4px; margin-bottom: 8px;", ["state", "diff", "info"].forEach(function(l) {
    var s = document.createElement("button");
    s.style.cssText = "padding: 2px 8px; font-size: 10px; background: " + (Vt === l ? "#007acc" : "#3c3c3c") + "; border: none; color: #fff; border-radius: 3px; cursor: pointer;", s.textContent = l.charAt(0).toUpperCase() + l.slice(1), s.addEventListener("click", function() {
      Vt = l, yr(e);
    }), a.appendChild(s);
  }), e.appendChild(a), Vt === "state" ? mu(e, t, r, n) : Vt === "diff" ? hu(e, i) : Vt === "info" && gu(e, i);
}
function mu(e, t, n, r) {
  if (t && typeof t == "object") {
    var i = Object.keys(t);
    if (i.length === 0) {
      var o = document.createElement("div");
      o.className = "livue-devtools__state-empty", o.textContent = "No state properties", e.appendChild(o);
    } else
      i.forEach(function(l) {
        var s = n.has(l);
        e.appendChild(Ni(l, t[l], s, l));
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
function hu(e, t) {
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
function gu(e, t) {
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
          var A = document.createElement("span");
          A.className = "livue-devtools__prop-key", A.textContent = g, y.appendChild(A);
          var _ = document.createElement("span");
          _.className = "livue-devtools__prop-colon", _.textContent = ": ", y.appendChild(_), y.appendChild(Ha(c.data[g], "composable." + u + "." + g)), e.appendChild(y);
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
function Ni(e, t, n, r) {
  var i = document.createElement("div");
  i.className = "livue-devtools__prop";
  var o = document.createElement("span");
  o.className = "livue-devtools__prop-key", n && o.classList.add("livue-devtools__prop-key--dirty"), o.textContent = e, i.appendChild(o);
  var a = document.createElement("span");
  return a.className = "livue-devtools__prop-colon", a.textContent = ": ", i.appendChild(a), i.appendChild(Ha(t, r)), i;
}
function Ha(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value", e === null)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "null";
  else if (e === void 0)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "undefined";
  else if (typeof e == "string")
    n.classList.add("livue-devtools__prop-value--string"), n.textContent = '"' + _u(e, 50) + '"', n.title = e;
  else if (typeof e == "number")
    n.classList.add("livue-devtools__prop-value--number"), n.textContent = String(e);
  else if (typeof e == "boolean")
    n.classList.add("livue-devtools__prop-value--boolean"), n.textContent = String(e);
  else {
    if (Array.isArray(e))
      return bu(e, t);
    if (typeof e == "object")
      return yu(e, t);
    typeof e == "function" ? (n.classList.add("livue-devtools__prop-value--null"), n.textContent = "function()") : n.textContent = String(e);
  }
  return n;
}
function bu(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value livue-devtools__prop-value--array", e.length === 0)
    return n.textContent = "[]", n;
  var r = He.has(t), i = document.createElement("span");
  i.className = "livue-devtools__object-toggle", i.textContent = r ? "▼ " : "▶ ", i.addEventListener("click", function() {
    He.has(t) ? He.delete(t) : He.add(t), bn && yr(bn);
  }), n.appendChild(i);
  var o = document.createElement("span");
  if (o.textContent = "Array(" + e.length + ")", n.appendChild(o), r) {
    var a = document.createElement("div");
    a.className = "livue-devtools__object", e.forEach(function(l, s) {
      a.appendChild(Ni(String(s), l, !1, t + "." + s));
    }), n.appendChild(a);
  }
  return n;
}
function yu(e, t) {
  var n = document.createElement("span");
  n.className = "livue-devtools__prop-value livue-devtools__prop-value--object";
  var r = Object.keys(e);
  if (r.length === 0)
    return n.textContent = "{}", n;
  var i = He.has(t), o = document.createElement("span");
  o.className = "livue-devtools__object-toggle", o.textContent = i ? "▼ " : "▶ ", o.addEventListener("click", function() {
    He.has(t) ? He.delete(t) : He.add(t), bn && yr(bn);
  }), n.appendChild(o);
  var a = document.createElement("span");
  if (a.textContent = "{...} " + r.length + " key" + (r.length > 1 ? "s" : ""), n.appendChild(a), i) {
    var l = document.createElement("div");
    l.className = "livue-devtools__object", r.forEach(function(s) {
      l.appendChild(Ni(s, e[s], !1, t + "." + s));
    }), n.appendChild(l);
  }
  return n;
}
function _u(e, t) {
  return e.length <= t ? e : e.substring(0, t - 3) + "...";
}
function wu() {
  pt = null, He.clear();
}
var Ct = /* @__PURE__ */ new Set();
function $a(e) {
  e.innerHTML = "";
  var t = Oa(), n = document.createElement("div");
  n.className = "livue-devtools__timeline-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__timeline-title", r.textContent = "Request Timeline (" + t.length + ")", n.appendChild(r);
  var i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = "Clear", i.addEventListener("click", function() {
    Ra(), Ct.clear(), $a(e);
  }), n.appendChild(i), e.appendChild(n);
  var o = document.createElement("div");
  o.className = "livue-devtools__timeline-list", t.length === 0 ? o.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E1;</div>No requests yet</div>' : t.forEach(function(a) {
    o.appendChild(Eu(a));
  }), e.appendChild(o);
}
function Eu(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__request", Ct.has(e.id) && t.classList.add("livue-devtools__request--expanded");
  var n = document.createElement("div");
  n.className = "livue-devtools__request-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__request-toggle", r.textContent = Ct.has(e.id) ? "▼" : "▶", n.appendChild(r);
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
  s.className = "livue-devtools__request-time", s.textContent = ki(e.startTime), n.appendChild(s), n.addEventListener("click", function() {
    Ct.has(e.id) ? (Ct.delete(e.id), t.classList.remove("livue-devtools__request--expanded"), r.textContent = "▶") : (Ct.add(e.id), t.classList.add("livue-devtools__request--expanded"), r.textContent = "▼");
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
    g.className = "livue-devtools__request-json", g.textContent = Su(e.updates), m.appendChild(g), u.appendChild(m);
  }
  if (e.responses) {
    var y = document.createElement("div");
    y.className = "livue-devtools__request-section";
    var A = document.createElement("div");
    A.className = "livue-devtools__request-section-title", A.textContent = "Response", y.appendChild(A);
    var _ = document.createElement("pre");
    _.className = "livue-devtools__request-json", _.textContent = xu(e.responses), y.appendChild(_), u.appendChild(y);
  }
  if (e.error) {
    var O = document.createElement("div");
    O.className = "livue-devtools__request-section";
    var E = document.createElement("div");
    E.className = "livue-devtools__request-section-title", E.style.color = "#f48771", E.textContent = "Error", O.appendChild(E);
    var M = document.createElement("pre");
    M.className = "livue-devtools__request-json", M.style.color = "#f48771", M.textContent = e.error.message || String(e.error), O.appendChild(M), u.appendChild(O);
  }
  return t.appendChild(u), t;
}
function Su(e) {
  var t = e.map(function(n) {
    var r = {};
    return n.method && (r.method = n.method), n.params && n.params.length > 0 && (r.params = n.params), n.diffs && Object.keys(n.diffs).length > 0 && (r.diffs = n.diffs), r;
  });
  return JSON.stringify(t, null, 2);
}
function xu(e) {
  var t = e.map(function(n) {
    if (!n) return null;
    var r = {};
    return n.snapshot && (r.snapshotSize = n.snapshot.length + " bytes"), n.html && (r.htmlSize = n.html.length + " bytes"), n.events && n.events.length > 0 && (r.events = n.events.map(function(i) {
      return i.name;
    })), n.jsonResult !== void 0 && (r.jsonResult = n.jsonResult), n.redirect && (r.redirect = n.redirect), n.download && (r.download = n.download.name), r;
  });
  return JSON.stringify(t, null, 2);
}
var on = "";
function Fa(e) {
  e.innerHTML = "";
  var t = document.createElement("div");
  t.className = "livue-devtools__events-header";
  var n = document.createElement("input");
  n.className = "livue-devtools__events-filter", n.type = "text", n.placeholder = "Filter events...", n.value = on, n.addEventListener("input", function(o) {
    on = o.target.value.toLowerCase(), oo(e.querySelector(".livue-devtools__events-list"));
  }), t.appendChild(n);
  var r = document.createElement("button");
  r.className = "livue-devtools__btn", r.textContent = "Clear", r.addEventListener("click", function() {
    Pa(), on = "", n.value = "", Fa(e);
  }), t.appendChild(r), e.appendChild(t);
  var i = document.createElement("div");
  i.className = "livue-devtools__events-list", oo(i), e.appendChild(i);
}
function oo(e) {
  if (e) {
    e.innerHTML = "";
    var t = Ma(), n = t;
    if (on && (n = t.filter(function(r) {
      var i = (r.name + " " + r.source + " " + JSON.stringify(r.data)).toLowerCase();
      return i.indexOf(on) !== -1;
    })), n.length === 0) {
      t.length === 0 ? e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E8;</div>No events yet</div>' : e.innerHTML = '<div class="livue-devtools__empty">No events match filter</div>';
      return;
    }
    n.forEach(function(r) {
      e.appendChild(Cu(r));
    });
  }
}
function Cu(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__event";
  var n = document.createElement("span");
  n.className = "livue-devtools__event-time", n.textContent = ki(e.time), t.appendChild(n);
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
    a.className = "livue-devtools__event-data", a.textContent = Tu(e.data), a.title = JSON.stringify(e.data, null, 2), t.appendChild(a);
  }
  return t;
}
function Tu(e) {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  var t = JSON.stringify(e);
  return t.length > 80 ? t.substring(0, 77) + "..." : t;
}
var Ba = "livue-devtools-state", $ = null, Fe = "components", mt = "state", Li = null, qe = !1, Wa = !1, it = "right";
function Ua() {
  try {
    var e = localStorage.getItem(Ba);
    if (e) {
      var t = JSON.parse(e);
      Fe = t.activeTab || "components", mt = t.activeSubTab || "state", qe = t.minimized || !1, Wa = t.isOpen || !1, it = t.position || "right";
    }
  } catch {
  }
}
function jt() {
  try {
    localStorage.setItem(Ba, JSON.stringify({
      isOpen: $ !== null,
      activeTab: Fe,
      activeSubTab: mt,
      minimized: qe,
      position: it
    }));
  } catch {
  }
}
function Au() {
  return Ua(), Wa;
}
var Fn = null, an = null, Bn = null;
function ku(e) {
  fu(e);
}
function Nu() {
  return $ !== null;
}
function Di() {
  $ || (Ua(), $s(), La(), Lu(), Vu(), zu(), jt());
}
function Oi() {
  $ && (an && (document.removeEventListener("keydown", an), an = null), Fn && (clearInterval(Fn), Fn = null), Bn && (Bn(), Bn = null), $.remove(), $ = null, Li = null, Fs(), Da(), wu(), jt());
}
function Ja() {
  $ ? Oi() : Di();
}
function Xa() {
  switch (it) {
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
function Lu() {
  $ = document.createElement("div"), $.className = "livue-devtools livue-devtools--" + it, qe && $.classList.add("livue-devtools--minimized");
  var e = document.createElement("div");
  e.className = "livue-devtools__header";
  var t = document.createElement("div");
  t.className = "livue-devtools__title", t.innerHTML = '<span class="livue-devtools__title-icon">&#x2699;</span> LiVue DevTools', e.appendChild(t);
  var n = document.createElement("div");
  n.className = "livue-devtools__actions";
  var r = Xa(), i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = qe ? r.minimized : r.expanded, i.title = "Minimize", i.addEventListener("click", function() {
    qe = !qe, $.classList.toggle("livue-devtools--minimized", qe), i.textContent = qe ? r.minimized : r.expanded, jt();
  }), n.appendChild(i);
  var o = document.createElement("button");
  o.className = "livue-devtools__btn", o.textContent = "×", o.title = "Close (Ctrl+Shift+L)", o.addEventListener("click", Oi), n.appendChild(o), e.appendChild(n), $.appendChild(e);
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
    v.className = "livue-devtools__tab", m.id === Fe && v.classList.add("livue-devtools__tab--active"), v.textContent = m.label, v.addEventListener("click", function() {
      Du(m.id);
    }), a.appendChild(v);
  }), $.appendChild(a);
  var s = document.createElement("div");
  s.className = "livue-devtools__content";
  var u = document.createElement("div");
  u.className = "livue-devtools__panel livue-devtools__panel--components", u.dataset.tab = "components", Fe === "components" && u.classList.add("livue-devtools__panel--active");
  var c = document.createElement("div");
  c.className = "livue-devtools__tree", u.appendChild(c);
  var f = document.createElement("div");
  f.className = "livue-devtools__right-pane";
  var p = document.createElement("div");
  p.className = "livue-devtools__sub-tabs", [{ id: "state", label: "State" }, { id: "benchmark", label: "Benchmark" }].forEach(function(m) {
    var v = document.createElement("button");
    v.className = "livue-devtools__sub-tab", m.id === mt && v.classList.add("livue-devtools__sub-tab--active"), v.textContent = m.label, v.addEventListener("click", function() {
      Ou(m.id);
    }), p.appendChild(v);
  }), f.appendChild(p);
  var h = document.createElement("div");
  h.className = "livue-devtools__sub-content", ["state", "benchmark"].forEach(function(m) {
    var v = document.createElement("div");
    v.className = "livue-devtools__panel", v.dataset.subtab = m, m === mt && v.classList.add("livue-devtools__panel--active"), h.appendChild(v);
  }), f.appendChild(h), u.appendChild(f), s.appendChild(u), ["timeline", "events", "stores", "echo", "perf", "settings"].forEach(function(m) {
    var v = document.createElement("div");
    v.className = "livue-devtools__panel", v.dataset.tab = m, m === Fe && v.classList.add("livue-devtools__panel--active"), s.appendChild(v);
  }), $.appendChild(s), document.body.appendChild($), pu(function(m) {
    Li = m, vu(m), _r();
  }), rr(), Bn = su(function() {
    rr();
  });
}
function Du(e) {
  if (e !== Fe) {
    Fe = e;
    var t = $.querySelectorAll(".livue-devtools__tab"), n = ["components", "timeline", "events", "stores", "echo", "perf", "settings"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__tab--active", n[o] === e);
    });
    var r = $.querySelectorAll(".livue-devtools__panel[data-tab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.tab === e);
    }), rr(), jt();
  }
}
function Ou(e) {
  if (e !== mt) {
    mt = e;
    var t = $.querySelectorAll(".livue-devtools__sub-tab"), n = ["state", "benchmark"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__sub-tab--active", n[o] === e);
    });
    var r = $.querySelectorAll(".livue-devtools__panel[data-subtab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.subtab === e);
    }), _r(), jt();
  }
}
function _r() {
  if ($)
    if (mt === "state") {
      var e = $.querySelector('.livue-devtools__panel[data-subtab="state"]');
      e && yr(e);
    } else {
      var t = $.querySelector('.livue-devtools__panel[data-subtab="benchmark"]');
      t && Mu(t, Li);
    }
}
function rr() {
  if ($)
    switch (Fe) {
      case "components":
        var e = $.querySelector(".livue-devtools__tree");
        e && Va(e), _r();
        break;
      case "timeline":
        var t = $.querySelector('.livue-devtools__panel[data-tab="timeline"]');
        t && $a(t);
        break;
      case "events":
        var n = $.querySelector('.livue-devtools__panel[data-tab="events"]');
        n && Fa(n);
        break;
      case "stores":
        var r = $.querySelector('.livue-devtools__panel[data-tab="stores"]');
        r && Iu(r);
        break;
      case "echo":
        var i = $.querySelector('.livue-devtools__panel[data-tab="echo"]');
        i && Ru(i);
        break;
      case "perf":
        var o = $.querySelector('.livue-devtools__panel[data-tab="perf"]');
        o && Pu(o);
        break;
      case "settings":
        var a = $.querySelector('.livue-devtools__panel[data-tab="settings"]');
        a && qu(a);
        break;
    }
}
function Mu(e, t) {
  e.innerHTML = "";
  var n = ou();
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
  var o = n.filter(function(R) {
    return R.componentId === t.id;
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
  c.style.cssText = "color: #858585; font-size: 11px; margin-bottom: 6px;", c.textContent = ki(l.time), s.appendChild(c);
  var f = ["mount", "method_call", "render", "total"];
  for (var p in l.timings) {
    var h = l.timings[p], m = h / 1e3, v = f.indexOf(p) !== -1, g = v ? 50 : 5, y = v ? 200 : 20, A = m < g ? "good" : m < y ? "warn" : "bad";
    s.appendChild(ye(p, ao(h), A));
  }
  e.appendChild(s);
  var _ = au(t.id);
  if (_ && _.count > 1) {
    var O = document.createElement("div");
    O.className = "livue-devtools__perf-section";
    var E = document.createElement("div");
    E.className = "livue-devtools__perf-title", E.textContent = "Session Average (" + _.count + " requests)", O.appendChild(E);
    for (var M in _.averages) {
      var z = Math.round(_.averages[M]), I = z / 1e3, L = f.indexOf(M) !== -1, W = I < (L ? 50 : 5) ? "good" : I < (L ? 200 : 20) ? "warn" : "bad";
      O.appendChild(ye(M, ao(z), W));
    }
    e.appendChild(O);
  }
}
function Iu(e) {
  e.innerHTML = "";
  var t = cu(), n = t.stores, r = document.createElement("div");
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
function Ru(e) {
  e.innerHTML = "";
  var t = du(), n = document.createElement("div");
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
function Pu(e) {
  e.innerHTML = "";
  var t = Ia(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-title", r.textContent = "AJAX Requests", n.appendChild(r), n.appendChild(ye("Total Requests", t.totalRequests)), n.appendChild(ye("Successful", t.successfulRequests, "good")), n.appendChild(ye("Failed", t.failedRequests, t.failedRequests > 0 ? "bad" : null)), e.appendChild(n);
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-section";
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-title", o.textContent = "Request Timing", i.appendChild(o);
  var a = t.avgRequestTime < 100 ? "good" : t.avgRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ye("Average", kn(t.avgRequestTime), a));
  var l = t.minRequestTime < 100 ? "good" : t.minRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ye("Fastest", t.minRequestTime === 1 / 0 ? "-" : kn(t.minRequestTime), l));
  var s = t.maxRequestTime < 100 ? "good" : t.maxRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ye("Slowest", t.maxRequestTime === 0 ? "-" : kn(t.maxRequestTime), s)), e.appendChild(i);
  var u = document.createElement("div");
  u.className = "livue-devtools__perf-section";
  var c = document.createElement("div");
  c.className = "livue-devtools__perf-title", c.textContent = "Template Swaps", u.appendChild(c), u.appendChild(ye("Total Swaps", t.totalTemplateSwaps));
  var f = t.avgTemplateSwapTime < 5 ? "good" : t.avgTemplateSwapTime < 20 ? "warn" : "bad";
  u.appendChild(ye("Average Time", kn(t.avgTemplateSwapTime), f)), e.appendChild(u);
  var p = document.createElement("div");
  p.className = "livue-devtools__perf-section";
  var h = document.createElement("div");
  h.className = "livue-devtools__perf-title", h.textContent = "Components", p.appendChild(h);
  var m = iu(), v = m.filter(function(y) {
    return !y.isChild;
  }), g = m.filter(function(y) {
    return y.isChild;
  });
  p.appendChild(ye("Root Components", v.length)), p.appendChild(ye("Child Components", g.length)), p.appendChild(ye("Total", m.length)), e.appendChild(p);
}
function qu(e) {
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
    f.className = "livue-devtools__settings-btn", it === c.id && f.classList.add("livue-devtools__settings-btn--active");
    var p = document.createElement("span");
    p.className = "livue-devtools__settings-btn-icon", p.textContent = c.icon, f.appendChild(p);
    var h = document.createElement("span");
    h.textContent = c.label, f.appendChild(h), f.addEventListener("click", function() {
      ju(c.id);
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
function ju(e) {
  if (it !== e && (it = e, jt(), $)) {
    $.className = "livue-devtools livue-devtools--" + it, qe && $.classList.add("livue-devtools--minimized");
    var t = Xa(), n = $.querySelector(".livue-devtools__btn");
    n && (n.textContent = qe ? t.minimized : t.expanded), rr();
  }
}
function ye(e, t, n) {
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-stat";
  var i = document.createElement("span");
  i.className = "livue-devtools__perf-label", i.textContent = e, r.appendChild(i);
  var o = document.createElement("span");
  return o.className = "livue-devtools__perf-value", n && o.classList.add("livue-devtools__perf-value--" + n), o.textContent = String(t), r.appendChild(o), r;
}
function kn(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1 ? "<1ms" : Math.round(e) + "ms";
}
function ao(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1e3 ? e + "µs" : (e / 1e3).toFixed(2) + "ms";
}
function Vu() {
  an = function(e) {
    e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Ja());
  }, document.addEventListener("keydown", an);
}
function zu() {
  Fn = setInterval(function() {
    if ($ && Fe === "components") {
      var e = $.querySelector(".livue-devtools__tree");
      e && Va(e), _r();
    }
  }, 500);
}
var yn = !1, lo = !1;
function Ka(e) {
  yn || (ku(e), yn = !0, Au() && Di(), lo || (lo = !0, document.addEventListener("keydown", function(t) {
    t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Ya());
  })));
}
function Hu() {
  if (!yn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  Di();
}
function $u() {
  Oi();
}
function Ya() {
  if (!yn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  Ja();
}
function Fu() {
  return Nu();
}
function Bu() {
  return qa();
}
function Wu() {
  return Oa();
}
function Uu() {
  return Ma();
}
function Ju() {
  return Ia();
}
function Xu() {
  Ra();
}
function Ku() {
  Pa();
}
function Yu() {
  lu();
}
function Ga(e) {
  ru(e);
}
function Gu() {
  return yn;
}
function Zu() {
  La();
}
function Qu() {
  Da();
}
function Za() {
  return nu();
}
const ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: Yu,
  clearEvents: Ku,
  clearTimeline: Xu,
  close: $u,
  getComponents: Bu,
  getEvents: Uu,
  getPerf: Ju,
  getTimeline: Wu,
  init: Ka,
  isCollecting: Za,
  isInitialized: Gu,
  isOpen: Fu,
  logEvent: Ga,
  open: Hu,
  startCollecting: Zu,
  stopCollecting: Qu,
  toggle: Ya
}, Symbol.toStringTag, { value: "Module" }));
var Qe = /* @__PURE__ */ new Map();
function _n(e, t, n, r) {
  Qe.has(e) || Qe.set(e, /* @__PURE__ */ new Set());
  var i = {
    componentName: t,
    componentId: n,
    handler: r
  };
  return Qe.get(e).add(i), function() {
    var o = Qe.get(e);
    o && (o.delete(i), o.size === 0 && Qe.delete(e));
  };
}
function Wn(e, t, n, r, i, o) {
  Za() && Ga({
    name: e,
    data: t,
    mode: n,
    source: r,
    sourceId: i,
    target: o
  });
  var a = Qe.get(e);
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
function so(e) {
  Qe.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Qe.delete(n);
  });
}
function tc(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    Wn(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function nc(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function Mi() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function rc(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = Mi();
    s.open("POST", u, !0);
    var c = qt();
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
function Lr(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = Mi() + "-remove", n = qt();
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
function ic(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), c = Mi();
    u.open("POST", c, !0);
    var f = qt();
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
let ln = /* @__PURE__ */ new Map(), sn = /* @__PURE__ */ new Map();
function Rt(e, t) {
  let n = e + ":debounce:" + t;
  if (!ln.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, c) {
        o = u, a = c, r = setTimeout(function() {
          let f = i, p = o, h = a;
          i = null, o = null, a = null, Promise.resolve(f()).then(p).catch(h);
        }, t);
      });
    };
    ln.set(n, l);
  }
  return ln.get(n);
}
function wn(e, t) {
  let n = e + ":throttle:" + t;
  if (!sn.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < t ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    sn.set(n, i);
  }
  return sn.get(n);
}
function uo(e) {
  let t = e + ":";
  for (let n of ln.keys())
    n.startsWith(t) && ln.delete(n);
  for (let n of sn.keys())
    n.startsWith(t) && sn.delete(n);
}
const ir = "livue-tab-sync";
let Ii = Date.now() + "-" + Math.random().toString(36).substr(2, 9), or = null, Ri = /* @__PURE__ */ new Map(), co = !1;
function Qa() {
  co || (co = !0, typeof BroadcastChannel < "u" ? (or = new BroadcastChannel(ir), or.onmessage = oc) : window.addEventListener("storage", ac));
}
function oc(e) {
  let t = e.data;
  t.tabId !== Ii && el(t);
}
function ac(e) {
  if (e.key === ir && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === Ii) return;
      el(t);
    } catch {
    }
}
function el(e) {
  let t = Ri.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function lc(e, t) {
  Qa(), Ri.set(e, t);
}
function fo(e) {
  Ri.delete(e);
}
function sc(e, t, n, r) {
  Qa();
  let i = {
    tabId: Ii,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (or)
    or.postMessage(i);
  else
    try {
      localStorage.setItem(ir, JSON.stringify(i)), localStorage.removeItem(ir);
    } catch {
    }
}
function uc(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const Pi = /* @__PURE__ */ new Map();
function po(e, t, n) {
  if (e.trim())
    try {
      const r = JSON.parse(e);
      if (r.stream)
        fc(r.stream), t(r.stream);
      else {
        if (r.error)
          throw new Error(r.error);
        r.snapshot && (n.finalResponse = r);
      }
    } catch (r) {
      console.error("[LiVue Stream] Parse error:", r, e);
    }
}
async function cc(e, t, n) {
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
      po(s, n, i);
  }
  return r.trim() && po(r, n, i), i.finalResponse;
}
async function dc(e, t = {}) {
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
        "X-CSRF-TOKEN": qt(),
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
    if (s.status === 419 || s.status === 401)
      return hn(s.status), null;
    if (!s.ok)
      throw new Error(`HTTP error: ${s.status}`);
    const u = s.body.getReader(), c = new TextDecoder(), f = await cc(u, c, n);
    return r(f), f;
  } catch (s) {
    throw s.name === "AbortError" ? new Error("[LiVue Stream] Request timed out") : (i(s), s);
  } finally {
    clearTimeout(l);
  }
}
function fc(e) {
  const { to: t, content: n, replace: r } = e;
  let i = Pi.get(t);
  if (!i) {
    const a = document.querySelector(`[data-stream-target="${t}"]`);
    if (!a) {
      console.warn(`[LiVue Stream] Target not found: ${t}`);
      return;
    }
    di(t, a), i = { el: a, replace: !1 };
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function di(e, t, n = !1) {
  Pi.set(e, { el: t, replace: n });
}
function vo(e) {
  Pi.delete(e);
}
function pc(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function qi(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    pc(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = qi(r) : t[n] = r;
  }
  return t;
}
function vc(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = qi(l), c = {};
    for (let f in s)
      c[f] = /* @__PURE__ */ (function(p, h) {
        return function() {
          let m = Array.prototype.slice.call(arguments);
          return t(p + "." + h, m);
        };
      })(a, f);
    i[a] = Ae(Object.assign({}, u, c));
  }
  return i;
}
function mc(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = qi(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function hc(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function gc(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function bc(e, t) {
  if (!t || !e) return e;
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.children;
  return r.length === 1 && r[0].tagName === t.tagName ? r[0].innerHTML : e;
}
function fi(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = qs(), u = n.name, c = n.vueMethods || {}, f = n.jsonMethods || [], p = n.confirms || {}, h = Array.isArray(n.methods) ? n.methods.slice() : null, m = n.isolate || !1, v = n.urlParams || null, g = n.uploads || null, y = n.tabSync || null, A = !1, _ = i, O = o, E = [], M = !1, z = !1, I = 0, L = a.initialHtml || null, W = Ae({}), R = [];
  function U() {
    for (let d = 0; d < R.length; d++)
      try {
        R[d]();
      } catch {
      }
    R = [];
  }
  function Q(d) {
    if (U(), !!Array.isArray(d))
      for (let b = 0; b < d.length; b++) {
        let w = d[b];
        if (!w || typeof w != "object" || !w.bridge || typeof w.bridge != "object") continue;
        let k = vt(e, w.name, { scope: w.scope || "auto" }, l);
        if (!k) continue;
        let T = w.bridge;
        for (let C in T) {
          let j = T[C];
          if (!j || typeof j != "object") continue;
          let X = j.prop, G = j.mode || "two-way";
          if (!(!X || !(X in t))) {
            if (G === "two-way" || G === "store-to-state") {
              let ee = Me(function() {
                return k[C];
              }, function(lt) {
                t[X] !== lt && (t[X] = lt);
              });
              R.push(ee);
            }
            if (G === "two-way" || G === "state-to-store") {
              let ee = Me(function() {
                return t[X];
              }, function(lt) {
                k[C] !== lt && (k[C] = lt);
              });
              R.push(ee);
            }
          }
        }
      }
  }
  function K(d) {
    let b = Xl(e, d, l);
    for (let w in b)
      W[w] = b[w];
    Q(d);
  }
  K(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    U(), Kl(e);
  });
  function oe(d) {
    let b = document.querySelector('meta[name="livue-prefix"]'), k = "/" + (b ? b.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(d.token), T = document.createElement("a");
    T.href = k, T.download = d.name, T.style.display = "none", document.body.appendChild(T), T.click(), document.body.removeChild(T);
  }
  function Y() {
    z || M || (z = !0, queueMicrotask(J));
  }
  async function J() {
    if (z = !1, M || E.length === 0) return;
    M = !0;
    let d = E;
    E = [], S.loading = !0, S.processing = d[0].method;
    for (let b = 0; b < d.length; b++)
      d[b].method && (ve[d[b].method] = !0);
    try {
      let b = ae(), w = d.map(function(C) {
        return { method: C.method, params: C.params };
      }), k = await Ps(b.snapshot, w, b.diffs, m), T = pe(k, b.diffs);
      for (let C = 0; C < d.length; C++) d[C].resolve(T);
    } catch (b) {
      for (let w = 0; w < d.length; w++)
        b.status === 422 && b.data && b.data.errors ? (Le(S.errors, b.data.errors), d[w].reject(b)) : (_t(b, u), d[w].reject(b));
    } finally {
      S.loading = !1, S.processing = null;
      for (let b = 0; b < d.length; b++)
        d[b].method && delete ve[d[b].method];
      M = !1, E.length > 0 && Y();
    }
  }
  function ae() {
    let d = An(_, t);
    return {
      snapshot: O,
      diffs: d
    };
  }
  function pe(d, b, w = !0) {
    if (d.redirect) {
      xi(d.redirect);
      return;
    }
    if (d.errorBoundary) {
      let C = d.errorBoundary;
      S.errorState.hasError = C.hasError, S.errorState.errorMessage = C.errorMessage, S.errorState.errorDetails = C.errorDetails, S.errorState.recover = C.recover, (!C.errorHandled || !C.recover) && Ee("error.occurred", {
        error: new Error(C.errorMessage || "Component error"),
        componentName: u,
        componentId: e,
        context: { method: C.errorMethod, serverHandled: C.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (d.download && oe(d.download), d.snapshot) {
      let C;
      try {
        C = JSON.parse(d.snapshot);
      } catch (j) {
        console.error("[LiVue] Failed to parse server snapshot:", j), C = null;
      }
      if (C && C.state) {
        let j = Mt(C.state);
        Il(t, j, b), _ = JSON.parse(JSON.stringify(j));
      }
      C && (O = d.snapshot), C && C.memo && (C.memo.errors ? Le(S.errors, C.memo.errors) : w && ai(S.errors), C.memo.vueMethods && (c = C.memo.vueMethods), C.memo.jsonMethods && (f = C.memo.jsonMethods), C.memo.urlParams && (v = C.memo.urlParams), C.memo.uploads && (g = C.memo.uploads), C.memo.confirms && (p = C.memo.confirms), Object.prototype.hasOwnProperty.call(C.memo, "methods") && (h = Array.isArray(C.memo.methods) ? C.memo.methods.slice() : null, S._callableMethods = h), (C.memo.composables || C.memo.composableActions) && mc(le, C.memo), C.memo.stores && K(C.memo.stores));
    }
    if (v && nc(v, t), (d.html || d.fragments) && r && r._updateTemplate) {
      let C = {};
      if (d.snapshot) {
        let j;
        try {
          j = JSON.parse(d.snapshot);
        } catch {
          j = null;
        }
        j && j.memo && (j.memo.transitionType && (C.transitionType = j.memo.transitionType), j.memo.skipTransition && (C.skipTransition = !0));
      }
      if (d.fragments) {
        let j = L || (a.el ? a.el.innerHTML : null);
        if (j) {
          let X = gc(j, d.fragments);
          L = X, r._updateTemplate(X, C);
        }
      } else {
        let j = bc(d.html, a.el);
        L = j, r._updateTemplate(j, C);
      }
    }
    if (d.events && d.events.length > 0) {
      for (var k = 0; k < d.events.length; k++)
        d.events[k].sourceId = e;
      tc(d.events);
    }
    if (d.js && d.js.length > 0)
      for (var T = 0; T < d.js.length; T++)
        try {
          new Function("state", "livue", d.js[T])(t, S);
        } catch (C) {
          console.error("[LiVue] Error executing ->vue() JS:", C);
        }
    if (d.benchmark && Ee("benchmark.received", {
      componentId: e,
      componentName: u,
      timings: d.benchmark
    }), y && y.enabled && d.snapshot && !A && JSON.parse(d.snapshot).state) {
      let j = ra(t), X = [];
      for (let G in j)
        (!b || !(G in b)) && X.push(G);
      if (X.length > 0) {
        let G = uc(j, X, y);
        Object.keys(G).length > 0 && sc(u, G, X, y);
      }
    }
    if (A = !1, d.jsonResult !== void 0)
      return d.jsonResult;
  }
  let ve = Ae({}), xe = Ae({}), Ce = Ae({}), Re = {}, le = {}, Xe = function(d, b) {
    return S.call(d, b);
  };
  hc(n) && (le = vc(n, Xe));
  let S = Ae({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: ve,
    actionTargets: xe,
    formTargets: Ce,
    refs: {},
    stores: W,
    _pinia: l,
    _callableMethods: h,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(d) {
      let b = An(_, t);
      return d === void 0 ? Object.keys(b).length > 0 : d in b;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let d = An(_, t);
      return new Set(Object.keys(d));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(d) {
      return d === void 0 ? JSON.parse(JSON.stringify(_)) : _[d] !== void 0 ? JSON.parse(JSON.stringify(_[d])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(d) {
      d in _ && (t[d] = JSON.parse(JSON.stringify(_[d])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let d in _)
        d in t && (t[d] = JSON.parse(JSON.stringify(_[d])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(d) {
      return d ? ve[d] || !1 : S.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(d) {
      let b = d ? ve[d] || !1 : S.loading;
      return {
        "aria-busy": b,
        disabled: b
      };
    },
    /**
     * Check if a server action with the given semantic name is in-flight.
     * Action names are arbitrary identifiers (e.g. 'refresh', 'export.csv')
     * passed to runAction/runActionWithConfirm.
     *
     * @param {string} actionName
     * @returns {boolean}
     */
    isCallingAction: function(d) {
      return d ? xe[d] || !1 : Object.keys(xe).length > 0;
    },
    /**
     * Invoke a server method on behalf of a named action, tracking its
     * in-flight state under actionName so templates can drive
     * `:loading` bindings via isCallingAction(actionName).
     *
     * Multi-click guard: concurrent invocations with the same actionName
     * are dropped (returns a resolved Promise without dispatching).
     *
     * @param {string} actionName - Semantic action identifier
     * @param {string} callMethod - PHP method to invoke (e.g. 'callAction')
     * @param {object} [params] - Extra params merged into the payload (e.g. recordKey)
     * @returns {Promise}
     */
    runAction: function(d, b, w) {
      if (!d || !b || xe[d])
        return Promise.resolve();
      xe[d] = !0;
      let k = Object.assign({ name: d }, w || {});
      return S.call(b, [k]).finally(function() {
        delete xe[d];
      });
    },
    /**
     * Show a confirmation dialog, then run the action on confirm. The
     * loading state is only triggered after the user confirms — the
     * initial click only opens the dialog.
     *
     * @param {string} actionName
     * @param {string} callMethod
     * @param {string} message - Confirmation prompt
     * @param {object} [params] - Extra params for the action payload
     * @returns {Promise}
     */
    runActionWithConfirm: async function(d, b, w, k) {
      if (await S._showConfirm({ message: w || "Are you sure?" }))
        return S.runAction(d, b, k);
    },
    /**
     * Check if a form is currently being submitted. Pass a form name to
     * scope the check; omit to check whether any form is submitting.
     *
     * @param {string} [formName]
     * @returns {boolean}
     */
    isSubmittingForm: function(d) {
      return d ? Ce[d] || !1 : Object.keys(Ce).length > 0;
    },
    /**
     * Wrap a form submission so isSubmittingForm(formName) reflects its
     * in-flight state. Drops concurrent submits for the same formName.
     *
     * @param {string} formName
     * @param {string} method - Server method to call on submit
     * @param {Array} [params]
     * @returns {Promise}
     */
    runFormSubmit: function(d, b, w) {
      return !d || !b || Ce[d] ? Promise.resolve() : (Ce[d] = !0, S.call(b, w || []).finally(function() {
        delete Ce[d];
      }));
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
    call: async function(d, b, w) {
      let k, T = null;
      if (arguments.length === 1 ? k = [] : arguments.length === 2 ? Array.isArray(b) ? k = b : k = [b] : arguments.length >= 3 && (Array.isArray(b) && w && typeof w == "object" && (w.debounce || w.throttle) ? (k = b, T = w) : k = Array.prototype.slice.call(arguments, 1)), Re[d])
        return Re[d](S, k);
      if (c[d]) {
        try {
          new Function("state", "livue", c[d])(t, S);
        } catch (X) {
          console.error('[LiVue] Error executing #[Vue] method "' + d + '":', X);
        }
        return;
      }
      let C = f.includes(d), j;
      return C ? j = async function() {
        if (p[d] && !await S._showConfirm(p[d]))
          return;
        S.loading = !0, S.processing = d, ve[d] = !0;
        let X;
        try {
          let G = ae(), ee = await Nr(G.snapshot, d, k, G.diffs, !0);
          X = pe(ee, G.diffs);
        } catch (G) {
          throw { status: G.status, errors: G.data && G.data.errors, message: G.message };
        } finally {
          S.loading = !1, S.processing = null, delete ve[d];
        }
        return X;
      } : j = async function() {
        if (!(p[d] && !await S._showConfirm(p[d])))
          return new Promise(function(X, G) {
            E.push({ method: d, params: k, resolve: X, reject: G }), Y();
          });
      }, T && T.debounce ? Rt(e + ":" + d, T.debounce)(j) : T && T.throttle ? wn(e + ":" + d, T.throttle)(j) : j();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(d, b) {
      let w = Array.prototype.slice.call(arguments, 2), k = { message: b || "Are you sure?" };
      if (await S._showConfirm(k))
        return S.call.apply(S, [d].concat(w));
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
    store: function(d, b, w) {
      if (b === void 0) {
        let k = vt(e, d, w || { scope: "auto" }, l);
        if (k)
          return k;
        throw new Error('[LiVue] store("' + d + '"): store not found. Provide a definition or register it in PHP.');
      }
      return wi(e, d, b, w, l);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(d) {
      let b = vt(e, d, { scope: "auto" }, l);
      if (b)
        return W[d] = b, b;
      throw new Error('[LiVue] useStore("' + d + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(d) {
      let b = vt(e, d, { scope: "global" }, l);
      if (b)
        return W[d] = b, b;
      throw new Error('[LiVue] useGlobalStore("' + d + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      S.loading = !0, S.processing = "$sync";
      try {
        let d = ae(), b = await Nr(d.snapshot, null, [], d.diffs, m);
        pe(b, d.diffs, !1);
      } catch (d) {
        d.status === 422 && d.data && d.data.errors ? Le(S.errors, d.data.errors) : _t(d, u);
      } finally {
        S.loading = !1, S.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      ai(S.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(d, b) {
      Wn(d, b, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(d, b, w) {
      Wn(b, w, "to", u, e, d);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(d, b) {
      Wn(d, b, "self", u, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(d) {
      Sn(d, !0);
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
      var w = Tr(t, d);
      w && w.__livue_upload && w.ref && Lr([w.ref]), S.uploading = !0, S.uploadProgress = 0;
      try {
        var k = await rc(b, u, d, g[d].token, function(T) {
          S.uploadProgress = T;
        });
        Jt(t, d, {
          __livue_upload: !0,
          ref: k.ref,
          originalName: k.originalName,
          mimeType: k.mimeType,
          size: k.size,
          previewUrl: k.previewUrl
        });
      } catch (T) {
        T.status === 422 && T.data && T.data.errors ? Le(S.errors, T.data.errors) : _t(T, u);
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
        var w = await ic(b, u, d, g[d].token, function(ee) {
          S.uploadProgress = ee.overall;
        }), k = w.results || [], T = w.errors || [], C = Tr(t, d), j = Array.isArray(C) ? C : [];
        if (k.length > 0) {
          var X = k.map(function(ee) {
            return {
              __livue_upload: !0,
              ref: ee.ref,
              originalName: ee.originalName,
              mimeType: ee.mimeType,
              size: ee.size,
              previewUrl: ee.previewUrl
            };
          });
          Jt(t, d, j.concat(X));
        }
        if (T.length > 0) {
          var G = {};
          T.forEach(function(ee) {
            var lt = d + "." + ee.index;
            G[lt] = {
              file: ee.file,
              message: ee.error
            };
          }), Le(S.errors, G);
        }
      } catch (ee) {
        ee.status === 422 && ee.data && ee.data.errors ? Le(S.errors, ee.data.errors) : _t(ee, u);
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
      var w = Tr(t, d);
      if (b !== void 0 && Array.isArray(w)) {
        var k = w[b];
        k && k.__livue_upload && k.ref && Lr([k.ref]), w.splice(b, 1), Jt(t, d, w.slice());
      } else
        w && w.__livue_upload && w.ref && Lr([w.ref]), Jt(t, d, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(d, b, w) {
      w = w || {}, b = b || [], I++, S.loading = !0, S.streaming = !0, S.processing = d, S.streamingMethod = d, ve[d] = !0;
      let k;
      try {
        let T = ae();
        T.method = d, T.params = b, T.componentId = e;
        let C = await dc(T, {
          timeout: w.timeout !== void 0 ? w.timeout : n.streamTimeout || 0,
          onChunk: function(j) {
          },
          onComplete: function(j) {
          },
          onError: function(j) {
            console.error("[LiVue Stream] Error:", j);
          }
        });
        C && (w.background ? (k = C, S.$el.dispatchEvent(new CustomEvent("livue:stream-complete", {
          bubbles: !0,
          detail: {
            method: d,
            params: b,
            response: C,
            componentId: e
          }
        }))) : k = pe(C, T.diffs));
      } catch (T) {
        S.$el.dispatchEvent(new CustomEvent("livue:stream-error", {
          bubbles: !0,
          detail: {
            method: d,
            params: b,
            error: T,
            componentId: e
          }
        })), T.status === 422 && T.data && T.data.errors ? Le(S.errors, T.data.errors) : _t(T, u);
      } finally {
        I = Math.max(0, I - 1), I === 0 && (S.loading = !1, S.streaming = !1, S.processing = null, S.streamingMethod = null), delete ve[d];
      }
      return k;
    },
    /**
     * Manually apply a response captured from a background stream.
     * Call this inside a livue:stream-complete event handler when you
     * are ready to apply the final snapshot to the component.
     *
     * @param {object} response - The response object from event.detail.response
     */
    applyStreamResponse: function(d) {
      d && pe(d, {});
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
      }) : _n(d, u, e, b);
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
      }) : Me(
        function() {
          return t[d];
        },
        function(w, k) {
          b(w, k);
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
      }) : (Vs(e, d), function() {
        li(e);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: Ae({
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
      _ = JSON.parse(JSON.stringify(d)), O = b;
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
      let d = An(_, t), b = {};
      for (let w in le) {
        let k = le[w], T = {}, C = [];
        for (let j in k)
          if (typeof k[j] == "function")
            C.push(j);
          else
            try {
              T[j] = JSON.parse(JSON.stringify(k[j]));
            } catch {
              T[j] = "[Unserializable]";
            }
        b[w] = { data: T, actions: C };
      }
      return {
        serverState: JSON.parse(JSON.stringify(_)),
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
          composableNames: Object.keys(le)
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
  for (let d in le)
    S[d] = le[d];
  async function ot() {
    S.loading = !0, S.processing = "$refresh", ve.$refresh = !0;
    try {
      let d = ae(), b = await Nr(d.snapshot, null, [], d.diffs, m);
      return pe(b, d.diffs);
    } catch (d) {
      d.status === 422 && d.data && d.data.errors ? Le(S.errors, d.data.errors) : _t(d, u);
    } finally {
      S.loading = !1, S.processing = null, delete ve.$refresh;
    }
  }
  Re.$refresh = function() {
    return ot();
  }, y && y.enabled && lc(u, function(d, b, w) {
    let k = !1;
    if (w.reactive === !0)
      k = !0;
    else if (Array.isArray(w.reactive) && w.reactive.length > 0) {
      for (let T in d)
        if (w.reactive.includes(T)) {
          k = !0;
          break;
        }
    }
    if (k) {
      for (let T in d)
        w.only && !w.only.includes(T) || w.except && w.except.includes(T) || T in t && (t[T] = d[T]);
      A = !0, S.sync();
      return;
    }
    for (let T in d)
      w.only && !w.only.includes(T) || w.except && w.except.includes(T) || T in t && (t[T] = d[T]);
    for (let T in d)
      w.only && !w.only.includes(T) || w.except && w.except.includes(T) || (_[T] = JSON.parse(JSON.stringify(d[T])));
  });
  var $i = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(S, {
    get: function(d, b, w) {
      if (b in d || typeof b == "symbol")
        return Reflect.get(d, b, w);
      if (typeof b == "string" && b.startsWith("$")) {
        if (Re[b])
          return function() {
            var C = Array.prototype.slice.call(arguments);
            return Re[b](S, C);
          };
        var k = b.slice(1);
        if (k) {
          var T = Reflect.get(d, k, w);
          if (typeof T == "function")
            return function() {
              var C = Array.prototype.slice.call(arguments);
              return T.apply(d, C);
            };
        }
      }
      if (typeof b == "string" && !b.startsWith("$") && !$i[b])
        return function() {
          var C = Array.prototype.slice.call(arguments);
          return S.call(b, ...C);
        };
    },
    set: function(d, b, w, k) {
      return Reflect.set(d, b, w, k);
    },
    has: function(d, b) {
      if (typeof b == "string" && b.startsWith("$")) {
        if (Re[b])
          return !0;
        var w = b.slice(1);
        if (w) {
          var k = Reflect.get(d, w, d);
          if (typeof k == "function")
            return !0;
        }
      }
      return Reflect.has(d, b);
    }
  }), composables: le };
}
function ar(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
var At = [], tl = /* @__PURE__ */ new Set(), nl = {}, rl = [];
function Nn(e, t) {
  if (!e || typeof e.install != "function") {
    console.warn("[LiVue] Plugin must have an install() method");
    return;
  }
  if (e.name) {
    for (var n = 0; n < At.length; n++)
      if (At[n].plugin.name === e.name) {
        At[n] = { plugin: e, options: t };
        return;
      }
  }
  At.push({ plugin: e, options: t });
}
function yc(e) {
  tl.add(e);
}
function _c(e) {
  for (var t = 0; t < At.length; t++) {
    var n = At[t], r = n.plugin, i = n.options;
    if (!(r.name && tl.has(r.name))) {
      var o = wc(e);
      try {
        r.install(o, i, e);
      } catch (a) {
        console.error("[LiVue] Error installing plugin " + (r.name || "(unnamed)") + ":", a);
      }
    }
  }
}
function wc(e) {
  return {
    /**
     * Subscribe to a LiVue lifecycle hook.
     * @param {string} name
     * @param {Function} fn
     * @returns {Function} Unsubscribe function
     */
    hook: function(t, n) {
      return Ne(t, n);
    },
    /**
     * Register a composable available in all component templates.
     * The value is exposed as a top-level variable with the given name.
     *
     * @param {string} name - Variable name in templates
     * @param {*} value - Any reactive or plain value
     */
    composable: function(t, n) {
      nl[t] = n;
    },
    /**
     * Register a Vue directive applied to all Vue app instances.
     *
     * @param {string} name - Directive name (without 'v-' prefix)
     * @param {object|Function} def - Vue directive definition
     */
    directive: function(t, n) {
      rl.push({ name: t, directive: n });
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
function il() {
  return nl;
}
function Ec() {
  return rl;
}
function Sc(e) {
  if (!e || !e.attributes) return "";
  let t = "", n = e.attributes;
  for (let r = 0; r < n.length; r++) {
    let i = n[r], o = i.name;
    o === "data-livue-id" || o === "data-livue-snapshot" || o === "v-cloak" || o === "v-pre" || (t += " " + o, i.value !== "" && (t += '="' + i.value.replace(/"/g, "&quot;") + '"'));
  }
  return t;
}
function Un(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, c = s.dataset.livueSnapshot || "{}", f, p, h, m, v, g, y;
    try {
      f = JSON.parse(c), p = f.memo ? f.memo.name : "", h = Mt(f.state || {}), m = f.memo || {}, v = s.innerHTML, g = s.tagName.toLowerCase(), y = Sc(s);
    } catch (R) {
      console.error("[LiVue] Failed to parse child snapshot:", u, R);
      return;
    }
    let A = s.nextElementSibling;
    for (; A; ) {
      let R = A.nextElementSibling;
      if (A.tagName === "SCRIPT" && A.getAttribute("type") === "application/livue-setup")
        v += A.outerHTML, A.parentNode.removeChild(A);
      else
        break;
      A = R;
    }
    let _ = t._childRegistry[u];
    if (!_)
      for (let R in t._childRegistry) {
        let U = t._childRegistry[R];
        if (U.name === p && !o[R]) {
          _ = U;
          break;
        }
      }
    if (_) {
      o[_.id] = !0, _.rootTag = g;
      let R = m.reactive || [];
      if (R.length > 0) {
        for (var O = 0; O < R.length; O++) {
          var E = R[O];
          E in h && (_.state[E] = h[E]);
        }
        _.livue._updateServerState(h, c), _.componentRef && _.componentRef._updateTemplate && _.componentRef._updateTemplate(v);
      }
    }
    let M = !_;
    if (!_) {
      let U = "livue-child-" + ql();
      t._versions[U] = 0;
      let Q = Xr(h), K;
      try {
        K = JSON.parse(JSON.stringify(h));
      } catch (le) {
        console.error("[LiVue] Failed to clone child server state:", le), K = {};
      }
      let oe = Object.assign({ name: m.name || p }, m), Y = { _updateTemplate: null }, J = _a(), ae = fi(u, Q, oe, Y, K, c, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: J,
        pinia: t._pinia || null
      }), pe = ae.livue, ve = ae.composables;
      Ee("component.init", {
        component: { id: u, name: p, state: Q, livue: pe },
        el: s,
        cleanup: J.cleanup,
        isChild: !0
      });
      let xe = m.errors || null;
      xe && Le(pe.errors, xe), _ = {
        tagName: U,
        state: Q,
        memo: oe,
        livue: pe,
        composables: ve,
        componentRef: Y,
        name: p,
        id: u,
        rootTag: g,
        rootAttrs: y
      };
      let Ce = m.listeners || null;
      if (Ce)
        for (let le in Ce)
          (function(Xe, S) {
            _n(le, p, u, function(ot) {
              S.call(Xe, ot);
            });
          })(Ce[le], pe);
      let Re = m.echo || null;
      Re && Re.length && (function(le, Xe) {
        Aa(le, Re, function(S, ot) {
          Xe.call(S, ot);
        });
      })(u, pe), Y._updateTemplate = function(le) {
        let Xe = t.el.querySelector('[data-livue-id="' + u + '"]');
        Xe && oa(Xe);
        let S = Un(le, t), ot = ar(
          "<" + _.rootTag + (_.rootAttrs || "") + ">" + S.template + "</" + _.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let at in S.childDefs)
          t.vueApp._context.components[at] || t.vueApp.component(at, S.childDefs[at]);
        t.vueApp._context.components[_.tagName]._updateRender(ot), mr(function() {
          let at = t.el.querySelector('[data-livue-id="' + u + '"]');
          at && aa(at);
        });
      }, t._childRegistry[u] = _, o[u] = !0;
    }
    let z = _.tagName, I = s.dataset.livueRef;
    I && t._rootLivue && (t._rootLivue.refs[I] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(R, U) {
        return _.livue.call(R, U || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(R, U) {
        return _.livue.set(R, U);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(R, U) {
        return _.livue.dispatch(R, U);
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
    let L = s.dataset.livueModel;
    if (L && t._rootState && _n("$modelUpdate", _.name, u, function(R) {
      R && R.value !== void 0 && Jt(t._rootState, L, R.value);
    }), M) {
      let R = ar(
        "<" + g + (y || "") + ">" + v + "</" + g + ">",
        'data-livue-id="' + u + '"'
      ), U = Object.assign({}, il(), _.composables || {});
      i[z] = Qr(
        R,
        _.state,
        _.livue,
        U,
        t._versions,
        _.name
      );
    }
    t._versions[z] === void 0 && (t._versions[z] = 0);
    let W = document.createElement(z);
    W.setAttribute(":key", "livueV['" + z + "']"), s.parentNode.replaceChild(W, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let mo = 0;
function pi() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Dr = /* @__PURE__ */ new WeakMap();
function ho() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const xc = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (mo++, r = "livue-transition-" + mo), Dr.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), pi() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    ho();
  },
  updated(e, t) {
    let n = Dr.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), pi() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    Dr.delete(e), e.removeAttribute("data-livue-transition"), ho();
  }
};
function Cc(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function Tc(e) {
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
function Ac(e, t) {
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
function kc(e, t) {
  if (t) {
    var n = Ac(e, t);
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
let Or = 0;
function Nc(e) {
  return Dl({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = vn(!1), i = _i(null), o = null, a = vn(null);
      async function l() {
        if (!r.value)
          try {
            let u = await Is({
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
        Or++;
        let f = "lazy-" + Or + "-" + Date.now(), p = c.memo ? c.memo.name : "", h = Mt(c.state || {}), m = c.memo || {}, { createLivueHelper: v, buildComponentDef: g, processTemplate: y, createReactiveState: A } = e._lazyHelpers, _ = A(h), O = JSON.parse(JSON.stringify(h)), E = { _updateTemplate: null }, M = v(
          f,
          _,
          m,
          E,
          O,
          u.snapshot,
          {
            rootComponent: e,
            isChild: !0,
            parentLivue: e._rootLivue || null,
            pinia: e._pinia || null
          }
        ), z = M.livue, I = M.composables;
        m.errors && Le(z.errors, m.errors);
        let L = "livue-lazy-child-" + Or, W = y(u.html, e), R = ar(
          W.template,
          'data-livue-id="' + f + '"'
        ), U = g(
          R,
          _,
          z,
          I,
          e._versions,
          p
        );
        e._childRegistry[f] = {
          tagName: L,
          state: _,
          memo: m,
          livue: z,
          componentRef: E,
          name: p,
          id: f
        }, E._updateTemplate = function(K) {
          let oe = y(K, e), Y = ar(
            oe.template,
            'data-livue-id="' + f + '"'
          );
          for (let ae in oe.childDefs)
            e.vueApp._context.components[ae] || e.vueApp.component(ae, oe.childDefs[ae]);
          let J = g(
            Y,
            _,
            z,
            I,
            e._versions,
            p
          );
          e.vueApp._context.components[L] = J, e._versions[L] = (e._versions[L] || 0) + 1, i.value = J;
        };
        let Q = m.listeners || null;
        if (Q)
          for (let K in Q)
            (function(oe, Y) {
              _n(K, p, f, function(J) {
                Y.call(oe, J);
              });
            })(Q[K], z);
        for (let K in W.childDefs)
          e.vueApp._context.components[K] || e.vueApp.component(K, W.childDefs[K]);
        e._versions[L] = 0, e.vueApp._context.components[L] || e.vueApp.component(L, U), i.value = U, r.value = !0;
      }
      return ta(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), ea(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? Fi(i.value) : Fi("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class Lc {
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
    this.name = r.memo ? r.memo.name : "", this.state = Xr(Mt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Ae({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: fi,
      buildComponentDef: Qr,
      processTemplate: Un,
      createReactiveState: Xr
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
        y = y || {}, Ee("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: g
        });
        var A = Tc(r.el);
        oa(r.el);
        let _;
        try {
          _ = Un(g, r);
        } catch (E) {
          console.error("[LiVue] Error processing updated template:", E);
          return;
        }
        if (!r.vueApp) return;
        for (let E in _.childDefs)
          r.vueApp._context.components[E] || r.vueApp.component(E, _.childDefs[E]);
        function O() {
          r._currentRootDef._updateRender(_.template), mr(function() {
            aa(r.el), kc(r.el, A), Ee("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (y.skipTransition) {
          O();
          return;
        }
        pi() ? Cc(O, { type: y.transitionType }) : O();
      }
    }, o = JSON.parse(JSON.stringify(Mt(t.state || {})));
    this._cleanups = _a(), this._pinia = Wi();
    let a = fi(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups,
      initialHtml: this.el.innerHTML,
      pinia: this._pinia
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, Ee("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u;
    try {
      u = Un(this.el.innerHTML, this);
    } catch (g) {
      console.error("[LiVue] Error processing initial template:", g), u = { template: this.el.innerHTML, childDefs: {} };
    }
    let c = t.memo && t.memo.errors || null;
    c && Le(l.errors, c);
    let f = t.memo && t.memo.listeners || null;
    if (f)
      for (let g in f)
        (function(y, A, _, O) {
          _n(g, _, O, function(E) {
            A.call(y, E);
          });
        })(f[g], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = Aa(r.componentId, p, function(g, y) {
      l.call(g, y);
    }));
    let h = Object.assign({}, il(), s), m = Qr(u.template, r.state, l, h, r._versions, r.name);
    this._currentRootDef = m, this._rootDefRef = _i(m), this.vueApp = Ol({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", Nc(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = this._pinia || Wi();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let l = 0; l < window.LiVue._setupCallbacks.length; l++)
        try {
          let s = window.LiVue._setupCallbacks[l](n);
          s && typeof s.then == "function" && await s;
        } catch (s) {
          console.error("[LiVue] Error in setup() callback:", s);
        }
    let i = Bs();
    for (let l = 0; l < i.length; l++)
      n.directive(i[l].name, i[l].directive);
    let o = Ec();
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
      Ee("component.destroy", {
        component: { id: t, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), so(t), uo(t), li(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && fo(n.name), to(t);
    }
    if (Ee("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), so(this.componentId), uo(this.componentId), li(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && fo(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), to(this.componentId), this.vueApp) {
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
function Ie(e) {
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
let go = /* @__PURE__ */ new Set();
const Dc = {
  mounted(e, t, n) {
    let r = Ie(n);
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
    go.has(u) || (go.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Mr = /* @__PURE__ */ new WeakMap(), Oc = {
  mounted(e, t, n) {
    e.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + e.tagName.toLowerCase() + ">");
    let r = Ie(n);
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
    e.addEventListener("submit", l), Mr.set(e, l);
  },
  unmounted(e) {
    let t = Mr.get(e);
    t && (e.removeEventListener("submit", t), Mr.delete(e));
  }
}, Ln = /* @__PURE__ */ new WeakMap(), Mc = {
  mounted(e, t, n) {
    let r = Ie(n);
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
        (f ? !v.isIntersecting : v.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (h.disconnect(), Ln.delete(e)));
      },
      {
        threshold: u,
        rootMargin: c
      }
    );
    h.observe(e), Ln.set(e, h);
  },
  unmounted(e) {
    let t = Ln.get(e);
    t && (t.disconnect(), Ln.delete(e));
  }
};
var lr = /* @__PURE__ */ new Set(), kt = /* @__PURE__ */ new WeakMap(), bo = !1;
function Dt(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function Ic(e, t) {
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
function vi(e) {
  var t = kt.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = Ic(n, i);
      if (typeof r == "object" && r !== null) {
        var a = r.active ? Dt(r.active) : [], l = r.inactive ? Dt(r.inactive) : [];
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
        var s = Dt(r);
        o ? (s.forEach(function(u) {
          e.classList.add(u);
        }), e.setAttribute("data-current", ""), e.setAttribute("aria-current", "page")) : (s.forEach(function(u) {
          e.classList.remove(u);
        }), e.removeAttribute("data-current"), e.removeAttribute("aria-current"));
      }
    }
  }
}
function yo() {
  lr.forEach(function(e) {
    e.isConnected ? vi(e) : (lr.delete(e), kt.delete(e));
  });
}
function Rc() {
  bo || (bo = !0, window.addEventListener("popstate", yo), window.addEventListener("livue:navigated", yo));
}
const Pc = {
  mounted(e, t) {
    kt.set(e, { value: t.value, modifiers: t.modifiers || {} }), lr.add(e), Rc(), vi(e);
  },
  updated(e, t) {
    kt.set(e, { value: t.value, modifiers: t.modifiers || {} }), vi(e);
  },
  unmounted(e) {
    var t = kt.get(e);
    if (t) {
      var n = t.value;
      if (typeof n == "object" && n !== null) {
        var r = n.active ? Dt(n.active) : [], i = n.inactive ? Dt(n.inactive) : [];
        r.forEach(function(o) {
          e.classList.remove(o);
        }), i.forEach(function(o) {
          e.classList.remove(o);
        });
      } else typeof n == "string" && Dt(n).forEach(function(o) {
        e.classList.remove(o);
      });
    }
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), lr.delete(e), kt.delete(e);
  }
};
let _o = 0;
const qc = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    _o++;
    let n = "livue-ignore-" + _o;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, zt = /* @__PURE__ */ new WeakMap();
let wo = 0;
function jc(e) {
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
function Vc(e) {
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
function Dn(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function Eo(e, t) {
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
function zc(e) {
  return !!e.component;
}
function Ir(e, t) {
  return e[t] && typeof e[t] == "object" && "value" in e[t] ? e[t].value : e[t];
}
function Hc(e, t, n) {
  e[t] && typeof e[t] == "object" && "value" in e[t] ? e[t].value = n : e[t] = n;
}
const $c = {
  mounted(e, t, n) {
    let r = jc(n);
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
    wo++;
    let s = "model-" + wo, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: c, throttleMs: f } = Vc(l);
    l.live && !c && !f && (c = 150);
    function p(E) {
      if (l.number) {
        let M = Number(E);
        E = isNaN(M) ? 0 : M;
      }
      l.boolean && (E = !!E && E !== "false" && E !== "0"), Hc(o, a, E);
    }
    function h(E) {
      c > 0 ? Rt(s, c)(function() {
        p(E);
      }) : f > 0 ? wn(s, f)(function() {
        p(E);
      }) : p(E);
    }
    let m = Ir(o, a), v = zc(n), g = n.component, y = null, A = null, _ = null, O = null;
    if (v && g)
      O = g.emit, g.emit = function(E, ...M) {
        if (E === "update:modelValue") {
          let z = M[0];
          h(z);
          return;
        }
        return O.call(g, E, ...M);
      }, g.props && "modelValue" in g.props && (_ = Me(
        function() {
          return Ir(o, a);
        },
        function(E) {
          g.vnode && g.vnode.props && (g.vnode.props.modelValue = E), g.exposed && typeof g.exposed.setValue == "function" && g.exposed.setValue(E), g.update && g.update();
        },
        { immediate: !0 }
      )), zt.set(e, {
        isComponent: !0,
        componentInstance: g,
        originalEmit: O,
        stopWatcher: _,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (c > 0) {
        let E = Rt(s, c);
        y = function(M) {
          let z = Dn(M.target);
          E(function() {
            p(z);
          });
        };
      } else if (f > 0) {
        let E = wn(s, f);
        y = function(M) {
          let z = Dn(M.target);
          E(function() {
            p(z);
          });
        };
      } else
        y = function(E) {
          p(Dn(E.target));
        };
      l.enter ? (A = function(E) {
        E.key === "Enter" && p(Dn(E.target));
      }, e.addEventListener("keyup", A)) : e.addEventListener(u, y), Eo(e, m), zt.set(e, {
        isComponent: !1,
        handler: y,
        keyHandler: A,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(e, t, n) {
    let r = zt.get(e);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a = Ir(o, i);
      Eo(e, a);
    }
  },
  unmounted(e) {
    let t = zt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), zt.delete(e));
  }
}, Rr = /* @__PURE__ */ new WeakMap(), Fc = 2500;
function Bc(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Fc;
}
const Wc = {
  mounted(e, t, n) {
    let r = Ie(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = Bc(l), u = l["keep-alive"] === !0, c = l.visible === !0, f = {
      intervalId: null,
      observer: null,
      isVisible: !c,
      // If not visibleOnly, assume visible
      isPaused: !1,
      missedTick: !1
      // A tick fired while hidden/off-screen
    };
    function p() {
      if (f.isPaused) {
        f.missedTick = !0;
        return;
      }
      if (c && !f.isVisible) {
        f.missedTick = !0;
        return;
      }
      f.missedTick = !1, o ? r.call(o, a) : r.call("$refresh", []);
    }
    function h() {
      f.missedTick && p();
    }
    function m() {
      f.intervalId || (f.intervalId = setInterval(p, s));
    }
    function v() {
      u || (document.hidden ? f.isPaused = !0 : (f.isPaused = !1, h()));
    }
    c && (f.observer = new IntersectionObserver(
      function(g) {
        f.isVisible = g[0].isIntersecting, f.isVisible && h();
      },
      { threshold: 0 }
    ), f.observer.observe(e)), document.addEventListener("visibilitychange", v), f.visibilityHandler = v, m(), Rr.set(e, f);
  },
  unmounted(e) {
    let t = Rr.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), Rr.delete(e));
  }
}, On = /* @__PURE__ */ new WeakMap();
let sr = typeof navigator < "u" ? navigator.onLine : !0, ur = /* @__PURE__ */ new Set(), So = !1;
function Uc() {
  So || typeof window > "u" || (So = !0, window.addEventListener("online", function() {
    sr = !0, ur.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    sr = !1, ur.forEach(function(e) {
      e(!1);
    });
  }));
}
const Jc = {
  created(e, t) {
    Uc();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", sr && (e.style.display = "none")), On.set(e, o);
  },
  mounted(e, t) {
    let n = On.get(e);
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
    r(sr), n.updateFn = r, ur.add(r);
  },
  unmounted(e) {
    let t = On.get(e);
    t && t.updateFn && ur.delete(t.updateFn), On.delete(e);
  }
};
let xo = 0;
const Ht = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new Map(), Xc = {
  created(e, t) {
    xo++;
    let n = "livue-replace-" + xo, r = t.modifiers.self === !0;
    Ht.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Pr.set(n, 0);
  },
  mounted(e, t) {
    let n = Ht.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = Ht.get(e);
    n && (n.version++, Pr.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = Ht.get(e);
    t && Pr.delete(t.id), Ht.delete(e);
  }
}, $t = /* @__PURE__ */ new WeakMap(), Co = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Kc = 200;
function Yc(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(Co))
    if (e[t])
      return Co[t];
  return Kc;
}
function qr(e, t, n, r, i) {
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
const Gc = {
  created(e, t) {
    let n = e.style.display;
    $t.set(e, {
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
    let r = Ie(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = $t.get(e), o = t.modifiers || {}, a = Yc(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function c(f) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), f && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, qr(e, i, o, u, !0);
      }, a) : f ? (i.isActive = !0, qr(e, i, o, u, !0)) : (i.isActive = !1, qr(e, i, o, u, !1));
    }
    i.stopWatch = Me(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      c,
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    $t.get(e);
  },
  unmounted(e) {
    let t = $t.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), $t.delete(e));
  }
}, Mn = /* @__PURE__ */ new WeakMap(), Zc = {
  mounted(e, t, n) {
    let r = Ie(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = t.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = Me(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? e.setAttribute("data-loading", "") : e.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    Mn.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = Mn.get(e), i = Ie(n);
    if (!r || !i) return;
    let o = t.value, a = t.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Me(
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
    let t = Mn.get(e);
    t && (t.stopWatch && t.stopWatch(), Mn.delete(e));
  }
}, Ft = /* @__PURE__ */ new WeakMap(), Qc = {
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
    Ft.set(e, { targetId: n }), e.setAttribute("data-stream-target", n), di(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = Ft.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      vo(n.targetId);
      const i = t.modifiers.replace || !1;
      di(r, e, i), Ft.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = Ft.get(e);
    t && (vo(t.targetId), Ft.delete(e));
  }
}, To = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, Ao = ["ctrl", "alt", "shift", "meta"];
let ko = 0;
const No = /* @__PURE__ */ new Set();
function ed(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function td(e, t) {
  for (let i = 0; i < Ao.length; i++) {
    let o = Ao[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in To)
    t[i] && (n = !0, e.key === To[i] && (r = !0));
  return !(n && !r);
}
function nd(e, t, n) {
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
function B(e, t = {}) {
  let n = t.supportsOutside === !0, r = t.isKeyboardEvent === !0, i = t.allowArg !== !1;
  const o = /* @__PURE__ */ new WeakMap();
  return {
    mounted(a, l, s) {
      const { arg: u, modifiers: c } = l, f = Ie(s);
      if (!f) {
        console.warn("[LiVue] v-" + e + ": livue helper not found in component context");
        return;
      }
      if (u && !i) {
        const E = "v-" + e;
        No.has(E) || (console.warn(
          "[LiVue] " + E + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), No.add(E));
      }
      ko++;
      const p = "v-" + e + "-" + ko, h = ed(c);
      let m = null, v = null;
      c.debounce && (m = Rt(p, h)), c.throttle && (v = wn(p, h));
      let g = !1;
      const y = function(E) {
        let M = nd(l.value, u, i);
        if (M.directFn) {
          let I = M.directFn;
          m ? m(I) : v ? v(I) : I();
          return;
        }
        if (!M.methodName) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const z = function() {
          c.confirm ? f.callWithConfirm(M.methodName, "Are you sure?", ...M.args) : f.call(M.methodName, ...M.args);
        };
        m ? m(z) : v ? v(z) : z();
      }, A = function(E) {
        if (!(c.self && E.target !== a) && !(r && !td(E, c))) {
          if (c.once) {
            if (g)
              return;
            g = !0;
          }
          c.prevent && E.preventDefault(), c.stop && E.stopPropagation(), y();
        }
      }, _ = {};
      c.capture && (_.capture = !0), c.passive && (_.passive = !0);
      const O = {
        handler: A,
        options: _,
        outsideHandler: null
      };
      if (n && c.outside) {
        const E = function(M) {
          if (!a.contains(M.target) && M.target !== a) {
            if (c.once) {
              if (g)
                return;
              g = !0;
            }
            y();
          }
        };
        document.addEventListener(e, E, _), O.outsideHandler = E;
      } else
        a.addEventListener(e, A, _);
      o.set(a, O);
    },
    updated(a, l, s) {
    },
    unmounted(a) {
      const l = o.get(a);
      l && (l.outsideHandler ? document.removeEventListener(e, l.outsideHandler, l.options) : a.removeEventListener(e, l.handler, l.options), o.delete(a));
    }
  };
}
const rd = B("click", {
  supportsOutside: !0,
  allowArg: !1
}), id = {
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
let Lo = 0;
const od = {
  created(e, t) {
    let n = t.value;
    n || (Lo++, n = "scroll-" + Lo), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, Bt = /* @__PURE__ */ new WeakMap();
function Do(e, t, n, r, i) {
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
const ad = {
  created(e, t) {
    let n = e.style.display;
    Bt.set(e, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = t.modifiers || {};
    !r.class && !r.attr && (e.style.display = "none");
  },
  mounted(e, t, n) {
    let r = Ie(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = Bt.get(e), o = t.modifiers || {}, a = t.arg || null, l = t.value;
    i.stopWatch = Me(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        Do(e, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = Bt.get(e);
    if (r && t.value !== t.oldValue) {
      let i = Ie(n);
      if (i) {
        let o = t.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Do(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = Bt.get(e);
    t && (t.stopWatch && t.stopWatch(), Bt.delete(e));
  }
}, In = /* @__PURE__ */ new WeakMap();
let Oo = 0;
function ld(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function sd(e, t) {
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
function ud(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const cd = {
  mounted(e, t, n) {
    let r = sd(t, n);
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
    Oo++;
    let s = "watch-" + i + "-" + Oo;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), In.set(e, { blurHandler: p });
      return;
    }
    let u = ld(l) || 150, c = Rt(s, u), f = Me(
      function() {
        return ud(a, i);
      },
      function() {
        c(function() {
          return o.sync();
        });
      }
    );
    In.set(e, { stopWatcher: f });
  },
  unmounted(e) {
    let t = In.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), In.delete(e));
  }
}, jr = /* @__PURE__ */ new WeakMap();
let Mo = 0;
function dd(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function fd(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function pd(e, t) {
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
function wr(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function Er(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function vd(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function md(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function hd(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function gd(e) {
  return hd(e) ? e : e.querySelector("input, textarea, select");
}
function Sr(e, t, n) {
  return {
    mounted(r, i, o) {
      if (dd(o) && !fd(o))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let a = i.arg;
      if (!a)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let l = pd(i, o);
      if (!l)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: s } = l, u = md(s, a);
      if (!u)
        throw new Error("[LiVue] v-" + e + ': Property "' + a + '" not found in component state');
      let c = i.modifiers || {};
      Mo++;
      let f = e + "-" + Mo, p = gd(r);
      if (!p) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let h = t(p, u, s, c, f);
      p.addEventListener(h.eventType, h.handler, { capture: !0 }), jr.set(r, {
        targetEl: p,
        handler: h.handler,
        eventType: h.eventType
      });
    },
    unmounted(r) {
      let i = jr.get(r);
      i && (n && n(r, i), i.targetEl.removeEventListener(i.eventType, i.handler, { capture: !0 }), jr.delete(r));
    }
  };
}
function ol(e, t) {
  return Sr(e, function(n, r, i, o, a) {
    let l = vd(o) || 150, s = t(a, l);
    return {
      eventType: "input",
      handler: function(u) {
        u.stopImmediatePropagation();
        let c = wr(u.target);
        s(function() {
          Er(i, r, c);
        });
      }
    };
  });
}
const bd = ol("debounce", Rt), yd = ol("throttle", wn), _d = Sr(
  "blur",
  function(e, t, n, r, i) {
    let o = function(l) {
      l.stopImmediatePropagation();
    }, a = function(l) {
      Er(n, t, wr(l.target));
    };
    return e.addEventListener("blur", a), e._livueBlurHandler = a, { eventType: "input", handler: o };
  },
  function(e, t) {
    let n = t ? t.targetEl : e;
    n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler);
  }
), wd = Sr(
  "enter",
  function(e, t, n, r, i) {
    let o = function(l) {
      l.stopImmediatePropagation();
    }, a = function(l) {
      l.key === "Enter" && Er(n, t, wr(l.target));
    };
    return e.addEventListener("keyup", a), e._livueEnterHandler = a, { eventType: "input", handler: o };
  },
  function(e, t) {
    let n = t ? t.targetEl : e;
    n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler);
  }
), Ed = Sr("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = wr(o.target);
      a = !!a && a !== "false" && a !== "0", Er(n, t, a);
    }
  };
});
function Io(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Io(Object(n), !0).forEach(function(r) {
      Sd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Io(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Jn(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Jn = function(t) {
    return typeof t;
  } : Jn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Jn(e);
}
function Sd(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Ue() {
  return Ue = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ue.apply(this, arguments);
}
function xd(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Cd(e, t) {
  if (e == null) return {};
  var n = xd(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var Td = "1.15.6";
function Be(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var Je = Be(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), xn = Be(/Edge/i), Ro = Be(/firefox/i), un = Be(/safari/i) && !Be(/chrome/i) && !Be(/android/i), ji = Be(/iP(ad|od|hone)/i), al = Be(/chrome/i) && Be(/android/i), ll = {
  capture: !1,
  passive: !1
};
function F(e, t, n) {
  e.addEventListener(t, n, !Je && ll);
}
function H(e, t, n) {
  e.removeEventListener(t, n, !Je && ll);
}
function cr(e, t) {
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
function sl(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Oe(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && cr(e, t) : cr(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = sl(e));
  }
  return null;
}
var Po = /\s+/g;
function be(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Po, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Po, " ");
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
function Ot(e, t) {
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
function ul(e, t, n) {
  if (e) {
    var r = e.getElementsByTagName(t), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function Ve() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function ie(e, t, n, r, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var o, a, l, s, u, c, f;
    if (e !== window && e.parentNode && e !== Ve() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, c = o.height, f = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, f = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !Je))
      do
        if (i && i.getBoundingClientRect && (P(i, "transform") !== "none" || n && P(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(P(i, "border-top-width")), l -= p.left + parseInt(P(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var h = Ot(i || e), m = h && h.a, v = h && h.d;
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
function qo(e, t, n) {
  for (var r = nt(e, !0), i = ie(e)[t]; r; ) {
    var o = ie(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === Ve()) break;
    r = nt(r, !1);
  }
  return !1;
}
function Pt(e, t, n, r) {
  for (var i = 0, o = 0, a = e.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== q.ghost && (r || a[o] !== q.dragged) && Oe(a[o], n.draggable, e, !1)) {
      if (i === t)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function Vi(e, t) {
  for (var n = e.lastElementChild; n && (n === q.ghost || P(n, "display") === "none" || t && !cr(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function Te(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== q.clone && (!t || cr(e, t)) && n++;
  return n;
}
function jo(e) {
  var t = 0, n = 0, r = Ve();
  if (e)
    do {
      var i = Ot(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function Ad(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var r in t)
        if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
    }
  return -1;
}
function nt(e, t) {
  if (!e || !e.getBoundingClientRect) return Ve();
  var n = e, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = P(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return Ve();
        if (r || t) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return Ve();
}
function kd(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Vr(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var cn;
function cl(e, t) {
  return function() {
    if (!cn) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), cn = setTimeout(function() {
        cn = void 0;
      }, t);
    }
  };
}
function Nd() {
  clearTimeout(cn), cn = void 0;
}
function dl(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function fl(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function pl(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!Oe(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = ie(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var he = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ld() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(P(i, "display") === "none" || i === q.ghost)) {
            e.push({
              target: i,
              rect: ie(i)
            });
            var o = ze({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Ot(i, !0);
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
      e.splice(Ad(e, {
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
        var s = 0, u = l.target, c = u.fromRect, f = ie(u), p = u.prevFromRect, h = u.prevToRect, m = l.rect, v = Ot(u, !0);
        v && (f.top -= v.f, f.left -= v.e), u.toRect = f, u.thisAnimationDuration && Vr(p, f) && !Vr(c, f) && // Make sure animatingRect is on line between toRect & fromRect
        (m.top - f.top) / (m.left - f.left) === (c.top - f.top) / (c.left - f.left) && (s = Od(m, p, h, i.options)), Vr(f, c) || (u.prevFromRect = c, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, m, f, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        P(r, "transition", ""), P(r, "transform", "");
        var l = Ot(this.el), s = l && l.a, u = l && l.d, c = (i.left - o.left) / (s || 1), f = (i.top - o.top) / (u || 1);
        r.animatingX = !!c, r.animatingY = !!f, P(r, "transform", "translate3d(" + c + "px," + f + "px,0)"), this.forRepaintDummy = Dd(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function Dd(e) {
  return e.offsetWidth;
}
function Od(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var wt = [], zr = {
  initializeByDefault: !0
}, Cn = {
  mount: function(t) {
    for (var n in zr)
      zr.hasOwnProperty(n) && !(n in t) && (t[n] = zr[n]);
    wt.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), wt.push(t);
  },
  pluginEvent: function(t, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = t + "Global";
    wt.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](ze({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](ze({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    wt.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, Ue(r, u.defaults);
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
    return wt.forEach(function(i) {
      typeof i.eventProperties == "function" && Ue(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return wt.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function Md(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, c = e.oldDraggableIndex, f = e.newDraggableIndex, p = e.originalEvent, h = e.putSortable, m = e.extraEventProperties;
  if (t = t || n && n[he], !!t) {
    var v, g = t.options, y = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !Je && !xn ? v = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (v = document.createEvent("Event"), v.initEvent(r, !0, !0)), v.to = a || n, v.from = l || n, v.item = i || n, v.clone = o, v.oldIndex = s, v.newIndex = u, v.oldDraggableIndex = c, v.newDraggableIndex = f, v.originalEvent = p, v.pullMode = h ? h.lastPutMode : void 0;
    var A = ze(ze({}, m), Cn.getEventProperties(r, t));
    for (var _ in A)
      v[_] = A[_];
    n && n.dispatchEvent(v), g[y] && g[y].call(t, v);
  }
}
var Id = ["evt"], me = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = Cd(r, Id);
  Cn.pluginEvent.bind(q)(t, n, ze({
    dragEl: x,
    parentEl: ne,
    ghostEl: V,
    rootEl: Z,
    nextEl: dt,
    lastDownEl: Xn,
    cloneEl: te,
    cloneHidden: et,
    dragStarted: Gt,
    putSortable: se,
    activeSortable: q.active,
    originalEvent: i,
    oldIndex: Nt,
    oldDraggableIndex: dn,
    newIndex: _e,
    newDraggableIndex: Ye,
    hideGhostForTarget: gl,
    unhideGhostForTarget: bl,
    cloneNowHidden: function() {
      et = !0;
    },
    cloneNowShown: function() {
      et = !1;
    },
    dispatchSortableEvent: function(l) {
      de({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function de(e) {
  Md(ze({
    putSortable: se,
    cloneEl: te,
    targetEl: x,
    rootEl: Z,
    oldIndex: Nt,
    oldDraggableIndex: dn,
    newIndex: _e,
    newDraggableIndex: Ye
  }, e));
}
var x, ne, V, Z, dt, Xn, te, et, Nt, _e, dn, Ye, Rn, se, Tt = !1, dr = !1, fr = [], st, ke, Hr, $r, Vo, zo, Gt, Et, fn, pn = !1, Pn = !1, Kn, ce, Fr = [], mi = !1, pr = [], xr = typeof document < "u", qn = ji, Ho = xn || Je ? "cssFloat" : "float", Rd = xr && !al && !ji && "draggable" in document.createElement("div"), vl = (function() {
  if (xr) {
    if (Je)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), ml = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Pt(t, 0, n), a = Pt(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + ie(o).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + ie(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Ho] === "none" || a && r[Ho] === "none" && u + c > i) ? "vertical" : "horizontal";
}, Pd = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, qd = function(t, n) {
  var r;
  return fr.some(function(i) {
    var o = i[he].options.emptyInsertThreshold;
    if (!(!o || Vi(i))) {
      var a = ie(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, hl = function(t) {
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
  (!i || Jn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, gl = function() {
  !vl && V && P(V, "display", "none");
}, bl = function() {
  !vl && V && P(V, "display", "");
};
xr && !al && document.addEventListener("click", function(e) {
  if (dr)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), dr = !1, !1;
}, !0);
var ut = function(t) {
  if (x) {
    t = t.touches ? t.touches[0] : t;
    var n = qd(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[he]._onDragOver(r);
    }
  }
}, jd = function(t) {
  x && x.parentNode[he]._isOutsideThisEl(t.target);
};
function q(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = Ue({}, t), e[he] = this;
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
      return ml(e, this.options);
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
    supportPointer: q.supportPointer !== !1 && "PointerEvent" in window && (!un || ji),
    emptyInsertThreshold: 5
  };
  Cn.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  hl(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Rd, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? F(e, "pointerdown", this._onTapStart) : (F(e, "mousedown", this._onTapStart), F(e, "touchstart", this._onTapStart)), this.nativeDraggable && (F(e, "dragover", this), F(e, "dragenter", this)), fr.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Ue(this, Ld());
}
q.prototype = /** @lends Sortable.prototype */
{
  constructor: q,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Et = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, x) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, c = i.filter;
      if (Ud(r), !x && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && un && s && s.tagName.toUpperCase() === "SELECT") && (s = Oe(s, i.draggable, r, !1), !(s && s.animated) && Xn !== s)) {
        if (Nt = Te(s), dn = Te(s, i.draggable), typeof c == "function") {
          if (c.call(this, t, s, this)) {
            de({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), me("filter", n, {
              evt: t
            }), o && t.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(f) {
          if (f = Oe(u, f.trim(), r, !1), f)
            return de({
              sortable: n,
              rootEl: f,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), me("filter", n, {
              evt: t
            }), !0;
        }), c)) {
          o && t.preventDefault();
          return;
        }
        i.handle && !Oe(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !x && r.parentNode === o) {
      var u = ie(r);
      if (Z = o, x = r, ne = x.parentNode, dt = x.nextSibling, Xn = r, Rn = a.group, q.dragged = x, st = {
        target: x,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Vo = st.clientX - u.left, zo = st.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, x.style["will-change"] = "all", s = function() {
        if (me("delayEnded", i, {
          evt: t
        }), q.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Ro && i.nativeDraggable && (x.draggable = !0), i._triggerDragStart(t, n), de({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), be(x, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(c) {
        ul(x, c.trim(), Br);
      }), F(l, "dragover", ut), F(l, "mousemove", ut), F(l, "touchmove", ut), a.supportPointer ? (F(l, "pointerup", i._onDrop), !this.nativeDraggable && F(l, "pointercancel", i._onDrop)) : (F(l, "mouseup", i._onDrop), F(l, "touchend", i._onDrop), F(l, "touchcancel", i._onDrop)), Ro && this.nativeDraggable && (this.options.touchStartThreshold = 4, x.draggable = !0), me("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(xn || Je))) {
        if (q.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (F(l, "pointerup", i._disableDelayedDrag), F(l, "pointercancel", i._disableDelayedDrag)) : (F(l, "mouseup", i._disableDelayedDrag), F(l, "touchend", i._disableDelayedDrag), F(l, "touchcancel", i._disableDelayedDrag)), F(l, "mousemove", i._delayedDragTouchMoveHandler), F(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && F(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    x && Br(x), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    H(t, "mouseup", this._disableDelayedDrag), H(t, "touchend", this._disableDelayedDrag), H(t, "touchcancel", this._disableDelayedDrag), H(t, "pointerup", this._disableDelayedDrag), H(t, "pointercancel", this._disableDelayedDrag), H(t, "mousemove", this._delayedDragTouchMoveHandler), H(t, "touchmove", this._delayedDragTouchMoveHandler), H(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? F(document, "pointermove", this._onTouchMove) : n ? F(document, "touchmove", this._onTouchMove) : F(document, "mousemove", this._onTouchMove) : (F(x, "dragend", this), F(Z, "dragstart", this._onDragStart));
    try {
      document.selection ? Yn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Tt = !1, Z && x) {
      me("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && F(document, "dragover", jd);
      var r = this.options;
      !t && be(x, r.dragClass, !1), be(x, r.ghostClass, !0), q.active = this, t && this._appendGhost(), de({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (ke) {
      this._lastX = ke.clientX, this._lastY = ke.clientY, gl();
      for (var t = document.elementFromPoint(ke.clientX, ke.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(ke.clientX, ke.clientY), t !== n); )
        n = t;
      if (x.parentNode[he]._isOutsideThisEl(t), n)
        do {
          if (n[he]) {
            var r = void 0;
            if (r = n[he]._onDragOver({
              clientX: ke.clientX,
              clientY: ke.clientY,
              target: t,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = sl(n));
      bl();
    }
  },
  _onTouchMove: function(t) {
    if (st) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = V && Ot(V, !0), l = V && a && a.a, s = V && a && a.d, u = qn && ce && jo(ce), c = (o.clientX - st.clientX + i.x) / (l || 1) + (u ? u[0] - Fr[0] : 0) / (l || 1), f = (o.clientY - st.clientY + i.y) / (s || 1) + (u ? u[1] - Fr[1] : 0) / (s || 1);
      if (!q.active && !Tt) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (V) {
        a ? (a.e += c - (Hr || 0), a.f += f - ($r || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(V, "webkitTransform", p), P(V, "mozTransform", p), P(V, "msTransform", p), P(V, "transform", p), Hr = c, $r = f, ke = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!V) {
      var t = this.options.fallbackOnBody ? document.body : Z, n = ie(x, !0, qn, !0, t), r = this.options;
      if (qn) {
        for (ce = t; P(ce, "position") === "static" && P(ce, "transform") === "none" && ce !== document; )
          ce = ce.parentNode;
        ce !== document.body && ce !== document.documentElement ? (ce === document && (ce = Ve()), n.top += ce.scrollTop, n.left += ce.scrollLeft) : ce = Ve(), Fr = jo(ce);
      }
      V = x.cloneNode(!0), be(V, r.ghostClass, !1), be(V, r.fallbackClass, !0), be(V, r.dragClass, !0), P(V, "transition", ""), P(V, "transform", ""), P(V, "box-sizing", "border-box"), P(V, "margin", 0), P(V, "top", n.top), P(V, "left", n.left), P(V, "width", n.width), P(V, "height", n.height), P(V, "opacity", "0.8"), P(V, "position", qn ? "absolute" : "fixed"), P(V, "zIndex", "100000"), P(V, "pointerEvents", "none"), q.ghost = V, t.appendChild(V), P(V, "transform-origin", Vo / parseInt(V.style.width) * 100 + "% " + zo / parseInt(V.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, i = t.dataTransfer, o = r.options;
    if (me("dragStart", this, {
      evt: t
    }), q.eventCanceled) {
      this._onDrop();
      return;
    }
    me("setupClone", this), q.eventCanceled || (te = fl(x), te.removeAttribute("id"), te.draggable = !1, te.style["will-change"] = "", this._hideClone(), be(te, this.options.chosenClass, !1), q.clone = te), r.cloneId = Yn(function() {
      me("clone", r), !q.eventCanceled && (r.options.removeCloneOnHide || Z.insertBefore(te, x), r._hideClone(), de({
        sortable: r,
        name: "clone"
      }));
    }), !n && be(x, o.dragClass, !0), n ? (dr = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (H(document, "mouseup", r._onDrop), H(document, "touchend", r._onDrop), H(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, x)), F(document, "drop", r), P(x, "transform", "translateZ(0)")), Tt = !0, r._dragStartId = Yn(r._dragStarted.bind(r, n, t)), F(document, "selectstart", r), Gt = !0, window.getSelection().removeAllRanges(), un && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = q.active, c = Rn === s, f = l.sort, p = se || u, h, m = this, v = !1;
    if (mi) return;
    function g(ae, pe) {
      me(ae, m, ze({
        evt: t,
        isOwner: c,
        axis: h ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: f,
        fromSortable: p,
        target: r,
        completed: A,
        onMove: function(xe, Ce) {
          return jn(Z, n, x, i, xe, ie(xe), t, Ce);
        },
        changed: _
      }, pe));
    }
    function y() {
      g("dragOverAnimationCapture"), m.captureAnimationState(), m !== p && p.captureAnimationState();
    }
    function A(ae) {
      return g("dragOverCompleted", {
        insertion: ae
      }), ae && (c ? u._hideClone() : u._showClone(m), m !== p && (be(x, se ? se.options.ghostClass : u.options.ghostClass, !1), be(x, l.ghostClass, !0)), se !== m && m !== q.active ? se = m : m === q.active && se && (se = null), p === m && (m._ignoreWhileAnimating = r), m.animateAll(function() {
        g("dragOverAnimationComplete"), m._ignoreWhileAnimating = null;
      }), m !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === x && !x.animated || r === n && !r.animated) && (Et = null), !l.dragoverBubble && !t.rootEl && r !== document && (x.parentNode[he]._isOutsideThisEl(t.target), !ae && ut(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), v = !0;
    }
    function _() {
      _e = Te(x), Ye = Te(x, l.draggable), de({
        sortable: m,
        name: "change",
        toEl: n,
        newIndex: _e,
        newDraggableIndex: Ye,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = Oe(r, l.draggable, n, !0), g("dragOver"), q.eventCanceled) return v;
    if (x.contains(t.target) || r.animated && r.animatingX && r.animatingY || m._ignoreWhileAnimating === r)
      return A(!1);
    if (dr = !1, u && !l.disabled && (c ? f || (a = ne !== Z) : se === this || (this.lastPutMode = Rn.checkPull(this, u, x, t)) && s.checkPut(this, u, x, t))) {
      if (h = this._getDirection(t, r) === "vertical", i = ie(x), g("dragOverValid"), q.eventCanceled) return v;
      if (a)
        return ne = Z, y(), this._hideClone(), g("revert"), q.eventCanceled || (dt ? Z.insertBefore(x, dt) : Z.appendChild(x)), A(!0);
      var O = Vi(n, l.draggable);
      if (!O || $d(t, h, this) && !O.animated) {
        if (O === x)
          return A(!1);
        if (O && n === t.target && (r = O), r && (o = ie(r)), jn(Z, n, x, i, r, o, t, !!r) !== !1)
          return y(), O && O.nextSibling ? n.insertBefore(x, O.nextSibling) : n.appendChild(x), ne = n, _(), A(!0);
      } else if (O && Hd(t, h, this)) {
        var E = Pt(n, 0, l, !0);
        if (E === x)
          return A(!1);
        if (r = E, o = ie(r), jn(Z, n, x, i, r, o, t, !1) !== !1)
          return y(), n.insertBefore(x, E), ne = n, _(), A(!0);
      } else if (r.parentNode === n) {
        o = ie(r);
        var M = 0, z, I = x.parentNode !== n, L = !Pd(x.animated && x.toRect || i, r.animated && r.toRect || o, h), W = h ? "top" : "left", R = qo(r, "top", "top") || qo(x, "top", "top"), U = R ? R.scrollTop : void 0;
        Et !== r && (z = o[W], pn = !1, Pn = !L && l.invertSwap || I), M = Fd(t, r, o, h, L ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Pn, Et === r);
        var Q;
        if (M !== 0) {
          var K = Te(x);
          do
            K -= M, Q = ne.children[K];
          while (Q && (P(Q, "display") === "none" || Q === V));
        }
        if (M === 0 || Q === r)
          return A(!1);
        Et = r, fn = M;
        var oe = r.nextElementSibling, Y = !1;
        Y = M === 1;
        var J = jn(Z, n, x, i, r, o, t, Y);
        if (J !== !1)
          return (J === 1 || J === -1) && (Y = J === 1), mi = !0, setTimeout(zd, 30), y(), Y && !oe ? n.appendChild(x) : r.parentNode.insertBefore(x, Y ? oe : r), R && dl(R, 0, U - R.scrollTop), ne = x.parentNode, z !== void 0 && !Pn && (Kn = Math.abs(z - ie(r)[W])), _(), A(!0);
      }
      if (n.contains(x))
        return A(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    H(document, "mousemove", this._onTouchMove), H(document, "touchmove", this._onTouchMove), H(document, "pointermove", this._onTouchMove), H(document, "dragover", ut), H(document, "mousemove", ut), H(document, "touchmove", ut);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    H(t, "mouseup", this._onDrop), H(t, "touchend", this._onDrop), H(t, "pointerup", this._onDrop), H(t, "pointercancel", this._onDrop), H(t, "touchcancel", this._onDrop), H(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (_e = Te(x), Ye = Te(x, r.draggable), me("drop", this, {
      evt: t
    }), ne = x && x.parentNode, _e = Te(x), Ye = Te(x, r.draggable), q.eventCanceled) {
      this._nulling();
      return;
    }
    Tt = !1, Pn = !1, pn = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), hi(this.cloneId), hi(this._dragStartId), this.nativeDraggable && (H(document, "drop", this), H(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), un && P(document.body, "user-select", ""), P(x, "transform", ""), t && (Gt && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), V && V.parentNode && V.parentNode.removeChild(V), (Z === ne || se && se.lastPutMode !== "clone") && te && te.parentNode && te.parentNode.removeChild(te), x && (this.nativeDraggable && H(x, "dragend", this), Br(x), x.style["will-change"] = "", Gt && !Tt && be(x, se ? se.options.ghostClass : this.options.ghostClass, !1), be(x, this.options.chosenClass, !1), de({
      sortable: this,
      name: "unchoose",
      toEl: ne,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Z !== ne ? (_e >= 0 && (de({
      rootEl: ne,
      name: "add",
      toEl: ne,
      fromEl: Z,
      originalEvent: t
    }), de({
      sortable: this,
      name: "remove",
      toEl: ne,
      originalEvent: t
    }), de({
      rootEl: ne,
      name: "sort",
      toEl: ne,
      fromEl: Z,
      originalEvent: t
    }), de({
      sortable: this,
      name: "sort",
      toEl: ne,
      originalEvent: t
    })), se && se.save()) : _e !== Nt && _e >= 0 && (de({
      sortable: this,
      name: "update",
      toEl: ne,
      originalEvent: t
    }), de({
      sortable: this,
      name: "sort",
      toEl: ne,
      originalEvent: t
    })), q.active && ((_e == null || _e === -1) && (_e = Nt, Ye = dn), de({
      sortable: this,
      name: "end",
      toEl: ne,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    me("nulling", this), Z = x = ne = V = dt = te = Xn = et = st = ke = Gt = _e = Ye = Nt = dn = Et = fn = se = Rn = q.dragged = q.ghost = q.clone = q.active = null, pr.forEach(function(t) {
      t.checked = !0;
    }), pr.length = Hr = $r = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        x && (this._onDragOver(t), Vd(t));
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
      n = r[i], Oe(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Wd(n));
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
      Oe(l, this.options.draggable, i, !1) && (r[o] = l);
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
    return Oe(t, n || this.options.draggable, this.el, !1);
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
    var i = Cn.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && hl(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    me("destroy", this);
    var t = this.el;
    t[he] = null, H(t, "mousedown", this._onTapStart), H(t, "touchstart", this._onTapStart), H(t, "pointerdown", this._onTapStart), this.nativeDraggable && (H(t, "dragover", this), H(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), fr.splice(fr.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!et) {
      if (me("hideClone", this), q.eventCanceled) return;
      P(te, "display", "none"), this.options.removeCloneOnHide && te.parentNode && te.parentNode.removeChild(te), et = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (et) {
      if (me("showClone", this), q.eventCanceled) return;
      x.parentNode == Z && !this.options.group.revertClone ? Z.insertBefore(te, x) : dt ? Z.insertBefore(te, dt) : Z.appendChild(te), this.options.group.revertClone && this.animate(x, te), P(te, "display", ""), et = !1;
    }
  }
};
function Vd(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function jn(e, t, n, r, i, o, a, l) {
  var s, u = e[he], c = u.options.onMove, f;
  return window.CustomEvent && !Je && !xn ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || ie(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), c && (f = c.call(u, s, a)), f;
}
function Br(e) {
  e.draggable = !1;
}
function zd() {
  mi = !1;
}
function Hd(e, t, n) {
  var r = ie(Pt(n.el, 0, n.options, !0)), i = pl(n.el, n.options, V), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function $d(e, t, n) {
  var r = ie(Vi(n.el, n.options.draggable)), i = pl(n.el, n.options, V), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Fd(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, c = r ? n.top : n.left, f = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && Kn < u * i) {
      if (!pn && (fn === 1 ? s > c + u * o / 2 : s < f - u * o / 2) && (pn = !0), pn)
        p = !0;
      else if (fn === 1 ? s < c + Kn : s > f - Kn)
        return -fn;
    } else if (s > c + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return Bd(t);
  }
  return p = p || a, p && (s < c + u * o / 2 || s > f - u * o / 2) ? s > c + u / 2 ? 1 : -1 : 0;
}
function Bd(e) {
  return Te(x) < Te(e) ? 1 : -1;
}
function Wd(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Ud(e) {
  pr.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && pr.push(r);
  }
}
function Yn(e) {
  return setTimeout(e, 0);
}
function hi(e) {
  return clearTimeout(e);
}
xr && F(document, "touchmove", function(e) {
  (q.active || Tt) && e.cancelable && e.preventDefault();
});
q.utils = {
  on: F,
  off: H,
  css: P,
  find: ul,
  is: function(t, n) {
    return !!Oe(t, n, t, !1);
  },
  extend: kd,
  throttle: cl,
  closest: Oe,
  toggleClass: be,
  clone: fl,
  index: Te,
  nextTick: Yn,
  cancelNextTick: hi,
  detectDirection: ml,
  getChild: Pt,
  expando: he
};
q.get = function(e) {
  return e[he];
};
q.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (q.utils = ze(ze({}, q.utils), r.utils)), Cn.mount(r);
  });
};
q.create = function(e, t) {
  return new q(e, t);
};
q.version = Td;
var re = [], Zt, gi, bi = !1, Wr, Ur, vr, Qt;
function Jd() {
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
      this.sortable.nativeDraggable ? F(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? F(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? F(document, "touchmove", this._handleFallbackAutoScroll) : F(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? H(document, "dragover", this._handleAutoScroll) : (H(document, "pointermove", this._handleFallbackAutoScroll), H(document, "touchmove", this._handleFallbackAutoScroll), H(document, "mousemove", this._handleFallbackAutoScroll)), $o(), Gn(), Nd();
    },
    nulling: function() {
      vr = gi = Zt = bi = Qt = Wr = Ur = null, re.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (vr = n, r || this.options.forceAutoScrollFallback || xn || Je || un) {
        Jr(n, this.options, l, r);
        var s = nt(l, !0);
        bi && (!Qt || o !== Wr || a !== Ur) && (Qt && $o(), Qt = setInterval(function() {
          var u = nt(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, Gn()), Jr(n, i.options, u, r);
        }, 10), Wr = o, Ur = a);
      } else {
        if (!this.options.bubbleScroll || nt(l, !0) === Ve()) {
          Gn();
          return;
        }
        Jr(n, this.options, nt(l, !1), !1);
      }
    }
  }, Ue(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Gn() {
  re.forEach(function(e) {
    clearInterval(e.pid);
  }), re = [];
}
function $o() {
  clearInterval(Qt);
}
var Jr = cl(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ve(), u = !1, c;
    gi !== n && (gi = n, Gn(), Zt = t.scroll, c = t.scrollFn, Zt === !0 && (Zt = nt(n, !0)));
    var f = 0, p = Zt;
    do {
      var h = p, m = ie(h), v = m.top, g = m.bottom, y = m.left, A = m.right, _ = m.width, O = m.height, E = void 0, M = void 0, z = h.scrollWidth, I = h.scrollHeight, L = P(h), W = h.scrollLeft, R = h.scrollTop;
      h === s ? (E = _ < z && (L.overflowX === "auto" || L.overflowX === "scroll" || L.overflowX === "visible"), M = O < I && (L.overflowY === "auto" || L.overflowY === "scroll" || L.overflowY === "visible")) : (E = _ < z && (L.overflowX === "auto" || L.overflowX === "scroll"), M = O < I && (L.overflowY === "auto" || L.overflowY === "scroll"));
      var U = E && (Math.abs(A - i) <= a && W + _ < z) - (Math.abs(y - i) <= a && !!W), Q = M && (Math.abs(g - o) <= a && R + O < I) - (Math.abs(v - o) <= a && !!R);
      if (!re[f])
        for (var K = 0; K <= f; K++)
          re[K] || (re[K] = {});
      (re[f].vx != U || re[f].vy != Q || re[f].el !== h) && (re[f].el = h, re[f].vx = U, re[f].vy = Q, clearInterval(re[f].pid), (U != 0 || Q != 0) && (u = !0, re[f].pid = setInterval(function() {
        r && this.layer === 0 && q.active._onTouchMove(vr);
        var oe = re[this.layer].vy ? re[this.layer].vy * l : 0, Y = re[this.layer].vx ? re[this.layer].vx * l : 0;
        typeof c == "function" && c.call(q.dragged.parentNode[he], Y, oe, e, vr, re[this.layer].el) !== "continue" || dl(re[this.layer].el, Y, oe);
      }.bind({
        layer: f
      }), 24))), f++;
    } while (t.bubbleScroll && p !== s && (p = nt(p, !1)));
    bi = u;
  }
}, 30), yl = function(t) {
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
function zi() {
}
zi.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = Pt(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: yl
};
Ue(zi, {
  pluginName: "revertOnSpill"
});
function Hi() {
}
Hi.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: yl
};
Ue(Hi, {
  pluginName: "removeOnSpill"
});
q.mount(new Jd());
q.mount(Hi, zi);
const Lt = /* @__PURE__ */ new WeakMap(), Zn = /* @__PURE__ */ new WeakMap();
function Xd(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Vn = /* @__PURE__ */ new WeakMap();
function Kd(e, t) {
  let n = e.from;
  e.oldIndex < e.newIndex ? n.insertBefore(e.item, n.children[e.oldIndex]) : n.insertBefore(e.item, n.children[e.oldIndex + 1]);
  let r = t.splice(e.oldIndex, 1)[0];
  t.splice(e.newIndex, 0, r);
}
function Yd(e, t, n) {
  let r = e.item, i = Zn.get(r);
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
const Gd = {
  mounted(e, t, n) {
    let r = Ie(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Xd(i), l = i.horizontal ? "horizontal" : "vertical";
    Vn.set(e, t);
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
        let h = Vn.get(e), m = h ? h.value : null;
        Array.isArray(m) ? Kd(p, m) : typeof m == "string" && r && Yd(p, m, r);
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let f = q.create(e, u);
    Lt.set(e, f);
  },
  updated(e, t) {
    Vn.set(e, t);
    let n = Lt.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = Lt.get(e);
    t && (t.destroy(), Lt.delete(e)), Vn.delete(e);
  }
}, Zd = {
  mounted(e, t) {
    let n = t.value;
    Zn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    Zn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (Zn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Qd = {
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
}, ef = {
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
}, tf = {
  mounted(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = Lt.get(e);
    r && r.option("group", n);
  },
  updated(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = Lt.get(e);
    r && r.option("group", n);
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, nf = B("dblclick"), rf = B("mousedown"), of = B("mouseup"), af = B("mouseenter"), lf = B("mouseleave"), sf = B("mouseover"), uf = B("mouseout"), cf = B("mousemove"), df = B("contextmenu"), ff = B("keydown", { isKeyboardEvent: !0 }), pf = B("keyup", { isKeyboardEvent: !0 }), vf = B("keypress", { isKeyboardEvent: !0 }), mf = B("focus"), hf = B("focusin"), gf = B("focusout"), bf = B("touchstart"), yf = B("touchend"), _f = B("touchmove"), wf = B("touchcancel"), Ef = B("change"), Sf = B("input"), xf = B("reset"), Cf = B("dragstart"), Tf = B("dragend"), Af = B("dragenter"), kf = B("dragleave"), Nf = B("dragover"), Lf = B("drop"), Df = B("copy"), Of = B("cut"), Mf = B("paste"), If = B("wheel"), Rf = B("resize");
function Pf() {
  N("init", Dc), N("submit", Oc), N("intersect", Mc), N("current", Pc), N("ignore", qc), N("model-livue", $c), N("debounce", bd), N("throttle", yd), N("blur", _d), N("enter", wd), N("boolean", Ed), N("poll", Wc), N("offline", Jc), N("transition", xc), N("replace", Xc), N("loading", Gc), N("target", Zc), N("stream", Qc), N("click", rd), N("navigate", id), N("scroll", od), N("dirty", ad), N("watch", cd), N("sort", Gd), N("sort-item", Zd), N("sort-handle", Qd), N("sort-ignore", ef), N("sort-group", tf), N("dblclick", nf), N("mousedown", rf), N("mouseup", of), N("mouseenter", af), N("mouseleave", lf), N("mouseover", sf), N("mouseout", uf), N("mousemove", cf), N("contextmenu", df), N("keydown", ff), N("keyup", pf), N("keypress", vf), N("focus", mf), N("focusin", hf), N("focusout", gf), N("touchstart", bf), N("touchend", yf), N("touchmove", _f), N("touchcancel", wf), N("change", Ef), N("input", Sf), N("reset", xf), N("dragstart", Cf), N("dragend", Tf), N("dragenter", Af), N("dragleave", kf), N("dragover", Nf), N("drop", Lf), N("copy", Df), N("cut", Of), N("paste", Mf), N("wheel", If), N("resize", Rf);
}
var En = !1, yi = [];
function _l() {
  if (!En) {
    En = !0, console.log("[LiVue] Debug mode enabled");
    var e = wa();
    e.forEach(function(t) {
      var n = Ne(t, function(r) {
        var i = {};
        r.component && (i.componentId = r.component.id, i.componentName = r.component.name), r.el && (i.element = r.el.tagName), r.url && (i.url = r.url), r.updateCount !== void 0 && (i.updateCount = r.updateCount), r.lazyCount !== void 0 && (i.lazyCount = r.lazyCount), r.success !== void 0 && (i.success = r.success), r.error && (i.error = r.error.message || String(r.error)), r.isChild !== void 0 && (i.isChild = r.isChild), console.log("[LiVue] " + t + ":", i);
      });
      yi.push(n);
    });
  }
}
function qf() {
  En && (En = !1, console.log("[LiVue] Debug mode disabled"), yi.forEach(function(e) {
    e();
  }), yi = []);
}
function Fo() {
  return En;
}
function zn(e, t) {
  var n = [];
  if (e.tagName && e.tagName.toLowerCase() === "livue-lazy" && Bo(e) && n.push(e), e.querySelectorAll) {
    var r = e.querySelectorAll("livue-lazy");
    r.forEach(function(i) {
      Bo(i) && n.push(i);
    });
  }
  n.forEach(function(i) {
    jf(i, t);
  });
}
function Bo(e) {
  if (e.dataset.livueLazyWrapped)
    return !1;
  for (var t = e.parentElement; t; ) {
    if (t.hasAttribute("data-livue-id"))
      return !1;
    t = t.parentElement;
  }
  return !0;
}
function jf(e, t) {
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
let Ge = null, Wt = null, Wo = !1;
function Vf() {
  if (Wo)
    return;
  Wo = !0;
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
function zf() {
  return Ge || (Vf(), Ge = document.createElement("div"), Ge.className = "livue-hmr-indicator", document.body.appendChild(Ge), Ge);
}
function Hn(e, t) {
  const n = zf();
  switch (Wt && (clearTimeout(Wt), Wt = null), e) {
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
            `, Wt = setTimeout(function() {
        Uo();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, Wt = setTimeout(function() {
        Uo();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Uo() {
  Ge && Ge.classList.remove("visible");
}
let ht = null, Cr = !0, wl = !0, en = !0, Qn = [];
function Hf(e) {
  ht = e;
}
async function $f(e) {
  if (Cr) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), en && Hn("updating", e.fileName), Qn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = wl ? Ff() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), en && Hn("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), ht.reboot(), t && (await Wf(), Bf(t)), en && Hn("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), en && Hn("error");
    }
  }
}
function Ff() {
  const e = /* @__PURE__ */ new Map();
  return ht && ht.all().forEach(function(n) {
    if (Jo(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Jo(r, i.name, i.state, e);
      }
  }), e;
}
function Jo(e, t, n, r) {
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
function Bf(e) {
  ht && e.forEach(function(t, n) {
    const r = ht.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function Wf() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Uf() {
  return typeof import.meta < "u" && !1;
}
function Jf() {
  Cr = !0;
}
function Xf() {
  Cr = !1;
}
function Kf() {
  return Cr;
}
function Yf(e) {
  e.indicator !== void 0 && (en = e.indicator), e.preserveState !== void 0 && (wl = e.preserveState);
}
function Gf(e) {
  return Qn.push(e), function() {
    const t = Qn.indexOf(e);
    t !== -1 && Qn.splice(t, 1);
  };
}
async function Zf() {
  ht && await $f({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
const Qf = {
  name: "livue:progress",
  install(e) {
    e.hook("request.started", function() {
      ti() && ma();
    }), e.hook("request.finished", function() {
      ti() && Ei();
    });
  }
}, ep = {
  name: "livue:devtools",
  install(e, t, n) {
    Ka(n);
  }
}, tp = {
  name: "livue:debug",
  install(e, t) {
    t && t.enabled && _l();
  }
};
class np {
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
    js(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    Nn(Qf), Nn(ep), Nn(tp), _c(this), Pf(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), zn(document.body, this._initComponent.bind(this)), ps(this), this._startObserver(), Hf(this);
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
    }.bind(this)), zn(document.body, this._initComponent.bind(this)), this._startObserver();
  }
  /**
   * Reboot but preserve certain components (don't destroy them).
   * Used during SPA navigation with @persist elements.
   */
  rebootPreserving() {
    document.querySelectorAll("[data-livue-id]").forEach(function(r) {
      this._isRoot(r) && this._initComponent(r);
    }.bind(this)), zn(document.body, this._initComponent.bind(this));
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
    Sn(t, !0, !1);
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
    fs(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return br(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    Si();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return ks();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return nr;
  }
  /**
   * Get the error overlay API.
   * Used internally by the request pool to display server HTML error pages
   * (Ignition / Whoops / dd()) when APP_DEBUG is enabled server-side.
   *
   * @returns {object} { configure, show, close, isEnabled, maybeShowFromResponse }
   */
  get errorOverlay() {
    return Ms;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: gt(),
      ...Ks()
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
    let r = new Lc(t);
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
    return Ne(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return wa();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), no();
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
    }), no();
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
    }.bind(this)), zn(t, this._initComponent.bind(this));
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
    return Nn(t, n), this;
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
    return yc(t), this;
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
    return ec;
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
      isAvailable: Uf,
      isEnabled: Kf,
      enable: Jf,
      disable: Xf,
      configure: Yf,
      onUpdate: Gf,
      trigger: Zf
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
    return t ? _l() : qf(), Fo();
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return Fo();
  }
}
const Ut = new np();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = Ml, document.head.appendChild(e);
}
if (!window.LiVue) {
  var ge = window.LiVueConfig || {};
  (ge.showProgressBar !== void 0 || ge.progressBarColor !== void 0 || ge.prefetch !== void 0 || ge.prefetchOnHover !== void 0 || ge.hoverDelay !== void 0 || ge.cachePages !== void 0 || ge.maxCacheSize !== void 0 || ge.restoreScroll !== void 0) && Ut.configureNavigation(ge), ge.showProgressOnRequest !== void 0 && Ut.progress.configure({ showOnRequest: ge.showProgressOnRequest }), ge.debug !== void 0 && Ut.errorOverlay.configure({ enabled: !!ge.debug });
  let e = !1;
  const t = () => {
    e || (e = !0, Ut.boot());
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", t, { once: !0 }) : document.readyState === "interactive" ? (document.addEventListener("DOMContentLoaded", t, { once: !0 }), window.addEventListener("load", t, { once: !0 })) : queueMicrotask(t), window.LiVue = Ut;
}
const ip = window.LiVue;
export {
  tp as DebugPlugin,
  ep as DevtoolsPlugin,
  Qf as ProgressPlugin,
  ip as default
};
//# sourceMappingURL=livue.esm.js.map
