import * as Vn from "vue";
import { reactive as _e, toRefs as Ri, effectScope as Vi, ref as Mt, markRaw as ji, hasInjectionContext as Mo, inject as Hi, isRef as vn, isReactive as qi, toRaw as Po, getCurrentScope as Ro, onScopeDispose as Vo, watch as Se, nextTick as On, computed as zi, provide as jo, onBeforeUnmount as Ho, onBeforeMount as qo, onUnmounted as Fi, onMounted as Wi, readonly as zo, watchEffect as Fo, shallowRef as Ar, defineComponent as Wo, h as jr, createApp as $o } from "vue";
const Bo = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function $i(e, t) {
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
function Hr(e) {
  return JSON.stringify(e, $i);
}
function ir(e) {
  return _e(Object.assign({}, e));
}
function Uo(e, t) {
  let n;
  for (n in t) {
    let r = Hr(e[n]), i = Hr(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function Bi(e) {
  return JSON.parse(JSON.stringify(e, $i));
}
function Jo(e) {
  return Ri(e);
}
function jn(e, t) {
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
function Ut(e, t, n) {
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
function Jt(e, t) {
  let n = {}, r = Bi(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function Xo(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function or(e) {
  if (Xo(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(or);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = or(e[n]);
    return t;
  }
  return e;
}
function lt(e) {
  let t = {};
  for (let n in e)
    t[n] = or(e[n]);
  return t;
}
let qr = 0;
function Yo() {
  return qr++, qr;
}
let Ui = /* @__PURE__ */ new Map();
function Ko(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function Go(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Ji(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    Ui.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: Ko(n)
    });
  });
}
function Xi(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = Ui.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Go(n, i.inputs));
  });
}
let Yi;
const xn = (e) => Yi = e, Ki = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function ar(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var At;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(At || (At = {}));
function Zo() {
  const e = Vi(!0), t = e.run(() => Mt({}));
  let n = [], r = [];
  const i = ji({
    install(o) {
      xn(i), i._a = o, o.provide(Ki, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const Gi = () => {
};
function zr(e, t, n, r = Gi) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && Ro() && Vo(i), i;
}
function Xe(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const Qo = (e) => e(), Fr = /* @__PURE__ */ Symbol(), Hn = /* @__PURE__ */ Symbol();
function lr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    ar(i) && ar(r) && e.hasOwnProperty(n) && !vn(r) && !qi(r) ? e[n] = lr(i, r) : e[n] = r;
  }
  return e;
}
const ea = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function ta(e) {
  return !ar(e) || !Object.prototype.hasOwnProperty.call(e, ea);
}
const { assign: Oe } = Object;
function na(e) {
  return !!(vn(e) && e.effect);
}
function ra(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const d = Ri(n.state.value[e]);
    return Oe(d, o, Object.keys(a || {}).reduce((c, h) => (c[h] = ji(zi(() => {
      xn(n);
      const v = n._s.get(e);
      return a[h].call(v, v);
    })), c), {}));
  }
  return s = Zi(e, u, t, n, r, !0), s;
}
function Zi(e, t, n = {}, r, i, o) {
  let a;
  const l = Oe({ actions: {} }, n), s = { deep: !0 };
  let u, d, c = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set(), v;
  const p = r.state.value[e];
  !o && !p && (r.state.value[e] = {}), Mt({});
  let m;
  function b(I) {
    let O;
    u = d = !1, typeof I == "function" ? (I(r.state.value[e]), O = {
      type: At.patchFunction,
      storeId: e,
      events: v
    }) : (lr(r.state.value[e], I), O = {
      type: At.patchObject,
      payload: I,
      storeId: e,
      events: v
    });
    const T = m = /* @__PURE__ */ Symbol();
    On().then(() => {
      m === T && (u = !0);
    }), d = !0, Xe(c, O, r.state.value[e]);
  }
  const E = o ? function() {
    const { state: O } = n, T = O ? O() : {};
    this.$patch((j) => {
      Oe(j, T);
    });
  } : (
    /* istanbul ignore next */
    Gi
  );
  function D() {
    a.stop(), c.clear(), h.clear(), r._s.delete(e);
  }
  const N = (I, O = "") => {
    if (Fr in I)
      return I[Hn] = O, I;
    const T = function() {
      xn(r);
      const j = Array.from(arguments), W = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set();
      function $(J) {
        W.add(J);
      }
      function ne(J) {
        X.add(J);
      }
      Xe(h, {
        args: j,
        name: T[Hn],
        store: S,
        after: $,
        onError: ne
      });
      let w;
      try {
        w = I.apply(this && this.$id === e ? this : S, j);
      } catch (J) {
        throw Xe(X, J), J;
      }
      return w instanceof Promise ? w.then((J) => (Xe(W, J), J)).catch((J) => (Xe(X, J), Promise.reject(J))) : (Xe(W, w), w);
    };
    return T[Fr] = !0, T[Hn] = O, T;
  }, L = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: zr.bind(null, h),
    $patch: b,
    $reset: E,
    $subscribe(I, O = {}) {
      const T = zr(c, I, O.detached, () => j()), j = a.run(() => Se(() => r.state.value[e], (W) => {
        (O.flush === "sync" ? d : u) && I({
          storeId: e,
          type: At.direct,
          events: v
        }, W);
      }, Oe({}, s, O)));
      return T;
    },
    $dispose: D
  }, S = _e(L);
  r._s.set(e, S);
  const M = (r._a && r._a.runWithContext || Qo)(() => r._e.run(() => (a = Vi()).run(() => t({ action: N }))));
  for (const I in M) {
    const O = M[I];
    if (vn(O) && !na(O) || qi(O))
      o || (p && ta(O) && (vn(O) ? O.value = p[I] : lr(O, p[I])), r.state.value[e][I] = O);
    else if (typeof O == "function") {
      const T = N(O, I);
      M[I] = T, l.actions[I] = O;
    }
  }
  return Oe(S, M), Oe(Po(S), M), Object.defineProperty(S, "$state", {
    get: () => r.state.value[e],
    set: (I) => {
      b((O) => {
        Oe(O, I);
      });
    }
  }), r._p.forEach((I) => {
    Oe(S, a.run(() => I({
      store: S,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), p && o && n.hydrate && n.hydrate(S.$state, p), u = !0, d = !0, S;
}
// @__NO_SIDE_EFFECTS__
function ia(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = Mo();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Hi(Ki, null) : null), a && xn(a), a = Yi, a._s.has(e) || (i ? Zi(e, t, r, a) : ra(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let Pt = /* @__PURE__ */ new Map();
function oa(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function yt(e, t, n) {
  return oa(n) === "global" ? t : e + ":" + t;
}
function Qi(e) {
  return JSON.parse(JSON.stringify(e));
}
function aa(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(Qi(t));
}
function Dr(e, t, n, r) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let i = yt(e, t, r), o = Pt.get(i);
  return o ? o.definition !== n && console.warn('[LiVue] store("' + i + '") is already registered. Reusing the first definition.') : (o = { useStore: /* @__PURE__ */ ia(i, n), definition: n }, Pt.set(i, o)), o.useStore();
}
function Ue(e, t, n) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
  let r = n && n.scope ? n.scope : "auto", i = [];
  r === "component" ? i.push(yt(e, t, { scope: "component" })) : r === "global" ? i.push(yt(e, t, { scope: "global" })) : (i.push(yt(e, t, { scope: "component" })), i.push(yt(e, t, { scope: "global" })));
  for (let o = 0; o < i.length; o++) {
    let a = Pt.get(i[o]);
    if (a)
      return a.useStore();
  }
  return null;
}
function la(e, t) {
  let n = {};
  if (!Array.isArray(t) || t.length === 0)
    return n;
  for (let r = 0; r < t.length; r++) {
    let i = t[r];
    if (!i || typeof i != "object" || typeof i.name != "string" || i.name.trim() === "") continue;
    let o = i.scope === "global" ? "global" : "component", a = lt(i.state || {}), l = Ue(e, i.name, { scope: o });
    if (l) {
      aa(l, a), n[i.name] = l;
      continue;
    }
    let s = {
      state: function() {
        return Qi(a);
      }
    }, u = Dr(e, i.name, s, { scope: o });
    n[i.name] = u;
  }
  return n;
}
function sa(e) {
  let t = e + ":", n = Array.from(Pt.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && Pt.delete(n[r]);
}
let eo = {
  ref: Mt,
  computed: zi,
  watch: Se,
  watchEffect: Fo,
  reactive: _e,
  readonly: zo,
  onMounted: Wi,
  onUnmounted: Fi,
  onBeforeMount: qo,
  onBeforeUnmount: Ho,
  nextTick: On,
  provide: jo,
  inject: Hi
}, sr = Object.keys(eo), ua = sr.map(function(e) {
  return eo[e];
});
function Wr(e) {
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
function ca(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(m) {
    return t[m];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(m) {
    return a[m];
  });
  function u(m) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(m);
  }
  function d(m, b, E) {
    let D = n && n.$id ? n.$id : "";
    if (b === void 0) {
      let N = Ue(D, m, E || {});
      if (N)
        return N;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return Dr(D, m, b, E);
  }
  function c(m) {
    let b = n && n.$id ? n.$id : "", E = Ue(b, m, { scope: "auto" });
    if (!E)
      throw new Error('[LiVue] useStore("' + m + '"): store not found.');
    return E;
  }
  let h = [], v = [];
  function p(m, b) {
    if (!u(m))
      return;
    let E = h.indexOf(m);
    if (E === -1) {
      h.push(m), v.push(b);
      return;
    }
    v[E] = b;
  }
  for (let m = 0; m < sr.length; m++)
    p(sr[m], ua[m]);
  for (let m = 0; m < i.length; m++)
    p(i[m], o[m]);
  for (let m = 0; m < l.length; m++)
    p(l[m], s[m]);
  p("livue", n), p("store", d), p("useStore", c);
  try {
    let b = new (Function.prototype.bind.apply(
      Function,
      [null].concat(h).concat([e])
    ))().apply(null, v);
    return b && typeof b == "object" ? b : null;
  } catch (m) {
    return console.error("[LiVue] Error executing @script setup code:", m), null;
  }
}
function $r(e) {
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
function Br(e) {
  return e.replace(/\$errors\b/g, "lvErrors");
}
function to(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      to(e.children[t]);
}
function ur(e, t, n, r, i, o) {
  let a = $r(e);
  a = Br(a);
  let l = Wr(a), s = Vn.compile(l.html), u = Ar(s), d = [], c = !1;
  function h(p, m) {
    let b = u.value;
    c = !0;
    let E;
    try {
      E = b(p, d);
    } finally {
      c = !1;
    }
    return to(E), E;
  }
  h._rc = !0;
  let v = {
    name: o || "LiVueComponent",
    render: h,
    setup: function() {
      Vn.provide("livue", n);
      let p = Jo(t);
      var m = new Proxy(n.errors, {
        get: function(L, S, k) {
          var M = Reflect.get(L, S, k);
          return Array.isArray(M) ? M[0] : M;
        }
      });
      let b = Object.assign({}, p, r, { livue: n, stores: n.stores, livueV: i, lvErrors: m });
      if (l.setupCode) {
        let L = ca(l.setupCode, p, n, r);
        L && Object.assign(b, L);
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
      }, D = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      function N(L) {
        return typeof L == "string" && !E[L] && D.test(L);
      }
      return new Proxy(b, {
        get: function(L, S, k) {
          if (S in L || typeof S == "symbol") return Reflect.get(L, S, k);
          if (N(S)) {
            var M = function() {
              var I = Array.prototype.slice.call(arguments);
              if (c) {
                var O = function() {
                  return n.call(S, ...I);
                };
                return Object.defineProperty(O, "__livueMethodName", {
                  value: S,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), Object.defineProperty(O, "__livueMethodArgs", {
                  value: I,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), O;
              }
              return n.call(S, ...I);
            };
            return Object.defineProperty(M, "__livueMethodName", {
              value: S,
              configurable: !1,
              enumerable: !1,
              writable: !1
            }), M;
          }
        },
        getOwnPropertyDescriptor: function(L, S) {
          var k = Object.getOwnPropertyDescriptor(L, S);
          if (k) return k;
          if (N(S))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(L, S) {
          return !!(S in L || N(S));
        },
        set: function(L, S, k) {
          return L[S] = k, !0;
        },
        ownKeys: function(L) {
          return Reflect.ownKeys(L);
        }
      });
    }
  };
  return v._updateRender = function(p) {
    let m = $r(p);
    m = Br(m);
    let b = Wr(m), E = Vn.compile(b.html);
    E !== u.value && (d.length = 0, u.value = E);
  }, v;
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
function fa() {
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
}, se = null, cr = null, pe = null, gn = !1, Dt = 0;
function da(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function pa(e) {
  return (-1 + e) * 100;
}
function no() {
  if (gn) return;
  gn = !0;
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
function ha() {
  if (pe) return;
  no(), pe = document.createElement("div"), pe.className = "livue-progress-bar livue-progress-hidden", pe.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(oe.parent) || document.body).appendChild(pe);
}
function ma() {
  if (!gn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), gn = !1, no());
}
function va(e) {
  Object.assign(oe, e), ma();
}
function Rt() {
  return oe.showOnRequest;
}
function ga() {
  Dt++, se === null && (ha(), se = 0, pe && pe.classList.remove("livue-progress-hidden"), Nn(oe.minimum), oe.trickle && (cr = setInterval(function() {
    ro();
  }, oe.trickleSpeed)));
}
function Nn(e) {
  se !== null && (e = da(e, oe.minimum, 1), se = e, pe && (pe.style.transform = "translate3d(" + pa(e) + "%, 0, 0)"));
}
function ro() {
  if (se === null || se >= 1) return;
  let e;
  se < 0.2 ? e = 0.1 : se < 0.5 ? e = 0.04 : se < 0.8 ? e = 0.02 : se < 0.99 ? e = 5e-3 : e = 0, Nn(se + e);
}
function io() {
  Dt = Math.max(0, Dt - 1), !(Dt > 0) && se !== null && (Nn(1), clearInterval(cr), cr = null, setTimeout(function() {
    pe && pe.classList.add("livue-progress-hidden"), setTimeout(function() {
      se = null, pe && (pe.style.transform = "translate3d(-100%, 0, 0)");
    }, oe.speed);
  }, oe.speed));
}
function ya() {
  Dt = 0, io();
}
function ba() {
  return se !== null;
}
function wa() {
  return se;
}
const je = {
  configure: va,
  start: ga,
  set: Nn,
  trickle: ro,
  done: io,
  forceDone: ya,
  isStarted: ba,
  getStatus: wa,
  isRequestProgressEnabled: Rt
};
var bt = null, Ur = !1, it = !1, ve = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ce = /* @__PURE__ */ new Map(), Be = /* @__PURE__ */ new Map(), fr = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new Map(), Pe = null;
function Sa(e) {
  Object.assign(ve, e), e.progressBarColor && je.configure({ color: e.progressBarColor });
}
function Ea(e) {
  bt = e, !Ur && (Ur = !0, Pe = oo(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Pe },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (ao(Pe), Pe = t.state.pageKey, Ht(t.state.url, !1, !0));
  }), Aa());
}
function oo() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function ao(e) {
  if (!(!ve.restoreScroll || !e)) {
    an.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = an.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, an.set(e, i);
      }
    });
  }
}
function _a(e) {
  if (!(!ve.restoreScroll || !e)) {
    var t = an.get(e);
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
function Aa() {
  document.addEventListener("click", Da, !0), ve.prefetch && (document.addEventListener("mouseenter", Ta, !0), document.addEventListener("mouseleave", La, !0), document.addEventListener("mousedown", ka, !0), document.addEventListener("focus", Oa, !0));
}
function Da(e) {
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
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), Ht(n, !0, !1));
      }
    }
  }
}
function Ca(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function Ta(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = Ca(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            In(r);
          }, ve.hoverDelay);
          fr.set(t, i);
        }
      }
    }
  }
}
function La(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = fr.get(t);
      n && (clearTimeout(n), fr.delete(t));
    }
  }
}
function ka(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || In(n);
    }
  }
}
function Oa(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ve.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || In(n);
    }
  }
}
function In(e) {
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
      return ve.cachePages && lo(t, i), i;
    }) : null;
  }).catch(function(r) {
    return Be.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return Be.set(t, n), n;
}
function lo(e, t) {
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
function xa() {
  Ce.clear();
}
function Cr(e) {
  it || !e || !e.url || (e.navigate ? Ht(e.url, !0, !1) : (it = !0, window.location.href = e.url));
}
async function Ht(e, t, n) {
  if (!it) {
    if (!bt) {
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
      it = !0, n || ao(Pe), ve.showProgressBar && je.start();
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
          o = await l.text(), ve.cachePages && lo(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(E) {
              typeof E == "function" && E(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = Na(), h = /* @__PURE__ */ new Set();
        c.forEach(function(E) {
          E.livueIds.forEach(function(D) {
            h.add(D);
          });
        }), bt._stopObserver(), bt.destroyExcept(h), c.forEach(function(E) {
          E.element.parentNode && E.element.parentNode.removeChild(E.element);
        });
        var v = u.querySelector("title");
        v && (document.title = v.textContent), document.body.innerHTML = u.body.innerHTML, Ia(c);
        var p = u.querySelector('meta[name="csrf-token"]'), m = document.querySelector('meta[name="csrf-token"]');
        if (p && m && (m.setAttribute("content", p.getAttribute("content")), fa()), Ma(u), Pa(u), t && (Pe = oo(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Pe },
          "",
          r
        )), Ra(u), bt.rebootPreserving(), n)
          _a(Pe);
        else if (location.hash) {
          var b = document.querySelector(location.hash);
          b ? b.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (E) {
        console.error("[LiVue] Navigation failed:", E), window.location.href = e;
      } finally {
        it = !1, ve.showProgressBar && je.done();
      }
    }
  }
}
function Na() {
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
function Ia(e) {
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
function Ma(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Pa(e) {
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
function Ra(e) {
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
function Va() {
  return it;
}
var Qe = /* @__PURE__ */ new Map(), ja = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Jr(e, t) {
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
function so() {
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
function Xr() {
  return ja.slice();
}
var dr = [], pr = [], Vt = !1;
function Ha(e) {
  return e.isolate ? za(e) : new Promise(function(t, n) {
    dr.push({
      payload: e,
      resolve: t,
      reject: n
    }), Vt || (Vt = !0, queueMicrotask(uo));
  });
}
function qa(e) {
  return new Promise(function(t, n) {
    pr.push({
      payload: e,
      resolve: t,
      reject: n
    }), Vt || (Vt = !0, queueMicrotask(uo));
  });
}
async function uo() {
  var e = dr, t = pr;
  if (dr = [], pr = [], Vt = !1, !(e.length === 0 && t.length === 0)) {
    Rt() && je.start();
    var n = co(), r = ct(), i = {
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
        for (var c = 0; c < e.length; c++)
          e[c].reject(d);
        for (var c = 0; c < t.length; c++)
          t[c].reject(d);
        return;
      }
      for (var h = u.responses || [], v = u.lazyResponses || [], c = 0; c < h.length; c++)
        if (h[c] && h[c].redirect) {
          Cr(h[c].redirect);
          return;
        }
      for (var c = 0; c < e.length; c++) {
        var p = h[c];
        if (!p) {
          e[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (p.error) {
          var m = new Error(p.error);
          m.status = p.status || 500, m.data = p, e[c].reject(m);
        } else if (p.errors) {
          var m = new Error("Validation failed");
          m.status = 422, m.data = p, e[c].reject(m);
        } else
          e[c].resolve(p);
      }
      for (var c = 0; c < t.length; c++) {
        var p = v[c];
        if (!p) {
          t[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (p.error) {
          var m = new Error(p.error);
          m.status = p.status || 500, m.data = p, t[c].reject(m);
        } else
          t[c].resolve(p);
      }
      me("request.finished", {
        url: n,
        success: !0,
        responses: h,
        lazyResponses: v,
        updateCount: e.length,
        lazyCount: t.length
      });
    } catch (b) {
      for (var c = 0; c < e.length; c++)
        e[c].reject(b);
      for (var c = 0; c < t.length; c++)
        t[c].reject(b);
      me("request.finished", {
        url: n,
        success: !1,
        error: b,
        updateCount: e.length,
        lazyCount: t.length
      });
    } finally {
      Rt() && je.done();
    }
  }
}
async function za(e) {
  Rt() && je.start();
  var t = co(), n = ct(), r = {
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
      return Cr(s.redirect), new Promise(function() {
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
    Rt() && je.done();
  }
}
function co() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function qn(e, t, n, r, i) {
  return Ha({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
let hr = null, fo = /* @__PURE__ */ new Map();
function Fa() {
  return _e({});
}
function be(e, t) {
  mr(e);
  for (let n in t)
    e[n] = t[n];
}
function mr(e) {
  for (let t in e)
    delete e[t];
}
function Wa(e) {
  hr = e;
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
  }), i ? !0 : (hr ? hr(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function $a(e, t) {
  typeof t == "function" && fo.set(e, t);
}
function vr(e) {
  fo.delete(e);
}
var po = [];
function x(e, t, n) {
  po.push({
    name: e,
    directive: t
  });
}
function Ba() {
  return po;
}
const Ve = /* @__PURE__ */ new Map(), He = /* @__PURE__ */ new Map();
let Yr = !1;
function ft() {
  return typeof window < "u" && window.Echo;
}
function Ua(e, t) {
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
function ho(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!ft())
    return Yr || (Yr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: c } = o, h = Ua(a, l);
    if (!h) continue;
    const v = l + ":" + a + ":" + s + ":" + e;
    if (He.has(v)) {
      r.push(v);
      continue;
    }
    const p = function(m) {
      try {
        n(u, m);
      } catch (b) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', b);
      }
    };
    if (l === "presence" && d)
      Ja(h, s, p);
    else {
      const m = c ? "." + s : s;
      h.listen(m, p);
    }
    He.set(v, {
      channel: h,
      channelKey: l + ":" + a,
      event: s,
      handler: p,
      isPresenceEvent: d,
      isCustomEvent: c
    }), r.push(v);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      mo(r[i]);
  };
}
function Ja(e, t, n) {
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
function mo(e) {
  const t = He.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    He.delete(e), Xa(t.channelKey);
  }
}
function Kr(e) {
  const t = ":" + e, n = [];
  He.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    mo(n[r]);
}
function Xa(e) {
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
function Gr() {
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
function Ya() {
  return {
    echoAvailable: ft(),
    channels: Array.from(Ve.keys()),
    subscriptions: Array.from(He.keys())
  };
}
function Ka() {
  {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
}
var Ie = /* @__PURE__ */ new Map();
function yn(e, t, n, r) {
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
function ln(e, t, n, r, i, o) {
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
function Zr(e) {
  Ie.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && Ie.delete(n);
  });
}
function Ga(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    ln(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function Za(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function Tr() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function Qa(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = Tr();
    s.open("POST", u, !0);
    var d = ct();
    d && s.setRequestHeader("X-CSRF-TOKEN", d), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var h = Math.round(c.loaded / c.total * 100);
        i(h);
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
        var h = new Error(c.error || c.message || "Upload failed");
        h.status = s.status, h.data = c, a(h);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function zn(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = Tr() + "-remove", n = ct();
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
function el(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(h) {
      s.append("files[]", h);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = Tr();
    u.open("POST", d, !0);
    var c = ct();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(h) {
      if (h.lengthComputable) {
        var v = Math.round(h.loaded / h.total * 100);
        i({ overall: v });
      }
    }), u.onload = function() {
      var h;
      try {
        h = JSON.parse(u.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (u.status >= 200 && u.status < 300)
        o({
          results: h.results || [],
          errors: h.errors || []
        });
      else {
        var v = new Error(h.error || h.message || "Upload failed");
        v.status = u.status, v.data = h, a(v);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(s);
  });
}
let Ct = /* @__PURE__ */ new Map(), Tt = /* @__PURE__ */ new Map();
function st(e, t) {
  let n = e + ":debounce:" + t;
  if (!Ct.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let c = i, h = o, v = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(h).catch(v);
        }, t);
      });
    };
    Ct.set(n, l);
  }
  return Ct.get(n);
}
function jt(e, t) {
  let n = e + ":throttle:" + t;
  if (!Tt.has(n)) {
    let r = 0, i = function(o) {
      let a = Date.now();
      return a - r < t ? Promise.resolve(null) : (r = a, Promise.resolve(o()));
    };
    Tt.set(n, i);
  }
  return Tt.get(n);
}
function Qr(e) {
  let t = e + ":";
  for (let n of Ct.keys())
    n.startsWith(t) && Ct.delete(n);
  for (let n of Tt.keys())
    n.startsWith(t) && Tt.delete(n);
}
const bn = "livue-tab-sync";
let Lr = Date.now() + "-" + Math.random().toString(36).substr(2, 9), wn = null, kr = /* @__PURE__ */ new Map(), ei = !1;
function vo() {
  ei || (ei = !0, typeof BroadcastChannel < "u" ? (wn = new BroadcastChannel(bn), wn.onmessage = tl) : window.addEventListener("storage", nl));
}
function tl(e) {
  let t = e.data;
  t.tabId !== Lr && go(t);
}
function nl(e) {
  if (e.key === bn && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === Lr) return;
      go(t);
    } catch {
    }
}
function go(e) {
  let t = kr.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function rl(e, t) {
  vo(), kr.set(e, t);
}
function ti(e) {
  kr.delete(e);
}
function il(e, t, n, r) {
  vo();
  let i = {
    tabId: Lr,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (wn)
    wn.postMessage(i);
  else
    try {
      localStorage.setItem(bn, JSON.stringify(i)), localStorage.removeItem(bn);
    } catch {
    }
}
function ol(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const Or = /* @__PURE__ */ new Map();
async function al(e, t = {}) {
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
      const { done: d, value: c } = await a.read();
      if (d)
        break;
      s += l.decode(c, { stream: !0 });
      const h = s.split(`
`);
      s = h.pop() || "";
      for (const v of h)
        if (v.trim())
          try {
            const p = JSON.parse(v);
            if (p.stream)
              ll(p.stream), n(p.stream);
            else {
              if (p.error)
                throw new Error(p.error);
              p.snapshot && (u = p);
            }
          } catch (p) {
            console.error("[LiVue Stream] Parse error:", p, v);
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
function ll(e) {
  const { to: t, content: n, replace: r } = e, i = Or.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function ni(e, t, n = !1) {
  Or.set(e, { el: t, replace: n });
}
function ri(e) {
  Or.delete(e);
}
function sl(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function xr(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    sl(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = xr(r) : t[n] = r;
  }
  return t;
}
function ul(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = xr(l), d = {};
    for (let c in s)
      d[c] = /* @__PURE__ */ (function(h, v) {
        return function() {
          let p = Array.prototype.slice.call(arguments);
          return t(h + "." + v, p);
        };
      })(a, c);
    i[a] = _e(Object.assign({}, u, d));
  }
  return i;
}
function cl(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = xr(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function fl(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function dl(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function gr(e, t, n, r, i, o, a) {
  a = a || {};
  let l = Fa(), s = n.name, u = n.vueMethods || {}, d = n.jsonMethods || [], c = n.confirms || {}, h = n.isolate || !1, v = n.urlParams || null, p = n.uploads || null, m = n.tabSync || null, b = !1, E = i, D = o, N = a.initialHtml || null, L = _e({}), S = [];
  function k() {
    for (let f = 0; f < S.length; f++)
      try {
        S[f]();
      } catch {
      }
    S = [];
  }
  function M(f) {
    if (k(), !!Array.isArray(f))
      for (let y = 0; y < f.length; y++) {
        let A = f[y];
        if (!A || typeof A != "object" || !A.bridge || typeof A.bridge != "object") continue;
        let C = Ue(e, A.name, { scope: A.scope || "auto" });
        if (!C) continue;
        let g = A.bridge;
        for (let H in g) {
          let B = g[H];
          if (!B || typeof B != "object") continue;
          let Z = B.prop, U = B.mode || "two-way";
          if (!(!Z || !(Z in t))) {
            if (U === "two-way" || U === "store-to-state") {
              let K = Se(function() {
                return C[H];
              }, function(qe) {
                t[Z] !== qe && (t[Z] = qe);
              });
              S.push(K);
            }
            if (U === "two-way" || U === "state-to-store") {
              let K = Se(function() {
                return t[Z];
              }, function(qe) {
                C[H] !== qe && (C[H] = qe);
              });
              S.push(K);
            }
          }
        }
      }
  }
  function I(f) {
    let y = la(e, f);
    for (let A in y)
      L[A] = y[A];
    M(f);
  }
  I(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    k(), sa(e);
  });
  function O(f) {
    let y = document.querySelector('meta[name="livue-prefix"]'), C = "/" + (y ? y.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), g = document.createElement("a");
    g.href = C, g.download = f.name, g.style.display = "none", document.body.appendChild(g), g.click(), document.body.removeChild(g);
  }
  function T() {
    let f = Jt(E, t);
    return {
      snapshot: D,
      diffs: f
    };
  }
  function j(f, y) {
    if (f.redirect) {
      Cr(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let g = f.errorBoundary;
      w.errorState.hasError = g.hasError, w.errorState.errorMessage = g.errorMessage, w.errorState.errorDetails = g.errorDetails, w.errorState.recover = g.recover, (!g.errorHandled || !g.recover) && me("error.occurred", {
        error: new Error(g.errorMessage || "Component error"),
        componentName: s,
        componentId: e,
        context: { method: g.errorMethod, serverHandled: g.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && O(f.download), f.snapshot) {
      let g = JSON.parse(f.snapshot);
      if (g.state) {
        let H = lt(g.state);
        Uo(t, H), E = JSON.parse(JSON.stringify(H));
      }
      D = f.snapshot, g.memo && (g.memo.errors ? be(w.errors, g.memo.errors) : mr(w.errors), g.memo.vueMethods && (u = g.memo.vueMethods), g.memo.jsonMethods && (d = g.memo.jsonMethods), g.memo.urlParams && (v = g.memo.urlParams), g.memo.uploads && (p = g.memo.uploads), g.memo.confirms && (c = g.memo.confirms), (g.memo.composables || g.memo.composableActions) && cl($, g.memo), g.memo.stores && I(g.memo.stores));
    }
    if (v && Za(v, t), (f.html || f.fragments) && r && r._updateTemplate) {
      let g = {};
      if (f.snapshot) {
        let H = JSON.parse(f.snapshot);
        H.memo && (H.memo.transitionType && (g.transitionType = H.memo.transitionType), H.memo.skipTransition && (g.skipTransition = !0));
      }
      if (f.fragments) {
        let H = N || (a.el ? a.el.innerHTML : null);
        if (H) {
          let B = dl(H, f.fragments);
          N = B, r._updateTemplate(B, g);
        }
      } else
        N = f.html, r._updateTemplate(f.html, g);
    }
    if (f.events && f.events.length > 0) {
      for (var A = 0; A < f.events.length; A++)
        f.events[A].sourceId = e;
      Ga(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var C = 0; C < f.js.length; C++)
        try {
          new Function("state", "livue", f.js[C])(t, w);
        } catch (g) {
          console.error("[LiVue] Error executing ->vue() JS:", g);
        }
    if (f.benchmark && me("benchmark.received", {
      componentId: e,
      componentName: s,
      timings: f.benchmark
    }), m && m.enabled && f.snapshot && !b && JSON.parse(f.snapshot).state) {
      let H = Bi(t), B = [];
      for (let Z in H)
        (!y || !(Z in y)) && B.push(Z);
      if (B.length > 0) {
        let Z = ol(H, B, m);
        Object.keys(Z).length > 0 && il(s, Z, B, m);
      }
    }
    if (b = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let W = _e({}), X = {}, $ = {}, ne = function(f, y) {
    return w.call(f, y);
  };
  fl(n) && ($ = ul(n, ne));
  let w = _e({
    loading: !1,
    processing: null,
    errors: l,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: W,
    refs: {},
    stores: L,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let y = Jt(E, t);
      return f === void 0 ? Object.keys(y).length > 0 : f in y;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = Jt(E, t);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(E)) : E[f] !== void 0 ? JSON.parse(JSON.stringify(E[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in E && (t[f] = JSON.parse(JSON.stringify(E[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in E)
        f in t && (t[f] = JSON.parse(JSON.stringify(E[f])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(f) {
      return f ? W[f] || !1 : w.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let y = f ? W[f] || !1 : w.loading;
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
    call: async function(f, y, A) {
      let C, g = null;
      if (arguments.length === 1 ? C = [] : arguments.length === 2 ? Array.isArray(y) ? C = y : C = [y] : arguments.length >= 3 && (Array.isArray(y) && A && typeof A == "object" && (A.debounce || A.throttle) ? (C = y, g = A) : C = Array.prototype.slice.call(arguments, 1)), X[f])
        return X[f](w, C);
      if (u[f]) {
        try {
          new Function("state", "livue", u[f])(t, w);
        } catch (Z) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', Z);
        }
        return;
      }
      let H = d.includes(f), B = async function() {
        if (c[f] && !await w._showConfirm(c[f]))
          return;
        w.loading = !0, w.processing = f, W[f] = !0;
        let Z;
        try {
          let U = T(), K = await qn(U.snapshot, f, C, U.diffs, h || H);
          Z = j(K, U.diffs);
        } catch (U) {
          if (H)
            throw { status: U.status, errors: U.data && U.data.errors, message: U.message };
          U.status === 422 && U.data && U.data.errors ? be(w.errors, U.data.errors) : Ye(U, s);
        } finally {
          w.loading = !1, w.processing = null, delete W[f];
        }
        return Z;
      };
      return g && g.debounce ? st(e + ":" + f, g.debounce)(B) : g && g.throttle ? jt(e + ":" + f, g.throttle)(B) : B();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, y) {
      let A = Array.prototype.slice.call(arguments, 2), C = { message: y || "Are you sure?" };
      if (await w._showConfirm(C))
        return w.call.apply(w, [f].concat(A));
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
      t[f] = y;
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
    store: function(f, y, A) {
      if (y === void 0) {
        let C = Ue(e, f, A || { scope: "auto" });
        if (C)
          return C;
        throw new Error('[LiVue] store("' + f + '"): store not found. Provide a definition or register it in PHP.');
      }
      return Dr(e, f, y, A);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(f) {
      let y = Ue(e, f, { scope: "auto" });
      if (y)
        return L[f] = y, y;
      throw new Error('[LiVue] useStore("' + f + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(f) {
      let y = Ue(e, f, { scope: "global" });
      if (y)
        return L[f] = y, y;
      throw new Error('[LiVue] useGlobalStore("' + f + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      w.loading = !0, w.processing = "$sync";
      try {
        let f = T(), y = await qn(f.snapshot, null, [], f.diffs, h);
        j(y, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? be(w.errors, f.data.errors) : Ye(f, s);
      } finally {
        w.loading = !1, w.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      mr(w.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, y) {
      ln(f, y, "broadcast", s, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, y, A) {
      ln(y, A, "to", s, e, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, y) {
      ln(f, y, "self", s, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      Ht(f, !0);
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
      if (!p || !p[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var A = jn(t, f);
      A && A.__livue_upload && A.ref && zn([A.ref]), w.uploading = !0, w.uploadProgress = 0;
      try {
        var C = await Qa(y, s, f, p[f].token, function(g) {
          w.uploadProgress = g;
        });
        Ut(t, f, {
          __livue_upload: !0,
          ref: C.ref,
          originalName: C.originalName,
          mimeType: C.mimeType,
          size: C.size,
          previewUrl: C.previewUrl
        });
      } catch (g) {
        g.status === 422 && g.data && g.data.errors ? be(w.errors, g.data.errors) : Ye(g, s);
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
      if (!p || !p[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      w.uploading = !0, w.uploadProgress = 0;
      try {
        var A = await el(y, s, f, p[f].token, function(K) {
          w.uploadProgress = K.overall;
        }), C = A.results || [], g = A.errors || [], H = jn(t, f), B = Array.isArray(H) ? H : [];
        if (C.length > 0) {
          var Z = C.map(function(K) {
            return {
              __livue_upload: !0,
              ref: K.ref,
              originalName: K.originalName,
              mimeType: K.mimeType,
              size: K.size,
              previewUrl: K.previewUrl
            };
          });
          Ut(t, f, B.concat(Z));
        }
        if (g.length > 0) {
          var U = {};
          g.forEach(function(K) {
            var qe = f + "." + K.index;
            U[qe] = {
              file: K.file,
              message: K.error
            };
          }), be(w.errors, U);
        }
      } catch (K) {
        K.status === 422 && K.data && K.data.errors ? be(w.errors, K.data.errors) : Ye(K, s);
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
      var A = jn(t, f);
      if (y !== void 0 && Array.isArray(A)) {
        var C = A[y];
        C && C.__livue_upload && C.ref && zn([C.ref]), A.splice(y, 1), Ut(t, f, A.slice());
      } else
        A && A.__livue_upload && A.ref && zn([A.ref]), Ut(t, f, null);
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
      y = y || [], w.loading = !0, w.streaming = !0, w.processing = f, w.streamingMethod = f, W[f] = !0;
      let A;
      try {
        let C = T();
        C.method = f, C.params = y, C.componentId = e;
        let g = await al(C, {
          onChunk: function(H) {
          },
          onComplete: function(H) {
          },
          onError: function(H) {
            console.error("[LiVue Stream] Error:", H);
          }
        });
        g && (A = j(g, C.diffs));
      } catch (C) {
        C.status === 422 && C.data && C.data.errors ? be(w.errors, C.data.errors) : Ye(C, s);
      } finally {
        w.loading = !1, w.streaming = !1, w.processing = null, w.streamingMethod = null, delete W[f];
      }
      return A;
    },
    /**
     * Toggle a boolean property.
     * @param {string} property - Property name to toggle
     */
    toggle: function(f) {
      f in t && (t[f] = !t[f]);
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
      }) : Se(
        function() {
          return t[f];
        },
        function(A, C) {
          y(A, C);
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
      return s;
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
      }) : ($a(e, f), function() {
        vr(e);
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
    _updateServerState: function(f, y) {
      E = JSON.parse(JSON.stringify(f)), D = y;
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
      let f = Jt(E, t), y = {};
      for (let A in $) {
        let C = $[A], g = {}, H = [];
        for (let B in C)
          if (typeof C[B] == "function")
            H.push(B);
          else
            try {
              g[B] = JSON.parse(JSON.stringify(C[B]));
            } catch {
              g[B] = "[Unserializable]";
            }
        y[A] = { data: g, actions: H };
      }
      return {
        serverState: JSON.parse(JSON.stringify(E)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: s,
          isolate: h,
          urlParams: v,
          tabSync: m,
          hasUploads: !!p,
          uploadProps: p ? Object.keys(p) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(c),
          composableNames: Object.keys($)
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
  for (let f in $)
    w[f] = $[f];
  async function J() {
    w.loading = !0, w.processing = "$refresh", W.$refresh = !0;
    try {
      let f = T(), y = await qn(f.snapshot, null, [], f.diffs, h);
      return j(y, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? be(w.errors, f.data.errors) : Ye(f, s);
    } finally {
      w.loading = !1, w.processing = null, delete W.$refresh;
    }
  }
  X.$refresh = function() {
    return J();
  }, m && m.enabled && rl(s, function(f, y, A) {
    let C = !1;
    if (A.reactive === !0)
      C = !0;
    else if (Array.isArray(A.reactive) && A.reactive.length > 0) {
      for (let g in f)
        if (A.reactive.includes(g)) {
          C = !0;
          break;
        }
    }
    if (C) {
      for (let g in f)
        A.only && !A.only.includes(g) || A.except && A.except.includes(g) || g in t && (t[g] = f[g]);
      b = !0, w.sync();
      return;
    }
    for (let g in f)
      A.only && !A.only.includes(g) || A.except && A.except.includes(g) || g in t && (t[g] = f[g]);
    for (let g in f)
      A.only && !A.only.includes(g) || A.except && A.except.includes(g) || (E[g] = JSON.parse(JSON.stringify(f[g])));
  });
  var re = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(w, {
    get: function(f, y, A) {
      if (y in f || typeof y == "symbol")
        return Reflect.get(f, y, A);
      if (typeof y == "string" && y.startsWith("$") && X[y])
        return function() {
          var C = Array.prototype.slice.call(arguments);
          return X[y](w, C);
        };
      if (typeof y == "string" && !y.startsWith("$") && !re[y])
        return function() {
          var C = Array.prototype.slice.call(arguments);
          return w.call(y, ...C);
        };
    },
    set: function(f, y, A, C) {
      return Reflect.set(f, y, A, C);
    },
    has: function(f, y) {
      return typeof y == "string" && y.startsWith("$") && X[y] ? !0 : Reflect.has(f, y);
    }
  }), composables: $ };
}
function Sn(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
function sn(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", c = JSON.parse(d), h = c.memo ? c.memo.name : "", v = lt(c.state || {}), p = c.memo || {}, m = s.innerHTML, b = s.tagName.toLowerCase(), E = s.nextElementSibling;
    for (; E; ) {
      let T = E.nextElementSibling;
      if (E.tagName === "SCRIPT" && E.getAttribute("type") === "application/livue-setup")
        m += E.outerHTML, E.parentNode.removeChild(E);
      else
        break;
      E = T;
    }
    let D = t._childRegistry[u];
    if (!D)
      for (let T in t._childRegistry) {
        let j = t._childRegistry[T];
        if (j.name === h && !o[T]) {
          D = j;
          break;
        }
      }
    if (D) {
      o[D.id] = !0, D.rootTag = b;
      let T = p.reactive || [];
      if (T.length > 0) {
        for (var N = 0; N < T.length; N++) {
          var L = T[N];
          L in v && (D.state[L] = v[L]);
        }
        D.livue._updateServerState(v, d), D.componentRef && D.componentRef._updateTemplate && D.componentRef._updateTemplate(m);
      }
    }
    let S = !D;
    if (!D) {
      let j = "livue-child-" + Yo();
      t._versions[j] = 0;
      let W = ir(v), X = JSON.parse(JSON.stringify(v)), $ = Object.assign({ name: p.name || h }, p), ne = { _updateTemplate: null }, w = so(), J = gr(u, W, $, ne, X, d, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: w
      }), re = J.livue, Bt = J.composables;
      me("component.init", {
        component: { id: u, name: h, state: W, livue: re },
        el: s,
        cleanup: w.cleanup,
        isChild: !0
      });
      let f = p.errors || null;
      f && be(re.errors, f), D = {
        tagName: j,
        state: W,
        memo: $,
        livue: re,
        composables: Bt,
        componentRef: ne,
        name: h,
        id: u,
        rootTag: b
      };
      let y = p.listeners || null;
      if (y)
        for (let C in y)
          (function(g, H) {
            yn(C, h, u, function(B) {
              H.call(g, B);
            });
          })(y[C], re);
      let A = p.echo || null;
      A && A.length && (function(C, g) {
        ho(C, A, function(H, B) {
          g.call(H, B);
        });
      })(u, re), ne._updateTemplate = function(C) {
        let g = t.el.querySelector('[data-livue-id="' + u + '"]');
        g && Ji(g);
        let H = sn(C, t), B = Sn(
          "<" + D.rootTag + ">" + H.template + "</" + D.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let U in H.childDefs)
          t.vueApp._context.components[U] || t.vueApp.component(U, H.childDefs[U]);
        t.vueApp._context.components[D.tagName]._updateRender(B), On(function() {
          let U = t.el.querySelector('[data-livue-id="' + u + '"]');
          U && Xi(U);
        });
      }, t._childRegistry[u] = D;
    }
    let k = D.tagName, M = s.dataset.livueRef;
    M && t._rootLivue && (t._rootLivue.refs[M] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(T, j) {
        return D.livue.call(T, j || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(T, j) {
        return D.livue.set(T, j);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(T, j) {
        return D.livue.dispatch(T, j);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return D.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return D.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return D.livue;
      }
    });
    let I = s.dataset.livueModel;
    if (I && t._rootState && yn("$modelUpdate", D.name, u, function(T) {
      T && T.value !== void 0 && (t._rootState[I] = T.value);
    }), S) {
      let T = Sn(
        "<" + b + ">" + m + "</" + b + ">",
        'data-livue-id="' + u + '"'
      );
      i[k] = ur(
        T,
        D.state,
        D.livue,
        D.composables || {},
        t._versions,
        D.name
      );
    }
    t._versions[k] === void 0 && (t._versions[k] = 0);
    let O = document.createElement(k);
    O.setAttribute(":key", "livueV['" + k + "']"), s.parentNode.replaceChild(O, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let ii = 0;
function yr() {
  return typeof document < "u" && "startViewTransition" in document;
}
const Fn = /* @__PURE__ */ new WeakMap();
function oi() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const pl = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (ii++, r = "livue-transition-" + ii), Fn.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), yr() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    oi();
  },
  updated(e, t) {
    let n = Fn.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), yr() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    Fn.delete(e), e.removeAttribute("data-livue-transition"), oi();
  }
};
function hl(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function ml(e) {
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
function vl(e, t) {
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
let Wn = 0;
function gl(e) {
  return Wo({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = Mt(!1), i = Ar(null), o = null, a = Mt(null);
      async function l() {
        if (!r.value)
          try {
            let u = await qa({
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
        Wn++;
        let c = "lazy-" + Wn + "-" + Date.now(), h = d.memo ? d.memo.name : "", v = lt(d.state || {}), p = d.memo || {}, { createLivueHelper: m, buildComponentDef: b, processTemplate: E, createReactiveState: D } = e._lazyHelpers, N = D(v), L = JSON.parse(JSON.stringify(v)), S = { _updateTemplate: null }, k = m(
          c,
          N,
          p,
          S,
          L,
          u.snapshot
        ), M = k.livue, I = k.composables;
        p.errors && be(M.errors, p.errors);
        let O = "livue-lazy-child-" + Wn, T = E(u.html, e), j = Sn(
          T.template,
          'data-livue-id="' + c + '"'
        ), W = b(
          j,
          N,
          M,
          I,
          e._versions,
          h
        );
        e._childRegistry[c] = {
          tagName: O,
          state: N,
          memo: p,
          livue: M,
          componentRef: S,
          name: h,
          id: c
        }, S._updateTemplate = function($) {
          let ne = E($, e), w = Sn(
            ne.template,
            'data-livue-id="' + c + '"'
          );
          for (let re in ne.childDefs)
            e.vueApp._context.components[re] || e.vueApp.component(re, ne.childDefs[re]);
          let J = b(
            w,
            N,
            M,
            I,
            e._versions,
            h
          );
          e.vueApp._context.components[O] = J, e._versions[O] = (e._versions[O] || 0) + 1, i.value = J;
        };
        let X = p.listeners || null;
        if (X)
          for (let $ in X)
            (function(ne, w) {
              yn($, h, c, function(J) {
                w.call(ne, J);
              });
            })(X[$], M);
        for (let $ in T.childDefs)
          e.vueApp._context.components[$] || e.vueApp.component($, T.childDefs[$]);
        e._versions[O] = 0, e.vueApp._context.components[O] || e.vueApp.component(O, W), i.value = W, r.value = !0;
      }
      return Wi(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Fi(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? jr(i.value) : jr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class yl {
  /**
   * @param {HTMLElement} el - The root/island wrapper element
   */
  constructor(t) {
    this.el = t, this.componentId = t.dataset.livueId;
    let n = t.dataset.livueSnapshot || "{}", r = JSON.parse(n);
    this.name = r.memo ? r.memo.name : "", this.state = ir(lt(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = _e({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._lazyHelpers = {
      createLivueHelper: gr,
      buildComponentDef: ur,
      processTemplate: sn,
      createReactiveState: ir
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
        var E = ml(r.el);
        Ji(r.el);
        let D = sn(m, r);
        if (!r.vueApp) return;
        for (let L in D.childDefs)
          r.vueApp._context.components[L] || r.vueApp.component(L, D.childDefs[L]);
        function N() {
          r._currentRootDef._updateRender(D.template), On(function() {
            Xi(r.el), vl(r.el, E), me("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (b.skipTransition) {
          N();
          return;
        }
        yr() ? hl(N, { type: b.transitionType }) : N();
      }
    }, o = JSON.parse(JSON.stringify(lt(t.state || {})));
    this._cleanups = so();
    let a = gr(this.componentId, this.state, this.memo, i, o, n, {
      el: this.el,
      rootComponent: this,
      isChild: !1,
      parentLivue: null,
      cleanups: this._cleanups,
      initialHtml: this.el.innerHTML
    }), l = a.livue, s = a.composables;
    this._rootLivue = l, this._rootComposables = s, this._rootState = this.state, me("component.init", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: l },
      el: this.el,
      cleanup: this._cleanups.cleanup,
      isChild: !1
    });
    let u = sn(this.el.innerHTML, this), d = t.memo && t.memo.errors || null;
    d && be(l.errors, d);
    let c = t.memo && t.memo.listeners || null;
    if (c)
      for (let m in c)
        (function(b, E, D, N) {
          yn(m, D, N, function(L) {
            E.call(b, L);
          });
        })(c[m], l, r.name, r.componentId);
    let h = t.memo && t.memo.echo || null;
    h && h.length && (this._echoUnsubscribe = ho(r.componentId, h, function(m, b) {
      l.call(m, b);
    }));
    let v = ur(u.template, r.state, l, s, r._versions, r.name);
    this._currentRootDef = v, this._rootDefRef = Ar(v), this.vueApp = $o({
      setup: function() {
        return {
          rootDef: r._rootDefRef
        };
      },
      template: '<component :is="rootDef"></component>'
    });
    let p;
    for (p in u.childDefs)
      this.vueApp._context.components[p] || this.vueApp.component(p, u.childDefs[p]);
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", gl(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = Zo();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = Ba();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Zr(t), Qr(t), vr(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && ti(n.name), Kr(t);
    }
    if (me("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Zr(this.componentId), Qr(this.componentId), vr(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && ti(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Kr(this.componentId), this.vueApp) {
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
let ai = /* @__PURE__ */ new Set();
const bl = {
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
    ai.has(u) || (ai.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, $n = /* @__PURE__ */ new WeakMap(), wl = {
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
    e.addEventListener("submit", l), $n.set(e, l);
  },
  unmounted(e) {
    let t = $n.get(e);
    t && (e.removeEventListener("submit", t), $n.delete(e));
  }
}, Xt = /* @__PURE__ */ new WeakMap(), Sl = {
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
      let p = parseInt(s, 10);
      isNaN(p) || (d = p + "px");
    }
    let c = l.leave === !0, h = !1, v = new IntersectionObserver(
      function(p) {
        let m = p[0];
        (c ? !m.isIntersecting : m.isIntersecting) && (!l.once || !h) && (h = !0, r.call(o, a), l.once && (v.disconnect(), Xt.delete(e)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    v.observe(e), Xt.set(e, v);
  },
  unmounted(e) {
    let t = Xt.get(e);
    t && (t.disconnect(), Xt.delete(e));
  }
};
var En = /* @__PURE__ */ new Set(), tt = /* @__PURE__ */ new WeakMap(), li = !1;
function ot(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function El(e, t) {
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
function br(e) {
  var t = tt.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = El(n, i);
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
function si() {
  En.forEach(function(e) {
    e.isConnected ? br(e) : (En.delete(e), tt.delete(e));
  });
}
function _l() {
  li || (li = !0, window.addEventListener("popstate", si), window.addEventListener("livue:navigated", si));
}
const Al = {
  mounted(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), En.add(e), _l(), br(e);
  },
  updated(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), br(e);
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
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), En.delete(e), tt.delete(e);
  }
};
let ui = 0;
const Dl = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    ui++;
    let n = "livue-ignore-" + ui;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, dt = /* @__PURE__ */ new WeakMap();
let ci = 0;
function Cl(e) {
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
function Tl(e) {
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
function Yt(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function fi(e, t) {
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
function Ll(e) {
  return !!e.component;
}
const kl = {
  mounted(e, t, n) {
    let r = Cl(n);
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
    ci++;
    let s = "model-" + ci, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = Tl(l);
    l.live && !d && !c && (d = 150);
    function h(S) {
      if (l.number) {
        let k = Number(S);
        S = isNaN(k) ? 0 : k;
      }
      l.boolean && (S = !!S && S !== "false" && S !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = S : o[a] = S;
    }
    function v(S) {
      d > 0 ? st(s, d)(function() {
        h(S);
      }) : c > 0 ? jt(s, c)(function() {
        h(S);
      }) : h(S);
    }
    let p;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? p = o[a].value : p = o[a];
    let m = Ll(n), b = n.component, E = null, D = null, N = null, L = null;
    if (m && b)
      L = b.emit, b.emit = function(S, ...k) {
        if (S === "update:modelValue") {
          let M = k[0];
          v(M);
          return;
        }
        return L.call(b, S, ...k);
      }, b.props && "modelValue" in b.props && (N = Se(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(S) {
          b.vnode && b.vnode.props && (b.vnode.props.modelValue = S), b.exposed && typeof b.exposed.setValue == "function" && b.exposed.setValue(S), b.update && b.update();
        },
        { immediate: !0 }
      )), dt.set(e, {
        isComponent: !0,
        componentInstance: b,
        originalEmit: L,
        stopWatcher: N,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let S = st(s, d);
        E = function(k) {
          let M = Yt(k.target);
          S(function() {
            h(M);
          });
        };
      } else if (c > 0) {
        let S = jt(s, c);
        E = function(k) {
          let M = Yt(k.target);
          S(function() {
            h(M);
          });
        };
      } else
        E = function(S) {
          h(Yt(S.target));
        };
      l.enter ? (D = function(S) {
        S.key === "Enter" && h(Yt(S.target));
      }, e.addEventListener("keyup", D)) : e.addEventListener(u, E), fi(e, p), dt.set(e, {
        isComponent: !1,
        handler: E,
        keyHandler: D,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(e, t, n) {
    let r = dt.get(e);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], fi(e, a);
    }
  },
  unmounted(e) {
    let t = dt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), dt.delete(e));
  }
}, Bn = /* @__PURE__ */ new WeakMap(), Ol = 2500;
function xl(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Ol;
}
const Nl = {
  mounted(e, t, n) {
    let r = Ee(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = xl(l), u = l["keep-alive"] === !0, d = l.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function h() {
      c.isPaused || d && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function v() {
      c.intervalId || (c.intervalId = setInterval(h, s));
    }
    function p() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(m) {
        c.isVisible = m[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(e)), document.addEventListener("visibilitychange", p), c.visibilityHandler = p, v(), Bn.set(e, c);
  },
  unmounted(e) {
    let t = Bn.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), Bn.delete(e));
  }
}, Kt = /* @__PURE__ */ new WeakMap();
let _n = typeof navigator < "u" ? navigator.onLine : !0, An = /* @__PURE__ */ new Set(), di = !1;
function Il() {
  di || typeof window > "u" || (di = !0, window.addEventListener("online", function() {
    _n = !0, An.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    _n = !1, An.forEach(function(e) {
      e(!1);
    });
  }));
}
const Ml = {
  created(e, t) {
    Il();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", _n && (e.style.display = "none")), Kt.set(e, o);
  },
  mounted(e, t) {
    let n = Kt.get(e);
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
    r(_n), n.updateFn = r, An.add(r);
  },
  unmounted(e) {
    let t = Kt.get(e);
    t && t.updateFn && An.delete(t.updateFn), Kt.delete(e);
  }
};
let pi = 0;
const pt = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new Map(), Pl = {
  created(e, t) {
    pi++;
    let n = "livue-replace-" + pi, r = t.modifiers.self === !0;
    pt.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Un.set(n, 0);
  },
  mounted(e, t) {
    let n = pt.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = pt.get(e);
    n && (n.version++, Un.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = pt.get(e);
    t && Un.delete(t.id), pt.delete(e);
  }
}, ht = /* @__PURE__ */ new WeakMap(), hi = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Rl = 200;
function Vl(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(hi))
    if (e[t])
      return hi[t];
  return Rl;
}
function Jn(e, t, n, r, i) {
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
const jl = {
  created(e, t) {
    let n = e.style.display;
    ht.set(e, {
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
    let i = ht.get(e), o = t.modifiers || {}, a = Vl(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Jn(e, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, Jn(e, i, o, u, !0)) : (i.isActive = !1, Jn(e, i, o, u, !1));
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
    ht.get(e);
  },
  unmounted(e) {
    let t = ht.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), ht.delete(e));
  }
}, Gt = /* @__PURE__ */ new WeakMap(), Hl = {
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
    Gt.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = Gt.get(e), i = Ee(n);
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
    let t = Gt.get(e);
    t && (t.stopWatch && t.stopWatch(), Gt.delete(e));
  }
}, mt = /* @__PURE__ */ new WeakMap(), ql = {
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
    mt.set(e, { targetId: n }), ni(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = mt.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      ri(n.targetId);
      const i = t.modifiers.replace || !1;
      ni(r, e, i), mt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = mt.get(e);
    t && (ri(t.targetId), mt.delete(e));
  }
}, mi = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, vi = ["ctrl", "alt", "shift", "meta"];
let gi = 0;
const yi = /* @__PURE__ */ new Set();
function zl(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function Fl(e, t) {
  for (let i = 0; i < vi.length; i++) {
    let o = vi[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in mi)
    t[i] && (n = !0, e.key === mi[i] && (r = !0));
  return !(n && !r);
}
function F(e, t = {}) {
  let n = t.supportsOutside === !0, r = t.isKeyboardEvent === !0, i = t.allowArg !== !1;
  const o = /* @__PURE__ */ new WeakMap();
  return {
    mounted(a, l, s) {
      const { arg: u, modifiers: d } = l, c = Ee(s);
      if (!c) {
        console.warn("[LiVue] v-" + e + ": livue helper not found in component context");
        return;
      }
      if (u && !i) {
        const k = "v-" + e;
        yi.has(k) || (console.warn(
          "[LiVue] " + k + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), yi.add(k));
      }
      gi++;
      const h = "v-" + e + "-" + gi, v = zl(d);
      let p = null, m = null;
      d.debounce && (p = st(h, v)), d.throttle && (m = jt(h, v));
      let b = !1, E = null;
      i && u && (E = u);
      const D = function(k) {
        let M = E, I = [];
        if (i && u) {
          M = u;
          const T = l.value;
          T != null && (I = Array.isArray(T) ? T : [T]);
        } else {
          const T = l.value;
          if (typeof T == "function")
            if (typeof T.__livueMethodName == "string")
              M = T.__livueMethodName, Array.isArray(T.__livueMethodArgs) && (I = T.__livueMethodArgs.slice());
            else {
              const j = function() {
                T();
              };
              p ? p(j) : m ? m(j) : j();
              return;
            }
          else typeof T == "string" ? M = T : Array.isArray(T) && T.length > 0 && (M = T[0], I = T.slice(1));
        }
        if (!M) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const O = function() {
          d.confirm ? c.callWithConfirm(M, "Are you sure?", ...I) : c.call(M, ...I);
        };
        p ? p(O) : m ? m(O) : O();
      }, N = function(k) {
        if (!(d.self && k.target !== a) && !(r && !Fl(k, d))) {
          if (d.once) {
            if (b)
              return;
            b = !0;
          }
          d.prevent && k.preventDefault(), d.stop && k.stopPropagation(), D();
        }
      }, L = {};
      d.capture && (L.capture = !0), d.passive && (L.passive = !0);
      const S = {
        handler: N,
        options: L,
        outsideHandler: null
      };
      if (n && d.outside) {
        const k = function(M) {
          if (!a.contains(M.target) && M.target !== a) {
            if (d.once) {
              if (b)
                return;
              b = !0;
            }
            D();
          }
        };
        document.addEventListener(e, k, L), S.outsideHandler = k;
      } else
        a.addEventListener(e, N, L);
      o.set(a, S);
    },
    updated(a, l, s) {
    },
    unmounted(a) {
      const l = o.get(a);
      l && (l.outsideHandler ? document.removeEventListener(e, l.outsideHandler, l.options) : a.removeEventListener(e, l.handler, l.options), o.delete(a));
    }
  };
}
const Wl = F("click", {
  supportsOutside: !0,
  allowArg: !1
}), $l = {
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
let bi = 0;
const Bl = {
  created(e, t) {
    let n = t.value;
    n || (bi++, n = "scroll-" + bi), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, vt = /* @__PURE__ */ new WeakMap();
function wi(e, t, n, r, i) {
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
const Ul = {
  created(e, t) {
    let n = e.style.display;
    vt.set(e, {
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
    let i = vt.get(e), o = t.modifiers || {}, a = t.arg || null, l = t.value;
    i.stopWatch = Se(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        wi(e, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = vt.get(e);
    if (r && t.value !== t.oldValue) {
      let i = Ee(n);
      if (i) {
        let o = t.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        wi(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = vt.get(e);
    t && (t.stopWatch && t.stopWatch(), vt.delete(e));
  }
}, Zt = /* @__PURE__ */ new WeakMap();
let Si = 0;
function Jl(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Xl(e, t) {
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
function Yl(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const Kl = {
  mounted(e, t, n) {
    let r = Xl(t, n);
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
    Si++;
    let s = "watch-" + i + "-" + Si;
    if (l.blur) {
      let h = function() {
        o.sync();
      };
      e.addEventListener("focusout", h), Zt.set(e, { blurHandler: h });
      return;
    }
    let u = Jl(l) || 150, d = st(s, u), c = Se(
      function() {
        return Yl(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    Zt.set(e, { stopWatcher: c });
  },
  unmounted(e) {
    let t = Zt.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), Zt.delete(e));
  }
}, Lt = /* @__PURE__ */ new WeakMap();
let Ei = 0;
function Gl(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function Zl(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function Ql(e, t) {
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
function qt(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function zt(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function yo(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function es(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function ts(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function ns(e) {
  return ts(e) ? e : e.querySelector("input, textarea, select");
}
function Ft(e, t) {
  return {
    mounted(n, r, i) {
      if (Gl(i) && !Zl(i))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let a = Ql(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: l } = a, s = es(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + e + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      Ei++;
      let d = e + "-" + Ei, c = ns(n);
      if (!c) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let h = t(c, s, l, u, d);
      c.addEventListener(h.eventType, h.handler, { capture: !0 }), Lt.set(n, {
        targetEl: c,
        handler: h.handler,
        eventType: h.eventType
      });
    },
    unmounted(n) {
      let r = Lt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), Lt.delete(n));
    }
  };
}
const rs = Ft("debounce", function(e, t, n, r, i) {
  let o = yo(r) || 150, a = st(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = qt(l.target);
      a(function() {
        zt(n, t, s);
      });
    }
  };
}), is = Ft("throttle", function(e, t, n, r, i) {
  let o = yo(r) || 150, a = jt(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = qt(l.target);
      a(function() {
        zt(n, t, s);
      });
    }
  };
}), Nr = Ft("blur", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    zt(n, t, qt(l.target));
  };
  return e.addEventListener("blur", a), e._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), os = Nr.unmounted;
Nr.unmounted = function(e) {
  let t = Lt.get(e), n = t ? t.targetEl : e;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), os(e);
};
const Ir = Ft("enter", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && zt(n, t, qt(l.target));
  };
  return e.addEventListener("keyup", a), e._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), as = Ir.unmounted;
Ir.unmounted = function(e) {
  let t = Lt.get(e), n = t ? t.targetEl : e;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), as(e);
};
const ls = Ft("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = qt(o.target);
      a = !!a && a !== "false" && a !== "0", zt(n, t, a);
    }
  };
});
function _i(e, t) {
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
    t % 2 ? _i(Object(n), !0).forEach(function(r) {
      ss(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _i(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function un(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? un = function(t) {
    return typeof t;
  } : un = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, un(e);
}
function ss(e, t, n) {
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
function us(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function cs(e, t) {
  if (e == null) return {};
  var n = us(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var fs = "1.15.6";
function Te(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var ke = Te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Wt = Te(/Edge/i), Ai = Te(/firefox/i), kt = Te(/safari/i) && !Te(/chrome/i) && !Te(/android/i), Mr = Te(/iP(ad|od|hone)/i), bo = Te(/chrome/i) && Te(/android/i), wo = {
  capture: !1,
  passive: !1
};
function z(e, t, n) {
  e.addEventListener(t, n, !ke && wo);
}
function q(e, t, n) {
  e.removeEventListener(t, n, !ke && wo);
}
function Dn(e, t) {
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
function So(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function we(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Dn(e, t) : Dn(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = So(e));
  }
  return null;
}
var Di = /\s+/g;
function fe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Di, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Di, " ");
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
function Eo(e, t, n) {
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
function te(e, t, n, r, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var o, a, l, s, u, d, c;
    if (e !== window && e.parentNode && e !== Ae() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, d = o.height, c = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !ke))
      do
        if (i && i.getBoundingClientRect && (P(i, "transform") !== "none" || n && P(i, "position") !== "static")) {
          var h = i.getBoundingClientRect();
          a -= h.top + parseInt(P(i, "border-top-width")), l -= h.left + parseInt(P(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var v = at(i || e), p = v && v.a, m = v && v.d;
      v && (a /= m, l /= p, c /= p, d /= m, s = a + d, u = l + c);
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
function Ci(e, t, n) {
  for (var r = Re(e, !0), i = te(e)[t]; r; ) {
    var o = te(r)[n], a = void 0;
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
function Pr(e, t) {
  for (var n = e.lastElementChild; n && (n === R.ghost || P(n, "display") === "none" || t && !Dn(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function he(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== R.clone && (!t || Dn(e, t)) && n++;
  return n;
}
function Ti(e) {
  var t = 0, n = 0, r = Ae();
  if (e)
    do {
      var i = at(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function ds(e, t) {
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
function ps(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Xn(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var Ot;
function _o(e, t) {
  return function() {
    if (!Ot) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), Ot = setTimeout(function() {
        Ot = void 0;
      }, t);
    }
  };
}
function hs() {
  clearTimeout(Ot), Ot = void 0;
}
function Ao(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function Do(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Co(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!we(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = te(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var ce = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function ms() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(P(i, "display") === "none" || i === R.ghost)) {
            e.push({
              target: i,
              rect: te(i)
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
      e.splice(ds(e, {
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
        var s = 0, u = l.target, d = u.fromRect, c = te(u), h = u.prevFromRect, v = u.prevToRect, p = l.rect, m = at(u, !0);
        m && (c.top -= m.f, c.left -= m.e), u.toRect = c, u.thisAnimationDuration && Xn(h, c) && !Xn(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (p.top - c.top) / (p.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = gs(p, h, v, i.options)), Xn(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, p, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        P(r, "transition", ""), P(r, "transform", "");
        var l = at(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, P(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = vs(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function vs(e) {
  return e.offsetWidth;
}
function gs(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var Ke = [], Yn = {
  initializeByDefault: !0
}, $t = {
  mount: function(t) {
    for (var n in Yn)
      Yn.hasOwnProperty(n) && !(n in t) && (t[n] = Yn[n]);
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
function ys(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, d = e.oldDraggableIndex, c = e.newDraggableIndex, h = e.originalEvent, v = e.putSortable, p = e.extraEventProperties;
  if (t = t || n && n[ce], !!t) {
    var m, b = t.options, E = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ke && !Wt ? m = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = d, m.newDraggableIndex = c, m.originalEvent = h, m.pullMode = v ? v.lastPutMode : void 0;
    var D = De(De({}, p), $t.getEventProperties(r, t));
    for (var N in D)
      m[N] = D[N];
    n && n.dispatchEvent(m), b[E] && b[E].call(t, m);
  }
}
var bs = ["evt"], ue = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = cs(r, bs);
  $t.pluginEvent.bind(R)(t, n, De({
    dragEl: _,
    parentEl: Q,
    ghostEl: V,
    rootEl: Y,
    nextEl: $e,
    lastDownEl: cn,
    cloneEl: G,
    cloneHidden: Me,
    dragStarted: wt,
    putSortable: ie,
    activeSortable: R.active,
    originalEvent: i,
    oldIndex: nt,
    oldDraggableIndex: xt,
    newIndex: de,
    newDraggableIndex: xe,
    hideGhostForTarget: Oo,
    unhideGhostForTarget: xo,
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
  ys(De({
    putSortable: ie,
    cloneEl: G,
    targetEl: _,
    rootEl: Y,
    oldIndex: nt,
    oldDraggableIndex: xt,
    newIndex: de,
    newDraggableIndex: xe
  }, e));
}
var _, Q, V, Y, $e, cn, G, Me, nt, de, xt, xe, Qt, ie, et = !1, Cn = !1, Tn = [], ze, ge, Kn, Gn, Li, ki, wt, Ge, Nt, It = !1, en = !1, fn, ae, Zn = [], wr = !1, Ln = [], Mn = typeof document < "u", tn = Mr, Oi = Wt || ke ? "cssFloat" : "float", ws = Mn && !bo && !Mr && "draggable" in document.createElement("div"), To = (function() {
  if (Mn) {
    if (ke)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), Lo = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = ut(t, 0, n), a = ut(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + te(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + te(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Oi] === "none" || a && r[Oi] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Ss = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, Es = function(t, n) {
  var r;
  return Tn.some(function(i) {
    var o = i[ce].options.emptyInsertThreshold;
    if (!(!o || Pr(i))) {
      var a = te(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, ko = function(t) {
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
      var h = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === h || o.join && o.indexOf(h) > -1;
    };
  }
  var r = {}, i = t.group;
  (!i || un(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, Oo = function() {
  !To && V && P(V, "display", "none");
}, xo = function() {
  !To && V && P(V, "display", "");
};
Mn && !bo && document.addEventListener("click", function(e) {
  if (Cn)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Cn = !1, !1;
}, !0);
var Fe = function(t) {
  if (_) {
    t = t.touches ? t.touches[0] : t;
    var n = Es(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ce]._onDragOver(r);
    }
  }
}, _s = function(t) {
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
      return Lo(e, this.options);
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
    supportPointer: R.supportPointer !== !1 && "PointerEvent" in window && (!kt || Mr),
    emptyInsertThreshold: 5
  };
  $t.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  ko(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : ws, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? z(e, "pointerdown", this._onTapStart) : (z(e, "mousedown", this._onTapStart), z(e, "touchstart", this._onTapStart)), this.nativeDraggable && (z(e, "dragover", this), z(e, "dragenter", this)), Tn.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Le(this, ms());
}
R.prototype = /** @lends Sortable.prototype */
{
  constructor: R,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (Ge = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, _) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, d = i.filter;
      if (xs(r), !_ && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && kt && s && s.tagName.toUpperCase() === "SELECT") && (s = we(s, i.draggable, r, !1), !(s && s.animated) && cn !== s)) {
        if (nt = he(s), xt = he(s, i.draggable), typeof d == "function") {
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
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = we(u, c.trim(), r, !1), c)
            return le({
              sortable: n,
              rootEl: c,
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
      var u = te(r);
      if (Y = o, _ = r, Q = _.parentNode, $e = _.nextSibling, cn = r, Qt = a.group, R.dragged = _, ze = {
        target: _,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Li = ze.clientX - u.left, ki = ze.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, _.style["will-change"] = "all", s = function() {
        if (ue("delayEnded", i, {
          evt: t
        }), R.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !Ai && i.nativeDraggable && (_.draggable = !0), i._triggerDragStart(t, n), le({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), fe(_, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Eo(_, d.trim(), Qn);
      }), z(l, "dragover", Fe), z(l, "mousemove", Fe), z(l, "touchmove", Fe), a.supportPointer ? (z(l, "pointerup", i._onDrop), !this.nativeDraggable && z(l, "pointercancel", i._onDrop)) : (z(l, "mouseup", i._onDrop), z(l, "touchend", i._onDrop), z(l, "touchcancel", i._onDrop)), Ai && this.nativeDraggable && (this.options.touchStartThreshold = 4, _.draggable = !0), ue("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Wt || ke))) {
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
    _ && Qn(_), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    q(t, "mouseup", this._disableDelayedDrag), q(t, "touchend", this._disableDelayedDrag), q(t, "touchcancel", this._disableDelayedDrag), q(t, "pointerup", this._disableDelayedDrag), q(t, "pointercancel", this._disableDelayedDrag), q(t, "mousemove", this._delayedDragTouchMoveHandler), q(t, "touchmove", this._delayedDragTouchMoveHandler), q(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? z(document, "pointermove", this._onTouchMove) : n ? z(document, "touchmove", this._onTouchMove) : z(document, "mousemove", this._onTouchMove) : (z(_, "dragend", this), z(Y, "dragstart", this._onDragStart));
    try {
      document.selection ? dn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (et = !1, Y && _) {
      ue("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && z(document, "dragover", _s);
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
      this._lastX = ge.clientX, this._lastY = ge.clientY, Oo();
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
        } while (n = So(n));
      xo();
    }
  },
  _onTouchMove: function(t) {
    if (ze) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = V && at(V, !0), l = V && a && a.a, s = V && a && a.d, u = tn && ae && Ti(ae), d = (o.clientX - ze.clientX + i.x) / (l || 1) + (u ? u[0] - Zn[0] : 0) / (l || 1), c = (o.clientY - ze.clientY + i.y) / (s || 1) + (u ? u[1] - Zn[1] : 0) / (s || 1);
      if (!R.active && !et) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (V) {
        a ? (a.e += d - (Kn || 0), a.f += c - (Gn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var h = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(V, "webkitTransform", h), P(V, "mozTransform", h), P(V, "msTransform", h), P(V, "transform", h), Kn = d, Gn = c, ge = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!V) {
      var t = this.options.fallbackOnBody ? document.body : Y, n = te(_, !0, tn, !0, t), r = this.options;
      if (tn) {
        for (ae = t; P(ae, "position") === "static" && P(ae, "transform") === "none" && ae !== document; )
          ae = ae.parentNode;
        ae !== document.body && ae !== document.documentElement ? (ae === document && (ae = Ae()), n.top += ae.scrollTop, n.left += ae.scrollLeft) : ae = Ae(), Zn = Ti(ae);
      }
      V = _.cloneNode(!0), fe(V, r.ghostClass, !1), fe(V, r.fallbackClass, !0), fe(V, r.dragClass, !0), P(V, "transition", ""), P(V, "transform", ""), P(V, "box-sizing", "border-box"), P(V, "margin", 0), P(V, "top", n.top), P(V, "left", n.left), P(V, "width", n.width), P(V, "height", n.height), P(V, "opacity", "0.8"), P(V, "position", tn ? "absolute" : "fixed"), P(V, "zIndex", "100000"), P(V, "pointerEvents", "none"), R.ghost = V, t.appendChild(V), P(V, "transform-origin", Li / parseInt(V.style.width) * 100 + "% " + ki / parseInt(V.style.height) * 100 + "%");
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
    ue("setupClone", this), R.eventCanceled || (G = Do(_), G.removeAttribute("id"), G.draggable = !1, G.style["will-change"] = "", this._hideClone(), fe(G, this.options.chosenClass, !1), R.clone = G), r.cloneId = dn(function() {
      ue("clone", r), !R.eventCanceled && (r.options.removeCloneOnHide || Y.insertBefore(G, _), r._hideClone(), le({
        sortable: r,
        name: "clone"
      }));
    }), !n && fe(_, o.dragClass, !0), n ? (Cn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (q(document, "mouseup", r._onDrop), q(document, "touchend", r._onDrop), q(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, _)), z(document, "drop", r), P(_, "transform", "translateZ(0)")), et = !0, r._dragStartId = dn(r._dragStarted.bind(r, n, t)), z(document, "selectstart", r), wt = !0, window.getSelection().removeAllRanges(), kt && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = R.active, d = Qt === s, c = l.sort, h = ie || u, v, p = this, m = !1;
    if (wr) return;
    function b(re, Bt) {
      ue(re, p, De({
        evt: t,
        isOwner: d,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: h,
        target: r,
        completed: D,
        onMove: function(y, A) {
          return nn(Y, n, _, i, y, te(y), t, A);
        },
        changed: N
      }, Bt));
    }
    function E() {
      b("dragOverAnimationCapture"), p.captureAnimationState(), p !== h && h.captureAnimationState();
    }
    function D(re) {
      return b("dragOverCompleted", {
        insertion: re
      }), re && (d ? u._hideClone() : u._showClone(p), p !== h && (fe(_, ie ? ie.options.ghostClass : u.options.ghostClass, !1), fe(_, l.ghostClass, !0)), ie !== p && p !== R.active ? ie = p : p === R.active && ie && (ie = null), h === p && (p._ignoreWhileAnimating = r), p.animateAll(function() {
        b("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
      }), p !== h && (h.animateAll(), h._ignoreWhileAnimating = null)), (r === _ && !_.animated || r === n && !r.animated) && (Ge = null), !l.dragoverBubble && !t.rootEl && r !== document && (_.parentNode[ce]._isOutsideThisEl(t.target), !re && Fe(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
    }
    function N() {
      de = he(_), xe = he(_, l.draggable), le({
        sortable: p,
        name: "change",
        toEl: n,
        newIndex: de,
        newDraggableIndex: xe,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = we(r, l.draggable, n, !0), b("dragOver"), R.eventCanceled) return m;
    if (_.contains(t.target) || r.animated && r.animatingX && r.animatingY || p._ignoreWhileAnimating === r)
      return D(!1);
    if (Cn = !1, u && !l.disabled && (d ? c || (a = Q !== Y) : ie === this || (this.lastPutMode = Qt.checkPull(this, u, _, t)) && s.checkPut(this, u, _, t))) {
      if (v = this._getDirection(t, r) === "vertical", i = te(_), b("dragOverValid"), R.eventCanceled) return m;
      if (a)
        return Q = Y, E(), this._hideClone(), b("revert"), R.eventCanceled || ($e ? Y.insertBefore(_, $e) : Y.appendChild(_)), D(!0);
      var L = Pr(n, l.draggable);
      if (!L || Ts(t, v, this) && !L.animated) {
        if (L === _)
          return D(!1);
        if (L && n === t.target && (r = L), r && (o = te(r)), nn(Y, n, _, i, r, o, t, !!r) !== !1)
          return E(), L && L.nextSibling ? n.insertBefore(_, L.nextSibling) : n.appendChild(_), Q = n, N(), D(!0);
      } else if (L && Cs(t, v, this)) {
        var S = ut(n, 0, l, !0);
        if (S === _)
          return D(!1);
        if (r = S, o = te(r), nn(Y, n, _, i, r, o, t, !1) !== !1)
          return E(), n.insertBefore(_, S), Q = n, N(), D(!0);
      } else if (r.parentNode === n) {
        o = te(r);
        var k = 0, M, I = _.parentNode !== n, O = !Ss(_.animated && _.toRect || i, r.animated && r.toRect || o, v), T = v ? "top" : "left", j = Ci(r, "top", "top") || Ci(_, "top", "top"), W = j ? j.scrollTop : void 0;
        Ge !== r && (M = o[T], It = !1, en = !O && l.invertSwap || I), k = Ls(t, r, o, v, O ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, en, Ge === r);
        var X;
        if (k !== 0) {
          var $ = he(_);
          do
            $ -= k, X = Q.children[$];
          while (X && (P(X, "display") === "none" || X === V));
        }
        if (k === 0 || X === r)
          return D(!1);
        Ge = r, Nt = k;
        var ne = r.nextElementSibling, w = !1;
        w = k === 1;
        var J = nn(Y, n, _, i, r, o, t, w);
        if (J !== !1)
          return (J === 1 || J === -1) && (w = J === 1), wr = !0, setTimeout(Ds, 30), E(), w && !ne ? n.appendChild(_) : r.parentNode.insertBefore(_, w ? ne : r), j && Ao(j, 0, W - j.scrollTop), Q = _.parentNode, M !== void 0 && !en && (fn = Math.abs(M - te(r)[T])), N(), D(!0);
      }
      if (n.contains(_))
        return D(!1);
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
    if (de = he(_), xe = he(_, r.draggable), ue("drop", this, {
      evt: t
    }), Q = _ && _.parentNode, de = he(_), xe = he(_, r.draggable), R.eventCanceled) {
      this._nulling();
      return;
    }
    et = !1, en = !1, It = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Sr(this.cloneId), Sr(this._dragStartId), this.nativeDraggable && (q(document, "drop", this), q(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), kt && P(document.body, "user-select", ""), P(_, "transform", ""), t && (wt && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), V && V.parentNode && V.parentNode.removeChild(V), (Y === Q || ie && ie.lastPutMode !== "clone") && G && G.parentNode && G.parentNode.removeChild(G), _ && (this.nativeDraggable && q(_, "dragend", this), Qn(_), _.style["will-change"] = "", wt && !et && fe(_, ie ? ie.options.ghostClass : this.options.ghostClass, !1), fe(_, this.options.chosenClass, !1), le({
      sortable: this,
      name: "unchoose",
      toEl: Q,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Y !== Q ? (de >= 0 && (le({
      rootEl: Q,
      name: "add",
      toEl: Q,
      fromEl: Y,
      originalEvent: t
    }), le({
      sortable: this,
      name: "remove",
      toEl: Q,
      originalEvent: t
    }), le({
      rootEl: Q,
      name: "sort",
      toEl: Q,
      fromEl: Y,
      originalEvent: t
    }), le({
      sortable: this,
      name: "sort",
      toEl: Q,
      originalEvent: t
    })), ie && ie.save()) : de !== nt && de >= 0 && (le({
      sortable: this,
      name: "update",
      toEl: Q,
      originalEvent: t
    }), le({
      sortable: this,
      name: "sort",
      toEl: Q,
      originalEvent: t
    })), R.active && ((de == null || de === -1) && (de = nt, xe = xt), le({
      sortable: this,
      name: "end",
      toEl: Q,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ue("nulling", this), Y = _ = Q = V = $e = G = cn = Me = ze = ge = wt = de = xe = nt = xt = Ge = Nt = ie = Qt = R.dragged = R.ghost = R.clone = R.active = null, Ln.forEach(function(t) {
      t.checked = !0;
    }), Ln.length = Kn = Gn = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        _ && (this._onDragOver(t), As(t));
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
      n = r[i], we(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Os(n));
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
    var i = $t.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && ko(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ue("destroy", this);
    var t = this.el;
    t[ce] = null, q(t, "mousedown", this._onTapStart), q(t, "touchstart", this._onTapStart), q(t, "pointerdown", this._onTapStart), this.nativeDraggable && (q(t, "dragover", this), q(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Tn.splice(Tn.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Me) {
      if (ue("hideClone", this), R.eventCanceled) return;
      P(G, "display", "none"), this.options.removeCloneOnHide && G.parentNode && G.parentNode.removeChild(G), Me = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Me) {
      if (ue("showClone", this), R.eventCanceled) return;
      _.parentNode == Y && !this.options.group.revertClone ? Y.insertBefore(G, _) : $e ? Y.insertBefore(G, $e) : Y.appendChild(G), this.options.group.revertClone && this.animate(_, G), P(G, "display", ""), Me = !1;
    }
  }
};
function As(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function nn(e, t, n, r, i, o, a, l) {
  var s, u = e[ce], d = u.options.onMove, c;
  return window.CustomEvent && !ke && !Wt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || te(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function Qn(e) {
  e.draggable = !1;
}
function Ds() {
  wr = !1;
}
function Cs(e, t, n) {
  var r = te(ut(n.el, 0, n.options, !0)), i = Co(n.el, n.options, V), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Ts(e, t, n) {
  var r = te(Pr(n.el, n.options.draggable)), i = Co(n.el, n.options, V), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Ls(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, h = !1;
  if (!a) {
    if (l && fn < u * i) {
      if (!It && (Nt === 1 ? s > d + u * o / 2 : s < c - u * o / 2) && (It = !0), It)
        h = !0;
      else if (Nt === 1 ? s < d + fn : s > c - fn)
        return -Nt;
    } else if (s > d + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return ks(t);
  }
  return h = h || a, h && (s < d + u * o / 2 || s > c - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function ks(e) {
  return he(_) < he(e) ? 1 : -1;
}
function Os(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function xs(e) {
  Ln.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && Ln.push(r);
  }
}
function dn(e) {
  return setTimeout(e, 0);
}
function Sr(e) {
  return clearTimeout(e);
}
Mn && z(document, "touchmove", function(e) {
  (R.active || et) && e.cancelable && e.preventDefault();
});
R.utils = {
  on: z,
  off: q,
  css: P,
  find: Eo,
  is: function(t, n) {
    return !!we(t, n, t, !1);
  },
  extend: ps,
  throttle: _o,
  closest: we,
  toggleClass: fe,
  clone: Do,
  index: he,
  nextTick: dn,
  cancelNextTick: Sr,
  detectDirection: Lo,
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
    r.utils && (R.utils = De(De({}, R.utils), r.utils)), $t.mount(r);
  });
};
R.create = function(e, t) {
  return new R(e, t);
};
R.version = fs;
var ee = [], St, Er, _r = !1, er, tr, kn, Et;
function Ns() {
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
      this.sortable.nativeDraggable ? q(document, "dragover", this._handleAutoScroll) : (q(document, "pointermove", this._handleFallbackAutoScroll), q(document, "touchmove", this._handleFallbackAutoScroll), q(document, "mousemove", this._handleFallbackAutoScroll)), xi(), pn(), hs();
    },
    nulling: function() {
      kn = Er = St = _r = Et = er = tr = null, ee.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (kn = n, r || this.options.forceAutoScrollFallback || Wt || ke || kt) {
        nr(n, this.options, l, r);
        var s = Re(l, !0);
        _r && (!Et || o !== er || a !== tr) && (Et && xi(), Et = setInterval(function() {
          var u = Re(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, pn()), nr(n, i.options, u, r);
        }, 10), er = o, tr = a);
      } else {
        if (!this.options.bubbleScroll || Re(l, !0) === Ae()) {
          pn();
          return;
        }
        nr(n, this.options, Re(l, !1), !1);
      }
    }
  }, Le(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function pn() {
  ee.forEach(function(e) {
    clearInterval(e.pid);
  }), ee = [];
}
function xi() {
  clearInterval(Et);
}
var nr = _o(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ae(), u = !1, d;
    Er !== n && (Er = n, pn(), St = t.scroll, d = t.scrollFn, St === !0 && (St = Re(n, !0)));
    var c = 0, h = St;
    do {
      var v = h, p = te(v), m = p.top, b = p.bottom, E = p.left, D = p.right, N = p.width, L = p.height, S = void 0, k = void 0, M = v.scrollWidth, I = v.scrollHeight, O = P(v), T = v.scrollLeft, j = v.scrollTop;
      v === s ? (S = N < M && (O.overflowX === "auto" || O.overflowX === "scroll" || O.overflowX === "visible"), k = L < I && (O.overflowY === "auto" || O.overflowY === "scroll" || O.overflowY === "visible")) : (S = N < M && (O.overflowX === "auto" || O.overflowX === "scroll"), k = L < I && (O.overflowY === "auto" || O.overflowY === "scroll"));
      var W = S && (Math.abs(D - i) <= a && T + N < M) - (Math.abs(E - i) <= a && !!T), X = k && (Math.abs(b - o) <= a && j + L < I) - (Math.abs(m - o) <= a && !!j);
      if (!ee[c])
        for (var $ = 0; $ <= c; $++)
          ee[$] || (ee[$] = {});
      (ee[c].vx != W || ee[c].vy != X || ee[c].el !== v) && (ee[c].el = v, ee[c].vx = W, ee[c].vy = X, clearInterval(ee[c].pid), (W != 0 || X != 0) && (u = !0, ee[c].pid = setInterval(function() {
        r && this.layer === 0 && R.active._onTouchMove(kn);
        var ne = ee[this.layer].vy ? ee[this.layer].vy * l : 0, w = ee[this.layer].vx ? ee[this.layer].vx * l : 0;
        typeof d == "function" && d.call(R.dragged.parentNode[ce], w, ne, e, kn, ee[this.layer].el) !== "continue" || Ao(ee[this.layer].el, w, ne);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (t.bubbleScroll && h !== s && (h = Re(h, !1)));
    _r = u;
  }
}, 30), No = function(t) {
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
function Rr() {
}
Rr.prototype = {
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
  drop: No
};
Le(Rr, {
  pluginName: "revertOnSpill"
});
function Vr() {
}
Vr.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: No
};
Le(Vr, {
  pluginName: "removeOnSpill"
});
R.mount(new Ns());
R.mount(Vr, Rr);
const rt = /* @__PURE__ */ new WeakMap(), hn = /* @__PURE__ */ new WeakMap();
function Is(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const rn = /* @__PURE__ */ new WeakMap(), Ms = {
  mounted(e, t, n) {
    let r = Ee(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = Is(i), l = i.horizontal ? "horizontal" : "vertical";
    rn.set(e, t);
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
      onEnd: function(h) {
        let v = h.newIndex, p = h.oldIndex;
        if (p === v)
          return;
        let m = rn.get(e), b = m ? m.value : null, E = typeof b == "string";
        if (Array.isArray(b)) {
          let N = h.from;
          p < v ? N.insertBefore(h.item, N.children[p]) : N.insertBefore(h.item, N.children[p + 1]);
          let L = b.splice(p, 1)[0];
          b.splice(v, 0, L);
          return;
        }
        if (E && r) {
          let N = b, L = [], S = h.item, k = hn.get(S);
          k === void 0 && (k = S.dataset.livueSortItem), typeof k == "string" && /^\d+$/.test(k) && (k = parseInt(k, 10));
          let M = h.from, I = h.to, O = [k, v].concat(L);
          if (M !== I) {
            let j = I.dataset.livueSortMethod;
            j && (N = j);
            let W = M.dataset.livueSortId || M.dataset.livueSortGroup || null;
            O.push(W);
          }
          r.call(N, O);
        }
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let c = R.create(e, u);
    rt.set(e, c);
  },
  updated(e, t) {
    rn.set(e, t);
    let n = rt.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = rt.get(e);
    t && (t.destroy(), rt.delete(e)), rn.delete(e);
  }
}, Ps = {
  mounted(e, t) {
    let n = t.value;
    hn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    hn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (hn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, Rs = {
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
}, Vs = {
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
}, js = {
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
}, Hs = F("dblclick"), qs = F("mousedown"), zs = F("mouseup"), Fs = F("mouseenter"), Ws = F("mouseleave"), $s = F("mouseover"), Bs = F("mouseout"), Us = F("mousemove"), Js = F("contextmenu"), Xs = F("keydown", { isKeyboardEvent: !0 }), Ys = F("keyup", { isKeyboardEvent: !0 }), Ks = F("keypress", { isKeyboardEvent: !0 }), Gs = F("focus"), Zs = F("focusin"), Qs = F("focusout"), eu = F("touchstart"), tu = F("touchend"), nu = F("touchmove"), ru = F("touchcancel"), iu = F("change"), ou = F("input"), au = F("reset"), lu = F("dragstart"), su = F("dragend"), uu = F("dragenter"), cu = F("dragleave"), fu = F("dragover"), du = F("drop"), pu = F("copy"), hu = F("cut"), mu = F("paste"), vu = F("wheel"), gu = F("resize");
function yu() {
  x("init", bl), x("submit", wl), x("intersect", Sl), x("current", Al), x("ignore", Dl), x("model-livue", kl), x("debounce", rs), x("throttle", is), x("blur", Nr), x("enter", Ir), x("boolean", ls), x("poll", Nl), x("offline", Ml), x("transition", pl), x("replace", Pl), x("loading", jl), x("target", Hl), x("stream", ql), x("click", Wl), x("navigate", $l), x("scroll", Bl), x("dirty", Ul), x("watch", Kl), x("sort", Ms), x("sort-item", Ps), x("sort-handle", Rs), x("sort-ignore", Vs), x("sort-group", js), x("dblclick", Hs), x("mousedown", qs), x("mouseup", zs), x("mouseenter", Fs), x("mouseleave", Ws), x("mouseover", $s), x("mouseout", Bs), x("mousemove", Us), x("contextmenu", Js), x("keydown", Xs), x("keyup", Ys), x("keypress", Ks), x("focus", Gs), x("focusin", Zs), x("focusout", Qs), x("touchstart", eu), x("touchend", tu), x("touchmove", nu), x("touchcancel", ru), x("change", iu), x("input", ou), x("reset", au), x("dragstart", lu), x("dragend", su), x("dragenter", uu), x("dragleave", cu), x("dragover", fu), x("drop", du), x("copy", pu), x("cut", hu), x("paste", mu), x("wheel", vu), x("resize", gu);
}
let Ne = null, gt = null, Ni = !1;
function bu() {
  if (Ni)
    return;
  Ni = !0;
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
function wu() {
  return Ne || (bu(), Ne = document.createElement("div"), Ne.className = "livue-hmr-indicator", document.body.appendChild(Ne), Ne);
}
function on(e, t) {
  const n = wu();
  switch (gt && (clearTimeout(gt), gt = null), e) {
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
            `, gt = setTimeout(function() {
        Ii();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, gt = setTimeout(function() {
        Ii();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Ii() {
  Ne && Ne.classList.remove("visible");
}
let Je = null, Pn = !0, Io = !0, _t = !0, mn = [];
function Su(e) {
  Je = e;
}
async function Eu(e) {
  if (Pn) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), _t && on("updating", e.fileName), mn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = Io ? _u() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), _t && on("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), Je.reboot(), t && (await Du(), Au(t)), _t && on("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), _t && on("error");
    }
  }
}
function _u() {
  const e = /* @__PURE__ */ new Map();
  return Je && Je.all().forEach(function(n) {
    if (Mi(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Mi(r, i.name, i.state, e);
      }
  }), e;
}
function Mi(e, t, n, r) {
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
function Au(e) {
  Je && e.forEach(function(t, n) {
    const r = Je.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function Du() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Cu() {
  return typeof import.meta < "u" && !1;
}
function Tu() {
  Pn = !0;
}
function Lu() {
  Pn = !1;
}
function ku() {
  return Pn;
}
function Ou(e) {
  e.indicator !== void 0 && (_t = e.indicator), e.preserveState !== void 0 && (Io = e.preserveState);
}
function xu(e) {
  return mn.push(e), function() {
    const t = mn.indexOf(e);
    t !== -1 && mn.splice(t, 1);
  };
}
async function Nu() {
  Je && await Eu({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var Ze = !1, rr = [];
class Iu {
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
    Wa(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    yu(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), this._processStandaloneLazy(document.body), Ea(this), this._startObserver(), Su(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(t) {
      t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Ka());
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
    Ht(t, !0, !1);
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
    Sa(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return In(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    xa();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Va();
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
      ...Ya()
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
    let r = new yl(t);
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
    return Jr(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Xr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), Gr();
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
    }), Gr();
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
      isAvailable: Cu,
      isEnabled: ku,
      enable: Tu,
      disable: Lu,
      configure: Ou,
      onUpdate: xu,
      trigger: Nu
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
      var n = Xr();
      n.forEach(function(r) {
        var i = Jr(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        rr.push(i);
      });
    } else !t && Ze && (Ze = !1, console.log("[LiVue] Debug mode disabled"), rr.forEach(function(r) {
      r();
    }), rr = []);
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
const Rn = new Iu();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = Bo, document.head.appendChild(e);
}
var ye = window.LiVueConfig || {};
(ye.showProgressBar !== void 0 || ye.progressBarColor !== void 0 || ye.prefetch !== void 0 || ye.prefetchOnHover !== void 0 || ye.hoverDelay !== void 0 || ye.cachePages !== void 0 || ye.maxCacheSize !== void 0 || ye.restoreScroll !== void 0) && Rn.configureNavigation(ye);
ye.showProgressOnRequest !== void 0 && Rn.progress.configure({ showOnRequest: ye.showProgressOnRequest });
function Pi() {
  Rn.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Pi) : queueMicrotask(Pi);
window.LiVue = Rn;
export {
  Rn as default
};
//# sourceMappingURL=livue.esm.js.map
