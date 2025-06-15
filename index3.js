var Z = Object.defineProperty;
var X = (i, t, e) => t in i ? Z(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var g = (i, t, e) => X(i, typeof t != "symbol" ? t + "" : t, e);
function tt(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var q = { exports: {} };
(function(i) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function r() {
  }
  Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (e = !1));
  function s(h, n, o) {
    this.fn = h, this.context = n, this.once = o || !1;
  }
  function c(h, n, o, l, m) {
    if (typeof o != "function")
      throw new TypeError("The listener must be a function");
    var p = new s(o, l || h, m), d = e ? e + n : n;
    return h._events[d] ? h._events[d].fn ? h._events[d] = [h._events[d], p] : h._events[d].push(p) : (h._events[d] = p, h._eventsCount++), h;
  }
  function u(h, n) {
    --h._eventsCount === 0 ? h._events = new r() : delete h._events[n];
  }
  function a() {
    this._events = new r(), this._eventsCount = 0;
  }
  a.prototype.eventNames = function() {
    var n = [], o, l;
    if (this._eventsCount === 0) return n;
    for (l in o = this._events)
      t.call(o, l) && n.push(e ? l.slice(1) : l);
    return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(o)) : n;
  }, a.prototype.listeners = function(n) {
    var o = e ? e + n : n, l = this._events[o];
    if (!l) return [];
    if (l.fn) return [l.fn];
    for (var m = 0, p = l.length, d = new Array(p); m < p; m++)
      d[m] = l[m].fn;
    return d;
  }, a.prototype.listenerCount = function(n) {
    var o = e ? e + n : n, l = this._events[o];
    return l ? l.fn ? 1 : l.length : 0;
  }, a.prototype.emit = function(n, o, l, m, p, d) {
    var w = e ? e + n : n;
    if (!this._events[w]) return !1;
    var f = this._events[w], E = arguments.length, y, v;
    if (f.fn) {
      switch (f.once && this.removeListener(n, f.fn, void 0, !0), E) {
        case 1:
          return f.fn.call(f.context), !0;
        case 2:
          return f.fn.call(f.context, o), !0;
        case 3:
          return f.fn.call(f.context, o, l), !0;
        case 4:
          return f.fn.call(f.context, o, l, m), !0;
        case 5:
          return f.fn.call(f.context, o, l, m, p), !0;
        case 6:
          return f.fn.call(f.context, o, l, m, p, d), !0;
      }
      for (v = 1, y = new Array(E - 1); v < E; v++)
        y[v - 1] = arguments[v];
      f.fn.apply(f.context, y);
    } else {
      var C = f.length, A;
      for (v = 0; v < C; v++)
        switch (f[v].once && this.removeListener(n, f[v].fn, void 0, !0), E) {
          case 1:
            f[v].fn.call(f[v].context);
            break;
          case 2:
            f[v].fn.call(f[v].context, o);
            break;
          case 3:
            f[v].fn.call(f[v].context, o, l);
            break;
          case 4:
            f[v].fn.call(f[v].context, o, l, m);
            break;
          default:
            if (!y) for (A = 1, y = new Array(E - 1); A < E; A++)
              y[A - 1] = arguments[A];
            f[v].fn.apply(f[v].context, y);
        }
    }
    return !0;
  }, a.prototype.on = function(n, o, l) {
    return c(this, n, o, l, !1);
  }, a.prototype.once = function(n, o, l) {
    return c(this, n, o, l, !0);
  }, a.prototype.removeListener = function(n, o, l, m) {
    var p = e ? e + n : n;
    if (!this._events[p]) return this;
    if (!o)
      return u(this, p), this;
    var d = this._events[p];
    if (d.fn)
      d.fn === o && (!m || d.once) && (!l || d.context === l) && u(this, p);
    else {
      for (var w = 0, f = [], E = d.length; w < E; w++)
        (d[w].fn !== o || m && !d[w].once || l && d[w].context !== l) && f.push(d[w]);
      f.length ? this._events[p] = f.length === 1 ? f[0] : f : u(this, p);
    }
    return this;
  }, a.prototype.removeAllListeners = function(n) {
    var o;
    return n ? (o = e ? e + n : n, this._events[o] && u(this, o)) : (this._events = new r(), this._eventsCount = 0), this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = e, a.EventEmitter = a, i.exports = a;
})(q);
var et = q.exports;
class Et extends et.EventEmitter {
  constructor() {
    super();
    g(this, "timeOrigin");
    g(this, "elapsedTime");
    g(this, "state");
    g(this, "_rafId");
    this.timeOrigin = performance.now(), this.elapsedTime = 0, this._rafId = 0, this.state = "idle";
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
var rt = 4, it = 1e-3, st = 1e-7, nt = 10, b = 11, P = 1 / (b - 1), at = typeof Float32Array == "function";
function H(i, t) {
  return 1 - 3 * t + 3 * i;
}
function G(i, t) {
  return 3 * t - 6 * i;
}
function j(i) {
  return 3 * i;
}
function D(i, t, e) {
  return ((H(t, e) * i + G(t, e)) * i + j(t)) * i;
}
function W(i, t, e) {
  return 3 * H(t, e) * i * i + 2 * G(t, e) * i + j(t);
}
function ot(i, t, e, r, s) {
  var c, u, a = 0;
  do
    u = t + (e - t) / 2, c = D(u, r, s) - i, c > 0 ? e = u : t = u;
  while (Math.abs(c) > st && ++a < nt);
  return u;
}
function ct(i, t, e, r) {
  for (var s = 0; s < rt; ++s) {
    var c = W(t, e, r);
    if (c === 0)
      return t;
    var u = D(t, e, r) - i;
    t -= u / c;
  }
  return t;
}
function ht(i) {
  return i;
}
var ut = function(t, e, r, s) {
  if (!(0 <= t && t <= 1 && 0 <= r && r <= 1))
    throw new Error("bezier x values must be in [0, 1] range");
  if (t === e && r === s)
    return ht;
  for (var c = at ? new Float32Array(b) : new Array(b), u = 0; u < b; ++u)
    c[u] = D(u * P, t, r);
  function a(h) {
    for (var n = 0, o = 1, l = b - 1; o !== l && c[o] <= h; ++o)
      n += P;
    --o;
    var m = (h - c[o]) / (c[o + 1] - c[o]), p = n + m * P, d = W(p, t, r);
    return d >= it ? ct(h, p, t, r) : d === 0 ? p : ot(h, n, n + P, t, r);
  }
  return function(n) {
    return n === 0 ? 0 : n === 1 ? 1 : D(a(n), e, s);
  };
};
const lt = /* @__PURE__ */ tt(ut);
var ft = /* @__PURE__ */ ((i) => (i[i.JUMP_START = 0] = "JUMP_START", i[i.JUMP_END = 1] = "JUMP_END", i[i.JUMP_BOTH = 2] = "JUMP_BOTH", i))(ft || {});
const mt = [0, 0, 1, 1], z = (i, t) => {
  if (t <= i[0].time)
    return {
      startFrame: i[0],
      endFrame: i[0],
      progress: 0
    };
  if (t >= i[i.length - 1].time) {
    const u = i[i.length - 1];
    return {
      startFrame: u,
      endFrame: u,
      progress: 1
    };
  }
  const e = i.findIndex((u, a) => {
    const h = i[a + 1];
    return h ? t >= u.time && t <= h.time : !1;
  }), r = i[e], s = i[e + 1], c = (t - r.time) / (s.time - r.time);
  return { startFrame: r, endFrame: s, progress: c };
}, pt = (i, t, e) => {
  switch (t) {
    case 0:
      return Math.min(1, Math.ceil(e * i) / i);
    case 1:
      return Math.min(1, Math.floor(e * i) / i);
    case 2: {
      if (e <= 0)
        return 0;
      if (e >= 1)
        return 1;
      const r = Math.floor(e * i), s = e * i - r;
      return Math.min(
        1,
        (s >= 0.5 ? r + 1 : r) / i
      );
    }
  }
}, dt = (i, t) => {
  switch (i.length) {
    case 2:
      return pt(...i, t);
    case 4:
      return lt(...i)(t);
  }
};
class gt {
  constructor(t, e, r, s, c) {
    g(this, "sortedKeyframes");
    g(this, "duration");
    this.interpolator = e, this.middlewares = r, this.registry = s, this.sortedKeyframes = t, this.duration = c === void 0 ? t[t.length - 1].time : c;
  }
  interpolate(t) {
    const r = Math.max(0, Math.min(1, t)) * this.duration, {
      startFrame: s,
      endFrame: c,
      progress: u
    } = z(this.sortedKeyframes, r), a = c.easing ? dt(c.easing, u) : u, h = {
      keyframes: this.sortedKeyframes,
      rawProgress: u,
      easedProgress: a,
      startFrame: s,
      endFrame: c,
      value: this.interpolator(
        a,
        s.value,
        c.value,
        c.easing || mt,
        this.registry
      )
    };
    return this.middlewares.reduce(
      (n, o) => o(n),
      h
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
  insertKF(t) {
    const e = this.sortedKeyframes.findIndex((a) => a.time === t.time);
    if (e !== -1)
      return this.sortedKeyframes[e].value = t.value, this;
    const { progress: r } = z(this.sortedKeyframes, t.time), s = this.sortedKeyframes.findIndex((a) => a.time > t.time);
    if (!(s === 0) && !(s === -1)) {
      const a = this.sortedKeyframes[s];
      if (a.easing)
        if (a.easing.length === 4) {
          const h = a.easing, n = r, o = 0, l = 0, m = h[0], p = h[1], d = h[2], w = h[3], f = 1, E = 1, y = 1 - n, v = y * o + n * m, C = y * l + n * p, A = y * m + n * d, N = y * p + n * w, x = y * d + n * f, F = y * w + n * E, M = y * v + n * A, V = y * C + n * N, K = y * A + n * x, O = y * N + n * F, U = y * M + n * K, R = y * V + n * O, _ = [o, l, v, C, M, V, U, R], k = [U, R, K, O, x, F, f, E], B = _[6] - _[0], L = _[7] - _[1], Q = [
            _[2] / B,
            _[3] / L,
            _[4] / B,
            _[5] / L
          ], J = k[6] - k[0], $ = k[7] - k[1], Y = [
            (k[2] - k[0]) / J,
            (k[3] - k[1]) / $,
            (k[4] - k[0]) / J,
            (k[5] - k[1]) / $
          ];
          t.easing = Q, a.easing = Y;
        } else a.easing.length;
    }
    return s === -1 ? this.sortedKeyframes.push(t) : this.sortedKeyframes.splice(s, 0, t), this;
  }
}
class vt {
  constructor({ registry: t, middlewares: e = [] }) {
    g(this, "middlewares", []);
    g(this, "registry");
    this.registry = t, this.middlewares = e;
  }
  compose(t, e, r) {
    if (e.length === 0)
      throw new Error("At least one keyframe is required");
    const s = this.registry.get(t), c = [...e].sort((u, a) => u.time - a.time);
    if (c[0].time < 0)
      throw new Error("First keyframe time must be greater than 0");
    return new gt(
      c,
      s.interpolate,
      this.middlewares,
      this.registry,
      r
    );
  }
}
const S = (i) => i;
class kt {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    g(this, "interpolators", /* @__PURE__ */ new Map());
    const t = S({
      name: "number",
      interpolate: this.lerp
    });
    this.register(t);
  }
  register(t) {
    this.interpolators.set(t.name, t);
  }
  lerp(t, e, r) {
    return e + (r - e) * t;
  }
  interpolate(t, e, r, s, c) {
    return this.get(t).interpolate(e, s, c, r, this);
  }
  get(t) {
    const e = this.interpolators.get(t);
    if (!e)
      throw new Error(`Interpolator '${t}' not found`);
    return e;
  }
  has(t) {
    return this.interpolators.has(t);
  }
}
const At = S({
  name: "rgba",
  interpolate: (i, t, e, r, s) => t.map((c, u) => s.lerp(i, c, e[u]))
}), _t = S({
  name: "transform",
  interpolate: (i, t, e, r, s) => t.map((c, u) => s.lerp(i, c, e[u]))
}), bt = S({
  name: "colorStop",
  interpolate: (i, t, e, r, s) => ({
    color: s.interpolate("rgba", i, r, t.color, e.color),
    position: s.lerp(i, t.position, e.position)
  })
}), Ct = (i = "Animation") => (t) => (console.log(`${i}:`, t), t);
class yt {
  constructor(t, e) {
    g(this, "animationId");
    g(this, "trackData");
    g(this, "state");
    g(this, "playbackRate");
    /** local time, 0 <= currentTime <= duration */
    g(this, "currentTime");
    /** global time */
    g(this, "startTime");
    g(this, "_baseTime");
    /** global time when the animation instance is created */
    g(this, "createdAt");
    this.animationId = t, this.trackData = e, this.state = T.IDLE, this.playbackRate = 1, this.currentTime = 0, this.startTime = 0, this._baseTime = 0, this.createdAt = performance.now();
  }
  getPropTrack(t) {
    const e = this.trackData.tracks.get(t);
    if (!e)
      throw new Error(`Property track not found for key: ${t}`);
    return JSON.parse(JSON.stringify(e));
  }
  /**
   * Forward playback
   * Will play forward from the current provided time
   */
  forward() {
    this._baseTime = this.currentTime, this.state = T.RUNNING, this.playbackRate = Math.abs(this.playbackRate), this.startTime = performance.now();
  }
  pause() {
    this.state = T.PAUSED;
  }
  /**
   * Backward playback
   * Will play backward from the current provided time
   *
   * If the current time is 0 at the time of calling this method, it will
   * conviniently seek to the end of the animation and play backward
   */
  backward() {
    this.currentTime === 0 && this.seekToEnd(), this._baseTime = this.currentTime, this.state = T.RUNNING, this.playbackRate = -Math.abs(this.playbackRate), this.startTime = performance.now();
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
  seek(t) {
    this.currentTime = Math.max(0, Math.min(this.trackData.duration, t));
  }
  /**
   * Seek to the end of the animation
   */
  seekToEnd() {
    this.currentTime = this.trackData.duration;
  }
  isForward() {
    return this.state === T.RUNNING && this.playbackRate > 0;
  }
  isBackward() {
    return this.state === T.RUNNING && this.playbackRate < 0;
  }
  isPaused() {
    return this.state === T.PAUSED;
  }
  // isLeaving() {
  //   return this.state === AnimationState.LEAVING
  // }
  isEnded() {
    return this.state === T.PAUSED && this.currentTime === 0;
  }
  isCompleted() {
    return this.state === T.PAUSED && this.currentTime === this.trackData.duration;
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
  getStatus(t) {
    const e = t - this.startTime;
    if (this.isForward()) {
      const r = this._baseTime + e;
      return r >= this.trackData.duration ? {
        state: T.PAUSED,
        time: this.trackData.duration
      } : { state: T.RUNNING, time: r };
    } else if (this.isBackward()) {
      const r = this._baseTime - e;
      return r <= 0 ? { state: T.PAUSED, time: 0 } : { state: T.RUNNING, time: r };
    } else {
      const r = this._baseTime + e;
      return {
        state: this.state,
        time: Math.max(0, Math.min(this.trackData.duration, r))
      };
    }
  }
}
class wt {
  constructor(t, e) {
    g(this, "AC");
    g(this, "key");
    /**
     * Animations that affecting this property
     * If there are multiple animations, that means there is a conflict need to be resolved
     */
    g(this, "animations");
    /** Resolved interpolator */
    g(this, "interpolator");
    this.AC = t, this.key = e, this.animations = [], this.interpolator = null;
  }
  addAnimation(t, e) {
    this.animations.some(
      (r) => r.animationId === e.animationId
    ) || this.animations.push(e), this.sortAnimations(), this.interpolator = this.resolve(t, this.animations.length > 1);
  }
  deleteAnimation(t, e) {
    const r = this.animations.indexOf(e);
    r !== -1 && this.animations.splice(r, 1), this.animations.length !== 0 && (this.interpolator = this.resolve(t, !0));
  }
  animationStateUpdated(t) {
    this.interpolator = this.resolve(t, this.animations.length > 1);
  }
  /**
   * Sort animations by priority and startTime
   */
  sortAnimations() {
    this.animations.sort((t, e) => e.createdAt - t.createdAt);
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
    const t = this.animations[0];
    return t.currentTime / t.trackData.duration;
  }
  getHighestAnimation() {
    return this.animations[0];
  }
  resolve(t, e = !1) {
    return this._resolve(
      t,
      e
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
  _resolve(t, e = !1) {
    if (this.animations.length === 0)
      throw new Error(`No animations found for this PropEffect: ${this.key}`);
    const r = this.animations[0], { duration: s } = r.trackData, c = r.getPropTrack(this.key), { type: u, kfs: a } = c, h = a.some((m) => m.time === 0), n = a.some((m) => m.time === r.currentTime), o = this.AC.getBaseValue(this.key), l = this.AC.getComputedData(this.key);
    if (this.animations.length === 1) {
      const m = h ? a : [{ time: 0, value: o }, ...a], p = this.AC.keyframeComposer.compose(
        u,
        m,
        s
      );
      return e && !n && p.insertKF({
        time: r.currentTime,
        value: l
      }), p;
    }
    if (this.animations.length > 1) {
      if (r.isForward()) {
        const m = h ? a : [{ time: 0, value: o }, ...a], p = this.AC.keyframeComposer.compose(
          u,
          m,
          s
        );
        return n || p.insertKF({
          time: r.currentTime,
          value: l
        }), p;
      } else if (r.isBackward()) {
        const m = t + r.currentTime, p = I(
          this.AC,
          m,
          this.key,
          this.animations,
          1
        ), d = h ? a : [{ time: 0, value: p }, ...a], w = this.AC.keyframeComposer.compose(
          u,
          d,
          s
        );
        return n || w.insertKF({
          time: r.currentTime,
          value: l
        }), w;
      } else if (r.isPaused()) {
        const m = h ? a : [{ time: 0, value: o }, ...a], p = this.AC.keyframeComposer.compose(
          u,
          m,
          s
        );
        return n || p.insertKF({
          time: r.currentTime,
          value: l
        }), p;
      }
    }
    throw new Error("unsupported state");
  }
}
const I = (i, t, e, r, s) => {
  const c = i.getBaseValue(e);
  if (s >= r.length)
    return c;
  const u = r[s], { duration: a } = u.trackData, { time: h, state: n } = u.getStatus(t), o = u.getPropTrack(e), { type: l, kfs: m } = o, p = m.some((d) => d.time === 0);
  if (u.isForward())
    return i.keyframeComposer.compose(
      l,
      p ? m : [{ time: 0, value: c }, ...m],
      a
    ).interpolate(h / a);
  if (u.isBackward()) {
    if (h === 0 && n === T.PAUSED)
      return I(i, t, e, r, s + 1);
    {
      const w = t + h, f = I(
        i,
        w,
        e,
        r,
        s + 1
      );
      return i.keyframeComposer.compose(
        l,
        p ? m : [{ time: 0, value: f }, ...m],
        a
      ).interpolate(h / a);
    }
  } else {
    if (u.isPaused())
      return i.keyframeComposer.compose(
        l,
        p ? m : [{ time: 0, value: c }, ...m],
        a
      ).interpolate(h / a);
    throw new Error("unsupported state");
  }
}, T = {
  IDLE: "idle",
  // not started
  RUNNING: "running",
  // playing (forward or backward based on playbackRate)
  PAUSED: "paused",
  // paused
  // currently not used
  LEAVING: "leaving",
  // removing
  OCCUPIED: "occupied"
  // occupied by another animation
};
class Pt {
  // FIXME: use plugin pattern
  // _debugger: TimelineDebugger<PropTrackKey, Value> | null = null
  constructor(t) {
    g(this, "baseValueCache");
    g(this, "computedValueCache");
    /** Raw animation tracks, Read only data */
    g(this, "sourceAnimationTracks");
    /** Active animations */
    g(this, "animations");
    /** Active properties based on active animations */
    g(this, "propertyEffects");
    g(this, "isPlaying");
    /** global time */
    g(this, "startTime");
    /** global time */
    g(this, "previousTime");
    /** global time */
    g(this, "currentTime");
    g(this, "_rafId", null);
    g(this, "keyframeComposer");
    this.sourceAnimationTracks = /* @__PURE__ */ new Map(), this.animations = /* @__PURE__ */ new Map(), this.propertyEffects = /* @__PURE__ */ new Map(), this.isPlaying = !1, this.startTime = 0, this.previousTime = 0, this.currentTime = 0, this.baseValueCache = /* @__PURE__ */ new Map(), this.computedValueCache = /* @__PURE__ */ new Map(), this.keyframeComposer = new vt({ registry: t });
  }
  deinit() {
    this.pause(), this.sourceAnimationTracks.clear(), this.animations.clear(), this.propertyEffects.clear(), this.baseValueCache.clear(), this.computedValueCache.clear();
  }
  setComputedData(t, e) {
    if (e === void 0) {
      console.warn(`Trying to set undefined value for key: ${t}`);
      return;
    }
    this.computedValueCache.set(t, e);
  }
  deleteComputedData(t) {
    this.computedValueCache.delete(t);
  }
  cacheBaseValue(t, e) {
    this.baseValueCache.set(t, e);
  }
  getPropertyEffect(t) {
    const e = this.propertyEffects.get(t);
    return e || (console.warn(`Property effect not found: ${t}`), null);
  }
  tick() {
    if (!this.isPlaying)
      return null;
    this.previousTime = this.currentTime, this.currentTime = performance.now();
    const t = /* @__PURE__ */ new Map();
    for (const [e, r] of this.animations) {
      if (r.isEnded() && this.deleteAnimation(e), r.isPaused())
        continue;
      const { time: s, state: c } = r.getStatus(this.currentTime);
      r.seek(s), t.set(e, c);
    }
    for (const [, e] of this.propertyEffects)
      if (e.interpolator) {
        const r = e.getProgress();
        if (!e.isPaused()) {
          const s = e.interpolator.interpolate(r);
          this.setComputedData(e.key, s);
        }
      } else
        console.warn("interpolator not found");
    for (const [e, r] of this.animations) {
      const s = t.get(e);
      s === T.PAUSED && s !== r.state && this.pauseAnimation(e);
    }
  }
  start() {
    if (this.isPlaying)
      return;
    this.isPlaying = !0, this.startTime = performance.now();
    const t = () => {
      this.tick(), this._rafId = window.requestAnimationFrame(t);
    };
    this._rafId = window.requestAnimationFrame(t);
  }
  pause() {
    this.isPlaying = !1, this._rafId !== null && (window.cancelAnimationFrame(this._rafId), this._rafId = null);
  }
  getComputedData(t) {
    return this.computedValueCache.has(t) ? this.computedValueCache.get(t) : this.getBaseValue(t);
  }
  getBaseValue(t) {
    return this.baseValueCache.get(t);
  }
  loadAnimationTrack(t, e) {
    if (e.duration <= 0) {
      console.warn(
        "Failed to load animation track: duration must be greater than 0",
        t
      );
      return;
    }
    this.sourceAnimationTracks.has(t) && console.warn("track already exists or id conflict", t);
    for (const [r, s] of e.tracks)
      this.cacheBaseValue(r, s.baseValue);
    this.sourceAnimationTracks.set(t, e);
  }
  hasAnimation(t) {
    return this.animations.has(t);
  }
  getAnimation(t) {
    const e = this.animations.get(t);
    return e || (console.warn(`Animation not found: ${t}`), null);
  }
  playAnimation(t, e) {
    let r = this.animations.get(t);
    if (r && !e.backward && (r.isForward() || r.isCompleted()) && this.deleteAnimation(t), r = this.animations.get(t), !r) {
      const s = this.sourceAnimationTracks.get(t);
      if (!s) {
        console.warn(`Animation track data not found for ${t}`);
        return;
      }
      r = new yt(t, s), this.animations.set(t, r);
    }
    e.backward ? r.backward() : r.forward();
    for (const [s] of r.trackData.tracks) {
      if (!this.propertyEffects.has(s)) {
        const u = new wt(
          this,
          s
        );
        this.propertyEffects.set(s, u);
      }
      const c = this.getPropertyEffect(s);
      c && c.addAnimation(this.currentTime, r);
    }
  }
  pauseAnimation(t) {
    const e = this.getAnimation(t);
    if (e) {
      e.pause();
      for (const [r] of e.trackData.tracks) {
        const s = this.getPropertyEffect(r);
        if (!s)
          continue;
        const c = s.getHighestAnimation();
        c !== e && c.isBackward() && s.animationStateUpdated(this.currentTime);
      }
    }
  }
  deleteAnimation(t) {
    const e = this.getAnimation(t);
    if (e) {
      this.animations.delete(t);
      for (const [r] of e.trackData.tracks) {
        const s = this.getPropertyEffect(r);
        s && (s.deleteAnimation(this.currentTime, e), s.animations.length === 0 && (this.setComputedData(r, this.getBaseValue(r)), this.propertyEffects.delete(r)));
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
export {
  Pt as AnimationComposer,
  T as AnimationState,
  gt as ComposedInterpolator,
  kt as InterpolatorRegistry,
  vt as KeyframeComposer,
  ft as StepPosition,
  Et as Timeline,
  bt as colorStopInterpolator,
  S as createInterpolator,
  z as findKeyframes,
  dt as getEasedProgress,
  mt as linearEasing,
  Ct as loggingMiddleware,
  At as rgbaInterpolator,
  pt as stepEasing,
  _t as transformInterpolator
};
