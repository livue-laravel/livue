import * as pn from "vue";
import { reactive as Le, toRefs as Ro, effectScope as Po, ref as tn, markRaw as qo, hasInjectionContext as ll, inject as Vo, isRef as $n, isReactive as jo, toRaw as sl, getCurrentScope as ul, onScopeDispose as cl, watch as Te, nextTick as rr, computed as zo, provide as dl, onBeforeUnmount as fl, onBeforeMount as pl, onUnmounted as Ho, onMounted as $o, readonly as vl, watchEffect as ml, shallowRef as si, defineComponent as hl, h as Ni, createApp as gl } from "vue";
const bl = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Fo(e, t) {
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
function ki(e) {
  return JSON.stringify(e, Fo);
}
function qr(e) {
  return Le(Object.assign({}, e));
}
function yl(e, t) {
  let n;
  for (n in t) {
    let r = ki(e[n]), i = ki(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function Bo(e) {
  return JSON.parse(JSON.stringify(e, Fo));
}
function _l(e) {
  return Ro(e);
}
function mr(e, t) {
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
function qt(e, t, n) {
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
function vn(e, t) {
  let n = {}, r = Bo(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function wl(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function Vr(e) {
  if (wl(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(Vr);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = Vr(e[n]);
    return t;
  }
  return e;
}
function Et(e) {
  let t = {};
  for (let n in e)
    t[n] = Vr(e[n]);
  return t;
}
let Li = 0;
function El() {
  return Li++, Li;
}
let Wo = /* @__PURE__ */ new Map();
function Sl(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function xl(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Uo(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Wo.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: Sl(n)
    });
  });
}
function Jo(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Wo.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && xl(n, i.inputs));
  });
}
let Xo;
const ir = (e) => Xo = e, Ko = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function jr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Bt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Bt || (Bt = {}));
function Di() {
  const e = Po(!0), t = e.run(() => tn({}));
  let n = [], r = [];
  const i = qo({
    install(o) {
      ir(i), i._a = o, o.provide(Ko, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const Yo = () => {
};
function Oi(e, t, n, r = Yo) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && ul() && cl(i), i;
}
function st(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const Cl = (e) => e(), Mi = /* @__PURE__ */ Symbol(), hr = /* @__PURE__ */ Symbol();
function zr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    jr(i) && jr(r) && e.hasOwnProperty(n) && !$n(r) && !jo(r) ? e[n] = zr(i, r) : e[n] = r;
  }
  return e;
}
const Tl = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Al(e) {
  return !jr(e) || !Object.prototype.hasOwnProperty.call(e, Tl);
}
const { assign: He } = Object;
function Nl(e) {
  return !!($n(e) && e.effect);
}
function kl(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const d = Ro(n.state.value[e]);
    return He(d, o, Object.keys(a || {}).reduce((c, p) => (c[p] = qo(zo(() => {
      ir(n);
      const h = n._s.get(e);
      return a[p].call(h, h);
    })), c), {}));
  }
  return s = Go(e, u, t, n, r, !0), s;
}
function Go(e, t, n = {}, r, i, o) {
  let a;
  const l = He({ actions: {} }, n), s = { deep: !0 };
  let u, d, c = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), h;
  const v = r.state.value[e];
  !o && !v && (r.state.value[e] = {}), tn({});
  let m;
  function g(P) {
    let D;
    u = d = !1, typeof P == "function" ? (P(r.state.value[e]), D = {
      type: Bt.patchFunction,
      storeId: e,
      events: h
    }) : (zr(r.state.value[e], P), D = {
      type: Bt.patchObject,
      payload: P,
      storeId: e,
      events: h
    });
    const M = m = /* @__PURE__ */ Symbol();
    rr().then(() => {
      m === M && (u = !0);
    }), d = !0, st(c, D, r.state.value[e]);
  }
  const b = o ? function() {
    const { state: D } = n, M = D ? D() : {};
    this.$patch(($) => {
      He($, M);
    });
  } : (
    /* istanbul ignore next */
    Yo
  );
  function w() {
    a.stop(), c.clear(), p.clear(), r._s.delete(e);
  }
  const T = (P, D = "") => {
    if (Mi in P)
      return P[hr] = D, P;
    const M = function() {
      ir(r);
      const $ = Array.from(arguments), Z = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Set();
      function U(X) {
        Z.add(X);
      }
      function Y(X) {
        K.add(X);
      }
      st(p, {
        args: $,
        name: M[hr],
        store: E,
        after: U,
        onError: Y
      });
      let J;
      try {
        J = P.apply(this && this.$id === e ? this : E, $);
      } catch (X) {
        throw st(K, X), X;
      }
      return J instanceof Promise ? J.then((X) => (st(Z, X), X)).catch((X) => (st(K, X), Promise.reject(X))) : (st(Z, J), J);
    };
    return M[Mi] = !0, M[hr] = D, M;
  }, O = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Oi.bind(null, p),
    $patch: g,
    $reset: b,
    $subscribe(P, D = {}) {
      const M = Oi(c, P, D.detached, () => $()), $ = a.run(() => Te(() => r.state.value[e], (Z) => {
        (D.flush === "sync" ? d : u) && P({
          storeId: e,
          type: Bt.direct,
          events: h
        }, Z);
      }, He({}, s, D)));
      return M;
    },
    $dispose: w
  }, E = Le(O);
  r._s.set(e, E);
  const j = (r._a && r._a.runWithContext || Cl)(() => r._e.run(() => (a = Po()).run(() => t({ action: T }))));
  for (const P in j) {
    const D = j[P];
    if ($n(D) && !Nl(D) || jo(D))
      o || (v && Al(D) && ($n(D) ? D.value = v[P] : zr(D, v[P])), r.state.value[e][P] = D);
    else if (typeof D == "function") {
      const M = T(D, P);
      j[P] = M, l.actions[P] = D;
    }
  }
  return He(E, j), He(sl(E), j), Object.defineProperty(E, "$state", {
    get: () => r.state.value[e],
    set: (P) => {
      g((D) => {
        He(D, P);
      });
    }
  }), r._p.forEach((P) => {
    He(E, a.run(() => P({
      store: E,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), v && o && n.hydrate && n.hydrate(E.$state, v), u = !0, d = !0, E;
}
// @__NO_SIDE_EFFECTS__
function Ll(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = ll();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Vo(Ko, null) : null), a && ir(a), a = Xo, a._s.has(e) || (i ? Go(e, t, r, a) : kl(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let nn = /* @__PURE__ */ new Map();
function Dl(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function Vt(e, t, n) {
  return Dl(n) === "global" ? t : e + ":" + t;
}
function Zo(e) {
  return JSON.parse(JSON.stringify(e));
}
function Ol(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(Zo(t));
}
function ui(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = Vt(e, t, r), a = nn.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ Ll(o, n), definition: n }, nn.set(o, a)), a.useStore(i);
}
function it(e, t, n, r) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
  let i = n && n.scope ? n.scope : "auto", o = [];
  i === "component" ? o.push(Vt(e, t, { scope: "component" })) : i === "global" ? o.push(Vt(e, t, { scope: "global" })) : (o.push(Vt(e, t, { scope: "component" })), o.push(Vt(e, t, { scope: "global" })));
  for (let a = 0; a < o.length; a++) {
    let l = nn.get(o[a]);
    if (l)
      return l.useStore(r);
  }
  return null;
}
function Ml(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = Et(o.state || {}), s = it(e, o.name, { scope: a }, n);
    if (s) {
      Ol(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return Zo(l);
      }
    }, d = ui(e, o.name, u, { scope: a }, n);
    r[o.name] = d;
  }
  return r;
}
function Il(e) {
  let t = e + ":", n = Array.from(nn.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && nn.delete(n[r]);
}
let Qo = {
  ref: tn,
  computed: zo,
  watch: Te,
  watchEffect: ml,
  reactive: Le,
  readonly: vl,
  onMounted: $o,
  onUnmounted: Ho,
  onBeforeMount: pl,
  onBeforeUnmount: fl,
  nextTick: rr,
  provide: dl,
  inject: Vo
}, Hr = Object.keys(Qo), Rl = Hr.map(function(e) {
  return Qo[e];
});
function Ii(e) {
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
function Pl(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(m) {
    return t[m];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(m) {
    return a[m];
  });
  function u(m) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(m);
  }
  function d(m, g, b) {
    let w = n && n.$id ? n.$id : "", T = n && n._pinia ? n._pinia : void 0;
    if (g === void 0) {
      let O = it(w, m, b || {}, T);
      if (O)
        return O;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return ui(w, m, g, b, T);
  }
  function c(m) {
    let g = n && n.$id ? n.$id : "", b = n && n._pinia ? n._pinia : void 0, w = it(g, m, { scope: "auto" }, b);
    if (!w)
      throw new Error('[LiVue] useStore("' + m + '"): store not found.');
    return w;
  }
  let p = [], h = [];
  function v(m, g) {
    if (!u(m))
      return;
    let b = p.indexOf(m);
    if (b === -1) {
      p.push(m), h.push(g);
      return;
    }
    h[b] = g;
  }
  for (let m = 0; m < Hr.length; m++)
    v(Hr[m], Rl[m]);
  for (let m = 0; m < i.length; m++)
    v(i[m], o[m]);
  for (let m = 0; m < l.length; m++)
    v(l[m], s[m]);
  v("livue", n), v("store", d), v("useStore", c);
  try {
    let g = new (Function.prototype.bind.apply(
      Function,
      [null].concat(p).concat([e])
    ))().apply(null, h);
    return g && typeof g == "object" ? g : null;
  } catch (m) {
    return console.error("[LiVue] Error executing @script setup code:", m), null;
  }
}
function ql(e) {
  for (var t = ["debounce", "throttle"], n = 0; n < t.length; n++) {
    var r = t[n], i = new RegExp("v-model\\." + r + `(?:\\.(\\d+)(ms)?)?=["']([^"']+)["']`, "g");
    e = e.replace(i, /* @__PURE__ */ (function(u) {
      return function(d, c, p, h) {
        var v = c ? "." + c + (p || "ms") : "";
        return 'v-model="' + h + '" v-' + u + ":" + h + v;
      };
    })(r));
  }
  for (var o = ["blur", "enter"], a = 0; a < o.length; a++) {
    var l = o[a], s = new RegExp("v-model\\." + l + `=["']([^"']+)["']`, "g");
    e = e.replace(s, /* @__PURE__ */ (function(u) {
      return function(d, c) {
        return 'v-model="' + c + '" v-' + u + ":" + c;
      };
    })(l));
  }
  return e;
}
const Ri = [
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
function Vl(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function jl(e) {
  let t = e.replace(/\$errors\b/g, "lvErrors");
  for (let n = 0; n < Ri.length; n++) {
    let r = Ri[n], i = new RegExp(Vl(r) + "\\b(?=\\s*\\()", "g");
    t = t.replace(i, "livue." + r);
  }
  return t;
}
function Pi(e) {
  return jl(ql(e));
}
function ea(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      ea(e.children[t]);
}
function qi(e, t, n) {
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
var zl = {
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
}, Hl = /^[a-zA-Z][a-zA-Z0-9_]*$/;
function gr(e, t) {
  return typeof e != "string" || zl[e] || !Hl.test(e) ? !1 : Array.isArray(t) ? t.indexOf(e) !== -1 : !0;
}
function $r(e, t, n, r, i, o) {
  let a = Ii(e);
  a.html = Pi(a.html);
  let l;
  try {
    l = pn.compile(a.html);
  } catch (h) {
    console.error('[LiVue] Template compilation error in "' + (o || "unknown") + '":', h), l = pn.compile(
      '<div style="padding:8px;border:2px solid #f00;color:#f00;font-family:monospace">[LiVue] Template error: ' + (h.message || "compilation failed") + "</div>"
    );
  }
  let s = si(l), u = [], d = !1;
  function c(h, v) {
    let m = s.value;
    d = !0;
    let g;
    try {
      g = m(h, u);
    } finally {
      d = !1;
    }
    return ea(g), g;
  }
  c._rc = !0;
  let p = {
    name: o || "LiVueComponent",
    render: c,
    setup: function() {
      pn.provide("livue", n);
      let h = _l(t);
      var v = new Proxy(n.errors, {
        get: function(g, b, w) {
          var T = Reflect.get(g, b, w);
          return Array.isArray(T) ? T[0] : T;
        }
      });
      let m = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: v });
      if (a.setupCode) {
        let g = Pl(a.setupCode, h, n, r);
        g && Object.assign(m, g);
      }
      return new Proxy(m, {
        get: function(g, b, w) {
          if (b in g || typeof b == "symbol") return Reflect.get(g, b, w);
          if (gr(b, n._callableMethods)) {
            var T = function() {
              var O = Array.prototype.slice.call(arguments);
              if (d) {
                var E = function() {
                  return n.call(b, ...O);
                };
                return qi(E, b, O);
              }
              return n.call(b, ...O);
            };
            return qi(T, b);
          }
        },
        getOwnPropertyDescriptor: function(g, b) {
          var w = Object.getOwnPropertyDescriptor(g, b);
          if (w) return w;
          if (gr(b, n._callableMethods))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(g, b) {
          return !!(b in g || gr(b, n._callableMethods));
        },
        set: function(g, b, w) {
          return g[b] = w, !0;
        },
        ownKeys: function(g) {
          return Reflect.ownKeys(g);
        }
      });
    }
  };
  return p._updateRender = function(h) {
    try {
      let v = Ii(h), m = pn.compile(Pi(v.html));
      if (m === s.value) return;
      u.length = 0, s.value = m;
    } catch (v) {
      console.error('[LiVue] Template update compilation error in "' + (o || "unknown") + '":', v);
    }
  }, p;
}
let et = null;
function Tt() {
  if (et)
    return et;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return et = e.getAttribute("content"), et;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (et = decodeURIComponent(t[1]), et) : null;
}
function $l() {
  et = null;
}
let le = {
  color: "#29d",
  height: "2px",
  showOnRequest: !1,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, ce = null, Fr = null, he = null, Fn = !1, Wt = 0;
function Fl(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function Bl(e) {
  return (-1 + e) * 100;
}
function ta() {
  if (Fn) return;
  Fn = !0;
  let e = document.createElement("style");
  e.id = "livue-progress-styles", e.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${le.height};
            background: ${le.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${le.speed}ms ${le.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${le.color}, 0 0 5px ${le.color};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
        }
        .livue-progress-bar.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${le.speed}ms ${le.easing};
        }
    `, document.head.appendChild(e);
}
function Wl() {
  if (he) return;
  ta(), he = document.createElement("div"), he.className = "livue-progress-bar livue-progress-hidden", he.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(le.parent) || document.body).appendChild(he);
}
function Ul() {
  if (!Fn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), Fn = !1, ta());
}
function Jl(e) {
  Object.assign(le, e), Ul();
}
function Br() {
  return le.showOnRequest;
}
function na() {
  Wt++, ce === null && (Wl(), ce = 0, he && he.classList.remove("livue-progress-hidden"), or(le.minimum), le.trickle && (Fr = setInterval(function() {
    ra();
  }, le.trickleSpeed)));
}
function or(e) {
  ce !== null && (e = Fl(e, le.minimum, 1), ce = e, he && (he.style.transform = "translate3d(" + Bl(e) + "%, 0, 0)"));
}
function ra() {
  if (ce === null || ce >= 1) return;
  let e;
  ce < 0.2 ? e = 0.1 : ce < 0.5 ? e = 0.04 : ce < 0.8 ? e = 0.02 : ce < 0.99 ? e = 5e-3 : e = 0, or(ce + e);
}
function ci() {
  Wt = Math.max(0, Wt - 1), !(Wt > 0) && ce !== null && (or(1), clearInterval(Fr), Fr = null, setTimeout(function() {
    he && he.classList.add("livue-progress-hidden"), setTimeout(function() {
      ce = null, he && (he.style.transform = "translate3d(-100%, 0, 0)");
    }, le.speed);
  }, le.speed));
}
function Xl() {
  Wt = 0, ci();
}
function Kl() {
  return ce !== null;
}
function Yl() {
  return ce;
}
const Bn = {
  configure: Jl,
  start: na,
  set: or,
  trickle: ra,
  done: ci,
  forceDone: Xl,
  isStarted: Kl,
  getStatus: Yl,
  isRequestProgressEnabled: Br
};
var jt = null, Vi = !1, yt = !1, ye = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, De = /* @__PURE__ */ new Map(), nt = /* @__PURE__ */ new Map(), Wr = /* @__PURE__ */ new WeakMap(), Ln = /* @__PURE__ */ new Map(), Je = null;
function Gl(e) {
  Object.assign(ye, e), e.progressBarColor && Bn.configure({ color: e.progressBarColor });
}
function Zl(e) {
  jt = e, !Vi && (Vi = !0, Je = ia(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Je },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (oa(Je), Je = t.state.pageKey, cn(t.state.url, !1, !0));
  }), es());
}
function ia() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function oa(e) {
  if (!(!ye.restoreScroll || !e)) {
    Ln.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Ln.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Ln.set(e, i);
      }
    });
  }
}
function Ql(e) {
  if (!(!ye.restoreScroll || !e)) {
    var t = Ln.get(e);
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
function es() {
  document.addEventListener("click", ts, !0), ye.prefetch && (document.addEventListener("mouseenter", rs, !0), document.addEventListener("mouseleave", is, !0), document.addEventListener("mousedown", os, !0), document.addEventListener("focus", as, !0));
}
function ts(e) {
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
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), cn(n, !0, !1));
      }
    }
  }
}
function ns(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function rs(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ye.prefetchOnHover)) {
      var n = ns(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            ar(r);
          }, ye.hoverDelay);
          Wr.set(t, i);
        }
      }
    }
  }
}
function is(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = Wr.get(t);
      n && (clearTimeout(n), Wr.delete(t));
    }
  }
}
function os(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || ar(n);
    }
  }
}
function as(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ye.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || ar(n);
    }
  }
}
function ar(e) {
  var t = new URL(e, location.origin).href;
  if (nt.has(t))
    return nt.get(t);
  if (De.has(t))
    return Promise.resolve(De.get(t).html);
  var n = fetch(t, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "X-LiVue-Navigate": "1",
      "X-LiVue-Prefetch": "1"
    },
    credentials: "same-origin"
  }).then(function(r) {
    return nt.delete(t), r.ok ? r.text().then(function(i) {
      return ye.cachePages && aa(t, i), i;
    }) : null;
  }).catch(function(r) {
    return nt.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return nt.set(t, n), n;
}
function aa(e, t) {
  for (var n = new DOMParser(), r = n.parseFromString(t, "text/html"), i = r.querySelector("title"); De.size >= ye.maxCacheSize; ) {
    var o = De.keys().next().value;
    De.delete(o);
  }
  De.set(e, {
    html: t,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function di() {
  De.clear();
}
function fi(e) {
  yt || !e || !e.url || (e.navigate ? (De.clear(), cn(e.url, !0, !1)) : (yt = !0, window.location.href = e.url));
}
async function cn(e, t, n) {
  if (!yt) {
    if (!jt) {
      window.location.href = e;
      return;
    }
    var r = new URL(e, location.origin).href, i = new CustomEvent("livue:navigate", {
      detail: {
        url: r,
        cached: De.has(r),
        isPopstate: n || !1
      },
      cancelable: !0
    });
    if (window.dispatchEvent(i)) {
      yt = !0, n || oa(Je), ye.showProgressBar && Bn.start();
      try {
        var o, a = De.get(r);
        if (a)
          o = a.html;
        else if (nt.has(r))
          o = await nt.get(r);
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
          o = await l.text(), ye.cachePages && aa(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(b) {
              typeof b == "function" && b(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = ls(), p = /* @__PURE__ */ new Set();
        c.forEach(function(b) {
          b.livueIds.forEach(function(w) {
            p.add(w);
          });
        }), jt._stopObserver(), jt.destroyExcept(p), c.forEach(function(b) {
          b.element.parentNode && b.element.parentNode.removeChild(b.element);
        });
        var h = u.querySelector("title");
        h && (document.title = h.textContent), document.body.innerHTML = u.body.innerHTML, ss(c);
        var v = u.querySelector('meta[name="csrf-token"]'), m = document.querySelector('meta[name="csrf-token"]');
        if (v && m && (m.setAttribute("content", v.getAttribute("content")), $l()), cs(u), us(u), ds(u), t && (Je = ia(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Je },
          "",
          r
        )), fs(u), jt.rebootPreserving(), n)
          Ql(Je);
        else if (location.hash) {
          var g = document.querySelector(location.hash);
          g ? g.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (b) {
        console.error("[LiVue] Navigation failed:", b), window.location.href = e;
      } finally {
        yt = !1, ye.showProgressBar && Bn.done();
      }
    }
  }
}
function ls() {
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
function ss(e) {
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
function us(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function cs(e) {
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
function ds(e) {
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
function fs(e) {
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
function ps() {
  return yt;
}
var ft = /* @__PURE__ */ new Map(), vs = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Ee(e, t) {
  return typeof e != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", e), function() {
  }) : typeof t != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (ft.has(e) || ft.set(e, /* @__PURE__ */ new Set()), ft.get(e).add(t), function() {
    var n = ft.get(e);
    n && (n.delete(t), n.size === 0 && ft.delete(e));
  });
}
function be(e, t) {
  var n = ft.get(e);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(t);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + e + '" callback:', i);
    }
  });
}
function la() {
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
function sa() {
  return vs.slice();
}
var Ur = [], Jr = [], rn = !1;
function ms(e) {
  return e.isolate ? gs(e) : new Promise(function(t, n) {
    Ur.push({
      payload: e,
      resolve: t,
      reject: n
    }), rn || (rn = !0, queueMicrotask(ua));
  });
}
function hs(e) {
  return new Promise(function(t, n) {
    Jr.push({
      payload: e,
      resolve: t,
      reject: n
    }), rn || (rn = !0, queueMicrotask(ua));
  });
}
async function ua() {
  var e = Ur, t = Jr;
  if (Ur = [], Jr = [], rn = !1, !(e.length === 0 && t.length === 0)) {
    var n = ca(), r = Tt(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = e.map(function(g) {
      return g.payload;
    }), a = t.map(function(g) {
      return g.payload;
    }), l = {};
    o.length > 0 && (l.updates = o), a.length > 0 && (l.lazyLoads = a), be("request.started", {
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
        for (var c = 0; c < e.length; c++)
          e[c].reject(d);
        for (var c = 0; c < t.length; c++)
          t[c].reject(d);
        return;
      }
      for (var p = u.responses || [], h = u.lazyResponses || [], c = 0; c < p.length; c++)
        if (p[c] && p[c].redirect) {
          fi(p[c].redirect);
          return;
        }
      di();
      for (var c = 0; c < e.length; c++) {
        var v = p[c];
        if (!v) {
          e[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (v.error) {
          var m = new Error(v.error);
          m.status = v.status || 500, m.data = v, e[c].reject(m);
        } else if (v.errors) {
          var m = new Error("Validation failed");
          m.status = 422, m.data = v, e[c].reject(m);
        } else
          e[c].resolve(v);
      }
      for (var c = 0; c < t.length; c++) {
        var v = h[c];
        if (!v) {
          t[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (v.error) {
          var m = new Error(v.error);
          m.status = v.status || 500, m.data = v, t[c].reject(m);
        } else
          t[c].resolve(v);
      }
      be("request.finished", {
        url: n,
        success: !0,
        responses: p,
        lazyResponses: h,
        updateCount: e.length,
        lazyCount: t.length
      });
    } catch (g) {
      for (var c = 0; c < e.length; c++)
        e[c].reject(g);
      for (var c = 0; c < t.length; c++)
        t[c].reject(g);
      be("request.finished", {
        url: n,
        success: !1,
        error: g,
        updateCount: e.length,
        lazyCount: t.length
      });
    }
  }
}
async function gs(e) {
  var t = ca(), n = Tt(), r = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  n && (r["X-CSRF-TOKEN"] = n);
  var i = {
    snapshot: e.snapshot,
    diffs: e.diffs,
    method: e.method,
    params: e.params
  }, o = await fetch(t, {
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
    return fi(s.redirect), new Promise(function() {
    });
  if (di(), s.error) {
    var u = new Error(s.error);
    throw u.status = s.status || 500, u.data = s, u;
  }
  if (s.errors) {
    var u = new Error("Validation failed");
    throw u.status = 422, u.data = s, u;
  }
  return s;
}
function ca() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function br(e, t, n, r, i) {
  return ms({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
let Xr = null, da = /* @__PURE__ */ new Map();
function bs() {
  return Le({});
}
function Se(e, t) {
  Kr(e);
  for (let n in t)
    e[n] = t[n];
}
function Kr(e) {
  for (let t in e)
    delete e[t];
}
function ys(e) {
  Xr = e;
}
function ut(e, t, n, r) {
  r = r || {};
  let i = !1;
  return be("error.occurred", {
    error: e,
    componentName: t,
    componentId: n,
    context: r,
    preventDefault: function() {
      i = !0;
    }
  }), i ? !0 : (Xr ? Xr(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function _s(e, t) {
  typeof t == "function" && da.set(e, t);
}
function Yr(e) {
  da.delete(e);
}
var Be = null, ws = "livue-devtools-styles", Es = `
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
function Ss() {
  Be || (Be = document.createElement("style"), Be.id = ws, Be.textContent = Es, document.head.appendChild(Be));
}
function xs() {
  Be && (Be.remove(), Be = null);
}
var pi = [];
function N(e, t, n) {
  pi.push({
    name: e,
    directive: t
  });
}
function Cs() {
  return pi;
}
function Ts() {
  return {
    plugins: [],
    stores: [],
    components: [],
    directives: pi.map(function(e) {
      return { name: e.name, filters: null };
    })
  };
}
const Re = /* @__PURE__ */ new Map(), Ve = /* @__PURE__ */ new Map();
let ji = !1;
function lt() {
  return typeof window < "u" && window.Echo;
}
function As(e, t) {
  if (!lt())
    return console.warn("[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized."), null;
  const n = t + ":" + e;
  if (Re.has(n))
    return Re.get(n);
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
  return Re.set(n, r), r;
}
function fa(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!lt())
    return ji || (ji = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: c } = o, p = As(a, l);
    if (!p) continue;
    const h = l + ":" + a + ":" + s + ":" + e;
    if (Ve.has(h)) {
      r.push(h);
      continue;
    }
    const v = function(m) {
      try {
        n(u, m);
      } catch (g) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', g);
      }
    };
    if (l === "presence" && d)
      Ns(p, s, v);
    else {
      const m = c ? "." + s : s;
      p.listen(m, v);
    }
    Ve.set(h, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: v,
      isPresenceEvent: d,
      isCustomEvent: c
    }), r.push(h);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      pa(r[i]);
  };
}
function Ns(e, t, n) {
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
function pa(e) {
  const t = Ve.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    Ve.delete(e), ks(t.channelKey);
  }
}
function zi(e) {
  const t = ":" + e, n = [];
  Ve.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    pa(n[r]);
}
function va(e, t) {
  e === "presence" ? window.Echo.leave(t) : e === "private" ? window.Echo.leaveChannel("private-" + t) : window.Echo.leaveChannel(t);
}
function ks(e) {
  let t = !1;
  if (Ve.forEach(function(r) {
    r.channelKey === e && (t = !0);
  }), t) return;
  if (Re.get(e) && lt()) {
    const r = e.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      va(i, o);
    } catch {
    }
  }
  Re.delete(e);
}
function Hi() {
  Ve.clear(), Re.forEach(function(e, t) {
    if (lt()) {
      const n = t.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        va(r, i);
      } catch {
      }
    }
  }), Re.clear();
}
function Ls() {
  return {
    echoAvailable: lt(),
    channels: Array.from(Re.keys()),
    subscriptions: Array.from(Ve.keys())
  };
}
function Ds() {
  var e = [], t = [];
  return Re.forEach(function(n, r) {
    var i = r.split(":");
    e.push({
      key: r,
      type: i[0],
      name: i.slice(1).join(":")
    });
  }), Ve.forEach(function(n, r) {
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
    available: lt(),
    channels: e,
    subscriptions: t
  };
}
var $i = 100, Os = 200, Ms = 50, k = {
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
}, Ne = [], St = !1, Gr = /* @__PURE__ */ new Set();
function xe() {
  Gr.forEach(function(e) {
    try {
      e();
    } catch (t) {
      console.error("[LiVue DevTools] Listener error:", t);
    }
  });
}
var Is = 0;
function Rs() {
  return "req-" + ++Is + "-" + Date.now();
}
function Ps(e) {
  var t = new Date(e), n = t.getHours().toString().padStart(2, "0"), r = t.getMinutes().toString().padStart(2, "0"), i = t.getSeconds().toString().padStart(2, "0"), o = t.getMilliseconds().toString().padStart(3, "0");
  return n + ":" + r + ":" + i + "." + o;
}
function ma() {
  St || (St = !0, Ne.push(Ee("component.init", function(e) {
    var t = e.component;
    k.components.set(t.id, {
      id: t.id,
      name: t.name,
      isChild: e.isChild,
      isIsland: e.el && e.el.hasAttribute("data-livue-island"),
      initTime: Date.now(),
      state: t.state,
      livue: t.livue,
      el: e.el
    }), xe();
  })), Ne.push(Ee("component.destroy", function(e) {
    var t = e.component;
    k.components.delete(t.id), k.componentBenchmarkStats.delete(t.id), xe();
  })), Ne.push(Ee("request.started", function(e) {
    var t = Rs(), n = {
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
    k.pendingRequests.set(e.url + "-" + t, n), k.requests.unshift(n), k.requests.length > $i && k.requests.pop(), k.perf.totalRequests++, xe();
  })), Ne.push(Ee("request.finished", function(e) {
    var t = null;
    if (k.pendingRequests.forEach(function(r, i) {
      !t && r.url === e.url && r.status === "pending" && (t = { req: r, key: i });
    }), t) {
      var n = t.req;
      n.endTime = Date.now(), n.duration = n.endTime - n.startTime, n.status = e.success ? "success" : "error", n.responses = e.responses, n.lazyResponses = e.lazyResponses, n.error = e.error, k.pendingRequests.delete(t.key), e.success ? k.perf.successfulRequests++ : k.perf.failedRequests++, k.perf.totalRequestTime += n.duration, k.perf.avgRequestTime = k.perf.totalRequestTime / k.perf.totalRequests, n.duration < k.perf.minRequestTime && (k.perf.minRequestTime = n.duration), n.duration > k.perf.maxRequestTime && (k.perf.maxRequestTime = n.duration), xe();
    }
  })), Ne.push(Ee("template.updating", function(e) {
    var t = e.component;
    k.pendingSwaps.set(t.id, Date.now());
  })), Ne.push(Ee("template.updated", function(e) {
    var t = e.component, n = k.pendingSwaps.get(t.id);
    if (n) {
      var r = Date.now() - n;
      k.pendingSwaps.delete(t.id), k.perf.totalTemplateSwaps++, k.perf.totalTemplateSwapTime += r, k.perf.avgTemplateSwapTime = k.perf.totalTemplateSwapTime / k.perf.totalTemplateSwaps, xe();
    }
  })), Ne.push(Ee("benchmark.received", function(e) {
    var t = Date.now(), n = {
      time: t,
      componentId: e.componentId,
      componentName: e.componentName,
      timings: e.timings
    };
    k.serverBenchmarks.unshift(n), k.serverBenchmarks.length > $i && k.serverBenchmarks.pop();
    var r = e.componentId, i = k.componentBenchmarkStats.get(r);
    i || (i = { count: 0, averages: {}, latest: null }, k.componentBenchmarkStats.set(r, i)), i.count++, i.latest = { time: t, timings: e.timings };
    for (var o in e.timings) {
      var a = e.timings[o], l = i.averages[o] || 0;
      i.averages[o] = l + (a - l) / i.count;
    }
    xe();
  })), Ne.push(Ee("error.occurred", function(e) {
    var t = {
      time: Date.now(),
      error: e.error,
      componentName: e.componentName,
      componentId: e.componentId,
      context: e.context
    };
    k.errors.unshift(t), k.errors.length > Ms && k.errors.pop(), xe();
  })));
}
function ha() {
  St && (St = !1, Ne.forEach(function(e) {
    e();
  }), Ne = []);
}
function qs() {
  return St;
}
function Vs(e) {
  if (St) {
    var t = {
      time: Date.now(),
      name: e.name,
      data: e.data,
      mode: e.mode,
      source: e.source,
      sourceId: e.sourceId,
      target: e.target
    };
    k.events.unshift(t), k.events.length > Os && k.events.pop(), xe();
  }
}
function js() {
  return Array.from(k.components.values());
}
function ga() {
  return k.requests;
}
function ba() {
  return k.events;
}
function ya() {
  return Object.assign({}, k.perf);
}
function zs() {
  return k.serverBenchmarks;
}
function Hs(e) {
  return k.componentBenchmarkStats.get(e) || null;
}
function _a() {
  k.requests = [], k.pendingRequests.clear(), xe();
}
function wa() {
  k.events = [], xe();
}
function $s() {
  k.components.clear(), k.requests = [], k.pendingRequests.clear(), k.events = [], k.errors = [], k.perf = {
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
  }, k.pendingSwaps.clear(), k.serverBenchmarks = [], k.componentBenchmarkStats.clear(), xe();
}
function Fs(e) {
  return Gr.add(e), function() {
    Gr.delete(e);
  };
}
function vi(e) {
  return Ps(e);
}
function Bs(e) {
  var t = k.components.get(e);
  if (!t || !t.livue || !t.livue._getDevToolsInfo)
    return null;
  try {
    return t.livue._getDevToolsInfo();
  } catch (n) {
    return console.error("[LiVue DevTools] Error getting component info:", n), null;
  }
}
function Ws() {
  return Ts();
}
function Us() {
  return Ds();
}
var Zr = null, Fi = null, Qr = null;
function Js(e) {
  Zr = e;
}
function Xs(e) {
  Qr = e;
}
function Ea() {
  if (!Zr)
    return [];
  var e = Zr.all(), t = [];
  return e.forEach(function(n) {
    var r = Sa(n, !1);
    t.push(r);
  }), t;
}
function Sa(e, t) {
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
      l.children.push(Sa(u, !0));
    }
  return l;
}
function xa(e) {
  var t = Ea();
  if (e.innerHTML = "", t.length === 0) {
    e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E6;</div>No components found</div>';
    return;
  }
  t.forEach(function(n) {
    e.appendChild(Ca(n));
  });
}
function Ca(e, t) {
  var n = document.createElement("div");
  n.className = "livue-devtools__node", n.dataset.id = e.id;
  var r = e.children && e.children.length > 0, i = document.createElement("div");
  i.className = "livue-devtools__node-header", e.id === Fi && i.classList.add("livue-devtools__node-header--selected");
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
    var d = document.createElement("span");
    d.className = "livue-devtools__badge livue-devtools__badge--loading", d.textContent = "loading", u.appendChild(d);
  }
  if (e.dirty) {
    var c = document.createElement("span");
    c.className = "livue-devtools__badge livue-devtools__badge--dirty", c.textContent = "dirty", u.appendChild(c);
  }
  if (e.errorCount > 0) {
    var p = document.createElement("span");
    p.className = "livue-devtools__badge livue-devtools__badge--error", p.textContent = e.errorCount + " error" + (e.errorCount > 1 ? "s" : ""), u.appendChild(p);
  }
  if (i.appendChild(u), i.addEventListener("click", function(v) {
    if (v.target === o && r) {
      var m = n.querySelector(".livue-devtools__node-children");
      if (m) {
        var g = m.style.display !== "none";
        m.style.display = g ? "none" : "block", o.textContent = g ? "▶" : "▼";
      }
      return;
    }
    Fi = e.id;
    var b = document.querySelectorAll(".livue-devtools__node-header");
    b.forEach(function(w) {
      w.classList.remove("livue-devtools__node-header--selected");
    }), i.classList.add("livue-devtools__node-header--selected"), Qr && Qr(e);
  }), n.appendChild(i), r) {
    var h = document.createElement("div");
    h.className = "livue-devtools__node-children", e.children.forEach(function(v) {
      h.appendChild(Ca(v));
    }), n.appendChild(h);
  }
  return n;
}
var rt = null, Lt = "state", Ie = /* @__PURE__ */ new Set(), on = null;
function Ks(e) {
  rt = e;
}
function lr(e) {
  if (on = e, e.innerHTML = "", !rt) {
    e.innerHTML = '<div class="livue-devtools__state-empty">Select a component to inspect its state</div>';
    return;
  }
  var t = rt.state, n = rt.livue, r = n ? n.dirtyFields : /* @__PURE__ */ new Set(), i = Bs(rt.id), o = document.createElement("div");
  o.className = "livue-devtools__state-title", o.textContent = "<" + rt.name + ">", e.appendChild(o);
  var a = document.createElement("div");
  a.style.cssText = "display: flex; gap: 4px; margin-bottom: 8px;", ["state", "diff", "info"].forEach(function(l) {
    var s = document.createElement("button");
    s.style.cssText = "padding: 2px 8px; font-size: 10px; background: " + (Lt === l ? "#007acc" : "#3c3c3c") + "; border: none; color: #fff; border-radius: 3px; cursor: pointer;", s.textContent = l.charAt(0).toUpperCase() + l.slice(1), s.addEventListener("click", function() {
      Lt = l, lr(e);
    }), a.appendChild(s);
  }), e.appendChild(a), Lt === "state" ? Ys(e, t, r, n) : Lt === "diff" ? Gs(e, i) : Lt === "info" && Zs(e, i);
}
function Ys(e, t, n, r) {
  if (t && typeof t == "object") {
    var i = Object.keys(t);
    if (i.length === 0) {
      var o = document.createElement("div");
      o.className = "livue-devtools__state-empty", o.textContent = "No state properties", e.appendChild(o);
    } else
      i.forEach(function(l) {
        var s = n.has(l);
        e.appendChild(mi(l, t[l], s, l));
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
function Gs(e, t) {
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
    var d = document.createElement("div");
    d.style.cssText = "font-size: 11px; color: #858585;", d.innerHTML = '<span style="color: #6a9955;">Server:</span> <span style="color: #ce9178;">' + JSON.stringify(a) + "</span>", s.appendChild(d);
    var c = document.createElement("div");
    c.style.cssText = "font-size: 11px; color: #858585;", c.innerHTML = '<span style="color: #9cdcfe;">Client:</span> <span style="color: #ce9178;">' + JSON.stringify(l) + "</span>", s.appendChild(c), e.appendChild(s);
  });
}
function Zs(e, t) {
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
    var p = document.createElement("span");
    p.className = "livue-devtools__prop-colon", p.textContent = ": ", d.appendChild(p);
    var h = document.createElement("span");
    h.className = "livue-devtools__prop-value", h.textContent = u.value, d.appendChild(h), e.appendChild(d);
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
      var d = document.createElement("div");
      d.className = "livue-devtools__prop";
      var c = document.createElement("span");
      c.className = "livue-devtools__prop-key", c.textContent = u.label, d.appendChild(c);
      var p = document.createElement("span");
      p.className = "livue-devtools__prop-colon", p.textContent = ": ", d.appendChild(p);
      var h = document.createElement("span");
      h.className = "livue-devtools__prop-value", h.style.color = u.color || "#d4d4d4", h.textContent = String(u.value), d.appendChild(h), e.appendChild(d);
    }
  });
  var a = t.composables || {}, l = Object.keys(a);
  if (l.length > 0) {
    var s = document.createElement("div");
    s.className = "livue-devtools__state-title", s.style.marginTop = "12px", s.textContent = "Composables", e.appendChild(s), l.forEach(function(u) {
      var d = a[u], c = document.createElement("div");
      c.style.cssText = "color: #c586c0; font-weight: 600; margin-top: 8px; margin-bottom: 4px;", c.textContent = u + " (livue." + u + ")", e.appendChild(c);
      var p = Object.keys(d.data || {});
      if (p.length > 0) {
        var h = document.createElement("div");
        h.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px;", h.textContent = "Data:", e.appendChild(h), p.forEach(function(g) {
          var b = document.createElement("div");
          b.style.marginLeft = "16px", b.className = "livue-devtools__prop";
          var w = document.createElement("span");
          w.className = "livue-devtools__prop-key", w.textContent = g, b.appendChild(w);
          var T = document.createElement("span");
          T.className = "livue-devtools__prop-colon", T.textContent = ": ", b.appendChild(T), b.appendChild(Ta(d.data[g], "composable." + u + "." + g)), e.appendChild(b);
        });
      }
      if (d.actions && d.actions.length > 0) {
        var v = document.createElement("div");
        v.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px; margin-top: 4px;", v.textContent = "Actions:", e.appendChild(v);
        var m = document.createElement("div");
        m.style.cssText = "margin-left: 16px; color: #dcdcaa;", m.textContent = d.actions.join(", "), e.appendChild(m);
      }
    });
  }
}
function mi(e, t, n, r) {
  var i = document.createElement("div");
  i.className = "livue-devtools__prop";
  var o = document.createElement("span");
  o.className = "livue-devtools__prop-key", n && o.classList.add("livue-devtools__prop-key--dirty"), o.textContent = e, i.appendChild(o);
  var a = document.createElement("span");
  return a.className = "livue-devtools__prop-colon", a.textContent = ": ", i.appendChild(a), i.appendChild(Ta(t, r)), i;
}
function Ta(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value", e === null)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "null";
  else if (e === void 0)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "undefined";
  else if (typeof e == "string")
    n.classList.add("livue-devtools__prop-value--string"), n.textContent = '"' + tu(e, 50) + '"', n.title = e;
  else if (typeof e == "number")
    n.classList.add("livue-devtools__prop-value--number"), n.textContent = String(e);
  else if (typeof e == "boolean")
    n.classList.add("livue-devtools__prop-value--boolean"), n.textContent = String(e);
  else {
    if (Array.isArray(e))
      return Qs(e, t);
    if (typeof e == "object")
      return eu(e, t);
    typeof e == "function" ? (n.classList.add("livue-devtools__prop-value--null"), n.textContent = "function()") : n.textContent = String(e);
  }
  return n;
}
function Qs(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value livue-devtools__prop-value--array", e.length === 0)
    return n.textContent = "[]", n;
  var r = Ie.has(t), i = document.createElement("span");
  i.className = "livue-devtools__object-toggle", i.textContent = r ? "▼ " : "▶ ", i.addEventListener("click", function() {
    Ie.has(t) ? Ie.delete(t) : Ie.add(t), on && lr(on);
  }), n.appendChild(i);
  var o = document.createElement("span");
  if (o.textContent = "Array(" + e.length + ")", n.appendChild(o), r) {
    var a = document.createElement("div");
    a.className = "livue-devtools__object", e.forEach(function(l, s) {
      a.appendChild(mi(String(s), l, !1, t + "." + s));
    }), n.appendChild(a);
  }
  return n;
}
function eu(e, t) {
  var n = document.createElement("span");
  n.className = "livue-devtools__prop-value livue-devtools__prop-value--object";
  var r = Object.keys(e);
  if (r.length === 0)
    return n.textContent = "{}", n;
  var i = Ie.has(t), o = document.createElement("span");
  o.className = "livue-devtools__object-toggle", o.textContent = i ? "▼ " : "▶ ", o.addEventListener("click", function() {
    Ie.has(t) ? Ie.delete(t) : Ie.add(t), on && lr(on);
  }), n.appendChild(o);
  var a = document.createElement("span");
  if (a.textContent = "{...} " + r.length + " key" + (r.length > 1 ? "s" : ""), n.appendChild(a), i) {
    var l = document.createElement("div");
    l.className = "livue-devtools__object", r.forEach(function(s) {
      l.appendChild(mi(s, e[s], !1, t + "." + s));
    }), n.appendChild(l);
  }
  return n;
}
function tu(e, t) {
  return e.length <= t ? e : e.substring(0, t - 3) + "...";
}
function nu() {
  rt = null, Ie.clear();
}
var pt = /* @__PURE__ */ new Set();
function Aa(e) {
  e.innerHTML = "";
  var t = ga(), n = document.createElement("div");
  n.className = "livue-devtools__timeline-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__timeline-title", r.textContent = "Request Timeline (" + t.length + ")", n.appendChild(r);
  var i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = "Clear", i.addEventListener("click", function() {
    _a(), pt.clear(), Aa(e);
  }), n.appendChild(i), e.appendChild(n);
  var o = document.createElement("div");
  o.className = "livue-devtools__timeline-list", t.length === 0 ? o.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E1;</div>No requests yet</div>' : t.forEach(function(a) {
    o.appendChild(ru(a));
  }), e.appendChild(o);
}
function ru(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__request", pt.has(e.id) && t.classList.add("livue-devtools__request--expanded");
  var n = document.createElement("div");
  n.className = "livue-devtools__request-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__request-toggle", r.textContent = pt.has(e.id) ? "▼" : "▶", n.appendChild(r);
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
  s.className = "livue-devtools__request-time", s.textContent = vi(e.startTime), n.appendChild(s), n.addEventListener("click", function() {
    pt.has(e.id) ? (pt.delete(e.id), t.classList.remove("livue-devtools__request--expanded"), r.textContent = "▶") : (pt.add(e.id), t.classList.add("livue-devtools__request--expanded"), r.textContent = "▼");
  }), t.appendChild(n);
  var u = document.createElement("div");
  if (u.className = "livue-devtools__request-details", e.updateCount > 0 || e.lazyCount > 0) {
    var d = document.createElement("div");
    d.className = "livue-devtools__request-section";
    var c = document.createElement("div");
    c.className = "livue-devtools__request-section-title", c.textContent = "Summary", d.appendChild(c);
    var p = document.createElement("div"), h = [];
    e.updateCount > 0 && h.push(e.updateCount + " update" + (e.updateCount > 1 ? "s" : "")), e.lazyCount > 0 && h.push(e.lazyCount + " lazy load" + (e.lazyCount > 1 ? "s" : "")), p.textContent = h.join(", "), d.appendChild(p), u.appendChild(d);
  }
  if (e.updates && e.updates.length > 0) {
    var v = document.createElement("div");
    v.className = "livue-devtools__request-section";
    var m = document.createElement("div");
    m.className = "livue-devtools__request-section-title", m.textContent = "Request Payload", v.appendChild(m);
    var g = document.createElement("pre");
    g.className = "livue-devtools__request-json", g.textContent = iu(e.updates), v.appendChild(g), u.appendChild(v);
  }
  if (e.responses) {
    var b = document.createElement("div");
    b.className = "livue-devtools__request-section";
    var w = document.createElement("div");
    w.className = "livue-devtools__request-section-title", w.textContent = "Response", b.appendChild(w);
    var T = document.createElement("pre");
    T.className = "livue-devtools__request-json", T.textContent = ou(e.responses), b.appendChild(T), u.appendChild(b);
  }
  if (e.error) {
    var O = document.createElement("div");
    O.className = "livue-devtools__request-section";
    var E = document.createElement("div");
    E.className = "livue-devtools__request-section-title", E.style.color = "#f48771", E.textContent = "Error", O.appendChild(E);
    var L = document.createElement("pre");
    L.className = "livue-devtools__request-json", L.style.color = "#f48771", L.textContent = e.error.message || String(e.error), O.appendChild(L), u.appendChild(O);
  }
  return t.appendChild(u), t;
}
function iu(e) {
  var t = e.map(function(n) {
    var r = {};
    return n.method && (r.method = n.method), n.params && n.params.length > 0 && (r.params = n.params), n.diffs && Object.keys(n.diffs).length > 0 && (r.diffs = n.diffs), r;
  });
  return JSON.stringify(t, null, 2);
}
function ou(e) {
  var t = e.map(function(n) {
    if (!n) return null;
    var r = {};
    return n.snapshot && (r.snapshotSize = n.snapshot.length + " bytes"), n.html && (r.htmlSize = n.html.length + " bytes"), n.events && n.events.length > 0 && (r.events = n.events.map(function(i) {
      return i.name;
    })), n.jsonResult !== void 0 && (r.jsonResult = n.jsonResult), n.redirect && (r.redirect = n.redirect), n.download && (r.download = n.download.name), r;
  });
  return JSON.stringify(t, null, 2);
}
var Ut = "";
function Na(e) {
  e.innerHTML = "";
  var t = document.createElement("div");
  t.className = "livue-devtools__events-header";
  var n = document.createElement("input");
  n.className = "livue-devtools__events-filter", n.type = "text", n.placeholder = "Filter events...", n.value = Ut, n.addEventListener("input", function(o) {
    Ut = o.target.value.toLowerCase(), Bi(e.querySelector(".livue-devtools__events-list"));
  }), t.appendChild(n);
  var r = document.createElement("button");
  r.className = "livue-devtools__btn", r.textContent = "Clear", r.addEventListener("click", function() {
    wa(), Ut = "", n.value = "", Na(e);
  }), t.appendChild(r), e.appendChild(t);
  var i = document.createElement("div");
  i.className = "livue-devtools__events-list", Bi(i), e.appendChild(i);
}
function Bi(e) {
  if (e) {
    e.innerHTML = "";
    var t = ba(), n = t;
    if (Ut && (n = t.filter(function(r) {
      var i = (r.name + " " + r.source + " " + JSON.stringify(r.data)).toLowerCase();
      return i.indexOf(Ut) !== -1;
    })), n.length === 0) {
      t.length === 0 ? e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E8;</div>No events yet</div>' : e.innerHTML = '<div class="livue-devtools__empty">No events match filter</div>';
      return;
    }
    n.forEach(function(r) {
      e.appendChild(au(r));
    });
  }
}
function au(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__event";
  var n = document.createElement("span");
  n.className = "livue-devtools__event-time", n.textContent = vi(e.time), t.appendChild(n);
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
    a.className = "livue-devtools__event-data", a.textContent = lu(e.data), a.title = JSON.stringify(e.data, null, 2), t.appendChild(a);
  }
  return t;
}
function lu(e) {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  var t = JSON.stringify(e);
  return t.length > 80 ? t.substring(0, 77) + "..." : t;
}
var ka = "livue-devtools-state", H = null, Pe = "components", ot = "state", hi = null, ke = !1, La = !1, Ke = "right";
function Da() {
  try {
    var e = localStorage.getItem(ka);
    if (e) {
      var t = JSON.parse(e);
      Pe = t.activeTab || "components", ot = t.activeSubTab || "state", ke = t.minimized || !1, La = t.isOpen || !1, Ke = t.position || "right";
    }
  } catch {
  }
}
function At() {
  try {
    localStorage.setItem(ka, JSON.stringify({
      isOpen: H !== null,
      activeTab: Pe,
      activeSubTab: ot,
      minimized: ke,
      position: Ke
    }));
  } catch {
  }
}
function su() {
  return Da(), La;
}
var Dn = null, Jt = null, On = null;
function uu(e) {
  Js(e);
}
function cu() {
  return H !== null;
}
function gi() {
  H || (Da(), Ss(), ma(), du(), _u(), wu(), At());
}
function bi() {
  H && (Jt && (document.removeEventListener("keydown", Jt), Jt = null), Dn && (clearInterval(Dn), Dn = null), On && (On(), On = null), H.remove(), H = null, hi = null, xs(), ha(), nu(), At());
}
function Oa() {
  H ? bi() : gi();
}
function Ma() {
  switch (Ke) {
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
function du() {
  H = document.createElement("div"), H.className = "livue-devtools livue-devtools--" + Ke, ke && H.classList.add("livue-devtools--minimized");
  var e = document.createElement("div");
  e.className = "livue-devtools__header";
  var t = document.createElement("div");
  t.className = "livue-devtools__title", t.innerHTML = '<span class="livue-devtools__title-icon">&#x2699;</span> LiVue DevTools', e.appendChild(t);
  var n = document.createElement("div");
  n.className = "livue-devtools__actions";
  var r = Ma(), i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = ke ? r.minimized : r.expanded, i.title = "Minimize", i.addEventListener("click", function() {
    ke = !ke, H.classList.toggle("livue-devtools--minimized", ke), i.textContent = ke ? r.minimized : r.expanded, At();
  }), n.appendChild(i);
  var o = document.createElement("button");
  o.className = "livue-devtools__btn", o.textContent = "×", o.title = "Close (Ctrl+Shift+L)", o.addEventListener("click", bi), n.appendChild(o), e.appendChild(n), H.appendChild(e);
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
  l.forEach(function(v) {
    var m = document.createElement("button");
    m.className = "livue-devtools__tab", v.id === Pe && m.classList.add("livue-devtools__tab--active"), m.textContent = v.label, m.addEventListener("click", function() {
      fu(v.id);
    }), a.appendChild(m);
  }), H.appendChild(a);
  var s = document.createElement("div");
  s.className = "livue-devtools__content";
  var u = document.createElement("div");
  u.className = "livue-devtools__panel livue-devtools__panel--components", u.dataset.tab = "components", Pe === "components" && u.classList.add("livue-devtools__panel--active");
  var d = document.createElement("div");
  d.className = "livue-devtools__tree", u.appendChild(d);
  var c = document.createElement("div");
  c.className = "livue-devtools__right-pane";
  var p = document.createElement("div");
  p.className = "livue-devtools__sub-tabs", [{ id: "state", label: "State" }, { id: "benchmark", label: "Benchmark" }].forEach(function(v) {
    var m = document.createElement("button");
    m.className = "livue-devtools__sub-tab", v.id === ot && m.classList.add("livue-devtools__sub-tab--active"), m.textContent = v.label, m.addEventListener("click", function() {
      pu(v.id);
    }), p.appendChild(m);
  }), c.appendChild(p);
  var h = document.createElement("div");
  h.className = "livue-devtools__sub-content", ["state", "benchmark"].forEach(function(v) {
    var m = document.createElement("div");
    m.className = "livue-devtools__panel", m.dataset.subtab = v, v === ot && m.classList.add("livue-devtools__panel--active"), h.appendChild(m);
  }), c.appendChild(h), u.appendChild(c), s.appendChild(u), ["timeline", "events", "stores", "echo", "perf", "settings"].forEach(function(v) {
    var m = document.createElement("div");
    m.className = "livue-devtools__panel", m.dataset.tab = v, v === Pe && m.classList.add("livue-devtools__panel--active"), s.appendChild(m);
  }), H.appendChild(s), document.body.appendChild(H), Xs(function(v) {
    hi = v, Ks(v), sr();
  }), Wn(), On = Fs(function() {
    Wn();
  });
}
function fu(e) {
  if (e !== Pe) {
    Pe = e;
    var t = H.querySelectorAll(".livue-devtools__tab"), n = ["components", "timeline", "events", "stores", "echo", "perf", "settings"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__tab--active", n[o] === e);
    });
    var r = H.querySelectorAll(".livue-devtools__panel[data-tab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.tab === e);
    }), Wn(), At();
  }
}
function pu(e) {
  if (e !== ot) {
    ot = e;
    var t = H.querySelectorAll(".livue-devtools__sub-tab"), n = ["state", "benchmark"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__sub-tab--active", n[o] === e);
    });
    var r = H.querySelectorAll(".livue-devtools__panel[data-subtab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.subtab === e);
    }), sr(), At();
  }
}
function sr() {
  if (H)
    if (ot === "state") {
      var e = H.querySelector('.livue-devtools__panel[data-subtab="state"]');
      e && lr(e);
    } else {
      var t = H.querySelector('.livue-devtools__panel[data-subtab="benchmark"]');
      t && vu(t, hi);
    }
}
function Wn() {
  if (H)
    switch (Pe) {
      case "components":
        var e = H.querySelector(".livue-devtools__tree");
        e && xa(e), sr();
        break;
      case "timeline":
        var t = H.querySelector('.livue-devtools__panel[data-tab="timeline"]');
        t && Aa(t);
        break;
      case "events":
        var n = H.querySelector('.livue-devtools__panel[data-tab="events"]');
        n && Na(n);
        break;
      case "stores":
        var r = H.querySelector('.livue-devtools__panel[data-tab="stores"]');
        r && mu(r);
        break;
      case "echo":
        var i = H.querySelector('.livue-devtools__panel[data-tab="echo"]');
        i && hu(i);
        break;
      case "perf":
        var o = H.querySelector('.livue-devtools__panel[data-tab="perf"]');
        o && gu(o);
        break;
      case "settings":
        var a = H.querySelector('.livue-devtools__panel[data-tab="settings"]');
        a && bu(a);
        break;
    }
}
function vu(e, t) {
  e.innerHTML = "";
  var n = zs();
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
  var o = n.filter(function($) {
    return $.componentId === t.id;
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
  var d = document.createElement("div");
  d.style.cssText = "color: #858585; font-size: 11px; margin-bottom: 6px;", d.textContent = vi(l.time), s.appendChild(d);
  var c = ["mount", "method_call", "render", "total"];
  for (var p in l.timings) {
    var h = l.timings[p], v = h / 1e3, m = c.indexOf(p) !== -1, g = m ? 50 : 5, b = m ? 200 : 20, w = v < g ? "good" : v < b ? "warn" : "bad";
    s.appendChild(ve(p, Wi(h), w));
  }
  e.appendChild(s);
  var T = Hs(t.id);
  if (T && T.count > 1) {
    var O = document.createElement("div");
    O.className = "livue-devtools__perf-section";
    var E = document.createElement("div");
    E.className = "livue-devtools__perf-title", E.textContent = "Session Average (" + T.count + " requests)", O.appendChild(E);
    for (var L in T.averages) {
      var j = Math.round(T.averages[L]), P = j / 1e3, D = c.indexOf(L) !== -1, M = P < (D ? 50 : 5) ? "good" : P < (D ? 200 : 20) ? "warn" : "bad";
      O.appendChild(ve(L, Wi(j), M));
    }
    e.appendChild(O);
  }
}
function mu(e) {
  e.innerHTML = "";
  var t = Ws(), n = t.stores, r = document.createElement("div");
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
      var d = document.createElement("div");
      d.style.cssText = "font-size: 11px; color: #858585;", d.textContent = "Filters: " + JSON.stringify(l.filters), s.appendChild(d);
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
    var d = document.createElement("span");
    d.className = "livue-devtools__perf-value", d.textContent = l.count + (l.items.length > 0 ? " (" + l.items.join(", ") + ")" : ""), s.appendChild(d), e.appendChild(s);
  });
}
function hu(e) {
  e.innerHTML = "";
  var t = Us(), n = document.createElement("div");
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
    var d = document.createElement("div");
    d.style.cssText = "color: #858585; font-size: 11px;", d.textContent = "No active channels", s.appendChild(d);
  } else
    t.channels.forEach(function(v) {
      var m = document.createElement("div");
      m.style.cssText = "padding: 4px 0; display: flex; align-items: center; gap: 8px;";
      var g = document.createElement("span");
      g.style.cssText = "padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600;", v.type === "private" ? (g.style.background = "#4d3a12", g.style.color = "#dcdcaa") : v.type === "presence" ? (g.style.background = "#264f78", g.style.color = "#9cdcfe") : (g.style.background = "#2d4a2d", g.style.color = "#6a9955"), g.textContent = v.type, m.appendChild(g);
      var b = document.createElement("span");
      b.style.color = "#d4d4d4", b.textContent = v.name, m.appendChild(b), s.appendChild(m);
    });
  e.appendChild(s);
  var c = document.createElement("div");
  c.className = "livue-devtools__perf-section";
  var p = document.createElement("div");
  if (p.className = "livue-devtools__perf-title", p.textContent = "Subscriptions (" + t.subscriptions.length + ")", c.appendChild(p), t.subscriptions.length === 0) {
    var h = document.createElement("div");
    h.style.cssText = "color: #858585; font-size: 11px;", h.textContent = "No active subscriptions", c.appendChild(h);
  } else
    t.subscriptions.forEach(function(v) {
      var m = document.createElement("div");
      m.style.cssText = "padding: 4px 0; font-size: 11px;", m.innerHTML = '<span style="color: #9cdcfe;">' + v.channelName + '</span> <span style="color: #858585;">→</span> <span style="color: #dcdcaa;">' + v.event + '</span> <span style="color: #858585;">(component: ' + v.componentId.substring(0, 8) + "...)</span>", c.appendChild(m);
    });
  e.appendChild(c);
}
function gu(e) {
  e.innerHTML = "";
  var t = ya(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-title", r.textContent = "AJAX Requests", n.appendChild(r), n.appendChild(ve("Total Requests", t.totalRequests)), n.appendChild(ve("Successful", t.successfulRequests, "good")), n.appendChild(ve("Failed", t.failedRequests, t.failedRequests > 0 ? "bad" : null)), e.appendChild(n);
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-section";
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-title", o.textContent = "Request Timing", i.appendChild(o);
  var a = t.avgRequestTime < 100 ? "good" : t.avgRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ve("Average", mn(t.avgRequestTime), a));
  var l = t.minRequestTime < 100 ? "good" : t.minRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ve("Fastest", t.minRequestTime === 1 / 0 ? "-" : mn(t.minRequestTime), l));
  var s = t.maxRequestTime < 100 ? "good" : t.maxRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ve("Slowest", t.maxRequestTime === 0 ? "-" : mn(t.maxRequestTime), s)), e.appendChild(i);
  var u = document.createElement("div");
  u.className = "livue-devtools__perf-section";
  var d = document.createElement("div");
  d.className = "livue-devtools__perf-title", d.textContent = "Template Swaps", u.appendChild(d), u.appendChild(ve("Total Swaps", t.totalTemplateSwaps));
  var c = t.avgTemplateSwapTime < 5 ? "good" : t.avgTemplateSwapTime < 20 ? "warn" : "bad";
  u.appendChild(ve("Average Time", mn(t.avgTemplateSwapTime), c)), e.appendChild(u);
  var p = document.createElement("div");
  p.className = "livue-devtools__perf-section";
  var h = document.createElement("div");
  h.className = "livue-devtools__perf-title", h.textContent = "Components", p.appendChild(h);
  var v = js(), m = v.filter(function(b) {
    return !b.isChild;
  }), g = v.filter(function(b) {
    return b.isChild;
  });
  p.appendChild(ve("Root Components", m.length)), p.appendChild(ve("Child Components", g.length)), p.appendChild(ve("Total", v.length)), e.appendChild(p);
}
function bu(e) {
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
  i.forEach(function(d) {
    var c = document.createElement("button");
    c.className = "livue-devtools__settings-btn", Ke === d.id && c.classList.add("livue-devtools__settings-btn--active");
    var p = document.createElement("span");
    p.className = "livue-devtools__settings-btn-icon", p.textContent = d.icon, c.appendChild(p);
    var h = document.createElement("span");
    h.textContent = d.label, c.appendChild(h), c.addEventListener("click", function() {
      yu(d.id);
    }), r.appendChild(c);
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
function yu(e) {
  if (Ke !== e && (Ke = e, At(), H)) {
    H.className = "livue-devtools livue-devtools--" + Ke, ke && H.classList.add("livue-devtools--minimized");
    var t = Ma(), n = H.querySelector(".livue-devtools__btn");
    n && (n.textContent = ke ? t.minimized : t.expanded), Wn();
  }
}
function ve(e, t, n) {
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-stat";
  var i = document.createElement("span");
  i.className = "livue-devtools__perf-label", i.textContent = e, r.appendChild(i);
  var o = document.createElement("span");
  return o.className = "livue-devtools__perf-value", n && o.classList.add("livue-devtools__perf-value--" + n), o.textContent = String(t), r.appendChild(o), r;
}
function mn(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1 ? "<1ms" : Math.round(e) + "ms";
}
function Wi(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1e3 ? e + "µs" : (e / 1e3).toFixed(2) + "ms";
}
function _u() {
  Jt = function(e) {
    e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Oa());
  }, document.addEventListener("keydown", Jt);
}
function wu() {
  Dn = setInterval(function() {
    if (H && Pe === "components") {
      var e = H.querySelector(".livue-devtools__tree");
      e && xa(e), sr();
    }
  }, 500);
}
var an = !1, Ui = !1;
function Ia(e) {
  an || (uu(e), an = !0, su() && gi(), Ui || (Ui = !0, document.addEventListener("keydown", function(t) {
    t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Ra());
  })));
}
function Eu() {
  if (!an) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  gi();
}
function Su() {
  bi();
}
function Ra() {
  if (!an) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  Oa();
}
function xu() {
  return cu();
}
function Cu() {
  return Ea();
}
function Tu() {
  return ga();
}
function Au() {
  return ba();
}
function Nu() {
  return ya();
}
function ku() {
  _a();
}
function Lu() {
  wa();
}
function Du() {
  $s();
}
function Pa(e) {
  Vs(e);
}
function Ou() {
  return an;
}
function Mu() {
  ma();
}
function Iu() {
  ha();
}
function qa() {
  return qs();
}
const Ru = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: Du,
  clearEvents: Lu,
  clearTimeline: ku,
  close: Su,
  getComponents: Cu,
  getEvents: Au,
  getPerf: Nu,
  getTimeline: Tu,
  init: Ia,
  isCollecting: qa,
  isInitialized: Ou,
  isOpen: xu,
  logEvent: Pa,
  open: Eu,
  startCollecting: Mu,
  stopCollecting: Iu,
  toggle: Ra
}, Symbol.toStringTag, { value: "Module" }));
var We = /* @__PURE__ */ new Map();
function ln(e, t, n, r) {
  We.has(e) || We.set(e, /* @__PURE__ */ new Set());
  var i = {
    componentName: t,
    componentId: n,
    handler: r
  };
  return We.get(e).add(i), function() {
    var o = We.get(e);
    o && (o.delete(i), o.size === 0 && We.delete(e));
  };
}
function Mn(e, t, n, r, i, o) {
  qa() && Pa({
    name: e,
    data: t,
    mode: n,
    source: r,
    sourceId: i,
    target: o
  });
  var a = We.get(e);
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
function Ji(e) {
  We.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && We.delete(n);
  });
}
function Pu(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    Mn(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function qu(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function yi() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function Vu(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = yi();
    s.open("POST", u, !0);
    var d = Tt();
    d && s.setRequestHeader("X-CSRF-TOKEN", d), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var p = Math.round(c.loaded / c.total * 100);
        i(p);
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
        var p = new Error(c.error || c.message || "Upload failed");
        p.status = s.status, p.data = c, a(p);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function yr(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = yi() + "-remove", n = Tt();
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
function ju(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = yi();
    u.open("POST", d, !0);
    var c = Tt();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(p) {
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
let Xt = /* @__PURE__ */ new Map(), Kt = /* @__PURE__ */ new Map();
function xt(e, t) {
  let n = e + ":debounce:" + t;
  if (!Xt.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let c = i, p = o, h = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(p).catch(h);
        }, t);
      });
    };
    Xt.set(n, l);
  }
  return Xt.get(n);
}
function sn(e, t) {
  let n = e + ":throttle:" + t;
  if (!Kt.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < t ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    Kt.set(n, i);
  }
  return Kt.get(n);
}
function Xi(e) {
  let t = e + ":";
  for (let n of Xt.keys())
    n.startsWith(t) && Xt.delete(n);
  for (let n of Kt.keys())
    n.startsWith(t) && Kt.delete(n);
}
const Un = "livue-tab-sync";
let _i = Date.now() + "-" + Math.random().toString(36).substr(2, 9), Jn = null, wi = /* @__PURE__ */ new Map(), Ki = !1;
function Va() {
  Ki || (Ki = !0, typeof BroadcastChannel < "u" ? (Jn = new BroadcastChannel(Un), Jn.onmessage = zu) : window.addEventListener("storage", Hu));
}
function zu(e) {
  let t = e.data;
  t.tabId !== _i && ja(t);
}
function Hu(e) {
  if (e.key === Un && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === _i) return;
      ja(t);
    } catch {
    }
}
function ja(e) {
  let t = wi.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function $u(e, t) {
  Va(), wi.set(e, t);
}
function Yi(e) {
  wi.delete(e);
}
function Fu(e, t, n, r) {
  Va();
  let i = {
    tabId: _i,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (Jn)
    Jn.postMessage(i);
  else
    try {
      localStorage.setItem(Un, JSON.stringify(i)), localStorage.removeItem(Un);
    } catch {
    }
}
function Bu(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const Ei = /* @__PURE__ */ new Map();
function Gi(e, t, n) {
  if (e.trim())
    try {
      const r = JSON.parse(e);
      if (r.stream)
        Ju(r.stream), t(r.stream);
      else {
        if (r.error)
          throw new Error(r.error);
        r.snapshot && (n.finalResponse = r);
      }
    } catch (r) {
      console.error("[LiVue Stream] Parse error:", r, e);
    }
}
async function Wu(e, t, n) {
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
      Gi(s, n, i);
  }
  return r.trim() && Gi(r, n, i), i.finalResponse;
}
async function Uu(e, t = {}) {
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
        "X-CSRF-TOKEN": Tt(),
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
    const a = o.body.getReader(), l = new TextDecoder(), s = await Wu(a, l, n);
    return r(s), s;
  } catch (o) {
    throw i(o), o;
  }
}
function Ju(e) {
  const { to: t, content: n, replace: r } = e, i = Ei.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Zi(e, t, n = !1) {
  Ei.set(e, { el: t, replace: n });
}
function Qi(e) {
  Ei.delete(e);
}
function Xu(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function Si(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    Xu(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = Si(r) : t[n] = r;
  }
  return t;
}
function Ku(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Si(l), d = {};
    for (let c in s)
      d[c] = /* @__PURE__ */ (function(p, h) {
        return function() {
          let v = Array.prototype.slice.call(arguments);
          return t(p + "." + h, v);
        };
      })(a, c);
    i[a] = Le(Object.assign({}, u, d));
  }
  return i;
}
function Yu(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = Si(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function Gu(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function Zu(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function ei(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = bs(), u = n.name, d = n.vueMethods || {}, c = n.jsonMethods || [], p = n.confirms || {}, h = Array.isArray(n.methods) ? n.methods.slice() : null, v = n.isolate || !1, m = n.urlParams || null, g = n.uploads || null, b = n.tabSync || null, w = !1, T = i, O = o, E = a.initialHtml || null, L = Le({}), j = [];
  function P() {
    for (let f = 0; f < j.length; f++)
      try {
        j[f]();
      } catch {
      }
    j = [];
  }
  function D(f) {
    if (P(), !!Array.isArray(f))
      for (let _ = 0; _ < f.length; _++) {
        let S = f[_];
        if (!S || typeof S != "object" || !S.bridge || typeof S.bridge != "object") continue;
        let A = it(e, S.name, { scope: S.scope || "auto" }, l);
        if (!A) continue;
        let y = S.bridge;
        for (let V in y) {
          let W = y[V];
          if (!W || typeof W != "object") continue;
          let re = W.prop, te = W.mode || "two-way";
          if (!(!re || !(re in t))) {
            if (te === "two-way" || te === "store-to-state") {
              let Q = Te(function() {
                return A[V];
              }, function(Ge) {
                t[re] !== Ge && (t[re] = Ge);
              });
              j.push(Q);
            }
            if (te === "two-way" || te === "state-to-store") {
              let Q = Te(function() {
                return t[re];
              }, function(Ge) {
                A[V] !== Ge && (A[V] = Ge);
              });
              j.push(Q);
            }
          }
        }
      }
  }
  function M(f) {
    let _ = Ml(e, f, l);
    for (let S in _)
      L[S] = _[S];
    D(f);
  }
  M(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    P(), Il(e);
  });
  function $(f) {
    let _ = document.querySelector('meta[name="livue-prefix"]'), A = "/" + (_ ? _.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), y = document.createElement("a");
    y.href = A, y.download = f.name, y.style.display = "none", document.body.appendChild(y), y.click(), document.body.removeChild(y);
  }
  function Z() {
    let f = vn(T, t);
    return {
      snapshot: O,
      diffs: f
    };
  }
  function K(f, _) {
    if (f.redirect) {
      fi(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let y = f.errorBoundary;
      x.errorState.hasError = y.hasError, x.errorState.errorMessage = y.errorMessage, x.errorState.errorDetails = y.errorDetails, x.errorState.recover = y.recover, (!y.errorHandled || !y.recover) && be("error.occurred", {
        error: new Error(y.errorMessage || "Component error"),
        componentName: u,
        componentId: e,
        context: { method: y.errorMethod, serverHandled: y.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && $(f.download), f.snapshot) {
      let y;
      try {
        y = JSON.parse(f.snapshot);
      } catch (V) {
        console.error("[LiVue] Failed to parse server snapshot:", V), y = null;
      }
      if (y && y.state) {
        let V = Et(y.state);
        yl(t, V), T = JSON.parse(JSON.stringify(V));
      }
      y && (O = f.snapshot), y && y.memo && (y.memo.errors ? Se(x.errors, y.memo.errors) : Kr(x.errors), y.memo.vueMethods && (d = y.memo.vueMethods), y.memo.jsonMethods && (c = y.memo.jsonMethods), y.memo.urlParams && (m = y.memo.urlParams), y.memo.uploads && (g = y.memo.uploads), y.memo.confirms && (p = y.memo.confirms), Object.prototype.hasOwnProperty.call(y.memo, "methods") && (h = Array.isArray(y.memo.methods) ? y.memo.methods.slice() : null, x._callableMethods = h), (y.memo.composables || y.memo.composableActions) && Yu(J, y.memo), y.memo.stores && M(y.memo.stores));
    }
    if (m && qu(m, t), (f.html || f.fragments) && r && r._updateTemplate) {
      let y = {};
      if (f.snapshot) {
        let V;
        try {
          V = JSON.parse(f.snapshot);
        } catch {
          V = null;
        }
        V && V.memo && (V.memo.transitionType && (y.transitionType = V.memo.transitionType), V.memo.skipTransition && (y.skipTransition = !0));
      }
      if (f.fragments) {
        let V = E || (a.el ? a.el.innerHTML : null);
        if (V) {
          let W = Zu(V, f.fragments);
          E = W, r._updateTemplate(W, y);
        }
      } else
        E = f.html, r._updateTemplate(f.html, y);
    }
    if (f.events && f.events.length > 0) {
      for (var S = 0; S < f.events.length; S++)
        f.events[S].sourceId = e;
      Pu(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var A = 0; A < f.js.length; A++)
        try {
          new Function("state", "livue", f.js[A])(t, x);
        } catch (y) {
          console.error("[LiVue] Error executing ->vue() JS:", y);
        }
    if (f.benchmark && be("benchmark.received", {
      componentId: e,
      componentName: u,
      timings: f.benchmark
    }), b && b.enabled && f.snapshot && !w && JSON.parse(f.snapshot).state) {
      let V = Bo(t), W = [];
      for (let re in V)
        (!_ || !(re in _)) && W.push(re);
      if (W.length > 0) {
        let re = Bu(V, W, b);
        Object.keys(re).length > 0 && Fu(u, re, W, b);
      }
    }
    if (w = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let U = Le({}), Y = {}, J = {}, X = function(f, _) {
    return x.call(f, _);
  };
  Gu(n) && (J = Ku(n, X));
  let x = Le({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: U,
    refs: {},
    stores: L,
    _pinia: l,
    _callableMethods: h,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let _ = vn(T, t);
      return f === void 0 ? Object.keys(_).length > 0 : f in _;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = vn(T, t);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(T)) : T[f] !== void 0 ? JSON.parse(JSON.stringify(T[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in T && (t[f] = JSON.parse(JSON.stringify(T[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in T)
        f in t && (t[f] = JSON.parse(JSON.stringify(T[f])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(f) {
      return f ? U[f] || !1 : x.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let _ = f ? U[f] || !1 : x.loading;
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
    call: async function(f, _, S) {
      let A, y = null;
      if (arguments.length === 1 ? A = [] : arguments.length === 2 ? Array.isArray(_) ? A = _ : A = [_] : arguments.length >= 3 && (Array.isArray(_) && S && typeof S == "object" && (S.debounce || S.throttle) ? (A = _, y = S) : A = Array.prototype.slice.call(arguments, 1)), Y[f])
        return Y[f](x, A);
      if (d[f]) {
        try {
          new Function("state", "livue", d[f])(t, x);
        } catch (re) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', re);
        }
        return;
      }
      let V = c.includes(f), W = async function() {
        if (p[f] && !await x._showConfirm(p[f]))
          return;
        x.loading = !0, x.processing = f, U[f] = !0;
        let re;
        try {
          let te = Z(), Q = await br(te.snapshot, f, A, te.diffs, v || V);
          re = K(Q, te.diffs);
        } catch (te) {
          if (V)
            throw { status: te.status, errors: te.data && te.data.errors, message: te.message };
          te.status === 422 && te.data && te.data.errors ? Se(x.errors, te.data.errors) : ut(te, u);
        } finally {
          x.loading = !1, x.processing = null, delete U[f];
        }
        return re;
      };
      return y && y.debounce ? xt(e + ":" + f, y.debounce)(W) : y && y.throttle ? sn(e + ":" + f, y.throttle)(W) : W();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, _) {
      let S = Array.prototype.slice.call(arguments, 2), A = { message: _ || "Are you sure?" };
      if (await x._showConfirm(A))
        return x.call.apply(x, [f].concat(S));
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
      t[f] = _;
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
    store: function(f, _, S) {
      if (_ === void 0) {
        let A = it(e, f, S || { scope: "auto" }, l);
        if (A)
          return A;
        throw new Error('[LiVue] store("' + f + '"): store not found. Provide a definition or register it in PHP.');
      }
      return ui(e, f, _, S, l);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(f) {
      let _ = it(e, f, { scope: "auto" }, l);
      if (_)
        return L[f] = _, _;
      throw new Error('[LiVue] useStore("' + f + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(f) {
      let _ = it(e, f, { scope: "global" }, l);
      if (_)
        return L[f] = _, _;
      throw new Error('[LiVue] useGlobalStore("' + f + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      x.loading = !0, x.processing = "$sync";
      try {
        let f = Z(), _ = await br(f.snapshot, null, [], f.diffs, v);
        K(_, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? Se(x.errors, f.data.errors) : ut(f, u);
      } finally {
        x.loading = !1, x.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      Kr(x.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, _) {
      Mn(f, _, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, _, S) {
      Mn(_, S, "to", u, e, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, _) {
      Mn(f, _, "self", u, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      cn(f, !0);
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
    upload: async function(f, _) {
      if (!g || !g[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var S = mr(t, f);
      S && S.__livue_upload && S.ref && yr([S.ref]), x.uploading = !0, x.uploadProgress = 0;
      try {
        var A = await Vu(_, u, f, g[f].token, function(y) {
          x.uploadProgress = y;
        });
        qt(t, f, {
          __livue_upload: !0,
          ref: A.ref,
          originalName: A.originalName,
          mimeType: A.mimeType,
          size: A.size,
          previewUrl: A.previewUrl
        });
      } catch (y) {
        y.status === 422 && y.data && y.data.errors ? Se(x.errors, y.data.errors) : ut(y, u);
      } finally {
        x.uploading = !1, x.uploadProgress = 0;
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
    uploadMultiple: async function(f, _) {
      if (!g || !g[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      x.uploading = !0, x.uploadProgress = 0;
      try {
        var S = await ju(_, u, f, g[f].token, function(Q) {
          x.uploadProgress = Q.overall;
        }), A = S.results || [], y = S.errors || [], V = mr(t, f), W = Array.isArray(V) ? V : [];
        if (A.length > 0) {
          var re = A.map(function(Q) {
            return {
              __livue_upload: !0,
              ref: Q.ref,
              originalName: Q.originalName,
              mimeType: Q.mimeType,
              size: Q.size,
              previewUrl: Q.previewUrl
            };
          });
          qt(t, f, W.concat(re));
        }
        if (y.length > 0) {
          var te = {};
          y.forEach(function(Q) {
            var Ge = f + "." + Q.index;
            te[Ge] = {
              file: Q.file,
              message: Q.error
            };
          }), Se(x.errors, te);
        }
      } catch (Q) {
        Q.status === 422 && Q.data && Q.data.errors ? Se(x.errors, Q.data.errors) : ut(Q, u);
      } finally {
        x.uploading = !1, x.uploadProgress = 0;
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
    removeUpload: function(f, _) {
      var S = mr(t, f);
      if (_ !== void 0 && Array.isArray(S)) {
        var A = S[_];
        A && A.__livue_upload && A.ref && yr([A.ref]), S.splice(_, 1), qt(t, f, S.slice());
      } else
        S && S.__livue_upload && S.ref && yr([S.ref]), qt(t, f, null);
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
      _ = _ || [], x.loading = !0, x.streaming = !0, x.processing = f, x.streamingMethod = f, U[f] = !0;
      let S;
      try {
        let A = Z();
        A.method = f, A.params = _, A.componentId = e;
        let y = await Uu(A, {
          onChunk: function(V) {
          },
          onComplete: function(V) {
          },
          onError: function(V) {
            console.error("[LiVue Stream] Error:", V);
          }
        });
        y && (S = K(y, A.diffs));
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? Se(x.errors, A.data.errors) : ut(A, u);
      } finally {
        x.loading = !1, x.streaming = !1, x.processing = null, x.streamingMethod = null, delete U[f];
      }
      return S;
    },
    /**
     * Toggle a boolean property.
     * @param {string} property - Property name to toggle
     */
    toggle: function(f) {
      f in t && (t[f] = !t[f]);
    },
    /**
     * Register a client-side event listener on the LiVue event bus.
     * Returns an unsubscribe function.
     *
     * @param {string} eventName
     * @param {Function} handler - function(data)
     * @returns {Function}
     */
    on: function(f, _) {
      return typeof f != "string" || f.length === 0 ? (console.warn("[LiVue] on() requires a non-empty event name"), function() {
      }) : typeof _ != "function" ? (console.warn("[LiVue] on() handler must be a function"), function() {
      }) : ln(f, u, e, _);
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
      }) : Te(
        function() {
          return t[f];
        },
        function(S, A) {
          _(S, A);
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
    onError: function(f) {
      return typeof f != "function" ? (console.warn("[LiVue] onError handler must be a function"), function() {
      }) : (_s(e, f), function() {
        Yr(e);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: Le({
      hasError: !1,
      errorMessage: null,
      errorDetails: null,
      recover: !0
    }),
    /**
     * Clear the error state (used for recovery).
     */
    clearError: function() {
      x.errorState.hasError = !1, x.errorState.errorMessage = null, x.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(f, _) {
      T = JSON.parse(JSON.stringify(f)), O = _;
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
      let f = vn(T, t), _ = {};
      for (let S in J) {
        let A = J[S], y = {}, V = [];
        for (let W in A)
          if (typeof A[W] == "function")
            V.push(W);
          else
            try {
              y[W] = JSON.parse(JSON.stringify(A[W]));
            } catch {
              y[W] = "[Unserializable]";
            }
        _[S] = { data: y, actions: V };
      }
      return {
        serverState: JSON.parse(JSON.stringify(T)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: u,
          isolate: v,
          urlParams: m,
          tabSync: b,
          hasUploads: !!g,
          uploadProps: g ? Object.keys(g) : [],
          vueMethods: Object.keys(d),
          confirmMethods: Object.keys(p),
          composableNames: Object.keys(J)
        },
        composables: _,
        uploading: x.uploading,
        uploadProgress: x.uploadProgress,
        streaming: x.streaming,
        streamingMethod: x.streamingMethod,
        errorState: {
          hasError: x.errorState.hasError,
          errorMessage: x.errorState.errorMessage
        }
      };
    }
  });
  for (let f in J)
    x[f] = J[f];
  async function Nt() {
    x.loading = !0, x.processing = "$refresh", U.$refresh = !0;
    try {
      let f = Z(), _ = await br(f.snapshot, null, [], f.diffs, v);
      return K(_, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? Se(x.errors, f.data.errors) : ut(f, u);
    } finally {
      x.loading = !1, x.processing = null, delete U.$refresh;
    }
  }
  Y.$refresh = function() {
    return Nt();
  }, b && b.enabled && $u(u, function(f, _, S) {
    let A = !1;
    if (S.reactive === !0)
      A = !0;
    else if (Array.isArray(S.reactive) && S.reactive.length > 0) {
      for (let y in f)
        if (S.reactive.includes(y)) {
          A = !0;
          break;
        }
    }
    if (A) {
      for (let y in f)
        S.only && !S.only.includes(y) || S.except && S.except.includes(y) || y in t && (t[y] = f[y]);
      w = !0, x.sync();
      return;
    }
    for (let y in f)
      S.only && !S.only.includes(y) || S.except && S.except.includes(y) || y in t && (t[y] = f[y]);
    for (let y in f)
      S.only && !S.only.includes(y) || S.except && S.except.includes(y) || (T[y] = JSON.parse(JSON.stringify(f[y])));
  });
  var kt = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(x, {
    get: function(f, _, S) {
      if (_ in f || typeof _ == "symbol")
        return Reflect.get(f, _, S);
      if (typeof _ == "string" && _.startsWith("$")) {
        if (Y[_])
          return function() {
            var V = Array.prototype.slice.call(arguments);
            return Y[_](x, V);
          };
        var A = _.slice(1);
        if (A) {
          var y = Reflect.get(f, A, S);
          if (typeof y == "function")
            return function() {
              var V = Array.prototype.slice.call(arguments);
              return y.apply(f, V);
            };
        }
      }
      if (typeof _ == "string" && !_.startsWith("$") && !kt[_])
        return function() {
          var V = Array.prototype.slice.call(arguments);
          return x.call(_, ...V);
        };
    },
    set: function(f, _, S, A) {
      return Reflect.set(f, _, S, A);
    },
    has: function(f, _) {
      if (typeof _ == "string" && _.startsWith("$")) {
        if (Y[_])
          return !0;
        var S = _.slice(1);
        if (S) {
          var A = Reflect.get(f, S, f);
          if (typeof A == "function")
            return !0;
        }
      }
      return Reflect.has(f, _);
    }
  }), composables: J };
}
function Xn(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
var mt = [], za = /* @__PURE__ */ new Set(), Ha = {}, $a = [];
function hn(e, t) {
  if (!e || typeof e.install != "function") {
    console.warn("[LiVue] Plugin must have an install() method");
    return;
  }
  if (e.name) {
    for (var n = 0; n < mt.length; n++)
      if (mt[n].plugin.name === e.name) {
        mt[n] = { plugin: e, options: t };
        return;
      }
  }
  mt.push({ plugin: e, options: t });
}
function Qu(e) {
  za.add(e);
}
function ec(e) {
  for (var t = 0; t < mt.length; t++) {
    var n = mt[t], r = n.plugin, i = n.options;
    if (!(r.name && za.has(r.name))) {
      var o = tc(e);
      try {
        r.install(o, i, e);
      } catch (a) {
        console.error("[LiVue] Error installing plugin " + (r.name || "(unnamed)") + ":", a);
      }
    }
  }
}
function tc(e) {
  return {
    /**
     * Subscribe to a LiVue lifecycle hook.
     * @param {string} name
     * @param {Function} fn
     * @returns {Function} Unsubscribe function
     */
    hook: function(t, n) {
      return Ee(t, n);
    },
    /**
     * Register a composable available in all component templates.
     * The value is exposed as a top-level variable with the given name.
     *
     * @param {string} name - Variable name in templates
     * @param {*} value - Any reactive or plain value
     */
    composable: function(t, n) {
      Ha[t] = n;
    },
    /**
     * Register a Vue directive applied to all Vue app instances.
     *
     * @param {string} name - Directive name (without 'v-' prefix)
     * @param {object|Function} def - Vue directive definition
     */
    directive: function(t, n) {
      $a.push({ name: t, directive: n });
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
function Fa() {
  return Ha;
}
function nc() {
  return $a;
}
function In(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", c, p, h, v, m, g;
    try {
      c = JSON.parse(d), p = c.memo ? c.memo.name : "", h = Et(c.state || {}), v = c.memo || {}, m = s.innerHTML, g = s.tagName.toLowerCase();
    } catch (M) {
      console.error("[LiVue] Failed to parse child snapshot:", u, M);
      return;
    }
    let b = s.nextElementSibling;
    for (; b; ) {
      let M = b.nextElementSibling;
      if (b.tagName === "SCRIPT" && b.getAttribute("type") === "application/livue-setup")
        m += b.outerHTML, b.parentNode.removeChild(b);
      else
        break;
      b = M;
    }
    let w = t._childRegistry[u];
    if (!w)
      for (let M in t._childRegistry) {
        let $ = t._childRegistry[M];
        if ($.name === p && !o[M]) {
          w = $;
          break;
        }
      }
    if (w) {
      o[w.id] = !0, w.rootTag = g;
      let M = v.reactive || [];
      if (M.length > 0) {
        for (var T = 0; T < M.length; T++) {
          var O = M[T];
          O in h && (w.state[O] = h[O]);
        }
        w.livue._updateServerState(h, d), w.componentRef && w.componentRef._updateTemplate && w.componentRef._updateTemplate(m);
      }
    }
    let E = !w;
    if (!w) {
      let $ = "livue-child-" + El();
      t._versions[$] = 0;
      let Z = qr(h), K;
      try {
        K = JSON.parse(JSON.stringify(h));
      } catch (_) {
        console.error("[LiVue] Failed to clone child server state:", _), K = {};
      }
      let U = Object.assign({ name: v.name || p }, v), Y = { _updateTemplate: null }, J = la(), X = ei(u, Z, U, Y, K, d, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: J,
        pinia: t._pinia || null
      }), x = X.livue, Nt = X.composables;
      be("component.init", {
        component: { id: u, name: p, state: Z, livue: x },
        el: s,
        cleanup: J.cleanup,
        isChild: !0
      });
      let kt = v.errors || null;
      kt && Se(x.errors, kt), w = {
        tagName: $,
        state: Z,
        memo: U,
        livue: x,
        composables: Nt,
        componentRef: Y,
        name: p,
        id: u,
        rootTag: g
      };
      let Ye = v.listeners || null;
      if (Ye)
        for (let _ in Ye)
          (function(S, A) {
            ln(_, p, u, function(y) {
              A.call(S, y);
            });
          })(Ye[_], x);
      let f = v.echo || null;
      f && f.length && (function(_, S) {
        fa(_, f, function(A, y) {
          S.call(A, y);
        });
      })(u, x), Y._updateTemplate = function(_) {
        let S = t.el.querySelector('[data-livue-id="' + u + '"]');
        S && Uo(S);
        let A = In(_, t), y = Xn(
          "<" + w.rootTag + ">" + A.template + "</" + w.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let W in A.childDefs)
          t.vueApp._context.components[W] || t.vueApp.component(W, A.childDefs[W]);
        t.vueApp._context.components[w.tagName]._updateRender(y), rr(function() {
          let W = t.el.querySelector('[data-livue-id="' + u + '"]');
          W && Jo(W);
        });
      }, t._childRegistry[u] = w, o[u] = !0;
    }
    let L = w.tagName, j = s.dataset.livueRef;
    j && t._rootLivue && (t._rootLivue.refs[j] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(M, $) {
        return w.livue.call(M, $ || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(M, $) {
        return w.livue.set(M, $);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(M, $) {
        return w.livue.dispatch(M, $);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return w.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return w.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return w.livue;
      }
    });
    let P = s.dataset.livueModel;
    if (P && t._rootState && ln("$modelUpdate", w.name, u, function(M) {
      M && M.value !== void 0 && qt(t._rootState, P, M.value);
    }), E) {
      let M = Xn(
        "<" + g + ">" + m + "</" + g + ">",
        'data-livue-id="' + u + '"'
      ), $ = Object.assign({}, Fa(), w.composables || {});
      i[L] = $r(
        M,
        w.state,
        w.livue,
        $,
        t._versions,
        w.name
      );
    }
    t._versions[L] === void 0 && (t._versions[L] = 0);
    let D = document.createElement(L);
    D.setAttribute(":key", "livueV['" + L + "']"), s.parentNode.replaceChild(D, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let eo = 0;
function ti() {
  return typeof document < "u" && "startViewTransition" in document;
}
const _r = /* @__PURE__ */ new WeakMap();
function to() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const rc = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (eo++, r = "livue-transition-" + eo), _r.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), ti() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    to();
  },
  updated(e, t) {
    let n = _r.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), ti() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    _r.delete(e), e.removeAttribute("data-livue-transition"), to();
  }
};
function ic(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function oc(e) {
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
function ac(e, t) {
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
function lc(e, t) {
  if (t) {
    var n = ac(e, t);
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
let wr = 0;
function sc(e) {
  return hl({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = tn(!1), i = si(null), o = null, a = tn(null);
      async function l() {
        if (!r.value)
          try {
            let u = await hs({
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
        wr++;
        let c = "lazy-" + wr + "-" + Date.now(), p = d.memo ? d.memo.name : "", h = Et(d.state || {}), v = d.memo || {}, { createLivueHelper: m, buildComponentDef: g, processTemplate: b, createReactiveState: w } = e._lazyHelpers, T = w(h), O = JSON.parse(JSON.stringify(h)), E = { _updateTemplate: null }, L = m(
          c,
          T,
          v,
          E,
          O,
          u.snapshot,
          {
            rootComponent: e,
            isChild: !0,
            parentLivue: e._rootLivue || null,
            pinia: e._pinia || null
          }
        ), j = L.livue, P = L.composables;
        v.errors && Se(j.errors, v.errors);
        let D = "livue-lazy-child-" + wr, M = b(u.html, e), $ = Xn(
          M.template,
          'data-livue-id="' + c + '"'
        ), Z = g(
          $,
          T,
          j,
          P,
          e._versions,
          p
        );
        e._childRegistry[c] = {
          tagName: D,
          state: T,
          memo: v,
          livue: j,
          componentRef: E,
          name: p,
          id: c
        }, E._updateTemplate = function(U) {
          let Y = b(U, e), J = Xn(
            Y.template,
            'data-livue-id="' + c + '"'
          );
          for (let x in Y.childDefs)
            e.vueApp._context.components[x] || e.vueApp.component(x, Y.childDefs[x]);
          let X = g(
            J,
            T,
            j,
            P,
            e._versions,
            p
          );
          e.vueApp._context.components[D] = X, e._versions[D] = (e._versions[D] || 0) + 1, i.value = X;
        };
        let K = v.listeners || null;
        if (K)
          for (let U in K)
            (function(Y, J) {
              ln(U, p, c, function(X) {
                J.call(Y, X);
              });
            })(K[U], j);
        for (let U in M.childDefs)
          e.vueApp._context.components[U] || e.vueApp.component(U, M.childDefs[U]);
        e._versions[D] = 0, e.vueApp._context.components[D] || e.vueApp.component(D, Z), i.value = Z, r.value = !0;
      }
      return $o(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Ho(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? Ni(i.value) : Ni("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class uc {
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
    this.name = r.memo ? r.memo.name : "", this.state = qr(Et(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Le({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: ei,
      buildComponentDef: $r,
      processTemplate: In,
      createReactiveState: qr
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
      _updateTemplate: function(g, b) {
        b = b || {}, be("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: g
        });
        var w = oc(r.el);
        Uo(r.el);
        let T;
        try {
          T = In(g, r);
        } catch (E) {
          console.error("[LiVue] Error processing updated template:", E);
          return;
        }
        if (!r.vueApp) return;
        for (let E in T.childDefs)
          r.vueApp._context.components[E] || r.vueApp.component(E, T.childDefs[E]);
        function O() {
          r._currentRootDef._updateRender(T.template), rr(function() {
            Jo(r.el), lc(r.el, w), be("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (b.skipTransition) {
          O();
          return;
        }
        ti() ? ic(O, { type: b.transitionType }) : O();
      }
    }, o = JSON.parse(JSON.stringify(Et(t.state || {})));
    this._cleanups = la(), this._pinia = Di();
    let a = ei(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups,
      initialHtml: this.el.innerHTML,
      pinia: this._pinia
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, be("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u;
    try {
      u = In(this.el.innerHTML, this);
    } catch (g) {
      console.error("[LiVue] Error processing initial template:", g), u = { template: this.el.innerHTML, childDefs: {} };
    }
    let d = t.memo && t.memo.errors || null;
    d && Se(l.errors, d);
    let c = t.memo && t.memo.listeners || null;
    if (c)
      for (let g in c)
        (function(b, w, T, O) {
          ln(g, T, O, function(E) {
            w.call(b, E);
          });
        })(c[g], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = fa(r.componentId, p, function(g, b) {
      l.call(g, b);
    }));
    let h = Object.assign({}, Fa(), s), v = $r(u.template, r.state, l, h, r._versions, r.name);
    this._currentRootDef = v, this._rootDefRef = si(v), this.vueApp = gl({
      setup: function() {
        return {
          rootDef: r._rootDefRef
        };
      },
      template: '<component :is="rootDef"></component>'
    });
    let m;
    for (m in u.childDefs)
      this.vueApp._context.components[m] || this.vueApp.component(m, u.childDefs[m]);
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", sc(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = this._pinia || Di();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let a = 0; a < window.LiVue._setupCallbacks.length; a++)
        try {
          let l = window.LiVue._setupCallbacks[a](n);
          l && typeof l.then == "function" && await l;
        } catch (l) {
          console.error("[LiVue] Error in setup() callback:", l);
        }
    let i = Cs();
    for (let a = 0; a < i.length; a++)
      n.directive(i[a].name, i[a].directive);
    let o = nc();
    for (let a = 0; a < o.length; a++)
      n.directive(o[a].name, o[a].directive);
    t.el.innerHTML = "";
    try {
      t.vueApp.mount(t.el);
    } catch (a) {
      console.error("[LiVue] Vue app mount failed:", a);
    }
  }
  /**
   * Destroy the Vue app instance and clean up event listeners.
   */
  destroy() {
    for (let t in this._childRegistry) {
      let n = this._childRegistry[t];
      be("component.destroy", {
        component: { id: t, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Ji(t), Xi(t), Yr(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Yi(n.name), zi(t);
    }
    if (be("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Ji(this.componentId), Xi(this.componentId), Yr(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Yi(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), zi(this.componentId), this.vueApp) {
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
function Ae(e) {
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
let no = /* @__PURE__ */ new Set();
const cc = {
  mounted(e, t, n) {
    let r = Ae(n);
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
    no.has(u) || (no.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Er = /* @__PURE__ */ new WeakMap(), dc = {
  mounted(e, t, n) {
    e.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + e.tagName.toLowerCase() + ">");
    let r = Ae(n);
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
    e.addEventListener("submit", l), Er.set(e, l);
  },
  unmounted(e) {
    let t = Er.get(e);
    t && (e.removeEventListener("submit", t), Er.delete(e));
  }
}, gn = /* @__PURE__ */ new WeakMap(), fc = {
  mounted(e, t, n) {
    let r = Ae(n);
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
      let v = parseInt(s, 10);
      isNaN(v) || (d = v + "px");
    }
    let c = l.leave === !0, p = !1, h = new IntersectionObserver(
      function(v) {
        let m = v[0];
        (c ? !m.isIntersecting : m.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (h.disconnect(), gn.delete(e)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    h.observe(e), gn.set(e, h);
  },
  unmounted(e) {
    let t = gn.get(e);
    t && (t.disconnect(), gn.delete(e));
  }
};
var Kn = /* @__PURE__ */ new Set(), ht = /* @__PURE__ */ new WeakMap(), ro = !1;
function _t(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function pc(e, t) {
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
function ni(e) {
  var t = ht.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = pc(n, i);
      if (typeof r == "object" && r !== null) {
        var a = r.active ? _t(r.active) : [], l = r.inactive ? _t(r.inactive) : [];
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
        var s = _t(r);
        o ? (s.forEach(function(u) {
          e.classList.add(u);
        }), e.setAttribute("data-current", ""), e.setAttribute("aria-current", "page")) : (s.forEach(function(u) {
          e.classList.remove(u);
        }), e.removeAttribute("data-current"), e.removeAttribute("aria-current"));
      }
    }
  }
}
function io() {
  Kn.forEach(function(e) {
    e.isConnected ? ni(e) : (Kn.delete(e), ht.delete(e));
  });
}
function vc() {
  ro || (ro = !0, window.addEventListener("popstate", io), window.addEventListener("livue:navigated", io));
}
const mc = {
  mounted(e, t) {
    ht.set(e, { value: t.value, modifiers: t.modifiers || {} }), Kn.add(e), vc(), ni(e);
  },
  updated(e, t) {
    ht.set(e, { value: t.value, modifiers: t.modifiers || {} }), ni(e);
  },
  unmounted(e) {
    var t = ht.get(e);
    if (t) {
      var n = t.value;
      if (typeof n == "object" && n !== null) {
        var r = n.active ? _t(n.active) : [], i = n.inactive ? _t(n.inactive) : [];
        r.forEach(function(o) {
          e.classList.remove(o);
        }), i.forEach(function(o) {
          e.classList.remove(o);
        });
      } else typeof n == "string" && _t(n).forEach(function(o) {
        e.classList.remove(o);
      });
    }
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), Kn.delete(e), ht.delete(e);
  }
};
let oo = 0;
const hc = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    oo++;
    let n = "livue-ignore-" + oo;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, Dt = /* @__PURE__ */ new WeakMap();
let ao = 0;
function gc(e) {
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
function bc(e) {
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
function bn(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function lo(e, t) {
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
function yc(e) {
  return !!e.component;
}
function Sr(e, t) {
  return e[t] && typeof e[t] == "object" && "value" in e[t] ? e[t].value : e[t];
}
function _c(e, t, n) {
  e[t] && typeof e[t] == "object" && "value" in e[t] ? e[t].value = n : e[t] = n;
}
const wc = {
  mounted(e, t, n) {
    let r = gc(n);
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
    ao++;
    let s = "model-" + ao, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = bc(l);
    l.live && !d && !c && (d = 150);
    function p(E) {
      if (l.number) {
        let L = Number(E);
        E = isNaN(L) ? 0 : L;
      }
      l.boolean && (E = !!E && E !== "false" && E !== "0"), _c(o, a, E);
    }
    function h(E) {
      d > 0 ? xt(s, d)(function() {
        p(E);
      }) : c > 0 ? sn(s, c)(function() {
        p(E);
      }) : p(E);
    }
    let v = Sr(o, a), m = yc(n), g = n.component, b = null, w = null, T = null, O = null;
    if (m && g)
      O = g.emit, g.emit = function(E, ...L) {
        if (E === "update:modelValue") {
          let j = L[0];
          h(j);
          return;
        }
        return O.call(g, E, ...L);
      }, g.props && "modelValue" in g.props && (T = Te(
        function() {
          return Sr(o, a);
        },
        function(E) {
          g.vnode && g.vnode.props && (g.vnode.props.modelValue = E), g.exposed && typeof g.exposed.setValue == "function" && g.exposed.setValue(E), g.update && g.update();
        },
        { immediate: !0 }
      )), Dt.set(e, {
        isComponent: !0,
        componentInstance: g,
        originalEmit: O,
        stopWatcher: T,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let E = xt(s, d);
        b = function(L) {
          let j = bn(L.target);
          E(function() {
            p(j);
          });
        };
      } else if (c > 0) {
        let E = sn(s, c);
        b = function(L) {
          let j = bn(L.target);
          E(function() {
            p(j);
          });
        };
      } else
        b = function(E) {
          p(bn(E.target));
        };
      l.enter ? (w = function(E) {
        E.key === "Enter" && p(bn(E.target));
      }, e.addEventListener("keyup", w)) : e.addEventListener(u, b), lo(e, v), Dt.set(e, {
        isComponent: !1,
        handler: b,
        keyHandler: w,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(e, t, n) {
    let r = Dt.get(e);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a = Sr(o, i);
      lo(e, a);
    }
  },
  unmounted(e) {
    let t = Dt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), Dt.delete(e));
  }
}, xr = /* @__PURE__ */ new WeakMap(), Ec = 2500;
function Sc(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Ec;
}
const xc = {
  mounted(e, t, n) {
    let r = Ae(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = Sc(l), u = l["keep-alive"] === !0, d = l.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      c.isPaused || d && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function h() {
      c.intervalId || (c.intervalId = setInterval(p, s));
    }
    function v() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(m) {
        c.isVisible = m[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(e)), document.addEventListener("visibilitychange", v), c.visibilityHandler = v, h(), xr.set(e, c);
  },
  unmounted(e) {
    let t = xr.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), xr.delete(e));
  }
}, yn = /* @__PURE__ */ new WeakMap();
let Yn = typeof navigator < "u" ? navigator.onLine : !0, Gn = /* @__PURE__ */ new Set(), so = !1;
function Cc() {
  so || typeof window > "u" || (so = !0, window.addEventListener("online", function() {
    Yn = !0, Gn.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    Yn = !1, Gn.forEach(function(e) {
      e(!1);
    });
  }));
}
const Tc = {
  created(e, t) {
    Cc();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", Yn && (e.style.display = "none")), yn.set(e, o);
  },
  mounted(e, t) {
    let n = yn.get(e);
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
    r(Yn), n.updateFn = r, Gn.add(r);
  },
  unmounted(e) {
    let t = yn.get(e);
    t && t.updateFn && Gn.delete(t.updateFn), yn.delete(e);
  }
};
let uo = 0;
const Ot = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new Map(), Ac = {
  created(e, t) {
    uo++;
    let n = "livue-replace-" + uo, r = t.modifiers.self === !0;
    Ot.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Cr.set(n, 0);
  },
  mounted(e, t) {
    let n = Ot.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = Ot.get(e);
    n && (n.version++, Cr.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = Ot.get(e);
    t && Cr.delete(t.id), Ot.delete(e);
  }
}, Mt = /* @__PURE__ */ new WeakMap(), co = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Nc = 200;
function kc(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(co))
    if (e[t])
      return co[t];
  return Nc;
}
function Tr(e, t, n, r, i) {
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
const Lc = {
  created(e, t) {
    let n = e.style.display;
    Mt.set(e, {
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
    let r = Ae(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = Mt.get(e), o = t.modifiers || {}, a = kc(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Tr(e, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, Tr(e, i, o, u, !0)) : (i.isActive = !1, Tr(e, i, o, u, !1));
    }
    i.stopWatch = Te(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      d,
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    Mt.get(e);
  },
  unmounted(e) {
    let t = Mt.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), Mt.delete(e));
  }
}, _n = /* @__PURE__ */ new WeakMap(), Dc = {
  mounted(e, t, n) {
    let r = Ae(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = t.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = Te(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? e.setAttribute("data-loading", "") : e.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    _n.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = _n.get(e), i = Ae(n);
    if (!r || !i) return;
    let o = t.value, a = t.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Te(
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
    let t = _n.get(e);
    t && (t.stopWatch && t.stopWatch(), _n.delete(e));
  }
}, It = /* @__PURE__ */ new WeakMap(), Oc = {
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
    It.set(e, { targetId: n }), Zi(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = It.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      Qi(n.targetId);
      const i = t.modifiers.replace || !1;
      Zi(r, e, i), It.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = It.get(e);
    t && (Qi(t.targetId), It.delete(e));
  }
}, fo = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, po = ["ctrl", "alt", "shift", "meta"];
let vo = 0;
const mo = /* @__PURE__ */ new Set();
function Mc(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function Ic(e, t) {
  for (let i = 0; i < po.length; i++) {
    let o = po[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in fo)
    t[i] && (n = !0, e.key === fo[i] && (r = !0));
  return !(n && !r);
}
function Rc(e, t, n) {
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
      const { arg: u, modifiers: d } = l, c = Ae(s);
      if (!c) {
        console.warn("[LiVue] v-" + e + ": livue helper not found in component context");
        return;
      }
      if (u && !i) {
        const E = "v-" + e;
        mo.has(E) || (console.warn(
          "[LiVue] " + E + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), mo.add(E));
      }
      vo++;
      const p = "v-" + e + "-" + vo, h = Mc(d);
      let v = null, m = null;
      d.debounce && (v = xt(p, h)), d.throttle && (m = sn(p, h));
      let g = !1;
      const b = function(E) {
        let L = Rc(l.value, u, i);
        if (L.directFn) {
          let P = L.directFn;
          v ? v(P) : m ? m(P) : P();
          return;
        }
        if (!L.methodName) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const j = function() {
          d.confirm ? c.callWithConfirm(L.methodName, "Are you sure?", ...L.args) : c.call(L.methodName, ...L.args);
        };
        v ? v(j) : m ? m(j) : j();
      }, w = function(E) {
        if (!(d.self && E.target !== a) && !(r && !Ic(E, d))) {
          if (d.once) {
            if (g)
              return;
            g = !0;
          }
          d.prevent && E.preventDefault(), d.stop && E.stopPropagation(), b();
        }
      }, T = {};
      d.capture && (T.capture = !0), d.passive && (T.passive = !0);
      const O = {
        handler: w,
        options: T,
        outsideHandler: null
      };
      if (n && d.outside) {
        const E = function(L) {
          if (!a.contains(L.target) && L.target !== a) {
            if (d.once) {
              if (g)
                return;
              g = !0;
            }
            b();
          }
        };
        document.addEventListener(e, E, T), O.outsideHandler = E;
      } else
        a.addEventListener(e, w, T);
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
const Pc = B("click", {
  supportsOutside: !0,
  allowArg: !1
}), qc = {
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
let ho = 0;
const Vc = {
  created(e, t) {
    let n = t.value;
    n || (ho++, n = "scroll-" + ho), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, Rt = /* @__PURE__ */ new WeakMap();
function go(e, t, n, r, i) {
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
const jc = {
  created(e, t) {
    let n = e.style.display;
    Rt.set(e, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = t.modifiers || {};
    !r.class && !r.attr && (e.style.display = "none");
  },
  mounted(e, t, n) {
    let r = Ae(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = Rt.get(e), o = t.modifiers || {}, a = t.arg || null, l = t.value;
    i.stopWatch = Te(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        go(e, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = Rt.get(e);
    if (r && t.value !== t.oldValue) {
      let i = Ae(n);
      if (i) {
        let o = t.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        go(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = Rt.get(e);
    t && (t.stopWatch && t.stopWatch(), Rt.delete(e));
  }
}, wn = /* @__PURE__ */ new WeakMap();
let bo = 0;
function zc(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Hc(e, t) {
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
function $c(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const Fc = {
  mounted(e, t, n) {
    let r = Hc(t, n);
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
    bo++;
    let s = "watch-" + i + "-" + bo;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), wn.set(e, { blurHandler: p });
      return;
    }
    let u = zc(l) || 150, d = xt(s, u), c = Te(
      function() {
        return $c(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    wn.set(e, { stopWatcher: c });
  },
  unmounted(e) {
    let t = wn.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), wn.delete(e));
  }
}, Ar = /* @__PURE__ */ new WeakMap();
let yo = 0;
function Bc(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function Wc(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function Uc(e, t) {
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
function ur(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function cr(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function Jc(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Xc(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function Kc(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function Yc(e) {
  return Kc(e) ? e : e.querySelector("input, textarea, select");
}
function dr(e, t, n) {
  return {
    mounted(r, i, o) {
      if (Bc(o) && !Wc(o))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let a = i.arg;
      if (!a)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let l = Uc(i, o);
      if (!l)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: s } = l, u = Xc(s, a);
      if (!u)
        throw new Error("[LiVue] v-" + e + ': Property "' + a + '" not found in component state');
      let d = i.modifiers || {};
      yo++;
      let c = e + "-" + yo, p = Yc(r);
      if (!p) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let h = t(p, u, s, d, c);
      p.addEventListener(h.eventType, h.handler, { capture: !0 }), Ar.set(r, {
        targetEl: p,
        handler: h.handler,
        eventType: h.eventType
      });
    },
    unmounted(r) {
      let i = Ar.get(r);
      i && (n && n(r, i), i.targetEl.removeEventListener(i.eventType, i.handler, { capture: !0 }), Ar.delete(r));
    }
  };
}
function Ba(e, t) {
  return dr(e, function(n, r, i, o, a) {
    let l = Jc(o) || 150, s = t(a, l);
    return {
      eventType: "input",
      handler: function(u) {
        u.stopImmediatePropagation();
        let d = ur(u.target);
        s(function() {
          cr(i, r, d);
        });
      }
    };
  });
}
const Gc = Ba("debounce", xt), Zc = Ba("throttle", sn), Qc = dr(
  "blur",
  function(e, t, n, r, i) {
    let o = function(l) {
      l.stopImmediatePropagation();
    }, a = function(l) {
      cr(n, t, ur(l.target));
    };
    return e.addEventListener("blur", a), e._livueBlurHandler = a, { eventType: "input", handler: o };
  },
  function(e, t) {
    let n = t ? t.targetEl : e;
    n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler);
  }
), ed = dr(
  "enter",
  function(e, t, n, r, i) {
    let o = function(l) {
      l.stopImmediatePropagation();
    }, a = function(l) {
      l.key === "Enter" && cr(n, t, ur(l.target));
    };
    return e.addEventListener("keyup", a), e._livueEnterHandler = a, { eventType: "input", handler: o };
  },
  function(e, t) {
    let n = t ? t.targetEl : e;
    n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler);
  }
), td = dr("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = ur(o.target);
      a = !!a && a !== "false" && a !== "0", cr(n, t, a);
    }
  };
});
function _o(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _o(Object(n), !0).forEach(function(r) {
      nd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _o(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Rn(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Rn = function(t) {
    return typeof t;
  } : Rn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Rn(e);
}
function nd(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function je() {
  return je = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, je.apply(this, arguments);
}
function rd(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function id(e, t) {
  if (e == null) return {};
  var n = rd(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var od = "1.15.6";
function qe(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var ze = qe(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), dn = qe(/Edge/i), wo = qe(/firefox/i), Yt = qe(/safari/i) && !qe(/chrome/i) && !qe(/android/i), xi = qe(/iP(ad|od|hone)/i), Wa = qe(/chrome/i) && qe(/android/i), Ua = {
  capture: !1,
  passive: !1
};
function F(e, t, n) {
  e.addEventListener(t, n, !ze && Ua);
}
function z(e, t, n) {
  e.removeEventListener(t, n, !ze && Ua);
}
function Zn(e, t) {
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
function Ja(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Ce(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Zn(e, t) : Zn(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = Ja(e));
  }
  return null;
}
var Eo = /\s+/g;
function pe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Eo, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Eo, " ");
    }
}
function I(e, t, n) {
  var r = e && e.style;
  if (r) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
    !(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function wt(e, t) {
  var n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      var r = I(e, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!t && (e = e.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function Xa(e, t, n) {
  if (e) {
    var r = e.getElementsByTagName(t), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function Oe() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function oe(e, t, n, r, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var o, a, l, s, u, d, c;
    if (e !== window && e.parentNode && e !== Oe() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, d = o.height, c = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !ze))
      do
        if (i && i.getBoundingClientRect && (I(i, "transform") !== "none" || n && I(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(I(i, "border-top-width")), l -= p.left + parseInt(I(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var h = wt(i || e), v = h && h.a, m = h && h.d;
      h && (a /= m, l /= v, c /= v, d /= m, s = a + d, u = l + c);
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
function So(e, t, n) {
  for (var r = Xe(e, !0), i = oe(e)[t]; r; ) {
    var o = oe(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === Oe()) break;
    r = Xe(r, !1);
  }
  return !1;
}
function Ct(e, t, n, r) {
  for (var i = 0, o = 0, a = e.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== R.ghost && (r || a[o] !== R.dragged) && Ce(a[o], n.draggable, e, !1)) {
      if (i === t)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function Ci(e, t) {
  for (var n = e.lastElementChild; n && (n === R.ghost || I(n, "display") === "none" || t && !Zn(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function ge(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== R.clone && (!t || Zn(e, t)) && n++;
  return n;
}
function xo(e) {
  var t = 0, n = 0, r = Oe();
  if (e)
    do {
      var i = wt(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function ad(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var r in t)
        if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
    }
  return -1;
}
function Xe(e, t) {
  if (!e || !e.getBoundingClientRect) return Oe();
  var n = e, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = I(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return Oe();
        if (r || t) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return Oe();
}
function ld(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Nr(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var Gt;
function Ka(e, t) {
  return function() {
    if (!Gt) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), Gt = setTimeout(function() {
        Gt = void 0;
      }, t);
    }
  };
}
function sd() {
  clearTimeout(Gt), Gt = void 0;
}
function Ya(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function Ga(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Za(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!Ce(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = oe(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var fe = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function ud() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(I(i, "display") === "none" || i === R.ghost)) {
            e.push({
              target: i,
              rect: oe(i)
            });
            var o = Me({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = wt(i, !0);
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
      e.splice(ad(e, {
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
        var s = 0, u = l.target, d = u.fromRect, c = oe(u), p = u.prevFromRect, h = u.prevToRect, v = l.rect, m = wt(u, !0);
        m && (c.top -= m.f, c.left -= m.e), u.toRect = c, u.thisAnimationDuration && Nr(p, c) && !Nr(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (v.top - c.top) / (v.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = dd(v, p, h, i.options)), Nr(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, v, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        I(r, "transition", ""), I(r, "transform", "");
        var l = wt(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, I(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = cd(r), I(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), I(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          I(r, "transition", ""), I(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function cd(e) {
  return e.offsetWidth;
}
function dd(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var ct = [], kr = {
  initializeByDefault: !0
}, fn = {
  mount: function(t) {
    for (var n in kr)
      kr.hasOwnProperty(n) && !(n in t) && (t[n] = kr[n]);
    ct.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), ct.push(t);
  },
  pluginEvent: function(t, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = t + "Global";
    ct.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](Me({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Me({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    ct.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, je(r, u.defaults);
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
    return ct.forEach(function(i) {
      typeof i.eventProperties == "function" && je(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return ct.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function fd(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, d = e.oldDraggableIndex, c = e.newDraggableIndex, p = e.originalEvent, h = e.putSortable, v = e.extraEventProperties;
  if (t = t || n && n[fe], !!t) {
    var m, g = t.options, b = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ze && !dn ? m = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = d, m.newDraggableIndex = c, m.originalEvent = p, m.pullMode = h ? h.lastPutMode : void 0;
    var w = Me(Me({}, v), fn.getEventProperties(r, t));
    for (var T in w)
      m[T] = w[T];
    n && n.dispatchEvent(m), g[b] && g[b].call(t, m);
  }
}
var pd = ["evt"], de = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = id(r, pd);
  fn.pluginEvent.bind(R)(t, n, Me({
    dragEl: C,
    parentEl: ne,
    ghostEl: q,
    rootEl: G,
    nextEl: tt,
    lastDownEl: Pn,
    cloneEl: ee,
    cloneHidden: Ue,
    dragStarted: zt,
    putSortable: ae,
    activeSortable: R.active,
    originalEvent: i,
    oldIndex: gt,
    oldDraggableIndex: Zt,
    newIndex: me,
    newDraggableIndex: $e,
    hideGhostForTarget: nl,
    unhideGhostForTarget: rl,
    cloneNowHidden: function() {
      Ue = !0;
    },
    cloneNowShown: function() {
      Ue = !1;
    },
    dispatchSortableEvent: function(l) {
      ue({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function ue(e) {
  fd(Me({
    putSortable: ae,
    cloneEl: ee,
    targetEl: C,
    rootEl: G,
    oldIndex: gt,
    oldDraggableIndex: Zt,
    newIndex: me,
    newDraggableIndex: $e
  }, e));
}
var C, ne, q, G, tt, Pn, ee, Ue, gt, me, Zt, $e, En, ae, vt = !1, Qn = !1, er = [], Ze, _e, Lr, Dr, Co, To, zt, dt, Qt, en = !1, Sn = !1, qn, se, Or = [], ri = !1, tr = [], fr = typeof document < "u", xn = xi, Ao = dn || ze ? "cssFloat" : "float", vd = fr && !Wa && !xi && "draggable" in document.createElement("div"), Qa = (function() {
  if (fr) {
    if (ze)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), el = function(t, n) {
  var r = I(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Ct(t, 0, n), a = Ct(t, 1, n), l = o && I(o), s = a && I(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + oe(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + oe(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Ao] === "none" || a && r[Ao] === "none" && u + d > i) ? "vertical" : "horizontal";
}, md = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, hd = function(t, n) {
  var r;
  return er.some(function(i) {
    var o = i[fe].options.emptyInsertThreshold;
    if (!(!o || Ci(i))) {
      var a = oe(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, tl = function(t) {
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
      var p = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
    };
  }
  var r = {}, i = t.group;
  (!i || Rn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, nl = function() {
  !Qa && q && I(q, "display", "none");
}, rl = function() {
  !Qa && q && I(q, "display", "");
};
fr && !Wa && document.addEventListener("click", function(e) {
  if (Qn)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Qn = !1, !1;
}, !0);
var Qe = function(t) {
  if (C) {
    t = t.touches ? t.touches[0] : t;
    var n = hd(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[fe]._onDragOver(r);
    }
  }
}, gd = function(t) {
  C && C.parentNode[fe]._isOutsideThisEl(t.target);
};
function R(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = je({}, t), e[fe] = this;
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
      return el(e, this.options);
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
    supportPointer: R.supportPointer !== !1 && "PointerEvent" in window && (!Yt || xi),
    emptyInsertThreshold: 5
  };
  fn.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  tl(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : vd, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? F(e, "pointerdown", this._onTapStart) : (F(e, "mousedown", this._onTapStart), F(e, "touchstart", this._onTapStart)), this.nativeDraggable && (F(e, "dragover", this), F(e, "dragenter", this)), er.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), je(this, ud());
}
R.prototype = /** @lends Sortable.prototype */
{
  constructor: R,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (dt = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, C) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, d = i.filter;
      if (Cd(r), !C && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Yt && s && s.tagName.toUpperCase() === "SELECT") && (s = Ce(s, i.draggable, r, !1), !(s && s.animated) && Pn !== s)) {
        if (gt = ge(s), Zt = ge(s, i.draggable), typeof d == "function") {
          if (d.call(this, t, s, this)) {
            ue({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), de("filter", n, {
              evt: t
            }), o && t.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = Ce(u, c.trim(), r, !1), c)
            return ue({
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
          o && t.preventDefault();
          return;
        }
        i.handle && !Ce(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !C && r.parentNode === o) {
      var u = oe(r);
      if (G = o, C = r, ne = C.parentNode, tt = C.nextSibling, Pn = r, En = a.group, R.dragged = C, Ze = {
        target: C,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Co = Ze.clientX - u.left, To = Ze.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, C.style["will-change"] = "all", s = function() {
        if (de("delayEnded", i, {
          evt: t
        }), R.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !wo && i.nativeDraggable && (C.draggable = !0), i._triggerDragStart(t, n), ue({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), pe(C, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Xa(C, d.trim(), Mr);
      }), F(l, "dragover", Qe), F(l, "mousemove", Qe), F(l, "touchmove", Qe), a.supportPointer ? (F(l, "pointerup", i._onDrop), !this.nativeDraggable && F(l, "pointercancel", i._onDrop)) : (F(l, "mouseup", i._onDrop), F(l, "touchend", i._onDrop), F(l, "touchcancel", i._onDrop)), wo && this.nativeDraggable && (this.options.touchStartThreshold = 4, C.draggable = !0), de("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(dn || ze))) {
        if (R.eventCanceled) {
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
    C && Mr(C), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    z(t, "mouseup", this._disableDelayedDrag), z(t, "touchend", this._disableDelayedDrag), z(t, "touchcancel", this._disableDelayedDrag), z(t, "pointerup", this._disableDelayedDrag), z(t, "pointercancel", this._disableDelayedDrag), z(t, "mousemove", this._delayedDragTouchMoveHandler), z(t, "touchmove", this._delayedDragTouchMoveHandler), z(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? F(document, "pointermove", this._onTouchMove) : n ? F(document, "touchmove", this._onTouchMove) : F(document, "mousemove", this._onTouchMove) : (F(C, "dragend", this), F(G, "dragstart", this._onDragStart));
    try {
      document.selection ? Vn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (vt = !1, G && C) {
      de("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && F(document, "dragover", gd);
      var r = this.options;
      !t && pe(C, r.dragClass, !1), pe(C, r.ghostClass, !0), R.active = this, t && this._appendGhost(), ue({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (_e) {
      this._lastX = _e.clientX, this._lastY = _e.clientY, nl();
      for (var t = document.elementFromPoint(_e.clientX, _e.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(_e.clientX, _e.clientY), t !== n); )
        n = t;
      if (C.parentNode[fe]._isOutsideThisEl(t), n)
        do {
          if (n[fe]) {
            var r = void 0;
            if (r = n[fe]._onDragOver({
              clientX: _e.clientX,
              clientY: _e.clientY,
              target: t,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = Ja(n));
      rl();
    }
  },
  _onTouchMove: function(t) {
    if (Ze) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = q && wt(q, !0), l = q && a && a.a, s = q && a && a.d, u = xn && se && xo(se), d = (o.clientX - Ze.clientX + i.x) / (l || 1) + (u ? u[0] - Or[0] : 0) / (l || 1), c = (o.clientY - Ze.clientY + i.y) / (s || 1) + (u ? u[1] - Or[1] : 0) / (s || 1);
      if (!R.active && !vt) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (q) {
        a ? (a.e += d - (Lr || 0), a.f += c - (Dr || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        I(q, "webkitTransform", p), I(q, "mozTransform", p), I(q, "msTransform", p), I(q, "transform", p), Lr = d, Dr = c, _e = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!q) {
      var t = this.options.fallbackOnBody ? document.body : G, n = oe(C, !0, xn, !0, t), r = this.options;
      if (xn) {
        for (se = t; I(se, "position") === "static" && I(se, "transform") === "none" && se !== document; )
          se = se.parentNode;
        se !== document.body && se !== document.documentElement ? (se === document && (se = Oe()), n.top += se.scrollTop, n.left += se.scrollLeft) : se = Oe(), Or = xo(se);
      }
      q = C.cloneNode(!0), pe(q, r.ghostClass, !1), pe(q, r.fallbackClass, !0), pe(q, r.dragClass, !0), I(q, "transition", ""), I(q, "transform", ""), I(q, "box-sizing", "border-box"), I(q, "margin", 0), I(q, "top", n.top), I(q, "left", n.left), I(q, "width", n.width), I(q, "height", n.height), I(q, "opacity", "0.8"), I(q, "position", xn ? "absolute" : "fixed"), I(q, "zIndex", "100000"), I(q, "pointerEvents", "none"), R.ghost = q, t.appendChild(q), I(q, "transform-origin", Co / parseInt(q.style.width) * 100 + "% " + To / parseInt(q.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, i = t.dataTransfer, o = r.options;
    if (de("dragStart", this, {
      evt: t
    }), R.eventCanceled) {
      this._onDrop();
      return;
    }
    de("setupClone", this), R.eventCanceled || (ee = Ga(C), ee.removeAttribute("id"), ee.draggable = !1, ee.style["will-change"] = "", this._hideClone(), pe(ee, this.options.chosenClass, !1), R.clone = ee), r.cloneId = Vn(function() {
      de("clone", r), !R.eventCanceled && (r.options.removeCloneOnHide || G.insertBefore(ee, C), r._hideClone(), ue({
        sortable: r,
        name: "clone"
      }));
    }), !n && pe(C, o.dragClass, !0), n ? (Qn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (z(document, "mouseup", r._onDrop), z(document, "touchend", r._onDrop), z(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, C)), F(document, "drop", r), I(C, "transform", "translateZ(0)")), vt = !0, r._dragStartId = Vn(r._dragStarted.bind(r, n, t)), F(document, "selectstart", r), zt = !0, window.getSelection().removeAllRanges(), Yt && I(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = R.active, d = En === s, c = l.sort, p = ae || u, h, v = this, m = !1;
    if (ri) return;
    function g(x, Nt) {
      de(x, v, Me({
        evt: t,
        isOwner: d,
        axis: h ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: p,
        target: r,
        completed: w,
        onMove: function(Ye, f) {
          return Cn(G, n, C, i, Ye, oe(Ye), t, f);
        },
        changed: T
      }, Nt));
    }
    function b() {
      g("dragOverAnimationCapture"), v.captureAnimationState(), v !== p && p.captureAnimationState();
    }
    function w(x) {
      return g("dragOverCompleted", {
        insertion: x
      }), x && (d ? u._hideClone() : u._showClone(v), v !== p && (pe(C, ae ? ae.options.ghostClass : u.options.ghostClass, !1), pe(C, l.ghostClass, !0)), ae !== v && v !== R.active ? ae = v : v === R.active && ae && (ae = null), p === v && (v._ignoreWhileAnimating = r), v.animateAll(function() {
        g("dragOverAnimationComplete"), v._ignoreWhileAnimating = null;
      }), v !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === C && !C.animated || r === n && !r.animated) && (dt = null), !l.dragoverBubble && !t.rootEl && r !== document && (C.parentNode[fe]._isOutsideThisEl(t.target), !x && Qe(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
    }
    function T() {
      me = ge(C), $e = ge(C, l.draggable), ue({
        sortable: v,
        name: "change",
        toEl: n,
        newIndex: me,
        newDraggableIndex: $e,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = Ce(r, l.draggable, n, !0), g("dragOver"), R.eventCanceled) return m;
    if (C.contains(t.target) || r.animated && r.animatingX && r.animatingY || v._ignoreWhileAnimating === r)
      return w(!1);
    if (Qn = !1, u && !l.disabled && (d ? c || (a = ne !== G) : ae === this || (this.lastPutMode = En.checkPull(this, u, C, t)) && s.checkPut(this, u, C, t))) {
      if (h = this._getDirection(t, r) === "vertical", i = oe(C), g("dragOverValid"), R.eventCanceled) return m;
      if (a)
        return ne = G, b(), this._hideClone(), g("revert"), R.eventCanceled || (tt ? G.insertBefore(C, tt) : G.appendChild(C)), w(!0);
      var O = Ci(n, l.draggable);
      if (!O || wd(t, h, this) && !O.animated) {
        if (O === C)
          return w(!1);
        if (O && n === t.target && (r = O), r && (o = oe(r)), Cn(G, n, C, i, r, o, t, !!r) !== !1)
          return b(), O && O.nextSibling ? n.insertBefore(C, O.nextSibling) : n.appendChild(C), ne = n, T(), w(!0);
      } else if (O && _d(t, h, this)) {
        var E = Ct(n, 0, l, !0);
        if (E === C)
          return w(!1);
        if (r = E, o = oe(r), Cn(G, n, C, i, r, o, t, !1) !== !1)
          return b(), n.insertBefore(C, E), ne = n, T(), w(!0);
      } else if (r.parentNode === n) {
        o = oe(r);
        var L = 0, j, P = C.parentNode !== n, D = !md(C.animated && C.toRect || i, r.animated && r.toRect || o, h), M = h ? "top" : "left", $ = So(r, "top", "top") || So(C, "top", "top"), Z = $ ? $.scrollTop : void 0;
        dt !== r && (j = o[M], en = !1, Sn = !D && l.invertSwap || P), L = Ed(t, r, o, h, D ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Sn, dt === r);
        var K;
        if (L !== 0) {
          var U = ge(C);
          do
            U -= L, K = ne.children[U];
          while (K && (I(K, "display") === "none" || K === q));
        }
        if (L === 0 || K === r)
          return w(!1);
        dt = r, Qt = L;
        var Y = r.nextElementSibling, J = !1;
        J = L === 1;
        var X = Cn(G, n, C, i, r, o, t, J);
        if (X !== !1)
          return (X === 1 || X === -1) && (J = X === 1), ri = !0, setTimeout(yd, 30), b(), J && !Y ? n.appendChild(C) : r.parentNode.insertBefore(C, J ? Y : r), $ && Ya($, 0, Z - $.scrollTop), ne = C.parentNode, j !== void 0 && !Sn && (qn = Math.abs(j - oe(r)[M])), T(), w(!0);
      }
      if (n.contains(C))
        return w(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    z(document, "mousemove", this._onTouchMove), z(document, "touchmove", this._onTouchMove), z(document, "pointermove", this._onTouchMove), z(document, "dragover", Qe), z(document, "mousemove", Qe), z(document, "touchmove", Qe);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    z(t, "mouseup", this._onDrop), z(t, "touchend", this._onDrop), z(t, "pointerup", this._onDrop), z(t, "pointercancel", this._onDrop), z(t, "touchcancel", this._onDrop), z(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (me = ge(C), $e = ge(C, r.draggable), de("drop", this, {
      evt: t
    }), ne = C && C.parentNode, me = ge(C), $e = ge(C, r.draggable), R.eventCanceled) {
      this._nulling();
      return;
    }
    vt = !1, Sn = !1, en = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), ii(this.cloneId), ii(this._dragStartId), this.nativeDraggable && (z(document, "drop", this), z(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Yt && I(document.body, "user-select", ""), I(C, "transform", ""), t && (zt && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), q && q.parentNode && q.parentNode.removeChild(q), (G === ne || ae && ae.lastPutMode !== "clone") && ee && ee.parentNode && ee.parentNode.removeChild(ee), C && (this.nativeDraggable && z(C, "dragend", this), Mr(C), C.style["will-change"] = "", zt && !vt && pe(C, ae ? ae.options.ghostClass : this.options.ghostClass, !1), pe(C, this.options.chosenClass, !1), ue({
      sortable: this,
      name: "unchoose",
      toEl: ne,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), G !== ne ? (me >= 0 && (ue({
      rootEl: ne,
      name: "add",
      toEl: ne,
      fromEl: G,
      originalEvent: t
    }), ue({
      sortable: this,
      name: "remove",
      toEl: ne,
      originalEvent: t
    }), ue({
      rootEl: ne,
      name: "sort",
      toEl: ne,
      fromEl: G,
      originalEvent: t
    }), ue({
      sortable: this,
      name: "sort",
      toEl: ne,
      originalEvent: t
    })), ae && ae.save()) : me !== gt && me >= 0 && (ue({
      sortable: this,
      name: "update",
      toEl: ne,
      originalEvent: t
    }), ue({
      sortable: this,
      name: "sort",
      toEl: ne,
      originalEvent: t
    })), R.active && ((me == null || me === -1) && (me = gt, $e = Zt), ue({
      sortable: this,
      name: "end",
      toEl: ne,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    de("nulling", this), G = C = ne = q = tt = ee = Pn = Ue = Ze = _e = zt = me = $e = gt = Zt = dt = Qt = ae = En = R.dragged = R.ghost = R.clone = R.active = null, tr.forEach(function(t) {
      t.checked = !0;
    }), tr.length = Lr = Dr = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        C && (this._onDragOver(t), bd(t));
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
      n = r[i], Ce(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || xd(n));
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
      Ce(l, this.options.draggable, i, !1) && (r[o] = l);
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
    var i = fn.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && tl(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    de("destroy", this);
    var t = this.el;
    t[fe] = null, z(t, "mousedown", this._onTapStart), z(t, "touchstart", this._onTapStart), z(t, "pointerdown", this._onTapStart), this.nativeDraggable && (z(t, "dragover", this), z(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), er.splice(er.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ue) {
      if (de("hideClone", this), R.eventCanceled) return;
      I(ee, "display", "none"), this.options.removeCloneOnHide && ee.parentNode && ee.parentNode.removeChild(ee), Ue = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ue) {
      if (de("showClone", this), R.eventCanceled) return;
      C.parentNode == G && !this.options.group.revertClone ? G.insertBefore(ee, C) : tt ? G.insertBefore(ee, tt) : G.appendChild(ee), this.options.group.revertClone && this.animate(C, ee), I(ee, "display", ""), Ue = !1;
    }
  }
};
function bd(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Cn(e, t, n, r, i, o, a, l) {
  var s, u = e[fe], d = u.options.onMove, c;
  return window.CustomEvent && !ze && !dn ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || oe(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function Mr(e) {
  e.draggable = !1;
}
function yd() {
  ri = !1;
}
function _d(e, t, n) {
  var r = oe(Ct(n.el, 0, n.options, !0)), i = Za(n.el, n.options, q), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function wd(e, t, n) {
  var r = oe(Ci(n.el, n.options.draggable)), i = Za(n.el, n.options, q), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Ed(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && qn < u * i) {
      if (!en && (Qt === 1 ? s > d + u * o / 2 : s < c - u * o / 2) && (en = !0), en)
        p = !0;
      else if (Qt === 1 ? s < d + qn : s > c - qn)
        return -Qt;
    } else if (s > d + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return Sd(t);
  }
  return p = p || a, p && (s < d + u * o / 2 || s > c - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function Sd(e) {
  return ge(C) < ge(e) ? 1 : -1;
}
function xd(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Cd(e) {
  tr.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && tr.push(r);
  }
}
function Vn(e) {
  return setTimeout(e, 0);
}
function ii(e) {
  return clearTimeout(e);
}
fr && F(document, "touchmove", function(e) {
  (R.active || vt) && e.cancelable && e.preventDefault();
});
R.utils = {
  on: F,
  off: z,
  css: I,
  find: Xa,
  is: function(t, n) {
    return !!Ce(t, n, t, !1);
  },
  extend: ld,
  throttle: Ka,
  closest: Ce,
  toggleClass: pe,
  clone: Ga,
  index: ge,
  nextTick: Vn,
  cancelNextTick: ii,
  detectDirection: el,
  getChild: Ct,
  expando: fe
};
R.get = function(e) {
  return e[fe];
};
R.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (R.utils = Me(Me({}, R.utils), r.utils)), fn.mount(r);
  });
};
R.create = function(e, t) {
  return new R(e, t);
};
R.version = od;
var ie = [], Ht, oi, ai = !1, Ir, Rr, nr, $t;
function Td() {
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
      this.sortable.nativeDraggable ? z(document, "dragover", this._handleAutoScroll) : (z(document, "pointermove", this._handleFallbackAutoScroll), z(document, "touchmove", this._handleFallbackAutoScroll), z(document, "mousemove", this._handleFallbackAutoScroll)), No(), jn(), sd();
    },
    nulling: function() {
      nr = oi = Ht = ai = $t = Ir = Rr = null, ie.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (nr = n, r || this.options.forceAutoScrollFallback || dn || ze || Yt) {
        Pr(n, this.options, l, r);
        var s = Xe(l, !0);
        ai && (!$t || o !== Ir || a !== Rr) && ($t && No(), $t = setInterval(function() {
          var u = Xe(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, jn()), Pr(n, i.options, u, r);
        }, 10), Ir = o, Rr = a);
      } else {
        if (!this.options.bubbleScroll || Xe(l, !0) === Oe()) {
          jn();
          return;
        }
        Pr(n, this.options, Xe(l, !1), !1);
      }
    }
  }, je(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function jn() {
  ie.forEach(function(e) {
    clearInterval(e.pid);
  }), ie = [];
}
function No() {
  clearInterval($t);
}
var Pr = Ka(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Oe(), u = !1, d;
    oi !== n && (oi = n, jn(), Ht = t.scroll, d = t.scrollFn, Ht === !0 && (Ht = Xe(n, !0)));
    var c = 0, p = Ht;
    do {
      var h = p, v = oe(h), m = v.top, g = v.bottom, b = v.left, w = v.right, T = v.width, O = v.height, E = void 0, L = void 0, j = h.scrollWidth, P = h.scrollHeight, D = I(h), M = h.scrollLeft, $ = h.scrollTop;
      h === s ? (E = T < j && (D.overflowX === "auto" || D.overflowX === "scroll" || D.overflowX === "visible"), L = O < P && (D.overflowY === "auto" || D.overflowY === "scroll" || D.overflowY === "visible")) : (E = T < j && (D.overflowX === "auto" || D.overflowX === "scroll"), L = O < P && (D.overflowY === "auto" || D.overflowY === "scroll"));
      var Z = E && (Math.abs(w - i) <= a && M + T < j) - (Math.abs(b - i) <= a && !!M), K = L && (Math.abs(g - o) <= a && $ + O < P) - (Math.abs(m - o) <= a && !!$);
      if (!ie[c])
        for (var U = 0; U <= c; U++)
          ie[U] || (ie[U] = {});
      (ie[c].vx != Z || ie[c].vy != K || ie[c].el !== h) && (ie[c].el = h, ie[c].vx = Z, ie[c].vy = K, clearInterval(ie[c].pid), (Z != 0 || K != 0) && (u = !0, ie[c].pid = setInterval(function() {
        r && this.layer === 0 && R.active._onTouchMove(nr);
        var Y = ie[this.layer].vy ? ie[this.layer].vy * l : 0, J = ie[this.layer].vx ? ie[this.layer].vx * l : 0;
        typeof d == "function" && d.call(R.dragged.parentNode[fe], J, Y, e, nr, ie[this.layer].el) !== "continue" || Ya(ie[this.layer].el, J, Y);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (t.bubbleScroll && p !== s && (p = Xe(p, !1)));
    ai = u;
  }
}, 30), il = function(t) {
  var n = t.originalEvent, r = t.putSortable, i = t.dragEl, o = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
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
function Ti() {
}
Ti.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = Ct(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: il
};
je(Ti, {
  pluginName: "revertOnSpill"
});
function Ai() {
}
Ai.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: il
};
je(Ai, {
  pluginName: "removeOnSpill"
});
R.mount(new Td());
R.mount(Ai, Ti);
const bt = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap();
function Ad(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Tn = /* @__PURE__ */ new WeakMap();
function Nd(e, t) {
  let n = e.from;
  e.oldIndex < e.newIndex ? n.insertBefore(e.item, n.children[e.oldIndex]) : n.insertBefore(e.item, n.children[e.oldIndex + 1]);
  let r = t.splice(e.oldIndex, 1)[0];
  t.splice(e.newIndex, 0, r);
}
function kd(e, t, n) {
  let r = e.item, i = zn.get(r);
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
const Ld = {
  mounted(e, t, n) {
    let r = Ae(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Ad(i), l = i.horizontal ? "horizontal" : "vertical";
    Tn.set(e, t);
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
        let h = Tn.get(e), v = h ? h.value : null;
        Array.isArray(v) ? Nd(p, v) : typeof v == "string" && r && kd(p, v, r);
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let c = R.create(e, u);
    bt.set(e, c);
  },
  updated(e, t) {
    Tn.set(e, t);
    let n = bt.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = bt.get(e);
    t && (t.destroy(), bt.delete(e)), Tn.delete(e);
  }
}, Dd = {
  mounted(e, t) {
    let n = t.value;
    zn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    zn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (zn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Od = {
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
}, Md = {
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
}, Id = {
  mounted(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = bt.get(e);
    r && r.option("group", n);
  },
  updated(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = bt.get(e);
    r && r.option("group", n);
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, Rd = B("dblclick"), Pd = B("mousedown"), qd = B("mouseup"), Vd = B("mouseenter"), jd = B("mouseleave"), zd = B("mouseover"), Hd = B("mouseout"), $d = B("mousemove"), Fd = B("contextmenu"), Bd = B("keydown", { isKeyboardEvent: !0 }), Wd = B("keyup", { isKeyboardEvent: !0 }), Ud = B("keypress", { isKeyboardEvent: !0 }), Jd = B("focus"), Xd = B("focusin"), Kd = B("focusout"), Yd = B("touchstart"), Gd = B("touchend"), Zd = B("touchmove"), Qd = B("touchcancel"), ef = B("change"), tf = B("input"), nf = B("reset"), rf = B("dragstart"), of = B("dragend"), af = B("dragenter"), lf = B("dragleave"), sf = B("dragover"), uf = B("drop"), cf = B("copy"), df = B("cut"), ff = B("paste"), pf = B("wheel"), vf = B("resize");
function mf() {
  N("init", cc), N("submit", dc), N("intersect", fc), N("current", mc), N("ignore", hc), N("model-livue", wc), N("debounce", Gc), N("throttle", Zc), N("blur", Qc), N("enter", ed), N("boolean", td), N("poll", xc), N("offline", Tc), N("transition", rc), N("replace", Ac), N("loading", Lc), N("target", Dc), N("stream", Oc), N("click", Pc), N("navigate", qc), N("scroll", Vc), N("dirty", jc), N("watch", Fc), N("sort", Ld), N("sort-item", Dd), N("sort-handle", Od), N("sort-ignore", Md), N("sort-group", Id), N("dblclick", Rd), N("mousedown", Pd), N("mouseup", qd), N("mouseenter", Vd), N("mouseleave", jd), N("mouseover", zd), N("mouseout", Hd), N("mousemove", $d), N("contextmenu", Fd), N("keydown", Bd), N("keyup", Wd), N("keypress", Ud), N("focus", Jd), N("focusin", Xd), N("focusout", Kd), N("touchstart", Yd), N("touchend", Gd), N("touchmove", Zd), N("touchcancel", Qd), N("change", ef), N("input", tf), N("reset", nf), N("dragstart", rf), N("dragend", of), N("dragenter", af), N("dragleave", lf), N("dragover", sf), N("drop", uf), N("copy", cf), N("cut", df), N("paste", ff), N("wheel", pf), N("resize", vf);
}
var un = !1, li = [];
function ol() {
  if (!un) {
    un = !0, console.log("[LiVue] Debug mode enabled");
    var e = sa();
    e.forEach(function(t) {
      var n = Ee(t, function(r) {
        var i = {};
        r.component && (i.componentId = r.component.id, i.componentName = r.component.name), r.el && (i.element = r.el.tagName), r.url && (i.url = r.url), r.updateCount !== void 0 && (i.updateCount = r.updateCount), r.lazyCount !== void 0 && (i.lazyCount = r.lazyCount), r.success !== void 0 && (i.success = r.success), r.error && (i.error = r.error.message || String(r.error)), r.isChild !== void 0 && (i.isChild = r.isChild), console.log("[LiVue] " + t + ":", i);
      });
      li.push(n);
    });
  }
}
function hf() {
  un && (un = !1, console.log("[LiVue] Debug mode disabled"), li.forEach(function(e) {
    e();
  }), li = []);
}
function ko() {
  return un;
}
function An(e, t) {
  var n = [];
  if (e.tagName && e.tagName.toLowerCase() === "livue-lazy" && Lo(e) && n.push(e), e.querySelectorAll) {
    var r = e.querySelectorAll("livue-lazy");
    r.forEach(function(i) {
      Lo(i) && n.push(i);
    });
  }
  n.forEach(function(i) {
    gf(i, t);
  });
}
function Lo(e) {
  if (e.dataset.livueLazyWrapped)
    return !1;
  for (var t = e.parentElement; t; ) {
    if (t.hasAttribute("data-livue-id"))
      return !1;
    t = t.parentElement;
  }
  return !0;
}
function gf(e, t) {
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
let Fe = null, Pt = null, Do = !1;
function bf() {
  if (Do)
    return;
  Do = !0;
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
function yf() {
  return Fe || (bf(), Fe = document.createElement("div"), Fe.className = "livue-hmr-indicator", document.body.appendChild(Fe), Fe);
}
function Nn(e, t) {
  const n = yf();
  switch (Pt && (clearTimeout(Pt), Pt = null), e) {
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
            `, Pt = setTimeout(function() {
        Oo();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, Pt = setTimeout(function() {
        Oo();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Oo() {
  Fe && Fe.classList.remove("visible");
}
let at = null, pr = !0, al = !0, Ft = !0, Hn = [];
function _f(e) {
  at = e;
}
async function wf(e) {
  if (pr) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), Ft && Nn("updating", e.fileName), Hn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = al ? Ef() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), Ft && Nn("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), at.reboot(), t && (await xf(), Sf(t)), Ft && Nn("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), Ft && Nn("error");
    }
  }
}
function Ef() {
  const e = /* @__PURE__ */ new Map();
  return at && at.all().forEach(function(n) {
    if (Mo(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Mo(r, i.name, i.state, e);
      }
  }), e;
}
function Mo(e, t, n, r) {
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
function Sf(e) {
  at && e.forEach(function(t, n) {
    const r = at.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function xf() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Cf() {
  return typeof import.meta < "u" && !1;
}
function Tf() {
  pr = !0;
}
function Af() {
  pr = !1;
}
function Nf() {
  return pr;
}
function kf(e) {
  e.indicator !== void 0 && (Ft = e.indicator), e.preserveState !== void 0 && (al = e.preserveState);
}
function Lf(e) {
  return Hn.push(e), function() {
    const t = Hn.indexOf(e);
    t !== -1 && Hn.splice(t, 1);
  };
}
async function Df() {
  at && await wf({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
const Of = {
  name: "livue:progress",
  install(e) {
    e.hook("request.started", function() {
      Br() && na();
    }), e.hook("request.finished", function() {
      Br() && ci();
    });
  }
}, Mf = {
  name: "livue:devtools",
  install(e, t, n) {
    Ia(n);
  }
}, If = {
  name: "livue:debug",
  install(e, t) {
    t && t.enabled && ol();
  }
};
class Rf {
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
    ys(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    hn(Of), hn(Mf), hn(If), ec(this), mf(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), An(document.body, this._initComponent.bind(this)), Zl(this), this._startObserver(), _f(this);
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
    }.bind(this)), An(document.body, this._initComponent.bind(this)), this._startObserver();
  }
  /**
   * Reboot but preserve certain components (don't destroy them).
   * Used during SPA navigation with @persist elements.
   */
  rebootPreserving() {
    document.querySelectorAll("[data-livue-id]").forEach(function(r) {
      this._isRoot(r) && this._initComponent(r);
    }.bind(this)), An(document.body, this._initComponent.bind(this));
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
    cn(t, !0, !1);
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
    Gl(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return ar(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    di();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return ps();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Bn;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: lt(),
      ...Ls()
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
    let r = new uc(t);
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
    return Ee(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return sa();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), Hi();
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
    }), Hi();
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
    }.bind(this)), An(t, this._initComponent.bind(this));
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
    return hn(t, n), this;
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
    return Qu(t), this;
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
    return Ru;
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
      isAvailable: Cf,
      isEnabled: Nf,
      enable: Tf,
      disable: Af,
      configure: kf,
      onUpdate: Lf,
      trigger: Df
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
    return t ? ol() : hf(), ko();
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return ko();
  }
}
const vr = new Rf();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = bl, document.head.appendChild(e);
}
var we = window.LiVueConfig || {};
(we.showProgressBar !== void 0 || we.progressBarColor !== void 0 || we.prefetch !== void 0 || we.prefetchOnHover !== void 0 || we.hoverDelay !== void 0 || we.cachePages !== void 0 || we.maxCacheSize !== void 0 || we.restoreScroll !== void 0) && vr.configureNavigation(we);
we.showProgressOnRequest !== void 0 && vr.progress.configure({ showOnRequest: we.showProgressOnRequest });
let Io = !1;
function kn() {
  Io || (Io = !0, vr.boot());
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", kn, { once: !0 }) : document.readyState === "interactive" ? (document.addEventListener("DOMContentLoaded", kn, { once: !0 }), window.addEventListener("load", kn, { once: !0 })) : queueMicrotask(kn);
window.LiVue = vr;
export {
  If as DebugPlugin,
  Mf as DevtoolsPlugin,
  Of as ProgressPlugin,
  vr as default
};
//# sourceMappingURL=livue.esm.js.map
