import * as Vn from "vue";
import { reactive as _e, toRefs as Pi, effectScope as Ri, ref as Mt, markRaw as Vi, hasInjectionContext as Mo, inject as ji, isRef as vn, isReactive as Hi, toRaw as Po, getCurrentScope as Ro, onScopeDispose as Vo, watch as Se, nextTick as On, computed as qi, provide as jo, onBeforeUnmount as Ho, onBeforeMount as qo, onUnmounted as Fi, onMounted as zi, readonly as Fo, watchEffect as zo, shallowRef as _r, defineComponent as Wo, h as Vr, createApp as Bo } from "vue";
const $o = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Wi(e, t) {
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
function jr(e) {
  return JSON.stringify(e, Wi);
}
function ir(e) {
  return _e(Object.assign({}, e));
}
function Uo(e, t) {
  let n;
  for (n in t) {
    let r = jr(e[n]), i = jr(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function Bi(e) {
  return JSON.parse(JSON.stringify(e, Wi));
}
function Jo(e) {
  return Pi(e);
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
let Hr = 0;
function Yo() {
  return Hr++, Hr;
}
let $i = /* @__PURE__ */ new Map();
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
function Ui(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    $i.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: Ko(n)
    });
  });
}
function Ji(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = $i.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && Go(n, i.inputs));
  });
}
let Xi;
const xn = (e) => Xi = e, Yi = (
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
  const e = Ri(!0), t = e.run(() => Mt({}));
  let n = [], r = [];
  const i = Vi({
    install(o) {
      xn(i), i._a = o, o.provide(Yi, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const Ki = () => {
};
function qr(e, t, n, r = Ki) {
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
    ar(i) && ar(r) && e.hasOwnProperty(n) && !vn(r) && !Hi(r) ? e[n] = lr(i, r) : e[n] = r;
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
    const d = Pi(n.state.value[e]);
    return Oe(d, o, Object.keys(a || {}).reduce((c, p) => (c[p] = Vi(qi(() => {
      xn(n);
      const v = n._s.get(e);
      return a[p].call(v, v);
    })), c), {}));
  }
  return s = Gi(e, u, t, n, r, !0), s;
}
function Gi(e, t, n = {}, r, i, o) {
  let a;
  const l = Oe({ actions: {} }, n), s = { deep: !0 };
  let u, d, c = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), v;
  const h = r.state.value[e];
  !o && !h && (r.state.value[e] = {}), Mt({});
  let y;
  function S(I) {
    let x;
    u = d = !1, typeof I == "function" ? (I(r.state.value[e]), x = {
      type: At.patchFunction,
      storeId: e,
      events: v
    }) : (lr(r.state.value[e], I), x = {
      type: At.patchObject,
      payload: I,
      storeId: e,
      events: v
    });
    const L = y = /* @__PURE__ */ Symbol();
    On().then(() => {
      y === L && (u = !0);
    }), d = !0, Xe(c, x, r.state.value[e]);
  }
  const A = o ? function() {
    const { state: x } = n, L = x ? x() : {};
    this.$patch((j) => {
      Oe(j, L);
    });
  } : (
    /* istanbul ignore next */
    Ki
  );
  function C() {
    a.stop(), c.clear(), p.clear(), r._s.delete(e);
  }
  const M = (I, x = "") => {
    if (Fr in I)
      return I[Hn] = x, I;
    const L = function() {
      xn(r);
      const j = Array.from(arguments), q = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set();
      function J(G) {
        q.add(G);
      }
      function ne(G) {
        U.add(G);
      }
      Xe(p, {
        args: j,
        name: L[Hn],
        store: w,
        after: J,
        onError: ne
      });
      let b;
      try {
        b = I.apply(this && this.$id === e ? this : w, j);
      } catch (G) {
        throw Xe(U, G), G;
      }
      return b instanceof Promise ? b.then((G) => (Xe(q, G), G)).catch((G) => (Xe(U, G), Promise.reject(G))) : (Xe(q, b), b);
    };
    return L[Fr] = !0, L[Hn] = x, L;
  }, k = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: qr.bind(null, p),
    $patch: S,
    $reset: A,
    $subscribe(I, x = {}) {
      const L = qr(c, I, x.detached, () => j()), j = a.run(() => Se(() => r.state.value[e], (q) => {
        (x.flush === "sync" ? d : u) && I({
          storeId: e,
          type: At.direct,
          events: v
        }, q);
      }, Oe({}, s, x)));
      return L;
    },
    $dispose: C
  }, w = _e(k);
  r._s.set(e, w);
  const N = (r._a && r._a.runWithContext || Qo)(() => r._e.run(() => (a = Ri()).run(() => t({ action: M }))));
  for (const I in N) {
    const x = N[I];
    if (vn(x) && !na(x) || Hi(x))
      o || (h && ta(x) && (vn(x) ? x.value = h[I] : lr(x, h[I])), r.state.value[e][I] = x);
    else if (typeof x == "function") {
      const L = M(x, I);
      N[I] = L, l.actions[I] = x;
    }
  }
  return Oe(w, N), Oe(Po(w), N), Object.defineProperty(w, "$state", {
    get: () => r.state.value[e],
    set: (I) => {
      S((x) => {
        Oe(x, I);
      });
    }
  }), r._p.forEach((I) => {
    Oe(w, a.run(() => I({
      store: w,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), h && o && n.hydrate && n.hydrate(w.$state, h), u = !0, d = !0, w;
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
    a || (s ? ji(Yi, null) : null), a && xn(a), a = Xi, a._s.has(e) || (i ? Gi(e, t, r, a) : ra(e, r, a)), a._s.get(e);
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
function Zi(e) {
  return JSON.parse(JSON.stringify(e));
}
function aa(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(Zi(t));
}
function Ar(e, t, n, r) {
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
        return Zi(a);
      }
    }, u = Ar(e, i.name, s, { scope: o });
    n[i.name] = u;
  }
  return n;
}
function sa(e) {
  let t = e + ":", n = Array.from(Pt.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && Pt.delete(n[r]);
}
let Qi = {
  ref: Mt,
  computed: qi,
  watch: Se,
  watchEffect: zo,
  reactive: _e,
  readonly: Fo,
  onMounted: zi,
  onUnmounted: Fi,
  onBeforeMount: qo,
  onBeforeUnmount: Ho,
  nextTick: On,
  provide: jo,
  inject: ji
}, eo = Object.keys(Qi), ua = eo.map(function(e) {
  return Qi[e];
});
function zr(e) {
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
function ca(e, t, n) {
  let r = Object.keys(t), i = r.map(function(u) {
    return t[u];
  });
  function o(u, d, c) {
    let p = n && n.$id ? n.$id : "";
    if (d === void 0) {
      let v = Ue(p, u, c || {});
      if (v)
        return v;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return Ar(p, u, d, c);
  }
  function a(u) {
    let d = n && n.$id ? n.$id : "", c = Ue(d, u, { scope: "auto" });
    if (!c)
      throw new Error('[LiVue] useStore("' + u + '"): store not found.');
    return c;
  }
  let l = eo.concat(r).concat(["livue", "store", "useStore"]), s = ua.concat(i).concat([n, o, a]);
  try {
    let d = new (Function.prototype.bind.apply(
      Function,
      [null].concat(l).concat([e])
    ))().apply(null, s);
    return d && typeof d == "object" ? d : null;
  } catch (u) {
    return console.error("[LiVue] Error executing @script setup code:", u), null;
  }
}
function Wr(e) {
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
function sr(e, t, n, r, i, o) {
  let a = Wr(e);
  a = Br(a);
  let l = zr(a), s = Vn.compile(l.html), u = _r(s), d = [], c = !1;
  function p(h, y) {
    let S = u.value;
    c = !0;
    let A;
    try {
      A = S(h, d);
    } finally {
      c = !1;
    }
    return to(A), A;
  }
  p._rc = !0;
  let v = {
    name: o || "LiVueComponent",
    render: p,
    setup: function() {
      Vn.provide("livue", n);
      let h = Jo(t);
      var y = new Proxy(n.errors, {
        get: function(k, w, T) {
          var N = Reflect.get(k, w, T);
          return Array.isArray(N) ? N[0] : N;
        }
      });
      let S = Object.assign({}, h, r, { livue: n, stores: n.stores, livueV: i, lvErrors: y });
      if (l.setupCode) {
        let k = ca(l.setupCode, h, n);
        k && Object.assign(S, k);
      }
      var A = {
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
      }, C = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      function M(k) {
        return typeof k == "string" && !A[k] && C.test(k);
      }
      return new Proxy(S, {
        get: function(k, w, T) {
          if (w in k || typeof w == "symbol") return Reflect.get(k, w, T);
          if (M(w)) {
            var N = function() {
              var I = Array.prototype.slice.call(arguments);
              if (c) {
                var x = function() {
                  return n.call(w, ...I);
                };
                return Object.defineProperty(x, "__livueMethodName", {
                  value: w,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), Object.defineProperty(x, "__livueMethodArgs", {
                  value: I,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), x;
              }
              return n.call(w, ...I);
            };
            return Object.defineProperty(N, "__livueMethodName", {
              value: w,
              configurable: !1,
              enumerable: !1,
              writable: !1
            }), N;
          }
        },
        getOwnPropertyDescriptor: function(k, w) {
          var T = Object.getOwnPropertyDescriptor(k, w);
          if (T) return T;
          if (M(w))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(k, w) {
          return !!(w in k || M(w));
        },
        set: function(k, w, T) {
          return k[w] = T, !0;
        },
        ownKeys: function(k) {
          return Reflect.ownKeys(k);
        }
      });
    }
  };
  return v._updateRender = function(h) {
    let y = Wr(h);
    y = Br(y);
    let S = zr(y), A = Vn.compile(S.html);
    A !== u.value && (d.length = 0, u.value = A);
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
let ie = {
  color: "#29d",
  height: "2px",
  showOnRequest: !1,
  minimum: 0.08,
  easing: "ease",
  speed: 200,
  trickle: !0,
  trickleSpeed: 200,
  parent: "body"
}, le = null, ur = null, pe = null, gn = !1, Dt = 0;
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
            height: ${ie.height};
            background: ${ie.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${ie.speed}ms ${ie.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${ie.color}, 0 0 5px ${ie.color};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
        }
        .livue-progress-bar.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${ie.speed}ms ${ie.easing};
        }
    `, document.head.appendChild(e);
}
function ha() {
  if (pe) return;
  no(), pe = document.createElement("div"), pe.className = "livue-progress-bar livue-progress-hidden", pe.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(ie.parent) || document.body).appendChild(pe);
}
function ma() {
  if (!gn) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), gn = !1, no());
}
function va(e) {
  Object.assign(ie, e), ma();
}
function Rt() {
  return ie.showOnRequest;
}
function ga() {
  Dt++, le === null && (ha(), le = 0, pe && pe.classList.remove("livue-progress-hidden"), Nn(ie.minimum), ie.trickle && (ur = setInterval(function() {
    ro();
  }, ie.trickleSpeed)));
}
function Nn(e) {
  le !== null && (e = da(e, ie.minimum, 1), le = e, pe && (pe.style.transform = "translate3d(" + pa(e) + "%, 0, 0)"));
}
function ro() {
  if (le === null || le >= 1) return;
  let e;
  le < 0.2 ? e = 0.1 : le < 0.5 ? e = 0.04 : le < 0.8 ? e = 0.02 : le < 0.99 ? e = 5e-3 : e = 0, Nn(le + e);
}
function io() {
  Dt = Math.max(0, Dt - 1), !(Dt > 0) && le !== null && (Nn(1), clearInterval(ur), ur = null, setTimeout(function() {
    pe && pe.classList.add("livue-progress-hidden"), setTimeout(function() {
      le = null, pe && (pe.style.transform = "translate3d(-100%, 0, 0)");
    }, ie.speed);
  }, ie.speed));
}
function ya() {
  Dt = 0, io();
}
function ba() {
  return le !== null;
}
function wa() {
  return le;
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
var bt = null, $r = !1, it = !1, ve = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, Ce = /* @__PURE__ */ new Map(), $e = /* @__PURE__ */ new Map(), cr = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new Map(), Pe = null;
function Sa(e) {
  Object.assign(ve, e), e.progressBarColor && je.configure({ color: e.progressBarColor });
}
function Ea(e) {
  bt = e, !$r && ($r = !0, Pe = oo(), history.replaceState(
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
          cr.set(t, i);
        }
      }
    }
  }
}
function La(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = cr.get(t);
      n && (clearTimeout(n), cr.delete(t));
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
  if ($e.has(t))
    return $e.get(t);
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
    return $e.delete(t), r.ok ? r.text().then(function(i) {
      return ve.cachePages && lo(t, i), i;
    }) : null;
  }).catch(function(r) {
    return $e.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return $e.set(t, n), n;
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
function Dr(e) {
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
        else if ($e.has(r))
          o = await $e.get(r);
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
            onSwap: function(A) {
              typeof A == "function" && A(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = Na(), p = /* @__PURE__ */ new Set();
        c.forEach(function(A) {
          A.livueIds.forEach(function(C) {
            p.add(C);
          });
        }), bt._stopObserver(), bt.destroyExcept(p), c.forEach(function(A) {
          A.element.parentNode && A.element.parentNode.removeChild(A.element);
        });
        var v = u.querySelector("title");
        v && (document.title = v.textContent), document.body.innerHTML = u.body.innerHTML, Ia(c);
        var h = u.querySelector('meta[name="csrf-token"]'), y = document.querySelector('meta[name="csrf-token"]');
        if (h && y && (y.setAttribute("content", h.getAttribute("content")), fa()), Ma(u), Pa(u), t && (Pe = oo(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Pe },
          "",
          r
        )), Ra(u), bt.rebootPreserving(), n)
          _a(Pe);
        else if (location.hash) {
          var S = document.querySelector(location.hash);
          S ? S.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (A) {
        console.error("[LiVue] Navigation failed:", A), window.location.href = e;
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
function Ur(e, t) {
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
function Jr() {
  return ja.slice();
}
var fr = [], dr = [], Vt = !1;
function Ha(e) {
  return e.isolate ? Fa(e) : new Promise(function(t, n) {
    fr.push({
      payload: e,
      resolve: t,
      reject: n
    }), Vt || (Vt = !0, queueMicrotask(uo));
  });
}
function qa(e) {
  return new Promise(function(t, n) {
    dr.push({
      payload: e,
      resolve: t,
      reject: n
    }), Vt || (Vt = !0, queueMicrotask(uo));
  });
}
async function uo() {
  var e = fr, t = dr;
  if (fr = [], dr = [], Vt = !1, !(e.length === 0 && t.length === 0)) {
    Rt() && je.start();
    var n = co(), r = ct(), i = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    r && (i["X-CSRF-TOKEN"] = r);
    var o = e.map(function(S) {
      return S.payload;
    }), a = t.map(function(S) {
      return S.payload;
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
      for (var p = u.responses || [], v = u.lazyResponses || [], c = 0; c < p.length; c++)
        if (p[c] && p[c].redirect) {
          Dr(p[c].redirect);
          return;
        }
      for (var c = 0; c < e.length; c++) {
        var h = p[c];
        if (!h) {
          e[c].reject(new Error("No response for component update at index " + c));
          continue;
        }
        if (h.error) {
          var y = new Error(h.error);
          y.status = h.status || 500, y.data = h, e[c].reject(y);
        } else if (h.errors) {
          var y = new Error("Validation failed");
          y.status = 422, y.data = h, e[c].reject(y);
        } else
          e[c].resolve(h);
      }
      for (var c = 0; c < t.length; c++) {
        var h = v[c];
        if (!h) {
          t[c].reject(new Error("No response for lazy load at index " + c));
          continue;
        }
        if (h.error) {
          var y = new Error(h.error);
          y.status = h.status || 500, y.data = h, t[c].reject(y);
        } else
          t[c].resolve(h);
      }
      me("request.finished", {
        url: n,
        success: !0,
        responses: p,
        lazyResponses: v,
        updateCount: e.length,
        lazyCount: t.length
      });
    } catch (S) {
      for (var c = 0; c < e.length; c++)
        e[c].reject(S);
      for (var c = 0; c < t.length; c++)
        t[c].reject(S);
      me("request.finished", {
        url: n,
        success: !1,
        error: S,
        updateCount: e.length,
        lazyCount: t.length
      });
    } finally {
      Rt() && je.done();
    }
  }
}
async function Fa(e) {
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
      return Dr(s.redirect), new Promise(function() {
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
let pr = null, fo = /* @__PURE__ */ new Map();
function za() {
  return _e({});
}
function be(e, t) {
  hr(e);
  for (let n in t)
    e[n] = t[n];
}
function hr(e) {
  for (let t in e)
    delete e[t];
}
function Wa(e) {
  pr = e;
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
  }), i ? !0 : (pr ? pr(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function Ba(e, t) {
  typeof t == "function" && fo.set(e, t);
}
function mr(e) {
  fo.delete(e);
}
var po = [];
function O(e, t, n) {
  po.push({
    name: e,
    directive: t
  });
}
function $a() {
  return po;
}
const Ve = /* @__PURE__ */ new Map(), He = /* @__PURE__ */ new Map();
let Xr = !1;
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
    return Xr || (Xr = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: c } = o, p = Ua(a, l);
    if (!p) continue;
    const v = l + ":" + a + ":" + s + ":" + e;
    if (He.has(v)) {
      r.push(v);
      continue;
    }
    const h = function(y) {
      try {
        n(u, y);
      } catch (S) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', S);
      }
    };
    if (l === "presence" && d)
      Ja(p, s, h);
    else {
      const y = c ? "." + s : s;
      p.listen(y, h);
    }
    He.set(v, {
      channel: p,
      channelKey: l + ":" + a,
      event: s,
      handler: h,
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
function Yr(e) {
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
function Kr() {
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
function Gr(e) {
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
function Cr() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function Qa(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = Cr();
    s.open("POST", u, !0);
    var d = ct();
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
function Fn(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = Cr() + "-remove", n = ct();
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
    l.forEach(function(p) {
      s.append("files[]", p);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = Cr();
    u.open("POST", d, !0);
    var c = ct();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(p) {
      if (p.lengthComputable) {
        var v = Math.round(p.loaded / p.total * 100);
        i({ overall: v });
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
        var v = new Error(p.error || p.message || "Upload failed");
        v.status = u.status, v.data = p, a(v);
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
          let c = i, p = o, v = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(p).catch(v);
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
function Zr(e) {
  let t = e + ":";
  for (let n of Ct.keys())
    n.startsWith(t) && Ct.delete(n);
  for (let n of Tt.keys())
    n.startsWith(t) && Tt.delete(n);
}
const bn = "livue-tab-sync";
let Tr = Date.now() + "-" + Math.random().toString(36).substr(2, 9), wn = null, Lr = /* @__PURE__ */ new Map(), Qr = !1;
function vo() {
  Qr || (Qr = !0, typeof BroadcastChannel < "u" ? (wn = new BroadcastChannel(bn), wn.onmessage = tl) : window.addEventListener("storage", nl));
}
function tl(e) {
  let t = e.data;
  t.tabId !== Tr && go(t);
}
function nl(e) {
  if (e.key === bn && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === Tr) return;
      go(t);
    } catch {
    }
}
function go(e) {
  let t = Lr.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function rl(e, t) {
  vo(), Lr.set(e, t);
}
function ei(e) {
  Lr.delete(e);
}
function il(e, t, n, r) {
  vo();
  let i = {
    tabId: Tr,
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
const kr = /* @__PURE__ */ new Map();
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
      const p = s.split(`
`);
      s = p.pop() || "";
      for (const v of p)
        if (v.trim())
          try {
            const h = JSON.parse(v);
            if (h.stream)
              ll(h.stream), n(h.stream);
            else {
              if (h.error)
                throw new Error(h.error);
              h.snapshot && (u = h);
            }
          } catch (h) {
            console.error("[LiVue Stream] Parse error:", h, v);
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
  const { to: t, content: n, replace: r } = e, i = kr.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function ti(e, t, n = !1) {
  kr.set(e, { el: t, replace: n });
}
function ni(e) {
  kr.delete(e);
}
function sl(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function Or(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    sl(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = Or(r) : t[n] = r;
  }
  return t;
}
function ul(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = Or(l), d = {};
    for (let c in s)
      d[c] = /* @__PURE__ */ (function(p, v) {
        return function() {
          let h = Array.prototype.slice.call(arguments);
          return t(p + "." + v, h);
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
    let i = Or(n[r]);
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
function vr(e, t, n, r, i, o, a) {
  a = a || {};
  let l = za(), s = n.name, u = n.vueMethods || {}, d = n.jsonMethods || [], c = n.confirms || {}, p = n.isolate || !1, v = n.urlParams || null, h = n.uploads || null, y = n.tabSync || null, S = !1, A = i, C = o, M = a.initialHtml || null, k = _e({}), w = [];
  function T() {
    for (let f = 0; f < w.length; f++)
      try {
        w[f]();
      } catch {
      }
    w = [];
  }
  function N(f) {
    if (T(), !!Array.isArray(f))
      for (let g = 0; g < f.length; g++) {
        let _ = f[g];
        if (!_ || typeof _ != "object" || !_.bridge || typeof _.bridge != "object") continue;
        let D = Ue(e, _.name, { scope: _.scope || "auto" });
        if (!D) continue;
        let m = _.bridge;
        for (let H in m) {
          let B = m[H];
          if (!B || typeof B != "object") continue;
          let Z = B.prop, $ = B.mode || "two-way";
          if (!(!Z || !(Z in t))) {
            if ($ === "two-way" || $ === "store-to-state") {
              let Y = Se(function() {
                return D[H];
              }, function(qe) {
                t[Z] !== qe && (t[Z] = qe);
              });
              w.push(Y);
            }
            if ($ === "two-way" || $ === "state-to-store") {
              let Y = Se(function() {
                return t[Z];
              }, function(qe) {
                D[H] !== qe && (D[H] = qe);
              });
              w.push(Y);
            }
          }
        }
      }
  }
  function I(f) {
    let g = la(e, f);
    for (let _ in g)
      k[_] = g[_];
    N(f);
  }
  I(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    T(), sa(e);
  });
  function x(f) {
    let g = document.querySelector('meta[name="livue-prefix"]'), D = "/" + (g ? g.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), m = document.createElement("a");
    m.href = D, m.download = f.name, m.style.display = "none", document.body.appendChild(m), m.click(), document.body.removeChild(m);
  }
  function L() {
    let f = Jt(A, t);
    return {
      snapshot: C,
      diffs: f
    };
  }
  function j(f, g) {
    if (f.redirect) {
      Dr(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let m = f.errorBoundary;
      b.errorState.hasError = m.hasError, b.errorState.errorMessage = m.errorMessage, b.errorState.errorDetails = m.errorDetails, b.errorState.recover = m.recover, (!m.errorHandled || !m.recover) && me("error.occurred", {
        error: new Error(m.errorMessage || "Component error"),
        componentName: s,
        componentId: e,
        context: { method: m.errorMethod, serverHandled: m.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && x(f.download), f.snapshot) {
      let m = JSON.parse(f.snapshot);
      if (m.state) {
        let H = lt(m.state);
        Uo(t, H), A = JSON.parse(JSON.stringify(H));
      }
      C = f.snapshot, m.memo && (m.memo.errors ? be(b.errors, m.memo.errors) : hr(b.errors), m.memo.vueMethods && (u = m.memo.vueMethods), m.memo.jsonMethods && (d = m.memo.jsonMethods), m.memo.urlParams && (v = m.memo.urlParams), m.memo.uploads && (h = m.memo.uploads), m.memo.confirms && (c = m.memo.confirms), (m.memo.composables || m.memo.composableActions) && cl(J, m.memo), m.memo.stores && I(m.memo.stores));
    }
    if (v && Za(v, t), (f.html || f.fragments) && r && r._updateTemplate) {
      let m = {};
      if (f.snapshot) {
        let H = JSON.parse(f.snapshot);
        H.memo && (H.memo.transitionType && (m.transitionType = H.memo.transitionType), H.memo.skipTransition && (m.skipTransition = !0));
      }
      if (f.fragments) {
        let H = M || (a.el ? a.el.innerHTML : null);
        if (H) {
          let B = dl(H, f.fragments);
          M = B, r._updateTemplate(B, m);
        }
      } else
        M = f.html, r._updateTemplate(f.html, m);
    }
    if (f.events && f.events.length > 0) {
      for (var _ = 0; _ < f.events.length; _++)
        f.events[_].sourceId = e;
      Ga(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var D = 0; D < f.js.length; D++)
        try {
          new Function("state", "livue", f.js[D])(t, b);
        } catch (m) {
          console.error("[LiVue] Error executing ->vue() JS:", m);
        }
    if (f.benchmark && me("benchmark.received", {
      componentId: e,
      componentName: s,
      timings: f.benchmark
    }), y && y.enabled && f.snapshot && !S && JSON.parse(f.snapshot).state) {
      let H = Bi(t), B = [];
      for (let Z in H)
        (!g || !(Z in g)) && B.push(Z);
      if (B.length > 0) {
        let Z = ol(H, B, y);
        Object.keys(Z).length > 0 && il(s, Z, B, y);
      }
    }
    if (S = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let q = _e({}), U = {}, J = {}, ne = function(f, g) {
    return b.call(f, g);
  };
  fl(n) && (J = ul(n, ne));
  let b = _e({
    loading: !1,
    processing: null,
    errors: l,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: q,
    refs: {},
    stores: k,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let g = Jt(A, t);
      return f === void 0 ? Object.keys(g).length > 0 : f in g;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = Jt(A, t);
      return new Set(Object.keys(f));
    },
    /**
     * Get the original (server-confirmed) value of a property.
     * @param {string} [property] - Property name, or omit for entire state
     * @returns {*}
     */
    getOriginal: function(f) {
      return f === void 0 ? JSON.parse(JSON.stringify(A)) : A[f] !== void 0 ? JSON.parse(JSON.stringify(A[f])) : void 0;
    },
    /**
     * Reset a property to its original (server-confirmed) value.
     * @param {string} property - Property name to reset
     */
    resetProperty: function(f) {
      f in A && (t[f] = JSON.parse(JSON.stringify(A[f])));
    },
    /**
     * Reset all properties to their original (server-confirmed) values.
     */
    resetAll: function() {
      for (let f in A)
        f in t && (t[f] = JSON.parse(JSON.stringify(A[f])));
    },
    /**
     * Check if a specific action (or any action) is loading.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {boolean}
     */
    isLoading: function(f) {
      return f ? q[f] || !1 : b.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let g = f ? q[f] || !1 : b.loading;
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
    call: async function(f, g, _) {
      let D, m = null;
      if (arguments.length === 1 ? D = [] : arguments.length === 2 ? Array.isArray(g) ? D = g : D = [g] : arguments.length >= 3 && (Array.isArray(g) && _ && typeof _ == "object" && (_.debounce || _.throttle) ? (D = g, m = _) : D = Array.prototype.slice.call(arguments, 1)), U[f])
        return U[f](b, D);
      if (u[f]) {
        try {
          new Function("state", "livue", u[f])(t, b);
        } catch (Z) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', Z);
        }
        return;
      }
      let H = d.includes(f), B = async function() {
        if (c[f] && !await b._showConfirm(c[f]))
          return;
        b.loading = !0, b.processing = f, q[f] = !0;
        let Z;
        try {
          let $ = L(), Y = await qn($.snapshot, f, D, $.diffs, p || H);
          Z = j(Y, $.diffs);
        } catch ($) {
          if (H)
            throw { status: $.status, errors: $.data && $.data.errors, message: $.message };
          $.status === 422 && $.data && $.data.errors ? be(b.errors, $.data.errors) : Ye($, s);
        } finally {
          b.loading = !1, b.processing = null, delete q[f];
        }
        return Z;
      };
      return m && m.debounce ? st(e + ":" + f, m.debounce)(B) : m && m.throttle ? jt(e + ":" + f, m.throttle)(B) : B();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, g) {
      let _ = Array.prototype.slice.call(arguments, 2), D = { message: g || "Are you sure?" };
      if (await b._showConfirm(D))
        return b.call.apply(b, [f].concat(_));
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
    set: function(f, g) {
      t[f] = g;
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
    store: function(f, g, _) {
      if (g === void 0) {
        let D = Ue(e, f, _ || { scope: "auto" });
        if (D)
          return D;
        throw new Error('[LiVue] store("' + f + '"): store not found. Provide a definition or register it in PHP.');
      }
      return Ar(e, f, g, _);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(f) {
      let g = Ue(e, f, { scope: "auto" });
      if (g)
        return k[f] = g, g;
      throw new Error('[LiVue] useStore("' + f + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(f) {
      let g = Ue(e, f, { scope: "global" });
      if (g)
        return k[f] = g, g;
      throw new Error('[LiVue] useGlobalStore("' + f + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      b.loading = !0, b.processing = "$sync";
      try {
        let f = L(), g = await qn(f.snapshot, null, [], f.diffs, p);
        j(g, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? be(b.errors, f.data.errors) : Ye(f, s);
      } finally {
        b.loading = !1, b.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      hr(b.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, g) {
      ln(f, g, "broadcast", s, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, g, _) {
      ln(g, _, "to", s, e, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, g) {
      ln(f, g, "self", s, e, null);
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
    upload: async function(f, g) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var _ = jn(t, f);
      _ && _.__livue_upload && _.ref && Fn([_.ref]), b.uploading = !0, b.uploadProgress = 0;
      try {
        var D = await Qa(g, s, f, h[f].token, function(m) {
          b.uploadProgress = m;
        });
        Ut(t, f, {
          __livue_upload: !0,
          ref: D.ref,
          originalName: D.originalName,
          mimeType: D.mimeType,
          size: D.size,
          previewUrl: D.previewUrl
        });
      } catch (m) {
        m.status === 422 && m.data && m.data.errors ? be(b.errors, m.data.errors) : Ye(m, s);
      } finally {
        b.uploading = !1, b.uploadProgress = 0;
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
    uploadMultiple: async function(f, g) {
      if (!h || !h[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      b.uploading = !0, b.uploadProgress = 0;
      try {
        var _ = await el(g, s, f, h[f].token, function(Y) {
          b.uploadProgress = Y.overall;
        }), D = _.results || [], m = _.errors || [], H = jn(t, f), B = Array.isArray(H) ? H : [];
        if (D.length > 0) {
          var Z = D.map(function(Y) {
            return {
              __livue_upload: !0,
              ref: Y.ref,
              originalName: Y.originalName,
              mimeType: Y.mimeType,
              size: Y.size,
              previewUrl: Y.previewUrl
            };
          });
          Ut(t, f, B.concat(Z));
        }
        if (m.length > 0) {
          var $ = {};
          m.forEach(function(Y) {
            var qe = f + "." + Y.index;
            $[qe] = {
              file: Y.file,
              message: Y.error
            };
          }), be(b.errors, $);
        }
      } catch (Y) {
        Y.status === 422 && Y.data && Y.data.errors ? be(b.errors, Y.data.errors) : Ye(Y, s);
      } finally {
        b.uploading = !1, b.uploadProgress = 0;
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
    removeUpload: function(f, g) {
      var _ = jn(t, f);
      if (g !== void 0 && Array.isArray(_)) {
        var D = _[g];
        D && D.__livue_upload && D.ref && Fn([D.ref]), _.splice(g, 1), Ut(t, f, _.slice());
      } else
        _ && _.__livue_upload && _.ref && Fn([_.ref]), Ut(t, f, null);
    },
    /**
     * Call a method using HTTP streaming.
     * Streams content in real-time to elements with v-stream directive.
     *
     * @param {string} method - Method name to call
     * @param {Array} [params] - Method parameters
     * @returns {Promise<*>} Final result after streaming completes
     */
    stream: async function(f, g) {
      g = g || [], b.loading = !0, b.streaming = !0, b.processing = f, b.streamingMethod = f, q[f] = !0;
      let _;
      try {
        let D = L();
        D.method = f, D.params = g, D.componentId = e;
        let m = await al(D, {
          onChunk: function(H) {
          },
          onComplete: function(H) {
          },
          onError: function(H) {
            console.error("[LiVue Stream] Error:", H);
          }
        });
        m && (_ = j(m, D.diffs));
      } catch (D) {
        D.status === 422 && D.data && D.data.errors ? be(b.errors, D.data.errors) : Ye(D, s);
      } finally {
        b.loading = !1, b.streaming = !1, b.processing = null, b.streamingMethod = null, delete q[f];
      }
      return _;
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
    watch: function(f, g) {
      return typeof g != "function" ? (console.warn("[LiVue] watch callback must be a function"), function() {
      }) : Se(
        function() {
          return t[f];
        },
        function(_, D) {
          g(_, D);
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
      }) : (Ba(e, f), function() {
        mr(e);
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
      b.errorState.hasError = !1, b.errorState.errorMessage = null, b.errorState.errorDetails = null;
    },
    /**
     * Update the server-side state baseline and snapshot.
     * Used internally when a parent re-renders and reactive props are synced.
     * @param {object} newServerState - New plain state (unwrapped)
     * @param {string} newSnapshot - New opaque snapshot JSON string
     * @private
     */
    _updateServerState: function(f, g) {
      A = JSON.parse(JSON.stringify(f)), C = g;
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
      let f = Jt(A, t), g = {};
      for (let _ in J) {
        let D = J[_], m = {}, H = [];
        for (let B in D)
          if (typeof D[B] == "function")
            H.push(B);
          else
            try {
              m[B] = JSON.parse(JSON.stringify(D[B]));
            } catch {
              m[B] = "[Unserializable]";
            }
        g[_] = { data: m, actions: H };
      }
      return {
        serverState: JSON.parse(JSON.stringify(A)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: s,
          isolate: p,
          urlParams: v,
          tabSync: y,
          hasUploads: !!h,
          uploadProps: h ? Object.keys(h) : [],
          vueMethods: Object.keys(u),
          confirmMethods: Object.keys(c),
          composableNames: Object.keys(J)
        },
        composables: g,
        uploading: b.uploading,
        uploadProgress: b.uploadProgress,
        streaming: b.streaming,
        streamingMethod: b.streamingMethod,
        errorState: {
          hasError: b.errorState.hasError,
          errorMessage: b.errorState.errorMessage
        }
      };
    }
  });
  for (let f in J)
    b[f] = J[f];
  async function G() {
    b.loading = !0, b.processing = "$refresh", q.$refresh = !0;
    try {
      let f = L(), g = await qn(f.snapshot, null, [], f.diffs, p);
      return j(g, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? be(b.errors, f.data.errors) : Ye(f, s);
    } finally {
      b.loading = !1, b.processing = null, delete q.$refresh;
    }
  }
  U.$refresh = function() {
    return G();
  }, y && y.enabled && rl(s, function(f, g, _) {
    let D = !1;
    if (_.reactive === !0)
      D = !0;
    else if (Array.isArray(_.reactive) && _.reactive.length > 0) {
      for (let m in f)
        if (_.reactive.includes(m)) {
          D = !0;
          break;
        }
    }
    if (D) {
      for (let m in f)
        _.only && !_.only.includes(m) || _.except && _.except.includes(m) || m in t && (t[m] = f[m]);
      S = !0, b.sync();
      return;
    }
    for (let m in f)
      _.only && !_.only.includes(m) || _.except && _.except.includes(m) || m in t && (t[m] = f[m]);
    for (let m in f)
      _.only && !_.only.includes(m) || _.except && _.except.includes(m) || (A[m] = JSON.parse(JSON.stringify(f[m])));
  });
  var ce = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(b, {
    get: function(f, g, _) {
      if (g in f || typeof g == "symbol")
        return Reflect.get(f, g, _);
      if (typeof g == "string" && g.startsWith("$") && U[g])
        return function() {
          var D = Array.prototype.slice.call(arguments);
          return U[g](b, D);
        };
      if (typeof g == "string" && !g.startsWith("$") && !ce[g])
        return function() {
          var D = Array.prototype.slice.call(arguments);
          return b.call(g, ...D);
        };
    },
    set: function(f, g, _, D) {
      return Reflect.set(f, g, _, D);
    },
    has: function(f, g) {
      return typeof g == "string" && g.startsWith("$") && U[g] ? !0 : Reflect.has(f, g);
    }
  }), composables: J };
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
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", c = JSON.parse(d), p = c.memo ? c.memo.name : "", v = lt(c.state || {}), h = c.memo || {}, y = s.innerHTML, S = s.tagName.toLowerCase(), A = s.nextElementSibling;
    for (; A; ) {
      let L = A.nextElementSibling;
      if (A.tagName === "SCRIPT" && A.getAttribute("type") === "application/livue-setup")
        y += A.outerHTML, A.parentNode.removeChild(A);
      else
        break;
      A = L;
    }
    let C = t._childRegistry[u];
    if (!C)
      for (let L in t._childRegistry) {
        let j = t._childRegistry[L];
        if (j.name === p && !o[L]) {
          C = j;
          break;
        }
      }
    if (C) {
      o[C.id] = !0, C.rootTag = S;
      let L = h.reactive || [];
      if (L.length > 0) {
        for (var M = 0; M < L.length; M++) {
          var k = L[M];
          k in v && (C.state[k] = v[k]);
        }
        C.livue._updateServerState(v, d), C.componentRef && C.componentRef._updateTemplate && C.componentRef._updateTemplate(y);
      }
    }
    let w = !C;
    if (!C) {
      let j = "livue-child-" + Yo();
      t._versions[j] = 0;
      let q = ir(v), U = JSON.parse(JSON.stringify(v)), J = Object.assign({ name: h.name || p }, h), ne = { _updateTemplate: null }, b = so(), G = vr(u, q, J, ne, U, d, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: b
      }), ce = G.livue, $t = G.composables;
      me("component.init", {
        component: { id: u, name: p, state: q, livue: ce },
        el: s,
        cleanup: b.cleanup,
        isChild: !0
      });
      let f = h.errors || null;
      f && be(ce.errors, f), C = {
        tagName: j,
        state: q,
        memo: J,
        livue: ce,
        composables: $t,
        componentRef: ne,
        name: p,
        id: u,
        rootTag: S
      };
      let g = h.listeners || null;
      if (g)
        for (let D in g)
          (function(m, H) {
            yn(D, p, u, function(B) {
              H.call(m, B);
            });
          })(g[D], ce);
      let _ = h.echo || null;
      _ && _.length && (function(D, m) {
        ho(D, _, function(H, B) {
          m.call(H, B);
        });
      })(u, ce), ne._updateTemplate = function(D) {
        let m = t.el.querySelector('[data-livue-id="' + u + '"]');
        m && Ui(m);
        let H = sn(D, t), B = Sn(
          "<" + C.rootTag + ">" + H.template + "</" + C.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let $ in H.childDefs)
          t.vueApp._context.components[$] || t.vueApp.component($, H.childDefs[$]);
        t.vueApp._context.components[C.tagName]._updateRender(B), On(function() {
          let $ = t.el.querySelector('[data-livue-id="' + u + '"]');
          $ && Ji($);
        });
      }, t._childRegistry[u] = C;
    }
    let T = C.tagName, N = s.dataset.livueRef;
    N && t._rootLivue && (t._rootLivue.refs[N] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(L, j) {
        return C.livue.call(L, j || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(L, j) {
        return C.livue.set(L, j);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(L, j) {
        return C.livue.dispatch(L, j);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return C.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return C.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return C.livue;
      }
    });
    let I = s.dataset.livueModel;
    if (I && t._rootState && yn("$modelUpdate", C.name, u, function(L) {
      L && L.value !== void 0 && (t._rootState[I] = L.value);
    }), w) {
      let L = Sn(
        "<" + S + ">" + y + "</" + S + ">",
        'data-livue-id="' + u + '"'
      );
      i[T] = sr(
        L,
        C.state,
        C.livue,
        C.composables || {},
        t._versions,
        C.name
      );
    }
    t._versions[T] === void 0 && (t._versions[T] = 0);
    let x = document.createElement(T);
    x.setAttribute(":key", "livueV['" + T + "']"), s.parentNode.replaceChild(x, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let ri = 0;
function gr() {
  return typeof document < "u" && "startViewTransition" in document;
}
const zn = /* @__PURE__ */ new WeakMap();
function ii() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const pl = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (ri++, r = "livue-transition-" + ri), zn.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), gr() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    ii();
  },
  updated(e, t) {
    let n = zn.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), gr() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    zn.delete(e), e.removeAttribute("data-livue-transition"), ii();
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
      let r = Mt(!1), i = _r(null), o = null, a = Mt(null);
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
        let c = "lazy-" + Wn + "-" + Date.now(), p = d.memo ? d.memo.name : "", v = lt(d.state || {}), h = d.memo || {}, { createLivueHelper: y, buildComponentDef: S, processTemplate: A, createReactiveState: C } = e._lazyHelpers, M = C(v), k = JSON.parse(JSON.stringify(v)), w = { _updateTemplate: null }, T = y(
          c,
          M,
          h,
          w,
          k,
          u.snapshot
        );
        h.errors && be(T.errors, h.errors);
        let N = "livue-lazy-child-" + Wn, I = A(u.html, e), x = Sn(
          I.template,
          'data-livue-id="' + c + '"'
        ), L = S(x, M, T, e._versions, p);
        e._childRegistry[c] = {
          tagName: N,
          state: M,
          memo: h,
          livue: T,
          componentRef: w,
          name: p,
          id: c
        }, w._updateTemplate = function(q) {
          let U = A(q, e), J = Sn(
            U.template,
            'data-livue-id="' + c + '"'
          );
          for (let b in U.childDefs)
            e.vueApp._context.components[b] || e.vueApp.component(b, U.childDefs[b]);
          let ne = S(J, M, T, e._versions, p);
          e.vueApp._context.components[N] = ne, e._versions[N] = (e._versions[N] || 0) + 1, i.value = ne;
        };
        let j = h.listeners || null;
        if (j)
          for (let q in j)
            (function(U, J) {
              yn(q, p, c, function(ne) {
                J.call(U, ne);
              });
            })(j[q], T);
        for (let q in I.childDefs)
          e.vueApp._context.components[q] || e.vueApp.component(q, I.childDefs[q]);
        e._versions[N] = 0, e.vueApp._context.components[N] || e.vueApp.component(N, L), i.value = L, r.value = !0;
      }
      return zi(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Fi(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? Vr(i.value) : Vr("div", { ref: a }, n.slots.default ? n.slots.default() : null);
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
      createLivueHelper: vr,
      buildComponentDef: sr,
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
      _updateTemplate: function(y, S) {
        S = S || {}, me("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: y
        });
        var A = ml(r.el);
        Ui(r.el);
        let C = sn(y, r);
        if (!r.vueApp) return;
        for (let k in C.childDefs)
          r.vueApp._context.components[k] || r.vueApp.component(k, C.childDefs[k]);
        function M() {
          r._currentRootDef._updateRender(C.template), On(function() {
            Ji(r.el), vl(r.el, A), me("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (S.skipTransition) {
          M();
          return;
        }
        gr() ? hl(M, { type: S.transitionType }) : M();
      }
    }, o = JSON.parse(JSON.stringify(lt(t.state || {})));
    this._cleanups = so();
    let a = vr(this.componentId, this.state, this.memo, i, o, n, {
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
      for (let y in c)
        (function(S, A, C, M) {
          yn(y, C, M, function(k) {
            A.call(S, k);
          });
        })(c[y], l, r.name, r.componentId);
    let p = t.memo && t.memo.echo || null;
    p && p.length && (this._echoUnsubscribe = ho(r.componentId, p, function(y, S) {
      l.call(y, S);
    }));
    let v = sr(u.template, r.state, l, s, r._versions, r.name);
    this._currentRootDef = v, this._rootDefRef = _r(v), this.vueApp = Bo({
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
    let i = $a();
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Gr(t), Zr(t), mr(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && ei(n.name), Yr(t);
    }
    if (me("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Gr(this.componentId), Zr(this.componentId), mr(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && ei(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), Yr(this.componentId), this.vueApp) {
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
let oi = /* @__PURE__ */ new Set();
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
    oi.has(u) || (oi.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, Bn = /* @__PURE__ */ new WeakMap(), wl = {
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
      let h = parseInt(s, 10);
      isNaN(h) || (d = h + "px");
    }
    let c = l.leave === !0, p = !1, v = new IntersectionObserver(
      function(h) {
        let y = h[0];
        (c ? !y.isIntersecting : y.isIntersecting) && (!l.once || !p) && (p = !0, r.call(o, a), l.once && (v.disconnect(), Xt.delete(e)));
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
var En = /* @__PURE__ */ new Set(), tt = /* @__PURE__ */ new WeakMap(), ai = !1;
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
function yr(e) {
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
function li() {
  En.forEach(function(e) {
    e.isConnected ? yr(e) : (En.delete(e), tt.delete(e));
  });
}
function _l() {
  ai || (ai = !0, window.addEventListener("popstate", li), window.addEventListener("livue:navigated", li));
}
const Al = {
  mounted(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), En.add(e), _l(), yr(e);
  },
  updated(e, t) {
    tt.set(e, { value: t.value, modifiers: t.modifiers || {} }), yr(e);
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
let si = 0;
const Dl = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    si++;
    let n = "livue-ignore-" + si;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, dt = /* @__PURE__ */ new WeakMap();
let ui = 0;
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
function ci(e, t) {
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
    ui++;
    let s = "model-" + ui, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = Tl(l);
    l.live && !d && !c && (d = 150);
    function p(w) {
      if (l.number) {
        let T = Number(w);
        w = isNaN(T) ? 0 : T;
      }
      l.boolean && (w = !!w && w !== "false" && w !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = w : o[a] = w;
    }
    function v(w) {
      d > 0 ? st(s, d)(function() {
        p(w);
      }) : c > 0 ? jt(s, c)(function() {
        p(w);
      }) : p(w);
    }
    let h;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? h = o[a].value : h = o[a];
    let y = Ll(n), S = n.component, A = null, C = null, M = null, k = null;
    if (y && S)
      k = S.emit, S.emit = function(w, ...T) {
        if (w === "update:modelValue") {
          let N = T[0];
          v(N);
          return;
        }
        return k.call(S, w, ...T);
      }, S.props && "modelValue" in S.props && (M = Se(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(w) {
          S.vnode && S.vnode.props && (S.vnode.props.modelValue = w), S.exposed && typeof S.exposed.setValue == "function" && S.exposed.setValue(w), S.update && S.update();
        },
        { immediate: !0 }
      )), dt.set(e, {
        isComponent: !0,
        componentInstance: S,
        originalEmit: k,
        stopWatcher: M,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let w = st(s, d);
        A = function(T) {
          let N = Yt(T.target);
          w(function() {
            p(N);
          });
        };
      } else if (c > 0) {
        let w = jt(s, c);
        A = function(T) {
          let N = Yt(T.target);
          w(function() {
            p(N);
          });
        };
      } else
        A = function(w) {
          p(Yt(w.target));
        };
      l.enter ? (C = function(w) {
        w.key === "Enter" && p(Yt(w.target));
      }, e.addEventListener("keyup", C)) : e.addEventListener(u, A), ci(e, h), dt.set(e, {
        isComponent: !1,
        handler: A,
        keyHandler: C,
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
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], ci(e, a);
    }
  },
  unmounted(e) {
    let t = dt.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), dt.delete(e));
  }
}, $n = /* @__PURE__ */ new WeakMap(), Ol = 2500;
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
    function p() {
      c.isPaused || d && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function v() {
      c.intervalId || (c.intervalId = setInterval(p, s));
    }
    function h() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(y) {
        c.isVisible = y[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(e)), document.addEventListener("visibilitychange", h), c.visibilityHandler = h, v(), $n.set(e, c);
  },
  unmounted(e) {
    let t = $n.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), $n.delete(e));
  }
}, Kt = /* @__PURE__ */ new WeakMap();
let _n = typeof navigator < "u" ? navigator.onLine : !0, An = /* @__PURE__ */ new Set(), fi = !1;
function Il() {
  fi || typeof window > "u" || (fi = !0, window.addEventListener("online", function() {
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
let di = 0;
const pt = /* @__PURE__ */ new WeakMap(), Un = /* @__PURE__ */ new Map(), Pl = {
  created(e, t) {
    di++;
    let n = "livue-replace-" + di, r = t.modifiers.self === !0;
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
}, ht = /* @__PURE__ */ new WeakMap(), pi = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, Rl = 200;
function Vl(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(pi))
    if (e[t])
      return pi[t];
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
    mt.set(e, { targetId: n }), ti(n, e, r);
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
      ni(n.targetId);
      const i = t.modifiers.replace || !1;
      ti(r, e, i), mt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = mt.get(e);
    t && (ni(t.targetId), mt.delete(e));
  }
}, hi = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, mi = ["ctrl", "alt", "shift", "meta"];
let vi = 0;
const gi = /* @__PURE__ */ new Set();
function Fl(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function zl(e, t) {
  for (let i = 0; i < mi.length; i++) {
    let o = mi[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in hi)
    t[i] && (n = !0, e.key === hi[i] && (r = !0));
  return !(n && !r);
}
function W(e, t = {}) {
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
        const T = "v-" + e;
        gi.has(T) || (console.warn(
          "[LiVue] " + T + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), gi.add(T));
      }
      vi++;
      const p = "v-" + e + "-" + vi, v = Fl(d);
      let h = null, y = null;
      d.debounce && (h = st(p, v)), d.throttle && (y = jt(p, v));
      let S = !1, A = null;
      i && u && (A = u);
      const C = function(T) {
        let N = A, I = [];
        if (i && u) {
          N = u;
          const L = l.value;
          L != null && (I = Array.isArray(L) ? L : [L]);
        } else {
          const L = l.value;
          if (typeof L == "function")
            if (typeof L.__livueMethodName == "string")
              N = L.__livueMethodName, Array.isArray(L.__livueMethodArgs) && (I = L.__livueMethodArgs.slice());
            else {
              const j = function() {
                L();
              };
              h ? h(j) : y ? y(j) : j();
              return;
            }
          else typeof L == "string" ? N = L : Array.isArray(L) && L.length > 0 && (N = L[0], I = L.slice(1));
        }
        if (!N) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const x = function() {
          d.confirm ? c.callWithConfirm(N, "Are you sure?", ...I) : c.call(N, ...I);
        };
        h ? h(x) : y ? y(x) : x();
      }, M = function(T) {
        if (!(d.self && T.target !== a) && !(r && !zl(T, d))) {
          if (d.once) {
            if (S)
              return;
            S = !0;
          }
          d.prevent && T.preventDefault(), d.stop && T.stopPropagation(), C();
        }
      }, k = {};
      d.capture && (k.capture = !0), d.passive && (k.passive = !0);
      const w = {
        handler: M,
        options: k,
        outsideHandler: null
      };
      if (n && d.outside) {
        const T = function(N) {
          if (!a.contains(N.target) && N.target !== a) {
            if (d.once) {
              if (S)
                return;
              S = !0;
            }
            C();
          }
        };
        document.addEventListener(e, T, k), w.outsideHandler = T;
      } else
        a.addEventListener(e, M, k);
      o.set(a, w);
    },
    updated(a, l, s) {
    },
    unmounted(a) {
      const l = o.get(a);
      l && (l.outsideHandler ? document.removeEventListener(e, l.outsideHandler, l.options) : a.removeEventListener(e, l.handler, l.options), o.delete(a));
    }
  };
}
const Wl = W("click", {
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
let yi = 0;
const $l = {
  created(e, t) {
    let n = t.value;
    n || (yi++, n = "scroll-" + yi), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, vt = /* @__PURE__ */ new WeakMap();
function bi(e, t, n, r, i) {
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
        bi(e, i, o, l, s);
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
        bi(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = vt.get(e);
    t && (t.stopWatch && t.stopWatch(), vt.delete(e));
  }
}, Zt = /* @__PURE__ */ new WeakMap();
let wi = 0;
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
    wi++;
    let s = "watch-" + i + "-" + wi;
    if (l.blur) {
      let p = function() {
        o.sync();
      };
      e.addEventListener("focusout", p), Zt.set(e, { blurHandler: p });
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
let Si = 0;
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
function Ft(e, t, n) {
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
function zt(e, t) {
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
      Si++;
      let d = e + "-" + Si, c = ns(n);
      if (!c) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let p = t(c, s, l, u, d);
      c.addEventListener(p.eventType, p.handler, { capture: !0 }), Lt.set(n, {
        targetEl: c,
        handler: p.handler,
        eventType: p.eventType
      });
    },
    unmounted(n) {
      let r = Lt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), Lt.delete(n));
    }
  };
}
const rs = zt("debounce", function(e, t, n, r, i) {
  let o = yo(r) || 150, a = st(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = qt(l.target);
      a(function() {
        Ft(n, t, s);
      });
    }
  };
}), is = zt("throttle", function(e, t, n, r, i) {
  let o = yo(r) || 150, a = jt(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = qt(l.target);
      a(function() {
        Ft(n, t, s);
      });
    }
  };
}), xr = zt("blur", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    Ft(n, t, qt(l.target));
  };
  return e.addEventListener("blur", a), e._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), os = xr.unmounted;
xr.unmounted = function(e) {
  let t = Lt.get(e), n = t ? t.targetEl : e;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), os(e);
};
const Nr = zt("enter", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && Ft(n, t, qt(l.target));
  };
  return e.addEventListener("keyup", a), e._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), as = Nr.unmounted;
Nr.unmounted = function(e) {
  let t = Lt.get(e), n = t ? t.targetEl : e;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), as(e);
};
const ls = zt("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = qt(o.target);
      a = !!a && a !== "false" && a !== "0", Ft(n, t, a);
    }
  };
});
function Ei(e, t) {
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
    t % 2 ? Ei(Object(n), !0).forEach(function(r) {
      ss(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ei(Object(n)).forEach(function(r) {
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
var ke = Te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Wt = Te(/Edge/i), _i = Te(/firefox/i), kt = Te(/safari/i) && !Te(/chrome/i) && !Te(/android/i), Ir = Te(/iP(ad|od|hone)/i), bo = Te(/chrome/i) && Te(/android/i), wo = {
  capture: !1,
  passive: !1
};
function z(e, t, n) {
  e.addEventListener(t, n, !ke && wo);
}
function F(e, t, n) {
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
var Ai = /\s+/g;
function fe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(Ai, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(Ai, " ");
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
          var p = i.getBoundingClientRect();
          a -= p.top + parseInt(P(i, "border-top-width")), l -= p.left + parseInt(P(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var v = at(i || e), h = v && v.a, y = v && v.d;
      v && (a /= y, l /= h, c /= h, d /= y, s = a + d, u = l + c);
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
function Di(e, t, n) {
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
function Mr(e, t) {
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
function Ci(e) {
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
var ue = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
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
        var s = 0, u = l.target, d = u.fromRect, c = te(u), p = u.prevFromRect, v = u.prevToRect, h = l.rect, y = at(u, !0);
        y && (c.top -= y.f, c.left -= y.e), u.toRect = c, u.thisAnimationDuration && Xn(p, c) && !Xn(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (h.top - c.top) / (h.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = gs(h, p, v, i.options)), Xn(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, h, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
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
}, Bt = {
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
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, d = e.oldDraggableIndex, c = e.newDraggableIndex, p = e.originalEvent, v = e.putSortable, h = e.extraEventProperties;
  if (t = t || n && n[ue], !!t) {
    var y, S = t.options, A = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !ke && !Wt ? y = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (y = document.createEvent("Event"), y.initEvent(r, !0, !0)), y.to = a || n, y.from = l || n, y.item = i || n, y.clone = o, y.oldIndex = s, y.newIndex = u, y.oldDraggableIndex = d, y.newDraggableIndex = c, y.originalEvent = p, y.pullMode = v ? v.lastPutMode : void 0;
    var C = De(De({}, h), Bt.getEventProperties(r, t));
    for (var M in C)
      y[M] = C[M];
    n && n.dispatchEvent(y), S[A] && S[A].call(t, y);
  }
}
var bs = ["evt"], se = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = cs(r, bs);
  Bt.pluginEvent.bind(R)(t, n, De({
    dragEl: E,
    parentEl: Q,
    ghostEl: V,
    rootEl: X,
    nextEl: Be,
    lastDownEl: cn,
    cloneEl: K,
    cloneHidden: Me,
    dragStarted: wt,
    putSortable: re,
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
      ae({
        sortable: n,
        name: l,
        originalEvent: i
      });
    }
  }, o));
};
function ae(e) {
  ys(De({
    putSortable: re,
    cloneEl: K,
    targetEl: E,
    rootEl: X,
    oldIndex: nt,
    oldDraggableIndex: xt,
    newIndex: de,
    newDraggableIndex: xe
  }, e));
}
var E, Q, V, X, Be, cn, K, Me, nt, de, xt, xe, Qt, re, et = !1, Cn = !1, Tn = [], Fe, ge, Kn, Gn, Ti, Li, wt, Ge, Nt, It = !1, en = !1, fn, oe, Zn = [], br = !1, Ln = [], Mn = typeof document < "u", tn = Ir, ki = Wt || ke ? "cssFloat" : "float", ws = Mn && !bo && !Ir && "draggable" in document.createElement("div"), To = (function() {
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
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[ki] === "none" || a && r[ki] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Ss = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, Es = function(t, n) {
  var r;
  return Tn.some(function(i) {
    var o = i[ue].options.emptyInsertThreshold;
    if (!(!o || Mr(i))) {
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
      var p = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === p || o.join && o.indexOf(p) > -1;
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
var ze = function(t) {
  if (E) {
    t = t.touches ? t.touches[0] : t;
    var n = Es(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[ue]._onDragOver(r);
    }
  }
}, _s = function(t) {
  E && E.parentNode[ue]._isOutsideThisEl(t.target);
};
function R(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = Le({}, t), e[ue] = this;
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
    supportPointer: R.supportPointer !== !1 && "PointerEvent" in window && (!kt || Ir),
    emptyInsertThreshold: 5
  };
  Bt.initializePlugins(this, e, n);
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
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, E) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, d = i.filter;
      if (xs(r), !E && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && kt && s && s.tagName.toUpperCase() === "SELECT") && (s = we(s, i.draggable, r, !1), !(s && s.animated) && cn !== s)) {
        if (nt = he(s), xt = he(s, i.draggable), typeof d == "function") {
          if (d.call(this, t, s, this)) {
            ae({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: r,
              fromEl: r
            }), se("filter", n, {
              evt: t
            }), o && t.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(c) {
          if (c = we(u, c.trim(), r, !1), c)
            return ae({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              fromEl: r,
              toEl: r
            }), se("filter", n, {
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
    if (r && !E && r.parentNode === o) {
      var u = te(r);
      if (X = o, E = r, Q = E.parentNode, Be = E.nextSibling, cn = r, Qt = a.group, R.dragged = E, Fe = {
        target: E,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, Ti = Fe.clientX - u.left, Li = Fe.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, E.style["will-change"] = "all", s = function() {
        if (se("delayEnded", i, {
          evt: t
        }), R.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !_i && i.nativeDraggable && (E.draggable = !0), i._triggerDragStart(t, n), ae({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), fe(E, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Eo(E, d.trim(), Qn);
      }), z(l, "dragover", ze), z(l, "mousemove", ze), z(l, "touchmove", ze), a.supportPointer ? (z(l, "pointerup", i._onDrop), !this.nativeDraggable && z(l, "pointercancel", i._onDrop)) : (z(l, "mouseup", i._onDrop), z(l, "touchend", i._onDrop), z(l, "touchcancel", i._onDrop)), _i && this.nativeDraggable && (this.options.touchStartThreshold = 4, E.draggable = !0), se("delayStart", this, {
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
    E && Qn(E), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    F(t, "mouseup", this._disableDelayedDrag), F(t, "touchend", this._disableDelayedDrag), F(t, "touchcancel", this._disableDelayedDrag), F(t, "pointerup", this._disableDelayedDrag), F(t, "pointercancel", this._disableDelayedDrag), F(t, "mousemove", this._delayedDragTouchMoveHandler), F(t, "touchmove", this._delayedDragTouchMoveHandler), F(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? z(document, "pointermove", this._onTouchMove) : n ? z(document, "touchmove", this._onTouchMove) : z(document, "mousemove", this._onTouchMove) : (z(E, "dragend", this), z(X, "dragstart", this._onDragStart));
    try {
      document.selection ? dn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (et = !1, X && E) {
      se("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && z(document, "dragover", _s);
      var r = this.options;
      !t && fe(E, r.dragClass, !1), fe(E, r.ghostClass, !0), R.active = this, t && this._appendGhost(), ae({
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
      if (E.parentNode[ue]._isOutsideThisEl(t), n)
        do {
          if (n[ue]) {
            var r = void 0;
            if (r = n[ue]._onDragOver({
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
    if (Fe) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = V && at(V, !0), l = V && a && a.a, s = V && a && a.d, u = tn && oe && Ci(oe), d = (o.clientX - Fe.clientX + i.x) / (l || 1) + (u ? u[0] - Zn[0] : 0) / (l || 1), c = (o.clientY - Fe.clientY + i.y) / (s || 1) + (u ? u[1] - Zn[1] : 0) / (s || 1);
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
        var p = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(V, "webkitTransform", p), P(V, "mozTransform", p), P(V, "msTransform", p), P(V, "transform", p), Kn = d, Gn = c, ge = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!V) {
      var t = this.options.fallbackOnBody ? document.body : X, n = te(E, !0, tn, !0, t), r = this.options;
      if (tn) {
        for (oe = t; P(oe, "position") === "static" && P(oe, "transform") === "none" && oe !== document; )
          oe = oe.parentNode;
        oe !== document.body && oe !== document.documentElement ? (oe === document && (oe = Ae()), n.top += oe.scrollTop, n.left += oe.scrollLeft) : oe = Ae(), Zn = Ci(oe);
      }
      V = E.cloneNode(!0), fe(V, r.ghostClass, !1), fe(V, r.fallbackClass, !0), fe(V, r.dragClass, !0), P(V, "transition", ""), P(V, "transform", ""), P(V, "box-sizing", "border-box"), P(V, "margin", 0), P(V, "top", n.top), P(V, "left", n.left), P(V, "width", n.width), P(V, "height", n.height), P(V, "opacity", "0.8"), P(V, "position", tn ? "absolute" : "fixed"), P(V, "zIndex", "100000"), P(V, "pointerEvents", "none"), R.ghost = V, t.appendChild(V), P(V, "transform-origin", Ti / parseInt(V.style.width) * 100 + "% " + Li / parseInt(V.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, i = t.dataTransfer, o = r.options;
    if (se("dragStart", this, {
      evt: t
    }), R.eventCanceled) {
      this._onDrop();
      return;
    }
    se("setupClone", this), R.eventCanceled || (K = Do(E), K.removeAttribute("id"), K.draggable = !1, K.style["will-change"] = "", this._hideClone(), fe(K, this.options.chosenClass, !1), R.clone = K), r.cloneId = dn(function() {
      se("clone", r), !R.eventCanceled && (r.options.removeCloneOnHide || X.insertBefore(K, E), r._hideClone(), ae({
        sortable: r,
        name: "clone"
      }));
    }), !n && fe(E, o.dragClass, !0), n ? (Cn = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (F(document, "mouseup", r._onDrop), F(document, "touchend", r._onDrop), F(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, E)), z(document, "drop", r), P(E, "transform", "translateZ(0)")), et = !0, r._dragStartId = dn(r._dragStarted.bind(r, n, t)), z(document, "selectstart", r), wt = !0, window.getSelection().removeAllRanges(), kt && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = R.active, d = Qt === s, c = l.sort, p = re || u, v, h = this, y = !1;
    if (br) return;
    function S(ce, $t) {
      se(ce, h, De({
        evt: t,
        isOwner: d,
        axis: v ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: p,
        target: r,
        completed: C,
        onMove: function(g, _) {
          return nn(X, n, E, i, g, te(g), t, _);
        },
        changed: M
      }, $t));
    }
    function A() {
      S("dragOverAnimationCapture"), h.captureAnimationState(), h !== p && p.captureAnimationState();
    }
    function C(ce) {
      return S("dragOverCompleted", {
        insertion: ce
      }), ce && (d ? u._hideClone() : u._showClone(h), h !== p && (fe(E, re ? re.options.ghostClass : u.options.ghostClass, !1), fe(E, l.ghostClass, !0)), re !== h && h !== R.active ? re = h : h === R.active && re && (re = null), p === h && (h._ignoreWhileAnimating = r), h.animateAll(function() {
        S("dragOverAnimationComplete"), h._ignoreWhileAnimating = null;
      }), h !== p && (p.animateAll(), p._ignoreWhileAnimating = null)), (r === E && !E.animated || r === n && !r.animated) && (Ge = null), !l.dragoverBubble && !t.rootEl && r !== document && (E.parentNode[ue]._isOutsideThisEl(t.target), !ce && ze(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), y = !0;
    }
    function M() {
      de = he(E), xe = he(E, l.draggable), ae({
        sortable: h,
        name: "change",
        toEl: n,
        newIndex: de,
        newDraggableIndex: xe,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = we(r, l.draggable, n, !0), S("dragOver"), R.eventCanceled) return y;
    if (E.contains(t.target) || r.animated && r.animatingX && r.animatingY || h._ignoreWhileAnimating === r)
      return C(!1);
    if (Cn = !1, u && !l.disabled && (d ? c || (a = Q !== X) : re === this || (this.lastPutMode = Qt.checkPull(this, u, E, t)) && s.checkPut(this, u, E, t))) {
      if (v = this._getDirection(t, r) === "vertical", i = te(E), S("dragOverValid"), R.eventCanceled) return y;
      if (a)
        return Q = X, A(), this._hideClone(), S("revert"), R.eventCanceled || (Be ? X.insertBefore(E, Be) : X.appendChild(E)), C(!0);
      var k = Mr(n, l.draggable);
      if (!k || Ts(t, v, this) && !k.animated) {
        if (k === E)
          return C(!1);
        if (k && n === t.target && (r = k), r && (o = te(r)), nn(X, n, E, i, r, o, t, !!r) !== !1)
          return A(), k && k.nextSibling ? n.insertBefore(E, k.nextSibling) : n.appendChild(E), Q = n, M(), C(!0);
      } else if (k && Cs(t, v, this)) {
        var w = ut(n, 0, l, !0);
        if (w === E)
          return C(!1);
        if (r = w, o = te(r), nn(X, n, E, i, r, o, t, !1) !== !1)
          return A(), n.insertBefore(E, w), Q = n, M(), C(!0);
      } else if (r.parentNode === n) {
        o = te(r);
        var T = 0, N, I = E.parentNode !== n, x = !Ss(E.animated && E.toRect || i, r.animated && r.toRect || o, v), L = v ? "top" : "left", j = Di(r, "top", "top") || Di(E, "top", "top"), q = j ? j.scrollTop : void 0;
        Ge !== r && (N = o[L], It = !1, en = !x && l.invertSwap || I), T = Ls(t, r, o, v, x ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, en, Ge === r);
        var U;
        if (T !== 0) {
          var J = he(E);
          do
            J -= T, U = Q.children[J];
          while (U && (P(U, "display") === "none" || U === V));
        }
        if (T === 0 || U === r)
          return C(!1);
        Ge = r, Nt = T;
        var ne = r.nextElementSibling, b = !1;
        b = T === 1;
        var G = nn(X, n, E, i, r, o, t, b);
        if (G !== !1)
          return (G === 1 || G === -1) && (b = G === 1), br = !0, setTimeout(Ds, 30), A(), b && !ne ? n.appendChild(E) : r.parentNode.insertBefore(E, b ? ne : r), j && Ao(j, 0, q - j.scrollTop), Q = E.parentNode, N !== void 0 && !en && (fn = Math.abs(N - te(r)[L])), M(), C(!0);
      }
      if (n.contains(E))
        return C(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    F(document, "mousemove", this._onTouchMove), F(document, "touchmove", this._onTouchMove), F(document, "pointermove", this._onTouchMove), F(document, "dragover", ze), F(document, "mousemove", ze), F(document, "touchmove", ze);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    F(t, "mouseup", this._onDrop), F(t, "touchend", this._onDrop), F(t, "pointerup", this._onDrop), F(t, "pointercancel", this._onDrop), F(t, "touchcancel", this._onDrop), F(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (de = he(E), xe = he(E, r.draggable), se("drop", this, {
      evt: t
    }), Q = E && E.parentNode, de = he(E), xe = he(E, r.draggable), R.eventCanceled) {
      this._nulling();
      return;
    }
    et = !1, en = !1, It = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), wr(this.cloneId), wr(this._dragStartId), this.nativeDraggable && (F(document, "drop", this), F(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), kt && P(document.body, "user-select", ""), P(E, "transform", ""), t && (wt && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), V && V.parentNode && V.parentNode.removeChild(V), (X === Q || re && re.lastPutMode !== "clone") && K && K.parentNode && K.parentNode.removeChild(K), E && (this.nativeDraggable && F(E, "dragend", this), Qn(E), E.style["will-change"] = "", wt && !et && fe(E, re ? re.options.ghostClass : this.options.ghostClass, !1), fe(E, this.options.chosenClass, !1), ae({
      sortable: this,
      name: "unchoose",
      toEl: Q,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), X !== Q ? (de >= 0 && (ae({
      rootEl: Q,
      name: "add",
      toEl: Q,
      fromEl: X,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "remove",
      toEl: Q,
      originalEvent: t
    }), ae({
      rootEl: Q,
      name: "sort",
      toEl: Q,
      fromEl: X,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: Q,
      originalEvent: t
    })), re && re.save()) : de !== nt && de >= 0 && (ae({
      sortable: this,
      name: "update",
      toEl: Q,
      originalEvent: t
    }), ae({
      sortable: this,
      name: "sort",
      toEl: Q,
      originalEvent: t
    })), R.active && ((de == null || de === -1) && (de = nt, xe = xt), ae({
      sortable: this,
      name: "end",
      toEl: Q,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    se("nulling", this), X = E = Q = V = Be = K = cn = Me = Fe = ge = wt = de = xe = nt = xt = Ge = Nt = re = Qt = R.dragged = R.ghost = R.clone = R.active = null, Ln.forEach(function(t) {
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
        E && (this._onDragOver(t), As(t));
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
    var i = Bt.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && ko(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    se("destroy", this);
    var t = this.el;
    t[ue] = null, F(t, "mousedown", this._onTapStart), F(t, "touchstart", this._onTapStart), F(t, "pointerdown", this._onTapStart), this.nativeDraggable && (F(t, "dragover", this), F(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Tn.splice(Tn.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Me) {
      if (se("hideClone", this), R.eventCanceled) return;
      P(K, "display", "none"), this.options.removeCloneOnHide && K.parentNode && K.parentNode.removeChild(K), Me = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Me) {
      if (se("showClone", this), R.eventCanceled) return;
      E.parentNode == X && !this.options.group.revertClone ? X.insertBefore(K, E) : Be ? X.insertBefore(K, Be) : X.appendChild(K), this.options.group.revertClone && this.animate(E, K), P(K, "display", ""), Me = !1;
    }
  }
};
function As(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function nn(e, t, n, r, i, o, a, l) {
  var s, u = e[ue], d = u.options.onMove, c;
  return window.CustomEvent && !ke && !Wt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || te(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function Qn(e) {
  e.draggable = !1;
}
function Ds() {
  br = !1;
}
function Cs(e, t, n) {
  var r = te(ut(n.el, 0, n.options, !0)), i = Co(n.el, n.options, V), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Ts(e, t, n) {
  var r = te(Mr(n.el, n.options.draggable)), i = Co(n.el, n.options, V), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Ls(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, p = !1;
  if (!a) {
    if (l && fn < u * i) {
      if (!It && (Nt === 1 ? s > d + u * o / 2 : s < c - u * o / 2) && (It = !0), It)
        p = !0;
      else if (Nt === 1 ? s < d + fn : s > c - fn)
        return -Nt;
    } else if (s > d + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return ks(t);
  }
  return p = p || a, p && (s < d + u * o / 2 || s > c - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function ks(e) {
  return he(E) < he(e) ? 1 : -1;
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
function wr(e) {
  return clearTimeout(e);
}
Mn && z(document, "touchmove", function(e) {
  (R.active || et) && e.cancelable && e.preventDefault();
});
R.utils = {
  on: z,
  off: F,
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
  cancelNextTick: wr,
  detectDirection: Lo,
  getChild: ut,
  expando: ue
};
R.get = function(e) {
  return e[ue];
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
R.version = fs;
var ee = [], St, Sr, Er = !1, er, tr, kn, Et;
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
      this.sortable.nativeDraggable ? F(document, "dragover", this._handleAutoScroll) : (F(document, "pointermove", this._handleFallbackAutoScroll), F(document, "touchmove", this._handleFallbackAutoScroll), F(document, "mousemove", this._handleFallbackAutoScroll)), Oi(), pn(), hs();
    },
    nulling: function() {
      kn = Sr = St = Er = Et = er = tr = null, ee.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (kn = n, r || this.options.forceAutoScrollFallback || Wt || ke || kt) {
        nr(n, this.options, l, r);
        var s = Re(l, !0);
        Er && (!Et || o !== er || a !== tr) && (Et && Oi(), Et = setInterval(function() {
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
function Oi() {
  clearInterval(Et);
}
var nr = _o(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Ae(), u = !1, d;
    Sr !== n && (Sr = n, pn(), St = t.scroll, d = t.scrollFn, St === !0 && (St = Re(n, !0)));
    var c = 0, p = St;
    do {
      var v = p, h = te(v), y = h.top, S = h.bottom, A = h.left, C = h.right, M = h.width, k = h.height, w = void 0, T = void 0, N = v.scrollWidth, I = v.scrollHeight, x = P(v), L = v.scrollLeft, j = v.scrollTop;
      v === s ? (w = M < N && (x.overflowX === "auto" || x.overflowX === "scroll" || x.overflowX === "visible"), T = k < I && (x.overflowY === "auto" || x.overflowY === "scroll" || x.overflowY === "visible")) : (w = M < N && (x.overflowX === "auto" || x.overflowX === "scroll"), T = k < I && (x.overflowY === "auto" || x.overflowY === "scroll"));
      var q = w && (Math.abs(C - i) <= a && L + M < N) - (Math.abs(A - i) <= a && !!L), U = T && (Math.abs(S - o) <= a && j + k < I) - (Math.abs(y - o) <= a && !!j);
      if (!ee[c])
        for (var J = 0; J <= c; J++)
          ee[J] || (ee[J] = {});
      (ee[c].vx != q || ee[c].vy != U || ee[c].el !== v) && (ee[c].el = v, ee[c].vx = q, ee[c].vy = U, clearInterval(ee[c].pid), (q != 0 || U != 0) && (u = !0, ee[c].pid = setInterval(function() {
        r && this.layer === 0 && R.active._onTouchMove(kn);
        var ne = ee[this.layer].vy ? ee[this.layer].vy * l : 0, b = ee[this.layer].vx ? ee[this.layer].vx * l : 0;
        typeof d == "function" && d.call(R.dragged.parentNode[ue], b, ne, e, kn, ee[this.layer].el) !== "continue" || Ao(ee[this.layer].el, b, ne);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (t.bubbleScroll && p !== s && (p = Re(p, !1)));
    Er = u;
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
function Pr() {
}
Pr.prototype = {
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
Le(Pr, {
  pluginName: "revertOnSpill"
});
function Rr() {
}
Rr.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: No
};
Le(Rr, {
  pluginName: "removeOnSpill"
});
R.mount(new Ns());
R.mount(Rr, Pr);
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
      onEnd: function(p) {
        let v = p.newIndex, h = p.oldIndex;
        if (h === v)
          return;
        let y = rn.get(e), S = y ? y.value : null, A = typeof S == "string";
        if (Array.isArray(S)) {
          let M = p.from;
          h < v ? M.insertBefore(p.item, M.children[h]) : M.insertBefore(p.item, M.children[h + 1]);
          let k = S.splice(h, 1)[0];
          S.splice(v, 0, k);
          return;
        }
        if (A && r) {
          let M = S, k = [], w = p.item, T = hn.get(w);
          T === void 0 && (T = w.dataset.livueSortItem), typeof T == "string" && /^\d+$/.test(T) && (T = parseInt(T, 10));
          let N = p.from, I = p.to, x = [T, v].concat(k);
          if (N !== I) {
            let j = I.dataset.livueSortMethod;
            j && (M = j);
            let q = N.dataset.livueSortId || N.dataset.livueSortGroup || null;
            x.push(q);
          }
          r.call(M, x);
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
}, Hs = W("dblclick"), qs = W("mousedown"), Fs = W("mouseup"), zs = W("mouseenter"), Ws = W("mouseleave"), Bs = W("mouseover"), $s = W("mouseout"), Us = W("mousemove"), Js = W("contextmenu"), Xs = W("keydown", { isKeyboardEvent: !0 }), Ys = W("keyup", { isKeyboardEvent: !0 }), Ks = W("keypress", { isKeyboardEvent: !0 }), Gs = W("focus"), Zs = W("focusin"), Qs = W("focusout"), eu = W("touchstart"), tu = W("touchend"), nu = W("touchmove"), ru = W("touchcancel"), iu = W("change"), ou = W("input"), au = W("reset"), lu = W("dragstart"), su = W("dragend"), uu = W("dragenter"), cu = W("dragleave"), fu = W("dragover"), du = W("drop"), pu = W("copy"), hu = W("cut"), mu = W("paste"), vu = W("wheel"), gu = W("resize");
function yu() {
  O("init", bl), O("submit", wl), O("intersect", Sl), O("current", Al), O("ignore", Dl), O("model-livue", kl), O("debounce", rs), O("throttle", is), O("blur", xr), O("enter", Nr), O("boolean", ls), O("poll", Nl), O("offline", Ml), O("transition", pl), O("replace", Pl), O("loading", jl), O("target", Hl), O("stream", ql), O("click", Wl), O("navigate", Bl), O("scroll", $l), O("dirty", Ul), O("watch", Kl), O("sort", Ms), O("sort-item", Ps), O("sort-handle", Rs), O("sort-ignore", Vs), O("sort-group", js), O("dblclick", Hs), O("mousedown", qs), O("mouseup", Fs), O("mouseenter", zs), O("mouseleave", Ws), O("mouseover", Bs), O("mouseout", $s), O("mousemove", Us), O("contextmenu", Js), O("keydown", Xs), O("keyup", Ys), O("keypress", Ks), O("focus", Gs), O("focusin", Zs), O("focusout", Qs), O("touchstart", eu), O("touchend", tu), O("touchmove", nu), O("touchcancel", ru), O("change", iu), O("input", ou), O("reset", au), O("dragstart", lu), O("dragend", su), O("dragenter", uu), O("dragleave", cu), O("dragover", fu), O("drop", du), O("copy", pu), O("cut", hu), O("paste", mu), O("wheel", vu), O("resize", gu);
}
let Ne = null, gt = null, xi = !1;
function bu() {
  if (xi)
    return;
  xi = !0;
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
        Ni();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, gt = setTimeout(function() {
        Ni();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Ni() {
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
    if (Ii(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        Ii(r, i.name, i.state, e);
      }
  }), e;
}
function Ii(e, t, n, r) {
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
    }.bind(this)), Ea(this), this._startObserver(), Su(this);
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
    return Ur(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Jr();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), Kr();
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
    }), Kr();
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
      var n = Jr();
      n.forEach(function(r) {
        var i = Ur(r, function(o) {
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
  e.id = "livue-styles", e.textContent = $o, document.head.appendChild(e);
}
var ye = window.LiVueConfig || {};
(ye.showProgressBar !== void 0 || ye.progressBarColor !== void 0 || ye.prefetch !== void 0 || ye.prefetchOnHover !== void 0 || ye.hoverDelay !== void 0 || ye.cachePages !== void 0 || ye.maxCacheSize !== void 0 || ye.restoreScroll !== void 0) && Rn.configureNavigation(ye);
ye.showProgressOnRequest !== void 0 && Rn.progress.configure({ showOnRequest: ye.showProgressOnRequest });
function Mi() {
  Rn.boot();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Mi) : queueMicrotask(Mi);
window.LiVue = Rn;
export {
  Rn as default
};
//# sourceMappingURL=livue.esm.js.map
