import * as gn from "vue";
import { reactive as ke, toRefs as No, effectScope as Lo, ref as nn, markRaw as ko, hasInjectionContext as Ja, inject as Do, isRef as Wn, isReactive as Oo, toRaw as Xa, getCurrentScope as Ka, onScopeDispose as Ya, watch as Ce, nextTick as or, computed as Mo, provide as Ga, onBeforeUnmount as Za, onBeforeMount as Qa, onUnmounted as Io, onMounted as Ro, readonly as el, watchEffect as tl, shallowRef as ri, defineComponent as nl, h as xi, createApp as rl } from "vue";
const il = '[v-cloak]{display:none!important}::view-transition-old(root),::view-transition-new(root){animation-duration:.2s}@keyframes livue-fade-out{0%{opacity:1}to{opacity:0}}@keyframes livue-fade-in{0%{opacity:0}to{opacity:1}}@keyframes livue-slide-out-left{0%{transform:translate(0);opacity:1}to{transform:translate(-20px);opacity:0}}@keyframes livue-slide-in-right{0%{transform:translate(20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes livue-slide-out-right{0%{transform:translate(0);opacity:1}to{transform:translate(20px);opacity:0}}@keyframes livue-slide-in-left{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}[style*="view-transition-name: livue-transition"]::view-transition-old,[style*="view-transition-name: livue-transition"]::view-transition-new{animation-duration:.2s}.livue-transition-forward::view-transition-old(step-content){animation:livue-slide-out-left .25s ease-out}.livue-transition-forward::view-transition-new(step-content){animation:livue-slide-in-right .25s ease-in}.livue-transition-backward::view-transition-old(step-content){animation:livue-slide-out-right .25s ease-out}.livue-transition-backward::view-transition-new(step-content){animation:livue-slide-in-left .25s ease-in}.livue-transition-forward::view-transition-old(page-number){animation:livue-slide-out-left .3s ease-out}.livue-transition-forward::view-transition-new(page-number){animation:livue-slide-in-right .3s ease-out}.livue-transition-backward::view-transition-old(page-number){animation:livue-slide-out-right .3s ease-out}.livue-transition-backward::view-transition-new(page-number){animation:livue-slide-in-left .3s ease-out}.livue-sort-ghost{opacity:.4;background:#c8ebfb}.livue-sort-chosen{background:#f0f9ff}.livue-sort-drag{background:#fff;box-shadow:0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f}[data-livue-sort-handle]{cursor:move;cursor:grab}[data-livue-sort-handle]:active{cursor:grabbing}.sortable-drag{user-select:none}';
function Po(e, t) {
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
function Ci(e) {
  return JSON.stringify(e, Po);
}
function Ir(e) {
  return ke(Object.assign({}, e));
}
function ol(e, t) {
  let n;
  for (n in t) {
    let r = Ci(e[n]), i = Ci(t[n]);
    r !== i && (e[n] = t[n]);
  }
  for (n in e)
    n in t || delete e[n];
}
function qo(e) {
  return JSON.parse(JSON.stringify(e, Po));
}
function al(e) {
  return No(e);
}
function vr(e, t) {
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
function bn(e, t, n) {
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
function yn(e, t) {
  let n = {}, r = qo(t);
  for (let i in r)
    JSON.stringify(r[i]) !== JSON.stringify(e[i]) && (n[i] = r[i]);
  return n;
}
function ll(e) {
  return Array.isArray(e) && e.length === 2 && e[1] && typeof e[1] == "object" && !Array.isArray(e[1]) && e[1].s;
}
function Rr(e) {
  if (ll(e))
    return e[0];
  if (Array.isArray(e))
    return e.map(Rr);
  if (e && typeof e == "object") {
    let t = {};
    for (let n in e)
      t[n] = Rr(e[n]);
    return t;
  }
  return e;
}
function St(e) {
  let t = {};
  for (let n in e)
    t[n] = Rr(e[n]);
  return t;
}
let Ti = 0;
function sl() {
  return Ti++, Ti;
}
let zo = /* @__PURE__ */ new Map();
function ul(e) {
  let t = [];
  return e.querySelectorAll("input, textarea, select").forEach(function(r, i) {
    let o = { index: i };
    r.type === "checkbox" || r.type === "radio" ? o.checked = r.checked : r.tagName === "SELECT" ? (o.value = r.value, r.multiple && (o.selectedOptions = Array.from(r.selectedOptions).map(function(a) {
      return a.value;
    }))) : o.value = r.value, t.push(o);
  }), t;
}
function cl(e, t) {
  let n = e.querySelectorAll("input, textarea, select");
  t.forEach(function(r) {
    let i = n[r.index];
    i && (i.type === "checkbox" || i.type === "radio" ? i.checked = r.checked : i.tagName === "SELECT" && i.multiple && r.selectedOptions ? Array.from(i.options).forEach(function(o) {
      o.selected = r.selectedOptions.includes(o.value);
    }) : r.value !== void 0 && (i.value = r.value));
  });
}
function Vo(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = n.hasAttribute("data-livue-ignore-self");
    zo.set(r, {
      html: n.innerHTML,
      isSelf: i,
      inputs: ul(n)
    });
  });
}
function jo(e) {
  e.querySelectorAll("[data-livue-ignore-id]").forEach(function(n) {
    let r = n.getAttribute("data-livue-ignore-id"), i = zo.get(r);
    i && (i.isSelf || (n.innerHTML = i.html), i.inputs && i.inputs.length > 0 && cl(n, i.inputs));
  });
}
let Ho;
const ar = (e) => Ho = e, $o = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Pr(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ft;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ft || (Ft = {}));
function Ai() {
  const e = Lo(!0), t = e.run(() => nn({}));
  let n = [], r = [];
  const i = ko({
    install(o) {
      ar(i), i._a = o, o.provide($o, i), o.config.globalProperties.$pinia = i, r.forEach((a) => n.push(a)), r = [];
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
const Bo = () => {
};
function Ni(e, t, n, r = Bo) {
  e.add(t);
  const i = () => {
    e.delete(t) && r();
  };
  return !n && Ka() && Ya(i), i;
}
function ut(e, ...t) {
  e.forEach((n) => {
    n(...t);
  });
}
const dl = (e) => e(), Li = /* @__PURE__ */ Symbol(), mr = /* @__PURE__ */ Symbol();
function qr(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e[n];
    Pr(i) && Pr(r) && e.hasOwnProperty(n) && !Wn(r) && !Oo(r) ? e[n] = qr(i, r) : e[n] = r;
  }
  return e;
}
const fl = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function pl(e) {
  return !Pr(e) || !Object.prototype.hasOwnProperty.call(e, fl);
}
const { assign: He } = Object;
function vl(e) {
  return !!(Wn(e) && e.effect);
}
function ml(e, t, n, r) {
  const { state: i, actions: o, getters: a } = t, l = n.state.value[e];
  let s;
  function u() {
    l || (n.state.value[e] = i ? i() : {});
    const d = No(n.state.value[e]);
    return He(d, o, Object.keys(a || {}).reduce((c, v) => (c[v] = ko(Mo(() => {
      ar(n);
      const h = n._s.get(e);
      return a[v].call(h, h);
    })), c), {}));
  }
  return s = Fo(e, u, t, n, r, !0), s;
}
function Fo(e, t, n = {}, r, i, o) {
  let a;
  const l = He({ actions: {} }, n), s = { deep: !0 };
  let u, d, c = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Set(), h;
  const p = r.state.value[e];
  !o && !p && (r.state.value[e] = {}), nn({});
  let m;
  function g(R) {
    let D;
    u = d = !1, typeof R == "function" ? (R(r.state.value[e]), D = {
      type: Ft.patchFunction,
      storeId: e,
      events: h
    }) : (qr(r.state.value[e], R), D = {
      type: Ft.patchObject,
      payload: R,
      storeId: e,
      events: h
    });
    const k = m = /* @__PURE__ */ Symbol();
    or().then(() => {
      m === k && (u = !0);
    }), d = !0, ut(c, D, r.state.value[e]);
  }
  const _ = o ? function() {
    const { state: D } = n, k = D ? D() : {};
    this.$patch((j) => {
      He(j, k);
    });
  } : (
    /* istanbul ignore next */
    Bo
  );
  function E() {
    a.stop(), c.clear(), v.clear(), r._s.delete(e);
  }
  const A = (R, D = "") => {
    if (Li in R)
      return R[mr] = D, R;
    const k = function() {
      ar(r);
      const j = Array.from(arguments), Y = /* @__PURE__ */ new Set(), K = /* @__PURE__ */ new Set();
      function U(X) {
        Y.add(X);
      }
      function G(X) {
        K.add(X);
      }
      ut(v, {
        args: j,
        name: k[mr],
        store: w,
        after: U,
        onError: G
      });
      let J;
      try {
        J = R.apply(this && this.$id === e ? this : w, j);
      } catch (X) {
        throw ut(K, X), X;
      }
      return J instanceof Promise ? J.then((X) => (ut(Y, X), X)).catch((X) => (ut(K, X), Promise.reject(X))) : (ut(Y, J), J);
    };
    return k[Li] = !0, k[mr] = D, k;
  }, C = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Ni.bind(null, v),
    $patch: g,
    $reset: _,
    $subscribe(R, D = {}) {
      const k = Ni(c, R, D.detached, () => j()), j = a.run(() => Ce(() => r.state.value[e], (Y) => {
        (D.flush === "sync" ? d : u) && R({
          storeId: e,
          type: Ft.direct,
          events: h
        }, Y);
      }, He({}, s, D)));
      return k;
    },
    $dispose: E
  }, w = ke(C);
  r._s.set(e, w);
  const M = (r._a && r._a.runWithContext || dl)(() => r._e.run(() => (a = Lo()).run(() => t({ action: A }))));
  for (const R in M) {
    const D = M[R];
    if (Wn(D) && !vl(D) || Oo(D))
      o || (p && pl(D) && (Wn(D) ? D.value = p[R] : qr(D, p[R])), r.state.value[e][R] = D);
    else if (typeof D == "function") {
      const k = A(D, R);
      M[R] = k, l.actions[R] = D;
    }
  }
  return He(w, M), He(Xa(w), M), Object.defineProperty(w, "$state", {
    get: () => r.state.value[e],
    set: (R) => {
      g((D) => {
        He(D, R);
      });
    }
  }), r._p.forEach((R) => {
    He(w, a.run(() => R({
      store: w,
      app: r._a,
      pinia: r,
      options: l
    })));
  }), p && o && n.hydrate && n.hydrate(w.$state, p), u = !0, d = !0, w;
}
// @__NO_SIDE_EFFECTS__
function hl(e, t, n) {
  let r;
  const i = typeof t == "function";
  r = i ? n : t;
  function o(a, l) {
    const s = Ja();
    return a = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    a || (s ? Do($o, null) : null), a && ar(a), a = Ho, a._s.has(e) || (i ? Fo(e, t, r, a) : ml(e, r, a)), a._s.get(e);
  }
  return o.$id = e, o;
}
let rn = /* @__PURE__ */ new Map();
function gl(e) {
  return e && e.scope === "global" ? "global" : "component";
}
function zt(e, t, n) {
  return gl(n) === "global" ? t : e + ":" + t;
}
function Wo(e) {
  return JSON.parse(JSON.stringify(e));
}
function bl(e, t) {
  if (!e || typeof e != "object" || !e.$state || typeof t != "object" || t === null)
    return;
  let n = Object.keys(e.$state);
  for (let r = 0; r < n.length; r++)
    Object.prototype.hasOwnProperty.call(t, n[r]) || delete e.$state[n[r]];
  e.$patch(Wo(t));
}
function ii(e, t, n, r, i) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
  if (!n || typeof n != "object" && typeof n != "function")
    throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
  let o = zt(e, t, r), a = rn.get(o);
  return a ? a.definition !== n && console.warn('[LiVue] store("' + o + '") is already registered. Reusing the first definition.') : (a = { useStore: /* @__PURE__ */ hl(o, n), definition: n }, rn.set(o, a)), a.useStore(i);
}
function ot(e, t, n, r) {
  if (typeof t != "string" || t.trim() === "")
    throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
  let i = n && n.scope ? n.scope : "auto", o = [];
  i === "component" ? o.push(zt(e, t, { scope: "component" })) : i === "global" ? o.push(zt(e, t, { scope: "global" })) : (o.push(zt(e, t, { scope: "component" })), o.push(zt(e, t, { scope: "global" })));
  for (let a = 0; a < o.length; a++) {
    let l = rn.get(o[a]);
    if (l)
      return l.useStore(r);
  }
  return null;
}
function yl(e, t, n) {
  let r = {};
  if (!Array.isArray(t) || t.length === 0)
    return r;
  for (let i = 0; i < t.length; i++) {
    let o = t[i];
    if (!o || typeof o != "object" || typeof o.name != "string" || o.name.trim() === "") continue;
    let a = o.scope === "global" ? "global" : "component", l = St(o.state || {}), s = ot(e, o.name, { scope: a }, n);
    if (s) {
      bl(s, l), r[o.name] = s;
      continue;
    }
    let u = {
      state: function() {
        return Wo(l);
      }
    }, d = ii(e, o.name, u, { scope: a }, n);
    r[o.name] = d;
  }
  return r;
}
function _l(e) {
  let t = e + ":", n = Array.from(rn.keys());
  for (let r = 0; r < n.length; r++)
    n[r].startsWith(t) && rn.delete(n[r]);
}
let Uo = {
  ref: nn,
  computed: Mo,
  watch: Ce,
  watchEffect: tl,
  reactive: ke,
  readonly: el,
  onMounted: Ro,
  onUnmounted: Io,
  onBeforeMount: Qa,
  onBeforeUnmount: Za,
  nextTick: or,
  provide: Ga,
  inject: Do
}, zr = Object.keys(Uo), wl = zr.map(function(e) {
  return Uo[e];
});
function ki(e) {
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
function El(e, t, n, r) {
  let i = Object.keys(t), o = i.map(function(m) {
    return t[m];
  }), a = r || {}, l = Object.keys(a), s = l.map(function(m) {
    return a[m];
  });
  function u(m) {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(m);
  }
  function d(m, g, _) {
    let E = n && n.$id ? n.$id : "", A = n && n._pinia ? n._pinia : void 0;
    if (g === void 0) {
      let C = ot(E, m, _ || {}, A);
      if (C)
        return C;
      throw new Error("[LiVue] store(name): store not found. Provide a definition or register it in PHP.");
    }
    return ii(E, m, g, _, A);
  }
  function c(m) {
    let g = n && n.$id ? n.$id : "", _ = n && n._pinia ? n._pinia : void 0, E = ot(g, m, { scope: "auto" }, _);
    if (!E)
      throw new Error('[LiVue] useStore("' + m + '"): store not found.');
    return E;
  }
  let v = [], h = [];
  function p(m, g) {
    if (!u(m))
      return;
    let _ = v.indexOf(m);
    if (_ === -1) {
      v.push(m), h.push(g);
      return;
    }
    h[_] = g;
  }
  for (let m = 0; m < zr.length; m++)
    p(zr[m], wl[m]);
  for (let m = 0; m < i.length; m++)
    p(i[m], o[m]);
  for (let m = 0; m < l.length; m++)
    p(l[m], s[m]);
  p("livue", n), p("store", d), p("useStore", c);
  try {
    let g = new (Function.prototype.bind.apply(
      Function,
      [null].concat(v).concat([e])
    ))().apply(null, h);
    return g && typeof g == "object" ? g : null;
  } catch (m) {
    return console.error("[LiVue] Error executing @script setup code:", m), null;
  }
}
function Di(e) {
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
const Oi = [
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
function Sl(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Mi(e) {
  let t = e.replace(/\$errors\b/g, "lvErrors");
  for (let n = 0; n < Oi.length; n++) {
    let r = Oi[n], i = new RegExp(Sl(r) + "\\b(?=\\s*\\()", "g");
    t = t.replace(i, "livue." + r);
  }
  return t;
}
function Jo(e) {
  if (!(!e || typeof e != "object") && (e.dynamicChildren = null, Array.isArray(e.children)))
    for (let t = 0; t < e.children.length; t++)
      Jo(e.children[t]);
}
function Vr(e, t, n, r, i, o) {
  let a = ki(e), l = Di(a.html);
  l = Mi(l), a.html = l;
  let s;
  try {
    s = gn.compile(a.html);
  } catch (p) {
    console.error('[LiVue] Template compilation error in "' + (o || "unknown") + '":', p), s = gn.compile(
      '<div style="padding:8px;border:2px solid #f00;color:#f00;font-family:monospace">[LiVue] Template error: ' + (p.message || "compilation failed") + "</div>"
    );
  }
  let u = ri(s), d = [], c = !1;
  function v(p, m) {
    let g = u.value;
    c = !0;
    let _;
    try {
      _ = g(p, d);
    } finally {
      c = !1;
    }
    return Jo(_), _;
  }
  v._rc = !0;
  let h = {
    name: o || "LiVueComponent",
    render: v,
    setup: function() {
      gn.provide("livue", n);
      let p = al(t);
      var m = new Proxy(n.errors, {
        get: function(C, w, N) {
          var M = Reflect.get(C, w, N);
          return Array.isArray(M) ? M[0] : M;
        }
      });
      let g = Object.assign({}, p, r, { livue: n, stores: n.stores, livueV: i, lvErrors: m });
      if (a.setupCode) {
        let C = El(a.setupCode, p, n, r);
        C && Object.assign(g, C);
      }
      var _ = {
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
      }, E = /^[a-zA-Z][a-zA-Z0-9_]*$/;
      function A(C) {
        return typeof C != "string" || _[C] || !E.test(C) ? !1 : Array.isArray(n._callableMethods) ? n._callableMethods.indexOf(C) !== -1 : !0;
      }
      return new Proxy(g, {
        get: function(C, w, N) {
          if (w in C || typeof w == "symbol") return Reflect.get(C, w, N);
          if (A(w)) {
            var M = function() {
              var R = Array.prototype.slice.call(arguments);
              if (c) {
                var D = function() {
                  return n.call(w, ...R);
                };
                return Object.defineProperty(D, "__livueMethodName", {
                  value: w,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), Object.defineProperty(D, "__livueMethodArgs", {
                  value: R,
                  configurable: !1,
                  enumerable: !1,
                  writable: !1
                }), D;
              }
              return n.call(w, ...R);
            };
            return Object.defineProperty(M, "__livueMethodName", {
              value: w,
              configurable: !1,
              enumerable: !1,
              writable: !1
            }), M;
          }
        },
        getOwnPropertyDescriptor: function(C, w) {
          var N = Object.getOwnPropertyDescriptor(C, w);
          if (N) return N;
          if (A(w))
            return { configurable: !0, enumerable: !1 };
        },
        has: function(C, w) {
          return !!(w in C || A(w));
        },
        set: function(C, w, N) {
          return C[w] = N, !0;
        },
        ownKeys: function(C) {
          return Reflect.ownKeys(C);
        }
      });
    }
  };
  return h._updateRender = function(p) {
    try {
      let m = ki(p), g = Di(m.html);
      g = Mi(g);
      let _ = gn.compile(g);
      if (_ === u.value) return;
      d.length = 0, u.value = _;
    } catch (m) {
      console.error('[LiVue] Template update compilation error in "' + (o || "unknown") + '":', m);
    }
  }, h;
}
let tt = null;
function At() {
  if (tt)
    return tt;
  const e = document.querySelector('meta[name="csrf-token"]');
  if (e)
    return tt = e.getAttribute("content"), tt;
  const t = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return t ? (tt = decodeURIComponent(t[1]), tt) : null;
}
function xl() {
  tt = null;
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
}, ce = null, jr = null, he = null, Un = !1, Wt = 0;
function Cl(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function Tl(e) {
  return (-1 + e) * 100;
}
function Xo() {
  if (Un) return;
  Un = !0;
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
function Al() {
  if (he) return;
  Xo(), he = document.createElement("div"), he.className = "livue-progress-bar livue-progress-hidden", he.innerHTML = '<div class="livue-progress-peg"></div>', (document.querySelector(le.parent) || document.body).appendChild(he);
}
function Nl() {
  if (!Un) return;
  let e = document.getElementById("livue-progress-styles");
  e && (e.remove(), Un = !1, Xo());
}
function Ll(e) {
  Object.assign(le, e), Nl();
}
function on() {
  return le.showOnRequest;
}
function kl() {
  Wt++, ce === null && (Al(), ce = 0, he && he.classList.remove("livue-progress-hidden"), lr(le.minimum), le.trickle && (jr = setInterval(function() {
    Ko();
  }, le.trickleSpeed)));
}
function lr(e) {
  ce !== null && (e = Cl(e, le.minimum, 1), ce = e, he && (he.style.transform = "translate3d(" + Tl(e) + "%, 0, 0)"));
}
function Ko() {
  if (ce === null || ce >= 1) return;
  let e;
  ce < 0.2 ? e = 0.1 : ce < 0.5 ? e = 0.04 : ce < 0.8 ? e = 0.02 : ce < 0.99 ? e = 5e-3 : e = 0, lr(ce + e);
}
function Yo() {
  Wt = Math.max(0, Wt - 1), !(Wt > 0) && ce !== null && (lr(1), clearInterval(jr), jr = null, setTimeout(function() {
    he && he.classList.add("livue-progress-hidden"), setTimeout(function() {
      ce = null, he && (he.style.transform = "translate3d(-100%, 0, 0)");
    }, le.speed);
  }, le.speed));
}
function Dl() {
  Wt = 0, Yo();
}
function Ol() {
  return ce !== null;
}
function Ml() {
  return ce;
}
const Ye = {
  configure: Ll,
  start: kl,
  set: lr,
  trickle: Ko,
  done: Yo,
  forceDone: Dl,
  isStarted: Ol,
  getStatus: Ml,
  isRequestProgressEnabled: on
};
var Vt = null, Ii = !1, _t = !1, ye = {
  showProgressBar: !0,
  progressBarColor: "#29d",
  prefetch: !0,
  prefetchOnHover: !0,
  hoverDelay: 60,
  cachePages: !0,
  maxCacheSize: 10,
  restoreScroll: !0
}, De = /* @__PURE__ */ new Map(), rt = /* @__PURE__ */ new Map(), Hr = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new Map(), Je = null;
function Il(e) {
  Object.assign(ye, e), e.progressBarColor && Ye.configure({ color: e.progressBarColor });
}
function Rl(e) {
  Vt = e, !Ii && (Ii = !0, Je = Go(), history.replaceState(
    { livueNavigate: !0, url: location.href, pageKey: Je },
    "",
    location.href
  ), window.addEventListener("popstate", function(t) {
    t.state && t.state.livueNavigate && (Zo(Je), Je = t.state.pageKey, dn(t.state.url, !1, !0));
  }), ql());
}
function Go() {
  return location.href + "#" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}
function Zo(e) {
  if (!(!ye.restoreScroll || !e)) {
    Mn.set(e, {
      x: window.scrollX,
      y: window.scrollY
    });
    var t = document.querySelectorAll("[data-livue-scroll]");
    t.forEach(function(n) {
      var r = n.dataset.livueScroll || n.id;
      if (r) {
        var i = Mn.get(e) || {};
        i["el:" + r] = { x: n.scrollLeft, y: n.scrollTop }, Mn.set(e, i);
      }
    });
  }
}
function Pl(e) {
  if (!(!ye.restoreScroll || !e)) {
    var t = Mn.get(e);
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
function ql() {
  document.addEventListener("click", zl, !0), ye.prefetch && (document.addEventListener("mouseenter", jl, !0), document.addEventListener("mouseleave", Hl, !0), document.addEventListener("mousedown", $l, !0), document.addEventListener("focus", Bl, !0));
}
function zl(e) {
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
        n.startsWith("#") || n.startsWith("javascript:") || t.hasAttribute("download") || t.getAttribute("target") !== "_blank" && (e.preventDefault(), e.stopPropagation(), console.log("[v-navigate global] Navigating to:", n), dn(n, !0, !1));
      }
    }
  }
}
function Vl(e) {
  var t = e.dataset.livueNavigateMode;
  return t === "hover" ? "hover" : "mousedown";
}
function jl(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ye.prefetchOnHover)) {
      var n = Vl(t);
      if (n === "hover") {
        var r = t.getAttribute("href");
        if (!(!r || r.startsWith("#") || r.startsWith("javascript:"))) {
          var i = setTimeout(function() {
            sr(r);
          }, ye.hoverDelay);
          Hr.set(t, i);
        }
      }
    }
  }
}
function Hl(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = Hr.get(t);
      n && (clearTimeout(n), Hr.delete(t));
    }
  }
}
function $l(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (t) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || sr(n);
    }
  }
}
function Bl(e) {
  if (!(!e.target || typeof e.target.closest != "function")) {
    var t = e.target.closest("a[data-livue-navigate], a[v-navigate]");
    if (!(!t || !ye.prefetchOnHover)) {
      var n = t.getAttribute("href");
      !n || n.startsWith("#") || n.startsWith("javascript:") || sr(n);
    }
  }
}
function sr(e) {
  var t = new URL(e, location.origin).href;
  if (rt.has(t))
    return rt.get(t);
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
    return rt.delete(t), r.ok ? r.text().then(function(i) {
      return ye.cachePages && Qo(t, i), i;
    }) : null;
  }).catch(function(r) {
    return rt.delete(t), console.warn("[LiVue] Prefetch failed:", r), null;
  });
  return rt.set(t, n), n;
}
function Qo(e, t) {
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
function oi() {
  De.clear();
}
function ai(e) {
  _t || !e || !e.url || (e.navigate ? (De.clear(), dn(e.url, !0, !1)) : (_t = !0, window.location.href = e.url));
}
async function dn(e, t, n) {
  if (!_t) {
    if (!Vt) {
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
      _t = !0, n || Zo(Je), ye.showProgressBar && Ye.start();
      try {
        var o, a = De.get(r);
        if (a)
          o = a.html;
        else if (rt.has(r))
          o = await rt.get(r);
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
          o = await l.text(), ye.cachePages && Qo(r, o);
        }
        var s = new DOMParser(), u = s.parseFromString(o, "text/html"), d = new CustomEvent("livue:navigating", {
          detail: {
            url: r,
            doc: u,
            onSwap: function(_) {
              typeof _ == "function" && _(u);
            }
          }
        });
        window.dispatchEvent(d);
        var c = Fl(), v = /* @__PURE__ */ new Set();
        c.forEach(function(_) {
          _.livueIds.forEach(function(E) {
            v.add(E);
          });
        }), Vt._stopObserver(), Vt.destroyExcept(v), c.forEach(function(_) {
          _.element.parentNode && _.element.parentNode.removeChild(_.element);
        });
        var h = u.querySelector("title");
        h && (document.title = h.textContent), document.body.innerHTML = u.body.innerHTML, Wl(c);
        var p = u.querySelector('meta[name="csrf-token"]'), m = document.querySelector('meta[name="csrf-token"]');
        if (p && m && (m.setAttribute("content", p.getAttribute("content")), xl()), Jl(u), Ul(u), Xl(u), t && (Je = Go(), history.pushState(
          { livueNavigate: !0, url: r, pageKey: Je },
          "",
          r
        )), Kl(u), Vt.rebootPreserving(), n)
          Pl(Je);
        else if (location.hash) {
          var g = document.querySelector(location.hash);
          g ? g.scrollIntoView() : window.scrollTo(0, 0);
        } else
          window.scrollTo(0, 0);
        window.dispatchEvent(new CustomEvent("livue:navigated", {
          detail: { url: r }
        }));
      } catch (_) {
        console.error("[LiVue] Navigation failed:", _), window.location.href = e;
      } finally {
        _t = !1, ye.showProgressBar && Ye.done();
      }
    }
  }
}
function Fl() {
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
function Wl(e) {
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
function Ul(e) {
  var t = document.querySelectorAll("[data-livue-head]");
  t.forEach(function(r) {
    r.remove();
  });
  var n = e.querySelectorAll("[data-livue-head]");
  n.forEach(function(r) {
    document.head.appendChild(r.cloneNode(!0));
  });
}
function Jl(e) {
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
function Xl(e) {
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
function Kl(e) {
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
function Yl() {
  return _t;
}
var vt = /* @__PURE__ */ new Map(), Gl = [
  "component.init",
  "component.destroy",
  "element.init",
  "request.started",
  "request.finished",
  "template.updating",
  "template.updated",
  "error.occurred"
];
function Ae(e, t) {
  return typeof e != "string" ? (console.warn("[LiVue Hooks] Invalid hook name:", e), function() {
  }) : typeof t != "function" ? (console.warn("[LiVue Hooks] Callback must be a function"), function() {
  }) : (vt.has(e) || vt.set(e, /* @__PURE__ */ new Set()), vt.get(e).add(t), function() {
    var n = vt.get(e);
    n && (n.delete(t), n.size === 0 && vt.delete(e));
  });
}
function be(e, t) {
  var n = vt.get(e);
  !n || n.size === 0 || n.forEach(function(r) {
    try {
      r(t);
    } catch (i) {
      console.error('[LiVue Hooks] Error in "' + e + '" callback:', i);
    }
  });
}
function ea() {
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
function Ri() {
  return Gl.slice();
}
var $r = [], Br = [], an = !1;
function Zl(e) {
  return e.isolate ? es(e) : new Promise(function(t, n) {
    $r.push({
      payload: e,
      resolve: t,
      reject: n
    }), an || (an = !0, queueMicrotask(ta));
  });
}
function Ql(e) {
  return new Promise(function(t, n) {
    Br.push({
      payload: e,
      resolve: t,
      reject: n
    }), an || (an = !0, queueMicrotask(ta));
  });
}
async function ta() {
  var e = $r, t = Br;
  if ($r = [], Br = [], an = !1, !(e.length === 0 && t.length === 0)) {
    on() && Ye.start();
    var n = na(), r = At(), i = {
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
      for (var v = u.responses || [], h = u.lazyResponses || [], c = 0; c < v.length; c++)
        if (v[c] && v[c].redirect) {
          ai(v[c].redirect);
          return;
        }
      oi();
      for (var c = 0; c < e.length; c++) {
        var p = v[c];
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
        var p = h[c];
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
      be("request.finished", {
        url: n,
        success: !0,
        responses: v,
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
    } finally {
      on() && Ye.done();
    }
  }
}
async function es(e) {
  on() && Ye.start();
  var t = na(), n = At(), r = {
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
      return ai(s.redirect), new Promise(function() {
      });
    if (oi(), s.error) {
      var u = new Error(s.error);
      throw u.status = s.status || 500, u.data = s, u;
    }
    if (s.errors) {
      var u = new Error("Validation failed");
      throw u.status = 422, u.data = s, u;
    }
    return s;
  } finally {
    on() && Ye.done();
  }
}
function na() {
  var e = document.querySelector('meta[name="livue-prefix"]')?.getAttribute("content") || "livue";
  return "/" + e + "/update";
}
async function hr(e, t, n, r, i) {
  return Zl({
    snapshot: e,
    diffs: r || {},
    method: t,
    params: n || [],
    isolate: i || !1
  });
}
let Fr = null, ra = /* @__PURE__ */ new Map();
function ts() {
  return ke({});
}
function Ee(e, t) {
  Wr(e);
  for (let n in t)
    e[n] = t[n];
}
function Wr(e) {
  for (let t in e)
    delete e[t];
}
function ns(e) {
  Fr = e;
}
function ct(e, t, n, r) {
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
  }), i ? !0 : (Fr ? Fr(e, t) : console.error("[LiVue] Unhandled error on " + t + ":", e), !1);
}
function rs(e, t) {
  typeof t == "function" && ra.set(e, t);
}
function Ur(e) {
  ra.delete(e);
}
var Fe = null, is = "livue-devtools-styles", os = `
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
function as() {
  Fe || (Fe = document.createElement("style"), Fe.id = is, Fe.textContent = os, document.head.appendChild(Fe));
}
function ls() {
  Fe && (Fe.remove(), Fe = null);
}
var li = [];
function O(e, t, n) {
  li.push({
    name: e,
    directive: t
  });
}
function ss() {
  return li;
}
function us() {
  return {
    plugins: [],
    stores: [],
    components: [],
    directives: li.map(function(e) {
      return { name: e.name, filters: null };
    })
  };
}
const Re = /* @__PURE__ */ new Map(), ze = /* @__PURE__ */ new Map();
let Pi = !1;
function st() {
  return typeof window < "u" && window.Echo;
}
function cs(e, t) {
  if (!st())
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
function ia(e, t, n) {
  if (!t || !t.length)
    return function() {
    };
  if (!st())
    return Pi || (Pi = !0, console.warn("[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.")), function() {
    };
  const r = [];
  for (let i = 0; i < t.length; i++) {
    const o = t[i], { channel: a, type: l, event: s, method: u, isPresenceEvent: d, isCustomEvent: c } = o, v = cs(a, l);
    if (!v) continue;
    const h = l + ":" + a + ":" + s + ":" + e;
    if (ze.has(h)) {
      r.push(h);
      continue;
    }
    const p = function(m) {
      try {
        n(u, m);
      } catch (g) {
        console.error('[LiVue Echo] Error calling method "' + u + '":', g);
      }
    };
    if (l === "presence" && d)
      ds(v, s, p);
    else {
      const m = c ? "." + s : s;
      v.listen(m, p);
    }
    ze.set(h, {
      channel: v,
      channelKey: l + ":" + a,
      event: s,
      handler: p,
      isPresenceEvent: d,
      isCustomEvent: c
    }), r.push(h);
  }
  return function() {
    for (let i = 0; i < r.length; i++)
      oa(r[i]);
  };
}
function ds(e, t, n) {
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
function oa(e) {
  const t = ze.get(e);
  if (t) {
    if (!t.isPresenceEvent) {
      const n = t.isCustomEvent ? "." + t.event : t.event;
      try {
        t.channel.stopListening(n, t.handler);
      } catch {
      }
    }
    ze.delete(e), fs(t.channelKey);
  }
}
function qi(e) {
  const t = ":" + e, n = [];
  ze.forEach(function(r, i) {
    i.endsWith(t) && n.push(i);
  });
  for (let r = 0; r < n.length; r++)
    oa(n[r]);
}
function fs(e) {
  let t = !1;
  if (ze.forEach(function(r) {
    r.channelKey === e && (t = !0);
  }), t) return;
  if (Re.get(e) && st()) {
    const r = e.split(":"), i = r[0], o = r.slice(1).join(":");
    try {
      i === "presence" ? window.Echo.leave(o) : i === "private" ? window.Echo.leaveChannel("private-" + o) : window.Echo.leaveChannel(o);
    } catch {
    }
  }
  Re.delete(e);
}
function zi() {
  ze.clear(), Re.forEach(function(e, t) {
    if (st()) {
      const n = t.split(":"), r = n[0], i = n.slice(1).join(":");
      try {
        r === "presence" ? window.Echo.leave(i) : r === "private" ? window.Echo.leaveChannel("private-" + i) : window.Echo.leaveChannel(i);
      } catch {
      }
    }
  }), Re.clear();
}
function ps() {
  return {
    echoAvailable: st(),
    channels: Array.from(Re.keys()),
    subscriptions: Array.from(ze.keys())
  };
}
function vs() {
  var e = [], t = [];
  return Re.forEach(function(n, r) {
    var i = r.split(":");
    e.push({
      key: r,
      type: i[0],
      name: i.slice(1).join(":")
    });
  }), ze.forEach(function(n, r) {
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
    available: st(),
    channels: e,
    subscriptions: t
  };
}
var Vi = 100, ms = 200, hs = 50, I = {
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
}, Ne = [], xt = !1, Jr = /* @__PURE__ */ new Set();
function Se() {
  Jr.forEach(function(e) {
    try {
      e();
    } catch (t) {
      console.error("[LiVue DevTools] Listener error:", t);
    }
  });
}
var gs = 0;
function bs() {
  return "req-" + ++gs + "-" + Date.now();
}
function ys(e) {
  var t = new Date(e), n = t.getHours().toString().padStart(2, "0"), r = t.getMinutes().toString().padStart(2, "0"), i = t.getSeconds().toString().padStart(2, "0"), o = t.getMilliseconds().toString().padStart(3, "0");
  return n + ":" + r + ":" + i + "." + o;
}
function aa() {
  xt || (xt = !0, Ne.push(Ae("component.init", function(e) {
    var t = e.component;
    I.components.set(t.id, {
      id: t.id,
      name: t.name,
      isChild: e.isChild,
      isIsland: e.el && e.el.hasAttribute("data-livue-island"),
      initTime: Date.now(),
      state: t.state,
      livue: t.livue,
      el: e.el
    }), Se();
  })), Ne.push(Ae("component.destroy", function(e) {
    var t = e.component;
    I.components.delete(t.id), I.componentBenchmarkStats.delete(t.id), Se();
  })), Ne.push(Ae("request.started", function(e) {
    var t = bs(), n = {
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
    I.pendingRequests.set(e.url + "-" + t, n), I.requests.unshift(n), I.requests.length > Vi && I.requests.pop(), I.perf.totalRequests++, Se();
  })), Ne.push(Ae("request.finished", function(e) {
    var t = null;
    if (I.pendingRequests.forEach(function(r, i) {
      !t && r.url === e.url && r.status === "pending" && (t = { req: r, key: i });
    }), t) {
      var n = t.req;
      n.endTime = Date.now(), n.duration = n.endTime - n.startTime, n.status = e.success ? "success" : "error", n.responses = e.responses, n.lazyResponses = e.lazyResponses, n.error = e.error, I.pendingRequests.delete(t.key), e.success ? I.perf.successfulRequests++ : I.perf.failedRequests++, I.perf.totalRequestTime += n.duration, I.perf.avgRequestTime = I.perf.totalRequestTime / I.perf.totalRequests, n.duration < I.perf.minRequestTime && (I.perf.minRequestTime = n.duration), n.duration > I.perf.maxRequestTime && (I.perf.maxRequestTime = n.duration), Se();
    }
  })), Ne.push(Ae("template.updating", function(e) {
    var t = e.component;
    I.pendingSwaps.set(t.id, Date.now());
  })), Ne.push(Ae("template.updated", function(e) {
    var t = e.component, n = I.pendingSwaps.get(t.id);
    if (n) {
      var r = Date.now() - n;
      I.pendingSwaps.delete(t.id), I.perf.totalTemplateSwaps++, I.perf.totalTemplateSwapTime += r, I.perf.avgTemplateSwapTime = I.perf.totalTemplateSwapTime / I.perf.totalTemplateSwaps, Se();
    }
  })), Ne.push(Ae("benchmark.received", function(e) {
    var t = Date.now(), n = {
      time: t,
      componentId: e.componentId,
      componentName: e.componentName,
      timings: e.timings
    };
    I.serverBenchmarks.unshift(n), I.serverBenchmarks.length > Vi && I.serverBenchmarks.pop();
    var r = e.componentId, i = I.componentBenchmarkStats.get(r);
    i || (i = { count: 0, averages: {}, latest: null }, I.componentBenchmarkStats.set(r, i)), i.count++, i.latest = { time: t, timings: e.timings };
    for (var o in e.timings) {
      var a = e.timings[o], l = i.averages[o] || 0;
      i.averages[o] = l + (a - l) / i.count;
    }
    Se();
  })), Ne.push(Ae("error.occurred", function(e) {
    var t = {
      time: Date.now(),
      error: e.error,
      componentName: e.componentName,
      componentId: e.componentId,
      context: e.context
    };
    I.errors.unshift(t), I.errors.length > hs && I.errors.pop(), Se();
  })));
}
function la() {
  xt && (xt = !1, Ne.forEach(function(e) {
    e();
  }), Ne = []);
}
function _s() {
  return xt;
}
function ws(e) {
  if (xt) {
    var t = {
      time: Date.now(),
      name: e.name,
      data: e.data,
      mode: e.mode,
      source: e.source,
      sourceId: e.sourceId,
      target: e.target
    };
    I.events.unshift(t), I.events.length > ms && I.events.pop(), Se();
  }
}
function Es() {
  return Array.from(I.components.values());
}
function sa() {
  return I.requests;
}
function ua() {
  return I.events;
}
function ca() {
  return Object.assign({}, I.perf);
}
function Ss() {
  return I.serverBenchmarks;
}
function xs(e) {
  return I.componentBenchmarkStats.get(e) || null;
}
function da() {
  I.requests = [], I.pendingRequests.clear(), Se();
}
function fa() {
  I.events = [], Se();
}
function Cs() {
  I.components.clear(), I.requests = [], I.pendingRequests.clear(), I.events = [], I.errors = [], I.perf = {
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
  }, I.pendingSwaps.clear(), I.serverBenchmarks = [], I.componentBenchmarkStats.clear(), Se();
}
function Ts(e) {
  return Jr.add(e), function() {
    Jr.delete(e);
  };
}
function si(e) {
  return ys(e);
}
function As(e) {
  var t = I.components.get(e);
  if (!t || !t.livue || !t.livue._getDevToolsInfo)
    return null;
  try {
    return t.livue._getDevToolsInfo();
  } catch (n) {
    return console.error("[LiVue DevTools] Error getting component info:", n), null;
  }
}
function Ns() {
  return us();
}
function Ls() {
  return vs();
}
var Xr = null, ji = null, Kr = null;
function ks(e) {
  Xr = e;
}
function Ds(e) {
  Kr = e;
}
function pa() {
  if (!Xr)
    return [];
  var e = Xr.all(), t = [];
  return e.forEach(function(n) {
    var r = va(n, !1);
    t.push(r);
  }), t;
}
function va(e, t) {
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
      l.children.push(va(u, !0));
    }
  return l;
}
function ma(e) {
  var t = pa();
  if (e.innerHTML = "", t.length === 0) {
    e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E6;</div>No components found</div>';
    return;
  }
  t.forEach(function(n) {
    e.appendChild(ha(n));
  });
}
function ha(e, t) {
  var n = document.createElement("div");
  n.className = "livue-devtools__node", n.dataset.id = e.id;
  var r = e.children && e.children.length > 0, i = document.createElement("div");
  i.className = "livue-devtools__node-header", e.id === ji && i.classList.add("livue-devtools__node-header--selected");
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
    var v = document.createElement("span");
    v.className = "livue-devtools__badge livue-devtools__badge--error", v.textContent = e.errorCount + " error" + (e.errorCount > 1 ? "s" : ""), u.appendChild(v);
  }
  if (i.appendChild(u), i.addEventListener("click", function(p) {
    if (p.target === o && r) {
      var m = n.querySelector(".livue-devtools__node-children");
      if (m) {
        var g = m.style.display !== "none";
        m.style.display = g ? "none" : "block", o.textContent = g ? "▶" : "▼";
      }
      return;
    }
    ji = e.id;
    var _ = document.querySelectorAll(".livue-devtools__node-header");
    _.forEach(function(E) {
      E.classList.remove("livue-devtools__node-header--selected");
    }), i.classList.add("livue-devtools__node-header--selected"), Kr && Kr(e);
  }), n.appendChild(i), r) {
    var h = document.createElement("div");
    h.className = "livue-devtools__node-children", e.children.forEach(function(p) {
      h.appendChild(ha(p));
    }), n.appendChild(h);
  }
  return n;
}
var it = null, Dt = "state", Ie = /* @__PURE__ */ new Set(), ln = null;
function Os(e) {
  it = e;
}
function ur(e) {
  if (ln = e, e.innerHTML = "", !it) {
    e.innerHTML = '<div class="livue-devtools__state-empty">Select a component to inspect its state</div>';
    return;
  }
  var t = it.state, n = it.livue, r = n ? n.dirtyFields : /* @__PURE__ */ new Set(), i = As(it.id), o = document.createElement("div");
  o.className = "livue-devtools__state-title", o.textContent = "<" + it.name + ">", e.appendChild(o);
  var a = document.createElement("div");
  a.style.cssText = "display: flex; gap: 4px; margin-bottom: 8px;", ["state", "diff", "info"].forEach(function(l) {
    var s = document.createElement("button");
    s.style.cssText = "padding: 2px 8px; font-size: 10px; background: " + (Dt === l ? "#007acc" : "#3c3c3c") + "; border: none; color: #fff; border-radius: 3px; cursor: pointer;", s.textContent = l.charAt(0).toUpperCase() + l.slice(1), s.addEventListener("click", function() {
      Dt = l, ur(e);
    }), a.appendChild(s);
  }), e.appendChild(a), Dt === "state" ? Ms(e, t, r, n) : Dt === "diff" ? Is(e, i) : Dt === "info" && Rs(e, i);
}
function Ms(e, t, n, r) {
  if (t && typeof t == "object") {
    var i = Object.keys(t);
    if (i.length === 0) {
      var o = document.createElement("div");
      o.className = "livue-devtools__state-empty", o.textContent = "No state properties", e.appendChild(o);
    } else
      i.forEach(function(l) {
        var s = n.has(l);
        e.appendChild(ui(l, t[l], s, l));
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
function Is(e, t) {
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
function Rs(e, t) {
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
    var v = document.createElement("span");
    v.className = "livue-devtools__prop-colon", v.textContent = ": ", d.appendChild(v);
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
      var v = document.createElement("span");
      v.className = "livue-devtools__prop-colon", v.textContent = ": ", d.appendChild(v);
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
      var v = Object.keys(d.data || {});
      if (v.length > 0) {
        var h = document.createElement("div");
        h.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px;", h.textContent = "Data:", e.appendChild(h), v.forEach(function(g) {
          var _ = document.createElement("div");
          _.style.marginLeft = "16px", _.className = "livue-devtools__prop";
          var E = document.createElement("span");
          E.className = "livue-devtools__prop-key", E.textContent = g, _.appendChild(E);
          var A = document.createElement("span");
          A.className = "livue-devtools__prop-colon", A.textContent = ": ", _.appendChild(A), _.appendChild(ga(d.data[g], "composable." + u + "." + g)), e.appendChild(_);
        });
      }
      if (d.actions && d.actions.length > 0) {
        var p = document.createElement("div");
        p.style.cssText = "color: #858585; font-size: 10px; margin-left: 8px; margin-top: 4px;", p.textContent = "Actions:", e.appendChild(p);
        var m = document.createElement("div");
        m.style.cssText = "margin-left: 16px; color: #dcdcaa;", m.textContent = d.actions.join(", "), e.appendChild(m);
      }
    });
  }
}
function ui(e, t, n, r) {
  var i = document.createElement("div");
  i.className = "livue-devtools__prop";
  var o = document.createElement("span");
  o.className = "livue-devtools__prop-key", n && o.classList.add("livue-devtools__prop-key--dirty"), o.textContent = e, i.appendChild(o);
  var a = document.createElement("span");
  return a.className = "livue-devtools__prop-colon", a.textContent = ": ", i.appendChild(a), i.appendChild(ga(t, r)), i;
}
function ga(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value", e === null)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "null";
  else if (e === void 0)
    n.classList.add("livue-devtools__prop-value--null"), n.textContent = "undefined";
  else if (typeof e == "string")
    n.classList.add("livue-devtools__prop-value--string"), n.textContent = '"' + zs(e, 50) + '"', n.title = e;
  else if (typeof e == "number")
    n.classList.add("livue-devtools__prop-value--number"), n.textContent = String(e);
  else if (typeof e == "boolean")
    n.classList.add("livue-devtools__prop-value--boolean"), n.textContent = String(e);
  else {
    if (Array.isArray(e))
      return Ps(e, t);
    if (typeof e == "object")
      return qs(e, t);
    typeof e == "function" ? (n.classList.add("livue-devtools__prop-value--null"), n.textContent = "function()") : n.textContent = String(e);
  }
  return n;
}
function Ps(e, t) {
  var n = document.createElement("span");
  if (n.className = "livue-devtools__prop-value livue-devtools__prop-value--array", e.length === 0)
    return n.textContent = "[]", n;
  var r = Ie.has(t), i = document.createElement("span");
  i.className = "livue-devtools__object-toggle", i.textContent = r ? "▼ " : "▶ ", i.addEventListener("click", function() {
    Ie.has(t) ? Ie.delete(t) : Ie.add(t), ln && ur(ln);
  }), n.appendChild(i);
  var o = document.createElement("span");
  if (o.textContent = "Array(" + e.length + ")", n.appendChild(o), r) {
    var a = document.createElement("div");
    a.className = "livue-devtools__object", e.forEach(function(l, s) {
      a.appendChild(ui(String(s), l, !1, t + "." + s));
    }), n.appendChild(a);
  }
  return n;
}
function qs(e, t) {
  var n = document.createElement("span");
  n.className = "livue-devtools__prop-value livue-devtools__prop-value--object";
  var r = Object.keys(e);
  if (r.length === 0)
    return n.textContent = "{}", n;
  var i = Ie.has(t), o = document.createElement("span");
  o.className = "livue-devtools__object-toggle", o.textContent = i ? "▼ " : "▶ ", o.addEventListener("click", function() {
    Ie.has(t) ? Ie.delete(t) : Ie.add(t), ln && ur(ln);
  }), n.appendChild(o);
  var a = document.createElement("span");
  if (a.textContent = "{...} " + r.length + " key" + (r.length > 1 ? "s" : ""), n.appendChild(a), i) {
    var l = document.createElement("div");
    l.className = "livue-devtools__object", r.forEach(function(s) {
      l.appendChild(ui(s, e[s], !1, t + "." + s));
    }), n.appendChild(l);
  }
  return n;
}
function zs(e, t) {
  return e.length <= t ? e : e.substring(0, t - 3) + "...";
}
function Vs() {
  it = null, Ie.clear();
}
var mt = /* @__PURE__ */ new Set();
function ba(e) {
  e.innerHTML = "";
  var t = sa(), n = document.createElement("div");
  n.className = "livue-devtools__timeline-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__timeline-title", r.textContent = "Request Timeline (" + t.length + ")", n.appendChild(r);
  var i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = "Clear", i.addEventListener("click", function() {
    da(), mt.clear(), ba(e);
  }), n.appendChild(i), e.appendChild(n);
  var o = document.createElement("div");
  o.className = "livue-devtools__timeline-list", t.length === 0 ? o.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E1;</div>No requests yet</div>' : t.forEach(function(a) {
    o.appendChild(js(a));
  }), e.appendChild(o);
}
function js(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__request", mt.has(e.id) && t.classList.add("livue-devtools__request--expanded");
  var n = document.createElement("div");
  n.className = "livue-devtools__request-header";
  var r = document.createElement("span");
  r.className = "livue-devtools__request-toggle", r.textContent = mt.has(e.id) ? "▼" : "▶", n.appendChild(r);
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
  s.className = "livue-devtools__request-time", s.textContent = si(e.startTime), n.appendChild(s), n.addEventListener("click", function() {
    mt.has(e.id) ? (mt.delete(e.id), t.classList.remove("livue-devtools__request--expanded"), r.textContent = "▶") : (mt.add(e.id), t.classList.add("livue-devtools__request--expanded"), r.textContent = "▼");
  }), t.appendChild(n);
  var u = document.createElement("div");
  if (u.className = "livue-devtools__request-details", e.updateCount > 0 || e.lazyCount > 0) {
    var d = document.createElement("div");
    d.className = "livue-devtools__request-section";
    var c = document.createElement("div");
    c.className = "livue-devtools__request-section-title", c.textContent = "Summary", d.appendChild(c);
    var v = document.createElement("div"), h = [];
    e.updateCount > 0 && h.push(e.updateCount + " update" + (e.updateCount > 1 ? "s" : "")), e.lazyCount > 0 && h.push(e.lazyCount + " lazy load" + (e.lazyCount > 1 ? "s" : "")), v.textContent = h.join(", "), d.appendChild(v), u.appendChild(d);
  }
  if (e.updates && e.updates.length > 0) {
    var p = document.createElement("div");
    p.className = "livue-devtools__request-section";
    var m = document.createElement("div");
    m.className = "livue-devtools__request-section-title", m.textContent = "Request Payload", p.appendChild(m);
    var g = document.createElement("pre");
    g.className = "livue-devtools__request-json", g.textContent = Hs(e.updates), p.appendChild(g), u.appendChild(p);
  }
  if (e.responses) {
    var _ = document.createElement("div");
    _.className = "livue-devtools__request-section";
    var E = document.createElement("div");
    E.className = "livue-devtools__request-section-title", E.textContent = "Response", _.appendChild(E);
    var A = document.createElement("pre");
    A.className = "livue-devtools__request-json", A.textContent = $s(e.responses), _.appendChild(A), u.appendChild(_);
  }
  if (e.error) {
    var C = document.createElement("div");
    C.className = "livue-devtools__request-section";
    var w = document.createElement("div");
    w.className = "livue-devtools__request-section-title", w.style.color = "#f48771", w.textContent = "Error", C.appendChild(w);
    var N = document.createElement("pre");
    N.className = "livue-devtools__request-json", N.style.color = "#f48771", N.textContent = e.error.message || String(e.error), C.appendChild(N), u.appendChild(C);
  }
  return t.appendChild(u), t;
}
function Hs(e) {
  var t = e.map(function(n) {
    var r = {};
    return n.method && (r.method = n.method), n.params && n.params.length > 0 && (r.params = n.params), n.diffs && Object.keys(n.diffs).length > 0 && (r.diffs = n.diffs), r;
  });
  return JSON.stringify(t, null, 2);
}
function $s(e) {
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
function ya(e) {
  e.innerHTML = "";
  var t = document.createElement("div");
  t.className = "livue-devtools__events-header";
  var n = document.createElement("input");
  n.className = "livue-devtools__events-filter", n.type = "text", n.placeholder = "Filter events...", n.value = Ut, n.addEventListener("input", function(o) {
    Ut = o.target.value.toLowerCase(), Hi(e.querySelector(".livue-devtools__events-list"));
  }), t.appendChild(n);
  var r = document.createElement("button");
  r.className = "livue-devtools__btn", r.textContent = "Clear", r.addEventListener("click", function() {
    fa(), Ut = "", n.value = "", ya(e);
  }), t.appendChild(r), e.appendChild(t);
  var i = document.createElement("div");
  i.className = "livue-devtools__events-list", Hi(i), e.appendChild(i);
}
function Hi(e) {
  if (e) {
    e.innerHTML = "";
    var t = ua(), n = t;
    if (Ut && (n = t.filter(function(r) {
      var i = (r.name + " " + r.source + " " + JSON.stringify(r.data)).toLowerCase();
      return i.indexOf(Ut) !== -1;
    })), n.length === 0) {
      t.length === 0 ? e.innerHTML = '<div class="livue-devtools__empty"><div class="livue-devtools__empty-icon">&#x1F4E8;</div>No events yet</div>' : e.innerHTML = '<div class="livue-devtools__empty">No events match filter</div>';
      return;
    }
    n.forEach(function(r) {
      e.appendChild(Bs(r));
    });
  }
}
function Bs(e) {
  var t = document.createElement("div");
  t.className = "livue-devtools__event";
  var n = document.createElement("span");
  n.className = "livue-devtools__event-time", n.textContent = si(e.time), t.appendChild(n);
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
    a.className = "livue-devtools__event-data", a.textContent = Fs(e.data), a.title = JSON.stringify(e.data, null, 2), t.appendChild(a);
  }
  return t;
}
function Fs(e) {
  if (e === null) return "null";
  if (e === void 0) return "undefined";
  var t = JSON.stringify(e);
  return t.length > 80 ? t.substring(0, 77) + "..." : t;
}
var _a = "livue-devtools-state", $ = null, Pe = "components", at = "state", ci = null, Le = !1, wa = !1, Ke = "right";
function Ea() {
  try {
    var e = localStorage.getItem(_a);
    if (e) {
      var t = JSON.parse(e);
      Pe = t.activeTab || "components", at = t.activeSubTab || "state", Le = t.minimized || !1, wa = t.isOpen || !1, Ke = t.position || "right";
    }
  } catch {
  }
}
function Nt() {
  try {
    localStorage.setItem(_a, JSON.stringify({
      isOpen: $ !== null,
      activeTab: Pe,
      activeSubTab: at,
      minimized: Le,
      position: Ke
    }));
  } catch {
  }
}
function Ws() {
  return Ea(), wa;
}
var In = null, Jt = null, Rn = null;
function Us(e) {
  ks(e);
}
function Js() {
  return $ !== null;
}
function di() {
  $ || (Ea(), as(), aa(), Xs(), ru(), iu(), Nt());
}
function fi() {
  $ && (Jt && (document.removeEventListener("keydown", Jt), Jt = null), In && (clearInterval(In), In = null), Rn && (Rn(), Rn = null), $.remove(), $ = null, ci = null, ls(), la(), Vs(), Nt());
}
function Sa() {
  $ ? fi() : di();
}
function xa() {
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
function Xs() {
  $ = document.createElement("div"), $.className = "livue-devtools livue-devtools--" + Ke, Le && $.classList.add("livue-devtools--minimized");
  var e = document.createElement("div");
  e.className = "livue-devtools__header";
  var t = document.createElement("div");
  t.className = "livue-devtools__title", t.innerHTML = '<span class="livue-devtools__title-icon">&#x2699;</span> LiVue DevTools', e.appendChild(t);
  var n = document.createElement("div");
  n.className = "livue-devtools__actions";
  var r = xa(), i = document.createElement("button");
  i.className = "livue-devtools__btn", i.textContent = Le ? r.minimized : r.expanded, i.title = "Minimize", i.addEventListener("click", function() {
    Le = !Le, $.classList.toggle("livue-devtools--minimized", Le), i.textContent = Le ? r.minimized : r.expanded, Nt();
  }), n.appendChild(i);
  var o = document.createElement("button");
  o.className = "livue-devtools__btn", o.textContent = "×", o.title = "Close (Ctrl+Shift+L)", o.addEventListener("click", fi), n.appendChild(o), e.appendChild(n), $.appendChild(e);
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
  l.forEach(function(p) {
    var m = document.createElement("button");
    m.className = "livue-devtools__tab", p.id === Pe && m.classList.add("livue-devtools__tab--active"), m.textContent = p.label, m.addEventListener("click", function() {
      Ks(p.id);
    }), a.appendChild(m);
  }), $.appendChild(a);
  var s = document.createElement("div");
  s.className = "livue-devtools__content";
  var u = document.createElement("div");
  u.className = "livue-devtools__panel livue-devtools__panel--components", u.dataset.tab = "components", Pe === "components" && u.classList.add("livue-devtools__panel--active");
  var d = document.createElement("div");
  d.className = "livue-devtools__tree", u.appendChild(d);
  var c = document.createElement("div");
  c.className = "livue-devtools__right-pane";
  var v = document.createElement("div");
  v.className = "livue-devtools__sub-tabs", [{ id: "state", label: "State" }, { id: "benchmark", label: "Benchmark" }].forEach(function(p) {
    var m = document.createElement("button");
    m.className = "livue-devtools__sub-tab", p.id === at && m.classList.add("livue-devtools__sub-tab--active"), m.textContent = p.label, m.addEventListener("click", function() {
      Ys(p.id);
    }), v.appendChild(m);
  }), c.appendChild(v);
  var h = document.createElement("div");
  h.className = "livue-devtools__sub-content", ["state", "benchmark"].forEach(function(p) {
    var m = document.createElement("div");
    m.className = "livue-devtools__panel", m.dataset.subtab = p, p === at && m.classList.add("livue-devtools__panel--active"), h.appendChild(m);
  }), c.appendChild(h), u.appendChild(c), s.appendChild(u), ["timeline", "events", "stores", "echo", "perf", "settings"].forEach(function(p) {
    var m = document.createElement("div");
    m.className = "livue-devtools__panel", m.dataset.tab = p, p === Pe && m.classList.add("livue-devtools__panel--active"), s.appendChild(m);
  }), $.appendChild(s), document.body.appendChild($), Ds(function(p) {
    ci = p, Os(p), cr();
  }), Jn(), Rn = Ts(function() {
    Jn();
  });
}
function Ks(e) {
  if (e !== Pe) {
    Pe = e;
    var t = $.querySelectorAll(".livue-devtools__tab"), n = ["components", "timeline", "events", "stores", "echo", "perf", "settings"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__tab--active", n[o] === e);
    });
    var r = $.querySelectorAll(".livue-devtools__panel[data-tab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.tab === e);
    }), Jn(), Nt();
  }
}
function Ys(e) {
  if (e !== at) {
    at = e;
    var t = $.querySelectorAll(".livue-devtools__sub-tab"), n = ["state", "benchmark"];
    t.forEach(function(i, o) {
      i.classList.toggle("livue-devtools__sub-tab--active", n[o] === e);
    });
    var r = $.querySelectorAll(".livue-devtools__panel[data-subtab]");
    r.forEach(function(i) {
      i.classList.toggle("livue-devtools__panel--active", i.dataset.subtab === e);
    }), cr(), Nt();
  }
}
function cr() {
  if ($)
    if (at === "state") {
      var e = $.querySelector('.livue-devtools__panel[data-subtab="state"]');
      e && ur(e);
    } else {
      var t = $.querySelector('.livue-devtools__panel[data-subtab="benchmark"]');
      t && Gs(t, ci);
    }
}
function Jn() {
  if ($)
    switch (Pe) {
      case "components":
        var e = $.querySelector(".livue-devtools__tree");
        e && ma(e), cr();
        break;
      case "timeline":
        var t = $.querySelector('.livue-devtools__panel[data-tab="timeline"]');
        t && ba(t);
        break;
      case "events":
        var n = $.querySelector('.livue-devtools__panel[data-tab="events"]');
        n && ya(n);
        break;
      case "stores":
        var r = $.querySelector('.livue-devtools__panel[data-tab="stores"]');
        r && Zs(r);
        break;
      case "echo":
        var i = $.querySelector('.livue-devtools__panel[data-tab="echo"]');
        i && Qs(i);
        break;
      case "perf":
        var o = $.querySelector('.livue-devtools__panel[data-tab="perf"]');
        o && eu(o);
        break;
      case "settings":
        var a = $.querySelector('.livue-devtools__panel[data-tab="settings"]');
        a && tu(a);
        break;
    }
}
function Gs(e, t) {
  e.innerHTML = "";
  var n = Ss();
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
  var o = n.filter(function(j) {
    return j.componentId === t.id;
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
  d.style.cssText = "color: #858585; font-size: 11px; margin-bottom: 6px;", d.textContent = si(l.time), s.appendChild(d);
  var c = ["mount", "method_call", "render", "total"];
  for (var v in l.timings) {
    var h = l.timings[v], p = h / 1e3, m = c.indexOf(v) !== -1, g = m ? 50 : 5, _ = m ? 200 : 20, E = p < g ? "good" : p < _ ? "warn" : "bad";
    s.appendChild(ve(v, $i(h), E));
  }
  e.appendChild(s);
  var A = xs(t.id);
  if (A && A.count > 1) {
    var C = document.createElement("div");
    C.className = "livue-devtools__perf-section";
    var w = document.createElement("div");
    w.className = "livue-devtools__perf-title", w.textContent = "Session Average (" + A.count + " requests)", C.appendChild(w);
    for (var N in A.averages) {
      var M = Math.round(A.averages[N]), R = M / 1e3, D = c.indexOf(N) !== -1, k = R < (D ? 50 : 5) ? "good" : R < (D ? 200 : 20) ? "warn" : "bad";
      C.appendChild(ve(N, $i(M), k));
    }
    e.appendChild(C);
  }
}
function Zs(e) {
  e.innerHTML = "";
  var t = Ns(), n = t.stores, r = document.createElement("div");
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
function Qs(e) {
  e.innerHTML = "";
  var t = Ls(), n = document.createElement("div");
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
    t.channels.forEach(function(p) {
      var m = document.createElement("div");
      m.style.cssText = "padding: 4px 0; display: flex; align-items: center; gap: 8px;";
      var g = document.createElement("span");
      g.style.cssText = "padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600;", p.type === "private" ? (g.style.background = "#4d3a12", g.style.color = "#dcdcaa") : p.type === "presence" ? (g.style.background = "#264f78", g.style.color = "#9cdcfe") : (g.style.background = "#2d4a2d", g.style.color = "#6a9955"), g.textContent = p.type, m.appendChild(g);
      var _ = document.createElement("span");
      _.style.color = "#d4d4d4", _.textContent = p.name, m.appendChild(_), s.appendChild(m);
    });
  e.appendChild(s);
  var c = document.createElement("div");
  c.className = "livue-devtools__perf-section";
  var v = document.createElement("div");
  if (v.className = "livue-devtools__perf-title", v.textContent = "Subscriptions (" + t.subscriptions.length + ")", c.appendChild(v), t.subscriptions.length === 0) {
    var h = document.createElement("div");
    h.style.cssText = "color: #858585; font-size: 11px;", h.textContent = "No active subscriptions", c.appendChild(h);
  } else
    t.subscriptions.forEach(function(p) {
      var m = document.createElement("div");
      m.style.cssText = "padding: 4px 0; font-size: 11px;", m.innerHTML = '<span style="color: #9cdcfe;">' + p.channelName + '</span> <span style="color: #858585;">→</span> <span style="color: #dcdcaa;">' + p.event + '</span> <span style="color: #858585;">(component: ' + p.componentId.substring(0, 8) + "...)</span>", c.appendChild(m);
    });
  e.appendChild(c);
}
function eu(e) {
  e.innerHTML = "";
  var t = ca(), n = document.createElement("div");
  n.className = "livue-devtools__perf-section";
  var r = document.createElement("div");
  r.className = "livue-devtools__perf-title", r.textContent = "AJAX Requests", n.appendChild(r), n.appendChild(ve("Total Requests", t.totalRequests)), n.appendChild(ve("Successful", t.successfulRequests, "good")), n.appendChild(ve("Failed", t.failedRequests, t.failedRequests > 0 ? "bad" : null)), e.appendChild(n);
  var i = document.createElement("div");
  i.className = "livue-devtools__perf-section";
  var o = document.createElement("div");
  o.className = "livue-devtools__perf-title", o.textContent = "Request Timing", i.appendChild(o);
  var a = t.avgRequestTime < 100 ? "good" : t.avgRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ve("Average", _n(t.avgRequestTime), a));
  var l = t.minRequestTime < 100 ? "good" : t.minRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ve("Fastest", t.minRequestTime === 1 / 0 ? "-" : _n(t.minRequestTime), l));
  var s = t.maxRequestTime < 100 ? "good" : t.maxRequestTime < 500 ? "warn" : "bad";
  i.appendChild(ve("Slowest", t.maxRequestTime === 0 ? "-" : _n(t.maxRequestTime), s)), e.appendChild(i);
  var u = document.createElement("div");
  u.className = "livue-devtools__perf-section";
  var d = document.createElement("div");
  d.className = "livue-devtools__perf-title", d.textContent = "Template Swaps", u.appendChild(d), u.appendChild(ve("Total Swaps", t.totalTemplateSwaps));
  var c = t.avgTemplateSwapTime < 5 ? "good" : t.avgTemplateSwapTime < 20 ? "warn" : "bad";
  u.appendChild(ve("Average Time", _n(t.avgTemplateSwapTime), c)), e.appendChild(u);
  var v = document.createElement("div");
  v.className = "livue-devtools__perf-section";
  var h = document.createElement("div");
  h.className = "livue-devtools__perf-title", h.textContent = "Components", v.appendChild(h);
  var p = Es(), m = p.filter(function(_) {
    return !_.isChild;
  }), g = p.filter(function(_) {
    return _.isChild;
  });
  v.appendChild(ve("Root Components", m.length)), v.appendChild(ve("Child Components", g.length)), v.appendChild(ve("Total", p.length)), e.appendChild(v);
}
function tu(e) {
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
    var v = document.createElement("span");
    v.className = "livue-devtools__settings-btn-icon", v.textContent = d.icon, c.appendChild(v);
    var h = document.createElement("span");
    h.textContent = d.label, c.appendChild(h), c.addEventListener("click", function() {
      nu(d.id);
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
function nu(e) {
  if (Ke !== e && (Ke = e, Nt(), $)) {
    $.className = "livue-devtools livue-devtools--" + Ke, Le && $.classList.add("livue-devtools--minimized");
    var t = xa(), n = $.querySelector(".livue-devtools__btn");
    n && (n.textContent = Le ? t.minimized : t.expanded), Jn();
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
function _n(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1 ? "<1ms" : Math.round(e) + "ms";
}
function $i(e) {
  return e === 0 || isNaN(e) || !isFinite(e) ? "-" : e < 1e3 ? e + "µs" : (e / 1e3).toFixed(2) + "ms";
}
function ru() {
  Jt = function(e) {
    e.ctrlKey && e.shiftKey && e.key === "L" && (e.preventDefault(), Sa());
  }, document.addEventListener("keydown", Jt);
}
function iu() {
  In = setInterval(function() {
    if ($ && Pe === "components") {
      var e = $.querySelector(".livue-devtools__tree");
      e && ma(e), cr();
    }
  }, 500);
}
var sn = !1;
function Ca(e) {
  sn || (Us(e), sn = !0, Ws() && di());
}
function ou() {
  if (!sn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  di();
}
function au() {
  fi();
}
function Ta() {
  if (!sn) {
    console.warn("[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.");
    return;
  }
  Sa();
}
function lu() {
  return Js();
}
function su() {
  return pa();
}
function uu() {
  return sa();
}
function cu() {
  return ua();
}
function du() {
  return ca();
}
function fu() {
  da();
}
function pu() {
  fa();
}
function vu() {
  Cs();
}
function Aa(e) {
  ws(e);
}
function mu() {
  return sn;
}
function hu() {
  aa();
}
function gu() {
  la();
}
function Na() {
  return _s();
}
const bu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: vu,
  clearEvents: pu,
  clearTimeline: fu,
  close: au,
  getComponents: su,
  getEvents: cu,
  getPerf: du,
  getTimeline: uu,
  init: Ca,
  isCollecting: Na,
  isInitialized: mu,
  isOpen: lu,
  logEvent: Aa,
  open: ou,
  startCollecting: hu,
  stopCollecting: gu,
  toggle: Ta
}, Symbol.toStringTag, { value: "Module" }));
var We = /* @__PURE__ */ new Map();
function un(e, t, n, r) {
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
function Pn(e, t, n, r, i, o) {
  Na() && Aa({
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
function Bi(e) {
  We.forEach(function(t, n) {
    t.forEach(function(r) {
      r.componentId === e && t.delete(r);
    }), t.size === 0 && We.delete(n);
  });
}
function yu(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    Pn(n.name, n.data, n.mode, n.source, n.sourceId, n.target);
  }
}
function _u(e, t) {
  var n = new URL(window.location), r = !1;
  for (var i in e) {
    var o = e[i], a = o.as || i, l = t[i], s = !1;
    o.except !== null && o.except !== void 0 && String(l) === String(o.except) && (s = !0), !o.keep && !s && (l === "" || l === null || l === void 0) && (s = !0), s ? n.searchParams.delete(a) : n.searchParams.set(a, l), o.history && (r = !0);
  }
  n.toString() !== window.location.toString() && (r ? history.pushState({}, "", n) : history.replaceState({}, "", n));
}
function pi() {
  var e = document.querySelector('meta[name="livue-prefix"]'), t = e ? e.getAttribute("content") : "livue";
  return "/" + t + "/upload";
}
function wu(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = new FormData();
    l.append("file", e), l.append("component", t), l.append("property", n), l.append("checksum", r);
    var s = new XMLHttpRequest(), u = pi();
    s.open("POST", u, !0);
    var d = At();
    d && s.setRequestHeader("X-CSRF-TOKEN", d), s.setRequestHeader("Accept", "application/json"), i && s.upload && s.upload.addEventListener("progress", function(c) {
      if (c.lengthComputable) {
        var v = Math.round(c.loaded / c.total * 100);
        i(v);
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
        var v = new Error(c.error || c.message || "Upload failed");
        v.status = s.status, v.data = c, a(v);
      }
    }, s.onerror = function() {
      a(new Error("Network error during upload"));
    }, s.send(l);
  });
}
function gr(e) {
  if (!e || e.length === 0) return Promise.resolve();
  var t = pi() + "-remove", n = At();
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
function Eu(e, t, n, r, i) {
  return new Promise(function(o, a) {
    var l = Array.from(e), s = new FormData();
    l.forEach(function(v) {
      s.append("files[]", v);
    }), s.append("component", t), s.append("property", n), s.append("checksum", r);
    var u = new XMLHttpRequest(), d = pi();
    u.open("POST", d, !0);
    var c = At();
    c && u.setRequestHeader("X-CSRF-TOKEN", c), u.setRequestHeader("Accept", "application/json"), i && u.upload && u.upload.addEventListener("progress", function(v) {
      if (v.lengthComputable) {
        var h = Math.round(v.loaded / v.total * 100);
        i({ overall: h });
      }
    }), u.onload = function() {
      var v;
      try {
        v = JSON.parse(u.responseText);
      } catch {
        a(new Error("Invalid server response"));
        return;
      }
      if (u.status >= 200 && u.status < 300)
        o({
          results: v.results || [],
          errors: v.errors || []
        });
      else {
        var h = new Error(v.error || v.message || "Upload failed");
        h.status = u.status, h.data = v, a(h);
      }
    }, u.onerror = function() {
      a(new Error("Network error during upload"));
    }, u.send(s);
  });
}
let Xt = /* @__PURE__ */ new Map(), Kt = /* @__PURE__ */ new Map();
function Ct(e, t) {
  let n = e + ":debounce:" + t;
  if (!Xt.has(n)) {
    let r = null, i = null, o = null, a = null, l = function(s) {
      return i = s, clearTimeout(r), new Promise(function(u, d) {
        o = u, a = d, r = setTimeout(function() {
          let c = i, v = o, h = a;
          i = null, o = null, a = null, Promise.resolve(c()).then(v).catch(h);
        }, t);
      });
    };
    Xt.set(n, l);
  }
  return Xt.get(n);
}
function cn(e, t) {
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
function Fi(e) {
  let t = e + ":";
  for (let n of Xt.keys())
    n.startsWith(t) && Xt.delete(n);
  for (let n of Kt.keys())
    n.startsWith(t) && Kt.delete(n);
}
const Xn = "livue-tab-sync";
let vi = Date.now() + "-" + Math.random().toString(36).substr(2, 9), Kn = null, mi = /* @__PURE__ */ new Map(), Wi = !1;
function La() {
  Wi || (Wi = !0, typeof BroadcastChannel < "u" ? (Kn = new BroadcastChannel(Xn), Kn.onmessage = Su) : window.addEventListener("storage", xu));
}
function Su(e) {
  let t = e.data;
  t.tabId !== vi && ka(t);
}
function xu(e) {
  if (e.key === Xn && e.newValue)
    try {
      let t = JSON.parse(e.newValue);
      if (t.tabId === vi) return;
      ka(t);
    } catch {
    }
}
function ka(e) {
  let t = mi.get(e.component);
  t && t(e.state, e.properties, e.config);
}
function Cu(e, t) {
  La(), mi.set(e, t);
}
function Ui(e) {
  mi.delete(e);
}
function Tu(e, t, n, r) {
  La();
  let i = {
    tabId: vi,
    component: e,
    state: t,
    properties: n,
    config: r
  };
  if (Kn)
    Kn.postMessage(i);
  else
    try {
      localStorage.setItem(Xn, JSON.stringify(i)), localStorage.removeItem(Xn);
    } catch {
    }
}
function Au(e, t, n) {
  let r = {};
  for (let i of t)
    n.only && !n.only.includes(i) || n.except && n.except.includes(i) || i in e && (r[i] = e[i]);
  return r;
}
const hi = /* @__PURE__ */ new Map();
async function Nu(e, t = {}) {
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
        "X-CSRF-TOKEN": At(),
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
      const v = s.split(`
`);
      s = v.pop() || "";
      for (const h of v)
        if (h.trim())
          try {
            const p = JSON.parse(h);
            if (p.stream)
              Lu(p.stream), n(p.stream);
            else {
              if (p.error)
                throw new Error(p.error);
              p.snapshot && (u = p);
            }
          } catch (p) {
            console.error("[LiVue Stream] Parse error:", p, h);
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
function Lu(e) {
  const { to: t, content: n, replace: r } = e, i = hi.get(t);
  if (!i) {
    console.warn(`[LiVue Stream] Target not found: ${t}`);
    return;
  }
  const { el: o } = i;
  r ? o.innerHTML = n : o.innerHTML += n;
}
function Ji(e, t, n = !1) {
  hi.set(e, { el: t, replace: n });
}
function Xi(e) {
  hi.delete(e);
}
function ku(e) {
  return Array.isArray(e) && e.length === 2 && e[1] !== null && typeof e[1] == "object" && "s" in e[1];
}
function gi(e) {
  let t = {};
  for (let n in e) {
    let r = e[n];
    ku(r) ? t[n] = r[0] : r && typeof r == "object" && !Array.isArray(r) ? t[n] = gi(r) : t[n] = r;
  }
  return t;
}
function Du(e, t) {
  let n = e.composables || {}, r = e.composableActions || {}, i = {}, o = /* @__PURE__ */ new Set([
    ...Object.keys(n),
    ...Object.keys(r)
  ]);
  for (let a of o) {
    let l = n[a] || {}, s = r[a] || {}, u = gi(l), d = {};
    for (let c in s)
      d[c] = /* @__PURE__ */ (function(v, h) {
        return function() {
          let p = Array.prototype.slice.call(arguments);
          return t(v + "." + h, p);
        };
      })(a, c);
    i[a] = ke(Object.assign({}, u, d));
  }
  return i;
}
function Ou(e, t) {
  let n = t.composables || {};
  t.composableActions;
  for (let r in n) {
    let i = gi(n[r]);
    if (e[r])
      for (let o in i)
        typeof e[r][o] != "function" && (e[r][o] = i[o]);
  }
}
function Mu(e) {
  return e.composables && Object.keys(e.composables).length > 0 || e.composableActions && Object.keys(e.composableActions).length > 0;
}
function Iu(e, t) {
  for (var n in t) {
    var r = "<!--livue-fragment:" + n + "-->", i = "<!--/livue-fragment:" + n + "-->", o = e.indexOf(r), a = e.indexOf(i);
    o !== -1 && a !== -1 && (e = e.substring(0, o) + t[n] + e.substring(a + i.length));
  }
  return e;
}
function Yr(e, t, n, r, i, o, a) {
  a = a || {};
  let l = a.pinia || null, s = ts(), u = n.name, d = n.vueMethods || {}, c = n.jsonMethods || [], v = n.confirms || {}, h = Array.isArray(n.methods) ? n.methods.slice() : null, p = n.isolate || !1, m = n.urlParams || null, g = n.uploads || null, _ = n.tabSync || null, E = !1, A = i, C = o, w = a.initialHtml || null, N = ke({}), M = [];
  function R() {
    for (let f = 0; f < M.length; f++)
      try {
        M[f]();
      } catch {
      }
    M = [];
  }
  function D(f) {
    if (R(), !!Array.isArray(f))
      for (let y = 0; y < f.length; y++) {
        let S = f[y];
        if (!S || typeof S != "object" || !S.bridge || typeof S.bridge != "object") continue;
        let L = ot(e, S.name, { scope: S.scope || "auto" }, l);
        if (!L) continue;
        let b = S.bridge;
        for (let V in b) {
          let W = b[V];
          if (!W || typeof W != "object") continue;
          let re = W.prop, te = W.mode || "two-way";
          if (!(!re || !(re in t))) {
            if (te === "two-way" || te === "store-to-state") {
              let Q = Ce(function() {
                return L[V];
              }, function(Ze) {
                t[re] !== Ze && (t[re] = Ze);
              });
              M.push(Q);
            }
            if (te === "two-way" || te === "state-to-store") {
              let Q = Ce(function() {
                return t[re];
              }, function(Ze) {
                L[V] !== Ze && (L[V] = Ze);
              });
              M.push(Q);
            }
          }
        }
      }
  }
  function k(f) {
    let y = yl(e, f, l);
    for (let S in y)
      N[S] = y[S];
    D(f);
  }
  k(n.stores || []), a.cleanups && typeof a.cleanups.cleanup == "function" && a.cleanups.cleanup(function() {
    R(), _l(e);
  });
  function j(f) {
    let y = document.querySelector('meta[name="livue-prefix"]'), L = "/" + (y ? y.getAttribute("content") : "livue") + "/download?token=" + encodeURIComponent(f.token), b = document.createElement("a");
    b.href = L, b.download = f.name, b.style.display = "none", document.body.appendChild(b), b.click(), document.body.removeChild(b);
  }
  function Y() {
    let f = yn(A, t);
    return {
      snapshot: C,
      diffs: f
    };
  }
  function K(f, y) {
    if (f.redirect) {
      ai(f.redirect);
      return;
    }
    if (f.errorBoundary) {
      let b = f.errorBoundary;
      x.errorState.hasError = b.hasError, x.errorState.errorMessage = b.errorMessage, x.errorState.errorDetails = b.errorDetails, x.errorState.recover = b.recover, (!b.errorHandled || !b.recover) && be("error.occurred", {
        error: new Error(b.errorMessage || "Component error"),
        componentName: u,
        componentId: e,
        context: { method: b.errorMethod, serverHandled: b.errorHandled },
        preventDefault: function() {
        }
      });
    }
    if (f.download && j(f.download), f.snapshot) {
      let b;
      try {
        b = JSON.parse(f.snapshot);
      } catch (V) {
        console.error("[LiVue] Failed to parse server snapshot:", V), b = null;
      }
      if (b && b.state) {
        let V = St(b.state);
        ol(t, V), A = JSON.parse(JSON.stringify(V));
      }
      b && (C = f.snapshot), b && b.memo && (b.memo.errors ? Ee(x.errors, b.memo.errors) : Wr(x.errors), b.memo.vueMethods && (d = b.memo.vueMethods), b.memo.jsonMethods && (c = b.memo.jsonMethods), b.memo.urlParams && (m = b.memo.urlParams), b.memo.uploads && (g = b.memo.uploads), b.memo.confirms && (v = b.memo.confirms), Object.prototype.hasOwnProperty.call(b.memo, "methods") && (h = Array.isArray(b.memo.methods) ? b.memo.methods.slice() : null, x._callableMethods = h), (b.memo.composables || b.memo.composableActions) && Ou(J, b.memo), b.memo.stores && k(b.memo.stores));
    }
    if (m && _u(m, t), (f.html || f.fragments) && r && r._updateTemplate) {
      let b = {};
      if (f.snapshot) {
        let V;
        try {
          V = JSON.parse(f.snapshot);
        } catch {
          V = null;
        }
        V && V.memo && (V.memo.transitionType && (b.transitionType = V.memo.transitionType), V.memo.skipTransition && (b.skipTransition = !0));
      }
      if (f.fragments) {
        let V = w || (a.el ? a.el.innerHTML : null);
        if (V) {
          let W = Iu(V, f.fragments);
          w = W, r._updateTemplate(W, b);
        }
      } else
        w = f.html, r._updateTemplate(f.html, b);
    }
    if (f.events && f.events.length > 0) {
      for (var S = 0; S < f.events.length; S++)
        f.events[S].sourceId = e;
      yu(f.events);
    }
    if (f.js && f.js.length > 0)
      for (var L = 0; L < f.js.length; L++)
        try {
          new Function("state", "livue", f.js[L])(t, x);
        } catch (b) {
          console.error("[LiVue] Error executing ->vue() JS:", b);
        }
    if (f.benchmark && be("benchmark.received", {
      componentId: e,
      componentName: u,
      timings: f.benchmark
    }), _ && _.enabled && f.snapshot && !E && JSON.parse(f.snapshot).state) {
      let V = qo(t), W = [];
      for (let re in V)
        (!y || !(re in y)) && W.push(re);
      if (W.length > 0) {
        let re = Au(V, W, _);
        Object.keys(re).length > 0 && Tu(u, re, W, _);
      }
    }
    if (E = !1, f.jsonResult !== void 0)
      return f.jsonResult;
  }
  let U = ke({}), G = {}, J = {}, X = function(f, y) {
    return x.call(f, y);
  };
  Mu(n) && (J = Du(n, X));
  let x = ke({
    loading: !1,
    processing: null,
    errors: s,
    uploading: !1,
    uploadProgress: 0,
    streaming: !1,
    streamingMethod: null,
    loadingTargets: U,
    refs: {},
    stores: N,
    _pinia: l,
    _callableMethods: h,
    /**
     * Check if any property (or a specific property) has changed since last sync.
     * @param {string} [property] - Property name to check, or omit for any
     * @returns {boolean}
     */
    isDirty: function(f) {
      let y = yn(A, t);
      return f === void 0 ? Object.keys(y).length > 0 : f in y;
    },
    /**
     * Get the set of dirty (changed) property names.
     * This is a getter that returns a new Set on each access.
     * @returns {Set<string>}
     */
    get dirtyFields() {
      let f = yn(A, t);
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
      return f ? U[f] || !1 : x.loading;
    },
    /**
     * Get loading-related attributes for binding to elements.
     * @param {string} [action] - Method name to check, or omit for any
     * @returns {object} Attributes object with aria-busy and disabled
     */
    loadingAttrs: function(f) {
      let y = f ? U[f] || !1 : x.loading;
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
    call: async function(f, y, S) {
      let L, b = null;
      if (arguments.length === 1 ? L = [] : arguments.length === 2 ? Array.isArray(y) ? L = y : L = [y] : arguments.length >= 3 && (Array.isArray(y) && S && typeof S == "object" && (S.debounce || S.throttle) ? (L = y, b = S) : L = Array.prototype.slice.call(arguments, 1)), G[f])
        return G[f](x, L);
      if (d[f]) {
        try {
          new Function("state", "livue", d[f])(t, x);
        } catch (re) {
          console.error('[LiVue] Error executing #[Vue] method "' + f + '":', re);
        }
        return;
      }
      let V = c.includes(f), W = async function() {
        if (v[f] && !await x._showConfirm(v[f]))
          return;
        x.loading = !0, x.processing = f, U[f] = !0;
        let re;
        try {
          let te = Y(), Q = await hr(te.snapshot, f, L, te.diffs, p || V);
          re = K(Q, te.diffs);
        } catch (te) {
          if (V)
            throw { status: te.status, errors: te.data && te.data.errors, message: te.message };
          te.status === 422 && te.data && te.data.errors ? Ee(x.errors, te.data.errors) : ct(te, u);
        } finally {
          x.loading = !1, x.processing = null, delete U[f];
        }
        return re;
      };
      return b && b.debounce ? Ct(e + ":" + f, b.debounce)(W) : b && b.throttle ? cn(e + ":" + f, b.throttle)(W) : W();
    },
    /**
     * Call a method with inline confirmation (bypasses #[Confirm] attribute).
     * Useful when you want confirmation only in specific contexts.
     * @param {string} method
     * @param {string} message - Confirmation message
     * @param {...*} args - Method arguments
     */
    callWithConfirm: async function(f, y) {
      let S = Array.prototype.slice.call(arguments, 2), L = { message: y || "Are you sure?" };
      if (await x._showConfirm(L))
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
    store: function(f, y, S) {
      if (y === void 0) {
        let L = ot(e, f, S || { scope: "auto" }, l);
        if (L)
          return L;
        throw new Error('[LiVue] store("' + f + '"): store not found. Provide a definition or register it in PHP.');
      }
      return ii(e, f, y, S, l);
    },
    /**
     * Resolve a previously registered store by name.
     * Looks in component scope first, then global scope.
     *
     * @param {string} name
     * @returns {object}
     */
    useStore: function(f) {
      let y = ot(e, f, { scope: "auto" }, l);
      if (y)
        return N[f] = y, y;
      throw new Error('[LiVue] useStore("' + f + '"): store not found.');
    },
    /**
     * Resolve a previously registered global store by name.
     *
     * @param {string} name
     * @returns {object}
     */
    useGlobalStore: function(f) {
      let y = ot(e, f, { scope: "global" }, l);
      if (y)
        return N[f] = y, y;
      throw new Error('[LiVue] useGlobalStore("' + f + '"): global store not found.');
    },
    /**
     * Sync current state to the server without calling any method.
     * Useful after local changes via set() or v-model.
     */
    sync: async function() {
      x.loading = !0, x.processing = "$sync";
      try {
        let f = Y(), y = await hr(f.snapshot, null, [], f.diffs, p);
        K(y, f.diffs);
      } catch (f) {
        f.status === 422 && f.data && f.data.errors ? Ee(x.errors, f.data.errors) : ct(f, u);
      } finally {
        x.loading = !1, x.processing = null;
      }
    },
    /**
     * Clear all validation errors.
     */
    clearErrors: function() {
      Wr(x.errors);
    },
    /**
     * Dispatch an event to all listening components (broadcast).
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatch: function(f, y) {
      Pn(f, y, "broadcast", u, e, null);
    },
    /**
     * Dispatch an event to a specific component by name.
     * @param {string} targetName
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchTo: function(f, y, S) {
      Pn(y, S, "to", u, e, f);
    },
    /**
     * Dispatch an event to this component only.
     * @param {string} eventName
     * @param {*} [data]
     */
    dispatchSelf: function(f, y) {
      Pn(f, y, "self", u, e, null);
    },
    /**
     * Navigate to a URL using SPA navigation.
     * @param {string} url - Target URL
     */
    navigate: function(f) {
      dn(f, !0);
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
      if (!g || !g[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      var S = vr(t, f);
      S && S.__livue_upload && S.ref && gr([S.ref]), x.uploading = !0, x.uploadProgress = 0;
      try {
        var L = await wu(y, u, f, g[f].token, function(b) {
          x.uploadProgress = b;
        });
        bn(t, f, {
          __livue_upload: !0,
          ref: L.ref,
          originalName: L.originalName,
          mimeType: L.mimeType,
          size: L.size,
          previewUrl: L.previewUrl
        });
      } catch (b) {
        b.status === 422 && b.data && b.data.errors ? Ee(x.errors, b.data.errors) : ct(b, u);
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
    uploadMultiple: async function(f, y) {
      if (!g || !g[f]) {
        console.error('[LiVue] Property "' + f + '" is not configured for uploads.');
        return;
      }
      x.uploading = !0, x.uploadProgress = 0;
      try {
        var S = await Eu(y, u, f, g[f].token, function(Q) {
          x.uploadProgress = Q.overall;
        }), L = S.results || [], b = S.errors || [], V = vr(t, f), W = Array.isArray(V) ? V : [];
        if (L.length > 0) {
          var re = L.map(function(Q) {
            return {
              __livue_upload: !0,
              ref: Q.ref,
              originalName: Q.originalName,
              mimeType: Q.mimeType,
              size: Q.size,
              previewUrl: Q.previewUrl
            };
          });
          bn(t, f, W.concat(re));
        }
        if (b.length > 0) {
          var te = {};
          b.forEach(function(Q) {
            var Ze = f + "." + Q.index;
            te[Ze] = {
              file: Q.file,
              message: Q.error
            };
          }), Ee(x.errors, te);
        }
      } catch (Q) {
        Q.status === 422 && Q.data && Q.data.errors ? Ee(x.errors, Q.data.errors) : ct(Q, u);
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
    removeUpload: function(f, y) {
      var S = vr(t, f);
      if (y !== void 0 && Array.isArray(S)) {
        var L = S[y];
        L && L.__livue_upload && L.ref && gr([L.ref]), S.splice(y, 1), bn(t, f, S.slice());
      } else
        S && S.__livue_upload && S.ref && gr([S.ref]), bn(t, f, null);
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
      y = y || [], x.loading = !0, x.streaming = !0, x.processing = f, x.streamingMethod = f, U[f] = !0;
      let S;
      try {
        let L = Y();
        L.method = f, L.params = y, L.componentId = e;
        let b = await Nu(L, {
          onChunk: function(V) {
          },
          onComplete: function(V) {
          },
          onError: function(V) {
            console.error("[LiVue Stream] Error:", V);
          }
        });
        b && (S = K(b, L.diffs));
      } catch (L) {
        L.status === 422 && L.data && L.data.errors ? Ee(x.errors, L.data.errors) : ct(L, u);
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
    on: function(f, y) {
      return typeof f != "string" || f.length === 0 ? (console.warn("[LiVue] on() requires a non-empty event name"), function() {
      }) : typeof y != "function" ? (console.warn("[LiVue] on() handler must be a function"), function() {
      }) : un(f, u, e, y);
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
      }) : Ce(
        function() {
          return t[f];
        },
        function(S, L) {
          y(S, L);
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
      }) : (rs(e, f), function() {
        Ur(e);
      });
    },
    /**
     * Reactive error state from server (#[ErrorBoundary]).
     * Contains: hasError, errorMessage, errorDetails, recover
     */
    errorState: ke({
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
    _updateServerState: function(f, y) {
      A = JSON.parse(JSON.stringify(f)), C = y;
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
      let f = yn(A, t), y = {};
      for (let S in J) {
        let L = J[S], b = {}, V = [];
        for (let W in L)
          if (typeof L[W] == "function")
            V.push(W);
          else
            try {
              b[W] = JSON.parse(JSON.stringify(L[W]));
            } catch {
              b[W] = "[Unserializable]";
            }
        y[S] = { data: b, actions: V };
      }
      return {
        serverState: JSON.parse(JSON.stringify(A)),
        clientState: JSON.parse(JSON.stringify(t)),
        dirtyFields: Object.keys(f),
        diffs: f,
        memo: {
          name: u,
          isolate: p,
          urlParams: m,
          tabSync: _,
          hasUploads: !!g,
          uploadProps: g ? Object.keys(g) : [],
          vueMethods: Object.keys(d),
          confirmMethods: Object.keys(v),
          composableNames: Object.keys(J)
        },
        composables: y,
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
  async function Lt() {
    x.loading = !0, x.processing = "$refresh", U.$refresh = !0;
    try {
      let f = Y(), y = await hr(f.snapshot, null, [], f.diffs, p);
      return K(y, f.diffs);
    } catch (f) {
      f.status === 422 && f.data && f.data.errors ? Ee(x.errors, f.data.errors) : ct(f, u);
    } finally {
      x.loading = !1, x.processing = null, delete U.$refresh;
    }
  }
  G.$refresh = function() {
    return Lt();
  }, _ && _.enabled && Cu(u, function(f, y, S) {
    let L = !1;
    if (S.reactive === !0)
      L = !0;
    else if (Array.isArray(S.reactive) && S.reactive.length > 0) {
      for (let b in f)
        if (S.reactive.includes(b)) {
          L = !0;
          break;
        }
    }
    if (L) {
      for (let b in f)
        S.only && !S.only.includes(b) || S.except && S.except.includes(b) || b in t && (t[b] = f[b]);
      E = !0, x.sync();
      return;
    }
    for (let b in f)
      S.only && !S.only.includes(b) || S.except && S.except.includes(b) || b in t && (t[b] = f[b]);
    for (let b in f)
      S.only && !S.only.includes(b) || S.except && S.except.includes(b) || (A[b] = JSON.parse(JSON.stringify(f[b])));
  });
  var kt = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };
  return { livue: new Proxy(x, {
    get: function(f, y, S) {
      if (y in f || typeof y == "symbol")
        return Reflect.get(f, y, S);
      if (typeof y == "string" && y.startsWith("$")) {
        if (G[y])
          return function() {
            var V = Array.prototype.slice.call(arguments);
            return G[y](x, V);
          };
        var L = y.slice(1);
        if (L) {
          var b = Reflect.get(f, L, S);
          if (typeof b == "function")
            return function() {
              var V = Array.prototype.slice.call(arguments);
              return b.apply(f, V);
            };
        }
      }
      if (typeof y == "string" && !y.startsWith("$") && !kt[y])
        return function() {
          var V = Array.prototype.slice.call(arguments);
          return x.call(y, ...V);
        };
    },
    set: function(f, y, S, L) {
      return Reflect.set(f, y, S, L);
    },
    has: function(f, y) {
      if (typeof y == "string" && y.startsWith("$")) {
        if (G[y])
          return !0;
        var S = y.slice(1);
        if (S) {
          var L = Reflect.get(f, S, f);
          if (typeof L == "function")
            return !0;
        }
      }
      return Reflect.has(f, y);
    }
  }), composables: J };
}
function Yn(e, t) {
  let n = e.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
  if (!n)
    return console.error("[LiVue] Component template must have a root HTML tag."), e;
  n[1];
  let r = n.index + n[0].length;
  return e.slice(0, r) + " " + t + e.slice(r);
}
function qn(e, t) {
  let n = document.createElement("div");
  n.innerHTML = e;
  let r = n.querySelectorAll("[v-text], [v-html]");
  for (let s = 0; s < r.length; s++)
    r[s].innerHTML = "";
  let i = {}, o = {};
  Array.from(
    n.querySelectorAll("[data-livue-id][data-livue-snapshot]:not([data-livue-island])")
  ).reverse().forEach(function(s) {
    let u = s.dataset.livueId, d = s.dataset.livueSnapshot || "{}", c, v, h, p, m, g;
    try {
      c = JSON.parse(d), v = c.memo ? c.memo.name : "", h = St(c.state || {}), p = c.memo || {}, m = s.innerHTML, g = s.tagName.toLowerCase();
    } catch (k) {
      console.error("[LiVue] Failed to parse child snapshot:", u, k);
      return;
    }
    let _ = s.nextElementSibling;
    for (; _; ) {
      let k = _.nextElementSibling;
      if (_.tagName === "SCRIPT" && _.getAttribute("type") === "application/livue-setup")
        m += _.outerHTML, _.parentNode.removeChild(_);
      else
        break;
      _ = k;
    }
    let E = t._childRegistry[u];
    if (!E)
      for (let k in t._childRegistry) {
        let j = t._childRegistry[k];
        if (j.name === v && !o[k]) {
          E = j;
          break;
        }
      }
    if (E) {
      o[E.id] = !0, E.rootTag = g;
      let k = p.reactive || [];
      if (k.length > 0) {
        for (var A = 0; A < k.length; A++) {
          var C = k[A];
          C in h && (E.state[C] = h[C]);
        }
        E.livue._updateServerState(h, d), E.componentRef && E.componentRef._updateTemplate && E.componentRef._updateTemplate(m);
      }
    }
    let w = !E;
    if (!E) {
      let j = "livue-child-" + sl();
      t._versions[j] = 0;
      let Y = Ir(h), K;
      try {
        K = JSON.parse(JSON.stringify(h));
      } catch (y) {
        console.error("[LiVue] Failed to clone child server state:", y), K = {};
      }
      let U = Object.assign({ name: p.name || v }, p), G = { _updateTemplate: null }, J = ea(), X = Yr(u, Y, U, G, K, d, {
        el: s,
        rootComponent: t,
        isChild: !0,
        parentLivue: t._rootLivue,
        cleanups: J,
        pinia: t._pinia || null
      }), x = X.livue, Lt = X.composables;
      be("component.init", {
        component: { id: u, name: v, state: Y, livue: x },
        el: s,
        cleanup: J.cleanup,
        isChild: !0
      });
      let kt = p.errors || null;
      kt && Ee(x.errors, kt), E = {
        tagName: j,
        state: Y,
        memo: U,
        livue: x,
        composables: Lt,
        componentRef: G,
        name: v,
        id: u,
        rootTag: g
      };
      let Ge = p.listeners || null;
      if (Ge)
        for (let y in Ge)
          (function(S, L) {
            un(y, v, u, function(b) {
              L.call(S, b);
            });
          })(Ge[y], x);
      let f = p.echo || null;
      f && f.length && (function(y, S) {
        ia(y, f, function(L, b) {
          S.call(L, b);
        });
      })(u, x), G._updateTemplate = function(y) {
        let S = t.el.querySelector('[data-livue-id="' + u + '"]');
        S && Vo(S);
        let L = qn(y, t), b = Yn(
          "<" + E.rootTag + ">" + L.template + "</" + E.rootTag + ">",
          'data-livue-id="' + u + '"'
        );
        if (!t.vueApp) return;
        for (let W in L.childDefs)
          t.vueApp._context.components[W] || t.vueApp.component(W, L.childDefs[W]);
        t.vueApp._context.components[E.tagName]._updateRender(b), or(function() {
          let W = t.el.querySelector('[data-livue-id="' + u + '"]');
          W && jo(W);
        });
      }, t._childRegistry[u] = E, o[u] = !0;
    }
    let N = E.tagName, M = s.dataset.livueRef;
    M && t._rootLivue && (t._rootLivue.refs[M] = {
      /**
       * Call a method on the child component.
       * @param {string} method - Method name
       * @param {Array} [params] - Parameters to pass
       * @returns {Promise}
       */
      call: function(k, j) {
        return E.livue.call(k, j || []);
      },
      /**
       * Set a property on the child component.
       * @param {string} key - Property name
       * @param {*} value - Value to set
       */
      set: function(k, j) {
        return E.livue.set(k, j);
      },
      /**
       * Dispatch an event from the child.
       * @param {string} event - Event name
       * @param {*} [data] - Event data
       */
      dispatch: function(k, j) {
        return E.livue.dispatch(k, j);
      },
      /**
       * Sync the child's state with the server.
       * @returns {Promise}
       */
      sync: function() {
        return E.livue.sync();
      },
      /**
       * Access to the child's reactive state (read-only reference).
       */
      get state() {
        return E.state;
      },
      /**
       * Access to the child's livue helper.
       */
      get livue() {
        return E.livue;
      }
    });
    let R = s.dataset.livueModel;
    if (R && t._rootState && un("$modelUpdate", E.name, u, function(k) {
      k && k.value !== void 0 && (t._rootState[R] = k.value);
    }), w) {
      let k = Yn(
        "<" + g + ">" + m + "</" + g + ">",
        'data-livue-id="' + u + '"'
      );
      i[N] = Vr(
        k,
        E.state,
        E.livue,
        E.composables || {},
        t._versions,
        E.name
      );
    }
    t._versions[N] === void 0 && (t._versions[N] = 0);
    let D = document.createElement(N);
    D.setAttribute(":key", "livueV['" + N + "']"), s.parentNode.replaceChild(D, s);
  });
  let l = n.querySelectorAll("[data-livue-island]");
  for (let s = 0; s < l.length; s++)
    l[s].setAttribute("v-pre", "");
  return {
    template: n.innerHTML,
    childDefs: i
  };
}
let Ki = 0;
function Gr() {
  return typeof document < "u" && "startViewTransition" in document;
}
const br = /* @__PURE__ */ new WeakMap();
function Yi() {
  document.querySelectorAll("[data-livue-transition]").length;
}
const Ru = {
  created(e, t) {
    if ((t.modifiers || {}).skip) {
      e.setAttribute("data-livue-transition-skip", "");
      return;
    }
    let r = t.value;
    r || (Ki++, r = "livue-transition-" + Ki), br.set(e, {
      name: r
    }), e.setAttribute("data-livue-transition", r), Gr() && (e.style.viewTransitionName = r);
  },
  mounted(e, t) {
    Yi();
  },
  updated(e, t) {
    let n = br.get(e);
    if (t.value !== t.oldValue && t.value) {
      let r = t.value;
      n && (n.name = r), e.setAttribute("data-livue-transition", r), Gr() && (e.style.viewTransitionName = r);
    }
  },
  unmounted(e) {
    br.delete(e), e.removeAttribute("data-livue-transition"), Yi();
  }
};
function Pu(e, t = {}) {
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (e(), Promise.resolve()) : (t.type && document.documentElement.classList.add("livue-transition-" + t.type), document.startViewTransition(e).finished.then(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }).catch(function() {
    t.type && document.documentElement.classList.remove("livue-transition-" + t.type);
  }));
}
function qu(e) {
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
function zu(e, t) {
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
let yr = 0;
function Vu(e) {
  return nl({
    name: "LivueLazy",
    props: {
      config: {
        type: Object,
        required: !0
      }
    },
    setup: function(t, n) {
      let r = nn(!1), i = ri(null), o = null, a = nn(null);
      async function l() {
        if (!r.value)
          try {
            let u = await Ql({
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
        yr++;
        let c = "lazy-" + yr + "-" + Date.now(), v = d.memo ? d.memo.name : "", h = St(d.state || {}), p = d.memo || {}, { createLivueHelper: m, buildComponentDef: g, processTemplate: _, createReactiveState: E } = e._lazyHelpers, A = E(h), C = JSON.parse(JSON.stringify(h)), w = { _updateTemplate: null }, N = m(
          c,
          A,
          p,
          w,
          C,
          u.snapshot,
          {
            rootComponent: e,
            isChild: !0,
            parentLivue: e._rootLivue || null,
            pinia: e._pinia || null
          }
        ), M = N.livue, R = N.composables;
        p.errors && Ee(M.errors, p.errors);
        let D = "livue-lazy-child-" + yr, k = _(u.html, e), j = Yn(
          k.template,
          'data-livue-id="' + c + '"'
        ), Y = g(
          j,
          A,
          M,
          R,
          e._versions,
          v
        );
        e._childRegistry[c] = {
          tagName: D,
          state: A,
          memo: p,
          livue: M,
          componentRef: w,
          name: v,
          id: c
        }, w._updateTemplate = function(U) {
          let G = _(U, e), J = Yn(
            G.template,
            'data-livue-id="' + c + '"'
          );
          for (let x in G.childDefs)
            e.vueApp._context.components[x] || e.vueApp.component(x, G.childDefs[x]);
          let X = g(
            J,
            A,
            M,
            R,
            e._versions,
            v
          );
          e.vueApp._context.components[D] = X, e._versions[D] = (e._versions[D] || 0) + 1, i.value = X;
        };
        let K = p.listeners || null;
        if (K)
          for (let U in K)
            (function(G, J) {
              un(U, v, c, function(X) {
                J.call(G, X);
              });
            })(K[U], M);
        for (let U in k.childDefs)
          e.vueApp._context.components[U] || e.vueApp.component(U, k.childDefs[U]);
        e._versions[D] = 0, e.vueApp._context.components[D] || e.vueApp.component(D, Y), i.value = Y, r.value = !0;
      }
      return Ro(function() {
        t.config.onLoad ? requestAnimationFrame(function() {
          l();
        }) : (o = new IntersectionObserver(function(u) {
          u[0].isIntersecting && (o.disconnect(), o = null, l());
        }, { rootMargin: "50px" }), a.value && o.observe(a.value));
      }), Io(function() {
        o && (o.disconnect(), o = null);
      }), function() {
        return r.value && i.value ? xi(i.value) : xi("div", { ref: a }, n.slots.default ? n.slots.default() : null);
      };
    }
  });
}
class ju {
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
    this.name = r.memo ? r.memo.name : "", this.state = Ir(St(r.state || {})), this.memo = r.memo || { name: "" }, this.snapshotJson = n, this.vueApp = null, this._childRegistry = {}, this._versions = ke({}), this._rootDefRef = null, this._currentRootDef = null, this._rootLivue = null, this._rootState = null, this._pinia = null, this._lazyHelpers = {
      createLivueHelper: Yr,
      buildComponentDef: Vr,
      processTemplate: qn,
      createReactiveState: Ir
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
      _updateTemplate: function(m, g) {
        g = g || {}, be("template.updating", {
          component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
          el: r.el,
          html: m
        });
        var _ = qu(r.el);
        Vo(r.el);
        let E;
        try {
          E = qn(m, r);
        } catch (C) {
          console.error("[LiVue] Error processing updated template:", C);
          return;
        }
        if (!r.vueApp) return;
        for (let C in E.childDefs)
          r.vueApp._context.components[C] || r.vueApp.component(C, E.childDefs[C]);
        function A() {
          r._currentRootDef._updateRender(E.template), or(function() {
            jo(r.el), zu(r.el, _), be("template.updated", {
              component: { id: r.componentId, name: r.name, state: r.state, livue: r._rootLivue },
              el: r.el
            });
          });
        }
        if (g.skipTransition) {
          A();
          return;
        }
        Gr() ? Pu(A, { type: g.transitionType }) : A();
      }
    }, o = JSON.parse(JSON.stringify(St(t.state || {})));
    this._cleanups = ea(), this._pinia = Ai();
    let a = Yr(this.componentId, this.state, this.memo, i, o, n, {
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
      u = qn(this.el.innerHTML, this);
    } catch (m) {
      console.error("[LiVue] Error processing initial template:", m), u = { template: this.el.innerHTML, childDefs: {} };
    }
    let d = t.memo && t.memo.errors || null;
    d && Ee(l.errors, d);
    let c = t.memo && t.memo.listeners || null;
    if (c)
      for (let m in c)
        (function(g, _, E, A) {
          un(m, E, A, function(C) {
            _.call(g, C);
          });
        })(c[m], l, r.name, r.componentId);
    let v = t.memo && t.memo.echo || null;
    v && v.length && (this._echoUnsubscribe = ia(r.componentId, v, function(m, g) {
      l.call(m, g);
    }));
    let h = Vr(u.template, r.state, l, s, r._versions, r.name);
    this._currentRootDef = h, this._rootDefRef = ri(h), this.vueApp = rl({
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
    this.vueApp._context.components["livue-lazy"] || this.vueApp.component("livue-lazy", Vu(this)), this._applyPluginsAndMount();
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
    let t = this, n = this.vueApp, r = this._pinia || Ai();
    if (n.use(r), window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0)
      for (let o = 0; o < window.LiVue._setupCallbacks.length; o++)
        try {
          let a = window.LiVue._setupCallbacks[o](n);
          a && typeof a.then == "function" && await a;
        } catch (a) {
          console.error("[LiVue] Error in setup() callback:", a);
        }
    let i = ss();
    for (let o = 0; o < i.length; o++)
      n.directive(i[o].name, i[o].directive);
    t.el.innerHTML = "";
    try {
      t.vueApp.mount(t.el);
    } catch (o) {
      console.error("[LiVue] Vue app mount failed:", o);
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
      }), n.livue && n.livue._cleanups && n.livue._cleanups.runCleanups(), Bi(t), Fi(t), Ur(t), n && n.memo && n.memo.tabSync && n.memo.tabSync.enabled && Ui(n.name), qi(t);
    }
    if (be("component.destroy", {
      component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
      isChild: !1
    }), this._cleanups && this._cleanups.runCleanups(), Bi(this.componentId), Fi(this.componentId), Ur(this.componentId), this.memo && this.memo.tabSync && this.memo.tabSync.enabled && Ui(this.name), this._echoUnsubscribe && (this._echoUnsubscribe(), this._echoUnsubscribe = null), qi(this.componentId), this.vueApp) {
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
function Te(e) {
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
let Gi = /* @__PURE__ */ new Set();
const Hu = {
  mounted(e, t, n) {
    let r = Te(n);
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
    Gi.has(u) || (Gi.add(u), r.call(l, s));
  }
  // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
  // lifetime, even across template swaps. The _initializedComponents set
  // persists for the page lifetime. This is intentional to prevent loops.
}, _r = /* @__PURE__ */ new WeakMap(), $u = {
  mounted(e, t, n) {
    e.tagName !== "FORM" && console.warn("[LiVue] v-submit should be used on <form> elements, got <" + e.tagName.toLowerCase() + ">");
    let r = Te(n);
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
    e.addEventListener("submit", l), _r.set(e, l);
  },
  unmounted(e) {
    let t = _r.get(e);
    t && (e.removeEventListener("submit", t), _r.delete(e));
  }
}, wn = /* @__PURE__ */ new WeakMap(), Bu = {
  mounted(e, t, n) {
    let r = Te(n);
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
    let c = l.leave === !0, v = !1, h = new IntersectionObserver(
      function(p) {
        let m = p[0];
        (c ? !m.isIntersecting : m.isIntersecting) && (!l.once || !v) && (v = !0, r.call(o, a), l.once && (h.disconnect(), wn.delete(e)));
      },
      {
        threshold: u,
        rootMargin: d
      }
    );
    h.observe(e), wn.set(e, h);
  },
  unmounted(e) {
    let t = wn.get(e);
    t && (t.disconnect(), wn.delete(e));
  }
};
var Gn = /* @__PURE__ */ new Set(), gt = /* @__PURE__ */ new WeakMap(), Zi = !1;
function wt(e) {
  return e.split(" ").filter(function(t) {
    return t.trim();
  });
}
function Fu(e, t) {
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
function Zr(e) {
  var t = gt.get(e);
  if (t) {
    var n = e.getAttribute("href");
    if (n) {
      var r = t.value, i = t.modifiers || {}, o = Fu(n, i);
      if (typeof r == "object" && r !== null) {
        var a = r.active ? wt(r.active) : [], l = r.inactive ? wt(r.inactive) : [];
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
        var s = wt(r);
        o ? (s.forEach(function(u) {
          e.classList.add(u);
        }), e.setAttribute("data-current", ""), e.setAttribute("aria-current", "page")) : (s.forEach(function(u) {
          e.classList.remove(u);
        }), e.removeAttribute("data-current"), e.removeAttribute("aria-current"));
      }
    }
  }
}
function Qi() {
  Gn.forEach(function(e) {
    e.isConnected ? Zr(e) : (Gn.delete(e), gt.delete(e));
  });
}
function Wu() {
  Zi || (Zi = !0, window.addEventListener("popstate", Qi), window.addEventListener("livue:navigated", Qi));
}
const Uu = {
  mounted(e, t) {
    gt.set(e, { value: t.value, modifiers: t.modifiers || {} }), Gn.add(e), Wu(), Zr(e);
  },
  updated(e, t) {
    gt.set(e, { value: t.value, modifiers: t.modifiers || {} }), Zr(e);
  },
  unmounted(e) {
    var t = gt.get(e);
    if (t) {
      var n = t.value;
      if (typeof n == "object" && n !== null) {
        var r = n.active ? wt(n.active) : [], i = n.inactive ? wt(n.inactive) : [];
        r.forEach(function(o) {
          e.classList.remove(o);
        }), i.forEach(function(o) {
          e.classList.remove(o);
        });
      } else typeof n == "string" && wt(n).forEach(function(o) {
        e.classList.remove(o);
      });
    }
    e.removeAttribute("data-current"), e.removeAttribute("aria-current"), Gn.delete(e), gt.delete(e);
  }
};
let eo = 0;
const Ju = {
  /**
   * Called before the element is inserted into the DOM.
   * We set up the ignore markers here.
   */
  created(e, t) {
    eo++;
    let n = "livue-ignore-" + eo;
    e.__livue_ignore = !0, e.__livue_ignore_self = t.modifiers.self === !0, e.__livue_ignore_id = n, e.setAttribute("data-livue-ignore-id", n), t.modifiers.self && e.setAttribute("data-livue-ignore-self", "");
  },
  mounted(e, t) {
    e.hasAttribute("data-livue-ignore-id") || e.setAttribute("data-livue-ignore-id", e.__livue_ignore_id);
  },
  unmounted(e) {
    delete e.__livue_ignore, delete e.__livue_ignore_self, delete e.__livue_ignore_id;
  }
}, Ot = /* @__PURE__ */ new WeakMap();
let to = 0;
function Xu(e) {
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
function Ku(e) {
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
function En(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function no(e, t) {
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
function Yu(e) {
  return !!e.component;
}
const Gu = {
  mounted(e, t, n) {
    let r = Xu(n);
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
    to++;
    let s = "model-" + to, u = "input";
    l.blur && (u = "blur"), (l.change || l.lazy) && (u = "change");
    let { debounceMs: d, throttleMs: c } = Ku(l);
    l.live && !d && !c && (d = 150);
    function v(w) {
      if (l.number) {
        let N = Number(w);
        w = isNaN(N) ? 0 : N;
      }
      l.boolean && (w = !!w && w !== "false" && w !== "0"), o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value = w : o[a] = w;
    }
    function h(w) {
      d > 0 ? Ct(s, d)(function() {
        v(w);
      }) : c > 0 ? cn(s, c)(function() {
        v(w);
      }) : v(w);
    }
    let p;
    o[a] && typeof o[a] == "object" && "value" in o[a] ? p = o[a].value : p = o[a];
    let m = Yu(n), g = n.component, _ = null, E = null, A = null, C = null;
    if (m && g)
      C = g.emit, g.emit = function(w, ...N) {
        if (w === "update:modelValue") {
          let M = N[0];
          h(M);
          return;
        }
        return C.call(g, w, ...N);
      }, g.props && "modelValue" in g.props && (A = Ce(
        function() {
          return o[a] && typeof o[a] == "object" && "value" in o[a] ? o[a].value : o[a];
        },
        function(w) {
          g.vnode && g.vnode.props && (g.vnode.props.modelValue = w), g.exposed && typeof g.exposed.setValue == "function" && g.exposed.setValue(w), g.update && g.update();
        },
        { immediate: !0 }
      )), Ot.set(e, {
        isComponent: !0,
        componentInstance: g,
        originalEmit: C,
        stopWatcher: A,
        property: a,
        state: o,
        modifiers: l
      });
    else {
      if (d > 0) {
        let w = Ct(s, d);
        _ = function(N) {
          let M = En(N.target);
          w(function() {
            v(M);
          });
        };
      } else if (c > 0) {
        let w = cn(s, c);
        _ = function(N) {
          let M = En(N.target);
          w(function() {
            v(M);
          });
        };
      } else
        _ = function(w) {
          v(En(w.target));
        };
      l.enter ? (E = function(w) {
        w.key === "Enter" && v(En(w.target));
      }, e.addEventListener("keyup", E)) : e.addEventListener(u, _), no(e, p), Ot.set(e, {
        isComponent: !1,
        handler: _,
        keyHandler: E,
        eventType: u,
        property: a,
        modifiers: l,
        state: o
      });
    }
  },
  updated(e, t, n) {
    let r = Ot.get(e);
    if (r && !r.isComponent) {
      let { property: i, state: o } = r, a;
      o[i] && typeof o[i] == "object" && "value" in o[i] ? a = o[i].value : a = o[i], no(e, a);
    }
  },
  unmounted(e) {
    let t = Ot.get(e);
    t && (t.isComponent ? (t.componentInstance && t.originalEmit && (t.componentInstance.emit = t.originalEmit), t.stopWatcher && t.stopWatcher()) : t.keyHandler ? e.removeEventListener("keyup", t.keyHandler) : t.handler && e.removeEventListener(t.eventType, t.handler), Ot.delete(e));
  }
}, wr = /* @__PURE__ */ new WeakMap(), Zu = 2500;
function Qu(e) {
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)s$/);
    if (n)
      return parseInt(n[1], 10) * 1e3;
    let r = t.match(/^(\d+)ms$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return Zu;
}
const ec = {
  mounted(e, t, n) {
    let r = Te(n);
    if (!r) {
      console.warn("[LiVue] v-poll: livue helper not found in component context");
      return;
    }
    let i = t.value, o = null, a = [];
    Array.isArray(i) ? (o = i[0], a = i[1] || []) : typeof i == "string" && (o = i);
    let l = t.modifiers || {}, s = Qu(l), u = l["keep-alive"] === !0, d = l.visible === !0, c = {
      intervalId: null,
      observer: null,
      isVisible: !d,
      // If not visibleOnly, assume visible
      isPaused: !1
    };
    function v() {
      c.isPaused || d && !c.isVisible || (o ? r.call(o, a) : r.call("$refresh", []));
    }
    function h() {
      c.intervalId || (c.intervalId = setInterval(v, s));
    }
    function p() {
      u || (document.hidden ? c.isPaused = !0 : c.isPaused = !1);
    }
    d && (c.observer = new IntersectionObserver(
      function(m) {
        c.isVisible = m[0].isIntersecting;
      },
      { threshold: 0 }
    ), c.observer.observe(e)), document.addEventListener("visibilitychange", p), c.visibilityHandler = p, h(), wr.set(e, c);
  },
  unmounted(e) {
    let t = wr.get(e);
    t && (t.intervalId && clearInterval(t.intervalId), t.observer && t.observer.disconnect(), t.visibilityHandler && document.removeEventListener("visibilitychange", t.visibilityHandler), wr.delete(e));
  }
}, Sn = /* @__PURE__ */ new WeakMap();
let Zn = typeof navigator < "u" ? navigator.onLine : !0, Qn = /* @__PURE__ */ new Set(), ro = !1;
function tc() {
  ro || typeof window > "u" || (ro = !0, window.addEventListener("online", function() {
    Zn = !0, Qn.forEach(function(e) {
      e(!0);
    });
  }), window.addEventListener("offline", function() {
    Zn = !1, Qn.forEach(function(e) {
      e(!1);
    });
  }));
}
const nc = {
  created(e, t) {
    tc();
    let n = t.modifiers || {}, r = t.value, i = "visibility";
    n.class ? i = n.remove ? "class-remove" : "class-add" : n.attr && (i = "attr");
    let o = {
      mode: i,
      value: r,
      originalDisplay: null
    };
    i === "visibility" && (o.originalDisplay = e.style.display || "", Zn && (e.style.display = "none")), Sn.set(e, o);
  },
  mounted(e, t) {
    let n = Sn.get(e);
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
    r(Zn), n.updateFn = r, Qn.add(r);
  },
  unmounted(e) {
    let t = Sn.get(e);
    t && t.updateFn && Qn.delete(t.updateFn), Sn.delete(e);
  }
};
let io = 0;
const Mt = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new Map(), rc = {
  created(e, t) {
    io++;
    let n = "livue-replace-" + io, r = t.modifiers.self === !0;
    Mt.set(e, {
      id: n,
      isSelf: r,
      version: 0
    }), e.setAttribute("data-livue-replace-id", n), r && e.setAttribute("data-livue-replace-self", ""), Er.set(n, 0);
  },
  mounted(e, t) {
    let n = Mt.get(e);
    n && !e.hasAttribute("data-livue-replace-id") && e.setAttribute("data-livue-replace-id", n.id);
  },
  beforeUpdate(e, t) {
    let n = Mt.get(e);
    n && (n.version++, Er.set(n.id, n.version), e.setAttribute("data-livue-replace-version", n.version));
  },
  unmounted(e) {
    let t = Mt.get(e);
    t && Er.delete(t.id), Mt.delete(e);
  }
}, It = /* @__PURE__ */ new WeakMap(), oo = {
  shortest: 50,
  short: 150,
  long: 1e3,
  longest: 2e3
}, ic = 200;
function oc(e) {
  if (!e.delay)
    return 0;
  for (let t of Object.keys(oo))
    if (e[t])
      return oo[t];
  return ic;
}
function Sr(e, t, n, r, i) {
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
const ac = {
  created(e, t) {
    let n = e.style.display;
    It.set(e, {
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
    let r = Te(n);
    if (!r) {
      console.warn("[LiVue] v-loading: livue helper not found in component context");
      return;
    }
    let i = It.get(e), o = t.modifiers || {}, a = oc(o), l = t.value, s = null, u = null;
    o.class || o.attr ? u = l : typeof l == "string" && (s = l);
    function d(c) {
      i.delayTimer && (clearTimeout(i.delayTimer), i.delayTimer = null), c && a > 0 ? i.delayTimer = setTimeout(function() {
        i.isActive = !0, Sr(e, i, o, u, !0);
      }, a) : c ? (i.isActive = !0, Sr(e, i, o, u, !0)) : (i.isActive = !1, Sr(e, i, o, u, !1));
    }
    i.stopWatch = Ce(
      function() {
        return s ? r.isLoading(s) : r.loading;
      },
      d,
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    It.get(e);
  },
  unmounted(e) {
    let t = It.get(e);
    t && (t.delayTimer && clearTimeout(t.delayTimer), t.stopWatch && t.stopWatch(), It.delete(e));
  }
}, xn = /* @__PURE__ */ new WeakMap(), lc = {
  mounted(e, t, n) {
    let r = Te(n);
    if (!r) {
      console.warn("[LiVue] v-target: livue helper not found in component context");
      return;
    }
    let i = t.value;
    if (!i) {
      console.warn("[LiVue] v-target: action name is required");
      return;
    }
    let o = Ce(
      function() {
        return r.isLoading(i);
      },
      function(a) {
        a ? e.setAttribute("data-loading", "") : e.removeAttribute("data-loading");
      },
      { immediate: !0 }
    );
    xn.set(e, { stopWatch: o });
  },
  updated(e, t, n) {
    let r = xn.get(e), i = Te(n);
    if (!r || !i) return;
    let o = t.value, a = t.oldValue;
    o !== a && (r.stopWatch && r.stopWatch(), r.stopWatch = Ce(
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
    let t = xn.get(e);
    t && (t.stopWatch && t.stopWatch(), xn.delete(e));
  }
}, Rt = /* @__PURE__ */ new WeakMap(), sc = {
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
    Rt.set(e, { targetId: n }), Ji(n, e, r);
  },
  /**
   * Called when the binding value changes.
   */
  updated(e, t) {
    const n = Rt.get(e), r = t.value;
    if (!r || typeof r != "string") {
      console.warn("[v-stream] Target ID must be a non-empty string, got:", r);
      return;
    }
    if (n && n.targetId !== r) {
      Xi(n.targetId);
      const i = t.modifiers.replace || !1;
      Ji(r, e, i), Rt.set(e, { targetId: r });
    }
  },
  /**
   * Called when directive is unbound from the element.
   */
  unmounted(e) {
    const t = Rt.get(e);
    t && (Xi(t.targetId), Rt.delete(e));
  }
}, ao = {
  enter: "Enter",
  esc: "Escape",
  space: " ",
  tab: "Tab",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}, lo = ["ctrl", "alt", "shift", "meta"];
let so = 0;
const uo = /* @__PURE__ */ new Set();
function uc(e, t = 250) {
  for (let n in e) {
    let r = n.match(/^(\d+)(ms)?$/);
    if (r)
      return parseInt(r[1], 10);
  }
  return t;
}
function cc(e, t) {
  for (let i = 0; i < lo.length; i++) {
    let o = lo[i];
    if (t[o] && !e[o + "Key"])
      return !1;
  }
  let n = !1, r = !1;
  for (let i in ao)
    t[i] && (n = !0, e.key === ao[i] && (r = !0));
  return !(n && !r);
}
function F(e, t = {}) {
  let n = t.supportsOutside === !0, r = t.isKeyboardEvent === !0, i = t.allowArg !== !1;
  const o = /* @__PURE__ */ new WeakMap();
  return {
    mounted(a, l, s) {
      const { arg: u, modifiers: d } = l, c = Te(s);
      if (!c) {
        console.warn("[LiVue] v-" + e + ": livue helper not found in component context");
        return;
      }
      if (u && !i) {
        const N = "v-" + e;
        uo.has(N) || (console.warn(
          "[LiVue] " + N + ": argument syntax (v-" + e + ":method) is not supported. Use v-" + e + '="method" or v-' + e + `="['method', ...args]".`
        ), uo.add(N));
      }
      so++;
      const v = "v-" + e + "-" + so, h = uc(d);
      let p = null, m = null;
      d.debounce && (p = Ct(v, h)), d.throttle && (m = cn(v, h));
      let g = !1, _ = null;
      i && u && (_ = u);
      const E = function(N) {
        let M = _, R = [];
        if (i && u) {
          M = u;
          const k = l.value;
          k != null && (R = Array.isArray(k) ? k : [k]);
        } else {
          const k = l.value;
          if (typeof k == "function")
            if (typeof k.__livueMethodName == "string")
              M = k.__livueMethodName, Array.isArray(k.__livueMethodArgs) && (R = k.__livueMethodArgs.slice());
            else {
              const j = function() {
                k();
              };
              p ? p(j) : m ? m(j) : j();
              return;
            }
          else typeof k == "string" ? M = k : Array.isArray(k) && k.length > 0 && (M = k[0], R = k.slice(1));
        }
        if (!M) {
          console.warn("[LiVue] v-" + e + ": no method specified");
          return;
        }
        const D = function() {
          d.confirm ? c.callWithConfirm(M, "Are you sure?", ...R) : c.call(M, ...R);
        };
        p ? p(D) : m ? m(D) : D();
      }, A = function(N) {
        if (!(d.self && N.target !== a) && !(r && !cc(N, d))) {
          if (d.once) {
            if (g)
              return;
            g = !0;
          }
          d.prevent && N.preventDefault(), d.stop && N.stopPropagation(), E();
        }
      }, C = {};
      d.capture && (C.capture = !0), d.passive && (C.passive = !0);
      const w = {
        handler: A,
        options: C,
        outsideHandler: null
      };
      if (n && d.outside) {
        const N = function(M) {
          if (!a.contains(M.target) && M.target !== a) {
            if (d.once) {
              if (g)
                return;
              g = !0;
            }
            E();
          }
        };
        document.addEventListener(e, N, C), w.outsideHandler = N;
      } else
        a.addEventListener(e, A, C);
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
const dc = F("click", {
  supportsOutside: !0,
  allowArg: !1
}), fc = {
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
let co = 0;
const pc = {
  created(e, t) {
    let n = t.value;
    n || (co++, n = "scroll-" + co), e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n;
  },
  updated(e, t) {
    let n = t.value;
    n && n !== e.__livue_scroll_key && (e.setAttribute("data-livue-scroll", n), e.__livue_scroll_key = n);
  },
  unmounted(e) {
    e.removeAttribute("data-livue-scroll"), delete e.__livue_scroll_key;
  }
}, Pt = /* @__PURE__ */ new WeakMap();
function fo(e, t, n, r, i) {
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
const vc = {
  created(e, t) {
    let n = e.style.display;
    Pt.set(e, {
      originalDisplay: n === "none" ? "" : n,
      addedClasses: [],
      addedAttr: null,
      stopWatch: null
    });
    let r = t.modifiers || {};
    !r.class && !r.attr && (e.style.display = "none");
  },
  mounted(e, t, n) {
    let r = Te(n);
    if (!r) {
      console.warn("[LiVue] v-dirty: livue helper not found in component context");
      return;
    }
    let i = Pt.get(e), o = t.modifiers || {}, a = t.arg || null, l = t.value;
    i.stopWatch = Ce(
      function() {
        return a ? r.isDirty(a) : r.isDirty();
      },
      function(s) {
        fo(e, i, o, l, s);
      },
      { immediate: !0 }
    );
  },
  updated(e, t, n) {
    let r = Pt.get(e);
    if (r && t.value !== t.oldValue) {
      let i = Te(n);
      if (i) {
        let o = t.arg || null, a = o ? i.isDirty(o) : i.isDirty();
        fo(e, r, t.modifiers || {}, t.value, a);
      }
    }
  },
  unmounted(e) {
    let t = Pt.get(e);
    t && (t.stopWatch && t.stopWatch(), Pt.delete(e));
  }
}, Cn = /* @__PURE__ */ new WeakMap();
let po = 0;
function mc(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function hc(e, t) {
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
function gc(e, t) {
  let n = t.split("."), r = e[n[0]];
  r && typeof r == "object" && "value" in r && (r = r.value);
  for (let i = 1; i < n.length; i++) {
    if (r == null) return;
    r = r[n[i]];
  }
  return r;
}
const bc = {
  mounted(e, t, n) {
    let r = hc(t, n);
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
    po++;
    let s = "watch-" + i + "-" + po;
    if (l.blur) {
      let v = function() {
        o.sync();
      };
      e.addEventListener("focusout", v), Cn.set(e, { blurHandler: v });
      return;
    }
    let u = mc(l) || 150, d = Ct(s, u), c = Ce(
      function() {
        return gc(a, i);
      },
      function() {
        d(function() {
          return o.sync();
        });
      }
    );
    Cn.set(e, { stopWatcher: c });
  },
  unmounted(e) {
    let t = Cn.get(e);
    t && (t.stopWatcher && t.stopWatcher(), t.blurHandler && e.removeEventListener("focusout", t.blurHandler), Cn.delete(e));
  }
}, Yt = /* @__PURE__ */ new WeakMap();
let vo = 0;
function yc(e) {
  let t = e.type;
  return t === "input" || t === "textarea" || t === "select";
}
function _c(e) {
  return e.props ? !!(e.props.onInput || e.props["onUpdate:modelValue"]) : !1;
}
function wc(e, t) {
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
function fn(e) {
  return e.type === "checkbox" ? e.checked : e.type === "radio" ? e.checked ? e.value : null : e.tagName === "SELECT" && e.multiple ? Array.from(e.selectedOptions).map(function(t) {
    return t.value;
  }) : e.value;
}
function pn(e, t, n) {
  let r = e[t];
  r && typeof r == "object" && "value" in r ? r.value = n : e[t] = n;
}
function Da(e) {
  for (let t in e) {
    let n = t.match(/^(\d+)(ms)?$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 0;
}
function Ec(e, t) {
  if (t in e)
    return t;
  let n = t.toLowerCase();
  for (let r in e)
    if (r.toLowerCase() === n)
      return r;
  return null;
}
function Sc(e) {
  let t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" || t === "select";
}
function xc(e) {
  return Sc(e) ? e : e.querySelector("input, textarea, select");
}
function vn(e, t) {
  return {
    mounted(n, r, i) {
      if (yc(i) && !_c(i))
        throw new Error("[LiVue] v-" + e + ' requires v-model on the element. Usage: <input v-model="prop" v-' + e + ":prop>");
      let o = r.arg;
      if (!o)
        throw new Error("[LiVue] v-" + e + " requires property name as argument. Usage: v-" + e + ":propertyName");
      let a = wc(r, i);
      if (!a)
        throw new Error("[LiVue] v-" + e + ": Could not find component context");
      let { state: l } = a, s = Ec(l, o);
      if (!s)
        throw new Error("[LiVue] v-" + e + ': Property "' + o + '" not found in component state');
      let u = r.modifiers || {};
      vo++;
      let d = e + "-" + vo, c = xc(n);
      if (!c) {
        console.warn("[LiVue] v-" + e + ": Could not find input element inside component");
        return;
      }
      let v = t(c, s, l, u, d);
      c.addEventListener(v.eventType, v.handler, { capture: !0 }), Yt.set(n, {
        targetEl: c,
        handler: v.handler,
        eventType: v.eventType
      });
    },
    unmounted(n) {
      let r = Yt.get(n);
      r && (r.targetEl.removeEventListener(r.eventType, r.handler, { capture: !0 }), Yt.delete(n));
    }
  };
}
const Cc = vn("debounce", function(e, t, n, r, i) {
  let o = Da(r) || 150, a = Ct(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = fn(l.target);
      a(function() {
        pn(n, t, s);
      });
    }
  };
}), Tc = vn("throttle", function(e, t, n, r, i) {
  let o = Da(r) || 150, a = cn(i, o);
  return {
    eventType: "input",
    handler: function(l) {
      l.stopImmediatePropagation();
      let s = fn(l.target);
      a(function() {
        pn(n, t, s);
      });
    }
  };
}), bi = vn("blur", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    pn(n, t, fn(l.target));
  };
  return e.addEventListener("blur", a), e._livueBlurHandler = a, {
    eventType: "input",
    handler: o
  };
}), Ac = bi.unmounted;
bi.unmounted = function(e) {
  let t = Yt.get(e), n = t ? t.targetEl : e;
  n._livueBlurHandler && (n.removeEventListener("blur", n._livueBlurHandler), delete n._livueBlurHandler), Ac(e);
};
const yi = vn("enter", function(e, t, n, r, i) {
  let o = function(l) {
    l.stopImmediatePropagation();
  }, a = function(l) {
    l.key === "Enter" && pn(n, t, fn(l.target));
  };
  return e.addEventListener("keyup", a), e._livueEnterHandler = a, {
    eventType: "input",
    handler: o
  };
}), Nc = yi.unmounted;
yi.unmounted = function(e) {
  let t = Yt.get(e), n = t ? t.targetEl : e;
  n._livueEnterHandler && (n.removeEventListener("keyup", n._livueEnterHandler), delete n._livueEnterHandler), Nc(e);
};
const Lc = vn("boolean", function(e, t, n, r, i) {
  return {
    eventType: "input",
    handler: function(o) {
      o.stopImmediatePropagation();
      let a = fn(o.target);
      a = !!a && a !== "false" && a !== "0", pn(n, t, a);
    }
  };
});
function mo(e, t) {
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
    t % 2 ? mo(Object(n), !0).forEach(function(r) {
      kc(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mo(Object(n)).forEach(function(r) {
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
function kc(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Ve() {
  return Ve = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ve.apply(this, arguments);
}
function Dc(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Oc(e, t) {
  if (e == null) return {};
  var n = Dc(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var Mc = "1.15.6";
function qe(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var je = qe(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), mn = qe(/Edge/i), ho = qe(/firefox/i), Gt = qe(/safari/i) && !qe(/chrome/i) && !qe(/android/i), _i = qe(/iP(ad|od|hone)/i), Oa = qe(/chrome/i) && qe(/android/i), Ma = {
  capture: !1,
  passive: !1
};
function B(e, t, n) {
  e.addEventListener(t, n, !je && Ma);
}
function H(e, t, n) {
  e.removeEventListener(t, n, !je && Ma);
}
function er(e, t) {
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
function Ia(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function xe(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && er(e, t) : er(e, t)) || r && e === n)
        return e;
      if (e === n) break;
    } while (e = Ia(e));
  }
  return null;
}
var go = /\s+/g;
function pe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(go, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(go, " ");
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
function Et(e, t) {
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
function Ra(e, t, n) {
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
    if (e !== window && e.parentNode && e !== Oe() ? (o = e.getBoundingClientRect(), a = o.top, l = o.left, s = o.bottom, u = o.right, d = o.height, c = o.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, c = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !je))
      do
        if (i && i.getBoundingClientRect && (P(i, "transform") !== "none" || n && P(i, "position") !== "static")) {
          var v = i.getBoundingClientRect();
          a -= v.top + parseInt(P(i, "border-top-width")), l -= v.left + parseInt(P(i, "border-left-width")), s = a + o.height, u = l + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var h = Et(i || e), p = h && h.a, m = h && h.d;
      h && (a /= m, l /= p, c /= p, d /= m, s = a + d, u = l + c);
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
function bo(e, t, n) {
  for (var r = Xe(e, !0), i = oe(e)[t]; r; ) {
    var o = oe(r)[n], a = void 0;
    if (a = i >= o, !a) return r;
    if (r === Oe()) break;
    r = Xe(r, !1);
  }
  return !1;
}
function Tt(e, t, n, r) {
  for (var i = 0, o = 0, a = e.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== q.ghost && (r || a[o] !== q.dragged) && xe(a[o], n.draggable, e, !1)) {
      if (i === t)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function wi(e, t) {
  for (var n = e.lastElementChild; n && (n === q.ghost || P(n, "display") === "none" || t && !er(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function ge(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== q.clone && (!t || er(e, t)) && n++;
  return n;
}
function yo(e) {
  var t = 0, n = 0, r = Oe();
  if (e)
    do {
      var i = Et(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function Ic(e, t) {
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
      var i = P(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return Oe();
        if (r || t) return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return Oe();
}
function Rc(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function xr(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var Zt;
function Pa(e, t) {
  return function() {
    if (!Zt) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), Zt = setTimeout(function() {
        Zt = void 0;
      }, t);
    }
  };
}
function Pc() {
  clearTimeout(Zt), Zt = void 0;
}
function qa(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function za(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function Va(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, l, s;
    if (!(!xe(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = oe(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((l = r.right) !== null && l !== void 0 ? l : -1 / 0, u.right), r.bottom = Math.max((s = r.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var fe = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function qc() {
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
            var o = Me({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Et(i, !0);
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
      e.splice(Ic(e, {
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
        var s = 0, u = l.target, d = u.fromRect, c = oe(u), v = u.prevFromRect, h = u.prevToRect, p = l.rect, m = Et(u, !0);
        m && (c.top -= m.f, c.left -= m.e), u.toRect = c, u.thisAnimationDuration && xr(v, c) && !xr(d, c) && // Make sure animatingRect is on line between toRect & fromRect
        (p.top - c.top) / (p.left - c.left) === (d.top - c.top) / (d.left - c.left) && (s = Vc(p, v, h, i.options)), xr(c, d) || (u.prevFromRect = d, u.prevToRect = c, s || (s = i.options.animation), i.animate(u, p, c, s)), s && (o = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        P(r, "transition", ""), P(r, "transform", "");
        var l = Et(this.el), s = l && l.a, u = l && l.d, d = (i.left - o.left) / (s || 1), c = (i.top - o.top) / (u || 1);
        r.animatingX = !!d, r.animatingY = !!c, P(r, "transform", "translate3d(" + d + "px," + c + "px,0)"), this.forRepaintDummy = zc(r), P(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), P(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          P(r, "transition", ""), P(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function zc(e) {
  return e.offsetWidth;
}
function Vc(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var dt = [], Cr = {
  initializeByDefault: !0
}, hn = {
  mount: function(t) {
    for (var n in Cr)
      Cr.hasOwnProperty(n) && !(n in t) && (t[n] = Cr[n]);
    dt.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), dt.push(t);
  },
  pluginEvent: function(t, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = t + "Global";
    dt.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](Me({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](Me({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    dt.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, Ve(r, u.defaults);
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
    return dt.forEach(function(i) {
      typeof i.eventProperties == "function" && Ve(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return dt.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function jc(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, d = e.oldDraggableIndex, c = e.newDraggableIndex, v = e.originalEvent, h = e.putSortable, p = e.extraEventProperties;
  if (t = t || n && n[fe], !!t) {
    var m, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !je && !mn ? m = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (m = document.createEvent("Event"), m.initEvent(r, !0, !0)), m.to = a || n, m.from = l || n, m.item = i || n, m.clone = o, m.oldIndex = s, m.newIndex = u, m.oldDraggableIndex = d, m.newDraggableIndex = c, m.originalEvent = v, m.pullMode = h ? h.lastPutMode : void 0;
    var E = Me(Me({}, p), hn.getEventProperties(r, t));
    for (var A in E)
      m[A] = E[A];
    n && n.dispatchEvent(m), g[_] && g[_].call(t, m);
  }
}
var Hc = ["evt"], de = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = Oc(r, Hc);
  hn.pluginEvent.bind(q)(t, n, Me({
    dragEl: T,
    parentEl: ne,
    ghostEl: z,
    rootEl: Z,
    nextEl: nt,
    lastDownEl: Vn,
    cloneEl: ee,
    cloneHidden: Ue,
    dragStarted: jt,
    putSortable: ae,
    activeSortable: q.active,
    originalEvent: i,
    oldIndex: bt,
    oldDraggableIndex: Qt,
    newIndex: me,
    newDraggableIndex: $e,
    hideGhostForTarget: Ba,
    unhideGhostForTarget: Fa,
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
  jc(Me({
    putSortable: ae,
    cloneEl: ee,
    targetEl: T,
    rootEl: Z,
    oldIndex: bt,
    oldDraggableIndex: Qt,
    newIndex: me,
    newDraggableIndex: $e
  }, e));
}
var T, ne, z, Z, nt, Vn, ee, Ue, bt, me, Qt, $e, Tn, ae, ht = !1, tr = !1, nr = [], Qe, _e, Tr, Ar, _o, wo, jt, ft, en, tn = !1, An = !1, jn, se, Nr = [], Qr = !1, rr = [], dr = typeof document < "u", Nn = _i, Eo = mn || je ? "cssFloat" : "float", $c = dr && !Oa && !_i && "draggable" in document.createElement("div"), ja = (function() {
  if (dr) {
    if (je)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
})(), Ha = function(t, n) {
  var r = P(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Tt(t, 0, n), a = Tt(t, 1, n), l = o && P(o), s = a && P(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + oe(o).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + oe(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return o && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && r[Eo] === "none" || a && r[Eo] === "none" && u + d > i) ? "vertical" : "horizontal";
}, Bc = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, l = r ? n.left : n.top, s = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === l || o === s || i + a / 2 === l + u / 2;
}, Fc = function(t, n) {
  var r;
  return nr.some(function(i) {
    var o = i[fe].options.emptyInsertThreshold;
    if (!(!o || wi(i))) {
      var a = oe(i), l = t >= a.left - o && t <= a.right + o, s = n >= a.top - o && n <= a.bottom + o;
      if (l && s)
        return r = i;
    }
  }), r;
}, $a = function(t) {
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
      var v = (a ? l : s).options.group.name;
      return o === !0 || typeof o == "string" && o === v || o.join && o.indexOf(v) > -1;
    };
  }
  var r = {}, i = t.group;
  (!i || zn(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, Ba = function() {
  !ja && z && P(z, "display", "none");
}, Fa = function() {
  !ja && z && P(z, "display", "");
};
dr && !Oa && document.addEventListener("click", function(e) {
  if (tr)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), tr = !1, !1;
}, !0);
var et = function(t) {
  if (T) {
    t = t.touches ? t.touches[0] : t;
    var n = Fc(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[fe]._onDragOver(r);
    }
  }
}, Wc = function(t) {
  T && T.parentNode[fe]._isOutsideThisEl(t.target);
};
function q(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = Ve({}, t), e[fe] = this;
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
      return Ha(e, this.options);
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
    supportPointer: q.supportPointer !== !1 && "PointerEvent" in window && (!Gt || _i),
    emptyInsertThreshold: 5
  };
  hn.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  $a(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : $c, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? B(e, "pointerdown", this._onTapStart) : (B(e, "mousedown", this._onTapStart), B(e, "touchstart", this._onTapStart)), this.nativeDraggable && (B(e, "dragover", this), B(e, "dragenter", this)), nr.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Ve(this, qc());
}
q.prototype = /** @lends Sortable.prototype */
{
  constructor: q,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (ft = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, T) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, d = i.filter;
      if (Qc(r), !T && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Gt && s && s.tagName.toUpperCase() === "SELECT") && (s = xe(s, i.draggable, r, !1), !(s && s.animated) && Vn !== s)) {
        if (bt = ge(s), Qt = ge(s, i.draggable), typeof d == "function") {
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
          if (c = xe(u, c.trim(), r, !1), c)
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
        i.handle && !xe(u, i.handle, r, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var i = this, o = i.el, a = i.options, l = o.ownerDocument, s;
    if (r && !T && r.parentNode === o) {
      var u = oe(r);
      if (Z = o, T = r, ne = T.parentNode, nt = T.nextSibling, Vn = r, Tn = a.group, q.dragged = T, Qe = {
        target: T,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, _o = Qe.clientX - u.left, wo = Qe.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, T.style["will-change"] = "all", s = function() {
        if (de("delayEnded", i, {
          evt: t
        }), q.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !ho && i.nativeDraggable && (T.draggable = !0), i._triggerDragStart(t, n), ue({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), pe(T, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(d) {
        Ra(T, d.trim(), Lr);
      }), B(l, "dragover", et), B(l, "mousemove", et), B(l, "touchmove", et), a.supportPointer ? (B(l, "pointerup", i._onDrop), !this.nativeDraggable && B(l, "pointercancel", i._onDrop)) : (B(l, "mouseup", i._onDrop), B(l, "touchend", i._onDrop), B(l, "touchcancel", i._onDrop)), ho && this.nativeDraggable && (this.options.touchStartThreshold = 4, T.draggable = !0), de("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(mn || je))) {
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
    T && Lr(T), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    H(t, "mouseup", this._disableDelayedDrag), H(t, "touchend", this._disableDelayedDrag), H(t, "touchcancel", this._disableDelayedDrag), H(t, "pointerup", this._disableDelayedDrag), H(t, "pointercancel", this._disableDelayedDrag), H(t, "mousemove", this._delayedDragTouchMoveHandler), H(t, "touchmove", this._delayedDragTouchMoveHandler), H(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? B(document, "pointermove", this._onTouchMove) : n ? B(document, "touchmove", this._onTouchMove) : B(document, "mousemove", this._onTouchMove) : (B(T, "dragend", this), B(Z, "dragstart", this._onDragStart));
    try {
      document.selection ? Hn(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (ht = !1, Z && T) {
      de("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && B(document, "dragover", Wc);
      var r = this.options;
      !t && pe(T, r.dragClass, !1), pe(T, r.ghostClass, !0), q.active = this, t && this._appendGhost(), ue({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (_e) {
      this._lastX = _e.clientX, this._lastY = _e.clientY, Ba();
      for (var t = document.elementFromPoint(_e.clientX, _e.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(_e.clientX, _e.clientY), t !== n); )
        n = t;
      if (T.parentNode[fe]._isOutsideThisEl(t), n)
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
        } while (n = Ia(n));
      Fa();
    }
  },
  _onTouchMove: function(t) {
    if (Qe) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = z && Et(z, !0), l = z && a && a.a, s = z && a && a.d, u = Nn && se && yo(se), d = (o.clientX - Qe.clientX + i.x) / (l || 1) + (u ? u[0] - Nr[0] : 0) / (l || 1), c = (o.clientY - Qe.clientY + i.y) / (s || 1) + (u ? u[1] - Nr[1] : 0) / (s || 1);
      if (!q.active && !ht) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (z) {
        a ? (a.e += d - (Tr || 0), a.f += c - (Ar || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f: c
        };
        var v = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        P(z, "webkitTransform", v), P(z, "mozTransform", v), P(z, "msTransform", v), P(z, "transform", v), Tr = d, Ar = c, _e = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!z) {
      var t = this.options.fallbackOnBody ? document.body : Z, n = oe(T, !0, Nn, !0, t), r = this.options;
      if (Nn) {
        for (se = t; P(se, "position") === "static" && P(se, "transform") === "none" && se !== document; )
          se = se.parentNode;
        se !== document.body && se !== document.documentElement ? (se === document && (se = Oe()), n.top += se.scrollTop, n.left += se.scrollLeft) : se = Oe(), Nr = yo(se);
      }
      z = T.cloneNode(!0), pe(z, r.ghostClass, !1), pe(z, r.fallbackClass, !0), pe(z, r.dragClass, !0), P(z, "transition", ""), P(z, "transform", ""), P(z, "box-sizing", "border-box"), P(z, "margin", 0), P(z, "top", n.top), P(z, "left", n.left), P(z, "width", n.width), P(z, "height", n.height), P(z, "opacity", "0.8"), P(z, "position", Nn ? "absolute" : "fixed"), P(z, "zIndex", "100000"), P(z, "pointerEvents", "none"), q.ghost = z, t.appendChild(z), P(z, "transform-origin", _o / parseInt(z.style.width) * 100 + "% " + wo / parseInt(z.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, i = t.dataTransfer, o = r.options;
    if (de("dragStart", this, {
      evt: t
    }), q.eventCanceled) {
      this._onDrop();
      return;
    }
    de("setupClone", this), q.eventCanceled || (ee = za(T), ee.removeAttribute("id"), ee.draggable = !1, ee.style["will-change"] = "", this._hideClone(), pe(ee, this.options.chosenClass, !1), q.clone = ee), r.cloneId = Hn(function() {
      de("clone", r), !q.eventCanceled && (r.options.removeCloneOnHide || Z.insertBefore(ee, T), r._hideClone(), ue({
        sortable: r,
        name: "clone"
      }));
    }), !n && pe(T, o.dragClass, !0), n ? (tr = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (H(document, "mouseup", r._onDrop), H(document, "touchend", r._onDrop), H(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, T)), B(document, "drop", r), P(T, "transform", "translateZ(0)")), ht = !0, r._dragStartId = Hn(r._dragStarted.bind(r, n, t)), B(document, "selectstart", r), jt = !0, window.getSelection().removeAllRanges(), Gt && P(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, l = this.options, s = l.group, u = q.active, d = Tn === s, c = l.sort, v = ae || u, h, p = this, m = !1;
    if (Qr) return;
    function g(x, Lt) {
      de(x, p, Me({
        evt: t,
        isOwner: d,
        axis: h ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: c,
        fromSortable: v,
        target: r,
        completed: E,
        onMove: function(Ge, f) {
          return Ln(Z, n, T, i, Ge, oe(Ge), t, f);
        },
        changed: A
      }, Lt));
    }
    function _() {
      g("dragOverAnimationCapture"), p.captureAnimationState(), p !== v && v.captureAnimationState();
    }
    function E(x) {
      return g("dragOverCompleted", {
        insertion: x
      }), x && (d ? u._hideClone() : u._showClone(p), p !== v && (pe(T, ae ? ae.options.ghostClass : u.options.ghostClass, !1), pe(T, l.ghostClass, !0)), ae !== p && p !== q.active ? ae = p : p === q.active && ae && (ae = null), v === p && (p._ignoreWhileAnimating = r), p.animateAll(function() {
        g("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
      }), p !== v && (v.animateAll(), v._ignoreWhileAnimating = null)), (r === T && !T.animated || r === n && !r.animated) && (ft = null), !l.dragoverBubble && !t.rootEl && r !== document && (T.parentNode[fe]._isOutsideThisEl(t.target), !x && et(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), m = !0;
    }
    function A() {
      me = ge(T), $e = ge(T, l.draggable), ue({
        sortable: p,
        name: "change",
        toEl: n,
        newIndex: me,
        newDraggableIndex: $e,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = xe(r, l.draggable, n, !0), g("dragOver"), q.eventCanceled) return m;
    if (T.contains(t.target) || r.animated && r.animatingX && r.animatingY || p._ignoreWhileAnimating === r)
      return E(!1);
    if (tr = !1, u && !l.disabled && (d ? c || (a = ne !== Z) : ae === this || (this.lastPutMode = Tn.checkPull(this, u, T, t)) && s.checkPut(this, u, T, t))) {
      if (h = this._getDirection(t, r) === "vertical", i = oe(T), g("dragOverValid"), q.eventCanceled) return m;
      if (a)
        return ne = Z, _(), this._hideClone(), g("revert"), q.eventCanceled || (nt ? Z.insertBefore(T, nt) : Z.appendChild(T)), E(!0);
      var C = wi(n, l.draggable);
      if (!C || Kc(t, h, this) && !C.animated) {
        if (C === T)
          return E(!1);
        if (C && n === t.target && (r = C), r && (o = oe(r)), Ln(Z, n, T, i, r, o, t, !!r) !== !1)
          return _(), C && C.nextSibling ? n.insertBefore(T, C.nextSibling) : n.appendChild(T), ne = n, A(), E(!0);
      } else if (C && Xc(t, h, this)) {
        var w = Tt(n, 0, l, !0);
        if (w === T)
          return E(!1);
        if (r = w, o = oe(r), Ln(Z, n, T, i, r, o, t, !1) !== !1)
          return _(), n.insertBefore(T, w), ne = n, A(), E(!0);
      } else if (r.parentNode === n) {
        o = oe(r);
        var N = 0, M, R = T.parentNode !== n, D = !Bc(T.animated && T.toRect || i, r.animated && r.toRect || o, h), k = h ? "top" : "left", j = bo(r, "top", "top") || bo(T, "top", "top"), Y = j ? j.scrollTop : void 0;
        ft !== r && (M = o[k], tn = !1, An = !D && l.invertSwap || R), N = Yc(t, r, o, h, D ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, An, ft === r);
        var K;
        if (N !== 0) {
          var U = ge(T);
          do
            U -= N, K = ne.children[U];
          while (K && (P(K, "display") === "none" || K === z));
        }
        if (N === 0 || K === r)
          return E(!1);
        ft = r, en = N;
        var G = r.nextElementSibling, J = !1;
        J = N === 1;
        var X = Ln(Z, n, T, i, r, o, t, J);
        if (X !== !1)
          return (X === 1 || X === -1) && (J = X === 1), Qr = !0, setTimeout(Jc, 30), _(), J && !G ? n.appendChild(T) : r.parentNode.insertBefore(T, J ? G : r), j && qa(j, 0, Y - j.scrollTop), ne = T.parentNode, M !== void 0 && !An && (jn = Math.abs(M - oe(r)[k])), A(), E(!0);
      }
      if (n.contains(T))
        return E(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    H(document, "mousemove", this._onTouchMove), H(document, "touchmove", this._onTouchMove), H(document, "pointermove", this._onTouchMove), H(document, "dragover", et), H(document, "mousemove", et), H(document, "touchmove", et);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    H(t, "mouseup", this._onDrop), H(t, "touchend", this._onDrop), H(t, "pointerup", this._onDrop), H(t, "pointercancel", this._onDrop), H(t, "touchcancel", this._onDrop), H(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (me = ge(T), $e = ge(T, r.draggable), de("drop", this, {
      evt: t
    }), ne = T && T.parentNode, me = ge(T), $e = ge(T, r.draggable), q.eventCanceled) {
      this._nulling();
      return;
    }
    ht = !1, An = !1, tn = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), ei(this.cloneId), ei(this._dragStartId), this.nativeDraggable && (H(document, "drop", this), H(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Gt && P(document.body, "user-select", ""), P(T, "transform", ""), t && (jt && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), z && z.parentNode && z.parentNode.removeChild(z), (Z === ne || ae && ae.lastPutMode !== "clone") && ee && ee.parentNode && ee.parentNode.removeChild(ee), T && (this.nativeDraggable && H(T, "dragend", this), Lr(T), T.style["will-change"] = "", jt && !ht && pe(T, ae ? ae.options.ghostClass : this.options.ghostClass, !1), pe(T, this.options.chosenClass, !1), ue({
      sortable: this,
      name: "unchoose",
      toEl: ne,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Z !== ne ? (me >= 0 && (ue({
      rootEl: ne,
      name: "add",
      toEl: ne,
      fromEl: Z,
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
      fromEl: Z,
      originalEvent: t
    }), ue({
      sortable: this,
      name: "sort",
      toEl: ne,
      originalEvent: t
    })), ae && ae.save()) : me !== bt && me >= 0 && (ue({
      sortable: this,
      name: "update",
      toEl: ne,
      originalEvent: t
    }), ue({
      sortable: this,
      name: "sort",
      toEl: ne,
      originalEvent: t
    })), q.active && ((me == null || me === -1) && (me = bt, $e = Qt), ue({
      sortable: this,
      name: "end",
      toEl: ne,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    de("nulling", this), Z = T = ne = z = nt = ee = Vn = Ue = Qe = _e = jt = me = $e = bt = Qt = ft = en = ae = Tn = q.dragged = q.ghost = q.clone = q.active = null, rr.forEach(function(t) {
      t.checked = !0;
    }), rr.length = Tr = Ar = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        T && (this._onDragOver(t), Uc(t));
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
      n = r[i], xe(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Zc(n));
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
      xe(l, this.options.draggable, i, !1) && (r[o] = l);
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
    return xe(t, n || this.options.draggable, this.el, !1);
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
    var i = hn.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && $a(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    de("destroy", this);
    var t = this.el;
    t[fe] = null, H(t, "mousedown", this._onTapStart), H(t, "touchstart", this._onTapStart), H(t, "pointerdown", this._onTapStart), this.nativeDraggable && (H(t, "dragover", this), H(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), nr.splice(nr.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Ue) {
      if (de("hideClone", this), q.eventCanceled) return;
      P(ee, "display", "none"), this.options.removeCloneOnHide && ee.parentNode && ee.parentNode.removeChild(ee), Ue = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Ue) {
      if (de("showClone", this), q.eventCanceled) return;
      T.parentNode == Z && !this.options.group.revertClone ? Z.insertBefore(ee, T) : nt ? Z.insertBefore(ee, nt) : Z.appendChild(ee), this.options.group.revertClone && this.animate(T, ee), P(ee, "display", ""), Ue = !1;
    }
  }
};
function Uc(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Ln(e, t, n, r, i, o, a, l) {
  var s, u = e[fe], d = u.options.onMove, c;
  return window.CustomEvent && !je && !mn ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = r, s.related = i || t, s.relatedRect = o || oe(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), d && (c = d.call(u, s, a)), c;
}
function Lr(e) {
  e.draggable = !1;
}
function Jc() {
  Qr = !1;
}
function Xc(e, t, n) {
  var r = oe(Tt(n.el, 0, n.options, !0)), i = Va(n.el, n.options, z), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Kc(e, t, n) {
  var r = oe(wi(n.el, n.options.draggable)), i = Va(n.el, n.options, z), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Yc(e, t, n, r, i, o, a, l) {
  var s = r ? e.clientY : e.clientX, u = r ? n.height : n.width, d = r ? n.top : n.left, c = r ? n.bottom : n.right, v = !1;
  if (!a) {
    if (l && jn < u * i) {
      if (!tn && (en === 1 ? s > d + u * o / 2 : s < c - u * o / 2) && (tn = !0), tn)
        v = !0;
      else if (en === 1 ? s < d + jn : s > c - jn)
        return -en;
    } else if (s > d + u * (1 - i) / 2 && s < c - u * (1 - i) / 2)
      return Gc(t);
  }
  return v = v || a, v && (s < d + u * o / 2 || s > c - u * o / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function Gc(e) {
  return ge(T) < ge(e) ? 1 : -1;
}
function Zc(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Qc(e) {
  rr.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && rr.push(r);
  }
}
function Hn(e) {
  return setTimeout(e, 0);
}
function ei(e) {
  return clearTimeout(e);
}
dr && B(document, "touchmove", function(e) {
  (q.active || ht) && e.cancelable && e.preventDefault();
});
q.utils = {
  on: B,
  off: H,
  css: P,
  find: Ra,
  is: function(t, n) {
    return !!xe(t, n, t, !1);
  },
  extend: Rc,
  throttle: Pa,
  closest: xe,
  toggleClass: pe,
  clone: za,
  index: ge,
  nextTick: Hn,
  cancelNextTick: ei,
  detectDirection: Ha,
  getChild: Tt,
  expando: fe
};
q.get = function(e) {
  return e[fe];
};
q.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (q.utils = Me(Me({}, q.utils), r.utils)), hn.mount(r);
  });
};
q.create = function(e, t) {
  return new q(e, t);
};
q.version = Mc;
var ie = [], Ht, ti, ni = !1, kr, Dr, ir, $t;
function ed() {
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
      this.sortable.nativeDraggable ? H(document, "dragover", this._handleAutoScroll) : (H(document, "pointermove", this._handleFallbackAutoScroll), H(document, "touchmove", this._handleFallbackAutoScroll), H(document, "mousemove", this._handleFallbackAutoScroll)), So(), $n(), Pc();
    },
    nulling: function() {
      ir = ti = Ht = ni = $t = kr = Dr = null, ie.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(o, a);
      if (ir = n, r || this.options.forceAutoScrollFallback || mn || je || Gt) {
        Or(n, this.options, l, r);
        var s = Xe(l, !0);
        ni && (!$t || o !== kr || a !== Dr) && ($t && So(), $t = setInterval(function() {
          var u = Xe(document.elementFromPoint(o, a), !0);
          u !== s && (s = u, $n()), Or(n, i.options, u, r);
        }, 10), kr = o, Dr = a);
      } else {
        if (!this.options.bubbleScroll || Xe(l, !0) === Oe()) {
          $n();
          return;
        }
        Or(n, this.options, Xe(l, !1), !1);
      }
    }
  }, Ve(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function $n() {
  ie.forEach(function(e) {
    clearInterval(e.pid);
  }), ie = [];
}
function So() {
  clearInterval($t);
}
var Or = Pa(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = Oe(), u = !1, d;
    ti !== n && (ti = n, $n(), Ht = t.scroll, d = t.scrollFn, Ht === !0 && (Ht = Xe(n, !0)));
    var c = 0, v = Ht;
    do {
      var h = v, p = oe(h), m = p.top, g = p.bottom, _ = p.left, E = p.right, A = p.width, C = p.height, w = void 0, N = void 0, M = h.scrollWidth, R = h.scrollHeight, D = P(h), k = h.scrollLeft, j = h.scrollTop;
      h === s ? (w = A < M && (D.overflowX === "auto" || D.overflowX === "scroll" || D.overflowX === "visible"), N = C < R && (D.overflowY === "auto" || D.overflowY === "scroll" || D.overflowY === "visible")) : (w = A < M && (D.overflowX === "auto" || D.overflowX === "scroll"), N = C < R && (D.overflowY === "auto" || D.overflowY === "scroll"));
      var Y = w && (Math.abs(E - i) <= a && k + A < M) - (Math.abs(_ - i) <= a && !!k), K = N && (Math.abs(g - o) <= a && j + C < R) - (Math.abs(m - o) <= a && !!j);
      if (!ie[c])
        for (var U = 0; U <= c; U++)
          ie[U] || (ie[U] = {});
      (ie[c].vx != Y || ie[c].vy != K || ie[c].el !== h) && (ie[c].el = h, ie[c].vx = Y, ie[c].vy = K, clearInterval(ie[c].pid), (Y != 0 || K != 0) && (u = !0, ie[c].pid = setInterval(function() {
        r && this.layer === 0 && q.active._onTouchMove(ir);
        var G = ie[this.layer].vy ? ie[this.layer].vy * l : 0, J = ie[this.layer].vx ? ie[this.layer].vx * l : 0;
        typeof d == "function" && d.call(q.dragged.parentNode[fe], J, G, e, ir, ie[this.layer].el) !== "continue" || qa(ie[this.layer].el, J, G);
      }.bind({
        layer: c
      }), 24))), c++;
    } while (t.bubbleScroll && v !== s && (v = Xe(v, !1)));
    ni = u;
  }
}, 30), Wa = function(t) {
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
function Ei() {
}
Ei.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = Tt(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: Wa
};
Ve(Ei, {
  pluginName: "revertOnSpill"
});
function Si() {
}
Si.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: Wa
};
Ve(Si, {
  pluginName: "removeOnSpill"
});
q.mount(new ed());
q.mount(Si, Ei);
const yt = /* @__PURE__ */ new WeakMap(), Bn = /* @__PURE__ */ new WeakMap();
function td(e) {
  if (e["no-animation"])
    return 0;
  for (let t of Object.keys(e)) {
    let n = t.match(/^(\d+)ms$/);
    if (n)
      return parseInt(n[1], 10);
  }
  return 150;
}
const kn = /* @__PURE__ */ new WeakMap(), nd = {
  mounted(e, t, n) {
    let r = Te(n), i = t.modifiers || {}, o = t.value;
    r || console.warn("[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component."), typeof o != "string" && !Array.isArray(o) && console.warn("[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got " + typeof o + ".");
    let a = td(i), l = i.horizontal ? "horizontal" : "vertical";
    kn.set(e, t);
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
      onEnd: function(v) {
        let h = v.newIndex, p = v.oldIndex;
        if (p === h)
          return;
        let m = kn.get(e), g = m ? m.value : null, _ = typeof g == "string";
        if (Array.isArray(g)) {
          let A = v.from;
          p < h ? A.insertBefore(v.item, A.children[p]) : A.insertBefore(v.item, A.children[p + 1]);
          let C = g.splice(p, 1)[0];
          g.splice(h, 0, C);
          return;
        }
        if (_ && r) {
          let A = g, C = [], w = v.item, N = Bn.get(w);
          N === void 0 && (N = w.dataset.livueSortItem), typeof N == "string" && /^\d+$/.test(N) && (N = parseInt(N, 10));
          let M = v.from, R = v.to, D = [N, h].concat(C);
          if (M !== R) {
            let j = R.dataset.livueSortMethod;
            j && (A = j);
            let Y = M.dataset.livueSortId || M.dataset.livueSortGroup || null;
            D.push(Y);
          }
          r.call(A, D);
        }
      }
    };
    typeof t.value == "string" && (e.dataset.livueSortMethod = t.value), e.querySelector("[data-livue-sort-handle]") && (u.handle = "[data-livue-sort-handle]"), s && (u.group = s);
    let c = q.create(e, u);
    yt.set(e, c);
  },
  updated(e, t) {
    kn.set(e, t);
    let n = yt.get(e);
    n && e.querySelector("[data-livue-sort-handle]") && n.option("handle", "[data-livue-sort-handle]");
  },
  unmounted(e) {
    let t = yt.get(e);
    t && (t.destroy(), yt.delete(e)), kn.delete(e);
  }
}, rd = {
  mounted(e, t) {
    let n = t.value;
    Bn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  updated(e, t) {
    let n = t.value;
    Bn.set(e, n), e.setAttribute("data-livue-sort-item", n);
  },
  unmounted(e) {
    if (Bn.delete(e), e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-item");
      } catch {
      }
  }
}, id = {
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
}, od = {
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
}, ad = {
  mounted(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = yt.get(e);
    r && r.option("group", n);
  },
  updated(e, t) {
    let n = t.value;
    e.setAttribute("data-livue-sort-group", n);
    let r = yt.get(e);
    r && r.option("group", n);
  },
  unmounted(e) {
    if (e && e.removeAttribute)
      try {
        e.removeAttribute("data-livue-sort-group");
      } catch {
      }
  }
}, ld = F("dblclick"), sd = F("mousedown"), ud = F("mouseup"), cd = F("mouseenter"), dd = F("mouseleave"), fd = F("mouseover"), pd = F("mouseout"), vd = F("mousemove"), md = F("contextmenu"), hd = F("keydown", { isKeyboardEvent: !0 }), gd = F("keyup", { isKeyboardEvent: !0 }), bd = F("keypress", { isKeyboardEvent: !0 }), yd = F("focus"), _d = F("focusin"), wd = F("focusout"), Ed = F("touchstart"), Sd = F("touchend"), xd = F("touchmove"), Cd = F("touchcancel"), Td = F("change"), Ad = F("input"), Nd = F("reset"), Ld = F("dragstart"), kd = F("dragend"), Dd = F("dragenter"), Od = F("dragleave"), Md = F("dragover"), Id = F("drop"), Rd = F("copy"), Pd = F("cut"), qd = F("paste"), zd = F("wheel"), Vd = F("resize");
function jd() {
  O("init", Hu), O("submit", $u), O("intersect", Bu), O("current", Uu), O("ignore", Ju), O("model-livue", Gu), O("debounce", Cc), O("throttle", Tc), O("blur", bi), O("enter", yi), O("boolean", Lc), O("poll", ec), O("offline", nc), O("transition", Ru), O("replace", rc), O("loading", ac), O("target", lc), O("stream", sc), O("click", dc), O("navigate", fc), O("scroll", pc), O("dirty", vc), O("watch", bc), O("sort", nd), O("sort-item", rd), O("sort-handle", id), O("sort-ignore", od), O("sort-group", ad), O("dblclick", ld), O("mousedown", sd), O("mouseup", ud), O("mouseenter", cd), O("mouseleave", dd), O("mouseover", fd), O("mouseout", pd), O("mousemove", vd), O("contextmenu", md), O("keydown", hd), O("keyup", gd), O("keypress", bd), O("focus", yd), O("focusin", _d), O("focusout", wd), O("touchstart", Ed), O("touchend", Sd), O("touchmove", xd), O("touchcancel", Cd), O("change", Td), O("input", Ad), O("reset", Nd), O("dragstart", Ld), O("dragend", kd), O("dragenter", Dd), O("dragleave", Od), O("dragover", Md), O("drop", Id), O("copy", Rd), O("cut", Pd), O("paste", qd), O("wheel", zd), O("resize", Vd);
}
let Be = null, qt = null, xo = !1;
function Hd() {
  if (xo)
    return;
  xo = !0;
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
function $d() {
  return Be || (Hd(), Be = document.createElement("div"), Be.className = "livue-hmr-indicator", document.body.appendChild(Be), Be);
}
function Dn(e, t) {
  const n = $d();
  switch (qt && (clearTimeout(qt), qt = null), e) {
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
            `, qt = setTimeout(function() {
        Co();
      }, 1500);
      break;
    case "error":
      n.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `, qt = setTimeout(function() {
        Co();
      }, 3e3);
      break;
  }
  requestAnimationFrame(function() {
    n.classList.add("visible");
  });
}
function Co() {
  Be && Be.classList.remove("visible");
}
let lt = null, fr = !0, Ua = !0, Bt = !0, Fn = [];
function Bd(e) {
  lt = e;
}
async function Fd(e) {
  if (fr) {
    console.log("[LiVue HMR] " + e.type + " changed: " + e.fileName), Bt && Dn("updating", e.fileName), Fn.forEach(function(t) {
      try {
        t(e);
      } catch (n) {
        console.error("[LiVue HMR] Callback error:", n);
      }
    });
    try {
      const t = Ua ? Wd() : null, n = await fetch(window.location.href, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-LiVue-HMR": "1"
        }
      });
      if (!n.ok)
        throw new Error("Server returned " + n.status);
      const r = await n.text(), a = new DOMParser().parseFromString(r, "text/html").querySelectorAll("[data-livue-id]");
      if (a.length === 0) {
        console.warn("[LiVue HMR] No components found in response, skipping update"), Bt && Dn("error");
        return;
      }
      a.forEach(function(l) {
        const s = l.dataset.livueId, u = document.querySelector('[data-livue-id="' + s + '"]');
        u && (l.dataset.livueSnapshot && (u.dataset.livueSnapshot = l.dataset.livueSnapshot), u.innerHTML = l.innerHTML);
      }), lt.reboot(), t && (await Jd(), Ud(t)), Bt && Dn("done");
    } catch (t) {
      console.error("[LiVue HMR] Update failed:", t), Bt && Dn("error");
    }
  }
}
function Wd() {
  const e = /* @__PURE__ */ new Map();
  return lt && lt.all().forEach(function(n) {
    if (To(n.componentId, n.name, n.state, e), n._childRegistry)
      for (const r in n._childRegistry) {
        const i = n._childRegistry[r];
        To(r, i.name, i.state, e);
      }
  }), e;
}
function To(e, t, n, r) {
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
function Ud(e) {
  lt && e.forEach(function(t, n) {
    const r = lt.getByName(t.name);
    if (r.length > 0) {
      const i = r[0];
      for (const o in t.state)
        o in i.state && (i.state[o] = t.state[o]);
    }
  });
}
function Jd() {
  return new Promise(function(e) {
    setTimeout(e, 0);
  });
}
function Xd() {
  return typeof import.meta < "u" && !1;
}
function Kd() {
  fr = !0;
}
function Yd() {
  fr = !1;
}
function Gd() {
  return fr;
}
function Zd(e) {
  e.indicator !== void 0 && (Bt = e.indicator), e.preserveState !== void 0 && (Ua = e.preserveState);
}
function Qd(e) {
  return Fn.push(e), function() {
    const t = Fn.indexOf(e);
    t !== -1 && Fn.splice(t, 1);
  };
}
async function ef() {
  lt && await Fd({
    file: "manual-trigger",
    fileName: "manual",
    type: "template",
    timestamp: Date.now()
  });
}
var pt = !1, Mr = [];
class tf {
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
    ns(t);
  }
  /**
   * Boot the runtime: discover root/island components and mount them.
   * Children are automatically handled by their parent's Vue app.
   * Starts a MutationObserver to automatically detect new components.
   */
  boot() {
    this._devtoolsInitialized || (Ca(this), this._devtoolsInitialized = !0), jd(), document.querySelectorAll("[data-livue-id]").forEach(function(n) {
      this._isRoot(n) && this._initComponent(n);
    }.bind(this)), this._processStandaloneLazy(document.body), Rl(this), this._startObserver(), this._setupDevtoolsShortcut(), Bd(this);
  }
  /**
   * Setup keyboard shortcut for devtools.
   * @private
   */
  _setupDevtoolsShortcut() {
    this._devtoolsShortcutSetup || (this._devtoolsShortcutSetup = !0, document.addEventListener("keydown", function(t) {
      t.ctrlKey && t.shiftKey && t.key === "L" && (t.preventDefault(), Ta());
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
    dn(t, !0, !1);
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
    Il(t);
  }
  /**
   * Prefetch a URL for instant navigation.
   * Useful for programmatic prefetching.
   *
   * @param {string} url - URL to prefetch
   * @returns {Promise<string|null>} The HTML content or null on error
   */
  prefetch(t) {
    return sr(t);
  }
  /**
   * Clear the navigation page cache.
   */
  clearNavigationCache() {
    oi();
  }
  /**
   * Check if a navigation is currently in progress.
   *
   * @returns {boolean}
   */
  isNavigating() {
    return Yl();
  }
  /**
   * Get the progress bar API.
   * Use LiVue.progress.configure() to customize appearance.
   *
   * @returns {object} Progress bar API { configure, start, done, set, isStarted }
   */
  get progress() {
    return Ye;
  }
  /**
   * Get Echo (Laravel Broadcasting) status and debug info.
   *
   * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
   */
  get echo() {
    return {
      available: st(),
      ...ps()
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
    let r = new ju(t);
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
    return Ae(t, n);
  }
  /**
   * Get list of all available hook names.
   * @returns {string[]}
   */
  getAvailableHooks() {
    return Ri();
  }
  /**
   * Destroy all mounted Vue app instances.
   */
  destroy() {
    this._preservingIds = null, this.components.forEach(function(t) {
      t.destroy();
    }), this.components.clear(), zi();
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
    }), zi();
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
    return bu;
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
      isAvailable: Xd,
      isEnabled: Gd,
      enable: Kd,
      disable: Yd,
      configure: Zd,
      onUpdate: Qd,
      trigger: ef
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
    if (t && !pt) {
      pt = !0, console.log("[LiVue] Debug mode enabled");
      var n = Ri();
      n.forEach(function(r) {
        var i = Ae(r, function(o) {
          var a = {};
          o.component && (a.componentId = o.component.id, a.componentName = o.component.name), o.el && (a.element = o.el.tagName), o.url && (a.url = o.url), o.updateCount !== void 0 && (a.updateCount = o.updateCount), o.lazyCount !== void 0 && (a.lazyCount = o.lazyCount), o.success !== void 0 && (a.success = o.success), o.error && (a.error = o.error.message || String(o.error)), o.isChild !== void 0 && (a.isChild = o.isChild), console.log("[LiVue] " + r + ":", a);
        });
        Mr.push(i);
      });
    } else !t && pt && (pt = !1, console.log("[LiVue] Debug mode disabled"), Mr.forEach(function(r) {
      r();
    }), Mr = []);
    return pt;
  }
  /**
   * Check if debug mode is enabled.
   *
   * @returns {boolean}
   */
  isDebugEnabled() {
    return pt;
  }
}
const pr = new tf();
if (typeof document < "u" && !document.getElementById("livue-styles")) {
  const e = document.createElement("style");
  e.id = "livue-styles", e.textContent = il, document.head.appendChild(e);
}
var we = window.LiVueConfig || {};
(we.showProgressBar !== void 0 || we.progressBarColor !== void 0 || we.prefetch !== void 0 || we.prefetchOnHover !== void 0 || we.hoverDelay !== void 0 || we.cachePages !== void 0 || we.maxCacheSize !== void 0 || we.restoreScroll !== void 0) && pr.configureNavigation(we);
we.showProgressOnRequest !== void 0 && pr.progress.configure({ showOnRequest: we.showProgressOnRequest });
let Ao = !1;
function On() {
  Ao || (Ao = !0, pr.boot());
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", On, { once: !0 }) : document.readyState === "interactive" ? (document.addEventListener("DOMContentLoaded", On, { once: !0 }), window.addEventListener("load", On, { once: !0 })) : queueMicrotask(On);
window.LiVue = pr;
export {
  pr as default
};
//# sourceMappingURL=livue.esm.js.map
