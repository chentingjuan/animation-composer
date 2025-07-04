var Tn = Object.defineProperty, dn = (s, e, i) => e in s ? Tn(s, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[e] = i, k = (s, e, i) => dn(s, typeof e != "symbol" ? e + "" : e, i);
function Nn(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Vi = { exports: {} };
(function(s) {
  var e = Object.prototype.hasOwnProperty, i = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (i = !1));
  function r(a, _, u) {
    this.fn = a, this.context = _, this.once = u || !1;
  }
  function h(a, _, u, E, l) {
    if (typeof u != "function")
      throw new TypeError("The listener must be a function");
    var f = new r(u, E || a, l), d = i ? i + _ : _;
    return a._events[d] ? a._events[d].fn ? a._events[d] = [a._events[d], f] : a._events[d].push(f) : (a._events[d] = f, a._eventsCount++), a;
  }
  function o(a, _) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[_];
  }
  function c() {
    this._events = new n(), this._eventsCount = 0;
  }
  c.prototype.eventNames = function() {
    var a = [], _, u;
    if (this._eventsCount === 0) return a;
    for (u in _ = this._events)
      e.call(_, u) && a.push(i ? u.slice(1) : u);
    return Object.getOwnPropertySymbols ? a.concat(Object.getOwnPropertySymbols(_)) : a;
  }, c.prototype.listeners = function(a) {
    var _ = i ? i + a : a, u = this._events[_];
    if (!u) return [];
    if (u.fn) return [u.fn];
    for (var E = 0, l = u.length, f = new Array(l); E < l; E++)
      f[E] = u[E].fn;
    return f;
  }, c.prototype.listenerCount = function(a) {
    var _ = i ? i + a : a, u = this._events[_];
    return u ? u.fn ? 1 : u.length : 0;
  }, c.prototype.emit = function(a, _, u, E, l, f) {
    var d = i ? i + a : a;
    if (!this._events[d]) return !1;
    var N = this._events[d], T = arguments.length, O, A;
    if (N.fn) {
      switch (N.once && this.removeListener(a, N.fn, void 0, !0), T) {
        case 1:
          return N.fn.call(N.context), !0;
        case 2:
          return N.fn.call(N.context, _), !0;
        case 3:
          return N.fn.call(N.context, _, u), !0;
        case 4:
          return N.fn.call(N.context, _, u, E), !0;
        case 5:
          return N.fn.call(N.context, _, u, E, l), !0;
        case 6:
          return N.fn.call(N.context, _, u, E, l, f), !0;
      }
      for (A = 1, O = new Array(T - 1); A < T; A++)
        O[A - 1] = arguments[A];
      N.fn.apply(N.context, O);
    } else {
      var g = N.length, R;
      for (A = 0; A < g; A++)
        switch (N[A].once && this.removeListener(a, N[A].fn, void 0, !0), T) {
          case 1:
            N[A].fn.call(N[A].context);
            break;
          case 2:
            N[A].fn.call(N[A].context, _);
            break;
          case 3:
            N[A].fn.call(N[A].context, _, u);
            break;
          case 4:
            N[A].fn.call(N[A].context, _, u, E);
            break;
          default:
            if (!O) for (R = 1, O = new Array(T - 1); R < T; R++)
              O[R - 1] = arguments[R];
            N[A].fn.apply(N[A].context, O);
        }
    }
    return !0;
  }, c.prototype.on = function(a, _, u) {
    return h(this, a, _, u, !1);
  }, c.prototype.once = function(a, _, u) {
    return h(this, a, _, u, !0);
  }, c.prototype.removeListener = function(a, _, u, E) {
    var l = i ? i + a : a;
    if (!this._events[l]) return this;
    if (!_)
      return o(this, l), this;
    var f = this._events[l];
    if (f.fn)
      f.fn === _ && (!E || f.once) && (!u || f.context === u) && o(this, l);
    else {
      for (var d = 0, N = [], T = f.length; d < T; d++)
        (f[d].fn !== _ || E && !f[d].once || u && f[d].context !== u) && N.push(f[d]);
      N.length ? this._events[l] = N.length === 1 ? N[0] : N : o(this, l);
    }
    return this;
  }, c.prototype.removeAllListeners = function(a) {
    var _;
    return a ? (_ = i ? i + a : a, this._events[_] && o(this, _)) : (this._events = new n(), this._eventsCount = 0), this;
  }, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = i, c.EventEmitter = c, s.exports = c;
})(Vi);
var On = Vi.exports;
class Th extends On.EventEmitter {
  constructor() {
    super(), k(this, "timeOrigin"), k(this, "elapsedTime"), k(this, "state"), k(this, "_rafId"), this.timeOrigin = performance.now(), this.elapsedTime = 0, this._rafId = 0, this.state = "idle";
  }
  start() {
    (this.state === "idle" || this.state === "paused") && (this.state = "running", this.timeOrigin = performance.now(), this.tick());
  }
  seek(e) {
    this.pause(), this.elapsedTime = e, this.emitTick();
  }
  pause() {
    this.state === "running" && (this.state = "paused", window.cancelAnimationFrame(this._rafId));
  }
  reset() {
    this.elapsedTime = 0, this.timeOrigin = performance.now(), this.state = "idle";
  }
  tick() {
    this._rafId = window.requestAnimationFrame(() => {
      this.elapsedTime = performance.now() - this.timeOrigin, this.emitTick(), this.tick();
    });
  }
  emitTick() {
    this.emit("tick", this.elapsedTime);
  }
}
var An = 4, gn = 1e-3, In = 1e-7, Rn = 10, qt = 11, Jt = 1 / (qt - 1), Ln = typeof Float32Array == "function";
function Hi(s, e) {
  return 1 - 3 * e + 3 * s;
}
function Fi(s, e) {
  return 3 * e - 6 * s;
}
function Wi(s) {
  return 3 * s;
}
function hs(s, e, i) {
  return ((Hi(e, i) * s + Fi(e, i)) * s + Wi(e)) * s;
}
function ki(s, e, i) {
  return 3 * Hi(e, i) * s * s + 2 * Fi(e, i) * s + Wi(e);
}
function mn(s, e, i, n, r) {
  var h, o, c = 0;
  do
    o = e + (i - e) / 2, h = hs(o, n, r) - s, h > 0 ? i = o : e = o;
  while (Math.abs(h) > In && ++c < Rn);
  return o;
}
function Cn(s, e, i, n) {
  for (var r = 0; r < An; ++r) {
    var h = ki(e, i, n);
    if (h === 0)
      return e;
    var o = hs(e, i, n) - s;
    e -= o / h;
  }
  return e;
}
function xn(s) {
  return s;
}
var Sn = function(s, e, i, n) {
  if (!(0 <= s && s <= 1 && 0 <= i && i <= 1))
    throw new Error("bezier x values must be in [0, 1] range");
  if (s === e && i === n)
    return xn;
  for (var r = Ln ? new Float32Array(qt) : new Array(qt), h = 0; h < qt; ++h)
    r[h] = hs(h * Jt, s, i);
  function o(c) {
    for (var a = 0, _ = 1, u = qt - 1; _ !== u && r[_] <= c; ++_)
      a += Jt;
    --_;
    var E = (c - r[_]) / (r[_ + 1] - r[_]), l = a + E * Jt, f = ki(l, s, i);
    return f >= gn ? Cn(c, l, s, i) : f === 0 ? l : mn(c, a, a + Jt, s, i);
  }
  return function(c) {
    return c === 0 ? 0 : c === 1 ? 1 : hs(o(c), e, n);
  };
};
const Mn = /* @__PURE__ */ Nn(Sn), Dn = [0, 0, 1, 1], bs = (s, e) => {
  if (e <= s[0].time)
    return {
      startFrame: s[0],
      endFrame: s[0],
      progress: 0
    };
  if (e >= s[s.length - 1].time) {
    const o = s[s.length - 1];
    return {
      startFrame: o,
      endFrame: o,
      progress: 1
    };
  }
  const i = s.findIndex((o, c) => {
    const a = s[c + 1];
    return a ? e >= o.time && e <= a.time : !1;
  }), n = s[i], r = s[i + 1], h = (e - n.time) / (r.time - n.time);
  return { startFrame: n, endFrame: r, progress: h };
}, Pn = (s, e, i) => {
  switch (e) {
    case 0:
      return Math.min(1, Math.ceil(i * s) / s);
    case 1:
      return Math.min(1, Math.floor(i * s) / s);
    case 2: {
      if (i <= 0)
        return 0;
      if (i >= 1)
        return 1;
      const n = Math.floor(i * s), r = i * s - n;
      return Math.min(
        1,
        (r >= 0.5 ? n + 1 : n) / s
      );
    }
  }
}, wn = (s, e) => {
  switch (s.length) {
    case 2:
      return Pn(...s, e);
    case 4:
      return Mn(...s)(e);
  }
};
class yn {
  constructor(e, i, n, r, h) {
    k(this, "sortedKeyframes"), k(this, "duration"), this.interpolator = i, this.middlewares = n, this.registry = r, this.sortedKeyframes = e, this.duration = h === void 0 ? e[e.length - 1].time : h;
  }
  interpolate(e) {
    const i = Math.max(0, Math.min(1, e)) * this.duration, {
      startFrame: n,
      endFrame: r,
      progress: h
    } = bs(this.sortedKeyframes, i), o = r.easing ? wn(r.easing, h) : h, c = {
      keyframes: this.sortedKeyframes,
      rawProgress: h,
      easedProgress: o,
      startFrame: n,
      endFrame: r,
      value: this.interpolator(
        o,
        n.value,
        r.value,
        r.easing || Dn,
        this.registry
      )
    };
    return this.middlewares.reduce(
      (a, _) => _(a),
      c
    ).value;
  }
  /**
   * TODO: check if it is the right place to do this
   *
   * Insert a keyframe into the sorted keyframes array.
   * If the keyframe with that time already exists, the value will be replaced by the new value.
   *
   * @param {Keyframe<T>} kf - The keyframe to insert.
   * @returns {ComposedInterpolator<T>} The composed interpolator.
   */
  insertKF(e) {
    const i = this.sortedKeyframes.findIndex((h) => h.time === e.time);
    if (i !== -1)
      return this.sortedKeyframes[i].value = e.value, this;
    const { progress: n } = bs(this.sortedKeyframes, e.time), r = this.sortedKeyframes.findIndex((h) => h.time > e.time);
    if (r !== 0 && r !== -1) {
      const h = this.sortedKeyframes[r];
      if (h.easing)
        if (h.easing.length === 4) {
          const o = h.easing, c = n, a = 0, _ = 0, u = o[0], E = o[1], l = o[2], f = o[3], d = 1, N = 1, T = 1 - c, O = T * a + c * u, A = T * _ + c * E, g = T * u + c * l, R = T * E + c * f, I = T * l + c * d, x = T * f + c * N, m = T * O + c * g, M = T * A + c * R, P = T * g + c * I, y = T * R + c * x, D = T * m + c * P, b = T * M + c * y, w = [a, _, O, A, m, M, D, b], p = [D, b, P, y, I, x, d, N], v = w[6] - w[0], X = w[7] - w[1], H = [
            w[2] / v,
            w[3] / X,
            w[4] / v,
            w[5] / X
          ], F = p[6] - p[0], V = p[7] - p[1], U = [
            (p[2] - p[0]) / F,
            (p[3] - p[1]) / V,
            (p[4] - p[0]) / F,
            (p[5] - p[1]) / V
          ];
          e.easing = H, h.easing = U;
        } else h.easing.length;
    }
    return r === -1 ? this.sortedKeyframes.push(e) : this.sortedKeyframes.splice(r, 0, e), this;
  }
}
class Gn {
  constructor({ registry: e, middlewares: i = [] }) {
    k(this, "middlewares", []), k(this, "registry"), this.registry = e, this.middlewares = i;
  }
  compose(e, i, n) {
    if (i.length === 0)
      throw new Error("At least one keyframe is required");
    const r = this.registry.get(e), h = [...i].sort((o, c) => o.time - c.time);
    if (h[0].time < 0) {
      const o = h.findIndex((c) => c.time >= 0);
      if (o > 0) {
        const c = h[o - 1], a = h[o], _ = a.time - c.time, u = (0 - c.time) / _, E = {
          time: 0,
          value: r.interpolate(
            u,
            c.value,
            a.value,
            c.easing || [0.25, 0.25, 0.75, 0.75],
            // Default linear easing if not provided
            this.registry
          )
        };
        h.splice(0, o, E);
      } else if (o === -1) {
        const c = h[h.length - 1];
        h.splice(0, h.length, {
          time: 0,
          value: c.value
        });
      }
    }
    return new yn(
      h,
      r.interpolate,
      this.middlewares,
      this.registry,
      n
    );
  }
}
const Xi = (s) => s;
class pn {
  constructor() {
    k(this, "interpolators", /* @__PURE__ */ new Map());
    const e = Xi({
      name: "number",
      interpolate: this.lerp
    });
    this.register(e);
  }
  register(e) {
    this.interpolators.set(e.name, e);
  }
  lerp(e, i, n) {
    return i + (n - i) * e;
  }
  interpolate(e, i, n, r, h) {
    return this.get(e).interpolate(i, r, h, n, this);
  }
  get(e) {
    const i = this.interpolators.get(e);
    if (!i)
      throw new Error(`Interpolator '${e}' not found`);
    return i;
  }
  has(e) {
    return this.interpolators.has(e);
  }
}
const bn = (s) => {
  const e = new pn();
  return Object.entries(s).forEach(
    ([i, n]) => {
      const r = Xi({
        name: i,
        interpolate: n
      });
      e.register(r);
    }
  ), e;
};
class Un {
  constructor(e, i) {
    k(this, "animationId"), k(this, "trackData"), k(this, "state"), k(this, "playbackRate"), k(this, "currentTime"), k(this, "startTime"), k(this, "_baseTime"), k(this, "createdAt"), this.animationId = e, this.trackData = i, this.state = et.IDLE, this.playbackRate = 1, this.currentTime = 0, this.startTime = 0, this._baseTime = 0, this.createdAt = performance.now();
  }
  getPropTrack(e) {
    const i = this.trackData.tracks.get(e);
    if (!i)
      throw new Error(`Property track not found for key: ${e}`);
    return JSON.parse(JSON.stringify(i));
  }
  /**
   * Forward playback
   * Will play forward from the current provided time
   */
  forward() {
    this._baseTime = this.currentTime, this.state = et.RUNNING, this.playbackRate = Math.abs(this.playbackRate), this.startTime = performance.now();
  }
  pause() {
    this.state = et.PAUSED;
  }
  /**
   * Backward playback
   * Will play backward from the current provided time
   *
   * If the current time is 0 at the time of calling this method, it will
   * conviniently seek to the end of the animation and play backward
   */
  backward() {
    this.currentTime === 0 && this.seekToEnd(), this._baseTime = this.currentTime, this.state = et.RUNNING, this.playbackRate = -Math.abs(this.playbackRate), this.startTime = performance.now();
  }
  // leave() {
  //   // console.log('leave', this.animationId)
  //   this._baseTime = this.currentTime
  //   this.state = AnimationState.LEAVING
  //   this.playbackRate = 1
  //   this.startTime = performance.now()
  // }
  // occupy() {
  //   this.state = AnimationState.OCCUPIED
  // }
  /**
   * Seek to a specific time in the animation
   * @param {number} time - The time to seek to, 0 <= time <= duration
   */
  seek(e) {
    this.currentTime = Math.max(0, Math.min(this.trackData.duration, e));
  }
  /**
   * Seek to the end of the animation
   */
  seekToEnd() {
    this.currentTime = this.trackData.duration;
  }
  isForward() {
    return this.state === et.RUNNING && this.playbackRate > 0;
  }
  isBackward() {
    return this.state === et.RUNNING && this.playbackRate < 0;
  }
  isPaused() {
    return this.state === et.PAUSED;
  }
  // isLeaving() {
  //   return this.state === AnimationState.LEAVING
  // }
  isEnded() {
    return this.state === et.PAUSED && this.currentTime === 0;
  }
  isCompleted() {
    return this.state === et.PAUSED && this.currentTime === this.trackData.duration;
  }
  // /**
  //  * experimenting
  //  * @returns {boolean}
  //  */
  // isOccupied() {
  //   return this.state === AnimationState.OCCUPIED
  // }
  /**
   * Based on current situation (state, currentTime, playbackRate, startTime) to
   * estimate new state and time with a global time
   * @param {number} globalTime
   * @returns {{ state: string, time: number }}
   */
  getStatus(e) {
    const i = e - this.startTime;
    if (this.isForward()) {
      const n = this._baseTime + i;
      return n >= this.trackData.duration ? {
        state: et.PAUSED,
        time: this.trackData.duration
      } : { state: et.RUNNING, time: n };
    } else if (this.isBackward()) {
      const n = this._baseTime - i;
      return n <= 0 ? { state: et.PAUSED, time: 0 } : { state: et.RUNNING, time: n };
    } else {
      const n = this._baseTime + i;
      return {
        state: this.state,
        time: Math.max(0, Math.min(this.trackData.duration, n))
      };
    }
  }
}
class Vn {
  constructor(e, i) {
    k(this, "AC"), k(this, "key"), k(this, "animations"), k(this, "interpolator"), this.AC = e, this.key = i, this.animations = [], this.interpolator = null;
  }
  addAnimation(e, i) {
    this.animations.some(
      (n) => n.animationId === i.animationId
    ) || this.animations.push(i), this.sortAnimations(), this.interpolator = this.resolve(e, this.animations.length > 1);
  }
  deleteAnimation(e, i) {
    const n = this.animations.indexOf(i);
    n !== -1 && this.animations.splice(n, 1), this.animations.length !== 0 && (this.interpolator = this.resolve(e, !0));
  }
  animationStateUpdated(e) {
    this.interpolator = this.resolve(e, this.animations.length > 1);
  }
  /**
   * Sort animations by priority and startTime
   */
  sortAnimations() {
    this.animations.sort((e, i) => i.createdAt - e.createdAt);
  }
  isPaused() {
    return this.getHighestAnimation().isPaused();
  }
  /**
   * There is an implicit assumption that propertyEffect will always
   * have same progress with the highest priority animation
   *
   * @returns {number}
   */
  getProgress() {
    const e = this.animations[0];
    return e.currentTime / e.trackData.duration;
  }
  getHighestAnimation() {
    return this.animations[0];
  }
  resolve(e, i = !1) {
    return this._resolve(
      e,
      i
    );
  }
  /**
   * Based on current active animations of this property, resolve the interpolator
   * Will always use highest priority animation as the base animation and
   * insert extra keyframes like:
   * - base value at 0
   * - computed value at currentTime
   * to make the interpolator smooth and continuous
   *
   * @param {number} currentTime
   * @param {boolean} needInsertCurrentComputedData
   * @returns {ComposedInterpolator<Value>}
   */
  _resolve(e, i = !1) {
    if (this.animations.length === 0)
      throw new Error(`No animations found for this PropEffect: ${this.key}`);
    const n = this.animations[0], { duration: r } = n.trackData, h = n.getPropTrack(this.key), { type: o, kfs: c } = h, a = c.some((l) => l.time === 0), _ = c.some((l) => l.time === n.currentTime), u = this.AC.getBaseValue(this.key), E = this.AC.getComputedData(this.key);
    if (this.animations.length === 1) {
      const l = a ? c : [{ time: 0, value: u }, ...c], f = this.AC.keyframeComposer.compose(
        o,
        l,
        r
      );
      return i && !_ && f.insertKF({
        time: n.currentTime,
        value: E
      }), f;
    }
    if (this.animations.length > 1) {
      if (n.isForward()) {
        const l = a ? c : [{ time: 0, value: u }, ...c], f = this.AC.keyframeComposer.compose(
          o,
          l,
          r
        );
        return _ || f.insertKF({
          time: n.currentTime,
          value: E
        }), f;
      } else if (n.isBackward()) {
        const l = e + n.currentTime, f = gs(
          this.AC,
          l,
          this.key,
          this.animations,
          1
        ), d = a ? c : [{ time: 0, value: f }, ...c], N = this.AC.keyframeComposer.compose(
          o,
          d,
          r
        );
        return _ || N.insertKF({
          time: n.currentTime,
          value: E
        }), N;
      } else if (n.isPaused()) {
        const l = a ? c : [{ time: 0, value: u }, ...c], f = this.AC.keyframeComposer.compose(
          o,
          l,
          r
        );
        return _ || f.insertKF({
          time: n.currentTime,
          value: E
        }), f;
      }
    }
    throw new Error("unsupported state");
  }
}
const gs = (s, e, i, n, r) => {
  const h = s.getBaseValue(i);
  if (r >= n.length)
    return h;
  const o = n[r], { duration: c } = o.trackData, { time: a, state: _ } = o.getStatus(e), u = o.getPropTrack(i), { type: E, kfs: l } = u, f = l.some((d) => d.time === 0);
  if (o.isForward())
    return s.keyframeComposer.compose(
      E,
      f ? l : [{ time: 0, value: h }, ...l],
      c
    ).interpolate(a / c);
  if (o.isBackward()) {
    if (a === 0 && _ === et.PAUSED)
      return gs(s, e, i, n, r + 1);
    {
      const d = e + a, N = gs(
        s,
        d,
        i,
        n,
        r + 1
      );
      return s.keyframeComposer.compose(
        E,
        f ? l : [{ time: 0, value: N }, ...l],
        c
      ).interpolate(a / c);
    }
  } else {
    if (o.isPaused())
      return s.keyframeComposer.compose(
        E,
        f ? l : [{ time: 0, value: h }, ...l],
        c
      ).interpolate(a / c);
    throw new Error("unsupported state");
  }
}, et = {
  IDLE: "idle",
  // not started
  RUNNING: "running",
  // playing (forward or backward based on playbackRate)
  PAUSED: "paused"
};
class Hn {
  // FIXME: use plugin pattern
  // _debugger: TimelineDebugger<PropTrackKey, Value> | null = null
  constructor(e) {
    k(this, "baseValueCache"), k(this, "computedValueCache"), k(this, "sourceAnimationTracks"), k(this, "animations"), k(this, "propertyEffects"), k(this, "isPlaying"), k(this, "startTime"), k(this, "previousTime"), k(this, "currentTime"), k(this, "_rafId", null), k(this, "keyframeComposer"), this.sourceAnimationTracks = /* @__PURE__ */ new Map(), this.animations = /* @__PURE__ */ new Map(), this.propertyEffects = /* @__PURE__ */ new Map(), this.isPlaying = !1, this.startTime = 0, this.previousTime = 0, this.currentTime = 0, this.baseValueCache = /* @__PURE__ */ new Map(), this.computedValueCache = /* @__PURE__ */ new Map(), this.keyframeComposer = new Gn({ registry: e });
  }
  deinit() {
    this.pause(), this.sourceAnimationTracks.clear(), this.animations.clear(), this.propertyEffects.clear(), this.baseValueCache.clear(), this.computedValueCache.clear();
  }
  setComputedData(e, i) {
    if (i === void 0) {
      console.warn(`Trying to set undefined value for key: ${e}`);
      return;
    }
    this.computedValueCache.set(e, i);
  }
  deleteComputedData(e) {
    this.computedValueCache.delete(e);
  }
  cacheBaseValue(e, i) {
    this.baseValueCache.set(e, i);
  }
  getPropertyEffect(e) {
    return this.propertyEffects.get(e) || (console.warn(`Property effect not found: ${e}`), null);
  }
  tick() {
    if (!this.isPlaying)
      return null;
    this.previousTime = this.currentTime, this.currentTime = performance.now();
    const e = /* @__PURE__ */ new Map();
    for (const [i, n] of this.animations) {
      if (n.isEnded()) {
        this.deleteAnimation(i);
        continue;
      }
      if (n.isPaused())
        continue;
      const { time: r, state: h } = n.getStatus(this.currentTime);
      n.seek(r), e.set(i, h);
    }
    for (const [, i] of this.propertyEffects)
      if (i.interpolator) {
        const n = i.getProgress();
        if (!i.isPaused()) {
          const r = i.interpolator.interpolate(n);
          this.setComputedData(i.key, r);
        }
      } else
        console.warn("interpolator not found");
    for (const [i, n] of this.animations) {
      const r = e.get(i);
      r === et.PAUSED && r !== n.state && this.pauseAnimation(i);
    }
  }
  start() {
    if (this.isPlaying)
      return;
    this.isPlaying = !0, this.startTime = performance.now();
    const e = () => {
      this.tick(), this._rafId = window.requestAnimationFrame(e);
    };
    this._rafId = window.requestAnimationFrame(e);
  }
  pause() {
    this.isPlaying = !1, this._rafId !== null && (window.cancelAnimationFrame(this._rafId), this._rafId = null);
  }
  getComputedData(e) {
    return this.computedValueCache.has(e) ? this.computedValueCache.get(e) : this.getBaseValue(e);
  }
  getBaseValue(e) {
    return this.baseValueCache.get(e);
  }
  loadAnimationTrack(e, i) {
    if (i.duration <= 0) {
      console.warn(
        "Failed to load animation track: duration must be greater than 0",
        e
      );
      return;
    }
    this.sourceAnimationTracks.has(e) && console.warn("track already exists or id conflict", e);
    for (const [n, r] of i.tracks)
      this.cacheBaseValue(n, r.baseValue);
    this.sourceAnimationTracks.set(e, i);
  }
  hasAnimation(e) {
    return this.animations.has(e);
  }
  getAnimation(e) {
    return this.animations.get(e) || (console.warn(`Animation not found: ${e}`), null);
  }
  playAnimation(e, i) {
    let n = this.animations.get(e);
    if (n && !i.backward && (n.isForward() || n.isCompleted()) && this.deleteAnimation(e), n = this.animations.get(e), !n) {
      const r = this.sourceAnimationTracks.get(e);
      if (!r) {
        console.warn(`Animation track data not found for ${e}`);
        return;
      }
      n = new Un(e, r), this.animations.set(e, n);
    }
    i.backward ? n.backward() : n.forward();
    for (const [r] of n.trackData.tracks) {
      if (!this.propertyEffects.has(r)) {
        const o = new Vn(
          this,
          r
        );
        this.propertyEffects.set(r, o);
      }
      const h = this.getPropertyEffect(r);
      h && h.addAnimation(this.currentTime, n);
    }
  }
  pauseAnimation(e) {
    const i = this.getAnimation(e);
    if (i) {
      i.pause();
      for (const [n] of i.trackData.tracks) {
        const r = this.getPropertyEffect(n);
        if (!r)
          continue;
        const h = r.getHighestAnimation();
        h !== i && h.isBackward() && r.animationStateUpdated(this.currentTime);
      }
    }
  }
  deleteAnimation(e) {
    const i = this.getAnimation(e);
    if (i) {
      this.animations.delete(e);
      for (const [n] of i.trackData.tracks) {
        const r = this.getPropertyEffect(n);
        r && (r.deleteAnimation(this.currentTime, i), r.animations.length === 0 && (this.setComputedData(n, this.getBaseValue(n)), this.deleteComputedData(n), this.propertyEffects.delete(n)));
      }
    }
  }
  // transfer version 1
  // @experimental
  // public transferAnimation(
  //   animationId: string,
  //   { clientX, clientY }: { clientX: number; clientY: number }
  // ) {
  //   console.log('transferAnimation', animationId, { clientX, clientY })
  //   // let animation = this.animations.get(animationId)
  //   // if (!animation) {
  //   //     animation = new Animation(this, animationId)
  //   //     this.animations.set(animationId, animation)
  //   // }
  //   // const { trackData } = animation
  //   // const { functions } = trackData
  //   // for (const [_, propFunctionTrack] of functions) {
  //   //     const { key, function: func } = propFunctionTrack
  //   //     const callable = eval(func)
  //   //     const value = callable(clientX, clientY)
  //   //     this.setComputedData(key, value)
  //   // }
  // }
  // // transfer version 2
  // // @experimental
  // public transferAnimation2Start(
  //   animationId: string,
  //   context: AnimationContext
  // ) {
  //   console.log('transferAnimation2Start', animationId, context)
  //   // let animation = this.animations.get(animationId)
  //   // if (animation) {
  //   //     animation.occupy()
  //   //     animation._baseTime = animation.currentTime
  //   // } else {
  //   //     animation = new Animation(this, animationId)
  //   //     this.animations.set(animationId, animation)
  //   //     animation.occupy()
  //   //     for (const [trackKey,] of animation.trackData.tracks) {
  //   //         if (!this.propertyEffects.has(trackKey)) {
  //   //             const propEffect = new PropertyEffect<PropTrackKey, Value>(this, trackKey)
  //   //             this.propertyEffects.set(trackKey, propEffect)
  //   //         }
  //   //         const propEffect = this.getPropertyEffect(trackKey)
  //   //         propEffect.addAnimation(animation)
  //   //         propEffect.generateInterpolator(this.currentTime)
  //   //     }
  //   // }
  // }
  // // @experimental
  // public transferAnimation2Update(
  //   animationId: string,
  //   context: AnimationContext
  // ) {
  //   console.log('transferAnimation2Update', animationId, context)
  //   // const animation = this.getAnimation(animationId)
  //   // const propKey = animation.trackData.tracks.keys().next().value as PropTrackKey
  //   // const propTrack = animation.getPropTrack(propKey)
  //   // const { type, kfs } = propTrack
  //   // _insertKF(kfs, { time: 0, value: this.getBaseValue(propKey) })
  //   // const interpolator = this.keyframeComposer.compose(
  //   //     type,
  //   //     kfs,
  //   //     animation.trackData.duration
  //   // )
  //   // const startValue = interpolator.interpolate(0)
  //   // const finalValue = interpolator.interpolate(1)
  //   // const totalDelta = finalValue.pos[0] - startValue.pos[0]
  //   // const currentDelta = (context.delta?.x || 0)
  //   // const progress = currentDelta / totalDelta
  //   // const localTime = progress * animation.trackData.duration
  //   // animation.currentTime = localTime + animation._baseTime
  // }
  // // @experimental
  // public transferAnimation2Stop(
  //   animationId: string,
  //   context: AnimationContext
  // ) {
  //   console.log('transferAnimation2Stop', animationId, context)
  //   // const animation = this.getAnimation(animationId)
  //   // const propKey = animation.trackData.tracks.keys().next().value as PropTrackKey
  //   // const propTrack = animation.getPropTrack(propKey)
  //   // const { type, kfs } = propTrack
  //   // const newKFs = kfs
  //   // _insertKF(newKFs, { time: 0, value: this.getBaseValue(propKey) })
  //   // const interpolator = this.keyframeComposer.compose(
  //   //     type,
  //   //     newKFs,
  //   //     animation.trackData.duration
  //   // )
  //   // const startValue = interpolator.interpolate(0)
  //   // const finalValue = interpolator.interpolate(1)
  //   // const totalDelta = finalValue.pos[0] - startValue.pos[0]
  //   // const currentDelta = (context.delta?.x || 0)
  //   // const progress = currentDelta / totalDelta
  //   // if (progress >= 0.5) {
  //   //     animation.forward()
  //   // } else {
  //   //     animation.backward()
  //   // }
  // }
}
var Us;
(function(s) {
  s.PERSONAL = "u", s.TEAM = "t";
})(Us || (Us = {}));
var Vs;
(function(s) {
  s.BASE = "bs", s.ELEMENT = "el", s.PROPERTY_COMPONENT = "pc", s.INTERACTION_MANAGER_COMPONENT = "im", s.LAYER = "ly", s.MESH = "ms", s.TRANSITION_MANAGER_COMPONENT = "tm", s.ELEMENT_INTERACTION = "ei";
})(Vs || (Vs = {}));
var Hs;
(function(s) {
  s[s.PIXEL = 0] = "PIXEL", s[s.PERCENT = 1] = "PERCENT";
})(Hs || (Hs = {}));
var Fs;
(function(s) {
  s[s.PIXEL = 0] = "PIXEL", s[s.PERCENT = 1] = "PERCENT";
})(Fs || (Fs = {}));
var Ws;
(function(s) {
  s[s.PIXEL = 0] = "PIXEL", s[s.PERCENT = 1] = "PERCENT", s[s.INCH = 2] = "INCH", s[s.CM = 3] = "CM", s[s.MM = 4] = "MM";
})(Ws || (Ws = {}));
var Ut;
(function(s) {
  s[s.PROPERTY = 0] = "PROPERTY", s[s.ENTITY = 1] = "ENTITY";
})(Ut || (Ut = {}));
var ks;
(function(s) {
  s.BASE_CHANGES = "BASE_CHANGES", s.DEFAULT_CHANGES = "CHANGES", s.EDITOR_CHANGES = "EDITOR_CHANGES", s.EFFECT_LIST_CHANGES = "EFFECT_LIST_CHANGES", s.ELEMENT_INTERACTION_CHANGES = "ELEMENT_INTERACTION_CHANGES", s.GROUP_ADD_CHILDREN = "GROUP_ADD_CHILDREN", s.GROUP_REMOVE_CHILDREN = "GROUP_REMOVE_CHILDREN", s.GUIDELINES_CHANGES = "GUIDELINES_CHANGES", s.IMAGE_CHANGES = "IMAGE_CHANGES", s.INTERACTION_CHANGES = "INTERACTION_CHANGES", s.KFINFO_CHANGES = "KFINFO_CHANGES", s.LAYER_LIST_CHANGES = "LAYER_LIST_CHANGES", s.LIBRARY_CHANGES = "LIBRARY_CHANGES", s.LOAD = "LOAD", s.LOAD_START = "LOAD_START", s.MESH_CHANGES = "MESH_CHANGES", s.MODIFIER_KEY_CHANGES = "MODIFIER_KEY_CHANGES", s.PRESET_LIST_CHANGES = "PRESET_LIST_CHANGES", s.PROPERTY_PANEL_UPDATE_NEEDED = "PROPERTY_PANEL_UPDATE_NEEDED", s.SCENE_TREE_CHANGES = "SCENE_TREE_CHANGES", s.SELECT = "SELECT", s.SELECT_CELL = "SELECT_CELL", s.TRANSACTION = "TRANSACTION", s.TRIGGER_VECTOR_FORCE_UPDATE = "TRIGGER_VECTOR_FORCE_UPDATE", s.UI_STATE_CHANGES = "UI_STATE_CHANGES", s.WORKSPACE_CHANGE = "WORKSPACE_CHANGE", s.WORKSPACE_CHANGE_WATCH = "WORKSPACE_CHANGE_WATCH", s.WORKSPACE_LIST_CHANGES = "WORKSPACE_LIST_CHANGES", s.SELECT_TEXT_RANGE = "SELECT_TEXT_RANGE", s.DATA_STORE_CLEAR = "DATA_STORE_CLEAR", s.VIEWPORT_ZOOM_CHANGE = "VIEWPORT_ZOOM_CHANGE", s.UNDO_CHECKPOINT_CROSSED = "UNDO_CHECKPOINT_CROSSED", s.VIEWPORT_RESIZE = "VIEWPORT_RESIZE";
})(ks || (ks = {}));
var Xs;
(function(s) {
  s[s.SOLID = 0] = "SOLID", s[s.LINEAR = 1] = "LINEAR", s[s.RADIAL = 2] = "RADIAL", s[s.ANGULAR = 3] = "ANGULAR", s[s.DIAMOND = 4] = "DIAMOND", s[s.SHAPE = 5] = "SHAPE", s[s.ACROSS = 6] = "ACROSS", s[s.ALONG = 7] = "ALONG";
})(Xs || (Xs = {}));
var vs;
(function(s) {
  s[s.TOP = 0] = "TOP", s[s.BOTTOM = 1] = "BOTTOM", s[s.MIDDLE = 2] = "MIDDLE";
})(vs || (vs = {}));
var Ys;
(function(s) {
  s[s.LEFT = 0] = "LEFT", s[s.RIGHT = 1] = "RIGHT", s[s.CENTER = 2] = "CENTER", s[s.JUSTIFIED = 3] = "JUSTIFIED";
})(Ys || (Ys = {}));
var zs;
(function(s) {
  s[s.NORMAL = 0] = "NORMAL", s[s.UPPER = 1] = "UPPER", s[s.LOWER = 2] = "LOWER", s[s.TITLE = 3] = "TITLE";
})(zs || (zs = {}));
var Bs;
(function(s) {
  s[s.NORMAL = 0] = "NORMAL", s[s.SUPERSCRIPT = 1] = "SUPERSCRIPT", s[s.SUBSCRIPT = 2] = "SUBSCRIPT";
})(Bs || (Bs = {}));
var qs;
(function(s) {
  s[s.LTR = 0] = "LTR", s[s.RTL = 1] = "RTL";
})(qs || (qs = {}));
var Ks;
(function(s) {
  s[s.AUTO_WIDTH = 0] = "AUTO_WIDTH", s[s.AUTO_HEIGHT = 1] = "AUTO_HEIGHT", s[s.FIXED = 2] = "FIXED";
})(Ks || (Ks = {}));
var gt;
(function(s) {
  s[s.SOLID = 0] = "SOLID", s[s.IMAGE = 1] = "IMAGE", s[s.GRADIENT_LINEAR = 2] = "GRADIENT_LINEAR", s[s.GRADIENT_RADIAL = 3] = "GRADIENT_RADIAL", s[s.GRADIENT_ANGULAR = 4] = "GRADIENT_ANGULAR", s[s.GRADIENT_DIAMOND = 5] = "GRADIENT_DIAMOND";
})(gt || (gt = {}));
var $s;
(function(s) {
  s[s.PASS_THROUGH = 0] = "PASS_THROUGH", s[s.NORMAL = 1] = "NORMAL", s[s.DARKEN = 2] = "DARKEN", s[s.MULTIPLY = 3] = "MULTIPLY", s[s.COLOR_BURN = 4] = "COLOR_BURN", s[s.LIGHTEN = 5] = "LIGHTEN", s[s.SCREEN = 6] = "SCREEN", s[s.COLOR_DODGE = 7] = "COLOR_DODGE", s[s.OVERLAY = 8] = "OVERLAY", s[s.SOFT_LIGHT = 9] = "SOFT_LIGHT", s[s.HARD_LIGHT = 10] = "HARD_LIGHT", s[s.DIFFERENCE = 11] = "DIFFERENCE", s[s.EXCLUSION = 12] = "EXCLUSION", s[s.HUE = 13] = "HUE", s[s.SATURATION = 14] = "SATURATION", s[s.COLOR = 15] = "COLOR", s[s.LUMINOSITY = 16] = "LUMINOSITY", s[s.DIVIDE = 17] = "DIVIDE", s[s.ADD = 18] = "ADD", s[s.SUBTRACT = 19] = "SUBTRACT", s[s.DISSOLVE = 20] = "DISSOLVE";
})($s || ($s = {}));
var Zs;
(function(s) {
  s[s.FILL = 0] = "FILL", s[s.STRETCH = 1] = "STRETCH", s[s.FIT = 2] = "FIT";
})(Zs || (Zs = {}));
var js;
(function(s) {
  s[s.TOP_LEFT = 0] = "TOP_LEFT", s[s.TOP = 1] = "TOP", s[s.TOP_RIGHT = 2] = "TOP_RIGHT", s[s.LEFT = 3] = "LEFT", s[s.CENTER = 4] = "CENTER", s[s.RIGHT = 5] = "RIGHT", s[s.BOTTOM_LEFT = 6] = "BOTTOM_LEFT", s[s.BOTTOM = 7] = "BOTTOM", s[s.BOTTOM_RIGHT = 8] = "BOTTOM_RIGHT";
})(js || (js = {}));
var Qs;
(function(s) {
  s[s.NORMAL = 0] = "NORMAL", s[s.SPACE = 1] = "SPACE";
})(Qs || (Qs = {}));
var Js;
(function(s) {
  s[s.ZERO = 0] = "ZERO", s[s.NINETY = 1] = "NINETY", s[s.ONE_EIGHTY = 2] = "ONE_EIGHTY", s[s.TWO_SEVENTY = 3] = "TWO_SEVENTY";
})(Js || (Js = {}));
var te;
(function(s) {
  s[s.INSIDE = 0] = "INSIDE", s[s.CENTER = 1] = "CENTER", s[s.OUTSIDE = 2] = "OUTSIDE";
})(te || (te = {}));
var se;
(function(s) {
  s[s.NONE = 0] = "NONE", s[s.ROUND = 1] = "ROUND", s[s.LINE_ARROW = 2] = "LINE_ARROW", s[s.TRIANGLE_ARROW_SOLID = 3] = "TRIANGLE_ARROW_SOLID", s[s.TRIANGLE_ARROW_OUTLINE = 4] = "TRIANGLE_ARROW_OUTLINE", s[s.CIRCLE_SOLID = 5] = "CIRCLE_SOLID", s[s.CIRCLE_OUTLINE = 6] = "CIRCLE_OUTLINE", s[s.SQUARE_SOLID = 7] = "SQUARE_SOLID", s[s.SQUARE_OUTLINE = 8] = "SQUARE_OUTLINE";
})(se || (se = {}));
var ee;
(function(s) {
  s[s.MITER = 0] = "MITER", s[s.CONCAVE = 1] = "CONCAVE", s[s.ROUND = 2] = "ROUND", s[s.BEVEL = 3] = "BEVEL", s[s.NONE = 4] = "NONE";
})(ee || (ee = {}));
var ie;
(function(s) {
  s[s.STRAIGHT = 0] = "STRAIGHT", s[s.ROUND = 1] = "ROUND";
})(ie || (ie = {}));
var ne;
(function(s) {
  s[s.HORIZONTAL = 0] = "HORIZONTAL", s[s.VERTICAL = 1] = "VERTICAL";
})(ne || (ne = {}));
var J;
(function(s) {
  s[s.NONE = 0] = "NONE", s[s.UNION = 1] = "UNION", s[s.SUBTRACT = 2] = "SUBTRACT", s[s.INTERSECT = 3] = "INTERSECT", s[s.DIFFERENCE = 4] = "DIFFERENCE";
})(J || (J = {}));
var re;
(function(s) {
  s[s.DOCUMENT = 0] = "DOCUMENT", s[s.DATA_STORE = 1] = "DATA_STORE", s[s.SELECTION = 2] = "SELECTION", s[s.WATCHER = 3] = "WATCHER", s[s.WORKSPACE = 4] = "WORKSPACE", s[s.ELEMENT = 5] = "ELEMENT", s[s.GEOMETRY = 6] = "GEOMETRY", s[s.ELEMENT_COMPONENT = 7] = "ELEMENT_COMPONENT", s[s.PROP_COMPONENT = 8] = "PROP_COMPONENT", s[s.LAYER = 9] = "LAYER", s[s.BASE = 10] = "BASE", s[s.COMPUTED_STYLE = 11] = "COMPUTED_STYLE", s[s.COMPUTED_LAYER = 12] = "COMPUTED_LAYER", s[s.IMAGE_RESOURCE = 13] = "IMAGE_RESOURCE", s[s.IMAGE_EXPORT = 14] = "IMAGE_EXPORT", s[s.IMAGE_PRESET = 15] = "IMAGE_PRESET", s[s.EFFECT = 16] = "EFFECT", s[s.COMPUTED_EFFECT = 17] = "COMPUTED_EFFECT";
})(re || (re = {}));
var he;
(function(s) {
  s[s.TEXT = 0] = "TEXT", s[s.PATH = 1] = "PATH", s[s.GROUP = 2] = "GROUP", s[s.CONTAINER = 3] = "CONTAINER", s[s.GEOMETRY_GROUP = 4] = "GEOMETRY_GROUP", s[s.SCREEN = 5] = "SCREEN", s[s.BOOLEAN_CONTAINER = 6] = "BOOLEAN_CONTAINER", s[s.MASK_CONTAINER = 7] = "MASK_CONTAINER", s[s.NORMAL_GROUP = 8] = "NORMAL_GROUP";
})(he || (he = {}));
var oe;
(function(s) {
  s[s.ELEMENT = 0] = "ELEMENT", s[s.COMPONENT = 1] = "COMPONENT";
})(oe || (oe = {}));
var ce;
(function(s) {
  s[s.CONTAINER = 3] = "CONTAINER", s[s.MASK_CONTAINER = 7] = "MASK_CONTAINER", s[s.BOOLEAN_CONTAINER = 6] = "BOOLEAN_CONTAINER", s[s.NORMAL_GROUP = 8] = "NORMAL_GROUP";
})(ce || (ce = {}));
var ae;
(function(s) {
  s[s.RECTANGLE = 0] = "RECTANGLE", s[s.ELLIPSE = 1] = "ELLIPSE", s[s.POLYGON = 2] = "POLYGON", s[s.REGULAR_POLYGON = 3] = "REGULAR_POLYGON", s[s.STAR = 4] = "STAR", s[s.LINE = 5] = "LINE", s[s.TEXT = 6] = "TEXT";
})(ae || (ae = {}));
var _e;
(function(s) {
  s[s.TRANSLATE = 0] = "TRANSLATE", s[s.DIMENSIONS = 1] = "DIMENSIONS", s[s.ROTATION = 2] = "ROTATION", s[s.OPACITY = 3] = "OPACITY", s[s.FILL = 4] = "FILL", s[s.STROKE = 5] = "STROKE", s[s.SHADOW = 6] = "SHADOW", s[s.INNER_SHADOW = 7] = "INNER_SHADOW", s[s.FONT = 8] = "FONT", s[s.TEXT_ALIGNMENT = 9] = "TEXT_ALIGNMENT", s[s.TEXT_DECORATION = 10] = "TEXT_DECORATION", s[s.TEXT_DIRECTION = 11] = "TEXT_DIRECTION", s[s.TEXT_SPACING = 12] = "TEXT_SPACING", s[s.SCALE = 13] = "SCALE", s[s.SKEW = 14] = "SKEW", s[s.ORIGIN = 15] = "ORIGIN", s[s.OVERFLOW = 16] = "OVERFLOW", s[s.BLUR_GAUSSIAN = 17] = "BLUR_GAUSSIAN", s[s.PAINT = 18] = "PAINT", s[s.IMAGE = 19] = "IMAGE", s[s.CORNER_RADIUS = 20] = "CORNER_RADIUS", s[s.CONTENT_ANCHOR = 21] = "CONTENT_ANCHOR", s[s.EFFECT = 22] = "EFFECT", s[s.REFERENCE_POINT = 23] = "REFERENCE_POINT";
})(_e || (_e = {}));
var ue;
(function(s) {
  s[s.FILL = 4] = "FILL", s[s.STROKE = 5] = "STROKE", s[s.SHADOW = 6] = "SHADOW", s[s.INNER_SHADOW = 7] = "INNER_SHADOW";
})(ue || (ue = {}));
var Ee;
(function(s) {
  s[s.FONT = 8] = "FONT", s[s.TEXT_ALIGNMENT = 9] = "TEXT_ALIGNMENT", s[s.TEXT_DECORATION = 10] = "TEXT_DECORATION", s[s.TEXT_DIRECTION = 11] = "TEXT_DIRECTION";
})(Ee || (Ee = {}));
var le;
(function(s) {
  s[s.SCALE = 13] = "SCALE", s[s.SKEW = 14] = "SKEW", s[s.BLUR_GAUSSIAN = 17] = "BLUR_GAUSSIAN";
})(le || (le = {}));
var fe;
(function(s) {
  s[s.FILL = 4] = "FILL", s[s.STROKE = 5] = "STROKE", s[s.SHADOW = 6] = "SHADOW", s[s.INNER_SHADOW = 7] = "INNER_SHADOW";
})(fe || (fe = {}));
var Te;
(function(s) {
  s[s.VERTEX = 0] = "VERTEX", s[s.EDGE = 1] = "EDGE", s[s.CONTOUR = 2] = "CONTOUR";
})(Te || (Te = {}));
var de;
(function(s) {
  s[s.NONE = 0] = "NONE", s[s.ANGLE = 1] = "ANGLE", s[s.ANGLE_AND_LENGTH = 2] = "ANGLE_AND_LENGTH", s[s.INDEPENDENT = 3] = "INDEPENDENT";
})(de || (de = {}));
var Ne;
(function(s) {
  s[s.TRIM_PATH = 0] = "TRIM_PATH";
})(Ne || (Ne = {}));
var os;
(function(s) {
  s[s.SIMULTANEOUSLY = 0] = "SIMULTANEOUSLY", s[s.INDIVIDUALLY = 1] = "INDIVIDUALLY";
})(os || (os = {}));
var Oe;
(function(s) {
  s[s.ACTION = 0] = "ACTION", s[s.RESPONSE = 1] = "RESPONSE", s[s.TRIGGER = 2] = "TRIGGER", s[s.CONDITION = 3] = "CONDITION", s[s.ELEMENT_TRACK = 4] = "ELEMENT_TRACK", s[s.PROPERTY_TRACK = 5] = "PROPERTY_TRACK", s[s.KEY_FRAME = 6] = "KEY_FRAME", s[s.ANIMATION_PRESET = 7] = "ANIMATION_PRESET", s[s.TRANSFER = 8] = "TRANSFER";
})(Oe || (Oe = {}));
var Ae;
(function(s) {
  s[s.START = 0] = "START", s[s.DURING = 1] = "DURING", s[s.END = 2] = "END", s[s.START_AND_END = 3] = "START_AND_END";
})(Ae || (Ae = {}));
var ge;
(function(s) {
  s[s.LEFT = 0] = "LEFT", s[s.RIGHT = 1] = "RIGHT", s[s.MULTI = 2] = "MULTI";
})(ge || (ge = {}));
var Ie;
(function(s) {
  s.A = "A", s.B = "B", s.C = "C", s.D = "D", s.E = "E", s.F = "F", s.G = "G", s.H = "H", s.I = "I", s.J = "J", s.K = "K", s.L = "L", s.M = "M", s.N = "N", s.O = "O", s.P = "P", s.Q = "Q", s.R = "R", s.S = "S", s.T = "T", s.U = "U", s.V = "V", s.W = "W", s.X = "X", s.Y = "Y", s.Z = "Z", s.NUM_0 = "0", s.NUM_1 = "1", s.NUM_2 = "2", s.NUM_3 = "3", s.NUM_4 = "4", s.NUM_5 = "5", s.NUM_6 = "6", s.NUM_7 = "7", s.NUM_8 = "8", s.NUM_9 = "9";
})(Ie || (Ie = {}));
var Re;
(function(s) {
  s[s.CLICK = 0] = "CLICK", s[s.DOUBLE_CLICK = 1] = "DOUBLE_CLICK", s[s.DRAG = 2] = "DRAG", s[s.EDGE_SWIPE = 3] = "EDGE_SWIPE", s[s.FORCE_TAP = 4] = "FORCE_TAP", s[s.HOVER = 5] = "HOVER", s[s.MOUSE_ENTER = 6] = "MOUSE_ENTER", s[s.MOUSE_LEAVE = 7] = "MOUSE_LEAVE", s[s.MOUSE_UP = 8] = "MOUSE_UP", s[s.MOUSE_DOWN = 9] = "MOUSE_DOWN", s[s.KEY_PRESS = 10] = "KEY_PRESS", s[s.LOAD = 11] = "LOAD", s[s.LONG_PRESS = 12] = "LONG_PRESS", s[s.MANY_CLICK = 13] = "MANY_CLICK", s[s.MOUSE_MOVE = 14] = "MOUSE_MOVE", s[s.PINCH = 15] = "PINCH", s[s.PRESS = 16] = "PRESS", s[s.ROTATE = 17] = "ROTATE", s[s.SCROLL = 18] = "SCROLL", s[s.SWIPE = 19] = "SWIPE";
})(Re || (Re = {}));
var Le;
(function(s) {
  s[s.AND = 0] = "AND", s[s.OR = 1] = "OR";
})(Le || (Le = {}));
var me;
(function(s) {
  s[s.NONE = 0] = "NONE";
})(me || (me = {}));
var Ce;
(function(s) {
  s[s.EXPLICIT = 0] = "EXPLICIT", s[s.INITIAL = 1] = "INITIAL";
})(Ce || (Ce = {}));
var xe;
(function(s) {
  s.EXPLICIT = "EXPLICIT", s.INITIAL = "INITIAL", s.TWEEN = "TWEEN", s.NON_EDITABLE = "NON_EDITABLE";
})(xe || (xe = {}));
var Se;
(function(s) {
  s[s.ANY = 0] = "ANY", s[s.CLOCKWISE = 1] = "CLOCKWISE", s[s.COUNTERCLOCKWISE = 2] = "COUNTERCLOCKWISE", s[s.INWARD = 3] = "INWARD", s[s.OUTWARD = 4] = "OUTWARD", s[s.HORIZONTAL = 5] = "HORIZONTAL", s[s.VERTICAL = 6] = "VERTICAL", s[s.LEFT = 7] = "LEFT", s[s.RIGHT = 8] = "RIGHT", s[s.UP = 9] = "UP", s[s.DOWN = 10] = "DOWN", s[s.START = 11] = "START", s[s.END = 12] = "END";
})(Se || (Se = {}));
var Me;
(function(s) {
  s[s.LINEAR = 0] = "LINEAR", s[s.EASE = 1] = "EASE", s[s.EASE_IN = 2] = "EASE_IN", s[s.EASE_OUT = 3] = "EASE_OUT", s[s.EASE_IN_OUT = 4] = "EASE_IN_OUT", s[s.EASE_IN_SIN = 5] = "EASE_IN_SIN", s[s.EASE_OUT_SINE = 6] = "EASE_OUT_SINE", s[s.EASE_IN_OUT_SINE = 7] = "EASE_IN_OUT_SINE", s[s.EASE_IN_QUAD = 8] = "EASE_IN_QUAD", s[s.EASE_OUT_QUAD = 9] = "EASE_OUT_QUAD", s[s.EASE_IN_OUT_QUAD = 10] = "EASE_IN_OUT_QUAD", s[s.EASE_IN_CUBIC = 11] = "EASE_IN_CUBIC", s[s.EASE_OUT_CUBIC = 12] = "EASE_OUT_CUBIC", s[s.EASE_IN_OUT_CUBIC = 13] = "EASE_IN_OUT_CUBIC", s[s.EASE_IN_QUART = 14] = "EASE_IN_QUART", s[s.EASE_OUT_QUART = 15] = "EASE_OUT_QUART", s[s.EASE_IN_OUT_QUART = 16] = "EASE_IN_OUT_QUART", s[s.EASE_IN_QUINT = 17] = "EASE_IN_QUINT", s[s.EASE_OUT_QUINT = 18] = "EASE_OUT_QUINT", s[s.EASE_IN_OUT_QUINT = 19] = "EASE_IN_OUT_QUINT", s[s.EASE_IN_EXPO = 20] = "EASE_IN_EXPO", s[s.EASE_OUT_EXPO = 21] = "EASE_OUT_EXPO", s[s.EASE_IN_OUT_EXPO = 22] = "EASE_IN_OUT_EXPO", s[s.EASE_IN_CIRC = 23] = "EASE_IN_CIRC", s[s.EASE_OUT_CIRC = 24] = "EASE_OUT_CIRC", s[s.EASE_IN_OUT_CIRC = 25] = "EASE_IN_OUT_CIRC", s[s.EASE_IN_BACK = 26] = "EASE_IN_BACK", s[s.EASE_OUT_BACK = 27] = "EASE_OUT_BACK", s[s.EASE_IN_OUT_BACK = 28] = "EASE_IN_OUT_BACK", s[s.CUSTOM = 29] = "CUSTOM", s[s.STEP = 30] = "STEP", s[s.STEP_START = 31] = "STEP_START", s[s.STEP_MIDDLE = 32] = "STEP_MIDDLE", s[s.STEP_END = 33] = "STEP_END", s[s.STEP_CUSTOM = 34] = "STEP_CUSTOM", s[s.HOP_IN = 35] = "HOP_IN", s[s.HOP_OUT = 36] = "HOP_OUT", s[s.HOP_IN_OUT = 37] = "HOP_IN_OUT";
})(Me || (Me = {}));
var De;
(function(s) {
  s[s.START = 0] = "START", s[s.END = 1] = "END";
})(De || (De = {}));
var Pe;
(function(s) {
  s[s.FADE_IN = 0] = "FADE_IN", s[s.FADE_OUT = 1] = "FADE_OUT", s[s.MOVE_IN = 2] = "MOVE_IN", s[s.MOVE_OUT = 3] = "MOVE_OUT", s[s.SCALE_IN = 4] = "SCALE_IN", s[s.SCALE_OUT = 5] = "SCALE_OUT", s[s.SPIN_IN = 6] = "SPIN_IN", s[s.SPIN_OUT = 7] = "SPIN_OUT", s[s.TRIM_IN = 8] = "TRIM_IN", s[s.TRIM_OUT = 9] = "TRIM_OUT";
})(Pe || (Pe = {}));
var we;
(function(s) {
  s.ELEMENT_LIST = "element_list", s.ACTION_LIST = "action_list";
})(we || (we = {}));
var ye;
(function(s) {
  s.EDITING = "EDITING", s.VIEWING = "VIEWING", s.INSPECTING = "INSPECTING", s.VERSIONING = "VERSIONING", s.PROTOTYPING = "PROTOTYPING";
})(ye || (ye = {}));
var Ge;
(function(s) {
  s[s.SINGLE = 0] = "SINGLE", s[s.TABLE = 1] = "TABLE", s[s.SITEMAP = 2] = "SITEMAP";
})(Ge || (Ge = {}));
var pe;
(function(s) {
  s[s.ELEMENT = 0] = "ELEMENT", s[s.SHAPE = 1] = "SHAPE", s[s.TEXT = 2] = "TEXT", s[s.MOTION_PATH = 3] = "MOTION_PATH";
})(pe || (pe = {}));
var be;
(function(s) {
  s[s.DESIGN = 0] = "DESIGN", s[s.ACTION = 1] = "ACTION";
})(be || (be = {}));
var Ue;
(function(s) {
  s.DESIGN_MODE = "DESIGN_MODE", s.ACTION_MODE = "ACTION_MODE", s.PROTOTYPE_MODE = "PROTOTYPE_MODE", s.INSPECT_MODE = "INSPECT_MODE", s.VERSION_MODE = "VERSION_MODE", s.VIEW_MODE = "VIEW_MODE", s.SELECTOR_MODE = "SELECTOR_MODE";
})(Ue || (Ue = {}));
var Ve;
(function(s) {
  s.EDITING_STATE = "EDITING_STATE", s.VERSIONING_STATE = "VERSIONING_STATE";
})(Ve || (Ve = {}));
var He;
(function(s) {
  s[s.SELECT = 0] = "SELECT", s[s.SCALE = 1] = "SCALE", s[s.HAND = 2] = "HAND", s[s.RECTANGLE = 3] = "RECTANGLE", s[s.ELLIPSE = 4] = "ELLIPSE", s[s.POLYGON = 5] = "POLYGON", s[s.STAR = 6] = "STAR", s[s.LINE = 7] = "LINE", s[s.ARROW = 8] = "ARROW", s[s.CONTAINER = 9] = "CONTAINER", s[s.PEN = 10] = "PEN", s[s.EYE_DROPPER = 11] = "EYE_DROPPER", s[s.COMMENT = 12] = "COMMENT", s[s.INSERT = 13] = "INSERT", s[s.PROTOTYPE = 14] = "PROTOTYPE", s[s.ADD_ACTION = 15] = "ADD_ACTION", s[s.TEXT = 16] = "TEXT";
})(He || (He = {}));
var Fe;
(function(s) {
  s[s.SELECT = 0] = "SELECT", s[s.SCALE = 1] = "SCALE";
})(Fe || (Fe = {}));
var We;
(function(s) {
  s[s.RECTANGLE = 3] = "RECTANGLE", s[s.ELLIPSE = 4] = "ELLIPSE", s[s.POLYGON = 5] = "POLYGON", s[s.STAR = 6] = "STAR", s[s.LINE = 7] = "LINE", s[s.ARROW = 8] = "ARROW", s[s.CONTAINER = 9] = "CONTAINER", s[s.PEN = 10] = "PEN", s[s.TEXT = 16] = "TEXT";
})(We || (We = {}));
var ke;
(function(s) {
  s[s.TOP = 0] = "TOP", s[s.MIDDLE = 1] = "MIDDLE", s[s.BOTTOM = 2] = "BOTTOM", s[s.LEFT = 3] = "LEFT", s[s.CENTER = 4] = "CENTER", s[s.RIGHT = 5] = "RIGHT";
})(ke || (ke = {}));
var Xe;
(function(s) {
  s[s.HORIZONTAL = 0] = "HORIZONTAL", s[s.VERTICAL = 1] = "VERTICAL";
})(Xe || (Xe = {}));
var ve;
(function(s) {
  s[s.IN_PROGRESS = 0] = "IN_PROGRESS", s[s.COMPLETED = 1] = "COMPLETED", s[s.SKIPPED = 2] = "SKIPPED";
})(ve || (ve = {}));
var Ye;
(function(s) {
  s[s.INITIAL = 0] = "INITIAL", s[s.WAITING = 1] = "WAITING", s[s.FINISHED = 2] = "FINISHED";
})(Ye || (Ye = {}));
var ze;
(function(s) {
  s[s.GIF = 0] = "GIF", s[s.MP4 = 1] = "MP4", s[s.LOTTIE = 2] = "LOTTIE", s[s.DOTLOTTIE = 3] = "DOTLOTTIE";
})(ze || (ze = {}));
var Be;
(function(s) {
  s[s.ULTRA = 0] = "ULTRA", s[s.HIGH = 1] = "HIGH", s[s.MEDIUM = 2] = "MEDIUM", s[s.LOW = 3] = "LOW";
})(Be || (Be = {}));
var qe;
(function(s) {
  s[s.IMPORT_LOTTIE_REMINDER_DIALOG_IN_ACTION = 0] = "IMPORT_LOTTIE_REMINDER_DIALOG_IN_ACTION", s[s.IMPORT_DOTLOTTIE_MULTIPLE_ANIMATIONS_DIALOG_IN_ACTION = 1] = "IMPORT_DOTLOTTIE_MULTIPLE_ANIMATIONS_DIALOG_IN_ACTION";
})(qe || (qe = {}));
var Ke;
(function(s) {
  s[s.CONTENT = 0] = "CONTENT", s[s.POSITION = 1] = "POSITION";
})(Ke || (Ke = {}));
var $e;
(function(s) {
  s[s.STOP = 0] = "STOP", s[s.GRADIENT = 1] = "GRADIENT", s[s.HANDLE = 2] = "HANDLE", s[s.ASPECT_RATIO = 3] = "ASPECT_RATIO", s[s.REFERENCE = 4] = "REFERENCE";
})($e || ($e = {}));
var Ze;
(function(s) {
  s[s.BOTH = 0] = "BOTH", s[s.HORIZONTAL = 1] = "HORIZONTAL", s[s.VERTICAL = 2] = "VERTICAL";
})(Ze || (Ze = {}));
var je;
(function(s) {
  s.GUEST = "GUEST", s.MEMBER = "MEMBER", s.ADMIN = "ADMIN", s.OWNER = "OWNER";
})(je || (je = {}));
var Is;
(function(s) {
  s.FROM_MESH_CHANGE = "FROM_MESH_CHANGE", s.FROM_PARENT_EDIT = "FROM_PARENT_EDIT", s.FROM_CHILDREN_CHANGE = "FROM_CHILDREN_CHANGE", s.FROM_ANIMATION = "FROM_ANIMATION", s.FROM_CHANGE_CONTAINER_TYPE = "FROM_CHANGE_CONTAINER_TYPE", s.FROM_DRAG_DUPLICATE = "FROM_DRAG_DUPLICATE", s.FROM_DATA_SYNC = "FROM_DATA_SYNC", s.FROM_INTERACTION_CONTINUOUSLY_CHANGE = "FROM_INTERACTION_CONTINUOUSLY_CHANGE", s.FROM_ELEMENT_CREATE = "FROM_ELEMENT_CREATE", s.SHOW_SCOPE_CHANGE_MODAL = "SHOW_SCOPE_CHANGE_MODAL", s.FROM_SYSTEM = "FROM_SYSTEM", s.FROM_TEXT_EDIT = "FROM_TEXT_EDIT";
})(Is || (Is = {}));
var Qe;
(function(s) {
  s.USER_EDITING = "USER_EDITING", s.UNDO_REDO = "UNDO_REDO", s.ANIMATING = "ANIMATING", s.OTHER = "OTHER";
})(Qe || (Qe = {}));
var Je;
(function(s) {
  s[s.NONE = 0] = "NONE", s[s.UPDATE = 1] = "UPDATE", s[s.UPDATE_ALL = 2] = "UPDATE_ALL", s[s.UPDATE_NEED_BBOX_RECALC = 3] = "UPDATE_NEED_BBOX_RECALC", s[s.UPDATE_ALL_NEED_BBOX_RECALC = 4] = "UPDATE_ALL_NEED_BBOX_RECALC";
})(Je || (Je = {}));
var ti;
(function(s) {
  s.NONE = "NONE", s.ELEMENT = "ELEMENT", s.RESIZE_HANDLE = "RESIZE_HANDLE", s.ROTATE_HANDLE = "ROTATE_HANDLE", s.GRADIENT_STOP_HANDLE = "GRADIENT_STOP_HANDLE", s.GRADIENT_TRANSFORM_START_HANDLE = "GRADIENT_TRANSFORM_START_HANDLE", s.GRADIENT_TRANSFORM_END_HANDLE = "GRADIENT_TRANSFORM_END_HANDLE", s.GRADIENT_TRANSFORM_SHAPE_HANDLE = "GRADIENT_TRANSFORM_SHAPE_HANDLE", s.GRADIENT_TRANSFORM_REFERENCE_LINE = "GRADIENT_TRANSFORM_REFERENCE_LINE", s.SCROLLBAR = "SCROLLBAR", s.CURVE_CONTROL = "CURVE_CONTROL", s.VERTEX = "VERTEX", s.ENDPOINT = "ENDPOINT", s.EDGE = "EDGE", s.ORIGIN = "ORIGIN", s.MULTIPLE_SELECTION_BOUND = "MULTIPLE_SELECTION_BOUND", s.MOTION_POINT = "MOTION_POINT", s.MOTION_SEGMENT = "MOTION_SEGMENT", s.RULER = "RULER", s.GUIDELINE = "GUIDELINE";
})(ti || (ti = {}));
var si;
(function(s) {
  s.ACTIVATE_ARROW_TOOL = "ACTIVATE_ARROW_TOOL", s.ACTIVATE_COMMENT_TOOL = "ACTIVATE_COMMENT_TOOL", s.ACTIVATE_CONTAINER_TOOL = "ACTIVATE_CONTAINER_TOOL", s.ACTIVATE_EDIT_GRADIENT = "ACTIVATE_EDIT_GRADIENT", s.ACTIVATE_ELLIPSE_TOOL = "ACTIVATE_ELLIPSE_TOOL", s.ACTIVATE_EXCLUDE_TOOL = "ACTIVATE_EXCLUDE_TOOL", s.ACTIVATE_EYE_DROPPER_TOOL = "ACTIVATE_EYE_DROPPER_TOOL", s.ACTIVATE_GRADIENT_HANDLES_MODE = "ACTIVATE_GRADIENT_HANDLES_MODE", s.ACTIVATE_HAND_TOOL = "ACTIVATE_HAND_TOOL", s.ACTIVATE_INTERSECT_TOOL = "ACTIVATE_INTERSECT_TOOL", s.ACTIVATE_LINE_TOOL = "ACTIVATE_LINE_TOOL", s.ACTIVATE_PAN = "ACTIVATE_PAN", s.ACTIVATE_PEN_TOOL = "ACTIVATE_PEN_TOOL", s.ACTIVATE_POLYGON_TOOL = "ACTIVATE_POLYGON_TOOL", s.ACTIVATE_RECTANGLE_TOOL = "ACTIVATE_RECTANGLE_TOOL", s.ACTIVATE_SCALE_TOOL = "ACTIVATE_SCALE_TOOL", s.ACTIVATE_SELECTOR_MODE = "ACTIVATE_SELECTOR_MODE", s.ACTIVATE_SELECT_TOOL = "ACTIVATE_SELECT_TOOL", s.ACTIVATE_SHAPE_MODE = "ACTIVATE_SHAPE_MODE", s.ACTIVATE_STAR_TOOL = "ACTIVATE_STAR_TOOL", s.ACTIVATE_SUBTRACT_TOOL = "ACTIVATE_SUBTRACT_TOOL", s.ACTIVATE_TEXT_EDIT_MODE = "ACTIVATE_TEXT_EDIT_MODE", s.ACTIVATE_TEXT_MODE = "ACTIVATE_TEXT_MODE", s.ACTIVATE_TEXT_TOOL = "ACTIVATE_TEXT_TOOL", s.ACTIVATE_UNION_TOOL = "ACTIVATE_UNION_TOOL", s.ADD_ACTION = "ADD_ACTION", s.ADD_LAYER = "ADD_LAYER", s.ADD_NEW_GRADIENT_STOP = "ADD_NEW_GRADIENT_STOP", s.AI_PROMPT = "AI_PROMPT", s.ALIGN = "ALIGN", s.ALL = "*", s.APPEND_ELEMENT = "APPEND_ELEMENT", s.BOOLEAN_GROUP_ELEMENTS = "BOOLEAN_GROUP_ELEMENTS", s.BRING_TO_FRONT = "BRING_TO_FRONT", s.CANCEL_EXPORT_MEDIA = "CANCEL_EXPORT_MEDIA", s.CANCEL_SELECTOR_MODE = "CANCEL_SELECTOR_MODE", s.CHANGE_TEXT_CARET = "CHANGE_TEXT_CARET", s.CLOSE_MODAL = "CLOSE_MODAL", s.COMMENT_DEACTIVATE_PAN = "COMMENT_DEACTIVATE_PAN", s.CONFIRM_SELECTOR_MODE = "CONFIRM_SELECTOR_MODE", s.CONVERT_ELEMENT_TO_CONTAINER = "CONVERT_ELEMENT_TO_CONTAINER", s.CONVERT_ELEMENT_TO_GROUP = "CONVERT_ELEMENT_TO_GROUP", s.CONVERT_ELEMENT_TO_PATH = "CONVERT_ELEMENT_TO_PATH", s.CONVERT_SHAPE_TO_PATH = "CONVERT_SHAPE_TO_PATH", s.COPY = "COPY", s.CREATE_ELEMENT_W_DEFAULT_SIZE = "CREATE_ELEMENT_W_DEFAULT_SIZE", s.CUT = "CUT", s.DEACTIVATE_GRADIENT_HANDLES_MODE = "DEACTIVATE_GRADIENT_HANDLES_MODE", s.DEACTIVATE_PAN = "DEACTIVATE_PAN", s.DEACTIVATE_SELECTOR_MODE = "DEACTIVATE_SELECTOR_MODE", s.DEACTIVATE_SHAPE_MODE = "DEACTIVATE_SHAPE_MODE", s.DEACTIVATE_TEXT_EDIT_MODE = "DEACTIVATE_TEXT_EDIT_MODE", s.DEACTIVATE_TEXT_MODE = "DEACTIVATE_TEXT_MODE", s.DEACTIVATE_MOTION_PATH_MODE = "DEACTIVATE_MOTION_PATH_MODE", s.DECREASE_CORNER_RADIUS = "DECREASE_CORNER_RADIUS", s.DELETE_CELL = "DELETE_CELL", s.DELETE_ELEMENT = "DELETE_ELEMENT", s.DELETE_GRADIENT_STOP = "DELETE_GRADIENT_STOP", s.DELETE_GUIDELINES = "DELETE_GUIDELINES", s.DELETE_KEYFRAME = "DELETE_KEYFRAME", s.DELETE_LAYER = "DELETE_LAYER", s.DELETE_MOTION_POINT = "DELETE_MOTION_POINT", s.DELETE_TEXT = "DELETE_TEXT", s.DERECTLY_SELECT_GUIDE = "DERECTLY_SELECT_GUIDE", s.DESELECT_CELL = "DESELECT_CELL", s.DESELECT_ELEMENT = "DESELECT_ELEMENT", s.DESELECT_KEYFRAME = "DESELECT_KEYFRAME", s.DESELECT_MOTION_POINT = "DESELECT_MOTION_POINT", s.DIRECTLY_SELECT_GUIDE = "DIRECTLY_SELECT_GUIDE", s.DISTRIBUTE = "DISTRIBUTE", s.DOUBLE_LEFT_CLICK = "DOUBLE_LEFT_CLICK", s.DOWNLOAD_FILE = "DOWNLOAD_FILE", s.DRAG_END = "DRAG_END", s.DRAG_OVER = "DRAG_OVER", s.DROP_WITH_FILES = "DROP_WITH_FILES", s.DUPLICATE_CELL = "DUPLICATE_CELL", s.DUPLICATE_ELEMENT = "DUPLICATE_ELEMENT", s.DUPLICATE_KEYFRAME = "DUPLICATE_KEYFRAME", s.EDIT_NEXT_TEXT_ELEMENT = "EDIT_NEXT_TEXT_ELEMENT", s.EDIT_ORIGIN = "EDIT_ORIGIN", s.EDIT_PREVIOUS_TEXT_ELEMENT = "EDIT_PREVIOUS_TEXT_ELEMENT", s.EDIT_SELECTOR = "EDIT_SELECTOR", s.END_AREA_SELECT_CELL = "END_AREA_SELECT_CELL", s.END_AREA_SELECT_ELEMENT = "END_AREA_SELECT_ELEMENT", s.END_CREATE_ELEMENT = "END_CREATE_ELEMENT", s.END_CREATE_GUIDE = "END_CREATE_GUIDE", s.END_DRAG_CELL = "END_DRAG_CELL", s.END_DRAG_ELEMENT = "END_DRAG_ELEMENT", s.END_DRAG_GRADIENT_HANDLE = "END_DRAG_GRADIENT_HANDLE", s.END_DRAG_MOTION_POINT = "END_DRAG_MOTION_POINT", s.END_DRAG_MOTION_SEGMENT = "END_DRAG_MOTION_SEGMENT", s.END_DRAG_MULTI_ELEMENTS = "END_DRAG_MULTI_ELEMENTS", s.END_DRAG_ORIGIN = "END_DRAG_ORIGIN", s.END_DRAG_SCROLLBAR = "END_DRAG_SCROLLBAR", s.END_DRAW_PATH = "END_DRAW_PATH", s.END_DRAW_PATH_ON_EDGE = "END_DRAW_PATH_ON_EDGE", s.END_DRAW_PATH_ON_VERTEX = "END_DRAW_PATH_ON_VERTEX", s.END_EXPAND_TEXT_SELECTION = "END_EXPAND_TEXT_SELECTION", s.END_LEFT_CLICK_MOVE = "END_LEFT_CLICK_MOVE", s.END_MOVE_GUIDE = "END_MOVE_GUIDE", s.END_MOVE_GUIDE_WO_SELECT = "END_MOVE_GUIDE_WO_SELECT", s.END_MOVE_SCROLLBAR = "END_MOVE_SCROLLBAR", s.END_MOVE_TEXT_CARET = "END_MOVE_TEXT_CARET", s.END_PANNING = "END_PANNING", s.END_RESIZE_ELEMENT = "END_RESIZE_ELEMENT", s.END_RIGHT_CLICK_MOVE = "END_RIGHT_CLICK_MOVE", s.END_ROTATE_ELEMENT = "END_ROTATE_ELEMENT", s.END_SCALE_ELEMENT = "END_SCALE_ELEMENT", s.END_ZOOM_TO_SELECTION = "END_ZOOM_TO_SELECTION", s.ENTER_PROTOTYPE_MODE = "ENTER_PROTOTYPE_MODE", s.ENTER_PROTOTYPE_MODE_FULL_SCREEN = "ENTER_PROTOTYPE_MODE_FULL_SCREEN", s.EXIT_EDITOR = "EXIT_EDITOR", s.EXIT_PROTOTYPE_MODE = "EXIT_PROTOTYPE_MODE", s.EXPAND_TEXT_SELECTION = "EXPAND_TEXT_SELECTION", s.EXPAND_TEXT_SELECTION_KEY = "EXPAND_TEXT_SELECTION_KEY", s.EXPAND_TEXT_SELECTION_TO_LINE_START = "EXPAND_TEXT_SELECTION_TO_LINE_START", s.EXPAND_TEXT_SELECTION_TO_NEXT_WORD_KEY = "EXPAND_TEXT_SELECTION_TO_NEXT_WORD_KEY", s.EXPAND_TEXT_SELECTION_TO_TEXT_START = "EXPAND_TEXT_SELECTION_TO_TEXT_START", s.EXPORT_FINISH = "EXPORT_FINISH", s.EXPORT_MEDIA = "EXPORT_MEDIA", s.EXPORT_PROGRESS = "EXPORT_PROGRESS", s.GROUP_ELEMENTS = "GROUP_ELEMENTS", s.HOVER_BOX_HANDLE = "HOVER_BOX_HANDLE", s.HOVER_CELL = "HOVER_CELL", s.HOVER_CELL_WITH_SELECTION = "HOVER_CELL_WITH_SELECTION", s.HOVER_CREATE_PATH = "HOVER_CREATE_PATH", s.HOVER_DEEP_ELEMENT = "HOVER_DEEP_ELEMENT", s.HOVER_ELEMENT = "HOVER_ELEMENT", s.HOVER_GRADIENT_HANDLE = "HOVER_GRADIENT_HANDLE", s.HOVER_GUIDELINE = "HOVER_GUIDELINE", s.HOVER_MOTION_POINT = "HOVER_MOTION_POINT", s.HOVER_MOTION_SEGMENT = "HOVER_MOTION_SEGMENT", s.HOVER_ORIGIN = "HOVER_ORIGIN", s.HOVER_RULER = "HOVER_RULER", s.HOVER_SCROLLBAR = "HOVER_SCROLLBAR", s.INCREASE_CORNER_RADIUS = "INCREASE_CORNER_RADIUS", s.INSERT_ELEMENT = "INSERT_ELEMENT", s.INSERT_IMAGE = "INSERT_IMAGE", s.INSERT_SVG = "INSERT_SVG", s.LEAVE_VERSION_PREVIEW = "LEAVE_VERSION_PREVIEW", s.MAC_ZOOM_TO_POINTER = "MAC_ZOOM_TO_POINTER", s.MASK_GROUP_ELEMENTS = "MASK_GROUP_ELEMENTS", s.MOBILE_PINCH_ZOOM_TO_POINTER = "MOBILE_PINCH_ZOOM_TO_POINTER", s.MOBILE_TOUCH_PAN = "MOBILE_TOUCH_PAN", s.MOVE_BACKWARD = "MOVE_BACKWARD", s.MOVE_CELL_SELECTION_KEY = "MOVE_CELL_SELECTION_KEY", s.MOVE_ELEMENT_SELECTION_KEY = "MOVE_ELEMENT_SELECTION_KEY", s.MOVE_FORWARD = "MOVE_FORWARD", s.MOVE_GRADIENT_HANDLE_KEY = "MOVE_GRADIENT_HANDLE_KEY", s.MOVE_MOTION_POINTS_SELECTION_KEY = "MOVE_MOTION_POINTS_SELECTION_KEY", s.MOVE_TEXT_CARET_KEY = "MOVE_TEXT_CARET_KEY", s.MOVE_TEXT_CARET_TO_LINE_START = "MOVE_TEXT_CARET_TO_LINE_START", s.MOVE_TEXT_CARET_TO_NEXT_WORD_KEY = "MOVE_TEXT_CARET_TO_NEXT_WORD_KEY", s.MOVE_TEXT_CARET_TO_TEXT_START = "MOVE_TEXT_CARET_TO_TEXT_START", s.MOVE_VIEWPORT_KEY = "MOVE_VIEWPORT_KEY", s.MOVE_VIEWPORT_WHEEL = "MOVE_VIEWPORT_WHEEL", s.OPEN_CANVAS_CONTEXT_MENU = "OPEN_CANVAS_CONTEXT_MENU", s.OPEN_ELEMENT_CONTEXT_MENU = "OPEN_ELEMENT_CONTEXT_MENU", s.PASTE = "PASTE", s.PASTE_WITH_FILES = "PASTE_WITH_FILES", s.PAUSE_ANIMATION = "PAUSE_ANIMATION", s.PLAY_ANIMATION = "PLAY_ANIMATION", s.REDO = "REDO", s.RENAME_ELEMENT = "RENAME_ELEMENT", s.RESET_ANIMATION = "RESET_ANIMATION", s.RESET_GRADIENT_STOP_ACTIVE_INDEX = "RESET_GRADIENT_STOP_ACTIVE_INDEX", s.SCHEDULE_RESTART_PROTOTYPE = "SCHEDULE_RESTART_PROTOTYPE", s.RESUME_TEXT_EDIT_MODE = "RESUME_TEXT_EDIT_MODE", s.SELECT_ALL_CELLS = "SELECT_ALL_CELLS", s.SELECT_ALL_ELEMENTS = "SELECT_ALL_ELEMENTS", s.SELECT_ALL_MOTION_POINTS = "SELECT_ALL_MOTION_POINTS", s.SELECT_ALL_TEXT = "SELECT_ALL_TEXT", s.SELECT_CELL = "SELECT_CELL", s.SELECT_CHILD_ELEMENT = "SELECT_CHILD_ELEMENT", s.SELECT_ELEMENT = "SELECT_ELEMENT", s.SELECT_FIRST_ELEMENT = "SELECT_FIRST_ELEMENT", s.SELECT_GRADIENT_HANDLE = "SELECT_GRADIENT_HANDLE", s.SELECT_MOTION_POINT = "SELECT_MOTION_POINT", s.SELECT_NEXT_ELEMENT = "SELECT_NEXT_ELEMENT", s.SELECT_PARENT_ELEMENT = "SELECT_PARENT_ELEMENT", s.SELECT_PREVIOUS_ELEMENT = "SELECT_PREVIOUS_ELEMENT", s.SEND_TO_BACK = "SEND_TO_BACK", s.SET_CURSOR_OVERLAY = "SET_CURSOR_OVERLAY", s.SET_LOCK_GUIDES = "SET_LOCK_GUIDES", s.SHOW_CONFIRMATION = "SHOW_CONFIRMATION", s.SHOW_NOTIFICATION = "SHOW_NOTIFICATION", s.START_AREA_SELECT_CELL = "START_AREA_SELECT_CELL", s.START_AREA_SELECT_ELEMENT = "START_AREA_SELECT_ELEMENT", s.START_CREATE_ELEMENT = "START_CREATE_ELEMENT", s.START_CREATE_GUIDE = "START_CREATE_GUIDE", s.START_DRAG_CELL = "START_DRAG_CELL", s.START_DRAG_ELEMENT = "START_DRAG_ELEMENT", s.START_DRAG_GRADIENT_HANDLE = "START_DRAG_GRADIENT_HANDLE", s.START_DRAG_MOTION_POINT = "START_DRAG_MOTION_POINT", s.START_DRAG_MOTION_SEGMENT = "START_DRAG_MOTION_SEGMENT", s.START_DRAG_MULTI_ELEMENTS = "START_DRAG_MULTI_ELEMENTS", s.START_DRAG_ORIGIN = "START_DRAG_ORIGIN", s.START_DRAG_SCROLLBAR = "START_DRAG_SCROLLBAR", s.START_DRAW_PATH = "START_DRAW_PATH", s.START_DRAW_PATH_ON_EDGE = "START_DRAW_PATH_ON_EDGE", s.START_DRAW_PATH_ON_VERTEX = "START_DRAW_PATH_ON_VERTEX", s.START_EXPAND_TEXT_SELECTION = "START_EXPAND_TEXT_SELECTION", s.START_LEFT_CLICK_MOVE = "START_LEFT_CLICK_MOVE", s.START_MOVE_GUIDE = "START_MOVE_GUIDE", s.START_MOVE_GUIDE_WO_SELECT = "START_MOVE_GUIDE_WO_SELECT", s.START_MOVE_SCROLLBAR = "START_MOVE_SCROLLBAR", s.START_MOVE_TEXT_CARET = "START_MOVE_TEXT_CARET", s.START_PANNING = "START_PANNING", s.START_RESIZE_ELEMENT = "START_RESIZE_ELEMENT", s.START_RIGHT_CLICK_MOVE = "START_RIGHT_CLICK_MOVE", s.START_ROTATE_ELEMENT = "START_ROTATE_ELEMENT", s.START_SCALE_ELEMENT = "START_SCALE_ELEMENT", s.START_ZOOM_TO_SELECTION = "START_ZOOM_TO_SELECTION", s.STOP_ANIMATION = "STOP_ANIMATION", s.SWITCH_BEND_TOOL = "SWITCH_BEND_TOOL", s.SWITCH_DOCUMENT_MODE = "SWITCH_DOCUMENT_MODE", s.SWITCH_MODE = "SWITCH_MODE", s.SWITCH_TEXT_ELEMENT = "SWITCH_TEXT_ELEMENT", s.SWITCH_VIEW_MODE = "SWITCH_VIEW_MODE", s.TEXT_INSERT_NEW_LINE = "TEXT_INSERT_NEW_LINE", s.TOGGLE_ACTION_PANEL = "TOGGLE_ACTION_PANEL", s.TOGGLE_CELL_SELECTION = "TOGGLE_CELL_SELECTION", s.TOGGLE_COMMENT_VISIBILITY = "TOGGLE_COMMENT_VISIBILITY", s.TOGGLE_EXPAND = "TOGGLE_EXPAND", s.TOGGLE_INTERFACE = "TOGGLE_INTERFACE", s.TOGGLE_LOCK = "TOGGLE_LOCK", s.TOGGLE_ORIGIN = "TOGGLE_ORIGIN", s.TOGGLE_PRESENCE = "TOGGLE_PRESENCE", s.TOGGLE_RULER = "TOGGLE_RULER", s.TOGGLE_SNAP_TO_OBJECT = "TOGGLE_SNAP_TO_OBJECT", s.TOGGLE_SNAP_TO_PIXEL_GRID = "TOGGLE_SNAP_TO_PIXEL_GRID", s.TOGGLE_VISIBLE = "TOGGLE_VISIBLE", s.TRACKPAD_ZOOM_TO_POINTER = "TRACKPAD_ZOOM_TO_POINTER", s.UNDO = "UNDO", s.UNGROUP_ELEMENTS = "UNGROUP_ELEMENTS", s.UPDATE_AREA_SELECT_CELL = "UPDATE_AREA_SELECT_CELL", s.UPDATE_AREA_SELECT_ELEMENT = "UPDATE_AREA_SELECT_ELEMENT", s.UPDATE_CREATE_ELEMENT = "UPDATE_CREATE_ELEMENT", s.UPDATE_CREATE_GUIDE = "UPDATE_CREATE_GUIDE", s.UPDATE_DRAG_CELL = "UPDATE_DRAG_CELL", s.UPDATE_DRAG_ELEMENT = "UPDATE_DRAG_ELEMENT", s.UPDATE_DRAG_GRADIENT_HANDLE = "UPDATE_DRAG_GRADIENT_HANDLE", s.UPDATE_DRAG_MOTION_POINT = "UPDATE_DRAG_MOTION_POINT", s.UPDATE_DRAG_MOTION_SEGMENT = "UPDATE_DRAG_MOTION_SEGMENT", s.UPDATE_DRAG_MULTI_ELEMENTS = "UPDATE_DRAG_MULTI_ELEMENTS", s.UPDATE_DRAG_ORIGIN = "UPDATE_DRAG_ORIGIN", s.UPDATE_DRAG_SCROLLBAR = "UPDATE_DRAG_SCROLLBAR", s.UPDATE_DRAW_PATH = "UPDATE_DRAW_PATH", s.UPDATE_DRAW_PATH_ON_EDGE = "UPDATE_DRAW_PATH_ON_EDGE", s.UPDATE_DRAW_PATH_ON_VERTEX = "UPDATE_DRAW_PATH_ON_VERTEX", s.UPDATE_EXPAND_TEXT_SELECTION = "UPDATE_EXPAND_TEXT_SELECTION", s.UPDATE_LEFT_CLICK_MOVE = "UPDATE_LEFT_CLICK_MOVE", s.UPDATE_MOVE_GUIDE = "UPDATE_MOVE_GUIDE", s.UPDATE_MOVE_GUIDE_WO_SELECT = "UPDATE_MOVE_GUIDE_WO_SELECT", s.UPDATE_MOVE_SCROLLBAR = "UPDATE_MOVE_SCROLLBAR", s.UPDATE_MOVE_TEXT_CARET = "UPDATE_MOVE_TEXT_CARET", s.UPDATE_PANNING = "UPDATE_PANNING", s.UPDATE_RESIZE_ELEMENT = "UPDATE_RESIZE_ELEMENT", s.UPDATE_RIGHT_CLICK_MOVE = "UPDATE_RIGHT_CLICK_MOVE", s.UPDATE_ROTATE_ELEMENT = "UPDATE_ROTATE_ELEMENT", s.UPDATE_SCALE_ELEMENT = "UPDATE_SCALE_ELEMENT", s.UPDATE_ZOOM_TO_SELECTION = "UPDATE_ZOOM_TO_SELECTION", s.WHEEL_PAN_VIEWPORT = "WHEEL_PAN_VIEWPORT", s.WHEEL_ZOOM_TO_POINTER = "WHEEL_ZOOM_TO_POINTER", s.ZOOM_CENTER_SELECTION = "ZOOM_CENTER_SELECTION", s.ZOOM_FIT_CONTENT = "ZOOM_FIT_CONTENT", s.ZOOM_FIT_HEIGHT = "ZOOM_FIT_HEIGHT", s.ZOOM_FIT_SELECTION = "ZOOM_FIT_SELECTION", s.ZOOM_FIT_WIDTH = "ZOOM_FIT_WIDTH", s.ZOOM_IN = "ZOOM_IN", s.ZOOM_OUT = "ZOOM_OUT", s.ZOOM_RESET = "ZOOM_RESET", s.ZOOM_TO_POINTER = "ZOOM_TO_POINTER", s.ZOOM_TO_VALUE = "ZOOM_TO_VALUE", s.ON_EVENT_MANAGER_TRIGGER_RUN = "ON_EVENT_MANAGER_TRIGGER_RUN";
})(si || (si = {}));
var ei;
(function(s) {
  s.NONE = "NONE", s.SCREEN = "SCREEN", s.CONTAINER = "CONTAINER", s.TEXT = "TEXT", s.RECTANGLE = "RECTANGLE", s.ELLIPSE = "ELLIPSE", s.POLYGON = "POLYGON", s.REGULAR_POLYGON = "REGULAR_POLYGON", s.STAR = "STAR", s.LINE = "LINE", s.MULTIPLE = "MULTIPLE";
})(ei || (ei = {}));
var Vt = typeof Float32Array < "u" ? Float32Array : Array;
Math.hypot || (Math.hypot = function() {
  for (var s = 0, e = arguments.length; e--; )
    s += arguments[e] * arguments[e];
  return Math.sqrt(s);
});
function Fn() {
  var s = new Vt(6);
  return Vt != Float32Array && (s[1] = 0, s[2] = 0, s[4] = 0, s[5] = 0), s[0] = 1, s[3] = 1, s;
}
function ii(s, e, i, n, r, h, o) {
  return s[0] = e, s[1] = i, s[2] = n, s[3] = r, s[4] = h, s[5] = o, s;
}
function Wn() {
  var s = new Vt(4);
  return Vt != Float32Array && (s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 0), s;
}
function ni(s, e, i, n, r) {
  return s[0] = e, s[1] = i, s[2] = n, s[3] = r, s;
}
(function() {
  var s = Wn();
  return function(e, i, n, r, h, o) {
    var c, a;
    for (i || (i = 4), n || (n = 0), r ? a = Math.min(r * i + n, e.length) : a = e.length, c = n; c < a; c += i)
      s[0] = e[c], s[1] = e[c + 1], s[2] = e[c + 2], s[3] = e[c + 3], h(s, s, o), e[c] = s[0], e[c + 1] = s[1], e[c + 2] = s[2], e[c + 3] = s[3];
    return e;
  };
})();
function kn() {
  var s = new Vt(2);
  return Vt != Float32Array && (s[0] = 0, s[1] = 0), s;
}
function ri(s, e, i) {
  return s[0] = e, s[1] = i, s;
}
(function() {
  var s = kn();
  return function(e, i, n, r, h, o) {
    var c, a;
    for (i || (i = 2), n || (n = 0), r ? a = Math.min(r * i + n, e.length) : a = e.length, c = n; c < a; c += i)
      s[0] = e[c], s[1] = e[c + 1], h(s, s, o), e[c] = s[0], e[c + 1] = s[1];
    return e;
  };
})();
const Ft = 1e-4;
Fn();
function q(s) {
  return s == null;
}
function Y(s) {
  return !q(s);
}
function ct(s) {
  return typeof s == "number";
}
function Xn(s, e, i = Ft) {
  const n = s[0], r = s[1], h = e[0], o = e[1];
  return Math.abs(n - h) <= i * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(r - o) <= i * Math.max(1, Math.abs(r), Math.abs(o));
}
function vn(s, e, i = Ft) {
  const n = s[0], r = s[1], h = s[2], o = s[3], c = e[0], a = e[1], _ = e[2], u = e[3];
  return Math.abs(n - c) <= i * Math.max(1, Math.abs(n), Math.abs(c)) && Math.abs(r - a) <= i * Math.max(1, Math.abs(r), Math.abs(a)) && Math.abs(h - _) <= i * Math.max(1, Math.abs(h), Math.abs(_)) && Math.abs(o - u) <= i * Math.max(1, Math.abs(o), Math.abs(u));
}
function Yn(s, e, i = Ft) {
  const n = s[0], r = s[1], h = s[2], o = s[3], c = s[4], a = s[5], _ = e[0], u = e[1], E = e[2], l = e[3], f = e[4], d = e[5];
  return Math.abs(n - _) <= i * Math.max(1, Math.abs(n), Math.abs(_)) && Math.abs(r - u) <= i * Math.max(1, Math.abs(r), Math.abs(u)) && Math.abs(h - E) <= i * Math.max(1, Math.abs(h), Math.abs(E)) && Math.abs(o - l) <= i * Math.max(1, Math.abs(o), Math.abs(l)) && Math.abs(c - f) <= i * Math.max(1, Math.abs(c), Math.abs(f)) && Math.abs(a - d) <= i * Math.max(1, Math.abs(a), Math.abs(d));
}
function zn(s, e) {
  return s[0] = e[0], s[1] = e[1], s[2] = e[2], s[3] = e[3], s[4] = 0, s[5] = 0, s;
}
class dt extends Float32Array {
  /**
   * Creates new Vector2 from 2 number components or copies values from a single vec2-like object
   * @param  {number | _Vector2 | vec2 | object} x  x component or vec2-like object
   * @param  {number} y   y component
   */
  constructor(e, i) {
    super(2), typeof e == "number" && typeof i == "number" ? ri(this, e, i) : this.copy(e);
  }
  /**
   * Copies values from the vec2-like object
   * @param  {_Vector2 | vec2 | object} val
   * @returns {_Vector2} self
   */
  copy(e) {
    if (q(e))
      return;
    let i = Y(e[0]) ? e[0] : e.x;
    q(i) && (i = e.width);
    let n = Y(e[1]) ? e[1] : e.y;
    if (q(n) && (n = e.height), ct(i) && ct(n))
      ri(this, i, n);
    else
      throw new Error("Trying to copy NaN to Vector2");
    return this;
  }
  /**
   * Checks if this Vector2 is equal (has same corresponding component values) to another vec2-like object
   * @param {_Vector2 | vec2 | object} val     vec2-like object
   * @param {number} [epsilon]                precision, default is 0.0001
   * @returns {boolean}                        true if vectors are equal; false othewise
   */
  eq(e, i = Ft) {
    if (q(e))
      return !1;
    let n = Y(e[0]) ? e[0] : e.x;
    q(n) && (n = e.width);
    let r = Y(e[1]) ? e[1] : e.y;
    return q(r) && (r = e.height), Xn(this, [n, r], i);
  }
  get x() {
    return this[0];
  }
  set x(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to x component of Vector2");
    this[0] = e;
  }
  get y() {
    return this[1];
  }
  set y(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to y component of Vector2");
    this[1] = e;
  }
  get width() {
    return this[0];
  }
  set width(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to width component of Vector2");
    this[0] = e;
  }
  get height() {
    return this[1];
  }
  set height(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to height component of Vector2");
    this[1] = e;
  }
}
dt.ZERO = new dt(0, 0);
dt.ONE = new dt(1, 1);
const vi = (s, e, i, n, r) => [
  s * (n - e) + e,
  s * (r - i) + i
], Bn = (s, e, i, n, r, h, o) => {
  const c = 1 - s, a = c ** 2, _ = 2 * s * c, u = s ** 2;
  return [
    a * e + _ * n + u * h,
    a * i + _ * r + u * o
  ];
}, qn = (s, e, i, n, r, h, o, c, a) => {
  const _ = 1 - s, u = _ ** 3, E = 3 * s * _ ** 2, l = 3 * _ * s ** 2, f = s ** 3;
  return [
    u * e + E * n + l * h + f * c,
    u * i + E * r + l * o + f * a
  ];
}, Yi = (s, e, i, n, r) => {
  let h;
  if (i && n)
    h = qn(s, e.x, e.y, i.x, i.y, n.x, n.y, r.x, r.y);
  else if (i || n) {
    const o = i || n;
    h = Bn(s, e.x, e.y, o.x, o.y, r.x, r.y);
  } else
    h = vi(s, e.x, e.y, r.x, r.y);
  return new dt(h[0], h[1]);
}, Zt = 1e-5, Z = 1e-12, fs = 112e-18, _t = 1e-8, Et = 1e-7, Kn = 1e-5, { abs: kt, cos: lt, sin: Pt, acos: $n, atan2: Xt, sqrt: Nt, pow: ot } = Math;
function vt(s) {
  return s < 0 ? -ot(-s, 1 / 3) : ot(s, 1 / 3);
}
const zi = Math.PI, ts = 2 * zi, Ot = zi / 2, Zn = 1e-6, Ts = Number.MAX_SAFE_INTEGER || 9007199254740991, ds = Number.MIN_SAFE_INTEGER || -9007199254740991, jn = { x: 0, y: 0, z: 0 }, S = {
  // Legendre-Gauss abscissae with n=24 (x_i values, defined at i=n as the roots of the nth order Legendre polynomial Pn(x))
  Tvalues: [
    -0.06405689286260563,
    0.06405689286260563,
    -0.1911188674736163,
    0.1911188674736163,
    -0.3150426796961634,
    0.3150426796961634,
    -0.4337935076260451,
    0.4337935076260451,
    -0.5454214713888396,
    0.5454214713888396,
    -0.6480936519369755,
    0.6480936519369755,
    -0.7401241915785544,
    0.7401241915785544,
    -0.820001985973903,
    0.820001985973903,
    -0.8864155270044011,
    0.8864155270044011,
    -0.9382745520027328,
    0.9382745520027328,
    -0.9747285559713095,
    0.9747285559713095,
    -0.9951872199970213,
    0.9951872199970213
  ],
  // Legendre-Gauss weights with n=24 (w_i values, defined by a function linked to in the Bezier primer article)
  Cvalues: [
    0.12793819534675216,
    0.12793819534675216,
    0.1258374563468283,
    0.1258374563468283,
    0.12167047292780339,
    0.12167047292780339,
    0.1155056680537256,
    0.1155056680537256,
    0.10744427011596563,
    0.10744427011596563,
    0.09761865210411388,
    0.09761865210411388,
    0.08619016153195327,
    0.08619016153195327,
    0.0733464814110803,
    0.0733464814110803,
    0.05929858491543678,
    0.05929858491543678,
    0.04427743881741981,
    0.04427743881741981,
    0.028531388628933663,
    0.028531388628933663,
    0.0123412297999872,
    0.0123412297999872
  ],
  arcfn: function(s, e) {
    const i = e(s);
    let n = i.x * i.x + i.y * i.y;
    return typeof i.z < "u" && (n += i.z * i.z), Nt(n);
  },
  compute: function(s, e, i) {
    if (s === 0)
      return e[0].t = 0, e[0];
    const n = e.length - 1;
    if (s === 1)
      return e[n].t = 1, e[n];
    const r = 1 - s;
    let h = e;
    if (n === 0)
      return e[0].t = s, e[0];
    if (n === 1) {
      const c = {
        x: r * h[0].x + s * h[1].x,
        y: r * h[0].y + s * h[1].y,
        t: s
      };
      return i && (c.z = r * h[0].z + s * h[1].z), c;
    }
    if (n < 4) {
      let c = r * r, a = s * s, _, u, E, l = 0;
      n === 2 ? (h = [h[0], h[1], h[2], jn], _ = c, u = r * s * 2, E = a) : n === 3 && (_ = c * r, u = c * s * 3, E = r * a * 3, l = s * a);
      const f = {
        x: _ * h[0].x + u * h[1].x + E * h[2].x + l * h[3].x,
        y: _ * h[0].y + u * h[1].y + E * h[2].y + l * h[3].y,
        t: s
      };
      return i && (f.z = _ * h[0].z + u * h[1].z + E * h[2].z + l * h[3].z), f;
    }
    const o = JSON.parse(JSON.stringify(e));
    for (; o.length > 1; ) {
      for (let c = 0; c < o.length - 1; c++)
        o[c] = {
          x: o[c].x + (o[c + 1].x - o[c].x) * s,
          y: o[c].y + (o[c + 1].y - o[c].y) * s
        }, typeof o[c].z < "u" && (o[c].z = o[c].z + (o[c + 1].z - o[c].z) * s);
      o.splice(o.length - 1, 1);
    }
    return o[0].t = s, o[0];
  },
  computeWithRatios: function(s, e, i, n) {
    const r = 1 - s, h = i, o = e;
    let c = h[0], a = h[1], _ = h[2], u = h[3], E;
    if (c *= r, a *= s, o.length === 2)
      return E = c + a, {
        x: (c * o[0].x + a * o[1].x) / E,
        y: (c * o[0].y + a * o[1].y) / E,
        z: n ? (c * o[0].z + a * o[1].z) / E : !1,
        t: s
      };
    if (c *= r, a *= 2 * r, _ *= s * s, o.length === 3)
      return E = c + a + _, {
        x: (c * o[0].x + a * o[1].x + _ * o[2].x) / E,
        y: (c * o[0].y + a * o[1].y + _ * o[2].y) / E,
        z: n ? (c * o[0].z + a * o[1].z + _ * o[2].z) / E : !1,
        t: s
      };
    if (c *= r, a *= 1.5 * r, _ *= 3 * r, u *= s * s * s, o.length === 4)
      return E = c + a + _ + u, {
        x: (c * o[0].x + a * o[1].x + _ * o[2].x + u * o[3].x) / E,
        y: (c * o[0].y + a * o[1].y + _ * o[2].y + u * o[3].y) / E,
        z: n ? (c * o[0].z + a * o[1].z + _ * o[2].z + u * o[3].z) / E : !1,
        t: s
      };
  },
  derive: function(s, e) {
    const i = [];
    for (let n = s, r = n.length, h = r - 1; r > 1; r--, h--) {
      const o = [];
      for (let c = 0, a; c < h; c++)
        a = {
          x: h * (n[c + 1].x - n[c].x),
          y: h * (n[c + 1].y - n[c].y)
        }, e && (a.z = h * (n[c + 1].z - n[c].z)), o.push(a);
      i.push(o), n = o;
    }
    return i;
  },
  between: function(s, e, i) {
    return e <= s && s <= i || S.approximately(s, e) || S.approximately(s, i);
  },
  approximately: function(s, e, i) {
    return kt(s - e) <= (i || Zn);
  },
  length: function(s) {
    const i = S.Tvalues.length;
    let n = 0;
    for (let r = 0, h; r < i; r++)
      h = 0.5 * S.Tvalues[r] + 0.5, n += S.Cvalues[r] * S.arcfn(h, s);
    return 0.5 * n;
  },
  map: function(s, e, i, n, r) {
    const h = i - e, o = r - n, c = s - e, a = c / h;
    return n + o * a;
  },
  lerp: function(s, e, i) {
    const n = {
      x: e.x + s * (i.x - e.x),
      y: e.y + s * (i.y - e.y)
    };
    return e.z !== void 0 && i.z !== void 0 && (n.z = e.z + s * (i.z - e.z)), n;
  },
  pointToString: function(s) {
    let e = s.x + "/" + s.y;
    return typeof s.z < "u" && (e += "/" + s.z), e;
  },
  pointsToString: function(s) {
    return "[" + s.map(S.pointToString).join(", ") + "]";
  },
  copy: function(s) {
    return JSON.parse(JSON.stringify(s));
  },
  angle: function(s, e, i) {
    const n = e.x - s.x, r = e.y - s.y, h = i.x - s.x, o = i.y - s.y, c = n * o - r * h, a = n * h + r * o;
    return Xt(c, a);
  },
  // round as string, to avoid rounding errors
  round: function(s, e) {
    const i = "" + s, n = i.indexOf(".");
    return parseFloat(i.substring(0, n + 1 + e));
  },
  dist: function(s, e) {
    const i = s.x - e.x, n = s.y - e.y;
    return Nt(i * i + n * n);
  },
  closest: function(s, e) {
    let i = ot(2, 63), n, r;
    return s.forEach(function(h, o) {
      r = S.dist(e, h), r < i && (i = r, n = o);
    }), { mdist: i, mpos: n };
  },
  abcratio: function(s, e) {
    if (e !== 2 && e !== 3)
      return !1;
    if (typeof s > "u")
      s = 0.5;
    else if (s === 0 || s === 1)
      return s;
    const i = ot(s, e) + ot(1 - s, e), n = i - 1;
    return kt(n / i);
  },
  projectionratio: function(s, e) {
    if (e !== 2 && e !== 3)
      return !1;
    if (typeof s > "u")
      s = 0.5;
    else if (s === 0 || s === 1)
      return s;
    const i = ot(1 - s, e), n = ot(s, e) + i;
    return i / n;
  },
  lli8: function(s, e, i, n, r, h, o, c) {
    const a = (s * n - e * i) * (r - o) - (s - i) * (r * c - h * o), _ = (s * n - e * i) * (h - c) - (e - n) * (r * c - h * o), u = (s - i) * (h - c) - (e - n) * (r - o);
    return u == 0 ? !1 : { x: a / u, y: _ / u };
  },
  lli4: function(s, e, i, n) {
    const r = s.x, h = s.y, o = e.x, c = e.y, a = i.x, _ = i.y, u = n.x, E = n.y;
    return S.lli8(r, h, o, c, a, _, u, E);
  },
  lli: function(s, e) {
    return S.lli4(s, s.c, e, e.c);
  },
  makeline: function(s, e) {
    return new B(
      s.x,
      s.y,
      (s.x + e.x) / 2,
      (s.y + e.y) / 2,
      e.x,
      e.y
    );
  },
  findbbox: function(s) {
    let e = Ts, i = Ts, n = ds, r = ds;
    return s.forEach(function(h) {
      const o = h.bbox();
      e > o.x.min && (e = o.x.min), i > o.y.min && (i = o.y.min), n < o.x.max && (n = o.x.max), r < o.y.max && (r = o.y.max);
    }), {
      x: { min: e, mid: (e + n) / 2, max: n, size: n - e },
      y: { min: i, mid: (i + r) / 2, max: r, size: r - i }
    };
  },
  shapeintersections: function(s, e, i, n, r) {
    if (!S.bboxoverlap(e, n)) return [];
    const h = [], o = [s.startcap, s.forward, s.back, s.endcap], c = [i.startcap, i.forward, i.back, i.endcap];
    return o.forEach(function(a) {
      a.virtual || c.forEach(function(_) {
        if (_.virtual) return;
        const u = a.intersects(_, r);
        u.length > 0 && (u.c1 = a, u.c2 = _, u.s1 = s, u.s2 = i, h.push(u));
      });
    }), h;
  },
  makeshape: function(s, e, i) {
    const n = e.points.length, r = s.points.length, h = S.makeline(e.points[n - 1], s.points[0]), o = S.makeline(s.points[r - 1], e.points[0]), c = {
      startcap: h,
      forward: s,
      back: e,
      endcap: o,
      bbox: S.findbbox([h, s, e, o])
    };
    return c.intersections = function(a) {
      return S.shapeintersections(
        c,
        c.bbox,
        a,
        a.bbox,
        i
      );
    }, c;
  },
  getminmax: function(s, e, i) {
    if (!i) return { min: 0, max: 0 };
    let n = Ts, r = ds, h, o;
    i.indexOf(0) === -1 && (i = [0].concat(i)), i.indexOf(1) === -1 && i.push(1);
    for (let c = 0, a = i.length; c < a; c++)
      h = i[c], o = s.get(h), o[e] < n && (n = o[e]), o[e] > r && (r = o[e]);
    return { min: n, mid: (n + r) / 2, max: r, size: r - n };
  },
  align: function(s, e) {
    const i = e.p1.x, n = e.p1.y, r = -Xt(e.p2.y - n, e.p2.x - i), h = function(o) {
      return {
        x: (o.x - i) * lt(r) - (o.y - n) * Pt(r),
        y: (o.x - i) * Pt(r) + (o.y - n) * lt(r)
      };
    };
    return s.map(h);
  },
  roots: function(s, e) {
    e = e || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const i = s.length - 1, n = S.align(s, e), r = function(m) {
      return 0 <= m && m <= 1;
    };
    if (i === 2) {
      const m = n[0].y, M = n[1].y, P = n[2].y, y = m - 2 * M + P;
      if (y !== 0) {
        const D = -Nt(M * M - m * P), b = -m + M, w = -(D + b) / y, p = -(-D + b) / y;
        return [w, p].filter(r);
      } else if (M !== P && y === 0)
        return [(2 * M - P) / (2 * M - 2 * P)].filter(r);
      return [];
    }
    const h = n[0].y, o = n[1].y, c = n[2].y, a = n[3].y;
    let _ = -h + 3 * o - 3 * c + a, u = 3 * h - 6 * o + 3 * c, E = -3 * h + 3 * o, l = h;
    if (S.approximately(_, 0)) {
      if (S.approximately(u, 0))
        return S.approximately(E, 0) ? [] : [-l / E].filter(r);
      const m = Nt(E * E - 4 * u * l), M = 2 * u;
      return [(m - E) / M, (-E - m) / M].filter(r);
    }
    u /= _, E /= _, l /= _;
    const f = (3 * E - u * u) / 3, d = f / 3, N = (2 * u * u * u - 9 * u * E + 27 * l) / 27, T = N / 2, O = T * T + d * d * d;
    let A, g, R, I, x;
    if (O < 0) {
      const m = -f / 3, M = m * m * m, P = Nt(M), y = -N / (2 * P), D = y < -1 ? -1 : y > 1 ? 1 : y, b = $n(D), w = vt(P), p = 2 * w;
      return R = p * lt(b / 3) - u / 3, I = p * lt((b + ts) / 3) - u / 3, x = p * lt((b + 2 * ts) / 3) - u / 3, [R, I, x].filter(r);
    } else {
      if (O === 0)
        return A = T < 0 ? vt(-T) : -vt(T), R = 2 * A - u / 3, I = -A - u / 3, [R, I].filter(r);
      {
        const m = Nt(O);
        return A = vt(-T + m), g = vt(T + m), [A - g - u / 3].filter(r);
      }
    }
  },
  droots: function(s) {
    if (s.length === 3) {
      const e = s[0], i = s[1], n = s[2], r = e - 2 * i + n;
      if (r !== 0) {
        const h = -Nt(i * i - e * n), o = -e + i, c = -(h + o) / r, a = -(-h + o) / r;
        return [c, a];
      } else if (i !== n && r === 0)
        return [(2 * i - n) / (2 * (i - n))];
      return [];
    }
    if (s.length === 2) {
      const e = s[0], i = s[1];
      return e !== i ? [e / (e - i)] : [];
    }
    return [];
  },
  curvature: function(s, e, i, n, r) {
    let h, o, c, a, _ = 0, u = 0;
    const E = S.compute(s, e), l = S.compute(s, i), f = E.x * E.x + E.y * E.y;
    if (n ? (h = Nt(
      ot(E.y * l.z - l.y * E.z, 2) + ot(E.z * l.x - l.z * E.x, 2) + ot(E.x * l.y - l.x * E.y, 2)
    ), o = ot(f + E.z * E.z, 3 / 2)) : (h = E.x * l.y - E.y * l.x, o = ot(f, 3 / 2)), h === 0 || o === 0)
      return { k: 0, r: 0 };
    if (_ = h / o, u = o / h, !r) {
      const d = S.curvature(s - 1e-3, e, i, n, !0).k, N = S.curvature(s + 1e-3, e, i, n, !0).k;
      a = (N - _ + (_ - d)) / 2, c = (kt(N - _) + kt(_ - d)) / 2;
    }
    return { k: _, r: u, dk: a, adk: c };
  },
  inflections: function(s) {
    if (s.length < 4) return [];
    const e = S.align(s, { p1: s[0], p2: s.slice(-1)[0] }), i = e[2].x * e[1].y, n = e[3].x * e[1].y, r = e[1].x * e[2].y, h = e[3].x * e[2].y, o = 18 * (-3 * i + 2 * n + 3 * r - h), c = 18 * (3 * i - n - 3 * r), a = 18 * (r - i);
    if (S.approximately(o, 0)) {
      if (!S.approximately(c, 0)) {
        let l = -a / c;
        if (0 <= l && l <= 1) return [l];
      }
      return [];
    }
    const _ = 2 * o;
    if (S.approximately(_, 0)) return [];
    const u = c * c - 4 * o * a;
    if (u < 0) return [];
    const E = Math.sqrt(u);
    return [(E - c) / _, -(c + E) / _].filter(function(l) {
      return 0 <= l && l <= 1;
    });
  },
  bboxoverlap: function(s, e) {
    const i = ["x", "y"], n = i.length;
    for (let r = 0, h, o, c, a; r < n; r++)
      if (h = i[r], o = s[h].mid, c = e[h].mid, a = (s[h].size + e[h].size) / 2, kt(o - c) >= a) return !1;
    return !0;
  },
  expandbox: function(s, e) {
    e.x.min < s.x.min && (s.x.min = e.x.min), e.y.min < s.y.min && (s.y.min = e.y.min), e.z && e.z.min < s.z.min && (s.z.min = e.z.min), e.x.max > s.x.max && (s.x.max = e.x.max), e.y.max > s.y.max && (s.y.max = e.y.max), e.z && e.z.max > s.z.max && (s.z.max = e.z.max), s.x.mid = (s.x.min + s.x.max) / 2, s.y.mid = (s.y.min + s.y.max) / 2, s.z && (s.z.mid = (s.z.min + s.z.max) / 2), s.x.size = s.x.max - s.x.min, s.y.size = s.y.max - s.y.min, s.z && (s.z.size = s.z.max - s.z.min);
  },
  pairiteration: function(s, e, i) {
    const n = s.bbox(), r = e.bbox(), h = 1e5, o = i || 0.5;
    if (n.x.size + n.y.size < o && r.x.size + r.y.size < o)
      return [
        (h * (s._t1 + s._t2) / 2 | 0) / h + "/" + (h * (e._t1 + e._t2) / 2 | 0) / h
      ];
    let c = s.split(0.5), a = e.split(0.5), _ = [
      { left: c.left, right: a.left },
      { left: c.left, right: a.right },
      { left: c.right, right: a.right },
      { left: c.right, right: a.left }
    ];
    _ = _.filter(function(E) {
      return S.bboxoverlap(E.left.bbox(), E.right.bbox());
    });
    let u = [];
    return _.length === 0 || (_.forEach(function(E) {
      u = u.concat(
        S.pairiteration(E.left, E.right, o)
      );
    }), u = u.filter(function(E, l) {
      return u.indexOf(E) === l;
    })), u;
  },
  getccenter: function(s, e, i) {
    const n = e.x - s.x, r = e.y - s.y, h = i.x - e.x, o = i.y - e.y, c = n * lt(Ot) - r * Pt(Ot), a = n * Pt(Ot) + r * lt(Ot), _ = h * lt(Ot) - o * Pt(Ot), u = h * Pt(Ot) + o * lt(Ot), E = (s.x + e.x) / 2, l = (s.y + e.y) / 2, f = (e.x + i.x) / 2, d = (e.y + i.y) / 2, N = E + c, T = l + a, O = f + _, A = d + u, g = S.lli8(E, l, N, T, f, d, O, A), R = S.dist(g, s);
    let I = Xt(s.y - g.y, s.x - g.x), x = Xt(e.y - g.y, e.x - g.x), m = Xt(i.y - g.y, i.x - g.x), M;
    return I < m ? ((I > x || x > m) && (I += ts), I > m && (M = m, m = I, I = M)) : m < x && x < I ? (M = m, m = I, I = M) : m += ts, g.s = I, g.e = m, g.r = R, g;
  },
  numberSort: function(s, e) {
    return s - e;
  }
};
class jt {
  constructor(e) {
    this.curves = [], this._3d = !1, e && (this.curves = e, this._3d = this.curves[0]._3d);
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return "[" + this.curves.map(function(e) {
      return S.pointsToString(e.points);
    }).join(", ") + "]";
  }
  addCurve(e) {
    this.curves.push(e), this._3d = this._3d || e._3d;
  }
  length() {
    return this.curves.map(function(e) {
      return e.length();
    }).reduce(function(e, i) {
      return e + i;
    });
  }
  curve(e) {
    return this.curves[e];
  }
  bbox() {
    const e = this.curves;
    for (var i = e[0].bbox(), n = 1; n < e.length; n++)
      S.expandbox(i, e[n].bbox());
    return i;
  }
  offset(e) {
    const i = [];
    return this.curves.forEach(function(n) {
      i.push(...n.offset(e));
    }), new jt(i);
  }
}
const { abs: Yt, min: hi, max: oi, cos: Qn, sin: Jn, acos: tr, sqrt: zt } = Math, sr = Math.PI;
class B {
  constructor(e) {
    let i = e && e.forEach ? e : Array.from(arguments).slice(), n = !1;
    if (typeof i[0] == "object") {
      n = i.length;
      const f = [];
      i.forEach(function(d) {
        ["x", "y", "z"].forEach(function(N) {
          typeof d[N] < "u" && f.push(d[N]);
        });
      }), i = f;
    }
    let r = !1;
    const h = i.length;
    if (n) {
      if (n > 4) {
        if (arguments.length !== 1)
          throw new Error(
            "Only new Bezier(point[]) is accepted for 4th and higher order curves"
          );
        r = !0;
      }
    } else if (h !== 6 && h !== 8 && h !== 9 && h !== 12 && arguments.length !== 1)
      throw new Error(
        "Only new Bezier(point[]) is accepted for 4th and higher order curves"
      );
    const o = this._3d = !r && (h === 9 || h === 12) || e && e[0] && typeof e[0].z < "u", c = this.points = [];
    for (let f = 0, d = o ? 3 : 2; f < h; f += d) {
      var a = {
        x: i[f],
        y: i[f + 1]
      };
      o && (a.z = i[f + 2]), c.push(a);
    }
    const _ = this.order = c.length - 1, u = this.dims = ["x", "y"];
    o && u.push("z"), this.dimlen = u.length;
    const E = S.align(c, { p1: c[0], p2: c[_] }), l = S.dist(c[0], c[_]);
    this._linear = E.reduce((f, d) => f + Yt(d.y), 0) < l / 50, this._lut = [], this._t1 = 0, this._t2 = 1, this.update();
  }
  static quadraticFromPoints(e, i, n, r) {
    if (typeof r > "u" && (r = 0.5), r === 0)
      return new B(i, i, n);
    if (r === 1)
      return new B(e, i, i);
    const h = B.getABC(2, e, i, n, r);
    return new B(e, h.A, n);
  }
  static cubicFromPoints(e, i, n, r, h) {
    typeof r > "u" && (r = 0.5);
    const o = B.getABC(3, e, i, n, r);
    typeof h > "u" && (h = S.dist(i, o.C));
    const c = h * (1 - r) / r, a = S.dist(e, n), _ = (n.x - e.x) / a, u = (n.y - e.y) / a, E = h * _, l = h * u, f = c * _, d = c * u, N = { x: i.x - E, y: i.y - l }, T = { x: i.x + f, y: i.y + d }, O = o.A, A = { x: O.x + (N.x - O.x) / (1 - r), y: O.y + (N.y - O.y) / (1 - r) }, g = { x: O.x + (T.x - O.x) / r, y: O.y + (T.y - O.y) / r }, R = { x: e.x + (A.x - e.x) / r, y: e.y + (A.y - e.y) / r }, I = {
      x: n.x + (g.x - n.x) / (1 - r),
      y: n.y + (g.y - n.y) / (1 - r)
    };
    return new B(e, R, I, n);
  }
  static getUtils() {
    return S;
  }
  getUtils() {
    return B.getUtils();
  }
  static get PolyBezier() {
    return jt;
  }
  valueOf() {
    return this.toString();
  }
  toString() {
    return S.pointsToString(this.points);
  }
  toSVG() {
    if (this._3d) return !1;
    const e = this.points, i = e[0].x, n = e[0].y, r = ["M", i, n, this.order === 2 ? "Q" : "C"];
    for (let h = 1, o = e.length; h < o; h++)
      r.push(e[h].x), r.push(e[h].y);
    return r.join(" ");
  }
  setRatios(e) {
    if (e.length !== this.points.length)
      throw new Error("incorrect number of ratio values");
    this.ratios = e, this._lut = [];
  }
  verify() {
    const e = this.coordDigest();
    e !== this._print && (this._print = e, this.update());
  }
  coordDigest() {
    return this.points.map(function(e, i) {
      return "" + i + e.x + e.y + (e.z ? e.z : 0);
    }).join("");
  }
  update() {
    this._lut = [], this.dpoints = S.derive(this.points, this._3d), this.computedirection();
  }
  computedirection() {
    const e = this.points, i = S.angle(e[0], e[this.order], e[1]);
    this.clockwise = i > 0;
  }
  length() {
    return S.length(this.derivative.bind(this));
  }
  static getABC(e = 2, i, n, r, h = 0.5) {
    const o = S.projectionratio(h, e), c = 1 - o, a = {
      x: o * i.x + c * r.x,
      y: o * i.y + c * r.y
    }, _ = S.abcratio(h, e);
    return { A: {
      x: n.x + (n.x - a.x) / _,
      y: n.y + (n.y - a.y) / _
    }, B: n, C: a, S: i, E: r };
  }
  getABC(e, i) {
    i = i || this.get(e);
    let n = this.points[0], r = this.points[this.order];
    return B.getABC(this.order, n, i, r, e);
  }
  getLUT(e) {
    if (this.verify(), e = e || 100, this._lut.length === e + 1)
      return this._lut;
    this._lut = [], e++, this._lut = [];
    for (let i = 0, n, r; i < e; i++)
      r = i / (e - 1), n = this.compute(r), n.t = r, this._lut.push(n);
    return this._lut;
  }
  on(e, i) {
    i = i || 5;
    const n = this.getLUT(), r = [];
    for (let h = 0, o, c = 0; h < n.length; h++)
      o = n[h], S.dist(o, e) < i && (r.push(o), c += h / n.length);
    return r.length ? t /= r.length : !1;
  }
  project(e) {
    const i = this.getLUT(), n = i.length - 1, r = S.closest(i, e), h = r.mpos, o = (h - 1) / n, c = (h + 1) / n, a = 0.1 / n;
    let _ = r.mdist, u = o, E = u, l;
    _ += 1;
    for (let f; u < c + a; u += a)
      l = this.compute(u), f = S.dist(e, l), f < _ && (_ = f, E = u);
    return E = E < 0 ? 0 : E > 1 ? 1 : E, l = this.compute(E), l.t = E, l.d = _, l;
  }
  get(e) {
    return this.compute(e);
  }
  point(e) {
    return this.points[e];
  }
  compute(e) {
    return this.ratios ? S.computeWithRatios(e, this.points, this.ratios, this._3d) : S.compute(e, this.points, this._3d, this.ratios);
  }
  raise() {
    const e = this.points, i = [e[0]], n = e.length;
    for (let r = 1, h, o; r < n; r++)
      h = e[r], o = e[r - 1], i[r] = {
        x: (n - r) / n * h.x + r / n * o.x,
        y: (n - r) / n * h.y + r / n * o.y
      };
    return i[n] = e[n - 1], new B(i);
  }
  derivative(e) {
    return S.compute(e, this.dpoints[0], this._3d);
  }
  dderivative(e) {
    return S.compute(e, this.dpoints[1], this._3d);
  }
  align() {
    let e = this.points;
    return new B(S.align(e, { p1: e[0], p2: e[e.length - 1] }));
  }
  curvature(e) {
    return S.curvature(e, this.dpoints[0], this.dpoints[1], this._3d);
  }
  inflections() {
    return S.inflections(this.points);
  }
  normal(e) {
    return this._3d ? this.__normal3(e) : this.__normal2(e);
  }
  __normal2(e) {
    const i = this.derivative(e), n = zt(i.x * i.x + i.y * i.y);
    return { t: e, x: -i.y / n, y: i.x / n };
  }
  __normal3(e) {
    const i = this.derivative(e), n = this.derivative(e + 0.01), r = zt(i.x * i.x + i.y * i.y + i.z * i.z), h = zt(n.x * n.x + n.y * n.y + n.z * n.z);
    i.x /= r, i.y /= r, i.z /= r, n.x /= h, n.y /= h, n.z /= h;
    const o = {
      x: n.y * i.z - n.z * i.y,
      y: n.z * i.x - n.x * i.z,
      z: n.x * i.y - n.y * i.x
    }, c = zt(o.x * o.x + o.y * o.y + o.z * o.z);
    o.x /= c, o.y /= c, o.z /= c;
    const a = [
      o.x * o.x,
      o.x * o.y - o.z,
      o.x * o.z + o.y,
      o.x * o.y + o.z,
      o.y * o.y,
      o.y * o.z - o.x,
      o.x * o.z - o.y,
      o.y * o.z + o.x,
      o.z * o.z
    ];
    return {
      t: e,
      x: a[0] * i.x + a[1] * i.y + a[2] * i.z,
      y: a[3] * i.x + a[4] * i.y + a[5] * i.z,
      z: a[6] * i.x + a[7] * i.y + a[8] * i.z
    };
  }
  hull(e) {
    let i = this.points, n = [], r = [], h = 0;
    for (r[h++] = i[0], r[h++] = i[1], r[h++] = i[2], this.order === 3 && (r[h++] = i[3]); i.length > 1; ) {
      n = [];
      for (let o = 0, c, a = i.length - 1; o < a; o++)
        c = S.lerp(e, i[o], i[o + 1]), r[h++] = c, n.push(c);
      i = n;
    }
    return r;
  }
  split(e, i) {
    if (e === 0 && i)
      return this.split(i).left;
    if (i === 1)
      return this.split(e).right;
    const n = this.hull(e), r = {
      left: this.order === 2 ? new B([n[0], n[3], n[5]]) : new B([n[0], n[4], n[7], n[9]]),
      right: this.order === 2 ? new B([n[5], n[4], n[2]]) : new B([n[9], n[8], n[6], n[3]]),
      span: n
    };
    return r.left._t1 = S.map(0, 0, 1, this._t1, this._t2), r.left._t2 = S.map(e, 0, 1, this._t1, this._t2), r.right._t1 = S.map(e, 0, 1, this._t1, this._t2), r.right._t2 = S.map(1, 0, 1, this._t1, this._t2), i ? (i = S.map(i, e, 1, 0, 1), r.right.split(i).left) : r;
  }
  extrema() {
    const e = {};
    let i = [];
    return this.dims.forEach(
      (function(n) {
        let r = function(o) {
          return o[n];
        }, h = this.dpoints[0].map(r);
        e[n] = S.droots(h), this.order === 3 && (h = this.dpoints[1].map(r), e[n] = e[n].concat(S.droots(h))), e[n] = e[n].filter(function(o) {
          return o >= 0 && o <= 1;
        }), i = i.concat(e[n].sort(S.numberSort));
      }).bind(this)
    ), e.values = i.sort(S.numberSort).filter(function(n, r) {
      return i.indexOf(n) === r;
    }), e;
  }
  bbox() {
    const e = this.extrema(), i = {};
    return this.dims.forEach(
      (function(n) {
        i[n] = S.getminmax(this, n, e[n]);
      }).bind(this)
    ), i;
  }
  overlaps(e) {
    const i = this.bbox(), n = e.bbox();
    return S.bboxoverlap(i, n);
  }
  offset(e, i) {
    if (typeof i < "u") {
      const n = this.get(e), r = this.normal(e), h = {
        c: n,
        n: r,
        x: n.x + r.x * i,
        y: n.y + r.y * i
      };
      return this._3d && (h.z = n.z + r.z * i), h;
    }
    if (this._linear) {
      const n = this.normal(0), r = this.points.map(function(h) {
        const o = {
          x: h.x + e * n.x,
          y: h.y + e * n.y
        };
        return h.z && n.z && (o.z = h.z + e * n.z), o;
      });
      return [new B(r)];
    }
    return this.reduce().map(function(n) {
      return n._linear ? n.offset(e)[0] : n.scale(e);
    });
  }
  simple() {
    if (this.order === 3) {
      const r = S.angle(this.points[0], this.points[3], this.points[1]), h = S.angle(this.points[0], this.points[3], this.points[2]);
      if (r > 0 && h < 0 || r < 0 && h > 0) return !1;
    }
    const e = this.normal(0), i = this.normal(1);
    let n = e.x * i.x + e.y * i.y;
    return this._3d && (n += e.z * i.z), Yt(tr(n)) < sr / 3;
  }
  reduce() {
    let e, i = 0, n = 0, r = 0.01, h, o = [], c = [], a = this.extrema().values;
    for (a.indexOf(0) === -1 && (a = [0].concat(a)), a.indexOf(1) === -1 && a.push(1), i = a[0], e = 1; e < a.length; e++)
      n = a[e], h = this.split(i, n), h._t1 = i, h._t2 = n, o.push(h), i = n;
    return o.forEach(function(_) {
      for (i = 0, n = 0; n <= 1; )
        for (n = i + r; n <= 1 + r; n += r)
          if (h = _.split(i, n), !h.simple()) {
            if (n -= r, Yt(i - n) < r)
              return [];
            h = _.split(i, n), h._t1 = S.map(i, 0, 1, _._t1, _._t2), h._t2 = S.map(n, 0, 1, _._t1, _._t2), c.push(h), i = n;
            break;
          }
      i < 1 && (h = _.split(i, 1), h._t1 = S.map(i, 0, 1, _._t1, _._t2), h._t2 = _._t2, c.push(h));
    }), c;
  }
  translate(e, i, n) {
    n = typeof n == "number" ? n : i;
    const r = this.order;
    let h = this.points.map((o, c) => (1 - c / r) * i + c / r * n);
    return new B(
      this.points.map((o, c) => ({
        x: o.x + e.x * h[c],
        y: o.y + e.y * h[c]
      }))
    );
  }
  scale(e) {
    const i = this.order;
    let n = !1;
    if (typeof e == "function" && (n = e), n && i === 2)
      return this.raise().scale(n);
    const r = this.clockwise, h = this.points;
    if (this._linear)
      return this.translate(
        this.normal(0),
        n ? n(0) : e,
        n ? n(1) : e
      );
    const o = n ? n(0) : e, c = n ? n(1) : e, a = [this.offset(0, 10), this.offset(1, 10)], _ = [], u = S.lli4(a[0], a[0].c, a[1], a[1].c);
    if (!u)
      throw new Error("cannot scale this curve. Try reducing it first.");
    return [0, 1].forEach(function(E) {
      const l = _[E * i] = S.copy(h[E * i]);
      l.x += (E ? c : o) * a[E].n.x, l.y += (E ? c : o) * a[E].n.y;
    }), n ? ([0, 1].forEach(function(E) {
      if (!(i === 2 && E)) {
        var l = h[E + 1], f = {
          x: l.x - u.x,
          y: l.y - u.y
        }, d = n ? n((E + 1) / i) : e;
        n && !r && (d = -d);
        var N = zt(f.x * f.x + f.y * f.y);
        f.x /= N, f.y /= N, _[E + 1] = {
          x: l.x + d * f.x,
          y: l.y + d * f.y
        };
      }
    }), new B(_)) : ([0, 1].forEach((E) => {
      if (i === 2 && E) return;
      const l = _[E * i], f = this.derivative(E), d = { x: l.x + f.x, y: l.y + f.y };
      _[E + 1] = S.lli4(l, d, u, h[E + 1]);
    }), new B(_));
  }
  outline(e, i, n, r) {
    if (i = i === void 0 ? e : i, this._linear) {
      const I = this.normal(0), x = this.points[0], m = this.points[this.points.length - 1];
      let M, P, y;
      n === void 0 && (n = e, r = i), M = { x: x.x + I.x * e, y: x.y + I.y * e }, y = { x: m.x + I.x * n, y: m.y + I.y * n }, P = { x: (M.x + y.x) / 2, y: (M.y + y.y) / 2 };
      const D = [M, P, y];
      M = { x: x.x - I.x * i, y: x.y - I.y * i }, y = { x: m.x - I.x * r, y: m.y - I.y * r }, P = { x: (M.x + y.x) / 2, y: (M.y + y.y) / 2 };
      const b = [y, P, M], w = S.makeline(b[2], D[0]), p = S.makeline(D[2], b[0]), v = [w, new B(D), p, new B(b)];
      return new jt(v);
    }
    const h = this.reduce(), o = h.length, c = [];
    let a = [], _, u = 0, E = this.length();
    const l = typeof n < "u" && typeof r < "u";
    function f(I, x, m, M, P) {
      return function(y) {
        const D = M / m, b = (M + P) / m, w = x - I;
        return S.map(y, 0, 1, I + D * w, I + b * w);
      };
    }
    h.forEach(function(I) {
      const x = I.length();
      l ? (c.push(
        I.scale(f(e, n, E, u, x))
      ), a.push(
        I.scale(f(-i, -r, E, u, x))
      )) : (c.push(I.scale(e)), a.push(I.scale(-i))), u += x;
    }), a = a.map(function(I) {
      return _ = I.points, _[3] ? I.points = [_[3], _[2], _[1], _[0]] : I.points = [_[2], _[1], _[0]], I;
    }).reverse();
    const d = c[0].points[0], N = c[o - 1].points[c[o - 1].points.length - 1], T = a[o - 1].points[a[o - 1].points.length - 1], O = a[0].points[0], A = S.makeline(T, d), g = S.makeline(N, O), R = [A].concat(c).concat([g]).concat(a);
    return new jt(R);
  }
  outlineshapes(e, i, n) {
    i = i || e;
    const r = this.outline(e, i).curves, h = [];
    for (let o = 1, c = r.length; o < c / 2; o++) {
      const a = S.makeshape(
        r[o],
        r[c - o],
        n
      );
      a.startcap.virtual = o > 1, a.endcap.virtual = o < c / 2 - 1, h.push(a);
    }
    return h;
  }
  intersects(e, i) {
    return e ? e.p1 && e.p2 ? this.lineIntersects(e) : (e instanceof B && (e = e.reduce()), this.curveintersects(
      this.reduce(),
      e,
      i
    )) : this.selfintersects(i);
  }
  lineIntersects(e) {
    const i = hi(e.p1.x, e.p2.x), n = hi(e.p1.y, e.p2.y), r = oi(e.p1.x, e.p2.x), h = oi(e.p1.y, e.p2.y);
    return S.roots(this.points, e).filter((o) => {
      var c = this.get(o);
      return S.between(c.x, i, r) && S.between(c.y, n, h);
    });
  }
  selfintersects(e) {
    const i = this.reduce(), n = i.length - 2, r = [];
    for (let h = 0, o, c, a; h < n; h++)
      c = i.slice(h, h + 1), a = i.slice(h + 2), o = this.curveintersects(c, a, e), r.push(...o);
    return r;
  }
  curveintersects(e, i, n) {
    const r = [];
    e.forEach(function(o) {
      i.forEach(function(c) {
        o.overlaps(c) && r.push({ left: o, right: c });
      });
    });
    let h = [];
    return r.forEach(function(o) {
      const c = S.pairiteration(
        o.left,
        o.right,
        n
      );
      c.length > 0 && (h = h.concat(c));
    }), h;
  }
  arcs(e) {
    return e = e || 0.5, this._iterate(e, []);
  }
  _error(e, i, n, r) {
    const h = (r - n) / 4, o = this.get(n + h), c = this.get(r - h), a = S.dist(e, i), _ = S.dist(e, o), u = S.dist(e, c);
    return Yt(_ - a) + Yt(u - a);
  }
  _iterate(e, i) {
    let n = 0, r = 1, h;
    do {
      h = 0, r = 1;
      let o = this.get(n), c, a, _, u, E = !1, l = !1, f, d = r, N = 1;
      do
        if (l = E, u = _, d = (n + r) / 2, c = this.get(d), a = this.get(r), _ = S.getccenter(o, c, a), _.interval = {
          start: n,
          end: r
        }, E = this._error(_, o, n, r) <= e, f = l && !E, f || (N = r), E) {
          if (r >= 1) {
            if (_.interval.end = N = 1, u = _, r > 1) {
              let O = {
                x: _.x + _.r * Qn(_.e),
                y: _.y + _.r * Jn(_.e)
              };
              _.e += S.angle({ x: _.x, y: _.y }, O, this.get(1));
            }
            break;
          }
          r = r + (r - n) / 2;
        } else
          r = d;
      while (!f && h++ < 100);
      if (h >= 100)
        break;
      u = u || _, i.push(u), n = N;
    } while (r < 1);
    return i;
  }
}
class cs extends Float32Array {
  /**
   * Creates new Vector4 from 4 number components or copies values from a single vec4-like object
   * @param  {number | Vector4 | vec4 | object} x  x component or vec4-like object
   * @param  {number} [y]  y component
   * @param  {number} [z]  z component
   * @param  {number} [w]  w component
   */
  constructor(e, i, n, r) {
    super(4), typeof e == "number" && typeof i == "number" && typeof n == "number" && typeof r == "number" ? ni(this, e, i, n, r) : this.copy(e);
  }
  /**
   * Copies values from the vec4-like object
   * @param  {Vector4 | vec4 | object} val
   */
  copy(e) {
    if (q(e))
      return;
    let i = Y(e[0]) ? e[0] : e.x;
    q(i) && (i = e.r);
    let n = Y(e[1]) ? e[1] : e.y;
    q(n) && (n = e.g);
    let r = Y(e[2]) ? e[2] : e.z;
    q(r) && (r = Y(e.b) ? e.b : e.width);
    let h = Y(e[3]) ? e[3] : e.w;
    q(h) && (h = Y(e.a) ? e.a : e.height), ct(i) && ct(n) && ct(r) && ct(h) && ni(this, i, n, r, h);
  }
  /**
   * Checks if this Vector4 is equal (has same corresponding component values) to anothe vec4-like object
   * @param {Vector4 | vec4 | object} val     vec4-like object
   * @param {number} epsilon                  precision; default is 0.0001
   * @returns {boolean}                        true if vectors are equal; false othewise
   */
  eq(e, i = Ft) {
    if (q(e))
      return !1;
    let n = Y(e[0]) ? e[0] : e.x;
    q(n) && (n = e.r);
    let r = Y(e[1]) ? e[1] : e.y;
    q(r) && (r = e.g);
    let h = Y(e[2]) ? e[2] : e.z;
    q(h) && (h = Y(e.b) ? e.b : e.width);
    let o = Y(e[3]) ? e[3] : e.w;
    return q(o) && (o = Y(e.a) ? e.a : e.height), vn(this, [n, r, h, o], i);
  }
  get x() {
    return this[0];
  }
  set x(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to x component of Vector4");
    this[0] = e;
  }
  get y() {
    return this[1];
  }
  set y(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to y component of Vector4");
    this[1] = e;
  }
  get z() {
    return this[2];
  }
  set z(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to z component of Vector4");
    this[2] = e;
  }
  get w() {
    return this[3];
  }
  set w(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to w component of Vector4");
    this[3] = e;
  }
  get r() {
    return this[0];
  }
  set r(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to r component of Vector4");
    this[0] = e;
  }
  get g() {
    return this[1];
  }
  set g(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to g component of Vector4");
    this[1] = e;
  }
  get b() {
    return this[2];
  }
  set b(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to b component of Vector4");
    this[2] = e;
  }
  get a() {
    return this[3];
  }
  set a(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to a component of Vector4");
    this[3] = e;
  }
  get width() {
    return this[2];
  }
  set width(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to width component of Vector4");
    this[2] = e;
  }
  get height() {
    return this[3];
  }
  set height(e) {
    if (isNaN(e))
      throw new Error("Trying to assign NaN to height component of Vector4");
    this[3] = e;
  }
}
cs.ZERO = new cs(0, 0, 0, 0);
cs.ONE = new cs(1, 1, 1, 1);
var er = { exports: {} };
(function(s) {
  var e = Object.prototype.hasOwnProperty, i = "~";
  function n() {
  }
  Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (i = !1));
  function r(a, _, u) {
    this.fn = a, this.context = _, this.once = u || !1;
  }
  function h(a, _, u, E, l) {
    if (typeof u != "function")
      throw new TypeError("The listener must be a function");
    var f = new r(u, E || a, l), d = i ? i + _ : _;
    return a._events[d] ? a._events[d].fn ? a._events[d] = [a._events[d], f] : a._events[d].push(f) : (a._events[d] = f, a._eventsCount++), a;
  }
  function o(a, _) {
    --a._eventsCount === 0 ? a._events = new n() : delete a._events[_];
  }
  function c() {
    this._events = new n(), this._eventsCount = 0;
  }
  c.prototype.eventNames = function() {
    var _ = [], u, E;
    if (this._eventsCount === 0) return _;
    for (E in u = this._events)
      e.call(u, E) && _.push(i ? E.slice(1) : E);
    return Object.getOwnPropertySymbols ? _.concat(Object.getOwnPropertySymbols(u)) : _;
  }, c.prototype.listeners = function(_) {
    var u = i ? i + _ : _, E = this._events[u];
    if (!E) return [];
    if (E.fn) return [E.fn];
    for (var l = 0, f = E.length, d = new Array(f); l < f; l++)
      d[l] = E[l].fn;
    return d;
  }, c.prototype.listenerCount = function(_) {
    var u = i ? i + _ : _, E = this._events[u];
    return E ? E.fn ? 1 : E.length : 0;
  }, c.prototype.emit = function(_, u, E, l, f, d) {
    var N = i ? i + _ : _;
    if (!this._events[N]) return !1;
    var T = this._events[N], O = arguments.length, A, g;
    if (T.fn) {
      switch (T.once && this.removeListener(_, T.fn, void 0, !0), O) {
        case 1:
          return T.fn.call(T.context), !0;
        case 2:
          return T.fn.call(T.context, u), !0;
        case 3:
          return T.fn.call(T.context, u, E), !0;
        case 4:
          return T.fn.call(T.context, u, E, l), !0;
        case 5:
          return T.fn.call(T.context, u, E, l, f), !0;
        case 6:
          return T.fn.call(T.context, u, E, l, f, d), !0;
      }
      for (g = 1, A = new Array(O - 1); g < O; g++)
        A[g - 1] = arguments[g];
      T.fn.apply(T.context, A);
    } else {
      var R = T.length, I;
      for (g = 0; g < R; g++)
        switch (T[g].once && this.removeListener(_, T[g].fn, void 0, !0), O) {
          case 1:
            T[g].fn.call(T[g].context);
            break;
          case 2:
            T[g].fn.call(T[g].context, u);
            break;
          case 3:
            T[g].fn.call(T[g].context, u, E);
            break;
          case 4:
            T[g].fn.call(T[g].context, u, E, l);
            break;
          default:
            if (!A) for (I = 1, A = new Array(O - 1); I < O; I++)
              A[I - 1] = arguments[I];
            T[g].fn.apply(T[g].context, A);
        }
    }
    return !0;
  }, c.prototype.on = function(_, u, E) {
    return h(this, _, u, E, !1);
  }, c.prototype.once = function(_, u, E) {
    return h(this, _, u, E, !0);
  }, c.prototype.removeListener = function(_, u, E, l) {
    var f = i ? i + _ : _;
    if (!this._events[f]) return this;
    if (!u)
      return o(this, f), this;
    var d = this._events[f];
    if (d.fn)
      d.fn === u && (!l || d.once) && (!E || d.context === E) && o(this, f);
    else {
      for (var N = 0, T = [], O = d.length; N < O; N++)
        (d[N].fn !== u || l && !d[N].once || E && d[N].context !== E) && T.push(d[N]);
      T.length ? this._events[f] = T.length === 1 ? T[0] : T : o(this, f);
    }
    return this;
  }, c.prototype.removeAllListeners = function(_) {
    var u;
    return _ ? (u = i ? i + _ : _, this._events[u] && o(this, u)) : (this._events = new n(), this._eventsCount = 0), this;
  }, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = i, c.EventEmitter = c, s.exports = c;
})(er);
const ir = ["before", "after", "index", "toIndex", "fromIndex"];
let nr = class {
  constructor(e) {
    let i;
    for (i of ir)
      i in e && (this[i] = e[i]);
  }
};
class Rs extends Map {
  constructor(e) {
    super(e), this.type = Ut.PROPERTY;
  }
  update(e, i) {
    if (!(i instanceof nr))
      throw Error("Expect class: Change");
    if (this.has(e)) {
      const n = this.get(e);
      i.before = n.before;
    }
    return this.set(e, i);
  }
  isEmpty() {
    return this.size === 0;
  }
}
class rr {
  constructor({ CREATE: e, UPDATE: i, DELETE: n } = {}) {
    this.type = Ut.ENTITY, this.CREATE = new Set(e), this.UPDATE = new Map(i), this.UPDATE.forEach((r, h) => {
      this.UPDATE.set(h, new Rs(r));
    }), this.DELETE = new Set(n);
  }
  create(e) {
    for (const i of e)
      this.CREATE.add(i), this.DELETE.delete(i);
  }
  update(e, i, n) {
    this.DELETE.delete(e), this.UPDATE.has(e) || this.UPDATE.set(e, new Rs()), this.UPDATE.get(e).update(i, n);
  }
  delete(e) {
    for (const i of e)
      this.CREATE.delete(i), this.DELETE.add(i);
  }
  removeFromCreate(e) {
    let i;
    for (i of e)
      this.CREATE.delete(i);
  }
  isEmpty() {
    return this.CREATE.size === 0 && this.DELETE.size === 0 && this.UPDATE.size === 0;
  }
  clear() {
    this.CREATE.clear(), this.UPDATE.clear(), this.DELETE.clear();
  }
}
Ut.PROPERTY + "", Ut.ENTITY + "";
const hr = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let or = (s = 21) => {
  let e = "", i = crypto.getRandomValues(new Uint8Array(s |= 0));
  for (; s--; )
    e += hr[i[s] & 63];
  return e;
};
const Ct = "default", ci = 0, Ls = "-", cr = [
  "el",
  // Element
  "bs",
  // Base
  "pc",
  // Property Component
  "im",
  // Interaction Manager component
  "ly",
  // Layer Component
  "ms",
  // Mesh component
  "tm",
  // Transition Manager component
  "ei"
  // Element Interaction
], ms = (s, e, i) => {
  if (s === Ct)
    return `${e}`;
  const n = [];
  return s && n.push(s), n.push(e), i && n.push(i), n.join(Ls);
}, ar = () => {
  const s = cr.reduce((e, i) => (e[i] = ms(i, ci), e), {});
  return s[Ct] = `${ci}`, s;
};
class _r {
  constructor() {
    this._counter = ar(), this.suffixKey = or(4);
  }
  getCurrentCount(e) {
    const i = this._getPrefixKey(e);
    return this._getNumber(i);
  }
  getIdBy(e) {
    const i = this._getPrefixKey(e);
    return this._counter[i];
  }
  create(e) {
    const i = this._getPrefixKey(e), n = this._getNumber(i);
    return this._counter[i] = ms(i, n + 1, this.suffixKey), this._counter[i];
  }
  load(e, i) {
    const n = this._getPrefixKey(i), r = this._getNumber(n), h = this._getNumber(n, e), o = Math.max(r, h);
    this._counter[n] = ms(n, o);
  }
  _getPrefixKey(e) {
    return this._counter[e] ? e : Ct;
  }
  _getNumber(e, i) {
    if (i && !this.isInCounter(i, e))
      return parseInt(this._counter[Ct]);
    const n = this._getPrefixKey(e), r = i || this._counter[n], h = isNaN(Number(r)) ? this._counter[Ct] : r, o = n === Ct ? h : r.split(Ls)[1];
    return parseInt(o);
  }
  isInCounter(e, i) {
    if (!e || typeof e != "string" && typeof e != "number")
      return !1;
    let n = e.toString();
    typeof e == "number" && (n = `${e}`);
    const r = this._getPrefixKey(i);
    let h = n;
    if (r !== Ct) {
      const o = n.split(Ls);
      if (o.length < 2 || o[0] !== r)
        return !1;
      h = o[1];
    }
    return !isNaN(Number(h));
  }
}
new _r();
new dt();
class Mt extends Float32Array {
  /**
   * Creates new Matrix2D from from 6 number components or copies values from a single mat2d-like object
   * @param  {number | Matrix2D | mat2d | object } a     a component or mat2d-like object
   * @param  {number} b   b component
   * @param  {number} c   c component
   * @param  {number} d   d component
   * @param  {number} tx  tx component
   * @param  {number} ty  ty component
   */
  constructor(e, i, n, r, h, o) {
    super(6), typeof e == "number" && typeof i == "number" && typeof n == "number" && typeof r == "number" && typeof h == "number" && typeof o == "number" ? (this[0] = e, this[1] = i, this[2] = n, this[3] = r, this[4] = h, this[5] = o) : e ? this.copy(e) : (this[0] = 1, this[3] = 1);
  }
  /**
   * Copies values from an array
   * @param  {number[]} array
   */
  fromArray(e) {
    q(e) || ii(this, ...e);
  }
  clone() {
    return new Mt(...this);
  }
  /**
   * Copies values from the mat2d-like object
   * @param  {Matrix2D | mat2d | object} val
   * @returns {Matrix2D} returns itself
   */
  copy(e) {
    if (q(e))
      return;
    const i = Y(e[0]) ? e[0] : e.a, n = Y(e[1]) ? e[1] : e.b, r = Y(e[2]) ? e[2] : e.c, h = Y(e[3]) ? e[3] : e.d, o = Y(e[4]) ? e[4] : e.tx, c = Y(e[5]) ? e[5] : e.ty;
    return ct(i) && ct(n) && ct(r) && ct(h) && ct(o) && ct(c) && ii(this, i, n, r, h, o, c), this;
  }
  /**
   * Checks if this Matrix2D is equal (has same corresponding component values) to another mat2d-like object
   * @param {Matrix2D | mat2d | object} val     mat2d-like object
   * @param {number} epsilon                    precision; default is 0.0001
   * @returns {boolean}                        true if vectors are equal; false othewise
   */
  eq(e, i = Ft) {
    if (q(e))
      return !1;
    const n = [
      Y(e[0]) ? e[0] : e.a,
      Y(e[1]) ? e[1] : e.b,
      Y(e[2]) ? e[2] : e.c,
      Y(e[3]) ? e[3] : e.d,
      Y(e[4]) ? e[4] : e.tx,
      Y(e[5]) ? e[5] : e.ty
    ];
    return Yn(this, n, i);
  }
  /**
   * Creates new basis transform matrix (leaving out translation)
   * @returns {Matrix2D}   new Matrix2D
   */
  basis() {
    return zn(new Mt(), this);
  }
  get a() {
    return this[0];
  }
  set a(e) {
    this[0] = e;
  }
  get b() {
    return this[1];
  }
  set b(e) {
    this[1] = e;
  }
  get c() {
    return this[2];
  }
  set c(e) {
    this[2] = e;
  }
  get d() {
    return this[3];
  }
  set d(e) {
    this[3] = e;
  }
  get tx() {
    return this[4];
  }
  set tx(e) {
    this[4] = e;
  }
  get ty() {
    return this[5];
  }
  set ty(e) {
    this[5] = e;
  }
  save() {
    return [
      this[0],
      this[1],
      this[2],
      this[3],
      this[4],
      this[5]
    ];
  }
}
Mt.IDENTITY = new Mt();
Mt.ZERO = new Mt(0, 0, 0, 0, 0, 0);
new dt();
new dt(), new dt();
Is.FROM_DRAG_DUPLICATE;
const Tt = {
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} [esp=0.0001]
   * @returns {boolean}
   */
  Equal(s, e, i = 1e-4) {
    return Math.abs(s - e) < i;
  },
  /**
   * @param {number} v
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  clamp(s, e, i) {
    return s > i ? i : s < e ? e : s;
  },
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} t
   * @returns {number}
   */
  lerp(s, e, i) {
    return s * (1 - i) + e * i;
  },
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} t
   * @returns {number}
   */
  lerp_angle(s, e, i) {
    const n = (e - s) % (Math.PI * 2), r = n * 2 % (Math.PI * 2) - n;
    return s + r * i;
  },
  /**
   * @param {number} value
   * @returns {boolean}
   */
  IsPowerOf2(s) {
    return (s & s - 1) === 0;
  },
  /**
   * @param {number} value
   * @returns {number}
   */
  NearestPowerOf2(s) {
    if (s === 0) return 0;
    let e = s;
    return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e + 1;
  },
  /**
   * @param {number} value
   * @param {number} istart
   * @param {number} istop
   * @param {number} ostart
   * @param {number} ostop
   * @returns {number}
   */
  map(s, e, i, n, r) {
    return n + (r - n) * ((s - e) / (i - e));
  }
}, ai = 1e-5, Bi = 1e-8;
function L(s = 0, e = 0) {
  this.x = s, this.y = e, this._array = null;
}
L.isOrthogonal = (s, e, i, n) => Math.abs(s * i + e * n) <= Math.sqrt((s * s + e * e) * (i * i + n * n)) * Bi;
L.isCollinear = (s, e, i, n) => (
  // NOTE: We use normalized vectors so that the epsilon comparison is
  // reliable. We could instead scale the epsilon based on the vector
  // length. But instead of normalizing the vectors before calculating
  // the cross product, we can scale the epsilon accordingly.
  Math.abs(s * n - e * i) <= Math.sqrt((s * s + e * e) * (i * i + n * n)) * Bi
);
L.getThirds = function(s, e) {
  const i = e.clone().subtract(s);
  return {
    oneThird: s.clone().add(i.clone().scale(1 / 3)),
    twoThirds: s.clone().add(i.clone().scale(2 / 3))
  };
};
L.prototype = {
  constructor: L,
  get width() {
    return this.x;
  },
  set width(s) {
    this.x = s;
  },
  /**
   * @param {number} value
   */
  set_width(s) {
    this.x = s;
  },
  get height() {
    return this.y;
  },
  set height(s) {
    this.y = s;
  },
  /**
   * @param {number} value
   */
  set_height(s) {
    this.y = s;
  },
  /**
   * @param {number} value
   */
  set_x(s) {
    this.x = s;
  },
  /**
   * @param {number} value
   */
  set_y(s) {
    this.y = s;
  },
  /**
   * @param {[number, number]} [out]
   * @returns {[number, number]}
   */
  as_array(s) {
    if (!s && !this._array)
      return this._array = [this.x, this.y], this._array;
    const e = s || this._array;
    return e[0] = this.x, e[1] = this.y, e;
  },
  /**
   * @param {number[]} arr
   * @returns {this}
   */
  fromArray(s) {
    return this.x = s[0], this.y = s[1], this;
  },
  /**
   * Sets the point to a new x and y position.
   * If y is omitted, both x and y will be set to x.
   *
   * @param {number} [x] - position of the point on the x axis
   * @param {number} [y] - position of the point on the y axis
   * @returns {this}
   */
  set(s = 0, e = 0) {
    return this.x = s, this.y = e, this;
  },
  /**
   * Copy value from other vector
   *
   * @param {Vector2Like} p_b
   * @returns {this}
   */
  copy(s) {
    return this.x = s.x, this.y = s.y, this;
  },
  /**
   * @param {Vector2Like} p_b
   * @param {number} t
   * @returns {this}
   */
  mix_with(s, e) {
    return this.x += (s.x - this.x) * e, this.y += (s.y - this.y) * e, this;
  },
  /**
   * Returns new Vector2 with same value.
   * @returns {Vector2}
   */
  clone() {
    return new L(this.x, this.y);
  },
  /**
   * Returns new Vector2 but normalized.
   * @returns {Vector2}
   */
  normalized() {
    return this.clone().normalize();
  },
  /**
   * Returns new Vector2 but clamped.
   * @param {number} p_length
   * @returns {Vector2}
   */
  clamped(s) {
    const e = this.length(), i = this.clone();
    return e > 0 && s < e && i.scale(s / e), i;
  },
  /**
   * Returns new Vector2 but rotated.
   *
   * @param {number} p_rotation
   * @returns {Vector2}
   */
  rotated(s) {
    return this.clone().rotate(s);
  },
  /**
   * Whether this equals to another point
   * @param {Vector2Like} p_b
   * @returns {boolean}
   */
  equals(s) {
    const e = this.x, i = this.y, n = s.x, r = s.y;
    return Math.abs(e - n) <= ai * Math.max(1, Math.abs(e), Math.abs(n)) && Math.abs(i - r) <= ai * Math.max(1, Math.abs(i), Math.abs(r));
  },
  /**
   * Whether this equals to another point(precisely)
   * @param {Vector2Like} p_b
   * @returns {boolean}
   */
  exact_equals(s) {
    return this.x === s.x && this.y === s.y;
  },
  /**
   * Add the vector by another vector or number.
   * @param {number | Vector2Like} x
   * @param {number} [y]
   * @returns {this}
   */
  add(s, e) {
    return e === void 0 ? (this.x += s.x, this.y += s.y) : (this.x += s, this.y += e), this;
  },
  /**
   * Subtract the vector by another vector or number.
   * @param {number | Vector2Like} x
   * @param {number} [y]
   * @returns {this}
   */
  subtract(s, e) {
    return e === void 0 ? (this.x -= s.x, this.y -= s.y) : (this.x -= s, this.y -= e), this;
  },
  /**
   * Subtract the vector by another vector or number.
   * @param {number | Vector2Like} x
   * @param {number} [y]
   * @returns {this}
   */
  sub(s, e) {
    return e === void 0 ? (this.x -= s.x, this.y -= s.y) : (this.x -= s, this.y -= e), this;
  },
  /**
   * Multiply the vector by another vector or number.
   * @param {number | Vector2Like} x
   * @param {number} [y]
   * @returns {this}
   */
  multiply(s, e) {
    return e === void 0 ? (this.x *= s.x, this.y *= s.y) : (this.x *= s, this.y *= e), this;
  },
  /**
   * Divide x and y by another vector or number.
   * @param {number | Vector2Like} x
   * @param {number} [y]
   * @returns {this}
   */
  divide(s, e) {
    return e === void 0 ? (this.x /= s.x, this.y /= s.y) : (this.x /= s, this.y /= e), this;
  },
  /**
   * Dot multiply another vector.
   * @param {Vector2Like} p_b
   * @returns {number}
   */
  dot(s) {
    return this.x * s.x + this.y * s.y;
  },
  /**
   * Cross multiply another vector.
   * @param {Vector2Like} p_b
   * @returns {number}
   */
  cross(s) {
    return this.x * s.y - this.y * s.x;
  },
  /**
   * Change x and y components to their absolute values.
   * @returns {this}
   */
  abs() {
    return this.x = Math.abs(this.x), this.y = Math.abs(this.y), this;
  },
  /**
   * Change x and y components to their sign values.
   * @returns {this}
   */
  sign() {
    return this.x = Math.sign(this.x), this.y = Math.sign(this.y), this;
  },
  /**
   * Ceil x and y components.
   * @returns {this}
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  },
  /**
   * Floor x and y components.
   * @returns {this}
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  },
  /**
   * Round to int vector.
   * @returns {this}
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  },
  /**
   * Truncate to int vector.
   * @returns {this}
   */
  trunc() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  },
  /**
   * Clamp the vector to specific length.
   * @param {number} p_length
   * @returns {this}
   */
  clamp(s) {
    const e = this.length();
    return e > 0 && s < e && this.scale(s / e), this;
  },
  /**
   * Scale the vector by a number factor.
   * @param {number} p_factor
   * @returns {this}
   */
  scale(s) {
    return this.x *= s, this.y *= s, this;
  },
  /**
   * Scale the vector by a number factor.
   * @param {number} scale
   * @param {Vector2} center
   * @returns {this}
   */
  scale_with_center(s, e) {
    return this.sub(e).scale(s).add(e), this;
  },
  /**
   * Negate x and y components.
   * @returns {this}
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  },
  /**
   * Inverse the x and y components.
   * @returns {this}
   */
  inverse() {
    return this.x = 1 / this.x, this.y = 1 / this.y, this;
  },
  /**
   * Swap the x and y components.
   * @returns {this}
   */
  swap() {
    const s = this.x;
    return this.x = this.y, this.y = s, this;
  },
  /**
   * Normalize this vector to unit length.
   * @returns {this}
   */
  normalize() {
    const s = this.x, e = this.y;
    let i = s * s + e * e;
    return i > 0 && (i = 1 / Math.sqrt(i), this.x *= i, this.y *= i), this;
  },
  /**
   * Rotates the vector by “phi” radians.
   * @param {number} p_rotation
   * @returns {this}
   */
  rotate(s) {
    const e = this.x, i = this.y, n = Math.cos(s), r = Math.sin(s);
    return this.x = e * n - i * r, this.y = e * r + i * n, this;
  },
  /**
   * Change this vector to be perpendicular to what it was before. (Effectively
   * roatates it 90 degrees in a clockwise direction with the Y axis pointing up)
   * @returns {this}
   */
  perp() {
    const s = this.x;
    return this.x = this.y, this.y = -s, this;
  },
  /**
   * Change this vector to be perpendicular to what it was before. (Effectively
   * roatates it 90 degrees in a ccw direction with the Y axis pointing up)
   * @returns {this}
   */
  perp_inv() {
    const s = this.x;
    return this.x = -this.y, this.y = s, this;
  },
  /**
   * Returns the normal vector of the line formed by `this` and `b`
   *
   * @param {Vector2} b
   * @returns {Vector2}
   */
  normal(s) {
    return s.clone().sub(this).normalize().perp();
  },
  /**
   * Returns the directional vector of the line formed by `this` and `b`
   *
   * @param {Vector2} b
   * @returns {Vector2}
   */
  direction(s) {
    return s.clone().sub(this).normalize();
  },
  /**
   * Returns new Vector2.
   * @param {number} p_d
   * @param {Vector2} p_vec
   * @returns {Vector2}
   */
  plane_project(s, e) {
    const i = this.clone();
    return e.clone().subtract(i.scale(this.dot(e) - s));
  },
  /**
   * Project to a vector.
   * @param {Vector2} p_b
   * @returns {this}
   */
  project(s) {
    const e = this.dot(s) / s.length_squared();
    return this.x = e * s.x, this.y = e * s.y, this;
  },
  /**
   * Project to a vector which is already normalized.
   * @param {Vector2Like} p_b
   * @returns {this}
   */
  project_n(s) {
    const e = this.dot(s);
    return this.x = e * s.x, this.y = e * s.y, this;
  },
  /**
   * Reflects the vector along the given plane, specified by its normal vector.
   * @param {Vector2Like} axis
   * @returns {this}
   */
  reflect(s) {
    const e = this.dot(s);
    return this.x = 2 * s.x * e - this.x, this.y = 2 * s.y * e - this.y, this;
  },
  /**
   * Bounce returns the vector “bounced off” from the given plane, specified by its normal vector.
   * @param {Vector2Like} normal
   * @returns {this}
   */
  bounce(s) {
    return this.reflect(s).negate();
  },
  /**
   * Slide returns the component of the vector along the given plane, specified by its normal vector.
   * @param {Vector2Like} normal
   * @returns {this}
   */
  slide(s) {
    return this.subtract(ur.copy(s).scale(this.dot(s)));
  },
  /**
   * Returns the length of the vector.
   * @returns {number}
   */
  length() {
    const s = this.x, e = this.y;
    return Math.sqrt(s * s + e * e);
  },
  /**
   * Returns the squared length of the vector. Prefer this function
   * over “length” if you need to sort vectors or need the squared length for some formula.
   * @returns {number}
   */
  length_squared() {
    const s = this.x, e = this.y;
    return s * s + e * e;
  },
  /**
   * Returns the result of atan2 when called with the Vector’s x and y as parameters (Math::atan2(x,y)).
   * @returns {number} [-PI, PI]
   */
  angle() {
    return Math.atan2(this.y, this.x);
  },
  /**
   * Returns the angle in radians between the two vectors.
   * @param {Vector2Like} p_b
   * @returns {number} [-PI, PI]
   */
  angle_to(s) {
    return Math.atan2(this.cross(s), this.dot(s));
  },
  /**
   * Returns the angle in radians between the two vectors.
   * @param {Vector2Like} p_b
   * @returns {number} [0, 2PI]
   */
  angle_to_2(s) {
    let e = this.angle_to(s);
    return e < 0 && (e += 2 * Math.PI), e;
  },
  /**
   * Returns the ccw angle in radians between the two vectors.
   * @param {Vector2Like} p_b
   * @returns {number} [0, 2PI]
   */
  angle_to_ccw(s) {
    let e = Math.atan2(this.y, this.x) - Math.atan2(s.y, s.x);
    return e < 0 && (e += 2 * Math.PI), e;
  },
  /**
   * @param {Vector2Like} p_b
   * @returns {number}
   */
  angle_to_point(s) {
    return Math.atan2(this.y - s.y, this.x - s.x);
  },
  /**
   * Returns the distance to vector “b”.
   * @param {Vector2Like} p_b
   * @returns {number}
   */
  distance_to(s) {
    const e = s.x - this.x, i = s.y - this.y;
    return Math.sqrt(e * e + i * i);
  },
  /**
   * Returns the squared distance to vector “b”. Prefer this function
   * over “distance_to” if you need to sort vectors or need the squared distance for some formula.
   * @param {Vector2Like} p_b
   * @returns {number}
   */
  distance_squared_to(s) {
    const e = s.x - this.x, i = s.y - this.y;
    return e * e + i * i;
  },
  /**
   * Returns a perpendicular vector.
   * @param {Vector2} [r_out]
   * @returns {Vector2}
   */
  tangent(s = new L()) {
    return s.set(this.y, -this.x);
  },
  aspect() {
    return this.x / this.y;
  },
  is_zero(s = null) {
    return s ? _i(this.x, s) && _i(this.y, s) : this.x === 0 && this.y === 0;
  },
  /**
   * @param {Vector2} point
   * @returns {boolean}
   */
  isOrthogonal(s) {
    return L.isOrthogonal(this.x, this.y, s.x, s.y);
  },
  // /**
  //  * @param {number} x1
  //  * @param {number} y1
  //  * @param {number} x2
  //  * @param {number} y2
  //  */
  // static isOrthogonal(x1, y1, x2, y2) {
  //     return Math.abs(x1 * x2 + y1 * y2)
  //             <= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
  //                 * TRIGONOMETRIC_EPSILON
  // }
  /**
   * Checks if this vector is collinear (parallel) to another vector.
   *
   * @param {Vector2} vec the vector to check against
   * @returns {boolean}
   */
  isCollinear(s) {
    return L.isCollinear(this.x, this.y, s.x, s.y);
  },
  /**
   * @param {Vector2Like} p_b
   * @param {number} p_t
   * @returns {this}
   */
  linear_interpolate(s, e) {
    return this.x += e * (s.x - this.x), this.y += e * (s.y - this.y), this;
  },
  /**
   * Returns new Vector2.
   * @param {Vector2Like} p_b
   * @param {Vector2Like} p_pre_a
   * @param {Vector2Like} p_post_b
   * @param {number} p_t
   * @returns {Vector2}
   */
  cubic_interpolate(s, e, i, n) {
    const r = n * n, h = r * n;
    return new L(
      0.5 * (this.x * 2 + (-e.x + s.x) * n + (2 * e.x - 5 * this.x + 4 * s.x - i.x) * r + (-e.x + 3 * this.x - 3 * s.x + i.x) * h),
      0.5 * (this.y * 2 + (-e.y + s.y) * n + (2 * e.y - 5 * this.y + 4 * s.y - i.y) * r + (-e.y + 3 * this.y - 3 * s.y + i.y) * h)
    );
  },
  /**
   * @returns {boolean}
   */
  valid() {
    return !isNaN(this.x) && !isNaN(this.y);
  },
  /**
   * Checks if the point is within a given distance of another point.
   * @param {Vector2} point the point to check against
   * @param {number} tolerance the maximum distance allowed
   * @returns {boolean} {@true if it is within the given distance}
   */
  isClose(s, e) {
    return this.getDistance(s) <= e;
  },
  /**
   * Returns the distance between the point and another point.
   * @param {Vector2} point
   * @param {boolean} [squared=false] Controls whether the distance should
   * remain squared, or its square root should be calculated
   * @returns {number}
   */
  getDistance(s, e = !1) {
    const i = s.x - this.x, n = s.y - this.y, r = i * i + n * n;
    return e ? r : Math.sqrt(r);
  },
  /**
   * @param {Rect2} rect
   * @returns {boolean}
   */
  isInside(s) {
    return s.contains(this.x, this.y);
  },
  /**
   * @param {Vector2} v1
   * @returns {number}
   */
  angleToPoint(s) {
    return Math.atan2(this.y - s.y, this.x - s.x);
  },
  /**
   * @param {Vector2} v1
   * @returns {number}
   */
  distance(s) {
    return Math.hypot(this.x - s.x, this.y - s.y);
  }
};
const _i = (s, e) => s >= -e && s <= e;
L.ZERO = Object.freeze(new L(0, 0));
L.ONE = Object.freeze(new L(1, 1));
L.INF = Object.freeze(new L(1 / 0, 1 / 0));
L.LEFT = Object.freeze(new L(-1, 0));
L.RIGHT = Object.freeze(new L(1, 0));
L.UP = Object.freeze(new L(0, -1));
L.DOWN = Object.freeze(new L(0, 1));
const ur = new L(), Er = 1e-5, W = {
  M: 1,
  L: 2,
  Q: 3,
  C: 4,
  Z: 5
}, lr = {
  [W.M]: 2,
  [W.L]: 2,
  [W.Q]: 4,
  [W.C]: 6
};
class Gs {
  /**
   * @param {number[]} verticies
   * @param {Command[]} commands
   */
  constructor(e = [], i = []) {
    this.vertices = e, this.commands = i, this.metadata = {}, this.cornerRadiusOverrides = {}, this.hasOpenOrNetworkSubaths = !1;
  }
  toSVGPathString() {
    let e = "", i = 0;
    for (let n = 0; n < this.commands.length; ++n)
      switch (this.commands[n]) {
        case 1: {
          const r = this.vertices[i++], h = this.vertices[i++];
          e += `M${r} ${h}`;
          break;
        }
        case 2: {
          const r = this.vertices[i++], h = this.vertices[i++];
          e += `L${r} ${h}`;
          break;
        }
        case 3: {
          const r = this.vertices[i++], h = this.vertices[i++], o = this.vertices[i++], c = this.vertices[i++];
          e += `Q${r} ${h} ${o} ${c}`;
          break;
        }
        case 4: {
          const r = this.vertices[i++], h = this.vertices[i++], o = this.vertices[i++], c = this.vertices[i++], a = this.vertices[i++], _ = this.vertices[i++];
          e += `C${r} ${h} ${o} ${c} ${a} ${_}`;
          break;
        }
        case 5: {
          e += "Z";
          break;
        }
      }
    return e;
  }
  /**
   * @param {number} subpathStartIndex
   * @param {string} key
   * @param {any} value
   */
  attachMetadata(e, i, n) {
    this.metadata[e] || (this.metadata[e] = {}), this.metadata[e][i] = n;
  }
  *iter() {
    const e = this.getSubpathBoundaries();
    for (let i = 0; i < e.length - 1; i++) {
      const n = e[i][0], r = e[i + 1][0], h = e[i][1], o = e[i + 1][1];
      yield new fr(this, n, r, h, o);
    }
  }
  /**
   * First number is an index in the commands array
   *
   * Second number is an index in the vertices array
   *
   * @returns {[number, number][]}
   */
  getSubpathBoundaries() {
    const e = [];
    let i = 0;
    for (let n = 0; n < this.commands.length; n++) {
      const r = this.commands[n];
      r === W.M && e.push([n, i]), i += lr[r];
    }
    return e.push([this.commands.length, this.vertices.length]), e;
  }
  reverseSubpaths() {
    const e = this.getSubpathBoundaries();
    for (let i = 0; i < e.length - 1; i++) {
      const n = e[i][0], r = e[i + 1][0];
      for (let h = 1; h < Math.ceil((r - n) / 2); h++) {
        const o = this.commands[n + h];
        this.commands[n + h] = this.commands[r - h], this.commands[r - h] = o;
      }
    }
    for (let i = 0; i < e.length - 1; i++) {
      const n = e[i][1], r = e[i + 1][1] - 1, h = r - n + 1;
      for (let o = 0; o < Math.floor(h / 4); o++) {
        const c = o * 2, a = n + c, _ = n + c + 1, u = r - c - 1, E = r - c, l = this.vertices[a], f = this.vertices[_];
        this.vertices[a] = this.vertices[u], this.vertices[_] = this.vertices[E], this.vertices[u] = l, this.vertices[E] = f;
      }
    }
  }
  /**
   * @param {number} startCmdI
   * @param {number} startVerI
   * @param {number} lastCmdI
   * @param {number} lastVerI
   */
  connectFirstAndLastSubpaths(e, i, n, r) {
    this.vertices.pop(), this.vertices.pop();
    const h = this.commands.slice(n), o = this.vertices.slice(r);
    for (let c = n - 1; c >= e; c--)
      this.commands[c + h.length - 1] = this.commands[c];
    for (let c = r - 1; c >= i; c--)
      this.vertices[c + o.length] = this.vertices[c];
    for (let c = 0; c < h.length; c++)
      this.commands[e + c] = h[c];
    for (let c = 0; c < o.length; c++)
      this.vertices[i + c] = o[c];
    this.commands.pop();
  }
  clear() {
    this.commands.length = 0, this.vertices.length = 0;
  }
  applyXorm(e) {
    const i = new Gs();
    i.commands = this.commands, i.vertices = [];
    const n = new L(), r = new L();
    for (let h = 0; h < this.vertices.length / 2; h++)
      e.xform(n.set(this.vertices[h * 2], this.vertices[h * 2 + 1]), r), i.vertices.push(r.x, r.y);
    return i;
  }
  get debugString() {
    let e = "";
    e += `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
`, e += `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
`, e += `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
`;
    let i = 0;
    for (let n = 0; n < this.commands.length; ++n)
      switch (this.commands[n]) {
        case 1:
          {
            const r = this.vertices[i++], h = this.vertices[i++];
            n !== 0 && (e += `" stroke="black" style="fill:none"/>
`), e += `<path d="M${r} ${h} `;
          }
          break;
        case 2:
          {
            const r = this.vertices[i++], h = this.vertices[i++];
            e += `L ${r} ${h} `;
          }
          break;
        case 3:
          {
            const r = this.vertices[i++], h = this.vertices[i++], o = this.vertices[i++], c = this.vertices[i++];
            e += `Q ${r} ${h} ${o} ${c} `;
          }
          break;
        case 4:
          {
            const r = this.vertices[i++], h = this.vertices[i++], o = this.vertices[i++], c = this.vertices[i++], a = this.vertices[i++], _ = this.vertices[i++];
            e += `C ${r} ${h} ${o} ${c} ${a} ${_} `;
          }
          break;
      }
    return e += `" stroke="black" style="fill:none"/>
`, e += "</svg>", e;
  }
}
class fr {
  /**
   * @param {PathData} path
   * @param {number} cmdS
   * @param {number} cmdE
   * @param {number} verS
   * @param {number} verE
   */
  constructor(e, i, n, r, h) {
    this.path = e, this.cmdS = i, this.cmdE = n, this.verS = r, this.verE = h, this.isClosed = this._isClosed(), this.metadata = e.metadata[i] || {}, this.isEnd0Cap = this.metadata.isEnd0Cap === void 0 ? !0 : this.metadata.isEnd0Cap, this.isEnd1Cap = this.metadata.isEnd1Cap === void 0 ? !0 : this.metadata.isEnd1Cap;
  }
  get hasCurves() {
    for (let e = this.cmdS + 1; e < this.cmdE; e++)
      if (this.path.commands[e] !== W.L) return !0;
    return !1;
  }
  /** @returns {Part} */
  first() {
    const e = this.path.commands[this.cmdS + 1], i = e === W.Q || e === W.C;
    let n = this.verS;
    const r = this.path.vertices[n++], h = this.path.vertices[n++];
    let o, c, a, _;
    i && (o = this.path.vertices[n++], c = this.path.vertices[n++]), e === W.C && (a = this.path.vertices[n++], _ = this.path.vertices[n++]);
    const u = this.path.vertices[n++], E = this.path.vertices[n];
    return new Ns(
      e,
      r,
      h,
      o,
      c,
      a,
      _,
      u,
      E,
      !0,
      this.cmdS + 1 === this.cmdE - 1,
      this.path.cornerRadiusOverrides[this.verS],
      this.path.cornerRadiusOverrides[n - 1]
    );
  }
  /** @returns {Part} */
  last() {
    const e = this.path.commands[this.cmdE - 1], i = e === W.Q || e === W.C;
    let n = this.verE - 1;
    const r = this.path.vertices[n--], h = this.path.vertices[n--];
    let o, c, a, _;
    e === W.C && (_ = this.path.vertices[n--], a = this.path.vertices[n--]), i && (c = this.path.vertices[n--], o = this.path.vertices[n--]);
    const u = this.path.vertices[n--], E = this.path.vertices[n];
    return new Ns(
      e,
      E,
      u,
      o,
      c,
      a,
      _,
      h,
      r,
      this.cmdS === this.cmdE - 1,
      !0,
      this.path.cornerRadiusOverrides[n],
      this.path.cornerRadiusOverrides[this.verE - 2]
    );
  }
  *iter() {
    let e = this.verS, i = this.path.vertices[e++], n = this.path.vertices[e++];
    for (let r = this.cmdS + 1; r < this.cmdE; r++) {
      if (e >= this.path.vertices.length) return;
      const h = this.path.commands[r], o = h === W.Q || h === W.C, c = this.path.cornerRadiusOverrides[e - 2], a = i, _ = n;
      let u, E, l, f;
      o && (u = this.path.vertices[e++], E = this.path.vertices[e++]), h === W.C && (l = this.path.vertices[e++], f = this.path.vertices[e++]);
      const d = this.path.cornerRadiusOverrides[e], N = this.path.vertices[e++], T = this.path.vertices[e++];
      i = N, n = T, yield new Ns(
        h,
        a,
        _,
        u,
        E,
        l,
        f,
        N,
        T,
        r === this.cmdS + 1,
        r === this.cmdE - 1,
        c,
        d
      );
    }
  }
  /** @param {ForEachFn} fn */
  forEach(e) {
    const i = this.iter(), n = i.next().value;
    let r = n, h = !0;
    for (const o of i)
      e(r, o, h, !this.isClosed && o.isLast), h = !1, r = o;
    this.isClosed && e(r, n, h, !0);
  }
  /** @returns {boolean} */
  _isClosed() {
    const e = this.path.vertices[this.verS], i = this.path.vertices[this.verS + 1], n = this.path.vertices[this.verE - 2], r = this.path.vertices[this.verE - 1];
    return Tt.Equal(e, n) && Tt.Equal(i, r);
  }
}
class Ns {
  /**
   * @param {Command} cmd
   * @param {number} x0
   * @param {number} y0
   * @param {number} x0c
   * @param {number} y0c
   * @param {number} x1c
   * @param {number} y1c
   * @param {number} x1
   * @param {number} y1
   * @param {boolean} isFirst
   * @param {boolean} isLast
   * @param {number} cornerRadiusOverride0
   * @param {number} cornerRadiusOverride1
   */
  constructor(e, i, n, r, h, o, c, a, _, u, E, l, f) {
    this.cmd = e, this.p0 = new L(i, n), this.cp0 = r !== void 0 && new L(r, h), this.cp1 = o !== void 0 && new L(o, c), this.p1 = new L(a, _), this.isFirst = u, this.isLast = E, this.isCurve = e === W.Q || e === W.C, this.cornerRadiusOverride0 = l, this.cornerRadiusOverride1 = f;
  }
  /** @returns {Vector2} a point that can be used to calculate the tangent at `p0` */
  get tan0() {
    return this.p0.equals(this.cp0) ? this.cmd === W.C ? this.cp1 : this.p1 : this.cp0;
  }
  /** @returns {Vector2} a point that can be used to calculate the tangent at `p1` */
  get tan1() {
    return this.cmd === W.C ? this.p1.equals(this.cp1) ? this.cp0 : this.cp1 : this.p1.equals(this.cp0) ? this.p0 : this.cp0;
  }
  bezier() {
    if (!this.isCurve) throw new Error("not a curve");
    if (this.cmd === W.C) {
      const e = this.p0.equals(this.cp0), i = this.p1.equals(this.cp1), n = e ? ui(this.p0, this.cp1) : this.cp0, r = i ? ui(this.p1, this.cp0) : this.cp1;
      return new B(this.p0.x, this.p0.y, n.x, n.y, r.x, r.y, this.p1.x, this.p1.y);
    } else
      return new B(this.p0.x, this.p0.y, this.cp0.x, this.cp0.y, this.p1.x, this.p1.y);
  }
  bezierData() {
    if (!this.isCurve) throw new Error("not a curve");
    return Tr(this.p0, this.cp0, this.cp1, this.p1);
  }
}
function Tr(s, e, i, n, r = 256) {
  const [h, o] = dr(s, e, i, n, r), c = (u) => Yi(u, s, e, i, n), a = (u) => {
    if (u <= 0) return 0;
    if (u >= o) return 1;
    for (let E = 0; E < r; E++)
      if (h[E] >= u) {
        const l = h[E], f = h[E + 1], d = (u - l) / (f - l);
        return (E + d) / r;
      }
    return 1;
  };
  return { length: o, getPointAt: (u) => c(a(u)), getTAt: a, getP: c };
}
function ui(s, e) {
  return e.clone().sub(s).normalize().scale(Er * 100).add(s);
}
const dr = (s, e, i, n, r = 256) => {
  const h = new Array(r + 1);
  h[0] = 0;
  let o = 0;
  const c = new L().copy(s);
  for (let a = 1; a <= r; a++) {
    const _ = Yi(a / r, s, e, i, n);
    o += _.distance_to(c), h[a] = o, c.copy(_);
  }
  return [h, o];
}, Ei = new L(), li = 1e-4;
function at(s = 0, e = 0, i = 0, n = 0) {
  this.x = s, this.y = e, this.width = i, this.height = n;
}
at.prototype = {
  constructor: at,
  /**
   * @param {number} p_x
   * @param {number} p_y
   * @param {number} p_width
   * @param {number} p_height
   * @returns {Rect2}
   */
  set(s = 0, e = 0, i = 0, n = 0) {
    return this.x = s, this.y = e, this.width = i, this.height = n, this;
  },
  /**
   * @param {Generator<Rect2>} generator
   * @returns {Rect2}
   */
  setFrom(s) {
    this.set(0, 0, 0, 0);
    const e = s.next().value;
    e && this.copy(e);
    for (const i of s)
      this.merge_with(i);
    return this;
  },
  get left() {
    return this.x;
  },
  get right() {
    return this.x + this.width;
  },
  get top() {
    return this.y;
  },
  get bottom() {
    return this.y + this.height;
  },
  get center() {
    return new L(this.x + this.width / 2, this.y + this.height / 2);
  },
  get topCenter() {
    return new L(this.x + this.width / 2, this.y);
  },
  get leftCenter() {
    return new L(this.x, this.y + this.height / 2);
  },
  get rightCenter() {
    return new L(this.x + this.width, this.y + this.height / 2);
  },
  get bottomCenter() {
    return new L(this.x + this.width / 2, this.y + this.height);
  },
  get topLeft() {
    return new L(this.x, this.y);
  },
  get topRight() {
    return new L(this.x + this.width, this.y);
  },
  get bottomLeft() {
    return new L(this.x, this.y + this.height);
  },
  get bottomRight() {
    return new L(this.x + this.width, this.y + this.height);
  },
  get w() {
    return this.width;
  },
  set w(s) {
    this.width = s;
  },
  get h() {
    return this.height;
  },
  set h(s) {
    this.height = s;
  },
  getCenter() {
    return new L(this.x + this.width * 0.5, this.y + this.height * 0.5);
  },
  clone() {
    return new at(this.x, this.y, this.width, this.height);
  },
  /**
   * Copies another rectangle to this one.
   * @param {Rect2} rectangle - The rectangle to copy.
   * @returns {Rect2}
   */
  copy(s) {
    return this.x = s.x, this.y = s.y, this.width = s.width, this.height = s.height, this;
  },
  is_zero() {
    return this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0;
  },
  /**
   * @param {Rect2} rect
   * @returns {boolean}
   */
  equals(s) {
    return this.x === s.x && this.y === s.y && this.width === s.width && this.height === s.height;
  },
  /**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   *
   * @param {number | Vector2Like} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @returns {boolean}
   */
  contains(s, e) {
    let i, n;
    return e === void 0 ? (i = s.x, n = s.y) : (i = s, n = e), this.width <= 0 || this.height <= 0 ? !1 : i >= this.x && i <= this.x + this.width && n >= this.y && n <= this.y + this.height;
  },
  /**
   * @param {Rect2} rect
   * @returns {boolean}
   */
  containsRect(s) {
    const e = s.x, i = s.y;
    return e >= this.x && i >= this.y && e + s.width <= this.x + this.width && i + s.height <= this.y + this.height;
  },
  has_no_area() {
    return this.width <= 0 || this.height <= 0;
  },
  has_near_zero_area() {
    return Math.abs(this.width) < li || Math.abs(this.height) < li;
  },
  /**
   * @param {Vector2Like} p_point
   * @returns {boolean}
   */
  has_point(s) {
    return !(s.x < this.x || s.y < this.y || s.x >= this.x + this.width || s.y >= this.y + this.height);
  },
  /**
   * @param {Vector2Like} p_point
   * @returns {boolean}
   */
  has_point_incl_edge(s) {
    return !(s.x < this.x || s.y < this.y || s.x > this.x + this.width || s.y > this.y + this.height);
  },
  get_area() {
    return this.width * this.height;
  },
  /**
   * Returns new Rect2 with absolute values.
   * @returns {Rect2}
   */
  abs() {
    return this.clone().abs_to();
  },
  /**
   * @returns {Rect2}
   */
  abs_to() {
    return this.x += Math.min(this.width, 0), this.y += Math.min(this.height, 0), this.width = Math.abs(this.width), this.height = Math.abs(this.height), this;
  },
  /**
   * Returns new Rect2.
   * @param {Rect2} rect
   * @returns {Rect2}
   */
  clip(s) {
    return this.clone().clip_by(s);
  },
  /**
   * @param {Rect2} rect
   * @returns {Rect2}
   */
  clip_by(s) {
    if (!this.intersects(s))
      return this.set(0, 0, 0, 0);
    const e = Math.max(s.x, this.x), i = Math.max(s.y, this.y), n = s.x + s.width, r = s.y + s.height, h = this.x + this.width, o = this.y + this.height;
    return this.x = e, this.y = i, this.width = Math.min(n, h) - e, this.height = Math.min(r, o) - i, this;
  },
  /**
   * @param {Rect2} rect
   * @returns {boolean}
   */
  encloses(s) {
    return s.x >= this.x && s.y >= this.y && s.x + s.width < this.x + this.width && s.y + s.height < this.y + this.height;
  },
  /**
   * Pads the rectangle making it grow in all directions.
   * Returns new Rect2.
   *
   * @param {number} p_by - The horizontal padding amount.
   * @returns {Rect2}
   */
  grow(s) {
    return this.clone().grow_to(s);
  },
  /**
   * Pads the rectangle making it grow in all directions.
   *
   * @param {number} p_by - The horizontal padding amount.
   * @returns {Rect2}
   */
  grow_to(s) {
    return this.x -= s, this.y -= s, this.width += s * 2, this.height += s * 2, this;
  },
  /**
   * @param {number} p_left
   * @param {number} p_top
   * @param {number} p_right
   * @param {number} p_bottom
   * @returns {Rect2}
   */
  grow_individual(s, e, i, n) {
    const r = this.clone();
    return r.x -= s, r.y -= e, r.width += s + i, r.height += e + n, r;
  },
  /**
   * Returns new Rect2.
   * @param {Vector2Like} p_vector
   * @returns {Rect2}
   */
  expand(s) {
    return this.clone().expand_to(s);
  },
  /**
   * Returns new Rect2.
   * @param {number} x
   * @param {number} y
   * @returns {Rect2}
   */
  expand_n(s, e) {
    return this.clone().expand_to(Ei.set(s, e));
  },
  /**
   * @param {Vector2Like} p_vector
   * @returns {Rect2}
   */
  expand_to(s) {
    const e = Nr.set(this.x, this.y), i = Or.set(this.x + this.width, this.y + this.height);
    return s.x < e.x && (e.x = s.x), s.y < e.y && (e.y = s.y), s.x > i.x && (i.x = s.x), s.y > i.y && (i.y = s.y), this.x = e.x, this.y = e.y, this.width = i.x - e.x, this.height = i.y - e.y, this;
  },
  /**
   * @param {number} x
   * @param {number} y
   * @returns {Rect2}
   */
  expand_to_n(s, e) {
    return this.expand_to(Ei.set(s, e));
  },
  /**
   * @param {number} x
   * @param {number} y
   * @returns {Rect2}
   */
  offset(s, e) {
    return this.x += s, this.y += e, this;
  },
  /**
   * Fits this rectangle around the passed one.
   *
   * @param {Rect2} p_rect - The rectangle to fit.
   * @returns {Rect2}
   */
  fit_to(s) {
    return this.x < s.x && (this.width += this.x, this.width < 0 && (this.width = 0), this.x = s.x), this.y < s.y && (this.height += this.y, this.height < 0 && (this.height = 0), this.y = s.y), this.x + this.width > s.x + s.width && (this.width = s.width - this.x, this.width < 0 && (this.width = 0)), this.y + this.height > s.y + s.height && (this.height = s.height - this.y, this.height < 0 && (this.height = 0)), this;
  },
  /**
   * Merge the given rectangle and return a new one.
   * Returns new Rect2.
   *
   * @param {Rect2} p_rect - The rectangle to merge.
   * @returns {Rect2}
   */
  merge(s) {
    return this.clone().merge_with(s);
  },
  /**
   * Merge this rectangle with the passed rectangle
   *
   * @param {Rect2} p_rect - The rectangle to merge.
   * @returns {Rect2}
   */
  merge_with(s) {
    const e = Math.min(this.x, s.x), i = Math.max(this.x + this.width, s.x + s.width), n = Math.min(this.y, s.y), r = Math.max(this.y + this.height, s.y + s.height);
    return this.x = e, this.width = i - e, this.y = n, this.height = r - n, this;
  },
  /**
   * @param {Rect2} rect
   * @param {number} eps
   * @returns {boolean}
   */
  intersects(s, e = 0) {
    return s.x + s.width > this.x - e && s.y + s.height > this.y - e && s.x < this.x + this.width + e && s.y < this.y + this.height + e;
  },
  /**
   * @param {Vector2} p_from
   * @param {Vector2} p_to
   * @param {Vector2} [r_pos]
   * @param {Vector2} [r_normal]
   * @returns {boolean}
   */
  intersects_segment(s, e, i, n) {
    let r = 0, h = 1, o = 0, c = 0;
    {
      const _ = s.x, u = e.x, E = this.x, l = E + this.width;
      let f = 0, d = 0, N = 0;
      if (_ < u) {
        if (_ > l || u < E)
          return !1;
        const T = u - _;
        f = _ < E ? (E - _) / T : 0, d = u > l ? (l - _) / T : 1, N = -1;
      } else {
        if (u > l || _ < E)
          return !1;
        const T = u - _;
        f = _ > l ? (l - _) / T : 0, d = u < E ? (E - _) / T : 1, N = 1;
      }
      if (f > r && (r = f, o = 0, c = N), d < h && (h = d), h < r)
        return !1;
    }
    {
      const _ = s.y, u = e.y, E = this.y, l = E + this.height;
      let f = 0, d = 0, N = 0;
      if (_ < u) {
        if (_ > l || u < E)
          return !1;
        const T = u - _;
        f = _ < E ? (E - _) / T : 0, d = u > l ? (l - _) / T : 1, N = -1;
      } else {
        if (u > l || _ < E)
          return !1;
        const T = u - _;
        f = _ > l ? (l - _) / T : 0, d = u < E ? (E - _) / T : 1, N = 1;
      }
      if (f > r && (r = f, o = 1, c = N), d < h && (h = d), h < r)
        return !1;
    }
    const a = e.clone().subtract(s);
    return n && (n.set(0, 0), o === 0 ? n.x = c : n.y = c), i && i.copy(s).add(a.scale(r)), !0;
  },
  /**
   * @param {Rect2} other
   * @param {number} eps
   * @returns {boolean}
   */
  overlaps(s, e = 0) {
    return !(this.actualBottom() <= s.actualTop() + e || this.actualTop() >= s.actualBottom() - e || this.actualLeft() >= s.actualRight() + e || this.actualRight() <= s.actualLeft() - e);
  },
  actualLeft() {
    return Math.min(this.x, this.x + this.w);
  },
  actualTop() {
    return Math.min(this.y, this.y + this.h);
  },
  actualRight() {
    return Math.max(this.x, this.x + this.w);
  },
  actualBottom() {
    return Math.max(this.y, this.y + this.h);
  },
  actualTopLeft() {
    return new L(this.actualLeft(), this.actualTop());
  },
  actualTopRight() {
    return new L(this.actualRight(), this.actualTop());
  },
  actualBottomLeft() {
    return new L(this.actualLeft(), this.actualBottom());
  },
  actualBottomRight() {
    return new L(this.actualRight(), this.actualBottom());
  },
  hash(s = 1e-5) {
    const e = 1 / s;
    return `${Math.round(this.x * e)}-${Math.round(this.y * e)}-${Math.round(this.width * e)}-${Math.round(this.height * e)}`;
  }
};
const Nr = new L(), Or = new L();
function it(s = 1, e = 0, i = 0, n = 1, r = 0, h = 0) {
  this.a = s, this.b = e, this.c = i, this.d = n, this.tx = r, this.ty = h, this._array = null;
}
it.prototype = {
  constructor: it,
  /**
   * returns new Vector2
   * @param {Vector2} [r_out]
   * @returns {Vector2}
   */
  get_origin(s = new L()) {
    return s.set(this.tx, this.ty);
  },
  /**
   * @param {Vector2Like} value
   * @returns {this}
   */
  set_origin(s) {
    return this.tx = s.x, this.ty = s.y, this;
  },
  /**
   * @param {number} x
   * @param {number} y
   * @returns {this}
   */
  set_origin_n(s, e) {
    return this.tx = s, this.ty = e, this;
  },
  get_rotation() {
    return Math.atan2(this.b, this.a);
  },
  /**
   * @param {number} value
   * @returns {this}
   */
  set_rotation(s) {
    const e = Math.cos(s), i = Math.sin(s);
    return this.a = e, this.b = i, this.c = -i, this.d = e, this;
  },
  /**
   * returns new Vector2
   * @param {Vector2} [r_out]
   * @returns {Vector2}
   */
  get_scale(s = new L()) {
    const e = Math.sign(this.a * this.d - this.b * this.c);
    return s.x = Math.sqrt(this.a * this.a + this.b * this.b), s.y = Math.sqrt(this.c * this.c + this.d * this.d) * e, s;
  },
  /**
   * @param {Vector2Like} scale
   * @returns {this}
   */
  set_scale(s) {
    const e = new L();
    return e.set(this.a, this.b).normalize(), this.a = e.x * s.x, this.b = e.y * s.x, e.set(this.c, this.d).normalize(), this.c = e.x * s.y, this.d = e.y * s.y, this;
  },
  /**
   * @param {number} x
   * @param {number} y
   * @returns {this}
   */
  set_scale_n(s, e) {
    const i = new L();
    return i.set(this.a, this.b).normalize(), this.a = i.x * s, this.b = i.y * s, i.set(this.c, this.d).normalize(), this.c = i.x * e, this.d = i.y * e, this;
  },
  /**
   * @param {number} p_rot
   * @param {Vector2Like} p_scale
   * @returns {this}
   */
  set_rotation_and_scale(s, e) {
    const i = Math.cos(s), n = Math.sin(s);
    return this.a = i * e.x, this.d = i * e.y, this.c = -n * e.y, this.b = n * e.x, this;
  },
  /**
   * @param {number} rot
   * @param {Vector2Like} pos
   * @returns {this}
   */
  set_rotation_and_origin(s, e) {
    const i = Math.cos(s), n = Math.sin(s);
    return this.a = i, this.b = n, this.c = -n, this.d = i, this.tx = e.x, this.ty = e.y, this;
  },
  get_skew() {
    const s = Lr, e = mr, i = this.basis_determinant();
    return Math.acos(
      s.set(this.a, this.b).normalize().dot(
        e.set(this.c, this.d).normalize().scale(Math.sign(i))
      )
    ) - Math.PI * 0.5;
  },
  /**
   * @param {number} p_angle
   * @returns {this}
   */
  set_skew(s) {
    const e = Cr, i = this.basis_determinant();
    return e.set(this.a, this.b).rotate(Math.PI * 0.5 + s).normalize().scale(Math.sign(i) * Math.hypot(this.c, this.d)), this.c = e.x, this.d = e.y, this;
  },
  /**
   * @param {number} p_rot
   * @param {Vector2Like} p_scale
   * @param {number} p_skew
   * @returns {this}
   */
  set_rotation_scale_and_skew(s, e, i) {
    return this.a = Math.cos(s) * e.x, this.d = Math.cos(s + i) * e.y, this.c = -Math.sin(s + i) * e.y, this.b = Math.sin(s) * e.x, this;
  },
  /**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   *
   * @param {number[]} array - The array that the matrix will be populated from.
   * @returns {this}
   */
  fromArray(s) {
    return this.a = s[0], this.b = s[1], this.c = s[2], this.d = s[3], this.tx = s[4], this.ty = s[5], this;
  },
  /**
   * @returns {this}
   */
  reset() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  },
  /**
   * sets the matrix properties
   *
   * @param {number} [a] - Matrix component
   * @param {number} [b] - Matrix component
   * @param {number} [c] - Matrix component
   * @param {number} [d] - Matrix component
   * @param {number} [tx] - Matrix component
   * @param {number} [ty] - Matrix component
   *
   * @returns {this}
   */
  set(s = 1, e = 0, i = 0, n = 1, r = 0, h = 0) {
    return this.a = s, this.b = e, this.c = i, this.d = n, this.tx = r, this.ty = h, this;
  },
  /**
   * Creates an array from the current Matrix object.
   *
   * @param {boolean} [p_transpose=false] - Whether we need to transpose the matrix or not
   * @param {number[]} [out] - If provided the array will be assigned to out
   * @returns {number[]} the newly created array which contains the matrix
   */
  to_array(s = !1, e) {
    !e && !this._array && (this._array = new Array(9));
    const i = e || this._array;
    return s ? (i[0] = this.a, i[1] = this.c, i[2] = this.tx, i[3] = this.b, i[4] = this.d, i[5] = this.ty, i[6] = 0, i[7] = 0, i[8] = 1) : (i[0] = this.a, i[1] = this.b, i[2] = 0, i[3] = this.c, i[4] = this.d, i[5] = 0, i[6] = this.tx, i[7] = this.ty, i[8] = 1), i;
  },
  /**
   * @param {number} p_row
   * @returns {Vector2}
   */
  get_elements(s) {
    switch (s) {
      case 0:
        return new L(this.a, this.b);
      case 1:
        return new L(this.c, this.d);
      case 2:
        return new L(this.tx, this.ty);
    }
  },
  /**
   * @param {number} p_axis
   * @returns {Vector2}
   */
  get_axis(s) {
    switch (s) {
      case 0:
        return new L(this.a, this.b);
      case 1:
        return new L(this.c, this.d);
      case 2:
        return new L(this.tx, this.ty);
    }
  },
  basis_determinant() {
    return this.a * this.d - this.b * this.c;
  },
  /**
   * @param {Transform2D} p_xform
   * @returns {boolean}
   */
  equals(s) {
    return this.a === s.a && this.b === s.b && this.c === s.c && this.d === s.d && this.tx === s.tx && this.ty === s.ty;
  },
  /**
   * @param {Vector2Like} p_vec - The origin
   * @param {Vector2} [r_out] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Vector2} The new point, transformed through this matrix
   */
  basis_xform(s, e = new L()) {
    const i = this.a * s.x + this.c * s.y, n = this.b * s.x + this.d * s.y;
    return e.set(i, n);
  },
  /**
   * @param {Vector2Like} p_vec - The origin
   * @param {Vector2} [r_out] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Vector2} The new point, inverse-transformed through this matrix
   */
  basis_xform_inv(s, e = new L()) {
    const i = this.a * s.x + this.b * s.y, n = this.c * s.x + this.d * s.y;
    return e.set(i, n);
  },
  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   *
   * @param {Vector2Like} p_vec - The origin
   * @param {Vector2} [r_out] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Vector2} The new point, transformed through this matrix
   */
  xform(s, e = new L()) {
    const i = this.a * s.x + this.c * s.y + this.tx, n = this.b * s.x + this.d * s.y + this.ty;
    return e.set(i, n);
  },
  /**
   * Get a new Vector with the current transformation applied.
   *
   * @param {Vector2Like} p_vec - The vector
   * @param {Vector2} [r_out] - The vector that the new position is assigned to (allowed to be same as input)
   * @returns {Vector2} The new point, transformed through this matrix
   */
  xform_vec(s, e = new L()) {
    const i = this.xform(L.ZERO), n = this.xform(s, e);
    return n.sub(i), n;
  },
  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   *
   * @param {Vector2Like} p_vec - The origin
   * @param {Vector2} [r_out] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Vector2} The new point, inverse-transformed through this matrix
   */
  xform_inv(s, e = new L()) {
    const i = this.a * (s.x - this.tx) + this.b * (s.y - this.ty), n = this.c * (s.x - this.tx) + this.d * (s.y - this.ty);
    return e.set(i, n);
  },
  /**
   * @param {Rect2} p_rect
   * @param {Rect2} [r_out]
   * @returns {Rect2}
   */
  xform_rect(s, e = new at()) {
    e.set(0, 0, 0, 0);
    const i = Ar.set(this.a * s.width, this.b * s.width), n = gr.set(this.c * s.height, this.d * s.height), r = Ir.set(s.x, s.y);
    this.xform(r, r), e.x = r.x, e.y = r.y;
    const h = Rr.set(0, 0);
    return e.expand_to(h.copy(r).add(i)), e.expand_to(h.copy(r).add(n)), e.expand_to(h.copy(r).add(i).add(n)), e;
  },
  /**
   * @param {Rect2} p_rect
   * @param {Rect2} [r_out]
   * @returns {Rect2}
   */
  xform_inv_rect(s, e = new at()) {
    const i = xr.set(s.x, s.y), n = Sr.set(s.x, s.y + s.height), r = Mr.set(s.x + s.width, s.y + s.height), h = Dr.set(s.x + s.width, s.y);
    return this.xform_inv(i, i), this.xform_inv(n, n), this.xform_inv(r, r), this.xform_inv(h, h), e.x = i.x, e.y = i.y, e.expand_to(n), e.expand_to(r), e.expand_to(h), e;
  },
  /**
   * Translates the matrix on the x and y.
   *
   * @param {number} x How much to translate x by
   * @param {number} y How much to translate y by
   * @returns {this}
   */
  translate(s, e) {
    return this.tx += s, this.ty += e, this;
  },
  /**
   * Return a new Matrix that not translated.
   * @returns {Transform2D}
   */
  untranslated() {
    const s = this.clone();
    return s.tx = 0, s.ty = 0, s;
  },
  /**
   * Applies a scale transformation to the matrix.
   *
   * @param {number} x The amount to scale horizontally
   * @param {number} y The amount to scale vertically
   * @returns {this}
   */
  scale(s, e) {
    return this.a *= s, this.d *= e, this.c *= s, this.b *= e, this.tx *= s, this.ty *= e, this;
  },
  /**
   * @param {number} x
   * @param {number} y
   * @returns {this}
   */
  scale_basis(s, e) {
    return this.a *= s, this.b *= e, this.c *= s, this.d *= e, this;
  },
  /**
   * Warning! This function calculation has a bug, it's not working as expected.
   * Skews the matrix on the x and y
   *
   * @param {number} x
   * @param {number} y
   * @returns {this}
   */
  // skew(x, y) {
  //     const tX = Math.tan(y)
  //     const tY = Math.tan(x)
  //     this.b += tX
  //     this.c += tY
  //     this.tx += this.ty * tY
  //     this.ty += this.tx * tX
  //     return this
  // },
  /**
   * Applies a rotation transformation to the matrix.
   *
   * @param {number} angle - The angle in radians.
   * @returns {this}
   */
  rotate(s) {
    const e = Math.cos(s), i = Math.sin(s), n = this.a, r = this.c, h = this.tx;
    return this.a = n * e - this.b * i, this.b = n * i + this.b * e, this.c = r * e - this.d * i, this.d = r * i + this.d * e, this.tx = h * e - this.ty * i, this.ty = h * i + this.ty * e, this;
  },
  rotate_basis(s) {
    const e = Math.cos(s), i = Math.sin(s);
    return this.a = e * this.a + i * this.c, this.b = e * this.b + i * this.d, this.c = -i * this.a + e * this.c, this.d = -i * this.b + e * this.d, this;
  },
  /** Right Multiplication (Column Space) - start */
  /**
   * Translate current matrix accumulative.
   * Notice that it should only chain with other right multiplication, or it might not work as expected.
   * @param {number} tx - translation for x
   * @param {number} ty - translation for y
   * @returns {this}
   */
  translate_right(s, e) {
    return this.append(new it(1, 0, 0, 1, s, e)), this;
  },
  /**
   * Apply scale to the current matrix accumulative.
   * Notice that it should only chain with other right multiplication, or it might not work as expected.
   * @param {number} sx - scale factor x (1 does nothing)
   * @param {number} sy - scale factor y (1 does nothing)
   * @returns {this}
   */
  scale_right(s, e) {
    return this.append(new it(s, 0, 0, e, 0, 0)), this;
  },
  /**
   * Apply skew to the current matrix accumulative.
   * Notice that it should only chain with other right multiplication, or it might not work as expected.
   * @param {number} sx - amount of skew for x
   * @param {number} sy - amount of skew for y
   * @returns {this}
   * */
  skew_right(s, e) {
    return this.append(new it(1, Math.tan(e), Math.tan(s), 1, 0, 0)), this;
  },
  /**
   * Apply rotate to current matrix accumulative.
   * Notice that it should only chain with other right multiplication, or it might not work as expected.
   * @param {number} angle - angle in radians
   * @returns {this}
   */
  rotate_right(s) {
    const e = Math.cos(s), i = Math.sin(s);
    return this.append(new it(e, i, -i, e, 0, 0)), this;
  },
  /** Right Multiplication (Column Space) - end */
  /**
   * Invert this matrix.
   * This method assumes the basis is a rotation matrix, with no scaling.
   * Use affine_inverse instead if scaling is required.
   * @returns {this}
   */
  invert() {
    const s = this.b;
    this.b = this.c, this.c = s;
    const e = this.a * -this.tx + this.c * -this.ty, i = this.b * -this.tx + this.d * -this.ty;
    return this.tx = e, this.ty = i, this;
  },
  /**
   * Return a inverted matrix
   * @returns {Transform2D}
   */
  inverse() {
    return this.clone().invert();
  },
  /**
   * @returns {this}
   */
  orthonormalize() {
    const s = new L(this.a, this.b), e = new L(this.c, this.d);
    return s.normalize(), this.a = s.x, this.b = s.y, e.subtract(s.scale(s.dot(e))), e.normalize(), this.c = e.x, this.d = e.y, this;
  },
  orthonormalized() {
    return this.clone().orthonormalize();
  },
  /**
   * @param {Transform2D} matrix
   * @returns {this}
   * */
  append(s) {
    const e = this.a, i = this.b, n = this.c, r = this.d;
    return this.a = s.a * e + s.b * n, this.b = s.a * i + s.b * r, this.c = s.c * e + s.d * n, this.d = s.c * i + s.d * r, this.tx = s.tx * e + s.ty * n + this.tx, this.ty = s.tx * i + s.ty * r + this.ty, this;
  },
  /**
   * Sets the matrix based on all the available properties
   *
   * @param {number} x - Position on the x axis
   * @param {number} y - Position on the y axis
   * @param {number} pivot_x - Pivot on the x axis
   * @param {number} pivot_y - Pivot on the y axis
   * @param {number} scale_x - Scale on the x axis
   * @param {number} scale_y - Scale on the y axis
   * @param {number} rotation - Rotation in radians
   * @param {number} skew_x - Skew on the x axis
   * @param {number} skew_y - Skew on the y axis
   * @returns {this}
   */
  set_transform(s, e, i, n, r, h, o, c, a) {
    return this.a = Math.cos(o + a) * r, this.b = Math.sin(o + a) * r, this.c = -Math.sin(o - c) * h, this.d = Math.cos(o - c) * h, this.tx = s - (i * this.a + n * this.c), this.ty = e - (i * this.b + n * this.d), this;
  },
  /**
   * Prepends the given Matrix to this Matrix (`Matrix_A *= Matrix_B` in Godot)
   *
   * @param {Transform2D} xform - The matrix to prepend
   * @returns {this}
   */
  prepend(s) {
    const e = this.tx;
    if (s.a !== 1 || s.b !== 0 || s.c !== 0 || s.d !== 1) {
      const i = this.a, n = this.c;
      this.a = i * s.a + this.b * s.c, this.b = i * s.b + this.b * s.d, this.c = n * s.a + this.d * s.c, this.d = n * s.b + this.d * s.d;
    }
    return this.tx = e * s.a + this.ty * s.c + s.tx, this.ty = e * s.b + this.ty * s.d + s.ty, this;
  },
  /**
   * Inverts this matrix
   *
   * @returns {this}
   */
  affine_inverse() {
    const s = this.a * this.d - this.b * this.c;
    if (s === 0)
      return this.pseudoInverseAffine();
    const e = 1 / s, i = this.d;
    this.d = this.a, this.a = i, this.a *= e, this.b *= -e, this.c *= -e, this.d *= e;
    const n = this.a * -this.tx + this.c * -this.ty, r = this.b * -this.tx + this.d * -this.ty;
    return this.tx = n, this.ty = r, this;
  },
  /**
   * Return Pseudo-inverse ( Moore-Penrose inverse ) when the matrix is uninvertible
   * It is the closest to an inverse, even for non-square matrices.
   * @returns {this}
   */
  pseudoInverseAffine() {
    const s = this.a * this.a + this.b * this.b, e = this.c * this.c + this.d * this.d;
    if (s === 0 && e === 0)
      return this.tx *= -1, this.ty *= -1, this;
    s === 0 ? (this.a = 0, this.b /= e, this.c = 0, this.d /= e) : (this.a /= s, this.b = 0, this.c /= s, this.d = 0);
    const i = this.a * -this.tx + this.c * -this.ty, n = this.b * -this.tx + this.d * -this.ty;
    return this.tx = i, this.ty = n, this;
  },
  /**
   * Resets this Matix to an identity (default) matrix.
   *
   * @returns {this}
   */
  identity() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  },
  /**
   * @param {Transform2D} p_transform
   * @param {number} p_c
   * @returns {Transform2D}
   */
  interpolate(s, e) {
    const i = Tt.lerp(this.get_scale().x, s.get_scale().x, e), n = Tt.lerp(this.get_scale().y, s.get_scale().y, e), r = Tt.lerp_angle(this.get_rotation(), s.get_rotation(), e), h = Tt.lerp(this.get_origin().x, s.get_origin().x, e), o = Tt.lerp(this.get_origin().y, s.get_origin().y, e);
    return this.set_transform(h, o, 0, 0, i, n, r, 0, 0), this;
  },
  /**
   * Creates a new Matrix object with the same values as this one.
   *
   * @returns {Transform2D}
   */
  clone() {
    return new it(
      this.a,
      this.b,
      this.c,
      this.d,
      this.tx,
      this.ty
    );
  },
  /**
   * Copy the values of given matrix to this one.
   *
   * @param {Transform2D} matrix - The matrix to copy from.
   * @returns {this}
   */
  copy(s) {
    return this.a = s.a, this.b = s.b, this.c = s.c, this.d = s.d, this.tx = s.tx, this.ty = s.ty, this;
  },
  /**
   * Works only when transforms are applied in this order: scale, skew, rotate, translate
   * Reference: https://stackoverflow.com/a/45392997
   *
   * @returns {DecomposeResult}
   */
  decompose2() {
    const s = this;
    let e = 0;
    const i = new L(), n = new L();
    e = Math.atan2(this.b, this.a);
    const r = Math.atan2(this.d, this.c) - Math.PI / 2 - e;
    return n.set(-r, 0), i.set(Math.sqrt(this.a * this.a + this.b * this.b), Math.sqrt(this.c * this.c + this.d * this.d) * Math.cos(r)), {
      translation: new L(s.tx, s.ty),
      rotation: e,
      scale: i,
      skew: n
    };
  },
  /**
   * @returns {DecomposeResult}
   */
  decompose() {
    const s = this.a, e = this.b, i = this.c, n = this.d, r = this.tx, h = this.ty, o = s * n - e * i, c = Math.sqrt(s * s + e * e), a = {
      translation: new L(r, h),
      rotation: 0,
      scale: new L(1, 1),
      skew: new L(0, 0)
    };
    return s === e && e === i && i === n ? (a.rotation = 0, a.skew.x = 0, a.scale.x = 0, a.scale.y = 0) : s === 0 && e === 0 ? (a.rotation = -Math.atan2(i, n), a.skew.x = 0, a.scale.x = 0, a.scale.y = Math.sqrt(i * i + n * n)) : i === 0 && n === 0 ? (a.rotation = -Math.atan2(-e, s), a.skew.x = 0, a.scale.x = c, a.scale.y = 0) : (a.rotation = -Math.atan2(-e, s), a.skew.x = Math.atan2(s * i + e * n, o), a.scale.x = c, a.scale.y = o / c), a;
  }
};
it.IDENTITY = new it();
const Ar = new L(), gr = new L(), Ir = new L(), Rr = new L(), Lr = new L(), mr = new L(), Cr = new L(), xr = new L(), Sr = new L(), Mr = new L(), Dr = new L(), Os = 5, Pr = !1;
class wr {
  constructor() {
    this._enabled = Pr, this._logger = {}, this._reset();
  }
  help() {
    console.log(`stats.activate(): enable the frame monitoring
`), console.log(`stats.deactivate(): disable the frame monitoring
`), console.log(`stats.dump(): get the monitoring result
`), console.log(`stats.help(): show the usage of this tool
`);
  }
  activate() {
    this._reset(), this._enabled = !0, console.log("The frame monitoring utility is activated.");
  }
  deactivate() {
    this._reset(), this._enabled = !1, console.log("The frame monitoring utility is deactivated.");
  }
  has(e) {
    const [i, n] = this._getMetricNames(e), r = this.metricGroups[i];
    return r ? !!r[n] : !1;
  }
  get(e) {
    if (!this.has(e))
      throw new Error(`The metrics "${e}" does not exist`);
    const [i, n] = this._getMetricNames(e);
    return this.metricGroups[i][n];
  }
  /**
   * @param {string} metricPath 
   */
  begin(e) {
    if (!this._enabled)
      return;
    const [i, n] = this._getMetricNames(e);
    this.metricGroups[i] || (this.metricGroups[i] = {}), this.metricGroups[i][n] || (this.metricGroups[i][n] = {
      frameCounter: 0,
      deltaTime: 0,
      maxDeltaTime: 0,
      minDeltaTime: 1 / 0,
      deltaTimeBuffer: new Array(Os).fill(0),
      useSubTimer: !1
    }), this.metricGroups[i][n].beginTime = performance.now(), this.metricGroups[i][n].deltaTime = 0, this.metricGroups[i][n].useSubTimer = !1;
  }
  /**
   * @param {string} metricPath
   * @returns {number}
   */
  end(e) {
    if (!this._enabled)
      return;
    const i = this.get(e);
    return i.useSubTimer || (i.deltaTime = performance.now() - i.beginTime), this._recalculateAvgMinMax(i), i.deltaTime;
  }
  beginSub(e) {
    if (!this._enabled)
      return;
    const i = this.get(e);
    i.useSubTimer = !0, i.beginTime = performance.now();
  }
  endSub(e) {
    if (!this._enabled)
      return;
    const i = this.get(e);
    i.deltaTime += performance.now() - i.beginTime;
  }
  log(e, i) {
    this._enabled && (this._logger[e] = i);
  }
  /**
   * @param {string} metricPath 
   * @returns {[string, string]}
   */
  _getMetricNames(e) {
    const i = e.split("/");
    return i.length <= 1 ? ["_", i[0]] : [i[0], i[1]];
  }
  /**
   * @param {*} metric
   */
  _recalculateAvgMinMax(e) {
    e.deltaTimeBuffer[e.frameCounter++ % Os] = e.deltaTime, e.maxDeltaTime = Math.max(e.maxDeltaTime, e.deltaTime), e.minDeltaTime = Math.min(e.minDeltaTime, e.deltaTime), e.avgDeltaTime = e.deltaTimeBuffer.reduce((i, n) => i + n, 0) / Os;
  }
  _reset() {
    this.metricGroups = {
      _: {}
      // default metric group
    }, this._logger = {};
  }
  dump() {
    const e = this._logger;
    return Object.keys(this.metricGroups).reduce((i, n) => {
      const r = this.metricGroups[n], h = Object.keys(r).reduce((o, c) => o + r[c].avgDeltaTime, 0);
      return i[n] = Object.keys(r).reduce((o, c) => (o[c] = {
        frames: r[c].frameCounter,
        avg: r[c].avgDeltaTime,
        min: r[c].minDeltaTime,
        max: r[c].maxDeltaTime,
        pct: 100 * (r[c].avgDeltaTime / h)
      }, o), {}), i;
    }, e);
  }
}
const yr = new wr();
typeof window < "u" && (window.stats = yr);
const qi = new Int8Array(4), Gr = new Int32Array(qi.buffer, 0, 1), pr = new Float32Array(qi.buffer, 0, 1), br = (s) => (Gr[0] = s, pr[0]), Ur = (s) => br(s & 4278190079);
function Vr(s, e, i, n) {
  const r = (n * 255 | 0) << 24 | (i * 255 | 0) << 16 | (e * 255 | 0) << 8 | (s * 255 | 0);
  return Ur(r);
}
function ut(s = 1, e = 1, i = 1, n = 1) {
  this.r = s, this.g = e, this.b = i, this.a = n, this._rgba = null;
}
ut.prototype = {
  constructor: ut,
  /**
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} [a]
   * @returns {this}
   */
  set(s, e, i, n = 1) {
    return this.r = s, this.g = e, this.b = i, this.a = n, this;
  },
  /**
   * @param {number} hex
   * @returns {this}
   */
  set_with_hex(s) {
    const [e, i, n] = Ki(s);
    return this.r = e, this.g = i, this.b = n, this;
  },
  /**
   * @param {number[]} arr
   * @returns {this}
   */
  set_with_array(s) {
    return this.r = s[0], this.g = s[1], this.b = s[2], this.a = s[3], this;
  },
  /**
   * @param {ColorLike} c
   * @returns {this}
   */
  copy(s) {
    return this.r = s.r, this.g = s.g, this.b = s.b, this.a = s.a, this;
  },
  clone() {
    return new ut().copy(this);
  },
  to_linear() {
    return new ut().set(
      this.r < 0.04045 ? this.r * (1 / 12.92) : Math.pow((this.r + 0.055) * (1 / (1 + 0.055)), 2.4),
      this.g < 0.04045 ? this.g * (1 / 12.92) : Math.pow((this.g + 0.055) * (1 / (1 + 0.055)), 2.4),
      this.b < 0.04045 ? this.b * (1 / 12.92) : Math.pow((this.b + 0.055) * (1 / (1 + 0.055)), 2.4),
      this.a
    );
  },
  to_srgb() {
    return new ut().set(
      this.r < 31308e-7 ? 12.92 * this.r : (1 + 0.055) * Math.pow(this.r, 1 / 2.4) - 0.055,
      this.g < 31308e-7 ? 12.92 * this.g : (1 + 0.055) * Math.pow(this.g, 1 / 2.4) - 0.055,
      this.b < 31308e-7 ? 12.92 * this.b : (1 + 0.055) * Math.pow(this.b, 1 / 2.4) - 0.055,
      this.a
    );
  },
  /**
   * @param {ColorLike} c
   * @returns {this}
   */
  multiply(s) {
    return this.r *= s.r, this.g *= s.g, this.b *= s.b, this.a *= s.a, this;
  },
  /**
   * @param {ColorLike} p_over
   * @returns {this}
   */
  blend(s) {
    let e = 0;
    const i = 1 - s.a;
    return e = this.a * i + s.a, e === 0 ? this.set(0, 0, 0, 0) : this.set(
      (this.r * this.a * i + s.r * s.a) / e,
      (this.g * this.a * i + s.g * s.a) / e,
      (this.b * this.a * i + s.b * s.a) / e,
      e
    );
  },
  /**
   * @param {ColorLike} p_b
   * @param {number} p_t
   * @param {Color} [r_out]
   * @returns {Color}
   */
  linear_interpolate(s, e, i = new ut()) {
    return i.copy(this), i.r += e * (s.r - this.r), i.g += e * (s.g - this.g), i.b += e * (s.b - this.b), i.a += e * (s.a - this.a), i;
  },
  as_hex() {
    return this._rgba || (this._rgba = Array(4)), this._rgba[0] = this.r, this._rgba[1] = this.g, this._rgba[2] = this.b, this._rgba[3] = this.a, Hr(this._rgba);
  },
  as_rgba8() {
    return Vr(this.r, this.g, this.b, this.a);
  },
  /**
   * @param {number[]} [out]
   * @returns {number[]}
   */
  as_array(s) {
    if (!s && !this._rgba)
      return this._rgba = [this.r, this.g, this.b, this.a], this._rgba;
    const e = s || this._rgba;
    return e[0] = this.r, e[1] = this.g, e[2] = this.b, e[3] = this.a, e;
  },
  /**
   * @param {ColorLike} value
   * @returns {boolean}
   */
  equals(s) {
    return this.r === s.r && this.g === s.g && this.b === s.b && this.a === s.a;
  }
};
ut.hex = (s) => {
  const e = Ki(s);
  return new ut(e[0], e[1], e[2]);
};
ut.html = (s) => ut.hex(parseInt(s.replace(/^#/, "0x"), 16));
function Ki(s, e = []) {
  return e[0] = (s >> 16 & 255) / 255, e[1] = (s >> 8 & 255) / 255, e[2] = (s & 255) / 255, e;
}
function Hr(s) {
  return (s[0] * 255 << 16) + (s[1] * 255 << 8) + (s[2] * 255 | 0);
}
const ft = {
  line: 1,
  quadratic: 2,
  serpentine: 3,
  cusp: 4,
  loop: 5,
  arch: 6
}, Fr = [
  [0.5773502691896257],
  [0, 0.7745966692414834],
  [0.33998104358485626, 0.8611363115940526],
  [0, 0.5384693101056831, 0.906179845938664],
  [0.2386191860831969, 0.6612093864662645, 0.932469514203152],
  [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585],
  [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363],
  [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261],
  [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717],
  [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057],
  [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192],
  [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881],
  [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123],
  [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854],
  [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]
], Wr = [
  [1],
  [0.8888888888888888, 0.5555555555555556],
  [0.6521451548625461, 0.34785484513745385],
  [0.5688888888888889, 0.47862867049936647, 0.23692688505618908],
  [0.46791393457269104, 0.3607615730481386, 0.17132449237917036],
  [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697],
  [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626],
  [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441],
  [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814],
  [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366],
  [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183],
  [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588],
  [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186],
  [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727],
  [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]
], Q = Math.abs, fi = Math.sqrt, Ti = Math.pow, kr = Math.log2 || function(s) {
  return Math.log(s) * Math.LOG2E;
}, Bt = (s, e, i) => s < e ? e : s > i ? i : s, j = {
  getDiscriminant(s, e, i) {
    function n(o) {
      const c = o * 134217729, _ = o - c + c, u = o - _;
      return [_, u];
    }
    let r = e * e - s * i;
    const h = e * e + s * i;
    if (Q(r) * 3 < h) {
      const o = n(s), c = n(e), a = n(i), _ = e * e, u = c[0] * c[0] - _ + 2 * c[0] * c[1] + c[1] * c[1], E = s * i, l = o[0] * a[0] - E + o[0] * a[1] + o[1] * a[0] + o[1] * a[1];
      r = _ - E + (u - l);
    }
    return r;
  },
  getNormalizationFactor(...s) {
    const e = Math.max(...s);
    return e && (e < 1e-8 || e > 1e8) ? Ti(2, -Math.round(kr(e))) : 0;
  },
  /**
   * Checks if the value is 0, within a tolerance defined by
   * EPSILON.
   * @param {number} val
   * @returns {boolean}
   */
  isZero: function(s) {
    return s >= -1e-12 && s <= Z;
  },
  isMachineZero: function(s) {
    return s >= -112e-18 && s <= fs;
  },
  /**
   * Returns a number whose value is clamped by the given range.
   *
   * @param {number} value the value to be clamped
   * @param {number} min the lower boundary of the range
   * @param {number} max the upper boundary of the range
   * @returns {number} a number in the range of [min, max]
   */
  clamp: Bt,
  /**
   * Gauss-Legendre Numerical Integration.
   *
   * @param {Function} f
   * @param {number} a
   * @param {number} b
   * @param {Function} n
   */
  integrate: function(s, e, i, n) {
    let r = 0;
    const h = Fr[n - 2], o = Wr[n - 2], c = (i - e) * 0.5, a = c + e, _ = n + 1 >> 1;
    let u = n & 1 ? o[r++] * s(a) : 0;
    for (; r < _; ) {
      const E = c * h[r];
      u += o[r++] * (s(a + E) + s(a - E));
    }
    return c * u;
  },
  /**
   * Root finding using Newton-Raphson Method combined with Bisection.
   * @param {(t: number) => number} f
   * @param {(t: number) => number} df
   * @param {number} x
   * @param {number} a
   * @param {number} b
   * @param {number} n
   * @param {number} tolerance
   */
  findRoot: function(s, e, i, n, r, h, o) {
    for (let c = 0; c < h; c++) {
      const a = s(i), _ = a / e(i), u = i - _;
      if (Q(_) < o) {
        i = u;
        break;
      }
      a > 0 ? (r = i, i = u <= n ? (n + r) * 0.5 : u) : (n = i, i = u >= r ? (n + r) * 0.5 : u);
    }
    return Bt(i, n, r);
  },
  /**
   * Solve a quadratic equation in a numerically robust manner;
   * given a quadratic equation ax² + bx + c = 0, find the values of x.
   *
   * References:
   *  Kahan W. - "To Solve a Real Cubic Equation"
   *  http://www.cs.berkeley.edu/~wkahan/Math128/Cubic.pdf
   *  Blinn J. - "How to solve a Quadratic Equation"
   *  Harikrishnan G.
   *  https://gist.github.com/hkrish/9e0de1f121971ee0fbab281f5c986de9
   *
   * @param {number} a the quadratic term
   * @param {number} b the linear term
   * @param {number} c the constant term
   * @param {number[]} roots the array to store the roots in
   * @param {number} [min] the lower bound of the allowed roots
   * @param {number} [max] the upper bound of the allowed roots
   * @returns {number} the number of real roots found, or -1 if there are
   * infinite solutions
   *
   * @author Harikrishnan Gopalakrishnan <hari.exeption@gmail.com>
   */
  solveQuadratic: function(s, e, i, n, r, h) {
    let o, c = 1 / 0;
    if (Q(s) < Z) {
      if (Q(e) < Z)
        return Q(i) < Z ? -1 : 0;
      o = -i / e;
    } else {
      e *= -0.5;
      let l = j.getDiscriminant(s, e, i);
      if (l && Q(l) < fs) {
        const f = j.getNormalizationFactor(Q(s), Q(e), Q(i));
        f && (s *= f, e *= f, i *= f, l = j.getDiscriminant(s, e, i));
      }
      if (l >= -112e-18) {
        const f = l < 0 ? 0 : fi(l), d = e + (e < 0 ? -f : f);
        d === 0 ? (o = i / s, c = -o) : (o = d / s, c = i / d);
      }
    }
    let a = 0;
    const _ = r == null, u = r - Z, E = h + Z;
    return isFinite(o) && (_ || o > u && o < E) && (n[a++] = _ ? o : Bt(o, r, h)), c !== o && isFinite(c) && (_ || c > u && c < E) && (n[a++] = _ ? c : Bt(c, r, h)), a;
  },
  /**
   * Solve a cubic equation, using numerically stable methods,
   * given an equation of the form ax³ + bx² + cx + d = 0.
   *
   * This algorithm avoids the trigonometric/inverse trigonometric
   * calculations required by the "Italins"' formula. Cardano's method
   * works well enough for exact computations, this method takes a
   * numerical approach where the double precision error bound is kept
   * very low.
   *
   * References:
   *  Kahan W. - "To Solve a Real Cubic Equation"
   *   http://www.cs.berkeley.edu/~wkahan/Math128/Cubic.pdf
   *  Harikrishnan G.
   *  https://gist.github.com/hkrish/9e0de1f121971ee0fbab281f5c986de9
   *
   * W. Kahan's paper contains inferences on accuracy of cubic
   * zero-finding methods. Also testing methods for robustness.
   *
   * @param {number} a the cubic term (x³ term)
   * @param {number} b the quadratic term (x² term)
   * @param {number} c the linear term (x term)
   * @param {number} d the constant term
   * @param {number[]} roots the array to store the roots in
   * @param {number} [min] the lower bound of the allowed roots
   * @param {number} [max] the upper bound of the allowed roots
   * @returns {number} the number of real roots found, or -1 if there are
   * infinite solutions
   *
   * @author Harikrishnan Gopalakrishnan <hari.exeption@gmail.com>
   */
  solveCubic: function(s, e, i, n, r, h, o) {
    const c = j.getNormalizationFactor(Q(s), Q(e), Q(i), Q(n));
    let a, _, u, E, l;
    c && (s *= c, e *= c, i *= c, n *= c);
    function f(T) {
      a = T;
      const O = s * a;
      _ = O + e, u = _ * a + i, E = (O + _) * a + u, l = u * a + n;
    }
    if (Q(s) < Z)
      s = e, _ = i, u = n, a = 1 / 0;
    else if (Q(n) < Z)
      _ = e, u = i, a = 0;
    else {
      f(-(e / s) / 3);
      const T = l / s, O = Ti(Q(T), 1 / 3), A = T < 0 ? -1 : 1, g = -E / s, R = g > 0 ? 1.324717957244746 * Math.max(O, fi(g)) : O;
      let I = a - A * R;
      if (I !== a) {
        do
          f(I), I = E === 0 ? a : a - l / E / (1 + fs);
        while (A * I > A * a);
        Q(s) * a * a > Q(n / a) && (u = -n / a, _ = (u - i) / a);
      }
    }
    let d = j.solveQuadratic(s, _, u, r, h, o);
    const N = h == null;
    return isFinite(a) && (d === 0 || d > 0 && a !== r[0] && a !== r[1]) && (N || a > h - Z && a < o + Z) && (r[d++] = N ? a : Bt(a, h, o)), d;
  }
}, di = Math.min, Ni = Math.max;
function Xr(s, e, i) {
  function n(o) {
    const c = new Array(o.length);
    for (let a = 0; a < o.length; a++) {
      const _ = o[a].getBounds();
      c[a] = [_.left, _.top, _.right, _.bottom];
    }
    return c;
  }
  const r = n(s);
  return rs(r, r, i);
}
function $i(s, e, i, n) {
  const r = (c) => {
    const a = Array(c.length);
    for (let _ = 0; _ < c.length; _++) {
      const u = c[_];
      a[_] = [
        di(u[0], u[2], u[4], u[6]),
        di(u[1], u[3], u[5], u[7]),
        Ni(u[0], u[2], u[4], u[6]),
        Ni(u[1], u[3], u[5], u[7])
      ];
    }
    return a;
  }, h = r(s), o = !e || e === s ? h : r(e);
  if (n) {
    const c = rs(
      h,
      o,
      i || 0,
      !1,
      !0
    ), a = rs(
      h,
      o,
      i || 0,
      !0,
      !0
    ), _ = [];
    for (let u = 0, E = c.length; u < E; u++)
      _[u] = { hor: c[u], ver: a[u] };
    return _;
  }
  return rs(h, o, i || 0);
}
function rs(s, e, i, n, r) {
  const h = !e || s === e, o = h ? s : s.concat(e), c = s.length, a = o.length, _ = (O, A, g) => {
    let R = 0, I = O.length;
    for (; R < I; ) {
      const x = I + R >>> 1;
      o[O[x]][A] < g ? R = x + 1 : I = x;
    }
    return R - 1;
  }, u = n ? 1 : 0, E = u + 2, l = n ? 0 : 1, f = l + 2, d = Array(a);
  for (let O = 0; O < a; O++)
    d[O] = O;
  d.sort(function(O, A) {
    return o[O][u] - o[A][u];
  });
  const N = [], T = Array(c);
  for (let O = 0; O < a; O++) {
    const A = d[O], g = o[A], R = h ? A : A - c, I = A < c, x = h || !I;
    let m = I ? [] : null;
    if (N.length) {
      const M = _(
        N,
        E,
        g[u] - i
      ) + 1;
      if (N.splice(0, M), h && r) {
        m = m.concat(N);
        for (let P = 0; P < N.length; P++) {
          const y = N[P];
          T[y].push(R);
        }
      } else {
        const P = g[f], y = g[l];
        for (let D = 0; D < N.length; D++) {
          const b = N[D], w = o[b], p = b < c, v = h || b >= c;
          // eslint-disable-next-line no-mixed-operators
          (r || (I && v || x && p) && P >= w[l] - i && y <= w[f] + i) && (I && v && m.push(h ? b : b - c), x && p && T[b].push(R));
        }
      }
    }
    if (I && (s === e && m.push(A), T[A] = m), N.length) {
      const M = g[E], P = _(N, E, M);
      N.splice(P + 1, 0, A);
    } else
      N.push(A);
  }
  for (let O = 0; O < T.length; O++) {
    const A = T[O];
    A && A.sort(function(g, R) {
      return g - R;
    });
  }
  return T;
}
function st() {
  this._px = void 0, this._py = void 0, this._vx = void 0, this._vy = void 0;
}
st.intersect = (s, e, i, n, r, h, o, c, a, _) => {
  a || (i -= s, n -= e, o -= r, c -= h);
  const u = i * c - n * o;
  if (!j.isMachineZero(u)) {
    const E = s - r, l = e - h;
    let f = (o * l - c * E) / u;
    const d = (i * l - n * E) / u, N = Z, T = -1e-12, O = 1 + N;
    if (_ || T < f && f < O && T < d && d < O)
      return _ || (f = f <= 0 ? 0 : f >= 1 ? 1 : f), new L(
        s + f * i,
        e + f * n
      );
  }
};
st.getSide = (s, e, i, n, r, h, o, c) => {
  o || (i -= s, n -= e);
  const a = r - s, _ = h - e;
  let u = a * n - _ * i;
  return !c && j.isMachineZero(u) && (u = (a * i + a * i) / (i * i + n * n), u >= 0 && u <= 1 && (u = 0)), u < 0 ? -1 : u > 0 ? 1 : 0;
};
st.getSignedDistance = (s, e, i, n, r, h, o) => (o || (i -= s, n -= e), i === 0 ? n > 0 ? r - s : s - r : n === 0 ? i < 0 ? h - e : e - h : ((r - s) * n - (h - e) * i) / (n > i ? n * Oi(1 + i * i / (n * n)) : i * Oi(1 + n * n / (i * i))));
st.getDistance = (s, e, i, n, r, h, o) => Zi(st.getSignedDistance(s, e, i, n, r, h, o));
st.prototype = {
  constructor: st,
  /**
   * @param {number} p0x
   * @param {number} p0y
   * @param {number} p1x
   * @param {number} p1y
   */
  initN(s, e, i, n) {
    return this._px = s, this._py = e, this._vx = i - s, this._vy = n - e, this;
  },
  /**
   * @param {Vector2Like} p0
   * @param {Vector2Like} p1
   */
  initP(s, e) {
    return this.initN(s.x, s.y, e.x, e.y);
  },
  /**
   * The start point of the line.
   */
  getP0() {
    return new L(this._px, this._py);
  },
  /**
   * The end point of the line.
   */
  getP1() {
    return new L(this._px + this._vx, this._py + this._vy);
  },
  /**
   * The direction of the line as a vector.
   */
  getVector() {
    return new L(this._vx, this._vy);
  },
  /**
   * The length of the line.
   */
  getLength() {
    return this.getVector().length();
  },
  /**
   * @param {Line} line
   * @param {boolean} [isInfinite=false]
   * @returns the intersection point of the lines, `undefined` if the
   *     two lines are collinear, or `null` if they don't intersect.
   */
  intersect(s, e) {
    return st.intersect(
      this._px,
      this._py,
      this._vx,
      this._vy,
      s._px,
      s._py,
      s._vx,
      s._vy,
      !0,
      e
    );
  },
  /**
   * @param {Vector2} point
   * @param {boolean} [isInfinite=false]
   */
  getSide(s, e) {
    return st.getSide(
      this._px,
      this._py,
      this._vx,
      this._vy,
      s.x,
      s.y,
      !0,
      e
    );
  },
  /**
   * @param {Vector2} point
   */
  getDistance(s) {
    return Zi(this.getSignedDistance(s));
  },
  /**
   * @param {Vector2} point
   */
  getSignedDistance(s) {
    return st.getSignedDistance(
      this._px,
      this._py,
      this._vx,
      this._vy,
      s.x,
      s.y,
      !0
    );
  },
  /**
   * @param {Line} line
   */
  isCollinear(s) {
    return L.isCollinear(this._vx, this._vy, s._vx, s._vy);
  },
  /**
   * @param {Line} line
   */
  isOrthogonal(s) {
    return L.isOrthogonal(this._vx, this._vy, s._vx, s._vy);
  },
  /**
   * @param {number} t
   */
  eval(s) {
    return new L(
      this._px + Tt.lerp(0, this._vx, s),
      this._py + Tt.lerp(0, this._vy, s)
    );
  },
  /**
   * @param {Vector2} p
   * @param {number} _accuracy
   */
  // eslint-disable-next-line no-unused-vars
  nearest(s, e) {
    const i = this.getP0(), n = this.getVector(), r = i.clone().add(n), h = n.dot(s.clone().sub(i)), o = n.dot(n);
    let c = 0, a = 0;
    return h <= 0 ? (c = 0, a = s.distance_squared_to(i)) : h >= o ? (c = 1, a = s.distance_squared_to(r)) : (c = h / o, a = this.eval(c).sub(s).length_squared()), { distance_sq: a, t: c };
  }
};
const Zi = Math.abs, Oi = Math.sqrt, wt = {
  None: 0,
  Loop: 1,
  DoubleInflection: 2
};
function as(s, e) {
  const i = Lt(s);
  return e < 0 ? -i : i;
}
function vr(s, e, i, n, r, h, o, c) {
  const a = Math.max(Math.ceil(Math.log2((i - e) / n)) - 1, 0), _ = r + a;
  let u = n * Math.exp(_ * Math.LN2);
  for (; i - e > 2 * n; ) {
    const E = 0.5 * (e + i), l = u - 0.5 * (i - e), f = (c * e - o * i) / (c - o), d = E - f, N = h * (i - e) * (i - e), T = N <= Math.abs(E - f) ? f + as(N, d) : E, O = Math.abs(T - E) <= l ? T : E - as(l, d), A = s(O);
    if (A > 0)
      i = O, c = A;
    else if (A < 0)
      e = O, o = A;
    else
      return O;
    u *= 0.5;
  }
  return 0.5 * (e + i);
}
function Yr(s, e, i) {
  const n = s / i, r = e / i;
  if (!(isFinite(n) && isFinite(r))) {
    const a = -s / e;
    return isFinite(a) ? [a] : s == 0 && e == 0 ? [0] : [];
  }
  const h = r * r - 4 * n;
  let o = 0;
  if (isFinite(h)) {
    if (h < 0)
      return [];
    if (h == 0)
      return [-0.5 * r];
    o = -0.5 * (r + as(yt(h), r));
  } else
    o = -r;
  const c = n / o;
  return isFinite(c) ? c > o ? [o, c] : [c, o] : [o];
}
function zr(s, e, i, n) {
  const r = i / (3 * n), h = e / (3 * n), o = s / n;
  if (!(isFinite(o) && isFinite(h) && isFinite(r)))
    return Yr(s, e, i);
  const c = -r * r + h, a = -h * r + o, _ = r * o - h * h, u = 4 * c * _ - a * a, E = -2 * r * c + a;
  if (u < 0) {
    const l = yt(-0.25 * u), f = -0.5 * E;
    return [gi(f + l) + gi(f - l) - r];
  } else if (u == 0) {
    const l = as(yt(-c), E);
    return [l - r, -2 * l - r];
  } else {
    const l = Kr(yt(u), -E) / 3, f = qr(l), d = Br(l) * yt(3), N = 0.5 * (-f + d), T = 0.5 * (-f - d), O = 2 * yt(-c);
    return [O * f - r, O * N - r, O * T - r];
  }
}
function Cs(s, e) {
  const i = st.getDistance, n = _t, r = Et;
  let h = C.isStraight(s), o = C.isStraight(e), c = h && o;
  const a = Ai(s) < Ai(e), _ = a ? e : s, u = a ? s : e, E = _[0], l = _[1], f = _[6] - E, d = _[7] - l;
  if (i(E, l, f, d, u[0], u[1], !0) < r && i(E, l, f, d, u[6], u[7], !0) < r)
    !c && i(E, l, f, d, _[2], _[3], !0) < r && i(E, l, f, d, _[4], _[5], !0) < r && i(E, l, f, d, u[2], u[3], !0) < r && i(E, l, f, d, u[4], u[5], !0) < r && (h = !0, o = !0, c = !0);
  else if (c)
    return null;
  if (h ^ o)
    return null;
  const N = [s, e];
  let T = [];
  for (let O = 0; O < 4 && T.length < 2; O++) {
    const A = O & 1, g = A ^ 1, R = O >> 1, I = C.getTimeOf(
      N[A],
      new L(
        N[g][R ? 6 : 0],
        N[g][R ? 7 : 1]
      )
    );
    if (I != null) {
      const x = A ? [R, I] : [I, R];
      // eslint-disable-next-line no-mixed-operators
      (!T.length || // eslint-disable-next-line no-mixed-operators
      Lt(x[0] - T[0][0]) > n && Lt(x[1] - T[0][1]) > n) && T.push(x);
    }
    if (O > 2 && !T.length)
      break;
  }
  if (T.length !== 2)
    T = null;
  else if (!c) {
    const O = C.getPart(s, T[0][0], T[1][0]), A = C.getPart(e, T[0][1], T[1][1]);
    (Lt(A[2] - O[2]) > r || Lt(A[3] - O[3]) > r || Lt(A[4] - O[4]) > r || Lt(A[5] - O[5]) > r) && (T = null);
  }
  return T;
}
function Ai(s) {
  const e = s[6] - s[0], i = s[7] - s[1];
  return e * e + i * i;
}
const Lt = Math.abs, yt = Math.sqrt, Br = Math.sin, qr = Math.cos, Kr = Math.atan2, gi = Math.cbrt, xt = {
  // Anything affecting the appearance of an item, including GEOMETRY,
  // STROKE, STYLE and ATTRIBUTE (except for the invisible ones: locked, name)
  APPEARANCE: 1,
  // Item geometry (path, bounds)
  GEOMETRY: 8,
  // Only segment(s) have changed, and affected curves have already been
  // notified. This is to implement an optimization in _changed() calls
  SEGMENTS: 32
  // // Stroke geometry (excluding color)
  // STROKE: 0x40,
  // // Fill style or stroke color / dash
  // STYLE: 0x80,
  // // Item attributes: visible, blendMode, locked, name, opacity, clipMask ...
  // ATTRIBUTE: 0x100,
  // // Text content
  // CONTENT: 0x200,
  // // Raster pixels
  // PIXELS: 0x400,
  // // Clipping in one of the child items
  // CLIPPING: 0x800,
  // // The view has been transformed
  // VIEW: 0x1000
}, Kt = {
  GEOMETRY: xt.GEOMETRY | xt.APPEARANCE,
  SEGMENTS: xt.SEGMENTS | xt.GEOMETRY | xt.APPEARANCE
  // STROKE: ChangeFlag.STROKE | ChangeFlag.STYLE | ChangeFlag.APPEARANCE,
  // STYLE: ChangeFlag.STYLE | ChangeFlag.APPEARANCE,
  // ATTRIBUTE: ChangeFlag.ATTRIBUTE | ChangeFlag.APPEARANCE,
  // CONTENT: ChangeFlag.CONTENT | ChangeFlag.GEOMETRY | ChangeFlag.APPEARANCE,
  // PIXELS: ChangeFlag.PIXELS | ChangeFlag.APPEARANCE,
  // VIEW: ChangeFlag.VIEW | ChangeFlag.APPEARANCE
};
function G() {
  this._point = new L(), this._handleIn = new L(), this._handleOut = new L(), this._path = null, this._intersection = null, this._index = null, this._winding = null, this._visited = null;
}
G.prototype = {
  constructor: G,
  /**
   * @param {Vector2Like} point
   */
  initP(s) {
    return this.initN(s.x, s.y);
  },
  /**
   * @param {number} x
   * @param {number} y
   */
  initN(s, e) {
    return this._point.set(s, e), this._handleIn.set(0, 0), this._handleOut.set(0, 0), this._changed(this._point), this._changed(this._handleIn), this._changed(this._handleOut), this;
  },
  /**
   * @param {Vector2Like} point
   * @param {Vector2Like | null} handleIn
   * @param {Vector2Like | null} handleOut
   */
  initWithPoints(s, e, i) {
    return this._point.set(s.x, s.y), this._changed(this._point), e && (this._handleIn.set(e.x, e.y), this._changed(this._handleIn)), i && (this._handleOut.set(i.x, i.y), this._changed(this._handleOut)), this;
  },
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} inX
   * @param {number} inY
   * @param {number} outX
   * @param {number} outY
   */
  initWithPointsN(s, e, i, n, r, h) {
    return this._point.set(s, e), this._handleIn.set(i, n), this._handleOut.set(r, h), this._changed(this._point), this._changed(this._handleIn), this._changed(this._handleOut), this;
  },
  /**
   * @param {Vector2Like} point
   */
  setPoint(s) {
    this._point.set(s.x, s.y), this._changed(this._point);
  },
  /**
   * @param {Vector2Like} handleIn
   */
  setHandleIn(s) {
    this._handleIn.set(s.x, s.y), this._changed(this._handleIn);
  },
  /**
   * @param {number} x
   * @param {number} y
   */
  setHandleInN(s, e) {
    this._handleIn.set(s, e), this._changed(this._handleIn);
  },
  /**
   * @param {Vector2Like} handleOut
   */
  setHandleOut(s) {
    this._handleOut.set(s.x, s.y), this._changed(this._handleOut);
  },
  /**
   * @param {number} x
   * @param {number} y
   */
  setHandleOutN(s, e) {
    this._handleOut.set(s, e), this._changed(this._handleOut);
  },
  /**
   * @param {Segment} other
   */
  copy(s) {
    return this.initWithPoints(s._point, s._handleIn, s._handleOut);
  },
  clone() {
    return new G().initWithPoints(this._point, this._handleIn, this._handleOut);
  },
  remove() {
    return this._path ? !!this._path.removeSegment(this._index) : !1;
  },
  isFirst() {
    return !this._index;
  },
  isLast() {
    const s = this._path;
    return s && this._index === s._segments.length - 1 || !1;
  },
  getPrevious() {
    const s = this._path && this._path._segments;
    return s && (s[this._index - 1] || this._path._closed && s[s.length - 1]) || null;
  },
  getNext() {
    const s = this._path && this._path._segments;
    return s && (s[this._index + 1] || this._path._closed && s[0]) || null;
  },
  /**
   * The curve that the segment belongs to. For the last segment of an open
   * path, the previous segment is returned.
   */
  getCurve() {
    const s = this._path;
    let e = this._index;
    return s ? (e > 0 && !s._closed && e === s._segments.length - 1 && e--, s.getCurves()[e] || null) : null;
  },
  /**
   * @param {number} tolerance
   */
  hasHandles(s) {
    return !this._handleIn.is_zero(s) || !this._handleOut.is_zero(s);
  },
  /**
   * @param {number[]} coords
   */
  _transformCoordinates(s) {
    const e = this._point.x, i = this._point.y;
    let n = 2;
    return s[0] = e, s[1] = i, this._handleIn && (s[n++] = this._handleIn.x + e, s[n++] = this._handleIn.y + i), this._handleOut && (s[n++] = this._handleOut.x + e, s[n++] = this._handleOut.y + i), s;
  },
  /**
   * If segment's _point, _handlIn or _handleOut updated, should trigger this to refresh relate cache data
   * @param {Vector2} point
   */
  _changed(s) {
    const e = this._path;
    if (!e) return;
    const i = e._curves, n = this._index;
    let r;
    i && ((!s || s === this._point || s === this._handleIn) && (r = n > 0 ? i[n - 1] : e._closed ? i[i.length - 1] : null) && r._changed(), (!s || s === this._point || s === this._handleOut) && (r = i[n]) && r._changed()), e._changed(Kt.SEGMENTS);
  },
  toString() {
    return `Segment{ p:[${this._point.x}, ${this._point.y}], i:[${this._handleIn.x}, ${this._handleIn.y}], o:[${this._handleOut.x}, ${this._handleOut.y}] }`;
  }
};
function _s() {
  this.p0 = new L(), this.p1 = new L(), this.p2 = new L(), this._bounds = null;
}
_s.prototype = {
  constructor: _s,
  /**
   * @param {number} p0x
   * @param {number} p0y
   * @param {number} cx
   * @param {number} cy
   * @param {number} p1x
   * @param {number} p1y
   */
  initN(s, e, i, n, r, h) {
    return this.p0.set(s, e), this.p1.set(i, n), this.p2.set(r, h), this;
  },
  /**
   * @param {number} t
   */
  eval(s) {
    const e = 1 - s;
    return this.p0.clone().scale(e * e).add(
      this.p1.clone().scale(e * 2).add(
        this.p2.clone().scale(s)
      ).scale(s)
    );
  },
  deriv() {
    return new st().initN(
      2 * (this.p1.x - this.p0.x),
      2 * (this.p1.y - this.p0.y),
      2 * (this.p2.x - this.p1.x),
      2 * (this.p2.y - this.p1.y)
    );
  },
  /**
   * @param {Vector2Like} p
   * @param {number} _accuracy
   */
  // eslint-disable-next-line no-unused-vars
  nearest(s, e) {
    const i = this.p1.clone().sub(this.p0), n = this.p1.clone().scale(-2).add(this.p0).add(this.p2), r = this.p0.clone().sub(s), h = r.dot(i), o = 2 * i.length_squared() + r.dot(n), c = 3 * n.dot(i), a = n.length_squared(), _ = zr(h, o, c, a), u = { r_best: null, t_best: 0 };
    let E = !1;
    for (let l = 0, f = _.length; l < f; l++)
      E |= $r(this, s, u, _[l]);
    return E && (xs(s, u, 0, this.p0), xs(s, u, 1, this.p2)), {
      t: u.t_best,
      distance_sq: u.r_best
    };
  },
  getBounds() {
    if (this._bounds == null) {
      const s = [this.p0, this.p1, this.p2];
      let e = s[0].x, i = s[0].y, n = s[0].x, r = s[0].y;
      for (let h = 1; h < 3; h++) {
        const { x: o, y: c } = s[h];
        e = Math.min(e, o), i = Math.min(i, c), n = Math.max(n, o), r = Math.max(r, c);
      }
      this._bounds = new at(e, i, n - e, r - i);
    }
    return this._bounds;
  }
};
function xs(s, e, i, n) {
  const r = n.distance_squared_to(s);
  (Number.isFinite(e.r_best) ? r < e.r_best : !0) && (e.r_best = r, e.t_best = i);
}
function $r(s, e, i, n) {
  return n < 0 || n > 1 ? !0 : (xs(e, i, n, s.eval(n)), !1);
}
J.SUBTRACT + "", J.INTERSECT + "", J.DIFFERENCE + "", J.UNION + "";
function z() {
  this._closed = !1, this._segments = [], this._curves = null, this._bounds = null, this._version = 0, this._length = null, this._area = null, this._overlapsOnly = !1, this._id = ji++;
}
z.prototype = {
  constructor: z,
  toPathData() {
    const s = this._segments, e = s.length, i = Array(6);
    let n = !0, r = 0, h = 0, o = 0, c = 0, a = 0, _ = 0, u = 0, E = 0;
    const l = {
      commands: [],
      vertices: []
    };
    function f(N, T) {
      const { x: O, y: A } = N._point;
      T[0] = O, T[1] = A, T[2] = N._handleIn.x + O, T[3] = N._handleIn.y + A, T[4] = N._handleOut.x + O, T[5] = N._handleOut.y + A;
    }
    function d(N, T) {
      f(N, i), r = i[0], h = i[1], n ? (l.commands.push(1), l.vertices.push(r, h), n = !1) : (a = i[2], _ = i[3], a === r && _ === h && u === o && E === c ? (l.commands.push(2), l.vertices.push(r, h)) : (l.commands.push(4), l.vertices.push(
        u,
        E,
        a,
        _,
        r,
        h
      ))), o = r, c = h, u = i[4], E = i[5];
    }
    if (!e)
      return l;
    for (let N = 0; N < e; N++)
      d(s[N]);
    return this._closed && e > 0 && d(s[0]), this._closed && l.commands.push(5), l;
  },
  /**
   * @param {boolean} absolute
   * @param {number} precision
   */
  toSVG(s = !1, e = 5) {
    ht.setup(e);
    const i = this._segments, n = i.length, r = Array(6);
    let h = !0, o = 0, c = 0, a = 0, _ = 0, u = 0, E = 0, l = 0, f = 0;
    const d = [];
    function N(O, A) {
      const { x: g, y: R } = O._point;
      A[0] = g, A[1] = R, A[2] = O._handleIn.x + g, A[3] = O._handleIn.y + R, A[4] = O._handleOut.x + g, A[5] = O._handleOut.y + R;
    }
    function T(O, A) {
      if (N(O, r), o = r[0], c = r[1], h)
        d.push("M" + ht.pair(o, c)), h = !1;
      else if (u = r[2], E = r[3], u === o && E === c && l === a && f === _) {
        if (!A)
          if (s)
            d.push(`L${ht.pair(o, c)}`);
          else {
            const g = o - a, R = c - _;
            d.push(
              // eslint-disable-next-line no-nested-ternary
              g === 0 ? `v${ht.number(R)}` : R === 0 ? `h${ht.number(g)}` : `l${ht.pair(g, R)}`
            );
          }
      } else
        s ? d.push(
          "C" + ht.pair(l, f) + " " + ht.pair(u, E) + " " + ht.pair(o, c)
        ) : d.push(
          "c" + ht.pair(l - a, f - _) + " " + ht.pair(u - a, E - _) + " " + ht.pair(o - a, c - _)
        );
      a = o, _ = c, l = r[4], f = r[5];
    }
    if (!n)
      return "";
    for (let O = 0; O < n; O++)
      T(i[O], !1);
    return this._closed && n > 0 && T(i[0], !0), this._closed && d.push("z"), d.join("");
  },
  toString() {
    return this._segments.join(", ");
  },
  clear() {
    return this._closed = !1, this._segments.length = 0, this._curves = null, this._bounds = null, this._version = 0, this._length = null, this._area = null, this._overlapsOnly = !1, this._id = ji++, this;
  },
  /**
   * @param {number} tolerance
   */
  close(s = 0) {
    this.setClosed(!0), this.join(this, s);
  },
  /**
   * Joins the path with the other specified path, which will be removed in
   * the process. They can be joined if the first or last segments of either
   * path lie in the same location. Locations are optionally compare with a
   * provide `tolerance` value.
   *
   * If `null` or `this` is passed as the other path, the path will be joined
   * with itself if the first and last segment are in the same location.
   *
   * @param {BezierPath} path
   * @param {number} tolerance
   * @returns {-1 | 1 | 2} -1: failed, +1: joined, +2: joined and closed the path
   */
  join(s, e = 0) {
    const i = e || 0;
    if (s && s !== this) {
      const h = s._segments, o = this.getLastSegment();
      let c = s.getLastSegment();
      if (!c)
        return -1;
      o && o._point.isClose(c._point, i) && s.reverse();
      const a = s.getFirstSegment();
      if (o && o._point.isClose(a._point, i))
        o.setHandleOut(a._handleOut), this._add(h.slice(1));
      else {
        const _ = this.getFirstSegment();
        _ && _._point.isClose(a._point, i) && s.reverse(), c = s.getLastSegment(), _ && _._point.isClose(c._point, i) ? (_.setHandleIn(c._handleIn), this._add(h.slice(0, h.length - 1), 0)) : this._add(h.slice());
      }
      s._closed && this._add([h[0]]), s.remove();
    }
    const n = this.getFirstSegment(), r = this.getLastSegment();
    return n !== r && n._point.isClose(r._point, i) ? (n.setHandleIn(r._handleIn), r.remove(), this.setClosed(!0), 2) : 1;
  },
  /**
   * @param {BezierPath} path
   */
  compare(s) {
    const e = this.getCurves(), i = s.getCurves(), n = e.length, r = i.length;
    if (!n || !r)
      return n === r;
    let h = e[0].getValues();
    const o = [];
    let c = 0, a = 0, _, u;
    for (let d = 0; d < r; d++) {
      const N = i[d].getValues();
      o.push(N);
      const T = Cs(h, N);
      if (T) {
        _ = !d && T[0][0] > 0 ? r - 1 : d, u = T[0][1];
        break;
      }
    }
    const E = _t;
    let l = o[_], f;
    for (; h && l; ) {
      const d = Cs(h, l);
      if (d) {
        const N = d[0][0];
        if (nt(N - a) < E) {
          a = d[1][0], a === 1 && (h = ++c < n ? e[c].getValues() : null, a = 0);
          const T = d[0][1];
          if (nt(T - u) < E) {
            if (f || (f = [_, T]), u = d[1][1], u === 1 && (++_ >= r && (_ = 0), l = o[_] || i[_].getValues(), u = 0), !h)
              return f[0] === _ && f[1] === u;
            continue;
          }
        }
      }
      break;
    }
    return !1;
  },
  /**
   * @param {Segment[]} segments
   */
  setSegments(s) {
    let e = s.length;
    if (this._segments.length = 0, this._curves = null, e > 0) {
      const i = s[e - 1];
      typeof i == "boolean" && (this.setClosed(i), e--), this._add(s);
    }
    return this;
  },
  /**
   * @param {number} index
   */
  removeSegment(s) {
    return this.removeSegments(s, s + 1)[0] || null;
  },
  /**
   * @param {number} start
   * @param {number} end
   * @param {boolean} _includeCurves
   */
  removeSegments(s, e, i = !1) {
    s = s || 0, e = e || this._segments.length;
    const n = this._segments;
    let r = this._curves;
    const h = n.length, o = n.splice(s, e - s), c = o.length;
    if (!c)
      return o;
    for (let a = 0; a < c; a++) {
      const _ = o[a];
      _._index = null, _._path = null;
    }
    for (let a = s, _ = n.length; a < _; a++)
      n[a]._index = a;
    if (r) {
      const a = s > 0 && e === h + (this._closed ? 1 : 0) ? s - 1 : s;
      r = r.splice(a, c);
      for (let _ = r.length - 1; _ >= 0; _--)
        r[_]._path = null;
      i && (o._curves = r.slice(1)), this._adjustCurves(a, a);
    }
    return this._changed(Kt.SEGMENTS), o;
  },
  /**
   * @param {boolean} closed
   */
  setClosed(s) {
    if (this._closed != (s = !!s)) {
      if (this._closed = s, this._curves) {
        const e = this._countCurves();
        this._curves.length = e, s && (this._curves[e - 1] = new C().initWithPathAndSegments(
          this,
          this._segments[e - 1],
          this._segments[0]
        ));
      }
      this._changed(Kt.SEGMENTS);
    }
  },
  /**
   * Specifies whether the path as a whole is oriented clock-wise, by looking
   * at the path's area.
   * Note that self-intersecting paths and sub-paths of different orientation
   * can result in areas that cancel each other out.
   */
  isClockwise() {
    return this.getArea() >= 0;
  },
  /**
   * @param {boolean} clockwise
   */
  setClockwise(s) {
    this.isClockwise() !== !!s && this.reverse();
  },
  isEmpty() {
    return this._segments.length === 0;
  },
  /**
   * The approximate length of the path.
   */
  getLength() {
    if (this._length == null) {
      const s = this.getCurves();
      let e = 0;
      for (let i = 0, n = s.length; i < n; i++)
        e += s[i].getLength();
      this._length = e;
    }
    return this._length;
  },
  /**
   * The area that the path's geometry is covering. Self-intersecting paths
   * can contain sub-areas that cancel each other out.
   */
  getArea() {
    let s = this._area;
    if (s == null) {
      s = 0;
      const e = this._segments, i = this._closed;
      for (let n = 0, r = e.length; n < r; n++) {
        const h = n + 1 === r;
        s += C.getArea(
          C.getValues(
            e[n],
            e[h ? 0 : n + 1],
            // If this is the last curve and the last is not closed,
            // connect with a straight curve and ignore the handles.
            h && !i
          )
        );
      }
      this._area = s;
    }
    return s;
  },
  getFillRule() {
    return "nonzero";
  },
  getFirstSegment() {
    return this._segments[0];
  },
  getLastSegment() {
    return this._segments[this._segments.length - 1];
  },
  /**
   * The curves contained within the path.
   * @returns {CubicBez[]}
   */
  getCurves() {
    if (!this._curves) {
      const s = this._countCurves();
      this._curves = new Array(s);
      for (let e = 0; e < s; e++)
        this._curves[e] = new C().initWithPathAndSegments(
          this,
          this._segments[e],
          this._segments[e + 1] || this._segments[0]
        );
    }
    return this._curves;
  },
  getLastCurve() {
    const s = this.getCurves();
    return s[s.length - 1];
  },
  getPointAt(s) {
    const e = this.getLocationAt(s);
    return e && e.getPoint();
  },
  /**
   * Returns the curve location of the specified offset on the path.
   *
   * @param {number} offset the offset on the path, where `0` is at
   * the beginning of the path and {@link BezierPath#length} at the end
   * @return {CurveLocation} the curve location at the specified offset
   */
  getLocationAt(s) {
    if (typeof s == "number") {
      const e = this.getCurves();
      let i = 0;
      for (let n = 0, r = e.length; n < r; n++) {
        const h = i, o = e[n];
        if (i += o.getLength(), i > s)
          return o.getLocationAt(s - h);
      }
      if (e.length > 0 && s <= this.getLength())
        return new rt().init(e[e.length - 1], 1);
    } else if (s && s.getPath && s.getPath() === this)
      return s;
    return null;
  },
  getBounds() {
    return this._bounds == null && (this._bounds = z.getBounds(this._segments, this._closed)), this._bounds;
  },
  getHandleBounds() {
    return z.getHandleBounds(this._segments, this._closed);
  },
  getInteriorPoint() {
    return nn(this);
  },
  /**
   * @param {Vector2} point
   */
  _contains(s) {
    const e = s.isInside(this.getHandleBounds()) ? this._getWinding(s) : {};
    return e.onPath || !!(this.getFillRule() === "evenodd" ? e.windingL & 1 || e.windingR & 1 : e.winding);
  },
  /**
   * @param {Vector2Like} point
   */
  contains(s) {
    return !!this._contains(s);
  },
  /**
   * @param {boolean} simplify
   * @returns {BezierPath}
   */
  reduce(s = !1) {
    const e = this.getCurves(), i = s ? Et : 0;
    for (let n = e.length - 1; n >= 0; n--) {
      const r = e[n];
      !r.hasHandles() && (!r.hasLength(i) || s && r.isCollinear(r.getNext())) && r.remove();
    }
    return this;
  },
  /**
   * @checked
   */
  reverse() {
    this._segments.reverse();
    for (let s = 0, e = this._segments.length; s < e; s++) {
      const i = this._segments[s], n = i._handleIn;
      i._handleIn = i._handleOut, i._handleOut = n, i._index = s;
    }
    this._curves = null, this._changed(Kt.GEOMETRY);
  },
  /**
   * @param {Transform2D} t
   */
  transform(s) {
    for (let e = 0, i = this._segments.length; e < i; e++) {
      const n = this._segments[e];
      s.xform(n._point, n._point), s.basis_xform(n._handleIn, n._handleIn), s.basis_xform(n._handleOut, n._handleOut);
    }
    return this;
  },
  clone() {
    return ps(this);
  },
  /**
   * @param {BezierPath} path
   * @param {(loc: CurveLocation) => boolean} filterer
   */
  getIntersections(s, e) {
    return tn(this, s, e);
  },
  resolveCrossings() {
    return sn(this);
  },
  reorient(s, e) {
    return en(this, s, e);
  },
  /**
   * @param {number} index
   * @param {Segment} segment1
   */
  insert(s, e) {
    return this._add([e], s);
  },
  /**
   * @param {Segment} segment1
   */
  add(s) {
    return this._add([s])[0];
  },
  /**
   * @param {Segment[]} segs
   * @param {number} [index]
   */
  _add(s, e) {
    const i = !Number.isFinite(e);
    i && (e = this._segments.length);
    const n = s.length;
    for (let r = 0; r < n; r++) {
      let h = s[r];
      h._path && (h = h.clone(), s[r] = h), h._path = this, h._index = e + r;
    }
    if (i)
      Dt(this._segments, s);
    else {
      this._segments.splice.apply(this._segments, [e, 0].concat(s));
      for (let r = e + n, h = this._segments.length; r < h; r++)
        this._segments[r]._index = r;
    }
    if (this._curves) {
      const r = this._countCurves(), h = e > 0 && e + n - 1 === r ? e - 1 : e;
      let o = h;
      const c = Math.min(h + n, r);
      s._curves && (this.curves.splice.apply(this._curves, [h, 0].concat(s._curves)), o += s._curves.length);
      for (let a = o; a < c; a++)
        this._curves.splice(a, 0, new C().initWithPathAndSegments(this, null, null));
      this._adjustCurves(h, c);
    }
    return this._changed(Kt.SEGMENTS), s;
  },
  _remove() {
    return Ms(this);
  },
  remove() {
    return Ms(this);
  },
  _countCurves() {
    const s = this._segments.length;
    return !this._closed && s > 0 ? s - 1 : s;
  },
  /**
   * @param {number} start
   * @param {number} end
   */
  _adjustCurves(s, e) {
    const i = this._segments, n = this._curves;
    let r;
    for (let h = s; h < e; h++)
      r = n[h], r._path = this, r._segment1 = i[h], r._segment2 = i[h + 1] || i[0], r._changed();
    (r = n[this._closed && !s ? i.length - 1 : s - 1]) && (r._segment2 = i[s] || i[0], r._changed()), (r = n[e]) && (r._segment1 = i[e], r._changed());
  },
  /**
   * Returns the winding contribution number of the given point in respect
   * to this PathItem.
   *
   * @param {Vector2} point the location for which to determine the winding
   *     contribution
   * @param {number} [dir=0] the direction in which to determine the
   *     winding contribution, `0`: in x-direction, `1`: in y-direction
   * @param {boolean} closed
   */
  _getWinding(s, e, i) {
    return ls(s, this.getCurves(), e, i);
  },
  /**
   * @param {ChangeFlag} flags
   */
  _changed(s) {
    if (s & xt.GEOMETRY) {
      if (this._bounds = null, this._length = null, this._area = null, s & xt.SEGMENTS)
        this._version++;
      else if (this._curves)
        for (let e = 0, i = this._curves.length; e < i; e++)
          this._curves[e]._changed();
    }
  },
  /** trim path */
  /**
   * @param {number} s start
   * @param {number} e end
   * @param {boolean} [isTrimEndWrapped = false]
   * @returns {BezierPath[]}
   */
  trim(s, e, i = !1) {
    const n = this.getCurves();
    if (n.length === 0)
      return this;
    const r = [];
    let h = 0;
    for (let d = 0; d < n.length; d++) {
      const N = n[d].getLength();
      r.push(N), h += N;
    }
    const o = s * h, c = e * h;
    let a = 0, _ = 0, u = 0, E = 0, l = 0;
    for (let d = 0; d < n.length && (l < o && (a = d, u = o - l), l < c && (_ = d, E = c - l), !(l >= o && l >= c)); d++)
      l += r[d];
    const f = [];
    if (i) {
      const d = [], N = [], T = n[a].getValues(), O = n[_].getValues(), A = C.subdivide(T, C.getTimeAt(T, u))[1], g = C.subdivide(O, C.getTimeAt(O, E))[0];
      d.push(
        new G().initWithPointsN(A[0], A[1], A[0] - A[2], A[1] - A[3], A[2] - A[0], A[3] - A[1]),
        new G().initWithPointsN(A[6], A[7], A[4] - A[6], A[5] - A[7], 0, 0)
      );
      let R = !0;
      for (let I = a + 1; I < n.length; I++)
        R && (n[I]._segment1._handleIn = d.pop()._handleIn, d.push(n[I]._segment1), R = !1), d.push(n[I]._segment2);
      if (this._closed) {
        for (let x = 0; x <= _ - 1; x++)
          R && (n[x]._segment1._handleIn = d.pop()._handleIn, d.push(n[x]._segment1), R = !1), d.push(n[x]._segment2);
        const I = d.pop();
        d.push(
          new G().initWithPointsN(g[0], g[1], I._handleIn.x, I._handleIn.y, g[2] - g[0], g[3] - g[1])
        ), d.push(
          new G().initWithPointsN(g[6], g[7], g[4] - g[6], g[5] - g[7], 0, 0)
        ), f.push(new z().setSegments(d));
      } else {
        let I = !0;
        for (let x = 0; x <= _ - 1; x++)
          I && (N.push(n[x]._segment1), I = !1), N.push(n[x]._segment2);
        if (I)
          N.push(
            new G().initWithPointsN(g[0], g[1], 0, 0, g[2] - g[0], g[3] - g[1])
          );
        else {
          const x = N.pop();
          N.push(
            new G().initWithPointsN(g[0], g[1], x._handleIn.x, x._handleIn.y, g[2] - g[0], g[3] - g[1])
          );
        }
        N.push(
          new G().initWithPointsN(g[6], g[7], g[4] - g[6], g[5] - g[7], g[6] - g[4], g[7] - g[5])
        ), f.push(new z().setSegments(d)), f.push(new z().setSegments(N));
      }
    } else {
      const d = [];
      if (a === _) {
        const N = n[a].getValues(), T = C.getPart(N, C.getTimeAt(N, u), C.getTimeAt(N, E));
        d.push(
          new G().initWithPointsN(T[0], T[1], T[0] - T[2], T[1] - T[3], T[2] - T[0], T[3] - T[1]),
          new G().initWithPointsN(T[6], T[7], T[4] - T[6], T[5] - T[7], 0, 0)
        );
      } else {
        const N = n[a].getValues(), T = n[_].getValues(), O = C.subdivide(N, C.getTimeAt(N, u))[1], A = C.subdivide(T, C.getTimeAt(T, E))[0];
        d.push(
          new G().initWithPointsN(O[0], O[1], O[0] - O[2], O[1] - O[3], O[2] - O[0], O[3] - O[1]),
          new G().initWithPointsN(O[6], O[7], O[4] - O[6], O[5] - O[7], 0, 0)
        );
        let g = !0;
        for (let I = a + 1; I <= _ - 1; I++)
          g && (n[I]._segment1._handleIn = d.pop()._handleIn, d.push(n[I]._segment1), g = !1), d.push(n[I]._segment2);
        const R = d.pop();
        d.push(
          new G().initWithPointsN(A[0], A[1], R._handleIn.x, R._handleIn.y, A[2] - A[0], A[3] - A[1])
        ), d.push(
          new G().initWithPointsN(A[6], A[7], A[4] - A[6], A[5] - A[7], A[6] - A[4], A[7] - A[5])
        );
      }
      f.push(new z().setSegments(d));
    }
    return f;
  },
  /**
   * @param {number} x
   * @param {number} y
   */
  moveTo(s, e) {
    return this._segments.length === 1 && this.removeSegment(0), this._segments.length === 0 && this._add([
      new G().initN(s, e)
    ]), this;
  },
  /**
   * @param {number} x
   * @param {number} y
   */
  lineTo(s, e) {
    this._add([
      new G().initN(s, e)
    ]);
  },
  /**
   * @param {number} h1x
   * @param {number} h1y
   * @param {number} h2x
   * @param {number} h2y
   * @param {number} x
   * @param {number} y
   */
  cubicCurveTo(s, e, i, n, r, h) {
    const o = this.getLastSegment();
    o.setHandleOut(new L(s, e).subtract(o._point)), this._add([
      new G().initWithPointsN(r, h, i - r, n - h)
    ]);
  },
  /**
   * @param {number} hx
   * @param {number} hy
   * @param {number} x
   * @param {number} y
   */
  quadraticCurveTo(s, e, i, n) {
    const r = this.getLastSegment()._point, h = new L(s, e), o = new L(i, n), c = h.clone().add(r.clone().subtract(h).multiply(1 / 3, 1 / 3)), a = h.clone().add(o.clone().subtract(h).multiply(1 / 3, 1 / 3)), _ = o;
    this.cubicCurveTo(
      c.x,
      c.y,
      a.x,
      a.y,
      _.x,
      _.y
    );
  },
  /**
   * @param {number} px
   * @param {number} py
   * @param {{ width: number, height: number }} radius
   * @param {number} rotation
   * @param {number} clockwise
   * @param {number} large
   */
  arcTo(s, e, i, n, r, h) {
    const o = new L(s, e);
    n *= Math.PI / 180;
    const c = this.getLastSegment(), a = c._point, _ = j.isZero;
    if (_(i.width) || _(i.height))
      return this.lineTo(o.x, o.y);
    const u = a.clone().add(o.x, o.y).divide(2, 2), E = a.clone().subtract(u.x, u.y).rotate(-n), l = E.x, f = E.y;
    let d = nt(i.width), N = nt(i.height), T = d * d, O = N * N;
    const A = l * l, g = f * f;
    let R = Ci(A / T + g / O);
    if (R > 1 && (d *= R, N *= R, T = d * d, O = N * N), R = (T * O - T * g - O * A) / (T * g + O * A), nt(R) < Z && (R = 0), R < 0)
      throw new Error("Cannot create an arc with the given arguments");
    const I = (h === r ? -1 : 1) * Ci(R), x = new L(d * f / N, -N * l / d).multiply(I, I).rotate(n).clone().add(u), m = new it().translate(x.x, x.y).rotate_basis(n).scale_basis(d, N), M = new L();
    new it().copy(m).affine_inverse().xform(a, M);
    const P = new L();
    new it().copy(m).affine_inverse().xform(o, P);
    let y = M.angle_to(P) * 180 / Math.PI;
    if (!r && y > 0 ? y -= 360 : r && y < 0 && (y += 360), y) {
      const D = Kn, b = nt(y), w = b >= 360 ? 4 : Math.ceil((b - D) / 90), p = y / w, v = p * Math.PI / 360, X = 4 / 3 * Math.sin(v) / (1 + Math.cos(v)), H = [];
      let F = new L();
      for (let V = 0; V <= w; V++) {
        F.copy(o);
        let U = null;
        if (V < w && (U = M.clone().rotate(90 * Math.PI / 180).multiply(X, X), m ? (m.xform(M, F), m.xform(M.clone().add(U), U), U.subtract(F)) : F = x.clone().add(M)), !V)
          c.setHandleOut(U);
        else {
          const K = M.clone().rotate(-90 * Math.PI / 180).multiply(X, X);
          m && (m.xform(M.clone().add(K), K), K.subtract(F)), H.push(new G().initWithPoints(F, K, U));
        }
        M.rotate(p * Math.PI / 180);
      }
      this._add(H);
    }
  }
};
z.createPath = (s, e) => {
  const i = new z();
  return i._add(s), i._closed = e, i;
};
z.makeRectN = (s, e, i, n) => {
  const r = i / 2, h = n / 2;
  return z.createPath([
    new G().initWithPointsN(s - r, e + h, 0, 0, 0, 0),
    new G().initWithPointsN(s - r, e - h, 0, 0, 0, 0),
    new G().initWithPointsN(s + r, e - h, 0, 0, 0, 0),
    new G().initWithPointsN(s + r, e + h, 0, 0, 0, 0)
  ], !0).transform(new it().translate(r, h));
};
z.makeCircleN = (s, e, i) => {
  const r = i * 0.55228475;
  return z.createPath([
    new G().initWithPointsN(s - i, e, 0, r, 0, -r),
    new G().initWithPointsN(s, e - i, -r, 0, r, 0),
    new G().initWithPointsN(s + i, e, 0, -r, 0, r),
    new G().initWithPointsN(s, e + i, r, 0, -r, 0)
  ], !0);
};
z.getBounds = (s, e) => {
  const i = s[0];
  if (!i)
    return new at();
  const n = new Array(6), r = i._transformCoordinates(new Array(6)), h = r.slice(0, 2), o = h.slice(), c = new Array(2);
  for (let a = 1, _ = s.length; a < _; a++)
    Ri(s[a], n, r, h, o, c);
  return e && Ri(i, n, r, h, o, c), new at(h[0], h[1], o[0] - h[0], o[1] - h[1]);
};
z.getHandleBounds = (s, e) => {
  const i = new Array(6);
  let n = 1 / 0, r = -n, h = n, o = r;
  for (let c = 0, a = s.length; c < a; c++) {
    s[c]._transformCoordinates(i);
    for (let u = 0; u < 6; u += 2) {
      const E = i[u], l = i[u + 1], f = E, d = E, N = l, T = l;
      f < n && (n = f), d > r && (r = d), N < h && (h = N), T > o && (o = T);
    }
  }
  return new at(n, h, r - n, o - h);
};
function tt() {
  this._children = [], this._bounds = new at(), this.version = 0, this._currentPoint = null;
}
tt.prototype = {
  constructor: tt,
  /**
   * @param {boolean} absolute
   * @param {number} precision
   */
  toSVG(s, e) {
    let i = "";
    for (let n = 0, r = this._children.length; n < r; n++) {
      const h = this._children[n];
      i += h.toSVG(s, e);
    }
    return i;
  },
  toPathData() {
    const s = new Gs();
    for (let e = 0, i = this._children.length; e < i; e++) {
      const r = this._children[e].toPathData();
      s.commands = s.commands.concat(r.commands), s.vertices = s.vertices.concat(r.vertices);
    }
    return s;
  },
  /**
   * @param {Transform2D} t
   */
  transform(s) {
    for (let e = 0, i = this._children.length; e < i; e++)
      this._children[e].transform(s);
    return this;
  },
  /**
   * @param {BezierShape} shape
   */
  copy(s) {
    return this.setChildren(s._children), this.version = s.version, this._bounds = s._bounds, this;
  },
  /**
   * @returns {BezierShape}
   */
  clone() {
    return ps(this);
  },
  isEmpty() {
    for (let s = 0, e = this._children.length; s < e; s++)
      if (!this._children[s].isEmpty())
        return !1;
    return !0;
  },
  remove() {
    return Ms(this);
  },
  /**
   * @param {BezierPath} item
   */
  addChild(s) {
    return this.insertChild(void 0, s), this;
  },
  /**
   * @param {number} index
   * @param {BezierPath} item
   */
  insertChild(s, e) {
    return this.insertChildren(s, [e])[0];
  },
  /**
   * @param {BezierPath[]} items
   */
  addChildren(s) {
    return this.insertChildren(this._children.length, s), this;
  },
  /**
   * @param {number} index
   * @param {BezierPath[]} items
   */
  insertChildren(s, e) {
    const i = this._children;
    if (i && e && e.length > 0) {
      e = e.slice();
      const n = {};
      for (let r = e.length - 1; r >= 0; r--) {
        const h = e[r], o = h && h._id;
        !h || n[o] ? e.splice(r, 1) : (h._remove(), n[o] = !0);
      }
      Ss(i, e, s, 0);
      for (let r = 0, h = e.length; r < h; r++) {
        const o = e[r];
        o._parent = this;
      }
    } else
      e = null;
    return e;
  },
  /**
   * @param {boolean} simplify
   */
  reduce(s = !1) {
    for (let e = this._children.length - 1; e >= 0; e--) {
      const i = this._children[e].reduce(s);
      i.isEmpty() && i._remove();
    }
    if (!this._children.length) {
      const e = new tt();
      return this.remove(), e;
    }
    return this;
  },
  getIntersections(s, e) {
    return tn(this, s, e);
  },
  resolveCrossings() {
    return sn(this);
  },
  reorient(s, e) {
    return en(this, s, e);
  },
  /**
   * @param {BezierPath[]} items
   */
  setChildren(s) {
    this.removeChildren(), this.addChildren(s);
  },
  /**
   * @param {number} start
   * @param {number} end
   */
  removeChildren(s, e) {
    if (!this._children) return null;
    s = s || 0, e = e !== void 0 ? e : this._children.length;
    const i = Ss(this._children, null, s, e - s);
    for (let n = i.length - 1; n >= 0; n--)
      i[n]._remove();
    return i;
  },
  /**
   * Specifies whether the path as a whole is oriented clock-wise, by looking
   * at the path's area.
   * Note that self-intersecting paths and sub-paths of different orientation
   * can result in areas that cancel each other out.
   */
  isClockwise() {
    return this.getArea() >= 0;
  },
  /**
   * @param {boolean} clockwise
   */
  setClockwise(s) {
    this.isClockwise() !== !!s && this.reverse();
  },
  /**
   * @returns {number}
   */
  getLength() {
    const s = this._children;
    let e = 0;
    for (let i = 0, n = s.length; i < n; i++)
      e += s[i].getLength();
    return e;
  },
  /**
   * The area that the compound-path's geometry is covering, calculated by
   * getting the area of each sub-path and it adding up.
   * Note that self-intersecting paths and sub-paths of different orientation
   * can result in areas that cancel each other out.
   */
  getArea() {
    const s = this._children;
    let e = 0;
    for (let i = 0, n = s.length; i < n; i++)
      e += s[i].getArea();
    return e;
  },
  /**
   * All the curves contained within the compound-path, from all its child items.
   */
  getCurves() {
    const s = this._children, e = [];
    for (let i = 0, n = s.length; i < n; i++)
      Dt(e, s[i].getCurves());
    return e;
  },
  getFillRule() {
    return "nonzero";
  },
  reverse() {
    const s = this._children;
    for (let e = 0, i = s.length; e < i; e++)
      s[e].reverse();
  },
  getInteriorPoint() {
    return nn(this);
  },
  /**
   * @param {Vector2} point
   */
  _contains(s) {
    const e = s.isInside(this.getBounds()) ? this._getWinding(s) : {};
    return e.onPath || !!(this.getFillRule() === "evenodd" ? e.windingL & 1 || e.windingR & 1 : e.winding);
  },
  /**
   * @param {Vector2Like} point
   */
  contains(s) {
    return !!this._contains(s);
  },
  /**
   * Gets the combined bounds of all specified items.
   * @returns {Rect2}
   */
  getBounds() {
    const s = this.toPathData();
    this._bounds.set(0, 0, 0, 0);
    const { commands: e, vertices: i } = s;
    let n = Number.MAX_SAFE_INTEGER, r = Number.MIN_SAFE_INTEGER, h = Number.MAX_SAFE_INTEGER, o = Number.MIN_SAFE_INTEGER, c = 0, a = 0, _ = 0, u = 0, E = 0, l = 0, f = 0, d = 0, N = 0, T = 0, O = 0;
    const A = () => {
      const g = new at(n, h, r - n, o - h);
      this._bounds.merge_with(g), n = Number.MAX_SAFE_INTEGER, r = Number.MIN_SAFE_INTEGER, h = Number.MAX_SAFE_INTEGER, o = Number.MIN_SAFE_INTEGER;
    };
    for (const g of e)
      switch (a = u, _ = E, g) {
        case W.M:
          a = i[c++], _ = i[c++], u = a, E = _, n = Math.min(n, a), h = Math.min(h, _), r = Math.max(r, a), o = Math.max(o, _), c === 2 ? this._bounds.set(a, _, 0, 0) : A();
          break;
        case W.L:
          u = i[c++], E = i[c++], n = Math.min(n, u), h = Math.min(h, E), r = Math.max(r, u), o = Math.max(o, E);
          break;
        case W.Q:
          {
            l = i[c++], f = i[c++], u = i[c++], E = i[c++];
            const R = new _s().initN(a, _, l, f, u, E).getBounds();
            n = Math.min(n, R.x), h = Math.min(h, R.y), r = Math.max(r, R.x + R.width), o = Math.max(o, R.y + R.height);
          }
          break;
        case W.C:
          {
            d = i[c++], N = i[c++], T = i[c++], O = i[c++], u = i[c++], E = i[c++];
            const I = new C().initWith4PointsN(a, _, d, N, T, O, u, E).getBounds();
            n = Math.min(n, I.x), h = Math.min(h, I.y), r = Math.max(r, I.x + I.width), o = Math.max(o, I.y + I.height);
          }
          break;
      }
    return c > 2 && A(), this._bounds;
  },
  _getWinding(s, e, i) {
    return ls(s, this.getCurves(), e, i);
  },
  /** boolean */
  /**
   * @param {BezierShape} path
   * @returns {BezierShape}
   */
  union(s) {
    return es(this, s, J.UNION);
  },
  /**
   * @param {BezierShape} path
   * @returns {BezierShape}
   */
  intersect(s) {
    return es(this, s, J.INTERSECT);
  },
  /**
   * @param {BezierShape} path
   * @returns {BezierShape}
   */
  subtract(s) {
    return es(this, s, J.SUBTRACT);
  },
  /**
   * @param {BezierShape} path
   * @returns {BezierShape}
   */
  difference(s) {
    return es(this, s, J.DIFFERENCE);
  },
  exclude(s) {
    return this.difference(s);
  },
  /** trim path */
  /**
   * @param {number} start
   * @param {number} end
   * @param {number} offset
   * @param {TrimPathMode} mode
   * @returns {BezierShape}
   */
  trim(s, e, i, n) {
    if (this._children.length === 0)
      return this;
    const [r, h, o] = Qi(s, e, i);
    if (an(r, h) && !o)
      return this._children = [], this._bounds = null, this;
    switch (n) {
      case os.SIMULTANEOUSLY:
        return this._trimSimultaneously(r, h, o);
      case os.INDIVIDUALLY:
      default:
        return this._trimIndividually(r, h, o);
    }
  },
  /**
   * @param {number} start
   * @param {number} end
   * @param {number} offset
   * @param {number} mode
   * @returns {BezierShape}
   */
  trimmed(s, e, i, n) {
    return this.clone().trim(s, e, i, n);
  },
  /**
   * @param {number} s start
   * @param {number} e end
   * @param {boolean} [isTrimEndWrapped = false]
   * @returns {BezierShape}
   */
  // eslint-disable-next-line no-unused-vars
  _trimIndividually(s, e, i = !1) {
    if (this._children.length === 1)
      return this._children = this._children[0].trim(s, e, i), this.reduce(), this;
    const n = [], r = [];
    let h = 0;
    for (let d = 0; d < this._children.length; d++) {
      const T = this._children[d].getCurves();
      for (let O = 0; O < T.length; O++) {
        const A = T[O].getLength();
        A > 0 && (h += A, n.push(A), r.push([d, O]));
      }
    }
    if (r.length === 0)
      return this;
    const o = s * h, c = e * h;
    let a = 0, _ = 0, u = 0, E = 0, l = 0;
    for (let d = 0; d < n.length && (l < o && (a = d, u = o - l), l < c && (_ = d, E = c - l), !(l >= o && l >= c)); d++)
      l += n[d];
    const f = this._children;
    if (this._children = [], i) {
      const [d, N] = r[a], [T, O] = r[_], A = f[d].getCurves()[N].getValues(), g = f[T].getCurves()[O].getValues(), R = C.subdivide(A, C.getTimeAt(A, u))[1], I = C.subdivide(g, C.getTimeAt(g, E))[0];
      let x = d, m = [];
      m.push(
        new G().initWithPointsN(R[0], R[1], R[0] - R[2], R[1] - R[3], R[2] - R[0], R[3] - R[1]),
        new G().initWithPointsN(R[6], R[7], R[4] - R[6], R[5] - R[7], 0, 0)
      );
      let M = !0;
      for (let y = a + 1; y <= n.length + _ - 1; y++) {
        const [D, b] = r[y % n.length], w = f[D].getCurves()[b];
        x !== D ? (this.addChild(z.createPath(m, !1)), x = D, m = [
          w._segment1
        ]) : M && (w._segment1._handleIn = m.pop()._handleIn, m.push(w._segment1), M = !1), m.push(w._segment2);
      }
      x !== T && (this.addChild(z.createPath(m, !1)), x = T, m = [
        new G().initWithPointsN(I[0], I[1], 0, 0, I[2] - I[0], I[3] - I[1])
      ]);
      const P = m.pop();
      m.push(
        new G().initWithPointsN(I[0], I[1], P._handleIn.x, P._handleIn.y, I[2] - I[0], I[3] - I[1])
      ), m.push(
        new G().initWithPointsN(I[6], I[7], I[4] - I[6], I[5] - I[7], I[6] - I[4], I[7] - I[5])
      ), this.addChild(z.createPath(m, !1));
    } else if (a === _) {
      const [d, N] = r[a], T = f[d].getCurves()[N].getValues(), O = C.getPart(T, C.getTimeAt(T, u), C.getTimeAt(T, E));
      this.addChild(z.createPath([
        new G().initWithPointsN(O[0], O[1], 0, 0, O[2] - O[0], O[3] - O[1]),
        new G().initWithPointsN(O[6], O[7], O[4] - O[6], O[5] - O[7], 0, 0)
      ], !1));
    } else {
      const [d, N] = r[a], [T, O] = r[_], A = f[d].getCurves()[N].getValues(), g = f[T].getCurves()[O].getValues(), R = C.subdivide(A, C.getTimeAt(A, u))[1], I = C.subdivide(g, C.getTimeAt(g, E))[0];
      let x = d, m = [];
      m.push(
        new G().initWithPointsN(R[0], R[1], A[0] - A[2], A[1] - A[3], R[2] - R[0], R[3] - R[1]),
        new G().initWithPointsN(R[6], R[7], R[4] - R[6], R[5] - R[7], 0, 0)
      );
      let M = !0;
      for (let y = a + 1; y < _; y++) {
        const [D, b] = r[y % n.length], w = f[D].getCurves()[b];
        x !== D ? (this.addChild(z.createPath(m, !1)), x = D, m = [
          w._segment1
        ]) : M && (w._segment1._handleIn = m.pop()._handleIn, m.push(w._segment1), M = !1), m.push(w._segment2);
      }
      x !== T && (this.addChild(z.createPath(m, !1)), x = T, m = [
        new G().initWithPointsN(I[0], I[1], 0, 0, I[2] - I[0], I[3] - I[1])
      ]);
      const P = m.pop();
      m.push(
        new G().initWithPointsN(I[0], I[1], P._handleIn.x, P._handleIn.y, I[2] - I[0], I[3] - I[1])
      ), m.push(
        new G().initWithPointsN(I[6], I[7], I[4] - I[6], I[5] - I[7], I[6] - I[4], I[7] - I[5])
      ), this.addChild(z.createPath(m, !1));
    }
    return this.reduce(), this;
  },
  /**
   * @param {number} s start
   * @param {number} e end
   * @param {boolean} [isTrimEndWrapped = false]
   * @returns {BezierPath}
   */
  _trimSimultaneously(s, e, i = !1) {
    return this._children = this._children.flatMap(
      (n) => (
        // TODO: might need to update _closed for the trimmed paths
        n.trim(s, e, i)
      )
    ), this.reduce(), this;
  },
  /** drawing */
  /**
   * @param {number} x
   * @param {number} y
   */
  moveTo(s, e) {
    return this.addChild(
      z.createPath([
        new G().initWithPointsN(s, e, 0, 0, 0, 0)
      ]),
      !1
    );
  },
  /**
   * @param {number} x
   * @param {number} y
   */
  lineTo(s, e) {
    return this.getCurrentPath().lineTo(s, e), this;
  },
  /**
   * @param {number} hx
   * @param {number} hy
   * @param {number} x
   * @param {number} y
   */
  quadraticCurveTo(s, e, i, n) {
    return this.getCurrentPath().quadraticCurveTo(s, e, i, n), this;
  },
  /**
   * @param {number} h1x
   * @param {number} h1y
   * @param {number} h2x
   * @param {number} h2y
   * @param {number} x
   * @param {number} y
   */
  cubicCurveTo(s, e, i, n, r, h) {
    return this.getCurrentPath().cubicCurveTo(s, e, i, n, r, h), this;
  },
  /**
   * @param {number} px
   * @param {number} py
   * @param {{ width: number, height: number }} radius
   * @param {number} rotation
   * @param {number} clockwise
   * @param {number} large
   */
  arcTo(s, e, i, n, r, h) {
    return this.getCurrentPath().arcTo(s, e, i, n, r, h), this;
  },
  /**
   * @param {number} tolerance
   * @returns {BezierShape}
   */
  close(s = 0) {
    return this.getCurrentPath().close(s), this;
  },
  /**
   * @returns {BezierPath}
   */
  getFirstPath() {
    return this._children.length === 0 ? null : this._children[0];
  },
  /**
   * @returns {BezierPath}
   */
  getCurrentPath() {
    return this._children.length === 0 ? null : this._children[this._children.length - 1];
  }
};
tt.create = () => new tt();
tt.destroy = (s) => {
  s._children.length = 0, s.version = 0, s._bounds = null;
};
tt.createFromPathData = (s) => {
  const { commands: e, vertices: i } = s, n = new tt();
  let r = W.M;
  const h = new L(), o = new L(), c = new L();
  n.removeChildren();
  for (let a = 0, _ = e.length, u = 0; a < _; a++) {
    const E = e[a];
    switch (r === W.Z && !(E === W.M || E === W.Z) && n.moveTo(c.x, c.y), E) {
      case W.M: {
        c.x = i[u++], c.y = i[u++], n.moveTo(c.x, c.y);
        break;
      }
      case W.L: {
        c.x = i[u++], c.y = i[u++], n.lineTo(c.x, c.y);
        break;
      }
      case W.Q: {
        h.x = i[u++], h.y = i[u++], c.x = i[u++], c.y = i[u++], n.quadraticCurveTo(h.x, h.y, c.x, c.y);
        break;
      }
      case W.C: {
        h.x = i[u++], h.y = i[u++], o.x = i[u++], o.y = i[u++], c.x = i[u++], c.y = i[u++], n.cubicCurveTo(h.x, h.y, o.x, o.y, c.x, c.y);
        break;
      }
      case W.Z: {
        n.close(Z);
        break;
      }
    }
    r = E;
  }
  return n;
};
tt.createFromSVG = (s) => {
  const e = new tt(), i = s && s.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig);
  let n, r = !1, h, o, c = new L(), a = new L();
  function _(E, l) {
    let f = +n[E];
    return r && (f += c[l]), f;
  }
  function u(E) {
    return new L(
      _(E, "x"),
      _(E + 1, "y")
    );
  }
  e.removeChildren();
  for (let E = 0, l = i && i.length; E < l; E++) {
    const f = i[E], d = f[0], N = d.toLowerCase();
    n = f.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
    const T = n && n.length;
    switch (r = d === N, h === "z" && !/[mz]/.test(N) && e.moveTo(c.x, c.y), N) {
      case "m":
      case "l":
        let O = N === "m";
        for (let g = 0; g < T; g += 2)
          c = u(g), e[O ? "moveTo" : "lineTo"](c.x, c.y), O && (a = c, O = !1);
        o = c;
        break;
      case "h":
      case "v":
        const A = N === "h" ? "x" : "y";
        c = c.clone();
        for (let g = 0; g < T; g++)
          c[A] = _(g, A), e.lineTo(c.x, c.y);
        o = c;
        break;
      case "c":
        for (let g = 0; g < T; g += 6) {
          const R = u(g);
          o = u(g + 2), c = u(g + 4), e.cubicCurveTo(
            R.x,
            R.y,
            o.x,
            o.y,
            c.x,
            c.y
          );
        }
        break;
      case "s":
        for (let g = 0; g < T; g += 4) {
          const R = /[cs]/.test(h) ? c.multiply(2, 2).subtract(o) : c;
          o = u(g), c = u(g + 2), e.cubicCurveTo(
            R.x,
            R.y,
            o.x,
            o.y,
            c.x,
            c.y
          ), h = N;
        }
        break;
      case "q":
        for (let g = 0; g < T; g += 4)
          o = u(g), c = u(g + 2), e.quadraticCurveTo(
            o.x,
            o.y,
            c.x,
            c.y
          );
        break;
      case "t":
        for (let g = 0; g < T; g += 2)
          o = /[qt]/.test(h) ? c.multiply(2, 2).subtract(o) : c, c = u(g), e.quadraticCurveTo(
            o.x,
            o.y,
            c.x,
            c.y
          ), h = N;
        break;
      case "a":
        for (let g = 0; g < T; g += 7)
          c = u(g + 5), e.arcTo(
            c.x,
            c.y,
            { width: +n[g], height: +n[g + 1] },
            +n[g + 2],
            +n[g + 4],
            +n[g + 3]
          );
        break;
      case "z":
        e.close(Z), c = a;
        break;
    }
    h = N;
  }
  return e;
};
tt.trimMultiple = (s, e, i, n) => {
  if (n.length === 0)
    return n;
  const [r, h, o] = Qi(s, e, i);
  if (an(r, h) && !o)
    return Array(n.length).fill(new tt());
  let c = 0;
  const a = [];
  for (let T = 0; T < n.length; T++)
    a.push(n[T].getLength()), c += a[T];
  const _ = r * c, u = h * c;
  let E = 0, l = 0, f = 0, d = 0, N = 0;
  for (let T = 0; T < n.length && (N < _ && (E = T, f = _ - N), N < u && (l = T, d = u - N), !(N >= _ && N >= u)); T++)
    N += a[T];
  return E === l ? a.map((T, O) => O !== E ? o ? n[O].clone() : new tt() : n[O].clone()._trimIndividually(f / T, d / T, o)) : a.map((T, O) => (o ? O > l && O < E : O < E || O > l) ? new tt() : O === E ? n[O].clone()._trimIndividually(f / T, 1) : O === l ? n[O].clone()._trimIndividually(0, d / T) : n[O]);
};
function rt() {
  this._time = null, this._point = new L(), this._overlap = !1, this._distance = null, this._offset = null, this._curveOffset = null, this._path = null, this._curve = null, this._segment = null, this._segment1 = null, this._segment2 = null, this._version = 0, this._intersection = null, this._previous = null, this._next = null;
}
rt.prototype = {
  constructor: rt,
  /**
   * @param {CubicBez} curve
   * @param {number} time
   * @param {Vector2} point
   * @param {number} [_overlap]
   * @param {number} [_distance]
   */
  init(s, e, i, n, r) {
    if (e >= 1 - _t) {
      const h = s.getNext();
      h && (e = 0, s = h);
    }
    return this._setCurve(s), this._time = e, this._point = i || s.getPointAtTime(e), this._overlap = n, this._distance = r, this._intersection = null, this._next = null, this._previous = null, this;
  },
  getPoint() {
    return this._point;
  },
  /**
   * The curve that this location belongs to.
   */
  getCurve() {
    const s = this._path;
    return s && s._version !== this._version && (this._time = null, this._offset = null, this._curveOffset = null, this._curve = null), this._curve || this.trySegment(this._segment) || this.trySegment(this._segment1) || this.trySegment(this._segment2.getPrevious());
  },
  /**
   * If path is out of sync, access current curve objects through segment1
   * segment2. Since path splitting or dividing might have happened in
   * the meantime, try segment1's curve, and see if _point lies on it
   * still, otherwise assume it's the curve before segment2.
   * @param {Segment} segment
   */
  trySegment(s) {
    const e = s && s.getCurve();
    if (e && (this._time = e.getTimeOf(this._point)) !== null)
      return this._setCurve(e), e;
  },
  /**
   * The segment of the curve which is closer to the described location.
   */
  getSegment() {
    let s = this._segment;
    if (!s) {
      const e = this.getCurve(), i = this.getTime();
      i === 0 ? s = e._segment1 : i === 1 ? s = e._segment2 : i != null && (s = e.getPartLength(0, i) < e.getPartLength(i, 1) ? e._segment1 : e._segment2), this._segment = s;
    }
    return s;
  },
  getPath() {
    const s = this.getCurve();
    return s && s._path;
  },
  getIndex() {
    const s = this.getCurve();
    return s && s.getIndex();
  },
  getTime() {
    const s = this.getCurve(), e = this._time;
    return s && e == null ? this._time = s.getTimeOf(this._point) : e;
  },
  /**
   * The length of the path from its beginning up to the location described
   * by this object. If the curve is not part of a path, then the length
   * within the curve is returned instead.
   */
  getOffset() {
    let s = this._offset;
    if (s == null) {
      s = 0;
      const e = this.getPath(), i = this.getIndex();
      if (e && i != null) {
        const n = e.getCurves();
        for (let r = 0; r < i; r++)
          s += n[r].getLength();
      }
      this._offset = s += this.getCurveOffset();
    }
    return s;
  },
  /**
   * The length of the curve from its beginning up to the location described
   * by this object.
   */
  getCurveOffset() {
    let s = this._curveOffset;
    if (s == null) {
      const e = this.getCurve(), i = this.getTime();
      this._curveOffset = s = i != null && e && e.getPartLength(0, i);
    }
    return s;
  },
  getTangent() {
    const s = this.getCurve(), e = this.getTime();
    return e != null && s && s.getTangentAt(e, !0);
  },
  hasOverlap() {
    return !!this._overlap;
  },
  /**
   * Checks if the location is an intersection with another curve and is
   * merely touching the other curve, as opposed to crossing it.
   */
  isTouching() {
    const s = this._intersection;
    if (s && this.getTangent().isCollinear(s.getTangent())) {
      const e = this.getCurve(), i = s.getCurve();
      return !(e.isStraight() && i.isStraight() && e.getLine().intersect(i.getLine()));
    }
    return !1;
  },
  isCrossing() {
    var x, m, M, P;
    const s = this._intersection;
    if (!s)
      return !1;
    const e = this.getTime(), i = s.getTime(), n = _t, r = 1 - n, h = e >= n && e <= r, o = i >= n && i <= r;
    if (h && o)
      return !this.isTouching();
    let c = this.getCurve();
    const a = c && e < n ? c.getPrevious() : c;
    let _ = s.getCurve();
    const u = _ && i < n ? _.getPrevious() : _;
    if (e > r && (c = c.getNext()), i > r && (_ = _.getNext()), !a || !c || !u || !_)
      return !1;
    const E = [];
    h || (ss(E, a, !0), ss(E, c, !1)), o || (ss(E, u, !0), ss(E, _, !1));
    const l = this.getPoint(), f = Math.min.apply(Math, E), d = h ? c.getTangentAtTime(e) : (x = c.getPointAt(f)) == null ? void 0 : x.clone().subtract(l), N = h ? d == null ? void 0 : d.clone().negate() : (m = a.getPointAt(-f)) == null ? void 0 : m.clone().subtract(l), T = o ? _.getTangentAtTime(i) : (M = _.getPointAt(f)) == null ? void 0 : M.clone().subtract(l), O = o ? T == null ? void 0 : T.clone().negate() : (P = u.getPointAt(-f)) == null ? void 0 : P.clone().subtract(l), A = (N == null ? void 0 : N.angle()) * 180 / Math.PI, g = (d == null ? void 0 : d.angle()) * 180 / Math.PI, R = (O == null ? void 0 : O.angle()) * 180 / Math.PI, I = (T == null ? void 0 : T.angle()) * 180 / Math.PI;
    return !!(h ? At(A, R, I) ^ At(g, R, I) && At(A, I, R) ^ At(g, I, R) : At(R, A, g) ^ At(I, A, g) && At(R, g, A) ^ At(I, g, A));
  },
  /**
   * Checks whether tow CurveLocation objects are describing the same location
   * on a path, by applying the same tolerances as elsewhere when dealing with
   * curve-time parameters.
   *
   * @param {CurveLocation} loc
   * @param {boolean} _ignoreOther true if the locations are equal
   * @returns {boolean}
   */
  equals(s, e) {
    let i = this === s;
    if (!i && s instanceof rt) {
      const n = this.getCurve(), r = s.getCurve(), h = n._path, o = r._path;
      if (h === o) {
        const c = Et, a = nt(this.getOffset() - s.getOffset()), _ = !e && this._intersection, u = !e && s._intersection;
        i = (a < c || h && nt(h.getLength() - a) < c) && (!_ && !u || _ && u && _.equals(u, !0));
      }
    }
    return i;
  },
  /**
   * @param {Segment} segment
   */
  _setSegment(s) {
    const e = s.getCurve();
    e ? this._setCurve(e) : (this._setPath(s._path), this._segment1 = s, this._segment2 = null), this._segment = s, this._time = s === this._segment1 ? 0 : 1, this._point = s._point.clone();
  },
  /**
   * @param {BezierPath} path
   */
  _setPath(s) {
    this._path = s, this._version = s ? s._version : 0;
  },
  /**
   * @param {CubicBez} curve
   */
  _setCurve(s) {
    this._setPath(s._path), this._curve = s, this._segment = null, this._segment1 = s._segment1, this._segment2 = s._segment2;
  }
};
rt.insert = (s, e, i) => {
  const n = s.length;
  let r = 0, h = n - 1;
  for (; r <= h; ) {
    const o = r + h >>> 1, c = s[o];
    let a = null;
    if (i && (a = e.equals(c) ? c : Ii(s, e, n, o, -1) || Ii(s, e, n, o, 1)))
      return e._overlap && (a._overlap = !0, a._intersection._overlap = !0), a;
    const _ = e.getPath(), u = c.getPath();
    (_ !== u ? _._id - u._id : e.getIndex() + e.getTime() - (c.getIndex() + c.getTime())) < 0 ? h = o - 1 : r = o + 1;
  }
  return s.splice(r, 0, e), e;
};
rt.expand = (s) => {
  const e = s.slice();
  for (let i = s.length - 1; i >= 0; i--)
    rt.insert(e, s[i]._intersection, !1);
  return e;
};
function ss(s, e, i) {
  const n = e.getValues(), r = C.classify(n).roots || C.getPeaks(n), h = r.length, o = C.getLength(
    n,
    i && h ? r[h - 1] : 0,
    !i && h ? r[0] : 1
  );
  s.push(h ? o : o / 32);
}
function At(s, e, i) {
  return typeof s != "number" || typeof e != "number" || typeof i != "number" ? !1 : e < i ? s > e && s < i : s > e || s < i;
}
function Ii(s, e, i, n, r) {
  for (let h = n + r; h >= -1 && h <= i; h += r) {
    const o = s[(h % i + i) % i];
    if (!e.getPoint().isClose(o.getPoint(), Et))
      break;
    if (e.equals(o))
      return o;
  }
  return null;
}
let ji = 1;
const ht = {
  precision: 5,
  multiplier: 1,
  /**
   * @param {number} precision
   */
  setup(s = 5) {
    this.precision = s | 0, this.multiplier = Math.pow(10, this.precision);
  },
  /**
   * Utility function for rendering numbers as strings at a precision of
   * up to the amount of fractional digits.
   * @param {number} val the number to be converted to a string
   */
  number(s) {
    return this.precision < 16 ? Math.round(s * this.multiplier) / this.multiplier : s;
  },
  /**
   * @param {number} val1
   * @param {number} val2
   * @param {string} separator
   */
  pair(s, e, i = ",") {
    return this.number(s) + i + this.number(e);
  }
};
function Ri(s, e, i, n, r, h) {
  s._transformCoordinates(e);
  for (let c = 0; c < 2; c++)
    C._addBounds(
      i[c],
      // prev.point
      i[c + 4],
      // prev.handleOut
      e[c + 2],
      // segment.handleIn
      e[c],
      // segment.point,
      c,
      n,
      r,
      h
    );
  const o = i;
  i = e, e = o;
}
function Qi(s, e, i) {
  const n = As(i);
  let [r, h] = [s, e];
  r > h && ([r, h] = [h, r]), r = Li(r), h = Li(h), r = Math.round((r + n) * 1e4) * 1e-4, h = Math.round((h + n) * 1e4) * 1e-4;
  let o = !1;
  return r > 1 && (r = As(r), o = !o), h > 1 && (h = As(h), o = !o), [r, h, o];
}
function Li(s) {
  return Zr(0, 1, s);
}
function As(s) {
  return s - Math.floor(s);
}
function Zr(s, e, i) {
  return Math.min(e, Math.max(i, s));
}
function Dt(s, e) {
  const i = s, n = e.length;
  if (n < 4096)
    i.push.apply(i, e);
  else {
    const r = i.length;
    i.length += n;
    for (let h = 0; h < n; h++)
      i[r + h] = e[h];
  }
  return i;
}
function Ss(s, e, i, n) {
  const r = e && e.length, h = i === void 0;
  i = h ? s.length : i, i > s.length && (i = s.length);
  for (let o = 0; o < r; o++)
    e[o]._index = i + o;
  if (h)
    return Dt(s, e), [];
  {
    const o = [i, n];
    e && Dt(o, e);
    const c = s.splice.apply(s, o);
    for (let a = 0, _ = c.length; a < _; a++)
      c[a]._index = void 0;
    for (let a = i + r, _ = s.length; a < _; a++)
      s[a]._index = a;
    return c;
  }
}
function Ji(s, e, i) {
  for (let n = 0, r = s.length; n < r; n++)
    e.call(i, s[n], n);
  return i;
}
function Ms(s) {
  const e = s._parent, i = s._index;
  return e ? (Number.isFinite(i) && Ss(e._children, null, i, 1), s._parent = null, !0) : !1;
}
function ps(s) {
  if (s._children) {
    const e = new tt();
    for (let i = 0, n = s._children.length; i < n; i++)
      e.addChild(ps(s._children[i]), !0);
    return e.version = s.version, e;
  } else {
    const e = new z();
    return e.setSegments(s._segments.slice()), e._closed = s._closed, e;
  }
}
function tn(s, e, i, n) {
  const r = s === e || !e;
  return r || s.getBounds().intersects(e.getBounds(), Z) ? C.getIntersections(
    s.getCurves(),
    !r && e.getCurves(),
    i,
    n
  ) : [];
}
function mi(s, e) {
  const i = s && s._intersection;
  return i && i._overlap && i._path === e;
}
const sn = (s) => {
  const e = s._children;
  let i = e || [s], n = !1, r = !1, h = s.getIntersections(null, function(_) {
    return (
      // eslint-disable-next-line no-mixed-operators
      _.hasOverlap() && (n = !0) || _.isCrossing() && (r = !0)
    );
  });
  const o = n && r && [];
  if (h = rt.expand(h), n) {
    const _ = Ds(
      h,
      (u) => u.hasOverlap(),
      o
    );
    for (let u = _.length - 1; u >= 0; u--) {
      const E = _[u], l = E._path, f = E._segment, d = f.getPrevious(), N = f.getNext();
      mi(d, l) && mi(N, l) && (f.remove(), d._handleOut.set(0, 0), N._handleIn.set(0, 0), d._changed(d._handleOut), N._changed(N._handleIn), d !== f && !d.getCurve().hasLength() && (N._handleIn.set(d._handleIn.x, d._handleIn.y), N._changed(N._handleIn), d.remove()));
    }
  }
  r && (Ds(
    h,
    n && ((_) => {
      const u = _.getCurve(), E = _.getSegment(), l = _._intersection, f = l._curve, d = l._segment;
      if (u && f && u._path && f._path)
        return !0;
      E && (E._intersection = null), d && (d._intersection = null);
    }),
    o
  ), o && rn(o), i = hn(
    Ji(
      i,
      function(_) {
        Dt(this, _._segments);
      },
      []
    )
  ));
  const c = i.length;
  let a;
  return c > 1 && e ? (i !== e && s.setChildren(i), a = s) : c === 1 && !e && (i[0] !== s && s.setSegments(i[0].removeSegments()), a = s), a || (a = new tt(), a.addChildren(i), a = a.reduce()), a;
};
function en(s, e, i) {
  const n = s._children;
  return n && n.length ? s.setChildren(
    on(
      s.removeChildren(),
      // Handle both even-odd and non-zero rule.
      (r) => !!(e ? r : r & 1),
      i
    )
  ) : i !== void 0 && s.setClockwise(i), s;
}
function nn(s) {
  const i = s.getBounds().getCenter();
  if (!s.contains(i)) {
    const n = s.getCurves(), r = i.y, h = [], o = [];
    for (let c = 0, a = n.length; c < a; c++) {
      const _ = n[c].getValues(), u = _[1], E = _[3], l = _[5], f = _[7];
      if (r >= $t(u, E, l, f) && r <= Gt(u, E, l, f)) {
        const d = C.getMonoCurves(_);
        for (let N = 0, T = d.length; N < T; N++) {
          const O = d[N], A = O[1], g = O[7];
          if (A !== g && (r >= A && r <= g || r >= g && r <= A)) {
            const R = r === A ? O[0] : r === g ? O[6] : C.solveCubic(O, 1, r, o, 0, 1) === 1 ? C.getPoint(O, o[0]).x : (O[0] + O[6]) / 2;
            h.push(R);
          }
        }
      }
    }
    h.length > 1 && (h.sort((c, a) => c - a), i.x = (h[0] + h[1]) / 2);
  }
  return i;
}
function rn(s) {
  for (let e = s.length - 1; e >= 0; e--)
    s[e].clearHandles();
}
const $t = Math.min, Gt = Math.max, nt = Math.abs, Ci = Math.sqrt, jr = {
  [J.UNION]: { 1: !0, 2: !0 },
  [J.INTERSECT]: { 2: !0 },
  [J.SUBTRACT]: { 1: !0 },
  // exclude only needs -1 to support reorientPaths() when there are
  // no crossings. The actual boolean code uses unsigned winding.
  [J.DIFFERENCE]: { 1: !0, "-1": !0 }
};
function es(s, e, i) {
  const n = Mi(s), r = e && s !== e && Mi(e), h = jr[i];
  h[i - 10] = !0, r && (h[J.SUBTRACT - 10] || h[J.DIFFERENCE - 10]) ^ (r.isClockwise() ^ n.isClockwise()) && r.reverse();
  const o = rt.expand(
    n.getIntersections(r, th)
  ), c = Ds(o), a = Ps(n), _ = r && Ps(r), u = [], E = [];
  let l;
  if (c.length) {
    xi(a, u, E), _ && xi(_, u, E);
    const f = Array(E.length);
    for (let T = 0, O = E.length; T < O; T++)
      f[T] = E[T].getValues();
    const d = $i(
      f,
      f,
      0,
      !0
    ), N = {};
    for (let T = 0; T < E.length; T++) {
      const O = E[T], A = O._path._id;
      N[A] = N[A] || {};
      const g = N[A];
      g[O.getIndex()] = {
        hor: Si(d[T].hor, E),
        ver: Si(d[T].ver, E)
      };
    }
    for (let T = 0, O = c.length; T < O; T++)
      wi(
        c[T]._segment,
        n,
        r,
        N,
        h
      );
    for (let T = 0, O = u.length; T < O; T++) {
      const A = u[T], g = A._intersection;
      A._winding || wi(
        A,
        n,
        r,
        N,
        h
      ), g && g._overlap || (A._path._overlapsOnly = !1);
    }
    l = hn(u, h);
  } else
    l = on(
      // Make sure reorientPaths() never works on original
      // _children arrays by calling paths1.slice()
      _ ? a.concat(_) : a.slice(),
      (f) => !!h[f]
    );
  return Jr(l, !0);
}
function xi(s, e, i) {
  for (let n = 0, r = s.length; n < r; n++) {
    const h = s[n];
    Dt(e, h._segments), Dt(i, h.getCurves()), h._overlapsOnly = !0;
  }
}
function Si(s, e) {
  const i = [];
  for (let n = 0, r = s && s.length; n < r; n++)
    i.push(e[s[n]]);
  return i;
}
function Mi(s, e) {
  let i = s, n = i.clone(!1).reduce(!0);
  {
    const r = Ps(n);
    for (let h = 0, o = r.length; h < o; h++)
      i = r[h], !i._closed && !i.isEmpty() && (i.close(Z), i.getFirstSegment().setHandleIn(new L(0, 0)), i.getLastSegment().setHandleOut(new L(0, 0)));
    n = n.resolveCrossings().reorient(n.getFillRule() === "nonzero", !0);
  }
  return n;
}
function Ds(s, e, i) {
  const n = e && [], r = _t, h = 1 - r;
  let o = !1;
  const c = i || [], a = i && {};
  let _, u, E;
  for (let l = (i && i.length) - 1; l >= 0; l--) {
    const f = i[l];
    f._path && (a[Di(f)] = !0);
  }
  for (let l = s.length - 1; l >= 0; l--) {
    const f = s[l];
    let d = f._time;
    const N = d, T = e && !e(f), O = f._curve;
    let A;
    if (O && (O !== u ? (o = !O.hasHandles() || a && a[Di(O)], _ = [], E = null, u = O) : E >= r && (d /= E)), T) {
      _ && _.push(f);
      continue;
    } else e && n.unshift(f);
    if (E = N, d < r)
      A = O._segment1;
    else if (d > h)
      A = O._segment2;
    else {
      const I = O.divideAtTime(d, !0);
      o && c.push(O, I), A = I._segment1;
      for (let x = _.length - 1; x >= 0; x--) {
        const m = _[x];
        m._time = (m._time - d) / (1 - d);
      }
    }
    f._setSegment(A);
    const g = A._intersection, R = f._intersection;
    if (g) {
      Pi(g, R);
      let I = g;
      for (; I; )
        Pi(I._intersection, g), I = I._next;
    } else
      A._intersection = R;
  }
  return i || rn(c), n || s;
}
function Di(s) {
  return s._path._id + "." + s._segment1._index;
}
function Pi(s, e) {
  let i = s;
  for (; i; ) {
    if (i === e)
      return;
    i = i._previous;
  }
  for (; s._next && s._next !== e; )
    s = s._next;
  if (!s._next) {
    for (; e._previous; )
      e = e._previous;
    s._next = e, e._previous = s;
  }
}
function ls(s, e, i, n, r) {
  const h = Array.isArray(e) ? e : e[i ? "hor" : "ver"], o = i ? 1 : 0, c = o ^ 1, a = [s.x, s.y], _ = a[o], u = a[c], E = 1e-9, l = 1e-6, f = _ - E, d = _ + E;
  let N = 0, T = 0, O = 0, A = 0, g = !1, R = !1, I = 1;
  const x = [];
  let m, M;
  function P(D) {
    const b = D[c + 0], w = D[c + 6];
    if (u < $t(b, w) || u > Gt(b, w))
      return;
    const p = D[o + 0], v = D[o + 2], X = D[o + 4], H = D[o + 6];
    if (b === w) {
      (p < d && H > f || H < d && p > f) && (g = !0);
      return;
    }
    const F = u === b ? 0 : u === w || f > Gt(p, v, X, H) || d < $t(p, v, X, H) ? 1 : C.solveCubic(D, c, u, x, 0, 1) > 0 ? x[0] : 1, V = F === 0 ? p : F === 1 ? H : C.getPoint(D, F)[i ? "y" : "x"], U = b > w ? 1 : -1, K = m[c] > m[c + 6] ? 1 : -1, $ = m[o + 6];
    return u !== b ? (V < f ? O += U : V > d ? A += U : g = !0, V > _ - l && V < _ + l && (I /= 2)) : (U !== K ? p < f ? O += U : p > d && (A += U) : p !== $ && ($ < d && V > d ? (A += U, g = !0) : $ > f && V < f && (O += U, g = !0)), I /= 4), m = D, !r && V > f && V < d && C.getTangent(D, F)[i ? "x" : "y"] === 0 && ls(s, e, !i, n, !0);
  }
  function y(D) {
    const b = D[c + 0], w = D[c + 2], p = D[c + 4], v = D[c + 6];
    if (u <= Gt(b, w, p, v) && u >= $t(b, w, p, v)) {
      const X = D[o + 0], H = D[o + 2], F = D[o + 4], V = D[o + 6], U = f > Gt(X, H, F, V) || d < $t(X, H, F, V) ? [D] : C.getMonoCurves(D, i);
      let K;
      for (let $ = 0, Rt = U.length; $ < Rt; $++)
        if (K = P(U[$]), K)
          return K;
    }
  }
  for (let D = 0, b = h.length; D < b; D++) {
    const w = h[D], p = w._path, v = w.getValues();
    let X;
    if ((!D || h[D - 1]._path !== p) && (m = null, p._closed || (M = C.getValues(
      p.getLastCurve().getSegment2(),
      w.getSegment1(),
      !n
    ), M[c] !== M[c + 6] && (m = M)), !m)) {
      m = v;
      let H = p.getLastCurve();
      for (; H && H !== w; ) {
        const F = H.getValues();
        if (F[c] !== F[c + 6]) {
          m = F;
          break;
        }
        H = H.getPrevious();
      }
    }
    if (X = y(v), X)
      return X;
    if (D + 1 === b || h[D + 1]._path !== p) {
      if (M && (X = y(M)))
        return X;
      g && !O && !A && (O = p.isClockwise(n) ^ i ? 1 : -1, A = O), N += O, T += A, O = 0, A = 0, g && (R = !0, g = !1), M = null;
    }
  }
  return N = nt(N), T = nt(T), {
    winding: Gt(N, T),
    windingL: N,
    windingR: T,
    quality: I,
    onPath: R
  };
}
function wi(s, e, i, n, r) {
  const h = [], o = s;
  let c = 0, a;
  do {
    const l = s.getCurve();
    if (l) {
      const f = l.getLength();
      h.push({ segment: s, curve: l, length: f }), c += f;
    }
    s = s.getNext();
  } while (s && !s._intersection && s !== o);
  const _ = [0.5, 0.25, 0.75];
  a = { winding: 0, quality: -1 };
  const u = 1e-3, E = 1 - u;
  for (let l = 0; l < _.length && a.quality < 0.5; l++) {
    let f = c * _[l];
    for (let d = 0, N = h.length; d < N; d++) {
      const T = h[d], O = T.length;
      if (f <= O) {
        const A = T.curve, g = A._path, R = g._parent, I = R instanceof tt ? R : g, x = j.clamp(A.getTimeAt(f), u, E), m = A.getPointAtTime(x), M = nt(A.getTangentAtTime(x).y) < Math.SQRT1_2;
        let P = null;
        if (r[J.SUBTRACT - 10] && i) {
          const D = (I === e ? i : e)._getWinding(m, M, !0);
          if (I === e && D.winding || I === i && !D.winding) {
            if (D.quality < 1)
              continue;
            P = { winding: 0, quality: 1 };
          }
        }
        P = P || ls(
          m,
          n[g._id][A.getIndex()],
          M,
          !0
        ), P.quality > a.quality && (a = P);
        break;
      }
      f -= O;
    }
  }
  for (let l = h.length - 1; l >= 0; l--)
    h[l].segment._winding = a;
}
function hn(s, e) {
  const i = [], n = [];
  s.sort(function(r, h) {
    const o = r._intersection, c = h._intersection, a = !!(o && o._overlap), _ = !!(c && c._overlap), u = r._path, E = h._path;
    return a ^ _ ? a ? 1 : -1 : !o ^ !c ? o ? 1 : -1 : u !== E ? u._id - E._id : r._index - h._index;
  });
  for (let r = 0, h = s.length; r < h; r++) {
    let o = s[r], c = bt(o, e), a = null, _ = !1, u = !0;
    const E = [];
    let l, f, d;
    if (c && o._path._overlapsOnly) {
      const N = o._path, T = o._intersection._segment._path;
      N.compare(T) && (N.getArea() && i.push(N.clone(!1)), yi(N), yi(T), c = !1);
    }
    for (; c; ) {
      const N = !a, T = Qr(o, N, n, e), O = T.shift();
      _ = !N && (us(o, n) || us(O, n));
      const A = !_ && O;
      if (N && (a = new z(), l = null), _) {
        (o.isFirst() || o.isLast()) && (u = o._path._closed), o._visited = !0;
        break;
      }
      if (A && l && (E.push(l), l = null), l || (A && T.push(o), l = {
        start: a._segments.length,
        crossings: T,
        visited: f = [],
        handleIn: d
      }), A && (o = O), !bt(o, e)) {
        a.removeSegments(l.start);
        for (let R = 0, I = f.length; R < I; R++)
          f[R]._visited = !1;
        f.length = 0;
        do
          o = l && l.crossings.shift(), (!o || !o._path) && (o = null, l = E.pop(), l && (f = l.visited, d = l.handleIn));
        while (l && !bt(o, e));
        if (!o)
          break;
      }
      const g = o.getNext();
      a.add(
        new G().initWithPoints(
          o._point,
          d,
          g && o._handleOut
        )
      ), o._visited = !0, f.push(o), o = g || o._path.getFirstSegment(), d = g && g._handleIn;
    }
    _ && (u && (a.getFirstSegment().setHandleIn(d), a.setClosed(u)), a.getArea() !== 0 && i.push(a));
  }
  return i;
}
function bt(s, e) {
  let i;
  return !!(s && !s._visited && (!e || e[(i = s._winding || {}).winding] && !(e[J.UNION - 10] && i.winding === 2 && i.windingL && i.windingR)));
}
function us(s, e) {
  if (s) {
    for (let i = 0, n = e.length; i < n; i++)
      if (s === e[i])
        return !0;
  }
  return !1;
}
function yi(s) {
  const e = s._segments;
  for (let i = 0, n = e.length; i < n; i++)
    e[i]._visited = !0;
}
function Qr(s, e, i, n) {
  let r = s._intersection;
  const h = r, o = [];
  if (e && (i.length = 0, i[0] = s), r) {
    for (Gi(r, null, s, o, e, i, n); r && r._previous; )
      r = r._previous;
    Gi(r, h, s, o, e, i, n);
  }
  return o;
}
function Gi(s, e, i, n, r, h, o) {
  for (; s && s !== e; ) {
    const c = s._segment, a = c && c._path;
    if (a) {
      const _ = c.getNext() || a.getFirstSegment(), u = _._intersection;
      c !== i && (us(c, h) || us(_, h) || _ && bt(c, o) && (bt(_, o) || u && bt(u._segment, o))) && n.push(c), r && h.push(c);
    }
    s = s._next;
  }
}
function on(s, e, i) {
  const n = s && s.length;
  if (n) {
    const r = Ji(s, function(a, _) {
      this[a._id] = {
        container: null,
        winding: a.isClockwise() ? 1 : -1,
        index: _
      };
    }, {}), h = s.slice().sort((a, _) => nt(_.getArea()) - nt(a.getArea())), o = h[0], c = Xr(
      h,
      null,
      Et
    );
    i == null && (i = o.isClockwise());
    for (let a = 0; a < n; a++) {
      const _ = h[a], u = r[_._id];
      let E = 0;
      const l = c[a];
      if (l) {
        let f = null;
        for (let d = l.length - 1; d >= 0; d--)
          if (l[d] < a) {
            f = f || _.getInteriorPoint();
            const N = h[l[d]];
            if (N.contains(f)) {
              const T = r[N._id];
              E = T.winding, u.winding += E, u.container = T.exclude ? T.container : N;
              break;
            }
          }
      }
      if (e(u.winding) === e(E))
        u.exclude = !0, s[u.index] = null;
      else {
        const f = u.container;
        _.setClockwise(
          f ? !f.isClockwise() : i
        );
      }
    }
  }
  return s;
}
function Jr(s, e) {
  let i = new tt();
  return i.addChildren(s, !0), i = i.reduce(e), i;
}
function th(s) {
  return s.hasOverlap() || s.isCrossing();
}
function Ps(s) {
  return s._children || [s];
}
const cn = 1e-10;
function sh(s, e, i = cn) {
  return s - e >= 0 ? s - e <= i : e - s <= i;
}
function an(s, e) {
  return sh(s, e, cn);
}
function C() {
  this._path = null, this._segment1 = null, this._segment2 = null, this._length = null, this._bounds = null;
}
C.prototype = {
  constructor: C,
  /**
   * @param {Segment} seg1
   * @param {Segment} seg2
   */
  initWithSegments(s, e) {
    return this._segment1 = new G().copy(s), this._segment2 = new G().copy(e), this;
  },
  /**
   * @param {BezierPath} path
   * @param {Segment} seg1
   * @param {Segment} seg2
   */
  initWithPathAndSegments(s, e, i) {
    return this._path = s, this._segment1 = e, this._segment2 = i, this;
  },
  /**
   * initialize with 4 absoluate points
   * @param {Vector2Like} point1
   * @param {Vector2Like} control1
   * @param {Vector2Like} control2
   * @param {Vector2Like} point2
   */
  initWith4Points(s, e, i, n) {
    return this._segment1 = new G().initWithPointsN(
      s.x,
      s.y,
      0,
      0,
      e.x - s.x,
      e.y - s.y
    ), this._segment2 = new G().initWithPointsN(
      n.x,
      n.y,
      i.x - n.x,
      i.y - n.y,
      0,
      0
    ), this;
  },
  /**
   * initialize with 4 points (2 relative handle)
   * @param {Vector2Like} point1
   * @param {Vector2Like} handle1
   * @param {Vector2Like} handle2
   * @param {Vector2Like} point2
   */
  initWithPointsAndHandles(s, e, i, n) {
    return this._segment1 = new G().initWithPoints(s, null, e), this._segment2 = new G().initWithPoints(n, i, null), this;
  },
  /**
   * initialize with 4 numbered points
   * @param {number} x1
   * @param {number} y1
   * @param {number} hx1
   * @param {number} hy1
   * @param {number} hx2
   * @param {number} hy2
   * @param {number} x2
   * @param {number} y2
   */
  initWith4PointsN(s, e, i, n, r, h, o, c) {
    return this._segment1 = new G().initWithPointsN(s, e, 0, 0, i - s, n - e), this._segment2 = new G().initWithPointsN(o, c, r - o, h - c, 0, 0), this;
  },
  /**
   * initialize with 4 numbered points (2 relative handle)
   * @param {number} x1
   * @param {number} y1
   * @param {number} hx1
   * @param {number} hy1
   * @param {number} hx2
   * @param {number} hy2
   * @param {number} x2
   * @param {number} y2
   */
  initWithPointsAndHandlesN(s, e, i, n, r, h, o, c) {
    return this._segment1 = new G().initWithPointsN(s, e, 0, 0, i, n), this._segment2 = new G().initWithPointsN(o, c, r, h, 0, 0), this;
  },
  /**
   * @param {number} dimension
   */
  regularize(s) {
    const e = this.getP0(), i = this.getP1(), n = this.getP2(), r = this.getP3(), h = s * s;
    if (e.distance_squared_to(i) < h) {
      const c = e.distance_squared_to(n);
      if (c >= h)
        i.copy(e).linear_interpolate(n, It(h / c));
      else
        return i.copy(e).linear_interpolate(r, 1 / 3), n.copy(r).linear_interpolate(e, 1 / 3), this.initWith4Points(e, i, n, r);
    }
    if (r.distance_squared_to(n) < h) {
      const c = i.distance_squared_to(n);
      if (c >= h)
        n.copy(r).linear_interpolate(i, It(h / c));
      else
        return i.copy(e).linear_interpolate(r, 1 / 3), n.copy(r).linear_interpolate(e, 1 / 3), this.initWith4Points(e, i, n, r);
    }
    const o = this.detectCusp(s);
    if (o !== wt.None) {
      const c = i.clone().sub(e), a = c.length(), _ = r.clone().sub(n), u = _.length();
      switch (o) {
        case wt.Loop: {
          i.add(c.scale(s / a)), n.sub(_.scale(s / u));
          break;
        }
        case wt.DoubleInflection: {
          a > 2 * s && i.sub(c.scale(s / a)), u > 2 * s && n.add(_.scale(s / u));
          break;
        }
      }
    }
    return this.initWith4Points(e, i, n, r);
  },
  /**
   * @param {number} dimension
   */
  detectCusp(s) {
    const e = this.getP0(), i = this.getP1(), n = this.getP2(), r = this.getP3(), h = i.clone().sub(e), o = n.clone().sub(e), c = r.clone().sub(e), a = n.clone().sub(i), _ = r.clone().sub(n), u = h.cross(o), E = a.cross(_), l = h.cross(c), f = o.cross(c);
    if (u * E > 0 && u * l < 0 && u * f < 0) {
      const d = this.deriv(), N = d.nearest(L.ZERO, 1e-9), T = d.eval(N.t), O = d.deriv().eval(N.t), A = T.cross(O);
      if (ys(N.distance_sq, 3) < ys(A * s, 2)) {
        const g = 3 * u + f - 2 * l, R = -3 * u + l, I = u;
        return R * R - 4 * g * I > 0 ? wt.DoubleInflection : wt.Loop;
      }
    }
    return wt.None;
  },
  deriv() {
    const s = this.getP0(), e = this.getP1(), i = this.getP2(), n = this.getP3();
    return new _s().initN(
      3 * (e.x - s.x),
      3 * (e.y - s.y),
      3 * (i.x - e.x),
      3 * (i.y - e.y),
      3 * (n.x - i.x),
      3 * (n.y - i.y)
    );
  },
  /**
   * @param {number} t
   */
  eval(s) {
    const e = this.getP0(), i = this.getP1(), n = this.getP2(), r = this.getP3(), h = 1 - s, o = new L();
    return o.copy(e).scale(h * h * h).add(
      i.clone().scale(h * h * 3).add(
        n.clone().scale(h * 3).add(
          r.clone().scale(s)
        ).scale(s)
      ).scale(s)
    ), o;
  },
  /**
   * @param {number} w0
   * @param {number} w1
   * @param {number} w2
   * @param {number} w3
   */
  weightsum(s, e, i, n) {
    const r = this.getP0(), h = this.getP1(), o = this.getP2(), c = this.getP3(), a = s * r.x + e * h.x + i * o.x + n * c.x, _ = s * r.y + e * h.y + i * o.y + n * c.y;
    return new L(a, _);
  },
  /**
   * @param {number} param
   */
  getDerivativeAt(s) {
    const [e, i] = [s, 1 - s], n = -3 * i * i, r = 3 * i * i - 6 * e * i, h = -3 * e * e + 6 * e * i, o = 3 * e * e;
    return this.weightsum(n, r, h, o);
  },
  /**
   * @param {number} param
   */
  getSecondDerivativeAt(s) {
    const [e, i] = [s, 1 - s], n = 6 * i, r = -12 * i + 6 * e, h = -12 * e + 6 * i, o = 6 * e;
    return this.weightsum(n, r, h, o);
  },
  /**
   * The arc length of the curve
   * @param {number} accuracy
   */
  arclen(s) {
    return Es(this.getValues(), s, 0);
  },
  /**
   * Solve for the parameter that has the given arc length from the start
   * @param {number} arclen
   * @param {number} accuracy
   */
  invArclen(s, e) {
    if (s <= 0)
      return 0;
    const i = this.arclen(e);
    if (s >= i)
      return 1;
    const n = e / i, r = this.getValues();
    return vr((o) => Es(C.getPart(r, 0, o), e, 0) - s, 0, 1, n, 1, 2, -s, i - s);
  },
  clone() {
    return new C().initWithSegments(this._segment1.clone(), this._segment2.clone());
  },
  remove() {
    let s = !1;
    if (this._path) {
      const e = this._segment2, i = e._handleOut;
      s = e.remove(), s && (this._segment1._handleOut.set(i.x, i.y), this._segment1._changed(this._segment1._handleOut));
    }
    return s;
  },
  /**
   * Divides the curve into two curves at the given curve-time parameter. The
   * curve itself is modified and becomes the first part, the second part is
   * returned as a new curve. If the modified curve belongs to a path item,
   * the second part is also added to the path.
   *
   * @param {number} time the curve-time parameter on the curve at which to
   *     divide
   * @param {boolean} _setHandles
   * @returns the second part of the divided curve, if the offset is
   *     within the valid range, {code null} otherwise.
   */
  divideAtTime(s, e) {
    const i = _t, n = 1 - i;
    let r = null;
    if (s >= i && s <= n) {
      const h = C.subdivide(this.getValues(), s), o = h[0], c = h[1], a = e || this.hasHandles(), _ = this._segment1, u = this._segment2, E = this._path;
      a && (_._handleOut.set(o[2] - o[0], o[3] - o[1]), u._handleIn.set(c[4] - c[6], c[5] - c[7]), _._changed(_._handleOut), u._changed(u._handleIn));
      const l = o[6], f = o[7], d = new G().initWithPoints(
        new L(l, f),
        a && new L(o[4] - l, o[5] - f),
        a && new L(c[2] - l, c[3] - f)
      );
      E ? (E.insert(_._index + 1, d), r = this.getNext()) : (this._segment2 = d, this._changed(), r = new C().initWithSegments(d, u));
    }
    return r;
  },
  /**
   * Clears the curve's handles by setting their coordinates to zero,
   * turning the curve into a straight line.
   */
  clearHandles() {
    this._segment1._handleOut.set(0, 0), this._segment2._handleIn.set(0, 0), this._segment1._changed(this._segment1._handleOut), this._segment2._changed(this._segment2._handleIn);
  },
  getIndex() {
    return this._segment1._index;
  },
  getPrevious() {
    const s = this._path && this._path._curves;
    return s && (s[this._segment1._index - 1] || this._path._closed && s[s.length - 1]) || null;
  },
  getNext() {
    const s = this._path && this._path._curves;
    return s && (s[this._segment1._index + 1] || this._path._closed && s[0]) || null;
  },
  getPoint1() {
    return this._segment1._point;
  },
  getHandle1() {
    return this._segment1._handleOut;
  },
  getHandle2() {
    return this._segment2._handleIn;
  },
  getPoint2() {
    return this._segment2._point;
  },
  getP0() {
    return this._segment1._point;
  },
  getP1() {
    return this._segment1._handleOut.clone().add(this._segment1._point);
  },
  getP2() {
    return this._segment2._handleIn.clone().add(this._segment2._point);
  },
  getP3() {
    return this._segment2._point;
  },
  getLength() {
    return this._length == null && (this._length = C.getLength(this.getValues(), 0, 1)), this._length;
  },
  getSegment1() {
    return this._segment1;
  },
  getSegment2() {
    return this._segment2;
  },
  /**
   * @param {number} from
   * @param {number} to
   */
  getPartLength(s, e) {
    return C.getLength(this.getValues(), s, e);
  },
  /**
   * Returns the curve-time parameter of the specified point if it lies on the
   * curve, `null` otherwise.
   * Note that if there is more than one possible solution in a
   * self-intersecting curve, the first found result is returned.
   *
   * @param {Vector2} point the point on the curve
   * @returns {number} the curve-time parameter of the specified point
   */
  getTimeOf(s) {
    return C.getTimeOf(this.getValues(), s);
  },
  /**
   * @param {number} location
   * @param {boolean} _isTime
   */
  getPointAt(s, e) {
    const i = this.getValues();
    return C.getPoint(
      i,
      e ? s : C.getTimeAt(i, s)
    );
  },
  /**
   * Calculates the point on the curve at the given location.
   * @param {number} time curve-time, a value between 0 and 1
   */
  getPointAtTime(s) {
    return C.getPoint(this.getValues(), s);
  },
  /**
   * Calculates the normalized tangent vector of the curve at the given
   * location.
   * @param {number} time curve-time, a value between 0 and 1
   */
  getTangentAtTime(s) {
    return C.getTangent(this.getValues(), s);
  },
  /**
   * @param {number} location
   * @param {boolean} _isTime
   */
  getTangentAt(s, e) {
    const i = this.getValues();
    return C.getTangent(
      i,
      e ? s : C.getTimeAt(i, s)
    );
  },
  /**
   * Calculates the curve offset at the specified curve-time parameter on
   * the curve.
   *
   * @param {number} t the curve-time parameter on the curve
   * returns the curve offset at the specified the location
   */
  getOffsetAtTime(s) {
    return this.getPartLength(0, s);
  },
  /**
   * Calculates the curve location at the specified offset on the curve.
   *
   * @param {number} offset the offset on the curve
   * @param {boolean} _isTime
   */
  getLocationAt(s, e) {
    return this.getLocationAtTime(e ? s : this.getTimeAt(s));
  },
  /**
   * Calculates the curve location at the specified curve-time parameter on
   * the curve.
   *
   * @param {number} t the curve-time parameter on the curve
   * @returns the curve location at the specified the location
   */
  getLocationAtTime(s) {
    return s != null && s >= 0 && s <= 1 ? new rt().init(this, s) : null;
  },
  /**
   * Calculates the curve-time parameter of the specified offset on the path,
   * relative to the provided start parameter. If offset is a negative value,
   * the parameter is searched to the left of the start parameter. If no start
   * parameter is provided, a default of `0` for positive values of `offset`
   * and `1` for negative values of `offset`.
   *
   * @param {number} offset the offset at which to find the curve-time, in
   *     curve length units
   * @param {number} [start] the curve-time in relation to which the offset is
   *     determined
   * @returns the curve-time parameter at the specified location
   */
  getTimeAt(s, e) {
    return C.getTimeAt(this.getValues(), s, e);
  },
  /**
   * @param {CubicBez} curve
   */
  getIntersections(s) {
    const e = this.getValues(), i = s && s !== this && s.getValues();
    return i ? un(e, i, this, s, []) : _n(e, this, []);
  },
  /**
   * Checks if this curve has any curve handles set.
   */
  hasHandles() {
    return !this._segment1._handleOut.is_zero(Zt) || !this._segment2._handleIn.is_zero(Zt);
  },
  /**
   * Checks if this curve has any length.
   * @param {number} [epsilon=0] the epsilon against which to compare the curve's length
   * @returns true if the curve is longer than the given epsilon
   */
  hasLength(s) {
    return (!this.getPoint1().equals(this.getPoint2()) || this.hasHandles()) && this.getLength() > (s || 0);
  },
  /**
   * @param {CubicBez} curve
   */
  isCollinear(s) {
    return s && this.isStraight() && s.isStraight() && this.getLine().isCollinear(s.getLine());
  },
  isStraight() {
    return C.isStraight(this.getValues(), Et);
  },
  getValues() {
    return C.getValues(this._segment1, this._segment2);
  },
  getBounds() {
    if (this._bounds == null) {
      const s = this.getValues();
      this._bounds = C.getBounds(s);
    }
    return this._bounds;
  },
  /**
   * @returns {Line}
   */
  getLine() {
    return new st().initP(this._segment1._point, this._segment2._point);
  },
  /**
   * Determines the type of cubic Bézier curve via discriminant
   * classification, as well as the curve-time parameters of the associated
   * points of inflection, loops, cusps, etc.
   */
  classify() {
    return C.classify(this.getValues());
  },
  _changed() {
    this._length = null, this._bounds = null;
  },
  toString() {
    return `CubicBez{ s1: ${this._segment1.toString()}, s2: ${this._segment2.toString()} }`;
  }
};
C.getLength = (s, e = 0, i = 1, n) => {
  if (C.isStraight(s)) {
    let r = s;
    i < 1 && (r = C.subdivide(r, i)[0], e /= i), e > 0 && (r = C.subdivide(r, e)[1]);
    const h = r[6] - r[0], o = r[7] - r[1];
    return It(h * h + o * o);
  }
  return j.integrate(n || En(s), e, i, ln(e, i));
};
C.getPart = (s, e, i) => {
  let n = s, r = e, h = i;
  const o = r > h;
  if (o) {
    const c = r;
    r = h, h = c;
  }
  return r > 0 && (n = C.subdivide(n, r)[1]), h < 1 && (n = C.subdivide(n, (h - r) / (1 - r))[0]), o ? [n[6], n[7], n[4], n[5], n[2], n[3], n[0], n[1]] : n;
};
C.getPoint = (s, e) => Wt(s, e, 0, !1);
C.getTangent = (s, e) => Wt(s, e, 1, !0);
C.getWeightedTangent = (s, e) => Wt(s, e, 1, !1);
C.getNormal = (s, e) => Wt(s, e, 2, !0);
C.getWeightedNormal = (s, e) => Wt(s, e, 2, !1);
C.getCurvature = (s, e) => Wt(s, e, 3, !1).x;
C.getTimeOf = (s, e) => {
  const i = new L(s[0], s[1]), n = new L(s[6], s[7]), r = Z, h = Et;
  if ((e.isClose(i, r) ? 0 : e.isClose(n, r) ? 1 : null) === null) {
    const c = [e.x, e.y], a = [];
    for (let _ = 0; _ < 2; _++) {
      const u = C.solveCubic(s, _, c[_], a, 0, 1);
      for (let E = 0; E < u; E++) {
        const l = a[E];
        if (e.isClose(C.getPoint(s, l), h))
          return l;
      }
    }
  }
  return e.isClose(i, h) ? 0 : e.isClose(n, h) ? 1 : null;
};
C.getTimeAt = (s, e, i) => {
  if (i === void 0 && (i = e < 0 ? 1 : 0), e === 0)
    return i;
  const n = Et, r = e > 0, h = r ? i : 0, o = r ? 1 : i, c = En(s), a = C.getLength(s, h, o, c), _ = ws(e) - a;
  if (ws(_) < n)
    return r ? o : h;
  if (_ > n)
    return null;
  const u = e / a;
  let E = 0;
  function l(f) {
    return E += j.integrate(
      c,
      i,
      f,
      ln(i, f)
    ), i = f, E - e;
  }
  return j.findRoot(
    l,
    c,
    i + u,
    h,
    o,
    32,
    Z
  );
};
C.getPeaks = (s) => {
  const e = s[0], i = s[1], n = s[2], r = s[3], h = s[4], o = s[5], c = s[6], a = s[7], _ = -e + 3 * n - 3 * h + c, u = 3 * e - 6 * n + 3 * h, E = -3 * e + 3 * n, l = -i + 3 * r - 3 * o + a, f = 3 * i - 6 * r + 3 * o, d = -3 * i + 3 * r, N = _t, T = 1 - N, O = [];
  return j.solveCubic(
    9 * (_ * _ + l * l),
    9 * (_ * u + f * l),
    2 * (u * u + f * f) + 3 * (E * _ + d * l),
    E * u + f * d,
    // Exclude 0 and 1 as we don't count them as peaks.
    O,
    N,
    T
  ), O.sort();
};
C.getIntersections = (s, e, i, n) => {
  const r = Et, h = !e;
  h && (e = s);
  const o = s.length, c = e.length, a = Array(o), _ = h ? a : Array(c), u = [];
  for (let l = 0; l < o; l++)
    a[l] = s[l].getValues();
  if (!h)
    for (let l = 0; l < c; l++)
      _[l] = e[l].getValues();
  const E = $i(a, _, r);
  for (let l = 0; l < o; l++) {
    const f = s[l], d = a[l];
    h && _n(d, f, u, i);
    const N = E[l];
    if (N)
      for (let T = 0; T < N.length; T++) {
        if (n && u.length)
          return u;
        const O = N[T];
        if (!h || O > l) {
          const A = e[O], g = _[O];
          un(d, g, f, A, u, i);
        }
      }
  }
  return u;
};
C.isStraight = (s) => {
  const e = s[0], i = s[1], n = s[6], r = s[7], h = new L(e, i), o = new L(s[2] - e, s[3] - i), c = new L(s[4] - n, s[5] - r), a = new L(n, r);
  if (o.is_zero(Zt) && c.is_zero(Zt))
    return !0;
  {
    const _ = a.clone().subtract(h);
    if (_.is_zero(Zt))
      return !1;
    if (_.isCollinear(o) && _.isCollinear(c)) {
      const u = new st().initP(h, a), E = Et;
      if (u.getDistance(h.clone().add(o.x, o.y)) < E && u.getDistance(a.clone().add(c.x, c.y)) < E) {
        const l = _.clone().dot(_), f = _.clone().dot(o) / l, d = _.clone().dot(c) / l;
        return f >= 0 && f <= 1 && d <= 0 && d >= -1;
      }
    }
  }
  return !1;
};
C.subdivide = (s, e = 0.5) => {
  const i = s[0], n = s[1], r = s[2], h = s[3], o = s[4], c = s[5], a = s[6], _ = s[7], u = 1 - e, E = u * i + e * r, l = u * n + e * h, f = u * r + e * o, d = u * h + e * c, N = u * o + e * a, T = u * c + e * _, O = u * E + e * f, A = u * l + e * d, g = u * f + e * N, R = u * d + e * T, I = u * O + e * g, x = u * A + e * R;
  return [
    [i, n, E, l, O, A, I, x],
    // left
    [I, x, g, R, N, T, a, _]
    // right
  ];
};
C.getValues = (s, e, i) => {
  const n = s._point, r = s._handleOut, h = e._handleIn, o = e._point, c = n.x, a = n.y, _ = o.x, u = o.y;
  return i ? [
    c,
    a,
    c,
    a,
    _,
    u,
    _,
    u
  ] : [
    c,
    a,
    c + r.x,
    a + r.y,
    _ + h.x,
    u + h.y,
    _,
    u
  ];
};
C.getArea = (s) => {
  const e = s[0], i = s[1], n = s[2], r = s[3], h = s[4], o = s[5], c = s[6], a = s[7];
  return 3 * ((a - i) * (n + h) - (c - e) * (r + o) + r * (e - h) - n * (i - o) + a * (h + e / 3) - c * (o + i / 3)) / 20;
};
C.getBounds = (s) => {
  const e = s.slice(0, 2), i = e.slice(), n = [0, 0];
  for (let r = 0; r < 2; r++)
    C._addBounds(s[r], s[r + 2], s[r + 4], s[r + 6], r, e, i, n);
  return new at(e[0], e[1], i[0] - e[0], i[1] - e[1]);
};
C._addBounds = (s, e, i, n, r, h, o, c) => {
  const a = h[r], _ = o[r];
  if (s < a || e < a || i < a || n < a || s > _ || e > _ || i > _ || n > _)
    if (e < s != e < n && i < s != i < n)
      ns(s, r, h, o), ns(n, r, h, o);
    else {
      const u = 3 * (e - i) - s + n, E = 2 * (s + i) - 4 * e, l = e - s, f = j.solveQuadratic(u, E, l, c), d = _t, N = 1 - d;
      ns(n, r, h, o);
      for (let T = 0; T < f; T++) {
        const O = c[T], A = 1 - O;
        d <= O && O <= N && ns(
          A * A * A * s + 3 * A * A * O * e + 3 * A * O * O * i + O * O * O * n,
          r,
          h,
          o
        );
      }
    }
};
C.solveCubic = (s, e, i, n, r, h) => {
  const o = s[e], c = s[e + 2], a = s[e + 4], _ = s[e + 6];
  let u = 0;
  if (!(o < i && _ < i && c < i && a < i || o > i && _ > i && c > i && a > i)) {
    const E = 3 * (c - o), l = 3 * (a - c) - E, f = _ - o - E - l;
    u = j.solveCubic(f, l, E, o - i, n, r, h);
  }
  return u;
};
C.getMonoCurves = (s, e) => {
  const i = [], n = e ? 0 : 1, r = s[n + 0], h = s[n + 2], o = s[n + 4], c = s[n + 6];
  if (r >= h == h >= o && h >= o == o >= c || C.isStraight(s))
    i.push(s);
  else {
    const a = 3 * (h - o) - r + c, _ = 2 * (r + o) - 4 * h, u = h - r, E = _t, l = 1 - E, f = [], d = j.solveQuadratic(a, _, u, f, E, l);
    if (!d)
      i.push(s);
    else {
      f.sort();
      let N = f[0], T = C.subdivide(s, N);
      i.push(T[0]), d > 1 && (N = (f[1] - N) / (1 - N), T = C.subdivide(T[1], N), i.push(T[0])), i.push(T[1]);
    }
  }
  return i;
};
C.classify = (s) => {
  const e = s[0], i = s[1], n = s[2], r = s[3], h = s[4], o = s[5], c = s[6], a = s[7], _ = e * (a - o) + i * (h - c) + c * o - a * h, u = n * (i - a) + r * (c - e) + e * a - i * c;
  let l = 3 * (h * (r - i) + o * (e - n) + n * i - r * e), f = l - u, d = f - u + _;
  const N = It(d * d + f * f + l * l), T = N === 0 ? 0 : 1 / N, O = j.isZero;
  if (d *= T, f *= T, l *= T, O(d))
    return O(f) ? is(O(l) ? ft.line : ft.quadratic) : is(ft.serpentine, l / (3 * f));
  const A = 3 * f * f - 4 * d * l;
  if (O(A))
    return is(ft.cusp, f / (2 * d));
  const g = A > 0 ? It(A / 3) : It(-A), R = 2 * d;
  return is(
    A > 0 ? ft.serpentine : ft.loop,
    // 1. / 2.
    (f + g) / R,
    (f - g) / R
  );
};
const pt = Math.min, St = Math.max, ws = Math.abs, eh = Math.ceil, ys = Math.pow, It = Math.sqrt, ih = Math.atan2;
function is(s, e, i) {
  const n = e !== void 0;
  let r = n && e > 0 && e < 1, h = n && i > 0 && i < 1, o = s;
  n && (!(r || h) || o === ft.loop) && !(r && h) && (o = ft.arch, r = !1, h = !1);
  let c = null;
  return (r || h) && (r && h ? c = e < i ? [e, i] : [i, e] : c = [r ? e : i]), {
    type: o,
    roots: c
  };
}
function Ht(s, e, i, n, r, h, o) {
  const c = !o && i.getPrevious() === r, a = !o && i !== r && i.getNext() === r, _ = _t, u = 1 - _;
  if (n !== null && n >= (c ? _ : 0) && n <= (a ? u : 1) && h !== null && h >= (a ? _ : 0) && h <= (c ? u : 1)) {
    const E = new rt().init(i, n, null, o), l = new rt().init(r, h, null, o);
    E._intersection = l, l._intersection = E, (!e || e(E)) && rt.insert(s, E, !0);
  }
}
function nh(s, e, i, n, r, h) {
  const o = st.intersect(
    s[0],
    s[1],
    s[6],
    s[7],
    e[0],
    e[1],
    e[6],
    e[7]
  );
  o && Ht(
    r,
    h,
    i,
    C.getTimeOf(s, o),
    n,
    C.getTimeOf(e, o)
  );
}
function _n(s, e, i, n) {
  const r = C.classify(s);
  if (r.type === ft.loop) {
    const h = r.roots;
    Ht(
      i,
      n,
      e,
      h[0],
      e,
      h[1]
    );
  }
  return i;
}
function un(s, e, i, n, r, h) {
  const o = Z;
  if (St(s[0], s[2], s[4], s[6]) + o > pt(e[0], e[2], e[4], e[6]) && pt(s[0], s[2], s[4], s[6]) - o < St(e[0], e[2], e[4], e[6]) && St(s[1], s[3], s[5], s[7]) + o > pt(e[1], e[3], e[5], e[7]) && pt(s[1], s[3], s[5], s[7]) - o < St(e[1], e[3], e[5], e[7])) {
    const c = Cs(s, e);
    if (c)
      for (let a = 0; a < 2; a++) {
        const _ = c[a];
        Ht(
          r,
          h,
          i,
          _[0],
          n,
          _[1],
          !0
        );
      }
    else {
      const a = C.isStraight(s), _ = C.isStraight(e), u = a && _, E = a && !_, l = r.length;
      if ((u ? nh : a || _ ? hh : mt)(
        E ? e : s,
        E ? s : e,
        E ? n : i,
        E ? i : n,
        r,
        h,
        E,
        // Define the defaults for these parameters of
        // addCurveIntersections():
        // recursion, calls, tMin, tMax, uMin, uMax
        0,
        0,
        0,
        1,
        0,
        1
      ), !u || r.length === l)
        for (let f = 0; f < 4; f++) {
          const d = f >> 1, N = f & 1, T = d * 6, O = N * 6, A = new L(s[T], s[T + 1]), g = new L(e[O], e[O + 1]);
          A.isClose(g, o) && Ht(
            r,
            h,
            i,
            d,
            n,
            N
          );
        }
    }
  }
  return r;
}
function ns(s, e, i, n) {
  const r = s, h = s;
  r < i[e] && (i[e] = r), h > n[e] && (n[e] = h);
}
function Wt(s, e, i, n) {
  if (e == null || e < 0 || e > 1)
    return null;
  const r = s[0], h = s[1];
  let o = s[2], c = s[3], a = s[4], _ = s[5];
  const u = s[6], E = s[7], l = j.isZero;
  l(o - r) && l(c - h) && (o = r, c = h), l(a - u) && l(_ - E) && (a = u, _ = E);
  const f = 3 * (o - r), d = 3 * (a - o) - f, N = u - r - f - d, T = 3 * (c - h), O = 3 * (_ - c) - T, A = E - h - T - O;
  let g, R;
  if (i === 0)
    g = e === 0 ? r : e === 1 ? u : ((N * e + d) * e + f) * e + r, R = e === 0 ? h : e === 1 ? E : ((A * e + O) * e + T) * e + h;
  else {
    const I = _t, x = 1 - I;
    if (e < I ? (g = f, R = T) : e > x ? (g = 3 * (u - a), R = 3 * (E - _)) : (g = (3 * N * e + 2 * d) * e + f, R = (3 * A * e + 2 * O) * e + T), n) {
      g === 0 && R === 0 && (e < I || e > x) && (g = a - o, R = _ - c);
      const m = It(g * g + R * R);
      m && (g /= m, R /= m);
    }
    if (i === 3) {
      const m = 6 * N * e + 2 * d, M = 6 * A * e + 2 * O, P = ys(g * g + R * R, 3 / 2);
      g = P === 0 ? 0 : (g * M - R * m) / P, R = 0;
    }
  }
  return i === 2 ? new L(R, -g) : new L(g, R);
}
function mt(s, e, i, n, r, h, o, c, a, _, u, E, l) {
  if (++a >= 4096 || ++c >= 40)
    return a;
  const f = 1e-9, d = e[0], N = e[1], T = e[6], O = e[7], A = st.getSignedDistance, g = A(d, N, T, O, e[2], e[3]), R = A(d, N, T, O, e[4], e[5]), I = g * R > 0 ? 3 / 4 : 4 / 9, x = I * pt(0, g, R), m = I * St(0, g, R), M = A(d, N, T, O, s[0], s[1]), P = A(d, N, T, O, s[2], s[3]), y = A(d, N, T, O, s[4], s[5]), D = A(d, N, T, O, s[6], s[7]), b = rh(M, P, y, D), w = b[0], p = b[1];
  let v, X;
  if (g === 0 && R === 0 && M === 0 && P === 0 && y === 0 && D === 0 || (v = pi(w, p, x, m)) == null || (X = pi(w.reverse(), p.reverse(), x, m)) == null)
    return a;
  const H = _ + (u - _) * v, F = _ + (u - _) * X;
  let V, U;
  if (St(l - E, F - H) < f)
    V = (H + F) / 2, U = (E + l) / 2, Ht(
      r,
      h,
      o ? n : i,
      o ? U : V,
      o ? i : n,
      o ? V : U
    );
  else {
    s = C.getPart(s, v, X);
    const K = l - E;
    if (X - v > 0.8)
      if (F - H > K) {
        const $ = C.subdivide(s, 0.5);
        V = (H + F) / 2, a = mt(
          e,
          $[0],
          n,
          i,
          r,
          h,
          !o,
          c,
          a,
          E,
          l,
          H,
          V
        ), a = mt(
          e,
          $[1],
          n,
          i,
          r,
          h,
          !o,
          c,
          a,
          E,
          l,
          V,
          F
        );
      } else {
        const $ = C.subdivide(e, 0.5);
        U = (E + l) / 2, a = mt(
          $[0],
          s,
          n,
          i,
          r,
          h,
          !o,
          c,
          a,
          E,
          U,
          H,
          F
        ), a = mt(
          $[1],
          s,
          n,
          i,
          r,
          h,
          !o,
          c,
          a,
          U,
          l,
          H,
          F
        );
      }
    else
      K === 0 || K >= f ? a = mt(
        e,
        s,
        n,
        i,
        r,
        h,
        !o,
        c,
        a,
        E,
        l,
        H,
        F
      ) : a = mt(
        s,
        e,
        i,
        n,
        r,
        h,
        o,
        c,
        a,
        H,
        F,
        E,
        l
      );
  }
  return a;
}
function rh(s, e, i, n) {
  const r = [0, s], h = [1 / 3, e], o = [2 / 3, i], c = [1, n], a = e - (2 * s + n) / 3, _ = i - (s + 2 * n) / 3;
  let u;
  if (a * _ < 0)
    u = [[r, h, c], [r, o, c]];
  else {
    const E = a / _;
    u = [
      // p2 is inside, the hull is a triangle.
      // eslint-disable-next-line no-nested-ternary
      E >= 2 ? [r, h, c] : E <= 0.5 ? [r, o, c] : [r, h, o, c],
      // Line [p0, p3] is part of the hull.
      [r, c]
    ];
  }
  return (a || _) < 0 ? u.reverse() : u;
}
function pi(s, e, i, n) {
  return s[0][1] < i ? bi(s, !0, i) : e[0][1] > n ? bi(e, !1, n) : s[0][0];
}
function bi(s, e, i) {
  let n = s[0][0], r = s[0][1];
  for (let h = 1, o = s.length; h < o; h++) {
    const c = s[h][0], a = s[h][1];
    if (e ? a >= i : a <= i)
      return a === i ? c : n + (i - r) * (c - n) / (a - r);
    n = c, r = a;
  }
  return null;
}
const En = (s) => {
  const e = s[0], i = s[1], n = s[2], r = s[3], h = s[4], o = s[5], c = s[6], a = s[7], _ = 9 * (n - h) + 3 * (c - e), u = 6 * (e + h) - 12 * n, E = 3 * (n - e), l = 9 * (r - o) + 3 * (a - i), f = 6 * (i + o) - 12 * r, d = 3 * (r - i);
  return function(N) {
    const T = (_ * N + u) * N + E, O = (l * N + f) * N + d;
    return It(T * T + O * O);
  };
}, ln = (s, e) => St(2, pt(16, eh(ws(e - s) * 32)));
function hh(s, e, i, n, r, h, o) {
  const c = e[0], a = e[1], _ = e[6], u = e[7], E = oh(s, c, a, _ - c, u - a);
  for (let l = 0, f = E.length; l < f; l++) {
    const d = E[l], N = C.getPoint(s, d), T = C.getTimeOf(e, N);
    T !== null && Ht(
      r,
      h,
      o ? n : i,
      o ? T : d,
      o ? i : n,
      o ? d : T
    );
  }
}
function oh(s, e, i, n, r) {
  const h = j.isZero;
  if (h(n) && h(r)) {
    const E = C.getTimeOf(s, new L(e, i));
    return E === null ? [] : [E];
  }
  const o = ih(-r, n), c = Math.sin(o), a = Math.cos(o), _ = [], u = [];
  for (let E = 0; E < 8; E += 2) {
    const l = s[E] - e, f = s[E + 1] - i;
    _.push(
      l * a - f * c,
      l * c + f * a
    );
  }
  return C.solveCubic(_, 1, 0, u, 0, 1), u;
}
const ch = [
  0.362683783378362,
  -0.1834346424956498,
  0.362683783378362,
  0.1834346424956498,
  0.3137066458778873,
  -0.525532409916329,
  0.3137066458778873,
  0.525532409916329,
  0.2223810344533745,
  -0.7966664774136267,
  0.2223810344533745,
  0.7966664774136267,
  0.1012285362903763,
  -0.9602898564975363,
  0.1012285362903763,
  0.9602898564975363
], ah = [
  0.362683783378362,
  0.1834346424956498,
  0.3137066458778873,
  0.525532409916329,
  0.2223810344533745,
  0.7966664774136267,
  0.1012285362903763,
  0.9602898564975363
], _h = [
  0.1894506104550685,
  0.0950125098376374,
  0.1826034150449236,
  0.2816035507792589,
  0.1691565193950025,
  0.4580167776572274,
  0.1495959888165767,
  0.6178762444026438,
  0.1246289712555339,
  0.755404408355003,
  0.0951585116824928,
  0.8656312023878318,
  0.0622535239386479,
  0.9445750230732326,
  0.0271524594117541,
  0.9894009349916499
], uh = [
  0.1279381953467522,
  0.0640568928626056,
  0.1258374563468283,
  0.1911188674736163,
  0.1216704729278034,
  0.3150426796961634,
  0.1155056680537256,
  0.4337935076260451,
  0.1074442701159656,
  0.5454214713888396,
  0.0976186521041139,
  0.6480936519369755,
  0.0861901615319533,
  0.7401241915785544,
  0.0733464814110803,
  0.820001985973903,
  0.0592985849154368,
  0.8864155270044011,
  0.0442774388174198,
  0.9382745520027328,
  0.0285313886289337,
  0.9747285559713095,
  0.0123412297999872,
  0.9951872199970213
];
function Es(s, e, i) {
  const [
    n,
    r,
    h,
    o,
    c,
    a,
    _,
    u
  ] = s, E = _ - n, l = u - r, f = h - n, d = o - r, N = c - h, T = a - o, O = _ - c, A = u - a, g = Math.hypot(f, d) + Math.hypot(N, T) + Math.hypot(O, A) - Math.hypot(E, l), R = N - f, I = T - d, x = O - N, m = A - T, M = 0.25 * (f + O) + 0.5 * N, P = 0.25 * (d + A) + 0.5 * T, y = 0.5 * (x + R), D = 0.5 * (m + I), b = 0.25 * (x - R), w = 0.25 * (m - I), p = ch;
  let v = 0;
  for (let V = 0; V < p.length; V += 2) {
    const U = p[V + 1], K = M + y * U + b * (U * U), $ = P + D * U + w * (U * U), Rt = y + b * (2 * U), Qt = D + w * (2 * U);
    v += p[V] * (Rt * Rt + Qt * Qt) / (K * K + $ * $);
  }
  const X = v * v * v;
  let H = null;
  if (Math.min(X * 25e-7, 0.03) * g < e)
    H = ah;
  else if (Math.min(X * X * 15e-12, 9e-3) * g < e)
    H = _h;
  else if (Math.min(X * X * X * 35e-17, 35e-4) * g < e || i >= 20)
    H = uh;
  else {
    const [V, U] = C.subdivide(s, 0.5);
    return Es(V, e * 0.5, i + 1) + Es(U, e * 0.5, i + 1);
  }
  let F = 0;
  for (let V = 0; V < H.length; V += 2) {
    const U = H[V + 1], K = H[V], $ = M + b * (U * U), Rt = P + w * (U * U), Qt = Math.hypot($ + y * U, Rt + D * U), fn = Math.hypot($ - y * U, Rt - D * U);
    F += K * (Qt + fn);
  }
  return 1.5 * F;
}
const Eh = {
  FLOAT: (s, e, i) => e + (i - e) * s,
  ARRAY: (s, e, i) => e.map((n, r) => n + (i[r] - n) * s),
  VERTICES: (s, e, i) => e.map((n) => {
    const r = i.find((h) => h.id === n.id);
    return r ? {
      id: n.id,
      pos: [n.pos[0] + (r.pos[0] - n.pos[0]) * s, n.pos[1] + (r.pos[1] - n.pos[1]) * s]
    } : (console.warn(`Vertex ${n.id} not found in interpolate vertices`), n);
  }),
  MOTION_PATH: (s, e, i, n) => {
    const r = [e.pos[0], e.pos[1]], h = [i.pos[0], i.pos[1]], o = e.out.slice(0, 2), c = i.in.slice(0, 2), a = o.every((E) => !E) ? null : [r[0] + o[0], r[1] + o[1]], _ = c.every((E) => !E) ? null : [h[0] + c[0], h[1] + c[1]];
    if (!a && !_) {
      const E = h[0] - r[0], l = h[1] - r[1], [f, d] = vi(s, r[0], r[1], h[0], h[1]);
      if (E || l) {
        const N = Math.atan2(l, E);
        return {
          pos: [f, d],
          in: [0, 0],
          out: [0, 0],
          orientRotation: N
        };
      }
      return {
        pos: [f, d],
        in: [0, 0],
        out: [0, 0],
        orientRotation: 0
      };
    } else {
      const E = [...r, ...o, ...c, ...h], l = new C().initWithPointsAndHandlesN(
        E[0],
        E[1],
        E[2],
        E[3],
        E[4],
        E[5],
        E[6],
        E[7]
      ), f = l.getLength(), d = f * s;
      if (s < 0) {
        const N = l.getPointAtTime(0);
        if (!N)
          throw new Error("pos is null");
        const T = f * Math.abs(n[1]), O = l.getTangentAtTime(0);
        if (!O)
          throw new Error("tangent is null");
        const A = Math.atan2(O.y, O.x);
        return N.add(O.scale(T * s)), {
          pos: [N.x, N.y],
          in: [0, 0],
          out: [0, 0],
          orientRotation: A
        };
      } else if (s > 1) {
        const N = l.getPointAtTime(1);
        if (!N)
          throw new Error("pos is null");
        if (!n[3])
          throw new Error("easing[3] is undefined");
        const T = f * (n[3] - 1), O = l.getTangentAtTime(1);
        if (!O)
          throw new Error("tangent is null");
        const A = Math.atan2(O.y, O.x);
        return N.add(O.scale(T * (s - 1))), {
          pos: [N.x, N.y],
          in: [0, 0],
          out: [0, 0],
          orientRotation: A
        };
      } else {
        const N = l.getTimeAt(d);
        if (N === null)
          throw new Error("t is null");
        const T = l.getPointAtTime(N);
        if (!T)
          throw new Error("pos is null");
        const O = l.getTangentAtTime(N);
        if (!O)
          throw new Error("tangent is null");
        const A = Math.atan2(O.y, O.x);
        return {
          pos: [T.x, T.y],
          in: [0, 0],
          out: [0, 0],
          orientRotation: A
        };
      }
    }
  },
  CONTENT_ANCHOR: (s, e, i) => ({
    contentAnchorX: e.contentAnchorX + (i.contentAnchorX - e.contentAnchorX) * s,
    contentAnchorY: e.contentAnchorY + (i.contentAnchorY - e.contentAnchorY) * s
  }),
  PAINT: (s, e, i) => {
    var r, h, o, c, a, _, u, E, l, f, d, N;
    if (e.type !== i.type)
      return s > 0 ? i : e;
    const n = {
      type: e.type,
      color: e.color ? [...e.color] : [0, 0, 0, 1],
      // Default to black if color doesn't exist
      gradient: {
        stops: [],
        transform: e.gradient ? e.gradient.transform : [0, -1, 1, 0, 0, 1]
      },
      image: {
        id: (r = e.image) == null ? void 0 : r.id,
        mode: ((h = e.image) == null ? void 0 : h.mode) || 0
      }
    };
    switch (e.type) {
      case gt.SOLID: {
        const T = e.color || [0, 0, 0, 1], O = i.color || [0, 0, 0, 1];
        n.color = [
          T[0] + (O[0] - T[0]) * s,
          T[1] + (O[1] - T[1]) * s,
          T[2] + (O[2] - T[2]) * s,
          T[3] + (O[3] - T[3]) * s
        ];
        break;
      }
      case gt.GRADIENT_LINEAR:
      case gt.GRADIENT_RADIAL:
      case gt.GRADIENT_ANGULAR:
      case gt.GRADIENT_DIAMOND: {
        const T = (o = e.gradient) != null && o.stops ? [...e.gradient.stops] : [], O = (c = i.gradient) != null && c.stops ? [...i.gradient.stops] : [], A = T.length, g = O.length;
        A > g ? Ui(T, O) : g > A && Ui(O, T);
        const R = T.length;
        for (let m = 0; m < R; m++)
          n.gradient.stops.push({
            position: T[m].position + (O[m].position - T[m].position) * s,
            color: [
              T[m].color[0] + (O[m].color[0] - T[m].color[0]) * s,
              T[m].color[1] + (O[m].color[1] - T[m].color[1]) * s,
              T[m].color[2] + (O[m].color[2] - T[m].color[2]) * s,
              T[m].color[3] + (O[m].color[3] - T[m].color[3]) * s
            ]
          }), n.gradient.stops[m].position = T[m].position + (O[m].position - T[m].position) * s;
        const I = (_ = (a = e.gradient) == null ? void 0 : a.transform) != null && _.length ? [...e.gradient.transform] : [0, -1, 1, 0, 0, 1], x = (E = (u = i.gradient) == null ? void 0 : u.transform) != null && E.length ? [...i.gradient.transform] : [0, -1, 1, 0, 0, 1];
        n.gradient.transform = [
          I[0] + (x[0] - I[0]) * s,
          I[1] + (x[1] - I[1]) * s,
          I[2] + (x[2] - I[2]) * s,
          I[3] + (x[3] - I[3]) * s,
          I[4] + (x[4] - I[4]) * s,
          I[5] + (x[5] - I[5]) * s
        ];
        break;
      }
      case gt.IMAGE: {
        (l = e.image) != null && l.id ? n.image.id = e.image.id : (f = i.image) != null && f.id && (n.image.id = i.image.id), ((d = e.image) == null ? void 0 : d.mode) !== void 0 ? n.image.mode = e.image.mode : ((N = i.image) == null ? void 0 : N.mode) !== void 0 ? n.image.mode = i.image.mode : n.image.mode = 0;
        break;
      }
    }
    return n;
  }
}, Ui = (s, e) => {
  const i = e.slice().sort((n, r) => n.position - r.position);
  for (let n = i.length; n < s.length; n++) {
    const r = s[n].position;
    let h = null;
    if (r <= i[0].position)
      h = i[0];
    else if (r >= i[i.length - 1].position)
      h = i[i.length - 1];
    else
      for (let o = 0; o < i.length - 1; o++) {
        const c = i[o], a = i[o + 1], _ = r - c.position, u = a.position - r;
        if (_ >= 0 && u > 0) {
          _ <= u ? h = c : h = a;
          break;
        }
      }
    e[n] = h;
  }
}, lh = bn(Eh);
class fh extends Hn {
  constructor() {
    super(lh);
  }
}
window.AnimationComposer = fh;
