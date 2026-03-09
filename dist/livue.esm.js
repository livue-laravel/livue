import * as bn from "vue";
import { reactive as Ie, toRefs as zo, effectScope as Ho, ref as ln, markRaw as $o, hasInjectionContext as pl, inject as Fo, isRef as Jn, isReactive as Bo, toRaw as vl, getCurrentScope as ml, onScopeDispose as hl, watch as ke, nextTick as sr, computed as Wo, provide as gl, onBeforeUnmount as bl, onBeforeMount as yl, onUnmounted as Uo, onMounted as Jo, readonly as _l, watchEffect as wl, shallowRef as pi, defineComponent as El, h as Mi, createApp as Sl } from "vue";
const xl = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Xo(e, t) {
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
function Ii(e) {
  return JSON.stringify(e, Xo);
}
function $r(e) {
  return Ie(Object.assign({}, e));
}
function Cl(e, t) {
  let n;
  for (n in t) {
    let r = Ii(e[n]), i = Ii(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function Ko(e) {
  return JSON.parse(JSON.stringify(e, Xo));
}
function Tl(e) {
  return zo(e);
}
function _r(e, t) {
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
function $t(e, t, n) {
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
    let f = r[u];
    (l[f] === null || l[f] === void 0) && (l[f] = {}), Array.isArray(l[f]) && u + 1 < r.length && isNaN(Number(r[u + 1])) && (l[f] = Object.assign({}, l[f])), l = l[f];
  }
  let s = r[r.length - 1];
  l[s] = n, e[i] = a;
}
function yn(e, t) {
  let n = {}, r = Ko(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function Al(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function Fr(e) {
  if (Al(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(Fr);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = Fr(e[n]);
    return t;
  }
  return e;
}
function kt(e) {
  let t = {};
  for (let n in e)
    t[n] = Fr(e[n]);
  return t;
}
let Ri = 0;
function Nl() {
  return Ri++, Ri;
}
let Yo = /* @__PURE__ */ new Map();
function kl(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function Ll(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Go(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Yo.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: kl(n)
    });
  });
}
function Zo(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Yo.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Ll(n, i.inputs));
  });
}
let Qo;
const ur = (e) => Qo = e, ea = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Br(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Kt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Kt || (Kt = {}));
function Pi() {
  const e = Ho(!0), t = e.run(() => ln({}));
  let n = [], r = [];
  const i = $o({
    install(o) {
      ur(i), i._a = o, o.provide(ea, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const ta = () => {
};
function qi(e, t, n, r = ta) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && ml() && hl(i), i;
}
function mt(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const Dl = (e) => e(), ji = /* @__PURE__ */ Symbol(), wr = /* @__PURE__ */ Symbol();
function Wr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    Br(i) && Br(r) && e.hasOwnProperty(n) && !Jn(r) && !Bo(r) ? e[n] = Wr(i, r) : e[n] = r;
  }
  return e;
}
const Ol = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Ml(e) {
  return !Br(e) || !Object.prototype.hasOwnProperty.call(e, Ol);
}
const { assign: Je } = Object;
function Il(e) {
  return !!(Jn(e) && e.effect);
}
function Rl(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const f = zo(n.state.value[e]);
    return Je(f, o, Object.keys(a || {}).reduce((c, p) => (c[p] = $o(Wo(() => {
      ur(n);
      const h = n._s.get(e);
      return a[p].call(h, h);
    })), c), {}));
  }
  return s = na(e, u, t, n, r, !0), s;
}
function na(e, t, n = {}, r, i, o) {
  let a;
  const l = Je({ actions: {} }, n), s = { deep: !0 };
  let u, f, c = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), h;
  const v = r.state.value[e];
  !o && !v && (r.state.value[e] = {}), ln({});
  let m;
  function g(I) {
    let k;
    u = f = !1, typeof I == "function" ? (I(r.state.value[e]), k = {
      type: Kt.patchFunction,
      storeId: e,
      events: h
    }) : (Wr(r.state.value[e], I), k = {
      type: Kt.patchObject,
      payload: I,
      storeId: e,
      events: h
    });
    const M = m = /* @__PURE__ */ Symbol();
    sr().then(() => {
      m === M && (u = !0);
    }), f = !0, mt(c, k, r.state.value[e]);
  }
  const y = o ? function() {
    const { state: k } = n, M = k ? k() : {};
    this.$patch((z) => {
      Je(z, M);
    });
  } : (
    /* istanbul ignore next */
    ta
  );
  function w() {
    a.stop(), c.clear(), p.clear(), r._s.delete(e);
  }
  const T = (I, k = "") => {
    if (ji in I)
      return I[wr] = k, I;
    const M = function() {
      ur(r);
      const z = Array.from(arguments), ne = /* @__PURE__ */ new Set(), J = /* @__PURE__ */ new Set();
      function Y(W) {
        ne.add(W);
      }
      function re(W) {
        J.add(W);
      }
      mt(p, {
        args: z,
        name: M[wr],
        store: E,
        after: Y,
        onError: re
      });
      let G;
      try {
        G = I.apply(this && this.$id === e ? this : E, z);
      } catch (W) {
        throw mt(J, W), W;
      }
      return G instanceof Promise ? G.then((W) => (mt(ne, W), W)).catch((W) => (mt(J, W), Promise.reject(W))) : (mt(ne, G), G);
    };
    return M[ji] = !0, M[wr] = k, M;
  }, O = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: qi.bind(null, p),
    $patch: g,
    $reset: y,
    $subscribe(I, k = {}) {
      const M = qi(c, I, k.detached, () => z()), z = a.run(() => ke(() => r.state.value[e], (ne) => {
        (k.flush === "sync" ? f : u) && I({
          storeId: e,
          type: Kt.direct,
          events: h
        }, ne);
      }, Je({}, s, k)));
      return M;
    },
    $dispose: w
  }, E = Ie(O);
  r._s.set(e, E);
  const V = (r._a && r._a.runWithContext || Dl)(() => r._e.run(() => (a = Ho()).run(() => t({ action: T }))));
  for (const I in V) {
    const k = V[I];
    if (Jn(k) && !Il(k) || Bo(k))
      o || (v && Ml(k) && (Jn(k) ? k.value = v[I] : Wr(k, v[I])), r.state.value[e][I] = k);
    else if (typeof k == "function") {
      const M = T(k, I);
      V[I] = M, l.actions[I] = k;
    }
  }
  return Je(E, V), Je(vl(E), V), Object.defineProperty(E, "$state", {
    get: () => r.state.value[e],
    set: (I) => {
      g((k) => {
        Je(k, I);
      });
    }
  }), r._p.forEach((I) => {
    Je(E, a.run(() => I({
      store: E,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), v && o && n.hydrate && n.hydrate(E.$state, v), u = !0, f = !0, E;
}
// @__NO_SIDE_EFFECTS__
function Pl(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = pl();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Fo(ea, null) : null), a && ur(a), a = Qo, a._s.has(e) || (i ? na(e, t, r, a) : Rl(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let sn = /* @__PURE__ */ new Map();
function ql(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function Ft(e, t, n) {
  return ql(n) === "global" ? t : e + ":" + t;
}
function ra(e) {
  return JSON.parse(JSON.stringify(e));
}
function jl(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(ra(t));
}
function vi(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = Ft(e, t, r), a = sn.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ Pl(o, n), definition: n }, sn.set(o, a)), a.useStore(i);
}
function ct(e, t, n, r) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
  let i = n && n.scope ? n.scope : "auto", o = [];
  i === "component" ? o.push(Ft(e, t, { scope: "component" })) : i === "global" ? o.push(Ft(e, t, { scope: "global" })) : (o.push(Ft(e, t, { scope: "component" })), o.push(Ft(e, t, { scope: "global" })));
  for (let a = 0; a < o.length; a++) {
    let l = sn.get(o[a]);
    if (l)
      return l.useStore(r);
  }
  return null;
}
function Vl(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = kt(o.state || {}), s = ct(e, o.name, { scope: a }, n);
    if (s) {
      jl(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return ra(l);
      }
    }, f = vi(e, o.name, u, { scope: a }, n);
    r[o.name] = f;
  }
  return r;
}
function zl(e) {
  let t = e + ":", n = Array.from(sn.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && sn.delete(n[r]);
}
let ia = {
  ref: ln,
  computed: Wo,
  watch: ke,
  watchEffect: wl,
  reactive: Ie,
  readonly: _l,
  onMounted: Jo,
  onUnmounted: Uo,
  onBeforeMount: yl,
  onBeforeUnmount: bl,
  nextTick: sr,
  provide: gl,
  inject: Fo
}, Ur = Object.keys(ia), Hl = Ur.map(function(e) {
  return ia[e];
});
function Vi(e) {
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
function $l(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(m) {
    return t[m];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(m) {
    return a[m];
  });
  function u(m) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(m);
  }
  function f(m, g, y) {
    let w = n && n.$id ? n.$id : "", T = n && n._pinia ? n._pinia : void 0;
    if (g === void 0) {
      let O = ct(w, m, y || {}, T);
      if (O)
        return O;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return vi(w, m, g, y, T);
  }
  function c(m) {
    let g = n && n.$id ? n.$id : "", y = n && n._pinia ? n._pinia : void 0, w = ct(g, m, { scope: "auto" }, y);
    if (!w)
      throw new Error('[LiVue] useStore("' + m + '"): store not found.');
    return w;
  }
  let p = [], h = [];
  function v(m, g) {
    if (!u(m))
      return;
    let y = p.indexOf(m);
    if (y === -1) {
      p.push(m), h.push(g);
      return;
    }
    h[y] = g;
  }
  for (let m = 0; m < Ur.length; m++)
    v(Ur[m], Hl[m]);
  for (let m = 0; m < i.length; m++)
    v(i[m], o[m]);
  for (let m = 0; m < l.length; m++)
    v(l[m], s[m]);
  v("livue", n), v("store", f), v("useStore", c);
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
function Fl(e) {
  for (var t = ["debounce", "throttle"], n = 0; n < t.length; n++) {
    var r = t[n], i = new RegExp("v-model\\." + r + `(?:\\.(\\d+)(ms)?)?=["']([^"']+)["']`, "g");
    e = e.replace(i, /* @__PURE__ */ (function(u) {
      return function(f, c, p, h) {
        var v = c ? "." + c + (p || "ms") : "";
        return 'v-model="' + h + '" v-' + u + ":" + h + v;
      };
    })(r));
  }
  for (var o = ["blur", "enter"], a = 0; a < o.length; a++) {
    var l = o[a], s = new RegExp("v-model\\." + l + `=["']([^"']+)["']`, "g");
    e = e.replace(s, /* @__PURE__ */ (function(u) {
      return function(f, c) {
        return 'v-model="' + c + '" v-' + u + ":" + c;
      };
    })(l));
  }
  return e;
}
const zi = [
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
function Bl(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Wl(e) {
  let t = e.replace(/\$errors\b/g, "lvErrors");
  for (let n = 0; n < zi.length; n++) {
    let r = zi[n], i = new RegExp(Bl(r) + "\\b(?=\\s*\\()", "g");
    t = t.replace(i, "livue." + r);
  }
  return t;
}
function Hi(e) {
  return Wl(Fl(e));
}
function oa(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      oa(e.children[t]);
}
function $i(e, t, n) {
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
var Ul = {
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
}, Jl = /^[a-zA-Z][a-zA-Z0-9_]*$/;
function Er(e, t) {
  return typeof e != "string" || Ul[e] || !Jl.test(e) ? !1 : Array.isArray(t) ? t.indexOf(e) !== -1 : !0;
}
function Jr(e, t, n, r, i, o) {
  let a = Vi(e);
  a.html = Hi(a.html);
  let l;
  try {
    l = bn.compile(a.html);
  } catch (h) {
    console.error('[LiVue] Template compilation error in "' + (o || "unknown") + '":', h), l = bn.compile(
      '<div style="padding:8px;border:2px solid #f00;color:#f00;font-family:monospace">[LiVue] Template error: ' + (h.message || "compilation failed") + "</div>"
    );
  }
  let s = pi(l), u = [], f = !1;
  function c(h, v) {
    let m = s.value;
    f = !0;
    let g;
    try {
      g = m(h, u);
    } finally {
      f = !1;
    }
    return oa(g), g;
  }
  c._rc = !0;
  let p = {
    name: o || "LiVueComponent",
    render: c,
    setup: function() {
      bn.provide("livue", n);
      let h = Tl(t);
      var v = new Proxy(n.errors, {
        get: function(g, y, w) {
          var T = Reflect.get(g, y, w);
          return Array.isArray(T) ? T[0] : T;
        }
      });
      let m = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: v });
      if (a.setupCode) {
        let g = $l(a.setupCode, h, n, r);
        g && Object.assign(m, g);
      }
      return new Proxy(m, {
        get: function(g, y, w) {
          if (y in g || typeof y == "symbol") return Reflect.get(g, y, w);
          if (Er(y, n._callableMethods)) {
            var T = function() {
              var O = Array.prototype.slice.call(arguments);
              if (f) {
                var E = function() {
                  return n.call(y, ...O);
                };
                return $i(E, y, O);
              }
              return n.call(y, ...O);
            };
            return $i(T, y);
          }
        },
        getOwnPropertyDescriptor: function(g, y) {
          var w = Object.getOwnPropertyDescriptor(g, y);
          if (w) return w;
          if (Er(y, n._callableMethods))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(g, y) {
          return !!(y in g || Er(y, n._callableMethods));
        },
        set: function(g, y, w) {
          return g[y] = w, !0;
        },
        ownKeys: function(g) {
          return Reflect.ownKeys(g);
        }
      });
    }
  };
  return p._updateRender = function(h) {
    try {
      let v = Vi(h), m = bn.compile(Hi(v.html));
      if (m === s.value) return;
      u.length = 0, s.value = m;
    } catch (v) {
      console.error('[LiVue] Template update compilation error in "' + (o || "unknown") + '":', v);
    }
  }, p;
}
let at = null;
function Mt() {
  if (at)
    return at;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return at = e.getAttribute("content"), at;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (at = decodeURIComponent(t[1]), at) : null;
}
function Xl() {
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
}, pe = null, Xr = null, ye = null, Xn = !1, Yt = 0;
function Kl(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function Yl(e) {
  return (-1 + e) * 100;
}
function aa() {
  if (Xn) return;
  Xn = !0;
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
function Gl() {
  if (ye) return;
  aa(), ye = document.createElement("div"), ye.className = "livue-progress-bar livue-progress-hidden", ye.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(se.parent) || document.body).appendChild(ye);
}
function Zl() {
  if (!Xn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), Xn = !1, aa());
}
function Ql(e) {
  Object.assign(se, e), Zl();
}
function Kr() {
  return se.showOnRequest;
}
function la() {
  Yt++, pe === null && (Gl(), pe = 0, ye && ye.classList.remove("livue-progress-hidden"), cr(se.minimum), se.trickle && (Xr = setInterval(function() {
    sa();
  }, se.trickleSpeed)));
}
function cr(e) {
  pe !== null && (e = Kl(e, se.minimum, 1), pe = e, ye && (ye.style.transform = "translate3d(" + Yl(e) + "%, 0, 0)"));
}
function sa() {
  if (pe === null || pe >= 1) return;
  let e;
  pe < 0.2 ? e = 0.1 : pe < 0.5 ? e = 0.04 : pe < 0.8 ? e = 0.02 : pe < 0.99 ? e = 5e-3 : e = 0, cr(pe + e);
}
function mi() {
  Yt = Math.max(0, Yt - 1), !(Yt > 0) && pe !== null && (cr(1), clearInterval(Xr), Xr = null, setTimeout(function() {
    ye && ye.classList.add("livue-progress-hidden"), setTimeout(function() {
      pe = null, ye && (ye.style.transform = "translate3d(-100%, 0, 0)");
    }, se.speed);
  }, se.speed));
}
function es() {
  Yt = 0, mi();
}
function ts() {
  return pe !== null;
}
function ns() {
  return pe;
}
const Kn = {
  configure: Ql,
  start: la,
  set: cr,
  trickle: sa,
  done: mi,
  forceDone: es,
  isStarted: ts,
  getStatus: ns,
  isRequestProgressEnabled: Kr
};
var Bt = null, Fi = !1, Tt = !1, Ee = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Re = /* @__PURE__ */ new Map(), st = /* @__PURE__ */ new Map(), Yr = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new Map(), Qe = null;
function rs(e) {
  Object.assign(Ee, e), e.progressBarColor && Kn.configure({ color: e.progressBarColor });
}
function is(e) {
  Bt = e, !Fi && (Fi = !0, Qe = ua(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Qe },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (ca(Qe), Qe = t.state.pageKey, mn(t.state.url, !1, !0));
  }), as());
}
function ua() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function ca(e) {
  if (!(!Ee.restoreScroll || !e)) {
    Rn.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Rn.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Rn.set(e, i);
      }
    });
  }
}
function os(e) {
  if (!(!Ee.restoreScroll || !e)) {
    var t = Rn.get(e);
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
function as() {
  document.addEventListener("click", ls, !0), Ee.prefetch && (document.addEventListener("mouseenter", us, !0), document.addEventListener("mouseleave", cs, !0), document.addEventListener("mousedown", ds, !0), document.addEventListener("focus", fs, !0));
}
function ls(e) {
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
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), mn(n, !0, !1));
      }
    }
  }
}
function ss(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function us(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !Ee.prefetchOnHover)) {
      var n = ss(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            dr(r);
          }, Ee.hoverDelay);
          Yr.set(t, i);
        }
      }
    }
  }
}
function cs(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = Yr.get(t);
      n && (clearTimeout(n), Yr.delete(t));
    }
  }
}
function ds(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || dr(n);
    }
  }
}
function fs(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !Ee.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || dr(n);
    }
  }
}
function dr(e) {
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
      return Ee.cachePages && da(t, i), i;
    }) : null;
  }).catch(function(r) {
    return st.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return st.set(t, n), n;
}
function da(e, t) {
  for (var n = new DOMParser(), r = n.parseFromString(t, "text/html"), i = r.querySelector("title"); Re.size >= Ee.maxCacheSize; ) {
    var o = Re.keys().next().value;
    Re.delete(o);
  }
  Re.set(e, {
    html: t,
    title: i ? i.textContent : "",
    timestamp: Date.now()
  });
}
function hi() {
  Re.clear();
}
function gi(e) {
  Tt || !e || !e.url || (e.navigate ? (Re.clear(), mn(e.url, !0, !1)) : (Tt = !0, window.location.href = e.url));
}
async function mn(e, t, n) {
  if (!Tt) {
    if (!Bt) {
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
      Tt = !0, n || ca(Qe), Ee.showProgressBar && Kn.start();
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
          o = await l.text(), Ee.cachePages && da(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), f = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(y) {
              typeof y == "function" && y(u);
            }
          }
        });
        window.dispatchEvent(f);
        var c = ps(), p = /* @__PURE__ */ new Set();
        c.forEach(function(y) {
          y.livueIds.forEach(function(w) {
            p.add(w);
          });
        }), Bt._stopObserver(), Bt.destroyExcept(p), c.forEach(function(y) {
          y.element.parentNode && y.element.parentNode.removeChild(y.element);
        });
        var h = u.querySelector("title");
        h && (document.title = h.textContent), document.body.innerHTML = u.body.innerHTML, vs(c);
        var v = u.querySelector('meta[name="csrf-token"]'), m = document.querySelector('meta[name="csrf-token"]');
        if (v && m && (m.setAttribute("content", v.getAttribute("content")), Xl()), hs(u), ms(u), gs(u), t && (Qe = ua(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Qe },
          "",
          r
        )), bs(u), Bt.rebootPreserving(), n)
          os(Qe);
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
        Tt = !1, Ee.showProgressBar && Kn.done();
      }
    }
  }
}
function ps() {
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
function vs(e) {
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
function ms(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function hs(e) {
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
function gs(e) {
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
function bs(e) {
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
function ys() {
  return Tt;
}
var yt = /* @__PURE__ */ new Map(), _s = [
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
  }) : (yt.has(e) || yt.set(e, /* @__PURE__ */ new Set()), yt.get(e).add(t), function() {
    var n = yt.get(e);
    n && (n.delete(t), n.size === 0 && yt.delete(e));
  });
}
function we(e, t) {
  var n = yt.get(e);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(t);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + e + '" callback:', i);
    }
  });
}
function fa() {
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
function pa() {
  return _s.slice();
}
var Gr = [], Zr = [], un = !1;
function va(e) {
  return e.isolate ? Es(e) : new Promise(function(t, n) {
    Gr.push({
      payload: e,
      resolve: t,
      reject: n
    }), un || (un = !0, queueMicrotask(ma));
  });
}
function ws(e) {
  return new Promise(function(t, n) {
    Zr.push({
      payload: e,
      resolve: t,
      reject: n
    }), un || (un = !0, queueMicrotask(ma));
  });
}
async function ma() {
  var e = Gr, t = Zr;
  if (Gr = [], Zr = [], un = !1, !(e.length === 0 && t.length === 0)) {
    var n = ha(), r = Mt(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = e.map(function(g) {
      return g.payload;
    }), a = t.map(function(g) {
      return g.payload;
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
      }), u = await s.json();
      if (!s.ok) {
        var f = new Error(u.error || "Request failed");
        f.status = s.status, f.data = u;
        for (var c = 0; c < e.length; c++)
          e[c].reject(f);
        for (var c = 0; c < t.length; c++)
          t[c].reject(f);
        return;
      }
      for (var p = u.responses || [], h = u.lazyResponses || [], c = 0; c < p.length; c++)
        if (p[c] && p[c].redirect) {
          gi(p[c].redirect);
          return;
        }
      hi();
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
      we("request.finished", {
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
      we("request.finished", {
        url: n,
        success: !1,
        error: g,
        updateCount: e.length,
        lazyCount: t.length
      });
    }
  }
}
async function Es(e) {
  var t = ha(), n = Mt(), r = {
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
  }), a = await o.json();
  if (!o.ok) {
    var l = new Error(a.error || "Request failed");
    throw l.status = o.status, l.data = a, l;
  }
  var s = (a.responses || [])[0];
  if (!s)
    throw new Error("No response for isolated component update");
  if (s.redirect)
    return gi(s.redirect), new Promise(function() {
    });
  if (hi(), s.error) {
    var u = new Error(s.error);
    throw u.status = s.status || 500, u.data = s, u;
  }
  if (s.errors) {
    var u = new Error("Validation failed");
    throw u.status = 422, u.data = s, u;
  }
  return s;
}
function ha() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function Sr(e, t, n, r, i) {
  return va({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
async function Ss(e, t, n, r) {
  return va({
    snapshot: e,
    diffs: n || {},
    calls: t,
    isolate: r || !1
  });
}
let Qr = null, ga = /* @__PURE__ */ new Map();
function xs() {
  return Ie({});
}
function Te(e, t) {
  ei(e);
  for (let n in t)
    e[n] = t[n];
}
function ei(e) {
  for (let t in e)
    delete e[t];
}
function Cs(e) {
  Qr = e;
}
function ht(e, t, n, r) {
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
  }), i ? !0 : (Qr ? Qr(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function Ts(e, t) {
  typeof t == "function" && ga.set(e, t);
}
function ti(e) {
  ga.delete(e);
}
var Ye = null, As = "livue-devtools-styles", Ns = `
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
function ks() {
  Ye || (Ye = document.createElement("style"), Ye.id = As, Ye.textContent = Ns, document.head.appendChild(Ye));
}
function Ls() {
  Ye && (Ye.remove(), Ye = null);
}
var bi = [];
function N(e, t, n) {
  bi.push({
    name: e,
    directive: t
  });
}
function Ds() {
  return bi;
}
function Os() {
  return {
    plugins: [],
    stores: [],
    components: [],
    directives: bi.map(function(e) {
      return { name: e.name, filters: null };
    })
  };
}
const ze = /* @__PURE__ */ new Map(), Fe = /* @__PURE__ */ new Map();
let Bi = !1;
function pt() {
  return typeof window < "u" && window.Echo;
}
function Ms(e, t) {
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
function ba(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!pt())
    return Bi || (Bi = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: f, isCustomEvent: c } = o, p = Ms(a, l);
    if (!p) continue;
    const h = l + ":" + a + ":" + s + ":" + e;
    if (Fe.has(h)) {
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
    if (l === "presence" && f)
      Is(p, s, v);
    else {
      const m = c ? "." + s : s;
      p.listen(m, v);
    }
    Fe.set(h, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: v,
      isPresenceEvent: f,
      isCustomEvent: c
    }), r.push(h);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      ya(r[i]);
  };
}
function Is(e, t, n) {
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
function ya(e) {
  const t = Fe.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    Fe.delete(e), Rs(t.channelKey);
  }
}
function Wi(e) {
  const t = ":" + e, n = [];
  Fe.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    ya(n[r]);
}
function _a(e, t) {
  e === "presence" ? window.Echo.leave(t) : e === "private" ? window.Echo.leaveChannel("private-" + t) : window.Echo.leaveChannel(t);
}
function Rs(e) {
  let t = !1;
  if (Fe.forEach(function(r) {
    r.channelKey === e && (t = !0);
  }), t) return;
  if (ze.get(e) && pt()) {
    const r = e.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      _a(i, o);
    } catch {
    }
  }
  ze.delete(e);
}
function Ui() {
  Fe.clear(), ze.forEach(function(e, t) {
    if (pt()) {
      const n = t.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        _a(r, i);
      } catch {
      }
    }
  }), ze.clear();
}
function Ps() {
  return {
    echoAvailable: pt(),
    channels: Array.from(ze.keys()),
    subscriptions: Array.from(Fe.keys())
  };
}
function qs() {
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
var Ji = 100, js = 200, Vs = 50, L = {
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
}, Oe = [], Lt = !1, ni = /* @__PURE__ */ new Set();
function Ae() {
  ni.forEach(function(e) {
    try {
      e();
    } catch (t) {
      console.error("[LiVue DevTools] Listener error:", t);
    }
  });
}
var zs = 0;
function Hs() {
  return "req-" + ++zs + "-" + Date.now();
}
function $s(e) {
  var t = new Date(e), n = t.getHours().toString().padStart(2, "0"), r = t.getMinutes().toString().padStart(2, "0"), i = t.getSeconds().toString().padStart(2, "0"), o = t.getMilliseconds().toString().padStart(3, "0");
  return n + ":" + r + ":" + i + "." + o;
}
function wa() {
  Lt || (Lt = !0, Oe.push(Ce("component.init", function(e) {
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
    }), Ae();
  })), Oe.push(Ce("component.destroy", function(e) {
    var t = e.component;
    L.components.delete(t.id), L.componentBenchmarkStats.delete(t.id), Ae();
  })), Oe.push(Ce("request.started", function(e) {
    var t = Hs(), n = {
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
    L.pendingRequests.set(e.url + "-" + t, n), L.requests.unshift(n), L.requests.length > Ji && L.requests.pop(), L.perf.totalRequests++, Ae();
  })), Oe.push(Ce("request.finished", function(e) {
    var t = null;
    if (L.pendingRequests.forEach(function(r, i) {
      !t && r.url === e.url && r.status === "pending" && (t = { req: r, key: i });
    }), t) {
      var n = t.req;
      n.endTime = Date.now(), n.duration = n.endTime - n.startTime, n.status = e.success ? "success" : "error", n.responses = e.responses, n.lazyResponses = e.lazyResponses, n.error = e.error, L.pendingRequests.delete(t.key), e.success ? L.perf.successfulRequests++ : L.perf.failedRequests++, L.perf.totalRequestTime += n.duration, L.perf.avgRequestTime = L.perf.totalRequestTime / L.perf.totalRequests, n.duration < L.perf.minRequestTime && (L.perf.minRequestTime = n.duration), n.duration > L.perf.maxRequestTime && (L.perf.maxRequestTime = n.duration), Ae();
    }
  })), Oe.push(Ce("template.updating", function(e) {
    var t = e.component;
    L.pendingSwaps.set(t.id, Date.now());
  })), Oe.push(Ce("template.updated", function(e) {
    var t = e.component, n = L.pendingSwaps.get(t.id);
    if (n) {
      var r = Date.now() - n;
      L.pendingSwaps.delete(t.id), L.perf.totalTemplateSwaps++, L.perf.totalTemplateSwapTime += r, L.perf.avgTemplateSwapTime = L.perf.totalTemplateSwapTime / L.perf.totalTemplateSwaps, Ae();
    }
  })), Oe.push(Ce("benchmark.received", function(e) {
    var t = Date.now(), n = {
      time: t,
      componentId: e.componentId,
      componentName: e.componentName,
      timings: e.timings
    };
    L.serverBenchmarks.unshift(n), L.serverBenchmarks.length > Ji && L.serverBenchmarks.pop();
    var r = e.componentId, i = L.componentBenchmarkStats.get(r);
    i || (i = { count: 0, averages: {}, latest: null }, L.componentBenchmarkStats.set(r, i)), i.count++, i.latest = { time: t, timings: e.timings };
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
    L.errors.unshift(t), L.errors.length > Vs && L.errors.pop(), Ae();
  })));
}
function Ea() {
  Lt && (Lt = !1, Oe.forEach(function(e) {
    e();
  }), Oe = []);
}
function Fs() {
  return Lt;
}
function Bs(e) {
  if (Lt) {
    var t = {
      time: Date.now(),
      name: e.name,
      data: e.data,
      mode: e.mode,
      source: e.source,
      sourceId: e.sourceId,
      target: e.target
    };
    L.events.unshift(t), L.events.length > js && L.events.pop(), Ae();
  }
}
function Ws() {
  return Array.from(L.components.values());
}
function Sa() {
  return L.requests;
}
function xa() {
  return L.events;
}
function Ca() {
  return Object.assign({}, L.perf);
}
function Us() {
  return L.serverBenchmarks;
}
function Js(e) {
  return L.componentBenchmarkStats.get(e) || null;
}
function Ta() {
  L.requests = [], L.pendingRequests.clear(), Ae();
}
function Aa() {
  L.events = [], Ae();
}
function Xs() {
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
  }, L.pendingSwaps.clear(), L.serverBenchmarks = [], L.componentBenchmarkStats.clear(), Ae();
}
function Ks(e) {
  return ni.add(e), function() {
    ni.delete(e);
  };
}
function yi(e) {
  return $s(e);
}
function Ys(e) {
  var t = L.components.get(e);
  if (!t || !t.livue || !t.livue._getDevToolsInfo)
    return null;
  try {
    return t.livue._getDevToolsInfo();
  } catch (n) {
    return console.error("[LiVue DevTools] Error getting component info:", n), null;
  }
}
function Gs() {
  return Os();
}
function Zs() {
  return qs();
}
var ri = null, Xi = null, ii = null;
function Qs(e) {
  ri = e;
}
function eu(e) {
  ii = e;
}
function Na() {
  if (!ri)
    return [];
  var e = ri.all(), t = [];
  return e.forEach(function(n) {
    var r = ka(n, !1);
    t.push(r);
  }), t;
}
function ka(e, t) {
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
      l.children.push(ka(u, !0));
    }
  return l;
}
function La(e) {
  var t = Na();
  if (e.innerHTML = "", t.length === 0) {
    e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E6;</div>No components found</div>';
    return;
  }
  t.forEach(function(n) {
    e.appendChild(Da(n));
  });
}
function Da(e, t) {
  var n = document.createElement("div");
  n.className = "livue-devtools__node", n.dataset.id = e.id;
  var r = e.children && e.children.length > 0, i = document.createElement("div");
  i.className = "livue-devtools__node-header", e.id === Xi && i.classList.add("livue-devtools__node-header--selected");
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
    var f = document.createElement("span");
    f.className = "livue-devtools__badge livue-devtools__badge--loading", f.textContent = "loading", u.appendChild(f);
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
    Xi = e.id;
    var y = document.querySelectorAll(".livue-devtools__node-header");
    y.forEach(function(w) {
      w.classList.remove("livue-devtools__node-header--selected");
    }), i.classList.add("livue-devtools__node-header--selected"), ii && ii(e);
  }), n.appendChild(i), r) {
    var h = document.createElement("div");
    h.className = "livue-devtools__node-children", e.children.forEach(function(v) {
      h.appendChild(Da(v));
    }), n.appendChild(h);
  }
  return n;
}
var ut = null, Rt = "state", Ve = /* @__PURE__ */ new Set(), cn = null;
function tu(e) {
  ut = e;
}
function fr(e) {
  if (cn = e, e.innerHTML = "", !ut) {
    e.innerHTML = '<div class="livue-devtools__state-empty">Select a component to inspect its state</div>';
    return;
  }
  var t = ut.state, n = ut.livue, r = n ? n.dirtyFields : /* @__PURE__ */ new Set(), i = Ys(ut.id), o = document.createElement("div");
  o.className = "livue-devtools__state-title", o.textContent = "<" + ut.name + ">", e.appendChild(o);
  var a = document.createElement("div");
  a.style.cssText = "display: flex; gap: 4px; margin-bottom: 8px;", ["state", "diff", "info"].forEach(function(l) {
    var s = document.createElement("button");
    s.style.cssText = "padding: 2px 8px; font-size: 10px; background: " + (Rt === l ? "#007acc" : "#3c3c3c") + "; border: none; color: #fff; border-radius: 3px; cursor: pointer;", s.textContent = l.charAt(0).toUpperCase() + l.slice(1), s.addEventListener("click", function() {
      Rt = l, fr(e);
    }), a.appendChild(s);
  }), e.appendChild(a), Rt === "state" ? nu(e, t, r, n) : Rt === "diff" ? ru(e, i) : Rt === "info" && iu(e, i);
}
function nu(e, t, n, r) {
  if (t && typeof t == "object") {
    var i = Object.keys(t);
    if (i.length === 0) {
      var o = document.createElement("div");
      o.className = "livue-devtools__state-empty", o.textContent = "No state properties", e.appendChild(o);
    } else
      i.forEach(function(l) {
        var s = n.has(l);
        e.appendChild(_i(l, t[l], s, l));
      });
  }
  if (r && r.errors && Object.keys(r.errors).length > 0) {
    var a = document.createElement("div");
    a.className = "livue-devtools__state-title", a.style.marginTop = "12px", a.textContent = "Validation Errors", e.appendChild(a), Object.keys(r.errors).forEach(function(l) {
      var s = document.createElement("div");
      s.className = "livue-devtools__prop";
      var u = document.createElement("span");
      u.className = "livue-devtools__prop-key", u.style.color = "#f48771", u.textContent = l, s.appendChild(u);
      var f = document.createElement("span");
      f.className = "livue-devtools__prop-colon", f.textContent = ": ", s.appendChild(f);
      var c = document.createElement("span");
      c.className = "livue-devtools__prop-value", c.style.color = "#f48771", c.textContent = r.errors[l].join(", "), s.appendChild(c), e.appendChild(s);
    });
  }
}
function ru(e, t) {
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
    var f = document.createElement("div");
    f.style.cssText = "font-size: 11px; color: #858585;", f.innerHTML = '<span style="color: #6a9955;">Server:</span> <span style="color: #ce9178;">' + JSON.stringify(a) + "</span>", s.appendChild(f);
    var c = document.createElement("div");
    c.style.cssText = "font-size: 11px; color: #858585;", c.innerHTML = '<span style="color: #9cdcfe;">Client:</span> <span style="color: #ce9178;">' + JSON.stringify(l) + "</span>", s.appendChild(c), e.appendChild(s);
  });
}
function iu(e, t) {
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
    var f = document.createElement("div");
    f.className = "livue-devtools__prop";
    var c = document.createElement("span");
    c.className = "livue-devtools__prop-key", c.textContent = u.label, f.appendChild(c);
    var p = document.createElement("span");
    p.className = "livue-devtools__prop-colon", p.textContent = ": ", f.appendChild(p);
    var h = document.createElement("span");
    h.className = "livue-devtools__prop-value", h.textContent = u.value, f.appendChild(h), e.appendChild(f);
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
      var f = document.createElement("div");
      f.className = "livue-devtools__prop";
      var c = document.createElement("span");
      c.className = "livue-devtools__prop-key", c.textContent = u.label, f.appendChild(c);
      var p = document.createElement("span");
      p.className = "livue-devtools__prop-colon", p.textContent = ": ", f.appendChild(p);
      var h = document.createElement("span");
      h.className = "livue-devtools__prop-value", h.style.color = u.color || "#d4d4d4", h.textContent = String(u.value), f.appendChild(h), e.appendChild(f);
    }
  });
  var a = t.composables || {}, l = Object.keys(a);
  if (l.length > 0) {
    var s = document.createElement("div");
    s.className = "livue-devtools__state-title", s.style.marginTop = "12px", s.textContent = "Composables", e.appendChild(s), l.forEach(function(u) {
      var f = a[u], c = document.createElement("div");
      c.style.cssText = "color: #c586c0; font-weight: 600; margin-top: 8px; margin-bottom: 4px;", c.textContent = u + " (livue." + u + ")", e.appendChild(c);
      var p = Object.keys(f.data || {});
      if (p.length > 0) {
        var h = document.createElement("div");
        h.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px;", h.textContent = "Data:", e.appendChild(h), p.forEach(function(g) {
          var y = document.createElement("div");
          y.style.marginLeft = "16px", y.className = "livue-devtools__prop";
          var w = document.createElement("span");
          w.className = "livue-devtools__prop-key", w.textContent = g, y.appendChild(w);
          var T = document.createElement("span");
          T.className = "livue-devtools__prop-colon", T.textContent = ": ", y.appendChild(T), y.appendChild(Oa(f.data[g], "composable." + u + "." + g)), e.appendChild(y);
        });
      }
      if (f.actions && f.actions.length > 0) {
        var v = document.createElement("div");
        v.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px; margin-top: 4px;", v.textContent = "Actions:", e.appendChild(v);
        var m = document.createElement("div");
        m.style.cssText = "margin-left: 16px; color: #dcdcaa;", m.textContent = f.actions.join(", "), e.appendChild(m);
      }
    });
  }
}
function _i(e, t, n, r) {
  var i = document.createElement("div");
  i.className = "livue-devtools__prop";
  var o = document.createElement("span");
  o.className = "livue-devtools__prop-key", n && o.classList.add("livue-devtools__prop-key--dirty"), o.textContent = e, i.appendChild(o);
  var a = document.createElement("span");
  return a.className = "livue-devtools__prop-colon", a.textContent = ": ", i.appendChild(a), i.appendChild(Oa(t, r)), i;
}
function Oa(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value", e === null)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "null";
  else if (e === void 0)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "undefined";
  else if (typeof e == "string")
    n.classList.add("livue-devtools__prop-value--string"), n.textContent = '"' + lu(e, 50) + '"', n.title = e;
  else if (typeof e == "number")
    n.classList.add("livue-devtools__prop-value--number"), n.textContent = String(e);
  else if (typeof e == "boolean")
    n.classList.add("livue-devtools__prop-value--boolean"), n.textContent = String(e);
  else {
    if (Array.isArray(e))
      return ou(e, t);
    if (typeof e == "object")
      return au(e, t);
    typeof e == "function" ? (n.classList.add("livue-devtools__prop-value--null"), n.textContent = "function()") : n.textContent = String(e);
  }
  return n;
}
function ou(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value livue-devtools__prop-value--array", e.length === 0)
    return n.textContent = "[]", n;
  var r = Ve.has(t), i = document.createElement("span");
  i.className = "livue-devtools__object-toggle", i.textContent = r ? "▼ " : "▶ ", i.addEventListener("click", function() {
    Ve.has(t) ? Ve.delete(t) : Ve.add(t), cn && fr(cn);
  }), n.appendChild(i);
  var o = document.createElement("span");
  if (o.textContent = "Array(" + e.length + ")", n.appendChild(o), r) {
    var a = document.createElement("div");
    a.className = "livue-devtools__object", e.forEach(function(l, s) {
      a.appendChild(_i(String(s), l, !1, t + "." + s));
    }), n.appendChild(a);
  }
  return n;
}
function au(e, t) {
  var n = document.createElement("span");
  n.className = "livue-devtools__prop-value livue-devtools__prop-value--object";
  var r = Object.keys(e);
  if (r.length === 0)
    return n.textContent = "{}", n;
  var i = Ve.has(t), o = document.createElement("span");
  o.className = "livue-devtools__object-toggle", o.textContent = i ? "▼ " : "▶ ", o.addEventListener("click", function() {
    Ve.has(t) ? Ve.delete(t) : Ve.add(t), cn && fr(cn);
  }), n.appendChild(o);
  var a = document.createElement("span");
  if (a.textContent = "{...} " + r.length + " key" + (r.length > 1 ? "s" : ""), n.appendChild(a), i) {
    var l = document.createElement("div");
    l.className = "livue-devtools__object", r.forEach(function(s) {
      l.appendChild(_i(s, e[s], !1, t + "." + s));
    }), n.appendChild(l);
  }
  return n;
}
function lu(e, t) {
  return e.length <= t ? e : e.substring(0, t - 3) + "...";
}
function su() {
  ut = null, Ve.clear();
}
var _t = /* @__PURE__ */ new Set();
function Ma(e) {
  e.innerHTML = "";
  var t = Sa(), n = document.createElement("div");
  n.className = "livue-devtools__timeline-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__timeline-title", r.textContent = "Request Timeline (" + t.length + ")", n.appendChild(r);
  var i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = "Clear", i.addEventListener("click", function() {
    Ta(), _t.clear(), Ma(e);
  }), n.appendChild(i), e.appendChild(n);
  var o = document.createElement("div");
  o.className = "livue-devtools__timeline-list", t.length === 0 ? o.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E1;</div>No requests yet</div>' : t.forEach(function(a) {
    o.appendChild(uu(a));
  }), e.appendChild(o);
}
function uu(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__request", _t.has(e.id) && t.classList.add("livue-devtools__request--expanded");
  var n = document.createElement("div");
  n.className = "livue-devtools__request-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__request-toggle", r.textContent = _t.has(e.id) ? "▼" : "▶", n.appendChild(r);
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
  s.className = "livue-devtools__request-time", s.textContent = yi(e.startTime), n.appendChild(s), n.addEventListener("click", function() {
    _t.has(e.id) ? (_t.delete(e.id), t.classList.remove("livue-devtools__request--expanded"), r.textContent = "▶") : (_t.add(e.id), t.classList.add("livue-devtools__request--expanded"), r.textContent = "▼");
  }), t.appendChild(n);
  var u = document.createElement("div");
  if (u.className = "livue-devtools__request-details", e.updateCount > 0 || e.lazyCount > 0) {
    var f = document.createElement("div");
    f.className = "livue-devtools__request-section";
    var c = document.createElement("div");
    c.className = "livue-devtools__request-section-title", c.textContent = "Summary", f.appendChild(c);
    var p = document.createElement("div"), h = [];
    e.updateCount > 0 && h.push(e.updateCount + " update" + (e.updateCount > 1 ? "s" : "")), e.lazyCount > 0 && h.push(e.lazyCount + " lazy load" + (e.lazyCount > 1 ? "s" : "")), p.textContent = h.join(", "), f.appendChild(p), u.appendChild(f);
  }
  if (e.updates && e.updates.length > 0) {
    var v = document.createElement("div");
    v.className = "livue-devtools__request-section";
    var m = document.createElement("div");
    m.className = "livue-devtools__request-section-title", m.textContent = "Request Payload", v.appendChild(m);
    var g = document.createElement("pre");
    g.className = "livue-devtools__request-json", g.textContent = cu(e.updates), v.appendChild(g), u.appendChild(v);
  }
  if (e.responses) {
    var y = document.createElement("div");
    y.className = "livue-devtools__request-section";
    var w = document.createElement("div");
    w.className = "livue-devtools__request-section-title", w.textContent = "Response", y.appendChild(w);
    var T = document.createElement("pre");
    T.className = "livue-devtools__request-json", T.textContent = du(e.responses), y.appendChild(T), u.appendChild(y);
  }
  if (e.error) {
    var O = document.createElement("div");
    O.className = "livue-devtools__request-section";
    var E = document.createElement("div");
    E.className = "livue-devtools__request-section-title", E.style.color = "#f48771", E.textContent = "Error", O.appendChild(E);
    var D = document.createElement("pre");
    D.className = "livue-devtools__request-json", D.style.color = "#f48771", D.textContent = e.error.message || String(e.error), O.appendChild(D), u.appendChild(O);
  }
  return t.appendChild(u), t;
}
function cu(e) {
  var t = e.map(function(n) {
    var r = {};
    return n.method && (r.method = n.method), n.params && n.params.length > 0 && (r.params = n.params), n.diffs && Object.keys(n.diffs).length > 0 && (r.diffs = n.diffs), r;
  });
  return JSON.stringify(t, null, 2);
}
function du(e) {
  var t = e.map(function(n) {
    if (!n) return null;
    var r = {};
    return n.snapshot && (r.snapshotSize = n.snapshot.length + " bytes"), n.html && (r.htmlSize = n.html.length + " bytes"), n.events && n.events.length > 0 && (r.events = n.events.map(function(i) {
      return i.name;
    })), n.jsonResult !== void 0 && (r.jsonResult = n.jsonResult), n.redirect && (r.redirect = n.redirect), n.download && (r.download = n.download.name), r;
  });
  return JSON.stringify(t, null, 2);
}
var Gt = "";
function Ia(e) {
  e.innerHTML = "";
  var t = document.createElement("div");
  t.className = "livue-devtools__events-header";
  var n = document.createElement("input");
  n.className = "livue-devtools__events-filter", n.type = "text", n.placeholder = "Filter events...", n.value = Gt, n.addEventListener("input", function(o) {
    Gt = o.target.value.toLowerCase(), Ki(e.querySelector(".livue-devtools__events-list"));
  }), t.appendChild(n);
  var r = document.createElement("button");
  r.className = "livue-devtools__btn", r.textContent = "Clear", r.addEventListener("click", function() {
    Aa(), Gt = "", n.value = "", Ia(e);
  }), t.appendChild(r), e.appendChild(t);
  var i = document.createElement("div");
  i.className = "livue-devtools__events-list", Ki(i), e.appendChild(i);
}
function Ki(e) {
  if (e) {
    e.innerHTML = "";
    var t = xa(), n = t;
    if (Gt && (n = t.filter(function(r) {
      var i = (r.name + " " + r.source + " " + JSON.stringify(r.data)).toLowerCase();
      return i.indexOf(Gt) !== -1;
    })), n.length === 0) {
      t.length === 0 ? e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E8;</div>No events yet</div>' : e.innerHTML = '<div class="livue-devtools__empty">No events match filter</div>';
      return;
    }
    n.forEach(function(r) {
      e.appendChild(fu(r));
    });
  }
}
function fu(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__event";
  var n = document.createElement("span");
  n.className = "livue-devtools__event-time", n.textContent = yi(e.time), t.appendChild(n);
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
    a.className = "livue-devtools__event-data", a.textContent = pu(e.data), a.title = JSON.stringify(e.data, null, 2), t.appendChild(a);
  }
  return t;
}
function pu(e) {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  var t = JSON.stringify(e);
  return t.length > 80 ? t.substring(0, 77) + "..." : t;
}
var Ra = "livue-devtools-state", $ = null, He = "components", dt = "state", wi = null, Me = !1, Pa = !1, tt = "right";
function qa() {
  try {
    var e = localStorage.getItem(Ra);
    if (e) {
      var t = JSON.parse(e);
      He = t.activeTab || "components", dt = t.activeSubTab || "state", Me = t.minimized || !1, Pa = t.isOpen || !1, tt = t.position || "right";
    }
  } catch {
  }
}
function It() {
  try {
    localStorage.setItem(Ra, JSON.stringify({
      isOpen: $ !== null,
      activeTab: He,
      activeSubTab: dt,
      minimized: Me,
      position: tt
    }));
  } catch {
  }
}
function vu() {
  return qa(), Pa;
}
var Pn = null, Zt = null, qn = null;
function mu(e) {
  Qs(e);
}
function hu() {
  return $ !== null;
}
function Ei() {
  $ || (qa(), ks(), wa(), gu(), Tu(), Au(), It());
}
function Si() {
  $ && (Zt && (document.removeEventListener("keydown", Zt), Zt = null), Pn && (clearInterval(Pn), Pn = null), qn && (qn(), qn = null), $.remove(), $ = null, wi = null, Ls(), Ea(), su(), It());
}
function ja() {
  $ ? Si() : Ei();
}
function Va() {
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
function gu() {
  $ = document.createElement("div"), $.className = "livue-devtools livue-devtools--" + tt, Me && $.classList.add("livue-devtools--minimized");
  var e = document.createElement("div");
  e.className = "livue-devtools__header";
  var t = document.createElement("div");
  t.className = "livue-devtools__title", t.innerHTML = '<span class="livue-devtools__title-icon">&#x2699;</span> LiVue DevTools', e.appendChild(t);
  var n = document.createElement("div");
  n.className = "livue-devtools__actions";
  var r = Va(), i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = Me ? r.minimized : r.expanded, i.title = "Minimize", i.addEventListener("click", function() {
    Me = !Me, $.classList.toggle("livue-devtools--minimized", Me), i.textContent = Me ? r.minimized : r.expanded, It();
  }), n.appendChild(i);
  var o = document.createElement("button");
  o.className = "livue-devtools__btn", o.textContent = "×", o.title = "Close (Ctrl+Shift+L)", o.addEventListener("click", Si), n.appendChild(o), e.appendChild(n), $.appendChild(e);
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
    m.className = "livue-devtools__tab", v.id === He && m.classList.add("livue-devtools__tab--active"), m.textContent = v.label, m.addEventListener("click", function() {
      bu(v.id);
    }), a.appendChild(m);
  }), $.appendChild(a);
  var s = document.createElement("div");
  s.className = "livue-devtools__content";
  var u = document.createElement("div");
  u.className = "livue-devtools__panel livue-devtools__panel--components", u.dataset.tab = "components", He === "components" && u.classList.add("livue-devtools__panel--active");
  var f = document.createElement("div");
  f.className = "livue-devtools__tree", u.appendChild(f);
  var c = document.createElement("div");
  c.className = "livue-devtools__right-pane";
  var p = document.createElement("div");
  p.className = "livue-devtools__sub-tabs", [{ id: "state", label: "State" }, { id: "benchmark", label: "Benchmark" }].forEach(function(v) {
    var m = document.createElement("button");
    m.className = "livue-devtools__sub-tab", v.id === dt && m.classList.add("livue-devtools__sub-tab--active"), m.textContent = v.label, m.addEventListener("click", function() {
      yu(v.id);
    }), p.appendChild(m);
  }), c.appendChild(p);
  var h = document.createElement("div");
  h.className = "livue-devtools__sub-content", ["state", "benchmark"].forEach(function(v) {
    var m = document.createElement("div");
    m.className = "livue-devtools__panel", m.dataset.subtab = v, v === dt && m.classList.add("livue-devtools__panel--active"), h.appendChild(m);
  }), c.appendChild(h), u.appendChild(c), s.appendChild(u), ["timeline", "events", "stores", "echo", "perf", "settings"].forEach(function(v) {
    var m = document.createElement("div");
    m.className = "livue-devtools__panel", m.dataset.tab = v, v === He && m.classList.add("livue-devtools__panel--active"), s.appendChild(m);
  }), $.appendChild(s), document.body.appendChild($), eu(function(v) {
    wi = v, tu(v), pr();
  }), Yn(), qn = Ks(function() {
    Yn();
  });
}
function bu(e) {
  if (e !== He) {
    He = e;
    var t = $.querySelectorAll(".livue-devtools__tab"), n = ["components", "timeline", "events", "stores", "echo", "perf", "settings"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__tab--active", n[o] === e);
    });
    var r = $.querySelectorAll(".livue-devtools__panel[data-tab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.tab === e);
    }), Yn(), It();
  }
}
function yu(e) {
  if (e !== dt) {
    dt = e;
    var t = $.querySelectorAll(".livue-devtools__sub-tab"), n = ["state", "benchmark"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__sub-tab--active", n[o] === e);
    });
    var r = $.querySelectorAll(".livue-devtools__panel[data-subtab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.subtab === e);
    }), pr(), It();
  }
}
function pr() {
  if ($)
    if (dt === "state") {
      var e = $.querySelector('.livue-devtools__panel[data-subtab="state"]');
      e && fr(e);
    } else {
      var t = $.querySelector('.livue-devtools__panel[data-subtab="benchmark"]');
      t && _u(t, wi);
    }
}
function Yn() {
  if ($)
    switch (He) {
      case "components":
        var e = $.querySelector(".livue-devtools__tree");
        e && La(e), pr();
        break;
      case "timeline":
        var t = $.querySelector('.livue-devtools__panel[data-tab="timeline"]');
        t && Ma(t);
        break;
      case "events":
        var n = $.querySelector('.livue-devtools__panel[data-tab="events"]');
        n && Ia(n);
        break;
      case "stores":
        var r = $.querySelector('.livue-devtools__panel[data-tab="stores"]');
        r && wu(r);
        break;
      case "echo":
        var i = $.querySelector('.livue-devtools__panel[data-tab="echo"]');
        i && Eu(i);
        break;
      case "perf":
        var o = $.querySelector('.livue-devtools__panel[data-tab="perf"]');
        o && Su(o);
        break;
      case "settings":
        var a = $.querySelector('.livue-devtools__panel[data-tab="settings"]');
        a && xu(a);
        break;
    }
}
function _u(e, t) {
  e.innerHTML = "";
  var n = Us();
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
  var o = n.filter(function(z) {
    return z.componentId === t.id;
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
  var f = document.createElement("div");
  f.style.cssText = "color: #858585; font-size: 11px; margin-bottom: 6px;", f.textContent = yi(l.time), s.appendChild(f);
  var c = ["mount", "method_call", "render", "total"];
  for (var p in l.timings) {
    var h = l.timings[p], v = h / 1e3, m = c.indexOf(p) !== -1, g = m ? 50 : 5, y = m ? 200 : 20, w = v < g ? "good" : v < y ? "warn" : "bad";
    s.appendChild(ge(p, Yi(h), w));
  }
  e.appendChild(s);
  var T = Js(t.id);
  if (T && T.count > 1) {
    var O = document.createElement("div");
    O.className = "livue-devtools__perf-section";
    var E = document.createElement("div");
    E.className = "livue-devtools__perf-title", E.textContent = "Session Average (" + T.count + " requests)", O.appendChild(E);
    for (var D in T.averages) {
      var V = Math.round(T.averages[D]), I = V / 1e3, k = c.indexOf(D) !== -1, M = I < (k ? 50 : 5) ? "good" : I < (k ? 200 : 20) ? "warn" : "bad";
      O.appendChild(ge(D, Yi(V), M));
    }
    e.appendChild(O);
  }
}
function wu(e) {
  e.innerHTML = "";
  var t = Gs(), n = t.stores, r = document.createElement("div");
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
      var f = document.createElement("div");
      f.style.cssText = "font-size: 11px; color: #858585;", f.textContent = "Filters: " + JSON.stringify(l.filters), s.appendChild(f);
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
    var f = document.createElement("span");
    f.className = "livue-devtools__perf-value", f.textContent = l.count + (l.items.length > 0 ? " (" + l.items.join(", ") + ")" : ""), s.appendChild(f), e.appendChild(s);
  });
}
function Eu(e) {
  e.innerHTML = "";
  var t = Zs(), n = document.createElement("div");
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
    var f = document.createElement("div");
    f.style.cssText = "color: #858585; font-size: 11px;", f.textContent = "No active channels", s.appendChild(f);
  } else
    t.channels.forEach(function(v) {
      var m = document.createElement("div");
      m.style.cssText = "padding: 4px 0; display: flex; align-items: center; gap: 8px;";
      var g = document.createElement("span");
      g.style.cssText = "padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600;", v.type === "private" ? (g.style.background = "#4d3a12", g.style.color = "#dcdcaa") : v.type === "presence" ? (g.style.background = "#264f78", g.style.color = "#9cdcfe") : (g.style.background = "#2d4a2d", g.style.color = "#6a9955"), g.textContent = v.type, m.appendChild(g);
      var y = document.createElement("span");
      y.style.color = "#d4d4d4", y.textContent = v.name, m.appendChild(y), s.appendChild(m);
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
function Su(e) {
  e.innerHTML = "";
  var t = Ca(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-title", r.textContent = "AJAX Requests", n.appendChild(r), n.appendChild(ge("Total Requests", t.totalRequests)), n.appendChild(ge("Successful", t.successfulRequests, "good")), n.appendChild(ge("Failed", t.failedRequests, t.failedRequests > 0 ? "bad" : null)), e.appendChild(n);
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-section";
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-title", o.textContent = "Request Timing", i.appendChild(o);
  var a = t.avgRequestTime < 100 ? "good" : t.avgRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ge("Average", _n(t.avgRequestTime), a));
  var l = t.minRequestTime < 100 ? "good" : t.minRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ge("Fastest", t.minRequestTime === 1 / 0 ? "-" : _n(t.minRequestTime), l));
  var s = t.maxRequestTime < 100 ? "good" : t.maxRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ge("Slowest", t.maxRequestTime === 0 ? "-" : _n(t.maxRequestTime), s)), e.appendChild(i);
  var u = document.createElement("div");
  u.className = "livue-devtools__perf-section";
  var f = document.createElement("div");
  f.className = "livue-devtools__perf-title", f.textContent = "Template Swaps", u.appendChild(f), u.appendChild(ge("Total Swaps", t.totalTemplateSwaps));
  var c = t.avgTemplateSwapTime < 5 ? "good" : t.avgTemplateSwapTime < 20 ? "warn" : "bad";
  u.appendChild(ge("Average Time", _n(t.avgTemplateSwapTime), c)), e.appendChild(u);
  var p = document.createElement("div");
  p.className = "livue-devtools__perf-section";
  var h = document.createElement("div");
  h.className = "livue-devtools__perf-title", h.textContent = "Components", p.appendChild(h);
  var v = Ws(), m = v.filter(function(y) {
    return !y.isChild;
  }), g = v.filter(function(y) {
    return y.isChild;
  });
  p.appendChild(ge("Root Components", m.length)), p.appendChild(ge("Child Components", g.length)), p.appendChild(ge("Total", v.length)), e.appendChild(p);
}
function xu(e) {
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
  i.forEach(function(f) {
    var c = document.createElement("button");
    c.className = "livue-devtools__settings-btn", tt === f.id && c.classList.add("livue-devtools__settings-btn--active");
    var p = document.createElement("span");
    p.className = "livue-devtools__settings-btn-icon", p.textContent = f.icon, c.appendChild(p);
    var h = document.createElement("span");
    h.textContent = f.label, c.appendChild(h), c.addEventListener("click", function() {
      Cu(f.id);
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
function Cu(e) {
  if (tt !== e && (tt = e, It(), $)) {
    $.className = "livue-devtools livue-devtools--" + tt, Me && $.classList.add("livue-devtools--minimized");
    var t = Va(), n = $.querySelector(".livue-devtools__btn");
    n && (n.textContent = Me ? t.minimized : t.expanded), Yn();
  }
}
function ge(e, t, n) {
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-stat";
  var i = document.createElement("span");
  i.className = "livue-devtools__perf-label", i.textContent = e, r.appendChild(i);
  var o = document.createElement("span");
  return o.className = "livue-devtools__perf-value", n && o.classList.add("livue-devtools__perf-value--" + n), o.textContent = String(t), r.appendChild(o), r;
}
function _n(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1 ? "<1ms" : Math.round(e) + "ms";
}
function Yi(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1e3 ? e + "µs" : (e / 1e3).toFixed(2) + "ms";
}
function Tu() {
  Zt = function(e) {
    e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), ja());
  }, document.addEventListener("keydown", Zt);
}
function Au() {
  Pn = setInterval(function() {
    if ($ && He === "components") {
      var e = $.querySelector(".livue-devtools__tree");
      e && La(e), pr();
    }
  }, 500);
}
var dn = !1, Gi = !1;
function za(e) {
  dn || (mu(e), dn = !0, vu() && Ei(), Gi || (Gi = !0, document.addEventListener("keydown", function(t) {
    t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Ha());
  })));
}
function Nu() {
  if (!dn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  Ei();
}
function ku() {
  Si();
}
function Ha() {
  if (!dn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  ja();
}
function Lu() {
  return hu();
}
function Du() {
  return Na();
}
function Ou() {
  return Sa();
}
function Mu() {
  return xa();
}
function Iu() {
  return Ca();
}
function Ru() {
  Ta();
}
function Pu() {
  Aa();
}
function qu() {
  Xs();
}
function $a(e) {
  Bs(e);
}
function ju() {
  return dn;
}
function Vu() {
  wa();
}
function zu() {
  Ea();
}
function Fa() {
  return Fs();
}
const Hu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: qu,
  clearEvents: Pu,
  clearTimeline: Ru,
  close: ku,
  getComponents: Du,
  getEvents: Mu,
  getPerf: Iu,
  getTimeline: Ou,
  init: za,
  isCollecting: Fa,
  isInitialized: ju,
  isOpen: Lu,
  logEvent: $a,
  open: Nu,
  startCollecting: Vu,
  stopCollecting: zu,
  toggle: Ha
}, Symbol.toStringTag, { value: "Module" }));
var Ge = /* @__PURE__ */ new Map();
function fn(e, t, n, r) {
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
function jn(e, t, n, r, i, o) {
  Fa() && $a({
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
function Zi(e) {
  Ge.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Ge.delete(n);
  });
}
function $u(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    jn(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Fu(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function xi() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function Bu(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = xi();
    s.open("POST", u, !0);
    var f = Mt();
    f && s.setRequestHeader("X-CSRF-TOKEN", f), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(c) {
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
function xr(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = xi() + "-remove", n = Mt();
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
function Wu(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), f = xi();
    u.open("POST", f, !0);
    var c = Mt();
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
let Qt = /* @__PURE__ */ new Map(), en = /* @__PURE__ */ new Map();
function Dt(e, t) {
  let n = e + ":debounce:" + t;
  if (!Qt.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, f) {
        o = u, a = f, r = setTimeout(function() {
          let c = i, p = o, h = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(p).catch(h);
        }, t);
      });
    };
    Qt.set(n, l);
  }
  return Qt.get(n);
}
function pn(e, t) {
  let n = e + ":throttle:" + t;
  if (!en.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < t ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    en.set(n, i);
  }
  return en.get(n);
}
function Qi(e) {
  let t = e + ":";
  for (let n of Qt.keys())
    n.startsWith(t) && Qt.delete(n);
  for (let n of en.keys())
    n.startsWith(t) && en.delete(n);
}
const Gn = "livue-tab-sync";
let Ci = Date.now() + "-" + Math.random().toString(36).substr(2, 9), Zn = null, Ti = /* @__PURE__ */ new Map(), eo = !1;
function Ba() {
  eo || (eo = !0, typeof BroadcastChannel < "u" ? (Zn = new BroadcastChannel(Gn), Zn.onmessage = Uu) : window.addEventListener("storage", Ju));
}
function Uu(e) {
  let t = e.data;
  t.tabId !== Ci && Wa(t);
}
function Ju(e) {
  if (e.key === Gn && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === Ci) return;
      Wa(t);
    } catch {
    }
}
function Wa(e) {
  let t = Ti.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function Xu(e, t) {
  Ba(), Ti.set(e, t);
}
function to(e) {
  Ti.delete(e);
}
function Ku(e, t, n, r) {
  Ba();
  let i = {
    tabId: Ci,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (Zn)
    Zn.postMessage(i);
  else
    try {
      localStorage.setItem(Gn, JSON.stringify(i)), localStorage.removeItem(Gn);
    } catch {
    }
}
function Yu(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const Ai = /* @__PURE__ */ new Map();
function no(e, t, n) {
  if (e.trim())
    try {
      const r = JSON.parse(e);
      if (r.stream)
        Qu(r.stream), t(r.stream);
      else {
        if (r.error)
          throw new Error(r.error);
        r.snapshot && (n.finalResponse = r);
      }
    } catch (r) {
      console.error("[LiVue Stream] Parse error:", r, e);
    }
}
async function Gu(e, t, n) {
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
      no(s, n, i);
  }
  return r.trim() && no(r, n, i), i.finalResponse;
}
async function Zu(e, t = {}) {
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
        "X-CSRF-TOKEN": Mt(),
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
    const a = o.body.getReader(), l = new TextDecoder(), s = await Gu(a, l, n);
    return r(s), s;
  } catch (o) {
    throw i(o), o;
  }
}
function Qu(e) {
  const { to: t, content: n, replace: r } = e, i = Ai.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function ro(e, t, n = !1) {
  Ai.set(e, { el: t, replace: n });
}
function io(e) {
  Ai.delete(e);
}
function ec(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function Ni(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    ec(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = Ni(r) : t[n] = r;
  }
  return t;
}
function tc(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Ni(l), f = {};
    for (let c in s)
      f[c] = /* @__PURE__ */ (function(p, h) {
        return function() {
          let v = Array.prototype.slice.call(arguments);
          return t(p + "." + h, v);
        };
      })(a, c);
    i[a] = Ie(Object.assign({}, u, f));
  }
  return i;
}
function nc(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = Ni(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function rc(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function ic(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function oi(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = xs(), u = n.name, f = n.vueMethods || {}, c = n.jsonMethods || [], p = n.confirms || {}, h = Array.isArray(n.methods) ? n.methods.slice() : null, v = n.isolate || !1, m = n.urlParams || null, g = n.uploads || null, y = n.tabSync || null, w = !1, T = i, O = o, E = [], D = !1, V = !1, I = a.initialHtml || null, k = Ie({}), M = [];
  function z() {
    for (let d = 0; d < M.length; d++)
      try {
        M[d]();
      } catch {
      }
    M = [];
  }
  function ne(d) {
    if (z(), !!Array.isArray(d))
      for (let b = 0; b < d.length; b++) {
        let S = d[b];
        if (!S || typeof S != "object" || !S.bridge || typeof S.bridge != "object") continue;
        let A = ct(e, S.name, { scope: S.scope || "auto" }, l);
        if (!A) continue;
        let _ = S.bridge;
        for (let R in _) {
          let U = _[R];
          if (!U || typeof U != "object") continue;
          let X = U.prop, ae = U.mode || "two-way";
          if (!(!X || !(X in t))) {
            if (ae === "two-way" || ae === "store-to-state") {
              let Z = ke(function() {
                return A[R];
              }, function(rt) {
                t[X] !== rt && (t[X] = rt);
              });
              M.push(Z);
            }
            if (ae === "two-way" || ae === "state-to-store") {
              let Z = ke(function() {
                return t[X];
              }, function(rt) {
                A[R] !== rt && (A[R] = rt);
              });
              M.push(Z);
            }
          }
        }
      }
  }
  function J(d) {
    let b = Vl(e, d, l);
    for (let S in b)
      k[S] = b[S];
    ne(d);
  }
  J(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    z(), zl(e);
  });
  function Y(d) {
    let b = document.querySelector('meta[name="livue-prefix"]'), A = "/" + (b ? b.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(d.token), _ = document.createElement("a");
    _.href = A, _.download = d.name, _.style.display = "none", document.body.appendChild(_), _.click(), document.body.removeChild(_);
  }
  function re() {
    V || D || (V = !0, queueMicrotask(G));
  }
  async function G() {
    if (V = !1, D || E.length === 0) return;
    D = !0;
    let d = E;
    E = [], x.loading = !0, x.processing = d[0].method;
    for (let b = 0; b < d.length; b++)
      d[b].method && (ce[d[b].method] = !0);
    try {
      let b = W(), S = d.map(function(R) {
        return { method: R.method, params: R.params };
      }), A = await Ss(b.snapshot, S, b.diffs, v), _ = te(A, b.diffs);
      for (let R = 0; R < d.length; R++) d[R].resolve(_);
    } catch (b) {
      for (let S = 0; S < d.length; S++)
        b.status === 422 && b.data && b.data.errors ? (Te(x.errors, b.data.errors), d[S].reject(b)) : (ht(b, u), d[S].reject(b));
    } finally {
      x.loading = !1, x.processing = null;
      for (let b = 0; b < d.length; b++)
        d[b].method && delete ce[d[b].method];
      D = !1, E.length > 0 && re();
    }
  }
  function W() {
    let d = yn(T, t);
    return {
      snapshot: O,
      diffs: d
    };
  }
  function te(d, b) {
    if (d.redirect) {
      gi(d.redirect);
      return;
    }
    if (d.errorBoundary) {
      let _ = d.errorBoundary;
      x.errorState.hasError = _.hasError, x.errorState.errorMessage = _.errorMessage, x.errorState.errorDetails = _.errorDetails, x.errorState.recover = _.recover, (!_.errorHandled || !_.recover) && we("error.occurred", {
        error: new Error(_.errorMessage || "Component error"),
        componentName: u,
        componentId: e,
        context: { method: _.errorMethod, serverHandled: _.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (d.download && Y(d.download), d.snapshot) {
      let _;
      try {
        _ = JSON.parse(d.snapshot);
      } catch (R) {
        console.error("[LiVue] Failed to parse server snapshot:", R), _ = null;
      }
      if (_ && _.state) {
        let R = kt(_.state);
        Cl(t, R), T = JSON.parse(JSON.stringify(R));
      }
      _ && (O = d.snapshot), _ && _.memo && (_.memo.errors ? Te(x.errors, _.memo.errors) : ei(x.errors), _.memo.vueMethods && (f = _.memo.vueMethods), _.memo.jsonMethods && (c = _.memo.jsonMethods), _.memo.urlParams && (m = _.memo.urlParams), _.memo.uploads && (g = _.memo.uploads), _.memo.confirms && (p = _.memo.confirms), Object.prototype.hasOwnProperty.call(_.memo, "methods") && (h = Array.isArray(_.memo.methods) ? _.memo.methods.slice() : null, x._callableMethods = h), (_.memo.composables || _.memo.composableActions) && nc(de, _.memo), _.memo.stores && J(_.memo.stores));
    }
    if (m && Fu(m, t), (d.html || d.fragments) && r && r._updateTemplate) {
      let _ = {};
      if (d.snapshot) {
        let R;
        try {
          R = JSON.parse(d.snapshot);
        } catch {
          R = null;
        }
        R && R.memo && (R.memo.transitionType && (_.transitionType = R.memo.transitionType), R.memo.skipTransition && (_.skipTransition = !0));
      }
      if (d.fragments) {
        let R = I || (a.el ? a.el.innerHTML : null);
        if (R) {
          let U = ic(R, d.fragments);
          I = U, r._updateTemplate(U, _);
        }
      } else
        I = d.html, r._updateTemplate(d.html, _);
    }
    if (d.events && d.events.length > 0) {
      for (var S = 0; S < d.events.length; S++)
        d.events[S].sourceId = e;
      $u(d.events);
    }
    if (d.js && d.js.length > 0)
      for (var A = 0; A < d.js.length; A++)
        try {
          new Function("state", "livue", d.js[A])(t, x);
        } catch (_) {
          console.error("[LiVue] Error executing ->vue() JS:", _);
        }
    if (d.benchmark && we("benchmark.received", {
      componentId: e,
      componentName: u,
      timings: d.benchmark
    }), y && y.enabled && d.snapshot && !w && JSON.parse(d.snapshot).state) {
      let R = Ko(t), U = [];
      for (let X in R)
        (!b || !(X in b)) && U.push(X);
      if (U.length > 0) {
        let X = Yu(R, U, y);
        Object.keys(X).length > 0 && Ku(u, X, U, y);
      }
    }
    if (w = !1, d.jsonResult !== void 0)
      return d.jsonResult;
  }
  let ce = Ie({}), De = {}, de = {}, nt = function(d, b) {
    return x.call(d, b);
  };
  rc(n) && (de = tc(n, nt));
  let x = Ie({
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
      let b = yn(T, t);
      return d === void 0 ? Object.keys(b).length > 0 : d in b;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let d = yn(T, t);
      return new Set(Object.keys(d));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(d) {
      return d === void 0 ? JSON.parse(JSON.stringify(T)) : T[d] !== void 0 ? JSON.parse(JSON.stringify(T[d])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(d) {
      d in T && (t[d] = JSON.parse(JSON.stringify(T[d])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let d in T)
        d in t && (t[d] = JSON.parse(JSON.stringify(T[d])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(d) {
      return d ? ce[d] || !1 : x.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(d) {
      let b = d ? ce[d] || !1 : x.loading;
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
    call: async function(d, b, S) {
      let A, _ = null;
      if (arguments.length === 1 ? A = [] : arguments.length === 2 ? Array.isArray(b) ? A = b : A = [b] : arguments.length >= 3 && (Array.isArray(b) && S && typeof S == "object" && (S.debounce || S.throttle) ? (A = b, _ = S) : A = Array.prototype.slice.call(arguments, 1)), De[d])
        return De[d](x, A);
      if (f[d]) {
        try {
          new Function("state", "livue", f[d])(t, x);
        } catch (X) {
          console.error('[LiVue] Error executing #[Vue] method "' + d + '":', X);
        }
        return;
      }
      let R = c.includes(d), U;
      return R ? U = async function() {
        if (p[d] && !await x._showConfirm(p[d]))
          return;
        x.loading = !0, x.processing = d, ce[d] = !0;
        let X;
        try {
          let ae = W(), Z = await Sr(ae.snapshot, d, A, ae.diffs, !0);
          X = te(Z, ae.diffs);
        } catch (ae) {
          throw { status: ae.status, errors: ae.data && ae.data.errors, message: ae.message };
        } finally {
          x.loading = !1, x.processing = null, delete ce[d];
        }
        return X;
      } : U = async function() {
        if (!(p[d] && !await x._showConfirm(p[d])))
          return new Promise(function(X, ae) {
            E.push({ method: d, params: A, resolve: X, reject: ae }), re();
          });
      }, _ && _.debounce ? Dt(e + ":" + d, _.debounce)(U) : _ && _.throttle ? pn(e + ":" + d, _.throttle)(U) : U();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(d, b) {
      let S = Array.prototype.slice.call(arguments, 2), A = { message: b || "Are you sure?" };
      if (await x._showConfirm(A))
        return x.call.apply(x, [d].concat(S));
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
    store: function(d, b, S) {
      if (b === void 0) {
        let A = ct(e, d, S || { scope: "auto" }, l);
        if (A)
          return A;
        throw new Error('[LiVue] store("' + d + '"): store not found. Provide a definition or register it in PHP.');
      }
      return vi(e, d, b, S, l);
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
      x.loading = !0, x.processing = "$sync";
      try {
        let d = W(), b = await Sr(d.snapshot, null, [], d.diffs, v);
        te(b, d.diffs);
      } catch (d) {
        d.status === 422 && d.data && d.data.errors ? Te(x.errors, d.data.errors) : ht(d, u);
      } finally {
        x.loading = !1, x.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      ei(x.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(d, b) {
      jn(d, b, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(d, b, S) {
      jn(b, S, "to", u, e, d);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(d, b) {
      jn(d, b, "self", u, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(d) {
      mn(d, !0);
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
      var S = _r(t, d);
      S && S.__livue_upload && S.ref && xr([S.ref]), x.uploading = !0, x.uploadProgress = 0;
      try {
        var A = await Bu(b, u, d, g[d].token, function(_) {
          x.uploadProgress = _;
        });
        $t(t, d, {
          __livue_upload: !0,
          ref: A.ref,
          originalName: A.originalName,
          mimeType: A.mimeType,
          size: A.size,
          previewUrl: A.previewUrl
        });
      } catch (_) {
        _.status === 422 && _.data && _.data.errors ? Te(x.errors, _.data.errors) : ht(_, u);
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
    uploadMultiple: async function(d, b) {
      if (!g || !g[d]) {
        console.error('[LiVue] Property "' + d + '" is not configured for uploads.');
        return;
      }
      x.uploading = !0, x.uploadProgress = 0;
      try {
        var S = await Wu(b, u, d, g[d].token, function(Z) {
          x.uploadProgress = Z.overall;
        }), A = S.results || [], _ = S.errors || [], R = _r(t, d), U = Array.isArray(R) ? R : [];
        if (A.length > 0) {
          var X = A.map(function(Z) {
            return {
              __livue_upload: !0,
              ref: Z.ref,
              originalName: Z.originalName,
              mimeType: Z.mimeType,
              size: Z.size,
              previewUrl: Z.previewUrl
            };
          });
          $t(t, d, U.concat(X));
        }
        if (_.length > 0) {
          var ae = {};
          _.forEach(function(Z) {
            var rt = d + "." + Z.index;
            ae[rt] = {
              file: Z.file,
              message: Z.error
            };
          }), Te(x.errors, ae);
        }
      } catch (Z) {
        Z.status === 422 && Z.data && Z.data.errors ? Te(x.errors, Z.data.errors) : ht(Z, u);
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
    removeUpload: function(d, b) {
      var S = _r(t, d);
      if (b !== void 0 && Array.isArray(S)) {
        var A = S[b];
        A && A.__livue_upload && A.ref && xr([A.ref]), S.splice(b, 1), $t(t, d, S.slice());
      } else
        S && S.__livue_upload && S.ref && xr([S.ref]), $t(t, d, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(d, b) {
      b = b || [], x.loading = !0, x.streaming = !0, x.processing = d, x.streamingMethod = d, ce[d] = !0;
      let S;
      try {
        let A = W();
        A.method = d, A.params = b, A.componentId = e;
        let _ = await Zu(A, {
          onChunk: function(R) {
          },
          onComplete: function(R) {
          },
          onError: function(R) {
            console.error("[LiVue Stream] Error:", R);
          }
        });
        _ && (S = te(_, A.diffs));
      } catch (A) {
        A.status === 422 && A.data && A.data.errors ? Te(x.errors, A.data.errors) : ht(A, u);
      } finally {
        x.loading = !1, x.streaming = !1, x.processing = null, x.streamingMethod = null, delete ce[d];
      }
      return S;
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
      }) : fn(d, u, e, b);
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
        function(S, A) {
          b(S, A);
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
      }) : (Ts(e, d), function() {
        ti(e);
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
      x.errorState.hasError = !1, x.errorState.errorMessage = null, x.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(d, b) {
      T = JSON.parse(JSON.stringify(d)), O = b;
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
      let d = yn(T, t), b = {};
      for (let S in de) {
        let A = de[S], _ = {}, R = [];
        for (let U in A)
          if (typeof A[U] == "function")
            R.push(U);
          else
            try {
              _[U] = JSON.parse(JSON.stringify(A[U]));
            } catch {
              _[U] = "[Unserializable]";
            }
        b[S] = { data: _, actions: R };
      }
      return {
        serverState: JSON.parse(JSON.stringify(T)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(d),
        diffs: d,
        memo: {
          name: u,
          isolate: v,
          urlParams: m,
          tabSync: y,
          hasUploads: !!g,
          uploadProps: g ? Object.keys(g) : [],
          vueMethods: Object.keys(f),
          confirmMethods: Object.keys(p),
          composableNames: Object.keys(de)
        },
        composables: b,
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
  for (let d in de)
    x[d] = de[d];
  async function Ue() {
    x.loading = !0, x.processing = "$refresh", ce.$refresh = !0;
    try {
      let d = W(), b = await Sr(d.snapshot, null, [], d.diffs, v);
      return te(b, d.diffs);
    } catch (d) {
      d.status === 422 && d.data && d.data.errors ? Te(x.errors, d.data.errors) : ht(d, u);
    } finally {
      x.loading = !1, x.processing = null, delete ce.$refresh;
    }
  }
  De.$refresh = function() {
    return Ue();
  }, y && y.enabled && Xu(u, function(d, b, S) {
    let A = !1;
    if (S.reactive === !0)
      A = !0;
    else if (Array.isArray(S.reactive) && S.reactive.length > 0) {
      for (let _ in d)
        if (S.reactive.includes(_)) {
          A = !0;
          break;
        }
    }
    if (A) {
      for (let _ in d)
        S.only && !S.only.includes(_) || S.except && S.except.includes(_) || _ in t && (t[_] = d[_]);
      w = !0, x.sync();
      return;
    }
    for (let _ in d)
      S.only && !S.only.includes(_) || S.except && S.except.includes(_) || _ in t && (t[_] = d[_]);
    for (let _ in d)
      S.only && !S.only.includes(_) || S.except && S.except.includes(_) || (T[_] = JSON.parse(JSON.stringify(d[_])));
  });
  var je = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(x, {
    get: function(d, b, S) {
      if (b in d || typeof b == "symbol")
        return Reflect.get(d, b, S);
      if (typeof b == "string" && b.startsWith("$")) {
        if (De[b])
          return function() {
            var R = Array.prototype.slice.call(arguments);
            return De[b](x, R);
          };
        var A = b.slice(1);
        if (A) {
          var _ = Reflect.get(d, A, S);
          if (typeof _ == "function")
            return function() {
              var R = Array.prototype.slice.call(arguments);
              return _.apply(d, R);
            };
        }
      }
      if (typeof b == "string" && !b.startsWith("$") && !je[b])
        return function() {
          var R = Array.prototype.slice.call(arguments);
          return x.call(b, ...R);
        };
    },
    set: function(d, b, S, A) {
      return Reflect.set(d, b, S, A);
    },
    has: function(d, b) {
      if (typeof b == "string" && b.startsWith("$")) {
        if (De[b])
          return !0;
        var S = b.slice(1);
        if (S) {
          var A = Reflect.get(d, S, d);
          if (typeof A == "function")
            return !0;
        }
      }
      return Reflect.has(d, b);
    }
  }), composables: de };
}
function Qn(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
var Et = [], Ua = /* @__PURE__ */ new Set(), Ja = {}, Xa = [];
function wn(e, t) {
  if (!e || typeof e.install != "function") {
    console.warn("[LiVue] Plugin must have an install() method");
    return;
  }
  if (e.name) {
    for (var n = 0; n < Et.length; n++)
      if (Et[n].plugin.name === e.name) {
        Et[n] = { plugin: e, options: t };
        return;
      }
  }
  Et.push({ plugin: e, options: t });
}
function oc(e) {
  Ua.add(e);
}
function ac(e) {
  for (var t = 0; t < Et.length; t++) {
    var n = Et[t], r = n.plugin, i = n.options;
    if (!(r.name && Ua.has(r.name))) {
      var o = lc(e);
      try {
        r.install(o, i, e);
      } catch (a) {
        console.error("[LiVue] Error installing plugin " + (r.name || "(unnamed)") + ":", a);
      }
    }
  }
}
function lc(e) {
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
      Ja[t] = n;
    },
    /**
     * Register a Vue directive applied to all Vue app instances.
     *
     * @param {string} name - Directive name (without 'v-' prefix)
     * @param {object|Function} def - Vue directive definition
     */
    directive: function(t, n) {
      Xa.push({ name: t, directive: n });
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
function Ka() {
  return Ja;
}
function sc() {
  return Xa;
}
function Vn(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, f = s.dataset.livueSnapshot || "{}", c, p, h, v, m, g;
    try {
      c = JSON.parse(f), p = c.memo ? c.memo.name : "", h = kt(c.state || {}), v = c.memo || {}, m = s.innerHTML, g = s.tagName.toLowerCase();
    } catch (M) {
      console.error("[LiVue] Failed to parse child snapshot:", u, M);
      return;
    }
    let y = s.nextElementSibling;
    for (; y; ) {
      let M = y.nextElementSibling;
      if (y.tagName === "SCRIPT" && y.getAttribute("type") === "application/livue-setup")
        m += y.outerHTML, y.parentNode.removeChild(y);
      else
        break;
      y = M;
    }
    let w = t._childRegistry[u];
    if (!w)
      for (let M in t._childRegistry) {
        let z = t._childRegistry[M];
        if (z.name === p && !o[M]) {
          w = z;
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
        w.livue._updateServerState(h, f), w.componentRef && w.componentRef._updateTemplate && w.componentRef._updateTemplate(m);
      }
    }
    let E = !w;
    if (!w) {
      let z = "livue-child-" + Nl();
      t._versions[z] = 0;
      let ne = $r(h), J;
      try {
        J = JSON.parse(JSON.stringify(h));
      } catch (x) {
        console.error("[LiVue] Failed to clone child server state:", x), J = {};
      }
      let Y = Object.assign({ name: v.name || p }, v), re = { _updateTemplate: null }, G = fa(), W = oi(u, ne, Y, re, J, f, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: G,
        pinia: t._pinia || null
      }), te = W.livue, ce = W.composables;
      we("component.init", {
        component: { id: u, name: p, state: ne, livue: te },
        el: s,
        cleanup: G.cleanup,
        isChild: !0
      });
      let De = v.errors || null;
      De && Te(te.errors, De), w = {
        tagName: z,
        state: ne,
        memo: Y,
        livue: te,
        composables: ce,
        componentRef: re,
        name: p,
        id: u,
        rootTag: g
      };
      let de = v.listeners || null;
      if (de)
        for (let x in de)
          (function(Ue, je) {
            fn(x, p, u, function(vt) {
              je.call(Ue, vt);
            });
          })(de[x], te);
      let nt = v.echo || null;
      nt && nt.length && (function(x, Ue) {
        ba(x, nt, function(je, vt) {
          Ue.call(je, vt);
        });
      })(u, te), re._updateTemplate = function(x) {
        let Ue = t.el.querySelector('[data-livue-id="' + u + '"]');
        Ue && Go(Ue);
        let je = Vn(x, t), vt = Qn(
          "<" + w.rootTag + ">" + je.template + "</" + w.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let b in je.childDefs)
          t.vueApp._context.components[b] || t.vueApp.component(b, je.childDefs[b]);
        t.vueApp._context.components[w.tagName]._updateRender(vt), sr(function() {
          let b = t.el.querySelector('[data-livue-id="' + u + '"]');
          b && Zo(b);
        });
      }, t._childRegistry[u] = w, o[u] = !0;
    }
    let D = w.tagName, V = s.dataset.livueRef;
    V && t._rootLivue && (t._rootLivue.refs[V] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(M, z) {
        return w.livue.call(M, z || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(M, z) {
        return w.livue.set(M, z);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(M, z) {
        return w.livue.dispatch(M, z);
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
    let I = s.dataset.livueModel;
    if (I && t._rootState && fn("$modelUpdate", w.name, u, function(M) {
      M && M.value !== void 0 && $t(t._rootState, I, M.value);
    }), E) {
      let M = Qn(
        "<" + g + ">" + m + "</" + g + ">",
        'data-livue-id="' + u + '"'
      ), z = Object.assign({}, Ka(), w.composables || {});
      i[D] = Jr(
        M,
        w.state,
        w.livue,
        z,
        t._versions,
        w.name
      );
    }
    t._versions[D] === void 0 && (t._versions[D] = 0);
    let k = document.createElement(D);
    k.setAttribute(":key", "livueV['" + D + "']"), s.parentNode.replaceChild(k, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let oo = 0;
function ai() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Cr = /* @__PURE__ */ new WeakMap();
function ao() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const uc = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (oo++, r = "livue-transition-" + oo), Cr.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), ai() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    ao();
  },
  updated(e, t) {
    let n = Cr.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), ai() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    Cr.delete(e), e.removeAttribute("data-livue-transition"), ao();
  }
};
function cc(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function dc(e) {
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
function fc(e, t) {
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
function pc(e, t) {
  if (t) {
    var n = fc(e, t);
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
let Tr = 0;
function vc(e) {
  return El({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = ln(!1), i = pi(null), o = null, a = ln(null);
      async function l() {
        if (!r.value)
          try {
            let u = await ws({
              component: t.config.name,
              props: t.config.props || {}
            });
            u.html && u.snapshot && s(u);
          } catch (u) {
            console.error("[LiVue] Lazy load failed:", u);
          }
      }
      function s(u) {
        let f = JSON.parse(u.snapshot);
        Tr++;
        let c = "lazy-" + Tr + "-" + Date.now(), p = f.memo ? f.memo.name : "", h = kt(f.state || {}), v = f.memo || {}, { createLivueHelper: m, buildComponentDef: g, processTemplate: y, createReactiveState: w } = e._lazyHelpers, T = w(h), O = JSON.parse(JSON.stringify(h)), E = { _updateTemplate: null }, D = m(
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
        ), V = D.livue, I = D.composables;
        v.errors && Te(V.errors, v.errors);
        let k = "livue-lazy-child-" + Tr, M = y(u.html, e), z = Qn(
          M.template,
          'data-livue-id="' + c + '"'
        ), ne = g(
          z,
          T,
          V,
          I,
          e._versions,
          p
        );
        e._childRegistry[c] = {
          tagName: k,
          state: T,
          memo: v,
          livue: V,
          componentRef: E,
          name: p,
          id: c
        }, E._updateTemplate = function(Y) {
          let re = y(Y, e), G = Qn(
            re.template,
            'data-livue-id="' + c + '"'
          );
          for (let te in re.childDefs)
            e.vueApp._context.components[te] || e.vueApp.component(te, re.childDefs[te]);
          let W = g(
            G,
            T,
            V,
            I,
            e._versions,
            p
          );
          e.vueApp._context.components[k] = W, e._versions[k] = (e._versions[k] || 0) + 1, i.value = W;
        };
        let J = v.listeners || null;
        if (J)
          for (let Y in J)
            (function(re, G) {
              fn(Y, p, c, function(W) {
                G.call(re, W);
              });
            })(J[Y], V);
        for (let Y in M.childDefs)
          e.vueApp._context.components[Y] || e.vueApp.component(Y, M.childDefs[Y]);
        e._versions[k] = 0, e.vueApp._context.components[k] || e.vueApp.component(k, ne), i.value = ne, r.value = !0;
      }
      return Jo(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Uo(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? Mi(i.value) : Mi("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class mc {
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
    this.name = r.memo ? r.memo.name : "", this.state = $r(kt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = Ie({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: oi,
      buildComponentDef: Jr,
      processTemplate: Vn,
      createReactiveState: $r
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
        var w = dc(r.el);
        Go(r.el);
        let T;
        try {
          T = Vn(g, r);
        } catch (E) {
          console.error("[LiVue] Error processing updated template:", E);
          return;
        }
        if (!r.vueApp) return;
        for (let E in T.childDefs)
          r.vueApp._context.components[E] || r.vueApp.component(E, T.childDefs[E]);
        function O() {
          r._currentRootDef._updateRender(T.template), sr(function() {
            Zo(r.el), pc(r.el, w), we("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (y.skipTransition) {
          O();
          return;
        }
        ai() ? cc(O, { type: y.transitionType }) : O();
      }
    }, o = JSON.parse(JSON.stringify(kt(t.state || {})));
    this._cleanups = fa(), this._pinia = Pi();
    let a = oi(this.componentId, this.state, this.memo, i, o, n, {
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
      u = Vn(this.el.innerHTML, this);
    } catch (g) {
      console.error("[LiVue] Error processing initial template:", g), u = { template: this.el.innerHTML, childDefs: {} };
    }
    let f = t.memo && t.memo.errors || null;
    f && Te(l.errors, f);
    let c = t.memo && t.memo.listeners || null;
    if (c)
      for (let g in c)
        (function(y, w, T, O) {
          fn(g, T, O, function(E) {
            w.call(y, E);
          });
        })(c[g], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = ba(r.componentId, p, function(g, y) {
      l.call(g, y);
    }));
    let h = Object.assign({}, Ka(), s), v = Jr(u.template, r.state, l, h, r._versions, r.name);
    this._currentRootDef = v, this._rootDefRef = pi(v), this.vueApp = Sl({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", vc(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = this._pinia || Pi();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let a = 0; a < window.LiVue._setupCallbacks.length; a++)
        try {
          let l = window.LiVue._setupCallbacks[a](n);
          l && typeof l.then == "function" && await l;
        } catch (l) {
          console.error("[LiVue] Error in setup() callback:", l);
        }
    let i = Ds();
    for (let a = 0; a < i.length; a++)
      n.directive(i[a].name, i[a].directive);
    let o = sc();
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
      we("component.destroy", {
        component: { id: t, name: n.name, state: n.state, livue: n.livue },
        isChild: !0
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Zi(t), Qi(t), ti(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && to(n.name), Wi(t);
    }
    if (we("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Zi(this.componentId), Qi(this.componentId), ti(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && to(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Wi(this.componentId), this.vueApp) {
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
let lo = /* @__PURE__ */ new Set();
const hc = {
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
    lo.has(u) || (lo.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Ar = /* @__PURE__ */ new WeakMap(), gc = {
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
    e.addEventListener("submit", l), Ar.set(e, l);
  },
  unmounted(e) {
    let t = Ar.get(e);
    t && (e.removeEventListener("submit", t), Ar.delete(e));
  }
}, En = /* @__PURE__ */ new WeakMap(), bc = {
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
    let f = "0px";
    if (s) {
      let v = parseInt(s, 10);
      isNaN(v) || (f = v + "px");
    }
    let c = l.leave === !0, p = !1, h = new IntersectionObserver(
      function(v) {
        let m = v[0];
        (c ? !m.isIntersecting : m.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (h.disconnect(), En.delete(e)));
      },
      {
        threshold: u,
        rootMargin: f
      }
    );
    h.observe(e), En.set(e, h);
  },
  unmounted(e) {
    let t = En.get(e);
    t && (t.disconnect(), En.delete(e));
  }
};
var er = /* @__PURE__ */ new Set(), St = /* @__PURE__ */ new WeakMap(), so = !1;
function At(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function yc(e, t) {
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
function li(e) {
  var t = St.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = yc(n, i);
      if (typeof r == "object" && r !== null) {
        var a = r.active ? At(r.active) : [], l = r.inactive ? At(r.inactive) : [];
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
        var s = At(r);
        o ? (s.forEach(function(u) {
          e.classList.add(u);
        }), e.setAttribute("data-current", ""), e.setAttribute("aria-current", "page")) : (s.forEach(function(u) {
          e.classList.remove(u);
        }), e.removeAttribute("data-current"), e.removeAttribute("aria-current"));
      }
    }
  }
}
function uo() {
  er.forEach(function(e) {
    e.isConnected ? li(e) : (er.delete(e), St.delete(e));
  });
}
function _c() {
  so || (so = !0, window.addEventListener("popstate", uo), window.addEventListener("livue:navigated", uo));
}
const wc = {
  mounted(e, t) {
    St.set(e, { value: t.value, modifiers: t.modifiers || {} }), er.add(e), _c(), li(e);
  },
  updated(e, t) {
    St.set(e, { value: t.value, modifiers: t.modifiers || {} }), li(e);
  },
  unmounted(e) {
    var t = St.get(e);
    if (t) {
      var n = t.value;
      if (typeof n == "object" && n !== null) {
        var r = n.active ? At(n.active) : [], i = n.inactive ? At(n.inactive) : [];
        r.forEach(function(o) {
          e.classList.remove(o);
        }), i.forEach(function(o) {
          e.classList.remove(o);
        });
      } else typeof n == "string" && At(n).forEach(function(o) {
        e.classList.remove(o);
      });
    }
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), er.delete(e), St.delete(e);
  }
};
let co = 0;
const Ec = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    co++;
    let n = "livue-ignore-" + co;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, Pt = /* @__PURE__ */ new WeakMap();
let fo = 0;
function Sc(e) {
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
function xc(e) {
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
function Sn(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function po(e, t) {
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
function Cc(e) {
  return !!e.component;
}
function Nr(e, t) {
  return e[t] && typeof e[t] == "object" && "value" in e[t] ? e[t].value : e[t];
}
function Tc(e, t, n) {
  e[t] && typeof e[t] == "object" && "value" in e[t] ? e[t].value = n : e[t] = n;
}
const Ac = {
  mounted(e, t, n) {
    let r = Sc(n);
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
    fo++;
    let s = "model-" + fo, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: f, throttleMs: c } = xc(l);
    l.live && !f && !c && (f = 150);
    function p(E) {
      if (l.number) {
        let D = Number(E);
        E = isNaN(D) ? 0 : D;
      }
      l.boolean && (E = !!E && E !== "false" && E !== "0"), Tc(o, a, E);
    }
    function h(E) {
      f > 0 ? Dt(s, f)(function() {
        p(E);
      }) : c > 0 ? pn(s, c)(function() {
        p(E);
      }) : p(E);
    }
    let v = Nr(o, a), m = Cc(n), g = n.component, y = null, w = null, T = null, O = null;
    if (m && g)
      O = g.emit, g.emit = function(E, ...D) {
        if (E === "update:modelValue") {
          let V = D[0];
          h(V);
          return;
        }
        return O.call(g, E, ...D);
      }, g.props && "modelValue" in g.props && (T = ke(
        function() {
          return Nr(o, a);
        },
        function(E) {
          g.vnode && g.vnode.props && (g.vnode.props.modelValue = E), g.exposed && typeof g.exposed.setValue == "function" && g.exposed.setValue(E), g.update && g.update();
        },
        { immediate: !0 }
      )), Pt.set(e, {
        isComponent: !0,
        componentInstance: g,
        originalEmit: O,
        stopWatcher: T,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (f > 0) {
        let E = Dt(s, f);
        y = function(D) {
          let V = Sn(D.target);
          E(function() {
            p(V);
          });
        };
      } else if (c > 0) {
        let E = pn(s, c);
        y = function(D) {
          let V = Sn(D.target);
          E(function() {
            p(V);
          });
        };
      } else
        y = function(E) {
          p(Sn(E.target));
        };
      l.enter ? (w = function(E) {
        E.key === "Enter" && p(Sn(E.target));
      }, e.addEventListener("keyup", w)) : e.addEventListener(u, y), po(e, v), Pt.set(e, {
        isComponent: !1,
        handler: y,
        keyHandler: w,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(e, t, n) {
    let r = Pt.get(e);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a = Nr(o, i);
      po(e, a);
    }
  },
  unmounted(e) {
    let t = Pt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), Pt.delete(e));
  }
}, kr = /* @__PURE__ */ new WeakMap(), Nc = 2500;
function kc(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Nc;
}
const Lc = {
  mounted(e, t, n) {
    let r = Le(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = kc(l), u = l["keep-alive"] === !0, f = l.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !f,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function p() {
      c.isPaused || f && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function h() {
      c.intervalId || (c.intervalId = setInterval(p, s));
    }
    function v() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    f && (c.observer = new IntersectionObserver(
      function(m) {
        c.isVisible = m[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(e)), document.addEventListener("visibilitychange", v), c.visibilityHandler = v, h(), kr.set(e, c);
  },
  unmounted(e) {
    let t = kr.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), kr.delete(e));
  }
}, xn = /* @__PURE__ */ new WeakMap();
let tr = typeof navigator < "u" ? navigator.onLine : !0, nr = /* @__PURE__ */ new Set(), vo = !1;
function Dc() {
  vo || typeof window > "u" || (vo = !0, window.addEventListener("online", function() {
    tr = !0, nr.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    tr = !1, nr.forEach(function(e) {
      e(!1);
    });
  }));
}
const Oc = {
  created(e, t) {
    Dc();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", tr && (e.style.display = "none")), xn.set(e, o);
  },
  mounted(e, t) {
    let n = xn.get(e);
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
    r(tr), n.updateFn = r, nr.add(r);
  },
  unmounted(e) {
    let t = xn.get(e);
    t && t.updateFn && nr.delete(t.updateFn), xn.delete(e);
  }
};
let mo = 0;
const qt = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new Map(), Mc = {
  created(e, t) {
    mo++;
    let n = "livue-replace-" + mo, r = t.modifiers.self === !0;
    qt.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Lr.set(n, 0);
  },
  mounted(e, t) {
    let n = qt.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = qt.get(e);
    n && (n.version++, Lr.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = qt.get(e);
    t && Lr.delete(t.id), qt.delete(e);
  }
}, jt = /* @__PURE__ */ new WeakMap(), ho = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Ic = 200;
function Rc(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(ho))
    if (e[t])
      return ho[t];
  return Ic;
}
function Dr(e, t, n, r, i) {
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
const Pc = {
  created(e, t) {
    let n = e.style.display;
    jt.set(e, {
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
    let i = jt.get(e), o = t.modifiers || {}, a = Rc(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function f(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Dr(e, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, Dr(e, i, o, u, !0)) : (i.isActive = !1, Dr(e, i, o, u, !1));
    }
    i.stopWatch = ke(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      f,
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    jt.get(e);
  },
  unmounted(e) {
    let t = jt.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), jt.delete(e));
  }
}, Cn = /* @__PURE__ */ new WeakMap(), qc = {
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
    Cn.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = Cn.get(e), i = Le(n);
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
    let t = Cn.get(e);
    t && (t.stopWatch && t.stopWatch(), Cn.delete(e));
  }
}, Vt = /* @__PURE__ */ new WeakMap(), jc = {
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
    Vt.set(e, { targetId: n }), ro(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = Vt.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      io(n.targetId);
      const i = t.modifiers.replace || !1;
      ro(r, e, i), Vt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = Vt.get(e);
    t && (io(t.targetId), Vt.delete(e));
  }
}, go = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, bo = ["ctrl", "alt", "shift", "meta"];
let yo = 0;
const _o = /* @__PURE__ */ new Set();
function Vc(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function zc(e, t) {
  for (let i = 0; i < bo.length; i++) {
    let o = bo[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in go)
    t[i] && (n = !0, e.key === go[i] && (r = !0));
  return !(n && !r);
}
function Hc(e, t, n) {
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
      const { arg: u, modifiers: f } = l, c = Le(s);
      if (!c) {
        console.warn("[LiVue] v-" + e + ": livue helper not found in component context");
        return;
      }
      if (u && !i) {
        const E = "v-" + e;
        _o.has(E) || (console.warn(
          "[LiVue] " + E + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), _o.add(E));
      }
      yo++;
      const p = "v-" + e + "-" + yo, h = Vc(f);
      let v = null, m = null;
      f.debounce && (v = Dt(p, h)), f.throttle && (m = pn(p, h));
      let g = !1;
      const y = function(E) {
        let D = Hc(l.value, u, i);
        if (D.directFn) {
          let I = D.directFn;
          v ? v(I) : m ? m(I) : I();
          return;
        }
        if (!D.methodName) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const V = function() {
          f.confirm ? c.callWithConfirm(D.methodName, "Are you sure?", ...D.args) : c.call(D.methodName, ...D.args);
        };
        v ? v(V) : m ? m(V) : V();
      }, w = function(E) {
        if (!(f.self && E.target !== a) && !(r && !zc(E, f))) {
          if (f.once) {
            if (g)
              return;
            g = !0;
          }
          f.prevent && E.preventDefault(), f.stop && E.stopPropagation(), y();
        }
      }, T = {};
      f.capture && (T.capture = !0), f.passive && (T.passive = !0);
      const O = {
        handler: w,
        options: T,
        outsideHandler: null
      };
      if (n && f.outside) {
        const E = function(D) {
          if (!a.contains(D.target) && D.target !== a) {
            if (f.once) {
              if (g)
                return;
              g = !0;
            }
            y();
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
const $c = B("click", {
  supportsOutside: !0,
  allowArg: !1
}), Fc = {
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
let wo = 0;
const Bc = {
  created(e, t) {
    let n = t.value;
    n || (wo++, n = "scroll-" + wo), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, zt = /* @__PURE__ */ new WeakMap();
function Eo(e, t, n, r, i) {
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
const Wc = {
  created(e, t) {
    let n = e.style.display;
    zt.set(e, {
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
    let i = zt.get(e), o = t.modifiers || {}, a = t.arg || null, l = t.value;
    i.stopWatch = ke(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        Eo(e, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = zt.get(e);
    if (r && t.value !== t.oldValue) {
      let i = Le(n);
      if (i) {
        let o = t.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        Eo(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = zt.get(e);
    t && (t.stopWatch && t.stopWatch(), zt.delete(e));
  }
}, Tn = /* @__PURE__ */ new WeakMap();
let So = 0;
function Uc(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Jc(e, t) {
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
function Xc(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const Kc = {
  mounted(e, t, n) {
    let r = Jc(t, n);
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
    So++;
    let s = "watch-" + i + "-" + So;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), Tn.set(e, { blurHandler: p });
      return;
    }
    let u = Uc(l) || 150, f = Dt(s, u), c = ke(
      function() {
        return Xc(a, i);
      },
      function() {
        f(function() {
          return o.sync();
        });
      }
    );
    Tn.set(e, { stopWatcher: c });
  },
  unmounted(e) {
    let t = Tn.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), Tn.delete(e));
  }
}, Or = /* @__PURE__ */ new WeakMap();
let xo = 0;
function Yc(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function Gc(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function Zc(e, t) {
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
function vr(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function mr(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function Qc(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function ed(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function td(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function nd(e) {
  return td(e) ? e : e.querySelector("input, textarea, select");
}
function hr(e, t, n) {
  return {
    mounted(r, i, o) {
      if (Yc(o) && !Gc(o))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let a = i.arg;
      if (!a)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let l = Zc(i, o);
      if (!l)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: s } = l, u = ed(s, a);
      if (!u)
        throw new Error("[LiVue] v-" + e + ': Property "' + a + '" not found in component state');
      let f = i.modifiers || {};
      xo++;
      let c = e + "-" + xo, p = nd(r);
      if (!p) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let h = t(p, u, s, f, c);
      p.addEventListener(h.eventType, h.handler, { capture: !0 }), Or.set(r, {
        targetEl: p,
        handler: h.handler,
        eventType: h.eventType
      });
    },
    unmounted(r) {
      let i = Or.get(r);
      i && (n && n(r, i), i.targetEl.removeEventListener(i.eventType, i.handler, { capture: !0 }), Or.delete(r));
    }
  };
}
function Ya(e, t) {
  return hr(e, function(n, r, i, o, a) {
    let l = Qc(o) || 150, s = t(a, l);
    return {
      eventType: "input",
      handler: function(u) {
        u.stopImmediatePropagation();
        let f = vr(u.target);
        s(function() {
          mr(i, r, f);
        });
      }
    };
  });
}
const rd = Ya("debounce", Dt), id = Ya("throttle", pn), od = hr(
  "blur",
  function(e, t, n, r, i) {
    let o = function(l) {
      l.stopImmediatePropagation();
    }, a = function(l) {
      mr(n, t, vr(l.target));
    };
    return e.addEventListener("blur", a), e._livueBlurHandler = a, { eventType: "input", handler: o };
  },
  function(e, t) {
    let n = t ? t.targetEl : e;
    n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler);
  }
), ad = hr(
  "enter",
  function(e, t, n, r, i) {
    let o = function(l) {
      l.stopImmediatePropagation();
    }, a = function(l) {
      l.key === "Enter" && mr(n, t, vr(l.target));
    };
    return e.addEventListener("keyup", a), e._livueEnterHandler = a, { eventType: "input", handler: o };
  },
  function(e, t) {
    let n = t ? t.targetEl : e;
    n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler);
  }
), ld = hr("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = vr(o.target);
      a = !!a && a !== "false" && a !== "0", mr(n, t, a);
    }
  };
});
function Co(e, t) {
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
    t % 2 ? Co(Object(n), !0).forEach(function(r) {
      sd(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Co(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function zn(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? zn = function(t) {
    return typeof t;
  } : zn = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, zn(e);
}
function sd(e, t, n) {
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
function ud(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function cd(e, t) {
  if (e == null) return {};
  var n = ud(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var dd = "1.15.6";
function $e(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var We = $e(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), hn = $e(/Edge/i), To = $e(/firefox/i), tn = $e(/safari/i) && !$e(/chrome/i) && !$e(/android/i), ki = $e(/iP(ad|od|hone)/i), Ga = $e(/chrome/i) && $e(/android/i), Za = {
  capture: !1,
  passive: !1
};
function F(e, t, n) {
  e.addEventListener(t, n, !We && Za);
}
function H(e, t, n) {
  e.removeEventListener(t, n, !We && Za);
}
function rr(e, t) {
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
function Qa(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Ne(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && rr(e, t) : rr(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = Qa(e));
  }
  return null;
}
var Ao = /\s+/g;
function he(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Ao, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Ao, " ");
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
function Nt(e, t) {
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
function el(e, t, n) {
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
function oe(e, t, n, r, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var o, a, l, s, u, f, c;
    if (e !== window && e.parentNode && e !== Pe() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, f = o.height, c = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, f = window.innerHeight, c = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !We))
      do
        if (i && i.getBoundingClientRect && (P(i, "transform") !== "none" || n && P(i, "position") !== "static")) {
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(P(i, "border-top-width")), l -= p.left + parseInt(P(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var h = Nt(i || e), v = h && h.a, m = h && h.d;
      h && (a /= m, l /= v, c /= v, f /= m, s = a + f, u = l + c);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: c,
      height: f
    };
  }
}
function No(e, t, n) {
  for (var r = et(e, !0), i = oe(e)[t]; r; ) {
    var o = oe(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === Pe()) break;
    r = et(r, !1);
  }
  return !1;
}
function Ot(e, t, n, r) {
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
function Li(e, t) {
  for (var n = e.lastElementChild; n && (n === q.ghost || P(n, "display") === "none" || t && !rr(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function _e(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== q.clone && (!t || rr(e, t)) && n++;
  return n;
}
function ko(e) {
  var t = 0, n = 0, r = Pe();
  if (e)
    do {
      var i = Nt(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function fd(e, t) {
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
function pd(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Mr(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var nn;
function tl(e, t) {
  return function() {
    if (!nn) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), nn = setTimeout(function() {
        nn = void 0;
      }, t);
    }
  };
}
function vd() {
  clearTimeout(nn), nn = void 0;
}
function nl(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function rl(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function il(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!Ne(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = oe(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var me = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function md() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(P(i, "display") === "none" || i === q.ghost)) {
            e.push({
              target: i,
              rect: oe(i)
            });
            var o = qe({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Nt(i, !0);
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
      e.splice(fd(e, {
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
        var s = 0, u = l.target, f = u.fromRect, c = oe(u), p = u.prevFromRect, h = u.prevToRect, v = l.rect, m = Nt(u, !0);
        m && (c.top -= m.f, c.left -= m.e), u.toRect = c, u.thisAnimationDuration && Mr(p, c) && !Mr(f, c) && // Make sure animatingRect is on line between toRect & fromRect
        (v.top - c.top) / (v.left - c.left) === (f.top - c.top) / (f.left - c.left) && (s = gd(v, p, h, i.options)), Mr(c, f) || (u.prevFromRect = f, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, v, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        P(r, "transition", ""), P(r, "transform", "");
        var l = Nt(this.el), s = l && l.a, u = l && l.d, f = (i.left - o.left) / (s || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!f, r.animatingY = !!c, P(r, "transform", "translate3d(" + f + "px," + c + "px,0)"), this.forRepaintDummy = hd(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function hd(e) {
  return e.offsetWidth;
}
function gd(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var gt = [], Ir = {
  initializeByDefault: !0
}, gn = {
  mount: function(t) {
    for (var n in Ir)
      Ir.hasOwnProperty(n) && !(n in t) && (t[n] = Ir[n]);
    gt.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), gt.push(t);
  },
  pluginEvent: function(t, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = t + "Global";
    gt.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](qe({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](qe({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    gt.forEach(function(l) {
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
    return gt.forEach(function(i) {
      typeof i.eventProperties == "function" && Be(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return gt.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function bd(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, f = e.oldDraggableIndex, c = e.newDraggableIndex, p = e.originalEvent, h = e.putSortable, v = e.extraEventProperties;
  if (t = t || n && n[me], !!t) {
    var m, g = t.options, y = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !We && !hn ? m = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = f, m.newDraggableIndex = c, m.originalEvent = p, m.pullMode = h ? h.lastPutMode : void 0;
    var w = qe(qe({}, v), gn.getEventProperties(r, t));
    for (var T in w)
      m[T] = w[T];
    n && n.dispatchEvent(m), g[y] && g[y].call(t, m);
  }
}
var yd = ["evt"], ve = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = cd(r, yd);
  gn.pluginEvent.bind(q)(t, n, qe({
    dragEl: C,
    parentEl: ee,
    ghostEl: j,
    rootEl: K,
    nextEl: lt,
    lastDownEl: Hn,
    cloneEl: Q,
    cloneHidden: Ze,
    dragStarted: Wt,
    putSortable: le,
    activeSortable: q.active,
    originalEvent: i,
    oldIndex: xt,
    oldDraggableIndex: rn,
    newIndex: be,
    newDraggableIndex: Xe,
    hideGhostForTarget: sl,
    unhideGhostForTarget: ul,
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
  bd(qe({
    putSortable: le,
    cloneEl: Q,
    targetEl: C,
    rootEl: K,
    oldIndex: xt,
    oldDraggableIndex: rn,
    newIndex: be,
    newDraggableIndex: Xe
  }, e));
}
var C, ee, j, K, lt, Hn, Q, Ze, xt, be, rn, Xe, An, le, wt = !1, ir = !1, or = [], it, Se, Rr, Pr, Lo, Do, Wt, bt, on, an = !1, Nn = !1, $n, ue, qr = [], si = !1, ar = [], gr = typeof document < "u", kn = ki, Oo = hn || We ? "cssFloat" : "float", _d = gr && !Ga && !ki && "draggable" in document.createElement("div"), ol = (function() {
  if (gr) {
    if (We)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), al = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Ot(t, 0, n), a = Ot(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + oe(o).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + oe(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Oo] === "none" || a && r[Oo] === "none" && u + f > i) ? "vertical" : "horizontal";
}, wd = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, Ed = function(t, n) {
  var r;
  return or.some(function(i) {
    var o = i[me].options.emptyInsertThreshold;
    if (!(!o || Li(i))) {
      var a = oe(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, ll = function(t) {
  function n(o, a) {
    return function(l, s, u, f) {
      var c = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (o == null && (a || c))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(l, s, u, f), a)(l, s, u, f);
      var p = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
    };
  }
  var r = {}, i = t.group;
  (!i || zn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, sl = function() {
  !ol && j && P(j, "display", "none");
}, ul = function() {
  !ol && j && P(j, "display", "");
};
gr && !Ga && document.addEventListener("click", function(e) {
  if (ir)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), ir = !1, !1;
}, !0);
var ot = function(t) {
  if (C) {
    t = t.touches ? t.touches[0] : t;
    var n = Ed(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[me]._onDragOver(r);
    }
  }
}, Sd = function(t) {
  C && C.parentNode[me]._isOutsideThisEl(t.target);
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
      return al(e, this.options);
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
    supportPointer: q.supportPointer !== !1 && "PointerEvent" in window && (!tn || ki),
    emptyInsertThreshold: 5
  };
  gn.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  ll(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : _d, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? F(e, "pointerdown", this._onTapStart) : (F(e, "mousedown", this._onTapStart), F(e, "touchstart", this._onTapStart)), this.nativeDraggable && (F(e, "dragover", this), F(e, "dragenter", this)), or.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Be(this, md());
}
q.prototype = /** @lends Sortable.prototype */
{
  constructor: q,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (bt = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, C) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = i.filter;
      if (Dd(r), !C && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && tn && s && s.tagName.toUpperCase() === "SELECT") && (s = Ne(s, i.draggable, r, !1), !(s && s.animated) && Hn !== s)) {
        if (xt = _e(s), rn = _e(s, i.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
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
        } else if (f && (f = f.split(",").some(function(c) {
          if (c = Ne(u, c.trim(), r, !1), c)
            return fe({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), ve("filter", n, {
              evt: t
            }), !0;
        }), f)) {
          o && t.preventDefault();
          return;
        }
        i.handle && !Ne(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !C && r.parentNode === o) {
      var u = oe(r);
      if (K = o, C = r, ee = C.parentNode, lt = C.nextSibling, Hn = r, An = a.group, q.dragged = C, it = {
        target: C,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Lo = it.clientX - u.left, Do = it.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, C.style["will-change"] = "all", s = function() {
        if (ve("delayEnded", i, {
          evt: t
        }), q.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !To && i.nativeDraggable && (C.draggable = !0), i._triggerDragStart(t, n), fe({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), he(C, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        el(C, f.trim(), jr);
      }), F(l, "dragover", ot), F(l, "mousemove", ot), F(l, "touchmove", ot), a.supportPointer ? (F(l, "pointerup", i._onDrop), !this.nativeDraggable && F(l, "pointercancel", i._onDrop)) : (F(l, "mouseup", i._onDrop), F(l, "touchend", i._onDrop), F(l, "touchcancel", i._onDrop)), To && this.nativeDraggable && (this.options.touchStartThreshold = 4, C.draggable = !0), ve("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(hn || We))) {
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
    C && jr(C), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    H(t, "mouseup", this._disableDelayedDrag), H(t, "touchend", this._disableDelayedDrag), H(t, "touchcancel", this._disableDelayedDrag), H(t, "pointerup", this._disableDelayedDrag), H(t, "pointercancel", this._disableDelayedDrag), H(t, "mousemove", this._delayedDragTouchMoveHandler), H(t, "touchmove", this._delayedDragTouchMoveHandler), H(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? F(document, "pointermove", this._onTouchMove) : n ? F(document, "touchmove", this._onTouchMove) : F(document, "mousemove", this._onTouchMove) : (F(C, "dragend", this), F(K, "dragstart", this._onDragStart));
    try {
      document.selection ? Fn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (wt = !1, K && C) {
      ve("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && F(document, "dragover", Sd);
      var r = this.options;
      !t && he(C, r.dragClass, !1), he(C, r.ghostClass, !0), q.active = this, t && this._appendGhost(), fe({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Se) {
      this._lastX = Se.clientX, this._lastY = Se.clientY, sl();
      for (var t = document.elementFromPoint(Se.clientX, Se.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Se.clientX, Se.clientY), t !== n); )
        n = t;
      if (C.parentNode[me]._isOutsideThisEl(t), n)
        do {
          if (n[me]) {
            var r = void 0;
            if (r = n[me]._onDragOver({
              clientX: Se.clientX,
              clientY: Se.clientY,
              target: t,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = Qa(n));
      ul();
    }
  },
  _onTouchMove: function(t) {
    if (it) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = j && Nt(j, !0), l = j && a && a.a, s = j && a && a.d, u = kn && ue && ko(ue), f = (o.clientX - it.clientX + i.x) / (l || 1) + (u ? u[0] - qr[0] : 0) / (l || 1), c = (o.clientY - it.clientY + i.y) / (s || 1) + (u ? u[1] - qr[1] : 0) / (s || 1);
      if (!q.active && !wt) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (j) {
        a ? (a.e += f - (Rr || 0), a.f += c - (Pr || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: c
        };
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(j, "webkitTransform", p), P(j, "mozTransform", p), P(j, "msTransform", p), P(j, "transform", p), Rr = f, Pr = c, Se = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!j) {
      var t = this.options.fallbackOnBody ? document.body : K, n = oe(C, !0, kn, !0, t), r = this.options;
      if (kn) {
        for (ue = t; P(ue, "position") === "static" && P(ue, "transform") === "none" && ue !== document; )
          ue = ue.parentNode;
        ue !== document.body && ue !== document.documentElement ? (ue === document && (ue = Pe()), n.top += ue.scrollTop, n.left += ue.scrollLeft) : ue = Pe(), qr = ko(ue);
      }
      j = C.cloneNode(!0), he(j, r.ghostClass, !1), he(j, r.fallbackClass, !0), he(j, r.dragClass, !0), P(j, "transition", ""), P(j, "transform", ""), P(j, "box-sizing", "border-box"), P(j, "margin", 0), P(j, "top", n.top), P(j, "left", n.left), P(j, "width", n.width), P(j, "height", n.height), P(j, "opacity", "0.8"), P(j, "position", kn ? "absolute" : "fixed"), P(j, "zIndex", "100000"), P(j, "pointerEvents", "none"), q.ghost = j, t.appendChild(j), P(j, "transform-origin", Lo / parseInt(j.style.width) * 100 + "% " + Do / parseInt(j.style.height) * 100 + "%");
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
    ve("setupClone", this), q.eventCanceled || (Q = rl(C), Q.removeAttribute("id"), Q.draggable = !1, Q.style["will-change"] = "", this._hideClone(), he(Q, this.options.chosenClass, !1), q.clone = Q), r.cloneId = Fn(function() {
      ve("clone", r), !q.eventCanceled && (r.options.removeCloneOnHide || K.insertBefore(Q, C), r._hideClone(), fe({
        sortable: r,
        name: "clone"
      }));
    }), !n && he(C, o.dragClass, !0), n ? (ir = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (H(document, "mouseup", r._onDrop), H(document, "touchend", r._onDrop), H(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, C)), F(document, "drop", r), P(C, "transform", "translateZ(0)")), wt = !0, r._dragStartId = Fn(r._dragStarted.bind(r, n, t)), F(document, "selectstart", r), Wt = !0, window.getSelection().removeAllRanges(), tn && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = q.active, f = An === s, c = l.sort, p = le || u, h, v = this, m = !1;
    if (si) return;
    function g(te, ce) {
      ve(te, v, qe({
        evt: t,
        isOwner: f,
        axis: h ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: p,
        target: r,
        completed: w,
        onMove: function(de, nt) {
          return Ln(K, n, C, i, de, oe(de), t, nt);
        },
        changed: T
      }, ce));
    }
    function y() {
      g("dragOverAnimationCapture"), v.captureAnimationState(), v !== p && p.captureAnimationState();
    }
    function w(te) {
      return g("dragOverCompleted", {
        insertion: te
      }), te && (f ? u._hideClone() : u._showClone(v), v !== p && (he(C, le ? le.options.ghostClass : u.options.ghostClass, !1), he(C, l.ghostClass, !0)), le !== v && v !== q.active ? le = v : v === q.active && le && (le = null), p === v && (v._ignoreWhileAnimating = r), v.animateAll(function() {
        g("dragOverAnimationComplete"), v._ignoreWhileAnimating = null;
      }), v !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === C && !C.animated || r === n && !r.animated) && (bt = null), !l.dragoverBubble && !t.rootEl && r !== document && (C.parentNode[me]._isOutsideThisEl(t.target), !te && ot(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
    }
    function T() {
      be = _e(C), Xe = _e(C, l.draggable), fe({
        sortable: v,
        name: "change",
        toEl: n,
        newIndex: be,
        newDraggableIndex: Xe,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = Ne(r, l.draggable, n, !0), g("dragOver"), q.eventCanceled) return m;
    if (C.contains(t.target) || r.animated && r.animatingX && r.animatingY || v._ignoreWhileAnimating === r)
      return w(!1);
    if (ir = !1, u && !l.disabled && (f ? c || (a = ee !== K) : le === this || (this.lastPutMode = An.checkPull(this, u, C, t)) && s.checkPut(this, u, C, t))) {
      if (h = this._getDirection(t, r) === "vertical", i = oe(C), g("dragOverValid"), q.eventCanceled) return m;
      if (a)
        return ee = K, y(), this._hideClone(), g("revert"), q.eventCanceled || (lt ? K.insertBefore(C, lt) : K.appendChild(C)), w(!0);
      var O = Li(n, l.draggable);
      if (!O || Ad(t, h, this) && !O.animated) {
        if (O === C)
          return w(!1);
        if (O && n === t.target && (r = O), r && (o = oe(r)), Ln(K, n, C, i, r, o, t, !!r) !== !1)
          return y(), O && O.nextSibling ? n.insertBefore(C, O.nextSibling) : n.appendChild(C), ee = n, T(), w(!0);
      } else if (O && Td(t, h, this)) {
        var E = Ot(n, 0, l, !0);
        if (E === C)
          return w(!1);
        if (r = E, o = oe(r), Ln(K, n, C, i, r, o, t, !1) !== !1)
          return y(), n.insertBefore(C, E), ee = n, T(), w(!0);
      } else if (r.parentNode === n) {
        o = oe(r);
        var D = 0, V, I = C.parentNode !== n, k = !wd(C.animated && C.toRect || i, r.animated && r.toRect || o, h), M = h ? "top" : "left", z = No(r, "top", "top") || No(C, "top", "top"), ne = z ? z.scrollTop : void 0;
        bt !== r && (V = o[M], an = !1, Nn = !k && l.invertSwap || I), D = Nd(t, r, o, h, k ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Nn, bt === r);
        var J;
        if (D !== 0) {
          var Y = _e(C);
          do
            Y -= D, J = ee.children[Y];
          while (J && (P(J, "display") === "none" || J === j));
        }
        if (D === 0 || J === r)
          return w(!1);
        bt = r, on = D;
        var re = r.nextElementSibling, G = !1;
        G = D === 1;
        var W = Ln(K, n, C, i, r, o, t, G);
        if (W !== !1)
          return (W === 1 || W === -1) && (G = W === 1), si = !0, setTimeout(Cd, 30), y(), G && !re ? n.appendChild(C) : r.parentNode.insertBefore(C, G ? re : r), z && nl(z, 0, ne - z.scrollTop), ee = C.parentNode, V !== void 0 && !Nn && ($n = Math.abs(V - oe(r)[M])), T(), w(!0);
      }
      if (n.contains(C))
        return w(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    H(document, "mousemove", this._onTouchMove), H(document, "touchmove", this._onTouchMove), H(document, "pointermove", this._onTouchMove), H(document, "dragover", ot), H(document, "mousemove", ot), H(document, "touchmove", ot);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    H(t, "mouseup", this._onDrop), H(t, "touchend", this._onDrop), H(t, "pointerup", this._onDrop), H(t, "pointercancel", this._onDrop), H(t, "touchcancel", this._onDrop), H(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (be = _e(C), Xe = _e(C, r.draggable), ve("drop", this, {
      evt: t
    }), ee = C && C.parentNode, be = _e(C), Xe = _e(C, r.draggable), q.eventCanceled) {
      this._nulling();
      return;
    }
    wt = !1, Nn = !1, an = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), ui(this.cloneId), ui(this._dragStartId), this.nativeDraggable && (H(document, "drop", this), H(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), tn && P(document.body, "user-select", ""), P(C, "transform", ""), t && (Wt && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), j && j.parentNode && j.parentNode.removeChild(j), (K === ee || le && le.lastPutMode !== "clone") && Q && Q.parentNode && Q.parentNode.removeChild(Q), C && (this.nativeDraggable && H(C, "dragend", this), jr(C), C.style["will-change"] = "", Wt && !wt && he(C, le ? le.options.ghostClass : this.options.ghostClass, !1), he(C, this.options.chosenClass, !1), fe({
      sortable: this,
      name: "unchoose",
      toEl: ee,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), K !== ee ? (be >= 0 && (fe({
      rootEl: ee,
      name: "add",
      toEl: ee,
      fromEl: K,
      originalEvent: t
    }), fe({
      sortable: this,
      name: "remove",
      toEl: ee,
      originalEvent: t
    }), fe({
      rootEl: ee,
      name: "sort",
      toEl: ee,
      fromEl: K,
      originalEvent: t
    }), fe({
      sortable: this,
      name: "sort",
      toEl: ee,
      originalEvent: t
    })), le && le.save()) : be !== xt && be >= 0 && (fe({
      sortable: this,
      name: "update",
      toEl: ee,
      originalEvent: t
    }), fe({
      sortable: this,
      name: "sort",
      toEl: ee,
      originalEvent: t
    })), q.active && ((be == null || be === -1) && (be = xt, Xe = rn), fe({
      sortable: this,
      name: "end",
      toEl: ee,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ve("nulling", this), K = C = ee = j = lt = Q = Hn = Ze = it = Se = Wt = be = Xe = xt = rn = bt = on = le = An = q.dragged = q.ghost = q.clone = q.active = null, ar.forEach(function(t) {
      t.checked = !0;
    }), ar.length = Rr = Pr = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        C && (this._onDragOver(t), xd(t));
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
      n = r[i], Ne(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Ld(n));
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
    var i = gn.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && ll(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ve("destroy", this);
    var t = this.el;
    t[me] = null, H(t, "mousedown", this._onTapStart), H(t, "touchstart", this._onTapStart), H(t, "pointerdown", this._onTapStart), this.nativeDraggable && (H(t, "dragover", this), H(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), or.splice(or.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ze) {
      if (ve("hideClone", this), q.eventCanceled) return;
      P(Q, "display", "none"), this.options.removeCloneOnHide && Q.parentNode && Q.parentNode.removeChild(Q), Ze = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ze) {
      if (ve("showClone", this), q.eventCanceled) return;
      C.parentNode == K && !this.options.group.revertClone ? K.insertBefore(Q, C) : lt ? K.insertBefore(Q, lt) : K.appendChild(Q), this.options.group.revertClone && this.animate(C, Q), P(Q, "display", ""), Ze = !1;
    }
  }
};
function xd(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Ln(e, t, n, r, i, o, a, l) {
  var s, u = e[me], f = u.options.onMove, c;
  return window.CustomEvent && !We && !hn ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || oe(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), f && (c = f.call(u, s, a)), c;
}
function jr(e) {
  e.draggable = !1;
}
function Cd() {
  si = !1;
}
function Td(e, t, n) {
  var r = oe(Ot(n.el, 0, n.options, !0)), i = il(n.el, n.options, j), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Ad(e, t, n) {
  var r = oe(Li(n.el, n.options.draggable)), i = il(n.el, n.options, j), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Nd(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, f = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && $n < u * i) {
      if (!an && (on === 1 ? s > f + u * o / 2 : s < c - u * o / 2) && (an = !0), an)
        p = !0;
      else if (on === 1 ? s < f + $n : s > c - $n)
        return -on;
    } else if (s > f + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return kd(t);
  }
  return p = p || a, p && (s < f + u * o / 2 || s > c - u * o / 2) ? s > f + u / 2 ? 1 : -1 : 0;
}
function kd(e) {
  return _e(C) < _e(e) ? 1 : -1;
}
function Ld(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Dd(e) {
  ar.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && ar.push(r);
  }
}
function Fn(e) {
  return setTimeout(e, 0);
}
function ui(e) {
  return clearTimeout(e);
}
gr && F(document, "touchmove", function(e) {
  (q.active || wt) && e.cancelable && e.preventDefault();
});
q.utils = {
  on: F,
  off: H,
  css: P,
  find: el,
  is: function(t, n) {
    return !!Ne(t, n, t, !1);
  },
  extend: pd,
  throttle: tl,
  closest: Ne,
  toggleClass: he,
  clone: rl,
  index: _e,
  nextTick: Fn,
  cancelNextTick: ui,
  detectDirection: al,
  getChild: Ot,
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
    r.utils && (q.utils = qe(qe({}, q.utils), r.utils)), gn.mount(r);
  });
};
q.create = function(e, t) {
  return new q(e, t);
};
q.version = dd;
var ie = [], Ut, ci, di = !1, Vr, zr, lr, Jt;
function Od() {
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
      this.sortable.nativeDraggable ? H(document, "dragover", this._handleAutoScroll) : (H(document, "pointermove", this._handleFallbackAutoScroll), H(document, "touchmove", this._handleFallbackAutoScroll), H(document, "mousemove", this._handleFallbackAutoScroll)), Mo(), Bn(), vd();
    },
    nulling: function() {
      lr = ci = Ut = di = Jt = Vr = zr = null, ie.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (lr = n, r || this.options.forceAutoScrollFallback || hn || We || tn) {
        Hr(n, this.options, l, r);
        var s = et(l, !0);
        di && (!Jt || o !== Vr || a !== zr) && (Jt && Mo(), Jt = setInterval(function() {
          var u = et(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, Bn()), Hr(n, i.options, u, r);
        }, 10), Vr = o, zr = a);
      } else {
        if (!this.options.bubbleScroll || et(l, !0) === Pe()) {
          Bn();
          return;
        }
        Hr(n, this.options, et(l, !1), !1);
      }
    }
  }, Be(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Bn() {
  ie.forEach(function(e) {
    clearInterval(e.pid);
  }), ie = [];
}
function Mo() {
  clearInterval(Jt);
}
var Hr = tl(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Pe(), u = !1, f;
    ci !== n && (ci = n, Bn(), Ut = t.scroll, f = t.scrollFn, Ut === !0 && (Ut = et(n, !0)));
    var c = 0, p = Ut;
    do {
      var h = p, v = oe(h), m = v.top, g = v.bottom, y = v.left, w = v.right, T = v.width, O = v.height, E = void 0, D = void 0, V = h.scrollWidth, I = h.scrollHeight, k = P(h), M = h.scrollLeft, z = h.scrollTop;
      h === s ? (E = T < V && (k.overflowX === "auto" || k.overflowX === "scroll" || k.overflowX === "visible"), D = O < I && (k.overflowY === "auto" || k.overflowY === "scroll" || k.overflowY === "visible")) : (E = T < V && (k.overflowX === "auto" || k.overflowX === "scroll"), D = O < I && (k.overflowY === "auto" || k.overflowY === "scroll"));
      var ne = E && (Math.abs(w - i) <= a && M + T < V) - (Math.abs(y - i) <= a && !!M), J = D && (Math.abs(g - o) <= a && z + O < I) - (Math.abs(m - o) <= a && !!z);
      if (!ie[c])
        for (var Y = 0; Y <= c; Y++)
          ie[Y] || (ie[Y] = {});
      (ie[c].vx != ne || ie[c].vy != J || ie[c].el !== h) && (ie[c].el = h, ie[c].vx = ne, ie[c].vy = J, clearInterval(ie[c].pid), (ne != 0 || J != 0) && (u = !0, ie[c].pid = setInterval(function() {
        r && this.layer === 0 && q.active._onTouchMove(lr);
        var re = ie[this.layer].vy ? ie[this.layer].vy * l : 0, G = ie[this.layer].vx ? ie[this.layer].vx * l : 0;
        typeof f == "function" && f.call(q.dragged.parentNode[me], G, re, e, lr, ie[this.layer].el) !== "continue" || nl(ie[this.layer].el, G, re);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (t.bubbleScroll && p !== s && (p = et(p, !1)));
    di = u;
  }
}, 30), cl = function(t) {
  var n = t.originalEvent, r = t.putSortable, i = t.dragEl, o = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    l();
    var f = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(f.clientX, f.clientY);
    s(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: r
    }));
  }
};
function Di() {
}
Di.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = Ot(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: cl
};
Be(Di, {
  pluginName: "revertOnSpill"
});
function Oi() {
}
Oi.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: cl
};
Be(Oi, {
  pluginName: "removeOnSpill"
});
q.mount(new Od());
q.mount(Oi, Di);
const Ct = /* @__PURE__ */ new WeakMap(), Wn = /* @__PURE__ */ new WeakMap();
function Md(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const Dn = /* @__PURE__ */ new WeakMap();
function Id(e, t) {
  let n = e.from;
  e.oldIndex < e.newIndex ? n.insertBefore(e.item, n.children[e.oldIndex]) : n.insertBefore(e.item, n.children[e.oldIndex + 1]);
  let r = t.splice(e.oldIndex, 1)[0];
  t.splice(e.newIndex, 0, r);
}
function Rd(e, t, n) {
  let r = e.item, i = Wn.get(r);
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
const Pd = {
  mounted(e, t, n) {
    let r = Le(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Md(i), l = i.horizontal ? "horizontal" : "vertical";
    Dn.set(e, t);
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
        let h = Dn.get(e), v = h ? h.value : null;
        Array.isArray(v) ? Id(p, v) : typeof v == "string" && r && Rd(p, v, r);
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let c = q.create(e, u);
    Ct.set(e, c);
  },
  updated(e, t) {
    Dn.set(e, t);
    let n = Ct.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = Ct.get(e);
    t && (t.destroy(), Ct.delete(e)), Dn.delete(e);
  }
}, qd = {
  mounted(e, t) {
    let n = t.value;
    Wn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    Wn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (Wn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, jd = {
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
}, Vd = {
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
}, zd = {
  mounted(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = Ct.get(e);
    r && r.option("group", n);
  },
  updated(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = Ct.get(e);
    r && r.option("group", n);
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, Hd = B("dblclick"), $d = B("mousedown"), Fd = B("mouseup"), Bd = B("mouseenter"), Wd = B("mouseleave"), Ud = B("mouseover"), Jd = B("mouseout"), Xd = B("mousemove"), Kd = B("contextmenu"), Yd = B("keydown", { isKeyboardEvent: !0 }), Gd = B("keyup", { isKeyboardEvent: !0 }), Zd = B("keypress", { isKeyboardEvent: !0 }), Qd = B("focus"), ef = B("focusin"), tf = B("focusout"), nf = B("touchstart"), rf = B("touchend"), of = B("touchmove"), af = B("touchcancel"), lf = B("change"), sf = B("input"), uf = B("reset"), cf = B("dragstart"), df = B("dragend"), ff = B("dragenter"), pf = B("dragleave"), vf = B("dragover"), mf = B("drop"), hf = B("copy"), gf = B("cut"), bf = B("paste"), yf = B("wheel"), _f = B("resize");
function wf() {
  N("init", hc), N("submit", gc), N("intersect", bc), N("current", wc), N("ignore", Ec), N("model-livue", Ac), N("debounce", rd), N("throttle", id), N("blur", od), N("enter", ad), N("boolean", ld), N("poll", Lc), N("offline", Oc), N("transition", uc), N("replace", Mc), N("loading", Pc), N("target", qc), N("stream", jc), N("click", $c), N("navigate", Fc), N("scroll", Bc), N("dirty", Wc), N("watch", Kc), N("sort", Pd), N("sort-item", qd), N("sort-handle", jd), N("sort-ignore", Vd), N("sort-group", zd), N("dblclick", Hd), N("mousedown", $d), N("mouseup", Fd), N("mouseenter", Bd), N("mouseleave", Wd), N("mouseover", Ud), N("mouseout", Jd), N("mousemove", Xd), N("contextmenu", Kd), N("keydown", Yd), N("keyup", Gd), N("keypress", Zd), N("focus", Qd), N("focusin", ef), N("focusout", tf), N("touchstart", nf), N("touchend", rf), N("touchmove", of), N("touchcancel", af), N("change", lf), N("input", sf), N("reset", uf), N("dragstart", cf), N("dragend", df), N("dragenter", ff), N("dragleave", pf), N("dragover", vf), N("drop", mf), N("copy", hf), N("cut", gf), N("paste", bf), N("wheel", yf), N("resize", _f);
}
var vn = !1, fi = [];
function dl() {
  if (!vn) {
    vn = !0, console.log("[LiVue] Debug mode enabled");
    var e = pa();
    e.forEach(function(t) {
      var n = Ce(t, function(r) {
        var i = {};
        r.component && (i.componentId = r.component.id, i.componentName = r.component.name), r.el && (i.element = r.el.tagName), r.url && (i.url = r.url), r.updateCount !== void 0 && (i.updateCount = r.updateCount), r.lazyCount !== void 0 && (i.lazyCount = r.lazyCount), r.success !== void 0 && (i.success = r.success), r.error && (i.error = r.error.message || String(r.error)), r.isChild !== void 0 && (i.isChild = r.isChild), console.log("[LiVue] " + t + ":", i);
      });
      fi.push(n);
    });
  }
}
function Ef() {
  vn && (vn = !1, console.log("[LiVue] Debug mode disabled"), fi.forEach(function(e) {
    e();
  }), fi = []);
}
function Io() {
  return vn;
}
function On(e, t) {
  var n = [];
  if (e.tagName && e.tagName.toLowerCase() === "livue-lazy" && Ro(e) && n.push(e), e.querySelectorAll) {
    var r = e.querySelectorAll("livue-lazy");
    r.forEach(function(i) {
      Ro(i) && n.push(i);
    });
  }
  n.forEach(function(i) {
    Sf(i, t);
  });
}
function Ro(e) {
  if (e.dataset.livueLazyWrapped)
    return !1;
  for (var t = e.parentElement; t; ) {
    if (t.hasAttribute("data-livue-id"))
      return !1;
    t = t.parentElement;
  }
  return !0;
}
function Sf(e, t) {
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
let Ke = null, Ht = null, Po = !1;
function xf() {
  if (Po)
    return;
  Po = !0;
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
function Cf() {
  return Ke || (xf(), Ke = document.createElement("div"), Ke.className = "livue-hmr-indicator", document.body.appendChild(Ke), Ke);
}
function Mn(e, t) {
  const n = Cf();
  switch (Ht && (clearTimeout(Ht), Ht = null), e) {
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
            `, Ht = setTimeout(function() {
        qo();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, Ht = setTimeout(function() {
        qo();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function qo() {
  Ke && Ke.classList.remove("visible");
}
let ft = null, br = !0, fl = !0, Xt = !0, Un = [];
function Tf(e) {
  ft = e;
}
async function Af(e) {
  if (br) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), Xt && Mn("updating", e.fileName), Un.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = fl ? Nf() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), Xt && Mn("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), ft.reboot(), t && (await Lf(), kf(t)), Xt && Mn("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), Xt && Mn("error");
    }
  }
}
function Nf() {
  const e = /* @__PURE__ */ new Map();
  return ft && ft.all().forEach(function(n) {
    if (jo(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        jo(r, i.name, i.state, e);
      }
  }), e;
}
function jo(e, t, n, r) {
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
function kf(e) {
  ft && e.forEach(function(t, n) {
    const r = ft.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function Lf() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Df() {
  return typeof import.meta < "u" && !1;
}
function Of() {
  br = !0;
}
function Mf() {
  br = !1;
}
function If() {
  return br;
}
function Rf(e) {
  e.indicator !== void 0 && (Xt = e.indicator), e.preserveState !== void 0 && (fl = e.preserveState);
}
function Pf(e) {
  return Un.push(e), function() {
    const t = Un.indexOf(e);
    t !== -1 && Un.splice(t, 1);
  };
}
async function qf() {
  ft && await Af({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
const jf = {
  name: "livue:progress",
  install(e) {
    e.hook("request.started", function() {
      Kr() && la();
    }), e.hook("request.finished", function() {
      Kr() && mi();
    });
  }
}, Vf = {
  name: "livue:devtools",
  install(e, t, n) {
    za(n);
  }
}, zf = {
  name: "livue:debug",
  install(e, t) {
    t && t.enabled && dl();
  }
};
class Hf {
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
    Cs(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    wn(jf), wn(Vf), wn(zf), ac(this), wf(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), On(document.body, this._initComponent.bind(this)), is(this), this._startObserver(), Tf(this);
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
    }.bind(this)), On(document.body, this._initComponent.bind(this)), this._startObserver();
  }
  /**
   * Reboot but preserve certain components (don't destroy them).
   * Used during SPA navigation with @persist elements.
   */
  rebootPreserving() {
    document.querySelectorAll("[data-livue-id]").forEach(function(r) {
      this._isRoot(r) && this._initComponent(r);
    }.bind(this)), On(document.body, this._initComponent.bind(this));
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
    mn(t, !0, !1);
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
    rs(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return dr(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    hi();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return ys();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Kn;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: pt(),
      ...Ps()
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
    let r = new mc(t);
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
    return pa();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), Ui();
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
    }), Ui();
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
    }.bind(this)), On(t, this._initComponent.bind(this));
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
    return wn(t, n), this;
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
    return oc(t), this;
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
    return Hu;
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
      isAvailable: Df,
      isEnabled: If,
      enable: Of,
      disable: Mf,
      configure: Rf,
      onUpdate: Pf,
      trigger: qf
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
    return t ? dl() : Ef(), Io();
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return Io();
  }
}
const yr = new Hf();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = xl, document.head.appendChild(e);
}
var xe = window.LiVueConfig || {};
(xe.showProgressBar !== void 0 || xe.progressBarColor !== void 0 || xe.prefetch !== void 0 || xe.prefetchOnHover !== void 0 || xe.hoverDelay !== void 0 || xe.cachePages !== void 0 || xe.maxCacheSize !== void 0 || xe.restoreScroll !== void 0) && yr.configureNavigation(xe);
xe.showProgressOnRequest !== void 0 && yr.progress.configure({ showOnRequest: xe.showProgressOnRequest });
let Vo = !1;
function In() {
  Vo || (Vo = !0, yr.boot());
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", In, { once: !0 }) : document.readyState === "interactive" ? (document.addEventListener("DOMContentLoaded", In, { once: !0 }), window.addEventListener("load", In, { once: !0 })) : queueMicrotask(In);
window.LiVue = yr;
export {
  zf as DebugPlugin,
  Vf as DevtoolsPlugin,
  jf as ProgressPlugin,
  yr as default
};
//# sourceMappingURL=livue.esm.js.map
